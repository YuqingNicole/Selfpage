import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllBookChapters } from '@/lib/book';
import styles from '../book.module.css';
import { WritingBookmark } from './writing-bookmark';

export const metadata: Metadata = {
  title: '继续写 | 在平均答案之外',
  robots: { index: false, follow: false },
};

export default function ContinueWritingPage() {
  const chapters = getAllBookChapters().map(({ slug, title, editUrl }) => ({ slug, title, editUrl }));
  return (
    <div className={styles.shelf} lang="zh-CN">
      <section className={styles.catalogue} aria-labelledby="writing-title">
        <Link href="/book" className={styles.backToBook}>返回书页</Link>
        <div className={styles.catalogueHead}><h1 id="writing-title">继续写</h1></div>
        <WritingBookmark chapters={chapters} />
      </section>
    </div>
  );
}
