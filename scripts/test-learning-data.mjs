import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

// Exercise the real sync functions with isolated storage and a mocked client.
// These tests never authenticate or send data to Supabase.
const plain = (value) => JSON.parse(JSON.stringify(value));
const storageKey = (name) => `options-course-${name}-v1`;

function loadModule(file, supabase, localStorage, globals = {}) {
  const source = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  const testModule = { exports: {} };
  runInNewContext(outputText, {
    module: testModule,
    exports: testModule.exports,
    require: (name) => {
      if (name === 'react') return {};
      if (name === '@/integrations/supabase/client') return { supabase };
      throw new Error(`Unexpected import: ${name}`);
    },
    localStorage,
    process: { env: { NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co' } },
    ...globals,
  }, { filename: file });
  return testModule.exports;
}

function setupSync(local = {}, cloud = null, error = null) {
  const storage = new Map(Object.entries(local).map(([key, value]) => [storageKey(key), JSON.stringify(value)]));
  const writes = [];
  const client = {
    from(table) {
      assert.equal(table, 'learn_cloud');
      return {
        select(columns) {
          assert.equal(columns, 'progress, srs, badges, daily');
          return {
            eq(column, userId) {
              assert.equal(column, 'user_id');
              assert.equal(userId, 'test-user');
              return { maybeSingle: async () => ({ data: cloud, error }) };
            },
          };
        },
        async upsert(row) {
          writes.push(plain(row));
          return { error: null };
        },
      };
    },
  };
  const localStorage = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  };
  return { api: loadModule('src/components/learn/cloudSync.ts', client, localStorage), storage, writes };
}

test('new cloud account uploads local snapshots without changing local progress', async () => {
  const local = { progress: { xp: 15, completed: ['l1'] }, srs: {}, badges: {}, daily: {} };
  const { api, writes } = setupSync(local);
  assert.equal(await api.syncWithCloud('test-user'), false);
  const { user_id, updated_at, ...snapshot } = writes[0];
  assert.equal(user_id, 'test-user');
  assert.ok(Number.isFinite(Date.parse(updated_at)));
  assert.deepEqual(snapshot, local);
});

test('cloud merge preserves progress, review dates, badges, and daily rewards', async () => {
  const { api, storage, writes } = setupSync({
    progress: { xp: 100, completed: ['l1'], perfect: [], streak: 3, lastPracticeDay: '2026-11-10', freezes: 1 },
    srs: { l1: { due: '2026-11-12', wrong: 2 } },
    badges: { first: '2026-11-01' },
    daily: { day: '2026-11-11', lesson: true, totalChests: 2 },
  }, {
    progress: { xp: 90, completed: ['l2'], perfect: ['l2'], streak: 2, lastPracticeDay: '2026-11-11', freezes: 2 },
    srs: { l1: { due: '2026-11-13', wrong: 1 }, l2: { due: '2026-11-14', wrong: 1 } },
    badges: { first: '2026-11-03', second: '2026-11-10' },
    daily: { day: '2026-11-11', review: true, chestClaimed: true, totalChests: 3 },
  });
  assert.equal(await api.syncWithCloud('test-user'), true);
  assert.deepEqual(writes[0].progress, {
    xp: 100, completed: ['l1', 'l2'], perfect: ['l2'], streak: 3,
    lastPracticeDay: '2026-11-11', developerMode: false, freezes: 2,
  });
  assert.deepEqual(writes[0].srs, { l1: { due: '2026-11-13', wrong: 2 }, l2: { due: '2026-11-14', wrong: 1 } });
  assert.deepEqual(writes[0].badges, { first: '2026-11-01', second: '2026-11-10' });
  assert.deepEqual(writes[0].daily, {
    day: '2026-11-11', lesson: true, review: true, lab: false, chestClaimed: true, totalChests: 3,
  });
  assert.deepEqual(JSON.parse(storage.get(storageKey('progress'))), writes[0].progress);
});

test('JSON scalars and arrays are normalized to snapshot objects', async () => {
  const { api, writes } = setupSync({ progress: [], srs: false, badges: null, daily: 'invalid' });
  await api.pushToCloud('test-user');
  for (const key of ['progress', 'srs', 'badges', 'daily']) assert.deepEqual(writes[0][key], {});

  const remote = setupSync({}, { progress: [], srs: false, badges: null, daily: 'invalid' });
  await remote.api.syncWithCloud('test-user');
  assert.equal(remote.writes[0].progress.xp, 0);
  assert.deepEqual(remote.writes[0].srs, {});
  assert.deepEqual(remote.writes[0].badges, {});
});

test('failed cloud read does not overwrite local storage or upload a snapshot', async () => {
  const failure = new Error('offline');
  const { api, storage, writes } = setupSync({ progress: { xp: 50 } }, null, failure);
  await assert.rejects(api.syncWithCloud('test-user'), failure);
  assert.equal(writes.length, 0);
  assert.deepEqual(JSON.parse(storage.get(storageKey('progress'))), { xp: 50 });
});

test('analytics accepts JSON properties and reuses the anonymous device ID', () => {
  const inserts = [];
  const storage = new Map();
  const client = {
    from(table) {
      assert.equal(table, 'learn_events');
      return { insert(row) { inserts.push(plain(row)); return Promise.resolve({ error: null }); } };
    },
  };
  const api = loadModule('src/components/learn/analytics.ts', client, {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  }, { window: {}, crypto: { randomUUID: () => 'test-device' } });
  const props = { lesson: 'l1', score: 2, correct: true, tags: ['options'], extra: { value: null } };
  api.track('lesson_complete', props);
  api.track('lesson_start');
  assert.deepEqual(inserts[0], { device_id: 'test-device', event: 'lesson_complete', props });
  assert.equal(inserts[1].device_id, 'test-device');
});
