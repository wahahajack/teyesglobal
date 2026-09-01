import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ThemeToggle = lazy(() =>
  import("@/components/ui/theme-toggle").then((module) => ({ default: module.ThemeToggle }))
);

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Products",
    href: "/products/",
    children: [
      { name: "Android Head Units", href: "/products/" },
      { name: "Car Audio", href: "/car-audio/" },
      { name: "Product Lines", href: "/products/lines/" },
      { name: "Compare Head Units", href: "/products/compare/" },
      { name: "Accessories", href: "/accessories/" },
    ],
  },
  {
    name: "Solutions",
    href: "/solutions/",
    children: [
      { name: "For Distributors", href: "/solutions/distributors/" },
      { name: "For Auto Brands", href: "/solutions/auto-brands/" },
      { name: "For System Integrators", href: "/solutions/integrators/" },
      { name: "By Market Needs", href: "/solutions/market-needs/" },
    ],
  },
  {
    name: "OEM / ODM",
    href: "/oem-odm/",
    children: [
      { name: "Capabilities", href: "/oem-odm/capabilities/" },
      { name: "Certifications", href: "/oem-odm/certifications/" },
      { name: "Project Cases", href: "/oem-odm/cases/" },
    ],
  },
  { name: "Contact", href: "/contact/" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateIsDesktop = () => setIsDesktop(mediaQuery.matches);

    updateIsDesktop();
    mediaQuery.addEventListener("change", updateIsDesktop);

    return () => mediaQuery.removeEventListener("change", updateIsDesktop);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    if (href === "/products/" && location.pathname.startsWith("/car-audio")) return true;
    return location.pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <nav className="container-wide" aria-label="Global">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="site-logo-link flex items-center">
            <img
              src="/main-logo.webp"
              alt="TEYES Logo"
              width="300"
              height="56"
              className="site-logo h-8 w-auto md:h-10"
            />
            <span
              aria-hidden="true"
              className="site-logo-light hidden h-8 w-[171px] md:h-10 md:w-[214px]"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative group"
              >
                <Link
                  to={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-1 rounded-lg",
                    isActive(item.href)
                      ? "text-foreground bg-secondary/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                  )}
                  onClick={(e) => {
                    if (item.children && item.href === "#") {
                      e.preventDefault();
                    }
                  }}
                >
                  {item.name}
                  {item.children && (
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </Link>

                {/* Dropdown - Using group-hover for stable visibility */}
                {item.children && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="w-56 rounded-xl bg-card border border-border shadow-xl py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            {isDesktop && (
              <Suspense fallback={null}>
                <ThemeToggle />
              </Suspense>
            )}
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact/">Get in Touch</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              type="button"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "block px-4 py-3 text-base font-medium rounded-lg transition-colors",
                      isActive(item.href)
                        ? "text-foreground bg-secondary/50"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                    )}
                    onClick={() => {
                      if (!item.children) setMobileMenuOpen(false);
                    }}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="pl-6 space-y-1 mt-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 px-4">
              <Button variant="hero" size="lg" className="w-full" asChild>
                <Link to="/contact/" onClick={() => setMobileMenuOpen(false)}>
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}