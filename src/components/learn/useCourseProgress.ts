'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  lessonOrder,
  XP_PER_LESSON,
  XP_PERFECT_BONUS,
  XP_REVIEW,
} from '@/data/optionsCourse';

const STORAGE_KEY = 'options-course-progress-v1';

export interface CourseProgress {
  xp: number;
  completed: string[];
  perfect: string[];
  streak: number;
  lastPracticeDay: string; // YYYY-MM-DD
}

const emptyProgress: CourseProgress = {
  xp: 0,
  completed: [],
  perfect: [],
  streak: 0,
  lastPracticeDay: '',
};

function todayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
}

function yesterdayString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
}

function load(): CourseProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress;
    const parsed = JSON.parse(raw) as Partial<CourseProgress>;
    return {
      xp: typeof parsed.xp === 'number' ? parsed.xp : 0,
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
      perfect: Array.isArray(parsed.perfect) ? parsed.perfect : [],
      streak: typeof parsed.streak === 'number' ? parsed.streak : 0,
      lastPracticeDay: typeof parsed.lastPracticeDay === 'string' ? parsed.lastPracticeDay : '',
    };
  } catch {
    return emptyProgress;
  }
}

export function useCourseProgress() {
  const [progress, setProgress] = useState<CourseProgress>(emptyProgress);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProgress(load());
    setLoaded(true);
  }, []);

  const persist = useCallback((next: CourseProgress) => {
    setProgress(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // localStorage 不可用时静默降级为内存态
    }
  }, []);

  /** 完成一课：记进度、发 XP、更新连胜。返回本次获得的 XP。 */
  const completeLesson = useCallback(
    (lessonId: string, perfectRun: boolean): number => {
      const current = load();
      const isReview = current.completed.includes(lessonId);
      let earned = isReview ? XP_REVIEW : XP_PER_LESSON;
      if (perfectRun && !current.perfect.includes(lessonId)) earned += XP_PERFECT_BONUS;

      const today = todayString();
      let streak = current.streak;
      if (current.lastPracticeDay !== today) {
        streak = current.lastPracticeDay === yesterdayString() ? streak + 1 : 1;
      }

      persist({
        xp: current.xp + earned,
        completed: isReview ? current.completed : [...current.completed, lessonId],
        perfect:
          perfectRun && !current.perfect.includes(lessonId)
            ? [...current.perfect, lessonId]
            : current.perfect,
        streak,
        lastPracticeDay: today,
      });
      return earned;
    },
    [persist],
  );

  const resetProgress = useCallback(() => {
    persist(emptyProgress);
  }, [persist]);

  const isUnlocked = useCallback(
    (lessonId: string): boolean => {
      const idx = lessonOrder.indexOf(lessonId);
      if (idx <= 0) return true;
      return progress.completed.includes(lessonOrder[idx - 1]);
    },
    [progress.completed],
  );

  /** 连胜是否因为昨天没练习而中断（仅用于展示） */
  const streakAlive =
    progress.lastPracticeDay === todayString() || progress.lastPracticeDay === yesterdayString();

  return { progress, loaded, completeLesson, resetProgress, isUnlocked, streakAlive };
}
