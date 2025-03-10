<template>
    <div class="keyboard">
      <div class="keyboard-row" v-for="(row, index) in keyboardLayout" :key="index">
        <button 
          v-for="key in row" 
          :key="key"
          class="key" 
          :class="[
            getKeyClass(key),
            { 'key-wide': key === 'ENTER' || key === 'BACKSPACE' }
          ]"
          @click="$emit('key-press', key)"
        >
          <template v-if="key === 'BACKSPACE'">⌫</template>
          <template v-else>{{ key }}</template>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    letterStatus: Object
  });
  
  defineEmits(['key-press']);
  
  const keyboardLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
  ];
  
  const getKeyClass = (key) => {
    if (key === 'ENTER' || key === 'BACKSPACE') return '';
    return props.letterStatus[key] || '';
  };
  </script>
  
  <style scoped>
  .keyboard {
    width: 100%;
    margin-top: 30px;
  }
  
  .keyboard-row {
    display: flex;
    justify-content: center;
    margin-bottom: 8px;
  }
  
  .key {
    height: 58px;
    min-width: 40px;
    margin: 0 3px;
    border-radius: 4px;
    border: none;
    background-color: #d3d6da;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    transition: all 0.2s;
  }
  
  .key:active {
    transform: scale(0.95);
  }
  
  .key.key-wide {
    min-width: 65px;
    font-size: 12px;
  }
  
  .key.correct {
    background-color: #6aaa64;
    color: white;
  }
  
  .key.present {
    background-color: #c9b458;
    color: white;
  }
  
  .key.absent {
    background-color: #787c7e;
    color: white;
  }
  </style>
  