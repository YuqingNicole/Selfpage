import test from 'node:test';
import assert from 'node:assert/strict';
import { getBookSections, getPageGeometry, getSpreadStart, canAnimatePageTurn } from './book-reading.ts';

test('section links use source lines and ignore fenced code', () => {
  assert.deepEqual(getBookSections('# A\n\n## 一\n```md\n## hidden\n```\n## 二'), [
    { id: 'section-3', title: '一' }, { id: 'section-7', title: '二' },
  ]);
  assert.deepEqual(getBookSections('~~~\n## hidden\n~~~\n## Visible'), [{ id: 'section-4', title: 'Visible' }]);
});

test('short chapters count their used page, rather than the blank facing page', () => {
  assert.equal(getPageGeometry(1000, 452, 2, 96).total, 1);
  assert.equal(getPageGeometry(1000, 1000, 2, 96).total, 2);
  assert.equal(getPageGeometry(1000, 1548, 2, 96).total, 3);
});

test('single pages and fractional widths do not produce phantom pages', () => {
  assert.equal(getPageGeometry(332.5, 332.5, 1, 64).total, 1);
  assert.equal(getPageGeometry(332.5, 729, 1, 64).total, 2);
});

test('spread boundaries remain reachable with odd page counts and on resize', () => {
  assert.equal(getSpreadStart(99, 7, 2), 6);
  assert.equal(getSpreadStart(-1, 7, 2), 0);
  assert.equal(getSpreadStart(5, 7, 2), 4);
  assert.equal(getSpreadStart(5, 7, 1), 5);
});

test('system reduced motion always prevents the turn animation', () => {
  assert.equal(canAnimatePageTurn(true, true), false);
  assert.equal(canAnimatePageTurn(false, false), false);
  assert.equal(canAnimatePageTurn(true, false), true);
});
