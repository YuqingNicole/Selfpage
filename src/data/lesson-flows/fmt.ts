/**
 * 课程计算器的数字格式化。中文用「亿 / 万亿」，英文用 B / T。
 * 金额单位一律为美元。
 */

/** 最多保留 digits 位小数、去掉多余的 0，整数部分加千分位（1000 → "1,000"，2.50 → "2.5"） */
const trim = (n: number, digits: number) => n.toLocaleString('en-US', { maximumFractionDigits: digits });

/** 美元金额（中文）：≥1 万亿显示万亿，≥1 亿显示亿，否则带千分位 */
export function usdZh(v: number, digits = 2): string {
  const sign = v < 0 ? '−' : '';
  const a = Math.abs(v);
  if (a >= 1e12) return `${sign}$${trim(a / 1e12, digits)} 万亿`;
  if (a >= 1e8) return `${sign}$${trim(a / 1e8, a >= 1e10 ? 0 : 1)} 亿`;
  if (a >= 100) return `${sign}$${Math.round(a).toLocaleString('en-US')}`;
  return `${sign}$${a.toFixed(2)}`;
}

/** 美元金额（英文）：T / B / M */
export function usdEn(v: number, digits = 2): string {
  const sign = v < 0 ? '−' : '';
  const a = Math.abs(v);
  if (a >= 1e12) return `${sign}$${trim(a / 1e12, digits)}T`;
  if (a >= 1e9) return `${sign}$${trim(a / 1e9, a >= 1e11 ? 0 : 1)}B`;
  if (a >= 1e6) return `${sign}$${trim(a / 1e6, 1)}M`;
  if (a >= 100) return `${sign}$${Math.round(a).toLocaleString('en-US')}`;
  return `${sign}$${a.toFixed(2)}`;
}

/** 股数（中文）：亿股 */
export const sharesZh = (v: number) => `${trim(v / 1e8, 1)} 亿股`;
/** 股数（英文）：billion shares */
export const sharesEn = (v: number) => `${trim(v / 1e9, 2)}B shares`;

/** 每股价格 */
export const px = (v: number) => `$${v.toFixed(2)}`;
/** 百分比变化（带正负号） */
export const pctChange = (v: number) => `${v >= 0 ? '+' : '−'}${Math.abs(v * 100).toFixed(0)}%`;
/** 比率（小数 → 百分比，保留 1 位） */
export const pct = (v: number) => `${(v * 100).toFixed(1)}%`;
/** 每股金额，负数用「−$」 */
export const pxSigned = (v: number) => `${v < 0 ? '−' : ''}$${Math.abs(v).toFixed(2)}`;
