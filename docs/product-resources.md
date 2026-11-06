# 产品资料维护说明

## 访问地址

资料中心：`/downloads/`。每份资料都有固定查看页：`/downloads/<id>/`。

| 资料 | 独立查看页 |
| --- | --- |
| TEYES 2026 产品目录 | `/downloads/product-catalog/` |
| TEYES 2026 汽车音响目录 | `/downloads/car-audio-catalog/` |
| TEYES 2026 专车专用面框清单 | `/downloads/fascia-panel-list/` |

对外分享时，在路径前加上网站域名。建议分享查看页链接，方便以后更新文件。

资料页不放在网站导航、页脚或 sitemap 中，并通过页面元信息和 Netlify 响应头设置 `noindex, nofollow`，要求搜索引擎不收录。拿到链接的人仍可访问和转发，这不是权限保护。

## 添加资料

1. 将可对外分享的文件放入 `public/resource-files/`，建议使用带版本的英文文件名。
2. 在 `src/data/downloads.ts` 的资料数组中添加记录，填写以下字段：

   | 字段 | 用途 |
   | --- | --- |
   | `id` | 唯一、固定的链接标识，例如 `car-audio-catalog` |
   | `title` | 客户看到的标题 |
   | `description` | 简短说明 |
   | `format` | 文件格式；填写 `PDF` 才会显示内嵌预览 |
   | `size` | 实际文件大小，例如 `6.7 MB` |
   | `version` | 资料版本，例如 `2026` |
   | `file` | 从网站根目录起算的文件路径，例如 `/resource-files/teyes-car-audio-catalog-2026.pdf` |

3. `/resource-files/*` 已设置不收录响应头。如果使用其他目录，需要在 `public/_headers` 添加相应的 `X-Robots-Tag: noindex, nofollow` 规则。
4. 执行 `npx vitest run src/test/downloads.test.tsx` 和 `npm run build`，检查预览和下载，再按网站正常流程部署。

PDF 提供内嵌预览、单独打开和下载按钮，其他格式提供打开和下载按钮。部分手机或应用内置浏览器不能预览 PDF 时，可使用页面上方的打开或下载按钮。

## 更新资料

- 保留原来的 `id`，之前发给客户的查看页链接仍然有效。
- 新版本建议使用新文件名，并更新 `file`、`size`、`version` 等字段，避免读取缓存的旧文件。
- 如需继续支持旧 PDF 直链，请保留旧文件或为旧地址配置跳转。
- 目前添加和更新资料需要重新部署网站，没有上传管理后台。

## 当前文件来源

产品目录复用仓库原有的经销商落地页 PDF。汽车音响目录和面框清单使用用户提供的两份 PDF，存放在 `public/resource-files/`。文件接入不代表对其中参数、适配信息或内容时效进行了审核。
