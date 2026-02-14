export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stars?: number;
  url: string;
}

export const githubRepos: GitHubRepo[] = [
  {
    name: 'nano-banana-pro-prompts-recommend-skill',
    description: 'A curated collection of prompt engineering skills and recommendations for Nano Banana Pro.',
    language: 'Markdown',
    url: 'https://github.com/YouMind-OpenLab/nano-banana-pro-prompts-recommend-skill',
  },
  {
    name: 'nano-banana-pro-prompts-recommend-skill',
    description: 'A curated collection of prompt engineering skills and recommendations for Nano Banana Pro.',
    language: 'Markdown',
    url: 'https://github.com/YouMind-OpenLab/nano-banana-pro-prompts-recommend-skill',
  },
  {
    name: 'seo-geo-claude-skills',
    description: 'SEO & GEO optimization skills powered by Claude for search engine and generative engine visibility.',
    language: 'TypeScript',
    url: 'https://github.com/aaron-he-zhu/seo-geo-claude-skills',
  },
];

export interface UseCase {
  title: string;
  description: string;
  tags: string[];
  url?: string;
}

export interface PartnerLink {
  name: string;
  description: string;
  url: string;
}

export const partnerLinks: PartnerLink[] = [];

export const useCases: UseCase[] = [
  {
    title: 'PDF Watermark Removal Pipeline',
    description: 'Built an automated pipeline to detect and remove watermarks from PDF slides while preserving layout fidelity.',
    tags: ['Python', 'PDF Processing', 'Computer Vision'],
  },
  {
    title: 'AI Travel Assistant',
    description: 'Developed a conversational AI agent to help travelers navigate China, covering visa policies, payment setup, and itinerary planning.',
    tags: ['LLM', 'RAG', 'React'],
  },
  {
    title: '字幕提取',
    description: '从视频中自动提取字幕内容的工具。',
    tags: ['YouMind', 'Shortcut'],
    url: 'https://youmind.com/shortcuts/I2UaAq2x2zJA9e',
  },
  {
    title: 'Nicole风格推文写作',
    description: '以 Nicole 风格撰写社交媒体推文的 AI 技能。',
    tags: ['YouMind', 'Writing'],
    url: 'https://youmind.com/skills/UkG9FfOI3zDV20',
  },
  {
    title: '爆款检测',
    description: '检测内容是否具备爆款潜力的分析工具。',
    tags: ['YouMind', 'Analytics'],
    url: 'https://youmind.com/skills/g1AbVCmFddArUg',
  },
  {
    title: '小红书爆款图文生成器',
    description: '自动生成小红书风格爆款图文内容。',
    tags: ['YouMind', 'Xiaohongshu'],
    url: 'https://youmind.com/shortcuts/qTfx6U3l5a9kWp',
  },
  {
    title: '转口播稿',
    description: '将文字内容转换为适合口播的稿件。',
    tags: ['YouMind', 'Content'],
    url: 'https://youmind.com/skills/AxqimiY87VajoS',
  },
  {
    title: '商业公众号全流程',
    description: '公众号商业内容从策划到发布的全流程自动化。',
    tags: ['YouMind', 'WeChat'],
    url: 'https://youmind.com/skills/64LIzQSpAsTwOM',
  },
  {
    title: '长文转视频口播稿',
    description: '将长篇文章转化为视频口播脚本。',
    tags: ['YouMind', 'Video'],
    url: 'https://youmind.com/skills/N1qiwAUVlH4mbj',
  },
  {
    title: 'X长文转小红书图文生成器',
    description: '将 X/Twitter 长文转换为小红书图文格式。',
    tags: ['YouMind', 'Xiaohongshu'],
    url: 'https://youmind.com/shortcuts/BE9GVIQg3J8Km3',
  },
  {
    title: 'Reddit 每日增长与内容创作热帖',
    description: '追踪 Reddit 热门内容趋势，辅助增长与创作。',
    tags: ['YouMind', 'Reddit', 'Growth'],
    url: 'https://youmind.com/skills/q77euDkVyJEI5H',
  },
];
