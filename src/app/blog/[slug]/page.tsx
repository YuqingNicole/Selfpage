import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { getBlogPostBySlug } from '@/data/blog';
import { notFound } from 'next/navigation';
import BlogPostPage from '@/views/BlogPost';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return pageMetadata(`/blog/${slug}`, {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: 'article', publishedTime: post.publishedAt, images: [post.coverImage] },
    twitter: { images: [post.coverImage] },
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();
  return <div lang={/[\u3400-\u9fff]/.test(post.title) ? 'zh-CN' : 'en'}><BlogPostPage /></div>;
}
