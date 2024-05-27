<script setup>
import {onMounted, onUnmounted} from "vue";

  onMounted(() => {
    if (typeof document !== 'undefined') {
      if (window.banselectstart === undefined) {
        window.banselectstart = function(e) {
          e.preventDefault();
        }
      }
      document.addEventListener('selectstart', window.banselectstart, false);
    }
  });

  onUnmounted(() => {
    if (typeof document !== 'undefined') {
      if (window.banselectstart !== undefined) {
        document.removeEventListener('selectstart', window.banselectstart, false);
      }
    }
  })
</script>

<template>

</template>

<style scoped>

</style>
