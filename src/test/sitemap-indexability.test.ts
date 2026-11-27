import { afterEach, describe, expect, it } from "vitest";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { getAllRoutes, getIndexableRoutes, getNewsMetadata, toCanonicalUrl } from "../../scripts/routes.mjs";

const root = process.cwd();
const landingRoutes = ["/landing/oem", "/landing/market-entry", "/landing/distributor"];
const commercialRoutes = ["/oem-odm", "/solutions/distributors", "/solutions/market-needs"];
const temporaryDirectories: string[] = [];

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) rmSync(directory, { recursive: true, force: true });
});

function temporaryDirectory() {
  const directory = mkdtempSync(path.join(tmpdir(), "teyes-sitemap-"));
  temporaryDirectories.push(directory);
  return directory;
}

function sitemapLocs(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

function sitemap(routes: string[]) {
  return `<urlset>${routes.map((route) => `<url><loc>${toCanonicalUrl(route)}</loc></url>`).join("")}</urlset>`;
}

function htmlFile(directory: string, route: string) {
  return path.join(directory, route === "/" ? "index.html" : `${route.slice(1)}/index.html`);
}

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

// A complete, valid build fixture gives every negative case a passing control.
// It exercises the production CLI rather than duplicating its assertions.
function createDistFixture() {
  const directory = temporaryDirectory();
  const articles = getNewsMetadata();
  for (const route of getAllRoutes()) {
    const metadata = articles.find((article) => route === `/news/${article.category}/${article.slug}`);
    const image = new URL(metadata?.image || "/og-image.webp", "https://teyesglobal.com").href;
    const schema = metadata ? `<script type="application/ld+json">${JSON.stringify({
      "@type": "NewsArticle",
      datePublished: metadata.date,
      dateModified: metadata.updatedAt || metadata.date,
      image,
    })}</script>` : "";
    const robots = landingRoutes.includes(route) ? "noindex, nofollow" : "index, follow";
    const html = `<!doctype html><html><head><title>${escapeHtml(route)} fixture</title>
      <link rel="canonical" href="${toCanonicalUrl(route)}">
      <meta name="description" content="${escapeHtml(route)} unique fixture description">
      <meta name="robots" content="${robots}">
      <meta property="og:image" content="${image}">${schema}</head>
      <body><main><article><h1>${escapeHtml(metadata?.title || route)}</h1>
      ${"Useful page content for a complete build verification fixture. ".repeat(8)}
      </article></main></body></html>`;
    const file = htmlFile(directory, route);
    mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, html);
  }
  writeFileSync(path.join(directory, "sitemap.xml"), sitemap(getIndexableRoutes()));
  return directory;
}

function verify(directory: string) {
  return spawnSync(process.execPath, [path.join(root, "scripts/verify-seo-dist.mjs")], {
    cwd: root,
    env: { ...process.env, SEO_DIST_DIR: directory },
    encoding: "utf8",
  });
}

describe("sitemap indexing policy", () => {
  it("keeps campaign pages prerendered while reserving sitemap entries for indexable routes", () => {
    for (const route of landingRoutes) {
      expect(getAllRoutes()).toContain(route);
      expect(getIndexableRoutes()).not.toContain(route);
    }
    for (const route of commercialRoutes) expect(getIndexableRoutes()).toContain(route);
    expect(getIndexableRoutes([])).not.toContain("/news/industry");
    expect(getIndexableRoutes()).toContain("/news/industry");
  });

  it("keeps the committed sitemap consistent and utility resources excluded", () => {
    const locs = sitemapLocs(readFileSync(path.join(root, "public/sitemap.xml"), "utf8"));
    expect([...locs].sort()).toEqual(getIndexableRoutes().map(toCanonicalUrl).sort());
    for (const route of landingRoutes) expect(locs).not.toContain(toCanonicalUrl(route));
    expect(locs.some((url) => /\/(?:thank-you|downloads|resource-files)(?:\/|$)/.test(url))).toBe(false);
  });

  it("generates the same correct sitemap in public and an existing dist", () => {
    const directory = temporaryDirectory();
    for (const subdirectory of ["scripts", "src/data", "public", "dist"]) {
      mkdirSync(path.join(directory, subdirectory), { recursive: true });
    }
    writeFileSync(path.join(directory, "package.json"), '{"type":"module"}');
    for (const file of ["scripts/routes.mjs", "scripts/generate-sitemap.js", "src/data/products.ts", "src/data/news.ts", "public/sitemap.xml"]) {
      copyFileSync(path.join(root, file), path.join(directory, file));
    }
    const result = spawnSync(process.execPath, [path.join(directory, "scripts/generate-sitemap.js")], { encoding: "utf8" });
    expect(result.status, result.stderr).toBe(0);
    const xml = readFileSync(path.join(directory, "public/sitemap.xml"), "utf8");
    expect(readFileSync(path.join(directory, "dist/sitemap.xml"), "utf8")).toBe(xml);
    const locs = sitemapLocs(xml);
    for (const route of landingRoutes) expect(locs).not.toContain(toCanonicalUrl(route));
    for (const route of commercialRoutes) expect(locs).toContain(toCanonicalUrl(route));
    expect(locs.sort()).toEqual(getIndexableRoutes().map(toCanonicalUrl).sort());
  });
});

describe("built sitemap regression guard", () => {
  it("accepts a complete build with intentional noindex pages outside the sitemap", () => {
    const result = verify(createDistFixture());
    expect(result.status, result.stderr).toBe(0);
  });

  it.each(landingRoutes)("rejects %s if it is accidentally reinserted in the sitemap", (route) => {
    const directory = createDistFixture();
    writeFileSync(path.join(directory, "sitemap.xml"), sitemap([...getIndexableRoutes(), route]));
    const result = verify(directory);
    expect(result.status).toBe(1);
    expect(result.stderr).toMatch(/noindex/i);
    expect(result.stderr).toContain(toCanonicalUrl(route));
  });

  it("rejects an indexable commercial page that renders noindex", () => {
    const directory = createDistFixture();
    const file = htmlFile(directory, "/solutions/distributors");
    writeFileSync(file, readFileSync(file, "utf8").replace('content="index, follow"', 'content="noindex, follow"'));
    const result = verify(directory);
    expect(result.status).toBe(1);
    expect(result.stderr).toMatch(/noindex/i);
    expect(result.stderr).toContain(toCanonicalUrl("/solutions/distributors"));
  });

  it.each(["noindex", "none"])("rejects googlebot %s even when the general robots tag allows indexing", (directive) => {
    const directory = createDistFixture();
    const file = htmlFile(directory, "/oem-odm");
    writeFileSync(file, readFileSync(file, "utf8").replace("</head>", `<meta name="googlebot" content="${directive}"></head>`));
    const result = verify(directory);
    expect(result.status).toBe(1);
    expect(result.stderr).toMatch(/noindex|none/i);
    expect(result.stderr).toContain(toCanonicalUrl("/oem-odm"));
  });

  it("rejects accidental removal of a campaign page's noindex", () => {
    const directory = createDistFixture();
    const file = htmlFile(directory, "/landing/oem");
    writeFileSync(file, readFileSync(file, "utf8").replace('content="noindex, nofollow"', 'content="index, follow"'));
    const result = verify(directory);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("/landing/oem");
    expect(result.stderr).toMatch(/noindex/i);
  });
});
