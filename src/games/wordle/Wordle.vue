<template>
  <ClientOnly>
    <div class="app-container" :class="{ 'mobile': isMobile }">
      <header>
        <h1>Wordle</h1>
        <div class="header-buttons">
          <button class="icon-button lightbulb-button" @click="showTips = !showTips" title="游戏提示">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </button>
        <button class="icon-button help-button" @click="showHowToPlay = true" title="如何游玩">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </button>
      </div>
      </header>

      <main>
        <div class="game-section">
          <GameBoard
              :board="board"
              :currentRow="currentRow"
              :evaluation="evaluation"
              ref="gameBoard"
          />
          <Keyboard
              @key-pressed="handleKeyPress"
              :evaluation="keyEvaluation"
          />
        </div>
      </main>

      <TipBox 
        :show="showTips" 
        :currentRow="currentRow"
        :words="filteredWordList"
        :isMobile="isMobile"
        :remainingAttempts="remainingAttempts"
        @close="showTips = false"
      />


      <transition name="slide">
        <HowToPlay v-if="showHowToPlay" @close="showHowToPlay = false" />
      </transition>

      <transition name="popup">
        <div class="game-message" v-if="gameOver">
          <h2 style="margin: 0 0 16px; border-top: none">{{ win ? '恭喜!' : '游戏结束' }}</h2>
          <p>{{ win ? `你用了 ${currentRow + 1} 步猜出了单词!` : `正确答案是: ${targetWord}` }}</p>
          <button @click="resetGame">再玩一次</button>
        </div>
      </transition>
    </div>
  </ClientOnly>
</template>

<script>
import { ref, computed, onMounted, reactive, watch } from 'vue';
import GameBoard from './components/GameBoard.vue';
import Keyboard from './components/Keyboard.vue';
import HowToPlay from './components/HowToPlay.vue';
import TipBox from './components/TipBox.vue';
import { wordList, targetWords } from './assets/words.js';

export default {
  components: {
    GameBoard,
    Keyboard,
    HowToPlay,
    TipBox,
  },
  setup() {
    const MAX_ATTEMPTS = 6;
    const WORD_LENGTH = 5;

    const isMobile = ref(false);
    const showHowToPlay = ref(false);
    const showTips = ref(false); 
    const targetWord = ref('');
    const currentRow = ref(0);
    const currentCol = ref(0);
    const gameOver = ref(false);
    const win = ref(false);
    const gameBoard = ref(null);

    // 初始化游戏板
    const board = reactive(Array(MAX_ATTEMPTS).fill().map(() => Array(WORD_LENGTH).fill('')));

    // 评估结果 (0: 未评估, 1: 不在单词中, 2: 位置错误, 3: 位置正确)
    const evaluation = reactive(Array(MAX_ATTEMPTS).fill().map(() => Array(WORD_LENGTH).fill(0)));

    // 键盘评估
    const keyEvaluation = reactive({});

    // 计算剩余尝试次数
    const remainingAttempts = computed(() => MAX_ATTEMPTS - currentRow.value);

    // 过滤可能的单词列表
    const filteredWordList = computed(() => {
      if (remainingAttempts.value > 5) return [];

      return targetWords.filter(word => {
        const upperWord = word.toUpperCase();
        // 基于已知的评估结果过滤单词
        for (let row = 0; row < currentRow.value; row++) {
          const guessWord = board[row].join('');

          for (let col = 0; col < WORD_LENGTH; col++) {
            const letter = guessWord[col];

            // 字母正确位置正确（绿色）
            if (evaluation[row][col] === 3 && upperWord[col] !== letter) {
              return false;
            }

            // 字母正确位置错误（黄色）
            if (evaluation[row][col] === 2) {
              if (!upperWord.includes(letter) || upperWord[col] === letter) {
                return false;
              }
            }

            // 字母不在单词中（灰色）
            if (evaluation[row][col] === 1) {
              const targetLetterCount = upperWord.split('').filter(l => l === letter).length;
              const correctPositions = guessWord.split('').filter((l, i) =>
                  l === letter && (evaluation[row][i] === 2 || evaluation[row][i] === 3)
              ).length;

              if (targetLetterCount > correctPositions && upperWord.includes(letter)) {
                return false;
              }
            }
          }
        }
        return true;
      });
    });

    // 处理键盘输入
    const handleKeyPress = (key) => {
      if (gameOver.value) return;

      if (key === 'ENTER') {
        submitGuess();
      } else if (key === 'BACKSPACE') {
        deleteLetter();
      } else if (/^[A-Z]$/.test(key) && currentCol.value < WORD_LENGTH) {
        board[currentRow.value][currentCol.value] = key;
        currentCol.value++;
      }
    };

    // 提交猜测
    const submitGuess = () => {
      if (currentCol.value !== WORD_LENGTH) return;

      const guessWord = board[currentRow.value].join('').toLowerCase();

      // 验证单词是否在词库中
      if (!wordList.includes(guessWord)) {
        // 抖动动画
        gameBoard.value.shake(currentRow.value);
        return;
      }

      // 评估猜测
      evaluateGuess(board[currentRow.value].join(''), currentRow.value);

      // 检查是否获胜
      if (board[currentRow.value].join('') === targetWord.value) {
        win.value = true;
        gameOver.value = true;
        // 胜利动画
        gameBoard.value.bounce(currentRow.value);
        return;
      }

      // 下一行
      currentRow.value++;
      currentCol.value = 0;

      // 检查是否游戏结束
      if (currentRow.value >= MAX_ATTEMPTS) {
        gameOver.value = true;
      }
    };

    // 评估猜测
    const evaluateGuess = (guess, row) => {
      const targetChars = targetWord.value.split('');
      const guessChars = guess.split('');

      // 先标记完全匹配的字母（绿色）
      for (let i = 0; i < WORD_LENGTH; i++) {
        if (guessChars[i] === targetChars[i]) {
          evaluation[row][i] = 3;
          keyEvaluation[guessChars[i]] = 3;
          targetChars[i] = null; // 标记已匹配
        }
      }

      // 再标记存在但位置错误的字母（黄色）
      for (let i = 0; i < WORD_LENGTH; i++) {
        if (evaluation[row][i] !== 0) continue;

        const charIndex = targetChars.indexOf(guessChars[i]);
        if (charIndex !== -1) {
          evaluation[row][i] = 2;
          if (!keyEvaluation[guessChars[i]] || keyEvaluation[guessChars[i]] < 2) {
            keyEvaluation[guessChars[i]] = 2;
          }
          targetChars[charIndex] = null; // 标记已匹配
        } else {
          evaluation[row][i] = 1; // 不在单词中
          if (!keyEvaluation[guessChars[i]]) {
            keyEvaluation[guessChars[i]] = 1;
          }
        }
      }
    };

    // 删除字母
    const deleteLetter = () => {
      if (currentCol.value > 0) {
        currentCol.value--;
        board[currentRow.value][currentCol.value] = '';
      }
    };

    // 重置游戏
    const resetGame = () => {
      // 选择新的目标单词
      targetWord.value = targetWords[Math.floor(Math.random() * targetWords.length)].toUpperCase();

      // 重置状态
      currentRow.value = 0;
      currentCol.value = 0;
      gameOver.value = false;
      win.value = false;

      // 重置游戏板
      for (let i = 0; i < MAX_ATTEMPTS; i++) {
        for (let j = 0; j < WORD_LENGTH; j++) {
          board[i][j] = '';
          evaluation[i][j] = 0;
        }
      }

      // 重置键盘评估
      Object.keys(keyEvaluation).forEach(key => {
        delete keyEvaluation[key];
      });
    };

    // 检测设备是否为移动端
    const checkMobile = () => {
      isMobile.value = window.innerWidth < 768;
    };

    // 组件挂载
    onMounted(() => {
      // 选择随机目标单词
      targetWord.value = targetWords[Math.floor(Math.random() * targetWords.length)].toUpperCase();

      // 添加键盘事件监听
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          handleKeyPress('ENTER');
        } else if (e.key === 'Backspace') {
          handleKeyPress('BACKSPACE');
        } else if (/^[a-zA-Z]$/.test(e.key)) {
          handleKeyPress(e.key.toUpperCase());
        }
      });

      // 监听窗口大小变化
      window.addEventListener('resize', checkMobile);
      checkMobile();

      // 首次打开时显示游戏规则
      // setTimeout(() => {
      //   showHowToPlay.value = true;
      // }, 500);
    });

    return {
      board,
      currentRow,
      evaluation,
      keyEvaluation,
      gameOver,
      win,
      targetWord,
      remainingAttempts,
      filteredWordList,
      isMobile,
      showHowToPlay,
      handleKeyPress,
      resetGame,
      showTips,
      gameBoard
    };
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

.app-container {
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.5px;
}

h1 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
}

/* 在 GameBoard 组件中 */
.game-tile {
  font-weight: 700;
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}
@keyframes popIn {
  0% { transform: scale(0.8); opacity: 0; }
  70% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}

.tile-with-letter {
  animation: popIn 0.15s ease-in-out forwards;
}
@keyframes flipTile {
  0% { transform: rotateX(0); }
  50% { transform: rotateX(90deg); }
  100% { transform: rotateX(0); }
}

.evaluated-tile {
  animation: flipTile 0.5s ease;
}
@keyframes victory {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.victory-row .game-tile {
  animation: victory 0.5s ease;
  animation-delay: calc(0.1s * var(--index));
}
@keyframes keyPress {
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}

.key:active {
  animation: keyPress 0.15s ease;
}
body {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  height: 100vh;
}

header {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 2rem;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
}

.help-button {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: none;
  background-color: #e0e0e0;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.help-button:hover {
  background-color: #faf8f8;
}

main {
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 2rem;
  flex: 1;
}

.game-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 10;
}

.game-message button {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background-color: #6aaa64;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.game-message button:hover {
  background-color: #588e53;
}

/* 动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s;
}
.slide-enter-from, .slide-leave-to {
  transform: translateY(-100%);
}

.popup-enter-active, .popup-leave-active {
  transition: all 0.3s;
}
.popup-enter-from, .popup-leave-to {
  transform: translate(-50%, -50%) scale(0.8);
  opacity: 0;
}

/* 移动端样式 */
@media (max-width: 767px) {
  main {
    flex-direction: column;
  }

  h1 {
    font-size: 1.8rem;
  }

  .app-container {
    padding: 0.5rem;
  }
}

.header-buttons {
  position: absolute;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  gap: 1rem;
  width: auto;
}

.icon-button {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: none;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
  z-index: 1;
}

.icon-button:hover {
  background-color: #d0d0d0;
}

.lightbulb-button svg {
  width: 1.2rem;
  height: 1.2rem;
}

.help-button svg {
  width: 1.2rem;
  height: 1.2rem;
}

</style>
