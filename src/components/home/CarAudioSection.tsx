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
    <section className="relative overflow-hidden bg-[#080808] py-20 md:py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_45%,rgba(249,115,22,0.16),transparent_28%)]" aria-hidden="true" />
      <div className="container-wide relative grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-400 mb-3">New Product Family</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">TEYES Car Audio</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">Expand your aftermarket offer with TEYES speakers, subwoofers, bass systems and Class D amplifiers alongside the established Android head-unit range.</p>
          <div className="mt-7 grid sm:grid-cols-2 gap-3 max-w-2xl">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-400/10 text-orange-400"><Icon className="h-4 w-4" /></div>
                  <span className="font-medium text-zinc-200">{category.label}</span>
                </div>
              );
            })}
          </div>
          <Button asChild size="lg" className="mt-8 bg-orange-500 text-black hover:bg-orange-400">
            <Link to="/car-audio/">Explore TEYES Car Audio <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 rounded-full bg-orange-500/10 blur-3xl" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/50 p-4 shadow-2xl">
            <img src="/images/car-audio/hero-speakers.webp" alt="TEYES Car Audio speaker products" width={500} height={362} loading="lazy" decoding="async" className="h-auto w-full rounded-2xl object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
