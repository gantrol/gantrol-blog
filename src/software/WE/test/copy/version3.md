# 防止网页内容被复制：版本3



折叠的内容是具体实现。在点开实现之前，你可以先试试看，它怎么防止复制的。

:::details 具体实现
禁止选择文本的操作：通过JavaScript监听并禁用复制操作。

```js
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
}, false);


```
:::

<Version3 />

<script setup>
    import Version3 from "./Version3.vue";
</script>

