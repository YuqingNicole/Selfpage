import { createClient } from '@supabase/supabase-js'

import type { BoardConclusion, ChainData, TickerPoint } from './shared'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

export type BoardSnapshotRow = {
  snapshot_date: string
  regime: string
  summary: string
  mainline_slug: string | null
  spread_slug: string | null
  defensive_slug: string | null
  lagging_slug: string | null
  qqq_day_change_pct: number | null
  coverage: string | null
}

function makeClient(key?: string) {
  if (!SUPABASE_URL || !key) return null
  return createClient(SUPABASE_URL, key, { auth: { persistSession: false, autoRefreshToken: false } })
}

// 每次服务端渲染都 upsert 一次；同一交易日最后一次写入即收盘定格。
// 未配置 SUPABASE_SERVICE_ROLE_KEY 时自动跳过，不影响页面。
export async function persistBoardSnapshot(params: {
  tradingDate: string
  chains: ChainData[]
  conclusion: BoardConclusion
  baseline?: TickerPoint
  coverage: string
}) {
  const { tradingDate, chains, conclusion, baseline, coverage } = params
  const client = makeClient(SERVICE_KEY)
  if (!client || !tradingDate || !chains.length) return

  try {
    const chainRows = chains.map((chain) => ({
      snapshot_date: tradingDate,
      chain_slug: chain.slug,
      chain_title: chain.title,
      avg_day_change_pct: chain.avgDayChangePct,
      avg_five_day_change_pct: chain.avgFiveDayChangePct,
      median_day_change_pct: chain.medianDayChangePct,
      breadth: chain.breadth,
      breadth_improving: chain.breadthImproving,
      excess_day_pct: chain.excessDayPct,
      excess_five_day_pct: chain.excessFiveDayPct,
      leader_gap_pct: chain.leaderGapPct,
      sync_gap_pct: chain.syncGapPct,
      mode: chain.mode,
      quality: chain.quality,
      score: chain.score,
      leader_symbol: chain.leader?.symbol ?? null,
      laggard_symbol: chain.laggard?.symbol ?? null,
      updated_at: new Date().toISOString(),
    }))

    const boardRow = {
      snapshot_date: tradingDate,
      regime: conclusion.regime,
      summary: conclusion.summary,
      mainline_slug: conclusion.mainline?.slug ?? null,
      spread_slug: conclusion.spread?.slug ?? null,
      defensive_slug: conclusion.defensive?.slug ?? null,
      lagging_slug: conclusion.lagging?.slug ?? null,
      qqq_day_change_pct: baseline?.dayChangePct ?? null,
      coverage,
      updated_at: new Date().toISOString(),
    }

    await Promise.all([
      client.from('ai_chain_snapshots').upsert(chainRows, { onConflict: 'snapshot_date,chain_slug' }),
      client.from('ai_board_snapshots').upsert(boardRow, { onConflict: 'snapshot_date' }),
    ])
  } catch {
    // 落库失败不阻塞页面渲染
  }
}

// 读取最近 N 个交易日的结论快照（anon key，公开只读）。
export async function fetchRecentBoardSnapshots(limit = 14): Promise<BoardSnapshotRow[]> {
  const client = makeClient(SERVICE_KEY ?? ANON_KEY)
  if (!client) return []
  try {
    const { data, error } = await client
      .from('ai_board_snapshots')
      .select('snapshot_date, regime, summary, mainline_slug, spread_slug, defensive_slug, lagging_slug, qqq_day_change_pct, coverage')
      .order('snapshot_date', { ascending: false })
      .limit(limit)
    if (error) return []
    return (data ?? []) as BoardSnapshotRow[]
  } catch {
    return []
  }
}
