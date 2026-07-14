export type QuoteMeta = {
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

export type TickerPoint = {
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

export type ChainDef = {
  title: string
  slug: string
  desc: string
  signal: string
  symbols: string[]
}

export type ChainData = ChainDef & {
  points: TickerPoint[]
  avgDayChangePct: number
  avgFiveDayChangePct: number
  breadth: number
  score: number
  leader?: TickerPoint
  laggard?: TickerPoint
}

export const symbolNames: Record<string, string> = {
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

export const chainDefs: ChainDef[] = [
  {
    title: 'GPU / AI 芯片',
    slug: 'gpu-ai-chips',
    symbols: ['NVDA', 'AMD', 'AVGO', 'MRVL', 'TSM'],
    desc: '主线强度核心温度计。',
    signal: '先看 NVDA 是否带动 AVGO / MRVL / TSM 同步走强。',
  },
  {
    title: '网络 / 光通信',
    slug: 'network-optical',
    symbols: ['ANET', 'CIEN', 'LITE', 'COHR', 'CSCO'],
    desc: 'GPU 之后最容易承接扩散的链。',
    signal: 'ANET 能否持续强于大盘，是扩散质量的关键。',
  },
  {
    title: '服务器 / 存储基础设施',
    slug: 'server-storage-infra',
    symbols: ['SMCI', 'DELL', 'HPE', 'PSTG'],
    desc: '看硬件 CapEx 是否继续外溢。',
    signal: 'GPU 强而服务器弱，通常代表主线偏龙头抱团。',
  },
  {
    title: '半导体设备 / 制造',
    slug: 'semi-equipment-manufacturing',
    symbols: ['AMAT', 'LRCX', 'KLAC', 'ASML', 'TER'],
    desc: '中周期验证链。',
    signal: '设备链回暖，说明情绪开始向更扎实的制造逻辑传导。',
  },
  {
    title: '存储 / 封装',
    slug: 'memory-packaging',
    symbols: ['MU', 'WDC', 'AMKR', 'UMC'],
    desc: '看训练和推理需求是否继续扩容。',
    signal: 'MU 带不带得动链内，是需求扩散的重要观察点。',
  },
  {
    title: '电力 / 散热 / 供电',
    slug: 'power-cooling-electrical',
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

export async function fetchBoardData() {
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

  const allPoints = chains.flatMap((chain) => chain.points)
  return {
    chains,
    allPoints,
    lastUpdated: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC',
    coverage: `${allPoints.length}/${uniqueSymbols.length}`,
  }
}

export function formatPct(value: number) {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

export function formatPrice(value?: number) {
  if (!value) return '—'
  return `$${value.toFixed(2)}`
}

export function formatLargeNumber(value?: number) {
  if (!value) return '—'
  if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`
  if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`
  if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`
  return value.toLocaleString('en-US')
}
