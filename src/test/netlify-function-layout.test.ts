import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("Netlify functions directory", () => {
  it("只包含可部署的函数源文件，不包含测试文件", () => {
    const functionsDirectory = resolve(process.cwd(), "netlify/functions");
    const testFiles = readdirSync(functionsDirectory).filter((file) => /\.(test|spec)\.[cm]?[jt]s$/.test(file));

    expect(testFiles).toEqual([]);
  });
});
