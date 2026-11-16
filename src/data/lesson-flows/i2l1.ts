import type { CalcStep, LessonStep } from '../optionsCourse';
import { pct, usdEn, usdZh } from './fmt';

/**
 * 投资主线 第 2 单元第 1 课「利润表的四层楼」。
 * 第 2 单元全程用苹果 FY2023 利润表（近似值）：收入 $3,833 亿、直接成本 $2,141 亿、毛利 $1,691 亿（44%）、
 * 营业费用 $548 亿、营业利润 $1,143 亿（30%）、净利润 $970 亿（25%）；硬件毛利率约 36.5%，服务约 70.8%。
 */

const REV = 383.3e9;

const waterfall = (zh: boolean): CalcStep => {
  const f = zh ? usdZh : usdEn;
  return {
    type: 'calc',
    mode: 'explore',
    prompt: zh
      ? '这是苹果 FY2023 的利润表（近似值）。拖动两类成本，看每一层利润怎么变。'
      : 'Here is Apple’s FY2023 income statement (approximate). Drag the two kinds of cost and watch each layer of profit.',
    inputs: [
      { key: 'rev', label: zh ? '收入' : 'Revenue', min: REV, max: REV, step: 1, start: REV, fixed: true, format: (v) => f(v) },
      {
        key: 'cogs',
        label: zh ? '直接成本（零件、制造）' : 'Cost of sales (parts, manufacturing)',
        min: 170e9,
        max: 260e9,
        step: 1e9,
        start: 214e9,
        format: (v) => f(v),
      },
      {
        key: 'opex',
        label: zh ? '营业费用（研发、销售、管理）' : 'Operating expenses (R&D, sales, admin)',
        min: 30e9,
        max: 80e9,
        step: 1e9,
        start: 55e9,
        format: (v) => f(v),
      },
    ],
    outputs: [
      { label: zh ? '毛利' : 'Gross profit', value: (v) => v.rev - v.cogs, format: (n) => f(n) },
      { label: zh ? '毛利率' : 'Gross margin', value: (v) => (v.rev - v.cogs) / v.rev, format: pct },
      { label: zh ? '营业利润' : 'Operating profit', value: (v) => v.rev - v.cogs - v.opex, format: (n) => f(n), main: true },
      { label: zh ? '营业利润率' : 'Operating margin', value: (v) => (v.rev - v.cogs - v.opex) / v.rev, format: pct },
    ],
    visit: { cogs: [200e9, 240e9], opex: [40e9, 70e9] },
    explain: zh
      ? '直接成本一变，毛利和营业利润一起变；营业费用只影响营业利润，碰不到毛利。所以看到利润下滑，先找是哪一层被吃掉了——问题就出在那一层。'
      : 'Change the cost of sales and both gross and operating profit move; operating expenses only hit operating profit, never gross profit. So when profit falls, find which layer got eaten — that’s where the problem is.',
  };
};

export const i2l1StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一大笔收入',
    title: '卖了 $3,833 亿，股东最后能拿到多少？',
    body: 'FY2023，苹果一年收入约 $3,833 亿。\n\n从这笔钱到「股东最后分到的」，中间要扣掉好几层。先凭感觉猜一下。',
  },
  {
    type: 'choice',
    question: '苹果 FY2023 收入约 $3,833 亿。它的净利润大约是多少？',
    options: ['约 $3,500 亿', '约 $1,700 亿', '约 $970 亿', '约 $100 亿'],
    correct: 2,
    explain: '约 $970 亿：每卖 $100，最后落下大约 $25。中间那 $75 被谁拿走了？接下来一层一层拆。',
  },
  {
    type: 'concept',
    kicker: '起个名字',
    title: '利润表的四层楼',
    body: '每往下一层，就扣掉一类成本：',
    display: '收入 → 毛利 → 营业利润 → 净利润',
    bullets: [
      '毛利 = 收入 − 直接成本（零件、制造）。苹果：约 $1,691 亿',
      '营业利润 = 毛利 − 研发、销售、管理费用。苹果：约 $1,143 亿',
      '净利润 = 营业利润 − 利息和税等。苹果：约 $970 亿',
      '每层除以收入，就是毛利率、营业利润率、净利率',
    ],
  },
  waterfall(true),
  {
    type: 'tf',
    statement: '研发工程师的工资通常不在毛利这一层扣，而是作为营业费用在下一层扣。',
    answer: true,
    explain: '正确。毛利只扣和生产直接相关的成本；研发、销售、管理属于营业费用。所以软件公司毛利率很高，但研发费用也很高。',
  },
  {
    type: 'choice',
    question: '对照一下：2022 年亚马逊收入约 $5,140 亿，却录得净亏损约 $27 亿。这说明什么？',
    options: ['亚马逊的生意不行了', '收入和净利润之间隔着成本、费用和一次性项目，收入大不等于赚钱', '财报造假', '电商行业整体亏损'],
    correct: 1,
    explain: '那一年的主要拖累是对 Rivian 股权投资的减值，属于一次性项目，不是电商主业亏了。读财报要分清亏损来自哪一层。',
  },
  {
    type: 'match',
    prompt: '把利润表的每一层和它回答的问题对上',
    pairs: [
      ['收入', '卖出去多少钱'],
      ['毛利', '产品本身赚不赚'],
      ['营业利润', '整个生意经营得好不好'],
      ['净利润', '股东最终分到多少'],
    ],
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '每一层利润，回答一个不同的问题',
    body: '三句话带走：',
    display: '收入 → 毛利 → 营业利润 → 净利润',
    bullets: [
      '毛利看产品，营业利润看经营，净利润看股东',
      '利润下滑时，先找是哪一层被吃掉了',
      '收入大不等于赚钱，还要分清一次性项目',
    ],
    footer: '下一课：同样叫「毛利」，苹果卖手机和卖服务，赚钱的效率差了一倍。',
  },
];

export const i2l1StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A lot of revenue',
    title: '$383 billion in sales — how much reaches shareholders?',
    body: 'In FY2023, Apple brought in about $383 billion of revenue.\n\nBetween that and what shareholders finally keep, several layers get deducted. Take a guess first.',
  },
  {
    type: 'choice',
    question: 'Apple’s FY2023 revenue was about $383 billion. Roughly what was its net profit?',
    options: ['About $350 billion', 'About $170 billion', 'About $97 billion', 'About $10 billion'],
    correct: 2,
    explain: 'About $97 billion: for every $100 sold, roughly $25 is left at the end. Who took the other $75? Let’s peel it apart layer by layer.',
  },
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'The four floors of the income statement',
    body: 'Each floor down deducts one kind of cost:',
    display: 'revenue → gross profit → operating profit → net profit',
    bullets: [
      'Gross profit = revenue − cost of sales (parts, manufacturing). Apple: about $169B',
      'Operating profit = gross profit − R&D, sales and admin. Apple: about $114B',
      'Net profit = operating profit − interest, taxes and the like. Apple: about $97B',
      'Divide each by revenue for gross, operating and net margins',
    ],
  },
  waterfall(false),
  {
    type: 'tf',
    statement: 'R&D engineers’ salaries usually aren’t deducted at the gross-profit level, but as operating expenses one floor down.',
    answer: true,
    explain: 'True. Gross profit only deducts costs tied directly to production; R&D, sales and admin are operating expenses. That’s why software companies have high gross margins but also big R&D bills.',
  },
  {
    type: 'choice',
    question: 'For contrast: in 2022 Amazon had about $514 billion of revenue but a net loss of about $2.7 billion. What does that show?',
    options: ['Amazon’s business is failing', 'Costs, expenses and one-off items sit between revenue and net profit — big revenue isn’t the same as profit', 'Fraudulent accounts', 'E-commerce as a whole lost money'],
    correct: 1,
    explain: 'The main drag that year was a write-down of its Rivian stake — a one-off item, not a loss in the core retail business. Reading accounts means knowing which floor a loss comes from.',
  },
  {
    type: 'match',
    prompt: 'Match each floor of the income statement to the question it answers',
    pairs: [
      ['Revenue', 'How much was sold'],
      ['Gross profit', 'Does the product itself make money'],
      ['Operating profit', 'Is the whole business run well'],
      ['Net profit', 'What shareholders finally get'],
    ],
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Each layer of profit answers a different question',
    body: 'Three lines to take with you:',
    display: 'revenue → gross profit → operating profit → net profit',
    bullets: [
      'Gross profit is about the product, operating profit the business, net profit the shareholders',
      'When profit falls, find which layer got eaten first',
      'Big revenue isn’t profit — and separate out one-off items',
    ],
    footer: 'Next lesson: both are “gross profit”, yet Apple earns twice as efficiently on services as on phones.',
  },
];
