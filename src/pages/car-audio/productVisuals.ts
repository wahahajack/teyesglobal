export type ProductSpecification = {
  label: string;
  value: string;
};

export type CarAudioProductVisual = {
  id: string;
  model: string;
  type: string;
  comparisonType?: string;
  tagline?: string;
  image: string;
  alt: string;
  specifications: readonly ProductSpecification[];
  width: number;
  height: number;
};

const product = (
  id: string,
  model: string,
  type: string,
  specifications: readonly ProductSpecification[],
  width: number,
  height: number,
  options: { comparisonType?: string; tagline?: string } = {},
): CarAudioProductVisual => ({
  id,
  model,
  type,
  comparisonType: options.comparisonType,
  tagline: options.tagline,
  specifications,
  width,
  height,
  image: `/images/car-audio/products/${id}.webp`,
  alt: `TEYES ${model} ${type}`,
});

const specification = (label: string, value: string): ProductSpecification => ({ label, value });

export const productVisuals = {
  "t3-652": product(
    "t3-652",
    "T3-652",
    '6.5" 2-Way Passive Speaker',
    [
      specification("Rated Power", "100 W"),
      specification("Maximum Power", "200 W"),
      specification("Nominal Impedance", "4 Ω"),
      specification("Sensitivity", "89 dB"),
      specification("Frequency Response", "65 Hz-22 kHz"),
      specification("Mounting Depth", "71 mm"),
    ],
    512,
    381,
    { comparisonType: '6.5" 2-Way Passive', tagline: "Detail in Every Note." },
  ),
  "t3-65x": product(
    "t3-65x",
    "T3-65X",
    "Coaxial Speaker",
    [
      specification("Rated Power", "100 W"),
      specification("Maximum Power", "200 W"),
      specification("Nominal Impedance", "4 Ω"),
      specification("Sensitivity", "89 dB"),
      specification("Frequency Response", "63 Hz-22 kHz"),
      specification("Mounting Depth", "71 mm"),
    ],
    512,
    310,
    { comparisonType: "Coaxial", tagline: "Music for Every Drive." },
  ),
  "t6-652": product(
    "t6-652",
    "T6-652",
    '6.5" 2-Way Passive Speaker',
    [
      specification("Rated Power", "120 W"),
      specification("Maximum Power", "240 W"),
      specification("Nominal Impedance", "4 Ω"),
      specification("Sensitivity", "89 dB"),
      specification("Frequency Response", "55 Hz-25 kHz"),
      specification("Mounting Depth", "77.5 mm"),
    ],
    512,
    320,
    { comparisonType: '6.5" 2-Way Passive', tagline: "Detail in Every Note." },
  ),
  "t6-653a": product(
    "t6-653a",
    "T6-653A",
    '6.5" 3-Way Active Speaker',
    [
      specification("Rated Power", "150 W"),
      specification("Maximum Power", "300 W"),
      specification("Nominal Impedance", "4 Ω"),
      specification("Sensitivity", "89 dB"),
      specification("Frequency Response", "55 Hz-25 kHz"),
      specification("Mounting Depth", "77.5 mm"),
    ],
    512,
    246,
    { comparisonType: '6.5" 3-Way Active', tagline: "Detail in Every Note." },
  ),
  "t6-803a": product(
    "t6-803a",
    "T6-803A",
    '8" 3-Way Active Speaker',
    [
      specification("Rated Power", "180 W"),
      specification("Maximum Power", "360 W"),
      specification("Nominal Impedance", "4 Ω"),
      specification("Sensitivity", "91 dB"),
      specification("Frequency Response", "53 Hz-25 kHz"),
      specification("Mounting Depth", "77.5 mm"),
    ],
    512,
    402,
    { comparisonType: '8" 3-Way Active', tagline: "Detail in Every Note." },
  ),
  "t6-65x": product(
    "t6-65x",
    "T6-65X",
    "Coaxial Speaker",
    [
      specification("Rated Power", "120 W"),
      specification("Maximum Power", "240 W"),
      specification("Nominal Impedance", "4 Ω"),
      specification("Sensitivity", "89 dB"),
      specification("Frequency Response", "55 Hz-25 kHz"),
      specification("Mounting Depth", "77.5 mm"),
    ],
    512,
    308,
    { comparisonType: "Coaxial", tagline: "Music for Every Drive." },
  ),

  "ts-08": product(
    "ts-08",
    "TS-08",
    '8" Under-Seat Enclosed Subwoofer',
    [
      specification("Rated Power", "260 W"),
      specification("Maximum Power", "520 W"),
      specification("Sensitivity", "85 dB"),
      specification("Frequency Response", "35 Hz-150 Hz"),
      specification("Frequency Control", "20 Hz-150 Hz"),
      specification("Dimensions", "284 × 210 × 77 mm"),
      specification("Net Weight", "5.5 kg"),
    ],
    394,
    512,
    { comparisonType: '8" Under-Seat Enclosed Subwoofer', tagline: "Big Bass. Small Footprint." },
  ),
  "ts-10": product(
    "ts-10",
    "TS-10",
    '10" Under-Seat Enclosed Subwoofer',
    [
      specification("Rated Power", "260 W"),
      specification("Maximum Power", "520 W"),
      specification("Sensitivity", "85 dB"),
      specification("Frequency Response", "25 Hz-150 Hz"),
      specification("Frequency Control", "20 Hz-150 Hz"),
      specification("Dimensions", "314 × 235 × 77 mm"),
      specification("Net Weight", "6.5 kg"),
    ],
    398,
    512,
    { comparisonType: '10" Under-Seat Enclosed Subwoofer', tagline: "Big Bass. Small Footprint." },
  ),
  "10t3-d4": product(
    "10t3-d4",
    "10T3-D4",
    '10" Standard-Depth Subwoofer Driver',
    [
      specification("Rated Power", "400 W"),
      specification("Maximum Power", "800 W"),
      specification("Nominal Impedance", "4 Ω"),
      specification("Sensitivity", "85 dB"),
      specification("Frequency Response", "31.5 Hz-400 Hz"),
      specification("Mounting Depth", "148.5 mm"),
    ],
    512,
    311,
    { comparisonType: '10" Standard-depth', tagline: "Depth You Can Feel." },
  ),
  "10t3s-v4": product(
    "10t3s-v4",
    "10T3S-V4",
    '10" Thin-Line Subwoofer Driver',
    [
      specification("Rated Power", "400 W"),
      specification("Maximum Power", "800 W"),
      specification("Nominal Impedance", "4 Ω + 4 Ω"),
      specification("Sensitivity", "84 dB"),
      specification("Frequency Response", "30 Hz-400 Hz"),
      specification("Mounting Depth", "89 mm"),
    ],
    512,
    311,
    { comparisonType: '10" Thin-line', tagline: "Depth You Can Feel." },
  ),
  "10t6-v4": product(
    "10t6-v4",
    "10T6-V4",
    '10" Standard-Depth Subwoofer Driver',
    [
      specification("Rated Power", "500 W"),
      specification("Maximum Power", "1000 W"),
      specification("Nominal Impedance", "4 Ω + 4 Ω"),
      specification("Sensitivity", "85 dB"),
      specification("Frequency Response", "29 Hz-400 Hz"),
      specification("Mounting Depth", "160.5 mm"),
    ],
    512,
    312,
    { comparisonType: '10" Standard-depth', tagline: "Depth You Can Feel." },
  ),
  "10t6s-v4": product(
    "10t6s-v4",
    "10T6S-V4",
    '10" Thin-Line Subwoofer Driver',
    [
      specification("Rated Power", "400 W"),
      specification("Maximum Power", "800 W"),
      specification("Nominal Impedance", "4 Ω + 4 Ω"),
      specification("Sensitivity", "85 dB"),
      specification("Frequency Response", "28 Hz-400 Hz"),
      specification("Mounting Depth", "84 mm"),
    ],
    512,
    313,
    { comparisonType: '10" Thin-line', tagline: "Depth You Can Feel." },
  ),

  "10v8-v4": product(
    "10v8-v4",
    "10V8-V4",
    '10" Competition Subwoofer Driver',
    [
      specification("Rated Power", "600 W"),
      specification("Maximum Power", "1200 W"),
      specification("Nominal Impedance", "4 Ω + 4 Ω"),
      specification("Sensitivity", "84 dB"),
      specification("Frequency Response", "30 Hz-400 Hz"),
      specification("Mounting Depth", "165 mm"),
      specification("X-MAX", "16 mm"),
      specification("Voice Coil", "CCAW"),
    ],
    512,
    312,
    { comparisonType: '10" Competition', tagline: "Built for Impact." },
  ),
  "bxa3-10t3s-v4": product(
    "bxa3-10t3s-v4",
    "BXA3/10T3S/V4",
    '10" Active Sealed Enclosed Subwoofer',
    [
      specification("Enclosure Material", "Birch plywood"),
      specification("Surface Treatment", "Black felt covering"),
      specification("Dimensions", "460 × 340 × 139 mm"),
      specification("Net Weight", "13 kg"),
    ],
    512,
    385,
    { comparisonType: '10" Active Sealed', tagline: "Bass That Moves You." },
  ),
  "bx1-10t3s-v4": product(
    "bx1-10t3s-v4",
    "BX1/10T3S/V4",
    '10" Passive Sealed Enclosed Subwoofer',
    [
      specification("Enclosure Material", "Birch plywood"),
      specification("Surface Treatment", "Black felt covering"),
      specification("Dimensions", "460 × 340 × 139 mm"),
      specification("Net Weight", "13 kg"),
    ],
    512,
    380,
    { comparisonType: '10" Passive Sealed', tagline: "Bass That Moves You." },
  ),
  "bx2-10t3s-v4": product(
    "bx2-10t3s-v4",
    "BX2/10T3S/V4",
    '10" Passive Ported Enclosed Subwoofer',
    [
      specification("Enclosure Material", "Birch plywood"),
      specification("Surface Treatment", "Polyurea paint"),
      specification("Dimensions", "323 × 330 × 400 mm"),
      specification("Net Weight", "13 kg"),
    ],
    512,
    424,
    { comparisonType: '10" Passive Ported', tagline: "Bass That Moves You." },
  ),
  "bx4-10t3-d4": product(
    "bx4-10t3-d4",
    "BX4/10T3/D4",
    '10" Passive Ported Enclosed Subwoofer',
    [
      specification("Enclosure Material", "Birch plywood"),
      specification("Surface Treatment", "Polyurea paint"),
      specification("Dimensions", "240 × 355 × 430 mm"),
      specification("Net Weight", "15 kg"),
    ],
    512,
    434,
    { comparisonType: '10" Passive Ported', tagline: "Bass That Moves You." },
  ),

  "td500-4": product(
    "td500-4",
    "TD500/4",
    "Class D 4-Channel Amplifier",
    [
      specification("RMS Power @ 4 Ω", "75 W × 4"),
      specification("RMS Power @ 2 Ω", "125 W × 4"),
      specification("Bridged Power @ 4 Ω", "250 W × 2"),
      specification("Dimensions", "250 × 172 × 60 mm"),
      specification("Net Weight", "2.0 kg"),
    ],
    512,
    322,
    { comparisonType: "Class D", tagline: "Power with Precision." },
  ),
  "td1000-1": product(
    "td1000-1",
    "TD1000/1",
    "Class D Mono Amplifier",
    [
      specification("RMS Power @ 4 Ω", "350 W × 1"),
      specification("RMS Power @ 2 Ω", "650 W × 1"),
      specification("Dimensions", "250 × 172 × 60 mm"),
      specification("Net Weight", "2.2 kg"),
    ],
    512,
    322,
    { comparisonType: "Class D", tagline: "Power with Precision." },
  ),
  "tp800-4": product(
    "tp800-4",
    "TP800/4",
    "Class D DSP-Controlled 4-Channel Amplifier",
    [
      specification("RMS Power @ 4 Ω", "120 W × 4"),
      specification("RMS Power @ 2 Ω", "200 W × 4"),
      specification("Bridged Power @ 4 Ω", "400 W × 2"),
      specification("Dimensions", "300 × 176 × 60 mm"),
      specification("Net Weight", "3.6 kg"),
    ],
    512,
    318,
    { comparisonType: "Class D DSP-Controlled", tagline: "Power with Precision." },
  ),
  "tp1200-1": product(
    "tp1200-1",
    "TP1200/1",
    "Class D DSP-Controlled Mono Amplifier",
    [
      specification("RMS Power @ 4 Ω", "800 W × 1"),
      specification("RMS Power @ 2 Ω", "1200 W × 1"),
      specification("Dimensions", "300 × 176 × 60 mm"),
      specification("Net Weight", "3.6 kg"),
    ],
    512,
    318,
    { comparisonType: "Class D DSP-Controlled", tagline: "Power with Precision." },
  ),

  "tweeter-mount": product(
    "tweeter-mount",
    "Tweeter Mount",
    "Speaker Installation Accessory",
    [specification("Application", "Dedicated tweeter mount")],
    512,
    294,
  ),
  "t6-650-woofer-grille": product(
    "t6-650-woofer-grille",
    "T6-650 Woofer Grille",
    "Speaker Grille",
    [specification("Application", "For T6-650 woofer")],
    512,
    338,
  ),
  "t6-65x-coaxial-grille": product(
    "t6-65x-coaxial-grille",
    "T6-65X Coaxial Grille",
    "Speaker Grille",
    [specification("Application", "For T6-65X coaxial speaker")],
    512,
    338,
  ),
} as const;

export type ProductVisualId = keyof typeof productVisuals;

export const getProductVisuals = (ids: readonly ProductVisualId[]) => ids.map((id) => productVisuals[id]);

export const getProductSpecValue = (product: CarAudioProductVisual, label: string) =>
  product.specifications.find((item) => item.label === label)?.value;

export const componentSpeakerVisualIds = ["t3-652", "t6-652", "t6-653a", "t6-803a"] as const satisfies readonly ProductVisualId[];
export const coaxialSpeakerVisualIds = ["t3-65x", "t6-65x"] as const satisfies readonly ProductVisualId[];
export const subwooferDriverVisualIds = ["10t3-d4", "10t3s-v4", "10t6-v4", "10t6s-v4", "10v8-v4"] as const satisfies readonly ProductVisualId[];
export const underSeatVisualIds = ["ts-08", "ts-10"] as const satisfies readonly ProductVisualId[];
export const boxedSubwooferVisualIds = ["bxa3-10t3s-v4", "bx1-10t3s-v4", "bx2-10t3s-v4", "bx4-10t3-d4"] as const satisfies readonly ProductVisualId[];
export const amplifierVisualIds = ["td500-4", "td1000-1", "tp800-4", "tp1200-1"] as const satisfies readonly ProductVisualId[];

export const hubFamilyVisualIds = {
  speakers: ["t6-803a", "10v8-v4"],
  "enclosed-subwoofers": ["ts-10", "bxa3-10t3s-v4"],
  amplifiers: ["tp1200-1", "td500-4"],
} as const satisfies Record<string, readonly ProductVisualId[]>;

export const categoryProductVisualIds = {
  speakers: [...componentSpeakerVisualIds, ...coaxialSpeakerVisualIds, ...subwooferDriverVisualIds],
  "enclosed-subwoofers": [...underSeatVisualIds, ...boxedSubwooferVisualIds],
  amplifiers: amplifierVisualIds,
} as const satisfies Record<string, readonly ProductVisualId[]>;

export const accessoryProductVisualIds = [
  "tweeter-mount",
  "t6-650-woofer-grille",
  "t6-65x-coaxial-grille",
] as const satisfies readonly ProductVisualId[];
