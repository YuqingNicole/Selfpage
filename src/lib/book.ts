import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type BookChapter = {
  slug: string;
  number: string;
  title: string;
  description: string;
  status: string;
  body: string;
};

const chaptersDir = path.join(process.cwd(), 'content/book/chapters');

function readChapterFile(fileName: string): BookChapter {
  const fullPath = path.join(chaptersDir, fileName);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);

  return {
    slug: String(data.slug),
    number: String(data.number),
    title: String(data.title),
    description: String(data.description),
    status: String(data.status ?? 'Draft'),
    body: content.trim(),
  };
}

export function getAllBookChapters(): BookChapter[] {
  return fs
    .readdirSync(chaptersDir)
    .filter((file) => file.endsWith('.md'))
    .map(readChapterFile)
    .sort((a, b) => a.number.localeCompare(b.number));
}

export function getBookChapterBySlug(slug: string): BookChapter | null {
  const chapters = getAllBookChapters();
  return chapters.find((chapter) => chapter.slug === slug) ?? null;
}

