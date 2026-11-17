import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 9 单元第 2 课「预期差：行情的唯一燃料」。
 * 英伟达 2023 年 5 月（近似值）：下季收入指引约 $110 亿，分析师预期约 $72 亿，盘后股价 +24%（第 8 单元见过）。
 * 计算器：心算这次「预期差」有多大。
 */

const GUIDE = 110;
const CONS = 72;

const gap = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'target',
  prompt: zh
    ? '英伟达给出的下季收入指引约 $110 亿，分析师此前预期约 $72 亿。指引比预期高出百分之几？先心算，再拖到你的答案。'
    : 'Nvidia guided next-quarter revenue to about $11 billion; analysts had expected about $7.2 billion. By what percentage did guidance exceed expectations? Work it out, then drag to your answer.',
  display: zh ? '预期差 = 指引 ÷ 预期 − 1' : 'expectation gap = guidance ÷ expectation − 1',
  inputs: [{ key: 'guess', label: zh ? '你的答案' : 'Your answer', min: 0, max: 100, step: 1, start: 10, format: (v) => `+${v}%` }],
  outputs: [
    { label: zh ? '预期差' : 'Expectation gap', value: () => GUIDE / CONS - 1, format: (n) => `+${(n * 100).toFixed(0)}%`, main: true },
    { label: zh ? '盘后股价' : 'Stock after hours', value: () => 0.24, format: (n) => `+${(n * 100).toFixed(0)}%` },
  ],
  target: { key: 'guess', answer: 53, tolerance: 4, hideOutputs: true },
  explain: zh
    ? '$110 亿 ÷ $72 亿 − 1 ≈ 53%。指引通常只比预期高几个百分点；高出一半，等于告诉市场「你们对 AI 需求的估计错得离谱」。当季数字平平，股价却一夜 +24%。'
    : '$11B ÷ $7.2B − 1 ≈ 53%. Guidance usually beats expectations by a few percent; beating by half told the market “your estimate of AI demand is way off”. The quarter itself was ordinary, yet the stock rose 24% overnight.',
});

export const i9l2StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '另一个反常',
    title: '利润 −30%，股价 +12%',
    body: '2022 年年中，一家零售公司公布财报：利润同比下滑 30%。当天，股价上涨 12%。\n\n上一课是「好业绩，股价跌」，这一次反过来。',
  },
  {
    type: 'choice',
    question: '利润掉了三成，股价为什么还涨？',
    options: ['市场看错了', '股价此前已经按「利润腰斩」定价，−30% 比大家担心的好', '有人操纵股价', '利润下降是好事'],
    correct: 1,
    explain: '当时市场普遍担心衰退，股价早已大跌。「没那么糟」本身就是好消息。',
  },
  {
    type: 'concept',
    kicker: '起个名字',
    title: '预期差',
    body: '推动价格的不是好坏，而是和预期的差：',
    display: '实际值 ｜ 官方预期 ｜ 市场情绪里的预期',
    bullets: [
      '坏业绩好于恐慌预期，照样大涨',
      '好业绩不及乐观预期，照样大跌',
      '读财报时把三列摆在一起，行情只跟最后一列的差有关',
    ],
  },
  gap(true),
  {
    type: 'tf',
    statement: '英伟达 2023 年 5 月盘后大涨 24%，主要是因为当季收入远超预期。',
    answer: false,
    explain: '错误。当季只是小幅超出；引爆点是下季指引——53% 的预期差全部集中在「未来」上。',
  },
  {
    type: 'fill',
    before: '读财报要摆三列数字：实际值、官方预期、',
    after: '。行情只由最后一列的差驱动。',
    options: ['市场情绪里的预期', '去年同期', '管理层年薪', '员工人数'],
    correct: 0,
    explain: '官方预期是明牌；情绪里的预期藏在近期涨跌幅、期权价格和仓位里——这才是真正的对手价。',
  },
  {
    type: 'choice',
    question: '把预期差变成动作：财报季之前，对持仓公司最该做的一件事是？',
    options: ['关掉行情软件', '写下你认为市场现在定价的预期（乐观、中性还是恐慌），财报出来后对照它', '全部清仓', '把仓位加倍'],
    correct: 1,
    explain: '提前写下来，才能对抗「事后什么都能解释」。这也是 L4 研究习惯的预演。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '行情只认预期差',
    body: '三句话带走：',
    display: '预期差 = 实际 − 市场情绪里的预期',
    bullets: [
      '坏消息好于恐慌，也是好消息',
      '最大的预期差常常藏在指引里',
      '财报前先写下市场在定价什么',
    ],
    footer: '下一课：反过来用——从价格倒推市场在假设什么。',
  },
];

export const i9l2StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'Another anomaly',
    title: 'Profit −30%, stock +12%',
    body: 'In mid-2022 a retailer reported profit down 30% from a year earlier. That day its stock rose 12%.\n\nLast lesson was “good results, stock falls”. This is the reverse.',
  },
  {
    type: 'choice',
    question: 'Profit fell by almost a third. Why did the stock rise?',
    options: ['The market got it wrong', 'The stock had already been priced for profit to halve, so −30% was better than feared', 'Someone manipulated it', 'Falling profit is good'],
    correct: 1,
    explain: 'The market was widely worried about a recession, and the stock had already fallen hard. “Not as bad” was good news in itself.',
  },
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'The expectation gap',
    body: 'Prices move on the gap from expectations, not on good or bad:',
    display: 'actual | official estimate | expectation in market sentiment',
    bullets: [
      'Bad results better than feared still rally',
      'Good results short of high hopes still sink',
      'Put the three columns side by side — the move depends only on the gap to the last one',
    ],
  },
  gap(false),
  {
    type: 'tf',
    statement: 'Nvidia jumped 24% after hours in May 2023 mainly because the quarter’s revenue far exceeded expectations.',
    answer: false,
    explain: 'False. The quarter only beat slightly; the trigger was next-quarter guidance — the whole 53% gap was about the future.',
  },
  {
    type: 'fill',
    before: 'Read earnings with three columns: actual, official estimate, and',
    after: '. Only the gap to the last one drives the move.',
    options: ['the expectation in market sentiment', 'the same quarter last year', 'management pay', 'headcount'],
    correct: 0,
    explain: 'The official estimate is public; the sentiment expectation hides in recent price moves, option prices and positioning — that’s the real price you’re trading against.',
  },
  {
    type: 'choice',
    question: 'Turning the expectation gap into action: before earnings season, the one thing to do for each holding is?',
    options: ['Turn off the quotes', 'Write down what you think the market is pricing (optimism, neutral or fear) and compare results against that', 'Sell everything', 'Double the position'],
    correct: 1,
    explain: 'Writing it down beforehand is the defense against “anything can be explained afterwards”. It’s also a preview of L4’s research habits.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Markets only care about the gap',
    body: 'Three lines to take with you:',
    display: 'gap = actual − expectation in market sentiment',
    bullets: [
      'Bad news better than feared is good news',
      'The biggest gaps often hide in guidance',
      'Before earnings, write down what the market is pricing',
    ],
    footer: 'Next lesson: run it backwards — work out from the price what the market is assuming.',
  },
];
