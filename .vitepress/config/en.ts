import { defineConfig, type DefaultTheme } from 'vitepress'


export const en = defineConfig({
    lang: 'en-US',
    title: "Gantrol",
    description: "Gantrol's Blog: AI, software, and psychology",

    themeConfig: {
        nav: nav(),

        sidebar: {
            '/en/AI/': { base: '/en/AI/', items: sidebarAI() },
            // '/en/software/': { base: '/en/software/', items: sidebarSoftware() }
        },

        editLink: {
            pattern: 'https://github.com/gantrol/gantrol.com/edit/main/src/:path',
            text: 'Edit this page on GitHub'
        },

        footer: {
            copyright: 'Copyright © 2024-present Gantrol Hwang'
        }
    }
})

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: 'AI',
            link: '/en/AI/TOP1',
            activeMatch: '/en/AI/'
        },
        // {
        //     text: 'Software',
        //     link: '/en/software/',
        //     activeMatch: '/en/software/'
        // }
    ]
}

function sidebarAI(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'AI',
            collapsed: false,
            items: [
                { text: 'AI TOP1', link: '/en/AI/TOP1' },
            ]
        },

    ]
}

function sidebarSoftware(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Reference',
            base: '/en/',
            items: [
                { text: 'Site Config', link: 'site-config' },
                { text: 'Frontmatter Config', link: 'frontmatter-config' },
                { text: 'Runtime API', link: 'runtime-api' },
                { text: 'CLI', link: 'cli' },
                {
                    text: 'Default Theme',
                    base: '/reference/default-theme-',
                    items: [
                    ]
                }
            ]
        }
    ]
}
