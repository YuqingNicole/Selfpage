export const dynamic = 'force-dynamic'

type QuoteMeta = {
  symbol: string
  shortName?: string
  regularMarketPrice?: number
  regularMarketPreviousClose?: number
  regularMarketVolume?: number
  averageDailyVolume3Month?: number
  marketCap?: number
  fiftyTwoWeekHigh?: number
  fiftyTwoWeekLow?: number
  preMarketPrice?: number
  postMarketPrice?: number
  currency?: string
}

type TickerPoint = {
  symbol: string
  shortName: string
  price: number
  previousClose: number
  dayChangePct: number
  fiveDayChangePct: number
  ytdChangePct: number
  positiveDays: number
  closes: number[]
  currency: string
  source: 'Yahoo Finance' | 'Stooq'
  volume?: number
  avgVolume?: number
  marketCap?: number
  week52High?: number
  week52Low?: number
  preMarketPrice?: number
  postMarketPrice?: number
}

type ChainDef = {
  title: string
  desc: string
  signal: string
  symbols: string[]
}

type ChainData = ChainDef & {
  points: TickerPoint[]
  avgDayChangePct: number
  avgFiveDayChangePct: number
  breadth: number
  score: number
  leader?: TickerPoint
  laggard?: TickerPoint
}

const symbolNames: Record<string, string> = {
  NVDA: 'NVIDIA',
  AMD: 'AMD',
  AVGO: 'Broadcom',
  MRVL: 'Marvell',
  TSM: 'TSMC',
  ANET: 'Arista Networks',
  CIEN: 'Ciena',
  LITE: 'Lumentum',
  COHR: 'Coherent',
  CSCO: 'Cisco',
  SMCI: 'Super Micro Computer',
  DELL: 'Dell Technologies',
  HPE: 'Hewlett Packard Enterprise',
  PSTG: 'Pure Storage',
  AMAT: 'Applied Materials',
  LRCX: 'Lam Research',
  KLAC: 'KLA',
  ASML: 'ASML',
  TER: 'Teradyne',
  MU: 'Micron',
  WDC: 'Western Digital',
  AMKR: 'Amkor',
  UMC: 'UMC',
  VRT: 'Vertiv',
  ETN: 'Eaton',
  NVT: 'nVent',
  HUBB: 'Hubbell',
  PWR: 'Quanta Services',
  TT: 'Trane Technologies',
}

const chainDefs: ChainDef[] = [
  {
    title: 'GPU / AI 芯片',
    symbols: ['NVDA', 'AMD', 'AVGO', 'MRVL', 'TSM'],
    desc: '主线风险偏好温度计。先看龙头是否领涨，再看链内是否扩散。',
    signal: '先看 NVDA 是否带动 AVGO / MRVL / TSM 同步转强。',
  },
  {
    title: '网络 / 光通信',
    symbols: ['ANET', 'CIEN', 'LITE', 'COHR', 'CSCO'],
    desc: 'Scale-out 扩散链。常在 GPU 之后承接资金，决定主线宽度。',
    signal: 'ANET 是否持续跑赢 NVDA，是关键背离信号。',
  },
  {
    title: '服务器 / 存储基础设施',
    symbols: ['SMCI', 'DELL', 'HPE', 'PSTG'],
    desc: '验证硬件 CapEx 是否还在继续外溢。',
    signal: '如果 GPU 强而服务器弱，说明市场只在交易龙头，不在交易广度。',
  },
  {
    title: '半导体设备 / 制造',
    symbols: ['AMAT', 'LRCX', 'KLAC', 'ASML', 'TER'],
    desc: '中周期验证链，判断资本开支是否真的向制造端传导。',
    signal: '设备链转强，往往意味着主线从情绪走向更扎实的中期逻辑。',
  },
  {
    title: '存储 / 封装',
    symbols: ['MU', 'WDC', 'AMKR', 'UMC'],
    desc: '看训练与推理扩容是否往 memory / packaging 传导。',
    signal: 'MU 是否带动存储链回暖，是判断需求扩散的重要观察点。',
  },
  {
    title: '电力 / 散热 / 供电',
    symbols: ['VRT', 'ETN', 'NVT', 'HUBB', 'PWR', 'TT'],
    desc: 'AI Infra 的确定性补链，经常承担第二波逻辑。',
    signal: '硬件回调时若电力链抗跌，说明市场仍在交易基础设施确定性。',
  },
]

async function fetchYahooQuotes(symbols: string[]): Promise<Map<string, QuoteMeta>> {
  try {
    const res = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols.join(',')}`, {
      headers: { 'user-agent': 'Mozilla/5.0' },
      next: { revalidate: 1800 },
    })
    if (!res.ok) return new Map()
    const json = await res.json()
    const list = (json?.quoteResponse?.result ?? []) as QuoteMeta[]
    return new Map(list.map((item) => [item.symbol, item]))
  } catch {
    return new Map()
  }
}

function calculateYtdChange(closes: number[], timestamps: number[]) {
  const currentYear = new Date().getUTCFullYear()
  const yearStartMs = Date.UTC(currentYear, 0, 1)
  let base: number | null = null

  for (let i = 0; i < Math.min(closes.length, timestamps.length); i++) {
    const close = closes[i]
    const ts = timestamps[i] * 1000
    if (Number.isFinite(close) && ts >= yearStartMs) {
      base = close
      break
    }
  }

  const latest = closes[closes.length - 1]
  if (!base || !latest) return 0
  return ((latest - base) / base) * 100
}

function toTickerPoint(params: {
  symbol: string
  closes: number[]
  timestamps: number[]
  quote?: QuoteMeta
  source: 'Yahoo Finance' | 'Stooq'
}): TickerPoint | null {
  const { symbol, closes, timestamps, quote, source } = params
  if (closes.length < 6) return null

  const inferredPrice = closes[closes.length - 1]
  const inferredPrev = closes[closes.length - 2]
  const price = Number(quote?.regularMarketPrice ?? inferredPrice ?? 0)
  const previousClose = Number(quote?.regularMarketPreviousClose ?? inferredPrev ?? 0)
  if (!price || !previousClose) return null

  const fiveDayBase = closes[Math.max(0, closes.length - 6)] ?? previousClose
  const lastFive = closes.slice(-5)
  const positiveDays = lastFive.reduce((acc, current, index) => {
    if (index === 0) return acc
    return current > lastFive[index - 1] ? acc + 1 : acc
  }, 0)

  return {
    symbol,
    shortName: quote?.shortName || symbolNames[symbol] || symbol,
    price,
    previousClose,
    dayChangePct: ((price - previousClose) / previousClose) * 100,
    fiveDayChangePct: fiveDayBase ? ((price - fiveDayBase) / fiveDayBase) * 100 : 0,
    ytdChangePct: calculateYtdChange(closes, timestamps),
    positiveDays,
    closes: closes.slice(-10),
    currency: quote?.currency || 'USD',
    source,
    volume: quote?.regularMarketVolume,
    avgVolume: quote?.averageDailyVolume3Month,
    marketCap: quote?.marketCap,
    week52High: quote?.fiftyTwoWeekHigh,
    week52Low: quote?.fiftyTwoWeekLow,
    preMarketPrice: quote?.preMarketPrice,
    postMarketPrice: quote?.postMarketPrice,
  }
}

async function fetchYahooTicker(symbol: string, quoteMap: Map<string, QuoteMeta>): Promise<TickerPoint | null> {
  try {
    const res = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=1y&interval=1d`,
      {
        headers: { 'user-agent': 'Mozilla/5.0' },
        next: { revalidate: 1800 },
      },
    )
    if (!res.ok) return null

    const json = await res.json()
    const result = json?.chart?.result?.[0]
    const closesRaw = result?.indicators?.quote?.[0]?.close ?? []
    const timestampsRaw = result?.timestamp ?? []
    const closes: number[] = []
    const timestamps: number[] = []

    closesRaw.forEach((value: unknown, index: number) => {
      const close = Number(value)
      const ts = Number(timestampsRaw[index])
      if (Number.isFinite(close) && close > 0 && Number.isFinite(ts)) {
        closes.push(close)
        timestamps.push(ts)
      }
    })

    return toTickerPoint({ symbol, closes, timestamps, quote: quoteMap.get(symbol), source: 'Yahoo Finance' })
  } catch {
    return null
  }
}

async function fetchStooqTicker(symbol: string, quoteMap: Map<string, QuoteMeta>): Promise<TickerPoint | null> {
  try {
    const res = await fetch(`https://stooq.com/q/d/l/?s=${symbol.toLowerCase()}.us&i=d`, {
      next: { revalidate: 1800 },
    })
    if (!res.ok) return null

    const csv = await res.text()
    const lines = csv.trim().split('\n').map((line) => line.trim()).filter(Boolean)
    if (lines.length < 7) return null

    const rows = lines.slice(1).map((line) => line.split(','))
    const closes: number[] = []
    const timestamps: number[] = []

    rows.forEach((cols) => {
      const date = cols[0]
      const close = Number(cols[4])
      const ts = Date.parse(`${date}T00:00:00Z`)
      if (Number.isFinite(close) && close > 0 && Number.isFinite(ts)) {
        closes.push(close)
        timestamps.push(Math.floor(ts / 1000))
      }
    })

    return toTickerPoint({ symbol, closes, timestamps, quote: quoteMap.get(symbol), source: 'Stooq' })
  } catch {
    return null
  }
}

async function fetchTicker(symbol: string, quoteMap: Map<string, QuoteMeta>): Promise<TickerPoint | null> {
  const yahoo = await fetchYahooTicker(symbol, quoteMap)
  if (yahoo) return yahoo
  return fetchStooqTicker(symbol, quoteMap)
}

function avg(values: number[]) {
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0
}

function formatPct(value: number) {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

function formatPrice(value?: number) {
  if (!value) return '—'
  return `$${value.toFixed(2)}`
}

function formatLargeNumber(value?: number) {
  if (!value) return '—'
  if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`
  if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`
  if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`
  return value.toLocaleString('en-US')
}

function scoreChain(points: TickerPoint[]) {
  const avgDayChangePct = avg(points.map((item) => item.dayChangePct))
  const avgFiveDayChangePct = avg(points.map((item) => item.fiveDayChangePct))
  const breadth = points.length ? points.filter((item) => item.dayChangePct > 0).length / points.length : 0
  const score = avgDayChangePct * 0.45 + avgFiveDayChangePct * 0.25 + breadth * 10 + avg(points.map((item) => item.ytdChangePct)) * 0.08
  const ranked = [...points].sort((a, b) => b.dayChangePct - a.dayChangePct)

  return {
    avgDayChangePct,
    avgFiveDayChangePct,
    breadth,
    score,
    leader: ranked[0],
    laggard: ranked[ranked.length - 1],
  }
}

function getMarketState(score: number) {
  if (score >= 4) return 'Risk-on'
  if (score <= -1.5) return 'Risk-off'
  return 'Observation'
}

function getActionLabel(score: number) {
  if (score >= 4) return 'Follow strength'
  if (score <= -1.5) return 'Defense first'
  return 'Wait for confirmation'
}

function getFlowNarrative(chains: ChainData[]) {
  const strongest = chains[0]
  const second = chains[1]
  const weakest = chains[chains.length - 1]
  return `今天资金更偏向 ${strongest.title}，其次是 ${second.title}；${weakest.title} 明显偏弱，说明主线扩散还不均匀。`
}

function Sparkline({ values }: { values: number[] }) {
  if (!values.length) return null
  const width = 140
  const height = 42
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
      <polyline fill="none" stroke={up ? '#9FE870' : '#F87171'} strokeWidth="2.4" points={points} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function cardStyle(alpha = 0.04): React.CSSProperties {
  return {
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 24,
    padding: 22,
    background: `rgba(255,255,255,${alpha})`,
    backdropFilter: 'blur(12px)',
  }
}

function getPointRole(index: number, total: number) {
  if (index === 0) return 'Leader'
  if (index === total - 1) return 'Laggard'
  return 'Follower'
}

export default async function AiSupplyChainUsPage() {
  const uniqueSymbols = [...new Set(chainDefs.flatMap((chain) => chain.symbols))]
  const quoteMap = await fetchYahooQuotes(uniqueSymbols)
  const tickerResults = await Promise.all(uniqueSymbols.map((symbol) => fetchTicker(symbol, quoteMap)))
  const tickerMap = new Map(tickerResults.filter(Boolean).map((item) => [item!.symbol, item!]))

  const chains: ChainData[] = chainDefs
    .map((chain) => {
      const points = chain.symbols.map((symbol) => tickerMap.get(symbol)).filter(Boolean) as TickerPoint[]
      const scored = scoreChain(points)
      return { ...chain, points, ...scored }
    })
    .filter((chain) => chain.points.length > 0)
    .sort((a, b) => b.score - a.score)

  const boardScore = avg(chains.map((chain) => chain.score))
  const marketState = getMarketState(boardScore)
  const strongestChain = chains[0]
  const weakestChain = chains[chains.length - 1]
  const allPoints = [...chains.flatMap((chain) => chain.points)]
  const bestTicker = [...allPoints].sort((a, b) => b.dayChangePct - a.dayChangePct)[0]
  const lastUpdated = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC'
  const flowNarrative = chains.length >= 3 ? getFlowNarrative(chains) : '公开行情已接入，后续可继续补更强的数据源。'
  const sourceSummary = Array.from(new Set(allPoints.map((point) => point.source)))
  const coverage = `${allPoints.length}/${uniqueSymbols.length}`

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top, rgba(158, 116, 255, 0.18), transparent 28%), linear-gradient(180deg, #0b1020 0%, #0f172a 45%, #111827 100%)',
        color: '#f5f7fb',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 24px 80px' }}>
        <section style={{ marginBottom: 34 }}>
          <div
            style={{
              display: 'inline-block',
              padding: '8px 14px',
              borderRadius: 999,
              background: 'rgba(200, 162, 200, 0.16)',
              color: '#e9d5ff',
              fontSize: 13,
              letterSpacing: '0.06em',
            }}
          >
            SELF PAGE · LIVE MARKET VERSION
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 4.2rem)', lineHeight: 1.02, margin: '18px 0 14px', fontWeight: 700 }}>
            US AI Supply Chain
            <br />
            Decision Board
          </h1>
          <p style={{ maxWidth: 920, fontSize: 18, lineHeight: 1.7, color: 'rgba(245,247,251,0.76)', margin: 0 }}>
            这版补成了更完整的看盘板：不仅看日内和 5 日强弱，还补了 YTD、成交量、平均成交量、市值、52 周区间，以及盘前 / 盘后价格。
          </p>
          <div style={{ marginTop: 12, color: 'rgba(245,247,251,0.54)', fontSize: 14 }}>Last updated: {lastUpdated}</div>
          <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {sourceSummary.map((source) => (
              <span
                key={source}
                style={{
                  padding: '6px 10px',
                  borderRadius: 999,
                  fontSize: 12,
                  color: '#dbeafe',
                  background: 'rgba(147, 197, 253, 0.12)',
                  border: '1px solid rgba(147, 197, 253, 0.18)',
                }}
              >
                Source: {source}
              </span>
            ))}
            <span style={{ padding: '6px 10px', borderRadius: 999, fontSize: 12, color: '#ede9fe', background: 'rgba(196, 181, 253, 0.12)', border: '1px solid rgba(196, 181, 253, 0.18)' }}>
              Coverage: {coverage}
            </span>
            <span style={{ padding: '6px 10px', borderRadius: 999, fontSize: 12, color: '#ede9fe', background: 'rgba(196, 181, 253, 0.12)', border: '1px solid rgba(196, 181, 253, 0.18)' }}>
              Fallback enabled
            </span>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 18 }}>
          {[
            ["Today's State", marketState, flowNarrative],
            ['Strongest Chain', strongestChain?.title || 'N/A', strongestChain ? `日内 ${formatPct(strongestChain.avgDayChangePct)} · 5日 ${formatPct(strongestChain.avgFiveDayChangePct)}` : '暂无数据'],
            ['Weakest Chain', weakestChain?.title || 'N/A', weakestChain ? `日内 ${formatPct(weakestChain.avgDayChangePct)} · 5日 ${formatPct(weakestChain.avgFiveDayChangePct)}` : '暂无数据'],
            ["Today's Leader", bestTicker?.symbol || 'N/A', bestTicker ? `${formatPrice(bestTicker.price)} · ${formatPct(bestTicker.dayChangePct)}` : '暂无数据'],
            ["Today's Move", getActionLabel(boardScore), '先看最强链能否继续扩散，再决定追随还是等待确认。'],
          ].map(([eyebrow, title, body]) => (
            <div key={String(eyebrow)} style={cardStyle()}>
              <div style={{ color: '#c8a2c8', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>{eyebrow}</div>
              <div style={{ fontSize: 24, fontWeight: 600, marginBottom: 10 }}>{title}</div>
              <div style={{ color: 'rgba(245,247,251,0.72)', lineHeight: 1.65 }}>{body}</div>
            </div>
          ))}
        </section>

        <section style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 28, padding: 28, background: 'rgba(17,24,39,0.5)', marginBottom: 28 }}>
          <div style={{ fontSize: 14, color: '#c8a2c8', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Flow proxy</div>
          <h2 style={{ fontSize: 30, lineHeight: 1.15, margin: '0 0 12px' }}>不是逐笔资金流，但已经更接近真实看盘</h2>
          <p style={{ maxWidth: 960, lineHeight: 1.8, color: 'rgba(245,247,251,0.76)', margin: 0 }}>
            我现在用的是公开行情做代理判断：链内平均涨跌、5 日相对强弱、YTD 位置、上涨家数占比、龙头是否同步扩散，以及量能和市值信息。它不等于专业 terminal 的订单流，但已经足够判断“钱在往哪条链集中”。
          </p>
        </section>

        <section style={{ marginBottom: 34 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'end', marginBottom: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ color: '#c8a2c8', fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Six-chain live board</div>
              <h2 style={{ fontSize: 30, margin: 0 }}>Real market structure</h2>
            </div>
            <div style={{ color: 'rgba(245,247,251,0.68)', maxWidth: 500, lineHeight: 1.65 }}>
              每条链都补了更多 ticker 和更多指标，现在不只是看涨跌，而是在看主线深度、广度和成交承接。
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 16 }}>
            {chains.map((chain) => {
              const rankedPoints = [...chain.points].sort((a, b) => b.dayChangePct - a.dayChangePct)
              return (
                <article key={chain.title} style={cardStyle()}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start', marginBottom: 14 }}>
                    <div>
                      <h3 style={{ fontSize: 22, margin: '0 0 8px' }}>{chain.title}</h3>
                      <div style={{ color: '#e9d5ff', fontWeight: 600, marginBottom: 10 }}>{chain.symbols.join(' · ')}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 13, color: '#c8a2c8', marginBottom: 6 }}>Chain score</div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: chain.score >= 0 ? '#9FE870' : '#F87171' }}>{chain.score.toFixed(1)}</div>
                    </div>
                  </div>

                  <p style={{ margin: '0 0 12px', color: 'rgba(245,247,251,0.72)', lineHeight: 1.7 }}>{chain.desc}</p>
                  <div style={{ color: '#cbd5e1', lineHeight: 1.65, fontSize: 15, marginBottom: 16 }}>观察点：{chain.signal}</div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 10, marginBottom: 14 }}>
                    <Metric label="日内均值" value={formatPct(chain.avgDayChangePct)} positive={chain.avgDayChangePct >= 0} />
                    <Metric label="5日均值" value={formatPct(chain.avgFiveDayChangePct)} positive={chain.avgFiveDayChangePct >= 0} />
                    <Metric label="链内广度" value={`${Math.round(chain.breadth * 100)}%`} positive={chain.breadth >= 0.5} />
                  </div>

                  <div style={{ display: 'grid', gap: 10 }}>
                    {rankedPoints.map((point, index) => {
                      const role = getPointRole(index, rankedPoints.length)
                      return (
                        <div
                          key={point.symbol}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '100px 1fr auto',
                            gap: 12,
                            alignItems: 'center',
                            padding: '12px 14px',
                            borderRadius: 16,
                            background: 'rgba(255,255,255,0.03)',
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 700 }}>{point.symbol}</div>
                            <div style={{ fontSize: 11, color: role === 'Leader' ? '#9FE870' : role === 'Laggard' ? '#FCA5A5' : 'rgba(245,247,251,0.54)' }}>{role}</div>
                          </div>
                          <div>
                            <Sparkline values={point.closes} />
                            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', fontSize: 11, color: 'rgba(245,247,251,0.54)', marginTop: 6 }}>
                              <span>MCap {formatLargeNumber(point.marketCap)}</span>
                              <span>Vol {formatLargeNumber(point.volume)}</span>
                              <span>AvgVol {formatLargeNumber(point.avgVolume)}</span>
                            </div>
                            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', fontSize: 11, color: 'rgba(245,247,251,0.54)', marginTop: 4 }}>
                              <span>YTD {formatPct(point.ytdChangePct)}</span>
                              <span>52W {formatPrice(point.week52Low)}–{formatPrice(point.week52High)}</span>
                              {(point.preMarketPrice || point.postMarketPrice) ? <span>Ext {formatPrice(point.preMarketPrice || point.postMarketPrice)}</span> : null}
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: 700 }}>{formatPrice(point.price)}</div>
                            <div style={{ color: point.dayChangePct >= 0 ? '#9FE870' : '#F87171', fontWeight: 700 }}>{formatPct(point.dayChangePct)}</div>
                            <div style={{ fontSize: 12, color: 'rgba(245,247,251,0.54)' }}>5D {formatPct(point.fiveDayChangePct)}</div>
                            <div style={{ fontSize: 11, color: 'rgba(245,247,251,0.4)', marginTop: 2 }}>{point.source}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 28, padding: 28, background: 'rgba(255,255,255,0.03)' }}>
          <div style={{ color: '#c8a2c8', fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Data source / methodology</div>
          <h2 style={{ fontSize: 28, lineHeight: 1.15, margin: '0 0 14px' }}>公开把来源和判断逻辑写清楚</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            <div style={cardStyle(0.02)}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Primary source</div>
              <div style={{ color: 'rgba(245,247,251,0.72)', lineHeight: 1.7 }}>Yahoo Finance quote + chart API：优先抓取实时报价、1 年日线、量能、市值、52 周区间和盘前 / 盘后价格。</div>
            </div>
            <div style={cardStyle(0.02)}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Fallback source</div>
              <div style={{ color: 'rgba(245,247,251,0.72)', lineHeight: 1.7 }}>当 Yahoo 不可用时，自动退回 Stooq 日线 CSV，保证页面不因单一数据源失效而整块空掉。</div>
            </div>
            <div style={cardStyle(0.02)}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>What this board measures</div>
              <div style={{ color: 'rgba(245,247,251,0.72)', lineHeight: 1.7 }}>指标包括最新价、昨收、当日涨跌幅、5 日涨跌幅、YTD、链内上涨家数占比、成交量、平均成交量，以及按链条聚合后的 breadth / score。</div>
            </div>
            <div style={cardStyle(0.02)}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Important limitation</div>
              <div style={{ color: 'rgba(245,247,251,0.72)', lineHeight: 1.7 }}>这里的“资金流向”仍然是价格行为代理，不是 Bloomberg / FactSet 级别的逐笔资金流或机构订单流数据。</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

function Metric({ label, value, positive }: { label: string; value: string; positive: boolean }) {
  return (
    <div
      style={{
        borderRadius: 16,
        padding: '12px 14px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div style={{ fontSize: 12, color: 'rgba(245,247,251,0.56)', marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: positive ? '#9FE870' : '#F87171' }}>{value}</div>
    </div>
  )
}
