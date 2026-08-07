import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const PUBLIC_DIR = join(__dirname, "..", "..", "public");

const LANDING_DIRS = [
  "android-car-stereo-wholesale",
  "android-car-stereo-oem-manufacturer",
  "teyes-android-car-stereo-distributor",
];

// 排除规则：.history/、*.bak、raw_html.html、script.js.bak
const isExcluded = (relPath: string): boolean => {
  const normalized = relPath.replace(/\\/g, "/");
  if (normalized.includes("/.history/") || normalized.startsWith(".history/"))
    return true;
  if (normalized.endsWith(".bak")) return true;
  if (normalized.endsWith("raw_html.html")) return true;
  return false;
};

const collectFiles = (dir: string, base: string): string[] => {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const rel = relative(base, full);
    if (isExcluded(rel)) continue;
    const stat = statSync(full);
    if (stat.isDirectory()) {
      out.push(...collectFiles(full, base));
    } else if (/\.(html|js)$/i.test(entry)) {
      out.push(full);
    }
  }
  return out;
};

const formalFiles: string[] = LANDING_DIRS.flatMap((d) =>
  collectFiles(join(PUBLIC_DIR, d), join(PUBLIC_DIR, d)),
);

const FORBIDDEN_PATTERNS: Array<{ label: string; regex: RegExp }> = [
  { label: "AW-XXXX", regex: /AW-XXXX/ },
  { label: "__AW_CONVERSION_SEND_TO", regex: /__AW_CONVERSION_SEND_TO/ },
  { label: "ga('send'", regex: /ga\(\s*'send'/ },
  { label: "fbq('track'", regex: /fbq\(\s*'track'/ },
  {
    label: "gtag('event', 'generate_lead'",
    regex: /gtag\(\s*['"]event['"]\s*,\s*['"]generate_lead['"]/,
  },
  {
    label: "gtag('event', 'conversion'",
    regex: /gtag\(\s*['"]event['"]\s*,\s*['"]conversion['"]/,
  },
  { label: "lead_submitted", regex: /lead_submitted/ },
  { label: "trackWhatsAppClick", regex: /trackWhatsAppClick/ },
];

describe("tracking contract: 正式文件不含禁用追踪代码", () => {
  it("落地页正式文件清单非空", () => {
    expect(formalFiles.length).toBeGreaterThan(0);
  });

  for (const { label, regex } of FORBIDDEN_PATTERNS) {
    it(`不含 ${label}`, () => {
      const offenders = formalFiles.filter((file) =>
        regex.test(readFileSync(file, "utf8")),
      );
      expect(
        offenders.map((f) => relative(PUBLIC_DIR, f)),
        `发现禁用内容 ${label}`,
      ).toEqual([]);
    });
  }
});

describe("tracking contract: 参数数组与跳转契约", () => {
  const PARAM_FILES = [
    "android-car-stereo-wholesale/script.js",
    "android-car-stereo-oem-manufacturer/script.js",
    "teyes-android-car-stereo-distributor/index.html",
  ];

  for (const rel of PARAM_FILES) {
    it(`${rel} 参数数组含 gbraid 和 wbraid`, () => {
      const content = readFileSync(join(PUBLIC_DIR, rel), "utf8");
      expect(content).toMatch(/['"]gbraid['"]/);
      expect(content).toMatch(/['"]wbraid['"]/);
    });
  }

  it("经销商文件含 thank-you-catalog.html 跳转", () => {
    const content = readFileSync(
      join(PUBLIC_DIR, "teyes-android-car-stereo-distributor/index.html"),
      "utf8",
    );
    expect(content).toContain("thank-you-catalog.html");
  });
});

describe("tracking contract: 静态页面 Lead capture", () => {
  const leadCapturePages = [
    "android-car-stereo-wholesale/index.html",
    "android-car-stereo-oem-manufacturer/index.html",
  ];
  for (const rel of leadCapturePages) {
    it(`${rel} 加载共享 lead capture 客户端`, () => {
      expect(readFileSync(join(PUBLIC_DIR, rel), "utf8")).toContain("/lead-capture.js");
    });
  }
  it("Wholesale 保留原转化事件并在成功分支调用 capture", () => {
    const source = readFileSync(join(PUBLIC_DIR, "android-car-stereo-wholesale/script.js"), "utf8");
    expect(source).toContain("event: 'form_submit_success'");
    expect(source).toContain("form_name: 'wholesale_quote'");
    expect(source).toContain("TeyesLeadCapture.capture");
    expect(source).toContain("./thank-you.html");
  });
  it("OEM 保留原转化事件并在成功分支调用 capture", () => {
    const source = readFileSync(join(PUBLIC_DIR, "android-car-stereo-oem-manufacturer/script.js"), "utf8");
    expect(source).toContain('event: "form_submit_success"');
    expect(source).toContain('form_name: "manufacturing_quote"');
    expect(source).toContain("TeyesLeadCapture.capture");
    expect(source).toContain("/android-car-stereo-oem-manufacturer/thank-you.html");
  });

  it("Distributor 页面加载共享客户端并保留动态感谢页", () => {
    const source = readFileSync(join(PUBLIC_DIR, "teyes-android-car-stereo-distributor/index.html"), "utf8");
    expect(source).toContain("/lead-capture.js");
    expect(source).toContain("TeyesLeadCapture.capture");
    expect(source).toContain("thank-you-catalog.html");
    expect(source).toContain("thank-you.html");
    expect(source).toContain("event: 'form_submit_success'");
  });
});
