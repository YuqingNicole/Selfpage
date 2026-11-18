import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 13 单元第 3 课「三表互验：让报表互相测谎」。
 * 康美药业（近似值）：账上现金和有息负债同时高达数百亿元（「存贷双高」）；
 * 2019 年公司自曝 2017 年多记货币资金约 ¥300 亿。
 * 计算器按现金约 ¥300 亿、有息负债约 ¥300 亿、借款利率约 6%、存款利率约 1.5% 估算。
 */

const RATE_GAP = 6 - 1.5;
const BOTH = 300;

const cashDebt = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'target',
  prompt: zh
    ? '一家公司账上约 ¥300 亿现金，同时借着约 ¥300 亿有息负债。借款利率约 6%，存款利息约 1.5%。如果现金是真的，它每年白白损失多少利差？先心算，再拖到你的答案。'
    : 'A company shows about ¥30B in cash while carrying about ¥30B of interest-bearing debt. It borrows at about 6% and earns about 1.5% on deposits. If the cash is real, how much does it throw away in interest spread each year? Work it out, then drag to your answer.',
  display: zh ? '利差损失 = 300 亿 × (6% − 1.5%)' : 'spread lost = ¥30B × (6% − 1.5%)',
  inputs: [{ key: 'x', label: zh ? '你的答案（亿元 / 年）' : 'Your answer (¥ billions / year)', min: 0, max: 40, step: 0.5, start: 5, format: (v) => (zh ? `¥${v} 亿` : `¥${(v / 10).toFixed(2)}B`) }],
  outputs: [
    { label: zh ? '实际每年损失' : 'Actual loss per year', value: () => (BOTH * RATE_GAP) / 100, format: (n) => (zh ? `¥${n} 亿` : `¥${(n / 10).toFixed(2)}B`), main: true },
  ],
  target: { key: 'x', answer: 13.5, tolerance: 2, hideOutputs: true },
  explain: zh
    ? '300 亿 × 4.5% ≈ ¥13.5 亿，每年。真有这么多闲钱，最合理的做法是先还债。不还，最合理的怀疑是：现金是假的、被质押了，或者被大股东占用了。2019 年，康美药业自曝 2017 年多记了约 ¥300 亿现金。'
    : '¥30B × 4.5% ≈ ¥1.35B, every year. With that much idle cash, the sensible move is to repay the debt. Not doing so raises the obvious suspicion: the cash is fake, pledged, or being used by the controlling shareholder. In 2019 Kangmei Pharmaceutical admitted it had overstated 2017 cash by about ¥30B.',
});

export const i13l3StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个案子',
    title: '「钱很多，还在借钱」',
    body: '2018 年前后，A 股的康美药业账上躺着几百亿现金，同时也借着几百亿的债，还在继续发债。\n\n先算一笔账：如果现金是真的，这样做划算吗？',
  },
  cashDebt(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '三表互验',
    body: '三张报表说的是同一家公司，故事必须对得上：',
    display: '利润表赚了钱 → 现金流量表收到钱 → 资产负债表变厚',
    bullets: [
      '利润涨、经营现金流不涨：查应收账款和存货',
      '现金多、借款也多（存贷双高）：查现金是否受限',
      '单张表可以化妆，三张表很难同时化妆',
    ],
  },
  {
    type: 'choice',
    question: '读这张对账卡。最该先查哪里？',
    display: '年份：2021 → 2022 → 2023\n净利润：10 → 14 → 19\n经营现金流：9 → 8 → 7\n应收账款：20 → 32 → 48',
    options: ['一切正常，利润在增长', '利润三年接近翻倍，经营现金流却在下降，应收账款涨了一倍多：先查收入是不是赊出来的', '经营现金流不重要', '应收增加说明客户多了，是好事'],
    correct: 1,
    explain: '利润和现金长期背离、应收膨胀，是收入质量的头号警报。第 8 单元 SMCI 的应收周转天数，就是这条对账线的一个实例。',
  },
  {
    type: 'fill',
    before: '三表互验的第一组对账：利润表的净利润，对照现金流量表的',
    after: '。',
    options: ['经营现金流', '筹资现金流', '汇率影响', '投资收益'],
    correct: 0,
    explain: '净利润是会计算出来的，经营现金流是真收到的钱。两者偶尔背离很正常，连续几年背离就要追问。',
  },
  {
    type: 'tf',
    statement: '对账清单越机械越好，因为机械的清单不会被公司讲的故事打动。',
    answer: true,
    explain: '正确。读故事会被故事带走，对数字不会。每季用同一张清单，读十家公司后，你对异常的嗅觉会明显变快。',
  },
  {
    type: 'concept',
    kicker: '第 13 单元 · 完成',
    title: '20 分钟读财报',
    body: '把三课合成一张动作清单：',
    display: '分部 → MD&A 差异 → 利润对现金 → 债务与收入脚注',
    bullets: [
      '先看结构，再听解释',
      '让报表互相对质',
      '异常的地方才值得逐行细读',
    ],
    footer: '下一单元：读完财报之后，把你的判断写成一句话。',
  },
];

export const i13l3StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A case',
    title: '“Lots of cash, still borrowing”',
    body: 'Around 2018, China’s Kangmei Pharmaceutical reported tens of billions of yuan in cash — while also carrying tens of billions in debt, and still issuing more.\n\nFirst, run the numbers: if the cash is real, does that make sense?',
  },
  cashDebt(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Cross-checking the three statements',
    body: 'All three statements describe one company, so their stories must match:',
    display: 'income statement earns → cash flow collects → balance sheet grows',
    bullets: [
      'Profit up, operating cash flow flat: check receivables and inventory',
      'High cash and high borrowing: check whether the cash is restricted',
      'One statement can wear makeup; all three at once is much harder',
    ],
  },
  {
    type: 'choice',
    question: 'Read this reconciliation card. Where do you look first?',
    display: 'Year: 2021 → 2022 → 2023\nNet income: 10 → 14 → 19\nOperating cash flow: 9 → 8 → 7\nReceivables: 20 → 32 → 48',
    options: ['All fine — profit is growing', 'Profit nearly doubled in three years, operating cash flow fell, and receivables more than doubled: check whether revenue is being sold on credit', 'Operating cash flow doesn’t matter', 'More receivables means more customers — good'],
    correct: 1,
    explain: 'Profit and cash diverging for years while receivables balloon is the top warning sign for revenue quality. SMCI’s days sales outstanding in Unit 8 was one example of this check.',
  },
  {
    type: 'fill',
    before: 'The first cross-check: net income on the income statement versus',
    after: 'on the cash flow statement.',
    options: ['operating cash flow', 'financing cash flow', 'currency effects', 'investment income'],
    correct: 0,
    explain: 'Net income is an accounting calculation; operating cash flow is money actually received. An occasional gap is normal; years of it deserve questions.',
  },
  {
    type: 'tf',
    statement: 'The more mechanical your reconciliation checklist, the better — a mechanical checklist isn’t swayed by the company’s story.',
    answer: true,
    explain: 'True. Stories carry you away; numbers don’t. Use the same checklist every quarter, and after ten companies your nose for anomalies gets noticeably faster.',
  },
  {
    type: 'concept',
    kicker: 'Unit 13 · complete',
    title: 'A 20-minute report read',
    body: 'Three lessons in one action list:',
    display: 'segments → MD&A diff → profit vs cash → debt & revenue notes',
    bullets: [
      'Structure first, explanations second',
      'Make the statements testify against each other',
      'Only anomalies deserve line-by-line reading',
    ],
    footer: 'Next unit: after reading the report, write your judgment in one sentence.',
  },
];
