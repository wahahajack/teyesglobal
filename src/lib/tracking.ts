const GTM_ID = "GTM-MSPH5TMK";
const FORM_ENTRY_PAGE_KEY = "form_entry_page";
const FORM_ENTRY_TARGET_PATHS = new Set([
  "/contact/",
  "/android-car-stereo-oem-manufacturer/",
  "/android-car-stereo-wholesale/",
  "/teyes-android-car-stereo-distributor/",
]);
const PAGE_JOURNEY_KEY = "teyes_page_journey_v1";
const WHATSAPP_CLICK_KEY = "teyes_last_whatsapp_click_v1";
const MAX_PAGE_JOURNEY_ENTRIES = 20;
const MAX_PAGE_JOURNEY_LENGTH = 1024;
const MAX_WHATSAPP_CLICK_PATH_LENGTH = 255;
const WHATSAPP_HOSTS = new Set([
  "wa.me",
  "api.whatsapp.com",
  "web.whatsapp.com",
]);

const AD_PARAM_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;
const STORED_ATTRIBUTION_KEYS = [
  ...AD_PARAM_KEYS,
  "landing_page",
  "referrer",
] as const;
const ATTRIBUTION_STORAGE_KEY = "teyes_attribution_v1";
const ATTRIBUTION_TTL_MS = 90 * 24 * 60 * 60 * 1000;

const GTM_INTERACTION_EVENTS = ["pointerdown", "touchstart", "keydown", "scroll"] as const;
const GTM_IDLE_DELAY_MS = 4000;

type AttributionKey = (typeof STORED_ATTRIBUTION_KEYS)[number];
type AttributionValues = Partial<Record<AttributionKey, string>>;

interface DurableAttribution {
  expiresAt: number;
  values: AttributionValues;
}

export interface PageJourneySnapshot {
  pageJourney: string;
  whatsappClickJourney: string;
  whatsappClickPath: string;
  whatsappClickCount: number;
}

interface StoredWhatsappClick {
  journey: string;
  path: string;
  count: number;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    __teyesGtmLoaded?: boolean;
    __teyesGtmLoadTimer?: number;
  }
}

function safeSessionSet(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable in some privacy modes. Tracking must not break the page.
  }
}

function safeSessionGet(key: string) {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSessionRemove(key: string) {
  try {
    sessionStorage.removeItem(key);
  } catch {
    // Storage can be unavailable in some privacy modes. Tracking must not break the page.
  }
}

function removeDurableAttribution() {
  try {
    localStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
  } catch {
    // Storage can be unavailable in some privacy modes.
  }
}

function readDurableAttribution(): DurableAttribution | null {
  try {
    const raw = localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      removeDurableAttribution();
      return null;
    }

    const candidate = parsed as { expiresAt?: unknown; values?: unknown };
    if (
      typeof candidate.expiresAt !== "number" ||
      !Number.isFinite(candidate.expiresAt) ||
      candidate.expiresAt <= Date.now() ||
      !candidate.values ||
      typeof candidate.values !== "object" ||
      Array.isArray(candidate.values)
    ) {
      removeDurableAttribution();
      return null;
    }

    const source = candidate.values as Record<string, unknown>;
    const values: AttributionValues = {};
    STORED_ATTRIBUTION_KEYS.forEach((key) => {
      if (typeof source[key] === "string") {
        values[key] = source[key];
      }
    });

    return { expiresAt: candidate.expiresAt, values };
  } catch {
    removeDurableAttribution();
    return null;
  }
}

function writeDurableAttribution(values: AttributionValues) {
  try {
    localStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify({
        expiresAt: Date.now() + ATTRIBUTION_TTL_MS,
        values,
      } satisfies DurableAttribution),
    );
  } catch {
    // Durable attribution is best-effort and must not break the page.
  }
}

function readStoredValue(key: AttributionKey, durable: AttributionValues) {
  return safeSessionGet(key) ?? durable[key] ?? null;
}

function hasStoredValue(key: AttributionKey, durable: AttributionValues) {
  return safeSessionGet(key) !== null ||
    Object.prototype.hasOwnProperty.call(durable, key);
}

function getCurrentPath() {
  return window.location.pathname + window.location.search;
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

function normalizeWhatsappLinkLocation(value: unknown) {
  if (typeof value !== "string") return "unknown";

  const location = value.trim();
  return /^[a-z0-9_-]{1,64}$/.test(location) ? location : "unknown";
}

function boundJourneyEntries(entries: string[], limit = MAX_PAGE_JOURNEY_LENGTH) {
  const kept: string[] = [];
  let length = 0;

  for (let index = entries.length - 1; index >= 0; index -= 1) {
    const entry = entries[index];
    const separatorLength = kept.length ? 3 : 0;
    if (length + separatorLength + entry.length > limit) continue;
    kept.unshift(entry);
    length += separatorLength + entry.length;
  }

  return kept.slice(-MAX_PAGE_JOURNEY_ENTRIES);
}

function normalizeWhatsappClickPath(value: unknown) {
  const path = normalizeJourneyPath(value);
  return path && path.length <= MAX_WHATSAPP_CLICK_PATH_LENGTH ? path : "";
}

function readPageJourneyEntries() {
  const raw = safeSessionGet(PAGE_JOURNEY_KEY);
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map(normalizeJourneyPath)
      .filter((entry): entry is string => Boolean(entry))
      .slice(-MAX_PAGE_JOURNEY_ENTRIES)
      .filter((entry) => entry.length <= MAX_PAGE_JOURNEY_LENGTH);
  } catch {
    return [];
  }
}

function formatJourney(entries: string[]) {
  return entries.join(" > ");
}

function readStoredWhatsappClick(): StoredWhatsappClick | null {
  const raw = safeSessionGet(WHATSAPP_CLICK_KEY);
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;

    const candidate = parsed as Partial<StoredWhatsappClick>;
    const journey = typeof candidate.journey === "string"
      ? formatJourney(boundJourneyEntries(candidate.journey.split(" > ").map(normalizeJourneyPath).filter(Boolean)))
      : "";
    const path = normalizeWhatsappClickPath(candidate.path);
    const count = typeof candidate.count === "number" && Number.isFinite(candidate.count)
      ? Math.max(0, Math.floor(candidate.count))
      : 0;

    if (!journey || !path || count < 1) return null;
    return {
      journey,
      path,
      count,
    };
  } catch {
    return null;
  }
}

function recordPageJourneyEntry() {
  const path = normalizeJourneyPath(window.location.pathname);
  if (!path) return;

  const entries = readPageJourneyEntries();
  if (entries[entries.length - 1] === path) return;

  entries.push(path);
  try {
    sessionStorage.setItem(
      PAGE_JOURNEY_KEY,
      JSON.stringify(boundJourneyEntries(entries)),
    );
  } catch {
    // Storage can be unavailable in some privacy modes. Tracking must not break the page.
  }
}

let contactEntryTrackingInstalled = false;
let pageJourneyTrackingInstalled = false;

export function installContactEntryTracking() {
  if (contactEntryTrackingInstalled) return;

  contactEntryTrackingInstalled = true;
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;

    const link = event.target.closest<HTMLAnchorElement>("a[href]");
    if (!link) return;

    const destination = new URL(link.getAttribute("href")!, window.location.origin);
    if (destination.origin === window.location.origin && FORM_ENTRY_TARGET_PATHS.has(destination.pathname)) {
      safeSessionSet(FORM_ENTRY_PAGE_KEY, getCurrentPath());
    }
  }, { capture: true });
}

export function getFormEntryPage() {
  return safeSessionGet(FORM_ENTRY_PAGE_KEY) || getCurrentPath();
}

export interface SubmissionTrackingTransaction {
  payload: PageJourneySnapshot & { formEntryPage: string };
  rollbackIfUnchanged: () => void;
}

export function beginSubmissionTracking(): SubmissionTrackingTransaction {
  const storedFormEntryPage = safeSessionGet(FORM_ENTRY_PAGE_KEY);
  const rawPageJourney = safeSessionGet(PAGE_JOURNEY_KEY);
  const rawWhatsappClick = safeSessionGet(WHATSAPP_CLICK_KEY);
  const payload = {
    formEntryPage: storedFormEntryPage || getCurrentPath(),
    ...getPageJourneySnapshot(),
  };

  safeSessionRemove(FORM_ENTRY_PAGE_KEY);
  safeSessionRemove(PAGE_JOURNEY_KEY);
  safeSessionRemove(WHATSAPP_CLICK_KEY);

  return {
    payload,
    rollbackIfUnchanged: () => {
      if (
        safeSessionGet(FORM_ENTRY_PAGE_KEY) !== null ||
        safeSessionGet(PAGE_JOURNEY_KEY) !== null ||
        safeSessionGet(WHATSAPP_CLICK_KEY) !== null
      ) {
        return;
      }

      if (storedFormEntryPage) {
        safeSessionSet(FORM_ENTRY_PAGE_KEY, storedFormEntryPage);
      }
      if (rawPageJourney) safeSessionSet(PAGE_JOURNEY_KEY, rawPageJourney);
      if (rawWhatsappClick) safeSessionSet(WHATSAPP_CLICK_KEY, rawWhatsappClick);
    },
  };
}

export function clearFormEntryPage() {
  try {
    sessionStorage.removeItem(FORM_ENTRY_PAGE_KEY);
  } catch {
    // Storage can be unavailable in some privacy modes. Tracking must not break the page.
  }
}

export function installPageJourneyTracking() {
  if (pageJourneyTrackingInstalled) return;

  pageJourneyTrackingInstalled = true;
  recordPageJourneyEntry();

  const originalPushState = history.pushState.bind(history);
  history.pushState = ((...args: Parameters<History["pushState"]>) => {
    const result = originalPushState(...args);
    recordPageJourneyEntry();
    return result;
  }) as History["pushState"];

  const originalReplaceState = history.replaceState.bind(history);
  history.replaceState = ((...args: Parameters<History["replaceState"]>) => {
    const result = originalReplaceState(...args);
    recordPageJourneyEntry();
    return result;
  }) as History["replaceState"];

  window.addEventListener("popstate", recordPageJourneyEntry);
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;

    const link = event.target.closest<HTMLAnchorElement>("a[href]");
    if (!link) return;

    let destination: URL;
    try {
      destination = new URL(link.getAttribute("href")!, window.location.href);
    } catch {
      return;
    }

    const destinationHost = destination.hostname.toLowerCase();
    const isWhatsAppLink = destination.protocol === "whatsapp:" || WHATSAPP_HOSTS.has(destinationHost);
    if (!isWhatsAppLink) return;
    const eventDestinationHost = destination.protocol === "whatsapp:" ? "whatsapp" : destinationHost;

    const journey = formatJourney(boundJourneyEntries(readPageJourneyEntries()));
    const path = normalizeJourneyPath(window.location.pathname) || "/";
    const clickPath = normalizeWhatsappClickPath(path);
    const previous = readStoredWhatsappClick();
    const count = (previous?.count ?? 0) + 1;
    const stored: StoredWhatsappClick = {
      journey: journey || path,
      path: clickPath,
      count,
    };
    const linkLocation = normalizeWhatsappLinkLocation(link.getAttribute("data-wa-location"));

    try {
      if (clickPath) sessionStorage.setItem(WHATSAPP_CLICK_KEY, JSON.stringify(stored));
    } catch {
      // Storage can be unavailable in some privacy modes. Tracking must not break the page.
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "whatsapp_click",
      page_path: path,
      page_journey: stored.journey,
      wa_click_path: clickPath,
      link_location: linkLocation,
      destination_host: eventDestinationHost,
    });
    loadGtmNow();
  }, { capture: true });
}

export function getPageJourneySnapshot(): PageJourneySnapshot {
  const entries = boundJourneyEntries(readPageJourneyEntries());
  const stored = readStoredWhatsappClick();
  const currentPath = normalizeJourneyPath(window.location.pathname) || "/";

  return {
    pageJourney: formatJourney(entries) || (currentPath.length <= MAX_PAGE_JOURNEY_LENGTH ? currentPath : "/"),
    whatsappClickJourney: stored?.journey ?? "",
    whatsappClickPath: stored?.path ?? "",
    whatsappClickCount: stored?.count ?? 0,
  };
}

export function clearPageJourney() {
  safeSessionRemove(PAGE_JOURNEY_KEY);
  safeSessionRemove(WHATSAPP_CLICK_KEY);
}

export function initDataLayer() {
  window.dataLayer = window.dataLayer || [];
}

export function persistAdParams() {
  const params = new URLSearchParams(window.location.search);
  const durable = readDurableAttribution()?.values ?? {};

  AD_PARAM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      safeSessionSet(key, value);
      durable[key] = value;
    }
  });

  if (!hasStoredValue("landing_page", durable)) {
    safeSessionSet("landing_page", window.location.href);
    durable.landing_page = window.location.href;
  }
  if (!hasStoredValue("referrer", durable)) {
    if (document.referrer) {
      safeSessionSet("referrer", document.referrer);
    }
    durable.referrer = document.referrer;
  }

  writeDurableAttribution(durable);
}

function injectGtm() {
  if (!GTM_ID || window.__teyesGtmLoaded) return;

  window.__teyesGtmLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "gtm.js",
    "gtm.start": Date.now(),
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

export function loadGtmNow() {
  if (window.__teyesGtmLoadTimer) {
    window.clearTimeout(window.__teyesGtmLoadTimer);
    window.__teyesGtmLoadTimer = undefined;
  }

  injectGtm();
}

function isGtmPreview() {
  const params = new URLSearchParams(window.location.search);

  return params.has("gtm_debug") || params.has("gtm_auth") || params.has("gtm_preview");
}

export function loadGtmWhenIdle() {
  const schedulePassiveLoad = () => {
    if (window.__teyesGtmLoaded) return;

    const loadFromInteraction = () => {
      cleanupInteractionListeners();
      loadGtmNow();
    };

    const cleanupInteractionListeners = () => {
      GTM_INTERACTION_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, loadFromInteraction);
      });
    };

    GTM_INTERACTION_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, loadFromInteraction, {
        once: true,
        passive: true,
      });
    });

    // Preview sessions must load immediately so Tag Assistant can connect.
    // Normal pageview tracking waits briefly; conversion events still call loadGtmNow() immediately.
    window.__teyesGtmLoadTimer = window.setTimeout(() => {
      cleanupInteractionListeners();
      injectGtm();
    }, GTM_IDLE_DELAY_MS);
  };

  if (isGtmPreview()) {
    loadGtmNow();
    return;
  }

  if (document.readyState === "complete") {
    schedulePassiveLoad();
    return;
  }

  window.addEventListener("load", schedulePassiveLoad, { once: true });
}

export function getStoredAdParams() {
  const durable = readDurableAttribution()?.values ?? {};

  return {
    gclid: readStoredValue("gclid", durable),
    gbraid: readStoredValue("gbraid", durable),
    wbraid: readStoredValue("wbraid", durable),
    utm_source: readStoredValue("utm_source", durable),
    utm_medium: readStoredValue("utm_medium", durable),
    utm_campaign: readStoredValue("utm_campaign", durable),
    utm_content: readStoredValue("utm_content", durable),
    utm_term: readStoredValue("utm_term", durable),
    fbclid: readStoredValue("fbclid", durable),
    landing_page: readStoredValue("landing_page", durable),
    referrer: readStoredValue("referrer", durable),
  };
}

export function pushFormSubmitSuccess(formName: string, extra?: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({
    event: "form_submit_success",
    form_name: formName,
    page_location: window.location.href,
    page_path: window.location.pathname,
    ...getStoredAdParams(),
    ...extra,
  });

  // Conversion events are higher priority than passive page tracking.
  // Wake GTM immediately so fast thank-you redirects do not lose the event.
  loadGtmNow();
}

export function pushContactEmailClick(email: string, extra?: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({
    event: "contact_email_click",
    contact_method: "email",
    email,
    page_location: window.location.href,
    page_path: window.location.pathname,
    ...getStoredAdParams(),
    ...extra,
  });

  // Email click is a micro-conversion; wake GTM so mail-client handoff is not missed.
  loadGtmNow();
}

export function delayForConversionDispatch(timeout = 300) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, timeout);
  });
}
