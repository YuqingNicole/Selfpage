import type { BlogPost } from '@/types/blog';
import { photographerInfo } from './photographer';

const nicoleAvatar = 'https://substackcdn.com/image/fetch/w_80,h_80,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F481e7d79-a645-405a-84c3-a4897160d3f3_474x474.jpeg';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Is OpenClaw really worth this wave of hype? 为什么 OpenClaw 正在终结 Chatbot 时代？',
    slug: 'is-openclaw-really-worth-this-wave',
    excerpt: '如果你还以为 AI 只是一个你需要时才点开的网页标签，那你就彻底落后了。我深度试用了 10 天，聊聊它的底层逻辑，以及为什么它和你见过的任何 AI 都不一样。',
    content: `## TL;DR

如果你还以为 AI 只是一个你需要时才点开的网页标签，那你就彻底落后了。过去两周，科技圈被一个叫 OpenClaw 的项目刷屏了。16.5 万 GitHub Star、在Discord上有6万用户，在X上有23万粉丝，还有一个人们正在实时构建的700多个技能的库。让 Andrej Karpathy 惊呼Sci-fi Takeoff（科幻降临）。我深度试用了 10 天，今天我们聊聊它的底层逻辑，以及为什么它和你见过的任何 AI 都不一样。

**1. 运行模式：不再是"一问一答"，而是"永不离线"**

传统的 ChatGPT 是被动的：你不说话，它就死了。OpenClaw 是主动的：它引入了核心的 Agent Loop（智能体循环）。

- **Heartbeat（心跳机制）：** 这是它的灵魂。它每 30 分钟会自我"觉醒"一次，按照你设定的 HEARTBEAT.md 清单检查你的世界。
- **Cron Jobs（定时任务）：** 它是你的行政主理人。每天早上 8 点，它会准时汇总你 Notion 里的任务并同步到 Todoist。

**2. 记忆机制：像人类一样拥有"性格"与"常识"**

OpenClaw 的记忆不是一团乱麻，它有一套结构化的大脑分区：

- **SOUL.md（灵魂）：** 定义它的价值观和语气。
- **USER.md（用户画像）：** 它知道你是谁，知道你在做什么。
- **MEMORY.md（长期记忆）：** 它为你沉淀的"共识"。
- **Compaction（记忆压缩）：** 自动剔除废话，只保留"知识点"。

**3. 常用 Case：它在现实中能干什么？**

- **独立 Chief of Staff：** 拥有独立的 Google 账号和 1Password 权限。
- **金融瞭望塔：** 直接调用 yfinance、分析 SEC 报表。
- **自动化冷启动：** 给它一个产品域名，自动去 Product Hunt 提交、监控竞品。

## 架构设计 Architecture Design

关于记忆管理系统，模型在处理每个请求时看到的是：系统提示词、项目上下文、对话历史、当前消息。

**上下文 = 系统提示词 + 对话历史 + 工具结果 + 附件**

上下文是转瞬即逝的、有边界的、昂贵的。

**记忆 = MEMORY.md + memory/*.md + 会话实录**

记忆是持久的、无边界的、便宜的、可搜索的。

## 记忆如何被检索

当你搜记忆的时候，OpenClaw 会并行跑两种搜索策略。向量搜索（语义）找意思相近的内容，BM25搜索（关键字）找精确 Token 匹配的内容。

finalScore = (0.7 × vectorScore) + (0.3 × textScore)

## 未来构想

- **Moltbook 与 AI 的社交契约：** AI agents 的社交网络。
- **Agent 协作范式：** 你可能拥有一个代理团队。
- **安全与权力的博弈：** "权限全开、暴力打通本地与 Web"的模式。
- **未来操作系统结构** = Coding Agent（内核）+ Skills（能力模块）+ Chat / Voice（交互层）`,
    coverImage: 'https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5cd0ca26-b62e-4ecd-97fb-4167ec1d7917_2040x1360.jpeg',
    category: 'ai',
    tags: ['AI Agent', 'OpenClaw', 'LLM', '记忆系统'],
    publishedAt: '2026-02-08',
    readingTime: '10 min read',
    substackUrl: 'https://nicolewithlove.substack.com/p/is-openclaw-really-worth-this-wave',
    author: { name: photographerInfo.name, avatar: nicoleAvatar },
  },
  {
    id: '2',
    title: 'Google Pomelli, I\'m in. Pomelli带来的社媒营销变化',
    slug: 'google-pomelli-im-in-pomelli',
    excerpt: 'Pomelli是Google Labs与DeepMind开发的实验性产品，能分析你的网站构建"商业 DNA"画像，并生成符合品牌的社交媒体内容。可以把它想象成 Canva 遇上 ChatGPT，但训练时针对你的具体品牌。',
    content: `Pomelli是Google Labs与DeepMind开发的，还处于实验阶段的产品，主要做的是希望你的网站能准确告诉社交媒体工具如何像你的品牌一样说话。它能够分析你的网站，构建"商业 DNA"画像，并生成符合品牌的社交媒体帖子、说明文字和图片。

可以把它想象成 **Canva 遇上 ChatGPT，但训练时针对你的具体品牌**。

## 这个产品为什么引起了我的注意？

因为原来我在build一个产品的时候通常是以产品经理的视角去做事情，而时常会受到marketing素材的编排处理的限制。当今的AI产品需要斟酌的不仅仅是「怎么讲故事」，更需要思考怎么讲好故事、在对的时间、讲给对的人听，最后还要讲对的故事。

## Pomelli怎么做到的

1. 检测网站的DNA，统一画风
2. 生成 Instagram、Facebook、X/Twitter、LinkedIn 的社交媒体内容
3. 发布带有品牌安全色彩搭配和布局的图片
4. 不同campaign角度的内容变体
5. 平台特定格式（字符数、话题标签建议）

## 三位一体的闭环工作流

大部分工具只做"图"或只做"文"，Pomelli 的设计路径很丝滑：

1. **分析（DNA Build）：** 建立品牌锚点。
2. **策划（Campaign Ideas）：** 提供策略建议，而不仅仅是素材。
3. **产出（Creative Gen）：** 自动适配不同社媒平台的规格。

BrandIntegrity = Grounding(DNA) × GenerativeQuality

## 产品经理值得学习借鉴的

#### 1. 解决冷启动问题的最高境界：自动化上下文

目前是no-prompt时代，最好的输入是已存在的信息。减少用户的"思考和输入成本"就是增加"留存率"。

#### 2. 策略引领优于功能堆砌

真正的营销人缺的不是滤镜，而是idea。先给方向，再给工具。

#### 3. 实验性产品的克制和聚焦

在 AI 时代，与其做一个能做 100 件事但只有 60 分的产品，不如做一个只做 1 件事但能达到 90 分的产品。`,
    coverImage: 'https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd881a2d2-6322-4776-a35f-2f87affeda6f_2406x1622.png',
    category: 'product',
    tags: ['Google', 'Pomelli', '社媒营销', 'AI工具'],
    publishedAt: '2026-01-30',
    readingTime: '8 min read',
    substackUrl: 'https://nicolewithlove.substack.com/p/google-pomelli-im-in-pomelli',
    author: { name: photographerInfo.name, avatar: nicoleAvatar },
  },
  {
    id: '3',
    title: 'a16z报告：AI native商业模式的范式转移',
    slug: 'a16z-ai-native-paradigm-shift',
    excerpt: 'a16z最近的报告非常值得一看。软件即劳动力是最大增量，专有数据是唯一的围墙花园，商业模式正从卖原材料转向卖成品。',
    content: `a16z最近的报告非常值得一看，我整理了一些核心的观点。

## 1、软件即劳动力是最大增量

SaaS 行业的逻辑正在发生根本性转变，从卖工具进化为直接交付工作结果。当软件不再只是工具，而是直接交付结果时，客户意愿支付的就不再是每个人每月几美元的订阅费，而成为了结果的分成。

## 2、专有数据是唯一的围墙花园

随着 OpenAI、Google 等巨头将大模型能力不断推高，模型本身的稀缺性正在下降。在模型日益商品化的今天，专有数据成为了唯一的围墙花园。

## 3、商业模式变革：从卖原材料转向卖成品

与其让客户购买数据后自己分析,不如直接基于独家数据源用 AI 生成完整的投资备忘录、行业分析报告或尽职调查文档。这就像从"卖菜市场的新鲜蔬菜"升级到"卖米其林餐厅的精致套餐"。

## 4、巨头的防御：拥有人而非客户

传统软件巨头控制着企业的"记录系统"——所有客户数据、销售历史、员工信息都存储在他们的系统中。迁移成本极高，造就了人质经济。

## 5、垂直整合服务：AI 时代的门口野蛮人

与其卖工具给专业服务机构,不如直接收购一家小型事务所,用 AI 重构其服务流程。

## 6、AI 重构劳动力价值方程：增强而非单纯替代

AI 的价值主要体现在三个维度：成本优势、能力增强、市场扩容。未来的工作形态更像是人机协作。

## 7、消费者 AI 的机会在于聚合与新类别

原生新类别创造此前不存在的全新体验。模型聚合平台给第三方聚合者留下巨大空间。`,
    coverImage: 'https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd881a2d2-6322-4776-a35f-2f87affeda6f_2406x1622.png',
    category: 'startup',
    tags: ['a16z', 'AI商业模式', 'SaaS', '投资'],
    publishedAt: '2026-01-24',
    readingTime: '12 min read',
    substackUrl: 'https://nicolewithlove.substack.com/p/a16zai-native-a16z-report-the-paradigm',
    author: { name: photographerInfo.name, avatar: nicoleAvatar },
  },
  {
    id: '4',
    title: '价值不在于做得多好，而在于让系统流得顺',
    slug: 'upstream-downstream-thinking',
    excerpt: 'Stripe做了一件「傻事」，他们花大量精力优化的不是自己的支付系统,而是帮开发者简化集成流程。这背后是一种我称之为「上下游思维」的认知框架。',
    content: `## 上下游思维：重新理解你在价值链中的位置

大多数公司都在优化自己的环节——更快的生产、更低的成本、更好的产品。但Stripe做了一件「傻事」，他们花大量精力优化的不是自己的支付系统,而是帮开发者简化集成流程。七行代码就能接入支付,这在当时简直是革命性的。

这背后是一种我称之为「上下游思维」的认知框架。

## 什么是上下游思维?

它有三个核心维度：

**第一是价值流动的方向性。** 在任何一个价值链中，至少有三种流在同时运动：物理流、资金流、信息流。真正的权力不在于你生产什么，而在于你控制哪个流动。

**第二个维度是依赖关系的强度。** 谁更难被替代？谁的切换成本更高？Intel和微软曾经牢牢控制PC产业链,不是因为他们做得最好,而是因为他们最难被替代。

**第三个维度是优化的着力点。** 有时候最大的杠杆不在自己这里。降低与上下游的对接成本,甚至帮助上下游优化他们的流程,反而能创造更大的价值。

## 内容生产：一部话语权的迁移史

传统出版业经历了几次重大迁移：五十年代出版社是绝对的王者；九十年代大型连锁书店崛起；然后亚马逊重构整个价值链；2017年Substack让作者直接向读者收费。

每次权力转移，都是因为某个环节找到了向下游让渡更多价值的方式。

## 话语权在哪里?

话语权有三个来源：稀缺性、连接性、数据性。

未来有一个趋势越来越明显：话语权正在向两端迁移。最上游掌握核心技术的企业会越来越强；最下游直接触达用户的企业也会越来越强。中间层正在被压缩。

## Agents时代：上下游的重构

真正的变革在于，agents开始能够独立完成任务，而不只是辅助人类。这从根本上改变了价值链的结构。`,
    coverImage: 'https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe0f63c9a-2296-4c96-a2f9-52648999bb00_2000x1000.jpeg',
    category: 'thinking',
    tags: ['上下游思维', '价值链', 'Stripe', '产品策略'],
    publishedAt: '2026-01-16',
    readingTime: '15 min read',
    substackUrl: 'https://nicolewithlove.substack.com/p/5e8',
    author: { name: photographerInfo.name, avatar: nicoleAvatar },
  },
  {
    id: '5',
    title: '逃离线性思维惯性里的内卷',
    slug: 'escape-the-involution-trap-of-linear-thinking',
    excerpt: '追求10倍增长并不比追求10%增长难100倍，有时反而更简单。10倍增长的本质，并非做得更多，而是做得更少、但更好。',
    content: `最近做产品经常思考的问题是如何让产品做到2倍增长，和一位大佬交流之后发现我陷入了比较传统的思维惯性。

当企业设定一个2倍增长的目标时，团队的第一反应通常是在现有模式基础上做加法。这本质上是一种"线性思维"——试图通过双倍的努力，在熟悉的游戏规则内争取翻倍的结果。

正如丹·沙利文所说：如果你追求2倍增长，你可以保留很多现在正在做的事情。但如果你要10倍增长，你必须从头开始改变和重新设计你的模式。

谷歌「登月计划」项目负责人曾指出：如果目标是实现10倍增长，那么这个过程通常并不会比追求10%增长费力100倍，但回报却可能是100倍。

## 10倍增长的五大核心杠杆

#### 杠杆一：从"如何做"到"谁来做"

当领导者沉迷于"如何做"时，他将自身禁锢在执行层。而当他聚焦于"谁来做"时，他便上升到了组织与战略层。

#### 杠杆二：运用"收获思维"，为增长注入持续动力

差距思维者习惯于用理想的、未来的状态来衡量当下，会持续消耗团队的心理能量。收获思维者则以自己为参照系，不断地问："与过去相比，我们已经取得了哪些进步？"

#### 杠杆三：锻造"独特才能"

10倍增长的本质，并非在已有的赛道上比别人跑得更快，而是开辟一条属于自己的新赛道。

#### 杠杆四：发起"时间革命"

- 自由日：完全脱离日常运营，用于恢复精力和战略性思考。
- 专注日：全身心投入核心任务，进入"心流"状态。
- 缓冲日：处理行政事务和准备工作。

#### 杠杆五：开具"梦想支票"

将看似遥不可及的10倍目标转化为清晰的行动指南。

## The Four Freedoms

每一次追求10倍增长，你都是在有意识地选择以特定的层次或标准生活：

- 时间自由：你把时间用在了刀刃上。
- 财务自由：金钱不再是障碍。
- 关系自由：你能轻易接触任何想要认识的人。
- 目标自由：你选择的目标更加宏大且意义深远。

答案，很可能就藏在被我们忽略的那80%之中。这是一场关于更少的游戏——更少的客户、更少的产品、更少的任务、更少的会议。但同时，它也是一场关于"更高"的追求。`,
    coverImage: 'https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8f9a5616-8ccf-4ee0-9c31-1cef677fc9fb_1536x1024.png',
    category: 'thinking',
    tags: ['10x增长', '思维模式', '产品增长', '丹·沙利文'],
    publishedAt: '2026-01-05',
    readingTime: '12 min read',
    substackUrl: 'https://nicolewithlove.substack.com/p/escape-the-involution-trap-of-linear',
    author: { name: photographerInfo.name, avatar: nicoleAvatar },
  },
  {
    id: '6',
    title: 'Ivan Zhao：Steve, steel and infinitive minds',
    slug: 'ivan-zhao-steve-steel-and-infinitive-minds',
    excerpt: '每个时代都由其"奇迹材料"所塑造。钢铁锻造了镀金时代，半导体点亮了数字时代，而现在，人工智能作为"无尽心智"已经到来。',
    content: `每个时代都由其"奇迹材料"所塑造。钢铁锻造了镀金时代，半导体点亮了数字时代，而现在，人工智能作为"无尽心智"（Infinite Minds）已经到来。历史告诉我们：谁掌握了材料，谁就定义了时代。

未来之所以难以预测，是因为它总是伪装成过去。早期的电话通话像电报一样简短；早期的电影看起来像拍摄下来的舞台剧。正如马歇尔·麦克卢汉所言："我们总是通过后视镜驶向未来。"

今天，我们看到的AI聊天机器人，其实是在模仿过去的谷歌搜索框。我们正处于每项新技术变革都会经历的那个尴尬转型期。

## 为什么AI更难辅助一般的知识工作？

相比于coding agent，知识工作更加碎片化且难以验证。

**1. 语境碎片化（Context Fragmentation）：** 编程的工具和语境通常集中在IDE中。但一般的知识工作散落在几十个工具中。

**2. 缺乏可验证性（Verifiability）：** 代码可以通过测试来验证。但你如何验证一个项目是否管理得当？

## 钢铁与蒸汽

Ivan将组织比喻成钢铁和蒸汽。

钢铁是第一个隐喻——AI就是组织的钢铁，有潜力在整个工作流中保持语境的一致性。

蒸汽机是第二个比喻——目前的公司仍然处于「更换水轮」的阶段，将AI聊天机器人硬塞进现有的工具中。当旧的约束消失时，我们应该重新构想组织应该有的模样。`,
    coverImage: 'https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc4a9d596-c6f2-4ce1-9bf6-80879c0b6b37_2380x1330.png',
    category: 'ai',
    tags: ['Ivan Zhao', 'Notion', 'AI', '组织变革'],
    publishedAt: '2025-12-27',
    readingTime: '6 min read',
    substackUrl: 'https://nicolewithlove.substack.com/p/ivan-zhaosteve-steel-and-infinitive',
    author: { name: photographerInfo.name, avatar: nicoleAvatar },
  },
  {
    id: '7',
    title: 'LLM应用层的开发范式',
    slug: 'llm-application-layer-paradigm',
    excerpt: '问题不是怎么做功能，而是怎么把风险前置。MVP的定义应该被扩展到最小可营销产品，在验证功能成立的同时验证其可营销性。',
    content: `近期看来一篇推文分享关于LLM应用层新功能的研发范式，结合自己做项目的经验，抛砖引玉。

## 1. 本质问题

问题不是怎么做功能，而是怎么把风险前置。

1. 对用户需求不够了解，无法细分用户群，也无法判断做到什么程度才能PMF。
2. 不知道如何触达用户，或即使知道路径，也无法以可接受的成本进行营销。
3. 对大模型在具体场景中的能力边界缺乏清晰认知。
4. 产品研发和营销整体的迭代趋势偏慢。

## 2. 范式介绍

当我们遇到问题时，究竟应该指望模型未来能力的提升来解决，还是必须在当下通过产品与工程手段主动解决？这并不是一个 0 或 1 的二元选择，而是一条存在大量灰度空间的连续谱。

### 2.1 风险前置

MVP的定义应该被扩展到最小可营销产品，在验证功能成立和可行的同时验证其可营销性。

### 2.2 核心功能验证小队（CVP）

CVP 应该闭环相关的研发、需求洞察、营销等能力，可以独立交付一个最小化的PMF且营销成本可接受的产品原型。

### 2.3 CVP驱动的研发流程

1. 产品设计，原型立项。
2. CVP小队进行产品V0.5版本开发和迭代。
3. 确认可行后决定是否继续优化再发布。
4. 其他研发资源介入，按场景要求重新构建。

## 3. 实际组织中会遇到的问题

### 人员选择

CVP需要的能力跟很多组织专业化细分的岗位不同，它更需要的是广度，能自己闭环。核心的2-3个人在紧密的时间周期内完成。

### 对已有研发流程的破坏

CVP实际上是把之前分散在研发和推广等各环节的风险都聚合并前置了。但CVP团队很难跟其他团队放在一起进行联合排期、绩效考核。

### 线上与预研的方案一致性

需要一种抽象度更高的平台/DSL，让预研和线上系统都使用完全同样的技术框架，实现可以相对容易地在CVP阶段和线上实现中进行迁移。`,
    coverImage: 'https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8f9a5616-8ccf-4ee0-9c31-1cef677fc9fb_1536x1024.png',
    category: 'dev',
    tags: ['LLM', '研发范式', 'CVP', 'PMF'],
    publishedAt: '2025-12-20',
    readingTime: '10 min read',
    substackUrl: 'https://nicolewithlove.substack.com/p/llm',
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
