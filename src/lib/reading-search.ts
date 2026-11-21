import type { Reading, ReadingTopic } from '../data/readings';

export function normalizeReadingText(text: string): string {
  return text.normalize('NFKC').toLocaleLowerCase().replace(/\s+/gu, ' ').trim();
}

export function readingSource(item: Reading): string {
  try { return new URL(item.url).hostname.replace(/^www\./, ''); }
  catch { return ''; }
}

export function topicsForReading(item: Reading): ReadingTopic[] {
  return item.topics?.length ? item.topics : ['unsorted'];
}

// AND across whitespace-separated tokens, OR across metadata fields.
// Chinese phrases match as substrings; we do not pretend to provide semantic search.
export function filterReadings(items: Reading[], query = '', topic = '', source = ''): Reading[] {
  const tokens = normalizeReadingText(query).split(' ').filter(Boolean);
  return items.filter((item) => {
    if (topic && !topicsForReading(item).some((value) => value === topic)) return false;
    if (source && readingSource(item) !== source) return false;
    const text = normalizeReadingText([
      item.title, item.author, item.publisher, item.description,
      ...(item.tags ?? []), readingSource(item),
      readingSource(item) === 'mp.weixin.qq.com' ? 'WeChat 微信 公众号' : '',
    ].filter(Boolean).join(' '));
    return tokens.every((token) => text.includes(token));
  });
}

export function readingPage(raw: string | null, totalPages: number): number {
  const page = Number(raw || 1);
  return Number.isFinite(page) ? Math.min(Math.max(1, Math.floor(page)), totalPages) : 1;
}

export function readingFilterParams(current: string, changes: Record<string, string>): string {
  const params = new URLSearchParams(current);
  for (const [key, value] of Object.entries(changes)) {
    if (value) params.set(key, value);
    else params.delete(key);
  }
  params.delete('page');
  return params.toString();
}
