import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { bookEditLinks, getAllBookChapters } from '@/lib/book';
import styles from './book.module.css';
import directory from '../../../content/book/directory.json';

export const metadata: Metadata = pageMetadata('/book', {
  title: '在平均答案之外 — 写书计划',
  description: 'Nicole 的开放书稿《在平均答案之外》：从年轻人的具体处境出发，写判断、机会、价值与生活。四部独立篇目规划与现有章节审阅稿。',
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
          <p>从普通年轻人的处境出发，写一个周末、一笔报价、一次没有想清楚的选择。技术和时代怎样改变生活，也要到这些小事里去看。</p>
          <p>目录按四部重新组织，每篇可独立阅读。下面的篇名是写作计划，不代表正文已完成；现有五章审阅稿完整保留，供阅读和后续修订。</p>
          {first && <Link href={`/book/${first.slug}`} className={styles.open}>翻开第一章 <ArrowRight size={18} aria-hidden="true" /></Link>}
        </div>
      </section>
      <section id="contents" className={styles.catalogue} aria-labelledby="contents-title">
        <div className={styles.catalogueHead}><h2 id="contents-title">目录</h2><span>四部 · 篇目拟定中</span></div>
        <p className={styles.directoryNote}>不必从头读到尾。可以从一个问题进入，再读另一个人的处境。篇幅由故事决定，不要求每篇都给出一套方法。</p>
        <nav className={styles.partNav} aria-label="四部目录">
          {directory.map((part) => <a key={part.id} href={`#${part.id}`}>{part.number} · {part.title}</a>)}
        </nav>
        {directory.map((part) => <section key={part.id} id={part.id} className={styles.part} aria-labelledby={`${part.id}-title`}>
          <p className={styles.chapterStatus}>第{part.number}部 · 拟定篇目</p>
          <h3 id={`${part.id}-title`} className={styles.partTitle}>{part.title}</h3>
          <p className={styles.chapterDescription}>{part.description}</p>
          <ol className={styles.essayList}>{part.essays.map((essay) => <li key={essay}>{essay}</li>)}</ol>
          <aside className={styles.biography}>
            <h4>穿插的传记札记 · 待选人与核实</h4>
            <p>{part.biography}</p>
          </aside>
          <div className={styles.mapping}>
            <p>{part.mapping}</p>
            <p>现有底稿：{part.sources.map((slug, index) => {
              const chapter = chapters.find((item) => item.slug === slug);
              return chapter ? <span key={slug}>{index > 0 && '、'}<Link href={`/book/${slug}`}>原第{Number(chapter.number)}章《{chapter.title}》</Link></span> : null;
            })}</p>
          </div>
        </section>)}
        <p className={styles.directoryNote}>传记札记关注一个具体决定：当时知道什么、误判了什么、机会来自哪里、后来付了什么代价。不以成功结局倒推一套秘诀，也不将第三方经历写成作者亲历。</p>
      </section>
      <section className={`${styles.catalogue} ${styles.drafts}`} aria-labelledby="drafts-title">
        <div className={styles.catalogueHead}><h2 id="drafts-title">现有审阅稿</h2><span>{chapters.length} 章 · 保留原链接</span></div>
        <p className={styles.directoryNote}>以下仍按原五章顺序阅读，正文尚未按新目录拆分。新目录中的篇目完成后，再逐篇补上阅读入口。</p>
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
