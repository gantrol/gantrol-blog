---
head:
  - - meta
    - name: 大模型 PDF 转 Markdown 手工评估方法
      content: 目前 Gemini 2.0 FTE 胜出
---

# 大模型 PDF 转 Markdown 手工评估方法

利用[MarkdownCheatsheet.md](./MarkdownCheatsheet)
转成的[MarkdownCheatsheet.pdf](https://github.com/gantrol/gantrol-blog/blob/main/src/AI/use/pdf/MarkdownCheatsheet.pdf)
，让各个大模型转回Markdown

| 模型                | 结构相似度[^1] | 结果文件                                  | 主观评价                          |
|-------------------|-----------|---------------------------------------|-------------------------------|
| DeepSeek R1       | 32.68%    | [链接](./MarkdownCheatsheet-Deepseek)   | 较多残缺                          |
| Gemini 2.0 FTE    | 75.71%    | [链接](./MarkdownCheatsheet-Gemini2FTE) | 基本复原，但没复原代码部分                 |
| Grok3             | 83.69%    | [链接](./MarkdownCheatsheet-Grok3)      | 还行，没复原代码部分，貌似不如Gemini 2.0 FTE |
| Grok3             | 65.02%    | [链接](./MarkdownCheatsheet-Grok3)      | 有缺漏                           |
| Claude 3.5 sonnet | 56.89%    | [链接](./MarkdownCheatsheet-Gemini2FTE) | 有缺漏，且忽略了代码部分                  |

[^1]: 形式比较，余弦相似度计算[代码链接](https://github.com/gantrol/gantrol-blog/blob/main/src/AI/use/pdf/diff_md.py)
