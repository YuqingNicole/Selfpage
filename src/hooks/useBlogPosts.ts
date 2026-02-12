import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { BlogPost } from '@/types/blog';

interface DbBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  tags: string[];
  published_at: string;
  reading_time: string;
  substack_url: string;
  author_name: string;
  author_avatar: string;
}

function mapDbToPost(row: DbBlogPost): BlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.cover_image,
    category: row.category as BlogPost['category'],
    tags: row.tags,
    publishedAt: row.published_at,
    readingTime: row.reading_time,
    substackUrl: row.substack_url,
    author: { name: row.author_name, avatar: row.author_avatar },
  };
}

export function useBlogPosts(category?: string) {
  return useQuery({
    queryKey: ['blog-posts', category],
    queryFn: async () => {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false });
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }
      const { data, error } = await query;
      if (error) throw error;
      return (data as unknown as DbBlogPost[]).map(mapDbToPost);
    },
  });
}

export function useBlogPost(slug: string | undefined) {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();
      if (error) throw error;
      return mapDbToPost(data as unknown as DbBlogPost);
    },
    enabled: !!slug,
  });
}

export function useRelatedPosts(slug: string | undefined, category: string | undefined) {
  return useQuery({
    queryKey: ['related-posts', slug, category],
    queryFn: async () => {
      if (!slug || !category) return [];
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('category', category)
        .neq('slug', slug)
        .limit(2);
      if (error) throw error;
      return (data as unknown as DbBlogPost[]).map(mapDbToPost);
    },
    enabled: !!slug && !!category,
  });
}
