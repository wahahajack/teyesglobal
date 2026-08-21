import { render, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { describe, expect, it } from "vitest";
import { SEO } from "@/components/SEO";

describe("SEO robots meta", () => {
  it("emits exactly one index,follow robots meta by default", async () => {
    render(
      <HelmetProvider>
        <SEO title="Products | TEYES" description="Product line" path="/products/" />
      </HelmetProvider>,
    );

    await waitFor(() => {
      const tags = document.head.querySelectorAll('meta[name="robots"]');
      expect(tags).toHaveLength(1);
      expect(tags[0]).toHaveAttribute("content", "index, follow");
    });
  });

  it("emits exactly one noindex,nofollow robots meta when noindex is set", async () => {
    render(
      <HelmetProvider>
        <SEO title="404" description="Not found" path="/missing" noindex />
      </HelmetProvider>,
    );

    await waitFor(() => {
      const tags = document.head.querySelectorAll('meta[name="robots"]');
      expect(tags).toHaveLength(1);
      expect(tags[0]).toHaveAttribute("content", "noindex, nofollow");
    });
  });
});
