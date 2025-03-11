<template>
  <div class="word-list" :class="{ 'mobile': isMobile }">
    <h3>可能的单词</h3>

    <div v-if="isMobile" class="mobile-controls">
      <button @click="openWordModal = true">查看单词列表</button>
    </div>

    <template v-else>
      <div class="list-container">
        <div v-if="words.length === 0" class="empty-state">
          无匹配单词
        </div>
        <div v-else class="words-grid">
          <div
              v-for="word in paginatedWords"
              :key="word"
              class="word-item"
          >
            {{ word.toUpperCase() }}
          </div>
        </div>
      </div>

      <div class="pagination" v-if="totalPages > 1">
        <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
        >
          上一页
        </button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
        >
          下一页
        </button>
      </div>
    </template>

    <!-- 移动端弹出窗口 -->
    <div v-if="openWordModal" class="mobile-word-modal" @click.self="openWordModal = false">
      <div class="mobile-word-content">
        <div class="modal-header">
          <h3>可能的单词</h3>
          <button class="close-button" @click="openWordModal = false">×</button>
        </div>

        <div class="mobile-list-container">
          <div v-if="words.length === 0" class="empty-state">
            无匹配单词
          </div>
          <div v-else class="mobile-words-grid">
            <div
                v-for="word in words"
                :key="word"
                class="mobile-word-item"
            >
              {{ word.toUpperCase() }}
            </div>
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
    words: {
      type: Array,
      default: () => []
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const currentPage = ref(1);
    const itemsPerPage = 20;
    const openWordModal = ref(false);

    const totalPages = computed(() => {
      return Math.ceil(props.words.length / itemsPerPage);
    });

    const paginatedWords = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return props.words.slice(start, end);
    });

    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    };

    return {
      currentPage,
      totalPages,
      paginatedWords,
      goToPage,
      openWordModal
    };
  }
}
</script>

<style scoped>
.word-list {
  width: 300px;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  height: fit-content;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.word-list h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: center;
}

.list-container {
  height: 300px;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: white;
}

.words-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  padding: 0.5rem;
}

.word-item {
  padding: 0.5rem;
  background-color: #e9ecef;
  border-radius: 4px;
  text-align: center;
  font-family: monospace;
  text-transform: uppercase;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  background-color: #e0e0e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #6c757d;
}

/* 移动端样式 */
.mobile {
  width: 100%;
  margin-top: 1rem;
}

.mobile-controls {
  display: flex;
  justify-content: center;
}

.mobile-controls button {
  padding: 0.75rem 1.5rem;
  background-color: #e0e0e0;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

.mobile-word-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.mobile-word-content {
  background-color: white;
  width: 90%;
  max-width: 500px;
  height: 80vh;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.mobile-list-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.mobile-words-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.mobile-word-item {
  padding: 0.75rem 0.5rem;
  background-color: #e9ecef;
  border-radius: 4px;
  text-align: center;
  font-family: monospace;
  text-transform: uppercase;
}
</style>
