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
  - icon: 🤖
    title: AI 探索者
    details: Prompt 辞典，AI·第一名，Deep Research 系列，大模型理论与实践
    link: '/AI/TOP1'
  - icon: 💻
    title: 软件工程师
    details: 从理论到实践，从基础知识到创新思维，探索软件开发的无限可能
    link: '/software/'
  - icon: 🧠
    title: 心理学爱好者
    details: 认知心理学，高效学习方法，决策理论，让思维更清晰（年久失修）
    # link: '/psychology/'

highlights:
  - header: 工具箱
    image: /images/tools.png
    features:
      - title: Markdown能做！
        icon: 📝
        details: 探索Markdown的无限可能
        link: https://www.markdowncando.com/zh/
      - title: Claude3中文标点替换工具
        icon: 🔄
        details: 轻松解决中文标点问题
        link: https://p.gantrol.com
      - title: Cyberchef
        icon: 🔧
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
  --vp-home-hero-name-background: linear-gradient(120deg, #5f67ee 30%, #41d1ff);
  
  --vp-home-hero-image-background-image: linear-gradient(135deg, #5f67ee 10%, #41d1ff 100%);
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
  box-shadow: 0 10px 20px rgba(95, 103, 238, 0.1);
}

.dark .VPFeature:hover {
  box-shadow: 0 10px 20px rgba(65, 209, 255, 0.1);
}
</style>
