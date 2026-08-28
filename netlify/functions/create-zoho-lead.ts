export interface ZohoEnvironment {
  ZOHO_CLIENT_ID?: string;
  ZOHO_CLIENT_SECRET?: string;
  ZOHO_REFRESH_TOKEN?: string;
  ZOHO_ACCOUNTS_BASE_URL?: string;
  ZOHO_API_BASE_URL?: string;
}

export const ZOHO_FIELDS = {
  orderId: "Fax",
  gclid: "Google_Click_ID", gbraid: "GBRAID", wbraid: "WBRAID", utmSource: "UTM_Source",
  utmMedium: "UTM_Medium", utmCampaign: "UTM_Campaign", utmContent: "UTM_Content",
  utmTerm: "UTM_Term", fbclid: "FBCLID", leadForm: "Lead_Form",
  inquiryType: "Inquiry_Type", estimatedQuantity: "Estimated_Quantity",
  businessModel: "Business_Model", landingPage: "Initial_Landing_Page",
  referrer: "Initial_Referrer", submittedAt: "Website_Submitted_At",
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CORRELATION_ID_RE = /^[0-9a-f]{30}$/i;
const generateCorrelationId = () => Array.from(crypto.getRandomValues(new Uint8Array(15)), (byte) => byte.toString(16).padStart(2, "0")).join("");
const SOURCES = new Set(["contact_page", "wholesale_quote", "manufacturing_quote", "distributor_application", "catalog_request"]);
const LIMITS = { fullName: 100, email: 254, company: 150, country: 100, inquiryType: 100, message: 4000, estimatedQuantity: 100, businessModel: 100, attributionValue: 2048, formEntryPage: 255, pageJourney: 1024, whatsappClickJourney: 1024, whatsappClickPath: 255, whatsappClickCount: 1_000_000 } as const;
const MAX_JOURNEY_ENTRIES = 20;
const ATTRIBUTION_KEYS = ["gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "landing_page", "referrer"] as const;

type Attribution = Record<(typeof ATTRIBUTION_KEYS)[number], string>;
interface LeadPayload {
  submissionId: string;
  source: string; fullName: string; email: string; company: string; country: string;
  inquiryType: string; message: string; estimatedQuantity: string; businessModel: string;
  submittedAt: string; website: string; formEntryPage: string; pageJourney?: string; whatsappClickJourney?: string;
  whatsappClickPath?: string; whatsappClickCount?: number; attribution: Attribution;
}

const json = (status: number, body: Record<string, unknown>, headers?: HeadersInit) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...headers } });
const text = (value: unknown, limit: number) => typeof value === "string" ? value.trim().slice(0, limit) : "";
const safeCode = (value: unknown) => {
  const candidate = text(value, 64);
  return /^[A-Z0-9_]+$/.test(candidate) ? candidate : "unknown";
};
const safeField = (value: unknown) => {
  const candidate = text(value, 100);
  return /^[A-Za-z0-9_]+$/.test(candidate) ? candidate : undefined;
};
const normalizeIso = (value: string) => {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? "" : new Date(parsed).toISOString();
};
const sameSubmission = (existing: Record<string, unknown>, payload: LeadPayload) => {
  const existingSubmittedAt = text(existing[ZOHO_FIELDS.submittedAt], 100);
  if (!existingSubmittedAt) return false;
  if (normalizeIso(existingSubmittedAt) !== normalizeIso(payload.submittedAt)) return false;
  const existingLeadForm = text(existing[ZOHO_FIELDS.leadForm], 100);
  return !existingLeadForm || existingLeadForm === payload.source;
};
const submissionId = (value: unknown) => {
  const candidate = text(value, 30);
  return CORRELATION_ID_RE.test(candidate) ? candidate.toLowerCase() : generateCorrelationId();
};
const formEntryPage = (value: unknown, origin: string) => {
  const candidate = text(value, LIMITS.attributionValue);
  if (!candidate || candidate.startsWith("//")) return "";
  try {
    const url = new URL(candidate, origin);
    return url.origin === origin ? `${url.pathname}${url.search}`.slice(0, LIMITS.formEntryPage) : "";
  } catch { return ""; }
};

const journeyPath = (value: string) => {
  const path = value.trim();
  if (!path || !path.startsWith("/") || path.startsWith("//")) return "";
  if (/^(?:https?:|javascript:|data:)/i.test(path)) return "";
  return path.split("?")[0] || "/";
};
const journey = (value: unknown, limit: number) => {
  if (typeof value !== "string") return "";
  const clean = value.split("").filter((character) => {
    const code = character.charCodeAt(0);
    return code > 0x1f && code !== 0x7f;
  }).join("").trim();
  const entries = clean
    .split(" > ")
    .map(journeyPath)
    .filter(Boolean)
    .slice(-MAX_JOURNEY_ENTRIES);
  const kept: string[] = [];
  let length = 0;

  for (let index = entries.length - 1; index >= 0; index -= 1) {
    const entry = entries[index];
    const separatorLength = kept.length ? 3 : 0;
    if (length + separatorLength + entry.length > limit) continue;
    kept.unshift(entry);
    length += separatorLength + entry.length;
  }

  return kept.join(" > ");
};
const clickCount = (value: unknown) => typeof value === "number" && Number.isFinite(value)
  ? Math.min(Math.max(0, Math.floor(value)), LIMITS.whatsappClickCount)
  : 0;
const description = (message: string, entryPage: string, pageJourney = "", whatsappClickJourney = "", whatsappClickPath = "", whatsappClickCount = 0) => {
  const suffixLines = [
    entryPage ? `Form Entry Page: ${entryPage}` : "",
    pageJourney ? `Page Journey: ${pageJourney}` : "",
    whatsappClickJourney ? `WA Click Journey: ${whatsappClickJourney}` : "",
    whatsappClickPath ? `WA Click Path: ${whatsappClickPath}` : "",
    whatsappClickCount > 0 ? `WA Click Count: ${whatsappClickCount}` : "",
  ].filter(Boolean);
  if (!suffixLines.length) return message;
  const suffix = `---\nAttribution\n${suffixLines.join("\n")}`;
  const separator = message ? "\n\n" : "";
  const availableMessageLength = Math.max(0, LIMITS.message - separator.length - suffix.length);
  return `${message.slice(0, availableMessageLength)}${separator}${suffix}`.slice(0, LIMITS.message);
};

function normalizePayload(input: unknown, origin: string, correlationId: string): LeadPayload | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const body = input as Record<string, unknown>;
  const attributionInput = body.attribution;
  if (!attributionInput || typeof attributionInput !== "object" || Array.isArray(attributionInput)) return null;
  const rawAttribution = attributionInput as Record<string, unknown>;
  const attribution = Object.fromEntries(ATTRIBUTION_KEYS.map((key) => [key, text(rawAttribution[key], LIMITS.attributionValue)])) as Attribution;
  const payload: LeadPayload = {
    submissionId: correlationId,
    source: text(body.source, 100), fullName: text(body.fullName, LIMITS.fullName), email: text(body.email, LIMITS.email),
    company: text(body.company, LIMITS.company), country: text(body.country, LIMITS.country), inquiryType: text(body.inquiryType, LIMITS.inquiryType),
    message: text(body.message, LIMITS.message), estimatedQuantity: text(body.estimatedQuantity, LIMITS.estimatedQuantity), businessModel: text(body.businessModel, LIMITS.businessModel),
    submittedAt: text(body.submittedAt, 100), website: text(body.website, 2048), formEntryPage: formEntryPage(body.formEntryPage, origin),
    pageJourney: journey(body.pageJourney, LIMITS.pageJourney), whatsappClickJourney: journey(body.whatsappClickJourney, LIMITS.whatsappClickJourney),
    whatsappClickPath: journey(body.whatsappClickPath, LIMITS.whatsappClickPath), whatsappClickCount: clickCount(body.whatsappClickCount), attribution,
  };
  return SOURCES.has(payload.source) && EMAIL_RE.test(payload.email) && !Number.isNaN(Date.parse(payload.submittedAt)) ? payload : null;
}

function toZohoLead(payload: LeadPayload) {
  const { attribution } = payload;
  const submittedAt = new Date(payload.submittedAt).toISOString().replace(/\.\d{3}Z$/, "+00:00");
  return {
    Last_Name: payload.fullName || payload.email.split("@")[0], Company: payload.company || "Not provided", Email: payload.email.toLowerCase(),
    [ZOHO_FIELDS.orderId]: payload.submissionId,
    Country: payload.country, Description: description(payload.message, payload.formEntryPage, payload.pageJourney, payload.whatsappClickJourney, payload.whatsappClickPath, payload.whatsappClickCount), Lead_Source: "Web Download",
    [ZOHO_FIELDS.gclid]: attribution.gclid, [ZOHO_FIELDS.gbraid]: attribution.gbraid, [ZOHO_FIELDS.wbraid]: attribution.wbraid,
    [ZOHO_FIELDS.utmSource]: attribution.utm_source, [ZOHO_FIELDS.utmMedium]: attribution.utm_medium, [ZOHO_FIELDS.utmCampaign]: attribution.utm_campaign,
    [ZOHO_FIELDS.utmContent]: attribution.utm_content, [ZOHO_FIELDS.utmTerm]: attribution.utm_term, [ZOHO_FIELDS.fbclid]: attribution.fbclid,
    [ZOHO_FIELDS.leadForm]: payload.source, [ZOHO_FIELDS.inquiryType]: payload.inquiryType, [ZOHO_FIELDS.estimatedQuantity]: payload.estimatedQuantity,
    [ZOHO_FIELDS.businessModel]: payload.businessModel, [ZOHO_FIELDS.landingPage]: attribution.landing_page, [ZOHO_FIELDS.referrer]: attribution.referrer,
    [ZOHO_FIELDS.submittedAt]: submittedAt,
  };
}

const configured = (env: ZohoEnvironment) => Boolean(env.ZOHO_CLIENT_ID && env.ZOHO_CLIENT_SECRET && env.ZOHO_REFRESH_TOKEN && env.ZOHO_ACCOUNTS_BASE_URL && env.ZOHO_API_BASE_URL);

type LeadLogEvent = Record<string, string | number | undefined>;
type LeadLogger = (event: LeadLogEvent) => void;
const noLog: LeadLogger = () => undefined;
const productionLogger: LeadLogger = (event) => console.info(JSON.stringify({
  event: "zoho_lead_capture",
  ...event,
}));

export function createZohoLeadHandler(
  env: ZohoEnvironment,
  fetchImpl: typeof fetch = fetch,
  logger: LeadLogger = noLog,
) {
  return async (request: Request): Promise<Response> => {
    const startedAt = Date.now();
    let correlationId = generateCorrelationId();
    let source = "unknown";
    const respond = (
      httpStatus: number,
      status: string,
      stage: string,
      body: Record<string, unknown>,
      details: LeadLogEvent = {},
      headers?: HeadersInit,
    ) => {
      logger({
        submission_id: correlationId,
        source,
        stage,
        outcome: status,
        http_status: httpStatus,
        duration_ms: Date.now() - startedAt,
        ...details,
      });
      return json(httpStatus, {
        ok: status === "created" || status === "duplicate",
        status,
        submission_id: correlationId,
        ...body,
      }, headers);
    };

    if (request.method !== "POST") return respond(405, "validation_failure", "request", { error: "method_not_allowed" }, {}, { Allow: "POST" });
    if (!request.headers.get("Content-Type")?.includes("application/json")) return respond(400, "validation_failure", "request", { error: "invalid_request" });
    const requestOrigin = new URL(request.url).origin;
    const origin = request.headers.get("Origin");
    if (origin && origin !== requestOrigin) return respond(403, "validation_failure", "request", { error: "origin_not_allowed" });
    let body: unknown;
    try { body = await request.json(); } catch { return respond(400, "validation_failure", "request", { error: "invalid_request" }); }
    if (body && typeof body === "object" && !Array.isArray(body)) {
      const raw = body as Record<string, unknown>;
      correlationId = submissionId(raw.submissionId);
      const candidateSource = text(raw.source, 100);
      source = SOURCES.has(candidateSource) ? candidateSource : source;
      if (text(raw.website, 2048)) return respond(202, "honeypot_rejected", "request", {});
    }
    const payload = normalizePayload(body, requestOrigin, correlationId);
    if (!payload) return respond(400, "validation_failure", "request", { error: "invalid_request" });
    source = payload.source;
    if (!configured(env)) return respond(500, "configuration_failure", "configuration", { error: "configuration_error" });
    const upstreamController = new AbortController();
    const upstreamTimer = setTimeout(() => upstreamController.abort(), 8_000);
    try {
      const tokenUrl = new URL("/oauth/v2/token", env.ZOHO_ACCOUNTS_BASE_URL);
      tokenUrl.search = new URLSearchParams({ refresh_token: env.ZOHO_REFRESH_TOKEN!, client_id: env.ZOHO_CLIENT_ID!, client_secret: env.ZOHO_CLIENT_SECRET!, grant_type: "refresh_token" }).toString();
      const tokenResponse = await fetchImpl(tokenUrl, { method: "POST", signal: upstreamController.signal });
      if (!tokenResponse.ok) {
        const outcome = tokenResponse.status === 429 || tokenResponse.status >= 500
          ? "retryable_failure"
          : "configuration_failure";
        return respond(502, outcome, "token", { error: "upstream_error" }, { upstream_status: tokenResponse.status });
      }
      const token = await tokenResponse.json() as { access_token?: unknown };
      if (typeof token.access_token !== "string" || !token.access_token) return respond(502, "configuration_failure", "token", { error: "upstream_error" });
      const apiBase = env.ZOHO_API_BASE_URL!.replace(/\/$/, "");
      const searchUrl = new URL(`${apiBase}/crm/v2/Leads/search`);
      searchUrl.search = new URLSearchParams({
        criteria: `(Email:equals:${payload.email.toLowerCase()})`,
        fields: `Email,${ZOHO_FIELDS.submittedAt},${ZOHO_FIELDS.leadForm}`,
      }).toString();
      const duplicateResponse = await fetchImpl(searchUrl, {
        method: "GET",
        signal: upstreamController.signal,
        headers: { Authorization: `Zoho-oauthtoken ${token.access_token}` },
      });
      if (!duplicateResponse.ok) {
        const outcome = duplicateResponse.status === 429 || duplicateResponse.status >= 500
          ? "retryable_failure"
          : "validation_failure";
        return respond(502, outcome, "duplicate_check", { error: "upstream_error" }, { upstream_status: duplicateResponse.status });
      }
      let duplicateBody: unknown;
      try {
        const duplicateText = await duplicateResponse.text();
        duplicateBody = duplicateText ? JSON.parse(duplicateText) : { data: [] };
      } catch {
        return respond(502, "retryable_failure", "duplicate_check", { error: "upstream_error" });
      }
      const existingLeads = (duplicateBody as { data?: Array<Record<string, unknown>> })?.data ?? [];
      if (existingLeads.some((lead) => sameSubmission(lead, payload))) {
        return respond(200, "duplicate", "complete", {});
      }
      const leadResponse = await fetchImpl(`${apiBase}/crm/v2/Leads`, { method: "POST", signal: upstreamController.signal, headers: { Authorization: `Zoho-oauthtoken ${token.access_token}`, "Content-Type": "application/json" }, body: JSON.stringify({ data: [toZohoLead(payload)] }) });
      if (!leadResponse.ok) {
        const outcome = leadResponse.status === 429 || leadResponse.status >= 500
          ? "retryable_failure"
          : "validation_failure";
        return respond(502, outcome, "lead_create", { error: "upstream_error" }, { upstream_status: leadResponse.status });
      }
      const leadBody = await leadResponse.json() as { data?: Array<{ status?: unknown; code?: unknown; details?: { api_name?: unknown } }> };
      const result = leadBody.data?.[0];
      if (result?.status === "success") return respond(201, "created", "complete", {});
      const code = safeCode(result?.code);
      const field = safeField(result?.details?.api_name);
      const outcome = code === "INVALID_DATA" || code === "MANDATORY_NOT_FOUND"
        ? "validation_failure"
        : "retryable_failure";
      return respond(502, outcome, "lead_create", { error: "upstream_error", code, ...(field ? { field } : {}) }, { code, field });
    } catch (error) {
      return respond(502, "retryable_failure", "exception", { error: "upstream_error" }, {
        error_name: error instanceof Error ? safeField(error.name) : "unknown",
      });
    } finally {
      clearTimeout(upstreamTimer);
    }
  };
}

const readZohoEnvironment = (): ZohoEnvironment => ({ ZOHO_CLIENT_ID: process.env.ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET: process.env.ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN: process.env.ZOHO_REFRESH_TOKEN, ZOHO_ACCOUNTS_BASE_URL: process.env.ZOHO_ACCOUNTS_BASE_URL, ZOHO_API_BASE_URL: process.env.ZOHO_API_BASE_URL });
export default function handler(request: Request): Promise<Response> {
  return createZohoLeadHandler(readZohoEnvironment(), fetch, productionLogger)(request);
}

export const config = { path: "/api/zoho-lead" };
