'use client';

import { useState } from 'react';
import type { CloudSyncState } from './cloudSync';
import { track } from './analytics';

/** 「我的」Tab 里的账户与云同步卡片。Supabase 未配置时由父组件直接不渲染。 */
export function AccountCard({ cloud, lang }: { cloud: CloudSyncState; lang: 'en' | 'zh' }) {
  const t = (zh: string, en: string) => (lang === 'en' ? en : zh);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errMsg, setErrMsg] = useState('');

  if (!cloud.enabled || !cloud.ready) return null;

  const user = cloud.session?.user ?? null;

  return (
    <div className="mb-10 rounded-2xl border-2 border-[#1cb0f6] bg-[var(--card)] p-5">
      <p className="mb-1 text-base font-extrabold">☁️ {t('账户与云同步', 'Account & Cloud Sync')}</p>

      {user ? (
        <>
          <p className="text-xs text-[var(--muted-foreground)]">
            {t('已登录：', 'Signed in: ')}
            <span className="font-bold text-[var(--foreground)]">{user.email}</span>
          </p>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
            {cloud.syncError
              ? t('⚠️ 上次同步失败，稍后会自动重试', '⚠️ Last sync failed — will retry automatically')
              : cloud.lastSyncAt
                ? t(`进度已同步到云端 · 上次同步 ${cloud.lastSyncAt}`, `Progress synced · last sync ${cloud.lastSyncAt}`)
                : t('正在同步…', 'Syncing…')}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => { track('cloud_sync_manual'); void cloud.syncNow(); }}
              className="rounded-full border border-[#1cb0f6] px-4 py-1.5 text-xs font-bold text-[#1cb0f6] transition hover:bg-[#1cb0f6]/10"
            >
              {t('立即同步', 'Sync now')}
            </button>
            <button
              onClick={() => { track('cloud_sign_out'); void cloud.signOut(); }}
              className="rounded-full border border-[var(--border)] px-4 py-1.5 text-xs font-bold text-[var(--muted-foreground)] transition hover:bg-[var(--muted)]"
            >
              {t('退出登录', 'Sign out')}
            </button>
          </div>
        </>
      ) : status === 'sent' ? (
        <p className="text-xs leading-relaxed text-[var(--muted-foreground)]">
          📬 {t(
            `登录链接已发送到 ${email}，去邮箱点开即可（可能在垃圾邮件里）。点开后回到本页，进度会自动合并上云。`,
            `Magic link sent to ${email} — open it from your inbox (check spam too). Once you're back, progress merges to the cloud automatically.`,
          )}
        </p>
      ) : (
        <>
          <p className="text-xs leading-relaxed text-[var(--muted-foreground)]">
            {t(
              '进度目前只存在这台设备上。留下邮箱，点一下邮件里的链接即可登录（无需密码），进度、错题本和徽章会同步到云端，换设备无缝续学。',
              'Your progress lives only on this device. Enter your email and click the link we send — no password needed. Progress, mistake book and badges sync to the cloud.',
            )}
          </p>
          <form
            className="mt-3 flex flex-wrap gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.includes('@') || status === 'sending') return;
              setStatus('sending');
              track('cloud_magic_link_send');
              void cloud.sendMagicLink(email.trim()).then((r) => {
                if (r.ok) setStatus('sent');
                else {
                  setErrMsg(r.message ?? '');
                  setStatus('error');
                }
              });
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('你的邮箱', 'you@example.com')}
              className="min-w-0 flex-1 rounded-xl border-2 border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[#1cb0f6]"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="rounded-xl border-b-4 border-[#1899d6] bg-[#1cb0f6] px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-white transition hover:bg-[#2bbcff] active:translate-y-0.5 active:border-b-2 disabled:opacity-50"
            >
              {status === 'sending' ? t('发送中…', 'Sending…') : t('发送登录链接', 'Send magic link')}
            </button>
          </form>
          {status === 'error' && (
            <p className="mt-2 text-xs font-bold text-[#ea2b2b]">
              {t('发送失败，请稍后再试', 'Failed to send — try again later')}
              {errMsg ? `（${errMsg}）` : ''}
            </p>
          )}
        </>
      )}
    </div>
  );
}
