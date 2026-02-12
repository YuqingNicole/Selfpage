import { useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, ExternalLink, Pencil, Trash2, Save } from 'lucide-react';
import { useBlogPost, useRelatedPosts } from '@/hooks/useBlogPosts';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useBlogAdmin } from '@/hooks/useBlogAdmin';
import { BlogCard } from '@/components/blog/BlogCard';
import { InlineEditor } from '@/components/blog/InlineEditor';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useBlogPost(slug);
  const { data: relatedPosts = [] } = useRelatedPosts(slug, post?.category);
  const { isAdmin, getPassword } = useAdminAuth();
  const { saving, savePost, deletePost } = useBlogAdmin(getPassword);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [edits, setEdits] = useState<Record<string, string>>({});

  const updateField = useCallback((field: string, value: string) => {
    setEdits((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = async () => {
    if (!post) return;
    try {
      await savePost({
        id: post.id,
        title: edits.title ?? post.title,
        excerpt: edits.excerpt ?? post.excerpt,
        content: edits.content ?? post.content,
        cover_image: edits.coverImage ?? post.coverImage,
        substack_url: edits.substackUrl ?? post.substackUrl,
      });
      setEdits({});
      setEditMode(false);
    } catch {
      // error handled in hook
    }
  };

  const handleDelete = async () => {
    if (!post) return;
    if (!confirm('确定要删除这篇文章吗？')) return;
    await deletePost(post.id);
    navigate('/blog');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground font-light">Loading...</p>
      </div>
    );
  }

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

  const displayTitle = edits.title ?? post.title;
  const displayExcerpt = edits.excerpt ?? post.excerpt;
  const displayContent = edits.content ?? post.content;

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
        {/* Back Link + Admin bar */}
        <div className="px-6 lg:px-8 pt-24 pb-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-light tracking-wide"
            >
              <ArrowLeft className="size-4" />
              Back to Journal
            </Link>

            {isAdmin && (
              <div className="flex items-center gap-2">
                {editMode ? (
                  <>
                    <Button size="sm" onClick={handleSave} disabled={saving} className="gap-1">
                      <Save className="size-3" /> {saving ? '保存中...' : '保存'}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => { setEditMode(false); setEdits({}); }}>
                      取消
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" variant="outline" onClick={() => setEditMode(true)} className="gap-1">
                      <Pencil className="size-3" /> 编辑
                    </Button>
                    <Button size="sm" variant="ghost" onClick={handleDelete} className="gap-1 text-destructive hover:text-destructive">
                      <Trash2 className="size-3" /> 删除
                    </Button>
                  </>
                )}
              </div>
            )}
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

              <InlineEditor
                value={displayTitle}
                onSave={(v) => updateField('title', v)}
                isEditing={editMode}
                as="h1"
                className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-tight"
              />

              <InlineEditor
                value={displayExcerpt}
                onSave={(v) => updateField('excerpt', v)}
                isEditing={editMode}
                as="p"
                className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed"
              />
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
            {editMode ? (
              <InlineEditor
                value={displayContent}
                onSave={(v) => updateField('content', v)}
                isEditing={true}
                as="textarea"
                multiline
                className="text-base md:text-lg font-light leading-relaxed text-muted-foreground font-mono"
              />
            ) : (
              renderContent(displayContent)
            )}
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
