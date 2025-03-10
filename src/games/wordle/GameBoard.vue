<template>
    <div class="game-board">
      <div class="row" v-for="(guess, rowIndex) in boardState" :key="rowIndex">
        <Tile 
          v-for="(letter, colIndex) in guess" 
          :key="colIndex"
          :letter="letter.letter"
          :status="letter.status"
          :delay="colIndex * 150"
          :reveal="letter.reveal"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, watch } from 'vue';
  import Tile from './Tile.vue';
  
  const props = defineProps({
    currentGuess: String,
    guesses: Array,
    targetWord: String,
    gameStatus: String
  });
  
  // 计算棋盘状态
  const boardState = computed(() => {
    const state = [];
    
    // 已提交的猜测
    for (let i = 0; i < props.guesses.length; i++) {
      const row = [];
      const guess = props.guesses[i];
      
      for (let j = 0; j < 5; j++) {
        const letter = guess[j];
        let status = 'absent';
        
        if (letter === props.targetWord[j]) {
          status = 'correct';
        } else if (props.targetWord.includes(letter)) {
          status = 'present';
        }
        
        row.push({ 
          letter, 
          status, 
          reveal: true 
        });
      }
      state.push(row);
    }
    
    // 当前猜测（未提交）
    if (props.gameStatus === 'playing') {
      const currentRow = [];
      for (let i = 0; i < 5; i++) {
        currentRow.push({ 
          letter: props.currentGuess[i] || '', 
          status: 'tbd',
          reveal: false
        });
      }
      state.push(currentRow);
    }
    
    // 填充空行
    const remainingRows = 6 - state.length;
    for (let i = 0; i < remainingRows; i++) {
      const emptyRow = Array(5).fill({ letter: '', status: 'tbd', reveal: false });
      state.push(emptyRow);
    }
    
    return state;
  });
  
  // 添加动画触发逻辑
  watch(() => props.guesses.length, (newVal, oldVal) => {
    if (newVal > oldVal) {
      // 新提交了一行，添加动画触发逻辑
    }
  });
  </script>
  
  <style scoped>
  .game-board {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 30px;
  }
  
  .row {
    display: flex;
    justify-content: center;
    gap: 5px;
  }
  </style>
  