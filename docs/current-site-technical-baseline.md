# TEYES Global Current Site Technical Baseline

Phase 0 repository-level baseline captured before implementation work.

## Repository metadata

- Repository: `wahahajack/teyesglobal`
- Default branch: `main`
- Project stack: Vite, React, TypeScript, shadcn-ui, Tailwind CSS.
- Build command from `package.json`: `npm run generate-sitemap && vite build && npm run generate-sitemap && node scripts/inline-css.js && node scripts/prune-deploy-assets.js`
- Sitemap script: `scripts/generate-sitemap.js`
- SEO component: `src/components/SEO.tsx`

## Active route map from `src/App.tsx`

### Core

| Route | Page |
|---|---|
| `/` | `src/pages/Index` |
| `/contact` | `src/pages/Contact` |
| `/thank-you` | `src/pages/HomeThankYou` |

### Products

| Route | Page |
|---|---|
| `/products` | `src/pages/products/Products` |
| `/products/lines` | `src/pages/products/ProductLines` |
| `/products/compare` | `src/pages/products/ProductCompare` |
| `/products/:productId` | `src/pages/products/ProductDetail` |

### Solutions

| Route | Page |
|---|---|
| `/solutions` | `src/pages/solutions/Solutions` |
| `/solutions/distributors` | `src/pages/solutions/SolutionsDistributors` |
| `/solutions/auto-brands` | `src/pages/solutions/SolutionsAutoBrands` |
| `/solutions/integrators` | `src/pages/solutions/SolutionsIntegrators` |
| `/solutions/market-needs` | `src/pages/solutions/SolutionsMarketNeeds` |

### OEM/ODM

| Route | Page |
|---|---|
| `/oem-odm` | `src/pages/oem/OemOdm` |
| `/oem-odm/capabilities` | `src/pages/oem/OemCapabilities` |
| `/oem-odm/certifications` | `src/pages/oem/OemCertifications` |
| `/oem-odm/cases` | `src/pages/oem/OemCases` |

### Frozen campaign landing pages

| Route | Page | Status |
|---|---|---|
| `/landing/oem` | `src/pages/landing/LandingOem` | Frozen |
| `/landing/market-entry` | `src/pages/landing/LandingMarketEntry` | Frozen |
| `/landing/distributor` | `src/pages/landing/LandingDistributor` | Frozen |

### Accessories

| Route | Page |
|---|---|
| `/accessories` | `src/pages/Accessories` |

## Sitemap baseline

The sitemap generator includes these static pages:

- `/`
- `/products`
- `/products/lines`
- `/products/compare`
- `/solutions`
- `/solutions/distributors`
- `/solutions/auto-brands`
- `/solutions/integrators`
- `/solutions/market-needs`
- `/oem-odm`
- `/oem-odm/capabilities`
- `/oem-odm/certifications`
- `/oem-odm/cases`
- `/landing/oem`
- `/landing/market-entry`
- `/landing/distributor`
- `/accessories`
- `/contact`

The sitemap generator also reads product IDs from `src/data/products.ts` and creates `/products/:id` URLs.

`/thank-you` is intentionally excluded from sitemap indexing.

## SEO component baseline

`src/components/SEO.tsx` currently supports:

- Standard title and description.
- Canonical URL.
- Optional noindex.
- Open Graph and Twitter metadata.
- Raw JSON-LD.
- Product JSON-LD.
- BreadcrumbList JSON-LD.
- FAQPage JSON-LD.
- HowTo JSON-LD.

This is enough for Phase 1 low-risk SEO/GEO improvements without adding a new SEO library.

## Phase 0 limitation

This baseline captures the repository state only. It does not contain Search Console query exports, GA4 traffic exports, or Ads conversion reports. Those must be exported separately by the owner or from the relevant platform integrations.