import {
  beginSubmissionTracking,
  getStoredAdParams,
} from "@/lib/tracking";

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
  submissionId?: string;
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
  formEntryPage?: string;
  pageJourney?: string;
  whatsappClickJourney?: string;
  whatsappClickPath?: string;
  whatsappClickCount?: number;
  attribution: LeadAttribution;
}

export interface LeadSubmissionResult {
  status: "created" | "duplicate";
  submissionId: string;
}

const text = (value: string | null | undefined) => value ?? "";
const LEAD_REQUEST_TIMEOUT_MS = 12_000;

export function createSubmissionId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(15));
  return Array.from(bytes, (value) => value.toString(16).padStart(2, "0")).join("");
}

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
): Promise<LeadSubmissionResult> {
  const tracking = beginSubmissionTracking();
  const correlationId = payload.submissionId || createSubmissionId();
  const leadPayload = {
    ...payload,
    submissionId: correlationId,
    ...tracking.payload,
  };
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), LEAD_REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch("/api/zoho-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadPayload),
      keepalive: true,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Zoho lead request failed with ${response.status}`);
    }
    let result: unknown;
    try {
      result = await response.json();
    } catch {
      throw new Error("Zoho lead request failed: invalid_response");
    }
    if (!result || typeof result !== "object") {
      throw new Error("Zoho lead request failed: invalid_response");
    }
    const status = (result as { status?: unknown }).status;
    if (status !== "created" && status !== "duplicate") {
      throw new Error(`Zoho lead request failed: ${typeof status === "string" ? status : "invalid_response"}`);
    }
    if ((result as { submission_id?: unknown }).submission_id !== correlationId) {
      throw new Error("Zoho lead request failed: correlation_mismatch");
    }
    return { status, submissionId: correlationId };
  } catch (error) {
    tracking.rollbackIfUnchanged();
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Zoho lead request timed out");
    }
    throw error;
  } finally {
    window.clearTimeout(timer);
  }
}
