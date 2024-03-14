import {type DefaultTheme, defineConfig} from 'vitepress'


export const zh = defineConfig({
    lang: 'zh-Hans',
    description: '由 Vite 和 Vue 驱动的静态站点生成器',

    themeConfig: {
        nav: nav(),

        sidebar: sidebar(),

        editLink: {
            pattern: 'https://github.com/gantrol/markdown-can-do/edit/main/:path',
            text: '在 GitHub 上编辑此页面'
        },

        footer: {
            copyright: `版权所有 © 2024-${new Date().getFullYear()} 黄健楸`
        },

        docFooter: {
            prev: '上一页',
            next: '下一页'
        },

        outline: {
            label: '页面导航'
        },

        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        },

        langMenuLabel: '多语言',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式'
    }
})

function nav(): DefaultTheme.NavItem[] {
    return [
        {text: '主页', link: '/'},
        {
            text: '工具',
            items: [
                {text: "Markdown能做！", link:  "https://www.markdowncando.com/zh/"},
                {text: "Claude3中文标点替换工具", link:  "https://p.gantrol.com"},
                {text: "Cyberchef：小工具箱", link:  "https://gchq.github.io/CyberChef"},
            ]
        },
        {
            text: '创业',
            link: '/startup/',
        },
        {
            text: '演练场',
            link:  "/CS/examples",
        },
    ]
}

function sidebar(): DefaultTheme.Sidebar {
    return {
        '/': {base: '', items: sidebarAll()},
    }
}

function sidebarAll(): DefaultTheme.SidebarItem[] {
    return [
        sidebarAI(),
        sidebarSoftware(),
        sidebarCS(),
        sidebarStartup(),
    ]

}

function sidebarAI(): DefaultTheme.SidebarItem {
    return {
        text: 'AI',
        base: '/AI',
        link: '/',
        collapsed: true,
        items: [
            {text: 'AI·第一名', link: '/TOP1'},
            {text: 'AI 画 SVG', link: '/use/svg/'},
        ]
    }
}

function sidebarCS(): DefaultTheme.SidebarItem {
    return {
        text: '计算机科学与工程',
        base: '/CS/',
        collapsed: true,
        items: [
            {text: '自学计算机科学', link: 'learn'},
            {text: '沙盒例子', link: 'examples'},
        ]
    }
}

function sidebarSoftware(): DefaultTheme.SidebarItem {
    return {
        text: '软件杂谈',
        collapsed: true,
        items: [
            {
                text: '杂谈',
                base: '/software',
                collapsed: true,
                items: [
                    {text: '“这个很简单，我也能做一个”', link: '/wheel/'},
                    {text: 'Markdown能做发布', link: '/tools/markdown/MarkdownCanDoRelease'},
                    {text: '谈笔记', link: '/tools/notes/too-much/'},
                    {text: '博客建站之选', link: '/tools/blog-builder/'},
                ]
            },
            {
                text: '工具',
                items: [
                    {text: "Markdown能做！", link:  "https://www.markdowncando.com/zh/"},
                    {text: "Claude3中文标点替换工具", link:  "https://p.gantrol.com"},
                    {text: "Cyberchef：小工具箱", link:  "https://gchq.github.io/CyberChef"},
                ]}
        ]
    }
}

function sidebarStartup(): DefaultTheme.SidebarItem {
    return {
        text: '创业（Startup）',
        base: '/startup',
        link: '/',
        items: [
            {text: '黄金之问：Why', link: '/on-why/'},
            {text: '怎样成为一个“干大事”的人', link: '/on-why/great-work-cn/'},
        ]
    }

}

export const search: DefaultTheme.AlgoliaSearchOptions['locales'] = {
    zh: {
        placeholder: '搜索文档',
        translations: {
            button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
            },
            modal: {
                searchBox: {
                    resetButtonTitle: '清除查询条件',
                    resetButtonAriaLabel: '清除查询条件',
                    cancelButtonText: '取消',
                    cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                    recentSearchesTitle: '搜索历史',
                    noRecentSearchesText: '没有搜索历史',
                    saveRecentSearchButtonTitle: '保存至搜索历史',
                    removeRecentSearchButtonTitle: '从搜索历史中移除',
                    favoriteSearchesTitle: '收藏',
                    removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                    titleText: '无法获取结果',
                    helpText: '你可能需要检查你的网络连接'
                },
                footer: {
                    selectText: '选择',
                    navigateText: '切换',
                    closeText: '关闭',
                    searchByText: '搜索提供者'
                },
                noResultsScreen: {
                    noResultsText: '无法找到相关结果',
                    suggestedQueryText: '你可以尝试查询',
                    reportMissingResultsText: '你认为该查询应该有结果？',
                    reportMissingResultsLinkText: '点击反馈'
                }
            }
        }
    }
}
