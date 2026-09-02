# Car Audio UI & Content Refinement Plan — PR #21

**Status:** Approved for implementation  
**Date:** 2026-09-02  
**Repository:** `wahahajack/teyesglobal`  
**Branch:** `feature/car-audio-product-line-pr21`  
**PR:** #21  

This plan records the complete approved refinement scope to be implemented on the existing PR #21 branch. It supplements the existing Car Audio integration and URL-architecture plans. Do not modify `main` directly. Do not change Homepage, existing Android Head Unit positioning, existing Google Ads landing pages, GTM/GA4/Google Ads tracking contracts, or unrelated site areas.

## 1. Car Audio hub hero

- Keep the approved `car-audio-hero.webp` artwork as the Car Audio hub hero.
- The hero image is not a product-detail image and must not open a lightbox.
- Remove the current three factual/specification chips:
  - `6 speaker + 5 subwoofer driver models`
  - `Under-seat · sealed · ported bass`
  - `1200 W × 1 amplifier`
- Replace them with the Car Audio catalog brand signature:
  - `DETAIL · DYNAMICS · DEPTH`
- Present this as a lightweight brand signature, not as three specification badges.

## 2. Catalog-derived product-family messaging

Use the approved Car Audio catalog language instead of inventing parallel generic marketing claims. Keep existing factual/SEO/B2B copy where it provides useful explanation, but let the catalog slogan provide the emotional product positioning.

Approved mappings:

- Car Audio overall: `DETAIL · DYNAMICS · DEPTH`
- Speakers hero: `Detail in Every Note.`
- Component Speakers: `Detail in Every Note.`
- Coaxial Speakers: `Music for Every Drive.`
- Standalone Subwoofer Drivers: `Depth You Can Feel.`
- V8 Competition: `Built for Impact.`
- Enclosed Subwoofers hero: `Bass That Moves You.`
- Under-Seat Subwoofers: `Big Bass. Small Footprint.`
- Boxed Enclosed Subwoofers: `Bass That Moves You.`
- Amplifiers hero: `Power with Precision.`

Do not create new sections merely to display slogans. Integrate them into the existing hero or product-family structure. Avoid mechanical duplication when a slogan is already visible nearby.

## 3. Complete System module redesign

The current `1 / 2 / 3 / 4` presentation incorrectly implies a strict installation sequence and the arrows visually imply navigation even though they do not work.

Keep the module concept because it communicates the broader TEYES in-car entertainment portfolio, but redesign it as an ecosystem rather than a sequence.

Target ecosystem groups:

- `Head Unit`
- `Amplification`
- `Cabin Audio`
- `Bass`

Rules:

- Remove numeric step indicators.
- Remove non-functional arrows.
- Only display interaction affordances where the item is truly clickable.
- Head Unit links to `/products/`.
- Amplification links to `/car-audio/amplifiers/`.
- Cabin Audio links to `/car-audio/speakers/`.
- Bass must represent both standalone subwoofer drivers and enclosed subwoofers; do not incorrectly force the entire bass concept into one product category. It may contain two compact links where needed.

## 4. Related Car Audio Ranges module

Delete the current standalone `RELATED CAR AUDIO RANGES` section and its large link cards, including the heading `CONTINUE BUILDING THE PRODUCT MIX.`.

Keep cross-category internal navigation, but move it into the final B2B CTA area as lightweight secondary navigation.

Rules:

- The primary action remains `Contact TEYES B2B`.
- Secondary navigation must be visually subordinate.
- Show only the other two Car Audio categories; do not link the page to itself.
- Keep the existing `config.related` data as the source where practical rather than creating duplicate relationship data.

## 5. Product Detail Quick View

The current image lightbox provides little additional image detail because the source images are approximately 512 px. Replace the image-only lightbox concept with a Product Detail Quick View.

### Closed/default state

Product cards should show only:

- product image
- model
- product type

Remove the current small specification chips from the default product card. Complete specifications must not be pre-rendered into hidden card DOM.

### Open state

When a user clicks the product visual, mount a product-detail dialog only for the selected product.

Desktop layout:

- left: enlarged product image
- right: model, type, applicable catalog tagline, and complete product specifications

Mobile layout:

- product image on top
- model/type/tagline and specifications below
- dialog scrolls vertically

Interaction requirements:

- backdrop closes
- close button closes
- Escape closes
- body scrolling is locked while open
- close control remains readily accessible
- do not add a second pixel-zoom interaction
- replace `ZoomIn` / `View larger image` semantics with `View details` or equivalent non-deceptive detail semantics

The Quick View is an interaction enhancement, not an SEO-content replacement. The normal visible Technical Comparison tables remain on the page.

## 6. Single structured product-data source

Do not create a third manually duplicated full-spec data set for Quick View.

Refactor the current product visual and technical specification data so that each product has one structured source for its published data, and both:

- Product Detail Quick View
- Technical Comparison tables

consume that same structured data.

The current confirmed product specifications must not change during this refactor.

Quick View should display only applicable fields. Do not fill the dialog with `N/A` rows where a field is not relevant. Comparison tables may still use `N/A` where a column is needed for cross-model comparison.

Maintain these confirmed identities and values, including but not limited to:

- `10T3-D4` remains distinct from `10T3S-V4`
- `10T6-V4` remains distinct from `10T6S-V4`
- `10V8-V4` retains 16 mm X-MAX and CCAW voice coil
- `BX4/10T3/D4` remains a distinct enclosed product from standalone `10T3-D4`

## 7. Category page product messaging and structure

Current final category architecture remains unchanged:

- `/car-audio/speakers/`
- `/car-audio/enclosed-subwoofers/`
- `/car-audio/amplifiers/`

Product allocations and technical-table ownership remain unchanged.

Use the catalog slogans in existing range-structure content where they add useful product meaning:

### Speakers

- Component: `Detail in Every Note.`
- Coaxial: `Music for Every Drive.`
- standalone subwoofer drivers: `Depth You Can Feel.`
- V8 Competition: `Built for Impact.`

### Enclosed Subwoofers

- Under-seat: `Big Bass. Small Footprint.`
- Boxed: `Bass That Moves You.`

### Amplifiers

- `Power with Precision.`

## 8. Protected and excluded scope

Do not change as part of this refinement:

- Homepage
- `/products/` positioning or content, except linking to it from the ecosystem module
- `/accessories/`
- existing landing pages
- GTM / GA4 / Google Ads IDs, labels, or tracking contracts
- current three-category URL architecture
- canonical policy
- sitemap structure
- product allocation
- confirmed product specifications
- Header/navigation IA
- Amplifier 3+1 product-grid layout
- image fetch-priority optimization

If an additional issue is discovered outside this plan, report it separately rather than fixing it opportunistically.

## 9. Expected implementation files

Primary expected files:

- `src/pages/car-audio/CarAudio.tsx`
- `src/pages/car-audio/CarAudioCategory.tsx`
- `src/pages/car-audio/ProductVisual.tsx`
- `src/pages/car-audio/productVisuals.ts`

Additional files may be changed only if required to keep the existing Car Audio data structures coherent and within this approved scope.

## 10. Validation checklist

Before this refinement is considered complete:

1. Car Audio hero shows `DETAIL · DYNAMICS · DEPTH` and no old factual chips.
2. Hero image remains non-clickable.
3. Catalog slogans appear in the correct product-family context without unnecessary duplicate sections.
4. Complete System no longer presents a numbered false sequence or non-functional arrows.
5. Ecosystem links work and Bass does not misrepresent category ownership.
6. Standalone Related Car Audio Ranges section is gone.
7. Cross-category links remain available as lightweight navigation inside the B2B CTA.
8. Default product cards show no specification chips.
9. `View details` opens a selected-product-only Quick View.
10. Quick View shows image, model, type, applicable tagline and complete applicable specifications.
11. Quick View works on desktop and mobile and closes by button, backdrop and Escape.
12. Full Quick View specification content is not mounted before interaction.
13. Visible Technical Comparison tables remain present.
14. Quick View and Technical Comparison derive from the same structured product data.
15. No confirmed technical values or product identities change.
16. Final-head Netlify Deploy Preview succeeds and all four Car Audio URLs load.
17. PR remains Draft until the normal PR #21 validation gates are satisfied.
