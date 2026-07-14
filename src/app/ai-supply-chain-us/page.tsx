import Link from 'next/link'

import { fetchBoardData, formatPct } from './data'

export const dynamic = 'force-dynamic'

function badge(label: string, fg: string, bg: string) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 8px', borderRadius: 999, fontSize: 11, fontWeight: 600, color: fg, background: bg }}>
      {label}
    </span>
  )
}

export default async function AiSupplyChainUsPage() {
  const { chains, allPoints, lastUpdated, coverage } = await fetchBoardData()
  const primaryCount = allPoints.filter((point) => point.sourceConfidence === 'high').length
  const fallbackCount = allPoints.filter((point) => point.sourceConfidence === 'medium').length

  return (
    <main style={{ minHeight: '100vh', background: '#F8F8FC', color: '#101828' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '36px 20px 72px' }}>
        <section style={{ marginBottom: 28 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 999, background: '#FFFFFF', border: '1px solid #EAECF0', color: '#6D5EF5', fontSize: 12, fontWeight: 600 }}>
            SELF PAGE · LIVE MARKET VERSION
          </div>
          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 280px', gap: 16, alignItems: 'start' }}>
            <div>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)', lineHeight: 1.02, margin: '0 0 12px', fontWeight: 700, letterSpacing: '-0.04em' }}>
                US AI Supply Chain Decision Board
              </h1>
              <p style={{ maxWidth: 820, fontSize: 16, lineHeight: 1.75, color: '#475467', margin: 0 }}>
                这版已经不是静态展示页，而是直接抓取公开美股行情，压缩成主线强弱、龙头联动和“资金流向代理”判断。现在每条链都可以点进二级页看详情。
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
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start', marginBottom: 14 }}>
                <div>
                  <h2 style={{ fontSize: 20, lineHeight: 1.2, margin: '0 0 6px' }}>{chain.title}</h2>
                  <div style={{ color: '#667085', fontSize: 14 }}>{chain.desc}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: '#667085', marginBottom: 4 }}>Score</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: chain.score >= 0 ? '#6D5EF5' : '#D94F70' }}>{chain.score.toFixed(1)}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10, marginBottom: 14 }}>
                <MiniMetric label="日内" value={formatPct(chain.avgDayChangePct)} positive={chain.avgDayChangePct >= 0} />
                <MiniMetric label="5日" value={formatPct(chain.avgFiveDayChangePct)} positive={chain.avgFiveDayChangePct >= 0} />
                <MiniMetric label="Breadth" value={`${Math.round(chain.breadth * 100)}%`} positive={chain.breadth >= 0.5} />
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

function MiniMetric({ label, value, positive }: { label: string; value: string; positive: boolean }) {
  return (
    <div style={{ borderRadius: 14, background: '#F9FAFB', border: '1px solid #F2F4F7', padding: '12px 12px 10px' }}>
      <div style={{ fontSize: 11, color: '#667085', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 17, fontWeight: 700, color: positive ? '#027A48' : '#D92D20' }}>{value}</div>
    </div>
  )
}
