import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 4 单元第 2 课「P/E 的直觉：倒过来看是收益率」。
 * 先心算市值 $500 亿、净利润 $20 亿的 P/E → 命名 P/E 与盈利收益率 → 拖 P/E 与 4.5% 的国债比 →
 * 低 P/E 陷阱（2021 年航运股）→ P/E 失真（英伟达 2023）。
 */

const TEN_YEAR = 4.5;

const guessPe = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'target',
  prompt: zh
    ? '一家公司市值 $500 亿，一年净利润 $20 亿。你为它每 $1 利润付了多少钱？拖到你算出的倍数。'
    : 'A company has a $50 billion market cap and earns $2 billion a year. How much are you paying per $1 of profit? Drag to your answer.',
  inputs: [
    { key: 'guess', label: zh ? '你算出的倍数' : 'Your multiple', min: 1, max: 60, step: 1, start: 10, format: (v) => `${v}×` },
  ],
  outputs: [
    { label: zh ? '实际 P/E（市值 ÷ 净利润）' : 'Actual P/E (market cap ÷ net profit)', value: () => 25, format: (n) => `${n}×`, main: true },
    { label: zh ? '倒过来：盈利收益率' : 'Flipped: earnings yield', value: () => 4, format: (n) => `${n}%` },
  ],
  target: { key: 'guess', answer: 25, tolerance: 0, hideOutputs: true },
  explain: zh
    ? '$500 亿 ÷ $20 亿 = 25 倍：每 $1 利润，你付了 $25。倒过来，$20 亿 ÷ $500 亿 = 4%，这就是它的「盈利收益率」，可以直接拿去和国债比。'
    : '$50B ÷ $2B = 25×: you pay $25 for each $1 of profit. Flip it — $2B ÷ $50B = 4% — and that’s its “earnings yield”, which you can compare directly with Treasuries.',
});

const peYield = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '十年期国债收益率 4.5%。拖动一只股票的 P/E，看它的盈利收益率和国债比怎么样。'
    : 'The 10-year Treasury yields 4.5%. Drag a stock’s P/E and compare its earnings yield with Treasuries.',
  display: zh ? '盈利收益率 = 1 ÷ P/E' : 'earnings yield = 1 ÷ P/E',
  inputs: [{ key: 'pe', label: 'P/E', min: 5, max: 60, step: 1, start: 25, format: (v) => `${v}×` }],
  outputs: [
    { label: zh ? '盈利收益率' : 'Earnings yield', value: (v) => 100 / v.pe, format: (n) => `${n.toFixed(1)}%`, main: true },
    {
      label: zh ? '比国债（4.5%）' : 'vs. Treasuries (4.5%)',
      value: (v) => 100 / v.pe - TEN_YEAR,
      format: (n) => `${n >= 0 ? '+' : '−'}${Math.abs(n).toFixed(1)}%`,
    },
  ],
  visit: { pe: [10, 40] },
  explain: zh
    ? '25 倍对应 4%，比 4.5% 的国债还低：你愿意这么买，是在为「未来利润会增长」提前付钱。10 倍对应 10%，看起来便宜，但也可能是市场预期利润要下滑。P/E 一定要和增长一起看。'
    : '25× means 4%, below the 4.5% Treasury: paying that is paying upfront for profits you expect to grow. 10× means 10% and looks cheap — but the market may expect profits to fall. Always read P/E together with growth.',
});

export const i4l2StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '25 倍是什么意思',
    title: '「这只股票 25 倍市盈率」，到底贵不贵？',
    body: '新闻里常说某只股票「25 倍市盈率」。这个倍数听起来很抽象。\n\n换个角度看，它其实是一个收益率，可以直接和国债比。',
  },
  guessPe(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: 'P/E 与盈利收益率',
    body: '同一件事，两种说法：',
    display: 'P/E = 市值 ÷ 净利润　　盈利收益率 = 1 ÷ P/E',
    bullets: [
      'P/E（市盈率）：为每 $1 利润付的价格。25 倍 ≈ 不增长的话，静态回本 25 年',
      '盈利收益率：P/E 的倒数。25 倍 → 4%，10 倍 → 10%',
      '把盈利收益率和国债收益率放在一起比，估值就变成了回报',
    ],
  },
  peYield(true),
  {
    type: 'tf',
    statement: '低 P/E 的股票，总是比高 P/E 的更值得买。',
    answer: false,
    explain: '错误。低 P/E 可能是市场在给「利润即将衰退」定价（价值陷阱）。2021 年很多航运股 P/E 只有 2–3 倍，因为市场正确地预判了运价会暴跌。',
  },
  {
    type: 'choice',
    question: '2023 年英伟达的 P/E 一度「看起来」超过 200 倍，但随着数据中心利润爆发，按新的利润算只剩 30 多倍。这说明什么？',
    options: ['P/E 是静态快照，利润剧变时会严重失真——市场买的是明年的利润，不是去年的', 'P/E 200 倍永远是泡沫', '英伟达造假', '估值毫无意义'],
    correct: 0,
    explain: '看 P/E 一定要问：用的是哪一年的利润、能不能持续。用过去的利润给爆发期的成长股估值会闹笑话；用巅峰的利润给周期股估值会被埋。',
  },
  {
    type: 'fill',
    before: 'P/E 的倒数叫盈利收益率：20 倍 P/E 对应约',
    after: '，可以直接和国债收益率比较。',
    options: ['5%', '20%', '2%', '10%'],
    correct: 0,
    explain: '1 ÷ 20 = 5%。这一步换算，就是把「估值」翻译成「回报」。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: 'P/E 倒过来，就是你买到的回报',
    body: '三句话带走：',
    display: '盈利收益率 = 1 ÷ P/E',
    bullets: [
      'P/E = 市值 ÷ 净利润，是为每 $1 利润付的价格',
      '倒过来是盈利收益率，可以直接和国债比',
      '低 P/E 不一定便宜，高 P/E 不一定贵：一定要和增长、利润的可持续性一起看',
    ],
    footer: '下一课：复盘 2022 年——利率是怎么一刀一刀杀估值的。',
  },
];

export const i4l2StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'What does 25× mean?',
    title: '“This stock trades at 25× earnings” — is that expensive?',
    body: 'The news often says a stock trades at “25 times earnings”. The multiple sounds abstract.\n\nLooked at another way, it’s a yield — one you can compare directly with Treasuries.',
  },
  guessPe(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'P/E and earnings yield',
    body: 'The same thing, said two ways:',
    display: 'P/E = market cap ÷ net profit　 earnings yield = 1 ÷ P/E',
    bullets: [
      'P/E (price-to-earnings): what you pay per $1 of profit. 25× ≈ 25 years to earn it back with no growth',
      'Earnings yield: the inverse of P/E. 25× → 4%, 10× → 10%',
      'Put the earnings yield next to the Treasury yield and a valuation becomes a return',
    ],
  },
  peYield(false),
  {
    type: 'tf',
    statement: 'A low-P/E stock is always a better buy than a high-P/E one.',
    answer: false,
    explain: 'False. A low P/E may be the market pricing in a coming profit decline (a value trap). In 2021 many shipping stocks traded at 2–3× earnings because the market correctly expected freight rates to collapse.',
  },
  {
    type: 'choice',
    question: 'In 2023 Nvidia’s P/E briefly “looked” above 200×, but as data center profits exploded it fell to the 30s on the new profits. What does that show?',
    options: ['P/E is a static snapshot that distorts badly when profits change sharply — the market buys next year’s earnings, not last year’s', '200× is always a bubble', 'Nvidia committed fraud', 'Valuation is meaningless'],
    correct: 0,
    explain: 'Always ask which year’s earnings a P/E uses, and whether they last. Valuing a breakout growth stock on past earnings is a joke; valuing a cyclical stock on peak earnings will bury you.',
  },
  {
    type: 'fill',
    before: 'The inverse of P/E is the earnings yield: a 20× P/E is about',
    after: ', directly comparable with Treasury yields.',
    options: ['5%', '20%', '2%', '10%'],
    correct: 0,
    explain: '1 ÷ 20 = 5%. That conversion translates a “valuation” into a “return”.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Flip the P/E and you see the return you’re buying',
    body: 'Three lines to take with you:',
    display: 'earnings yield = 1 ÷ P/E',
    bullets: [
      'P/E = market cap ÷ net profit: the price per $1 of profit',
      'Flipped, it’s the earnings yield, directly comparable with Treasuries',
      'Low P/E isn’t always cheap and high P/E isn’t always pricey: read it with growth and how durable the profits are',
    ],
    footer: 'Next lesson: a replay of 2022 — how rising rates cut valuations down step by step.',
  },
];
