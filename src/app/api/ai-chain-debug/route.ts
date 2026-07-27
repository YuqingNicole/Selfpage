import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

// 数据源连通性诊断：对每个行情来源发一次探测请求，返回状态码 / 耗时 / 响应片段。
// 用于排查“页面缺数据”到底是哪个源、哪种失败（超时 / 401 / 429 / 被墙）。
async function probe(name: string, url: string, headers: Record<string, string> = {}) {
  const started = Date.now()
  try {
    const res = await fetch(url, { headers, cache: 'no-store', signal: AbortSignal.timeout(8000) })
    const text = await res.text()
    return {
      name,
      status: res.status,
      ok: res.ok,
      ms: Date.now() - started,
      sample: text.slice(0, 150),
    }
  } catch (error) {
    return {
      name,
      status: null,
      ok: false,
      ms: Date.now() - started,
      error: String(error),
    }
  }
}

export async function GET() {
  const results = await Promise.all([
    probe('yahoo-chart', 'https://query1.finance.yahoo.com/v8/finance/chart/NVDA?range=5d&interval=1d', { 'user-agent': UA }),
    probe('yahoo-quote', 'https://query1.finance.yahoo.com/v7/finance/quote?symbols=NVDA', { 'user-agent': UA }),
    probe('yahoo-cookie', 'https://fc.yahoo.com/', { 'user-agent': UA }),
    probe('stooq', 'https://stooq.com/q/d/l/?s=nvda.us&i=d'),
    probe('tencent', 'https://web.ifzq.gtimg.cn/appstock/app/usfqkline/get?param=usNVDA,day,,,5,qfq', { referer: 'https://gu.qq.com/' }),
  ])

  return NextResponse.json({
    checkedAt: new Date().toISOString(),
    runtime: `node ${process.version}`,
    results,
  })
}
