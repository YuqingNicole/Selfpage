'use client';

import { useCallback, useEffect, useState } from 'react';
import { findLesson, isClassicExercise, type Exercise, type Lesson, type Unit } from '@/data/optionsCourse';

/**
 * 错题本 + 间隔重复（简化 Leitner 盒子）
 * - 答错：进入盒子 0，当天即到期，等待复习
 * - 复习/课程中答对：升一个盒子，按间隔表推迟下次到期
 * - 连续答对升到盒子 5：判定「已掌握」，移出复习队列
 */

const STORAGE_KEY = 'options-course-srs-v1';

/** 盒子序号 → 距下次复习的天数 */
const INTERVALS = [1, 2, 4, 7, 15];
export const MASTERY_BOX = 5;
export const REVIEW_SESSION_SIZE = 10;

export interface SrsRecord {
  box: number;
  wrong: number;
  due: string; // YYYY-MM-DD
  mastered: boolean;
}

type SrsItems = Record<string, SrsRecord>;

export interface TrackedExercise {
  key: string;
  exercise: Exercise;
  unit: Unit;
  lesson: Lesson;
  record: SrsRecord;
}

function dayString(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
}

function load(): SrsItems {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as SrsItems) : {};
  } catch {
    return {};
  }
}

/** 简单题的题号带 `s` 前缀（lessonId:s0），与进阶题（lessonId:0）区分，避免错题本串题。 */
export const SIMPLE_KEY_PREFIX = 's';

/** 新版课程流的题号带 `f` 前缀（lessonId:f4 → steps[4]） */
export const FLOW_KEY_PREFIX = 'f';

/** 按 key 的题号部分从课程里取题：`3` → exercises[3]，`s3` → simpleExercises[3]，`f3` → steps[3]（仅经典题型入错题本） */
export function exerciseForKey(lesson: Lesson, indexPart: string): Exercise | undefined {
  if (indexPart.startsWith(FLOW_KEY_PREFIX)) {
    const step = lesson.steps?.[Number(indexPart.slice(FLOW_KEY_PREFIX.length))];
    return step && isClassicExercise(step) ? step : undefined;
  }
  if (indexPart.startsWith(SIMPLE_KEY_PREFIX)) {
    return lesson.simpleExercises?.[Number(indexPart.slice(SIMPLE_KEY_PREFIX.length))];
  }
  return lesson.exercises[Number(indexPart)];
}

/** 拆分题目 key：lessonId + 题号部分 */
export function splitKey(key: string): { lessonId: string; indexPart: string } | null {
  const sep = key.lastIndexOf(':');
  if (sep === -1) return null;
  return { lessonId: key.slice(0, sep), indexPart: key.slice(sep + 1) };
}

/** 题目 key（lessonId:题目序号）→ 题目与所属课程 */
export function resolveKey(key: string): { exercise: Exercise; unit: Unit; lesson: Lesson } | null {
  const parts = splitKey(key);
  if (!parts) return null;
  const found = findLesson(parts.lessonId);
  const exercise = found ? exerciseForKey(found.lesson, parts.indexPart) : undefined;
  if (!found || !exercise) return null;
  return { exercise, unit: found.unit, lesson: found.lesson };
}

/** 题干摘要，用于错题本列表展示 */
export function exerciseSummary(ex: Exercise): string {
  switch (ex.type) {
    case 'choice':
      return ex.display ? `${ex.display} — ${ex.question}` : ex.question;
    case 'tf':
      return ex.statement;
    case 'fill':
      return `${ex.before}____${ex.after}`;
    case 'match':
      return ex.prompt;
  }
}

export function useSrs() {
  const [items, setItems] = useState<SrsItems>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(load());
    setLoaded(true);
  }, []);

  const persist = useCallback((next: SrsItems) => {
    setItems(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // 存储不可用时静默降级
    }
  }, []);

  /** 记录一次作答。答错 → 入册/重置；答对 → 已在册的题升盒子。配对题不入册。 */
  const recordResult = useCallback(
    (key: string, correct: boolean) => {
      const resolved = resolveKey(key);
      if (!resolved || resolved.exercise.type === 'match') return;
      const current = load();
      const existing = current[key];

      if (!correct) {
        current[key] = {
          box: 0,
          wrong: (existing?.wrong ?? 0) + 1,
          due: dayString(0),
          mastered: false,
        };
        persist(current);
        return;
      }

      if (!existing || existing.mastered) return;
      const box = existing.box + 1;
      if (box >= MASTERY_BOX) {
        current[key] = { ...existing, box, mastered: true };
      } else {
        current[key] = { ...existing, box, due: dayString(INTERVALS[Math.min(box, INTERVALS.length - 1)]) };
      }
      persist(current);
    },
    [persist],
  );

  const resetSrs = useCallback(() => persist({}), [persist]);

  const tracked: TrackedExercise[] = Object.entries(items)
    .map(([key, record]) => {
      const resolved = resolveKey(key);
      return resolved ? { key, record, ...resolved } : null;
    })
    .filter((t): t is TrackedExercise => t !== null);

  const book = tracked.filter((t) => !t.record.mastered).sort((a, b) => a.record.due.localeCompare(b.record.due));
  const today = dayString(0);
  const due = book.filter((t) => t.record.due <= today);
  const masteredCount = tracked.filter((t) => t.record.mastered).length;

  /** 组一节复习课：到期错题优先，不足时用未到期的错题补齐 */
  const buildReviewSession = useCallback((): { key: string; exercise: Exercise }[] => {
    const pick = [...due, ...book.filter((t) => t.record.due > today)].slice(0, REVIEW_SESSION_SIZE);
    return pick.map((t) => ({ key: t.key, exercise: t.exercise }));
  }, [due, book, today]);

  return { loaded, book, due, masteredCount, recordResult, buildReviewSession, resetSrs };
}
