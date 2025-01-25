# 翻译 Prompt

## 效果与适用范围

上实际例子：

> 公司内部，指标（财务也算上），越透明越好。 不知道为啥，很多创始人特别怕公开这些。 但公开透明，能让大家更聚焦增长。 员工对指标越上心，公司往往也越有起色， 这之间好像有直接关系。 指标藏着掖着，大家就没方向了。
>
> Extreme internal transparency around metrics (and financials) is a good thing to do. For some reason, founders are always really scared of this. But it’s great for keeping the whole company focused on growth. There seems to be a direct correlation between how focused on metrics employees at a company are and how well they’re doing. If you hide the metrics, it’s hard for people to focus on them.

> Airbnb 的几个创始人，画了张增长目标图，贴得到处都是：冰箱上，办公桌上，甚至卫生间镜子上。 每周要是达标了，就庆祝。 没达标，大家就死磕这个问题。
>
> The founders of Airbnb drew a forward-looking graph of the growth they wanted to hit. They posted this everywhere—on their fridge, above their desks, on their bathroom mirror. If they hit the number that week, great. If not, it was all they talked about.

适用于[Gemini 2 FTE](https://aistudio.google.com/prompts/)。有时候它还挺幽默：

> 没问题，我来给你好好改改这段文字，保证改完之后，地道、简洁、有力，读起来就像人话，不像 AI 写的

当然，它不只是能做翻译，润色中文也可以：

> 朋友，听我一句劝吧，放下手机，关上电脑，走出网络的世界，读几页自己喜欢的书，出去阳光里走走，要么骑骑自行车，天黑了约几个好久不见的朋友喝喝茶，聊聊天，随便做些什么，一天下来，你就会发现------连还是上网打游戏有意思。
>
> 朋友，听我一句劝！放下手机电脑，走出网络。读几页书，晒晒太阳，骑车兜风，晚上约老友聚聚，随便干点啥。结果你发现——还是上网打游戏有意思！

## Prompt

```Markdown
用简体中文（白话文）重新表述原文，尽可能保持原有风格，避免使用AI中文，保持简洁、灵活、铿锵有力。

## AI中文改进要点

避免英语化

*   抽象名词：减少使用，多用动词或具体描述。
    *   例：不说“收入的减少”，说“收入减少”。
*   主语/宾语：少用抽象名词/词组做主语或宾语，多用事情或短句。
    *   例：不说“书籍的选购”，说“选购书籍”。
*   弱动词+抽象名词：少用“作出”、“进行”等，多用直接动词。
    *   例：不说“作出贡献”，说“贡献”。
*   被动语态：尽量用主动语态，避免生硬的“被”字。
    *   例：不说“被接受”，说“大家接受”。

活用

*   成语：适当运用，避免滥用或完全不用。
*   连接词：少用“和”、“与”、“及”、“以及”，活用“而”、“并”、“且”。
*   介词：避免滥用“中间”、“有关”、“关于”、“由于”等，精简表达。
*   副词：避免将动词加“地”转为副词，灵活运用逗号。
    *   例：不说“苦心孤诣地”，说“苦心孤诣，”。
*   形容词：减少“的”字，灵活运用词语搭配。
    *   例：不说“白色的鸭”，说“白鸭”。
*   后饰：灵活运用后置修饰，避免长句堆砌在前。
    *   例：不说“一个长得像你兄弟的陌生男人”，说“一个陌生男人，长得像你兄弟”。

避免冗余

*   伪术语：避免“知名度”、“可读性”等，直接表达。
*   “们”字：名词已表复数，避免多余的“们”字。
    *   例：不说“人们”，说“大家”。
*   “之一”：避免滥用“之一”，考虑其他表达方式。
    *   例：不说“名著之一”，说“名著”。
*   “其中之一”：避免“其中之一”叠加“之一”，考虑其他表达方式。
*   “最...之一”：避免使用，改用其他更精炼的表达方式。

以下是原文：
```

## 参考

- 《北外高翻笔译课》
- 余光中：《怎样改进英式中文？──论中文的常态与变态》

待参考

- 英汉翻译过程中的难译现象处理
