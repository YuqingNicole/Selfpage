import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 10 单元第 3 课「锚与传染：相对估值的引力场」。
 * 英伟达 2023 年 5 月指引之夜，AMD、台积电、美光等没发财报的公司也集体上涨。
 * 计算器：每股利润 $5 的公司，按「同行 P/E × (1 − 折价)」定价；板块锚被抬高时，「比同行便宜」也可能很贵。
 */

const EPS = 5;
const MARKET_PE = 20;

const anchor = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '一家公司每股利润 $5，市场按「同行的平均 P/E 打个折」给它定价。拖动同行 P/E 和折价，看它的股价，以及和市场平均 20 倍比贵不贵。'
    : 'A company earns $5 a share, and the market prices it at “the peer average P/E, minus a discount”. Drag the peer P/E and the discount, and see its price — and whether it’s cheap next to the market’s 20×.',
  display: zh ? '股价 = $5 × 同行 P/E × (1 − 折价)' : 'price = $5 × peer P/E × (1 − discount)',
  inputs: [
    { key: 'peer', label: zh ? '同行平均 P/E（板块的锚）' : 'Peer average P/E (the sector anchor)', min: 15, max: 60, step: 1, start: 20, format: (v) => `${v}×` },
    { key: 'disc', label: zh ? '比同行便宜' : 'Discount to peers', min: 0, max: 40, step: 5, start: 30, format: (v) => `${v}%` },
  ],
  outputs: [
    { label: zh ? '股价' : 'Share price', value: (v) => EPS * v.peer * (1 - v.disc / 100), format: (n) => `$${Math.round(n)}`, main: true },
    { label: zh ? '它自己的 P/E' : 'Its own P/E', value: (v) => v.peer * (1 - v.disc / 100), format: (n) => `${n.toFixed(0)}×` },
    {
      label: zh ? '对比市场平均 20 倍' : 'vs the market’s 20×',
      value: (v) => (v.peer * (1 - v.disc / 100)) / MARKET_PE - 1,
      format: (n) => (n > 0 ? (zh ? `贵 ${(n * 100).toFixed(0)}%` : `${(n * 100).toFixed(0)}% more expensive`) : zh ? `便宜 ${Math.abs(n * 100).toFixed(0)}%` : `${Math.abs(n * 100).toFixed(0)}% cheaper`),
    },
  ],
  visit: { peer: [20, 50] },
  explain: zh
    ? '同行 20 倍时，打七折是 14 倍，确实便宜；同行被情绪抬到 50 倍，打七折还是 35 倍，比市场平均贵 75%。公司一分钱利润没变，股价跟着锚翻了一倍多。'
    : 'With peers at 20×, a 30% discount is 14× — genuinely cheap. With peers bid up to 50×, the same discount is still 35×, 75% above the market average. The company’s profit didn’t change at all, yet its price more than doubled with the anchor.',
});

export const i10l3StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一夜之间',
    title: '一家公司发财报，整个板块一起涨',
    body: '2023 年 5 月英伟达指引爆表的那一夜，AMD、台积电、美光这些当天没有发财报的公司，股价也集体上涨。\n\n它们自己没有任何新消息。',
  },
  {
    type: 'choice',
    question: '没有新消息的公司也跟着涨，机制是什么？',
    options: ['纯属巧合', '龙头被重新定价，抬高了整个板块的估值基准；同时 AI 需求会沿产业链传成它们的订单', '这些公司同时发了利好', '交易所故障'],
    correct: 1,
    explain: '一半是「锚」上移（相对定价），一半是基本面预期传导（订单会来）。分清一只跟涨的股票占的是哪一半，决定它值不值得继续拿。',
  },
  anchor(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '锚与估值传染',
    body: '市场给个股定价，大量依赖「锚」：',
    bullets: [
      '锚：同行倍数、板块均值、龙头的估值',
      '锚一动，整个板块跟着重新定价',
      '跟涨有两种：有真实订单传导的，和只是「沾概念」的',
    ],
  },
  {
    type: 'tf',
    statement: '板块普涨时，沾概念的公司和有真实订单的公司可能一起涨，但退潮时命运完全不同。',
    answer: true,
    explain: '正确。2023–24 年的 AI 行情里，拿到 HBM 存储订单的 SK 海力士持续走强，不少只沾 AI 概念的股票在热度退去后跌回原点。',
  },
  {
    type: 'fill',
    before: '如果整个板块的锚都被情绪抬高了，「比同行便宜」也可能只是',
    after: '。',
    options: ['贵得没那么离谱', '绝对便宜', '财务造假', '无风险机会'],
    correct: 0,
    explain: '2000 年互联网泡沫里，「比同行便宜 30%」的公司照样跌了 90%。相对估值要配一把绝对的尺（现金流）一起看。',
  },
  {
    type: 'choice',
    question: '你的持仓因为板块锚上移涨了 40%，公司自己没有任何新订单或新数据。比较好的应对是？',
    options: ['继续满仓等下一波', '认清这是「站在锚旁边」的涨幅：给这部分设好兑现纪律，等真实订单落地再决定是否长期持有', '立刻全部清仓', '加杠杆'],
    correct: 1,
    explain: '锚带来的涨幅没有基本面背书，来得快去得也快。「赚锚的钱」和「赚业绩的钱」，仓位纪律完全不同。',
  },
  {
    type: 'concept',
    kicker: '这一单元你学会了',
    title: '倍数是市场的眼光',
    body: '三课合起来：',
    display: '股价 = 利润 × 倍数；倍数 = 尺子 + 锚',
    bullets: [
      '拆开利润和倍数，看涨跌靠什么',
      '问清市场用哪把尺、会不会换',
      '分清真实传导和只是站在锚旁边',
    ],
    footer: '下一单元：市场炒的是变化，不是水平——通胀 7.7% 为什么能让纳指一天涨 7%？',
  },
];

export const i10l3StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'Overnight',
    title: 'One company reports, the whole sector rises',
    body: 'On the night of Nvidia’s blowout guidance in May 2023, AMD, TSMC and Micron — none of which reported that day — all rose too.\n\nThey had no news of their own.',
  },
  {
    type: 'choice',
    question: 'Companies with no news rose too. What’s the mechanism?',
    options: ['Pure coincidence', 'Repricing the leader raised the whole sector’s valuation baseline, and AI demand would flow down the supply chain into their orders', 'They all announced good news at once', 'An exchange glitch'],
    correct: 1,
    explain: 'Half is the anchor moving up (relative pricing), half is fundamental expectations flowing through (orders will come). Which half a stock is riding decides whether it’s worth holding.',
  },
  anchor(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Anchors and valuation contagion',
    body: 'The market prices individual stocks heavily off anchors:',
    bullets: [
      'Anchors: peer multiples, sector averages, the leader’s valuation',
      'Move the anchor and the whole sector gets repriced',
      'Two kinds of followers: those with real orders flowing through, and those just “sharing the theme”',
    ],
  },
  {
    type: 'tf',
    statement: 'In a sector-wide rally, theme-only companies and companies with real orders may rise together, but their fates split completely when the tide goes out.',
    answer: true,
    explain: 'True. In the 2023–24 AI rally, SK Hynix, with real HBM memory orders, kept strengthening, while many stocks with only an AI label fell back to where they started once the heat faded.',
  },
  {
    type: 'fill',
    before: 'If sentiment has lifted the whole sector’s anchor, “cheaper than peers” may only mean',
    after: '.',
    options: ['not quite as absurdly expensive', 'cheap in absolute terms', 'accounting fraud', 'a risk-free opportunity'],
    correct: 0,
    explain: 'In the 2000 dot-com bubble, companies “30% cheaper than peers” still fell 90%. Pair relative valuation with an absolute yardstick (cash flow).',
  },
  {
    type: 'choice',
    question: 'Your holding rose 40% because the sector anchor moved up; the company itself has no new orders or data. A good response?',
    options: ['Stay fully invested for the next leg', 'Recognize this as “standing next to the anchor”: set a rule for taking profit on that part, and decide on holding long-term once real orders arrive', 'Sell everything now', 'Add leverage'],
    correct: 1,
    explain: 'Gains from the anchor have no fundamentals behind them; they come fast and go fast. “Money from the anchor” and “money from results” call for completely different position discipline.',
  },
  {
    type: 'concept',
    kicker: 'What you learned this unit',
    title: 'The multiple is the market’s view',
    body: 'The three lessons together:',
    display: 'price = profit × multiple; multiple = yardstick + anchor',
    bullets: [
      'Split profit from multiple to see what drives the move',
      'Ask which yardstick the market uses, and whether it will change',
      'Tell real flow-through from just standing next to the anchor',
    ],
    footer: 'Next unit: markets trade change, not levels — how 7.7% inflation sent the Nasdaq up 7% in a day.',
  },
];
