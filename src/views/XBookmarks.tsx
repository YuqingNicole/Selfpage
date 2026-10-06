'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  Lightbulb,
  Search,
  Sparkles,
} from 'lucide-react';
import {
  bookmarkCategories,
  type BookmarkCategory,
  type BookmarkStatus,
  xBookmarks,
} from '@/data/xBookmarks';
import { useSyncedXBookmarks } from '@/hooks/useSyncedXBookmarks';
import { cn } from '@/lib/utils';

const statusStyles: Record<BookmarkStatus, string> = {
  'Use now': 'border-accent-warm/35 bg-accent-warm-subtle text-foreground',
  Keep: 'border-border bg-background text-muted-foreground',
  Review: 'border-accent-sage/35 bg-accent-sage/10 text-foreground',
  Archive: 'border-border bg-muted/45 text-muted-foreground',
};

export default function XBookmarks() {
  const [category, setCategory] = useState<BookmarkCategory>('All');
  const [query, setQuery] = useState('');
  const syncedBookmarks = useSyncedXBookmarks();

  const allBookmarks = useMemo(() => {
    const byUrl = new Map(xBookmarks.map((item) => [item.url, item]));
    for (const item of syncedBookmarks) {
      if (!byUrl.has(item.url)) byUrl.set(item.url, item);
    }
    return [...byUrl.values()];
  }, [syncedBookmarks]);

  const filteredBookmarks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return allBookmarks.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category;
      const haystack = `${item.title} ${item.author} ${item.handle} ${item.note} ${item.next}`.toLowerCase();
      return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [allBookmarks, category, query]);

  const contentSeeds = allBookmarks.filter((item) => item.contentSeed).length;
  const readyToUse = allBookmarks.filter((item) => item.status === 'Use now').length;

  return (
    <div className="min-h-screen">
      <section className="relative border-b border-border px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/readings"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Readings
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-5 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-accent-warm">
                <Bookmark className="size-3.5" />
                X bookmark library
              </div>
              <h1 className="max-w-3xl text-5xl font-light leading-[0.98] tracking-tight md:text-7xl">
                Saved for a reason.
              </h1>
              <p className="mt-7 max-w-2xl text-base font-light leading-relaxed text-muted-foreground md:text-lg">
                A working index of tools, systems, and ideas worth returning to—organized by what
                they can change, not only by what they are about.
              </p>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-border bg-border"
            >
              {[
                [String(allBookmarks.length), 'saved'],
                [String(readyToUse), 'use now'],
                [String(contentSeeds), 'content seeds'],
              ].map(([value, label]) => (
                <div key={label} className="bg-background px-4 py-5 text-center">
                  <dt className="text-[0.65rem] font-mono uppercase tracking-[0.14em] text-muted-foreground">
                    {label}
                  </dt>
                  <dd className="mt-2 text-2xl font-light">{value}</dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>
      </section>

      <section className="sticky top-16 z-30 border-b border-border bg-background/92 px-6 py-4 backdrop-blur-lg lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1 lg:pb-0">
            {bookmarkCategories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={cn(
                  'whitespace-nowrap rounded-full border px-3.5 py-2 text-xs font-light tracking-wide transition-colors',
                  category === item
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border text-muted-foreground hover:border-foreground/35 hover:text-foreground',
                )}
              >
                {item}
              </button>
            ))}
          </div>

          <label className="relative block w-full lg:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <span className="sr-only">Search bookmarks</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the library"
              className="h-10 w-full rounded-full border border-border bg-background pl-10 pr-4 text-sm font-light outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/40"
            />
          </label>
        </div>
      </section>

      <section className="px-6 py-12 md:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-xs font-mono uppercase tracking-[0.14em] text-muted-foreground">
              {filteredBookmarks.length} {filteredBookmarks.length === 1 ? 'entry' : 'entries'}
            </p>
            <p className="hidden text-xs font-light text-muted-foreground md:block">
              Selfpage folder · syncs about every 5 minutes
            </p>
          </div>

          {filteredBookmarks.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredBookmarks.map((item, index) => (
                <motion.article
                  key={item.url}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: Math.min(index, 8) * 0.035 }}
                  className="group flex min-h-72 flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[0.65rem] font-mono uppercase tracking-[0.14em] text-accent-warm">
                        {item.category}
                      </span>
                      <span className="text-muted-foreground/60">·</span>
                      <span className="text-xs font-light text-muted-foreground">
                        {item.sourceFolder}
                      </span>
                    </div>
                    <span
                      className={cn(
                        'shrink-0 rounded-full border px-2.5 py-1 text-[0.65rem] font-mono uppercase tracking-[0.1em]',
                        statusStyles[item.status],
                      )}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="mt-6">
                    <h2 className="text-xl font-normal leading-snug tracking-tight">{item.title}</h2>
                    <p className="mt-2 text-xs font-light text-muted-foreground">
                      {item.author} <span className="font-mono">{item.handle}</span>
                    </p>
                  </div>

                  <p className="mt-5 text-sm font-light leading-relaxed text-muted-foreground">
                    {item.note}
                  </p>

                  <div className="mt-5 border-l border-accent-warm/45 pl-4">
                    <p className="text-[0.65rem] font-mono uppercase tracking-[0.14em] text-muted-foreground">
                      Next
                    </p>
                    <p className="mt-1.5 text-sm font-light leading-relaxed">{item.next}</p>
                  </div>

                  {item.contentSeed && (
                    <div className="mt-5 rounded-lg bg-accent-warm-subtle p-4">
                      <div className="flex items-center gap-2 text-[0.65rem] font-mono uppercase tracking-[0.14em] text-accent-warm">
                        <Lightbulb className="size-3.5" />
                        Content seed
                      </div>
                      <p className="mt-2 text-sm font-light leading-relaxed">{item.contentSeed}</p>
                    </div>
                  )}

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-mono uppercase tracking-[0.14em] text-muted-foreground transition-colors group-hover:text-foreground"
                  >
                    Open on X
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border px-6 py-20 text-center">
              <Sparkles className="mx-auto size-5 text-muted-foreground" />
              <p className="mt-4 text-sm font-light text-muted-foreground">
                Nothing in this corner of the garden yet.
              </p>
            </div>
          )}
        </div>
      </section>

      <div className="h-20" />
    </div>
  );
}
