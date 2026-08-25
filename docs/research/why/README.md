# Why：人类行动动力研究库

这个目录是“为什么”栏目的离线研究后台，不会被 VitePress 作为网站正文发布。

栏目研究的核心问题是：

> 在特定情境和备选行动下，人为什么选择、开始、继续、停止或拒绝某个行动？

这里不为每个行为强行寻找唯一原因。研究无法区分竞争解释时，结论可以停在“当前未知”“证据欠定”“仅统计解释”或其他明确边界。

## 文件

- [`protocol.md`](./protocol.md)：问题格式、检索流程、证据关系和停止规则。
- [`evaluation-rubric.md`](./evaluation-rubric.md)：观念—观点—分论点—论据层级、强度维度与逆向评估规则。
- [`argument-index.md`](./argument-index.md)：28 组人类动力观念的观点、可检验分论点、关键论据、强度和逆向结论总表。
- [`reverse-audit.md`](./reverse-audit.md)：隐藏理论标签后，从研究结果反推最大可守结论、竞争解释与停止位置。
- [`evidence-map.md`](./evidence-map.md)：人类动力的理论地图和第一批竞争论点。
- [`evaluations/core-action.md`](./evaluations/core-action.md)：核心行动 8 组观念、32 条分论点的正向评估与逐项逆向审计。
- [`evaluations/reward-affect.md`](./evaluations/reward-affect.md)：奖励、学习与情绪 11 组观念的正向评估与逐项逆向审计。
- [`evaluations/social-motivation.md`](./evaluations/social-motivation.md)：社会动力 9 组观念的正向评估与逐项逆向审计。
- [`modules/core-action.md`](./modules/core-action.md)：能力、意向、期望—价值、自我效能、目标、执行、习惯与拖延。
- [`modules/social-motivation.md`](./modules/social-motivation.md)：归属、身份、地位、比较、规范、信任、合作、亲社会与意义。
- [`modules/reward-affect.md`](./modules/reward-affect.md)：内外在动力、奖励学习、wanting/liking、好奇、心流、无聊、恐惧与趋避。
- [`modules/explanation-limits.md`](./modules/explanation-limits.md)：个体因果、不可识别、路径依赖、涌现、预测边界与停止追问规则。
- [`cases/game-vs-study.md`](./cases/game-vs-study.md)：首个具体谜题的竞争解释、区分性预测与研究设计。
- [`claim-relations.csv`](./claim-relations.csv)：可供表格或程序读取的论点—证据关系种子表。
- [`references.bib`](./references.bib)：可离线保存、可导入文献管理器的参考文献元数据。
- `generated/crossref-metadata.json`：从所有 DOI 自动补全的离线 Crossref 元数据。
- `generated/references.generated.bib`：由 DOI 自动生成的完整 BibTeX；手工笔记仍以模块文件为准。
- [`full-text/README.md`](./full-text/README.md)：开放全文的本地保存规范和清单。

## 范围

核心范围：

- 为什么选择 A 而不是 B；
- 为什么开始、拖延或回避；
- 为什么坚持、改变或停止；
- 为什么服从、反抗、合作或竞争；
- 为什么相信、分享、购买、创作或委托。

应用范围：

- 流量：研究人为什么点击、停留、分享、关注和创作；
- 信任：研究人为什么愿意在不确定中接受脆弱性并采取行动；
- AI：优先研究人为什么相信、拒绝、依赖或拟人化 AI。机器目标另作对照，不直接等同于人的需求。

## 编辑原则

1. 具体行为优先于抽象人格判断。
2. 每个“为什么”必须声明比较对象。
3. 原因、主体理由、功能和正当性分别记录。
4. 至少保留两个竞争解释。
5. 只有能区分竞争解释的结果，才标记为“支持”。
6. 问卷相关、自述理由和行为实验不混为一种证据。
7. 复杂不等于无因；不可预测也不等于不可解释。
8. 每篇文章以“仍然不知道什么”收尾。

## 当前状态

- 建库日期：2026-08-23
- 最近检索日期：2026-08-23
- 阶段：第一轮理论地图与种子文献
- 论证评估：28 组观念、113 条可检验分论点；每组均记录研究设计、强度、边界、竞争解释和相反命题
- 已注释：核心行动 36 项、社会动力 52 项、奖励与情绪 42 项、解释边界 26 项；部分来源跨模块重复
- 已解析：153 个不同 DOI，Crossref 元数据解析成功率 153/153
- 论点关系：60 条机器可读的支持、冲突、限定和测量警报
- 状态：持续更新，不声称穷尽全部研究

## 更新自动元数据

在仓库根目录运行：

```powershell
node scripts/collect-why-references.mjs
```

脚本会扫描本目录的 Markdown、CSV 和 BibTeX，提取 DOI，再从 Crossref 生成离线 JSON 与 BibTeX。它不会下载论文正文或保存 Crossref 摘要。

`references.bib` 是带人工关键词的核心种子集；`generated/references.generated.bib` 是自动补全的完整 DOI 集。导入文献管理器时选择其中一份，避免把同一论文导入两次。具体证据关系和适用边界以三个模块文件及 `claim-relations.csv` 为准，不能由 Crossref 元数据自动推断。
