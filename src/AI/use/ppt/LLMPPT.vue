<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const slides = [
  {
    title: '如何使用大模型',
    content: '高效利用AI大语言模型的技巧与策略',
    class: 'title-slide'
  },
  {
    title: '内容概览',
    content: [
      { type: 'list', items: ['提示工程基础', '高级使用技巧', '专业应用场景', '限制与注意事项'] }
    ],
    layout: 'centered-content',
    class: 'overview-slide'
  },
  {
    title: '提示工程基础',
    content: [
      {
        type: 'flex-container',
        items: [
          {
            type: 'flex-item',
            content: [
              { type: 'heading', level: 3, text: '三大关键要素' },
              {
                type: 'list',
                items: [
                  '<strong>明确指令</strong> - 具体、量化、目标明确',
                  '<strong>角色设定</strong> - 赋予模型特定专业身份',
                  '<strong>提供上下文</strong> - 背景信息决定输出质量'
                ]
              }
            ]
          },
          {
            type: 'flex-item',
            class: 'visual-element',
            content: [
              { type: 'circle-icon', icon: '💡', text: '明确指令' },
              { type: 'circle-icon', icon: '👤', text: '角色设定' },
              { type: 'circle-icon', icon: '🔄', text: '提供上下文' }
            ]
          }
        ]
      }
    ],
    class: 'basic-prompt-slide' // Added a specific class for styling
  },
  {
    title: '明确指令示例',
    content: [
      {
        type: 'comparison-container',
        items: [
          {
            type: 'comparison-item',
            class: 'good',
            content: [
              { type: 'comparison-header', emoji: '👍', title: '好的示例' },
              { type: 'paragraph', text: '"请撰写一份500字的关于气候变化对农业影响的文章，针对高中生读者，包含三个主要观点和数据支持。"' },
              { type: 'tag', text: '明确、具体、目标清晰' }
            ]
          },
          {
            type: 'comparison-item',
            class: 'bad',
            content: [
              { type: 'comparison-header', emoji: '👎', title: '不太好的示例' },
              { type: 'paragraph', text: '"写一篇关于气候变化的文章。"' },
              { type: 'tag', text: '模糊、缺乏细节' }
            ]
          }
        ]
      }
    ],
  },
  {
    title: '高级使用技巧',
    content: [
      {
        type: 'flex-container',
        items: [
          {
            type: 'flex-item',
            content: [
              {
                type: 'feature-list',
                items: [
                  { icon: '🔗', title: '链式思考', description: '引导模型一步步解决复杂问题' },
                  { icon: '📋', title: '示例引导', description: '通过具体示例说明期望输出' },
                  { icon: '🔄', title: '迭代优化', description: '基于初始输出进行改进' }
                ]
              }
            ]
          },
          {
            type: 'flex-item',
            class: 'visual-element',
            content: [
              {
                type: 'process-diagram',
                steps: ['输入', '思考', '优化', '输出']
              }
            ]
          }
        ]
      }
    ],
  },
  {
    title: '链式思考示例',
    content: [
      {
        type: 'code-container',
        header: { icon: '💭', text: '链式思考过程示例' }, // More specific header
        code: `问题：一个水箱以2升/分钟的速度注水，同时以1升/分钟的速度漏水。
如果水箱容量为10升，从空箱开始，需要多长时间才能装满？

请一步步思考：
1. 首先确定净注水速率 (2升/分钟 - 1升/分钟 = 1升/分钟)
2. 然后计算填满时间 (10升 / 1升/分钟 = 10分钟)

答案：需要10分钟才能装满。`, // More detailed code example with answer
        footer: '提示模型展示解题过程，而不仅是给出答案'
      }
    ],
    class: 'code-slide chain-of-thought-slide' // Added specific classes for styling
  },
  {
    title: '专业应用场景',
    content: [
      {
        type: 'multi-column-container',
        items: [
          { type: 'card', icon: '💻', title: '代码开发', listItems: ['代码生成与解释', '代码审查与重构', '调试问题分析'] },
          { type: 'card', icon: '✍️', title: '内容创作', listItems: ['撰写与编辑文案', '创意头脑风暴', '多语言翻译'] },
          { type: 'card', icon: '📚', title: '学习研究', listItems: ['概念解释与总结', '学习路径规划', '研究问题分析'] }
        ]
      }
    ],
    multiColumn: true
  },
  {
    title: '限制与注意事项',
    content: [
      {
        type: 'warning-container',
        items: [
          { type: 'warning-item', icon: '🔒', title: '数据隐私', text: '避免提交敏感信息、商业机密或受版权保护的内容' },
          { type: 'warning-item', icon: '⚠️', title: '事实准确性', text: '警惕"幻觉"，重要信息需交叉验证' },
          { type: 'warning-item', icon: '⚖️', title: '偏见与伦理', text: '对敏感话题保持批判性思考' }
        ]
      }
    ],
    class: 'warning-slide',
    multiColumn: true
  },
  {
    title: '总结',
    content: [
      {
        type: 'summary-container',
        content: [
          { type: 'paragraph', text: '高效使用大模型是一门艺术，需要：' },
          {
            type: 'summary-items',
            items: [
              { icon: '🎯', text: '清晰的沟通' },
              { icon: '💡', text: '创造性思维' },
              { icon: '🔍', text: '批判性思考' }
            ]
          },
          { type: 'highlight', text: '模型是工具，而你是创意和判断力的来源。<br>最佳结果来自人机协作！' }
        ]
      }
    ],
    class: 'summary-slide',
    multiColumn: true
  },
  {
    title: '感谢',
    content: [
      { type: 'paragraph', text: `展示时间: ${new Date().toLocaleDateString()}` },
      { type: 'paragraph', text: '制作: gantrol' }
    ],
    layout: 'centered-content',
    class: 'thank-slide'
  }
];

const currentSlideIndex = ref(0);
const totalSlides = slides.length;
const slideDirection = ref('next');
const pageNumberInput = ref('');
const pageInputError = ref(''); // 用于存放页码输入错误信息
const isFullscreen = ref(false);
const presentationContainerRef = ref(null); // 用于引用 presentation-container

const nextSlide = () => {
  if (currentSlideIndex.value < totalSlides - 1) {
    slideDirection.value = 'next';
    currentSlideIndex.value++;
    pageInputError.value = ''; // 清除错误信息
  }
};

const prevSlide = () => {
  if (currentSlideIndex.value > 0) {
    slideDirection.value = 'prev';
    currentSlideIndex.value--;
    pageInputError.value = ''; // 清除错误信息
  }
};

const goToSlide = () => {
  const pageNumber = parseInt(pageNumberInput.value);
  if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalSlides) {
    currentSlideIndex.value = pageNumber - 1;
    pageNumberInput.value = String(pageNumber); // 使用currentSlideIndex的值
    pageInputError.value = ''; // 清除错误信息
  } else {
    pageInputError.value = '请输入有效的页码 (1-' + totalSlides + ')'; // 设置错误信息
  }
};

const handlePageNumberInput = () => {
  goToSlide(); // 输入框内容改变时直接跳转
};


const handleKeydown = (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    nextSlide();
  } else if (e.key === 'ArrowLeft') {
    prevSlide();
  } else if (e.key === 'Enter') {
    goToSlide(); // Enter 键也可以触发跳转，虽然 @change 事件通常也处理了
    e.preventDefault(); // 阻止默认的 Enter 行为，例如 form 提交
  }
};

const toggleFullscreen = () => {
  const container = presentationContainerRef.value;
  if (!isFullscreen.value) {
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.mozRequestFullScreen) { /* Firefox */
      container.mozRequestFullScreen();
    } else if (container.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      container.webkitRequestFullscreen();
    } else if (container.msRequestFullscreen) { /* IE/Edge */
      container.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
  }
  isFullscreen.value = !isFullscreen.value;
};


onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  pageNumberInput.value = String(currentSlideIndex.value + 1);

  const fullscreenChangeHandler = () => {
    isFullscreen.value = !!document.fullscreenElement;
  };

  document.addEventListener('fullscreenchange', fullscreenChangeHandler);
  document.addEventListener('webkitfullscreenchange', fullscreenChangeHandler);
  document.addEventListener('mozfullscreenchange', fullscreenChangeHandler);
  document.addEventListener('MSFullscreenChange', fullscreenChangeHandler);

  onUnmounted(() => {
    document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
    document.removeEventListener('webkitfullscreenchange', fullscreenChangeHandler);
    document.removeEventListener('mozfullscreenchange', fullscreenChangeHandler);
    document.removeEventListener('MSFullscreenChange', fullscreenChangeHandler);
  });

});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

watch(currentSlideIndex, (newIndex) => {
  pageNumberInput.value = String(newIndex + 1);
  pageInputError.value = ''; // 切换幻灯片时清除错误信息
});
</script>

<template>
  <div class="presentation-container" ref="presentationContainerRef">
    <button class="fullscreen-button" @click="toggleFullscreen" :title="isFullscreen ? '退出全屏' : '全屏'">
      <svg v-if="!isFullscreen" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 14H5V19H10V17H7V14Z" fill="currentColor"/>
        <path d="M5 10H7V7H10V5H5V10Z" fill="currentColor"/>
        <path d="M17 17H14V19H19V14H17V17Z" fill="currentColor"/>
        <path d="M14 5V7H17V10H19V5H14Z" fill="currentColor"/>
      </svg>
      <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 7H7V10H5V5H10V7Z" fill="currentColor"/>
        <path d="M17 7H14V5H19V10H17V7Z" fill="currentColor"/>
        <path d="M7 14H10V19H5V14H7V17Z" fill="currentColor"/>
        <path d="M14 19V17H17V14H19V19H14Z" fill="currentColor"/>
      </svg>
    </button>
    <div class="slides-wrapper">
      <transition :name="slideDirection === 'next' ? 'slide-next' : 'slide-prev'">
        <div
            :key="currentSlideIndex"
            class="slide"
            :class="slides[currentSlideIndex].class"
        >
          <h2>{{ slides[currentSlideIndex].title }}</h2>
          <div class="content" :class="slides[currentSlideIndex].layout">
            <template v-for="(item, index) in slides[currentSlideIndex].content" :key="index">
              <template v-if="item.type === 'paragraph'">
                <p v-html="item.text"></p>
              </template>
              <template v-if="item.type === 'list'">
                <ul>
                  <li v-for="(listItem, listIndex) in item.items" :key="listIndex" v-html="listItem"></li>
                </ul>
              </template>
              <template v-if="item.type === 'flex-container'">
                <div class="flex-container">
                  <template v-for="(flexItem, flexIndex) in item.items" :key="flexIndex">
                    <div class="flex-item" :class="flexItem.class">
                      <template v-for="(flexContent, contentIndex) in flexItem.content" :key="contentIndex">
                        <template v-if="flexContent.type === 'heading'">
                          <component :is="`h${flexContent.level}`">{{ flexContent.text }}</component>
                        </template>
                        <template v-if="flexContent.type === 'list'">
                          <ul>
                            <li v-for="(listItem, listIndex) in flexContent.items" :key="listIndex" v-html="listItem"></li>
                          </ul>
                        </template>
                        <template v-if="flexContent.type === 'circle-icon'">
                          <div class="circle-icon">
                            <span class="icon">{{ flexContent.icon }}</span>
                            <p class="icon-text">{{ flexContent.text }}</p>
                          </div>
                        </template>
                        <template v-if="flexContent.type === 'feature-list'">
                          <ul class="feature-list">
                            <li v-for="(feature, featureIndex) in flexContent.items" :key="featureIndex">
                              <span class="feature-icon">{{ feature.icon }}</span>
                              <div>
                                <strong>{{ feature.title }}</strong>
                                <p>{{ feature.description }}</p>
                              </div>
                            </li>
                          </ul>
                        </template>
                        <template v-if="flexContent.type === 'process-diagram'">
                          <div class="process-diagram">
                            <template v-for="(step, stepIndex) in flexContent.steps" :key="stepIndex">
                              <div class="process-step">{{ step }}</div>
                              <div v-if="stepIndex < flexContent.steps.length - 1" class="process-arrow">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                              </div>
                            </template>
                          </div>
                        </template>
                      </template>
                    </div>
                  </template>
                </div>
              </template>
              <template v-if="item.type === 'comparison-container'">
                <div class="comparison-container">
                  <template v-for="(comparisonItem, comparisonIndex) in item.items" :key="comparisonIndex">
                    <div class="comparison-item" :class="comparisonItem.class">
                      <template v-for="(compContent, compContentIndex) in comparisonItem.content" :key="compContentIndex">
                        <template v-if="compContent.type === 'comparison-header'">
                          <div class="comparison-header">
                            <span class="emoji">{{ compContent.emoji }}</span>
                            <h4>{{ compContent.title }}</h4>
                          </div>
                        </template>
                        <template v-if="compContent.type === 'paragraph'">
                          <p>{{ compContent.text }}</p>
                        </template>
                        <template v-if="compContent.type === 'tag'">
                          <div class="tag">{{ compContent.text }}</div>
                        </template>
                      </template>
                    </div>
                  </template>
                </div>
              </template>
              <template v-if="item.type === 'feature-list'">
                <ul class="feature-list">
                  <li v-for="(feature, featureIndex) in item.items" :key="featureIndex">
                    <span class="feature-icon">{{ feature.icon }}</span>
                    <div>
                      <strong>{{ feature.title }}</strong>
                      <p>{{ feature.description }}</p>
                    </div>
                  </li>
                </ul>
              </template>
              <template v-if="item.type === 'process-diagram'">
                <div class="process-diagram">
                  <template v-for="(step, stepIndex) in item.steps" :key="stepIndex">
                    <div class="process-step">{{ step }}</div>
                    <div v-if="stepIndex < item.steps.length - 1" class="process-arrow">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                  </template>
                </div>
              </template>
              <template v-if="item.type === 'code-container'">
                <div class="code-container">
                  <div class="code-header">
                    <span class="code-icon">{{ item.header.icon }}</span>
                    <span>{{ item.header.text }}</span>
                  </div>
                  <div class="code-content">
                    <pre>{{ item.code }}</pre>
                  </div>
                  <div class="code-footer">
                    {{ item.footer }}
                  </div>
                </div>
              </template>
              <template v-if="item.type === 'multi-column-container'">
                <div class="multi-column-container">
                  <template v-for="(cardItem, cardIndex) in item.items" :key="cardIndex">
                    <div class="card">
                      <div class="card-icon">{{ cardItem.icon }}</div>
                      <h4>{{ cardItem.title }}</h4>
                      <ul>
                        <li v-for="(listItem, listIndex) in cardItem.listItems" :key="listIndex">{{ listItem }}</li>
                      </ul>
                    </div>
                  </template>
                </div>
              </template>
              <template v-if="item.type === 'warning-container'">
                <div class="warning-container">
                  <template v-for="(warningItem, warningIndex) in item.items" :key="warningIndex">
                    <div class="warning-item">
                      <div class="warning-icon">{{ warningItem.icon }}</div>
                      <h4>{{ warningItem.title }}</h4>
                      <p>{{ warningItem.text }}</p>
                    </div>
                  </template>
                </div>
              </template>
              <template v-if="item.type === 'summary-container'">
                <div class="summary-container">
                  <template v-for="(summaryContent, summaryIndex) in item.content" :key="summaryIndex">
                    <template v-if="summaryContent.type === 'paragraph'">
                      <p>{{ summaryContent.text }}</p>
                    </template>
                    <template v-if="summaryContent.type === 'summary-items'">
                      <div class="summary-items">
                        <template v-for="(sumItem, sumIndex) in summaryContent.items" :key="sumIndex">
                          <div class="summary-item">
                            <span class="summary-icon">{{ sumItem.icon }}</span>
                            <p>{{ sumItem.text }}</p>
                          </div>
                        </template>
                      </div>
                    </template>
                    <template v-if="summaryContent.type === 'highlight'">
                      <p class="highlight" v-html="summaryContent.text"></p>
                    </template>
                  </template>
                </div>
              </template>
            </template>
          </div>
          <div class="slide-number">
            <input
                v-model="pageNumberInput"
                type="number"
                min="1"
                :max="totalSlides"
                placeholder="页码"
                class="page-input"
                @change="handlePageNumberInput"
            /> / {{ totalSlides }}
            <span v-if="pageInputError" class="page-input-error">{{ pageInputError }}</span>
          </div>
        </div>
      </transition>
    </div>

    <div class="navigation-controls">
      <button class="nav-button prev" @click="prevSlide" :disabled="currentSlideIndex === 0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="nav-button next" @click="nextSlide" :disabled="currentSlideIndex === totalSlides - 1">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19M19 12L12 5M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 样式部分保持不变，与您提供的 <style scoped> 代码一致, 并在下面添加了新的样式 */
.presentation-container {
  width: 100%;
  height: 100vh;
  max-height: 720px;
  display: flex;
  flex-direction: column;
  font-family: 'SF Pro Display', 'Arial', sans-serif;
  position: relative;
  background-color: #fdf9fd;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(223, 186, 220, 0.15);
}

.slides-wrapper {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 3rem 4rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom right, #ffffff, #fcf5fc);
  overflow: visible; /* 修改 slide 的 overflow 为 visible */
}

.slide h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #8b5fbf;
  font-weight: 700;
  position: relative;
  padding-bottom: 0.5rem;
}

.slide h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(to right, #e291dc, #bfa6ff);
  border-radius: 2px;
}

.content {
  flex: 1;
  font-size: 1.25rem;
  line-height: 1.6;
  color: #6a5a76;
  overflow: hidden; /* Changed from overflow:auto to prevent scrollbars */
}

.slide-number {
  position: absolute;
  bottom: 1rem;
  left: 1rem; /* 修改为 left: 1rem; 使页码输入框在左下角 */
  display: flex; /* 使用 flex 布局使输入框和按钮水平排列 */
  align-items: center; /* 垂直居中对齐 */
  gap: 0.5rem; /* 输入框和按钮之间的间距 */
  font-size: 0.9rem;
  color: #bfa6ff;
  width: auto; /* 宽度设置为 auto，允许根据内容扩展 */
  min-width: 200px; /* 设置最小宽度，防止过窄 */
}

.page-input {
  width: 50px;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #d6a4e2;
  text-align: center;
  font-size: 0.9rem; /* 保持与页码相同的字体大小 */
  background-color: transparent; /* 使输入框背景透明 */
  color: #bfa6ff; /* 保持与页码相同的颜色 */
}

.go-button {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  background-color: #b57bc4;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 0.9rem; /* 保持与页码相同的字体大小 */
}

.go-button:hover {
  background-color: #9a65c0;
}


/* New slide animations */
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: all 0.5s ease;
}

.slide-next-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-next-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-prev-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-prev-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Navigation controls */
.navigation-controls {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 10;
  align-items: center; /* Align items vertically in the navigation bar */
}

.nav-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d6a4e2;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1.2rem;
  box-shadow: 0 2px 5px rgba(214, 164, 226, 0.3);
}

.nav-button:hover:not(:disabled) {
  background-color: #b57bc4;
  transform: translateY(-2px);
}

.nav-button:disabled {
  background-color: #e9d8f0;
  cursor: not-allowed;
}

/* Fullscreen button style */
.fullscreen-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #d6a4e2;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
  box-shadow: 0 2px 5px rgba(214, 164, 226, 0.3);
  z-index: 20; /* Ensure it's above other elements */
}

.fullscreen-button:hover {
  background-color: #b57bc4;
  transform: translateY(-2px);
}

.fullscreen-button svg {
  width: 20px;
  height: 20px;
}


/* Flex layouts */
.flex-container {
  display: flex;
  width: 100%;
  gap: 2rem;
  height: 100%;
}

.flex-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.visual-element {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
}


/* Multi-column container for long content */
.multi-column-container {
  display: flex; /* Use flexbox instead of grid */
  flex-wrap: wrap; /* Allow items to wrap to the next row */
  justify-content: space-between; /* Distribute space between columns */
  width: 100%;
  height: 100%;
  padding: 1rem; /* 添加内边距 */
  gap: 1.5rem; /* Gap between items, adjust as needed */
}

/* Card layout */
.card {
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(214, 164, 226, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: 200px; /* Reduced min-height for better grid layout */
  border: 1px solid rgba(214, 164, 226, 0.2);
  flex-basis: calc(33.33% - 1rem); /* Adjust width for 3 columns, considering gap */
  /* max-width: calc(33.33% - 1rem);  Optional: if you want to limit max width */
  box-sizing: border-box; /* To include padding and border in the width */
  margin-bottom: 1rem; /* Add margin between rows if needed */
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(214, 164, 226, 0.2);
}

.card-icon {
  font-size: 3.5rem; /* Increased emoji size */
  margin-bottom: 1rem;
  color: #b57bc4;
}

.card h4 {
  font-size: 1.4rem;
  margin: 0 0 1rem 0;
  color: #8b5fbf;
}

.card ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  flex: 1;
}

.card li {
  margin-bottom: 0.75rem;
  position: relative;
  padding-left: 1.5rem;
}

.card li:before {
  content: '•';
  color: #d6a4e2;
  font-size: 1.2rem;
  position: absolute;
  left: 0;
}

/* Warning items layout */
.warning-container {
  display: flex; /* Use flexbox instead of grid */
  flex-wrap: wrap; /* Allow items to wrap */
  justify-content: space-between; /* Distribute space between columns */
  width: 100%;
  gap: 1.5rem;
  height: 100%;
  align-items: flex-start; /* Align items to the start of the cross axis */
}

.warning-item {
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(214, 164, 226, 0.1);
  /* height: 70%;  Removed fixed height to allow content to dictate height */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid rgba(214, 164, 226, 0.2);
  flex-basis: calc(33.33% - 1rem); /* Adjust width for 3 columns, considering gap */
  box-sizing: border-box; /* To include padding and border in the width */
  margin-bottom: 1rem; /* Add margin between rows if needed */
}

.warning-icon {
  font-size: 3.5rem; /* Increased emoji size */
  margin-bottom: 1rem;
}

.warning-item h4 {
  font-size: 1.4rem;
  margin: 0 0 1rem 0;
  color: #8b5fbf;
}

.warning-item p {
  font-size: 1.1rem;
  color: #6a5a76;
}

/* Comparison items layout */
.comparison-container {
  display: flex;
  width: 100%;
  gap: 2rem;
  height: 85%;
}

.comparison-item {
  flex: 1;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(214, 164, 226, 0.1);
  display: flex;
  flex-direction: column;
}

.comparison-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.emoji {
  font-size: 3rem; /* Increased emoji size */
  margin-right: 0.75rem;
}

.comparison-item h4 {
  font-size: 1.4rem;
  margin: 0;
}

.comparison-item p {
  flex: 1;
  font-size: 1.2rem;
  line-height: 1.5;
}

.comparison-item.good {
  background-color: #f5f9ff;
  border: 1px solid #e0edff;
}

.comparison-item.bad {
  background-color: #fff7f7;
  border: 1px solid #ffe8e8;
}

.tag {
  align-self: flex-start;
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 500;
}

.good .tag {
  background-color: #e0edff;
  color: #4a7cc9;
}

.bad .tag {
  background-color: #ffe8e8;
  color: #c9564a;
}

/* Code container */
.code-container {
  width: 90%;
  margin: 0 auto;
  background-color: #f7f1fc;
  color: #6a5a76;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(214, 164, 226, 0.1);
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(214, 164, 226, 0.2);
}

.code-header {
  background-color: #e0d2f5;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #8b5fbf;
}

.code-icon {
  font-size: 1.5rem; /* Increased emoji size */
}

.code-content {
  padding: 1.5rem;
  overflow: auto;
  max-height: 300px;
}

.code-container pre {
  margin: 0;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 1.1rem;
  line-height: 1.5;
}

.code-footer {
  background-color: #e0d2f5;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  font-style: italic;
  color: #8b5fbf;
}

/* Summary section */
.summary-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  justify-content: center;
}

.summary-container p {
  font-size: 1.4rem;
  margin-bottom: 2rem;
}

.summary-items {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  justify-content: center; /* Center items horizontally */
  flex-wrap: wrap; /* Allow items to wrap if needed */
}

.summary-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: auto; /* Adjust basis as needed, or use fixed width */
  margin-bottom: 1rem; /* Space between wrapped rows if needed */
  width: 200px; /* Example fixed width for each item */
}

.summary-icon {
  font-size: 3.5rem; /* Increased emoji size */
  margin-bottom: 0.75rem;
  color: #b57bc4;
}

.summary-item p {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
}

.highlight {
  font-weight: bold;
  color: #8b5fbf;
  font-size: 1.5rem !important;
  background-color: #f7f1fc;
  padding: 1rem 2rem;
  border-radius: 8px;
  border-left: 4px solid #b57bc4;
}

/* Specific slide styles */
.title-slide {
  background: linear-gradient(135deg, #9a65c0, #d6a4e2);
  color: white;
  justify-content: center;
  text-align: center;
}

.title-slide h2 {
  font-size: 3.5rem;
  color: white;
  margin-bottom: 1.5rem;
}

.title-slide h2::after {
  background: rgba(255, 255, 255, 0.5);
  width: 100px;
  left: 50%;
  transform: translateX(-50%);
}

.title-slide .content {
  font-size: 1.8rem;
  color: rgba(255, 255, 255, 0.9);
}

.thank-slide {
  background: linear-gradient(135deg, #9a65c0, #d6a4e2);
  color: white;
  justify-content: center;
  text-align: center;
}

.thank-slide h2 {
  color: white;
}

.thank-slide h2::after {
  background: rgba(255, 255, 255, 0.5);
  width: 100px;
  left: 50%;
  transform: translateX(-50%);
}

.thank-slide .content {
  color: white;
}

.centered-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

/* Feature list styles */
.feature-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  display: flex;
  margin-bottom: 1.5rem;
  align-items: flex-start;
}

.feature-icon {
  font-size: 2rem;
  margin-right: 1rem;
  color: #b57bc4;
}

.feature-list li div strong {
  display: block;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: #8b5fbf;
}

.feature-list li div p {
  margin: 0;
  color: #6a5a76;
}

/* Process diagram */
.process-diagram {
  display: flex;
  align-items: center;
  background-color: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(214, 164, 226, 0.1);
  flex-wrap: wrap;
  justify-content: center;
  border: 1px solid rgba(214, 164, 226, 0.2);
}

.process-step {
  background-color: #b57bc4;
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
}

.process-arrow {
  margin: 0 0.75rem;
  color: #d6a4e2;
  display: flex;
  align-items: center;
}

/* Circle icons */
.circle-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #d6a4e2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(214, 164, 226, 0.2);
  flex-direction: column; /* Added to stack icon and text */
}

.circle-icon .icon {
  font-size: 2.5rem;
  color: white;
}

.circle-icon .icon-text {
  font-size: 1rem;
  color: white;
  margin-top: 0.5rem;
  text-align: center;
}

/* Override default styles */
ul {
  padding-left: 1.5rem;
}

ul li {
  margin-bottom: 0.75rem;
}

/* Beautification for "提示工程基础" slide */
.basic-prompt-slide .flex-container {
  align-items: center; /* Vertically align items in flex container */
}

.basic-prompt-slide .flex-item:first-child {
  padding-right: 2rem; /* Add spacing between text and icons */
}

.basic-prompt-slide .flex-item:last-child {
  display: flex;
  justify-content: space-around; /* Distribute icons evenly */
}

.basic-prompt-slide .circle-icon {
  margin-bottom: 0; /* Remove bottom margin for icons in "提示工程基础" */
}

.basic-prompt-slide h3 {
  color: #8b5fbf; /* Consistent heading color */
  margin-bottom: 1rem;
}

.basic-prompt-slide ul li {
  color: #6a5a76; /* Consistent list item color */
}

/* Beautification for "链式思考示例" slide */
.chain-of-thought-slide .code-container {
  border: 2px solid #d6a4e2; /* More prominent border */
  box-shadow: 0 6px 15px rgba(214, 164, 226, 0.2); /* Enhanced shadow */
}

.chain-of-thought-slide .code-header {
  background-color: #d6a4e2; /* More vibrant header */
  color: white;
  font-weight: 600;
}

.chain-of-thought-slide .code-footer {
  background-color: #f7f1fc; /* Lighter footer background */
  color: #8b5fbf;
  border-top: 1px solid #d6a4e2; /* Separator line */
}

.chain-of-thought-slide .code-content pre {
  font-size: 1.15rem; /* Slightly larger code font */
  line-height: 1.7; /* Improved code line height */
  white-space: pre-line; /* Enable line breaks in code */
}

/* New styles for error message */
.page-input-error {
  color: #c9564a; /* Error text color, matching the "bad" tag color */
  font-size: 0.8rem;
  margin-left: 0.5rem;
  position: relative; /* 修改为 relative */
  display: block; /* 确保占据空间，如果需要 */
  margin-top: 0.25rem; /* 调整与输入框的距离 */
}
</style>
