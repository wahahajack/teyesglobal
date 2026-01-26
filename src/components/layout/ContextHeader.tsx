import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ContextHeaderProps {
  title: string;
  description: string;
  breadcrumbs?: BreadcrumbItem[];
  backLink?: {
    label: string;
    href: string;
  };
}

export const ContextHeader = ({
  title,
  description,
  breadcrumbs,
  backLink,
}: ContextHeaderProps) => {
  return (
    <section className="py-8 md:py-10 bg-card border-b border-border/50">
      <div className="container-wide">
        {/* Back link or Breadcrumbs */}
        {backLink && (
          <Link
            to={backLink.href}
            className="text-primary text-sm font-medium mb-3 inline-flex items-center gap-1 hover:underline"
          >
            ← {backLink.label}
          </Link>
        )}
        
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb className="mb-3">
            <BreadcrumbList>
              {breadcrumbs.map((item, index) => (
                <BreadcrumbItem key={index}>
                  {index < breadcrumbs.length - 1 ? (
                    <>
                      <BreadcrumbLink asChild>
                        <Link to={item.href || "#"}>{item.label}</Link>
                      </BreadcrumbLink>
                      <BreadcrumbSeparator />
                    </>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}

        {/* Title and Description */}
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
          {title}
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          {description}
        </p>
      </div>
    </section>
  );
};
