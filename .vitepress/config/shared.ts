import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type HeadConfig, type PageData } from 'vitepress'
import { search as zhSearch } from './zh'
import footnote from 'markdown-it-footnote'

const hostname = 'https://www.gantrol.com'
const siteName = '计算之心'
const defaultImage = `${hostname}/avatar.png`
const sourceRoot = resolve(process.cwd(), 'src')

function getPageUrl(relativePath: string): string {
    const pagePath = relativePath
        .replace(/\.md$/, '')
        .replace(/(^|\/)index$/, '$1')

    return new URL(pagePath ? `/${pagePath}` : '/', hostname).href
}

function sourceExists(relativePath: string): boolean {
    return existsSync(resolve(sourceRoot, relativePath))
}

function getLanguageAlternates(relativePath: string) {
    const englishPath = relativePath.startsWith('en/')
        ? relativePath
        : relativePath === 'index.md'
            ? 'en/index.md'
            : `en/${relativePath}`
    const chinesePath = relativePath.startsWith('en/')
        ? relativePath.slice(3)
        : relativePath

    if (!sourceExists(englishPath) || !sourceExists(chinesePath)) return []

    const englishUrl = getPageUrl(englishPath)
    const chineseUrl = getPageUrl(chinesePath)

    return [
        { hreflang: 'zh-Hans', href: chineseUrl },
        { hreflang: 'en', href: englishUrl },
        { hreflang: 'x-default', href: chineseUrl }
    ]
}

function cleanMarkdown(value: string): string {
    return value
        .replace(/^---[\s\S]*?---\s*/m, '')
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style[\s\S]*?<\/style>/gi, ' ')
        .replace(/<!--([\s\S]*?)-->/g, ' ')
        .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
        .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
        .replace(/<[^>]+>/g, ' ')
        .replace(/[`*_~]/g, '')
        .replace(/\[\^[^\]]+]/g, '')
}

function truncate(value: string, maxLength = 155): string {
    const characters = Array.from(value.trim())
    return characters.length > maxLength
        ? `${characters.slice(0, maxLength - 1).join('')}…`
        : characters.join('')
}

function inferPageDescription(pageData: PageData): string | undefined {
    if (pageData.frontmatter.description) return undefined

    const file = resolve(sourceRoot, pageData.filePath)
    if (existsSync(file)) {
        const paragraphs = cleanMarkdown(readFileSync(file, 'utf8'))
            .split(/\n\s*\n/)
            .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
            .filter((paragraph) => (
                paragraph.length >= 24 &&
                !/^(#|\[\/\/]|import\s|export\s|[-*+]\s|\d+\.\s)/.test(paragraph)
            ))

        if (paragraphs[0]) return truncate(paragraphs[0])
    }

    if (!pageData.title) return undefined
    return pageData.relativePath.startsWith('en/')
        ? truncate(`${pageData.title} — practical notes from Gantrol on AI, software, and thoughtful computing.`)
        : truncate(`${pageData.title}：黄健楸关于 AI、软件与计算思维的实践记录。`)
}

function hasMeta(head: HeadConfig[], key: 'name' | 'property', value: string): boolean {
    return head.some(([tag, attrs]) => tag === 'meta' && attrs?.[key] === value)
}

function hasLink(head: HeadConfig[], rel: string): boolean {
    return head.some(([tag, attrs]) => tag === 'link' && attrs?.rel === rel)
}

export const shared = defineConfig({
    // This draft page references a component that is not in the repository yet.
    // Keep it out of production until the page and component can ship together.
    srcExclude: [
        'en/AI/use/image/compress.md',
        // AI TOP 1 now lives at AiCanDo. Cloudflare Pages permanently redirects these routes.
        'AI/TOP1.md',
        'en/AI/TOP1.md'
    ],
    title: '黄健楸',
    srcDir: 'src',

    lastUpdated: true,
    cleanUrls: true,
    metaChunk: true,

    markdown: {
        math: true,
        toc: { level: [1, 2] },
        config: (md) => {
            md.use(footnote)
        },
        image: {
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
        hostname,
        transformItems(items) {
            return items.filter((item) => (
                !item.url.includes('migration') &&
                !/(^|\/)embed\//.test(item.url) &&
                !/^\/?(?:en\/)?AI\/TOP1\/?$/.test(item.url)
            ))
        }
    },

    transformPageData(pageData) {
        const description = inferPageDescription(pageData)
        return description ? { description } : undefined
    },

    transformHead(context) {
        const { pageData } = context
        const head: HeadConfig[] = []
        const url = getPageUrl(pageData.relativePath)
        const isEnglish = pageData.relativePath.startsWith('en/')
        const locale = isEnglish ? 'en_US' : 'zh_CN'
        const language = isEnglish ? 'en-US' : 'zh-Hans'
        const title = context.title || pageData.title || siteName
        const description = context.description || pageData.description

        if (pageData.isNotFound) {
            if (!hasMeta(context.head, 'name', 'robots')) {
                head.push(['meta', { name: 'robots', content: 'noindex,nofollow' }])
            }
        } else if (!hasLink(context.head, 'canonical')) {
            head.push(['link', { rel: 'canonical', href: url }])
        }

        for (const alternate of getLanguageAlternates(pageData.relativePath)) {
            head.push(['link', { rel: 'alternate', ...alternate }])
        }

        const meta: Array<[string, 'name' | 'property', string, string]> = [
            ['og:type', 'property', 'og:type', 'website'],
            ['og:locale', 'property', 'og:locale', locale],
            ['og:site_name', 'property', 'og:site_name', siteName],
            ['og:url', 'property', 'og:url', url],
            ['og:title', 'property', 'og:title', title],
            ['og:description', 'property', 'og:description', description],
            ['og:image', 'property', 'og:image', defaultImage],
            ['og:image:alt', 'property', 'og:image:alt', `${siteName} 标志`],
            ['twitter:card', 'name', 'twitter:card', 'summary_large_image'],
            ['twitter:title', 'name', 'twitter:title', title],
            ['twitter:description', 'name', 'twitter:description', description],
            ['twitter:image', 'name', 'twitter:image', defaultImage]
        ]

        for (const [, key, value, content] of meta) {
            if (!hasMeta(context.head, key, value)) {
                head.push(['meta', { [key]: value, content }])
            }
        }

        if (!pageData.isNotFound) {
            const person = {
                '@type': 'Person',
                '@id': `${hostname}/#person`,
                name: '黄健楸',
                alternateName: 'Gantrol',
                url: `${hostname}/`
            }
            const website = {
                '@type': 'WebSite',
                '@id': `${hostname}/#website`,
                name: siteName,
                alternateName: "Gantrol's Blog",
                url: `${hostname}/`,
                inLanguage: ['zh-Hans', 'en-US'],
                publisher: { '@id': person['@id'] }
            }
            const webpage: Record<string, unknown> = {
                '@type': 'WebPage',
                '@id': `${url}#webpage`,
                url,
                name: title,
                description,
                inLanguage: language,
                isPartOf: { '@id': website['@id'] },
                author: { '@id': person['@id'] }
            }
            if (pageData.lastUpdated) {
                webpage.dateModified = new Date(pageData.lastUpdated).toISOString()
            }

            head.push([
                'script',
                { type: 'application/ld+json' },
                JSON.stringify({
                    '@context': 'https://schema.org',
                    '@graph': [person, website, webpage]
                })
            ])
        }

        return head
    },

    transformHtml(code) {
        return code.replace('<div class="VPContent', '<div role="main" class="VPContent')
    },

    head: [
        ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
        ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        ['link', { rel: 'apple-touch-icon', href: '/avatar.png' }],
        ['meta', { name: 'theme-color', content: '#f8f7f3' }],
        ['meta', { name: 'author', content: '黄健楸（Gantrol）' }],
        ['meta', { name: 'google-adsense-account', content: 'ca-pub-4459589195034801' }],
        ['meta', { name: 'twitter:site', content: '@gantrols' }],
        ['meta', { name: 'twitter:creator', content: '@gantrols' }],
        [
            'script',
            {
                async: '',
                src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4459589195034801',
                crossorigin: 'anonymous'
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
        logo: '/avatar.png',
        siteTitle: 'Gantrol',

        socialLinks: [
            { icon: 'github', link: 'https://github.com/gantrol/gantrol-blog' }
        ],

        search: {
            provider: 'local',
            options: {
                locales: { ...zhSearch }
            }
        }
    }
})
