import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

const root = resolve(process.cwd())
const dist = resolve(root, '.vitepress/dist')
const expectedOrigin = 'https://www.gantrol.com'
const migratedDestination = 'https://www.aicando.xyz/'
const migratedPaths = [
    '/AI/TOP1',
    '/AI/TOP1/',
    '/AI/TOP1.html',
    '/en/AI/TOP1',
    '/en/AI/TOP1/',
    '/en/AI/TOP1.html'
]
const failures = []

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

function matches(html, expression) {
    return [...html.matchAll(expression)]
}

function fail(file, message) {
    failures.push(`${relative(root, file)}: ${message}`)
}

const canonicalOwners = new Map()
const htmlFiles = walk(dist).filter((file) => file.endsWith('.html'))

for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8')
    const is404 = file.endsWith('404.html')
    const titles = matches(html, /<title>([^<]+)<\/title>/gi)
    const descriptions = matches(html, /<meta\s+name="description"\s+content="([^"]+)"/gi)
    const canonicals = matches(html, /<link\s+rel="canonical"\s+href="([^"]+)"/gi)
    const ogUrls = matches(html, /<meta\s+property="og:url"\s+content="([^"]+)"/gi)
    const analyticsLoaders = matches(html, /googletagmanager\.com\/gtag\/js\?id=G-0P7S4MY6FW/gi)

    if (titles.length !== 1 || !titles[0][1].trim()) fail(file, 'expected one non-empty <title>')
    if (descriptions.length !== 1 || !descriptions[0][1].trim()) fail(file, 'expected one meta description')
    if (!/<html\s+lang="(?:zh-Hans|en-US)"/i.test(html)) fail(file, 'missing supported html lang')
    if (!is404 && !/<main\b|role="main"/i.test(html)) fail(file, 'missing main landmark')
    if (analyticsLoaders.length !== 1) fail(file, `expected one GA loader, found ${analyticsLoaders.length}`)

    if (is404) {
        if (canonicals.length) fail(file, '404 page must not declare a canonical')
        if (!/<meta\s+name="robots"\s+content="noindex,nofollow"/i.test(html)) {
            fail(file, '404 page must be noindex,nofollow')
        }
        continue
    }

    if (canonicals.length !== 1) {
        fail(file, `expected one canonical, found ${canonicals.length}`)
    } else {
        const canonical = canonicals[0][1]
        if (!canonical.startsWith(`${expectedOrigin}/`)) fail(file, `wrong canonical origin: ${canonical}`)
        const owner = canonicalOwners.get(canonical)
        if (owner) fail(file, `canonical also used by ${relative(root, owner)}`)
        canonicalOwners.set(canonical, file)
    }

    if (ogUrls.length !== 1) fail(file, `expected one og:url, found ${ogUrls.length}`)
    if (canonicals[0] && ogUrls[0] && canonicals[0][1] !== ogUrls[0][1]) {
        fail(file, 'og:url does not match canonical')
    }
    if (!/type="application\/ld\+json"/i.test(html)) fail(file, 'missing JSON-LD')
}

const robotsFile = resolve(dist, 'robots.txt')
const sitemapFile = resolve(dist, 'sitemap.xml')

if (!existsSync(robotsFile)) {
    fail(robotsFile, 'missing robots.txt')
} else if (!readFileSync(robotsFile, 'utf8').includes(`Sitemap: ${expectedOrigin}/sitemap.xml`)) {
    fail(robotsFile, 'missing canonical sitemap declaration')
}

if (!existsSync(sitemapFile)) {
    fail(sitemapFile, 'missing sitemap.xml')
} else {
    const sitemap = readFileSync(sitemapFile, 'utf8')
    const locations = matches(sitemap, /<loc>([^<]+)<\/loc>/gi).map((match) => match[1])
    if (!locations.length) fail(sitemapFile, 'sitemap has no URLs')
    for (const location of locations) {
        if (!location.startsWith(`${expectedOrigin}/`)) fail(sitemapFile, `wrong URL origin: ${location}`)
        if (migratedPaths.some((path) => location === `${expectedOrigin}${path}`)) {
            fail(sitemapFile, `migrated URL must not remain in sitemap: ${location}`)
        }
    }
}

const redirectsFile = resolve(dist, '_redirects')
if (!existsSync(redirectsFile)) {
    fail(redirectsFile, 'missing Cloudflare Pages redirects')
} else {
    const redirects = readFileSync(redirectsFile, 'utf8')
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('#'))
        .map((line) => line.split(/\s+/))

    for (const path of migratedPaths) {
        const redirect = redirects.find(([source]) => source === path)
        if (!redirect || redirect[1] !== migratedDestination || redirect[2] !== '308') {
            fail(redirectsFile, `missing permanent AiCanDo redirect for ${path}`)
        }
    }
}

if (failures.length) {
    console.error(`SEO check failed with ${failures.length} issue(s):`)
    for (const failure of failures) console.error(`- ${failure}`)
    process.exit(1)
}

console.log(`SEO check passed: ${htmlFiles.length} HTML files and sitemap/robots validated.`)
