'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, ChevronDown, Minus, Plus } from 'lucide-react';
import { canAnimatePageTurn, getPageGeometry, getSpreadStart, type BookSection } from '@/lib/book-reading';
import styles from './BookReader.module.css';

type ChapterLink = { slug: string; number: string; title: string };
type Props = {
  chapter: ChapterLink & { status: string; editUrl: string };
  chapters: ChapterLink[];
  sections: BookSection[];
  children: ReactNode;
};

export function BookReader({ chapter, chapters, sections, children }: Props) {
  const [ready, setReady] = useState(false);
  const [continuous, setContinuous] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [turning, setTurning] = useState(false);
  const [page, setPage] = useState(0);
  const [geometry, setGeometry] = useState({ columns: 1, stride: 1, total: 1, width: 0 });
  const root = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDetailsElement>(null);
  const anchor = useRef<Element | null>(null);
  const initialHashHandled = useRef(false);
  const animation = useRef<Animation | null>(null);
  const mounted = useRef(false);
  const pageRef = useRef(page);
  const geometryRef = useRef(geometry);
  pageRef.current = page;
  geometryRef.current = geometry;

  const updatePage = useCallback((next: number) => {
    pageRef.current = next;
    setPage(next);
  }, []);

  const captureAnchor = useCallback((nextPage = pageRef.current) => {
    const content = text.current;
    if (!content) return;
    const { stride, columns } = geometryRef.current;
    const start = content.getBoundingClientRect().left;
    anchor.current = [...content.children].find((child) =>
      [...child.getClientRects()].some((rect) => rect.right - start > nextPage * stride + 1
        && rect.left - start < (nextPage + columns) * stride - 1),
    ) ?? content.firstElementChild;
  }, []);

  const measure = useCallback(() => {
    if (!ready || continuous || !viewport.current || !text.current) return;
    const content = text.current;
    const width = viewport.current.clientWidth;
    if (!width) return;
    const css = getComputedStyle(content);
    const columns = Number(css.columnCount) === 2 ? 2 : 1;
    const gap = parseFloat(css.columnGap) || 0;
    const left = content.getBoundingClientRect().left;
    const extent = Math.max(0, ...[...content.children].flatMap((child) =>
      [...child.getClientRects()].map((rect) => rect.right - left),
    ));
    const next = { ...getPageGeometry(width, extent, columns, gap), width };
    let target = anchor.current;
    if (!initialHashHandled.current) {
      initialHashHandled.current = true;
      try {
        const hash = decodeURIComponent(window.location.hash.slice(1));
        const heading = hash && document.getElementById(hash);
        if (heading && content.contains(heading)) target = heading;
      } catch { /* Malformed fragment: start at the beginning. */ }
    }
    const targetRect = target?.getClientRects()[0];
    const requested = targetRect ? Math.floor((targetRect.left - left + 1) / next.stride) : pageRef.current;
    const nextPage = getSpreadStart(requested, next.total, next.columns);
    geometryRef.current = next;
    setGeometry((old) => Object.keys(next).every((key) => old[key] === next[key]) ? old : next);
    updatePage(nextPage);
  }, [ready, continuous, updatePage]);

  useEffect(() => {
    mounted.current = true;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    setReady(true);
    return () => {
      mounted.current = false;
      media.removeEventListener('change', sync);
      animation.current?.cancel();
    };
  }, []);

  useLayoutEffect(() => {
    if (continuous) {
      anchor.current?.scrollIntoView({ block: 'start', behavior: 'auto' });
      return;
    }
    measure();
    const observer = new ResizeObserver(measure);
    if (viewport.current) observer.observe(viewport.current);
    // Fonts may settle after the first measurement even when the viewport stays the same size.
    let cancelled = false;
    document.fonts.ready.then(() => { if (!cancelled) measure(); });
    return () => { cancelled = true; observer.disconnect(); };
  }, [measure, continuous, fontSize]);

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (menu.current && !menu.current.contains(event.target as Node)) menu.current.open = false;
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, []);

  function turnTo(requested: number, animate = true) {
    if (turning || continuous) return;
    const current = geometryRef.current;
    const next = getSpreadStart(requested, current.total, current.columns);
    if (next === pageRef.current) return;
    const forward = next > pageRef.current;

    if (animate && canAnimatePageTurn(motionEnabled, reducedMotion)
      && overlay.current && text.current && typeof text.current.animate === 'function') {
      const leaf = document.createElement('div');
      leaf.className = styles.leaf;
      leaf.setAttribute('aria-hidden', 'true');
      leaf.setAttribute('inert', '');
      const facing = current.columns === 2;
      leaf.style.width = `${facing ? current.width / 2 : current.width}px`;
      leaf.style.left = facing && forward ? '50%' : '0';
      leaf.style.transformOrigin = forward ? 'left center' : 'right center';
      const clone = text.current.cloneNode(true) as HTMLDivElement;
      clone.removeAttribute('id');
      clone.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'));
      clone.style.width = `${current.width}px`;
      const oldPage = pageRef.current + (facing && forward ? 1 : 0);
      const padding = facing && forward ? (parseFloat(getComputedStyle(text.current).columnGap) || 0) / 2 : 0;
      clone.style.transform = `translate3d(${-oldPage * current.stride + padding}px, 0, 0)`;
      leaf.appendChild(clone);
      overlay.current.replaceChildren(leaf);
      setTurning(true);
      const finish = () => {
        overlay.current?.replaceChildren();
        animation.current = null;
        if (mounted.current) setTurning(false);
      };
      animation.current = leaf.animate([
        { transform: 'rotateY(0deg)', opacity: 1 },
        { transform: `rotateY(${forward ? -100 : 100}deg)`, opacity: 0.9, offset: 0.65 },
        { transform: `rotateY(${forward ? -175 : 175}deg)`, opacity: 0 },
      ], { duration: 560, easing: 'cubic-bezier(.25,.65,.2,1)', fill: 'forwards' });
      animation.current.onfinish = finish;
      animation.current.oncancel = finish;
    }

    captureAnchor(next);
    updatePage(next);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && menu.current?.open) {
      menu.current.open = false;
      menu.current.querySelector('summary')?.focus();
      return;
    }
    if (continuous || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey
      || (event.target as HTMLElement).closest('input, select, textarea, a, [contenteditable="true"]')
      || !window.getSelection()?.isCollapsed) return;
    const actions: Record<string, number> = {
      ArrowLeft: page - geometry.columns,
      ArrowRight: page + geometry.columns,
      Home: 0,
      End: geometry.total - 1,
    };
    if (event.key in actions) {
      event.preventDefault();
      turnTo(actions[event.key]);
    }
  }

  function goToSection(id: string) {
    const heading = document.getElementById(id);
    if (!heading || !text.current?.contains(heading)) return;
    if (continuous) heading.scrollIntoView({ block: 'start', behavior: 'auto' });
    else {
      const offset = heading.getBoundingClientRect().left - text.current.getBoundingClientRect().left;
      turnTo(Math.floor((offset + 1) / geometry.stride), false);
    }
    window.history.replaceState(null, '', `#${id}`);
    heading.focus({ preventScroll: true });
    if (menu.current) menu.current.open = false;
  }

  function toggleContinuous() {
    if (continuous && text.current) {
      anchor.current = [...text.current.children].find((child) => child.getBoundingClientRect().bottom > 150)
        ?? text.current.firstElementChild;
    } else captureAnchor();
    setContinuous(!continuous);
  }

  const chapterIndex = chapters.findIndex((item) => item.slug === chapter.slug);
  const previous = chapters[chapterIndex - 1];
  const next = chapters[chapterIndex + 1];
  const lastVisible = Math.min(page + geometry.columns, geometry.total);
  const pageLabel = geometry.columns === 2 && lastVisible > page + 1
    ? `${page + 1}–${lastVisible}` : `${page + 1}`;

  return (
    <section ref={root} className={styles.reader} lang="zh-CN" tabIndex={0}
      aria-label={`${chapter.title}，书本阅读器`} aria-describedby="reading-help"
      onKeyDown={handleKeyDown} data-paginated={ready && !continuous} data-turning={turning}
      style={{ '--reading-font-size': `${fontSize}px` } as React.CSSProperties}>
      <div className={styles.toolbar} aria-label="阅读设置">
        <Link href="/book" className={styles.back}><BookOpen size={16} aria-hidden="true" /> 书页</Link>
        <details ref={menu} className={styles.menu}>
          <summary>目录 <ChevronDown size={14} aria-hidden="true" /></summary>
          <div className={styles.menuPanel}>
            <p className={styles.menuLabel}>章节</p>
            <nav aria-label="书籍章节">
              {chapters.map((item) => <Link key={item.slug} href={`/book/${item.slug}`}
                aria-current={item.slug === chapter.slug ? 'page' : undefined}>
                <span>{item.number}</span> {item.title}
              </Link>)}
            </nav>
            {sections.length > 0 && <>
              <p className={styles.menuLabel}>本章</p>
              <nav aria-label="本章小节">{sections.map((section) =>
                <a key={section.id} href={`#${section.id}`} onClick={(event) => {
                  event.preventDefault(); goToSection(section.id);
                }}>{section.title}</a>,
              )}</nav>
            </>}
          </div>
        </details>
        <div className={styles.settings}>
          <button type="button" aria-label="缩小字号" disabled={fontSize <= 17 || turning}
            onClick={() => { captureAnchor(); setFontSize((size) => Math.max(17, size - 1)); }}><Minus size={14} aria-hidden="true" /><span>字</span></button>
          <button type="button" aria-label="放大字号" disabled={fontSize >= 23 || turning}
            onClick={() => { captureAnchor(); setFontSize((size) => Math.min(23, size + 1)); }}><span>字</span><Plus size={14} aria-hidden="true" /></button>
          <button type="button" aria-pressed={continuous} disabled={turning} onClick={toggleContinuous}>
            {continuous ? '分页阅读' : '连续阅读'}
          </button>
          <button type="button" className={styles.motionControl} aria-pressed={motionEnabled && !reducedMotion}
            disabled={reducedMotion || turning} onClick={() => setMotionEnabled(!motionEnabled)}>
            动效{motionEnabled && !reducedMotion ? '开' : '关'}
          </button>
        </div>
      </div>

      <div className={styles.paper}>
        <div className={styles.runningHead} aria-hidden="true"><span>在平均答案之外</span><span>第 {chapter.number} 章</span></div>
        <div ref={viewport} className={styles.viewport} onScroll={(event) => {
          // Fallback for browsers without overflow:clip: native focus scrolling must
          // not add an offset on top of the selected page's transform.
          if (!continuous && event.currentTarget.scrollLeft) event.currentTarget.scrollLeft = 0;
        }}>
          <article aria-label="章节正文" className={styles.article} onFocusCapture={(event) => {
            if (continuous || !text.current || !(event.target instanceof HTMLAnchorElement)) return;
            const rect = event.target.getClientRects()[0];
            if (!rect) return;
            const absolute = rect.left - text.current.getBoundingClientRect().left;
            const target = Math.floor((absolute + 1) / geometry.stride);
            if (target < page || target >= page + geometry.columns) turnTo(target, false);
          }}>
            <div ref={text} className={styles.text} style={{ transform: ready && !continuous
              ? `translate3d(${-page * geometry.stride}px, 0, 0)` : undefined }}>{children}</div>
          </article>
          <div ref={overlay} className={styles.turnOverlay} aria-hidden="true" />
        </div>
        <div className={styles.folio} aria-hidden="true"><span>{chapter.status}</span><span>{continuous ? '在平均答案之外' : pageLabel}</span></div>
      </div>

      <div className={styles.pager}>
        {!continuous && <>
          <button type="button" aria-label="上一页" disabled={!ready || page === 0 || turning}
            onClick={() => turnTo(page - geometry.columns)}><ArrowLeft size={17} aria-hidden="true" /><span>上一页</span></button>
          <div className={styles.pagePosition}>
            <span className={styles.pageAnnouncement} aria-live="polite" aria-atomic="true">
              {ready ? `第 ${pageLabel} 页，共 ${geometry.total} 页` : '正在排版'}
            </span>
            <select aria-label="跳转到页码" value={page} disabled={!ready || turning}
              onChange={(event) => turnTo(Number(event.target.value), false)}>
              {Array.from({ length: Math.ceil(geometry.total / geometry.columns) }, (_, index) => {
                const start = index * geometry.columns;
                return <option key={start} value={start}>第 {start + 1}{Math.min(start + geometry.columns, geometry.total) > start + 1
                  ? `–${Math.min(start + geometry.columns, geometry.total)}` : ''} 页</option>;
              })}
            </select>
          </div>
          <button type="button" aria-label="下一页" disabled={!ready || page + geometry.columns >= geometry.total || turning}
            onClick={() => turnTo(page + geometry.columns)}><span>下一页</span><ArrowRight size={17} aria-hidden="true" /></button>
        </>}
      </div>
      <p id="reading-help" className={styles.help}>
        {continuous ? '连续阅读全文，可自由查找、复制和滚动。' : '点击翻页，或将焦点放在书页后用 ← → 翻页；Home / End 到本章首尾。'}
      </p>
      <nav className={styles.chapterNavigation} aria-label="相邻章节">
        {previous ? <Link href={`/book/${previous.slug}`} rel="prev"><span>上一章</span>{previous.title}</Link> : <Link href="/book"><span>从这里开始</span>返回目录</Link>}
        {next ? <Link href={`/book/${next.slug}`} rel="next"><span>下一章</span>{next.title}</Link> : <Link href="/book"><span>本书仍在生长</span>返回目录</Link>}
      </nav>
      <a className={styles.edit} href={chapter.editUrl} target="_blank" rel="noreferrer">编辑本章 Markdown</a>
    </section>
  );
}
