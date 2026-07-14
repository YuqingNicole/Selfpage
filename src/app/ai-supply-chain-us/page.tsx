import { BenchmarkStrip, ChainGridSection, ConclusionSection, FlowPathSection, RotationHeatmapSection } from './board-client'
import { fetchBoardData, flowOrder, formatPct, thresholds, type ChainData } from './data'
import { fetchRecentBoardSnapshots, fetchSignalTrack } from './snapshot'

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
  const [{ chains, allPoints, benchmarks, baseline, conclusion, tradingDate, lastUpdated, coverage }, snapshots, signalTrack] = await Promise.all([
    fetchBoardData(),
    fetchRecentBoardSnapshots(14),
    fetchSignalTrack(),
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

        {/* 信号追踪：昨天的判断，今天兑现了吗 —— 产品自己的 track record */}
        {signalTrack && (
          <section style={{ borderRadius: 24, border: '1px solid #EAECF0', background: '#FFFFFF', padding: 24, boxShadow: '0 1px 2px rgba(16,24,40,0.04)', marginTop: 22 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#6D5EF5', letterSpacing: '0.08em', marginBottom: 4 }}>信号追踪 · 次日兑现率</div>
            <div style={{ fontSize: 12, color: '#667085', marginBottom: 14 }}>
              存档中每一天的「主线」和「扩散最强」，检查次一交易日该链 raw 超额是否为正。样本随落库天数累积，前期波动大，仅作框架校验。
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
              <div style={{ borderRadius: 14, border: '1px solid #F2F4F7', background: '#F9FAFB', padding: '12px 16px' }}>
                <div style={{ fontSize: 11, color: '#667085', marginBottom: 4 }}>主线信号命中率</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#6D5EF5' }}>
                  {signalTrack.mainlineTotal ? `${Math.round((signalTrack.mainlineHits / signalTrack.mainlineTotal) * 100)}%` : '—'}
                  <span style={{ fontSize: 12, color: '#667085', fontWeight: 600 }}> （{signalTrack.mainlineHits}/{signalTrack.mainlineTotal}）</span>
                </div>
              </div>
              <div style={{ borderRadius: 14, border: '1px solid #F2F4F7', background: '#F9FAFB', padding: '12px 16px' }}>
                <div style={{ fontSize: 11, color: '#667085', marginBottom: 4 }}>扩散信号命中率</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#027A48' }}>
                  {signalTrack.spreadTotal ? `${Math.round((signalTrack.spreadHits / signalTrack.spreadTotal) * 100)}%` : '—'}
                  <span style={{ fontSize: 12, color: '#667085', fontWeight: 600 }}> （{signalTrack.spreadHits}/{signalTrack.spreadTotal}）</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gap: 6 }}>
              {signalTrack.rows.slice(0, 12).map((row) => (
                <div key={`${row.date}-${row.signal}`} style={{ display: 'flex', gap: 12, alignItems: 'baseline', flexWrap: 'wrap', fontSize: 13, borderRadius: 12, border: '1px solid #F2F4F7', background: '#F9FAFB', padding: '10px 14px' }}>
                  <span style={{ fontWeight: 700, minWidth: 88 }}>{row.date}</span>
                  {badge(row.signal, row.signal === '主线' ? '#6D5EF5' : '#027A48', row.signal === '主线' ? 'rgba(109,94,245,0.10)' : 'rgba(18,183,106,0.10)')}
                  <span style={{ color: '#475467', flex: 1, minWidth: 180 }}>{row.chainTitle}</span>
                  <span style={{ color: '#667085', fontSize: 12 }}>次日（{row.nextDate}）超额 {formatPct(row.nextExcessPct)}</span>
                  {badge(row.hit ? '兑现' : '未兑现', row.hit ? '#027A48' : '#D92D20', row.hit ? 'rgba(18,183,106,0.10)' : 'rgba(217,45,32,0.10)')}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 方法论与局限：口径、阈值、免责声明常驻 */}
        <section style={{ borderRadius: 24, border: '1px solid #EAECF0', background: '#FFFFFF', padding: 24, boxShadow: '0 1px 2px rgba(16,24,40,0.04)', marginTop: 22 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#667085', letterSpacing: '0.08em', marginBottom: 12 }}>方法论与局限</div>
          <div style={{ display: 'grid', gap: 8, fontSize: 13, color: '#475467', lineHeight: 1.75, maxWidth: 900 }}>
            <div>
              <strong>数据</strong>：Yahoo Finance（约 15 分钟延迟）为主，Stooq 兜底；服务端缓存 30 分钟。盘中读数会持续变化，收盘后定格并落库存档。
            </div>
            <div>
              <strong>口径</strong>：链内指标为成分股<strong>等权</strong>平均（未按市值加权）。raw 超额 = 链等权日收益 − QQQ；β 调整超额 α = 链日收益 − β × QQQ，其中 β 为近 {thresholds.betaWindow} 个交易日日收益对 QQQ 的回归斜率（样本不足 {thresholds.betaMinSamples} 天不显示）。低 β 链（如电力）看 raw 超额会长期偏弱，请以 α 为准。
            </div>
            <div>
              <strong>阈值</strong>（启发式，非统计检验）：龙头带动差 &gt; {thresholds.leaderGapPct}%、前2/后2同步差 &gt; {thresholds.syncGapPct}% 或 breadth &lt; {Math.round(thresholds.breadthWeak * 100)}% 判为「龙头抱团」；超额 &gt; {thresholds.strongExcess}% 且 breadth ≥ {Math.round(thresholds.breadthHealthy * 100)}% 视为扩散健康。Rotation score 为启发式加权和，成分拆解见各链详情页。
            </div>
            <div>
              <strong>局限</strong>：每条链仅 4–6 只成分股，breadth 粒度约 20–25%，单只个股翻面即可改变标签；链与成分为手工维护，非行业标准分类；结论层是规则翻译，不构成任何投资建议。
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
