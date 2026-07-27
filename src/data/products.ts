import cc4ProScreenImg from "@/assets/products/cc4-pro-screen-800.webp";
import cc4ProBackImg from "@/assets/products/cc4-pro-back-800.webp";
import cc3Img from "@/assets/products/cc3-2k.webp";
import x1ProImg from "@/assets/products/x1-pro.webp";
import cc4ScreenImg from "@/assets/products/cc4-screen-800.webp";
import cc4BackImg from "@/assets/products/cc4-back-800.webp";
import cc4lScreenImg from "@/assets/products/cc4l-screen-800.webp";
import cc4lBackImg from "@/assets/products/cc4l-back-800.webp";

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
  imageBack?: string;
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
    image: cc4ProScreenImg,
    imageBack: cc4ProBackImg,
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
      { label: "Frame", value: "2K/4K/6915" },
      { label: "GPU", value: "Adreno 643 ~900 GFLOPS" },
      { label: "NPU", value: "12 TOPS" },
      { label: "RAM + ROM", value: "8+128GB / 12+256GB" },
      { label: "Memory Type", value: "LPDDR5 + UFS3.1" },
      { label: "Screen Resolution", value: "2000×1200" },
      { label: "Display Type", value: "2K AMOLED" },
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
      { label: "WIFI", value: "WIFI 6/6E 2.4G+5GHz" },
      { label: "Bluetooth", value: "5.2/5.3/5.4" },
      { label: "4G", value: "EU/US/TW/BRA" },
      { label: "Video Output", value: "DP 4K@60fps" },
      { label: "Video Playback", value: "4K@60fps" },
      { label: "Apple CarPlay", value: "Yes (Wireless)" },
      { label: "Android Auto", value: "Yes (Wireless)" },
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
      "High-performance Android head unit with 2000×1200 2K display, powerful SM6225 8-core processor, and 7.1 channel audio with TAS6424 digital amplifier. Features dual-fan cooling design for stable operation.",
    image: cc4ScreenImg,
    imageBack: cc4BackImg,
    features: [
      "8-Core SM6225",
      "2000×1200 2K",
      "7.1 Channel Audio",
      "DTS® Sound",
      "WIFI 5",
      "Bluetooth 5.1",
    ],
    specs: [
      { label: "CPU", value: "SM6225 8-Core (4×A73 2.8G + 4×A53 1.9G, 6nm)" },
      { label: "GPU", value: "Adreno 610 ≈159 GFLOPS" },
      { label: "NPU", value: "≈1.5 TOPS" },
      { label: "AnTuTu Benchmark", value: "≈320K" },
      { label: "RAM + ROM", value: "6+64GB / 8+128GB" },
      { label: "Memory Type", value: "LPDDR4X + UFS2.1" },
      { label: "Screen Resolution", value: "2000×1200" },
      { label: "Screen Sizes", value: "9.2\" / 10.36\" / 11\" / 13\"" },
      { label: "Display Type", value: "IPS" },
      { label: "Touch Haptic", value: "No" },
      { label: "Amplifier", value: "TAS6424 Digital" },
      { label: "Audio Channel", value: "7.1 Channel" },
      { label: "Subwoofer Output", value: "4V-8V" },
      { label: "Sound Effect", value: "DTS®" },
      { label: "Digital Output", value: "Optical + Coaxial" },
      { label: "Camera Signal", value: "AHD 720P/1080P" },
      { label: "Camera Channels", value: "Up to 4" },
      { label: "360° SVM", value: "Optional (AHD)" },
      { label: "Sentry Mode", value: "No" },
      { label: "Navigation", value: "Single Band L1, ~40 Usable Satellites" },
      { label: "Accuracy", value: "5-10 meters" },
      { label: "OS", value: "TEYES OS (Android 14)" },
      { label: "WIFI", value: "WIFI 5 2.4G+5GHz" },
      { label: "Bluetooth", value: "5.1 (SBC/AAC/APTX/APTX HD/LDAC)" },
      { label: "4G", value: "FDD B1/3/5/7/8/20/28, TDD B38/40/41" },
      { label: "Radio", value: "SI47925 (RDS)" },
      { label: "USB", value: "3× USB 2.0 + 1× USB 3.0" },
      { label: "Gyroscope", value: "6-Axis" },
      { label: "Video Output", value: "Type-C 1080P@60fps (adapter required)" },
      { label: "Video Playback", value: "1080@60fps" },
      { label: "Apple CarPlay", value: "Yes (Wireless)" },
      { label: "Android Auto", value: "Yes (Wireless)" },
    ],
    highlights: [
      "SM6225 8-Core 6nm processor with 2000×1200 2K display",
      "TAS6424 digital amplifier with 7.1 channel DTS® sound",
      "Optional 360° AHD surround view support",
      "Full Wireless CarPlay & Android Auto support",
    ],
  },
  {
    id: "cc4l",
    name: "CC4L",
    series: "entry",
    seriesName: "Entry Series",
    tagline: "Smart Value Choice",
    description:
      "Streamlined version offering essential smart features at an accessible price. Features SM6115 octa-core processor, 1280×720 IPS display, and a 3D engine powered UI for smooth animations.",
    image: cc4lScreenImg,
    imageBack: cc4lBackImg,
    features: [
      "8-Core SM6115",
      "1280×720 IPS",
      "4.1 Channel Audio",
      "CarPlay & Android Auto",
      "WIFI 2.4G+5GHz",
      "Bluetooth 5.0",
    ],
    specs: [
      { label: "CPU", value: "SM6115 8-Core (4×A73 2.0G + 4×A53 1.8G, 11nm)" },
      { label: "GPU", value: "Adreno 610 ≈120 GFLOPS" },
      { label: "NPU", value: "N/A" },
      { label: "AnTuTu Benchmark", value: "≈220K" },
      { label: "RAM + ROM", value: "4+64GB / 6+64GB" },
      { label: "Memory Type", value: "LPDDR4X + UFS2.1" },
      { label: "Screen Resolution", value: "1280×720" },
      { label: "Screen Sizes", value: "9\" / 10.2\"" },
      { label: "Display Type", value: "IPS" },
      { label: "Touch Haptic", value: "No" },
      { label: "Amplifier", value: "EnChip-AXPA17851" },
      { label: "Audio Channel", value: "4.1 Channel" },
      { label: "Subwoofer Output", value: "1.8V-3V" },
      { label: "Sound Effect", value: "N/A" },
      { label: "Digital Output", value: "N/A" },
      { label: "Camera Signal", value: "AHD/CVBS" },
      { label: "Camera Channels", value: "Up to 2" },
      { label: "360° SVM", value: "No" },
      { label: "Sentry Mode", value: "No" },
      { label: "Navigation", value: "Single Band, ~35 Usable Satellites" },
      { label: "Accuracy", value: "10-20 meters" },
      { label: "OS", value: "TEYES OS (Android 14, Classic Mode)" },
      { label: "WIFI", value: "WIFI 5 2.4G+5GHz" },
      { label: "Bluetooth", value: "5.0 (SBC)" },
      { label: "4G", value: "External SIM, FDD B1/3/5/7/8/20/28" },
      { label: "Radio", value: "QX201C (RDS)" },
      { label: "USB", value: "3× USB 2.0 + 1× USB 3.0" },
      { label: "Gyroscope", value: "N/A" },
      { label: "Video Output", value: "Type-C 1080P@60fps (adapter required)" },
      { label: "Video Playback", value: "1080@60fps" },
      { label: "Apple CarPlay", value: "Yes (Wireless)" },
      { label: "Android Auto", value: "Yes (Wireless)" },
    ],
    highlights: [
      "Affordable smart infotainment upgrade",
      "SM6115 octa-core processor with 3D engine UI",
      "CarPlay & Android Auto support",
      "Essential features at competitive price",
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
