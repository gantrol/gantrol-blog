<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  if (typeof document !== 'undefined') {
    waitForCanvas();
  }
});

function waitForCanvas() {
  const c = document.getElementById("myCanvas");
  if (!c) {
    setTimeout(waitForCanvas, 100);
    return;
  }

  const ctx = c.getContext("2d");
  if (!ctx) {
    console.error("Failed to get canvas 2D context");
    return;
  }

  console.log("Canvas and context are ready");

  ctx.font = "16px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("试试复制这段文字。本页只有这句话“禁止”复制", 10, 50);
}


</script>

<template>
  <canvas id="myCanvas" width="600" height="70" >
    折叠的内容是具体实现。不过，看起来你的浏览器不支持 canvas。
  </canvas>
</template>

<style scoped>

</style>
