import type { LessonStep } from '../optionsCourse';

/**
 * 第 3 单元第 1 课「实值、平值、虚值」。
 * 第 3 单元共用：XYZ 现价 $100，30 天后到期，隐含波动率 25%（$100 Call ≈ $3.02，与前两单元的 $3 一致）。
 * 先问「哪张现在就有用」→ 命名三种状态 → 拖动股价看同一张合约在三种状态间切换 → Put 反过来 → 价格与状态的关系。
 */

export const U3_IV = 0.25;

export const u3l1StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '同一只股票，三张 Call',
    title: '行权价不同，处境完全不同',
    body: 'XYZ 现价 $100。期权链上，同一天到期的 Call 有很多行权价：',
    display: '$90 Call    $100 Call    $110 Call',
  },
  {
    type: 'choice',
    display: '$90 Call    $100 Call    $110 Call',
    question: '如果现在就能行权，哪一张立刻有钱赚？',
    options: ['$90 Call', '$100 Call', '$110 Call', '都没有'],
    correct: 0,
    explain: '按 $90 买入市价 $100 的股票，立刻每股赚 $10。$100 那张不赚不亏，$110 那张行权反而亏。',
  },
  {
    type: 'concept',
    kicker: '起个名字',
    title: '三种状态：实值、平值、虚值',
    body: '「现在行权有没有钱赚」决定了一张期权的状态：',
    bullets: [
      '实值（ITM）：现在行权就有钱赚。$90 Call 是实值',
      '平值（ATM）：行权价 ≈ 股价。$100 Call 是平值',
      '虚值（OTM）：现在行权没意义。$110 Call 是虚值',
      'Put 方向相反：股价低于行权价，才是实值',
    ],
  },
  {
    type: 'value',
    mode: 'explore',
    prompt: '拖动股价，看这张 $100 Call 在实值、平值、虚值之间切换。',
    option: 'call',
    strike: 100,
    iv: U3_IV,
    spot: { range: [80, 120], start: 100 },
    days: { range: [30, 30], start: 30, fixed: true },
    xAxis: 'spot',
    showSplit: false,
    visit: { spot: [92, 108] },
    explain: '状态不是合约自带的，而是由股价决定：同一张 $100 Call，股价一动，它就可能从虚值变成实值。也留意一下：价格曲线一直在虚线上方——这多出来的一截，下一课专门讲。',
  },
  {
    type: 'choice',
    question: 'XYZ 还是 $100。行权价 $110 的 Put 是什么状态？',
    options: ['实值（ITM）', '平值（ATM）', '虚值（OTM）'],
    correct: 0,
    explain: 'Put 是卖出的权利：按 $110 卖出市价 $100 的股票，立刻每股赚 $10，所以是实值。判断 Put 时，方向和 Call 相反。',
  },
  {
    type: 'match',
    prompt: 'XYZ 现价 $100。把合约和它现在行权的结果配对',
    pairs: [
      ['$90 Call', '每股赚 $10（实值）'],
      ['$110 Call', '行权没有意义（虚值）'],
      ['$110 Put', '按 $110 卖出，每股赚 $10（实值）'],
      ['$100 Put', '不赚不亏（平值）'],
    ],
  },
  {
    type: 'choice',
    display: '$90 Call    $100 Call    $110 Call',
    question: '同样 30 天后到期，这三张 Call 哪张最便宜？',
    options: ['$90 Call', '$100 Call', '$110 Call', '一样贵'],
    correct: 2,
    explain: '$110 Call 现在行权没意义，只能赌未来 30 天涨过 $110，所以最便宜（约 $0.35）。$100 的约 $3，$90 的约 $10.5。便宜意味着杠杆高，也意味着到期归零的可能更大。',
  },
  {
    type: 'tf',
    statement: '期权到期时还是虚值，就一文不值。',
    answer: true,
    explain: '正确。到期时没有「以后」了，虚值期权行权没意义，价值归零。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '状态看的是：现在行权有没有钱赚',
    body: '四句话带走：',
    bullets: [
      'Call：股价 > 行权价是实值，< 行权价是虚值',
      'Put：方向相反，股价 < 行权价才是实值',
      '状态随股价变化，同一张合约可以在三种状态间切换',
      '越虚值越便宜，到期归零的可能也越大',
    ],
    footer: '下一课：$100 Call 现在卖 $3，可它现在行权一分钱都赚不到。这 $3 买的到底是什么？',
  },
];

export const u3l1StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'One stock, three calls',
    title: 'Different strikes, very different situations',
    body: 'XYZ trades at $100. On the option chain, calls with the same expiry come in many strikes:',
    display: '$90 Call    $100 Call    $110 Call',
  },
  {
    type: 'choice',
    display: '$90 Call    $100 Call    $110 Call',
    question: 'If you could exercise right now, which one makes money immediately?',
    options: ['$90 call', '$100 call', '$110 call', 'None of them'],
    correct: 0,
    explain: 'Buying $100 stock at $90 makes $10 a share right away. The $100 call breaks even, and exercising the $110 call would lose money.',
  },
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Three states: in, at, and out of the money',
    body: 'Whether exercising right now would make money decides an option’s state:',
    bullets: [
      'In the money (ITM): exercising now makes money. The $90 call is ITM',
      'At the money (ATM): strike ≈ stock price. The $100 call is ATM',
      'Out of the money (OTM): exercising now makes no sense. The $110 call is OTM',
      'Puts work the other way: they’re ITM when the stock is below the strike',
    ],
  },
  {
    type: 'value',
    mode: 'explore',
    prompt: 'Drag the stock price and watch this $100 call switch between in, at, and out of the money.',
    option: 'call',
    strike: 100,
    iv: U3_IV,
    spot: { range: [80, 120], start: 100 },
    days: { range: [30, 30], start: 30, fixed: true },
    xAxis: 'spot',
    showSplit: false,
    visit: { spot: [92, 108] },
    explain: 'The state isn’t built into the contract — the stock price decides it. The same $100 call can go from OTM to ITM as the stock moves. Also notice: the price curve always sits above the dashed line. That extra slice is next lesson’s topic.',
  },
  {
    type: 'choice',
    question: 'XYZ is still at $100. What state is the $110-strike put in?',
    options: ['In the money (ITM)', 'At the money (ATM)', 'Out of the money (OTM)'],
    correct: 0,
    explain: 'A put is a right to sell: selling $100 stock at $110 makes $10 a share right away, so it’s ITM. For puts, the direction is the reverse of calls.',
  },
  {
    type: 'match',
    prompt: 'XYZ is at $100. Match each contract to what exercising it now would do',
    pairs: [
      ['$90 call', 'Make $10 a share (ITM)'],
      ['$110 call', 'Make no sense (OTM)'],
      ['$110 put', 'Sell at $110, make $10 a share (ITM)'],
      ['$100 put', 'Break even (ATM)'],
    ],
  },
  {
    type: 'choice',
    display: '$90 Call    $100 Call    $110 Call',
    question: 'All three expire in 30 days. Which call is cheapest?',
    options: ['$90 call', '$100 call', '$110 call', 'They cost the same'],
    correct: 2,
    explain: 'Exercising the $110 call now makes no sense; it only pays if the stock climbs past $110 within 30 days, so it’s cheapest (about $0.35). The $100 call is about $3, the $90 about $10.50. Cheap means more leverage — and a better chance of expiring worthless.',
  },
  {
    type: 'tf',
    statement: 'If an option is still out of the money at expiry, it’s worth nothing.',
    answer: true,
    explain: 'True. At expiry there is no “later” left; exercising an OTM option makes no sense, so it’s worth zero.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'The state asks: would exercising now make money?',
    body: 'Four lines to take with you:',
    bullets: [
      'Calls: stock above the strike is ITM, below is OTM',
      'Puts: the reverse — stock below the strike is ITM',
      'The state moves with the stock; one contract can pass through all three',
      'The further out of the money, the cheaper — and the likelier to expire worthless',
    ],
    footer: 'Next lesson: the $100 call costs $3, yet exercising it now earns nothing. What is that $3 actually buying?',
  },
];
