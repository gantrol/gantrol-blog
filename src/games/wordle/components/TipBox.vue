<template>
    <div class="tip-box" :class="{ 'show': show }">
        <div class="tip-header">
        <h3>游戏提示</h3>
        <button class="close-tip" @click="$emit('close')">×</button>
        </div>
        
        <div class="tip-content">
        <!-- 动态提示内容 -->
        <div v-if="currentRow === 0">
            <p class="tip-text">尝试猜一个有效的5字母单词开始游戏。</p>
        </div>  
        
        <div v-else-if="remainingAttempts <= 5">
            <p class="tip-text">
            🟩 绿色 - 位置正确<br>
            🟨 黄色 - 存在但位置错误<br>
            ⬛ 灰色 - 字母不存在
            </p>
            <p class="tip-text">还有 {{ remainingAttempts }} 次机会！可能选项：</p>
            
            <!-- 桌面端显示模式 -->
            <div class="desktop-words">
                <div class="words-grid">
                    <div 
                        v-for="(word, index) in visibleWords" 
                        :key="index" 
                        class="word-item"
                        >
                        {{ word.toUpperCase() }}
                    </div>
                </div>
                <div class="pagination" v-if="totalPages > 1">
                    <button @click="prevPage" :disabled="currentPage === 1">←</button>
                    <span>{{ currentPage }}/{{ totalPages }}</span>
                    <button @click="nextPage" :disabled="currentPage === totalPages">→</button>
                </div>
            </div>
        </div>

        <div v-else>
            
        </div>
        </div>

        <!-- 移动端弹出层 -->
        <div 
        class="mobile-list-modal" 
        v-if="showFullList" 
        @click.self="showFullList = false"
        >
        <div class="modal-content">
            <div class="modal-header">
            <h4>可能选项</h4>
            <button @click="showFullList = false">×</button>
            </div>
            <div class="words-grid">
            <div 
                v-for="(word, index) in words" 
                :key="index" 
                class="word-item"
            >
                {{ word.toUpperCase() }}
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  props: {
    show: Boolean,
    currentRow: Number,
    remainingAttempts: Number,
    words: Array,        // 新增属性
    isMobile: Boolean    // 新增属性
  },
  emits: ['close'],
  
  setup(props) {
    const showFullList = ref(false);
    const currentPage = ref(1);
    const itemsPerPage = 8; // 每页显示数量

    const totalPages = computed(() => 
      Math.ceil(props.words.length / itemsPerPage)
    );

    const visibleWords = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      return props.words.slice(start, start + itemsPerPage);
    });

    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--;
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++;
    };

    return { 
      showFullList,
      currentPage,
      totalPages,
      visibleWords,
      prevPage,
      nextPage
    };
  }
}
</script>

<style scoped>
  .tip-box {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 300px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 90;
    transition: transform 0.3s, opacity 0.3s;
    transform: translateY(20px);
    opacity: 0;
    pointer-events: none;
  }
  
  .tip-box.show {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }
  
  .tip-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #eee;
  }
  
  .tip-header h3 {
    margin: 0;
    font-size: 1rem;
  }
  
  .close-tip {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0;
  }
  
  .tip-content {
    padding: 1rem;
  }
  
  .tip-content p {
    margin: 0;
    line-height: 1.5;
  }
  
  @media (max-width: 767px) {
    .tip-box {
      width: calc(100% - 40px);
      bottom: 10px;
      right: 10px;
      left: 10px;
    }
  }
  .words-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin: 1rem 0;
}

.word-item {
  padding: 0.5rem;
  background: #f0f0f0;
  border-radius: 4px;
  text-align: center;
  font-family: monospace;
  font-size: 0.9rem;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.pagination button {
  padding: 0.3rem 0.8rem;
  background: #e0e0e0;
  border: none;
  border-radius: 4px;
}

.mobile-words button {
  width: 100%;
  padding: 0.8rem;
  margin-top: 1rem;
}

.mobile-list-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  padding: 1rem;
  border-radius: 8px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
</style>
  