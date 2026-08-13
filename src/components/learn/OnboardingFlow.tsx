'use client';

import { useMemo, useState } from 'react';
import type { ChoiceExercise, FillExercise, TrueFalseExercise, Unit } from '@/data/optionsCourse';
import { useLanguage } from '@/contexts/LanguageContext';
import { track } from './analytics';
import { sfx } from './sounds';
import { Mascot } from './Mascot';

/**
 * 新用户引导 + 分级测试（仅期权学园首次访问触发）
 * 流程：欢迎与风险提示 → 经验自评 → （零基础直入第一课 | 5 题分级测试 → 按成绩解锁）
 */

export type PlacementResult = 'none' | 'u4' | 'u8';

/** 分级测试题：从基础篇挑 5 道有代表性的题（lessonId + 题目下标） */
const PLACEMENT_KEYS: { lessonId: string; index: number }[] = [
  { lessonId: 'u1l1', index: 0 },  // 期权买方获得什么
  { lessonId: 'u3l2', index: 1 },  // 内在价值/时间价值计算
  { lessonId: 'u5l1', index: 0 },  // Delta 含义
  { lessonId: 'u6l1', index: 3 },  // 备兑收益计算
  { lessonId: 'u7l1', index: 2 },  // 价差最大收益
];

type Gradeable = ChoiceExercise | TrueFalseExercise | FillExercise;

interface OnboardingFlowProps {
  course: Unit[];
  onStartFirstLesson: () => void;
  onPlacement: (result: PlacementResult) => void;
  onClose: () => void;
}

type Step = 'welcome' | 'experience' | 'quiz' | 'result';

export function OnboardingFlow({ course, onStartFirstLesson, onPlacement, onClose }: OnboardingFlowProps) {
  const { lang } = useLanguage();
  const t = (zh: string, en: string) => (lang === 'en' ? en : zh);

  const [step, setStep] = useState<Step>('welcome');
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  const questions = useMemo(() => {
    const list: Gradeable[] = [];
    for (const key of PLACEMENT_KEYS) {
      for (const unit of course) {
        const lesson = unit.lessons.find((l) => l.id === key.lessonId);
        const ex = lesson?.exercises[key.index];
        if (ex && ex.type !== 'match') list.push(ex as Gradeable);
      }
    }
    return list;
  }, [course]);

  const current = questions[qIndex];

  const options: { label: string; correct: boolean }[] = useMemo(() => {
    if (!current) return [];
    if (current.type === 'tf') {
      return [
        { label: t('✅ 正确', '✅ True'), correct: current.answer },
        { label: t('❌ 错误', '❌ False'), correct: !current.answer },
      ];
    }
    return current.options.map((o, i) => ({ label: o, correct: i === current.correct }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, lang]);

  const prompt = !current
    ? ''
    : current.type === 'choice'
      ? current.question
      : current.type === 'fill'
        ? `${current.before}____${current.after}`
        : current.statement;

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    const right = options[i].correct;
    if (right) {
      sfx.correct(0);
      setScore((s) => s + 1);
    } else {
      sfx.wrong();
    }
    setTimeout(() => {
      setPicked(null);
      if (qIndex + 1 >= questions.length) {
        setStep('result');
      } else {
        setQIndex((q) => q + 1);
      }
    }, 650);
  }

  const placement: PlacementResult = score >= 4 ? 'u8' : score >= 2 ? 'u4' : 'none';

  const resultCopy: Record<PlacementResult, [string, string]> = {
    u8: [
      `答对 ${score}/5——基础很扎实！基础篇（第 1-8 单元）已为你解锁，直接从进阶篇开始。`,
      `${score}/5 correct — solid fundamentals! Units 1-8 are unlocked; start right at the advanced chapter.`,
    ],
    u4: [
      `答对 ${score}/5——有一定基础。前 4 个单元已为你解锁，从第 5 单元「希腊字母」继续。`,
      `${score}/5 correct — a real foundation. Units 1-4 are unlocked; pick up at Unit 5, the Greeks.`,
    ],
    none: [
      `答对 ${score}/5——没关系，从第一课开始正好。三分钟一课，很快就能追上来。`,
      `${score}/5 correct — no worries, lesson one is the right place. Three minutes a lesson, you'll catch up fast.`,
    ],
  };

  const primaryBtn =
    'w-full rounded-2xl border-b-4 border-[#46a302] bg-[#58cc02] py-4 text-lg font-extrabold uppercase tracking-wide text-white transition hover:bg-[#61d904] active:translate-y-0.5 active:border-b-2';
  const secondaryBtn =
    'w-full rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] py-3.5 text-base font-extrabold text-[var(--foreground)] transition hover:bg-[var(--muted)]';

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto flex min-h-full w-full max-w-md flex-col justify-center px-6 py-10">
        {step === 'welcome' && (
          <div className="text-center">
            <div className="mb-4 flex justify-center" aria-hidden><Mascot mood="celebrate" size={120} /></div>
            <h1 className="mb-3 text-3xl font-extrabold">{t('欢迎来到投资学园', 'Welcome to Investing Academy')}</h1>
            <div className="mb-6 space-y-2 text-left text-sm leading-relaxed text-[var(--muted-foreground)]">
              <p>⏱️ {t('每课 3 分钟，闯关式学习，从零基础到体系化实战', '3-minute lessons, level by level, from zero to a full system')}</p>
              <p>🎮 {t('比喻 + 图示 + 练习 + Boss 战 + 交易模拟器，全程免费', 'Analogies, diagrams, quizzes, boss fights and simulators — all free')}</p>
              <p>🔥 {t('每天几分钟，连胜和错题本会帮你记住一切', 'A few minutes a day; streaks and the mistake book do the remembering')}</p>
            </div>
            <div className="mb-6 rounded-2xl border-2 border-[#ffc800] bg-[#fff7e0] p-4 text-left text-xs leading-relaxed text-[#7a5c00] dark:bg-[#3a3000] dark:text-[#ffe58a]">
              ⚠️ {t(
                '本课程仅供教育用途，不构成投资建议，不推荐任何具体交易。期权与衍生品风险极高，可能损失全部本金。',
                'Educational purposes only — not investment advice, no trade recommendations. Options and derivatives carry extreme risk, up to total loss.',
              )}
            </div>
            <button
              onClick={() => {
                track('onboarding_start');
                setStep('experience');
              }}
              className={primaryBtn}
            >
              {t('我知道了，开始', 'Got it — let’s go')}
            </button>
          </div>
        )}

        {step === 'experience' && (
          <div className="text-center">
            <div className="mb-4 flex justify-center" aria-hidden><Mascot mood="think" size={104} /></div>
            <h2 className="mb-6 text-2xl font-extrabold">{t('你交易过期权吗？', 'Have you traded options before?')}</h2>
            <div className="space-y-3">
              <button
                onClick={() => {
                  track('onboarding_experience', { level: 'novice' });
                  onStartFirstLesson();
                }}
                className={primaryBtn}
              >
                🌱 {t('完全没有，从零开始', 'Never — start from zero')}
              </button>
              <button
                onClick={() => {
                  track('onboarding_experience', { level: 'some' });
                  setStep('quiz');
                }}
                className={secondaryBtn}
              >
                📖 {t('懂一些，帮我测测水平', 'I know some — test me')}
              </button>
              <button
                onClick={() => {
                  track('onboarding_experience', { level: 'pro' });
                  setStep('quiz');
                }}
                className={secondaryBtn}
              >
                🎯 {t('很熟练，想跳过基础', 'Experienced — let me skip ahead')}
              </button>
            </div>
          </div>
        )}

        {step === 'quiz' && current && (
          <div>
            <div className="mb-4 flex items-center justify-between text-sm font-extrabold">
              <span>
                {t('分级测试', 'Placement test')} {qIndex + 1}/{questions.length}
              </span>
              <span className="text-[#ffc800]">✓ {score}</span>
            </div>
            <div className="mb-4 rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-4">
              <p className="text-base font-extrabold leading-relaxed">{prompt}</p>
            </div>
            <div className="space-y-2.5">
              {options.map((o, i) => {
                let cls =
                  'w-full rounded-2xl border-2 border-b-4 px-5 py-3.5 text-left text-sm font-semibold transition active:translate-y-0.5 active:border-b-2 border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)]';
                if (picked !== null) {
                  if (i === picked)
                    cls = o.correct
                      ? cls.replace('border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)]', 'border-[#a5ed6e] bg-[#d7ffb8] text-[#58a700]')
                      : cls.replace('border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)]', 'border-[#ffb2b2] bg-[#ffdfe0] text-[#ea2b2b]');
                  else cls += ' opacity-50';
                }
                return (
                  <button key={i} disabled={picked !== null} onClick={() => pick(i)} className={cls}>
                    {o.label}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => {
                track('onboarding_quiz_skip', { at: qIndex });
                onClose();
              }}
              className="mt-6 w-full text-center text-xs font-semibold text-[var(--muted-foreground)] underline-offset-4 hover:underline"
            >
              {t('跳过测试，从第一课开始', 'Skip the test, start from lesson one')}
            </button>
          </div>
        )}

        {step === 'result' && (
          <div className="text-center">
            <div className="mb-4 text-7xl" aria-hidden>{placement === 'u8' ? '🏆' : placement === 'u4' ? '💪' : '🌱'}</div>
            <h2 className="mb-3 text-2xl font-extrabold">{t('测试完成！', 'Test complete!')}</h2>
            <p className="mb-8 text-sm leading-relaxed text-[var(--muted-foreground)]">
              {lang === 'en' ? resultCopy[placement][1] : resultCopy[placement][0]}
            </p>
            <button
              onClick={() => {
                track('placement_result', { score, placement });
                onPlacement(placement);
              }}
              className={primaryBtn}
            >
              {t('进入课程地图', 'To the course map')} →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
