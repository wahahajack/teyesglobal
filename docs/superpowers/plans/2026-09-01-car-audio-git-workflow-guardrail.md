# TEYES Car Audio — Git Workflow Guardrail

**Status:** Mandatory implementation rule  
**Date:** 2026-09-01  
**Applies to:** `docs/superpowers/plans/2026-09-01-car-audio-product-line-integration.md`

This file is a mandatory companion to the Car Audio integration plan. Any future coding session, agent, or conversation implementing that plan must read both documents before changing production code.

## Hard rule

The approved implementation plan may live on `main`, but **actual implementation code must NOT be developed directly on `main`**.

All Car Audio implementation work must use this workflow:

1. Start from the latest `main`.
2. Create a dedicated feature branch before changing application code, tracking code, routes, sitemap generation, styles, assets, tests, or build configuration.
3. Recommended branch name: `feature/car-audio-product-line` (or another clearly scoped Car Audio branch if that name already exists).
4. Make all implementation commits on that branch.
5. Run the full required validation suite on the branch, including build, prerender/SEO verification, route/sitemap checks, tracking tests, and regression checks for protected indexed URLs and existing Ads landing pages.
6. Deploy and inspect a Netlify preview before merge when preview deployment is available.
7. Review the diff against `main` and confirm that no unrelated files, indexed URL changes, canonical changes, Ads landing-page rewrites, conversion IDs/labels, or generated noise are accidentally included.
8. Open a pull request from the feature branch into `main`.
9. Do not merge until the implementation and preview are confirmed to be correct.
10. Merge to `main` only after the review gates pass.
11. After production deployment, run the post-deploy smoke tests and monitoring defined in the main Car Audio integration plan.
12. If a material regression is found, use the documented rollback path rather than making unreviewed emergency changes directly on `main` unless an actual production emergency requires it.

## Merge gates

The PR must not be merged until all applicable checks pass:

- Existing protected URLs remain unchanged.
- Existing canonical targets remain unchanged.
- `/products/` remains focused on Android head units.
- `/accessories/` is not repurposed for the Car Audio range.
- New `/car-audio/` canonical and trailing-slash behavior are correct.
- New route is included in prerender/static route verification and sitemap generation.
- Existing Google Ads Final URLs are unchanged.
- Existing paid landing-page core content is not materially rewritten.
- Existing GTM / GA4 / Google Ads conversion IDs and labels are unchanged.
- Attribution parameters such as GCLID / GBRAID / WBRAID / UTMs are preserved through the Car Audio inquiry path.
- Car Audio inquiry conversion tracking works only on successful submission.
- Page journey / WhatsApp / form tracking continues to work without duplicate firing.
- Car Audio product-interest attribution is preserved into the lead/CRM flow when implemented.
- Build, tests, SEO verification, and preview smoke tests pass.
- Diff contains no unrelated or generated changes that should not be committed.

## Instruction for future AI/coding sessions

Before implementation, use this sequence:

```text
1. Read docs/superpowers/plans/2026-09-01-car-audio-product-line-integration.md
2. Read docs/superpowers/plans/2026-09-01-car-audio-git-workflow-guardrail.md
3. Pull/fetch latest main
4. Create or switch to the Car Audio feature branch
5. Confirm current branch is NOT main
6. Only then start code changes
7. Validate on the branch
8. Open PR to main
9. Merge only after approval and checks
```

Direct implementation commits to `main` are prohibited for this project.
