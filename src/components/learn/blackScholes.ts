/**
 * 策略实验室的定价引擎：Black-Scholes 定价与希腊字母
 * 单位约定：T 为年（天数/365），sigma 为小数（0.30 = 30%），
 * theta 为每日历天损耗，vega 为 IV 每变动 1 个百分点的价格变化。
 */

export type LegType = 'call' | 'put' | 'stock';

export interface Leg {
  type: LegType;
  /** 行权价；stock 腿忽略 */
  strike: number;
  /** 每股数量：+1 买入 / -1 卖出（可以是 ±2 等） */
  qty: number;
}

export interface Greeks {
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
}

const RISK_FREE = 0.04;

/** 标准正态 CDF（Abramowitz–Stegun 近似，误差 < 7.5e-8） */
export function normCdf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * ax);
  const y =
    1 -
    (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
      t *
      Math.exp(-ax * ax);
  return 0.5 * (1 + sign * y);
}

function normPdf(x: number): number {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

function intrinsic(type: LegType, S: number, K: number): number {
  if (type === 'stock') return S;
  if (type === 'call') return Math.max(S - K, 0);
  return Math.max(K - S, 0);
}

/** 单腿理论价（每股）。T<=0 时退化为内在价值。 */
export function legPrice(type: LegType, S: number, K: number, T: number, sigma: number): number {
  if (type === 'stock') return S;
  if (T <= 0 || sigma <= 0) return intrinsic(type, S, K);
  const sqrtT = Math.sqrt(T);
  const d1 = (Math.log(S / K) + (RISK_FREE + 0.5 * sigma * sigma) * T) / (sigma * sqrtT);
  const d2 = d1 - sigma * sqrtT;
  const df = Math.exp(-RISK_FREE * T);
  if (type === 'call') return S * normCdf(d1) - K * df * normCdf(d2);
  return K * df * normCdf(-d2) - S * normCdf(-d1);
}

/** 单腿希腊字母（每股）。 */
export function legGreeks(type: LegType, S: number, K: number, T: number, sigma: number): Greeks {
  if (type === 'stock') return { delta: 1, gamma: 0, theta: 0, vega: 0 };
  if (T <= 0 || sigma <= 0) {
    const itm = intrinsic(type, S, K) > 0;
    return { delta: type === 'call' ? (itm ? 1 : 0) : itm ? -1 : 0, gamma: 0, theta: 0, vega: 0 };
  }
  const sqrtT = Math.sqrt(T);
  const d1 = (Math.log(S / K) + (RISK_FREE + 0.5 * sigma * sigma) * T) / (sigma * sqrtT);
  const d2 = d1 - sigma * sqrtT;
  const df = Math.exp(-RISK_FREE * T);
  const pdf = normPdf(d1);

  const delta = type === 'call' ? normCdf(d1) : normCdf(d1) - 1;
  const gamma = pdf / (S * sigma * sqrtT);
  const vega = (S * pdf * sqrtT) / 100;
  const thetaYear =
    type === 'call'
      ? (-S * pdf * sigma) / (2 * sqrtT) - RISK_FREE * K * df * normCdf(d2)
      : (-S * pdf * sigma) / (2 * sqrtT) + RISK_FREE * K * df * normCdf(-d2);
  return { delta, gamma, theta: thetaYear / 365, vega };
}

/** 组合在给定市场状态下的每股价值 */
export function positionValue(legs: Leg[], S: number, T: number, sigma: number): number {
  return legs.reduce((sum, l) => sum + l.qty * legPrice(l.type, S, l.strike, T, sigma), 0);
}

/** 组合到期内在价值（每股） */
export function positionExpiryValue(legs: Leg[], S: number): number {
  return legs.reduce((sum, l) => sum + l.qty * intrinsic(l.type, S, l.strike), 0);
}

/** 组合希腊字母（每股汇总） */
export function positionGreeks(legs: Leg[], S: number, T: number, sigma: number): Greeks {
  return legs.reduce<Greeks>(
    (acc, l) => {
      const g = legGreeks(l.type, S, l.strike, T, sigma);
      return {
        delta: acc.delta + l.qty * g.delta,
        gamma: acc.gamma + l.qty * g.gamma,
        theta: acc.theta + l.qty * g.theta,
        vega: acc.vega + l.qty * g.vega,
      };
    },
    { delta: 0, gamma: 0, theta: 0, vega: 0 },
  );
}
