# Final review fix report: bounded client journey attribution

Date: 2026-08-24

## Scope

Applied the final-review fixes for the Page Journey/WhatsApp attribution branch. Production GTM configuration, marker destinations, server limits, existing form behavior, and Zoho lead creation were not changed. The pre-existing uncommitted `public/sitemap.xml` was left untouched and is not part of the fix commit.

## Implementation

- Added matching client budgets in `src/lib/tracking.ts` and `public/lead-capture.js`: `pageJourney` and `whatsappClickJourney` are capped at 1,024 characters; `whatsappClickPath` is capped at 255 characters.
- Budgeting retains complete origin-relative route entries and drops entries that do not fit; it never slices a route into an invalid fragment. Oversized current paths are omitted from the WhatsApp snapshot, so they cannot make the keepalive payload exceed the server contract.
- Applied bounds both when writing session storage and again when reading/serializing form payloads, including previously stored malformed/oversized values.
- Added focused acceptance/security coverage for 21+ routes and budgets, popstate route recording, all four WhatsApp destination forms, non-WhatsApp rejection, unavailable storage, exact approved `whatsapp_click` fields, and keepalive serialization limits. Test URLs use synthetic placeholders and assertions reject href/phone/message/query leakage.
- Added `preventDefault()` to static WA test links to remove jsdom navigation noise. The production static installation guard remains idempotent; no test-only production API or duplicate listener mechanism was added.

## TDD evidence

- React RED: `npm test -- src/lib/leadCapture.test.ts` failed on the new limits (`1351 > 1024`; `302 > 255`).
- Static RED: `npm test -- src/test/static-lead-client.test.ts` failed on the new limits (`1331 > 1024`; `302 > 255`).
- After implementation, both focused suites passed.

## Verification

- `npm test -- src/lib/leadCapture.test.ts` — 31/31 passed.
- `npm test -- src/test/static-lead-client.test.ts` — 17/17 passed.
- `npm test -- src/test/create-zoho-lead.test.ts` — 18/18 passed.
- `npm test -- src/lib/leadCapture.test.ts src/test/static-lead-client.test.ts src/test/create-zoho-lead.test.ts` — 66/66 passed.
- `npm test` — 105/105 passed across 12 test files.
- `npm run build:dev` — completed successfully. Vite emitted only the existing stale Browserslist data notice.
- `npm run lint` — exit 0; 0 errors and 7 pre-existing Fast Refresh warnings in `src/components/ui/*`.
- `git diff --check` — passed.

## Concerns / evidence boundary

These checks establish local code, test, and development-build behavior only. No GTM Preview, production deployment, GA4 DebugView, external form submission, or Zoho receipt was performed.

## Final review follow-up

- TDD RED: after changing both React and static tests to expect the safe `whatsapp` protocol constant, each focused suite failed only for the previous `destination_host: "send"` result.
- TDD GREEN: `npm test -- src/lib/leadCapture.test.ts` passed 31/31 and `npm test -- src/test/static-lead-client.test.ts` passed 17/17.
- For `whatsapp:` links, both clients now emit `destination_host: "whatsapp"`; HTTPS events continue to emit only the allowlisted WhatsApp host. Protocol URLs cannot leak a phone-like or arbitrary hostname.
- Removed the two Markdown trailing-space instances in the design document. Post-commit `git diff --check 6871c0d..HEAD` passed.
