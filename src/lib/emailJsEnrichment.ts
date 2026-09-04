import emailjs from "@emailjs/browser";
import { getEmailAttributionSnapshot } from "@/lib/emailAttribution";

const INQUIRY_LABELS: Record<string, string> = {
  distribution: "Distribution Partnership",
  oem: "OEM / ODM Inquiry",
  product: "Product Information",
  support: "Technical Support",
  other: "Other",
  General: "General",
};

let installed = false;

function text(value: unknown) {
  return typeof value === "string" ? value : "";
}

export function installEmailJsEnrichment() {
  if (installed) return;
  installed = true;

  const originalSend = emailjs.send.bind(emailjs);

  emailjs.send = ((serviceId, templateId, templateParams, options) => {
    if (window.location.pathname !== "/contact/" && window.location.pathname !== "/contact") {
      return originalSend(serviceId, templateId, templateParams, options);
    }

    const params = templateParams && typeof templateParams === "object"
      ? templateParams as Record<string, unknown>
      : {};
    const inquiryType = text(params.inquiry_type) || "General";
    const attribution = getEmailAttributionSnapshot({
      formName: "contact_page",
      inquiryType,
      inquiryTypeLabel: INQUIRY_LABELS[inquiryType] || inquiryType,
      submittedAt: text(params.user_time) || text(params.submitted_at),
      submissionId: text(params.submission_id),
    });

    return originalSend(
      serviceId,
      templateId,
      {
        ...params,
        ...attribution,
      },
      options,
    );
  }) as typeof emailjs.send;
}
