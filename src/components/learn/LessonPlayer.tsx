'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import type {
  ChoiceExercise,
  Exercise,
  FillExercise,
  Lesson,
  MatchExercise,
  TrueFalseExercise,
  Unit,
} from '@/data/optionsCourse';
import { MAX_HEARTS } from '@/data/optionsCourse';
import { useLanguage } from '@/contexts/LanguageContext';
import { LessonDiagram } from './diagrams';
import { sfx } from './sounds';

/* =========================================================
 * 会话核心：课程闯关与错题复习共用的答题流程
 * ======================================================= */

export interface SessionItem {
  key: string;
  exercise: Exercise;
}

interface SessionCoreProps {
  items: SessionItem[];
  color: string;
  colorDark: string;
  /** 开场页（知识卡片等）；不传则直接进入答题 */
  intro?: (start: () => void) => ReactNode;
  useHearts: boolean;
  onExit: () => void;
  /** 会话完成回调，返回获得的 XP */
  onComplete: (perfectRun: boolean) => number;
  /** 每次作答上报（错题本记录用） */
  onExerciseResult?: (key: string, correct: boolean) => void;
  /** 暴击奖励 XP 入账（会话结束时一次性回调） */
  onCritBonus?: (bonus: number) => void;
  completeTitle: string;
  completePerfectTitle: string;
}

/** 连击达到该值后，每次答对有概率触发暴击 */
const CRIT_MIN_COMBO = 3;
const CRIT_CHANCE = 0.2;
const CRIT_XP = 2;

type Phase = 'intro' | 'question' | 'feedback' | 'complete' | 'failed';

interface Feedback {
  correct: boolean;
  explain: string;
}

function SessionCore({
  items,
  color,
  colorDark,
  intro,
  useHearts,
  onExit,
  onComplete,
  onExerciseResult,
  onCritBonus,
  completeTitle,
  completePerfectTitle,
}: SessionCoreProps) {
  const { lang } = useLanguage();
  const [phase, setPhase] = useState<Phase>(intro ? 'intro' : 'question');
  const [queue, setQueue] = useState<SessionItem[]>(() => [...items]);
  const [qIndex, setQIndex] = useState(0);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [mistakes, setMistakes] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [critCount, setCritCount] = useState(0);
  const [critFlash, setCritFlash] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [earnedXp, setEarnedXp] = useState(0);

  const current = queue[qIndex];
  const progressPct = phase === 'complete' ? 100 : Math.round((qIndex / queue.length) * 100);

  function handleAnswer(correct: boolean, explain: string) {
    if (current) onExerciseResult?.(current.key, correct);
    setFeedback({ correct, explain });
    setPhase('feedback');
    if (correct) {
      sfx.correct(combo);
      const next = combo + 1;
      setCombo(next);
      setMaxCombo((m) => Math.max(m, next));
      // 暴击时刻：连击中随机触发，奖励额外 XP —— 不确定的奖励才让人期待
      if (next >= CRIT_MIN_COMBO && Math.random() < CRIT_CHANCE) {
        setCritCount((n) => n + 1);
        setCritFlash(true);
        sfx.crit();
        setTimeout(() => setCritFlash(false), 900);
      }
    } else {
      sfx.wrong();
      setCombo(0);
      setMistakes((m) => m + 1);
      // 答错的题排回队尾，直到答对为止
      setQueue((q) => [...q, q[qIndex]]);
      if (useHearts) {
        const remaining = hearts - 1;
        setHearts(remaining);
        if (remaining <= 0) setPhase('failed');
      }
    }
  }

  function handleContinue() {
    setFeedback(null);
    if (qIndex + 1 >= queue.length) {
      const xp = onComplete(mistakes === 0);
      const bonus = critCount * CRIT_XP;
      if (bonus > 0) onCritBonus?.(bonus);
      setEarnedXp(xp);
      if (mistakes === 0) sfx.perfect();
      else sfx.complete();
      setPhase('complete');
    } else {
      setQIndex((i) => i + 1);
      setPhase('question');
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      {/* 顶栏：退出 + 进度条 + 红心/复习标记 */}
      <div className="mx-auto flex w-full max-w-2xl items-center gap-4 px-4 pt-5 pb-2">
        <button
          onClick={onExit}
          aria-label="退出本课"
          className="text-2xl leading-none text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
        >
          ✕
        </button>
        <div className="h-4 flex-1 overflow-hidden rounded-full bg-[var(--muted)]">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.max(progressPct, 4)}%`, backgroundColor: color }}
          />
        </div>
        {useHearts ? (
          <div className="flex items-center gap-1 font-bold text-[#ff4b4b]">
            <span aria-hidden>❤️</span>
            <span>{hearts}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-sm font-bold text-[#f59f00]">
            <span aria-hidden>📒</span>
            <span>{lang === 'en' ? 'Review' : '复习'}</span>
          </div>
        )}
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col overflow-y-auto px-4 pb-40">
        {phase === 'intro' && intro?.(() => setPhase('question'))}

        {(phase === 'question' || phase === 'feedback') && current && (
          <ExerciseView
            key={`${qIndex}-${queue.length}`}
            exercise={current.exercise}
            locked={phase === 'feedback'}
            onAnswer={handleAnswer}
            onMatchDone={() => handleAnswer(true, lang === 'en' ? 'All pairs matched correctly!' : '全部配对成功！')}
          />
        )}

        {phase === 'complete' && (
          <CompleteCard
            color={color}
            title={mistakes === 0 ? completePerfectTitle : completeTitle}
            total={items.length}
            xp={earnedXp}
            critBonus={critCount * CRIT_XP}
            maxCombo={maxCombo}
            mistakes={mistakes}
            onExit={onExit}
            lang={lang}
          />
        )}

        {phase === 'failed' && <FailedCard onExit={onExit} lang={lang} />}
      </div>

      {/* 暴击闪光 */}
      {critFlash && (
        <div className="pointer-events-none fixed inset-0 z-[65] flex items-center justify-center bg-[#ffc800]/15">
          <div className="animate-bounce rounded-3xl border-4 border-[#ffc800] bg-[var(--card)] px-8 py-5 text-center shadow-2xl">
            <p className="text-4xl" aria-hidden>⚡</p>
            <p className="mt-1 text-2xl font-extrabold text-[#ffc800]">
              {lang === 'en' ? 'CRIT!' : '暴击！'} +{CRIT_XP} XP
            </p>
          </div>
        </div>
      )}

      {/* 底部反馈条 */}
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
                {feedback.correct ? (lang === 'en' ? 'Correct!' : '答对了！') : lang === 'en' ? 'Not quite' : '不对哦'}
              </p>
              <p className="mt-1 text-sm leading-relaxed">{feedback.explain}</p>
            </div>
            <button
              onClick={handleContinue}
              className={`shrink-0 rounded-2xl border-b-4 px-10 py-3 text-base font-extrabold uppercase tracking-wide text-white transition active:translate-y-0.5 active:border-b-2 ${
                feedback.correct
                  ? 'border-[#46a302] bg-[#58cc02] hover:bg-[#61d904]'
                  : 'border-[#d33131] bg-[#ff4b4b] hover:bg-[#ff5f5f]'
              }`}
            >
              {lang === 'en' ? 'Continue' : '继续'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
 * 课程闯关模式
 * ======================================================= */

interface LessonPlayerProps {
  unit: Unit;
  lesson: Lesson;
  isReview: boolean;
  developerMode?: boolean;
  onExit: () => void;
  onComplete: (perfectRun: boolean) => number;
  onExerciseResult?: (key: string, correct: boolean) => void;
  onCritBonus?: (bonus: number) => void;
}

export function LessonPlayer({
  unit,
  lesson,
  isReview,
  developerMode = false,
  onExit,
  onComplete,
  onExerciseResult,
  onCritBonus,
}: LessonPlayerProps) {
  const { lang } = useLanguage();
  const items = useMemo(
    () => lesson.exercises.map((exercise, i) => ({ key: `${lesson.id}:${i}`, exercise })),
    [lesson],
  );
  return (
    <SessionCore
      items={items}
      color={unit.color}
      colorDark={unit.colorDark}
      useHearts
      intro={(start) => (
        <TipsCard
          unit={unit}
          lesson={lesson}
          isReview={isReview}
          developerMode={developerMode}
          lang={lang}
          onStart={start}
        />
      )}
      onExit={onExit}
      onComplete={onComplete}
      onExerciseResult={onExerciseResult}
      onCritBonus={onCritBonus}
      completeTitle={lang === 'en' ? 'Lesson Complete!' : '完成本课！'}
      completePerfectTitle={lang === 'en' ? 'Perfect Clear!' : '完美通关！'}
    />
  );
}

/* =========================================================
 * 错题复习模式（无红心，间隔重复驱动）
 * ======================================================= */

interface ReviewSessionProps {
  items: SessionItem[];
  onExit: () => void;
  onComplete: () => number;
  onExerciseResult: (key: string, correct: boolean) => void;
  onCritBonus?: (bonus: number) => void;
}

export function ReviewSession({ items, onExit, onComplete, onExerciseResult, onCritBonus }: ReviewSessionProps) {
  const { lang } = useLanguage();
  return (
    <SessionCore
      items={items}
      color="#f59f00"
      colorDark="#c47f00"
      useHearts={false}
      onExit={onExit}
      onComplete={() => onComplete()}
      onExerciseResult={onExerciseResult}
      onCritBonus={onCritBonus}
      completeTitle={lang === 'en' ? 'Review Complete!' : '复习完成！'}
      completePerfectTitle={lang === 'en' ? 'All correct — memory locked in!' : '全部答对，记忆牢固！'}
    />
  );
}

/* ---------- 知识卡片 ---------- */

function TipsCard({
  unit,
  lesson,
  isReview,
  developerMode,
  lang,
  onStart,
}: {
  unit: Unit;
  lesson: Lesson;
  isReview: boolean;
  developerMode: boolean;
  lang: 'en' | 'zh';
  onStart: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col justify-center py-8">
      <div className="mb-2 text-sm font-bold uppercase tracking-wide" style={{ color: unit.color }}>
        {unit.title} {isReview && (lang === 'en' ? '· Review' : '· 复习')}
      </div>
      <h1 className="mb-6 text-3xl font-extrabold">{lesson.title}</h1>
      {lesson.analogy && (
        <div className="mb-4 rounded-2xl border-2 border-[#ffc800] bg-[#fff7e0] p-4 dark:bg-[#3a3000]">
          <p className="mb-1 text-xs font-extrabold uppercase tracking-wide text-[#b58900]">
            {lang === 'en' ? '🌰 Analogy' : '🌰 打个比方'}
          </p>
          <p className="text-sm leading-relaxed text-[#7a5c00] dark:text-[#ffe58a] sm:text-base">
            {lesson.analogy}
          </p>
        </div>
      )}
      {lesson.diagram && lang === 'zh' && (
        <div className="mb-4">
          <LessonDiagram id={lesson.diagram} />
        </div>
      )}
      <div className="space-y-3">
        {lesson.tips.map((tip, i) => (
          <div
            key={i}
            className="flex gap-3 rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-4"
          >
            <span className="text-xl" aria-hidden>
              💡
            </span>
            <p className="text-sm leading-relaxed sm:text-base">{tip}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={onStart}
          className="flex-1 rounded-2xl border-b-4 py-4 text-lg font-extrabold uppercase tracking-wide text-white transition active:translate-y-0.5 active:border-b-2"
          style={{ backgroundColor: unit.color, borderColor: unit.colorDark }}
        >
          {lang === 'en' ? 'Start Practice' : '开始练习'}
        </button>
        {developerMode && (
          <button
            onClick={() => onStart()}
            className="rounded-2xl border-2 border-dashed border-[var(--border)] px-5 py-4 text-sm font-extrabold text-[var(--muted-foreground)]"
            title={lang === 'en' ? 'Developer mode only unlocks all lessons; it does not skip this lesson’s exercises.' : '当前开发者模式只解锁任意章节；不跳过本课练习。'}
          >
            {lang === 'en' ? 'All lessons unlocked' : '已解锁任意章节'}
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------- 练习题分发 ---------- */

function ExerciseView({
  exercise,
  locked,
  onAnswer,
  onMatchDone,
}: {
  exercise: Exercise;
  locked: boolean;
  onAnswer: (correct: boolean, explain: string) => void;
  onMatchDone: () => void;
}) {
  switch (exercise.type) {
    case 'choice':
      return <ChoiceView ex={exercise} locked={locked} onAnswer={onAnswer} />;
    case 'tf':
      return <TrueFalseView ex={exercise} locked={locked} onAnswer={onAnswer} />;
    case 'fill':
      return <FillView ex={exercise} locked={locked} onAnswer={onAnswer} />;
    case 'match':
      return <MatchView ex={exercise} onDone={onMatchDone} />;
  }
}

const optionBase =
  'w-full rounded-2xl border-2 border-b-4 px-5 py-4 text-left text-base font-semibold transition active:translate-y-0.5 active:border-b-2 disabled:pointer-events-none';

function optionClass(state: 'idle' | 'selected-right' | 'selected-wrong' | 'reveal-right' | 'dim') {
  switch (state) {
    case 'selected-right':
      return `${optionBase} border-[#a5ed6e] bg-[#d7ffb8] text-[#58a700]`;
    case 'selected-wrong':
      return `${optionBase} border-[#ffb2b2] bg-[#ffdfe0] text-[#ea2b2b]`;
    case 'reveal-right':
      return `${optionBase} border-[#a5ed6e] bg-[var(--card)] text-[#58a700]`;
    case 'dim':
      return `${optionBase} border-[var(--border)] bg-[var(--card)] opacity-50`;
    default:
      return `${optionBase} border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)]`;
  }
}

/* ---------- 选择题 ---------- */

function ChoiceView({
  ex,
  locked,
  onAnswer,
}: {
  ex: ChoiceExercise;
  locked: boolean;
  onAnswer: (correct: boolean, explain: string) => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);

  function pick(i: number) {
    if (locked || picked !== null) return;
    setPicked(i);
    onAnswer(i === ex.correct, ex.explain);
  }

  return (
    <div className="py-8">
      <p className="mb-1 text-sm font-bold text-[var(--muted-foreground)]">
        {/[\u4e00-\u9fff]/.test(ex.question) ? '选出正确答案' : 'Choose the correct answer'}
      </p>
      <h2 className="mb-6 text-xl font-extrabold sm:text-2xl">{ex.question}</h2>
      <div className="space-y-3">
        {ex.options.map((opt, i) => {
          let state: Parameters<typeof optionClass>[0] = 'idle';
          if (picked !== null) {
            if (i === picked) state = i === ex.correct ? 'selected-right' : 'selected-wrong';
            else if (i === ex.correct) state = 'reveal-right';
            else state = 'dim';
          }
          return (
            <button key={i} disabled={picked !== null} onClick={() => pick(i)} className={optionClass(state)}>
              <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-lg border-2 border-current text-sm">
                {i + 1}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- 判断题 ---------- */

function TrueFalseView({
  ex,
  locked,
  onAnswer,
}: {
  ex: TrueFalseExercise;
  locked: boolean;
  onAnswer: (correct: boolean, explain: string) => void;
}) {
  const [picked, setPicked] = useState<boolean | null>(null);

  function pick(v: boolean) {
    if (locked || picked !== null) return;
    setPicked(v);
    onAnswer(v === ex.answer, ex.explain);
  }

  return (
    <div className="py-8">
      <p className="mb-1 text-sm font-bold text-[var(--muted-foreground)]">
        {/[\u4e00-\u9fff]/.test(ex.statement) ? '判断对错' : 'True or False'}
      </p>
      <div className="mb-8 rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-5">
        <p className="text-lg font-bold leading-relaxed">{ex.statement}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {([true, false] as const).map((v) => {
          let state: Parameters<typeof optionClass>[0] = 'idle';
          if (picked !== null) {
            if (v === picked) state = v === ex.answer ? 'selected-right' : 'selected-wrong';
            else if (v === ex.answer) state = 'reveal-right';
            else state = 'dim';
          }
          return (
            <button
              key={String(v)}
              disabled={picked !== null}
              onClick={() => pick(v)}
              className={`${optionClass(state)} text-center text-lg`}
            >
              {/[^\x00-\x7F]/.test(ex.statement) ? (v ? '✅ 正确' : '❌ 错误') : v ? '✅ True' : '❌ False'}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- 填空题 ---------- */

function FillView({
  ex,
  locked,
  onAnswer,
}: {
  ex: FillExercise;
  locked: boolean;
  onAnswer: (correct: boolean, explain: string) => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);

  function pick(i: number) {
    if (locked || picked !== null) return;
    setPicked(i);
    onAnswer(i === ex.correct, ex.explain);
  }

  const blank =
    picked === null ? (
      <span className="mx-1 inline-block min-w-20 border-b-4 border-dotted border-[var(--muted-foreground)] text-center">
        &nbsp;
      </span>
    ) : (
      <span
        className={`mx-1 inline-block border-b-4 px-1 font-extrabold ${
          picked === ex.correct ? 'border-[#58cc02] text-[#58a700]' : 'border-[#ff4b4b] text-[#ea2b2b]'
        }`}
      >
        {ex.options[picked]}
      </span>
    );

  return (
    <div className="py-8">
      <p className="mb-1 text-sm font-bold text-[var(--muted-foreground)]">
        {/[\u4e00-\u9fff]/.test(ex.before + ex.after) ? '补全句子' : 'Complete the sentence'}
      </p>
      <div className="mb-8 rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-5">
        <p className="text-lg font-bold leading-loose">
          {ex.before}
          {blank}
          {ex.after}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {ex.options.map((opt, i) => {
          let state: Parameters<typeof optionClass>[0] = 'idle';
          if (picked !== null) {
            if (i === picked) state = i === ex.correct ? 'selected-right' : 'selected-wrong';
            else if (i === ex.correct) state = 'reveal-right';
            else state = 'dim';
          }
          return (
            <button
              key={i}
              disabled={picked !== null}
              onClick={() => pick(i)}
              className={`${optionClass(state)} text-center`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- 配对题（不扣红心） ---------- */

/** 稳定伪随机，避免 SSR/CSR 洗牌不一致 */
function shuffled<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function MatchView({ ex, onDone }: { ex: MatchExercise; onDone: () => void }) {
  const left = useMemo(() => ex.pairs.map((p) => p[0]), [ex]);
  const right = useMemo(() => shuffled(ex.pairs.map((p) => p[1]), ex.pairs[0][0].length * 7 + 13), [ex]);
  const [selLeft, setSelLeft] = useState<string | null>(null);
  const [selRight, setSelRight] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongFlash, setWrongFlash] = useState<[string, string] | null>(null);

  function isPair(l: string, r: string) {
    return ex.pairs.some(([a, b]) => a === l && b === r);
  }

  function trySelect(side: 'l' | 'r', value: string) {
    if (matched.has(value)) return;
    const l = side === 'l' ? value : selLeft;
    const r = side === 'r' ? value : selRight;
    if (side === 'l') setSelLeft(value);
    else setSelRight(value);

    if (l && r) {
      if (isPair(l, r)) {
        const next = new Set(matched);
        next.add(l);
        next.add(r);
        setMatched(next);
        setSelLeft(null);
        setSelRight(null);
        if (next.size === ex.pairs.length * 2) {
          setTimeout(onDone, 350);
        }
      } else {
        setWrongFlash([l, r]);
        setTimeout(() => {
          setWrongFlash(null);
          setSelLeft(null);
          setSelRight(null);
        }, 600);
      }
    }
  }

  function cellClass(value: string, selected: boolean) {
    if (matched.has(value))
      return `${optionBase} border-[#a5ed6e] bg-[#d7ffb8] text-[#58a700] opacity-60`;
    if (wrongFlash && (wrongFlash[0] === value || wrongFlash[1] === value))
      return `${optionBase} border-[#ffb2b2] bg-[#ffdfe0] text-[#ea2b2b]`;
    if (selected) return `${optionBase} border-[#84d8ff] bg-[#ddf4ff] text-[#1899d6]`;
    return `${optionBase} border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)]`;
  }

  return (
    <div className="py-8">
      <p className="mb-1 text-sm font-bold text-[var(--muted-foreground)]">
        {/[\u4e00-\u9fff]/.test(ex.prompt) ? '配对练习（不扣红心）' : 'Matching exercise (no hearts lost)'}
      </p>
      <h2 className="mb-6 text-xl font-extrabold sm:text-2xl">{ex.prompt}</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-3">
          {left.map((v) => (
            <button
              key={v}
              onClick={() => trySelect('l', v)}
              className={`${cellClass(v, selLeft === v)} !px-3 text-sm`}
            >
              {v}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {right.map((v) => (
            <button
              key={v}
              onClick={() => trySelect('r', v)}
              className={`${cellClass(v, selRight === v)} !px-3 text-sm`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- 完成 / 失败 ---------- */

/** 数字滚动：从 0 数到目标值 */
function useCountUp(target: number, durationMs = 900): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (target <= 0) return;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      // easeOutCubic：结尾减速，数字「落定」的感觉
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return target <= 0 ? target : value;
}

function CompleteCard({
  color,
  title,
  total,
  xp,
  critBonus,
  maxCombo,
  mistakes,
  onExit,
  lang,
}: {
  color: string;
  title: string;
  total: number;
  xp: number;
  critBonus: number;
  maxCombo: number;
  mistakes: number;
  onExit: () => void;
  lang: 'en' | 'zh';
}) {
  const accuracy = Math.round((total / (total + mistakes)) * 100);
  const shownXp = useCountUp(xp + critBonus);
  const [ringOn, setRingOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRingOn(true), 150);
    return () => clearTimeout(t);
  }, []);
  const R = 40;
  const C = 2 * Math.PI * R;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      className="flex flex-1 flex-col items-center justify-center py-8 text-center"
    >
      <div className={`mb-3 text-7xl ${mistakes === 0 ? 'animate-bounce' : ''}`} aria-hidden>
        {mistakes === 0 ? '🏆' : '🎉'}
      </div>
      <h1 className="mb-6 text-3xl font-extrabold" style={{ color }}>
        {title}
      </h1>

      {/* 正确率圆环 */}
      <div className="relative mb-6 h-28 w-28">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={R} fill="none" stroke="var(--muted)" strokeWidth="10" />
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="#1cb0f6"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={ringOn ? C * (1 - accuracy / 100) : C}
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-extrabold text-[#1cb0f6]">{accuracy}%</span>
          <span className="text-[9px] font-bold uppercase tracking-wide text-[var(--muted-foreground)]">
            {lang === 'en' ? 'Accuracy' : '正确率'}
          </span>
        </div>
      </div>

      {/* XP 滚动 */}
      <p className="mb-1 text-4xl font-extrabold tabular-nums text-[#ffc800]">+{shownXp} XP</p>
      <div className="mb-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-bold text-[var(--muted-foreground)]">
        {critBonus > 0 && (
          <span className="text-[#ffc800]">⚡ {lang === 'en' ? `crit bonus +${critBonus}` : `暴击加成 +${critBonus}`}</span>
        )}
        {maxCombo >= 3 && (
          <span className="text-[#ff9600]">🔥 {lang === 'en' ? `best combo ×${maxCombo}` : `最高连击 ×${maxCombo}`}</span>
        )}
        {mistakes === 0 && <span className="text-[#58a700]">💎 {lang === 'en' ? 'flawless run' : '零失误通关'}</span>}
      </div>

      <button
        onClick={onExit}
        className="w-full max-w-sm rounded-2xl border-b-4 border-[#46a302] bg-[#58cc02] py-4 text-lg font-extrabold uppercase tracking-wide text-white transition hover:bg-[#61d904] active:translate-y-0.5 active:border-b-2"
      >
        {lang === 'en' ? 'Back to Course Map' : '返回课程地图'}
      </button>
    </motion.div>
  );
}

function FailedCard({ onExit, lang }: { onExit: () => void; lang: 'en' | 'zh' }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
      <div className="mb-4 text-7xl" aria-hidden>
        💔
      </div>
      <h1 className="mb-2 text-3xl font-extrabold text-[#ff4b4b]">{lang === 'en' ? 'Out of Hearts' : '红心用完了'}</h1>
      <p className="mb-10 max-w-sm text-[var(--muted-foreground)]">
        {lang === 'en'
          ? 'No worries—review the lesson cards and try again. The questions you miss are usually where you improve the fastest.'
          : '别灰心！重新阅读知识卡片，再挑战一次吧。答错的知识点才是进步最快的地方。'}
      </p>
      <button
        onClick={onExit}
        className="w-full max-w-sm rounded-2xl border-b-4 border-[#d33131] bg-[#ff4b4b] py-4 text-lg font-extrabold uppercase tracking-wide text-white transition hover:bg-[#ff5f5f] active:translate-y-0.5 active:border-b-2"
      >
        {lang === 'en' ? 'Back to Course Map' : '返回课程地图'}
      </button>
    </div>
  );
}
