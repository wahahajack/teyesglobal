# Phase 1 Accessories Upgrade Notes

Branch: `feature/phase-1-accessories-upgrade`

## Goal

Upgrade `/accessories` from a simple accessory catalog into a B2B distributor-support page while preserving the existing URL and accessory catalog content.

## What changed

- Strengthened SEO metadata for distributor / installer intent.
- Added breadcrumb and FAQ structured data through the existing SEO component.
- Added a B2B intro section explaining why accessories help distributors and installers sell a more complete upgrade.
- Added three accessory bundle recommendations:
  - Premium Upgrade Bundle
  - Safety & Visibility Bundle
  - Essential Starter Bundle
- Preserved the original accessory product list and category browsing experience.
- Added Accessories FAQ for GEO/SEO and pre-sales clarity.
- Added conversion links to:
  - `/contact?intent=accessories`
  - `/solutions/distributors`
  - `/products/compare`
  - `/solutions/market-needs`

## Safety notes

- URL remains `/accessories`.
- Existing accessory product data remains in place.
- No advertising landing pages were touched.
- No change to sitemap or route structure was required because `/accessories` already exists in the route map and sitemap generator.

## Content items to confirm later

| Item | Need owner confirmation? | Notes |
|---|---:|---|
| Bundle naming | Yes | Confirm whether the three bundle names match sales strategy. |
| Accessory compatibility | Yes | Confirm final compatibility for CC4 Pro / CC3 2K / CC4L / LUX ONE. |
| Public prices | Yes | Prices remain in data but are not shown in the product cards. Confirm whether they should stay in source data. |
| FAQ wording | Yes | Confirm after-sales and compatibility wording with technical team. |
| Accessories MOQ / wholesale policy | Yes | Not added yet to avoid unsupported claims. |
