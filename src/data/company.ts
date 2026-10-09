/** Shared brand identity; legal and scale claims require separate verification. */
export const organization = {
  "@type": "Organization",
  "@id": "https://teyesglobal.com/#organization",
  name: "TEYES",
  alternateName: "TEYES Global",
  url: "https://teyesglobal.com/",
  logo: "https://teyesglobal.com/logo.webp",
  description: "TEYES develops Android car stereos, car audio products and accessories.",
};

export const organizationSchema = JSON.stringify({
  "@context": "https://schema.org",
  ...organization,
});
