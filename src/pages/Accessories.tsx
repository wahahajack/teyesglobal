import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, Gauge, Cable, Mic, Radio, Monitor, Car, Cpu, Volume2, LucideIcon } from "lucide-react";

// Import accessory images
import tpmsSystem from "@/assets/accessories/tpms-system.webp";
import obd2Adapter from "@/assets/accessories/obd2-adapter.webp";
import dvrDashcam from "@/assets/accessories/dvr-dashcam-800.webp";
import dvrDashcam400 from "@/assets/accessories/dvr-dashcam-400.webp";
import dvrDashcam1200 from "@/assets/accessories/dvr-dashcam-1200.webp";
import dvrDashcam400Avif from "@/assets/accessories/dvr-dashcam-400.avif";
import dvrDashcam800Avif from "@/assets/accessories/dvr-dashcam-800.avif";
import dvrDashcam1200Avif from "@/assets/accessories/dvr-dashcam-1200.avif";
import sonyBackupCamera from "@/assets/accessories/sony-backup-camera.webp";
import rearViewCameraHs from "@/assets/accessories/rear-view-camera-hs.webp";
import dabAdapter from "@/assets/accessories/dab-adapter.webp";
import rcaCable from "@/assets/accessories/rca-cable.webp";
import cc3360Camera from "@/assets/accessories/cc3-360-camera-800.webp";
import cc3360Camera400 from "@/assets/accessories/cc3-360-camera-400.webp";
import cc3360Camera1200 from "@/assets/accessories/cc3-360-camera-1200.webp";
import cc3360Camera400Avif from "@/assets/accessories/cc3-360-camera-400.avif";
import cc3360Camera800Avif from "@/assets/accessories/cc3-360-camera-800.avif";
import cc3360Camera1200Avif from "@/assets/accessories/cc3-360-camera-1200.avif";
import cc4FrontCamera from "@/assets/accessories/cc4-front-camera.webp";
import cc4RearCamera from "@/assets/accessories/cc4-rear-camera.webp";
import luxone360Camera from "@/assets/accessories/luxone-360-camera.webp";
import parkingSensors from "@/assets/accessories/parking-sensors.webp";
import screenProtector from "@/assets/accessories/screen-protector.webp";
import externalMicrophone from "@/assets/accessories/external-microphone.webp";
import cc4DigitalMicrophone from "@/assets/accessories/cc4-digital-microphone.webp";
import steeringControl from "@/assets/accessories/steering-control.webp";
import powerFilter from "@/assets/accessories/power-filter.webp";
import trimRemovalKit from "@/assets/accessories/trim-removal-kit.webp";
import licenseBracket from "@/assets/accessories/license-bracket.webp";
import usbHdmiAdapter from "@/assets/accessories/usb-hdmi-adapter.webp";
import voiceControl from "@/assets/accessories/voice-control.webp";

// Product image mapping
type ImageVariants = { avif?: string; webp?: string; srcSetWebp?: string; srcSetAvif?: string };
const productImages: Record<string, string | ImageVariants> = {
  "tpms": tpmsSystem,
  "obd2": obd2Adapter,
  "dvr-dash-camera": {
    webp: dvrDashcam,
    avif: dvrDashcam800Avif,
    srcSetWebp: `${dvrDashcam400} 400w, ${dvrDashcam} 800w, ${dvrDashcam1200} 1200w`,
    srcSetAvif: `${dvrDashcam400Avif} 400w, ${dvrDashcam800Avif} 800w, ${dvrDashcam1200Avif} 1200w`,
  },
  "sony-backup-camera": sonyBackupCamera,
  "rear-view-camera-hs": rearViewCameraHs,
  "dab-adapter": dabAdapter,
  "line-out-rca": rcaCable,
  "360-camera-cc3": {
    webp: cc3360Camera,
    avif: cc3360Camera800Avif,
    srcSetWebp: `${cc3360Camera400} 400w, ${cc3360Camera} 800w, ${cc3360Camera1200} 1200w`,
    srcSetAvif: `${cc3360Camera400Avif} 400w, ${cc3360Camera800Avif} 800w, ${cc3360Camera1200Avif} 1200w`,
  },
  "cc4-front-camera": cc4FrontCamera,
  "cc4-rear-camera": cc4RearCamera,
  "360-camera-luxone": luxone360Camera,
  "parking-sensors": parkingSensors,
  "screen-protector": screenProtector,
  "external-mic": externalMicrophone,
  "cc4-digital-mic": cc4DigitalMicrophone,
  "steering-control": steeringControl,
  "power-filter": powerFilter,
  "trim-removal-kit": trimRemovalKit,
  "license-bracket": licenseBracket,
  "usb-hdmi": usbHdmiAdapter,
  "voice-control": voiceControl,
};

interface AccessoryProduct {
  id: string;
  category: string;
  name: string;
  description: string;
  price: string;
  compat: string;
  reviews: number;
  icon: LucideIcon;
}

// Real TEYES accessories based on official product catalog
const accessoryProducts: AccessoryProduct[] = [
  {
    id: "360-camera-cc3",
    category: "Camera Systems",
    name: "CC3 360° Camera System",
    description: "3D 360° surround view camera with 4 HD cameras for seamless bird's-eye view",
    price: "from $100",
    compat: "CC3, CC3 2K",
    reviews: 220,
    icon: Camera,
  },
  {
    id: "360-camera-luxone",
    category: "Camera Systems",
    name: "LUX ONE 360° Camera System",
    description: "Premium 3D 360° surround view system designed for LUX ONE series",
    price: "from $106",
    compat: "LUX ONE Pro",
    reviews: 3,
    icon: Camera,
  },
  {
    id: "dvr-dash-camera",
    category: "Camera Systems",
    name: "Integrated AR HD Dash Camera DVR",
    description: "Full HD 1080P dash camera with ADAS features and AR overlay",
    price: "$48",
    compat: "CC2, CC3, CC3 2K, CC3L",
    reviews: 938,
    icon: Camera,
  },
  {
    id: "sony-backup-camera",
    category: "Camera Systems",
    name: "Sony Lens Backup Camera 1080p",
    description: "HD night vision streaming camera with 170° wide angle and Sony sensor",
    price: "from $15",
    compat: "All TEYES units",
    reviews: 212,
    icon: Camera,
  },
  {
    id: "rear-view-camera-hs",
    category: "Camera Systems",
    name: "Rear View Backup Camera HS AHD",
    description: "High-sensitivity AHD camera with excellent low-light performance",
    price: "from $14",
    compat: "All TEYES units",
    reviews: 55,
    icon: Camera,
  },
  {
    id: "cc4-front-camera",
    category: "Camera Systems",
    name: "CC4 Digital Front View Camera",
    description: "High-definition digital front view camera for CC4 series",
    price: "$51",
    compat: "CC4 Pro",
    reviews: 22,
    icon: Camera,
  },
  {
    id: "cc4-rear-camera",
    category: "Camera Systems",
    name: "CC4 Digital Rear View Camera",
    description: "Digital rear view camera with enhanced clarity for CC4 series",
    price: "from $14",
    compat: "CC4 Pro",
    reviews: 16,
    icon: Camera,
  },
  {
    id: "tpms",
    category: "Vehicle Monitoring",
    name: "Tyre Pressure Monitoring System",
    description: "Real-time tire pressure and temperature monitoring with 4 sensors",
    price: "$56",
    compat: "All TEYES units",
    reviews: 315,
    icon: Gauge,
  },
  {
    id: "obd2",
    category: "Vehicle Monitoring",
    name: "OBD II Bluetooth Adapter",
    description: "Bluetooth diagnostic tool for real-time vehicle data display",
    price: "$36",
    compat: "All Android units",
    reviews: 127,
    icon: Cpu,
  },
  {
    id: "parking-sensors",
    category: "Vehicle Monitoring",
    name: "Front & Rear Parking Sensors",
    description: "Complete parking radar system with visual and audio alerts",
    price: "from $124",
    compat: "CC4 Pro, CC3 2K, LUX ONE",
    reviews: 34,
    icon: Car,
  },
  {
    id: "screen-protector",
    category: "Protection",
    name: "Tempered Glass Screen Protector",
    description: "Anti-glare and glossy options for 9\" and 10.2\" screens",
    price: "from $18",
    compat: "CC3, CC3 2K, CC4 Pro, CC2 Plus",
    reviews: 332,
    icon: Monitor,
  },
  {
    id: "external-mic",
    category: "Audio",
    name: "External Microphone Hands Free",
    description: "High-quality external microphone for clear voice calls",
    price: "$12",
    compat: "All TEYES units",
    reviews: 87,
    icon: Mic,
  },
  {
    id: "cc4-digital-mic",
    category: "Audio",
    name: "CC4 Digital External Microphone",
    description: "Digital microphone with enhanced noise cancellation for CC4",
    price: "$42",
    compat: "CC4 Pro",
    reviews: 27,
    icon: Mic,
  },
  {
    id: "dab-adapter",
    category: "Connectivity",
    name: "DAB+ USB Adapter",
    description: "Digital Audio Broadcasting receiver for European radio stations",
    price: "$33",
    compat: "All Android units",
    reviews: 69,
    icon: Radio,
  },
  {
    id: "line-out-rca",
    category: "Connectivity",
    name: "Line Out Adapter RCA Cable",
    description: "Multi-functional 8 RCA AV output cable for audio integration",
    price: "from $14",
    compat: "All TEYES units",
    reviews: 249,
    icon: Cable,
  },
  {
    id: "usb-hdmi",
    category: "Connectivity",
    name: "USB to HDMI Adapter",
    description: "Connect external displays via HDMI output",
    price: "$37",
    compat: "CC4 Pro, CC3 2K",
    reviews: 0,
    icon: Cable,
  },
  {
    id: "steering-control",
    category: "Controls",
    name: "Bluetooth Intelligent Steering Controls",
    description: "Wireless steering wheel control buttons with LED backlight",
    price: "$24",
    compat: "All TEYES units",
    reviews: 78,
    icon: Radio,
  },
  {
    id: "power-filter",
    category: "Power",
    name: "Power Filter",
    description: "Reduces alternator noise and power interference",
    price: "$9",
    compat: "All TEYES units",
    reviews: 52,
    icon: Cable,
  },
  {
    id: "trim-removal-kit",
    category: "Installation",
    name: "Panel Trim Dash Removal Kit",
    description: "4-piece professional trim removal tool set for clean installation",
    price: "$7",
    compat: "Universal",
    reviews: 2407,
    icon: Cable,
  },
  {
    id: "license-bracket",
    category: "Installation",
    name: "License Plate Camera Bracket Kit",
    description: "Universal mounting bracket for rear view camera installation",
    price: "$13",
    compat: "Universal",
    reviews: 46,
    icon: Cable,
  },
  {
    id: "voice-control",
    category: "Software",
    name: "TEYES Voice Control - Forever",
    description: "Lifetime voice control activation for hands-free operation",
    price: "$39",
    compat: "All TEYES units",
    reviews: 4,
    icon: Volume2,
  },
];

const categories = [...new Set(accessoryProducts.map(p => p.category))];

const distributorBundles = [
  {
    title: "Premium Installer Demo Bundle",
    fit: "Best for shops selling CC4 Pro or CC3 2K with a stronger in-store demo experience.",
    items: ["360° camera system", "Front or rear camera", "External microphone", "Screen protector"],
  },
  {
    title: "First Trial Order Add-ons",
    fit: "Best for distributors testing demand before building deeper accessory inventory.",
    items: ["Backup camera", "DVR dash camera", "TPMS", "OBD II adapter", "Trim removal kit"],
  },
  {
    title: "European Retail Support Bundle",
    fit: "Best for markets where DAB+, audio output, and clean installation support matter.",
    items: ["DAB+ adapter", "Line-out RCA cable", "Power filter", "External microphone"],
  },
];

const faqs = [
  {
    question: "Which TEYES accessories should distributors include in a first trial order?",
    answer: "A practical first accessory mix usually includes a backup camera, DVR dash camera, TPMS, OBD II adapter, microphone, screen protector, and basic installation tools. The exact mix should follow the target models and local installer demand.",
  },
  {
    question: "Are all accessories compatible with every TEYES head unit?",
    answer: "No. Some accessories are universal, while others are model-specific. Distributors should confirm compatibility by head unit series, vehicle application, and installation scenario before stocking.",
  },
  {
    question: "Why should distributors sell accessories together with head units?",
    answer: "Accessories help increase order value, support a better installation experience, and give dealers more ways to build premium packages instead of competing only on head unit price.",
  },
];

const AccessoryCard = ({ product }: { product: AccessoryProduct }) => {
  const image = productImages[product.id];
  const IconComponent = product.icon;

  return (
    <div className="group rounded-2xl bg-card border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
      <div className="aspect-square bg-gradient-to-br from-secondary/50 to-card flex items-center justify-center relative overflow-hidden">
        {image ? (
          typeof image === "string" ? (
            <img
              src={image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <picture>
              {image.avif && (
                <source type="image/avif" srcSet={image.srcSetAvif} sizes="(max-width: 768px) 45vw, 200px" />
              )}
              {image.webp && (
                <source type="image/webp" srcSet={image.srcSetWebp} sizes="(max-width: 768px) 45vw, 200px" />
              )}
              <img
                src={image.webp || ""}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </picture>
          )
        ) : (
          <IconComponent className="h-16 w-16 text-muted-foreground/30 transition-transform duration-300 group-hover:scale-110" />
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>
        <div className="text-xs">
          <span className="text-muted-foreground">{product.compat}</span>
        </div>
      </div>
    </div>
  );
};

const AccessoriesPage = () => {
  return (
    <Layout>
      <SEO
        title="TEYES Head Unit Accessories for Distributors & Installers"
        description="TEYES official accessories for Android head units: 360° camera systems, DVR dash cameras, backup cameras, TPMS, OBD2 adapters, microphones, installation kits, and dealer bundle recommendations."
        keywords="TEYES accessories, android head unit accessories, 360 camera system, dash camera DVR, backup camera, TPMS, OBD2, dealer accessories"
        path="/accessories"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Accessories" },
        ]}
        faq={faqs}
      />
      <ContextHeader
        title="Smart Accessories"
        description="Official TEYES accessories — cameras, sensors, audio, and installation kits for professional upgrades."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Accessories" },
        ]}
      />

      <section className="py-16 bg-background">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="section-title mb-4">Accessory Bundles for Better Dealer Sales</h2>
            <p className="section-subtitle mx-auto">
              Accessories help distributors and installers increase order value, improve the installation experience, and build clearer retail packages around TEYES head units.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {distributorBundles.map((bundle) => (
              <div key={bundle.title} className="rounded-2xl bg-card border border-border/50 p-6 hover:border-primary/30 transition-colors">
                <h3 className="text-lg font-semibold mb-3">{bundle.title}</h3>
                <p className="text-sm text-muted-foreground mb-5">{bundle.fit}</p>
                <ul className="space-y-2">
                  {bundle.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact?intent=accessories">
                Get Accessory Recommendations
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/products/compare">Compare Head Units</Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link to="/solutions/distributors">Distributor Program</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-wide">
          {categories.map((category) => (
            <div key={category} className="mb-16 last:mb-0">
              <h2 className="text-2xl font-display font-bold mb-8 text-foreground">
                {category}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {accessoryProducts
                  .filter(p => p.category === category)
                  .map((product) => (
                    <AccessoryCard key={product.id} product={product} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container-wide max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="section-title mb-4">Accessory FAQ</h2>
            <p className="section-subtitle mx-auto">
              Quick guidance for distributors and installers planning accessory stock.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="p-6 rounded-xl bg-background border border-border/50">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-display font-bold mb-4">
            Need Help Finding the Right Accessories?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Contact us with your target head unit models, sales channel, and installation needs. We will recommend an accessory package for your market.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact?intent=accessories">
              Get Recommendations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default AccessoriesPage;