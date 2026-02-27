import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SubstackPost {
  id: number;
  title: string;
  subtitle: string | null;
  slug: string;
  canonical_url: string | null;
  cover_image: string | null;
  post_date: string | null;
  audience: string;
  tags: string[];
  excerpt: string | null;
  word_count: number | null;
  reaction_count: number;
  comment_count: number;
  synced_at: string;
}

export interface SubstackNote {
  id: number;
  body_text: string;
  body_html: string | null;
  note_date: string | null;
  reaction_count: number;
  restacks: number;
  comment_count: number;
  canonical_url: string | null;
  synced_at: string;
}

export function useSubstackPosts() {
  return useQuery<SubstackPost[]>({
    queryKey: ['substack-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('substack_posts')
        .select('*')
        .eq('audience', 'everyone')
        .order('post_date', { ascending: false })
        .limit(30);
      if (error) throw error;
      return (data ?? []) as SubstackPost[];
    },
    staleTime: 1000 * 60 * 30, // 30 min
    retry: 1,
  });
}

export function useSubstackNotes() {
  return useQuery<SubstackNote[]>({
    queryKey: ['substack-notes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('substack_notes')
        .select('*')
        .order('note_date', { ascending: false })
        .limit(20);
      if (error) throw error;
      return (data ?? []) as SubstackNote[];
    },
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });
}

/** Manually trigger a sync via the Edge Function */
export async function triggerSubstackSync(): Promise<{ posts: number; notes: number; errors: string[] }> {
  const { data, error } = await supabase.functions.invoke('sync-substack');
  if (error) throw error;
  return data;
}
