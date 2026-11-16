import type { LessonStep } from '../optionsCourse';
import { SHAPE_RANGE, SHAPES, SHORT_CALL, SHORT_PUT } from './u2-shared';

/**
 * 第 2 单元第 3 课「卖出期权（Short）」。
 * 坐到柜台后面，卖出前两课买的同两张合约：$105 Call（收 $200）与 $95 Put（收 $300）。
 * 先体验最好结局 → 翻转的损益图 → 一次暴涨的代价 → 卖 Put 的回本价与上限 → 卖方的账 → 认全四种形状。
 */

export const u2l3StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '换到柜台后面',
    title: '这次，你来当卖方',
    body: '前两课你一直在买期权。可每一张期权背后，都有一个收钱的人。\n\n这一课你坐到柜台后面：卖出一张行权价 $105 的 Call，立刻收下 $200。',
  },
  {
    type: 'choice',
    question: '你卖出 $105 Call，收了 $200。到期时股价停在 $100，结果如何？',
    options: ['+$200，全部收下', '−$200', '$0', '你得按 $105 买回股票'],
    correct: 0,
    explain: '买方不会按 $105 买市价 $100 的股票，期权作废。你什么都不用做，$200 全部归你——这是卖方最好的结局，也是收益上限。',
  },
  {
    type: 'slider',
    mode: 'explore',
    prompt: '拖动到期股价，看卖出这张 Call 的盈亏。',
    legs: SHORT_CALL,
    premium: -2,
    range: [85, 145],
    start: 100,
    visit: [100, 130],
    explain: '这是买方那张图的上下翻转：$105 以下稳赚 $200；涨过 $107 开始亏，每涨 $1 多亏 $100——而且没有上限。',
  },
  {
    type: 'choice',
    question: '突然传出收购消息，股价暴涨到 $150。你这张裸卖的 Call 亏多少？',
    options: ['$200', '$4,300', '$4,500', '$15,000'],
    correct: 1,
    explain: '你必须按 $105 卖出市价 $150 的股票：每股亏 $45 × 100 = $4,500，扣掉收到的 $200，净亏 $4,300。股价没有上限，裸卖 Call 的亏损也没有上限。',
  },
  {
    type: 'concept',
    kicker: '另一种卖法',
    title: '卖 Put：收钱，承诺接货',
    body: '再卖一张行权价 $95 的 Put，收 $300。你的承诺是：到期前买方要卖，你就得按 $95 接下 100 股。\n\n股价在 $95 以上，你白赚 $300；跌破 $95，你就得按 $95 买进一只更便宜的股票。',
  },
  {
    type: 'slider',
    mode: 'target',
    prompt: '这张卖出的 Put，回本价在哪？拖到你认为的位置。',
    legs: SHORT_PUT,
    premium: -3,
    range: [80, 105],
    start: 100,
    answer: 92,
    tolerance: 0,
    explain: '$95 − $3 = $92。跌破 $92，按 $95 接货的亏损就超过了收到的 $300。它和上一课买方的回本价是同一个点——一笔交易，两个人站在两边。',
  },
  {
    type: 'choice',
    question: '最坏情况：股价归零。卖出这张 Put 最多亏多少？',
    options: ['无限', '$9,200', '$9,500', '$300'],
    correct: 1,
    explain: '按 $95 接下一文不值的股票，亏 $9,500，扣掉收到的 $300 = $9,200。很大，但有上限——这是卖 Put 和裸卖 Call 的关键区别。',
  },
  {
    type: 'concept',
    kicker: '卖方的账',
    title: '胜率高，但盈亏比差',
    body: '大多数期权到期时都不值钱，所以卖方经常赚——可每次最多只赚权利金。\n\n卖 10 次 Call，每次收 $200，一共 $2,000；一次 $4,300 的暴涨亏损，就全部吐回去还不够。卖方赚的是「平静」，亏的是「意外」。',
  },
  {
    type: 'tf',
    statement: '卖出期权之后不能提前平仓，必须一直持有到期。',
    answer: false,
    explain: '错误。卖方随时可以买回同一张合约平仓（Buy to Close），锁定盈亏、解除义务。',
  },
  {
    type: 'shape',
    question: '最后认全四种形状：哪一张是「卖出 Put」？',
    options: [
      { ...SHAPES.shortCall, label: 'Short Call' },
      { ...SHAPES.longPut, label: 'Long Put' },
      { ...SHAPES.longCall, label: 'Long Call' },
      { ...SHAPES.shortPut, label: 'Short Put' },
    ],
    correct: 3,
    range: SHAPE_RANGE,
    explain: '卖 Put = 买 Put 上下翻转：右边是一条赚权利金的平线，左边股价跌得越深亏得越多。',
  },
  {
    type: 'match',
    prompt: '把四大基本仓位和它的观点配对',
    pairs: [
      ['Long Call', '强烈看涨'],
      ['Long Put', '强烈看跌'],
      ['Short Call', '看不涨（横盘或下跌）'],
      ['Short Put', '看不跌（横盘或上涨）'],
    ],
  },
  {
    type: 'concept',
    kicker: '第 2 单元完成',
    title: '四种仓位，两组镜像',
    body: '把这个单元压缩成四句话：',
    bullets: [
      'Long Call 与 Long Put 互为左右镜像：亏损封顶，赌一个大的方向',
      '卖方是买方的上下翻转：收益封顶在权利金，风险留在另一边',
      '裸卖 Call 亏损没有上限；卖 Put 最多亏到股价归零',
      '同一张合约，买卖双方的回本价是同一个点',
    ],
    footer: '下一单元：一张期权的价格，到底由什么构成？',
  },
];

export const u2l3StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'Behind the counter',
    title: 'This time, you’re the seller',
    body: 'For two lessons you’ve been buying options. But behind every option is someone collecting the money.\n\nThis lesson you step behind the counter: you sell one $105-strike call and collect $200 on the spot.',
  },
  {
    type: 'choice',
    question: 'You sold the $105 call for $200. At expiry the stock sits at $100. What happens?',
    options: ['+$200 — you keep it all', '−$200', '$0', 'You must buy the shares back at $105'],
    correct: 0,
    explain: 'The buyer won’t pay $105 for a $100 stock, so the option expires. You do nothing and keep the full $200 — the seller’s best outcome, and also the profit cap.',
  },
  {
    type: 'slider',
    mode: 'explore',
    prompt: 'Drag the price at expiry and watch the P/L of selling this call.',
    legs: SHORT_CALL,
    premium: -2,
    range: [85, 145],
    start: 100,
    visit: [100, 130],
    explain: 'It’s the buyer’s chart flipped upside down: below $105 you keep $200; above $107 you start losing, $100 more for every $1 — with no limit.',
  },
  {
    type: 'choice',
    question: 'Takeover news hits and the stock jumps to $150. How much does your naked short call lose?',
    options: ['$200', '$4,300', '$4,500', '$15,000'],
    correct: 1,
    explain: 'You must sell $150 stock for $105: −$45 × 100 = −$4,500, plus the $200 you collected, for a net −$4,300. The stock has no ceiling, and neither does a naked short call’s loss.',
  },
  {
    type: 'concept',
    kicker: 'Another way to sell',
    title: 'Selling a put: get paid, promise to buy',
    body: 'Now sell a $95-strike put and collect $300. Your promise: if the buyer wants to sell before expiry, you must buy 100 shares at $95.\n\nAbove $95 you simply keep the $300; below $95 you’re buying a stock for more than it’s worth.',
  },
  {
    type: 'slider',
    mode: 'target',
    prompt: 'Where does this short put break even? Drag to your answer.',
    legs: SHORT_PUT,
    premium: -3,
    range: [80, 105],
    start: 100,
    answer: 92,
    tolerance: 0,
    explain: '$95 − $3 = $92. Below $92, the loss from buying at $95 exceeds the $300 you collected. It’s the same point as the buyer’s break-even last lesson — one trade, two people on opposite sides.',
  },
  {
    type: 'choice',
    question: 'Worst case: the stock goes to zero. What’s the most this short put can lose?',
    options: ['Unlimited', '$9,200', '$9,500', '$300'],
    correct: 1,
    explain: 'Buying worthless stock at $95 costs $9,500; minus the $300 collected, that’s $9,200. Large, but capped — the key difference between a short put and a naked short call.',
  },
  {
    type: 'concept',
    kicker: 'The seller’s math',
    title: 'High win rate, poor payoff ratio',
    body: 'Most options expire worthless, so sellers win often — but each win is capped at the premium.\n\nSell the call 10 times at $200 and you’ve made $2,000; one $4,300 loss on a spike wipes it all out and then some. Sellers get paid for calm and pay for surprises.',
  },
  {
    type: 'tf',
    statement: 'Once you sell an option you can’t close early — you have to hold it until expiry.',
    answer: false,
    explain: 'False. A seller can buy back the same contract at any time (buy to close) to lock in the P/L and end the obligation.',
  },
  {
    type: 'shape',
    question: 'Finally, all four shapes: which chart is a short put?',
    options: [
      { ...SHAPES.shortCall, label: 'Short call' },
      { ...SHAPES.longPut, label: 'Long put' },
      { ...SHAPES.longCall, label: 'Long call' },
      { ...SHAPES.shortPut, label: 'Short put' },
    ],
    correct: 3,
    range: SHAPE_RANGE,
    explain: 'A short put is the long put flipped upside down: a flat line earning the premium on the right, and growing losses as the stock falls on the left.',
  },
  {
    type: 'match',
    prompt: 'Match each basic position to its view',
    pairs: [
      ['Long call', 'Strongly bullish'],
      ['Long put', 'Strongly bearish'],
      ['Short call', 'Not bullish (flat or down)'],
      ['Short put', 'Not bearish (flat or up)'],
    ],
  },
  {
    type: 'concept',
    kicker: 'Unit 2 complete',
    title: 'Four positions, two pairs of mirrors',
    body: 'The whole unit in four lines:',
    bullets: [
      'Long call and long put mirror each other left-to-right: capped loss, a bet on a big move',
      'A seller is the buyer flipped upside down: profit capped at the premium, risk on the other side',
      'A naked short call has unlimited loss; a short put can lose down to a stock price of zero',
      'For one contract, buyer and seller share the same break-even',
    ],
    footer: 'Next unit: what actually makes up the price of an option?',
  },
];
