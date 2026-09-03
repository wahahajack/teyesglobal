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
  '/products/lines',
  '/products/compare',
  '/car-audio',
  '/car-audio/compare',
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
  '/contact',
];

export function getProductRoutes() {
  const source = readFileSync(path.join(rootDir, 'src/data/products.ts'), 'utf8');
  return [...source.matchAll(/id:\s*"([^"]+)"/g)].map((m) => `/products/${m[1]}`);
}

export function getAllRoutes() {
  return [...STATIC_ROUTES, ...getProductRoutes()];
}

// Site-wide canonical policy: trailing slash everywhere (matches Netlify's
// directory-index 301 behavior and src/components/SEO.tsx toCanonicalPath).
export function toCanonicalUrl(route) {
  return route === '/' ? `${BASE_URL}/` : `${BASE_URL}${route}/`;
}
