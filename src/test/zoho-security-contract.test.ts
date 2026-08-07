import { expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = join(__dirname, "..", "..");
const sourceRoots = ["src", "public", "netlify"];
const collectProjectSources = (dir: string): string[] =>
  readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? collectProjectSources(path) : [path];
  });

it("前端正式文件不包含 Zoho secret 或 refresh token", () => {
  const offenders = sourceRoots.flatMap((dir) => collectProjectSources(join(root, dir))).filter((file) => {
    const source = readFileSync(file, "utf8");
    return /ZOHO_CLIENT_SECRET\s*=\s*["'][^"']+|ZOHO_REFRESH_TOKEN\s*=\s*["'][^"']+/i.test(source);
  });
  expect(offenders).toEqual([]);
});

it("VITE 环境变量不包含 Zoho 凭据", () => {
  const envExample = readFileSync(join(root, ".env.example"), "utf8");
  expect(envExample).not.toMatch(/VITE_ZOHO_/);
});
