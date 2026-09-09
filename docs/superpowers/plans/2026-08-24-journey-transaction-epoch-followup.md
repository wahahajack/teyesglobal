# Journey Transaction Epoch Follow-up Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give every lead-submission transaction explicit session-scoped ownership so concurrent requests cannot restore another request’s attribution state.

**Architecture:** Add one shared session revision key, `teyes_tracking_revision_v1`, to both the React and static tracking implementations. Every tracking-state mutation and every submission start advances the revision. A failed transaction may roll back only when the stored revision still equals its own token and all three active tracking keys remain empty.

**Tech Stack:** TypeScript, browser `sessionStorage`, standalone JavaScript, Vitest/JSDOM.

## Global Constraints

- Strict TDD: add concurrent deferred-response tests and observe the expected RED failures before changing production code.
- Keep the already-approved transaction payload, endpoint, redirects, GTM events, Zoho mapping, privacy filters, and field limits unchanged.
- Use the exact revision key `teyes_tracking_revision_v1` in React and static clients.
- Advance the revision for form-entry writes, page-journey writes, WhatsApp snapshot writes, explicit journey/form-entry clears, and every `beginSubmissionTracking()`.
- A rollback is allowed only when the current revision equals the transaction token and `form_entry_page`, `teyes_page_journey_v1`, and `teyes_last_whatsapp_click_v1` are all absent.
- Rollback restores all submitted raw values together or restores nothing.
- Do not log or transmit the revision; it is session-local coordination state and must not enter GA4, the lead payload, Zoho, or URLs.
- Storage failures remain best-effort and must not block submission or navigation.
- Do not modify static redirect handlers, server/Zoho code, HTML destinations, GTM, deployment, or production systems.
- Never stage or commit `public/sitemap.xml`.

---

### Task 1: Add revision ownership to React transactions

**Files:**
- Modify: `src/lib/tracking.ts`
- Test: `src/lib/leadCapture.test.ts`

**Interfaces:**
- Produces internal `readTrackingRevision(): number`.
- Produces internal `advanceTrackingRevision(): number`.
- Extends `SubmissionTrackingTransaction` behavior without changing its public shape.

- [ ] **Step 1: Add a helper that records distinct race snapshots**

Near the existing `deferred<T>()` helper in `src/lib/leadCapture.test.ts`, add:

```ts
function recordRaceSnapshot(path: string, location: string) {
  history.pushState({}, "", path);
  document.body.innerHTML =
    `<a data-wa-location="${location}" href="https://wa.me/placeholder">WA</a>`;
  const link = document.querySelector("a")!;
  link.addEventListener("click", (event) => event.preventDefault());
  link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
}
```

- [ ] **Step 2: Add the A-fails/B-succeeds regression**

Add under `describe("submitZohoLead")`:

```ts
it("does not let an older failed submission restore over a newer successful transaction", async () => {
  clearPageJourney();
  installPageJourneyTracking();
  recordRaceSnapshot("/race-a/", "race_a");
  const responseA = deferred<Response>();
  const responseB = deferred<Response>();
  const fetchMock = vi.fn()
    .mockReturnValueOnce(responseA.promise)
    .mockReturnValueOnce(responseB.promise);
  vi.stubGlobal("fetch", fetchMock);

  const submissionA = submitZohoLead(validPayload);
  recordRaceSnapshot("/race-b/", "race_b");
  const submissionB = submitZohoLead(validPayload);

  const bodyA = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
  const bodyB = JSON.parse(String(fetchMock.mock.calls[1][1]?.body));
  expect(bodyA.whatsappClickPath).toBe("/race-a/");
  expect(bodyB.whatsappClickPath).toBe("/race-b/");

  responseA.resolve(new Response(null, { status: 500 }));
  await expect(submissionA).rejects.toThrow("Zoho lead request failed with 500");
  expect(sessionStorage.getItem("teyes_page_journey_v1")).toBeNull();
  expect(sessionStorage.getItem("teyes_last_whatsapp_click_v1")).toBeNull();

  responseB.resolve(new Response(null, { status: 201 }));
  await submissionB;
  expect(sessionStorage.getItem("teyes_page_journey_v1")).toBeNull();
  expect(sessionStorage.getItem("teyes_last_whatsapp_click_v1")).toBeNull();
});
```

- [ ] **Step 3: Add both-fail response-order coverage**

Add:

```ts
it.each(["older-first", "newer-first"] as const)(
  "restores only the newest failed snapshot when concurrent responses settle %s",
  async (order) => {
    clearPageJourney();
    installPageJourneyTracking();
    recordRaceSnapshot("/race-a/", "race_a");
    const responseA = deferred<Response>();
    const responseB = deferred<Response>();
    vi.stubGlobal("fetch", vi.fn()
      .mockReturnValueOnce(responseA.promise)
      .mockReturnValueOnce(responseB.promise));

    const submissionA = submitZohoLead(validPayload);
    recordRaceSnapshot("/race-b/", "race_b");
    const submissionB = submitZohoLead(validPayload);

    if (order === "older-first") {
      responseA.resolve(new Response(null, { status: 500 }));
      await expect(submissionA).rejects.toThrow();
      responseB.resolve(new Response(null, { status: 500 }));
      await expect(submissionB).rejects.toThrow();
    } else {
      responseB.resolve(new Response(null, { status: 500 }));
      await expect(submissionB).rejects.toThrow();
      responseA.resolve(new Response(null, { status: 500 }));
      await expect(submissionA).rejects.toThrow();
    }

    expect(getPageJourneySnapshot()).toMatchObject({
      whatsappClickPath: "/race-b/",
      whatsappClickCount: 1,
    });
    expect(getPageJourneySnapshot().pageJourney).toContain("/race-b/");
    expect(getPageJourneySnapshot().pageJourney).not.toContain("/race-a/");
  },
);
```

- [ ] **Step 4: Run the three React race cases and verify RED**

Run:

```powershell
npx vitest run src/lib/leadCapture.test.ts -t "older failed submission|restores only the newest failed snapshot" --maxWorkers=1
```

Expected: at least one case fails because the older transaction sees empty keys after the newer transaction consumes them and restores `/race-a/`.

- [ ] **Step 5: Implement revision helpers and mutation advancement**

In `src/lib/tracking.ts`, add beside the existing tracking keys:

```ts
const TRACKING_REVISION_KEY = "teyes_tracking_revision_v1";
```

Add after the safe session helpers:

```ts
function readTrackingRevision() {
  const revision = Number(safeSessionGet(TRACKING_REVISION_KEY));
  return Number.isSafeInteger(revision) && revision >= 0 ? revision : 0;
}

function advanceTrackingRevision() {
  const current = readTrackingRevision();
  const next = current >= Number.MAX_SAFE_INTEGER ? 1 : current + 1;
  safeSessionSet(TRACKING_REVISION_KEY, String(next));
  return next;
}
```

Advance after these tracking mutations:

```ts
safeSessionSet(FORM_ENTRY_PAGE_KEY, getCurrentPath());
advanceTrackingRevision();
```

Replace the direct page-journey `sessionStorage.setItem(...)` block with:

```ts
safeSessionSet(
  PAGE_JOURNEY_KEY,
  JSON.stringify(boundJourneyEntries(entries)),
);
advanceTrackingRevision();
```

Replace the direct WhatsApp snapshot write with:

```ts
if (clickPath) {
  safeSessionSet(WHATSAPP_CLICK_KEY, JSON.stringify(stored));
  advanceTrackingRevision();
}
```

In `beginSubmissionTracking()`, capture the token immediately before removing keys:

```ts
const revision = advanceTrackingRevision();
safeSessionRemove(FORM_ENTRY_PAGE_KEY);
safeSessionRemove(PAGE_JOURNEY_KEY);
safeSessionRemove(WHATSAPP_CLICK_KEY);
```

Make the first rollback condition:

```ts
if (
  readTrackingRevision() !== revision ||
  safeSessionGet(FORM_ENTRY_PAGE_KEY) !== null ||
  safeSessionGet(PAGE_JOURNEY_KEY) !== null ||
  safeSessionGet(WHATSAPP_CLICK_KEY) !== null
) {
  return;
}
```

After `clearFormEntryPage()` removes its key, call `advanceTrackingRevision()`. After `clearPageJourney()` removes both keys, call `advanceTrackingRevision()`.

Do not add `revision` to the transaction payload or exported interface.

- [ ] **Step 6: Run the React suite and verify GREEN**

Run:

```powershell
npx vitest run src/lib/leadCapture.test.ts --maxWorkers=1
```

Expected: every React lead-capture test passes, including both response orders.

- [ ] **Step 7: Commit only React files**

Run:

```powershell
git add src/lib/tracking.ts src/lib/leadCapture.test.ts
git diff --cached --check
git commit -m "fix: own concurrent lead rollback revisions"
```

Expected: the commit contains exactly the two Task 1 files.

---

### Task 2: Add the same revision ownership to static transactions

**Files:**
- Modify: `public/lead-capture.js`
- Test: `src/test/static-lead-client.test.ts`

**Interfaces:**
- Uses the exact shared key `teyes_tracking_revision_v1`.
- Preserves `window.TeyesLeadCapture.capture(form, options): Promise<void>`.

- [ ] **Step 1: Add a static race-snapshot helper**

Near the existing deferred helper, add:

```ts
function recordStaticRaceSnapshot(path: string, location: string) {
  history.pushState({}, "", path);
  document.body.innerHTML =
    `<form id="lead"><input name="user_email" value="buyer@example.com"></form>` +
    `<a data-wa-location="${location}" href="https://wa.me/placeholder">WA</a>`;
  const link = document.querySelector("a")!;
  link.addEventListener("click", (event) => event.preventDefault());
  link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
}
```

- [ ] **Step 2: Add static A/B concurrent tests**

Add equivalents of the two React cases:

```ts
it("does not let an older failed static submission restore after the newer one succeeds", async () => {
  history.replaceState({}, "", "/static-race-start/");
  window.eval(staticLeadClient);
  recordStaticRaceSnapshot("/static-race-a/", "race_a");
  const responseA = deferred<Response>();
  const responseB = deferred<Response>();
  const fetchMock = vi.fn()
    .mockReturnValueOnce(responseA.promise)
    .mockReturnValueOnce(responseB.promise);
  vi.stubGlobal("fetch", fetchMock);

  const submissionA = client().capture(form(), options);
  recordStaticRaceSnapshot("/static-race-b/", "race_b");
  const submissionB = client().capture(form(), options);

  expect(JSON.parse(String(fetchMock.mock.calls[0][1]?.body)).whatsappClickPath)
    .toBe("/static-race-a/");
  expect(JSON.parse(String(fetchMock.mock.calls[1][1]?.body)).whatsappClickPath)
    .toBe("/static-race-b/");

  responseA.resolve(new Response(null, { status: 500 }));
  await expect(submissionA).rejects.toThrow("Zoho lead capture failed");
  expect(sessionStorage.getItem("teyes_page_journey_v1")).toBeNull();

  responseB.resolve(new Response(null, { status: 201 }));
  await submissionB;
  expect(sessionStorage.getItem("teyes_page_journey_v1")).toBeNull();
  expect(sessionStorage.getItem("teyes_last_whatsapp_click_v1")).toBeNull();
});

it.each(["older-first", "newer-first"] as const)(
  "restores only the newest failed static snapshot when responses settle %s",
  async (order) => {
    history.replaceState({}, "", "/static-race-start/");
    window.eval(staticLeadClient);
    recordStaticRaceSnapshot("/static-race-a/", "race_a");
    const responseA = deferred<Response>();
    const responseB = deferred<Response>();
    vi.stubGlobal("fetch", vi.fn()
      .mockReturnValueOnce(responseA.promise)
      .mockReturnValueOnce(responseB.promise));

    const submissionA = client().capture(form(), options);
    recordStaticRaceSnapshot("/static-race-b/", "race_b");
    const submissionB = client().capture(form(), options);

    if (order === "older-first") {
      responseA.resolve(new Response(null, { status: 500 }));
      await expect(submissionA).rejects.toThrow();
      responseB.resolve(new Response(null, { status: 500 }));
      await expect(submissionB).rejects.toThrow();
    } else {
      responseB.resolve(new Response(null, { status: 500 }));
      await expect(submissionB).rejects.toThrow();
      responseA.resolve(new Response(null, { status: 500 }));
      await expect(submissionA).rejects.toThrow();
    }

    const rawJourney = JSON.parse(
      sessionStorage.getItem("teyes_page_journey_v1") || "[]",
    );
    expect(rawJourney).toContain("/static-race-b/");
    expect(rawJourney).not.toContain("/static-race-a/");
    expect(
      JSON.parse(sessionStorage.getItem("teyes_last_whatsapp_click_v1") || "{}").path,
    ).toBe("/static-race-b/");
  },
);
```

- [ ] **Step 3: Run static concurrent cases and verify RED**

Run:

```powershell
npx vitest run src/test/static-lead-client.test.ts -t "older failed static submission|restores only the newest failed static snapshot" --maxWorkers=1
```

Expected: at least one case fails by restoring `/static-race-a/`.

- [ ] **Step 4: Implement the static revision**

In `public/lead-capture.js`, add:

```js
  const TRACKING_REVISION_KEY = "teyes_tracking_revision_v1";
```

Add after session helpers:

```js
  const readTrackingRevision = () => {
    const revision = Number(readSession(TRACKING_REVISION_KEY));
    return Number.isSafeInteger(revision) && revision >= 0 ? revision : 0;
  };
  const advanceTrackingRevision = () => {
    const current = readTrackingRevision();
    const next = current >= Number.MAX_SAFE_INTEGER ? 1 : current + 1;
    writeSession(TRACKING_REVISION_KEY, String(next));
    return next;
  };
```

After writing a page-journey entry, call `advanceTrackingRevision()`. After a valid WhatsApp snapshot write, call `advanceTrackingRevision()`.

In `beginSubmissionTracking()`, call:

```js
    const revision = advanceTrackingRevision();
    removeSession("form_entry_page");
    removeSession(PAGE_JOURNEY_KEY);
    removeSession(WHATSAPP_CLICK_KEY);
```

Make rollback start with:

```js
        if (
          readTrackingRevision() !== revision ||
          readSession("form_entry_page") ||
          readSession(PAGE_JOURNEY_KEY) ||
          readSession(WHATSAPP_CLICK_KEY)
        ) return;
```

Static attribution writes such as `gclid`, landing page, and referrer must not advance this revision.

- [ ] **Step 5: Run static suites and verify GREEN**

Run:

```powershell
npx vitest run src/test/static-lead-client.test.ts src/test/tracking-contract.test.ts --maxWorkers=1
```

Expected: all static client and source-contract tests pass.

- [ ] **Step 6: Commit only static files**

Run:

```powershell
git add public/lead-capture.js src/test/static-lead-client.test.ts
git diff --cached --check
git commit -m "fix: own static concurrent rollback revisions"
```

Expected: the commit contains exactly the two Task 2 files.

---

### Task 3: Re-run all local gates and update evidence

**Files:**
- Modify: `.superpowers/sdd/final-fix-report.md`

- [ ] **Step 1: Run full local gates**

Run:

```powershell
npm test -- --maxWorkers=1
npx tsc --noEmit
npm run lint
git diff --check 6871c0d..HEAD
npm run build
```

Expected: tests exceed 109 and all pass; TypeScript exits 0; lint has 0 errors; diff check exits 0; production build and 23-route verifier pass.

- [ ] **Step 2: Confirm scope**

Run:

```powershell
git diff --name-only d53c128..HEAD
git status --short
```

Expected: committed code changes are limited to the two React files and two static files plus the later report commit; `public/sitemap.xml` remains unstaged.

- [ ] **Step 3: Append exact evidence and commit only the report**

Append a `## Concurrent transaction epoch repair` section recording:

- both React/static RED commands and observed failures;
- both GREEN focused counts;
- full test count, TypeScript, lint, diff, production build, and 23-route results;
- exact code verification range ending at the Task 2 code commit;
- no deployment, GTM, GA4, form submission, or Zoho verification;
- sitemap remains excluded.

Then run:

```powershell
git add .superpowers/sdd/final-fix-report.md
git diff --cached --check
git commit -m "docs: record concurrent tracking verification"
```

Expected: the evidence commit changes only `.superpowers/sdd/final-fix-report.md`.

---

## Review Gates

- Review Task 1 before starting Task 2.
- Review Task 2 before full verification.
- Final whole-branch review must explicitly re-check A/B response-order ownership.
- Do not push, merge, deploy, publish GTM, or submit external data during this plan.
