export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: BlogCategory;
  tags: string[];
  publishedAt: string;
  readingTime: string;
  substackUrl: string;
  author: {
    name: string;
    avatar: string;
  };
}

export type BlogCategory = 'ai' | 'product' | 'startup' | 'thinking' | 'dev';
