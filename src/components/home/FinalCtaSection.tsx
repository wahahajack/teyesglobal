import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

export function FinalCtaSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-card relative overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="container-wide relative">
        <div className="text-center max-w-3xl mx-auto">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageCircle className="h-8 w-8 text-primary" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Let's Talk About Your Market or Project
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Whether you're expanding into a new market, sourcing products, or exploring
            OEM collaboration — we're ready to discuss how TEYES can support your goals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact?intent=distributor">
                Get Wholesale Pricing & Trial Plan
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/contact?intent=oem">
                Discuss OEM / ODM Project
                <MessageCircle className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          <Link
            to="/products/compare"
            className="inline-flex items-center gap-2 mt-6 text-primary font-medium hover:underline"
          >
            Compare TEYES Models
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
