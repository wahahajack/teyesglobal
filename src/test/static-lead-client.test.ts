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
  Object.defineProperty(document, "referrer", {
    configurable: true,
    value: "",
  });
});

it("从表单和 sessionStorage 构造统一 payload", async () => {
  document.body.innerHTML = `
    <form id="lead">
      <input name="user_email" value="buyer@example.com">
      <input name="company_name" value="Buyer Auto">
      <input name="country" value="Brazil">
    </form>
  `;
  sessionStorage.setItem("gclid", "click-123");
  sessionStorage.setItem("landing_page", "https://example.com/landing");
  const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
  vi.stubGlobal("fetch", fetchMock);

  window.eval(staticLeadClient);
  const client = (window as Window & { TeyesLeadCapture: { capture: (form: HTMLFormElement, options: unknown) => Promise<void> } }).TeyesLeadCapture;
  await client.capture(document.querySelector<HTMLFormElement>("#lead")!, { source: "wholesale_quote", inquiryType: "Wholesale Inquiry" });

  const body = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
  expect(fetchMock.mock.calls[0][0]).toBe("/api/zoho-lead");
  expect(body).toMatchObject({
    source: "wholesale_quote", email: "buyer@example.com", company: "Buyer Auto", country: "Brazil",
    attribution: { gclid: "click-123", landing_page: "https://example.com/landing" },
  });
});

it("静态落地页在新会话使用持久化归因", async () => {
  document.body.innerHTML = `
    <form id="lead">
      <input name="user_email" value="buyer@example.com">
      <input name="company_name" value="Buyer Auto">
    </form>
  `;
  history.replaceState(
    {},
    "",
    "/landing?gclid=static-click&utm_source=google&utm_medium=cpc",
  );
  window.eval(staticLeadClient);
  sessionStorage.clear();
  delete (window as Window & { TeyesLeadCapture?: unknown }).TeyesLeadCapture;
  history.replaceState({}, "", "/contact");

  const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
  vi.stubGlobal("fetch", fetchMock);
  window.eval(staticLeadClient);
  const client = (window as Window & {
    TeyesLeadCapture: {
      capture: (form: HTMLFormElement, options: unknown) => Promise<void>;
    };
  }).TeyesLeadCapture;
  await client.capture(document.querySelector<HTMLFormElement>("#lead")!, {
    source: "wholesale_quote",
    inquiryType: "Wholesale Inquiry",
  });

  const body = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
  expect(body.attribution).toMatchObject({
    gclid: "static-click",
    utm_source: "google",
    utm_medium: "cpc",
    landing_page: expect.stringContaining("/landing?gclid=static-click"),
  });
});

it("静态落地页忽略九十天前的持久化归因", async () => {
  vi.useFakeTimers();
  vi.setSystemTime("2026-08-21T00:00:00Z");
  document.body.innerHTML = `
    <form id="lead">
      <input name="user_email" value="buyer@example.com">
    </form>
  `;
  history.replaceState({}, "", "/landing?gclid=expired-static-click");
  window.eval(staticLeadClient);
  expect(localStorage.length).toBe(1);
  sessionStorage.clear();
  delete (window as Window & { TeyesLeadCapture?: unknown }).TeyesLeadCapture;
  vi.advanceTimersByTime(90 * 24 * 60 * 60 * 1000 + 1);
  history.replaceState({}, "", "/contact");

  const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
  vi.stubGlobal("fetch", fetchMock);
  window.eval(staticLeadClient);
  const client = (window as Window & {
    TeyesLeadCapture: {
      capture: (form: HTMLFormElement, options: unknown) => Promise<void>;
    };
  }).TeyesLeadCapture;
  await client.capture(document.querySelector<HTMLFormElement>("#lead")!, {
    source: "wholesale_quote",
    inquiryType: "Wholesale Inquiry",
  });

  const body = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
  expect(body.attribution.gclid).toBe("");
});

it("静态落地页不会把后续站内页面记为首次 referrer", async () => {
  document.body.innerHTML = `
    <form id="lead">
      <input name="user_email" value="buyer@example.com">
    </form>
  `;
  history.replaceState({}, "", "/first");
  window.eval(staticLeadClient);
  sessionStorage.clear();
  delete (window as Window & { TeyesLeadCapture?: unknown }).TeyesLeadCapture;
  history.replaceState({}, "", "/contact");
  Object.defineProperty(document, "referrer", {
    configurable: true,
    value: "https://example.com/first",
  });

  const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
  vi.stubGlobal("fetch", fetchMock);
  window.eval(staticLeadClient);
  const client = (window as Window & {
    TeyesLeadCapture: {
      capture: (form: HTMLFormElement, options: unknown) => Promise<void>;
    };
  }).TeyesLeadCapture;
  await client.capture(document.querySelector<HTMLFormElement>("#lead")!, {
    source: "wholesale_quote",
    inquiryType: "Wholesale Inquiry",
  });

  const body = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
  expect(body.attribution.referrer).toBe("");
});
