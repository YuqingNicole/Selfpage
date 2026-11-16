import type { LessonStep } from '../optionsCourse';

/**
 * 第 4 单元第 3 课「定价模型与平价关系」。
 * Black-Scholes 是前面所有滑块背后的那台机器 → 实战里反过来用 →
 * $100 Call $3.02、Put $2.69，差的 $0.33 从哪来（行权价现值 $99.67）→
 * 拖 IV / 股价 / 时间验证 Call − Put 始终等于 股价 − 行权价现值 → 用平价算 Put →
 * 不平衡时有人搬砖 → 股票 + Put ≈ Call + 现金。
 * 数字由 Black-Scholes（无风险利率 4%）算出。
 */

export const u4l3StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '幕后的机器',
    title: 'Black-Scholes：把五个数变成一个价格',
    body: '这几个单元里你拖过的每一个滑块，背后都是同一个公式：Black-Scholes 模型。\n\n输入股价、行权价、剩余时间、利率、波动率，输出一个理论价格。五个输入里有四个能直接查到，只有波动率要靠猜。',
  },
  {
    type: 'choice',
    question: '既然只有波动率查不到，交易员在实战中最常拿 Black-Scholes 做什么？',
    options: ['预测明天的股价', '从期权的市场价格反推隐含波动率', '计算公司市值', '决定分红日期'],
    correct: 1,
    explain: '就像上一课你调 IV 去对上 $4.73：把价格翻译成 IV，所有期权就能用同一把尺子比贵贱。',
  },
  {
    type: 'concept',
    kicker: '一个小差价',
    title: 'Call 和 Put，为什么差 $0.33？',
    body: 'XYZ 现价 $100，30 天后到期：\n\n· $100 Call：$3.02\n· $100 Put：$2.69\n\n同样平值、同样到期，Call 却比 Put 贵了 $0.33。',
  },
  {
    type: 'choice',
    question: '这 $0.33 最可能是什么？',
    options: ['随机的报价误差', '利息：30 天后付的 $100，今天只值约 $99.67', '交易手续费', 'Put 比较难卖'],
    correct: 1,
    explain: '按 4% 的利率，30 天后的 $100 折到今天约 $99.67。股价 $100 减去行权价现值 $99.67，正好是 $0.33——也正好是 Call 与 Put 的差价。',
  },
  {
    type: 'concept',
    kicker: '起个名字',
    title: 'Put-Call 平价',
    body: '同一行权价、同一到期日的 Call 和 Put，价格被一条关系锁在一起：',
    display: 'Call − Put = 股价 − 行权价现值',
  },
  {
    type: 'value',
    mode: 'explore',
    prompt: '随便拖：IV、股价、剩余时间。看看左右两边会不会分开。',
    option: 'call',
    strike: 100,
    iv: 0.25,
    ivRange: [10, 60],
    compare: 'parity',
    showSplit: false,
    spot: { range: [85, 115], start: 100 },
    days: { range: [5, 60], start: 30 },
    xAxis: 'spot',
    visit: { iv: [15, 50], spot: [92, 108] },
    explain: 'IV 怎么拖，Call 和 Put 一起涨跌，差值纹丝不动；股价一动，差值就跟着一比一变化。不管怎么拖，左右两边永远相等。',
  },
  {
    type: 'choice',
    question: '股价涨到 $105 时，$100 Call 报价 $6.33（行权价现值仍约 $99.67）。按平价，$100 Put 应该值多少？',
    options: ['$6.33', '$5.33', '$1.00', '$0.33'],
    correct: 2,
    explain: 'Put = Call − 股价 + 行权价现值 = $6.33 − $105 + $99.67 = $1.00。知道其中三个，就能算出第四个。',
  },
  {
    type: 'concept',
    kicker: '如果不相等',
    title: '有人会来「搬砖」',
    body: '假如某天 Put 的报价比平价算出来的便宜很多，交易员可以同时买入 Put、买入股票、卖出 Call，锁定一笔几乎没有风险的利润。\n\n大家都这么做，价格很快就被推回平衡。所以在流动性好的市场里，平价几乎总是成立。',
  },
  {
    type: 'choice',
    question: '回想第 2 单元：「持有股票 + 买入 Put」（保护性看跌）的损益形状，和哪种组合一样？',
    options: ['卖出 Call', '买入 Call + 持有现金', '卖出 Put', '做空股票'],
    correct: 1,
    explain: '把平价移一下项：股票 + Put = Call + 行权价现值（现金）。两边都是「下跌有底、上涨跟随」——难怪第 2 单元那张保护性看跌的图，长得像一张 Long Call。',
  },
  {
    type: 'tf',
    statement: '模型算出的理论价和市场价不一致时，一定是市场价错了。',
    answer: false,
    explain: '错误。市场价里有模型不知道的信息（事件预期、供需）。实践中通常认为市场价是对的，让 IV 去解释差异。',
  },
  {
    type: 'match',
    prompt: '把工具和它的作用配对',
    pairs: [
      ['Black-Scholes', '把五个输入变成理论价格'],
      ['隐含波动率', '从市场价格反推的预期波动'],
      ['Put-Call 平价', '锁住 Call 与 Put 的价格关系'],
      ['套利者', '让平价关系保持成立'],
    ],
  },
  {
    type: 'concept',
    kicker: '第 4 单元完成',
    title: '期权价格不是拍脑袋定的',
    body: '把这个单元压缩成四句话：',
    bullets: [
      '六个因素定价：股价是跷跷板，波动率是水位，时间只往下走',
      'IV 是从价格反推的预期波动，事件前涨、事件后塌',
      'Black-Scholes 把五个输入变成价格，实战中反过来用来求 IV',
      'Call − Put = 股价 − 行权价现值，套利者让它一直成立',
    ],
    footer: '下一单元：希腊字母——用 Delta、Gamma、Theta、Vega 给每一种风险标上数字。',
  },
];

export const u4l3StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'The machine behind it',
    title: 'Black-Scholes: five numbers in, one price out',
    body: 'Every slider you’ve dragged in these units runs on the same formula: the Black-Scholes model.\n\nFeed it the stock price, strike, time left, interest rate and volatility, and it returns a theoretical price. Four of the five inputs can be looked up; only volatility has to be guessed.',
  },
  {
    type: 'choice',
    question: 'Since only volatility can’t be looked up, what do traders most often use Black-Scholes for in practice?',
    options: ['Predicting tomorrow’s stock price', 'Backing implied volatility out of market option prices', 'Calculating market cap', 'Setting dividend dates'],
    correct: 1,
    explain: 'Just like last lesson, when you set IV to match $4.73: turning prices into IV puts every option on the same ruler.',
  },
  {
    type: 'concept',
    kicker: 'A small gap',
    title: 'Why do the call and put differ by $0.33?',
    body: 'XYZ is at $100, 30 days to expiry:\n\n· $100 call: $3.02\n· $100 put: $2.69\n\nBoth at the money, same expiry — yet the call costs $0.33 more.',
  },
  {
    type: 'choice',
    question: 'What is that $0.33 most likely?',
    options: ['Random quoting error', 'Interest: $100 paid in 30 days is worth about $99.67 today', 'Commission', 'Puts are harder to sell'],
    correct: 1,
    explain: 'At a 4% rate, $100 in 30 days is worth about $99.67 today. Stock $100 minus the strike’s present value $99.67 is exactly $0.33 — exactly the call–put gap.',
  },
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Put-call parity',
    body: 'A call and a put with the same strike and expiry are locked together by one relationship:',
    display: 'call − put = stock − PV(strike)',
  },
  {
    type: 'value',
    mode: 'explore',
    prompt: 'Drag anything: IV, the stock, the time left. See whether the two sides ever drift apart.',
    option: 'call',
    strike: 100,
    iv: 0.25,
    ivRange: [10, 60],
    compare: 'parity',
    showSplit: false,
    spot: { range: [85, 115], start: 100 },
    days: { range: [5, 60], start: 30 },
    xAxis: 'spot',
    visit: { iv: [15, 50], spot: [92, 108] },
    explain: 'However you move IV, the call and put rise and fall together and the gap doesn’t budge; move the stock, and the gap moves one-for-one with it. Whatever you drag, both sides stay equal.',
  },
  {
    type: 'choice',
    question: 'With the stock at $105, the $100 call is quoted at $6.33 (the strike’s PV is still about $99.67). By parity, what should the $100 put be worth?',
    options: ['$6.33', '$5.33', '$1.00', '$0.33'],
    correct: 2,
    explain: 'Put = call − stock + PV(strike) = $6.33 − $105 + $99.67 = $1.00. Know any three, and you can find the fourth.',
  },
  {
    type: 'concept',
    kicker: 'If they don’t match',
    title: 'Someone will arbitrage it',
    body: 'Suppose one day the put is quoted far below what parity says. A trader can buy the put, buy the stock and sell the call at once, locking in a nearly riskless profit.\n\nWhen everyone does that, prices are pushed back into line quickly. That’s why parity almost always holds in liquid markets.',
  },
  {
    type: 'choice',
    question: 'Think back to Unit 2: holding stock plus a long put (a protective put) has the same payoff shape as which combination?',
    options: ['A short call', 'A long call plus cash', 'A short put', 'A short stock position'],
    correct: 1,
    explain: 'Rearrange parity: stock + put = call + PV(strike) in cash. Both are “floor on the downside, follow on the upside” — no wonder Unit 2’s protective put chart looked like a long call.',
  },
  {
    type: 'tf',
    statement: 'When the model’s theoretical price differs from the market price, the market must be wrong.',
    answer: false,
    explain: 'False. Market prices carry information the model lacks (event expectations, supply and demand). In practice the market price is treated as right, and IV absorbs the difference.',
  },
  {
    type: 'match',
    prompt: 'Match each tool to its role',
    pairs: [
      ['Black-Scholes', 'Turns five inputs into a theoretical price'],
      ['Implied volatility', 'Expected swing backed out of market prices'],
      ['Put-call parity', 'Locks call and put prices together'],
      ['Arbitrageurs', 'Keep parity holding'],
    ],
  },
  {
    type: 'concept',
    kicker: 'Unit 4 complete',
    title: 'Option prices aren’t made up',
    body: 'The whole unit in four lines:',
    bullets: [
      'Six factors set the price: the stock is a seesaw, volatility is the tide, time only goes down',
      'IV is the expected swing backed out of prices — up before events, crushed after',
      'Black-Scholes turns five inputs into a price; in practice it’s run backwards to find IV',
      'Call − put = stock − PV(strike), and arbitrageurs keep it true',
    ],
    footer: 'Next unit: the Greeks — Delta, Gamma, Theta and Vega put a number on each kind of risk.',
  },
];
