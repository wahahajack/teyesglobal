import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: "website" | "product" | "article";
  productData?: {
    name: string;
    brand: string;
    category: string;
  };
}

// Use current origin if available, fallback for metadata
const BASE_URL = typeof window !== 'undefined' ? window.location.origin : "https://teyesauto.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.webp`;

export function SEOHead({
  title,
  description,
  keywords,
  canonicalPath = "",
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  productData,
}: SEOHeadProps) {
  const fullTitle = title.includes("TEYES") ? title : `${title} | TEYES`;
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper to update or create meta tag
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Helper to update or create link tag
    const setLink = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", rel);
        document.head.appendChild(link);
      }
      link.setAttribute("href", href);
    };

    // Basic meta tags
    setMeta("description", description);
    if (keywords) {
      setMeta("keywords", keywords);
    }

    // Canonical URL
    setLink("canonical", canonicalUrl);

    // Open Graph tags
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:type", ogType, true);
    setMeta("og:site_name", "TEYES", true);

    // Twitter tags
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);
    setMeta("twitter:card", "summary_large_image");

    // Preload ogImage to improve LCP
    if (ogImage) {
      let preload = document.querySelector(`link[rel="preload"][href="${ogImage}"]`);
      if (!preload) {
        preload = document.createElement("link");
        preload.setAttribute("rel", "preload");
        preload.setAttribute("href", ogImage);
        preload.setAttribute("as", "image");
        document.head.appendChild(preload);
      }
    }

    // Preconnect common font origins
    const addPreconnect = (href: string, cross = false) => {
      let p = document.querySelector(`link[rel=\"preconnect\"][href=\"${href}\"]`);
      if (!p) {
        p = document.createElement("link");
        p.setAttribute("rel", "preconnect");
        p.setAttribute("href", href);
        if (cross) p.setAttribute("crossorigin", "anonymous");
        document.head.appendChild(p);
      }
    };

    addPreconnect("https://fonts.gstatic.com", true);
    addPreconnect("https://fonts.googleapis.com");

    // Product structured data (JSON-LD)
    if (productData) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: productData.name,
        brand: {
          "@type": "Brand",
          name: productData.brand,
        },
        category: productData.category,
        description: description,
        url: canonicalUrl,
        image: ogImage,
      });
    }

    // Cleanup function to remove dynamically added product schema
    return () => {
      if (productData) {
        const script = document.querySelector('script[type="application/ld+json"]');
        if (script) {
          script.remove();
        }
      }
    };
  }, [fullTitle, description, keywords, canonicalUrl, ogImage, ogType, productData]);

  return null;
}
