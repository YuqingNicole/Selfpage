import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { BlogPost } from '@/types/blog';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { staggerChildVariants } from '@/components/ui/ScrollReveal';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  featured?: boolean;
}

export function BlogCard({ post, index = 0, featured = false }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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
              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground font-light">
                <span className="uppercase tracking-widest text-xs font-medium text-foreground/70">
                  {post.category}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  {formattedDate}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide leading-tight group-hover:text-muted-foreground transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground font-light leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-light">
                <Clock className="size-3.5" />
                {post.readingTime}
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

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
          {/* Read indicator */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <div className="bg-background/90 backdrop-blur-sm rounded-full p-2">
              <ArrowUpRight className="size-4 text-foreground" />
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-muted-foreground font-light">
            <span className="uppercase tracking-widest text-xs font-medium text-foreground/70">
              {post.category}
            </span>
            <span>·</span>
            <span>{formattedDate}</span>
          </div>
          <h3 className="text-xl font-light tracking-wide leading-snug group-hover:text-muted-foreground transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground font-light leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-light">
            <Clock className="size-3" />
            {post.readingTime}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
