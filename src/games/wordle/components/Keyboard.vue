<template>
  <div class="keyboard">
    <div v-for="(row, rowIndex) in keyboardLayout" :key="rowIndex" class="keyboard-row">
      <button
          v-for="key in row"
          :key="key"
          class="keyboard-key"
          :class="{
          'key-wide': key === 'ENTER' || key === 'BACKSPACE',
          'key-correct': evaluation[key] === 3,
          'key-present': evaluation[key] === 2,
          'key-absent': evaluation[key] === 1
        }"
          @click="emitKeyPress(key)"
      >
        <template v-if="key === 'BACKSPACE'">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path fill="currentColor" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
          </svg>
        </template>
        <template v-else>
          {{ key }}
        </template>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    evaluation: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const keyboardLayout = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
    ];

    const emitKeyPress = (key) => {
      emit('key-pressed', key);
    };

    return {
      keyboardLayout,
      emitKeyPress
    };
  }
}
</script>

<style scoped>
.keyboard {
  width: 100%;
  margin-top: 1rem;
  user-select: none;
}

.keyboard-row {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.keyboard-key {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 2.5rem;
  height: 3.5rem;
  margin: 0 0.25rem;
  padding: 0 0.5rem;
  border-radius: 4px;
  background-color: #d3d6da;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.keyboard-key:active {
  transform: scale(0.95);
}

.key-wide {
  min-width: 4rem;
  font-size: 0.8rem;
}

.key-correct {
  background-color: #6aaa64;
  color: white;
}

.key-present {
  background-color: #c9b458;
  color: white;
}

.key-absent {
  background-color: #787c7e;
  color: white;
}


/* 移动端样式 - 更新以适应小屏幕 */
@media (max-width: 767px) {
  .keyboard {
    width: 95%; /* 稍微缩小宽度 */
  }

  .keyboard-key {
    min-width: 1.8rem; /* 减小按键宽度 */
    height: 3rem;
    margin: 0 0.1rem; /* 减小间距 */
    padding: 0 0.3rem;
    font-size: 0.8rem;
  }

  .key-wide {
    min-width: 3rem; /* 减小宽按键宽度 */
    font-size: 0.7rem;
  }
}

/* 超小屏幕适配 */
@media (max-width: 350px) {
  .keyboard-key {
    min-width: 1.6rem;
    height: 2.8rem;
    margin: 0 0.05rem;
    padding: 0 0.2rem;
    font-size: 0.7rem;
  }

  .key-wide {
    min-width: 2.8rem;
    font-size: 0.65rem;
  }
}
</style>
