const GTM_ID = "GTM-MSPH5TMK";

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
