'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { ChoiceExercise, Exercise, FillExercise, TrueFalseExercise, Unit } from '@/data/optionsCourse';
import { useLanguage } from '@/contexts/LanguageContext';
import { awardBadge } from './badges';
import { sfx } from './sounds';

/**
 * 篇章 Boss 战：限时答题，答对砍 Boss 一刀，答错/超时被反击。
 * 题目从该篇章所有课程的题库里随机抽取（不含配对题）。
 */

export interface BossDef {
  id: string;
  emoji: string;
  zh: string;
  en: string;
  zhTaunt: string;
  enTaunt: string;
  /** 该篇章包含的单元 id */
  unitIds: string[];
  color: string;
  colorDark: string;
}

export const BOSSES: BossDef[] = [
  {
    id: 'boss_basics', emoji: '⏳', zh: 'Theta 收割者', en: 'Theta Reaper',
    zhTaunt: '你的时间价值，每天都归我。', enTaunt: 'Your time value belongs to me — every single day.',
    unitIds: ['u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7', 'u8'],
    color: '#58cc02', colorDark: '#46a302',
  },
  {
    id: 'boss_advanced', emoji: '🐉', zh: '波动率巨龙', en: 'Volatility Dragon',
    zhTaunt: '我打个喷嚏，你的 Vega 就得住院。', enTaunt: 'One sneeze from me and your vega is hospitalized.',
    unitIds: ['u9', 'u10', 'u11', 'u12'],
    color: '#ce82ff', colorDark: '#a568cc',
  },
  {
    id: 'boss_mech', emoji: '☠️', zh: 'Margin Call 死神', en: 'Margin Call Reaper',
    zhTaunt: '雨最大的时候，我来收伞。', enTaunt: 'I collect umbrellas precisely when the rain is heaviest.',
    unitIds: ['u13', 'u14'],
    color: '#2b70c9', colorDark: '#1f57a0',
  },
  {
    id: 'boss_deriv', emoji: '🚂', zh: '展期吞噬者', en: 'Roll Devourer',
    zhTaunt: '你每个月搬一次家，房租全都交给我。', enTaunt: "You move house every month, and every month's rent lands in my pocket.",
    unitIds: ['u20', 'u21'],
    color: '#c2410c', colorDark: '#9a3412',
  },
  {
    id: 'boss_chain', emoji: '👻', zh: 'MEV 幽灵', en: 'MEV Phantom',
    zhTaunt: '你的交易还没上链，我已经吃完了午餐。', enTaunt: 'I finished lunch before your transaction even confirmed.',
    unitIds: ['u15', 'u16', 'u17', 'u18', 'u19'],
    color: '#627eea', colorDark: '#4c63bb',
  },
  {
    id: 'boss_market', emoji: '🎩', zh: '市场先生', en: 'Mr. Market',
    zhTaunt: '我每天上门报价，只为试探你的情绪——你敢按自己的判断出价吗？',
    enTaunt: 'I knock daily with a new quote, only to test your nerves — dare you price by your own judgment?',
    unitIds: ['i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7', 'i8', 'i9', 'i10', 'i11', 'i12', 'i13', 'i14', 'i15', 'i16'],
    color: '#f59f00', colorDark: '#c47f00',
  },
];

const BOSS_HP = 10;
const PLAYER_HP = 3;
const SECONDS_PER_QUESTION = 20;

export const BOSS_WINS_KEY = 'options-boss-wins-v1';

export function loadBossWins(): Record<string, string> {
  try {
    const raw = localStorage.getItem(BOSS_WINS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function shuffleInPlace<T>(a: T[]): T[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Gradeable = ChoiceExercise | TrueFalseExercise | FillExercise;

interface BossBattleProps {
  boss: BossDef;
  course: Unit[];
  onExit: () => void;
}

type Phase = 'intro' | 'question' | 'feedback' | 'victory' | 'defeat';

export function BossBattle({ boss, course, onExit }: BossBattleProps) {
  const { lang } = useLanguage();
  const t = (zh: string, en: string) => (lang === 'en' ? en : zh);

  const pool = useMemo(() => {
    const all: Gradeable[] = [];
    for (const unit of course) {
      if (!boss.unitIds.includes(unit.id)) continue;
      for (const lesson of unit.lessons) {
        for (const ex of lesson.exercises) {
          if (ex.type !== 'match') all.push(ex as Gradeable);
        }
      }
    }
    return shuffleInPlace(all);
  }, [boss, course]);

  const [phase, setPhase] = useState<Phase>('intro');
  const [qIndex, setQIndex] = useState(0);
  const [bossHp, setBossHp] = useState(BOSS_HP);
  const [playerHp, setPlayerHp] = useState(PLAYER_HP);
  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_QUESTION);
  const [feedback, setFeedback] = useState<{ correct: boolean; explain: string } | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const current = pool[qIndex % pool.length];

  useEffect(() => {
    if (phase !== 'question') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    setTimeLeft(SECONDS_PER_QUESTION);
    timerRef.current = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          handleResult(false, lang === 'en' ? 'Time ran out — the boss strikes!' : '超时了——Boss 抓住机会反击！');
          return SECONDS_PER_QUESTION;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, qIndex]);

  function handleResult(correct: boolean, explain: string) {
    if (timerRef.current) clearInterval(timerRef.current);
    setFeedback({ correct, explain });
    setPhase('feedback');
    if (correct) {
      sfx.correct(BOSS_HP - bossHp);
      const hp = bossHp - 1;
      setBossHp(hp);
      if (hp <= 0) {
        try {
          const wins = loadBossWins();
          wins[boss.id] = new Date().toISOString().slice(0, 10);
          localStorage.setItem(BOSS_WINS_KEY, JSON.stringify(wins));
        } catch {
          /* ignore */
        }
        awardBadge('boss_slayer');
        sfx.perfect();
        setPhase('victory');
      }
    } else {
      sfx.crash();
      const hp = playerHp - 1;
      setPlayerHp(hp);
      if (hp <= 0) setPhase('defeat');
    }
  }

  function next() {
    setFeedback(null);
    setQIndex((i) => i + 1);
    setPhase('question');
  }

  const hpBar = (hp: number, max: number, color: string) => (
    <div className="h-3 flex-1 overflow-hidden rounded-full bg-[var(--muted)]">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${(hp / max) * 100}%`, backgroundColor: color }}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto w-full max-w-2xl px-4 pb-40 pt-5">
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={onExit}
            aria-label={t('退出 Boss 战', 'Exit boss battle')}
            className="text-2xl leading-none text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            ✕
          </button>
          <h1 className="text-xl font-extrabold">
            {boss.emoji} {lang === 'en' ? boss.en : boss.zh}
          </h1>
        </div>

        {phase === 'intro' && (
          <div className="text-center">
            <div className="my-8 text-8xl" aria-hidden>{boss.emoji}</div>
            <h2 className="mb-2 text-2xl font-extrabold" style={{ color: boss.color }}>
              {lang === 'en' ? boss.en : boss.zh}
            </h2>
            <p className="mb-6 text-sm italic text-[var(--muted-foreground)]">
              「{lang === 'en' ? boss.enTaunt : boss.zhTaunt}」
            </p>
            <p className="mx-auto mb-8 max-w-sm text-sm leading-relaxed text-[var(--muted-foreground)]">
              {t(
                `Boss 有 ${BOSS_HP} 点血，你有 ${PLAYER_HP} 颗心。每题限时 ${SECONDS_PER_QUESTION} 秒：答对砍一刀，答错或超时被反击。题目从整个篇章随机抽取。`,
                `The boss has ${BOSS_HP} HP; you have ${PLAYER_HP} hearts. ${SECONDS_PER_QUESTION}s per question: correct answers strike the boss, wrong or slow ones strike you. Questions come from the whole chapter.`,
              )}
            </p>
            <button
              onClick={() => setPhase('question')}
              className="w-full max-w-sm rounded-2xl border-b-4 py-4 text-lg font-extrabold uppercase tracking-wide text-white transition active:translate-y-0.5 active:border-b-2"
              style={{ backgroundColor: boss.color, borderColor: boss.colorDark }}
            >
              ⚔️ {t('开战', 'Fight')}
            </button>
          </div>
        )}

        {(phase === 'question' || phase === 'feedback') && current && (
          <>
            {/* 战斗状态 */}
            <div className="mb-2 flex items-center gap-3">
              <span className="text-2xl" aria-hidden>{boss.emoji}</span>
              {hpBar(bossHp, BOSS_HP, boss.color)}
              <span className="w-12 text-right text-sm font-extrabold">{bossHp}/{BOSS_HP}</span>
            </div>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-2xl" aria-hidden>🧑‍🎓</span>
              {hpBar(playerHp, PLAYER_HP, '#ff4b4b')}
              <span className="w-12 text-right text-sm font-extrabold text-[#ff4b4b]">
                {'❤️'.repeat(playerHp) || '💀'}
              </span>
            </div>
            {/* 倒计时 */}
            <div className="mb-4 flex items-center gap-2">
              <span aria-hidden>⏱️</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--muted)]">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${(timeLeft / SECONDS_PER_QUESTION) * 100}%`,
                    backgroundColor: timeLeft <= 5 ? '#ff4b4b' : '#ffc800',
                  }}
                />
              </div>
              <span className={`w-8 text-right text-sm font-extrabold ${timeLeft <= 5 ? 'text-[#ff4b4b]' : ''}`}>
                {phase === 'question' ? timeLeft : '–'}
              </span>
            </div>

            <BossExercise
              key={qIndex}
              exercise={current}
              locked={phase === 'feedback'}
              onAnswer={handleResult}
            />
          </>
        )}

        {phase === 'victory' && (
          <div className="text-center">
            <div className="my-8 text-8xl" aria-hidden>👑</div>
            <h2 className="mb-2 text-2xl font-extrabold" style={{ color: boss.color }}>
              {t('Boss 被击败！', 'Boss defeated!')}
            </h2>
            <p className="mb-8 text-sm text-[var(--muted-foreground)]">
              {t(
                `${lang === 'en' ? boss.en : boss.zh} 倒下了。「⚔️ 屠龙者」徽章已入册。`,
                `${boss.en} has fallen. The Boss Slayer badge is yours.`,
              )}
            </p>
            <button
              onClick={onExit}
              className="w-full max-w-sm rounded-2xl border-b-4 border-[#46a302] bg-[#58cc02] py-4 text-lg font-extrabold uppercase tracking-wide text-white transition hover:bg-[#61d904] active:translate-y-0.5 active:border-b-2"
            >
              {t('凯旋而归', 'Return in Triumph')}
            </button>
          </div>
        )}

        {phase === 'defeat' && (
          <div className="text-center">
            <div className="my-8 text-8xl" aria-hidden>💀</div>
            <h2 className="mb-2 text-2xl font-extrabold text-[#ff4b4b]">{t('你被击败了', 'You were defeated')}</h2>
            <p className="mb-8 text-sm italic text-[var(--muted-foreground)]">
              「{lang === 'en' ? boss.enTaunt : boss.zhTaunt}」
            </p>
            <button
              onClick={onExit}
              className="w-full max-w-sm rounded-2xl border-b-4 border-[#d33131] bg-[#ff4b4b] py-4 text-lg font-extrabold uppercase tracking-wide text-white transition hover:bg-[#ff5f5f] active:translate-y-0.5 active:border-b-2"
            >
              {t('回去修炼', 'Train and Return')}
            </button>
          </div>
        )}
      </div>

      {/* 反馈条 */}
      {phase === 'feedback' && feedback && (
        <div
          className={`fixed inset-x-0 bottom-0 z-[70] border-t-2 ${
            feedback.correct
              ? 'border-[#a5ed6e] bg-[#d7ffb8] text-[#58a700]'
              : 'border-[#ffb2b2] bg-[#ffdfe0] text-[#ea2b2b]'
          }`}
        >
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center">
            <div className="flex-1">
              <p className="text-lg font-extrabold">
                {feedback.correct ? t('💥 命中要害！', '💥 Critical hit!') : t('🛡️ 被反击了！', '🛡️ Counter-attacked!')}
              </p>
              <p className="mt-1 text-sm leading-relaxed">{feedback.explain}</p>
            </div>
            <button
              onClick={next}
              className={`shrink-0 rounded-2xl border-b-4 px-10 py-3 text-base font-extrabold uppercase tracking-wide text-white transition active:translate-y-0.5 active:border-b-2 ${
                feedback.correct
                  ? 'border-[#46a302] bg-[#58cc02] hover:bg-[#61d904]'
                  : 'border-[#d33131] bg-[#ff4b4b] hover:bg-[#ff5f5f]'
              }`}
            >
              {t('继续', 'Continue')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- 战斗题目渲染（选择/判断/填空） ---------- */

function BossExercise({
  exercise,
  locked,
  onAnswer,
}: {
  exercise: Gradeable;
  locked: boolean;
  onAnswer: (correct: boolean, explain: string) => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);

  const base =
    'w-full rounded-2xl border-2 border-b-4 px-5 py-3.5 text-left text-sm font-semibold transition active:translate-y-0.5 active:border-b-2 disabled:pointer-events-none sm:text-base';
  const cls = (state: 'idle' | 'right' | 'wrong' | 'dim') => {
    switch (state) {
      case 'right':
        return `${base} border-[#a5ed6e] bg-[#d7ffb8] text-[#58a700]`;
      case 'wrong':
        return `${base} border-[#ffb2b2] bg-[#ffdfe0] text-[#ea2b2b]`;
      case 'dim':
        return `${base} border-[var(--border)] bg-[var(--card)] opacity-50`;
      default:
        return `${base} border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)]`;
    }
  };

  const options: { label: string; correct: boolean }[] =
    exercise.type === 'choice'
      ? exercise.options.map((o, i) => ({ label: o, correct: i === exercise.correct }))
      : exercise.type === 'fill'
        ? exercise.options.map((o, i) => ({ label: o, correct: i === exercise.correct }))
        : [
            { label: /[一-鿿]/.test(exercise.statement) ? '✅ 正确' : '✅ True', correct: exercise.answer },
            { label: /[一-鿿]/.test(exercise.statement) ? '❌ 错误' : '❌ False', correct: !exercise.answer },
          ];

  const prompt =
    exercise.type === 'choice'
      ? exercise.question
      : exercise.type === 'fill'
        ? `${exercise.before}____${exercise.after}`
        : exercise.statement;
  const explain = exercise.explain;

  function pick(i: number) {
    if (locked || picked !== null) return;
    setPicked(i);
    onAnswer(options[i].correct, explain);
  }

  return (
    <div>
      <div className="mb-4 rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-4">
        <p className="text-base font-extrabold leading-relaxed sm:text-lg">{prompt}</p>
      </div>
      <div className="space-y-2.5">
        {options.map((o, i) => {
          let state: 'idle' | 'right' | 'wrong' | 'dim' = 'idle';
          if (picked !== null) {
            if (i === picked) state = o.correct ? 'right' : 'wrong';
            else if (o.correct) state = 'right';
            else state = 'dim';
          }
          return (
            <button key={i} disabled={picked !== null} onClick={() => pick(i)} className={cls(state)}>
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
