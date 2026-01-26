import cc4ProImg from "@/assets/products/cc4-pro.jpg";
import cc3Img from "@/assets/products/cc3-2k.jpg";
import x1ProImg from "@/assets/products/x1-pro.jpg";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  series: "flagship" | "advanced" | "entry";
  seriesName: string;
  tagline: string;
  description: string;
  image: string;
  badge?: string;
  features: string[];
  specs: ProductSpec[];
  highlights: string[];
}

export const products: Product[] = [
  {
    id: "cc4-pro",
    name: "CC4 Pro",
    series: "flagship",
    seriesName: "Flagship Series",
    tagline: "Leading Flagship",
    description:
      "The most advanced car infotainment system with 6nm CPU, 12TOPS NPU for AI-powered driving assistance, premium DTS audio, and comprehensive camera support.",
    image: cc4ProImg,
    badge: "NEW",
    features: [
      "8-Core 6nm CPU",
      "12TOPS AI NPU",
      "7.1 Channel Audio",
      "360° Camera",
      "WIFI 6/6E",
      "Bluetooth 5.2",
    ],
    specs: [
      { label: "CPU", value: "QCM6490 8-Core 2.7G 6nm" },
      { label: "GPU", value: "Adreno 643 ~900 GFLOPS" },
      { label: "NPU", value: "12 TOPS" },
      { label: "RAM + ROM", value: "8+128GB / 12+256GB" },
      { label: "Memory Type", value: "LPDDR5 + UFS3.1" },
      { label: "Screen Resolution", value: "2000×1200" },
      { label: "Touch Haptic", value: "Yes" },
      { label: "Amplifier", value: "TAS6424 Digital" },
      { label: "Audio Channel", value: "7.1 Channel" },
      { label: "Subwoofer Output", value: "4V" },
      { label: "Sound Effect", value: "DTS®" },
      { label: "Digital Output", value: "Optical + Coaxial (24bit/192kHz)" },
      { label: "Camera Signal", value: "LVDS/AHD/CVBS Digital & Analog" },
      { label: "Camera Channels", value: "Up to 6 (4 digital + 2 analog)" },
      { label: "360° SVM", value: "Built-in" },
      { label: "Sentry Mode", value: "Yes" },
      { label: "Navigation", value: "Dual Band L1+L5, 50-80 Satellites" },
      { label: "Accuracy", value: "1-2 meters" },
      { label: "OS", value: "TEYES OS (Android 13)" },
      { label: "WIFI", value: "WIFI 6/6E" },
      { label: "Bluetooth", value: "5.2" },
      { label: "Video Output", value: "DP 4K@60fps" },
      { label: "Video Playback", value: "4K@60fps" },
      { label: "Apple CarPlay", value: "Yes" },
      { label: "Android Auto", value: "Yes" },
    ],
    highlights: [
      "AI-Powered Driving Safety Assistant with 12TOPS NPU",
      "Premium DTS Sound with 7.1 Channel support",
      "Built-in 360° Surround View System",
      "Dual Band GPS with 1-2m accuracy",
    ],
  },
  {
    id: "cc3-2k",
    name: "CC3 2K",
    series: "advanced",
    seriesName: "Advanced Series",
    tagline: "Best Seller Over All Time",
    description:
      "The most popular choice combining excellent performance with proven reliability. Perfect balance of features and value for demanding customers.",
    image: cc3Img,
    badge: "BESTSELLER",
    features: [
      "8-Core 12nm CPU",
      "2K Display",
      "5.1 Channel Audio",
      "4 Cameras",
      "WIFI 5",
      "Bluetooth 5.1",
    ],
    specs: [
      { label: "CPU", value: "UIS 7862 8-Core 12nm" },
      { label: "GPU", value: "G52 ~88.5 GFLOPS" },
      { label: "NPU", value: "No" },
      { label: "RAM + ROM", value: "4+32GB / 4+64GB / 6+128GB" },
      { label: "Memory Type", value: "LPDDR4X + eMMC5.1" },
      { label: "Screen Resolution", value: "2000×1200" },
      { label: "Touch Haptic", value: "No" },
      { label: "Amplifier", value: "ST-TDA7851L Analog" },
      { label: "Audio Channel", value: "5.1 Channel" },
      { label: "Subwoofer Output", value: "2V" },
      { label: "Sound Effect", value: "Proprietary Algorithm" },
      { label: "Digital Output", value: "Optical + Coaxial" },
      { label: "Camera Signal", value: "AHD/CVBS Analog" },
      { label: "Camera Channels", value: "Up to 4 (analog)" },
      { label: "360° SVM", value: "Optional" },
      { label: "Sentry Mode", value: "No" },
      { label: "Navigation", value: "Single Band L1, 15-30 Satellites" },
      { label: "Accuracy", value: "5-10 meters" },
      { label: "OS", value: "Android 10" },
      { label: "WIFI", value: "WIFI 5" },
      { label: "Bluetooth", value: "5.1" },
      { label: "Video Output", value: "No" },
      { label: "Video Playback", value: "1080@60fps" },
      { label: "Apple CarPlay", value: "Yes" },
      { label: "Android Auto", value: "Yes" },
    ],
    highlights: [
      "Proven reliability with millions of units sold",
      "Excellent 2K display quality",
      "5.1 Channel audio system",
      "Full CarPlay & Android Auto support",
    ],
  },
  {
    id: "x1-pro",
    name: "X1 Pro",
    series: "entry",
    seriesName: "Entry Series",
    tagline: "Value Champion",
    description:
      "Affordable entry-level solution without compromising essential features. Perfect for price-sensitive markets and first-time upgrades.",
    image: x1ProImg,
    features: [
      "Quad-Core CPU",
      "HD Display",
      "Apple CarPlay",
      "Android Auto",
      "WIFI 4",
      "Bluetooth 5.0",
    ],
    specs: [
      { label: "CPU", value: "Quad-Core" },
      { label: "RAM + ROM", value: "2+32GB / 4+64GB" },
      { label: "Screen Resolution", value: "1280×720" },
      { label: "Amplifier", value: "Analog" },
      { label: "Audio Channel", value: "Stereo" },
      { label: "Camera Channels", value: "Up to 2" },
      { label: "Navigation", value: "GPS + GLONASS" },
      { label: "OS", value: "Android 10" },
      { label: "WIFI", value: "WIFI 4" },
      { label: "Bluetooth", value: "5.0" },
      { label: "Apple CarPlay", value: "Yes" },
      { label: "Android Auto", value: "Yes" },
    ],
    highlights: [
      "Best value for entry-level markets",
      "Essential features at competitive price",
      "Full CarPlay & Android Auto support",
      "Easy installation and setup",
    ],
  },
  {
    id: "cc4",
    name: "CC4",
    series: "advanced",
    seriesName: "Advanced Series",
    tagline: "Performance Standard",
    description:
      "High-performance solution with advanced features and excellent value proposition.",
    image: cc3Img,
    features: [
      "8-Core CPU",
      "2K Display",
      "5.1 Channel Audio",
      "WIFI 5",
      "Bluetooth 5.1",
    ],
    specs: [
      { label: "CPU", value: "8-Core" },
      { label: "RAM + ROM", value: "4+64GB / 6+128GB" },
      { label: "Screen Resolution", value: "2000×1200" },
      { label: "OS", value: "Android 11" },
      { label: "Apple CarPlay", value: "Yes" },
      { label: "Android Auto", value: "Yes" },
    ],
    highlights: [
      "Balanced performance and features",
      "Great display quality",
      "Reliable for high-volume markets",
    ],
  },
  {
    id: "cc4l",
    name: "CC4L",
    series: "entry",
    seriesName: "Entry Series",
    tagline: "Smart Value",
    description:
      "Streamlined version of CC4 with essential features for value-focused markets.",
    image: x1ProImg,
    features: [
      "Quad-Core CPU",
      "HD Display",
      "Apple CarPlay",
      "Android Auto",
    ],
    specs: [
      { label: "CPU", value: "Quad-Core" },
      { label: "RAM + ROM", value: "2+32GB" },
      { label: "Screen Resolution", value: "1280×720" },
      { label: "OS", value: "Android 10" },
      { label: "Apple CarPlay", value: "Yes" },
      { label: "Android Auto", value: "Yes" },
    ],
    highlights: [
      "Affordable smart upgrade",
      "Essential connectivity features",
      "Simple and reliable",
    ],
  },
];

export const getProductById = (id: string) => products.find((p) => p.id === id);

export const getProductsBySeries = (series: Product["series"]) =>
  products.filter((p) => p.series === series);

export const seriesInfo = {
  flagship: {
    name: "Flagship Series",
    description: "Ultimate performance and cutting-edge technology",
    color: "from-primary to-accent",
  },
  advanced: {
    name: "Advanced Series",
    description: "Best-selling performance with proven reliability",
    color: "from-emerald-500 to-teal-400",
  },
  entry: {
    name: "Entry Series",
    description: "Affordable solutions for every market",
    color: "from-amber-500 to-orange-400",
  },
};
