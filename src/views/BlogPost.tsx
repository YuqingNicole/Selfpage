'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getBlogPostBySlug, getRelatedPosts } from '@/data/blog';
import { BlogCard } from '@/components/blog/BlogCard';
import { SEOHead } from '@/components/seo/SEOHead';

// Inline text renderer: handles **bold**, `code`, plain text
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded text-sm"
          style={{ background: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85em' }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function renderContent(content: string) {
  const blocks = content.split('\n\n');
  return blocks.map((block, i) => {
    // H2
    if (block.startsWith('## ')) {
      return (
        <h2
          key={i}
          className="mt-10 mb-4 text-2xl leading-snug"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
        >
          {block.replace('## ', '')}
        </h2>
      );
    }
    // H3
    if (block.startsWith('### ')) {
      return (
        <h3
          key={i}
          className="mt-8 mb-3 text-xl leading-snug"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
        >
          {block.replace('### ', '')}
        </h3>
      );
    }
    // Ordered list
    if (block.match(/^(\d+\.|[-•])\s/m)) {
      const isOrdered = block.match(/^\d+\./);
      const items = block.split('\n').filter(Boolean);
      const ListTag = isOrdered ? 'ol' : 'ul';
      return (
        <ListTag
          key={i}
          className={`space-y-2 text-base leading-relaxed text-foreground/85 ${isOrdered ? 'list-decimal' : 'list-disc'} list-inside`}
        >
          {items.map((item, j) => (
            <li key={j}>{renderInline(item.replace(/^(\d+\.|-|•)\s*/, ''))}</li>
          ))}
        </ListTag>
      );
    }
    // Code block (``` ... ```)
    if (block.startsWith('```')) {
      const lines = block.split('\n');
      const lang = lines[0].replace('```', '').trim();
      const code = lines.slice(1, lines[lines.length - 1] === '```' ? -1 : undefined).join('\n');
      return (
        <div key={i} className="rounded-md overflow-hidden my-2">
          {lang && (
            <div
              className="px-4 py-1.5 text-xs text-muted-foreground border-b border-border"
              style={{ background: 'var(--muted)', fontFamily: 'var(--font-mono)' }}
            >
              {lang}
            </div>
          )}
          <pre
            className="p-4 overflow-x-auto text-sm leading-relaxed"
            style={{ background: 'hsl(240 10% 6%)', color: 'hsl(0 0% 90%)', fontFamily: 'var(--font-mono)' }}
          >
            <code>{code}</code>
          </pre>
        </div>
      );
    }
    // Regular paragraph
    if (block.trim()) {
      return (
        <p key={i} className="text-base leading-[1.8] text-foreground/85">
          {renderInline(block)}
        </p>
      );
    }
    return null;
  });
}

export default function BlogPost() {
  const params = useParams();
  const slug = params?.slug as string;
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
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to Garden
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const relatedPosts = getRelatedPosts(post.slug);

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.excerpt}
        image={post.coverImage}
        type="article"
        publishedTime={post.publishedAt}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          image: post.coverImage,
          datePublished: post.publishedAt,
          url: `https://nicoles.garden/blog/${post.slug}`,
          author: { '@type': 'Person', name: 'Nicole Chen', url: 'https://nicoles.garden' },
          publisher: { '@type': 'Person', name: 'Nicole Chen', url: 'https://nicoles.garden' },
        }}
      />

      <div className="min-h-screen">
        {/* Back nav */}
        <div className="px-6 pt-24 pb-6">
          <div className="max-w-2xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.06em' }}
            >
              <ArrowLeft className="size-3.5" />
              Nicole's Garden
            </Link>
          </div>
        </div>

        {/* Article header */}
        <header className="px-6 pb-8">
          <div className="max-w-2xl mx-auto space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-5"
            >
              {/* Category + meta */}
              <div
                className="flex flex-wrap items-center gap-2.5"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em' }}
              >
                <span
                  className="uppercase px-2.5 py-1 rounded-sm"
                  style={{ background: 'var(--accent-warm-muted)', color: 'var(--accent-warm)' }}
                >
                  {post.category}
                </span>
                <span className="text-muted-foreground">{formattedDate}</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">{post.readingTime}</span>
              </div>

              {/* Title */}
              <h1
                className="text-3xl md:text-4xl leading-tight"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
              >
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-base text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>

              {/* Author row */}
              <div className="flex items-center gap-3 pt-1">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium leading-none mb-0.5">{post.author.name}</p>
                  <p className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>
                    {formattedDate}
                  </p>
                </div>
                {post.substackUrl && (
                  <a
                    href={post.substackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto inline-flex items-center gap-1.5 text-xs border border-border rounded-sm px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    Substack
                    <ExternalLink className="size-3" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </header>

        {/* Cover image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="px-6 pb-10"
        >
          <div className="max-w-2xl mx-auto">
            <div
              className="overflow-hidden bg-muted"
              style={{ borderRadius: '6px', aspectRatio: '868 / 536' }}
            >
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Article body */}
        <article className="px-6 pb-12">
          <div
            className="max-w-2xl mx-auto space-y-5 text-foreground"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {renderContent(post.content)}
          </div>
        </article>

        {/* Tags */}
        <div className="px-6 pb-12">
          <div className="max-w-2xl mx-auto">
            <div className="pt-6 border-t border-border flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-default"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="px-6 py-12 border-t border-border">
            <div className="max-w-2xl mx-auto">
              <h2
                className="text-lg mb-0"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
              >
                Related Articles
              </h2>
              <div className="divide-y divide-border">
                {relatedPosts.map((rp, i) => (
                  <BlogCard key={rp.id} post={rp} index={i} variant="list" />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
