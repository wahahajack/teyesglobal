import { ReactNode, Suspense, lazy, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { MobileStickyCta } from "../common/MobileStickyCta";

const Footer = lazy(() =>
  import("./Footer").then((module) => ({ default: module.Footer }))
);
const WhatsAppFloat = lazy(() =>
  import("../common/WhatsAppFloat").then((module) => ({ default: module.WhatsAppFloat }))
);

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [loadDeferredChrome, setLoadDeferredChrome] = useState(false);
  const location = useLocation();
  const isContact = location.pathname.startsWith("/contact/") || location.pathname === "/contact";

  useEffect(() => {
    const load = () => setLoadDeferredChrome(true);
    const timer = window.setTimeout(load, 1800);
    window.addEventListener("scroll", load, { once: true, passive: true });
    window.addEventListener("pointerdown", load, { once: true, passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", load);
      window.removeEventListener("pointerdown", load);
    };
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${isContact ? "" : "pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0"}`}>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <MobileStickyCta />
      {loadDeferredChrome && (
        <Suspense fallback={null}>
          <Footer />
          <WhatsAppFloat />
        </Suspense>
      )}
    </div>
  );
}