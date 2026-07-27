import type { Metadata } from 'next';
import { getBlogPostBySlug } from '@/data/blog';
import BlogPostPage from '@/views/BlogPost';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: 'article', publishedTime: post.publishedAt },
  };
}

export default function Page() {
  return <BlogPostPage />;
}
