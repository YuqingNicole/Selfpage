import { BenchmarkStrip, ChainGridSection, ConclusionSection, FlowPathSection, RotationHeatmapSection } from './board-client'
import { fetchBoardData, flowOrder, type ChainData } from './data'
import { fetchRecentBoardSnapshots } from './snapshot'

export const dynamic = 'force-dynamic'

function badge(label: string, fg: string, bg: string) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 8px', borderRadius: 999, fontSize: 11, fontWeight: 600, color: fg, background: bg }}>
      {label}
    </span>
  )
}

const regimeTones: Record<string, { fg: string; bg: string }> = {
  有效扩散: { fg: '#027A48', bg: 'rgba(18,183,106,0.10)' },
  龙头抱团: { fg: '#B54708', bg: 'rgba(247,144,9,0.10)' },
  扩散衰减: { fg: '#667085', bg: 'rgba(102,112,133,0.10)' },
  普跌防御: { fg: '#D92D20', bg: 'rgba(217,45,32,0.10)' },
}

export default async function AiSupplyChainUsPage() {
  const [{ chains, allPoints, benchmarks, baseline, conclusion, tradingDate, lastUpdated, coverage }, snapshots] = await Promise.all([
    fetchBoardData(),
    fetchRecentBoardSnapshots(14),
  ])
  const primaryCount = allPoints.filter((point) => point.sourceConfidence === 'high').length
  const fallbackCount = allPoints.filter((point) => point.sourceConfidence === 'medium').length
  const flowChains = flowOrder.map((slug) => chains.find((chain) => chain.slug === slug)).filter(Boolean) as ChainData[]
  const pastSnapshots = snapshots.filter((row) => row.snapshot_date !== tradingDate)

  return (
    <main style={{ minHeight: '100vh', background: '#F8F8FC', color: '#101828' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '36px 20px 72px' }}>
        <section style={{ marginBottom: 24 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 999, background: '#FFFFFF', border: '1px solid #EAECF0', color: '#6D5EF5', fontSize: 12, fontWeight: 600 }}>
            SELF PAGE · ROTATION FLOW VERSION
          </div>
          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 280px', gap: 16, alignItems: 'start' }}>
            <div>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)', lineHeight: 1.02, margin: '0 0 12px', fontWeight: 700, letterSpacing: '-0.04em' }}>
                US AI Supply Chain Rotation Board
              </h1>
              <p style={{ maxWidth: 820, fontSize: 16, lineHeight: 1.75, color: '#475467', margin: 0 }}>
                不只看强弱排名：每条链先对比 QQQ 算超额收益，再用中位数、龙头带动差、前后排同步差和 5 日 breadth 趋势判断扩散质量，最后翻译成一句轮动结论。每个交易日的结论自动落库存档。
              </p>
            </div>
            <div style={{ borderRadius: 20, border: '1px solid #EAECF0', background: '#FFFFFF', padding: 16, boxShadow: '0 1px 2px rgba(16,24,40,0.04)' }}>
              <div style={{ fontSize: 12, color: '#667085', marginBottom: 8 }}>Last updated</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{lastUpdated}</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {badge(`Coverage ${coverage}`, '#6941C6', 'rgba(109,65,198,0.10)')}
                {badge(`Primary ${primaryCount}`, '#027A48', 'rgba(18,183,106,0.10)')}
                {badge(`Fallback ${fallbackCount}`, '#B54708', 'rgba(247,144,9,0.10)')}
                {tradingDate && badge(`交易日 ${tradingDate}`, '#6D5EF5', 'rgba(109,94,245,0.10)')}
              </div>
            </div>
          </div>
        </section>

        <ConclusionSection conclusion={conclusion} />
        <BenchmarkStrip benchmarks={benchmarks} baseline={baseline} />
        {flowChains.length > 0 && <FlowPathSection flowChains={flowChains} />}
        {flowChains.length > 0 && <RotationHeatmapSection flowChains={flowChains} />}
        <ChainGridSection chains={chains} />

        {/* 历史结论：来自 Supabase 每日快照 */}
        {pastSnapshots.length > 0 && (
          <section style={{ borderRadius: 24, border: '1px solid #EAECF0', background: '#FFFFFF', padding: 24, boxShadow: '0 1px 2px rgba(16,24,40,0.04)', marginTop: 22 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#6D5EF5', letterSpacing: '0.08em', marginBottom: 4 }}>结论存档 · 每日快照</div>
            <div style={{ fontSize: 12, color: '#667085', marginBottom: 14 }}>每个交易日收盘后的轮动结论会自动写入 Supabase，用于复盘轮动路径是否兑现。</div>
            <div style={{ display: 'grid', gap: 8 }}>
              {pastSnapshots.map((row) => {
                const tone = regimeTones[row.regime] ?? regimeTones['扩散衰减']
                return (
                  <div key={row.snapshot_date} style={{ display: 'flex', gap: 12, alignItems: 'baseline', flexWrap: 'wrap', borderRadius: 14, border: '1px solid #F2F4F7', background: '#F9FAFB', padding: '12px 14px' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, minWidth: 88 }}>{row.snapshot_date}</span>
                    {badge(row.regime, tone.fg, tone.bg)}
                    <span style={{ fontSize: 13, color: '#475467', lineHeight: 1.6, flex: 1, minWidth: 260 }}>{row.summary}</span>
                  </div>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
