import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

// Keep Chrome lookup inside the project (matches .puppeteerrc.cjs) so the
// build works without a user-level cache and on CI.
process.env.PUPPETEER_CACHE_DIR = path.join(rootDir, '.puppeteer-cache');

// Static routes to prerender. Keep in sync with scripts/generate-sitemap.js.
const STATIC_ROUTES = [
  '/',
  '/products',
  '/products/lines',
  '/products/compare',
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

function getProductRoutes() {
  const source = readFileSync(path.join(rootDir, 'src/data/products.ts'), 'utf8');
  return [...source.matchAll(/id:\s*"([^"]+)"/g)].map((m) => `/products/${m[1]}`);
}

const routes = [...STATIC_ROUTES, ...getProductRoutes()];

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
};

function contentType(filePath) {
  return MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
}

function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      let filePath = path.join(distDir, urlPath === '/' ? 'index.html' : urlPath);
      if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
        filePath = path.join(distDir, 'index.html'); // SPA fallback for client routes
      }
      try {
        const body = readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': contentType(filePath) });
        res.end(body);
      } catch {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
      }
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

async function renderRoute(browser, baseUrl, route) {
  const page = await browser.newPage();
  try {
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (!req.url().startsWith(baseUrl)) {
        req.abort(); // block third-party (GTM, Google Fonts) during prerender
      } else {
        req.continue();
      }
    });

    await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded', timeout: 60000 });

    // Wait for the React app to render real content (not just the lazy-loading skeleton).
    await page.waitForFunction(
      () => {
        const root = document.querySelector('#root');
        return !!root && (root.textContent || '').trim().length > 200;
      },
      { timeout: 30000 }
    );

    // Small settle so react-helmet-async head updates are applied before capture.
    await new Promise((r) => setTimeout(r, 500));

    const html = await page.content();
    const relRoute = route === '/' ? '' : route.replace(/^\//, '');
    const outDir = path.join(distDir, relRoute);
    mkdirSync(outDir, { recursive: true });
    const outFile = path.join(outDir, 'index.html');
    writeFileSync(outFile, html);
    console.log(`prerendered ${route} -> ${path.relative(rootDir, outFile)} (${html.length} bytes)`);
  } finally {
    await page.close();
  }
}

async function main() {
  const server = await startServer();
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--disable-gpu',
      '--no-sandbox',
      '--disable-software-rasterizer',
      '--disable-dev-shm-usage',
    ],
  });

  let failures = 0;
  try {
    for (const route of routes) {
      try {
        await renderRoute(browser, baseUrl, route);
      } catch (err) {
        failures++;
        console.error(`[prerender] FAILED ${route}: ${err && err.message ? err.message : err}`);
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  if (failures > 0) {
    console.error(`[prerender] ${failures} route(s) failed`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
