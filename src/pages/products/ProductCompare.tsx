import { useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight, Plus, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import {
  amplifierVisualIds,
  boxedSubwooferVisualIds,
  coaxialSpeakerVisualIds,
  componentSpeakerVisualIds,
  getProductSpecValue,
  getProductVisuals,
  subwooferDriverVisualIds,
  underSeatVisualIds,
  type ProductVisualId,
} from "@/pages/car-audio/productVisuals";

type ProductCategory = "head-units" | "car-audio";
type CarAudioGroupKey =
  | "speakers"
  | "subwoofer-drivers"
  | "under-seat-subwoofers"
  | "boxed-subwoofers"
  | "amplifiers";

type CarAudioCompareGroup = {
  label: string;
  description: string;
  href: string;
  ids: readonly ProductVisualId[];
  specs: readonly string[];
};

const headUnitCompareSpecs = [
  "CPU",
  "GPU",
  "NPU",
  "RAM + ROM",
  "Memory Type",
  "Screen Resolution",
  "Display Type",
  "Touch Haptic",
  "Amplifier",
  "Audio Channel",
  "Subwoofer Output",
  "Sound Effect",
  "Digital Output",
  "Camera Signal",
  "Camera Channels",
  "360° SVM",
  "Sentry Mode",
  "Navigation",
  "Accuracy",
  "OS",
  "WIFI",
  "Bluetooth",
  "4G",
  "Video Output",
  "Video Playback",
  "Apple CarPlay",
  "Android Auto",
];

const speakerIds = [
  ...componentSpeakerVisualIds,
  ...coaxialSpeakerVisualIds,
] as const satisfies readonly ProductVisualId[];

const carAudioGroups: Record<CarAudioGroupKey, CarAudioCompareGroup> = {
  speakers: {
    label: "Speakers",
    description: "Compare component, active and coaxial cabin speakers using their shared published specifications.",
    href: "/car-audio/speakers/",
    ids: speakerIds,
    specs: [
      "Rated Power",
      "Maximum Power",
      "Nominal Impedance",
      "Sensitivity",
      "Frequency Response",
      "Mounting Depth",
    ],
  },
  "subwoofer-drivers": {
    label: "Subwoofer Drivers",
    description: "Compare standalone standard-depth, thin-line and competition subwoofer drivers for custom enclosures.",
    href: "/car-audio/speakers/",
    ids: subwooferDriverVisualIds,
    specs: [
      "Rated Power",
      "Maximum Power",
      "Nominal Impedance",
      "Sensitivity",
      "Frequency Response",
      "Mounting Depth",
      "X-MAX",
      "Voice Coil",
    ],
  },
  "under-seat-subwoofers": {
    label: "Under-Seat Subwoofers",
    description: "Compare compact TS enclosed bass systems by performance and installation dimensions.",
    href: "/car-audio/enclosed-subwoofers/",
    ids: underSeatVisualIds,
    specs: [
      "Rated Power",
      "Maximum Power",
      "Sensitivity",
      "Frequency Response",
      "Frequency Control",
      "Dimensions",
      "Net Weight",
    ],
  },
  "boxed-subwoofers": {
    label: "Boxed Subwoofers",
    description: "Compare active and passive sealed or ported enclosures using their published construction data.",
    href: "/car-audio/enclosed-subwoofers/",
    ids: boxedSubwooferVisualIds,
    specs: [
      "Enclosure Material",
      "Surface Treatment",
      "Dimensions",
      "Net Weight",
    ],
  },
  amplifiers: {
    label: "Amplifiers",
    description: "Compare TD and TP Class D amplifiers by output configuration, power and chassis dimensions.",
    href: "/car-audio/amplifiers/",
    ids: amplifierVisualIds,
    specs: [
      "RMS Power @ 4 Ω",
      "RMS Power @ 2 Ω",
      "Bridged Power @ 4 Ω",
      "Dimensions",
      "Net Weight",
    ],
  },
};

const getInitialAudioSelection = (group: CarAudioCompareGroup) =>
  group.ids.slice(0, Math.min(3, group.ids.length));

const ProductComparePage = () => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("head-units");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([
    "cc4-pro",
    "cc4",
    "cc4l",
  ]);
  const [activeAudioGroup, setActiveAudioGroup] = useState<CarAudioGroupKey>("speakers");
  const [selectedAudioIds, setSelectedAudioIds] = useState<readonly ProductVisualId[]>(() =>
    getInitialAudioSelection(carAudioGroups.speakers),
  );

  const comparedProducts = selectedProducts
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);

  const availableToAdd = products.filter(
    (product) => !selectedProducts.includes(product.id),
  );

  const activeAudioConfig = carAudioGroups[activeAudioGroup];
  const comparedAudioProducts = useMemo(
    () => getProductVisuals(selectedAudioIds),
    [selectedAudioIds],
  );
  const availableAudioToAdd = activeAudioConfig.ids.filter(
    (id) => !selectedAudioIds.includes(id),
  );

  const addProduct = (productId: string) => {
    if (selectedProducts.length < 5) {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const removeProduct = (productId: string) => {
    if (selectedProducts.length > 2) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  const selectAudioGroup = (key: CarAudioGroupKey) => {
    setActiveAudioGroup(key);
    setSelectedAudioIds(getInitialAudioSelection(carAudioGroups[key]));
  };

  const addAudioProduct = (productId: ProductVisualId) => {
    if (selectedAudioIds.length < 4 && !selectedAudioIds.includes(productId)) {
      setSelectedAudioIds([...selectedAudioIds, productId]);
    }
  };

  const removeAudioProduct = (productId: ProductVisualId) => {
    if (selectedAudioIds.length > 2) {
      setSelectedAudioIds(selectedAudioIds.filter((id) => id !== productId));
    }
  };

  const getHeadUnitSpecValue = (product: typeof products[0], specLabel: string) => {
    const spec = product.specs.find((item) => item.label === specLabel);
    return spec?.value || "-";
  };

  const renderValue = (value: string) => {
    if (value === "Yes") return <Check className="h-5 w-5 text-success mx-auto" />;
    if (value === "No") return <X className="h-5 w-5 text-muted-foreground mx-auto" />;
    return value;
  };

  return (
    <Layout>
      <SEO
        title="Compare TEYES Products - Android Head Units & Car Audio"
        description="Compare TEYES Android head units, speakers, subwoofer systems and amplifiers side-by-side using product-specific published specifications."
        keywords="compare TEYES products, compare car head units, android head unit comparison, car audio comparison, speaker comparison, amplifier comparison"
        path="/products/compare/"
      />
      <ContextHeader
        title="Compare Products"
        description="Choose a product category, then compare compatible TEYES models side-by-side."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products/" },
          { label: "Compare" },
        ]}
      />

      <section className="border-b border-border/60 bg-background py-10 md:py-12">
        <div className="container-wide">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Choose product category
          </p>
          <div className="mt-4 grid max-w-3xl gap-3 sm:grid-cols-2" role="tablist" aria-label="Product comparison category">
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === "head-units"}
              onClick={() => setActiveCategory("head-units")}
              className={`rounded-2xl border p-5 text-left transition-colors ${
                activeCategory === "head-units"
                  ? "border-primary bg-primary/10"
                  : "border-border/60 bg-card/40 hover:border-primary/40"
              }`}
            >
              <span className="block text-lg font-semibold text-foreground">Android Head Units</span>
              <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                Compare infotainment performance, display, audio, cameras and connectivity.
              </span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === "car-audio"}
              onClick={() => setActiveCategory("car-audio")}
              className={`rounded-2xl border p-5 text-left transition-colors ${
                activeCategory === "car-audio"
                  ? "border-primary bg-primary/10"
                  : "border-border/60 bg-card/40 hover:border-primary/40"
              }`}
            >
              <span className="block text-lg font-semibold text-foreground">Car Audio</span>
              <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                Compare speakers, subwoofer products and amplifiers within compatible technical groups.
              </span>
            </button>
          </div>

          {activeCategory === "car-audio" && (
            <div className="mt-8">
              <p className="text-sm font-semibold text-foreground">Choose Car Audio type</p>
              <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label="Car Audio comparison type">
                {(Object.keys(carAudioGroups) as CarAudioGroupKey[]).map((key) => {
                  const item = carAudioGroups[key];
                  const active = key === activeAudioGroup;
                  return (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => selectAudioGroup(key)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border/70 bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
              <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/40 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{activeAudioConfig.label}</h2>
                  <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
                    {activeAudioConfig.description}
                  </p>
                </div>
                <Button variant="hero-outline" size="sm" asChild>
                  <Link to={activeAudioConfig.href}>
                    View Category
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {activeCategory === "head-units" ? (
        <section className="py-16 bg-background">
          <div className="container-wide">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr>
                    <th className="text-left p-4 border-b border-border/50 w-48">
                      <span className="text-muted-foreground font-normal">Specification</span>
                    </th>
                    {comparedProducts.map((product) => (
                      <th key={product!.id} className="p-4 border-b border-border/50 relative">
                        {selectedProducts.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeProduct(product!.id)}
                            className="absolute top-2 right-2 text-muted-foreground hover:text-destructive transition-colors"
                            title="Remove from comparison"
                            aria-label={`Remove ${product!.name} from comparison`}
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                        )}
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-32 h-32 rounded-xl bg-secondary/50 flex items-center justify-center overflow-hidden">
                            <img
                              src={product!.image}
                              alt={product!.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="text-center">
                            <p className="text-primary text-sm font-medium">{product!.seriesName}</p>
                            <h3 className="text-lg font-semibold">{product!.name}</h3>
                          </div>
                          <Button variant="hero-outline" size="sm" asChild>
                            <Link to={`/products/${product!.id}/`}>View Details</Link>
                          </Button>
                        </div>
                      </th>
                    ))}
                    {availableToAdd.length > 0 && selectedProducts.length < 5 && (
                      <th className="p-4 border-b border-border/50 min-w-[200px]">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-32 h-32 rounded-xl border-2 border-dashed border-border flex items-center justify-center">
                            <Plus className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <div className="text-center">
                            <p className="text-muted-foreground text-sm">Add Model</p>
                          </div>
                          <select
                            onChange={(event) => {
                              if (event.target.value) {
                                addProduct(event.target.value);
                                event.target.value = "";
                              }
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            defaultValue=""
                          >
                            <option value="" disabled>Select model...</option>
                            {availableToAdd.map((product) => (
                              <option key={product.id} value={product.id}>
                                {product.name} ({product.seriesName})
                              </option>
                            ))}
                          </select>
                        </div>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {headUnitCompareSpecs.map((spec, index) => (
                    <tr key={spec} className={index % 2 === 0 ? "bg-card/50" : ""}>
                      <td className="p-4 border-b border-border/30 font-medium">{spec}</td>
                      {comparedProducts.map((product) => (
                        <td key={product!.id} className="p-4 border-b border-border/30 text-center">
                          {renderValue(getHeadUnitSpecValue(product!, spec))}
                        </td>
                      ))}
                      {availableToAdd.length > 0 && selectedProducts.length < 5 && (
                        <td className="p-4 border-b border-border/30" />
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-6 text-center">
              Compare up to 5 Android head unit models. Click the × to remove a model, or use the dropdown to add more.
            </p>
          </div>
        </section>
      ) : (
        <section className="py-16 bg-background">
          <div className="container-wide">
            <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card/30">
              <table className="w-full min-w-[820px] text-sm">
                <thead>
                  <tr>
                    <th className="w-48 border-b border-border/60 p-4 text-left font-medium text-muted-foreground">
                      Specification
                    </th>
                    {comparedAudioProducts.map((product) => (
                      <th key={product.id} className="relative min-w-[190px] border-b border-border/60 p-4 align-top">
                        {selectedAudioIds.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeAudioProduct(product.id as ProductVisualId)}
                            className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive"
                            aria-label={`Remove ${product.model} from comparison`}
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                        )}
                        <div className="flex flex-col items-center gap-3 pt-2 text-center">
                          <div className="flex h-28 w-36 items-center justify-center overflow-hidden rounded-xl bg-secondary/40 p-2">
                            <img
                              src={product.image}
                              alt={product.alt}
                              width={product.width}
                              height={product.height}
                              loading="lazy"
                              decoding="async"
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-foreground">{product.model}</h3>
                            <p className="mt-1 text-xs font-normal leading-5 text-muted-foreground">
                              {product.comparisonType ?? product.type}
                            </p>
                          </div>
                        </div>
                      </th>
                    ))}
                    {availableAudioToAdd.length > 0 && selectedAudioIds.length < 4 && (
                      <th className="min-w-[200px] border-b border-border/60 p-4 align-top">
                        <div className="flex flex-col items-center gap-4 pt-3">
                          <div className="flex h-28 w-36 items-center justify-center rounded-xl border-2 border-dashed border-border/70">
                            <Plus className="h-7 w-7 text-muted-foreground" />
                          </div>
                          <label className="w-full text-xs font-normal text-muted-foreground">
                            Add model
                            <select
                              defaultValue=""
                              onChange={(event) => {
                                if (!event.target.value) return;
                                addAudioProduct(event.target.value as ProductVisualId);
                                event.target.value = "";
                              }}
                              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                            >
                              <option value="" disabled>Select model...</option>
                              {availableAudioToAdd.map((id) => {
                                const product = getProductVisuals([id])[0];
                                return (
                                  <option key={id} value={id}>{product.model}</option>
                                );
                              })}
                            </select>
                          </label>
                        </div>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {activeAudioConfig.specs.map((spec, index) => (
                    <tr key={spec} className={index % 2 === 0 ? "bg-secondary/20" : ""}>
                      <th scope="row" className="border-b border-border/40 p-4 text-left font-medium text-foreground">
                        {spec}
                      </th>
                      {comparedAudioProducts.map((product) => (
                        <td key={`${product.id}-${spec}`} className="border-b border-border/40 p-4 text-center text-muted-foreground">
                          {getProductSpecValue(product, spec) ?? "N/A"}
                        </td>
                      ))}
                      {availableAudioToAdd.length > 0 && selectedAudioIds.length < 4 && (
                        <td className="border-b border-border/40 p-4" />
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-6 text-center">
              Compare 2 to 4 Car Audio models within the selected technical group.
            </p>
          </div>
        </section>
      )}

      <section className="py-16 bg-card">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-display font-bold mb-4">Ready to Make a Decision?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Contact our team to discuss pricing, volume discounts, and partnership opportunities.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact/">
              Get a Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default ProductComparePage;
