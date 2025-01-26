# 热爱开源，引爆Deepseek

大模型开源界一直希望能跟上OpenAI。而12月底，[Deepseek V3](https://weibo.com/6083767801/P6WLliBG9 ) 呈现出“以小胜大”、“被限制然后另辟蹊径”的故事。有人还声称，Deepseek背后公司主要搞量化交易，Deepseek只是“副业”，传播性拉满（实际上也不算side project，但谁管呢）

其实更重要的是，它把关键技术全开源，别人也能相对轻松复现，圈了一批开源狂热粉。而反过来看OpenAI现在这个Open程度，就只配叫“CloseAI”

<BeautifulLogo />

<script setup>
    import BeautifulLogo from "../BeautifulLogo.vue";
    import TwitterEmbed from '/components/TwitterEmbed.vue';
</script>


Deepseek V3 用的 MTP「[受 Gloeckle et al. (2024) 启发][1]」，这篇启发DeepSeek-V3的论文2024年4月30号发布到arxiv，距V3发布，只有8个月

V3可能还无法跟o1比，因为V3并非推理模型。但还不到一个月，对标o1的Deepseek R1又来了，一样开源，一样“以小胜大”，而且跟“CloseAI”比，模型免费、不搞IP屏蔽、API价格极低、推理成本极低。还传出训练成本比Llama高管年薪还低——又来一个强传播事件

如果deepseek API没有“赔本赚吆喝”，那么这对国外模型日后定价、限额有极大威胁，甚至会打击团队士气

比方说，“CloseAI”创始人评论下面总是会出现deepseek R1之类，如：

<TwitterEmbed
    tweetContent='wtf is operator? DeepSeek deez nuts bro'
    username="zephylum (@zephylum)"
    userLink="https://twitter.com/zephylum/status/1883311759177753034?ref_src=twsrc%5Etfw"
    tweetDate="January 26, 2025"
/>

而Llama团队很可能会面临领导质询

顺带一提，R1的一个基础，去年2月就发布了论文[DeepSeekMath][2]

---

我最近在读“CloseAI”创始人的《创业手册》，觉得里面很多话都很有道理，比如：

> 做一个产品，选择少数人“热爱”，而不是多数人“喜欢”。即便总体“喜好水平”相当，从“喜欢”到“热爱”很难，而获取用户简单得多。

正是热爱开源的人们，最近一个月一直关注deepseek，不断讨论，演化出不少故事，而模型质量、训练方法经得起检验，还有更深远的启发，最终从技术圈引爆——毕竟，获取用户简单得多。

有人问“DeepSeek为何一夜爆火？”可能是一夜爆火，但绝非一夜之功

最后还是那句话，难得国内有那么好的模型，新年不跟亲戚推荐推荐？

[官网][3]，有手机应用。Deepseek官网如果出现故障，请直接访问[聊天页][4]。

---

**注**：本文对OpenAI的「CloseAI」调侃仅针对其近期开源策略，OpenAI历史开源贡献仍值得肯定。

[6]: https://weibo.com/6083767801/Pbn0lxqxw	"梗图开源"

[1]: http://t.cn/A63a78D8

[2]: https://arxiv.org/abs/2402.03300

[3]: https://www.deepseek.com/

[4]: https://chat.deepseek.com/

[5]: https://weibo.com/6083767801/PbmyUqPQF
