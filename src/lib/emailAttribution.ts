const ATTRIBUTION_STORAGE_KEY = "teyes_attribution_v1";
const EMAIL_CONTEXT_STORAGE_KEY = "teyes_email_context_v1";
const ATTRIBUTION_TTL_MS = 90 * 24 * 60 * 60 * 1000;
const FORM_ENTRY_PAGE_KEY = "form_entry_page";
const PAGE_JOURNEY_KEY = "teyes_page_journey_v1";
const WHATSAPP_CLICK_KEY = "teyes_last_whatsapp_click_v1";
const MAX_PAGE_JOURNEY_ENTRIES = 20;
const MAX_PAGE_JOURNEY_LENGTH = 1024;
const MAX_FORM_ENTRY_LENGTH = 255;

const ATTRIBUTION_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "fbclid",
] as const;

const CURRENT_QUERY_KEYS = [
  ...ATTRIBUTION_KEYS,
  "msclkid",
] as const;

const ALLOWED_EMAIL_URL_QUERY_KEYS = new Set<string>(CURRENT_QUERY_KEYS);

type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];
type CurrentQueryKey = (typeof CURRENT_QUERY_KEYS)[number];

type StoredAttribution = Partial<Record<AttributionKey | "landing_page" | "referrer", string>>;

type EmailContextState = {
  expiresAt: number;
  first_visit_at?: string;
  msclkid?: string;
};

export type EmailAttributionOptions = {
  formName?: string;
  inquiryType?: string;
  inquiryTypeLabel?: string;
  submittedAt?: string;
  submissionId?: string;
};

export type EmailAttributionSnapshot = Record<string, string | number>;

function safeSessionGet(key: string) {
  try {
    return window.sessionStorage.getItem(key) || "";
  } catch {
    return "";
  }
}

function safeLocalGet(key: string) {
  try {
    return window.localStorage.getItem(key) || "";
  } catch {
    return "";
  }
}

function safeLocalSet(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Email context is best-effort and must never block a form.
  }
}

function normalizeValue(value: unknown, maxLength = 2000) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function redactEmailLikeText(value: string) {
  return value.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[redacted]");
}

function safeUrl(value: string) {
  try {
    return new URL(value, window.location.origin);
  } catch {
    return null;
  }
}

function sanitizePageUrl(value: string) {
  const page = safeUrl(value);
  if (!page) return "";

  for (const key of Array.from(page.searchParams.keys())) {
    if (!ALLOWED_EMAIL_URL_QUERY_KEYS.has(key.toLowerCase())) {
      page.searchParams.delete(key);
      continue;
    }
    page.searchParams.set(key, redactEmailLikeText(normalizeValue(page.searchParams.get(key), 500)));
  }
  page.hash = "";
  return redactEmailLikeText(page.toString());
}

function sanitizeReferrer(value: string) {
  if (!value) return "";
  const referrer = safeUrl(value);
  if (!referrer) return "";
  referrer.search = "";
  referrer.hash = "";
  return redactEmailLikeText(referrer.toString());
}

function referrerHost(value: string) {
  const parsed = safeUrl(value);
  return parsed ? parsed.hostname.toLowerCase() : "";
}

function pathFromUrl(value: string) {
  const parsed = safeUrl(value);
  return parsed ? parsed.pathname : "";
}

function sanitizePathWithAllowedQuery(value: string) {
  const parsed = safeUrl(value);
  if (!parsed) return "";
  const sanitized = safeUrl(sanitizePageUrl(parsed.toString()));
  if (!sanitized) return "";
  return (sanitized.pathname + sanitized.search).slice(0, MAX_FORM_ENTRY_LENGTH);
}

function readDurableAttribution(): StoredAttribution {
  try {
    const raw = safeLocalGet(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as { expiresAt?: unknown; values?: unknown };
    if (
      typeof parsed.expiresAt !== "number" ||
      !Number.isFinite(parsed.expiresAt) ||
      parsed.expiresAt <= Date.now() ||
      !parsed.values ||
      typeof parsed.values !== "object" ||
      Array.isArray(parsed.values)
    ) {
      return {};
    }

    const source = parsed.values as Record<string, unknown>;
    const stored: StoredAttribution = {};
    for (const key of [...ATTRIBUTION_KEYS, "landing_page", "referrer"] as const) {
      if (typeof source[key] === "string") stored[key] = source[key];
    }
    return stored;
  } catch {
    return {};
  }
}

function readEmailContext(): EmailContextState {
  try {
    const raw = safeLocalGet(EMAIL_CONTEXT_STORAGE_KEY);
    if (!raw) return { expiresAt: 0 };
    const parsed = JSON.parse(raw) as Partial<EmailContextState>;
    if (
      typeof parsed.expiresAt !== "number" ||
      !Number.isFinite(parsed.expiresAt) ||
      parsed.expiresAt <= Date.now()
    ) {
      return { expiresAt: 0 };
    }
    return {
      expiresAt: parsed.expiresAt,
      first_visit_at: normalizeValue(parsed.first_visit_at, 64),
      msclkid: normalizeValue(parsed.msclkid, 500),
    };
  } catch {
    return { expiresAt: 0 };
  }
}

function writeEmailContext(context: EmailContextState) {
  safeLocalSet(EMAIL_CONTEXT_STORAGE_KEY, JSON.stringify({
    ...context,
    expiresAt: Date.now() + ATTRIBUTION_TTL_MS,
  }));
}

function readStoredValue(key: AttributionKey | "landing_page" | "referrer", durable: StoredAttribution) {
  return normalizeValue(safeSessionGet(key) || durable[key] || "");
}

export function initEmailAttributionContext() {
  const durable = readDurableAttribution();
  const context = readEmailContext();
  let changed = false;

  const existingLandingPage = readStoredValue("landing_page", durable);
  if (!context.first_visit_at && !existingLandingPage) {
    context.first_visit_at = new Date().toISOString();
    changed = true;
  }

  const currentMsclkid = normalizeValue(new URLSearchParams(window.location.search).get("msclkid"), 500);
  if (currentMsclkid && currentMsclkid !== context.msclkid) {
    context.msclkid = currentMsclkid;
    changed = true;
  }

  if (changed) writeEmailContext(context);
}

function readCurrentQueryFields() {
  const params = new URLSearchParams(window.location.search);
  const result = {} as Record<CurrentQueryKey, string>;
  for (const key of CURRENT_QUERY_KEYS) {
    result[key] = redactEmailLikeText(normalizeValue(params.get(key), 500));
  }
  return result;
}

function normalizeJourneyPath(value: unknown) {
  if (typeof value !== "string") return "";
  const path = value
    .split("")
    .filter((character) => {
      const code = character.charCodeAt(0);
      return code > 0x1f && code !== 0x7f;
    })
    .join("")
    .trim();
  if (!path || !path.startsWith("/") || path.startsWith("//")) return "";
  if (/^(?:https?:|javascript:|data:)/i.test(path)) return "";
  return path.split("?")[0] || "/";
}

function boundedJourney(entries: string[]) {
  const kept: string[] = [];
  let length = 0;
  for (let index = entries.length - 1; index >= 0; index -= 1) {
    const entry = entries[index];
    const separatorLength = kept.length ? 3 : 0;
    if (length + separatorLength + entry.length > MAX_PAGE_JOURNEY_LENGTH) continue;
    kept.unshift(entry);
    length += separatorLength + entry.length;
  }
  return kept.slice(-MAX_PAGE_JOURNEY_ENTRIES);
}

function readPageJourney() {
  const raw = safeSessionGet(PAGE_JOURNEY_KEY);
  if (!raw) return normalizeJourneyPath(window.location.pathname) || "/";
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return normalizeJourneyPath(window.location.pathname) || "/";
    const entries = parsed.map(normalizeJourneyPath).filter(Boolean);
    return boundedJourney(entries).join(" > ") || normalizeJourneyPath(window.location.pathname) || "/";
  } catch {
    return normalizeJourneyPath(window.location.pathname) || "/";
  }
}

function readWhatsappSnapshot() {
  const raw = safeSessionGet(WHATSAPP_CLICK_KEY);
  if (!raw) return { journey: "", path: "", count: 0 };
  try {
    const parsed = JSON.parse(raw) as { journey?: unknown; path?: unknown; count?: unknown };
    const journey = typeof parsed.journey === "string"
      ? boundedJourney(parsed.journey.split(" > ").map(normalizeJourneyPath).filter(Boolean)).join(" > ")
      : "";
    const path = normalizeJourneyPath(parsed.path);
    const count = typeof parsed.count === "number" && Number.isFinite(parsed.count)
      ? Math.max(0, Math.floor(parsed.count))
      : 0;
    return { journey, path, count };
  } catch {
    return { journey: "", path: "", count: 0 };
  }
}

function isPaidMedium(value: string) {
  return ["cpc", "ppc", "paid", "paid-search", "paid_social", "ads", "advertising"].includes(value);
}

function isSearchHost(host: string, provider: string) {
  return host === provider || host.endsWith(`.${provider}`);
}

function classifyLead(stored: Record<string, string>, firstReferrer: string) {
  const source = stored.utm_source.toLowerCase();
  const medium = stored.utm_medium.toLowerCase();
  const host = referrerHost(firstReferrer);

  if (stored.gclid || stored.gbraid || stored.wbraid || source === "google" && isPaidMedium(medium)) {
    return { lead_source: "Google Ads", lead_medium: "paid" };
  }
  if (stored.msclkid || ["bing", "microsoft", "msn"].includes(source) && isPaidMedium(medium)) {
    return { lead_source: "Microsoft Ads", lead_medium: "paid" };
  }
  if (stored.fbclid || ["facebook", "fb", "instagram", "meta"].includes(source) && isPaidMedium(medium)) {
    return { lead_source: "Meta Ads", lead_medium: "paid" };
  }
  if (source === "google" && (!medium || medium === "organic") || isSearchHost(host, "google.com")) {
    return { lead_source: "Google Organic", lead_medium: "organic" };
  }
  if (["bing", "microsoft"].includes(source) && (!medium || medium === "organic") || isSearchHost(host, "bing.com")) {
    return { lead_source: "Bing Organic", lead_medium: "organic" };
  }
  if (["yahoo.com", "duckduckgo.com", "baidu.com", "yandex.ru", "ecosia.org"].some((provider) => isSearchHost(host, provider))) {
    return { lead_source: "Other Organic", lead_medium: "organic" };
  }
  if (medium === "email" || source === "email" || source === "newsletter") {
    return { lead_source: "Email/Other Campaign", lead_medium: "email" };
  }
  if (source || medium || stored.utm_campaign) {
    return { lead_source: "Email/Other Campaign", lead_medium: "campaign" };
  }
  if (!firstReferrer) {
    return { lead_source: "Direct", lead_medium: "direct" };
  }
  return { lead_source: "Referral", lead_medium: "referral" };
}

export function getEmailAttributionSnapshot(options: EmailAttributionOptions = {}): EmailAttributionSnapshot {
  initEmailAttributionContext();

  const durable = readDurableAttribution();
  const context = readEmailContext();
  const stored = {
    gclid: readStoredValue("gclid", durable),
    gbraid: readStoredValue("gbraid", durable),
    wbraid: readStoredValue("wbraid", durable),
    utm_source: readStoredValue("utm_source", durable),
    utm_medium: readStoredValue("utm_medium", durable),
    utm_campaign: readStoredValue("utm_campaign", durable),
    utm_term: readStoredValue("utm_term", durable),
    utm_content: readStoredValue("utm_content", durable),
    fbclid: readStoredValue("fbclid", durable),
    msclkid: normalizeValue(context.msclkid, 500),
  };

  const landingPage = sanitizePageUrl(readStoredValue("landing_page", durable) || window.location.href);
  const firstReferrer = sanitizeReferrer(readStoredValue("referrer", durable));
  const currentPage = sanitizePageUrl(window.location.href);
  const currentReferrer = sanitizeReferrer(document.referrer);
  const current = readCurrentQueryFields();
  const classification = classifyLead(stored, firstReferrer);
  const whatsapp = readWhatsappSnapshot();
  const formEntryPage = sanitizePathWithAllowedQuery(
    safeSessionGet(FORM_ENTRY_PAGE_KEY) || window.location.href,
  );

  return {
    form_name: normalizeValue(options.formName, 100),
    inquiry_type: normalizeValue(options.inquiryType, 100),
    inquiry_type_label: normalizeValue(options.inquiryTypeLabel, 200),
    lead_source: classification.lead_source,
    lead_medium: classification.lead_medium,
    landing_page: landingPage,
    landing_path: pathFromUrl(landingPage),
    first_referrer: firstReferrer,
    referrer_host: referrerHost(firstReferrer),
    utm_source: stored.utm_source,
    utm_medium: stored.utm_medium,
    utm_campaign: stored.utm_campaign,
    utm_term: stored.utm_term,
    utm_content: stored.utm_content,
    gclid: stored.gclid,
    gbraid: stored.gbraid,
    wbraid: stored.wbraid,
    fbclid: stored.fbclid,
    msclkid: stored.msclkid,
    first_visit_at: normalizeValue(context.first_visit_at, 64),
    current_page: currentPage,
    current_path: window.location.pathname,
    page_url: currentPage,
    current_referrer: currentReferrer,
    current_referrer_host: referrerHost(currentReferrer),
    current_utm_source: current.utm_source,
    current_utm_medium: current.utm_medium,
    current_utm_campaign: current.utm_campaign,
    current_utm_term: current.utm_term,
    current_utm_content: current.utm_content,
    current_gclid: current.gclid,
    current_gbraid: current.gbraid,
    current_wbraid: current.wbraid,
    current_fbclid: current.fbclid,
    current_msclkid: current.msclkid,
    form_entry_page: formEntryPage,
    page_journey: readPageJourney(),
    whatsapp_click_journey: whatsapp.journey,
    whatsapp_click_path: whatsapp.path,
    whatsapp_click_count: whatsapp.count,
    submitted_at: normalizeValue(options.submittedAt, 64) || new Date().toISOString(),
    submission_id: normalizeValue(options.submissionId, 128),
  };
}
