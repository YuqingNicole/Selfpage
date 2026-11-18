'use client';

import type { Unit } from '@/data/optionsCourse';

/**
 * 投资主线的「走势图小路」：关卡沿一条 K 线般起伏的价格线排布。
 * 走过的路段是实线（单元主色 + 光晕），没走的是虚线；背后是淡淡的图表网格。
 * 另附「判断力指数」行情条：每通关一课指数上涨，连续打卡显示为「连涨 N 天」。
 */

/** 每个关卡占的高度（按钮 64px + 标题两行 + 间距） */
export const TRAIL_ROW = 128;
const BUTTON_CENTER = 32;

/** 简单的确定性随机数：同一个 id 每次画出同一条线 */
function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

/** 关卡在横向上的位置（相对中线，px）：像价格一样起伏，相邻两点至少错开 56px */
export function trailOffsets(unit: Unit): number[] {
  const rand = seeded(unit.id);
  const xs: number[] = [];
  let prev = 0;
  unit.lessons.forEach((_, i) => {
    let x = 0;
    for (let tries = 0; tries < 8; tries++) {
      x = Math.round((rand() * 2 - 1) * 76);
      if (i === 0 || Math.abs(x - prev) >= 56) break;
    }
    if (i > 0 && Math.abs(x - prev) < 56) x = prev > 0 ? prev - 64 : prev + 64;
    xs.push(x);
    prev = x;
  });
  return xs;
}

/** 两点之间插入几个抖动点，让连线像一段真实的价格走势 */
function jagged(rand: () => number, x0: number, y0: number, x1: number, y1: number, steps = 7): string {
  const pts: string[] = [];
  for (let j = 0; j <= steps; j++) {
    const t = j / steps;
    const edge = j === 0 || j === steps;
    const x = x0 + (x1 - x0) * t + (edge ? 0 : (rand() * 2 - 1) * 13);
    const y = y0 + (y1 - y0) * t + (edge ? 0 : (rand() * 2 - 1) * 4);
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(' ');
}

/** started：单元第一课已解锁，进场那一段才画成实线 */
export function ChartTrail({ unit, completed, started }: { unit: Unit; completed: string[]; started: boolean }) {
  const xs = trailOffsets(unit);
  const n = unit.lessons.length;
  const height = n * TRAIL_ROW;
  const rand = seeded(`${unit.id}-line`);
  const ys = xs.map((_, i) => i * TRAIL_ROW + BUTTON_CENTER);

  // 路段：进场（从单元横幅下来）→ 关卡之间 → 离场（通往 Boss 或下一单元）
  const segments: { points: string; done: boolean }[] = [];
  segments.push({ points: jagged(rand, 0, -28, xs[0], ys[0], 4), done: started });
  for (let i = 0; i < n - 1; i++) {
    segments.push({ points: jagged(rand, xs[i], ys[i], xs[i + 1], ys[i + 1]), done: completed.includes(unit.lessons[i].id) });
  }
  segments.push({ points: jagged(rand, xs[n - 1], ys[n - 1], 0, height + 8, 5), done: completed.includes(unit.lessons[n - 1].id) });

  return (
    <svg aria-hidden className="pointer-events-none absolute left-1/2 top-0 overflow-visible" width={1} height={height}>
      {/* 图表网格 */}
      {Array.from({ length: Math.floor(height / 32) + 1 }, (_, k) => (
        <line key={k} x1={-150} x2={150} y1={k * 32} y2={k * 32} stroke="var(--border)" strokeWidth={1} strokeDasharray="2 6" opacity={0.7} />
      ))}
      {segments.map((s, k) =>
        s.done ? (
          <g key={k}>
            <polyline points={s.points} fill="none" stroke={unit.color} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" opacity={0.18} />
            <polyline points={s.points} fill="none" stroke={unit.color} strokeWidth={3.5} strokeLinejoin="round" strokeLinecap="round" />
          </g>
        ) : (
          <polyline key={k} points={s.points} fill="none" stroke="var(--muted-foreground)" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" strokeDasharray="3 7" opacity={0.45} />
        ),
      )}
    </svg>
  );
}

/** 判断力指数：1,000 点起步，每通关一课 +30，完美通关再 +10 */
export function judgmentIndex(units: Unit[], completed: string[], perfect: string[], upTo = units.length): number {
  let v = 1000;
  units.slice(0, upTo).forEach((u) =>
    u.lessons.forEach((l) => {
      if (completed.includes(l.id)) v += 30;
      if (perfect.includes(l.id)) v += 10;
    }),
  );
  return v;
}

export function JudgmentTicker({
  units,
  completed,
  perfect,
  streak,
  lang,
}: {
  units: Unit[];
  completed: string[];
  perfect: string[];
  streak: number;
  lang: 'en' | 'zh';
}) {
  const series = [1000, ...units.map((_, i) => judgmentIndex(units, completed, perfect, i + 1))];
  const now = series[series.length - 1];
  const max = 1000 + units.reduce((s, u) => s + u.lessons.length * 40, 0);
  // 走到哪一个单元为止有进展：之后的部分画成虚线
  let last = 0;
  series.forEach((v, i) => {
    if (i > 0 && v > series[i - 1]) last = i;
  });
  const W = 132;
  const H = 40;
  const px = (i: number) => (i / (series.length - 1)) * W;
  const py = (v: number) => H - ((v - 1000) / (max - 1000)) * (H - 4) - 2;
  const solid = series.slice(0, last + 1).map((v, i) => `${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(' ');
  const flat = series.slice(last).map((v, i) => `${px(i + last).toFixed(1)},${py(v).toFixed(1)}`).join(' ');
  const gain = now - 1000;

  return (
    <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] px-4 py-3">
      <div className="min-w-0">
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
          {lang === 'en' ? 'Judgment Index · JDX' : '判断力指数 · JDX'}
        </p>
        <p className="mt-0.5 flex items-baseline gap-2">
          <span className="font-mono text-2xl font-extrabold tabular-nums">{now.toLocaleString('en-US')}</span>
          <span className={`font-mono text-sm font-bold tabular-nums ${gain > 0 ? 'text-[#16a34a]' : 'text-[var(--muted-foreground)]'}`}>
            {gain > 0 ? `▲ +${((gain / 1000) * 100).toFixed(1)}%` : '— 0.0%'}
          </span>
        </p>
        <p className="mt-0.5 text-xs font-bold text-[var(--muted-foreground)]">
          {streak > 0
            ? lang === 'en'
              ? `Up ${streak} day${streak > 1 ? 's' : ''} in a row`
              : `连涨 ${streak} 天`
            : lang === 'en'
              ? 'Finish a lesson to open the market'
              : '完成一课，今日开盘'}
        </p>
      </div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="shrink-0 overflow-visible" aria-hidden>
        {flat && <polyline points={flat} fill="none" stroke="var(--muted-foreground)" strokeWidth={1.5} strokeDasharray="2 4" opacity={0.5} />}
        {last > 0 && <polyline points={solid} fill="none" stroke="#16a34a" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />}
        <circle cx={px(last)} cy={py(series[last])} r={3.5} fill={last > 0 ? '#16a34a' : 'var(--muted-foreground)'} />
      </svg>
    </div>
  );
}
