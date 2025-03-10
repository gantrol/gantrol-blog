<template>
    <div 
      class="tile" 
      :class="[status, { 'populated': letter !== '' }]"
    >
      <div class="tile-inner" :class="{ 'flip': reveal }">
        <div class="tile-front">{{ letter }}</div>
        <div class="tile-back" :class="status">{{ letter }}</div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    letter: String,
    status: String, // 'correct', 'present', 'absent', 'tbd'
    reveal: Boolean,
    delay: Number
  });
  </script>
  
  <style scoped>
  .tile {
    width: 62px;
    height: 62px;
    font-size: 32px;
    font-weight: bold;
    text-transform: uppercase;
    perspective: 1000px;
  }
  
  .tile-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }
  
  .tile.populated {
    animation: pop 0.1s ease-in-out;
  }
  
  .tile-inner.flip {
    transform: rotateX(180deg);
    transition-delay: v-bind('delay + "ms"');
  }
  
  .tile-front, .tile-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #d3d6da;
  }
  
  .tile-front {
    background-color: white;
  }
  
  .tile-back {
    transform: rotateX(180deg);
    color: white;
  }
  
  .tile-back.correct {
    background-color: #6aaa64;
    border-color: #6aaa64;
  }
  
  .tile-back.present {
    background-color: #c9b458;
    border-color: #c9b458;
  }
  
  .tile-back.absent {
    background-color: #787c7e;
    border-color: #787c7e;
  }
  
  @keyframes pop {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  </style>
  