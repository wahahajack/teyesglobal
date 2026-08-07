import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildAttribution,
  submitZohoLead,
  type LeadCapturePayload,
} from "./leadCapture";
import { getStoredAdParams, persistAdParams } from "./tracking";

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
  vi.unstubAllGlobals();
  history.replaceState({}, "", "/");
});

describe("lead capture attribution", () => {
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
});
