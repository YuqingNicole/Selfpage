'use client';

import { useState } from 'react';
import { TAG_LABEL, todayCaseIndex, INVEST_CASES, type InvestCase } from '@/data/investCases';
import { useLanguage } from '@/contexts/LanguageContext';
import { sfx } from './sounds';
import { track } from './analytics';

/**
 * 每日一案：真实历史案例，先判断后解释。
 * 每天全站轮换一个案例；完成记录写入本地历史（未来的「认知档案」数据源）。
 */

export const CASE_XP = 15;

const HISTORY_KEY = 'invest-case-history-v1';

export interface CaseHistoryEntry {
  day: string;
  caseId: string;
  correct: number;
  total: number;
}

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function loadCaseHistory(): CaseHistoryEntry[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** 今天的案例是否已完成 */
export function todayCaseDone(): boolean {
  return loadCaseHistory().some((e) => e.day === todayStr());
}

export function todayCase(): InvestCase {
  return INVEST_CASES[todayCaseIndex()];
}

function saveCaseResult(caseId: string, correct: number, total: number): boolean {
  const history = loadCaseHistory();
  const first = !history.some((e) => e.day === todayStr());
  if (first) {
    history.push({ day: todayStr(), caseId, correct, total });
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-365)));
    } catch {
      /* ignore */
    }
  }
  return first;
}

type Step = { kind: 'brief' } | { kind: 'decision'; index: number } | { kind: 'outcome' };

export function DailyCase({
  onExit,
  onFirstFinish,
  caseOverride,
}: {
  onExit: () => void;
  onFirstFinish: () => void;
  /** 档案馆重玩：指定案例，不发 XP、不写当日记录 */
  caseOverride?: InvestCase;
}) {
  const { lang } = useLanguage();
  const t = (bi: { zh: string; en: string }) => (lang === 'en' ? bi.en : bi.zh);
  const c = caseOverride ?? todayCase();
  const isTodays = c.id === todayCase().id;

  const [step, setStep] = useState<Step>({ kind: 'brief' });
  const [picked, setPicked] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const primaryBtn =
    'w-full rounded-2xl border-b-4 border-[#46a302] bg-[#58cc02] py-3.5 text-base font-extrabold uppercase tracking-wide text-white transition hover:bg-[#61d904] active:translate-y-0.5 active:border-b-2';

  const finish = () => {
    if (isTodays) {
      const first = saveCaseResult(c.id, correctCount, c.decisions.length);
      track('case_complete', { case: c.id, correct: correctCount, total: c.decisions.length, first });
      if (first) onFirstFinish();
    } else {
      track('case_replay', { case: c.id, correct: correctCount, total: c.decisions.length });
    }
    onExit();
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto w-full max-w-xl px-5 py-8 pb-16">
        <div className="mb-5 flex items-center justify-between">
          <button
            onClick={onExit}
            aria-label={lang === 'en' ? 'Exit case' : '退出案例'}
            className="rounded-full border border-[var(--border)] px-3 py-1 text-sm font-bold text-[var(--muted-foreground)] transition hover:bg-[var(--muted)]"
          >
            ✕
          </button>
          <span className="rounded-full border border-[#ff9600] px-3 py-0.5 text-xs font-extrabold text-[#ff9600]">
            {t(TAG_LABEL[c.tag])} · {c.date}
          </span>
        </div>

        <h1 className="mb-4 text-xl font-extrabold leading-snug">📰 {t(c.title)}</h1>

        {step.kind === 'brief' && (
          <>
            <div className="mb-5 rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-5">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-[var(--muted-foreground)]">
                {lang === 'en' ? 'The setup — what was known at the time' : '背景卡 · 当时已知的信息'}
              </p>
              <ul className="space-y-2.5 text-sm leading-relaxed">
                {c.background.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden>▸</span>
                    <span>{t(b)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={() => setStep({ kind: 'decision', index: 0 })} className={primaryBtn}>
              {lang === 'en' ? 'Make your call →' : '开始判断 →'}
            </button>
          </>
        )}

        {step.kind === 'decision' && (
          <>
            <p className="mb-2 text-xs font-extrabold text-[var(--muted-foreground)]">
              {lang === 'en' ? 'Decision' : '判断'} {step.index + 1}/{c.decisions.length}
            </p>
            <div className="mb-4 rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-4">
              <p className="text-base font-extrabold leading-relaxed">{t(c.decisions[step.index].q)}</p>
            </div>
            <div className="space-y-2.5">
              {c.decisions[step.index].options.map((o, i) => {
                const d = c.decisions[step.index];
                let cls =
                  'w-full rounded-2xl border-2 border-b-4 px-4 py-3 text-left text-sm font-semibold leading-relaxed transition active:translate-y-0.5 active:border-b-2 border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)]';
                if (picked !== null) {
                  if (i === d.correct)
                    cls = cls.replace(
                      'border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)]',
                      'border-[#a5ed6e] bg-[#d7ffb8] text-[#3f7d00] dark:bg-[#1f3a00] dark:text-[#a5ed6e]',
                    );
                  else if (i === picked)
                    cls = cls.replace(
                      'border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)]',
                      'border-[#ffb2b2] bg-[#ffdfe0] text-[#c22020] dark:bg-[#3a0f0f] dark:text-[#ffb2b2]',
                    );
                  else cls += ' opacity-50';
                }
                return (
                  <button
                    key={i}
                    disabled={picked !== null}
                    onClick={() => {
                      setPicked(i);
                      if (i === d.correct) {
                        sfx.correct(0);
                        setCorrectCount((n) => n + 1);
                      } else {
                        sfx.wrong();
                      }
                    }}
                    className={cls}
                  >
                    {t(o)}
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <>
                <div className="mt-4 rounded-2xl border-2 border-[#1cb0f6] bg-[var(--card)] p-4 text-sm leading-relaxed">
                  <p className="mb-1 text-xs font-extrabold uppercase tracking-widest text-[#1cb0f6]">
                    {lang === 'en' ? 'What actually happened' : '真实答案'}
                  </p>
                  {t(c.decisions[step.index].explain)}
                </div>
                <button
                  onClick={() => {
                    setPicked(null);
                    if (step.index + 1 < c.decisions.length) setStep({ kind: 'decision', index: step.index + 1 });
                    else setStep({ kind: 'outcome' });
                  }}
                  className={`${primaryBtn} mt-4`}
                >
                  {lang === 'en' ? 'Continue →' : '继续 →'}
                </button>
              </>
            )}
          </>
        )}

        {step.kind === 'outcome' && (
          <>
            <div className="mb-4 rounded-2xl border-2 border-[#ffc800] bg-[var(--card)] p-5">
              <p className="mb-2 text-xs font-extrabold uppercase tracking-widest text-[#b58900]">
                {lang === 'en' ? 'The outcome' : '事件结局'}
              </p>
              <p className="text-sm leading-relaxed">{t(c.outcome)}</p>
            </div>
            <div className="mb-5 rounded-2xl border-2 border-[#58cc02] bg-[var(--card)] p-5">
              <p className="mb-2 text-xs font-extrabold uppercase tracking-widest text-[#58a700]">
                {lang === 'en' ? 'Take the framework with you' : '带走这个框架'}
              </p>
              <p className="text-sm leading-relaxed">{t(c.lesson)}</p>
            </div>
            <p className="mb-4 text-center text-sm font-extrabold">
              {lang === 'en'
                ? `Your judgment: ${correctCount}/${c.decisions.length}`
                : `你的判断：${correctCount}/${c.decisions.length} 对`}
              {isTodays && !todayCaseDone() && <span className="text-[#ffc800]"> · +{CASE_XP} XP</span>}
            </p>
            <button onClick={finish} className={primaryBtn}>
              {lang === 'en' ? 'Done' : '完成'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
