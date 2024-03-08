# AI解决画图标、画商标、整SVG一类问题

<script setup>
    import TQ from "../../../public/three_question.vue";
</script>

[//]: # (TODO：embed jike)
做项目，[有时想要无版权纠纷的 svg](https://m.okjike.com/originalPosts/64119eac45b1c44fea7bd84f?s=ewoidSI6ICI1ZWUwNzM1OWNjZTJmNDAwMTcwMzkyYmIiCn0=)，但比较难找，自己做也费时费力。

组成 AI 工具链后，图标我是不请人画了，更不会自己亲自从 0 开始画。一个案例可见[这个链接](https://m.okjike.com/originalPosts/65cebceb3624666324bcdf24?s=ewoidSI6ICI1ZWUwNzM1OWNjZTJmNDAwMTcwMzkyYmIiCn0=)

可能的流程是：

- 用 Midjourney 或 Dalle 画出
- 若要 SVG 或想要透明图层，可用 Figma 描图或使用 AI 工具转为 SVG [^1]，前者的优势是方便调整

甚至可以用ChatGPT直接画 SVG，如：

<TQ />


## “参考”

https://linear.app/q-laputa/issue/ZZZ-12/%E7%94%9F%E6%88%90svg%E5%9B%BE%E6%A0%87

[^1]: 目前免费的 AI 转 SVG 工具是 [SVGCode](https://github.com/tomayac/SVGcode)，[官网](https://svgco.de/)。现在付费的 visualize 也行
