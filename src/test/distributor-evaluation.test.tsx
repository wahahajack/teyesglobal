import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Distributors from "@/pages/solutions/SolutionsDistributors";
import Products from "@/pages/products/Products";

vi.mock("@/components/layout/Layout", () => ({ Layout: ({ children }: { children: ReactNode }) => <main>{children}</main> }));
afterEach(cleanup);
const show = (page: ReactNode) => render(<HelmetProvider><MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>{page}</MemoryRouter></HelmetProvider>);

describe("distributor evaluation SEO patch", () => {
  it("retains the canonical and distribution enquiry route", async () => {
    show(<Distributors />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("TEYES Android Head Units for Dealers and Installers");
    expect(screen.getByRole("link", { name: /Business Partnership Enquiry/ })).toHaveAttribute("href", "/contact/?inquiry=distribution");
    await waitFor(() => expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute("href", "https://teyesglobal.com/solutions/distributors/"));
    expect(document.title).toBe("TEYES Head Units for Dealers & Installers | Wholesale Enquiries");
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute("content", "Explore TEYES head units for your car audio business. Compare model roles, plan an evaluation and discuss wholesale terms for your market.");
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "index, follow");
  });
  it("preserves support and cooperation modules beside the new buyer guidance", () => {
    show(<Distributors />);
    for (const name of ["Product Portfolio", "Pricing and Orders", "Marketing Support", "Product Support", "Standard distribution", "Expanded cooperation", "Customized project"])
      expect(screen.getByRole("heading", { name })).toBeInTheDocument();
    expect(screen.getByText(/Compatibility is a configuration-specific question/)).toBeInTheDocument();
    expect(screen.getByText(/an enquiry does not establish exclusive territory rights/)).toBeInTheDocument();
    for (const [name, href] of [["CC4 Pro", "/products/cc4-pro/"], ["TEYES product range", "/products/"], ["accessories", "/accessories/"], ["car audio range", "/car-audio/"]])
      expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
  });
  it("adds an incoming buyer-intent link without replacing the product range", () => {
    show(<Products />);
    expect(screen.getByRole("link", { name: "Plan a dealer range and installation evaluation" })).toHaveAttribute("href", "/solutions/distributors/");
    expect(screen.getByRole("heading", { name: "Featured Products" })).toBeInTheDocument();
  });
});
