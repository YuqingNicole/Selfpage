'use client';

import { readings } from '@/data/readings';
import { SEOHead } from '@/components/seo/SEOHead';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/data/translations';

export default function Readings() {
  const { lang } = useLanguage();
  const tr = t[lang].readings;

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
              <ul className="divide-y divide-border border-y border-border">
                {readings.map((item, i) => (
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
