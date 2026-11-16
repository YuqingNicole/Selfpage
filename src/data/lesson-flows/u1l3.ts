import type { LessonStep } from '../optionsCourse';

/**
 * 第 1 单元第 3 课「期权 vs 股票 vs 期货」。
 * 同一个看涨观点（XYZ 现价 $100），三种下注方式并排比较：
 * 股票的直线 → Call 的折线（亏损有底）→ 杠杆的两面 → 时间衰减 → 期货的双向义务。
 */

const STOCK = [{ type: 'stock' as const, strike: 0, qty: 1 }];

export const u1l3StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '同一个观点，三种下注',
    title: '你看涨 XYZ，可以怎么买？',
    body: 'XYZ 现价 $100，你觉得它会涨。摆在你面前有三种方式：\n\n· 直接买 100 股：付 $10,000\n· 买一张 Call（行权价 $100）：付 $300\n· 买一张期货：先交保证金，到期必须按 $100 买入 100 股\n\n这一课，把三种方式放在一起比。',
  },
  {
    type: 'slider',
    mode: 'explore',
    prompt: '先看最熟悉的：直接买 100 股。拖动股价，看盈亏怎么变。',
    legs: STOCK,
    premium: 100,
    refLine: { x: 100, label: '买入价 $100' },
    range: [60, 140],
    start: 100,
    visit: [80, 120],
    explain: '一条直线：涨 $1 赚 $100，跌 $1 亏 $100，两边对称。跌到 $70，就亏 $3,000。',
  },
  {
    type: 'choice',
    question: '股价跌到 $70。直接买股的人亏了 $3,000，买 Call 的人亏多少？',
    options: ['$3,000', '$700', '$300', '$0'],
    correct: 2,
    explain: 'Call 买方最多亏权利金 $300——第 1 课里那条「亏损有底」的平线。',
  },
  {
    type: 'concept',
    kicker: '杠杆',
    title: '用 $300，吃到 $10,000 的涨幅',
    body: '股价从 $100 涨到 $110：\n\n· 买股票：赚 $1,000，投入 $10,000，回报 10%\n· 买 Call：赚 $700（$1,000 − $300），投入 $300，回报约 233%\n\n同样的涨幅，期权把回报率放大了二十多倍。这就是杠杆。',
  },
  {
    type: 'choice',
    question: '换个结局：到期时股价停在 $102。两种买法的回报率各是多少？',
    options: ['股票 +2%，Call +233%', '股票 +2%，Call 约 −33%', '两者都是 +2%', '股票 −2%，Call 0%'],
    correct: 1,
    explain: '股票赚 $200 / $10,000 = +2%。Call 到期值 $200（$2 × 100），扣掉 $300 成本亏 $100，约 −33%。涨得不够多，杠杆就会反过来咬你。',
  },
  {
    type: 'concept',
    kicker: '时间',
    title: '股票可以等，期权会「融化」',
    body: '股票可以一直拿着，等多久都行。期权不行，它有到期日。\n\n就算股价一动不动，离到期越近，「按 $100 买入」这份权利就越不值钱；到期那天股价还在 $100，这张 Call 一分不值。这叫时间衰减（Time Decay）。',
  },
  {
    type: 'tf',
    statement: '只要股价不跌，买 Call 就不会亏钱。',
    answer: false,
    explain: '错误。股价原地不动，Call 也会因为时间衰减贬值；到期时还停在 $100，$300 全部亏掉。',
  },
  {
    type: 'concept',
    kicker: '第三种：期货',
    title: '期货：双方都必须履约',
    body: '期货也约定一个未来的买卖价格，但和期权有一个根本区别：\n\n期权买方「可以」放弃；期货双方都「必须」履约。到期时股价跌到 $70，期货多头也得按 $100 买入——没有「放弃」这个选项。',
  },
  {
    type: 'slider',
    mode: 'target',
    prompt: '你持有一张「到期按 $100 买入 100 股」的期货。到期股价是多少时，你恰好亏 $2,000？',
    legs: STOCK,
    premium: 100,
    refLine: { x: 100, label: '约定价 $100' },
    range: [60, 120],
    start: 100,
    answer: 80,
    tolerance: 0,
    explain: '每跌 $1 亏 $100，亏 $2,000 就是跌了 $20，也就是 $80。期货和股票一样是一条直线，没有「亏损有底」。',
  },
  {
    type: 'choice',
    question: '下面哪个角色，到期时可以选择不履约？',
    options: ['股票持有人', '期货多头', '期权买方', '期权卖方'],
    correct: 2,
    explain: '只有期权买方拥有「放弃」的权利。期货双方和期权卖方都必须履约。',
  },
  {
    type: 'tf',
    statement: '单纯买入期权，亏损可能超过付出的权利金。',
    answer: false,
    explain: '错误。买入期权最多亏掉权利金；亏损可能超过本金的是「卖出」期权，以及期货。',
  },
  {
    type: 'match',
    prompt: '把工具和它的特征配对',
    pairs: [
      ['股票', '直接持有资产，没有到期日'],
      ['期权买方', '有权利无义务，会随时间贬值'],
      ['期货', '双方都必须履约'],
      ['期权卖方', '收权利金，承担履约义务'],
    ],
  },
  {
    type: 'concept',
    kicker: '第 1 单元完成',
    title: '三种工具，三种形状',
    body: '把这个单元压缩成四句话：',
    bullets: [
      '股票：直接持有，没有到期日，盈亏是一条对称的直线',
      '期权买方：有权利没义务，亏损有底，但会随时间融化',
      '期货：双方都必须履约，盈亏和股票一样是直线',
      '杠杆是双刃剑：涨得多回报放大，涨得不够反而亏损',
    ],
    footer: '下一单元：买 Call、买 Put、卖 Call、卖 Put——四种基本仓位的损益各长什么样？',
  },
];

export const u1l3StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'One view, three bets',
    title: 'You’re bullish on XYZ. How could you buy?',
    body: 'XYZ trades at $100 and you think it’s going up. You have three ways to act:\n\n· Buy 100 shares: pay $10,000\n· Buy one $100-strike call: pay $300\n· Buy one futures contract: post margin now, and you must buy 100 shares at $100 at expiry\n\nThis lesson puts all three side by side.',
  },
  {
    type: 'slider',
    mode: 'explore',
    prompt: 'Start with the familiar one: buying 100 shares. Drag the price and watch your P/L.',
    legs: STOCK,
    premium: 100,
    refLine: { x: 100, label: 'buy price $100' },
    range: [60, 140],
    start: 100,
    visit: [80, 120],
    explain: 'A straight line: +$100 for every $1 up, −$100 for every $1 down, perfectly symmetric. At $70 you’re down $3,000.',
  },
  {
    type: 'choice',
    question: 'The stock falls to $70. The shareholder is down $3,000. How much has the call buyer lost?',
    options: ['$3,000', '$700', '$300', '$0'],
    correct: 2,
    explain: 'A call buyer can lose at most the $300 premium — the flat “capped loss” line from Lesson 1.',
  },
  {
    type: 'concept',
    kicker: 'Leverage',
    title: '$300 that captures a $10,000 move',
    body: 'The stock rises from $100 to $110:\n\n· Stock: +$1,000 on $10,000 invested, a 10% return\n· Call: +$700 ($1,000 − $300) on $300 invested, about a 233% return\n\nSame move, but the option multiplies the return more than twentyfold. That’s leverage.',
  },
  {
    type: 'choice',
    question: 'Different ending: at expiry the stock sits at $102. What’s the return on each?',
    options: ['Stock +2%, call +233%', 'Stock +2%, call about −33%', 'Both +2%', 'Stock −2%, call 0%'],
    correct: 1,
    explain: 'Stock: $200 / $10,000 = +2%. The call is worth $200 at expiry ($2 × 100); minus the $300 cost that’s −$100, about −33%. If the move isn’t big enough, leverage bites back.',
  },
  {
    type: 'concept',
    kicker: 'Time',
    title: 'Stocks can wait. Options melt.',
    body: 'You can hold a stock as long as you like. An option has an expiration date.\n\nEven if the price doesn’t move, the right to “buy at $100” is worth less the closer expiry gets; if the stock is still at $100 on expiration day, the call is worth nothing. This is time decay.',
  },
  {
    type: 'tf',
    statement: 'As long as the stock doesn’t fall, buying a call can’t lose money.',
    answer: false,
    explain: 'False. If the price stands still, the call still loses value to time decay; at $100 on expiry, the whole $300 is gone.',
  },
  {
    type: 'concept',
    kicker: 'The third one: futures',
    title: 'Futures: both sides must perform',
    body: 'A future also fixes a price for a later trade, but with one fundamental difference:\n\nAn option buyer may walk away; both sides of a future must perform. If the stock falls to $70 at expiry, the futures buyer still has to buy at $100 — walking away isn’t an option.',
  },
  {
    type: 'slider',
    mode: 'target',
    prompt: 'You hold a future to buy 100 shares at $100 at expiry. At what expiry price are you down exactly $2,000?',
    legs: STOCK,
    premium: 100,
    refLine: { x: 100, label: 'contract price $100' },
    range: [60, 120],
    start: 100,
    answer: 80,
    tolerance: 0,
    explain: 'Each $1 down costs $100, so −$2,000 means a $20 drop, to $80. Like stock, a future is a straight line — no capped loss.',
  },
  {
    type: 'choice',
    question: 'Which of these can choose not to perform at expiry?',
    options: ['A shareholder', 'A futures buyer', 'An option buyer', 'An option seller'],
    correct: 2,
    explain: 'Only the option buyer has the right to walk away. Both sides of a future, and the option seller, must perform.',
  },
  {
    type: 'tf',
    statement: 'Simply buying an option can lose more than the premium you paid.',
    answer: false,
    explain: 'False. Buying an option can lose at most the premium; selling options — and futures — can lose more than you put in.',
  },
  {
    type: 'match',
    prompt: 'Match each instrument to its feature',
    pairs: [
      ['Stock', 'Own the asset, no expiration'],
      ['Option buyer', 'Right, no obligation; decays over time'],
      ['Future', 'Both sides must perform'],
      ['Option seller', 'Collects premium, must deliver'],
    ],
  },
  {
    type: 'concept',
    kicker: 'Unit 1 complete',
    title: 'Three instruments, three shapes',
    body: 'The whole unit in four lines:',
    bullets: [
      'Stock: you own it, no expiry, P/L is a symmetric straight line',
      'Option buyer: a right with no obligation, capped loss — but it melts over time',
      'Future: both sides must perform; P/L is a straight line like stock',
      'Leverage cuts both ways: a big move multiplies returns, a small one loses money',
    ],
    footer: 'Next unit: long call, long put, short call, short put — what does each of the four basic positions look like?',
  },
];
