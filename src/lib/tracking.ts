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
] as const;

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

  AD_PARAM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      safeSessionSet(key, value);
    }
  });
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

export function loadGtmWhenIdle() {
  const scheduleInject = () => {
    if (window.__teyesGtmLoaded) return;

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(injectGtm, { timeout: 3000 });
      return;
    }

    window.__teyesGtmLoadTimer = window.setTimeout(injectGtm, 1800);
  };

  if (document.readyState === "complete") {
    scheduleInject();
    return;
  }

  window.addEventListener("load", scheduleInject, { once: true });
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

export function delayForConversionDispatch(timeout = 300) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, timeout);
  });
}