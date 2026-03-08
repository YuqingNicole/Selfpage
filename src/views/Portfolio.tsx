'use client';

import { githubRepos, useCases } from '@/data/github-repos';
import { claudeSkills, skillCategories, getSkillsByCategory } from '@/data/claude-skills';
import { SEOHead } from '@/components/seo/SEOHead';
import { motion } from 'framer-motion';
import { ExternalLink, Star, Terminal, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/data/translations';

/**
 * Skills page — projects, GitHub repos, and use cases
 */
export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const filteredSkills = getSkillsByCategory(activeCategory);
  const { lang } = useLanguage();
  const tr = t[lang].skills;

  return (
    <>
      <SEOHead 
        title="Skills"
        description="Explore my projects, GitHub repositories, and real-world use cases across product, engineering, and design."
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
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

        {/* GitHub Repos Section */}
        <section className="py-12 md:py-16 px-6 lg:px-8 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-light tracking-wide mb-8"
            >
              {tr.githubTitle}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {githubRepos.map((repo, i) => (
                <motion.a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="group block p-6 rounded-lg border border-border bg-card hover:border-foreground/20 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 text-primary">
                      <img src={`https://www.google.com/s2/favicons?domain=${new URL(repo.url).hostname}&sz=32`} alt="" className="size-4 rounded-sm" />
                      <span className="font-medium tracking-wide">{repo.name}</span>
                    </div>
                    <ExternalLink className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed mb-4">
                    {repo.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className="size-2.5 rounded-full bg-primary/60" />
                      {repo.language}
                    </span>
                    {repo.stars !== undefined && (
                      <span className="flex items-center gap-1">
                        <Star className="size-3" />
                        {repo.stars}
                      </span>
                    )}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-12 md:py-16 px-6 lg:px-8 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-light tracking-wide mb-8"
            >
              {tr.useCasesTitle}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {useCases.map((uc, i) => {
                const Wrapper = uc.url ? motion.a : motion.div;
                const linkProps = uc.url ? { href: uc.url, target: '_blank', rel: 'noopener noreferrer' } : {};
                return (
                  <Wrapper
                    key={uc.title}
                    {...linkProps}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={uc.url ? { y: -2 } : undefined}
                    className={`group block p-6 rounded-lg border border-border bg-card${uc.url ? ' hover:border-foreground/20 transition-colors' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-medium tracking-wide">{uc.title}</h3>
                      {uc.url && <ExternalLink className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </div>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed mb-4">
                      {uc.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {uc.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs rounded-full border border-border text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </div>
        </section>

        {/* Claude Skills Section */}
        <section className="py-12 md:py-16 px-6 lg:px-8 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <h2 className="text-2xl md:text-3xl font-light tracking-wide mb-2">
                {tr.claudeSkillsTitle}
              </h2>
              <p className="text-sm text-muted-foreground font-light">
                {claudeSkills.length} skills across {skillCategories.length - 1} categories
              </p>
            </motion.div>

            {/* Onboarding / guidance banner */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="flex items-start gap-4 p-5 rounded-lg border border-border bg-card mb-8"
            >
              <div className="shrink-0 mt-0.5 size-8 rounded-md border border-border flex items-center justify-center">
                <Terminal className="size-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium mb-1">{tr.guideTitle}</p>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {tr.guideBody}{' '}
                  <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">/skill-name</code>{' '}
                  {tr.guideBodyMid}
                </p>
              </div>
            </motion.div>

            {/* Category filter */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {skillCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                    activeCategory === cat
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border text-muted-foreground hover:border-foreground/40'
                  }`}
                >
                  {cat}
                  {cat === 'All' && (
                    <span className="ml-1.5 opacity-60">{claudeSkills.length}</span>
                  )}
                </button>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSkills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.4) }}
                >
                  <Link
                    href={`/skills/${skill.name}`}
                    className="group flex flex-col h-full p-5 rounded-lg border border-border bg-card hover:border-foreground/20 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-mono text-sm font-medium text-primary tracking-tight">
                        /{skill.name}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        <span className="text-xs text-muted-foreground/60 border border-border/50 rounded px-1.5 py-0.5">
                          {skill.category}
                        </span>
                        <ArrowRight className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed mb-3 flex-1">
                      {skill.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {skill.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs rounded-full border border-border text-muted-foreground/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-24" />
      </div>
    </>
  );
}
