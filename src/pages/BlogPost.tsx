import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, ExternalLink } from 'lucide-react';
import { getBlogPostBySlug, getRelatedPosts } from '@/data/blog';
import { BlogCard } from '@/components/blog/BlogCard';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Separator } from '@/components/ui/separator';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-light tracking-wide">Post Not Found</h1>
          <p className="text-muted-foreground font-light">
            The article you're looking for doesn't exist.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors font-light"
          >
            <ArrowLeft className="size-4" />
            Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const relatedPosts = getRelatedPosts(post.slug);

  // Simple markdown-like rendering for content
  const renderContent = (content: string) => {
    return content.split('\n\n').map((block, i) => {
      if (block.startsWith('## ')) {
        return (
          <h2 key={i} className="text-2xl md:text-3xl font-light tracking-wide mt-12 mb-4">
            {block.replace('## ', '')}
          </h2>
        );
      }
      if (block.startsWith('1. ') || block.match(/^\d+\./)) {
        const items = block.split('\n').filter(Boolean);
        return (
          <ol key={i} className="list-decimal list-inside space-y-2 text-base md:text-lg font-light leading-relaxed text-muted-foreground">
            {items.map((item, j) => (
              <li key={j}>{item.replace(/^\d+\.\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1')}</li>
            ))}
          </ol>
        );
      }
      return (
        <p key={i} className="text-base md:text-lg font-light leading-relaxed text-muted-foreground">
          {block}
        </p>
      );
    });
  };

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.excerpt}
        image={post.coverImage}
      />

      <div className="min-h-screen">
        {/* Back Link */}
        <div className="px-6 lg:px-8 pt-24 pb-4">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-light tracking-wide"
            >
              <ArrowLeft className="size-4" />
              Back to Journal
            </Link>
          </div>
        </div>

        {/* Article Header */}
        <header className="px-6 lg:px-8 pb-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4 text-sm text-muted-foreground font-light">
                <span className="uppercase tracking-widest text-xs font-medium text-foreground/70">
                  {post.category}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  {formattedDate}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  {post.readingTime}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-tight">
                {post.title}
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                {post.excerpt}
              </p>
            </motion.div>
          </div>
        </header>

        {/* Cover Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="px-6 lg:px-8 pb-12"
        >
          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-[2/1] overflow-hidden rounded-sm bg-muted">
              <img
                src={post.coverImage}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Article Content */}
        <article className="px-6 lg:px-8 pb-16">
          <div className="max-w-3xl mx-auto space-y-6">
            {renderContent(post.content)}
          </div>
        </article>

        {/* Tags & Substack Link */}
        <div className="px-6 lg:px-8 pb-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-light tracking-wide text-muted-foreground border border-border rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            {post.substackUrl && (
              <a
                href={post.substackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-light tracking-wide"
              >
                Read on Substack
                <ExternalLink className="size-3.5" />
              </a>
            )}
          </div>
        </div>

        <Separator className="max-w-3xl mx-auto" />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="px-6 lg:px-8 py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <h2 className="text-2xl md:text-3xl font-light tracking-wide text-center mb-12">
                  Related Articles
                </h2>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                {relatedPosts.map((rp, i) => (
                  <BlogCard key={rp.id} post={rp} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
