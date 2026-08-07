'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  findLesson,
  optionsCourse,
  totalLessons,
  type Lesson,
  type Unit,
} from '@/data/optionsCourse';
import { optionsCourseEn } from '@/data/optionsCourseEn';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCourseProgress } from './useCourseProgress';
import { LessonPlayer, ReviewSession, type SessionItem } from './LessonPlayer';
import { exerciseSummary, useSrs } from './useSrs';
import { StrategyLab } from './StrategyLab';
import { SurvivalGame } from './SurvivalGame';
import { awardBadge, BADGES, loadBadges } from './badges';
import { isMuted, setMuted } from './sounds';
import { BossBattle, BOSSES, loadBossWins, type BossDef } from './BossBattle';
import { PredictionGame } from './PredictionGame';
import { allDone, CHEST_XP, CHESTS_PER_FREEZE, claimChest, loadDaily, markDaily, type DailyState } from './daily';

export function OptionsCourseApp() {
  const {
    progress,
    loaded,
    completeLesson,
    completeReview,
    grantReward,
    resetProgress,
    toggleDeveloperMode,
    isUnlocked,
    streakAlive,
  } = useCourseProgress();
  const srs = useSrs();
  const { lang } = useLanguage();
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [reviewItems, setReviewItems] = useState<SessionItem[] | null>(null);
  const [labOpen, setLabOpen] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const [badges, setBadges] = useState<Record<string, string>>({});
  const [soundOff, setSoundOff] = useState(false);
  const [activeBoss, setActiveBoss] = useState<BossDef | null>(null);
  const [predictionOpen, setPredictionOpen] = useState(false);
  const [bossWins, setBossWins] = useState<Record<string, string>>({});
  const [daily, setDaily] = useState<DailyState | null>(null);

  // 徽章与静音状态：挂载及任意弹层关闭后刷新
  useEffect(() => {
    if (!activeLessonId && !reviewItems && !labOpen && !gameOpen && !activeBoss && !predictionOpen) {
      setBadges(loadBadges());
      setBossWins(loadBossWins());
      setDaily(loadDaily());
    }
  }, [activeLessonId, reviewItems, labOpen, gameOpen, activeBoss, predictionOpen]);
  useEffect(() => setSoundOff(isMuted()), []);
  useEffect(() => {
    if (srs.masteredCount >= 10 && awardBadge('mastered_10')) setBadges(loadBadges());
  }, [srs.masteredCount]);

  const course = lang === 'en' ? optionsCourseEn : optionsCourse;
  const active = useMemo(() => {
    if (!activeLessonId) return null;
    return lang === 'en' ? findLessonInCourse(course, activeLessonId) : findLesson(activeLessonId);
  }, [activeLessonId, course, lang]);
  const completedCount = progress.completed.length;
  const ui = lang === 'en'
    ? {
        title: 'Options Academy',
        subtitle: 'Learn options trading one level at a time, like Duolingo',
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
        graduateTitle: 'You Graduated!',
        graduateBody: `You finished all ${totalLessons} lessons. Come back anytime to review and lock it in (+5 XP each time).`,
        graduateNext: 'Next step: practice small with a paper account and turn the Greek letters into real intuition.',
        developerBanner: 'Developer mode is on: you can jump into any lesson directly without completing the previous one first.',
        reset: 'Reset learning progress',
        resetConfirm: 'Are you sure you want to clear all learning progress? This cannot be undone.',
        disclaimer: 'This course is for educational purposes only and is not investment advice. Options trading is high risk and can result in the loss of your entire principal.',
        start: 'Start',
        completed: 'completed',
        locked: 'locked',
      }
    : {
        title: '期权学园',
        subtitle: '像玩多邻国一样，一关一关学会期权交易',
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
        graduateTitle: '恭喜毕业！',
        graduateBody: `你已完成全部 ${totalLessons} 课。随时回来复习任何一课巩固记忆（每次 +5 XP）。`,
        graduateNext: '下一步：用模拟账户小仓位实践，把纸上的希腊字母变成手感。',
        developerBanner: '开发者模式已开启：当前允许直接进入任意章节，不再受上一课完成状态限制。',
        reset: '重置学习进度',
        resetConfirm: '确定要清空全部学习进度吗？此操作不可撤销。',
        disclaimer: '本课程仅供教育用途，不构成投资建议。期权交易风险较高，可能损失全部本金。',
        start: '开始',
        completed: '已完成',
        locked: '未解锁',
      };

  const chapterDone = (unitIds: string[]) =>
    progress.developerMode ||
    unitIds.every((uid) => {
      const u = course.find((x) => x.id === uid);
      return !!u && u.lessons.every((l) => progress.completed.includes(l.id));
    });

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-24 pt-8">
      {/* 页头 */}
      <header className="mb-8 text-center">
        <div className="mb-2 text-5xl" aria-hidden>
          🦉📊
        </div>
        <h1 className="text-3xl font-extrabold sm:text-4xl">{ui.title}</h1>
        <p className="mt-2 text-[var(--muted-foreground)]">{ui.subtitle}</p>
      </header>

      {/* 统计栏 */}
      <div className="sticky top-16 z-40 mb-10 rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] px-4 py-3 shadow-sm">
        <div className="mb-3 flex items-center justify-end gap-2">
          <button
            onClick={() => {
              const next = !soundOff;
              setMuted(next);
              setSoundOff(next);
            }}
            aria-label={soundOff ? (lang === 'en' ? 'Unmute sounds' : '开启音效') : (lang === 'en' ? 'Mute sounds' : '关闭音效')}
            className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-bold text-[var(--muted-foreground)] transition hover:bg-[var(--muted)]"
          >
            {soundOff ? '🔇' : '🔊'}
          </button>
          <button
            onClick={toggleDeveloperMode}
            className={`rounded-full border px-3 py-1 text-xs font-bold transition ${
              progress.developerMode
                ? 'border-[#ff9600] bg-[#fff3e0] text-[#ff9600]'
                : 'border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]'
            }`}
          >
            {ui.developerMode} {progress.developerMode ? ui.on : ui.off}
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
              <span className="text-xs font-bold text-[#1cb0f6]" title={lang === 'en' ? 'Streak freezes' : '连胜冻结卡'}>
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
              {loaded ? completedCount : '–'}/{totalLessons} {lang === 'en' ? 'lessons' : '课'}
            </span>
          </div>
        </div>
      </div>

      {/* 每日任务 */}
      {loaded && daily && (
        <div className="mb-10 rounded-2xl border-2 border-[#ce82ff] bg-[var(--card)] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-base font-extrabold">📅 {lang === 'en' ? 'Daily Quests' : '每日任务'}</p>
              <div className="mt-2 flex flex-wrap gap-3 text-xs font-bold">
                <span className={daily.lesson ? 'text-[#58a700]' : 'text-[var(--muted-foreground)]'}>
                  {daily.lesson ? '✅' : '⬜'} {lang === 'en' ? 'Finish a lesson' : '学完一课'}
                </span>
                <span className={daily.review ? 'text-[#58a700]' : 'text-[var(--muted-foreground)]'}>
                  {daily.review ? '✅' : '⬜'} {lang === 'en' ? 'Do a review' : '复习错题'}
                </span>
                <span className={daily.lab ? 'text-[#58a700]' : 'text-[var(--muted-foreground)]'}>
                  {daily.lab ? '✅' : '⬜'} {lang === 'en' ? 'Play a lab case' : '实验室跑一个案例'}
                </span>
              </div>
              <p className="mt-1 text-[10px] text-[var(--muted-foreground)]">
                {lang === 'en'
                  ? `Chest: +${CHEST_XP} XP · every ${CHESTS_PER_FREEZE} chests grant a 🧊 streak freeze (${daily.totalChests} collected)`
                  : `宝箱 +${CHEST_XP} XP · 每攒 ${CHESTS_PER_FREEZE} 个宝箱送一张 🧊 连胜冻结卡（已攒 ${daily.totalChests} 个）`}
              </p>
            </div>
            <button
              onClick={() => {
                const reward = claimChest();
                if (reward) {
                  grantReward(reward.xp, reward.freezeEarned ? 1 : 0);
                  setDaily(loadDaily());
                }
              }}
              disabled={!allDone(daily) || daily.chestClaimed}
              className="rounded-2xl border-b-4 border-[#a568cc] bg-[#ce82ff] px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#d99aff] active:translate-y-0.5 active:border-b-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {daily.chestClaimed
                ? lang === 'en' ? 'Claimed ✓' : '已开启 ✓'
                : `🎁 ${lang === 'en' ? 'Open Chest' : '开宝箱'}`}
            </button>
          </div>
        </div>
      )}

      {/* 策略实验室 */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-[#1cb0f6] bg-[var(--card)] p-5">
        <div>
          <p className="text-base font-extrabold">🧪 {lang === 'en' ? 'Strategy Lab' : '策略实验室'}</p>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
            {lang === 'en'
              ? 'Drag spot / IV / days-to-expiry and watch payoff curves and Greeks respond in real time — 10 strategy presets.'
              : '拖动股价 / IV / 剩余天数，实时观察损益曲线和希腊字母的变化 —— 内置 10 种策略预设。'}
          </p>
        </div>
        <button
          onClick={() => setLabOpen(true)}
          className="rounded-2xl border-b-4 border-[#1899d6] bg-[#1cb0f6] px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#2bbcff] active:translate-y-0.5 active:border-b-2"
        >
          {lang === 'en' ? 'Open Lab' : '进入实验室'}
        </button>
      </div>

      {/* 交易生存挑战 */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-[#58cc02] bg-[var(--card)] p-5">
        <div>
          <p className="text-base font-extrabold">🎮 {lang === 'en' ? 'Survival Challenge' : '交易生存挑战'}</p>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
            {lang === 'en'
              ? '$10,000, 52 weeks, real options math, black swans off the forecast. How long can you last?'
              : '$10,000 资金、52 周行情、真实期权数学结算，黑天鹅从不预告。你能活多久？'}
          </p>
        </div>
        <button
          onClick={() => setGameOpen(true)}
          className="rounded-2xl border-b-4 border-[#46a302] bg-[#58cc02] px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#61d904] active:translate-y-0.5 active:border-b-2"
        >
          {lang === 'en' ? 'Play' : '开始挑战'}
        </button>
      </div>

      {/* 预测小游戏 */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-[#ffc800] bg-[var(--card)] p-5">
        <div>
          <p className="text-base font-extrabold">🎲 {lang === 'en' ? 'Can You Predict the Market?' : '你能预测市场吗？'}</p>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
            {lang === 'en'
              ? 'Guess 10 chart continuations. Most people land at ~50% — find out why pros trade mechanics instead.'
              : '连猜 10 段走势的方向。大多数人 ≈50%——亲身体会为什么职业玩家不猜方向、只玩机制。'}
          </p>
        </div>
        <button
          onClick={() => setPredictionOpen(true)}
          className="rounded-2xl border-b-4 border-[#d4a600] bg-[#ffc800] px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#ffd21f] active:translate-y-0.5 active:border-b-2"
        >
          {lang === 'en' ? 'Try It' : '试试手气'}
        </button>
      </div>

      {/* 成就徽章墙 */}
      <details className="mb-10 rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-5">
        <summary className="cursor-pointer text-base font-extrabold">
          🏅 {lang === 'en' ? 'Badges' : '成就徽章'}{' '}
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
                <p className="mt-1 text-sm font-extrabold">{lang === 'en' ? b.en : b.zh}</p>
                <p className="mt-0.5 text-[10px] leading-snug text-[var(--muted-foreground)]">
                  {lang === 'en' ? b.enDesc : b.zhDesc}
                </p>
                {owned && <p className="mt-1 text-[10px] font-bold text-[#b58900]">{owned}</p>}
              </div>
            );
          })}
        </div>
      </details>

      {/* 错题本 · 间隔重复 */}
      {loaded && srs.loaded && (srs.book.length > 0 || srs.masteredCount > 0) && (
        <div className="mb-10 rounded-2xl border-2 border-[#f59f00] bg-[var(--card)] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-base font-extrabold">
                {lang === 'en' ? '📒 Mistake Book' : '📒 错题本'}
                {srs.due.length > 0 && (
                  <span className="ml-2 rounded-full bg-[#ff4b4b] px-2 py-0.5 text-xs font-extrabold text-white">
                    {lang === 'en' ? `${srs.due.length} due` : `${srs.due.length} 道待复习`}
                  </span>
                )}
              </p>
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                {lang === 'en'
                  ? `${srs.book.length} missed · ${srs.due.length} due today · ${srs.masteredCount} mastered — scheduled on the forgetting curve: 5 correct in a row = mastered`
                  : `错题 ${srs.book.length} 道 · 今日到期 ${srs.due.length} 道 · 已掌握 ${srs.masteredCount} 道 —— 按遗忘曲线安排：连对 5 次即为掌握`}
              </p>
            </div>
            <button
              onClick={() => {
                const items = srs.buildReviewSession().map(({ key, exercise }) => {
                  const sep = key.lastIndexOf(':');
                  const found = findLessonInCourse(course, key.slice(0, sep));
                  return { key, exercise: found?.lesson.exercises[Number(key.slice(sep + 1))] ?? exercise };
                });
                setReviewItems(items);
              }}
              disabled={srs.book.length === 0}
              className={`rounded-2xl border-b-4 px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white transition active:translate-y-0.5 active:border-b-2 ${
                srs.due.length > 0
                  ? 'border-[#c47f00] bg-[#f59f00] hover:bg-[#ffab0f]'
                  : 'border-[var(--border)] bg-[var(--muted-foreground)] opacity-60'
              } disabled:cursor-not-allowed disabled:opacity-40`}
            >
              {srs.due.length > 0
                ? lang === 'en'
                  ? 'Smart Review'
                  : '开始智能复习'
                : lang === 'en'
                  ? 'Review Early'
                  : '提前复习'}
            </button>
          </div>
          {srs.book.length > 0 && (
            <details className="mt-3">
              <summary className="cursor-pointer text-xs font-bold text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                {lang === 'en' ? 'View missed questions' : '查看错题列表'}
              </summary>
              <ul className="mt-2 space-y-2">
                {srs.book.map((t) => {
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
                        {lang === 'en' ? `missed ${t.record.wrong}x · ` : `错 ${t.record.wrong} 次 · `}
                        {t.record.due <= todayStr() ? (
                          <span className="text-[#ff4b4b]">{lang === 'en' ? 'due today' : '今日到期'}</span>
                        ) : (
                          `${t.record.due.slice(5).replace('-', '/')}${lang === 'en' ? '' : ' 复习'}`
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
            {unit.id === 'u13' && (
              <div className="mb-12 flex items-center gap-4">
                <div className="h-0.5 flex-1 bg-[var(--border)]" />
                <span className="text-sm font-extrabold uppercase tracking-widest text-[var(--muted-foreground)]">
                  {ui.mechanics}
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
              onOpen={setActiveLessonId}
              lang={lang}
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
                      {won ? '👑' : b.emoji} {lang === 'en' ? 'Chapter Boss: ' : '篇章 Boss：'}
                      {lang === 'en' ? b.en : b.zh}
                      {won && (
                        <span className="ml-2 text-xs font-bold text-[#ffc800]">
                          {lang === 'en' ? `defeated ${won}` : `已于 ${won} 击败`}
                        </span>
                      )}
                    </p>
                    <p className="mt-1 text-xs italic text-[var(--muted-foreground)]">
                      「{lang === 'en' ? b.enTaunt : b.zhTaunt}」
                    </p>
                    {!unlocked && (
                      <p className="mt-1 text-[10px] font-bold text-[var(--muted-foreground)]">
                        🔒 {lang === 'en' ? 'Complete every lesson in this chapter to challenge' : '修完本篇章全部课程后解锁挑战'}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => unlocked && setActiveBoss(b)}
                    disabled={!unlocked}
                    className="rounded-2xl border-b-4 px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white transition active:translate-y-0.5 active:border-b-2 disabled:cursor-not-allowed disabled:opacity-40"
                    style={{ backgroundColor: unlocked ? b.color : 'var(--muted-foreground)', borderColor: unlocked ? b.colorDark : 'var(--border)' }}
                  >
                    ⚔️ {won ? (lang === 'en' ? 'Rematch' : '再战') : lang === 'en' ? 'Challenge' : '挑战'}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* 毕业卡片 */}
      {loaded && completedCount === totalLessons && (
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

      {/* 重置 */}
      {loaded && (completedCount > 0 || progress.xp > 0 || progress.developerMode) && (
        <div className="mt-16 text-center">
          <button
            onClick={() => {
              if (window.confirm(ui.resetConfirm)) resetProgress();
            }}
            className="text-xs font-semibold text-[var(--muted-foreground)] underline-offset-4 hover:underline"
          >
            {ui.reset}
          </button>
        </div>
      )}

      <p className="mt-10 text-center text-xs leading-relaxed text-[var(--muted-foreground)]">
        {ui.disclaimer}
      </p>

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
        />
      )}

      {/* 策略实验室 */}
      {labOpen && <StrategyLab onExit={() => setLabOpen(false)} />}

      {/* 交易生存挑战 */}
      {gameOpen && <SurvivalGame onExit={() => setGameOpen(false)} />}

      {/* 篇章 Boss 战 */}
      {activeBoss && <BossBattle boss={activeBoss} course={course} onExit={() => setActiveBoss(null)} />}

      {/* 预测小游戏 */}
      {predictionOpen && <PredictionGame onExit={() => setPredictionOpen(false)} />}

      {/* 错题复习会话 */}
      {reviewItems && reviewItems.length > 0 && (
        <ReviewSession
          items={reviewItems}
          onExit={() => setReviewItems(null)}
          onComplete={() => {
            markDaily('review');
            return completeReview();
          }}
          onExerciseResult={srs.recordResult}
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
    <section>
      {/* 单元横幅 */}
      <div
        className="mb-8 flex items-center justify-between rounded-2xl border-b-4 px-5 py-4 text-white"
        style={{ backgroundColor: unit.color, borderColor: unit.colorDark }}
      >
        <div>
          <h2 className="text-lg font-extrabold">{unit.title}</h2>
          <p className="mt-0.5 text-sm text-white/90">{unit.subtitle}</p>
        </div>
        <div className="ml-4 text-3xl" aria-hidden>
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
    </section>
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
    <div className={`relative flex flex-col items-center transition-transform ${className}`}>
      {isNext && (
        <div
          className="absolute -top-9 animate-bounce rounded-xl border-2 px-3 py-1 text-xs font-extrabold uppercase tracking-wide"
          style={{ color: unit.color, borderColor: unit.color, backgroundColor: 'var(--card)' }}
        >
          {lang === 'en' ? 'Start' : '开始'}
        </div>
      )}
      <button
        onClick={() => unlocked && onOpen(lesson.id)}
        disabled={!unlocked}
        aria-label={lesson.title}
        className={`flex h-16 w-16 items-center justify-center rounded-full border-b-8 text-2xl transition active:translate-y-1 active:border-b-4 ${
          unlocked ? 'cursor-pointer' : 'cursor-not-allowed'
        }`}
        style={
          unlocked
            ? { backgroundColor: unit.color, borderColor: unit.colorDark, color: '#fff' }
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
    </div>
  );
}
