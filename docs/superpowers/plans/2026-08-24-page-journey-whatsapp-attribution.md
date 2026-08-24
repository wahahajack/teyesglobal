# Page Journey and WhatsApp Attribution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Capture a bounded same-session page journey and the journey immediately before the latest WhatsApp click, send a GA4/GTM data-layer event, and append the values to the existing Zoho Lead `Description` field when a website form is submitted.

**Architecture:** The React tracker will extend `src/lib/tracking.ts` with a session-scoped route list, History API observation, and capture-phase WhatsApp click handling. The standalone `public/lead-capture.js` will implement the same storage and payload contract for the three static lead pages. The Netlify function will validate the optional values and render them into the standard Zoho `Description`; no Zoho custom fields or empty WA-only leads will be created.

**Tech Stack:** React 18, React Router 6, TypeScript, Vitest/jsdom, standalone browser JavaScript, Netlify Functions, Zoho CRM REST payloads, Google Tag Manager `dataLayer`, GA4 DebugView.

## Global Constraints

- Do not create a Zoho Lead when a visitor only clicks WhatsApp.
- Do not add or depend on Zoho custom fields; write the journey only to standard `Description`.
- Store only origin-relative paths; do not store WhatsApp phone numbers, message text, email addresses, or arbitrary external URLs.
- Cap the journey at 20 route entries and keep the final Zoho `Description` at or below 4,000 characters.
- Preserve existing `Form Entry Page`, inquiry type, attribution, honeypot, origin validation, and retry behavior.
- Keep journey capture best-effort; storage or tracking failures must never block navigation or form submission.
- Treat code-side `dataLayer` events, GTM Preview, GA4 DebugView, website responses, and Zoho receipt as separate evidence.
- Do not publish GTM or deploy production from this plan without a separate explicit approval checkpoint.
- Work only in the existing isolated worktree `D:\Users\46679\Documents\ChatGPT\谷歌广告\worktrees\teyesglobal-entry-timing-fix`; preserve unrelated changes in any other checkout.

## File Map

- Modify: `src/lib/tracking.ts` — React route journey state, History API observation, WhatsApp click classification, and `dataLayer` event dispatch.
- Modify: `src/main.tsx` — initialize the React journey tracker exactly once before the app renders.
- Modify: `src/lib/leadCapture.ts` — include the journey snapshot in the Zoho payload and clear it only after a successful response.
- Modify: `src/components/common/WhatsAppFloat.tsx` — add an explicit `data-wa-location` marker.
- Modify: `src/pages/Contact.tsx` — add an explicit marker to the Contact-page WhatsApp link.
- Modify: `public/lead-capture.js` — standalone journey tracker and payload handoff for static pages.
- Modify: `public/android-car-stereo-oem-manufacturer/index.html` — mark WhatsApp anchors.
- Modify: `public/android-car-stereo-wholesale/index.html` — mark WhatsApp anchors.
- Modify: `public/teyes-android-car-stereo-distributor/index.html` — mark WhatsApp anchors.
- Modify: `netlify/functions/create-zoho-lead.ts` — validate optional journey fields and append the attribution block to `Description`.
- Test: `src/lib/leadCapture.test.ts` — React journey, WhatsApp event, payload, and cleanup behavior.
- Test: `src/test/static-lead-client.test.ts` — standalone script journey, event, payload, and cleanup behavior.
- Test: `src/test/create-zoho-lead.test.ts` — server formatting, limits, backward compatibility, and untrusted-value rejection.
- Review: `src/test/tracking-contract.test.ts` — extend only if the existing static contract needs explicit marker coverage.
- No change: GTM container publication. A separate handoff checkpoint below describes the required tag configuration and evidence.

---

### Task 1: Add the React journey state and WhatsApp event contract

**Files:**
- Modify: `src/lib/tracking.ts`
- Modify: `src/main.tsx`
- Test: `src/lib/leadCapture.test.ts`

**Interfaces:**

```ts
export interface PageJourneySnapshot {
  pageJourney: string;
  whatsappClickJourney: string;
  whatsappClickPath: string;
  whatsappClickCount: number;
}

export function installPageJourneyTracking(): void;
export function getPageJourneySnapshot(): PageJourneySnapshot;
export function clearPageJourney(): void;
```

- [ ] **Step 1: Write the failing route and event tests.** Add tests that clear storage, install the tracker, move through History API routes, and assert de-duplicated paths. Also assert that a capture-phase WhatsApp listener records the source page before a bubbling listener changes the URL.

```ts
it("records an ordered de-duplicated SPA journey", () => {
  history.replaceState({}, "", "/");
  installPageJourneyTracking();
  history.pushState({}, "", "/oem-odm/");
  history.pushState({}, "", "/oem-odm/");
  history.pushState({}, "", "/oem-odm/cases/");

  expect(getPageJourneySnapshot().pageJourney).toBe(
    "/ > /oem-odm/ > /oem-odm/cases/",
  );
});

it("captures the WA source page before navigation changes the URL", () => {
  history.replaceState({}, "", "/oem-odm/cases/");
  window.dataLayer = [];
  installPageJourneyTracking();
  document.body.innerHTML =
    '<a data-wa-location="cases_cta" href="https://wa.me/123?text=ignored">WA</a>';
  const link = document.querySelector("a")!;
  link.addEventListener("click", (event) => {
    event.preventDefault();
    history.replaceState({}, "", "/contact/");
  });

  link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));

  expect(getPageJourneySnapshot()).toMatchObject({
    whatsappClickPath: "/oem-odm/cases/",
    whatsappClickJourney: "/oem-odm/cases/",
    whatsappClickCount: 1,
  });
  expect(window.dataLayer).toContainEqual(expect.objectContaining({
    event: "whatsapp_click",
    page_path: "/oem-odm/cases/",
    wa_click_path: "/oem-odm/cases/",
    link_location: "cases_cta",
    destination_host: "wa.me",
  }));
});
```

- [ ] **Step 2: Run the focused tests and verify the expected RED failure.**

Run:

```powershell
npm test -- src/lib/leadCapture.test.ts
```

Expected: FAIL because `installPageJourneyTracking`, `getPageJourneySnapshot`, and `clearPageJourney` do not yet exist and no `whatsapp_click` event is emitted.

- [ ] **Step 3: Implement the minimal tracker.** Add these constants and behaviors to `src/lib/tracking.ts` without changing existing ad attribution:

```ts
const PAGE_JOURNEY_KEY = "teyes_page_journey_v1";
const WHATSAPP_CLICK_KEY = "teyes_last_whatsapp_click_v1";
const MAX_PAGE_JOURNEY_ENTRIES = 20;
const WHATSAPP_HOSTS = new Set([
  "wa.me",
  "api.whatsapp.com",
  "web.whatsapp.com",
]);

export interface PageJourneySnapshot {
  pageJourney: string;
  whatsappClickJourney: string;
  whatsappClickPath: string;
  whatsappClickCount: number;
}
```

Implement `getCurrentPath()` as the existing pathname plus search behavior used by form entry tracking, and add a path-only normalizer for journey entries. `recordPageJourneyEntry()` must read JSON safely, append only when the new path differs from the last entry, trim to the last 20 entries, and swallow storage errors. `installPageJourneyTracking()` must:

1. record the current path immediately;
2. wrap `history.pushState` and `history.replaceState` once, call the original method, then record the new path;
3. listen for `popstate` and record the new path;
4. add one capture-phase document click listener that resolves the closest anchor, recognizes the four WhatsApp destination forms, snapshots the current journey before bubbling navigation, writes the latest click state, and pushes the `whatsapp_click` object shown in the test;
5. call `loadGtmNow()` after the `dataLayer` push and never call `preventDefault()`.

`getPageJourneySnapshot()` returns the joined journey, the latest WA snapshot, and a numeric click count. When storage is unavailable, it returns the current path for `pageJourney` and empty WA values. `clearPageJourney()` removes both keys safely. Use a module-level installation guard so `main.tsx` can call it once; the guard must also ensure History API wrappers and document listeners are installed only once in tests.

- [ ] **Step 4: Run the focused tests and verify GREEN.**

Run:

```powershell
npm test -- src/lib/leadCapture.test.ts
```

Expected: PASS for the new journey/event tests and all existing lead-capture tests.

- [ ] **Step 5: Initialize the tracker once.** In `src/main.tsx`, call `installPageJourneyTracking()` immediately after `installContactEntryTracking()` and before `createRoot(...)`. Do not move or remove `persistAdParams()`.

- [ ] **Step 6: Commit the isolated task.**

```powershell
git add src/lib/tracking.ts src/main.tsx src/lib/leadCapture.test.ts
git commit -m "feat: track page journey and WhatsApp clicks"
```

---

### Task 2: Carry the React snapshot into website form submissions

**Files:**
- Modify: `src/lib/leadCapture.ts`
- Modify: `src/components/common/WhatsAppFloat.tsx`
- Modify: `src/pages/Contact.tsx`
- Test: `src/lib/leadCapture.test.ts`

**Interfaces:**

- `LeadCapturePayload` gains optional `pageJourney`, `whatsappClickJourney`, `whatsappClickPath`, and `whatsappClickCount` fields.
- `submitZohoLead(payload)` remains the existing public function and still posts to `/api/zoho-lead` with `keepalive: true`.

- [ ] **Step 1: Write the failing payload and cleanup tests.** Extend `src/lib/leadCapture.test.ts` with a test that seeds the tracker, calls `submitZohoLead`, and asserts the four fields are serialized. Assert that a `201` clears the journey and a `500` leaves it intact.

```ts
it("sends the latest page and WA snapshot and clears it after success", async () => {
  history.replaceState({}, "", "/oem-odm/cases/");
  installPageJourneyTracking();
  document.body.innerHTML =
    '<a data-wa-location="cases_cta" href="https://wa.me/123">WA</a>';
  document.querySelector("a")!.dispatchEvent(
    new MouseEvent("click", { bubbles: true, cancelable: true }),
  );
  const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
  vi.stubGlobal("fetch", fetchMock);

  await submitZohoLead(validPayload);

  const body = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
  expect(body).toMatchObject({
    pageJourney: "/oem-odm/cases/",
    whatsappClickJourney: "/oem-odm/cases/",
    whatsappClickPath: "/oem-odm/cases/",
    whatsappClickCount: 1,
  });
  expect(getPageJourneySnapshot().whatsappClickPath).toBe("");
});

it("keeps the journey when Zoho submission fails", async () => {
  installPageJourneyTracking();
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 500 })));

  await expect(submitZohoLead(validPayload)).rejects.toThrow(
    "Zoho lead request failed with 500",
  );
  expect(getPageJourneySnapshot().pageJourney).not.toBe("");
});
```

- [ ] **Step 2: Run the focused tests and verify RED.**

Run:

```powershell
npm test -- src/lib/leadCapture.test.ts
```

Expected: FAIL because the payload does not contain the journey fields and successful submission does not clear them.

- [ ] **Step 3: Implement the minimal handoff and markers.** In `src/lib/leadCapture.ts`, read `getPageJourneySnapshot()` alongside `getFormEntryPage()`, spread the snapshot into the request body, and call `clearPageJourney()` only after `response.ok`. Keep the existing form-entry clear behavior and error text unchanged.

Add explicit markers without changing destinations or visible text:

```tsx
<a
  data-wa-location="whatsapp_float"
  href={whatsappUrl}
  target="_blank"
  rel="noopener noreferrer"
>
```

and on the Contact-page information link:

```tsx
<a
  data-wa-location="contact_info"
  href={info.href}
  target={info.label === "WhatsApp" ? "_blank" : undefined}
  rel={info.label === "WhatsApp" ? "noopener noreferrer" : undefined}
>
```

- [ ] **Step 4: Run focused tests and verify GREEN.**

Run:

```powershell
npm test -- src/lib/leadCapture.test.ts
```

Expected: PASS, including all pre-existing form-entry and attribution tests.

- [ ] **Step 5: Commit the isolated task.**

```powershell
git add src/lib/leadCapture.ts src/components/common/WhatsAppFloat.tsx src/pages/Contact.tsx src/lib/leadCapture.test.ts
git commit -m "feat: attach journey context to React leads"
```

---

### Task 3: Extend the standalone static lead client

**Files:**
- Modify: `public/lead-capture.js`
- Modify: `public/android-car-stereo-oem-manufacturer/index.html`
- Modify: `public/android-car-stereo-wholesale/index.html`
- Modify: `public/teyes-android-car-stereo-distributor/index.html`
- Test: `src/test/static-lead-client.test.ts`

**Interfaces:**

- Preserve `window.TeyesLeadCapture.capture(form, options)` and `persistAttribution()`.
- Add the same `pageJourney`, `whatsappClickJourney`, `whatsappClickPath`, and `whatsappClickCount` JSON fields used by the React client.

- [ ] **Step 1: Write the failing static-client tests.** Add a test that evaluates `public/lead-capture.js`, changes through two static-style paths, clicks a `wa.me` link, and asserts the event and form payload. Add a failure test that confirms journey state remains after a `500` response.

```ts
it("records the static-page journey and WA snapshot in the payload", async () => {
  renderForm();
  history.replaceState({}, "", "/android-car-stereo-oem-manufacturer/");
  window.eval(staticLeadClient);
  history.replaceState({}, "", "/android-car-stereo-oem-manufacturer/pricing");
  document.body.insertAdjacentHTML(
    "beforeend",
    '<a data-wa-location="oem_pricing" href="https://wa.me/123?text=ignored">WA</a>',
  );
  window.dataLayer = [];
  document.querySelector("a")!.dispatchEvent(
    new MouseEvent("click", { bubbles: true, cancelable: true }),
  );
  const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
  vi.stubGlobal("fetch", fetchMock);

  await client().capture(form(), options);

  const body = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
  expect(body).toMatchObject({
    pageJourney: "/android-car-stereo-oem-manufacturer/ > /android-car-stereo-oem-manufacturer/pricing",
    whatsappClickPath: "/android-car-stereo-oem-manufacturer/pricing",
    whatsappClickCount: 1,
  });
  expect(window.dataLayer).toContainEqual(expect.objectContaining({
    event: "whatsapp_click",
    destination_host: "wa.me",
    link_location: "oem_pricing",
  }));
});
```

- [ ] **Step 2: Run the static focused tests and verify RED.**

Run:

```powershell
npm test -- src/test/static-lead-client.test.ts
```

Expected: FAIL because the standalone script does not currently maintain a journey or emit `whatsapp_click`.

- [ ] **Step 3: Implement the standalone equivalent.** In `public/lead-capture.js`, add safe session helpers, the same two storage keys and 20-entry cap, initial-path recording, the capture-phase WhatsApp listener, and the same event field names. Guard installation with a window-level boolean (for example, `__teyesJourneyTrackingInstalled`) so repeated `window.eval(staticLeadClient)` calls do not add duplicate document listeners or reset the session state. When `capture()` builds its payload, read the snapshot and include the four optional fields. Remove both journey keys only after a successful response; preserve them on failure.

Add only explicit `data-wa-location` attributes to the actual WhatsApp anchors in the three static page entry files. Use stable values such as `oem_hero`, `wholesale_cta`, `distributor_hero`, and `thank_you_followup`; do not change the href, phone, message, form names, or visible copy.

- [ ] **Step 4: Run the full static test file and verify GREEN.**

Run:

```powershell
npm test -- src/test/static-lead-client.test.ts
```

Expected: PASS for all existing attribution tests and the new journey/WA tests.

- [ ] **Step 5: Commit the isolated task.**

```powershell
git add public/lead-capture.js public/android-car-stereo-oem-manufacturer/index.html public/android-car-stereo-wholesale/index.html public/teyes-android-car-stereo-distributor/index.html src/test/static-lead-client.test.ts
git commit -m "feat: track static page WhatsApp journeys"
```

---

### Task 4: Validate and render the new Zoho Description attribution

**Files:**
- Modify: `netlify/functions/create-zoho-lead.ts`
- Test: `src/test/create-zoho-lead.test.ts`

**Interfaces:**

- Extend the internal `LeadPayload` with optional normalized `pageJourney`, `whatsappClickJourney`, `whatsappClickPath`, and `whatsappClickCount` values.
- Keep the public endpoint method, origin validation, honeypot response, and Zoho field map unchanged.

- [ ] **Step 1: Write failing server tests.** Add a test that posts the four fields and expects the exact Description block. Add tests for 4,000-character truncation and for rejecting external/control-character journey values without adding an unsupported custom field.

```ts
it("writes the bounded journey and WA snapshot to standard Description", async () => {
  const fetchMock = mockZohoTokenAndCreate();
  await post({
    ...validPayload,
    pageJourney: "/ > /oem-odm/ > /oem-odm/cases/",
    whatsappClickJourney: "/ > /oem-odm/ > /oem-odm/cases/",
    whatsappClickPath: "/oem-odm/cases/",
    whatsappClickCount: 1,
  }, validEnv, fetchMock);

  const lead = JSON.parse(String(fetchMock.mock.calls[1][1]?.body)).data[0];
  expect(lead.Description).toContain(
    "Page Journey: / > /oem-odm/ > /oem-odm/cases/",
  );
  expect(lead.Description).toContain("WA Click Path: /oem-odm/cases/");
  expect(lead.Description).toContain("WA Click Count: 1");
  expect(lead).not.toHaveProperty("Form_Entry_Page");
});

it("drops external and control-character journey values", async () => {
  const fetchMock = mockZohoTokenAndCreate();
  await post({
    ...validPayload,
    pageJourney: "https://attacker.example\n > /contact/",
    whatsappClickPath: "//attacker.example/wa",
  }, validEnv, fetchMock);

  const lead = JSON.parse(String(fetchMock.mock.calls[1][1]?.body)).data[0];
  expect(lead.Description).not.toContain("attacker.example");
  expect(lead).not.toHaveProperty("Form_Entry_Page");
});
```

- [ ] **Step 2: Run the server test file and verify RED.**

Run:

```powershell
npm test -- src/test/create-zoho-lead.test.ts
```

Expected: FAIL because the handler ignores the optional journey fields and emits only the existing `Form Entry Page` suffix.

- [ ] **Step 3: Implement normalization and formatting.** Add explicit limits for the three journey strings and click count. Normalize a journey as a ` > `-separated list of same-origin relative paths, remove control characters, discard entries beginning with `//`, `http:`, or `https:`, trim to 20 entries, and return an empty value for invalid input. Clamp `whatsappClickCount` to a non-negative integer.

Format the suffix in this order, omitting empty lines:

```ts
const suffixLines = [
  entryPage ? `Form Entry Page: ${entryPage}` : "",
  pageJourney ? `Page Journey: ${pageJourney}` : "",
  whatsappClickJourney ? `WA Click Journey: ${whatsappClickJourney}` : "",
  whatsappClickPath ? `WA Click Path: ${whatsappClickPath}` : "",
  whatsappClickCount > 0 ? `WA Click Count: ${whatsappClickCount}` : "",
].filter(Boolean);
```

Keep `Description` at 4,000 characters by truncating the visitor message before appending the suffix. Keep the existing behavior exactly when no optional journey values are valid.

- [ ] **Step 4: Run the server tests and verify GREEN.**

Run:

```powershell
npm test -- src/test/create-zoho-lead.test.ts
```

Expected: PASS for new and existing Zoho security, attribution, truncation, and backward-compatibility tests.

- [ ] **Step 5: Commit the isolated task.**

```powershell
git add netlify/functions/create-zoho-lead.ts src/test/create-zoho-lead.test.ts
git commit -m "feat: append page journey to Zoho descriptions"
```

---

### Task 5: Run repository verification and prepare the GTM handoff

**Files:**
- Review: `src/test/tracking-contract.test.ts`
- No automatic GTM file change; use the external GTM workspace only after approval.

- [ ] **Step 1: Extend the static contract test only if needed.** If the existing contract test enumerates required static scripts/markers, add assertions for `data-wa-location` on the three static pages. Write the assertion first and verify it fails before changing the HTML.

- [ ] **Step 2: Run focused tests serially.**

```powershell
npm test -- src/lib/leadCapture.test.ts src/test/static-lead-client.test.ts src/test/create-zoho-lead.test.ts
```

Expected: all focused tests pass with no new errors.

- [ ] **Step 3: Run the full automated checks.**

```powershell
npm test -- --maxWorkers=1
npx tsc --noEmit
npm run lint
npm run build
```

Expected: tests, TypeScript, lint, and build exit successfully. Inspect `git status` after the build; preserve unrelated files and report any generated sitemap/build changes separately instead of using a destructive reset.

- [ ] **Step 4: Prepare the GTM configuration handoff.** Do not publish it in this task. The handoff must specify:

```text
Trigger: Custom Event = whatsapp_click
GA4 event name: whatsapp_click
Parameters: page_path, page_journey, wa_click_path, link_location, destination_host
```

The GTM operator must use Preview to confirm the event and then GA4 DebugView/Realtime to confirm receipt. Any GTM version or publication requires a new explicit approval.

- [ ] **Step 5: Commit any contract-test-only change.**

```powershell
git add src/test/tracking-contract.test.ts
git commit -m "test: cover WhatsApp attribution markers"
```

Skip this commit if no contract test change is needed.

---

### Task 6: Post-deploy evidence and live verification checkpoint

**Files:**
- No further source changes unless a test exposes a defect.

- [ ] **Step 1: Obtain separate approval for deployment and GTM publication.** The code branch, deployment, and GTM version remain distinct checkpoints. Do not submit a real or synthetic external form until the exact marker, destination, and purpose are stated and confirmed at action time.

- [ ] **Step 2: Verify a WA-only path without creating a CRM lead.** In Chrome, use a controlled test path and click the actual WA link once. Confirm the `whatsapp_click` event in GTM Preview/GA4 DebugView. Confirm the Zoho Leads list does not gain a test lead from that click alone. Do not send a WhatsApp message.

- [ ] **Step 3: Verify a form submission after a WA click.** With action-time confirmation, use one synthetic marker and a new test email. Navigate through multiple pages, click WA, return to the same tab, submit the website form once, then separately verify:

1. website success response;
2. GA4/GTM event receipt;
3. Zoho lead receipt;
4. Zoho `Description` contains `Page Journey`, `WA Click Journey`, `WA Click Path`, and the existing `Form Entry Page`.

- [ ] **Step 4: Verify one static lead page.** Repeat the same read-only/event and one approved synthetic-form checks on one static page. Do not submit additional leads if the first end-to-end receipt is sufficient.

- [ ] **Step 5: Report evidence boundaries.** State which of the following were actually observed: local tests, deployed route behavior, GTM Preview, GA4 DebugView, website response, Zoho receipt. Do not claim full visitor tracking or WhatsApp conversation visibility.

---

## Execution checkpoints

The design and implementation plan are separate from implementation approval. Before any Task 1 code edit, the user must choose one execution mode:

1. **Subagent-driven execution:** dispatch a fresh worker per task and review after each task.
2. **Inline execution:** execute this plan in the current isolated worktree with checkpoints.

Before production deployment, GTM publication, or any external form submission, request a separate action-time approval with the exact scope and synthetic data.
