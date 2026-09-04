import puppeteer from 'puppeteer';

const BASE = 'https://6a9a692426895700088f251f--teyesglobal.netlify.app';
const runId = `pr27-final-${Date.now()}`;
const TRACKING_HOST_PARTS = [
  'googletagmanager.com', 'google-analytics.com', 'googleadservices.com',
  'doubleclick.net', 'connect.facebook.net', 'facebook.com/tr',
  'analytics.google.com', 'region1.google-analytics.com', 'ipapi.co', 'ipwho.is',
];

function assert(condition, message) { if (!condition) throw new Error(message); }
function assertStatus(response, label) {
  assert(response, `${label}: no response captured`);
  assert(response.status() >= 200 && response.status() < 300, `${label}: expected 2xx, got ${response.status()}`);
}
function assertSanitized(raw, label) {
  assert(!raw.includes('leak@example.com') && !raw.includes('leak%40example.com'), `${label}: leaked email-like query`);
  assert(!raw.includes('drop-me'), `${label}: leaked secret query`);
  assert(!raw.includes('qa-preview-no-leak'), `${label}: leaked GTM debug value`);
}
function multipartValue(raw, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = raw.match(new RegExp(`name="${escaped}"\\r?\\n\\r?\\n([^\\r\\n]*)`));
  return match ? match[1].trim() : '';
}
async function newPage(browser) {
  const context = typeof browser.createBrowserContext === 'function'
    ? await browser.createBrowserContext()
    : await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    const url = request.url().toLowerCase();
    if (TRACKING_HOST_PARTS.some((part) => url.includes(part))) request.abort().catch(() => {});
    else request.continue().catch(() => {});
  });
  return { context, page };
}
function testUrl(path, gclid) {
  const q = new URLSearchParams({
    utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'pr27_final_e2e',
    gclid, email: 'leak@example.com', secret: 'drop-me', gtm_debug: 'qa-preview-no-leak',
  });
  return `${BASE}${path}?${q}`;
}
async function waitReady(page) {
  await page.waitForFunction(() => window.TeyesLeadCapture && window.emailjs, { timeout: 20000 });
}
async function dataLayerEvent(page, formName) {
  await page.waitForFunction(
    (name) => Array.isArray(window.dataLayer) && window.dataLayer.some((x) => x?.event === 'form_submit_success' && x?.form_name === name),
    { timeout: 15000 }, formName,
  );
  return page.evaluate((name) => (window.dataLayer || []).filter((x) => x?.event === 'form_submit_success' && x?.form_name === name).at(-1), formName);
}
async function runStaticRealSubmit(browser, config) {
  const gclid = `${runId}-${config.slug}`;
  const { context, page } = await newPage(browser);
  try {
    await page.goto(testUrl(config.path, gclid), { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector(config.form, { timeout: 10000 });
    await waitReady(page);
    await config.fill(page);
    if (config.preSubmitWaitMs) await new Promise((r) => setTimeout(r, config.preSubmitWaitMs));

    const emailPromise = page.waitForResponse(
      (r) => r.url().includes('api.emailjs.com') && r.request().method() === 'POST',
      { timeout: 30000 },
    );
    const zohoPromise = page.waitForResponse(
      (r) => r.url().includes('/api/zoho-lead') && r.request().method() === 'POST',
      { timeout: 30000 },
    );

    await page.click(config.submit);
    const email = await emailPromise;
    assertStatus(email, `${config.label} EmailJS`);
    const raw = email.request().postData() || '';
    assert(multipartValue(raw, 'form_name') === config.formName, `${config.label}: form_name mismatch`);
    assert(multipartValue(raw, 'lead_source') === 'Google Ads', `${config.label}: lead_source mismatch`);
    assert(multipartValue(raw, 'lead_medium') === 'paid', `${config.label}: lead_medium mismatch`);
    assert(multipartValue(raw, 'gclid') === gclid, `${config.label}: stored gclid mismatch`);
    assert(multipartValue(raw, 'current_gclid') === gclid, `${config.label}: current_gclid mismatch`);
    assert(multipartValue(raw, 'current_utm_campaign') === 'pr27_final_e2e', `${config.label}: current campaign mismatch`);
    assert(multipartValue(raw, 'page_journey').includes(config.path), `${config.label}: page journey missing route`);
    assert(multipartValue(raw, 'submitted_at').length > 0, `${config.label}: submitted_at missing`);
    assertSanitized(raw, `${config.label} EmailJS payload`);

    const submissionId = multipartValue(raw, 'submission_id');
    assert(submissionId.length >= 20, `${config.label}: submission_id missing`);
    const dl = await dataLayerEvent(page, config.formName);
    assert(dl?.submission_id === submissionId, `${config.label}: dataLayer submission_id mismatch`);

    const zoho = await zohoPromise;
    assertStatus(zoho, `${config.label} Zoho`);
    const zohoReq = JSON.parse(zoho.request().postData() || '{}');
    assert(zohoReq.submissionId === submissionId, `${config.label}: Zoho request submissionId mismatch`);
    const result = await zoho.json().catch(() => ({}));
    assert(['created', 'duplicate'].includes(result.status), `${config.label}: Zoho result ${JSON.stringify(result)}`);
    assert(result.submission_id === submissionId, `${config.label}: Zoho response correlation mismatch`);

    console.log(`PASS ${config.label}: EmailJS 2xx + Zoho ${result.status}; attribution and submission correlation matched.`);
  } finally {
    await context.close();
  }
}

const browser = await puppeteer.launch({
  headless: 'new', executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});
try {
  await runStaticRealSubmit(browser, {
    label: 'OEM', slug: 'oem', path: '/android-car-stereo-oem-manufacturer/',
    form: '#wholesale-form', submit: '#form-btn', formName: 'manufacturing_quote', preSubmitWaitMs: 3000,
    fill: async (page) => {
      await page.type('input[name="user_email"]', `${runId}-oem@example.com`);
      await page.type('input[name="company_name"]', 'TEYES PR27 FINAL E2E QA - IGNORE');
      await page.type('input[name="country"]', 'United States');
      await page.select('select[name="estimated_quantity"]', 'OEM branding (logo, packaging, UI)');
      await page.type('textarea[name="message"]', 'Synthetic PR27 final EmailJS attribution verification; please ignore.');
      await page.focus('input[name="user_email"]');
    },
  });
  await runStaticRealSubmit(browser, {
    label: 'Distributor', slug: 'distributor', path: '/teyes-android-car-stereo-distributor/',
    form: '#app-form', submit: '#submit-btn', formName: 'distributor_application',
    fill: async (page) => {
      await page.type('#comp_name', 'TEYES PR27 FINAL E2E QA - IGNORE');
      await page.type('#contact_name', 'PR27 QA');
      await page.type('#country', 'United States');
      await page.type('#email', `${runId}-distributor@example.com`);
      await page.select('#business_model', 'Regional Distributor');
    },
  });
  console.log('PR27 FINAL REMAINING E2E RESULT: PASS');
} finally {
  await browser.close();
}
