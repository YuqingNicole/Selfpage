'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { track } from './analytics';
import { sfx } from './sounds';

/**
 * Memo 工作台 —— L4 研究习惯的落地工具。
 * 模板强制四要素：thesis、证据、证伪条件、信念分。证伪条件为必填（这就是课程的态度）。
 * 每周首份 memo 奖励 XP；全部存本地（未来随账户上云，并入认知档案）。
 */

const STORAGE_KEY = 'invest-memos-v1';
const WEEK_XP_KEY = 'invest-memo-week-v1';
export const MEMO_XP = 10;

export type MemoStance = 'long' | 'short' | 'watch';

export interface InvestMemo {
  id: string;
  ticker: string;
  stance: MemoStance;
  thesis: string;
  evidence: string[];
  falsifier: string;
  horizon: string;
  conviction: number;
  createdAt: string; // YYYY-MM-DD
  review?: { note: string; date: string };
}

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** ISO 周标识 YYYY-Www，用于每周首份 memo 的 XP 判定 */
function weekKey(): string {
  const d = new Date();
  const target = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((target.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
  return `${target.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

export function loadMemos(): InvestMemo[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveMemos(memos: InvestMemo[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
  } catch {
    /* ignore */
  }
}

/** 本周是否已领过 memo XP；未领则标记并返回 true */
function claimWeeklyXp(): boolean {
  try {
    const wk = weekKey();
    if (localStorage.getItem(WEEK_XP_KEY) === wk) return false;
    localStorage.setItem(WEEK_XP_KEY, wk);
    return true;
  } catch {
    return false;
  }
}

const STANCE_META: Record<MemoStance, { zh: string; en: string; color: string }> = {
  long: { zh: '看多', en: 'Long', color: '#58cc02' },
  short: { zh: '看空', en: 'Short', color: '#ff4b4b' },
  watch: { zh: '观察', en: 'Watch', color: '#1cb0f6' },
};

type View = { kind: 'list' } | { kind: 'edit' } | { kind: 'detail'; id: string };

export function MemoWorkbench({ onExit, onWeeklyXp }: { onExit: () => void; onWeeklyXp: () => void }) {
  const { lang } = useLanguage();
  const t = (zh: string, en: string) => (lang === 'en' ? en : zh);
  const [memos, setMemos] = useState<InvestMemo[]>([]);
  const [view, setView] = useState<View>({ kind: 'list' });

  // 编辑态
  const [ticker, setTicker] = useState('');
  const [stance, setStance] = useState<MemoStance>('long');
  const [thesis, setThesis] = useState('');
  const [evidence, setEvidence] = useState(['', '', '']);
  const [falsifier, setFalsifier] = useState('');
  const [horizon, setHorizon] = useState('6-12M');
  const [conviction, setConviction] = useState(5);
  const [formError, setFormError] = useState('');
  const [reviewNote, setReviewNote] = useState('');

  useEffect(() => setMemos(loadMemos()), []);

  const inputCls =
    'w-full rounded-xl border-2 border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[#1cb0f6]';
  const labelCls = 'mb-1 block text-xs font-extrabold text-[var(--muted-foreground)]';
  const primaryBtn =
    'w-full rounded-2xl border-b-4 border-[#46a302] bg-[#58cc02] py-3.5 text-base font-extrabold uppercase tracking-wide text-white transition hover:bg-[#61d904] active:translate-y-0.5 active:border-b-2';

  function resetForm() {
    setTicker('');
    setStance('long');
    setThesis('');
    setEvidence(['', '', '']);
    setFalsifier('');
    setHorizon('6-12M');
    setConviction(5);
    setFormError('');
  }

  function submit() {
    if (!ticker.trim() || !thesis.trim()) {
      setFormError(t('标的和 thesis 是必填项。', 'Ticker and thesis are required.'));
      return;
    }
    if (!falsifier.trim()) {
      setFormError(t('没有证伪条件的 memo 不允许保存——这正是 L4 第 15 单元的全部意义。', 'A memo without a falsifier cannot be saved — that is the entire point of Unit 15.'));
      return;
    }
    const memo: InvestMemo = {
      id: `m${Date.now().toString(36)}`,
      ticker: ticker.trim().toUpperCase(),
      stance,
      thesis: thesis.trim(),
      evidence: evidence.map((e) => e.trim()).filter(Boolean),
      falsifier: falsifier.trim(),
      horizon,
      conviction,
      createdAt: todayStr(),
    };
    const next = [memo, ...memos];
    setMemos(next);
    saveMemos(next);
    sfx.complete();
    const weekly = claimWeeklyXp();
    track('memo_save', { stance, conviction, weekly });
    if (weekly) onWeeklyXp();
    resetForm();
    setView({ kind: 'detail', id: memo.id });
  }

  function addReview(id: string) {
    if (!reviewNote.trim()) return;
    const next = memos.map((m) => (m.id === id ? { ...m, review: { note: reviewNote.trim(), date: todayStr() } } : m));
    setMemos(next);
    saveMemos(next);
    sfx.badge();
    track('memo_review', { memo: id });
    setReviewNote('');
  }

  function remove(id: string) {
    if (!window.confirm(t('删除这份 memo？', 'Delete this memo?'))) return;
    const next = memos.filter((m) => m.id !== id);
    setMemos(next);
    saveMemos(next);
    setView({ kind: 'list' });
  }

  const detail = view.kind === 'detail' ? memos.find((m) => m.id === view.id) : null;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto w-full max-w-xl px-5 py-8 pb-16">
        <div className="mb-5 flex items-center justify-between">
          <button
            onClick={() => (view.kind === 'list' ? onExit() : setView({ kind: 'list' }))}
            aria-label={view.kind === 'list' ? t('退出工作台', 'Exit workbench') : t('返回列表', 'Back to list')}
            className="rounded-full border border-[var(--border)] px-3 py-1 text-sm font-bold text-[var(--muted-foreground)] transition hover:bg-[var(--muted)]"
          >
            {view.kind === 'list' ? '✕' : '←'}
          </button>
          <span className="text-sm font-extrabold">📝 {t('Memo 工作台', 'Memo Workbench')}</span>
          <span className="w-10" />
        </div>

        {view.kind === 'list' && (
          <>
            <p className="mb-4 text-xs leading-relaxed text-[var(--muted-foreground)]">
              {t(
                '一份合格的 memo：一句话 thesis + 分级证据 + 证伪条件 + 信念分。每周第一份 +' + MEMO_XP + ' XP。写下来的判断才能被复盘，被复盘的判断才会变成判断力。',
                `A qualified memo: a one-sentence thesis, graded evidence, a falsifier and a conviction score. First memo each week earns +${MEMO_XP} XP. Only written judgments can be reviewed — and only reviewed judgments become judgment.`,
              )}
            </p>
            <button onClick={() => { resetForm(); setView({ kind: 'edit' }); }} className={`${primaryBtn} mb-6`}>
              ＋ {t('写一份新 memo', 'Write a new memo')}
            </button>
            {memos.length === 0 ? (
              <p className="text-center text-sm text-[var(--muted-foreground)]">
                {t('还没有 memo。第一份从你最有信念的持仓开始。', 'No memos yet. Start with your highest-conviction holding.')}
              </p>
            ) : (
              <ul className="space-y-3">
                {memos.map((m) => {
                  const sm = STANCE_META[m.stance];
                  return (
                    <li key={m.id}>
                      <button
                        onClick={() => setView({ kind: 'detail', id: m.id })}
                        className="w-full rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-4 text-left transition hover:border-[#1cb0f6]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-extrabold">{m.ticker}</span>
                          <span className="rounded-full px-2 py-0.5 text-[10px] font-extrabold text-white" style={{ backgroundColor: sm.color }}>
                            {lang === 'en' ? sm.en : sm.zh}
                          </span>
                          <span className="text-[10px] font-bold text-[var(--muted-foreground)]">
                            {t('信念', 'Conviction')} {m.conviction}/10 · {m.horizon}
                          </span>
                          {m.review && <span className="text-[10px] font-bold text-[#58a700]">✅ {t('已复盘', 'Reviewed')}</span>}
                          <span className="ml-auto text-[10px] text-[var(--muted-foreground)]">{m.createdAt}</span>
                        </div>
                        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[var(--muted-foreground)]">{m.thesis}</p>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}

        {view.kind === 'edit' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>{t('标的', 'Ticker')} *</label>
                <input value={ticker} onChange={(e) => setTicker(e.target.value)} placeholder="NVDA / 0700.HK" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>{t('方向', 'Stance')}</label>
                <div className="flex gap-1.5">
                  {(Object.keys(STANCE_META) as MemoStance[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setStance(s)}
                      className="flex-1 rounded-xl border-2 px-1 py-2 text-xs font-extrabold transition"
                      style={
                        stance === s
                          ? { borderColor: STANCE_META[s].color, color: '#fff', backgroundColor: STANCE_META[s].color }
                          : { borderColor: 'var(--border)', color: 'var(--muted-foreground)' }
                      }
                    >
                      {lang === 'en' ? STANCE_META[s].en : STANCE_META[s].zh}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <label className={labelCls}>
                {t('一句话 thesis（标的 + 方向 + 核心逻辑 + 时间尺度）', 'One-sentence thesis (target + direction + logic + horizon)')} *
              </label>
              <textarea value={thesis} onChange={(e) => setThesis(e.target.value)} rows={3} className={inputCls}
                placeholder={t('例：未来 2-3 年，市场低估了……', 'e.g. Over the next 2-3 years, the market underprices…')} />
            </div>
            <div>
              <label className={labelCls}>{t('三条独立证据（按等级：一手数据优先）', 'Three independent pieces of evidence (primary data first)')}</label>
              {evidence.map((ev, i) => (
                <input
                  key={i}
                  value={ev}
                  onChange={(e) => setEvidence(evidence.map((x, j) => (j === i ? e.target.value : x)))}
                  placeholder={`${t('证据', 'Evidence')} ${i + 1}`}
                  className={`${inputCls} mb-2`}
                />
              ))}
            </div>
            <div>
              <label className={labelCls}>
                {t('证伪条件（指标 + 阈值 + 死线，触发即执行）', 'Falsifier (metric + threshold + deadline; trigger = execute)')} *
              </label>
              <textarea value={falsifier} onChange={(e) => setFalsifier(e.target.value)} rows={2} className={inputCls}
                placeholder={t('例：若 ___ 连续两季低于 ___，一周内清仓', 'e.g. If ___ stays below ___ for two quarters, exit within a week')} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>{t('时间尺度', 'Horizon')}</label>
                <select value={horizon} onChange={(e) => setHorizon(e.target.value)} className={inputCls}>
                  {['1-3M', '3-6M', '6-12M', '1-3Y', '3Y+'].map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>{t('信念分', 'Conviction')} {conviction}/10</label>
                <input type="range" min={1} max={10} value={conviction} onChange={(e) => setConviction(Number(e.target.value))} className="w-full accent-[#58cc02]" />
              </div>
            </div>
            {formError && <p className="text-xs font-bold text-[#ea2b2b]">{formError}</p>}
            <button onClick={submit} className={primaryBtn}>
              {t('保存 memo', 'Save memo')}
            </button>
          </div>
        )}

        {view.kind === 'detail' && detail && (
          <div className="space-y-4">
            <div className="rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-5">
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold">{detail.ticker}</span>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-extrabold text-white" style={{ backgroundColor: STANCE_META[detail.stance].color }}>
                  {lang === 'en' ? STANCE_META[detail.stance].en : STANCE_META[detail.stance].zh}
                </span>
                <span className="text-xs font-bold text-[var(--muted-foreground)]">
                  {t('信念', 'Conviction')} {detail.conviction}/10 · {detail.horizon} · {detail.createdAt}
                </span>
              </div>
              <p className="mt-3 text-sm font-bold leading-relaxed">{detail.thesis}</p>
              {detail.evidence.length > 0 && (
                <>
                  <p className="mt-4 text-[10px] font-extrabold uppercase tracking-widest text-[var(--muted-foreground)]">{t('证据链', 'Evidence')}</p>
                  <ul className="mt-1 space-y-1 text-xs leading-relaxed">
                    {detail.evidence.map((e, i) => (
                      <li key={i}>▸ {e}</li>
                    ))}
                  </ul>
                </>
              )}
              <p className="mt-4 text-[10px] font-extrabold uppercase tracking-widest text-[#ea2b2b]">{t('证伪条件', 'Falsifier')}</p>
              <p className="mt-1 text-xs font-bold leading-relaxed">{detail.falsifier}</p>
            </div>

            {detail.review ? (
              <div className="rounded-2xl border-2 border-[#58cc02] bg-[var(--card)] p-5">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#58a700]">
                  {t('复盘', 'Review')} · {detail.review.date}
                </p>
                <p className="mt-1 text-xs leading-relaxed">{detail.review.note}</p>
              </div>
            ) : (
              <div className="rounded-2xl border-2 border-dashed border-[var(--border)] p-5">
                <p className={labelCls}>
                  {t('复盘五问：原 thesis → 实际发生 → 预期差 → 哪一环失灵 → 下次改法', 'The five questions: thesis → what happened → the gap → which link failed → the fix')}
                </p>
                <textarea value={reviewNote} onChange={(e) => setReviewNote(e.target.value)} rows={3} className={inputCls}
                  placeholder={t('平仓或阶段结束后 48 小时内写……', 'Write within 48 hours of closing…')} />
                <button
                  onClick={() => addReview(detail.id)}
                  className="mt-3 rounded-full border border-[#58cc02] px-4 py-1.5 text-xs font-bold text-[#58a700] transition hover:bg-[#58cc02]/10"
                >
                  {t('保存复盘', 'Save review')}
                </button>
              </div>
            )}

            <button onClick={() => remove(detail.id)} className="text-xs font-semibold text-[#ea2b2b] underline-offset-4 hover:underline">
              {t('删除这份 memo', 'Delete this memo')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
