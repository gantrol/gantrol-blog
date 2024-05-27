<script setup>
import {onMounted, onUnmounted} from "vue";

onMounted(() => {
  if (window.bancopyandcut === undefined) {
    window.bancopyandcut = function (e) {
      e.preventDefault();
    }
  }
  if (typeof document !== 'undefined') {
    document.addEventListener('copy', window.bancopyandcut, false);
    document.addEventListener('cut', window.bancopyandcut, false);
  }
});

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    if (window.bancopyandcut !== undefined) {
      document.removeEventListener('copy', window.bancopyandcut, false);
      document.removeEventListener('cut', window.bancopyandcut, false);
    }
  }
})
</script>

<template>

</template>

<style scoped>

</style>
