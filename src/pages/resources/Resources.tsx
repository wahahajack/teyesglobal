import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Factory, ShoppingCart, Layers3 } from "lucide-react";

const resourceCards = [
  {
    title: "Android Car Stereo Wholesale Buying Guide",
    description: "How distributors can choose Android head units, car stereos, accessories, trial orders, and product ladders with less guesswork.",
    href: "/resources/android-car-stereo-wholesale-guide",
    icon: ShoppingCart,
    tag: "Wholesale Buyers",
  },
  {
    title: "How to Choose China Car Audio Manufacturers",
    description: "A practical checklist for evaluating Android car stereo suppliers, car radio factories, and head unit OEM/ODM partners.",
    href: "/resources/china-car-audio-manufacturers-guide",
    icon: Factory,
    tag: "OEM / ODM Buyers",
  },
];

const ResourcesPage = () => {
  return (
    <Layout>
      <SEO
        title="TEYES Resources for Android Head Unit & Car Stereo Distributors"
        description="B2B resources for Android head unit distributors, car stereo wholesale buyers, car radio suppliers, OEM/ODM partners, and car audio market entry planning."
        keywords="TEYES resources, Android head unit resources, car stereo wholesale guide, China car audio manufacturers, car radio factory guide"
        path="/resources"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources" },
        ]}
      />
      <ContextHeader
        title="Resources"
        description="Buyer guides and decision support for Android head unit, car stereo, car radio, and wholesale car audio partners."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources" },
        ]}
      />

      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <Layers3 className="h-7 w-7 text-primary" />
            </div>
            <h2 className="section-title mb-4">B2B Guides for Better Product Decisions</h2>
            <p className="section-subtitle mx-auto">
              These resources are built for distributors, installers, retailers, and OEM/ODM buyers who need a clearer way to evaluate Android head units, car stereo suppliers, accessories, and market-entry choices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {resourceCards.map((card) => (
              <Link key={card.title} to={card.href} className="group rounded-2xl bg-card border border-border/50 p-8 hover:border-primary/40 transition-all">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <card.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs uppercase tracking-wider text-primary font-medium">{card.tag}</span>
                    <h3 className="text-xl font-semibold mt-2 mb-3 group-hover:text-primary transition-colors">{card.title}</h3>
                    <p className="text-muted-foreground text-sm mb-5">{card.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                      Read guide <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-display font-bold mb-4">Need a Recommendation for Your Market?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Share your target country, channel, price band, and product goals. TEYES can help review a suitable head unit and car stereo product mix.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact?intent=product-mix">
                Get Product Mix Recommendation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/solutions/distributors">Distributor Program</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResourcesPage;
