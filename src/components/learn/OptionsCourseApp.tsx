'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  arbCourse,
  arbLessonOrder,
  arbTotalLessons,
  findLesson,
  lessonOrder,
  optionsCourse,
  totalLessons,
  type Lesson,
  type Unit,
} from '@/data/optionsCourse';
import { arbCourseEn, optionsCourseEn } from '@/data/optionsCourseEn';
import { investCourse, investLessonOrder, investTotalLessons } from '@/data/investCourse';
import { investCourseEn } from '@/data/investCourseEn';
import { CASE_XP, DailyCase, loadCaseHistory, todayCase, todayCaseDone } from './DailyCase';
import { INVEST_CASES, TAG_LABEL, type InvestCase } from '@/data/investCases';
import { levelForXp } from './levels';
import type { ChestTier } from './daily';
import { loadMemos, MEMO_XP, MemoWorkbench } from './MemoWorkbench';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCourseProgress } from './useCourseProgress';
import { LessonPlayer, ReviewSession, type SessionItem } from './LessonPlayer';
import { exerciseSummary, useSrs } from './useSrs';
import { StrategyLab } from './StrategyLab';
import { ArbLab } from './ArbLab';
import { SurvivalGame } from './SurvivalGame';
import { awardBadge, BADGES, loadBadges } from './badges';
import { isMuted, setMuted, sfx } from './sounds';
import { BossBattle, BOSSES, loadBossWins, type BossDef } from './BossBattle';
import { PredictionGame } from './PredictionGame';
import { allDone, CHESTS_PER_FREEZE, claimChest, loadDaily, markDaily, type DailyState } from './daily';
import { OnboardingFlow, type PlacementResult } from './OnboardingFlow';
import { track } from './analytics';
import { useCloudSync } from './cloudSync';
import { AccountCard } from './AccountCard';

const SAVE_NUDGE_KEY = 'learn-save-nudge-v1';

export function OptionsCourseApp({ variant = 'options', forceLang }: { variant?: 'options' | 'arb' | 'invest'; forceLang?: 'en' | 'zh' }) {
  const isArb = variant === 'arb';
  const isInvest = variant === 'invest';
  const {
    progress,
    loaded,
    completeLesson,
    completeReview,
    grantReward,
    completeMany,
    resetProgress,
    toggleDeveloperMode,
    streakAlive,
  } = useCourseProgress();
  const srs = useSrs();
  const { lang, setLang } = useLanguage();
  useEffect(() => {
    if (forceLang && lang !== forceLang) setLang(forceLang);
  }, [forceLang, lang, setLang]);
  const effectiveLang = forceLang ?? lang;
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [reviewItems, setReviewItems] = useState<SessionItem[] | null>(null);
  const [labOpen, setLabOpen] = useState(false);
  const [arbLabOpen, setArbLabOpen] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const [badges, setBadges] = useState<Record<string, string>>({});
  const [soundOff, setSoundOff] = useState(false);
  const [activeBoss, setActiveBoss] = useState<BossDef | null>(null);
  const [predictionOpen, setPredictionOpen] = useState(false);
  const [bossWins, setBossWins] = useState<Record<string, string>>({});
  const [daily, setDaily] = useState<DailyState | null>(null);
  const [tab, setTab] = useState<'learn' | 'practice' | 'review' | 'me'>('learn');
  const [casePlayer, setCasePlayer] = useState<{ override?: InvestCase } | null>(null);
  const [memoOpen, setMemoOpen] = useState(false);
  const [memoCount, setMemoCount] = useState(0);
  const [caseDoneToday, setCaseDoneToday] = useState(false);
  const [collectedCaseIds, setCollectedCaseIds] = useState<Set<string>>(new Set());
  const [chestReveal, setChestReveal] = useState<{ xp: number; freezeEarned: boolean; tier: ChestTier } | null>(null);
  const [levelUp, setLevelUp] = useState<ReturnType<typeof levelForXp> | null>(null);
  const prevXpRef = useRef<number | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [devTaps, setDevTaps] = useState(0);
  const [nudgeDismissed, setNudgeDismissed] = useState(true);

  // 学习数据变化即触发云端防抖推送（登录时）
  const cloud = useCloudSync(
    `${progress.xp}:${progress.completed.length}:${srs.book.length}:${Object.keys(badges).length}:${daily?.totalChests ?? 0}:${daily?.chestClaimed ?? false}`,
  );

  useEffect(() => {
    try {
      setNudgeDismissed(Boolean(localStorage.getItem(SAVE_NUDGE_KEY)));
    } catch {
      /* ignore */
    }
  }, []);

  // 徽章与静音状态：挂载及任意弹层关闭后刷新
  useEffect(() => {
    if (!activeLessonId && !reviewItems && !labOpen && !gameOpen && !activeBoss && !predictionOpen && !arbLabOpen && !casePlayer && !memoOpen) {
      setBadges(loadBadges());
      setBossWins(loadBossWins());
      setDaily(loadDaily());
      setCaseDoneToday(todayCaseDone());
      setCollectedCaseIds(new Set(loadCaseHistory().map((e) => e.caseId)));
      setMemoCount(loadMemos().length);
    }
  }, [activeLessonId, reviewItems, labOpen, gameOpen, activeBoss, predictionOpen, arbLabOpen, casePlayer, memoOpen]);

  // 等级升迁监听：XP 跨过阈值时触发升级仪式
  useEffect(() => {
    if (!loaded) return;
    if (prevXpRef.current === null) {
      prevXpRef.current = progress.xp;
      return;
    }
    const prev = prevXpRef.current;
    prevXpRef.current = progress.xp;
    if (progress.xp > prev && levelForXp(progress.xp).index > levelForXp(prev).index) {
      const lv = levelForXp(progress.xp);
      track('level_up', { level: lv.index, title: lv.level.en });
      setLevelUp(lv);
    }
  }, [loaded, progress.xp]);

  // 升级仪式排队：开箱弹窗关闭后才登场，避免两个仪式互相叠压
  const levelUpVisible = Boolean(levelUp && !chestReveal);
  useEffect(() => {
    if (levelUpVisible) sfx.levelup();
  }, [levelUpVisible]);
  useEffect(() => setSoundOff(isMuted()), []);
  useEffect(() => {
    if (variant !== 'options' || !loaded) return;
    try {
      const seen = localStorage.getItem('options-onboarding-v1');
      if (seen) return;
      if (progress.completed.length > 0 || progress.xp > 0) {
        localStorage.setItem('options-onboarding-v1', 'existing');
        return;
      }
      setShowOnboarding(true);
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, loaded]);
  useEffect(() => {
    if (srs.masteredCount >= 10 && awardBadge('mastered_10')) setBadges(loadBadges());
  }, [srs.masteredCount]);

  const course = isInvest
    ? effectiveLang === 'en'
      ? investCourseEn
      : investCourse
    : isArb
      ? effectiveLang === 'en'
        ? arbCourseEn
        : arbCourse
      : effectiveLang === 'en'
        ? optionsCourseEn
        : optionsCourse;
  const courseOrder = isInvest ? investLessonOrder : isArb ? arbLessonOrder : lessonOrder;
  const courseTotal = isInvest ? investTotalLessons : isArb ? arbTotalLessons : totalLessons;
  const unitIdSet = new Set(course.map((u) => u.id));

  const isUnlocked = (lessonId: string): boolean => {
    if (progress.developerMode) return true;
    const idx = courseOrder.indexOf(lessonId);
    if (idx <= 0) return true;
    return progress.completed.includes(courseOrder[idx - 1]);
  };

  // 错题本按当前课程过滤（两门课共享同一套记录）
  const srsBook = srs.book.filter((t) => unitIdSet.has(t.unit.id));
  const srsDue = srs.due.filter((t) => unitIdSet.has(t.unit.id));
  const active = useMemo(() => {
    if (!activeLessonId) return null;
    return effectiveLang === 'en' ? findLessonInCourse(course, activeLessonId) : findLesson(activeLessonId);
  }, [activeLessonId, course, effectiveLang]);
  const completedCount = courseOrder.filter((id) => progress.completed.includes(id)).length;
  const ui = effectiveLang === 'en'
    ? {
        title: 'Investing Academy',
        subtitle: isInvest
          ? 'Judgment track · build an investor’s framework a few minutes a day'
          : isArb
            ? 'Arbitrage track · learn arbitrage one level at a time, like Duolingo'
            : 'Options track · learn options trading one level at a time, like Duolingo',
        developerMode: 'Developer Mode',
        on: 'ON',
        off: 'OFF',
        streakTitle: 'Streak',
        streakUnit: 'days',
        xpTitle: 'Total XP',
        progressTitle: 'Course Progress',
        advanced: '⚔️ Advanced',
        mechanics: '🎲 Mechanics · tastylive style',
        onchain: '⛓️ On-Chain · DeFi Arbitrage',
        deriv: '📐 Futures · Interest · Options',
        l2: '🏢 L2 · Understanding Companies',
        l3: '🎭 L3 · What the Market Is Trading',
        l4: '✍️ L4 · Research Habits',
        l5: '🗺️ L5 · Industry Deep-Dives',
        graduateTitle: 'You Graduated!',
        graduateBody: `You finished all ${courseTotal} lessons. Come back anytime to review and lock it in (+5 XP each time).`,
        graduateNext: 'Next step: practice small with a paper account and turn the Greek letters into real intuition.',
        developerBanner: 'Developer mode is on: you can jump into any lesson directly without completing the previous one first.',
        reset: 'Reset learning progress',
        resetConfirm: 'Are you sure you want to clear all learning progress? This cannot be undone.',
        disclaimer: isInvest
          ? 'This course is for educational purposes only and is not investment advice. All cases are historical reviews and do not predict future performance.'
          : isArb
            ? 'This course is for educational purposes only and is not investment advice. On-chain and derivatives trading carry extreme risk of total loss.'
            : 'This course is for educational purposes only and is not investment advice. Options trading is high risk and can result in the loss of your entire principal.',
        start: 'Start',
        completed: 'completed',
        locked: 'locked',
      }
    : {
        title: '投资学园',
        subtitle: isInvest
          ? '判断框架主线 · 每天几分钟，建立自己的投资判断力'
          : isArb
            ? '套利篇 · 像玩多邻国一样，一关一关学会套利'
            : '期权篇 · 像玩多邻国一样，一关一关学会期权交易',
        developerMode: '开发者模式',
        on: '开',
        off: '关',
        streakTitle: '连胜天数',
        streakUnit: '天',
        xpTitle: '总经验值',
        progressTitle: '课程进度',
        advanced: '⚔️ 进阶篇',
        mechanics: '🎲 机制流 · tastylive 风格',
        onchain: '⛓️ 链上篇 · DeFi 套利',
        deriv: '📐 衍生品全景 · 期货 利率 期权',
        l2: '🏢 L2 · 看懂公司',
        l3: '🎭 L3 · 看懂市场在交易什么',
        l4: '✍️ L4 · 形成研究习惯',
        l5: '🗺️ L5 · 产业专题',
        graduateTitle: '恭喜毕业！',
        graduateBody: `你已完成全部 ${courseTotal} 课。随时回来复习任何一课巩固记忆（每次 +5 XP）。`,
        graduateNext: '下一步：用模拟账户小仓位实践，把纸上的希腊字母变成手感。',
        developerBanner: '开发者模式已开启：当前允许直接进入任意章节，不再受上一课完成状态限制。',
        reset: '重置学习进度',
        resetConfirm: '确定要清空全部学习进度吗？此操作不可撤销。',
        disclaimer: isInvest
          ? '本课程仅供教育用途，不构成投资建议。所有案例均为历史复盘，不预测也不代表未来表现。'
          : isArb
            ? '本课程仅供教育用途，不构成投资建议。链上与衍生品交易风险极高，可能损失全部本金。'
            : '本课程仅供教育用途，不构成投资建议。期权交易风险较高，可能损失全部本金。',
        start: '开始',
        completed: '已完成',
        locked: '未解锁',
      };

  const todaysCase = todayCase();
  const dailyCaseCard = isInvest ? (
    <div className="mb-10 flex flex-wrap items-center justify-between gap-3 rounded-3xl border-2 shadow-[0_6px_24px_-10px_rgba(0,0,0,0.18)] transition-shadow hover:shadow-[0_10px_32px_-10px_rgba(0,0,0,0.25)] border-[#ff9600] bg-[var(--card)] p-5">
      <div className="min-w-0">
        <p className="text-base font-extrabold">
          📰 {effectiveLang === 'en' ? 'Case of the Day' : '每日一案'}
          {caseDoneToday && <span className="ml-2 text-sm text-[#58a700]">✅ {effectiveLang === 'en' ? 'done today' : '今日已完成'}</span>}
        </p>
        <p className="mt-1 text-xs font-bold text-[var(--muted-foreground)]">
          {effectiveLang === 'en' ? TAG_LABEL[todaysCase.tag].en : TAG_LABEL[todaysCase.tag].zh} · {effectiveLang === 'en' ? todaysCase.title.en : todaysCase.title.zh}
        </p>
        <p className="mt-1 text-[10px] text-[var(--muted-foreground)]">
          {effectiveLang === 'en'
            ? `A real historical case: make your call first, then see what happened. +${CASE_XP} XP daily`
            : `真实历史案例：先做判断，再看真实结局。每日 +${CASE_XP} XP`}
        </p>
      </div>
      <button
        onClick={() => { track('case_open', { case: todaysCase.id }); setCasePlayer({}); }}
        className="rounded-2xl border-b-4 border-[#cc7800] bg-[#ff9600] px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#ffa41f] active:translate-y-0.5 active:border-b-2"
      >
        {caseDoneToday ? (effectiveLang === 'en' ? 'Replay' : '再看一遍') : effectiveLang === 'en' ? 'Make the call' : '开始判断'}
      </button>
    </div>
  ) : null;

  const chapterDone = (unitIds: string[]) =>
    progress.developerMode ||
    unitIds.every((uid) => {
      const u = course.find((x) => x.id === uid);
      return !!u && u.lessons.every((l) => progress.completed.includes(l.id));
    });

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-32 pt-8">
      {/* 环境光斑：低透明度彩色模糊球，明暗主题都成立 */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-[0.16] blur-3xl"
          style={{ background: isInvest ? '#1cb0f6' : isArb ? '#627eea' : '#58cc02' }}
        />
        <div
          className="absolute -left-32 top-1/3 h-96 w-96 rounded-full opacity-[0.12] blur-3xl"
          style={{ background: isInvest ? '#58cc02' : isArb ? '#ff9600' : '#1cb0f6' }}
        />
        <div className="absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-[#ffc800] opacity-[0.08] blur-3xl" />
      </div>

      {/* 页头 */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-8 text-center"
      >
        <div className="mb-2 text-5xl drop-shadow-sm" aria-hidden>
          {isInvest ? '🦉🧭' : isArb ? '🦉⚡' : '🦉📊'}
        </div>
        <h1 className="text-3xl font-extrabold sm:text-4xl">{ui.title}</h1>
        <p className="mt-2 text-[var(--muted-foreground)]">{ui.subtitle}</p>
      </motion.header>

      {/* 统计栏 */}
      <div className="sticky top-16 z-40 mb-10 rounded-3xl border-2 border-[var(--border)] bg-[var(--card)]/90 px-4 py-3 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur-lg">
        <div className="mb-3 flex items-center justify-end gap-2">
          <button
            onClick={() => {
              const next = !soundOff;
              setMuted(next);
              setSoundOff(next);
            }}
            aria-label={soundOff ? (effectiveLang === 'en' ? 'Unmute sounds' : '开启音效') : (effectiveLang === 'en' ? 'Mute sounds' : '关闭音效')}
            className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-bold text-[var(--muted-foreground)] transition hover:bg-[var(--muted)]"
          >
            {soundOff ? '🔇' : '🔊'}
          </button>

        </div>
        <div className="flex items-center justify-around text-sm font-extrabold">
          <div className="flex items-center gap-1.5" title={ui.streakTitle}>
            <span className="text-xl" aria-hidden>
              🔥
            </span>
            <span className={streakAlive && progress.streak > 0 ? 'text-[#ff9600]' : 'text-[var(--muted-foreground)]'}>
              {loaded ? progress.streak : '–'} {ui.streakUnit}
            </span>
            {loaded && progress.freezes > 0 && (
              <span className="text-xs font-bold text-[#1cb0f6]" title={effectiveLang === 'en' ? 'Streak freezes' : '连胜冻结卡'}>
                🧊×{progress.freezes}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5" title={ui.xpTitle}>
            <span className="text-xl" aria-hidden>
              ⚡
            </span>
            <span className="text-[#ffc800]">{loaded ? progress.xp : '–'} XP</span>
          </div>
          <div className="flex items-center gap-1.5" title={ui.progressTitle}>
            <span className="text-xl" aria-hidden>
              📚
            </span>
            <span className="text-[#1cb0f6]">
              {loaded ? completedCount : '–'}/{courseTotal} {effectiveLang === 'en' ? 'lessons' : '课'}
            </span>
          </div>
        </div>
        {/* 等级头衔 + 升级进度 */}
        {loaded && (() => {
          const lv = levelForXp(progress.xp);
          const pct = lv.next
            ? Math.round(((progress.xp - lv.level.xp) / (lv.next.xp - lv.level.xp)) * 100)
            : 100;
          return (
            <div className="mt-3 flex items-center gap-2 border-t border-[var(--border)] pt-2.5">
              <span className="text-base leading-none" aria-hidden>{lv.level.emoji}</span>
              <span className="shrink-0 text-xs font-extrabold">{effectiveLang === 'en' ? lv.level.en : lv.level.zh}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--muted)]">
                <div className="h-full rounded-full bg-[#ffc800] transition-all duration-700" style={{ width: `${pct}%` }} />
              </div>
              <span className="shrink-0 text-[10px] font-bold text-[var(--muted-foreground)]">
                {lv.next
                  ? effectiveLang === 'en'
                    ? `${lv.next.xp - progress.xp} XP to ${lv.next.emoji}`
                    : `距 ${lv.next.emoji} 还差 ${lv.next.xp - progress.xp} XP`
                  : effectiveLang === 'en' ? 'MAX' : '已登顶'}
              </span>
            </div>
          );
        })()}
      </div>

      {/* Tab 内容切换动效 */}
      <AnimatePresence mode="wait">
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >

      {tab === 'review' && (
        <>
      {/* 每日任务 */}
      {loaded && daily && (
        <div className="mb-10 rounded-3xl border-2 shadow-[0_6px_24px_-10px_rgba(0,0,0,0.18)] border-[#ce82ff] bg-[var(--card)] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-base font-extrabold">📅 {effectiveLang === 'en' ? 'Daily Quests' : '每日任务'}</p>
              <div className="mt-2 flex flex-wrap gap-3 text-xs font-bold">
                <span className={daily.lesson ? 'text-[#58a700]' : 'text-[var(--muted-foreground)]'}>
                  {daily.lesson ? '✅' : '⬜'} {effectiveLang === 'en' ? 'Finish a lesson' : '学完一课'}
                </span>
                <span className={daily.review ? 'text-[#58a700]' : 'text-[var(--muted-foreground)]'}>
                  {daily.review ? '✅' : '⬜'} {effectiveLang === 'en' ? 'Do a review' : '复习错题'}
                </span>
                <span className={daily.lab ? 'text-[#58a700]' : 'text-[var(--muted-foreground)]'}>
                  {daily.lab ? '✅' : '⬜'} {effectiveLang === 'en' ? 'Play a lab case' : '实验室跑一个案例'}
                </span>
              </div>
              <p className="mt-1 text-[10px] text-[var(--muted-foreground)]">
                {effectiveLang === 'en'
                  ? `Mystery chest: 15–80 XP · every ${CHESTS_PER_FREEZE} chests guarantee a 🧊 streak freeze (${daily.totalChests} collected)`
                  : `盲盒宝箱 15-80 XP 随机 · 每攒 ${CHESTS_PER_FREEZE} 个保底送一张 🧊 连胜冻结卡（已攒 ${daily.totalChests} 个）`}
              </p>
            </div>
            <button
              onClick={() => {
                const reward = claimChest();
                if (reward) {
                  track('chest_open', { freeze: reward.freezeEarned, tier: reward.tier, xp: reward.xp });
                  grantReward(reward.xp, reward.freezeEarned ? 1 : 0);
                  setDaily(loadDaily());
                  setChestReveal(reward);
                }
              }}
              disabled={!allDone(daily) || daily.chestClaimed}
              className="rounded-2xl border-b-4 border-[#a568cc] bg-[#ce82ff] px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#d99aff] active:translate-y-0.5 active:border-b-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {daily.chestClaimed
                ? effectiveLang === 'en' ? 'Claimed ✓' : '已开启 ✓'
                : `🎁 ${effectiveLang === 'en' ? 'Open Chest' : '开宝箱'}`}
            </button>
          </div>
        </div>
      )}


        </>
      )}

      {tab === 'practice' && (
        <>
      {/* 每日一案（判断主线） */}
      {dailyCaseCard}

      {/* 案例档案馆（判断主线） */}
      {isInvest && (
        <div className="mb-10 rounded-3xl border-2 shadow-[0_6px_24px_-10px_rgba(0,0,0,0.18)] border-[var(--border)] bg-[var(--card)] p-5">
          <p className="text-base font-extrabold">
            🗂️ {effectiveLang === 'en' ? 'Case Archive' : '案例档案馆'}{' '}
            <span className="text-sm font-bold text-[var(--muted-foreground)]">
              {collectedCaseIds.size}/{INVEST_CASES.length} {effectiveLang === 'en' ? 'collected' : '已收集'}
            </span>
          </p>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
            {effectiveLang === 'en'
              ? 'Every case you finish becomes a collectible card — replay any of them; locked ones unlock the day they rotate in.'
              : '做过的案例会变成收藏卡，可随时重玩；未解锁的等它轮换到的那天。'}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {INVEST_CASES.map((cs) => {
              const owned = collectedCaseIds.has(cs.id);
              return (
                <button
                  key={cs.id}
                  disabled={!owned}
                  onClick={() => {
                    track('case_archive_open', { case: cs.id });
                    setCasePlayer({ override: cs });
                  }}
                  className={`rounded-2xl border-2 p-3 text-left transition ${
                    owned
                      ? 'border-[#ff9600] bg-[#fff7e0] hover:-translate-y-0.5 dark:bg-[#3a3000]'
                      : 'border-[var(--border)] opacity-50'
                  }`}
                >
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-[var(--muted-foreground)]">
                    {owned ? `${effectiveLang === 'en' ? TAG_LABEL[cs.tag].en : TAG_LABEL[cs.tag].zh} · ${cs.date}` : cs.date}
                  </p>
                  <p className="mt-1 text-xs font-extrabold leading-snug">
                    {owned ? (effectiveLang === 'en' ? cs.title.en : cs.title.zh) : `🔒 ${effectiveLang === 'en' ? 'Not yet unlocked' : '未解锁'}`}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Memo 工作台（判断主线） */}
      {isInvest && (
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3 rounded-3xl border-2 shadow-[0_6px_24px_-10px_rgba(0,0,0,0.18)] transition-shadow hover:shadow-[0_10px_32px_-10px_rgba(0,0,0,0.25)] border-[#58cc02] bg-[var(--card)] p-5">
          <div>
            <p className="text-base font-extrabold">
              📝 {effectiveLang === 'en' ? 'Memo Workbench' : 'Memo 工作台'}
              {memoCount > 0 && (
                <span className="ml-2 text-sm font-bold text-[var(--muted-foreground)]">
                  {memoCount} {effectiveLang === 'en' ? 'memos' : '份'}
                </span>
              )}
            </p>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              {effectiveLang === 'en'
                ? `Thesis + graded evidence + a mandatory falsifier + conviction score — the L4 pipeline as a tool. First memo each week +${MEMO_XP} XP.`
                : `一句话 thesis + 分级证据 + 强制证伪条件 + 信念分——L4 流程的工具化。每周第一份 +${MEMO_XP} XP。`}
            </p>
          </div>
          <button
            onClick={() => { track('memo_open'); setMemoOpen(true); }}
            className="rounded-2xl border-b-4 border-[#46a302] bg-[#58cc02] px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#61d904] active:translate-y-0.5 active:border-b-2"
          >
            {effectiveLang === 'en' ? 'Open' : '开始写'}
          </button>
        </div>
      )}

      {/* 策略实验室 */}
      {!isArb && (
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3 rounded-3xl border-2 shadow-[0_6px_24px_-10px_rgba(0,0,0,0.18)] transition-shadow hover:shadow-[0_10px_32px_-10px_rgba(0,0,0,0.25)] border-[#1cb0f6] bg-[var(--card)] p-5">
          <div>
            <p className="text-base font-extrabold">🧪 {effectiveLang === 'en' ? 'Strategy Lab' : '策略实验室'}</p>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              {effectiveLang === 'en'
                ? 'Drag spot / IV / days-to-expiry and watch payoff curves and Greeks respond in real time — 10 strategy presets.'
                : '拖动股价 / IV / 剩余天数，实时观察损益曲线和希腊字母的变化 —— 内置 10 种策略预设。'}
            </p>
          </div>
          <button
            onClick={() => { track('lab_open'); setLabOpen(true); }}
            className="rounded-2xl border-b-4 border-[#1899d6] bg-[#1cb0f6] px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#2bbcff] active:translate-y-0.5 active:border-b-2"
          >
            {effectiveLang === 'en' ? 'Open Lab' : '进入实验室'}
          </button>
        </div>
      )}

      {/* 交易生存挑战 */}
      {!isArb && (
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3 rounded-3xl border-2 shadow-[0_6px_24px_-10px_rgba(0,0,0,0.18)] transition-shadow hover:shadow-[0_10px_32px_-10px_rgba(0,0,0,0.25)] border-[#58cc02] bg-[var(--card)] p-5">
          <div>
            <p className="text-base font-extrabold">🎮 {effectiveLang === 'en' ? 'Survival Challenge' : '交易生存挑战'}</p>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              {effectiveLang === 'en'
                ? '$10,000, 52 weeks, real options math, black swans off the forecast. How long can you last?'
                : '$10,000 资金、52 周行情、真实期权数学结算，黑天鹅从不预告。你能活多久？'}
            </p>
          </div>
          <button
            onClick={() => { track('game_open'); setGameOpen(true); }}
            className="rounded-2xl border-b-4 border-[#46a302] bg-[#58cc02] px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#61d904] active:translate-y-0.5 active:border-b-2"
          >
            {effectiveLang === 'en' ? 'Play' : '开始挑战'}
          </button>
        </div>
      )}

      {/* 套利工坊 */}
      {isArb && (
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3 rounded-3xl border-2 shadow-[0_6px_24px_-10px_rgba(0,0,0,0.18)] transition-shadow hover:shadow-[0_10px_32px_-10px_rgba(0,0,0,0.25)] border-[#627eea] bg-[var(--card)] p-5">
          <div>
            <p className="text-base font-extrabold">⚡ {effectiveLang === 'en' ? 'Arb Workshop' : '套利工坊'}</p>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              {effectiveLang === 'en'
                ? 'Funding-carry simulator (leverage vs wick survival) + 5 real cases with field checklists: the 300% APY bait, USDC weekend, UST spiral, stETH discount, funding flips.'
                : '资金费模拟器（杠杆 vs 插针存活）+ 5 个真实案例与实战清单：300% 年化诱饵、USDC 脱锚周末、UST 螺旋、stETH 折价、费率转负。'}
            </p>
          </div>
          <button
            onClick={() => { track('arb_lab_open'); setArbLabOpen(true); }}
            className="rounded-2xl border-b-4 border-[#4c63bb] bg-[#627eea] px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#7289ef] active:translate-y-0.5 active:border-b-2"
          >
            {effectiveLang === 'en' ? 'Enter' : '进入工坊'}
          </button>
        </div>
      )}

      {/* 预测小游戏 */}
      {!isArb && (
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3 rounded-3xl border-2 shadow-[0_6px_24px_-10px_rgba(0,0,0,0.18)] transition-shadow hover:shadow-[0_10px_32px_-10px_rgba(0,0,0,0.25)] border-[#ffc800] bg-[var(--card)] p-5">
          <div>
            <p className="text-base font-extrabold">🎲 {effectiveLang === 'en' ? 'Can You Predict the Market?' : '你能预测市场吗？'}</p>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              {effectiveLang === 'en'
                ? 'Guess 10 chart continuations. Most people land at ~50% — find out why pros trade mechanics instead.'
                : '连猜 10 段走势的方向。大多数人 ≈50%——亲身体会为什么职业玩家不猜方向、只玩机制。'}
            </p>
          </div>
          <button
            onClick={() => { track('prediction_open'); setPredictionOpen(true); }}
            className="rounded-2xl border-b-4 border-[#d4a600] bg-[#ffc800] px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#ffd21f] active:translate-y-0.5 active:border-b-2"
          >
            {effectiveLang === 'en' ? 'Try It' : '试试手气'}
          </button>
        </div>
      )}


        </>
      )}

      {tab === 'me' && (
        <>
      {/* 账户与云同步 */}
      {cloud.enabled && <AccountCard cloud={cloud} lang={effectiveLang} />}

      {/* 其他课程入口 */}
      {(
        [
          {
            key: 'invest',
            href: '/learn/investing',
            zh: '🧭 判断框架主线',
            en: '🧭 Judgment Track',
            zhDesc: '从市场语言到产业专题——每日一案 + Memo 工作台 + 判断框架 L1-L5 完整主线。',
            enDesc: 'From market language to industry deep-dives — the daily case, the memo workbench and the complete L1-L5 judgment course.',
          },
          {
            key: 'options',
            href: '/learn/options',
            zh: '🦉 期权篇',
            en: '🦉 Options Track',
            zhDesc: '16 个单元的期权课：希腊字母、tastylive 机制、策略实验室与生存挑战。',
            enDesc: '16 units of options: Greeks, tastylive mechanics, Strategy Lab and the Survival Challenge.',
          },
          {
            key: 'arb',
            href: '/learn/arbitrage',
            zh: '⚡ 套利篇',
            en: '⚡ Arbitrage Track',
            zhDesc: '独立的套利课程：AMM、资金费、MEV 防御，还有套利工坊。',
            enDesc: 'The standalone arbitrage course: AMM, funding carry, MEV defense, plus the Arb Workshop.',
          },
        ] as const
      )
        .filter((tk) => tk.key !== variant)
        .map((tk) => (
          <a
            key={tk.key}
            href={tk.href}
            className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--card)] p-5 transition hover:border-[#1cb0f6] last-of-type:mb-10"
          >
            <div>
              <p className="text-base font-extrabold">{effectiveLang === 'en' ? tk.en : tk.zh}</p>
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">{effectiveLang === 'en' ? tk.enDesc : tk.zhDesc}</p>
            </div>
            <span className="text-sm font-extrabold text-[#1cb0f6]">{effectiveLang === 'en' ? 'Visit →' : '前往 →'}</span>
          </a>
        ))}

      {/* 成就徽章墙 */}
      <details className="mb-10 rounded-3xl border-2 shadow-[0_6px_24px_-10px_rgba(0,0,0,0.18)] border-[var(--border)] bg-[var(--card)] p-5">
        <summary className="cursor-pointer text-base font-extrabold">
          🏅 {effectiveLang === 'en' ? 'Badges' : '成就徽章'}{' '}
          <span className="text-sm font-bold text-[var(--muted-foreground)]">
            {Object.keys(badges).length}/{BADGES.length}
          </span>
        </summary>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {BADGES.map((b) => {
            const owned = badges[b.id];
            return (
              <div
                key={b.id}
                className={`rounded-2xl border-2 p-3 text-center ${
                  owned ? 'border-[#ffc800] bg-[#fff7e0] dark:bg-[#3a3000]' : 'border-[var(--border)] opacity-50'
                }`}
              >
                <div className="text-3xl" aria-hidden>{owned ? b.emoji : '🔒'}</div>
                <p className="mt-1 text-sm font-extrabold">{effectiveLang === 'en' ? b.en : b.zh}</p>
                <p className="mt-0.5 text-[10px] leading-snug text-[var(--muted-foreground)]">
                  {effectiveLang === 'en' ? b.enDesc : b.zhDesc}
                </p>
                {owned && <p className="mt-1 text-[10px] font-bold text-[#b58900]">{owned}</p>}
              </div>
            );
          })}
        </div>
      </details>

      {/* 反馈入口 */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-3 rounded-3xl border-2 shadow-[0_6px_24px_-10px_rgba(0,0,0,0.18)] transition-shadow hover:shadow-[0_10px_32px_-10px_rgba(0,0,0,0.25)] border-[var(--border)] bg-[var(--card)] p-5">
        <div>
          <p className="text-base font-extrabold">💬 {effectiveLang === 'en' ? 'Feedback' : '反馈与共建'}</p>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
            {effectiveLang === 'en'
              ? 'Found a bug, a confusing lesson, or have an idea? Come tell us — every note shapes the course.'
              : '发现 bug、觉得哪课讲得不清楚、或者有想法？来群里聊——每条反馈都会影响课程。'}
          </p>
        </div>
        <a
          href="https://discord.gg/tqE5Tbcz"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('feedback_open')}
          className="rounded-2xl border-b-4 border-[#4752c4] bg-[#5865f2] px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#6773f5] active:translate-y-0.5 active:border-b-2"
        >
          Discord
        </a>
      </div>

        </>
      )}

      {tab === 'review' && (
        <>
      {/* 错题本 · 间隔重复 */}
      {loaded && srs.loaded && (srsBook.length > 0 || srs.masteredCount > 0) && (
        <div className="mb-10 rounded-3xl border-2 shadow-[0_6px_24px_-10px_rgba(0,0,0,0.18)] border-[#f59f00] bg-[var(--card)] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-base font-extrabold">
                {effectiveLang === 'en' ? '📒 Mistake Book' : '📒 错题本'}
                {srsDue.length > 0 && (
                  <span className="ml-2 rounded-full bg-[#ff4b4b] px-2 py-0.5 text-xs font-extrabold text-white">
                    {effectiveLang === 'en' ? `${srsDue.length} due` : `${srsDue.length} 道待复习`}
                  </span>
                )}
              </p>
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                {effectiveLang === 'en'
                  ? `${srsBook.length} missed · ${srsDue.length} due today · ${srs.masteredCount} mastered — scheduled on the forgetting curve: 5 correct in a row = mastered`
                  : `错题 ${srsBook.length} 道 · 今日到期 ${srsDue.length} 道 · 已掌握 ${srs.masteredCount} 道 —— 按遗忘曲线安排：连对 5 次即为掌握`}
              </p>
            </div>
            <button
              onClick={() => {
                const pool = [...srsDue, ...srsBook.filter((t) => !srsDue.includes(t))].slice(0, 10);
                const items = pool.map(({ key, exercise }) => {
                  const sep = key.lastIndexOf(':');
                  const found = findLessonInCourse(course, key.slice(0, sep));
                  return { key, exercise: found?.lesson.exercises[Number(key.slice(sep + 1))] ?? exercise };
                });
                setReviewItems(items);
              }}
              disabled={srsBook.length === 0}
              className={`rounded-2xl border-b-4 px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white transition active:translate-y-0.5 active:border-b-2 ${
                srsDue.length > 0
                  ? 'border-[#c47f00] bg-[#f59f00] hover:bg-[#ffab0f]'
                  : 'border-[var(--border)] bg-[var(--muted-foreground)] opacity-60'
              } disabled:cursor-not-allowed disabled:opacity-40`}
            >
              {srsDue.length > 0
                ? effectiveLang === 'en'
                  ? 'Smart Review'
                  : '开始智能复习'
                : effectiveLang === 'en'
                  ? 'Review Early'
                  : '提前复习'}
            </button>
          </div>
          {srsBook.length > 0 && (
            <details className="mt-3">
              <summary className="cursor-pointer text-xs font-bold text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                {effectiveLang === 'en' ? 'View missed questions' : '查看错题列表'}
              </summary>
              <ul className="mt-2 space-y-2">
                {srsBook.map((t) => {
                  const sep = t.key.lastIndexOf(':');
                  const localized =
                    findLessonInCourse(course, t.key.slice(0, sep))?.lesson.exercises[
                      Number(t.key.slice(sep + 1))
                    ] ?? t.exercise;
                  return (
                    <li
                      key={t.key}
                      className="flex items-start gap-2 rounded-xl border border-[var(--border)] px-3 py-2 text-xs"
                    >
                      <span aria-hidden>{t.unit.icon}</span>
                      <span className="flex-1 leading-relaxed">{exerciseSummary(localized)}</span>
                      <span className="shrink-0 font-bold text-[var(--muted-foreground)]">
                        {effectiveLang === 'en' ? `missed ${t.record.wrong}x · ` : `错 ${t.record.wrong} 次 · `}
                        {t.record.due <= todayStr() ? (
                          <span className="text-[#ff4b4b]">{effectiveLang === 'en' ? 'due today' : '今日到期'}</span>
                        ) : (
                          `${t.record.due.slice(5).replace('-', '/')}${effectiveLang === 'en' ? '' : ' 复习'}`
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </details>
          )}
        </div>
      )}


        </>
      )}

      {tab === 'learn' && (
        <>
      {/* 保存进度提示（已配置云同步、未登录、已有进度时展示一次） */}
      {cloud.enabled && cloud.ready && !cloud.session && loaded && progress.completed.length > 0 && !nudgeDismissed && (
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-[#1cb0f6] bg-[var(--card)] p-4">
          <p className="text-xs leading-relaxed">
            ☁️ {effectiveLang === 'en'
              ? 'Your progress lives only on this device. Save it to the cloud in one step.'
              : '你的进度目前只存在这台设备上，一步保存到云端，换设备不丢档。'}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { track('save_nudge_click'); setTab('me'); }}
              className="rounded-full bg-[#1cb0f6] px-4 py-1.5 text-xs font-extrabold text-white transition hover:bg-[#2bbcff]"
            >
              {effectiveLang === 'en' ? 'Save progress' : '去保存'}
            </button>
            <button
              aria-label={effectiveLang === 'en' ? 'Dismiss' : '关闭提示'}
              onClick={() => {
                setNudgeDismissed(true);
                try { localStorage.setItem(SAVE_NUDGE_KEY, 'dismissed'); } catch { /* ignore */ }
              }}
              className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs font-bold text-[var(--muted-foreground)] transition hover:bg-[var(--muted)]"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* 每日一案（判断主线） */}
      {dailyCaseCard}

      {/* 课程地图 */}
      <div className="space-y-12">
        {course.map((unit) => (
          <div key={unit.id}>
            {unit.id === 'u9' && (
              <div className="mb-12 flex items-center gap-4">
                <div className="h-0.5 flex-1 bg-[var(--border)]" />
                <span className="text-sm font-extrabold uppercase tracking-widest text-[var(--muted-foreground)]">
                  {ui.advanced}
                </span>
                <div className="h-0.5 flex-1 bg-[var(--border)]" />
              </div>
            )}
            {unit.id === 'i5' && (
              <div className="mb-12 flex items-center gap-4">
                <div className="h-0.5 flex-1 bg-[var(--border)]" />
                <span className="text-sm font-extrabold uppercase tracking-widest text-[var(--muted-foreground)]">
                  {ui.l2}
                </span>
                <div className="h-0.5 flex-1 bg-[var(--border)]" />
              </div>
            )}
            {unit.id === 'i9' && (
              <div className="mb-12 flex items-center gap-4">
                <div className="h-0.5 flex-1 bg-[var(--border)]" />
                <span className="text-sm font-extrabold uppercase tracking-widest text-[var(--muted-foreground)]">
                  {ui.l3}
                </span>
                <div className="h-0.5 flex-1 bg-[var(--border)]" />
              </div>
            )}
            {unit.id === 'i13' && (
              <div className="mb-12 flex items-center gap-4">
                <div className="h-0.5 flex-1 bg-[var(--border)]" />
                <span className="text-sm font-extrabold uppercase tracking-widest text-[var(--muted-foreground)]">
                  {ui.l4}
                </span>
                <div className="h-0.5 flex-1 bg-[var(--border)]" />
              </div>
            )}
            {unit.id === 'i17' && (
              <div className="mb-12 flex items-center gap-4">
                <div className="h-0.5 flex-1 bg-[var(--border)]" />
                <span className="text-sm font-extrabold uppercase tracking-widest text-[var(--muted-foreground)]">
                  {ui.l5}
                </span>
                <div className="h-0.5 flex-1 bg-[var(--border)]" />
              </div>
            )}
            {unit.id === 'u13' && (
              <div className="mb-12 flex items-center gap-4">
                <div className="h-0.5 flex-1 bg-[var(--border)]" />
                <span className="text-sm font-extrabold uppercase tracking-widest text-[var(--muted-foreground)]">
                  {ui.mechanics}
                </span>
                <div className="h-0.5 flex-1 bg-[var(--border)]" />
              </div>
            )}
            {unit.id === 'u20' && (
              <div className="mb-12 flex items-center gap-4">
                <div className="h-0.5 flex-1 bg-[var(--border)]" />
                <span className="text-sm font-extrabold uppercase tracking-widest text-[var(--muted-foreground)]">
                  {ui.deriv}
                </span>
                <div className="h-0.5 flex-1 bg-[var(--border)]" />
              </div>
            )}
            {unit.id === 'u15' && (
              <div className="mb-12 flex items-center gap-4">
                <div className="h-0.5 flex-1 bg-[var(--border)]" />
                <span className="text-sm font-extrabold uppercase tracking-widest text-[var(--muted-foreground)]">
                  {ui.onchain}
                </span>
                <div className="h-0.5 flex-1 bg-[var(--border)]" />
              </div>
            )}
            <UnitSection
              unit={unit}
              completed={progress.completed}
              perfect={progress.perfect}
              isUnlocked={isUnlocked}
              onOpen={(id) => { track('lesson_start', { lesson: id, variant }); setActiveLessonId(id); }}
              lang={effectiveLang}
            />
            {BOSSES.filter((b) => b.unitIds[b.unitIds.length - 1] === unit.id).map((b) => {
              const unlocked = chapterDone(b.unitIds);
              const won = bossWins[b.id];
              return (
                <div
                  key={b.id}
                  className="mt-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 p-5"
                  style={{ borderColor: unlocked ? b.color : 'var(--border)', backgroundColor: 'var(--card)' }}
                >
                  <div>
                    <p className="text-base font-extrabold">
                      {won ? '👑' : b.emoji} {effectiveLang === 'en' ? 'Chapter Boss: ' : '篇章 Boss：'}
                      {effectiveLang === 'en' ? b.en : b.zh}
                      {won && (
                        <span className="ml-2 text-xs font-bold text-[#ffc800]">
                          {effectiveLang === 'en' ? `defeated ${won}` : `已于 ${won} 击败`}
                        </span>
                      )}
                    </p>
                    <p className="mt-1 text-xs italic text-[var(--muted-foreground)]">
                      「{effectiveLang === 'en' ? b.enTaunt : b.zhTaunt}」
                    </p>
                    {!unlocked && (
                      <p className="mt-1 text-[10px] font-bold text-[var(--muted-foreground)]">
                        🔒 {effectiveLang === 'en' ? 'Complete every lesson in this chapter to challenge' : '修完本篇章全部课程后解锁挑战'}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => unlocked && setActiveBoss(b)}
                    disabled={!unlocked}
                    className="rounded-2xl border-b-4 px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white transition active:translate-y-0.5 active:border-b-2 disabled:cursor-not-allowed disabled:opacity-40"
                    style={{ backgroundColor: unlocked ? b.color : 'var(--muted-foreground)', borderColor: unlocked ? b.colorDark : 'var(--border)' }}
                  >
                    ⚔️ {won ? (effectiveLang === 'en' ? 'Rematch' : '再战') : effectiveLang === 'en' ? 'Challenge' : '挑战'}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* 毕业卡片 */}
      {loaded && completedCount === courseTotal && (
        <div className="mt-12 rounded-3xl border-2 border-[#ffc800] bg-[var(--card)] p-8 text-center">
          <div className="mb-3 text-6xl" aria-hidden>
            🎓
          </div>
          <h2 className="text-2xl font-extrabold text-[#ffc800]">{ui.graduateTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
            {ui.graduateBody}
            <br />
            {ui.graduateNext}
          </p>
        </div>
      )}

      {loaded && progress.developerMode && (
        <div className="mb-8 rounded-2xl border border-[#ff9600] bg-[#fff7ed] px-4 py-3 text-sm text-[#9a5a00]">
          {ui.developerBanner}
        </div>
      )}


        </>
      )}

      {tab === 'me' && (
        <div className="mb-10 rounded-3xl border-2 shadow-[0_6px_24px_-10px_rgba(0,0,0,0.18)] border-[var(--border)] bg-[var(--card)] p-5">
          <p className="mb-3 text-base font-extrabold">⚙️ {effectiveLang === 'en' ? 'Settings' : '设置'}</p>
          <p
            className="mb-3 select-none text-xs text-[var(--muted-foreground)]"
            onClick={() => setDevTaps((n) => n + 1)}
          >
            {effectiveLang === 'en' ? 'Investing Academy' : '投资学园'} v2.1
          </p>
          {(devTaps >= 7 || progress.developerMode) && (
            <button
              onClick={toggleDeveloperMode}
              className={`mb-3 block rounded-full border px-3 py-1 text-xs font-bold transition ${
                progress.developerMode
                  ? 'border-[#ff9600] bg-[#fff3e0] text-[#ff9600]'
                  : 'border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]'
              }`}
            >
              {ui.developerMode} {progress.developerMode ? ui.on : ui.off}
            </button>
          )}
          {loaded && (completedCount > 0 || progress.xp > 0 || progress.developerMode) && (
            <button
              onClick={() => {
                const word = window.prompt(
                  effectiveLang === 'en'
                    ? 'This permanently erases ALL progress. Type RESET to confirm.'
                    : '这将永久清空全部学习进度。输入 RESET 确认。',
                );
                if (word === 'RESET') {
                  track('progress_reset');
                  resetProgress();
                }
              }}
              className="text-xs font-semibold text-[#ea2b2b] underline-offset-4 hover:underline"
            >
              {ui.reset}
            </button>
          )}
        </div>
      )}

      <p className="mt-10 text-center text-xs leading-relaxed text-[var(--muted-foreground)]">
        {ui.disclaimer}
      </p>

      </motion.div>
      </AnimatePresence>

      {/* 底部导航（毛玻璃 + 滑动指示气泡） */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-[var(--card)]/85 shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.2)] backdrop-blur-xl">
        <div className="mx-auto grid w-full max-w-3xl grid-cols-4">
          {(
            [
              ['learn', '🗺️', effectiveLang === 'en' ? 'Learn' : '学习'],
              ['practice', '🧪', effectiveLang === 'en' ? 'Practice' : '演练场'],
              ['review', '📒', effectiveLang === 'en' ? 'Review' : '复习'],
              ['me', '🏅', effectiveLang === 'en' ? 'Me' : '我的'],
            ] as const
          ).map(([id, icon, label]) => (
            <button
              key={id}
              onClick={() => {
                setTab(id);
                track('tab_switch', { tab: id, variant });
              }}
              className={`relative flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-extrabold transition ${
                tab === id ? 'text-[#1cb0f6]' : 'text-[var(--muted-foreground)]'
              }`}
            >
              {tab === id && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-x-3 inset-y-1 -z-10 rounded-2xl bg-[#1cb0f6]/10"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <motion.span
                animate={tab === id ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                transition={{ duration: 0.35 }}
                className="text-xl leading-none"
                aria-hidden
              >
                {icon}
              </motion.span>
              {label}
              {id === 'review' && srsDue.length > 0 && (
                <span className="absolute mt-0 h-2 w-2 translate-x-4 rounded-full bg-[#ff4b4b]" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* 新用户引导 */}
      {showOnboarding && (
        <OnboardingFlow
          course={course}
          onStartFirstLesson={() => {
            try { localStorage.setItem('options-onboarding-v1', 'novice'); } catch { /* ignore */ }
            setShowOnboarding(false);
            setActiveLessonId(courseOrder[0]);
          }}
          onPlacement={(result: PlacementResult) => {
            try { localStorage.setItem('options-onboarding-v1', result); } catch { /* ignore */ }
            if (result !== 'none') {
              const throughUnit = result === 'u8' ? 8 : 4;
              const ids = courseOrder.filter((id) => {
                const m = id.match(/^u(\d+)l/);
                return m && Number(m[1]) <= throughUnit;
              });
              completeMany(ids);
            }
            setShowOnboarding(false);
          }}
          onClose={() => {
            try { localStorage.setItem('options-onboarding-v1', 'skipped'); } catch { /* ignore */ }
            setShowOnboarding(false);
          }}
        />
      )}

      {/* 课程播放器 */}
      {active && (
        <LessonPlayer
          key={active.lesson.id}
          unit={active.unit}
          lesson={active.lesson}
          isReview={progress.completed.includes(active.lesson.id)}
          developerMode={progress.developerMode}
          onExit={() => setActiveLessonId(null)}
          onComplete={(perfectRun) => {
            const xp = completeLesson(active.lesson.id, perfectRun);
            track('lesson_complete', { lesson: active.lesson.id, perfect: perfectRun, variant });
            markDaily('lesson');
            awardBadge('first_lesson');
            if (perfectRun) awardBadge('perfect_lesson');
            if (new Date().getHours() < 5) awardBadge('night_owl');
            try {
              const p = JSON.parse(localStorage.getItem('options-course-progress-v1') ?? '{}');
              if ((p.streak ?? 0) >= 7) awardBadge('streak_7');
              if ((p.completed?.length ?? 0) >= totalLessons) awardBadge('graduate');
            } catch {
              /* ignore */
            }
            return xp;
          }}
          onExerciseResult={srs.recordResult}
          onCritBonus={(bonus) => grantReward(bonus)}
        />
      )}

      {/* 策略实验室 */}
      {labOpen && <StrategyLab onExit={() => setLabOpen(false)} />}

      {/* 交易生存挑战 */}
      {gameOpen && <SurvivalGame onExit={() => setGameOpen(false)} />}

      {/* 套利工坊 */}
      {arbLabOpen && <ArbLab onExit={() => setArbLabOpen(false)} />}

      {/* 篇章 Boss 战 */}
      {activeBoss && <BossBattle boss={activeBoss} course={course} onExit={() => setActiveBoss(null)} />}

      {/* 预测小游戏 */}
      {predictionOpen && <PredictionGame onExit={() => setPredictionOpen(false)} />}

      {/* 每日一案 / 档案馆重玩 */}
      {casePlayer && (
        <DailyCase
          caseOverride={casePlayer.override}
          onExit={() => setCasePlayer(null)}
          onFirstFinish={() => {
            grantReward(CASE_XP);
            markDaily('lab');
            setDaily(loadDaily());
          }}
        />
      )}

      {/* Memo 工作台 */}
      {memoOpen && <MemoWorkbench onExit={() => setMemoOpen(false)} onWeeklyXp={() => grantReward(MEMO_XP)} />}

      {/* 宝箱开箱仪式 */}
      {chestReveal && <ChestRevealOverlay reward={chestReveal} lang={effectiveLang} onClose={() => setChestReveal(null)} />}

      {/* 升级仪式（排在开箱仪式之后） */}
      {levelUpVisible && levelUp && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 px-6">
          <div className="w-full max-w-sm rounded-3xl border-4 border-[#ffc800] bg-[var(--card)] p-8 text-center">
            <div className="animate-bounce text-7xl" aria-hidden>{levelUp.level.emoji}</div>
            <p className="mt-3 text-sm font-extrabold uppercase tracking-widest text-[#ffc800]">
              {effectiveLang === 'en' ? 'Level Up!' : '升级！'}
            </p>
            <h2 className="mt-1 text-2xl font-extrabold">{effectiveLang === 'en' ? levelUp.level.en : levelUp.level.zh}</h2>
            <p className="mt-2 text-xs text-[var(--muted-foreground)]">
              {levelUp.next
                ? effectiveLang === 'en'
                  ? `Next rank: ${levelUp.next.en} at ${levelUp.next.xp} XP`
                  : `下一头衔：${levelUp.next.zh}（${levelUp.next.xp} XP）`
                : effectiveLang === 'en'
                  ? 'You reached the top of the ladder.'
                  : '你已登顶头衔阶梯。'}
            </p>
            <button
              onClick={() => setLevelUp(null)}
              className="mt-6 w-full rounded-2xl border-b-4 border-[#d4a600] bg-[#ffc800] py-3.5 text-base font-extrabold uppercase tracking-wide text-white transition hover:bg-[#ffd21f] active:translate-y-0.5 active:border-b-2"
            >
              {effectiveLang === 'en' ? 'Onward' : '继续前进'}
            </button>
          </div>
        </div>
      )}

      {/* 错题复习会话 */}
      {reviewItems && reviewItems.length > 0 && (
        <ReviewSession
          items={reviewItems}
          onExit={() => setReviewItems(null)}
          onComplete={() => {
            track('review_complete', { variant });
            markDaily('review');
            return completeReview();
          }}
          onExerciseResult={srs.recordResult}
          onCritBonus={(bonus) => grantReward(bonus)}
        />
      )}
    </div>
  );
}

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
}

/* ---------- 宝箱开箱仪式 ---------- */

function ChestRevealOverlay({
  reward,
  lang,
  onClose,
}: {
  reward: { xp: number; freezeEarned: boolean; tier: ChestTier };
  lang: 'en' | 'zh';
  onClose: () => void;
}) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      setRevealed(true);
      if (reward.tier === 'epic') sfx.perfect();
      else if (reward.tier === 'rare') sfx.badge();
      else sfx.coin();
    }, 1100);
    return () => clearTimeout(t);
  }, [reward.tier]);

  const tierStyle: Record<ChestTier, { color: string; zh: string; en: string; emoji: string }> = {
    common: { color: '#1cb0f6', zh: '普通', en: 'Common', emoji: '🎁' },
    rare: { color: '#ce82ff', zh: '稀有！', en: 'Rare!', emoji: '💜' },
    epic: { color: '#ffc800', zh: '史诗！！', en: 'Epic!!', emoji: '🌟' },
  };
  const ts = tierStyle[reward.tier];

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 px-6">
      {!revealed ? (
        <div className="animate-bounce text-8xl" aria-hidden>🎁</div>
      ) : (
        <div className="w-full max-w-sm rounded-3xl border-4 bg-[var(--card)] p-8 text-center" style={{ borderColor: ts.color }}>
          <div className="text-6xl" aria-hidden>{ts.emoji}</div>
          <p className="mt-2 text-sm font-extrabold uppercase tracking-widest" style={{ color: ts.color }}>
            {lang === 'en' ? ts.en : ts.zh}
          </p>
          <p className="mt-2 text-4xl font-extrabold tabular-nums" style={{ color: ts.color }}>
            +{reward.xp} XP
          </p>
          {reward.freezeEarned && (
            <p className="mt-2 text-sm font-extrabold text-[#1cb0f6]">
              🧊 {lang === 'en' ? 'Bonus: a streak freeze!' : '额外获得一张连胜冻结卡！'}
            </p>
          )}
          <button
            onClick={onClose}
            className="mt-6 w-full rounded-2xl border-b-4 py-3.5 text-base font-extrabold uppercase tracking-wide text-white transition active:translate-y-0.5 active:border-b-2"
            style={{ backgroundColor: ts.color, borderColor: ts.color }}
          >
            {lang === 'en' ? 'Collect' : '收下'}
          </button>
        </div>
      )}
    </div>
  );
}

function findLessonInCourse(course: Unit[], lessonId: string): { unit: Unit; lesson: Lesson; index: number } | null {
  for (const unit of course) {
    const index = unit.lessons.findIndex((lesson) => lesson.id === lessonId);
    if (index !== -1) return { unit, lesson: unit.lessons[index], index };
  }
  return null;
}

/* ---------- 单元区块 ---------- */

function UnitSection({
  unit,
  completed,
  perfect,
  isUnlocked,
  onOpen,
  lang,
}: {
  unit: Unit;
  completed: string[];
  perfect: string[];
  isUnlocked: (id: string) => boolean;
  onOpen: (id: string) => void;
  lang: 'en' | 'zh';
}) {
  const unitDone = unit.lessons.every((l) => completed.includes(l.id));

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {/* 单元横幅 */}
      <div
        className="mb-8 flex items-center justify-between rounded-3xl border-b-4 px-5 py-4 text-white"
        style={{
          background: `linear-gradient(135deg, ${unit.color} 0%, ${unit.colorDark} 100%)`,
          borderColor: unit.colorDark,
          boxShadow: `0 10px 28px -10px ${unit.color}99`,
        }}
      >
        <div>
          <h2 className="text-lg font-extrabold drop-shadow-sm">{unit.title}</h2>
          <p className="mt-0.5 text-sm text-white/90">{unit.subtitle}</p>
        </div>
        <div className="ml-4 text-3xl drop-shadow" aria-hidden>
          {unitDone ? '👑' : unit.icon}
        </div>
      </div>

      {/* 之字形关卡路径 */}
      <div className="flex flex-col items-center gap-2">
        {unit.lessons.map((lesson, i) => {
          const done = completed.includes(lesson.id);
          const isPerfect = perfect.includes(lesson.id);
          const unlocked = isUnlocked(lesson.id);
          const offset = i % 2 === 0 ? '-translate-x-14 sm:-translate-x-20' : 'translate-x-14 sm:translate-x-20';
          return (
            <LessonNode
              key={lesson.id}
              lesson={lesson}
              unit={unit}
              done={done}
              isPerfect={isPerfect}
              unlocked={unlocked}
              className={offset}
              onOpen={onOpen}
              lang={lang}
            />
          );
        })}
      </div>
    </motion.section>
  );
}

function LessonNode({
  lesson,
  unit,
  done,
  isPerfect,
  unlocked,
  className,
  onOpen,
  lang,
}: {
  lesson: Lesson;
  unit: Unit;
  done: boolean;
  isPerfect: boolean;
  unlocked: boolean;
  className: string;
  onOpen: (id: string) => void;
  lang: 'en' | 'zh';
}) {
  const isNext = unlocked && !done;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className={`relative flex flex-col items-center transition-transform ${className}`}
    >
      {isNext && (
        <div
          className="absolute -top-9 z-10 animate-bounce rounded-xl border-2 px-3 py-1 text-xs font-extrabold uppercase tracking-wide shadow-md"
          style={{ color: unit.color, borderColor: unit.color, backgroundColor: 'var(--card)' }}
        >
          {lang === 'en' ? 'Start' : '开始'}
        </div>
      )}
      {/* 呼吸光环：当前应学关卡 */}
      {isNext && (
        <span
          aria-hidden
          className="absolute top-0 h-16 w-16 animate-ping rounded-full opacity-25"
          style={{ backgroundColor: unit.color, animationDuration: '2.2s' }}
        />
      )}
      <button
        onClick={() => unlocked && onOpen(lesson.id)}
        disabled={!unlocked}
        aria-label={lesson.title}
        className={`relative flex h-16 w-16 items-center justify-center rounded-full border-b-8 text-2xl transition hover:scale-105 active:translate-y-1 active:border-b-4 ${
          unlocked ? 'cursor-pointer' : 'cursor-not-allowed'
        }`}
        style={
          unlocked
            ? {
                background: `radial-gradient(circle at 30% 25%, ${unit.color}f0, ${unit.colorDark})`,
                borderColor: unit.colorDark,
                color: '#fff',
                boxShadow: `0 8px 20px -6px ${unit.color}aa`,
              }
            : {
                backgroundColor: 'var(--muted)',
                borderColor: 'var(--border)',
                color: 'var(--muted-foreground)',
              }
        }
      >
        {done ? (isPerfect ? '⭐' : '✓') : unlocked ? '★' : '🔒'}
      </button>
      <span
        className={`mt-2 max-w-28 text-center text-xs font-bold leading-tight ${
          unlocked ? '' : 'text-[var(--muted-foreground)]'
        }`}
      >
        {lesson.title}
      </span>
    </motion.div>
  );
}
