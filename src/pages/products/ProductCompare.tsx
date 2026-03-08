import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight, Plus, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";

const compareSpecs = [
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

const ProductComparePage = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([
    "cc4-pro",
    "cc4",
    "cc4l",
  ]);

  const comparedProducts = selectedProducts
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const availableToAdd = products.filter(
    (p) => !selectedProducts.includes(p.id)
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

  const getSpecValue = (product: typeof products[0], specLabel: string) => {
    const spec = product.specs.find((s) => s.label === specLabel);
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
        title="Compare Car Head Units - CC4 Pro vs CC3 2K vs X1 Pro"
        description="Compare TEYES car infotainment models side-by-side. Compare CPU, display, audio, cameras, and connectivity features across CC4 Pro, CC3 2K, and X1 Pro."
        keywords="compare car head units, CC4 Pro vs CC3 2K, android head unit comparison, infotainment specs"
        path="/products/compare"
      />
      <ContextHeader
        title="Compare Models"
        description="Compare specifications side-by-side to find the best product for your market."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Compare" },
        ]}
      />

      {/* Comparison Table */}
      <section className="py-16 bg-background">
        <div className="container-wide">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              {/* Product Headers */}
              <thead>
                <tr>
                  <th className="text-left p-4 border-b border-border/50 w-48">
                    <span className="text-muted-foreground font-normal">Specification</span>
                  </th>
                  {comparedProducts.map((product) => (
                    <th key={product!.id} className="p-4 border-b border-border/50 relative">
                      {/* Remove button */}
                      {selectedProducts.length > 2 && (
                        <button
                          onClick={() => removeProduct(product!.id)}
                          className="absolute top-2 right-2 text-muted-foreground hover:text-destructive transition-colors"
                          title="Remove from comparison"
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
                          <p className="text-primary text-sm font-medium">
                            {product!.seriesName}
                          </p>
                          <h3 className="text-lg font-semibold">{product!.name}</h3>
                        </div>
                        <Button variant="hero-outline" size="sm" asChild>
                          <Link to={`/products/${product!.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </th>
                  ))}
                  {/* Add Product Column */}
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
                          onChange={(e) => {
                            if (e.target.value) {
                              addProduct(e.target.value);
                              e.target.value = "";
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

              {/* Specs Body */}
              <tbody>
                {compareSpecs.map((spec, index) => (
                  <tr
                    key={spec}
                    className={index % 2 === 0 ? "bg-card/50" : ""}
                  >
                    <td className="p-4 border-b border-border/30 font-medium">
                      {spec}
                    </td>
                    {comparedProducts.map((product) => (
                      <td
                        key={product!.id}
                        className="p-4 border-b border-border/30 text-center"
                      >
                        {renderValue(getSpecValue(product!, spec))}
                      </td>
                    ))}
                    {/* Empty cell for add column */}
                    {availableToAdd.length > 0 && selectedProducts.length < 5 && (
                      <td className="p-4 border-b border-border/30"></td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Helper text */}
          <p className="text-sm text-muted-foreground mt-6 text-center">
            Compare up to 5 models. Click the × to remove a model, or use the dropdown to add more.
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-card">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-display font-bold mb-4">
            Ready to Make a Decision?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Contact our team to discuss pricing, volume discounts, and 
            partnership opportunities.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">
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
