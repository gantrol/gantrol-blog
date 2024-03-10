import { defineConfig } from 'vitepress'
import footnote from 'markdown-it-footnote';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh',
  title: '黄健楸',
  srcDir: 'src',
  description: 'Computer psychologist: AI, software, and psychology',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-0P7S4MY6FW' }
    ],
    [
      'script',
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-0P7S4MY6FW');"
    ]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    nav: [
      { text: '主页', link: '/' },
    ],
    search: {
      provider: 'local',
      options: {

        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },
    sidebar: [
      {
        text: 'AI',
        items: [
          { text: 'AI TOP 1', link: '/AI/TOP1' },
          { text: 'AI 画 SVG', link: '/AI/use/svg/' },
        ]
      },
      {
        text: 'software',
        items: [
          { text: '自学计算机科学', link: '/software/cs/learn' },
          { text: '“这个很简单，我也能做一个”', link: '/software/wheel/' },
          { text: '沙盒例子', link: '/examples' },
          { text: '谈笔记', link: '/software/tools/notes/too-much/' },
        ]
      },
      {
        text: 'Startup',
        items: [
          { text: '黄金之问：Why', link: '/startup/on-why/' },
          { text: '怎样成为一个“干大事”的人', link: '/startup/on-why/great-work-cn/' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/gantrol/gantrol-blog' }
    ],
  },
  locales: {
    root: {
      label: '中文',
      lang: 'zh'
    },
    en: {
      label: 'English',
      lang: 'en',
    }
  },
  markdown: {
    math: true,
    // @mdit-vue/plugin-toc 的选项
    // https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc#options
    toc: { level: [1, 2] },
    config: (md) => {
      md.use(footnote);
    },
    image: {
      // 图片懒加载
      lazyLoading: true
    }
  },
  vite: {
    ssr: {
      noExternal: ['monaco-editor']
    }
  },
  sitemap: {
    hostname: 'https://gantrol.com'
  },
})
