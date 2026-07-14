import Link from 'next/link'
import { notFound } from 'next/navigation'

import { chainDefs, fetchBoardData, formatLargeNumber, formatPct, formatPrice } from '../data'

export const dynamic = 'force-dynamic'

function Badge({ label, fg, bg }: { label: string; fg: string; bg: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 8px', borderRadius: 999, fontSize: 11, fontWeight: 600, color: fg, background: bg }}>
      {label}
    </span>
  )
}

function getRoleTone(role: 'Leader' | 'Follower' | 'Laggard') {
  if (role === 'Leader') return { fg: '#6D5EF5', bg: 'rgba(109,94,245,0.10)' }
  if (role === 'Laggard') return { fg: '#D94F70', bg: 'rgba(217,79,112,0.10)' }
  return { fg: '#667085', bg: 'rgba(102,112,133,0.10)' }
}

function getPointRole(index: number, total: number): 'Leader' | 'Follower' | 'Laggard' {
  if (index === 0) return 'Leader'
  if (index === total - 1) return 'Laggard'
  return 'Follower'
}

function Sparkline({ values }: { values: number[] }) {
  if (!values.length) return null
  const width = 132
  const height = 30
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1 || 1)) * width
      const y = height - ((value - min) / range) * height
      return `${x},${y}`
    })
    .join(' ')
  const up = values[values.length - 1] >= values[0]

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      <polyline fill="none" stroke={up ? '#8B7CF6' : '#F87171'} strokeWidth="2" points={points} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export async function generateStaticParams() {
  return chainDefs.map((chain) => ({ slug: chain.slug }))
}

export default async function ChainDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { chains, baseline, lastUpdated } = await fetchBoardData()
  const chain = chains.find((item) => item.slug === slug)
  if (!chain) notFound()

  const rankedPoints = [...chain.points].sort((a, b) => b.dayChangePct - a.dayChangePct)

  return (
    <main style={{ minHeight: '100vh', background: '#F8F8FC', color: '#101828' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '36px 20px 72px' }}>
        <div style={{ marginBottom: 20 }}>
          <Link href="/ai-supply-chain-us" style={{ color: '#6D5EF5', textDecoration: 'none', fontWeight: 600 }}>
            ← 返回总览
          </Link>
        </div>

        <section style={{ borderRadius: 24, border: '1px solid #EAECF0', background: '#FFFFFF', padding: 24, boxShadow: '0 1px 2px rgba(16,24,40,0.04)', marginBottom: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'start', flexWrap: 'wrap' }}>
            <div>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.05, margin: '0 0 10px', fontWeight: 700 }}>{chain.title}</h1>
              <div style={{ color: '#475467', lineHeight: 1.75, maxWidth: 760 }}>{chain.desc}</div>
              <div style={{ color: '#667085', lineHeight: 1.7, marginTop: 10 }}>观察点：{chain.signal}</div>
            </div>
            <div style={{ minWidth: 220, borderRadius: 16, background: '#F9FAFB', border: '1px solid #F2F4F7', padding: 16 }}>
              <div style={{ fontSize: 12, color: '#667085', marginBottom: 8 }}>Last updated</div>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>{lastUpdated}</div>
              <div style={{ display: 'grid', gap: 8 }}>
                <Metric label="Rotation score" value={chain.score.toFixed(1)} />
                <Metric label="日内均值" value={formatPct(chain.avgDayChangePct)} />
                <Metric label="5日均值" value={formatPct(chain.avgFiveDayChangePct)} />
                <Metric label="Breadth" value={`${Math.round(chain.breadth * 100)}%`} />
              </div>
            </div>
          </div>
        </section>

        {/* 扩散质量：这条链的上涨是龙头独舞还是集体行动 */}
        <section style={{ borderRadius: 24, border: '1px solid #EAECF0', background: '#FFFFFF', padding: 24, boxShadow: '0 1px 2px rgba(16,24,40,0.04)', marginBottom: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#6D5EF5', letterSpacing: '0.08em' }}>扩散质量</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Badge label={chain.quality} fg="#101828" bg="#F2F4F7" />
              <Badge label={chain.mode} fg="#667085" bg="rgba(102,112,133,0.10)" />
            </div>
          </div>
          <div style={{ fontSize: 13, color: '#475467', lineHeight: 1.7, marginBottom: 14, padding: '10px 14px', borderRadius: 12, background: '#F9FAFB', border: '1px solid #F2F4F7' }}>
            判定依据：{chain.qualityReason}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10, marginBottom: 16 }}>
            <QualityMetric
              label="β调整超额 α（日）"
              value={chain.betaAdjExcessDayPct !== null ? formatPct(chain.betaAdjExcessDayPct) : '—'}
              good={(chain.betaAdjExcessDayPct ?? 0) >= 0}
              hint={chain.beta !== null ? `β(60D)=${chain.beta.toFixed(2)}，剔除弹性后的真实强弱` : 'β 样本不足'}
            />
            <QualityMetric label="raw 超额（日）" value={formatPct(chain.excessDayPct)} good={chain.excessDayPct >= 0} hint={baseline ? `QQQ ${formatPct(baseline.dayChangePct)}，未做 β 调整` : 'QQQ 不可用'} />
            <QualityMetric label="raw 超额（5日）" value={formatPct(chain.excessFiveDayPct)} good={chain.excessFiveDayPct >= 0} hint="持续为正 = 真强" />
            <QualityMetric label="中位数涨幅" value={formatPct(chain.medianDayChangePct)} good={chain.medianDayChangePct >= 0} hint="均值被龙头拉高时看这里" />
            <QualityMetric label="龙头带动差" value={formatPct(chain.leaderGapPct)} good={chain.leaderGapPct <= 2.5} hint="龙头 − 其余中位数，>2.5% 视为抱团迹象" />
            <QualityMetric
              label="Breadth"
              value={`${chain.points.filter((point) => point.dayChangePct > 0).length}/${chain.points.length} (${Math.round(chain.breadth * 100)}%)`}
              good={chain.breadth >= 0.5}
              hint={`样本仅 ${chain.points.length} 只，粒度约 ${Math.round(100 / chain.points.length)}%`}
            />
          </div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'end', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 12, color: '#667085', marginBottom: 8 }}>近 5 日 breadth（{chain.breadthImproving ? '改善中' : '走平/转弱'}）</div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'end', height: 44 }}>
                {chain.breadthSeries.map((value, index) => (
                  <div key={index} style={{ width: 22, height: Math.max(4, value * 44), borderRadius: 4, background: index === chain.breadthSeries.length - 1 ? '#6D5EF5' : '#D0C9F8' }} title={`${Math.round(value * 100)}%`} />
                ))}
              </div>
            </div>
            <div style={{ fontSize: 13, color: '#475467', lineHeight: 1.7, maxWidth: 520 }}>
              前 2 名与后 2 名当日同步差 <strong>{formatPct(chain.syncGapPct)}</strong>
              {chain.syncGapPct > 5 ? '，差距偏大，链内并不同步。' : '，链内整体同步。'}
            </div>
          </div>
        </section>

        {/* Score 拆解：Rotation score 不是黑箱，每一项贡献都列出来 */}
        <section style={{ borderRadius: 24, border: '1px solid #EAECF0', background: '#FFFFFF', padding: 24, boxShadow: '0 1px 2px rgba(16,24,40,0.04)', marginBottom: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#6D5EF5', letterSpacing: '0.08em', marginBottom: 4 }}>Rotation score 拆解</div>
          <div style={{ fontSize: 12, color: '#667085', marginBottom: 14 }}>启发式加权求和，非统计模型。各项贡献如下（单位为分）：</div>
          <div style={{ display: 'grid', gap: 6, maxWidth: 560 }}>
            {chain.scoreParts.map((part) => {
              const maxAbs = Math.max(...chain.scoreParts.map((item) => Math.abs(item.value)), 0.001)
              const width = (Math.abs(part.value) / maxAbs) * 100
              return (
                <div key={part.label} style={{ display: 'grid', gridTemplateColumns: '180px minmax(0,1fr) 64px', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: '#667085' }}>{part.label}</span>
                  <div style={{ height: 10, borderRadius: 5, background: '#F2F4F7', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${width}%`, borderRadius: 5, background: part.value >= 0 ? '#12B76A' : '#F04438' }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, textAlign: 'right', color: part.value >= 0 ? '#027A48' : '#D92D20' }}>{part.value >= 0 ? '+' : ''}{part.value.toFixed(2)}</span>
                </div>
              )
            })}
            <div style={{ display: 'grid', gridTemplateColumns: '180px minmax(0,1fr) 64px', gap: 10, alignItems: 'center', borderTop: '1px solid #EAECF0', paddingTop: 8, marginTop: 2 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#101828' }}>合计</span>
              <div />
              <span style={{ fontSize: 13, fontWeight: 700, textAlign: 'right', color: chain.score >= 0 ? '#6D5EF5' : '#D94F70' }}>{chain.score.toFixed(2)}</span>
            </div>
          </div>
        </section>

        <section style={{ display: 'grid', gap: 12 }}>
          {rankedPoints.map((point, index) => {
            const role = getPointRole(index, rankedPoints.length)
            const roleTone = getRoleTone(role)
            return (
              <article key={point.symbol} style={{ borderRadius: 20, border: '1px solid #EAECF0', background: '#FFFFFF', padding: 18, boxShadow: '0 1px 2px rgba(16,24,40,0.04)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '140px minmax(0,1fr) auto', gap: 14, alignItems: 'center' }}>
                  <div>
                    <a
                      href={`https://finance.yahoo.com/quote/${encodeURIComponent(point.symbol)}`}
                      target="_blank"
                      rel="noreferrer"
                      title={`在 Yahoo Finance 查看 ${point.symbol}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#6D5EF5' }}>{point.symbol} ↗</div>
                      <div style={{ fontSize: 13, color: '#667085', marginTop: 3 }}>{point.shortName}</div>
                    </a>
                    <div style={{ marginTop: 8 }}>
                      <Badge label={role} fg={roleTone.fg} bg={roleTone.bg} />
                    </div>
                  </div>
                  <div>
                    <Sparkline values={point.closes.slice(-15)} />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 8, marginTop: 12 }}>
                      <DataChip label="超额 vs QQQ（日）" value={baseline ? formatPct(point.dayChangePct - baseline.dayChangePct) : '—'} />
                      <DataChip label="超额 vs QQQ（5日）" value={baseline ? formatPct(point.fiveDayChangePct - baseline.fiveDayChangePct) : '—'} />
                      <DataChip label="近5日连涨" value={`${point.positiveDays}/4 天`} />
                      <DataChip label="YTD" value={formatPct(point.ytdChangePct)} />
                      <DataChip label="Vol / 3月均量" value={`${formatLargeNumber(point.volume)} / ${formatLargeNumber(point.avgVolume)}`} />
                      <DataChip label="MCap · 52W" value={`${formatLargeNumber(point.marketCap)} · ${formatPrice(point.week52Low)}–${formatPrice(point.week52High)}`} />
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>{formatPrice(point.price)}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: point.dayChangePct >= 0 ? '#027A48' : '#D92D20' }}>{formatPct(point.dayChangePct)}</div>
                    <div style={{ fontSize: 12, color: '#667085', marginTop: 2 }}>5D {formatPct(point.fiveDayChangePct)}</div>
                    <div style={{ display: 'flex', justifyContent: 'end', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                      <Badge label={point.sourceConfidence === 'high' ? 'Primary' : 'Fallback'} fg={point.sourceConfidence === 'high' ? '#6D5EF5' : '#B54708'} bg={point.sourceConfidence === 'high' ? 'rgba(109,94,245,0.10)' : 'rgba(247,144,9,0.10)'} />
                      <Badge label={point.freshness === 'live-ish' ? 'Live-ish' : 'Delayed'} fg={point.freshness === 'live-ish' ? '#027A48' : '#B54708'} bg={point.freshness === 'live-ish' ? 'rgba(18,183,106,0.10)' : 'rgba(247,144,9,0.10)'} />
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </section>
      </div>
    </main>
  )
}

function QualityMetric({ label, value, good, hint }: { label: string; value: string; good: boolean; hint: string }) {
  return (
    <div style={{ borderRadius: 14, background: '#F9FAFB', border: '1px solid #F2F4F7', padding: '12px 12px 10px' }}>
      <div style={{ fontSize: 11, color: '#667085', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 17, fontWeight: 700, color: good ? '#027A48' : '#D92D20' }}>{value}</div>
      <div style={{ fontSize: 11, color: '#98A2B3', marginTop: 4 }}>{hint}</div>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 13 }}>
      <span style={{ color: '#667085' }}>{label}</span>
      <span style={{ fontWeight: 700 }}>{value}</span>
    </div>
  )
}

function DataChip({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ borderRadius: 12, background: '#FFFFFF', border: '1px solid #EAECF0', padding: '9px 10px' }}>
      <div style={{ fontSize: 10, color: '#667085', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 12, color: '#101828', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</div>
    </div>
  )
}
