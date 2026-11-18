import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 14 单元第 1 课「一句话 Thesis 的解剖」。
 * Costco FY2023（近似值）：会员费收入约 $46 亿，营业利润约 $81 亿；
 * 全球续费率约 90%，美加约 93%。第 14–15 单元用 Costco 贯穿。
 */

const FEES = 46;
const EBIT = 81;

const feeShare = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'target',
  prompt: zh
    ? 'Costco FY2023：会员费收入约 $46 亿，营业利润约 $81 亿。会员费相当于营业利润的百分之多少？先心算，再拖到你的答案。'
    : 'Costco FY2023: membership fee revenue about $4.6B, operating profit about $8.1B. Membership fees equal what percentage of operating profit? Work it out, then drag to your answer.',
  display: zh ? '会员费 ÷ 营业利润' : 'membership fees ÷ operating profit',
  inputs: [{ key: 'x', label: zh ? '你的答案' : 'Your answer', min: 10, max: 100, step: 1, start: 20, format: (v) => `${v}%` }],
  outputs: [{ label: zh ? '实际比例' : 'Actual ratio', value: () => FEES / EBIT, format: (n) => `${(n * 100).toFixed(0)}%`, main: true }],
  target: { key: 'x', answer: 57, tolerance: 4, hideOutputs: true },
  explain: zh
    ? '46 ÷ 81 ≈ 57%。Costco 卖货几乎不赚钱，一半以上的利润来自会员费。所以它值多少，核心取决于两件事：会员费能不能涨，会员会不会续。一份好的 thesis，应该直指这里。'
    : '4.6 ÷ 8.1 ≈ 57%. Costco makes almost nothing selling goods; more than half its profit comes from membership fees. So what it’s worth comes down to two things: can fees go up, and will members renew? A good thesis points straight at that.',
});

export const i14l1StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个问题',
    title: '「Costco 是好公司，长期看好」',
    body: '这句话你一定听过类似的版本。它听起来没错，可是一年后，不管股价涨还是跌，说这话的人都可以说自己是对的。\n\n先算一个数，看 Costco 到底靠什么赚钱。',
  },
  feeShare(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: 'Thesis 的四个要素',
    body: '一句合格的投资逻辑（thesis）包含：',
    display: '标的 + 方向 + 核心逻辑 + 时间',
    bullets: [
      '标的和方向：买什么，看多还是看空',
      '核心逻辑：市场哪里看错了',
      '时间：多久之内应该被验证',
      '例：「未来 2–3 年，市场低估了 Costco 会员费的提价空间，看多」',
    ],
  },
  {
    type: 'choice',
    question: '以下哪句是合格的 thesis？',
    options: [
      '「英伟达是伟大的公司，长期看好」',
      '「未来 4 个季度，云厂商资本开支增速维持 30% 以上，市场对英伟达数据中心收入的预期偏保守，看多」',
      '「AI 是人类的未来」',
      '「感觉要涨了」',
    ],
    correct: 1,
    explain: '只有它四要素齐全，而且能被推翻：资本开支增速跌破 30%，或者指引低于预期，它就错了。另外三句怎么走都「对」，所以没有用。',
  },
  {
    type: 'fill',
    before: '检验 thesis 的标准：一个聪明的反方能不能明确地',
    after: '你？不能被推翻的判断，只是信仰。',
    options: ['反驳', '夸奖', '模仿', '关注'],
    correct: 0,
    explain: '能被反驳，才能被验证。第 9 单元从 P/E 反推隐含增速，就是把模糊的看法变成能核对的数字。',
  },
  {
    type: 'tf',
    statement: '把 thesis 写下来的主要价值之一，是防止大脑事后改写记忆，把每次结果都说成「我早就知道」。',
    answer: true,
    explain: '正确。这叫后视偏差。纸面记录是唯一不会自我美化的证人。',
  },
  {
    type: 'choice',
    question: 'thesis 里为什么必须写时间？',
    options: ['显得专业', '没有期限的判断永远「还没错」：期限让它能被验证，也决定你该看季度数据还是产业周期', '监管要求', '方便发朋友圈'],
    correct: 1,
    explain: '「长期看好」的长期如果可以无限延长，这个判断就永远无法检验。期限是判断的一部分。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '写不清楚，就是没想清楚',
    body: '三句话带走：',
    display: '标的 + 方向 + 核心逻辑 + 时间',
    bullets: [
      '核心逻辑要指向利润真正来自哪里',
      '能被推翻的才是判断',
      '写下来，和未来的自己对质',
    ],
    footer: '下一课：支撑 thesis 的证据，哪些算数？',
  },
];

export const i14l1StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A question',
    title: '“Costco is a great company — long-term bullish”',
    body: 'You’ve heard some version of this. It sounds fine — but a year from now, whether the stock rises or falls, whoever said it can claim to be right.\n\nFirst, one number: what does Costco actually make its money on?',
  },
  feeShare(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Four parts of a thesis',
    body: 'A proper investment thesis contains:',
    display: 'stock + direction + core logic + timeframe',
    bullets: [
      'Stock and direction: what, and long or short',
      'Core logic: where the market is wrong',
      'Timeframe: when it should be proven right',
      'E.g. “Over 2–3 years, the market underrates Costco’s room to raise fees — long”',
    ],
  },
  {
    type: 'choice',
    question: 'Which of these is a proper thesis?',
    options: [
      '“Nvidia is a great company, long-term bullish”',
      '“Over the next 4 quarters, cloud capex growth stays above 30%, and the market’s estimate for Nvidia’s data center revenue is too conservative — long”',
      '“AI is humanity’s future”',
      '“Feels like it’s going up”',
    ],
    correct: 1,
    explain: 'Only this one has all four parts and can be proven wrong: if capex growth drops below 30% or guidance misses, it’s wrong. The other three are “right” whatever happens, which makes them useless.',
  },
  {
    type: 'fill',
    before: 'The test of a thesis: can a smart opponent clearly',
    after: 'it? A judgment that can’t be disproven is just a belief.',
    options: ['refute', 'praise', 'copy', 'follow'],
    correct: 0,
    explain: 'Only what can be refuted can be verified. Back-solving implied growth from a P/E in Unit 9 turned a vague view into a number you can check.',
  },
  {
    type: 'tf',
    statement: 'One main value of writing your thesis down is stopping your brain from rewriting memory afterward and claiming “I knew it all along”.',
    answer: true,
    explain: 'True. It’s called hindsight bias. A written record is the only witness that never flatters itself.',
  },
  {
    type: 'choice',
    question: 'Why must a thesis include a timeframe?',
    options: ['To sound professional', 'A judgment with no deadline is never “wrong yet”: the deadline makes it testable, and decides whether you watch quarterly data or industry cycles', 'Regulators require it', 'Easier to post online'],
    correct: 1,
    explain: 'If the “long term” in “long-term bullish” can stretch forever, the judgment can never be tested. The deadline is part of the judgment.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'If you can’t write it clearly, you haven’t thought it through',
    body: 'Three lines to take with you:',
    display: 'stock + direction + core logic + timeframe',
    bullets: [
      'Core logic should point at where the profit really comes from',
      'Only what can be disproven is a judgment',
      'Write it down and hold your future self to it',
    ],
    footer: 'Next lesson: what evidence actually counts for a thesis?',
  },
];
