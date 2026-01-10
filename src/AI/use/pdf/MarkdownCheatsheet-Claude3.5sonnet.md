# Markdown Cheatsheet

## Base Syntax Elements

| Element | Markdown Syntax |
| --- | --- |
| Heading | # H1<br>## H2<br>### H3 |
| Bold | **bold text** |
| Italic | *italicized text* |
| Blockquote | > blockquote |
| Ordered List | 1. First item<br>2. Second item |
| Unordered List | - First item<br>- Second item |
| Code | `code` |
| Fenced Code Block | ``` |
| Horizontal Rule | --- |
| Link | [title](https://www.example.com) |
| Image | `![alt text](image.jpg)` |
| Table | \| Syntax \| Description \|<br>\| ----------- \| ----------- \|<br>\| Header \| Title \|<br>\| Paragraph \| Text \| |

## Overview

### Headings
- H1: Level 1 Header (#)
- H2: Level 2 Header (##)
- H3: Level 3 Header (###)
- H4: Level 4 Header (####)
- H5: Level 5 Header (#####)
- H6: Level 6 Header (######)

### Emphasis
*This text will be italic*
_This will also be italic_
**This text will be bold**
__This will also be bold__
_You **can** combine them_

### Lists
#### Ordered List
1. Item 1
2. Item 2

#### Unordered List
- Item 1
- Item 2

### Links
[Markdown Can Do](https://www.github.com/gantrol/MarkdownCanDo)
[Markdown Can Do][MDCD]
[MDCD]:https://www.github.com/gantrol/MarkdownCanDo

### Images
![Markdown Can Do Logo](https://www.github.com/gantrol/MarkdownCanDo "MarkdownCanDo Logo")

### Block Quote
> Block Quote
>
> > Nested Block Quote

### Tables
| middle | middle | right | left |
| --- | :---: | ---: | :--- |
| | | | |
| | | | |

### Escaping Characters
Use \ for Escaping the following Characters in Markdown:

| Character | Escaped | Character Name |
| --- | --- | --- |
| * | \* | Asterisk |
| _ | \_ | Underscore |
| { | \{ | Opening Curly Bracket |
| } | \} | Closing Curly Bracket |
| [ | \[ | Opening Square Bracket |
| ] | \] | Closing Square Bracket |
| ( | \( | Opening Parenthesis |
| ) | \) | Closing Parenthesis |
| # | \# | Hash |
| + | \+ | Plus |
| - | \- | Hyphen/Minus |
| . | \. | Period/Dot |
| ! | \! | Exclamation Mark |
| \| | \| | Vertical Bar |

### Inline Code
Use `printf()` function.

### Code Blocks
```javascript
// Your code here
```

### Footnotes
This paragraph uses a footnote[^1].

[^1]: This line will appear at the end of the article

### Badges
[![English documentation](https://img.shields.io/badge/English-Readme-blue?style=for-the-badge)](https://github.com/gantrol/MarkdownCanDo/blob/main/readme.md)

### Vercel Deploy Badge
[![Deploy this site with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/gantrol/markdown-can-do)

### TODO
- Implement a simple to-do list
- Get some fries at the dock
