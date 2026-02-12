import { useState } from 'react';
import { motion } from 'framer-motion';
import { blogPosts, getBlogPostsByCategory } from '@/data/blog';
import { BlogCard } from '@/components/blog/BlogCard';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { BlogCategory } from '@/types/blog';

const categories: { label: string; value: string }[] = [
  { label: 'All', value: 'all' },
  { label: 'AI', value: 'ai' },
  { label: 'Product', value: 'product' },
  { label: 'Startup', value: 'startup' },
  { label: 'Thinking', value: 'thinking' },
  { label: 'Dev', value: 'dev' },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const filteredPosts = getBlogPostsByCategory(activeCategory);
  const featuredPost = activeCategory === 'all' ? blogPosts[0] : filteredPosts[0];
  const remainingPosts = activeCategory === 'all' ? blogPosts.slice(1) : filteredPosts.slice(1);

  return (
    <>
      <SEOHead
        title="Blog - Nicole's Garden"
        description="分享AI时代的思考，有关产品、创投以及各种人生进化路上的故事。"
      />

      <div className="min-h-screen">
        {/* Header */}
        <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-border">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0.8, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4">
                🟣 Nicole's Garden
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">
                分享AI时代的思考，有关产品、创投以及各种人生进化路上的故事
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="px-6 lg:px-8 py-8 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-2 text-sm font-light tracking-wide rounded-sm transition-all duration-300 ${
                    activeCategory === cat.value
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="px-6 lg:px-8 py-16 md:py-20 border-b border-border">
            <div className="max-w-6xl mx-auto">
              <BlogCard post={featuredPost} featured index={0} />
            </div>
          </section>
        )}

        {/* Posts Grid */}
        {remainingPosts.length > 0 && (
          <section className="px-6 lg:px-8 py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {remainingPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index + 1} />
                ))}
              </div>
            </div>
          </section>
        )}

        {filteredPosts.length === 0 && (
          <section className="px-6 lg:px-8 py-24">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-muted-foreground font-light">
                No posts found in this category yet.
              </p>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
