import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { editorialByline } from "@/data/news";

const AboutEditorialPage = () => {
  return (
    <Layout>
      <SEO
        title="Editorial & Technical Review"
        description="How TEYES Industry Insights articles are written, technically reviewed, and corrected — who writes them, who checks the engineering claims, and what standard they follow."
        path="/about/editorial/"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about/" },
          { label: "Editorial & Technical Review" },
        ]}
      />
      <ContextHeader
        title="Editorial & Technical Review"
        description="Who writes TEYES articles, who checks the engineering claims, and what standard they follow."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about/" },
          { label: "Editorial & Technical Review" },
        ]}
      />

      <article className="py-12 bg-background">
        <div className="container-wide max-w-3xl">
          <h2 className="text-xl md:text-2xl font-display font-bold mt-2 mb-4">
            Who writes
          </h2>
          <p className="my-4 text-muted-foreground leading-relaxed">
            Articles in the{" "}
            <Link
              to="/news/industry/"
              className="text-primary underline hover:text-primary/80"
            >
              Industry Insights
            </Link>{" "}
            series and the TEYES newsroom are written by {editorialByline.writerName},
            the in-house content team at TEYES. Sources are cited in the text so
            readers can verify market data and industry events independently.
          </p>

          <h2 className="text-xl md:text-2xl font-display font-bold mt-10 mb-4">
            Technical review
          </h2>
          <p className="my-4 text-muted-foreground leading-relaxed">
            Before an article is published, its technical claims —
            specifications, compatibility, certification requirements, and
            process descriptions — are checked item by item against current
            TEYES product documentation by a TEYES engineer. When an article
            has passed this review, the reviewer's name appears in the article
            byline as "Technically reviewed by".
          </p>

          <h2 className="text-xl md:text-2xl font-display font-bold mt-10 mb-4">
            Our standard
          </h2>
          <ul className="my-4 space-y-2">
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
              <span>
                Every market figure or industry event carries a named source and
                a date. Vendor claims, dealer observations, and our own
                analysis are labeled as such — never blended.
              </span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
              <span>
                Specifications come from approved product documentation. We do
                not derive performance conclusions — sound quality, distortion,
                thermal behavior — from materials or appearance alone.
              </span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
              <span>
                We do not publish claims we cannot verify, and we do not
                substitute vaguer marketing language for a withdrawn number.
              </span>
            </li>
          </ul>

          <h2 className="text-xl md:text-2xl font-display font-bold mt-10 mb-4">
            Corrections
          </h2>
          <p className="my-4 text-muted-foreground leading-relaxed">
            If you spot an error in any TEYES article, tell us through the{" "}
            <Link
              to="/contact/"
              className="text-primary underline hover:text-primary/80"
            >
              contact page
            </Link>
            . Confirmed errors are corrected in the article, with the
            modification date updated.
          </p>
        </div>
      </article>
    </Layout>
  );
};

export default AboutEditorialPage;
