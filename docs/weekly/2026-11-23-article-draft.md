# EU CRA for Android Head Unit Importers: A Supplier-Diligence Checklist After EN 40000-1-2

The EU's new cybersecurity standards do **not** create an instant “CRA certificate” for an Android head unit. They do give manufacturers and economic operators a more concrete framework for product risk management across design, production, maintenance, end of support and decommissioning.

For an EU importer, the practical next step is to assess the exact product and route to market, then ask the supplier for evidence tied to the hardware and software configuration being purchased. Do not assume that every automotive product is excluded from the Cyber Resilience Act (CRA), and do not assume that every aftermarket head unit is automatically in scope.

This guide explains the November 2026 changes and turns them into a supplier due-diligence checklist. It does not replace the importer's full duties under the CRA. It is general commercial guidance, not legal advice or a scope decision for a particular product.

## What changed in November 2026?

The European Commission [issued non-binding CRA guidance on 27 July 2026](https://digital-strategy.ec.europa.eu/en/library/commission-publishes-new-guidance-support-timely-cyber-resilience-act-implementation). That guidance appeared in the Official Journal as [OJ C/2026/6013 on 17 November](https://data.europa.eu/eli/C/2026/6013/oj). It explains the Commission's interpretation of how the automotive-sector exclusion should be assessed; it is not a product-specific legal decision. A connected component can sit outside the CRA where it is exclusively designed and constructed for integration into vehicles covered by Regulation (EU) 2019/2144 or Regulation (EU) No 168/2013, and is clearly intended and suitable only for that integration.

The same guidance draws a different line for generic digital components. It treats a component that is not exclusively suitable for those vehicles and is offered through channels open beyond the automotive supply chain—such as general retail or online sales to the public—as within CRA scope. A restricted business-to-business automotive channel may indicate exclusive vehicle integration, but the assessment still depends on the product and the objective conditions in which it is supplied.

The standards became available on 18 November, and [CEN-CENELEC announced the two publications on 19 November](https://www.cencenelec.eu/news-events/news/2026/en-in-the-spotlight/2026-11-19-cra-standards-en-40000-1-1-and-en-40000-1-2/):

- **EN 40000-1-1** establishes common cybersecurity vocabulary.
- **EN 40000-1-2** establishes general principles, product risk-management activities and lifecycle activities.

EN 40000-1-2 is a horizontal foundation. CEN-CENELEC says further standards are still being developed for vulnerability handling, generic security requirements and individual product categories. Under [Article 27 of the CRA](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R2847), a presumption of conformity depends on a harmonised standard's reference being published in the Official Journal and only covers the requirements addressed by that standard. No such OJEU reference for EN 40000-1-1 or EN 40000-1-2 was identified by this article's 23 November 2026 research cutoff. Availability of the standards is therefore a useful procurement milestone, not proof that a particular head unit is certified, fully conformant or entitled to an Article 27 presumption.

## First decide whether the exact product is in scope

“It goes in a car” is not a sufficient scope assessment. For each product family or configuration, record the facts behind the conclusion.

Start with four questions:

1. **What exactly is being placed on the EU market?** Identify the head unit, included connectivity modules, installed software, companion applications and any remote data processing that supports product functions.
2. **Is it exclusively designed and constructed for covered vehicles?** Document whether the hardware and software are clearly intended and suitable only for integration into vehicles covered by the relevant EU vehicle rules.
3. **How is it offered?** General retail or direct-to-consumer online availability is relevant to the Commission's test. A restricted automotive B2B channel can point the other way, but it does not replace the product analysis.
4. **Do variants change the cybersecurity profile?** Screen size or cosmetic differences may not matter, while a different connectivity module, update mechanism, operating-system branch or cloud dependency can matter.

Where the answer is uncertain, the importer should obtain a product-specific assessment before relying on an exclusion. Keep the assessment with the commercial and technical records for the SKU.

## What EN 40000-1-2 changes in supplier review

The standard moves the conversation away from a one-time security check. The expected evidence should describe how cybersecurity risks are managed through the product lifecycle.

That matters for an Android head unit because the delivered product is more than a screen and processor. Its risk profile can depend on the firmware image, operating-system components, wireless connections, update path, companion software and services used to support functions.

The Commission's guidance also says a manufacturer may treat variants together where they share the same architecture, security-relevant design, intended purpose and cybersecurity risks. Differences that affect security properties need separate treatment. For a mixed-model wholesale order, that makes the platform and software map as important as the carton-level SKU list.

## A supplier due-diligence checklist for EU importers and distributors

| Evidence to request | What the importer is trying to establish | A weak answer to challenge |
| --- | --- | --- |
| Written scope assessment for the exact product or product family | Why the CRA applies, or why a defined exclusion is being used | “Automotive products are exempt” without product and channel facts |
| Hardware, firmware and software identity by SKU | Which delivered versions the evidence covers | One generic certificate or document for the whole brand |
| Cybersecurity risk-management owner and process | Who maintains the assessment from design through end of support | A final pre-shipment check with no lifecycle owner |
| Declared support period and basis | How long vulnerabilities will be handled and how the end date is communicated | “Updates when available” with no period or responsibility |
| Vulnerability intake and escalation contact | How researchers, distributors and importers can report an issue | Only a consumer support form with no security escalation route |
| Update policy and release records | How fixes are authenticated, distributed, tracked and recovered if installation fails | Unversioned files shared informally with no rollback or release history |
| Integrated-component and dependency controls | How third-party hardware and software risks are identified and handled | No owner for chipset, operating-system or library vulnerabilities |
| Conformity and technical documentation status, where the CRA applies | Whether the required assessment, declaration and CE-related records will be ready for the exact configuration | A promise that EN 40000-1-2 itself is a product certificate |
| Incident and actively exploited vulnerability workflow | Who meets the applicable reporting deadlines and keeps economic operators informed | No allocation of responsibility between manufacturer and importer |
| Change-control record | Whether a firmware, module or feature change alters the earlier risk and conformity assessment | Treating every product update as automatically covered by old evidence |
| Importer and distributor corrective-action process | How sales are stopped, customers informed and records retained if non-conformity or risk is found | Warranty handling presented as a substitute for regulatory action |

The importer does not need every confidential engineering file to begin a supplier questionnaire. It does need enough traceable evidence to verify that the correct product, version, responsibilities and lifecycle are covered. This commercial checklist does not reduce the documents an importer must verify, retain or make available under [Article 19](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R2847).

Article 19 also requires importers of in-scope products to complete pre-market checks, identify themselves, act on non-conformity and vulnerabilities, and cooperate with authorities. The importer must keep a copy of the EU declaration of conformity for at least 10 years after the product is placed on the market or for the support period, whichever is longer, and ensure that the technical documentation can be made available to authorities on request. Use the table above to organize supplier evidence, not as a substitute for those duties.

## Support periods and firmware are commercial terms too

Under [Article 13(8) of the CRA](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R2847), manufacturers of in-scope products must determine a support period during which vulnerabilities are handled. The period must be at least five years unless the product is expected to be used for less than five years, in which case it must match the expected use time. A product expected to remain in use longer should receive a longer support period. The Commission's guidance says the assessment should also take account of factors including user expectations, the product's nature and purpose, comparable products, the operating environment and the support periods of core third-party components.

For a wholesale buyer, the support period affects more than compliance. It influences installer confidence, return exposure and whether a model can remain in the catalogue. Ask for the date or method used to identify the support period, the products it covers and the way end-of-support will be communicated.

Firmware control deserves the same precision. Record the installed version at receipt, the approved update path and the recovery process for a failed update. If several head-unit variants share a software platform, verify which differences are security-relevant before treating one assessment as covering all of them.

## Reporting duties are already active

The CRA's main product obligations apply from 11 December 2027, but [Article 14 reporting obligations](https://digital-strategy.ec.europa.eu/en/policies/cra-reporting) have applied since 11 September 2026. Manufacturers of in-scope products must report actively exploited vulnerabilities and severe incidents through the EU reporting process within the applicable stages and deadlines.

An importer should therefore identify the manufacturer's security contact now. The commercial agreement should make clear who evaluates a report, who notifies the importer and distributors, and how an affected software version or shipment is identified. A generic warranty inbox is not a complete vulnerability-response workflow.

## Claims importers should not repeat without evidence

Avoid four shortcuts in product listings, tenders and dealer material:

- **“CRA certified.”** The CRA uses conformity-assessment routes; EN 40000-1-2 is not, by itself, a product certificate. Verify the exact legal and standards basis for any conformity claim.
- **“All automotive electronics are exempt.”** The Commission's guidance uses an exclusivity and route-to-market test. A broadly marketed generic digital product may not meet it.
- **“CE already covers everything.”** CE marking can relate to several EU laws. Ask which legislation, product and configuration the underlying declaration addresses.
- **“One platform document covers every model.”** Shared treatment is reasonable only where the security-relevant architecture, intended purpose and risk are genuinely shared.

These are not merely wording issues. Unsupported claims can obscure the evidence a buyer needs before placing a multi-SKU order.

## A practical next step for wholesale evaluation

Add a CRA section to the supplier questionnaire used for EU projects. Begin with one representative configuration, map its hardware and software variants, then identify which evidence can legitimately be reused across the proposed range. Keep open items visible in the order and launch plan instead of converting them into assumed compliance. For broader questions outside the CRA, use the [general head-unit supplier evaluation checklist](https://teyesglobal.com/news/industry/sony-exit-north-america-head-unit-supplier-checklist/) separately rather than duplicating it here.

For TEYES enquiries, EU importers can use the [distributor information page](https://teyesglobal.com/solutions/distributors/) and [business partnership form](https://teyesglobal.com/contact/?inquiry=distribution) to identify the target country, product models, software configuration and documentation questions. Availability, scope and compliance evidence must be confirmed for the exact product and market; this article does not state that any TEYES model or configuration is CRA-certified or within a particular legal category.

## Official sources

- [European Commission, *Commission publishes new guidance*, 27 July 2026](https://digital-strategy.ec.europa.eu/en/library/commission-publishes-new-guidance-support-timely-cyber-resilience-act-implementation)
- [European Commission, *Guidance on the application of Regulation (EU) 2024/2847*, OJ C/2026/6013, 17 November 2026](https://data.europa.eu/eli/C/2026/6013/oj)
- [European Commission, *First European standard published to support the Cyber Resilience Act*, 19 November 2026](https://digital-strategy.ec.europa.eu/en/news/first-european-standard-published-support-cyber-resilience-act)
- [CEN-CENELEC, *First European standards supporting CRA*, 19 November 2026](https://www.cencenelec.eu/news-events/news/2026/en-in-the-spotlight/2026-11-19-cra-standards-en-40000-1-1-and-en-40000-1-2/)
- [European Commission, *CRA standardisation*](https://digital-strategy.ec.europa.eu/en/policies/cra-standardisation)
- [Regulation (EU) 2024/2847](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R2847)
- [European Commission, *CRA reporting*](https://digital-strategy.ec.europa.eu/en/policies/cra-reporting)

