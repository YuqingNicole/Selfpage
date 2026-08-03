'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  positionExpiryValue,
  positionGreeks,
  positionValue,
  type Leg,
} from './blackScholes';

/**
 * 策略实验室：交互式期权沙盘
 * 开仓状态固定（S=100 / IV=30% / 45 天），拖动滑杆模拟市场变化，
 * 实时对比 T+0 曲线与到期损益，并展示组合希腊字母。
 */

interface Strategy {
  id: string;
  zh: string;
  en: string;
  zhDesc: string;
  enDesc: string;
  legs: Leg[];
}

const S0 = 100;
const IV0 = 30;
const DAYS0 = 45;

const STRATEGIES: Strategy[] = [
  {
    id: 'longCall', zh: '买入 Call', en: 'Long Call',
    zhDesc: '强烈看涨。亏损封底权利金，收益上不封顶。',
    enDesc: 'Strongly bullish. Loss capped at premium, unlimited upside.',
    legs: [{ type: 'call', strike: 100, qty: 1 }],
  },
  {
    id: 'longPut', zh: '买入 Put', en: 'Long Put',
    zhDesc: '强烈看跌。亏损封底权利金，越跌越赚。',
    enDesc: 'Strongly bearish. Loss capped at premium, gains grow as price falls.',
    legs: [{ type: 'put', strike: 100, qty: 1 }],
  },
  {
    id: 'shortPut', zh: '卖出 Put（CSP）', en: 'Short Put (CSP)',
    zhDesc: '看不跌。收权利金，跌破行权价开始承压。',
    enDesc: 'Neutral-to-bullish. Collect premium; pressure builds below the strike.',
    legs: [{ type: 'put', strike: 95, qty: -1 }],
  },
  {
    id: 'coveredCall', zh: '备兑开仓', en: 'Covered Call',
    zhDesc: '持股收租。上涨封顶在卖出行权价，下跌仅有权利金缓冲。',
    enDesc: 'Stock + short call: rent income, capped upside, thin downside cushion.',
    legs: [
      { type: 'stock', strike: 0, qty: 1 },
      { type: 'call', strike: 105, qty: -1 },
    ],
  },
  {
    id: 'protectivePut', zh: '保护性 Put', en: 'Protective Put',
    zhDesc: '持股买保险。最大回撤被锁定，上涨扣除保费。',
    enDesc: 'Stock + put insurance: drawdown locked, upside minus the premium.',
    legs: [
      { type: 'stock', strike: 0, qty: 1 },
      { type: 'put', strike: 95, qty: 1 },
    ],
  },
  {
    id: 'bullCallSpread', zh: '牛市看涨价差', en: 'Bull Call Spread',
    zhDesc: '温和看涨。成本与盈亏双向锁定。',
    enDesc: 'Moderately bullish. Cost, max gain and max loss all locked.',
    legs: [
      { type: 'call', strike: 95, qty: 1 },
      { type: 'call', strike: 105, qty: -1 },
    ],
  },
  {
    id: 'straddle', zh: '买入跨式', en: 'Long Straddle',
    zhDesc: '赌大波动不赌方向。谷底是双份权利金。',
    enDesc: 'Bet on movement, not direction. The valley is double premium.',
    legs: [
      { type: 'call', strike: 100, qty: 1 },
      { type: 'put', strike: 100, qty: 1 },
    ],
  },
  {
    id: 'strangle', zh: '买入宽跨式', en: 'Long Strangle',
    zhDesc: '更便宜的跨式，需要更大的波动才盈利。',
    enDesc: 'Cheaper straddle; needs a bigger move to pay off.',
    legs: [
      { type: 'call', strike: 110, qty: 1 },
      { type: 'put', strike: 90, qty: 1 },
    ],
  },
  {
    id: 'ironCondor', zh: '铁鹰', en: 'Iron Condor',
    zhDesc: '赌区间横盘吃时间价值，两翼锁定最大亏损。',
    enDesc: 'Range-bound premium selling with wings capping the max loss.',
    legs: [
      { type: 'put', strike: 85, qty: 1 },
      { type: 'put', strike: 90, qty: -1 },
      { type: 'call', strike: 110, qty: -1 },
      { type: 'call', strike: 115, qty: 1 },
    ],
  },
  {
    id: 'collar', zh: '领口', en: 'Collar',
    zhDesc: '持股上下都设界：卖 Call 的收入支付买 Put 的保费。',
    enDesc: 'Stock boxed in: short call income pays for the protective put.',
    legs: [
      { type: 'stock', strike: 0, qty: 1 },
      { type: 'put', strike: 90, qty: 1 },
      { type: 'call', strike: 110, qty: -1 },
    ],
  },
];

/* ---------- 图表几何 ---------- */

const W = 360;
const H = 250;
const PAD = { l: 12, r: 12, t: 26, b: 32 };
const S_MIN = 60;
const S_MAX = 140;
const N = 120;

const BLUE = '#1cb0f6';
const ORANGE = '#ff9600';
const POS_FILL = 'rgba(88, 204, 2, 0.16)';
const NEG_FILL = 'rgba(255, 75, 75, 0.13)';

export function StrategyLab({ onExit }: { onExit: () => void }) {
  const { lang } = useLanguage();
  const [strategyId, setStrategyId] = useState('longCall');
  const [spot, setSpot] = useState(S0);
  const [iv, setIv] = useState(IV0);
  const [days, setDays] = useState(DAYS0);

  const strategy = STRATEGIES.find((s) => s.id === strategyId)!;
  const legs = strategy.legs;

  /** 开仓成本（每股，正 = 净支出，负 = 净收入），在固定的开仓状态定价 */
  const entryCost = useMemo(() => positionValue(legs, S0, DAYS0 / 365, IV0 / 100), [legs]);

  const T = days / 365;
  const sigma = iv / 100;

  const nowPl = positionValue(legs, spot, T, sigma) - entryCost;
  const greeks = positionGreeks(legs, spot, T, sigma);

  /** 到期损益扫描：盈亏平衡点与最大盈亏（含无限判断） */
  const expiryStats = useMemo(() => {
    const pl = (s: number) => positionExpiryValue(legs, s) - entryCost;
    const breakevens: number[] = [];
    let prev = pl(0.01);
    let maxP = prev;
    let minP = prev;
    for (let s = 1; s <= 300; s += 0.5) {
      const v = pl(s);
      if ((prev <= 0 && v > 0) || (prev >= 0 && v < 0)) {
        const t = Math.abs(prev) / (Math.abs(prev) + Math.abs(v));
        breakevens.push(s - 0.5 + 0.5 * t);
      }
      maxP = Math.max(maxP, v);
      minP = Math.min(minP, v);
      prev = v;
    }
    const slopeRight = pl(300) - pl(299);
    return {
      breakevens,
      maxProfit: slopeRight > 0.001 ? Infinity : maxP,
      maxLoss: minP,
    };
  }, [legs, entryCost]);

  /* ---- 曲线采样 ---- */
  const chart = useMemo(() => {
    const xs: number[] = [];
    const expiry: number[] = [];
    const now: number[] = [];
    for (let i = 0; i <= N; i++) {
      const s = S_MIN + ((S_MAX - S_MIN) * i) / N;
      xs.push(s);
      expiry.push(positionExpiryValue(legs, s) - entryCost);
      now.push(positionValue(legs, s, T, sigma) - entryCost);
    }
    let yMin = Math.min(0, ...expiry, ...now);
    let yMax = Math.max(0, ...expiry, ...now);
    const padY = Math.max((yMax - yMin) * 0.12, 1);
    yMin -= padY;
    yMax += padY;

    const sx = (s: number) => PAD.l + ((s - S_MIN) / (S_MAX - S_MIN)) * (W - PAD.l - PAD.r);
    const sy = (y: number) => PAD.t + ((yMax - y) / (yMax - yMin)) * (H - PAD.t - PAD.b);
    const toPath = (ys: number[]) =>
      ys.map((y, i) => `${i === 0 ? 'M' : 'L'}${sx(xs[i]).toFixed(1)},${sy(y).toFixed(1)}`).join(' ');

    // 到期曲线的红绿分区填充
    const zeroY = sy(0);
    const pos: string[] = [];
    const neg: string[] = [];
    let seg: [number, number][] = [];
    let sign = 0;
    const flush = () => {
      if (seg.length > 1 && sign !== 0) {
        const poly =
          seg.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ') +
          ` ${seg[seg.length - 1][0].toFixed(1)},${zeroY.toFixed(1)} ${seg[0][0].toFixed(1)},${zeroY.toFixed(1)}`;
        (sign > 0 ? pos : neg).push(poly);
      }
      seg = [];
    };
    for (let i = 0; i <= N; i++) {
      const y = expiry[i];
      const s2 = y > 1e-9 ? 1 : y < -1e-9 ? -1 : 0;
      if (i > 0 && s2 !== 0 && sign !== 0 && s2 !== sign) {
        const yPrev = expiry[i - 1];
        const t = Math.abs(yPrev) / (Math.abs(yPrev) + Math.abs(y));
        const xc = sx(xs[i - 1] + (xs[i] - xs[i - 1]) * t);
        seg.push([xc, zeroY]);
        flush();
        seg.push([xc, zeroY]);
      }
      seg.push([sx(xs[i]), sy(y)]);
      if (s2 !== 0) sign = s2;
    }
    flush();

    return { sx, sy, zeroY, expiryPath: toPath(expiry), nowPath: toPath(now), pos, neg };
  }, [legs, entryCost, T, sigma]);

  const fmt = (v: number, d = 2) =>
    v === Infinity ? '∞' : v === -Infinity ? '-∞' : v.toFixed(d);

  const t = (zh: string, en: string) => (lang === 'en' ? en : zh);

  const greekTiles = [
    { label: 'Delta', value: greeks.delta, hint: t('股价 +$1 的影响', 'per $1 move') },
    { label: 'Gamma', value: greeks.gamma, hint: t('Delta 的变化速度', 'delta change rate') },
    { label: 'Theta', value: greeks.theta, hint: t('每天时间损耗', 'per day') },
    { label: 'Vega', value: greeks.vega, hint: t('IV +1% 的影响', 'per 1% IV') },
  ];

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto w-full max-w-2xl px-4 pb-16 pt-5">
        {/* 顶栏 */}
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={onExit}
            aria-label={t('退出实验室', 'Exit lab')}
            className="text-2xl leading-none text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
          >
            ✕
          </button>
          <h1 className="text-xl font-extrabold sm:text-2xl">
            🧪 {t('策略实验室', 'Strategy Lab')}
          </h1>
        </div>
        <p className="mb-4 text-xs leading-relaxed text-[var(--muted-foreground)]">
          {t(
            `开仓状态固定：股价 $${S0}、IV ${IV0}%、剩余 ${DAYS0} 天。拖动滑杆模拟行情变化，观察蓝色 T+0 曲线如何随时间和波动率移动。`,
            `Entry is fixed at $${S0} spot, ${IV0}% IV, ${DAYS0} days out. Drag the sliders to simulate the market and watch the blue T+0 curve drift with time and volatility.`,
          )}
        </p>

        {/* 策略选择 */}
        <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
          {STRATEGIES.map((s) => (
            <button
              key={s.id}
              onClick={() => setStrategyId(s.id)}
              className={`shrink-0 rounded-full border-2 px-4 py-1.5 text-xs font-extrabold transition ${
                s.id === strategyId
                  ? 'border-[#1cb0f6] bg-[#ddf4ff] text-[#1899d6]'
                  : 'border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]'
              }`}
            >
              {lang === 'en' ? s.en : s.zh}
            </button>
          ))}
        </div>
        <p className="mb-4 text-sm font-semibold">{lang === 'en' ? strategy.enDesc : strategy.zhDesc}</p>

        {/* 图表 */}
        <figure className="mb-4 rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-4">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={t('损益图', 'P/L chart')}>
            {chart.pos.map((p, i) => (
              <polygon key={`p${i}`} points={p} fill={POS_FILL} />
            ))}
            {chart.neg.map((p, i) => (
              <polygon key={`n${i}`} points={p} fill={NEG_FILL} />
            ))}
            <line
              x1={PAD.l} y1={chart.zeroY} x2={W - PAD.r} y2={chart.zeroY}
              stroke="var(--muted-foreground)" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.7"
            />
            {/* 当前股价参考线 */}
            <line
              x1={chart.sx(spot)} y1={PAD.t} x2={chart.sx(spot)} y2={H - PAD.b}
              stroke="var(--muted-foreground)" strokeWidth="1" strokeDasharray="3 4" opacity="0.55"
            />
            <text
              x={chart.sx(spot)} y={H - PAD.b + 14} textAnchor="middle"
              fontSize="10" fontWeight="700" fill="var(--muted-foreground)"
            >
              ${spot}
            </text>
            <path d={chart.expiryPath} fill="none" stroke={ORANGE} strokeWidth="3" strokeDasharray="7 6" strokeLinecap="round" />
            <path d={chart.nowPath} fill="none" stroke={BLUE} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* 当前位置圆点 */}
            <circle cx={chart.sx(spot)} cy={chart.sy(nowPl)} r="6" fill={BLUE} stroke="var(--card)" strokeWidth="2" />
            {/* 图例 */}
            <g transform={`translate(${PAD.l + 4}, ${PAD.t - 12})`}>
              <line x1="0" y1="0" x2="18" y2="0" stroke={BLUE} strokeWidth="3.5" />
              <text x="23" y="3.5" fontSize="10.5" fontWeight="700" fill="var(--foreground)">
                {t('当前（T+0）', 'Now (T+0)')}
              </text>
              <line x1="110" y1="0" x2="128" y2="0" stroke={ORANGE} strokeWidth="3" strokeDasharray="6 5" />
              <text x="133" y="3.5" fontSize="10.5" fontWeight="700" fill="var(--foreground)">
                {t('到期', 'At expiry')}
              </text>
            </g>
            <text x={W - PAD.r} y={H - 4} textAnchor="end" fontSize="10" fontWeight="700" fill="var(--muted-foreground)">
              {t('股价 →', 'Stock price →')}
            </text>
            <text x={PAD.l} y={H - 4} fontSize="10" fontWeight="700" fill="var(--muted-foreground)">
              ↑ {t('每股盈亏', 'P/L per share')}
            </text>
          </svg>
        </figure>

        {/* 当前盈亏 + 关键数字 */}
        <div className="mb-4 grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
          <StatTile
            label={t('当前盈亏', 'Current P/L')}
            value={`${nowPl >= 0 ? '+' : ''}$${fmt(nowPl)}`}
            tone={nowPl >= 0 ? 'pos' : 'neg'}
          />
          <StatTile
            label={entryCost >= 0 ? t('开仓成本', 'Net debit') : t('开仓收入', 'Net credit')}
            value={`$${fmt(Math.abs(entryCost))}`}
          />
          <StatTile
            label={t('到期最大盈利', 'Max profit')}
            value={expiryStats.maxProfit === Infinity ? '∞' : `$${fmt(expiryStats.maxProfit)}`}
            tone="pos"
          />
          <StatTile
            label={t('到期最大亏损', 'Max loss')}
            value={`$${fmt(Math.abs(expiryStats.maxLoss))}`}
            tone="neg"
          />
        </div>
        <p className="mb-5 text-center text-xs text-[var(--muted-foreground)]">
          {t('盈亏平衡点', 'Breakeven')}:{' '}
          {expiryStats.breakevens.length
            ? expiryStats.breakevens.map((b) => `$${b.toFixed(1)}`).join(' / ')
            : t('无（单向结构）', 'none')}
          {' · '}
          {t('数值为每股，1 张合约 ×100', 'Per share; ×100 per contract')}
        </p>

        {/* 滑杆 */}
        <div className="mb-5 space-y-4 rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-4">
          <Slider
            label={t('当前股价', 'Spot price')}
            value={spot} min={S_MIN} max={S_MAX} display={`$${spot}`}
            onChange={setSpot} accent={BLUE}
          />
          <Slider
            label={t('隐含波动率', 'Implied vol')}
            value={iv} min={10} max={100} display={`${iv}%`}
            onChange={setIv} accent="#ce82ff"
          />
          <Slider
            label={t('剩余天数', 'Days left')}
            value={days} min={0} max={DAYS0} display={t(`${days} 天`, `${days}d`)}
            onChange={setDays} accent={ORANGE}
          />
          {/* 情景快捷键 */}
          <div className="flex flex-wrap gap-2 pt-1">
            <ScenarioChip label={t('⏩ 过 7 天', '⏩ +7 days')} onClick={() => setDays((d) => Math.max(0, d - 7))} />
            <ScenarioChip label={t('📉 IV −10', '📉 IV −10')} onClick={() => setIv((v) => Math.max(10, v - 10))} />
            <ScenarioChip label={t('📈 IV +10', '📈 IV +10')} onClick={() => setIv((v) => Math.min(100, v + 10))} />
            <ScenarioChip
              label={t('🔄 重置', '🔄 Reset')}
              onClick={() => {
                setSpot(S0);
                setIv(IV0);
                setDays(DAYS0);
              }}
            />
          </div>
        </div>

        {/* 希腊字母 */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {greekTiles.map((g) => (
            <div key={g.label} className="rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-3 text-center">
              <p className="text-xs font-extrabold uppercase tracking-wide text-[var(--muted-foreground)]">{g.label}</p>
              <p
                className={`my-1 text-xl font-extrabold ${
                  Math.abs(g.value) < 0.0005 ? '' : g.value > 0 ? 'text-[#58a700]' : 'text-[#ea2b2b]'
                }`}
              >
                {g.value > 0 ? '+' : ''}
                {g.value.toFixed(3)}
              </p>
              <p className="text-[10px] text-[var(--muted-foreground)]">{g.hint}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-[var(--muted-foreground)]">
          {t(
            '理论模型（Black-Scholes，r=4%）仅用于教学演示，真实市场存在价差、偏度与提前指派等因素。',
            'Black-Scholes (r=4%) for teaching only; real markets add spreads, skew and early assignment.',
          )}
        </p>
      </div>
    </div>
  );
}

function StatTile({ label, value, tone }: { label: string; value: string; tone?: 'pos' | 'neg' }) {
  return (
    <div className="rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-3">
      <p className="text-[10px] font-extrabold uppercase tracking-wide text-[var(--muted-foreground)]">{label}</p>
      <p
        className={`mt-1 text-lg font-extrabold ${
          tone === 'pos' ? 'text-[#58a700]' : tone === 'neg' ? 'text-[#ea2b2b]' : ''
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  display,
  accent,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  display: string;
  accent: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm font-bold">
        <span>{label}</span>
        <span style={{ color: accent }}>{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[var(--muted)]"
        style={{ accentColor: accent }}
      />
    </div>
  );
}

function ScenarioChip({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border-2 border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs font-extrabold text-[var(--muted-foreground)] transition hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
    >
      {label}
    </button>
  );
}
