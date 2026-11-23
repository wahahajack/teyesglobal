# TEYES Global Protected Pages Baseline

Phase 0 safety baseline for SEO, GEO, and conversion optimization.

## Branch rules

- Repository: `wahahajack/teyesglobal`
- Production/default branch: `main`
- Phase 0 branch: `feature/phase-0-safety-baseline`
- Do not commit directly to `main`.
- Do not auto-merge.
- Do not auto-publish.
- Each implementation phase must use a separate branch and manual review.

## Protected indexed / traffic pages

| URL | Type | Rules |
|---|---|---|
| `/` | Homepage | Keep URL, canonical, core positioning, and existing content. Low-risk improvements only. |
| `/oem-odm/cases` | Case studies | Keep URL. Do not remove existing cases. Only expand and add evidence. |
| `/accessories` | Accessories page | Keep URL. Do not remove current content. Add SEO/internal-link modules later. |
| `/solutions/distributors` | Distributor page | Keep URL. Preserve content, then reorganize and strengthen conversion. |
| `/solutions/market-needs` | Market needs page | Keep URL. Preserve content, then upgrade into a market/product-mix guide. |

## Frozen advertising landing pages

These pages are currently used by paid campaigns and must not be changed during Phase 1 to Phase 3 unless a separate approved test branch is created.

| URL | Rule |
|---|---|
| `/landing/oem` | Do not change layout, copy, CTA, form, tracking, or thank-you flow. |
| `/landing/market-entry` | Do not change layout, copy, CTA, form, tracking, or thank-you flow. |
| `/landing/distributor` | Do not change layout, copy, CTA, form, tracking, or thank-you flow. |

## SEO safety rules

- Do not rename protected routes.
- Do not remove protected pages from sitemap.
- Do not change canonical URLs unless a confirmed technical issue exists.
- Do not delete existing text; move, reorder, clarify, and extend it.
- Avoid changing H1 unless Search Console data supports the change.
- Add FAQ, Breadcrumb, Product, and HowTo schema where appropriate.
- Maintain existing internal links, then add stronger links to comparison, distributor, market needs, cases, and contact pages.

## Pre-release checklist

- [ ] No direct change to `main`.
- [ ] `/landing/oem` unchanged.
- [ ] `/landing/market-entry` unchanged.
- [ ] `/landing/distributor` unchanged.
- [ ] Protected URLs still resolve.
- [ ] Sitemap still includes protected URLs.
- [ ] Canonical URLs are correct.
- [ ] Existing content was not deleted.
- [ ] Forms and WhatsApp links still work.
- [ ] GA4 / GTM / Ads events are not broken.
- [ ] Mobile layout is usable.
- [ ] Build passes before manual merge/publish.

## Data note

This repository backup does not include Search Console, Analytics, or Ads exports. Those reports must be exported from their platforms or supplied by the site owner before final traffic-impact assessment.