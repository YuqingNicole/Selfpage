// @ts-nocheck — Deno Edge Function: use Deno extension for proper type support
import { createClient } from "npm:@supabase/supabase-js@2";

const SUBSTACK_PUB = "https://nicolewithlove.substack.com";
const SUBSTACK_USER_ID = "123734421"; // nicolewithlove's numeric user ID
const POSTS_FETCH_LIMIT = 50;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ── Posts: public API on the publication subdomain ───────────────────────────
async function syncPosts(supabase: ReturnType<typeof createClient>) {
  const res = await fetch(
    `${SUBSTACK_PUB}/api/v1/posts?limit=${POSTS_FETCH_LIMIT}&offset=0`,
    { headers: { "User-Agent": "Mozilla/5.0" } }
  );
  if (!res.ok) throw new Error(`Posts fetch failed: ${res.status}`);
  const posts: Record<string, unknown>[] = await res.json();

  let count = 0;
  for (const p of posts) {
    const { error } = await supabase.from("substack_posts").upsert(
      {
        id: p.id,
        title: p.title,
        subtitle: p.subtitle ?? null,
        slug: p.slug,
        canonical_url: p.canonical_url ?? null,
        cover_image: p.cover_image ?? null,
        post_date: p.post_date ?? null,
        audience: p.audience ?? "everyone",
        tags: (p.postTags as { name: string }[])?.map((t) => t.name) ?? [],
        excerpt:
          (p.subtitle as string) ||
          ((p.truncated_body_text as string)?.substring(0, 300) ?? null),
        word_count: p.wordcount ?? null,
        reaction_count: (p.reaction_count as number) ?? 0,
        comment_count: (p.comment_count as number) ?? 0,
        synced_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );
    if (!error) count++;
  }
  return count;
}

// ── Notes: requires session cookie, lives on substack.com ─────────────────────
async function syncNotes(supabase: ReturnType<typeof createClient>) {
  const sid = Deno.env.get("SUBSTACK_SID");
  if (!sid) throw new Error("SUBSTACK_SID secret not set — see setup instructions");

  // Authenticated endpoint for a user's own notes feed
  const url =
    `https://substack.com/api/v1/user/${SUBSTACK_USER_ID}/posts` +
    `?filter=none&type=thread&limit=50`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Cookie": `substack.sid=${sid}`,
    },
  });
  if (!res.ok) throw new Error(`Notes fetch failed: ${res.status} — check SUBSTACK_SID`);

  const raw = await res.json();
  // Response can be an array directly, or { posts: [...] }
  const notes: Record<string, unknown>[] = Array.isArray(raw)
    ? raw
    : (raw.posts ?? []);

  let count = 0;
  for (const n of notes) {
    const bodyText =
      (n.truncated_body_text as string) ||
      (n.body_text as string) ||
      (n.title as string) ||
      "";
    if (!bodyText) continue;

    const { error } = await supabase.from("substack_notes").upsert(
      {
        id: n.id,
        body_text: bodyText,
        body_html: (n.body_html as string) ?? null,
        note_date: (n.post_date as string) ?? (n.date as string) ?? null,
        reaction_count: (n.reaction_count as number) ?? 0,
        restacks: (n.restacks as number) ?? 0,
        comment_count: (n.comment_count as number) ?? 0,
        canonical_url: (n.canonical_url as string) ?? null,
        synced_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );
    if (!error) count++;
  }
  return count;
}

// ── HTTP handler (also invoked by Supabase Cron scheduler) ───────────────────
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const results = { posts: 0, notes: 0, errors: [] as string[] };
  try { results.posts = await syncPosts(supabase); } catch (e) { results.errors.push(`posts: ${(e as Error).message}`); }
  try { results.notes = await syncNotes(supabase); } catch (e) { results.errors.push(`notes: ${(e as Error).message}`); }

  return new Response(JSON.stringify(results, null, 2), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: results.errors.length > 0 ? 207 : 200,
  });
});
