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
  shortTitle: string
  slug: string
  desc: string
  signal: string
  symbols: string[]
}

export type ChainMode = '延续' | '补涨' | '回调' | '走弱'

export type ChainQuality = '有效扩散' | '龙头抱团' | '跟涨' | '补涨修复' | '走弱'

export type ChainDayStat = {
  avgPct: number
  excessPct: number
  breadth: number
}

export type ChainData = ChainDef & {
  points: TickerPoint[]
  avgDayChangePct: number
  avgFiveDayChangePct: number
  medianDayChangePct: number
  breadth: number
  breadthSeries: number[]
  breadthImproving: boolean
  excessDayPct: number
  excessFiveDayPct: number
  leaderGapPct: number
  syncGapPct: number
  mode: ChainMode
  quality: ChainQuality
  score: number
  history: ChainDayStat[]
  leader?: TickerPoint
  laggard?: TickerPoint
}

export type BoardRegime = '有效扩散' | '龙头抱团' | '扩散衰减' | '普跌防御'

export type BoardConclusion = {
  mainline?: ChainData
  spread?: ChainData
  defensive?: ChainData
  lagging?: ChainData
  regime: BoardRegime
  summary: string
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
    shortTitle: 'GPU 芯片',
    slug: 'gpu-ai-chips',
    symbols: ['NVDA', 'AMD', 'AVGO', 'MRVL', 'TSM'],
    desc: '主线强度核心温度计。',
    signal: '先看 NVDA 是否带动 AVGO / MRVL / TSM 同步走强。',
  },
  {
    title: '网络 / 光通信',
    shortTitle: '网络光通信',
    slug: 'network-optical',
    symbols: ['ANET', 'CIEN', 'LITE', 'COHR', 'CSCO'],
    desc: 'GPU 之后最容易承接扩散的链。',
    signal: 'ANET 能否持续强于大盘，是扩散质量的关键。',
  },
  {
    title: '服务器 / 存储基础设施',
    shortTitle: '服务器存储',
    slug: 'server-storage-infra',
    symbols: ['SMCI', 'DELL', 'HPE', 'PSTG'],
    desc: '看硬件 CapEx 是否继续外溢。',
    signal: 'GPU 强而服务器弱，通常代表主线偏龙头抱团。',
  },
  {
    title: '半导体设备 / 制造',
    shortTitle: '半导体设备',
    slug: 'semi-equipment-manufacturing',
    symbols: ['AMAT', 'LRCX', 'KLAC', 'ASML', 'TER'],
    desc: '中周期验证链。',
    signal: '设备链回暖，说明情绪开始向更扎实的制造逻辑传导。',
  },
  {
    title: '存储 / 封装',
    shortTitle: '存储封装',
    slug: 'memory-packaging',
    symbols: ['MU', 'WDC', 'AMKR', 'UMC'],
    desc: '看训练和推理需求是否继续扩容。',
    signal: 'MU 带不带得动链内，是需求扩散的重要观察点。',
  },
  {
    title: '电力 / 散热 / 供电',
    shortTitle: '电力散热',
    slug: 'power-cooling-electrical',
    symbols: ['VRT', 'ETN', 'NVT', 'HUBB', 'PWR', 'TT'],
    desc: 'AI Infra 的确定性补链。',
    signal: '硬件回调时若电力链抗跌，说明基础设施逻辑还在。',
  },
]

// 资金从上游向下游扩散的典型顺序，用于轮动路径展示。
export const flowOrder = [
  'gpu-ai-chips',
  'network-optical',
  'server-storage-infra',
  'semi-equipment-manufacturing',
  'memory-packaging',
  'power-cooling-electrical',
]

export const benchmarkSymbols = ['QQQ', 'SOXX', 'SPY']

export const benchmarkNames: Record<string, string> = {
  QQQ: '纳指100',
  SOXX: '费城半导体',
  SPY: '标普500',
}

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
    closes: closes.slice(-15),
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

function median(values: number[]) {
  if (!values.length) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

// 逐日 breadth（链内当日上涨家数占比），基于每只股票保留的收盘序列，最近一天在末尾。
function calcBreadthSeries(points: TickerPoint[], days = 5): number[] {
  const series: number[] = []
  for (let back = days - 1; back >= 0; back--) {
    let up = 0
    let total = 0
    for (const point of points) {
      const index = point.closes.length - 1 - back
      if (index >= 1) {
        total++
        if (point.closes[index] > point.closes[index - 1]) up++
      }
    }
    series.push(total ? up / total : 0)
  }
  return series
}

// 回算最近 N 个交易日的链级日收益 / 超额 / breadth，各序列按末尾对齐。
function calcHistory(points: TickerPoint[], benchmark?: TickerPoint, days = 10): ChainDayStat[] {
  const history: ChainDayStat[] = []
  for (let back = days - 1; back >= 0; back--) {
    const returns: number[] = []
    let up = 0
    for (const point of points) {
      const index = point.closes.length - 1 - back
      if (index >= 1) {
        const ret = (point.closes[index] / point.closes[index - 1] - 1) * 100
        returns.push(ret)
        if (ret > 0) up++
      }
    }
    if (!returns.length) continue
    const avgPct = avg(returns)
    let benchPct = 0
    if (benchmark) {
      const bIndex = benchmark.closes.length - 1 - back
      if (bIndex >= 1) benchPct = (benchmark.closes[bIndex] / benchmark.closes[bIndex - 1] - 1) * 100
    }
    history.push({ avgPct, excessPct: avgPct - benchPct, breadth: up / returns.length })
  }
  return history
}

function classifyMode(avgDayChangePct: number, avgFiveDayChangePct: number): ChainMode {
  if (avgDayChangePct > 0 && avgFiveDayChangePct > 0) return '延续'
  if (avgDayChangePct > 0) return '补涨'
  if (avgFiveDayChangePct > 0) return '回调'
  return '走弱'
}

function classifyQuality(params: {
  avgDayChangePct: number
  excessDayPct: number
  breadth: number
  leaderGapPct: number
  syncGapPct: number
  mode: ChainMode
}): ChainQuality {
  const { avgDayChangePct, excessDayPct, breadth, leaderGapPct, syncGapPct, mode } = params
  if (avgDayChangePct <= 0 && excessDayPct <= 0) return '走弱'
  if (excessDayPct <= 0) return '跟涨'
  if (mode === '补涨') return '补涨修复'
  if (leaderGapPct > 2.5 || syncGapPct > 5 || breadth < 0.5) return '龙头抱团'
  return '有效扩散'
}

function scoreChain(points: TickerPoint[], benchmark?: TickerPoint) {
  const dayChanges = points.map((item) => item.dayChangePct)
  const avgDayChangePct = avg(dayChanges)
  const avgFiveDayChangePct = avg(points.map((item) => item.fiveDayChangePct))
  const medianDayChangePct = median(dayChanges)
  const breadth = points.length ? points.filter((item) => item.dayChangePct > 0).length / points.length : 0
  const breadthSeries = calcBreadthSeries(points)
  const breadthImproving =
    breadthSeries.length >= 2 && breadthSeries[breadthSeries.length - 1] >= avg(breadthSeries.slice(0, -1))

  const excessDayPct = avgDayChangePct - (benchmark?.dayChangePct ?? 0)
  const excessFiveDayPct = avgFiveDayChangePct - (benchmark?.fiveDayChangePct ?? 0)

  const ranked = [...points].sort((a, b) => b.dayChangePct - a.dayChangePct)
  const leaderGapPct = ranked.length > 1 ? ranked[0].dayChangePct - median(ranked.slice(1).map((item) => item.dayChangePct)) : 0
  const top2 = avg(ranked.slice(0, 2).map((item) => item.dayChangePct))
  const bottom2 = avg(ranked.slice(-2).map((item) => item.dayChangePct))
  const syncGapPct = ranked.length > 2 ? top2 - bottom2 : 0

  const mode = classifyMode(avgDayChangePct, avgFiveDayChangePct)
  const quality = classifyQuality({ avgDayChangePct, excessDayPct, breadth, leaderGapPct, syncGapPct, mode })

  // 轮动导向评分：超额收益 + 内部同步性为主，惩罚龙头独涨。
  const score =
    excessDayPct * 0.9 +
    excessFiveDayPct * 0.35 +
    medianDayChangePct * 0.6 +
    breadth * 3 +
    (breadthImproving ? 0.8 : 0) -
    Math.max(0, leaderGapPct - 2.5) * 0.4

  return {
    avgDayChangePct,
    avgFiveDayChangePct,
    medianDayChangePct,
    breadth,
    breadthSeries,
    breadthImproving,
    excessDayPct,
    excessFiveDayPct,
    leaderGapPct,
    syncGapPct,
    mode,
    quality,
    score,
    history: calcHistory(points, benchmark),
    leader: ranked[0],
    laggard: ranked[ranked.length - 1],
  }
}

function buildConclusion(chains: ChainData[]): BoardConclusion {
  if (!chains.length) {
    return { regime: '扩散衰减', summary: '行情数据暂不可用，无法给出今日轮动判断。' }
  }
  const byScore = [...chains].sort((a, b) => b.score - a.score)
  const mainline = byScore[0]
  const lagging = byScore[byScore.length - 1]

  const spreadCandidates = byScore.filter((chain) => chain !== mainline && chain.excessDayPct > 0)
  const spread = spreadCandidates.find((chain) => chain.breadth >= 0.5) ?? spreadCandidates[0]

  const power = chains.find((chain) => chain.slug === 'power-cooling-electrical')
  const defensive = power && (power.avgDayChangePct > 0 || power.excessDayPct > -0.2) ? power : undefined

  const strongSpread = chains.filter((chain) => chain.excessDayPct > 0 && chain.breadth >= 0.6).length
  const improvingCount = chains.filter((chain) => chain.breadthImproving).length
  const fallingCount = chains.filter((chain) => chain.avgDayChangePct <= 0).length

  let regime: BoardRegime
  if (fallingCount >= chains.length - 1) {
    regime = '普跌防御'
  } else if (strongSpread >= 3) {
    regime = '有效扩散'
  } else if (mainline && mainline.excessDayPct > 0 && strongSpread <= 1) {
    regime = '龙头抱团'
  } else if (improvingCount < chains.length / 2) {
    regime = '扩散衰减'
  } else {
    regime = '有效扩散'
  }

  const parts: string[] = []
  if (mainline) parts.push(`主线在${mainline.shortTitle}（超额 ${formatPct(mainline.excessDayPct)}）`)
  if (spread) parts.push(`扩散最强是${spread.shortTitle}（breadth ${Math.round(spread.breadth * 100)}%）`)
  if (defensive) parts.push(`${defensive.shortTitle}在承接`)
  if (lagging && lagging !== spread) parts.push(`${lagging.shortTitle}明显掉队`)
  const summary = `${parts.join('，')}。当前状态：${regime}。`

  return { mainline, spread, defensive, lagging, regime, summary }
}

export async function fetchBoardData() {
  const uniqueSymbols = [...new Set(chainDefs.flatMap((chain) => chain.symbols))]
  const allSymbols = [...uniqueSymbols, ...benchmarkSymbols]
  const quoteMap = await fetchYahooQuotes(allSymbols)
  const tickerResults = await Promise.all(allSymbols.map((symbol) => fetchTicker(symbol, quoteMap)))
  const tickerMap = new Map(tickerResults.filter(Boolean).map((item) => [item!.symbol, item!]))

  const benchmarks = benchmarkSymbols.map((symbol) => tickerMap.get(symbol)).filter(Boolean) as TickerPoint[]
  const baseline = tickerMap.get('QQQ')

  const chains: ChainData[] = chainDefs
    .map((chain) => {
      const points = chain.symbols.map((symbol) => tickerMap.get(symbol)).filter(Boolean) as TickerPoint[]
      const scored = scoreChain(points, baseline)
      return { ...chain, points, ...scored }
    })
    .filter((chain) => chain.points.length > 0)
    .sort((a, b) => b.score - a.score)

  const conclusion = buildConclusion(chains)

  const allPoints = chains.flatMap((chain) => chain.points)
  return {
    chains,
    allPoints,
    benchmarks,
    baseline,
    conclusion,
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
