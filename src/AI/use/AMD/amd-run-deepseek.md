# 在 AMD Ryzen™ AI 和 Radeon™ 上畅享 DeepSeek R1 提炼“推理”模型（翻译，双语）

> 原文：[Experience the DeepSeek R1 Distilled 'Reasoning' Models on AMD Ryzen™ AI and Radeon™](https://community.amd.com/t5/ai/experience-the-deepseek-r1-distilled-reasoning-models-on-amd/ba-p/740593)

> 点评：听说这样配置7900 XTX跑得比4090快。不过7900 XT居然只能跑DeepSeek-R1-Distill-Qwen-14B，而不是32B，12GB显存的英伟达卡都能跑这个。比较尴尬

Reasoning models are a new class of large language models (LLMs) designed to tackle highly complex tasks by employing chain-of-thought (CoT) reasoning with the tradeoff of taking longer to respond. The DeepSeek R1 is a recently released frontier “reasoning” model which has been distilled into highly capable smaller models. Deploying these DeepSeek R1 distilled models on AMD Ryzen™ AI processors and Radeon™ graphics cards is incredibly easy and available now through LM Studio.

推理模型是新型大型语言模型 (LLM)，旨在通过采用思维链 (CoT) 推理来处理极其复杂的任务，但缺点是响应时间较长。DeepSeek R1 是最近发布的先进“推理”模型，已被提炼成性能卓越的小型模型。现在，通过 LM Studio，即可在 AMD Ryzen™ AI 处理器和 Radeon™ 显卡上轻松部署这些 DeepSeek R1 提炼模型。

*Demo showcasing DeepSeek R1 Qwen 1.5 Q4 K M model running on an AMD Ryzen™ HX 370 series processor in real time.

*推理模型演示：DeepSeek R1 Qwen 1.5 Q4 K M 模型在 AMD Ryzen™ HX 370 系列处理器上实时运行。

Reasoning models add a “thinking” stage before the final output – which you can see by expanding the “thinking” window before the model gives its final answer. Unlike conventional LLMs, which one-shot the response, CoT LLMs perform extensive reasoning before answering. The assumptions and self-reflection the LLM performs are visible to the user and this improves the reasoning and analytical capability of the model – albeit at the cost of significantly longer time-to-first-(final output)token.

推理模型在最终输出前增加“思考”环节——展开“思考”窗口即可看到模型给出最终答案前的思考过程。与传统 LLM 一次性给出答案不同，CoT LLM 在回答前会进行深入推理。用户可以看到 LLM 的假设和自我反思过程，这提升了模型的推理和分析能力，但代价是首个（最终输出）token 的生成时间明显延长。

A reasoning model may first spend thousands of tokens (and you can view this chain of thought!) to analyze the problem before giving a final response. This allows the model to be excellent at complex problem-solving tasks involving math and science and attack a complex problem from all angles before deciding on a response. Depending on your AMD hardware, each of these models will offer state-of-the-art reasoning capability on your AMD Ryzen™ AI processor or Radeon™ graphics cards.

推理模型可能会先花费数千 tokens（思维链过程可见！）来分析问题，然后才给出最终答案。这使得模型在解决涉及数学和科学的复杂问题时表现出色，并能从各个角度分析复杂难题，最终给出解答。根据您使用的 AMD 硬件，这些模型都能在 AMD Ryzen™ AI 处理器或 Radeon™ 显卡上提供一流的推理能力。

## **如何在 AMD Ryzen™ AI 和 Radeon™ 显卡上运行 DeepSeek R1 提炼“推理”模型**

> **How to run DeepSeek R1 Distilled “Reasoning” Models on AMD Ryzen™ AI and Radeon™ Graphics Cards**

Follow these simple steps to get up and running with DeepSeek R1 distillations in just a few minutes (dependent upon download speed).

只需几步，您就能在几分钟内开始使用 DeepSeek R1 提炼模型（时间取决于下载速度）。

**Please make sure you are using the** [**optional driver Adrenalin 25.1.1**](https://www.amd.com/en/resources/support-articles/release-notes/RN-RAD-WIN-25-1-1.html)**, which can be downloaded directly by clicking** [**this link**](https://drivers.amd.com/drivers/amd-software-adrenalin-edition-25.1.1-win10-win11-jan2025-rdna.exe)**.**

**请务必使用可选驱动 Adrenalin 25.1.1** ([链接](https://www.amd.com/en/resources/support-articles/release-notes/RN-RAD-WIN-25-1-1.html))，点击[此链接](https://drivers.amd.com/drivers/amd-software-adrenalin-edition-25.1.1-win10-win11-jan2025-rdna.exe)即可直接下载。

**Step 1:** Make sure you are on the 25.1.1 Optional or higher Adrenalin driver.

**步骤 1：** 确保您已安装 Adrenalin 25.1.1 或更高版本的可选驱动。

**Step 2:** Download LM Studio 0.3.8 or above from [lmstudio.ai/ryzenai](https://lmstudio.ai/ryzenai)

**步骤 2：** 从 [lmstudio.ai/ryzenai](https://lmstudio.ai/ryzenai) 下载 LM Studio 0.3.8 或更高版本。

**Step 3:** Install LM Studio and skip the onboarding screen.

**步骤 3：** 安装 LM Studio，并跳过新手引导界面。

**Step 4:** Click on the discover tab.

**步骤 4：** 点击 “Discover”（发现）选项卡。

**Step 5:** Choose your DeepSeek R1 Distill. Smaller distills like the Qwen 1.5B offer blazing fast performance (and are the recommended starting point) while bigger distills will offer superior reasoning capability. All of them are extremely capable. The table below details the maximum recommended DeepSeek R1 Distill size:

**步骤 5：** 选择您的 DeepSeek R1 提炼模型。较小的模型，如 Qwen 1.5B，性能极快（推荐作为入门选择），而较大的模型则提供更强的推理能力。所有模型性能都非常出色。下表详细列出了最大推荐 DeepSeek R1 提炼模型大小：

| **Processor**                                   | **DeepSeek R1 Distill\* (Max Supported)**                    |
| ----------------------------------------------- | ------------------------------------------------------------ |
| AMD Ryzen™ AI Max+ 395 32GB1, 64 GB2 and 128 GB | DeepSeek-R1-Distill-Llama-70B (64GB and 128GB only) DeepSeek-R1-Distill-Qwen-32B |
| AMD Ryzen™ AI HX 370 and 365 24GB and 32 GB     | DeepSeek-R1-Distill-Qwen-14B                                 |
| AMD Ryzen™ 8040 and Ryzen™ 7040 32 GB           | DeepSeek-R1-Distill-Llama-14B                                |

*= AMD recommends running all distills in Q4 K M quantization.

1= Requires Variable Graphics Memory set to Custom: 24GB.

2= Requires Variable Graphics Memory set to High.

| **处理器**                                     | **DeepSeek R1 提炼模型\*（最大支持）**                                                  |
| ------------------------------------------------ |-------------------------------------------------------------------------------|
| AMD Ryzen™ AI Max+ 395 32GB1、64 GB2 和 128 GB | DeepSeek-R1-Distill-Llama-70B（仅限 64GB 和 128GB 版本）DeepSeek-R1-Distill-Qwen-32B |
| AMD Ryzen™ AI HX 370 和 365 24GB 和 32 GB       | DeepSeek-R1-Distill-Qwen-14B                                                  |
| AMD Ryzen™ 8040 和 Ryzen™ 7040 32 GB             | DeepSeek-R1-Distill-Llama-14B                                                 |

*= AMD 建议所有提炼模型均在 Q4 K M 量化下运行。

1= 需要将可变显存设置为“自定义：24GB”。

2= 需要将可变显存设置为“高”。

| **Graphics Card**       | **DeepSeek R1 Distill\* (Max Supported1)** |
| ----------------------- | ------------------------------------------ |
| AMD Radeon™ RX 7900 XTX | DeepSeek-R1-Distill-Qwen-32B               |
| AMD Radeon™ RX 7900 XT  | DeepSeek-R1-Distill-Qwen-14B               |
| AMD Radeon™ RX 7900 GRE | DeepSeek-R1-Distill-Qwen-14B               |
| AMD Radeon™ RX 7800 XT  | DeepSeek-R1-Distill-Qwen-14B               |
| AMD Radeon™ RX 7700 XT  | DeepSeek-R1-Distill-Qwen-14B               |
| AMD Radeon™ RX 7600 XT  | DeepSeek-R1-Distill-Qwen-14B               |
| AMD Radeon™ RX 7600     | DeepSeek-R1-Distill-Llama-8B               |

*= AMD recommends running all distills in Q4 K M quantization.

1= Lists the maximum supported distill without partial GPU offload.

| **显卡**                 | **DeepSeek R1 提炼模型\*（最大支持$^1$）** |
| ------------------------- |----------------------------------|
| AMD Radeon™ RX 7900 XTX   | DeepSeek-R1-Distill-Qwen-32B     |
| AMD Radeon™ RX 7900 XT    | DeepSeek-R1-Distill-Qwen-14B     |
| AMD Radeon™ RX 7900 GRE   | DeepSeek-R1-Distill-Qwen-14B     |
| AMD Radeon™ RX 7800 XT    | DeepSeek-R1-Distill-Qwen-14B     |
| AMD Radeon™ RX 7700 XT    | DeepSeek-R1-Distill-Qwen-14B     |
| AMD Radeon™ RX 7600 XT    | DeepSeek-R1-Distill-Qwen-14B     |
| AMD Radeon™ RX 7600       | DeepSeek-R1-Distill-Llama-8B     |

*= AMD 建议所有提炼模型均在 Q4 K M 量化下运行。

1= 列出了在不进行部分 GPU 卸载情况下的最大支持模型。

**Step 6:** On the right-hand side, make sure the “Q4 K M” quantization is selected and click “Download”.

**步骤 6：** 在右侧，确保选中 “Q4 K M” 量化，然后点击 “Download”（下载）。

**Step 7:** Once downloaded, head back to the chat tab and select the DeepSeek R1 distill from the drop-down menu and make sure “manually select parameters” is checked.

**步骤 7：** 下载完成后，返回 “Chat”（聊天）选项卡，从下拉菜单中选择 DeepSeek R1 提炼模型，并确保勾选 “manually select parameters”（手动选择参数）。

**Step 8**: In the GPU offload layers – move the slider all the way to the max.

**步骤 8：** 在 “GPU offload layers”（GPU 卸载层数）中，将滑块拉到最大值。

**Step 9:** Click model load.

**步骤 9：** 点击 “Model Load”（加载模型）。

**Step 10:** Interact with a reasoning model running completely on your local AMD hardware!

**步骤 10：** 尽情体验完全在本地 AMD 硬件上运行的推理模型吧！

## 脚注

**GD-97** - Links to third party sites are provided for convenience and unless explicitly stated, AMD is not responsible for the contents of such linked sites and no endorsement is implied.

**GD-97** - 提供第三方网站链接仅为方便用户，除非另有明确说明，AMD 对此类链接网站的内容概不负责，且不代表任何背书。

**GD-220e** -  Ryzen™ AI is defined as the combination of a dedicated AI engine, AMD Radeon™ graphics engine, and Ryzen processor cores that enable AI capabilities. OEM and ISV enablement is required, and certain AI features may not yet be optimized for Ryzen AI processors. Ryzen AI is compatible with: (a) AMD Ryzen 7040 and 8040 Series processors and Ryzen PRO 7040/8040 Series processors except Ryzen 5 7540U, Ryzen 5 8540U, Ryzen 3 7440U, and Ryzen 3 8440U processors; (b) AMD Ryzen AI 300 Series processors and AMD Ryzen AI PRO 300 Series processors; (c) all AMD Ryzen 8000G Series desktop processors except the Ryzen 5 8500G/GE and Ryzen 3 8300G/GE; (d) AMD Ryzen 200 Series processors and Ryzen PRO 200 Series processors except Ryzen 5 220 and Ryzen 3 210; and (e) AMD Ryzen AI Max Series processors and Ryzen AI PRO Max Series processors. Please check with your system manufacturer for feature availability prior to purchase.

**GD-220e** - Ryzen™ AI 的定义是专用 AI 引擎、AMD Radeon™ 显卡引擎和 Ryzen 处理器核心的结合，从而实现 AI 功能。 需要 OEM 和 ISV 的支持，并且某些 AI 功能可能尚未针对 Ryzen AI 处理器进行优化。 Ryzen AI 兼容：(a) AMD Ryzen 7040 和 8040 系列处理器及 Ryzen PRO 7040/8040 系列处理器（Ryzen 5 7540U、Ryzen 5 8540U、Ryzen 3 7440U 和 Ryzen 3 8440U 处理器除外）；(b) AMD Ryzen AI 300 系列处理器和 AMD Ryzen AI PRO 300 系列处理器；(c) 所有 AMD Ryzen 8000G 系列台式机处理器（Ryzen 5 8500G/GE 和 Ryzen 3 8300G/GE 除外）；(d) AMD Ryzen 200 系列处理器和 Ryzen PRO 200 系列处理器（Ryzen 5 220 和 Ryzen 3 210 除外）；以及 (e) AMD Ryzen AI Max 系列处理器和 Ryzen AI PRO Max 系列处理器。 购买前请咨询您的系统制造商以了解功能可用性。
