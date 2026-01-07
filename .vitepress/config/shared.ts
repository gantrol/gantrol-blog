import { defineConfig } from 'vitepress'
import { search as zhSearch } from './zh'
import footnote from "markdown-it-footnote";

export const shared = defineConfig({
    title: '黄健楸',
    srcDir: 'src',

    lastUpdated: true,
    cleanUrls: true,
    metaChunk: true,

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
        assetsInclude: ['**/*.svg'],
        ssr: {
            noExternal: ['monaco-editor']
        }
    },

    sitemap: {
        hostname: 'https://gantrol.com',
        transformItems(items) {
            return items.filter((item) => !item.url.includes('migration'))
        }
    },
    head: [
        ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
        ['meta', { name: 'theme-color', content: '#e67e22' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:locale', content: 'zh-Hans' }],
        ['meta', { property: 'og:title', content: 'Gantrol\'s Blog' }],
        ['meta', { property: 'og:site_name', content: 'gantrol' }],
        ['meta', { property: 'og:url', content: 'https://gantrol.com/' }],
        ['meta', { property: 'og:image', content: 'https://www.gantrol.com/logo.svg' }],
        ['meta', { property: 'twitter:card', content: 'summary' }],
        ['meta', { property: 'twitter:site', content: '@gantrols' }],
        ['meta', { property: 'twitter:creator', content: '@gantrols' }],
        [
            'script',
            {
                async: '',
                src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4459589195034801",
                crossorigin: "anonymous",
            }
        ],
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
        logo: '/logo.svg',

        socialLinks: [
            { icon: 'github', link: 'https://github.com/gantrol/gantrol-blog' }
        ],

        search: {
            provider: 'local',
            options: {
                locales: { ...zhSearch, }
            }
        },

    }
})
