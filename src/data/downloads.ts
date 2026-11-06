export interface DownloadResource {
  id: string;
  title: string;
  description: string;
  format: string;
  size: string;
  version: string;
  file: string;
}

// Keep IDs stable when replacing files: customers share the resource page URL.
export const downloadResources: DownloadResource[] = [
  {
    id: "product-catalog",
    title: "TEYES 2026 Product Catalog",
    description: "Browse the TEYES product catalog online or save a PDF copy.",
    format: "PDF",
    size: "4.3 MB",
    version: "2026",
    file: "/teyes-android-car-stereo-distributor/TEYES_2026_Wholesale_Catalog.pdf",
  },
  {
    id: "car-audio-catalog",
    title: "TEYES Car Audio Catalog 2026",
    description: "View the TEYES car audio catalog online or download a PDF copy.",
    format: "PDF",
    size: "6.7 MB",
    version: "2026",
    file: "/resource-files/teyes-car-audio-catalog-2026.pdf",
  },
  {
    id: "fascia-panel-list",
    title: "2026 TEYES Vehicle-Specific Fascia Panel List",
    description: "View the vehicle-specific fascia panel list online or download a PDF copy.",
    format: "PDF",
    size: "482 KB",
    version: "2026",
    file: "/resource-files/teyes-vehicle-specific-fascia-panel-list-2026.pdf",
  },
  {
    id: "cc4-head-unit-catalog",
    title: "2026 TEYES CC4 Head Unit Catalog",
    description: "View the TEYES CC4 head unit catalog online or download a PDF copy.",
    format: "PDF",
    size: "4.7 MB",
    version: "2026",
    file: "/resource-files/teyes-cc4-head-unit-catalog-2026.pdf",
  },
];
