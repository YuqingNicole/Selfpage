'use client';

import { useState } from 'react';
import {
  findLesson,
  optionsCourse,
  totalLessons,
  type Lesson,
  type Unit,
} from '@/data/optionsCourse';
import { useCourseProgress } from './useCourseProgress';
import { LessonPlayer, ReviewSession, type SessionItem } from './LessonPlayer';
import { exerciseSummary, useSrs } from './useSrs';

export function OptionsCourseApp() {
  const { progress, loaded, completeLesson, completeReview, resetProgress, isUnlocked, streakAlive } =
    useCourseProgress();
  const srs = useSrs();
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [reviewItems, setReviewItems] = useState<SessionItem[] | null>(null);

  const active = activeLessonId ? findLesson(activeLessonId) : null;
  const completedCount = progress.completed.length;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-24 pt-8">
      {/* 页头 */}
      <header className="mb-8 text-center">
        <div className="mb-2 text-5xl" aria-hidden>
          🦉📊
        </div>
        <h1 className="text-3xl font-extrabold sm:text-4xl">期权学园</h1>
        <p className="mt-2 text-[var(--muted-foreground)]">
          像玩多邻国一样，一关一关学会期权交易
        </p>
      </header>

      {/* 统计栏 */}
      <div className="sticky top-16 z-40 mb-10 rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] px-4 py-3 shadow-sm">
        <div className="flex items-center justify-around text-sm font-extrabold">
          <div className="flex items-center gap-1.5" title="连胜天数">
            <span className="text-xl" aria-hidden>
              🔥
            </span>
            <span className={streakAlive && progress.streak > 0 ? 'text-[#ff9600]' : 'text-[var(--muted-foreground)]'}>
              {loaded ? progress.streak : '–'} 天
            </span>
          </div>
          <div className="flex items-center gap-1.5" title="总经验值">
            <span className="text-xl" aria-hidden>
              ⚡
            </span>
            <span className="text-[#ffc800]">{loaded ? progress.xp : '–'} XP</span>
          </div>
          <div className="flex items-center gap-1.5" title="课程进度">
            <span className="text-xl" aria-hidden>
              📚
            </span>
            <span className="text-[#1cb0f6]">
              {loaded ? completedCount : '–'}/{totalLessons} 课
            </span>
          </div>
        </div>
      </div>

      {/* 错题本 · 间隔重复 */}
      {loaded && srs.loaded && (srs.book.length > 0 || srs.masteredCount > 0) && (
        <div className="mb-10 rounded-2xl border-2 border-[#f59f00] bg-[var(--card)] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-base font-extrabold">
                📒 错题本
                {srs.due.length > 0 && (
                  <span className="ml-2 rounded-full bg-[#ff4b4b] px-2 py-0.5 text-xs font-extrabold text-white">
                    {srs.due.length} 道待复习
                  </span>
                )}
              </p>
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                错题 {srs.book.length} 道 · 今日到期 {srs.due.length} 道 · 已掌握 {srs.masteredCount} 道
                —— 按遗忘曲线安排：连对 5 次即为掌握
              </p>
            </div>
            <button
              onClick={() => setReviewItems(srs.buildReviewSession())}
              disabled={srs.book.length === 0}
              className={`rounded-2xl border-b-4 px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white transition active:translate-y-0.5 active:border-b-2 ${
                srs.due.length > 0
                  ? 'border-[#c47f00] bg-[#f59f00] hover:bg-[#ffab0f]'
                  : 'border-[var(--border)] bg-[var(--muted-foreground)] opacity-60'
              } disabled:cursor-not-allowed disabled:opacity-40`}
            >
              {srs.due.length > 0 ? '开始智能复习' : '提前复习'}
            </button>
          </div>
          {srs.book.length > 0 && (
            <details className="mt-3">
              <summary className="cursor-pointer text-xs font-bold text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                查看错题列表
              </summary>
              <ul className="mt-2 space-y-2">
                {srs.book.map((t) => (
                  <li
                    key={t.key}
                    className="flex items-start gap-2 rounded-xl border border-[var(--border)] px-3 py-2 text-xs"
                  >
                    <span aria-hidden>{t.unit.icon}</span>
                    <span className="flex-1 leading-relaxed">{exerciseSummary(t.exercise)}</span>
                    <span className="shrink-0 font-bold text-[var(--muted-foreground)]">
                      错 {t.record.wrong} 次 ·{' '}
                      {t.record.due <= todayStr() ? (
                        <span className="text-[#ff4b4b]">今日到期</span>
                      ) : (
                        `${t.record.due.slice(5).replace('-', '/')} 复习`
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}

      {/* 课程地图 */}
      <div className="space-y-12">
        {optionsCourse.map((unit) => (
          <div key={unit.id}>
            {unit.id === 'u9' && (
              <div className="mb-12 flex items-center gap-4">
                <div className="h-0.5 flex-1 bg-[var(--border)]" />
                <span className="text-sm font-extrabold uppercase tracking-widest text-[var(--muted-foreground)]">
                  ⚔️ 进阶篇
                </span>
                <div className="h-0.5 flex-1 bg-[var(--border)]" />
              </div>
            )}
            {unit.id === 'u13' && (
              <div className="mb-12 flex items-center gap-4">
                <div className="h-0.5 flex-1 bg-[var(--border)]" />
                <span className="text-sm font-extrabold uppercase tracking-widest text-[var(--muted-foreground)]">
                  🎲 机制流 · tastylive 风格
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
            />
          </div>
        ))}
      </div>

      {/* 毕业卡片 */}
      {loaded && completedCount === totalLessons && (
        <div className="mt-12 rounded-3xl border-2 border-[#ffc800] bg-[var(--card)] p-8 text-center">
          <div className="mb-3 text-6xl" aria-hidden>
            🎓
          </div>
          <h2 className="text-2xl font-extrabold text-[#ffc800]">恭喜毕业！</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
            你已完成全部 {totalLessons} 课。随时回来复习任何一课巩固记忆（每次 +5 XP）。
            <br />
            下一步：用模拟账户小仓位实践，把纸上的希腊字母变成手感。
          </p>
        </div>
      )}

      {/* 重置 */}
      {loaded && (completedCount > 0 || progress.xp > 0) && (
        <div className="mt-16 text-center">
          <button
            onClick={() => {
              if (window.confirm('确定要清空全部学习进度吗？此操作不可撤销。')) resetProgress();
            }}
            className="text-xs font-semibold text-[var(--muted-foreground)] underline-offset-4 hover:underline"
          >
            重置学习进度
          </button>
        </div>
      )}

      <p className="mt-10 text-center text-xs leading-relaxed text-[var(--muted-foreground)]">
        本课程仅供教育用途，不构成投资建议。期权交易风险较高，可能损失全部本金。
      </p>

      {/* 课程播放器 */}
      {active && (
        <LessonPlayer
          key={active.lesson.id}
          unit={active.unit}
          lesson={active.lesson}
          isReview={progress.completed.includes(active.lesson.id)}
          onExit={() => setActiveLessonId(null)}
          onComplete={(perfectRun) => completeLesson(active.lesson.id, perfectRun)}
          onExerciseResult={srs.recordResult}
        />
      )}

      {/* 错题复习会话 */}
      {reviewItems && reviewItems.length > 0 && (
        <ReviewSession
          items={reviewItems}
          onExit={() => setReviewItems(null)}
          onComplete={completeReview}
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

/* ---------- 单元区块 ---------- */

function UnitSection({
  unit,
  completed,
  perfect,
  isUnlocked,
  onOpen,
}: {
  unit: Unit;
  completed: string[];
  perfect: string[];
  isUnlocked: (id: string) => boolean;
  onOpen: (id: string) => void;
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
}: {
  lesson: Lesson;
  unit: Unit;
  done: boolean;
  isPerfect: boolean;
  unlocked: boolean;
  className: string;
  onOpen: (id: string) => void;
}) {
  const isNext = unlocked && !done;
  return (
    <div className={`relative flex flex-col items-center transition-transform ${className}`}>
      {isNext && (
        <div
          className="absolute -top-9 animate-bounce rounded-xl border-2 px-3 py-1 text-xs font-extrabold uppercase tracking-wide"
          style={{ color: unit.color, borderColor: unit.color, backgroundColor: 'var(--card)' }}
        >
          开始
        </div>
      )}
      <button
        onClick={() => unlocked && onOpen(lesson.id)}
        disabled={!unlocked}
        aria-label={`${lesson.title}${done ? '（已完成）' : unlocked ? '' : '（未解锁）'}`}
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
