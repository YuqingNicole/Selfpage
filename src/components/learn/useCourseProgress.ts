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
  developerMode: boolean;
  /** 连胜冻结卡数量：漏打卡一天时自动消耗一张保住连胜 */
  freezes: number;
}

const emptyProgress: CourseProgress = {
  xp: 0,
  completed: [],
  perfect: [],
  streak: 0,
  lastPracticeDay: '',
  developerMode: false,
  freezes: 0,
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

function dayBeforeYesterdayString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 2);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
}

/** 计算新连胜；漏了一天且有冻结卡时消耗一张保住连胜 */
function nextStreak(current: CourseProgress): { streak: number; freezes: number } {
  const today = todayString();
  if (current.lastPracticeDay === today) return { streak: current.streak, freezes: current.freezes };
  if (current.lastPracticeDay === yesterdayString())
    return { streak: current.streak + 1, freezes: current.freezes };
  if (current.lastPracticeDay === dayBeforeYesterdayString() && current.freezes > 0)
    return { streak: current.streak + 1, freezes: current.freezes - 1 };
  return { streak: 1, freezes: current.freezes };
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
      developerMode: Boolean(parsed.developerMode),
      freezes: typeof parsed.freezes === 'number' ? parsed.freezes : 0,
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

      const { streak, freezes } = nextStreak(current);

      persist({
        xp: current.xp + earned,
        completed: isReview ? current.completed : [...current.completed, lessonId],
        perfect:
          perfectRun && !current.perfect.includes(lessonId)
            ? [...current.perfect, lessonId]
            : current.perfect,
        streak,
        lastPracticeDay: todayString(),
        developerMode: current.developerMode,
        freezes,
      });
      return earned;
    },
    [persist],
  );

  /** 完成一次错题复习：发放 XP 并更新连胜 */
  const completeReview = useCallback((): number => {
    const current = load();
    const { streak, freezes } = nextStreak(current);
    persist({ ...current, xp: current.xp + XP_REVIEW, streak, freezes, lastPracticeDay: todayString() });
    return XP_REVIEW;
  }, [persist]);

  /** 宝箱等额外奖励：加 XP，可附带发放连胜冻结卡 */
  const grantReward = useCallback(
    (xp: number, freezeCards = 0) => {
      const current = load();
      persist({ ...current, xp: current.xp + xp, freezes: current.freezes + freezeCards });
    },
    [persist],
  );

  const resetProgress = useCallback(() => {
    persist(emptyProgress);
  }, [persist]);

  const toggleDeveloperMode = useCallback(() => {
    persist({ ...progress, developerMode: !progress.developerMode });
  }, [persist, progress]);

  const isUnlocked = useCallback(
    (lessonId: string): boolean => {
      if (progress.developerMode) return true;
      const idx = lessonOrder.indexOf(lessonId);
      if (idx <= 0) return true;
      return progress.completed.includes(lessonOrder[idx - 1]);
    },
    [progress.completed, progress.developerMode],
  );

  /** 连胜是否因为昨天没练习而中断（仅用于展示） */
  const streakAlive =
    progress.lastPracticeDay === todayString() || progress.lastPracticeDay === yesterdayString();

  return {
    progress,
    loaded,
    completeLesson,
    completeReview,
    grantReward,
    resetProgress,
    toggleDeveloperMode,
    isUnlocked,
    streakAlive,
  };
}
