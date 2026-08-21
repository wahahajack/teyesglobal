# Tracking Attribution Repair Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make GTM Preview load immediately while preserving the latest 4000 ms normal delay, then retain Google click and campaign attribution for 90 days so returning visitors create attributable Zoho Leads.

**Architecture:** Keep the existing GTM loader and Zoho payload contracts. Add the missing Preview branch to the React tracking module, then add one versioned first-party `localStorage` record that both the React module and the static landing-page client can read while retaining `sessionStorage` as the first choice.

**Tech Stack:** TypeScript, React 18, Vitest, jsdom, plain browser JavaScript, Vite, Puppeteer.

## Global Constraints

- Work only in `D:\Users\46679\Documents\ChatGPT\谷歌广告\worktrees\teyesglobal-tracking-attribution`.
- Do not modify or clean the primary checkout at `D:\Users\46679\Documents\GitHub\teyesglobal`.
- Keep normal GTM loading at 4000 ms, interaction loading immediate, Preview loading immediate, and GTM injection single-shot.
- Use a 90-day durable attribution lifetime and preserve the first landing page/referrer.
- Keep `/api/zoho-lead`, Zoho field names, and the submitted payload shape unchanged.
- Do not store PII, credentials, Zoho IDs, or form contents in browser attribution storage.
- Do not add dependencies, deploy, push, publish GTM, mutate Google Ads, or create Zoho records.
- Produce two independent implementation commits after the design/plan documentation commits.

---

### Task 1: Complete GTM Preview loading

**Files:**
- Create: `src/test/tracking-loading.test.ts`
- Modify: `src/lib/tracking.ts`
- Verify: `scripts/verify-gtm-loading.mjs`

**Interfaces:**
- Consumes: `loadGtmWhenIdle(): void` and `loadGtmNow(): void`.
- Produces: Preview-sensitive GTM loading with the existing window guards `__teyesGtmLoaded` and `__teyesGtmLoadTimer`.

- [ ] **Step 1: Write the failing GTM timing tests**

Create `src/test/tracking-loading.test.ts` with tests that:

```ts
it("loads GTM immediately for Tag Assistant preview URLs", () => {
  window.history.replaceState({}, "", "/?gtm_debug=preview");
  loadGtmWhenIdle();
  expect(document.querySelector(GTM_SCRIPT_SELECTOR)).toBeInTheDocument();
});

it("loads GTM after four seconds for normal traffic", () => {
  loadGtmWhenIdle();
  vi.advanceTimersByTime(3999);
  expect(document.querySelector(GTM_SCRIPT_SELECTOR)).not.toBeInTheDocument();
  vi.advanceTimersByTime(1);
  expect(document.querySelector(GTM_SCRIPT_SELECTOR)).toBeInTheDocument();
});

it("injects GTM only once when preview and an explicit wake-up overlap", () => {
  window.history.replaceState({}, "", "/?gtm_preview=env-1");
  loadGtmWhenIdle();
  loadGtmNow();
  expect(document.querySelectorAll(GTM_SCRIPT_SELECTOR)).toHaveLength(1);
});
```

The test setup must use fake timers, clear the GTM script element, reset the data layer/window guards, and restore `/` after each test.

- [ ] **Step 2: Run the test and verify RED**

Run:

```powershell
npx vitest run src/test/tracking-loading.test.ts
```

Expected: Preview and 4000 ms assertions fail because clean `tracking.ts` waits 6000 ms and has no Preview branch.

- [ ] **Step 3: Implement the minimal Preview behavior**

Modify `src/lib/tracking.ts`:

```ts
const GTM_IDLE_DELAY_MS = 4000;

function isGtmPreview() {
  const params = new URLSearchParams(window.location.search);
  return params.has("gtm_debug") ||
    params.has("gtm_auth") ||
    params.has("gtm_preview");
}
```

Use `GTM_IDLE_DELAY_MS` instead of the literal `6000`, and call `loadGtmNow()` before scheduling passive loading when `isGtmPreview()` is true. Do not change conversion-event wake-up behavior.

- [ ] **Step 4: Run focused and browser tests and verify GREEN**

Run:

```powershell
npx vitest run src/test/tracking-loading.test.ts
npm run build
npm run verify:gtm
```

Expected: all GTM unit tests pass; build exits 0; the browser guard passes idle, interaction, and Preview checks on all sampled routes.

- [ ] **Step 5: Commit GTM Preview repair**

Stage only:

```powershell
git add -- src/lib/tracking.ts src/test/tracking-loading.test.ts
git commit -m "fix: load GTM promptly in preview"
```

Expected: the first implementation commit contains no attribution or Zoho changes.

---

### Task 2: Persist lead attribution across sessions

**Files:**
- Modify: `src/lib/tracking.ts`
- Modify: `public/lead-capture.js`
- Modify: `src/lib/leadCapture.test.ts`
- Modify: `src/test/static-lead-client.test.ts`

**Interfaces:**
- Consumes: existing session keys and `getStoredAdParams()`.
- Produces: one interoperable `teyes_attribution_v1` local-storage record:

```ts
interface DurableAttribution {
  expiresAt: number;
  values: Partial<Record<AttributionKey, string>>;
}
```

- [ ] **Step 1: Add failing React attribution tests**

Extend `src/lib/leadCapture.test.ts` to clear both storage areas and control time. Add tests equivalent to:

```ts
it("restores attribution from durable storage in a later session", () => {
  history.replaceState({}, "", "/landing?gclid=test-click&utm_source=google");
  persistAdParams();
  sessionStorage.clear();
  history.replaceState({}, "", "/contact");
  expect(getStoredAdParams()).toMatchObject({
    gclid: "test-click",
    utm_source: "google",
    landing_page: expect.stringContaining("/landing?gclid=test-click"),
  });
});

it("ignores durable attribution after ninety days", () => {
  vi.setSystemTime("2026-08-21T00:00:00Z");
  history.replaceState({}, "", "/landing?gclid=expired-click");
  persistAdParams();
  sessionStorage.clear();
  vi.advanceTimersByTime(90 * 24 * 60 * 60 * 1000 + 1);
  expect(getStoredAdParams().gclid).toBeNull();
});

it("records first landing page for direct traffic", () => {
  history.replaceState({}, "", "/direct-entry");
  persistAdParams();
  expect(getStoredAdParams().landing_page).toContain("/direct-entry");
});
```

Also retain the existing first-landing-page non-overwrite assertion.

- [ ] **Step 2: Add failing static-client persistence test**

Extend `src/test/static-lead-client.test.ts`:

```ts
it("uses durable attribution after session storage is cleared", async () => {
  history.replaceState({}, "", "/landing?gclid=static-click&utm_source=google");
  window.eval(readFileSync(scriptPath, "utf8"));
  sessionStorage.clear();
  delete window.TeyesLeadCapture;
  history.replaceState({}, "", "/contact");
  window.eval(readFileSync(scriptPath, "utf8"));
  await window.TeyesLeadCapture.capture(form, options);
  expect(parsedBody.attribution).toMatchObject({
    gclid: "static-click",
    utm_source: "google",
    landing_page: expect.stringContaining("/landing?gclid=static-click"),
  });
});
```

Clear `localStorage` in teardown so tests remain isolated.

- [ ] **Step 3: Run both test files and verify RED**

Run:

```powershell
npx vitest run src/lib/leadCapture.test.ts src/test/static-lead-client.test.ts
```

Expected: later-session and direct-landing assertions fail because both clients currently use only `sessionStorage` and only record a landing page when an ad parameter exists.

- [ ] **Step 4: Implement the React durable store**

In `src/lib/tracking.ts`, define:

```ts
const ATTRIBUTION_STORAGE_KEY = "teyes_attribution_v1";
const ATTRIBUTION_TTL_MS = 90 * 24 * 60 * 60 * 1000;
const STORED_ATTRIBUTION_KEYS = [
  ...AD_PARAM_KEYS,
  "landing_page",
  "referrer",
] as const;
```

Add exception-safe functions that:

- parse only an object with a finite future `expiresAt` and string values;
- remove or ignore malformed/expired data;
- write `{ expiresAt: Date.now() + ATTRIBUTION_TTL_MS, values }`;
- never throw when either browser storage API is unavailable.

Update `persistAdParams()` to:

1. load the durable values;
2. store non-empty current URL attribution parameters in session and durable values;
3. set `landing_page` to the current URL only when neither storage layer has one;
4. set `referrer` only when neither layer has one and `document.referrer` is non-empty;
5. persist the merged record.

Update `getStoredAdParams()` to read each session value first and then the durable value.

- [ ] **Step 5: Implement the same schema in the static lead client**

In `public/lead-capture.js`, use the same:

```js
const ATTRIBUTION_STORAGE_KEY = "teyes_attribution_v1";
const ATTRIBUTION_TTL_MS = 90 * 24 * 60 * 60 * 1000;
```

Mirror the React rules without introducing a new dependency or changing `window.TeyesLeadCapture.capture()`. The React and static clients must be able to read each other's durable record.

- [ ] **Step 6: Run focused and contract tests and verify GREEN**

Run:

```powershell
npx vitest run src/lib/leadCapture.test.ts src/test/static-lead-client.test.ts
npx vitest run --maxWorkers=1
```

Expected: focused tests pass and the stable full suite reports 0 failures.

- [ ] **Step 7: Commit durable attribution repair**

Stage only:

```powershell
git add -- src/lib/tracking.ts public/lead-capture.js src/lib/leadCapture.test.ts src/test/static-lead-client.test.ts
git commit -m "fix: persist lead attribution across sessions"
```

Expected: the second implementation commit contains no GTM timing-test changes.

---

### Task 3: Final non-mutating verification

**Files:**
- Verify only; no production file changes.

**Interfaces:**
- Consumes: the two implementation commits.
- Produces: reproducible local evidence for handoff.

- [ ] **Step 1: Run static verification**

Run:

```powershell
npx vitest run --maxWorkers=1
npm run lint
npm run build
npm run verify:gtm
git diff --check
git status --short
```

Expected: tests, lint, build, GTM browser verification, and diff check pass; status contains no uncommitted implementation files.

- [ ] **Step 2: Run a fake-click browser persistence check**

Use Puppeteer against the local built site:

1. open `/?gclid=TEST-CODEX-NOT-REAL&utm_source=google&utm_medium=cpc`;
2. verify the first page stores the fake values;
3. open a new page in the same browser context, which has empty `sessionStorage`;
4. navigate to `/contact/`;
5. verify `localStorage` restores the fake GCLID, UTM source, and original landing page;
6. do not submit any form or call `/api/zoho-lead`.

Expected: attribution survives the new tab and the observed network log contains no POST to `/api/zoho-lead`.

- [ ] **Step 3: Inspect commit separation and primary-checkout safety**

Run:

```powershell
git log --oneline -4
git show --stat --oneline HEAD~1
git show --stat --oneline HEAD
git -C D:\Users\46679\Documents\GitHub\teyesglobal status --short
```

Expected: two separate implementation commits are visible and the primary checkout retains its original dirty files unchanged.
