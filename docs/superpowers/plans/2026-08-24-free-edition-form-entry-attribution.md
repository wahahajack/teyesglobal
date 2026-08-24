# Free-Edition Form Entry Attribution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Store a form's same-site entry page in the existing Zoho Lead `Description` field without requiring a custom field.

**Architecture:** The browser clients continue sending `formEntryPage`, and the Netlify handler remains the trust boundary that reduces it to a same-origin path and query string. The handler appends a labeled attribution block to the visitor's message and sends that combined value through the standard `Description` API property; no client payload, CRM schema, or ad-attribution mapping changes are required.

**Tech Stack:** TypeScript, Netlify Functions, Vitest, Zoho CRM v2 Leads API.

## Global Constraints

- Do not create, require, or send the unavailable `Form_Entry_Page` custom field.
- Preserve `Inquiry_Type`, `Lead_Form`, `Initial_Landing_Page`, GCLID, GBRAID, WBRAID, UTM fields, and all existing Zoho error handling.
- Keep the trusted entry-page value same-origin, path-and-query only, and capped at 255 characters.
- Preserve the visitor's message first; append exactly `---\nAttribution\nForm Entry Page: <path-and-query>` only for a valid entry page.
- Keep the complete Zoho `Description` at or below 4,000 characters, prioritizing the attribution block if truncation is necessary.
- Do not merge, deploy, or submit a live lead as part of this implementation.

---

### Task 1: Map the trusted entry page into the standard Description field

**Files:**
- Modify: `src/test/create-zoho-lead.test.ts:32-71`
- Modify: `netlify/functions/create-zoho-lead.ts:9-70`

**Interfaces:**
- Consumes: `LeadPayload.message: string` and `LeadPayload.formEntryPage: string`, where `formEntryPage` is already normalized by `formEntryPage(value, origin)`.
- Produces: `toZohoLead(payload).Description: string`, containing the visitor message plus the attribution block when `formEntryPage` is non-empty.

- [ ] **Step 1: Write the failing server tests**

Replace the existing `Form_Entry_Page` assertions with a test that verifies the standard API object has no `Form_Entry_Page` property and has the exact description below:

```ts
expect(lead).toMatchObject({
  Description: "Please send distributor terms.\n\n---\nAttribution\nForm Entry Page: /products/cc4-pro/?source=test",
  Initial_Landing_Page: "https://deploy-preview.example.netlify.app/?gclid=gclid-123",
});
expect(lead).not.toHaveProperty("Form_Entry_Page");
```

Add a test with a 4,000-character message and a valid entry page. Assert `Description.length === 4000`, `Description.endsWith("---\\nAttribution\\nForm Entry Page: /contact/")`, and the attribution block remains intact. Add an external-entry-page test that asserts `Description === validPayload.message` and still has no `Form_Entry_Page` property.

- [ ] **Step 2: Run the focused test file and verify it fails for the intended mapping**

Run:

```powershell
npm test -- src/test/create-zoho-lead.test.ts
```

Expected: FAIL because the handler still maps `formEntryPage` to `Form_Entry_Page` and leaves `Description` equal to only the visitor message.

- [ ] **Step 3: Implement the minimal Description formatter and replace the unsupported mapping**

In `netlify/functions/create-zoho-lead.ts`, remove `formEntryPage: "Form_Entry_Page"` from `ZOHO_FIELDS`. Add a private formatter adjacent to `formEntryPage`:

```ts
const description = (message: string, entryPage: string) => {
  if (!entryPage) return message;
  const suffix = `---\nAttribution\nForm Entry Page: ${entryPage}`;
  const separator = message ? "\n\n" : "";
  return `${message.slice(0, LIMITS.message - separator.length - suffix.length)}${separator}${suffix}`;
};
```

Then set `Description: description(payload.message, payload.formEntryPage)` in `toZohoLead`, and remove the computed `[ZOHO_FIELDS.formEntryPage]` property. Keep validation and same-origin normalization unchanged.

- [ ] **Step 4: Run focused tests and verify they pass**

Run:

```powershell
npm test -- src/test/create-zoho-lead.test.ts
```

Expected: PASS, including the mapping, invalid-entry-page, and 4,000-character boundary cases.

- [ ] **Step 5: Run regression checks**

Run:

```powershell
npx tsc --noEmit
npm test
npm run lint
```

Expected: type check and all tests pass; lint has no errors. Record any pre-existing warnings without changing unrelated files.

- [ ] **Step 6: Commit the implementation**

```powershell
git add netlify/functions/create-zoho-lead.ts src/test/create-zoho-lead.test.ts
git commit -m "fix: store form entry page in lead description"
```

### Task 2: Verify build output and preserve the clean isolated worktree

**Files:**
- Verify: `dist/android-car-stereo-oem-manufacturer/index.html`
- Verify: `dist/android-car-stereo-wholesale/index.html`
- Verify: `dist/teyes-android-car-stereo-distributor/index.html`
- Restore if generated: `public/sitemap.xml`

**Interfaces:**
- Consumes: the Task 1 handler change and existing static-form client scripts.
- Produces: a production build whose three static lead pages still reference `/lead-capture.js` and no uncommitted generated sitemap change.

- [ ] **Step 1: Build the site**

Run:

```powershell
npm run build
```

Expected: Vite build, prerender, asset pruning, and the 23-route SEO distribution verifier all succeed.

- [ ] **Step 2: Verify static lead-script inclusion**

Run:

```powershell
rg -l -F '/lead-capture.js' dist
```

Expected: exactly the OEM manufacturer, wholesale, and distributor static lead pages are listed.

- [ ] **Step 3: Restore only the generated sitemap timestamp if changed and confirm cleanliness**

If `git diff -- public/sitemap.xml` shows only generated `<lastmod>` changes, restore that one file. Then run:

```powershell
git diff --check
git status --short
```

Expected: no whitespace errors and no uncommitted changes.

