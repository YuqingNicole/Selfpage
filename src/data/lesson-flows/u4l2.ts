import type { LessonStep } from '../optionsCourse';

/**
 * 第 4 单元第 2 课「隐含波动率」。
 * 只有波动率看不见 → 动手反推：调 IV 对上市场报价 $4.73（≈ 40%）→ IV 是什么 →
 * 财报前后：IV 60% 时 $7.01 买入，财报后股价涨到 $102、IV 回到 25%，只值 $4.14 →
 * 落点猜回本股价（约 $106）→ IV Rank → 一般原则。
 * 数字由 Black-Scholes（无风险利率 4%）算出。
 */

export const u4l2StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '看不见的那个数',
    title: '六个因素里，只有波动率查不到',
    body: '股价、行权价、剩余时间、利率、分红，都能直接查到。只有「未来 30 天会波动多大」，没有人知道。\n\n那期权价格是怎么定的？实际上是反过来的：市场先成交出一个价格，我们再倒推这个价格「隐含」了多大的波动。',
  },
  {
    type: 'value',
    mode: 'target',
    prompt: '市场上，XYZ 这张 30 天 $100 Call 报价 $4.73。把 IV 调到能解释这个价格的位置。',
    option: 'call',
    strike: 100,
    iv: 0.2,
    ivRange: [10, 60],
    showSplit: false,
    spot: { range: [80, 120], start: 100, fixed: true },
    days: { range: [30, 30], start: 30, fixed: true },
    xAxis: 'spot',
    target: { control: 'iv', answer: 40, tolerance: 2, live: true },
    explain: 'IV 约 40%。这个 40% 不是谁预测出来的，而是从 $4.73 这个价格里反推出来的——这就是「隐含」波动率（IV）。价格越贵，隐含的波动越大。',
  },
  {
    type: 'choice',
    question: '所以，隐含波动率（IV）反映的是什么？',
    options: ['过去一年股价的实际波动', '市场对未来波动的预期（从期权价格反推）', '公司的分红率', '交易所的手续费'],
    correct: 1,
    explain: '历史波动率看过去，IV 看未来。IV 高，说明市场愿意为「可能大涨大跌」付更多钱。',
  },
  {
    type: 'concept',
    kicker: '财报前后',
    title: '财报前 IV 涨，财报后 IV 塌',
    body: '财报公布前，没人知道结果，大家愿意为「可能暴涨暴跌」多付钱，XYZ 的 IV 从 25% 涨到 60%，同一张 $100 Call 涨到 $7.01。\n\n财报一公布，不确定性消失，IV 一夜回到 25%。这叫 IV Crush（IV 挤压）。',
  },
  {
    type: 'choice',
    question: '你在财报前以 $7.01 买入这张 Call。财报后股价涨到 $102，IV 回到 25%。它现在大约值多少？',
    options: ['约 $9', '约 $7', '约 $4.14', '$2'],
    correct: 2,
    explain: '大约 $4.14：股价涨了 2%，期权却亏了约 41%。方向猜对了，但 IV 从 60% 塌回 25%，吃掉的远比股价上涨带来的多。',
  },
  {
    type: 'value',
    mode: 'target',
    prompt: '财报后 IV 是 25%、还剩 29 天。股价至少要涨到多少，这张 $7.01 买来的 Call 才回本？拖到你认为的位置。',
    option: 'call',
    strike: 100,
    iv: 0.25,
    showSplit: false,
    spot: { range: [95, 115], start: 100 },
    days: { range: [29, 29], start: 29, fixed: true },
    xAxis: 'spot',
    target: { control: 'spot', answer: 106, tolerance: 1 },
    explain: '大约 $106：股价要涨 6%，才能填上 IV 塌陷造成的亏损。在 IV 最高的时候买期权，等于在最贵的时候买保险。',
  },
  {
    type: 'choice',
    question: '某只股票的 IV Rank 是 90%。这说明什么？',
    options: ['当前 IV 处在过去一年区间的高位', '股价过去一年涨了 90%', '期权成交量排名前 10%', '有 90% 的概率会被行权'],
    correct: 0,
    explain: 'IV Rank 把当前 IV 放进过去一年的高低区间里比较：90% 说明比一年里绝大多数时候都高，期权偏贵。比只看 IV 的绝对数字更有意义。',
  },
  {
    type: 'tf',
    statement: 'IV 低的时候倾向买期权、IV 高的时候倾向卖期权，是顺着波动率的一般原则。',
    answer: true,
    explain: '正确。和买东西一样：便宜时买、贵时卖。当然还要结合你对方向的判断。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: 'IV 是期权的价签',
    body: '四句话带走：',
    bullets: [
      'IV 是从期权价格反推出的「市场预期的未来波动」',
      'IV 越高，期权越贵',
      '事件前 IV 抬升，事件后 IV 塌陷（IV Crush）',
      '看 IV Rank 比看 IV 绝对值更有意义：低位倾向买，高位倾向卖',
    ],
    footer: '下一课：把五个数变成一个价格的那台机器，以及把 Call 和 Put 锁在一起的一条关系。',
  },
];

export const u4l2StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'The invisible number',
    title: 'Of the six factors, only volatility can’t be looked up',
    body: 'Stock price, strike, time left, rates and dividends can all be looked up. Only “how much will it swing over the next 30 days” is unknown.\n\nSo how is an option priced? It actually works backwards: the market trades at a price first, and we work out how much volatility that price “implies”.',
  },
  {
    type: 'value',
    mode: 'target',
    prompt: 'In the market, XYZ’s 30-day $100 call is quoted at $4.73. Set IV to the level that explains this price.',
    option: 'call',
    strike: 100,
    iv: 0.2,
    ivRange: [10, 60],
    showSplit: false,
    spot: { range: [80, 120], start: 100, fixed: true },
    days: { range: [30, 30], start: 30, fixed: true },
    xAxis: 'spot',
    target: { control: 'iv', answer: 40, tolerance: 2, live: true },
    explain: 'About 40%. Nobody forecast that 40% — it was backed out of the $4.73 price. That’s what “implied” volatility (IV) means. The pricier the option, the bigger the implied swing.',
  },
  {
    type: 'choice',
    question: 'So what does implied volatility (IV) reflect?',
    options: ['The stock’s actual swings over the past year', 'The market’s expectation of future swings, backed out of option prices', 'The dividend yield', 'Exchange fees'],
    correct: 1,
    explain: 'Historical volatility looks back; IV looks forward. High IV means the market will pay more for the chance of big moves.',
  },
  {
    type: 'concept',
    kicker: 'Around earnings',
    title: 'IV rises before earnings and collapses after',
    body: 'Before earnings, nobody knows the result, so people pay up for the chance of a big move. XYZ’s IV climbs from 25% to 60%, and the same $100 call rises to $7.01.\n\nOnce earnings are out, the uncertainty is gone and IV drops back to 25% overnight. This is IV crush.',
  },
  {
    type: 'choice',
    question: 'You bought this call for $7.01 before earnings. Afterwards the stock rises to $102 and IV falls back to 25%. Roughly what is it worth now?',
    options: ['About $9', 'About $7', 'About $4.14', '$2'],
    correct: 2,
    explain: 'About $4.14: the stock is up 2%, but the option is down about 41%. You were right on direction, but IV falling from 60% to 25% took away far more than the rise added.',
  },
  {
    type: 'value',
    mode: 'target',
    prompt: 'After earnings IV is 25% with 29 days left. How high must the stock go for the call you paid $7.01 for to break even? Drag to your answer.',
    option: 'call',
    strike: 100,
    iv: 0.25,
    showSplit: false,
    spot: { range: [95, 115], start: 100 },
    days: { range: [29, 29], start: 29, fixed: true },
    xAxis: 'spot',
    target: { control: 'spot', answer: 106, tolerance: 1 },
    explain: 'About $106: the stock has to rise 6% just to cover the loss from the IV collapse. Buying options when IV is highest is like buying insurance at its most expensive.',
  },
  {
    type: 'choice',
    question: 'A stock’s IV Rank is 90%. What does that tell you?',
    options: ['Current IV is near the top of its one-year range', 'The stock rose 90% over the year', 'Its option volume ranks in the top 10%', 'There’s a 90% chance of exercise'],
    correct: 0,
    explain: 'IV Rank places today’s IV within the past year’s high–low range: 90% means higher than almost any time in the year, so options are rich. More useful than the raw IV number.',
  },
  {
    type: 'tf',
    statement: 'Leaning toward buying options when IV is low and selling when IV is high is the general rule for trading with volatility.',
    answer: true,
    explain: 'True. Like shopping: buy when cheap, sell when expensive — combined, of course, with your view on direction.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'IV is an option’s price tag',
    body: 'Four lines to take with you:',
    bullets: [
      'IV is the market’s expected future volatility, backed out of option prices',
      'Higher IV means pricier options',
      'IV rises before events and collapses after them (IV crush)',
      'IV Rank beats raw IV: lean toward buying when low, selling when high',
    ],
    footer: 'Next lesson: the machine that turns five numbers into a price, and the relationship that locks calls and puts together.',
  },
];
