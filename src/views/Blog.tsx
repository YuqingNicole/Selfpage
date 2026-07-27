'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { blogPosts as staticPosts } from '@/data/blog';
import { BlogCard } from '@/components/blog/BlogCard';
import { NoteCard } from '@/components/blog/NoteCard';
import { SEOHead } from '@/components/seo/SEOHead';
import { useSubstackPosts, useSubstackNotes } from '@/hooks/useSubstackContent';
import type { BlogPost } from '@/types/blog';

const postCategories: { label: string; value: string }[] = [
  { label: 'All', value: 'all' },
  { label: 'AI', value: 'ai' },
  { label: 'Product', value: 'product' },
  { label: 'Startup', value: 'startup' },
  { label: 'Thinking', value: 'thinking' },
  { label: 'Dev', value: 'dev' },
];

// Convert a Supabase substack_posts row to the BlogPost shape used by BlogCard
function toLocalPost(sp: {
  id: number;
  title: string;
  subtitle: string | null;
  slug: string;
  canonical_url: string | null;
  cover_image: string | null;
  post_date: string | null;
  tags: string[];
  excerpt: string | null;
}): BlogPost {
  // Best-effort category from tags
  const tagLower = (sp.tags ?? []).map((t) => t.toLowerCase());
  const knownCategories = ['ai', 'product', 'startup', 'thinking', 'dev'] as const;
  const category =
    knownCategories.find((c) => tagLower.includes(c)) ?? 'thinking';

  return {
    id: String(sp.id),
    title: sp.title,
    slug: sp.slug,
    excerpt: sp.excerpt ?? sp.subtitle ?? '',
    content: '',
    coverImage:
      sp.cover_image ??
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800',
    category,
    tags: sp.tags ?? [],
    publishedAt: sp.post_date ?? new Date().toISOString(),
    readingTime: '5 min read',
    substackUrl: sp.canonical_url ?? '',
    author: {
      name: 'Nicole Chen',
      avatar:
        'https://substackcdn.com/image/fetch/w_80,h_80,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F481e7d79-a645-405a-84c3-a4897160d3f3_474x474.jpeg',
    },
  };
}

type Tab = 'posts' | 'notes';

export default function Blog() {
  const [tab, setTab] = useState<Tab>('posts');
  const [activeCategory, setActiveCategory] = useState('all');

  // Supabase live data
  const { data: livePosts } = useSubstackPosts();
  const { data: liveNotes, isLoading: notesLoading } = useSubstackNotes();

  // Posts: prefer live Supabase data, fallback to static
  const allPosts: BlogPost[] =
    livePosts && livePosts.length > 0
      ? livePosts.map(toLocalPost)
      : staticPosts;

  const filteredPosts =
    activeCategory === 'all'
      ? allPosts
      : allPosts.filter((p) => p.category === activeCategory);

  return (
    <>
      <SEOHead
        title="Blog - Nicole's Garden"
        description="Thoughts on AI, product building, startups, and the curious journey of growing in the modern world."
      />

      <div className="min-h-screen">
        {/* Publication Header */}
        <section className="pt-32 pb-10 px-6 border-b border-border">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-3"
            >
              <h1
                className="text-4xl md:text-5xl"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic' }}
              >
                Nicole's Garden
              </h1>
              <p
                className="text-muted-foreground leading-relaxed"
                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem' }}
              >
                Thoughts on AI, product building, startups, and the curious journey of growing in the modern world
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tab bar: Posts / Notes */}
        <section className="px-6 border-b border-border sticky top-14 z-20 bg-background/90 backdrop-blur-sm">
          <div className="max-w-2xl mx-auto flex gap-0">
            {(['posts', 'notes'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-3 text-sm transition-colors border-b-2 -mb-px ${
                  tab === t
                    ? 'border-foreground text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em' }}
              >
                {t === 'posts' ? 'Posts' : 'Notes'}
              </button>
            ))}
          </div>
        </section>

        {/* Posts tab */}
        {tab === 'posts' && (
          <>
            {/* Category Filter */}
            <section className="px-6 py-3 border-b border-border bg-background">
              <div className="max-w-2xl mx-auto">
                <div
                  className="flex flex-wrap gap-x-2 gap-y-1.5"
                  role="tablist"
                  aria-label="Filter posts by category"
                >
                  {postCategories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setActiveCategory(cat.value)}
                      role="tab"
                      aria-selected={activeCategory === cat.value}
                      className={`px-3 py-1.5 rounded-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 ${
                        activeCategory === cat.value
                          ? 'bg-foreground text-background'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      style={{ fontSize: '0.72rem', letterSpacing: '0.05em' }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="px-6 pb-24">
              <div className="max-w-2xl mx-auto">
                {filteredPosts.length === 0 ? (
                  <p
                    className="text-center text-muted-foreground py-20"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
                  >
                    No posts in this category yet.
                  </p>
                ) : (
                  <div className="divide-y divide-border">
                    {filteredPosts.map((post, index) => (
                      <BlogCard key={post.id} post={post} index={index} variant="list" />
                    ))}
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {/* Notes tab */}
        {tab === 'notes' && (
          <section className="px-6 pb-24">
            <div className="max-w-2xl mx-auto pt-6">
              {notesLoading ? (
                <div className="py-20 text-center">
                  <p className="text-muted-foreground" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                    Loading...
                  </p>
                </div>
              ) : !liveNotes || liveNotes.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <p
                    className="text-muted-foreground"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}
                  >
                    Notes will appear here after the first sync.
                  </p>
                  <a
                    href="https://substack.com/@nicolewithlove/notes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground transition-colors underline"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}
                  >
                    Read on Substack →
                  </a>
                </div>
              ) : (
                <div>
                  {liveNotes.map((note) => (
                    <NoteCard key={note.id} note={note} />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
