# 防止网页内容被复制：版本4

<Version4 />

:::details 具体实现
通过`canvas`直接写文字，能有效防止复制。图片也有类似效果，各有优劣。

```html
<canvas id="myCanvas" width="600" height="70" >
    折叠的内容是具体实现。不过，看起来你的浏览器不支持。
</canvas>
```

```js
<script>
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
    ctx.fillText("试试复制这段文字。折叠的内容是具体实现：", 10, 50);
}

    waitForCanvas();
</script>



```
:::


根据场景不同，防止复制的手段还有很多。比如付费文章，免费预览的部分，跟付费阅读的部分分开发送。比如付费文章被混淆，直到最后才显示出原貌，直接复制粘贴会复制成被混淆的文本。

比较通用的办法是图片转文字，可以使用OCR技术，或者直接用大模型。

<script setup>
    import Version4 from "./Version4.vue";
</script>



