# 防止网页内容被复制：版本1

<Version1 />

这是一个防止用户复制文字内容的示例界面，这是很简单的版本，折叠的内容是具体实现。在点开实现之前，你可以先猜猜看，是怎么防止复制的。

:::details 具体实现
禁用复制操作：通过JavaScript监听并禁用复制操作。

```js
document.addEventListener('copy', function(e) {
    e.preventDefault();
}, false);

```
:::

<script setup>
    import Version1 from "./Version1.vue";
</script>
