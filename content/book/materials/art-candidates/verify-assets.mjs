// Run from any directory: node path/to/art-candidates/verify-assets.mjs
// No network access and no dependency installation required.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(readFileSync(join(root, 'manifest.json'), 'utf8'));
const frames = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
function jpegDimensions(data) {
  assert.equal(data.readUInt16BE(0), 0xffd8, 'Missing JPEG SOI');
  for (let offset = 2; offset < data.length;) {
    assert.equal(data[offset++], 0xff, 'Invalid JPEG segment');
    while (data[offset] === 0xff) offset++;
    const marker = data[offset++];
    if (marker === 0xd9 || marker === 0xda) break;
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
    const length = data.readUInt16BE(offset);
    assert.ok(length >= 2 && offset + length <= data.length, 'Invalid JPEG length');
    if (frames.has(marker)) return { height: data.readUInt16BE(offset + 3), width: data.readUInt16BE(offset + 5) };
    offset += length;
  }
  throw new Error('JPEG dimensions not found');
}

assert.equal(manifest.schema_version, 1);
const files = [];
const ids = new Set();
for (const item of manifest.items) {
  assert.ok(!ids.has(item.id), `Duplicate ID: ${item.id}`);
  ids.add(item.id);
  for (const field of ['artist', 'title', 'year', 'museum', 'artwork_url', 'rights_evidence', 'verified_on', 'proposed_chapter', 'suggested_credit']) {
    assert.ok(item[field], `${item.id}: missing ${field}`);
  }
  assert.ok(item.rights_sources.length >= 2, `${item.id}: insufficient source links`);
  assert.equal(item.approved_for_website, false, `${item.id}: review-only asset`);
  assert.match(item.proposed_chapter, /^chapter-[1-5]$/);
  if (item.status === 'link_only') {
    assert.equal(item.file, null, `${item.id}: restricted image must not be stored`);
    assert.equal(item.download_url, null);
    continue;
  }
  assert.equal(item.status, 'downloaded');
  assert.equal(item.license, 'CC0-1.0');
  assert.match(item.file, /^originals\/[a-z0-9-]+\.jpg$/);
  assert.ok(item.download_url.startsWith('https://'));
  const data = readFileSync(join(root, item.file));
  assert.equal(data.length, item.bytes, `${item.id}: byte count changed`);
  assert.equal(createHash('sha256').update(data).digest('hex'), item.sha256, `${item.id}: checksum changed`);
  assert.deepEqual(jpegDimensions(data), { width: item.width, height: item.height }, `${item.id}: dimension mismatch`);
  assert.ok(Math.min(item.width, item.height) >= 2500, `${item.id}: not a high-resolution candidate`);
  assert.ok(data.length < 100 * 1024 * 1024, `${item.id}: exceeds GitHub normal file limit`);
  files.push(item.file.slice('originals/'.length));
}
assert.deepEqual(readdirSync(join(root, 'originals')).sort(), files.sort(), 'Unlisted or missing image files');
console.log(`Verified ${files.length} original JPEG downloads and ${manifest.items.length - files.length} link-only candidates: dimensions, bytes, SHA-256, source/license fields, and review-only status.`);
