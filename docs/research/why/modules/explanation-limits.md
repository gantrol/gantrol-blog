# “为什么”的解释边界

最后检索：2026-08-23

核心原则：

> 复杂本身不是停止追问的理由。当问题不可定义、因果不可识别、证据无法区分竞争解释、个体反事实不可观察，或事件只能得到统计、路径依赖或生成性解释时，停止编造唯一原因。

最常见的诚实结论不是“这个行为没有原因”，而是：

> 现有证据无法确定，这个人在这个时刻做这件事的唯一原因。

## 1. 个体事件的原因可能只能部分识别

1. **Dawid, Musio & Fienberg (2016), _From Statistical Evidence to Evidence of Causality_** — 即使群体因果效应已有高质量证据，某个具体事件“是否由 X 造成”仍可能只能得到概率边界；反事实比较对象和额外假设会改变答案。[DOI](https://doi.org/10.1214/15-BA968)
2. **Mueller, Li & Pearl (2022), _Causes of Effects: Learning Individual Responses From Population Data_** — 结构知识、实验与额外观测可以缩小个体因果概率区间，说明“不能点识别”不等于“永远无法改善”。[IJCAI](https://www.ijcai.org/proceedings/2022/376)

**停止条件**：同一个人的两个潜在结果不能同时观察；答案依赖无法检验的单调性或无混杂假设；最紧边界仍无法区分候选原因。此时标记 `partial-identification` 或 `statistical-only`。

## 2. 观察相关有时可以识别因果，但必须声明假设

3. **Shpitser & Pearl (2006), _Identification of Joint Interventional Distributions in Recursive Semi-Markovian Causal Models_** — 给定因果图和观察分布，图算法可以判断干预效应何时可识别，并在不能识别时揭示阻碍结构。[稳定全文](https://ftp.cs.ucla.edu/pub/stat_ser/r327.pdf)
4. **Hernán & Robins, _Causal Inference: What If_** — 系统说明一致性、交换性、正值性和明确干预版本等识别要求。[开放教材](https://miguelhernan.org/whatifbook)

这同时反对两个极端：

- “有相关数据就能回答为什么”不成立；
- “不是随机实验就永远不能谈因果”也不成立。

如果两个模型与全部观察数据一致，却对 `do(X)` 给出不同答案，标记 `causal-unidentified`，并列出需要的实验或额外变量。

## 3. 等终性、多终性与多条充分路径

5. **Cicchetti & Rogosch (1996), _Equifinality and Multifinality in Developmental Psychopathology_** — 不同初始状态和路径可通向同一结果，同一因素也可在不同背景中产生不同结果；路径仍有约束，并非所有结果同样可能。[DOI](https://doi.org/10.1017/S0954579400007318)
6. **Rothman (1976), _Causes_** — 充分—组分原因模型说明，一个结果可能由多套条件组合产生，单一因素通常既非必要也非充分。[DOI](https://doi.org/10.1093/oxfordjournals.aje.a112335)

例如“没有开始工作”可以由疲劳、失败恐惧、任务含糊、机会成本、控制抗拒、无即时回报或身份冲突等不同路径产生。同一地位动机也可产生勤奋、合作、炫耀、作弊或攻击。

观察结果不能区分这些路径时，写“候选路径、促进因素和触发条件”，不写“唯一动机”。

## 4. 不可预测、随机与路径依赖不是无因

7. **Lorenz (1963), _Deterministic Nonperiodic Flow_** — 确定性系统也可能因初始条件的微小误差而快速失去长期预测能力。[期刊全文](https://journals.ametsoc.org/view/journals/atsc/20/2/1520-0469_1963_020_0130_dnf_2_0_co_2.xml)
8. **Salganik, Dodds & Watts (2006), _Experimental Study of Inequality and Unpredictability in an Artificial Cultural Market_** — 平行音乐市场中，社会影响越强，成功越不平等、具体赢家越不可预测；质量仍限制最好和最差区间。[DOI](https://doi.org/10.1126/science.1121066)

只有在独立平行运行反复产生不同赢家、赢家身份不稳定而分布规律相对稳定时，才使用 `random-path-dependent`。此时仍可回答哪些机制提高概率、为什么形成赢家通吃以及结果分布，却不解释“为什么偏偏是这个作品”。

不要因为现象看起来混乱就称为“混沌”；至少需要可检验的初始条件敏感性。

## 5. 涌现要求换层级，不是取消解释

9. **Anderson (1972), _More Is Different_** — 宏观层面会出现需要自身概念和规律研究的新性质。[DOI](https://doi.org/10.1126/science.177.4047.393)
10. **Bedau (1997), _Weak Emergence_** — 一类宏观状态可以从微观规则与外部条件导出，但只能通过逐步模拟得到；没有简捷推导不等于原则上无解释。[开放全文](https://pdodds.w3.uvm.edu/teaching/courses/2009-08UVM-300/docs/others/1997/bedau1997a.pdf)
11. **Schelling (1971), _Dynamic Models of Segregation_** — 强烈的宏观隔离不要求每个个体都有强烈隔离意图，局部偏好与互动足以生成宏观模式。[DOI](https://doi.org/10.1080/0022250X.1971.9989794)
12. **Granovetter (1978), _Threshold Models of Collective Behavior_** — 平均偏好相近的群体可能因阈值分布和早期行动者不同而产生极不同的集体结果。[DOI](https://doi.org/10.1086/226707)

当宏观结果由局部行动、网络、阈值和反馈共同产生且不存在统一决策者时，停止问“谁想让系统变成这样”，改问“哪些局部规则生成了这个模式”，标记 `generative-emergent`。

## 6. 预测准确不等于知道动力

13. **Shmueli (2010), _To Explain or to Predict?_** — 解释模型与预测模型具有不同目标；高预测准确率可能来自代理变量和稳定相关，而未识别干预效应或心理机制。[DOI](https://doi.org/10.1214/10-STS330)

如果证据只有留出集准确率或相关系数，没有干预、自然实验或明确因果假设，只标记 `predicts`，不得标记 `supports-causal`。推荐系统能预测某人点击，并不等于知道他为何点击。

## 7. 事后讲得通只能算兼容

14. **Fischhoff (1975), _Hindsight Is Not Equal to Foresight_** — 知道结果后，人会提高对该结果事前可能性的估计，而且常意识不到这种影响。[DOI](https://doi.org/10.1037/0096-1523.1.3.288)
15. **Kerr (1998), _HARKing_** — 把见到结果后形成的假说伪装成事前假说，会混淆发现和验证。[DOI](https://doi.org/10.1207/s15327957pspr0203_4)
16. **Simmons, Nelson & Simonsohn (2011), _False-Positive Psychology_** — 灵活选择样本、变量、条件与停止点会显著增加假阳性。[DOI](https://doi.org/10.1177/0956797611417632)

事后解释可以生成新假说；如果没有产生竞争理论不预测的新预测、独立样本或精确重复，只标记 `compatible-only` 或 `post-hoc-story`。

## 8. 不要从一次行为直接读取人格或动机

17. **Jones & Harris (1967), _The Attribution of Attitudes_** — 即使知道文章立场由实验者指定，观察者仍容易从文章推断作者真实态度。[DOI](https://doi.org/10.1016/0022-1031(67)90034-0)
18. **Gilbert & Malone (1995), _The Correspondence Bias_** — 综述情境约束为何容易在归因中被低估。[DOI](https://doi.org/10.1037/0033-2909.117.1.21)
19. **Miller (1984), _Culture and the Development of Everyday Social Explanation_** — 成年美国样本比印度教背景样本更多诉诸稳定特质，后者更多诉诸情境，限制“基本归因错误是固定普遍机制”的说法。[DOI](https://doi.org/10.1037/0022-3514.46.5.961)

如果只有一次行为，却不知道选项、约束、同情境下他人行为、同一个人的跨情境稳定性以及奖励、规范、角色和信息条件，标记 `context-uncontrolled`，不推断“他就是懒、贪婪或虚荣”。

## 9. 群体规律不能直接解释个人动力

20. **Robinson (1950), _Ecological Correlations and the Behavior of Individuals_** — 群体层面相关与个体相关可能大小悬殊，甚至方向相反。[DOI](https://doi.org/10.2307/2087176)
21. **Fisher, Medaglia & Jeronimus (2018), _Lack of Group-to-Individual Generalizability Is a Threat to Human Subjects Research_** — 六组密集重复测量中，个体内变异可显著大于群体间变异，群体模型外推到个人前必须直接检验。[DOI](https://doi.org/10.1073/pnas.1711978115)
22. **Molenaar (2004), _A Manifesto on Psychology as Idiographic Science_** — 心理过程常不满足从人群统计推广到个体所需的遍历性条件。[DOI](https://doi.org/10.1207/s15366359mea0204_1)
23. **Kent et al. (2018), _The Predictive Approaches to Treatment Effect Heterogeneity Statement_** — 平均试验效应不保证每个人得到同样收益，异质性和个体预测需要额外建模与验证。[DOI](https://doi.org/10.1136/bmj.k4245)

证据单位是国家、平台、人群或跨人横断面，结论对象却是一个人的内部动力时，标记 `level-mismatch`。最多写“这类人平均更可能”，不写“所以他当时因为”。

## 10. 自述是重要证据，但不是因果真相

24. **Nisbett & Wilson (1977), _Telling More Than We Can Know_** — 人可能无法察觉真正影响行为的刺激，而依据关于“什么原因听起来合理”的常识理论报告原因。[DOI](https://doi.org/10.1037/0033-295X.84.3.231)
25. **Ericsson & Simon (1980), _Verbal Reports as Data_** — 在适当任务、时间和报告条件下，即时 verbal report 可以成为有效数据，反对“自述全部无效”的另一极端。[DOI](https://doi.org/10.1037/0033-295X.87.3.215)
26. **Johansson et al. (2005), _Failure to Detect Mismatches Between Intention and Outcome_** — 参与者有时未发现选择结果被调换，却流畅解释为何“选择”它；解释流畅不等于解释真实。[DOI](https://doi.org/10.1126/science.1111709)

必须分别记录：当事人体验到了什么、认可什么理由、什么过程实际改变了行为。前两项当事人可能有特权信息，第三项不能只靠事后访谈确定。

## 11. 停止标签

| 标签 | 使用条件 | 仍可回答什么 |
| --- | --- | --- |
| `problem-undefined` | 未指定主体、行为、时间、比较对象或层级 | 先重写问题 |
| `currently-unknown` | 缺资料，但可以设计区分性研究 | 列出所需证据 |
| `underdetermined` | 多个理论同样符合现有证据 | 列竞争解释和不同预测 |
| `causal-unidentified` | 相同观察分布对应不同因果答案 | 报告假设和所需实验 |
| `partial-identification` | 只能得到概率上下界 | 报区间，不给点结论 |
| `statistical-only` | 只有人群或重复运行的分布 | 报概率变化和适用人群 |
| `random-path-dependent` | 具体结果在平行运行中不稳定 | 解释分布、反馈和敏感性 |
| `generative-emergent` | 宏观结果由互动生成，无统一意图 | 给出局部规则和生成机制 |
| `predicts-only` | 能预测但未识别干预效应 | 报预测范围，不报动力 |
| `post-hoc-story` | 结果后构造且没有新检验 | 只作待检验假说 |
| `level-mismatch` | 群体证据被用于个人内部过程 | 停止个体归因 |

不建议公开使用笼统的“不可解释”。未解释、不可识别、不可精确预测和原则上不可解释是不同主张；人类动力研究通常只能支持前三种更具体的边界。

