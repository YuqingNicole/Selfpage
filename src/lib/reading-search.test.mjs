import test from 'node:test';
import assert from 'node:assert/strict';
import { readings, readingTopics } from '../data/readings.ts';
import { filterReadings, normalizeReadingText, readingPage, readingSource, topicsForReading, readingFilterParams } from './reading-search.ts';

test('multi-token AND matches across Chinese/English title, author and summary', () => {
  assert.equal(filterReadings(readings, '  AI   基金经理 ')[0].author, 'NextGen Digital Venture');
  assert.equal(filterReadings(readings, 'emil taste')[0].title, 'Agents with taste');
  assert.equal(filterReadings(readings, 'agent 权限 yudesk')[0].author, 'yudesk.dev');
  assert.deepEqual(filterReadings(readings, '不存在的词 xyz'), []);
  assert.deepEqual(filterReadings(readings, '  '), readings);
});
test('normalizes case, full-width input and whitespace; matches metadata', () => {
  assert.equal(normalizeReadingText('ＡＩ\u3000Native'), 'ai native');
  const sample = [{title:'Sample',author:'Writer',url:'https://www.example.com/a', publisher:'Paper',tags:['检索'],description:'Notes'}];
  assert.equal(filterReadings(sample, 'paper 检索 notes example.com').length, 1);
});
test('editorial topics and source combine with query and maintain source order', () => {
  assert.equal(filterReadings(readings, 'Agent', 'ai', 'yudesk.dev').length, 1);
  assert.ok(filterReadings(readings, '微信 投资').length > 0);
  assert.equal(filterReadings(readings, 'Agent', 'investing', 'yudesk.dev').length, 0);
  assert.equal(readingSource({url:'https://www.example.com/a'}), 'example.com');
  for (const item of readings) {
    assert.ok(topicsForReading(item).length);
    assert.ok(topicsForReading(item).every(id => readingTopics.some(topic => topic.id === id)));
  }
  assert.equal(filterReadings(readings, '', 'unsorted').length, 3);
  assert.deepEqual(filterReadings(readings), readings);
});
test('unknown titles are not guessed into a topical category', () => {
  for (const item of readings.filter(item => item.title === '微信文章（标题待核实）')) {
    assert.deepEqual(topicsForReading(item), ['unsorted']);
  }
});
test('pages clamp invalid, fractional and out-of-range values', () => {
  for (const raw of ['garbage', '-2', 'Infinity', '0', null]) assert.equal(readingPage(raw, 5), 1);
  assert.equal(readingPage('2.8', 5), 2);
  assert.equal(readingPage('999', 5), 5);
  assert.equal(readingPage('4', 1), 1);
});
test('changing filters resets page while retaining unrelated filters and URL state', () => {
  const changed = new URLSearchParams(readingFilterParams('?page=5&source=x.com&topic=ai&ref=nav', {q:'AI 权限'}));
  assert.equal(changed.get('page'), null);
  assert.equal(changed.get('q'), 'AI 权限');
  assert.equal(changed.get('topic'), 'ai');
  assert.equal(changed.get('source'), 'x.com');
  assert.equal(changed.get('ref'), 'nav');
  assert.equal(readingFilterParams(changed.toString(), {q:'',topic:'',source:''}), 'ref=nav');
});
