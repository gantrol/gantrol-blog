# Markdown Cheatsheet

## Overview Table

| Element            | Markdown Syntax                     |
|--------------------|-------------------------------------|
| Heading            | `# H1` <br> `## H2` <br> `### H3`  |
| Bold               | `**bold text**`                    |
| Italic             | `*italicized text*`                |
| Blockquote         | `> blockquote`                     |
| Ordered List       | `1. First item` <br> `2. Second item` |
| Unordered List     | `- First item` <br> `- Second item`   |
| Code               | `` `code` ``                       |
| Fenced Code Block  | ```` ``` ````                      |
| Horizontal Rule    | `---`                              |
| Link               | `[title](https://www.example.com)` |
| Image              | `![alt text](image.jpg)`           |
| Table              | (See below for syntax)             |

## Basic Syntax

### Headings

- H1: `# Level 1 Header`
- H2: `## Level 2 Header`
- H3: `### Level 3 Header`
- H4: `#### Level 4 Header`
- H5: `##### Level 5 Header`
- H6: `###### Level 6 Header`

### Emphasis

- Italic: `*This text will be italic*` 或 `_This will also be italic_`
- Bold: `**This text will be bold**` 或 `__This will also be bold__`
- Combined: `_You **can** combine them_`

### Lists

#### Ordered List

1. First item
2. Second item

#### Unordered List

- First item
- Second item
- Third item
- Fourth item

### Links

`[Markdown Can Do](https://www.markdown.com)`

### Inline Code

Use `` `printf()` `` function.

### Fenced Code Blocks

```javascript
// JavaScript code here
```

### Escaping

Use `\` to escape special characters in Markdown:

| Character | Escaped Markdown | Character Name         |
|-----------|------------------|------------------------|
| `*`       | `\*`             | Asterisk              |
| `_`       | `\_`             | Underscore            |
| `{`       | `\{`             | Opening Curly Bracket |
| `}`       | `\}`             | Closing Curly Bracket |
| `[`       | `\[`             | Opening Square Bracket|
| `]`       | `\]`             | Closing Square Bracket|
| `(`       | `\(`             | Opening Parenthesis   |
| `)`       | `\)`             | Closing Parenthesis   |
| `#`       | `\#`             | Hash                  |
| `+`       | `\+`             | Plus                  |
| `-`       | `\-`             | Hyphen/Minus          |
| `.`       | `\.`             | Period/Dot            |
| `!`       | `\!`             | Exclamation Mark      |
| `|`       | `\|`             | Vertical Bar          |

### Footnote

This paragraph uses a footnote[^1].

[^1]: This line will appear at the end of the article.

### Readme Badge

[![ENGLISH README](https://img.shields.io/badge/English-Readme-blue?style=for-the-badge)](https://github.com/gantrol/MarkdownCanDo/blob/main/readme.md)

### Vercel Deploy Badge

[![Deploy](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/gantrol/markdown-can-do)

### TODO List

- [ ] Implement a simple to-do list
- [ ] Get some fries at the dock

### Math Formulas

Inline math: $E=mc^2$

Display math:

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
