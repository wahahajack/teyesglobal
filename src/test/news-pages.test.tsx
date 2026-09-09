import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import type { ReactNode } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import NewsPage from "@/pages/news/News";
import NewsArticlePage from "@/pages/news/NewsArticle";
import { newsArticles } from "@/data/news";
import { SEO } from "@/components/SEO";

vi.mock("@/components/layout/Layout", () => ({ Layout: ({ children }: { children: ReactNode }) => <main>{children}</main> }));
afterEach(cleanup);

function renderRoute(path: string) {
  return render(<HelmetProvider><MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Routes>
      <Route path="/news" element={<NewsPage />} />
      <Route path="/news/:category" element={<NewsPage />} />
      <Route path="/news/:category/:slug" element={<NewsArticlePage />} />
    </Routes>
  </MemoryRouter></HelmetProvider>);
}

describe("news reading and metadata", () => {
  it.each(newsArticles)("uses the correct image, dates and CTA for $slug", async (article) => {
    const { container } = renderRoute(`/news/${article.category}/${article.slug}/`);
    const body = container.querySelector("article")!;
    const hero = body.querySelector('img[loading="eager"]')!;
    expect(hero).toHaveAttribute("width", String(article.imageWidth));
    expect(hero).toHaveAttribute("height", String(article.imageHeight));
    expect(hero).toHaveAttribute("alt", article.imageAlt);
    expect(body.querySelectorAll(`img[src="${article.image}"]`)).toHaveLength(1);
    expect(within(body).getByRole("link", { name: article.cta.label })).toHaveAttribute("href", article.cta.href);
    expect(body.querySelector(`time[datetime="${article.date}"]`)).not.toBeNull();
    expect(body.querySelector(`time[datetime="${article.updatedAt}"]`)).not.toBeNull();
    await waitFor(() => expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute("content", `https://teyesglobal.com${article.image}`));
    const schema = [...document.querySelectorAll('script[type="application/ld+json"]')].map(el => JSON.parse(el.textContent!)).find(value => value["@type"] === "NewsArticle");
    expect(schema.image).toBe(`https://teyesglobal.com${article.image}`);
    expect(schema.dateModified).toBe(article.updatedAt);
  });

  it("keeps an empty category readable but out of the index", async () => {
    renderRoute("/news/industry/");
    expect(screen.getByRole("link", { name: "Browse all news" })).toHaveAttribute("href", "/news/");
    await waitFor(() => expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow"));
  });

  it("only advertises categories with articles", async () => {
    renderRoute("/news/");
    expect(screen.queryByRole("link", { name: "Industry Insights" })).not.toBeInTheDocument();
    await waitFor(() => expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "index, follow"));
  });

  it("shows the car audio range inside the exhibition article", () => {
    renderRoute("/news/exhibitions/automechanika-frankfurt-2026/");
    expect(screen.getByRole("img", {
      name: "TEYES car audio demonstration display with speakers, amplifiers, head units and a subwoofer",
    })).toHaveAttribute("src", "/assets/news/automechanika-2026-audio-demo-large.webp");
  });

  it("gives article media more desktop width than the reading column", () => {
    renderRoute("/news/exhibitions/automechanika-frankfurt-2026/");
    expect(screen.getByTestId("news-article-canvas")).toHaveClass("max-w-5xl");
    expect(screen.getByTestId("news-article-prose")).toHaveClass("max-w-4xl");
  });

  it("preserves nofollow for existing noindex consumers", async () => {
    render(<HelmetProvider><SEO title="Utility" description="Utility page" path="/utility/" noindex /></HelmetProvider>);
    await waitFor(() => expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow"));
  });
});
