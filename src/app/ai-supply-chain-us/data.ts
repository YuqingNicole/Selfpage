import { fetchStoredMarketData, persistBoardSnapshot } from './snapshot'
import {
  benchmarkSymbols,
  chainDefs,
  formatPct,
  symbolNames,
  thresholds,
  type BoardConclusion,
  type BoardRegime,
  type ChainData,
  type ChainDayStat,
  type ChainMode,
  type ChainQuality,
  type QuoteMeta,
  type TickerPoint,
} from './shared'

export * from './shared'

const YAHOO_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

// Yahoo v7 quote 接口自 2023 年起要求 cookie + crumb，裸调用返回 401。
// 这里做一次性的鉴权握手并在进程内缓存 1 小时。
let yahooAuthCache: { cookie: string; crumb: string; ts: number } | null = null

async function getYahooAuth(): Promise<{ cookie: string; crumb: string } | null> {
  if (yahooAuthCache && Date.now() - yahooAuthCache.ts < 3600_000) return yahooAuthCache
  try {
    const cookieRes = await fetch('https://fc.yahoo.com/', {
      headers: { 'user-agent': YAHOO_UA },
      redirect: 'manual',
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    })
    const cookie = cookieRes.headers.get('set-cookie')?.split(';')[0]
    if (!cookie) return null
    const crumbRes = await fetch('https://query1.finance.yahoo.com/v1/test/getcrumb', {
      headers: { 'user-agent': YAHOO_UA, cookie },
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    })
    if (!crumbRes.ok) return null
    const crumb = (await crumbRes.text()).trim()
    if (!crumb || crumb.includes('<')) return null
    yahooAuthCache = { cookie, crumb, ts: Date.now() }
    return yahooAuthCache
  } catch {
    return null
  }
}

async function fetchYahooQuotes(symbols: string[]): Promise<Map<string, QuoteMeta>> {
  const parse = async (res: Response) => {
    if (!res.ok) return null
    const json = await res.json()
    const list = (json?.quoteResponse?.result ?? []) as QuoteMeta[]
    return list.length ? new Map(list.map((item) => [item.symbol, item])) : null
  }

  try {
    const plain = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols.join(',')}`, {
      headers: { 'user-agent': YAHOO_UA },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(6000),
    })
    const plainMap = await parse(plain).catch(() => null)
    if (plainMap) return plainMap
  } catch {
    // fall through to crumb-authenticated attempt
  }

  try {
    const auth = await getYahooAuth()
    if (!auth) return new Map()
    const res = await fetch(
      `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols.join(',')}&crumb=${encodeURIComponent(auth.crumb)}`,
      { headers: { 'user-agent': YAHOO_UA, cookie: auth.cookie }, cache: 'no-store', signal: AbortSignal.timeout(6000) },
    )
    return (await parse(res).catch(() => null)) ?? new Map()
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

type ChartMeta = {
  shortName?: string
  volume?: number
  week52High?: number
  week52Low?: number
  price?: number
  previousClose?: number
}

function toTickerPoint(params: {
  symbol: string
  closes: number[]
  timestamps: number[]
  volumes?: number[]
  chartMeta?: ChartMeta
  quote?: QuoteMeta
  source: 'Yahoo Finance' | 'Stooq' | 'Tencent' | 'Synced'
}): TickerPoint | null {
  const { symbol, closes, timestamps, volumes = [], chartMeta, quote, source } = params
  if (closes.length < 6) return null

  const inferredPrice = closes[closes.length - 1]
  const inferredPrev = closes[closes.length - 2]
  const price = Number(quote?.regularMarketPrice ?? chartMeta?.price ?? inferredPrice ?? 0)
  const previousClose = Number(quote?.regularMarketPreviousClose ?? chartMeta?.previousClose ?? inferredPrev ?? 0)
  if (!price || !previousClose) return null

  const fiveDayBase = closes[Math.max(0, closes.length - 6)] ?? previousClose
  const lastFive = closes.slice(-5)
  const positiveDays = lastFive.reduce((acc, current, index) => {
    if (index === 0) return acc
    return current > lastFive[index - 1] ? acc + 1 : acc
  }, 0)

  // 报价接口失败时，成交量 / 均量 / 52 周区间从日线序列自算，保证字段不缺。
  const yearCloses = closes.slice(-252)
  const lastVolume = volumes.length ? volumes[volumes.length - 1] : undefined
  const quarterVolumes = volumes.slice(-63).filter((value) => Number.isFinite(value) && value > 0)
  const derivedAvgVolume = quarterVolumes.length >= 20 ? Math.round(quarterVolumes.reduce((a, b) => a + b, 0) / quarterVolumes.length) : undefined

  return {
    symbol,
    shortName: quote?.shortName || chartMeta?.shortName || symbolNames[symbol] || symbol,
    price,
    previousClose,
    dayChangePct: ((price - previousClose) / previousClose) * 100,
    fiveDayChangePct: fiveDayBase ? ((price - fiveDayBase) / fiveDayBase) * 100 : 0,
    ytdChangePct: calculateYtdChange(closes, timestamps),
    positiveDays,
    // 保留 ~半年日线：轨迹热力图用末尾 10 天，β 回归用末尾 60 天。
    closes: closes.slice(-130),
    currency: quote?.currency || 'USD',
    lastCloseDate: new Date(timestamps[timestamps.length - 1] * 1000).toISOString().slice(0, 10),
    source,
    sourceConfidence: source === 'Yahoo Finance' ? 'high' : 'medium',
    freshness: source === 'Yahoo Finance' ? 'live-ish' : 'delayed-fallback',
    volume: quote?.regularMarketVolume ?? chartMeta?.volume ?? lastVolume,
    avgVolume: quote?.averageDailyVolume3Month ?? derivedAvgVolume,
    marketCap: quote?.marketCap,
    week52High: quote?.fiftyTwoWeekHigh ?? chartMeta?.week52High ?? (yearCloses.length >= 60 ? Math.max(...yearCloses) : undefined),
    week52Low: quote?.fiftyTwoWeekLow ?? chartMeta?.week52Low ?? (yearCloses.length >= 60 ? Math.min(...yearCloses) : undefined),
    preMarketPrice: quote?.preMarketPrice,
    postMarketPrice: quote?.postMarketPrice,
  }
}

// 带退避的重试：429 / 5xx / 网络抖动时重试，重试请求跳过缓存拿新鲜响应。
// 每次尝试 6 秒超时：被墙 / 黑洞路由会无限挂起，没有超时整页会卡死。
async function fetchWithRetry(url: string, headers: Record<string, string>, retries = 2): Promise<Response | null> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers,
        signal: AbortSignal.timeout(6000),
        ...(attempt === 0 ? { next: { revalidate: 300 } } : { cache: 'no-store' as const }),
      })
      if (res.ok) return res
      if (res.status === 404) return null
    } catch {
      // network error / timeout — fall through to backoff
    }
    if (attempt < retries) await new Promise((resolve) => setTimeout(resolve, 600 * (attempt + 1)))
  }
  return null
}

// 数据源熔断：同一来源连续失败 5 次后，本进程内直接跳过该来源，
// 避免不可达的源让每只股票都白等超时。
const sourceFailureCounts: Record<string, number> = {}

function isSourceDown(name: string) {
  return (sourceFailureCounts[name] ?? 0) >= 5
}

function recordSourceResult(name: string, ok: boolean) {
  sourceFailureCounts[name] = ok ? 0 : (sourceFailureCounts[name] ?? 0) + 1
}

// 简易并发闸：批量抓行情时限制同时在途请求数，避免触发数据源限流。
async function mapWithConcurrency<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let cursor = 0
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++
      results[index] = await fn(items[index])
    }
  })
  await Promise.all(workers)
  return results
}

async function fetchYahooTicker(symbol: string, quoteMap: Map<string, QuoteMeta>): Promise<TickerPoint | null> {
  try {
    const res = await fetchWithRetry(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=1y&interval=1d`, {
      'user-agent': YAHOO_UA,
    })
    if (!res) return null
    const json = await res.json()
    const result = json?.chart?.result?.[0]
    const closesRaw = result?.indicators?.quote?.[0]?.close ?? []
    const volumesRaw = result?.indicators?.quote?.[0]?.volume ?? []
    const timestampsRaw = result?.timestamp ?? []
    const closes: number[] = []
    const volumes: number[] = []
    const timestamps: number[] = []

    closesRaw.forEach((value: unknown, index: number) => {
      const close = Number(value)
      const ts = Number(timestampsRaw[index])
      if (Number.isFinite(close) && close > 0 && Number.isFinite(ts)) {
        closes.push(close)
        volumes.push(Number(volumesRaw[index]) || 0)
        timestamps.push(ts)
      }
    })

    // chart 接口的 meta 无需鉴权，即使 quote 接口失效也能补上名称 / 现价 / 52 周区间。
    const meta = result?.meta ?? {}
    const chartMeta: ChartMeta = {
      shortName: meta.shortName || meta.longName,
      volume: Number(meta.regularMarketVolume) || undefined,
      week52High: Number(meta.fiftyTwoWeekHigh) || undefined,
      week52Low: Number(meta.fiftyTwoWeekLow) || undefined,
      price: Number(meta.regularMarketPrice) || undefined,
      // 注意：meta.chartPreviousClose 是图表范围起点的前收盘（一年前），不能当昨收用。
      previousClose: Number(meta.previousClose) || undefined,
    }

    return toTickerPoint({ symbol, closes, timestamps, volumes, chartMeta, quote: quoteMap.get(symbol), source: 'Yahoo Finance' })
  } catch {
    return null
  }
}

async function fetchStooqTicker(symbol: string, quoteMap: Map<string, QuoteMeta>): Promise<TickerPoint | null> {
  try {
    const res = await fetchWithRetry(`https://stooq.com/q/d/l/?s=${symbol.toLowerCase()}.us&i=d`, {})
    if (!res) return null
    const csv = await res.text()
    const lines = csv.trim().split('\n').map((line) => line.trim()).filter(Boolean)
    if (lines.length < 7) return null

    const rows = lines.slice(1).map((line) => line.split(','))
    const closes: number[] = []
    const volumes: number[] = []
    const timestamps: number[] = []

    rows.forEach((cols) => {
      const date = cols[0]
      const close = Number(cols[4])
      const ts = Date.parse(`${date}T00:00:00Z`)
      if (Number.isFinite(close) && close > 0 && Number.isFinite(ts)) {
        closes.push(close)
        volumes.push(Number(cols[5]) || 0)
        timestamps.push(Math.floor(ts / 1000))
      }
    })

    return toTickerPoint({ symbol, closes, timestamps, volumes, quote: quoteMap.get(symbol), source: 'Stooq' })
  } catch {
    return null
  }
}

// 腾讯行情：国内外网络均可达，作为 Yahoo / Stooq 都失败时的第三兜底。
// 返回美股前复权日 K：rows 为 [日期, 开, 收, 高, 低, 成交量]。
async function fetchTencentTicker(symbol: string, quoteMap: Map<string, QuoteMeta>): Promise<TickerPoint | null> {
  try {
    const res = await fetchWithRetry(
      `https://web.ifzq.gtimg.cn/appstock/app/usfqkline/get?param=us${symbol},day,,,320,qfq`,
      { referer: 'https://gu.qq.com/' },
    )
    if (!res) return null
    const json = await res.json()
    const node = json?.data?.[`us${symbol}`]
    const rows: unknown[][] = node?.qfqday ?? node?.day ?? []
    if (!Array.isArray(rows) || rows.length < 6) return null

    const closes: number[] = []
    const volumes: number[] = []
    const timestamps: number[] = []
    rows.forEach((row) => {
      const close = Number(row?.[2])
      const ts = Date.parse(`${row?.[0]}T00:00:00Z`)
      if (Number.isFinite(close) && close > 0 && Number.isFinite(ts)) {
        closes.push(close)
        volumes.push(Number(row?.[5]) || 0)
        timestamps.push(Math.floor(ts / 1000))
      }
    })

    return toTickerPoint({ symbol, closes, timestamps, volumes, quote: quoteMap.get(symbol), source: 'Tencent' })
  } catch {
    return null
  }
}

async function fetchTicker(symbol: string, quoteMap: Map<string, QuoteMeta>): Promise<TickerPoint | null> {
  if (!isSourceDown('yahoo')) {
    const yahoo = await fetchYahooTicker(symbol, quoteMap)
    recordSourceResult('yahoo', !!yahoo)
    if (yahoo) return yahoo
  }
  if (!isSourceDown('stooq')) {
    const stooq = await fetchStooqTicker(symbol, quoteMap)
    recordSourceResult('stooq', !!stooq)
    if (stooq) return stooq
  }
  if (!isSourceDown('tencent')) {
    const tencent = await fetchTencentTicker(symbol, quoteMap)
    recordSourceResult('tencent', !!tencent)
    if (tencent) return tencent
  }
  return null
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

// 链等权日收益对基准日收益的回归斜率（近 N 个交易日），样本不足返回 null。
function calcBeta(points: TickerPoint[], benchmark?: TickerPoint, days = thresholds.betaWindow): number | null {
  if (!benchmark) return null
  const chainRets: number[] = []
  const benchRets: number[] = []
  for (let back = days; back >= 1; back--) {
    const bIndex = benchmark.closes.length - back
    if (bIndex < 1) continue
    const rets: number[] = []
    for (const point of points) {
      const index = point.closes.length - back
      if (index >= 1) rets.push((point.closes[index] / point.closes[index - 1] - 1) * 100)
    }
    if (!rets.length) continue
    chainRets.push(avg(rets))
    benchRets.push((benchmark.closes[bIndex] / benchmark.closes[bIndex - 1] - 1) * 100)
  }
  if (chainRets.length < thresholds.betaMinSamples) return null
  const meanBench = avg(benchRets)
  const meanChain = avg(chainRets)
  let cov = 0
  let varBench = 0
  for (let i = 0; i < benchRets.length; i++) {
    cov += (benchRets[i] - meanBench) * (chainRets[i] - meanChain)
    varBench += (benchRets[i] - meanBench) ** 2
  }
  return varBench > 0 ? cov / varBench : null
}

function classifyMode(avgDayChangePct: number, avgFiveDayChangePct: number): ChainMode {
  if (avgDayChangePct > 0 && avgFiveDayChangePct > 0) return '延续'
  if (avgDayChangePct > 0) return '补涨'
  if (avgFiveDayChangePct > 0) return '回调'
  return '走弱'
}

// 返回判定结果 + 触发原因，原因原样呈现在页面上（规则透明化）。
function classifyQuality(params: {
  avgDayChangePct: number
  excessDayPct: number
  breadth: number
  leaderGapPct: number
  syncGapPct: number
  mode: ChainMode
}): { quality: ChainQuality; reason: string } {
  const { avgDayChangePct, excessDayPct, breadth, leaderGapPct, syncGapPct, mode } = params
  if (avgDayChangePct <= 0 && excessDayPct <= 0) {
    return { quality: '走弱', reason: `日均 ${formatPct(avgDayChangePct)} 且超额 ${formatPct(excessDayPct)} 均不为正` }
  }
  if (excessDayPct <= 0) {
    return { quality: '跟涨', reason: `日均为正但超额 ${formatPct(excessDayPct)} ≤ 0，涨幅跑输 QQQ` }
  }
  if (mode === '补涨') {
    return { quality: '补涨修复', reason: `当日超额为正但 5 日均值仍为负，属回补而非延续` }
  }
  if (leaderGapPct > thresholds.leaderGapPct) {
    return { quality: '龙头抱团', reason: `龙头带动差 ${formatPct(leaderGapPct)} > 阈值 ${thresholds.leaderGapPct}%` }
  }
  if (syncGapPct > thresholds.syncGapPct) {
    return { quality: '龙头抱团', reason: `前2/后2同步差 ${formatPct(syncGapPct)} > 阈值 ${thresholds.syncGapPct}%` }
  }
  if (breadth < thresholds.breadthWeak) {
    return { quality: '龙头抱团', reason: `广度 ${Math.round(breadth * 100)}% < 阈值 ${Math.round(thresholds.breadthWeak * 100)}%` }
  }
  return {
    quality: '有效扩散',
    reason: `超额为正、广度 ${Math.round(breadth * 100)}%、带动差 ${formatPct(leaderGapPct)} 与同步差 ${formatPct(syncGapPct)} 均在阈值内`,
  }
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
  const { quality, reason: qualityReason } = classifyQuality({ avgDayChangePct, excessDayPct, breadth, leaderGapPct, syncGapPct, mode })

  const beta = calcBeta(points, benchmark)
  const betaAdjExcessDayPct = beta !== null && benchmark ? avgDayChangePct - beta * benchmark.dayChangePct : null

  // 轮动导向评分：超额收益 + 内部同步性为主，惩罚龙头独涨。
  // 各项贡献单独列出（scoreParts），供页面拆解展示 —— 这是启发式加权，不是统计模型。
  const scoreParts = [
    { label: '当日超额 × 0.9', value: excessDayPct * 0.9 },
    { label: '5日超额 × 0.35', value: excessFiveDayPct * 0.35 },
    { label: '中位数涨幅 × 0.6', value: medianDayChangePct * 0.6 },
    { label: '广度 × 3', value: breadth * 3 },
    { label: '广度改善 +0.8', value: breadthImproving ? 0.8 : 0 },
    { label: `带动差超阈惩罚 × 0.4`, value: -Math.max(0, leaderGapPct - thresholds.leaderGapPct) * 0.4 },
  ]
  const score = scoreParts.reduce((acc, part) => acc + part.value, 0)

  return {
    avgDayChangePct,
    avgFiveDayChangePct,
    medianDayChangePct,
    breadth,
    breadthSeries,
    breadthImproving,
    excessDayPct,
    excessFiveDayPct,
    beta,
    betaAdjExcessDayPct,
    leaderGapPct,
    syncGapPct,
    mode,
    quality,
    qualityReason,
    score,
    scoreParts,
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

  // 防御承接看电力供应与电力设备两条链，取当日更强者。
  const defensiveCandidates = ['datacenter-power-supply', 'power-cooling-electrical']
    .map((slug) => chains.find((chain) => chain.slug === slug))
    .filter(Boolean) as ChainData[]
  const defensive = defensiveCandidates
    .filter((chain) => chain.avgDayChangePct > 0 || chain.excessDayPct > -0.2)
    .sort((a, b) => b.excessDayPct - a.excessDayPct)[0]

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
  if (spread) parts.push(`扩散最强是${spread.shortTitle}（广度 ${Math.round(spread.breadth * 100)}%）`)
  if (defensive) parts.push(`${defensive.shortTitle}在承接`)
  if (lagging && lagging !== spread) parts.push(`${lagging.shortTitle}明显掉队`)
  const summary = `${parts.join('，')}。当前状态：${regime}。`

  return { mainline, spread, defensive, lagging, regime, summary }
}

export async function fetchBoardData() {
  const uniqueSymbols = [...new Set(chainDefs.flatMap((chain) => chain.symbols))]
  const allSymbols = [...uniqueSymbols, ...benchmarkSymbols]

  // 主通道：GitHub Actions 定时同步进 Supabase 的行情底表。
  // 库存足够新（45 分钟内）且覆盖齐全时直接零外网渲染；
  // 否则尝试现抓，现抓缺的票再用库存兜底。
  const storedRows = await fetchStoredMarketData()
  const storedMap = new Map<string, TickerPoint>()
  let newestSyncMs = 0
  for (const row of storedRows) {
    const point = toTickerPoint({
      symbol: row.symbol,
      closes: (row.data?.closes ?? []) as number[],
      timestamps: (row.data?.timestamps ?? []) as number[],
      volumes: (row.data?.volumes ?? []) as number[],
      chartMeta: row.data?.chartMeta as ChartMeta | undefined,
      quote: row.data?.quote as QuoteMeta | undefined,
      source: 'Synced',
    })
    if (!point) continue
    const updatedMs = Date.parse(row.updated_at)
    if (Number.isFinite(updatedMs)) newestSyncMs = Math.max(newestSyncMs, updatedMs)
    const ageMs = Date.now() - updatedMs
    point.sourceConfidence = ageMs < 26 * 3600_000 ? 'high' : 'medium'
    point.freshness = ageMs < 3600_000 ? 'live-ish' : 'delayed-fallback'
    storedMap.set(row.symbol, point)
  }

  const storedIsFresh = newestSyncMs > 0 && Date.now() - newestSyncMs < 10 * 60_000
  let tickerMap: Map<string, TickerPoint>
  if (storedIsFresh && storedMap.size >= allSymbols.length * 0.9) {
    tickerMap = storedMap
  } else {
    const quoteMap = await fetchYahooQuotes(allSymbols)
    // 并发限制在 8：全量并发容易触发 Yahoo 限流（429），导致随机缺票。
    const tickerResults = await mapWithConcurrency(allSymbols, 8, (symbol) => fetchTicker(symbol, quoteMap))
    tickerMap = new Map(tickerResults.filter(Boolean).map((item) => [item!.symbol, item!]))
    for (const [symbol, point] of storedMap) {
      if (!tickerMap.has(symbol)) tickerMap.set(symbol, point)
    }
  }

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
  const coverage = `${allPoints.length}/${uniqueSymbols.length}`
  const missingSymbols = allSymbols.filter((symbol) => !tickerMap.has(symbol))
  // 交易日以 QQQ 最后一根日线为准，深夜/周末渲染也会归到正确的交易日。
  const tradingDate =
    baseline?.lastCloseDate ??
    allPoints.map((point) => point.lastCloseDate).sort().at(-1) ??
    ''

  await persistBoardSnapshot({ tradingDate, chains, conclusion, baseline, coverage })

  return {
    chains,
    allPoints,
    benchmarks,
    baseline,
    conclusion,
    tradingDate,
    missingSymbols,
    lastUpdated: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC',
    coverage,
  }
}
