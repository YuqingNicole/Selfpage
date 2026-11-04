import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { bookEditLinks, getAllBookChapters } from '@/lib/book';
import styles from './book.module.css';

export const metadata: Metadata = pageMetadata('/book', {
  title: '在平均答案之外 — 写书计划',
  description: 'Nicole 的开放书稿《在平均答案之外》：关于 AI、判断、自动化与生活，以及在对话中写作。阅读章节审阅稿与持续修订。',
  openGraph: { locale: 'zh_CN' },
});

export default function BookPage() {
  const chapters = getAllBookChapters();
  const first = chapters[0];
  const book = {
    '@context': 'https://schema.org', '@type': 'Book', name: '在平均答案之外',
    author: { '@type': 'Person', name: 'Nicole Chen' }, inLanguage: 'zh-CN',
    url: 'https://www.nicoles.garden/book',
    hasPart: chapters.map((chapter) => ({ '@type': 'Chapter', name: chapter.title,
      position: Number(chapter.number), url: `https://www.nicoles.garden/book/${chapter.slug}` })),
  };
  return (
    <div className={styles.shelf} lang="zh-CN">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(book).replace(/</g, '\\u003c') }} />
      <section className={styles.intro} aria-label="在平均答案之外，写书计划">
        <Link href={first ? `/book/${first.slug}` : '#contents'} className={styles.cover} aria-label="翻开《在平均答案之外》">
          <p className={styles.edition}>AN OPEN MANUSCRIPT · 写作中</p>
          <h1><span>在平均</span><span>答案之外</span></h1>
          <p className={styles.coverSubtitle}>当世界越来越擅长替我们回答，<br />如何仍然自己看、自己选、自己承担。</p>
          <p className={styles.coverAuthor}>Nicole Chen</p>
        </Link>
        <div className={styles.preface}>
          <p className={styles.eyebrow}>写在前面</p>
          <h2>答案越来越容易，<br />自己的问题仍值得慢慢写。</h2>
          <p>这本书从具体的人、选择与代价出发，讨论 AI 进入生活以后，我们怎样看、怎样选，以及什么时候愿意修改自己的判断。</p>
          <p>第一、二、四、五章已写成审阅稿，第三章仍为提纲。它还在生长，新的材料和真实访谈会继续改变它。</p>
          {first && <Link href={`/book/${first.slug}`} className={styles.open}>翻开第一章 <ArrowRight size={18} aria-hidden="true" /></Link>}
        </div>
      </section>
      <section id="contents" className={styles.catalogue} aria-labelledby="contents-title">
        <div className={styles.catalogueHead}><h2 id="contents-title">目录</h2><span>{chapters.length} 章 · 持续修订</span></div>
        <ol className={styles.contents}>
          {chapters.map((chapter) => <li key={chapter.slug}>
            <Link href={`/book/${chapter.slug}`}>
              <span className={styles.number}>{chapter.number}</span>
              <div><h3 className={styles.chapterTitle}>{chapter.title}</h3>
                <p className={styles.chapterDescription}>{chapter.description}</p>
                <p className={styles.chapterStatus}>{chapter.status}</p></div>
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </li>)}
        </ol>
      </section>
      <details className={styles.working}>
        <summary>关于书稿与作者工作台</summary>
        <p>本书讨论的是在真实处境中看见、选择并承担后果。章节中的设想、研究、公开报道和作者判断保留各自边界，书稿随核实与审阅持续更新。</p>
        <nav aria-label="书稿编辑"><a href={bookEditLinks.createChapter} target="_blank" rel="noreferrer">新建章节</a>
          <a href={bookEditLinks.editChapterTemplateFolder} target="_blank" rel="noreferrer">编辑章节目录</a>
          <a href={bookEditLinks.editBookHome} target="_blank" rel="noreferrer">编辑书页说明</a></nav>
      </details>
    </div>
  );
}
