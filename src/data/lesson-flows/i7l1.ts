import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 7 单元第 1 课「订阅业务：留存是一切」。
 * 第 7 单元每课一个行业：订阅（Snowflake、Netflix）、零售与平台（连锁餐饮、京东 / 拼多多）、存储芯片（美光）。
 * 近似值：Snowflake 上市前后 NRR 约 158%、2021 年高峰超过 170%；Netflix 月流失率约 2%。
 */

const nrr = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '去年的老客户一共付了 $100。今年一部分人走了（流失），留下的人又多买了一些（加购）。拖动两个滑块，看这群老客户五年后能贡献多少。'
    : 'Last year’s customers paid $100 in total. This year some left (churn) and those who stayed bought more (expansion). Drag both sliders and see what this group pays five years from now.',
  display: zh ? 'NRR = 1 − 流失 + 加购' : 'NRR = 1 − churn + expansion',
  inputs: [
    { key: 'churn', label: zh ? '流失掉的收入' : 'Revenue lost to churn', min: 0, max: 30, step: 1, start: 15, format: (v) => `−${v}%` },
    { key: 'exp', label: zh ? '留下的客户加购' : 'Expansion from those who stayed', min: 0, max: 60, step: 1, start: 10, format: (v) => `+${v}%` },
  ],
  outputs: [
    { label: zh ? '净收入留存率（NRR）' : 'Net revenue retention (NRR)', value: (v) => 1 - v.churn / 100 + v.exp / 100, format: (n) => `${(n * 100).toFixed(0)}%`, main: true },
    {
      label: zh ? '这群老客户 5 年后' : 'This group in 5 years',
      value: (v) => 100 * Math.pow(Math.max(0, 1 - v.churn / 100 + v.exp / 100), 5),
      format: (n) => `$${Math.round(n)}`,
    },
  ],
  visit: { exp: [5, 40] },
  explain: zh
    ? 'NRR 95% 时，这群客户五年后只剩约 $77，公司得不停拉新来填坑；NRR 125% 时，同一群人五年后付约 $305——一个新客户都不拉，收入也在复利增长。'
    : 'At 95% NRR the group pays only about $77 after five years, and the company must keep winning new customers to fill the hole; at 125% the same group pays about $305 — revenue compounds without a single new customer.',
});

export const i7l1StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '两个水池',
    title: '进水一样快，水位却不同',
    body: '两家订阅软件公司每年都签下一样多的新客户。五年后，一家的收入翻了几倍，另一家却越来越吃力。\n\n差别不在进水管有多粗，而在池底漏不漏。',
  },
  {
    type: 'choice',
    question: '新客户一样多，收入却差这么远。最可能的原因是？',
    options: ['销售团队人数不同', '老客户的表现不同：一家的老客户越用越多，另一家的老客户在不断离开', '办公地点不同', '一家打的广告更多'],
    correct: 1,
    explain: '订阅生意的命门是留存。拉新能撑一时，老客户每年在流失还是在加购，决定了长期的收入曲线。',
  },
  nrr(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '净收入留存率（NRR）',
    body: '只看老客户：今年贡献的收入，是去年的多少？',
    display: 'NRR > 100%：一个新客都不拉，收入也在长',
    bullets: [
      '企业软件看 NRR：120% 以上算优秀，Snowflake 高峰超过 170%',
      '消费订阅看月流失率：Netflix 约 2%，是行业最低之一',
      '高增长 + 低 NRR：用拉新掩盖漏水',
    ],
  },
  {
    type: 'choice',
    question: '两家公司：A 收入增速 60%，NRR 95%；B 增速 30%，NRR 125%。长期更健康的是？',
    options: ['A：增速才是一切', 'B：老客户越用越多，收入有复利底座；A 在用拉新掩盖漏水', '一样', '无法判断'],
    correct: 1,
    explain: '获客总会越来越贵。到那一天，A 的增长会塌下来，B 还在复利。2022 年软件股大跌后，市场重新定价的正是这个差别。',
  },
  {
    type: 'tf',
    statement: 'Netflix 月流失率只有约 2%，这是它敢反复提价的底气。',
    answer: true,
    explain: '正确。留存和定价权是一枚硬币的两面——第 5 单元的计算器里，会员越不容易跑，提价越能转化成收入。',
  },
  {
    type: 'choice',
    question: '一家订阅公司增长亮眼，却从不披露留存或流失数据。合理的解读是？',
    options: ['这个指标不重要', '要警惕：公司通常炫耀好看的数字、藏起难看的', '说明公司低调', '说明没有竞争'],
    correct: 1,
    explain: '不披露本身就是信息。找不到 NRR 时，可以用「总收入增长 − 新客户贡献」倒推老客户的表现。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '先看池底漏不漏',
    body: '三句话带走：',
    display: 'NRR = 1 − 流失 + 加购',
    bullets: [
      'NRR > 100%，老客户自己就能让收入增长',
      '高增长 + 低留存 = 漏水的桶',
      '不披露留存，往往是因为留存不好看',
    ],
    footer: '下一课：零售和平台——开新店能掩盖什么？',
  },
];

export const i7l1StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'Two tanks',
    title: 'Same inflow, different water levels',
    body: 'Two subscription software companies sign the same number of new customers every year. Five years later one has multiplied its revenue; the other is struggling more and more.\n\nThe difference isn’t how big the inlet pipe is — it’s whether the tank leaks.',
  },
  {
    type: 'choice',
    question: 'Same new customers, very different revenue. The most likely reason?',
    options: ['Different sales team sizes', 'Existing customers behave differently: one company’s customers use more and more, the other’s keep leaving', 'Different office locations', 'One advertises more'],
    correct: 1,
    explain: 'Retention is the lifeblood of subscription businesses. New sales can carry you for a while; whether existing customers leave or expand each year decides the long-run revenue curve.',
  },
  nrr(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Net revenue retention (NRR)',
    body: 'Existing customers only: how much do they pay this year compared with last year?',
    display: 'NRR > 100%: revenue grows without a single new customer',
    bullets: [
      'Enterprise software uses NRR: 120%+ is excellent; Snowflake peaked above 170%',
      'Consumer subscriptions use monthly churn: Netflix’s about 2% is among the lowest',
      'High growth + low NRR: new sales hiding a leak',
    ],
  },
  {
    type: 'choice',
    question: 'Two companies: A grows 60% with 95% NRR; B grows 30% with 125% NRR. Healthier in the long run?',
    options: ['A: growth is everything', 'B: customers keep using more, so revenue has a compounding base; A is hiding a leak with new sales', 'The same', 'Can’t tell'],
    correct: 1,
    explain: 'Winning customers always gets more expensive. When it does, A’s growth caves in while B keeps compounding. After software stocks crashed in 2022, this is exactly the difference the market repriced.',
  },
  {
    type: 'tf',
    statement: 'Netflix’s monthly churn of only about 2% is what lets it keep raising prices.',
    answer: true,
    explain: 'True. Retention and pricing power are two sides of one coin — in Unit 5’s calculator, the less likely members are to leave, the more a price hike turns into revenue.',
  },
  {
    type: 'choice',
    question: 'A subscription company shows great growth but never discloses retention or churn. A sensible reading?',
    options: ['The metric doesn’t matter', 'Be wary: companies usually show off good numbers and hide bad ones', 'The company is modest', 'There’s no competition'],
    correct: 1,
    explain: 'Not disclosing is information in itself. Without NRR, you can back out existing customers’ performance from “total revenue growth − contribution from new customers”.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'First check whether the tank leaks',
    body: 'Three lines to take with you:',
    display: 'NRR = 1 − churn + expansion',
    bullets: [
      'NRR above 100% means existing customers alone grow revenue',
      'High growth + low retention = a leaky bucket',
      'Retention goes undisclosed most often because it looks bad',
    ],
    footer: 'Next lesson: retail and platforms — what can opening new stores hide?',
  },
];
