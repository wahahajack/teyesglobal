# TEYES Car Audio Category URL Amendment

**Status:** Approved implementation amendment  
**Date:** 2026-09-01  
**Repository:** `wahahajack/teyesglobal`  
**Branch:** `feature/car-audio-product-line`  
**PR:** #18

This amendment records the approved decision to promote the previously reserved Car Audio category URLs into the current implementation scope. It supplements `2026-09-01-car-audio-product-line-integration.md` and supersedes only the earlier statement that these four category URLs were future IA outside Phase 1.

## Approved URL architecture

```text
/car-audio/
/car-audio/speakers/
/car-audio/subwoofers/
/car-audio/bass-systems/
/car-audio/amplifiers/
```

## Content responsibility

`/car-audio/` remains the B2B Car Audio hub. It introduces the overall portfolio, preserves the existing section anchors, and routes visitors into category-specific pages. It must not duplicate the full technical tables carried by the child category pages.

The four child pages are indexable, self-canonical category pages:

- `/car-audio/speakers/` — T3/T6 component, active 3-way and coaxial speaker range.
- `/car-audio/subwoofers/` — TS under-seat systems plus standard and thin-line 10-inch subwoofer drivers.
- `/car-audio/bass-systems/` — V8 competition subwoofer plus active/passive sealed and ported enclosed bass systems.
- `/car-audio/amplifiers/` — TD and DSP-controlled TP Class D amplifier range.

Complete catalog specification tables belong on the relevant category page. The hub may repeat selected factual highlights needed for orientation, but should not repeat the same full tables or duplicate the same page purpose.

## SEO rules

1. All five Car Audio URLs use the repository's existing trailing-slash canonical policy.
2. Each child category page uses a self-referencing canonical.
3. All four child URLs are included in prerender/static route verification and the XML sitemap.
4. Existing `/car-audio/#speakers`, `#subwoofers`, `#bass-systems`, and `#amplifiers` anchors remain available as hub-page section targets; fragments are not sitemap entries or separate canonical URLs.
5. `/products/` remains focused on Android head units and is not converted into a generic product hub.
6. `/accessories/` is unchanged.

## Paid traffic rules

The category pages may be used as Google Ads Final URLs for category-specific campaigns. This amendment does not create or modify any existing `/landing/` page and does not change any current Ads Final URL.

No new conversion action, Contact query-parameter convention, tracking ID, conversion label, or attribution contract is introduced by this amendment. Existing GCLID/GBRAID/WBRAID/UTM and successful-form-submission tracking rules remain protected.

## Content source

Primary factual source remains `Teyes car Audio Catalog 2026.pdf` (14 pages). Product imagery and specifications must stay within catalog-confirmed information. Unverified claims listed in the original integration plan remain prohibited.

## Unchanged guardrails

- no direct implementation on `main`
- no protected SEO URL rename or move
- no canonical changes to existing pages
- no changes to existing Google Ads landing pages
- no GTM / GA4 / Google Ads conversion ID or label changes
- no tracking or lead-capture contract changes unless separately approved
- no unsupported head-unit compatibility claims
