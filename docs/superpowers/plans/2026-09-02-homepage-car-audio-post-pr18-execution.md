# TEYES Homepage Car Audio Post-PR18 Execution Plan

**Status:** Approved planning document; homepage code implementation not started in this phase  
**Date:** 2026-09-02  
**Repository:** `wahahajack/teyesglobal`  
**Purpose:** Define the homepage Car Audio rollout as a separate deployment after PR #18 is merged and validated in production.  
**Execution source of truth:** This document is the sole execution plan for the post-PR18 Homepage Car Audio rollout.

Related source-of-truth documents:

- `docs/superpowers/plans/2026-09-01-car-audio-product-line-integration.md`
- `docs/superpowers/plans/2026-09-01-car-audio-git-workflow-guardrail.md`
- `docs/superpowers/plans/2026-09-01-car-audio-category-url-amendment.md` after PR #18 is merged

---

## 1. Release sequencing decision

The rollout is intentionally split into two production steps.

### Step A — PR #18: publish the Car Audio product architecture

PR #18 should establish the Car Audio product family itself:

```text
/car-audio/
/car-audio/speakers/
/car-audio/subwoofers/
/car-audio/bass-systems/
/car-audio/amplifiers/
```

It should also provide the global Products-navigation entry needed to expose the new family and preserve the existing `/products/` Android Head Unit structure.

### Step B — separate homepage PR after production validation

Only after PR #18 is merged and production-smoke-tested should the homepage receive its dedicated Car Audio module.

Create a new branch from the then-current `main`, recommended name:

```text
feature/homepage-car-audio-additive
```

Do not reuse the PR #18 feature branch for the homepage follow-up.

This separation is deliberate: if the new Car Audio architecture has a routing, SEO, sitemap, tracking, or content issue, it can be diagnosed independently from homepage changes.

---

## 2. Critical prerequisite concerning PR #18

At the time of this plan revision, PR #18 already contains a homepage `CarAudioSection` insertion in `src/pages/Index.tsx` plus `src/components/home/CarAudioSection.tsx`.

That does not match the desired release sequence above.

If the user wants PR #18 to publish the Car Audio pages first and change the homepage only afterward, the PR #18 homepage insertion must be removed before merge as a separate, explicitly approved code change.

This document does **not** authorize that code removal by itself. It only records the required sequencing.

---

## 3. Homepage strategy: additive only

The homepage is not being repositioned from Car Stereo / Smart Infotainment to Car Audio.

The approved strategy is:

> Preserve all existing core homepage search and advertising signals, then add a visible Car Audio product-family layer below the current Android Head Unit Product Ladder.

Car Audio is additive. It does not replace `car stereo`.

---

## 4. Frozen homepage SEO and paid-traffic assets

The homepage follow-up PR must not change the following unless a later, separate approval explicitly authorizes it.

### Homepage URL / canonical

Keep:

```text
https://teyesglobal.com/
```

### SEO title

Keep exactly:

```text
TEYES - Smart Infotainment Solutions for Global Markets
```

### Meta description

Keep exactly:

```text
Global Smart Infotainment Solutions for the Automotive Aftermarket. OEM/ODM partner trusted by distributors across 100+ markets.
```

### H1

Keep exactly:

```text
TEYES Global Smart Infotainment Solutions
```

### Hero support copy

Keep the current wording, including the important `car stereo systems` phrase:

```text
Android head units, car stereo systems, accessories, distributor cooperation,
and OEM/ODM solutions for global markets.
```

Do not replace `car stereo systems` with `car audio systems`.

### Hero visual / CTAs

Keep CC4 Pro as the Hero product.

Do not change the current Hero buttons as part of this homepage Car Audio task.

### Existing Android Head Unit Product Ladder

Keep the section intact. Do not rename or rewrite it to become a generic all-products section.

### Paid landing pages and conversion configuration

Do not change:

- existing Google Ads Final URLs
- dedicated paid landing-page files
- GTM container ID
- GA4 / Google Ads conversion IDs or labels
- successful lead conversion contract
- existing GCLID / GBRAID / WBRAID / UTM persistence

---

## 5. Approved homepage section position

Insert exactly one new Car Audio section after the current Android Head Unit Product Ladder and before the OEM/ODM CTA.

```text
Hero
↓
Official Portal
↓
Trust
↓
Capabilities
↓
TEYES Android Head Unit Product Ladder
↓
NEW: TEYES Car Audio
↓
OEM / ODM CTA
↓
Partners
↓
FAQ
↓
Final CTA
```

This keeps Head Units as the first and strongest product signal while making Car Audio clearly visible as a second major product family.

---

## 6. Updated homepage module specification

Because PR #18 introduces four dedicated Car Audio category URLs, the homepage module should take advantage of them instead of showing four non-clickable category labels.

### Eyebrow

Prefer durable wording rather than a permanent `NEW` badge that becomes stale.

Recommended:

```text
CAR AUDIO PRODUCT LINE
```

or:

```text
TEYES CAR AUDIO
```

Avoid making `NEW PRODUCT FAMILY` permanent content.

### H2

```text
TEYES Car Audio
```

### Supporting copy

Recommended working copy:

```text
Expand your aftermarket offer with TEYES speakers, subwoofers, bass systems and Class D amplifiers alongside the established Android head-unit range.
```

This is intentionally additive: it introduces Car Audio while reinforcing the established head-unit business.

### Four direct category links

Each category should be a compact text/icon link, not a large ecommerce card.

```text
Speakers     → /car-audio/speakers/
Subwoofers   → /car-audio/subwoofers/
Bass Systems → /car-audio/bass-systems/
Amplifiers   → /car-audio/amplifiers/
```

These links strengthen internal linking to the new indexable category pages and give visitors a shorter path to relevant products.

### Primary CTA

```text
Explore TEYES Car Audio
```

Destination:

```text
/car-audio/
```

### Do not show a model-count badge

Do not use a homepage badge such as:

```text
21 core models
```

Although the current PR #18 range can be counted to 21 primary models across the four categories, this number creates maintenance debt and can become stale as the catalog changes. The homepage does not need the number to communicate the range.

---

## 7. Homepage image plan

### 7.1 One family composite remains the preferred design

Use one strong Car Audio family image rather than four large product images.

The image should visibly represent all four homepage categories:

1. speaker / component set
2. subwoofer or under-seat subwoofer
3. amplifier
4. enclosed Bass System (BX/BXA family)

### 7.2 Existing PR #18 asset assessment

PR #18 already contains:

```text
public/images/car-audio/overview.webp
```

It is a useful starting point and already combines TEYES speaker, bass/subwoofer and amplifier products.

However, for the final homepage follow-up, the composition should be reviewed for category balance. The Bass Systems category should be represented by a clearly recognizable BX/BXA enclosed subwoofer if the current overview image does not communicate that category clearly enough.

### 7.3 Preferred final composition

Recommended visual hierarchy:

```text
T6 speaker/component set
        +
TS or conventional subwoofer
        +
TP/TD amplifier
        +
BX/BXA enclosed Bass System
```

Use actual TEYES product renders or catalog-derived product cutouts. Do not use generic or generated substitute hardware.

### 7.4 Responsive exports

The homepage image should follow the site's existing responsive-image approach instead of loading one large WebP at every viewport size.

Preferred exports:

```text
480w AVIF
800w AVIF
1200w AVIF
480w WebP
800w WebP
1200w WebP
```

Use `<picture>` / `srcset` and lazy loading because the section is below the fold.

Do not use `fetchPriority="high"` for this image.

### 7.5 Alt text

Use factual alt text, for example:

```text
TEYES car audio speakers, subwoofers, amplifiers and bass systems
```

Do not keyword-stuff model numbers.

---

## 8. Tracking behavior for the homepage follow-up

Do not paste separate tracking scripts into the homepage component.

The existing site-wide tracking already records normal page journeys and records the current page when a visitor clicks into `/contact/`.

The homepage Car Audio module should therefore rely on the existing tracking contract unless testing proves a real gap.

Expected path:

```text
Homepage
→ /car-audio/ or a Car Audio category page
→ /contact/
→ successful lead submission
```

The final successful lead conversion must still fire only on actual successful submission, not on section view or CTA click.

A dedicated non-conversion interaction event for the homepage CTA may be considered later, but it is not required for the initial homepage module and must not duplicate existing navigation events.

---

## 9. Expected code scope for the later homepage PR

After PR #18 is merged and the new branch is created from the latest `main`, inspect the production baseline first.

Expected homepage-only files:

```text
src/pages/Index.tsx
src/components/home/CarAudioSection.tsx
```

Expected image assets may include responsive versions of the Car Audio family composite.

Possibly add a focused contract test protecting the frozen homepage signals.

### Files that should not require modification

```text
src/components/home/HeroSection.tsx
src/components/home/ProductsSection.tsx
src/pages/products/Products.tsx
src/lib/tracking.ts
public/lead-capture.js
existing paid landing pages
```

If implementation discovers a need to modify any of these, stop and report the reason before changing them.

---

## 10. Homepage acceptance checklist

Before opening the homepage follow-up PR:

### SEO / content protection

- [ ] homepage URL unchanged
- [ ] homepage canonical unchanged
- [ ] SEO title unchanged
- [ ] meta description unchanged
- [ ] H1 unchanged
- [ ] `Android head units` remains in Hero copy
- [ ] `car stereo systems` remains in Hero copy
- [ ] CC4 Pro remains the Hero product
- [ ] existing primary Hero CTAs remain unchanged
- [ ] Android Head Unit Product Ladder remains intact

### New Car Audio module

- [ ] inserted after the Head Unit Product Ladder
- [ ] H2 is `TEYES Car Audio`
- [ ] factual support copy only
- [ ] category links point to all four PR #18 category URLs
- [ ] primary CTA points to `/car-audio/`
- [ ] no homepage inquiry form added
- [ ] no stale model-count badge

### Images / performance

- [ ] actual TEYES Car Audio products only
- [ ] family image clearly represents Speakers, Subwoofers, Amplifiers and Bass Systems
- [ ] responsive AVIF/WebP exports used where feasible
- [ ] below-fold image lazy-loaded
- [ ] explicit dimensions/aspect ratio prevent CLS
- [ ] no unnecessary high fetch priority

### Tracking

- [ ] no duplicate GTM or GA4 installation
- [ ] homepage → Car Audio page navigation is visible in the existing page journey
- [ ] Car Audio → Contact entry source is preserved
- [ ] GCLID / GBRAID / WBRAID / UTM persistence does not regress
- [ ] CTA click itself does not fire final lead conversion
- [ ] successful form submission still uses the existing conversion contract

### Regression / Ads

- [ ] existing paid landing pages unchanged
- [ ] `/products/` unchanged
- [ ] `/accessories/` unchanged
- [ ] no existing Final URL changed
- [ ] no existing canonical changed

---

## 11. Production sequence

1. Merge PR #18 only after its own review blockers are resolved.
2. Deploy PR #18 to production.
3. Smoke-test all five Car Audio URLs, navigation, canonicals, sitemap, Contact path and tracking behavior.
4. Confirm no immediate regression in protected pages or paid landing pages.
5. Create `feature/homepage-car-audio-additive` from the latest production `main`.
6. Re-read this document and the Car Audio source-of-truth documents.
7. Before coding, report exact files to change, image assets, tracking impact, risks and validation checklist for approval.
8. Implement only the approved homepage module.
9. Validate on Netlify Deploy Preview.
10. Merge only after homepage SEO/Ads/tracking gates pass.

---

## 12. New-conversation instruction

Use this as the first instruction in the separate homepage implementation conversation:

> Read `docs/superpowers/plans/2026-09-01-car-audio-product-line-integration.md`, `docs/superpowers/plans/2026-09-01-car-audio-git-workflow-guardrail.md`, `docs/superpowers/plans/2026-09-01-car-audio-category-url-amendment.md`, and `docs/superpowers/plans/2026-09-02-homepage-car-audio-post-pr18-execution.md` first. Treat them as the approved source of truth. Start from the latest `main` only after PR #18 has been merged and production-validated. Create a new branch `feature/homepage-car-audio-additive`; do not modify `main` directly. Preserve the homepage SEO title, meta description, H1, Hero copy including `car stereo systems`, CC4 Pro Hero, current Hero CTAs, Android Head Unit Product Ladder, existing indexed URLs, canonicals, paid landing pages and tracking contracts. Add only the approved Car Audio section after the Head Unit Product Ladder. The four category links should target the Car Audio category URLs created by PR #18. Before any code changes, summarize the exact files to change, image assets required, tracking impact, risks and validation checklist for approval.
