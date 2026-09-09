// Post-build SEO verification over dist/ — the automated version of the
// manual "Phase 3" curl checklist. Runs as the last build step and fails the
// build on any violation, so a broken prerender can never ship silently.
//
// Checks, per public route:
//   - the prerendered HTML file exists
//   - exactly one <title>, non-empty
//   - exactly one canonical, pointing at the route's own trailing-slash URL
//   - exactly one meta description, non-empty
//   - real body text (not an empty SPA shell)
// Globally:
//   - titles are unique across routes
//   - descriptions are unique across routes
//   - sitemap.xml <loc> entries exactly match the route list

import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { rootDir, getAllRoutes, getIndexableRoutes, getNewsMetadata, toCanonicalUrl } from './routes.mjs';

const distDir = path.join(rootDir, 'dist');
const errors = [];

function fail(route, message) {
  errors.push(`  ${route}: ${message}`);
}

function extractBodyText(html) {
  const bodyPart = html.split(/<body[^>]*>/)[1] || '';
  return bodyPart
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractElementText(html, element) {
  const match = html.match(new RegExp(`<${element}\\b[^>]*>([\\s\\S]*?)</${element}>`, 'i'));
  return (match?.[1] || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function getMetaContent(html, name, attribute = 'name') {
  const tag = html.match(new RegExp(`<meta[^>]*${attribute}="${name}"[^>]*>`, 'i'))?.[0];
  return tag?.match(/content="([^"]*)"/i)?.[1] || '';
}

function getNewsSchema(html) {
  const scripts = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  for (const match of scripts) {
    try {
      const value = JSON.parse(match[1]);
      if (value?.['@type'] === 'NewsArticle') return value;
    } catch {
      // Existing schema checks below report missing/invalid article data.
    }
  }
  return undefined;
}

const routes = getAllRoutes();
const indexableRoutes = getIndexableRoutes();
const newsMetadata = getNewsMetadata();
const existingNoindexRoutes = new Set(['/landing/oem', '/landing/market-entry', '/landing/distributor']);
const titles = new Map();
const descriptions = new Map();

for (const route of routes) {
  const relFile = route === '/' ? 'index.html' : `${route.replace(/^\//, '')}/index.html`;
  const filePath = path.join(distDir, relFile);

  if (!existsSync(filePath)) {
    fail(route, `missing prerendered file dist/${relFile}`);
    continue;
  }

  const html = readFileSync(filePath, 'utf8');

  const titleTags = html.match(/<title[^>]*>/g) || [];
  const titleText = ((html.match(/<title[^>]*>([^<]*)<\/title>/) || [])[1] || '').trim();
  if (titleTags.length !== 1) fail(route, `expected exactly 1 <title>, found ${titleTags.length}`);
  else if (!titleText) fail(route, 'empty <title>');
  else if (titles.has(titleText)) fail(route, `duplicate title (same as ${titles.get(titleText)}): "${titleText}"`);
  else titles.set(titleText, route);

  const canonicalTags = html.match(/<link[^>]*rel="canonical"[^>]*>/g) || [];
  if (canonicalTags.length !== 1) {
    fail(route, `expected exactly 1 canonical, found ${canonicalTags.length}`);
  } else {
    const href = (canonicalTags[0].match(/href="([^"]+)"/) || [])[1];
    const expected = toCanonicalUrl(route);
    if (href !== expected) fail(route, `canonical mismatch: got ${href}, expected ${expected}`);
  }

  const descTags = html.match(/<meta[^>]*name="description"[^>]*>/g) || [];
  if (descTags.length !== 1) {
    fail(route, `expected exactly 1 meta description, found ${descTags.length}`);
  } else {
    const content = ((descTags[0].match(/content="([^"]*)"/) || [])[1] || '').trim();
    if (!content) fail(route, 'empty meta description');
    else if (descriptions.has(content)) fail(route, `duplicate description (same as ${descriptions.get(content)})`);
    else descriptions.set(content, route);
  }

  const bodyText = extractBodyText(html);
  if (bodyText.length < 200) {
    fail(route, `body text too short (${bodyText.length} chars) — looks like an empty shell`);
  }

  const robots = getMetaContent(html, 'robots');
  if (route === '/news/industry' && robots !== 'noindex, follow') {
    fail(route, `empty category must use noindex, follow (got "${robots}")`);
  } else if (route !== '/news/industry' && !existingNoindexRoutes.has(route) && robots !== 'index, follow') {
    fail(route, `expected index, follow robots directive (got "${robots}")`);
  }

  if (route === '/about' && extractElementText(html, 'main').length < 300) {
    fail(route, 'About main content is too short');
  }

  const articleMatch = route.match(/^\/news\/([^/]+)\/([^/]+)$/);
  if (articleMatch) {
    const metadata = newsMetadata.find(({ category, slug }) => category === articleMatch[1] && slug === articleMatch[2]);
    const articleText = extractElementText(html, 'article');
    if (!metadata) fail(route, 'missing parsed news metadata');
    if (articleText.length < 200) fail(route, `article content is too short (${articleText.length} chars)`);
    const h1 = extractElementText(html, 'h1');
    if (metadata && !h1.includes(metadata.title)) fail(route, `H1 does not contain article title "${metadata.title}"`);
    const expectedImage = new URL(metadata?.image || '/og-image.webp', 'https://teyesglobal.com').href;
    const ogImage = getMetaContent(html, 'og:image', 'property');
    if (!ogImage.startsWith('https://teyesglobal.com/')) fail(route, `og:image must be an absolute site URL (got "${ogImage}")`);
    const schema = getNewsSchema(html);
    if (!schema) {
      fail(route, 'missing NewsArticle JSON-LD');
    } else {
      if (metadata && schema.datePublished !== metadata.date) fail(route, `datePublished mismatch: got ${schema.datePublished}, expected ${metadata.date}`);
      if (metadata && schema.dateModified !== (metadata.updatedAt || metadata.date)) fail(route, `dateModified mismatch: got ${schema.dateModified}, expected ${metadata.updatedAt || metadata.date}`);
      if (schema.image !== expectedImage) fail(route, `NewsArticle image mismatch: got ${schema.image}, expected ${expectedImage}`);
    }
  }
}

// Sitemap <-> route list consistency (enforces the "keep in sync" comment).
const sitemapPath = path.join(distDir, 'sitemap.xml');
if (!existsSync(sitemapPath)) {
  fail('sitemap', 'missing dist/sitemap.xml');
} else {
  const sitemapXml = readFileSync(sitemapPath, 'utf8');
  const locs = new Set(
    [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
  );
  const expected = new Set(indexableRoutes.map((r) => toCanonicalUrl(r)));

  for (const url of expected) {
    if (!locs.has(url)) fail('sitemap', `route missing from sitemap.xml: ${url}`);
  }
  for (const url of locs) {
    if (!expected.has(url)) fail('sitemap', `sitemap.xml contains URL not in route list: ${url}`);
  }
}

if (errors.length > 0) {
  console.error(`[verify-seo-dist] FAILED — ${errors.length} problem(s):`);
  for (const line of errors) console.error(line);
  process.exit(1);
}

console.log(
  `[verify-seo-dist] OK — ${routes.length} prerendered routes / ${indexableRoutes.length} indexable routes: unique titles, unique descriptions, ` +
  'self-referencing canonicals, real body content, sitemap in sync.'
);
