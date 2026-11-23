'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { photographerInfo } from '@/data/photographer';
import { getFeaturedProjects } from '@/data/projects';
import { getRecentPosts } from '@/data/blog';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { BlogCard } from '@/components/blog/BlogCard';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { ScrollReveal, StaggerReveal } from '@/components/ui/ScrollReveal';
import { SEOHead } from '@/components/seo/SEOHead';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/data/translations';

// Letter-by-letter stagger for hero title
function AnimatedTitle({ text }: { text: string }) {
  return (
    <motion.h1
      className="text-5xl md:text-8xl lg:text-9xl tracking-widest text-foreground whitespace-nowrap italic"
      style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.04, delayChildren: 0.3 } },
      }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const recentPosts = getRecentPosts(3);
  const heroRef = useRef(null);
  const { lang } = useLanguage();
  const tr = t[lang].home;
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const _heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <>
      <SEOHead />
      
      <div className="min-h-screen">
        {/* Hero Section with parallax */}
        <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
          {/* Layered atmospheric background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          {/* Warm radial glow — top center */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 50% at 50% -10%, var(--accent-warm-subtle) 0%, transparent 70%)',
            }}
          />
          {/* Subtle secondary warm spot — bottom left */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background: 'radial-gradient(ellipse 50% 40% at 15% 90%, var(--accent-warm-muted) 0%, transparent 70%)',
            }}
          />

          <motion.div
            className="relative h-full flex flex-col items-center justify-center px-6"
            style={{ opacity: heroOpacity, y: heroTextY }}
          >
            <div className="text-center space-y-6 max-w-4xl">
              <AnimatedTitle text={photographerInfo.name.toUpperCase()} />
              
              <motion.p
                className="text-base md:text-lg tracking-[0.25em] uppercase text-foreground/60"
                style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.2em' }}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <span style={{ color: 'var(--accent-warm)' }}>·</span>{' '}
                {tr.tagline}
                {' '}<span style={{ color: 'var(--accent-warm)' }}>·</span>
              </motion.p>

              <motion.p
                className="text-base md:text-lg font-light leading-relaxed text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                {tr.heroIntro}
              </motion.p>
            </div>

            <motion.div
              className="absolute bottom-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <ScrollIndicator />
            </motion.div>
          </motion.div>
        </section>

        {/* Introduction Section */}
        <section className="py-24 md:py-32 px-6 lg:px-8 bg-background">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal spring>
              <div className="space-y-5">
                <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{tr.aboutLabel}</span>
                <h2
                  className="text-3xl md:text-5xl tracking-wide"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
                >
                  {tr.aboutTitle}
                </h2>
                <p className="text-lg font-light leading-relaxed text-muted-foreground">{tr.biography}</p>
                <div className="flex items-start gap-4 rounded-3xl border border-border bg-background p-4 sm:gap-5 sm:p-6"
                  style={{ backgroundImage: 'linear-gradient(135deg, var(--accent-warm-muted), transparent 80%)' }}
                >
                  <div className="shrink-0 -rotate-6 rounded-2xl bg-background p-2.5 shadow-sm">
                    <svg aria-hidden="true" width="42" height="42" viewBox="0 0 44 44" fill="none">
                      <path d="M10 10v13a12 12 0 0 0 24 0V10" stroke="#c76c61" strokeWidth="8" strokeLinecap="round" />
                      <path d="M10 10v5m24-5v5" stroke="#82a39c" strokeWidth="8" strokeLinecap="round" />
                      <path d="m22 8 1.4 3.6L27 13l-3.6 1.4L22 18l-1.4-3.6L17 13l3.6-1.4L22 8Z" fill="#c58c3d" />
                    </svg>
                  </div>
                  <div className="min-w-0 space-y-2">
                    <p className="text-xs tracking-widest uppercase text-muted-foreground">{lang === 'zh' ? '我的播客' : 'My podcast'}</p>
                    <h3 className="break-words text-xl font-medium">
                      {lang === 'zh' ? '创新磁场' : 'InnovateMagnet'}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {lang === 'zh'
                        ? '和做产品、创业、做社区的人聊聊，他们的点子是怎么落地的。'
                        : 'Conversations with people building products, businesses, and communities about how they put their ideas into practice.'}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1 text-sm">
                      <a className="inline-flex min-h-10 items-center rounded-full border border-border bg-background px-3 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" href="https://www.xiaoyuzhoufm.com/podcast/6690ef48f0e0f244ed4a172b">
                        {lang === 'zh' ? '小宇宙' : 'Xiaoyuzhou'}
                      </a>
                      <a className="inline-flex min-h-10 items-center rounded-full border border-border bg-background px-3 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" href="https://podcasts.apple.com/us/podcast/id1760664714">
                        {lang === 'zh' ? 'Apple 播客' : 'Apple Podcasts'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-24 md:py-32 border-t border-border">
          <ScrollReveal direction="up" spring>
            <div className="mb-16 space-y-3 px-6 max-w-6xl mx-auto">
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>{tr.workLabel}</span>
              <h2
                className="text-4xl md:text-5xl tracking-wide"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
              >
                {tr.featuredProjects}
              </h2>
              <p className="text-muted-foreground font-light tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                {tr.featuredSub}
              </p>
            </div>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4" stagger={0.12}>
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                aspectRatio="landscape"
                showCategory={true}
              />
            ))}
          </StaggerReveal>

          <ScrollReveal delay={0.3} spring>
            <div className="flex justify-center mt-16 px-6">
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-2 text-lg font-light tracking-wide text-foreground hover:text-foreground/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              >
                <span>{tr.viewAll}</span>
                <motion.span
                  className="inline-block"
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring' as const, stiffness: 300, damping: 15 }}
                >
                  <ArrowRight className="size-5" />
                </motion.span>
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* Recent Blog Posts Section */}
        <section className="py-24 md:py-32 border-t border-border relative overflow-hidden" style={{ background: 'var(--accent-warm-subtle)' }}>
          {/* Warm background accent */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% 0%, var(--accent-warm-muted) 0%, transparent 60%)',
              opacity: 0.5,
            }}
          />
          <ScrollReveal direction="up" spring>
            <div className="text-center mb-16 space-y-4 px-6 relative">
              <div className="mb-4">
                <span style={{ color: 'var(--accent-warm)', fontSize: '1.2rem' }}>✦</span>
              </div>
              <h2
                className="text-4xl md:text-5xl tracking-wide"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
              >
                {tr.gardenTitle}
              </h2>
              <p className="text-muted-foreground font-light tracking-[0.15em] uppercase" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                {tr.gardenSub}
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <ScrollReveal spring>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-start">
                <div className="md:col-span-2">
                  <BlogCard post={recentPosts[0]} featured />
                </div>
                <div className="flex flex-col gap-8 justify-between">
                  {recentPosts.slice(1).map((post, i) => (
                    <BlogCard key={post.id} post={post} index={i + 1} variant="list" />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.3} spring>
            <div className="flex justify-center mt-16 px-6">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-lg font-light tracking-wide text-foreground hover:text-foreground/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              >
                <span>{tr.readAll}</span>
                <motion.span
                  className="inline-block"
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring' as const, stiffness: 300, damping: 15 }}
                >
                  <ArrowRight className="size-5" />
                </motion.span>
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </>
  );
}
