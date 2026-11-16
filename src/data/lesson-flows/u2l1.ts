import type { LessonStep } from '../optionsCourse';
import { LONG_CALL } from './u2-shared';

/**
 * 第 2 单元第 1 课「买入看涨（Long Call）」。
 * 第 1 单元买的是平值 Call（$100 行权、$3）；这一课换成更便宜的虚值 Call（$105 行权、$2），
 * 让学习者自己发现「便宜的代价」：回本价更远、要涨得更多才划算。
 */

export const u2l1StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一张更便宜的 Call',
    title: '便宜，总有便宜的原因',
    body: 'XYZ 还是 $100。上一单元你买的 Call 行权价 $100，花了 $3。\n\n今天有一张更便宜的：行权价 $105，只要 $2（一张 $200）。这一课弄清楚：它从哪里开始赚钱、最多亏多少、最多赚多少。',
  },
  {
    type: 'slider',
    mode: 'target',
    prompt: '先猜：到期股价至少要到多少，这张 $105 的 Call 才刚好回本？',
    legs: LONG_CALL,
    premium: 2,
    range: [95, 115],
    start: 100,
    answer: 107,
    tolerance: 0,
    explain: '$105 + $2 = $107。上一单元那张的回本价是 $103；这张便宜了 $1，股价却要多涨 $4 才开始赚钱——这就是便宜的代价。',
  },
  {
    type: 'slider',
    mode: 'explore',
    prompt: '拖动到期股价，看这张 Call 的盈亏分成哪几段。',
    legs: LONG_CALL,
    premium: 2,
    range: [85, 135],
    start: 100,
    visit: [100, 120],
    explain: '三段：$105 以下亏 $200 封顶；$105–$107 之间行权也只能收回一部分权利金；$107 以上每涨 $1 多赚 $100，上不封顶。',
  },
  {
    type: 'choice',
    question: '到期时股价 $106，已经高于行权价。你这张 Call 的盈亏是？',
    options: ['+$100', '$0', '−$100', '−$200'],
    correct: 2,
    explain: '内在价值 $1 × 100 = $100，减去成本 $200，净亏 $100。高于行权价不等于赚钱，要高过回本价才算。',
  },
  {
    type: 'tf',
    statement: 'Long Call 的理论最大收益是无限的。',
    answer: true,
    explain: '正确。股价没有上限，Call 的内在价值跟着一起涨。最大亏损则锁死在权利金 $200。',
  },
  {
    type: 'choice',
    question: '到期股价 $110。两张 Call 比一比：哪张的回报率更高？',
    options: ['行权价 $100、付 $3 的那张', '行权价 $105、付 $2 的那张', '一样高'],
    correct: 0,
    explain: '$100 的那张赚 ($10 − $3) × 100 = $700，回报 233%；$105 的那张赚 ($5 − $2) × 100 = $300，回报 150%。便宜的虚值 Call 要涨得够多才划算——涨到 $120 时它的回报（650%）才反超。',
  },
  {
    type: 'choice',
    question: '你判断 XYZ 一个月后会温和上涨到 $104 左右。买这张 $105 的 Call 合适吗？',
    options: ['合适，它最便宜', '不合适：股价到 $104 时，这张 Call 到期一文不值', '合适，最大收益无限', '合适，涨了就一定赚'],
    correct: 1,
    explain: '方向对了也可能亏光：$104 还没到行权价 $105，到期作废，$200 全部损失。选合约要对上你预期的「幅度」，不只是方向。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: 'Long Call：花小钱，赌大涨',
    body: '四句话带走：',
    bullets: [
      '回本价 = 行权价 + 权利金',
      '最大亏损 = 权利金；最大收益没有上限',
      '高于行权价、低于回本价，仍然是亏的',
      '越虚值越便宜，但需要的涨幅越大——选合约要对上你预期的幅度',
    ],
    footer: '下一课：如果你觉得它要跌呢？',
  },
];

export const u2l1StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A cheaper call',
    title: 'Cheap is cheap for a reason',
    body: 'XYZ is still at $100. Last unit you bought the $100-strike call for $3.\n\nToday there’s a cheaper one: the $105 strike for just $2 ($200 a contract). This lesson works out where it starts making money, how much it can lose, and how much it can make.',
  },
  {
    type: 'slider',
    mode: 'target',
    prompt: 'Guess first: how high must the stock be at expiry for this $105 call to exactly break even?',
    legs: LONG_CALL,
    premium: 2,
    range: [95, 115],
    start: 100,
    answer: 107,
    tolerance: 0,
    explain: '$105 + $2 = $107. Last unit’s call broke even at $103; this one is $1 cheaper, but the stock has to rise $4 more before it makes money. That’s the price of cheap.',
  },
  {
    type: 'slider',
    mode: 'explore',
    prompt: 'Drag the price at expiry and find the segments of this call’s P/L.',
    legs: LONG_CALL,
    premium: 2,
    range: [85, 135],
    start: 100,
    visit: [100, 120],
    explain: 'Three segments: below $105 the loss is capped at $200; between $105 and $107, exercising only recovers part of the premium; above $107 every $1 adds $100, with no ceiling.',
  },
  {
    type: 'choice',
    question: 'At expiry the stock is at $106 — above the strike. What’s your P/L on this call?',
    options: ['+$100', '$0', '−$100', '−$200'],
    correct: 2,
    explain: 'Intrinsic value $1 × 100 = $100, minus the $200 cost: −$100. Above the strike isn’t profit — you need to clear break-even.',
  },
  {
    type: 'tf',
    statement: 'A long call’s maximum theoretical profit is unlimited.',
    answer: true,
    explain: 'True. The stock has no ceiling, and the call’s intrinsic value rises with it. The maximum loss stays locked at the $200 premium.',
  },
  {
    type: 'choice',
    question: 'At expiry the stock is at $110. Which call had the better return?',
    options: ['The $100 strike, bought for $3', 'The $105 strike, bought for $2', 'They’re the same'],
    correct: 0,
    explain: 'The $100 call makes ($10 − $3) × 100 = $700, a 233% return; the $105 call makes ($5 − $2) × 100 = $300, 150%. A cheap out-of-the-money call needs a bigger move to pay off — only at $120 does its return (650%) pull ahead.',
  },
  {
    type: 'choice',
    question: 'You expect XYZ to drift up to about $104 over the next month. Is this $105 call a good fit?',
    options: ['Yes — it’s the cheapest', 'No — at $104 this call expires worthless', 'Yes — unlimited upside', 'Yes — if it rises, you profit'],
    correct: 1,
    explain: 'You can be right on direction and still lose everything: $104 is below the $105 strike, so the call expires and the $200 is gone. Pick contracts that match the size of move you expect, not just the direction.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Long call: small cost, big-move bet',
    body: 'Four lines to take with you:',
    bullets: [
      'Break-even = strike + premium',
      'Max loss = the premium; max profit has no ceiling',
      'Above the strike but below break-even is still a loss',
      'Further out of the money is cheaper but needs a bigger move — match the contract to the move you expect',
    ],
    footer: 'Next lesson: what if you think it’s going down?',
  },
];
