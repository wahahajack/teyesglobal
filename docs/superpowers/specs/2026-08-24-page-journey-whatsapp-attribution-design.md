# Page Journey and WhatsApp Attribution Design

**Date:** 2026-08-24
**Status:** Design only; no production code, GTM container, or deployment changes are included in this document.
**Scope:** TEYES React SPA, existing static lead pages, Netlify Zoho lead endpoint, and the GTM/GA4 handoff.

## Goal

Record a best-effort, privacy-safe page journey for each web form submission and capture the journey immediately before a WhatsApp click. Store the information in the existing Zoho Lead `Description` field, without requiring Zoho custom fields or creating empty CRM leads for visitors who only click WhatsApp.

## Current context

- The React site currently stores initial attribution and the last form-entry page, but not the full sequence of visited pages.
- The React site has a mobile WhatsApp floating link and a Contact-page WhatsApp link.
- Three existing static lead pages load `public/lead-capture.js` and have their own WhatsApp links and form scripts.
- The Netlify endpoint already appends `Form Entry Page` to the standard Zoho `Description` field and does not depend on a custom Zoho field.
- GTM is a separate publication surface. A `dataLayer` event in code is not considered a GA4 result until a GTM/GA4 tag receives it and DebugView or Realtime confirms it.

## Decisions

1. **No empty Zoho leads.** A WhatsApp-only visit does not have a reliable name, email, or company, so it produces a GA4/GTM event only. A Zoho record is created only by an existing website form submission.
2. **Use standard `Description`.** Journey data is appended as text to the existing field; no Zoho custom field or custom form is required.
3. **Keep the latest WhatsApp snapshot.** If a visitor clicks WhatsApp multiple times, keep the latest complete journey and click path for the eventual form submission, plus a small click count. This bounds description size and associates the snapshot with the most recent action.
4. **Record route paths, not sensitive URLs.** Journey entries use origin-relative paths. Query strings are omitted from the journey; the existing form-entry attribution remains responsible for the current trusted path/query representation. No phone number, message text, email, or arbitrary external URL is stored in journey data.
5. **Best-effort collection.** Storage failures, consent decisions, blockers, disabled JavaScript, early exits before tags load, and navigation to WhatsApp can create gaps. The feature must never block navigation or form submission.

## User-visible Zoho format

For a form submitted after a WhatsApp click, the existing message remains first, followed by an attribution block such as:

```text
<visitor message>

---
Attribution
Form Entry Page: /contact/?intent=oem
Page Journey: / > /oem-odm/ > /oem-odm/capabilities/ > /oem-odm/cases/ > /contact/
WA Click Journey: / > /oem-odm/ > /oem-odm/capabilities/ > /oem-odm/cases/
WA Click Path: /oem-odm/cases/
WA Click Count: 1
```

If no WhatsApp click occurred, omit the `WA` lines. If no journey is available because storage is unavailable, keep the existing form-entry behavior and omit the unavailable fields. The generated description must remain within the existing 4,000-character limit; the visitor message is truncated first so the attribution block is retained.

## Architecture and data flow

### 1. Shared journey state

The React tracker and the standalone static-page tracker use the same conceptual state, with separate implementation files because `public/lead-capture.js` is a browser-ready script and cannot import TypeScript modules.

Session-scoped keys:

- `teyes_page_journey_v1`: a JSON array of normalized relative paths, capped at 20 entries, with consecutive duplicates removed.
- `teyes_last_whatsapp_click_v1`: a JSON object containing the latest snapshot, click path, click location, and click count.

The initial route is recorded on script startup. For the React SPA, `history.pushState`, `history.replaceState`, and `popstate` are observed so browser-router navigations append a route. Static pages record their current path on load; a full navigation naturally starts the next page and carries the session state forward.

### 2. WhatsApp click capture

A document-level capture-phase click listener identifies anchors whose destination is one of:

- `wa.me`
- `api.whatsapp.com`
- `web.whatsapp.com`
- the `whatsapp:` protocol

Before the browser follows the link, the listener snapshots the current journey and current path, increments the click count, and pushes this event into `window.dataLayer`:

```js
{
  event: "whatsapp_click",
  page_path: "/oem-odm/cases/",
  page_journey: "/ > /oem-odm/ > /oem-odm/capabilities/ > /oem-odm/cases/",
  wa_click_path: "/oem-odm/cases/",
  link_location: "whatsapp_float",
  destination_host: "wa.me"
}
```

`link_location` is supplied by explicit `data-wa-location` attributes on known React and static links. Unknown links use `unknown`, never a selector or arbitrary URL. The tracker calls the existing immediate GTM loader after pushing the event, while still allowing the click to proceed normally.

### 3. Form submission handoff

The React `submitZohoLead` path and standalone `TeyesLeadCapture.capture` path read the journey state when a form is submitted. They add relative, length-bounded `pageJourney`, `whatsappClickJourney`, `whatsappClickPath`, and `whatsappClickCount` values to the API payload. On a successful `201` response, both journey keys are cleared. On failure, they remain so a user retry does not silently lose the attribution.

### 4. Netlify and Zoho mapping

`netlify/functions/create-zoho-lead.ts` validates the new values as relative route lists, removes control characters and unsupported URL forms, bounds their length, and formats the attribution block. It writes only `Description`; it must not add an unsupported `Form_Entry_Page` or other custom field to the Zoho API request.

Existing payloads without the new optional fields remain valid and produce the current description format. The endpoint continues to reject external origins, invalid lead payloads, and oversized/untrusted values.

### 5. GA4/GTM handoff

The code change creates the `whatsapp_click` data-layer contract. A separate GTM change must:

1. create a Custom Event trigger named `whatsapp_click`;
2. create or update the GA4 Event tag with parameters `page_path`, `page_journey`, `wa_click_path`, `link_location`, and `destination_host`;
3. validate in GTM Preview and GA4 DebugView/Realtime;
4. publish as a separately identified GTM version only after explicit approval.

No code-side event is described as “tracked in GA4” until the tag and DebugView evidence exist.

## Files and responsibilities

### React application

- `src/lib/tracking.ts`: journey state, route observation, WhatsApp link classification, data-layer event dispatch, and safe storage helpers.
- `src/lib/leadCapture.ts`: include the journey snapshot in the Zoho payload and clear it only after success.
- `src/components/common/WhatsAppFloat.tsx`: add an explicit `data-wa-location` marker to the floating link.
- `src/pages/Contact.tsx`: add an explicit marker to the Contact-page WhatsApp link; preserve existing email and form behavior.
- `src/main.tsx`: initialize the journey tracker once before React renders.

### Static pages

- `public/lead-capture.js`: standalone equivalent of journey state, WA capture, payload fields, and post-success cleanup.
- Existing static page HTML/JS files: add explicit location markers to their actual WhatsApp anchors only; preserve form submission and existing `dataLayer` events.

### Server and tests

- `netlify/functions/create-zoho-lead.ts`: normalize optional journey fields and append them to `Description` within the existing limit.
- `src/lib/leadCapture.test.ts`: React journey and payload behavior.
- `src/test/static-lead-client.test.ts`: standalone script journey behavior.
- `src/test/create-zoho-lead.test.ts`: server normalization, formatting, truncation, backward compatibility, and rejection of untrusted values.
- A focused tracking contract test may be extended to ensure all in-scope static pages keep the shared script and WA markers.

## Error handling and privacy boundaries

- `sessionStorage` failures fall back to the current path for the event/form and never throw into the UI.
- Journey strings are limited to 20 routes and a fixed byte/character budget before they reach the API.
- Only same-origin relative paths are accepted by the server; protocol-relative, external, malformed, and control-character values are discarded.
- WhatsApp destination query strings, phone numbers, and message text are not written to GA4 parameters, session storage, or Zoho Description.
- No click event creates an empty CRM lead.
- No attempt is made to read WhatsApp content, delivery state, or replies.

## Verification plan

### Automated tests

Follow red-green-refactor for each behavior:

1. initial path and route transitions produce an ordered, de-duplicated list;
2. back/forward transitions and repeated routes remain bounded;
3. all four WhatsApp destination forms are recognized, non-WhatsApp links are ignored, and capture occurs before navigation;
4. the `whatsapp_click` data-layer payload excludes phone/query data;
5. form payloads include the latest journey snapshot and clear it only after a successful response;
6. static capture and React capture use the same field names;
7. the Netlify handler preserves old payload behavior, formats the new block, retains it under the 4,000-character limit, and rejects untrusted journey values.

### Browser and live checks

After code deployment and separate GTM approval:

1. Use a synthetic test session to navigate through several React routes and click a WA link once. Confirm the `whatsapp_click` event in GTM Preview/GA4 DebugView without sending a CRM lead.
2. Return to the same tab, submit one explicitly approved synthetic website form, and verify the Zoho Description contains `Page Journey`, `WA Click Journey`, and `WA Click Path`.
3. Repeat on one static lead page to prove the standalone script contract.
4. Confirm that a WA-only click creates no Zoho Lead.
5. Verify website response, GA4 event receipt, and Zoho receipt separately; do not infer one from another.

## Non-goals and known limits

- Complete recording of every visitor is impossible; GA4 remains best-effort event collection, not a browser recording.
- WhatsApp conversations and post-click behavior outside the website are not observable.
- Historical Zoho leads cannot be backfilled with a path that was never stored.
- Cross-device identity is not added by this feature.
- No GTM publication, Google Ads conversion change, or CRM schema change is part of the code implementation.

## Acceptance criteria

- A new form lead with a prior WA click shows the complete bounded journey and the path immediately before the latest WA click in the standard Zoho `Description` field.
- A new form lead without a WA click retains the current attribution format and does not show empty WA lines.
- A WA-only visit produces a `whatsapp_click` data-layer event when tags can receive it and creates no Zoho lead.
- The same behavior works for the React SPA and the three existing static lead pages.
- Existing form payloads, inquiry types, entry-page attribution, and success/failure behavior remain compatible.
- Automated tests, TypeScript, lint, build, GTM Preview, GA4 DebugView, website response, and Zoho receipt are reported as separate evidence.
