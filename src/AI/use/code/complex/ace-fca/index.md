# [翻译]在复杂代码库，让AI有用

> 原文：[Getting AI to Work in Complex Codebases](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/tree/main)

大家似乎都认同，AI编程工具搞不定真实、复杂的生产代码库。[斯坦福大学一项关于AI对开发者生产力影响的研究](https://www.youtube.com/watch?v=tbDDYKRFjhk)发现：

1.  AI工具生成的“额外代码”中，很多只是在重构上周刚写的烂代码。
2.  编程AI对新项目或小改动很在行，但在大型、成熟的代码库里，它们反而可能让开发者效率更低。

对此，大家普遍的反应介于悲观的“这玩意儿永远没戏”和更中立的“也许未来某天，等模型更聪明了再说吧”之间。

经过几个月的折腾，我发现，**只要遵循上下文工程的核心原则，用今天的模型已经能走得很远。**

我不是来吹嘘什么“10x生产力（十倍提升）”的。面对AI的炒作热潮，[我一向比较审慎](https://hlyr.dev/12fa)。但我们偶然发现了一些工作流，让我对AI编程的前景相当乐观。我们已经能让claude code处理30万行的Rust代码库，一天干完一周的活，并且代码质量能通过专家评审。我们用的是一套我称之为“高频刻意上下文压缩”技术——在整个开发过程中，刻意地组织喂给AI的上下文。

我现在完全相信，AI编程不只能用来做玩具和原型，而是一门技术含量很高的工程手艺。

### 立足上下文：AI工程师大会

AI Engineer 2025大会上的两场演讲，从根本上塑造了我的思考方式。

第一场是[Sean Grove关于“技术规格即新代码”的演讲](https://www.youtube.com/watch?v=8rABwKRsec4)，第二场是[斯坦福大学关于AI对开发者生产力影响的研究](https://www.youtube.com/watch?v=tbDDYKRFjhk)。

Sean认为，我们都用错了随“机”编程（vibe coding）——和AI聊上两小时，把需求说清楚，然后扔掉所有提示词，只提交最终代码……就像一个Java开发者，把编译好的JAR包提交了，却扔掉了源代码。

Sean提出，在AI的未来，技术规格（spec）将成为真正的代码。两年后，你在IDE里打开python文件的频率，大概就和今天你用十六进制编辑器看汇编代码的频率差不多（对我们大多数人来说，基本是零）。

[Yegor关于开发者生产力的演讲](https://www.youtube.com/watch?v=tbDDYKRFjhk)则换了一个角度探讨问题。他们分析了10万名开发者的提交记录，发现了一些现象，比如：

1.  AI工具常常导致大量返工，抵消了表面上的生产力提升。
<img width="2008" height="1088" alt="AI工具常常导致大量返工数据图" src="https://github.com/user-attachments/assets/f7cec497-3ee2-47d1-8f91-a18210625e19" />
2.  AI工具在新项目中表现不错，但对于已有的旧代码库和复杂任务，往往适得其反。
<img width="1326" height="751" alt="AI工具新旧项目对比" src="https://github.com/user-attachments/assets/06f03232-f9d9-4a92-a182-37056bf877a4" />

这和我跟一些创始人的交流感受不谋而合：

*   “烂代码太多。”
*   “技术债工厂。”
*   “搞不定大仓库。”
*   “搞不定复杂系统。”

大家对AI搞定硬骨头任务的普遍看法是：

> 也许未来某天，等模型更聪明了再说吧……

就连[Amjad](https://x.com/amasad)在[9个月前的Lenny's播客](https://www.lennysnewsletter.com/p/behind-the-product-replit-amjad-masad)上也说，产品经理用Replit Agent做原型，然后交给工程师去实现生产版本。
（免责声明：我最近没和他聊过~~【好吧，从来没聊过】~~，这个立场可能已经变了。）

每当听到“也许未来等模型更聪明了”，我就忍不住想大声说：**这正是上下文工程意义所在：把现有模型用到极致。**

### 现在到底能做到什么

后面我会深入聊，但为了证明这不是纸上谈兵，我先举个具体例子。几周前，我决定在[BAML](https://github.com/BoundaryML/baml)上测试我们的技术。BAML是一个用于LLM的编程语言，其Rust代码库有30万行。我最多算个Rust新手，以前从没接触过BAML的代码库。

大约一小时内，我提交了一个[修复bug的PR](https://github.com/BoundaryML/baml/pull/2259#issuecomment-3155883849)，第二天早上就被维护者批准了。几周后，[@hellovai](https://x.com/hellovai)和我结对编程，给BAML提交了3.5万行代码，增加了[取消操作支持](https://github.com/BoundaryML/baml/pull/2357)和[WASM编译](https://github.com/BoundaryML/baml/pull/2330)功能——团队估计，这些功能每个都需要一位资深工程师花上3到5天。我们只用了大概7小时就准备好了两个PR草稿。

再说一遍，这一切都基于一个我们称之为[高频刻意上下文压缩](#better)的工作流——本质上是围绕上下文管理来设计整个开发流程，把上下文占用率控制在40%到60%之间，并在关键节点上，加入高杠杆的人工审查。我们用的是“调研、规划、实现”三步走的工作流，但其核心能力和经验远比任何特定的工作流或提示词普适。

### 我们磕磕绊绊的探索之路

我曾和一位我见过最高效的AI程序员共事。

他每隔几天就甩出**2000行的Go PR**。

这可不是什么Next.js应用或CRUD API，而是复杂的、[容易产生竞态条件的系统代码](https://github.com/humanlayer/humanlayer/blob/main/hld/daemon/daemon_subscription_integration_test.go#L45)，涉及通过Unix套接字进行JSON RPC通信，还要管理从子进程（主要是claude code的SDK进程，后面会说）来的流式标准输入输出。

每隔几天就要仔细看2000行复杂的Go代码，这根本吃不消。我开始有点理解Mitchell Hashimoto了，他给Ghostty项目加了一条规矩：[AI贡献的代码必须声明](https://github.com/ghostty-org/ghostty/pull/8289)。

我们的办法是采纳类似Sean提出的**技术规格驱动的开发模式**。

一开始很不舒服。
我得学着不再逐行阅读PR里的代码。
测试代码我还是会仔细看，但技术规格成了我们判断“做什么”和“为什么做”的唯一来源。

这个转变花了大约八周。
每个人都极其不适应，尤其是我。
但现在我们已经起飞了。几周前，我一天提交了6个PR。
过去三个月，我亲手改的非Markdown文件屈指可数。

## 编程AI的高级上下文工程

我们需要的是：

*   能在旧代码库里高效工作的AI
*   能解决复杂问题的AI
*   没有烂代码
*   团队成员思路保持对齐

（当然了，能花多少token就花多少token。）

我将深入探讨：

1.  我们将上下文工程应用到编程AI中学到了什么
2.  从哪些维度看，使用这些AI是一门高深的技术活
3.  为什么我曾认为这些方法不具备普适性
4.  以及我后来又是如何被反复打脸的

### 先说说：管理AI上下文的笨办法

大多数人刚开始都把编程AI当聊天机器人用。你跟它来回对话（或者[醉醺醺地对它吼](https://ghuntley.com/six-month-recap/#:~:text=Last%20week%2C%20over%20Zoom%20margaritas%2C%20a%20friend%20and%20I%20reminisced%20about%20COBOL.)），全凭感觉解决问题，直到上下文耗尽、你放弃、或者AI开始道歉为止。

<img width="7718" height="4223" alt="image" src="https://github.com/user-attachments/assets/7361a203-9d95-42e2-ac16-1f38b04adb58" />

稍微聪明点的做法是，一旦跑偏了，就干脆扔掉这次会话，重开一个，或许在提示词里多给点引导。

> [原来的提示词]，但要确保用XYZ方法，因为ABC方法行不通。

<img width="7727" height="4077" alt="image" src="https://github.com/user-attachments/assets/1bbbc8ad-60da-4f8b-98c3-e6603b04a0ce" />

### 聪明一点：刻意压缩

你可能已经做过我称之为“刻意压缩”的事了。不管进展顺不顺利，当上下文快满了，你可能会想暂停一下，清空上下文，重新开始。这时，你可能会用这样的提示词：

> “把我们目前为止的进展写到progress.md里，要写清楚最终目标、我们采取的方法、已经完成的步骤，以及当前正在处理的失败。”

<img width="7309" height="4083" alt="image" src="https://github.com/user-attachments/assets/64b940e5-89b1-4f6c-a79c-ec2810d9af77" />

你也可以[用commit信息来做刻意压缩](https://x.com/dexhorthy/status/1961490837017088051)。

### 我们到底在压缩什么？

什么东西会吃掉上下文？

*   搜索文件
*   理解代码流程
*   应用编辑
*   测试/构建日志
*   工具返回的巨大JSON

这些都会塞满上下文窗口。**压缩**，就是把它们提炼成结构化的产物。

一次好的刻意压缩，输出可能长这样：

<img width="1309" height="747" alt="Screenshot 2025-08-29 at 11 10 36 AM" src="https://github.com/user-attachments/assets/a7d5946d-4e81-46e8-b314-d02dae1f00ee" />

### 为什么要死磕上下文？

就像我们在[《Agent 十二要义》](https://hlyr.dev/12fa)里深入探讨过的，LLM是无状态函数。在不训练、不微调模型的前提下，唯一影响输出质量的就是输入质量。

这个道理同样适用于[驾驭](https://www.youtube.com/watch?v=F_RyElT_gJk)编程AI和通用AI设计，只是问题域更小，我们谈论的是使用AI，而非构建AI。

任何时候，Claude Code这类AI的每一步响应，都是一次无状态的函数调用。输入是上下文窗口，输出是下一步行动。

<img width="7309" height="4083" alt="image" src="https://github.com/user-attachments/assets/c1e920e8-5dc5-4dd2-b76d-853b85a92e6a" />

也就是说，上下文内容，是你影响输出质量的唯一手段。所以值得死磕。

你应该从以下几个方面优化上下文窗口：

1.  准确性
2.  完整性
3.  大小
4.  方向

换句话说，你的上下文窗口可能出现的最糟糕情况，按严重程度排序：

1.  信息错误
2.  信息缺失
3.  噪音太多

如果你喜欢公式，这里有个蠢货版可以参考：

$$ 表现 = \frac{准确性^2 \times 完整性}{大小} $$

:::details 英文公式
$$ Performance = \frac{Correctness^2 \times Completeness}{Size} $$
:::

正如[Geoff Huntley](https://x.com/GeoffreyHuntley)所说：

> 游戏的规则是，你大概只有**170k的上下文窗口**可用。
> 所以，尽可能少用是关键。
> 上下文窗口用得越多，结果就越差。

Geoff对这个工程约束的解决方案，他称之为[“Ralph Wiggum当软件工程师”](https://ghuntley.com/ralph/)（ralph）——基本上就是用一个简单提示词，让AI在一个while循环里永远运行下去。

```
while :; do
  cat PROMPT.md | npx --yes @sourcegraph/amp 
done
```

如果你想了解更多关于ralph或者PROMPT.md的内容，可以看看Geoff的文章，或者深入了解[@simonfarshid](https://x.com/simonfarshid)、[@lantos1618](https://x.com/lantos1618)、[@AVGVSTVS96](https://x.com/AVGVSTVS96)和我上周末在YC Agents Hackathon上做的项目，这个项目（基本）能[在一夜之间把BrowserUse移植到TypeScript](https://github.com/repomirrorhq/repomirror/blob/main/repomirror.md)。

Geoff把ralph形容为解决上下文窗口问题的“蠢得可笑”的方案。[我倒不觉得它有多蠢](https://ghuntley.com/content/images/size/w2400/2025/07/The-ralph-Process.png)。

### 回到压缩：使用子Agent

子Agent是管理上下文的另一种方式，通用子Agent很早就成了claude code和许多编程CLI的功能（不是[自定义](https://docs.anthropic.com/en/docs/claude-code/sub-agents)那种）。

子Agent不是玩过家家，[给AI分配角色](https://x.com/dexhorthy/status/1950288431122436597)。子Agent是为了控制上下文。

子Agent最常见、最直接的用法，是让你用一个干净上下文窗口来查找、搜索、总结信息，这样父AI就能直接开干，而不用让`Glob`、`Grep`、`Read`这些命令调用污染上下文。

<video controls width="100%" playsinline>
  <source src="https://github.com/user-attachments/assets/cb4e7864-9556-4eaa-99ca-a105927f484d" type="video/mp4">
  抱歉，您的浏览器不支持内嵌视频。
</video>

<details><summary>（不方便看视频？点开看静态图）</summary>
  <img width="7309" height="4083" alt="image" src="https://github.com/user-attachments/assets/c72e7dba-1476-4ee9-9cb0-0f97d428b82a" />
</details>

理想的子Agent响应，可能跟前面提到的理想的临时压缩结果差不多。

```markdown
## 组件使用流程

### 弹窗路径（正常）

1.  `ToolResultModal.tsx:136` 调用 `getToolIcon(toolCall?.toolName)`
2.  `getToolIcon()` 为Bash返回 `<Terminal />`
3.  图标正常显示为终端符号

### 消息流路径（异常）

1.  `ConversationContent.tsx:103` 调用 `eventToDisplayObject(event)`
2.  第76行，指定了默认图标 `<Wrench />`
3.  第189-228行，没有专门处理Bash的情况
4.  结果显示的是通用的扳手图标

### 相关代码

*   `humanlayer-wui/src/components/internal/SessionDetail/eventToDisplayObject.tsx:76` - 默认扳手图标的指定位置
*   `humanlayer-wui/src/components/internal/SessionDetail/eventToDisplayObject.tsx:189-228` - 针对特定工具的处理（缺了Bash）
*   `humanlayer-wui/src/components/internal/SessionDetail/eventToDisplayObject.tsx:657` - 正确的Bash→终端图标映射
*   `humanlayer-wui/src/components/internal/SessionDetail/components/ToolResultModal.tsx:136` - 弹窗图标的渲染位置
*   `humanlayer-wui/src/components/internal/SessionDetail/ConversationContent.tsx:103` - 消息流的渲染位置
```

让子Agent返回这样的结果可不简单：

<img width="7309" height="4083" alt="image" src="https://github.com/user-attachments/assets/2bcd30f6-84fd-4911-ac15-63f75619e76d" />

### 更优解：高频刻意上下文压缩{#better}

我想谈论的、我们过去几个月采纳的技术，都属于我所说的“高频刻意上下文压缩”。

本质上，这意味着围绕上下文管理来设计整个工作流，并把占用率控制在40%-60%之间（具体取决于问题复杂度）。

我们做法大致分为三步。

我说“大致”，是因为有时我们跳过调研，直接规划；有时我们会先做几轮调研，再动手实现。

下面我会用一个具体例子来展示每一步的输出。对于一个功能或bug，我们通常会：

#### 调研

理解代码库，找到问题相关文件，搞清楚信息流，并推测问题可能成因。

这是我们的[调研提示词](https://github.com/humanlayer/humanlayer/blob/main/.claude/commands/research_codebase.md)。

:::details [调研提示词](https://github.com/humanlayer/humanlayer/blob/main/.claude/commands/research_codebase.md)。
```markdown
# Research Codebase

You are tasked with conducting comprehensive research across the codebase to answer user questions by spawning parallel sub-agents and synthesizing their findings.

## Initial Setup:

When this command is invoked, respond with:
```
I'm ready to research the codebase. Please provide your research question or area of interest, and I'll analyze it thoroughly by exploring relevant components and connections.
```

Then wait for the user's research query.

## Steps to follow after receiving the research query:

1. **Read any directly mentioned files first:**
   - If the user mentions specific files (tickets, docs, JSON), read them FULLY first
   - **IMPORTANT**: Use the Read tool WITHOUT limit/offset parameters to read entire files
   - **CRITICAL**: Read these files yourself in the main context before spawning any sub-tasks
   - This ensures you have full context before decomposing the research

2. **Analyze and decompose the research question:**
   - Break down the user's query into composable research areas
   - Take time to ultrathink about the underlying patterns, connections, and architectural implications the user might be seeking
   - Identify specific components, patterns, or concepts to investigate
   - Create a research plan using TodoWrite to track all subtasks
   - Consider which directories, files, or architectural patterns are relevant

3. **Spawn parallel sub-agent tasks for comprehensive research:**
   - Create multiple Task agents to research different aspects concurrently
   - We now have specialized agents that know how to do specific research tasks:

   **For codebase research:**
   - Use the **codebase-locator** agent to find WHERE files and components live
   - Use the **codebase-analyzer** agent to understand HOW specific code works
   - Use the **codebase-pattern-finder** agent if you need examples of similar implementations

   **For thoughts directory:**
   - Use the **thoughts-locator** agent to discover what documents exist about the topic
   - Use the **thoughts-analyzer** agent to extract key insights from specific documents (only the most relevant ones)

   **For web research (only if user explicitly asks):**
   - Use the **web-search-researcher** agent for external documentation and resources
   - IF you use web-research agents, instruct them to return LINKS with their findings, and please INCLUDE those links in your final report

   **For Linear tickets (if relevant):**
   - Use the **linear-ticket-reader** agent to get full details of a specific ticket
   - Use the **linear-searcher** agent to find related tickets or historical context

   The key is to use these agents intelligently:
   - Start with locator agents to find what exists
   - Then use analyzer agents on the most promising findings
   - Run multiple agents in parallel when they're searching for different things
   - Each agent knows its job - just tell it what you're looking for
   - Don't write detailed prompts about HOW to search - the agents already know

4. **Wait for all sub-agents to complete and synthesize findings:**
   - IMPORTANT: Wait for ALL sub-agent tasks to complete before proceeding
   - Compile all sub-agent results (both codebase and thoughts findings)
   - Prioritize live codebase findings as primary source of truth
   - Use thoughts/ findings as supplementary historical context
   - Connect findings across different components
   - Include specific file paths and line numbers for reference
   - Verify all thoughts/ paths are correct (e.g., thoughts/allison/ not thoughts/shared/ for personal files)
   - Highlight patterns, connections, and architectural decisions
   - Answer the user's specific questions with concrete evidence

5. **Gather metadata for the research document:**
   - Run the `hack/spec_metadata.sh` script to generate all relevant metadata
   - Filename: `thoughts/shared/research/YYYY-MM-DD-ENG-XXXX-description.md`
     - Format: `YYYY-MM-DD-ENG-XXXX-description.md` where:
       - YYYY-MM-DD is today's date
       - ENG-XXXX is the ticket number (omit if no ticket)
       - description is a brief kebab-case description of the research topic
     - Examples:
       - With ticket: `2025-01-08-ENG-1478-parent-child-tracking.md`
       - Without ticket: `2025-01-08-authentication-flow.md`

6. **Generate research document:**
   - Use the metadata gathered in step 4
   - Structure the document with YAML frontmatter followed by content:
     ```markdown
     ---
     date: [Current date and time with timezone in ISO format]
     researcher: [Researcher name from thoughts status]
     git_commit: [Current commit hash]
     branch: [Current branch name]
     repository: [Repository name]
     topic: "[User's Question/Topic]"
     tags: [research, codebase, relevant-component-names]
     status: complete
     last_updated: [Current date in YYYY-MM-DD format]
     last_updated_by: [Researcher name]
     ---

     # Research: [User's Question/Topic]

     **Date**: [Current date and time with timezone from step 4]
     **Researcher**: [Researcher name from thoughts status]
     **Git Commit**: [Current commit hash from step 4]
     **Branch**: [Current branch name from step 4]
     **Repository**: [Repository name]

     ## Research Question
     [Original user query]

     ## Summary
     [High-level findings answering the user's question]

     ## Detailed Findings

     ### [Component/Area 1]
     - Finding with reference ([file.ext:line](link))
     - Connection to other components
     - Implementation details

     ### [Component/Area 2]
     ...

     ## Code References
     - `path/to/file.py:123` - Description of what's there
     - `another/file.ts:45-67` - Description of the code block

     ## Architecture Insights
     [Patterns, conventions, and design decisions discovered]

     ## Historical Context (from thoughts/)
     [Relevant insights from thoughts/ directory with references]
     - `thoughts/shared/something.md` - Historical decision about X
     - `thoughts/local/notes.md` - Past exploration of Y
     Note: Paths exclude "searchable/" even if found there

     ## Related Research
     [Links to other research documents in thoughts/shared/research/]

     ## Open Questions
     [Any areas that need further investigation]
     ```

7. **Add GitHub permalinks (if applicable):**
   - Check if on main branch or if commit is pushed: `git branch --show-current` and `git status`
   - If on main/master or pushed, generate GitHub permalinks:
     - Get repo info: `gh repo view --json owner,name`
     - Create permalinks: `https://github.com/{owner}/{repo}/blob/{commit}/{file}#L{line}`
   - Replace local file references with permalinks in the document

8. **Sync and present findings:**
   - Run `humanlayer thoughts sync` to sync the thoughts directory
   - Present a concise summary of findings to the user
   - Include key file references for easy navigation
   - Ask if they have follow-up questions or need clarification

9. **Handle follow-up questions:**
   - If the user has follow-up questions, append to the same research document
   - Update the frontmatter fields `last_updated` and `last_updated_by` to reflect the update
   - Add `last_updated_note: "Added follow-up research for [brief description]"` to frontmatter
   - Add a new section: `## Follow-up Research [timestamp]`
   - Spawn new sub-agents as needed for additional investigation
   - Continue updating the document and syncing

## Important notes:
- Always use parallel Task agents to maximize efficiency and minimize context usage
- Always run fresh codebase research - never rely solely on existing research documents
- The thoughts/ directory provides historical context to supplement live findings
- Focus on finding concrete file paths and line numbers for developer reference
- Research documents should be self-contained with all necessary context
- Each sub-agent prompt should be specific and focused on read-only operations
- Consider cross-component connections and architectural patterns
- Include temporal context (when the research was conducted)
- Link to GitHub when possible for permanent references
- Keep the main agent focused on synthesis, not deep file reading
- Encourage sub-agents to find examples and usage patterns, not just definitions
- Explore all of thoughts/ directory, not just research subdirectory
- **File reading**: Always read mentioned files FULLY (no limit/offset) before spawning sub-tasks
- **Critical ordering**: Follow the numbered steps exactly
  - ALWAYS read mentioned files first before spawning sub-tasks (step 1)
  - ALWAYS wait for all sub-agents to complete before synthesizing (step 4)
  - ALWAYS gather metadata before writing the document (step 5 before step 6)
  - NEVER write the research document with placeholder values
- **Path handling**: The thoughts/searchable/ directory contains hard links for searching
  - Always document paths by removing ONLY "searchable/" - preserve all other subdirectories
  - Examples of correct transformations:
    - `thoughts/searchable/allison/old_stuff/notes.md` → `thoughts/allison/old_stuff/notes.md`
    - `thoughts/searchable/shared/prs/123.md` → `thoughts/shared/prs/123.md`
    - `thoughts/searchable/global/shared/templates.md` → `thoughts/global/shared/templates.md`
  - NEVER change allison/ to shared/ or vice versa - preserve the exact directory structure
  - This ensures paths are correct for editing and navigation
- **Frontmatter consistency**:
  - Always include frontmatter at the beginning of research documents
  - Keep frontmatter fields consistent across all research documents
  - Update frontmatter when adding follow-up research
  - Use snake_case for multi-word field names (e.g., `last_updated`, `git_commit`)
  - Tags should be relevant to the research topic and components studied
```
:::

它目前用的是自定义子Agent，但在其他仓库里，我用的是一个更通用的版本，通过claude code的Task()工具调用`general-agent`。
通用版本效果也差不多。

#### 规划

列出修复问题的确切步骤，需要编辑哪些文件、如何编辑，并对每个阶段的测试或验证步骤做出极其精确的规定。

:::details [规划提示词](https://github.com/humanlayer/humanlayer/blob/main/.claude/commands/create_plan.md)。
`````markdown
# Implementation Plan

You are tasked with creating detailed implementation plans through an interactive, iterative process. You should be skeptical, thorough, and work collaboratively with the user to produce high-quality technical specifications.

## Initial Response

When this command is invoked:

1. **Check if parameters were provided**:
   - If a file path or ticket reference was provided as a parameter, skip the default message
   - Immediately read any provided files FULLY
   - Begin the research process

2. **If no parameters provided**, respond with:
```
I'll help you create a detailed implementation plan. Let me start by understanding what we're building.

Please provide:
1. The task/ticket description (or reference to a ticket file)
2. Any relevant context, constraints, or specific requirements
3. Links to related research or previous implementations

I'll analyze this information and work with you to create a comprehensive plan.

Tip: You can also invoke this command with a ticket file directly: `/create_plan thoughts/allison/tickets/eng_1234.md`
For deeper analysis, try: `/create_plan think deeply about thoughts/allison/tickets/eng_1234.md`
```

Then wait for the user's input.

## Process Steps

### Step 1: Context Gathering & Initial Analysis

1. **Read all mentioned files immediately and FULLY**:
   - Ticket files (e.g., `thoughts/allison/tickets/eng_1234.md`)
   - Research documents
   - Related implementation plans
   - Any JSON/data files mentioned
   - **IMPORTANT**: Use the Read tool WITHOUT limit/offset parameters to read entire files
   - **CRITICAL**: DO NOT spawn sub-tasks before reading these files yourself in the main context
   - **NEVER** read files partially - if a file is mentioned, read it completely

2. **Spawn initial research tasks to gather context**:
   Before asking the user any questions, use specialized agents to research in parallel:

   - Use the **codebase-locator** agent to find all files related to the ticket/task
   - Use the **codebase-analyzer** agent to understand how the current implementation works
   - If relevant, use the **thoughts-locator** agent to find any existing thoughts documents about this feature
   - If a Linear ticket is mentioned, use the **linear-ticket-reader** agent to get full details

   These agents will:
   - Find relevant source files, configs, and tests
   - Identify the specific directories to focus on (e.g., if WUI is mentioned, they'll focus on humanlayer-wui/)
   - Trace data flow and key functions
   - Return detailed explanations with file:line references

3. **Read all files identified by research tasks**:
   - After research tasks complete, read ALL files they identified as relevant
   - Read them FULLY into the main context
   - This ensures you have complete understanding before proceeding

4. **Analyze and verify understanding**:
   - Cross-reference the ticket requirements with actual code
   - Identify any discrepancies or misunderstandings
   - Note assumptions that need verification
   - Determine true scope based on codebase reality

5. **Present informed understanding and focused questions**:
   ```
   Based on the ticket and my research of the codebase, I understand we need to [accurate summary].

   I've found that:
   - [Current implementation detail with file:line reference]
   - [Relevant pattern or constraint discovered]
   - [Potential complexity or edge case identified]

   Questions that my research couldn't answer:
   - [Specific technical question that requires human judgment]
   - [Business logic clarification]
   - [Design preference that affects implementation]
   ```

   Only ask questions that you genuinely cannot answer through code investigation.

### Step 2: Research & Discovery

After getting initial clarifications:

1. **If the user corrects any misunderstanding**:
   - DO NOT just accept the correction
   - Spawn new research tasks to verify the correct information
   - Read the specific files/directories they mention
   - Only proceed once you've verified the facts yourself

2. **Create a research todo list** using TodoWrite to track exploration tasks

3. **Spawn parallel sub-tasks for comprehensive research**:
   - Create multiple Task agents to research different aspects concurrently
   - Use the right agent for each type of research:

   **For deeper investigation:**
   - **codebase-locator** - To find more specific files (e.g., "find all files that handle [specific component]")
   - **codebase-analyzer** - To understand implementation details (e.g., "analyze how [system] works")
   - **codebase-pattern-finder** - To find similar features we can model after

   **For historical context:**
   - **thoughts-locator** - To find any research, plans, or decisions about this area
   - **thoughts-analyzer** - To extract key insights from the most relevant documents

   **For related tickets:**
   - **linear-searcher** - To find similar issues or past implementations

   Each agent knows how to:
   - Find the right files and code patterns
   - Identify conventions and patterns to follow
   - Look for integration points and dependencies
   - Return specific file:line references
   - Find tests and examples

3. **Wait for ALL sub-tasks to complete** before proceeding

4. **Present findings and design options**:
   ```
   Based on my research, here's what I found:

   **Current State:**
   - [Key discovery about existing code]
   - [Pattern or convention to follow]

   **Design Options:**
   1. [Option A] - [pros/cons]
   2. [Option B] - [pros/cons]

   **Open Questions:**
   - [Technical uncertainty]
   - [Design decision needed]

   Which approach aligns best with your vision?
   ```

### Step 3: Plan Structure Development

Once aligned on approach:

1. **Create initial plan outline**:
   ```
   Here's my proposed plan structure:

   ## Overview
   [1-2 sentence summary]

   ## Implementation Phases:
   1. [Phase name] - [what it accomplishes]
   2. [Phase name] - [what it accomplishes]
   3. [Phase name] - [what it accomplishes]

   Does this phasing make sense? Should I adjust the order or granularity?
   ```

2. **Get feedback on structure** before writing details

### Step 4: Detailed Plan Writing

After structure approval:

1. **Write the plan** to `thoughts/shared/plans/YYYY-MM-DD-ENG-XXXX-description.md`
   - Format: `YYYY-MM-DD-ENG-XXXX-description.md` where:
     - YYYY-MM-DD is today's date
     - ENG-XXXX is the ticket number (omit if no ticket)
     - description is a brief kebab-case description
   - Examples:
     - With ticket: `2025-01-08-ENG-1478-parent-child-tracking.md`
     - Without ticket: `2025-01-08-improve-error-handling.md`
2. **Use this template structure**:

````markdown
# [Feature/Task Name] Implementation Plan

## Overview

[Brief description of what we're implementing and why]

## Current State Analysis

[What exists now, what's missing, key constraints discovered]

## Desired End State

[A Specification of the desired end state after this plan is complete, and how to verify it]

### Key Discoveries:
- [Important finding with file:line reference]
- [Pattern to follow]
- [Constraint to work within]

## What We're NOT Doing

[Explicitly list out-of-scope items to prevent scope creep]

## Implementation Approach

[High-level strategy and reasoning]

## Phase 1: [Descriptive Name]

### Overview
[What this phase accomplishes]

### Changes Required:

#### 1. [Component/File Group]
**File**: `path/to/file.ext`
**Changes**: [Summary of changes]

```[language]
// Specific code to add/modify
```

### Success Criteria:

#### Automated Verification:
- [ ] Migration applies cleanly: `make migrate`
- [ ] Unit tests pass: `make test-component`
- [ ] Type checking passes: `npm run typecheck`
- [ ] Linting passes: `make lint`
- [ ] Integration tests pass: `make test-integration`

#### Manual Verification:
- [ ] Feature works as expected when tested via UI
- [ ] Performance is acceptable under load
- [ ] Edge case handling verified manually
- [ ] No regressions in related features

---

## Phase 2: [Descriptive Name]

[Similar structure with both automated and manual success criteria...]

---

## Testing Strategy

### Unit Tests:
- [What to test]
- [Key edge cases]

### Integration Tests:
- [End-to-end scenarios]

### Manual Testing Steps:
1. [Specific step to verify feature]
2. [Another verification step]
3. [Edge case to test manually]

## Performance Considerations

[Any performance implications or optimizations needed]

## Migration Notes

[If applicable, how to handle existing data/systems]

## References

- Original ticket: `thoughts/allison/tickets/eng_XXXX.md`
- Related research: `thoughts/shared/research/[relevant].md`
- Similar implementation: `[file:line]`
````

### Step 5: Sync and Review

1. **Sync the thoughts directory**:
   - Run `humanlayer thoughts sync` to sync the newly created plan
   - This ensures the plan is properly indexed and available

2. **Present the draft plan location**:
   ```
   I've created the initial implementation plan at:
   `thoughts/shared/plans/YYYY-MM-DD-ENG-XXXX-description.md`

   Please review it and let me know:
   - Are the phases properly scoped?
   - Are the success criteria specific enough?
   - Any technical details that need adjustment?
   - Missing edge cases or considerations?
   ```

3. **Iterate based on feedback** - be ready to:
   - Add missing phases
   - Adjust technical approach
   - Clarify success criteria (both automated and manual)
   - Add/remove scope items
   - After making changes, run `humanlayer thoughts sync` again

4. **Continue refining** until the user is satisfied

## Important Guidelines

1. **Be Skeptical**:
   - Question vague requirements
   - Identify potential issues early
   - Ask "why" and "what about"
   - Don't assume - verify with code

2. **Be Interactive**:
   - Don't write the full plan in one shot
   - Get buy-in at each major step
   - Allow course corrections
   - Work collaboratively

3. **Be Thorough**:
   - Read all context files COMPLETELY before planning
   - Research actual code patterns using parallel sub-tasks
   - Include specific file paths and line numbers
   - Write measurable success criteria with clear automated vs manual distinction
   - automated steps should use `make` whenever possible - for example `make -C humanlayer-wui check` instead of `cd humanlayer-wui && bun run fmt`

4. **Be Practical**:
   - Focus on incremental, testable changes
   - Consider migration and rollback
   - Think about edge cases
   - Include "what we're NOT doing"

5. **Track Progress**:
   - Use TodoWrite to track planning tasks
   - Update todos as you complete research
   - Mark planning tasks complete when done

6. **No Open Questions in Final Plan**:
   - If you encounter open questions during planning, STOP
   - Research or ask for clarification immediately
   - Do NOT write the plan with unresolved questions
   - The implementation plan must be complete and actionable
   - Every decision must be made before finalizing the plan

## Success Criteria Guidelines

**Always separate success criteria into two categories:**

1. **Automated Verification** (can be run by execution agents):
   - Commands that can be run: `make test`, `npm run lint`, etc.
   - Specific files that should exist
   - Code compilation/type checking
   - Automated test suites

2. **Manual Verification** (requires human testing):
   - UI/UX functionality
   - Performance under real conditions
   - Edge cases that are hard to automate
   - User acceptance criteria

**Format example:**
```markdown
### Success Criteria:

#### Automated Verification:
- [ ] Database migration runs successfully: `make migrate`
- [ ] All unit tests pass: `go test ./...`
- [ ] No linting errors: `golangci-lint run`
- [ ] API endpoint returns 200: `curl localhost:8080/api/new-endpoint`

#### Manual Verification:
- [ ] New feature appears correctly in the UI
- [ ] Performance is acceptable with 1000+ items
- [ ] Error messages are user-friendly
- [ ] Feature works correctly on mobile devices
```

## Common Patterns

### For Database Changes:
- Start with schema/migration
- Add store methods
- Update business logic
- Expose via API
- Update clients

### For New Features:
- Research existing patterns first
- Start with data model
- Build backend logic
- Add API endpoints
- Implement UI last

### For Refactoring:
- Document current behavior
- Plan incremental changes
- Maintain backwards compatibility
- Include migration strategy

## Sub-task Spawning Best Practices

When spawning research sub-tasks:

1. **Spawn multiple tasks in parallel** for efficiency
2. **Each task should be focused** on a specific area
3. **Provide detailed instructions** including:
   - Exactly what to search for
   - Which directories to focus on
   - What information to extract
   - Expected output format
4. **Be EXTREMELY specific about directories**:
   - If the ticket mentions "WUI", specify `humanlayer-wui/` directory
   - If it mentions "daemon", specify `hld/` directory
   - Never use generic terms like "UI" when you mean "WUI"
   - Include the full path context in your prompts
5. **Specify read-only tools** to use
6. **Request specific file:line references** in responses
7. **Wait for all tasks to complete** before synthesizing
8. **Verify sub-task results**:
   - If a sub-task returns unexpected results, spawn follow-up tasks
   - Cross-check findings against the actual codebase
   - Don't accept results that seem incorrect

Example of spawning multiple tasks:
```python
# Spawn these tasks concurrently:
tasks = [
    Task("Research database schema", db_research_prompt),
    Task("Find API patterns", api_research_prompt),
    Task("Investigate UI components", ui_research_prompt),
    Task("Check test patterns", test_research_prompt)
]
```

## Example Interaction Flow

```
User: /implementation_plan
Assistant: I'll help you create a detailed implementation plan...

User: We need to add parent-child tracking for Claude sub-tasks. See thoughts/allison/tickets/eng_1478.md
Assistant: Let me read that ticket file completely first...

[Reads file fully]

Based on the ticket, I understand we need to track parent-child relationships for Claude sub-task events in the hld daemon. Before I start planning, I have some questions...

[Interactive process continues...]
```
`````
:::

#### 实现

一步步执行计划。对于复杂的任务，我常常在每个实现阶段验证通过后，把当前状态压缩回原来的计划文件里。

这是我们用的[实现提示词](https://github.com/humanlayer/humanlayer/blob/main/.claude/commands/implement_plan.md)。

:::details
`````markdown
# Implement Plan

You are tasked with implementing an approved technical plan from `thoughts/shared/plans/`. These plans contain phases with specific changes and success criteria.

## Getting Started

When given a plan path:
- Read the plan completely and check for any existing checkmarks (- [x])
- Read the original ticket and all files mentioned in the plan
- **Read files fully** - never use limit/offset parameters, you need complete context
- Think deeply about how the pieces fit together
- Create a todo list to track your progress
- Start implementing if you understand what needs to be done

If no plan path provided, ask for one.

## Implementation Philosophy

Plans are carefully designed, but reality can be messy. Your job is to:
- Follow the plan's intent while adapting to what you find
- Implement each phase fully before moving to the next
- Verify your work makes sense in the broader codebase context
- Update checkboxes in the plan as you complete sections

When things don't match the plan exactly, think about why and communicate clearly. The plan is your guide, but your judgment matters too.

If you encounter a mismatch:
- STOP and think deeply about why the plan can't be followed
- Present the issue clearly:
  ```
  Issue in Phase [N]:
  Expected: [what the plan says]
  Found: [actual situation]
  Why this matters: [explanation]

  How should I proceed?
  ```

## Verification Approach

After implementing a phase:
- Run the success criteria checks (usually `make check test` covers everything)
- Fix any issues before proceeding
- Update your progress in both the plan and your todos
- Check off completed items in the plan file itself using Edit

Don't let verification interrupt your flow - batch it at natural stopping points.

## If You Get Stuck

When something isn't working as expected:
- First, make sure you've read and understood all the relevant code
- Consider if the codebase has evolved since the plan was written
- Present the mismatch clearly and ask for guidance

Use sub-tasks sparingly - mainly for targeted debugging or exploring unfamiliar territory.

## Resuming Work

If the plan has existing checkmarks:
- Trust that completed work is done
- Pick up from the first unchecked item
- Verify previous work only if something seems off

Remember: You're implementing a solution, not just checking boxes. Keep the end goal in mind and maintain forward momentum.
`````
:::

顺便一提——如果你最近总听到Git worktree，那么只有这一步才需要在worktree里做。我们通常在主分支上做其他所有事。

#### 我们如何管理/共享Markdown文件

这部分为了简洁就跳过了，但欢迎你在[humanlayer/humanlayer](https://github.com/humanlayer/humanlayer)里启动一个claude会话，问问“thoughts tool”怎么发挥作用。

### 实践一下

我每周和[@vaibhav](https://www.linkedin.com/in/vaigup/)有一个[直播编程节目](https://github.com/ai-that-works/ai-that-works)，我们会为一个高级AI工程问题设计方案并写代码。这是我每周最期待的环节之一。

几周前，我[决定分享更多关于这个流程的细节](https://hlyr.dev/he-gh)，想看看我们内部的技术能不能一次性搞定BAML这个30万行Rust代码库的修复。BAML是一个用于LLM的编程语言。我从@BoundaryML仓库里挑了一个[bug（其实不算大）](https://github.com/BoundaryML/baml/issues/1252)，然后就开干了。

你可以[看这期节目](https://hlyr.dev/he-yt)了解更多细节，但简要流程如下：

**值得一提**：我最多算个Rust新手，以前从没参与BAML代码库。

#### 调研

*   我生成了一份调研报告，读完后发现，Claude认为这个bug无效，代码库是正确的。
*   我把它扔掉，重新开始一次调研，这次给了更多引导。
*   这是[我最终用的调研文档](https://github.com/ai-that-works/ai-that-works/blob/main/2025-08-05-advanced-context-engineering-for-coding-agents/thoughts/shared/research/2025-08-05_05-15-59_baml_test_assertions.md)。

#### 规划

*   在调研进行时，我等不及了，在没有调研的情况下启动了一次规划，想看看Claude能不能直接给出实现计划——[结果在这](https://github.com/ai-that-works/ai-that-works/blob/main/2025-08-05-advanced-context-engineering-for-coding-agents/thoughts/shared/plans/fix-assert-syntax-validation-no-research.md)。
*   调研完成后，我用调研结果又启动了一次实现计划——[结果在这](https://github.com/ai-that-works/ai-that-works/blob/main/2025-08-05-advanced-context-engineering-for-coding-agents/thoughts/shared/plans/baml-test-assertion-validation-with-research.md)。

两个计划都挺短，但差别很大。它们修复问题的方式不同，测试方法也不同。不深入细节了，两个方案都“能行”，但有调研支撑的那个，不仅在*最合适*的地方修复了问题，而且制定的测试方案也符合代码库的惯例。

#### 实现

*   这一切都发生在播客录制前一晚。我并行运行了两个计划，并在下线前都提交了PR。

第二天太平洋时间早上10点我们上节目时，[那个有调研支持的计划生成的PR，已经被@aaron批准了](https://github.com/BoundaryML/baml/pull/2259#issuecomment-3155883849)，他甚至不知道我是在为播客做节目🙂。[另一个PR我们就关掉了](https://github.com/BoundaryML/baml/pull/2258/files)。

至此，我们最初的4个目标，现状是：

*   ✅ 能在旧代码库里工作（30万行的Rust项目）
*   能解决复杂问题
*   ✅ 没有烂代码（PR已合并）
*   保持思路对齐

### 解决复杂问题

Vaibhav仍然持怀疑态度，而我也想看看我们能否解决更复杂的问题。

于是几周后，我俩花了7个小时（3小时调研规划，4小时实现），提交了3.5万行代码，为BAML增加了取消操作和WASM支持。
[取消操作的PR上周刚合并](https://github.com/BoundaryML/baml/pull/2357)。[WASM的PR还开着](https://github.com/BoundaryML/baml/pull/2330)，但已经有一个可用的演示，展示了如何在浏览器里的JS应用中调用WASM编译的Rust运行时。

虽然取消操作的PR还需要花不少心思才最终搞定，但我们一天之内取得了惊人进展。Vaibhav估计，这两个PR中的任何一个，都得让BAML团队的资深工程师花上3到5天才能完成。

✅ 能解决复杂问题

### 这不是魔法

还记得例子里我读了调研报告然后因为不对就把它扔掉那段吗？或者我和Vaibhav全身心投入了7个小时？你必须全身心投入，否则根本没用。

总有那么一类人，一直在寻找能解决所有问题的万能神咒。不存在的。

通过“调研/规划/实现”流程，达成高频刻意上下文压缩，能让你的表现**更好**，但要**好到能解决难题**，关键在于你在流程中加入了高杠杆的人工审查。

<img width="7309" height="4083" alt="image" src="https://github.com/user-attachments/assets/01c7818a-9a0d-4ede-a23b-fb0c2e80f843" />

### 翻车进行时

几周前，我和[@blakesmith](https://www.linkedin.com/in/bhsmith/)坐了7个小时，[试图从parquet java中移除hadoop依赖](https://github.com/dexhorthy/parquet-java/blob/remove-hadoop/thoughts/shared/plans/remove-hadoop-dependencies.md)——关于这次搞砸的所有细节和我对其原因的推测，我会留到另一篇文章里说，总之，结果一塌糊涂。长话短说，就是调研步骤没有深入依赖树，想当然地认为可以把类移到上游，而不会引入深层嵌套的hadoop依赖。

有些巨大的难题，不是你花7个小时用提示词就能搞定的，我们仍在兴致勃勃地和朋友、伙伴们一起探索，不断挑战极限。我认为另一个教训是，你可能至少需要一个对代码库了如指掌的专家，而这次，我们俩都不是。

### 关于人的杠杆作用

如果说这篇文章你只能记住一件事，我希望是这个：

一行烂代码……就是一行烂代码。
但一行烂**计划**，可能导致几百行烂代码。
而一行烂**调研**，对代码库工作方式或功能位置的误解，可能让你背上几千行烂代码的锅。

<img width="7309" height="4083" alt="image" src="https://github.com/user-attachments/assets/dab49f61-caae-4c15-b481-ee9b8f64995f" />

所以，你要**把人的精力和注意力，集中在流程中杠杆效应最高的地方**。

<img width="9830" height="4520" alt="image" src="https://github.com/user-attachments/assets/cf981f70-5e61-4938-aa9a-7dcb88c9f8a4" />

审查调研和计划时，你获得的杠杆效应，远比审查代码时大。（顺便说一句，我们在[humanlayer](https://hlyr.dev/code)的一个主要关注点，就是帮助团队构建和利用高质量的工作流提示词，并为AI生成的代码和技术规格打造出色的协作流程）。

### 代码审查的意义何在？

关于代码审查的意义，大家看法不一。

我更喜欢[Blake Smith在《软件团队代码审查要点》](https://blakesmith.me/2015/02/09/code-review-essentials-for-software-teams.html)中的观点，他认为代码审查最重要的部分是思路对齐——让团队成员对代码的改动和原因保持同步。

<img width="7309" height="4083" alt="image" src="https://github.com/user-attachments/assets/77f4001b-175f-4da6-a6d4-e00b80489476" />

还记得那些2000行的Go PR吗？我关心它们是否正确、设计是否良好，但团队内部最大的不安和挫败感，来源于思路不对齐。**我开始对我们的产品是什么、它如何工作，感到陌生和失控。**

我猜，任何和高效AI程序员共事过的人，都有过这种体验。

这其实是“调研/规划/实现”流程对我们来说最重要的部分。
每个人都写更多代码，一个必然的副作用是，在任何时间点，代码库中，任何一个工程师不熟悉的部分会越来越多。

我不会试图说服你“调研/规划/实现”是适合大多数团队的方法——很可能不是。但你绝对需要一个工程流程，来做到：

1.  让团队成员保持思路同步
2.  让团队成员能快速了解代码库中不熟悉的部分

对大多数团队来说，这是通过PR和内部文档实现的。对我们来说，现在是技术规格、计划和调研。

我没法每天读2000行Go代码，但我读得下一份200行的优质实现计划。

我没法在出问题时，花一个多小时在40多个守护进程代码文件里摸索（好吧，我能，但我不想）。我可以引导一个调研提示词，帮我快速定位问题、理清头绪。

### 总结

基本上，我们得到了我们需要的一切。

*   ✅ 能在旧代码库里工作
*   ✅ 能解决复杂问题
*   ✅ 没有烂代码
*   ✅ 保持思路对齐

（哦，对了，我们三人团队现在平均每月在Opus上花1.2万美元）

为了让你不觉得我只是另一个[留着小胡子、只会吹牛的销售](https://www.youtube.com/watch?v=IS_y40zY-hc&lc=UgzFldRM6LU5unLuFn54AaABAg.AMKlTmJAT5ZAMKrOOAMw3I)，我要指出，这套方法并非对所有问题都完美有效（parquet-java，我们还会再战的）。

八月份，整个团队为一个棘手的竞态条件问题兜兜转转了两周，最后掉进了一个兔子洞，牵扯出Go语言里MCP sHTTP keep-alive的一堆问题和其他各种死胡同。

但这现在是例外。总的来说，这套方法对我们很管用。我们的实习生第一天就提交了2个PR，第八天提交了10个。我本来很怀疑这方法对别人是否有效，但我和Vaibhav在7小时内就交付了3.5万行可用的BAML代码。（如果你不认识Vaibhav，他是我认识的最注重代码设计和质量的工程师之一。）

### 未来展望

我相当确信，编程AI终将商品化。

难点在于团队和工作流的转型。在一个AI编写99%代码的世界里，关于协作的一切都将改变。

我坚信，如果你搞不定这个，你就会被那些做到了的人弯道超车。

### 好吧，我知道你想卖我点东西了

我们非常看好“技术规格优先”的AI工作流，所以我们正在构建工具，让它变得更容易。在众多问题中，我尤其痴迷于如何将这些“高频、刻意的上下文压缩”工作流，协作式地扩展到大型团队。

今天，我们正式发布CodeLayer的内测版，这是我们新的“后IDE时代的IDE”——你可以把它想象成“claude code版的Superhuman”。如果你是Superhuman和/或vim模式的粉丝，并且准备好告别“凭感觉编程”，认真地用AI来构建，我们诚邀你加入我们的候补名单。

**请访问 [https://humanlayer.dev](https://humanlayer.dev) 注册。**

## 致开源项目维护者——我们一起做点东西吧

如果你是一个复杂开源项目的维护者，并且在湾区，我有一个公开邀请——我愿意在一个周六，在旧金山和你线下结对编程7小时，看看我们能否搞定一个大功能。

我能从中了解到这些技术的局限和不足（如果运气好，还能有一个能展示的、增加了巨大价值的合并PR）。你也能以我发现的唯一有效方式——直接一对一结对——来学习这个工作流。

## 致工程领导者

如果你或你认识的某位工程领导者，想用AI将团队生产力提升十倍，我们正与一些10到25人的工程团队合作，帮助他们完成向AI优先编程世界过渡所需的文化、流程和技术转变。

### 致谢

*   感谢所有朋友和创始人，听我早期絮絮叨叨地讲述这篇文章的雏形——Adam、Josh、Andrew等等等等。
*   感谢Sundeep，陪我们度过这场疯狂的风暴。
*   感谢Allison、Geoff和Gerred，拖着我们、推着我们，奔向未来。