import { describe, expect, it, vi } from "vitest";
import { createZohoLeadHandler, type ZohoEnvironment } from "../../netlify/functions/create-zoho-lead";

const CORRELATION_ID = "abcdef0123456789abcdef01234567";
const validEnv: ZohoEnvironment = {
  ZOHO_CLIENT_ID: "test-client-id",
  ZOHO_CLIENT_SECRET: "test-client-secret",
  ZOHO_REFRESH_TOKEN: "test-refresh-token",
  ZOHO_ACCOUNTS_BASE_URL: "https://accounts.zoho.test",
  ZOHO_API_BASE_URL: "https://www.zohoapis.test",
};
const validPayload = { source: "contact_page", fullName: "Jane Doe", email: "jane@example.com", company: "Example Auto", country: "Brazil", inquiryType: "Distribution Partnership", message: "Please send distributor terms.", estimatedQuantity: "", businessModel: "", submittedAt: "2026-08-07T10:00:00.000Z", website: "", formEntryPage: "/products/cc4-pro/?source=test", attribution: { gclid: "gclid-123", gbraid: "", wbraid: "", utm_source: "google", utm_medium: "cpc", utm_campaign: "distributor_test", utm_content: "", utm_term: "android head unit distributor", fbclid: "", landing_page: "https://deploy-preview.example.netlify.app/?gclid=gclid-123", referrer: "https://www.google.com/" } };
const tokenResponse = () => new Response(JSON.stringify({ access_token: "test-access-token" }), { status: 200, headers: { "Content-Type": "application/json" } });
const searchResponse = (leads: unknown[]) => new Response(JSON.stringify({ data: leads }), { status: 200, headers: { "Content-Type": "application/json" } });
const createSuccessResponse = () => new Response(JSON.stringify({ data: [{ status: "success" }] }), { status: 201, headers: { "Content-Type": "application/json" } });
const mockZohoTokenAndCreate = (existingLeads: unknown[] = []) => vi.fn<typeof fetch>()
  .mockResolvedValueOnce(tokenResponse())
  .mockResolvedValueOnce(searchResponse(existingLeads))
  .mockResolvedValueOnce(createSuccessResponse());
const existingMatchingLead = {
  Email: "jane@example.com",
  Lead_Form: "contact_page",
  Website_Submitted_At: "2026-08-07T10:00:00.000+00:00",
};
const post = (payload: unknown, env = validEnv, fetchImpl: typeof fetch = vi.fn()) => createZohoLeadHandler(env, fetchImpl)(new Request("https://deploy-preview.example.netlify.app/.netlify/functions/create-zoho-lead", { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://deploy-preview.example.netlify.app" }, body: JSON.stringify(payload) }));
const expectNoEntryAttribution = (lead: Record<string, unknown>) => {
  expect(lead.Description).toBe(validPayload.message);
  expect(lead.Description).not.toContain("---\nAttribution\nForm Entry Page:");
  expect(lead).not.toHaveProperty("Form_Entry_Page");
};

describe("createZohoLeadHandler", () => {
  it("拒绝非 POST 请求", async () => {
    const response = await createZohoLeadHandler(validEnv, vi.fn())(new Request("https://deploy-preview.example.netlify.app/.netlify/functions/create-zoho-lead"));
    expect(response.status).toBe(405);
    expect(response.headers.get("Allow")).toBe("POST");
  });
  it("蜜罐有值时静默接受且不请求 Zoho", async () => {
    const fetchMock = vi.fn();
    const response = await post({
      ...validPayload,
      submissionId: CORRELATION_ID,
      website: "spam.example",
    }, validEnv, fetchMock);
    expect(response.status).toBe(202);
    expect(await response.json()).toEqual({
      ok: false,
      status: "honeypot_rejected",
      submission_id: CORRELATION_ID,
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it("拒绝无效邮箱", async () => { expect((await post({ ...validPayload, email: "invalid" })).status).toBe(400); });
  it("拒绝跨域 Origin", async () => {
    const response = await createZohoLeadHandler(validEnv, vi.fn())(new Request("https://deploy-preview.example.netlify.app/.netlify/functions/create-zoho-lead", { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://attacker.example" }, body: JSON.stringify(validPayload) }));
    expect(response.status).toBe(403);
  });
  it("把网站来源和归因字段映射到 Zoho Lead", async () => {
    const fetchMock = mockZohoTokenAndCreate();
    const response = await post({
      ...validPayload,
      submissionId: CORRELATION_ID,
    }, validEnv, fetchMock);
    expect(response.status).toBe(201);
    expect(await response.clone().json()).toEqual({
      ok: true,
      status: "created",
      submission_id: CORRELATION_ID,
    });
    expect(JSON.parse(String(fetchMock.mock.calls[2][1]?.body)).data[0]).toMatchObject({ Last_Name: "Jane Doe", Company: "Example Auto", Email: "jane@example.com", Fax: CORRELATION_ID, Lead_Source: "Web Download", Google_Click_ID: "gclid-123", UTM_Source: "google", Lead_Form: "contact_page", Description: "Please send distributor terms.\n\n---\nAttribution\nForm Entry Page: /products/cc4-pro/?source=test", Initial_Landing_Page: "https://deploy-preview.example.netlify.app/?gclid=gclid-123", Website_Submitted_At: "2026-08-07T10:00:00+00:00" });
    expect(JSON.parse(String(fetchMock.mock.calls[2][1]?.body)).data[0]).not.toHaveProperty("Form_Entry_Page");
  });
  it("旧客户端缺少 submissionId 时生成关联 ID", async () => {
    const response = await post(validPayload, validEnv, mockZohoTokenAndCreate());
    const body = await response.json();
    expect(body).toMatchObject({ ok: true, status: "created" });
  expect(body.submission_id).toMatch(
      /^[0-9a-f]{30}$/,
    );
  });
  it("已存在相同 Email、提交时间与表单时不重复创建", async () => {
    const fetchMock = mockZohoTokenAndCreate([existingMatchingLead]);
    const response = await post({
      ...validPayload,
      submissionId: CORRELATION_ID,
    }, validEnv, fetchMock);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: true,
      status: "duplicate",
      submission_id: CORRELATION_ID,
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
  it("Email 相同但提交时间不同的询盘正常创建", async () => {
    const fetchMock = mockZohoTokenAndCreate([
      { ...existingMatchingLead, Website_Submitted_At: "2026-08-08T10:00:00.000+00:00" },
    ]);
    const response = await post({
      ...validPayload,
      submissionId: CORRELATION_ID,
    }, validEnv, fetchMock);
    expect(response.status).toBe(201);
    expect(await response.json()).toMatchObject({ ok: true, status: "created" });
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });
  it("提交时间相同但表单不同的询盘正常创建", async () => {
    const fetchMock = mockZohoTokenAndCreate([
      { ...existingMatchingLead, Lead_Form: "wholesale_quote" },
    ]);
    const response = await post({
      ...validPayload,
      submissionId: CORRELATION_ID,
    }, validEnv, fetchMock);
    expect(response.status).toBe(201);
    expect(await response.json()).toMatchObject({ ok: true, status: "created" });
  });
  it("查重请求失败时不创建并返回可重试错误", async () => {
    const fetchMock = vi.fn<typeof fetch>()
      .mockResolvedValueOnce(tokenResponse())
      .mockResolvedValueOnce(new Response(null, { status: 500 }));
    const response = await post(validPayload, validEnv, fetchMock);
    expect(response.status).toBe(502);
    expect(await response.json()).toMatchObject({
      ok: false,
      status: "retryable_failure",
      error: "upstream_error",
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
  it("查重响应不是合法 JSON 时不创建", async () => {
    const fetchMock = vi.fn<typeof fetch>()
      .mockResolvedValueOnce(tokenResponse())
      .mockResolvedValueOnce(new Response("<html>", { status: 200 }));
    const response = await post(validPayload, validEnv, fetchMock);
    expect(response.status).toBe(502);
    expect(await response.json()).toMatchObject({
      ok: false,
      status: "retryable_failure",
      error: "upstream_error",
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
  it("查重返回空响应体时视为无重复并创建", async () => {
    const fetchMock = vi.fn<typeof fetch>()
      .mockResolvedValueOnce(tokenResponse())
      .mockResolvedValueOnce(new Response(null, { status: 204 }))
      .mockResolvedValueOnce(createSuccessResponse());
    const response = await post({
      ...validPayload,
      submissionId: CORRELATION_ID,
    }, validEnv, fetchMock);
    expect(response.status).toBe(201);
    expect(await response.json()).toMatchObject({ ok: true, status: "created" });
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });
  it("记录不含 PII 的创建阶段和安全结果", async () => {
    const logger = vi.fn();
    const handler = (createZohoLeadHandler as unknown as (
      env: ZohoEnvironment,
      fetchImpl: typeof fetch,
      logger: (event: Record<string, unknown>) => void,
    ) => ReturnType<typeof createZohoLeadHandler>)(
      validEnv,
      mockZohoTokenAndCreate(),
      logger,
    );
    const response = await handler(new Request(
      "https://deploy-preview.example.netlify.app/.netlify/functions/create-zoho-lead",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "https://deploy-preview.example.netlify.app",
        },
        body: JSON.stringify({
          ...validPayload,
          submissionId: CORRELATION_ID,
        }),
      },
    ));

    expect(response.status).toBe(201);
    expect(logger).toHaveBeenCalledWith(expect.objectContaining({
      submission_id: CORRELATION_ID,
      source: "contact_page",
      stage: "complete",
      outcome: "created",
      duration_ms: expect.any(Number),
    }));
    expect(JSON.stringify(logger.mock.calls)).not.toContain(validPayload.email);
    expect(JSON.stringify(logger.mock.calls)).not.toContain(validPayload.fullName);
  });
  it("为三次 Zoho 上游请求设置总超时信号", async () => {
    const fetchMock = mockZohoTokenAndCreate();
    const response = await post(validPayload, validEnv, fetchMock);
    expect(response.status).toBe(201);
    expect(fetchMock.mock.calls[0][1]).toEqual(expect.objectContaining({
      signal: expect.any(AbortSignal),
    }));
    expect(fetchMock.mock.calls[1][1]).toEqual(expect.objectContaining({
      signal: expect.any(AbortSignal),
    }));
    expect(fetchMock.mock.calls[2][1]).toEqual(expect.objectContaining({
      signal: expect.any(AbortSignal),
    }));
  });
  it("Token 的 401 永久错误标记为 configuration_failure", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(null, { status: 401 }),
    );
    const response = await post(validPayload, validEnv, fetchMock);
    expect(response.status).toBe(502);
    expect(await response.json()).toMatchObject({
      ok: false,
      status: "configuration_failure",
      error: "upstream_error",
    });
  });
  it("Token 响应缺少 access_token 时标记为 configuration_failure", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(JSON.stringify({}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    const response = await post(validPayload, validEnv, fetchMock);
    expect(await response.json()).toMatchObject({
      ok: false,
      status: "configuration_failure",
      error: "upstream_error",
    });
  });
  it("同源 formEntryPage 会保留描述中的归因块", async () => {
    const fetchMock = mockZohoTokenAndCreate(); await post({ ...validPayload, formEntryPage: "https://deploy-preview.example.netlify.app/products/cc4-pro/?source=trusted#form" }, validEnv, fetchMock);
    const lead = JSON.parse(String(fetchMock.mock.calls[2][1]?.body)).data[0];
    expect(lead.Description).toBe("Please send distributor terms.\n\n---\nAttribution\nForm Entry Page: /products/cc4-pro/?source=trusted");
    expect(lead).not.toHaveProperty("Form_Entry_Page");
  });
  it("同源 formEntryPage 会在 4000 字符 Description 内压缩消息并保留归因块", async () => {
    const fetchMock = mockZohoTokenAndCreate();
    const longMessage = "m".repeat(4000);
    await post({ ...validPayload, message: longMessage, formEntryPage: "https://deploy-preview.example.netlify.app/contact/" }, validEnv, fetchMock);
    const lead = JSON.parse(String(fetchMock.mock.calls[2][1]?.body)).data[0];
    expect(lead.Description.length).toBe(4000);
    expect(lead.Description.endsWith("---\nAttribution\nForm Entry Page: /contact/")).toBe(true);
    expect(lead).not.toHaveProperty("Form_Entry_Page");
  });
  it("外部绝对 formEntryPage 不写入归因块也不写入 Form_Entry_Page", async () => {
    const fetchMock = mockZohoTokenAndCreate(); await post({ ...validPayload, formEntryPage: "https://attacker.example/products/cc4-pro/?source=untrusted" }, validEnv, fetchMock);
    const lead = JSON.parse(String(fetchMock.mock.calls[2][1]?.body)).data[0];
    expectNoEntryAttribution(lead);
  });
  it("协议相对 formEntryPage 不写入归因块也不写入 Form_Entry_Page", async () => {
    const fetchMock = mockZohoTokenAndCreate(); await post({ ...validPayload, formEntryPage: "//deploy-preview.example.netlify.app/products/cc4-pro/?source=untrusted" }, validEnv, fetchMock);
    const lead = JSON.parse(String(fetchMock.mock.calls[2][1]?.body)).data[0];
    expectNoEntryAttribution(lead);
  });
  it("格式错误的 formEntryPage 不写入归因块也不写入 Form_Entry_Page", async () => {
    const fetchMock = mockZohoTokenAndCreate(); await post({ ...validPayload, formEntryPage: "http://[::1" }, validEnv, fetchMock);
    const lead = JSON.parse(String(fetchMock.mock.calls[2][1]?.body)).data[0];
    expectNoEntryAttribution(lead);
  });
  it("缺少可选 formEntryPage 时不写入归因块也不写入 Form_Entry_Page", async () => {
    const { formEntryPage, ...payloadWithoutFormEntryPage } = validPayload; const fetchMock = mockZohoTokenAndCreate(); await post(payloadWithoutFormEntryPage, validEnv, fetchMock);
    const lead = JSON.parse(String(fetchMock.mock.calls[2][1]?.body)).data[0];
    expectNoEntryAttribution(lead);
  });
  it("把页面旅程和 WhatsApp 快照按顺序写入标准 Description", async () => {
    const fetchMock = mockZohoTokenAndCreate();
    await post({
      ...validPayload,
      pageJourney: "/ > /oem-odm/ > /oem-odm/cases/",
      whatsappClickJourney: "/ > /oem-odm/ > /oem-odm/cases/",
      whatsappClickPath: "/oem-odm/cases/",
      whatsappClickCount: 1,
    }, validEnv, fetchMock);

    const lead = JSON.parse(String(fetchMock.mock.calls[2][1]?.body)).data[0];
    expect(lead.Description).toBe([
      validPayload.message,
      "",
      "---",
      "Attribution",
      "Form Entry Page: /products/cc4-pro/?source=test",
      "Page Journey: / > /oem-odm/ > /oem-odm/cases/",
      "WA Click Journey: / > /oem-odm/ > /oem-odm/cases/",
      "WA Click Path: /oem-odm/cases/",
      "WA Click Count: 1",
    ].join("\n"));
    expect(lead).not.toHaveProperty("Form_Entry_Page");
  });
  it("在 4000 字符内压缩消息并保留完整旅程归因块", async () => {
    const fetchMock = mockZohoTokenAndCreate();
    await post({
      ...validPayload,
      message: "m".repeat(4000),
      pageJourney: "/ > /oem-odm/ > /oem-odm/cases/",
      whatsappClickJourney: "/ > /oem-odm/ > /oem-odm/cases/",
      whatsappClickPath: "/oem-odm/cases/",
      whatsappClickCount: 1,
    }, validEnv, fetchMock);

    const lead = JSON.parse(String(fetchMock.mock.calls[2][1]?.body)).data[0];
    expect(lead.Description).toHaveLength(4000);
    expect(lead.Description).toContain("Page Journey: / > /oem-odm/ > /oem-odm/cases/");
    expect(lead.Description).toContain("WA Click Count: 1");
    expect(lead.Description).toContain("Form Entry Page: /products/cc4-pro/?source=test");
    expect(lead).not.toHaveProperty("Form_Entry_Page");
  });
  it("丢弃外部和控制字符旅程值且不增加自定义 Zoho 字段", async () => {
    const fetchMock = mockZohoTokenAndCreate();
    await post({
      ...validPayload,
      pageJourney: "https://attacker.example\n > /contact/",
      whatsappClickPath: "//attacker.example/wa",
    }, validEnv, fetchMock);

    const lead = JSON.parse(String(fetchMock.mock.calls[2][1]?.body)).data[0];
    expect(lead.Description).not.toContain("attacker.example");
    expect(lead).not.toHaveProperty("Form_Entry_Page");
  });
  it("将每个旅程限制为最近 20 个相对路径", async () => {
    const fetchMock = mockZohoTokenAndCreate();
    const pageJourney = Array.from({ length: 22 }, (_, index) => `/route-${index + 1}/`).join(" > ");
    await post({ ...validPayload, pageJourney }, validEnv, fetchMock);

    const lead = JSON.parse(String(fetchMock.mock.calls[2][1]?.body)).data[0];
    expect(lead.Description).toContain("Page Journey: /route-3/ > /route-4/");
    expect(lead.Description).not.toContain("/route-1/");
    expect(lead.Description).not.toContain("/route-2/");
  });
  it("按字符预算保留完整的最近路径而不截断半条路径", async () => {
    const fetchMock = mockZohoTokenAndCreate();
    const routes = Array.from(
      { length: 6 },
      (_, index) => `/${"x".repeat(210)}-${index + 1}/`,
    );

    await post({
      ...validPayload,
      pageJourney: routes.join(" > "),
    }, validEnv, fetchMock);

    const lead = JSON.parse(String(fetchMock.mock.calls[2][1]?.body)).data[0];
    const line = String(lead.Description)
      .split("\n")
      .find((value) => value.startsWith("Page Journey: "));
    const serialized = line?.replace("Page Journey: ", "") || "";
    const retained = serialized.split(" > ").filter(Boolean);

    expect(serialized.length).toBeLessThanOrEqual(1024);
    expect(retained.length).toBeGreaterThan(0);
    expect(retained.every((route) => routes.includes(route))).toBe(true);
    expect(retained.at(-1)).toBe(routes.at(-1));
  });
  it("Zoho 在 HTTP 201 中报告逐条失败时返回上游错误", async () => {
    const fetchMock = vi.fn<typeof fetch>()
      .mockResolvedValueOnce(tokenResponse())
      .mockResolvedValueOnce(searchResponse([]))
      .mockResolvedValueOnce(new Response(JSON.stringify({ data: [{ status: "error" }] }), { status: 201, headers: { "Content-Type": "application/json" } }));

    const response = await post(validPayload, validEnv, fetchMock);
    expect(response.status).toBe(502);
    expect(await response.json()).toMatchObject({
      ok: false,
      status: "retryable_failure",
      error: "upstream_error",
      code: "unknown",
      submission_id: expect.any(String),
    });
  });
  it("仅返回 Zoho 的安全错误代码和字段名", async () => {
    const fetchMock = vi.fn<typeof fetch>()
      .mockResolvedValueOnce(tokenResponse())
      .mockResolvedValueOnce(searchResponse([]))
      .mockResolvedValueOnce(new Response(JSON.stringify({ data: [{ status: "error", code: "INVALID_DATA", details: { api_name: "Lead_Source" } }] }), { status: 201, headers: { "Content-Type": "application/json" } }));

    expect(await (await post(validPayload, validEnv, fetchMock)).json()).toMatchObject({
      ok: false,
      status: "validation_failure",
      error: "upstream_error",
      code: "INVALID_DATA",
      field: "Lead_Source",
      submission_id: expect.any(String),
    });
  });
  it("Zoho 凭据缺失时不泄露配置值", async () => {
    const text = await (await post(validPayload, {}, vi.fn())).text();
    expect(text).not.toContain("ZOHO_CLIENT_SECRET"); expect(text).not.toContain("test-client-secret");
  });
});
