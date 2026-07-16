#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const getArg = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

const url = getArg('--url');
const title = getArg('--title');
const author = getArg('--author') || 'Unknown';
const description = getArg('--description') || '';
const position = getArg('--position') || 'end';

if (!url || !title) {
  console.error('Usage: npm run add-reading -- --url <url> --title <title> [--author <author>] [--description <description>] [--position start|end]');
  process.exit(1);
}

const filePath = path.join(process.cwd(), 'src/data/readings.ts');
const source = fs.readFileSync(filePath, 'utf8');

if (source.includes(`url: '${url}'`) || source.includes(`url: "${url}"`)) {
  console.log(`Reading already exists: ${url}`);
  process.exit(0);
}

const escapeSingle = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const item = `  {\n    title: '${escapeSingle(title)}',\n    author: '${escapeSingle(author)}',\n    url: '${escapeSingle(url)}',\n    description: '${escapeSingle(description)}',\n  },`;

const marker = 'export const readings: Reading[] = [';
const start = source.indexOf(marker);
if (start === -1) {
  console.error('Could not find readings array.');
  process.exit(1);
}

const arrayStart = source.indexOf('[', start + marker.length - 1);
const arrayEnd = source.indexOf('\n];', arrayStart);
if (arrayStart === -1 || arrayEnd === -1) {
  console.error('Could not locate array boundaries.');
  process.exit(1);
}

const before = source.slice(0, arrayStart + 1);
const body = source.slice(arrayStart + 1, arrayEnd);
const after = source.slice(arrayEnd);

const trimmedBody = body.trimEnd();
const nextBody = position === 'start'
  ? `\n${item}${trimmedBody ? `\n${trimmedBody.replace(/^\n+/, '')}` : ''}\n`
  : `${trimmedBody}${trimmedBody ? '\n' : ''}${item}\n`;

fs.writeFileSync(filePath, `${before}${nextBody}${after}`);
console.log(`Added reading: ${title}`);
