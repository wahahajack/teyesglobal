import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import carAudio480 from "@/assets/car-audio/car-audio-hero-3-2-480.webp";
import carAudio800 from "@/assets/car-audio/car-audio-hero-3-2-800.webp";
import carAudio1200 from "@/assets/car-audio/car-audio-hero-3-2-1200.webp";
import carAudio480Avif from "@/assets/car-audio/car-audio-hero-3-2-480.avif";
import carAudio800Avif from "@/assets/car-audio/car-audio-hero-3-2-800.avif";
import carAudio1200Avif from "@/assets/car-audio/car-audio-hero-3-2-1200.avif";

const categories = ["Speakers", "Subwoofers", "Amplifiers", "Bass Systems"];

export function CarAudioSection() {
  return (
    <section className="py-20 md:py-24 bg-background">
      <div className="container-wide">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center">
          <div>
            <p className="text-primary font-medium mb-2">Car Audio Product Line</p>
            <h2 className="section-title">TEYES Car Audio</h2>
            <p className="section-subtitle mt-4 max-w-2xl">
              A growing product line for distributors and car audio channels, covering speakers,
              subwoofers, amplifiers and bass systems.
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6 text-sm text-muted-foreground">
              {categories.map((category) => (
                <span key={category} className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/70" aria-hidden="true" />
                  {category}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <Button variant="hero-outline" asChild>
                <Link to="/car-audio/">
                  Explore Car Audio
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-card/40 shadow-xl">
            <picture>
              <source media="(max-width: 480px)" type="image/avif" srcSet={carAudio480Avif} />
              <source media="(max-width: 480px)" type="image/webp" srcSet={carAudio480} />
              <source media="(max-width: 1024px)" type="image/avif" srcSet={carAudio800Avif} />
              <source media="(max-width: 1024px)" type="image/webp" srcSet={carAudio800} />
              <source media="(min-width: 1025px)" type="image/avif" srcSet={carAudio1200Avif} />
              <source media="(min-width: 1025px)" type="image/webp" srcSet={carAudio1200} />
              <img
                src={carAudio800}
                alt="TEYES car audio speakers, subwoofer and amplifier product line"
                className="w-full h-auto object-cover"
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
