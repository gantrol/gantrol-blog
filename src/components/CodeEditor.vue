<template>
  <div>
    <iframe id="preview" style="width: 100%; height: 100%;border: 1px solid #ccc;"></iframe>
    <!-- Markdown content goes here -->
    <HTMLMonacoEditor :id="'html-editor'" :initialValue="HTMLTestData" :initialLanguage="'html'" />
    <CSSMonacoEditor :id="'css-editor'" :initialValue="cssTestData" :initialLanguage="'css'" />
    <JSMonacoEditor :id="'js-editor'" :initialValue="jsTestData" :initialLanguage="'javascript'" />
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref, onMounted } from 'vue';
import { inBrowser } from 'vitepress';

const getEditor = () => {
  return inBrowser
      ? defineAsyncComponent(() => import('./monaco.vue'))
      : () => null;
}

// Dynamically import the MonacoEditor component if in browser
const HTMLMonacoEditor = getEditor();
const CSSMonacoEditor = getEditor();
const JSMonacoEditor = getEditor();

const HTMLTestData = ref(`<html>
<head>
    <title>Color Changer</title>
</head>
<body>
    <button id="changeColor">Change Background Color</button>
</body>
</html>`);

const cssTestData = ref(`/* CSS example code */
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
`);

const jsTestData = ref(`document.getElementById('changeColor').addEventListener('click', function() {
    document.body.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
});`);

onMounted(() => {
  const previewWindow = document.getElementById('preview').contentWindow;
  const previewDocument = previewWindow.document;

  previewDocument.open();
  previewDocument.write(`
    ${HTMLTestData.value}
    <style>${cssTestData.value}</style>
    <script>${jsTestData.value}<\/script>
`);
previewDocument.close();
});
</script>
