'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { ValueStep } from '@/data/optionsCourse';
import { legPrice, RISK_FREE } from './blackScholes';

/**
 * 价值拆解：到期前的期权价格 = 内在价值 + 时间价值。
 * - 横轴 spot：价格曲线 vs 内在价值折线（虚线），两线之间的阴影就是时间价值
 * - 横轴 days：固定股价，看价格随剩余天数衰减（时间从左往右流，右端是到期）
 * explore 自由拖动（不计分）；target 揭晓前隐藏价格曲线和读数，提交后揭晓（计分）。
 */

const W = 340;
const H = 180;
const PAD = { l: 8, r: 8, t: 16, b: 26 };
const N = 120;
const TIME_FILL = 'rgba(206,130,255,0.22)';

const isZh = (s: string) => /[一-鿿]/.test(s);
const usd = (v: number) => `$${v.toFixed(2)}`;

export function ValueExplorerView({
  step,
  color,
  locked,
  onAnswer,
  onContinue,
}: {
  step: ValueStep;
  color: string;
  locked: boolean;
  onAnswer: (correct: boolean, explain: string) => void;
  onContinue: () => void;
}) {
  const zh = isZh(step.prompt);
  const { option, strike: K } = step;
  const showSplit = step.showSplit ?? true;
  const ivStart = Math.round(step.iv * 100);
  const [spot, setSpot] = useState(step.spot.start);
  const [days, setDays] = useState(step.days.start);
  const [ivPct, setIvPct] = useState(ivStart);
  const iv = ivPct / 100;
  const [seen, setSeen] = useState({
    spotMin: step.spot.start,
    spotMax: step.spot.start,
    daysMin: step.days.start,
    daysMax: step.days.start,
    ivMin: ivStart,
    ivMax: ivStart,
  });
  const [submitted, setSubmitted] = useState(false);

  const price = (S: number, d: number) => legPrice(option, S, K, d / 365, iv);
  const intrinsic = (S: number) => (option === 'call' ? Math.max(S - K, 0) : Math.max(K - S, 0));

  const isTarget = step.mode === 'target';
  const revealed = !isTarget || locked || submitted || Boolean(step.target?.live);
  const frozen = isTarget && (locked || submitted);

  const value = price(spot, days);
  const intr = intrinsic(spot);
  const timeVal = Math.max(value - intr, 0);
  const moneyness = Math.abs(spot - K) < 1 ? 'atm' : (option === 'call' ? spot > K : spot < K) ? 'itm' : 'otm';
  const moneyLabel = {
    itm: zh ? '实值 ITM' : 'In the money',
    atm: zh ? '平值 ATM' : 'At the money',
    otm: zh ? '虚值 OTM' : 'Out of the money',
  }[moneyness];
  const moneyColor = { itm: '#58a700', atm: '#1899d6', otm: '#ea2b2b' }[moneyness];

  // 图形：横轴为股价或剩余天数
  const chart = useMemo(() => {
    const [x0, x1] = step.xAxis === 'spot' ? step.spot.range : [step.days.range[1], step.days.range[0]];
    const xs = Array.from({ length: N + 1 }, (_, i) => x0 + ((x1 - x0) * i) / N);
    const curveY = xs.map((x) => (step.xAxis === 'spot' ? price(x, days) : price(spot, x)));
    const intrY = xs.map((x) => (step.xAxis === 'spot' ? intrinsic(x) : intrinsic(spot)));
    // 纵轴上限：整条曲线（含到期折线）的最大值，留出头部空间；days 轴固定为开始时的价格，方便看衰减
    const yMax =
      Math.max(
        ...curveY,
        ...intrY,
        step.xAxis === 'days' ? price(spot, step.days.range[1]) : 0,
        0.5,
      ) * 1.15;
    const sx = (x: number) => PAD.l + ((x - x0) / (x1 - x0)) * (W - PAD.l - PAD.r);
    const sy = (y: number) => PAD.t + (1 - y / yMax) * (H - PAD.t - PAD.b);
    const path = (ys: number[]) => xs.map((x, i) => `${i ? 'L' : 'M'}${sx(x).toFixed(1)},${sy(ys[i]).toFixed(1)}`).join(' ');
    const band =
      xs.map((x, i) => `${sx(x).toFixed(1)},${sy(curveY[i]).toFixed(1)}`).join(' ') +
      ' ' +
      [...xs].reverse().map((x, j) => `${sx(x).toFixed(1)},${sy(intrY[N - j]).toFixed(1)}`).join(' ');
    return { sx, sy, curve: path(curveY), intrPath: path(intrY), band };
    // price/intrinsic 只依赖 step 字段与当前 spot/days/iv
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, days, spot, ivPct]);

  const xNow = step.xAxis === 'spot' ? spot : days;
  // 同时显示 Call 和 Put 时，曲线颜色跟着所画的那一种期权走，避免和单元主题色混淆
  const CALL_COLOR = '#1cb0f6';
  const PUT_COLOR = '#ff9600';
  const curveColor = step.compare ? (option === 'call' ? CALL_COLOR : PUT_COLOR) : color;
  const curveLegend = !step.compare
    ? ''
    : zh
      ? `${option === 'call' ? '蓝线' : '橙线'}：$${K} ${option === 'call' ? 'Call' : 'Put'} 价格　`
      : `${option === 'call' ? 'Blue' : 'Orange'}: $${K} ${option} price · `;

  const visit = step.visit;
  const visitDone =
    (!visit?.spot || (seen.spotMin <= visit.spot[0] && seen.spotMax >= visit.spot[1])) &&
    (!visit?.days || (seen.daysMin <= visit.days[0] && seen.daysMax >= visit.days[1])) &&
    (!visit?.iv || (seen.ivMin <= visit.iv[0] && seen.ivMax >= visit.iv[1]));

  function moveSpot(v: number) {
    if (frozen) return;
    setSpot(v);
    setSeen((p) => ({ ...p, spotMin: Math.min(p.spotMin, v), spotMax: Math.max(p.spotMax, v) }));
  }
  function moveDays(v: number) {
    if (frozen) return;
    setDays(v);
    setSeen((p) => ({ ...p, daysMin: Math.min(p.daysMin, v), daysMax: Math.max(p.daysMax, v) }));
  }

  function moveIv(v: number) {
    if (frozen) return;
    setIvPct(v);
    setSeen((p) => ({ ...p, ivMin: Math.min(p.ivMin, v), ivMax: Math.max(p.ivMax, v) }));
  }

  function check() {
    if (submitted || !step.target) return;
    setSubmitted(true);
    const guess = step.target.control === 'spot' ? spot : step.target.control === 'days' ? days : ivPct;
    onAnswer(Math.abs(guess - step.target.answer) <= step.target.tolerance, step.explain);
  }

  const answerX = step.target ? step.target.answer : null;
  const answerOnAxis = step.target && step.target.control === step.xAxis;
  const [dLo, dHi] = step.days.range;

  return (
    <div className="py-8">
      <p className="mb-1 text-sm font-bold text-[var(--muted-foreground)]">
        {isTarget ? (zh ? '拖到你认为的位置' : 'Drag to your answer') : zh ? '动手试试' : 'Try it'}
      </p>
      <h2 className="mb-5 text-xl font-extrabold leading-snug sm:text-2xl">{step.prompt}</h2>

      <div className="rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-3">
        {/* 状态行 */}
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 px-1 text-xs font-bold text-[var(--muted-foreground)]">
          <span>
            {zh ? '股价' : 'Stock'} <span className="text-base font-extrabold text-[var(--foreground)] tabular-nums">${spot}</span>
            <span className="mx-1.5">·</span>
            {zh ? '剩余' : ''} <span className="text-base font-extrabold text-[var(--foreground)] tabular-nums">{days}</span> {zh ? '天' : days === 1 ? 'day left' : 'days left'}
            {step.ivRange && (
              <>
                <span className="mx-1.5">·</span>IV <span className="text-base font-extrabold text-[var(--foreground)] tabular-nums">{ivPct}%</span>
              </>
            )}
          </span>
          <span className="rounded-full border-2 px-2 py-0.5 text-[11px] font-extrabold" style={{ borderColor: moneyColor, color: moneyColor }}>
            ${K} {option === 'call' ? 'Call' : 'Put'} · {moneyLabel}
          </span>
        </div>

        {/* Call 与 Put 并排（定价因素 / 平价） */}
        {step.compare && (
          <div className="mb-1 grid grid-cols-2 gap-2 px-1">
            {(['call', 'put'] as const).map((t) => (
              <div key={t} className="rounded-xl border-2 border-[var(--border)] px-3 py-2">
                <p className="text-[11px] font-extrabold text-[var(--muted-foreground)]">${K} {t === 'call' ? 'Call' : 'Put'}</p>
                <p className="text-xl font-extrabold tabular-nums" style={{ color: t === 'call' ? CALL_COLOR : PUT_COLOR }}>
                  {revealed ? usd(legPrice(t, spot, K, days / 365, iv)) : '?'}
                </p>
              </div>
            ))}
          </div>
        )}
        {step.compare === 'parity' && revealed && (
          <div className="mb-2 rounded-xl bg-[var(--muted)] px-3 py-2 text-center font-mono text-xs font-bold tabular-nums">
            Call − Put = {usd(legPrice('call', spot, K, days / 365, iv) - legPrice('put', spot, K, days / 365, iv))}
            <span className="mx-2 text-[#58a700]">=</span>
            {zh ? '股价 − 行权价现值' : 'stock − PV(strike)'} = {usd(spot - K * Math.exp((-RISK_FREE * days) / 365))}
          </div>
        )}

        {/* 价格与拆分 */}
        <div className={step.compare ? 'hidden' : 'px-1'}>
          <p className="text-xs font-bold text-[var(--muted-foreground)]">
            {zh ? '期权价格' : 'Option price'}{' '}
            <span className="text-xl font-extrabold tabular-nums" style={{ color: revealed ? color : 'var(--muted-foreground)' }}>
              {revealed ? usd(value) : '?'}
            </span>
            {showSplit && (
              <span className="ml-1 tabular-nums">
                = {zh ? '内在' : 'intrinsic'} <span className="font-extrabold text-[var(--foreground)]">{usd(intr)}</span> +{' '}
                {zh ? '时间' : 'time'} <span className="font-extrabold text-[#a568cc]">{revealed ? usd(timeVal) : '?'}</span>
              </span>
            )}
          </p>
          {showSplit && revealed && value > 0.005 && (
            <div className="mt-1.5 flex h-2.5 w-full overflow-hidden rounded-full bg-[var(--muted)]" aria-hidden>
              <div className="h-full bg-[var(--foreground)] opacity-70" style={{ width: `${(intr / value) * 100}%` }} />
              <div className="h-full" style={{ width: `${(timeVal / value) * 100}%`, backgroundColor: '#ce82ff' }} />
            </div>
          )}
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="mt-1 w-full" role="img" aria-label={zh ? '期权价值图' : 'Option value chart'}>
          <line x1={PAD.l} x2={W - PAD.r} y1={chart.sy(0)} y2={chart.sy(0)} stroke="var(--muted-foreground)" strokeOpacity={0.5} />
          {step.xAxis === 'spot' && (
            <g>
              <line x1={chart.sx(K)} x2={chart.sx(K)} y1={PAD.t} y2={H - PAD.b} stroke="var(--border)" strokeDasharray="3 3" />
              <text x={chart.sx(K)} y={H - 8} textAnchor="middle" fontSize={10} fontWeight={700} fill="var(--muted-foreground)">
                {zh ? `行权价 $${K}` : `strike $${K}`}
              </text>
            </g>
          )}
          {step.xAxis === 'days' && (
            <g fontSize={10} fontWeight={700} fill="var(--muted-foreground)">
              <text x={PAD.l} y={H - 8}>{zh ? `剩 ${dHi} 天` : `${dHi} days`}</text>
              <text x={W - PAD.r} y={H - 8} textAnchor="end">{zh ? '到期' : 'expiry'}</text>
            </g>
          )}
          {/* 内在价值（到期价值）折线 */}
          <path d={chart.intrPath} fill="none" stroke="var(--muted-foreground)" strokeWidth={1.5} strokeDasharray="5 4" />
          {revealed && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              {showSplit && <polygon points={chart.band} fill={TIME_FILL} />}
              <path d={chart.curve} fill="none" stroke={curveColor} strokeWidth={3} strokeLinejoin="round" />
            </motion.g>
          )}
          {/* 正确答案（揭晓后） */}
          {revealed && isTarget && answerOnAxis && answerX !== null && (
            <g>
              <line x1={chart.sx(answerX)} x2={chart.sx(answerX)} y1={PAD.t} y2={H - PAD.b} stroke="#58a700" strokeWidth={2} strokeDasharray="5 3" />
              <text x={chart.sx(answerX)} y={PAD.t - 4} textAnchor="middle" fontSize={10} fontWeight={800} fill="#58a700">
                {step.xAxis === 'spot' ? `$${answerX}` : zh ? `${answerX} 天` : `${answerX}d`}
              </text>
            </g>
          )}
          {/* 当前位置 */}
          <line x1={chart.sx(xNow)} x2={chart.sx(xNow)} y1={PAD.t} y2={H - PAD.b} stroke="var(--foreground)" strokeWidth={1.5} />
          {revealed && <circle cx={chart.sx(xNow)} cy={chart.sy(value)} r={6} fill="var(--card)" stroke="var(--foreground)" strokeWidth={2.5} />}
        </svg>
        <p className="px-1 text-[10px] font-bold text-[var(--muted-foreground)]">
          {curveLegend}
          {zh ? '虚线：内在价值（到期时的价值）' : 'Dashed: intrinsic value (worth at expiry)'}
          {showSplit && (zh ? '　紫色：时间价值' : ' · purple: time value')}
        </p>

        {/* 控件 */}
        {!step.spot.fixed && (
          <label className="mt-3 block">
            <span className="text-[11px] font-extrabold text-[var(--muted-foreground)]">{zh ? '拖动股价' : 'Drag the stock price'}</span>
            <input
              type="range"
              min={step.spot.range[0]}
              max={step.spot.range[1]}
              step={1}
              value={spot}
              disabled={frozen}
              onChange={(e) => moveSpot(Number(e.target.value))}
              aria-label={zh ? '股价' : 'Stock price'}
              data-control="spot"
              className="w-full cursor-pointer"
              style={{ accentColor: color }}
            />
          </label>
        )}
        {!step.days.fixed && (
          <label className="mt-3 block">
            <span className="text-[11px] font-extrabold text-[var(--muted-foreground)]">{zh ? '拖动时间（向右 = 离到期更近）' : 'Drag time (right = closer to expiry)'}</span>
            {/* 反向：滑块向右走代表时间流逝、剩余天数减少 */}
            <input
              type="range"
              min={0}
              max={dHi - dLo}
              step={1}
              value={dHi - days}
              disabled={frozen}
              onChange={(e) => moveDays(dHi - Number(e.target.value))}
              aria-label={zh ? '剩余天数' : 'Days to expiry'}
              data-control="days"
              className="w-full cursor-pointer"
              style={{ accentColor: color }}
            />
          </label>
        )}
        {step.ivRange && (
          <label className="mt-3 block">
            <span className="text-[11px] font-extrabold text-[var(--muted-foreground)]">{zh ? '拖动隐含波动率（IV）' : 'Drag implied volatility (IV)'}</span>
            <input
              type="range"
              min={step.ivRange[0]}
              max={step.ivRange[1]}
              step={1}
              value={ivPct}
              disabled={frozen}
              onChange={(e) => moveIv(Number(e.target.value))}
              aria-label={zh ? '隐含波动率' : 'Implied volatility'}
              data-control="iv"
              className="w-full cursor-pointer"
              style={{ accentColor: color }}
            />
          </label>
        )}
      </div>

      {/* 探索任务 */}
      {!isTarget && visit && (
        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs font-bold">
          {visit.spot && (
            <>
              <span className={seen.spotMin <= visit.spot[0] ? 'text-[#58a700]' : 'text-[var(--muted-foreground)]'}>
                {seen.spotMin <= visit.spot[0] ? '✓' : '○'} {zh ? `股价拖到 $${visit.spot[0]} 以下` : `stock below $${visit.spot[0]}`}
              </span>
              <span className={seen.spotMax >= visit.spot[1] ? 'text-[#58a700]' : 'text-[var(--muted-foreground)]'}>
                {seen.spotMax >= visit.spot[1] ? '✓' : '○'} {zh ? `股价拖到 $${visit.spot[1]} 以上` : `stock above $${visit.spot[1]}`}
              </span>
            </>
          )}
          {visit.iv && (
            <>
              <span className={seen.ivMin <= visit.iv[0] ? 'text-[#58a700]' : 'text-[var(--muted-foreground)]'}>
                {seen.ivMin <= visit.iv[0] ? '✓' : '○'} {zh ? `IV 拖到 ${visit.iv[0]}% 以下` : `IV below ${visit.iv[0]}%`}
              </span>
              <span className={seen.ivMax >= visit.iv[1] ? 'text-[#58a700]' : 'text-[var(--muted-foreground)]'}>
                {seen.ivMax >= visit.iv[1] ? '✓' : '○'} {zh ? `IV 拖到 ${visit.iv[1]}% 以上` : `IV above ${visit.iv[1]}%`}
              </span>
            </>
          )}
          {visit.days && (
            <span className={seen.daysMin <= visit.days[0] ? 'text-[#58a700]' : 'text-[var(--muted-foreground)]'}>
              {seen.daysMin <= visit.days[0] ? '✓' : '○'} {zh ? `拖到只剩 ${visit.days[0]} 天以内` : `drag to ${visit.days[0]} days or fewer`}
            </span>
          )}
        </div>
      )}
      {!isTarget && visitDone && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-2xl border-2 border-[#a5ed6e] bg-[#f1ffe6] p-4 text-sm leading-relaxed text-[#3d7a00] dark:bg-[#1f3300] dark:text-[#b8f28a]"
        >
          {step.explain}
        </motion.p>
      )}

      <button
        onClick={isTarget ? check : onContinue}
        disabled={isTarget ? submitted || locked : !visitDone}
        className="mt-6 w-full rounded-2xl border-b-4 py-4 text-lg font-extrabold uppercase tracking-wide text-white transition active:translate-y-0.5 active:border-b-2 disabled:cursor-not-allowed disabled:opacity-40"
        style={{ backgroundColor: color, borderColor: 'rgba(0,0,0,0.2)' }}
      >
        {isTarget ? (zh ? '检查' : 'Check') : zh ? '继续' : 'Continue'}
      </button>
    </div>
  );
}
