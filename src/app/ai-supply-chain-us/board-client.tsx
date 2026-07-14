'use client'

import { Fragment, useMemo, useState } from 'react'
import Link from 'next/link'

import { benchmarkNames, formatPct, type BoardConclusion, type ChainData, type ChainQuality, type TickerPoint } from './shared'

function badge(label: string, fg: string, bg: string) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 8px', borderRadius: 999, fontSize: 11, fontWeight: 600, color: fg, background: bg }}>
      {label}
    </span>
  )
}

const qualityTones: Record<ChainQuality, { fg: string; bg: string }> = {
  有效扩散: { fg: '#027A48', bg: 'rgba(18,183,106,0.10)' },
  龙头抱团: { fg: '#B54708', bg: 'rgba(247,144,9,0.10)' },
  补涨修复: { fg: '#6D5EF5', bg: 'rgba(109,94,245,0.10)' },
  跟涨: { fg: '#667085', bg: 'rgba(102,112,133,0.10)' },
  走弱: { fg: '#D92D20', bg: 'rgba(217,45,32,0.10)' },
}

export function yahooUrl(symbol: string) {
  return `https://finance.yahoo.com/quote/${encodeURIComponent(symbol)}`
}

/* ---------- 结论层 ---------- */

export function ConclusionSection({ conclusion }: { conclusion: BoardConclusion }) {
  return (
    <section style={{ borderRadius: 24, border: '1px solid #EAECF0', background: '#FFFFFF', padding: 24, boxShadow: '0 1px 2px rgba(16,24,40,0.04)', marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#6D5EF5', letterSpacing: '0.08em' }}>今日轮动结论</div>
        {badge(`当前状态：${conclusion.regime}`, '#101828', '#F2F4F7')}
      </div>
      <div style={{ fontSize: 17, lineHeight: 1.7, fontWeight: 600, marginBottom: 16 }}>{conclusion.summary}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 10 }}>
        <ConclusionTile label="主线" chain={conclusion.mainline} accent="#6D5EF5" />
        <ConclusionTile label="扩散最强" chain={conclusion.spread} accent="#027A48" />
        <ConclusionTile label="防御承接" chain={conclusion.defensive} accent="#B54708" />
        <ConclusionTile label="明显掉队" chain={conclusion.lagging} accent="#D92D20" />
      </div>
    </section>
  )
}

function ConclusionTile({ label, chain, accent }: { label: string; chain?: ChainData; accent: string }) {
  const inner = (
    <>
      <div style={{ fontSize: 11, fontWeight: 700, color: accent, marginBottom: 6 }}>{label}</div>
      {chain ? (
        <>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#101828' }}>{chain.shortTitle} →</div>
          <div style={{ fontSize: 12, color: '#667085', marginTop: 4 }}>
            超额 {formatPct(chain.excessDayPct)} · breadth {Math.round(chain.breadth * 100)}%
          </div>
        </>
      ) : (
        <div style={{ fontSize: 13, color: '#98A2B3' }}>今日无明确对象</div>
      )}
    </>
  )
  const style = { borderRadius: 16, border: '1px solid #F2F4F7', background: '#F9FAFB', padding: '14px 14px 12px', textDecoration: 'none', display: 'block' as const }
  if (!chain) return <div style={style}>{inner}</div>
  return (
    <Link href={`/ai-supply-chain-us/${chain.slug}`} style={style}>
      {inner}
    </Link>
  )
}

/* ---------- 基准条 ---------- */

export function BenchmarkStrip({ benchmarks, baseline }: { benchmarks: TickerPoint[]; baseline?: TickerPoint }) {
  return (
    <section style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 18 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#667085' }}>基准（超额收益均相对 QQQ）</div>
      {benchmarks.map((bench) => (
        <a
          key={bench.symbol}
          href={yahooUrl(bench.symbol)}
          target="_blank"
          rel="noreferrer"
          title={`在 Yahoo Finance 查看 ${bench.symbol}`}
          style={{ display: 'flex', gap: 10, alignItems: 'baseline', borderRadius: 14, border: '1px solid #EAECF0', background: '#FFFFFF', padding: '10px 14px', textDecoration: 'none' }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: '#101828' }}>{bench.symbol}</span>
          <span style={{ fontSize: 11, color: '#667085' }}>{benchmarkNames[bench.symbol] ?? bench.shortName}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: bench.dayChangePct >= 0 ? '#027A48' : '#D92D20' }}>{formatPct(bench.dayChangePct)}</span>
          <span style={{ fontSize: 11, color: '#667085' }}>5D {formatPct(bench.fiveDayChangePct)}</span>
        </a>
      ))}
      {!baseline && <div style={{ fontSize: 12, color: '#B54708' }}>QQQ 数据暂不可用，超额收益退化为绝对涨幅。</div>}
    </section>
  )
}

/* ---------- 轮动路径 ---------- */

function flowTone(chain: ChainData) {
  if (chain.excessDayPct > 0.3 && chain.breadth >= 0.6) return { fg: '#027A48', bg: 'rgba(18,183,106,0.12)', border: 'rgba(18,183,106,0.35)' }
  if (chain.excessDayPct > 0) return { fg: '#6D5EF5', bg: 'rgba(109,94,245,0.10)', border: 'rgba(109,94,245,0.30)' }
  if (chain.avgDayChangePct > 0) return { fg: '#667085', bg: 'rgba(102,112,133,0.08)', border: '#EAECF0' }
  return { fg: '#D92D20', bg: 'rgba(217,45,32,0.08)', border: 'rgba(217,45,32,0.25)' }
}

export function FlowPathSection({ flowChains }: { flowChains: ChainData[] }) {
  return (
    <section style={{ borderRadius: 24, border: '1px solid #EAECF0', background: '#FFFFFF', padding: 20, boxShadow: '0 1px 2px rgba(16,24,40,0.04)', marginBottom: 22 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#6D5EF5', letterSpacing: '0.08em', marginBottom: 12 }}>轮动路径 · 上游 → 下游</div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'stretch', flexWrap: 'wrap' }}>
        {flowChains.map((chain, index) => {
          const tone = flowTone(chain)
          return (
            <div key={chain.slug} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Link href={`/ai-supply-chain-us/${chain.slug}`} style={{ textDecoration: 'none', display: 'block', borderRadius: 14, border: `1px solid ${tone.border}`, background: tone.bg, padding: '10px 14px', minWidth: 132 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#101828' }}>{chain.shortTitle}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: tone.fg, marginTop: 4 }}>超额 {formatPct(chain.excessDayPct)}</div>
                <div style={{ fontSize: 11, color: '#667085', marginTop: 2 }}>
                  breadth {Math.round(chain.breadth * 100)}%{chain.breadthImproving ? ' ↑' : ' ↓'}
                </div>
              </Link>
              {index < flowChains.length - 1 && <span style={{ color: '#98A2B3', fontSize: 16 }}>→</span>}
            </div>
          )
        })}
      </div>
      <div style={{ fontSize: 12, color: '#667085', marginTop: 12 }}>
        绿色 = 超额领先且扩散健康；紫色 = 超额为正；灰色 = 跟涨（涨但跑输 QQQ）；红色 = 走弱。
      </div>
    </section>
  )
}

/* ---------- 轮动轨迹热力图（可切换指标） ---------- */

type HeatMetric = 'excess' | 'avg' | 'breadth'

const heatMetricLabels: Record<HeatMetric, string> = {
  excess: '超额 vs QQQ',
  avg: '日均涨幅',
  breadth: 'Breadth',
}

function heatCell(metric: HeatMetric, stat: { avgPct: number; excessPct: number; breadth: number }) {
  if (metric === 'breadth') {
    const alpha = Math.min(0.85, 0.08 + stat.breadth * 0.7)
    return { background: `rgba(109,94,245,${alpha})`, text: `${Math.round(stat.breadth * 100)}`, strong: stat.breadth > 0.75 }
  }
  const value = metric === 'excess' ? stat.excessPct : stat.avgPct
  const alpha = Math.min(0.85, 0.12 + Math.abs(value) * 0.22)
  return {
    background: value >= 0 ? `rgba(18,183,106,${alpha})` : `rgba(217,45,32,${alpha})`,
    text: `${value >= 0 ? '+' : ''}${value.toFixed(1)}`,
    strong: Math.abs(value) > 1.6,
  }
}

export function RotationHeatmapSection({ flowChains }: { flowChains: ChainData[] }) {
  const [metric, setMetric] = useState<HeatMetric>('excess')
  const chains = flowChains
  const days = useMemo(() => Math.max(0, ...chains.map((chain) => chain.history.length)), [chains])
  if (days < 2) return null

  const dailyLeader: number[] = []
  for (let day = 0; day < days; day++) {
    let best = -Infinity
    let bestIndex = -1
    chains.forEach((chain, chainIndex) => {
      const stat = chain.history[chain.history.length - days + day]
      const value = stat ? (metric === 'breadth' ? stat.breadth : metric === 'avg' ? stat.avgPct : stat.excessPct) : -Infinity
      if (value > best) {
        best = value
        bestIndex = chainIndex
      }
    })
    dailyLeader.push(bestIndex)
  }

  return (
    <section style={{ borderRadius: 24, border: '1px solid #EAECF0', background: '#FFFFFF', padding: 20, boxShadow: '0 1px 2px rgba(16,24,40,0.04)', marginBottom: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 4 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#6D5EF5', letterSpacing: '0.08em' }}>轮动轨迹 · 近 10 个交易日</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {(Object.keys(heatMetricLabels) as HeatMetric[]).map((key) => (
            <button
              key={key}
              onClick={() => setMetric(key)}
              style={{
                padding: '6px 10px',
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
                border: metric === key ? '1px solid #6D5EF5' : '1px solid #EAECF0',
                background: metric === key ? 'rgba(109,94,245,0.10)' : '#FFFFFF',
                color: metric === key ? '#6D5EF5' : '#667085',
              }}
            >
              {heatMetricLabels[key]}
            </button>
          ))}
        </div>
      </div>
      <div style={{ fontSize: 12, color: '#667085', marginBottom: 14 }}>
        每格 = 该链当日{heatMetricLabels[metric]}。描边 = 当日最强链。顺着深色格子从上往下看，就是资金的扩散路径。点击格子进入链详情。
      </div>
      <div style={{ overflowX: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `120px repeat(${days}, minmax(34px, 1fr))`, gap: 4, minWidth: 560 }}>
          <div />
          {Array.from({ length: days }, (_, day) => (
            <div key={day} style={{ fontSize: 10, color: '#98A2B3', textAlign: 'center', alignSelf: 'end' }}>
              {day === days - 1 ? '今' : `-${days - 1 - day}`}
            </div>
          ))}
          {chains.map((chain, chainIndex) => (
            <Fragment key={chain.slug}>
              <Link href={`/ai-supply-chain-us/${chain.slug}`} style={{ textDecoration: 'none', fontSize: 12, fontWeight: 600, color: '#475467', alignSelf: 'center', whiteSpace: 'nowrap' }}>
                {chain.shortTitle}
              </Link>
              {Array.from({ length: days }, (_, day) => {
                const stat = chain.history[chain.history.length - days + day]
                if (!stat) return <div key={day} style={{ height: 30, borderRadius: 6, background: '#F2F4F7' }} />
                const cell = heatCell(metric, stat)
                const isLeader = dailyLeader[day] === chainIndex
                return (
                  <Link
                    key={day}
                    href={`/ai-supply-chain-us/${chain.slug}`}
                    title={`${chain.shortTitle} · 超额 ${formatPct(stat.excessPct)} · 日均 ${formatPct(stat.avgPct)} · breadth ${Math.round(stat.breadth * 100)}%`}
                    style={{
                      height: 30,
                      borderRadius: 6,
                      background: cell.background,
                      border: isLeader ? '2px solid #101828' : '1px solid rgba(16,24,40,0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 9,
                      fontWeight: 700,
                      textDecoration: 'none',
                      color: cell.strong ? '#FFFFFF' : '#101828',
                    }}
                  >
                    {cell.text}
                  </Link>
                )
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- 链卡片（可排序） ---------- */

type SortKey = 'score' | 'excessDayPct' | 'breadth' | 'avgDayChangePct'

const sortLabels: Record<SortKey, string> = {
  score: '轮动分',
  excessDayPct: '超额',
  breadth: 'Breadth',
  avgDayChangePct: '日内涨幅',
}

export function ChainGridSection({ chains }: { chains: ChainData[] }) {
  const [sortKey, setSortKey] = useState<SortKey>('score')
  const sorted = useMemo(() => [...chains].sort((a, b) => b[sortKey] - a[sortKey]), [chains, sortKey])

  return (
    <section>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#667085' }}>排序</span>
        {(Object.keys(sortLabels) as SortKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setSortKey(key)}
            style={{
              padding: '6px 10px',
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
              border: sortKey === key ? '1px solid #6D5EF5' : '1px solid #EAECF0',
              background: sortKey === key ? 'rgba(109,94,245,0.10)' : '#FFFFFF',
              color: sortKey === key ? '#6D5EF5' : '#667085',
            }}
          >
            {sortLabels[key]}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16 }}>
        {sorted.map((chain) => {
          const tone = qualityTones[chain.quality]
          return (
            <Link
              key={chain.slug}
              href={`/ai-supply-chain-us/${chain.slug}`}
              style={{ textDecoration: 'none', color: 'inherit', borderRadius: 20, border: '1px solid #EAECF0', background: '#FFFFFF', padding: 20, boxShadow: '0 1px 2px rgba(16,24,40,0.04)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start', marginBottom: 12 }}>
                <div>
                  <h2 style={{ fontSize: 20, lineHeight: 1.2, margin: '0 0 6px' }}>{chain.title}</h2>
                  <div style={{ color: '#667085', fontSize: 14 }}>{chain.desc}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: '#667085', marginBottom: 4 }}>Rotation score</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: chain.score >= 0 ? '#6D5EF5' : '#D94F70' }}>{chain.score.toFixed(1)}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                {badge(chain.quality, tone.fg, tone.bg)}
                {badge(chain.mode, '#101828', '#F2F4F7')}
                {badge(`breadth ${chain.breadthImproving ? '改善中' : '走平/转弱'}`, chain.breadthImproving ? '#027A48' : '#667085', chain.breadthImproving ? 'rgba(18,183,106,0.10)' : 'rgba(102,112,133,0.10)')}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10, marginBottom: 12 }}>
                <MiniMetric label="超额 vs QQQ" value={formatPct(chain.excessDayPct)} positive={chain.excessDayPct >= 0} />
                <MiniMetric label="中位数涨幅" value={formatPct(chain.medianDayChangePct)} positive={chain.medianDayChangePct >= 0} />
                <MiniMetric label="Breadth" value={`${Math.round(chain.breadth * 100)}%`} positive={chain.breadth >= 0.5} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10, marginBottom: 14 }}>
                <MiniMetric label="日内均值" value={formatPct(chain.avgDayChangePct)} positive={chain.avgDayChangePct >= 0} />
                <MiniMetric label="龙头带动差" value={formatPct(chain.leaderGapPct)} positive={chain.leaderGapPct <= 2.5} />
                <MiniMetric label="前2/后2同步差" value={formatPct(chain.syncGapPct)} positive={chain.syncGapPct <= 5} />
              </div>

              <div style={{ color: '#475467', fontSize: 13, lineHeight: 1.65, marginBottom: 14 }}>观察点：{chain.signal}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                <div style={{ color: '#667085', fontSize: 13 }}>
                  {chain.points.map((point) => `${point.symbol} ${formatPct(point.dayChangePct)}`).join(' · ') || chain.symbols.join(' · ')}
                </div>
                <div style={{ color: '#6D5EF5', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>查看详情 →</div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
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
