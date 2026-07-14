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
  sourceConfidence: 'high' | 'medium'
  freshness: 'live-ish' | 'delayed-fallback'
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
  ANET: 'Arista',
  CIEN: 'Ciena',
  LITE: 'Lumentum',
  COHR: 'Coherent',
  CSCO: 'Cisco',
  SMCI: 'Supermicro',
  DELL: 'Dell',
  HPE: 'HPE',
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
  PWR: 'Quanta',
  TT: 'Trane',
}

const chainDefs: ChainDef[] = [
  {
    title: 'GPU / AI 芯片',
    symbols: ['NVDA', 'AMD', 'AVGO', 'MRVL', 'TSM'],
    desc: '主线强度核心温度计。',
    signal: '先看 NVDA 是否带动 AVGO / MRVL / TSM 同步走强。',
  },
  {
    title: '网络 / 光通信',
    symbols: ['ANET', 'CIEN', 'LITE', 'COHR', 'CSCO'],
    desc: 'GPU 之后最容易承接扩散的链。',
    signal: 'ANET 能否持续强于大盘，是扩散质量的关键。',
  },
  {
    title: '服务器 / 存储基础设施',
    symbols: ['SMCI', 'DELL', 'HPE', 'PSTG'],
    desc: '看硬件 CapEx 是否继续外溢。',
    signal: 'GPU 强而服务器弱，通常代表主线偏龙头抱团。',
  },
  {
    title: '半导体设备 / 制造',
    symbols: ['AMAT', 'LRCX', 'KLAC', 'ASML', 'TER'],
    desc: '中周期验证链。',
    signal: '设备链回暖，说明情绪开始向更扎实的制造逻辑传导。',
  },
  {
    title: '存储 / 封装',
    symbols: ['MU', 'WDC', 'AMKR', 'UMC'],
    desc: '看训练和推理需求是否继续扩容。',
    signal: 'MU 带不带得动链内，是需求扩散的重要观察点。',
  },
  {
    title: '电力 / 散热 / 供电',
    symbols: ['VRT', 'ETN', 'NVT', 'HUBB', 'PWR', 'TT'],
    desc: 'AI Infra 的确定性补链。',
    signal: '硬件回调时若电力链抗跌，说明基础设施逻辑还在。',
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
    sourceConfidence: source === 'Yahoo Finance' ? 'high' : 'medium',
    freshness: source === 'Yahoo Finance' ? 'live-ish' : 'delayed-fallback',
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
    const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=1y&interval=1d`, {
      headers: { 'user-agent': 'Mozilla/5.0' },
      next: { revalidate: 1800 },
    })
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
  return `资金更偏向 ${strongest.title}，其次是 ${second.title}；${weakest.title} 偏弱，说明扩散还不均匀。`
}

function Sparkline({ values }: { values: number[] }) {
  if (!values.length) return null
  const width = 108
  const height = 28
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

function getRoleTone(role: 'Leader' | 'Follower' | 'Laggard') {
  if (role === 'Leader') return { fg: '#6D5EF5', bg: 'rgba(109,94,245,0.10)' }
  if (role === 'Laggard') return { fg: '#D94F70', bg: 'rgba(217,79,112,0.10)' }
  return { fg: '#667085', bg: 'rgba(102,112,133,0.10)' }
}

function getConfidenceTone(level: 'high' | 'medium') {
  return level === 'high'
    ? { label: 'Primary', fg: '#6D5EF5', bg: 'rgba(109,94,245,0.10)' }
    : { label: 'Fallback', fg: '#9A6B00', bg: 'rgba(217,166,0,0.10)' }
}

function getFreshnessTone(level: 'live-ish' | 'delayed-fallback') {
  return level === 'live-ish'
    ? { label: 'Live-ish', fg: '#027A48', bg: 'rgba(18,183,106,0.10)' }
    : { label: 'Delayed', fg: '#B54708', bg: 'rgba(247,144,9,0.10)' }
}

function getPointRole(index: number, total: number): 'Leader' | 'Follower' | 'Laggard' {
  if (index === 0) return 'Leader'
  if (index === total - 1) return 'Laggard'
  return 'Follower'
}

function metricCardStyle(): React.CSSProperties {
  return {
    borderRadius: 20,
    border: '1px solid #EAECF0',
    background: '#FFFFFF',
    padding: 18,
    boxShadow: '0 1px 2px rgba(16,24,40,0.04)',
  }
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
  const flowNarrative = chains.length >= 3 ? getFlowNarrative(chains) : '公开行情已接入，后续可继续补更强数据源。'
  const primaryCount = allPoints.filter((point) => point.sourceConfidence === 'high').length
  const fallbackCount = allPoints.filter((point) => point.sourceConfidence === 'medium').length
  const coverage = `${allPoints.length}/${uniqueSymbols.length}`

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#F8F8FC',
        color: '#101828',
      }}
    >
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
                这版已经不是静态展示页，而是直接抓取公开美股行情，压缩成主线强弱、龙头联动和“资金流向代理”判断。现在我把它收成了更简洁的一版，同时补了 source confidence / freshness。
              </p>
            </div>
            <div style={{ ...metricCardStyle(), padding: 16 }}>
              <div style={{ fontSize: 12, color: '#667085', marginBottom: 8 }}>Last updated</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{lastUpdated}</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Badge label={`Coverage ${coverage}`} fg="#6941C6" bg="rgba(109,65,198,0.10)" />
                <Badge label={`Primary ${primaryCount}`} fg="#027A48" bg="rgba(18,183,106,0.10)" />
                <Badge label={`Fallback ${fallbackCount}`} fg="#B54708" bg="rgba(247,144,9,0.10)" />
              </div>
            </div>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12, marginBottom: 14 }}>
          <SummaryCard title="State" value={marketState} note={flowNarrative} />
          <SummaryCard title="Strongest" value={strongestChain?.title || 'N/A'} note={strongestChain ? `日内 ${formatPct(strongestChain.avgDayChangePct)}` : '暂无数据'} />
          <SummaryCard title="Weakest" value={weakestChain?.title || 'N/A'} note={weakestChain ? `日内 ${formatPct(weakestChain.avgDayChangePct)}` : '暂无数据'} />
          <SummaryCard title="Action" value={getActionLabel(boardScore)} note={bestTicker ? `${bestTicker.symbol} ${formatPct(bestTicker.dayChangePct)}` : '暂无数据'} />
        </section>

        <section style={{ ...metricCardStyle(), marginBottom: 16, padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#667085', marginBottom: 6 }}>Flow proxy</div>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>更像一个能用的盘面总览，而不是信息墙</div>
              <div style={{ maxWidth: 860, color: '#475467', lineHeight: 1.7 }}>
                我现在把公开行情源分成主源和 fallback，并明确标注 freshness。这样你一眼就能知道：这是实时近似数据，还是只是保证不断流的延迟替代数据。
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Badge label="Yahoo = high confidence" fg="#6D5EF5" bg="rgba(109,94,245,0.10)" />
              <Badge label="Stooq = fallback" fg="#B54708" bg="rgba(247,144,9,0.10)" />
            </div>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16 }}>
          {chains.map((chain) => {
            const rankedPoints = [...chain.points].sort((a, b) => b.dayChangePct - a.dayChangePct)
            return (
              <article key={chain.title} style={{ ...metricCardStyle(), padding: 20 }}>
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

                <div style={{ display: 'grid', gap: 10 }}>
                  {rankedPoints.map((point, index) => {
                    const role = getPointRole(index, rankedPoints.length)
                    const roleTone = getRoleTone(role)
                    const confidenceTone = getConfidenceTone(point.sourceConfidence)
                    const freshnessTone = getFreshnessTone(point.freshness)
                    return (
                      <div key={point.symbol} style={{ borderRadius: 16, border: '1px solid #F2F4F7', background: '#FCFCFD', padding: 14 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '110px minmax(0,1fr) auto', gap: 12, alignItems: 'center' }}>
                          <div>
                            <div style={{ fontSize: 16, fontWeight: 700 }}>{point.symbol}</div>
                            <div style={{ fontSize: 12, color: '#667085', marginTop: 2 }}>{point.shortName}</div>
                          </div>
                          <div>
                            <Sparkline values={point.closes} />
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                              <Badge label={role} fg={roleTone.fg} bg={roleTone.bg} />
                              <Badge label={confidenceTone.label} fg={confidenceTone.fg} bg={confidenceTone.bg} />
                              <Badge label={freshnessTone.label} fg={freshnessTone.fg} bg={freshnessTone.bg} />
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 17, fontWeight: 700 }}>{formatPrice(point.price)}</div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: point.dayChangePct >= 0 ? '#027A48' : '#D92D20' }}>{formatPct(point.dayChangePct)}</div>
                            <div style={{ fontSize: 12, color: '#667085', marginTop: 2 }}>5D {formatPct(point.fiveDayChangePct)}</div>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 8, marginTop: 12 }}>
                          <DataChip label="YTD" value={formatPct(point.ytdChangePct)} />
                          <DataChip label="Vol" value={formatLargeNumber(point.volume)} />
                          <DataChip label="MCap" value={formatLargeNumber(point.marketCap)} />
                          <DataChip label="52W" value={`${formatPrice(point.week52Low)}–${formatPrice(point.week52High)}`} />
                        </div>

                        {(point.preMarketPrice || point.postMarketPrice) ? (
                          <div style={{ marginTop: 10, fontSize: 12, color: '#667085' }}>
                            Ext hours: {formatPrice(point.preMarketPrice || point.postMarketPrice)}
                          </div>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              </article>
            )
          })}
        </section>
      </div>
    </main>
  )
}

function SummaryCard({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <div style={metricCardStyle()}>
      <div style={{ fontSize: 12, color: '#667085', marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 20, lineHeight: 1.2, fontWeight: 700, marginBottom: 8 }}>{value}</div>
      <div style={{ fontSize: 13, color: '#475467', lineHeight: 1.6 }}>{note}</div>
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

function DataChip({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ borderRadius: 12, background: '#FFFFFF', border: '1px solid #EAECF0', padding: '9px 10px' }}>
      <div style={{ fontSize: 10, color: '#667085', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 12, color: '#101828', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</div>
    </div>
  )
}

function Badge({ label, fg, bg }: { label: string; fg: string; bg: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 8px', borderRadius: 999, fontSize: 11, fontWeight: 600, color: fg, background: bg }}>
      {label}
    </span>
  )
}
