'use client';

import { readings, readingTopics } from '@/data/readings';
import { SEOHead } from '@/components/seo/SEOHead';
import { motion } from 'framer-motion';
import { ArrowUpRight, Bookmark, ExternalLink, Search, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/data/translations';
import { Suspense, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { filterReadings, readingSource, topicsForReading, readingPage, readingFilterParams } from '@/lib/reading-search';

const PAGE_SIZE = 10;
const sources = [...new Set(readings.map(readingSource).filter(Boolean))].sort();
const sourceLabel = (source: string) => source === 'mp.weixin.qq.com' ? 'WeChat / 微信公众号' : source;


function ReadingsContent() {
  const { lang } = useLanguage();
  const tr = t[lang].readings;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get('q') || '';
  const topic = readingTopics.some((item) => item.id === searchParams.get('topic'))
    ? searchParams.get('topic')! : '';
  const source = sources.includes(searchParams.get('source') || '') ? searchParams.get('source')! : '';
  const filteredReadings = useMemo(() => filterReadings(readings, query, topic, source), [query, topic, source]);
  const totalPages = Math.max(1, Math.ceil(filteredReadings.length / PAGE_SIZE));
  const currentPage = readingPage(searchParams.get('page'), totalPages);
  const pagedReadings = filteredReadings.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const topicCounts = useMemo(() => {
    const matches = filterReadings(readings, query, '', source);
    return new Map<string, number>(readingTopics.map(({ id }) => [id, matches.filter((item) => topicsForReading(item).includes(id)).length]));
  }, [query, source]);
  const hasFilters = Boolean(query || topic || source);
  const zh = lang === 'zh';
  const updateFilters = (changes: Record<string, string>, replace = false) => {
    // Native history integrates with Next's search params without a server navigation
    // on every keystroke. Read the current URL to keep rapid updates atomic.
    const params = readingFilterParams(window.location.search, changes);
    const href = params ? `${pathname}?${params}` : pathname;
    if (replace) window.history.replaceState(null, '', href);
    else window.history.pushState(null, '', href);
  };
  const resetFilters = () => updateFilters({ q: '', topic: '', source: '' });

  const pageItems = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, 'ellipsis', totalPages] as const;
    if (currentPage >= totalPages - 2) return [1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages] as const;
    return [1, 'ellipsis-left', currentPage - 1, currentPage, currentPage + 1, 'ellipsis-right', totalPages] as const;
  }, [currentPage, totalPages]);

  const buildPageHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  const goToPage = (page: number) => {
    router.push(buildPageHref(page));
  };

  return (
    <>
      <SEOHead title={tr.pageTitle} description={tr.pageSub} />

      <div className="min-h-screen">
        <section className="relative py-24 md:py-32 px-6 lg:px-8 border-b border-border">
          <div className="max-w-7xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4">
                {tr.pageTitle}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
                {tr.pageSub}
              </p>
              <Link
                href="/readings/bookmarks"
                className="group mx-auto mt-8 inline-flex items-center gap-3 rounded-full border border-border px-5 py-2.5 text-xs font-mono uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                <Bookmark className="size-3.5" />
                X bookmark library
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-16 px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 space-y-5">
              <div>
                <label htmlFor="reading-search" className="mb-2 block text-sm font-medium">
                  {zh ? '搜索阅读' : 'Search readings'}
                </label>
                <div className="relative">
                  <Search aria-hidden="true" className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <input
                    id="reading-search"
                    type="search"
                    value={query}
                    onChange={(event) => updateFilters({ q: event.target.value }, true)}
                    placeholder={zh ? '标题、作者、来源或摘要…' : 'Title, author, source or summary…'}
                    aria-describedby="reading-search-help"
                    className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-12 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  {query && <button type="button" onClick={() => updateFilters({ q: '' }, true)} aria-label={zh ? '清除搜索' : 'Clear search'} className="absolute right-1 top-0.5 rounded-md p-3 text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"><X aria-hidden="true" className="size-4" /></button>}
                </div>
                <p id="reading-search-help" className="mt-2 text-xs text-muted-foreground">
                  {zh ? '多个关键词用空格分隔，可跨标题、作者和摘要匹配。搜索仅覆盖本页收藏，不含 X 书签。' : 'Separate keywords with spaces to match across fields. Searches this reading collection, not X bookmarks.'}
                </p>
              </div>
              <fieldset>
                <legend className="mb-2 text-sm font-medium">{zh ? '按主题浏览' : 'Browse by topic'}</legend>
                <div className="flex flex-wrap gap-2">
                  {[{ id: '', zh: '全部', en: 'All' }, ...readingTopics].map((item) => (
                    <button key={item.id} type="button" aria-pressed={topic === item.id}
                      onClick={() => updateFilters({ topic: item.id })}
                      className={`rounded-full border px-3 py-2 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${topic === item.id ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground'}`}>
                      {item[lang]} <span className="ml-1 tabular-nums">{item.id ? topicCounts.get(item.id) : filterReadings(readings, query, '', source).length}</span>
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{zh ? '主题按已保存的标题与摘要整理，一篇可属于多个主题；信息不足的保留在待分类。' : 'Topics follow saved titles and summaries; an article may span topics. Unverified entries stay unsorted.'}</p>
              </fieldset>
              <div className="flex flex-wrap items-center gap-3">
                <label htmlFor="reading-source" className="text-sm">{zh ? '来源' : 'Source'}</label>
                <select id="reading-source" value={source} onChange={(event) => updateFilters({ source: event.target.value })} className="min-w-0 max-w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring">
                  <option value="">{zh ? '全部来源' : 'All sources'}</option>
                  {sources.map((value) => <option key={value} value={value}>{sourceLabel(value)}</option>)}
                </select>
                {hasFilters && <button type="button" onClick={resetFilters} className="rounded text-sm underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-ring">{zh ? '重置全部' : 'Reset all'}</button>}
              </div>
              <p role="status" aria-live="polite" aria-atomic="true" className="text-sm text-muted-foreground">
                {zh ? `共 ${filteredReadings.length} / ${readings.length} 篇` : `${filteredReadings.length} of ${readings.length} readings`}
                {filteredReadings.length > 0 && (zh ? ` · 显示 ${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, filteredReadings.length)}` : ` · Showing ${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, filteredReadings.length)}`)}
              </p>
            </div>
            {filteredReadings.length > 0 ? (
              <>
                <ul className="divide-y divide-border border-y border-border">
                  {pagedReadings.map((item, i) => (
                    <motion.li
                      key={item.url}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                    >
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-4 py-5 transition-colors"
                      >
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${new URL(item.url).hostname}&sz=32`}
                          alt=""
                          className="size-5 rounded-sm mt-1 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                            <span className="font-medium tracking-wide group-hover:text-foreground/80">
                              {item.title}
                            </span>
                            <span className="text-xs text-muted-foreground font-light sm:max-w-[40%] sm:text-right">
                              {item.author}
                            </span>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {topicsForReading(item).map((id) => <span key={id} className="rounded border border-border px-1.5 py-0.5 text-[11px] text-muted-foreground">{readingTopics.find((entry) => entry.id === id)?.[lang]}</span>)}
                            {item.tags?.map((tag) => <span key={tag} className="text-[11px] text-muted-foreground">#{tag}</span>)}
                          </div>
                          {item.description && (
                            <p className="mt-1 text-sm text-muted-foreground font-light leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <ExternalLink className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                      </a>
                    </motion.li>
                  ))}
                </ul>

                {totalPages > 1 && (
                  <div className="mt-8 space-y-3">
                    <p className="text-center text-sm text-muted-foreground font-light">
                      {zh ? `第 ${currentPage} / ${totalPages} 页` : `Page ${currentPage} of ${totalPages}`}
                    </p>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href={buildPageHref(Math.max(1, currentPage - 1))}
                            onClick={(e) => {
                              e.preventDefault();
                              if (currentPage > 1) goToPage(currentPage - 1);
                            }}
                            className={currentPage === 1 ? 'pointer-events-none opacity-40' : ''}
                          />
                        </PaginationItem>

                        {pageItems.map((page, index) =>
                          typeof page === 'number' ? (
                            <PaginationItem key={page}>
                              <PaginationLink
                                href={buildPageHref(page)}
                                isActive={page === currentPage}
                                onClick={(e) => {
                                  e.preventDefault();
                                  goToPage(page);
                                }}
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          ) : (
                            <PaginationItem key={`${page}-${index}`}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          ),
                        )}

                        <PaginationItem>
                          <PaginationNext
                            href={buildPageHref(Math.min(totalPages, currentPage + 1))}
                            onClick={(e) => {
                              e.preventDefault();
                              if (currentPage < totalPages) goToPage(currentPage + 1);
                            }}
                            className={currentPage === totalPages ? 'pointer-events-none opacity-40' : ''}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-lg border border-dashed border-border px-5 py-12 text-center">
                <p className="font-medium">{zh ? '没有找到匹配的阅读' : 'No matching readings'}</p>
                <p className="mt-2 text-sm text-muted-foreground">{zh ? '试试更少的关键词，或移除主题和来源限制。' : 'Try fewer keywords, or remove the topic and source filters.'}</p>
                <button type="button" onClick={resetFilters} className="mt-5 rounded-md border border-border px-4 py-2 text-sm hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring">{zh ? '查看全部阅读' : 'View all readings'}</button>
              </div>
            )}
          </div>
        </section>

        <div className="h-24" />
      </div>
    </>
  );
}

export default function Readings() {
  return (
    <Suspense fallback={null}>
      <ReadingsContent />
    </Suspense>
  );
}
