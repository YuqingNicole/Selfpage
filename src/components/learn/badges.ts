'use client';

import { sfx } from './sounds';

/** 成就徽章：定义、存储与授予 */

const STORAGE_KEY = 'options-course-badges-v1';

export interface BadgeDef {
  id: string;
  emoji: string;
  zh: string;
  en: string;
  zhDesc: string;
  enDesc: string;
}

export const BADGES: BadgeDef[] = [
  { id: 'first_lesson', emoji: '🐣', zh: '破壳', en: 'Hatched', zhDesc: '完成第一课', enDesc: 'Finish your first lesson' },
  { id: 'perfect_lesson', emoji: '🏆', zh: '零失误', en: 'Flawless', zhDesc: '一节课全程无错', enDesc: 'Clear a lesson with zero mistakes' },
  { id: 'streak_7', emoji: '🔥', zh: '七日之火', en: 'Week of Fire', zhDesc: '连续学习 7 天', enDesc: 'Hit a 7-day streak' },
  { id: 'night_owl', emoji: '🌙', zh: '夜猫子', en: 'Night Owl', zhDesc: '凌晨 0-5 点完成一课', enDesc: 'Finish a lesson between midnight and 5am' },
  { id: 'graduate', emoji: '🎓', zh: '毕业生', en: 'Graduate', zhDesc: '修完全部课程', enDesc: 'Complete every lesson' },
  { id: 'mastered_10', emoji: '🧠', zh: '记忆大师', en: 'Memory Master', zhDesc: '错题本毕业 10 道题', enDesc: 'Master 10 questions in the mistake book' },
  { id: 'lab_rat', emoji: '🥼', zh: '实验室老鼠', en: 'Lab Rat', zhDesc: '走完全部经典案例', enDesc: 'Play through every classic case' },
  { id: 'arb_apprentice', emoji: '🔀', zh: '搬砖学徒', en: 'Arb Apprentice', zhDesc: '走完套利工坊全部案例', enDesc: 'Finish every case in the Arb Workshop' },
  { id: 'tuition_paid', emoji: '💸', zh: '学费交齐', en: 'Tuition Paid', zhDesc: '生存挑战首次爆仓', enDesc: 'Blow up your first survival run' },
  { id: 'survivor_52', emoji: '🏄', zh: '幸存者', en: 'Survivor', zhDesc: '生存挑战活过 52 周', enDesc: 'Survive all 52 weeks' },
  { id: 'boss_slayer', emoji: '⚔️', zh: '屠龙者', en: 'Boss Slayer', zhDesc: '击败一个篇章 Boss', enDesc: 'Defeat a chapter boss' },
];

export function loadBadges(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

/** 授予徽章；新解锁返回 true 并播放音效 */
export function awardBadge(id: string): boolean {
  if (!BADGES.some((b) => b.id === id)) return false;
  const owned = loadBadges();
  if (owned[id]) return false;
  owned[id] = new Date().toISOString().slice(0, 10);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(owned));
  } catch {
    /* ignore */
  }
  sfx.badge();
  return true;
}
