# Markdown Cheatsheet

## Overview Table

| Element            | Markdown Syntax                        |
|--------------------|----------------------------------------|
| Heading            | `# H1` <br> `## H2` <br> `### H3`     |
| Bold               | `**bold text**`                       |
| Italic             | `*italicized text*`                   |
| Blockquote         | `> blockquote`                        |
| Ordered List       | `1. First item` <br> `2. Second item` |
| Unordered List     | `- First item` <br> `- Second item`   |
| Code               | `` `code` ``                          |
| Fenced Code Block  | ``` ```                               |
| Horizontal Rule    | `---`                                 |
| Link               | `[title](https://www.example.com)`    |
| Image              | `![alt text](image.jpg)`              |
| Table              |                                       |

## Base Syntax

### Headings

#### H1: Level 1 Header
# H1: Level 1 Header

#### H2: Level 2 Header
## H2: Level 2 Header

#### H3: Level 3 Header
### H3: Level 3 Header

#### H4: Level 4 Header
#### H4: Level 4 Header

#### H5: Level 5 Header
##### H5: Level 5 Header

#### H6: Level 6 Header
###### H6: Level 6 Header

## Emphasis

*This text will be italic*  
_This will also be italic_  
**This text will be bold**  
__This will also be bold__  
_You **can** combine them_

## Lists

### Ordered List
1. First item
2. Second item

### Unordered List
- 1
- 2
- 3
- 4

## Links

[Markdown Can Do](https://www.markdown)

## Inline Code

Use `printf()` function.

## (Fenced) Code Blocks

```javascript
Fenced counts four: '', which can embed
```

## Escaping

Use `\` for escaping the below characters in Markdown:

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
| `|`       | `\|`             | Vertical Bar           |

This table provides a quick reference for escaping special characters in Markdown, along with the names of the characters.

## Footnote

This paragraph uses a footnote[^1].  
This paragraph uses a footnote[^1].  

[^1]: This line will appear at the end of the article

## Combine

### Readme Badge

ENGLISH README  
[![English documentation](https://img.shields.io/badge/English-Readme-blue?style=for-the-badge)](https://github.com/gantrol/WarkdownCanDo/blob/main/readme.md)  
[![alt](https://img.shields.io/badge/left-right-blue?style=for-the-badge)](readme link)

Other configurations refer to shield.

### Vercel Deploy Badge

Deploy  
[![Deploy this site with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/gantrol/markdown-can-do)  
[![alt](https://img.shields.io/badge/left-right-blue?style=for-the-badge)](https://vercel.com/import/project?template=githubLink)

## Ext

### TODO

Implement a simple to-do list:
- Get some fries at the dock

## Math

$E = mc^2$

$$
\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}
$$

[^1]: This line will appear at the end of the article