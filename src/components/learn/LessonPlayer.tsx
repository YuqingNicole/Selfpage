'use client';

import { useMemo, useState } from 'react';
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
import { LessonDiagram } from './diagrams';

interface LessonPlayerProps {
  unit: Unit;
  lesson: Lesson;
  isReview: boolean;
  onExit: () => void;
  onComplete: (perfectRun: boolean) => number;
}

type Phase = 'tips' | 'question' | 'feedback' | 'complete' | 'failed';

interface Feedback {
  correct: boolean;
  explain: string;
}

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

export function LessonPlayer({ unit, lesson, isReview, onExit, onComplete }: LessonPlayerProps) {
  const [phase, setPhase] = useState<Phase>('tips');
  const [queue, setQueue] = useState<Exercise[]>(() => [...lesson.exercises]);
  const [qIndex, setQIndex] = useState(0);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [mistakes, setMistakes] = useState(0);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [earnedXp, setEarnedXp] = useState(0);

  const totalPlanned = queue.length;
  const current = queue[qIndex];
  const progressPct = phase === 'complete' ? 100 : Math.round((qIndex / totalPlanned) * 100);

  function handleAnswer(correct: boolean, explain: string) {
    setFeedback({ correct, explain });
    setPhase('feedback');
    if (!correct) {
      setMistakes((m) => m + 1);
      const remaining = hearts - 1;
      setHearts(remaining);
      // 答错的题排回队尾，直到答对为止
      setQueue((q) => [...q, q[qIndex]]);
      if (remaining <= 0) {
        setPhase('failed');
      }
    }
  }

  function handleContinue() {
    setFeedback(null);
    if (qIndex + 1 >= queue.length) {
      const xp = onComplete(mistakes === 0);
      setEarnedXp(xp);
      setPhase('complete');
    } else {
      setQIndex((i) => i + 1);
      setPhase('question');
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      {/* 顶栏：退出 + 进度条 + 红心 */}
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
            style={{ width: `${Math.max(progressPct, 4)}%`, backgroundColor: unit.color }}
          />
        </div>
        <div className="flex items-center gap-1 font-bold text-[#ff4b4b]">
          <span aria-hidden>❤️</span>
          <span>{hearts}</span>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col overflow-y-auto px-4 pb-40">
        {phase === 'tips' && (
          <TipsCard unit={unit} lesson={lesson} isReview={isReview} onStart={() => setPhase('question')} />
        )}

        {(phase === 'question' || phase === 'feedback') && current && (
          <ExerciseView
            key={`${qIndex}-${queue.length}`}
            exercise={current}
            locked={phase === 'feedback'}
            onAnswer={handleAnswer}
            onMatchDone={() => handleAnswer(true, '全部配对成功！')}
          />
        )}

        {phase === 'complete' && (
          <CompleteCard unit={unit} lesson={lesson} xp={earnedXp} mistakes={mistakes} onExit={onExit} />
        )}

        {phase === 'failed' && <FailedCard onExit={onExit} />}
      </div>

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
              <p className="text-lg font-extrabold">{feedback.correct ? '答对了！' : '不对哦'}</p>
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
              继续
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- 知识卡片 ---------- */

function TipsCard({
  unit,
  lesson,
  isReview,
  onStart,
}: {
  unit: Unit;
  lesson: Lesson;
  isReview: boolean;
  onStart: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col justify-center py-8">
      <div className="mb-2 text-sm font-bold uppercase tracking-wide" style={{ color: unit.color }}>
        {unit.title} {isReview && '· 复习'}
      </div>
      <h1 className="mb-6 text-3xl font-extrabold">{lesson.title}</h1>
      {lesson.analogy && (
        <div className="mb-4 rounded-2xl border-2 border-[#ffc800] bg-[#fff7e0] p-4 dark:bg-[#3a3000]">
          <p className="mb-1 text-xs font-extrabold uppercase tracking-wide text-[#b58900]">
            🌰 打个比方
          </p>
          <p className="text-sm leading-relaxed text-[#7a5c00] dark:text-[#ffe58a] sm:text-base">
            {lesson.analogy}
          </p>
        </div>
      )}
      {lesson.diagram && (
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
      <button
        onClick={onStart}
        className="mt-8 w-full rounded-2xl border-b-4 py-4 text-lg font-extrabold uppercase tracking-wide text-white transition active:translate-y-0.5 active:border-b-2"
        style={{ backgroundColor: unit.color, borderColor: unit.colorDark }}
      >
        开始练习
      </button>
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
      <p className="mb-1 text-sm font-bold text-[var(--muted-foreground)]">选出正确答案</p>
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
      <p className="mb-1 text-sm font-bold text-[var(--muted-foreground)]">判断对错</p>
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
              {v ? '✅ 正确' : '❌ 错误'}
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
      <p className="mb-1 text-sm font-bold text-[var(--muted-foreground)]">补全句子</p>
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
      <p className="mb-1 text-sm font-bold text-[var(--muted-foreground)]">配对练习（不扣红心）</p>
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

function CompleteCard({
  unit,
  lesson,
  xp,
  mistakes,
  onExit,
}: {
  unit: Unit;
  lesson: Lesson;
  xp: number;
  mistakes: number;
  onExit: () => void;
}) {
  const total = lesson.exercises.length;
  const accuracy = Math.round((total / (total + mistakes)) * 100);
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
      <div className="mb-4 text-7xl" aria-hidden>
        {mistakes === 0 ? '🏆' : '🎉'}
      </div>
      <h1 className="mb-2 text-3xl font-extrabold" style={{ color: unit.color }}>
        {mistakes === 0 ? '完美通关！' : '完成本课！'}
      </h1>
      <p className="mb-8 text-[var(--muted-foreground)]">{lesson.title}</p>
      <div className="mb-10 flex gap-4">
        <div className="w-32 rounded-2xl border-2 border-[#ffc800] p-1">
          <div className="rounded-t-xl bg-[#ffc800] py-1 text-xs font-extrabold uppercase text-white">
            经验值
          </div>
          <div className="py-3 text-2xl font-extrabold text-[#ffc800]">+{xp} XP</div>
        </div>
        <div className="w-32 rounded-2xl border-2 border-[#1cb0f6] p-1">
          <div className="rounded-t-xl bg-[#1cb0f6] py-1 text-xs font-extrabold uppercase text-white">
            正确率
          </div>
          <div className="py-3 text-2xl font-extrabold text-[#1cb0f6]">{accuracy}%</div>
        </div>
      </div>
      <button
        onClick={onExit}
        className="w-full max-w-sm rounded-2xl border-b-4 border-[#46a302] bg-[#58cc02] py-4 text-lg font-extrabold uppercase tracking-wide text-white transition hover:bg-[#61d904] active:translate-y-0.5 active:border-b-2"
      >
        返回课程地图
      </button>
    </div>
  );
}

function FailedCard({ onExit }: { onExit: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
      <div className="mb-4 text-7xl" aria-hidden>
        💔
      </div>
      <h1 className="mb-2 text-3xl font-extrabold text-[#ff4b4b]">红心用完了</h1>
      <p className="mb-10 max-w-sm text-[var(--muted-foreground)]">
        别灰心！重新阅读知识卡片，再挑战一次吧。答错的知识点才是进步最快的地方。
      </p>
      <button
        onClick={onExit}
        className="w-full max-w-sm rounded-2xl border-b-4 border-[#d33131] bg-[#ff4b4b] py-4 text-lg font-extrabold uppercase tracking-wide text-white transition hover:bg-[#ff5f5f] active:translate-y-0.5 active:border-b-2"
      >
        返回课程地图
      </button>
    </div>
  );
}
