// 纯类型 / 常量 / 格式化函数，供服务端数据层与客户端交互组件共用。
// 不要在这里引入任何服务端依赖（fetch 逻辑、supabase 客户端等）。

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
  lastCloseDate: string
  source: 'Yahoo Finance' | 'Stooq' | 'Tencent' | 'Synced'
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

export type ScorePart = {
  label: string
  value: number
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
  beta: number | null
  betaAdjExcessDayPct: number | null
  leaderGapPct: number
  syncGapPct: number
  mode: ChainMode
  quality: ChainQuality
  qualityReason: string
  score: number
  scoreParts: ScorePart[]
  history: ChainDayStat[]
  leader?: TickerPoint
  laggard?: TickerPoint
}

// 判定阈值（启发式，非统计检验）——集中定义，方法论区和判定逻辑共用。
export const thresholds = {
  leaderGapPct: 2.5,
  syncGapPct: 5,
  breadthWeak: 0.5,
  strongExcess: 0.3,
  breadthHealthy: 0.6,
  betaWindow: 60,
  betaMinSamples: 20,
} as const

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
  MSFT: 'Microsoft',
  GOOGL: 'Alphabet',
  AMZN: 'Amazon',
  META: 'Meta',
  ORCL: 'Oracle',
  SNPS: 'Synopsys',
  CDNS: 'Cadence',
  ARM: 'Arm',
  CRDO: 'Credo',
  STX: 'Seagate',
  CRWV: 'CoreWeave',
  NBIS: 'Nebius',
  IREN: 'IREN',
  APLD: 'Applied Digital',
  EQIX: 'Equinix',
  DLR: 'Digital Realty',
  CEG: 'Constellation Energy',
  VST: 'Vistra',
  TLN: 'Talen Energy',
  PLTR: 'Palantir',
  NOW: 'ServiceNow',
  SNOW: 'Snowflake',
  DDOG: 'Datadog',
  CRM: 'Salesforce',
}

export const chainDefs: ChainDef[] = [
  {
    title: '云厂商 / AI 资本开支',
    shortTitle: '云厂商',
    slug: 'hyperscaler-capex',
    symbols: ['MSFT', 'GOOGL', 'AMZN', 'META', 'ORCL'],
    desc: '整条链的需求源头：AI 资本开支都是他们出的。',
    signal: '云厂商 CapEx 预期一变，下游全链重估；云弱链强要警惕透支。',
  },
  {
    title: 'GPU / AI 芯片',
    shortTitle: 'GPU 芯片',
    slug: 'gpu-ai-chips',
    symbols: ['NVDA', 'AMD', 'AVGO', 'MRVL', 'TSM'],
    desc: '主线强度核心温度计。',
    signal: '先看 NVDA 是否带动 AVGO / MRVL / TSM 同步走强。',
  },
  {
    title: 'EDA / 芯片设计 IP',
    shortTitle: '芯片设计',
    slug: 'eda-chip-design',
    symbols: ['SNPS', 'CDNS', 'ARM'],
    desc: '芯片最上游的设计工具与 IP 授权。',
    signal: '设计链回暖，说明行情在向更长周期的研发逻辑传导。',
  },
  {
    title: '网络 / 光通信',
    shortTitle: '网络光通信',
    slug: 'network-optical',
    symbols: ['ANET', 'CIEN', 'LITE', 'COHR', 'CSCO', 'CRDO'],
    desc: 'GPU 之后最容易承接扩散的链。',
    signal: 'ANET / CRDO 能否持续强于大盘，是扩散质量的关键。',
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
    symbols: ['MU', 'WDC', 'STX', 'AMKR', 'UMC'],
    desc: '看训练和推理需求是否继续扩容。',
    signal: 'MU 带不带得动链内，是需求扩散的重要观察点。',
  },
  {
    title: 'AI 算力云（Neocloud）',
    shortTitle: '算力云',
    slug: 'neocloud-ai-compute',
    symbols: ['CRWV', 'NBIS', 'IREN', 'APLD'],
    desc: '高 β 情绪端：GPU 租赁与新型算力云。',
    signal: '算力云领涨常见于行情后段，是过热/退潮的温度计。',
  },
  {
    title: '数据中心 / 电力供应',
    shortTitle: '电力供应',
    slug: 'datacenter-power-supply',
    symbols: ['EQIX', 'DLR', 'CEG', 'VST', 'TLN'],
    desc: '机房与电力供应商：AI 电力叙事的真正载体。',
    signal: '硬件回调时电力供应抗跌，说明市场仍在给基础设施定价。',
  },
  {
    title: '电力设备 / 散热',
    shortTitle: '电力设备',
    slug: 'power-cooling-electrical',
    symbols: ['VRT', 'ETN', 'NVT', 'HUBB', 'PWR', 'TT'],
    desc: 'AI Infra 的确定性补链（设备侧）。',
    signal: '硬件回调时若电力设备抗跌，说明基础设施逻辑还在。',
  },
  {
    title: 'AI 应用软件',
    shortTitle: 'AI 应用',
    slug: 'ai-software-apps',
    symbols: ['PLTR', 'NOW', 'SNOW', 'DDOG', 'CRM'],
    desc: '最下游：AI 变现与应用落地。',
    signal: '应用端补涨通常是行情后段特征，用来判断扩散是否到头。',
  },
]

// 资金从上游向下游扩散的典型顺序，用于轮动路径展示。
export const flowOrder = [
  'hyperscaler-capex',
  'gpu-ai-chips',
  'eda-chip-design',
  'network-optical',
  'server-storage-infra',
  'semi-equipment-manufacturing',
  'memory-packaging',
  'neocloud-ai-compute',
  'datacenter-power-supply',
  'power-cooling-electrical',
  'ai-software-apps',
]

export const benchmarkSymbols = ['QQQ', 'SOXX', 'SPY', 'XLK', 'XLI', 'XLU']

export const benchmarkNames: Record<string, string> = {
  QQQ: '纳指100',
  SOXX: '费城半导体',
  SPY: '标普500',
  XLK: '科技板块',
  XLI: '工业板块',
  XLU: '公用事业',
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
