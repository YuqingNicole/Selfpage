'use client';

import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import Link from 'next/link';
import styles from '../book.module.css';

type ChapterLink = { slug: string; title: string; editUrl: string };
const storageKey = 'nicoles-garden:writing-bookmark:v1';
const noteLimit = 360;

export function WritingBookmark({ chapters }: { chapters: ChapterLink[] }) {
  const [slug, setSlug] = useState('');
  const [note, setNote] = useState('');
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState('');
  const chapter = chapters.find((item) => item.slug === slug);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const saved: unknown = JSON.parse(raw);
        if (saved && typeof saved === 'object' && 'slug' in saved && 'note' in saved &&
            chapters.some((item) => item.slug === saved.slug) && typeof saved.note === 'string') {
          setSlug(String(saved.slug));
          setNote(saved.note.slice(0, noteLimit));
        }
      }
    } catch {
      // Unavailable storage should not prevent opening the draft links.
    }
    setReady(true);
  }, [chapters]);

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!chapter) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ slug, note }));
      setStatus('已保存在这个浏览器。');
    } catch {
      setStatus('这个浏览器暂时不能保存。关闭页面前可以先复制备注。');
    }
  }

  function clear() {
    try {
      window.localStorage.removeItem(storageKey);
      setSlug('');
      setNote('');
      setStatus('已清除写作书签。');
    } catch {
      setStatus('暂时无法清除写作书签。');
    }
  }

  return (
    <>
      <p className={styles.directoryNote}>留一句回来时要做的事。写作书签只存在这个浏览器，不会上网，也不会随设备同步。共享电脑上用完可以清除。</p>
      {chapters.length === 0 ? <p>暂时没有可以打开的审阅稿。</p> :
        <form className={styles.writingForm} onSubmit={save}>
          <label htmlFor="writing-draft">正在写的稿件</label>
          <select id="writing-draft" value={slug} disabled={!ready} onChange={(event) => {
            setSlug(event.target.value);
            setNote('');
            setStatus('');
          }}>
            <option value="">选一章</option>
            {chapters.map((item) => <option key={item.slug} value={item.slug}>{item.title}</option>)}
          </select>
          <label htmlFor="writing-next-step">下一步</label>
          <textarea id="writing-next-step" rows={3} maxLength={noteLimit} value={note} disabled={!chapter}
            onChange={(event) => { setNote(event.target.value); setStatus(''); }}
            placeholder="例如：找一个读者能看见的具体场景。" />
          <div className={styles.writingActions}>
            <button type="submit" disabled={!chapter}>保存书签</button>
            <button type="button" onClick={clear} disabled={!ready}>清除书签</button>
          </div>
          <p role="status" className={styles.writingStatus}>{status}</p>
          {chapter && <nav aria-label="打开当前稿件" className={styles.writingActions}>
            <Link href={`/book/${chapter.slug}`}>看审阅稿</Link>
            <a href={chapter.editUrl} target="_blank" rel="noreferrer">在 GitHub 编辑稿件（新标签页）</a>
          </nav>}
        </form>}
    </>
  );
}
