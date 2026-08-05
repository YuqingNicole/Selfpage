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

/** 每轮揭晓后的教学点评：对错都值得说道说道 */
const INSIGHTS: [string, string][] = [
  [
    '这段走势是纯随机数生成的——没有趋势、没有支撑位。但你多半已经从里面「看出了形态」，这叫模式幻觉：人脑对噪声也要强行讲故事。',
    'This chart is pure random numbers — no trend, no support levels. Yet you probably "saw a pattern." That is pareidolia: the brain insists on stories, even in noise.',
  ],
  [
    '猜对了别急着自信：随机猜连对 3 次的概率有 12.5%，赌场每天都在批发这种「手感」。猜错了也一样——都只是硬币的一面。',
    'Right or wrong, hold the confidence: random guessing runs 3-in-a-row 12.5% of the time. Casinos wholesale that "hot hand" feeling daily.',
  ],
  [
    '「跌了这么久，该反弹了吧」——这是赌徒谬误。随机游走没有记忆，前 40 根 K 线对后 10 根没有任何约束力。',
    '"It has fallen so long, it must bounce" — the gambler\'s fallacy. Random walks have no memory; the first 40 bars place zero constraint on the next 10.',
  ],
  [
    '双底、旗形、头肩顶……这些「技术形态」在纯随机数据里出现得同样频繁。能画出来，不等于能预测。',
    'Double bottoms, flags, head-and-shoulders — all appear just as often in pure random data. Drawable is not the same as predictive.',
  ],
  [
    '注意你此刻的情绪：连对时想加注，连错时想翻本。市场不知道你的历史战绩，但你的仓位会替情绪买单。',
    'Notice your emotions right now: winning streaks whisper "bet bigger," losing streaks scream "win it back." The market ignores your record; your position size pays for your feelings.',
  ],
  [
    '职业交易员的解法不是「猜得更准」，而是：猜错时亏得少、猜对时赚得多（盈亏比），或者干脆不猜方向（卖权利金收租）。',
    'The professional fix is not "guess better." It is: lose little when wrong, win big when right (payoff ratio) — or skip direction entirely and sell premium.',
  ],
  [
    '如果有人给你看他连续 10 次全对的记录——记住 1024 个抛硬币的人里必有一个十连对，而那个人现在多半开了付费群。',
    'If someone shows you a 10-for-10 record: among 1,024 coin-flippers, one always goes 10-for-10 — and that one usually starts a paid signals group.',
  ],
  [
    '市场短期是投票机，投票结果接近抛硬币；长期真正复利的是概率、仓位和纪律——这正是本课程反复讲的机制。',
    'Short term the market is a voting machine that votes like a coin. What compounds long term is probability, sizing and discipline — the mechanics this course keeps repeating.',
  ],
  [
    '期权市场早就承认了「猜不准」：隐含波动率本质上就是市场为不可预测性标出的价格。定价模型的核心假设恰恰是——方向随机。',
    'Options markets already concede unpredictability: implied volatility is literally the price tag on it. The pricing model\'s core assumption is that direction is random.',
  ],
  [
    '最后一轮：不管你的命中率是多少，10 次的样本量什么也证明不了——这也正是「trade small, trade often」的数学理由。',
    'Final round: whatever your hit rate, a sample of 10 proves nothing — which is exactly the math behind "trade small, trade often."',
  ],
];

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
                <p className={`mb-1 text-xl font-extrabold ${lastGuessRight ? 'text-[#58a700]' : 'text-[#ea2b2b]'}`}>
                  {lastGuessRight ? t('猜对了！', 'Called it!') : t('猜错了', 'Missed it')}
                </p>
                <p className="mb-3 text-sm font-bold text-[var(--muted-foreground)]">
                  {t('后 10 根实际走了', 'The hidden 10 bars moved')}{' '}
                  <span className={wentUp ? 'text-[#58a700]' : 'text-[#ea2b2b]'}>
                    {wentUp ? '+' : ''}
                    {(((path[path.length - 1] - path[VISIBLE - 1]) / path[VISIBLE - 1]) * 100).toFixed(1)}%
                  </span>
                </p>
                <div className="mx-auto mb-4 max-w-md rounded-2xl border-2 border-[#ffc800] bg-[#fff7e0] p-4 text-left dark:bg-[#3a3000]">
                  <p className="mb-1 text-xs font-extrabold uppercase tracking-wide text-[#b58900]">
                    💡 {t('本轮冷知识', 'Round insight')} {round}/{ROUNDS}
                  </p>
                  <p className="text-sm leading-relaxed text-[#7a5c00] dark:text-[#ffe58a]">
                    {lang === 'en' ? INSIGHTS[round - 1][1] : INSIGHTS[round - 1][0]}
                  </p>
                </div>
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
