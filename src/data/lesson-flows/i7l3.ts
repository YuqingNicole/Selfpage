import type { LessonStep } from '../optionsCourse';
import { pxSigned } from './fmt';

/**
 * 投资主线 第 7 单元第 3 课「硬件与周期：库存与产能的钟摆」。
 * 美光（近似值）：FY2022 收入约 $310 亿、EPS 约 $7.75，股价 $50–60 时 P/E 只有 6–8 倍；
 * FY2023 收入腰斩到约 $155 亿，净亏损约 $58 亿。
 * 计算器是简化模型：股价固定 $75，EPS = 24 × (芯片价格指数 − 0.75)。
 */

const PRICE = 75;
const eps = (p: number) => 24 * (p / 100 - 0.75);

const cycle = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '一家存储芯片公司，股价先固定在 $75。拖动芯片价格（100% 是正常水平），看每股盈利和 P/E 怎么变。'
    : 'A memory chip maker, with its share price held at $75. Drag the chip price (100% is normal) and watch earnings per share and P/E.',
  display: zh ? 'P/E = 股价 $75 ÷ 每股盈利' : 'P/E = share price $75 ÷ earnings per share',
  inputs: [{ key: 'p', label: zh ? '芯片价格（相对正常水平）' : 'Chip price (vs normal)', min: 60, max: 140, step: 5, start: 100, format: (v) => `${v}%` }],
  outputs: [
    {
      label: 'P/E',
      value: (v) => PRICE / eps(v.p),
      format: (n) => (n <= 0 || !Number.isFinite(n) ? (zh ? '没有盈利，P/E 失效' : 'No earnings — P/E meaningless') : `${n.toFixed(1)}×`),
      main: true,
    },
    { label: zh ? '每股盈利' : 'Earnings per share', value: (v) => eps(v.p), format: pxSigned },
  ],
  visit: { p: [70, 135] },
  explain: zh
    ? '芯片价格高 35% 时，盈利暴增，P/E 只有约 5 倍，看起来最便宜；价格一跌回去，盈利就塌了，跌破 75% 直接亏损。周期股最「便宜」的时候，往往是利润在山顶的时候。'
    : 'With chip prices 35% above normal, earnings explode and P/E is only about 5×, looking cheapest; once prices fall back, earnings collapse, and below 75% the company loses money. A cyclical stock looks “cheapest” when profits are at the peak.',
});

export const i7l3StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个诱惑',
    title: 'P/E 6 倍的芯片龙头',
    body: '2022 年，存储芯片巨头美光的利润创下纪录，P/E 只有 6–8 倍，比大多数公司便宜得多。\n\n一年后，它的收入腰斩，全年亏损约 $58 亿。',
  },
  {
    type: 'choice',
    question: '一家公司利润创纪录、P/E 很低，接下来却巨亏。最可能的原因是？',
    options: ['管理层突然变差了', '芯片价格随供需大起大落：利润高时大家扩产、下游囤货，价格一转向，利润就塌了', '会计造假', '被竞争对手收购'],
    correct: 1,
    explain: '存储芯片几乎是标准品，价格由供需决定。供不应求时人人扩产，产能一到位、下游库存一满，价格和利润一起掉下来。',
  },
  cycle(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '周期股',
    body: '芯片、面板、航运这类行业，利润跟着供需的钟摆大起大落：',
    display: '利润在顶 → P/E 最低；利润在底 → P/E 失效',
    bullets: [
      '先行指标是库存：下游库存高企 → 砍单 → 收入跳水',
      '看周期股用价格、库存和产能，不用 P/E',
      '要分清「周期性下滑」和「结构性衰退」',
    ],
  },
  {
    type: 'fill',
    before: '半导体下行周期最早的报警信号，通常是下游',
    after: '高企，随后才是砍单和收入跳水。',
    options: ['库存', '股价', '分红', '招聘'],
    correct: 0,
    explain: '渠道塞满货的那一刻，后面的收入下滑就已经注定了。这和上一课零售的库存是同一个道理。',
  },
  {
    type: 'tf',
    statement: '判断周期股的关键之一，是分清「周期性下滑」（会回来）和「结构性衰退」（回不来）。',
    answer: true,
    explain: '正确。存储芯片跌了还会涨回来，因为需求一直在；胶卷和功能机再也回不来，因为被替代了。判断错了，抄底就变成接飞刀。',
  },
  {
    type: 'match',
    prompt: '把行业和它最该盯的数字对上（第 7 单元总结）',
    pairs: [
      ['订阅软件', '净收入留存率（NRR）'],
      ['连锁餐饮', '同店销售'],
      ['电商平台', 'GMV × 抽成率'],
      ['存储芯片', '库存与芯片价格'],
    ],
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '周期股要反着读 P/E',
    body: '三句话带走：',
    display: '最便宜的时候，往往是利润在山顶',
    bullets: [
      '周期股的利润随供需大起大落',
      '库存是周期的温度计',
      '分清周期性下滑和结构性衰退',
    ],
    footer: '下一单元：听懂管理层——财报会上他们说的，和没说的。',
  },
];

export const i7l3StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A temptation',
    title: 'A chip leader at 6× earnings',
    body: 'In 2022 memory chip giant Micron posted record profits, and its P/E was only 6–8× — far cheaper than most companies.\n\nA year later its revenue had halved and it lost about $5.8 billion for the year.',
  },
  {
    type: 'choice',
    question: 'A company posts record profit at a low P/E, then loses heavily. The most likely reason?',
    options: ['Management suddenly got worse', 'Chip prices swing with supply and demand: when profits are high everyone adds capacity and customers stockpile; when prices turn, profit collapses', 'Accounting fraud', 'A rival bought it'],
    correct: 1,
    explain: 'Memory chips are close to a commodity, priced by supply and demand. When supply is short everyone expands; once the new capacity arrives and customers’ shelves are full, prices and profits fall together.',
  },
  cycle(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Cyclical stocks',
    body: 'In chips, displays and shipping, profit swings with the supply-and-demand pendulum:',
    display: 'profit at the top → lowest P/E; profit at the bottom → P/E meaningless',
    bullets: [
      'The leading indicator is inventory: customers overstocked → order cuts → revenue plunges',
      'Judge cyclicals by prices, inventory and capacity, not P/E',
      'Tell a cyclical downturn from a structural decline',
    ],
  },
  {
    type: 'fill',
    before: 'The earliest warning of a chip downturn is usually swelling customer',
    after: ', followed by order cuts and a revenue plunge.',
    options: ['inventory', 'share prices', 'dividends', 'hiring'],
    correct: 0,
    explain: 'The moment the channel is stuffed with goods, the coming revenue drop is already locked in. Same logic as retail inventory last lesson.',
  },
  {
    type: 'tf',
    statement: 'A key to judging cyclical stocks is telling a cyclical downturn (it comes back) from a structural decline (it doesn’t).',
    answer: true,
    explain: 'True. Memory chips fall and come back because demand is still there; film and feature phones never came back because they were replaced. Get it wrong and buying the dip becomes catching a falling knife.',
  },
  {
    type: 'match',
    prompt: 'Match each industry to the number to watch (Unit 7 recap)',
    pairs: [
      ['Subscription software', 'Net revenue retention (NRR)'],
      ['Restaurant chains', 'Same-store sales'],
      ['E-commerce platforms', 'GMV × take rate'],
      ['Memory chips', 'Inventory and chip prices'],
    ],
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Read a cyclical’s P/E backwards',
    body: 'Three lines to take with you:',
    display: 'cheapest-looking is often when profit is at the peak',
    bullets: [
      'Cyclical profits swing with supply and demand',
      'Inventory is the cycle’s thermometer',
      'Tell cyclical downturns from structural decline',
    ],
    footer: 'Next unit: decoding management — what they say on earnings calls, and what they don’t.',
  },
];
