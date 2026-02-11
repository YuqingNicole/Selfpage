import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { BlogPost } from '@/types/blog';
import { Calendar, Clock } from 'lucide-react';

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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Link to={`/blog/${post.slug}`} className="group block">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-muted">
              <img
                src={post.coverImage}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/blog/${post.slug}`} className="group block space-y-4">
        <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-muted">
          <img
            src={post.coverImage}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading={index < 4 ? 'eager' : 'lazy'}
          />
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
