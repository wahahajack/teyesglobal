import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const rootDir = path.resolve(__dirname, '..');
export const BASE_URL = 'https://teyesglobal.com';

// Public routes to prerender and verify.
// Keep in sync with scripts/generate-sitemap.js (verify-seo-dist.mjs enforces this
// against the generated sitemap at build time).
// Car Audio category routes stay explicit so each page is prerendered and SEO-verified independently.
export const STATIC_ROUTES = [
  '/',
  '/products',
  '/products/compare',
  '/car-audio',
  '/car-audio/speakers',
  '/car-audio/enclosed-subwoofers',
  '/car-audio/amplifiers',
  '/solutions',
  '/solutions/distributors',
  '/solutions/auto-brands',
  '/solutions/integrators',
  '/solutions/market-needs',
  '/oem-odm',
  '/oem-odm/capabilities',
  '/oem-odm/certifications',
  '/oem-odm/cases',
  '/landing/oem',
  '/landing/market-entry',
  '/landing/distributor',
  '/accessories',
  '/about',
  '/news',
  '/news/company',
  '/news/exhibitions',
  '/news/industry',
  '/contact',
];

export function getNewsRoutes() {
  return getNewsMetadata().map(({ category, slug }) => `/news/${category}/${slug}`);
}

function readBalanced(source, start, open = '[', close = ']') {
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char === open) depth += 1;
    if (char === close) {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }
  throw new Error(`Unclosed ${open}${close} block in news.ts`);
}

function readStringProperty(objectSource, name) {
  const match = new RegExp(`${name}\\s*:\\s*"((?:\\\\.|[^"\\\\])*)"`).exec(objectSource);
  if (!match) return undefined;
  return JSON.parse(`"${match[1]}"`);
}

export function parseNewsMetadata(source) {
  const marker = 'export const newsArticles';
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) throw new Error('newsArticles export not found');
  const arrayStart = source.indexOf('[', source.indexOf('=', markerIndex));
  const arraySource = readBalanced(source, arrayStart);
  const metadata = [];
  let quote = null;
  let escaped = false;
  for (let index = 1; index < arraySource.length - 1; index += 1) {
    const char = arraySource[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char !== '{') continue;
    const objectSource = readBalanced(arraySource, index, '{', '}');
    const slug = readStringProperty(objectSource, 'slug');
    const category = readStringProperty(objectSource, 'category');
    const title = readStringProperty(objectSource, 'title');
    const date = readStringProperty(objectSource, 'date');
    const updatedAt = readStringProperty(objectSource, 'updatedAt');
    const image = readStringProperty(objectSource, 'image');
    if (slug && category && title && date && image) metadata.push({ slug, category, title, date, updatedAt, image });
    index += objectSource.length - 1;
  }
  return metadata;
}

export function getNewsMetadata() {
  return parseNewsMetadata(readFileSync(path.join(rootDir, 'src/data/news.ts'), 'utf8'));
}

export function getProductRoutes() {
  const source = readFileSync(path.join(rootDir, 'src/data/products.ts'), 'utf8');
  return [...source.matchAll(/id:\s*"([^"]+)"/g)].map((m) => `/products/${m[1]}`);
}

export function getAllRoutes() {
  return [...STATIC_ROUTES, ...getProductRoutes(), ...getNewsRoutes()];
}

export function getIndexableRoutes(newsMetadata = getNewsMetadata()) {
  const hasIndustryArticles = newsMetadata.some((article) => article.category === 'industry');
  return STATIC_ROUTES
    .filter((route) => route !== '/news/industry' || hasIndustryArticles)
    .concat(getProductRoutes(), getNewsRoutes());
}

// Site-wide canonical policy: trailing slash everywhere (matches Netlify's
// directory-index 301 behavior and src/components/SEO.tsx toCanonicalPath).
export function toCanonicalUrl(route) {
  return route === '/' ? `${BASE_URL}/` : `${BASE_URL}${route}/`;
}
