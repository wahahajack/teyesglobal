import { getStoredAdParams } from "@/lib/tracking";

export const LEAD_SOURCES = [
  "contact_page",
  "wholesale_quote",
  "manufacturing_quote",
  "distributor_application",
  "catalog_request",
] as const;

export type LeadSource = (typeof LEAD_SOURCES)[number];

export interface LeadAttribution {
  gclid: string;
  gbraid: string;
  wbraid: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  fbclid: string;
  landing_page: string;
  referrer: string;
}

export interface LeadCapturePayload {
  source: LeadSource;
  fullName: string;
  email: string;
  company: string;
  country: string;
  inquiryType: string;
  message: string;
  estimatedQuantity: string;
  businessModel: string;
  submittedAt: string;
  website: string;
  attribution: LeadAttribution;
}

const text = (value: string | null | undefined) => value ?? "";

export function buildAttribution(): LeadAttribution {
  const stored = getStoredAdParams();
  return {
    gclid: text(stored.gclid),
    gbraid: text(stored.gbraid),
    wbraid: text(stored.wbraid),
    utm_source: text(stored.utm_source),
    utm_medium: text(stored.utm_medium),
    utm_campaign: text(stored.utm_campaign),
    utm_content: text(stored.utm_content),
    utm_term: text(stored.utm_term),
    fbclid: text(stored.fbclid),
    landing_page: text(stored.landing_page),
    referrer: text(stored.referrer),
  };
}

export async function submitZohoLead(
  payload: LeadCapturePayload,
): Promise<void> {
  const response = await fetch("/api/zoho-lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  });

  if (!response.ok) {
    throw new Error(`Zoho lead request failed with ${response.status}`);
  }
}
