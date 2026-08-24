import { afterEach, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const scriptPath = join(__dirname, "..", "..", "public", "lead-capture.js");
const staticLeadClient = readFileSync(scriptPath, "utf8");

afterEach(() => {
  localStorage.clear();
  document.body.innerHTML = "";
  delete (window as Window & { TeyesLeadCapture?: unknown }).TeyesLeadCapture;
  vi.unstubAllGlobals();
  vi.useRealTimers();
  history.replaceState({}, "", "/");
  sessionStorage.clear();
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

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}

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
    '<a data-wa-location="oem_pricing" href="https://wa.me/placeholder?text=ignored">WA</a>',
  );
  window.dataLayer = [];
  const link = document.querySelector("a")!;
  link.addEventListener("click", (event) => event.preventDefault());
  link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
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

it("consumes static attribution before navigation and preserves the next page after late success", async () => {
  renderForm();
  history.replaceState({}, "", "/android-car-stereo-oem-manufacturer/");
  window.eval(staticLeadClient);
  document.body.insertAdjacentHTML(
    "beforeend",
    '<a data-wa-location="oem_pricing" href="https://wa.me/placeholder">WA</a>',
  );
  document.querySelector("a")!.addEventListener("click", (event) => event.preventDefault());
  document.querySelector("a")!.dispatchEvent(
    new MouseEvent("click", { bubbles: true, cancelable: true }),
  );
  const response = deferred<Response>();
  const fetchMock = vi.fn().mockReturnValue(response.promise);
  vi.stubGlobal("fetch", fetchMock);

  const submission = client().capture(form(), options);

  expect(sessionStorage.getItem("teyes_page_journey_v1")).toBeNull();
  expect(sessionStorage.getItem("teyes_last_whatsapp_click_v1")).toBeNull();

  history.pushState({}, "", "/android-car-stereo-oem-manufacturer/thank-you.html");
  response.resolve(new Response(null, { status: 201 }));
  await submission;

  const sent = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
  expect(sent.whatsappClickPath).toBe("/android-car-stereo-oem-manufacturer/");
  expect(
    JSON.parse(sessionStorage.getItem("teyes_page_journey_v1") || "[]"),
  ).toEqual(["/android-car-stereo-oem-manufacturer/thank-you.html"]);
});

it("restores a failed static snapshot only when no newer state exists", async () => {
  renderForm();
  history.replaceState({}, "", "/android-car-stereo-wholesale/");
  window.eval(staticLeadClient);
  sessionStorage.setItem("form_entry_page", "/products/cc4-pro/");
  const response = deferred<Response>();
  vi.stubGlobal("fetch", vi.fn().mockReturnValue(response.promise));

  const submission = client().capture(form(), options);
  expect(sessionStorage.getItem("teyes_page_journey_v1")).toBeNull();

  response.resolve(new Response(null, { status: 500 }));
  await expect(submission).rejects.toThrow("Zoho lead capture failed");

  expect(
    JSON.parse(sessionStorage.getItem("teyes_page_journey_v1") || "[]"),
  ).toEqual(["/android-car-stereo-wholesale/"]);
});

it("does not restore a failed static snapshot over a newer page", async () => {
  renderForm();
  history.replaceState({}, "", "/android-car-stereo-wholesale/");
  window.eval(staticLeadClient);
  const response = deferred<Response>();
  vi.stubGlobal("fetch", vi.fn().mockReturnValue(response.promise));

  const submission = client().capture(form(), options);
  history.pushState({}, "", "/android-car-stereo-wholesale/thank-you.html");

  response.resolve(new Response(null, { status: 500 }));
  await expect(submission).rejects.toThrow("Zoho lead capture failed");

  expect(
    JSON.parse(sessionStorage.getItem("teyes_page_journey_v1") || "[]"),
  ).toEqual(["/android-car-stereo-wholesale/thank-you.html"]);
  expect(sessionStorage.getItem("form_entry_page")).toBeNull();
});

it("bounds a long static journey without slicing route entries", () => {
  sessionStorage.clear();
  history.replaceState({}, "", "/static-start/");
  window.eval(staticLeadClient);
  for (let index = 0; index < 24; index += 1) {
    history.pushState({}, "", `/static-${"x".repeat(52)}-${index}/`);
  }

  const raw = JSON.parse(sessionStorage.getItem("teyes_page_journey_v1") || "[]") as string[];
  const journey = raw.join(" > ");
  expect(raw.length).toBeLessThanOrEqual(20);
  expect(journey.length).toBeLessThanOrEqual(1024);
  expect(raw.every((entry) => /^\/[^>]+\/$/.test(entry))).toBe(true);
});

it("records a route supplied by popstate", () => {
  sessionStorage.clear();
  history.replaceState({}, "", "/static-popstate-start/");
  window.eval(staticLeadClient);
  history.pushState({}, "", "/static-popstate-next/");
  history.replaceState({}, "", "/static-popstate-start/");
  window.dispatchEvent(new PopStateEvent("popstate"));

  const raw = JSON.parse(sessionStorage.getItem("teyes_page_journey_v1") || "[]") as string[];
  expect(raw).toContain("/static-popstate-start/");
});

it.each([
  ["wa.me", "https://wa.me/placeholder?phone=synthetic&message=ignored", "wa.me"],
  ["api.whatsapp.com", "https://api.whatsapp.com/send?phone=synthetic&message=ignored", "api.whatsapp.com"],
  ["web.whatsapp.com", "https://web.whatsapp.com/send?phone=synthetic&message=ignored", "web.whatsapp.com"],
  ["whatsapp:", "whatsapp://send?phone=synthetic&message=ignored", "whatsapp"],
])("records an exact approved event for %s", (_name, href, destinationHost) => {
  sessionStorage.clear();
  history.replaceState({}, "", "/static-whatsapp/");
  window.eval(staticLeadClient);
  window.dataLayer = [];
  document.body.innerHTML = `<a data-wa-location="synthetic_cta" href="${href}">WhatsApp</a>`;
  const link = document.querySelector("a")!;
  link.addEventListener("click", (event) => event.preventDefault());
  link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));

  expect(window.dataLayer).toEqual([{
    event: "whatsapp_click",
    page_path: "/static-whatsapp/",
    page_journey: "/static-whatsapp/",
    wa_click_path: "/static-whatsapp/",
    link_location: "synthetic_cta",
    destination_host: destinationHost,
  }]);
  expect(JSON.stringify(window.dataLayer)).not.toMatch(/href|phone|message|placeholder|ignored|text/);
});

it("rejects non-WhatsApp static links", () => {
  sessionStorage.clear();
  history.replaceState({}, "", "/static-non-whatsapp/");
  window.eval(staticLeadClient);
  window.dataLayer = [];
  document.body.innerHTML = '<a href="https://example.test/placeholder?text=ignored">Other</a>';
  const link = document.querySelector("a")!;
  link.addEventListener("click", (event) => event.preventDefault());
  link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));

  expect(window.dataLayer).toEqual([]);
  expect(sessionStorage.getItem("teyes_last_whatsapp_click_v1")).toBeNull();
});

it("survives unavailable static session storage", () => {
  history.replaceState({}, "", "/static-storage-error/");
  const getItem = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
    throw new Error("storage disabled");
  });
  const setItem = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new Error("storage disabled");
  });
  window.eval(staticLeadClient);
  document.body.innerHTML = '<a href="https://wa.me/placeholder?text=ignored">WA</a>';
  const link = document.querySelector("a")!;
  link.addEventListener("click", (event) => event.preventDefault());

  expect(() => link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }))).not.toThrow();
  getItem.mockRestore();
  setItem.mockRestore();
});

it("bounds static journey fields before serializing a keepalive request", async () => {
  sessionStorage.clear();
  renderForm();
  history.replaceState({}, "", `/${"y".repeat(300)}/`);
  window.eval(staticLeadClient);
  document.body.insertAdjacentHTML("beforeend", '<a href="https://wa.me/placeholder?message=ignored">WA</a>');
  const link = document.querySelector("a")!;
  link.addEventListener("click", (event) => event.preventDefault());
  link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
  const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
  vi.stubGlobal("fetch", fetchMock);

  await client().capture(form(), options);

  const body = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
  expect(body.pageJourney.length).toBeLessThanOrEqual(1024);
  expect(body.whatsappClickJourney.length).toBeLessThanOrEqual(1024);
  expect(body.whatsappClickPath.length).toBeLessThanOrEqual(255);
  expect(body.whatsappClickPath).toBe("");
});
