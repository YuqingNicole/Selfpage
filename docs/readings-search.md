# Readings search and topics

The `/readings` collection remains separate from `/readings/bookmarks`.

## Maintaining metadata

Edit `src/data/readings.ts` as before. Each entry may have one or two `topics`:
- `ai`: AI systems, engineering and technical change
- `product`: product, design, customers and commercial models
- `investing`: investment research, economics and capital cycles
- `work`: individual work, teams and organizations
- `ideas`: thinking, writing and public discourse

These are editorial navigation labels based on the saved title/summary, not endorsements or new factual summaries. Do not classify unreadable/unknown material by the author's identity alone. Omit `topics` when evidence is insufficient; the entry appears under `unsorted`. Missing topics never hide an article. Existing topic assignments were curated individually, not inferred at runtime from keywords.

Optional `publisher` and `tags` support more detailed metadata without expanding the top-level categories. No publisher or fine-grained tags were invented for existing entries. The source selector uses the actual URL hostname; it does not claim to identify a WeChat account's publisher.

## Behavior

Search matches title, author, publisher, tags, saved summary and source domain (also `WeChat / 微信 / 公众号` aliases). It normalizes full-width characters, case and whitespace. All space-separated tokens must occur somewhere across those fields; Chinese phrases use substring matching, not semantic search or automatic word segmentation.

Topic and source combine with search. Topic counts reflect query + source before selecting a topic, and may overlap because an article can have two topics. Results retain collection order. Changing any filter resets pagination; unknown URL topic/source values fall back to All. Search uses URL `q`, topics `topic`, sources `source`, with the existing `page`; typed searches replace history, intentional filter/page changes create history entries. Reset preserves unrelated query parameters.

## Checks

- `node --experimental-strip-types --test src/lib/reading-search.test.mjs` (Node 22.6+)
- `npm run build` (also generates Next image type declarations in a fresh checkout)
- `npm run typecheck`
- `npx eslint src/views/Readings.tsx src/data/readings.ts src/lib/reading-search.ts`

Manual review: type Chinese and English queries, combine both filters, reset from an empty result, change filters on a later page, paginate filtered results, reload a shared URL, use Back/Forward, and verify keyboard focus and mobile wrapping in both languages.
