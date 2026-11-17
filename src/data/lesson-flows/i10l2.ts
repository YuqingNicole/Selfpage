import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 10 单元第 2 课「换尺时刻：市场用哪把尺子量你」。
 * 特斯拉（近似值）：2023 年调整后每股收益约 $3.1，年底股价约 $250，P/E 约 80 倍；
 * 传统车企 P/E 常年约 5–10 倍。
 */

const EPS = 3.1;

const tesla = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'target',
  prompt: zh
    ? '2023 年底，特斯拉股价约 $250，每股收益约 $3.1。市场给它的 P/E 大约是多少？先心算，再拖到你的答案。'
    : 'At the end of 2023 Tesla’s stock was about $250 and its earnings per share about $3.10. Roughly what P/E was the market giving it? Work it out, then drag to your answer.',
  display: zh ? 'P/E = 股价 ÷ 每股收益' : 'P/E = share price ÷ earnings per share',
  inputs: [{ key: 'pe', label: 'P/E', min: 5, max: 120, step: 1, start: 10, format: (v) => `${v}×` }],
  outputs: [
    { label: zh ? '这个 P/E 下的股价' : 'Share price at this P/E', value: (v) => EPS * v.pe, format: (n) => `$${Math.round(n)}`, main: true },
    {
      label: zh ? '这是哪把尺子' : 'Which yardstick',
      value: (v) => v.pe,
      format: (n) => (n <= 12 ? (zh ? '汽车公司的尺（5–10 倍）' : 'Carmaker yardstick (5–10×)') : n <= 40 ? (zh ? '成长科技股的尺' : 'Growth tech yardstick') : zh ? '远期故事的尺' : 'Long-range story yardstick'),
    },
  ],
  target: { key: 'pe', answer: 80, tolerance: 5, hideOutputs: true },
  explain: zh
    ? '$250 ÷ $3.1 ≈ 80 倍。按汽车公司 8 倍的尺，同样的利润只值约 $25 一股。中间差的 $225，是市场在为「自动驾驶、机器人、能源」这些远期故事付钱。'
    : '$250 ÷ $3.10 ≈ 80×. On a carmaker’s 8× yardstick, the same profit is worth about $25 a share. The $225 in between is the market paying for long-range stories: self-driving, robots, energy.',
});

export const i10l2StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个问题',
    title: '它到底是车企，还是科技公司？',
    body: '特斯拉卖的主要是汽车，可它的估值从来不像车企。丰田、通用的 P/E 常年只有 5–10 倍。\n\n先算算市场给特斯拉的是多少倍。',
  },
  tesla(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '估值的尺子',
    body: '不同阶段的公司，市场用不同的尺子量：',
    bullets: [
      '亏损的高成长公司：P/S（市销率）',
      '盈利稳定的公司：P/E（市盈率）',
      '重资产、强周期：P/B（市净率）',
      '成熟的现金牛：自由现金流收益率、股息',
    ],
  },
  {
    type: 'match',
    prompt: '把公司阶段和市场常用的尺子对上',
    pairs: [
      ['还在亏损的早期 SaaS', '市销率 P/S'],
      ['利润稳定增长', '市盈率 P/E'],
      ['银行、航运', '市净率 P/B'],
      ['不再增长的现金牛', '自由现金流收益率'],
    ],
  },
  {
    type: 'choice',
    question: '2022 年利率上行，市场给成长股的尺子从「P/S + 故事」换成了「现金流 + 利润」。这对还没有利润的公司意味着什么？',
    options: ['没有影响', '灾难：新尺子下它们的读数接近零，跌得最深的正是「旧尺子高分、新尺子无分」的公司', '利好：终于不用比利润', '会立刻盈利'],
    correct: 1,
    explain: '换尺时，受伤最重的不是业绩最差的，而是最依赖旧尺子的。判断持仓时先问：它经得起换尺吗？',
  },
  {
    type: 'tf',
    statement: '「你被归进哪一类公司」本身就值好几倍的股价。',
    answer: true,
    explain: '正确。同样 $3.1 的每股收益，按车企的尺值约 $25，按科技股的尺值 $100 以上。这也是公司管理叙事的核心战场。',
  },
  {
    type: 'choice',
    question: '预判「换尺」风险，最重要的宏观触发器是？',
    options: ['天气', '利率转向：宽松时市场愿意为远期故事付钱，紧缩时换回看当下现金', '节假日', '股评人数'],
    correct: 1,
    explain: '这是第 4 单元利率课和本课的合流：利率决定市场用哪把尺，尺子决定谁的估值被改写。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '先问用的是哪把尺',
    body: '三句话带走：',
    display: '同样的利润，换一把尺，价格差十倍',
    bullets: [
      '不同阶段用不同的尺：P/S、P/E、P/B、现金流',
      '换尺本身就是行情，利率是最常见的触发器',
      '最怕换尺的，是只在旧尺子下好看的公司',
    ],
    footer: '下一课：龙头换了尺，整个板块为什么一起动？',
  },
];

export const i10l2StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A question',
    title: 'Is it a carmaker or a tech company?',
    body: 'Tesla mainly sells cars, yet it has never been valued like a carmaker. Toyota’s and GM’s P/Es have long sat at 5–10×.\n\nFirst, work out what multiple the market gives Tesla.',
  },
  tesla(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Valuation yardsticks',
    body: 'The market measures companies at different stages with different yardsticks:',
    bullets: [
      'Loss-making high-growth companies: P/S (price to sales)',
      'Steadily profitable companies: P/E (price to earnings)',
      'Asset-heavy, highly cyclical: P/B (price to book)',
      'Mature cash cows: free cash flow yield, dividends',
    ],
  },
  {
    type: 'match',
    prompt: 'Match each company stage to the yardstick the market usually uses',
    pairs: [
      ['Early-stage SaaS still losing money', 'Price to sales (P/S)'],
      ['Steadily growing profits', 'Price to earnings (P/E)'],
      ['Banks, shipping', 'Price to book (P/B)'],
      ['A cash cow that no longer grows', 'Free cash flow yield'],
    ],
  },
  {
    type: 'choice',
    question: 'As rates rose in 2022, the market’s yardstick for growth stocks switched from “P/S + story” to “cash flow + profit”. What did that mean for companies with no profit yet?',
    options: ['No effect', 'Disaster: on the new yardstick they read close to zero; those that fell hardest scored high on the old one and nothing on the new', 'Good news: no more profit comparisons', 'They’d turn profitable immediately'],
    correct: 1,
    explain: 'When the yardstick changes, the worst hurt aren’t the weakest performers but those most dependent on the old yardstick. Ask of any holding: can it survive a change of yardstick?',
  },
  {
    type: 'tf',
    statement: 'Which category a company gets put in can be worth several times its share price.',
    answer: true,
    explain: 'True. The same $3.10 of EPS is worth about $25 on a carmaker’s yardstick and over $100 on a tech stock’s. That’s why companies fight so hard over their narrative.',
  },
  {
    type: 'choice',
    question: 'The most important macro trigger for a change of yardstick is?',
    options: ['Weather', 'A turn in interest rates: when money is easy the market pays for long-range stories; when it tightens it goes back to cash today', 'Holidays', 'The number of stock commentators'],
    correct: 1,
    explain: 'This is where Unit 4’s interest rates meet this lesson: rates decide which yardstick the market uses, and the yardstick decides whose valuation gets rewritten.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'First ask which yardstick',
    body: 'Three lines to take with you:',
    display: 'same profit, different yardstick, 10× the price',
    bullets: [
      'Different stages, different yardsticks: P/S, P/E, P/B, cash flow',
      'A change of yardstick moves markets; rates are the usual trigger',
      'Most at risk: companies that only look good on the old yardstick',
    ],
    footer: 'Next lesson: when the leader gets re-rated, why does the whole sector move?',
  },
];
