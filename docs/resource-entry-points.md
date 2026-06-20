# Resource Entry Points

Branch: `feature/resource-entry-points`

## Goal

Fix the entry-point issue for new keyword-alignment pages.

## Decisions

- `/solutions/europe-distributors` remains semi-hidden.
- Europe Distributor Support is moved into `/solutions/distributors` instead of being promoted through the main navigation or the Resources hub.
- `/resources` is now a normal Resources hub for B2B guides.

## Entry points added

### Resources hub

- Added `/resources`.
- Added `/resources` to header navigation.
- Added `/resources` and the two guides to footer navigation.

### For Distributors

Added a `Wholesale Buying Resources` section linking to:

- `/resources/android-car-stereo-wholesale-guide`
- `/resources/china-car-audio-manufacturers-guide`
- `/solutions/europe-distributors`

### Market Needs

- Removed the direct Europe Distributor Support button.
- Replaced it with a Distributor Program link.

### Product Compare

Added a wholesale buying guide CTA linking to:

- `/resources/android-car-stereo-wholesale-guide`

### OEM / ODM

Added a buyer-guide entry linking to:

- `/resources/china-car-audio-manufacturers-guide`

## Sitemap

Added `/resources` to `scripts/generate-sitemap.js`.

## Safety

- No paid landing pages changed.
- No existing protected URL was renamed.
- No merge or publish action taken.
