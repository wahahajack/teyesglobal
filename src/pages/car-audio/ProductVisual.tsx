import { useEffect, useState } from "react";
import { Eye, X } from "lucide-react";
import type { CarAudioProductVisual } from "./productVisuals";

const ProductImage = ({
  product,
  loading = "lazy",
  priority = false,
  className = "",
}: {
  product: CarAudioProductVisual;
  loading?: "eager" | "lazy";
  priority?: boolean;
  className?: string;
}) => (
  <img
    src={product.image}
    alt={product.alt}
    width={product.width}
    height={product.height}
    loading={loading}
    fetchPriority={priority ? "high" : "auto"}
    decoding="async"
    className={`h-full w-full object-contain ${className}`}
  />
);

const ProductQuickView = ({
  product,
  onClose,
}: {
  product: CarAudioProductVisual;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Product details for ${product.model}`}
      onClick={onClose}
    >
      <div
        className="relative grid max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/15 bg-background shadow-2xl md:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white transition hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Close product details"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex min-h-[250px] items-center justify-center bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.14),transparent_52%),linear-gradient(145deg,hsl(var(--secondary)/0.38),hsl(var(--background))_72%)] p-5 sm:min-h-[300px] sm:p-7 md:min-h-[560px] md:p-10">
          <img
            src={product.image}
            alt={product.alt}
            width={product.width}
            height={product.height}
            decoding="async"
            className="max-h-[38vh] max-w-full object-contain drop-shadow-[0_28px_44px_rgba(0,0,0,0.55)] md:max-h-[70vh]"
          />
        </div>

        <div className="min-h-0 overflow-y-auto border-t border-border/60 p-6 pr-16 md:border-l md:border-t-0 md:p-8 md:pr-16 lg:p-10 lg:pr-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Product details</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{product.model}</h2>
          <p className="mt-2 text-base leading-6 text-muted-foreground">{product.type}</p>
          {product.tagline && (
            <p className="mt-5 text-xl font-medium tracking-tight text-primary">{product.tagline}</p>
          )}

          <div className="mt-8 border-t border-border/60 pt-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground/80">Specifications</h3>
            <dl className="mt-4 divide-y divide-border/50">
              {product.specifications.map((item) => (
                <div key={item.label} className="grid grid-cols-[minmax(0,1fr)_auto] gap-5 py-3.5 text-sm">
                  <dt className="text-muted-foreground">{item.label}</dt>
                  <dd className="text-right font-medium text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductVisualGrid = ({ products }: { products: readonly CarAudioProductVisual[] }) => {
  const [selectedProduct, setSelectedProduct] = useState<CarAudioProductVisual | null>(null);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article key={product.id} className="overflow-hidden rounded-2xl border border-border/60 bg-card/45">
            <button
              type="button"
              onClick={() => setSelectedProduct(product)}
              className="group relative block aspect-[4/3] w-full cursor-pointer overflow-hidden border-b border-border/60 bg-[radial-gradient(circle_at_50%_48%,hsl(var(--primary)/0.14),transparent_46%),linear-gradient(145deg,hsl(var(--secondary)/0.46),hsl(var(--background))_72%)] p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
              aria-label={`View details for ${product.model}`}
            >
              <ProductImage product={product} className="drop-shadow-[0_20px_30px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-[1.025]" />
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/85 px-3 py-1.5 text-[11px] font-semibold text-foreground/80 backdrop-blur transition group-hover:text-primary group-focus-visible:text-primary">
                <Eye className="h-3.5 w-3.5" />
                View details
              </span>
            </button>
            <div className="p-5">
              <p className="text-lg font-semibold text-foreground">{product.model}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{product.type}</p>
            </div>
          </article>
        ))}
      </div>
      {selectedProduct && <ProductQuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </>
  );
};

export const ProductPairVisual = ({ products }: { products: readonly CarAudioProductVisual[] }) => (
  <div className="grid h-52 grid-cols-2 gap-2 overflow-hidden border-b border-border/60 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.14),transparent_52%),linear-gradient(145deg,hsl(var(--secondary)/0.48),hsl(var(--background))_72%)] p-3">
    {products.map((product) => (
      <figure key={product.id} className="relative flex min-w-0 items-center justify-center overflow-hidden rounded-xl border border-border/40 bg-background/25 p-2">
        <ProductImage product={product} className="drop-shadow-[0_16px_24px_rgba(0,0,0,0.42)] transition-transform duration-300 group-hover:scale-[1.035]" />
        <figcaption className="absolute bottom-1.5 left-1.5 right-1.5 truncate rounded-md bg-background/75 px-2 py-1 text-center text-[10px] font-semibold text-foreground/80 backdrop-blur-sm">
          {product.model}
        </figcaption>
      </figure>
    ))}
  </div>
);

export const ProductHeroMosaic = ({ products }: { products: readonly CarAudioProductVisual[] }) => (
  <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-border/50 bg-card/25 p-3 sm:p-4 lg:p-5">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_48%,hsl(var(--primary)/0.22),transparent_48%)]" aria-hidden="true" />
    <div className="relative grid min-h-[260px] grid-cols-2 gap-2 sm:min-h-[300px] sm:gap-3 lg:min-h-[400px]">
      {products.map((product) => (
        <figure key={product.id} className="relative flex min-h-0 items-center justify-center overflow-hidden rounded-2xl border border-border/45 bg-background/20 p-3 sm:p-4">
          <ProductImage
            product={product}
            loading="eager"
            priority
            className="drop-shadow-[0_24px_36px_rgba(0,0,0,0.52)]"
          />
          <figcaption className="absolute bottom-2 left-2 rounded-lg border border-border/50 bg-card/80 px-2.5 py-1 text-[10px] font-semibold text-foreground/80 backdrop-blur-md sm:text-xs">
            {product.model}
          </figcaption>
        </figure>
      ))}
    </div>
  </div>
);
