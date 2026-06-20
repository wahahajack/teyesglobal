import { ReactNode, Suspense, lazy, useEffect, useState } from "react";
import { Header } from "./Header";

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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      {loadDeferredChrome && (
        <Suspense fallback={null}>
          <Footer />
          <WhatsAppFloat />
        </Suspense>
      )}
    </div>
  );
}