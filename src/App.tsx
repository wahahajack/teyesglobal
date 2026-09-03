import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Critical path - load immediately
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load global feedback UIs. They are not needed for first paint.
const Toaster = lazy(() =>
  import("@/components/ui/toaster").then((module) => ({ default: module.Toaster }))
);
const Sonner = lazy(() =>
  import("@/components/ui/sonner").then((module) => ({ default: module.Toaster }))
);

// Lazy load non-critical pages for better mobile performance
// Products
const ProductsPage = lazy(() => import("./pages/products/Products"));
const ProductLinesPage = lazy(() => import("./pages/products/ProductLines"));
const ProductDetailPage = lazy(() => import("./pages/products/ProductDetail"));
const ProductComparePage = lazy(() => import("./pages/products/ProductCompare"));
const CarAudioPage = lazy(() => import("./pages/car-audio/CarAudio"));
const CarAudioCategoryPage = lazy(() => import("./pages/car-audio/CarAudioCategory"));
const CarAudioComparePage = lazy(() => import("./pages/car-audio/CarAudioCompare"));

// Solutions
const SolutionsPage = lazy(() => import("./pages/solutions/Solutions"));
const SolutionsDistributorsPage = lazy(() => import("./pages/solutions/SolutionsDistributors"));
const SolutionsAutoBrandsPage = lazy(() => import("./pages/solutions/SolutionsAutoBrands"));
const SolutionsIntegratorsPage = lazy(() => import("./pages/solutions/SolutionsIntegrators"));
const SolutionsMarketNeedsPage = lazy(() => import("./pages/solutions/SolutionsMarketNeeds"));

// OEM/ODM
const OemOdmPage = lazy(() => import("./pages/oem/OemOdm"));
const OemCapabilitiesPage = lazy(() => import("./pages/oem/OemCapabilities"));
const OemCertificationsPage = lazy(() => import("./pages/oem/OemCertifications"));
const OemCasesPage = lazy(() => import("./pages/oem/OemCases"));

// Landing Pages
const LandingOemPage = lazy(() => import("./pages/landing/LandingOem"));
const LandingMarketEntryPage = lazy(() => import("./pages/landing/LandingMarketEntry"));
const LandingDistributorPage = lazy(() => import("./pages/landing/LandingDistributor"));

// Other Pages
const AccessoriesPage = lazy(() => import("./pages/Accessories"));
const ContactPage = lazy(() => import("./pages/Contact"));
const HomeThankYou = lazy(() => import("./pages/HomeThankYou"));

// Minimal loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="space-y-4 w-full max-w-md px-4">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6 mx-auto" />
      </div>
    </div>
  );
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* Products */}
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/lines" element={<ProductLinesPage />} />
              <Route path="/products/compare" element={<ProductComparePage />} />
              <Route path="/products/:productId" element={<ProductDetailPage />} />
              <Route path="/car-audio" element={<CarAudioPage />} />
              <Route path="/car-audio/compare" element={<CarAudioComparePage />} />
              <Route path="/car-audio/speakers" element={<CarAudioCategoryPage category="speakers" />} />
              <Route path="/car-audio/enclosed-subwoofers" element={<CarAudioCategoryPage category="enclosed-subwoofers" />} />
              <Route path="/car-audio/amplifiers" element={<CarAudioCategoryPage category="amplifiers" />} />
              {/* Solutions */}
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/solutions/distributors" element={<SolutionsDistributorsPage />} />
              <Route path="/solutions/auto-brands" element={<SolutionsAutoBrandsPage />} />
              <Route path="/solutions/integrators" element={<SolutionsIntegratorsPage />} />
              <Route path="/solutions/market-needs" element={<SolutionsMarketNeedsPage />} />
              {/* OEM/ODM */}
              <Route path="/oem-odm" element={<OemOdmPage />} />
              <Route path="/oem-odm/capabilities" element={<OemCapabilitiesPage />} />
              <Route path="/oem-odm/certifications" element={<OemCertificationsPage />} />
              <Route path="/oem-odm/cases" element={<OemCasesPage />} />
              {/* Landing Pages */}
              <Route path="/landing/oem" element={<LandingOemPage />} />
              <Route path="/landing/market-entry" element={<LandingMarketEntryPage />} />
              <Route path="/landing/distributor" element={<LandingDistributorPage />} />
              {/* Accessories */}
              <Route path="/accessories" element={<AccessoriesPage />} />
              {/* Contact */}
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/thank-you" element={<HomeThankYou />} />
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Suspense fallback={null}>
            <Toaster />
            <Sonner />
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
