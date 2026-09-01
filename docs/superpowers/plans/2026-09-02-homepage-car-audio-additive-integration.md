# TEYES Homepage Car Audio Additive Integration Plan

**Status:** Approved execution plan; implementation not started  
**Date:** 2026-09-02  
**Repository:** `wahahajack/teyesglobal`  
**Scope:** Homepage-only positioning adjustment for the new TEYES Car Audio product line, using additive changes only  
**Related source-of-truth documents:**

- `docs/superpowers/plans/2026-09-01-car-audio-product-line-integration.md`
- `docs/superpowers/plans/2026-09-01-car-audio-git-workflow-guardrail.md`

This document is the execution source of truth for the homepage portion of the Car Audio rollout. It exists specifically to prevent future conversations or coding sessions from reinterpreting the strategy and making broader homepage SEO/positioning changes than approved.

---

## 1. Approved decision

The homepage should **acknowledge that TEYES now has a second major product family, Car Audio, without replacing or weakening the existing Smart Infotainment / Android Head Unit / Car Stereo positioning.**

The correct strategy is:

> **Preserve all existing core homepage search and advertising signals, then add a new Car Audio semantic and visual layer.**

This is an additive project, not a homepage repositioning or rewrite.

### Key principle

Do **not** replace `car stereo` with `car audio`.

The existing homepage already contains valuable and relevant terminology such as:

- Smart Infotainment
- Android head units
- car stereo systems
- distributor cooperation
- OEM/ODM solutions

These terms remain accurate after the Car Audio launch and must be preserved. Car Audio is a new adjacent product topic, not a substitute for the existing topic.

---

## 2. Hard SEO and advertising protection rules

The following homepage elements are **frozen for this implementation unless the user explicitly approves a separate change after reviewing evidence**.

### 2.1 Do not change the homepage URL or canonical

Keep:

```text
https://teyesglobal.com/
```

No redirect, canonical change, or alternate homepage route is allowed.

### 2.2 Do not change the current SEO title

Keep exactly the current positioning unless a separate approved SEO experiment is created:

```text
TEYES - Smart Infotainment Solutions for Global Markets
```

### 2.3 Do not change the current meta description

Keep the current description during this phase:

```text
Global Smart Infotainment Solutions for the Automotive Aftermarket. OEM/ODM partner trusted by distributors across 100+ markets.
```

### 2.4 Do not change the current homepage H1

Keep:

```text
TEYES Global Smart Infotainment Solutions
```

### 2.5 Do not remove or replace `car stereo systems`

Keep the existing Hero support copy unchanged in this phase:

```text
Android head units, car stereo systems, accessories, distributor cooperation,
and OEM/ODM solutions for global markets.
```

Do not replace `car stereo systems` with `car audio systems`.

### 2.6 Do not replace the CC4 Pro Hero image

The homepage Hero should continue to lead visually with CC4 Pro as the current flagship Android Head Unit.

Do not turn the Hero into a 50/50 Head Unit + Car Audio composition in Phase 1.

### 2.7 Do not change the existing primary Hero CTAs

Keep the current primary path to the existing head-unit/product experience and the current Contact path unless a separate change is approved.

### 2.8 Do not rewrite the current Android Head Unit Product Ladder

The existing section heading and Android car stereo product-ladder purpose must stay intact. The new Car Audio module is added after it; it does not replace it.

### 2.9 Do not change existing Google Ads Final URLs or paid landing pages

This homepage project must not modify:

- current Google Ads Final URLs
- dedicated wholesale/distributor/OEM landing-page content
- Google Ads conversion IDs or labels
- GTM container ID
- existing successful form conversion contract

### 2.10 No homepage schema expansion in this phase

Do not add Car Audio terms to the homepage `Corporation.knowsAbout` schema during the same deployment unless separately approved.

Reason: this phase intentionally changes only one major homepage semantic variable — a visible Car Audio content section — so post-launch traffic changes remain easier to interpret.

---

## 3. Approved homepage information architecture

Current homepage sequence should remain intact except for one new section.

Recommended order:

```text
Hero
↓
Official Portal / navigation support
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

The new Car Audio module should be inserted **immediately after the existing Android Head Unit Product Ladder and before the OEM/ODM CTA**.

Rationale:

- Head Units remain the homepage's first and strongest product signal.
- Car Audio is still presented as a major TEYES product family rather than a footer-level accessory.
- The user can understand the product portfolio before seeing cooperation/manufacturing CTAs.
- This avoids interfering with the current Hero and the existing top-of-page SEO/Ads signals.

---

## 4. New homepage module: functional specification

### 4.1 Component purpose

Create one new homepage section, preferably as a separate component:

```text
src/components/home/CarAudioSection.tsx
```

Do not embed a large block of Car Audio markup directly into `Index.tsx` if a standalone component can keep the change isolated and easy to rollback.

### 4.2 Section role

The section must do exactly four things:

1. Tell visitors TEYES now has a Car Audio product range.
2. Name the four main product categories.
3. Provide a strong visual that communicates this is a real product family, not an accessory footnote.
4. Link to the dedicated `/car-audio/` hub.

It should **not** try to reproduce the entire Car Audio catalog on the homepage.

### 4.3 Recommended content hierarchy

**Eyebrow / small label**

```text
NEW PRODUCT LINE
```

**H2**

```text
TEYES Car Audio
```

**Supporting line — working copy**

```text
Speakers, subwoofers, amplifiers and bass systems for the automotive aftermarket.
```

This working copy is intentionally factual and conservative. It should not claim compatibility, distribution terms, sound-performance superiority, certifications, warranty, MOQ, or OEM/ODM support that the supplied catalog does not establish.

**Optional catalog-derived brand line**

```text
Detail · Dynamics · Depth
```

Use only as a secondary visual/brand line, not as the H2.

**Four product-family labels**

```text
Speakers
Subwoofers
Amplifiers
Bass Systems
```

Representative product references may be shown in small supporting text if the final design benefits from them:

```text
Speakers — T3 / T6
Subwoofers — TS / 10T3 / 10T6
Amplifiers — TD / TP
Bass Systems — V8 / BXA / BX
```

**Primary CTA**

```text
Explore Car Audio
```

Destination:

```text
/car-audio/
```

No homepage Car Audio CTA should trigger a Google Ads conversion by itself.

### 4.4 No secondary conversion form on the homepage

Do not add a new Car Audio inquiry form directly inside this homepage module in Phase 1.

The homepage module should link users to `/car-audio/`, where the Car Audio-specific B2B conversion path can be handled with clear attribution.

This reduces homepage complexity, conversion duplication, and tracking risk.

---

## 5. Recommended visual layout

Use a restrained split layout rather than four large ecommerce-style product cards.

### Desktop

Recommended composition:

```text
┌────────────────────────────────────────────────────────────┐
│ NEW PRODUCT LINE                                           │
│                                                            │
│ TEYES Car Audio                 [Car Audio family image]   │
│                                                            │
│ Speakers · Subwoofers                                      │
│ Amplifiers · Bass Systems                                  │
│                                                            │
│ Short B2B/factual support text                             │
│                                                            │
│ [Explore Car Audio →]                                      │
└────────────────────────────────────────────────────────────┘
```

Suggested grid proportion:

```text
Text 45–50% / Visual 50–55%
```

### Mobile

Order:

```text
Eyebrow
H2
Support copy
Product-family labels
CTA
Product-family image
```

The section must not become taller than necessary on mobile. Avoid four stacked image cards.

### Visual language

Use the existing TEYES site shell and component system, but borrow restrained visual cues from the Car Audio catalog:

- black / dark-neutral product presentation
- orange accent as a Car Audio sub-brand cue
- no full-site recoloring
- no redesign of the global navigation or homepage theme

The Car Audio module should feel like a distinct product family **inside TEYES**, not a separate microsite pasted into the homepage.

---

## 6. Homepage image requirement — minimum approved asset set

### 6.1 Mandatory image: one Car Audio product-family composite

For the homepage, the preferred Phase 1 solution is **one strong composite image**, not four separate heavy product-card images.

The composite should visually represent the four main product families with approximately one representative product from each group:

1. **Speaker:** T6-652 or another clearly recognizable T6 speaker/component set
2. **Subwoofer:** TS-10 or one 10T3/10T6 subwoofer driver
3. **Amplifier:** TP800/4 or TD500/4
4. **Bass System:** one BX/BXA enclosed subwoofer system

The purpose is category recognition, not model-by-model selling.

### 6.2 Preferred source quality

Best source order:

1. Original TEYES transparent product renders / PNG / PSD / high-resolution photography
2. Original design assets used to make the Car Audio catalog
3. Product images extracted from the supplied PDF only if original assets are unavailable

Do not use a full PDF-page screenshot as the homepage image.

Do not include specification tables or tiny catalog text inside the image.

### 6.3 Image composition requirements

The composite should:

- show actual TEYES Car Audio products
- keep each product recognizable at desktop and mobile sizes
- avoid excessive visual clutter
- avoid fake vehicle installations or compatibility claims
- avoid unverified award / certification badges
- avoid baked-in marketing text
- avoid a permanent background that breaks the site's light/dark theme if transparency is feasible
- retain the catalog's black/orange visual character through subtle accents rather than a large orange poster background

### 6.4 Recommended master and export sizes

Preferred master asset:

```text
1800 × 1200 px or larger
3:2 landscape
transparent background preferred
```

Responsive website exports:

```text
480w
800w
1200w
```

Preferred formats:

```text
AVIF
WebP fallback
```

Suggested filenames:

```text
src/assets/car-audio/car-audio-family-480.avif
src/assets/car-audio/car-audio-family-800.avif
src/assets/car-audio/car-audio-family-1200.avif
src/assets/car-audio/car-audio-family-480.webp
src/assets/car-audio/car-audio-family-800.webp
src/assets/car-audio/car-audio-family-1200.webp
```

### 6.5 Performance targets

These are implementation targets, not factual product specifications:

- 1200px AVIF target: approximately <= 180 KB where visual quality permits
- 1200px WebP fallback target: approximately <= 250 KB where visual quality permits
- preserve explicit width/height or aspect ratio to avoid CLS
- use `loading="lazy"` because this section is below the Hero
- use responsive `srcset` / `<picture>` following the site's existing image pattern
- do not set `fetchPriority="high"` for this below-the-fold image

### 6.6 Approved alt text direction

Use factual alt text, for example:

```text
TEYES car audio speakers, subwoofers, amplifiers and bass systems
```

Do not keyword-stuff model numbers into the alt attribute.

---

## 7. Optional image assets — only if final design requires them

If one composite image cannot communicate the range clearly, a second design option may use four small transparent category cutouts.

Optional assets:

```text
car-audio-speakers-*.avif/webp
car-audio-subwoofer-*.avif/webp
car-audio-amplifier-*.avif/webp
car-audio-bass-system-*.avif/webp
```

However, this is **not the preferred first implementation** because it creates more image requests, more layout complexity, and a stronger visual change to the homepage.

Do not add four category images merely because four categories exist.

---

## 8. Source mapping from the supplied Car Audio catalog

The supplied 2026 catalog contains suitable visual references for the new homepage module:

- T3/T6 speaker product imagery
- under-seat and conventional subwoofer product imagery
- V8 and enclosed bass-system imagery
- TD/TP amplifier imagery

When original source renders are unavailable, the implementation team may extract clean product cutouts from the catalog for a temporary or production composite, but the final result must be reviewed at actual homepage display size before approval.

Do not invent product renders using generative imagery for the final product representation unless the user explicitly approves a non-literal marketing illustration. Actual product photography/renders are preferred for product accuracy.

---

## 9. Expected code changes for the homepage portion

Before editing, the implementation agent must re-read the latest `main` branch. Expected files are:

### Likely modify

```text
src/pages/Index.tsx
```

Required change:

- lazy-load and insert `CarAudioSection` immediately after `ProductsSection`

### New

```text
src/components/home/CarAudioSection.tsx
```

### New assets

```text
src/assets/car-audio/*
```

### Possibly add/update tests

Use the repository's existing testing conventions. A focused homepage contract test is preferred if no current test protects the frozen homepage signals.

The test should protect, at minimum:

- homepage SEO title remains unchanged
- homepage H1 remains unchanged
- `car stereo systems` remains present
- `/car-audio/` link exists after implementation
- the Android Head Unit Product Ladder remains present

Do not create a brittle full-page snapshot merely to detect cosmetic changes.

### Do not modify for this homepage-only task unless proven necessary

```text
src/components/home/HeroSection.tsx
```

The preferred implementation requires **zero Hero changes**.

Also do not modify the current homepage schema in `Index.tsx` for Car Audio semantics during this phase.

---

## 10. Tracking requirements for the homepage module

### 10.1 Preserve existing global tracking

The new section must inherit the site's existing GTM / GA4 / attribution infrastructure. Do not paste a second GTM or GA4 installation into `CarAudioSection.tsx`.

### 10.2 CTA behavior

The `Explore Car Audio` CTA should navigate to:

```text
/car-audio/
```

The page journey should preserve the fact that the visitor came from the homepage.

If the current tracking architecture already records same-site page journeys automatically, do not add duplicate code.

### 10.3 Optional interaction event

A dedicated CTA event such as:

```text
car_audio_home_cta_click
```

may be added only if it fits the existing dataLayer/event conventions and does not duplicate a current generic navigation event.

This CTA interaction is **not** a Google Ads conversion.

### 10.4 Attribution preservation

A visitor arriving with advertising parameters must keep the existing attribution behavior when navigating:

```text
Paid landing / Homepage
→ /car-audio/
→ Contact / inquiry
→ successful lead submission
```

Existing GCLID / GBRAID / WBRAID / UTM persistence must not regress.

### 10.5 Conversion rule

Only a real successful lead submission may trigger the existing successful form conversion contract such as `form_submit_success`.

Homepage module views or Car Audio CTA clicks must not fire the final lead conversion.

---

## 11. SEO acceptance criteria

Before merge, verify all of the following on the feature-branch preview:

- [ ] homepage URL unchanged
- [ ] homepage canonical unchanged
- [ ] homepage title unchanged
- [ ] homepage meta description unchanged
- [ ] homepage H1 unchanged
- [ ] `Android head units` still visible in Hero copy
- [ ] `car stereo systems` still visible in Hero copy
- [ ] CC4 Pro remains Hero product
- [ ] current primary Hero CTA remains
- [ ] Android Head Unit Product Ladder remains present
- [ ] new `TEYES Car Audio` H2 appears below Product Ladder
- [ ] new section links to `/car-audio/`
- [ ] no accidental `noindex`
- [ ] no duplicate H1 introduced
- [ ] image alt text is factual
- [ ] no unsupported product/compatibility/commercial claims introduced

---

## 12. Visual and performance acceptance criteria

- [ ] desktop section fits the existing homepage visual system
- [ ] mobile layout remains compact
- [ ] no four-image vertical wall on mobile
- [ ] Car Audio sub-brand orange accent does not recolor the whole homepage
- [ ] image remains legible in both light and dark site appearance if the site supports both
- [ ] image has explicit dimensions/aspect ratio
- [ ] responsive AVIF/WebP source selection works
- [ ] image is lazy-loaded
- [ ] no visible layout shift when the image loads
- [ ] no large text baked into the image
- [ ] Lighthouse/performance regression is reviewed against the current preview baseline

---

## 13. Advertising acceptance criteria

- [ ] no existing Google Ads Final URL changed
- [ ] no paid landing-page HTML/content changed as part of this homepage task
- [ ] no GTM container ID changed
- [ ] no Google Ads conversion ID/label changed
- [ ] homepage CTA does not trigger lead conversion
- [ ] existing conversion path still works
- [ ] if the homepage receives paid traffic, Hero/H1/Title/car-stereo wording remains unchanged
- [ ] AI Max / Final URL Expansion / PMax URL Expansion risk is reviewed separately before production launch if relevant to active campaigns

---

## 14. Required Git workflow

Actual code implementation must **not** be performed directly on `main`.

Required workflow:

1. Read this plan and the two related source-of-truth documents from the latest `main`.
2. Confirm `main` is the intended base.
3. Create or use the approved Car Audio feature branch from the latest `main`.
4. Make the homepage changes only on that feature branch.
5. Run tests, lint/build/SEO checks required by the repository.
6. Review Netlify/branch preview visually on desktop and mobile.
7. Compare branch against `main` and verify the frozen homepage signals remain unchanged.
8. Open/update PR.
9. User reviews preview and diff.
10. Merge only after explicit approval.

Planning documents may live on `main`; implementation code may not bypass the feature-branch/PR workflow.

---

## 15. Rollback design

The homepage change should be intentionally easy to reverse.

Preferred rollback boundary:

- remove one `CarAudioSection` import/render from `Index.tsx`
- remove the isolated component
- remove its dedicated assets

The implementation must not entangle Car Audio homepage content with the existing Hero or Android Head Unit Product Ladder in a way that makes rollback destructive.

---

## 16. Post-launch measurement

Do not immediately change the homepage Title/H1 after this section launches.

Observe at least the following before considering a larger positioning change:

### Organic

- homepage clicks
- homepage impressions
- homepage CTR
- principal queries containing `car stereo`
- principal queries containing `android head unit`
- branded TEYES queries
- `/products/` impressions/clicks
- `/car-audio/` impressions/clicks and query mix

### Paid

- homepage campaign/ad-group spend if the homepage is used as a Final URL
- CTR
- CPC
- conversion rate
- conversion count
- search-term mix
- landing-page behavior

### Conversion quality

- `/car-audio/` visits from homepage
- Car Audio inquiry count
- Car Audio lead identification in CRM
- paid-attribution continuity

Do not interpret short-term crawl/index fluctuations as proof of causality without enough data.

---

## 17. Explicitly deferred changes

The following are not approved by this document:

- changing homepage H1 to `TEYES Global Smart Infotainment & Car Audio Solutions`
- changing the homepage Title to include `Car Audio`
- replacing `car stereo systems` with `car audio systems`
- replacing the CC4 Pro Hero with a mixed product collage
- restructuring `/products/`
- turning `/products/` into a general all-product hub
- mixing Car Audio products into `/accessories/`
- adding multiple Car Audio SKU blocks to the homepage
- changing homepage Corporation schema
- adding a homepage Car Audio lead form

Any of these requires separate review and explicit approval.

---

## 18. New-conversation handoff instruction

Use the following as the first instruction in a new implementation window:

> Read `docs/superpowers/plans/2026-09-01-car-audio-product-line-integration.md`, `docs/superpowers/plans/2026-09-01-car-audio-git-workflow-guardrail.md`, and `docs/superpowers/plans/2026-09-02-homepage-car-audio-additive-integration.md` first. Treat all three as the approved source of truth. Do not modify `main` directly. Preserve the current homepage Title, meta description, H1, Hero copy including `car stereo systems`, CC4 Pro Hero, existing Head Unit product ladder, indexed URLs, canonicals, paid landing pages, and tracking contracts. Implement the new homepage Car Audio module as an additive section after the Android Head Unit Product Ladder. Before any code changes, summarize the exact files to change, image assets required, tracking impact, risks, and validation checklist for my approval.

---

## 19. Final implementation rule

If a future implementation agent concludes that changing the existing homepage Title, H1, `car stereo` wording, Hero, schema, or existing Head Unit content would make the new Car Audio module "cleaner" or "more consistent," that is **not sufficient reason to do it**.

The approved objective is not architectural purity. The approved objective is to add the new Car Audio business signal while protecting existing organic traffic, advertising relevance, conversion tracking, and established Head Unit / Car Stereo search intent.
