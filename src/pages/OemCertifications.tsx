import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Award, FileCheck, Globe } from "lucide-react";

const certifications = [
  {
    category: "Quality Management",
    items: [
      { name: "ISO 9001:2015", description: "Quality Management System" },
      { name: "IATF 16949", description: "Automotive Quality Management" },
    ],
  },
  {
    category: "Environmental & Safety",
    items: [
      { name: "ISO 14001", description: "Environmental Management System" },
      { name: "ISO 45001", description: "Occupational Health & Safety" },
    ],
  },
  {
    category: "Product Compliance",
    items: [
      { name: "CE Marking", description: "European Conformity" },
      { name: "FCC Certification", description: "US Federal Communications" },
      { name: "RoHS Compliance", description: "Restriction of Hazardous Substances" },
      { name: "REACH Compliance", description: "EU Chemical Safety" },
    ],
  },
  {
    category: "Regional Certifications",
    items: [
      { name: "E-Mark", description: "European Vehicle Components" },
      { name: "CCC", description: "China Compulsory Certification" },
      { name: "BIS", description: "Bureau of Indian Standards" },
      { name: "SASO", description: "Saudi Standards Organization" },
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
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-card to-background">
        <div className="container-wide">
          <div className="max-w-3xl">
            <Link to="/oem-odm" className="text-primary font-medium mb-2 inline-flex items-center gap-2 hover:underline">
              ← Back to OEM / ODM
            </Link>
            <h1 className="section-title text-4xl md:text-5xl mb-6 mt-4">
              Certifications & Quality Standards
            </h1>
            <p className="section-subtitle">
              Our commitment to quality is backed by industry-recognized 
              certifications and rigorous testing standards.
            </p>
          </div>
        </div>
      </section>

      {/* Quality Features */}
      <section className="py-16 bg-card">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityFeatures.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-background border border-border/50"
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
                      className="flex items-center gap-4 p-4 rounded-lg bg-background border border-border/50"
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
