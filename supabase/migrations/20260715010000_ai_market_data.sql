-- Raw market data synced by GitHub Actions (scripts/sync-market-data.mjs).
-- One row per symbol; the rotation board reads this table so the page
-- works even when the hosting environment cannot reach market data APIs.

CREATE TABLE IF NOT EXISTS ai_market_data (
  symbol TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE ai_market_data ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Public read ai_market_data"
    ON ai_market_data FOR SELECT
    TO anon, authenticated
    USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Service role write ai_market_data"
    ON ai_market_data FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
