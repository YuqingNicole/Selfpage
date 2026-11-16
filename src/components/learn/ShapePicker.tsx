'use client';

import { useState } from 'react';
import type { ShapeStep } from '@/data/optionsCourse';
import { payoffGeometry } from './PayoffSlider';

/**
 * 选形状：四张迷你到期损益图，选出与题目描述匹配的一张。
 * 每张图各自缩放纵轴——比的是「形状」，不是数值大小。作答后揭晓每张图的名字。
 */

const BOX = { w: 150, h: 92, pad: { l: 6, r: 6, t: 8, b: 8 } };

const isZh = (s: string) => /[一-鿿]/.test(s);

export function ShapePickerView({
  step,
  color,
  locked,
  onAnswer,
}: {
  step: ShapeStep;
  color: string;
  locked: boolean;
  onAnswer: (correct: boolean, explain: string) => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const zh = isZh(step.question);

  function pick(i: number) {
    if (locked || picked !== null) return;
    setPicked(i);
    onAnswer(i === step.correct, step.explain);
  }

  return (
    <div className="py-8">
      <p className="mb-1 text-sm font-bold text-[var(--muted-foreground)]">{zh ? '选出对应的损益图' : 'Pick the matching payoff'}</p>
      <h2 className="mb-6 text-xl font-extrabold leading-snug sm:text-2xl">{step.question}</h2>
      <div className="grid grid-cols-2 gap-3">
        {step.options.map((opt, i) => {
          const g = payoffGeometry(opt.legs, opt.premium, 100, step.range, BOX);
          const answered = picked !== null;
          const isRight = i === step.correct;
          const border = !answered
            ? 'border-[var(--border)] hover:bg-[var(--muted)]'
            : i === picked
              ? isRight
                ? 'border-[#a5ed6e] bg-[#d7ffb8] dark:bg-[#1f3300]'
                : 'border-[#ffb2b2] bg-[#ffdfe0] dark:bg-[#3a1515]'
              : isRight
                ? 'border-[#a5ed6e]'
                : 'border-[var(--border)] opacity-50';
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              disabled={answered}
              aria-label={answered ? opt.label : `${zh ? '图' : 'Chart'} ${i + 1}`}
              className={`rounded-2xl border-2 border-b-4 bg-[var(--card)] p-2 transition active:translate-y-0.5 active:border-b-2 disabled:pointer-events-none ${border}`}
            >
              <svg viewBox={`0 0 ${BOX.w} ${BOX.h}`} className="w-full" aria-hidden>
                <line x1={BOX.pad.l} x2={BOX.w - BOX.pad.r} y1={g.zeroY} y2={g.zeroY} stroke="var(--muted-foreground)" strokeOpacity={0.5} />
                {g.posPolys.map((p, k) => <polygon key={`p${k}`} points={p} fill="rgba(88,204,2,0.22)" />)}
                {g.negPolys.map((p, k) => <polygon key={`n${k}`} points={p} fill="rgba(255,75,75,0.18)" />)}
                <path d={g.curve} fill="none" stroke={color} strokeWidth={3} strokeLinejoin="round" />
              </svg>
              <p className={`mt-1 h-5 text-center text-xs font-extrabold ${answered ? '' : 'text-[var(--muted-foreground)]'}`}>
                {answered ? opt.label : i + 1}
              </p>
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-center text-[11px] font-bold text-[var(--muted-foreground)]">
        {zh ? '横轴：到期股价　纵轴：盈亏　绿色赚、红色亏' : 'x: price at expiry · y: P/L · green = profit, red = loss'}
      </p>
    </div>
  );
}
