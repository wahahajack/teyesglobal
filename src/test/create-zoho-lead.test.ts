import { describe, expect, it, vi } from "vitest";
import { createZohoLeadHandler, type ZohoEnvironment } from "../../netlify/functions/create-zoho-lead";

const validEnv: ZohoEnvironment = {
  ZOHO_CLIENT_ID: "test-client-id",
  ZOHO_CLIENT_SECRET: "test-client-secret",
  ZOHO_REFRESH_TOKEN: "test-refresh-token",
  ZOHO_ACCOUNTS_BASE_URL: "https://accounts.zoho.test",
  ZOHO_API_BASE_URL: "https://www.zohoapis.test",
};
const validPayload = { source: "contact_page", fullName: "Jane Doe", email: "jane@example.com", company: "Example Auto", country: "Brazil", inquiryType: "Distribution Partnership", message: "Please send distributor terms.", estimatedQuantity: "", businessModel: "", submittedAt: "2026-08-07T10:00:00.000Z", website: "", formEntryPage: "/products/cc4-pro/?source=test", attribution: { gclid: "gclid-123", gbraid: "", wbraid: "", utm_source: "google", utm_medium: "cpc", utm_campaign: "distributor_test", utm_content: "", utm_term: "android head unit distributor", fbclid: "", landing_page: "https://deploy-preview.example.netlify.app/?gclid=gclid-123", referrer: "https://www.google.com/" } };
const mockZohoTokenAndCreate = () => vi.fn<typeof fetch>()
  .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: "test-access-token" }), { status: 200, headers: { "Content-Type": "application/json" } }))
  .mockResolvedValueOnce(new Response(JSON.stringify({ data: [{ status: "success" }] }), { status: 201, headers: { "Content-Type": "application/json" } }));
const post = (payload: unknown, env = validEnv, fetchImpl: typeof fetch = vi.fn()) => createZohoLeadHandler(env, fetchImpl)(new Request("https://deploy-preview.example.netlify.app/.netlify/functions/create-zoho-lead", { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://deploy-preview.example.netlify.app" }, body: JSON.stringify(payload) }));

describe("createZohoLeadHandler", () => {
  it("拒绝非 POST 请求", async () => {
    const response = await createZohoLeadHandler(validEnv, vi.fn())(new Request("https://deploy-preview.example.netlify.app/.netlify/functions/create-zoho-lead"));
    expect(response.status).toBe(405);
    expect(response.headers.get("Allow")).toBe("POST");
  });
  it("蜜罐有值时静默接受且不请求 Zoho", async () => {
    const fetchMock = vi.fn();
    const response = await post({ ...validPayload, website: "spam.example" }, validEnv, fetchMock);
    expect(response.status).toBe(202); expect(fetchMock).not.toHaveBeenCalled();
  });
  it("拒绝无效邮箱", async () => { expect((await post({ ...validPayload, email: "invalid" })).status).toBe(400); });
  it("拒绝跨域 Origin", async () => {
    const response = await createZohoLeadHandler(validEnv, vi.fn())(new Request("https://deploy-preview.example.netlify.app/.netlify/functions/create-zoho-lead", { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://attacker.example" }, body: JSON.stringify(validPayload) }));
    expect(response.status).toBe(403);
  });
  it("把网站来源和归因字段映射到 Zoho Lead", async () => {
    const fetchMock = mockZohoTokenAndCreate(); const response = await post(validPayload, validEnv, fetchMock);
    expect(response.status).toBe(201);
    expect(JSON.parse(String(fetchMock.mock.calls[1][1]?.body)).data[0]).toMatchObject({ Last_Name: "Jane Doe", Company: "Example Auto", Email: "jane@example.com", Lead_Source: "Web Download", Google_Click_ID: "gclid-123", UTM_Source: "google", Lead_Form: "contact_page", Form_Entry_Page: "/products/cc4-pro/?source=test", Initial_Landing_Page: "https://deploy-preview.example.netlify.app/?gclid=gclid-123", Website_Submitted_At: "2026-08-07T10:00:00+00:00" });
  });
  it("同源 formEntryPage 只映射路径和查询参数", async () => {
    const fetchMock = mockZohoTokenAndCreate(); await post({ ...validPayload, formEntryPage: "https://deploy-preview.example.netlify.app/products/cc4-pro/?source=trusted#form" }, validEnv, fetchMock);
    expect(JSON.parse(String(fetchMock.mock.calls[1][1]?.body)).data[0].Form_Entry_Page).toBe("/products/cc4-pro/?source=trusted");
  });
  it("外部绝对 formEntryPage 映射为空", async () => {
    const fetchMock = mockZohoTokenAndCreate(); await post({ ...validPayload, formEntryPage: "https://attacker.example/products/cc4-pro/?source=untrusted" }, validEnv, fetchMock);
    expect(JSON.parse(String(fetchMock.mock.calls[1][1]?.body)).data[0].Form_Entry_Page).toBe("");
  });
  it("协议相对 formEntryPage 映射为空", async () => {
    const fetchMock = mockZohoTokenAndCreate(); await post({ ...validPayload, formEntryPage: "//deploy-preview.example.netlify.app/products/cc4-pro/?source=untrusted" }, validEnv, fetchMock);
    expect(JSON.parse(String(fetchMock.mock.calls[1][1]?.body)).data[0].Form_Entry_Page).toBe("");
  });
  it("格式错误的 formEntryPage 映射为空", async () => {
    const fetchMock = mockZohoTokenAndCreate(); await post({ ...validPayload, formEntryPage: "http://[::1" }, validEnv, fetchMock);
    expect(JSON.parse(String(fetchMock.mock.calls[1][1]?.body)).data[0].Form_Entry_Page).toBe("");
  });
  it("缺少可选 formEntryPage 时映射为空", async () => {
    const { formEntryPage, ...payloadWithoutFormEntryPage } = validPayload; const fetchMock = mockZohoTokenAndCreate(); await post(payloadWithoutFormEntryPage, validEnv, fetchMock);
    expect(JSON.parse(String(fetchMock.mock.calls[1][1]?.body)).data[0].Form_Entry_Page).toBe("");
  });
  it("Zoho 在 HTTP 201 中报告逐条失败时返回上游错误", async () => {
    const fetchMock = vi.fn<typeof fetch>()
      .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: "test-access-token" }), { status: 200, headers: { "Content-Type": "application/json" } }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ data: [{ status: "error" }] }), { status: 201, headers: { "Content-Type": "application/json" } }));

    const response = await post(validPayload, validEnv, fetchMock);
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ error: "upstream_error", code: "unknown" });
  });
  it("仅返回 Zoho 的安全错误代码和字段名", async () => {
    const fetchMock = vi.fn<typeof fetch>()
      .mockResolvedValueOnce(new Response(JSON.stringify({ access_token: "test-access-token" }), { status: 200, headers: { "Content-Type": "application/json" } }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ data: [{ status: "error", code: "INVALID_DATA", details: { api_name: "Lead_Source" } }] }), { status: 201, headers: { "Content-Type": "application/json" } }));

    expect(await (await post(validPayload, validEnv, fetchMock)).json()).toEqual({ error: "upstream_error", code: "INVALID_DATA", field: "Lead_Source" });
  });
  it("Zoho 凭据缺失时不泄露配置值", async () => {
    const text = await (await post(validPayload, {}, vi.fn())).text();
    expect(text).not.toContain("ZOHO_CLIENT_SECRET"); expect(text).not.toContain("test-client-secret");
  });
});
