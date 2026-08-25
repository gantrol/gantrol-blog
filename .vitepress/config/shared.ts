import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type HeadConfig, type PageData } from 'vitepress'
import { search as zhSearch } from './zh'
import { getSeoPolicy } from './seo-policy'
import footnote from 'markdown-it-footnote'

const hostname = 'https://www.gantrol.com'
const siteName = '计算之心'
const defaultImage = `${hostname}/avatar.png`
const sourceRoot = resolve(process.cwd(), 'src')
const excludedSourcePaths = new Set([
    'en/AI/use/image/compress.md',
    'AI/TOP1.md',
    'en/AI/TOP1.md'
])
const socialIconCss = `.vpi-social-github{--icon:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'/%3E%3C/svg%3E")}`

function getPageUrl(relativePath: string): string {
    const pagePath = relativePath
        .replace(/\.md$/, '')
        .replace(/(^|\/)index$/, '$1')

    return new URL(pagePath ? `/${pagePath}` : '/', hostname).href
}

function sourceExists(relativePath: string): boolean {
    return !excludedSourcePaths.has(relativePath) && existsSync(resolve(sourceRoot, relativePath))
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
        .replace(/^\s*:::\s*(?:info|tip|warning|danger|details|raw)?\s*/gim, '')
        .replace(/^\s*(?:>\s*)+/gm, '')
        .replace(/^\s*#{1,6}\s+/gm, '')
        .replace(/^\s*(?:[-+]\s+|\d+\.\s+)/gm, '')
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
    // The site is intentionally light-only. Do not follow the OS theme or persist a dark preference.
    appearance: false,

    // This draft page references a component that is not in the repository yet.
    // Keep it out of production until the page and component can ship together.
    srcExclude: [...excludedSourcePaths],
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
                getSeoPolicy(item.url) === 'index' &&
                !item.url.includes('migration') &&
                !/(^|\/)embed\//.test(item.url)
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
        const localizedSiteName = isEnglish ? 'Gantrol' : siteName
        const defaultImageAlt = isEnglish ? 'Gantrol logo' : `${siteName} 标志`
        const title = context.title || pageData.title || siteName
        const description = context.description || pageData.description
        const seoPolicy = getSeoPolicy(pageData.relativePath)

        if (pageData.isNotFound) {
            if (!hasMeta(context.head, 'name', 'robots')) {
                head.push(['meta', { name: 'robots', content: 'noindex,nofollow' }])
            }
        } else if (seoPolicy !== 'index') {
            if (!hasMeta(context.head, 'name', 'robots')) {
                head.push(['meta', { name: 'robots', content: 'noindex,follow' }])
            }
        } else if (!hasLink(context.head, 'canonical')) {
            head.push(['link', { rel: 'canonical', href: url }])
        }

        if (!pageData.isNotFound && seoPolicy !== 'index' && !hasLink(context.head, 'canonical')) {
            head.push(['link', { rel: 'canonical', href: url }])
        }

        if (seoPolicy === 'index') {
            for (const alternate of getLanguageAlternates(pageData.relativePath)) {
                head.push(['link', { rel: 'alternate', ...alternate }])
            }
        }

        const meta: Array<[string, 'name' | 'property', string, string]> = [
            ['og:type', 'property', 'og:type', 'website'],
            ['og:locale', 'property', 'og:locale', locale],
            ['og:site_name', 'property', 'og:site_name', localizedSiteName],
            ['og:url', 'property', 'og:url', url],
            ['og:title', 'property', 'og:title', title],
            ['og:description', 'property', 'og:description', description],
            ['og:image', 'property', 'og:image', defaultImage],
            ['og:image:alt', 'property', 'og:image:alt', defaultImageAlt],
            ['twitter:card', 'name', 'twitter:card', 'summary_large_image'],
            ['twitter:title', 'name', 'twitter:title', title],
            ['twitter:description', 'name', 'twitter:description', description],
            ['twitter:image', 'name', 'twitter:image', defaultImage],
            ['twitter:image:alt', 'name', 'twitter:image:alt', defaultImageAlt]
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
        return code
            .replace(
                /<link rel="preload" href="\/assets\/inter-roman-latin\.[^"]+\.woff2"[^>]*>/,
                ''
            )
            .replace(
                '<link rel="preload stylesheet" href="/vp-icons.css" as="style">',
                `<style>${socialIconCss}</style>`
            )
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
    ],

    themeConfig: {
        logo: '/avatar-ui.webp',
        siteTitle: 'Gantrol',
        i18nRouting: false,

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
