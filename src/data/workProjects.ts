export interface WorkProject {
  slug: string;
  name: string;
  period: string;
  role: string;
  type: string;
  tags: string[];
  summary: string;
  description: string;
  highlights: string[];
  externalUrl?: string;
  coverImage?: string;
}

export const workProjects: WorkProject[] = [
  {
    slug: "arti",
    name: "ARTi",
    period: "2024 — Present",
    role: "Product Manager",
    type: "Full-time",
    tags: ["AI", "FinTech", "B2C"],
    summary: "构建机构级 AI 投研平台，负责核心产品路线图规划、用户增长策略与跨团队协作。",
    description:
      "ARTi 是一个面向个人投资者和机构的 AI 投研平台，通过多模型协作、实时市场数据与结构化分析，帮助用户做出更好的投资决策。\n\n负责产品从 0→1 的完整路线图规划，包括核心功能定义（预测市场、AI 早晚报、Credits 经济体系）、用户增长策略设计以及跨研发/设计/运营团队协作。",
    highlights: [
      "设计并落地 Credits 双轨隔离经济体系（predict_balance / balance）",
      "主导早晚报数据源分流方案，覆盖 A股/港股/美股三市",
      "推动 LLM 切换功能上线，支持 Anthropic / OpenAI 动态切换",
      "设计 poly 预测市场 LMSR 流动性池与结算规则",
    ],
    externalUrl: "https://artifin.ai",
    coverImage:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80",
  },
  {
    slug: "botearn",
    name: "botearn.ai",
    period: "2024",
    role: "Product Designer & PM",
    type: "Founding Team",
    tags: ["SaaS", "AI", "Product"],
    summary: "参与创始团队，负责产品设计与 PM 工作，覆盖功能定义、原型设计到上线迭代全流程。",
    description:
      "botearn.ai 是一个 AI SaaS 产品，帮助用户通过自动化工作流实现收益变现。\n\n作为创始团队成员，负责产品设计与 PM 全流程，从需求定义、交互原型到功能迭代，与工程团队紧密协作推动产品快速上线。",
    highlights: [
      "完成核心功能的 PRD 与交互原型设计",
      "参与技术架构决策，平衡产品体验与工程实现成本",
      "建立用户反馈收集机制，驱动迭代优先级排序",
    ],
    externalUrl: "https://botearn.ai",
    coverImage:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80",
  },
  {
    slug: "fitreward",
    name: "FitReward",
    period: "2024",
    role: "Designer & Builder",
    type: "Side Project",
    tags: ["Next.js", "PWA", "AI"],
    summary: "团队运动激励 Web App，截图记录运动、AI 识别截图、季度奖池机制。",
    description:
      "FitReward 是一个帮助团队建立运动习惯的 PWA 应用，通过截图记录运动、AI 自动识别运动类型，配合季度奖池机制激励团队成员持续打卡。\n\n采用 Strava 风格设计语言，橙色 #FC4C02 主色，支持 PWA 桌面安装。",
    highlights: [
      "基于 Next.js 构建，支持 PWA 安装",
      "AI 截图识别运动类型（跑步/骑行/健身等）",
      "季度奖池自动结算，积分排行榜",
      "Strava 风格 UI，Plus Jakarta Sans 字体系统",
    ],
    externalUrl: "https://fitreward-next.vercel.app",
    coverImage:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&auto=format&fit=crop&q=80",
  },
  {
    slug: "wanderpod",
    name: "WanderPod",
    period: "2024",
    role: "Product Researcher",
    type: "Project",
    tags: ["Travel", "AI", "Consumer"],
    summary: "旅行 AI 产品研究，竞品分析（Viator vs TripAdvisor）、用户调研与差异化方案设计。",
    description:
      "WanderPod 是一个面向独立旅行者的 AI 行程规划产品研究项目，通过系统性的竞品拆解（Viator、TripAdvisor、Klook）和用户调研，输出差异化的产品定位与核心功能方案。",
    highlights: [
      "完成 Viator vs TripAdvisor 四维度竞品拆解报告",
      "设计用户调研问卷，收集 50+ 独立旅行者反馈",
      "输出差异化定位方案：AI 动态行程 + 本地达人连接",
      "设计宁波鄞江·山水秘境×古堰寻踪一日游产品原型",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&auto=format&fit=crop&q=80",
  },
];
