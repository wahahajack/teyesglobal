import puppeteer from 'puppeteer';

const BASE = 'https://6a9a692426895700088f251f--teyesglobal.netlify.app';
const runId = `pr27-${Date.now()}`;

const TRACKING_HOST_PARTS = [
  'googletagmanager.com',
  'google-analytics.com',
  'googleadservices.com',
  'doubleclick.net',
  'connect.facebook.net',
  'facebook.com/tr',
  'analytics.google.com',
  'region1.google-analytics.com',
  'ipapi.co',
  'ipwho.is',
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertStatus(response, label) {
  assert(response, `${label}: no response captured`);
  const status = response.status();
  assert(status >= 200 && status < 300, `${label}: expected 2xx, got ${status}`);
}

function assertSanitizedUrl(value, label) {
  assert(typeof value === 'string' && value.length > 0, `${label}: missing URL`);
  assert(!value.includes('email='), `${label}: leaked email query`);
  assert(!value.includes('secret='), `${label}: leaked secret query`);
  assert(!value.includes('gtm_debug'), `${label}: leaked GTM preview query`);
  assert(!value.includes('leak@example.com'), `${label}: leaked email-like text`);
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
    if (TRACKING_HOST_PARTS.some((part) => url.includes(part))) {
      request.abort().catch(() => {});
    } else {
      request.continue().catch(() => {});
    }
  });
  page.on('console', (message) => {
    const text = message.text();
    if (/error|failed/i.test(text) && !/gtm|geo lookup/i.test(text)) {
      console.log(`[browser:${message.type()}] ${text}`);
    }
  });
  return { context, page };
}

function testUrl(path, gclid) {
  const query = new URLSearchParams({
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'pr27_emailjs_e2e',
    gclid,
    email: 'leak@example.com',
    secret: 'drop-me',
    gtm_debug: 'qa-preview-no-leak',
  });
  return `${BASE}${path}?${query.toString()}`;
}

function emailTemplateParamsFromJsonRequest(response) {
  const raw = response.request().postData() || '';
  assert(raw, 'EmailJS JSON request: empty postData');
  const body = JSON.parse(raw);
  assert(body && typeof body === 'object', 'EmailJS JSON request: invalid body');
  assert(body.template_params && typeof body.template_params === 'object', 'EmailJS JSON request: template_params missing');
  return body.template_params;
}

async function getDataLayerEvent(page, formName) {
  await page.waitForFunction(
    (name) => Array.isArray(window.dataLayer) && window.dataLayer.some((item) => item?.event === 'form_submit_success' && item?.form_name === name),
    { timeout: 10000 },
    formName,
  );
  return page.evaluate((name) => {
    const matches = (window.dataLayer || []).filter((item) => item?.event === 'form_submit_success' && item?.form_name === name);
    return matches[matches.length - 1] || null;
  }, formName);
}

async function testContact(browser) {
  const gclid = `${runId}-contact`;
  const { context, page } = await newPage(browser);
  try {
    await page.goto(testUrl('/contact/', gclid), { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector('#name', { timeout: 10000 });

    await page.type('#name', 'TEYES PR27 E2E QA');
    await page.type('#email', `${runId}-contact@example.com`);
    await page.type('#company', 'TEYES PR27 E2E QA - IGNORE');
    await page.type('#country', 'United States');
    await page.type('#message', 'Synthetic PR27 EmailJS attribution verification; please ignore.');

    const emailResponsePromise = page.waitForResponse(
      (response) => response.url().includes('api.emailjs.com') && response.request().method() === 'POST',
      { timeout: 20000 },
    );
    const zohoResponsePromise = page.waitForResponse(
      (response) => response.url().includes('/api/zoho-lead') && response.request().method() === 'POST',
      { timeout: 20000 },
    );

    await page.click('button[type="submit"]');
    const emailResponse = await emailResponsePromise;
    assertStatus(emailResponse, 'Contact EmailJS');
    const params = emailTemplateParamsFromJsonRequest(emailResponse);

    assert(params.form_name === 'contact_page', `Contact form_name mismatch: ${params.form_name}`);
    assert(params.lead_source === 'Google Ads', `Contact lead_source mismatch: ${params.lead_source}`);
    assert(params.lead_medium === 'paid', `Contact lead_medium mismatch: ${params.lead_medium}`);
    assert(params.gclid === gclid, `Contact stored gclid mismatch: ${params.gclid}`);
    assert(params.current_gclid === gclid, `Contact current_gclid mismatch: ${params.current_gclid}`);
    assert(params.utm_source === 'google', `Contact utm_source mismatch: ${params.utm_source}`);
    assert(params.current_utm_campaign === 'pr27_emailjs_e2e', 'Contact current campaign missing');
    assert(typeof params.first_visit_at === 'string' && params.first_visit_at.length > 0, 'Contact first_visit_at missing for fresh visitor');
    assert(typeof params.submitted_at === 'string' && params.submitted_at.length > 0, 'Contact submitted_at missing');
    assert(typeof params.submission_id === 'string' && params.submission_id.length >= 20, 'Contact submission_id missing');
    assert(typeof params.page_journey === 'string' && params.page_journey.includes('/contact/'), `Contact page_journey unexpected: ${params.page_journey}`);
    assertSanitizedUrl(params.landing_page, 'Contact landing_page');
    assertSanitizedUrl(params.current_page, 'Contact current_page');

    const dataLayerEvent = await getDataLayerEvent(page, 'contact_page');
    assert(dataLayerEvent?.submission_id === params.submission_id, 'Contact dataLayer submission_id does not match EmailJS');

    const zohoResponse = await zohoResponsePromise;
    assertStatus(zohoResponse, 'Contact Zoho');
    const zohoRequestBody = JSON.parse(zohoResponse.request().postData() || '{}');
    assert(zohoRequestBody.submissionId === params.submission_id, 'Contact Zoho submissionId does not match EmailJS');
    const zohoResult = await zohoResponse.json().catch(() => ({}));
    assert(['created', 'duplicate'].includes(zohoResult.status), `Contact Zoho result unexpected: ${JSON.stringify(zohoResult)}`);
    assert(zohoResult.submission_id === params.submission_id, 'Contact Zoho response correlation mismatch');

    console.log(`PASS Contact: EmailJS 2xx + Zoho ${zohoResult.status}; attribution fields present; correlation matched.`);
  } finally {
    await context.close();
  }
}

async function testWholesale(browser) {
  const gclid = `${runId}-wholesale`;
  const { context, page } = await newPage(browser);
  try {
    await page.goto(testUrl('/android-car-stereo-wholesale/', gclid), { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector('#wholesale-form', { timeout: 10000 });

    await page.type('input[name="company_name"]', 'TEYES PR27 E2E QA - IGNORE');
    await page.type('input[name="user_email"]', `${runId}-wholesale@example.com`);
    await page.type('input[name="country"]', 'United States');
    await page.select('select[name="estimated_quantity"]', '10-50 units');
    await page.type('input[name="message"]', 'Synthetic PR27 EmailJS attribution verification; please ignore.');
    await page.focus('input[name="user_email"]');

    const emailResponsePromise = page.waitForResponse(
      (response) => response.url().includes('api.emailjs.com') && response.request().method() === 'POST',
      { timeout: 25000 },
    );
    const zohoResponsePromise = page.waitForResponse(
      (response) => response.url().includes('/api/zoho-lead') && response.request().method() === 'POST',
      { timeout: 25000 },
    );

    await page.click('#form-btn');
    const emailResponse = await emailResponsePromise;
    assertStatus(emailResponse, 'Wholesale EmailJS');
    const raw = emailResponse.request().postData() || '';
    assert(raw.includes('name="form_name"') && raw.includes('wholesale_quote'), 'Wholesale EmailJS multipart missing form_name');
    assert(raw.includes('name="lead_source"') && raw.includes('Google Ads'), 'Wholesale EmailJS multipart missing Google Ads source');
    assert(raw.includes('name="lead_medium"') && raw.includes('paid'), 'Wholesale EmailJS multipart missing paid medium');
    assert(raw.includes('name="gclid"') && raw.includes(gclid), 'Wholesale EmailJS multipart missing stored gclid');
    assert(raw.includes('name="current_gclid"') && raw.includes(gclid), 'Wholesale EmailJS multipart missing current_gclid');
    assert(raw.includes('name="page_journey"'), 'Wholesale EmailJS multipart missing page_journey');
    assert(raw.includes('name="submitted_at"'), 'Wholesale EmailJS multipart missing submitted_at');
    assert(!raw.includes('leak%40example.com') && !raw.includes('leak@example.com'), 'Wholesale EmailJS payload leaked test email query');
    assert(!raw.includes('drop-me'), 'Wholesale EmailJS payload leaked secret query');
    assert(!raw.includes('qa-preview-no-leak'), 'Wholesale EmailJS payload leaked GTM preview value');

    const submissionMatch = raw.match(/name="submission_id"\r?\n\r?\n([^\r\n]+)/);
    assert(submissionMatch?.[1], 'Wholesale EmailJS multipart missing submission_id value');
    const emailSubmissionId = submissionMatch[1].trim();

    const dataLayerEvent = await getDataLayerEvent(page, 'wholesale_quote');
    assert(dataLayerEvent?.submission_id === emailSubmissionId, 'Wholesale dataLayer submission_id does not match EmailJS');

    const zohoResponse = await zohoResponsePromise;
    assertStatus(zohoResponse, 'Wholesale Zoho');
    const zohoRequestBody = JSON.parse(zohoResponse.request().postData() || '{}');
    assert(zohoRequestBody.submissionId === emailSubmissionId, 'Wholesale Zoho submissionId does not match EmailJS');
    const zohoResult = await zohoResponse.json().catch(() => ({}));
    assert(['created', 'duplicate'].includes(zohoResult.status), `Wholesale Zoho result unexpected: ${JSON.stringify(zohoResult)}`);
    assert(zohoResult.submission_id === emailSubmissionId, 'Wholesale Zoho response correlation mismatch');

    console.log(`PASS Wholesale: EmailJS 2xx + Zoho ${zohoResult.status}; static sendForm fields present; correlation matched.`);
  } finally {
    await context.close();
  }
}

async function testStaticInjectionOnly(browser, path, formSelector, expectedFormName, suffix) {
  const gclid = `${runId}-${suffix}`;
  const { context, page } = await newPage(browser);
  try {
    await page.goto(testUrl(path, gclid), { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector(formSelector, { timeout: 10000 });
    const snapshot = await page.evaluate(({ selector }) => {
      const form = document.querySelector(selector);
      if (!form) throw new Error(`Form ${selector} not found`);
      const stopSubmit = (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
      };
      form.addEventListener('submit', stopSubmit, true);
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      const value = (name) => form.elements.namedItem(name)?.value ?? '';
      return {
        formName: value('form_name'),
        leadSource: value('lead_source'),
        leadMedium: value('lead_medium'),
        gclid: value('gclid'),
        currentGclid: value('current_gclid'),
        currentPage: value('current_page'),
        pageJourney: value('page_journey'),
        leadSourceCount: form.querySelectorAll('input[name="lead_source"]').length,
        currentPageCount: form.querySelectorAll('input[name="current_page"]').length,
      };
    }, { selector: formSelector });

    assert(snapshot.formName === expectedFormName, `${suffix} form_name mismatch: ${snapshot.formName}`);
    assert(snapshot.leadSource === 'Google Ads', `${suffix} lead_source mismatch: ${snapshot.leadSource}`);
    assert(snapshot.leadMedium === 'paid', `${suffix} lead_medium mismatch: ${snapshot.leadMedium}`);
    assert(snapshot.gclid === gclid, `${suffix} stored gclid mismatch`);
    assert(snapshot.currentGclid === gclid, `${suffix} current_gclid mismatch`);
    assert(snapshot.pageJourney.includes(path), `${suffix} page_journey missing route: ${snapshot.pageJourney}`);
    assertSanitizedUrl(snapshot.currentPage, `${suffix} current_page`);
    assert(snapshot.leadSourceCount === 1, `${suffix} duplicate lead_source hidden fields`);
    assert(snapshot.currentPageCount === 1, `${suffix} duplicate current_page hidden fields`);
    console.log(`PASS ${suffix}: live preview static attribution injection verified without sending EmailJS/Zoho.`);
  } finally {
    await context.close();
  }
}

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});

try {
  await testContact(browser);
  await testWholesale(browser);
  await testStaticInjectionOnly(
    browser,
    '/android-car-stereo-oem-manufacturer/',
    '#wholesale-form',
    'manufacturing_quote',
    'OEM',
  );
  await testStaticInjectionOnly(
    browser,
    '/teyes-android-car-stereo-distributor/',
    '#app-form',
    'distributor_application',
    'Distributor',
  );
  console.log('PR27 EMAILJS E2E RESULT: PASS');
} finally {
  await browser.close();
}
