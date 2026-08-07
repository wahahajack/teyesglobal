import { expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const contactFile = join(__dirname, "..", "pages", "Contact.tsx");

it("Contact 只在 EmailJS 成功分支提交 Zoho Lead", () => {
  const source = readFileSync(contactFile, "utf8");
  const emailSuccess = source.indexOf("if (result.status === 200)");
  const zohoSubmit = source.indexOf("submitZohoLead(", emailSuccess);
  const tracking = source.indexOf('pushFormSubmitSuccess("contact_page"', emailSuccess);

  expect(emailSuccess).toBeGreaterThan(-1);
  expect(tracking).toBeGreaterThan(emailSuccess);
  expect(zohoSubmit).toBeGreaterThan(emailSuccess);
});

it("Contact 保留现有转化事件和感谢页", () => {
  const source = readFileSync(contactFile, "utf8");
  expect(source).toContain('pushFormSubmitSuccess("contact_page"');
  expect(source).toContain('navigate("/thank-you")');
});
