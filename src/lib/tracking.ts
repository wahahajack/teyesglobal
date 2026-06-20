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
      sessionStorage.setItem(key, value);
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

export function loadGtmWhenIdle() {
  const scheduleInject = () => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(injectGtm, { timeout: 3000 });
      return;
    }

    window.setTimeout(injectGtm, 1800);
  };

  if (document.readyState === "complete") {
    scheduleInject();
    return;
  }

  window.addEventListener("load", scheduleInject, { once: true });
}

export function pushFormSubmitSuccess(formName: string, extra?: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({
    event: "form_submit_success",
    form_name: formName,
    page_location: window.location.href,
    page_path: window.location.pathname,
    gclid: sessionStorage.getItem("gclid"),
    gbraid: sessionStorage.getItem("gbraid"),
    wbraid: sessionStorage.getItem("wbraid"),
    utm_source: sessionStorage.getItem("utm_source"),
    utm_medium: sessionStorage.getItem("utm_medium"),
    utm_campaign: sessionStorage.getItem("utm_campaign"),
    utm_content: sessionStorage.getItem("utm_content"),
    utm_term: sessionStorage.getItem("utm_term"),
    ...extra,
  });
}