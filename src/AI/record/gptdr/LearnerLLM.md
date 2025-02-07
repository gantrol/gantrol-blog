# LLM学习：信息论 控制论 优化 压缩 感知

> 有人推荐研究大模型的，要深入学习「 信息论 控制论 优化 压缩 感知」，为什么？有什么资料能佐证这一点，这些前置学识是什么，相关教材又有哪些？

## DeepSearch: 大模型训练与优化中的信息论、控制论、优化、压缩与感知应用分析

明白了，我将为你整理大模型（如深度学习和Transformer架构）研究中涉及的信息论、控制论、优化、压缩和感知的应用，以及相关的学习路径和教材。

我会重点收集：
- 这些领域如何在大模型训练和优化中发挥作用的具体案例
- 相关的数学与编程前置知识（兼顾你的部分基础）
- 推荐的教材、课程和论文

整理好后，我会告诉你可以如何高效学习这些知识，并提供相应的资料。稍等，我马上给你结果。

### 1. 信息论在大模型训练中的应用
**信息论概念及方法：** 信息论为深度学习提供了衡量“不确定性”和“信息量”的工具，如熵和互信息等。在训练大模型时，引入信息论思维可以帮助理解和改进模型。例如，“信息瓶颈”（Information Bottleneck, IB）方法提出：在学习过程中隐藏层应提取对输出有用的关键信息、丢弃无关冗余信息，这有助于提升泛化能力 ([Anatomize Deep Learning with Information Theory | Lil'Log](https://lilianweng.github.io/posts/2017-09-28-information-bottleneck/#:~:text=the%20information%20theory%20to%20study,the%20representation%20of%20the%20input)) ([How Does Information Bottleneck Help Deep Learning?](https://proceedings.mlr.press/v202/kawaguchi23a/kawaguchi23a.pdf#:~:text=input%20X%20%E2%88%88%20X%20,Alemi))。直观地说，IB原理要求**最大化**隐藏表示与目标输出之间的互信息，同时**最小化**隐藏表示与原输入之间的互信息 ([How Does Information Bottleneck Help Deep Learning?](https://proceedings.mlr.press/v202/kawaguchi23a/kawaguchi23a.pdf#:~:text=input%20X%20%E2%88%88%20X%20,Alemi))——网络前层先**拟合**训练数据细节，后层逐步**压缩**掉与任务无关的噪声，从而提高泛化 ([Anatomize Deep Learning with Information Theory | Lil'Log](https://lilianweng.github.io/posts/2017-09-28-information-bottleneck/#:~:text=the%20information%20theory%20to%20study,the%20representation%20of%20the%20input))。

**应用案例：** 信息论方法在大模型中有多种具体应用：
- *提升泛化性能：* 有研究通过在损失中加入互信息正则项来约束模型，使隐藏层只保留与标签相关的信息，从信息理论角度控制模型复杂度，从而降低过拟合 ([How Does Information Bottleneck Help Deep Learning?](https://proceedings.mlr.press/v202/kawaguchi23a/kawaguchi23a.pdf#:~:text=input%20X%20%E2%88%88%20X%20,Alemi))。例如**信息瓶颈**思想被用于解释深度网络的两阶段训练现象：先拟合数据、后压缩信息，以获得更简洁的内部表示并提高泛化 ([Anatomize Deep Learning with Information Theory | Lil'Log](https://lilianweng.github.io/posts/2017-09-28-information-bottleneck/#:~:text=the%20information%20theory%20to%20study,the%20representation%20of%20the%20input))。
- *网络结构优化：* 利用熵和互信息分析，可以评估不同层或不同特征对输出的贡献，指导网络剪枝(pruning)等结构优化。高熵或低互信息的冗余节点可考虑剪除，以简化模型而不显著影响性能。
- *模型压缩(Quantization)：* **量化**是将权重或激活用更少比特表示的过程，可被视为信息编码问题。通过信息论分析，可以选择量化位宽，使表示熵尽可能小而信息损失可控。实践中，**训练后量化**能将32位浮点权重压缩为例如8位整数，显著减少模型尺寸和计算需求，同时保持精度。
- *知识蒸馏(Knowledge Distillation)：* 蒸馏通过让小模型学习大模型或模型集合的“软输出”分布来传递知识，被认为是一种信息压缩形式 ([[1503.02531] Distilling the Knowledge in a Neural Network](https://arxiv.org/abs/1503.02531#:~:text=are%20large%20neural%20nets,a%20mixture%20of%20experts%2C%20these))。大模型（教师）对输入的预测分布蕴含了丰富的信息，小模型（学生）训练去逼近这种分布，相当于提取并编码了原模型对任务的关键信息 ([[1503.02531] Distilling the Knowledge in a Neural Network](https://arxiv.org/abs/1503.02531#:~:text=are%20large%20neural%20nets,a%20mixture%20of%20experts%2C%20these))。蒸馏后的学生模型参数更少但性能接近，大大提高了推理效率，在工业界应用广泛。

**实际效果：** 信息论驱动的方法能够**减少冗余、提高效率**。例如，Song Han等提出的*深度压缩*方法综合剪枝、量化和哈夫曼编码，将AlexNet模型大小从240MB减少到6.9MB（35倍压缩）而精度无损，VGG-16从552MB缩减到11.3MB（49倍） ([[1510.00149] Deep Compression: Compressing Deep Neural Networks with Pruning, Trained Quantization and Huffman Coding](https://arxiv.org/abs/1510.00149#:~:text=work%20together%20to%20reduce%20the,Our%20method)) ([[1510.00149] Deep Compression: Compressing Deep Neural Networks with Pruning, Trained Quantization and Huffman Coding](https://arxiv.org/abs/1510.00149#:~:text=AlexNet%20by%2035x%2C%20from%20240MB,to%207x%20better%20energy%20efficiency))。其中量化将每个连接权重从32比特减少到5比特，极大降低了存储和带宽需求 ([[1510.00149] Deep Compression: Compressing Deep Neural Networks with Pruning, Trained Quantization and Huffman Coding](https://arxiv.org/abs/1510.00149#:~:text=work%20together%20to%20reduce%20the,reduced%20the%20storage%20required%20by))。再如，Hinton等通过知识蒸馏将一个大型模型集合的知识压缩到单一模型，在保持精度的同时使模型更小更快 ([[1503.02531] Distilling the Knowledge in a Neural Network](https://arxiv.org/abs/1503.02531#:~:text=are%20large%20neural%20nets,a%20mixture%20of%20experts%2C%20these))。这些案例表明，借助信息论方法可以有效减少大模型的冗余信息，使模型在内存、计算上的效率显著提升。

**学习资料：** 信息论与深度学习交叉领域的学习可参考以下资源：
- 教科书：**《信息论基础》**（Elements of Information Theory，Cover & Thomas）系统讲解熵、互信息、编码等基础概念，为理解量化压缩提供理论支撑。
- 论文：*Tishby et al., 2015* 提出了信息瓶颈理论在深度学习中的应用，*Shwartz-Ziv & Tishby, 2017* 则进一步研究了深度网络训练中的信息压缩现象。**Saxe et al.(2018)** ([On the Information Bottleneck Theory of Deep Learning | OpenReview](https://openreview.net/forum?id=ry_WPG-A-#:~:text=Abstract%3A%20The%20practical%20successes%20of,Through%20a)) ([On the Information Bottleneck Theory of Deep Learning | OpenReview](https://openreview.net/forum?id=ry_WPG-A-#:~:text=used%20ReLU%20in%20fact%20do,the%20input%20may%20monotonically%20increase))对信息瓶颈理论提出了质疑和修正，是理解该方法局限性的参考。针对模型压缩，可阅读*Hinton et al., 2015*关于知识蒸馏 ([[1503.02531] Distilling the Knowledge in a Neural Network](https://arxiv.org/abs/1503.02531#:~:text=are%20large%20neural%20nets,a%20mixture%20of%20experts%2C%20these))和*Han et al., 2016*关于深度压缩 ([[1510.00149] Deep Compression: Compressing Deep Neural Networks with Pruning, Trained Quantization and Huffman Coding](https://arxiv.org/abs/1510.00149#:~:text=work%20together%20to%20reduce%20the,Our%20method))的论文。
- 在线课程与资料：MIT开设的**信息论课程**(如6.441)涵盖熵、编码等基础；此外博客文章如 *Lilian Weng (2017) “Anatomize Deep Learning with Information Theory”* ([Anatomize Deep Learning with Information Theory | Lil'Log](https://lilianweng.github.io/posts/2017-09-28-information-bottleneck/#:~:text=the%20information%20theory%20to%20study,the%20representation%20of%20the%20input))深入浅出地介绍了信息瓶颈在深度学习中的作用。

**数学基础与学习路径：** 建议先具备**概率论**和**统计学**基础（理解随机变量分布、熵的定义），再学习信息论核心公式推导。可从Shannon信息论的基本定理学起，配合教材练习计算简单分布的熵和互信息。随后，尝试阅读信息瓶颈相关论文时，需要熟悉**微积分变分**和**拉格朗日乘子**法（用于推导优化含互信息的目标函数）。如果数学基础薄弱，可从Mitchell的《机器学习》关于信息增益的章节或Coursera上的**机器学习基础课程**（涵盖一些信息增益概念）入门，再逐步深入到信息论的教材和论文。通过理论学习加上编程实验（例如实现一个简单**蒸馏**或**量化**压缩的小练习），可以加深对信息论在深度学习中应用的理解。

### 2. 控制论与信息论的区别与联系，在大模型中的应用
**概念区别：** **控制论**关注**动态系统的反馈调节和稳定性**，核心是根据输出偏差通过反馈调整系统输入/参数，以实现对系统行为的控制（如经典PID控制）。它强调时序过程、反馈回路和稳定收敛。相比之下，**信息论**关注**信息的度量和传输效率**，核心是如何以尽可能少的编码长度表示和传送数据，以及系统的不确定性度量。简单来说，控制论研究“如何**引导**系统达到目标”，信息论研究“如何**表达和传递**信息高效可靠”。两者联系在于都起源于电气工程与数学，涉及信号处理，但一个偏动态行为调节，另一个偏静态信息度量。

**在大模型中的联系应用：** 尽管控制论和信息论侧重不同，在深度学习大模型训练中二者**相辅相成**：
- *训练过程的视角：* 我们可以把训练深度模型看作一个带反馈的动态系统：模型参数在优化算法驱动下不断更新，其输出误差经过反馈用于调整参数，这与控制系统调整状态以减小误差类似 ([](https://arxiv.org/pdf/1908.10920#:~:text=stability%20analysis%20of%20the%20Gram,systems%20by%20viewing%20each%20layer))。控制论理念应用于此，例如**自适应学习率调整**就相当于一个反馈控制机制——当训练loss下降变慢时（反馈），控制器增大学习率以加快收敛，反之在震荡或发散迹象时减小学习率保持稳定。许多优化器（如Adam中的动量项、RMSProp中的指数加权平均）可以看作是对梯度信号进行滤波和平滑的“控制”策略，以避免参数更新震荡 ([An overview of gradient descent optimization algorithms](https://www.ruder.io/optimizing-gradient-descent/#:~:text=Essentially%2C%20when%20using%20momentum%2C%20we,faster%20convergence%20and%20reduced%20oscillation))。
- *优化算法设计：* 控制论提供了设计稳定、高效优化过程的方法。例如将**SGD视为随机动态系统**，应用最优控制理论可以得到调节超参数（学习率、动量、批大小等）的最佳策略 ([](https://arxiv.org/pdf/1908.10920#:~:text=stability%20analysis%20of%20the%20Gram,systems%20by%20viewing%20each%20layer))。有研究将**训练深度网络形式化为最优控制问题**，通过求解对应的控制方程获得自适应的学习率和正则项更新策略 ([](https://arxiv.org/pdf/1908.10920#:~:text=the%20analogy%20between%20optimization%20algorithms,Other%20stochastic%20modeling%2C%20such%20as)) ([](https://arxiv.org/pdf/1908.10920#:~:text=stability%20analysis%20of%20the%20Gram,systems%20by%20viewing%20each%20layer))。这体现了控制论在训练算法改进上的价值。
- *分布式训练中的通信优化：* 大规模模型常需要多机分布式训练，此时节点间的梯度通信开销成为瓶颈。信息论在这里发挥作用——通过**梯度压缩**（利用信息编码减少梯度传输的数据量）可以大幅提高多机同步效率。例如Microsoft研究者提出的**1-bit SGD**方法将梯度用1比特量化表示，实现了32倍压缩且几乎不损失精度，同时通过在下一次迭代反馈量化误差来维持稳定收敛 ([1-Bit Stochastic Gradient Descent and its Application to Data-Parallel Distributed Training of Speech DNNs](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/IS140694.pdf#:~:text=increase%20the%20mini%02batch%20size%20and,9%5D%2C%20or%20image%20rasterization))。这种方法本质上就是应用信息论的**源编码**减少通信量，再辅以控制手段（误差反馈）保证训练不偏离正确方向。
- *模型泛化与通信视角：* 信息论还提供了理解模型泛化的另一个角度——**最小描述长度（MDL）**原理将学习模型看作对数据的编码，认为**能够简洁描述数据的模型**更有泛化力。这与控制论无直接关系，但在大模型训练中，我们既希望模型**复杂度受控**（类似控制系统不发散），又希望模型**编码数据有效**（信息量高且不冗余）。因此有人将二者结合提出例如“用信息论指标监控训练过程”，当信息冗余增多时视为需要控制正则化强度等，体现了控制与信息的协同作用。

**应用案例：**
- *自适应优化*: **Adam优化器**中的动量项相当于引入“惯性”平滑梯度更新，可视为一种简单反馈控制机制 ([An overview of gradient descent optimization algorithms](https://www.ruder.io/optimizing-gradient-descent/#:~:text=Essentially%2C%20when%20using%20momentum%2C%20we,faster%20convergence%20and%20reduced%20oscillation))；而Adam的每个参数自适应学习率则运用了信息论思想，利用梯度二阶统计信息来调整步长，实现高效更新 ([An overview of gradient descent optimization algorithms](https://www.ruder.io/optimizing-gradient-descent/#:~:text=Adam%20also%20keeps%20an%20exponentially,respectively%20as%20follows))。Adam在训练Transformer等大型模型时表现优异，Transformer论文中使用了Adam并配合预热-衰减的学习率调度策略，确保训练稳定收敛 ([](http://arxiv.org/pdf/1706.03762#:~:text=We%20used%20the%20Adam%20optimizer,the%20first%20warmup_steps%20training%20steps))。
- *学习率调度*: 在ResNet等深度网络训练中常用的**分段恒定然后降阶学习率**策略，可以看作人为设计的开环控制：前期高学习率加速（相当于大步往目标走），后期低学习率细调（避免来回震荡）。这提高了训练效果，也体现了控制论中**渐进逼近稳态**的思想。复杂一些的，如Transformer中先warm-up增大学习率再指数衰减 ([](http://arxiv.org/pdf/1706.03762#:~:text=We%20used%20the%20Adam%20optimizer,the%20first%20warmup_steps%20training%20steps))也是类似理念的应用，其参数选择可通过控制论分析调优。
- *梯度压缩通信*: 上述1-bit量化梯度的分布式训练在机器翻译等任务上取得了和全精度训练几乎一致的结果，但通信成本大幅降低 ([1-Bit Stochastic Gradient Descent and its Application to Data-Parallel Distributed Training of Speech DNNs](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/IS140694.pdf#:~:text=increase%20the%20mini%02batch%20size%20and,9%5D%2C%20or%20image%20rasterization))。这展示了信息论在分布式大模型训练中的价值——用更少比特传递几乎等价的信息。同样，谷歌的参数服务器架构中也采用压缩和校正技术减小带宽占用，这些做法都属于信息论范畴的**编码优化**。
- *对抗训练稳定性*: 控制理论还用于分析训练过程的**稳定性**。例如利用李雅普诺夫稳定性分析梯度下降迭代，确保更新不会发散。这种理论分析帮助设计出梯度裁剪(gradient clipping)等实践技巧，使训练过程保持受控，不因梯度爆炸而失稳。

**学习资料：** 想深入了解控制论和信息论在深度学习中的应用，可参考：
- 控制论教材：**《Feedback Systems》** (Astrom & Murray) 提供反馈控制原理的入门，对理解自适应学习率等有帮助；**《最优控制》**相关教材阐述LQR等优化控制方法，可延伸类比优化算法。
- 信息论教材：同上一节提到的Cover的教材，以及**《信息论、推理与学习算法》** (David MacKay) 涵盖编码和学习的联系，对理解梯度压缩和MDL有启发。
- 论文：*“Deep Learning Theory Review: An Optimal Control and Dynamical Systems Perspective”* ([](https://arxiv.org/pdf/1908.10920#:~:text=the%20analogy%20between%20optimization%20algorithms,Other%20stochastic%20modeling%2C%20such%20as)) ([](https://arxiv.org/pdf/1908.10920#:~:text=stability%20analysis%20of%20the%20Gram,systems%20by%20viewing%20each%20layer))综述了将深度学习视作动态系统、应用最优控制的方法。还有*“Deep Gradient Compression”*等论文专注梯度压缩，详细讨论了信息论技术在分布式训练中的效果。**Shannon (1948)**的经典论文对于理解信道容量和编码极限也很有价值。
- 在线课程：**控制理论**方面，可参考Coursera上的“控制工程导论”课程打好基础，再关注**深度强化学习**课程中关于策略优化的内容（强化学习实际上把决策看作控制问题）。**信息论**方面，YouTube上Naftali Tishby的讲座“Information Theory in Deep Learning”能够直观了解信息瓶颈思想 ([Anatomize Deep Learning with Information Theory | Lil'Log](https://lilianweng.github.io/posts/2017-09-28-information-bottleneck/#:~:text=Recently%20I%20watched%20the%20talk,the%20representation%20of%20the%20input))。

**数学基础与学习路径：** 针对控制论，需熟悉**微分方程、线性代数**和**Laplace/Z变换**等数学工具；针对信息论，**概率论**和**离散数学**是必要基础。学习路径可以先从基础数学入手：复习线性系统理论中的矩阵运算、特征值稳定性判据，以及概率论中的熵定义。然后结合实际编程练习：例如实现一个**PID控制算法**调节训练学习率的小实验，或编写压缩感知算法压缩模型权重，从实践中体会控制反馈和信息压缩的效果。对于数学基础薄弱的读者，建议先学习**MIT 18.06 线性代数**（或同等课程）和**Stanford CS229 概率基础**，再进阶到控制和信息论专门课程。边学理论边看深度学习文献，可以逐步建立起将数学原理应用于大模型训练的直觉。

### 3. 如何学习优化理论及其在大模型训练中的应用
**优化方法概览：** 深度学习训练本质上是一个大规模优化问题，即**最小化**损失函数。常用方法包括**梯度下降**及其随机变体（SGD）、**动量法**、自适应优化算法（Adagrad、RMSProp、Adam等）以及带约束的优化技巧（投影梯度、拉格朗日乘子等）。学习优化理论需要理解这些算法如何工作及在何种情境下表现更优。梯度下降是基础：每次沿着损失函数梯度方向更新参数；**随机梯度下降**在每次仅用部分样本近似梯度，极大提高了效率。对于深度网络这种非凸问题，优化过程充满局部极小值、鞍点等挑战，因此发展出了多种改进策略。

**在深度学习训练中的应用：** 不同优化方法对大模型的收敛速度和效果影响显著：
- *基础SGD与批量大小：* 经典**小批量随机梯度下降**由于每次更新引入噪声，反而有正则效果，可以跳出某些局部极小。大模型训练通常使用适中的批量尺寸（例如BERT训练用到的批量非常大，但搭配适当学习率策略），以在稳定收敛和计算效率间折中。
- *动量和加速梯度*: **动量法**在参数更新中加入前一次更新的动量项，相当于在梯度方向上增加“惯性”，可以加速沿正确方向的收敛并抑制沿陡峭方向的震荡 ([An overview of gradient descent optimization algorithms](https://www.ruder.io/optimizing-gradient-descent/#:~:text=Momentum%20,to%20the%20current%20update%20vector)) ([An overview of gradient descent optimization algorithms](https://www.ruder.io/optimizing-gradient-descent/#:~:text=Essentially%2C%20when%20using%20momentum%2C%20we,faster%20convergence%20and%20reduced%20oscillation))。这对于深度网络常见的“峡谷”形损失区域尤其有效，可避免梯度在狭窄弯道来回振荡 ([An overview of gradient descent optimization algorithms](https://www.ruder.io/optimizing-gradient-descent/#:~:text=SGD%20has%20trouble%20navigating%20ravines%2C,optimum%20as%20in%20Image%202)) ([An overview of gradient descent optimization algorithms](https://www.ruder.io/optimizing-gradient-descent/#:~:text=Momentum%20,to%20the%20current%20update%20vector))。例如，**AlexNet**训练时使用了带0.9动量的SGD，加速了在卷积网络高维损失空间中的收敛。
- *自适应学习率方法*: **Adagrad**是早期自适应优化器，对每个参数根据过去梯度大小调整学习率 ([An overview of gradient descent optimization algorithms](https://www.ruder.io/optimizing-gradient-descent/#:~:text=Adagrad%20,words%20require%20much%20larger%20updates))。它能对稀疏特征给予更大学习率，对频繁更新的特征给予更小学习率，从而在处理高维稀疏数据（如语言模型单词嵌入）时表现出色 ([An overview of gradient descent optimization algorithms](https://www.ruder.io/optimizing-gradient-descent/#:~:text=dealing%20with%20sparse%20data,larger%20updates%20than%20frequent%20ones))。谷歌在训练大规模语音和视觉神经网（如YouTube猫检测）时发现Adagrad显著提高了SGD的鲁棒性 ([An overview of gradient descent optimization algorithms](https://www.ruder.io/optimizing-gradient-descent/#:~:text=dealing%20with%20sparse%20data,larger%20updates%20than%20frequent%20ones))；Pennington等在训练GloVe词向量时也采用了Adagrad，以有效学习低频词汇的表示 ([An overview of gradient descent optimization algorithms](https://www.ruder.io/optimizing-gradient-descent/#:~:text=dealing%20with%20sparse%20data,larger%20updates%20than%20frequent%20ones))。
- *Adam优化器*: **Adam**综合了动量和RMSProp（对梯度平方的滑动平均）思想，为每个参数计算一阶和二阶矩的指数平均并进行偏差校正 ([An overview of gradient descent optimization algorithms](https://www.ruder.io/optimizing-gradient-descent/#:~:text=Adaptive%20Moment%20Estimation%20%28Adam%29%20,respectively%20as%20follows)) ([An overview of gradient descent optimization algorithms](https://www.ruder.io/optimizing-gradient-descent/#:~:text=,are%20close%20to%201))。其直观效果是既平滑梯度更新方向又自适应调整步长大小，被形容为“带摩擦的重球”，倾向于找到损失表面平坦的极小值 ([An overview of gradient descent optimization algorithms](https://www.ruder.io/optimizing-gradient-descent/#:~:text=Adam%20also%20keeps%20an%20exponentially,respectively%20as%20follows))。Adam因收敛快且对超参数不敏感，成为**Transformer、BERT、GPT等大型模型**训练的默认选择。在“Attention is All You Need”Transformer原始论文中，作者使用了Adam优化并针对大模型设置了$\beta_1=0.9, \beta_2=0.98$的特殊参数以及分段学习率调度，使模型在3.5天内成功收敛 ([](http://arxiv.org/pdf/1706.03762#:~:text=We%20used%20the%20Adam%20optimizer,the%20first%20warmup_steps%20training%20steps))。实证表明，Adam在各种任务上表现良好且优于传统SGD的手工调参方案 ([An overview of gradient descent optimization algorithms](https://www.ruder.io/optimizing-gradient-descent/#:~:text=The%20authors%20propose%20default%20values,method%20algorithms))。
- *约束优化*: 某些训练会引入约束（如要求权重范数有限以防过拟合，或要求输出分布满足某些条件），这可通过**拉格朗日乘子法**融入目标函数。优化过程中交替更新参数和乘子，达到约束近似满足的最优。有时权重正则化（如$L2$正则）也可被视为对参数范数的软约束，用拉格朗日乘子$\lambda$控制约束强度。对于**有约束的网络结构搜索**等问题，常需用到这些优化技巧确保解的可行性。

**应用案例：**
- *大模型训练实践*: 在GPT-3等超大规模模型训练中，通常先用分布式高效实现的Adam快速降低损失，然后可能切换到SGD作细致收敛，以取得更高的最终精度——这种两段式训练结合了Adam快和SGD稳的优点，是优化策略的实践创新。
- *优化算法改进*: 新的优化算法不断被提出以适应大模型需求，如**LAMB优化器**（Layer-wise Adaptive Moments）专门为大批量BERT训练设计，能在保持Adam优点的同时支持更大batch，是优化在应用中的改进实例。再比如**Apollo优化器**尝试引入二阶信息近似以更快训练BERT。这些改进都是在掌握基本优化原理后针对大模型特性做出的调整。
- *梯度累积与分布式优化*: 为了在内存限制下实现大batch训练，**梯度累积**策略被采用（累积多个小批次的梯度再更新），这在数学上等价于一次更大批量的SGD步长。在分布式环境中，All-Reduce梯度平均可以看作同步SGD的一部分，而近年来的**联邦学习**也借鉴了分布式优化和局部SGD思想，允许在不集中数据的情况下优化全局模型。
- *非凸优化理论*: 尽管深度网络的损失景观高度非凸，实践表明随机优化方法往往能找到足够好的解。一些理论工作利用**鞍点逃逸**分析和**局部平坦极小值**假设来解释这一现象。对于应用者而言，这意味着即使无法保证找到全局最优，通过合理的初始化（如He/Xavier初始化）和优化超参数调节，也能使大模型在复杂损失表面上找到性能优秀的解。

**学习资料：**
- 优化理论教材：**《凸优化》**（Boyd & Vandenberghe）是优化入门经典，涵盖梯度法、拉格朗日对偶等，对深度学习虽然非凸但仍有理论指导 ([Convex Optimization](https://stanford.edu/~boyd/cvxbook/bv_cvxslides.pdf#:~:text=When%20is%20an%20optimization%20problem,12))。**《数值优化》**（Nocedal & Wright）深入讲解各种一阶/二阶优化算法原理。
- 深度学习著作：**《Deep Learning 深度学习》**（Goodfellow等）第8章*优化算法*专门讨论了梯度下降变体和实践技巧 ([
  "Deep Learning", Chapter 8, Goodfellow, Bengio, Courville • David Stutz        ](https://davidstutz.de/deep-learning-chapter-8-goodfellow-bengio-courville/#:~:text=In%20chapter%208%2C%20Goodfellow%20et,focus%20on%20three%20different%20aspects)) ([
  "Deep Learning", Chapter 8, Goodfellow, Bengio, Courville • David Stutz        ](https://davidstutz.de/deep-learning-chapter-8-goodfellow-bengio-courville/#:~:text=Why%20learning%20deep%20neural%20networks,expansion%20of%20the%20gradient%20descent))。该书还有第4章回顾必要的数学基础，非常适合作为理论与实践衔接的教材。
- 博客与综述：**Sebastian Ruder** 的《优化算法综述》 ([An overview of gradient descent optimization algorithms](https://www.ruder.io/optimizing-gradient-descent/#:~:text=Gradient%20descent%20is%20the%20preferred,Adagrad%2C%20and%20Adam%20actually%20work))详细比较了Momentum、Adagrad、Adam等算法的原理和效果，并提供可视化理解，是实践者友好型资料。还有一些综述论文（如*“An overview of gradient descent optimization algorithms”*）也总结了各优化器性能和适用场景。
- 在线课程：Andrew Ng在Coursera的**深度学习系列课程**中有一门专门讲优化技巧（包括初始化、梯度检查、指数衰减等），此外**Stanford CS231n**课程也讨论了卷积网络训练中的优化细节和超参数调节经验。对于希望更深入理论的，可以选择**MIT 6.255优化方法**或**CMU 10-725优化**课程，这些课程的作业和项目可提高对优化算法的实践理解。

**数学基础与学习路径：** 优化方法的学习需要扎实的数学基础。建议依次掌握：
1. **微积分与线性代数：** 熟悉多元函数求导、梯度向量和Hessian矩阵，以及线性代数中矩阵分解等，为理解梯度下降和牛顿法打下基础。
2. **凸分析基础：** 学习凸集和凸函数的性质，了解一阶/二阶条件，掌握拉格朗日乘子法和KKT条件，这对理解有约束优化和正则化至关重要。
3. **算法推导与实现：** 在理解数学原理后，亲自推导几种优化算法的更新公式（如动量项为何等价于指数平滑，Adam的偏差校正因子从何而来），再尝试用Python实现简化版本，以加深印象。
4. **实践调优：** 数学和代码之外，优化的另一个层面是经验技巧。通过练习训练小型神经网络，调节学习率曲线、观察loss曲线形状，体会不同算法的收敛风格。这有助于将理论转化为解决实际大模型训练问题的直觉。

如果初学者数学基础不足，可以从**简单的二次函数优化问题**入手，手工推导和计算梯度下降的若干步；再利用诸如**matplotlib**绘制损失曲面，帮助理解优化轨迹。循序渐进地攻克数学障碍，才能在大模型优化中运用自如。

### 4. 压缩与编码理论的区别与联系
**基本区别：** **压缩**通常指**数据压缩**，即通过去除冗余以更紧凑形式表示数据；而**编码理论**广义上指**对信息进行表示和传输的数学理论**，包括**源编码**（即数据压缩）和**信道编码**（添加冗余来纠错保证传输可靠）两部分。在语境中，“压缩”偏重于**减少尺寸/加速计算**（如压缩神经网络参数），而“编码理论”偏重于**信息表示的底层原理**，关注在给定约束下（如信道带宽或误码率）如何最优地表示信息。两者联系在于数据压缩其实就是编码理论的一个分支（源编码问题），都涉及信息冗余与效率的权衡。

**在神经网络高效计算中的作用：**
- *模型权重的压缩：* 深度神经网络通常参数冗余度极高，许多权重对最终输出影响甚微。**网络剪枝**(pruning)通过移除这些不重要的连接，使模型变得更稀疏，从而在不显著降低精度的情况下减少参数量和计算量。这相当于**去除了冗余信息**，达到了压缩效果。例如剪枝后模型权重矩阵中零值占多数，可采用稀疏存储格式大幅降低内存占用。
- *参数量化：* 如前述，量化将权重取值从高精度浮点减少到低比特表示，这是典型的数据压缩技巧。编码理论在此提供指导：如何设计量化级别（码本）来最大程度保留原始权重的信息。比如均匀量化和非均匀量化（K均值聚类量化）可以被视为**有损压缩**，其失真-率权衡可用信息论分析。训练有意识地对权重量化还能逼近一种“最优码”，以最少bit表示模型参数。
- *熵编码：* 在剪枝和量化之后，模型参数仍有统计冗余，可以进一步采用传统**熵编码**（如哈夫曼编码、算术编码）压缩。如“深度压缩”方法的最后一步就是对量化后的权值符号用哈夫曼编码，进一步减少存储占用 ([[1510.00149] Deep Compression: Compressing Deep Neural Networks with Pruning, Trained Quantization and Huffman Coding](https://arxiv.org/abs/1510.00149#:~:text=work%20together%20to%20reduce%20the,reduced%20the%20storage%20required%20by))。这种做法直接应用了编码理论中的**源编码**原理，将出现频率高的权值用短码表示，低频权值用长码，实现接近熵极限的压缩效率 ([[1510.00149] Deep Compression: Compressing Deep Neural Networks with Pruning, Trained Quantization and Huffman Coding](https://arxiv.org/abs/1510.00149#:~:text=work%20together%20to%20reduce%20the,Our%20method))。
- *通信与部署: * 当需要在设备间传输模型时，编码理论的**信道编码**也有用武之地。例如在无线物联网设备上部署大模型，需要通过不可靠信道发送模型参数，这时可考虑加入纠错编码，保证即使部分bit出错模型仍能正常运行（一种容错压缩存储）。虽然目前深度学习模型传输主要关注**缩短传输时间**（源压缩）, 但未来在分布式不可靠环境下，信道编码的思想或许可增强模型传输的鲁棒性。

**联系与互补：** 压缩和编码理论在神经网络高效计算中并非孤立：
- 压缩方法借助编码理论来评估性能上界。例如用信息熵衡量网络各层信息含量，可以估计剪除哪些层/通道对输出影响最小，从而进行结构压缩。这实际是在用信息论度量指导压缩决策。
- 编码理论的研究成果为压缩提供工具。例如**熵瓶颈**理论应用在变分自编码器(VAE)的瓶颈层，通过约束中间表示的熵来达到隐空间压缩的目的，这是信息论和深度学习融合的前沿案例。
- 二者目标一致：都是**提高表示或传输的效率**。一个是减少模型自身冗余（小模型**快**且**省**），一个是优化模型信息表达（编码**精**且**稳**）。因此我们常将二者结合，如先用剪枝/量化减小模型，再用编码算法打包，最终产出高度压缩且易于传输的大模型版本 ([[1510.00149] Deep Compression: Compressing Deep Neural Networks with Pruning, Trained Quantization and Huffman Coding](https://arxiv.org/abs/1510.00149#:~:text=AlexNet%20by%2035x%2C%20from%20240MB,to%207x%20better%20energy%20efficiency))。

**应用案例：**
- *深度压缩pipeline*: 前述Han等人的深度压缩工作就是压缩与编码的完美结合：剪枝去掉~90%连接，量化权重以共享值并减少bit宽，最后用哈夫曼编码存储，实现了35~49倍的模型压缩 ([[1510.00149] Deep Compression: Compressing Deep Neural Networks with Pruning, Trained Quantization and Huffman Coding](https://arxiv.org/abs/1510.00149#:~:text=work%20together%20to%20reduce%20the,Our%20method)) ([[1510.00149] Deep Compression: Compressing Deep Neural Networks with Pruning, Trained Quantization and Huffman Coding](https://arxiv.org/abs/1510.00149#:~:text=AlexNet%20by%2035x%2C%20from%20240MB,to%207x%20better%20energy%20efficiency))。压缩后的模型不仅文件更小，而且因为大量权重为零或共享值，还能利用稀疏矩阵运算和查表快速计算，实现推理提速3-4倍 ([[1510.00149] Deep Compression: Compressing Deep Neural Networks with Pruning, Trained Quantization and Huffman Coding](https://arxiv.org/abs/1510.00149#:~:text=AlexNet%20by%2035x%2C%20from%20240MB,to%207x%20better%20energy%20efficiency))。
- *Lottery Ticket Hypothesis*: Frankle等提出**“彩票票据”假设**，发现大型网络中存在可以独立训练达到媲美原网络精度的极小子网络（“中奖子网”）。这表明了网络的巨大冗余：原网络很多参数其实并不需要。这一发现推动了剪枝领域的研究，即尝试在训练前或训练早期就找到这些高效子网络。这从另一个角度证明了压缩的可能性——模型的信息可以由远少于原始参数的子集来编码表示。
- *模型蒸馏*: 知识蒸馏可以看作是在**模型输出空间**做压缩编码的过程。教师模型对每个类别输出一个soft概率，这实际上是对输入的**信息编码**：哪个特征模式对应哪个类别的软信息。学生模型学习重现这种输出分布，相当于对原模型的函数做近似编码。这种方式成功将一个大型模型的功能“压缩”进小模型，在移动端部署如语音识别、图像分类等应用中，小模型通过蒸馏得到的暗知识显著优于直接训练同样小模型。
- *算术编码与模型压缩*: 最近有工作将**算术编码**引入神经网络的权重压缩，通过对量化后的权重序列进行熵近似最优的编码，使压缩率比简单哈夫曼更高。同时，他们设计了解码器直接在硬件上解码权重并执行计算的方案，将存储和计算结合，提高运行效率。这展示了编码理论更先进技术在模型压缩中的应用前景。

**学习资料：**
- 编码理论教材：**《信息论与编码》(MacKay)**涵盖源编码和信道编码基础，可帮助理解量化、熵编码等技术原理。**《Error Control Coding》**(Lin & Costello)详尽讲解信道编码原理，对于理解容错存储、纠错码在模型传输中的作用有帮助。
- 压缩算法论文：除Han的深度压缩外，还有*“Pruning Filters for Efficient ConvNets”*（通道剪枝）、*“Dynamic Network Surgery”*（训练中剪枝）、*“DeepCoder”*（代码表示网络权重）等，全面了解剪枝和量化技术的发展。**Blalock et al.(2020)**的《神经网络剪枝综述》总结了各种剪枝方法及效果，对新手非常友好。
- 在线资源：斯坦福CS上一篇课程**“模型压缩与加速”**提供视频和lecture notes，系统介绍剪枝、量化、蒸馏和稀疏化等内容。YouTube上**MIT HAN Lab**（Han教授团队）有多场关于模型压缩的讲座，分享了学术界和工业界在网络压缩、硬件加速上的最新进展。

**数学基础与学习路径：** 学习压缩与编码需要**离散数学**、**概率论**和**算法设计**方面的基础。可以按以下路径：
1. **打好信息论基础：** 掌握熵、KL散度等概念，并理解香农一阶定理（源编码定理）和二阶定理（信道编码定理）的表述。这帮助你从理论上认识**压缩的极限**（如熵是无失真压缩的下界）。
2. **学习基本编码算法：** 理解前缀码（哈夫曼算法）的构建原理，练习对一串符号计算其熵并设计近似最优码。这对理解剪枝后权重如何进一步压缩很实用。继续学习算术编码等更加接近熵极限的方法。
3. **理解稀疏表示和矩阵算法：** 针对剪枝产生的大量零权重，需要掌握稀疏矩阵存储与乘法的算法原理（如CSR格式）。线性代数知识在此派上用场，可学习相关章节以理解**稀疏矩阵**计算的复杂度优势。
4. **实践操作：** 上手实现简单的模型压缩：例如训练一个小型网络，然后应用剪枝将小幅度权重置零，再用Python的压缩库对模型文件哈夫曼编码，比较性能变化。这样的项目将锻炼将理论应用于实践的能力，加深对压缩与编码结合点的理解。

对于缺乏编码理论背景的同学，可以先从直观的例子入手：如学习“ZIP文件如何压缩文本”的基本原理（对应哈夫曼编码），再类比到“如何压缩神经网络权重”。通过跨领域类比，逐步建立对压缩和编码理论在深度学习中作用的认识。

### 5. “感知”的前置知识及其在大模型训练中的应用
**感知和认知基础：** “感知”通常指生物或智能体获取和解释感官信息的过程。在深度学习中，感知相关的前置知识涉及**认知科学**（研究人如何感知和认知世界的规律）、**计算机视觉**（让计算机从图像中感知物体与模式）以及**神经科学**（研究大脑中视觉、听觉等感知信号处理机制）。这些领域为深度学习模型的架构设计提供了灵感。例如，人类视觉系统具有分层结构和局部感受野，神经科学家Hubel和Wiesel在上世纪发现**猫初级视觉皮层**的神经元对局部边缘等特定模式敏感 ([Convolutional neural network - Wikipedia](https://en.wikipedia.org/wiki/Convolutional_neural_network#:~:text=Work%20by%20Hubel%20%20and,326)) ([Convolutional neural network - Wikipedia](https://en.wikipedia.org/wiki/Convolutional_neural_network#:~:text=Their%201968%20paper%20identified%20two,18))。受此启发，计算机视觉领域发展了**卷积神经网络(CNN)**架构：模拟生物视觉的分层感知，使用局部卷积滤波器提取边缘等低级特征，再逐级组合成长距离依赖的高级特征。这种**层次感知建模**成功地让机器具备了类似人类的图像感知能力，是深度学习借鉴感知知识的经典案例。

**大模型中的感知建模：** 现代大模型（如Transformer、Vision Transformer等）在感知信息的方式上有所不同但同样可以找到认知科学和神经科学的影子：
- *注意力机制(Attention)：* **注意力机制**来源于对人类认知中选择性注意的模拟——人会将注意力聚焦在重要的感知信息上，忽略无关细节 ([Attention (machine learning) - Wikipedia](https://en.wikipedia.org/wiki/Attention_(machine_learning)#:~:text=Inspired%20by%20ideas%20about%20attention,only%20through%20the%20previous%20state))。在深度学习中，Bahdanau等人首先在翻译模型中引入软注意力，让模型学会对输入序列的不同位置赋予不同权重，以决定“看哪里”更有助于当前输出 ([Attention (machine learning) - Wikipedia](https://en.wikipedia.org/wiki/Attention_(machine_learning)#:~:text=Inspired%20by%20ideas%20about%20attention,only%20through%20the%20previous%20state))。Transformer架构进一步发扬了这一思想，完全以**自注意力**来建模序列，全局地考虑输入中的各部分关联。对比CNN固定的局部感受野，Transformer的注意力机制更类似于人类**全局统筹感知**：它不受限于相邻区域，可以任意“视线跳转”到全局信息。这种感知建模方式虽然与传统生物视觉模型不同，但某种程度上模拟了人类注意力在视觉场景中跳跃聚焦的行为。**Vision Transformer (ViT)**就是将Transformer应用于图像感知的尝试：它将图像切分为不重叠块（类似人眼注视不同区域），并用自注意力融合全图信息。令人惊讶的是，ViT在预训练足够数据后可达到与CNN相当甚至更好的性能 ([An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale | OpenReview](https://openreview.net/forum?id=YicbFdNTTy#:~:text=networks%20while%20keeping%20their%20overall,fewer%20computational%20resources%20to%20train))。这说明即使没有显式的生物启发（如卷积的局部性），模型也能通过充足学习自动形成有效的感知机制——但前提是有**大规模数据**和**强正则**来弥补先验的缺失 ([An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale | OpenReview](https://openreview.net/forum?id=YicbFdNTTy#:~:text=networks%20while%20keeping%20their%20overall,fewer%20computational%20resources%20to%20train))。
- *多模态感知*: 人的感知是多模态的，大脑会综合视觉、听觉等信息。认知科学研究表明，不同感觉通路的信息在大脑高级皮层会融合。深度学习也开始构建多模态大模型，例如OpenAI的CLIP模型将文本和图像共同嵌入到统一空间，使模型能够从图像“感知”出语义。这种跨模态感知的思想与认知科学中的**通感**和**概念联结**类似：通过共同表示，不同模态之间的语义关系被模型捕捉到，实现更接近人类的综合感知能力。
- *神经科学启发的模块*: 除了宏观架构，一些具体模型机制直接受神经生物学启发。例如**侧抑制**(lateral inhibition)机制在生物视觉中增强边缘对比，CNN中对应的**局部归一化**层模仿了这一点，让神经元响应更加尖锐。再比如**循环神经网络(RNN)**的记忆单元与大脑中工作记忆概念相似，长短期记忆网络(LSTM)引入的**门控机制**可以看作对大脑选择性记忆和遗忘的模拟。最新的**胶囊网络**(Capsule Networks)试图引入分层姿态表示，灵感来源于人类视觉在不同视角下感知物体的稳定性，这是对传统CNN的一种认知科学改进思路。
- *感知的训练策略*: 感知知识还影响训练过程的设计。例如**数据增广**技术借鉴了人类感知对扰动的鲁棒性——我们对亮度、角度变化仍能认物，同理给训练图像随机翻转、颜色偏移，训练出的模型在实际环境下更健壮。又如**课程学习**(Curriculum Learning)理念受启发于人类学习从易到难的过程：先让模型学习简单模式（大尺度、明显特征），再逐渐提高任务难度，相当于模拟人类感知和认知渐进细化的过程。研究表明课程学习可以帮助模型更快收敛且效果更好。

**应用案例：**
- *卷积网络与人类视觉:* 卷积网络的中间层经常被拿来与大脑视觉皮层进行比较研究。比如早期层学到的**边缘检测滤波器**对应V1区简单细胞功能 ([Convolutional neural network - Wikipedia](https://en.wikipedia.org/wiki/Convolutional_neural_network#:~:text=Their%201968%20paper%20identified%20two,18))；中层组合成形状，类似V2/V4区对复杂图形的反应；高层神经元对特定物体类别（如人脸）的强响应，类似于IT区或FFA的人脸识别神经元。这种对应关系并不完美，但定性上证明了CNN确实学会了逐层抽象的感知过程，与人类视觉有相通之处。
- *Vision Transformer感知分析*: 后续研究通过可视化ViT的注意力图发现，模型自注意力头会自动学会关注图像中语义显著的部分（例如动物的头部、物体的轮廓），这和人类看图时注意力分配有一定相似。这说明虽然ViT没有硬编码感受野，它通过大数据训练自发地学出了某种**类似人类注视模式**的行为。这样的模型还显示出对输入扰动的不同敏感性，与CNN互有优劣，比如ViT对纯噪声和局部遮挡更鲁棒，但对大范围结构化扰动更脆弱，这为我们进一步结合两类模型提供了线索。
- *大模型与大脑表征对比*: 最近一些神经科学实验将深度网络作为模型来预测和解释大脑活动。例如利用训练好的CNN模型去预测猴子或人脑视觉皮层对新图像的响应，发现高级别CNN特征与真实神经元反应有显著相关性。这说明深度学习模型在某种程度上捕获了真实感知系统的表征方式。因此反过来，神经科学家也受益于这些模型去理解大脑编码。这体现了感知建模方面**人工智能与神经科学的融合**应用：大模型不仅受启发于大脑，也帮助揭示大脑工作机理。

**学习资料：**
- 认知科学入门：推荐阅读**《心智探奇》(Cognitive Science by José Luis Bermúdez)**，了解人类感知与认知机制的基础理论，其中视觉、记忆章节对深度学习从业者尤其有启发。
- 计算机视觉教材：**《计算机视觉：算法与应用》**(Richard Szeliski)涵盖了传统视觉算法和一些生物视觉启发，可帮助建立对机器感知任务的总体认识。**《深度学习与计算机视觉》**等书则聚焦CNN/ViT等模型如何处理视觉信息，里面的架构思想部分往往会提到与人类视觉的类比。
- 神经科学读物：对于非专业读者，**《How We See: The Vision Transformations of the Brain》**或国内的《视觉之旅：从眼到脑》是不错的科普读物，解释了生物视觉的分层处理原理。想更进一步可以看Gary Marcus等人的文章，讨论深度学习与人类认知的异同。
- 论文：Hinton的*“神经胶囊”*论文阐述了卷积网络在感知建模上存在的问题并提出解决方案，可一窥认知科学如何影响新模型设计。Dosovitskiy等人的**ViT论文** ([An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale | OpenReview](https://openreview.net/forum?id=YicbFdNTTy#:~:text=Abstract%3A%20While%20the%20Transformer%20architecture,art)) ([An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale | OpenReview](https://openreview.net/forum?id=YicbFdNTTy#:~:text=networks%20while%20keeping%20their%20overall,fewer%20computational%20resources%20to%20train))值得研读，理解Transformer在视觉感知中的表现。还有*“Deep Learning and the Brain”*等综述论文，专门讨论生物大脑与深度网络的联系。
- 在线课程：**斯坦福CS231n**的第一课就介绍了生物视觉启发CNN的背景，非常直观。**MIT 9.91 (Computational Cognitive Science)**课程则探讨了认知科学模型，包括一些类脑的感知模型，对拓展视野有帮助。此外，YouTube上有不少讲座（如Yann LeCun的主题演讲）讨论“生物智能对机器智能的启示”，可作为轻松的学习材料。

**学习路径建议：** 感知相关知识跨度较大，应根据自身背景逐步深入：
1. **从直观现象入手：** 可以先观察一些现象并思考其背后的机制。例如，人脸颠倒后识别困难（Thatcher效应）说明大脑专门的面部感知机制；对抗视觉错觉体验说明感知并非简单像素处理。带着这些问题去阅读科普材料，会提高兴趣和理解。
2. **打基础：** 系统学习生物感官系统基础，例如眼睛成像原理、视网膜到视皮层的信息传递。这部分知识可通过观看相关TED教育视频或入门书籍图解来掌握，不要求过深的生物学背景。
3. **对照深度模型：** 学习卷积网络、Transformer等模型时，主动将其与生物系统对比：卷积核≈感受野、池化≈视网膜神经汇聚、自注意力≈注意力焦点等等。这种对照有助于加深对模型设计动机的理解。例如明白了卷积的来历，就更容易理解卷积神经网络为何擅长视觉任务。
4. **实践体会：** 可以做一个有趣的小实验来融合认知知识，如实现一个简单的**视觉注意力模型**：在图像上模拟人眼注视路径（例如扫描重要区域），然后指导神经网络只关注这些区域进行分类，观察性能变化。这种实验能帮助理解注意力机制为何有效，以及人类感知策略对模型的启发作用。
5. **拓展与反思：** 在掌握现有模型后，阅读一些跨领域研究，如脑机接口利用神经网络解码大脑信号、认知心理学实验揭示深度模型与人认知差异的论文。思考深度学习模型的感知能力还欠缺哪些人类特性（比如环境适应能力、因果理解等），这将指引你展望下一步模型改进的方向。

通过以上逐层递进的方式，将认知科学、神经科学的知识与深度学习实践相结合，你将不仅“会用”大模型，还能从更高层次**理解模型如何感知世界**，并有能力借鉴人类智慧来改进人工智能模型的感知与认知能力。




## 秘塔搜索：大模型及其应用研究与技术前沿


> - 有人推荐研究大模型的，要深入学习「 信息论 控制论 优化 压缩 感知」，为什么？有什么资料能佐证这一点，这些前置学识是什么，相关教材又有哪些？ - 信息论在大模型训练中的应用 - 控制论与信息论的区别与联系，及其在大模型的应用 - 如何学习优化，前置知识是什么，以及在大模型训练中的应用 - 压缩跟coding theory有什么区别与联系？、 - “感知”的前置知识是什么，以及在大模型训练中的应用

https://metaso.cn/s/xXk5jx2


> 嗯，我现在要回答为什么研究大模型需要深入学习信息论、控制论、优化、压缩、感知这几个学科，以及相关的资料和教材。首先，我需要逐一分析每个领域与大模型的关系，然后结合我搜索到的资料来支撑每个论点。
>
> 信息论方面，提到信息论在深度学习中的应用，比如熵和互信息用于模型优化和损失函数设计，例如交叉熵损失函数。和中提到模型压缩技术如知识蒸馏、剪枝、量化，这些可能和信息论中的压缩概念有关。信息论可能帮助理解如何有效压缩模型参数而不损失太多信息。
>
> 控制论呢，提到大系统的控制分解和优化，这可能和大模型训练中的分布式优化、参数调整有关。另外，控制论中的反馈机制可能应用在训练过程中的动态调整，比如学习率调整或梯度控制。需要区分控制论和信息论，信息论更多关注信息传输和处理，而控制论关注系统的调节和稳定性。
>
> 优化是大模型训练中的核心，的ResNet展示了优化深度网络的方法，比如残差学习。和讨论优化策略如参数效率、迁移学习，这需要优化算法如梯度下降、Adam等。优化需要数学基础如线性代数、概率论，可能还需要凸优化理论。
>
> 压缩方面，多次提到模型压缩技术，如剪枝、量化、蒸馏，这和coding theory的区别是什么？根据，压缩感知基于信息论的熵，而编码理论可能更多关于纠错码和数据传输效率，但两者都涉及信息的高效表示。需要进一步查证。
>
> 感知，可能涉及多模态学习，的ImageNet和的跨模态融合，说明感知需要计算机视觉的基础，如卷积网络、注意力机制（的Transformer）。前置知识可能包括信号处理、图像处理、神经网络架构。
>
> 现在要回答每个子问题，并引用对应的证据。例如信息论在大模型中的应用包括模型压缩和优化，引用和。控制论和大模型的联系可能在系统优化和分布式训练，引用和。优化需要数学基础，应用在训练过程，引用。压缩与编码理论的区别和联系，参考和可能的其他来源。感知需要计算机视觉和多模态处理，引用。
>
> 教材方面，可能需要推荐信息论的经典教材如Cover的《信息论基础》，控制论的教材如《现代控制工程》，优化方面的Boyd的《凸优化》，压缩方面可能有《深度学习压缩技术》相关书籍，感知则涉及《深度学习》和《计算机视觉》教材。不过证据中没有直接提到这些教材，可能需要根据领域常识推断，但如果有证据中的资料更好。例如提到了信息论基础，提到了控制论的系统理论，而则涉及深度学习的应用。
>
> 需要确保引用正确的证据编号，比如在信息论部分引用和，控制论引用，优化引用，压缩引用感知引用。同时注意问题中的每个子点都要覆盖到，可能还需要指出各领域的联系，如控制论与信息论在系统优化中的结合。
>
> 最后，整理结构，按问题中的子问题分别回答，每个部分说明为什么需要该学科，应用场景，前置知识，教材推荐（可能部分需要推断），并正确引用证据。

研究大模型需要深入学习信息论、控制论、优化、压缩和感知等学科，因为它们在大模型的设计、训练和应用中起到关键作用。以下从具体问题出发，结合证据展开分析：

------

### **1. 信息论在大模型训练中的应用**

信息论的核心概念（如熵、互信息）帮助理解模型的信息处理和压缩效率。例如：

- **模型优化**：交叉熵损失函数基于信息熵设计，用于衡量模型输出与真实分布的差异。
- **压缩技术**：知识蒸馏（将大模型知识迁移到小模型）和量化（降低参数精度）依赖信息论中的高效编码理论，以平衡模型性能与资源消耗。

**前置知识**：概率论、统计学、编码理论。
**教材推荐**：

- Thomas M. Cover《信息论基础》（Elements of Information Theory）。

------

### **2. 控制论与信息论的区别与联系，及其在大模型的应用**

- 区别

  ：

    - 信息论关注信息的量化、传输和压缩（如模型参数的信息量）。
    - 控制论研究系统的动态调节与稳定性（如训练过程的梯度控制、分布式参数同步）。

- **联系**：两者在系统优化中结合，例如通过反馈机制调整学习率（控制论）或利用信息熵优化模型表示（信息论）。

- **应用**：大模型训练中的参数通信优化（如稀疏化、延迟更新）需控制论指导；模型压缩则结合信息论的高效编码方法。

**前置知识**：线性系统理论、动态规划、概率论。
**教材推荐**：

- 奥斯特隆姆《控制系统导论》（Control System Design）。

------

### **3. 如何学习优化，前置知识及在大模型中的应用**

- **前置知识**：线性代数、微积分（梯度计算）、凸优化理论、概率论。

- 应用

  ：

    - **优化算法**：如Adam优化器调整参数更新步长。
    - **迁移学习**：通过预训练和微调（如BERT的微调策略）优化模型在特定任务的性能。
    - **训练加速**：大批量（Large Batch）训练和参数稀疏化技术提升收敛速度。

**教材推荐**：

- Stephen Boyd《凸优化》（Convex Optimization）。
- Ian Goodfellow《深度学习》（Deep Learning）。

------

### **4. 压缩与编码理论（Coding Theory）的区别与联系**

- **联系**：两者均关注信息的高效表示。编码理论侧重纠错和数据完整性（如纠错码），压缩则关注减少数据体积（如模型剪枝、量化）。

- 区别

  ：

    - 压缩技术（如知识蒸馏）优先保留关键信息，可能牺牲部分细节。
    - 编码理论强调在传输中对抗噪声，确保数据可靠性。

- **应用**：大模型压缩依赖信息论的熵概念（如量化中的信息损失评估），而编码理论可能用于分布式训练中的参数传输纠错。

------

### **5. “感知”的前置知识及在大模型中的应用**

- **前置知识**：信号处理、计算机视觉（如卷积网络）、自然语言处理（如注意力机制）、多模态融合。

- 应用

  ：

    - **图像处理**：ImageNet数据集驱动视觉模型的预训练，提升物体识别能力。
    - **多模态融合**：Transformer架构通过自注意力机制整合文本与图像信息（如跨模态生成）。
    - **自监督学习**：通过掩码语言建模（如BERT）或对比学习，模型从无标注数据中学习感知能力。

**教材推荐**：

- Richard Szeliski《计算机视觉：算法与应用》。
- Ashish Vaswani等《Attention Is All You Need》（论文）。

------

### **总结**

信息论、控制论等学科为理解大模型的信息处理、系统优化和多模态感知提供理论基础。相关教材和技术文献（如BERT、Transformer论文）是学习的关键资源，而模型压缩、优化策略（如知识蒸馏）和跨模态融合则是具体应用方向。结合理论与实践，可全面掌握大模型的核心技术。

#### 信息论在深度学习模型优化中的具体应用案例是什么？

信息论在深度学习模型优化中的具体应用案例可以从多个方面进行探讨。以下是一些具体的例子：

1. **信息瓶颈理论**：
    - 信息瓶颈理论（Information Bottleneck）是一种通过最小化输入和输出之间的互信息来优化模型的方法。这种方法可以用于提高模型的泛化能力，减少过拟合。例如，在深度学习模型训练过程中，信息瓶颈理论可以用于设计损失函数，以确保模型在训练过程中只保留对预测任务有用的信息，而忽略无关的信息。
2. **变分信息瓶颈（VBIB）**：
    - 变分信息瓶颈（Variational Information Bottleneck）是一种基于变分推断的方法，用于优化深度学习模型中的信息传递。VBIB框架可以揭示深度神经网络内部的信息传递和表示学习过程，帮助理解模型如何从输入数据中提取特征，并将其用于输出。
3. **交叉熵损失函数**：
    - 在深度学习中，交叉熵损失函数（Cross-Entropy Loss）是一种常用的损失函数，用于衡量模型预测结果与实际标签之间的差异。通过最小化交叉熵损失，模型可以更准确地预测输入数据的标签。此外，交叉熵损失函数还可以用于计算信息瓶颈损失，进一步优化模型参数。
4. **生成对抗网络（GANs）**：
    - 生成对抗网络（Generative Adversarial Networks, GANs）是一种基于信息论的生成模型，通过对抗训练的方式生成高质量的数据。GANs利用信息论中的互信息概念，确保生成的数据与真实数据之间的相似度，从而提高生成数据的质量。
5. **注意力机制**：
    - 注意力机制（Attention Mechanism）在深度学习中广泛应用于自然语言处理和图像识别等领域。通过计算输入序列中不同位置之间的互信息，注意力机制可以自动确定哪些部分对当前任务最重要，从而提高模型的性能。
6. **特征选择与降维**：
    - 信息论在特征选择和降维中的应用也非常广泛。通过计算特征之间的互信息，可以识别出哪些特征对模型预测任务最有用，从而减少模型的复杂度，提高计算效率。
7. **模型评估与解释**：
    - 信息论还可以用于评估模型的性能和解释模型的行为。例如，通过计算模型输出与输入之间的互信息，可以评估模型的泛化能力；通过分析特征之间的条件互信息，可以理解模型如何利用输入特征进行预测。
8. **强化学习**：
    - 在强化学习中，信息论可以用于设计奖励函数和策略更新规则。通过计算状态、动作和奖励之间的互信息，可以优化智能体的行为，使其在复杂环境中做出更好的决策。

#### 控制论如何在大模型训练的分布式优化中发挥作用？

控制论在大模型训练的分布式优化中发挥着重要作用，主要体现在以下几个方面：

1. **反馈机制**：控制论的核心思想之一是通过反馈机制来调整系统的行为。在大模型训练中，反馈机制可以用于监测模型的性能，并通过调整训练参数来优化模型的训练效果。例如，通过反馈机制，可以获取模型的输出结果，并将其与实际结果进行比较，从而调整模型的参数或结构。
2. **分布式控制**：控制论在分布式系统中的应用也得到了广泛研究。在分布式优化中，控制论可以帮助设计和协调各个组件之间的交互，以实现整体系统的优化。例如，通过分布式控制方法，可以处理系统规模较大、功能连接性较高、控制连接性较高和度较大的复杂系统。
3. **强化学习与控制论的结合**：控制论与强化学习的结合为大模型训练提供了新的视角。强化学习中的奖励机制和惩罚机制可以被视为一种控制论的反馈机制，通过这种方式，模型可以自主调整行为以达到预定目标。
4. **分布式模型预测控制（MPC）** ：分布式MPC方法结合了分布式人口动力学方案，通过非集中式控制方法来解决特定问题。这种方法在分布式优化中具有重要意义，因为它可以处理大规模、高维度的优化问题，并且能够适应动态变化的环境。
5. **路径积分控制**：路径积分控制是一种优化控制问题的方法，特别适用于高维随机控制问题。通过Feynman-Kac路径积分，可以表达特定时间点和位置下的最优控制函数，并利用蒙特卡洛采样和重要性采样加速计算。这种方法在分布式优化中具有潜在的应用价值。
6. **系统控制理论的应用**：系统控制理论提供了一种框架和方法，用于优化AI系统的设计和协调。在复杂的AI系统中，各个组件之间相互作用，形成一个动态的系统。通过系统控制理论，可以优化这些组件之间的交互，从而提高整个系统的性能。

#### 最新的优化算法有哪些，它们在大模型训练中的效果如何？

最新的优化算法在大模型训练中的效果显著，以下是一些主要的优化算法及其在大模型训练中的应用情况：

1. **Adam优化器**：
    - Adam是一种基于自适应估计低阶矩的一阶梯度优化算法，适用于随机目标函数的优化。它通过自适应调整学习率，使得模型在不同阶段都能快速收敛。Adam优化器在大模型训练中表现出色，能够有效处理大规模数据和参数，提高训练效率。
2. **Adagrad优化器**：
    - Adagrad是一种自适应学习率的优化算法，能够根据每个参数的历史梯度信息动态调整学习率。它在处理稀疏数据和非平稳目标函数时表现良好，但在训练大规模模型时可能会遇到学习率逐渐减小的问题。
3. **动量（Momentum）**：
    - 动量是一种改进的梯度下降算法，通过引入动量项来加速收敛过程。它在处理具有多个局部最小值的复杂优化问题时表现优异，有助于避免陷入次优解。
4. **Nesterov加速**：
    - Nesterov加速是一种改进的动量算法，通过预估未来的位置来进一步加速收敛。它在处理非凸优化问题时表现良好，能够更快地达到最优解。
5. **批量梯度下降（BGD）**：
    - BGD在每个批次上计算梯度并更新模型参数，优点是收敛速度快，但计算资源消耗大。在大模型训练中，BGD通常用于初步训练阶段，以快速接近最优解。
6. **随机梯度下降（SGD）**：
    - SGD在每个样本上计算梯度并更新模型参数，优点是计算资源消耗小，但收敛速度较慢。在大模型训练中，SGD常用于后期微调阶段，以进一步优化模型性能。
7. **批量随机梯度下降（MBGD）**：
    - MBGD结合了BGD和SGD的优点，在每个批次中随机选取一部分样本计算梯度并更新模型参数，优点是收敛速度较快，计算资源消耗适中。在大模型训练中，MBGD是一种常用的优化策略。
8. **AdaDELTA**：
    - AdaDELTA是一种动态调整学习率的方法，仅使用一阶信息进行调整，无需手动设置学习率。它在处理噪声梯度信息时表现良好，适用于大规模数据集和分布式计算环境。
9. **RsLoRA+算法**：
    - RsLoRA+是飞桨大模型套件v2.8.0版本中引入的一种高效对齐算法，能够大幅提升大模型的训练收敛速度和效果。该算法通过特色精调和高效对齐技术，实现了更优的训练性能。
10. **RLHF PPO算法**：

- RLHF PPO是一种高性能生成加速算法，打破了PPO训练中速度生成的瓶颈，显著提升了训练性能。该算法在大模型训练中表现出色，特别是在需要高精度和高效率的场景中。

这些优化算法在大模型训练中的应用不仅提高了训练效率，还降低了计算成本。未来的研究方向包括开发更高效的优化算法、结合模型压缩技术降低计算量以及利用分布式计算提高训练速度。

#### 模型压缩技术中，知识蒸馏、剪枝和量化的效果对比如何？

模型压缩技术中，知识蒸馏、剪枝和量化各有其特点和效果。以下是对这三种技术的详细对比：

### 1. 知识蒸馏

知识蒸馏是一种通过训练一个较小的模型（学生模型）来模仿一个较大的模型（教师模型）的方法。学生模型从教师模型的输出分布中学习，从而获得相似的性能。这种方法的优点在于可以显著减小模型大小，同时保持较高的准确率。知识蒸馏适用于各种设置，包括白盒和黑盒知识蒸馏，可以有效提高模型的泛化能力。

### 2. 剪枝

剪枝是通过移除模型中不重要的权重或神经元来减少模型大小的方法。剪枝可以分为结构化剪枝和非结构化剪枝。结构化剪枝通过移除整个神经元或通道来减少计算复杂度，而非结构化剪枝则随机移除权重。剪枝的优点是不需要重新训练或只需少量微调，但需要注意剪枝策略的合理性，否则可能会影响模型性能。

### 3. 量化

量化是将浮点数权重参数转换为较低精度整数的过程，从而减少模型的存储和计算需求。量化可以分为权重量化、激活量化和键值缓存量化等方法。量化的主要优点是易于实现，特别是在硬件上运行时可以显著提高运行速度。然而，量化方法对不同模型的适配性可能有所不同，过度量化可能会影响准确率。

### 效果对比

- **模型大小**：剪枝和量化通常可以显著减小模型大小，而知识蒸馏则通过训练更小的模型来实现压缩。
- **计算复杂度**：剪枝和量化可以减少计算复杂度，而知识蒸馏主要通过减少参数数量来实现。
- **准确率**：知识蒸馏通常能够保持较高的准确率，而剪枝和量化可能会在过度压缩时影响准确率。
- **适用场景**：知识蒸馏适用于不同架构之间的迁移学习，剪枝适用于各种设置，量化则特别适合在低功耗设备上运行。

### 结论

知识蒸馏、剪枝和量化各有其优势和适用场景。选择哪种方法取决于具体的应用需求和模型特性。例如，如果需要在保持高准确率的同时减小模型大小，知识蒸馏是一个不错的选择；如果需要在硬件上运行时提高速度，量化可能更为合适；

#### 在多模态学习中，感知技术的最新进展是什么？

在多模态学习中，感知技术的最新进展主要集中在以下几个方面：

1. **多模态融合方法**：近年来，基于卷积神经网络（CNN）的端到端学习方法被广泛应用于多模态学习中，用于从多个模态中学习融合表示。这些方法将深度图编码到高阶哈希表示或将其转换为三通道图像，从而更好地进行特征学习。此外，还提出了早期、分层和晚期融合方法，以提高多模态数据的处理效率和准确性。
2. **感知分数的应用**：感知分数是一种新的度量方法，用于评估模型对输入特征的不同子集（即模态）的依赖程度。研究表明，更先进的视觉问题回答和多模态对话视觉模型往往对视觉数据的感知能力较弱，这表明答案越来越多地从文本线索中推断出来。
3. **多模态感知在教育中的应用**：新一代学习环境致力于实现多模态感知技术支撑下的学习状态细粒度监测。通过可信密态计算技术和物联感知设备，实时采集和分析学习者的学习状态，并支持学习者之间、学习者与虚拟环境之间的实时交互。
4. **多模态感知在6G通信中的应用**：在6G时代，通信感知一体化技术将融合多种感知技术和数据源，包括移动通信信号、雷达、传感器、摄像头、Wi-Fi、超声波、蓝牙、RFID等。通过结合不同感知技术的特点和优势，可以显著提升检测、定位、识别、估计等性能的准确性和安全性。
5. **多模态感知在机器人和自动驾驶中的应用**：多模态感知技术在机器人协作与控制、自动驾驶等领域也有广泛应用。例如，多机器人协同规划、路径优化、合作策略等研究，以及在自动驾驶中的压力感知等。
6. **多模态感知在多媒体领域的应用**：复旦大学姜育刚教授的研究团队正在构建包含多模态感知、多模态生成、决策学习等能力的多模态世界模型，以实现更智能的多媒体处理。

分享简洁

追问



------



相关组织





| 组织名称                      | 概述                                                         |
| :---------------------------- | :----------------------------------------------------------- |
| Meta AI                       | 科技/人工智能Meta AI团队在Llama 3.1模型中采用了监督微调、拒绝采样和直接偏好优化（DPO）方法。 |
| Apple Intelligence Foundation | 科技/人工智能提到了Apple Intelligence Foundation在大模型训练中的应用。 |

------



来源

1. PDF

Kaiming He, X. Zhang et al. “Deep Residual Learning for Image Recognition.” 2016 IEEE Conference on Computer Vision and Pattern Recognition (CVPR)(2015).

2. PDF

Ashish Vaswani, Noam M. Shazeer et al. “Attention is All you Need.” Neural Information Processing Systems(2017).

3. PDF

Jacob Devlin, Ming-Wei Chang et al. “BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding.” North American Chapter of the Association for Computational Linguistics(2019).

4.

Jia Deng, Wei Dong et al. “ImageNet: A large-scale hierarchical image database.” 2009 IEEE Conference on Computer Vision and Pattern Recognition(2009).

5. PDF

Research on the Application and Optimization Strategies of Deep Learning



6.

大模型相关基础知识

[2024-07-17]

7.

当下大模型的趋势以及如何学习大模型？

[2024-12-06]

8.

深度学习中的信息论：基础与优化

[2023-09-27]

9.

大模型初解，一文了解大模型

[2024-08-15]

10.

大模型在跨模态学习中的知识融合

[2024-12-20]

11. PDF

大模型及其应用研究与技术前沿



12.

AI大模型学习入门指南

[2024-10-20]

13. PDF

控制论的基础与发展



14. PDF

OpHrHHaIbHaA CTaTBA. JITexHuKa My3.

[2021-01-01]

15.

关于大模型训练常见概念讲解

[2024-12-20]

16. PDF

Zhilin Lu, Rongpeng Li et al. “Semantics-Empowered Communication: A Tutorial-cum-Survey.” ArXiv(2022).. Zhilin Lu, Rongpeng Li, Kun Lu, Xianfu Chen, Ekram Hossain, Zhifeng Zhao, Honggang Zhang.

17.

信息论在机器学习和深度学习中的应用与理解

[2024-12-13]

18. PDF

Dissecting Deep Learning Networks. Hui Fang et al.



19.

洞悉信息论：深度学习的神秘盟友. ByteZoneX社区.

[2023-09-11]

20.

信息论在人工智能中的运用

[2023-10-02]

21.

信息论在深度学习中的应用与总结

[2024-11-24]

22. PDF

KNIFE: Kernelized-Neural Differential Entropy Estimation. Georg Pichler et al.



23. PDF

On Neural Networks Fitting, Compression, and Generalization Behavior via Information-Bottleneck



24.

信息论与深度学习：深入解析相互关系

[2024-01-07]

25. PDF

Ravid Shwartz-Ziv, Naftali Tishby. “Opening the Black Box of Deep Neural Networks via Information.” ArXiv(2017).. Ravid Schwartz-Ziv, Naftali Tishby, Edmond and Lilly Safra Center for Brain Sciences, The Hebrew University of Jerusalem.

26.

R. S. Sutton, A. Barto. “Reinforcement Learning: An Introduction.” IEEE Trans. Neural Networks(1998).

27.

AI 大模型计算机科学家群英传：维纳 Cybernetics（控制论）. 禅与计算机程序设计艺术 / Zen and the Art of Computer Programming.

[2024-09-18]

28. PDF

E. Camponogara, D. Jia et al. “Distributed model predictive control.” IEEE Control Systems Magazine(2002).

29. PDF

Joost Verbraeken, Matthijs Wolting et al. “A Survey on Distributed Machine Learning.” ACM Computing Surveys (CSUR)(2019).

30. PDF

Distributed Estimation, Control and Coordination of Quadcopter Swarm Robots. Zheng Jia.

[2017-03-29]

31. PDF

Adaptive Importance Sampling for Control and Inference. H. J. Kappen et al.



32. PDF

The role of population games in the design of optimization-based controllers



33.

David Q. Mayne, J. Rawlings et al. “Constrained model predictive control: Stability and optimality.” Autom.(2000).

34. PDF

Exploring Distributed Control with the NK Model. Larry Bull et al.



35.

钱学森的系统控制论在大模型中的应用与思考

[2023-07-26]

36. PDF

Diederik P. Kingma, Jimmy Ba. “Adam: A Method for Stochastic Optimization.” CoRR(2014).

37. PDF

D. Wolpert, W. Macready. “No free lunch theorems for optimization.” IEEE Trans. Evol. Comput.(1997).

38.

John C. Duchi, Elad Hazan et al. “Adaptive Subgradient Methods for Online Learning and Stochastic Optimization.” J. Mach. Learn. Res.(2011).

39. PDF

Matthew D. Zeiler. “ADADELTA: An Adaptive Learning Rate Method.” ArXiv(2012).

40.

AI大模型学习

[2025-02-01]

41.

AI：撼动人类未来的奇迹与冒险

[2023-06-01]

42.

大模型：商业智能的未来方向

[2024-12-12]

43.

提升大模型训练效率：新型优化算法的研究与实践

[2024-08-25]

44.

PaddlePaddle/PaddleNLP 大模型套件发布 v3.0.0-beta0. PaddlePaddle.

[2024-06-28]

45.

大模型在自然语言生成中的突破. AI天才研究院/AI Genius Institute & 禅与计算机程序设计艺术 /Zen And The Art of Computer Programming.

[2024-11-16]

46. PDF

Xunyu Zhu, Jian Li et al. “A Survey on Model Compression for Large Language Models.” ArXiv(2023).. Xunyu Zhu, Jian Li, Yong Liu, Can Ma, Weiping Wang.

47. PDF

Mengwei Xu, Wangsong Yin et al. “A Survey of Resource-efficient LLM and Multimodal Foundation Models.” ArXiv(2024).. Mengwei Xu, Wangsong Yin, Dongqi Cai, Rongjie Yi, Daliang Xu, Qipeng Wang, Bingyang Wu, Yihao Zhao, Chen Yang, Shihe Wang, Qiyang Zhang, Zhenyan Lu, Li Zhang, Shangguang Wang, Yuanchun Li, Yunxin Liu, Xin Jin.

48. PDF

Jingjing Xu, Wangchunshu Zhou et al. “A Survey on Green Deep Learning.” ArXiv(2021).. Jingjing Xu, Wangchunshu Zhou, Zhiyi Fu, Hao Zhou, Lei Li.

49. PDF

LLM压缩技术研究. 张岚雪.

[2024-04-12]

50. PDF

Prakhar Ganesh, Yao Chen et al. “Compressing Large-Scale Transformer-Based Models: A Case Study on BERT.” Transactions of the Association for Computational Linguistics(2020).. Prakhar Ganesh, Yao Chen, Xin Lou, Mohammad Ali Khan, Yin Yang, Hassan Sajjad, Preslav Nakov, Deming Chen, Marianne Winslett.

51.

NeurIPS 2023 | 模型压缩与加速

[2023-12-25]

52. PDF

Jian Guo, Sai Wang et al. “Quant 4.0: Engineering Quantitative Investment with Automated, Explainable and Knowledge-driven Artificial Intelligence.” ArXiv(2022).. Jian Guo, Saizhuo Wang, Lionel M. Ni, Heung-Yeung Shum; IDEA Research & The Hong Kong University of Science and Technology (Guangzhou).

53.

ICML 2023 | 模型压缩与加速文章代码合集（39篇）

[2023-07-28]

54. PDF

AI PC行业深度研究报告. 华创证券研究所.

[2023-12-06]

55.

人工智能中的“知识蒸馏”技术详解

[2025-02-06]

56. PDF

T. Baltrušaitis, Chaitanya Ahuja et al. “Multimodal Machine Learning: A Survey and Taxonomy.” IEEE Transactions on Pattern Analysis and Machine Intelligence(2017).

57.

D. Ramachandram, Graham W. Taylor. “Deep Multimodal Learning: A Survey on Recent Advances and Trends.” IEEE Signal Processing Magazine(2017).

58.

肝了80+篇多模态机器学习（MMML）高分论文，含2023最新. 学姐带你玩AI.

[2023-11-20]

59. PDF

A. Krizhevsky, I. Sutskever et al. “ImageNet classification with deep convolutional neural networks.” Communications of the ACM(2012).

60. PDF

TYPEOriginal Research. Philippe GORCE et al.

[2024-01-01]

61.

如何优化BEV感知算法以提高其在远距离感知和复杂场景处理中的性能？

[2025-01-12]

62.

科技赋能教育创新:学习环境的变革与升级. 李艳燕等.

[2023-10]

63.

毫米波发展概况和演进趋势

[2025-01-04]

64. PDF

Discovering and Leveraging Deep Multimodal Structure for Reliable Robot Perception and Localization



65.

精彩纷呈 圆满落幕 | 多媒体技术回顾与展望论坛全程精彩回顾

[2024-11-13]

来源

脑图

大纲

内容由AI大模型生成，不能保证完全真实，请仔细甄别

\- 有人推荐研究大模型的，要深入学习「 信息论 控制论 优化 压缩 感知」，为什么？有什么资料能佐证这一点，这些前置学识是什么，相关教材又有哪些？ - 信息论在大模型训练中的应用 - 控制论与信息论的区别与联系，及其在大模型的应用 - 如何学习优化，前置知识是什么，以及在大模型训练中的应用 - 压缩跟coding theory有什么区别与联系？、 - “感知”的前置知识是什么，以及在大模型训练中的应用-秘塔AI搜索
