export interface Reading {
  title: string;
  author: string;
  url: string;
  description?: string;
}

export const readings: Reading[] = [
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
];
