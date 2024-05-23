<script setup>
  import {onMounted} from "vue";

  onMounted(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('selectstart', function(e) {
        e.preventDefault();
      }, false);
    }
  });
</script>

<template>

</template>

<style scoped>

</style>
