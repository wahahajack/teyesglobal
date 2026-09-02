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

export const ProductVisualGrid = ({ products }: { products: readonly CarAudioProductVisual[] }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {products.map((product) => (
      <article key={product.id} className="overflow-hidden rounded-2xl border border-border/60 bg-card/45">
        <div className="aspect-[4/3] overflow-hidden border-b border-border/60 bg-[radial-gradient(circle_at_50%_48%,hsl(var(--primary)/0.14),transparent_46%),linear-gradient(145deg,hsl(var(--secondary)/0.46),hsl(var(--background))_72%)] p-5">
          <ProductImage product={product} className="drop-shadow-[0_20px_30px_rgba(0,0,0,0.45)]" />
        </div>
        <div className="p-5">
          <p className="text-lg font-semibold text-foreground">{product.model}</p>
          <p className="mt-1 text-sm text-muted-foreground">{product.type}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {product.specs.map((spec) => (
              <span key={spec} className="rounded-full border border-border/60 bg-secondary/45 px-2.5 py-1 text-[11px] text-foreground/75">
                {spec}
              </span>
            ))}
          </div>
        </div>
      </article>
    ))}
  </div>
);

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
    <div className="relative grid min-h-[300px] grid-cols-2 gap-2 sm:min-h-[360px] sm:gap-3 lg:min-h-[500px]">
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
