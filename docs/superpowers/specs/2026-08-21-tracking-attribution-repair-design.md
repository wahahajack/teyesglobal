# TEYES Global GTM Preview and Lead Attribution Repair

## Goal

Repair two related but independently reversible tracking problems:

1. Make GTM Preview/Tag Assistant load immediately without changing the normal-traffic performance delay.
2. Preserve Google Ads and campaign attribution long enough for returning visitors to submit a Zoho Lead with usable source data.

The work must not publish GTM, deploy the website, modify Google Ads, create Zoho test records, or overwrite the dirty primary checkout.

## Baseline

- The isolated branch starts from `e451f8d`.
- The committed `verify:gtm` script expects Preview to load immediately, but the committed `tracking.ts` does not yet implement that behavior.
- The primary checkout contains uncommitted work and must remain unchanged.
- Zoho Leads accept `Google_Click_ID`, `GBRAID`, `WBRAID`, UTM fields, `Initial_Landing_Page`, and `Initial_Referrer`.
- Recent Zoho Leads show that these fields are usually empty, while a controlled production-browser visit proves current code captures them within one browser session.
- Current attribution storage is `sessionStorage`, so attribution is lost across new tabs or browser sessions.

## Design

### Commit 1: GTM Preview reliability

- Add a small Preview URL detector for `gtm_debug`, `gtm_auth`, and `gtm_preview`.
- Load GTM immediately only when one of those parameters is present.
- Preserve the latest intended normal-traffic behavior from the August 21
  implementation and committed browser guard:
  - load immediately on user interaction;
  - otherwise load after a 4000 ms delay;
  - inject GTM at most once.
- Align the unit test, implementation, and `verify:gtm` browser guard on the
  same 4000 ms normal delay.

This commit must not change attribution storage or Zoho payloads.

### Commit 2: durable lead attribution

- Preserve the current `sessionStorage` behavior for same-session compatibility.
- Add a first-party `localStorage` fallback with a 90-day expiry for:
  - `gclid`, `gbraid`, `wbraid`;
  - the five UTM parameters;
  - `fbclid`;
  - first landing page and first referrer.
- On every page load:
  - capture the first landing page even when no ad parameter exists;
  - capture the first referrer when present;
  - update stored click/UTM parameters only when the current URL contains a non-empty value;
  - do not replace the original landing page with later pages.
- When building a Zoho Lead payload, read the current session value first and then the unexpired durable value.
- Expired or malformed durable data must be ignored without breaking page rendering or form submission.
- Keep the Zoho field mapping and `/api/zoho-lead` request contract unchanged.

No new CRM fields, tracking abstractions, third-party libraries, cookies, or server-side sessions are introduced.

## Data flow

```text
First visit URL
  -> capture click and UTM parameters
  -> store same-session values
  -> store durable values with expiry
  -> preserve first landing page/referrer

Later visit or form submission
  -> read session value
  -> fall back to unexpired durable value
  -> build existing Zoho attribution payload
  -> existing Netlify function maps values to existing Zoho fields
```

## Privacy and safety

- Store only click identifiers, UTM values, landing URL, referrer, and an expiry timestamp.
- Do not store names, emails, phone numbers, messages, credentials, or Zoho record IDs.
- Storage failures remain non-fatal.
- This code change does not replace a future Consent Mode/privacy-policy review.
- No live form submission or CRM mutation is part of verification without separate approval.

## Test strategy

### GTM Preview tests

- Preview URL loads GTM immediately.
- Normal traffic does not load before 4000 ms and loads at 4000 ms.
- Interaction loads GTM before the idle timeout.
- Repeated triggers inject GTM only once.

### Attribution tests

- A first visit with GCLID and UTM values writes session and durable attribution.
- A later session with empty `sessionStorage` reads unexpired durable attribution.
- Expired durable attribution is ignored.
- A later page cannot overwrite the first landing page.
- A direct or organic first visit records its landing page and referrer.
- Storage exceptions do not break attribution building.
- Existing Zoho payload and static landing-page contracts remain green.

## Acceptance criteria

- Two independent implementation commits follow this design.
- The primary checkout's dirty files are unchanged.
- Full Vitest suite passes with a stable worker configuration.
- Lint passes without new errors.
- Production build succeeds.
- `npm run verify:gtm` passes for idle, interaction, and Preview paths.
- A browser-only fake-GCLID test confirms attribution survives navigation and a fresh browser tab/session without submitting a Lead.
- `git diff --check` passes.
- No deploy, push, PR, GTM publish, Google Ads mutation, or Zoho record creation occurs without separate approval.
