// node scripts/check-book.mjs http://127.0.0.1:3134
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
const base = process.argv[2];
assert(base, 'Provide the local server URL');
const text = (html) => html.replace(/<[^>]*>/g, '').replace(/&#x([\da-f]+);/gi, (_, value) => String.fromCodePoint(parseInt(value, 16)))
  .replace(/&#(\d+);/g, (_, value) => String.fromCodePoint(Number(value)))
  .replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s/g, '');
const slugs = new Set();
const numbers = new Set();
let links = 0;
for (const file of fs.readdirSync('content/book/chapters').filter((name) => name.endsWith('.md'))) {
  const { data, content } = matter(fs.readFileSync(`content/book/chapters/${file}`, 'utf8'));
  for (const field of ['slug', 'number', 'title', 'description', 'status']) assert(String(data[field] ?? '').trim(), `${file}: ${field}`);
  assert(!slugs.has(data.slug)); slugs.add(data.slug);
  assert(!numbers.has(data.number)); numbers.add(data.number);
  const titleCount = content.match(/^# /gm)?.length ?? 0;
  assert(titleCount <= 1, `${file}: no duplicate manuscript title`);
  if (!String(data.status).includes('提纲')) assert.equal(titleCount, 1, `${file}: manuscript title`);
  const body = content.trim();
  for (const [, href] of body.matchAll(/\]\(([^)]+)\)/g)) {
    if (/^https?:/.test(href)) assert(['http:', 'https:'].includes(new URL(href).protocol));
    links++;
  }
  const response = await fetch(`${base}/book/${data.slug}`);
  const html = await response.text();
  assert.equal(response.status, 200);
  const article = html.match(/<article aria-label="章节正文"[^>]*>([\s\S]*?)<\/article>/)?.[1];
  assert(article, `${file}: server article exists`);
  const expected = renderToStaticMarkup(React.createElement(ReactMarkdown, { remarkPlugins: [remarkGfm], components: { h1: () => null } }, body));
  assert.equal(text(article), text(expected), `${file}: complete initial HTML matches manuscript`);
}
for (const file of fs.readdirSync('content/book/materials').filter((name) => name.endsWith('.md'))) {
  const body = fs.readFileSync(`content/book/materials/${file}`, 'utf8');
  for (const [, href] of body.matchAll(/\]\(([^)]+)\)/g)) {
    if (!/^https?:|^#/.test(href)) assert(fs.existsSync(path.resolve('content/book/materials', href)), `${file}: ${href}`);
  }
}
console.log(`${slugs.size} chapters: fields, unique slugs/numbers, titles, ${links} link structures and material links passed.`);
console.log('All five server-rendered article bodies match the complete Markdown text (whitespace ignored).');
