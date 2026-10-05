# 32. 最被低估的 AI 硬件，可能是一台 Mac Studio

发布时间：2026-07-25 14:57:22 · [原帖](https://www.xiaohongshu.com/explore/6a645e52000000001f01cfa0?xsec_token=AB1zJJ6t1v7kiL1iSS3rUQ6iuSIh-jn1NMXvadjHMXyKM=&xsec_source=pc_user) · 笔记 ID：6a645e52000000001f01cfa0

## 内容摘要

文章认为开放模型发展使本地推理的内存容量、隐私与长期成本更重要，Mac Studio 的统一内存因此有特定价值。它明确限制适用范围：低并发、敏感数据和固定工作流，并区分装得下模型与高吞吐服务，反对直接推导出云计算或 NVIDIA 将被替代。

## 帖子说明（表格原文）

“Apple 是 AI之王”。

这个判断，来自 Substack 作者 Limited Edition Jonathan 最近一篇很有争议的文章。

他的核心观点是：当前沿开放模型越来越强，真正稀缺的可能不再只是模型，而是谁能把模型安全、低成本地跑在本地。

这个判断有启发，也有明显争议。尤其是原文里“NVIDIA 已经行将就木”的说法。

所以，更值得思考的是另一件事：如果开放模型继续逼近闭源模型，Apple 的统一内存和 MacStudio，会不会成为本地大模型时代最被低估的硬件资产？

*原文参照："Apple Is the King of AI and
Nobody Knows It" - Limited Edition Jonathan, Substack, 2026-07-17;硬件规格以 Apple、NVIDIA 官方页面为准，模型性能数据来自社区与媒体测试，条件不同结果会有差异。

#WWDC26[话题]# #产品经理[话题]# #AI[话题]# #AI创业[话题]# #大模型[话题]# #AI人工智能[话题]# #科技资讯早知道[话题]# #howto用好AI[话题]# #apple[话题]# #人工智能[话题]#

## 逐图文字

### 第 01 张图

[配图](../images/32_01.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k83231mlr737k705od4llck1u1eb61082o?imageView2/format/jpg)

机器识别，未逐字校订。

```text
Apple/是 Al
之王，只是没
人意识到。
Pard
Dally
```

### 第 02 张图

[配图](../images/32_02.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k0323386mrq02005od4llck1u1eb35akd0?imageView2/format/jpg)

机器识别，未逐字校订。

```text
Mac Studio
一台机器放在桌上，体积像几叠扑克牌，
噪音比冰箱还小，插普通墙上插座。拔掉
网线，关上门，它能把 MiniMax M3、
deepseek-v4-flash 甚至是 Kimi K2.6
（编者注：部署这个模型需要需要四台设
备）这一代前沿开放模型装进本地内存，
在离线环境里跑出可交互速度。
这是一台Mac Studio。
Limited Edition Jonathan（一位在
Substack 写 AI实践框架的创作者）上
周发了一篇文章：《Apple 是AI之王，
只是没人意识到》。副标题是：NVIDIA is
a dead man walking,NVIDIA 已经行将
就木（截止到我们写作这篇文章时，原文
已有近2k的点赞）。
```

### 第 03 张图

[配图](../images/32_03.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k83231mlr737k805od4llck1u1eb88pjh0?imageView2/format/jpg)

机器识别，未逐字校订。

```text
在这儿，我们的判断是：NVIDIA 将死这
个结论莫过有些过度外推；然而，Apple
硬件被低估这件事，值得认真思考。
这篇文章的价值不在预测最终的赢家，而
在重新设定问题：如果前沿开放模型持续
逼近顶尖闭源模型，真正稀缺的东西会从
模型本身转向哪里？
```

### 第 04 张图

[配图](../images/32_04.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k83231mlr737k8g5od4llck1u1ee7pa7so?imageView2/format/jpg)

机器识别，未逐字校订。

```text
问题不再只是「谁的模型最强」
今天市场衡量AI 胜负，主要看两件事：
（a）谁有最强模型，（b）谁卖训练模型
的芯片。按这套评价体系，NVIDIA 无懈
可击。
但这套计分板明显偏向训练。训练是少数
公司一年做几次的资本密集活动；推理才
是每天发生几十亿次的使用场景。
模型一旦足够便宜、足够开放，问题就会
变成：它们具体跑在哪里，谁控制运行环
境，谁承担数据风险，谁支付长期电费和
硬件账单。
文章就此提问：当模型变得免费之后，它
们运行在谁的硬件上？
```

### 第 05 张图

[配图](../images/32_05.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k83231mlr737k905od4llck1u1e6h0qpv8?imageView2/format/jpg)

机器识别，未逐字校订。

```text
这个问题现在才开始被大家真正注意到，
因为开放权重模型开始形成固定节律。
Qwen、DeepSeek、GLM、MiniMax、
Kimi 一代接一代往前推，发布间隔缩
短，性能不断迫近前沿。客户如果知道再
等几周就会出现更强、更便宜、还能自己
部署的模型，闭源模型本身的溢价就会大
幅度下降。
因此价值会从模型本身迁到：硬件、数
据、权限、工作流，以及运行这些模型的
地方。
```

### 第 06 张图

[配图](../images/32_06.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k83231mlr737k9g5od4llck1u1eetj4i20?imageView2/format/jpg)

机器识别，未逐字校订。

```text
大模型先卡在内存里
原文中提到最重要的技术判断是：万亿参
数模型首先是一道内存题。
像 Kimi、GLM、MiniMax
这类混合专家
模型，总参数很大，但每生成一个 token
只激活一部分。算力消耗没有参数量看上
去那么夸张，麻烦在于全部权重都要待在
内存里，等着随时被调用。
瓶颈不是 FLOPS（每秒能做多少次计
算），是 bytes（内存里能放下多少数
据）。
```

### 第 07 张图

[配图](../images/32_07.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k83231mlr737ka05od4llck1u1ekeq8l58?imageView2/format/jpg)

机器识别，未逐字校订。

```text
这将改变硬件排序。NVIDIA 的工作站卡
RTX PRO 6000 Blackwell，显存
96GB；GLM-5.2的 4-bit 量化版约
467GB。单卡无法容纳，问题还没走到速
度，先卡在容量。
Apple 的答案是统一内存。CPU 和 GPU
共享同一个大池子，Mac Studio 曾经可
以配到 512GB。再加上MLX框架和社区
量化生态，它变成一种特殊机器：未必最
快，但能把很多工作站显卡装不下的模型
放进本地内存。
这就是 Apple 被低估的地方。过去统一
内存主要服务视频剪辑和创作者工作流；
开放模型变强后，它摇身一变，成了AI
资产。
```

### 第 08 张图

[配图](../images/32_08.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k83231mlr737kag5od4llck1u1eklbn51g?imageView2/format/jpg)

机器识别，未逐字校订。

```text
然而，Apple 赢的是容量，也不是所有指
标。五张 NVIDIA 卡的总带宽和并发能力
远高于一台 Mac Studio。单机能装下，
不代表速度最快，也不代表能服务几千个
用户。
```

### 第 09 张图

[配图](../images/32_09.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k83231mlr737kb05od4llck1u1ehntvhfo?imageView2/format/jpg)

机器识别，未逐字校订。

```text
然而只在某些场景里成立
作者说：要用工作站卡凑出512GB 显
存，需要五到六张 RTX PRO 6000，整
机6万到7.5万美元，满载接近3千
瓦。Mac Studio 大约9,500 美元，功耗
两三百瓦。
于是，他得到一个结论：同样的内存容
量，六分之一的价格，十分之一的电。
这句话成立于特定前提——比较对象是
「本地装下大模型」。如果比较并发、带
宽、吞吐和企业级服务能力，那几张
GPU 提供的价值远不止容量。一台服务
两个人的机器，不能直接和一台服务两百
个人的机器比电费。
```

### 第 10 张图

[配图](../images/32_10.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k83231mlr737kbg5od4llck1u1e4fpt2ho?imageView2/format/jpg)

机器识别，未逐字校订。

```text
但把场景缩小，它依然有意义。律所、科
室、研究组、金融团队、政府部门，需求
往往是低并发、高敏感、长期使用。它们
未必需要数据中心级吞吐，却需要一台绝
对不会把数据送出房间的机器。
此时 Mac Studio 的价值浮现：用一次性
硬件投入，替代持续上涨的API账单，也
替代对外部数据保留政策的信任成本。
```

### 第 11 张图

[配图](../images/32_11.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k83231mlr737kc05od4llck1u1eppnuha0?imageView2/format/jpg)

机器识别，未逐字校订。

```text
几台 Mac 被连在了一起
文章里最有画面的细节，是 Apple 阵营
的集群方式。
NVIDIA 的高速卡间互联主要留在服务器
机房里，配 HGX托盘、交换机、光模块
和工程师…•相比较，Apple 这边，社
区正在用 Thunderbolt 5、MLX 和 EXO
把几台 Mac串起来，共同跑更大的模
型。
几台 Mac、几根线，跑起万亿参数模
型。它不能替代企业级数据中心，但说明
本地大模型硬件正在从极客实验进入真实
品类。
```

### 第 12 张图

[配图](../images/32_12.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k83231mlr737kcg5od4llck1u1eklk4fr8?imageView2/format/jpg)

机器识别，未逐字校订。

```text
这里最容易误读。能交互，不等于能服
务。每秒 25 token 对一个人够用，对消
费级 AI产品远远不够。Apple 打开的不
是云的终结，而是一条更窄但更稳的路
线：小规模、私密、本地、可控。
```

### 第 13 张图

[配图](../images/32_13.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k83231mlr737kd05od4llck1u1el6gder8?imageView2/format/jpg)

机器识别，未逐字校订。

```text
连 Apple 也没有押注单一路线
如果本地推理会吃掉一切，Apple 最该押
上全部筹码。
它没有。
Apple Intelligence（2026）从一开始就
是混合架构：简单任务在端侧，更复杂的
请求交给 Private Cloud Compute；后来
部分云端能力也扩展到使用 NVIDIA GPU
的基础设施上。Apple 自己的路线是计算
分层。
```

### 第 14 张图

[配图](../images/32_14.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k83231mlr737kdg5od4llck1u1e3lb2us0?imageView2/format/jpg)

机器识别，未逐字校订。

```text
供应链也限制了这个故事的上限。高容量
Mac Studio配置一度下架，背后可能涉
及内存价格和供给。依赖大容量统一内存
的路线，会被内存产能和产品供货节奏约
束。买不到的优势，不能直接变成企业部
署方案。
更准确的判断是：端侧处理低延迟和个人
上下文，本地设备处理敏感数据和固定工
作流，云端处理高并发、超大模型和持续
升级。
```

### 第 15 张图

[配图](../images/32_15.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k03231mmi0anu005od4llck1u1euq6jkpg?imageView2/format/jpg)

机器识别，未逐字校订。

```text
NVIDIA 也看见了这条路
全文最有说服力的证据，来自 NVIDIA 自
己的产品线。
DGX Spark 是黄仁勋口中的桌面个人 AI
超级计算机：安静的小盒子，CPU 和
GPU 共享 128GB统一内存。一家靠独立
GPU、独立显存和机房集群建立帝国的公
司，也开始做桌面统一内存设备。
本地、桌面、大内存的AI设备，已经从
论坛玩法变成两家巨头同时下注的巨大潜
在市场。NVIDIA 不会像文章说的那样
「行将就木」。更可能的情况是，它一边
在机房里继续卖GB200，一边在桌面上
卖 Spark。
```

### 第 16 张图

[配图](../images/32_16.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k03231mmi0anu0g5od4llck1u1e7vhohag?imageView2/format/jpg)

机器识别，未逐字校订。

```text
最后
文章的最大问题不在单个数字的论证，大
部分规格和价格都能找到出处。问题在于
论证链条拉得太长：开放模型越来越强，
所以本地推理会变重要；大模型需要大内
存，所以 Apple的统一内存会变值钱。
这两步很扎实。
再往后推到「推理从云迁移到本地」「数
据中心需求下降」「NVIDIA 估值失去基
础」，中间还差很多假设。
把标题补充一些，它便成立：
Apple 可能是本地大模型硬件里最被低估
的公司。开放权重模型越强，这个优势越
值钱。本地推理会成为重要分层，但不会
消灭云推理，更不会消灭 NVIDIA。
```

### 第 17 张图

[配图](../images/32_17.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k03231mmi0anu105od4llck1u1e9qtpvi8?imageView2/format/jpg)

机器识别，未逐字校订。

```text
最后留下原文里的原话：世界上最私密的
推理，就是那个从未离开过你房间的请
求。
对医疗、法律、金融、政府，以及任何把
数据当核心资产的组织来说，这不是附加
功能。
这是产品本身。
参考原文："Apple ls the King of Al and
Nobody Knows It" — Limited Edition
Jonathan, Substack, 2026-07-17；
硬件规格以 Apple、NVIDIA 官方页面为
准，模型性能数据来自社区与媒体测试，
条件不同结果会有差异；完整逐句解析稿
参考 Paradaily.com
```

