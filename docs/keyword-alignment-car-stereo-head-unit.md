# Keyword Alignment: Car Stereo / Car Radio / Head Unit

Branch: `feature/keyword-alignment-car-stereo-head-unit`

## Reason

Recent traffic keywords show demand around:

- `teyes`
- `teyes cc3`
- `teyes eu`
- `teyes europe`
- `teyes android player`
- `car radio companies`
- `car radio factory`
- `car stereo suppliers`
- `china car audio manufacturers`
- `wholesale car audio`
- `car radio parts suppliers`

The site should keep `head unit` as a core term while adding the search language users already use: `car stereo`, `car radio`, `car audio`, `wholesale`, `factory`, `manufacturer`, and `supplier`.

## Important rule

`head unit` must not be removed. It remains in page titles, meta descriptions, H1/H2 copy, FAQs, and CTAs where relevant.

## Pages updated

- `/`
- `/solutions/distributors`
- `/solutions/market-needs`
- `/products/compare`
- `/accessories`
- `/oem-odm`
- `/oem-odm/capabilities`

## Pages added

- `/solutions/europe-distributors`
- `/resources/china-car-audio-manufacturers-guide`
- `/resources/android-car-stereo-wholesale-guide`

## Sitemap

The new pages were added to `scripts/generate-sitemap.js`.

## Safety notes

- No paid landing page files were changed.
- Existing protected URLs were not renamed.
- Existing pages keep their original routes.
- New pages are additive and can be reviewed before publishing.
- Run `npm run build` and check preview before merge or manual publish.
