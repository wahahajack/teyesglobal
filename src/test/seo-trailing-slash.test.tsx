import { render, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { describe, expect, it } from "vitest";
import { SEO } from "@/components/SEO";

describe("SEO URL canonicalization", () => {
  it("uses a trailing slash for non-root canonical metadata", async () => {
    render(
      <HelmetProvider>
        <SEO
          title="Products | TEYES"
          description="Product line"
          path="/products"
        />
      </HelmetProvider>,
    );

    await waitFor(() => {
      expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
        "href",
        "https://teyesglobal.com/products/",
      );
      expect(document.head.querySelector('meta[property="og:url"]')).toHaveAttribute(
        "content",
        "https://teyesglobal.com/products/",
      );
    });
  });
});
