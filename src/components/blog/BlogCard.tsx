import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { BlogPost } from '@/types/blog';
import { Clock, ArrowUpRight } from 'lucide-react';
import { staggerChildVariants } from '@/components/ui/ScrollReveal';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  featured?: boolean;
  variant?: 'card' | 'list';
}

export function BlogCard({ post, index = 0, featured = false, variant = 'card' }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  // List variant — editorial vertical list (used in Blog.tsx)
  if (variant === 'list') {
    return (
      <motion.article
        variants={staggerChildVariants}
        className="group"
      >
        <Link to={`/blog/${post.slug}`} className="flex gap-6 py-7 items-start">
          {/* Content */}
          <div className="flex-1 min-w-0 space-y-2">
            <div
              className="flex items-center gap-2.5 flex-wrap"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em' }}
            >
              <span
                className="uppercase px-2 py-0.5 rounded-sm"
                style={{ background: 'var(--accent-warm-muted)', color: 'var(--accent-warm)' }}
              >
                {post.category}
              </span>
              <span className="text-muted-foreground">{formattedDate}</span>
              <span className="text-muted-foreground flex items-center gap-1">
                <Clock className="size-3" />
                {post.readingTime}
              </span>
            </div>
            <h3
              className="text-lg leading-snug group-hover:text-muted-foreground transition-colors duration-200"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '1.25rem' }}
            >
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
          </div>
          {/* Thumbnail */}
          <div className="flex-shrink-0 w-24 h-16 md:w-32 md:h-20 overflow-hidden rounded-[4px] bg-muted">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading={index < 6 ? 'eager' : 'lazy'}
            />
          </div>
        </Link>
      </motion.article>
    );
  }

  // Featured card variant
  if (featured) {
    return (
      <motion.article
        variants={staggerChildVariants}
      >
        <Link to={`/blog/${post.slug}`} className="group block">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-muted">
              <img
                src={post.coverImage}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.15em' }}>
                <span
                  className="uppercase text-foreground/80 px-2 py-0.5 rounded-sm"
                  style={{ background: 'var(--accent-warm-muted)', color: 'var(--accent-warm)' }}
                >
                  {post.category}
                </span>
                <span className="text-muted-foreground">{formattedDate}</span>
              </div>
              <h2
                className="text-2xl md:text-3xl tracking-wide leading-tight group-hover:text-muted-foreground transition-colors"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
              >
                {post.title}
              </h2>
              <p className="text-muted-foreground font-light leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-1.5 text-muted-foreground" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
                <Clock className="size-3" />
                {post.readingTime}
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  // Default card variant (used in Home.tsx)
  return (
    <motion.article
      variants={staggerChildVariants}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link to={`/blog/${post.slug}`} className="group block space-y-4">
        <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-muted">
          <img
            src={post.coverImage}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading={index < 4 ? 'eager' : 'lazy'}
          />
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <div className="bg-background/90 backdrop-blur-sm rounded-full p-2">
              <ArrowUpRight className="size-4 text-foreground" />
            </div>
          </div>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center gap-2.5" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.12em' }}>
            <span
              className="uppercase px-2 py-0.5 rounded-sm"
              style={{ background: 'var(--accent-warm-muted)', color: 'var(--accent-warm)' }}
            >
              {post.category}
            </span>
            <span className="text-muted-foreground">{formattedDate}</span>
          </div>
          <h3
            className="text-xl tracking-wide leading-snug group-hover:text-muted-foreground transition-colors"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
          >
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground font-light leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
          <span className="inline-flex items-center gap-1.5 text-muted-foreground" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem' }}>
            <Clock className="size-3" />
            {post.readingTime}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
