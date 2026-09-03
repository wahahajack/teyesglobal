import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Plus, XCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
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
} from "./productVisuals";

type CompareGroupKey =
  | "speakers"
  | "subwoofer-drivers"
  | "under-seat-subwoofers"
  | "boxed-subwoofers"
  | "amplifiers";

type CompareGroup = {
  label: string;
  description: string;
  href: string;
  ids: readonly ProductVisualId[];
  specs: readonly string[];
};

const speakerIds = [
  ...componentSpeakerVisualIds,
  ...coaxialSpeakerVisualIds,
] as const satisfies readonly ProductVisualId[];

const compareGroups: Record<CompareGroupKey, CompareGroup> = {
  speakers: {
    label: "Speakers",
    description: "Compare component, active and coaxial cabin speakers using the shared published speaker specifications.",
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
    description: "Compare standalone 10-inch standard-depth, thin-line and competition drivers for custom enclosures.",
    href: "/car-audio/speakers/#standalone-subwoofer-drivers",
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
    description: "Compare compact TS enclosed bass systems using their published performance and installation dimensions.",
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
    description: "Compare active and passive sealed or ported enclosures using the construction data currently published for each model.",
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

const getInitialSelection = (group: CompareGroup) =>
  group.ids.slice(0, Math.min(3, group.ids.length));

const CarAudioCompare = () => {
  const [activeGroup, setActiveGroup] = useState<CompareGroupKey>("speakers");
  const [selectedIds, setSelectedIds] = useState<readonly ProductVisualId[]>(() =>
    getInitialSelection(compareGroups.speakers),
  );

  const group = compareGroups[activeGroup];
  const comparedProducts = useMemo(() => getProductVisuals(selectedIds), [selectedIds]);
  const availableToAdd = group.ids.filter((id) => !selectedIds.includes(id));

  const selectGroup = (key: CompareGroupKey) => {
    const nextGroup = compareGroups[key];
    setActiveGroup(key);
    setSelectedIds(getInitialSelection(nextGroup));
  };

  const addProduct = (id: ProductVisualId) => {
    if (selectedIds.length >= 4 || selectedIds.includes(id)) return;
    setSelectedIds([...selectedIds, id]);
  };

  const removeProduct = (id: ProductVisualId) => {
    if (selectedIds.length <= 2) return;
    setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
  };

  return (
    <Layout>
      <SEO
        title="Compare TEYES Car Audio Products - Speakers, Subwoofers & Amplifiers"
        description="Compare TEYES car speakers, subwoofer drivers, enclosed subwoofers and Class D amplifiers side-by-side using published specifications."
        path="/car-audio/compare/"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Car Audio", href: "/car-audio/" },
          { label: "Compare" },
        ]}
      />

      <ContextHeader
        title="Compare Car Audio"
        description="Compare compatible TEYES Car Audio models side-by-side using the specifications published for each product family."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Car Audio", href: "/car-audio/" },
          { label: "Compare" },
        ]}
      />

      <section className="border-b border-border/60 bg-background py-10 md:py-14">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-sm leading-6 text-muted-foreground">
              Choose one technical family first. Products with incompatible specification sets are intentionally kept in separate comparison groups.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Car Audio comparison group">
            {(Object.keys(compareGroups) as CompareGroupKey[]).map((key) => {
              const item = compareGroups[key];
              const active = key === activeGroup;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => selectGroup(key)}
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

          <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/40 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">{group.label}</h2>
              <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">{group.description}</p>
            </div>
            <Button variant="hero-outline" size="sm" asChild>
              <Link to={group.href}>
                View Category
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-background py-12 md:py-16">
        <div className="container-wide">
          <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card/30">
            <table className="w-full min-w-[820px] text-sm">
              <thead>
                <tr>
                  <th className="w-48 border-b border-border/60 p-4 text-left font-medium text-muted-foreground">
                    Specification
                  </th>
                  {comparedProducts.map((product) => (
                    <th key={product.id} className="relative min-w-[190px] border-b border-border/60 p-4 align-top">
                      {selectedIds.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeProduct(product.id as ProductVisualId)}
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
                          <p className="mt-1 text-xs font-normal leading-5 text-muted-foreground">{product.comparisonType ?? product.type}</p>
                        </div>
                      </div>
                    </th>
                  ))}

                  {availableToAdd.length > 0 && selectedIds.length < 4 && (
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
                              addProduct(event.target.value as ProductVisualId);
                              event.target.value = "";
                            }}
                            className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                          >
                            <option value="" disabled>Select model...</option>
                            {availableToAdd.map((id) => {
                              const product = getProductVisuals([id])[0];
                              return product ? (
                                <option key={id} value={id}>{product.model}</option>
                              ) : null;
                            })}
                          </select>
                        </label>
                      </div>
                    </th>
                  )}
                </tr>
              </thead>

              <tbody>
                {group.specs.map((spec, index) => (
                  <tr key={spec} className={index % 2 === 0 ? "bg-secondary/20" : ""}>
                    <th scope="row" className="border-b border-border/40 p-4 text-left font-medium text-foreground">
                      {spec}
                    </th>
                    {comparedProducts.map((product) => (
                      <td key={`${product.id}-${spec}`} className="border-b border-border/40 p-4 text-center text-muted-foreground">
                        {getProductSpecValue(product, spec) ?? "N/A"}
                      </td>
                    ))}
                    {availableToAdd.length > 0 && selectedIds.length < 4 && (
                      <td className="border-b border-border/40 p-4" />
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>Compare 2 to 4 models within the selected technical family.</p>
            <Link to="/car-audio/" className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary/80">
              Back to TEYES Car Audio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CarAudioCompare;
