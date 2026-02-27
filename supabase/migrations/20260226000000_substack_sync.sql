-- Substack Posts table
CREATE TABLE IF NOT EXISTS substack_posts (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  slug TEXT NOT NULL UNIQUE,
  canonical_url TEXT,
  cover_image TEXT,
  post_date TIMESTAMPTZ,
  audience TEXT DEFAULT 'everyone',
  tags TEXT[] DEFAULT '{}',
  excerpt TEXT,
  word_count INTEGER,
  reaction_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  synced_at TIMESTAMPTZ DEFAULT NOW()
);

-- Substack Notes (short-form, Twitter-like)
CREATE TABLE IF NOT EXISTS substack_notes (
  id BIGINT PRIMARY KEY,
  body_text TEXT NOT NULL,
  body_html TEXT,
  note_date TIMESTAMPTZ,
  reaction_count INTEGER DEFAULT 0,
  restacks INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  canonical_url TEXT,
  synced_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable public read access (anon key can read)
ALTER TABLE substack_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE substack_notes ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Public read substack_posts"
    ON substack_posts FOR SELECT
    TO anon, authenticated
    USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Public read substack_notes"
    ON substack_notes FOR SELECT
    TO anon, authenticated
    USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Service role can write (used by Edge Function)
DO $$ BEGIN
  CREATE POLICY "Service role write substack_posts"
    ON substack_posts FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Service role write substack_notes"
    ON substack_notes FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_substack_posts_date ON substack_posts (post_date DESC);
CREATE INDEX IF NOT EXISTS idx_substack_notes_date ON substack_notes (note_date DESC);
