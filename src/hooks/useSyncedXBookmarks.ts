'use client';

import { useEffect, useState } from 'react';
import {
  bookmarkCategories,
  type BookmarkCategory,
  type BookmarkStatus,
  type XBookmark,
} from '@/data/xBookmarks';
import { supabase } from '@/integrations/supabase/client';

const validCategories = new Set<Exclude<BookmarkCategory, 'All'>>(
  bookmarkCategories.filter((category) => category !== 'All'),
);
const validStatuses = new Set<BookmarkStatus>(['Use now', 'Keep', 'Review', 'Archive']);

export function useSyncedXBookmarks() {
  const [bookmarks, setBookmarks] = useState<XBookmark[]>([]);

  useEffect(() => {
    const hasSupabase =
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
    if (!hasSupabase) return;

    let active = true;

    async function load() {
      const { data, error } = await supabase
        .from('x_bookmarks')
        .select(
          'title,author,handle,url,category,note,next_action,status,content_seed,source_folder',
        )
        .order('synced_at', { ascending: false });

      if (!active || error || !data) return;
      setBookmarks(
        data.map((row) => ({
          title: row.title,
          author: row.author,
          handle: row.handle,
          url: row.url,
          category: validCategories.has(row.category as Exclude<BookmarkCategory, 'All'>)
            ? (row.category as Exclude<BookmarkCategory, 'All'>)
            : 'To Review',
          note: row.note,
          next: row.next_action,
          status: validStatuses.has(row.status as BookmarkStatus)
            ? (row.status as BookmarkStatus)
            : 'Review',
          contentSeed: row.content_seed || undefined,
          sourceFolder: 'Selfpage',
        })),
      );
    }

    void load();
    const interval = window.setInterval(() => void load(), 5 * 60 * 1000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  return bookmarks;
}
