'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { CalcStep } from '@/data/optionsCourse';

/**
 * 计算器题：输入滑块 + 实时输出。
 * - explore：输出实时可见，按 visit 要求拖过范围后才能继续（不计分）
 * - target：把指定输入拖到正确值；hideOutputs 时先心算，提交后揭晓（计分）
 */

const isZh = (s: string) => /[一-鿿]/.test(s);

export function CalcView({
  step,
  color,
  locked,
  onAnswer,
  onContinue,
}: {
  step: CalcStep;
  color: string;
  locked: boolean;
  onAnswer: (correct: boolean, explain: string) => void;
  onContinue: () => void;
}) {
  const zh = isZh(step.prompt);
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(step.inputs.map((i) => [i.key, i.start])),
  );
  const [seen, setSeen] = useState<Record<string, [number, number]>>(() =>
    Object.fromEntries(step.inputs.map((i) => [i.key, [i.start, i.start]])),
  );
  const [submitted, setSubmitted] = useState(false);

  const isTarget = step.mode === 'target';
  const frozen = isTarget && (locked || submitted);
  const outputsVisible = !isTarget || !step.target?.hideOutputs || locked || submitted;

  const visitDone = Object.entries(step.visit ?? {}).every(
    ([k, [lo, hi]]) => (seen[k]?.[0] ?? Infinity) <= lo && (seen[k]?.[1] ?? -Infinity) >= hi,
  );

  function move(key: string, v: number) {
    if (frozen) return;
    setValues((p) => ({ ...p, [key]: v }));
    setSeen((p) => ({ ...p, [key]: [Math.min(p[key][0], v), Math.max(p[key][1], v)] }));
  }

  function check() {
    if (submitted || !step.target) return;
    setSubmitted(true);
    const ok = Math.abs(values[step.target.key] - step.target.answer) <= step.target.tolerance + 1e-9;
    onAnswer(ok, step.explain);
  }

  return (
    <div className="py-8">
      <p className="mb-1 text-sm font-bold text-[var(--muted-foreground)]">
        {isTarget ? (zh ? '拖到你认为的位置' : 'Drag to your answer') : zh ? '动手试试' : 'Try it'}
      </p>
      <h2 className="mb-5 text-xl font-extrabold leading-snug sm:text-2xl">{step.prompt}</h2>

      <div className="rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-4">
        {step.display && (
          <div className="mb-4 rounded-xl bg-[var(--muted)] px-3 py-2.5 text-center font-mono text-sm font-bold">{step.display}</div>
        )}

        {/* 输入 */}
        <div className="space-y-4">
          {step.inputs.map((inp) => (
            <div key={inp.key}>
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-extrabold text-[var(--muted-foreground)]">{inp.label}</span>
                <span className="text-lg font-extrabold tabular-nums">{inp.format(values[inp.key])}</span>
              </div>
              {!inp.fixed && (
                <input
                  type="range"
                  min={inp.min}
                  max={inp.max}
                  step={inp.step}
                  value={values[inp.key]}
                  disabled={frozen}
                  onChange={(e) => move(inp.key, Number(e.target.value))}
                  aria-label={inp.label}
                  data-input={inp.key}
                  className="mt-1 w-full cursor-pointer"
                  style={{ accentColor: color }}
                />
              )}
            </div>
          ))}
        </div>

        {/* 输出 */}
        <div className="mt-4 grid gap-2 border-t-2 border-dashed border-[var(--border)] pt-4">
          {step.outputs.map((out) => (
            <div key={out.label} className="flex items-baseline justify-between gap-3">
              <span className="text-xs font-extrabold text-[var(--muted-foreground)]">{out.label}</span>
              <motion.span
                key={outputsVisible ? 'shown' : 'hidden'}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                className={`${out.main ? 'text-2xl' : 'text-base'} font-extrabold tabular-nums`}
                style={{ color: out.main && outputsVisible ? color : undefined }}
              >
                {outputsVisible ? out.format(out.value(values)) : '?'}
              </motion.span>
            </div>
          ))}
        </div>
      </div>

      {/* 探索任务 */}
      {!isTarget && step.visit && (
        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs font-bold">
          {Object.entries(step.visit).map(([k, [lo, hi]]) => {
            const inp = step.inputs.find((i) => i.key === k);
            if (!inp) return null;
            const okLo = seen[k][0] <= lo;
            const okHi = seen[k][1] >= hi;
            return (
              <span key={k} className="flex gap-3">
                {lo > inp.min - 1e-9 && lo !== inp.start && (
                  <span className={okLo ? 'text-[#58a700]' : 'text-[var(--muted-foreground)]'}>
                    {okLo ? '✓' : '○'} {zh ? `${inp.label}拖到 ${inp.format(lo)} 以下` : `${inp.label} to ${inp.format(lo)} or less`}
                  </span>
                )}
                {hi !== inp.start && (
                  <span className={okHi ? 'text-[#58a700]' : 'text-[var(--muted-foreground)]'}>
                    {okHi ? '✓' : '○'} {zh ? `${inp.label}拖到 ${inp.format(hi)} 以上` : `${inp.label} to ${inp.format(hi)} or more`}
                  </span>
                )}
              </span>
            );
          })}
        </div>
      )}
      {!isTarget && visitDone && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-2xl border-2 border-[#a5ed6e] bg-[#f1ffe6] p-4 text-sm leading-relaxed text-[#3d7a00] dark:bg-[#1f3300] dark:text-[#b8f28a]"
        >
          {step.explain}
        </motion.p>
      )}

      <button
        onClick={isTarget ? check : onContinue}
        disabled={isTarget ? submitted || locked : !visitDone}
        className="mt-6 w-full rounded-2xl border-b-4 py-4 text-lg font-extrabold uppercase tracking-wide text-white transition active:translate-y-0.5 active:border-b-2 disabled:cursor-not-allowed disabled:opacity-40"
        style={{ backgroundColor: color, borderColor: 'rgba(0,0,0,0.2)' }}
      >
        {isTarget ? (zh ? '检查' : 'Check') : zh ? '继续' : 'Continue'}
      </button>
    </div>
  );
}
