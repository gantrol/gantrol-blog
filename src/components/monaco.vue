<template>
  <div class="editor">
    <div
        :ref="props.id"
        :id="props.id"
        style="width: 100%; height: 200px"
    ></div>
  </div>
</template>

<style setup>
   .editor {
     margin: 2em;
     overflow: auto;
   }
</style>

<script setup>
import {ref, onMounted, watch} from "vue";

const props = defineProps({
  id: String,
  initialValue: String,
  initialLanguage: String,
});

const editorRef = ref(null);
/**
 * https://github.com/vuejs/vitepress/issues/1508
 * https://github.com/vitejs/vite/discussions/1791#discussioncomment-321046
 * https://twitter.com/youyuxi/status/1355316139144970240?s=20
 *
 */
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

onMounted(() => {
  editorRef.value = monaco.editor.create(
      // TODO: id需要……
      document.getElementById(props.id),
      {
        value: props.initialValue || `const abc = 'abc';`, // 使用 props.initialValue 或默认值
        language: props.initialLanguage || "javascript", // 使用 props.initialLanguage 或默认语言
      }
  );
});

// 监听 initialValue 和 initialLanguage 的变化
watch(() => props.initialValue, (newValue) => {
  if (editorRef.value) {
    editorRef.value.setValue(newValue);
  }
});

watch(() => props.initialLanguage, (newLanguage) => {
  if (editorRef.value) {
    monaco.editor.setModelLanguage(editorRef.value.getModel(), newLanguage);
  }
});

</script>
