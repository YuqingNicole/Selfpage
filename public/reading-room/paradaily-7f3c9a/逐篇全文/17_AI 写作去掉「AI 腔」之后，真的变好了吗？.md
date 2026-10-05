# 17. AI 写作去掉「AI 腔」之后，真的变好了吗？

发布时间：2026-08-27 15:41:51 · [原帖](https://www.xiaohongshu.com/explore/6a8fea3f000000000400afe2?xsec_token=ABWf6hzBLAOYPbz6TbFosDTLyqlnAfJGUT8OF_05lruuA=&xsec_source=pc_user) · 笔记 ID：6a8fea3f000000000400afe2

## 内容摘要

Deft 尝试通过分布微调减少 AI 写作的重复套路，但测试显示句式多样不等于文章清晰，也不能保证事实忠实。文章据此提出更实用的写作工具标准：理解读者的认知状态、保留已确认的事实、支持局部修改，并减少作者达到可发布状态所需的工作。

## 帖子说明（表格原文）

AI 终于不像 AI 了，然后呢？

最近 Every 测试了一个专门改善 AI 写作的新模型 Deft。它确实减少了很多常见的「AI 腔」，但也暴露了一个更深的问题：去掉 AI 套话，不等于让它学会写作。

不像 AI，只是第一步。真正的写作问题，才刚刚开始。

#大模型训练[话题]# #howto用好AI[话题]# #AI创业[话题]# #ParaDaily[话题]#  #人工智能[话题]# #创业[话题]# #00后[话题]# #howto找AI学审美[话题]# #风险投资[话题]# #LLM[话题]#
@科技薯

## 逐图文字

### 第 01 张图

[配图](../images/17_01.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k8324c82gr5nu705od4llck1u1ejsg22c0?imageView2/format/jpg)

已核对封面主标题。背景为有遮挡与手写批注的英文稿件，未将其作为文章正文；原始 OCR 保留在 JSON 中。

```text
ParaDaily
消灭了AI味，然后呢？
"When AI Stops Sounding Like AI"
```

### 第 02 张图

[配图](../images/17_02.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k8324c82gr5nu7g5od4llck1u1e0tkoe40?imageView2/format/jpg)

机器识别，未逐字校订。

```text
Al终于不像AI了，然后呢？
我想你肯定见过那种AI写作。
单看一篇，好像没什么问题：结构完整、语气
稳妥、观点清楚，甚至还会大笔一挥，在段尾
点上一句看起来颇有道理的「金句」。
但当你连续读到第十篇、第二十篇时，那种熟
悉的塑料感就会慢慢浮出来：相似的开头，相
似的转折，相似的排比，相似的“不是X，而
是Y”。
问题是，AI写作真的仅仅只是「文风不好」
吗？还是说，这种趋同本身就是模型训练出来
的结果？
```

### 第 03 张图

[配图](../images/17_03.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k8324c82gr5nu805od4llck1u1euplkah8?imageView2/format/jpg)

机器识别，未逐字校订。

```text
最近 Every 测试了一个很特别的新模型 Deft。
它背后的实验室认为，今天AI 文章之所以越来
越趋同乏味，是一个分布问题：模型在大量生
成文本时，会不断回到少数最安全、最稳定、
也最容易获得奖励的表达模式。
Every原文头图：随机鹦鹉
Deft 想做的事情，就是从后训练阶段改变这种
分布，让AI写出来的东西不再那么可预测。结
果，这个新模型确实没那么像AI了，但这不一
定意味着它写得更好了—事实却正相反。
```

### 第 04 张图

[配图](../images/17_04.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k8324c82gr5nu8g5od4llck1u1ej959n4o?imageView2/format/jpg)

机器识别，未逐字校订。

```text
Al 腔是一种分布问题
所谓“分布问题”，说白了，就是模型连续写
很多篇文章时，会不会反复落回同一套短语、
句式和段落节奏。
我们假设有100个学生参加作文考试，老师逐
篇阅卷。每篇文章结构完整、语法正确、论点
清楚，于是几乎所有人都拿到了80分。从单
篇评价来看，这个班没什么问题。
但如果把100篇作文一起看，你可能会发现：
90篇都以“随着时代的发展…•”开头，80
篇都是“首先、其次、最后”，70篇结尾都是
“综上所述，我们应该…•”每一篇单独看都
能拿到80分，但整个班只会一种写法。
```

### 第 05 张图

[配图](../images/17_05.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k8324c82gr5nu905od4llck1u1ej38h5k8?imageView2/format/jpg)

机器识别，未逐字校订。

```text
这就是Deft想解决的问题。传统微调通常一次
只评价一条回答：这一篇是不是清楚？是不是
安全？是不是完整？是不是让人满意？
问题是，如果模型总是偏向那些最容易被打高
分的回答，它就会慢慢学会一套“高分作文模
板”。清晰的结构、完整的论证、安全的措
辞、明确的总结、“不是…••而是…..” 句
式，这些表达都很容易获得稳定偏好。
优秀的人类作者也会使用三段式、反转和短
句。问题在于，当一种表达方式不再由內容和
语境触发，而只是因为模型在训练之后反复展
现对某一特定表达的偏好，它就从风格变成了
令人厌烦的口癖。
AI写作一个很奇怪的地方就在这里：模型拥有
极其庞大的知识和內容空间，实际调用的表达
空间却可能比我们想象的还要狭窄。
Paro
```

### 第 06 张图

[配图](../images/17_06.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k8324c82gr5nu9g5od4llck1u1e9khb4u0?imageView2/format/jpg)

含软件截图或嵌入文本，OCR 可能混合截图文字与文章说明；请结合原图阅读。

```text
但不写套话，不等于会写作
DEFT
GENERATE
FASTER
Input the text to rewrite
editorial state inside the writing
euvionmentlaeao use,ratner tana
sequence of isolated full-document calls.
Disuribuuon Tine-uunina is worth watchina.
Deft has identified a genuine limitation in
now wiung wodels are tanco, and t
interace asks oetter auestions than most
chat boxes. But I would skip the current
product Tor reported analvuical, Dersonal
of ounelwise soulce dependent work.
Low-sldkts cosy sd sale slace
SAPSTWUSHG
so Tar. Delt has made the stochastid
parrot more stochastic. /'m still Waiting for
Ito pecome a peuer eoiol
workina on vour reauest
ADVANCED
Deft 的写作控制台，图中模型被设置为 Rewrite 和 More Human 模式，用于
将已有的AI文本改写得更接近人类写作」在內的不同写作风格
Deft 的技术思路叫 Distribution Fine-Tuning，
单说就是：训练模型时，不只评价每一篇输出
是否“合格”，还要评价一批输出放在一起是
否足够多样。
简
```

### 第 07 张图

[配图](../images/17_07.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k8324c82gr5nua05od4llck1u1efshhg0g?imageView2/format/jpg)

机器识别，未逐字校订。

```text
这样训练出来的模型，理论上可以减少重复套
路，写出更宽的表达范围。这个方向很重要，
因为它说明「AI腔」不是一种无法描述的审美
感觉，而是可以被观察、被测量、被训练的问
题。
但这里也埋下了一个更关键的问题：更接近人
类写作的整体分布，和单篇文章写得更好，并
不是同一件事。
说回作文例子。发现90个学生都用“随着时代
的发展…”开头以后，当然可以要求他们下
次不要这么写。但这最多只能解决“太趋同”
的问题。
有人可能因此写出很漂亮的新开头，也有人可
能为了避免俗套，硬写出一句更加拧巴的话。
```

### 第 08 张图

[配图](../images/17_08.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k8324c82gr5nuag5od4llck1u1e5sm7c70?imageView2/format/jpg)

机器识别，未逐字校订。

```text
不像AI了，但也更难读了
Every 的测试里，Deft被要求写两类文章：一
篇关于 Al 如何影响就业的分析文章，一篇关于
如何制定AI 写作风格指南的SEO 文章。
结果是，在句子层面，Deft 的文字确实更有变
化，也更令人“意外”。但与此同时，它也更
稠密、更难读，信息排列也更差。
有些表达甚至非常混乱，比如“由互为同义词
的词语选择构成的词汇表”、“优秀示例的示
例”这种句子。它们确实不像标准AI 文案，但
也远不能称得上好的表达。
```

### 第 09 张图

[配图](../images/17_09.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k8324c82gr5nub05od4llck1u1e7oaq068?imageView2/format/jpg)

含软件截图或嵌入文本，OCR 可能混合截图文字与文章说明；请结合原图阅读。

```text
Generate your own long-lasting Al-ready writing companion that sounds like
you. Designed for beginning to mid-level writers who want to switch gears
without burning out, this is your guide to how to create a style guide to get Al to
write like you.
Know what it's like when Al creates for you: it can sound awfully generic, drift
in tone, or overuse certain phrases. So, what does "writing like you" really mean？
It means that your voice as a writer has five core aspects. It has a tone and
structure that feels authentic to your style. It has a rhythm and pace that feels
natural, It has a vocabulary of word choices that are synonyms and familiar to
your readers. It has a list of dos and don'ts that make your message clear and
uniquely you.That's a lot to keep in mind for every write. With a prompt
companion， "writing like you" is easy. Ir'sa living document you build in plain
Ianguage. It maps the five core aspects of your voice into sections. Each section
includes specific rules, examples of great examples, and how to know when it's
working： "Writing like you" is also how your non-negotiables get included. It's
the one place to hold up a mirror and say， "This is who l am as a writer" Here is
the full roadmap to create a guide that is detailed enough to guide Al and yet
fluid enough to work for your evolving brand. "Writing like you" starts with
outcomes, not aesthetics.
如图，Deft 生成的一篇关于 AI Style Guide 的SEO 文章。截图里能直接看到
作者所说的密集和奇怪表达，例如“a vocabulary of word choices”
这就是整个实验第一次真正出现矛盾的地方。
Deft 想优化的是 unusual：让模型不要永远回到
最常见的语言结构。
低概率表达，并不天然引出更好的表达。把模
型推离那些清晰、安全、稳定的表达区域之
后，获得的既可能是新鲜语言，也可能只是糟
糕语言。
```

### 第 10 张图

[配图](../images/17_10.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k8324c82gr5nubg5od4llck1u1e6oa7o20?imageView2/format/jpg)

机器识别，未逐字校订。

```text
换句话说，降低可预测性是一个明确的优化目
标，但写作质量本身，远不只是“不要重
复”。
降低可预测性是一个明确的优化目标，然而，
当涉及到写作质量本身，却连创建一个合适的
评估标准都非常困难，更别说去优化它了。
强行去掉 AI味，不代表自动显露出人味。中间
还隔着一个更难的问题：判断。
```

### 第 11 张图

[配图](../images/17_11.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k8324c82gr5nuc05od4llck1u1ee7msm80?imageView2/format/jpg)

机器识别，未逐字校订。

```text
真正危险的是它写得太顺
Deft 在strict模式下也出了问题。测试者给了它
详细 brief，里面包含主要观点和资料来源；模
型承诺只使用prompt 里提供的信息。
但 Deft 还是自行加入了原材料里没有的內容，
比如劳动者可能会被经理、工会或公司控股股
东推动着使用AI平台。
这就不再是文风问题，而是事实控制问题。一
个写作模型可以拥有很丰富的句式，但如果它
无法区分“语言上的创造自由” 和“事实上的
创造自由”，它就很难进入真正高可信的专业
写作工作流。
对媒体、研究、商业分析来说，一个能把文章
写得更漂亮的模型并非刚需。
```

### 第 12 张图

[配图](../images/17_12.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k8324c82gr5nucg5od4llck1u1e6t1mb0g?imageView2/format/jpg)

含软件截图或嵌入文本，OCR 可能混合截图文字与文章说明；请结合原图阅读。

```text
真正危险的是：模型为了让文章显得完整，会
非常自然地补足原材料里不存在的因果关系、
人物动机甚至事实细节，即使模型承诺在这个
模式 （Strict）下，不会补充任何除了 prompt
里明确提到的 evidence。
Use $deft-compound-writing to turn the notes in this folder on Tempo into a draft
Worked for 15m 40s
Deft failed twice, returning drafting instructions instead of an essay. Per the Deft Compound Writing safeguards，
Istopped before another billed retry. The two calls cost $0.29 total, and no bogus draft was saved.
Would you like one more Deft attempt using its highest-quality "human" tier, or should I finish the draft with
Codex from the locked outline？
Edited .deft-tempo-first-pass.md
+89 -89
Undo P
Review
try deft at high-quality
Codex 尝试调用DeftAPI，但多次调用没有成功完成作者预期的任务
```

### 第 13 张图

[配图](../images/17_13.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k8324c82gr5nud05od4llck1u1eqe5ead0?imageView2/format/jpg)

机器识别，未逐字校订。

```text
写作不是一次生成完整文章
Deft 还有一个问题：它更像一个“完整文档生
成器”，而不是一个真正的写作搭档。它的工
作方式更接近：你给它一个 brief，它返回一整
块写完的文本。
但真正的写作很少是这样发生的。真实写作通
常不是从 brief 一步跳到 finished draft，而是不
断来回：保留某些句子，重写某些段落，移动
结构，核对事实，冻结已经确认的信息，只修
改中间一小段过波。
一个真正可用的AI写作工具，应该能理解文本
内部有不同状态：有些事实来自 source，不能
改；有些观点可以重新表达，但不能改变命
题；有些结构可以移动；有些例子可以自由发
挥。
```

### 第 14 张图

[配图](../images/17_14.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k8324c82gr5nudg5od4llck1u1eg63rjag?imageView2/format/jpg)

机器识别，未逐字校订。

```text
如果每次要求局部修改，模型都重新采样整篇
文章，就等于不断破坏已经完成的工作。成熟
的AI写作工具，可能不应该每次都最大化生
成，而应该尽量最小化修改。
这也是为什么“更像人”不一定是最好的产品
指标。真正重要的指标可能更朴素：从模型开
始工作，到文章可以发布，中间还需要多少分
钟？作者还需要改多少？系统会不会偷偷替
换、修改已经确认过的事实？
```

### 第 15 张图

[配图](../images/17_15.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k0324c83uqnna005od4llck1u1en0c7lr8?imageView2/format/jpg)

机器识别，未逐字校订。

```text
好写作是更好的判断
Deft 暴露出的核心问题是：好写作不只是改变
句法。好的写作会引导注意力。
优秀的作者知道什么时候一个术语需要解释，
什么时候证据需要补充背景，什么时候该推
进，什么时候应该把一个抽象概念放到具体例
子后面，而不是先用类比。
A1 很擅长生成“下一句话最可能是什么”，但
真正的写作场景更像是在不断判断：为了让一
个具体读者在读到这里时获得正确的信息和感
受，我现在应该说什么？
一个词是否高级，一个句子是否罕见，其实都
只是局部判断。真正的文章需要持续维护一个
更宏观的状态。
```

### 第 16 张图

[配图](../images/17_16.webp) · [来源图片](https://sns-img-bd.xhscdn.com/notes_pre_post/1040g3k0324c83uqnna0g5od4llck1u1e2t1r06g?imageView2/format/jpg)

机器识别，未逐字校订。

```text
所以，好写作的基本单位，或许根本不是一句
话，而是读者不断变化的认知状态。
AI 腔也不一定来自某个具体句式本身。“不
是……而是……”没有错，三段式没有错，短
句也没有错。真正的问题是：模型在没有足够
理由的时候，依然反复选择这些看似高效的句
式。
Deft 证明了一件很重要的事情：AI写作里的
sameness，确实可以被训练改变。但它也无意
间证明了另一件事：当一个模型终于不再那么
像Al，我们才更清楚地发现，真正的写作从来
不是产生足够多不同的句子。
DFT 让鹦鹉学会了更多唱法。在模型真正理解
音乐之前，先把谱子写清楚，或许是现在的创
作者最现实的办法。
```

