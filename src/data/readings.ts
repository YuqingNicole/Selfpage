export interface Reading {
  title: string;
  author: string;
  url: string;
  description?: string;
}

export const readings: Reading[] = [
  {
    title: '为什么超级个体不需要超级团队？',
    author: '王焕超 / 腾讯研究院',
    url: 'https://mp.weixin.qq.com/s/uOLP0XMkFSsCW_bhMb1DDw',
    description: '腾讯研究院关于超级个体与团队关系的观察：AI 正在放大个人产能，但真正值得讨论的不是一个人替代一支团队，而是个人能力如何沉淀为组织能力，以及判断、协作与责任如何重新分配。',
  },
  {
    title: 'AI 商业化进入第二阶段的重要拐点出现了？',
    author: '贝叶斯之美',
    url: 'https://mp.weixin.qq.com/s/oBRBfbLy2tlNmVmFygr7xQ',
    description: '关于 AI 商业化进入新阶段的观察与判断，作为理解模型能力、产品落地与价值捕获关系的参考材料收录。具体论据与数据应回到原文核验。',
  },
  {
    title: '把决策权交给离工作最近的人：Tesla 的反官僚规则',
    author: 'Dustin / Elon Musk memo（转述）',
    url: 'https://x.com/r0ck3t23/status/2090901321054371872?s=52',
    description: '一则对 Tesla 内部沟通原则的整理：减少无效会议，允许在不创造价值时离场；信息走完成任务所需的最短路径，而非层级链条；少用需要额外解释的黑话；当规则在具体情境中明显荒谬时，应由执行者用常识促成规则更新。核心不是“更努力”，而是持续把判断与决策压到离问题最近的人。内容为转述与观点提炼，原始 memo 的完整语境及措辞应另行核验。',
  },
  {
    title: '宏观漫谈109：我们正处于一个美元主导的资本周期上升阶段尾部',
    author: '高能量 / 李翔、李丰',
    url: 'https://app.podwise.ai/dashboard/episodes/8661316',
    description: '一套以全球流动性为核心的宏观框架：美元资产若缺少持续增量资金，将从普涨转入高波动的存量博弈；美债供给、日元套息交易与地缘冲突构成脆弱平衡。值得关注的延伸是，AI 投资或从算力与基础设施叙事，转向具备真实盈利能力的消费、工业与制造应用。节目中的具体时点、人物和数据判断应另行核验。',
  },
  {
    title: 'a16z 合伙人的反常识忠告：做小、做深、卖贵，才是最快到一亿美金的路',
    author: '深思圈',
    url: 'https://mp.weixin.qq.com/s/uH1EcZK4xzYyu6vUpf7OPA',
    description: 'a16z 合伙人的创业建议：不要一开始就追求大市场，而是从足够具体、足够痛的细分问题切入，做深价值、建立定价权，再逐步扩张。',
  },
  {
    title: '比特币到底了吗？',
    author: 'NextGen Digital Venture',
    url: 'https://mp.weixin.qq.com/s/0eW-BB9HW0KQrpBEw-OMeA',
    description: '围绕比特币当前所处周期与市场位置的研究讨论；作为投资判断素材收录，阅读时应区分叙事、数据与可验证的结论。',
  },
  {
    title: '自主 Agent / 上下文工程资料索引',
    author: 'ninehills',
    url: 'https://github.com/ninehills/blog/issues/150',
    description: '一份以工程实践为主的自主 Agent 与上下文工程资料索引，覆盖 Anthropic、Manus、LangChain、Kimi 等关于 Agent 架构、Skills、工具设计、上下文压缩、长时运行与评估的必读文章，并附个人点评。',
  },
  {
    title: 'Many ways to win',
    author: 'Steph Ango',
    url: 'https://stephango.com/moats',
    description: 'Steph Ango 将产品、组织与生物系统的竞争优势拆成八十种策略：从积累、价格、时间与独特性，到进攻与防御；适合用来思考产品护城河不是单一壁垒，而是一组彼此叠加的能力。',
  },
  {
    title: '两个非程序员基金经理，正在用 AI 重做研究',
    author: 'NextGen Digital Venture',
    url: 'https://mp.weixin.qq.com/s/mj4RzTrC39oRnifjrBYJMQ',
    description: '两位非程序员基金经理如何把 AI 纳入研究流程，重新组织信息收集、分析与判断的实践案例。',
  },
  {
    title: '真正的AI红利，不是追求极致效率，而是开拓“创造力前沿”',
    author: 'IDEO',
    url: 'https://mp.weixin.qq.com/s/XS0J7HeKEuasrp2FtinYyw',
    description: 'IDEO 提出：AI 带来的效率盈余不应只被用于进一步降本，而应被再投资到人类的创造力、判断力与感知力尚能形成差异的“创造力前沿”；组织也需从围绕信息流转，转向围绕价值创造与适应力来重构。',
  },
  {
    title: 'FDE（前线部署工程师）从零入门指南',
    author: '范冰 / XDash',
    url: 'https://github.com/xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer',
    description: '一份围绕 Forward Deployed Engineer 的公开指南：从识别正确问题、赢得客户、激活部署，到续约、扩张与规模化复制；以 165 个案例讨论 AI 如何真正进入客户业务。',
  },
  {
    title: '好内容的保质期：如何录制值得回听的对话',
    author: '范阳',
    url: 'https://mp.weixin.qq.com/s/12iqny0FdrvAg_PE5NtH9Q',
    description: '关于什么样的对话值得被录下、回听与长期保存，以及如何提升对话内容的耐久度与复听价值。',
  },
  {
    title: "Netflix产品与技术负责人：AI时代为什么更需要系统型人才丨Lenny's Podcast",
    author: '晚点再听',
    url: 'https://mp.weixin.qq.com/s/Humku-Qw54NhhNq41BaGuw',
    description: '围绕 Lenny\'s Podcast 的一期内容，讨论在 AI 时代为什么反而更需要能跨产品、技术与组织协同的系统型人才。',
  },
  {
    title: 'Grok Build 源码拆解：xAI 编码 Agent 的设计智慧与提效手册',
    author: '向阳乔木',
    url: 'https://xiangyangqiaomu.feishu.cn/docx/OAoYdiZ1eoc2HTxmmZ3clWIPnLf',
    description: '一篇对 xAI 开源 coding agent Grok Build 的源码拆解，重点看 prompt 体系、工具系统、上下文压缩、记忆机制与权限设计。',
  },
  {
    title: '朱松纯两万字演讲：AI热潮的回望与反思、思想自主、未来展望',
    author: '朱松纯',
    url: 'https://mp.weixin.qq.com/s/39e7WKJsjKWDD1H1VaHWUg?scene=1',
    description: '朱松纯对 AI 热潮的系统回望与反思，延伸到思想自主与未来发展的判断。',
  },
  {
    title: 'AI 2027',
    author: 'Daniel Kokotajlo et al.',
    url: 'https://ai-2027.com/summary',
    description: 'A scenario-based forecast of how AGI and ASI might unfold between 2025 and 2027, told as a narrative with technical grounding.',
  },
  {
    title: 'Zynga 创始人 Mark Pincus：consumer AI 的窗口，可能正在最冷的时候打开',
    author: 'Roger',
    url: 'https://mp.weixin.qq.com/s/ySiuEXlzgumQU2Ir6vwgZw',
    description: 'Mark Pincus 对 consumer AI 当下时机的判断——越冷的时候，往往是窗口刚打开的时候。',
  },
  {
    title: 'Agents with taste',
    author: 'Emil Kowalski',
    url: 'https://emilkowal.ski/ui/agents-with-taste',
    description: 'On UI craft and the details that make interfaces feel considered.',
  },
  {
    title: '如何判断一个人是否真正 AI Native？',
    author: '阿迪亚',
    url: 'https://mp.weixin.qq.com/s/0Ba8fG4l6kD-mspkJ8hksw',
    description: '区分真正 AI Native 与普通 AI 用户的关键特征与思维方式。',
  },
  {
    title: '字节跳动更新领导力原则',
    author: '人人都是产品经理',
    url: 'https://mp.weixin.qq.com/s/SkvTmd9yCtdmKCcVNZrbrQ',
    description: '字节跳动最新领导力原则更新解读，梳理其组织文化与管理理念的演变方向。',
  },
  {
    title: '70条锦秋小饭桌 Hot Takes，预判2026年AI创业下半场',
    author: '锦秋基金',
    url: 'https://mp.weixin.qq.com/s/kM8pFh7KGQHAdINbEJivhA',
    description: '锦秋基金对 2026 年 AI 创业下半场的 70 条预判——从市场格局、产品方向到团队构建的高密度洞察。',
  },
  {
    title: '如何把超级个体的产能，转化成组织能力？| AI跃迁者调研',
    author: '腾讯研究院',
    url: 'https://mp.weixin.qq.com/s/ywS4Vx2hDdq0BhJbU2CCzw',
    description: '腾讯研究院对 AI 跃迁者的调研——探讨超级个体如何将个人 AI 产能沉淀为可复用的组织能力。',
  },
  {
    title: '我们造出了 AI，却意外照见了自己',
    author: '公众号',
    url: 'https://mp.weixin.qq.com/s?__biz=Mzg5Mzc2Mjc2Ng==&mid=2247484055&idx=1&sn=84853e664b64abb2c7a27d54e0e46e9d',
    description: '我们造出了 AI，却在这面镜子里意外照见了自己。',
  },
  {
    title: 'How to Earn a Billion Dollars',
    author: 'Paul Graham',
    url: 'https://paulgraham.com/earn.html',
    description: 'PG 在牛津联合会的演讲——人们如何成为亿万富翁，以及这对创业者意味着什么。',
  },
  {
    title: 'Claude Code 的重点不是 tool calling，而是 agent runtime',
    author: 'yudesk.dev',
    url: 'https://yudesk.dev/docs/notes/claude-code-tool-calling-system',
    description: '很多人把 Claude Code 理解成"模型加一堆工具"，真正值得学的是它如何把工具发现、权限、hooks、sandbox 和结果回流组织成一条可验证的 agent loop。',
  },
  {
    title: '为什么我用 mattpocock/skills 替代了 superpowers',
    author: '枫言枫语',
    url: 'https://justinyan.me/post/6676',
    description: '作者从实际使用出发，解释为什么 mattpocock/skills 比 superpowers 更适合作为 TypeScript 学习工具链。',
  },
  {
    title: '高善文：一位首席经济学家的心灵史',
    author: '北大汇丰',
    url: 'https://mp.weixin.qq.com/s/Q0L0ghXoaGKqIxuxxe-9Ow',
    description: '安信证券首席经济学家高善文的思想历程——一位经济学家如何在时代变局中形成自己的研究框架与心智模型。',
  },
  {
    title: '宁德时代创始人曾毓群的几个底层思考逻辑',
    author: '黄泓毅（黄师傅的记事本）',
    url: 'https://mp.weixin.qq.com/s/0Lz0TWbSgnrgTinKULhA0A',
    description: '通过晚点深度报道提炼曾毓群的底层逻辑：五识修养、扁担与彩票的技术布局观、鸡蛋与火腿的人才评价、以及"练好基本功才能发挥想象力"的做事哲学。',
  },

  {
    title: "Harnessing AI for the Real Economy",
    author: "Goldman Sachs",
    url: "https://www.goldmansachs.com/what-we-do/investment-banking/insights/articles/harnessing-ai-for-the-real-economy",
    description: "Goldman Sachs on how AI is moving from model hype into real-economy adoption, with focus on enterprise deployment, industrial use cases, and practical value creation.",
  },
  {
    title: '需要驾驭 AI 而不是 trust me bro',
    author: 'Nicole with',
    url: 'https://mp.weixin.qq.com/s/G5SUBkIwN4YTfBQ4XhGxhg',
    description: '关于如何真正驾驭 AI，而不是停留在“trust me bro”式的轻信与表面使用。',
  },
  {
    title: '闭门会｜张咋啦 Zara：AI 时代的底层工作方式',
    author: '泛函',
    url: 'https://mp.weixin.qq.com/s/W6_fwHy2DqocOEXv0-WQwQ',
    description: '关于 AI 时代底层工作方式的闭门会分享，聚焦人在新工具环境中的工作方法与认知更新。',
  },
  {
    title: '超越OpenAI，中国00后团队攻破「记忆」难题！打造下一个AI互联网时刻',
    author: '新智元',
    url: 'https://mp.weixin.qq.com/s/fIW88tVvRw7GtXgmG5dExg',
    description: '关于中国 00 后团队攻克 AI 记忆难题的报道，聚焦长期记忆能力如何推动下一阶段的 AI 产品与互联网形态。',
  },
  {
    title: 'Vibe Design Playbook',
    author: 'Alibaba Cloud Design',
    url: 'https://alibaba-cloud-design.github.io/vibe-designing-playbook/',
    description: '一份关于 Vibe Designing 的实战手册，聚焦如何把设计意图、协作方式与 AI 时代的新工作流结合起来。',
  },
  {
    title: 'Investment Research Agent Leaderboard & Benchmark | IRAB',
    author: 'Rabyte',
    url: 'https://irab.rabyte.cn/leaderboard/',
    description: 'AI 模型投研能力排行榜——用标准化测试集跑所有模型配置，按 D×Q×R 三维评分（数据质量、分析深度、可靠性），公开展示成本、耗时与 head-to-head 胜率。',
  },
  {
    title: '中国大类资产投资 2025 年报 - 前言',
    author: '陈鹏博士 / 有知有行',
    url: 'https://youzhiyouxing.cn/sbbi2025/preface/',
    description: '用 R=A+B-C（Alpha + Beta - Cost）拆解投资收益，解释为何对绝大多数投资者而言，长期最重要的收益来源仍是 Beta，以及理解中国大类资产风险与收益框架的意义。',
  },

];
