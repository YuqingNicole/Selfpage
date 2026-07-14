export const dynamic = 'force-dynamic'

type TickerPoint = {
  symbol: string
  shortName: string
  price: number
  previousClose: number
  dayChangePct: number
  fiveDayChangePct: number
  positiveDays: number
  closes: number[]
  currency: string
  source: 'Yahoo Finance' | 'Stooq'
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
}

const symbolNames: Record<string, string> = {
  NVDA: 'NVIDIA',
  AMD: 'AMD',
  AVGO: 'Broadcom',
  MRVL: 'Marvell',
  ANET: 'Arista Networks',
  CIEN: 'Ciena',
  LITE: 'Lumentum',
  COHR: 'Coherent',
  SMCI: 'Super Micro Computer',
  DELL: 'Dell Technologies',
  HPE: 'Hewlett Packard Enterprise',
  AMAT: 'Applied Materials',
  LRCX: 'Lam Research',
  KLAC: 'KLA',
  ASML: 'ASML',
  TSM: 'TSMC',
  MU: 'Micron',
  WDC: 'Western Digital',
  AMKR: 'Amkor',
  VRT: 'Vertiv',
  ETN: 'Eaton',
  NVT: 'nVent',
  HUBB: 'Hubbell',
  PWR: 'Quanta Services',
}

const chainDefs: ChainDef[] = [
  {
    title: 'GPU / AI 芯片',
    symbols: ['NVDA', 'AMD', 'AVGO', 'MRVL'],
    desc: '主线风险偏好温度计。先看龙头是否领涨，再看链内是否扩散。',
    signal: '先看 NVDA 是否带动 AVGO / MRVL 同步转强。',
  },
  {
    title: '网络 / 光通信',
    symbols: ['ANET', 'CIEN', 'LITE', 'COHR'],
    desc: 'Scale-out 扩散链。常在 GPU 之后承接资金，决定主线宽度。',
    signal: 'ANET 是否持续跑赢 NVDA，是关键背离信号。',
  },
  {
    title: '服务器 / 基础设施',
    symbols: ['SMCI', 'DELL', 'HPE'],
    desc: '验证硬件 CapEx 是否还在继续外溢。',
    signal: '如果 GPU 强而服务器弱，说明市场只在交易龙头，不在交易广度。',
  },
  {
    title: '半导体设备 / 制造',
    symbols: ['AMAT', 'LRCX', 'KLAC', 'ASML', 'TSM'],
    desc: '中周期验证链，判断资本开支是否真的向制造端传导。',
    signal: '设备链转强，往往意味着主线从情绪走向更扎实的中期逻辑。',
  },
  {
    title: '存储 / 封装',
    symbols: ['MU', 'WDC', 'AMKR'],
    desc: '看训练与推理扩容是否往 memory / packaging 传导。',
    signal: 'MU 是否带动存储链回暖，是判断需求扩散的重要观察点。',
  },
  {
    title: '电力 / 散热 / 供电',
    symbols: ['VRT', 'ETN', 'NVT', 'HUBB', 'PWR'],
    desc: 'AI Infra 的确定性补链，经常承担第二波逻辑。',
    signal: '硬件回调时若电力链抗跌，说明市场仍在交易基础设施确定性。',
  },
]

function toTickerPoint(params: {
  symbol: string
  shortName?: string
  price: number
  previousClose: number
  closes: number[]
  currency?: string
  source: 'Yahoo Finance' | 'Stooq'
}): TickerPoint | null {
  const { symbol, shortName, price, previousClose, closes, currency, source } = params
  if (!price || !previousClose || closes.length < 6) return null

  const fiveDayBase = closes[Math.max(0, closes.length - 6)] ?? previousClose
  const lastFive = closes.slice(-5)
  const positiveDays = lastFive.reduce((acc, current, index) => {
    if (index === 0) return acc
    return current > lastFive[index - 1] ? acc + 1 : acc
  }, 0)

  return {
    symbol,
    shortName: shortName || symbolNames[symbol] || symbol,
    price,
    previousClose,
    dayChangePct: previousClose ? ((price - previousClose) / previousClose) * 100 : 0,
    fiveDayChangePct: fiveDayBase ? ((price - fiveDayBase) / fiveDayBase) * 100 : 0,
    positiveDays,
    closes: closes.slice(-10),
    currency: currency || 'USD',
    source,
  }
}

async function fetchYahooTicker(symbol: string): Promise<TickerPoint | null> {
  try {
    const res = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=1mo&interval=1d`,
      {
        headers: { 'user-agent': 'Mozilla/5.0' },
        next: { revalidate: 1800 },
      },
    )

    if (!res.ok) return null

    const json = await res.json()
    const result = json?.chart?.result?.[0]
    const meta = result?.meta
    const closesRaw = result?.indicators?.quote?.[0]?.close ?? []
    const closes = closesRaw.filter((v: unknown) => typeof v === 'number') as number[]

    if (!meta) return null

    return toTickerPoint({
      symbol,
      shortName: meta.shortName,
      price: Number(meta.regularMarketPrice ?? closes[closes.length - 1] ?? 0),
      previousClose: Number(meta.chartPreviousClose ?? closes[closes.length - 2] ?? 0),
      closes,
      currency: meta.currency || 'USD',
      source: 'Yahoo Finance',
    })
  } catch {
    return null
  }
}

async function fetchStooqTicker(symbol: string): Promise<TickerPoint | null> {
  try {
    const res = await fetch(`https://stooq.com/q/d/l/?s=${symbol.toLowerCase()}.us&i=d`, {
      next: { revalidate: 1800 },
    })

    if (!res.ok) return null

    const csv = await res.text()
    const lines = csv
      .trim()
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)

    if (lines.length < 7) return null

    const rows = lines.slice(1).map((line) => line.split(','))
    const closes = rows
      .map((cols) => Number(cols[4]))
      .filter((value) => Number.isFinite(value) && value > 0)

    if (closes.length < 6) return null

    const price = closes[closes.length - 1]
    const previousClose = closes[closes.length - 2]

    return toTickerPoint({
      symbol,
      shortName: symbolNames[symbol] || symbol,
      price,
      previousClose,
      closes,
      currency: 'USD',
      source: 'Stooq',
    })
  } catch {
    return null
  }
}

async function fetchTicker(symbol: string): Promise<TickerPoint | null> {
  const yahoo = await fetchYahooTicker(symbol)
  if (yahoo) return yahoo
  return fetchStooqTicker(symbol)
}

function avg(values: number[]) {
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0
}

function formatPct(value: number) {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`
}

function scoreChain(points: TickerPoint[]) {
  const avgDayChangePct = avg(points.map((item) => item.dayChangePct))
  const avgFiveDayChangePct = avg(points.map((item) => item.fiveDayChangePct))
  const breadth = points.length ? points.filter((item) => item.dayChangePct > 0).length / points.length : 0
  const score = avgDayChangePct * 0.55 + avgFiveDayChangePct * 0.35 + breadth * 10
  const leader = [...points].sort((a, b) => b.dayChangePct - a.dayChangePct)[0]

  return { avgDayChangePct, avgFiveDayChangePct, breadth, score, leader }
}

function getMarketState(score: number) {
  if (score >= 3.5) return 'Risk-on'
  if (score <= -1.5) return 'Risk-off'
  return 'Observation'
}

function getActionLabel(score: number) {
  if (score >= 3.5) return 'Follow strength'
  if (score <= -1.5) return 'Defense first'
  return 'Wait for confirmation'
}

function getFlowNarrative(chain: ChainData[]) {
  const strongest = chain[0]
  const second = chain[1]
  const weakest = chain[chain.length - 1]

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
      <polyline
        fill="none"
        stroke={up ? '#9FE870' : '#F87171'}
        strokeWidth="2.4"
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

export default async function AiSupplyChainUsPage() {
  const uniqueSymbols = [...new Set(chainDefs.flatMap((chain) => chain.symbols))]
  const tickerResults = await Promise.all(uniqueSymbols.map(fetchTicker))
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
  const bestTicker = [...chains.flatMap((chain) => chain.points)].sort((a, b) => b.dayChangePct - a.dayChangePct)[0]
  const lastUpdated = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC'
  const flowNarrative = chains.length >= 3 ? getFlowNarrative(chains) : '公开行情已接入，后续可继续补更强的数据源。'
  const sourceSummary = Array.from(new Set(chains.flatMap((chain) => chain.points.map((point) => point.source))))

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top, rgba(158, 116, 255, 0.18), transparent 28%), linear-gradient(180deg, #0b1020 0%, #0f172a 45%, #111827 100%)',
        color: '#f5f7fb',
      }}
    >
      <div style={{ maxWidth: 1220, margin: '0 auto', padding: '56px 24px 80px' }}>
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
          <p style={{ maxWidth: 860, fontSize: 18, lineHeight: 1.7, color: 'rgba(245,247,251,0.76)', margin: 0 }}>
            这版已经不是静态展示页，而是直接抓取公开美股行情，压缩成主线强弱、龙头联动和“资金流向代理”判断。
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
            <span
              style={{
                padding: '6px 10px',
                borderRadius: 999,
                fontSize: 12,
                color: '#ede9fe',
                background: 'rgba(196, 181, 253, 0.12)',
                border: '1px solid rgba(196, 181, 253, 0.18)',
              }}
            >
              Fallback enabled
            </span>
          </div>
        </section>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
            marginBottom: 18,
          }}
        >
          {[
            ["Today's State", marketState, flowNarrative],
            ['Strongest Chain', strongestChain?.title || 'N/A', strongestChain ? `日内 ${formatPct(strongestChain.avgDayChangePct)} · 5日 ${formatPct(strongestChain.avgFiveDayChangePct)}` : '暂无数据'],
            ['Weakest Chain', weakestChain?.title || 'N/A', weakestChain ? `日内 ${formatPct(weakestChain.avgDayChangePct)} · 5日 ${formatPct(weakestChain.avgFiveDayChangePct)}` : '暂无数据'],
            ["Today's Leader", bestTicker?.symbol || 'N/A', bestTicker ? `${formatPrice(bestTicker.price)} · ${formatPct(bestTicker.dayChangePct)}` : '暂无数据'],
            ["Today's Move", getActionLabel(boardScore), '先看最强链能否继续扩散，再决定追随还是等待确认。'],
          ].map(([eyebrow, title, body]) => (
            <div key={String(eyebrow)} style={cardStyle()}>
              <div style={{ color: '#c8a2c8', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                {eyebrow}
              </div>
              <div style={{ fontSize: 24, fontWeight: 600, marginBottom: 10 }}>{title}</div>
              <div style={{ color: 'rgba(245,247,251,0.72)', lineHeight: 1.65 }}>{body}</div>
            </div>
          ))}
        </section>

        <section
          style={{
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 28,
            padding: 28,
            background: 'rgba(17,24,39,0.5)',
            marginBottom: 28,
          }}
        >
          <div style={{ fontSize: 14, color: '#c8a2c8', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Flow proxy
          </div>
          <h2 style={{ fontSize: 30, lineHeight: 1.15, margin: '0 0 12px' }}>不是逐笔资金流，但已经能看出钱往哪条链走</h2>
          <p style={{ maxWidth: 920, lineHeight: 1.8, color: 'rgba(245,247,251,0.76)', margin: 0 }}>
            我现在用的是公开行情做代理判断：链内平均涨跌、5日相对强弱、上涨家数占比、龙头是否同步扩散。它不等于专业 terminal 的资金流数据，但足够把“今天主线在哪、扩散到哪一步”看出来。
          </p>
        </section>

        <section style={{ marginBottom: 34 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'end', marginBottom: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ color: '#c8a2c8', fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Six-chain live board</div>
              <h2 style={{ fontSize: 30, margin: 0 }}>Real market structure</h2>
            </div>
            <div style={{ color: 'rgba(245,247,251,0.68)', maxWidth: 460, lineHeight: 1.65 }}>
              这六条链不再只是观察框架，而是已经接上真实价格、日内强弱、5日趋势和链内广度。
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
            {chains.map((chain) => (
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
                  {chain.points.map((point) => (
                    <div
                      key={point.symbol}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '90px 1fr auto',
                        gap: 12,
                        alignItems: 'center',
                        padding: '10px 12px',
                        borderRadius: 16,
                        background: 'rgba(255,255,255,0.03)',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700 }}>{point.symbol}</div>
                        <div style={{ fontSize: 12, color: 'rgba(245,247,251,0.54)' }}>{formatPrice(point.price)}</div>
                      </div>
                      <Sparkline values={point.closes} />
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: point.dayChangePct >= 0 ? '#9FE870' : '#F87171', fontWeight: 700 }}>{formatPct(point.dayChangePct)}</div>
                        <div style={{ fontSize: 12, color: 'rgba(245,247,251,0.54)' }}>5D {formatPct(point.fiveDayChangePct)}</div>
                        <div style={{ fontSize: 11, color: 'rgba(245,247,251,0.4)', marginTop: 2 }}>{point.source}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          style={{
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 28,
            padding: 28,
            background: 'rgba(255,255,255,0.03)',
          }}
        >
          <div style={{ color: '#c8a2c8', fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
            Data source / methodology
          </div>
          <h2 style={{ fontSize: 28, lineHeight: 1.15, margin: '0 0 14px' }}>公开把来源和判断逻辑写清楚</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            <div style={cardStyle(0.02)}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Primary source</div>
              <div style={{ color: 'rgba(245,247,251,0.72)', lineHeight: 1.7 }}>
                Yahoo Finance chart API：优先抓取 1 个月日线数据，用于最新价、昨收、5日涨跌幅和 sparkline。
              </div>
            </div>
            <div style={cardStyle(0.02)}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Fallback source</div>
              <div style={{ color: 'rgba(245,247,251,0.72)', lineHeight: 1.7 }}>
                当 Yahoo 不可用时，自动退回 Stooq 日线 CSV，保证页面不因单一数据源失效而整块空掉。
              </div>
            </div>
            <div style={cardStyle(0.02)}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>What this board measures</div>
              <div style={{ color: 'rgba(245,247,251,0.72)', lineHeight: 1.7 }}>
                指标包括最新价、昨收、当日涨跌幅、5日涨跌幅、链内上涨家数占比，以及按链条聚合后的 breadth / score。
              </div>
            </div>
            <div style={cardStyle(0.02)}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Important limitation</div>
              <div style={{ color: 'rgba(245,247,251,0.72)', lineHeight: 1.7 }}>
                这里的“资金流向”是价格行为代理，不是 Bloomberg / FactSet 级别的逐笔资金流或机构订单流数据。
              </div>
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
