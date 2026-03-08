import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, DollarSign, Package, Headphones, TrendingUp, Award, Truck } from "lucide-react";
import globalPartnersImg from "@/assets/decorative/global-partners-800.webp";
import globalPartners400Webp from "@/assets/decorative/global-partners-400.webp";
import globalPartners1200Webp from "@/assets/decorative/global-partners-1200.webp";
import globalPartners400Avif from "@/assets/decorative/global-partners-400.avif";
import globalPartners800Avif from "@/assets/decorative/global-partners-800.avif";
import globalPartners1200Avif from "@/assets/decorative/global-partners-1200.avif";
import partnershipImg from "@/assets/decorative/partnership-800.webp";
import partnership400Webp from "@/assets/decorative/partnership-400.webp";
import partnership1200Webp from "@/assets/decorative/partnership-1200.webp";
import partnership400Avif from "@/assets/decorative/partnership-400.avif";
import partnership800Avif from "@/assets/decorative/partnership-800.avif";
import partnership1200Avif from "@/assets/decorative/partnership-1200.avif";

const benefits = [
  { icon: DollarSign, title: "Healthy Margins", desc: "Competitive wholesale pricing with strong retail potential" },
  { icon: Package, title: "Proven Products", desc: "Established demand across 100+ countries" },
  { icon: Headphones, title: "Full Support", desc: "Training, marketing materials, and technical assistance" },
  { icon: TrendingUp, title: "Growth Potential", desc: "Expanding category with increasing consumer demand" },
  { icon: Award, title: "Quality Assurance", desc: "ISO-certified manufacturing and rigorous QC" },
  { icon: Truck, title: "Reliable Supply", desc: "Consistent inventory and on-time delivery" },
];

const requirements = [
  "Established distribution network in automotive aftermarket",
  "Ability to provide installation training and support",
  "Commitment to brand standards and pricing guidelines",
  "Minimum order quantities based on market size",
];

const LandingDistributorPage = () => {
  return (
    <Layout>
      <SEO
        title="Become a Distributor - Car Infotainment Partnership"
        description="Join TEYES distributor network. Access proven car infotainment products, competitive margins, marketing support, and growth opportunities in 100+ global markets."
        keywords="car infotainment distributor, become a distributor, TEYES partnership, wholesale car stereo"
        path="/landing/distributor"
        noindex={true}
      />
      {/* Hero with Background Image */}
      <section className="min-h-[90vh] flex items-center relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <picture>
            <source
              type="image/avif"
              srcSet={`${globalPartners400Avif} 400w, ${globalPartners800Avif} 800w, ${globalPartners1200Avif} 1200w`}
              sizes="100vw"
            />
            <source
              type="image/webp"
              srcSet={`${globalPartners400Webp} 400w, ${globalPartnersImg} 800w, ${globalPartners1200Webp} 1200w`}
              sizes="100vw"
            />
            <img
              src={globalPartnersImg}
              alt="Global network"
              className="w-full h-full object-cover opacity-30"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />
        </div>

        <div className="container-wide relative py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <div className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 font-medium text-sm mb-6">
                Distribution Partnership
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                Grow Your Business with
                <span className="block text-emerald-400">TEYES Distribution</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                Join our global network of distributors. Access proven products,
                competitive pricing, and comprehensive support to build your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/contact">
                    Apply to Become a Distributor
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="xl" asChild>
                  <Link to="/products">View Product Catalog</Link>
                </Button>
              </div>
            </div>

            {/* Right: Partnership Image */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-400/10 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl overflow-hidden border border-border/30 shadow-2xl">
                <picture>
                  <source
                    type="image/avif"
                    srcSet={`${partnership400Avif} 400w, ${partnership800Avif} 800w, ${partnership1200Avif} 1200w`}
                    sizes="(min-width:1024px) 520px, 100vw"
                  />
                  <source
                    type="image/webp"
                    srcSet={`${partnership400Webp} 400w, ${partnershipImg} 800w, ${partnership1200Webp} 1200w`}
                    sizes="(min-width:1024px) 520px, 100vw"
                  />
                  <img
                    src={partnershipImg}
                    alt="Business partnership"
                    className="w-full h-auto"
                  />
                </picture>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
                  <p className="text-emerald-400 text-sm font-medium">Global Network</p>
                  <p className="text-foreground font-semibold">500+ Distribution Partners Worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-card">
        <div className="container-wide">
          <h2 className="section-title text-center mb-4">Distributor Benefits</h2>
          <p className="section-subtitle text-center mx-auto mb-12">
            Everything you need to succeed in the infotainment market.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="flex items-start gap-4 p-6 rounded-xl bg-background border border-border/50 hover:border-emerald-500/30 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <b.icon className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{b.title}</h3>
                  <p className="text-muted-foreground text-sm">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title text-center mb-12">Partner Requirements</h2>

            <div className="space-y-4">
              {requirements.map((req) => (
                <div key={req} className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border/50">
                  <Check className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-b from-card to-background">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Ready to Partner with TEYES?
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
            Fill out the application form and our partnership team will be in touch within 48 hours.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/contact">
              Apply Now
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default LandingDistributorPage;
