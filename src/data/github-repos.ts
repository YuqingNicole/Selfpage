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
    title: 'Subtitle Extractor',
    description: 'A tool that automatically extracts subtitle content from videos.',
    tags: ['YouMind', 'Shortcut'],
    url: 'https://youmind.com/shortcuts/I2UaAq2x2zJA9e',
  },
  {
    title: 'Nicole-Style Tweet Writer',
    description: 'An AI skill for writing social media posts in Nicole\'s writing style.',
    tags: ['YouMind', 'Writing'],
    url: 'https://youmind.com/skills/UkG9FfOI3zDV20',
  },
  {
    title: 'Viral Content Detector',
    description: 'Analyzes content to assess its potential for going viral.',
    tags: ['YouMind', 'Analytics'],
    url: 'https://youmind.com/skills/g1AbVCmFddArUg',
  },
  {
    title: 'Xiaohongshu Viral Post Generator',
    description: 'Automatically generates viral-style image-text posts for Xiaohongshu.',
    tags: ['YouMind', 'Xiaohongshu'],
    url: 'https://youmind.com/shortcuts/qTfx6U3l5a9kWp',
  },
  {
    title: 'Script-to-Voiceover Converter',
    description: 'Converts written content into narration-ready voiceover scripts.',
    tags: ['YouMind', 'Content'],
    url: 'https://youmind.com/skills/AxqimiY87VajoS',
  },
  {
    title: 'WeChat Business Account Full Pipeline',
    description: 'End-to-end automation for WeChat business content from planning to publishing.',
    tags: ['YouMind', 'WeChat'],
    url: 'https://youmind.com/skills/64LIzQSpAsTwOM',
  },
  {
    title: 'Long-Form to Video Voiceover Script',
    description: 'Transforms long-form articles into video narration scripts.',
    tags: ['YouMind', 'Video'],
    url: 'https://youmind.com/skills/N1qiwAUVlH4mbj',
  },
  {
    title: 'X Thread to Xiaohongshu Post Generator',
    description: 'Converts X/Twitter long-form threads into Xiaohongshu image-text format.',
    tags: ['YouMind', 'Xiaohongshu'],
    url: 'https://youmind.com/shortcuts/BE9GVIQg3J8Km3',
  },
  {
    title: 'Reddit Daily Growth & Content Trending Posts',
    description: 'Tracks Reddit trending content to support growth and content creation strategies.',
    tags: ['YouMind', 'Reddit', 'Growth'],
    url: 'https://youmind.com/skills/q77euDkVyJEI5H',
  },
];
