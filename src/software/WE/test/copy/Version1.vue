<script setup>
import {onMounted, onUnmounted} from "vue";

onMounted(() => {
  if (window.bancopy === undefined) {
    window.bancopy = function (e) {
      e.preventDefault();
    }
  }
  if (typeof document !== 'undefined') {
    document.addEventListener('copy', window.bancopy, false);
  }
});

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    if (window.bancopy !== undefined) {
      document.removeEventListener('copy', window.bancopy, false);
    }
  }
})
</script>

<template>

</template>

<style scoped>

</style>
