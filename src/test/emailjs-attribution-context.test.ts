import { afterEach, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  getEmailAttributionSnapshot,
  initEmailAttributionContext,
} from "@/lib/emailAttribution";

const STATIC_CLIENT = readFileSync(
  join(__dirname, "..", "..", "public", "lead-capture.js"),
  "utf8",
);

function setReferrer(value: string) {
  Object.defineProperty(document, "referrer", {
    configurable: true,
    value,
  });
}

afterEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  document.body.innerHTML = "";
  setReferrer("");
  history.replaceState({}, "", "/");
  delete (window as Window & { TeyesLeadCapture?: unknown }).TeyesLeadCapture;
  vi.useRealTimers();
});

it("builds a sanitized read-only EmailJS context without consuming journey state", () => {
  vi.useFakeTimers();
  vi.setSystemTime("2026-09-04T05:30:00.000Z");
  history.replaceState(
    {},
    "",
    "/contact/?utm_source=google&utm_medium=cpc&utm_campaign=qa&gclid=G-123&email=buyer@example.com&gtm_debug=x",
  );
  setReferrer("https://www.google.com/search?q=secret@example.com");

  initEmailAttributionContext();
  sessionStorage.setItem(
    "landing_page",
    "https://teyesglobal.com/landing/?utm_source=google&utm_medium=cpc&gclid=G-123&email=secret@example.com&gtm_preview=env-1",
  );
  sessionStorage.setItem("referrer", "https://www.google.com/search?q=teyes");
  sessionStorage.setItem("utm_source", "google");
  sessionStorage.setItem("utm_medium", "cpc");
  sessionStorage.setItem("utm_campaign", "qa");
  sessionStorage.setItem("gclid", "G-123");
  sessionStorage.setItem("form_entry_page", "/products/cc4-pro/?email=secret@example.com&utm_source=google");
  sessionStorage.setItem("teyes_page_journey_v1", JSON.stringify([
    "/landing/",
    "/products/cc4-pro/",
    "/contact/",
  ]));
  sessionStorage.setItem("teyes_last_whatsapp_click_v1", JSON.stringify({
    journey: "/landing/ > /products/cc4-pro/",
    path: "/products/cc4-pro/",
    count: 2,
  }));

  const beforeEntry = sessionStorage.getItem("form_entry_page");
  const beforeJourney = sessionStorage.getItem("teyes_page_journey_v1");
  const beforeWhatsapp = sessionStorage.getItem("teyes_last_whatsapp_click_v1");
  const snapshot = getEmailAttributionSnapshot({
    formName: "contact_page",
    inquiryType: "product",
    inquiryTypeLabel: "Product Information",
    submittedAt: "2026-09-04T05:31:00.000Z",
    submissionId: "submission-123",
  });

  expect(snapshot).toMatchObject({
    form_name: "contact_page",
    inquiry_type: "product",
    inquiry_type_label: "Product Information",
    lead_source: "Google Ads",
    lead_medium: "paid",
    landing_path: "/landing/",
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "qa",
    gclid: "G-123",
    current_utm_source: "google",
    current_utm_medium: "cpc",
    current_utm_campaign: "qa",
    current_gclid: "G-123",
    first_visit_at: "2026-09-04T05:30:00.000Z",
    form_entry_page: "/products/cc4-pro/?utm_source=google",
    page_journey: "/landing/ > /products/cc4-pro/ > /contact/",
    whatsapp_click_path: "/products/cc4-pro/",
    whatsapp_click_count: 2,
    submitted_at: "2026-09-04T05:31:00.000Z",
    submission_id: "submission-123",
  });
  expect(String(snapshot.landing_page)).not.toContain("email=");
  expect(String(snapshot.landing_page)).not.toContain("gtm_preview");
  expect(String(snapshot.current_page)).not.toContain("email=");
  expect(String(snapshot.current_page)).not.toContain("gtm_debug");
  expect(String(snapshot.first_referrer)).toBe("https://www.google.com/search");
  expect(sessionStorage.getItem("form_entry_page")).toBe(beforeEntry);
  expect(sessionStorage.getItem("teyes_page_journey_v1")).toBe(beforeJourney);
  expect(sessionStorage.getItem("teyes_last_whatsapp_click_v1")).toBe(beforeWhatsapp);
});

it("does not invent first_visit_at for an attribution record that already existed before rollout", () => {
  localStorage.setItem("teyes_attribution_v1", JSON.stringify({
    expiresAt: Date.now() + 60_000,
    values: {
      landing_page: "https://teyesglobal.com/old-landing/",
      referrer: "",
    },
  }));
  history.replaceState({}, "", "/contact/");

  initEmailAttributionContext();
  const snapshot = getEmailAttributionSnapshot();
  expect(snapshot.first_visit_at).toBe("");
  expect(snapshot.landing_page).toBe("https://teyesglobal.com/old-landing/");
});

it("injects the shared attribution envelope into static EmailJS forms without duplicate hidden fields", () => {
  history.replaceState(
    {},
    "",
    "/android-car-stereo-wholesale/?utm_source=google&utm_medium=cpc&utm_campaign=static-qa&gclid=STATIC-1&email=secret@example.com",
  );
  document.body.innerHTML = `
    <form id="lead">
      <input name="user_email" value="buyer@example.com">
      <input name="company_name" value="Buyer Auto">
      <input name="country" value="Brazil">
    </form>
  `;
  const form = document.querySelector<HTMLFormElement>("#lead")!;
  form.addEventListener("submit", (event) => event.preventDefault());

  window.eval(STATIC_CLIENT);
  sessionStorage.setItem("teyes_page_journey_v1", JSON.stringify([
    "/android-car-stereo-wholesale/",
  ]));

  form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

  const field = (name: string) => form.elements.namedItem(name) as HTMLInputElement | null;
  expect(field("form_name")?.value).toBe("wholesale_quote");
  expect(field("lead_source")?.value).toBe("Google Ads");
  expect(field("current_gclid")?.value).toBe("STATIC-1");
  expect(field("page_journey")?.value).toBe("/android-car-stereo-wholesale/");
  expect(field("current_page")?.value).not.toContain("email=");
  expect(form.querySelectorAll('input[name="lead_source"]')).toHaveLength(1);
  expect(form.querySelectorAll('input[name="current_page"]')).toHaveLength(1);
  expect(sessionStorage.getItem("teyes_page_journey_v1")).not.toBeNull();

  const client = (window as Window & {
    TeyesLeadCapture?: { getEmailAttributionSnapshot?: () => Record<string, unknown> };
  }).TeyesLeadCapture;
  expect(typeof client?.getEmailAttributionSnapshot).toBe("function");
});

it("wires Contact EmailJS enrichment explicitly and initializes first-visit before stored attribution", () => {
  const mainSource = readFileSync(join(__dirname, "..", "main.tsx"), "utf8");
  const contactSource = readFileSync(join(__dirname, "..", "pages", "Contact.tsx"), "utf8");

  expect(mainSource).toContain("initEmailAttributionContext();");
  expect(mainSource.indexOf("initEmailAttributionContext();")).toBeLessThan(mainSource.indexOf("persistAdParams();"));
  expect(contactSource).toContain('import { getEmailAttributionSnapshot } from "@/lib/emailAttribution";');
  expect(contactSource).toContain("const emailAttribution = getEmailAttributionSnapshot({");
  expect(contactSource).toContain("...emailAttribution,");
  expect(contactSource).toContain('formName: "contact_page"');
  expect(contactSource).toContain("submissionId,");
  expect(contactSource).toContain("submittedAt,");
});
