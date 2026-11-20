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

/** 判断力指数：1,000 点起步，每通关一课 +30，完美通关再 +10，击败一个阶段 Boss 再 +100（bossUnits：已击败 Boss 所在的末尾单元） */
export function judgmentIndex(units: Unit[], completed: string[], perfect: string[], upTo = units.length, bossUnits: string[] = []): number {
  let v = 1000;
  units.slice(0, upTo).forEach((u) => {
    if (bossUnits.includes(u.id)) v += 100;
  });
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
  bossUnits = [],
  bossCount = 0,
}: {
  units: Unit[];
  completed: string[];
  perfect: string[];
  streak: number;
  lang: 'en' | 'zh';
  /** 已击败的 Boss 所在的末尾单元 id */
  bossUnits?: string[];
  /** 这条主线的 Boss 总数（算满分用） */
  bossCount?: number;
}) {
  const series = [1000, ...units.map((_, i) => judgmentIndex(units, completed, perfect, i + 1, bossUnits))];
  const now = series[series.length - 1];
  const max = 1000 + units.reduce((s, u) => s + u.lessons.length * 40, 0) + bossCount * 100;
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

/* ---------- Boss：走势图上的回撤低点 ---------- */

const BOSS_H = 232;
const DIP_X = -96;
const DIP_Y = 104;

/**
 * 每个阶段结尾，走势线向左下探出一个「回撤低点」，Boss 就站在那里。
 * 还没走到：整段虚线；走到了：下探段用 Boss 主色；击败 Boss 后，回升段变成绿色实线并标上「创新高」。
 */
export function ChartBoss({
  boss,
  unlocked,
  won,
  lang,
  onChallenge,
}: {
  boss: { id: string; emoji: string; zh: string; en: string; zhTaunt: string; enTaunt: string; color: string; colorDark: string };
  unlocked: boolean;
  won?: string;
  lang: 'en' | 'zh';
  onChallenge: () => void;
}) {
  const en = lang === 'en';
  const rand = seeded(`${boss.id}-dip`);
  const down = jagged(rand, 0, 0, DIP_X, DIP_Y, 8);
  const up = jagged(rand, DIP_X, DIP_Y, 0, BOSS_H, 8);
  const solid = (points: string, color: string) => (
    <g>
      <polyline points={points} fill="none" stroke={color} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" opacity={0.18} />
      <polyline points={points} fill="none" stroke={color} strokeWidth={3.5} strokeLinejoin="round" strokeLinecap="round" />
    </g>
  );
  const dashed = (points: string) => (
    <polyline points={points} fill="none" stroke="var(--muted-foreground)" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" strokeDasharray="3 7" opacity={0.45} />
  );

  return (
    <div className="relative" style={{ height: BOSS_H }} data-boss={boss.id}>
      <svg aria-hidden className="pointer-events-none absolute left-1/2 top-0 overflow-visible" width={1} height={BOSS_H}>
        {Array.from({ length: Math.floor(BOSS_H / 32) + 1 }, (_, k) => (
          <line key={k} x1={-150} x2={150} y1={k * 32} y2={k * 32} stroke="var(--border)" strokeWidth={1} strokeDasharray="2 6" opacity={0.7} />
        ))}
        {/* 回撤低点的水平参考线 */}
        <line x1={DIP_X - 40} x2={150} y1={DIP_Y} y2={DIP_Y} stroke={unlocked ? boss.color : 'var(--muted-foreground)'} strokeWidth={1} strokeDasharray="4 4" opacity={0.5} />
        {unlocked ? solid(down, boss.color) : dashed(down)}
        {won ? solid(up, '#16a34a') : dashed(up)}
      </svg>

      {/* Boss 站在低点 */}
      <div className="absolute flex flex-col items-center" style={{ top: DIP_Y - 44, left: `calc(50% + ${DIP_X}px)`, transform: 'translateX(-50%)' }}>
        <span className="mb-1 rounded-md px-1.5 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-wider" style={{ color: unlocked ? boss.color : 'var(--muted-foreground)', backgroundColor: 'var(--card)' }}>
          {en ? '📉 Drawdown' : '📉 回撤低点'}
        </span>
        <button
          onClick={() => unlocked && onChallenge()}
          disabled={!unlocked}
          aria-label={`${en ? 'Chapter Boss' : '篇章 Boss'}: ${en ? boss.en : boss.zh}`}
          className={`flex h-[72px] w-[72px] items-center justify-center rounded-full border-b-8 text-3xl transition ${unlocked ? 'cursor-pointer hover:scale-105 active:translate-y-1 active:border-b-4' : 'cursor-not-allowed grayscale'}`}
          style={
            unlocked
              ? { background: `radial-gradient(circle at 30% 25%, ${boss.color}f0, ${boss.colorDark})`, borderColor: boss.colorDark, boxShadow: `0 8px 22px -6px ${boss.color}aa` }
              : { backgroundColor: 'var(--muted)', borderColor: 'var(--border)', opacity: 0.7 }
          }
        >
          {won ? '👑' : boss.emoji}
        </button>
      </div>

      {/* 说明卡 */}
      <div
        className="absolute right-0 rounded-2xl border-2 bg-[var(--card)] px-3 py-2.5"
        style={{ top: DIP_Y - 54, left: 'calc(50% - 28px)', borderColor: unlocked ? boss.color : 'var(--border)' }}
      >
        <p className="text-sm font-extrabold leading-snug">
          {en ? 'Boss: ' : 'Boss：'}
          {en ? boss.en : boss.zh}
        </p>
        <p className="mt-0.5 text-[11px] italic leading-snug text-[var(--muted-foreground)]">「{en ? boss.enTaunt : boss.zhTaunt}」</p>
        {unlocked ? (
          <button
            onClick={onChallenge}
            className="mt-2 rounded-xl border-b-4 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white transition active:translate-y-0.5 active:border-b-2"
            style={{ backgroundColor: boss.color, borderColor: boss.colorDark }}
          >
            ⚔️ {won ? (en ? 'Rematch' : '再战') : en ? 'Challenge' : '挑战'}
          </button>
        ) : (
          <p className="mt-1 text-[10px] font-bold text-[var(--muted-foreground)]">🔒 {en ? 'Finish this stage to challenge' : '修完这一阶段的课程后解锁'}</p>
        )}
      </div>

      {/* 击败后：创新高 */}
      {won && (
        <span
          className="absolute rounded-md bg-[#16a34a] px-1.5 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-wider text-white"
          style={{ top: BOSS_H - 36, left: 'calc(50% + 14px)' }}
        >
          {en ? '📈 New high' : '📈 创新高'}
        </span>
      )}
    </div>
  );
}
