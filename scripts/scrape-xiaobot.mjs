#!/usr/bin/env node
// Scrape a xiaobot.net column page using your own login cookie.
//
// Usage:
//   XIAOBOT_COOKIE="<paste full Cookie header>" \
//     node scripts/scrape-xiaobot.mjs https://xiaobot.net/p/reddit
//
// Optional flags:
//   --out <file>   Output path (default: scripts/out/<slug>.json)
//   --posts        Also try to fetch the post list via xiaobot's API
//   --limit <n>    Max posts to fetch when --posts is set (default 50)
//
// How to get the cookie:
//   1. Log in at https://xiaobot.net in a browser
//   2. DevTools -> Network -> pick any request to xiaobot.net
//   3. Copy the entire "cookie" request header value
//
// Notes:
//   - Only scrape content you have permission to access. Respect the
//     site's ToS and the author's copyright.
//   - Free/preview content works without a cookie; paid content
//     requires a cookie from an account that has subscribed.

import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const args = process.argv.slice(2);
const url = args.find((a) => a.startsWith("http"));
if (!url) {
  console.error("error: provide a xiaobot URL, e.g. https://xiaobot.net/p/reddit");
  process.exit(1);
}

const flag = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const hasFlag = (name) => args.includes(name);

const slug = new URL(url).pathname.split("/").filter(Boolean).pop() ?? "page";
const outPath = resolve(flag("--out") ?? `scripts/out/${slug}.json`);
const wantPosts = hasFlag("--posts");
const postLimit = Number(flag("--limit") ?? 50);

const cookie = process.env.XIAOBOT_COOKIE ?? "";
if (!cookie) {
  console.warn("warn: XIAOBOT_COOKIE is empty — paid content will not be accessible");
}

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
  Referer: "https://xiaobot.net/",
  Cookie: cookie,
};

async function fetchText(target) {
  const res = await fetch(target, { headers, redirect: "follow" });
  if (!res.ok) throw new Error(`${target} -> HTTP ${res.status}`);
  return res.text();
}

async function fetchJson(target) {
  const res = await fetch(target, {
    headers: { ...headers, Accept: "application/json, text/plain, */*" },
  });
  if (!res.ok) throw new Error(`${target} -> HTTP ${res.status}`);
  return res.json();
}

function extractNextData(html) {
  const m = html.match(
    /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/,
  );
  if (!m) return null;
  try {
    return JSON.parse(m[1]);
  } catch {
    return null;
  }
}

function extractMeta(html) {
  const pick = (re) => {
    const m = html.match(re);
    return m ? m[1].trim() : null;
  };
  return {
    title: pick(/<title>([^<]+)<\/title>/i),
    description: pick(
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i,
    ),
    ogTitle: pick(
      /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i,
    ),
    ogDescription: pick(
      /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i,
    ),
    ogImage: pick(
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    ),
  };
}

function findPaperId(nextData) {
  // Walk the tree looking for a paper-like object with an `uuid` field.
  const seen = new Set();
  const stack = [nextData];
  while (stack.length) {
    const node = stack.pop();
    if (!node || typeof node !== "object" || seen.has(node)) continue;
    seen.add(node);
    if (node.uuid && (node.name || node.title) && (node.cover || node.creator)) {
      return node.uuid;
    }
    for (const v of Object.values(node)) stack.push(v);
  }
  return null;
}

async function main() {
  console.log(`fetching ${url}`);
  const html = await fetchText(url);
  const nextData = extractNextData(html);
  const meta = extractMeta(html);

  const result = {
    url,
    fetchedAt: new Date().toISOString(),
    meta,
    nextData,
    posts: undefined,
  };

  if (wantPosts) {
    const paperId = findPaperId(nextData);
    if (!paperId) {
      console.warn("warn: could not locate paper uuid in __NEXT_DATA__; skipping --posts");
    } else {
      console.log(`paper uuid: ${paperId}`);
      const posts = [];
      let offset = 0;
      const pageSize = 20;
      while (posts.length < postLimit) {
        const api = `https://api.xiaobot.net/post/?paper_uuid=${paperId}&offset=${offset}&limit=${pageSize}`;
        try {
          const data = await fetchJson(api);
          const batch = data.data ?? data.results ?? data;
          if (!Array.isArray(batch) || batch.length === 0) break;
          posts.push(...batch);
          if (batch.length < pageSize) break;
          offset += pageSize;
        } catch (e) {
          console.warn(`warn: post API failed (${e.message}); stopping`);
          break;
        }
      }
      result.posts = posts.slice(0, postLimit);
      console.log(`collected ${result.posts.length} posts`);
    }
  }

  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, JSON.stringify(result, null, 2), "utf8");
  console.log(`saved -> ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
