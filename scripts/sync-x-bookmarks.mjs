#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const X_API = 'https://api.x.com/2';
const TOKEN_ROW_ID = 'selfpage';
const DEFAULT_FOLDER = 'Selfpage';

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

async function requestJson(url, init, label, { sensitive = false } = {}) {
  const response = await fetch(url, init);
  const text = await response.text();
  let body = null;

  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
  }

  if (!response.ok) {
    const detail = sensitive
      ? 'Response hidden because it may contain credentials.'
      : typeof body === 'string'
        ? body.slice(0, 500)
        : JSON.stringify(body).slice(0, 500);
    throw new Error(`${label} failed (${response.status}). ${detail}`);
  }

  return body;
}

function supabaseHeaders(serviceKey, extra = {}) {
  return {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    'Content-Type': 'application/json',
    ...extra,
  };
}

async function readStoredRefreshToken(supabaseUrl, serviceKey) {
  const url = new URL('/rest/v1/x_bookmark_sync_tokens', supabaseUrl);
  url.searchParams.set('id', `eq.${TOKEN_ROW_ID}`);
  url.searchParams.set('select', 'refresh_token');

  const rows = await requestJson(
    url,
    { headers: supabaseHeaders(serviceKey) },
    'Read stored X refresh token',
    { sensitive: true },
  );
  return rows?.[0]?.refresh_token ?? null;
}

async function saveRefreshToken(supabaseUrl, serviceKey, refreshToken) {
  const url = new URL('/rest/v1/x_bookmark_sync_tokens', supabaseUrl);
  url.searchParams.set('on_conflict', 'id');

  await requestJson(
    url,
    {
      method: 'POST',
      headers: supabaseHeaders(serviceKey, {
        Prefer: 'resolution=merge-duplicates,return=minimal',
      }),
      body: JSON.stringify({
        id: TOKEN_ROW_ID,
        refresh_token: refreshToken,
        updated_at: new Date().toISOString(),
      }),
    },
    'Store refreshed X token',
    { sensitive: true },
  );
}

async function refreshAccessToken(clientId, clientSecret, refreshToken) {
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  if (clientSecret) {
    headers.Authorization = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`;
  } else {
    body.set('client_id', clientId);
  }

  return requestJson(
    `${X_API}/oauth2/token`,
    { method: 'POST', headers, body },
    'Refresh X access token',
    { sensitive: true },
  );
}

async function getAllPages(url, accessToken) {
  const all = [];
  let nextToken;

  do {
    const pageUrl = new URL(url);
    if (nextToken) pageUrl.searchParams.set('pagination_token', nextToken);

    const page = await requestJson(
      pageUrl,
      { headers: { Authorization: `Bearer ${accessToken}` } },
      `Read ${pageUrl.pathname}`,
    );
    all.push(...(page?.data ?? []));
    nextToken = page?.meta?.next_token;
  } while (nextToken);

  return all;
}

async function findFolder(userId, accessToken, folderName) {
  const folders = await getAllPages(
    `${X_API}/users/${userId}/bookmarks/folders?max_results=100`,
    accessToken,
  );
  return folders.find(
    (folder) => folder.name?.trim().toLowerCase() === folderName.trim().toLowerCase(),
  );
}

async function getFolderPosts(userId, folderId, accessToken) {
  const posts = [];
  const users = new Map();
  let nextToken;

  do {
    const url = new URL(`${X_API}/users/${userId}/bookmarks/folders/${folderId}`);
    url.searchParams.set('max_results', '100');
    url.searchParams.set('tweet.fields', 'id,text,author_id,created_at');
    url.searchParams.set('expansions', 'author_id');
    url.searchParams.set('user.fields', 'id,name,username');
    if (nextToken) url.searchParams.set('pagination_token', nextToken);

    const page = await requestJson(
      url,
      { headers: { Authorization: `Bearer ${accessToken}` } },
      'Read X bookmark folder',
    );
    posts.push(...(page?.data ?? []));
    for (const user of page?.includes?.users ?? []) users.set(user.id, user);
    nextToken = page?.meta?.next_token;
  } while (nextToken);

  return { posts, users };
}

export function makeTitle(text, maxLength = 110) {
  const cleaned = String(text ?? '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!cleaned) return 'Saved post from X';
  return cleaned.length > maxLength ? `${cleaned.slice(0, maxLength - 1).trimEnd()}…` : cleaned;
}

export function mapPostToBookmark(post, users, folderName = DEFAULT_FOLDER) {
  const user = users.get(post.author_id);
  const username = user?.username || 'unknown';

  return {
    tweet_id: post.id,
    title: makeTitle(post.text),
    author: user?.name || username,
    handle: `@${username}`,
    url: `https://x.com/${username}/status/${post.id}`,
    category: 'To Review',
    note: `Saved automatically from the ${folderName} folder on X.`,
    next_action: 'Review, annotate, and move to the right category.',
    status: 'Review',
    content_seed: null,
    source_folder: folderName,
    post_text: post.text || '',
    tweet_created_at: post.created_at || null,
    synced_at: new Date().toISOString(),
  };
}

async function readExistingIds(supabaseUrl, serviceKey) {
  const url = new URL('/rest/v1/x_bookmarks', supabaseUrl);
  url.searchParams.set('select', 'tweet_id');
  url.searchParams.set('limit', '5000');

  const rows = await requestJson(
    url,
    { headers: supabaseHeaders(serviceKey) },
    'Read existing X bookmarks',
  );
  return new Set((rows ?? []).map((row) => row.tweet_id));
}

async function insertBookmarks(supabaseUrl, serviceKey, bookmarks) {
  if (!bookmarks.length) return;
  const url = new URL('/rest/v1/x_bookmarks', supabaseUrl);

  await requestJson(
    url,
    {
      method: 'POST',
      headers: supabaseHeaders(serviceKey, {
        Prefer: 'return=minimal',
      }),
      body: JSON.stringify(bookmarks),
    },
    'Insert X bookmarks',
  );
}

async function runFixture(file) {
  const fixture = JSON.parse(await readFile(file, 'utf8'));
  const users = new Map((fixture.users ?? []).map((user) => [user.id, user]));
  const rows = (fixture.posts ?? []).map((post) =>
    mapPostToBookmark(post, users, fixture.folderName),
  );
  console.log(JSON.stringify(rows, null, 2));
}

async function main() {
  const fixtureIndex = process.argv.indexOf('--fixture');
  if (fixtureIndex !== -1) {
    const file = process.argv[fixtureIndex + 1];
    if (!file) throw new Error('--fixture requires a JSON file path');
    await runFixture(file);
    return;
  }

  const supabaseUrl = required('SUPABASE_URL');
  const serviceKey = required('SUPABASE_SERVICE_ROLE_KEY');
  const clientId = required('X_CLIENT_ID');
  const clientSecret = process.env.X_CLIENT_SECRET?.trim() || '';
  const bootstrapRefreshToken = process.env.X_REFRESH_TOKEN?.trim() || '';
  const folderName = process.env.X_BOOKMARK_FOLDER_NAME?.trim() || DEFAULT_FOLDER;

  const storedRefreshToken = await readStoredRefreshToken(supabaseUrl, serviceKey);
  const refreshToken = storedRefreshToken || bootstrapRefreshToken;
  if (!refreshToken) {
    throw new Error('No X refresh token found in Supabase or X_REFRESH_TOKEN.');
  }

  const token = await refreshAccessToken(clientId, clientSecret, refreshToken);
  if (!token?.access_token) throw new Error('X did not return an access token.');
  if (token.refresh_token && token.refresh_token !== storedRefreshToken) {
    await saveRefreshToken(supabaseUrl, serviceKey, token.refresh_token);
  }

  const me = await requestJson(
    `${X_API}/users/me`,
    { headers: { Authorization: `Bearer ${token.access_token}` } },
    'Read authenticated X user',
  );
  const userId = me?.data?.id;
  if (!userId) throw new Error('X did not return the authenticated user id.');

  const folder = await findFolder(userId, token.access_token, folderName);
  if (!folder) {
    throw new Error(`X bookmark folder "${folderName}" was not found.`);
  }

  const { posts, users } = await getFolderPosts(userId, folder.id, token.access_token);
  const existingIds = await readExistingIds(supabaseUrl, serviceKey);
  const newBookmarks = posts
    .filter((post) => !existingIds.has(post.id))
    .map((post) => mapPostToBookmark(post, users, folderName));

  await insertBookmarks(supabaseUrl, serviceKey, newBookmarks);
  console.log(
    newBookmarks.length
      ? `Added ${newBookmarks.length} new bookmark(s) from "${folderName}".`
      : `No new bookmarks in "${folderName}".`,
  );
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
