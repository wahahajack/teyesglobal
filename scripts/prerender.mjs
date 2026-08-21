import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { rootDir, getAllRoutes, toCanonicalUrl } from './routes.mjs';

const distDir = path.join(rootDir, 'dist');

// Keep Chrome lookup inside the project (matches .puppeteerrc.cjs) so the
// build works without a user-level cache and on CI.
process.env.PUPPETEER_CACHE_DIR = path.join(rootDir, '.puppeteer-cache');

const routes = getAllRoutes();

// Snapshot the pristine SPA shell BEFORE any route is rendered.
//
// Why: rendering "/" overwrites dist/index.html with the prerendered homepage.
// If the local server kept reading dist/index.html from disk as the SPA
// fallback, every later route would boot from a document that already contains
// the full homepage DOM and homepage <head> meta. The "content is ready" check
// below would then pass instantly on stale homepage content, and a slow lazy
// chunk could get the homepage (content + canonical) silently captured into a
// subpage file. Serving this in-memory shellHtml snapshot for all client-route
// requests removes that race entirely.
const shellHtml = readFileSync(path.join(distDir, 'index.html'));

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

      if (urlPath === '/' || urlPath === '/index.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(shellHtml);
        return;
      }

      const filePath = path.join(distDir, urlPath);
      if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
        // SPA fallback for client routes: always the pristine shell snapshot,
        // never the (possibly already prerendered) dist/index.html on disk.
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(shellHtml);
        return;
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

// Fail the build if a captured page does not carry its own SEO head state.
// This is the safety net for the exact incident class this branch fixes:
// a subpage silently shipping the homepage's canonical/title.
function assertSeo(route, html) {
  const canonicalTags = html.match(/<link[^>]*rel="canonical"[^>]*>/g) || [];
  if (canonicalTags.length !== 1) {
    throw new Error(`expected exactly 1 canonical tag, found ${canonicalTags.length}`);
  }

  const href = (canonicalTags[0].match(/href="([^"]+)"/) || [])[1];
  const expected = toCanonicalUrl(route);
  if (href !== expected) {
    throw new Error(`canonical mismatch: got ${href}, expected ${expected}`);
  }

  const titleTags = html.match(/<title[^>]*>/g) || [];
  if (titleTags.length !== 1) {
    throw new Error(`expected exactly 1 <title>, found ${titleTags.length}`);
  }

  const titleText = (html.match(/<title[^>]*>([^<]*)<\/title>/) || [])[1] || '';
  if (!titleText.trim()) {
    throw new Error('captured <title> is empty');
  }

  const descriptionTags = html.match(/<meta[^>]*name="description"[^>]*>/g) || [];
  if (descriptionTags.length !== 1) {
    throw new Error(`expected exactly 1 meta description, found ${descriptionTags.length}`);
  }
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

    // Wait for the React app to render real content (not just the lazy-loading
    // skeleton). The shell served for client routes has an empty #root, so this
    // condition can only be satisfied by the target route actually rendering.
    await page.waitForFunction(
      () => {
        const root = document.querySelector('#root');
        return !!root && (root.textContent || '').trim().length > 200;
      },
      { timeout: 30000 }
    );

    // The route's own canonical appearing in <head> is the signal that
    // react-helmet-async has applied this page's meta (not the shell's, and not
    // a previous page's). Waiting on it closes the settle-time race for lazy
    // routes on slow CI machines.
    const expectedCanonical = toCanonicalUrl(route);
    await page.waitForFunction(
      (expected) => {
        const link = document.querySelector('link[rel="canonical"]');
        return !!link && link.getAttribute('href') === expected;
      },
      { timeout: 30000 },
      expectedCanonical
    );

    // Small settle so remaining react-helmet-async head updates (og/twitter,
    // JSON-LD) are applied before capture.
    await new Promise((r) => setTimeout(r, 500));

    const html = await page.content();
    assertSeo(route, html);

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
