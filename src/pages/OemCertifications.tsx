import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Award, FileCheck, Globe } from "lucide-react";

const certifications = [
  {
    category: "Quality Management",
    items: [
      { name: "IATF 16949", description: "Global Automotive Quality Management System" },
      { name: "ISO 9001", description: "Quality Management Standards" },
    ],
  },
  {
    category: "Global Compliance",
    items: [
      { name: "CE-EMC", description: "RED Evaluation for European Markets" },
      { name: "FCC", description: "SDOC Certification for North America" },
      { name: "ROHS-CE", description: "Restriction of Hazardous Substances" },
    ],
  },
  {
    category: "Regional Certifications",
    items: [
      { name: "CCC", description: "China Compulsory Certification" },
      { name: "EAC", description: "Eurasian Conformity (Russia/CIS)" },
      { name: "NBTC", description: "Thailand Broadcasting & Telecom Commission" },
    ],
  },
  {
    category: "Network & Specialized",
    items: [
      { name: "GSMA", description: "Global System for Mobile Communications" },
      { name: "BIS", description: "Bureau of Indian Standards" },
      { name: "WPC", description: "Wireless Planning & Coordination (India)" },
    ],
  },
];

const qualityFeatures = [
  {
    icon: Shield,
    title: "100% Inspection",
    description: "Every unit undergoes comprehensive testing before shipment.",
  },
  {
    icon: Award,
    title: "Industry Standards",
    description: "Manufacturing processes aligned with automotive industry best practices.",
  },
  {
    icon: FileCheck,
    title: "Traceability",
    description: "Complete component and production traceability for every unit.",
  },
  {
    icon: Globe,
    title: "Global Compliance",
    description: "Products certified for major markets worldwide.",
  },
];

const OemCertificationsPage = () => {
  return (
    <Layout>
      <SEOHead
        title="Certifications & Quality Standards - ISO, CE, FCC, E-Mark"
        description="TEYES quality certifications: ISO 9001, IATF 16949, CE, FCC, RoHS, E-Mark, and regional certifications. 100% inspection and complete traceability."
        keywords="ISO certification, IATF 16949, CE marking, FCC, RoHS, E-Mark, automotive quality"
        canonicalPath="/oem-odm/certifications"
      />
      <ContextHeader
        title="Certifications & Quality Standards"
        description="Industry-recognized certifications and rigorous testing standards backing our commitment to quality."
        backLink={{ label: "Back to OEM / ODM", href: "/oem-odm" }}
      />

      {/* Quality Features */}
      <section className="py-16 bg-card">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityFeatures.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-background border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications List */}
      <section className="py-20 bg-background">
        <div className="container-wide">
          <h2 className="section-title mb-12 text-center">Our Certifications</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {certifications.map((category) => (
              <div
                key={category.category}
                className="rounded-2xl bg-card border border-border/50 p-8"
              >
                <h3 className="text-xl font-semibold mb-6">{category.category}</h3>
                <div className="space-y-4">
                  {category.items.map((cert) => (
                    <div
                      key={cert.name}
                      className="flex items-center gap-4 p-4 rounded-lg bg-background border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{cert.name}</h4>
                        <p className="text-sm text-muted-foreground">{cert.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-display font-bold mb-4">
            Need Specific Certifications?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            We can support additional certifications based on your target market requirements.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">
              Discuss Requirements
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default OemCertificationsPage;
