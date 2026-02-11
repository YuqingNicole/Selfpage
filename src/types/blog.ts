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
  author: {
    name: string;
    avatar: string;
  };
}

export type BlogCategory = 'photography' | 'travel' | 'gear' | 'tutorials' | 'personal';
