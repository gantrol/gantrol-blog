export type SeoPolicy = 'index' | 'noindex' | 'redirect'

const redirectPaths = new Set([
  '/AI',
  '/AI/TOP1',
  '/AI/use/svg',
  '/software/WE/copy'
])

const noindexPaths = new Set([
  '/AI/eval/my-prompt',
  '/en/AI/eval/my-prompt',
  '/AI/eval/SWE-Lancer',
  '/AI/use/fck-lang',
  '/AI/use/git/commit',
  '/AI/use/git/diff-example',
  '/AI/use/how-to-chat/aistudio/prompt',
  '/AI/use/meme/openai_name_meme'
])

const noindexPrefixes = [
  '/AI/record/deepresearch/grok3',
  '/AI/record/gptdr',
  '/content',
  '/software/WE/test',
  '/embed',
  '/en/embed'
]

const indexExceptions = new Set([
  '/AI/record/deepresearch/perplexity/cpu'
])

export function normalizeSeoPath(value: string): string {
  let path = value.trim().replace(/\\/g, '/')

  if (/^https?:\/\//i.test(path)) {
    path = new URL(path).pathname
  }

  path = path.split(/[?#]/, 1)[0]
  path = path.replace(/\.(?:md|html)$/i, '')
  path = path.replace(/\/index$/i, '')
  path = `/${path.replace(/^\/+/, '')}`

  if (path !== '/') path = path.replace(/\/+$/, '')

  try {
    return decodeURIComponent(path)
  } catch {
    return path
  }
}

export function getSeoPolicy(value: string): SeoPolicy {
  const path = normalizeSeoPath(value)

  if (redirectPaths.has(path)) return 'redirect'
  if (indexExceptions.has(path)) return 'index'
  if (noindexPaths.has(path)) return 'noindex'
  if (path.startsWith('/AI/use/pdf/MarkdownCheatsheet')) return 'noindex'
  if (path.startsWith('/AI/record/deepresearch/perplexity')) return 'noindex'
  if (noindexPrefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))) {
    return 'noindex'
  }

  return 'index'
}
