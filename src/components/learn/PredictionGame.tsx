'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { sfx } from './sounds';

/**
 * 「你能预测市场吗」小游戏：
 * 看 40 根模拟走势，猜后 10 根的方向，共 10 轮。
 * 大多数人 ≈50% —— 用亲身体验讲清「预测无用，机制取胜」。
 */

const VISIBLE = 40;
const HIDDEN = 10;
const ROUNDS = 10;

function genPath(): number[] {
  const pts = [100];
  for (let i = 1; i < VISIBLE + HIDDEN; i++) {
    pts.push(pts[i - 1] * (1 + (Math.random() - 0.5) * 0.03));
  }
  return pts;
}

function pathD(pts: number[], upto: number, w: number, h: number): string {
  const slice = pts.slice(0, upto);
  const min = Math.min(...pts);
  const max = Math.max(...pts);
  const span = Math.max(max - min, 0.01);
  return slice
    .map((v, i) => {
      const x = (i / (pts.length - 1)) * w;
      const y = h - ((v - min) / span) * (h - 8) - 4;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

type Phase = 'guess' | 'reveal' | 'done';

export function PredictionGame({ onExit }: { onExit: () => void }) {
  const { lang } = useLanguage();
  const t = (zh: string, en: string) => (lang === 'en' ? en : zh);

  const [round, setRound] = useState(1);
  const [path, setPath] = useState<number[]>(() => genPath());
  const [phase, setPhase] = useState<Phase>('guess');
  const [hits, setHits] = useState(0);
  const [lastGuessRight, setLastGuessRight] = useState(false);

  const wentUp = path[path.length - 1] > path[VISIBLE - 1];

  function guess(up: boolean) {
    const right = up === wentUp;
    setLastGuessRight(right);
    if (right) {
      setHits((n) => n + 1);
      sfx.coin();
    } else {
      sfx.wrong();
    }
    setPhase('reveal');
  }

  function next() {
    if (round >= ROUNDS) {
      sfx.complete();
      setPhase('done');
    } else {
      setRound((r) => r + 1);
      setPath(genPath());
      setPhase('guess');
    }
  }

  const finalRate = Math.round((hits / ROUNDS) * 100);
  const verdict: [string, string] =
    finalRate <= 40
      ? ['比抛硬币还差——好消息是：连硬币都赢不了的市场，谁也预测不了。', 'Worse than a coin flip — good news: a market even coins can’t beat is nobody’s to predict.']
      : finalRate <= 60
        ? ['和抛硬币打平。这不是你的问题——随机游走本来就是这样。所以职业交易员不猜方向，只管概率、权利金和仓位。', 'Dead even with a coin flip. That’s not on you — random walks are like that. This is why pros trade probability, premium and size instead of direction.']
        : ['运气不错！但在把身家押上去之前，把这个游戏再玩 100 轮试试——大数定律会把你拉回 50%。', 'Nice run! Before betting the house, play 100 more rounds — the law of large numbers will drag you back to 50%.'];

  const chart = useMemo(() => {
    const w = 340;
    const h = 160;
    return {
      w,
      h,
      visible: pathD(path, VISIBLE, w, h),
      full: pathD(path, VISIBLE + HIDDEN, w, h),
      splitX: ((VISIBLE - 1) / (path.length - 1)) * w,
    };
  }, [path]);

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto w-full max-w-2xl px-4 pb-16 pt-5">
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={onExit}
            aria-label={t('退出小游戏', 'Exit mini-game')}
            className="text-2xl leading-none text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            ✕
          </button>
          <h1 className="text-xl font-extrabold">🎲 {t('你能预测市场吗？', 'Can You Predict the Market?')}</h1>
        </div>

        {phase !== 'done' && (
          <>
            <div className="mb-3 flex items-center justify-between text-sm font-extrabold">
              <span>
                {t('第', 'Round')} {round}/{ROUNDS} {t('轮', '')}
              </span>
              <span className="text-[#ffc800]">
                {t('命中', 'Hits')} {hits}
              </span>
            </div>

            <figure className="mb-4 rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-3">
              <svg viewBox={`0 0 ${chart.w} ${chart.h}`} className="w-full" role="img" aria-label={t('模拟走势图', 'Simulated price chart')}>
                <line
                  x1={chart.splitX} y1={0} x2={chart.splitX} y2={chart.h}
                  stroke="var(--muted-foreground)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"
                />
                <path d={chart.visible} fill="none" stroke="#1cb0f6" strokeWidth="2.5" strokeLinecap="round" />
                {phase === 'reveal' && (
                  <path
                    d={chart.full} fill="none" stroke={wentUp ? '#58cc02' : '#ff4b4b'}
                    strokeWidth="2.5" strokeLinecap="round" opacity="0.9"
                  />
                )}
                <text x={chart.splitX + 4} y={12} fontSize="10" fontWeight="700" fill="var(--muted-foreground)">
                  {phase === 'guess' ? t('接下来呢？', 'What next?') : wentUp ? t('涨了', 'Up it went') : t('跌了', 'Down it went')}
                </text>
              </svg>
            </figure>

            {phase === 'guess' ? (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => guess(true)}
                  className="rounded-2xl border-b-4 border-[#46a302] bg-[#58cc02] py-4 text-lg font-extrabold uppercase text-white transition hover:bg-[#61d904] active:translate-y-0.5 active:border-b-2"
                >
                  📈 {t('会涨', 'Up')}
                </button>
                <button
                  onClick={() => guess(false)}
                  className="rounded-2xl border-b-4 border-[#d33131] bg-[#ff4b4b] py-4 text-lg font-extrabold uppercase text-white transition hover:bg-[#ff5f5f] active:translate-y-0.5 active:border-b-2"
                >
                  📉 {t('会跌', 'Down')}
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className={`mb-4 text-xl font-extrabold ${lastGuessRight ? 'text-[#58a700]' : 'text-[#ea2b2b]'}`}>
                  {lastGuessRight ? t('猜对了！', 'Called it!') : t('猜错了', 'Missed it')}
                </p>
                <button
                  onClick={next}
                  className="w-full max-w-sm rounded-2xl border-b-4 border-[#1899d6] bg-[#1cb0f6] py-3.5 text-base font-extrabold uppercase tracking-wide text-white transition hover:bg-[#2bbcff] active:translate-y-0.5 active:border-b-2"
                >
                  {round >= ROUNDS ? t('看结果', 'See Results') : t('下一轮', 'Next Round')} →
                </button>
              </div>
            )}
          </>
        )}

        {phase === 'done' && (
          <div className="text-center">
            <div className="my-8 text-7xl" aria-hidden>🪙</div>
            <h2 className="mb-1 text-3xl font-extrabold">
              {hits}/{ROUNDS}
            </h2>
            <p className="mb-4 text-lg font-extrabold text-[#1cb0f6]">
              {t(`命中率 ${finalRate}%`, `${finalRate}% hit rate`)}
            </p>
            <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-[var(--muted-foreground)]">
              {lang === 'en' ? verdict[1] : verdict[0]}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => {
                  setRound(1);
                  setHits(0);
                  setPath(genPath());
                  setPhase('guess');
                }}
                className="rounded-2xl border-b-4 border-[#1899d6] bg-[#1cb0f6] px-8 py-3.5 text-base font-extrabold uppercase tracking-wide text-white transition hover:bg-[#2bbcff] active:translate-y-0.5 active:border-b-2"
              >
                {t('再玩一次', 'Play Again')}
              </button>
              <button
                onClick={onExit}
                className="rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] px-8 py-3.5 text-base font-extrabold uppercase tracking-wide text-[var(--muted-foreground)] transition hover:bg-[var(--muted)]"
              >
                {t('去学机制', 'Go Learn Mechanics')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
