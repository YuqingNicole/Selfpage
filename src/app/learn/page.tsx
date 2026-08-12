import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '投资学园 — 从判断到期权与套利',
  description:
    '一个由判断框架、期权交易和套利机制组成的互动投资学习系统。选择你的学习路径，像闯关一样建立自己的投资能力。',
};

const tracks = [
  {
    href: '/learn/investing',
    emoji: '🧭',
    eyebrow: 'CORE PATH',
    title: '投资学园',
    subtitle: '先建立判断，再谈交易',
    description: '从市场语言、公司研究到仓位与证伪。用每日一案和 Memo 工作台，把观点练成可复盘的判断。',
    meta: '判断框架 · 每日一案 · Memo',
    color: '#ff9600',
    dark: '#cc7800',
    glow: 'rgba(255, 150, 0, 0.22)',
  },
  {
    href: '/learn/options',
    emoji: '🦉',
    eyebrow: 'DERIVATIVES',
    title: '期权篇',
    subtitle: '把方向、时间与波动拆开看',
    description: '从基础定价与 Greeks，到波动率、价差策略和机制交易；配套策略实验室与交易生存挑战。',
    meta: '24 单元 · 策略实验室 · 生存挑战',
    color: '#1cb0f6',
    dark: '#1899d6',
    glow: 'rgba(28, 176, 246, 0.22)',
  },
  {
    href: '/learn/arbitrage',
    emoji: '⚡',
    eyebrow: 'MARKET MECHANICS',
    title: '套利篇',
    subtitle: '寻找可执行的价格关系',
    description: '理解 AMM、滑点、资金费、MEV 与跨市场价差。不是找价差，而是构造能闭环的执行路径。',
    meta: '5 单元 · 套利工坊 · 真实案例',
    color: '#627eea',
    dark: '#4c63bb',
    glow: 'rgba(98, 126, 234, 0.24)',
  },
] as const;

export default function LearnHubPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-5 pb-20 pt-28 text-[var(--foreground)] sm:px-8">
      <section className="mx-auto max-w-6xl">
        <p className="mb-3 text-center text-xs font-extrabold tracking-[0.24em] text-[#ff9600]">INVESTING ACADEMY</p>
        <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">投资不是选答案，<br className="sm:hidden" /> 是建立判断系统。</h1>
        <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
          三条路径共用经验值、连胜与错题本。先从你此刻最缺的一块开始；悬停查看课程，再进入学习。
        </p>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {tracks.map((track, index) => (
            <Link
              key={track.href}
              href={track.href}
              className="group relative isolate min-h-[360px] overflow-hidden rounded-[2rem] border-2 bg-[var(--card)] p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl focus-visible:-translate-y-2 focus-visible:outline-none sm:min-h-[400px]"
              style={{ borderColor: `${track.color}55` }}
            >
              <div
                className="absolute -right-16 -top-16 h-52 w-52 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150"
                style={{ backgroundColor: track.glow }}
              />
              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between">
                  <span className="text-5xl transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-6">{track.emoji}</span>
                  <span className="rounded-full border px-3 py-1 text-[10px] font-extrabold tracking-wider" style={{ borderColor: `${track.color}88`, color: track.color }}>
                    0{index + 1} · {track.eyebrow}
                  </span>
                </div>
                <div className="mt-auto">
                  <p className="text-sm font-bold" style={{ color: track.color }}>{track.subtitle}</p>
                  <h2 className="mt-1 text-3xl font-extrabold">{track.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--muted-foreground)]">{track.description}</p>
                  <div className="mt-6 flex items-center justify-between border-t pt-4 text-xs font-bold text-[var(--muted-foreground)]" style={{ borderColor: `${track.color}33` }}>
                    <span>{track.meta}</span>
                    <span className="text-base font-extrabold transition-transform duration-300 group-hover:translate-x-1" style={{ color: track.color }}>进入 →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
