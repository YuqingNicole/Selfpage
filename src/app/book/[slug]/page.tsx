import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAllBookChapters, getBookChapterBySlug } from '@/lib/book';
import { getBookSections } from '@/lib/book-reading';
import { pageMetadata } from '@/lib/seo';
import { BookReader } from '@/components/book/BookReader';
import styles from '../book.module.css';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllBookChapters().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getBookChapterBySlug(slug);
  if (!chapter) return { title: 'Chapter Not Found', robots: { index: false } };
  return pageMetadata(`/book/${slug}`, {
    title: `${chapter.title} — 在平均答案之外`, description: chapter.description,
    openGraph: { locale: 'zh_CN' },
  });
}

export default async function BookChapterPage({ params }: Props) {
  const { slug } = await params;
  const chapter = getBookChapterBySlug(slug);
  if (!chapter) notFound();
  const chapters = getAllBookChapters().map(({ slug, number, title }) => ({ slug, number, title }));
  return (
    <div className={styles.chapterShell} lang="zh-CN">
      <header className={styles.chapterHeading}>
        <p>在平均答案之外 · 第 {chapter.number} 章</p>
        <h1>{chapter.title}</h1>
      </header>
      <BookReader chapter={{ slug: chapter.slug, number: chapter.number, title: chapter.title, status: chapter.status, editUrl: chapter.editUrl }} chapters={chapters} sections={getBookSections(chapter.body)}>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
          h1: () => null,
          h2: ({ node, children }) => <h2 id={`section-${node?.position?.start.line}`} tabIndex={-1}>{children}</h2>,
        }}>{chapter.body}</ReactMarkdown>
      </BookReader>
    </div>
  );
}
