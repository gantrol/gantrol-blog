import { defineConfig, type DefaultTheme } from "vitepress";

export const en = defineConfig({
  lang: "en-US",
  title: "Gantrol",
  description: "Gantrol's Blog: AI, software, and psychology",

  themeConfig: {
    nav: nav(),
    sidebar: sidebar(),
    editLink: {
      pattern: "https://github.com/gantrol/gantrol-blog/edit/main/src/:path",
      text: "Edit this page on GitHub",
    },

    footer: {
      copyright: "Copyright © 2024-present Gantrol Hwang",
    },
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "AI",
      link: "https://aicando.xyz/",
    },
    // {
    //     text: 'Software',
    //     link: '/en/software/',
    //     activeMatch: '/en/software/'
    // }
    // {
    //   text: "Playground",
    //   link: "/en/CS/examples",
    // },
    {
      text: "Tools",
      items: [
        { text: "MarkdownCanDo", link: "https://github.com/gantrol/MarkdownCanDo" },
        {
          text: "ChatGPT Math Format",
          link: "https://aicando.xyz/chatgpt/gpt4o/math-format",
        },
        { text: "Cyberchef", link: "https://gchq.github.io/CyberChef" },
      ],
    },
  ];
}

function sidebar(): DefaultTheme.Sidebar {
  return {
    "/en": { base: "", items: sidebarAll() },
  };
}

function sidebarAll(): DefaultTheme.SidebarItem[] {
  return [
    sidebarAI(),
    sidebarSoftware(),
    sidebarCS(),
    // sidebarStartup(),
  ];
}

function sidebarAI(): DefaultTheme.SidebarItem {
  return {
    text: "AI",
    // link: '/',
    collapsed: false,
    items: [
      { text: "AI·TOP 1 (moved)", link: "https://aicando.xyz/" },
      // {text: 'AI 画 SVG', link: '/use/svg/'},
    ],
  };
}

function sidebarCS(): DefaultTheme.SidebarItem {
  return {
    text: "Computer Science",
    base: "/en/CS/",
    collapsed: false,
    items: [
      // {text: '自学计算机科学', link: 'learn'},
      // { text: "Playground", link: "examples" },
    ],
  };
}

function sidebarSoftware(): DefaultTheme.SidebarItem {
  return {
    text: "Software",
    collapsed: false,
    items: [
      {
        text: "Tools",
        items: [
          { text: "MarkdownCanDo", link: "https://github.com/gantrol/MarkdownCanDo" },
          {
            text: "ChatGPT Math Format",
            link: "https://aicando.xyz/chatgpt/gpt4o/math-format",
          },
          { text: "Cyberchef", link: "https://gchq.github.io/CyberChef" },
        ],
      },
    ],
  };
}

function sidebarStartup(): DefaultTheme.SidebarItem {
  return {
    text: "创业（Startup）",
    base: "/en/startup",
    link: "/",
    items: [
      { text: "黄金之问：Why", link: "/on-why/" },
      { text: "怎样成为一个“干大事”的人", link: "/on-why/great-work-cn/" },
    ],
  };
}
