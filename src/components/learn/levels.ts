'use client';

/**
 * 等级头衔：用累计 XP 映射成身份阶梯。
 * 升级由 OptionsCourseApp 监听 XP 跨越阈值触发仪式。
 */

export interface LevelDef {
  xp: number;
  zh: string;
  en: string;
  emoji: string;
}

export const LEVELS: LevelDef[] = [
  { xp: 0, zh: '实习分析师', en: 'Intern Analyst', emoji: '🐣' },
  { xp: 60, zh: '判断学徒', en: 'Judgment Apprentice', emoji: '📖' },
  { xp: 150, zh: '数据侦探', en: 'Data Detective', emoji: '🔍' },
  { xp: 300, zh: '财报读心师', en: 'Filings Whisperer', emoji: '🧾' },
  { xp: 500, zh: '边际猎手', en: 'Margin Hunter', emoji: '🎯' },
  { xp: 800, zh: '叙事拆解者', en: 'Narrative Breaker', emoji: '🧨' },
  { xp: 1200, zh: '周期观察员', en: 'Cycle Watcher', emoji: '🌊' },
  { xp: 1800, zh: '独立判断者', en: 'Independent Mind', emoji: '🧭' },
  { xp: 2600, zh: '框架大师', en: 'Framework Master', emoji: '🏛️' },
  { xp: 3600, zh: '首席判断官', en: 'Chief Judgment Officer', emoji: '👑' },
];

export function levelForXp(xp: number): { index: number; level: LevelDef; next: LevelDef | null } {
  let index = 0;
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xp) {
      index = i;
      break;
    }
  }
  return { index, level: LEVELS[index], next: LEVELS[index + 1] ?? null };
}
