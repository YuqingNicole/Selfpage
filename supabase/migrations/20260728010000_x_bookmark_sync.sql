-- X bookmarks saved in the dedicated "Selfpage" folder.
-- The library is publicly readable; only the service role can sync rows.

CREATE TABLE IF NOT EXISTS public.x_bookmarks (
  tweet_id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  handle TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL DEFAULT 'To Review',
  note TEXT NOT NULL DEFAULT 'Saved automatically from the Selfpage folder on X.',
  next_action TEXT NOT NULL DEFAULT 'Review, annotate, and move to the right category.',
  status TEXT NOT NULL DEFAULT 'Review',
  content_seed TEXT,
  source_folder TEXT NOT NULL DEFAULT 'Selfpage',
  post_text TEXT NOT NULL DEFAULT '',
  tweet_created_at TIMESTAMPTZ,
  synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS x_bookmarks_synced_at_idx
  ON public.x_bookmarks (synced_at DESC);

ALTER TABLE public.x_bookmarks ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Public read x_bookmarks"
    ON public.x_bookmarks FOR SELECT
    TO anon, authenticated
    USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Service role write x_bookmarks"
    ON public.x_bookmarks FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- X can rotate refresh tokens. Keeping the latest token in this private table
-- prevents the GitHub secret from becoming stale after the first refresh.
CREATE TABLE IF NOT EXISTS public.x_bookmark_sync_tokens (
  id TEXT PRIMARY KEY,
  refresh_token TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.x_bookmark_sync_tokens ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Service role manages x bookmark tokens"
    ON public.x_bookmark_sync_tokens FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
