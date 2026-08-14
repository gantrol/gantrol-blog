export type HomeLocale = 'zh' | 'en'

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
  x: number
  y: number
  placement: 'top' | 'right' | 'bottom' | 'left'
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

export type HomeContent = {
  locale: HomeLocale
  author: string
  title: string
  summary: string
  primaryAction: { label: string; href: string }
  secondaryAction: { label: string; href: string }
  projectsTitle: string
  previewAction: string
  orbitCaption: string
  orbitIdleAnnouncement: string
  directions: { title: string; kicker: string; items: DirectionContent[] }
  popular: { title: string; kicker: string; items: PopularContent[] }
  projects: ProjectContent[]
}

const projectAssets = {
  timeline: {
    href: 'https://timeline.aicando.xyz/',
    logo: '/images/home/projects/timeline-logo.svg',
    image: '/images/home/projects/timeline-og.webp',
    x: 22,
    y: 19,
    placement: 'bottom' as const
  },
  aicando: {
    href: 'https://www.aicando.xyz/',
    logo: '/images/home/projects/aicando-logo.webp',
    image: '/images/home/projects/aicando-og.svg',
    x: 70,
    y: 13,
    placement: 'right' as const
  },
  agentController: {
    href: 'https://github.com/gantrol/AgentController',
    logo: '/images/home/projects/agent-controller-logo.svg',
    image: '/images/home/projects/agent-controller-og.webp',
    overlayImage: '/images/home/projects/agent-controller-codex-micro.png',
    x: 91,
    y: 45,
    placement: 'bottom' as const
  },
  paopao: {
    href: 'https://github.com/gantrol/paopao-desktop',
    logo: '/images/home/projects/paopao-logo.svg',
    image: '/images/home/projects/paopao-logo.svg',
    imageFit: 'contain' as const,
    x: 75,
    y: 82,
    placement: 'top' as const
  },
  markdownCanDo: {
    href: 'https://github.com/gantrol/MarkdownCanDo',
    logo: '/images/home/projects/markdowncando-logo.png',
    image: '/images/home/projects/markdowncando-og.webp',
    x: 40,
    y: 87,
    placement: 'top' as const
  },
  aiy: {
    href: 'https://github.com/gantrol/aiy-desktop',
    logo: '/images/home/projects/aiy-logo.webp',
    image: '/images/home/projects/aiy-og.webp',
    x: 10,
    y: 61,
    placement: 'bottom' as const
  }
}

export const homeContent: Record<HomeLocale, HomeContent> = {
  zh: {
    locale: 'zh',
    author: '黄健楸 · GANTROL',
    title: '计算机心理学',
    summary: '写 AI 与软件，也用计算机理解人。',
    primaryAction: { label: '阅读文章', href: '#popular' },
    secondaryAction: { label: 'GitHub', href: 'https://github.com/gantrol' },
    projectsTitle: '作品',
    previewAction: '打开项目',
    orbitCaption: '公开项目，大部分开源',
    orbitIdleAnnouncement: '移动到作品图标可查看项目预览',
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
    projects: [
      { id: 'timeline', name: '模型纪年', eyebrow: '大模型事件档案', description: '沿时间理解大模型进化，查找关键事件、原始来源与影响脉络。', ...projectAssets.timeline },
      { id: 'aicando', name: 'AiCanDo', eyebrow: 'AI 能力全面盘点', description: '从文本与代码到图像、视频、音乐与语音，持续更新 AI 真正能做什么。', ...projectAssets.aicando },
      { id: 'agent-controller', name: 'Agent Controller', eyebrow: 'Codex 控制器', description: '用游戏手柄控制 Codex、浏览任务树，并模拟 Codex Micro。', ...projectAssets.agentController },
      { id: 'paopao', name: '泡泡', eyebrow: '本地优先的信息空间', description: '激发表达，思绪如流；沉浮泡泡，信息分箱。', ...projectAssets.paopao },
      { id: 'markdowncando', name: 'MarkdownCanDo', eyebrow: 'Markdown 演练场', description: '摆脱繁琐排版，用纯文本完成写作、演示、图表与更多工作。', ...projectAssets.markdownCanDo },
      { id: 'aiy', name: 'AIY', eyebrow: 'AI 生图管理工具', description: '本地优先地管理 AI 生图、Prompt、视觉词典与创作素材。', ...projectAssets.aiy }
    ]
  },
  en: {
    locale: 'en',
    author: 'GANTROL · HUANG JIANQIU',
    title: 'Computer Psychology',
    summary: 'Writing about AI and software—and using computers to understand people.',
    primaryAction: { label: 'Read articles', href: '#popular' },
    secondaryAction: { label: 'GitHub', href: 'https://github.com/gantrol' },
    projectsTitle: 'Projects',
    previewAction: 'Open project',
    orbitCaption: 'Public projects, mostly open source.',
    orbitIdleAnnouncement: 'Move to a project icon to see its preview',
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
    projects: [
      { id: 'timeline', name: 'LLM Timeline', eyebrow: 'Model event archive', description: 'Key model events, primary sources, and their impact—organized through time.', ...projectAssets.timeline },
      { id: 'aicando', name: 'AiCanDo', eyebrow: 'AI capability atlas', description: 'A living overview of what AI can actually do across text, code, image, video, music, and voice.', ...projectAssets.aicando },
      { id: 'agent-controller', name: 'Agent Controller', eyebrow: 'Codex controller', description: 'Control Codex with a gamepad, browse task trees, and simulate Codex Micro.', ...projectAssets.agentController },
      { id: 'paopao', name: 'Paopao', eyebrow: 'Local-first thought space', description: 'Spark expression and let thoughts flow; surface ideas as bubbles, then sort information into boxes.', ...projectAssets.paopao },
      { id: 'markdowncando', name: 'MarkdownCanDo', eyebrow: 'Markdown playground', description: 'Write, present, diagram, and do more with plain text.', ...projectAssets.markdownCanDo },
      { id: 'aiy', name: 'AIY', eyebrow: 'AI image manager', description: 'A local-first home for AI images, prompts, visual dictionaries, and creative assets.', ...projectAssets.aiy }
    ]
  }
}
