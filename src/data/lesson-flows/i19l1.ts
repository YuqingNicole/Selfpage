import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 19 单元第 1 课「石油：周期语言的活化石」。
 * 2020 年 4 月 20 日 WTI 5 月合约收于约 −$37/桶；2022 年 3 月布伦特一度冲上 $120 以上。
 * 计算器（假设数字）：一家油企每桶全成本约 $50，看油价变动时每桶利润放大多少。
 */

const COST = 50;
const BASE = 70;

const leverage = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '一家油企每桶的全部成本约 $50。拖动油价，看每桶利润怎么变，以及和油价 $70 时比是几倍。'
    : 'An oil producer’s all-in cost is about $50 a barrel. Drag the oil price and see how profit per barrel changes — and how it compares with $70 oil.',
  display: zh ? '每桶利润 = 油价 − 成本（$50）' : 'profit per barrel = oil price − cost ($50)',
  inputs: [{ key: 'p', label: zh ? '油价（美元 / 桶）' : 'Oil price ($/barrel)', min: 40, max: 120, step: 5, start: 70, format: (v) => `$${v}` }],
  outputs: [
    { label: zh ? '每桶利润' : 'Profit per barrel', value: (v) => v.p - COST, format: (n) => `${n < 0 ? '−' : ''}$${Math.abs(n)}`, main: true },
    { label: zh ? '相当于油价 $70 时的' : 'Compared with $70 oil', value: (v) => (v.p - COST) / (BASE - COST), format: (n) => (n <= 0 ? (zh ? '亏损' : 'Losing money') : `${n.toFixed(1)}×`) },
  ],
  visit: { p: [50, 110] },
  explain: zh
    ? '油价从 $70 涨到 $110，只涨了 57%，每桶利润却从 $20 变成 $60，翻了 3 倍；跌到 $50，利润直接归零。这就是周期股利润巅峰时 P/E 最低的原因：市场知道这么高的利润不会持续。'
    : 'Oil going from $70 to $110 is only a 57% rise, but profit per barrel goes from $20 to $60 — tripling. Drop to $50 and profit is zero. That’s why cyclical stocks have their lowest P/E at peak profits: the market knows profits that high won’t last.',
});

export const i19l1StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个价格',
    title: '油价 −$37',
    body: '2020 年 4 月 20 日，美国 WTI 原油期货收在每桶约 −$37。卖家倒贴钱，请人把油拉走。\n\n两年后，俄乌冲突爆发，布伦特原油冲上 $120 以上。',
  },
  {
    type: 'choice',
    question: '油价怎么会是负数？',
    options: ['数据错误', '疫情让需求崩塌，储油罐快满了：合约到期必须提货的多头找不到地方放油，只能倒贴钱甩掉', '石油变成了废物', '政府规定'],
    correct: 1,
    explain: '价格的下限不是零，而是「摆脱它的成本」。被迫交易 + 物理约束，就能打出负价格。',
  },
  {
    type: 'concept',
    kicker: '起个名字',
    title: '慢供给 × 快冲击',
    body: '石油是周期的教科书：',
    bullets: [
      '需求跟着经济波动，冲击说来就来',
      '供给很慢：页岩油要 6–12 个月，传统油田以年计',
      '供需一错位，价格就剧烈摆动',
      '要盯：库存、钻机数、OPEC 剩余产能',
    ],
  },
  leverage(true),
  {
    type: 'tf',
    statement: '能源股利润创纪录、P/E 只有 4–5 倍时，直接套用「低估值就买」是危险的。',
    answer: true,
    explain: '正确。巅峰利润配最低倍数，正是周期股的合理定价（第 7 单元美光一课）。买周期股看的是供需和库存的位置，不是 P/E 的绝对值。',
  },
  {
    type: 'fill',
    before: '2020 年后美国页岩油商转向「资本纪律」：少扩产、多分红。供给变慢，让油价周期变得更',
    after: '。',
    options: ['长、更钝', '短、更快', '难以预测', '不重要'],
    correct: 0,
    explain: '以前油价一涨，页岩商就疯狂打井，很快把价格压下去；现在他们把现金还给股东，高油价能维持得更久。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '周期的语言',
    body: '三句话带走：',
    display: '慢供给 × 快冲击 = 剧烈波动',
    bullets: [
      '价格下限是「摆脱它的成本」',
      '油价小涨，利润大涨，反之亦然',
      '看库存和产能，不看 P/E 高低',
    ],
    footer: '下一课：电动车这条新链，利润流向哪里？',
  },
];

export const i19l1StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'One price',
    title: 'Oil at −$37',
    body: 'On April 20, 2020, US WTI crude futures settled at about −$37 a barrel. Sellers paid people to take oil away.\n\nTwo years later, after Russia invaded Ukraine, Brent crude shot above $120.',
  },
  {
    type: 'choice',
    question: 'How can an oil price be negative?',
    options: ['A data error', 'The pandemic crushed demand and storage was nearly full: holders who had to take delivery as contracts expired had nowhere to put the oil, so they paid to get rid of it', 'Oil became waste', 'Government rules'],
    correct: 1,
    explain: 'The floor for a price isn’t zero — it’s the cost of getting rid of the thing. Forced selling plus physical limits can produce a negative price.',
  },
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Slow supply × fast shocks',
    body: 'Oil is the textbook cycle:',
    bullets: [
      'Demand swings with the economy, and shocks come suddenly',
      'Supply is slow: shale takes 6–12 months, conventional fields years',
      'When supply and demand mismatch, prices swing hard',
      'Watch: inventories, rig counts, OPEC spare capacity',
    ],
  },
  leverage(false),
  {
    type: 'tf',
    statement: 'When energy stocks post record profits at 4–5× earnings, simply applying “cheap valuation, so buy” is dangerous.',
    answer: true,
    explain: 'True. Peak profits at the lowest multiple is exactly how cyclicals should be priced (Unit 7’s Micron lesson). With cyclicals, look at where supply, demand and inventories stand — not at the P/E itself.',
  },
  {
    type: 'fill',
    before: 'After 2020, US shale producers turned to “capital discipline”: less drilling, more dividends. Slower supply makes oil cycles',
    after: '.',
    options: ['longer and blunter', 'shorter and faster', 'unpredictable', 'irrelevant'],
    correct: 0,
    explain: 'It used to be that higher prices set off a drilling frenzy that quickly pushed prices back down; now producers return the cash to shareholders, so high prices last longer.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'The language of cycles',
    body: 'Three lines to take with you:',
    display: 'slow supply × fast shocks = big swings',
    bullets: [
      'A price’s floor is the cost of getting rid of the thing',
      'Small moves in oil mean big moves in profit, both ways',
      'Watch inventories and capacity, not how high the P/E is',
    ],
    footer: 'Next lesson: on the new EV chain, where does the profit go?',
  },
];
