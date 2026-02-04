import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
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

// Group products by category
const categories = [...new Set(accessoryProducts.map(p => p.category))];

// Accessory Card Component
const AccessoryCard = ({ product }: { product: AccessoryProduct }) => {
  const image = productImages[product.id];
  const IconComponent = product.icon;
  
  return (
    <div className="group rounded-2xl bg-card border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
      {/* Product Image */}
      <div className="aspect-square bg-gradient-to-br from-secondary/50 to-card flex items-center justify-center relative overflow-hidden">
        {image ? (
          typeof image === 'string' ? (
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
                src={image.webp || ''}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </picture>
          )
        ) : (
          <IconComponent className="h-16 w-16 text-muted-foreground/30 transition-transform duration-300 group-hover:scale-110" />
        )}
      </div>

      {/* Product Info */}
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
      <SEOHead
        title="Car Head Unit Accessories - Cameras, TPMS & Audio"
        description="TEYES official accessories: 360° camera systems, dash cameras, TPMS, OBD2 adapters, screen protectors, microphones and installation kits for all TEYES head units."
        keywords="TEYES accessories, 360 camera system, dash camera DVR, backup camera, TPMS, OBD2, screen protector"
        canonicalPath="/accessories"
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

      {/* Products by Category */}
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

      {/* CTA */}
      <section className="py-20 bg-card">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-display font-bold mb-4">
            Need Help Finding the Right Accessories?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Contact us with your vehicle and unit details — we'll recommend 
            the complete accessory package for your installation.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">
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
