# TEYES Car Audio Product Line Integration Plan

**Status:** Approved plan; implementation not started  
**Date:** 2026-09-01  
**Repository:** `wahahajack/teyesglobal`  
**Primary new URL:** `https://teyesglobal.com/car-audio/`  
**Purpose of this document:** This is the persistent source of truth for adding the TEYES Car Audio product line without disrupting the site's existing Android head-unit SEO, indexed URLs, Google Ads landing pages, conversion tracking, or current B2B positioning. New conversations or coding sessions should read this document before making changes.

---

## 1. Executive decision

Add TEYES Car Audio as a **new, independent product family** inside the existing TEYES B2B website. Do **not** restructure the existing `/products/` tree and do **not** treat the new speakers, subwoofers, bass systems, and amplifiers as ordinary head-unit accessories.

Phase 1 should create one strong B2B product hub at:

```text
/car-audio/
```

The existing Android head-unit product structure remains intact:

```text
/products/
/products/lines/
/products/compare/
/products/:productId/
/accessories/
```

The brand positioning should evolve gradually from "smart infotainment / Android head units" toward **"Car Infotainment + Car Audio"**, but the homepage, existing indexed pages, and current advertising landing pages must not be broadly rewritten during Phase 1.

The implementation philosophy is **additive, not reconstructive**.

---

## 2. Business objective

The new product line should let TEYES present a broader in-car entertainment ecosystem to distributors, installers, car-audio wholesalers, and automotive aftermarket partners:

```text
TEYES head unit / source
        ↓
Amplification
        ↓
Speakers
        ↓
Subwoofer / bass system
```

This does **not** authorize technical claims that specific Car Audio models are electrically, acoustically, or mechanically designed for a specific TEYES head unit unless TEYES provides evidence.

### Phase 1 business goals

1. Make the new Car Audio range clearly discoverable from the existing site.
2. Establish a dedicated, indexable SEO/GEO landing hub for the product line.
3. Allow B2B prospects to understand the range without mixing it into the existing head-unit catalog.
4. Create a conversion path for wholesale/distributor inquiries.
5. Preserve the site's currently indexed URLs, head-unit topical relevance, and Google Ads landing-page stability.
6. Create a clean base for later category pages and, only when enough data exists, individual SKU pages.

### Non-goals for Phase 1

- Do not migrate existing `/products/` URLs.
- Do not change existing product-detail URLs.
- Do not create 15-20 thin individual Car Audio SKU pages from catalog tables alone.
- Do not change existing Google Ads Final URLs.
- Do not redesign the entire homepage.
- Do not rewrite current head-unit pages as generic automotive-electronics pages.
- Do not combine the Car Audio range into `/accessories/`.
- Do not claim MOQ, warranty, distributor protection, exclusivity, OEM/ODM capability, certifications, vehicle compatibility, or head-unit compatibility unless confirmed for this product line.

---

## 3. Source material and factual product scope

Primary source supplied for this project:

- `Teyes car Audio Catalog 2026.pdf`, 14 pages, supplied in the ChatGPT conversation on 2026-09-01.

The catalog presents TEYES Car Audio as a distinct range with its own black/orange visual language and the slogan/theme "DETAIL · DYNAMICS · DEPTH".

### Product families confirmed by the catalog

#### 3.1 Speakers

**T3 Series**
- T3-652 component speaker
- T3-65X coaxial speaker

**T6 Series**
- T6-652 component speaker
- T6-653A active 3-way configuration as labeled in catalog
- T6-603A active 3-way configuration as labeled in catalog
- T6-65X coaxial speaker

The catalog supplies rated power, maximum power, nominal impedance, sensitivity, frequency response, and mounting depth for speaker models.

#### 3.2 Under-seat subwoofers

- TS-08 — 8-inch under-seat subwoofer
- TS-10 — 10-inch under-seat subwoofer

The catalog supplies rated power, maximum power, sensitivity, frequency response, frequency control range, dimensions, and net weight.

#### 3.3 Subwoofer drivers

- 10T3-D4
- 10T3S-V4
- 10T6-V4
- 10T6S-V4

The catalog supplies type, rated power, maximum power, nominal impedance, sensitivity, frequency response, and mounting depth.

#### 3.4 Competition bass

- V8 Series — 10V8-V4, 10-inch subwoofer

Catalog values include rated power 600 W, maximum power 1200 W, nominal impedance 4 Ω + 4 Ω, sensitivity 84 dB, frequency response 30 Hz-400 Hz, X-MAX 16 mm, CCAW voice coil, and 165 mm mounting depth.

#### 3.5 Enclosed subwoofers / bass systems

- BXA3-10T3S-V4
- BX1-10T3S-V4
- BX2-10T3S-V4
- BX4-10T3-D4

The catalog identifies active/passive sealed or ported designs, birch plywood enclosures, surface treatments, dimensions, and net weights.

#### 3.6 Power amplifiers

- TD500/4 — Class D
- TD1000/1 — Class D
- TP800/4 — Class D DSP-controlled
- TP1200/1 — Class D DSP-controlled

The catalog supplies RMS power at 4 Ω and/or 2 Ω, bridged output where applicable, product dimensions, and net weight.

#### 3.7 Car Audio accessories

- Tweeter Mount
- T6-650 Woofer Grille
- T6-65X Coaxial Grille

These should live inside the Car Audio section in Phase 1. Do not move or rename the existing `/accessories/` page to accommodate them.

---

## 4. Claims that require verification before publishing

The catalog's company-information page states:

- TEYES founded in 2008
- 108 developers
- 417 patents
- 8,000 m² high-tech manufacturing base in Huizhou
- 3,000,000+ car owners
- 100+ countries

These figures must be reconciled against the website's current public claims before use. The existing website has used different wording/metrics, including a higher user-count figure. Do not publish contradictory metrics simply because both appear in different sources.

The following are **not established by the supplied catalog** and must remain TODOs until confirmed:

- Car Audio MOQ
- wholesale price bands
- warranty period
- distributor/dealer program terms
- exclusive territory rules
- market restrictions
- OEM/ODM availability for Car Audio
- private-label availability
- certifications/compliance for each product
- packaging information
- carton quantity
- lead time
- sample policy
- product lifecycle/status
- formal compatibility with CC4 Pro, CC4, CC4L, CC3 2K, X1 Pro, or other head units
- vehicle-specific fitment
- DSP software/app/control details for TP amplifiers
- protection circuitry / thermal / short-circuit / voltage specifications
- material claims beyond what appears in the catalog

Any final copy must distinguish confirmed catalog data from unverified marketing or technical claims.

---

## 5. Existing indexed URLs: protected assets

As of 2026-09-01, Google Search Console showed the following URLs as indexed / last crawled in the user's screenshot. Treat them as protected assets during this project:

```text
https://teyesglobal.com/
https://teyesglobal.com/products/
https://teyesglobal.com/products/cc4l/
https://teyesglobal.com/contact/?intent=distributor
https://teyesglobal.com/oem-odm/
https://teyesglobal.com/solutions/auto-brands/
https://teyesglobal.com/products/lines/
https://teyesglobal.com/oem-odm/cases/
https://teyesglobal.com/accessories/
https://teyesglobal.com/contact/?intent=oem
https://teyesglobal.com/solutions/distributors/
```

### Mandatory SEO protection rules

1. Do not delete, rename, or move any of the above URLs as part of this project.
2. Do not create 301 redirects for them merely to make the new information architecture look cleaner.
3. Do not change their canonical targets unless a separate SEO issue is independently proven and approved.
4. Do not change `/products/` from a focused Android-head-unit page into a generic all-products hub in Phase 1.
5. Do not change `/accessories/` into a mixed head-unit + speaker/subwoofer/amp catalog.
6. Do not change existing product-detail URL patterns.
7. Preserve the trailing-slash canonical policy used by the repository.
8. New Car Audio URLs must follow the same canonical trailing-slash policy.
9. Preserve existing robots behavior and sitemap entries; add `/car-audio/` rather than replacing anything.
10. Homepage modifications must be additive and should not remove existing primary content, H1, major CTA structure, or head-unit product ladder.
11. Existing title/description changes outside the new Car Audio page are out of scope unless specifically approved.
12. Do not add `noindex`, alternate canonical, or redirect rules to current indexed pages during this project.

### Important separate issue

The fact that query-parameter contact URLs such as `?intent=distributor` and `?intent=oem` have been indexed is worth reviewing separately. Do **not** mix that canonical/indexation cleanup into the Car Audio implementation. It should be a separate task with its own evidence and rollback plan.

---

## 6. Current repository architecture relevant to this plan

Current code confirms:

- `/products/` is explicitly positioned as "Car Infotainment Products - Android Head Units".
- Product routes use `/products/:productId`.
- Header `Products` currently contains Product Lines, Compare Models, and Accessories.
- Static public routes are defined in `scripts/routes.mjs`.
- `scripts/routes.mjs` states that the route list must stay synchronized with `scripts/generate-sitemap.js`, and build verification enforces this.
- Canonical policy is trailing slash everywhere.
- Page-journey and attribution tracking exists in `src/lib/tracking.ts`.

### Expected implementation files

The implementation agent must verify these paths before editing, but the likely files are:

```text
src/App.tsx
src/components/layout/Header.tsx
src/pages/Index.tsx
src/components/home/ProductsSection.tsx              # inspect before deciding placement
src/pages/car-audio/CarAudio.tsx                     # new, preferred organization
src/components/car-audio/*                           # optional reusable sections
src/assets/...                                       # optimized Car Audio imagery
scripts/routes.mjs
scripts/generate-sitemap.js
src/lib/tracking.ts                                  # verify only; change only if required
src/test/tracking-contract.test.ts                   # only if tracking contract changes
src/lib/leadCapture.test.ts                          # only if lead-capture contract changes
public/sitemap.xml                                   # generated artifact; follow repo's existing rules
```

Do not assume every listed file must be modified. Inspect current code first and make the smallest safe change set.

---

## 7. Target information architecture

### Phase 1 navigation

```text
Home
│
├── Products
│   ├── Android Head Units      → /products/
│   ├── Car Audio               → /car-audio/
│   ├── Product Lines           → /products/lines/
│   ├── Compare Head Units      → /products/compare/
│   └── Accessories             → /accessories/
│
├── Solutions
├── OEM / ODM
└── Contact
```

Notes:

- Keep the parent `Products` href pointing to `/products/` unless a later architecture project explicitly changes it.
- Rename the dropdown label `Compare Models` to `Compare Head Units` only if this text-only clarification does not create UI regressions.
- Do not rename `/products/lines/` or `/products/compare/` URLs.
- `/car-audio/` is a sibling product family, not a child of `/accessories/`.

### Future IA, not Phase 1

Only after content depth and search demand justify it:

```text
/car-audio/
/car-audio/speakers/
/car-audio/subwoofers/
/car-audio/amplifiers/
/car-audio/bass-systems/
```

Individual model pages should come later, only when each page has enough original technical, commercial, application, installation, and conversion content to avoid thin-page proliferation.

---

## 8. `/car-audio/` page strategy

The page should function as a **B2B product hub**, not as a PDF pasted into HTML and not as an ecommerce category grid.

### Recommended page structure

#### Section 1 — Hero

Purpose:
- immediately establish TEYES Car Audio as a real product family
- retain B2B context
- visually distinguish the sub-brand while staying inside the TEYES site shell

Working direction, not final copy:

```text
TEYES Car Audio
Detail. Dynamics. Depth.
Speakers, subwoofers, bass systems and amplifiers for the automotive aftermarket.
```

Primary CTA:
- `Request Wholesale Information` or equivalent, destination to be confirmed

Secondary CTA:
- `View Product Range`

Catalog download should be offered only after deciding where the approved PDF will be hosted and how downloads are tracked.

#### Section 2 — Product family overview

Four primary cards:

1. Speakers
2. Subwoofers
3. Bass Systems
4. Amplifiers

Optional fifth, lower-priority card:

5. Car Audio Accessories

Each card should explain the role in the system and list representative series/models. Do not invent application claims.

#### Section 3 — Speakers

Present T3 and T6 families with:

- product image
- series name
- component vs coaxial classification
- selected catalog-confirmed specifications
- concise positioning based only on catalog-supported differences

Use comparison tables where useful.

#### Section 4 — Under-seat and custom-fit subwoofers

Cover:

- TS-08
- TS-10
- 10T3-D4
- 10T3S-V4
- 10T6-V4
- 10T6S-V4

Do not call products "vehicle-specific" or "custom-fit for specific cars" unless fitment evidence is supplied. The catalog uses the heading "Custom-Fit Subwoofers"; website copy should avoid implying vehicle fitment beyond what can be proven.

#### Section 5 — Bass systems

Cover:

- V8 Competition Series
- enclosed subwoofer series BXA3 / BX1 / BX2 / BX4

Explain sealed/ported/active/passive classifications only according to catalog data.

#### Section 6 — Amplifiers

Cover TD and TP:

- TD500/4
- TD1000/1
- TP800/4
- TP1200/1

Clearly identify the TP models as DSP-controlled because the catalog explicitly labels them that way. Do not add unsupported DSP feature claims.

#### Section 7 — Complete TEYES in-car entertainment ecosystem

Use a simple systems diagram:

```text
TEYES Infotainment / Head Unit
          ↓
       Amplifier
          ↓
        Speakers
          ↓
     Subwoofer / Bass
```

Copy must communicate product-portfolio breadth, not guaranteed technical compatibility.

Preferred wording principle:

> "Build a broader TEYES in-car entertainment offer across source, amplification, speakers and bass."

Avoid:

> "All TEYES speakers and amplifiers are designed specifically for CC4 Pro."

unless TEYES confirms it.

#### Section 8 — Technical comparison

Provide compact tables by product family. Do not create one enormous specification table containing every model.

Recommended comparison fields:

**Speakers**
- type
- rated power
- max power
- impedance
- sensitivity
- frequency response
- mounting depth

**Subwoofers**
- type / size
- rated power
- max power
- impedance
- sensitivity
- frequency response
- mounting depth

**Amplifiers**
- class
- RMS @ 4 Ω
- RMS @ 2 Ω
- bridged power if applicable
- dimensions
- net weight

#### Section 9 — B2B cooperation

Until commercial policies are confirmed, keep copy intentionally conservative.

Allowed direction:

- ask for wholesale information
- ask for distributor availability by market
- request model/specification list
- contact TEYES B2B team

Do not publish unconfirmed minimum order, exclusivity, lead time, warranty, or dealership promises.

#### Section 10 — CTA / inquiry

Goal:
- capture a clearly attributable Car Audio inquiry

Preferred implementation order:

1. Reuse the existing, stable lead/contact infrastructure if it can preserve product-interest attribution without changing current Ads forms.
2. If a new form is needed, build it as an isolated component and test it separately.
3. Do not modify current production landing-page form behavior merely to support this page.

---

## 9. Visual system

The Car Audio catalog already has a distinct sub-brand language:

- black / deep charcoal background
- white typography
- orange accent / glow
- high-contrast product imagery
- premium technical presentation

### Implementation direction

Use the existing TEYES site header/footer/layout and interaction conventions, but allow the main `/car-audio/` content area to use the black/orange sub-brand system.

The result should communicate:

> "TEYES Car Audio is a second major TEYES product family"

not:

> "This is a completely unrelated microsite"

and not:

> "These are just accessories beneath Android head units."

### Image rules

- Do not screenshot catalog pages and use them as website sections.
- Extract or obtain original product artwork where possible.
- If only catalog visuals are available, obtain/prepare usable web images with adequate resolution and rights.
- Optimize output to WebP/AVIF where consistent with the repository's image pipeline.
- Set meaningful width/height and responsive `srcset` where appropriate.
- Product images must have factual alt text, not keyword stuffing.
- Avoid huge hero assets that damage LCP.

---

## 10. Homepage change scope

The homepage should not be repositioned wholesale in Phase 1.

### Add one Car Audio section

Recommended placement:

- after the existing product/head-unit product-ladder area, or another location that preserves the current narrative
- before lower-funnel corporate/solution content if visually appropriate

The exact insertion point must be chosen after inspecting the current rendered homepage.

### Homepage section content

At minimum:

- `TEYES Car Audio`
- one-sentence description
- product-family labels: Speakers / Subwoofers / Amplifiers / Bass Systems
- one strong image or controlled visual group
- CTA to `/car-audio/`

### Do not change in Phase 1

- homepage URL
- homepage canonical
- primary H1 unless separately approved
- current main head-unit positioning
- primary paid-traffic path
- existing critical conversion CTAs
- existing structured-data meaning unless the new section requires a small, justified addition

The homepage modification must look additive when diffed against the current site.

---

## 11. SEO implementation details

### 11.1 New route

Add application route:

```text
/car-audio
```

Canonical output must be:

```text
https://teyesglobal.com/car-audio/
```

### 11.2 SEO metadata

Final title and description should be written from verified content and B2B search intent. Working direction:

**Title direction**

```text
TEYES Car Audio - Speakers, Subwoofers & Amplifiers
```

**Description direction**

```text
Explore TEYES Car Audio speakers, subwoofers, enclosed bass systems and power amplifiers for automotive aftermarket distributors and car audio channels.
```

Do not overstuff `wholesale`, `manufacturer`, `OEM`, and `distributor` claims unless the page actually supports those intents.

### 11.3 Internal links

Minimum internal links to `/car-audio/`:

- global Products dropdown
- homepage Car Audio section
- optional contextually relevant link from `/products/` only if it can be added without changing the head-unit page's primary focus
- footer only if consistent with existing footer architecture

Do not scatter exact-match SEO anchors across unrelated pages.

### 11.4 Sitemap and prerender

The repository currently requires static routes and generated sitemap URLs to stay synchronized.

Implementation must therefore:

1. Add `/car-audio` to `scripts/routes.mjs` `STATIC_ROUTES`.
2. Add the corresponding source/page entry to `scripts/generate-sitemap.js` according to its existing structure.
3. Run the existing build and SEO verification pipeline.
4. Confirm generated sitemap contains exactly one canonical Car Audio URL with trailing slash.
5. Confirm the generated/prerendered HTML contains visible body content, one H1, canonical, title, and meta description.
6. Preserve all existing sitemap URLs.

### 11.5 Structured data

Use only schema already supported by the site's SEO architecture and justified by page content.

Likely candidates:

- BreadcrumbList
- WebPage / CollectionPage depending existing component behavior

Do not create Product structured data for every catalog model unless the page contains the required factual fields and the implementation is valid for the visible content.

### 11.6 Indexing

After production validation:

- verify `/car-audio/` returns 200
- verify self-canonical with trailing slash
- verify `index,follow`
- verify no redirect chain
- verify sitemap inclusion
- request indexing in GSC if desired

Do not resubmit or request removal of the protected existing URLs as part of this launch.

---

## 12. Google Ads protection plan

The Car Audio project must not destabilize current Android head-unit paid traffic.

### Hard rules

1. Do not change current Google Ads Final URLs as part of website implementation.
2. Do not rewrite the main content of existing paid landing pages.
3. Do not change existing landing-page conversion forms unless independently required and tested.
4. Do not change GTM/Google Ads conversion IDs or labels.
5. Do not merge Car Audio search terms into existing head-unit ad groups during website launch.
6. Do not automatically send existing paid traffic to `/car-audio/`.

### Final URL expansion risk check

Before launch, manually inspect relevant campaigns for:

- Search AI Max Final URL Expansion
- Performance Max Final URL Expansion
- any campaign setting that permits Google to choose other pages from the domain

If an existing head-unit campaign must remain tightly scoped, add `/car-audio/` to the appropriate URL exclusion before or immediately after launch according to the campaign type and current account settings.

This is an Ads-account task, not a code change.

### Future Car Audio advertising

If Car Audio proves commercially viable, create a separate campaign structure, for example:

```text
Campaign: TEYES Car Audio B2B

Ad groups / themes:
- Car Audio Distributor / Wholesale
- Car Speakers
- Car Amplifiers
- Car Subwoofers
- TEYES Car Audio branded demand
```

Initial landing URL:

```text
https://teyesglobal.com/car-audio/
```

Only split category landing pages after search volume and conversion data justify the work.

---

## 13. Tracking, attribution, CRM, and conversion handling

### Important correction / implementation note

`src/lib/tracking.ts` currently contains `FORM_ENTRY_TARGET_PATHS`, but this set represents form-entry destination paths such as `/contact/` and dedicated landing pages. It is **not** a generic list of all content pages that should be tracked.

Therefore:

- Do **not** blindly add `/car-audio/` to `FORM_ENTRY_TARGET_PATHS`.
- First verify how page-journey recording works for ordinary content pages.
- Confirm a visitor path containing `/car-audio/` is captured when the visitor later goes to Contact or another form target.
- Modify the tracking contract only if a real gap is demonstrated.

### Desired lead attribution

The CRM should ideally be able to distinguish:

```text
Product Interest = Car Audio
```

and later, if useful:

```text
Car Audio Category = Speakers
Car Audio Category = Subwoofers
Car Audio Category = Amplifiers
Car Audio Category = Bass Systems
```

But do not invent Zoho fields or break an existing production schema.

### Implementation decision tree

1. Inspect current Contact form fields and Netlify/Zoho payload mapping.
2. Check whether an existing product-interest field can represent Car Audio.
3. If yes, reuse it.
4. If no, define a backward-compatible optional field first.
5. Update server-side validation and Zoho mapping only after confirming the target Zoho field/API name.
6. Add tests for any contract change.
7. Existing form submissions without the new field must continue working unchanged.

### Avoid query-parameter proliferation

Because GSC already shows indexed Contact URLs with `?intent=` parameters, do not casually introduce crawlable links such as:

```text
/contact/?intent=distributor&product=car-audio
```

unless canonical/index behavior is deliberately handled.

Prefer one of:

- existing Contact flow with product selection
- session state / hidden field set by CTA behavior
- a dedicated Car Audio form on `/car-audio/`
- another implementation that does not create unnecessary indexable parameter variants

The final choice should be based on the current code after inspection.

---

## 14. Development work breakdown

### Phase 0 — Pre-implementation audit

- [ ] Read this plan completely.
- [ ] Inspect current `main` HEAD and note commit SHA.
- [ ] Confirm working tree/branch state before changes.
- [ ] Run current tests/build to establish baseline.
- [ ] Inspect the live homepage and `/products/`, `/accessories/`, `/contact/`.
- [ ] Confirm current sitemap and trailing-slash behavior.
- [ ] Confirm current Header mobile + desktop behavior.
- [ ] Inspect Contact/lead-capture implementation before defining CTA behavior.
- [ ] Confirm which Car Audio images are available beyond the PDF.
- [ ] Confirm whether the catalog PDF itself may be publicly hosted/downloaded.
- [ ] Record unresolved commercial/technical claims.

**Gate:** Do not start broad code changes if the baseline build is failing for unrelated reasons. Document them first.

### Phase 1 — Route and page skeleton

- [ ] Create `src/pages/car-audio/CarAudio.tsx` or equivalent consistent path.
- [ ] Add lazy import/routing in `src/App.tsx`.
- [ ] Add SEO component with `/car-audio/` path.
- [ ] Add breadcrumb Home → Car Audio.
- [ ] Add one H1 only.
- [ ] Use verified content only.
- [ ] Ensure page returns proper 200 route in production routing model.

**Gate:** Page renders standalone before global navigation changes.

### Phase 2 — Car Audio content build

- [ ] Hero
- [ ] Product-family overview
- [ ] Speakers section
- [ ] Under-seat/custom subwoofer section
- [ ] Bass systems section
- [ ] Amplifier section
- [ ] Product comparison tables
- [ ] Complete-system ecosystem section
- [ ] B2B cooperation block using conservative language
- [ ] CTA/inquiry block
- [ ] Optional catalog-download block only if approved

**Gate:** Every technical figure is traceable to the supplied catalog or another approved source.

### Phase 3 — Navigation integration

- [ ] Update Products dropdown in `src/components/layout/Header.tsx`.
- [ ] Add `Android Head Units` → `/products/`.
- [ ] Add `Car Audio` → `/car-audio/`.
- [ ] Preserve Product Lines URL.
- [ ] Preserve Accessories URL.
- [ ] Optionally clarify `Compare Models` → `Compare Head Units` without changing its URL.
- [ ] Verify desktop hover/dropdown behavior.
- [ ] Verify mobile menu behavior.
- [ ] Verify active-state behavior: current `startsWith` logic may make the parent `Products` active only for `/products/*`; decide whether Car Audio needs product-family active highlighting without changing URLs.

**Gate:** Existing menu URLs remain intact.

### Phase 4 — Homepage integration

- [ ] Inspect the rendered homepage first.
- [ ] Add one Car Audio section without replacing existing head-unit content.
- [ ] Link to `/car-audio/`.
- [ ] Preserve H1 and existing main CTA hierarchy.
- [ ] Confirm section does not dominate the page above the established main product positioning.
- [ ] Check CLS/LCP/image-loading impact.

**Gate:** Before/after review confirms change is additive, not a homepage repositioning.

### Phase 5 — Sitemap, prerender, SEO contracts

- [ ] Add `/car-audio` to `scripts/routes.mjs`.
- [ ] Add matching source entry to `scripts/generate-sitemap.js`.
- [ ] Confirm route parity verification passes.
- [ ] Confirm generated HTML includes actual body copy.
- [ ] Confirm one H1.
- [ ] Confirm title, description, canonical.
- [ ] Confirm canonical is `https://teyesglobal.com/car-audio/`.
- [ ] Confirm index/follow.
- [ ] Confirm sitemap preserves all existing protected URLs.
- [ ] Confirm no new redirect rule impacts existing URLs.

### Phase 6 — Tracking and lead attribution

- [ ] Verify ordinary page journey captures `/car-audio/` before Contact navigation.
- [ ] Do not add `/car-audio/` to `FORM_ENTRY_TARGET_PATHS` unless its functional role requires it.
- [ ] Inspect existing product-interest / inquiry fields.
- [ ] Reuse existing field if possible.
- [ ] If new optional field is necessary, confirm Zoho API field before coding.
- [ ] Ensure old submissions remain backward compatible.
- [ ] Add/update tests only for actual contract changes.
- [ ] Test form submission from a Car Audio visitor path.
- [ ] Confirm GCLID/GBRAID/WBRAID/UTM behavior remains unchanged.
- [ ] Confirm current Google Ads conversion event remains unchanged unless a new Car Audio-specific conversion is intentionally created later.

### Phase 7 — Performance and accessibility

- [ ] Optimize all new images.
- [ ] Avoid shipping PDF-resolution images directly.
- [ ] Ensure image dimensions are explicit.
- [ ] Ensure meaningful alt text.
- [ ] Check contrast for orange/black sections.
- [ ] Check keyboard navigation.
- [ ] Check heading hierarchy.
- [ ] Check mobile layout at common breakpoints.
- [ ] Avoid horizontal overflow in specification tables.
- [ ] Use responsive table/card strategy on narrow screens.

### Phase 8 — Test and build

Run the repository's existing commands according to `package.json`. At minimum, use the established test/type/lint/build process rather than inventing a new one.

Required validations:

- [ ] unit tests pass
- [ ] TypeScript checks pass
- [ ] lint passes
- [ ] production build passes
- [ ] prerender passes
- [ ] SEO dist verification passes
- [ ] sitemap parity passes
- [ ] existing indexed routes still generate valid output
- [ ] no unexpected generated-file churn is committed

### Phase 9 — Preview QA

On Netlify preview or equivalent:

- [ ] `/car-audio/` returns 200
- [ ] design matches desktop expectation
- [ ] mobile design reviewed
- [ ] navigation works
- [ ] homepage CTA works
- [ ] no broken product images
- [ ] no console errors
- [ ] no network 404s
- [ ] canonical correct
- [ ] title/description correct
- [ ] robots correct
- [ ] form/CTA behavior correct
- [ ] page journey includes Car Audio visit if expected
- [ ] current head-unit paid landing pages are unchanged in all material areas
- [ ] current `/products/` metadata and primary content remain head-unit focused
- [ ] `/accessories/` remains intact

### Phase 10 — Ads safety check before production

Manual Google Ads check:

- [ ] identify current campaigns using teyesglobal.com
- [ ] record current Final URLs
- [ ] check AI Max / Final URL Expansion on Search
- [ ] check URL Expansion on Performance Max where applicable
- [ ] if required, exclude `/car-audio/` from existing head-unit campaigns
- [ ] do not change current bids, keywords, conversion goals, or landing pages merely because Car Audio is launching

### Phase 11 — Production deployment

- [ ] capture current production commit/deploy ID for rollback
- [ ] deploy approved preview
- [ ] smoke-test homepage
- [ ] smoke-test `/products/`
- [ ] smoke-test `/products/cc4l/`
- [ ] smoke-test `/products/lines/`
- [ ] smoke-test `/accessories/`
- [ ] smoke-test `/oem-odm/`
- [ ] smoke-test `/solutions/distributors/`
- [ ] smoke-test `/car-audio/`
- [ ] validate Contact/inquiry flow
- [ ] validate GTM/GA4/Google Ads conversion behavior if a form is exercised
- [ ] verify sitemap on production
- [ ] verify robots on production

### Phase 12 — Post-launch monitoring

First 24-72 hours:

- [ ] no 404/5xx increase related to changed routes
- [ ] no build/deploy regressions
- [ ] no sudden paid-landing-page behavior changes
- [ ] no unexpected redirects
- [ ] `/car-audio/` crawlable

First 2-4 weeks:

- [ ] GSC discovers/indexes `/car-audio/`
- [ ] review impressions/queries
- [ ] review page engagement
- [ ] review Car Audio inquiries separately where attribution supports it
- [ ] identify whether category pages are justified
- [ ] do not create SKU pages simply because indexing is successful

---

## 15. Acceptance criteria

The Phase 1 implementation is accepted only when all of the following are true:

### Information architecture

- [ ] `/car-audio/` exists as an independent product hub.
- [ ] `/products/` remains Android-head-unit focused.
- [ ] `/accessories/` remains the existing accessory area.
- [ ] existing URLs have not been renamed/moved.

### Content

- [ ] all listed product families in the catalog are represented accurately.
- [ ] no unsupported commercial or compatibility claims are published.
- [ ] B2B context is clear.
- [ ] page is not a thin catalog-copy page.

### SEO

- [ ] `/car-audio/` is 200/indexable/self-canonical.
- [ ] canonical uses trailing slash.
- [ ] sitemap and prerender include the page.
- [ ] build SEO verification passes.
- [ ] protected existing canonical URLs remain unchanged.
- [ ] `/products/` title/topic remains focused on Android head units.

### Ads

- [ ] no existing Final URL changed.
- [ ] no paid landing page materially rewritten.
- [ ] Final URL Expansion risk was checked.

### Tracking

- [ ] existing attribution still works.
- [ ] existing submissions still work.
- [ ] Car Audio interest can be identified if the data model safely supports it, or the limitation is documented rather than guessed.

### UX/performance

- [ ] mobile and desktop pass review.
- [ ] no broken media.
- [ ] no serious LCP/CLS regression caused by new homepage assets.
- [ ] specification tables are usable on mobile.

---

## 16. Rollback plan

The launch must be reversible without touching existing indexed URLs.

### Fast rollback

If the new page causes a serious production issue:

1. Roll Netlify/production back to the immediately previous known-good deploy.
2. Do not attempt emergency redirects from existing indexed URLs.
3. Diagnose the Car Audio commit/PR separately.

### Partial rollback

If only Car Audio has a problem:

- remove/revert the homepage Car Audio section
- remove/revert the navigation link
- revert `/car-audio/` route/content and sitemap registration

No existing `/products/`, `/accessories/`, `/oem-odm/`, or `/solutions/` URL needs to change.

### Ads rollback

If Google Ads starts selecting `/car-audio/` unexpectedly:

- use campaign URL exclusions / Final URL Expansion controls
- do not delete the Car Audio page solely to solve Ads routing

---

## 17. Decisions intentionally deferred

Do not resolve these by assumption:

1. Exact final homepage brand descriptor (e.g. whether to change to "Car Infotainment & Car Audio Solutions").
2. Whether `/products/` should become a global product hub in a future major IA migration.
3. Whether category subpages should launch.
4. Whether individual SKU pages should launch.
5. Whether Car Audio uses the same distributor MOQ and commercial terms as head units.
6. Whether Car Audio is included in the existing OEM/ODM proposition.
7. Whether the PDF becomes a public downloadable catalog.
8. Whether a dedicated Car Audio Google Ads campaign will be created.
9. Whether a separate Car Audio conversion action is needed.
10. Whether query-parameter Contact URL indexation should be cleaned up.

Each deferred item should be handled as its own decision/task when evidence is available.

---

## 18. Suggested future Phase 2

Only after Phase 1 has data and sufficient content:

### Potential category pages

```text
/car-audio/speakers/
/car-audio/subwoofers/
/car-audio/amplifiers/
/car-audio/bass-systems/
```

Create a category page only if it can provide meaningful unique value such as:

- complete specifications
- installation/application guidance
- dimensional drawings
- series comparison
- channel positioning
- FAQ
- distributor information
- original photography
- technical evidence

### SKU pages

Individual models should require a minimum content pack before creation:

- verified complete specifications
- dimensions / mounting data
- product images
- differentiators against sibling models
- application/use case
- packaging/ordering data where publishable
- warranty/compliance where verified
- CTA and B2B context

No auto-generated thin SKU pages.

---

## 19. New-session handoff summary

When continuing this work in another ChatGPT/Codex conversation, start with:

> Read `docs/superpowers/plans/2026-09-01-car-audio-product-line-integration.md` first. It is the approved source of truth for the TEYES Car Audio website integration. Do not redesign the information architecture from scratch. Preserve all existing indexed URLs and canonicals, keep `/products/` focused on Android head units, add Car Audio as `/car-audio/`, make homepage changes additive, protect current Google Ads landing pages/Final URLs, and do not publish unverified Car Audio commercial or compatibility claims. Before coding, inspect current `main`, run baseline tests/build, and follow the phase gates and acceptance criteria in the plan.

### Critical context to retain

- New product line is real, broad, and independent: speakers, subwoofers, bass systems, amplifiers, audio accessories.
- It should **not** be placed inside existing `/accessories/`.
- Phase 1 uses one strong `/car-audio/` hub.
- Existing indexed routes are protected.
- Existing `/products/` remains head-unit focused.
- Existing Google Ads Final URLs must not change.
- Homepage change is additive only.
- Black/orange Car Audio visual language should be used inside the existing TEYES shell.
- Do not create thin SKU pages yet.
- Verify B2B terms/claims before publishing.
- `FORM_ENTRY_TARGET_PATHS` is not a general content-page tracking list; do not add `/car-audio/` blindly.
- Sitemap/static routes are build-enforced and must be kept synchronized.

---

## 20. Definition of done for this planning task

This planning task is complete when this document exists in the repository and is treated as the canonical implementation brief. No production website code is authorized by the creation of this plan alone.
