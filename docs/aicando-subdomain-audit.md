# aicando.xyz 子域审计

审计时间：2026-08-12（America/Los_Angeles）  

> 2026-08-13 更新：`markdown.aicando.xyz` 域名已不再续费，站内入口已切换到 [MarkdownCanDo GitHub 仓库](https://github.com/gantrol/MarkdownCanDo)。下文关于该子域的状态仅保留为历史审计记录。
数据来源：当前 Cloudflare 账号的 DNS、Workers Custom Domains、过去 7 个完整 UTC 日的 Zone Analytics，以及匿名线上抓取。全程只读，未修改 Cloudflare。

## 先说结论

1. `markdown.aicando.xyz` 是正式 `markdown-can-do` Worker 和当前 canonical；`md.aicando.xyz` 是 `markdown-can-do-legacy-redirect`，会以 301 跳到 `markdown`。内部链接应直接使用最终 canonical，避免多一跳。若决定让短域 `md` 成为 canonical，必须一起反转 Worker、301、canonical、sitemap、robots、hreflang、分析配置和全部内链。
2. 最值得继续做 SEO 的现有子站是 `timeline`、`markdown`、`gala`、`xyz`、`mark`。其中前两个技术基础健康；后三个有实际访问，但仍是 SPA soft-404，缺 canonical/H1，且 `/robots.txt`、`/sitemap.xml` 被首页 HTML 接管。
3. `welink` 有访问但几乎没有任何基础 SEO 标签。先决定它是否值得公开收录；值得就补齐，不值得就 `noindex`。
4. `go.aicando.xyz` 已坏：实测 521，Cloudflare 七天 2,283 个请求中 2,269 个为 521。修复来源或删除 DNS，不要长期保留坏子域。
5. 两个 API 域不应参与网页索引。给所有响应加 `X-Robots-Tag: noindex, nofollow`，并保证无 sitemap、无站内可爬入口。

## 账号内清单

Cloudflare DNS 显示 29 条记录，其中 17 个网站型主机；Workers Custom Domains 另确认 2 个 API 域。`send`、`auth`、DKIM、DMARC 等邮件基础设施不属于网页 SEO，保持现状即可。

| 主机 | Cloudflare / 上游 | 当前行为 | 近 7 日 Visits* | SEO 结论 | 建议 |
| --- | --- | --- | ---: | --- | --- |
| `aicando.xyz` | Proxied A → Vercel | 308 → `www` | 0 | 合理别名 | 保留一跳永久跳转，不进 sitemap |
| `www.aicando.xyz` | Proxied CNAME → Vercel | 200 | 1,538 | 线上仍无 canonical，robots 无 Sitemap | 优先发布仓库内已完成的 VitePress SEO 修复 |
| `timeline.aicando.xyz` | Worker `llm-timeline` | 200 | 3,835 | canonical、H1、robots、sitemap、JSON-LD 完整 | 保留并继续内容建设；另查七天 660 次 504 的具体接口/路径 |
| `tl.aicando.xyz` | 同一 Worker | 正常路径 308 → `timeline` | 0 | 基本合理；随机未知路径会直接留在 `tl` 返回 404 | 让重定向先于路由执行，所有 path/query 都先到 `timeline`；站内只链接正式域 |
| `markdown.aicando.xyz` | Worker `markdown-can-do` | 200 | 148 | canonical、H1、robots、sitemap、hreflang 完整 | 保持为 canonical；逐页改善重复摘要并补 JSON-LD |
| `md.aicando.xyz` | Worker `markdown-can-do-legacy-redirect` | 301 → `markdown` | 0 | 合理短域别名 | 可对外口头使用，但站内链接直接指向最终域 |
| `gala.aicando.xyz` | Proxied CNAME → Pages | 200 | 7,308 | title/description 有；无 H1/canonical；未知路径 200；robots/sitemap 是首页 HTML | P0：真实 404、补 H1/canonical/OG/robots/sitemap |
| `gal.aicando.xyz` | Proxied A 占位 | 301 → `gala` | 0 | 合理别名 | 保留永久跳转，站内只用 `gala` |
| `xyz.aicando.xyz` | Proxied CNAME → Pages | 200 | 1,819 | title/description 有；无 H1/canonical；soft-404；假 robots/sitemap | P0：同 `gala`；并从 AICanDo 工具页给自然内链 |
| `api.xyz.aicando.xyz` | Worker `xyzyj-api` | HTTP 与 HTTPS 根路径均 200 JSON | 0 | 无 HTTPS 强制与 `X-Robots-Tag`；七天请求多数是 404 | 先强制 HTTP→HTTPS；API 全响应加 noindex；检查客户端是否在请求错误路径 |
| `mark.aicando.xyz` | Proxied CNAME → Pages | 200 | 1,069 | 无 H1/canonical；soft-404；假 robots/sitemap | P0/P1：修 SPA 回退与基础 head；排查大量 403 |
| `welink.aicando.xyz` | Proxied CNAME → Pages | 200 | 685 | 无 title/description/H1/canonical；soft-404 | 先定收录目标；公开产品则完整优化，否则 noindex |
| `api.gala.aicando.xyz` | Worker `gala-meme-api` | HTTP 与 HTTPS 根路径均 200 JSON | 0 | 无 HTTPS 强制与 `X-Robots-Tag`；七天请求多数是 404 | 先强制 HTTP→HTTPS；API 全响应加 noindex；检查错误路径来源 |
| `codex-pet.aicando.xyz` | Proxied CNAME → Pages | 200 | 112 | 标题仍为 “WebP Sequence Preview”；无 H1/canonical；soft-404 | 若只是内部预览，整站 noindex；若公开，改品牌和真实 404 |
| `cat.aicando.xyz` | DNS-only CNAME → Vercel | 200 | 不在 CF 代理数据内 | title/H1 有；无 canonical；robots/sitemap 404；未知页真 404 | 补 canonical、OG、robots；单页站 sitemap 可选 |
| `curtain.aicando.xyz` | DNS-only CNAME → Vercel | 200 | 不在 CF 代理数据内 | 与 `cat` 类似 | 补 canonical、OG、robots |
| `gimage.aicando.xyz` | DNS-only CNAME → Vercel | 200 | 不在 CF 代理数据内 | GSC 近 3 个月 294 点击 / 902 曝光；title/H1 有，但无 canonical，robots/sitemap 404 | 搜索价值 P0：已在源码补双语查询匹配、canonical、OG、robots、sitemap、WebApplication JSON-LD |
| `passec.aicando.xyz` | DNS-only CNAME → Manus | 403 | 不在 CF 代理数据内 | 搜索引擎/匿名用户不可达 | 想收录就修访问策略；否则明确 noindex 或下线 DNS |
| `go.aicando.xyz` | Proxied A → `104.224.159.124` | 521 | 0 | 长期坏站 | 修 origin/TLS，或删除 DNS 并把已知旧 URL 301 到相关页面 |

\* Visits 是 Cloudflare 的访问定义，不等于 GA4 session，也可能含自动流量。DNS-only 主机不会进入该 Zone 的代理流量统计；判断趋势时还要结合 GA4/GSC。

Cloudflare DNS 同时提示“有 DNS-only 记录暴露与 Proxied 记录共享的来源 IP”。这不是直接 SEO 问题，但应核对 `cat`、`curtain`、`gimage`、`passec` 等 DNS-only 记录是否确实需要绕过代理。

## 四类处置

### 保留并收录

- `www`、`timeline`、`markdown`。
- 修好后可加入：`gala`、`xyz`、`mark`、`cat`、`curtain`、`gimage`。
- 每个可收录站至少具备：唯一 title/description、一个 H1、self-canonical、真实 404、`robots.txt`、正确 OG；多页面站再提供 sitemap。

### 只做永久跳转

- `aicando.xyz` → `www.aicando.xyz`
- `tl.aicando.xyz` → `timeline.aicando.xyz`
- `md.aicando.xyz` → `markdown.aicando.xyz`（按当前配置）
- `gal.aicando.xyz` → `gala.aicando.xyz`

跳转域不需要自己的 sitemap，也不要在站内导航中使用；旧外链会通过永久跳转传递信号。

### noindex

- `api.gala`、`api.xyz`：响应头统一加 `X-Robots-Tag: noindex, nofollow`。
- `codex-pet`：若定位只是预览/内部工具。
- `welink`：若不准备做公开产品页。

注意：`robots.txt Disallow` 不能替代 noindex；先让爬虫读取到 noindex，才有机会从索引中移除。

### 修复或下线

- `go`：521。
- `passec`：403，除非这是有意的访问控制。
- 不再维护且没有外链价值的子域：先查 GSC/反链，再删除；有历史外链则 301 到最相关页面。

## SPA 子站通用修复模板

`gala`、`xyz`、`mark`、`welink`、`codex-pet` 当前把任意路径都回退成首页并返回 200，连 robots/sitemap 也变成 HTML。修复顺序：

1. 在构建产物中放真正的 `/robots.txt`；多页面才需要 `/sitemap.xml`。
2. 未知路由返回 HTTP 404；如果产品必须使用客户端回退，至少让未知路由渲染 404 文案与 `noindex`，并在边缘返回 404。
3. 首页补 self-canonical、唯一 H1、OG/Twitter；工具类页面可加 `WebApplication` JSON-LD。
4. API 与静态资源不要进入 sitemap。
5. 从 `www.aicando.xyz` 的工具/项目聚合页给真正有用的子站自然内链；不要用全站页脚批量堆关键词链接。

## 每月复查

1. Cloudflare HTTP Traffic 按 Host 看 Requests、Visits、4xx、5xx。
2. GSC Domain property 用 Page filter 输入完整子域，检查 Queries、Pages、Indexing。
3. 可收录子站逐一检查首页、随机不存在路径、robots、sitemap。
4. 记录新增/下线/改规范域日期；至少观察 28 天再判断搜索效果。

## GSC 基线

当前 Google 账号已经存在 `aicando.xyz` Domain property；Cloudflare DNS 中的验证 TXT 仍在。检查时 GSC 尚未提交任何 sitemap。

最近 3 个月：394 点击、11.9K 曝光、CTR 3.3%、平均位置 9.3。热门页面/查询：

- `gimage.aicando.xyz/`：294 点击 / 902 曝光，占整个 Domain property 点击的大头。
- `gemini watermark adder`：147 / 209；`add gemini watermark`：35 / 61；`add gemini logo to image`：31 / 47。
- `www.aicando.xyz/localai/chrome/`：55 / 1,685。
- `www.aicando.xyz/music/suno-ai/reference/styles`：7 / 1,453。
- `timeline.aicando.xyz/en/timelines/codex-reset`：1 / 1,419，且 GSC 提示近期曝光下降 96%，应核对搜索意图、页面更新与索引，而不是只看全站平均值。

GSC Links 是抽样：当前显示 18 条外部链接；主要来源为 `t.me`（7）、`gantrol.com`（4）、`x.com`（4）、`glarity.app`（2）、`addurl.in`（1）。不要因为数字少就买链接；先让已有工具页值得被自然引用。
