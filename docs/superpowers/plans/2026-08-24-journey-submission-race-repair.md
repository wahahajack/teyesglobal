# Journey Submission Race Repair Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prevent a completed lead submission from leaking its page/WhatsApp attribution into a later lead, while ensuring a late response cannot delete tracking created after submission.

**Architecture:** Replace response-time deletion with a submission transaction. At request creation, capture the exact form-entry, page-journey, and WhatsApp values into the request payload and synchronously remove only those active session keys. If the request fails while no newer tracking state exists, restore the captured raw values; success performs no later deletion. Implement the same contract in the React client and the standalone static client, then make server-side journey bounding retain complete route entries.

**Tech Stack:** TypeScript, React, browser `sessionStorage`, standalone JavaScript, Vitest/JSDOM, Netlify Functions, Zoho CRM API.

## Global Constraints

- Follow strict TDD: add each regression test first, run it, and record the expected RED failure before editing production code.
- Keep the endpoint, payload field names, Zoho field mapping, EmailJS behavior, redirects, thank-you routes, GTM events, visible copy, and WhatsApp destinations unchanged.
- Do not add Zoho custom fields and do not create a Zoho Lead for a WhatsApp-only click.
- Store only origin-relative paths; never store or emit WhatsApp phone numbers, message text, email addresses, arbitrary external URLs, or destination query strings.
- Preserve the existing limits: 20 complete journey entries, 1,024 characters for each journey, 255 characters for a WhatsApp click path, and 4,000 characters for Zoho `Description`.
- A lead payload must use the exact snapshot present when its request starts.
- Submission start must synchronously remove the submitted form-entry, journey, and WhatsApp session keys before the returned fetch promise settles.
- A failed request may restore the submitted state only if no newer form-entry, journey, or WhatsApp state has appeared.
- A successful or failed late response must never delete or overwrite tracking created after submission start.
- Tracking/storage failures must remain best-effort and must not block form submission or navigation.
- Do not modify the three existing static form redirect delays; the shared client must be safe even when the OEM page navigates immediately.
- Do not change GTM, GA4, Netlify production settings, Zoho configuration, or production data in this implementation.
- Keep `public/sitemap.xml` out of every commit; its generated `lastmod` changes are unrelated.
- TTL, browser session restoration, duplicate-tab semantics, and a wholesale rewrite of test installation guards are outside this repair. Continue describing attribution as same-tab, best-effort association rather than strict causal identity.

---

## File Map

- `src/lib/tracking.ts`: own the React submission transaction and conditional rollback.
- `src/lib/leadCapture.ts`: build the React request from the transaction payload and roll back only on failure.
- `src/lib/leadCapture.test.ts`: prove synchronous consumption, failure rollback, and protection of newer state with deferred responses.
- `public/lead-capture.js`: implement the same transaction semantics for all three static lead pages.
- `src/test/static-lead-client.test.ts`: reproduce immediate-navigation/slow-response behavior without awaiting capture first.
- `netlify/functions/create-zoho-lead.ts`: bound server-received journey values by complete entries instead of slicing a serialized path.
- `src/test/create-zoho-lead.test.ts`: prove the server retains only complete recent paths within the existing limits.
- `.superpowers/sdd/final-fix-report.md`: append RED/GREEN commands, results, commit IDs, and remaining evidence boundaries.

---

### Task 1: Make React lead submission consume an immutable tracking snapshot

**Files:**
- Modify: `src/lib/tracking.ts:300-398`
- Modify: `src/lib/leadCapture.ts:1-93`
- Test: `src/lib/leadCapture.test.ts:371-483`

**Interfaces:**
- Produces: `beginSubmissionTracking(): SubmissionTrackingTransaction`
- Produces: `SubmissionTrackingTransaction.payload`, containing `formEntryPage` plus all four `PageJourneySnapshot` fields.
- Produces: `SubmissionTrackingTransaction.rollbackIfUnchanged(): void`
- Consumes: existing `getFormEntryPage()`, `getPageJourneySnapshot()`, safe session helpers, and the three existing session keys.

- [ ] **Step 1: Add a deferred-response test that reproduces late-success deletion**

Add this helper near the test fixtures in `src/lib/leadCapture.test.ts`:

```ts
function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}
```

Replace the existing “sends the latest page and WA snapshot and clears it after success” case with:

```ts
it("consumes the submitted snapshot immediately and preserves newer state after a late success", async () => {
  clearPageJourney();
  history.replaceState({}, "", "/oem-odm/cases/");
  installPageJourneyTracking();
  document.body.innerHTML =
    '<a data-wa-location="cases_cta" href="https://wa.me/placeholder">WA</a>';
  document.querySelector("a")!.addEventListener("click", (event) => event.preventDefault());
  document.querySelector("a")!.dispatchEvent(
    new MouseEvent("click", { bubbles: true, cancelable: true }),
  );
  const response = deferred<Response>();
  const fetchMock = vi.fn().mockReturnValue(response.promise);
  vi.stubGlobal("fetch", fetchMock);

  const submission = submitZohoLead(validPayload);

  expect(sessionStorage.getItem("teyes_page_journey_v1")).toBeNull();
  expect(sessionStorage.getItem("teyes_last_whatsapp_click_v1")).toBeNull();

  history.pushState({}, "", "/thank-you/");
  document.body.innerHTML =
    '<a data-wa-location="thank_you_followup" href="https://wa.me/placeholder">WA</a>';
  document.querySelector("a")!.addEventListener("click", (event) => event.preventDefault());
  document.querySelector("a")!.dispatchEvent(
    new MouseEvent("click", { bubbles: true, cancelable: true }),
  );

  response.resolve(new Response(null, { status: 201 }));
  await submission;

  const sent = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
  expect(sent).toMatchObject({
    pageJourney: "/oem-odm/cases/",
    whatsappClickPath: "/oem-odm/cases/",
    whatsappClickCount: 1,
  });
  expect(getPageJourneySnapshot()).toMatchObject({
    pageJourney: "/thank-you/",
    whatsappClickPath: "/thank-you/",
    whatsappClickCount: 1,
  });
});
```

- [ ] **Step 2: Run the React late-success test and verify RED**

Run:

```powershell
npx vitest run src/lib/leadCapture.test.ts -t "consumes the submitted snapshot immediately and preserves newer state after a late success" --maxWorkers=1
```

Expected: FAIL before the deferred response is resolved because the old session keys are still present, or FAIL after resolution because the old success callback clears the new `/thank-you/` state.

- [ ] **Step 3: Add failure rollback tests before implementation**

Replace the existing “keeps the journey when Zoho submission fails” case and add the late-failure case:

```ts
it("restores the submitted snapshot after failure when no newer state exists", async () => {
  clearPageJourney();
  history.replaceState({}, "", "/contact/");
  installPageJourneyTracking();
  const response = deferred<Response>();
  vi.stubGlobal("fetch", vi.fn().mockReturnValue(response.promise));

  const submission = submitZohoLead(validPayload);
  expect(sessionStorage.getItem("teyes_page_journey_v1")).toBeNull();

  response.resolve(new Response(null, { status: 500 }));
  await expect(submission).rejects.toThrow("Zoho lead request failed with 500");

  expect(getPageJourneySnapshot().pageJourney).toBe("/contact/");
});

it("does not restore an old snapshot over newer state after a late failure", async () => {
  clearPageJourney();
  history.replaceState({}, "", "/oem-odm/");
  installPageJourneyTracking();
  sessionStorage.setItem("form_entry_page", "/products/cc4-pro/");
  const response = deferred<Response>();
  vi.stubGlobal("fetch", vi.fn().mockReturnValue(response.promise));

  const submission = submitZohoLead(validPayload);
  history.pushState({}, "", "/thank-you/");

  response.resolve(new Response(null, { status: 500 }));
  await expect(submission).rejects.toThrow("Zoho lead request failed with 500");

  expect(getPageJourneySnapshot().pageJourney).toBe("/thank-you/");
  expect(sessionStorage.getItem("form_entry_page")).toBeNull();
});
```

- [ ] **Step 4: Run both failure tests and verify RED**

Run:

```powershell
npx vitest run src/lib/leadCapture.test.ts -t "restores the submitted snapshot|does not restore an old snapshot" --maxWorkers=1
```

Expected: at least the synchronous-removal assertion fails with the current response-time cleanup implementation.

- [ ] **Step 5: Add the React submission transaction**

In `src/lib/tracking.ts`, add:

```ts
export interface SubmissionTrackingTransaction {
  payload: PageJourneySnapshot & { formEntryPage: string };
  rollbackIfUnchanged: () => void;
}

export function beginSubmissionTracking(): SubmissionTrackingTransaction {
  const storedFormEntryPage = safeSessionGet(FORM_ENTRY_PAGE_KEY);
  const rawPageJourney = safeSessionGet(PAGE_JOURNEY_KEY);
  const rawWhatsappClick = safeSessionGet(WHATSAPP_CLICK_KEY);
  const payload = {
    formEntryPage: storedFormEntryPage || getCurrentPath(),
    ...getPageJourneySnapshot(),
  };

  safeSessionRemove(FORM_ENTRY_PAGE_KEY);
  safeSessionRemove(PAGE_JOURNEY_KEY);
  safeSessionRemove(WHATSAPP_CLICK_KEY);

  return {
    payload,
    rollbackIfUnchanged: () => {
      if (
        safeSessionGet(FORM_ENTRY_PAGE_KEY) !== null ||
        safeSessionGet(PAGE_JOURNEY_KEY) !== null ||
        safeSessionGet(WHATSAPP_CLICK_KEY) !== null
      ) {
        return;
      }

      if (storedFormEntryPage) {
        safeSessionSet(FORM_ENTRY_PAGE_KEY, storedFormEntryPage);
      }
      if (rawPageJourney) safeSessionSet(PAGE_JOURNEY_KEY, rawPageJourney);
      if (rawWhatsappClick) safeSessionSet(WHATSAPP_CLICK_KEY, rawWhatsappClick);
    },
  };
}
```

In `src/lib/leadCapture.ts`, replace the response-time clearing imports with `beginSubmissionTracking`, then replace `submitZohoLead` with:

```ts
export async function submitZohoLead(
  payload: LeadCapturePayload,
): Promise<void> {
  const tracking = beginSubmissionTracking();
  const leadPayload = {
    ...payload,
    ...tracking.payload,
  };

  try {
    const response = await fetch("/api/zoho-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadPayload),
      keepalive: true,
    });

    if (!response.ok) {
      throw new Error(`Zoho lead request failed with ${response.status}`);
    }
  } catch (error) {
    tracking.rollbackIfUnchanged();
    throw error;
  }
}
```

Do not retain `clearFormEntryPage()` or `clearPageJourney()` after a successful response.

- [ ] **Step 6: Run the focused React tests and verify GREEN**

Run:

```powershell
npx vitest run src/lib/leadCapture.test.ts --maxWorkers=1
```

Expected: all tests in `src/lib/leadCapture.test.ts` pass, including the three deferred-response regressions.

- [ ] **Step 7: Commit Task 1 without the generated sitemap**

Run:

```powershell
git add src/lib/tracking.ts src/lib/leadCapture.ts src/lib/leadCapture.test.ts
git diff --cached --check
git commit -m "fix: isolate lead submission tracking state"
```

Expected: one commit containing only the three Task 1 files.

---

### Task 2: Apply the same transaction contract to static lead pages

**Files:**
- Modify: `public/lead-capture.js:232-264`
- Test: `src/test/static-lead-client.test.ts:123-177`

**Interfaces:**
- Consumes: the same three static session keys and existing `pageJourneySnapshot()`.
- Produces: internal `beginSubmissionTracking()` returning `{ payload, rollbackIfUnchanged }`.
- Preserves: `window.TeyesLeadCapture.capture(form, options): Promise<void>`.

- [ ] **Step 1: Add the static deferred-response helper and late-success regression**

Add the same generic `deferred<T>()` helper near the top of `src/test/static-lead-client.test.ts`.

Add:

```ts
it("consumes static attribution before navigation and preserves the next page after late success", async () => {
  renderForm();
  history.replaceState({}, "", "/android-car-stereo-oem-manufacturer/");
  window.eval(staticLeadClient);
  document.body.insertAdjacentHTML(
    "beforeend",
    '<a data-wa-location="oem_pricing" href="https://wa.me/placeholder">WA</a>',
  );
  document.querySelector("a")!.addEventListener("click", (event) => event.preventDefault());
  document.querySelector("a")!.dispatchEvent(
    new MouseEvent("click", { bubbles: true, cancelable: true }),
  );
  const response = deferred<Response>();
  const fetchMock = vi.fn().mockReturnValue(response.promise);
  vi.stubGlobal("fetch", fetchMock);

  const submission = client().capture(form(), options);

  expect(sessionStorage.getItem("teyes_page_journey_v1")).toBeNull();
  expect(sessionStorage.getItem("teyes_last_whatsapp_click_v1")).toBeNull();

  history.pushState({}, "", "/android-car-stereo-oem-manufacturer/thank-you.html");
  response.resolve(new Response(null, { status: 201 }));
  await submission;

  const sent = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
  expect(sent.whatsappClickPath).toBe("/android-car-stereo-oem-manufacturer/");
  expect(
    JSON.parse(sessionStorage.getItem("teyes_page_journey_v1") || "[]"),
  ).toEqual(["/android-car-stereo-oem-manufacturer/thank-you.html"]);
});
```

- [ ] **Step 2: Run the static late-success test and verify RED**

Run:

```powershell
npx vitest run src/test/static-lead-client.test.ts -t "consumes static attribution before navigation and preserves the next page after late success" --maxWorkers=1
```

Expected: FAIL because capture leaves the old keys active until the response and then removes the newly recorded thank-you path.

- [ ] **Step 3: Strengthen the static failure test**

Replace the existing failure-retention test with:

```ts
it("restores a failed static snapshot only when no newer state exists", async () => {
  renderForm();
  history.replaceState({}, "", "/android-car-stereo-wholesale/");
  window.eval(staticLeadClient);
  sessionStorage.setItem("form_entry_page", "/products/cc4-pro/");
  const response = deferred<Response>();
  vi.stubGlobal("fetch", vi.fn().mockReturnValue(response.promise));

  const submission = client().capture(form(), options);
  expect(sessionStorage.getItem("teyes_page_journey_v1")).toBeNull();

  response.resolve(new Response(null, { status: 500 }));
  await expect(submission).rejects.toThrow("Zoho lead capture failed");

  expect(
    JSON.parse(sessionStorage.getItem("teyes_page_journey_v1") || "[]"),
  ).toEqual(["/android-car-stereo-wholesale/"]);
});

it("does not restore a failed static snapshot over a newer page", async () => {
  renderForm();
  history.replaceState({}, "", "/android-car-stereo-wholesale/");
  window.eval(staticLeadClient);
  const response = deferred<Response>();
  vi.stubGlobal("fetch", vi.fn().mockReturnValue(response.promise));

  const submission = client().capture(form(), options);
  history.pushState({}, "", "/android-car-stereo-wholesale/thank-you.html");

  response.resolve(new Response(null, { status: 500 }));
  await expect(submission).rejects.toThrow("Zoho lead capture failed");

  expect(
    JSON.parse(sessionStorage.getItem("teyes_page_journey_v1") || "[]"),
  ).toEqual(["/android-car-stereo-wholesale/thank-you.html"]);
  expect(sessionStorage.getItem("form_entry_page")).toBeNull();
});
```

- [ ] **Step 4: Run the static failure tests and verify RED**

Run:

```powershell
npx vitest run src/test/static-lead-client.test.ts -t "restores a failed static snapshot|does not restore a failed static snapshot" --maxWorkers=1
```

Expected: the synchronous-removal assertion fails with the current implementation.

- [ ] **Step 5: Implement the standalone transaction**

In `public/lead-capture.js`, add before `capture()`:

```js
  const beginSubmissionTracking = () => {
    const storedFormEntryPage = readSession("form_entry_page");
    const rawPageJourney = readSession(PAGE_JOURNEY_KEY);
    const rawWhatsappClick = readSession(WHATSAPP_CLICK_KEY);
    const payload = {
      formEntryPage: storedFormEntryPage || currentPath(),
      ...pageJourneySnapshot(),
    };

    removeSession("form_entry_page");
    removeSession(PAGE_JOURNEY_KEY);
    removeSession(WHATSAPP_CLICK_KEY);

    return {
      payload,
      rollbackIfUnchanged: () => {
        if (
          readSession("form_entry_page") ||
          readSession(PAGE_JOURNEY_KEY) ||
          readSession(WHATSAPP_CLICK_KEY)
        ) return;
        if (storedFormEntryPage) writeSession("form_entry_page", storedFormEntryPage);
        if (rawPageJourney) writeSession(PAGE_JOURNEY_KEY, rawPageJourney);
        if (rawWhatsappClick) writeSession(WHATSAPP_CLICK_KEY, rawWhatsappClick);
      },
    };
  };
```

Then change `capture()` so it begins the transaction after form/attribution data is readable, spreads `tracking.payload` into the request payload, and rolls back only on failure:

```js
  function capture(form, options) {
    const formData = new FormData(form);
    const durable = readDurable();
    const attribution = {
      landing_page: readStorage("landing_page", durable),
      referrer: readStorage("referrer", durable),
    };
    ATTRIBUTION_KEYS.forEach((key) => { attribution[key] = readStorage(key, durable); });
    const tracking = beginSubmissionTracking();
    const payload = {
      source: options.source,
      fullName: value(formData, "contact_name"),
      email: value(formData, "user_email"),
      company: value(formData, "company_name"),
      country: value(formData, "country"),
      inquiryType: options.inquiryType,
      message: value(formData, "message"),
      estimatedQuantity: value(formData, "estimated_quantity"),
      businessModel: value(formData, "business_model"),
      submittedAt: new Date().toISOString(),
      website: value(formData, "website"),
      attribution,
      ...tracking.payload,
    };
    return fetch("/api/zoho-lead", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload), keepalive: true,
    }).then((response) => {
      if (!response.ok) throw new Error("Zoho lead capture failed");
    }).catch((error) => {
      tracking.rollbackIfUnchanged();
      throw error;
    });
  }
```

Do not edit the OEM, Wholesale, or Distributor redirect handlers. Their existing fire-and-forget calls become safe because the submitted state is consumed synchronously before `capture()` returns.

- [ ] **Step 6: Run focused static tests and verify GREEN**

Run:

```powershell
npx vitest run src/test/static-lead-client.test.ts --maxWorkers=1
```

Expected: every static client test passes, including slow success, failure rollback, and newer-state preservation.

- [ ] **Step 7: Run the static source contract**

Run:

```powershell
npx vitest run src/test/tracking-contract.test.ts src/test/static-lead-client.test.ts --maxWorkers=1
```

Expected: both files pass; the three static pages still load `/lead-capture.js`, retain their redirects, and keep their WA markers.

- [ ] **Step 8: Commit Task 2 without the sitemap**

Run:

```powershell
git add public/lead-capture.js src/test/static-lead-client.test.ts
git diff --cached --check
git commit -m "fix: rotate static lead journey before redirect"
```

Expected: one commit containing only the two Task 2 files.

---

### Task 3: Preserve complete journey entries at the server boundary

**Files:**
- Modify: `netlify/functions/create-zoho-lead.ts:44-57`
- Test: `src/test/create-zoho-lead.test.ts:121-142`

**Interfaces:**
- Preserves: `journey(value: unknown, limit: number): string`.
- Consumes: `journeyPath`, `MAX_JOURNEY_ENTRIES`, and existing field limits.
- Produces: a joined string containing only complete normalized paths, newest paths preferred.

- [ ] **Step 1: Add a failing complete-entry boundary test**

Add to `src/test/create-zoho-lead.test.ts`:

```ts
it("按字符预算保留完整的最近路径而不截断半条路径", async () => {
  const fetchMock = mockZohoTokenAndCreate();
  const routes = Array.from(
    { length: 6 },
    (_, index) => `/${"x".repeat(210)}-${index + 1}/`,
  );

  await post({
    ...validPayload,
    pageJourney: routes.join(" > "),
  }, validEnv, fetchMock);

  const lead = JSON.parse(String(fetchMock.mock.calls[1][1]?.body)).data[0];
  const line = String(lead.Description)
    .split("\n")
    .find((value) => value.startsWith("Page Journey: "));
  const serialized = line?.replace("Page Journey: ", "") || "";
  const retained = serialized.split(" > ").filter(Boolean);

  expect(serialized.length).toBeLessThanOrEqual(1024);
  expect(retained.length).toBeGreaterThan(0);
  expect(retained.every((route) => routes.includes(route))).toBe(true);
  expect(retained.at(-1)).toBe(routes.at(-1));
});
```

- [ ] **Step 2: Run the server boundary test and verify RED**

Run:

```powershell
npx vitest run src/test/create-zoho-lead.test.ts -t "按字符预算保留完整的最近路径而不截断半条路径" --maxWorkers=1
```

Expected: FAIL because the current final `.slice(0, limit)` returns a truncated route not present in `routes`.

- [ ] **Step 3: Replace serialized slicing with complete-entry bounding**

Replace `journey()` in `netlify/functions/create-zoho-lead.ts` with:

```ts
const journey = (value: unknown, limit: number) => {
  if (typeof value !== "string") return "";
  const clean = value.split("").filter((character) => {
    const code = character.charCodeAt(0);
    return code > 0x1f && code !== 0x7f;
  }).join("").trim();
  const entries = clean
    .split(" > ")
    .map(journeyPath)
    .filter(Boolean)
    .slice(-MAX_JOURNEY_ENTRIES);
  const kept: string[] = [];
  let length = 0;

  for (let index = entries.length - 1; index >= 0; index -= 1) {
    const entry = entries[index];
    const separatorLength = kept.length ? 3 : 0;
    if (length + separatorLength + entry.length > limit) continue;
    kept.unshift(entry);
    length += separatorLength + entry.length;
  }

  return kept.join(" > ");
};
```

- [ ] **Step 4: Run the complete Zoho function suite and verify GREEN**

Run:

```powershell
npx vitest run src/test/create-zoho-lead.test.ts src/test/zoho-security-contract.test.ts --maxWorkers=1
```

Expected: all tests pass; no credentials appear in frontend files; the new boundary test retains only complete paths.

- [ ] **Step 5: Commit Task 3 without the sitemap**

Run:

```powershell
git add netlify/functions/create-zoho-lead.ts src/test/create-zoho-lead.test.ts
git diff --cached --check
git commit -m "fix: keep complete server journey entries"
```

Expected: one commit containing only the two Task 3 files.

---

### Task 4: Full verification and evidence handoff

**Files:**
- Modify: `.superpowers/sdd/final-fix-report.md`
- Do not modify: `public/sitemap.xml`

**Interfaces:**
- Consumes: commits from Tasks 1-3.
- Produces: a reviewable report with RED evidence, GREEN evidence, remaining limitations, and exact commit range.

- [ ] **Step 1: Run the complete test suite**

Run:

```powershell
npm test -- --maxWorkers=1
```

Expected: all test files pass and the total test count is greater than the previous 105 because the new race regressions were added.

- [ ] **Step 2: Run type, lint, and diff checks**

Run:

```powershell
npx tsc --noEmit
npm run lint
git diff --check 6871c0d..HEAD
```

Expected: TypeScript exits 0; lint has 0 errors (the seven pre-existing Fast Refresh warnings may remain); diff check exits 0.

- [ ] **Step 3: Run the complete production build**

Run:

```powershell
npm run build
```

Expected: Vite build, 23-route prerender, sitemap synchronization, asset pruning, and `verify-seo-dist` all pass.

- [ ] **Step 4: Prove the generated sitemap is excluded**

Run:

```powershell
git status --short
git diff --name-only 40ee524..HEAD
git log --oneline 40ee524..HEAD
```

Expected: `public/sitemap.xml` may be modified in the worktree by the build, but it does not appear in any Task 1-3 commit or in the committed name list.

- [ ] **Step 5: Append the final repair evidence**

Append to `.superpowers/sdd/final-fix-report.md`:

```markdown
## Journey submission race repair

- React RED: deferred success reproduced response-time deletion of newer state.
- Static RED: fire-and-forget capture left submitted state active until response.
- Failure RED: current implementation did not consume state synchronously.
- GREEN: submitted state is consumed before fetch settles; rollback occurs only when no newer state exists.
- Server GREEN: journey character budgets retain complete recent paths.
- Full verification: copy the observed test count, TypeScript exit result, lint error/warning counts, production-build result, and `40ee524..HEAD` commit range from the commands run in Steps 1-4.
- Not verified here: deployment, GTM Preview, GA4 DebugView, external form submission, or Zoho receipt.
- Unrelated generated file: `public/sitemap.xml` remains uncommitted and excluded.
```

- [ ] **Step 6: Commit only the evidence report**

Run:

```powershell
git add .superpowers/sdd/final-fix-report.md
git diff --cached --check
git commit -m "docs: record journey race verification"
```

Expected: the final commit changes only the evidence report.

---

## Review Gates

After each task:

1. Generate a review package from that task’s recorded base commit to its HEAD.
2. Dispatch a fresh task reviewer for both spec compliance and code quality.
3. Fix every Critical or Important finding and re-review before starting the next task.
4. Record a clean task line in `.superpowers/sdd/progress.md`.

After Task 4:

1. Generate a whole-branch review package for `6871c0d..HEAD`.
2. Use the most capable available reviewer to check both race fixes, rollback semantics, privacy, limits, tests, and unrelated files.
3. Do not push, merge, deploy, publish GTM, or submit an external form during this plan.
4. Report local code verification separately from future deployed-site, GTM/GA4, website-response, and Zoho-receipt verification.
