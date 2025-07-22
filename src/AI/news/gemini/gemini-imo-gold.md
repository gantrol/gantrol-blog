# [翻译]Gemini高版本深度研究达到国际奥数金牌水平

> 原文[链接](https://deepmind.google/discover/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/)

国际数学奥林匹克竞赛（简称“IMO”）是全球顶尖青年数学家赛事，自1959年起每年举办。每个参赛国派出六名中学精英数学高手，他们要解六道极难的题目，涵盖代数、组合数学、几何和数论。赛事前一半选手可获颁奖牌，其中约8%赢得含金量极高的金牌。

近年来，IMO也成了考验AI系统的一大挑战，借此检验AI系统高阶数学解题与推理能力。去年，谷歌DeepMind旗下的AlphaProof和AlphaGeometry 2系统联手[达到银牌水平](https://deepmind.google/discover/blog/ai-solves-imo-problems-at-silver-medal-level/)，六题解出四道，拿到28分。这套系统利用专用形式语言，这项突破显示AI正逐渐接近人类顶尖数学推理水平。

今年，我们是首批获IMO协调员官方评分和认证的模型之一，评分标准与学生答卷相同。赞叹今年学生参赛者的卓越表现，我们激动宣布Gemini在IMO中取得突破性成果。

## Gemini Deep Think模型在2025年IMO竞赛中实现突破

Gemini高版本[Deep Think](https://blog.google/technology/google-deepmind/google-gemini-updates-io-2025/#deep-think)模式，完美解答IMO六道题中的五道，获得总分35分，达到金牌水平。解题过程可在[网上查阅](https://storage.googleapis.com/deepmind-media/gemini/IMO_2025.pdf)。

> 我们可以证实，谷歌DeepMind已达成这个备受期待的里程碑，获得42分中的35分，这是金牌分数。他们的解题方案在很多方面令人惊叹。IMO阅卷人认为，这些解法清晰、精确，大多易于理解。
>
> ——IMO主席 格雷戈尔·多利纳尔 教授

这项成就比去年的突破更进一大步。2024年IMO竞赛中，AlphaGeometry和AlphaProof需专家将自然语言问题转译为Lean等领域专用语言，并反向翻译证明过程，计算耗时两三天。今年，我们先进的Gemini模型全程使用自然语言，直接根据官方题目描述生成严谨的数学证明，全部在4.5小时的比赛时限内完成。


![进步图](https://lh3.googleusercontent.com/_lwKBJ7UQkWr0broJmuAOm3V-TzqvszNfrU6PwkvLVGw3f1zPlgXUA3i8vbTcfoaQ0OoxKTNRm0OYZ7ffskOUH2Tc2HJrnyBdDM2P9msQBd-jaAZC7g=w616)


## 充分发挥 Deep Think 模式的效用

今年，我们利用Gemini高版本Deep Think模式取得了这一成果。这是一个针对复杂问题的增强推理模式，融入了包括并行思维在内的最新研究技术。这种设置使模型在给出最终答案前，能同时探索并结合多种可能解法，而非循着单一线性思维链。

为充分发挥Deep Think的推理能力，我们还用新型强化学习技术训练了这一版Gemini，这些技术能利用更多多步推理、问题解决及定理证明数据。我们为Gemini提供了高质量数学解题方案精选库，并在其指令中加入应对IMO问题的一般提示与技巧。

这个模型Deep Think模式将先开放给包括数学家在内的部分测试者，之后再向Google AI Ultra订阅用户推出。

## AI与数学的未来

谷歌DeepMind持续与数学界合作，但AI贡献数学才[刚开始](https://www.youtube.com/watch?v=TgS0nFeYul8)，大有潜力。通过让系统更灵活、直观地推理，我们正接近打造能解决更复杂、高阶数学问题的AI。

今年我们纯粹基于Gemini的自然语言方法，同时也在正式系统，即AlphaGeometry和AlphaProof上持续取得进展。我们相信，结合自然语言流畅性和严谨推理能力（包括形式语言中的验证推理）的AI系统，将成为数学家、科学家、工程师和研究人员的宝贵工具，助推人类知识进步，迈向通用人工智能（AGI）。

## 致谢

感谢国际数学奥林匹克竞赛组织的支持。

梁正（Thang Luong）领导了用于IMO的Gemini Deep Think高级模型的整体技术方向，并与爱德华·洛克哈特（Edward Lockhart）共同协调2025年IMO项目。

以下技术主管对2025年IMO系统的实现至关重要：
达森·黄（Dawsen Hwang）、郑俊赫（Junehyuk Jung）共同负责训练数据和专家评估。李乔纳森（Jonathan Lee）、内特·库什曼（Nate Kushman）、波尔·莫雷诺（Pol Moreno）、易泰（Yi Tay）共同负责Gemini Deep Think高级模型的训练，余磊（Lei Yu）负责模型评估。戈尔纳兹·吉亚齐（Golnaz Ghiazi）、加勒特·宾汉姆（Garrett Bingham）、拉利特·贾恩（Lalit Jain）共同负责Deep Think推理，达森·黄（Dawsen Hwang）、文森特·科恩-阿达德（Vincent Cohen-Addad）共同负责增强推理方法。

2025年IMO系统的开发也得到了以下人员的重要贡献：
建模：西奥芬·韦伯（Theophane Weber）、安凯什·阿南德（Ankesh Anand）；
推理：维奈·拉马塞什（Vinay Ramasesh）、安德烈亚斯·基尔施（Andreas Kirsch）、毛介明（Jieming Mao）、许子成（Zicheng Xu）、威尔弗里德·布恩西（Wilfried Bounsi）、瓦哈布·米罗克尼（Vahab Mirrokni）；
训练数据：阮煌（Hoang Nguyen）、张弗雷德（Fred Zhang）、马汉·马利希（Mahan Malihi）、黄杨思博（Yangsibo Huang）。

感谢相关团队和项目的贡献。
AlphaGeometry团队：尤里·切尔沃尼（Yuri Chervonyi，负责人）、特里乌·特林（Trieu Trinh）、阮煌（Hoang Nguyen）、金俊秀（Junsu Kim）、米雷克·奥尔沙克（Mirek Olšák）、马塞洛·梅内加利（Marcelo Menegali）、杨晓萌（Xiaomeng Yang）。
形式数学：米克洛什·Z·霍瓦特（Miklós Z. Horváth）、黄士杰（Aja Huang）、戈兰·茹日奇（Goran Žužić）。
感谢法比安·佩德雷戈萨（Fabian Pedregosa）、宋理查德（Richard Song）、翟宇（Alex Zhai）、莎拉·贾万马尔迪（Sara Javanmardi）、李亚光（YaGuang Li）、费利佩·米格尔·德·阿尔梅达（Filipe Miguel de Almeida）、西尔维奥·拉坦齐（Silvio Lattanzi）、阿什坎·诺鲁齐·法德（Ashkan Norouzi Fard）、塔尔·舒斯特（Tal Schuster）、范宏璐（Honglu Fan）、王学志（Xuezhi Wang）、阿迪蒂·马瓦兰卡尔（Aditi Mavalankar）、汤姆·肖尔（Tom Schaul）、罗斯玛丽·基（Rosemary Ke）的支持与协作。

特别感谢Deep Think团队的其他核心成员：阿奇特·沙尔马（Archit Sharma）、何彤（Tong He）、舒卜哈·拉格文德拉（Shubha Raghvendra）；后期训练项目：余天河（Tianhe Kevin Yu）、西亚马克·沙克里（Siamak Shakeri）、林汉钊（Hanzhao Lin）、科斯莫·杜（Cosmo Du）、西德·拉尔（Sid Lall）；以及2025年IMO系统所基于的思考领域研究。

此项工作由黎国（Quoc Le）和普什米特·科利（Pushmeet Kohli）提供咨询，克里斯汀·基亚富洛（Kristen Chiafullo）和亚历克斯·戈尔丁（Alex Goldin）提供项目支持。

感谢以下提供数据和评估的专家：
徐仁硕（Insuk Seo，负责人）、姜智元（Jiwon Kang）、金东贤（Donghyun Kim）、金俊秀（Junsu Kim）、金智敏（Jimin Kim）、全晟彬（Seongbin Jeon）、罗允浩（Yoonho Na）、李承焕（Seunghwan Lee）、李智浩（Jihoo Lee）、赵英勋（Younghun Jo）、许容硕（Yongsuk Hur）、朴晟宰（Seongjae Park）、崔圭贤（Kyuhyeon Choi）、崔敏奎（Minkyu Choi）、文秀赫（Su-Hyeok Moon）、金瑞珍（Seojin Kim）、李悦恩（Yueun Lee）、金泰勋（Taehun Kim）、柳智浩（Jeeho Ryu）、李承佑（Seungwoo Lee）、金多仁（Dain Kim）、李善河（Sanha Lee）、崔贤宇（Hyunwoo Choi）、艾登·郑（Aiden Jung）、陈英范（Youngbeom Jin）、安正铉（Jeonghyun Ahn）、裴俊辉（Junhwi Bae）、金圭珉（Gyumin Kim）、陈南雄（Nam Dung Tran）、蔡承璋（Cheng-Chiang Tsai）、卡里·拉格纳森（Kari Ragnarsson）、陈吉泉（Kiat Chuan Tan）、叶海亚·塔贝什（Yahya Tabesh）、哈米德·马赫达维（Hamed Mahdavi）、阿齐娜·纳扎里（Azin Nazari）、丁祥卓（Xiangzhuo Ding）、高竹兰（Chu-Lan Kao）、史蒂文·克里奇（Steven Creech）、托尼·冯（Tony Feng）、奇普里安·马诺莱斯库（Ciprian Manolescu）。

感谢以下服务和部署专家：伊曼纽尔·塔罗帕（Emanuel Taropa）、陈查理（Charlie Chen）、乔·斯坦顿（Joe Stanton）、奇普·巴埃图（Cip Baetu）、阿尔文·阿卜达吉奇（Alvin Abdagic）、费德里科·莱布朗（Federico Lebron）、约阿娜·米海莱斯库（Ioana Mihailescu）、索海尔·哈萨斯·耶加内（Soheil Hassas Yeganeh）、江明（Minh Gang）。

此外，感谢杰西卡·罗（Jessica Lo）和萨贾德·扎法尔（Sajjad Zafar）在计算资源提供和管理方面的支持；简·拉巴诺夫斯基（Jane Labanowski）、安迪·福布斯（Andy Forbes）、肖恩·中本（Sean Nakamoto）在法律和物流方面的支持；还有奥默·利维（Omer Levy）、蒂莫西·利利克拉普（Timothy Lillicrap）、杰克·雷（Jack Rae）、卢一峰（Yifeng Lu）、郑恒泽（Heng-tze Cheng）、埃德·奇（Ed Chi）、瓦哈布·米罗克尼（Vahab Mirrokni）、图尔西·多西（Tulsee Doshi）、马达维·塞瓦克（Madhavi Sewak）、梅尔文·约翰逊（Melvin Johnson）、科雷·卡武库奥卢（Koray Kavukcuoglu）、奥里奥尔·维尼亚尔斯（Oriol Vinyals）、杰夫·迪恩（Jeff Dean）、德米斯·哈萨比斯（Demis Hassabis）、谢尔盖·布林（Sergey Brin）的支持和建议。

最后，感谢IMO理事会格雷戈尔·多利纳尔教授的支持和认可。IMO已确认我们提交的答案完整且正确。需注意的是，他们的审核不涉及验证我们的系统、流程或底层模型。（查看[更多](https://imo2025.au/wp-content/uploads/2025/07/IMO-2025_ClosingDayStatement-19072025.pdf)）