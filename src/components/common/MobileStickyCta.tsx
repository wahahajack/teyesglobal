import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const HERO_PRODUCT_CTA_ID = "hero-product-cta";

export function MobileStickyCta() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isContact = location.pathname.startsWith("/contact/") || location.pathname === "/contact";
  const [isVisible, setIsVisible] = useState(!isHome && !isContact);

  useEffect(() => {
    if (isContact) {
      setIsVisible(false);
      return;
    }

    if (!isHome) {
      setIsVisible(true);
      return;
    }

    const heroCta = document.getElementById(HERO_PRODUCT_CTA_ID);
    if (!heroCta) {
      setIsVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.boundingClientRect.bottom <= 0),
      { threshold: 0 },
    );

    observer.observe(heroCta);
    return () => observer.disconnect();
  }, [isContact, isHome, location.pathname]);

  if (isContact) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 border-t border-border/60 bg-background/95 px-3 pt-2 shadow-2xl backdrop-blur-lg transition-transform duration-300 md:hidden ${
        isVisible ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
      style={{
        zIndex: 60,
        paddingBottom: "calc(env(safe-area-inset-bottom) + 0.5rem)",
      }}
      aria-hidden={!isVisible}
    >
      <div className="mx-auto flex max-w-lg gap-2">
        <Link
          to="/products/"
          tabIndex={isVisible ? 0 : -1}
          className="flex h-12 flex-1 items-center justify-center rounded-lg border border-border bg-secondary/40 px-4 text-sm font-semibold text-foreground transition-colors active:bg-secondary/70"
        >
          View Products
        </Link>
        <Link
          to="/contact/"
          tabIndex={isVisible ? 0 : -1}
          className="flex h-12 flex-1 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-opacity active:opacity-90"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
