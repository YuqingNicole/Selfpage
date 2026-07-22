import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

async function getYahooCrumb(): Promise<{ cookie: string; crumb: string } | null> {
  try {
    const cookieRes = await fetch('https://fc.yahoo.com/', {
      headers: { 'user-agent': UA },
      redirect: 'manual',
      signal: AbortSignal.timeout(5000),
    })
    const cookie = cookieRes.headers.get('set-cookie')?.split(';')[0]
    if (!cookie) return null
    const crumbRes = await fetch('https://query1.finance.yahoo.com/v1/test/getcrumb', {
      headers: { 'user-agent': UA, cookie },
      signal: AbortSignal.timeout(5000),
    })
    if (!crumbRes.ok) return null
    const crumb = (await crumbRes.text()).trim()
    if (!crumb || crumb.includes('<')) return null
    return { cookie, crumb }
  } catch {
    return null
  }
}

async function fetchYahooQuotes(symbols: string[]): Promise<Record<string, { price: number; chg: number; pchg: number }>> {
  const chunk = symbols.slice(0, 60) // Yahoo v7 单批最多 ~100，保守用60
  const base = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${chunk.join(',')}&fields=regularMarketPrice,regularMarketChangePercent,regularMarketPreviousClose`

  // 先裸调，不带 crumb
  try {
    const res = await fetch(base, { headers: { 'user-agent': UA }, signal: AbortSignal.timeout(7000) })
    if (res.ok) {
      const json = await res.json()
      const list = (json?.quoteResponse?.result ?? []) as {
        symbol: string
        regularMarketPrice: number
        regularMarketChangePercent: number
        regularMarketPreviousClose: number
      }[]
      if (list.length) return buildMap(list)
    }
  } catch {
    // fall through
  }

  // 带 crumb 重试
  const auth = await getYahooCrumb()
  if (!auth) return {}
  try {
    const res = await fetch(`${base}&crumb=${encodeURIComponent(auth.crumb)}`, {
      headers: { 'user-agent': UA, cookie: auth.cookie },
      signal: AbortSignal.timeout(7000),
    })
    if (!res.ok) return {}
    const json = await res.json()
    const list = (json?.quoteResponse?.result ?? []) as {
      symbol: string
      regularMarketPrice: number
      regularMarketChangePercent: number
      regularMarketPreviousClose: number
    }[]
    return buildMap(list)
  } catch {
    return {}
  }
}

function buildMap(list: { symbol: string; regularMarketPrice: number; regularMarketChangePercent: number; regularMarketPreviousClose: number }[]) {
  const map: Record<string, { price: number; chg: number; pchg: number }> = {}
  for (const item of list) {
    const price = Number(item.regularMarketPrice)
    const pchg = Number(item.regularMarketChangePercent)
    const prev = Number(item.regularMarketPreviousClose)
    if (!price) continue
    map[item.symbol] = {
      price: Math.round(price * 100) / 100,
      chg: prev ? Math.round(((price - prev) / prev) * 10000) / 100 : Math.round(pchg * 100) / 100,
      pchg: Math.round(pchg * 100) / 100,
    }
  }
  return map
}

export async function GET(req: NextRequest) {
  const symbols = req.nextUrl.searchParams.get('symbols')
  if (!symbols) return NextResponse.json({ error: 'missing symbols' }, { status: 400 })

  const list = symbols
    .toUpperCase()
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 60)

  if (!list.length) return NextResponse.json({ error: 'empty' }, { status: 400 })

  const quotes = await fetchYahooQuotes(list)

  return NextResponse.json(quotes, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
