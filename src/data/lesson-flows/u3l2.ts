import type { LessonStep } from '../optionsCourse';
import { U3_IV } from './u3l1';

/**
 * 第 3 单元第 2 课「内在价值与时间价值」。
 * 一个谜题开场：平值 Call 现在行权一分不赚，为什么值 $3？→ 先猜 → 命名分解式 → 实值时拆分 →
 * 落点猜「时间价值在哪最大」→ Put 的拆分 → 到期时只剩内在价值。
 * 数字均由 Black-Scholes（IV 25%、无风险利率 4%）算出，与互动图一致。
 */

const FORMULA = '期权价格 = 内在价值 + 时间价值';
const FORMULA_EN = 'option price = intrinsic value + time value';

export const u3l2StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个谜题',
    title: '一分钱都赚不到，凭什么卖 $3？',
    body: 'XYZ 现价 $100，30 天后到期的 $100 Call 卖 $3。\n\n可它是平值：现在行权，按 $100 买 $100 的股票，一分钱都赚不到。',
  },
  {
    type: 'choice',
    question: '那这 $3 买到的是什么？',
    options: ['券商的手续费', '未来 30 天里，股价涨过 $100 的可能性', '做市商的利润', '公司的分红'],
    correct: 1,
    explain: '你买的是「接下来 30 天，股价有可能涨上去」的机会。现在没用，不代表以后没用。',
  },
  {
    type: 'concept',
    kicker: '起个名字',
    title: '期权价格 = 内在价值 + 时间价值',
    body: '任何一张期权的价格，都能拆成两块：',
    display: FORMULA,
    bullets: [
      '内在价值：现在行权能拿到的钱。Call = 股价 − 行权价（最低为 0）',
      '时间价值：价格减去内在价值，买的是「以后还可能更值钱」',
      '平值和虚值期权：内在价值为 0，价格全是时间价值',
      '到期那一刻：时间价值归零，只剩内在价值',
    ],
  },
  {
    type: 'choice',
    question: '股价涨到 $108，这张 $100 Call 报价 $8.82。内在价值和时间价值各是多少？',
    options: ['$8.82 和 $0', '$8 和 $0.82', '$0.82 和 $8', '$0 和 $8.82'],
    correct: 1,
    explain: '内在价值 = $108 − $100 = $8，时间价值 = $8.82 − $8 = $0.82。注意：平值时时间价值有 $3，变成实值后只剩 $0.82 了。',
  },
  {
    type: 'value',
    mode: 'target',
    prompt: '同样还剩 30 天。股价在哪里时，这张 Call 的时间价值最大？把股价拖到你认为的位置。',
    option: 'call',
    strike: 100,
    iv: U3_IV,
    spot: { range: [80, 120], start: 84 },
    days: { range: [30, 30], start: 30, fixed: true },
    xAxis: 'spot',
    target: { control: 'spot', answer: 100, tolerance: 2 },
    explain: '在平值附近（股价 ≈ 行权价 $100）时间价值最大。深度虚值时，涨过行权价的希望很小，「可能性」不值钱；深度实值时，价格几乎全是内在价值，额外的可能性也不多。最不确定的地方，时间价值最贵。',
  },
  {
    type: 'value',
    mode: 'explore',
    prompt: '自由拖动股价，看紫色的时间价值怎么变。',
    option: 'call',
    strike: 100,
    iv: U3_IV,
    spot: { range: [80, 120], start: 100 },
    days: { range: [30, 30], start: 30, fixed: true },
    xAxis: 'spot',
    visit: { spot: [88, 112] },
    explain: '两头细、中间粗：越往实值走，价格越贴近虚线（内在价值）；越往虚值走，价格越贴近 0。时间价值在行权价处最厚。',
  },
  {
    type: 'tf',
    statement: '深度实值期权的价格，几乎全部是时间价值。',
    answer: false,
    explain: '错误。深度实值期权的价格以内在价值为主，时间价值很小。时间价值在平值处最大。',
  },
  {
    type: 'choice',
    question: '换成 Put：股价 $95，行权价 $100 的 Put 报价 $5.72。它的时间价值是多少？',
    options: ['$5.72', '$5', '$0.72', '$0'],
    correct: 2,
    explain: 'Put 的内在价值 = $100 − $95 = $5，时间价值 = $5.72 − $5 = $0.72。拆法和 Call 一样，只是内在价值反过来算。',
  },
  {
    type: 'tf',
    statement: '到期那一刻，期权的时间价值归零，只剩内在价值。',
    answer: true,
    explain: '正确。没有「以后」，就没有时间价值。到期价值 = 内在价值（可能是 0）——也就是前两单元那些到期损益图。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '你买的不只是现在，还有可能性',
    body: '四句话带走：',
    display: FORMULA,
    bullets: [
      '内在价值 = 现在行权能拿到的钱，最低为 0',
      '时间价值 = 价格 − 内在价值',
      '时间价值在平值处最大，越深度实值或虚值越小',
      '到期时时间价值归零，期权只剩内在价值',
    ],
    footer: '下一课：时间价值会自己消失吗？以什么速度消失？',
  },
];

export const u3l2StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A puzzle',
    title: 'It earns nothing right now. Why does it cost $3?',
    body: 'XYZ is at $100, and the $100 call expiring in 30 days costs $3.\n\nBut it’s at the money: exercising now means paying $100 for a $100 stock — not a cent of profit.',
  },
  {
    type: 'choice',
    question: 'So what is that $3 buying?',
    options: ['The broker’s commission', 'The chance the stock rises above $100 in the next 30 days', 'The market maker’s profit', 'The company’s dividend'],
    correct: 1,
    explain: 'You’re buying the chance that the stock climbs over the next 30 days. Useless now doesn’t mean useless later.',
  },
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Option price = intrinsic value + time value',
    body: 'Every option’s price splits into two parts:',
    display: FORMULA_EN,
    bullets: [
      'Intrinsic value: what exercising now would pay. Call = stock − strike (never below 0)',
      'Time value: price minus intrinsic value — paying for “it might be worth more later”',
      'ATM and OTM options: zero intrinsic value, so the whole price is time value',
      'At expiry: time value hits zero, leaving only intrinsic value',
    ],
  },
  {
    type: 'choice',
    question: 'The stock rises to $108 and this $100 call is quoted at $8.82. What are its intrinsic and time values?',
    options: ['$8.82 and $0', '$8 and $0.82', '$0.82 and $8', '$0 and $8.82'],
    correct: 1,
    explain: 'Intrinsic = $108 − $100 = $8; time value = $8.82 − $8 = $0.82. Notice: at the money it had $3 of time value; in the money, only $0.82 is left.',
  },
  {
    type: 'value',
    mode: 'target',
    prompt: 'Still 30 days to go. At what stock price is this call’s time value largest? Drag to your answer.',
    option: 'call',
    strike: 100,
    iv: U3_IV,
    spot: { range: [80, 120], start: 84 },
    days: { range: [30, 30], start: 30, fixed: true },
    xAxis: 'spot',
    target: { control: 'spot', answer: 100, tolerance: 2 },
    explain: 'Time value peaks near the money (stock ≈ the $100 strike). Deep OTM, there’s little hope of passing the strike, so the “chance” is cheap; deep ITM, the price is almost all intrinsic value, with little extra possibility. Time value is most expensive where the outcome is most uncertain.',
  },
  {
    type: 'value',
    mode: 'explore',
    prompt: 'Drag the stock freely and watch the purple time value change.',
    option: 'call',
    strike: 100,
    iv: U3_IV,
    spot: { range: [80, 120], start: 100 },
    days: { range: [30, 30], start: 30, fixed: true },
    xAxis: 'spot',
    visit: { spot: [88, 112] },
    explain: 'Thin at both ends, thick in the middle: deeper ITM, the price hugs the dashed line (intrinsic value); deeper OTM, it hugs zero. Time value is thickest at the strike.',
  },
  {
    type: 'tf',
    statement: 'A deep in-the-money option’s price is almost entirely time value.',
    answer: false,
    explain: 'False. A deep ITM option’s price is mostly intrinsic value, with little time value. Time value is largest at the money.',
  },
  {
    type: 'choice',
    question: 'Now a put: the stock is at $95 and the $100-strike put is quoted at $5.72. What’s its time value?',
    options: ['$5.72', '$5', '$0.72', '$0'],
    correct: 2,
    explain: 'Put intrinsic value = $100 − $95 = $5; time value = $5.72 − $5 = $0.72. Same split as a call — intrinsic value is just computed the other way.',
  },
  {
    type: 'tf',
    statement: 'At the moment of expiry, an option’s time value goes to zero, leaving only intrinsic value.',
    answer: true,
    explain: 'True. No “later” means no time value. Value at expiry = intrinsic value (possibly zero) — exactly the expiry payoff charts from the last two units.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'You’re buying the present, plus a possibility',
    body: 'Four lines to take with you:',
    display: FORMULA_EN,
    bullets: [
      'Intrinsic value = what exercising now pays, never below 0',
      'Time value = price − intrinsic value',
      'Time value peaks at the money and shrinks deep ITM or OTM',
      'At expiry, time value is gone and only intrinsic value remains',
    ],
    footer: 'Next lesson: does time value disappear on its own? How fast?',
  },
];
