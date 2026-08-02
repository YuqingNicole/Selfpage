import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAllBookChapters, getBookChapterBySlug } from '@/lib/book';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllBookChapters().map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getBookChapterBySlug(slug);

  if (!chapter) {
    return { title: '书' };
  }

  return {
    title: chapter.title,
    description: chapter.description,
  };
}

export default async function BookChapterPage({ params }: Props) {
  const { slug } = await params;
  const chapter = getBookChapterBySlug(slug);

  if (!chapter) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border px-6 pt-28 pb-10">
        <div className="mx-auto max-w-3xl space-y-4">
          <Link
            href="/book"
            className="inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            ← 返回书页
          </Link>
          <p
            className="text-xs uppercase tracking-[0.22em] text-muted-foreground"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            第 {chapter.number} 章 · {chapter.status}
          </p>
          <h1
            className="text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic' }}
          >
            {chapter.title}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            {chapter.description}
          </p>
          <div>
            <a
              href={chapter.editUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-foreground/40 hover:bg-card/50"
            >
              编辑 Markdown
            </a>
          </div>
        </div>
      </section>

      <article className="px-6 py-12">
        <div className="prose prose-neutral mx-auto max-w-3xl dark:prose-invert prose-headings:font-light prose-p:leading-8">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{chapter.body}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
