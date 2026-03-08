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
            hidden: { opacity: 0, y: 40, rotateX: -90 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: { type: 'spring' as const, stiffness: 100, damping: 12 },
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
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <ScrollReveal spring>
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div className="h-px w-12 bg-border" />
                  <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>{tr.aboutLabel}</span>
                  <div className="h-px w-12 bg-border" />
                </div>
                <h2
                  className="text-3xl md:text-5xl tracking-wide"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
                >
                  {tr.aboutTitle}
                </h2>
                <div className="space-y-4 text-lg font-light leading-relaxed text-muted-foreground max-w-3xl mx-auto">
                  <p>{tr.biography}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-24 md:py-32 border-t border-border">
          <ScrollReveal direction="up" spring>
            <div className="text-center mb-16 space-y-4 px-6">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="h-px w-12 bg-border" />
                <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>{tr.workLabel}</span>
                <div className="h-px w-12 bg-border" />
              </div>
              <h2
                className="text-4xl md:text-5xl tracking-wide"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
              >
                {tr.featuredProjects}
              </h2>
              <p className="text-base text-muted-foreground font-light tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
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
                className="group inline-flex items-center gap-2 text-lg font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors"
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
              {/* Decorative accent line */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-8 bg-border" />
                <span style={{ color: 'var(--accent-warm)', fontSize: '1.2rem' }}>✦</span>
                <div className="h-px w-8 bg-border" />
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
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-10" stagger={0.1}>
              {recentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </StaggerReveal>
          </div>

          <ScrollReveal delay={0.3} spring>
            <div className="flex justify-center mt-16 px-6">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-lg font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors"
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
