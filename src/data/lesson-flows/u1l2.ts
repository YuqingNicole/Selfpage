import type { LessonStep } from '../optionsCourse';

/**
 * 第 1 单元第 2 课「合约四要素」。
 * 延续第 1 课的例子：那张「一个月内按 $100 买入 100 股、花了 $300」的凭证，
 * 这一课把它还原成券商 App 里的一行报价，逐段拆解，再迁移到一张陌生的 Put 报价。
 */

const QUOTE = 'XYZ  2026-12-18  100  C   $3.00';
const QUOTE_PUT = 'AAPL  2027-01-15  200  P   $4.50';

export const u1l2StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '上一课的凭证',
    title: '它在交易软件里只有一行字',
    body: '上一课你花 $300 买的那张凭证——「一个月内，可以按 $100 买入 100 股」——在券商 App 里长这样：',
    display: QUOTE,
  },
  {
    type: 'choice',
    display: QUOTE,
    question: '先猜：这一行里的「C」代表什么？',
    options: ['Call，看涨期权', 'Cash，现金结算', 'Close，收盘价', 'Contract，合约'],
    correct: 0,
    explain: 'C = Call，P = Put。看这一位就知道买的是「买入的权利」还是「卖出的权利」。',
  },
  {
    type: 'choice',
    display: QUOTE,
    question: '那「100」是什么？',
    options: ['买了 100 张', '行权价：约定的买入价', '现在的股价', '权利金'],
    correct: 1,
    explain: '100 是行权价。上一课「按 $100 买入」的那个 $100，就写在这里。',
  },
  {
    type: 'choice',
    display: QUOTE,
    question: '「2026-12-18」呢？',
    options: ['下单日期', '到期日：过了这天，权利作废', '分红日', '公司财报日'],
    correct: 1,
    explain: '这是到期日，也就是上一课「一个月内」的那个截止日。过了这一天，这张凭证就是一张废纸。',
  },
  {
    type: 'concept',
    kicker: '起个名字',
    title: '一行报价 = 一张合约的四要素',
    body: '每张期权合约都由这四样东西定义，缺一样就说不清你买的是什么：',
    display: QUOTE,
    bullets: [
      '标的（XYZ）：合约对应哪只股票',
      '到期日（2026-12-18）：权利的有效期',
      '行权价（100）：约定的买卖价格',
      '权利金（$3.00）：这份权利现在的市场价，每天都在变',
    ],
  },
  {
    type: 'choice',
    display: QUOTE,
    question: '报价写的是 $3.00，可你上一课付了 $300。差的这 100 倍是哪来的？',
    options: ['券商手续费', '1 张合约对应 100 股，报价是每股的价格', '做市商加价', '美元汇率'],
    correct: 1,
    explain: '美股股票期权 1 张 = 100 股。报价按每股算，实际要付的钱 = 报价 × 100 = $300。',
  },
  {
    type: 'choice',
    question: '另一张合约报价 $1.85。买 2 张，一共要付多少权利金？',
    options: ['$1.85', '$3.70', '$185', '$370'],
    correct: 3,
    explain: '$1.85 × 100 股 × 2 张 = $370。最常见的错误就是忘了乘 100。',
  },
  {
    type: 'concept',
    kicker: '到期那天',
    title: '到期日是一条硬截止线',
    body: '2026-12-18 收盘时：\n\n· 股价在 $100 以下：没人会按 $100 买，这张 Call 作废，$300 归零。\n· 股价在 $103 以上：行权才真正赚钱。\n\n同一张合约，到期前还有可能翻盘；到期后，结果就定了。',
  },
  {
    type: 'tf',
    statement: '到期时股价 $96，行权价 $100 的 Call 作废，买方损失全部权利金。',
    answer: true,
    explain: '正确。按 $100 买市价 $96 的股票不划算，买方会放弃，权利金 $300 全部损失。',
  },
  {
    type: 'choice',
    display: QUOTE_PUT,
    question: '换一行没见过的报价。这张合约给了买方什么权利？',
    options: [
      '2027-01-15 前按 $200 买入 100 股 AAPL',
      '2027-01-15 前按 $200 卖出 100 股 AAPL',
      '按 $4.50 卖出 AAPL',
      '2027-01-15 按市价卖出 200 股 AAPL',
    ],
    correct: 1,
    explain: 'P = Put，卖出的权利；200 是行权价；一张对应 100 股。买下这份权利要付 $4.50 × 100 = $450。',
  },
  {
    type: 'match',
    prompt: '把术语和它在报价里的位置配对',
    pairs: [
      ['标的', 'XYZ'],
      ['到期日', '2026-12-18'],
      ['行权价', '100'],
      ['权利金', '$3.00'],
    ],
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '读懂一行报价，就读懂了一张合约',
    body: '四句话带走：',
    bullets: [
      '四要素：标的、到期日、行权价、权利金',
      'C 是 Call，P 是 Put',
      '报价是每股价格，1 张 = 100 股，实际成本 = 报价 × 100',
      '到期日之后合约作废，没行权的权利金归零',
    ],
    footer: '下一课：同样看涨，为什么不直接买股票？期权、股票、期货差在哪？',
  },
];

export const u1l2StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'Last lesson’s voucher',
    title: 'In a trading app, it’s a single line',
    body: 'The voucher you bought for $300 last lesson — “you may buy 100 shares at $100 within a month” — looks like this in a broker app:',
    display: QUOTE,
  },
  {
    type: 'choice',
    display: QUOTE,
    question: 'Guess first: what does the “C” in this line stand for?',
    options: ['Call — a call option', 'Cash settlement', 'Closing price', 'Contract'],
    correct: 0,
    explain: 'C = call, P = put. That one letter tells you whether you hold a right to buy or a right to sell.',
  },
  {
    type: 'choice',
    display: QUOTE,
    question: 'What about the “100”?',
    options: ['You bought 100 contracts', 'The strike: the agreed buying price', 'The current stock price', 'The premium'],
    correct: 1,
    explain: '100 is the strike. The “$100” in last lesson’s “buy at $100” lives right here.',
  },
  {
    type: 'choice',
    display: QUOTE,
    question: 'And “2026-12-18”?',
    options: ['The order date', 'The expiration: after this day the right is void', 'The dividend date', 'The earnings date'],
    correct: 1,
    explain: 'That’s the expiration — the deadline behind last lesson’s “within a month”. After that day the voucher is worthless paper.',
  },
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'One quote line = the four terms of a contract',
    body: 'Every option contract is defined by these four things. Leave one out and you can’t say what you bought:',
    display: QUOTE,
    bullets: [
      'Underlying (XYZ): which stock the contract is on',
      'Expiration (2026-12-18): how long the right lasts',
      'Strike (100): the agreed buy/sell price',
      'Premium ($3.00): the right’s current market price — it changes every day',
    ],
  },
  {
    type: 'choice',
    display: QUOTE,
    question: 'The quote says $3.00, but last lesson you paid $300. Where does the 100× come from?',
    options: ['Broker commission', 'One contract covers 100 shares; the quote is per share', 'Market-maker markup', 'Exchange rate'],
    correct: 1,
    explain: 'One US equity option contract = 100 shares. Quotes are per share, so you pay quote × 100 = $300.',
  },
  {
    type: 'choice',
    question: 'Another contract is quoted at $1.85. How much premium do you pay for 2 contracts?',
    options: ['$1.85', '$3.70', '$185', '$370'],
    correct: 3,
    explain: '$1.85 × 100 shares × 2 contracts = $370. Forgetting the ×100 is the classic mistake.',
  },
  {
    type: 'concept',
    kicker: 'Expiration day',
    title: 'Expiration is a hard deadline',
    body: 'At the close on 2026-12-18:\n\n· Stock below $100: nobody buys at $100, so the call expires and the $300 goes to zero.\n· Stock above $103: exercising actually makes money.\n\nBefore expiration the contract can still turn around; after it, the result is final.',
  },
  {
    type: 'tf',
    statement: 'At expiration the stock is at $96, so the $100-strike call expires and the buyer loses the whole premium.',
    answer: true,
    explain: 'True. Paying $100 for a $96 stock makes no sense, so the buyer walks away and the $300 premium is lost.',
  },
  {
    type: 'choice',
    display: QUOTE_PUT,
    question: 'Here’s a quote you haven’t seen. What right does this contract give the buyer?',
    options: [
      'Buy 100 AAPL shares at $200 until 2027-01-15',
      'Sell 100 AAPL shares at $200 until 2027-01-15',
      'Sell AAPL at $4.50',
      'Sell 200 AAPL shares at market on 2027-01-15',
    ],
    correct: 1,
    explain: 'P = put, a right to sell; 200 is the strike; one contract covers 100 shares. The right costs $4.50 × 100 = $450.',
  },
  {
    type: 'match',
    prompt: 'Match each term to its place in the quote',
    pairs: [
      ['Underlying', 'XYZ'],
      ['Expiration', '2026-12-18'],
      ['Strike', '100'],
      ['Premium', '$3.00'],
    ],
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Read one quote line, and you’ve read the contract',
    body: 'Four lines to take with you:',
    bullets: [
      'The four terms: underlying, expiration, strike, premium',
      'C is a call, P is a put',
      'Quotes are per share; 1 contract = 100 shares, so cost = quote × 100',
      'After expiration the contract is void; an unexercised premium goes to zero',
    ],
    footer: 'Next lesson: if you’re bullish, why not just buy the stock? How do options, stocks and futures differ?',
  },
];
