import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), "package.json"), "utf8"),
);

describe("prerender build contract", () => {
  it("installs the Puppeteer Chrome binary before prerendering", () => {
    const buildCommand = packageJson.scripts.build as string;
    const installCommand = "npx puppeteer browsers install chrome";

    expect(buildCommand).toContain(installCommand);
    expect(buildCommand.indexOf(installCommand)).toBeLessThan(
      buildCommand.indexOf("node scripts/prerender.mjs"),
    );
  });

  it("uses the CI-safe Chrome shared-memory flag", () => {
    const prerenderScript = fs.readFileSync(
      path.resolve(process.cwd(), "scripts/prerender.mjs"),
      "utf8",
    );

    expect(prerenderScript).toContain("--disable-dev-shm-usage");
  });
});

describe("prerender race-condition guards", () => {
  const prerenderScript = fs.readFileSync(
    path.resolve(process.cwd(), "scripts/prerender.mjs"),
    "utf8",
  );

  it("serves an in-memory pristine shell snapshot as the SPA fallback", () => {
    // Rendering "/" overwrites dist/index.html; the fallback must never read
    // that file from disk again or later routes boot from stale homepage DOM.
    expect(prerenderScript).toContain("const shellHtml = readFileSync");
    expect(prerenderScript).toContain("res.end(shellHtml)");
  });

  it("waits for the route's own canonical before capturing", () => {
    expect(prerenderScript).toContain('link[rel="canonical"]');
    expect(prerenderScript).toContain("toCanonicalUrl(route)");
  });

  it("asserts captured SEO state and fails on canonical mismatch", () => {
    expect(prerenderScript).toContain("assertSeo(route, html)");
    expect(prerenderScript).toContain("canonical mismatch");
  });

  it("runs the dist-wide SEO verification as the last build step", () => {
    const buildCommand = packageJson.scripts.build as string;

    expect(buildCommand).toContain("node scripts/verify-seo-dist.mjs");
    expect(buildCommand.indexOf("node scripts/prerender.mjs")).toBeLessThan(
      buildCommand.indexOf("node scripts/verify-seo-dist.mjs"),
    );
  });
});
