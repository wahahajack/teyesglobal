(function () {
  const ATTRIBUTION_KEYS = [
    "gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign",
    "utm_content", "utm_term", "fbclid",
  ];
  const STORED_ATTRIBUTION_KEYS = [...ATTRIBUTION_KEYS, "landing_page", "referrer"];
  const ATTRIBUTION_STORAGE_KEY = "teyes_attribution_v1";
  const ATTRIBUTION_TTL_MS = 90 * 24 * 60 * 60 * 1000;
  const readSession = (key) => {
    try { return window.sessionStorage.getItem(key) || ""; } catch { return ""; }
  };
  const writeSession = (key, value) => {
    try { window.sessionStorage.setItem(key, value); } catch { /* storage must not break forms */ }
  };
  const removeDurable = () => {
    try { window.localStorage.removeItem(ATTRIBUTION_STORAGE_KEY); } catch { /* storage can be unavailable */ }
  };
  const readDurable = () => {
    try {
      const raw = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      if (
        !parsed || typeof parsed !== "object" ||
        typeof parsed.expiresAt !== "number" ||
        !Number.isFinite(parsed.expiresAt) ||
        parsed.expiresAt <= Date.now() ||
        !parsed.values || typeof parsed.values !== "object" ||
        Array.isArray(parsed.values)
      ) {
        removeDurable();
        return {};
      }
      return Object.fromEntries(
        STORED_ATTRIBUTION_KEYS
          .filter((key) => typeof parsed.values[key] === "string")
          .map((key) => [key, parsed.values[key]]),
      );
    } catch {
      removeDurable();
      return {};
    }
  };
  const writeDurable = (values) => {
    try {
      window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify({
        expiresAt: Date.now() + ATTRIBUTION_TTL_MS,
        values,
      }));
    } catch { /* durable attribution must not break forms */ }
  };
  const readStorage = (key, durable) => readSession(key) || durable[key] || "";
  const hasStoredValue = (key, durable) => {
    try {
      if (window.sessionStorage.getItem(key) !== null) return true;
    } catch { /* fall back to durable storage */ }
    return Object.prototype.hasOwnProperty.call(durable, key);
  };
  const removeSession = (key) => {
    try { window.sessionStorage.removeItem(key); } catch { /* storage must not break forms */ }
  };
  const value = (formData, name) => String(formData.get(name) || "").trim();
  const currentPath = () => window.location.pathname + window.location.search;

  function persistAttribution() {
    const params = new URLSearchParams(window.location.search);
    const durable = readDurable();
    ATTRIBUTION_KEYS.forEach((key) => {
      const param = params.get(key);
      if (param) {
        writeSession(key, param);
        durable[key] = param;
      }
    });
    if (!hasStoredValue("landing_page", durable)) {
      writeSession("landing_page", window.location.href);
      durable.landing_page = window.location.href;
    }
    if (!hasStoredValue("referrer", durable)) {
      if (document.referrer) writeSession("referrer", document.referrer);
      durable.referrer = document.referrer;
    }
    writeDurable(durable);
  }

  function capture(form, options) {
    const formData = new FormData(form);
    const durable = readDurable();
    const attribution = {
      landing_page: readStorage("landing_page", durable),
      referrer: readStorage("referrer", durable),
    };
    ATTRIBUTION_KEYS.forEach((key) => { attribution[key] = readStorage(key, durable); });
    const payload = {
      source: options.source,
      fullName: value(formData, "contact_name"),
      email: value(formData, "user_email"),
      company: value(formData, "company_name"),
      country: value(formData, "country"),
      inquiryType: options.inquiryType,
      message: value(formData, "message"),
      estimatedQuantity: value(formData, "estimated_quantity"),
      businessModel: value(formData, "business_model"),
      formEntryPage: readSession("form_entry_page") || currentPath(),
      submittedAt: new Date().toISOString(),
      website: value(formData, "website"),
      attribution,
    };
    return fetch("/api/zoho-lead", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload), keepalive: true,
    }).then((response) => {
      if (!response.ok) throw new Error("Zoho lead capture failed");
      removeSession("form_entry_page");
    });
  }

  persistAttribution();
  window.TeyesLeadCapture = Object.freeze({ capture, persistAttribution });
})();
