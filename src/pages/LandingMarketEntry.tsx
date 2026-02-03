import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, TrendingUp, Package, Users, MapPin, BarChart3 } from "lucide-react";
import globalPartnersImg from "@/assets/decorative/global-partners.webp";
import solutionsHeroImg from "@/assets/decorative/solutions-hero.webp";

const markets = [
  { name: "Middle East", products: "CC4 Pro, CC3 2K", growth: "High" },
  { name: "Southeast Asia", products: "X1 Pro, CC4", growth: "High" },
  { name: "Eastern Europe", products: "CC3 2K, CC4L", growth: "Medium" },
  { name: "South America", products: "CC4, X1 Pro", growth: "High" },
  { name: "Africa", products: "X1 Pro, CC4L", growth: "Emerging" },
];

const support = [
  { icon: BarChart3, title: "Market Analysis", desc: "Data on competition, pricing, and demand" },
  { icon: Package, title: "Product Selection", desc: "Right products for your market" },
  { icon: Users, title: "Partner Network", desc: "Connect with local installers" },
  { icon: MapPin, title: "Logistics Support", desc: "Shipping and customs guidance" },
];

const LandingMarketEntryPage = () => {
  return (
    <Layout>
      <SEOHead
        title="Market Entry Support - Global Infotainment Distribution"
        description="Enter new markets with TEYES support. Market analysis, product positioning, compliance guidance, and local partner connections for car infotainment distribution."
        keywords="market entry support, global distribution, emerging markets, car infotainment expansion"
        canonicalPath="/partners/market-entry"
      />
      {/* Hero with Background Image */}
      <section className="min-h-[90vh] flex items-center relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={globalPartnersImg}
            alt="Global network"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />
        </div>

        <div className="container-wide relative py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <div className="inline-block px-4 py-2 rounded-full bg-violet-500/10 text-violet-400 font-medium text-sm mb-6">
                Market Expansion
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                Enter New Markets with
                <span className="block text-violet-400">Confidence</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                Leverage our global experience to successfully launch in new territories.
                We provide the products, insights, and support you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/contact">
                    Discuss Your Market
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="xl" asChild>
                  <Link to="/solutions/market-needs">View Market Solutions</Link>
                </Button>
              </div>
            </div>

            {/* Right: Featured Image */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-purple-400/10 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl overflow-hidden border border-border/30 shadow-2xl">
                <img
                  src={solutionsHeroImg}
                  alt="Modern car interior"
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
                  <p className="text-violet-400 text-sm font-medium">100+ Markets</p>
                  <p className="text-foreground font-semibold">Proven Success Worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="py-20 bg-card">
        <div className="container-wide">
          <h2 className="section-title text-center mb-4">Active Markets</h2>
          <p className="section-subtitle text-center mx-auto mb-12">
            TEYES products are successfully sold in 100+ countries.
          </p>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {markets.map((m) => (
              <div key={m.name} className="p-6 rounded-xl bg-background border border-border/50 text-center hover:border-violet-500/30 transition-colors">
                <Globe className="h-8 w-8 text-violet-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{m.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{m.products}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${m.growth === "High" ? "bg-emerald-500/10 text-emerald-400" :
                    m.growth === "Medium" ? "bg-amber-500/10 text-amber-400" :
                      "bg-violet-500/10 text-violet-400"
                  }`}>
                  {m.growth} Growth
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-20 bg-background">
        <div className="container-wide">
          <h2 className="section-title text-center mb-12">How We Support Market Entry</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {support.map((s) => (
              <div key={s.title} className="p-6 rounded-xl bg-card border border-border/50 hover:border-violet-500/30 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center mb-4">
                  <s.icon className="h-6 w-6 text-violet-400" />
                </div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-b from-card to-background">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Let's Explore Your Target Market
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
            Share your market goals and we'll provide insights based on our global experience.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/contact">
              Get Market Consultation
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default LandingMarketEntryPage;
