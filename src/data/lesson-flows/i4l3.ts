import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 4 单元第 3 课「实景复盘：2022 利率杀估值」。
 * 2022 年 CPI 峰值 9.1%，联储一年加息 4.25 个百分点；纳指约 −33%，ARKK 约 −67%，能源股大涨。
 * 计算器：两张欠条（1 年后 / 10 年后还 $100），拖利率看现值——「久期」的直觉。
 */

const ious = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '两张欠条：A 一年后还你 $100，B 十年后还你 $100。拖动利率，看它们今天各值多少。'
    : 'Two IOUs: A pays you $100 in one year, B pays you $100 in ten years. Drag the interest rate and see what each is worth today.',
  display: zh ? '今天的价值 = $100 ÷ (1 + 利率)^年数' : 'value today = $100 ÷ (1 + rate)^years',
  inputs: [
    { key: 'r', label: zh ? '利率' : 'Interest rate', min: 0.5, max: 6, step: 0.1, start: 1, format: (v) => `${v.toFixed(1)}%` },
  ],
  outputs: [
    { label: zh ? 'A：一年后的 $100' : 'A: $100 in 1 year', value: (v) => 100 / (1 + v.r / 100), format: (n) => `$${n.toFixed(1)}` },
    { label: zh ? 'B：十年后的 $100' : 'B: $100 in 10 years', value: (v) => 100 / Math.pow(1 + v.r / 100, 10), format: (n) => `$${n.toFixed(1)}`, main: true },
    {
      label: zh ? 'B 相比利率 1% 时' : 'B vs. at 1%',
      value: (v) => 100 / Math.pow(1 + v.r / 100, 10) / (100 / Math.pow(1.01, 10)) - 1,
      format: (n) => `${n >= 0 ? '+' : '−'}${Math.abs(n * 100).toFixed(0)}%`,
    },
  ],
  visit: { r: [1, 5] },
  explain: zh
    ? '利率从 1% 涨到 5%：一年后的欠条只从 $99.0 跌到 $95.2；十年后的欠条却从 $90.5 跌到 $61.4，跌了三分之一。钱来得越晚，对利率越敏感——这叫「久期」。还在亏损、指望十年后赚大钱的成长股，就是那张十年后的欠条。'
    : 'Rates from 1% to 5%: the one-year IOU only slips from $99.0 to $95.2, but the ten-year IOU drops from $90.5 to $61.4 — a third gone. The later the money arrives, the more sensitive it is to rates: that’s “duration”. A loss-making growth stock betting on big profits in ten years is the ten-year IOU.',
});

export const i4l3StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '2022 年发生了什么',
    title: '同一年，有人跌 67%，有人大涨',
    body: '2022 年，美国通胀（CPI）一度达到 9.1%，美联储一年加息 4.25 个百分点，是四十年来最陡的一次。\n\n结果：纳斯达克跌约 33%，ARK 创新基金跌约 67%，能源股却大涨。同样的加息，为什么伤害差这么多？',
  },
  ious(true),
  {
    type: 'choice',
    question: '2022 年，为什么亏损的高成长科技股（比如 ARK 的持仓，−67%）比赚钱的价值股跌得惨得多？',
    options: ['成长股公司的经营全面恶化', '它们的价值几乎全押在遥远未来的利润上，利率上升时，远期现金流缩水最狠', '基金经理集体失误', '纯属巧合'],
    correct: 1,
    explain: '就是那张十年后的欠条：现金流越靠后，对利率越敏感。同样加息，现在就赚钱的公司折损小得多。',
  },
  {
    type: 'tf',
    statement: '2022 年纳指跌 33%，主要是因为成分股的利润集体下降了三分之一。',
    answer: false,
    explain: '错误。多数巨头当年利润基本平稳，跌的是估值倍数：市场愿意为同样的利润付的价格，从 30 倍变成了 20 倍。分清「杀估值」和「杀业绩」，是复盘的基本功。',
  },
  {
    type: 'match',
    prompt: '把 2022 年的资产表现和背后的逻辑对上',
    pairs: [
      ['亏损成长股 −60% 以上', '现金流全在远期，对利率最敏感'],
      ['纳指 −33%', '估值倍数整体压缩'],
      ['能源股大涨', '通胀本身就是它的收入'],
      ['短期国债', '加息时的避风港'],
    ],
  },
  {
    type: 'choice',
    question: '把 2022 年的教训变成前瞻框架：当市场开始预期「利率会长期维持高位」，你首先检查持仓里的什么？',
    options: ['公司 logo 好不好看', '哪些持仓的价值依赖遥远未来的利润、当下又不赚钱——它们对利率最敏感', '员工人数', '上市时间长短'],
    correct: 1,
    explain: '先分层，再决策：哪些是「现在就赚钱」，哪些是「故事在十年后」。这个检查动作本身，就是判断框架的开始。',
  },
  {
    type: 'concept',
    kicker: 'L1 完成',
    title: '你已经能读懂市场的基本语言',
    body: '这一单元，以及整个 L1，压缩成四句话：',
    bullets: [
      '股价不等于贵贱，市值才是整家公司的标价；股数会因回购和稀释而变',
      '利润分四层，现金比利润更诚实，自由现金流是股东真正能分的钱',
      '利率是估值的地心引力：P/E 倒过来就是收益率，要和国债比',
      '钱来得越晚，对利率越敏感：2022 年杀的是估值，不是业绩',
    ],
    footer: '下一层 L2：看懂公司——商业模式、增长从哪来、关键指标。',
  },
];

export const i4l3StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'What happened in 2022',
    title: 'Same year: some fell 67%, some soared',
    body: 'In 2022 US inflation (CPI) hit 9.1% and the Fed raised rates 4.25 percentage points in a year — the steepest in four decades.\n\nThe result: the Nasdaq fell about 33%, the ARK Innovation fund about 67%, while energy stocks soared. Same rate hikes — why such different damage?',
  },
  ious(false),
  {
    type: 'choice',
    question: 'In 2022, why did loss-making high-growth tech stocks (like ARK’s holdings, −67%) fall so much harder than profitable value stocks?',
    options: ['Their businesses all collapsed', 'Their value rested almost entirely on profits far in the future, and distant cash flows shrink most when rates rise', 'Fund managers all blundered', 'Pure coincidence'],
    correct: 1,
    explain: 'It’s the ten-year IOU: the later the cash flows, the more rate-sensitive. The same hikes did far less damage to companies already making money.',
  },
  {
    type: 'tf',
    statement: 'The Nasdaq fell 33% in 2022 mainly because its members’ profits dropped by a third.',
    answer: false,
    explain: 'False. Most giants’ profits were roughly flat that year; what fell was the multiple — the price paid for the same profits went from 30× to 20×. Telling multiple compression from earnings collapse is basic post-mortem skill.',
  },
  {
    type: 'match',
    prompt: 'Match each 2022 performance to the logic behind it',
    pairs: [
      ['Loss-making growth stocks −60%+', 'All cash flow far away, most rate-sensitive'],
      ['Nasdaq −33%', 'Valuation multiples compressed across the board'],
      ['Energy stocks soar', 'Inflation is their revenue'],
      ['Short-term Treasuries', 'A safe harbor during hikes'],
    ],
  },
  {
    type: 'choice',
    question: 'Turn 2022’s lesson into a forward-looking habit: when the market starts expecting rates to stay high for a long time, what do you check first in your portfolio?',
    options: ['Whether the logos look nice', 'Which holdings depend on profits far in the future and don’t make money now — they’re the most rate-sensitive', 'Employee counts', 'How long they’ve been listed'],
    correct: 1,
    explain: 'Sort first, then decide: which holdings make money now, and which are stories set ten years out. That check is where a judgment framework starts.',
  },
  {
    type: 'concept',
    kicker: 'L1 complete',
    title: 'You can now read the market’s basic language',
    body: 'This unit, and all of L1, in four lines:',
    bullets: [
      'A share price isn’t cheap or dear; market cap prices the whole company, and buybacks and dilution change the share count',
      'Profit has four floors, cash is more honest than profit, and free cash flow is what shareholders can really share',
      'Rates are valuation’s gravity: flip a P/E into a yield and compare it with Treasuries',
      'The later the money arrives, the more rate-sensitive it is: 2022 cut valuations, not earnings',
    ],
    footer: 'Next, L2: understanding companies — business models, where growth comes from, key metrics.',
  },
];
