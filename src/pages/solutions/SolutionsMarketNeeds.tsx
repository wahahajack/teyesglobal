import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, TrendingUp, Shield, Users } from "lucide-react";

const marketTypes = [
  {
    title: "Europe / EU Distributor Markets",
    description: "Markets where TEYES Europe, regional compliance, DAB+, language support, and premium installer expectations matter.",
    products: ["CC4 Pro", "CC3 2K", "CC4L"],
    strategies: [
      "Emphasize premium Android head unit positioning",
      "Prepare DAB+ and regional accessory bundles",
      "Support dealer comparison and installation materials",
    ],
    risk: "Higher expectations for compliance, fitment, installation support, and local sales materials",
    support: "Europe-specific product mix, dealer assets, compatibility notes, and compliance documentation on request",
  },
  {
    title: "Entry-Level Aftermarket",
    description: "Price-sensitive markets where value is the primary purchasing driver.",
    products: ["X1 Pro", "CC4L"],
    strategies: [
      "Focus on essential car stereo features",
      "Competitive pricing positioning",
      "Simple installation focus",
    ],
    risk: "Price competition and unclear differentiation",
    support: "Clear model positioning, accessory bundles, and after-sales boundaries",
  },
  {
    title: "Premium Upgrade Markets",
    description: "Markets where customers seek feature-rich Android head unit and car infotainment upgrades for their vehicles.",
    products: ["CC4 Pro", "CC3 2K"],
    strategies: [
      "Emphasize advanced features",
      "Quality and reliability messaging",
      "Premium positioning",
    ],
    risk: "Higher expectations for installation, audio, camera, and support",
    support: "Model comparison, demo videos, installation support, and technical FAQ",
  },
  {
    title: "Emerging Markets",
    description: "Growing markets with increasing demand for Android car stereo and infotainment solutions.",
    products: ["CC3 2K", "CC4", "X1 Pro"],
    strategies: [
      "Scalable product range",
      "Local language support",
      "Partner development focus",
    ],
    risk: "Unclear first-order product mix and inventory pressure",
    support: "Mixed-model trial order and market-specific product ladder",
  },
  {
    title: "Mature Markets",
    description: "Established markets with sophisticated car audio and head unit customer expectations.",
    products: ["CC4 Pro", "CC3 2K"],
    strategies: [
      "Feature differentiation",
      "Brand recognition leverage",
      "Service excellence",
    ],
    risk: "Strong brand comparison and higher customer support demands",
    support: "Premium positioning, comparison sheets, dealer assets, and case proof",
  },
];

const supportServices = [
  {
    icon: Target,
    title: "Market Analysis",
    description: "Data-driven insights on market size, competition, and customer preferences.",
  },
  {
    icon: TrendingUp,
    title: "Product Positioning",
    description: "Recommendations on which head unit and car stereo models to offer and how to position them.",
  },
  {
    icon: Shield,
    title: "Compliance Support",
    description: "Guidance on local regulations, certifications, and requirements.",
  },
  {
    icon: Users,
    title: "Partner Network",
    description: "Connect with established installers and retailers in your target market.",
  },
];

const faqs = [
  {
    question: "How should a distributor choose TEYES models for a new market?",
    answer: "Start by matching the product ladder to the local channel: CC4 Pro and CC3 2K for premium installers, CC3 2K and CC4 for mainstream markets, and X1 Pro or CC4L for price-sensitive car stereo and head unit channels.",
  },
  {
    question: "Does TEYES support Europe distributor needs?",
    answer: "Yes. TEYES can help Europe-focused partners review product mix, DAB+ accessory needs, language expectations, compliance documentation, and premium installer positioning.",
  },
  {
    question: "Can TEYES help with market-specific product positioning?",
    answer: "Yes. TEYES can help partners review target channels, price bands, head unit product mix, accessories, and technical support needs before starting a distributor program.",
  },
];

const SolutionsMarketNeedsPage = () => {
  return (
    <Layout>
      <SEO
        title="Car Audio Market Entry & Android Head Unit Product Mix Guide"
        description="Choose the right TEYES Android car stereo and head unit product mix for Europe, emerging markets, premium installers, price-sensitive channels, and car audio distributors."
        keywords="android head unit market entry, car audio market entry, car stereo distributor product mix, TEYES Europe, TEYES EU, infotainment distribution, premium android head unit"
        path="/solutions/market-needs"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "By Market Needs" },
        ]}
        faq={faqs}
      />
      <ContextHeader
        title="Car Audio Market Needs & Head Unit Product Mix"
        description="Product strategies and configurations adapted to your specific market conditions."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "By Market Needs" },
        ]}
      />

      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title mb-4">Market Types We Support</h2>
            <p className="section-subtitle mx-auto">
              Different markets need different product ladders. Use this guide to match TEYES Android head unit, car stereo, and car radio models with your local channel and customer expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {marketTypes.map((market) => (
              <div
                key={market.title}
                className="rounded-2xl bg-card border border-border/50 p-8"
              >
                <h3 className="text-xl font-semibold mb-2">{market.title}</h3>
                <p className="text-muted-foreground mb-6">{market.description}</p>

                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Recommended Products:</p>
                  <div className="flex flex-wrap gap-2">
                    {market.products.map((product) => (
                      <span key={product} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Key Strategies:</p>
                  <ul className="space-y-2">
                    {market.strategies.map((strategy) => (
                      <li key={strategy} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                        {strategy}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-3 text-sm">
                  <div className="rounded-lg bg-background/60 p-4 border border-border/40">
                    <span className="font-medium">Main risk: </span>
                    <span className="text-muted-foreground">{market.risk}</span>
                  </div>
                  <div className="rounded-lg bg-background/60 p-4 border border-border/40">
                    <span className="font-medium">Support needed: </span>
                    <span className="text-muted-foreground">{market.support}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact?intent=market">
                Get Product Mix Recommendation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/products/compare">Compare Head Unit Models</Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link to="/solutions/europe-distributors">Europe Distributor Support</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="section-title mb-4">Quick Product Mix Reference</h2>
            <p className="section-subtitle mx-auto">
              A simple starting point for distributors before building a full country-level launch plan.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] rounded-xl overflow-hidden">
              <thead className="bg-background">
                <tr>
                  <th className="text-left p-4 border-b border-border/50">Market Type</th>
                  <th className="text-left p-4 border-b border-border/50">Recommended Models</th>
                  <th className="text-left p-4 border-b border-border/50">Main Risk</th>
                  <th className="text-left p-4 border-b border-border/50">Support Needed</th>
                </tr>
              </thead>
              <tbody>
                {marketTypes.map((market) => (
                  <tr key={market.title} className="bg-background/40">
                    <td className="p-4 border-b border-border/30 font-medium">{market.title}</td>
                    <td className="p-4 border-b border-border/30">{market.products.join(" / ")}</td>
                    <td className="p-4 border-b border-border/30 text-muted-foreground">{market.risk}</td>
                    <td className="p-4 border-b border-border/30 text-muted-foreground">{market.support}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title mb-4">Market Entry Support</h2>
            <p className="section-subtitle mx-auto">
              We do not just sell products — we help car audio distributors and head unit partners succeed in their market.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportServices.map((service) => (
              <div
                key={service.title}
                className="p-6 rounded-xl bg-background border border-border/50"
              >
                <div className="w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-violet-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-wide max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Market Needs FAQ</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="p-6 rounded-xl bg-card border border-border/50">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-display font-bold mb-4">
            Let's Discuss Your Market Strategy
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Share your target market and goals. We will provide insights and recommendations based on our global car audio and head unit distribution experience.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact?intent=market">
              Get Market Advice
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default SolutionsMarketNeedsPage;