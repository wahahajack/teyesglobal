(function () {
  const ATTRIBUTION_KEYS = [
    "gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign",
    "utm_content", "utm_term", "fbclid",
  ];
  const readStorage = (key) => {
    try { return window.sessionStorage.getItem(key) || ""; } catch { return ""; }
  };
  const writeStorage = (key, value) => {
    try { window.sessionStorage.setItem(key, value); } catch { /* storage must not break forms */ }
  };
  const value = (formData, name) => String(formData.get(name) || "").trim();

  function persistAttribution() {
    const params = new URLSearchParams(window.location.search);
    const hasAdParam = ATTRIBUTION_KEYS.some((key) => Boolean(params.get(key)));
    ATTRIBUTION_KEYS.forEach((key) => {
      const param = params.get(key);
      if (param) writeStorage(key, param);
    });
    if (hasAdParam && !readStorage("landing_page")) writeStorage("landing_page", window.location.href);
    if (!readStorage("referrer") && document.referrer) writeStorage("referrer", document.referrer);
  }

  function capture(form, options) {
    const formData = new FormData(form);
    const attribution = { landing_page: readStorage("landing_page"), referrer: readStorage("referrer") };
    ATTRIBUTION_KEYS.forEach((key) => { attribution[key] = readStorage(key); });
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
      submittedAt: new Date().toISOString(),
      website: value(formData, "website"),
      attribution,
    };
    return fetch("/.netlify/functions/create-zoho-lead", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload), keepalive: true,
    }).then((response) => {
      if (!response.ok) throw new Error("Zoho lead capture failed");
    });
  }

  persistAttribution();
  window.TeyesLeadCapture = Object.freeze({ capture, persistAttribution });
})();
