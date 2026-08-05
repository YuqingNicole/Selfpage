'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { positionValue, type Leg } from './blackScholes';
import { awardBadge } from './badges';
import { sfx } from './sounds';

/**
 * 交易生存挑战：52 周 Roguelike
 * $10,000 虚拟资金，每周随机行情 + 事件卡，选策略和仓位活下去。
 * 结算用真实 Black-Scholes：开仓 30 DTE，一周后按新市场状态估值。
 */

const START_CASH = 10000;
const TOTAL_WEEKS = 52;
const START_PRICE = 100;
const START_IV = 30;
const MIN_TRADE_CASH = 300;
const COMMISSION = 2; // 每张合约往返

const BEST_KEY = 'options-survival-best-v1';

type EventId = 'normal' | 'calm' | 'earnings' | 'fed' | 'volcrush' | 'crash' | 'squeeze';

interface WeekEvent {
  id: EventId;
  emoji: string;
  zh: string;
  en: string;
  /** 是否会出现在预报里（crash/squeeze 是黑天鹅，从不预报） */
  forecastable: boolean;
}

const EVENTS: Record<EventId, WeekEvent> = {
  normal: { id: 'normal', emoji: '📰', zh: '普通的一周', en: 'A normal week', forecastable: true },
  calm: { id: 'calm', emoji: '😴', zh: '平静期：没有任何消息', en: 'Dead calm: no news at all', forecastable: true },
  earnings: { id: 'earnings', emoji: '📊', zh: '财报周：IV 已被抬高，落地必有 IV Crush', en: 'Earnings week: IV pumped, crush guaranteed after', forecastable: true },
  fed: { id: 'fed', emoji: '🏛️', zh: '美联储议息：会后不确定性消散', en: 'Fed week: uncertainty resolves after the meeting', forecastable: true },
  volcrush: { id: 'volcrush', emoji: '🧊', zh: '风平浪静：波动率持续阴跌', en: 'Volatility keeps bleeding lower', forecastable: true },
  crash: { id: 'crash', emoji: '💥', zh: '闪崩！恐慌抛售席卷市场', en: 'Flash crash! Panic selling everywhere', forecastable: false },
  squeeze: { id: 'squeeze', emoji: '🚀', zh: '逼空！股价失控上涨', en: 'Squeeze! Price melting up out of control', forecastable: false },
};

interface Play {
  id: string;
  emoji: string;
  zh: string;
  en: string;
  zhHint: string;
  enHint: string;
  /** 相对当前股价生成合约腿 */
  legs: (S: number) => Leg[];
}

const r5 = (x: number) => Math.round(x / 5) * 5;

const PLAYS: Play[] = [
  {
    id: 'putSpread', emoji: '🟢', zh: '卖 Put 价差', en: 'Put Credit Spread',
    zhHint: '看不跌·收权利金', enHint: 'Neutral-bullish income',
    legs: (S) => [
      { type: 'put', strike: r5(S * 0.95), qty: -1 },
      { type: 'put', strike: r5(S * 0.95) - 5, qty: 1 },
    ],
  },
  {
    id: 'callSpread', emoji: '🔴', zh: '卖 Call 价差', en: 'Call Credit Spread',
    zhHint: '看不涨·收权利金', enHint: 'Neutral-bearish income',
    legs: (S) => [
      { type: 'call', strike: r5(S * 1.05), qty: -1 },
      { type: 'call', strike: r5(S * 1.05) + 5, qty: 1 },
    ],
  },
  {
    id: 'condor', emoji: '🦅', zh: '铁鹰', en: 'Iron Condor',
    zhHint: '赌横盘·双边收租', enHint: 'Range-bound double income',
    legs: (S) => [
      { type: 'put', strike: r5(S * 0.95), qty: -1 },
      { type: 'put', strike: r5(S * 0.95) - 5, qty: 1 },
      { type: 'call', strike: r5(S * 1.05), qty: -1 },
      { type: 'call', strike: r5(S * 1.05) + 5, qty: 1 },
    ],
  },
  {
    id: 'longCall', emoji: '📈', zh: '买 Call', en: 'Long Call',
    zhHint: '赌上涨·亏损有限', enHint: 'Bullish, defined risk',
    legs: (S) => [{ type: 'call', strike: r5(S), qty: 1 }],
  },
  {
    id: 'longPut', emoji: '📉', zh: '买 Put', en: 'Long Put',
    zhHint: '赌下跌·亏损有限', enHint: 'Bearish, defined risk',
    legs: (S) => [{ type: 'put', strike: r5(S), qty: 1 }],
  },
  {
    id: 'straddle', emoji: '🎪', zh: '买跨式', en: 'Long Straddle',
    zhHint: '赌大波动·不赌方向', enHint: 'Bet on a big move',
    legs: (S) => [
      { type: 'call', strike: r5(S), qty: 1 },
      { type: 'put', strike: r5(S), qty: 1 },
    ],
  },
];

const SIZES = [
  { id: 'small', zh: '谨慎 5%', en: 'Careful 5%', pct: 0.05 },
  { id: 'std', zh: '标准 12%', en: 'Standard 12%', pct: 0.12 },
  { id: 'heavy', zh: '重仓 30%', en: 'Heavy 30%', pct: 0.3 },
  { id: 'yolo', zh: '梭哈 70%', en: 'YOLO 70%', pct: 0.7 },
];

interface BestRecord {
  weeks: number;
  netliq: number;
  runs: number;
}

function loadBest(): BestRecord | null {
  try {
    const raw = localStorage.getItem(BEST_KEY);
    return raw ? (JSON.parse(raw) as BestRecord) : null;
  } catch {
    return null;
  }
}

function saveBest(weeks: number, netliq: number) {
  try {
    const prev = loadBest();
    const better = !prev || weeks > prev.weeks || (weeks === prev.weeks && netliq > prev.netliq);
    localStorage.setItem(
      BEST_KEY,
      JSON.stringify({
        weeks: better ? weeks : prev.weeks,
        netliq: better ? netliq : prev.netliq,
        runs: (prev?.runs ?? 0) + 1,
      }),
    );
  } catch {
    /* ignore */
  }
}

/** Box-Muller 标准正态 */
function randn(): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function pickForecast(): EventId {
  const roll = Math.random();
  if (roll < 0.42) return 'normal';
  if (roll < 0.56) return 'calm';
  if (roll < 0.72) return 'earnings';
  if (roll < 0.84) return 'fed';
  return 'volcrush';
}

/** 黑天鹅：预报之外的真实事件 */
function realizeEvent(forecast: EventId): EventId {
  const roll = Math.random();
  if (roll < 0.05) return 'crash';
  if (roll < 0.08) return 'squeeze';
  return forecast;
}

/** 事件对市场的影响：返回 [周收益率, 新 IV] */
function resolveMarket(event: EventId, iv: number): [number, number] {
  const weeklySigma = iv / 100 / Math.sqrt(52);
  const clampIv = (v: number) => Math.min(120, Math.max(12, v));
  switch (event) {
    case 'calm':
      return [randn() * weeklySigma * 0.4, clampIv(iv * 0.88)];
    case 'earnings': {
      const mag = (0.5 + Math.random() * 2) * weeklySigma * 2;
      return [Math.random() < 0.5 ? mag : -mag, clampIv(Math.max(iv * 0.55, 18))];
    }
    case 'fed':
      return [randn() * weeklySigma * 1.2, clampIv(iv - 8)];
    case 'volcrush':
      return [randn() * weeklySigma * 0.5, clampIv(iv * 0.6)];
    case 'crash':
      return [-(0.08 + Math.random() * 0.1), clampIv(iv * 1.9)];
    case 'squeeze':
      return [0.08 + Math.random() * 0.1, clampIv(iv + 30)];
    default:
      return [randn() * weeklySigma, clampIv(iv + (30 - iv) * 0.15 + (Math.random() - 0.5) * 6)];
  }
}

/** 单张合约最大亏损（美元，用于仓位换算） */
function maxLossPerContract(legs: Leg[], S: number, T: number, sigma: number): number {
  const entry = positionValue(legs, S, T, sigma);
  let worst = 0;
  for (let s = S * 0.3; s <= S * 2; s += S * 0.02) {
    const expiry = legs.reduce((sum, l) => {
      const iv2 = l.type === 'stock' ? s : l.type === 'call' ? Math.max(s - l.strike, 0) : Math.max(l.strike - s, 0);
      return sum + l.qty * iv2;
    }, 0);
    worst = Math.min(worst, expiry - entry);
  }
  return Math.max(50, -worst * 100);
}

interface Resolution {
  event: EventId;
  ret: number;
  ivAfter: number;
  playZh: string;
  playEn: string;
  contracts: number;
  pl: number;
}

type Phase = 'menu' | 'pick' | 'result' | 'dead' | 'won';

export function SurvivalGame({ onExit }: { onExit: () => void }) {
  const { lang } = useLanguage();
  const t = (zh: string, en: string) => (lang === 'en' ? en : zh);

  const [phase, setPhase] = useState<Phase>('menu');
  const [week, setWeek] = useState(1);
  const [netliq, setNetliq] = useState(START_CASH);
  const [history, setHistory] = useState<number[]>([START_CASH]);
  const [price, setPrice] = useState(START_PRICE);
  const [iv, setIv] = useState(START_IV);
  const [forecast, setForecast] = useState<EventId>('normal');
  const [playId, setPlayId] = useState<string | null>(null);
  const [sizeId, setSizeId] = useState('std');
  const [resolution, setResolution] = useState<Resolution | null>(null);
  const best = useMemo(() => (typeof window === 'undefined' ? null : loadBest()), [phase]);

  function startRun() {
    setWeek(1);
    setNetliq(START_CASH);
    setHistory([START_CASH]);
    setPrice(START_PRICE);
    setIv(START_IV);
    setPlayId(null);
    setSizeId('std');
    const f = pickForecast();
    setForecast(f);
    setIv((v) => (f === 'earnings' ? Math.min(120, v + 15) : v));
    setPhase('pick');
  }

  /** 每张牌当前的开仓金额与最大亏损（展示用） */
  function playQuote(p: Play) {
    const legs = p.legs(price);
    const entry = positionValue(legs, price, 30 / 365, iv / 100);
    const maxLoss = maxLossPerContract(legs, price, 30 / 365, iv / 100);
    return { entry, maxLoss };
  }

  function resolveWeek() {
    const event = realizeEvent(forecast);
    const [ret, ivAfter] = resolveMarket(event, iv);
    const newPrice = Math.max(5, price * (1 + ret));

    let pl = 0;
    let contracts = 0;
    let playZh = t('空仓观望', 'Sat out');
    let playEn = 'Sat out';
    if (playId) {
      const play = PLAYS.find((p) => p.id === playId)!;
      playZh = play.zh;
      playEn = play.en;
      const legs = play.legs(price);
      const entry = positionValue(legs, price, 30 / 365, iv / 100);
      const exit = positionValue(legs, newPrice, 23 / 365, ivAfter / 100);
      const perContract = maxLossPerContract(legs, price, 30 / 365, iv / 100);
      const budget = netliq * SIZES.find((s) => s.id === sizeId)!.pct;
      contracts = Math.max(1, Math.floor(budget / perContract));
      pl = (exit - entry) * 100 * contracts - COMMISSION * contracts;
    }

    const newNetliq = Math.round((netliq + pl) * 100) / 100;
    setResolution({ event, ret, ivAfter, playZh, playEn, contracts, pl });
    setNetliq(newNetliq);
    setHistory((h) => [...h, newNetliq]);
    setPrice(newPrice);
    setIv(ivAfter);

    if (newNetliq < MIN_TRADE_CASH) {
      saveBest(week, newNetliq);
      awardBadge('tuition_paid');
      sfx.crash();
      setPhase('dead');
    } else if (week >= TOTAL_WEEKS) {
      saveBest(TOTAL_WEEKS, newNetliq);
      awardBadge('survivor_52');
      sfx.perfect();
      setPhase('won');
    } else {
      if (pl > 0) sfx.coin();
      else if (pl < 0) sfx.wrong();
      setPhase('result');
    }
  }

  function nextWeek() {
    setWeek((w) => w + 1);
    setPlayId(null);
    const f = pickForecast();
    setForecast(f);
    if (f === 'earnings') setIv((v) => Math.min(120, v + 15));
    setPhase('pick');
  }

  const fmtMoney = (v: number) =>
    `$${v.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

  /* ---- 资金曲线迷你图 ---- */
  const spark = useMemo(() => {
    if (history.length < 2) return '';
    const w = 320;
    const h = 48;
    const min = Math.min(...history);
    const max = Math.max(...history);
    const span = Math.max(max - min, 1);
    return history
      .map((v, i) => {
        const x = (i / (history.length - 1)) * w;
        const y = h - ((v - min) / span) * (h - 6) - 3;
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  }, [history]);

  const deathQuips: Record<EventId, [string, string]> = {
    crash: ['死于闪崩：仓位是生命线，你把它当跳绳。', 'Died in the crash: position size was your lifeline; you used it as a jump rope.'],
    squeeze: ['死于逼空：卖方的收益封顶，亏损可没有。', 'Died in the squeeze: seller income is capped, losses are not.'],
    earnings: ['死于财报：你赌的不是方向，是已经标好的价。', 'Died on earnings: you bet against the priced-in move and lost.'],
    normal: ['死于普通的一周：没有黑天鹅，只有重仓。', 'Died in a normal week: no black swan, just oversizing.'],
    calm: ['死于平静期：连平静都能亏，仓位得多大？', 'Died in dead calm: how big was that position, exactly?'],
    fed: ['死于美联储：和央行对赌，勇气可嘉。', 'Died on Fed day: bold move, betting against the central bank.'],
    volcrush: ['死于波动率阴跌：买的期权在冰面上融化了。', 'Died of vol bleed: your long options melted on the ice.'],
  };

  const rating = (v: number): [string, string] => {
    if (v >= 25000) return ['🐉 期权之神', '🐉 Options Deity'];
    if (v >= 15000) return ['🏆 收割者', '🏆 Harvester'];
    if (v >= 10000) return ['🛡️ 稳健操盘手', '🛡️ Steady Operator'];
    return ['🌱 幸存者', '🌱 Survivor'];
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto w-full max-w-2xl px-4 pb-16 pt-5">
        {/* 顶栏 */}
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={onExit}
            aria-label={t('退出游戏', 'Exit game')}
            className="text-2xl leading-none text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
          >
            ✕
          </button>
          <h1 className="text-xl font-extrabold sm:text-2xl">🎮 {t('交易生存挑战', 'Survival Challenge')}</h1>
        </div>

        {phase === 'menu' && (
          <div className="text-center">
            <div className="my-8 text-7xl" aria-hidden>💰</div>
            <h2 className="mb-3 text-2xl font-extrabold">{t('活过 52 周', 'Survive 52 Weeks')}</h2>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-[var(--muted-foreground)]">
              {t(
                `给你 ${fmtMoney(START_CASH)} 虚拟资金。每周看预告、选策略、定仓位，市场用真实的期权数学结算。黑天鹅不会出现在预告里。爆仓即出局。`,
                `You start with ${fmtMoney(START_CASH)}. Each week: read the forecast, pick a play, size it. Real options math settles the P/L. Black swans are never in the forecast. Blow up and you're out.`,
              )}
            </p>
            {best && (
              <p className="mb-6 text-sm font-bold text-[#ffc800]">
                {t(
                  `🏅 最佳战绩：${best.weeks} 周 · ${fmtMoney(best.netliq)}（第 ${best.runs} 次尝试）`,
                  `🏅 Best: ${best.weeks} weeks · ${fmtMoney(best.netliq)} (${best.runs} runs)`,
                )}
              </p>
            )}
            <button
              onClick={startRun}
              className="w-full max-w-sm rounded-2xl border-b-4 border-[#46a302] bg-[#58cc02] py-4 text-lg font-extrabold uppercase tracking-wide text-white transition hover:bg-[#61d904] active:translate-y-0.5 active:border-b-2"
            >
              {t('开始游戏', 'Start Run')}
            </button>
          </div>
        )}

        {(phase === 'pick' || phase === 'result') && (
          <>
            {/* 状态栏 */}
            <div className="mb-3 grid grid-cols-4 gap-2 text-center text-xs font-extrabold">
              <div className="rounded-xl border-2 border-[var(--border)] bg-[var(--card)] py-2">
                📅 {week}/{TOTAL_WEEKS}
              </div>
              <div className="rounded-xl border-2 border-[var(--border)] bg-[var(--card)] py-2 text-[#ffc800]">
                {fmtMoney(netliq)}
              </div>
              <div className="rounded-xl border-2 border-[var(--border)] bg-[var(--card)] py-2 text-[#1cb0f6]">
                ${price.toFixed(0)}
              </div>
              <div className="rounded-xl border-2 border-[var(--border)] bg-[var(--card)] py-2 text-[#ce82ff]">
                IV {iv.toFixed(0)}
              </div>
            </div>

            {/* 资金曲线 */}
            {history.length > 1 && (
              <svg viewBox="0 0 320 48" className="mb-4 w-full rounded-xl border-2 border-[var(--border)] bg-[var(--card)] p-1">
                <path d={spark} fill="none" stroke={netliq >= START_CASH ? '#58cc02' : '#ff4b4b'} strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            )}
          </>
        )}

        {phase === 'pick' && (
          <>
            {/* 下周预告 */}
            <div className="mb-4 rounded-2xl border-2 border-[#1cb0f6] bg-[var(--card)] p-4">
              <p className="text-xs font-extrabold uppercase tracking-wide text-[#1cb0f6]">
                {t('本周预告', 'This week’s forecast')}
              </p>
              <p className="mt-1 text-base font-extrabold">
                {EVENTS[forecast].emoji} {lang === 'en' ? EVENTS[forecast].en : EVENTS[forecast].zh}
              </p>
            </div>

            {/* 策略手牌 */}
            <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {PLAYS.map((p) => {
                const q = playQuote(p);
                const isCredit = q.entry < 0;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPlayId(playId === p.id ? null : p.id)}
                    className={`rounded-2xl border-2 border-b-4 p-3 text-left transition active:translate-y-0.5 active:border-b-2 ${
                      playId === p.id
                        ? 'border-[#1cb0f6] bg-[#ddf4ff] text-[#1899d6]'
                        : 'border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)]'
                    }`}
                  >
                    <p className="text-sm font-extrabold">
                      {p.emoji} {lang === 'en' ? p.en : p.zh}
                    </p>
                    <p className="mt-0.5 text-[10px] font-bold text-[var(--muted-foreground)]">
                      {lang === 'en' ? p.enHint : p.zhHint}
                    </p>
                    <p className="mt-1 text-[10px] font-bold">
                      {isCredit ? t('收', 'Credit') : t('付', 'Debit')} ${Math.abs(q.entry * 100).toFixed(0)} ·{' '}
                      {t('最大亏', 'Max loss')} ${q.maxLoss.toFixed(0)}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* 仓位 */}
            <p className="mb-2 text-xs font-extrabold uppercase tracking-wide text-[var(--muted-foreground)]">
              {t('仓位（最大亏损占资金比例）', 'Size (max loss as % of account)')}
            </p>
            <div className="mb-5 flex gap-2">
              {SIZES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSizeId(s.id)}
                  className={`flex-1 rounded-xl border-2 py-2 text-xs font-extrabold transition ${
                    sizeId === s.id
                      ? s.id === 'yolo'
                        ? 'border-[#ff4b4b] bg-[#ffdfe0] text-[#ea2b2b]'
                        : 'border-[#1cb0f6] bg-[#ddf4ff] text-[#1899d6]'
                      : 'border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)]'
                  }`}
                >
                  {lang === 'en' ? s.en : s.zh}
                </button>
              ))}
            </div>

            <button
              onClick={resolveWeek}
              className={`w-full rounded-2xl border-b-4 py-4 text-lg font-extrabold uppercase tracking-wide text-white transition active:translate-y-0.5 active:border-b-2 ${
                playId
                  ? 'border-[#46a302] bg-[#58cc02] hover:bg-[#61d904]'
                  : 'border-[#8a8a8a] bg-[#a8a8a8] hover:bg-[#b5b5b5]'
              }`}
            >
              {playId ? t('执行本周交易', 'Run the Week') : t('空仓观望一周', 'Sit Out This Week')}
            </button>
          </>
        )}

        {phase === 'result' && resolution && (
          <div className="text-center">
            <div className="my-6 text-6xl" aria-hidden>
              {EVENTS[resolution.event].emoji}
            </div>
            <h2 className="mb-1 text-xl font-extrabold">
              {lang === 'en' ? EVENTS[resolution.event].en : EVENTS[resolution.event].zh}
              {!EVENTS[resolution.event].forecastable && (
                <span className="ml-2 rounded-full bg-[#ff4b4b] px-2 py-0.5 text-xs text-white">
                  {t('黑天鹅！', 'Black swan!')}
                </span>
              )}
            </h2>
            <p className="mb-4 text-sm text-[var(--muted-foreground)]">
              {t('股价', 'Price')} {resolution.ret >= 0 ? '+' : ''}
              {(resolution.ret * 100).toFixed(1)}% · IV → {resolution.ivAfter.toFixed(0)}
            </p>
            <div className="mx-auto mb-4 max-w-sm rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-4">
              <p className="text-sm font-bold">
                {lang === 'en' ? resolution.playEn : resolution.playZh}
                {resolution.contracts > 0 && ` × ${resolution.contracts}`}
              </p>
              <p
                className={`mt-1 text-3xl font-extrabold ${
                  resolution.pl > 0 ? 'text-[#58a700]' : resolution.pl < 0 ? 'text-[#ea2b2b]' : ''
                }`}
              >
                {resolution.pl >= 0 ? '+' : ''}
                {fmtMoney(resolution.pl)}
              </p>
            </div>
            <button
              onClick={nextWeek}
              className="w-full max-w-sm rounded-2xl border-b-4 border-[#1899d6] bg-[#1cb0f6] py-4 text-lg font-extrabold uppercase tracking-wide text-white transition hover:bg-[#2bbcff] active:translate-y-0.5 active:border-b-2"
            >
              {t('进入下一周', 'Next Week')} →
            </button>
          </div>
        )}

        {phase === 'dead' && resolution && (
          <div className="text-center">
            <div className="my-8 text-7xl" aria-hidden>💀</div>
            <h2 className="mb-2 text-2xl font-extrabold text-[#ff4b4b]">
              {t(`第 ${week} 周：爆仓出局`, `Week ${week}: Blown Up`)}
            </h2>
            <p className="mx-auto mb-2 max-w-sm text-sm font-bold text-[var(--muted-foreground)]">
              {lang === 'en' ? deathQuips[resolution.event][1] : deathQuips[resolution.event][0]}
            </p>
            <p className="mb-8 text-xs text-[var(--muted-foreground)]">
              {t('死因', 'Cause')}: {lang === 'en' ? EVENTS[resolution.event].en : EVENTS[resolution.event].zh} ·{' '}
              {lang === 'en' ? resolution.playEn : resolution.playZh} × {resolution.contracts}
            </p>
            <button
              onClick={startRun}
              className="w-full max-w-sm rounded-2xl border-b-4 border-[#d33131] bg-[#ff4b4b] py-4 text-lg font-extrabold uppercase tracking-wide text-white transition hover:bg-[#ff5f5f] active:translate-y-0.5 active:border-b-2"
            >
              {t('再来一局', 'Run It Back')}
            </button>
          </div>
        )}

        {phase === 'won' && (
          <div className="text-center">
            <div className="my-8 text-7xl" aria-hidden>🏆</div>
            <h2 className="mb-2 text-2xl font-extrabold text-[#ffc800]">
              {t('你活过了 52 周！', 'You survived all 52 weeks!')}
            </h2>
            <p className="mb-1 text-3xl font-extrabold">{fmtMoney(netliq)}</p>
            <p className="mb-8 text-lg font-extrabold text-[#ffc800]">{lang === 'en' ? rating(netliq)[1] : rating(netliq)[0]}</p>
            <button
              onClick={startRun}
              className="w-full max-w-sm rounded-2xl border-b-4 border-[#46a302] bg-[#58cc02] py-4 text-lg font-extrabold uppercase tracking-wide text-white transition hover:bg-[#61d904] active:translate-y-0.5 active:border-b-2"
            >
              {t('挑战更高分', 'Beat Your Score')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
