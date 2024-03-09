<template>
  <iframe
      id="preview"
      style="width: 100%; height: 20vh; border: 1px solid #ccc;"
      :srcdoc="iframeContent"
  ></iframe>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  htmlCode: {
    type: String,
    required: true,
  },
  cssCode: {
    type: String,
    required: true,
  },
  jsCode: {
    type: String,
    required: true,
  },
});

const iframeContent = computed(() => {
  return `
    ${props.htmlCode}
    <style>${props.cssCode}</style>
    <script>${props.jsCode}<\/script>
`;
});
</script>
