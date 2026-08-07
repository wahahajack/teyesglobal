# Zoho CRM + Netlify 配置

不要在文档、截图、终端输出、Git 或聊天中粘贴 Client Secret、Refresh Token 或客户正文。

1. 在 Zoho API Console 创建 Self Client 或 Server-based Client，并生成只含 `ZohoCRM.modules.leads.CREATE` 的授权与 Refresh Token。
2. 按账户数据中心选择 URL：`.com` 使用 `https://accounts.zoho.com` / `https://www.zohoapis.com`；EU、AU、IN、JP、CA 账户必须使用对应 Zoho 域名。
3. 在 Zoho **Setup → Developer Hub → APIs & SDKs → API Names → Leads** 创建并核对：GCLID、GBRAID、WBRAID、UTM 字段、FBCLID、Lead_Form、Inquiry_Type、Estimated_Quantity、Business_Model、Initial_Landing_Page、Initial_Referrer、Website_Submitted_At。若已有等价字段，仅更新 Function 中的 `ZOHO_FIELDS` 常量。
4. 在 Netlify **Site configuration → Environment variables** 设置 `.env.example` 中五个变量。对 **Deploy Previews** 与 **Production** 分别选择适用 scope；仅通过 Netlify UI 输入值。
5. 推送功能分支并触发新的 Deploy Preview。
6. 使用测试邮箱依次提交 Contact、Wholesale、OEM/ODM、Distributor，并测试 Distributor 的 catalog intent。确认 EmailJS、一次 `form_submit_success`、原感谢页和一个 Zoho Lead 都正常。
7. 在同一 Preview 标签页先访问带测试广告参数的页面，再导航至 Contact 提交。核对 GCLID、GBRAID、WBRAID、五个 UTM、Initial Landing Page 与 Initial Referrer。
8. 临时移除 Preview 的 Zoho 环境变量并重建，仅测试一次：EmailJS、转化事件和感谢页必须仍然正常；Function 的失败必须不显示 token、secret 或客户正文。随后恢复变量并重新部署。
9. 在 Zoho 删除测试 Leads，并按团队流程删除或归档测试邮件；保留 Deploy Preview 供验收。
