import type { Project } from '@/types';
import deckcleanerCoverImg from '@/assets/deckcleaner-cover.png';
import magpiechinaCoverImg from '@/assets/magpiechina-cover.png';

const deckcleanerCover = deckcleanerCoverImg.src;
const magpiechinaCover = magpiechinaCoverImg.src;

export const projects: Project[] = [
  {
    id: '2',
    title: 'Boris Cherny — Claude Code 创始人公开发言整理',
    category: 'research',
    year: '2026',
    slug: 'boris-cherny-claude-code',
    coverImage: 'https://opengraph.githubassets.com/1/YuqingNicole/boris-cherny-claude-code',
    description: 'A research site documenting Boris Cherny (creator of Claude Code at Anthropic) — his workflow, product philosophy, views on the future of software engineering, and key quotes from Twitter/X threads, Lenny\'s Podcast, and press interviews. Features dark/light theme toggle, sidebar navigation, and full Lenny\'s Podcast transcript excerpts.',
    client: 'Personal Project',
    location: 'Web',
    externalUrl: 'https://boris-cherny-claude-code.vercel.app',
    images: [
      {
        id: '2-1',
        src: 'https://opengraph.githubassets.com/1/YuqingNicole/boris-cherny-claude-code',
        alt: 'Boris Cherny Claude Code research site',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '0',
    title: 'Deck Cleaner',
    category: 'product',
    year: '2025',
    slug: 'deck-cleaner',
    coverImage: deckcleanerCover,
    description: 'A web tool that removes watermarks from NotebookLM Slide Deck PDF files. Features PDF watermark removal, video watermark removal, and PDF to PPTX conversion.',
    client: 'Personal Project',
    location: 'Web',
    externalUrl: 'https://deckcleaner.xyz',
    images: [
      {
        id: '0-1',
        src: deckcleanerCover,
        alt: 'Deck Cleaner homepage',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '0b',
    title: 'Magpie China',
    category: 'product',
    year: '2025',
    slug: 'magpie-china',
    coverImage: magpiechinaCover,
    description: 'An AI-powered travel companion for China. Helps travelers navigate language barriers, payment setup, visa policies, and itinerary planning.',
    client: 'Personal Project',
    location: 'Web',
    externalUrl: 'https://www.magpiechina.com/',
    images: [
      {
        id: '0b-1',
        src: magpiechinaCover,
        alt: 'Magpie China homepage',
        aspectRatio: 'landscape'
      }
    ]
  },
];

// Helper function to get project by slug
export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};

// Helper function to get projects by category
export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

// Helper function to get featured projects (first 4)
export const getFeaturedProjects = (): Project[] => {
  return projects.slice(0, 4);
};

// Helper function to get next/previous project
export const getAdjacentProjects = (currentSlug: string): { prev: Project | null; next: Project | null } => {
  const currentIndex = projects.findIndex(p => p.slug === currentSlug);
  
  return {
    prev: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
  };
};
