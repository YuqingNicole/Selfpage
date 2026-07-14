import { Fragment } from 'react'
import Link from 'next/link'

import { benchmarkNames, fetchBoardData, flowOrder, formatPct, type ChainData, type ChainQuality } from './data'

export const dynamic = 'force-dynamic'

function badge(label: string, fg: string, bg: string) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 8px', borderRadius: 999, fontSize: 11, fontWeight: 600, color: fg, background: bg }}>
      {label}
    </span>
  )
}

const qualityTones: Record<ChainQuality, { fg: string; bg: string }> = {
  有效扩散: { fg: '#027A48', bg: 'rgba(18,183,106,0.10)' },
  龙头抱团: { fg: '#B54708', bg: 'rgba(247,144,9,0.10)' },
  补涨修复: { fg: '#6D5EF5', bg: 'rgba(109,94,245,0.10)' },
  跟涨: { fg: '#667085', bg: 'rgba(102,112,133,0.10)' },
  走弱: { fg: '#D92D20', bg: 'rgba(217,45,32,0.10)' },
}

function QualityBadge({ quality }: { quality: ChainQuality }) {
  const tone = qualityTones[quality]
  return badge(quality, tone.fg, tone.bg)
}

function flowTone(chain: ChainData) {
  if (chain.excessDayPct > 0.3 && chain.breadth >= 0.6) return { fg: '#027A48', bg: 'rgba(18,183,106,0.12)', border: 'rgba(18,183,106,0.35)' }
  if (chain.excessDayPct > 0) return { fg: '#6D5EF5', bg: 'rgba(109,94,245,0.10)', border: 'rgba(109,94,245,0.30)' }
  if (chain.avgDayChangePct > 0) return { fg: '#667085', bg: 'rgba(102,112,133,0.08)', border: '#EAECF0' }
  return { fg: '#D92D20', bg: 'rgba(217,45,32,0.08)', border: 'rgba(217,45,32,0.25)' }
}

export default async function AiSupplyChainUsPage() {
  const { chains, allPoints, benchmarks, baseline, conclusion, lastUpdated, coverage } = await fetchBoardData()
  const primaryCount = allPoints.filter((point) => point.sourceConfidence === 'high').length
  const fallbackCount = allPoints.filter((point) => point.sourceConfidence === 'medium').length
  const flowChains = flowOrder.map((slug) => chains.find((chain) => chain.slug === slug)).filter(Boolean) as ChainData[]

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
                不只看强弱排名：每条链先对比 QQQ 算超额收益，再用中位数、龙头带动差、前后排同步差和 5 日 breadth 趋势判断扩散质量，最后翻译成一句轮动结论。
              </p>
            </div>
            <div style={{ borderRadius: 20, border: '1px solid #EAECF0', background: '#FFFFFF', padding: 16, boxShadow: '0 1px 2px rgba(16,24,40,0.04)' }}>
              <div style={{ fontSize: 12, color: '#667085', marginBottom: 8 }}>Last updated</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{lastUpdated}</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {badge(`Coverage ${coverage}`, '#6941C6', 'rgba(109,65,198,0.10)')}
                {badge(`Primary ${primaryCount}`, '#027A48', 'rgba(18,183,106,0.10)')}
                {badge(`Fallback ${fallbackCount}`, '#B54708', 'rgba(247,144,9,0.10)')}
              </div>
            </div>
          </div>
        </section>

        {/* 结论层：先给答案，再看数据 */}
        <section style={{ borderRadius: 24, border: '1px solid #EAECF0', background: '#FFFFFF', padding: 24, boxShadow: '0 1px 2px rgba(16,24,40,0.04)', marginBottom: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#6D5EF5', letterSpacing: '0.08em' }}>今日轮动结论</div>
            {badge(`当前状态：${conclusion.regime}`, '#101828', '#F2F4F7')}
          </div>
          <div style={{ fontSize: 17, lineHeight: 1.7, fontWeight: 600, marginBottom: 16 }}>{conclusion.summary}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 10 }}>
            <ConclusionTile label="主线" chain={conclusion.mainline} accent="#6D5EF5" />
            <ConclusionTile label="扩散最强" chain={conclusion.spread} accent="#027A48" />
            <ConclusionTile label="防御承接" chain={conclusion.defensive} accent="#B54708" />
            <ConclusionTile label="明显掉队" chain={conclusion.lagging} accent="#D92D20" />
          </div>
        </section>

        {/* 相对强弱基准 */}
        <section style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 18 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#667085' }}>基准（超额收益均相对 QQQ）</div>
          {benchmarks.map((bench) => (
            <div key={bench.symbol} style={{ display: 'flex', gap: 10, alignItems: 'baseline', borderRadius: 14, border: '1px solid #EAECF0', background: '#FFFFFF', padding: '10px 14px' }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>{bench.symbol}</span>
              <span style={{ fontSize: 11, color: '#667085' }}>{benchmarkNames[bench.symbol] ?? bench.shortName}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: bench.dayChangePct >= 0 ? '#027A48' : '#D92D20' }}>{formatPct(bench.dayChangePct)}</span>
              <span style={{ fontSize: 11, color: '#667085' }}>5D {formatPct(bench.fiveDayChangePct)}</span>
            </div>
          ))}
          {!baseline && (
            <div style={{ fontSize: 12, color: '#B54708' }}>QQQ 数据暂不可用，超额收益退化为绝对涨幅。</div>
          )}
        </section>

        {/* 轮动路径：资金从上游往下游走到了哪一环 */}
        <section style={{ borderRadius: 24, border: '1px solid #EAECF0', background: '#FFFFFF', padding: 20, boxShadow: '0 1px 2px rgba(16,24,40,0.04)', marginBottom: 22 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#6D5EF5', letterSpacing: '0.08em', marginBottom: 12 }}>轮动路径 · 上游 → 下游</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'stretch', flexWrap: 'wrap' }}>
            {flowChains.map((chain, index) => {
              const tone = flowTone(chain)
              return (
                <div key={chain.slug} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Link href={`/ai-supply-chain-us/${chain.slug}`} style={{ textDecoration: 'none', display: 'block', borderRadius: 14, border: `1px solid ${tone.border}`, background: tone.bg, padding: '10px 14px', minWidth: 132 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#101828' }}>{chain.shortTitle}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: tone.fg, marginTop: 4 }}>超额 {formatPct(chain.excessDayPct)}</div>
                    <div style={{ fontSize: 11, color: '#667085', marginTop: 2 }}>
                      breadth {Math.round(chain.breadth * 100)}%{chain.breadthImproving ? ' ↑' : ' ↓'}
                    </div>
                  </Link>
                  {index < flowChains.length - 1 && <span style={{ color: '#98A2B3', fontSize: 16 }}>→</span>}
                </div>
              )
            })}
          </div>
          <div style={{ fontSize: 12, color: '#667085', marginTop: 12 }}>
            绿色 = 超额领先且扩散健康；紫色 = 超额为正；灰色 = 跟涨（涨但跑输 QQQ）；红色 = 走弱。
          </div>
        </section>

        {/* 轮动轨迹：过去 10 个交易日，每天哪条链在领跑（相对 QQQ 的日超额） */}
        {flowChains.some((chain) => chain.history.length > 1) && (
          <section style={{ borderRadius: 24, border: '1px solid #EAECF0', background: '#FFFFFF', padding: 20, boxShadow: '0 1px 2px rgba(16,24,40,0.04)', marginBottom: 22 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#6D5EF5', letterSpacing: '0.08em', marginBottom: 4 }}>轮动轨迹 · 近 10 个交易日</div>
            <div style={{ fontSize: 12, color: '#667085', marginBottom: 14 }}>每格 = 该链当日相对 QQQ 的超额收益。绿涨红跌，颜色越深超额越大；描边 = 当日领跑链。顺着深绿格子从上往下看，就是资金的扩散路径。</div>
            <RotationHeatmap chains={flowChains} />
          </section>
        )}

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16 }}>
          {chains.map((chain) => (
            <Link
              key={chain.slug}
              href={`/ai-supply-chain-us/${chain.slug}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                borderRadius: 20,
                border: '1px solid #EAECF0',
                background: '#FFFFFF',
                padding: 20,
                boxShadow: '0 1px 2px rgba(16,24,40,0.04)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start', marginBottom: 12 }}>
                <div>
                  <h2 style={{ fontSize: 20, lineHeight: 1.2, margin: '0 0 6px' }}>{chain.title}</h2>
                  <div style={{ color: '#667085', fontSize: 14 }}>{chain.desc}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: '#667085', marginBottom: 4 }}>Rotation score</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: chain.score >= 0 ? '#6D5EF5' : '#D94F70' }}>{chain.score.toFixed(1)}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                <QualityBadge quality={chain.quality} />
                {badge(chain.mode, '#101828', '#F2F4F7')}
                {badge(`breadth ${chain.breadthImproving ? '改善中' : '走平/转弱'}`, chain.breadthImproving ? '#027A48' : '#667085', chain.breadthImproving ? 'rgba(18,183,106,0.10)' : 'rgba(102,112,133,0.10)')}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10, marginBottom: 12 }}>
                <MiniMetric label="超额 vs QQQ" value={formatPct(chain.excessDayPct)} positive={chain.excessDayPct >= 0} />
                <MiniMetric label="中位数涨幅" value={formatPct(chain.medianDayChangePct)} positive={chain.medianDayChangePct >= 0} />
                <MiniMetric label="Breadth" value={`${Math.round(chain.breadth * 100)}%`} positive={chain.breadth >= 0.5} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10, marginBottom: 14 }}>
                <MiniMetric label="日内均值" value={formatPct(chain.avgDayChangePct)} positive={chain.avgDayChangePct >= 0} />
                <MiniMetric label="龙头带动差" value={formatPct(chain.leaderGapPct)} positive={chain.leaderGapPct <= 2.5} />
                <MiniMetric label="前2/后2同步差" value={formatPct(chain.syncGapPct)} positive={chain.syncGapPct <= 5} />
              </div>

              <div style={{ color: '#475467', fontSize: 13, lineHeight: 1.65, marginBottom: 14 }}>观察点：{chain.signal}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                <div style={{ color: '#667085', fontSize: 13 }}>{chain.symbols.join(' · ')}</div>
                <div style={{ color: '#6D5EF5', fontSize: 13, fontWeight: 600 }}>查看详情 →</div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  )
}

function heatColor(excessPct: number) {
  const alpha = Math.min(0.85, 0.12 + Math.abs(excessPct) * 0.22)
  return excessPct >= 0 ? `rgba(18,183,106,${alpha})` : `rgba(217,45,32,${alpha})`
}

function RotationHeatmap({ chains }: { chains: ChainData[] }) {
  const days = Math.max(...chains.map((chain) => chain.history.length))
  if (!Number.isFinite(days) || days < 2) return null

  // 每列（每个交易日）超额最高的链作为当日领跑者。
  const dailyLeader: number[] = []
  for (let day = 0; day < days; day++) {
    let best = -Infinity
    let bestIndex = -1
    chains.forEach((chain, chainIndex) => {
      const stat = chain.history[chain.history.length - days + day]
      if (stat && stat.excessPct > best) {
        best = stat.excessPct
        bestIndex = chainIndex
      }
    })
    dailyLeader.push(bestIndex)
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: `120px repeat(${days}, minmax(34px, 1fr))`, gap: 4, minWidth: 560 }}>
        <div />
        {Array.from({ length: days }, (_, day) => (
          <div key={day} style={{ fontSize: 10, color: '#98A2B3', textAlign: 'center', alignSelf: 'end' }}>
            {day === days - 1 ? '今' : `-${days - 1 - day}`}
          </div>
        ))}
        {chains.map((chain, chainIndex) => (
          <Fragment key={chain.slug}>
            <Link href={`/ai-supply-chain-us/${chain.slug}`} style={{ textDecoration: 'none', fontSize: 12, fontWeight: 600, color: '#475467', alignSelf: 'center', whiteSpace: 'nowrap' }}>
              {chain.shortTitle}
            </Link>
            {Array.from({ length: days }, (_, day) => {
              const stat = chain.history[chain.history.length - days + day]
              if (!stat) return <div key={day} style={{ height: 30, borderRadius: 6, background: '#F2F4F7' }} />
              const isLeader = dailyLeader[day] === chainIndex
              return (
                <div
                  key={day}
                  title={`超额 ${formatPct(stat.excessPct)} · 日均 ${formatPct(stat.avgPct)} · breadth ${Math.round(stat.breadth * 100)}%`}
                  style={{
                    height: 30,
                    borderRadius: 6,
                    background: heatColor(stat.excessPct),
                    border: isLeader ? '2px solid #101828' : '1px solid rgba(16,24,40,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 9,
                    fontWeight: 700,
                    color: Math.abs(stat.excessPct) > 1.6 ? '#FFFFFF' : '#101828',
                  }}
                >
                  {stat.excessPct >= 0 ? '+' : ''}
                  {stat.excessPct.toFixed(1)}
                </div>
              )
            })}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

function ConclusionTile({ label, chain, accent }: { label: string; chain?: ChainData; accent: string }) {
  return (
    <div style={{ borderRadius: 16, border: '1px solid #F2F4F7', background: '#F9FAFB', padding: '14px 14px 12px' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: accent, marginBottom: 6 }}>{label}</div>
      {chain ? (
        <>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{chain.shortTitle}</div>
          <div style={{ fontSize: 12, color: '#667085', marginTop: 4 }}>
            超额 {formatPct(chain.excessDayPct)} · breadth {Math.round(chain.breadth * 100)}%
          </div>
        </>
      ) : (
        <div style={{ fontSize: 13, color: '#98A2B3' }}>今日无明确对象</div>
      )}
    </div>
  )
}

function MiniMetric({ label, value, positive }: { label: string; value: string; positive: boolean }) {
  return (
    <div style={{ borderRadius: 14, background: '#F9FAFB', border: '1px solid #F2F4F7', padding: '12px 12px 10px' }}>
      <div style={{ fontSize: 11, color: '#667085', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 17, fontWeight: 700, color: positive ? '#027A48' : '#D92D20' }}>{value}</div>
    </div>
  )
}
