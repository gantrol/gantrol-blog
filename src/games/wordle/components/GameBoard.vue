<template>
  <div class="game-board">
    <div
        v-for="(row, rowIndex) in board"
        :key="rowIndex"
        class="board-row"
        :class="{ 'current-row': rowIndex === currentRow, 'shake-row': shakeRow === rowIndex }"
    >
      <div
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          class="board-cell"
          :class="{
          'filled': cell !== '',
          'correct': evaluation[rowIndex][colIndex] === 3,
          'present': evaluation[rowIndex][colIndex] === 2,
          'absent': evaluation[rowIndex][colIndex] === 1,
          'evaluated': evaluation[rowIndex][colIndex] !== 0,
          'flip': flipRow === rowIndex && flipInProgress,
          'bounce': bounceRow === rowIndex
        }"
          :style="{
          'animation-delay': `${colIndex * 0.1}s`,
          'transition-delay': `${colIndex * 0.1}s`
        }"
      >
        {{ cell }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    board: {
      type: Array,
      required: true
    },
    currentRow: {
      type: Number,
      required: true
    },
    evaluation: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const flipRow = ref(-1);
    const flipInProgress = ref(false);
    const shakeRow = ref(-1);
    const bounceRow = ref(-1);

    // 监听评估变化，添加翻转动画
    watch(() => [...props.evaluation.map(row => [...row])], (newValue, oldValue) => {
      for (let row = 0; row < newValue.length; row++) {
        if (newValue[row].some(val => val > 0) &&
            oldValue[row].every(val => val === 0)) {
          // 触发翻转动画
          flipRow.value = row;
          flipInProgress.value = true;

          setTimeout(() => {
            flipInProgress.value = false;
          }, 1500);
          break;
        }
      }
    }, { deep: true });

    // 抖动动画
    const shake = (row) => {
      shakeRow.value = row;
      setTimeout(() => {
        shakeRow.value = -1;
      }, 600);
    };

    // 弹跳动画
    const bounce = (row) => {
      bounceRow.value = row;
      setTimeout(() => {
        bounceRow.value = -1;
      }, 1000);
    };

    return {
      flipRow,
      flipInProgress,
      shakeRow,
      bounceRow,
      shake,
      bounce
    };
  }
}
</script>

<style scoped>
.game-board {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.board-row {
  display: flex;
  gap: 0.5rem;
}

.board-cell {
  width: 4rem;
  height: 4rem;
  border: 2px solid #d3d6da;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.2s;
}

.filled {
  border-color: #878a8c;
}

/* 评估结果样式 */
.correct {
  background-color: #6aaa64;
  border-color: #6aaa64;
  color: white;
}

.present {
  background-color: #c9b458;
  border-color: #c9b458;
  color: white;
}

.absent {
  background-color: #787c7e;
  border-color: #787c7e;
  color: white;
}

/* 翻转动画 */
.flip {
  animation: flip 0.5s ease forwards;
  transform-style: preserve-3d;
}

@keyframes flip {
  0% {
    transform: rotateX(0deg);
    background-color: white;
  }
  50% {
    transform: rotateX(90deg);
    background-color: white;
  }
  100% {
    transform: rotateX(0deg);
  }
}

/* 抖动动画 */
.shake-row {
  animation: shake 0.6s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

/* 弹跳动画 */
.bounce {
  animation: bounce 1s ease;
}

@keyframes bounce {
  0%, 20% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  50% {
    transform: translateY(5px);
  }
  60% {
    transform: translateY(-15px);
  }
  80% {
    transform: translateY(2px);
  }
  100% {
    transform: translateY(0);
  }
}

/* 移动端样式 */
@media (max-width: 767px) {
  .board-cell {
    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;
  }
}
</style>
