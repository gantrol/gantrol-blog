<template>
  <div class="app-table-container">
    <div class="search-container">
      <input
          v-model="searchQuery"
          placeholder="搜索应用..."
          class="search-input"
          @focus="searchFocused = true"
          @blur="searchFocused = false"
      />
      <div class="search-icon" :class="{ 'search-focused': searchFocused }">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
    </div>

    <transition-group
        name="table-sort"
        tag="tbody"
        :css="false"
        @before-leave="onBeforeLeave"
        @leave="onLeave"
        @enter="onSortEnter"
        @after-enter="onAfterEnter"
    >
      <table class="app-table">
        <thead>
        <tr>
          <th v-for="(header, index) in headers"
              :key="index"
              @click="sortBy(header.key)"
              :class="{ 'active-sort': sortKey === header.key }"
          >
            {{ header.label }}
            <span v-if="sortKey === header.key" class="sort-icon" :class="sortOrder">
              {{ sortOrder === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(app, index) in filteredAndSortedApps" :key="app.name"
            :style="{ animationDelay: `${index * 0.05}s` }"
            @mouseenter="hoveredRow = index"
            @mouseleave="hoveredRow = null"
            :class="{ 'row-hovered': hoveredRow === index }">
          <td v-for="(header, colIndex) in headers" :key="colIndex"
              :class="{ 'cell-highlight': hoveredRow === index }">
            <div class="cell-content">
                <span v-if="header.key === 'isOpenSource' || header.key === 'isPaid'">
                  <svg v-if="app[header.key]" class="icon check-icon" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
                  </svg>
                  <svg v-else class="icon x-icon" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
                  </svg>
                </span>
              <span v-else>{{ app[header.key] }}</span>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </transition-group>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, watch} from 'vue';

const searchQuery = ref('');
const sortKey = ref('name');
const sortOrder = ref('asc');
const hoveredRow = ref(null);
const searchFocused = ref(false);

const headers = [
  { key: 'name', label: '应用名称' },
  { key: 'historyCount', label: '历史记录条数' },
  { key: 'syncFeature', label: '同步功能' },
  { key: 'isPaid', label: '收费?' },
  { key: 'isOpenSource', label: '开源?' },
  { key: 'platforms', label: '支持平台' }
];

const apps = ref([
  {
    name: 'Windows 内置剪贴板',
    historyCount: '多条，未明确限制',
    syncFeature: '跨设备同步',
    isPaid: false,
    isOpenSource: false,
    platforms: 'Windows'
  },
  {
    name: 'Pasteboard',
    historyCount: '无限，数月',
    syncFeature: '计划支持',
    isPaid: true,
    isOpenSource: false,
    platforms: 'Windows'
  },
  {
    name: 'ClipboardFusion',
    historyCount: '默认100，最多10,000',
    syncFeature: '跨设备同步',
    isPaid: true,
    isOpenSource: false,
    platforms: '几乎全平台'
  },
  {
    name: 'ClipClip',
    historyCount: '未明确限制',
    syncFeature: '',
    isPaid: false,
    isOpenSource: false,
    platforms: 'Windows'
  },
  {
    name: 'Ditto',
    historyCount: '（很难用，算了）',
    syncFeature: '多电脑同步',
    isPaid: false,
    isOpenSource: true,
    platforms: 'Windows'
  },
  {
    name: 'AceText',
    historyCount: '（有点丑，不试用了）',
    syncFeature: '',
    isPaid: true,
    isOpenSource: false,
    platforms: 'Windows'
  },
  {
    name: 'Clipboard Master',
    historyCount: '10,000',
    syncFeature: '',
    isPaid: true,
    isOpenSource: false,
    platforms: 'Windows'
  },
  {
    name: 'CopyQ',
    historyCount: '默认20，最多100,000',
    syncFeature: '',
    isPaid: false,
    isOpenSource: true,
    platforms: 'Windows, Linux, macOS'
  }
]);

const filteredAndSortedApps = computed(() => {
  let result = apps.value;

  // Filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(app =>
        app.name.toLowerCase().includes(query) ||
        app.platforms.toLowerCase().includes(query) ||
        app.syncFeature.toLowerCase().includes(query) ||
        app.historyCount.toLowerCase().includes(query)
    );
  }

  // Sort
  result = [...result].sort((a, b) => {
    const aValue = a[sortKey.value];
    const bValue = b[sortKey.value];

    if (sortKey.value === 'isPaid' || sortKey.value === 'isOpenSource') {
      return sortOrder.value === 'asc' ? aValue - bValue : bValue - aValue;
    } else {
      if (aValue < bValue) return sortOrder.value === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder.value === 'asc' ? 1 : -1;
      return 0;
    }
  });

  return result;
});

const sortBy = (key) => {
  // 保存当前行的状态和位置信息
  const rows = document.querySelectorAll('.app-table tbody tr');
  prevPositions.value.clear();

  rows.forEach(row => {
    const rect = row.getBoundingClientRect();
    prevPositions.value.set(row._uid, rect);
  });

  // 更新排序状态
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
};


const onBeforeEnter = (el) => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(30px)';
};

const onEnter = (el, done) => {
  const delay = el.dataset.index * 50;
  setTimeout(() => {
    el.style.transition = 'all 0.4s ease-out';
    el.style.opacity = 1;
    el.style.transform = 'translateY(0)';
    done();
  }, delay);
};

const onLeave = (el, done) => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(-20px)';
  setTimeout(done, 300);
};

// 保存元素位置信息
const prevPositions = ref(new Map());

// 在元素离开前记录位置
const onBeforeLeave = (el) => {
  const rect = el.getBoundingClientRect();
  prevPositions.value.set(el._uid, rect);
};

// 排序动画
const onSortEnter = (el, done) => {
  const prevPos = prevPositions.value.get(el._uid);
  if (!prevPos) {
    done();
    return;
  }

  const newRect = el.getBoundingClientRect();
  const dx = prevPos.left - newRect.left;
  const dy = prevPos.top - newRect.top;

  el.style.transform = `translate(${dx}px, ${dy}px)`;
  el.style.transition = 'none';

  // 触发回流
  el.offsetHeight;

  el.style.transition = 'all 0.5s ease';
  el.style.transform = 'translate(0, 0)';

  el.addEventListener('transitionend', done, { once: true });
};

const onAfterEnter = (el) => {
  // 清除可能残留的内联样式
  el.style.transition = '';
  el.style.transform = '';
};

onMounted(() => {
  // Add initial animation class
  const tableWrapper = document.querySelector('.table-wrapper');
  if (tableWrapper) {
    tableWrapper.classList.add('table-appear');
  }
});

// 在<script>部分的计算属性中添加
watch(searchQuery, (newVal, oldVal) => {
  // 当搜索查询变化时触发动画重置
  if (newVal !== oldVal) {
    const rows = document.querySelectorAll('.app-table tbody tr');
    rows.forEach((row, index) => {
      row.style.animationName = 'none';
      row.offsetHeight; // 触发重排
      row.style.animationName = '';
      row.style.animationDelay = `${index * 0.05}s`;
    });
  }
});

</script>

<style scoped>
:root {
  /* 更自然的马卡龙色调 */
  --macaron-pink: #f5c0d0;
  --macaron-mint: #c5e8e0;
  --macaron-lavender: #d5c5e8;
  --macaron-blue: #c0d8f0;
  --macaron-yellow: #f5e8c0;

  /* 次要色调 */
  --text-primary: #464646;
  --text-secondary: #666;
  --bg-light: rgba(255, 255, 255, 0.85);
  --shadow-soft: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.app-table tr:nth-child(odd) {
  background-color: rgba(245, 232, 192, 0.07);
}

.app-table tr:nth-child(even) {
  background-color: rgba(245, 192, 208, 0.03);
}


.app-table-container {
  margin: 2rem 0;
  font-family: 'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  border-radius: 16px;
  padding: 1.5rem;
  background: linear-gradient(145deg, var(--bg-light), rgba(245, 192, 208, 0.1));
  box-shadow: var(--shadow-soft);
}

.table-wrapper {
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(248, 200, 220, 0.15);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
}

.search-container {
  position: relative;
  margin-bottom: 1.8rem;
  max-width: 300px;
}

.search-input {
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 2.5rem;
  border-radius: 24px;
  border: 2px solid var(--macaron-pink);
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.9);
  color: #555;
  box-shadow: 0 4px 12px rgba(248, 200, 220, 0.15);
}

.search-input:focus {
  outline: none;
  border-color: var(--macaron-lavender);
  box-shadow: 0 0 0 4px rgba(217, 200, 248, 0.2);
}

.search-icon {
  position: absolute;
  left: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--macaron-pink);
  transition: color 0.3s ease;
}

.search-focused {
  color: var(--macaron-lavender);
}
.app-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 0.95rem;
}

.app-table thead {
  background-color: rgba(248, 200, 220, 0.1);
}

.app-table th {
  padding: 1.2rem 1.5rem;
  text-align: left;
  font-weight: 600;
  color: #555;
  border-bottom: 2px solid var(--macaron-pink);
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.app-table th:hover {
  background-color: rgba(248, 200, 220, 0.2);
}

.app-table td {
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid rgba(248, 200, 220, 0.3);
  color: #555;
  transition: all 0.3s ease;
}

.app-table tr:nth-child(odd) {
  background-color: rgba(248, 238, 200, 0.1);
}

.app-table tr:nth-child(even) {
  background-color: rgba(248, 200, 220, 0.05);
}

.row-hovered {
  background-color: rgba(189, 238, 232, 0.2) !important;
}

.cell-highlight::after {
  background-color: var(--macaron-pink);
  height: 3px;
  border-radius: 3px;
}


.row-hovered .cell-highlight::after {
  width: 80%;
  left: 10%;
}

.cell-content {
  display: flex;
  align-items: center;
}

.sort-icon {
  margin-left: 0.5rem;
  font-size: 0.8rem;
  opacity: 0.7;
}

.icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.check-icon {
  color: var(--macaron-mint);
}

.x-icon {
  color: #939191;
  opacity: 0.7;
}

.app-table th.active-sort {
  background-color: rgba(248, 200, 220, 0.25);
  position: relative;
}

.app-table th.active-sort::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--macaron-pink);
  animation: sortHighlight 0.5s ease;
}

@keyframes sortHighlight {
  0% { transform: scaleX(0); }
  100% { transform: scaleX(1); }
}

/* Animations */
@keyframes tableAppear {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.96);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes rowFadeIn {
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.app-table tbody tr:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(248, 200, 220, 0.2);
}

/* 在<style>部分添加 */
.table-fade-enter-active,
.table-fade-leave-active {
  transition: all 0.4s ease-out;
}

.table-fade-enter-from,
.table-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 每行的动画效果 */
.app-table tbody tr {
  animation: rowFadeIn 0.5s ease-out forwards;
  animation-fill-mode: both;
}


/* 搜索框动画效果 */
.search-input {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.search-input:focus {
  transform: scale(1.02);
}

/* 搜索图标动画 */
.search-icon {
  transition: all 0.3s ease;
}

.search-focused .search-icon {
  transform: translateY(-50%) scale(1.1) rotate(-5deg);
  color: var(--macaron-lavender);
}

/* 搜索结果动画 */
@keyframes searchHighlight {
  0% {
    background-color: rgba(248, 200, 220, 0.2);
  }
  50% {
    background-color: rgba(248, 200, 220, 0.4);
  }
  100% {
    background-color: rgba(248, 200, 220, 0.2);
  }
}

/* 搜索匹配结果高亮动画 */
.search-match {
  position: relative;
  animation: searchHighlight 2s ease infinite;
  border-radius: 4px;
  padding: 0 4px;
  margin: 0 -4px;
}

.app-table tbody tr {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
}

.app-table tbody tr:hover {
  transform: translateY(-3px);
  z-index: 1;
  box-shadow: 0 6px 16px rgba(245, 192, 208, 0.15);
}

.search-input {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-input:focus {
  transform: scale(1.02);
  box-shadow: 0 0 0 3px rgba(217, 197, 232, 0.3);
}

/* 添加排序图标动画 */
.sort-icon {
  transition: transform 0.3s ease;
}

.sort-icon.asc {
  transform: translateY(-2px);
}

.sort-icon.desc {
  transform: translateY(2px);
}

/* 添加行点击波纹效果 */
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}


/* 搜索无结果动画 */
@keyframes emptySearch {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.empty-search-results {
  text-align: center;
  padding: 2rem;
  color: #777;
  background-color: rgba(248, 238, 200, 0.1);
  border-radius: 12px;
  animation: emptySearch 0.5s ease forwards;
}

/* 搜索输入时的表格过滤动画 */
.table-filter-enter-active,
.table-filter-leave-active {
  transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}

.table-filter-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.table-filter-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

/* 搜索清空按钮 */
.search-clear {
  position: absolute;
  right: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--macaron-pink);
  opacity: 0;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 16px;
  height: 16px;
}

.search-input:not(:placeholder-shown) + .search-clear {
  opacity: 0.7;
}

.search-clear:hover {
  opacity: 1;
  transform: translateY(-50%) rotate(90deg);
}


/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .table-wrapper {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .app-table th,
  .app-table td {
    padding: 0.75rem 1rem;
  }

  .search-container {
    max-width: 100%;
  }
}
</style>
