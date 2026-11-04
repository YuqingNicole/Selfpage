// Run against a local production build: node scripts/check-public-pages.mjs http://127.0.0.1:3134
import assert from 'node:assert/strict';
import http from 'node:http';
const base = process.argv[2];
assert(base, 'Provide the local server URL');
const origin = 'https://www.nicoles.garden';
const xml = await (await fetch(`${base}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert(urls.length > 30, 'Sitemap must contain the published content');
assert.equal(new Set(urls).size, urls.length, 'No duplicate URLs');
assert(urls.every((url) => url.startsWith(origin)), 'Canonical host throughout');
assert(!urls.some((url) => /reading-room|\/api\/|\.html|\/thinking\//.test(url)), 'Exclude private/implementation/alias routes');
for (const path of ['/book', '/book/chapter-4', '/book/chapter-5', '/learn', '/learn/options/en']) {
  assert(urls.includes(`${origin}${path}`), `Missing ${path}`);
}
// All content-backed routes are requested, so stale slugs and silent 404s fail.
const paths = urls.map((url) => url.slice(origin.length) || '/');
const failures = [];
let count = 0;
const queue = paths.filter((path) => !path.startsWith('/ai-supply-chain-us'));
await Promise.all(Array.from({ length: 6 }, async () => {
  while (queue.length) {
    const path = queue.shift();
    const response = await fetch(`${base}${path}`);
    const html = await response.text();
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/g) ?? [];
    try {
      assert.equal(response.status, 200, path);
      assert.equal(canonical.length, 1, `${path}: one canonical`);
      assert(canonical[0].includes(`${origin}${path === '/' ? '' : path}`), `${path}: canonical target`);
      assert(/<meta property="og:title" content="[^"]+"/.test(html), `${path}: OG title`);
      assert(!/<meta property="og:image"[^>]*wechat-qr/.test(html), `${path}: share image`);
      if (path.startsWith('/book/chapter-')) {
        assert(/<article aria-label="章节正文"/.test(html), 'Server-rendered article');
        assert(html.includes('rel="next"') || html.includes('rel="prev"'), 'Discoverable adjacent chapter');
        assert(html.includes('lang="zh-CN"'), 'Chinese content language');
      }
      count++;
    } catch (error) { failures.push(error.message); }
  }
}));
for (const path of ['/book/not-a-chapter', '/blog/not-a-post', '/project/not-a-project', '/skills/not-a-skill']) {
  assert.equal((await fetch(`${base}${path}`)).status, 404, `${path}: real 404`);
}
const robots = await (await fetch(`${base}/robots.txt`)).text();
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
const privatePage = await fetch(`${base}/reading-room/paradaily-7f3c9a`);
assert.equal(privatePage.headers.get('x-robots-tag'), 'noindex, nofollow, noarchive');
assert.equal(privatePage.headers.get('referrer-policy'), 'no-referrer');
const image = await fetch(`${base}/opengraph-image`);
assert.equal(image.status, 200);
assert(image.headers.get('content-type').startsWith('image/png'));
async function requestWithHost(host) {
  return new Promise((resolve, reject) => {
    const request = http.get(`${base}/book/chapter-4?ref=reader&x=1`, { headers: { host } }, (response) => {
      response.resume();
      resolve({ status: response.statusCode, location: response.headers.location });
    });
    request.on('error', reject);
  });
}
const apex = await requestWithHost('nicoles.garden');
assert.equal(apex.status, 308);
assert.equal(apex.location, `${origin}/book/chapter-4?ref=reader&x=1`);
assert.equal((await requestWithHost('www.nicoles.garden')).status, 200);
assert.equal((await requestWithHost('selfpage-preview.vercel.app')).status, 200);
assert.equal(failures.length, 0, failures.join('\n'));
console.log(`${urls.length} unique sitemap URLs; ${count} local HTML pages checked. Live-market routes excluded from HTTP sweep to avoid fetching market data.`);
console.log('404s, robots, private headers, server metadata and share image passed.');
