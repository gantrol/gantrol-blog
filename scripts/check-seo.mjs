import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

const root = resolve(process.cwd())
const dist = resolve(root, '.vitepress/dist')
const expectedOrigin = 'https://www.gantrol.com'
const defaultTitles = new Set(['黄健楸', 'Gantrol'])
const failures = []

const redirectRequirements = [
    {
        sources: ['/AI', '/AI/', '/AI/index.html'],
        destination: 'https://aicando.xyz/ai/'
    },
    {
        sources: ['/AI/use/svg', '/AI/use/svg/', '/AI/use/svg/index.html'],
        destination: 'https://aicando.xyz/image/in-use/icon/'
    },
    {
        sources: [
            '/AI/TOP1',
            '/AI/TOP1/',
            '/AI/TOP1.html',
            '/en/AI/TOP1',
            '/en/AI/TOP1/',
            '/en/AI/TOP1.html'
        ],
        destination: 'https://aicando.xyz/'
    },
    {
        sources: ['/software/WE/copy', '/software/WE/copy/', '/software/WE/copy/index.html'],
        destination: '/software/WE/copy/environment'
    }
]

const homepageProjectHrefs = {
    '/': [
        'https://timeline.aicando.xyz/',
        'https://aicando.xyz/',
        'https://github.com/gantrol/AgentController',
        'https://github.com/gantrol/paopao-desktop',
        'https://markdown.aicando.xyz/',
        `${expectedOrigin}/products/aiy/`
    ],
    '/en/': [
        'https://timeline.aicando.xyz/',
        'https://aicando.xyz/',
        'https://github.com/gantrol/AgentController',
        'https://github.com/gantrol/paopao-desktop',
        'https://markdown.aicando.xyz/',
        'https://github.com/gantrol/aiy-desktop'
    ]
}

if (!existsSync(dist)) {
    console.error('SEO check needs a production build. Run `npm run build` first.')
    process.exit(1)
}

function walk(directory) {
    return readdirSync(directory).flatMap((name) => {
        const file = join(directory, name)
        return statSync(file).isDirectory() ? walk(file) : [file]
    })
}

function matches(value, expression) {
    return [...value.matchAll(expression)]
}

function fail(file, message) {
    failures.push(`${relative(root, file)}: ${message}`)
}

function decodeHtmlEntities(value) {
    const namedEntities = {
        amp: '&',
        apos: "'",
        gt: '>',
        lt: '<',
        nbsp: ' ',
        quot: '"'
    }

    return value.replace(/&(#x[\da-f]+|#\d+|amp|apos|gt|lt|nbsp|quot);/gi, (entity, body) => {
        if (body[0] === '#') {
            const hexadecimal = body[1].toLowerCase() === 'x'
            const codePoint = Number.parseInt(body.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10)
            return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : entity
        }
        return namedEntities[body.toLowerCase()] ?? entity
    })
}

function normalizeText(value) {
    return decodeHtmlEntities(value).replace(/\s+/g, ' ').trim()
}

function getAttribute(tag, name) {
    const expression = new RegExp(
        `\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'=<>]+))`,
        'i'
    )
    const match = tag.match(expression)
    if (!match) return undefined
    return decodeHtmlEntities(match[1] ?? match[2] ?? match[3] ?? '')
}

function stripNonRenderedContent(html) {
    return html
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/<(script|style|template)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
}

function normalizedUrl(value, base = expectedOrigin) {
    const url = new URL(decodeHtmlEntities(value), base)
    url.hash = ''
    return url.href
}

function isRedirectSource(pathname) {
    const redirect = redirectsBySource.get(pathname)
    return redirect ? ['301', '302', '303', '307', '308'].includes(redirect.status) : false
}

function encodedOutputPath(path) {
    return path
        .split('/')
        .map((segment) => encodeURIComponent(segment))
        .join('/')
}

function aliasesForHtml(file) {
    const outputPath = relative(dist, file).replaceAll('\\', '/')
    if (outputPath === 'index.html') return ['/', '/index.html']

    if (outputPath.endsWith('/index.html')) {
        const directory = encodedOutputPath(outputPath.slice(0, -'/index.html'.length))
        return [`/${directory}`, `/${directory}/`, `/${directory}/index.html`]
    }

    const pathWithoutExtension = encodedOutputPath(outputPath.slice(0, -'.html'.length))
    return [`/${pathWithoutExtension}`, `/${pathWithoutExtension}.html`]
}

function preferredPathForHtml(file) {
    const aliases = aliasesForHtml(file)
    return aliases.find((path) => path !== '/index.html' && !path.endsWith('/index.html')) ?? aliases[0]
}

function normalizePolicyPath(pathname) {
    if (pathname === '/') return pathname
    return pathname.replace(/\/$/, '')
}

function isPlannedNoindex(pathname) {
    const path = normalizePolicyPath(pathname)

    if (
        path === '/AI/eval/my-prompt' ||
        path === '/en/AI/eval/my-prompt' ||
        path === '/AI/eval/SWE-Lancer' ||
        path === '/AI/use/fck-lang' ||
        path === '/AI/use/git/commit' ||
        path === '/AI/use/git/diff-example' ||
        path === '/AI/use/how-to-chat/aistudio/prompt' ||
        path === '/AI/use/meme/openai_name_meme'
    ) {
        return true
    }

    if (path === '/AI/record/deepresearch/grok3' || path.startsWith('/AI/record/deepresearch/grok3/')) {
        return true
    }

    if (
        (path === '/AI/record/deepresearch/perplexity' ||
            path.startsWith('/AI/record/deepresearch/perplexity/')) &&
        path !== '/AI/record/deepresearch/perplexity/cpu'
    ) {
        return true
    }

    if (path === '/AI/record/gptdr' || path.startsWith('/AI/record/gptdr/')) return true
    if (path.startsWith('/AI/use/pdf/MarkdownCheatsheet')) return true
    if (path === '/content' || path.startsWith('/content/')) return true
    if (path === '/software/WE/test' || path.startsWith('/software/WE/test/')) return true
    if (path === '/embed' || path.startsWith('/embed/')) return true
    if (path === '/en/embed' || path.startsWith('/en/embed/')) return true

    return false
}

function markdownDescriptionArtifact(description) {
    const patterns = [
        /^#{1,6}\s+\S/,
        /^>\s*\S/,
        /^[*+-]\s+\S/,
        /```|~~~/,
        /:::/,
        /!\[[^\]]*\]\([^)]*\)/,
        /\[[^\]]+\]\([^)]*\)/,
        /\*\*|__|`/,
        /\|\s*:?-{3,}:?\s*\|/,
        /<\/?[a-z][^>]*>/i,
        /\$\$|\\\(|\\\[/
    ]

    return patterns.find((pattern) => pattern.test(description))
}

function robotsTokensFor(metaTags) {
    return metaTags
        .filter((tag) => getAttribute(tag, 'name')?.toLowerCase() === 'robots')
        .flatMap((tag) => (getAttribute(tag, 'content') ?? '').toLowerCase().split(/[\s,]+/))
        .filter(Boolean)
}

const redirectsFile = resolve(dist, '_redirects')
const redirectsBySource = new Map()

if (!existsSync(redirectsFile)) {
    fail(redirectsFile, 'missing Cloudflare Pages redirects')
} else {
    const redirectRows = readFileSync(redirectsFile, 'utf8')
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('#'))
        .map((line) => line.split(/\s+/))

    for (const [source, destination, status] of redirectRows) {
        if (!source || !destination || !status) {
            fail(redirectsFile, `invalid redirect row: ${[source, destination, status].filter(Boolean).join(' ')}`)
            continue
        }
        if (redirectsBySource.has(source)) fail(redirectsFile, `duplicate redirect source: ${source}`)
        redirectsBySource.set(source, { destination, status })
    }

    for (const requirement of redirectRequirements) {
        const expectedDestination = normalizedUrl(requirement.destination)
        for (const source of requirement.sources) {
            const redirect = redirectsBySource.get(source)
            if (!redirect) {
                fail(redirectsFile, `missing required 308 redirect for ${source}`)
                continue
            }

            let actualDestination
            try {
                actualDestination = normalizedUrl(redirect.destination)
            } catch {
                fail(redirectsFile, `invalid redirect destination for ${source}: ${redirect.destination}`)
                continue
            }

            if (redirect.status !== '308') {
                fail(redirectsFile, `redirect for ${source} must use 308, found ${redirect.status}`)
            }
            if (actualDestination !== expectedDestination) {
                fail(
                    redirectsFile,
                    `wrong redirect destination for ${source}: ${redirect.destination} (expected ${requirement.destination})`
                )
            }

            const target = new URL(actualDestination)
            if (target.origin === expectedOrigin && isRedirectSource(target.pathname)) {
                fail(redirectsFile, `redirect for ${source} creates another hop through ${target.pathname}`)
            }
        }
    }
}

const canonicalOwners = new Map()
const titleOwners = new Map()
const htmlFiles = walk(dist).filter((file) => file.endsWith('.html'))
const pages = []

for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8')
    const renderedHtml = stripNonRenderedContent(html)
    const is404 = file.endsWith('404.html')
    const titleMatches = matches(renderedHtml, /<title\b[^>]*>([\s\S]*?)<\/title>/gi)
    const metaTags = matches(renderedHtml, /<meta\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi)
        .map((match) => match[0])
    const linkTags = matches(renderedHtml, /<link\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi)
        .map((match) => match[0])
    const descriptions = metaTags.filter(
        (tag) => getAttribute(tag, 'name')?.toLowerCase() === 'description'
    )
    const canonicalTags = linkTags.filter((tag) =>
        (getAttribute(tag, 'rel') ?? '').toLowerCase().split(/\s+/).includes('canonical')
    )
    const hreflangAlternates = linkTags
        .filter((tag) => (
            (getAttribute(tag, 'rel') ?? '').toLowerCase().split(/\s+/).includes('alternate') &&
            getAttribute(tag, 'hreflang') !== undefined
        ))
        .map((tag) => ({
            href: getAttribute(tag, 'href') ?? '',
            hreflang: normalizeText(getAttribute(tag, 'hreflang') ?? '')
        }))
    const ogUrlTags = metaTags.filter(
        (tag) => getAttribute(tag, 'property')?.toLowerCase() === 'og:url'
    )
    const analyticsLoaders = matches(html, /googletagmanager\.com\/gtag\/js\?id=G-0P7S4MY6FW/gi)
    const robotsMetaTags = metaTags.filter(
        (tag) => getAttribute(tag, 'name')?.toLowerCase() === 'robots'
    )
    const robotsTokens = robotsTokensFor(metaTags)
    const aliases = new Set(aliasesForHtml(file))
    const title = titleMatches[0] ? normalizeText(titleMatches[0][1]) : ''
    const description = descriptions[0]
        ? normalizeText(getAttribute(descriptions[0], 'content') ?? '')
        : ''
    let canonical

    if (!/<html\b[^>]*\blang="(?:zh-Hans|en-US)"/i.test(renderedHtml)) {
        fail(file, 'missing supported html lang')
    }
    if (analyticsLoaders.length) {
        fail(file, `GA loader must be deferred from HTML, found ${analyticsLoaders.length}`)
    }

    if (is404) {
        if (canonicalTags.length) fail(file, '404 page must not declare a canonical')
        if (!robotsTokens.includes('noindex') || !robotsTokens.includes('nofollow')) {
            fail(file, '404 page must be noindex,nofollow')
        }
    } else {
        if (canonicalTags.length !== 1) {
            fail(file, `expected one canonical, found ${canonicalTags.length}`)
        } else {
            const canonicalValue = getAttribute(canonicalTags[0], 'href') ?? ''
            try {
                canonical = normalizedUrl(canonicalValue)
                const canonicalUrl = new URL(canonical)
                aliases.add(canonicalUrl.pathname)
                if (canonicalUrl.origin !== expectedOrigin) fail(file, `wrong canonical origin: ${canonical}`)
                const owner = canonicalOwners.get(canonical)
                if (owner) fail(file, `canonical also used by ${relative(root, owner)}`)
                canonicalOwners.set(canonical, file)
            } catch {
                fail(file, `invalid canonical URL: ${canonicalValue}`)
            }
        }

        if (ogUrlTags.length !== 1) fail(file, `expected one og:url, found ${ogUrlTags.length}`)
        if (canonical && ogUrlTags[0]) {
            const ogUrlValue = getAttribute(ogUrlTags[0], 'content') ?? ''
            try {
                if (normalizedUrl(ogUrlValue) !== canonical) fail(file, 'og:url does not match canonical')
            } catch {
                fail(file, `invalid og:url: ${ogUrlValue}`)
            }
        }
        if (!/type="application\/ld\+json"/i.test(html)) fail(file, 'missing JSON-LD')
    }

    const canonicalPath = canonical ? new URL(canonical).pathname : preferredPathForHtml(file)
    const redirected = [...aliases].some((path) => isRedirectSource(path))
    const noindex = robotsTokens.includes('noindex')
    const plannedNoindex = !is404 && !redirected && isPlannedNoindex(canonicalPath)
    const indexable = !is404 && !redirected && !noindex && !plannedNoindex
    const page = {
        aliases,
        canonical,
        canonicalPath,
        description,
        file,
        html,
        hreflangAlternates,
        indexable,
        is404,
        noindex,
        plannedNoindex,
        redirected,
        renderedHtml,
        robotsMetaTags,
        robotsTokens,
        title
    }
    pages.push(page)

    if (!is404 && !redirected) {
        if (plannedNoindex && robotsMetaTags.length !== 1) {
            fail(file, `approved noindex route needs one robots meta tag, found ${robotsMetaTags.length}`)
        }
        if (plannedNoindex && !noindex) fail(file, 'approved route policy requires noindex,follow')
        if (plannedNoindex && (!robotsTokens.includes('follow') || robotsTokens.includes('nofollow'))) {
            fail(file, 'approved noindex route must use noindex,follow')
        }
        if (!plannedNoindex && noindex) fail(file, 'unexpected noindex outside the approved route policy')
    }

    if (indexable) {
        if (titleMatches.length !== 1 || !title) fail(file, 'indexable page needs one non-empty <title>')
        if (descriptions.length !== 1 || !description) {
            fail(file, 'indexable page needs one non-empty meta description')
        }
        if (title) {
            if (defaultTitles.has(title)) fail(file, `indexable page uses default title: ${title}`)
            const titleOwner = titleOwners.get(title)
            if (titleOwner) {
                fail(file, `indexable title also used by ${relative(root, titleOwner)}: ${title}`)
            }
            titleOwners.set(title, file)
        }

        const startTags = matches(
            renderedHtml,
            /<([a-z][\w:-]*)\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi
        )
        const h1Count = startTags.filter((match) => match[1].toLowerCase() === 'h1').length
        const mainCount = startTags.filter((match) => {
            if (match[1].toLowerCase() === 'main') return true
            return (getAttribute(match[0], 'role') ?? '').toLowerCase().split(/\s+/).includes('main')
        }).length

        if (h1Count !== 1) fail(file, `indexable page must have exactly one SSR H1, found ${h1Count}`)
        if (mainCount !== 1) {
            fail(file, `indexable page must have exactly one main landmark, found ${mainCount}`)
        }

        const artifact = markdownDescriptionArtifact(description)
        if (artifact) fail(file, `meta description contains Markdown/HTML residue matching ${artifact}`)
    }
}

const pageByPath = new Map()
for (const page of pages) {
    for (const alias of page.aliases) {
        const existing = pageByPath.get(alias)
        if (existing && existing.file !== page.file) {
            fail(page.file, `built URL alias ${alias} also resolves to ${relative(root, existing.file)}`)
        } else {
            pageByPath.set(alias, page)
        }
    }
}

const alternateHrefsByFile = new Map()
const resolvedAlternatesByFile = new Map()

for (const page of pages) {
    const baseUrl = page.canonical ?? `${expectedOrigin}${preferredPathForHtml(page.file)}`
    const seenLanguages = new Map()
    const sameOriginHrefs = new Set()
    const resolvedAlternates = []

    alternateHrefsByFile.set(page.file, sameOriginHrefs)
    resolvedAlternatesByFile.set(page.file, resolvedAlternates)

    if (page.hreflangAlternates.length && !page.indexable) {
        fail(page.file, 'redirected/noindex page must not publish hreflang alternates')
    }

    for (const alternate of page.hreflangAlternates) {
        const language = alternate.hreflang.toLowerCase()
        if (!language) fail(page.file, 'hreflang alternate has an empty language')
        if (!alternate.href) {
            fail(page.file, `hreflang ${alternate.hreflang || '(empty)'} has an empty href`)
            continue
        }

        if (seenLanguages.has(language)) {
            fail(
                page.file,
                `duplicate hreflang ${alternate.hreflang || '(empty)'} (also points to ${seenLanguages.get(language)})`
            )
        } else {
            seenLanguages.set(language, alternate.href)
        }

        let targetUrl
        try {
            targetUrl = new URL(normalizedUrl(alternate.href, baseUrl))
        } catch {
            fail(page.file, `invalid hreflang ${alternate.hreflang} href: ${alternate.href}`)
            continue
        }

        if (
            (targetUrl.hostname === 'gantrol.com' || targetUrl.hostname === 'www.gantrol.com') &&
            targetUrl.origin !== expectedOrigin
        ) {
            fail(
                page.file,
                `same-site hreflang ${alternate.hreflang} must use ${expectedOrigin}: ${alternate.href}`
            )
            continue
        }
        if (targetUrl.origin !== expectedOrigin) continue

        sameOriginHrefs.add(targetUrl.href)

        if (isRedirectSource(targetUrl.pathname)) {
            fail(
                page.file,
                `hreflang ${alternate.hreflang} points to redirect source: ${alternate.href}`
            )
            continue
        }

        const targetPage = pageByPath.get(targetUrl.pathname)
        if (!targetPage) {
            fail(
                page.file,
                `hreflang ${alternate.hreflang} does not resolve to built HTML: ${alternate.href}`
            )
            continue
        }

        resolvedAlternates.push({ alternate, targetPage, targetUrl })

        if (!targetPage.indexable) {
            fail(
                page.file,
                `hreflang ${alternate.hreflang} points to redirected/noindex HTML: ${alternate.href}`
            )
        }
        if (targetPage.canonical !== targetUrl.href) {
            fail(
                page.file,
                `hreflang ${alternate.hreflang} target is not self-canonical: ${alternate.href}`
            )
        }
    }
}

for (const page of pages) {
    if (!page.canonical || !page.indexable) continue

    for (const { alternate, targetPage, targetUrl } of resolvedAlternatesByFile.get(page.file) ?? []) {
        if (!targetPage.indexable || targetPage.canonical !== targetUrl.href) continue
        if (!alternateHrefsByFile.get(targetPage.file)?.has(page.canonical)) {
            fail(
                page.file,
                `hreflang ${alternate.hreflang} target does not link back to ${page.canonical}`
            )
        }
    }
}

for (const requirement of redirectRequirements) {
    const destination = new URL(normalizedUrl(requirement.destination))
    if (destination.origin === expectedOrigin) {
        const destinationPage = pageByPath.get(destination.pathname)
        if (!destinationPage) {
            fail(
                redirectsFile,
                `same-origin redirect destination does not resolve to built HTML: ${requirement.destination}`
            )
        } else {
            if (!destinationPage.indexable) {
                fail(redirectsFile, `same-origin redirect destination is not indexable: ${requirement.destination}`)
            }
            if (destinationPage.canonical !== destination.href) {
                fail(
                    redirectsFile,
                    `same-origin redirect destination is not self-canonical: ${requirement.destination}`
                )
            }
        }
    }
}

const deferredAnalyticsLoaders = walk(dist)
    .filter((file) => file.endsWith('.js'))
    .flatMap((file) => (
        matches(
            readFileSync(file, 'utf8'),
            /googletagmanager\.com\/gtag\/js\?id=G-0P7S4MY6FW/gi
        ).map(() => file)
    ))

if (deferredAnalyticsLoaders.length !== 1) {
    fail(
        dist,
        `expected one deferred GA loader in client bundles, found ${deferredAnalyticsLoaders.length}`
    )
}

const robotsFile = resolve(dist, 'robots.txt')
const sitemapFile = resolve(dist, 'sitemap.xml')
const sitemapUrls = new Set()
const sitemapPages = new Map()

if (!existsSync(robotsFile)) {
    fail(robotsFile, 'missing robots.txt')
} else if (!readFileSync(robotsFile, 'utf8').includes(`Sitemap: ${expectedOrigin}/sitemap.xml`)) {
    fail(robotsFile, 'missing canonical sitemap declaration')
}

if (!existsSync(sitemapFile)) {
    fail(sitemapFile, 'missing sitemap.xml')
} else {
    const sitemap = readFileSync(sitemapFile, 'utf8')
    const locations = matches(sitemap, /<loc>([^<]+)<\/loc>/gi).map((match) =>
        decodeHtmlEntities(match[1].trim())
    )
    if (!locations.length) fail(sitemapFile, 'sitemap has no URLs')

    for (const location of locations) {
        let locationUrl
        try {
            locationUrl = new URL(location)
        } catch {
            fail(sitemapFile, `invalid sitemap URL: ${location}`)
            continue
        }

        if (locationUrl.origin !== expectedOrigin) fail(sitemapFile, `wrong URL origin: ${location}`)
        if (sitemapUrls.has(locationUrl.href)) fail(sitemapFile, `duplicate sitemap URL: ${location}`)
        sitemapUrls.add(locationUrl.href)

        if (isRedirectSource(locationUrl.pathname)) {
            fail(sitemapFile, `redirect source must not remain in sitemap: ${location}`)
        }

        const page = pageByPath.get(locationUrl.pathname)
        if (!page) {
            fail(sitemapFile, `URL does not map to built HTML: ${location}`)
            continue
        }
        sitemapPages.set(locationUrl.href, page)

        if (!page.canonical) {
            fail(sitemapFile, `URL has no canonical: ${location}`)
        } else if (page.canonical !== locationUrl.href) {
            fail(sitemapFile, `URL is not self-canonical: ${location} (canonical ${page.canonical})`)
        }
        if (page.noindex || page.plannedNoindex) {
            fail(sitemapFile, `noindex URL must not remain in sitemap: ${location}`)
        }
        if (page.redirected) fail(sitemapFile, `redirected URL must not remain in sitemap: ${location}`)
    }
}

for (const page of pages) {
    if (!page.canonical || page.is404) continue
    if (page.indexable && !sitemapUrls.has(page.canonical)) {
        fail(page.file, `indexable canonical missing from sitemap: ${page.canonical}`)
    }
    if (page.noindex && sitemapUrls.has(page.canonical)) {
        fail(page.file, `noindex canonical must not appear in sitemap: ${page.canonical}`)
    }
    if (page.redirected && sitemapUrls.has(page.canonical)) {
        fail(page.file, `redirected canonical must not appear in sitemap: ${page.canonical}`)
    }
}

const incomingLinks = new Map(pages.map((page) => [page.file, new Set()]))
const reportedBrokenLinks = new Set()

for (const sourcePage of pages) {
    const sourceUrl = sourcePage.canonical ?? `${expectedOrigin}${preferredPathForHtml(sourcePage.file)}`
    const anchorTags = matches(
        sourcePage.renderedHtml,
        /<a\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi
    ).map((match) => match[0])

    for (const anchorTag of anchorTags) {
        const href = getAttribute(anchorTag, 'href')
        if (href === undefined) continue

        let targetUrl
        try {
            targetUrl = new URL(href, sourceUrl)
        } catch {
            const key = `${sourcePage.file}\0${href}`
            if (!reportedBrokenLinks.has(key)) {
                fail(sourcePage.file, `invalid anchor href: ${href}`)
                reportedBrokenLinks.add(key)
            }
            continue
        }

        if (targetUrl.hostname === 'www.aicando.xyz') {
            const key = `${sourcePage.file}\0${targetUrl.href}`
            if (!reportedBrokenLinks.has(key)) {
                fail(sourcePage.file, `AICanDo link must use its canonical host without www: ${href}`)
                reportedBrokenLinks.add(key)
            }
            continue
        }

        if (targetUrl.origin !== expectedOrigin) continue
        if (isRedirectSource(targetUrl.pathname)) continue

        const targetPage = pageByPath.get(targetUrl.pathname)
        if (!targetPage) {
            const key = `${sourcePage.file}\0${targetUrl.pathname}`
            if (!reportedBrokenLinks.has(key)) {
                fail(sourcePage.file, `static internal link does not resolve to built HTML or a redirect: ${href}`)
                reportedBrokenLinks.add(key)
            }
            continue
        }

        if (
            sourcePage.indexable &&
            targetPage.indexable &&
            sourcePage.file !== targetPage.file
        ) {
            incomingLinks.get(targetPage.file).add(sourcePage.file)
        }
    }
}

for (const [location, page] of sitemapPages) {
    if (page.indexable && (incomingLinks.get(page.file)?.size ?? 0) === 0) {
        fail(page.file, `sitemap URL has no static internal inlink from another indexable page: ${location}`)
    }
}

for (const [homepagePath, expectedHrefs] of Object.entries(homepageProjectHrefs)) {
    const homepage = pageByPath.get(homepagePath)
    if (!homepage) {
        fail(dist, `missing built homepage for ${homepagePath}`)
        continue
    }

    const projectAnchors = matches(
        homepage.renderedHtml,
        /<a\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi
    ).map((match) => match[0]).filter((tag) =>
        (getAttribute(tag, 'class') ?? '').split(/\s+/).includes('project-cookie')
    )
    if (projectAnchors.length !== expectedHrefs.length) {
        fail(
            homepage.file,
            `homepage SSR needs ${expectedHrefs.length} project anchors, found ${projectAnchors.length}`
        )
    }

    const actualHrefs = new Set(
        projectAnchors
            .map((tag) => getAttribute(tag, 'href'))
            .filter((href) => href !== undefined)
            .map((href) => {
                try {
                    return normalizedUrl(href, homepage.canonical ?? `${expectedOrigin}${homepagePath}`)
                } catch {
                    return undefined
                }
            })
            .filter(Boolean)
    )

    for (const expectedHref of expectedHrefs) {
        const normalizedExpectedHref = normalizedUrl(expectedHref)
        if (!actualHrefs.has(normalizedExpectedHref)) {
            fail(homepage.file, `homepage SSR is missing project href: ${expectedHref}`)
        }
    }
}

if (failures.length) {
    console.error(`SEO check failed with ${failures.length} issue(s):`)
    for (const failure of failures) console.error(`- ${failure}`)
    process.exit(1)
}

console.log(
    `SEO check passed: ${htmlFiles.length} HTML files, ${sitemapUrls.size} sitemap URLs, redirects, links, and analytics validated.`
)
