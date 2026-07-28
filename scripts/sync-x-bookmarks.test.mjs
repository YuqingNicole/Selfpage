import assert from 'node:assert/strict';
import test from 'node:test';

import { makeTitle, mapPostToBookmark } from './sync-x-bookmarks.mjs';

test('makeTitle removes links and compresses whitespace', () => {
  assert.equal(
    makeTitle('A useful product thought\n\nhttps://example.com'),
    'A useful product thought',
  );
});

test('mapPostToBookmark creates a review item without inventing analysis', () => {
  const users = new Map([
    ['42', { id: '42', name: 'Product Builder', username: 'productbuilder' }],
  ]);
  const row = mapPostToBookmark(
    {
      id: '2082000000000000000',
      author_id: '42',
      text: 'A useful product thought',
      created_at: '2026-07-28T08:00:00.000Z',
    },
    users,
    'Selfpage',
  );

  assert.equal(row.category, 'To Review');
  assert.equal(row.status, 'Review');
  assert.equal(row.handle, '@productbuilder');
  assert.equal(row.url, 'https://x.com/productbuilder/status/2082000000000000000');
});
