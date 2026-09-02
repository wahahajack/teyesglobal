export type CarAudioProductVisual = {
  id: string;
  model: string;
  type: string;
  image: string;
  alt: string;
  specs: string[];
  width: number;
  height: number;
};

const product = (
  id: string,
  model: string,
  type: string,
  specs: string[],
  width: number,
  height: number,
): CarAudioProductVisual => ({
  id,
  model,
  type,
  specs,
  width,
  height,
  image: `/images/car-audio/products/${id}.webp`,
  alt: `TEYES ${model} ${type}`,
});

export const productVisuals = {
  "t3-652": product("t3-652", "T3-652", '6.5" 2-Way Passive Speaker', ["100 W rated", "71 mm mounting depth"], 512, 381),
  "t3-65x": product("t3-65x", "T3-65X", "Coaxial Speaker", ["100 W rated", "71 mm mounting depth"], 512, 310),
  "t6-652": product("t6-652", "T6-652", '6.5" 2-Way Passive Speaker', ["120 W rated", "77.5 mm mounting depth"], 512, 320),
  "t6-653a": product("t6-653a", "T6-653A", '6.5" 3-Way Active Speaker', ["150 W rated", "89 dB sensitivity"], 512, 246),
  "t6-803a": product("t6-803a", "T6-803A", '8" 3-Way Active Speaker', ["180 W rated", "91 dB sensitivity"], 512, 402),
  "t6-65x": product("t6-65x", "T6-65X", "Coaxial Speaker", ["120 W rated", "77.5 mm mounting depth"], 512, 308),

  "ts-08": product("ts-08", "TS-08", '8" Under-Seat Subwoofer', ["260 W rated", "77 mm chassis height"], 394, 512),
  "ts-10": product("ts-10", "TS-10", '10" Under-Seat Subwoofer', ["260 W rated", "25 Hz low-frequency response"], 398, 512),
  "10t3-v4": product("10t3-v4", "10T3-V4", '10" Standard-Depth Subwoofer', ["400 W rated", "148.5 mm mounting depth"], 512, 311),
  "10t3s-v4": product("10t3s-v4", "10T3S-V4", '10" Thin-Line Subwoofer', ["400 W rated", "89 mm mounting depth"], 512, 311),
  "10t6-v4": product("10t6-v4", "10T6-V4", '10" Standard-Depth Subwoofer', ["500 W rated", "160.5 mm mounting depth"], 512, 312),
  "10t6s-v4": product("10t6s-v4", "10T6S-V4", '10" Thin-Line Subwoofer', ["400 W rated", "84 mm mounting depth"], 512, 313),

  "10v8-v4": product("10v8-v4", "10V8-V4", '10" Competition Subwoofer', ["600 W rated", "16 mm X-MAX"], 512, 312),
  "bxa3-10t3s-v4": product("bxa3-10t3s-v4", "BXA3/10T3S/V4", '10" Active Sealed Subwoofer', ["460 × 340 × 139 mm", "13 kg"], 512, 385),
  "bx1-10t3s-v4": product("bx1-10t3s-v4", "BX1/10T3S/V4", '10" Passive Sealed Subwoofer', ["460 × 340 × 139 mm", "13 kg"], 512, 380),
  "bx2-10t3s-v4": product("bx2-10t3s-v4", "BX2/10T3S/V4", '10" Passive Ported Subwoofer', ["323 × 330 × 400 mm", "13 kg"], 512, 424),
  "bx4-10t3-d4": product("bx4-10t3-d4", "BX4/10T3/D4", '10" Passive Ported Subwoofer', ["240 × 355 × 430 mm", "15 kg"], 512, 434),

  "td500-4": product("td500-4", "TD500/4", "Class D 4-Channel Amplifier", ["75 W × 4 @ 4 Ω", "125 W × 4 @ 2 Ω"], 512, 322),
  "td1000-1": product("td1000-1", "TD1000/1", "Class D Mono Amplifier", ["350 W × 1 @ 4 Ω", "650 W × 1 @ 2 Ω"], 512, 322),
  "tp800-4": product("tp800-4", "TP800/4", "Class D DSP-Controlled 4-Channel Amplifier", ["120 W × 4 @ 4 Ω", "200 W × 4 @ 2 Ω"], 512, 318),
  "tp1200-1": product("tp1200-1", "TP1200/1", "Class D DSP-Controlled Mono Amplifier", ["800 W × 1 @ 4 Ω", "1200 W × 1 @ 2 Ω"], 512, 318),

  "tweeter-mount": product("tweeter-mount", "Tweeter Mount", "Speaker Installation Accessory", ["Dedicated tweeter mount"], 512, 294),
  "t6-650-woofer-grille": product("t6-650-woofer-grille", "T6-650 Woofer Grille", "Speaker Grille", ["For T6-650 woofer"], 512, 338),
  "t6-65x-coaxial-grille": product("t6-65x-coaxial-grille", "T6-65X Coaxial Grille", "Speaker Grille", ["For T6-65X coaxial speaker"], 512, 338),
} as const;

export type ProductVisualId = keyof typeof productVisuals;

export const getProductVisuals = (ids: readonly ProductVisualId[]) => ids.map((id) => productVisuals[id]);

export const hubHeroVisualIds = ["t6-803a", "ts-10", "tp1200-1", "10v8-v4"] as const;

export const hubFamilyVisualIds = {
  speakers: ["t6-803a", "t6-653a"],
  subwoofers: ["ts-10", "10t6s-v4"],
  "bass-systems": ["10v8-v4", "bxa3-10t3s-v4"],
  amplifiers: ["tp1200-1", "td500-4"],
} as const satisfies Record<string, readonly ProductVisualId[]>;

export const categoryProductVisualIds = {
  speakers: ["t3-652", "t3-65x", "t6-652", "t6-653a", "t6-803a", "t6-65x"],
  subwoofers: ["ts-08", "ts-10", "10t3-v4", "10t3s-v4", "10t6-v4", "10t6s-v4"],
  "bass-systems": ["10v8-v4", "bxa3-10t3s-v4", "bx1-10t3s-v4", "bx2-10t3s-v4", "bx4-10t3-d4"],
  amplifiers: ["td500-4", "td1000-1", "tp800-4", "tp1200-1"],
} as const satisfies Record<string, readonly ProductVisualId[]>;

export const accessoryProductVisualIds = [
  "tweeter-mount",
  "t6-650-woofer-grille",
  "t6-65x-coaxial-grille",
] as const;
