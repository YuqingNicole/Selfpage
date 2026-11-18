import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 19 单元第 3 课「资本流向与政策变量：方向与节奏」。
 * 中国光伏组件价格（近似）：2023 年初约 ¥1.8/W，2024 年跌到 ¥0.8/W 以下；同期全球装机连创新高，全行业亏损。
 * 计算器（简化）：单瓦成本按 ¥1.2 不变，出货量 +30%，看行业毛利（2023 年初 = 100）。
 */

const COST = 1.2;
const START = 1.8;

const solar = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '光伏需求在长：出货量增长 30%。拖动组件价格，看行业毛利怎么变。（简化：单瓦成本按 ¥1.2 不变。）'
    : 'Solar demand is growing: shipments up 30%. Drag the module price and see what happens to industry gross profit. (Simplified: cost held at ¥1.2 per watt.)',
  display: zh ? '行业毛利 = 出货量 × (价格 − 成本)' : 'industry gross profit = volume × (price − cost)',
  inputs: [
    { key: 'v', label: zh ? '出货量增长' : 'Shipment growth', min: 0, max: 60, step: 5, start: 30, fixed: true, format: (v) => `+${v}%` },
    { key: 'p', label: zh ? '组件价格（元 / 瓦）' : 'Module price (¥ / watt)', min: 0.7, max: 1.8, step: 0.1, start: 1.8, format: (v) => `¥${v.toFixed(1)}` },
  ],
  outputs: [
    {
      label: zh ? '行业毛利（2023 年初 = 100）' : 'Industry gross profit (early 2023 = 100)',
      value: (v) => (100 * (1 + v.v / 100) * (v.p - COST)) / (START - COST),
      format: (n) => `${n < -0.5 ? '−' : ''}${Math.abs(Math.round(n))}`,
      main: true,
    },
    { label: zh ? '每瓦毛利' : 'Gross profit per watt', value: (v) => v.p - COST, format: (n) => `${n < -0.005 ? '−' : ''}¥${Math.abs(n).toFixed(1)}` },
  ],
  visit: { p: [0.8, 1.6] },
  explain: zh
    ? '出货量涨了三成，可价格一旦跌破成本，卖得越多亏得越多。2023–24 年，光伏组件价格腰斩、全行业亏损，同期全球装机量却在创新高。需求方向是对的，赚不赚钱由格局和节奏决定。'
    : 'Shipments are up 30%, but once the price falls below cost, selling more just loses more. In 2023–24 module prices halved and the whole industry lost money — while global installations hit records. The direction of demand was right; whether anyone profits depends on structure and timing.',
});

export const i19l3StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个悖论',
    title: '装机创新高，全行业亏损',
    body: '2023–24 年，全球光伏装机量连续创下新高。同一时间，中国光伏组件价格腰斩，几乎整个行业都在亏钱。\n\n需求在涨，钱去哪了？',
  },
  solar(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '方向与节奏',
    body: '能源转型是几十年的确定方向，实现路径却剧烈波动：',
    bullets: [
      '方向的确定性，不能兑换成任何一年股价的确定性',
      '门槛低、产能过剩的环节，需求再好也赚不到钱',
      '补贴创造的需求，证伪条件是政治性的',
      '方向和节奏要分开定价',
    ],
  },
  {
    type: 'choice',
    question: '埃克森美孚等油气巨头近年少扩产，把创纪录的利润拿去分红和回购。这说明什么？',
    options: ['管理层没有想法', '管理层在用资本配置投票：他们不认为长期扩产能赚到钱，选择当现金牛经营（第 3 单元自由现金流）', '公司缺钱', '监管要求'],
    correct: 1,
    explain: '公司怎么花钱，本身就是管理层对行业终局的表态，比公开发言更可靠（第 8 单元）。',
  },
  {
    type: 'tf',
    statement: '补贴驱动的需求，证伪条件是政治性的（政策转向、财政压力），和商业需求的风险不同，要在 thesis 里单独标出来。',
    answer: true,
    explain: '正确。中国 2019 年补贴退坡、德国 2023 年底突然停止电动车补贴，都让销量和股价阶梯式下调。',
  },
  {
    type: 'fill',
    before: '能源转型投资的要求：把「方向的确定性」和「',
    after: '的波动性」分开定价——方向对了，某一年照样可能亏 50%。',
    options: ['节奏', '新闻', '政策', '技术'],
    correct: 0,
    explain: '2021 年押注「碳中和」的资金，在 2022–24 年的光伏和锂电上经历了约 −60% 的回撤。方向对 + 节奏错 = 真实的亏损。',
  },
  {
    type: 'concept',
    kicker: '第 19 单元 · 完成',
    title: '旧世界的周期，新世界的换挡',
    body: '把三课合在一起：',
    display: '慢供给 × 快冲击 · 利润跟着瓶颈 · 方向 ≠ 节奏',
    bullets: [
      '石油：周期的语言',
      '电动车：链条利润在流动',
      '政策和资本：方向和节奏分开看',
    ],
    footer: '下一单元：消费与医药——最慢的变量，最深的护城河。',
  },
];

export const i19l3StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A paradox',
    title: 'Record installations, industry-wide losses',
    body: 'In 2023–24, global solar installations hit record after record. Over the same period Chinese module prices halved and almost the entire industry lost money.\n\nDemand was growing — so where did the money go?',
  },
  solar(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Direction and timing',
    body: 'The energy transition is a certain direction over decades, but the path is violently uneven:',
    bullets: [
      'Certainty of direction can’t be cashed in as certainty of any year’s stock price',
      'Low-barrier links with excess capacity make no money even with strong demand',
      'Subsidy-driven demand has political disproving conditions',
      'Price direction and timing separately',
    ],
  },
  {
    type: 'choice',
    question: 'Oil majors like ExxonMobil have expanded little lately and sent record profits out as dividends and buybacks. What does that say?',
    options: ['Management has no ideas', 'Management is voting with capital allocation: they don’t think long-term expansion will pay, so they run the business as a cash cow (Unit 3, free cash flow)', 'The company is short of cash', 'Regulators require it'],
    correct: 1,
    explain: 'How a company spends its money is management’s statement on where the industry ends up — more reliable than what they say in public (Unit 8).',
  },
  {
    type: 'tf',
    statement: 'Subsidy-driven demand has political disproving conditions (policy reversals, budget pressure), a different risk from commercial demand, and should be flagged separately in a thesis.',
    answer: true,
    explain: 'True. China’s 2019 subsidy cuts and Germany’s abrupt end to EV subsidies in late 2023 both knocked sales and stocks down a step.',
  },
  {
    type: 'fill',
    before: 'Investing in the energy transition means pricing “certainty of direction” separately from “volatility of',
    after: '” — get the direction right and you can still lose 50% in a given year.',
    options: ['timing', 'news', 'policy', 'technology'],
    correct: 0,
    explain: 'Money that bet on “carbon neutrality” in 2021 went through roughly −60% in solar and lithium stocks over 2022–24. Right direction + wrong timing = real losses.',
  },
  {
    type: 'concept',
    kicker: 'Unit 19 · complete',
    title: 'Old-world cycles, new-world shifts',
    body: 'Three lessons together:',
    display: 'slow supply × fast shocks · profit follows the bottleneck · direction ≠ timing',
    bullets: [
      'Oil: the language of cycles',
      'EVs: chain profit keeps moving',
      'Policy and capital: judge direction and timing separately',
    ],
    footer: 'Next unit: consumer and healthcare — the slowest variables, the deepest moats.',
  },
];
