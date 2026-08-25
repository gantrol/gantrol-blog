import { promises as fs } from 'node:fs'
import path from 'node:path'

const workspaceRoot = process.cwd()
const researchRoot = path.join(workspaceRoot, 'docs', 'research', 'why')
const generatedRoot = path.join(researchRoot, 'generated')
const metadataPath = path.join(generatedRoot, 'crossref-metadata.json')
const bibtexPath = path.join(generatedRoot, 'references.generated.bib')

const readableExtensions = new Set(['.md', '.csv', '.bib'])
const doiPattern = /10\.\d{4,9}\/[A-Z0-9][A-Z0-9._;()/:+-]*/gi

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (entry.name === 'generated') continue

    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...await walk(fullPath))
    } else if (readableExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath)
    }
  }

  return files
}

function normalizeDoi(candidate) {
  let doi = candidate.trim().replace(/[.,;:'"\]}]+$/g, '')

  while (doi.endsWith(')')) {
    const opens = [...doi].filter((character) => character === '(').length
    const closes = [...doi].filter((character) => character === ')').length
    if (closes <= opens) break
    doi = doi.slice(0, -1)
  }

  return doi.toLowerCase()
}

async function collectDois() {
  const files = await walk(researchRoot)
  const dois = new Set()

  for (const file of files) {
    const content = await fs.readFile(file, 'utf8')
    for (const match of content.matchAll(doiPattern)) {
      dois.add(normalizeDoi(match[0]))
    }
  }

  return {
    files: files.map((file) => path.relative(workspaceRoot, file).replaceAll('\\', '/')),
    dois: [...dois].sort(),
  }
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

async function fetchCrossref(doi) {
  const url = `https://api.crossref.org/works/${encodeURIComponent(doi)}`

  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'gantrol-why-research/0.1 (+https://gantrol.com)',
        },
      })

      if (response.ok) {
        const payload = await response.json()
        return { ok: true, message: payload.message }
      }

      if (response.status !== 429 && response.status < 500) {
        return { ok: false, error: `HTTP ${response.status}` }
      }
    } catch (error) {
      if (attempt === 3) {
        return { ok: false, error: error instanceof Error ? error.message : String(error) }
      }
    }

    await wait(500 * (2 ** attempt))
  }

  return { ok: false, error: 'request failed after retries' }
}

function firstDatePart(message) {
  const candidates = [message['published-print'], message.published, message.issued, message['published-online']]
  for (const candidate of candidates) {
    const dateParts = candidate?.['date-parts']?.[0]
    if (dateParts?.[0]) return dateParts
  }
  return []
}

function cleanText(value) {
  return String(value ?? '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeWork(message, sourceDoi) {
  const dateParts = firstDatePart(message)
  const canonicalDoi = String(message.DOI ?? sourceDoi).toLowerCase()
  return {
    doi: sourceDoi,
    canonicalDoi,
    title: cleanText(message.title?.[0]),
    subtitle: cleanText(message.subtitle?.[0]),
    authors: (message.author ?? []).map((author) => ({
      given: cleanText(author.given),
      family: cleanText(author.family),
      orcid: cleanText(author.ORCID),
    })),
    editors: (message.editor ?? []).map((editor) => ({
      given: cleanText(editor.given),
      family: cleanText(editor.family),
      orcid: cleanText(editor.ORCID),
    })),
    year: dateParts[0] ?? null,
    dateParts,
    type: cleanText(message.type),
    containerTitle: cleanText(message['container-title']?.[0]),
    publisher: cleanText(message.publisher),
    volume: cleanText(message.volume),
    issue: cleanText(message.issue),
    pages: cleanText(message.page),
    articleNumber: cleanText(message['article-number']),
    issn: message.ISSN ?? [],
    isbn: message.ISBN ?? [],
    url: `https://doi.org/${sourceDoi}`,
    licenses: (message.license ?? []).map((license) => ({
      url: cleanText(license.URL),
      start: license.start?.['date-time'] ?? null,
      delayInDays: license['delay-in-days'] ?? null,
    })),
    referenceCount: message['reference-count'] ?? null,
    citedByCount: message['is-referenced-by-count'] ?? null,
  }
}

function slug(value) {
  return cleanText(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
}

function citekeyFor(work, usedKeys) {
  const family = slug(work.authors[0]?.family || work.editors[0]?.family || 'anonymous') || 'anonymous'
  const year = work.year ?? 'nd'
  const titleWords = work.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 3 && !['with', 'from', 'that', 'this', 'their', 'between', 'effects', 'effect', 'review', 'analysis', 'meta'].includes(word))
  const titlePart = slug(titleWords[0] || 'work') || 'work'
  const base = `${family}${year}${titlePart}`

  let key = base
  let suffix = 1
  while (usedKeys.has(key)) {
    suffix += 1
    key = `${base}${suffix}`
  }
  usedKeys.add(key)
  return key
}

function bibtexValue(value) {
  return cleanText(value)
    .replace(/[{}]/g, '')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/#/g, '\\#')
}

function bibtexType(type) {
  if (type === 'book-chapter' || type === 'reference-entry') return 'incollection'
  if (type === 'proceedings-article') return 'inproceedings'
  if (type === 'book' || type === 'monograph') return 'book'
  if (type === 'dissertation') return 'phdthesis'
  return 'article'
}

function workToBibtex(work, usedKeys) {
  const key = citekeyFor(work, usedKeys)
  const people = work.authors.length > 0 ? work.authors : work.editors
  const author = people
    .map((person) => [person.family, person.given].filter(Boolean).join(', '))
    .join(' and ')
  const fields = [
    ['author', author],
    ['title', work.subtitle ? `${work.title}: ${work.subtitle}` : work.title],
    [work.type === 'book-chapter' ? 'booktitle' : 'journal', work.containerTitle],
    ['year', work.year],
    ['volume', work.volume],
    ['number', work.issue],
    ['pages', work.pages || work.articleNumber],
    ['publisher', work.publisher],
    ['doi', work.doi],
    ['url', `https://doi.org/${work.doi}`],
  ].filter(([, value]) => value !== null && value !== undefined && String(value).trim() !== '')

  const lines = fields.map(([name, value]) => `  ${name} = {${bibtexValue(value)}},`)
  if (lines.length > 0) lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, '')

  return `@${bibtexType(work.type)}{${key},\n${lines.join('\n')}\n}`
}

async function main() {
  await fs.mkdir(generatedRoot, { recursive: true })
  const collected = await collectDois()
  let cachedWorks = new Map()
  try {
    const cachedMetadata = JSON.parse(await fs.readFile(metadataPath, 'utf8'))
    cachedWorks = new Map((cachedMetadata.works ?? []).map((work) => [work.doi, work]))
  } catch {
    cachedWorks = new Map()
  }

  const forceRefresh = process.env.WHY_REFERENCES_REFRESH === '1'
  const pendingDois = forceRefresh ? collected.dois : collected.dois.filter((doi) => !cachedWorks.has(doi))
  const results = new Array(pendingDois.length)
  let nextIndex = 0

  async function worker() {
    while (true) {
      const index = nextIndex
      nextIndex += 1
      if (index >= pendingDois.length) return

      const doi = pendingDois[index]
      results[index] = { doi, ...await fetchCrossref(doi) }
      if ((index + 1) % 25 === 0) {
        process.stdout.write(`Fetched ${index + 1}/${pendingDois.length} uncached DOI records\n`)
      }
    }
  }

  await Promise.all(Array.from({ length: 5 }, () => worker()))

  const fetchedWorkMap = new Map(results
    .filter((result) => result.ok)
    .map((result) => [result.doi, normalizeWork(result.message, result.doi)]))
  const works = collected.dois
    .map((doi) => fetchedWorkMap.get(doi) ?? cachedWorks.get(doi))
    .filter(Boolean)
    .sort((left, right) => left.doi.localeCompare(right.doi))
  const failures = results
    .filter((result) => !result.ok && !cachedWorks.has(result.doi))
    .map(({ doi, error }) => ({ doi, error }))

  const metadata = {
    generatedAt: new Date().toISOString(),
    provider: 'Crossref REST API',
    sourceFiles: collected.files,
    requestedDoiCount: collected.dois.length,
    resolvedWorkCount: works.length,
    failedDoiCount: failures.length,
    failures,
    works,
  }

  const usedKeys = new Set()
  const bibtex = [
    '% Generated from DOI links in docs/research/why.',
    `% Generated at ${metadata.generatedAt}.`,
    '% Re-run: node scripts/collect-why-references.mjs',
    '',
    ...works.map((work) => workToBibtex(work, usedKeys)),
    '',
  ].join('\n\n')

  await fs.writeFile(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`, 'utf8')
  await fs.writeFile(bibtexPath, bibtex, 'utf8')

  process.stdout.write(`Resolved ${works.length}/${collected.dois.length} DOI records.\n`)
  if (failures.length > 0) {
    process.stdout.write(`Unresolved DOI records: ${failures.length}. See ${path.relative(workspaceRoot, metadataPath)}.\n`)
  }
}

await main()
