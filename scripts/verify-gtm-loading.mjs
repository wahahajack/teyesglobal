// Automated regression guard for GTM loading behaviour (src/lib/tracking.ts).
//
// This is NOT a substitute for the official GTM Preview / Tag Assistant
// walkthrough required by the SEO fix task brief (Phase 5.1) — that step
// needs a Google account with edit access to container GTM-MSPH5TMK and can
// only be done by a human in the browser.
//
// What this script IS for: catching code-level regressions that Tag
// Assistant would also catch, but automatically and on every run — e.g. gtm.js
// getting injected twice, the idle-delay path breaking, or the
// gtm_debug/gtm_auth/gtm_preview immediate-load path (which Tag Assistant
// itself depends on) silently breaking.
//
// Usage: npm run verify:gtm  (after `vite build`; run manually or in CI —
// not wired into the main `build` script since it drives a real browser and
// is slower than the SEO checks).

import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';
import { rootDir } from './routes.mjs';

const distDir = path.join(rootDir, 'dist');
const GTM_ID = 'GTM-MSPH5TMK';
const GTM_IDLE_DELAY_MS = 4000;

// A handful of representative routes is enough: the GTM loading logic in
// tracking.ts is shared by every page via main.tsx, so it does not vary
// per-route. Testing all 23 would just repeat the same assertions.
const SAMPLE_ROUTES = ['/', '/oem-odm/cases', '/products/cc4-pro'];

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.webp': 'image/webp', '.avif': 'image/avif',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.json': 'application/json', '.txt': 'text/plain',
  '.xml': 'application/xml', '.ico': 'image/x-icon',
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
        filePath = path.join(distDir, urlPath.replace(/\/?$/, '/index.html'));
      }
      if (!existsSync(filePath)) filePath = path.join(distDir, 'index.html');
      try {
        const body = readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': contentType(filePath) });
        res.end(body);
      } catch {
        res.writeHead(404).end('Not found');
      }
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

// gtm.js is a real third-party request. We don't need it to succeed (no
// network access to googletagmanager.com is required to prove the app
// *attempted* to load it exactly once) — we just observe and log the
// request, then abort it so the test has no external dependency.
async function withGtmRequestLog(page, fn) {
  const gtmRequests = [];
  await page.setRequestInterception(true);
  const onRequest = (req) => {
    if (req.url().includes('googletagmanager.com/gtm.js')) {
      gtmRequests.push({ url: req.url(), t: Date.now() });
      req.abort();
    } else {
      req.continue();
    }
  };
  page.on('request', onRequest);
  const startedAt = Date.now();
  await fn();
  page.off('request', onRequest);
  return { gtmRequests, startedAt };
}

const failures = [];
function check(label, condition, detail) {
  if (!condition) failures.push(`${label}: ${detail}`);
  console.log(`${condition ? 'PASS' : 'FAIL'}  ${label}${condition ? '' : `  — ${detail}`}`);
}

async function testIdleLoad(browser, baseUrl, route) {
  const page = await browser.newPage();
  const { gtmRequests, startedAt } = await withGtmRequestLog(page, async () => {
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'load', timeout: 30000 });
    // No interaction: wait past the idle delay and confirm exactly one load.
    await new Promise((r) => setTimeout(r, GTM_IDLE_DELAY_MS + 1500));
  });
  await page.close();

  check(
    `${route} — idle load fires gtm.js exactly once after ${GTM_IDLE_DELAY_MS}ms`,
    gtmRequests.length === 1,
    `saw ${gtmRequests.length} request(s): ${gtmRequests.map((r) => r.url).join(', ') || 'none'}`,
  );
  if (gtmRequests.length === 1) {
    const elapsed = gtmRequests[0].t - startedAt;
    check(
      `${route} — idle load waits for the ${GTM_IDLE_DELAY_MS}ms delay (not eager)`,
      elapsed >= GTM_IDLE_DELAY_MS - 500,
      `fired after only ${elapsed}ms`,
    );
  }
}

async function testInteractionLoad(browser, baseUrl, route) {
  const page = await browser.newPage();
  const { gtmRequests, startedAt } = await withGtmRequestLog(page, async () => {
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'load', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 300));
    await page.mouse.move(50, 50);
    await page.evaluate(() => window.dispatchEvent(new Event('scroll')));
    await new Promise((r) => setTimeout(r, 1000));
  });
  await page.close();

  check(
    `${route} — user interaction (scroll) loads gtm.js exactly once, before idle delay`,
    gtmRequests.length === 1,
    `saw ${gtmRequests.length} request(s)`,
  );
  if (gtmRequests.length === 1) {
    const elapsed = gtmRequests[0].t - startedAt;
    check(
      `${route} — interaction load is prompt (well under ${GTM_IDLE_DELAY_MS}ms)`,
      elapsed < GTM_IDLE_DELAY_MS - 500,
      `took ${elapsed}ms — interaction path may have regressed to idle-only`,
    );
  }
}

async function testPreviewLoad(browser, baseUrl, route) {
  const page = await browser.newPage();
  const { gtmRequests, startedAt } = await withGtmRequestLog(page, async () => {
    // gtm_debug is one of the params tracking.ts checks via isGtmPreview();
    // this is what makes Tag Assistant Preview mode connect immediately.
    await page.goto(`${baseUrl}${route}?gtm_debug=1`, { waitUntil: 'load', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1000));
  });
  await page.close();

  check(
    `${route}?gtm_debug=1 — preview mode loads gtm.js exactly once, immediately`,
    gtmRequests.length === 1,
    `saw ${gtmRequests.length} request(s)`,
  );
  if (gtmRequests.length === 1) {
    const elapsed = gtmRequests[0].t - startedAt;
    check(
      `${route}?gtm_debug=1 — preview load does not wait for the idle delay`,
      elapsed < GTM_IDLE_DELAY_MS - 500,
      `took ${elapsed}ms — Tag Assistant would fail to connect promptly`,
    );
  }
}

async function main() {
  if (!existsSync(distDir)) {
    console.error('dist/ not found — run `npm run build` (or at least `vite build`) first.');
    process.exit(1);
  }

  const server = await startServer();
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--disable-gpu', '--no-sandbox', '--disable-software-rasterizer', '--disable-dev-shm-usage'],
  });

  try {
    for (const route of SAMPLE_ROUTES) {
      await testIdleLoad(browser, baseUrl, route);
      await testInteractionLoad(browser, baseUrl, route);
      await testPreviewLoad(browser, baseUrl, route);
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log('');
  if (failures.length > 0) {
    console.error(`[verify-gtm-loading] FAILED — ${failures.length} problem(s):`);
    for (const f of failures) console.error(`  ${f}`);
    console.error(
      '\nThis is a code-level regression guard only. It does not replace the ' +
      'official GTM Preview / Tag Assistant walkthrough, which must still be ' +
      'run manually before sign-off.',
    );
    process.exit(1);
  }

  console.log(
    '[verify-gtm-loading] OK — gtm.js loads exactly once per page in all three ' +
    'paths (idle, interaction, preview) across sampled routes.\n' +
    'Reminder: this does not replace the manual GTM Tag Assistant walkthrough.',
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
