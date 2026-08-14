# SEO 数据接入与日常操作手册（新手版）

适用范围：`gantrol.com`、其子站、`aicando.xyz` 及其子站。  
最后核对：2026-08-12（America/Los_Angeles）。后台菜单可能随产品更新略有变化。

## 0. 这次的基线

| 站点 | 当前规范地址 | robots / sitemap | 实测摘要 |
| --- | --- | --- | --- |
| 主博客 | `https://www.gantrol.com/` | sitemap 可访问，但线上旧版本仍列 `https://gantrol.com/`；robots 仅显示 Cloudflare Content Signals Policy | 移动 Lighthouse SEO 100；实验室 LCP 0.54 秒、CLS 0 |
| 标点工具 | `https://p.gantrol.com/` | 两者均为 200；旧 sitemap 错把主站也列入 | 旧版关闭 SSR，HTML 源码没有标题与正文；本次源码已修复 |
| AI 能做 | `https://www.aicando.xyz/` | sitemap 可访问；robots 仅显示 Cloudflare Content Signals Policy | 移动 Lighthouse SEO 92；LCP 2.70 秒、CLS 0，主要瓶颈是约 2.35 秒 TTFB |
| AI 时间线 | `https://timeline.aicando.xyz/` | robots 与 sitemap 正常，包含中英 hreflang | 当前技术 SEO 基础完整 |
| MarkdownCanDo | `https://markdown.aicando.xyz/` | robots 与 sitemap 正常，包含中英葡 hreflang | 当前技术 SEO 基础完整；这是正式 Worker 与 canonical 域 |
| Markdown 短域 | `https://md.aicando.xyz/` | 301 到 `markdown.aicando.xyz` | 当前是别名/旧域跳转，不应作为 canonical 或站内链接目标 |
| 更早的外部域名 | `markdowncando.com` | TLS 握手失败，且不在当前 Cloudflare 账号的两个 Zone 中 | 若仍持有，应在其 DNS/托管账号恢复证书，并永久跳到当前 canonical 域 |

“已改源码”不等于“线上已生效”。部署后重新运行本文末尾的验收清单。

`aicando.xyz` 的完整子域、Cloudflare 流量与分级处置记录见 [aicando-subdomain-audit.md](./aicando-subdomain-audit.md)。

## 1. 每个工具分别回答什么

| 工具 | 最适合回答 | 不适合回答 |
| --- | --- | --- |
| Google Search Console（GSC） | Google 展示了哪些页面、哪些搜索词带来曝光/点击、是否收录、Google 发现了哪些链接 | 用户进入网站后做了什么 |
| Google Analytics 4（GA4） | 用户来源、落地页、站内行为、关键事件 | 完整 Google 搜索词、索引状态 |
| Cloudflare Web Analytics | Visits、Page views、Host、Path、来源站、设备、国家和真实用户性能 | Google 搜索词；不能替代 GSC |
| Google Trends | 主题升温/降温、地区和季节变化 | 精确月搜索量 |
| Keyword Planner | 关键词建议、需求量级与广告预测 | SEO 排名或流量保证 |
| 第三方反链库 | 补充链接、历史与竞品数据 | Google 官方或完整链接清单 |

三套流量数字不必相等：GSC 计搜索结果中的曝光/点击，GA4 依赖页面标签，Cloudflare 又使用自己的 Visit/Page view 定义。比较趋势，不追求数字完全对齐。

## 2. 推荐账号结构

| 范围 | Search Console | GA4 | Cloudflare Web Analytics |
| --- | --- | --- | --- |
| `gantrol.com` 与全部子域 | 一个 `gantrol.com` Domain property | 同一用户旅程可共用一个 property / web stream | 根域启用后按 Host 过滤 |
| `aicando.xyz` 与全部子域 | 一个 `aicando.xyz` Domain property | 默认建独立 property / web stream | 根域启用后按 Host 过滤 |
| 需要独立视图的子站 | 额外建 URL-prefix property，不替代 Domain property | 只有业务、权限、转化完全独立时再拆 | 可按 Host 看，或另建 Web Analytics site |

建议让 `aicando.xyz` 保持独立 GA4 property。GA4 与 GSC 存在一对一关联限制：一个 Web stream 只能关联一个 GSC property，一个 GSC property 也只能关联一个 Web stream。

当前源码中的 GA4 Measurement ID（排错用）：

```text
www.gantrol.com: G-0P7S4MY6FW
p.gantrol.com:   G-DXSBE2CVK5
www.aicando.xyz: G-H8PVKW9G32
```

同一页面只能加载一次相同 Google tag。主站旧版曾因共享配置和中文配置重复加载；本次源码已去重。

## 3. Search Console 现状与 Cloudflare DNS 验证

当前 Google 账号已经能打开 `gantrol.com` 与 `aicando.xyz` 两个 Domain property，Cloudflare DNS 也保留了对应的 `google-site-verification` TXT。因此不要重复添加属性或删除 TXT。下面的步骤用于换账号、增加备用 Owner，或以后接入新域名。

分别对 `gantrol.com`、`aicando.xyz` 操作一次：

1. 打开 [Google Search Console](https://search.google.com/search-console)。
2. 属性选择器 → 添加资源 → 选择 **Domain / 网域**。
3. 只填 `gantrol.com`，不要加 `https://`、`www` 或路径。
4. 复制 TXT 内容，例如：

   ```text
   google-site-verification=xxxxxxxx
   ```

5. Cloudflare → 对应域名 → DNS → Records → Add record。
6. 新增记录（不要覆盖 SPF 或其他 TXT）：

   ```text
   Type: TXT
   Name: @
   Content: google-site-verification=xxxxxxxx
   TTL: Auto
   ```

7. 回 GSC 点击验证。失败时先等待 DNS 生效并核对内容，不要连续生成多个 token。
8. 验证成功后永久保留该 TXT，并添加一个备用 Owner。
9. 对 `aicando.xyz` 重复。

Domain property 自动包含所有协议、路径、`www` 与子域；只有想单独看某个子站时才额外建 URL-prefix property。

官方说明：[GSC 属性类型](https://support.google.com/webmasters/answer/34592)、[DNS 所有权验证](https://support.google.com/webmasters/answer/9008080)、[Cloudflare 新增 DNS 记录](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/)。

## 4. 提交 sitemap

本次检查时，两个 Domain property 的 **Submitted sitemaps 都是 0**。先部署规范域修复，再提交；不要把仍列出 apex/跳转 URL 的旧 sitemap 提前送给 Google。

部署后应提交：

```text
https://www.gantrol.com/sitemap.xml
https://p.gantrol.com/sitemap.xml
https://www.aicando.xyz/sitemap.xml
https://timeline.aicando.xyz/sitemap.xml
https://markdown.aicando.xyz/sitemap.xml
```

操作：GSC → 选对应 Domain property → Sitemaps → 输入完整 URL → Submit。

提交前检查：

- 匿名访问返回 HTTP 200；
- URL 使用最终规范 Host，不再发生重定向；
- 只列希望收录的 200 页面；
- 不列 404、重定向、`noindex`、草稿或重复 URL；
- 页面 self-canonical 与 sitemap URL 完全一致；
- 多语言 hreflang 必须双向对应。

sitemap 成功只代表 Google 能读取，不保证全部抓取、收录或排名。Google 建议在根目录提供 sitemap，并使用完整绝对 URL：[官方 sitemap 指南](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)。

## 5. Cloudflare 的 robots.txt 注意事项

本次线上检查发现 `www.gantrol.com/robots.txt` 与 `www.aicando.xyz/robots.txt` 只返回 Cloudflare 的 Content Signals Policy 注释，没有 origin 的 `User-agent` 和 `Sitemap`。Cloudflare 官方说明：Free plan 在找不到 origin `robots.txt` 时会显示该政策；如果 origin 返回 200，托管规则会与原文件合并。

因此：

1. 先部署仓库中的 `robots.txt`。
2. 清 Cloudflare 对 `/robots.txt` 的缓存或等待缓存过期。
3. 用以下命令复查最终响应：

   ```powershell
   curl.exe -sS -L https://www.gantrol.com/robots.txt
   curl.exe -sS -L https://www.aicando.xyz/robots.txt
   ```

4. 至少应看到 `User-agent: *`、`Allow: /` 和正确的 `Sitemap:`。
5. 若仍被替换：Cloudflare → Security → Bots / Security Settings → 检查 managed robots 与 Content Signals。不要误设 `search=no`。

Cloudflare 文档：[managed robots.txt 与现有文件的兼容方式](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/)。

## 6. 部署并关联 GA4

推荐命名：

```text
Account: Gantrol
Property: gantrol.com – Prod
Web stream: gantrol.com ecosystem

Property: aicando.xyz – Prod
Web stream: aicando.xyz
```

1. [Google Analytics](https://analytics.google.com/) → Admin → Create property。
2. Data streams → Web → 输入最终规范 URL。
3. 开启 Enhanced measurement，复制 `G-` ID。
4. 通过框架配置或 Google Tag Manager 安装；不要同时用两套方式重复加载。
5. 自己浏览几个页面，在 Reports → Realtime 验证。普通报告可能需要 24–48 小时。
6. 初期只定义 1–3 个真实关键事件，如联系、注册、主要下载；不要把普通 `page_view` 当业务成功。

只有当用户确实会跨 `gantrol.com` 与 `aicando.xyz` 完成同一转化时，才让两域使用同一个 G-ID，并在 Data streams → Configure tag settings → Configure your domains 配置跨域衡量。

然后关联 GSC：GA4 → Admin → Product links → Search Console Links。关联后如看不到 Search Console 报告，到 Reports → Library 发布 Search Console collection。

官方说明：[设置 GA4](https://support.google.com/analytics/answer/14183469)、[确认数据收集](https://support.google.com/analytics/answer/10201247)、[GA4 与 GSC 关联](https://support.google.com/analytics/answer/10737381)、[跨域衡量](https://support.google.com/analytics/answer/10071811)。

## 7. 启用 Cloudflare Web Analytics

橙云代理站点：Cloudflare → Analytics & Logs → Web Analytics → Add a site → 选择 Hostname → Done。Automatic setup 默认自动注入 Beacon。

Cloudflare Pages：Workers & Pages → 项目 → Metrics → Enable Web Analytics，下一次部署自动生效。

灰云或非 Cloudflare 站点：在 Manage site 复制 JS snippet，手工放在 `</body>` 前。

无数据时依次检查：

- 页面是否出现两个 Beacon；
- 是否设置 `Cache-Control: public, no-transform`（会阻止自动注入）；
- CSP 是否允许 `static.cloudflareinsights.com`；
- 广告拦截器是否挡住 Beacon；
- Host 是否确实走 Cloudflare 代理。

Cloudflare Web Analytics 看 Visits、Page views、Host、Path、Referer、Country、Device、LCP、INP、CLS。它不提供 Google 查询词，查询词仍看 GSC。官方说明：[启用方法](https://developers.cloudflare.com/web-analytics/get-started/)、[常见问题与数据边界](https://developers.cloudflare.com/web-analytics/faq/)。

## 8. 五分钟快速看数据

| 想知道什么 | 去哪里 |
| --- | --- |
| Google 搜索整体涨跌 | GSC → Performance → 最近 28 天对比前 28 天 |
| 用户搜了什么 | GSC → Queries |
| 哪些页面拿到搜索流量 | GSC → Pages |
| 某子站表现 | GSC Page filter 按完整 Host；或打开该子站 URL-prefix property |
| 页面是否收录 | GSC → Page indexing；单页用 URL Inspection |
| 搜索用户到站后做了什么 | GA4 → Traffic acquisition，筛 `Organic Search`；再看 Landing page 与 Key events |
| 哪些网站带来访问 | Cloudflare Referer；GA4 Session source / medium |
| 真实加载体验 | Cloudflare Core Web Vitals |
| Google 发现了谁在链接本站 | GSC → Links |
| 外部主题是否升温 | Google Trends |

低流量站优先看 28 天或 90 天，不要用一天或七天的小波动判断 SEO 成败。

### 2026-08-12 的真实练习基线

GSC 默认最近 3 个月：

| 属性 | Clicks | Impressions | CTR | Position |
| --- | ---: | ---: | ---: | ---: |
| `aicando.xyz` | 394 | 11.9K | 3.3% | 9.3 |
| `gantrol.com` | 134 | 8.3K | 1.6% | 11.4 |

两个可直接练手的例子：

- `https://gimage.aicando.xyz/`：294 点击 / 902 曝光；主词是 `gemini watermark adder`（147 / 209）、`add gemini watermark`（35 / 61）、`add gemini logo to image`（31 / 47）。这个页面已经有需求，不应先追新词；优先补 canonical、英文匹配标题、robots、sitemap 与结构化数据，并观察 28 天。
- `https://www.gantrol.com/AI/use/code/claude-code-kimi-k2`：9 点击 / 4,175 曝光。属于高曝光、低 CTR，优先把标题与摘要明确写成“Claude Code 配置 Kimi K2 / 国内使用教程”，再观察点击率，而不是重写整篇文章。

真实数据说明：“热词”不等于全网最热门的词，而是**与你已有页面、搜索意图和排名机会最接近的查询**。

### GSC 机会判断

- 曝光高、排名前十、CTR 低：优先改标题和摘要表达，确认是否匹配搜索意图。
- 稳定曝光、平均位置约 6–20：补内容、示例、FAQ 与相关内部链接。
- 曝光在增长、点击尚少：值得继续培养。
- 点击与曝光同时下降：查排名、季节性、索引、改版与竞争变化。
- 点击降但曝光稳定：重点查 CTR 和搜索结果标题。
- 同一查询落到错误页面：检查内容重叠、canonical 与内部链接。

Average position 只作诊断，不把全站平均排名当唯一 KPI。

## 9. 热词与关键词

优先级：本站 GSC 数据 > Google Trends > Keyword Planner > 第三方估算。

### GSC：本站已经有机会的词

Performance → 28 天对比前 28 天 → Queries，分别按 Impressions、Clicks、CTR、Position 排序。记录：

```text
关键词 | 来源 | 搜索意图 | 对应页面 | 曝光 | 点击 | CTR | 排名 | 趋势 | 下一步 | 复查日
```

### Google Trends：看趋势，不看精确量

在 [Google Trends Explore](https://trends.google.com/trends/explore) 选择国家、时间、类别、搜索类型，比较“搜索词”与“主题”，查看 Related queries 的 Top 与 Rising。0–100 是归一化相对热度，不是月搜索次数。

### Keyword Planner：看需求量级

Google Ads → Tools → Keyword Planner：

- Discover new keywords：输入主题或网站；
- Get search volume and forecasts：上传已有关键词。

它给的是规划估算，不是 SEO 流量承诺。练习阶段不要为了看数据误开广告活动。

## 10. 反链怎么查

免费基线：GSC → Links，重点看 Top linking sites、Top linked pages、Top linking text 和 Internal links。每月导出 Latest links 与 More sample links。

注意：

- GSC Links 是抽样，不是完整列表；
- 可能包含已删除的历史链接；
- 不显示每条链接是否 `nofollow`；
- 根域报告通常聚合子域。

不要因为少量垃圾域就使用 Disavow。Google 明确说明多数网站不需要它；误用会伤害站点。官方说明：[Links 报告](https://support.google.com/webmasters/answer/9049606)、[Disavow 的使用条件](https://support.google.com/webmasters/answer/2648487)。

可选补充：对自有且已验证站点使用 [Ahrefs Webmaster Tools](https://ahrefs.com/webmaster-tools) 免费版。需要竞品全量历史、批量导出时再考虑付费。第三方爬虫库与 GSC 数字不会一致。

获取链接靠真正有用的工具、研究、案例和文档。不要买传递权重的链接、批量交换或自动发垃圾目录。主站与子站可以在确实帮助用户时自然互链，不要在全站页脚堆关键词锚文本。

## 11. 例行清单

### 每周 20–30 分钟

- [ ] GSC Overview：安全问题、人工处置、异常消息。
- [ ] Performance：最近 28 天对比前 28 天。
- [ ] 分别筛主站、重要子域、`aicando.xyz`。
- [ ] 记录增长最快和下降最多的 Query / Page。
- [ ] 只选择 1–2 个明确机会执行。
- [ ] GA4 Organic Search：Sessions、Landing pages、Key events。
- [ ] Cloudflare：Host、Path、Referer、设备、Core Web Vitals。
- [ ] 写 SEO 变更日志与复查日期。

### 每月 60–90 分钟

- [ ] 检查所有 sitemap 是否 Success。
- [ ] 查看 Page indexing，重点确认核心页，不追求所有 URL 100% 收录。
- [ ] 异常核心页跑 URL Inspection。
- [ ] 导出 GSC Queries、Pages、Links 快照。
- [ ] 检查最佳、增长最快、持续下降内容。
- [ ] 用 Trends / Keyword Planner 选下月主题。
- [ ] 测试 GA4 Realtime 与关键事件，防止改版后标签失效。
- [ ] 检查 Cloudflare LCP、INP、CLS 差页面。
- [ ] 写下下月最多三个 SEO 动作和预期指标。

推荐月报列：

```text
月份 | 站点/Host | GSC Clicks | Impressions | CTR | Position
GA Organic sessions | Organic key events | Cloudflare Visits
核心页面收录状态 | 新增高质量引用域 | 发布/更新内容 | 变更 | 结果 | 下月动作
```

## 12. 变更日志模板

```markdown
## YYYY-MM-DD

- 站点/页面：
- 发现问题：
- 数据证据：
- 假设：
- 本次只改了什么：
- 观察指标：
- 基准周期：
- 复查日期：
- 结果：
- 保留 / 回滚 / 继续测试：
```

SEO 会受季节、竞争、算法和索引延迟影响。没有变更日志，就很难判断“改动有效”还是“碰巧波动”。

## 13. 部署后的验收命令

主站源码提供自动检查：

```powershell
pnpm seo:audit
```

线上快速验收：

```powershell
$urls = @(
  'https://www.gantrol.com/',
  'https://p.gantrol.com/',
  'https://www.aicando.xyz/',
  'https://timeline.aicando.xyz/',
  'https://markdown.aicando.xyz/'
)

foreach ($url in $urls) {
  curl.exe -sS -L -o NUL -w 'url=%{url_effective} code=%{http_code} time=%{time_total}`n' $url
}
```

逐站确认：

- [ ] 非规范 Host 一次 301/308 到规范 Host；
- [ ] `<title>`、description、self-canonical 唯一；
- [ ] `og:url` 等于 canonical；
- [ ] 404 返回 404 且 `noindex`；
- [ ] robots 可见 sitemap；
- [ ] sitemap 只列规范域 200 页面；
- [ ] GA4 Realtime 有且只有一次 page view；
- [ ] GSC sitemap 成功；
- [ ] Rich Results Test / Schema validator 无关键错误；
- [ ] 移动 Lighthouse SEO 与可访问性无新增退步。

Google 对 canonical 的核心要求是信号一致、页面自引用、内部链接使用规范 URL：[官方 canonical 指南](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)。多语言页面必须互相列出且使用完整 URL：[官方 hreflang 指南](https://developers.google.com/search/docs/specialty/international/localized-versions)。
