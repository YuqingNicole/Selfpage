import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useBlogAdmin } from '@/hooks/useBlogAdmin';
import { BlogCard } from '@/components/blog/BlogCard';
import { AdminLoginDialog } from '@/components/blog/AdminLoginDialog';
import { SEOHead } from '@/components/seo/SEOHead';
import type { BlogCategory } from '@/types/blog';
import { Settings, LogOut, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

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
  const [showLogin, setShowLogin] = useState(false);
  const { isAdmin, login, logout, getPassword } = useAdminAuth();
  const { verifyPassword, deletePost } = useBlogAdmin(getPassword);
  const { data: posts = [], isLoading } = useBlogPosts(activeCategory);
  const navigate = useNavigate();

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  const handleNewPost = async () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    const slug = `new-post-${Date.now()}`;
    const res = await fetch(`${supabaseUrl}/functions/v1/blog-admin?action=upsert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'x-admin-password': getPassword(),
      },
      body: JSON.stringify({
        title: '新文章标题',
        slug,
        excerpt: '文章摘要...',
        content: '在这里写正文...',
        cover_image: '',
        category: 'thinking',
        tags: [],
        reading_time: '5 min read',
        substack_url: '',
        author_name: 'Nicole Chen',
        author_avatar: '',
      }),
    });
    if (res.ok) {
      navigate(`/blog/${slug}`);
    }
  };

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

            {/* Admin Controls */}
            <div className="flex justify-center gap-2">
              {!isAdmin ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLogin(true)}
                  className="text-muted-foreground/40 hover:text-muted-foreground text-xs"
                >
                  <Settings className="size-3 mr-1" />
                  管理
                </Button>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={handleNewPost} className="gap-1">
                    <Plus className="size-3" /> 新建文章
                  </Button>
                  <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground gap-1">
                    <LogOut className="size-3" /> 退出管理
                  </Button>
                </>
              )}
            </div>
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

        {isLoading ? (
          <section className="px-6 lg:px-8 py-24">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-muted-foreground font-light">Loading...</p>
            </div>
          </section>
        ) : (
          <>
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

            {posts.length === 0 && (
              <section className="px-6 lg:px-8 py-24">
                <div className="max-w-4xl mx-auto text-center">
                  <p className="text-lg text-muted-foreground font-light">
                    No posts found in this category yet.
                  </p>
                </div>
              </section>
            )}
          </>
        )}
      </div>

      <AdminLoginDialog
        open={showLogin}
        onOpenChange={setShowLogin}
        onLogin={login}
        verifyPassword={verifyPassword}
      />
    </>
  );
}
