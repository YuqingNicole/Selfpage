'use client';

import { readings } from '@/data/readings';
import { SEOHead } from '@/components/seo/SEOHead';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/data/translations';
import { Suspense, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const PAGE_SIZE = 10;

function ReadingsContent() {
  const { lang } = useLanguage();
  const tr = t[lang].readings;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.max(1, Math.ceil(readings.length / PAGE_SIZE));
  const rawPage = Number(searchParams.get('page') || '1');
  const currentPage = Number.isFinite(rawPage)
    ? Math.min(Math.max(1, rawPage), totalPages)
    : 1;

  const pagedReadings = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return readings.slice(start, start + PAGE_SIZE);
  }, [currentPage]);

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
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-16 px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {readings.length > 0 ? (
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
                          <div className="flex items-baseline justify-between gap-4">
                            <span className="font-medium tracking-wide group-hover:text-foreground/80">
                              {item.title}
                            </span>
                            <span className="text-xs text-muted-foreground font-light whitespace-nowrap">
                              {item.author}
                            </span>
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
                      Page {currentPage} of {totalPages}
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
              <p className="text-sm text-muted-foreground font-light">{tr.empty}</p>
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
