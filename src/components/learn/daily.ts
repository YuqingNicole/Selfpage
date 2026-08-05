'use client';

/**
 * 每日任务：学一课 / 清错题 / 实验室跑一个案例。
 * 三项全完成可开宝箱（+20 XP），每攒 3 个宝箱送 1 张连胜冻结卡。
 */

const STORAGE_KEY = 'options-course-daily-v1';

export const CHEST_XP = 20;
export const CHESTS_PER_FREEZE = 3;

export type DailyTask = 'lesson' | 'review' | 'lab';

export interface DailyState {
  day: string;
  lesson: boolean;
  review: boolean;
  lab: boolean;
  chestClaimed: boolean;
  totalChests: number;
}

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
}

export function loadDaily(): DailyState {
  const fresh: DailyState = {
    day: todayStr(),
    lesson: false,
    review: false,
    lab: false,
    chestClaimed: false,
    totalChests: 0,
  };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fresh;
    const parsed = JSON.parse(raw) as DailyState;
    if (parsed.day !== todayStr()) {
      // 新的一天：任务清零，宝箱总数保留
      return { ...fresh, totalChests: parsed.totalChests ?? 0 };
    }
    return { ...fresh, ...parsed };
  } catch {
    return fresh;
  }
}

function save(state: DailyState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

/** 标记完成一项每日任务 */
export function markDaily(task: DailyTask) {
  const state = loadDaily();
  if (state[task]) return;
  state[task] = true;
  save(state);
}

export function allDone(state: DailyState): boolean {
  return state.lesson && state.review && state.lab;
}

/**
 * 开宝箱。返回 { xp, freezeEarned }；不可开时返回 null。
 * 冻结卡的入账由调用方写进课程进度存储。
 */
export function claimChest(): { xp: number; freezeEarned: boolean } | null {
  const state = loadDaily();
  if (!allDone(state) || state.chestClaimed) return null;
  state.chestClaimed = true;
  state.totalChests += 1;
  save(state);
  return { xp: CHEST_XP, freezeEarned: state.totalChests % CHESTS_PER_FREEZE === 0 };
}
