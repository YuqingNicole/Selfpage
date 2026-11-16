import type { LessonStep } from '../optionsCourse';
import { usdEn, usdZh } from './fmt';

/**
 * 投资主线 第 3 单元第 1 课「利润不是现金」。
 * 第 3 单元以亚马逊为主线（近似值）：2015 年净利润约 $6 亿、经营现金流约 $120 亿；
 * 2023 年经营现金流约 $850 亿、资本开支约 $480 亿；2024 年资本开支约 $830 亿。
 * 本课的计算器用一家虚构的经销商演示「利润好看、现金流失」。
 */

const NI = 1e9;
const DEP = 0.2e9;

const bridge = (zh: boolean): LessonStep => {
  const f = zh ? usdZh : usdEn;
  return {
    type: 'calc',
    mode: 'explore',
    prompt: zh
      ? '一家经销商今年净利润 $10 亿（另有 $2 亿折旧，不花现金）。拖动应收账款和库存的增加额，看经营现金流。'
      : 'A distributor earned $1 billion of net profit this year (plus $200 million of non-cash depreciation). Drag the increases in receivables and inventory and watch operating cash flow.',
    display: zh ? '经营现金流 ≈ 净利润 + 折旧 − 应收增加 − 库存增加' : 'operating cash flow ≈ net profit + depreciation − rise in receivables − rise in inventory',
    inputs: [
      { key: 'ni', label: zh ? '净利润' : 'Net profit', min: NI, max: NI, step: 1, start: NI, fixed: true, format: (v) => f(v) },
      {
        key: 'ar',
        label: zh ? '应收账款增加（赊销没收回的钱）' : 'Rise in receivables (sales not yet collected)',
        min: 0,
        max: 1.5e9,
        step: 0.05e9,
        start: 0,
        format: (v) => f(v),
      },
      {
        key: 'inv',
        label: zh ? '库存增加（压在仓库里的钱）' : 'Rise in inventory (cash sitting in the warehouse)',
        min: 0,
        max: 1e9,
        step: 0.05e9,
        start: 0,
        format: (v) => f(v),
      },
    ],
    outputs: [
      { label: zh ? '经营现金流' : 'Operating cash flow', value: (v) => v.ni + DEP - v.ar - v.inv, format: (n) => f(n), main: true },
      {
        label: zh ? '现金 ÷ 利润' : 'Cash ÷ profit',
        value: (v) => (v.ni + DEP - v.ar - v.inv) / v.ni,
        format: (n) => `${n < 0 ? '−' : ''}${Math.abs(n).toFixed(2)}×`,
      },
    ],
    visit: { ar: [0, 1e9], inv: [0, 0.8e9] },
    explain: zh
      ? '应收多了 $10 亿、库存多了 $8 亿：利润表上照样赚 $10 亿，银行账户却流出了 $6 亿。利润好看、现金在流失——历史上很多财务暴雷之前都长这样。'
      : 'Receivables up $1 billion and inventory up $800 million: the income statement still shows a $1 billion profit, while $600 million actually left the bank. Pretty profit, draining cash — many accounting blow-ups looked like this beforehand.',
  };
};

export const i3l1StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个反差',
    title: '利润 $6 亿，现金 $120 亿',
    body: '2015 年，亚马逊净利润只有约 $6 亿，净利率不到 1%。可它的经营现金流约有 $120 亿，是利润的 20 倍。\n\n另一些公司正好相反：利润年年漂亮，账上却越来越缺钱。',
  },
  {
    type: 'choice',
    question: '利润和现金为什么会差这么多？',
    options: ['会计算错了', '利润按「记账」算，现金按「到账」算，两者时间点不同', '现金流把股价上涨也算进去了', '只是四舍五入的差异'],
    correct: 1,
    explain: '收入一确认，利润就记上了，不管钱到没到；现金流只看钱有没有真的进出银行账户。',
  },
  {
    type: 'concept',
    kicker: '起个名字',
    title: '利润 vs 经营现金流',
    body: '两张报表，回答两个不同的问题：',
    display: '利润是观点，现金是事实',
    bullets: [
      '利润：收入确认就记账，有大量估计和选择空间',
      '经营现金流：钱真正进出银行账户，很难粉饰',
      '常见缺口：赊销（应收账款）、囤货（库存）、折旧（记了费用但不花现金）',
    ],
  },
  bridge(true),
  {
    type: 'choice',
    question: '一家公司净利润连续三年增长，但经营现金流始终只有净利润的一半，应收账款越滚越大。最合理的解读是？',
    options: ['业务蒸蒸日上', '收入质量存疑：钱可能只是记在账上，没有真正收回来', '公司在避税', '现金流不重要，看利润就够'],
    correct: 1,
    explain: '利润和现金长期背离、再加上应收账款膨胀，是收入质量恶化的经典组合。',
  },
  {
    type: 'tf',
    statement: '亚马逊 2010 年代净利率常年只有 1–3%，说明它当时是门差生意。',
    answer: false,
    explain: '错误。它的经营现金流一直很强，利润低是因为赚到的钱立刻投进物流和 AWS。现金流量表常常比利润表更诚实。',
  },
  {
    type: 'choice',
    question: '以下哪种情况，会让一家公司「利润好看、现金紧张」？',
    options: ['客户全部现款现货', '大量赊销给经销商，同时囤了半年的库存', '提前收到了全年订阅费', '刚完成一轮增发'],
    correct: 1,
    explain: '赊销让收入先到、现金后到；囤货把现金变成仓库里的箱子。这两件事在利润表上都看不出来。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '看利润，也要看钱到没到',
    body: '三句话带走：',
    display: '利润是观点，现金是事实',
    bullets: [
      '利润按记账算，现金按到账算',
      '应收和库存膨胀，会让利润好看、现金流失',
      '利润和现金长期背离，是收入质量的警报',
    ],
    footer: '下一课：扣掉必须的投资之后，股东真正能拿到的钱——自由现金流。',
  },
];

export const i3l1StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A contrast',
    title: '$600 million of profit, $12 billion of cash',
    body: 'In 2015 Amazon earned only about $600 million, a net margin under 1%. Yet its operating cash flow was about $12 billion — 20 times its profit.\n\nOther companies are the opposite: pretty profits every year, and less and less cash in the bank.',
  },
  {
    type: 'choice',
    question: 'Why can profit and cash differ so much?',
    options: ['Accounting errors', 'Profit counts what’s booked; cash counts what’s received — at different times', 'Cash flow includes share price gains', 'Just rounding'],
    correct: 1,
    explain: 'Profit is recorded as soon as revenue is recognized, whether or not the money has arrived; cash flow only counts money actually moving in and out of the bank.',
  },
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Profit vs operating cash flow',
    body: 'Two statements, two different questions:',
    display: 'profit is an opinion; cash is a fact',
    bullets: [
      'Profit: booked when revenue is recognized, with lots of room for estimates and choices',
      'Operating cash flow: money actually moving through the bank — hard to dress up',
      'Common gaps: credit sales (receivables), stockpiling (inventory), depreciation (an expense with no cash out)',
    ],
  },
  bridge(false),
  {
    type: 'choice',
    question: 'A company’s net profit grows three years running, but operating cash flow stays at half of profit and receivables keep piling up. What’s the most sensible reading?',
    options: ['Business is booming', 'Revenue quality is in doubt: the money may only be on the books, not actually collected', 'It’s avoiding tax', 'Cash flow doesn’t matter — profit is enough'],
    correct: 1,
    explain: 'Profit and cash diverging for years, plus swelling receivables, is the classic sign of deteriorating revenue quality.',
  },
  {
    type: 'tf',
    statement: 'Amazon’s 1–3% net margins through the 2010s show it was a bad business back then.',
    answer: false,
    explain: 'False. Its operating cash flow was strong throughout; profit was low because it poured the money straight into logistics and AWS. The cash flow statement is often more honest than the income statement.',
  },
  {
    type: 'choice',
    question: 'Which situation leaves a company with “pretty profit, tight cash”?',
    options: ['Every customer pays cash on delivery', 'Heavy credit sales to distributors, plus six months of stockpiled inventory', 'A full year of subscriptions collected upfront', 'A fresh share issuance'],
    correct: 1,
    explain: 'Credit sales bring revenue first and cash later; stockpiling turns cash into boxes in a warehouse. Neither shows up on the income statement.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Check profit — and whether the money arrived',
    body: 'Three lines to take with you:',
    display: 'profit is an opinion; cash is a fact',
    bullets: [
      'Profit counts what’s booked; cash counts what’s received',
      'Swelling receivables and inventory make profit look good while cash drains',
      'Profit and cash diverging for years is a revenue-quality alarm',
    ],
    footer: 'Next lesson: after the investment a business needs, the money shareholders can actually have — free cash flow.',
  },
];
