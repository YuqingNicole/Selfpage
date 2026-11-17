import type { LessonStep } from '../optionsCourse';
import { usdEn, usdZh } from './fmt';

/**
 * 投资主线 第 13 单元第 2 课「MD&A 与脚注：坑埋在哪」。
 * MD&A 用两季措辞对比；脚注用「到期墙」：零利率时代借的债在高利率环境续借。
 * 计算器用一家假设的公司：$50 亿债务原利率 3%，明年到期；营业利润 $10 亿。
 */

const DEBT = 50e8;
const OLD = 3;
const EBIT = 10e8;

const wall = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '一家公司的债务脚注写着：$50 亿债券，利率 3%，明年到期。它的营业利润每年约 $10 亿。拖动续借时的利率，看利息会吃掉多少利润。'
    : 'A company’s debt footnote says: $5B of bonds at 3%, due next year. Its operating profit is about $1B a year. Drag the refinancing rate and see how much profit the interest eats.',
  display: zh ? '多付的利息 = 债务 × (新利率 − 旧利率)' : 'extra interest = debt × (new rate − old rate)',
  inputs: [{ key: 'r', label: zh ? '续借利率' : 'Refinancing rate', min: 3, max: 10, step: 0.5, start: 3, format: (v) => `${v}%` }],
  outputs: [
    { label: zh ? '每年多付的利息' : 'Extra interest per year', value: (v) => (DEBT * (v.r - OLD)) / 100, format: (n) => (zh ? usdZh(n) : usdEn(n)), main: true },
    { label: zh ? '占营业利润' : 'Share of operating profit', value: (v) => (DEBT * (v.r - OLD)) / 100 / EBIT, format: (n) => `${(n * 100).toFixed(0)}%` },
  ],
  visit: { r: [4, 8] },
  explain: zh
    ? '利率从 3% 到 7%，每年多付 $2 亿，营业利润少了两成——而这条信息只写在脚注的债务明细表里。2023–24 年，大量零利率时代发的债集中到期，「到期墙」就是这样从脚注走进利润表的。'
    : 'From 3% to 7%, the company pays $200M more a year — a fifth of operating profit — and the only place this shows up in advance is the debt table in the footnotes. In 2023–24, piles of bonds issued in the zero-rate era came due; that’s how a “maturity wall” walks from the footnotes into the income statement.',
});

export const i13l2StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个问题',
    title: '两段几乎一样的话',
    body: '同一家公司，连续两个季度的 MD&A（管理层讨论与分析）开头是这样写的：',
    display: 'Q1：需求强劲，我们对全年增长充满信心\nQ2：需求保持韧性，我们对全年前景审慎乐观',
  },
  {
    type: 'choice',
    question: '两段话放在一起，你读出了什么？',
    options: ['没区别，都是正面表述', '措辞降了档：「强劲」→「韧性」、「充满信心」→「审慎乐观」，管理层在悄悄压低预期', '公司业绩一定在暴跌', '换了写稿人'],
    correct: 1,
    explain: '单独读一份 MD&A，全是场面话；两份对着读，变化自己会跳出来。这是第 8 单元「听懂管理层」的文本版做法。',
  },
  {
    type: 'concept',
    kicker: '起个名字',
    title: 'MD&A 读差异，脚注找新东西',
    body: '两个地方，两种读法：',
    bullets: [
      'MD&A：和上一季逐句对比，看新增的解释、消失的亮点',
      '脚注：按规定必须说、但希望没人看的地方',
      '必扫两条：收入确认方法、债务的利率和到期时间',
      '突然出现的新名词（新实体、新会计政策）最值得查',
    ],
  },
  wall(true),
  {
    type: 'tf',
    statement: '安然的表外负债工具（特殊目的实体）主要藏在财报脚注里，认真读脚注的人有机会提前发现异常。',
    answer: true,
    explain: '2001 年，确实有分析师从脚注里的关联交易披露看出问题并公开质疑，那时安然的股价还在高位。',
  },
  {
    type: 'choice',
    question: '脚注里新出现一家合资公司：和公司有大额往来，但不并入报表。第一反应应该是？',
    options: ['太复杂，跳过', '记下来追查：新实体 + 大额关联交易 + 不并表，是转移收入、藏匿负债的经典通道', '说明公司在扩张，利好', '等媒体报道再说'],
    correct: 1,
    explain: '不是每个新实体都有问题，但它值得排在追查清单的最前面。公司越想让你略过的东西，往往写得越长越无聊。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '坑总在小字里',
    body: '三句话带走：',
    display: 'MD&A 读差异 · 脚注找新东西',
    bullets: [
      '两季 MD&A 对着读，措辞降档就是信号',
      '债务脚注里藏着未来的利息账单',
      '新实体、新口径，先查再说',
    ],
    footer: '下一课：怎么让三张报表互相「测谎」？',
  },
];

export const i13l2StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A question',
    title: 'Two almost identical sentences',
    body: 'Same company, two quarters in a row. Here’s how its MD&A (Management’s Discussion and Analysis) opened:',
    display: 'Q1: Demand is strong; we are confident in full-year growth\nQ2: Demand remains resilient; we are cautiously optimistic on the year',
  },
  {
    type: 'choice',
    question: 'Reading them side by side, what do you see?',
    options: ['No difference — both are positive', 'The wording stepped down: “strong” → “resilient”, “confident” → “cautiously optimistic”. Management is quietly lowering expectations', 'Results must be collapsing', 'They changed speechwriters'],
    correct: 1,
    explain: 'Read one MD&A alone and it’s all pleasantries; read two side by side and the changes jump out. It’s the written version of Unit 8’s “listening to management”.',
  },
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'MD&A: read the diff. Footnotes: look for what’s new',
    body: 'Two places, two ways of reading:',
    bullets: [
      'MD&A: compare line by line with last quarter — new excuses, missing highlights',
      'Footnotes: what rules require them to say, hoping no one reads it',
      'Always scan two: revenue recognition, and debt rates and maturities',
      'Sudden new terms (new entities, new accounting policies) deserve a look',
    ],
  },
  wall(false),
  {
    type: 'tf',
    statement: 'Enron’s off-balance-sheet vehicles (special purpose entities) were mostly disclosed in the footnotes, so careful footnote readers had a chance to spot trouble early.',
    answer: true,
    explain: 'True. In 2001 some analysts did spot problems in the related-party disclosures in the footnotes and questioned them publicly while Enron’s stock was still high.',
  },
  {
    type: 'choice',
    question: 'A new joint venture appears in the footnotes: large dealings with the company, but not consolidated. Your first reaction?',
    options: ['Too complex, skip it', 'Note it and dig: new entity + large related-party dealings + not consolidated is a classic route for shifting revenue or hiding debt', 'The company is expanding — bullish', 'Wait for the press'],
    correct: 1,
    explain: 'Not every new entity is a problem, but it belongs at the top of the list to check. The things a company wants you to skip are often written the longest and dullest.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'The trap is in the fine print',
    body: 'Three lines to take with you:',
    display: 'MD&A: the diff · footnotes: what’s new',
    bullets: [
      'Read two MD&As side by side; softer wording is a signal',
      'Debt footnotes hold future interest bills',
      'New entities or new definitions: check first',
    ],
    footer: 'Next lesson: how to make the three statements “cross-examine” each other?',
  },
];
