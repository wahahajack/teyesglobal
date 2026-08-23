export interface ZohoEnvironment {
  ZOHO_CLIENT_ID?: string;
  ZOHO_CLIENT_SECRET?: string;
  ZOHO_REFRESH_TOKEN?: string;
  ZOHO_ACCOUNTS_BASE_URL?: string;
  ZOHO_API_BASE_URL?: string;
}

export const ZOHO_FIELDS = {
  gclid: "Google_Click_ID", gbraid: "GBRAID", wbraid: "WBRAID", utmSource: "UTM_Source",
  utmMedium: "UTM_Medium", utmCampaign: "UTM_Campaign", utmContent: "UTM_Content",
  utmTerm: "UTM_Term", fbclid: "FBCLID", leadForm: "Lead_Form",
  inquiryType: "Inquiry_Type", estimatedQuantity: "Estimated_Quantity",
  businessModel: "Business_Model", formEntryPage: "Form_Entry_Page", landingPage: "Initial_Landing_Page",
  referrer: "Initial_Referrer", submittedAt: "Website_Submitted_At",
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SOURCES = new Set(["contact_page", "wholesale_quote", "manufacturing_quote", "distributor_application", "catalog_request"]);
const LIMITS = { fullName: 100, email: 254, company: 150, country: 100, inquiryType: 100, message: 4000, estimatedQuantity: 100, businessModel: 100, attributionValue: 2048 } as const;
const ATTRIBUTION_KEYS = ["gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "landing_page", "referrer"] as const;

type Attribution = Record<(typeof ATTRIBUTION_KEYS)[number], string>;
interface LeadPayload {
  source: string; fullName: string; email: string; company: string; country: string;
  inquiryType: string; message: string; estimatedQuantity: string; businessModel: string;
  submittedAt: string; website: string; formEntryPage: string; attribution: Attribution;
}

const json = (status: number, body: Record<string, unknown>, headers?: HeadersInit) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...headers } });
const text = (value: unknown, limit: number) => typeof value === "string" ? value.trim().slice(0, limit) : "";
const formEntryPage = (value: unknown, origin: string) => {
  const candidate = text(value, LIMITS.attributionValue);
  if (!candidate || candidate.startsWith("//")) return "";
  try {
    const url = new URL(candidate, origin);
    return url.origin === origin ? `${url.pathname}${url.search}` : "";
  } catch { return ""; }
};

function normalizePayload(input: unknown, origin: string): LeadPayload | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const body = input as Record<string, unknown>;
  const attributionInput = body.attribution;
  if (!attributionInput || typeof attributionInput !== "object" || Array.isArray(attributionInput)) return null;
  const rawAttribution = attributionInput as Record<string, unknown>;
  const attribution = Object.fromEntries(ATTRIBUTION_KEYS.map((key) => [key, text(rawAttribution[key], LIMITS.attributionValue)])) as Attribution;
  const payload: LeadPayload = {
    source: text(body.source, 100), fullName: text(body.fullName, LIMITS.fullName), email: text(body.email, LIMITS.email),
    company: text(body.company, LIMITS.company), country: text(body.country, LIMITS.country), inquiryType: text(body.inquiryType, LIMITS.inquiryType),
    message: text(body.message, LIMITS.message), estimatedQuantity: text(body.estimatedQuantity, LIMITS.estimatedQuantity), businessModel: text(body.businessModel, LIMITS.businessModel),
    submittedAt: text(body.submittedAt, 100), website: text(body.website, 2048), formEntryPage: formEntryPage(body.formEntryPage, origin), attribution,
  };
  return SOURCES.has(payload.source) && EMAIL_RE.test(payload.email) && !Number.isNaN(Date.parse(payload.submittedAt)) ? payload : null;
}

function toZohoLead(payload: LeadPayload) {
  const { attribution } = payload;
  const submittedAt = new Date(payload.submittedAt).toISOString().replace(/\.\d{3}Z$/, "+00:00");
  return {
    Last_Name: payload.fullName || payload.email.split("@")[0], Company: payload.company || "Not provided", Email: payload.email.toLowerCase(),
    Country: payload.country, Description: payload.message, Lead_Source: "Web Download",
    [ZOHO_FIELDS.gclid]: attribution.gclid, [ZOHO_FIELDS.gbraid]: attribution.gbraid, [ZOHO_FIELDS.wbraid]: attribution.wbraid,
    [ZOHO_FIELDS.utmSource]: attribution.utm_source, [ZOHO_FIELDS.utmMedium]: attribution.utm_medium, [ZOHO_FIELDS.utmCampaign]: attribution.utm_campaign,
    [ZOHO_FIELDS.utmContent]: attribution.utm_content, [ZOHO_FIELDS.utmTerm]: attribution.utm_term, [ZOHO_FIELDS.fbclid]: attribution.fbclid,
    [ZOHO_FIELDS.leadForm]: payload.source, [ZOHO_FIELDS.inquiryType]: payload.inquiryType, [ZOHO_FIELDS.estimatedQuantity]: payload.estimatedQuantity,
    [ZOHO_FIELDS.businessModel]: payload.businessModel, [ZOHO_FIELDS.formEntryPage]: payload.formEntryPage, [ZOHO_FIELDS.landingPage]: attribution.landing_page, [ZOHO_FIELDS.referrer]: attribution.referrer,
    [ZOHO_FIELDS.submittedAt]: submittedAt,
  };
}

const configured = (env: ZohoEnvironment) => Boolean(env.ZOHO_CLIENT_ID && env.ZOHO_CLIENT_SECRET && env.ZOHO_REFRESH_TOKEN && env.ZOHO_ACCOUNTS_BASE_URL && env.ZOHO_API_BASE_URL);

export function createZohoLeadHandler(env: ZohoEnvironment, fetchImpl: typeof fetch = fetch) {
  return async (request: Request): Promise<Response> => {
    if (request.method !== "POST") return json(405, { error: "method_not_allowed" }, { Allow: "POST" });
    if (!request.headers.get("Content-Type")?.includes("application/json")) return json(400, { error: "invalid_request" });
    const requestOrigin = new URL(request.url).origin;
    const origin = request.headers.get("Origin");
    if (origin && origin !== requestOrigin) return json(403, { error: "origin_not_allowed" });
    let body: unknown;
    try { body = await request.json(); } catch { return json(400, { error: "invalid_request" }); }
    if (body && typeof body === "object" && !Array.isArray(body) && text((body as Record<string, unknown>).website, 2048)) return json(202, { ok: true });
    const payload = normalizePayload(body, requestOrigin);
    if (!payload) return json(400, { error: "invalid_request" });
    if (!configured(env)) return json(500, { error: "configuration_error" });
    try {
      const tokenUrl = new URL("/oauth/v2/token", env.ZOHO_ACCOUNTS_BASE_URL);
      tokenUrl.search = new URLSearchParams({ refresh_token: env.ZOHO_REFRESH_TOKEN!, client_id: env.ZOHO_CLIENT_ID!, client_secret: env.ZOHO_CLIENT_SECRET!, grant_type: "refresh_token" }).toString();
      const tokenResponse = await fetchImpl(tokenUrl, { method: "POST" });
      if (!tokenResponse.ok) return json(502, { error: "upstream_error" });
      const token = await tokenResponse.json() as { access_token?: unknown };
      if (typeof token.access_token !== "string" || !token.access_token) return json(502, { error: "upstream_error" });
      const leadResponse = await fetchImpl(`${env.ZOHO_API_BASE_URL!.replace(/\/$/, "")}/crm/v2/Leads`, { method: "POST", headers: { Authorization: `Zoho-oauthtoken ${token.access_token}`, "Content-Type": "application/json" }, body: JSON.stringify({ data: [toZohoLead(payload)] }) });
      if (!leadResponse.ok) return json(502, { error: "upstream_error" });
      const leadBody = await leadResponse.json() as { data?: Array<{ status?: unknown; code?: unknown; details?: { api_name?: unknown } }> };
      const result = leadBody.data?.[0];
      if (result?.status === "success") return json(201, { ok: true });
      const code = typeof result?.code === "string" ? result.code : "unknown";
      const field = typeof result?.details?.api_name === "string" ? result.details.api_name : undefined;
      return json(502, { error: "upstream_error", code, ...(field ? { field } : {}) });
    } catch { return json(502, { error: "upstream_error" }); }
  };
}

const readZohoEnvironment = (): ZohoEnvironment => ({ ZOHO_CLIENT_ID: process.env.ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET: process.env.ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN: process.env.ZOHO_REFRESH_TOKEN, ZOHO_ACCOUNTS_BASE_URL: process.env.ZOHO_ACCOUNTS_BASE_URL, ZOHO_API_BASE_URL: process.env.ZOHO_API_BASE_URL });
export default function handler(request: Request): Promise<Response> { return createZohoLeadHandler(readZohoEnvironment())(request); }

export const config = { path: "/api/zoho-lead" };
