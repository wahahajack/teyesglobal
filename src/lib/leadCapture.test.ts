import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildAttribution,
  submitZohoLead,
  type LeadCapturePayload,
} from "./leadCapture";
import {
  clearFormEntryPage,
  clearPageJourney,
  getFormEntryPage,
  getPageJourneySnapshot,
  getStoredAdParams,
  installContactEntryTracking,
  installPageJourneyTracking,
  persistAdParams,
} from "./tracking";

const validPayload: LeadCapturePayload = {
  source: "contact_page",
  fullName: "Jane Doe",
  email: "jane@example.com",
  company: "Example Auto",
  country: "Brazil",
  inquiryType: "General",
  message: "Please contact me.",
  estimatedQuantity: "",
  businessModel: "",
  submittedAt: "2026-08-07T10:00:00.000Z",
  website: "",
  attribution: {
    gclid: "",
    gbraid: "",
    wbraid: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
    fbclid: "",
    landing_page: "",
    referrer: "",
  },
};

afterEach(() => {
  sessionStorage.clear();
  localStorage.clear();
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
  vi.useRealTimers();
  history.replaceState({}, "", "/");
  Object.defineProperty(document, "referrer", {
    configurable: true,
    value: "",
  });
});

describe("lead capture attribution", () => {
  const formTargetRoutes = [
    "/contact/",
    "/android-car-stereo-oem-manufacturer/",
    "/android-car-stereo-wholesale/",
    "/teyes-android-car-stereo-distributor/",
  ];

  it("records the current page before a same-site Contact navigation", () => {
    history.replaceState({}, "", "/products/cc4-pro/?source=test");
    installContactEntryTracking();
    document.body.innerHTML = '<a href="/contact/?intent=oem">Contact</a>';
    const link = document.querySelector("a")!;
    link.addEventListener("click", (event) => event.preventDefault());
    link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));

    expect(getFormEntryPage()).toBe("/products/cc4-pro/?source=test");
  });

  it("captures the source page when navigation starts during the link click", () => {
    history.replaceState({}, "", "/landing/oem/?source=test");
    installContactEntryTracking();
    document.body.innerHTML = '<a href="/contact/">Contact</a>';
    const link = document.querySelector("a")!;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      history.replaceState({}, "", "/contact/");
    });
    link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));

    expect(getFormEntryPage()).toBe("/landing/oem/?source=test");
  });

  it.each(formTargetRoutes)(
    "records the current page before a same-site form CTA navigation to %s",
    (targetRoute) => {
      history.replaceState({}, "", "/products/cc4-pro/?source=test&variant=blue");
      installContactEntryTracking();
      document.body.innerHTML = `<a href="${targetRoute}?intent=oem">Quote</a>`;
      const link = document.querySelector("a")!;
      link.addEventListener("click", (event) => event.preventDefault());
      link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
      history.replaceState({}, "", `${targetRoute}?intent=oem`);

      expect(getFormEntryPage()).toBe("/products/cc4-pro/?source=test&variant=blue");
    },
  );

  it("uses the Contact URL when no navigation CTA was recorded", () => {
    history.replaceState({}, "", "/contact/?intent=oem");
    clearFormEntryPage();

    expect(getFormEntryPage()).toBe("/contact/?intent=oem");
  });

  it("首次带广告参数访问时保存初始落地页和 referrer", () => {
    history.replaceState({}, "", "/landing?gclid=test-click&utm_source=google");
    Object.defineProperty(document, "referrer", {
      configurable: true,
      value: "https://www.google.com/",
    });

    persistAdParams();

    expect(getStoredAdParams()).toMatchObject({
      gclid: "test-click",
      utm_source: "google",
      landing_page: expect.stringContaining("/landing?gclid=test-click"),
      referrer: "https://www.google.com/",
    });
  });

  it("后续页面不会覆盖初始落地页", () => {
    history.replaceState({}, "", "/first");
    persistAdParams();
    sessionStorage.clear();
    history.replaceState({}, "", "/contact");

    persistAdParams();

    expect(getStoredAdParams().landing_page).toContain("/first");
  });

  it("新会话从持久化存储恢复广告归因", () => {
    history.replaceState({}, "", "/landing?gclid=test-click&utm_source=google");
    persistAdParams();
    sessionStorage.clear();
    history.replaceState({}, "", "/contact");

    expect(getStoredAdParams()).toMatchObject({
      gclid: "test-click",
      utm_source: "google",
      landing_page: expect.stringContaining("/landing?gclid=test-click"),
    });
  });

  it("九十天后忽略过期的持久化归因", () => {
    vi.useFakeTimers();
    vi.setSystemTime("2026-08-21T00:00:00Z");
    history.replaceState({}, "", "/landing?gclid=expired-click");
    persistAdParams();
    expect(localStorage.length).toBe(1);
    sessionStorage.clear();

    vi.advanceTimersByTime(90 * 24 * 60 * 60 * 1000 + 1);

    expect(getStoredAdParams().gclid).toBeNull();
  });

  it("直接访问也记录首次落地页和 referrer", () => {
    history.replaceState({}, "", "/direct-entry");
    Object.defineProperty(document, "referrer", {
      configurable: true,
      value: "https://example.org/article",
    });

    persistAdParams();

    expect(getStoredAdParams()).toMatchObject({
      landing_page: expect.stringContaining("/direct-entry"),
      referrer: "https://example.org/article",
    });
  });

  it("首次 referrer 为空时不会被后续站内跳转覆盖", () => {
    history.replaceState({}, "", "/first");
    persistAdParams();
    sessionStorage.clear();
    history.replaceState({}, "", "/contact");
    Object.defineProperty(document, "referrer", {
      configurable: true,
      value: "https://example.com/first",
    });

    persistAdParams();

    expect(getStoredAdParams().referrer).toBe("");
  });

  it("构造的归因使用空字符串而非空值", () => {
    expect(buildAttribution()).toMatchObject({
      gclid: "",
      fbclid: "",
      landing_page: "",
      referrer: "",
    });
  });
});

describe("page journey and WhatsApp tracking", () => {
  it("records an ordered de-duplicated SPA journey", () => {
    history.replaceState({}, "", "/");
    clearPageJourney();
    installPageJourneyTracking();
    history.pushState({}, "", "/oem-odm/");
    history.pushState({}, "", "/oem-odm/");
    history.pushState({}, "", "/oem-odm/cases/");

    expect(getPageJourneySnapshot().pageJourney).toBe(
      "/ > /oem-odm/ > /oem-odm/cases/",
    );
  });

  it("captures the WA source page before navigation changes the URL", () => {
    history.replaceState({}, "", "/oem-odm/cases/");
    clearPageJourney();
    window.dataLayer = [];
    installPageJourneyTracking();
    document.body.innerHTML =
      '<a data-wa-location="cases_cta" href="https://wa.me/placeholder?text=ignored">WA</a>';
    const link = document.querySelector("a")!;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      history.replaceState({}, "", "/contact/");
    });

    link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));

    expect(getPageJourneySnapshot()).toMatchObject({
      whatsappClickPath: "/oem-odm/cases/",
      whatsappClickJourney: "/oem-odm/cases/",
      whatsappClickCount: 1,
    });
    expect(window.dataLayer).toContainEqual(expect.objectContaining({
      event: "whatsapp_click",
      page_path: "/oem-odm/cases/",
      wa_click_path: "/oem-odm/cases/",
      link_location: "cases_cta",
      destination_host: "wa.me",
    }));
  });

  it("bounds unsafe WhatsApp link locations and does not persist them", () => {
    history.replaceState({}, "", "/oem-odm/cases/");
    clearPageJourney();
    window.dataLayer = [];
    installPageJourneyTracking();
    document.body.innerHTML =
      '<a data-wa-location="https://attacker.example/path?x=1" href="https://wa.me/placeholder">WA</a>';
    const link = document.querySelector("a")!;
    link.addEventListener("click", (event) => event.preventDefault());
    link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));

    expect(window.dataLayer).toContainEqual(expect.objectContaining({
      event: "whatsapp_click",
      link_location: "unknown",
    }));
    expect(JSON.parse(sessionStorage.getItem("teyes_last_whatsapp_click_v1")!)).not.toHaveProperty(
      "location",
    );
  });

  it("keeps more than 21 routes within the client journey character budget", () => {
    history.replaceState({}, "", "/journey-start/");
    clearPageJourney();
    installPageJourneyTracking();

    for (let index = 0; index < 24; index += 1) {
      history.pushState({}, "", `/journey-${"x".repeat(52)}-${index}/`);
    }

    const snapshot = getPageJourneySnapshot();
    const storedEntries = JSON.parse(sessionStorage.getItem("teyes_page_journey_v1") || "[]") as string[];
    const entries = snapshot.pageJourney.split(" > ");
    expect(storedEntries.join(" > ").length).toBeLessThanOrEqual(1024);
    expect(entries.length).toBeLessThanOrEqual(20);
    expect(snapshot.pageJourney.length).toBeLessThanOrEqual(1024);
    expect(entries.every((entry) => /^\/[^>]+\/$/.test(entry))).toBe(true);
  });

  it("records a route restored through popstate", () => {
    history.replaceState({}, "", "/journey-popstate-start/");
    clearPageJourney();
    installPageJourneyTracking();
    history.pushState({}, "", "/journey-popstate-next/");
    history.replaceState({}, "", "/journey-popstate-start/");
    window.dispatchEvent(new PopStateEvent("popstate"));

    expect(getPageJourneySnapshot().pageJourney).toContain("/journey-popstate-start/");
  });

  it.each([
    ["wa.me", "https://wa.me/placeholder?phone=synthetic&message=ignored", "wa.me"],
    ["api.whatsapp.com", "https://api.whatsapp.com/send?phone=synthetic&message=ignored", "api.whatsapp.com"],
    ["web.whatsapp.com", "https://web.whatsapp.com/send?phone=synthetic&message=ignored", "web.whatsapp.com"],
    ["whatsapp:", "whatsapp://send?phone=synthetic&message=ignored", "send"],
  ])("records only approved fields for %s WhatsApp destinations", (_name, href, destinationHost) => {
    history.replaceState({}, "", "/journey-whatsapp/");
    clearPageJourney();
    window.dataLayer = [];
    installPageJourneyTracking();
    document.body.innerHTML = `<a data-wa-location="synthetic_cta" href="${href}">WhatsApp</a>`;
    const link = document.querySelector("a")!;
    link.addEventListener("click", (event) => event.preventDefault());
    link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));

    const whatsappEvents = window.dataLayer.filter((item) => item.event === "whatsapp_click");
    expect(whatsappEvents).toEqual([{
      event: "whatsapp_click",
      page_path: "/journey-whatsapp/",
      page_journey: "/journey-whatsapp/",
      wa_click_path: "/journey-whatsapp/",
      link_location: "synthetic_cta",
      destination_host: destinationHost,
    }]);
    expect(JSON.stringify(whatsappEvents)).not.toMatch(/href|phone|message|placeholder|ignored|text/);
  });

  it("ignores non-WhatsApp links", () => {
    history.replaceState({}, "", "/journey-non-whatsapp/");
    clearPageJourney();
    window.dataLayer = [];
    installPageJourneyTracking();
    document.body.innerHTML = '<a href="https://example.test/placeholder?text=ignored">Other</a>';
    const link = document.querySelector("a")!;
    link.addEventListener("click", (event) => event.preventDefault());
    link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));

    expect(window.dataLayer).toEqual([]);
    expect(getPageJourneySnapshot().whatsappClickPath).toBe("");
  });

  it("survives unavailable session storage", () => {
    history.replaceState({}, "", "/journey-storage-error/");
    clearPageJourney();
    const getItem = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("storage disabled");
    });
    const setItem = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("storage disabled");
    });
    const removeItem = vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
      throw new Error("storage disabled");
    });
    installPageJourneyTracking();
    document.body.innerHTML = '<a href="https://wa.me/placeholder?text=ignored">WA</a>';
    const link = document.querySelector("a")!;
    link.addEventListener("click", (event) => event.preventDefault());

    expect(() => link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }))).not.toThrow();
    expect(getPageJourneySnapshot()).toMatchObject({
      pageJourney: "/journey-storage-error/",
      whatsappClickJourney: "",
      whatsappClickPath: "",
      whatsappClickCount: 0,
    });
    getItem.mockRestore();
    setItem.mockRestore();
    expect(() => clearPageJourney()).not.toThrow();
    removeItem.mockRestore();
  });
});

describe("submitZohoLead", () => {
  it("accepts a caller payload without formEntryPage and sends the captured entry page", async () => {
    history.replaceState({}, "", "/products/cc4-pro/?source=test");
    installContactEntryTracking();
    document.body.innerHTML = '<a href="/contact/">Contact</a>';
    const link = document.querySelector("a")!;
    link.addEventListener("click", (event) => event.preventDefault());
    link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 201 })));

    await submitZohoLead(validPayload);

    expect(fetch).toHaveBeenCalledWith(
      "/api/zoho-lead",
      expect.objectContaining({
        body: expect.stringContaining('"formEntryPage":"/products/cc4-pro/?source=test"'),
      }),
    );
  });

  it("使用同源端点和 keepalive", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 201 }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await submitZohoLead(validPayload);

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/zoho-lead",
      expect.objectContaining({
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
      }),
    );
  });

  it("sends the recorded form entry page and clears it after success", async () => {
    history.replaceState({}, "", "/products/cc4-pro/?source=test");
    installContactEntryTracking();
    document.body.innerHTML = '<a href="/contact/">Contact</a>';
    const link = document.querySelector("a")!;
    link.addEventListener("click", (event) => event.preventDefault());
    link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    history.replaceState({}, "", "/contact/");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 201 })));

    await submitZohoLead(validPayload);

    expect(fetch).toHaveBeenCalledWith(
      "/api/zoho-lead",
      expect.objectContaining({
        body: expect.stringContaining('"formEntryPage":"/products/cc4-pro/?source=test"'),
      }),
    );
    expect(getFormEntryPage()).toBe("/contact/");
  });

  it("sends the latest page and WA snapshot and clears it after success", async () => {
    clearPageJourney();
    history.replaceState({}, "", "/oem-odm/cases/");
    installPageJourneyTracking();
    document.body.innerHTML =
      '<a data-wa-location="cases_cta" href="https://wa.me/placeholder">WA</a>';
    const link = document.querySelector("a")!;
    link.addEventListener("click", (event) => event.preventDefault());
    link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
    vi.stubGlobal("fetch", fetchMock);

    await submitZohoLead(validPayload);

    const body = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
    expect(body).toMatchObject({
      pageJourney: "/oem-odm/cases/",
      whatsappClickJourney: "/oem-odm/cases/",
      whatsappClickPath: "/oem-odm/cases/",
      whatsappClickCount: 1,
    });
    expect(getPageJourneySnapshot().whatsappClickPath).toBe("");
  });

  it("keeps the journey when Zoho submission fails", async () => {
    installPageJourneyTracking();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 500 })));

    await expect(submitZohoLead(validPayload)).rejects.toThrow(
      "Zoho lead request failed with 500",
    );
    expect(getPageJourneySnapshot().pageJourney).not.toBe("");
  });

  it("bounds serialized journey values before a keepalive request", async () => {
    clearPageJourney();
    history.replaceState({}, "", `/${"y".repeat(300)}/`);
    installPageJourneyTracking();
    document.body.innerHTML = '<a href="https://wa.me/placeholder?message=ignored">WA</a>';
    const link = document.querySelector("a")!;
    link.addEventListener("click", (event) => event.preventDefault());
    link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
    vi.stubGlobal("fetch", fetchMock);

    await submitZohoLead(validPayload);

    const body = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
    expect(body.pageJourney.length).toBeLessThanOrEqual(1024);
    expect(body.whatsappClickJourney.length).toBeLessThanOrEqual(1024);
    expect(body.whatsappClickPath.length).toBeLessThanOrEqual(255);
    expect(body.whatsappClickPath).toBe("");
  });
});
