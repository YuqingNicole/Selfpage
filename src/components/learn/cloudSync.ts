'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

/**
 * 账户 + 云同步：魔法链接登录，进度/错题本/徽章/每日任务上云。
 * 原则：匿名可用是底线 —— 未配置 Supabase 或未登录时一切照旧，全走 localStorage。
 * 合并策略「宁可多给不少给」：completed/perfect 取并集，XP/连胜/冻结卡取大值。
 */

export const cloudConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder'),
);

const KEYS = {
  progress: 'options-course-progress-v1',
  srs: 'options-course-srs-v1',
  badges: 'options-course-badges-v1',
  daily: 'options-course-daily-v1',
} as const;

type Blob = Record<string, unknown>;

interface CloudRow {
  progress: Blob;
  srs: Blob;
  badges: Blob;
  daily: Blob;
}

function readLocal(): CloudRow {
  const read = (key: string): Blob => {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) ?? '{}');
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  };
  return { progress: read(KEYS.progress), srs: read(KEYS.srs), badges: read(KEYS.badges), daily: read(KEYS.daily) };
}

function writeLocal(row: CloudRow) {
  try {
    localStorage.setItem(KEYS.progress, JSON.stringify(row.progress));
    localStorage.setItem(KEYS.srs, JSON.stringify(row.srs));
    localStorage.setItem(KEYS.badges, JSON.stringify(row.badges));
    localStorage.setItem(KEYS.daily, JSON.stringify(row.daily));
  } catch {
    /* 存储不可用时静默降级 */
  }
}

const num = (v: unknown): number => (typeof v === 'number' && Number.isFinite(v) ? v : 0);
const str = (v: unknown): string => (typeof v === 'string' ? v : '');
const arr = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []);

function mergeProgress(a: Blob, b: Blob): Blob {
  return {
    xp: Math.max(num(a.xp), num(b.xp)),
    completed: Array.from(new Set([...arr(a.completed), ...arr(b.completed)])),
    perfect: Array.from(new Set([...arr(a.perfect), ...arr(b.perfect)])),
    streak: Math.max(num(a.streak), num(b.streak)),
    lastPracticeDay: str(a.lastPracticeDay) > str(b.lastPracticeDay) ? str(a.lastPracticeDay) : str(b.lastPracticeDay),
    developerMode: Boolean(a.developerMode) || Boolean(b.developerMode),
    freezes: Math.max(num(a.freezes), num(b.freezes)),
  };
}

/** 错题记录：以「最近安排复习」的一侧为准，错误次数累计取大值 */
function mergeSrs(a: Blob, b: Blob): Blob {
  const out: Blob = { ...a };
  for (const [key, rec] of Object.entries(b)) {
    const mine = out[key] as Blob | undefined;
    const theirs = rec as Blob;
    if (!mine || typeof mine !== 'object') {
      out[key] = theirs;
      continue;
    }
    const preferred = str(theirs.due) > str(mine.due) ? theirs : mine;
    out[key] = { ...preferred, wrong: Math.max(num(mine.wrong), num(theirs.wrong)) };
  }
  return out;
}

/** 徽章：并集，取更早的获得日期 */
function mergeBadges(a: Blob, b: Blob): Blob {
  const out: Blob = { ...b };
  for (const [id, date] of Object.entries(a)) {
    const other = str(out[id]);
    out[id] = other && other < str(date) ? other : date;
  }
  return out;
}

function mergeDaily(a: Blob, b: Blob): Blob {
  const chests = Math.max(num(a.totalChests), num(b.totalChests));
  if (str(a.day) === str(b.day)) {
    return {
      day: str(a.day),
      lesson: Boolean(a.lesson) || Boolean(b.lesson),
      review: Boolean(a.review) || Boolean(b.review),
      lab: Boolean(a.lab) || Boolean(b.lab),
      chestClaimed: Boolean(a.chestClaimed) || Boolean(b.chestClaimed),
      totalChests: chests,
    };
  }
  const latest = str(a.day) > str(b.day) ? a : b;
  return { ...latest, totalChests: chests };
}

async function fetchCloud(userId: string): Promise<CloudRow | null> {
  const { data, error } = await supabase
    .from('learn_cloud')
    .select('progress, srs, badges, daily')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return (data as CloudRow | null) ?? null;
}

async function upsertCloud(userId: string, row: CloudRow) {
  const { error } = await supabase
    .from('learn_cloud')
    .upsert({ user_id: userId, updated_at: new Date().toISOString(), ...row });
  if (error) throw error;
}

/** 登录后首次同步：云端拉取 → 与本地合并 → 双写。返回本地是否被合并改变。 */
export async function syncWithCloud(userId: string): Promise<boolean> {
  const local = readLocal();
  const cloud = await fetchCloud(userId);
  const merged: CloudRow = cloud
    ? {
        progress: mergeProgress(local.progress, cloud.progress ?? {}),
        srs: mergeSrs(local.srs, cloud.srs ?? {}),
        badges: mergeBadges(local.badges, cloud.badges ?? {}),
        daily: mergeDaily(local.daily, cloud.daily ?? {}),
      }
    : local;
  const localChanged = JSON.stringify(merged) !== JSON.stringify(local);
  if (localChanged) writeLocal(merged);
  await upsertCloud(userId, merged);
  return localChanged;
}

export async function pushToCloud(userId: string) {
  await upsertCloud(userId, readLocal());
}

export interface CloudSyncState {
  /** 是否展示任何账户相关 UI（Supabase 已配置） */
  enabled: boolean;
  session: Session | null;
  /** getSession 是否已返回（避免登录态闪烁） */
  ready: boolean;
  /** 上次成功同步时间 HH:MM，空串表示尚未同步 */
  lastSyncAt: string;
  syncError: boolean;
  sendMagicLink: (email: string) => Promise<{ ok: boolean; message?: string }>;
  signOut: () => Promise<void>;
  syncNow: () => Promise<void>;
}

function clock(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

/**
 * 云同步主 hook。dirtySignal 传任何随学习数据变化的值（progress/srs 等），
 * 登录状态下会在数据变化后 2.5s 防抖推送到云端。
 */
export function useCloudSync(dirtySignal: unknown): CloudSyncState {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [lastSyncAt, setLastSyncAt] = useState('');
  const [syncError, setSyncError] = useState(false);
  /** 初次合并已完成的用户 id —— 完成前禁止防抖推送，防止空本地覆盖云端 */
  const [mergedUid, setMergedUid] = useState<string | null>(null);
  const mergeStarted = useRef<string | null>(null);

  useEffect(() => {
    if (!cloudConfigured) return;
    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  // 登录后（含魔法链接回跳）做一次拉取合并；若本地数据被改变则刷新页面让各 hook 重新加载
  useEffect(() => {
    const uid = session?.user?.id;
    if (!cloudConfigured || !uid || mergeStarted.current === uid) return;
    mergeStarted.current = uid;
    void syncWithCloud(uid)
      .then((changed) => {
        setMergedUid(uid);
        setLastSyncAt(clock());
        setSyncError(false);
        if (changed) window.location.reload();
      })
      .catch(() => setSyncError(true));
  }, [session]);

  // 学习数据变化 → 防抖推送
  useEffect(() => {
    const uid = session?.user?.id;
    if (!cloudConfigured || !uid || mergedUid !== uid) return;
    const t = setTimeout(() => {
      void pushToCloud(uid)
        .then(() => {
          setLastSyncAt(clock());
          setSyncError(false);
        })
        .catch(() => setSyncError(true));
    }, 2500);
    return () => clearTimeout(t);
  }, [dirtySignal, session, mergedUid]);

  const sendMagicLink = useCallback(async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin + window.location.pathname },
      });
      if (error) return { ok: false, message: error.message };
      return { ok: true };
    } catch (e) {
      return { ok: false, message: e instanceof Error ? e.message : String(e) };
    }
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    mergeStarted.current = null;
    setMergedUid(null);
    setLastSyncAt('');
  }, []);

  const syncNow = useCallback(async () => {
    const uid = session?.user?.id;
    if (!uid) return;
    try {
      await syncWithCloud(uid);
      setLastSyncAt(clock());
      setSyncError(false);
    } catch {
      setSyncError(true);
    }
  }, [session]);

  return { enabled: cloudConfigured, session, ready, lastSyncAt, syncError, sendMagicLink, signOut, syncNow };
}
