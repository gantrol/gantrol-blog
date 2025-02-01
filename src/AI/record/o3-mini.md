# OpenAI 首次推出免费试用推理模型 o3-mini（翻译）

> 编者注：o3-mini 分为大杯、中杯跟小杯（high、medium、low）。ChatGPT界面o3-mini目前是中杯，免费用户可使用。大杯编程能力超越o1-pro。它们是小模型，专为科学、数学和编程优化。但貌似还是比Deepseek贵

**突破性价比，推理更进一步。**

OpenAI 推出 o3-mini，这是我们推理系列中最新、最具成本效益的模型，现已在 ChatGPT 和 API 中上线。这款模型在 2024 年 12 月已预告过，它强大而快速，突破了小型模型的性能边界，在科学、数学和编程等 STEM 领域展现出卓越能力，同时保持了 OpenAI o1-mini 的低成本和低延迟。

OpenAI o3-mini 是首个支持多项开发者高需求功能的小型推理模型，包括函数调用、结构化输出和开发者消息，开箱即用，满足生产环境需求。与 OpenAI o1-mini 和 o1-preview 一样，o3-mini 也支持流式传输。此外，开发者还可选择低、中、高三种推理强度，针对具体应用场景进行优化。这种灵活性让 o3-mini 在处理复杂难题时可以“更深入思考”，或在关注低延迟时优先考虑速度。o3-mini 不支持视觉功能，视觉推理任务仍应使用 OpenAI o1。o3-mini 今日起在 Chat Completions API、Assistants API 和 Batch API 中向 API 使用级别 3-5 的部分开发者逐步开放。

ChatGPT Plus、Team 和 Pro 用户今日起即可使用 OpenAI o3-mini，企业版用户将在下周获得访问权限。o3-mini 将取代模型选择器中的 OpenAI o1-mini，提供更高的速率限制和更低的延迟，成为编码、STEM 和逻辑解题任务的理想选择。作为升级的一部分，我们将 Plus 和 Team 用户的速率限制提升三倍，从 o1-mini 的每日 50 条消息提升至 o3-mini 的每日 150 条消息。此外，o3-mini 现在支持搜索功能，可以查找最新的答案，并提供相关网络链接。这是我们在推理模型中整合搜索功能的早期原型。

今日起，免费计划用户也可在 ChatGPT 中体验 OpenAI o3-mini，只需在消息编辑器中选择“Reason”或重新生成回复即可。这是推理模型首次向 ChatGPT 免费用户开放。

OpenAI o1 仍然是我们更广泛的通用知识推理模型，而 OpenAI o3-mini 则为需要精准和速度的技术领域提供了一种专门的替代方案。在 ChatGPT 中，o3-mini 使用中等推理强度，在速度和准确性之间取得平衡。所有付费用户还可以在模型选择器中选择 `o3-mini-high`，获得更高智能的版本，但生成回复所需时间稍长。Pro 用户可以无限制地使用 `o3-mini` 和 `o3-mini-high`。

## 快速、强大，专为 STEM 推理优化

与 OpenAI o1 前代产品类似，OpenAI o3-mini 专为 STEM 推理进行了优化。中等推理强度的 o3-mini 在数学、编程和科学方面的性能与 o1 相当，但响应速度更快。专家测试人员的评估表明，与 OpenAI o1-mini 相比，o3-mini 生成的答案更准确、更清晰，推理能力更强。测试人员在 56% 的情况下更喜欢 o3-mini 的回复，并且在困难的实际问题上，主要错误减少了 39%。在中等推理强度下，o3-mini 在一些最具挑战性的推理和智能评估（包括 AIME 和 GPQA）中，性能与 o1 持平。

## 竞赛数学 (AIME 2024)

![比较不同 AI 模型在 AIME 2024 竞赛数学题上的准确率的柱状图。旧模型（灰色）得分较低，而新模型（黄色）有所提高。“o3-mini (high)” 达到最高准确率 83.6%，显示出显著进步。](https://images.ctfassets.net/kftzwdyauwt9/8P5ddf0mQCNmstUbSceyU/6fa42c07f7c5ef6ba4b061d439d96157/Competition_Math.png?w=3840&q=90&fm=webp)

**数学**：在低推理强度下，OpenAI o3-mini 的性能与 OpenAI o1-mini 相当；在中等强度下，o3-mini 的性能与 o1 相当。而在高推理强度下，o3-mini 的性能优于 OpenAI o1-mini 和 OpenAI o1。灰色阴影区域显示了 64 个样本的多数投票（共识）性能。

## 博士级科学问题 (GPQA Diamond)

![比较不同 AI 模型在博士级科学问题 (GPQA Diamond) 上的准确率的柱状图。旧模型（灰色）表现较差，而新模型（黄色）有所提高。“o3-mini (high)” 达到 77.0% 的准确率，显示出比早期版本显著的进步。](https://images.ctfassets.net/kftzwdyauwt9/6RtMqSi8nzD2TawNrhiCXr/57dadbd61208651404c53acbfbb40258/GPQA.png?w=3840&q=90&fm=webp)

**博士级科学**：在博士级生物学、化学和物理学问题上，低推理强度的 OpenAI o3-mini 性能高于 OpenAI o1-mini。在高强度下，o3-mini 的性能与 o1 相当。

## FrontierMath

![一个黑色网格，由多行多列组成，细白线分隔，形成结构化和有组织的布局。](https://images.ctfassets.net/kftzwdyauwt9/2Kqb3fMRY7h7BWguQ98nXh/2d27ec240c65492e1968d731f04da3ef/Frontier_Math.png?w=3840&q=90&fm=webp)

**研究级数学**：高推理强度的 OpenAI o3-mini 在 FrontierMath 上的表现优于其前代产品。在 FrontierMath 上，当提示使用 Python 工具时，高推理强度的 o3-mini 在首次尝试中解决了超过 32% 的问题，包括超过 28% 的高难度 (T3) 问题。

## 竞赛代码 (Codeforces)

![比较不同 AI 模型在 Codeforces 竞赛编程任务上的 Elo 评分的柱状图。旧模型（灰色）得分较低，而新模型（黄色）有所提高。“o3-mini (high)” 达到 2073 Elo，显示出比早期版本显著的进步。](https://images.ctfassets.net/kftzwdyauwt9/3saK5JZ8D4U2hSNiLebOyc/22ef6e1152bc611a4c96d709d9e36f02/Competition_Code.png?w=3840&q=90&fm=webp)

**竞赛编程**：在 Codeforces 竞赛编程中，OpenAI o3-mini 随着推理强度的提高，Elo 评分也逐步提高，均优于 o1-mini。在中等推理强度下，其性能与 o1 持平。

## 软件工程 (SWE-bench Verified)

![比较不同 AI 模型在 SWE-bench Verified 软件工程任务上的准确率的柱状图。旧模型（灰色）表现较差，而 “o3-mini (high)”（黄色）达到最高准确率 48.9%，显示出比早期版本有所提高。](https://images.ctfassets.net/kftzwdyauwt9/3ww3UedB0YdteOeII6yGKI/c98617ea1fabbdc087570d1d8dd0bff9/SWE.png?w=3840&q=90&fm=webp)

**软件工程**：o3-mini 是我们在 SWEbench-verified 上发布的性能最高的模型。有关高推理强度下 SWE-bench Verified 结果的更多数据，包括使用开源 Agentless scaffold (39%) 和内部工具 scaffold (61%) 的结果，请参阅我们的[系统卡](https://openai.com/index/o3-mini-system-card/)。

## LiveBench 编码

![表格比较了 AI 模型在编码任务上的性能指标和评估分数。它突出了准确性和效率方面的差异，一些模型在特定基准测试中优于其他模型。](https://images.ctfassets.net/kftzwdyauwt9/6DeAgFrWPGWvxr900jboFN/5d50bd686f9c6105257720dd87420c1c/Model_Graphic_1.png?w=3840&q=90&fm=webp)

**LiveBench 编码**：OpenAI o3-mini 即使在中等推理强度下也超越了 o1-high，突显了其在编码任务中的效率。在高推理强度下，o3-mini 进一步扩大了领先优势，在关键指标上取得了显著更强的性能。

## 通用知识

![标题为“类别评估”的表格比较了 AI 模型在不同评估类别中的性能指标。它突出了准确性、效率和有效性方面的差异，一些模型在特定任务中优于其他模型。](https://images.ctfassets.net/kftzwdyauwt9/7M9bgnPM6aVPdVGjzyvPyS/0c6be5fa63c83c556d262db3525ab37f/Category_Evals.png?w=3840&q=90&fm=webp)

**通用知识**：o3-mini 在通用知识领域的知识评估中优于 o1-mini。

## 人工偏好评估

![图表比较了 AI 模型在 STEM 和非 STEM 任务中的胜率。“o3_mini_v43_s960_j128”（黄色）在两个类别中均优于 “o1_mini_chatgpt”（红色基线），并且在 STEM 任务中胜率更高。](https://images.ctfassets.net/kftzwdyauwt9/2stEmupk7JqXZN02Md1E7v/49a0d3691dd2b4055dc57207c59c9175/Human_Evals_1.png?w=3840&q=90&fm=webp)

![图表比较了 AI 模型在时间限制下的胜率和主要错误率。“o3_mini_v43_s960_j128”（黄色）在胜率方面优于 “o1_mini_chatgpt”（红色基线），并显著降低了主要错误。](https://images.ctfassets.net/kftzwdyauwt9/6bU2O7RkqWNcBMj12Kfrx0/0c394eb3f06ae08d5fd664431ed3f71d/Human_Evals_2.png?w=3840&q=90&fm=webp)

**人工偏好评估**：外部专家测试人员的评估也表明，OpenAI o3-mini 生成的答案比 OpenAI o1-mini 更准确、更清晰，推理能力更强，尤其是在 STEM 领域。测试人员在 56% 的情况下更喜欢 o3-mini 的回复，并且在困难的实际问题上，主要错误减少了 39%。

## 模型速度与性能

OpenAI o3-mini 拥有与 OpenAI o1 相当的智能水平，同时提供更快的性能和更高的效率。除了上述 STEM 评估外，o3-mini 在中等推理强度下，在其他数学和事实性评估中也表现出更优异的结果。在 A/B 测试中，o3-mini 的响应速度比 o1-mini 快 24%，平均响应时间为 7.7 秒，而 o1-mini 为 10.16 秒。

## o1-mini 与 o3-mini (中等) 延迟对比

![比较 “o1-mini” 和 “o3-mini (中等)” 模型之间延迟的柱状图。“o3-mini”（浅黄色）延迟更低，表明响应时间更快，而 “o1-mini”（深黄色）平均耗时更长。](https://images.ctfassets.net/kftzwdyauwt9/6sHe00x1MDPeWhYtQFHXVp/5d824a2921b25046e851b665e8a0ccc1/Latency_comparison.png?w=3840&q=90&fm=webp)

**延迟**：o3-mini 的首个 token 响应时间比 o1-mini 平均快 2500 毫秒。

## 安全性

我们用于训练 OpenAI o3-mini 安全响应的关键技术之一是[审慎对齐](https://openai.com/index/deliberative-alignment/)，即训练模型在回答用户提示之前，先对人工编写的安全规范进行推理。与 OpenAI o1 类似，我们发现 o3-mini 在具有挑战性的安全和越狱评估中，显著优于 GPT-4o。在部署之前，我们使用与 o1 相同的方法，仔细评估了 o3-mini 的安全风险，包括准备情况、外部红队测试和安全评估。感谢申请参与 o3-mini 早期访问测试的安全测试人员。以下是评估的详细信息，以及对潜在风险和缓解措施有效性的全面解释，请参阅 [o3-mini 系统卡](https://openai.com/index/o3-mini-system-card/)。

### 不允许的内容评估

![表格比较了 AI 模型在安全指标上的表现，评估了不同风险类别中的性能。它突出了安全合规性的差异，一些模型在降低潜在风险方面表现更好。](https://images.ctfassets.net/kftzwdyauwt9/7fNxs8WBlcqaVgF5aBof5X/35a6176ce46bcc2cae4e4e96c4ad112e/Safety_Comparison_1.png?w=3840&q=90&fm=webp)

## 越狱评估

![表格比较了 AI 模型在多个风险类别的安全指标上的表现，显示了性能差异。它突出了风险缓解方面的差异，一些模型在合规性和更安全的响应方面表现出更强的能力。](https://images.ctfassets.net/kftzwdyauwt9/5Wuh830TR8fkkzKvhVlldI/8bd0e35a256b15fce162ad041c27d78b/Safety_Comparison_2.png?w=3840&q=90&fm=webp)

## 未来展望

OpenAI o3-mini 的发布标志着 OpenAI 在推动高性价比智能的道路上又迈出一步。通过优化 STEM 领域的推理能力，同时保持低成本，我们让高质量的 AI 变得更加普及。这款模型延续了我们降低智能成本的记录——自 GPT-4 发布以来，每 token 定价降低了 95%——同时保持了顶级的推理能力。随着 AI 应用的扩展，我们将继续致力于引领前沿，构建在智能、效率和安全性之间取得平衡的模型，并实现规模化应用。
