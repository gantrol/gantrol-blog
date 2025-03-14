# Markdown Cheatsheet

## Overview Table

| Element           | Markdown Syntax                                              |
| ----------------- | ------------------------------------------------------------ |
| Heading           | `# H1`<br />`## H2`<br />`### H3`                            |
| Bold              | `**bold text**`                                              |
| Italic            | `*italicized text*`                                          |
| Blockquote        | `> blockquote`                                               |
| Ordered List      | `1. First item`<br />`2. Second item`                        |
| Unordered List    | `- First item`<br />`- Second item`                          |
| Code              | `` `code` ``                                                 |
| Fenced Code Block | ```` ``` ````<br />```` ``` ````                             |
| Horizontal Rule   | `---`                                                        |
| Link              | `[title](https://www.example.com)`                           |
| Image             | `![alt text](image.jpg)`                                     |
| Table             | `\| Syntax \| Description \|`<br />` \| ----------- \| ----------- \|`<br />` \| Header \| Title \|`<br />` \| Paragraph  \| Text \|` |


## Base Systax

### Headings

H1: Level 1 Header
```
# 
```

H2: Level 2 Header
```
## 
```

H3: Level 3 Header
```
### 
```

H4: Level 4 Header
```
#### 
```

H5: Level 5 Header
```
##### 
```

H6: Level 6 Header
```
###### 
```

### Emphasis
```
*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

_You **can** combine them_
```

### Lists

#### Ordered List

1. -
2. -
    1. -
    2. -

```
1. 
2. 
   1. 
   2. 
```

#### Unordered List

- 1
- 2
    - 3
    - 4

```
- 
- 
  - 
  -
```

### Links
```
[Markdown Can Do](https://www.markdowncando.com/)
```

```
[Markdown Can Do][MDCD]

[MDCD]:https://www.markdowncando.com/
```

### Images

![Markdown 能做的 Logo](https://www.markdowncando.com/logo-mini.png "MarkdownCanDo Logo")

```
![Markdown Can Do Logo](https://www.markdowncando.com/ "MarkdownCanDo Logo")
```

### Block Quote

> Block Quote
>
> > Nested Block Quote
> >

```
> Block Quote
> 
> > Nested Block Quote
> > 
```

### Tables

```
|middle| middle| right| left |
| ---  | :---: | ---: | :--- |
|      |       |      |      |
|      |       |      |      |
```

```
|     |     |     |     |
| --- | --- | --- | --- |
|     |     |     |     |
|     |     |     |     |
```

### Horizontal Rule
```
---
```

### Inline Code
```
Use `printf()` function.
```

### (Fenced) Code Blocks

````
```javascript

```
````

Fenced counts four: \`\`\`\`, which can embed \`\`\`

### Escaping

Use `\` for Escaping below Character in Markdown:

Certainly! I'll add a column to the table that includes the name of each character:

| Character | Escaped Markdown | Character Name         |
| --------- | ---------------- | ---------------------- |
| `*`       | `\*`             | Asterisk               |
| `_`       | `\_`             | Underscore             |
| `{`       | `\{`             | Opening Curly Bracket  |
| `}`       | `\}`             | Closing Curly Bracket  |
| `[`       | `\[`             | Opening Square Bracket |
| `]`       | `\]`             | Closing Square Bracket |
| `(`       | `\(`             | Opening Parenthesis    |
| `)`       | `\)`             | Closing Parenthesis    |
| `#`       | `\#`             | Hash                   |
| `+`       | `\+`             | Plus                   |
| `-`       | `\-`             | Hyphen/Minus           |
| `.`       | `\.`             | Period/Dot             |
| `!`       | `\!`             | Exclamation Mark       |
| \|        | `\|`             | Vertical Bar           |

This table provides a quick reference for escaping special characters in Markdown, along with the names of the characters.

### Footnote

This paragraph uses a footnote[^1].

[^1]: This line will appear at the end of the article

```
This paragraph uses a footnote[^1].

[^1]: This line will appear at the end of the article
```

## Combine

### Readme Badge

[![English documentation](https://img.shields.io/badge/English-Readme-blue?style=for-the-badge)](https://github.com/gantrol/MarkdownCanDo/blob/main/readme.md)

```
[![English documentation](https://img.shields.io/badge/English-Readme-blue?style=for-the-badge)](https://github.com/gantrol/MarkdownCanDo/blob/main/readme.md)
```

```
[![alt](https://img.shields.io/badge/left-right-blue?style=for-the-badge)](readme link)
```

Other configures refer [shield](https://shields.io).

### Vercel Deploy Badge

[![Deploy this site with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/gantrol/markdown-can-do)

```
[![Deploy this site with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/gantrol/markdown-can-do)
```

```
[![alt](https://img.shields.io/badge/left-right-blue?style=for-the-badge)](https://vercel.com/import/project?template=githubLink)
```

## Ext

### TODO

- [x] Implement a simple to-do list
- [ ] ~~Get some fries at the dock~~

### Math

$E=mc^2$
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$