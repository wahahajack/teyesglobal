import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  getStoredAdParams,
  getStoredSessionAttributes,
  getStoredSessionAttributeComponents,
  persistAdParams,
} from "@/lib/tracking";

const TTL = 90 * 24 * 60 * 60 * 1000;
function land(query: string, path = "/solutions/distributors/") {
  history.replaceState({}, "", path + (query ? `?${query}` : ""));
  persistAdParams();
}
function sessionTouch() {
  const encoded = getStoredSessionAttributes().replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(encoded));
}

describe("current attribution touch consistency (no network or form submissions)", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.useFakeTimers();
    vi.setSystemTime("2026-11-12T00:00:00Z");
    Object.defineProperty(document, "referrer", { configurable: true, value: "https://www.google.com/" });
  });
  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    localStorage.clear();
    sessionStorage.clear();
    history.replaceState({}, "", "/");
    Object.defineProperty(document, "referrer", { configurable: true, value: "" });
  });

  it.each(["gclid", "gbraid", "wbraid"])("captures a fresh %s-only touch", (key) => {
    land(`${key}=SYNTHETIC_NEW`);
    expect(getStoredAdParams()[key as "gclid"]).toBe("SYNTHETIC_NEW");
    expect(getStoredSessionAttributeComponents().session_start_time_usec).toBe(String(Date.now() * 1000));
    expect(sessionTouch().landing_page_url).toBe(window.location.href);
  });

  it.each(["gbraid", "wbraid", "gclid"])("replaces old gclid/UTMs with a new %s touch as one unit", (key) => {
    land("gclid=SYNTHETIC_A&gad_campaignid=101&utm_source=google&utm_medium=cpc&utm_campaign=A&utm_content=old&fbclid=old-meta");
    const firstLanding = getStoredAdParams().landing_page;
    const firstReferrer = getStoredAdParams().referrer;
    const oldTime = getStoredSessionAttributeComponents().session_start_time_usec;
    vi.advanceTimersByTime(1000);
    land(`${key}=SYNTHETIC_B&utm_campaign=B`, "/products/cc4-pro/");
    const values = getStoredAdParams();
    expect(values[key as "gclid"]).toBe("SYNTHETIC_B");
    for (const other of ["gclid", "gbraid", "wbraid"] as const) {
      if (other !== key) expect(values[other]).toBeNull();
    }
    expect(values).toMatchObject({ utm_campaign: "B", utm_source: null, utm_medium: null, utm_content: null, fbclid: null });
    expect(getStoredSessionAttributeComponents()).toMatchObject({ gad_campaignid: "", session_start_time_usec: String(Date.now() * 1000) });
    expect(getStoredSessionAttributeComponents().session_start_time_usec).not.toBe(oldTime);
    expect(sessionTouch().landing_page_url).toBe(window.location.href);
    // Existing CRM Initial_Landing_Page contract stays first-touch, not current-touch.
    expect(values.landing_page).toBe(firstLanding);
    expect(values.referrer).toBe(firstReferrer);
    sessionStorage.clear();
    expect(getStoredAdParams()).toEqual(values);
  });

  it("does not attach an old paid ID or gad campaign to a new UTM-only touch", () => {
    land("gclid=SYNTHETIC_A&gad_campaignid=101&utm_campaign=A&utm_source=google");
    vi.advanceTimersByTime(1000);
    land("utm_campaign=B&utm_source=newsletter&utm_medium=email");
    expect(getStoredAdParams()).toMatchObject({ gclid: null, gbraid: null, wbraid: null, utm_campaign: "B", utm_source: "newsletter", utm_medium: "email" });
    expect(getStoredSessionAttributeComponents()).toMatchObject({ gad_campaignid: "", session_start_time_usec: String(Date.now() * 1000) });
    expect(sessionTouch().landing_page_url).toBe(window.location.href);
  });

  it("clears old IDs and UTMs on a new gad-only campaign", () => {
    land("gclid=SYNTHETIC_A&gad_campaignid=101&utm_campaign=A");
    vi.advanceTimersByTime(1000);
    land("gad_campaignid=202");
    expect(getStoredAdParams()).toMatchObject({ gclid: null, utm_campaign: null });
    expect(getStoredSessionAttributeComponents().gad_campaignid).toBe("202");
  });

  it("does not reuse a paid ID for a UTM-only visit with the same campaign name", () => {
    land("gclid=SYNTHETIC_A&utm_campaign=A&utm_source=google");
    vi.advanceTimersByTime(1000);
    land("utm_campaign=A&utm_source=google");
    expect(getStoredAdParams().gclid).toBeNull();
    expect(getStoredSessionAttributeComponents().session_start_time_usec).toBe(String(Date.now() * 1000));
    const encoded = getStoredSessionAttributes();
    vi.advanceTimersByTime(1000);
    persistAdParams();
    expect(getStoredSessionAttributes()).toBe(encoded);
  });

  it("does not resurrect a removed click ID if the durable replacement hits a quota error", () => {
    land("gclid=SYNTHETIC_A&utm_campaign=A");
    const originalSet = Storage.prototype.setItem;
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(function (key, value) {
      if (this === localStorage) throw new Error("quota");
      originalSet.call(this, key, value);
    });
    land("wbraid=SYNTHETIC_B&utm_campaign=B");
    expect(getStoredAdParams()).toMatchObject({ gclid: null, wbraid: "SYNTHETIC_B", utm_campaign: "B" });
    expect(getStoredSessionAttributeComponents().gad_campaignid).toBe("");
  });

  it("preserves same-touch time, campaign and URL across repeated calls, refresh and same-ID navigation", () => {
    const query = "wbraid=SYNTHETIC_A&utm_campaign=A&utm_source=google&gad_campaignid=101";
    land(query);
    const values = getStoredAdParams();
    const encoded = getStoredSessionAttributes();
    vi.advanceTimersByTime(1000);
    persistAdParams();
    land(query);
    land("wbraid=SYNTHETIC_A", "/contact/");
    expect(getStoredAdParams()).toEqual(values);
    expect(getStoredSessionAttributes()).toBe(encoded);
  });

  it("preserves attribution for parameter-free cross-page and new-session direct returns", () => {
    land("wbraid=SYNTHETIC_A&utm_campaign=A");
    const values = getStoredAdParams();
    const encoded = getStoredSessionAttributes();
    vi.advanceTimersByTime(1000);
    land("", "/contact/");
    sessionStorage.clear();
    land("", "/products/cc4-pro/");
    expect(getStoredAdParams()).toEqual(values);
    expect(getStoredSessionAttributes()).toBe(encoded);
  });

  it("ignores empty attribution parameters on a return", () => {
    land("gclid=SYNTHETIC_A&utm_campaign=A");
    const values = getStoredAdParams();
    const encoded = getStoredSessionAttributes();
    vi.advanceTimersByTime(1000);
    land("gclid=&wbraid=&utm_campaign=");
    expect(getStoredAdParams()).toEqual(values);
    expect(getStoredSessionAttributes()).toBe(encoded);
  });

  it("does not restore an expired touch in a new session", () => {
    land("wbraid=SYNTHETIC_A&utm_campaign=A");
    sessionStorage.clear();
    vi.advanceTimersByTime(TTL + 1);
    land("", "/contact/");
    expect(getStoredAdParams()).toMatchObject({ wbraid: null, utm_campaign: null });
    expect(getStoredSessionAttributes()).toBe("");
  });

  it("does not throw or break navigation when storage is unavailable", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("denied"); });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("denied"); });
    vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => { throw new Error("denied"); });
    expect(() => land("wbraid=SYNTHETIC_A&utm_campaign=A")).not.toThrow();
    expect(() => getStoredAdParams()).not.toThrow();
    expect(getStoredSessionAttributes()).toBe("");
  });
});
