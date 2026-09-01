import { Link } from "react-router-dom";
import { ArrowRight, Box, Radio, SlidersHorizontal, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  { label: "Speakers", icon: Volume2 },
  { label: "Subwoofers", icon: Radio },
  { label: "Bass Systems", icon: Box },
  { label: "Amplifiers", icon: SlidersHorizontal },
];

export function CarAudioSection() {
  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-background py-20 md:py-24">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_78%_44%,hsl(var(--primary)/0.13),transparent_30%)]"
        aria-hidden="true"
      />
      <div className="container-wide relative grid items-center gap-10 lg:grid-cols-[0.93fr_1.07fr] lg:gap-14">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-primary">New Product Family</p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">TEYES Car Audio</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Expand your aftermarket offer with TEYES speakers, subwoofers, bass systems and Class D amplifiers alongside the established Android head-unit range.
          </p>
          <div className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.label} className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/55 px-4 py-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-foreground/85">{category.label}</span>
                </div>
              );
            })}
          </div>
          <Button asChild size="lg" className="mt-8">
            <Link to="/car-audio/">Explore TEYES Car Audio <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="relative min-h-[390px] md:min-h-[450px]">
          <div
            className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.18),transparent_42%)]"
            aria-hidden="true"
          />
          <div className="absolute left-[8%] top-[12%] h-24 w-24 rounded-full border border-primary/15" aria-hidden="true" />
          <div className="absolute right-[3%] bottom-[8%] h-40 w-40 rounded-full border border-accent/10" aria-hidden="true" />
          <img
            src="/images/car-audio/overview.webp"
            alt="TEYES Car Audio product range"
            width={500}
            height={283}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 m-auto h-auto w-[106%] max-w-none object-contain drop-shadow-[0_30px_48px_rgba(0,0,0,0.5)]"
          />
          <div className="absolute bottom-3 right-2 rounded-xl border border-border/70 bg-background/75 px-4 py-3 backdrop-blur-md">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Car Audio range</p>
            <p className="mt-1 text-sm font-semibold text-foreground">21 core models</p>
          </div>
        </div>
      </div>
    </section>
  );
}
