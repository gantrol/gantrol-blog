import { getCatalogEntry, type CatalogLocale } from '../data/catalog'

export type HomeLocale = CatalogLocale

type ProjectContent = {
  id: string
  name: string
  eyebrow: string
  description: string
  href: string
  logo: string
  image: string
  imageFit?: 'cover' | 'contain'
  overlayImage?: string
}

type DirectionContent = {
  id: 'software' | 'ai' | 'psychology'
  title: string
  description: string
  href?: string
  status?: string
}

type PopularContent = {
  number: string
  title: string
  href: string
}

type ToolContent = {
  id: string
  name: string
  description: string
  href: string
  mark: string
  logo: string
  status: string
}

export type HomeContent = {
  locale: HomeLocale
  author: string
  title: string
  primaryAction: { label: string; href: string }
  secondaryAction: { label: string; href: string }
  projectsTitle: string
  previewAction: string
  projectsIdleAnnouncement: string
  directions: { title: string; kicker: string; items: DirectionContent[] }
  popular: { title: string; kicker: string; items: PopularContent[] }
  tools: {
    title: string
    kicker: string
    action: { label: string; href: string }
    items: ToolContent[]
  }
  projects: ProjectContent[]
}

const projectAssets = {
  timeline: {
    logo: '/images/home/projects/timeline-logo.svg',
    image: {
      zh: '/images/home/projects/timeline-og.svg',
      en: '/images/home/projects/timeline-og-en.svg'
    }
  },
  aicando: {
    logo: '/images/home/projects/aicando-logo.webp',
    image: {
      zh: '/images/home/projects/aicando-og.svg',
      en: '/images/home/projects/aicando-og-en.svg'
    }
  },
  agentController: {
    logo: '/images/home/projects/agent-controller-logo.svg',
    image: '/images/home/projects/agent-controller-og.webp',
    overlayImage: '/images/home/projects/agent-controller-codex-micro.png'
  },
  paopao: {
    logo: '/images/home/projects/paopao-logo.svg',
    image: {
      zh: '/images/home/projects/paopao-og.svg',
      en: '/images/home/projects/paopao-og-en.svg'
    }
  },
  markdownCanDo: {
    logo: '/images/home/projects/markdowncando-logo.png',
    image: '/images/home/projects/markdowncando-og.webp'
  },
  aiy: {
    logo: '/images/home/projects/aiy-logo-transparent.png',
    image: '/images/home/projects/aiy-og.webp'
  }
}

type ProjectAsset = Omit<ProjectContent, 'id' | 'name' | 'eyebrow' | 'description' | 'href' | 'image'> & {
  image: string | Record<HomeLocale, string>
}

function project(id: string, locale: HomeLocale, assets: ProjectAsset): ProjectContent {
  const entry = getCatalogEntry(id)
  const copy = entry.copy[locale]
  const { image, ...sharedAssets } = assets

  return {
    id,
    name: copy.name,
    eyebrow: copy.eyebrow,
    description: copy.summary,
    href: entry.paths[locale],
    ...sharedAssets,
    image: typeof image === 'string' ? image : image[locale]
  }
}

function tools(locale: HomeLocale): ToolContent[] {
  return ['input-hint', 'codex-reset-watch', 'punctuation'].map((id) => {
    const entry = getCatalogEntry(id)
    const copy = entry.copy[locale]

    return {
      id,
      name: copy.name,
      description: copy.tagline,
      href: entry.paths[locale],
      mark: entry.mark,
      logo: entry.logo,
      status: copy.statusLabel
    }
  })
}

export const homeContent: Record<HomeLocale, HomeContent> = {
  zh: {
    locale: 'zh',
    author: '黄健楸 · GANTROL',
    title: '计算机心理学',
    primaryAction: { label: '阅读文章', href: '/articles/' },
    secondaryAction: { label: 'GitHub', href: 'https://github.com/gantrol' },
    projectsTitle: '作品',
    previewAction: '打开网站',
    projectsIdleAnnouncement: '悬停、聚焦或轻点一枚饼干可查看项目预览',
    directions: {
      title: '内容方向',
      kicker: '三条主线',
      items: [
        {
          id: 'software',
          title: '软件工程',
          description: '机月神话，AI编程中二病，永远都有新编程',
          href: '/software/'
        },
        {
          id: 'ai',
          title: 'AI探索',
          description: '迁移到AICanDo.xyz',
          href: 'https://www.aicando.xyz/'
        },
        {
          id: 'psychology',
          title: '心理爱好',
          description: '认知心理学，高效学习方法，决策理论',
          status: '施工中'
        }
      ]
    },
    popular: {
      title: '历史热门',
      kicker: '10万+阅读',
      items: [
        { number: '01', title: 'AI能做什么？', href: 'https://www.aicando.xyz/blog/ai-capabilities' },
        { number: '02', title: '热爱开源，引爆Deepseek', href: '/AI/record/deepseek' },
        { number: '03', title: '[译]怎样成为一个“干大事”的人', href: '/startup/on-why/great-work-cn/' },
        { number: '04', title: '[译]创业手册 [著]Sam Altman', href: '/startup/handbook/' },
      ]
    },
    tools: {
      title: '小工具',
      kicker: '解决一个具体问题',
      action: { label: '查看全部工具', href: '/tools/' },
      items: tools('zh')
    },
    projects: [
      project('timeline', 'zh', projectAssets.timeline),
      project('aicando', 'zh', projectAssets.aicando),
      project('agent-controller', 'zh', projectAssets.agentController),
      project('paopao', 'zh', projectAssets.paopao),
      project('markdowncando', 'zh', projectAssets.markdownCanDo),
      project('aiy', 'zh', projectAssets.aiy)
    ]
  },
  en: {
    locale: 'en',
    author: 'GANTROL · HUANG JIANQIU',
    title: 'Computer Psychology',
    primaryAction: { label: 'Read articles', href: '/en/articles/' },
    secondaryAction: { label: 'GitHub', href: 'https://github.com/gantrol' },
    projectsTitle: 'Projects',
    previewAction: 'Open site',
    projectsIdleAnnouncement: 'Hover, focus, or tap a cookie to preview a project',
    directions: {
      title: 'Directions',
      kicker: 'Three threads',
      items: [
        { id: 'software', title: 'Software engineering', description: 'From fundamentals to practice, exploring how useful software gets built.' },
        { id: 'ai', title: 'AI exploration', description: 'Prompts, AI Top 1, Deep Research, and hands-on work with foundation models.', href: 'https://www.aicando.xyz/' },
        { id: 'psychology', title: 'Psychology', description: 'Cognition, learning, and decision-making for clearer thinking.', status: 'In progress' }
      ]
    },
    popular: {
      title: 'Popular essays',
      kicker: 'Reader favorites',
      items: [
        { number: '01', title: 'AI TOP 1', href: 'https://www.aicando.xyz/' },
        { number: '02', title: 'Open source and the DeepSeek moment', href: '/AI/record/deepseek' }
      ]
    },
    tools: {
      title: 'Small tools',
      kicker: 'One focused problem at a time',
      action: { label: 'View all tools', href: '/en/tools/' },
      items: tools('en')
    },
    projects: [
      project('timeline', 'en', projectAssets.timeline),
      project('aicando', 'en', projectAssets.aicando),
      project('agent-controller', 'en', projectAssets.agentController),
      project('paopao', 'en', projectAssets.paopao),
      project('markdowncando', 'en', projectAssets.markdownCanDo),
      project('aiy', 'en', projectAssets.aiy)
    ]
  }
}
