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
      <div
        className="absolute inset-0 opacity-60"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 82% 45%, rgba(249,115,22,0.18), transparent 25%), radial-gradient(circle at 20% 0%, rgba(249,115,22,0.08), transparent 24%)",
        }}
      />

      <div className="container-wide relative grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-400 mb-3">
            New Product Family
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            TEYES Car Audio
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
            Expand your aftermarket offer with TEYES speakers, subwoofers, bass systems and Class D amplifiers alongside the established Android head-unit range.
          </p>

          <div className="mt-7 grid sm:grid-cols-2 gap-3 max-w-2xl">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.label}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-400/10 text-orange-400">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-zinc-200">{category.label}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <Button asChild size="lg" className="bg-orange-500 text-black hover:bg-orange-400">
              <Link to="/car-audio/">
                Explore TEYES Car Audio
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative min-h-[300px] md:min-h-[380px]" aria-hidden="true">
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-400/20 shadow-[0_0_90px_rgba(249,115,22,0.12)] md:h-80 md:w-80" />
          <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-zinc-950 md:h-60 md:w-60" />
          <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-400/25 bg-[radial-gradient(circle,_#292929_0%,_#111_48%,_#050505_72%)] md:h-40 md:w-40" />
          <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black md:h-20 md:w-20" />
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/70 px-4 py-2 text-xs uppercase tracking-[0.18em] text-zinc-400 backdrop-blur">
            Detail · Dynamics · Depth
          </div>
        </div>
      </div>
    </section>
  );
}
