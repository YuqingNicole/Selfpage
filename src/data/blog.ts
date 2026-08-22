import type { BlogPost } from '@/types/blog';
import { photographerInfo } from './photographer';

const nicoleAvatar = 'https://substackcdn.com/image/fetch/w_80,h_80,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F481e7d79-a645-405a-84c3-a4897160d3f3_474x474.jpeg';

export const blogPosts: BlogPost[] = [
  {
    id: '9',
    title: '从交易资产到创造博弈场：链上交易的新范式',
    slug: 'private-information-market-game',
    excerpt: '我真正感兴趣的可能不是把传统资产搬上链，而是把信息不对称本身设计成一种可交易、可博弈、可结算的市场机制。',
    content: `最近在想 Encore 的 Privacy trade，突然发现自己一直被同一类东西吸引：一级投资、暗拍、囚徒困境，以及 Hyperliquid 的 HIP-3。

它们表面上属于不同领域，但底层都不是“价格预测”，而是参与者在看不见完整信息的情况下，根据对手行为下注，并让自己的行动继续影响下一轮博弈。

Hyperliquid 真正有意思的地方，也许不是把外汇等传统金融资产搬到链上，而是找到了新的奇点：HIP-3 让任何人都可以在 Hyperliquid 上开一家永续合约小交易所。它创造的是新的市场结构，而不只是新的结算媒介。

## 把 startup 上链，不只是 tokenization

一个初创公司如果想融资，可以在平台上质押一笔保证金，公开招股书、产品和经营资料，让投资人提交自己的估值、投资金额和 allocation 要求。

市场前期可以不断博弈；临近结束时进入锁定期，订单只能进不能出；最后按照预先定义的规则，选择可执行、对 startup 综合效用最高的融资方案。

这个机制真正显性的，是一级市场里原本隐藏的东西：

- 投资人愿意在什么 valuation 下下注；
- 市场真实的价格分布是什么；
- Founder 所说的“已经有很多 interest”有多少是真的；
- 投资人如何在看不到其他人报价的情况下竞争 allocation。

它更像 primary-market order book、sealed-bid auction 和 PvP information game 的结合。

当然，“对 startup 最有利”不能简单等于估值最高。还需要同时考虑资金是否已验证、投资人是否履约、融资金额、稀释程度、锁定期和条款复杂度。否则市场奖励的可能只是最激进的报价，而不是最可靠的资本。

## 我为什么对 Prisoner’s Dilemma 着迷

我刚学计算机时做过一个囚徒困境小游戏。四个角色有四种策略：Cooperator 无条件合作，Cheater 无条件背叛，Grudger 被背叛一次后永不合作，Tit for Tat 则复制对方上一轮的行为。

有趣的地方在于，玩家永远无法看穿对手，只能观察、预判，然后更新自己的策略。自己的选择又会继续改变别人的下一手。

如果把它放进交易游戏里，Cheater 可以是无条件砸盘的主力，Cooperator 持续维护趋势，Tit for Tat 根据上一轮市场行为调整，Grudger 则在第一次背叛后永久改变策略。十几个人一组，每个人的身份和策略都不完全公开，市场价格就不再只是资产价值的表达，而是参与者互相判断的结果。

## 隐私不是附加功能

如果所有订单、身份和策略都完全公开，博弈很快就会消失。Privacy 在这里不是一个外挂式的隐私层，而是游戏成立的前提条件：

- 隐藏个人订单，只显示聚合需求；
- 隐藏玩家身份和策略；
- 在结算后揭示部分历史行为；
- 用承诺机制证明报价没有被事后修改。

隐私保留了不确定性，而可信结算保证不确定性不会变成欺诈。

## 从暗拍回看自己的兴趣

我的第二桶金来自暗拍。每个买家只能提交一次最高报价，看不到其他人的出价，截止后统一开标。买入时，我曾经因为信息差相对行价赚到很多；但卖出时因为阅历不够，也被坑掉了很多利润。

回头看，一级投资、暗拍和这些交易游戏对我的吸引力是同一个东西：我喜欢的可能不是交易某个资产，而是设计参与者在信息不对称下如何行动的规则。

所以更底层的方向也许不是“startup 上链”，而是：

> **为信息不对称的高价值决策，设计可玩的市场机制。**

先做信息不对称的策略游戏，再做虚拟 startup 融资市场，最后才考虑真实资金、隐私证明和链上股权。正确的问题不是“能不能把传统金融搬上链”，而是：能不能找到一个新的奇点，让原本隐藏的博弈变成一个可参与、可观察、可结算的市场。`,
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
    category: 'thinking',
    tags: ['privacy', 'crypto', 'market design', 'game theory'],
    publishedAt: '2026-08-22',
    readingTime: '8 min read',
    substackUrl: '',
    author: { name: 'Nicole', avatar: nicoleAvatar },
  },
  {
    id: '8',
    title: 'Jeff Dean 谈 AI 创业：去做模型成功率只有 1% 的问题',
    slug: 'jeff-dean-1-percent-rule',
    excerpt: 'Jeff Dean 这场访谈真正值得反复想的，不是某个模型预测，而是一个更根本的判断：不要去做模型已经会 20% 的问题，而要去找那些通用模型现在成功率只有 0% 到 1% 的问题。',
    content: `最近看了 YC 对 Google 首席科学家 Jeff Dean 的一场访谈。

这场访谈有意思的地方，不在于又抛出几个新概念，而在于 Jeff Dean 仍然是那种很少被表面热度带着走的人。别人谈 AI，容易谈产品爆发、模型能力、Agent 幻觉；他谈的还是系统、约束、选题、硬件，以及一个更本质的问题：当执行越来越自动化之后，人到底应该把判断力放在哪里。

如果只抽一条我觉得最值得创业者反复想的判断，大概是这句：

不要去做模型已经能做 20% 的问题，而要去找那些通用模型现在成功率只有 0% 到 1% 的问题。

这其实比很多“AI 创业方法论”都更直接。

## 一

去年 Jeff Dean 曾判断，AI 会很快具备 junior engineer 的能力。

现在回头看，这个判断基本已经兑现，至少在 coding 相关任务上是这样。尤其是 agent 化之后，模型在较长链路任务中的表现比一年前成熟了很多：会拆子问题，会调工具，也能在一定范围内持续推进。

但 Jeff Dean 真正感兴趣的，并不只是“AI 已经像一个初级工程师”这件事。

他更看重下一步：让系统自己跑实验、自己优化、自己迭代。

他提到，到了 2027 年，可能会看到更多面向 ML 系统本身的自动化——不是简单回答问题，而是围绕一个可度量目标，把问题拆解成更小的子问题，在紧密的实验闭环里不断尝试，再把结果重新组合成更好的系统。

这背后的意义，不只在机器学习领域。

只要一个问题能被定义目标、被评估结果，它原则上就可以被放进这样的自动循环里。科学研究、工程优化、模型设计，甚至很多原本依赖人工推进的复杂工作，都可能因此发生变化。

也就是说，AI 的下一阶段，未必只是“生成质量更高”，而是越来越像一个能持续推进问题的系统。

## 二

Jeff Dean 这类人的一个特点是，他总会把问题重新拉回到底层约束。

今天很多人谈 AI，容易把一切都归结为模型还不够强。但 Jeff Dean 会提醒你，很多看起来像“模型问题”的东西，本质上其实是系统问题。

比如他提到一个很典型的事实：计算本身的能耗可能很低，但数据搬运的成本却高得多。从 HBM 搬一次数据，代价可能比一次计算贵几个数量级。

这个视角很重要，因为它直接影响你怎么理解未来机会。

如果真正的瓶颈不只在训练，而在推理成本、延迟、数据移动和系统结构，那么下一阶段最值得关注的就不只是模型本身，而是 Inference，以及围绕 inference 展开的硬件和系统优化。

这也是他为什么重新谈到 TPU。

TPU 并不是为了某个具体模型定制的芯片，它抓住的是一个更稳定的东西：现代机器学习的核心计算，本质上是大规模线性代数。你不需要知道未来一定会出现 Transformer，才知道如果一块芯片能特别高效地处理低精度稠密线性代数，它就会对机器学习非常重要。

这个判断其实也很像创业里的“抓底层不抓表层”。

表层产品会变，模型架构会变，热点会变，但如果你抓住的是更深的约束，很多变化反而是在帮你验证原来的方向。

## 三

访谈里还有一个我很喜欢的部分，是他谈“怎样真正把 AI 用起来”。

他的建议其实并不花哨：拿模型、harness 和工具去真实地解问题，然后观察它到底在哪里失败。

关键在后半句。

不是把模型当成一个神奇黑盒，也不是一旦失败就简单归因为“不够聪明”。而是把失败当成一种信号：它缺什么信息？缺什么步骤？缺什么工具？缺什么约束？

然后你就可以继续补。

Jeff Dean 给出的方式是写 skills，给更清楚的指引，让模型知道遇到某一类问题时应该怎么调用工具、按什么顺序做事、怎么验证结果。

这个思路我很认同，因为它把“用 AI”这件事从一次性问答，变成了持续搭建外部结构。

模型本身是一层能力，但要让它真正可用，你还需要给它工作流、工具接口、验证机制和上下文。很多时候，AI 的上限不只是模型决定的，也是你是否把周围环境组织得足够好决定的。

从这个角度看，真正会用 AI 的人，并不只是更会写 prompt，而是更擅长把自己的经验、流程和判断路径，翻译成模型能利用的形式。

## 四

谈到 agent，Jeff Dean 也给了一个很克制但很现实的判断。

现在大家都知道，agent 在短任务里常常表现不错，但任务一长，尤其到了几十步之后，就很容易开始漂移。Jeff Dean 的解释很朴素：模型一旦离开自己熟悉的分布，表现就会下降。

这和大多数机器学习系统没有本质区别。

它在训练中见过的事做得比较稳；一旦进入经验较少的区域，错误就会积累，越走越偏。

所以解决办法也不是神话式的。

一类方法是尽量给它更明确的 skills 和提示，把它留在更清晰、更“亮”的路径上。另一类方法则是多 agent 并行：让多个 agent 试不同解法，再筛掉那些已经脱轨的，只保留更有希望的路径。

这本质上是在做搜索。

也就是说，很多时候提升 agent 可靠性，并不只是靠“更强的模型”，而是靠更好的结构、更多推理期算力和更明确的评估机制。

## 五

如果说整场访谈里有一个最适合创业者带走的判断，我觉得就是 Jeff Dean 的“1% 法则”。

他的意思很简单：在选择问题时，要认真测试当前通用模型在这个领域已经能做到什么程度。

如果它已经能做 20%，这不一定是好消息。因为这往往意味着，随着更多数据、更大规模和更好的工程优化，通用模型在半年到一年内就可能继续明显进步。

真正更值得注意的，反而是那些现在的通用模型几乎做不到、成功率接近 0% 或 1% 的问题。

这是一个很反直觉、但非常清醒的标准。

因为太多人做 AI 应用时，喜欢站在模型能力边缘，拿模型刚刚会一点点的能力去包装产品。短期看很性感，长期看却很危险——因为一旦底层模型能力抬升，这层价值就可能迅速变薄。

相反，真正耐久的机会，往往藏在那些通用模型还很不擅长，但某个垂直场景通过专属数据、精心设计的交互、领域 workflow、专用 skills 或专用模型，能够把结果拉开很大差距的地方。

Jeff Dean 并没有把这件事说得很玄。他只是提醒：别做那些模型自然会吃掉的事。

## 六

如果未来每个人都能管理几十个、上百个 agent，代码也越来越多由 agent 完成，那么什么能力会变得最稀缺？

Jeff Dean 的回答是：对“该让 agent 做什么”拥有极高的品味。

我觉得这个说法非常准确。

因为当执行能力变便宜之后，真正拉开差距的往往不是执行本身，而是问题定义、目标设定、约束设计和优先级判断。

这其实和研究很像。研究者当然需要方法、工具和技巧，但真正决定上限的，经常不是“怎么做”，而是“为什么做这个”“为什么现在做这个”“为什么这件事值得花时间”。

如果问题选得对，哪怕过程并不完美，也可能产生很有价值的结果。反过来，如果问题本身平庸，那么再高效的执行，也只是把一件不重要的事做得更快。

所以某种意义上，AI 并没有消灭人的价值，反而把一些原本被执行细节掩盖的能力，重新暴露出来了。

## 七

Jeff Dean 还有一个习惯我很喜欢：定期重新检查那些被默认接受的假设。

他举了一个思想实验：如果未来的晶体管变得不那么可靠，系统应该怎么设计？听起来很偏、很怪，甚至不一定真的会发生，但这种问题的价值就在于，它逼你从更底层重新审视设计空间。

很多人做事容易沿着现有路径不停优化，但真正大的变化，常常来自对前提条件的重新提问。

过去五十年形成的工程常识，大多有其合理性；但正因为如此，偶尔停下来怀疑它们，反而变得更重要。

这也是为什么，真正厉害的系统型人物，往往不急着给出热闹结论。他们先看边界、看约束、看假设，再决定什么值得投入。

## 结尾

如果要用一句话概括这场访谈，我会这样写：

AI 时代最稀缺的能力，不再只是执行，而是对问题、方向和约束的判断。

模型会越来越强，执行会越来越便宜，生成、编码、整理、分析都会越来越像基础设施。

但与此同时，另一些东西会继续升值：对问题的定义，对目标的把握，对系统的组织，对上下文的构建，以及对“什么值得做”的品味。

Jeff Dean 这场访谈的价值，也许恰恰在这里：它没有试图制造新的焦虑，而是提醒我们，在一个执行能力持续外包给机器的时代，人真正该锻炼的，可能反而是那些更上游的能力。`,
    coverImage: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=1200&auto=format&fit=crop&q=80',
    category: 'ai',
    tags: ['AI', 'Jeff Dean', 'Agent', '创业', 'Inference'],
    publishedAt: '2026-08-02',
    readingTime: '8 min read',
    substackUrl: '',
    author: { name: photographerInfo.name, avatar: nicoleAvatar },
  },
  {
    id: '7',
    title: 'Arti 投研报告 Benchmark 方案 v1.0',
    slug: 'arti-benchmark-v1',
    excerpt: '动态分析师路由、结构化证据包、层间压缩传递、模型分级调度、报告自动评分修复——一套降本提质的 AI 投研报告架构方案。',
    content: `## 架构优化（降本提质）

### 1. 动态分析师选择

在 Layer 0 加一个"路由器"，解析问题意图后只激活必要的分析师。估值问题不需要宏观分析师，宏观判断不需要个股分析师，以此类推。

### 2. Layer 1 只输出结构化证据

每个分析师不再写完整文段，统一输出 JSON 格式的证据包（claim + evidence + confidence），后续层只处理结构化数据。预计 Token 消耗降低 40-60%。

\`\`\`json
{
  "claim": "NVDA 数据中心收入同比增长 122%",
  "evidence": "2024Q4 财报，Revenue $35.1B，YoY +122%",
  "confidence": 0.95,
  "source": "SEC 10-K 2024-02-21"
}
\`\`\`

### 3. 层间压缩传递

进入下一层前做一次合并：提取各分析师共识、保留核心分歧、删除冗余。Context 长度恒定可控，不会越传越长。

### 4. 模型分级调度

- 简单归纳 → Haiku / mini（低成本）
- 冲突判断 → Sonnet（中等推理）
- 最终合成 + 修复 → Opus（按需调用）

### 5. 报告自动评分 + 按需修复

五个维度打分（数据可追溯性、结论完整性、失效条件、逻辑一致性、覆盖度）：

- ≥80 分：直接输出
- 60-79：Sonnet 轻修
- <60：Opus 深修

---

## Benchmark 评测

四个核心维度：

1. **完整性** — 一次提问能否产出完整投研分析
2. **数据准确性** — 关键数据是否可追溯
3. **结论质量** — 是否给出结论、依据和失效条件
4. **持续跟踪** — 能否跟踪原有投资判断的变化

**方法：** 同一组问题（普通用户原话，不加复杂 Prompt）同时打给 arti 和竞品，横向打分对比。

---

## 优先级

| 优先级 | 事项 |
|--------|------|
| P0 | Layer 1 结构化输出 + 自动评分修复 |
| P1 | 路由器 + 层间压缩 |
| P2 | Benchmark 问题集 + 竞品横向对比 |`,
    coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80',
    category: 'ai',
    tags: ['Arti', 'AI Research', 'LLM Architecture', 'Benchmark'],
    publishedAt: '2026-07-27',
    readingTime: '6 min read',
    author: { name: photographerInfo.name, avatar: nicoleAvatar },
  },
  {
    id: '1',
    title: 'Is OpenClaw really worth this wave of hype? Why it might be ending the Chatbot era',
    slug: 'is-openclaw-really-worth-this-wave',
    excerpt: 'If you still think AI is just a browser tab you open when you need it, you\'re already behind. After 10 days of deep use, here\'s the underlying logic — and why it\'s unlike any AI you\'ve seen.',
    content: `## TL;DR

If you still think AI is just a browser tab you open when you need it, you're already behind. Over the past two weeks, the tech world has been buzzing about a project called OpenClaw — 165k GitHub stars, 60k Discord users, 230k followers on X, and a library of 700+ skills being built in real time. Andrej Karpathy called it a "Sci-fi Takeoff." After 10 days of deep use, let's talk about the underlying logic and why it's unlike any AI you've ever seen.

**1. Operating Mode: Not "Q&A" anymore — it's "always online"**

Traditional ChatGPT is reactive: if you stop talking, it goes silent. OpenClaw is proactive — it introduces a core Agent Loop.

- **Heartbeat:** This is its soul. Every 30 minutes it "wakes up" and checks your world against the HEARTBEAT.md checklist you've defined.
- **Cron Jobs:** It's your executive chief of staff. Every morning at 8am it consolidates your Notion tasks and syncs them to Todoist.

**2. Memory: having "personality" and "common sense" like a human**

OpenClaw's memory isn't a jumbled mess — it has a structured brain with distinct regions:

- **SOUL.md:** Defines its values and tone.
- **USER.md:** It knows who you are and what you're working on.
- **MEMORY.md:** The "shared understanding" it builds up over time.
- **Compaction:** Automatically prunes noise, keeping only the signal.

**3. Real-world use cases: what can it actually do?**

- **Autonomous Chief of Staff:** Has its own Google account and 1Password access.
- **Financial watchtower:** Directly calls yfinance, analyzes SEC filings.
- **Automated cold-start:** Give it a product domain, it auto-submits to Product Hunt and monitors competitors.

## Architecture Design

For the memory management system, the model sees on each request: system prompt, project context, conversation history, current message.

**Context = system prompt + conversation history + tool results + attachments**

Context is ephemeral, bounded, and expensive.

**Memory = MEMORY.md + memory/*.md + session transcripts**

Memory is persistent, unbounded, cheap, and searchable.

## How Memory Is Retrieved

When you search memory, OpenClaw runs two search strategies in parallel. Vector search (semantic) finds conceptually similar content; BM25 search (keyword) finds exact token matches.

finalScore = (0.7 × vectorScore) + (0.3 × textScore)

## Future Vision

- **Moltbook and the AI social contract:** A social network for AI agents.
- **Agent collaboration paradigm:** You may own a team of agents.
- **The security vs. power tradeoff:** The "full permissions, brute-force local + web" model.
- **Future OS structure** = Coding Agent (kernel) + Skills (capability modules) + Chat / Voice (interaction layer)`,
    coverImage: 'https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5cd0ca26-b62e-4ecd-97fb-4167ec1d7917_2040x1360.jpeg',
    category: 'ai',
    tags: ['AI Agent', 'OpenClaw', 'LLM', 'Memory Systems'],
    publishedAt: '2026-02-08',
    readingTime: '10 min read',
    substackUrl: 'https://nicolewithlove.substack.com/p/is-openclaw-really-worth-this-wave',
    author: { name: photographerInfo.name, avatar: nicoleAvatar },
  },
  {
    id: '2',
    title: "Google Pomelli, I'm in — what it means for social media marketing",
    slug: 'google-pomelli-im-in-pomelli',
    excerpt: 'Pomelli is an experimental product from Google Labs and DeepMind that analyzes your website to build a "business DNA" profile and generate on-brand social media content. Think Canva meets ChatGPT, trained on your specific brand.',
    content: `Pomelli is an experimental product from Google Labs and DeepMind. Its core premise: your website should be able to tell social media tools exactly how to speak like your brand. It analyzes your site, builds a "business DNA" profile, and generates brand-consistent social posts, captions, and images.

Think **Canva meets ChatGPT, but trained specifically on your brand**.

## Why this caught my attention

When building products, I've always approached things from a PM's perspective — and that often means hitting walls around the orchestration of marketing assets. Today's AI products don't just need to think about *how* to tell a story. They need to think about how to tell it *well*, at the *right time*, to the *right people*, and make it the *right story*.

## How Pomelli does it

1. Detects the website's DNA and establishes a unified visual language
2. Generates content for Instagram, Facebook, X/Twitter, LinkedIn
3. Publishes images with brand-safe color palettes and layouts
4. Creates content variants from different campaign angles
5. Adapts to platform-specific formats (character counts, hashtag suggestions)

## A closed-loop trifecta workflow

Most tools only do "image" or only do "copy." Pomelli's design flow is seamless:

1. **Analyze (DNA Build):** Establish brand anchors.
2. **Plan (Campaign Ideas):** Provide strategic guidance, not just assets.
3. **Generate (Creative Gen):** Auto-adapt to specs across platforms.

BrandIntegrity = Grounding(DNA) × GenerativeQuality

## What PMs should learn from this

#### 1. The highest form of solving cold-start: automated context

We're in a no-prompt era. The best input is information that already exists. Reducing users' "thinking and input cost" is the same as increasing retention.

#### 2. Strategy first, features second

Real marketers aren't lacking filters — they're lacking ideas. Give direction before you give tools.

#### 3. The discipline and focus of an experimental product

In the AI era, better to build one thing at 90 points than a hundred things at 60.`,
    coverImage: 'https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd881a2d2-6322-4776-a35f-2f87affeda6f_2406x1622.png',
    category: 'product',
    tags: ['Google', 'Pomelli', 'Social Marketing', 'AI Tools'],
    publishedAt: '2026-01-30',
    readingTime: '8 min read',
    substackUrl: 'https://nicolewithlove.substack.com/p/google-pomelli-im-in-pomelli',
    author: { name: photographerInfo.name, avatar: nicoleAvatar },
  },
  {
    id: '3',
    title: 'The a16z Report: Paradigm Shift in AI-Native Business Models',
    slug: 'a16z-ai-native-paradigm-shift',
    excerpt: 'The a16z report is essential reading. Software as labor is the biggest new value driver. Proprietary data is the only real moat. Business models are shifting from selling raw materials to selling finished products.',
    content: `The recent a16z report is essential reading. Here are the core ideas I distilled.

## 1. Software as Labor is the Biggest Incremental Value

The logic of the SaaS industry is fundamentally shifting — from selling tools to delivering outcomes directly. When software stops being just a tool and starts delivering results, customers no longer pay a few dollars per seat per month. They pay a share of the outcome.

## 2. Proprietary Data is the Only Moat

As OpenAI, Google, and others push large model capabilities ever higher, the scarcity of the models themselves is declining. In a world of commoditized models, proprietary data is the only remaining moat.

## 3. Business Model Transformation: From Raw Materials to Finished Products

Rather than selling data for customers to analyze themselves, deliver complete investment memos, industry reports, or due diligence documents generated by AI from exclusive data sources. It's like upgrading from "selling fresh vegetables at the market" to "selling a Michelin-starred tasting menu."

## 4. The Incumbent Defense: Own the People, Not the Customers

Traditional software giants control enterprises' "systems of record" — all customer data, sales history, employee information lives in their systems. Switching costs are enormous. That creates a hostage economy.

## 5. Vertical Integration: The New Barbarians at the Gate

Rather than selling tools to professional service firms, buy a small practice and rebuild its service model with AI.

## 6. AI Restructures the Labor Value Equation: Augment, Don't Just Replace

AI's value shows up in three dimensions: cost advantage, capability enhancement, and market expansion. The future of work looks more like human-machine collaboration.

## 7. Consumer AI Opportunity Lies in Aggregation and New Categories

Native new categories create entirely new experiences that didn't exist before. Model aggregation platforms leave enormous room for third-party aggregators.`,
    coverImage: 'https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd881a2d2-6322-4776-a35f-2f87affeda6f_2406x1622.png',
    category: 'startup',
    tags: ['a16z', 'AI Business Models', 'SaaS', 'Venture'],
    publishedAt: '2026-01-24',
    readingTime: '12 min read',
    substackUrl: 'https://nicolewithlove.substack.com/p/a16zai-native-a16z-report-the-paradigm',
    author: { name: photographerInfo.name, avatar: nicoleAvatar },
  },
  {
    id: '4',
    title: 'Value Isn\'t About Doing Things Better — It\'s About Making Systems Flow',
    slug: 'upstream-downstream-thinking',
    excerpt: 'Stripe did something that looked "dumb" — they spent enormous energy not on improving their payment system, but on simplifying the developer integration experience. Behind this is a mental model I call Upstream-Downstream Thinking.',
    content: `## Upstream-Downstream Thinking: Reimagining Your Place in the Value Chain

Most companies optimize their own piece of the chain — faster production, lower costs, better product. But Stripe did something that looked "dumb": they spent enormous energy not on improving their payment system, but on simplifying developer integration. Seven lines of code to add payments — revolutionary at the time.

Behind this is a mental model I call Upstream-Downstream Thinking.

## What is Upstream-Downstream Thinking?

It has three core dimensions:

**First: the directionality of value flow.** In any value chain, at least three flows move simultaneously: physical flow, financial flow, information flow. Real power isn't in what you produce — it's in which flow you control.

**Second: the intensity of dependency.** Who is harder to replace? Who has higher switching costs? Intel and Microsoft once controlled the PC supply chain — not because they were best, but because they were hardest to replace.

**Third: where you apply leverage.** Sometimes the biggest lever isn't in your own hands. Reducing friction with upstream and downstream partners — even helping them optimize their processes — can create more value than optimizing your own.

## Content Production: A History of Shifting Power

Traditional publishing went through several major shifts: in the fifties, publishers were absolute kings; in the nineties, large chain bookstores rose; then Amazon restructured the entire value chain; in 2017, Substack let writers charge readers directly.

Each power shift happened because some player found a way to pass more value downstream.

## Where does leverage sit?

Leverage has three sources: scarcity, connectivity, and data ownership.

One trend is becoming increasingly clear: leverage is migrating toward both ends. Companies at the very top that own core technology are getting stronger; companies at the very bottom that touch users directly are getting stronger. The middle is being compressed.

## The Agents Era: Restructuring the Value Chain

The real disruption is that agents are beginning to complete tasks independently, not just assist humans. This fundamentally changes value chain structure.`,
    coverImage: 'https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe0f63c9a-2296-4c96-a2f9-52648999bb00_2000x1000.jpeg',
    category: 'thinking',
    tags: ['Value Chain', 'Systems Thinking', 'Stripe', 'Product Strategy'],
    publishedAt: '2026-01-16',
    readingTime: '15 min read',
    substackUrl: 'https://nicolewithlove.substack.com/p/5e8',
    author: { name: photographerInfo.name, avatar: nicoleAvatar },
  },
  {
    id: '5',
    title: 'Escaping the Linear Thinking Trap',
    slug: 'escape-the-involution-trap-of-linear-thinking',
    excerpt: 'Pursuing 10x growth isn\'t 100x harder than pursuing 10% growth — sometimes it\'s actually easier. The essence of 10x isn\'t doing more. It\'s doing less, but better.',
    content: `I've been thinking a lot about how to achieve 2x growth on the products I work on. After a conversation with someone much further along, I realized I was stuck in a fairly conventional mental rut.

When a team sets a 2x growth target, the first instinct is to add things on top of what already exists. This is essentially "linear thinking" — trying to double results through double effort within the same familiar ruleset.

As Dan Sullivan says: if you're pursuing 2x growth, you can keep most of what you're already doing. But if you want 10x growth, you have to start over and redesign your model from scratch.

The head of Google's Moonshot project once noted: if the goal is 10x growth, the process is usually not 100x harder than pursuing 10% growth — but the returns could be 100x.

## The Five Core Levers of 10x Growth

#### Lever 1: From "How to do it" to "Who does it"

When leaders obsess over "how," they trap themselves in execution mode. When they focus on "who," they move up to organization and strategy.

#### Lever 2: Apply "Gain Thinking" to fuel continuous momentum

Gap thinkers measure the present against an idealized future state — they constantly drain the team's psychological energy. Gain thinkers use their past as the reference point, always asking: "What progress have we made compared to where we were?"

#### Lever 3: Forge a "Unique Ability"

The essence of 10x growth isn't running faster on an existing track — it's building your own track.

#### Lever 4: Start a "Time Revolution"

- Free days: fully disconnected from operations, for recovery and strategic thinking.
- Focus days: fully dedicated to core tasks, entering a flow state.
- Buffer days: for administrative work and preparation.

#### Lever 5: Write a "Dream Check"

Turn seemingly impossible 10x targets into clear, actionable guides.

## The Four Freedoms

Each time you pursue 10x growth, you're consciously choosing to live at a specific level:

- Time freedom: your time goes toward what matters most.
- Financial freedom: money is no longer an obstacle.
- Relationship freedom: you can easily connect with anyone you want to meet.
- Purpose freedom: the goals you choose are more ambitious and meaningful.

The answer is probably hidden in the 80% we've been ignoring. This is a game about less — fewer customers, fewer products, fewer tasks, fewer meetings. But simultaneously, it's a pursuit of more depth.`,
    coverImage: 'https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8f9a5616-8ccf-4ee0-9c31-1cef677fc9fb_1536x1024.png',
    category: 'thinking',
    tags: ['10x Growth', 'Mental Models', 'Product Growth', 'Dan Sullivan'],
    publishedAt: '2026-01-05',
    readingTime: '12 min read',
    substackUrl: 'https://nicolewithlove.substack.com/p/escape-the-involution-trap-of-linear',
    author: { name: photographerInfo.name, avatar: nicoleAvatar },
  },
  {
    id: '6',
    title: 'Ivan Zhao: Steve, Steel and Infinite Minds',
    slug: 'ivan-zhao-steve-steel-and-infinitive-minds',
    excerpt: 'Every era is shaped by its "miracle material." Steel forged the Gilded Age, semiconductors lit the digital age, and now AI has arrived as the "Infinite Mind." History tells us: whoever masters the material defines the era.',
    content: `Every era is shaped by its "miracle material." Steel forged the Gilded Age, semiconductors lit the digital age, and now AI has arrived as the "Infinite Mind." History says: whoever masters the material defines the era.

The future is hard to predict because it always disguises itself as the past. Early phone calls were as brief as telegrams; early films looked like filmed stage plays. As Marshall McLuhan said: "We always drive into the future using the rearview mirror."

Today's AI chatbots are essentially imitating the Google search box of the past. We're in that awkward transitional period that every major new technology goes through.

## Why is AI harder to apply to general knowledge work?

Compared to coding agents, knowledge work is more fragmented and harder to verify.

**1. Context Fragmentation:** A programmer's tools and context are typically concentrated in an IDE. General knowledge work is scattered across dozens of tools.

**2. Lack of Verifiability:** Code can be verified through tests. But how do you verify that a project is being managed well?

## Steel and Steam

Ivan analogizes organizations to steel and steam.

Steel is the first metaphor — AI is the steel of organizations, with the potential to maintain contextual consistency across an entire workflow.

The steam engine is the second metaphor — companies today are still in the "replace the waterwheel" phase, jamming AI chatbots into existing tools. When old constraints disappear, we should reimagine what organizations should look like.`,
    coverImage: 'https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc4a9d596-c6f2-4ce1-9bf6-80879c0b6b37_2380x1330.png',
    category: 'ai',
    tags: ['Ivan Zhao', 'Notion', 'AI', 'Organizational Change'],
    publishedAt: '2025-12-27',
    readingTime: '6 min read',
    substackUrl: 'https://nicolewithlove.substack.com/p/ivan-zhaosteve-steel-and-infinitive',
    author: { name: photographerInfo.name, avatar: nicoleAvatar },
  },
  {
    id: '7',
    title: 'The Development Paradigm for LLM Application Layers',
    slug: 'llm-application-layer-paradigm',
    excerpt: 'The question isn\'t how to build features — it\'s how to front-load the risk. The definition of MVP should expand to Minimum Marketable Product: validate that the feature works and that you can actually sell it.',
    content: `A thread I read recently about development paradigms for new LLM application features sparked some thinking. Here's my take, informed by building my own projects.

## 1. The Core Problem

The question isn't how to build the feature — it's how to front-load the risk.

1. Not understanding user needs well enough to segment the audience or judge what "PMF" looks like.
2. Not knowing how to reach users, or knowing the path but not being able to market at an acceptable cost.
3. Lacking clarity on where the model's capability boundaries are in specific scenarios.
4. Iteration on product development and marketing is overall too slow.

## 2. The Paradigm

When we hit a problem, should we wait for the model's future capabilities to solve it, or do we have to solve it now through product and engineering? This isn't a binary 0/1 choice — it's a continuous spectrum with enormous gray area.

### 2.1 Front-load the Risk

The definition of MVP should expand to Minimum Marketable Product: validate that a feature is feasible while simultaneously validating that it can be marketed.

### 2.2 The Core Validation Pod (CVP)

The CVP should close the loop on R&D, user insight, and marketing capabilities, and deliver a minimal PMF product prototype at an acceptable marketing cost.

### 2.3 CVP-Driven Development Process

1. Product design, prototype scoping.
2. CVP pod builds and iterates on product v0.5.
3. Once validated, decide whether to continue polishing before full release.
4. Other engineering resources join, rebuild according to production requirements.

## 3. Real-World Organizational Challenges

### Staffing

The capabilities a CVP needs are different from the specialized roles most organizations have. It needs breadth — the ability to close the loop independently. A core 2–3 people over a tight time cycle.

### Disrupting Existing Development Processes

The CVP essentially consolidates and front-loads risks that were previously scattered across development and marketing. But a CVP team is hard to put on a shared roadmap or performance review cycle with other teams.

### Consistency Between Prototype and Production

You need a higher-abstraction platform or DSL that lets both the prototype and production system use exactly the same technical framework, enabling relatively easy migration between the CVP phase and production.`,
    coverImage: 'https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8f9a5616-8ccf-4ee0-9c31-1cef677fc9fb_1536x1024.png',
    category: 'dev',
    tags: ['LLM', 'Development Paradigm', 'CVP', 'PMF'],
    publishedAt: '2025-12-20',
    readingTime: '10 min read',
    substackUrl: 'https://nicolewithlove.substack.com/p/llm',
    author: { name: photographerInfo.name, avatar: nicoleAvatar },
  },
  {
    id: '8',
    title: 'Agent 评测体系：从零搭建的执行手册',
    slug: 'agent-evaluation-playbook',
    excerpt: '把「不稳定的智能行为」持续收敛成「可发布的工程质量」——这是一份可以直接落地的 Agent 评测执行手册，覆盖指标体系、数据集建设、评分策略、Badcase 根因分析到全链路闭环。',
    content: `> 本文基于阿里技术《Agent 评测：方法论与体系设计》整理，提炼核心方法论，转化为可直接执行的操作手册。

## 核心前提：为什么评测必须体系化

Agent 的本质问题是三道门槛：**非确定性**（同样输入不保证同样输出）、**黑盒化**（内部决策不透明）、**错误级联放大**（前一步小偏差会在后续放大）。

所以"跑几条 case 感觉还行"远远不够。你需要一套持续运转的评测体系，而不是上线前的人工抽查。

评测平台的核心价值：**把问题稳定转化为可执行修复，形成持续迭代闭环**。

---

## STEP 1：先分类型，再定指标

**不要用一套万能指标评所有 Agent**——这是最常见的失败起点。

### Agent 类型映射

| Agent 类型 | 核心评测侧重 |
|------------|------------|
| 对话型（客服/营销/导购） | 会话解决率、多轮上下文一致性、情绪识别 |
| 任务执行型（代码/数据处理） | 任务完成率、工具调用正确率、结果可验证性 |
| 推理决策型 | 推理链完整性、结论可靠性、不确定性识别 |
| 多 Agent 协作型 | 子任务分配准确性、结果一致性、异常传播 |

### 对话 Agent 的特殊难点

对话评测**不要只平均每轮分数**。每轮都"答得还行"，但最终没解决用户问题，仍然是失败。

正确做法：同时看四个层次：
- **Turn**：单轮问答质量
- **Session**：整段会话是否解决了问题
- **Trace**：执行轨迹是否符合预期路径
- **Outcome**：最终业务结果（退款成功了吗？问题解决了吗？）

---

## STEP 2：搭建指标体系

### 五大维度 × 三级优先级

**P0（上线门禁，不达标不能发）**
- 安全合规：禁用动作触发率为 0
- 关键工具调用：核心业务工具调用准确率 ≥ 阈值
- 严重错误率：过度承诺、事实性错误 < 阈值

**P1（版本比较 & 工程优化）**
- 任务完成率
- 意图识别准确率
- 工具参数正确率
- 多轮上下文保持率

**P2（体验改善 & 长期观察）**
- 回复流畅度
- 用户满意度代理指标（转人工率、重复追问率）
- 响应延迟

### 一致性指标：生产系统最关心这个

同一任务需要跑多次，观察两类结果：

- **至少一次成功率**：N 次中有一次成功 → 反映能力上限
- **连续成功率**：N 次全部成功 → 反映稳定性，是生产系统真正需要的

> 用户不会接受"多试几次总有一次成功"。

### 版本对比的统计严谨性

版本 A → 版本 B，分数有变化，不代表真的变了。必须配套：
- 关键指标的**置信区间**
- 与基线的**显著性检验**（是真实提升还是随机波动？）
- **最小可感知变化阈值**（提前定义"多少变化才值得发布"）

---

## STEP 3：建设评测数据集

**核心原则：评测集不是线上数据的随机抽样，而是围绕高风险路径设计的质量资产。**

随机采样的问题：正常流程占大多数，边缘场景太少，报告"看起来不错"但关键问题被漏掉。

### 数据集的四类来源

| 来源 | 作用 | 优先级 |
|------|------|--------|
| **专家设计用例** | 定标准、覆盖高风险边界 | 最高，先做 50-200 条 Golden Set |
| **扩展用例** | 扩覆盖，同场景不同表达 | 用规则定结构字段，LLM 生成自然语言变体 |
| **线上真实数据** | 覆盖真实分布 | 定期回流，注意幸存者偏差 |
| **Badcase 回流** | 覆盖已知失败模式 | 持续补充 |

### 针对 Skill 的用例设计框架

按四类组织：
1. **触发**：该不该触发这个 Skill？
2. **核心逻辑**：触发后流程走对了吗？（通常用例最多，覆盖主要分支）
3. **产物质量**：最终产出好不好？
4. **异常容错**：输入异常、工具失败时能稳住吗？

### 样本治理

回归集不能无限膨胀：
- 同簇样本保留代表例
- P0/P1 风险长期保留
- 稳定多版本通过且风险低的降级为抽样集

---

## STEP 4：评分策略

### 三层评分优先级

**层级 1：规则 Scorer（最高优先级）**
- 看"硬条件是否满足"：工具是否调用、状态是否正确、禁用动作是否触发
- 能写成代码的项，都由规则主判

**层级 2：LLM-as-Judge**
- 看"语义/策略是否合理"：解释质量、策略妥当性
- 好的 Judge 需要：明确评分标准（每档可执行）、输出 reason、few-shot 示例含边界样本、周期性校准（与人工一致率达 ~85%）
- 偏差治理：评测模型和生成模型是同系列时，可能有自我偏好。引入多个不同 LLM 对抗打分

**层级 3：人工评分（兜底）**
- 不适合日常全量打分
- 适合：新建评测集时定口径、校准 Judge、处理争议样本、高风险场景定期抽查

### 人工评分路由

以下情况**自动路由到人工**：
- Judge 分数在通过/不通过边界附近、置信度低
- 新模型/新 Prompt/新工具 Schema 上线的抽样观察期
- 规则与 Judge 结论冲突

### 分层筛查流程

\`\`\`
粗筛层（规则 Scorer）→ 快速分流明显通过/失败/存疑
    ↓
精判层（完整规则 + LLM Judge）→ 确认 badcase，输出问题分类/现象/置信度/判定依据
    ↓
人工复核层 → 高风险、低置信、冲突样本终判
\`\`\`

### 评分输出标准

不要只输出 pass/fail，还要输出：
- **问题分类**（现象层：事实性错误、答非所问、过度承诺）
- **问题现象**（具体描述）
- **置信度**
- **判定依据**

这是第 5 步 Badcase 根因分析的输入——基于"现象入口"收敛候选模块，而不是无差别排查所有模块。

---

## STEP 5：Badcase 根因分析（RCA）

**目标：把错例稳定追到责任模块和可修复原因。**

Badcase 来源不只是离线评测集，还有：线上会话、人工质检、投诉工单、低满意度样本、版本回归失败、监控告警。两条入口最终汇入同一个 badcase 任务表和同一套 RCA Pipeline。

### 五步 RCA 流程

**第一步：证据汇总**

按 sessionId / traceId 找到链路日志，汇总：
- 用户输入、Agent 回复
- 各模块的输入/输出、prompt
- 工具调用记录（入参、返回值、耗时、错误）
- 异常信息和中间产物

**第二步：范围收敛**

维护"问题现象 × 功能模块"映射表，避免无差别分析：

| 问题现象 | 优先排查模块 |
|---------|------------|
| 答非所问 | 意图识别、Query 改写、知识筛选 |
| 过度承诺 | 风险拦截、回复生成 |
| 事实性错误 | FAQ 检索、知识检索、回复生成 |
| 工具参数错误 | Slot 抽取、工具 Schema 理解 |
| 多轮上下文丢失 | 上下文管理、记忆模块 |

映射命中走确定性路径，未命中再让 LLM 兜底缩圈。

**第三步：分模块诊断**

对候选模块逐个读 input/output/prompt/工具返回，输出：
- 问题摘要
- 关键证据
- 改进建议
- 模块判定：PASS / SOFT_PASS / FAIL

**第四步：责任判定**

三层策略（不完全交给 LLM）：
1. 严重模块结论直接定责
2. 规则引擎匹配确定性模式
3. LLM 汇总复杂链路的责任传递关系

输出：责任模块、问题分类（面向报告的大类）、问题枚举（细粒度失败类型）、修复建议。

**第五步：结构化落盘**

结构化写入任务记录，至少包括：问题分类、问题现象、问题枚举、责任层、责任模块、置信度、详细报告、修复建议。

支持 Badcase 聚类——报告不是列 100 条，而是："退款已发货场景中，Agent 23 次跳过订单状态校验，主要集中在 v1.8 Prompt"。

### RCA 落地的执行顺序

1. 规则定位**硬错误**（工具未调用、参数缺失、工具报错未重试）
2. Trace Scorer 定位**过程偏差**（计划与目标不一致、工具返回被误读）
3. 映射表缩小候选范围
4. LLM 辅助语义归类和聚类（避免同类问题被拆成多个零散标签）
5. 高风险/低置信/冲突样本进入人工复核，人工结论反向校准规则和 Judge

---

## STEP 6：产出结构化优化建议

**原则：建议要落到明确 owner、修复动作和回归验证，而不是"优化 Prompt""提升准确率"这类泛化表述。**

### 标准行动项格式

每条优化建议至少包含：
- **失败范围**：哪些用例、哪个场景
- **证据**：支撑判断的关键 Trace/数据
- **具体动作**：Prompt 修改？训练数据补充？工具调用逻辑调整？业务口径定义？
- **Owner**：运营可配置 / 算法需优化 / 工程需修复 / 业务需定口径
- **验收方式**：回归用例通过率、人工确认
- **优先级**：P0/P1/P2

### 四个优化等级

| 等级 | 触发条件 | 典型动作 |
|------|---------|---------|
| 紧急修复 | P0 风险触发，生产级问题 | 立即回滚或热修复 |
| 迭代优化 | P1 问题，影响版本质量 | 当期 sprint 修复 |
| 体验改善 | P2 问题，长尾场景 | 纳入下期迭代 |
| 能力边界 | 当前模型能力上限 | 标记，等待模型升级后重评 |

---

## STEP 7：全链路闭环

### 离线 → 线上联动

**离线通过 ≠ 线上一定变好。**

发布阶段跟踪三类信号：
- **离线质量信号**：核心场景通过率、P0 风险数、关键工具参数正确率
- **线上体验信号**：转人工率、重复追问率、投诉率、满意度
- **业务结果信号**：任务完成率、工单闭环率

> 如果离线提升但线上关键信号恶化——触发回滚或降级！

### Badcase → 研发资产

每条 Badcase 至少生产三类反馈：
1. **回归用例**：入库评测集，防止同类问题复发
2. **训练数据**：正负样本对，用于模型微调
3. **配置/规则更新**：Prompt 修改、业务规则补充、工具 Schema 调整

### 反馈入库标准（避免回归集无限膨胀）

满足以下条件再入库：
- 失败可复现，或有稳定 Trace + 人工确认
- 期望行为明确，可以写成规则或 Judge 标准
- 根因标签清楚，能归到具体能力域
- 样本有代表性（覆盖一类问题，不是一次性抖动）
- 已完成脱敏

### 评测平台最终沉淀的质量资产库

- 用例库
- Trace 库
- 根因标签库
- 修复建议库
- Judge 校准集
- 回归集

**质量资产越厚，Agent 迭代越不需要靠个人经验和临时救火。**

---

## 快速检查清单

上线前自查：

- [ ] 已区分 Agent 类型，针对性定义指标？
- [ ] Golden Set 覆盖了核心业务路径和高风险边界？
- [ ] P0 门禁指标已定义且有明确阈值？
- [ ] 连续成功率 > 至少一次成功率 → 稳定性是否达标？
- [ ] 版本对比做了统计检验，不只看单点分数？
- [ ] LLM Judge 校准过，与人工一致率 ~85%？
- [ ] Badcase 有结构化落盘，有明确 owner 和修复建议？
- [ ] 离线门禁和线上灰度联动，设置了回滚触发条件？`,
    coverImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80',
    category: 'dev',
    tags: ['Agent', 'AI评测', 'LLM', '工程质量', '方法论'],
    publishedAt: '2026-07-07',
    readingTime: '15 min read',
    substackUrl: '',
    author: { name: photographerInfo.name, avatar: nicoleAvatar },
  },
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  if (category === 'all') return blogPosts;
  return blogPosts.filter(post => post.category === category);
};

export const getRecentPosts = (count: number = 3): BlogPost[] => {
  return blogPosts.slice(0, count);
};

export const getRelatedPosts = (currentSlug: string, count: number = 2): BlogPost[] => {
  const current = blogPosts.find(p => p.slug === currentSlug);
  if (!current) return blogPosts.slice(0, count);
  return blogPosts
    .filter(p => p.slug !== currentSlug && p.category === current.category)
    .slice(0, count);
};
