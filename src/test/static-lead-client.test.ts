import { afterEach, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const scriptPath = join(__dirname, "..", "..", "public", "lead-capture.js");

afterEach(() => {
  sessionStorage.clear();
  document.body.innerHTML = "";
  delete (window as Window & { TeyesLeadCapture?: unknown }).TeyesLeadCapture;
  vi.unstubAllGlobals();
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

  window.eval(readFileSync(scriptPath, "utf8"));
  const client = (window as Window & { TeyesLeadCapture: { capture: (form: HTMLFormElement, options: unknown) => Promise<void> } }).TeyesLeadCapture;
  await client.capture(document.querySelector<HTMLFormElement>("#lead")!, { source: "wholesale_quote", inquiryType: "Wholesale Inquiry" });

  const body = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
  expect(fetchMock.mock.calls[0][0]).toBe("/api/zoho-lead");
  expect(body).toMatchObject({
    source: "wholesale_quote", email: "buyer@example.com", company: "Buyer Auto", country: "Brazil",
    attribution: { gclid: "click-123", landing_page: "https://example.com/landing" },
  });
});

it("优先使用 form_entry_page，并在缺失时回退到当前页面", async () => {
  document.body.innerHTML = `
    <form id="lead">
      <input name="user_email" value="buyer@example.com">
    </form>
  `;
  window.history.replaceState({}, "", "/products/cc4-pro/?variant=blue");
  sessionStorage.setItem("form_entry_page", "/products/cc4-pro/");
  const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
  vi.stubGlobal("fetch", fetchMock);

  window.eval(readFileSync(scriptPath, "utf8"));
  const client = (window as Window & { TeyesLeadCapture: { capture: (form: HTMLFormElement, options: unknown) => Promise<void> } }).TeyesLeadCapture;
  await client.capture(document.querySelector<HTMLFormElement>("#lead")!, { source: "wholesale_quote", inquiryType: "Wholesale Inquiry" });

  const firstBody = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
  expect(firstBody.formEntryPage).toBe("/products/cc4-pro/");

  sessionStorage.clear();
  fetchMock.mockClear();
  await client.capture(document.querySelector<HTMLFormElement>("#lead")!, { source: "wholesale_quote", inquiryType: "Wholesale Inquiry" });

  const secondBody = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
  expect(secondBody.formEntryPage).toBe("/products/cc4-pro/?variant=blue");
});

it("成功提交后清除 form_entry_page", async () => {
  document.body.innerHTML = `
    <form id="lead">
      <input name="user_email" value="buyer@example.com">
    </form>
  `;
  sessionStorage.setItem("form_entry_page", "/products/cc4-pro/");
  const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
  vi.stubGlobal("fetch", fetchMock);

  window.eval(readFileSync(scriptPath, "utf8"));
  const client = (window as Window & { TeyesLeadCapture: { capture: (form: HTMLFormElement, options: unknown) => Promise<void> } }).TeyesLeadCapture;
  await client.capture(document.querySelector<HTMLFormElement>("#lead")!, { source: "wholesale_quote", inquiryType: "Wholesale Inquiry" });

  expect(sessionStorage.getItem("form_entry_page")).toBeNull();
});

it("非 OK 响应时保留 form_entry_page", async () => {
  document.body.innerHTML = `
    <form id="lead">
      <input name="user_email" value="buyer@example.com">
    </form>
  `;
  sessionStorage.setItem("form_entry_page", "/products/cc4-pro/");
  const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 500 }));
  vi.stubGlobal("fetch", fetchMock);

  window.eval(readFileSync(scriptPath, "utf8"));
  const client = (window as Window & { TeyesLeadCapture: { capture: (form: HTMLFormElement, options: unknown) => Promise<void> } }).TeyesLeadCapture;

  await expect(client.capture(document.querySelector<HTMLFormElement>("#lead")!, { source: "wholesale_quote", inquiryType: "Wholesale Inquiry" }))
    .rejects.toThrow("Zoho lead capture failed");

  expect(sessionStorage.getItem("form_entry_page")).toBe("/products/cc4-pro/");
});

it("capture 被拒绝时保留 form_entry_page", async () => {
  document.body.innerHTML = `
    <form id="lead">
      <input name="user_email" value="buyer@example.com">
    </form>
  `;
  sessionStorage.setItem("form_entry_page", "/products/cc4-pro/");
  const fetchMock = vi.fn().mockRejectedValue(new Error("network down"));
  vi.stubGlobal("fetch", fetchMock);

  window.eval(readFileSync(scriptPath, "utf8"));
  const client = (window as Window & { TeyesLeadCapture: { capture: (form: HTMLFormElement, options: unknown) => Promise<void> } }).TeyesLeadCapture;

  await expect(client.capture(document.querySelector<HTMLFormElement>("#lead")!, { source: "wholesale_quote", inquiryType: "Wholesale Inquiry" }))
    .rejects.toThrow("network down");

  expect(sessionStorage.getItem("form_entry_page")).toBe("/products/cc4-pro/");
});
