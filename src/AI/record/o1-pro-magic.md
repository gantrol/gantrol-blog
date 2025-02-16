前两周我开始这么用o1 pro：

1. 给它一篇文章，让它思考配图，生成插图用的Midjourney Prompt
2. 把整个代码仓库的代码放到问题后面，2万多token，直接提问

> 本文首发于[微信公众号](https://mp.weixin.qq.com/s/KPOixB98sKqDY8N4LO9s-w)，图片暂不迁移

### 配图

[上篇文章](https://mp.weixin.qq.com/s?__biz=MzIzMzU4NDQwMg==&mid=2247484613&idx=1&sn=4bb8fa1843ee109779ce33313aba57f0&scene=21#wechat_redirect)是o1 pro+Midjourney配图，后者收费，这篇文章，转用免费的 Google Image-fx，你可以对比一下效果

直接输入文章，然后配图，是我在ChatGPT3.5就行实现的功能，现在终于有希望实现


Prompt也不用搞什么工程：

```
给这篇文章配图，由于你生成不了图片，请考虑用Midjourney Prompt代替：
```

### 后面加上文章内容即可

### 代码

如果大模型能直接把整个仓库作为上下文，还能输出修改后完整文件，会发生什么？

根本不用思考要选哪些文件，大模型自己会找，出来是完整代码文件，直接复制代码全部替换就行，感觉非常舒畅

> 顺带一提，如果是界面，还可以给Claude 3.5美化一下

剩下的问题是什么呢？O1 Pro回答时间太久吗？不是，O1 Pro回答时间不是问题，是人跟不上

虽然代码是写完了，验收还是人做，O1 pro写的像长篇报告，还能“并发”写几篇，想验收可以验很多

到后面，甚至任务的产生速度更不上。主要是因为任务不能随便说，不然AI跟你糊弄几下——需求描述不清楚，验收将受更多苦

如果并发接几个任务，还会遇到神奇的“一人协作”问题，几个任务之间可能有代码文件冲突。或许你自己要同时开几个Git分支来管

最要命的是，人脑其实也有“上下文管理”问题，一次完整的上下文切换要20分钟左右，任务完成很快且并发的情况下，人脑跟着快速切换任务，会有很多上下文同时在人脑中相互干扰，负担其实相当大

我感觉“待办清单”、“项目管理”、协作类软件可能会一同演化，不再局限于人，不再只有待办——那就是“事情的化身”，很多事情还会随时间被AI解决掉

你要说值不值$200美元，自己想，问就不值。另外，最近我这o1 pro出了点问题，上下文越来越短，可能目前这种用法不太被接受（因此我才有空写这篇玩意儿，不然就跟o1 pro一块干活）
