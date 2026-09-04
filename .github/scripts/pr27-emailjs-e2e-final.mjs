import puppeteer from 'puppeteer';

const BASE = 'https://6a9a692426895700088f251f--teyesglobal.netlify.app';
const runId = `pr27-distributor-retry-${Date.now()}`;
const gclid = `${runId}-gclid`;
const testEmail = `${runId}@example.com`;
const blocked = ['googletagmanager.com','google-analytics.com','googleadservices.com','doubleclick.net','connect.facebook.net','facebook.com/tr','ipapi.co','ipwho.is'];
const assert = (ok, message) => { if (!ok) throw new Error(message); };
const multipartValue = (raw, name) => {
  const m = raw.match(new RegExp(`name="${name}"\\r?\\n\\r?\\n([^\\r\\n]*)`));
  return m ? m[1].trim() : '';
};

const browser = await puppeteer.launch({
  headless: 'new', executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  args: ['--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage'],
});
const context = typeof browser.createBrowserContext === 'function' ? await browser.createBrowserContext() : await browser.createIncognitoBrowserContext();
const page = await context.newPage();
await page.setRequestInterception(true);
page.on('request', req => blocked.some(x => req.url().toLowerCase().includes(x)) ? req.abort().catch(()=>{}) : req.continue().catch(()=>{}));

try {
  const q = new URLSearchParams({utm_source:'google',utm_medium:'cpc',utm_campaign:'pr27_distributor_retry',gclid,email:'leak@example.com',secret:'drop-me',gtm_debug:'qa-preview-no-leak'});
  await page.goto(`${BASE}/teyes-android-car-stereo-distributor/?${q}`, {waitUntil:'domcontentloaded',timeout:30000});
  await page.waitForFunction(() => window.TeyesLeadCapture && window.emailjs, {timeout:20000});
  await page.type('#comp_name','TEYES PR27 DISTRIBUTOR RETRY QA - IGNORE');
  await page.type('#contact_name','PR27 QA');
  await page.type('#country','United States');
  await page.type('#email',testEmail);
  await page.select('#business_model','Regional Distributor');

  const emailPromise = page.waitForResponse(r => r.url().includes('api.emailjs.com') && r.request().method()==='POST',{timeout:30000});
  const zohoPromise = page.waitForResponse(r => r.url().includes('/api/zoho-lead') && r.request().method()==='POST',{timeout:30000});
  await page.click('#submit-btn');

  const email = await emailPromise;
  assert(email.status() >= 200 && email.status() < 300, `EmailJS status ${email.status()}`);
  const raw = email.request().postData() || '';
  assert(multipartValue(raw,'form_name') === 'distributor_application','form_name mismatch');
  assert(multipartValue(raw,'lead_source') === 'Google Ads','lead_source mismatch');
  assert(multipartValue(raw,'lead_medium') === 'paid','lead_medium mismatch');
  assert(multipartValue(raw,'gclid') === gclid,'stored gclid mismatch');
  assert(multipartValue(raw,'current_gclid') === gclid,'current gclid mismatch');
  assert(!raw.includes('drop-me') && !raw.includes('qa-preview-no-leak') && !raw.includes('leak@example.com'),'EmailJS sanitization failed');
  const submissionId = multipartValue(raw,'submission_id');
  assert(submissionId.length >= 20,'submission_id missing');

  const zoho = await zohoPromise;
  const reqBody = JSON.parse(zoho.request().postData() || '{}');
  assert(reqBody.submissionId === submissionId,'Zoho request submission_id mismatch');
  let responseText = '';
  try { responseText = await zoho.text(); } catch {}
  console.log(`DISTRIBUTOR_ZOHO_STATUS=${zoho.status()}`);
  console.log(`DISTRIBUTOR_ZOHO_BODY=${responseText}`);
  console.log(`DISTRIBUTOR_SUBMISSION_ID=${submissionId}`);
  console.log(`DISTRIBUTOR_EMAIL=${testEmail}`);
  assert(zoho.status() >= 200 && zoho.status() < 300, `Distributor Zoho non-2xx: ${zoho.status()} ${responseText}`);
  console.log('PR27 DISTRIBUTOR REAL E2E: PASS');
} finally {
  await context.close();
  await browser.close();
}
