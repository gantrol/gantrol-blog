---
layout: home

hero:
  name: "计算之心"
  tagline: AI · 软件 · 心理
#  image:
#    src: /logo.svg
#    alt: Gantrol Blog
  actions:
    - theme: brand
      text: 开始阅读
      link: /AI/TOP1
    - theme: alt
      text: GitHub
      link: https://github.com/gantrol

features:
  - icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
    title: AI 探索者
    details: Prompt 辞典，AI·第一名，Deep Research 系列，大模型理论与实践
    link: '/AI/TOP1'
  - icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-laptop"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></svg>
    title: 软件工程师
    details: 从理论到实践，从基础知识到创新思维，探索软件开发的无限可能
    link: '/software/'
  - icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
    title: 心理学爱好者
    details: 认知心理学，高效学习方法，决策理论，让思维更清晰（年久失修）
    # link: '/psychology/'

highlights:
  - header: 工具箱
    image: /images/tools.png
    features:
      - title: Markdown能做！
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
        details: 探索Markdown的无限可能
        link: https://www.markdowncando.com/zh/
      - title: Claude3中文标点替换工具
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-cw"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
        details: 轻松解决中文标点问题
        link: https://p.gantrol.com
      - title: Cyberchef
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wrench"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
        details: 全能型网络小工具箱
        link: https://gchq.github.io/CyberChef

newsletter:
  title: 订阅更新
  description: 获取最新的AI、软件和心理学文章推送
  action: /subscribe
  
footer: true
---

[//]: # (<script setup>)

[//]: # (    import TechBackground from "./components/TechBackground.vue";)

[//]: # (</script>)

[//]: # ()
[//]: # (<TechBackground />)

<style>
/* 导入主页增强样式 */
 @import url('./styles/enhanced-home.css'); 


.VPButton.alt:hover::before {
  height: 100%;
}
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(120deg, #e67e22 30%, #f39c12);
  
  --vp-home-hero-image-background-image: linear-gradient(135deg, #e67e22 10%, #f39c12 100%);
  --vp-home-hero-image-filter: blur(72px);
}

/* 响应式调整 */
@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}

/* 卡片悬停效果 */
.VPFeature {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
}

.VPFeature:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(230, 126, 34, 0.1);
}

.dark .VPFeature:hover {
  box-shadow: 0 10px 20px rgba(243, 156, 18, 0.1);
}
</style>
