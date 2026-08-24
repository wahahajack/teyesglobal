# Free Edition Final Fix Report

## Scope

- Worktree: `D:\Users\46679\Documents\GitHub\teyesglobal-form-entry-page`
- Starting HEAD: `449cbfd`
- Branch: `codex/zoho-form-entry-page`
- No Zoho access, deploy, merge, push, or production publication performed.

## Changes

- `src/lib/tracking.ts`
  - Expanded same-origin form-entry CTA targets from only `/contact/` to:
    - `/contact/`
    - `/android-car-stereo-oem-manufacturer/`
    - `/android-car-stereo-wholesale/`
    - `/teyes-android-car-stereo-distributor/`
  - Stored value remains the source page `pathname + search`; destination query is not stored.
  - Cross-origin destinations remain ignored by the origin check.
- `src/lib/leadCapture.test.ts`
  - Added table-driven coverage for every same-site static form target.
  - Test now simulates navigation after click so fallback cannot hide missing session persistence.
  - Existing Contact behavior remains covered.
- `src/test/create-zoho-lead.test.ts`
  - Corrected the 4000-character Description test name.
  - Strengthened external absolute, protocol-relative, malformed, and missing `formEntryPage` cases to assert:
    - `Description` equals the original visitor message.
    - no attribution block is present.
    - no `Form_Entry_Page` property is sent.
- `docs/superpowers/plans/2026-08-23-form-entry-page-attribution.md`
  - Added a superseded warning at the top.
  - Linked to `docs/superpowers/plans/2026-08-24-free-edition-form-entry-attribution.md`.
  - Explicitly warns not to execute custom-field or CRM schema steps from the old plan.

## RED Evidence

1. Initial focused run inside sandbox:
   - Command: `npm test -- src/lib/leadCapture.test.ts src/test/create-zoho-lead.test.ts`
   - Result: failed before tests due sandbox EPERM while Vitest tried to create `vitest.config.ts.timestamp-*.mjs`.

2. First external focused run after initial tests:
   - Command: `npm test -- src/lib/leadCapture.test.ts src/test/create-zoho-lead.test.ts`
   - Result: passed unexpectedly, revealing the new static-route test was only reading current-page fallback.
   - Action: corrected the test to simulate navigation to the destination after the CTA click.

3. Corrected RED run:
   - Command: `npm test -- src/lib/leadCapture.test.ts src/test/create-zoho-lead.test.ts`
   - Result: failed as intended.
   - Summary: `src/test/create-zoho-lead.test.ts` passed 14 tests; `src/lib/leadCapture.test.ts` had 3 failures.
   - Failed routes:
     - `/android-car-stereo-oem-manufacturer/`
     - `/android-car-stereo-wholesale/`
     - `/teyes-android-car-stereo-distributor/`
   - Root cause shown by failures: old tracking only persisted source page for `/contact/`, so after simulated navigation `getFormEntryPage()` fell back to the destination path.

## GREEN Evidence

- Command: `npm test -- src/lib/leadCapture.test.ts src/test/create-zoho-lead.test.ts`
- Result: passed.
- Summary: 2 test files passed, 26 tests passed.

## Full Verification

- Command: `npx tsc --noEmit`
  - Result: passed, exit 0.
- Command: `npm test`
  - Result: passed, exit 0.
  - Summary: 11 test files passed, 64 tests passed.
- Command: `npm run lint`
  - Result: passed, exit 0.
  - Notes: 7 existing `react-refresh/only-export-components` warnings in UI component files; 0 errors.
- Command: `git diff --check`
  - Result: passed, exit 0.
  - Notes: Git reported LF-to-CRLF working-copy warnings for touched files; no whitespace errors.

## Commit

- Commit created with message: `Fix free edition form entry attribution`.
- Initial commit hash before this report status update: `8f0f72c`.
- Final delivered commit is the repository `HEAD` after amending this report status into the same commit.

## Concerns

- The first version of the static-route test was too weak and passed against old behavior; this was corrected before implementation.
- No live lead submission, Zoho field verification, deploy, push, or publish was performed.
