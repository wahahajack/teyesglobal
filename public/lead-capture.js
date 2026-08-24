(function () {
  const ATTRIBUTION_KEYS = [
    "gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign",
    "utm_content", "utm_term", "fbclid",
  ];
  const STORED_ATTRIBUTION_KEYS = [...ATTRIBUTION_KEYS, "landing_page", "referrer"];
  const ATTRIBUTION_STORAGE_KEY = "teyes_attribution_v1";
  const ATTRIBUTION_TTL_MS = 90 * 24 * 60 * 60 * 1000;
  const PAGE_JOURNEY_KEY = "teyes_page_journey_v1";
  const WHATSAPP_CLICK_KEY = "teyes_last_whatsapp_click_v1";
  const MAX_PAGE_JOURNEY_ENTRIES = 20;
  const MAX_PAGE_JOURNEY_LENGTH = 1024;
  const MAX_WHATSAPP_CLICK_PATH_LENGTH = 255;
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
  const removeSession = (key) => {
    try { window.sessionStorage.removeItem(key); } catch { /* storage must not break forms */ }
  };
  const value = (formData, name) => String(formData.get(name) || "").trim();
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

      const entries = boundJourneyEntries(readPageJourneyEntries());
      const path = normalizeJourneyPath(window.location.pathname) || "/";
      const clickPath = normalizeWhatsappClickPath(path);
      const previous = readWhatsappClick();
      const stored = {
        journey: entries.join(" > ") || path,
        path: clickPath,
        count: (previous?.count || 0) + 1,
      };
      if (clickPath) writeSession(WHATSAPP_CLICK_KEY, JSON.stringify(stored));
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "whatsapp_click",
        page_path: path,
        page_journey: stored.journey,
        wa_click_path: clickPath,
        link_location: normalizeLinkLocation(link.getAttribute("data-wa-location")),
        destination_host: destinationHost || destination.protocol.replace(":", ""),
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
      ...pageJourneySnapshot(),
    };
    return fetch("/api/zoho-lead", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload), keepalive: true,
    }).then((response) => {
      if (!response.ok) throw new Error("Zoho lead capture failed");
      removeSession("form_entry_page");
      removeSession(PAGE_JOURNEY_KEY);
      removeSession(WHATSAPP_CLICK_KEY);
    });
  }

  installJourneyTracking();
  persistAttribution();
  window.TeyesLeadCapture = Object.freeze({ capture, persistAttribution });
})();
