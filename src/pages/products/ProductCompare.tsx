import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight, Plus, XCircle } from "lucide-react";
import { products } from "@/data/products";

const compareSpecs = ["CPU", "GPU", "NPU", "RAM + ROM", "Memory Type", "Screen Resolution", "Display Type", "Touch Haptic", "Amplifier", "Audio Channel", "Subwoofer Output", "Sound Effect", "Digital Output", "Camera Signal", "Camera Channels", "360° SVM", "Sentry Mode", "Navigation", "Accuracy", "OS", "WIFI", "Bluetooth", "4G", "Video Output", "Video Playback", "Apple CarPlay", "Android Auto"];

const marketRecommendations = [
  { market: "Premium installers and high-end retailers", models: "CC4 Pro / CC3 2K", reason: "Best fit when customers care about Android head unit performance, display quality, audio, camera integration, and premium positioning." },
  { market: "Mainstream car stereo distributors", models: "CC3 2K / CC4", reason: "Balanced product ladder for distributors who need strong car radio and Android player features without only selling the flagship price point." },
  { market: "Price-sensitive car audio channels", models: "X1 Pro / CC4L", reason: "Lower entry barrier for wholesale channels that need Android Auto, CarPlay, and core infotainment functions." },
  { market: "First trial order", models: "CC4 Pro + CC3 2K + X1 Pro", reason: "Tests premium, mainstream, and entry-level demand before expanding stock depth." },
];

const faqs = [
  { question: "Which TEYES model is best for premium installers?", answer: "CC4 Pro and CC3 2K are the strongest starting points for premium installers because they support stronger Android head unit performance, display, audio, and camera positioning." },
  { question: "What if I am searching for TEYES CC3 or a TEYES Android player?", answer: "Use this comparison page to compare current TEYES Android car stereo platforms, including CC3 2K, CC4 Pro, CC4, CC4L, and X1 Pro, then choose the right head unit model for your market." },
  { question: "Which TEYES models should a distributor test first?", answer: "A mixed trial with CC4 Pro, CC3 2K, and X1 Pro helps test premium, mainstream, and entry-level head unit and car stereo demand in one market." },
  { question: "Is the comparison page only for technical specs?", answer: "No. It should also help distributors decide which Android head unit, car stereo, or car radio model fits their channel, market maturity, price band, and after-sales support capability." },
];

const ProductComparePage = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>(["cc4-pro", "cc4", "cc4l"]);
  const comparedProducts = selectedProducts.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  const availableToAdd = products.filter((p) => !selectedProducts.includes(p.id));
  const addProduct = (productId: string) => { if (selectedProducts.length < 5) setSelectedProducts([...selectedProducts, productId]); };
  const removeProduct = (productId: string) => { if (selectedProducts.length > 2) setSelectedProducts(selectedProducts.filter((id) => id !== productId)); };
  const getSpecValue = (product: typeof products[0], specLabel: string) => product.specs.find((s) => s.label === specLabel)?.value || "-";
  const renderValue = (value: string) => {
    if (value === "Yes") return <Check className="h-5 w-5 text-success mx-auto" />;
    if (value === "No") return <X className="h-5 w-5 text-muted-foreground mx-auto" />;
    return value;
  };

  return (
    <Layout>
      <SEO title="Compare TEYES Android Car Stereos, Head Units & Car Radios" description="Compare TEYES CC4 Pro, CC3 2K, CC4, CC4L, X1 Pro, and other Android head unit and car stereo models by performance, display, audio, camera support, and market fit." keywords="compare android head units, TEYES CC3, TEYES android player, CC4 Pro vs CC3 2K, TEYES model comparison, android car stereo wholesale, car radio comparison, distributor product mix" path="/products/compare" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "Compare" }]} faq={faqs} />
      <ContextHeader title="Compare TEYES Head Unit & Car Stereo Models" description="Compare specifications side-by-side and choose the best Android car stereo and head unit product mix for your market." breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "Compare" }]} />

      <section className="py-16 bg-background"><div className="container-wide"><div className="text-center max-w-3xl mx-auto mb-12"><h2 className="section-title mb-4">Looking for TEYES CC3 or a TEYES Android Player?</h2><p className="section-subtitle mx-auto">Compare current TEYES Android head unit and car stereo platforms, including CC3 2K, CC4 Pro, CC4, CC4L, and X1 Pro, to choose the right model for your market.</p></div></div></section>

      <section className="py-16 bg-background"><div className="container-wide"><div className="text-center max-w-3xl mx-auto mb-12"><h2 className="section-title mb-4">Which TEYES Model Should You Choose?</h2><p className="section-subtitle mx-auto">Use the comparison below to match each head unit and car stereo product line with your channel, customer expectations, and first-order strategy.</p></div><div className="overflow-x-auto mb-10"><table className="w-full min-w-[800px]"><thead><tr className="bg-card"><th className="text-left p-4 border-b border-border/50">Market / Channel</th><th className="text-left p-4 border-b border-border/50">Recommended Models</th><th className="text-left p-4 border-b border-border/50">Why</th></tr></thead><tbody>{marketRecommendations.map((item) => (<tr key={item.market}><td className="p-4 border-b border-border/30 font-medium">{item.market}</td><td className="p-4 border-b border-border/30 text-primary">{item.models}</td><td className="p-4 border-b border-border/30 text-muted-foreground">{item.reason}</td></tr>))}</tbody></table></div><div className="flex flex-wrap justify-center gap-3"><Button variant="hero" size="lg" asChild><Link to="/contact?intent=product-mix">Get Product Mix Recommendation<ArrowRight className="h-4 w-4" /></Link></Button><Button variant="hero-outline" size="lg" asChild><Link to="/resources/android-car-stereo-wholesale-guide">Wholesale Buying Guide</Link></Button><Button variant="ghost" size="lg" asChild><Link to="/solutions/distributors">Distributor Program</Link></Button></div></div></section>

      <section className="py-16 bg-card"><div className="container-wide"><div className="rounded-2xl bg-background border border-border/50 p-8 md:p-10"><div className="grid md:grid-cols-[1fr_auto] gap-8 items-center"><div><span className="text-primary text-sm font-medium uppercase tracking-wider">Wholesale guide</span><h2 className="text-2xl font-display font-bold mt-2 mb-3">Not sure which models to buy wholesale?</h2><p className="text-muted-foreground">Use the Android Car Stereo Wholesale Buying Guide to plan a product ladder, accessory bundle, and first trial order before comparing detailed specifications.</p></div><Button variant="hero-outline" size="lg" asChild><Link to="/resources/android-car-stereo-wholesale-guide">Read Wholesale Guide<ArrowRight className="h-4 w-4" /></Link></Button></div></div></div></section>

      <section className="py-16 bg-background"><div className="container-wide"><div className="overflow-x-auto"><table className="w-full min-w-[800px]"><thead><tr><th className="text-left p-4 border-b border-border/50 w-48"><span className="text-muted-foreground font-normal">Specification</span></th>{comparedProducts.map((product) => (<th key={product!.id} className="p-4 border-b border-border/50 relative">{selectedProducts.length > 2 && (<button onClick={() => removeProduct(product!.id)} className="absolute top-2 right-2 text-muted-foreground hover:text-destructive transition-colors" title="Remove from comparison"><XCircle className="h-5 w-5" /></button>)}<div className="flex flex-col items-center gap-4"><div className="w-32 h-32 rounded-xl bg-secondary/50 flex items-center justify-center overflow-hidden"><img src={product!.image} alt={product!.name} className="w-full h-full object-contain" /></div><div className="text-center"><p className="text-primary text-sm font-medium">{product!.seriesName}</p><h3 className="text-lg font-semibold">{product!.name}</h3></div><Button variant="hero-outline" size="sm" asChild><Link to={`/products/${product!.id}`}>View Details</Link></Button></div></th>))}{availableToAdd.length > 0 && selectedProducts.length < 5 && (<th className="p-4 border-b border-border/50 min-w-[200px]"><div className="flex flex-col items-center gap-4"><div className="w-32 h-32 rounded-xl border-2 border-dashed border-border flex items-center justify-center"><Plus className="h-8 w-8 text-muted-foreground" /></div><div className="text-center"><p className="text-muted-foreground text-sm">Add Model</p></div><select onChange={(e) => { if (e.target.value) { addProduct(e.target.value); e.target.value = ""; } }} className="w-full px-3 py-2 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" defaultValue=""><option value="" disabled>Select model...</option>{availableToAdd.map((product) => (<option key={product.id} value={product.id}>{product.name} ({product.seriesName})</option>))}</select></div></th>)}</tr></thead><tbody>{compareSpecs.map((spec, index) => (<tr key={spec} className={index % 2 === 0 ? "bg-card/50" : ""}><td className="p-4 border-b border-border/30 font-medium">{spec}</td>{comparedProducts.map((product) => (<td key={product!.id} className="p-4 border-b border-border/30 text-center">{renderValue(getSpecValue(product!, spec))}</td>))}{availableToAdd.length > 0 && selectedProducts.length < 5 && <td className="p-4 border-b border-border/30"></td>}</tr>))}</tbody></table></div><p className="text-sm text-muted-foreground mt-6 text-center">Compare up to 5 models. Click the × to remove a model, or use the dropdown to add more.</p></div></section>

      <section className="py-16 bg-background"><div className="container-wide max-w-4xl"><div className="text-center mb-10"><h2 className="section-title mb-4">Model Selection FAQ</h2></div><div className="space-y-4">{faqs.map((faq) => (<div key={faq.question} className="p-6 rounded-xl bg-card border border-border/50"><h3 className="font-semibold mb-2">{faq.question}</h3><p className="text-muted-foreground text-sm">{faq.answer}</p></div>))}</div></div></section>

      <section className="py-16 bg-card"><div className="container-wide text-center"><h2 className="text-2xl font-display font-bold mb-4">Need Help Choosing a Head Unit Product Mix?</h2><p className="text-muted-foreground mb-8 max-w-xl mx-auto">Contact our team to discuss your country, channels, price bands, volume expectations, and partnership opportunities.</p><div className="flex flex-wrap justify-center gap-3"><Button variant="hero" size="lg" asChild><Link to="/contact?intent=product-mix">Get a Product Mix Recommendation<ArrowRight className="h-4 w-4" /></Link></Button><Button variant="hero-outline" size="lg" asChild><Link to="/resources/android-car-stereo-wholesale-guide">Read Wholesale Guide</Link></Button></div></div></section>
    </Layout>
  );
};

export default ProductComparePage;
