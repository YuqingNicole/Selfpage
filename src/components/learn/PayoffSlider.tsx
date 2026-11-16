'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { PayoffSliderStep } from '@/data/optionsCourse';
import { positionExpiryValue } from './blackScholes';

/**
 * 损益图滑块：拖动「到期股价」，看仓位盈亏。
 * - explore：曲线与盈亏实时可见，必须拖到两侧才能继续（不计分）
 * - target：先隐藏曲线和读数让学习者落点猜测，提交后揭晓曲线与正确位置（计分）
 */

const W = 340;
const H = 190;
const PAD = { l: 8, r: 8, t: 14, b: 26 };
const SAMPLES = 120;

const isZh = (s: string) => /[一-鿿]/.test(s);

function money(v: number) {
  const r = Math.round(v);
  if (r === 0) return '$0';
  return `${r > 0 ? '+' : '−'}$${Math.abs(r).toLocaleString('en-US')}`;
}

export function PayoffSliderView({
  step,
  color,
  locked,
  onAnswer,
  onContinue,
}: {
  step: PayoffSliderStep;
  color: string;
  locked: boolean;
  onAnswer: (correct: boolean, explain: string) => void;
  onContinue: () => void;
}) {
  const zh = isZh(step.prompt);
  const shares = step.shares ?? 100;
  const [lo, hi] = step.range;
  const [price, setPrice] = useState(step.start);
  const [visited, setVisited] = useState({ min: step.start, max: step.start });
  const [submitted, setSubmitted] = useState(false);

  const pnl = (s: number) => (positionExpiryValue(step.legs, s) - step.premium) * shares;

  const { sx, sy, curve, posPolys, negPolys, zeroY } = useMemo(() => {
    const xs = Array.from({ length: SAMPLES + 1 }, (_, i) => lo + ((hi - lo) * i) / SAMPLES);
    const ys = xs.map((x) => (positionExpiryValue(step.legs, x) - step.premium) * shares);
    const yMax = Math.max(...ys, 0);
    const yMin = Math.min(...ys, 0);
    const span = yMax - yMin || 1;
    const top = yMax + span * 0.12;
    const bot = yMin - span * 0.12;
    const sxF = (x: number) => PAD.l + ((x - lo) / (hi - lo)) * (W - PAD.l - PAD.r);
    const syF = (y: number) => PAD.t + ((top - y) / (top - bot)) * (H - PAD.t - PAD.b);
    const pts = xs.map((x, i) => [sxF(x), syF(ys[i])] as const);
    const z = syF(0);
    // 按正负拆分填充区域
    const pos: string[] = [];
    const neg: string[] = [];
    let run: (readonly [number, number])[] = [];
    let sign = 0;
    const flush = () => {
      if (run.length > 1 && sign !== 0) {
        const poly = [...run, [run[run.length - 1][0], z], [run[0][0], z]].map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(' ');
        (sign > 0 ? pos : neg).push(poly);
      }
      run = [];
    };
    for (let i = 0; i < pts.length; i++) {
      const sgn = ys[i] > 1e-9 ? 1 : ys[i] < -1e-9 ? -1 : 0;
      if (sgn !== sign && i > 0) {
        // 插值出零点，两段都闭合到零线
        const t = ys[i - 1] / (ys[i - 1] - ys[i] || 1);
        const xc = pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t;
        run.push([xc, z]);
        flush();
        run.push([xc, z]);
      }
      sign = sgn || sign;
      run.push(pts[i]);
    }
    flush();
    return {
      sx: sxF,
      sy: syF,
      curve: pts.map(([a, b], i) => `${i === 0 ? 'M' : 'L'}${a.toFixed(1)},${b.toFixed(1)}`).join(' '),
      posPolys: pos,
      negPolys: neg,
      zeroY: z,
    };
  }, [step, lo, hi, shares]);

  const isTarget = step.mode === 'target';
  const revealed = !isTarget || locked || submitted;
  const value = pnl(price);
  const visitDone = !step.visit || (visited.min <= step.visit[0] && visited.max >= step.visit[1]);
  const strikes = Array.from(new Set(step.legs.filter((l) => l.type !== 'stock').map((l) => l.strike)));

  function move(v: number) {
    if (isTarget && (locked || submitted)) return;
    setPrice(v);
    setVisited((p) => ({ min: Math.min(p.min, v), max: Math.max(p.max, v) }));
  }

  function check() {
    if (submitted) return;
    setSubmitted(true);
    const ok = Math.abs(price - (step.answer ?? 0)) <= (step.tolerance ?? 0);
    onAnswer(ok, step.explain);
  }

  return (
    <div className="py-8">
      <p className="mb-1 text-sm font-bold text-[var(--muted-foreground)]">
        {isTarget ? (zh ? '拖到你认为的位置' : 'Drag to your answer') : zh ? '动手试试' : 'Try it'}
      </p>
      <h2 className="mb-5 text-xl font-extrabold leading-snug sm:text-2xl">{step.prompt}</h2>

      <div className="rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-3">
        {/* 读数 */}
        <div className="mb-1 flex items-baseline justify-between px-1">
          <span className="text-xs font-bold text-[var(--muted-foreground)]">
            {zh ? '到期股价' : 'Price at expiry'} <span className="text-base font-extrabold text-[var(--foreground)] tabular-nums">${price}</span>
          </span>
          <span className="text-xs font-bold text-[var(--muted-foreground)]">
            {zh ? '你的盈亏' : 'Your P/L'}{' '}
            <span
              className="text-xl font-extrabold tabular-nums"
              style={{ color: !revealed ? 'var(--muted-foreground)' : value > 0 ? '#58a700' : value < 0 ? '#ea2b2b' : 'var(--foreground)' }}
            >
              {revealed ? money(value) : '?'}
            </span>
          </span>
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={zh ? '到期损益图' : 'Expiry payoff chart'}>
          {/* 零线 */}
          <line x1={PAD.l} x2={W - PAD.r} y1={zeroY} y2={zeroY} stroke="var(--muted-foreground)" strokeOpacity={0.5} strokeWidth={1} />
          <text x={W - PAD.r} y={zeroY - 4} textAnchor="end" fontSize={9} fill="var(--muted-foreground)">
            {zh ? '不赚不亏' : 'break-even line'}
          </text>
          {/* 行权价刻度 */}
          {strikes.map((k) => (
            <g key={k}>
              <line x1={sx(k)} x2={sx(k)} y1={PAD.t} y2={H - PAD.b} stroke="var(--border)" strokeDasharray="3 3" />
              <text x={sx(k)} y={H - 8} textAnchor="middle" fontSize={10} fontWeight={700} fill="var(--muted-foreground)">
                {zh ? `行权价 $${k}` : `strike $${k}`}
              </text>
            </g>
          ))}
          {revealed && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              {posPolys.map((p, i) => <polygon key={`p${i}`} points={p} fill="rgba(88,204,2,0.2)" />)}
              {negPolys.map((p, i) => <polygon key={`n${i}`} points={p} fill="rgba(255,75,75,0.16)" />)}
              <path d={curve} fill="none" stroke={color} strokeWidth={3} strokeLinejoin="round" />
            </motion.g>
          )}
          {/* 正确答案（揭晓后） */}
          {isTarget && revealed && step.answer !== undefined && (
            <g>
              <line x1={sx(step.answer)} x2={sx(step.answer)} y1={PAD.t} y2={H - PAD.b} stroke="#58a700" strokeWidth={2} strokeDasharray="5 3" />
              <circle cx={sx(step.answer)} cy={sy(pnl(step.answer))} r={5} fill="#58a700" />
              <text x={sx(step.answer)} y={PAD.t - 3} textAnchor="middle" fontSize={10} fontWeight={800} fill="#58a700">
                ${step.answer}
              </text>
            </g>
          )}
          {/* 当前位置 */}
          <line x1={sx(price)} x2={sx(price)} y1={PAD.t} y2={H - PAD.b} stroke="var(--foreground)" strokeWidth={1.5} />
          {revealed && <circle cx={sx(price)} cy={sy(value)} r={6} fill="var(--card)" stroke="var(--foreground)" strokeWidth={2.5} />}
        </svg>

        <input
          type="range"
          min={lo}
          max={hi}
          step={1}
          value={price}
          disabled={isTarget && (locked || submitted)}
          onChange={(e) => move(Number(e.target.value))}
          aria-label={zh ? '到期股价' : 'Price at expiry'}
          className="mt-1 w-full cursor-pointer"
          style={{ accentColor: color }}
        />
        <div className="flex justify-between px-0.5 text-[10px] font-bold text-[var(--muted-foreground)]">
          <span>${lo}</span>
          <span>${hi}</span>
        </div>
      </div>

      {/* 探索任务进度 */}
      {!isTarget && step.visit && (
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
          <span className={visited.min <= step.visit[0] ? 'text-[#58a700]' : 'text-[var(--muted-foreground)]'}>
            {visited.min <= step.visit[0] ? '✓' : '○'} {zh ? `拖到 $${step.visit[0]} 以下` : `drag below $${step.visit[0]}`}
          </span>
          <span className={visited.max >= step.visit[1] ? 'text-[#58a700]' : 'text-[var(--muted-foreground)]'}>
            {visited.max >= step.visit[1] ? '✓' : '○'} {zh ? `拖到 $${step.visit[1]} 以上` : `drag above $${step.visit[1]}`}
          </span>
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
