import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Factory, ShieldCheck, Users } from "lucide-react";

const organizationSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Corporation",
  name: "TEYES",
  alternateName: "TEYES Global",
  url: "https://teyesglobal.com/about/",
  logo: "https://teyesglobal.com/logo.webp",
  description:
    "TEYES is a global manufacturer of Android car infotainment systems, founded in 2011, serving distributors and auto brands across 100+ markets with OEM/ODM capabilities.",
  foundingDate: "2011",
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 500 },
  areaServed: { "@type": "Place", name: "Global (100+ markets)" },
  knowsAbout: [
    "Car Infotainment Systems",
    "Android Head Units",
    "OEM/ODM Manufacturing",
    "Automotive Aftermarket Solutions",
  ],
  sameAs: [
    "https://www.facebook.com/teyesglobal",
    "https://www.instagram.com/teyes_global",
    "https://www.youtube.com/@teyes",
    "https://www.linkedin.com/company/teyes",
  ],
});

const highlights = [
  {
    icon: Globe,
    title: "100+ Markets Served",
    description:
      "TEYES products reach drivers in more than 100 markets worldwide through a global network of distributors, retailers, and brand partners.",
  },
  {
    icon: Factory,
    title: "OEM / ODM Capabilities",
    description:
      "In-house product development, manufacturing, and customization — from firmware and UI to industrial design and packaging.",
  },
  {
    icon: ShieldCheck,
    title: "Certified Quality",
    description:
      "Products engineered and tested to meet international automotive standards, with certifications documented on our certifications page.",
  },
  {
    icon: Users,
    title: "500+ Team Members",
    description:
      "A team of engineers, designers, and market specialists focused on making in-car smart infotainment accessible worldwide.",
  },
];

const milestones = [
  {
    year: "2011",
    title: "TEYES Founded",
    description:
      "TEYES was founded with a focus on in-car smart infotainment for the automotive aftermarket.",
  },
  {
    year: "Growth",
    title: "Global Distribution Network",
    description:
      "Built a worldwide distributor and partner network spanning more than 100 markets across Europe, the Americas, the Middle East, and Asia.",
  },
  {
    year: "Today",
    title: "Full-Line Infotainment Manufacturer",
    description:
      "From entry-level head units to flagship large-screen systems, TEYES offers complete product lines plus OEM/ODM services for auto brands and partners.",
  },
];

const AboutPage = () => {
  return (
    <Layout>
      <SEO
        title="About TEYES - Global Android Car Infotainment Manufacturer"
        description="TEYES, founded in 2011, is a global manufacturer of Android car infotainment systems serving 100+ markets. Learn about our company, capabilities, and OEM/ODM services."
        keywords="TEYES company, TEYES about, Android head unit manufacturer, car infotainment OEM, TEYES history"
        path="/about/"
        schema={organizationSchema}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About TEYES" },
        ]}
      />
      <ContextHeader
        title="About TEYES"
        description="A global smart infotainment manufacturer, founded in 2011 and trusted by partners across 100+ markets."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About TEYES" },
        ]}
      />

      {/* Company Overview */}
      <section className="py-16 bg-background">
        <div className="container-wide max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">
            Who We Are
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              TEYES is a global manufacturer of Android-based smart
              infotainment systems for the automotive aftermarket. Founded in
              2011, the company designs, develops, and manufactures car head
              units, large-screen infotainment systems, and related accessories
              that upgrade vehicles with modern navigation, multimedia, and
              connectivity.
            </p>
            <p>
              Beyond our own product lines, TEYES operates as an OEM/ODM
              partner for auto brands, distributors, and system integrators —
              delivering custom-branded infotainment solutions with regional
              adaptations, certification support, and flexible cooperation
              models.
            </p>
            <p>
              With more than 500 team members and a distribution network
              covering over 100 markets, TEYES combines manufacturing scale
              with the agility to serve both high-volume distributors and
              specialized market niches.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-secondary/30 border-y border-border/50">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-card border border-border/50 p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 bg-background">
        <div className="container-wide max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-10">
            Our Journey
          </h2>
          <div className="space-y-8">
            {milestones.map((milestone) => (
              <div key={milestone.title} className="flex gap-6">
                <div className="shrink-0 w-24 text-right">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    {milestone.year}
                  </span>
                </div>
                <div className="border-l-2 border-border pl-6 pb-2">
                  <h3 className="font-display font-bold text-lg mb-1">
                    {milestone.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary/30 border-t border-border/50">
        <div className="container-wide text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Work With TEYES
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Whether you are a distributor looking for a reliable product line,
            or an auto brand planning a custom infotainment program, our team is
            ready to talk.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact/">
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/oem-odm/">Explore OEM / ODM</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
