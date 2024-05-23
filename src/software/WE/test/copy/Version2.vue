<script setup>
  import {onMounted} from "vue";

  onMounted(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('copy', function(e) {
        e.preventDefault();
      }, false);

      document.addEventListener('cut', function(e) {
        e.preventDefault();
      }, false);
    }
  });
</script>

<template>

</template>

<style scoped>

</style>
