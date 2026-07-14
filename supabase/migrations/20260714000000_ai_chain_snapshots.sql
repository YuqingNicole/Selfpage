-- Daily snapshots of the AI supply chain rotation board.
-- One row per (trading date, chain); written server-side on page render,
-- last write of the trading day wins so rows converge to closing data.

CREATE TABLE IF NOT EXISTS ai_chain_snapshots (
  snapshot_date DATE NOT NULL,
  chain_slug TEXT NOT NULL,
  chain_title TEXT NOT NULL,
  avg_day_change_pct DOUBLE PRECISION NOT NULL,
  avg_five_day_change_pct DOUBLE PRECISION NOT NULL,
  median_day_change_pct DOUBLE PRECISION NOT NULL,
  breadth DOUBLE PRECISION NOT NULL,
  breadth_improving BOOLEAN NOT NULL,
  excess_day_pct DOUBLE PRECISION NOT NULL,
  excess_five_day_pct DOUBLE PRECISION NOT NULL,
  leader_gap_pct DOUBLE PRECISION NOT NULL,
  sync_gap_pct DOUBLE PRECISION NOT NULL,
  mode TEXT NOT NULL,
  quality TEXT NOT NULL,
  score DOUBLE PRECISION NOT NULL,
  leader_symbol TEXT,
  laggard_symbol TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (snapshot_date, chain_slug)
);

-- One row per trading date: the translated conclusion layer.
CREATE TABLE IF NOT EXISTS ai_board_snapshots (
  snapshot_date DATE PRIMARY KEY,
  regime TEXT NOT NULL,
  summary TEXT NOT NULL,
  mainline_slug TEXT,
  spread_slug TEXT,
  defensive_slug TEXT,
  lagging_slug TEXT,
  qqq_day_change_pct DOUBLE PRECISION,
  coverage TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_chain_snapshots_date ON ai_chain_snapshots (snapshot_date DESC);

ALTER TABLE ai_chain_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_board_snapshots ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Public read ai_chain_snapshots"
    ON ai_chain_snapshots FOR SELECT
    TO anon, authenticated
    USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Public read ai_board_snapshots"
    ON ai_board_snapshots FOR SELECT
    TO anon, authenticated
    USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Service role write ai_chain_snapshots"
    ON ai_chain_snapshots FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Service role write ai_board_snapshots"
    ON ai_board_snapshots FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
