import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const ProductsPage = lazy(() => import("./pages/products/Products"));
const ProductLinesPage = lazy(() => import("./pages/products/ProductLines"));
const ProductDetailPage = lazy(() => import("./pages/products/ProductDetail"));
const ProductComparePage = lazy(() => import("./pages/products/ProductCompare"));

const SolutionsPage = lazy(() => import("./pages/solutions/Solutions"));
const SolutionsDistributorsPage = lazy(() => import("./pages/solutions/SolutionsDistributors"));
const SolutionsAutoBrandsPage = lazy(() => import("./pages/solutions/SolutionsAutoBrands"));
const SolutionsIntegratorsPage = lazy(() => import("./pages/solutions/SolutionsIntegrators"));
const SolutionsMarketNeedsPage = lazy(() => import("./pages/solutions/SolutionsMarketNeeds"));
const SolutionsEuropeDistributorsPage = lazy(() => import("./pages/solutions/SolutionsEuropeDistributors"));

const ResourcesPage = lazy(() => import("./pages/resources/Resources"));
const ChinaCarAudioManufacturersGuide = lazy(() => import("./pages/resources/ChinaCarAudioManufacturersGuide"));
const AndroidCarStereoWholesaleGuide = lazy(() => import("./pages/resources/AndroidCarStereoWholesaleGuide"));

const OemOdmPage = lazy(() => import("./pages/oem/OemOdm"));
const OemCapabilitiesPage = lazy(() => import("./pages/oem/OemCapabilities"));
const OemCertificationsPage = lazy(() => import("./pages/oem/OemCertifications"));
const OemCasesPage = lazy(() => import("./pages/oem/OemCases"));

const LandingOemPage = lazy(() => import("./pages/landing/LandingOem"));
const LandingMarketEntryPage = lazy(() => import("./pages/landing/LandingMarketEntry"));
const LandingDistributorPage = lazy(() => import("./pages/landing/LandingDistributor"));

const AccessoriesPage = lazy(() => import("./pages/Accessories"));
const ContactPage = lazy(() => import("./pages/Contact"));
const HomeThankYou = lazy(() => import("./pages/HomeThankYou"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="space-y-4 w-full max-w-md px-4">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/lines" element={<ProductLinesPage />} />
              <Route path="/products/compare" element={<ProductComparePage />} />
              <Route path="/products/:productId" element={<ProductDetailPage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/solutions/distributors" element={<SolutionsDistributorsPage />} />
              <Route path="/solutions/auto-brands" element={<SolutionsAutoBrandsPage />} />
              <Route path="/solutions/integrators" element={<SolutionsIntegratorsPage />} />
              <Route path="/solutions/market-needs" element={<SolutionsMarketNeedsPage />} />
              <Route path="/solutions/europe-distributors" element={<SolutionsEuropeDistributorsPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/resources/china-car-audio-manufacturers-guide" element={<ChinaCarAudioManufacturersGuide />} />
              <Route path="/resources/android-car-stereo-wholesale-guide" element={<AndroidCarStereoWholesaleGuide />} />
              <Route path="/oem-odm" element={<OemOdmPage />} />
              <Route path="/oem-odm/capabilities" element={<OemCapabilitiesPage />} />
              <Route path="/oem-odm/certifications" element={<OemCertificationsPage />} />
              <Route path="/oem-odm/cases" element={<OemCasesPage />} />
              <Route path="/landing/oem" element={<LandingOemPage />} />
              <Route path="/landing/market-entry" element={<LandingMarketEntryPage />} />
              <Route path="/landing/distributor" element={<LandingDistributorPage />} />
              <Route path="/accessories" element={<AccessoriesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/thank-you" element={<HomeThankYou />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;