(function () {
  const ATTRIBUTION_KEYS = [
    "gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign",
    "utm_content", "utm_term", "fbclid",
  ];
  const CURRENT_QUERY_KEYS = [...ATTRIBUTION_KEYS, "msclkid"];
  const ALLOWED_EMAIL_URL_QUERY_KEYS = new Set(CURRENT_QUERY_KEYS);
  const GTM_PREVIEW_PARAM_KEYS = ["gtm_debug", "gtm_auth", "gtm_preview"];
  const STORED_ATTRIBUTION_KEYS = [...ATTRIBUTION_KEYS, "landing_page", "referrer"];
  const ATTRIBUTION_STORAGE_KEY = "teyes_attribution_v1";
  const EMAIL_CONTEXT_STORAGE_KEY = "teyes_email_context_v1";
  const ATTRIBUTION_TTL_MS = 90 * 24 * 60 * 60 * 1000;
  const TRACKING_REVISION_KEY = "teyes_tracking_revision_v1";
  const PAGE_JOURNEY_KEY = "teyes_page_journey_v1";
  const WHATSAPP_CLICK_KEY = "teyes_last_whatsapp_click_v1";
  const MAX_PAGE_JOURNEY_ENTRIES = 20;
  const MAX_PAGE_JOURNEY_LENGTH = 1024;
  const MAX_WHATSAPP_CLICK_PATH_LENGTH = 255;
  const MAX_FORM_ENTRY_LENGTH = 255;
  const LEAD_REQUEST_TIMEOUT_MS = 12000;
  const WHATSAPP_HOSTS = new Set(["wa.me", "api.whatsapp.com", "web.whatsapp.com"]);
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
  const cleanLandingPageUrl = (value) => {
    let landingPage;
    try {
      landingPage = new URL(value);
    } catch {
      return value;
    }
    if (!GTM_PREVIEW_PARAM_KEYS.some((key) => landingPage.searchParams.has(key))) {
      return value;
    }
    GTM_PREVIEW_PARAM_KEYS.forEach((key) => landingPage.searchParams.delete(key));
    return landingPage.href;
  };
  const normalizeValue = (value, maxLength = 2000) => String(value ?? "").trim().slice(0, maxLength);
  const redactEmailLikeText = (value) => value.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[redacted]");
  const safeUrl = (value) => {
    try { return new URL(value, window.location.origin); } catch { return null; }
  };
  const sanitizePageUrl = (value) => {
    const page = safeUrl(value);
    if (!page) return "";
    Array.from(page.searchParams.keys()).forEach((key) => {
      if (!ALLOWED_EMAIL_URL_QUERY_KEYS.has(key.toLowerCase())) {
        page.searchParams.delete(key);
      } else {
        page.searchParams.set(key, redactEmailLikeText(normalizeValue(page.searchParams.get(key), 500)));
      }
    });
    page.hash = "";
    return redactEmailLikeText(page.toString());
  };
  const sanitizeReferrer = (value) => {
    if (!value) return "";
    const referrer = safeUrl(value);
    if (!referrer) return "";
    referrer.search = "";
    referrer.hash = "";
    return redactEmailLikeText(referrer.toString());
  };
  const referrerHost = (value) => {
    const parsed = safeUrl(value);
    return parsed ? parsed.hostname.toLowerCase() : "";
  };
  const pathFromUrl = (value) => {
    const parsed = safeUrl(value);
    return parsed ? parsed.pathname : "";
  };
  const sanitizePathWithAllowedQuery = (value) => {
    const page = safeUrl(sanitizePageUrl(value));
    if (!page) return "";
    return (page.pathname + page.search).slice(0, MAX_FORM_ENTRY_LENGTH);
  };
  const readEmailContext = () => {
    try {
      const raw = window.localStorage.getItem(EMAIL_CONTEXT_STORAGE_KEY);
      if (!raw) return { expiresAt: 0 };
      const parsed = JSON.parse(raw);
      if (
        !parsed || typeof parsed !== "object" ||
        typeof parsed.expiresAt !== "number" ||
        !Number.isFinite(parsed.expiresAt) ||
        parsed.expiresAt <= Date.now()
      ) return { expiresAt: 0 };
      return {
        expiresAt: parsed.expiresAt,
        first_visit_at: normalizeValue(parsed.first_visit_at, 64),
        msclkid: normalizeValue(parsed.msclkid, 500),
      };
    } catch {
      return { expiresAt: 0 };
    }
  };
  const writeEmailContext = (context) => {
    try {
      window.localStorage.setItem(EMAIL_CONTEXT_STORAGE_KEY, JSON.stringify({
        ...context,
        expiresAt: Date.now() + ATTRIBUTION_TTL_MS,
      }));
    } catch { /* email context is best-effort */ }
  };
  const initEmailAttributionContext = () => {
    const durable = readDurable();
    const context = readEmailContext();
    let changed = false;
    if (!context.first_visit_at && !readStorage("landing_page", durable)) {
      context.first_visit_at = new Date().toISOString();
      changed = true;
    }
    const msclkid = normalizeValue(new URLSearchParams(window.location.search).get("msclkid"), 500);
    if (msclkid && msclkid !== context.msclkid) {
      context.msclkid = msclkid;
      changed = true;
    }
    if (changed) writeEmailContext(context);
  };
  const removeSession = (key) => {
    try { window.sessionStorage.removeItem(key); } catch { /* storage must not break forms */ }
  };
  const readTrackingRevision = () => {
    const revision = Number(readSession(TRACKING_REVISION_KEY));
    return Number.isSafeInteger(revision) && revision >= 0 ? revision : 0;
  };
  const advanceTrackingRevision = () => {
    const current = readTrackingRevision();
    const next = current >= Number.MAX_SAFE_INTEGER ? 1 : current + 1;
    writeSession(TRACKING_REVISION_KEY, String(next));
    return next;
  };
  const value = (formData, name) => String(formData.get(name) || "").trim();
  const createSubmissionId = () => {
    const bytes = crypto.getRandomValues(new Uint8Array(15));
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  };
  const currentPath = () => window.location.pathname + window.location.search;
  const normalizeJourneyPath = (value) => {
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
  };
  const boundJourneyEntries = (entries, limit = MAX_PAGE_JOURNEY_LENGTH) => {
    const kept = [];
    let length = 0;
    for (let index = entries.length - 1; index >= 0; index -= 1) {
      const entry = entries[index];
      const separatorLength = kept.length ? 3 : 0;
      if (length + separatorLength + entry.length > limit) continue;
      kept.unshift(entry);
      length += separatorLength + entry.length;
    }
    return kept.slice(-MAX_PAGE_JOURNEY_ENTRIES);
  };
  const normalizeWhatsappClickPath = (value) => {
    const path = normalizeJourneyPath(value);
    return path && path.length <= MAX_WHATSAPP_CLICK_PATH_LENGTH ? path : "";
  };
  const readPageJourneyEntries = () => {
    const raw = readSession(PAGE_JOURNEY_KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.map(normalizeJourneyPath).filter(Boolean).slice(-MAX_PAGE_JOURNEY_ENTRIES)
        .filter((entry) => entry.length <= MAX_PAGE_JOURNEY_LENGTH);
    } catch {
      return [];
    }
  };
  const recordPageJourneyEntry = () => {
    const path = normalizeJourneyPath(window.location.pathname);
    if (!path) return;
    const entries = readPageJourneyEntries();
    if (entries[entries.length - 1] === path) return;
    entries.push(path);
    writeSession(PAGE_JOURNEY_KEY, JSON.stringify(boundJourneyEntries(entries)));
    advanceTrackingRevision();
  };
  const readWhatsappClick = () => {
    const raw = readSession(WHATSAPP_CLICK_KEY);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
      const journey = typeof parsed.journey === "string"
        ? boundJourneyEntries(parsed.journey.split(" > ").map(normalizeJourneyPath).filter(Boolean)).join(" > ")
        : "";
      const path = normalizeWhatsappClickPath(parsed.path);
      const count = typeof parsed.count === "number" && Number.isFinite(parsed.count)
        ? Math.max(0, Math.floor(parsed.count))
        : 0;
      if (!journey || !path || count < 1) return null;
      return { journey, path, count };
    } catch {
      return null;
    }
  };
  const pageJourneySnapshot = () => {
    const entries = boundJourneyEntries(readPageJourneyEntries());
    const stored = readWhatsappClick();
    const current = normalizeJourneyPath(window.location.pathname) || "/";
    return {
      pageJourney: entries.join(" > ") || (current.length <= MAX_PAGE_JOURNEY_LENGTH ? current : "/"),
      whatsappClickJourney: stored?.journey || "",
      whatsappClickPath: stored?.path || "",
      whatsappClickCount: stored?.count || 0,
    };
  };
  const isPaidMedium = (medium) => ["cpc", "ppc", "paid", "paid-search", "paid_social", "ads", "advertising"].includes(medium);
  const isSearchHost = (host, provider) => host === provider || host.endsWith(`.${provider}`);
  const classifyLead = (stored, firstReferrer) => {
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
    if (!firstReferrer) return { lead_source: "Direct", lead_medium: "direct" };
    return { lead_source: "Referral", lead_medium: "referral" };
  };
  const getEmailAttributionSnapshot = (options = {}) => {
    initEmailAttributionContext();
    const durable = readDurable();
    const context = readEmailContext();
    const stored = {
      gclid: normalizeValue(readStorage("gclid", durable), 500),
      gbraid: normalizeValue(readStorage("gbraid", durable), 500),
      wbraid: normalizeValue(readStorage("wbraid", durable), 500),
      utm_source: normalizeValue(readStorage("utm_source", durable), 500),
      utm_medium: normalizeValue(readStorage("utm_medium", durable), 500),
      utm_campaign: normalizeValue(readStorage("utm_campaign", durable), 500),
      utm_term: normalizeValue(readStorage("utm_term", durable), 500),
      utm_content: normalizeValue(readStorage("utm_content", durable), 500),
      fbclid: normalizeValue(readStorage("fbclid", durable), 500),
      msclkid: normalizeValue(context.msclkid, 500),
    };
    const landingPage = sanitizePageUrl(readStorage("landing_page", durable) || window.location.href);
    const firstReferrer = sanitizeReferrer(readStorage("referrer", durable));
    const currentPage = sanitizePageUrl(window.location.href);
    const currentReferrer = sanitizeReferrer(document.referrer);
    const currentParams = new URLSearchParams(window.location.search);
    const current = Object.fromEntries(CURRENT_QUERY_KEYS.map((key) => [
      key,
      redactEmailLikeText(normalizeValue(currentParams.get(key), 500)),
    ]));
    const classification = classifyLead(stored, firstReferrer);
    const journey = pageJourneySnapshot();
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
      form_entry_page: sanitizePathWithAllowedQuery(readSession("form_entry_page") || window.location.href),
      page_journey: journey.pageJourney,
      whatsapp_click_journey: journey.whatsappClickJourney,
      whatsapp_click_path: journey.whatsappClickPath,
      whatsapp_click_count: journey.whatsappClickCount,
      submitted_at: normalizeValue(options.submittedAt, 64) || new Date().toISOString(),
      submission_id: normalizeValue(options.submissionId, 128),
    };
  };
  const staticFormMetadata = () => {
    const path = window.location.pathname;
    if (path === "/android-car-stereo-wholesale/" || path === "/android-car-stereo-wholesale") {
      return { formName: "wholesale_quote", inquiryType: "wholesale_quote", inquiryTypeLabel: "Wholesale Inquiry" };
    }
    if (path === "/android-car-stereo-oem-manufacturer/" || path === "/android-car-stereo-oem-manufacturer") {
      return { formName: "manufacturing_quote", inquiryType: "manufacturing_quote", inquiryTypeLabel: "OEM / ODM Manufacturing Quote" };
    }
    if (path === "/teyes-android-car-stereo-distributor/" || path === "/teyes-android-car-stereo-distributor") {
      return { formName: "distributor_application", inquiryType: "distributor_application", inquiryTypeLabel: "Distributor Application" };
    }
    return null;
  };
  const upsertHiddenField = (form, name, valueToSet) => {
    const existing = form.elements.namedItem(name);
    if (existing) {
      if (existing instanceof HTMLInputElement && existing.type === "hidden") {
        existing.value = String(valueToSet ?? "");
      }
      return;
    }
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = String(valueToSet ?? "");
    input.dataset.teyesEmailContext = "1";
    form.appendChild(input);
  };
  const installEmailContextInjection = () => {
    document.addEventListener("submit", (event) => {
      if (!(event.target instanceof HTMLFormElement)) return;
      const metadata = staticFormMetadata();
      if (!metadata) return;
      const form = event.target;
      const existingInquiry = form.elements.namedItem("inquiry_type");
      const inquiryType = existingInquiry && "value" in existingInquiry && existingInquiry.value
        ? String(existingInquiry.value)
        : metadata.inquiryType;
      const submissionControl = form.elements.namedItem("submission_id");
      const submissionId = submissionControl && "value" in submissionControl
        ? String(submissionControl.value || "")
        : "";
      const snapshot = getEmailAttributionSnapshot({
        ...metadata,
        inquiryType,
        submittedAt: new Date().toISOString(),
        submissionId,
      });
      Object.entries(snapshot).forEach(([name, fieldValue]) => upsertHiddenField(form, name, fieldValue));
    }, { capture: true });
  };
  const normalizeLinkLocation = (value) => {
    if (typeof value !== "string") return "unknown";
    const location = value.trim();
    return /^[a-z0-9_-]{1,64}$/.test(location) ? location : "unknown";
  };
  const installJourneyTracking = () => {
    if (window.__teyesJourneyTrackingInstalled) return;
    window.__teyesJourneyTrackingInstalled = true;
    recordPageJourneyEntry();

    const originalPushState = history.pushState.bind(history);
    history.pushState = (...args) => {
      const result = originalPushState(...args);
      recordPageJourneyEntry();
      return result;
    };
    const originalReplaceState = history.replaceState.bind(history);
    history.replaceState = (...args) => {
      const result = originalReplaceState(...args);
      recordPageJourneyEntry();
      return result;
    };
    window.addEventListener("popstate", recordPageJourneyEntry);
    document.addEventListener("click", (event) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!link) return;

      let destination;
      try {
        destination = new URL(link.getAttribute("href"), window.location.href);
      } catch {
        return;
      }
      const destinationHost = destination.hostname.toLowerCase();
      const isWhatsappLink = destination.protocol === "whatsapp:" || WHATSAPP_HOSTS.has(destinationHost);
      if (!isWhatsappLink) return;
      const eventDestinationHost = destination.protocol === "whatsapp:" ? "whatsapp" : destinationHost;

      const entries = boundJourneyEntries(readPageJourneyEntries());
      const path = normalizeJourneyPath(window.location.pathname) || "/";
      const clickPath = normalizeWhatsappClickPath(path);
      const previous = readWhatsappClick();
      const stored = {
        journey: entries.join(" > ") || path,
        path: clickPath,
        count: (previous?.count || 0) + 1,
      };
      if (clickPath) {
        writeSession(WHATSAPP_CLICK_KEY, JSON.stringify(stored));
        advanceTrackingRevision();
      }
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "whatsapp_click",
        page_path: path,
        page_journey: stored.journey,
        wa_click_path: clickPath,
        link_location: normalizeLinkLocation(link.getAttribute("data-wa-location")),
        destination_host: eventDestinationHost,
      });
    }, { capture: true });
  };

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
    const storedLandingPage = readStorage("landing_page", durable);
    if (storedLandingPage) {
      const landingPage = cleanLandingPageUrl(storedLandingPage);
      if (landingPage !== storedLandingPage) {
        writeSession("landing_page", landingPage);
        durable.landing_page = landingPage;
      }
    } else if (!hasStoredValue("landing_page", durable)) {
      const landingPage = cleanLandingPageUrl(window.location.href);
      writeSession("landing_page", landingPage);
      durable.landing_page = landingPage;
    }
    if (!hasStoredValue("referrer", durable)) {
      if (document.referrer) writeSession("referrer", document.referrer);
      durable.referrer = document.referrer;
    }
    writeDurable(durable);
  }

  const beginSubmissionTracking = () => {
    const storedFormEntryPage = readSession("form_entry_page");
    const rawPageJourney = readSession(PAGE_JOURNEY_KEY);
    const rawWhatsappClick = readSession(WHATSAPP_CLICK_KEY);
    const revision = advanceTrackingRevision();
    const payload = {
      formEntryPage: storedFormEntryPage || currentPath(),
      ...pageJourneySnapshot(),
    };

    removeSession("form_entry_page");
    removeSession(PAGE_JOURNEY_KEY);
    removeSession(WHATSAPP_CLICK_KEY);

    return {
      payload,
      rollbackIfUnchanged: () => {
        if (
          readTrackingRevision() !== revision ||
          readSession("form_entry_page") ||
          readSession(PAGE_JOURNEY_KEY) ||
          readSession(WHATSAPP_CLICK_KEY)
        ) return;
        if (storedFormEntryPage) writeSession("form_entry_page", storedFormEntryPage);
        if (rawPageJourney) writeSession(PAGE_JOURNEY_KEY, rawPageJourney);
        if (rawWhatsappClick) writeSession(WHATSAPP_CLICK_KEY, rawWhatsappClick);
      },
    };
  };

  function capture(form, options) {
    const formData = new FormData(form);
    const correlationId = options.submissionId || value(formData, "submission_id") || createSubmissionId();
    const durable = readDurable();
    const attribution = {
      landing_page: readStorage("landing_page", durable),
      referrer: readStorage("referrer", durable),
    };
    ATTRIBUTION_KEYS.forEach((key) => { attribution[key] = readStorage(key, durable); });
    const tracking = beginSubmissionTracking();
    const payload = {
      submissionId: correlationId,
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
      website: value(formData, "teyes_leave_blank") || value(formData, "website"),
      attribution,
      ...tracking.payload,
    };
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), LEAD_REQUEST_TIMEOUT_MS);
    return fetch("/api/zoho-lead", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload), keepalive: true, signal: controller.signal,
    }).then((response) => {
      if (!response.ok) throw new Error("Zoho lead capture failed");
      return response.json().catch(() => {
        throw new Error("Zoho lead capture failed: invalid_response");
      });
    }).then((result) => {
      const status = result && result.status;
      if (status !== "created" && status !== "duplicate") {
        throw new Error(`Zoho lead capture failed: ${status || "invalid_response"}`);
      }
      if (result.submission_id !== correlationId) {
        throw new Error("Zoho lead capture failed: correlation_mismatch");
      }
      return { status, submissionId: correlationId };
    }).catch((error) => {
      tracking.rollbackIfUnchanged();
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error("Zoho lead capture timed out");
      }
      throw error;
    }).finally(() => {
      window.clearTimeout(timer);
    });
  }

  installJourneyTracking();
  initEmailAttributionContext();
  persistAttribution();
  installEmailContextInjection();
  window.TeyesLeadCapture = Object.freeze({
    capture,
    createSubmissionId,
    persistAttribution,
    getEmailAttributionSnapshot,
  });
})();