# MarkdownCheatsheet-Deepseek

## Overview Table

| Element            | Markdown Syntax                              |
|--------------------|----------------------------------------------|
| Heading            | `# H1`                                       |
|                    | `## H2`                                      |
|                    | `### H3`                                     |
| Bold               | `**bold text**`                              |
| Italic             | `*italicized text*`                          |
| Blockquote         | `> blockquote`                               |
| Ordered List       | `1. First item`<br>`2. Second item`          |
| Unordered List     | `- First item`<br>`- Second item`            |
| Code               | `` `code` ``                                 |
| Fenced Code Block  | ` ``` `<br>`...`<br>` ``` `                 |
| Horizontal Rule    | `---`                                        |
| Link               | `[title](https://www.example.com)`           |
| Image              | `![alt text](image.jpg)`                     |
| Table              | `\| Syntax \| Description \|`<br>`\| --- \| --- \|` |

---

## Base Syntax

### Headings
```markdown
# H1: Level 1 Header
## H2: Level 2 Header
### H3: Level 3 Header
#### H4: Level 4 Header
##### H5: Level 5 Header
###### H6: Level 6 Header
```

### Emphasis
- *Italic*: `*text*` or `_text_`
- **Bold**: `**text**` or `__text__`
- **Combined**: `_You **can** combine them_`

---

## Lists

### Ordered List
```markdown
1. First item
2. Second item

### Unordered List
```markdown
- First item
- Second item
```

---

## Links & Images
- **Link**:  
  `[Markdown Guide](https://www.markdownguide.org/)`  
  or with reference:  
  `[Markdown Guide][ref]`  
  `[ref]: https://www.markdownguide.org/`

- **Image**:  
  `![Logo](https://example.com/logo.png "Title")`

---

## Blockquotes & Code
```markdown
> Blockquote  
> > Nested Blockquote

Inline code: `` `printf()` ``

Fenced code block:
```python
print("Hello World")
```
```

---

## Tables
```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Left     | Center   | Right    |
```

---

## Escaping Special Characters
| Character | Escaped | Name                   |
| --------- | ------- | ---------------------- |
| `*`       | `\*`    | Asterisk               |
| `_`       | `\_`    | Underscore             |
| `#`       | `\#`    | Hash                   |
| `[`       | `\[`    | Opening Square Bracket |

---

## Math Formulas
Use LaTeX syntax with `$$` delimiters:
```latex
$$ E = mc^2 $$

$$ \int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi} $$
```

---

## Footnotes
Add footnotes with `[^1]` and define them later:  
`This is a sentence with a footnote[^1].`  
`[^1]: Footnote content.`

---

## Badges
**README Badge**:  
`[![English Documentation](https://img.shields.io/badge/English-Readme-blue?style=for-the-badge)](https://example.com)`

**Vercel Deploy Badge**:  
`[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import)`

---

## Extensions
- **TODO Lists**:  
  `- [ ] Task 1`  
  `- [x] Task 2`

```