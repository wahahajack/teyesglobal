# Form Entry Page Attribution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Store the same-site page that led a visitor into a submitted form without changing the visitor-selected inquiry type, existing form source, or paid-attribution data.

**Architecture:** Add a session-scoped form-entry-page value to the shared tracking client. A document-level same-site Contact-link listener records the current path before SPA navigation; React and static lead clients send that value with each lead and clear it only after a successful Zoho response. The Netlify function writes it to the dedicated Zoho `Form_Entry_Page` field.

**Tech Stack:** React 18, React Router 6, TypeScript, Vitest 3, browser-native sessionStorage, static JavaScript lead client, Netlify Functions, Zoho CRM v2 API.

## Global Constraints

- `Inquiry_Type` remains a visitor-controlled form value; do not prefill it from `intent`.
- `Lead_Form` remains one of the existing source values.
- `Initial_Landing_Page`, GCLID, GBRAID, WBRAID, UTM values, and referrer retain their existing meanings.
- Store only a same-origin path and query string of at most 255 characters in `Form_Entry_Page`; do not store external referrers or personal data.
- Do not deploy, publish, or change Zoho schema without a separate explicit approval.

---

### Task 1: Capture and consume the Contact entry page in the shared client

**Files:**
- Modify: `src/lib/tracking.ts`
- Modify: `src/lib/leadCapture.ts`
- Modify: `src/main.tsx`
- Modify: `src/lib/leadCapture.test.ts`

**Interfaces:**
- Produces from `tracking.ts`: `installContactEntryTracking(): void`, `getFormEntryPage(): string`, and `clearFormEntryPage(): void`.
- Consumes in `leadCapture.ts`: `getFormEntryPage()` to populate `LeadCapturePayload.formEntryPage` and `clearFormEntryPage()` after a successful `POST /api/zoho-lead` response.

- [ ] **Step 1: Write failing tracking tests**

Add tests in `src/lib/leadCapture.test.ts` that dispatch a click on `<a href="/contact/?intent=oem">` while the current route is `/products/cc4-pro/?source=test`, then expect `getFormEntryPage()` to return `/products/cc4-pro/?source=test`. Add a second test that, with no recorded CTA, expects `getFormEntryPage()` to return the current `/contact/?intent=oem` path and query string.

```ts
it("records the current page before a same-site Contact navigation", () => {
  history.replaceState({}, "", "/products/cc4-pro/?source=test");
  installContactEntryTracking();
  document.body.innerHTML = '<a href="/contact/?intent=oem">Contact</a>';
  document.querySelector("a")!.dispatchEvent(new MouseEvent("click", { bubbles: true }));

  expect(getFormEntryPage()).toBe("/products/cc4-pro/?source=test");
});
```

- [ ] **Step 2: Run the focused tests and confirm RED**

Run: `npm test -- src/lib/leadCapture.test.ts`

Expected: the new tests fail because the form-entry tracking exports do not exist.

- [ ] **Step 3: Implement the minimal session-scoped tracking API**

In `src/lib/tracking.ts`, add a private `FORM_ENTRY_PAGE_KEY = "form_entry_page"`; normalize paths with `window.location.pathname + window.location.search`; add a document click listener that finds `event.target.closest("a[href]")`, resolves the href against `window.location.origin`, and writes the current path only when the destination pathname is `/contact/` and has the same origin. Make installation idempotent. Add `getFormEntryPage()` with current-path fallback and `clearFormEntryPage()`.

In `src/main.tsx`, call `installContactEntryTracking()` once after `persistAdParams()`.

In `src/lib/leadCapture.ts`, add `formEntryPage: string` to `LeadCapturePayload`, populate it with `getFormEntryPage()` at submission time, and call `clearFormEntryPage()` only after `response.ok` in `submitZohoLead`.

- [ ] **Step 4: Run focused tests and confirm GREEN**

Run: `npm test -- src/lib/leadCapture.test.ts`

Expected: all tests in the file pass, including the new CTA and direct-entry assertions.

- [ ] **Step 5: Commit the client attribution change**

```bash
git add src/lib/tracking.ts src/lib/leadCapture.ts src/main.tsx src/lib/leadCapture.test.ts
git commit -m "feat: capture form entry page"
```

### Task 2: Send form-entry attribution from the static lead client

**Files:**
- Modify: `public/lead-capture.js`
- Modify: `src/test/static-lead-client.test.ts`

**Interfaces:**
- Consumes: the `form_entry_page` session-storage key written by the shared Contact-link listener when present.
- Produces: a `formEntryPage` property in static lead payloads, using the static form page path and query string as the fallback.

- [ ] **Step 1: Write the failing static-client test**

In `src/test/static-lead-client.test.ts`, set `sessionStorage.setItem("form_entry_page", "/products/cc4-pro/")`, call `capture`, and assert the posted JSON includes `formEntryPage: "/products/cc4-pro/"`. Add a direct-form assertion that no storage value produces the current page path.

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `npm test -- src/test/static-lead-client.test.ts`

Expected: the assertions fail because static payloads do not include `formEntryPage`.

- [ ] **Step 3: Implement the minimal static payload behavior**

In `public/lead-capture.js`, add a `currentPath()` helper returning `window.location.pathname + window.location.search`. Add `formEntryPage: readStorage("form_entry_page") || currentPath()` to the payload. In the successful `response.ok` branch, remove `form_entry_page` from session storage through a guarded helper; retain it on failure.

- [ ] **Step 4: Run the focused test and confirm GREEN**

Run: `npm test -- src/test/static-lead-client.test.ts`

Expected: all static lead-client tests pass.

- [ ] **Step 5: Commit the static lead-client change**

```bash
git add public/lead-capture.js src/test/static-lead-client.test.ts
git commit -m "feat: include entry page in static leads"
```

### Task 3: Map the new payload field to Zoho without changing existing attribution fields

**Files:**
- Modify: `netlify/functions/create-zoho-lead.ts`
- Modify: `src/test/create-zoho-lead.test.ts`

**Interfaces:**
- Consumes: optional `formEntryPage: string` in the client payload.
- Produces: `Form_Entry_Page` in the Zoho record, while leaving `Initial_Landing_Page` mapped from `attribution.landing_page`.

- [ ] **Step 1: Write the failing Netlify handler test**

Extend `validPayload` in `src/test/create-zoho-lead.test.ts` with `formEntryPage: "/products/cc4-pro/?source=test"`. In the Zoho mapping assertion, require both fields independently:

```ts
expect(JSON.parse(String(fetchMock.mock.calls[1][1]?.body)).data[0]).toMatchObject({
  Form_Entry_Page: "/products/cc4-pro/?source=test",
  Initial_Landing_Page: "https://deploy-preview.example.netlify.app/?gclid=gclid-123",
});
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `npm test -- src/test/create-zoho-lead.test.ts`

Expected: the mapping assertion fails because `Form_Entry_Page` is absent.

- [ ] **Step 3: Implement minimal server mapping**

Add `formEntryPage: "Form_Entry_Page"` to `ZOHO_FIELDS`. Add a dedicated 255-character `formEntryPage` limit to `LIMITS`, normalize it to a same-origin path and query string, and map it to `[ZOHO_FIELDS.formEntryPage]` in `toZohoLead`. Do not alter the `Initial_Landing_Page` mapping.

- [ ] **Step 4: Run the focused test and confirm GREEN**

Run: `npm test -- src/test/create-zoho-lead.test.ts`

Expected: all handler tests pass and prove independent values for entry page and initial landing page.

- [ ] **Step 5: Commit the Zoho mapping change**

```bash
git add netlify/functions/create-zoho-lead.ts src/test/create-zoho-lead.test.ts
git commit -m "feat: map form entry page to Zoho"
```

### Task 4: Verify the complete change before any external schema or deployment action

**Files:**
- Test: `src/lib/leadCapture.test.ts`
- Test: `src/test/static-lead-client.test.ts`
- Test: `src/test/create-zoho-lead.test.ts`
- Test: `src/test/contact-lead-contract.test.ts`
- Test: `src/test/tracking-contract.test.ts`

**Interfaces:**
- Verifies the completed client and server payload contract; it does not create a Zoho field, submit a lead, merge, or deploy.

- [ ] **Step 1: Run the full automated suite**

Run: `npm test`

Expected: all Vitest tests pass.

- [ ] **Step 2: Run static checks and production build**

Run: `npm run lint`

Expected: exit code 0; report pre-existing warnings separately if present.

Run: `npm run build`

Expected: exit code 0 and generated static lead pages retain `/lead-capture.js`.

- [ ] **Step 3: Inspect the diff and commit verification-only documentation if needed**

Run: `git diff --check` and `git status --short`

Expected: no whitespace errors and only the planned source/test changes.

- [ ] **Step 4: Request the separate action-time approvals**

Before any Zoho UI change, ask for approval to create the `Form_Entry_Page` Lead field. Before any Preview or production form submission, ask for approval to send a named synthetic test lead. Before merge or deployment, ask for an explicit publish/merge approval.
