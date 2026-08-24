import { afterEach, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const scriptPath = join(__dirname, "..", "..", "public", "lead-capture.js");
const staticLeadClient = readFileSync(scriptPath, "utf8");

afterEach(() => {
  sessionStorage.clear();
  localStorage.clear();
  document.body.innerHTML = "";
  delete (window as Window & { TeyesLeadCapture?: unknown }).TeyesLeadCapture;
  vi.unstubAllGlobals();
  vi.useRealTimers();
  history.replaceState({}, "", "/");
  Object.defineProperty(document, "referrer", { configurable: true, value: "" });
});

const form = () => document.querySelector<HTMLFormElement>("#lead")!;
const client = () => (window as Window & {
  TeyesLeadCapture: { capture: (target: HTMLFormElement, options: unknown) => Promise<void> };
}).TeyesLeadCapture;
const renderForm = () => {
  document.body.innerHTML = `
    <form id="lead">
      <input name="user_email" value="buyer@example.com">
      <input name="company_name" value="Buyer Auto">
      <input name="country" value="Brazil">
    </form>
  `;
};
const options = { source: "wholesale_quote", inquiryType: "Wholesale Inquiry" };

it("从表单和 sessionStorage 构造统一 payload", async () => {
  renderForm();
  sessionStorage.setItem("gclid", "click-123");
  sessionStorage.setItem("landing_page", "https://example.com/landing");
  const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
  vi.stubGlobal("fetch", fetchMock);
  window.eval(staticLeadClient);
  await client().capture(form(), options);
  const body = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
  expect(fetchMock.mock.calls[0][0]).toBe("/api/zoho-lead");
  expect(body).toMatchObject({
    source: "wholesale_quote", email: "buyer@example.com", company: "Buyer Auto", country: "Brazil",
    formEntryPage: "/", attribution: { gclid: "click-123", landing_page: "https://example.com/landing" },
  });
});

it("静态落地页在新会话使用持久化归因", async () => {
  renderForm();
  history.replaceState({}, "", "/landing?gclid=static-click&utm_source=google&utm_medium=cpc");
  window.eval(staticLeadClient);
  sessionStorage.clear();
  delete (window as Window & { TeyesLeadCapture?: unknown }).TeyesLeadCapture;
  history.replaceState({}, "", "/contact");
  const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
  vi.stubGlobal("fetch", fetchMock);
  window.eval(staticLeadClient);
  await client().capture(form(), options);
  expect(JSON.parse(String(fetchMock.mock.calls[0][1]?.body)).attribution).toMatchObject({
    gclid: "static-click", utm_source: "google", utm_medium: "cpc",
    landing_page: expect.stringContaining("/landing?gclid=static-click"),
  });
});

it("静态落地页忽略过期的持久化归因", async () => {
  vi.useFakeTimers();
  vi.setSystemTime("2026-08-21T00:00:00Z");
  renderForm();
  history.replaceState({}, "", "/landing?gclid=expired-static-click");
  window.eval(staticLeadClient);
  sessionStorage.clear();
  delete (window as Window & { TeyesLeadCapture?: unknown }).TeyesLeadCapture;
  vi.advanceTimersByTime(90 * 24 * 60 * 60 * 1000 + 1);
  history.replaceState({}, "", "/contact");
  const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
  vi.stubGlobal("fetch", fetchMock);
  window.eval(staticLeadClient);
  await client().capture(form(), options);
  expect(JSON.parse(String(fetchMock.mock.calls[0][1]?.body)).attribution.gclid).toBe("");
});

it("优先使用 form_entry_page，成功后清除并在缺失时回退到当前页面", async () => {
  renderForm();
  history.replaceState({}, "", "/products/cc4-pro/?variant=blue");
  sessionStorage.setItem("form_entry_page", "/products/cc4-pro/");
  const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
  vi.stubGlobal("fetch", fetchMock);
  window.eval(staticLeadClient);
  await client().capture(form(), options);
  expect(JSON.parse(String(fetchMock.mock.calls[0][1]?.body)).formEntryPage).toBe("/products/cc4-pro/");
  expect(sessionStorage.getItem("form_entry_page")).toBeNull();
  fetchMock.mockClear();
  await client().capture(form(), options);
  expect(JSON.parse(String(fetchMock.mock.calls[0][1]?.body)).formEntryPage).toBe("/products/cc4-pro/?variant=blue");
});

it("静态提交失败时保留 form_entry_page", async () => {
  renderForm();
  sessionStorage.setItem("form_entry_page", "/products/cc4-pro/");
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 500 })));
  window.eval(staticLeadClient);
  await expect(client().capture(form(), options)).rejects.toThrow("Zoho lead capture failed");
  expect(sessionStorage.getItem("form_entry_page")).toBe("/products/cc4-pro/");
});

it("静态落地页不会把后续站内页面记为首次 referrer", async () => {
  renderForm();
  history.replaceState({}, "", "/first");
  window.eval(staticLeadClient);
  sessionStorage.clear();
  delete (window as Window & { TeyesLeadCapture?: unknown }).TeyesLeadCapture;
  history.replaceState({}, "", "/contact");
  Object.defineProperty(document, "referrer", { configurable: true, value: "https://example.com/first" });
  const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
  vi.stubGlobal("fetch", fetchMock);
  window.eval(staticLeadClient);
  await client().capture(form(), options);
  expect(JSON.parse(String(fetchMock.mock.calls[0][1]?.body)).attribution.referrer).toBe("");
});

it("records the static-page journey and WA snapshot in the payload", async () => {
  renderForm();
  sessionStorage.removeItem("teyes_page_journey_v1");
  sessionStorage.removeItem("teyes_last_whatsapp_click_v1");
  history.replaceState({}, "", "/android-car-stereo-oem-manufacturer/");
  window.eval(staticLeadClient);
  history.replaceState({}, "", "/android-car-stereo-oem-manufacturer/pricing");
  document.body.insertAdjacentHTML(
    "beforeend",
    '<a data-wa-location="oem_pricing" href="https://wa.me/123?text=ignored">WA</a>',
  );
  window.dataLayer = [];
  document.querySelector("a")!.dispatchEvent(
    new MouseEvent("click", { bubbles: true, cancelable: true }),
  );
  const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
  vi.stubGlobal("fetch", fetchMock);

  await client().capture(form(), options);

  const body = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
  expect(body).toMatchObject({
    pageJourney: "/android-car-stereo-oem-manufacturer/ > /android-car-stereo-oem-manufacturer/pricing",
    whatsappClickPath: "/android-car-stereo-oem-manufacturer/pricing",
    whatsappClickCount: 1,
  });
  expect(window.dataLayer).toContainEqual(expect.objectContaining({
    event: "whatsapp_click",
    destination_host: "wa.me",
    link_location: "oem_pricing",
  }));
});

it("retains the static journey snapshot when lead capture fails", async () => {
  renderForm();
  sessionStorage.removeItem("teyes_page_journey_v1");
  sessionStorage.removeItem("teyes_last_whatsapp_click_v1");
  history.replaceState({}, "", "/android-car-stereo-wholesale/");
  window.eval(staticLeadClient);
  history.replaceState({}, "", "/android-car-stereo-wholesale/quote");
  document.body.insertAdjacentHTML(
    "beforeend",
    '<a data-wa-location="wholesale_quote" href="https://wa.me/456">WA</a>',
  );
  document.querySelector("a")!.dispatchEvent(
    new MouseEvent("click", { bubbles: true, cancelable: true }),
  );
  const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 500 }));
  vi.stubGlobal("fetch", fetchMock);

  await expect(client().capture(form(), options)).rejects.toThrow("Zoho lead capture failed");

  expect(sessionStorage.getItem("teyes_page_journey_v1")).not.toBeNull();
  expect(sessionStorage.getItem("teyes_last_whatsapp_click_v1")).not.toBeNull();
});
