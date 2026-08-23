import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildAttribution,
  submitZohoLead,
  type LeadCapturePayload,
} from "./leadCapture";
import {
  clearFormEntryPage,
  getFormEntryPage,
  getStoredAdParams,
  installContactEntryTracking,
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
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
  history.replaceState({}, "", "/");
});

describe("lead capture attribution", () => {
  it("records the current page before a same-site Contact navigation", () => {
    history.replaceState({}, "", "/products/cc4-pro/?source=test");
    installContactEntryTracking();
    document.body.innerHTML = '<a href="/contact/?intent=oem">Contact</a>';
    const link = document.querySelector("a")!;
    link.addEventListener("click", (event) => event.preventDefault());
    link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));

    expect(getFormEntryPage()).toBe("/products/cc4-pro/?source=test");
  });

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
    sessionStorage.setItem("landing_page", "https://example.com/first");
    history.replaceState({}, "", "/contact");

    persistAdParams();

    expect(getStoredAdParams().landing_page).toBe("https://example.com/first");
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
});
