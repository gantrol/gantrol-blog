<template>
  <div class="card">
    <div class="gradient-bg"></div>
    <div class="card-header">
      <h1 class="title">如果 <span>OpenAI</span> 开喜茶店</h1>
    </div>

    <div class="menu-container">
      <div class="menu-item">
        <div class="item-name">
          <span class="emoji">🍇</span>
          葡萄4o
        </div>
        <div class="item-desc">多肉葡萄</div>
      </div>

      <div class="menu-item">
        <div class="item-name">
          <span class="emoji">🍇</span>
          葡萄o1 mini
        </div>
        <div class="item-desc">轻芝多肉葡萄</div>
      </div>

      <div class="menu-item">
        <div class="item-name">
          <span class="emoji">🍇</span>
          葡萄o1
        </div>
        <div class="item-desc">芝芝多肉葡萄</div>
      </div>

      <div class="menu-item">
        <div class="item-name">
          <span class="emoji">🥭</span>
          芒果4 turbo
        </div>
        <div class="item-desc">超多肉芒芒甘露</div>
      </div>

      <div class="menu-item">
        <div class="item-name">
          <span class="emoji">🥭</span>
          芒果o3 high
        </div>
        <div class="item-desc">芝芝芒芒-多云顶</div>
      </div>

      <div class="menu-item">
        <div class="item-name">
          <span class="emoji">🥭</span>
          芒果o3 medium
        </div>
        <div class="item-desc">芝芝芒芒-云顶</div>
      </div>

      <div class="menu-item">
        <div class="item-name">
          <span class="emoji">🥭</span>
          芒果o3 low
        </div>
        <div class="item-desc">芝芝芒芒-少云顶</div>
      </div>
    </div>

    <div class="watermark">#ChatGPT #喜茶 #创意菜单</div>
  </div>
</template>

<script setup>
// You can add any Vue component logic here if needed.
</script>

<style scoped>
.card {
  --card-width: 400px;
  --card-height: 600px;
  --primary-color: #10a37f;
  --text-primary: #333333;
  --text-secondary: #666666;
  --text-light: #999999;
  --background-light: #f8f8f8;

  width: var(--card-width);
  height: var(--card-height);
  background: white;
  border-radius: 24px;
  box-shadow:
      0 4px 24px rgba(0, 0, 0, 0.08),
      0 1px 2px rgba(0, 0, 0, 0.04);
  padding: 32px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.card-header {
  position: relative;
  margin-bottom: 36px;
  padding-bottom: 24px;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.title {
  font-size: 32px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1;
}

.title span {
  font-weight: 700;
  color: transparent;
  background-image: linear-gradient(135deg, var(--primary-color) 0%, #2dd4bf 100%);
  background-clip: text;
  -webkit-background-clip: text;
  display: inline-block;
}

.menu-container {
  flex: 1;
  overflow-y: auto;
  padding-right: 8px;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
}

.menu-item:hover {
  transform: translateX(4px);
}

.item-name {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  color: var(--text-primary);
  font-weight: 500;
}

.item-name .emoji {
  font-size: 24px;
  filter: saturate(1.2);
}

.item-desc {
  font-size: 15px;
  color: var(--text-secondary);
  font-weight: 400;
}

.gradient-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 160px;
  background: linear-gradient(135deg, rgba(16, 163, 127, 0.08) 0%, rgba(45, 212, 191, 0.08) 100%);
  opacity: 0.5;
  z-index: 0;
}

.watermark {
  position: absolute;
  bottom: 20px;
  right: 24px;
  font-size: 13px;
  color: var(--text-light);
  font-weight: 400;
}

/* 滚动条美化 */
.menu-container::-webkit-scrollbar {
  width: 4px;
}

.menu-container::-webkit-scrollbar-track {
  background: transparent;
}

.menu-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
</style>
