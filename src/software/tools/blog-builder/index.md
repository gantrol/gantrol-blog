# 搭建博客之选

本人的需求：

- 自用
  - 本地搜索
  - 纯文本
  - 对外依赖少
- 内容：
  - 详见[首页](/)，图文为主
  - 希望能embed各社交平台或媒体平台
  - 需要内嵌代码演练场

## 符合个人需求

比较符合个人需求的有两派

### MDX 配合 contentlayer


contentlayer能将各类非结构化文档转为JSON格式，弥补了前端框架对内容处理的不足，同时也不用处理其他CMS的麻烦事

理念很好，做得很棒，但最近五个月contentlayer无人维护，实践下来也有很多缺陷。调查了一下，无人维护是因为 Stackbit 被 Netlify 收购后，赞助停了——看来谋生比上述理念更重要

连累了众多基于contentlayer的博客模板，还有我几小时调研时间（我就想搭个blog……）

[有人](https://github.com/contentlayerdev/contentlayer/issues/429#issuecomment-1974928678)对比了其他方案：

| 包                                                                                                                         | 维护？ | 类型检查 | frontmatter | rehype | 备注                                                                                                                         |
|---------------------------------------------------------------------------------------------------------------------------|-----|------|-------------|--------|----------------------------------------------------------------------------------------------------------------------------|
| [@next/mdx](https://github.com/vercel/next.js)                                                                            | ✅   | ⛔️   | ✅           | ✅      | mdx has to be part of router                                                                                               |
| [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote#react-server-components-rsc--nextjs-app-directory-support) | ✅   | ✅    | ✅           | ✅      | can't import components in mdx file [1](https://github.com/hashicorp/next-mdx-remote?tab=readme-ov-file#import--export) ⛔️ |
| [mdxts](https://github.com/souporserious/mdxts/)                                                                          | ✅   | ✅    | ⛔️          | ⛔️     | very light feature set                                                                                                     |
| [velite](https://github.com/zce/velite)                                                                                   | ✅   | ✅    | ✅           | ✅      | very early beta and not widely adopted (yet?)                                                                              |

> 上表有修改

发现这几个月来，还没有出现能打的

有趣的是，有位国人开发了一个类似框架，然后到几个contentlayer相关仓库去说可以用他的框架替代

### Vitepress

[//]: # (TODO 整理)

本网站就是用Vitepress搭的

vitepress也有mdx类似方案的特性，Markdown文本格式就能生成网页，也能植入前端代码。性能上也优越不少。而且vue.js官方文档就是用这个，也有人长期维护。对比来看，mdx相关的方案就显得混乱不堪

vue.js官网甚至植入了一个vue代码演练场，没有依赖什么sandbox之类的外部网站。这个也是我之前想达到的效果（我知道可以iframe sandbox，就像React官网那样，单纯不喜欢）

同时它有一个很适合做教程的特性，像图二那样step1到15，就直接组织好教程了

- https://web.okjike.com/originalPost/65e9ac04de5f2873486c301d

## 其他选择

- Astro
- Hexo
- TailwindUI（付费）
  - Cali.so
