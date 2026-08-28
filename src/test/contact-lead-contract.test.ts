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

it("Contact 在转化事件后等待 Zoho，再进入感谢页", () => {
  const source = readFileSync(contactFile, "utf8");
  const emailSuccess = source.indexOf("if (result.status === 200)");
  const tracking = source.indexOf('pushFormSubmitSuccess("contact_page"', emailSuccess);
  const awaited = source.indexOf("await Promise.all([", tracking);
  const zohoSubmit = source.indexOf("submitZohoLead(leadPayload)", awaited);
  const thankYou = source.indexOf('navigate("/thank-you")', zohoSubmit);

  expect(tracking).toBeGreaterThan(emailSuccess);
  expect(awaited).toBeGreaterThan(tracking);
  expect(zohoSubmit).toBeGreaterThan(tracking);
  expect(thankYou).toBeGreaterThan(zohoSubmit);
  expect(source).not.toContain("void submitZohoLead(");
});

it("Contact 为 EmailJS、dataLayer 和 Zoho 复用 submissionId", () => {
  const source = readFileSync(contactFile, "utf8");
  expect(source).toContain("const submissionId = createSubmissionId()");
  expect(source).toContain("submission_id: submissionId");
  expect(source).toContain("submissionId,");
});

it("Contact 在 Zoho 幂等建立前不开放 CRM 重试", () => {
  const source = readFileSync(contactFile, "utf8");
  expect(source).toContain("pendingLeadPayload");
  expect(source).not.toContain("retryZohoSubmission");
  expect(source).not.toContain("Retry Processing");
  expect(source).toContain(
    "disabled={isSubmitting || Boolean(pendingLeadPayload)}",
  );
});

it("Contact 使用不易被自动填充的 honeypot 名称", () => {
  const source = readFileSync(contactFile, "utf8");
  expect(source).toContain('id="teyes_leave_blank"');
  expect(source).toContain('name="teyes_leave_blank"');
  expect(source).not.toContain('name="website"');
});

it("Contact 保留现有转化事件和感谢页", () => {
  const source = readFileSync(contactFile, "utf8");
  expect(source).toContain('pushFormSubmitSuccess("contact_page"');
  expect(source).toContain('navigate("/thank-you")');
});
