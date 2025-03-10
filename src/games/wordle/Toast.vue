<template>
    <Transition name="toast">
      <div class="toast" v-if="visible">
        {{ message }}
      </div>
    </Transition>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const visible = ref(false);
  const message = ref('');
  let timeout = null;
  
  const show = (msg, duration = 2000) => {
    message.value = msg;
    visible.value = true;
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      visible.value = false;
    }, duration);
  };
  
  // 暴露方法给父组件
  defineExpose({
    show
  });
  </script>
  
  <style scoped>
  .toast {
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 12px 24px;
    border-radius: 20px;
    font-size: 16px;
    max-width: 80%;
    z-index: 100;
  }
  
  .toast-enter-active,
  .toast-leave-active {
    transition: opacity 0.3s, transform 0.3s;
  }
  
  .toast-enter-from,
  .toast-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
  </style>
  