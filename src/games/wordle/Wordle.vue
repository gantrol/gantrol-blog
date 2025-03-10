<template>
    <div class="wordle-app">
      <h1>Wordle</h1>
      <Toast ref="toastRef" />
      <GameBoard 
        :currentGuess="currentGuess"
        :guesses="guesses"
        :targetWord="targetWord"
        :gameStatus="gameStatus"
      />
      <Keyboard 
        :letterStatus="letterStatus"
        @key-press="handleKeyPress"
      />
      <button class="new-game-btn" @click="startNewGame" v-if="gameStatus !== 'playing'">
        新游戏
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed, onMounted, watch } from 'vue';
  import GameBoard from './GameBoard.vue';
  import Keyboard from './Keyboard.vue';
  import Toast from './Toast.vue';
  import { WORDS } from './words'; // 词库文件
  
  const toastRef = ref(null);
  const targetWord = ref('');
  const currentGuess = ref('');
  const guesses = ref([]);
  const gameStatus = ref('playing'); // 'playing', 'won', 'lost'
  const letterStatus = reactive({});
  
  // 初始化游戏
  const startNewGame = () => {
    targetWord.value = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
    currentGuess.value = '';
    guesses.value = [];
    gameStatus.value = 'playing';
    
    // 重置字母状态
    Object.keys(letterStatus).forEach(key => {
      delete letterStatus[key];
    });
    
    console.log('目标单词:', targetWord.value); // 仅供开发调试
  };
  
  // 处理键盘输入
  const handleKeyPress = (key) => {
    if (gameStatus.value !== 'playing') return;
    
    if (key === 'ENTER') {
      submitGuess();
    } else if (key === 'BACKSPACE') {
      currentGuess.value = currentGuess.value.slice(0, -1);
    } else if (currentGuess.value.length < 5) {
      currentGuess.value += key;
    }
  };
  
  // 提交猜测
  const submitGuess = () => {
    if (currentGuess.value.length !== 5) {
      toastRef.value.show('请输入5个字母的单词');
      return;
    }
    
    if (!WORDS.includes(currentGuess.value.toLowerCase())) {
      toastRef.value.show('词库中没有这个单词');
      return;
    }
    
    // 更新字母状态
    updateLetterStatus();
    
    // 添加到猜测历史
    guesses.value.push(currentGuess.value);
    
    // 检查是否猜对
    if (currentGuess.value === targetWord.value) {
      gameStatus.value = 'won';
      toastRef.value.show('恭喜你赢了!', 3000);
    } else if (guesses.value.length >= 6) {
      gameStatus.value = 'lost';
      toastRef.value.show(`游戏结束! 正确单词是 ${targetWord.value}`, 5000);
    }
    
    // 重置当前猜测
    currentGuess.value = '';
  };
  
  // 更新字母状态
  const updateLetterStatus = () => {
    [...currentGuess.value].forEach((letter, index) => {
      if (letter === targetWord.value[index]) {
        letterStatus[letter] = 'correct';
      } else if (targetWord.value.includes(letter)) {
        if (letterStatus[letter] !== 'correct') {
          letterStatus[letter] = 'present';
        }
      } else {
        if (!letterStatus[letter]) {
          letterStatus[letter] = 'absent';
        }
      }
    });
  };
  
  // 初始化游戏
  onMounted(() => {
    startNewGame();
    
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
  });
  </script>
  
  <style>
  .wordle-app {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    font-family: 'Arial', sans-serif;
  }
  
  h1 {
    color: #333;
    margin-bottom: 20px;
  }
  
  .new-game-btn {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  .new-game-btn:hover {
    background-color: #45a049;
  }
  </style>
  