import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 8 单元第 1 课「指引的语言学」。
 * 第 8 单元：听懂管理层。英伟达 2023 年 5 月财报（近似值）：下季收入指引约 $110 亿，
 * 分析师此前预期约 $72 亿，高出约 53%，盘后股价 +24%。苹果 2018 年 11 月宣布不再披露 iPhone 销量。
 * 计算器：一家公司过去 8 个季度平均超出自己指引 3%，「相对习惯的意外」= 实际超出 − 3%。
 */

const BASE = 3;
const signed = (n: number) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n).toFixed(0)}%`;

const baseline = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'target',
  prompt: zh
    ? '一家公司过去 8 个季度，收入平均比自己的指引高 3%，市场早已习惯。这个季度收入至少要比指引高多少，才算「没让人失望」？拖到你的答案。'
    : 'For eight quarters a company’s revenue beat its own guidance by 3% on average, and the market is used to it. How much must revenue beat guidance this quarter just to “not disappoint”? Drag to your answer.',
  display: zh ? '相对习惯的意外 = 这次超出指引 − 平时超出的 3%' : 'surprise vs habit = beat this time − the usual 3%',
  inputs: [{ key: 'beat', label: zh ? '这次比指引高' : 'Beat vs guidance this quarter', min: -5, max: 10, step: 1, start: 0, format: signed }],
  outputs: [
    { label: zh ? '相对习惯的意外' : 'Surprise vs habit', value: (v) => v.beat - BASE, format: signed, main: true },
    {
      label: zh ? '市场大概会怎么读' : 'How the market likely reads it',
      value: (v) => v.beat - BASE,
      format: (n) => (n < 0 ? (zh ? '转弱信号' : 'A sign of weakening') : n === 0 ? (zh ? '符合习惯' : 'As usual') : zh ? '真正的惊喜' : 'A real surprise'),
    },
  ],
  target: { key: 'beat', answer: 3, tolerance: 0.5, hideOutputs: true },
  explain: zh
    ? '要高 3% 才是「平常发挥」。如果这次「恰好达到指引」（0%），相对它自己的习惯其实少了 3 个点——表面达标，实际是转弱信号。'
    : 'A 3% beat is just “normal”. If this time it “exactly met guidance” (0%), that’s 3 points short of its own habit — on paper it delivered, but it’s actually a sign of weakening.',
});

export const i8l1StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个反常',
    title: '本季只是「符合预期」，股价一夜 +24%',
    body: '2023 年 5 月，英伟达公布财报，当季收入只是小幅超出预期。可它给出的下季收入指引约 $110 亿，比分析师预期的约 $72 亿高出一半。\n\n盘后，股价涨了 24%。',
  },
  {
    type: 'choice',
    question: '本季数字平平，股价却大涨。市场主要在为什么买单？',
    options: ['本季的利润', '管理层对下一季的预测：指引说明 AI 需求远超所有人的想象', '分红', '股票回购'],
    correct: 1,
    explain: '已经发生的季度早就被猜得差不多了。市场买的是未来，而指引是未来的「官方版本」。',
  },
  {
    type: 'concept',
    kicker: '起个名字',
    title: '指引（guidance）',
    body: '管理层对下一季或全年的官方预测：',
    bullets: [
      '财报日的股价反应，常常一半以上由指引决定',
      '潜规则：保守指引、然后超越（beat-and-raise）',
      '撤回指引是大事：说明管理层自己也看不清了',
      '措辞降档（从「需求强劲」到「宏观不确定」）往往先于数字降档',
    ],
  },
  baseline(true),
  {
    type: 'tf',
    statement: '市场对财报的反应，主要由已经发生的本季度数字决定。',
    answer: false,
    explain: '错误。英伟达那次就是本季平平、指引惊人，盘后 +24%。已经发生的数字大多已被预期，真正的意外通常在指引里。',
  },
  {
    type: 'fill',
    before: '公司突然',
    after: '全年指引，等于管理层承认对未来几乎看不清，通常是重大风险信号。',
    options: ['撤回', '上调', '重申', '细化'],
    correct: 0,
    explain: '2020 年 3 月疫情暴发时，数百家公司撤回了全年指引。管理层宁可不给数字，说明连他们自己都看不清。',
  },
  {
    type: 'choice',
    question: '连续几个季度的电话会里，管理层对需求的描述从「strong demand」变成了「macro uncertainty」。这属于？',
    options: ['正常的措辞变化，没有意义', '语言先降档：措辞转弱往往领先于数字转弱', '律师要求的表述', '翻译问题'],
    correct: 1,
    explain: '管理层不会突然认输，但措辞会先松动。逐季对比措辞，是最便宜的领先指标之一。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '对着基线读指引',
    body: '三句话带走：',
    display: '市场买的是未来，指引是未来的官方版本',
    bullets: [
      '财报日的意外，常常藏在指引里',
      '要对照公司自己的习惯来读：常超的公司「刚好达标」是转弱',
      '撤回指引、措辞降档都是领先信号',
    ],
    footer: '下一课：电话会的问答环节——管理层回避的问题，就是答案。',
  },
];

export const i8l1StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'An anomaly',
    title: 'A merely “in line” quarter, and the stock +24% overnight',
    body: 'In May 2023 Nvidia reported a quarter only slightly ahead of expectations. But its revenue guidance for the next quarter, about $11 billion, was half again above the roughly $7.2 billion analysts expected.\n\nAfter hours, the stock jumped 24%.',
  },
  {
    type: 'choice',
    question: 'An ordinary quarter, yet the stock soared. What was the market mainly paying for?',
    options: ['This quarter’s profit', 'Management’s forecast for next quarter: guidance showed AI demand far beyond anyone’s expectations', 'Dividends', 'Buybacks'],
    correct: 1,
    explain: 'The quarter that already happened had largely been guessed. The market buys the future, and guidance is the future’s “official version”.',
  },
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Guidance',
    body: 'Management’s official forecast for the next quarter or year:',
    bullets: [
      'Often more than half of the earnings-day move is decided by guidance',
      'The unwritten rule: guide conservatively, then beat (beat-and-raise)',
      'Withdrawing guidance is a big deal: management can’t see ahead either',
      'Wording downgrades (from “strong demand” to “macro uncertainty”) often come before number downgrades',
    ],
  },
  baseline(false),
  {
    type: 'tf',
    statement: 'The market’s reaction to earnings is mainly decided by the quarter that already happened.',
    answer: false,
    explain: 'False. Nvidia’s quarter was ordinary and its guidance stunning — +24% after hours. Numbers that already happened are mostly expected; the real surprise is usually in the guidance.',
  },
  {
    type: 'fill',
    before: 'A company that suddenly',
    after: ' its full-year guidance is admitting it can barely see ahead — usually a major risk signal.',
    options: ['withdraws', 'raises', 'reaffirms', 'details'],
    correct: 0,
    explain: 'When the pandemic hit in March 2020, hundreds of companies withdrew full-year guidance. If management would rather give no number, even they can’t see ahead.',
  },
  {
    type: 'choice',
    question: 'Over several earnings calls, management’s description of demand shifts from “strong demand” to “macro uncertainty”. This is:',
    options: ['A normal wording change with no meaning', 'Language downshifting first: weaker wording often leads weaker numbers', 'Wording required by lawyers', 'A translation issue'],
    correct: 1,
    explain: 'Management won’t suddenly admit defeat, but the wording loosens first. Comparing wording quarter by quarter is one of the cheapest leading indicators.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Read guidance against the baseline',
    body: 'Three lines to take with you:',
    display: 'the market buys the future; guidance is its official version',
    bullets: [
      'Earnings-day surprises often hide in guidance',
      'Read it against the company’s own habit: for a habitual beater, “just meeting” is weakening',
      'Withdrawn guidance and softer wording are leading signals',
    ],
    footer: 'Next lesson: the Q&A on earnings calls — the question management dodges is the answer.',
  },
];
