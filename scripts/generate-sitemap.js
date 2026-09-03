import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const distDir = path.join(rootDir, 'dist');
const productsFile = path.join(rootDir, 'src/data/products.ts');

const baseUrl = 'https://teyesglobal.com';

const staticPages = [
  { path: '', source: 'src/pages/Index.tsx', priority: '1.0' },
  { path: '/products', source: 'src/pages/products/Products.tsx', priority: '0.8' },
  { path: '/products/lines', source: 'src/pages/products/ProductLines.tsx', priority: '0.8' },
  { path: '/products/compare', source: 'src/pages/products/ProductCompare.tsx', priority: '0.8' },
  { path: '/car-audio', source: 'src/pages/car-audio/CarAudio.tsx', priority: '0.8' },
  { path: '/car-audio/speakers', source: 'src/pages/car-audio/CarAudioCategory.tsx', priority: '0.8' },
  { path: '/car-audio/enclosed-subwoofers', source: 'src/pages/car-audio/CarAudioCategory.tsx', priority: '0.8' },
  { path: '/car-audio/amplifiers', source: 'src/pages/car-audio/CarAudioCategory.tsx', priority: '0.8' },
  { path: '/solutions', source: 'src/pages/solutions/Solutions.tsx', priority: '0.8' },
  { path: '/solutions/distributors', source: 'src/pages/solutions/SolutionsDistributors.tsx', priority: '0.8' },
  { path: '/solutions/auto-brands', source: 'src/pages/solutions/SolutionsAutoBrands.tsx', priority: '0.8' },
  { path: '/solutions/integrators', source: 'src/pages/solutions/SolutionsIntegrators.tsx', priority: '0.8' },
  { path: '/solutions/market-needs', source: 'src/pages/solutions/SolutionsMarketNeeds.tsx', priority: '0.8' },
  { path: '/oem-odm', source: 'src/pages/oem/OemOdm.tsx', priority: '0.8' },
  { path: '/oem-odm/capabilities', source: 'src/pages/oem/OemCapabilities.tsx', priority: '0.8' },
  { path: '/oem-odm/certifications', source: 'src/pages/oem/OemCertifications.tsx', priority: '0.8' },
  { path: '/oem-odm/cases', source: 'src/pages/oem/OemCases.tsx', priority: '0.8' },
  { path: '/landing/oem', source: 'src/pages/landing/LandingOem.tsx', priority: '0.8' },
  { path: '/landing/market-entry', source: 'src/pages/landing/LandingMarketEntry.tsx', priority: '0.8' },
  { path: '/landing/distributor', source: 'src/pages/landing/LandingDistributor.tsx', priority: '0.8' },
  { path: '/accessories', source: 'src/pages/Accessories.tsx', priority: '0.8' },
  { path: '/contact', source: 'src/pages/Contact.tsx', priority: '0.8' },
  // Exclude post-conversion utility pages like /thank-you from sitemap indexing.
];

function getIsoDate(filePath) {
  return fs.statSync(filePath).mtime.toISOString().split('T')[0];
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function createUrlEntry(loc, lastmod, priority) {
  return [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    '    <changefreq>weekly</changefreq>',
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

function toCanonicalPath(routePath) {
  if (!routePath) {
    return '/';
  }

  return routePath.endsWith('/') ? routePath : `${routePath}/`;
}

function getProductIds() {
  // Read and regex-parse TS data so the script works without a TS runtime.
  const productsContent = fs.readFileSync(productsFile, 'utf8');
  const ids = new Set();
  const idRegex = /id:\s*"([^"]+)"/g;
  let match;

  while ((match = idRegex.exec(productsContent)) !== null) {
    if (match[1]) {
      ids.add(match[1]);
    }
  }

  return Array.from(ids);
}

const staticEntries = staticPages.map((page) =>
  createUrlEntry(
    `${baseUrl}${toCanonicalPath(page.path)}`,
    getIsoDate(path.join(rootDir, page.source)),
    page.priority
  )
);

const productLastMod = getIsoDate(productsFile);
const productEntries = getProductIds().map((id) =>
  createUrlEntry(`${baseUrl}/products/${id}/`, productLastMod, '0.9')
);

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...staticEntries,
  ...productEntries,
  '</urlset>',
  '',
].join('\n');

const outputDirs = [publicDir];

// Keep dist in sync for build pipelines that generate the sitemap after Vite copies public assets.
if (fs.existsSync(distDir)) {
  outputDirs.push(distDir);
}

for (const outputDir of outputDirs) {
  fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), xml);
}

console.log(`Sitemap generated successfully in: ${outputDirs.join(', ')}`);
