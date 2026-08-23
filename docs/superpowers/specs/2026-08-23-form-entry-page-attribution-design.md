# Form Entry Page Attribution Design

## Goal

Keep the customer-selected inquiry type unchanged while storing both the form that was submitted and the page from which the visitor entered that form.

## Scope

- Preserve `Inquiry_Type` as the value selected by the visitor.
- Preserve the existing `Lead_Form` source values such as `contact_page`, `manufacturing_quote`, and `distributor_application`.
- Preserve paid-attribution fields, including `Initial_Landing_Page`, GCLID, GBRAID, WBRAID, and UTM values.
- Add a Zoho Lead single-line field named `Form_Entry_Page` that stores a same-origin path and query string, never a full external referrer, capped at 255 characters.

## Data Model

For every lead:

| Field | Meaning | Example |
| --- | --- | --- |
| `Inquiry_Type` | Customer choice in the form | `OEM / ODM Inquiry` |
| `Lead_Form` | Form implementation submitted | `contact_page` |
| `Form_Entry_Page` | Same-site page that led into the form | `/products/cc4-pro/` |
| `Initial_Landing_Page` | First paid-attribution landing URL, when available | `https://teyesglobal.com/?gclid=...` |

If a visitor opens a form URL directly, `Form_Entry_Page` is that form URL's path and query string. If a visitor clicks a same-site CTA before entering a form, it is the CTA page's path and query string. A stored entry-page value is consumed once after a successful lead submission so a later unrelated form does not inherit it.

## Client Flow

1. A same-site CTA that opens a form records its current path and query string in session storage before navigation.
2. The form submission client reads that value; when absent, it derives the current form path and query string.
3. The client includes `formEntryPage` in the Zoho payload.
4. After a successful Zoho response, the client removes the stored value.

The Contact page does not read `intent` to choose an inquiry type. Query parameters remain navigation context only; the visitor continues to choose the inquiry type.

## Server and Zoho Flow

1. The Netlify handler accepts `formEntryPage` as an optional string.
2. It normalizes the value to a same-origin path and query string capped at 255 characters, or an empty value for malformed input.
3. It writes the value only to the new Zoho `Form_Entry_Page` field.
4. Existing payload validation, honeypot handling, per-record Zoho status inspection, and error responses remain unchanged.

Creating the `Form_Entry_Page` custom field in Zoho is an external schema change and requires a separate action-time confirmation before it is performed.

## Testing and Acceptance

- A failing unit test proves a CTA records the source path before it navigates.
- A failing unit test proves a direct Contact submission uses `/contact/` as the entry page.
- A failing Netlify function test proves `formEntryPage` maps to `Form_Entry_Page` and does not overwrite `Initial_Landing_Page`.
- Existing Contact, static lead client, tracking, and Zoho handler tests remain green.
- A preview test submits a marked synthetic lead, then verifies in Zoho that `Lead_Form`, `Form_Entry_Page`, `Inquiry_Type`, and ad-attribution fields are independently populated.

## Out of Scope

- Changing customer-visible inquiry-type defaults.
- Replacing existing Google Ads attribution fields.
- Publishing or deploying production changes without explicit approval.
