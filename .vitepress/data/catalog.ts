export type CatalogLocale = 'zh' | 'en'

type CatalogCopy = {
  name: string
  eyebrow: string
  summary: string
  tagline: string
  statusLabel: string
}

type CatalogEntry = {
  id: string
  mark: string
  logo: string
  paths: Record<CatalogLocale, string>
  copy: Record<CatalogLocale, CatalogCopy>
}

const entries: CatalogEntry[] = [
  {
    id: 'timeline',
    mark: '⌁',
    paths: { zh: 'https://timeline.aicando.xyz/', en: 'https://timeline.aicando.xyz/' },
    copy: {
      zh: { name: '模型纪年', eyebrow: 'AI 时间线', summary: '记录大型语言模型的发展与变化。', tagline: '浏览 AI 模型时间线', statusLabel: '在线' },
      en: { name: 'LLM Timeline', eyebrow: 'AI timeline', summary: 'A visual history of large language models.', tagline: 'Explore the AI model timeline', statusLabel: 'Live' }
    }
  },
  {
    id: 'aicando',
    mark: '✦',
    paths: { zh: 'https://www.aicando.xyz/', en: 'https://www.aicando.xyz/' },
    copy: {
      zh: { name: 'AICanDo', eyebrow: 'AI 探索', summary: '探索 AI 能做什么，以及如何把它用好。', tagline: '发现 AI 的可能性', statusLabel: '在线' },
      en: { name: 'AICanDo', eyebrow: 'AI exploration', summary: 'Explore what AI can do and how to use it well.', tagline: 'Discover what AI can do', statusLabel: 'Live' }
    }
  },
  {
    id: 'agent-controller',
    mark: '◎',
    paths: { zh: 'https://github.com/gantrol/AgentController', en: 'https://github.com/gantrol/AgentController' },
    copy: {
      zh: { name: 'Agent Controller', eyebrow: 'AI 工具', summary: '让多个 AI 编程代理协同工作的桌面工具。', tagline: '编排你的 AI 代理', statusLabel: '实验中' },
      en: { name: 'Agent Controller', eyebrow: 'AI tool', summary: 'A desktop tool for coordinating AI coding agents.', tagline: 'Orchestrate your AI agents', statusLabel: 'Experimental' }
    }
  },
  {
    id: 'paopao',
    mark: '◌',
    paths: { zh: 'https://github.com/gantrol/paopao', en: 'https://github.com/gantrol/paopao' },
    copy: {
      zh: { name: '泡泡', eyebrow: '桌面应用', summary: '一个轻巧、好玩的桌面工具。', tagline: '把想法变成泡泡', statusLabel: '开源' },
      en: { name: 'Paopao', eyebrow: 'Desktop app', summary: 'A small and playful desktop tool.', tagline: 'Turn ideas into bubbles', statusLabel: 'Open source' }
    }
  },
  {
    id: 'markdowncando',
    mark: 'M↓',
    paths: { zh: 'https://markdown.aicando.xyz/', en: 'https://markdown.aicando.xyz/' },
    copy: {
      zh: { name: 'MarkdownCanDo', eyebrow: 'Markdown 工具', summary: '把 Markdown 变成可执行、可分享的内容。', tagline: '让 Markdown 做更多事', statusLabel: '开源' },
      en: { name: 'MarkdownCanDo', eyebrow: 'Markdown tool', summary: 'Make Markdown executable and shareable.', tagline: 'Make more from Markdown', statusLabel: 'Open source' }
    }
  },
  {
    id: 'aiy',
    mark: 'AI',
    paths: { zh: '/products/aiy/', en: '/en/products/aiy/' },
    copy: {
      zh: { name: 'AIY', eyebrow: '创作工具', summary: '面向 AI 工作流的桌面创作工具。', tagline: '把 AI 带进创作流程', statusLabel: '开源' },
      en: { name: 'AIY', eyebrow: 'Creative tool', summary: 'A desktop creative tool for AI workflows.', tagline: 'Bring AI into your creative workflow', statusLabel: 'Open source' }
    }
  },
  {
    id: 'input-hint',
    mark: '⌨',
    logo: '/images/home/tools/input-hint-logo.svg',
    paths: { zh: 'https://github.com/gantrol/input-hint', en: 'https://github.com/gantrol/input-hint' },
    copy: {
      zh: { name: 'Input Hint', eyebrow: '输入辅助', summary: '显示当前输入法状态的小工具。', tagline: '随时知道当前输入状态', statusLabel: '可用' },
      en: { name: 'Input Hint', eyebrow: 'Input helper', summary: 'A small tool that shows your input method state.', tagline: 'Know your input state at a glance', statusLabel: 'Available' }
    }
  },
  {
    id: 'codex-reset-watch',
    mark: '↻',
    logo: '/images/home/tools/codex-reset-watch-logo.svg',
    paths: { zh: 'https://github.com/gantrol/codex-reset-watch', en: 'https://github.com/gantrol/codex-reset-watch' },
    copy: {
      zh: { name: 'Codex Reset Watch', eyebrow: '开发工具', summary: '监视 Codex 使用状态与重置时间。', tagline: '掌握你的 Codex 配额', statusLabel: '可用' },
      en: { name: 'Codex Reset Watch', eyebrow: 'Dev tool', summary: 'Monitor Codex usage and reset times.', tagline: 'Keep track of your Codex quota', statusLabel: 'Available' }
    }
  },
  {
    id: 'punctuation',
    mark: '，',
    logo: '/images/home/tools/punctuation-logo.svg',
    paths: { zh: 'https://p.gantrol.com/', en: 'https://p.gantrol.com/' },
    copy: {
      zh: { name: '标点转换', eyebrow: '文字工具', summary: '快速处理中英文标点和格式。', tagline: '让标点转换更简单', statusLabel: '可用' },
      en: { name: 'Punctuation', eyebrow: 'Writing tool', summary: 'Quickly convert Chinese and English punctuation.', tagline: 'Simplify punctuation conversion', statusLabel: 'Available' }
    }
  }
]

export function getCatalogEntry(id: string): CatalogEntry {
  const entry = entries.find((item) => item.id === id)
  if (!entry) throw new Error(`Unknown catalog entry: ${id}`)
  return entry
}
