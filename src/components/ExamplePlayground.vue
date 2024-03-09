<template>
  <div>
    <HCJPreview
        v-model:htmlCode="htmlCode"
        v-model:cssCode="cssCode"
        v-model:jsCode="jsCode"
    />
    <div class="editors">
      <HTMLMonacoEditor
          id="html-editor"
          v-model:initialValue="htmlCode"
          :initialLanguage="'html'"
      />
      <CSSMonacoEditor
          id="css-editor"
          v-model:initialValue="cssCode"
          :initialLanguage="'css'"
      />
      <JSMonacoEditor
          id="js-editor"
          v-model:initialValue="jsCode"
          :initialLanguage="'javascript'"
      />
    </div>

  </div>
</template>

<script setup>
import {defineAsyncComponent} from 'vue';
import { inBrowser } from 'vitepress';
import HCJPreview from './HCJPreview.vue';

const getEditor = () => {
  return inBrowser
      ? defineAsyncComponent(() => import('./monaco.vue'))
      : () => null;
};

// Dynamically import the MonacoEditor component if in browser
const HTMLMonacoEditor = getEditor();
const CSSMonacoEditor = getEditor();
const JSMonacoEditor = getEditor();

const htmlCode = defineModel('htmlCode', {
  type: String,
  default: `<html>
  <head>
    <title>Color Changer</title>
  </head>
  <body>
    <button id="changeColor">点击变色</button>
  </body>
</html>`
});

const cssCode = defineModel('cssCode', {
  type: String,
  default: `/* CSS example code */
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
`});

const jsCode = defineModel('jsCode', {
  type: String,
  default: `document.getElementById('changeColor').addEventListener('click', function() {
  document.body.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
});`});

</script>

<style scoped>
.editors {
  //display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
</style>
