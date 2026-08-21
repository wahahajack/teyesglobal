import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { loadGtmWhenIdle } from "@/lib/tracking";

const GTM_SCRIPT_SELECTOR = 'script[src*="googletagmanager.com/gtm.js"]';

describe("GTM loading timing", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.history.replaceState({}, "", "/");
    window.dataLayer = undefined;
    delete window.__teyesGtmLoaded;
    delete window.__teyesGtmLoadTimer;
    document.querySelectorAll(GTM_SCRIPT_SELECTOR).forEach((script) => script.remove());
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("loads GTM immediately for Tag Assistant preview URLs", () => {
    window.history.replaceState({}, "", "/?gtm_debug=preview");

    loadGtmWhenIdle();

    expect(document.querySelector(GTM_SCRIPT_SELECTOR)).toBeInTheDocument();
    expect(window.dataLayer?.[0]).toMatchObject({ event: "gtm.js" });
  });

  it("loads GTM after four seconds for normal traffic", () => {
    loadGtmWhenIdle();

    vi.advanceTimersByTime(3999);
    expect(document.querySelector(GTM_SCRIPT_SELECTOR)).not.toBeInTheDocument();

    vi.advanceTimersByTime(1);
    expect(document.querySelector(GTM_SCRIPT_SELECTOR)).toBeInTheDocument();
  });
});

