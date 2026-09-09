import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { organization } from "@/data/company";
import { newsArticles } from "@/data/news";

const aboutSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    organization,
    {
      "@type": "AboutPage",
      "@id": "https://teyesglobal.com/about/#webpage",
      url: "https://teyesglobal.com/about/",
      name: "About TEYES",
      mainEntity: { "@id": organization["@id"] },
    },
  ],
});

const quickFacts = [
  { label: "Brand", value: "TEYES" },
  { label: "Location", value: "Shenzhen, China" },
  { label: "Products", value: "Android head units; car audio; accessories" },
  { label: "Cooperation", value: "Distribution and customized product projects" },
];

const headUnits = [
  { name: "CC4 Pro", href: "/products/cc4-pro/" },
  { name: "CC3 2K", href: "/products/cc3-2k/" },
  { name: "CC4", href: "/products/cc4/" },
  { name: "X1 Pro", href: "/products/x1-pro/" },
  { name: "CC4L", href: "/products/cc4l/" },
];

const productCategories = [
  {
    name: "Android head units",
    description: "Car stereos with navigation, media and smartphone connectivity. Compare each model's display, audio features and connection options.",
    href: "/products/",
  },
  {
    name: "Car audio",
    description: "Speakers, amplifiers and subwoofers for car audio installations. Explore the categories to check specifications and installation requirements.",
    href: "/car-audio/",
  },
  {
    name: "Accessories",
    description: "Cameras, microphones and other accessories for supported TEYES head units. Check the accessory and head unit requirements before ordering.",
    href: "/accessories/",
  },
];

const recentNewsSlugs = [
  "teyes-car-audio-series-launch",
  "automechanika-frankfurt-2026",
];

const AboutPage = () => (
  <Layout>
    <SEO
      title="About TEYES | Car Stereos, Car Audio & B2B Cooperation"
      description="Learn about TEYES Android car stereos, car audio products and accessories, and explore distribution and customized product projects."
      path="/about/"
      schema={aboutSchema}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "About TEYES" }]}
    />
    <ContextHeader
      title="About TEYES"
      description="Car stereos, car audio and accessories for international distribution."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "About TEYES" }]}
    />

    <section className="py-16 bg-background">
      <div className="container-wide max-w-4xl">
        <p className="text-lg md:text-xl leading-relaxed text-foreground font-medium">
          TEYES develops Android car stereos, car audio products and accessories.
          Based in Shenzhen, China, we work with distributors, retailers and
          businesses seeking customized car electronics.
        </p>
        <div className="mt-10 rounded-2xl border border-border/50 overflow-hidden">
          <div className="bg-secondary/50 px-6 py-4">
            <h2 className="font-display font-bold">Company overview</h2>
          </div>
          <dl>
            {quickFacts.map((fact, index) => (
              <div
                key={fact.label}
                className={`flex flex-col sm:flex-row sm:items-center px-6 py-3.5 gap-1 sm:gap-6 ${index % 2 === 0 ? "bg-background" : "bg-secondary/20"}`}
              >
                <dt className="sm:w-44 shrink-0 text-sm font-medium text-muted-foreground">{fact.label}</dt>
                <dd className="text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>

    <section className="py-16 bg-secondary/30 border-y border-border/50">
      <div className="container-wide max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Our products</h2>
        <p className="text-muted-foreground leading-relaxed mb-8">
          Our range includes products for different budgets and installation needs.
          Use the product pages to compare specifications and identify the options
          you would like to discuss with our team.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {productCategories.map((category) => (
            <Link key={category.name} to={category.href} className="group rounded-2xl bg-card border border-border/50 p-6 hover:border-primary/50 transition-colors">
              <h3 className="font-display font-bold text-lg mb-3 group-hover:text-primary">{category.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{category.description}</p>
              <ArrowRight className="h-4 w-4 text-primary mt-4" aria-hidden="true" />
            </Link>
          ))}
        </div>
        <h3 className="font-display font-bold text-lg mt-8 mb-3">Explore our head units</h3>
        <div className="flex flex-wrap gap-3">
          {headUnits.map((product) => (
            <Link key={product.name} to={product.href} className="inline-flex items-center gap-2 rounded-lg border border-border/50 bg-card px-4 py-3 text-sm font-medium hover:border-primary/50 hover:text-primary">
              {product.name}<ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ))}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-4">
          Check each model’s specifications for CarPlay and Android Auto support.
          Vehicle fitment and accessory compatibility depend on the model and installation.
        </p>
      </div>
    </section>

    <section className="py-16 bg-background">
      <div className="container-wide max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Planning an installation</h2>
        <p className="text-muted-foreground leading-relaxed">
          Contact our team to check language options, vehicle compatibility and
          accessory requirements for your market. Include the vehicle make, model,
          year and existing equipment so we can discuss the relevant requirements.
        </p>
      </div>
    </section>

    <section className="py-16 bg-secondary/30 border-y border-border/50">
      <div className="container-wide max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">Working with TEYES</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-display font-bold text-xl mb-3">International distribution</h3>
            <p className="text-muted-foreground leading-relaxed">
              Interested in selling TEYES products? Tell us where you operate and
              which products you are considering. Our team can discuss distribution
              options and current supply arrangements with you.
            </p>
          </div>
          <div>
            <h3 className="font-display font-bold text-xl mb-3">Customized products</h3>
            <p className="text-muted-foreground leading-relaxed">
              For original equipment manufacturing (OEM) and original design
              manufacturing (ODM) projects, contact us to discuss product platform
              selection, branding and software customization. Share your vehicle
              compatibility requirements and intended market to help define the project.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-8">
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact/">Discuss distribution <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/oem-odm/">Explore OEM/ODM services</Link>
          </Button>
        </div>
      </div>
    </section>

    <section className="py-16 bg-background">
      <div className="container-wide max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">Recent news</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {recentNewsSlugs.map((slug) => {
            const article = newsArticles.find((item) => item.slug === slug);
            if (!article) return null;
            return (
              <Link key={article.slug} to={`/news/${article.category}/${article.slug}/`} className="group rounded-2xl bg-card border border-border/50 p-6 hover:border-primary/50 transition-colors">
                <h3 className="font-display font-bold text-lg group-hover:text-primary">{article.title}</h3>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary mt-4">Read article <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  </Layout>
);

export default AboutPage;
