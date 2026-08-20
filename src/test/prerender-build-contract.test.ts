import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), "package.json"), "utf8"),
);

describe("prerender build contract", () => {
  it("installs the Puppeteer Chrome binary before prerendering", () => {
    const buildCommand = packageJson.scripts.build as string;
    const installCommand = "npx puppeteer browsers install chrome";

    expect(buildCommand).toContain(installCommand);
    expect(buildCommand.indexOf(installCommand)).toBeLessThan(
      buildCommand.indexOf("node scripts/prerender.mjs"),
    );
  });
});
