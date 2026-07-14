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
  const { chains, lastUpdated } = await fetchBoardData()
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
                <Metric label="Chain score" value={chain.score.toFixed(1)} />
                <Metric label="日内均值" value={formatPct(chain.avgDayChangePct)} />
                <Metric label="5日均值" value={formatPct(chain.avgFiveDayChangePct)} />
                <Metric label="Breadth" value={`${Math.round(chain.breadth * 100)}%`} />
              </div>
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
                    <div style={{ fontSize: 18, fontWeight: 700 }}>{point.symbol}</div>
                    <div style={{ fontSize: 13, color: '#667085', marginTop: 3 }}>{point.shortName}</div>
                    <div style={{ marginTop: 8 }}>
                      <Badge label={role} fg={roleTone.fg} bg={roleTone.bg} />
                    </div>
                  </div>
                  <div>
                    <Sparkline values={point.closes} />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 8, marginTop: 12 }}>
                      <DataChip label="YTD" value={formatPct(point.ytdChangePct)} />
                      <DataChip label="Vol" value={formatLargeNumber(point.volume)} />
                      <DataChip label="MCap" value={formatLargeNumber(point.marketCap)} />
                      <DataChip label="52W" value={`${formatPrice(point.week52Low)}–${formatPrice(point.week52High)}`} />
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
