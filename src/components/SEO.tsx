import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface FAQItem {
    question: string;
    answer: string;
}

interface HowToStep {
    name: string;
    text: string;
}

interface ProductData {
    name: string;
    brand: string;
    category: string;
    image?: string;
}

interface SEOProps {
    title: string;
    description: string;
    path: string;
    image?: string;
    keywords?: string;
    ogType?: 'website' | 'product' | 'article';
    schema?: string; // Raw JSON-LD string
    noindex?: boolean;
    productData?: ProductData;
    breadcrumbs?: BreadcrumbItem[];
    faq?: FAQItem[];
    howTo?: { name: string; steps: HowToStep[] };
}

const toCanonicalPath = (routePath: string) => {
    const suffixStart = routePath.search(/[?#]/);
    const pathname = suffixStart === -1 ? routePath : routePath.slice(0, suffixStart);
    const suffix = suffixStart === -1 ? '' : routePath.slice(suffixStart);

    if (pathname === '/' || pathname.endsWith('/')) {
        return routePath;
    }

    return `${pathname}/${suffix}`;
};

export const SEO = ({
    title,
    description,
    path,
    image,
    keywords,
    ogType = 'website',
    schema,
    noindex = false,
    productData,
    breadcrumbs,
    faq,
    howTo,
}: SEOProps) => {
    const baseUrl = 'https://teyesglobal.com';
    const fullUrl = `${baseUrl}${toCanonicalPath(path)}`;
    const fullTitle = title.includes('TEYES') ? title : `${title} | TEYES`;
    const imageUrl = image
        ? image.startsWith('http')
            ? image
            : `${baseUrl}${image}`
        : `${baseUrl}/og-image.webp`;

    // Build Product JSON-LD
    const productSchema = productData
        ? JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: productData.name,
            brand: { '@type': 'Brand', name: productData.brand },
            category: productData.category,
            description,
            url: fullUrl,
            image: productData.image || imageUrl,
        })
        : null;

    // Build BreadcrumbList JSON-LD
    const breadcrumbSchema = breadcrumbs?.length
        ? JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.label,
                ...(item.href ? { item: `${baseUrl}${toCanonicalPath(item.href)}` } : {}),
            })),
        })
        : null;

    // Build FAQPage JSON-LD
    const faqSchema = faq?.length
        ? JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.answer,
                },
            })),
        })
        : null;

    // Build HowTo JSON-LD
    const howToSchema = howTo
        ? JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: howTo.name,
            step: howTo.steps.map((step, index) => ({
                '@type': 'HowToStep',
                position: index + 1,
                name: step.name,
                text: step.text,
            })),
        })
        : null;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullUrl} />
            {noindex && <meta name="robots" content="noindex, nofollow" />}
            {keywords && <meta name="keywords" content={keywords} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:site_name" content="TEYES" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@teyesglobal" />
            <meta name="twitter:url" content={fullUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />

            {/* Raw JSON-LD (e.g., Corporation schema from Index) */}
            {schema && (
                <script type="application/ld+json">{schema}</script>
            )}

            {/* Product JSON-LD */}
            {productSchema && (
                <script type="application/ld+json">{productSchema}</script>
            )}

            {/* BreadcrumbList JSON-LD */}
            {breadcrumbSchema && (
                <script type="application/ld+json">{breadcrumbSchema}</script>
            )}

            {/* FAQ JSON-LD */}
            {faqSchema && (
                <script type="application/ld+json">{faqSchema}</script>
            )}

            {/* HowTo JSON-LD */}
            {howToSchema && (
                <script type="application/ld+json">{howToSchema}</script>
            )}
        </Helmet>
    );
};
