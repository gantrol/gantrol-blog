````diff
diff --git a/src/AI/TOP1.md b/src/AI/TOP1.md
index b3de40d..afcb743 100644
--- a/src/AI/TOP1.md
+++ b/src/AI/TOP1.md
@@ -4,14 +4,23 @@ outline: deep
 
 # AI·第一名
 
-> 本页面内容迁移到 [AiCanDo.xyz](https://www.aicando.xyz/)
+> 如果是为了编程，20美元订阅通用大模型已无必要。200美元档[很神奇](o1 pro magic)，性价比看你自己
 
-| **类别** | **收费**                                                                              | **免费**                                   | **国内**                            |
-|--------|-------------------------------------------------------------------------------------|------------------------------------------|-----------------------------------|
-| 🌐 通用  | [ChatGPT4](https://chat.openai.com/?model=gpt4-turbo)、[Claude3](https://claude.ai/) | [Claude3](https://claude.ai/)            | [KIMI](https://kimi.moonshot.cn/) |
-| 🎨 绘画  | [Midjourney](https://www.midjourney.com/)                                           | Stable Diffusion 系[^1]                   | ？                                 |
-| 🔍 搜索  | -                                                                                   | [Perplexity](https://www.perplexity.ai/) | [KIMI](https://kimi.moonshot.cn/) |
-| ✍️ 写作  | ?                                                                                   | ?                                        | ？                                 |
-| 🎨 设计  | Canva AI                                                                            | Microsoft Designer                       | ？                                 |
-| 💻 程序  | Github Copilot                                                                      | [Claude3](https://claude.ai/)            | ？                                 |
-| 🎵 音乐  | [Suno](https://www.aicando.xyz/music/suno-ai/)                                      | Suno                                     | ？                                 |
+| **类别** | **收费**                                       | **免费**                                                     | **国内**                                 |
+| -------- | ---------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------- |
+| 🌐 通用   | ChatGPT pro                                    | [Deepseek R1][deepseek]、[Claude3 sonnet][claude3] | [Deepseek R1][deepseek] |
+| 🎨 绘画   | [Midjourney][midjourney]      | [imageFX - labs.google/fx][imagefx] | ？                                       |
+| 🔍 搜索   | [Perplexity][perplexity]       | [Deepseek R1][deepseek]                     | [Deepseek R1][deepseek] |
+| ✍️ 长文   | ChatGPT pro                                    | [Deepseek R1][deepseek]                     | [Deepseek R1][deepseek]                |
+| 🎨 设计   | Canva AI                                       | Microsoft Designer                                           | ？                                       |
+| 💻 程序   | ChatGPT pro                                    | [Gemini 2 FTE][gemini]                          | [Deepseek R1][deepseek] |
+| 🎵 音乐   | [Suno][suno] | [Suno][suno]                      | ？                                       |
+
+[o1 pro magic]: https://mp.weixin.qq.com/s/KPOixB98sKqDY8N4LO9s-w	"使用o1 pro后，遇到了神奇的“一人协作”问题"
+[deepseek]: http://chat.deepseek.com/
+[claude3]: https://claude.ai/
+[midjourney]: https://www.midjourney.com/
+[imagefx]: https://labs.google/fx/tools/image-fx/
+[perplexity]: https://www.perplexity.ai/
+[gemini]: https://aistudio.google.com
+[suno]: https://suno.ai/
diff --git a/src/AI/mistake/index.md b/src/AI/mistake/index.md
index 10e7f70..cf5ec63 100644
--- a/src/AI/mistake/index.md
+++ b/src/AI/mistake/index.md
@@ -1,10 +1,41 @@
-# 嘲笑AI犯错，或许才可笑
+# 数落AI犯错，或许才可笑
 
 - 人类会不会犯错？
-- 旧版Siri以不犯错为最高准则，屎山代码没少堆，你看它智能吗？
-- 永不走路，永不摔跤。
+- 旧版Siri以不犯错为最高准则，屎山代码没少堆，你看它聪明吗？
+- 不做事，就不会犯错
+
+> [华君武: 永不走路永不摔跤](./hua-junwu-永不走路永不摔跤.jpg)
+> 
+> 图源：华君武
 
 ---
 
-以上文本，两年前就写出来了，但是迟迟不能形成一篇文章。今天尝试写写
+以上文本，两年前就写出来了，但是迟迟不能形成一篇文章。今天尝试写写。
+
+有人抱怨环境不好，做事出成绩没奖励，出错被领导喷、被罚。结果其中一批人对AI也这样，盯着错误嘲笑数落，原来他们就是环境一部分。
+
+可能有人会辩称，AI不是人。打个比方，小强生气时常常打砸物品，小明就算生气也温和有礼，谁生气打人概率高？
+
+况且，AI会越来越像人，犯错这点也一样。除了能力不够，错误也可能是提问、需求或语境带来的。比如之前疯传的例子：
+
+> 3.8跟3.11谁大？
+
+2024年初，有很多大模型会答3.11大，再让它用减法校验，它又发现自己错了。为什么会这样？
+
+> 目前（2025.1.25），GPT 4o还会犯这种错误。
+
+Python版本3.11就是比Python 3.8版本要新、“更大”。因此，一个可能的原因是，大模型被喂了海量版本号信息，以至于弄混了它跟正常小数大小的关系。
+
+而如果你问“3.8跟3.11111111111谁大？”，这回能正常答——没有3.11111111111这种版本号。
+
+而版本号是人类发明的，有人说这种设计本来就是一种失误。
+
+一开始以为大模型犯错了，后面深挖发现原来错还是在人类。
+
+大模型要解决的问题已经复杂到一定程度，有的甚至没有所谓正确答案，犯错又有什么奇怪呢？
+
+其实很多地方都用到AI了，某国的分层审核机制，更是完美规避AI犯错这点，大模型为何不能有配套机制呢？
+
+可能根源在于，有人可能不愿接受：在解决可计算问题上，AI肯定会超过人类，就像人算数往往比不过计算器。
 
+想起来还有人坚持电子词典不如纸质。这也不算奇怪。
diff --git a/src/AI/record/o1-pro-magic.md b/src/AI/record/o1-pro-magic.md
index 950cd93..6822eba 100644
--- a/src/AI/record/o1-pro-magic.md
+++ b/src/AI/record/o1-pro-magic.md
@@ -1,9 +1,11 @@
+# 使用o1 pro后，遇到了神奇的“一人协作”问题
+
 前两周我开始这么用o1 pro：
 
 1. 给它一篇文章，让它思考配图，生成插图用的Midjourney Prompt
 2. 把整个代码仓库的代码放到问题后面，2万多token，直接提问
 
-> 本文首发于[微信公众号](https://mp.weixin.qq.com/s/KPOixB98sKqDY8N4LO9s-w)，图片暂不迁移过来
+> 本文曾发于[微信公众号](https://mp.weixin.qq.com/s/KPOixB98sKqDY8N4LO9s-w)，图片暂不迁移过来
 
 ### 配图
 
@@ -11,7 +13,6 @@
 
 直接输入文章，然后配图，是我在ChatGPT3.5就行实现的功能，现在终于有希望实现
 
-
 Prompt也不用搞什么工程：
 
 ```
````
