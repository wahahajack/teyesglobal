# TEYES Car Audio Category URL Amendment

**Status:** Approved implementation amendment  
**Date:** 2026-09-02  
**Repository:** `wahahajack/teyesglobal`  
**Branch:** `feature/car-audio-product-line-pr21`  
**PR:** #21

This amendment records the final Car Audio child-category structure for PR #21. It supersedes the earlier four-category preview structure before production launch.

## Approved URL architecture

```text
/car-audio/
/car-audio/speakers/
/car-audio/enclosed-subwoofers/
/car-audio/amplifiers/
```

The earlier PR-preview routes `/car-audio/subwoofers/` and `/car-audio/bass-systems/` are withdrawn before launch. They must not remain in application routing, prerender/static route verification, sitemap output or canonical declarations. No production redirect is required because these URLs were never approved production URLs.

## Content responsibility

`/car-audio/` remains the B2B Car Audio hub. It introduces the overall portfolio and routes visitors into three product categories without duplicating the full technical tables carried by the child category pages.

The three child pages are indexable, self-canonical category pages:

- `/car-audio/speakers/` — T3/T6 component, active 3-way and coaxial speakers plus all confirmed standalone 10-inch subwoofer drivers.
- `/car-audio/enclosed-subwoofers/` — TS under-seat enclosed subwoofers plus active/passive sealed and ported boxed subwoofer systems.
- `/car-audio/amplifiers/` — TD and DSP-controlled TP Class D amplifier range.

Complete catalog specification tables move with their products. The hub may repeat selected factual highlights needed for orientation, but should not repeat the same full tables or duplicate the same page purpose.

## Product allocation and parameter ownership

### Speakers

Cabin speakers:

- `T3-652`
- `T3-65X`
- `T6-652`
- `T6-653A`
- `T6-803A`
- `T6-65X`

Standalone subwoofer drivers:

- `10T3-D4`
- `10T3S-V4`
- `10T6-V4`
- `10T6S-V4`
- `10V8-V4`

The full published driver parameters belong on `/car-audio/speakers/`. `10V8-V4` remains a standalone competition subwoofer driver and retains its published `600 W` rated power, `1200 W` maximum power, `4 Ω + 4 Ω` nominal impedance, `84 dB` sensitivity, `30 Hz-400 Hz` frequency response, `165 mm` mounting depth, `16 mm` X-MAX and `CCAW` voice coil.

The confirmed standalone standard-depth driver remains `10T3-D4`: `400 W` rated, `800 W` maximum, `4 Ω`, `85 dB`, `31.5–400 Hz`, `148.5 mm` mounting depth. `10T3S-V4` is a separate thin-line driver at `89 mm` mounting depth. `10T6-V4` is standard-depth at `160.5 mm`; `10T6S-V4` is thin-line at `84 mm`.

### Enclosed Subwoofers

Under-seat enclosed subwoofers:

- `TS-08`
- `TS-10`

Boxed enclosed subwoofers:

- `BXA3/10T3S/V4`
- `BX1/10T3S/V4`
- `BX2/10T3S/V4`
- `BX4/10T3/D4`

Their existing published parameter tables belong on `/car-audio/enclosed-subwoofers/`. Under-seat performance specifications and boxed-enclosure construction specifications remain separate because the source data uses different parameter sets.

The enclosed model `BX4/10T3/D4` remains distinct from the standalone `10T3-D4`; they must not be conflated.

### Amplifiers

- `TD500/4`
- `TD1000/1`
- `TP800/4`
- `TP1200/1`

The amplifier parameter table remains unchanged on `/car-audio/amplifiers/`.

## Product visual system

- Product assets are stored as independent WebP files under `public/images/car-audio/products/` rather than bundled into JavaScript.
- The Car Audio hub uses the approved `car-audio hero` artwork as its hero visual, resized and converted to a web-optimized WebP asset.
- Hub category cards use representative real-product pairs for each of the three categories.
- Each child category page includes a Product Lineup visual grid before its technical comparison content.
- Product grid images open in an enlarged lightbox view so buyers can inspect the product image without leaving the page.
- The hub accessory section retains Tweeter Mount, T6-650 Woofer Grille and T6-65X Coaxial Grille as the currently confirmed accessory set.

## SEO rules

1. All four Car Audio URLs use the repository's existing trailing-slash canonical policy.
2. Each child category page uses a self-referencing canonical.
3. All three child URLs are included in prerender/static route verification and the XML sitemap.
4. Hub section targets are `#speakers`, `#enclosed-subwoofers`, and `#amplifiers`; fragments are not sitemap entries or separate canonical URLs.
5. `/products/` remains focused on Android head units and is not converted into a generic product hub.
6. `/accessories/` is unchanged.

## Paid traffic rules

The category pages may be used as Google Ads Final URLs for category-specific campaigns. This amendment does not create or modify any existing `/landing/` page and does not change any current Ads Final URL.

No new conversion action, Contact query-parameter convention, tracking ID, conversion label, or attribution contract is introduced by this amendment. Existing GCLID/GBRAID/WBRAID/UTM and successful-form-submission tracking rules remain protected.

## Content source

The working factual sources are `Teyes car Audio Catalog 2026.pdf` (14 pages) and the approved `Teyes Car Speaker list.xlsx`. Where the PDF and spreadsheet conflict on a model name or specification, the spreadsheet is authoritative. Product imagery remains catalog-derived. Unverified claims listed in the original integration plan remain prohibited.

## Validation required before merge

- final PR head must receive a successful Netlify deploy preview
- all four Car Audio URLs must load in the preview
- category canonicals and sitemap entries must match the trailing-slash policy
- the approved Car Audio hero asset must load without a broken image path
- all product visual IDs must resolve to repository assets with no broken image paths
- product image lightbox must open, close by button/backdrop/Escape, and remain usable on mobile
- `10T3-D4`, `10T3S-V4`, `10T6-V4`, `10T6S-V4`, and `10V8-V4` cards and technical-table rows must remain on the Speakers page
- TS under-seat and boxed enclosure products and their parameter tables must remain on the Enclosed Subwoofers page
- standard-depth and thin-line subwoofer drivers must remain presented as distinct product structures
- `/products/`, `/accessories/` and existing `/landing/` pages must remain unchanged
- tracking and attribution code must remain unchanged unless separately approved
- PR remains Draft until the applicable merge gates are accepted

## Unchanged guardrails

- no direct implementation on `main`
- no protected SEO URL rename or move
- no canonical changes to existing pages
- no changes to existing Google Ads landing pages
- no GTM / GA4 / Google Ads conversion ID or label changes
- no tracking or lead-capture contract changes unless separately approved
- no unsupported head-unit compatibility claims
