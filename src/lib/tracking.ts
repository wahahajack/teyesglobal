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

const GTM_INTERACTION_EVENTS = ["pointerdown", "touchstart", "keydown", "scroll"] as const;
const GTM_IDLE_DELAY_MS = 4000;

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

export function initDataLayer() {
  window.dataLayer = window.dataLayer || [];
}

export function persistAdParams() {
  const params = new URLSearchParams(window.location.search);
  const hasAdParam = AD_PARAM_KEYS.some((key) => Boolean(params.get(key)));

  AD_PARAM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      safeSessionSet(key, value);
    }
  });

  if (hasAdParam) {
    if (!safeSessionGet("landing_page")) {
      safeSessionSet("landing_page", window.location.href);
    }
    if (!safeSessionGet("referrer") && document.referrer) {
      safeSessionSet("referrer", document.referrer);
    }
  }
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
  return {
    gclid: safeSessionGet("gclid"),
    gbraid: safeSessionGet("gbraid"),
    wbraid: safeSessionGet("wbraid"),
    utm_source: safeSessionGet("utm_source"),
    utm_medium: safeSessionGet("utm_medium"),
    utm_campaign: safeSessionGet("utm_campaign"),
    utm_content: safeSessionGet("utm_content"),
    utm_term: safeSessionGet("utm_term"),
    fbclid: safeSessionGet("fbclid"),
    landing_page: safeSessionGet("landing_page"),
    referrer: safeSessionGet("referrer"),
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
