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
  localStorage.clear();
  vi.unstubAllGlobals();
  vi.useRealTimers();
  history.replaceState({}, "", "/");
  Object.defineProperty(document, "referrer", {
    configurable: true,
    value: "",
  });
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
