# 防止网页内容被复制：版本2

针对上一个版本，剪贴可以绕过复制的问题，做了一个修复。

:::details 具体实现
除了防止复制，这个版本还阻止了剪贴，禁用复制操作：通过JavaScript监听并禁用复制操作。

```js
document.addEventListener('copy', function(e) {
    e.preventDefault();
}, false);

document.addEventListener('cut', function(e) {
    e.preventDefault();
}, false);

```
:::

<Version2 />

<script setup>
    import Version2 from "./Version2.vue";
</script>
