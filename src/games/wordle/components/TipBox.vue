<template>
    <div class="tip-box" :class="{ 'show': show }">
        <div class="tip-header">
        <h3>游戏提示</h3>
        <button class="close-tip" @click="$emit('close')">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
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
                    <button @click="prevPage" :disabled="currentPage === 1" class="pagination-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>
                    <span class="pagination-info">{{ currentPage }} / {{ totalPages }}</span>
                    <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
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
            <button @click="showFullList = false">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
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
import { ref, computed, watch } from 'vue';

export default {
  props: {
    show: Boolean,
    currentRow: Number,
    remainingAttempts: Number,
    words: Array,
    isMobile: Boolean
  },
  emits: ['close'],
  
  setup(props) {
    const showFullList = ref(false);
    const currentPage = ref(1);
    const itemsPerPage = 8; // 每页显示数量

    // 当提示列表或剩余尝试次数变化时，重置页码
    watch(() => props.words, () => {
      currentPage.value = 1;
    });
    
    watch(() => props.remainingAttempts, () => {
      currentPage.value = 1;
    });

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
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    z-index: 90;
    transition: transform 0.3s, opacity 0.3s;
    transform: translateY(20px);
    opacity: 0;
    pointer-events: none;
    overflow: hidden;
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
    border-bottom: 1px solid #eaeaea;
    background-color: #f8f8f8;
  }
  
  .tip-header h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #333;
  }
  
  .close-tip {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    border-radius: 50%;
    transition: background-color 0.2s;
  }
  
  .close-tip:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  .tip-content {
    padding: 1rem;
  }
  
  .tip-content p {
    margin: 0;
    margin-bottom: 0.75rem;
    line-height: 1.5;
    color: #444;
  }
  
  .tip-text {
    font-size: 0.95rem;
  }
  
  .words-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.6rem;
    margin: 1rem 0;
  }

  .word-item {
    padding: 0.6rem;
    background: #f5f5f5;
    border-radius: 6px;
    text-align: center;
    font-family: monospace, sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    letter-spacing: 0.5px;
    transition: background-color 0.2s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    border: 1px solid #eee;
  }
  
  .word-item:hover {
    background: #edf2ff;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
  }

  .pagination-info {
    font-size: 0.9rem;
    color: #555;
    font-weight: 500;
    min-width: 40px;
    text-align: center;
  }

  .pagination-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    background: #f0f0f0;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #555;
  }
  
  .pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .pagination-btn:not(:disabled):hover {
    background: #e0e0e0;
    transform: translateY(-1px);
  }

  .mobile-list-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    backdrop-filter: blur(3px);
  }

  .modal-content {
    background: white;
    width: 90%;
    max-width: 600px;
    max-height: 80vh;
    padding: 1.2rem;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    overflow-y: auto;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid #eee;
  }
  
  .modal-header h4 {
    margin: 0;
    font-size: 1.1rem;
    color: #333;
  }
  
  .modal-header button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    border-radius: 50%;
  }
  
  .modal-header button:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  @media (max-width: 767px) {
    .tip-box {
      width: calc(100% - 40px);
      bottom: 10px;
      right: 10px;
      left: 10px;
      max-width: 380px;
      margin: 0 auto;
    }
    
    .words-grid {
      grid-template-columns: repeat(3, 1fr);
    }
    
    .word-item {
      font-size: 0.85rem;
      padding: 0.5rem;
    }
  }
</style>
