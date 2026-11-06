import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { afterEach, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import Downloads from "@/pages/Downloads";
import { downloadResources } from "@/data/downloads";

afterEach(cleanup);

function open(path: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/downloads/:resourceId" element={<Downloads />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>,
  );
}

it("lists multiple documents with their own stable viewing links", () => {
  downloadResources.push({ ...downloadResources[0], id: "second-document", title: "Second document" });
  try {
    open("/downloads/");
    expect(screen.getAllByRole("link", { name: "View document" }).map((link) => link.getAttribute("href")))
      .toEqual(downloadResources.map((item) => `/downloads/${item.id}/`));
  } finally {
    downloadResources.pop();
  }
});

it("provides PDF preview, a separate open link, and download fallback", () => {
  const { container } = open("/downloads/product-catalog/");
  expect(container.querySelector('object[type="application/pdf"]')).toHaveAttribute("data", downloadResources[0].file);
  expect(screen.getByRole("link", { name: "Open PDF" })).toHaveAttribute("target", "_blank");
  expect(screen.getByRole("link", { name: "Download PDF" })).toHaveAttribute("download");
});

it("handles an unknown resource with a route back to the list", () => {
  open("/downloads/missing/");
  expect(screen.getByRole("heading", { name: "Resource not found" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "All resources" })).toHaveAttribute("href", "/downloads/");
});

it("ships real files and keeps resources unlisted with noindex headers", () => {
  const root = resolve(__dirname, "../..");
  for (const item of downloadResources) {
    expect(existsSync(resolve(root, `public${item.file}`))).toBe(true);
  }
  const headers = readFileSync(resolve(root, "public/_headers"), "utf8");
  expect(headers).toMatch(/\/downloads\/\*\r?\n {2}X-Robots-Tag: noindex, nofollow/);
  for (const file of ["src/components/layout/Header.tsx", "src/components/layout/Footer.tsx", "public/sitemap.xml"]) {
    expect(readFileSync(resolve(root, file), "utf8")).not.toContain("/downloads");
  }
});
