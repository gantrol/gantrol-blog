<template>
  <div class="editor">
    <div v-if="isLoading" class="loader"></div>
    <div
        :ref="props.id"
        :id="props.id"
        style="width: 100%; height: 45vh"
    ></div>
  </div>
</template>

<style setup>
.editor {
  margin: 2em;
  overflow: hidden;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loader {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  margin: 20px auto;
}

</style>

<script setup>
import {nextTick, onMounted, ref} from "vue";
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

const props = defineProps({
  id: String,
  initialValue: String,
  initialLanguage: String,
});

const emit = defineEmits(['update:initialValue']);

const isLoading = ref(true); // 设置为 true，因为初始状态是正在加载

let editorManager;

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

onMounted(async () => {
  // await new Promise((resolve) => {setTimeout(resolve, 3000)});  // for testing spin
  editorManager = monaco.editor.create(
      // TODO: id需要……
      document.getElementById(props.id),
      {
        value: props.initialValue || `const abc = 'abc';`, // 使用 props.initialValue 或默认值
        language: props.initialLanguage || "javascript", // 使用 props.initialLanguage 或默认语言
      }
  );
  // 监听编辑器内容变化
  editorManager.onDidChangeModelContent(() => {
    // 获取当前编辑器的值
    const currentValue = editorManager.getValue();
    // 发出事件，通知父组件更新 initialValue
    emit('update:initialValue', currentValue);
  });

  await nextTick(); // 等待下一个 DOM 更新周期
  isLoading.value = false; // 然后更新 isLoading 状态
});
</script>
