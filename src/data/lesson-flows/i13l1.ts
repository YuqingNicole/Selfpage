import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 13 单元第 1 课「财报地图：先读什么」。
 * 苹果 FY2023 10-K（近似值）：总收入约 $3,833 亿（−3%）；
 * 产品约 $2,981 亿（FY2022 约 $3,162 亿，−6%），服务约 $852 亿（FY2022 约 $781 亿，+9%）。
 * 计算器：拖动两个分部的增速，看总收入的一个数字能掩盖多少结构变化。
 */

const PRODUCTS = 3162e8;
const SERVICES = 781e8;
const total = (v: Record<string, number>) => PRODUCTS * (1 + v.p / 100) + SERVICES * (1 + v.s / 100);

const segments = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '苹果 FY2022：产品收入约 $3,162 亿，服务约 $781 亿。FY2023 的总收入只「−3%」。拖动两个分部的增速，看总收入这一个数字背后可能藏着什么。'
    : 'Apple FY2022: products revenue about $316B, services about $78B. FY2023 total revenue was just “−3%”. Drag each segment’s growth and see what that single number can hide.',
  display: zh ? '总收入 = 产品 + 服务' : 'total revenue = products + services',
  inputs: [
    { key: 'p', label: zh ? '产品收入增速' : 'Products growth', min: -15, max: 10, step: 1, start: -6, format: (v) => `${v > 0 ? '+' : v < 0 ? '−' : ''}${Math.abs(v)}%` },
    { key: 's', label: zh ? '服务收入增速' : 'Services growth', min: -5, max: 25, step: 1, start: 9, format: (v) => `${v > 0 ? '+' : v < 0 ? '−' : ''}${Math.abs(v)}%` },
  ],
  outputs: [
    {
      label: zh ? '总收入增速（新闻标题）' : 'Total growth (the headline)',
      value: (v) => total(v) / (PRODUCTS + SERVICES) - 1,
      format: (n) => `${n > 0.0005 ? '+' : n < -0.0005 ? '−' : ''}${Math.abs(n * 100).toFixed(1)}%`,
      main: true,
    },
    { label: zh ? '服务占总收入' : 'Services share of revenue', value: (v) => (SERVICES * (1 + v.s / 100)) / total(v), format: (n) => `${(n * 100).toFixed(0)}%` },
  ],
  visit: { p: [-12, 4] },
  explain: zh
    ? '实际是产品 −6%、服务 +9%，合起来 −3%。同一个「−3%」，也可能是两块业务一起小幅下滑——生意的含义完全不同。服务的毛利率约 70%、产品约 36%，所以服务占比每升一点，利润结构都在变好。这就是为什么分部数据是第一站。'
    : 'The actual split was products −6% and services +9%, netting to −3%. The same “−3%” could also mean both businesses slipping a little — a completely different business. Services gross margin is about 70% versus about 36% for products, so every point of services mix improves the profit structure. That’s why segment data comes first.',
});

export const i13l1StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个难题',
    title: '一份上百页的年报，你只有 20 分钟',
    body: '苹果的 10-K 年报动辄上百页：业务描述、风险因素、三张报表、几十条脚注。\n\n从第一页读起，20 分钟连风险因素都读不完。该先看哪里？',
  },
  segments(true),
  {
    type: 'choice',
    question: '刚才的计算说明了什么？',
    options: ['总收入足够判断生意好坏', '总收入一个数字会掩盖结构变化：一块在长、一块在缩，合起来可能只是「小跌」', '服务收入不重要', '分部数据是公司随便编的'],
    correct: 1,
    explain: '分部是公司的「器官级」体检。还记得亚马逊 2015 年第一次单独披露 AWS 吗？看到分部，市场才重新给整家公司定价。',
  },
  {
    type: 'concept',
    kicker: '起个名字',
    title: '20 分钟读财报的路线',
    body: '不从头读到尾，按这个顺序：',
    display: '分部 → MD&A → 现金流 → 脚注',
    bullets: [
      '分部数据：哪块在长、哪块在缩',
      'MD&A：管理层怎么解释，和上季比改了什么',
      '现金流量表：利润有没有变成现金',
      '脚注：至少扫收入确认和债务两条',
    ],
  },
  {
    type: 'match',
    prompt: '把文件和它的用途对上',
    pairs: [
      ['10-K 年报', '最完整的全年底稿'],
      ['10-Q 季报', '追踪季度变化'],
      ['8-K 临时公告', '高管离职、并购等重大事件'],
      ['财报电话会', '管理层面对追问的现场反应'],
    ],
  },
  {
    type: 'tf',
    statement: '10-K 的「风险因素」一章信息密度最高，应该逐条精读。',
    answer: false,
    explain: '大部分是律师写的免责模板（「宏观经济可能波动」）。值得读的是今年新增的那一两条——和去年的版本对比着找。',
  },
  {
    type: 'fill',
    before: '读财报要回答三个问题：生意在变好还是变坏？',
    after: '？管理层的说法和上季比变了什么？',
    options: ['钱是真的吗', '股价贵不贵', '员工多不多', '总部在哪'],
    correct: 0,
    explain: '「钱是真的吗」靠现金流量表和应收账款回答，这是本单元第 3 课的内容。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '用地图读财报',
    body: '三句话带走：',
    display: '分部 → MD&A → 现金流 → 脚注',
    bullets: [
      '总数会说谎，分部更诚实',
      '风险因素只看新增的条目',
      '目标是回答三个问题，不是读完',
    ],
    footer: '下一课：MD&A 和脚注里，最值得找的是什么？',
  },
];

export const i13l1StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A problem',
    title: 'A 100-page annual report, and you have 20 minutes',
    body: 'Apple’s 10-K runs past 100 pages: business description, risk factors, three financial statements, dozens of footnotes.\n\nStart at page one and 20 minutes won’t even get you through the risk factors. Where should you look first?',
  },
  segments(false),
  {
    type: 'choice',
    question: 'What did that calculation show?',
    options: ['Total revenue is enough to judge the business', 'One total number hides structural change: one part growing, one shrinking, and together it looks like a “small dip”', 'Services revenue doesn’t matter', 'Companies make up segment data'],
    correct: 1,
    explain: 'Segments are an organ-level checkup. Remember Amazon first breaking out AWS in 2015? Only once the market saw the segment did it reprice the whole company.',
  },
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'A 20-minute route through a report',
    body: 'Don’t read front to back. Go in this order:',
    display: 'segments → MD&A → cash flow → footnotes',
    bullets: [
      'Segment data: what’s growing, what’s shrinking',
      'MD&A: how management explains it, and what changed since last quarter',
      'Cash flow statement: did profit turn into cash',
      'Footnotes: at least scan revenue recognition and debt',
    ],
  },
  {
    type: 'match',
    prompt: 'Match each filing to what it’s for',
    pairs: [
      ['10-K annual report', 'The full-year master record'],
      ['10-Q quarterly report', 'Tracking quarterly change'],
      ['8-K current report', 'Major events like exec departures, deals'],
      ['Earnings call', 'Management’s live reaction to questions'],
    ],
  },
  {
    type: 'tf',
    statement: 'The “Risk Factors” section of a 10-K has the highest information density and should be read line by line.',
    answer: false,
    explain: 'Most of it is lawyer-written boilerplate (“macroeconomic conditions may fluctuate”). What’s worth reading are the one or two items added this year — find them by comparing with last year’s version.',
  },
  {
    type: 'fill',
    before: 'Reading a report should answer three questions: Is the business getting better or worse?',
    after: '? What changed in management’s story since last quarter?',
    options: ['Is the money real', 'Is the stock expensive', 'How many employees', 'Where is HQ'],
    correct: 0,
    explain: '“Is the money real” is answered by the cash flow statement and receivables — that’s lesson 3 of this unit.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Read reports with a map',
    body: 'Three lines to take with you:',
    display: 'segments → MD&A → cash flow → footnotes',
    bullets: [
      'Totals can mislead; segments are more honest',
      'In risk factors, read only what’s new',
      'The goal is three answers, not finishing',
    ],
    footer: 'Next lesson: what’s most worth hunting for in MD&A and footnotes?',
  },
];
