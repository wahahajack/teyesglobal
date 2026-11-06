import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Download, ExternalLink, FileText } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { downloadResources } from "@/data/downloads";

export default function Downloads() {
  const { resourceId } = useParams();
  const resource = downloadResources.find((item) => item.id === resourceId);
  const title = resourceId
    ? resource?.title ?? "Resource not found"
    : "Product Resources";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title={title}
        description="View and download TEYES product catalogs and documents."
        path={resourceId ? `/downloads/${resourceId}/` : "/downloads/"}
        noindex
      />
      <header className="border-b border-border">
        <div className="container-wide flex items-center justify-between gap-4 py-6">
          <span className="font-display text-2xl font-bold tracking-wider">TEYES</span>
          <span className="text-sm text-muted-foreground">Product Resources</span>
        </div>
      </header>
      <main className="container-wide py-10 md:py-16">
        {resourceId && (
          <Link to="/downloads/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> All resources
          </Link>
        )}
        <h1 className="font-display text-3xl font-bold md:text-4xl">{title}</h1>
        {!resourceId ? (
          <>
            <p className="mt-4 text-muted-foreground">Choose a document to read online or download a copy.</p>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {downloadResources.map((item) => (
                <article key={item.id} className="flex flex-col rounded-xl border border-border bg-card p-6">
                  <FileText className="mb-5 h-10 w-10 text-primary" aria-hidden="true" />
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="mt-3 flex-1 text-muted-foreground">{item.description}</p>
                  <p className="my-5 text-sm text-muted-foreground">{item.format} · {item.size} · Version {item.version}</p>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild><Link to={`/downloads/${item.id}/`}>View document</Link></Button>
                    <Button asChild variant="outline"><a href={item.file} download><Download className="mr-2 h-4 w-4" />Download</a></Button>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : resource ? (
          <>
            <p className="mt-4 text-muted-foreground">{resource.description}</p>
            <p className="mt-3 text-sm text-muted-foreground">{resource.format} · {resource.size} · Version {resource.version}</p>
            <div className="my-6 flex flex-wrap gap-3">
              <Button asChild><a href={resource.file} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-2 h-4 w-4" />Open {resource.format}</a></Button>
              <Button asChild variant="outline"><a href={resource.file} download><Download className="mr-2 h-4 w-4" />Download {resource.format}</a></Button>
            </div>
            {resource.format === "PDF" && (
              <>
                <p className="mb-4 text-sm text-muted-foreground">If the preview does not appear, use Open PDF or Download PDF above. On mobile, Open PDF offers a full-screen reading experience.</p>
                <object data={resource.file} type="application/pdf" aria-label={`${resource.title} preview`} className="h-[75vh] min-h-[420px] w-full rounded-xl border border-border bg-card">
                  <p className="p-6">Your browser cannot display this preview. <a className="underline" href={resource.file} target="_blank" rel="noopener noreferrer">Open the PDF</a> or use the download button above.</p>
                </object>
              </>
            )}
          </>
        ) : (
          <p className="mt-4 text-muted-foreground">This document is unavailable. Please choose a document from All resources or contact the person who shared this link.</p>
        )}
      </main>
    </div>
  );
}
