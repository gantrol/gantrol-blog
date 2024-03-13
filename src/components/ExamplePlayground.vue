<template>
  <div>
    <HCJPreview
        v-model:htmlCode="htmlCode"
        v-model:cssCode="cssCode"
        v-model:jsCode="jsCode"
    />
    <div class="tabs">
      <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          :class="{ active: activeTab === tab }">
        {{ tab }}
      </button>

    </div>
    <div class="editors">
      <div v-if="activeTab === 'HTML'">
        <HTMLMonacoEditor
            id="html-editor"
            v-model:initialValue="htmlCode"
            :initialLanguage="'html'"
        />
      </div>
      <div v-if="activeTab === 'CSS'">
        <CSSMonacoEditor
            id="css-editor"
            v-model:initialValue="cssCode"
            :initialLanguage="'css'"
        />
      </div>
      <div v-if="activeTab === 'JavaScript'">
        <JSMonacoEditor
            id="js-editor"
            v-model:initialValue="jsCode"
            :initialLanguage="'javascript'"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineAsyncComponent, ref} from 'vue';
import { inBrowser } from 'vitepress';
import HCJPreview from './HCJPreview.vue';

const tabs = ['HTML', 'CSS', 'JavaScript'];
const activeTab = ref('HTML');


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
    <button id="changeColor">Click It</button>
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
.container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 1rem;
}

.tabs {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #e1e1e1;
}

.tabs button {
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  background-color: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
  font-size: 1rem;
  color: #555;
}

.tabs button:hover {
  border-bottom: 3px solid #3498db;
  color: #3498db;
}

.tabs button.active {
  border-bottom: 3px solid #3950ae;
  color: #222;
  font-weight: bold;
}

.editors {
  display: flex;
  flex-direction: column;
}

/* Existing styles for editors */
.editors {
  gap: 1rem;
  margin-bottom: 1rem;
}
</style>
