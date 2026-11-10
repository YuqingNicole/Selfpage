// Run from any directory: node path/to/art-candidates/verify-assets.mjs
// No network access and no dependency installation required.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(readFileSync(join(root, 'manifest.json'), 'utf8'));
const sourceChecks = JSON.parse(readFileSync(join(root, 'source-checks.json'), 'utf8'));
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
const hashes = new Set();
const identities = new Set();
const readme = readFileSync(join(root, 'README.md'), 'utf8');
assert.ok(!/<img[^>]+src=["']https?:|!\[[^\]]*\]\(https?:/i.test(readme), 'No remote image embeds: restricted candidates remain links only');
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
  const identity = `${item.museum}/${item.accession}`;
  assert.ok(!identities.has(identity), `${item.id}: duplicate museum object`);
  identities.add(identity);
  assert.ok(!hashes.has(item.sha256), `${item.id}: duplicate image bytes`);
  hashes.add(item.sha256);
  assert.ok(readme.includes(item.file), `${item.id}: missing README preview/link`);
  assert.equal(item.license, 'CC0-1.0');
  assert.match(item.file, /^originals\/[a-z0-9-]+\.jpg$/);
  assert.ok(item.download_url.startsWith('https://'));
  const data = readFileSync(join(root, item.file));
  assert.equal(data.length, item.bytes, `${item.id}: byte count changed`);
  assert.equal(createHash('sha256').update(data).digest('hex'), item.sha256, `${item.id}: checksum changed`);
  assert.deepEqual(jpegDimensions(data), { width: item.width, height: item.height }, `${item.id}: dimension mismatch`);
  // Native museum print exports can be narrower than 2500 px (e.g. a cover spread).
  // 2000 px is 16.9 cm at 300 ppi. Keep exact pixels and do not upscale to qualify.
  assert.ok(Math.min(item.width, item.height) >= 2000 && Math.max(item.width, item.height) >= 3000, `${item.id}: not a high-resolution candidate`);
  assert.ok(data.length < 100 * 1024 * 1024, `${item.id}: exceeds GitHub normal file limit`);
  files.push(item.file.slice('originals/'.length));
}
const addedItems = manifest.items.filter((item) => item.status === 'downloaded' && Number(item.id.slice(1)) >= 8);
assert.deepEqual(sourceChecks.items.map((item) => item.id).sort(), addedItems.map((item) => item.id).sort(), 'Source checks must cover each new download exactly once');
for (const check of sourceChecks.items) {
  const item = manifest.items.find((item) => item.id === check.id);
  assert.equal(check.download_url, item.download_url, `${item.id}: source download URL mismatch`);
  assert.deepEqual(check.actual_pixels, [item.width, item.height], `${item.id}: source dimension mismatch`);
  if (check.api_fields) assert.equal(check.api_fields.share_license_status, 'CC0');
  if (check.image_dataset_fields) assert.equal(String(check.image_dataset_fields.openaccess), '1');
  if (check.museum_rights_fields) assert.equal(check.museum_rights_fields.museum_is_public_domain, true);
}
assert.deepEqual(readdirSync(join(root, 'originals')).sort(), files.sort(), 'Unlisted or missing image files');
console.log(`Verified ${files.length} original JPEG downloads and ${manifest.items.length - files.length} link-only candidates: dimensions, bytes, SHA-256, source/license fields, and review-only status.`);
