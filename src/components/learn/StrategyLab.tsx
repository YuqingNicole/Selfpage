'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  positionExpiryValue,
  positionGreeks,
  positionValue,
  type Leg,
} from './blackScholes';
import { awardBadge } from './badges';
import { markDaily } from './daily';

const CASES_SEEN_KEY = 'options-lab-cases-v1';

/** 记录看完的案例；计入每日任务，集齐全部时颁发「实验室老鼠」徽章 */
function markCaseFinished(id: string, total: number) {
  markDaily('lab');
  try {
    const seen: string[] = JSON.parse(localStorage.getItem(CASES_SEEN_KEY) ?? '[]');
    if (!seen.includes(id)) {
      seen.push(id);
      localStorage.setItem(CASES_SEEN_KEY, JSON.stringify(seen));
    }
    if (seen.length >= total) awardBadge('lab_rat');
  } catch {
    /* ignore */
  }
}

/**
 * 策略实验室：交互式期权沙盘
 * 开仓状态固定（S=100 / IV=30% / 45 天），拖动滑杆模拟市场变化，
 * 实时对比 T+0 曲线与到期损益，并展示组合希腊字母。
 */

interface Strategy {
  id: string;
  zh: string;
  en: string;
  zhDesc: string;
  enDesc: string;
  legs: Leg[];
}

const S0 = 100;
const IV0 = 30;
const DAYS0 = 45;

const STRATEGIES: Strategy[] = [
  {
    id: 'longCall', zh: '买入 Call', en: 'Long Call',
    zhDesc: '强烈看涨。亏损封底权利金，收益上不封顶。',
    enDesc: 'Strongly bullish. Loss capped at premium, unlimited upside.',
    legs: [{ type: 'call', strike: 100, qty: 1 }],
  },
  {
    id: 'longPut', zh: '买入 Put', en: 'Long Put',
    zhDesc: '强烈看跌。亏损封底权利金，越跌越赚。',
    enDesc: 'Strongly bearish. Loss capped at premium, gains grow as price falls.',
    legs: [{ type: 'put', strike: 100, qty: 1 }],
  },
  {
    id: 'shortPut', zh: '卖出 Put（CSP）', en: 'Short Put (CSP)',
    zhDesc: '看不跌。收权利金，跌破行权价开始承压。',
    enDesc: 'Neutral-to-bullish. Collect premium; pressure builds below the strike.',
    legs: [{ type: 'put', strike: 95, qty: -1 }],
  },
  {
    id: 'coveredCall', zh: '备兑开仓', en: 'Covered Call',
    zhDesc: '持股收租。上涨封顶在卖出行权价，下跌仅有权利金缓冲。',
    enDesc: 'Stock + short call: rent income, capped upside, thin downside cushion.',
    legs: [
      { type: 'stock', strike: 0, qty: 1 },
      { type: 'call', strike: 105, qty: -1 },
    ],
  },
  {
    id: 'protectivePut', zh: '保护性 Put', en: 'Protective Put',
    zhDesc: '持股买保险。最大回撤被锁定，上涨扣除保费。',
    enDesc: 'Stock + put insurance: drawdown locked, upside minus the premium.',
    legs: [
      { type: 'stock', strike: 0, qty: 1 },
      { type: 'put', strike: 95, qty: 1 },
    ],
  },
  {
    id: 'bullCallSpread', zh: '牛市看涨价差', en: 'Bull Call Spread',
    zhDesc: '温和看涨。成本与盈亏双向锁定。',
    enDesc: 'Moderately bullish. Cost, max gain and max loss all locked.',
    legs: [
      { type: 'call', strike: 95, qty: 1 },
      { type: 'call', strike: 105, qty: -1 },
    ],
  },
  {
    id: 'straddle', zh: '买入跨式', en: 'Long Straddle',
    zhDesc: '赌大波动不赌方向。谷底是双份权利金。',
    enDesc: 'Bet on movement, not direction. The valley is double premium.',
    legs: [
      { type: 'call', strike: 100, qty: 1 },
      { type: 'put', strike: 100, qty: 1 },
    ],
  },
  {
    id: 'strangle', zh: '买入宽跨式', en: 'Long Strangle',
    zhDesc: '更便宜的跨式，需要更大的波动才盈利。',
    enDesc: 'Cheaper straddle; needs a bigger move to pay off.',
    legs: [
      { type: 'call', strike: 110, qty: 1 },
      { type: 'put', strike: 90, qty: 1 },
    ],
  },
  {
    id: 'ironCondor', zh: '铁鹰', en: 'Iron Condor',
    zhDesc: '赌区间横盘吃时间价值，两翼锁定最大亏损。',
    enDesc: 'Range-bound premium selling with wings capping the max loss.',
    legs: [
      { type: 'put', strike: 85, qty: 1 },
      { type: 'put', strike: 90, qty: -1 },
      { type: 'call', strike: 110, qty: -1 },
      { type: 'call', strike: 115, qty: 1 },
    ],
  },
  {
    id: 'collar', zh: '领口', en: 'Collar',
    zhDesc: '持股上下都设界：卖 Call 的收入支付买 Put 的保费。',
    enDesc: 'Stock boxed in: short call income pays for the protective put.',
    legs: [
      { type: 'stock', strike: 0, qty: 1 },
      { type: 'put', strike: 90, qty: 1 },
      { type: 'call', strike: 110, qty: -1 },
    ],
  },
  {
    id: 'shortCall', zh: '卖出 Call（裸）', en: 'Naked Short Call',
    zhDesc: '看不涨。收权利金，但暴涨时亏损无上限——最危险的单腿。',
    enDesc: 'Bet against a rally. Premium income, unlimited loss on a squeeze.',
    legs: [{ type: 'call', strike: 110, qty: -1 }],
  },
  {
    id: 'shortStrangle', zh: '卖出宽跨式', en: 'Short Strangle',
    zhDesc: '赌横盘收双份权利金，两个方向都裸露风险。',
    enDesc: 'Sell both wings for double premium — naked risk on both sides.',
    legs: [
      { type: 'call', strike: 110, qty: -1 },
      { type: 'put', strike: 90, qty: -1 },
    ],
  },
];

/* ---------- 经典案例剧场 ---------- */

interface CaseStep {
  spot: number;
  iv: number;
  days: number;
  zh: string;
  en: string;
}

interface LabCase {
  id: string;
  emoji: string;
  zh: string;
  en: string;
  strategyId: string;
  steps: CaseStep[];
  lessonZh: string;
  lessonEn: string;
}

const CASES: LabCase[] = [
  {
    id: 'gme', emoji: '🚀', zh: 'GME 逼空风暴', en: 'GME Squeeze',
    strategyId: 'shortCall',
    steps: [
      {
        spot: 100, iv: 30, days: 45,
        zh: '2021 年 1 月：你觉得这只股票涨不动了，裸卖 110 Call 收权利金。头几天横盘，收租的感觉很好。',
        en: 'Jan 2021: convinced the stock is capped, you sell a naked 110 call. It drifts sideways — easy rent.',
      },
      {
        spot: 115, iv: 60, days: 30,
        zh: '论坛开始沸腾：股价突破 115，IV 从 30 飙到 60。注意亏损不只来自股价——Vega 也在捅刀子。',
        en: 'The forums light up: spot breaks 115, IV doubles to 60. Losses come from vega as much as delta.',
      },
      {
        spot: 135, iv: 95, days: 21,
        zh: '逼空全面爆发：135 美元、IV 95。券商开始追缴保证金，你被迫在最贵的价位买回。',
        en: 'Full squeeze: $135, IV 95. Margin calls force you to buy back at the worst possible price.',
      },
    ],
    lessonZh: '教训：裸卖 Call 的亏损无上限。逼空时股价和 IV 双重碾压，保证金追缴会替你选平仓时机——而且永远选在最差的一刻。',
    lessonEn: 'Lesson: naked calls have unlimited loss. In a squeeze, delta and vega crush you together, and margin calls pick your exit — always the worst one.',
  },
  {
    id: 'earnings', emoji: '🎰', zh: '财报豪赌：IV Crush', en: 'Earnings IV Crush',
    strategyId: 'straddle',
    steps: [
      {
        spot: 100, iv: 60, days: 2,
        zh: '财报前一天买入跨式。注意开仓成本：IV 已被炒到 60，这份「彩票」定价并不便宜——市场认为会波动约 ±3.5%。',
        en: 'You buy a straddle the day before earnings. IV is pumped to 60 — the market has priced in a ±3.5% move.',
      },
      {
        spot: 101.5, iv: 25, days: 1,
        zh: '财报公布：小幅超预期，股价 +1.5%。方向你猜对了！但 IV 从 60 崩到 25，两条腿同时缩水。',
        en: 'Earnings beat, stock +1.5%. Right direction! But IV collapses 60→25 and both legs shrink anyway.',
      },
      {
        spot: 102, iv: 25, days: 0,
        zh: '到期：股价收在 +2%。涨幅没跑赢开仓时定价的 ±3.5%，跨式整体亏损离场。',
        en: 'Expiry: +2% total. The move never beat the ±3.5% that was priced in. The straddle loses.',
      },
    ],
    lessonZh: '教训：财报博弈赌的不是方向，是「实际波动 vs 已定价波动」。买贵了波动率，方向对也亏——这就是第 12 单元的隐含波动幅度。',
    lessonEn: 'Lesson: earnings plays are actual vs implied move, not direction. Overpay for volatility and even the right call loses.',
  },
  {
    id: 'covid', emoji: '🛡️', zh: '2020 年 3 月：保险生效', en: 'March 2020: Insurance Pays',
    strategyId: 'protectivePut',
    steps: [
      {
        spot: 100, iv: 30, days: 45,
        zh: '2 月中旬：持股 + 买入 95 Put。朋友笑你浪费保费——市场创新高，保险看起来很多余。',
        en: 'Mid-Feb: stock + a 95 put. Friends mock the wasted premium — markets are at all-time highs.',
      },
      {
        spot: 90, iv: 55, days: 35,
        zh: '疫情恐慌开始：-10%，IV 涨到 55。Put 的内在价值 + Vega 双引擎启动，组合亏损远小于裸持股。',
        en: 'Panic begins: -10%, IV at 55. The put gains on both intrinsic value and vega; you lose far less than stock alone.',
      },
      {
        spot: 75, iv: 80, days: 28,
        zh: '熔断周：-25%，IV 80。裸持股亏 $25，你的组合亏损被锁在保底价附近——保险在最贵的时候生效了。',
        en: 'Circuit-breaker week: -25%, IV 80. Naked stock is down $25; your loss is pinned near the floor.',
      },
    ],
    lessonZh: '教训：保险平时是成本，危机时是唯一还在工作的仓位。对比图上蓝线和「裸持股」的差距——这就是花保费买到的确定性。',
    lessonEn: 'Lesson: insurance is a cost in calm markets and the only working position in a crisis. The premium bought certainty.',
  },
  {
    id: 'condor', emoji: '🏖️', zh: '横盘的夏天：铁鹰收租', en: 'Sideways Summer Condor',
    strategyId: 'ironCondor',
    steps: [
      {
        spot: 100, iv: 30, days: 45,
        zh: '45 DTE 开仓铁鹰，收 $1.19 权利金。只要股价 45 天内呆在 90~110 区间，这笔钱就是你的。',
        en: 'Open a 45-DTE condor for $1.19 credit. Stay inside 90–110 for 45 days and it is all yours.',
      },
      {
        spot: 102, iv: 28, days: 24,
        zh: '三周过去，股价原地踏步。什么都没发生——而你已经赚到权利金的一半。这就是 Theta 在给你打工。',
        en: 'Three weeks of nothing. Exactly nothing — and you are already up half the credit. Theta at work.',
      },
      {
        spot: 99, iv: 26, days: 21,
        zh: '21 DTE 警报：机制说该走了。剩下的一半利润要用 Gamma 风险最毒的三周去换，数学上不划算。',
        en: '21 DTE: the mechanic says leave. The last half of the profit costs you the three most gamma-toxic weeks.',
      },
    ],
    lessonZh: '教训：中性策略赚「什么都不发生」的钱。吃到 50% 就提前离场——第 13 单元的 45 进 21 出，就是这幅图。',
    lessonEn: 'Lesson: neutral trades earn the nothing-happens premium. Take 50% and leave at 21 DTE — this chart is that rule.',
  },
  {
    id: 'zerodte', emoji: '🎟️', zh: '末日彩票（0DTE）', en: '0DTE Lottery Ticket',
    strategyId: 'longCall',
    steps: [
      {
        spot: 100, iv: 30, days: 1,
        zh: '到期前最后一天，平值 Call 便宜得像彩票。你想：亏也就亏这点，博一把。',
        en: 'One day to expiry, the ATM call is lottery-ticket cheap. Worst case you lose pocket change, right?',
      },
      {
        spot: 103, iv: 45, days: 1,
        zh: '上午一波拉升 +3%，期权翻了几倍。Gamma 在临期平值处最大——你感觉自己是天才。',
        en: 'A morning pop of +3% multiplies the option. Peak gamma at the money — you feel like a genius.',
      },
      {
        spot: 100, iv: 30, days: 0,
        zh: '尾盘回落，收盘价回到起点。期权归零，纸面利润一分没剩。',
        en: 'The afternoon fades it all back. The option expires worthless; the paper profit is gone.',
      },
    ],
    lessonZh: '教训：0DTE 的 Gamma 和 Theta 都是极端值，几小时内暴赚和归零都很正常。它是彩票，不是策略——仓位必须按彩票来给。',
    lessonEn: 'Lesson: 0DTE gamma and theta are both extreme; multi-bagger and zero in the same day is normal. Size it like a lottery ticket.',
  },
  {
    id: 'volmageddon', emoji: '🌋', zh: 'Volmageddon 2018', en: 'Volmageddon 2018',
    strategyId: 'shortStrangle',
    steps: [
      {
        spot: 100, iv: 15, days: 45,
        zh: '2018 年初：市场平静了一整年，IV 低到 15。卖宽跨式只能收到一点点权利金——但过去 12 个月每次都赚，你说服自己这是「稳定收益」。',
        en: 'Early 2018: a full year of calm, IV at 15. The strangle pays pennies — but it worked 12 months straight.',
      },
      {
        spot: 94, iv: 45, days: 30,
        zh: '2 月 5 日：股指跌 4%，VIX 单日翻倍。你收的那点权利金，在 IV 15→45 的 Vega 冲击面前不堪一击。',
        en: 'Feb 5: index down 4%, VIX doubles in a day. Your tiny credit is nothing against a 15→45 vega shock.',
      },
      {
        spot: 92, iv: 60, days: 28,
        zh: '保证金追缴：亏损是权利金的许多倍，做空波动率的产品 XIV 一夜清零退市。',
        en: 'Margin call: losses run many multiples of the credit. XIV, the short-vol ETN, goes to zero overnight.',
      },
    ],
    lessonZh: '教训：IV 低位时卖权利金 = 收益最薄、上行风险最大的时刻。第 13 单元的 IVR>50 门槛，就是为了让你避开这一天。',
    lessonEn: 'Lesson: selling premium at rock-bottom IV is minimum income for maximum risk. The IVR>50 filter exists to keep you out of this exact day.',
  },
  {
    id: 'wheel', emoji: '🎡', zh: '轮子第一步：被指派', en: 'The Wheel: Assignment',
    strategyId: 'shortPut',
    steps: [
      {
        spot: 100, iv: 30, days: 45,
        zh: '你本来就想在 95 买入这只股票，于是卖出 95 Put 收 $2——市场为你的「限价单」付了等待费。',
        en: 'You wanted the stock at 95 anyway, so you sell the 95 put for $2 — paid to wait on your own limit order.',
      },
      {
        spot: 92, iv: 40, days: 10,
        zh: '股价跌到 92。浮亏出现，但想清楚：你的实际接货成本是 95 - 2 = 93，仍低于你当初「愿意买」的心理价。',
        en: 'Spot drops to 92. Paper loss, but your true basis is 95 - 2 = 93 — still below what you were happy to pay.',
      },
      {
        spot: 88, iv: 35, days: 0,
        zh: '到期 88，被指派按 95 接货。对比：开仓那天直接买股票的人成本 100，你的成本 93。下一步：在持股上卖 Covered Call，轮子继续转。',
        en: 'Expiry at 88 — assigned at 95. The day-one stock buyer paid 100; your basis is 93. Next: sell a covered call and keep the wheel turning.',
      },
    ],
    lessonZh: '教训：只对真心想持有的股票、在真心愿意的价格卖 Put，被指派就不是事故而是折价买入。这就是第 14 单元的轮子策略。',
    lessonEn: 'Lesson: sell puts only on stocks you want at prices you like — then assignment is a discount purchase, not an accident.',
  },
];

/* ---------- 图表几何 ---------- */

const W = 360;
const H = 250;
const PAD = { l: 12, r: 12, t: 26, b: 32 };
const S_MIN = 60;
const S_MAX = 140;
const N = 120;

const BLUE = '#1cb0f6';
const ORANGE = '#ff9600';
const POS_FILL = 'rgba(88, 204, 2, 0.16)';
const NEG_FILL = 'rgba(255, 75, 75, 0.13)';

export function StrategyLab({ onExit }: { onExit: () => void }) {
  const { lang } = useLanguage();
  const [strategyId, setStrategyId] = useState('longCall');
  const [spot, setSpot] = useState(S0);
  const [iv, setIv] = useState(IV0);
  const [days, setDays] = useState(DAYS0);
  /** 开仓状态：自由模式为默认值，案例模式取剧情第一幕 */
  const [entry, setEntry] = useState({ spot: S0, iv: IV0, days: DAYS0 });
  const [caseId, setCaseId] = useState<string | null>(null);
  const [caseStep, setCaseStep] = useState(0);

  const strategy = STRATEGIES.find((s) => s.id === strategyId)!;
  const legs = strategy.legs;
  const activeCase = caseId ? CASES.find((c) => c.id === caseId)! : null;

  function applyMarket(m: { spot: number; iv: number; days: number }) {
    setSpot(m.spot);
    setIv(m.iv);
    setDays(m.days);
  }

  function selectStrategy(id: string) {
    setStrategyId(id);
    setCaseId(null);
    setEntry({ spot: S0, iv: IV0, days: DAYS0 });
    applyMarket({ spot: S0, iv: IV0, days: DAYS0 });
  }

  function selectCase(c: LabCase) {
    setCaseId(c.id);
    setCaseStep(0);
    setStrategyId(c.strategyId);
    const first = c.steps[0];
    setEntry({ spot: first.spot, iv: first.iv, days: first.days });
    applyMarket(first);
  }

  function gotoStep(i: number) {
    if (!activeCase) return;
    const idx = Math.max(0, Math.min(i, activeCase.steps.length - 1));
    setCaseStep(idx);
    applyMarket(activeCase.steps[idx]);
    if (idx === activeCase.steps.length - 1) markCaseFinished(activeCase.id, CASES.length);
  }

  /** 开仓成本（每股，正 = 净支出，负 = 净收入），在开仓状态定价 */
  const entryCost = useMemo(
    () => positionValue(legs, entry.spot, entry.days / 365, entry.iv / 100),
    [legs, entry],
  );

  const T = days / 365;
  const sigma = iv / 100;

  const nowPl = positionValue(legs, spot, T, sigma) - entryCost;
  const greeks = positionGreeks(legs, spot, T, sigma);

  /** 到期损益扫描：盈亏平衡点与最大盈亏（含无限判断） */
  const expiryStats = useMemo(() => {
    const pl = (s: number) => positionExpiryValue(legs, s) - entryCost;
    const breakevens: number[] = [];
    let prev = pl(0.01);
    let maxP = prev;
    let minP = prev;
    for (let s = 1; s <= 300; s += 0.5) {
      const v = pl(s);
      if ((prev <= 0 && v > 0) || (prev >= 0 && v < 0)) {
        const t = Math.abs(prev) / (Math.abs(prev) + Math.abs(v));
        breakevens.push(s - 0.5 + 0.5 * t);
      }
      maxP = Math.max(maxP, v);
      minP = Math.min(minP, v);
      prev = v;
    }
    const slopeRight = pl(300) - pl(299);
    return {
      breakevens,
      maxProfit: slopeRight > 0.001 ? Infinity : maxP,
      // 右端斜率为负说明亏损随股价无限扩大（如裸卖 Call）
      maxLoss: slopeRight < -0.001 ? -Infinity : minP,
    };
  }, [legs, entryCost]);

  /* ---- 曲线采样 ---- */
  const chart = useMemo(() => {
    const xs: number[] = [];
    const expiry: number[] = [];
    const now: number[] = [];
    for (let i = 0; i <= N; i++) {
      const s = S_MIN + ((S_MAX - S_MIN) * i) / N;
      xs.push(s);
      expiry.push(positionExpiryValue(legs, s) - entryCost);
      now.push(positionValue(legs, s, T, sigma) - entryCost);
    }
    let yMin = Math.min(0, ...expiry, ...now);
    let yMax = Math.max(0, ...expiry, ...now);
    const padY = Math.max((yMax - yMin) * 0.12, 1);
    yMin -= padY;
    yMax += padY;

    const sx = (s: number) => PAD.l + ((s - S_MIN) / (S_MAX - S_MIN)) * (W - PAD.l - PAD.r);
    const sy = (y: number) => PAD.t + ((yMax - y) / (yMax - yMin)) * (H - PAD.t - PAD.b);
    const toPath = (ys: number[]) =>
      ys.map((y, i) => `${i === 0 ? 'M' : 'L'}${sx(xs[i]).toFixed(1)},${sy(y).toFixed(1)}`).join(' ');

    // 到期曲线的红绿分区填充
    const zeroY = sy(0);
    const pos: string[] = [];
    const neg: string[] = [];
    let seg: [number, number][] = [];
    let sign = 0;
    const flush = () => {
      if (seg.length > 1 && sign !== 0) {
        const poly =
          seg.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ') +
          ` ${seg[seg.length - 1][0].toFixed(1)},${zeroY.toFixed(1)} ${seg[0][0].toFixed(1)},${zeroY.toFixed(1)}`;
        (sign > 0 ? pos : neg).push(poly);
      }
      seg = [];
    };
    for (let i = 0; i <= N; i++) {
      const y = expiry[i];
      const s2 = y > 1e-9 ? 1 : y < -1e-9 ? -1 : 0;
      if (i > 0 && s2 !== 0 && sign !== 0 && s2 !== sign) {
        const yPrev = expiry[i - 1];
        const t = Math.abs(yPrev) / (Math.abs(yPrev) + Math.abs(y));
        const xc = sx(xs[i - 1] + (xs[i] - xs[i - 1]) * t);
        seg.push([xc, zeroY]);
        flush();
        seg.push([xc, zeroY]);
      }
      seg.push([sx(xs[i]), sy(y)]);
      if (s2 !== 0) sign = s2;
    }
    flush();

    return { sx, sy, zeroY, expiryPath: toPath(expiry), nowPath: toPath(now), pos, neg };
  }, [legs, entryCost, T, sigma]);

  const fmt = (v: number, d = 2) =>
    v === Infinity ? '∞' : v === -Infinity ? '-∞' : v.toFixed(d);

  const t = (zh: string, en: string) => (lang === 'en' ? en : zh);

  const greekTiles = [
    { label: 'Delta', value: greeks.delta, hint: t('股价 +$1 的影响', 'per $1 move') },
    { label: 'Gamma', value: greeks.gamma, hint: t('Delta 的变化速度', 'delta change rate') },
    { label: 'Theta', value: greeks.theta, hint: t('每天时间损耗', 'per day') },
    { label: 'Vega', value: greeks.vega, hint: t('IV +1% 的影响', 'per 1% IV') },
  ];

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto w-full max-w-2xl px-4 pb-16 pt-5">
        {/* 顶栏 */}
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={onExit}
            aria-label={t('退出实验室', 'Exit lab')}
            className="text-2xl leading-none text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
          >
            ✕
          </button>
          <h1 className="text-xl font-extrabold sm:text-2xl">
            🧪 {t('策略实验室', 'Strategy Lab')}
          </h1>
        </div>
        <p className="mb-4 text-xs leading-relaxed text-[var(--muted-foreground)]">
          {t(
            `开仓状态：股价 $${entry.spot}、IV ${entry.iv}%、剩余 ${entry.days} 天。拖动滑杆模拟行情变化，观察蓝色 T+0 曲线如何随时间和波动率移动。`,
            `Entry: $${entry.spot} spot, ${entry.iv}% IV, ${entry.days} days out. Drag the sliders to simulate the market and watch the blue T+0 curve drift with time and volatility.`,
          )}
        </p>

        {/* 经典案例剧场 */}
        <p className="mb-2 text-xs font-extrabold uppercase tracking-wide text-[var(--muted-foreground)]">
          🎬 {t('经典案例', 'Classic Cases')}
        </p>
        <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
          {CASES.map((c) => (
            <button
              key={c.id}
              onClick={() => selectCase(c)}
              className={`shrink-0 rounded-full border-2 px-4 py-1.5 text-xs font-extrabold transition ${
                c.id === caseId
                  ? 'border-[#f59f00] bg-[#fff7e0] text-[#b58900]'
                  : 'border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]'
              }`}
            >
              {c.emoji} {lang === 'en' ? c.en : c.zh}
            </button>
          ))}
        </div>

        {/* 案例旁白 */}
        {activeCase && (
          <div className="mb-4 rounded-2xl border-2 border-[#f59f00] bg-[#fff7e0] p-4 dark:bg-[#3a3000]">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-extrabold text-[#b58900]">
                {activeCase.emoji} {lang === 'en' ? activeCase.en : activeCase.zh}
                <span className="ml-2 font-bold text-[#b58900]/70">
                  {caseStep + 1}/{activeCase.steps.length}
                </span>
              </p>
              <button
                onClick={() => selectStrategy(activeCase.strategyId)}
                aria-label={t('退出案例', 'Exit case')}
                className="text-lg leading-none text-[#b58900]/70 hover:text-[#b58900]"
              >
                ✕
              </button>
            </div>
            <p className="text-sm leading-relaxed text-[#7a5c00] dark:text-[#ffe58a]">
              {lang === 'en' ? activeCase.steps[caseStep].en : activeCase.steps[caseStep].zh}
            </p>
            {caseStep === activeCase.steps.length - 1 && (
              <p className="mt-3 rounded-xl bg-[#ffc800]/25 p-3 text-sm font-semibold leading-relaxed text-[#7a5c00] dark:text-[#ffe58a]">
                {lang === 'en' ? activeCase.lessonEn : activeCase.lessonZh}
              </p>
            )}
            <div className="mt-3 flex items-center justify-between">
              <button
                onClick={() => gotoStep(caseStep - 1)}
                disabled={caseStep === 0}
                className="rounded-xl border-2 border-[#f59f00] px-4 py-1.5 text-xs font-extrabold text-[#b58900] transition disabled:opacity-40"
              >
                ← {t('上一幕', 'Back')}
              </button>
              <div className="flex gap-1.5">
                {activeCase.steps.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 w-2 rounded-full ${i === caseStep ? 'bg-[#f59f00]' : 'bg-[#f59f00]/30'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => gotoStep(caseStep + 1)}
                disabled={caseStep === activeCase.steps.length - 1}
                className="rounded-xl border-b-4 border-[#c47f00] bg-[#f59f00] px-4 py-1.5 text-xs font-extrabold text-white transition active:translate-y-0.5 active:border-b-2 disabled:opacity-40"
              >
                {t('下一幕', 'Next')} →
              </button>
            </div>
          </div>
        )}

        {/* 策略选择 */}
        <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
          {STRATEGIES.map((s) => (
            <button
              key={s.id}
              onClick={() => selectStrategy(s.id)}
              className={`shrink-0 rounded-full border-2 px-4 py-1.5 text-xs font-extrabold transition ${
                s.id === strategyId
                  ? 'border-[#1cb0f6] bg-[#ddf4ff] text-[#1899d6]'
                  : 'border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]'
              }`}
            >
              {lang === 'en' ? s.en : s.zh}
            </button>
          ))}
        </div>
        <p className="mb-4 text-sm font-semibold">{lang === 'en' ? strategy.enDesc : strategy.zhDesc}</p>

        {/* 图表 */}
        <figure className="mb-4 rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-4">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={t('损益图', 'P/L chart')}>
            {chart.pos.map((p, i) => (
              <polygon key={`p${i}`} points={p} fill={POS_FILL} />
            ))}
            {chart.neg.map((p, i) => (
              <polygon key={`n${i}`} points={p} fill={NEG_FILL} />
            ))}
            <line
              x1={PAD.l} y1={chart.zeroY} x2={W - PAD.r} y2={chart.zeroY}
              stroke="var(--muted-foreground)" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.7"
            />
            {/* 当前股价参考线 */}
            <line
              x1={chart.sx(spot)} y1={PAD.t} x2={chart.sx(spot)} y2={H - PAD.b}
              stroke="var(--muted-foreground)" strokeWidth="1" strokeDasharray="3 4" opacity="0.55"
            />
            <text
              x={chart.sx(spot)} y={H - PAD.b + 14} textAnchor="middle"
              fontSize="10" fontWeight="700" fill="var(--muted-foreground)"
            >
              ${spot}
            </text>
            <path d={chart.expiryPath} fill="none" stroke={ORANGE} strokeWidth="3" strokeDasharray="7 6" strokeLinecap="round" />
            <path d={chart.nowPath} fill="none" stroke={BLUE} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* 当前位置圆点 */}
            <circle cx={chart.sx(spot)} cy={chart.sy(nowPl)} r="6" fill={BLUE} stroke="var(--card)" strokeWidth="2" />
            {/* 图例 */}
            <g transform={`translate(${PAD.l + 4}, ${PAD.t - 12})`}>
              <line x1="0" y1="0" x2="18" y2="0" stroke={BLUE} strokeWidth="3.5" />
              <text x="23" y="3.5" fontSize="10.5" fontWeight="700" fill="var(--foreground)">
                {t('当前（T+0）', 'Now (T+0)')}
              </text>
              <line x1="110" y1="0" x2="128" y2="0" stroke={ORANGE} strokeWidth="3" strokeDasharray="6 5" />
              <text x="133" y="3.5" fontSize="10.5" fontWeight="700" fill="var(--foreground)">
                {t('到期', 'At expiry')}
              </text>
            </g>
            <text x={W - PAD.r} y={H - 4} textAnchor="end" fontSize="10" fontWeight="700" fill="var(--muted-foreground)">
              {t('股价 →', 'Stock price →')}
            </text>
            <text x={PAD.l} y={H - 4} fontSize="10" fontWeight="700" fill="var(--muted-foreground)">
              ↑ {t('每股盈亏', 'P/L per share')}
            </text>
          </svg>
        </figure>

        {/* 当前盈亏 + 关键数字 */}
        <div className="mb-4 grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
          <StatTile
            label={t('当前盈亏', 'Current P/L')}
            value={`${nowPl >= 0 ? '+' : ''}$${fmt(nowPl)}`}
            tone={nowPl >= 0 ? 'pos' : 'neg'}
          />
          <StatTile
            label={entryCost >= 0 ? t('开仓成本', 'Net debit') : t('开仓收入', 'Net credit')}
            value={`$${fmt(Math.abs(entryCost))}`}
          />
          <StatTile
            label={t('到期最大盈利', 'Max profit')}
            value={expiryStats.maxProfit === Infinity ? '∞' : `$${fmt(expiryStats.maxProfit)}`}
            tone="pos"
          />
          <StatTile
            label={t('到期最大亏损', 'Max loss')}
            value={expiryStats.maxLoss === -Infinity ? '∞' : `$${fmt(Math.abs(expiryStats.maxLoss))}`}
            tone="neg"
          />
        </div>
        <p className="mb-5 text-center text-xs text-[var(--muted-foreground)]">
          {t('盈亏平衡点', 'Breakeven')}:{' '}
          {expiryStats.breakevens.length
            ? expiryStats.breakevens.map((b) => `$${b.toFixed(1)}`).join(' / ')
            : t('无（单向结构）', 'none')}
          {' · '}
          {t('数值为每股，1 张合约 ×100', 'Per share; ×100 per contract')}
        </p>

        {/* 滑杆 */}
        <div className="mb-5 space-y-4 rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-4">
          <Slider
            label={t('当前股价', 'Spot price')}
            value={spot} min={S_MIN} max={S_MAX} display={`$${spot}`}
            onChange={setSpot} accent={BLUE}
          />
          <Slider
            label={t('隐含波动率', 'Implied vol')}
            value={iv} min={10} max={100} display={`${iv}%`}
            onChange={setIv} accent="#ce82ff"
          />
          <Slider
            label={t('剩余天数', 'Days left')}
            value={days} min={0} max={entry.days} display={t(`${days} 天`, `${days}d`)}
            onChange={setDays} accent={ORANGE}
          />
          {/* 情景快捷键 */}
          <div className="flex flex-wrap gap-2 pt-1">
            <ScenarioChip label={t('⏩ 过 7 天', '⏩ +7 days')} onClick={() => setDays((d) => Math.max(0, d - 7))} />
            <ScenarioChip label={t('📉 IV −10', '📉 IV −10')} onClick={() => setIv((v) => Math.max(10, v - 10))} />
            <ScenarioChip label={t('📈 IV +10', '📈 IV +10')} onClick={() => setIv((v) => Math.min(100, v + 10))} />
            <ScenarioChip
              label={t('🔄 重置', '🔄 Reset')}
              onClick={() => applyMarket(entry)}
            />
          </div>
        </div>

        {/* 希腊字母 */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {greekTiles.map((g) => (
            <div key={g.label} className="rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-3 text-center">
              <p className="text-xs font-extrabold uppercase tracking-wide text-[var(--muted-foreground)]">{g.label}</p>
              <p
                className={`my-1 text-xl font-extrabold ${
                  Math.abs(g.value) < 0.0005 ? '' : g.value > 0 ? 'text-[#58a700]' : 'text-[#ea2b2b]'
                }`}
              >
                {g.value > 0 ? '+' : ''}
                {g.value.toFixed(3)}
              </p>
              <p className="text-[10px] text-[var(--muted-foreground)]">{g.hint}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-[var(--muted-foreground)]">
          {t(
            '理论模型（Black-Scholes，r=4%）仅用于教学演示，真实市场存在价差、偏度与提前指派等因素。',
            'Black-Scholes (r=4%) for teaching only; real markets add spreads, skew and early assignment.',
          )}
        </p>
      </div>
    </div>
  );
}

function StatTile({ label, value, tone }: { label: string; value: string; tone?: 'pos' | 'neg' }) {
  return (
    <div className="rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-3">
      <p className="text-[10px] font-extrabold uppercase tracking-wide text-[var(--muted-foreground)]">{label}</p>
      <p
        className={`mt-1 text-lg font-extrabold ${
          tone === 'pos' ? 'text-[#58a700]' : tone === 'neg' ? 'text-[#ea2b2b]' : ''
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  display,
  accent,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  display: string;
  accent: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm font-bold">
        <span>{label}</span>
        <span style={{ color: accent }}>{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[var(--muted)]"
        style={{ accentColor: accent }}
      />
    </div>
  );
}

function ScenarioChip({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border-2 border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs font-extrabold text-[var(--muted-foreground)] transition hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
    >
      {label}
    </button>
  );
}
