export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stars?: number;
  url: string;
}

export const githubRepos: GitHubRepo[] = [
  {
    name: 'deck-cleaner',
    description: 'A web tool that removes watermarks from NotebookLM Slide Deck PDF files.',
    language: 'TypeScript',
    stars: 12,
    url: 'https://github.com/yourusername/deck-cleaner',
  },
  {
    name: 'magpie-china',
    description: 'AI-powered travel companion for China — navigate language, payments, visas.',
    language: 'TypeScript',
    stars: 8,
    url: 'https://github.com/yourusername/magpie-china',
  },
  {
    name: 'nano-banana-pro-prompts-recommend-skill',
    description: 'A curated collection of prompt engineering skills and recommendations for Nano Banana Pro.',
    language: 'Markdown',
    url: 'https://github.com/YouMind-OpenLab/nano-banana-pro-prompts-recommend-skill',
  },
];

export interface UseCase {
  title: string;
  description: string;
  tags: string[];
}

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
];
