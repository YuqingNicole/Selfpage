// 行情同步脚本：在 GitHub Actions（或任何能访问 Yahoo 的机器）上运行，
// 抓取全部成分股 + 基准的日线和报价，upsert 到 Supabase ai_market_data 表。
// 页面读表渲染，从而不依赖部署环境的外网连通性。
//
// 环境变量：SUPABASE_URL、SUPABASE_SERVICE_ROLE_KEY
// 运行：node scripts/sync-market-data.mjs

import { readFileSync } from 'node:fs'

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
// 未配置 Supabase 凭据时进入干跑模式：照常抓数据、打印覆盖率，但不写库。
// 用于在配置 Secrets 之前验证 GitHub Runner 到行情源的连通性。
const DRY_RUN = !SUPABASE_URL || !SERVICE_KEY
if (DRY_RUN) {
  console.warn('DRY RUN: SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set — will fetch but NOT write.')
  console.warn('Add both as repository secrets (Settings → Secrets and variables → Actions) to enable writing.')
}

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

// 股票清单以 shared.ts 为唯一事实来源，这里做轻量解析避免重复维护。
function loadSymbols() {
  const src = readFileSync(new URL('../src/app/ai-supply-chain-us/shared.ts', import.meta.url), 'utf8')
  const chainSymbols = [...src.matchAll(/symbols:\s*\[([^\]]+)\]/g)].flatMap((match) =>
    (match[1].match(/'[A-Z.]+'/g) ?? []).map((token) => token.slice(1, -1)),
  )
  const benchBlock = src.match(/benchmarkSymbols\s*=\s*\[([^\]]+)\]/)?.[1] ?? ''
  const benchSymbols = (benchBlock.match(/'[A-Z.]+'/g) ?? []).map((token) => token.slice(1, -1))
  const symbols = [...new Set([...chainSymbols, ...benchSymbols])]
  if (!symbols.length) throw new Error('No symbols parsed from shared.ts')
  return symbols
}

async function fetchWithRetry(url, headers = {}, retries = 3) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { headers, signal: AbortSignal.timeout(10000) })
      if (res.ok) return res
      if (res.status === 404) return null
    } catch {
      // retry
    }
    if (attempt < retries) await new Promise((resolve) => setTimeout(resolve, 800 * (attempt + 1)))
  }
  return null
}

async function getYahooAuth() {
  try {
    const cookieRes = await fetch('https://fc.yahoo.com/', {
      headers: { 'user-agent': UA },
      redirect: 'manual',
      signal: AbortSignal.timeout(8000),
    })
    const cookie = cookieRes.headers.get('set-cookie')?.split(';')[0]
    if (!cookie) return null
    const crumbRes = await fetch('https://query1.finance.yahoo.com/v1/test/getcrumb', {
      headers: { 'user-agent': UA, cookie },
      signal: AbortSignal.timeout(8000),
    })
    if (!crumbRes.ok) return null
    const crumb = (await crumbRes.text()).trim()
    if (!crumb || crumb.includes('<')) return null
    return { cookie, crumb }
  } catch {
    return null
  }
}

async function fetchQuotes(symbols) {
  const parse = async (res) => {
    if (!res || !res.ok) return null
    const json = await res.json()
    const list = json?.quoteResponse?.result ?? []
    return list.length ? new Map(list.map((item) => [item.symbol, item])) : null
  }
  const plain = await parse(await fetchWithRetry(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols.join(',')}`, { 'user-agent': UA }, 1))
  if (plain) return plain
  const auth = await getYahooAuth()
  if (!auth) return new Map()
  const authed = await parse(
    await fetchWithRetry(
      `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols.join(',')}&crumb=${encodeURIComponent(auth.crumb)}`,
      { 'user-agent': UA, cookie: auth.cookie },
      1,
    ),
  )
  return authed ?? new Map()
}

function packSeries(closes, volumes, timestamps, chartMeta, source) {
  if (closes.length < 6) return null
  return {
    closes: closes.slice(-300),
    volumes: volumes.slice(-300),
    timestamps: timestamps.slice(-300),
    chartMeta,
    source,
  }
}

async function fetchChartYahoo(symbol) {
  const res = await fetchWithRetry(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=1y&interval=1d`, { 'user-agent': UA }, 1)
  if (!res) return null
  const json = await res.json()
  const result = json?.chart?.result?.[0]
  const closesRaw = result?.indicators?.quote?.[0]?.close ?? []
  const volumesRaw = result?.indicators?.quote?.[0]?.volume ?? []
  const timestampsRaw = result?.timestamp ?? []
  const closes = []
  const volumes = []
  const timestamps = []
  closesRaw.forEach((value, index) => {
    const close = Number(value)
    const ts = Number(timestampsRaw[index])
    if (Number.isFinite(close) && close > 0 && Number.isFinite(ts)) {
      closes.push(close)
      volumes.push(Number(volumesRaw[index]) || 0)
      timestamps.push(ts)
    }
  })
  const meta = result?.meta ?? {}
  return packSeries(closes, volumes, timestamps, {
    shortName: meta.shortName || meta.longName || undefined,
    volume: Number(meta.regularMarketVolume) || undefined,
    week52High: Number(meta.fiftyTwoWeekHigh) || undefined,
    week52Low: Number(meta.fiftyTwoWeekLow) || undefined,
    price: Number(meta.regularMarketPrice) || undefined,
    previousClose: Number(meta.previousClose) || undefined,
  }, 'yahoo')
}

async function fetchChartStooq(symbol) {
  const res = await fetchWithRetry(`https://stooq.com/q/d/l/?s=${symbol.toLowerCase()}.us&i=d`, {}, 1)
  if (!res) return null
  const csv = await res.text()
  const lines = csv.trim().split('\n').map((line) => line.trim()).filter(Boolean)
  if (lines.length < 7) return null
  const closes = []
  const volumes = []
  const timestamps = []
  lines.slice(1).forEach((line) => {
    const cols = line.split(',')
    const close = Number(cols[4])
    const ts = Date.parse(`${cols[0]}T00:00:00Z`)
    if (Number.isFinite(close) && close > 0 && Number.isFinite(ts)) {
      closes.push(close)
      volumes.push(Number(cols[5]) || 0)
      timestamps.push(Math.floor(ts / 1000))
    }
  })
  return packSeries(closes, volumes, timestamps, undefined, 'stooq')
}

async function fetchChartTencent(symbol) {
  const res = await fetchWithRetry(
    `https://web.ifzq.gtimg.cn/appstock/app/usfqkline/get?param=us${symbol},day,,,320,qfq`,
    { referer: 'https://gu.qq.com/' },
    1,
  )
  if (!res) return null
  const json = await res.json()
  const node = json?.data?.[`us${symbol}`]
  const rows = node?.qfqday ?? node?.day ?? []
  if (!Array.isArray(rows)) return null
  const closes = []
  const volumes = []
  const timestamps = []
  rows.forEach((row) => {
    const close = Number(row?.[2])
    const ts = Date.parse(`${row?.[0]}T00:00:00Z`)
    if (Number.isFinite(close) && close > 0 && Number.isFinite(ts)) {
      closes.push(close)
      volumes.push(Number(row?.[5]) || 0)
      timestamps.push(Math.floor(ts / 1000))
    }
  })
  return packSeries(closes, volumes, timestamps, undefined, 'tencent')
}

// Yahoo 会封锁云厂商 IP 段（含 GitHub Runner），因此逐源兜底。
async function fetchChart(symbol) {
  return (await fetchChartYahoo(symbol)) ?? (await fetchChartStooq(symbol)) ?? (await fetchChartTencent(symbol))
}

// 启动时各源探测一次，日志里直接可见连通性。
async function probeSources() {
  const targets = [
    ['yahoo', 'https://query1.finance.yahoo.com/v8/finance/chart/NVDA?range=5d&interval=1d', { 'user-agent': UA }],
    ['stooq', 'https://stooq.com/q/d/l/?s=nvda.us&i=d', {}],
    ['tencent', 'https://web.ifzq.gtimg.cn/appstock/app/usfqkline/get?param=usNVDA,day,,,5,qfq', { referer: 'https://gu.qq.com/' }],
  ]
  for (const [name, url, headers] of targets) {
    try {
      const res = await fetch(url, { headers, signal: AbortSignal.timeout(8000) })
      console.log(`probe ${name}: HTTP ${res.status}`)
    } catch (error) {
      console.log(`probe ${name}: ${error}`)
    }
  }
}

function pickQuoteFields(quote) {
  if (!quote) return undefined
  const fields = [
    'symbol',
    'shortName',
    'regularMarketPrice',
    'regularMarketPreviousClose',
    'regularMarketVolume',
    'averageDailyVolume3Month',
    'marketCap',
    'fiftyTwoWeekHigh',
    'fiftyTwoWeekLow',
    'preMarketPrice',
    'postMarketPrice',
    'currency',
  ]
  return Object.fromEntries(fields.filter((key) => quote[key] !== undefined).map((key) => [key, quote[key]]))
}

async function main() {
  const symbols = loadSymbols()
  console.log(`Syncing ${symbols.length} symbols…`)
  await probeSources()
  const quoteMap = await fetchQuotes(symbols)
  console.log(`Quotes returned: ${quoteMap.size}`)

  const rows = []
  const failed = []
  const queue = [...symbols]
  const workers = Array.from({ length: 6 }, async () => {
    while (queue.length) {
      const symbol = queue.shift()
      const chart = await fetchChart(symbol)
      if (!chart) {
        failed.push(symbol)
        continue
      }
      rows.push({
        symbol,
        data: { ...chart, quote: pickQuoteFields(quoteMap.get(symbol)), syncedAt: new Date().toISOString() },
        updated_at: new Date().toISOString(),
      })
    }
  })
  await Promise.all(workers)

  const bySource = rows.reduce((acc, row) => {
    const source = row.data.source ?? 'unknown'
    acc[source] = (acc[source] ?? 0) + 1
    return acc
  }, {})
  console.log(`Charts ok: ${rows.length} (${JSON.stringify(bySource)}), failed: ${failed.length}${failed.length ? ` (${failed.join(', ')})` : ''}`)
  if (!rows.length) {
    console.error('Nothing fetched — aborting without writing.')
    process.exit(1)
  }

  if (DRY_RUN) {
    console.log(`DRY RUN complete: ${rows.length}/${symbols.length} symbols fetched successfully. No data written.`)
    if (rows.length < symbols.length * 0.8) process.exit(1)
    return
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/ai_market_data?on_conflict=symbol`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_KEY,
      authorization: `Bearer ${SERVICE_KEY}`,
      'content-type': 'application/json',
      prefer: 'resolution=merge-duplicates',
    },
    body: JSON.stringify(rows),
    signal: AbortSignal.timeout(30000),
  })
  if (!res.ok) {
    console.error(`Supabase upsert failed: ${res.status} ${await res.text()}`)
    process.exit(1)
  }
  console.log(`Upserted ${rows.length} symbols to ai_market_data.`)

  // 覆盖率低于 80% 视为同步失败，让 Action 标红便于发现。
  if (rows.length < symbols.length * 0.8) {
    console.error('Coverage below 80% — marking run as failed.')
    process.exit(1)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
