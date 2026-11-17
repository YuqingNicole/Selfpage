import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 9 单元第 3 课「反推：从价格倒算市场的假设」。
 * 两个计算器：① 反推 P/E 隐含的利润增速：要在 N 年后回到市场平均 20 倍，利润每年要涨多少；
 * ② 期权隐含波动：股价 $100、平值跨式组合（同时买 Call 和 Put）$8 → 市场预期财报后股价动约 ±8%。
 */

const MARKET_PE = 20;

const reversePe = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '一只股票现在的 P/E 高于市场平均的 20 倍。假设股价不动，利润要每年涨多少，才能在 N 年后让 P/E 回到 20 倍？拖动 P/E 和年数。'
    : 'A stock trades above the market’s average P/E of 20. If the price stays put, how fast must profit grow each year for the P/E to fall back to 20 in N years? Drag the P/E and the years.',
  display: zh ? '利润要涨的倍数 = 当前 P/E ÷ 20' : 'profit must multiply by = current P/E ÷ 20',
  inputs: [
    { key: 'pe', label: zh ? '当前 P/E' : 'Current P/E', min: 20, max: 100, step: 5, start: 40, format: (v) => `${v}×` },
    { key: 'n', label: zh ? '几年内回到 20 倍' : 'Years to get back to 20×', min: 3, max: 10, step: 1, start: 5, format: (v) => (zh ? `${v} 年` : `${v} years`) },
  ],
  outputs: [
    { label: zh ? '利润每年要涨' : 'Required profit growth per year', value: (v) => Math.pow(v.pe / MARKET_PE, 1 / v.n) - 1, format: (n) => `${(n * 100).toFixed(0)}%`, main: true },
    { label: zh ? '利润总共要涨到' : 'Profit must reach', value: (v) => v.pe / MARKET_PE, format: (n) => `${n.toFixed(1)}×` },
  ],
  visit: { pe: [30, 80] },
  explain: zh
    ? '60 倍 P/E、5 年回到 20 倍，意味着利润 5 年涨到 3 倍、每年约 25%。倍数本身没有对错：你要判断的是「这家公司能不能连续五年每年涨 25%」。'
    : 'A 60× P/E returning to 20× in five years means profit tripling — about 25% a year. The multiple itself isn’t right or wrong; what you judge is whether this company can grow 25% a year for five years running.',
});

const impliedMove = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'target',
  prompt: zh
    ? '财报前一天，股价 $100。同时买下当周到期的 $100 Call 和 $100 Put（跨式组合）一共要 $8。市场预期财报后股价会动多少？拖到你的答案。'
    : 'The day before earnings the stock is $100. Buying both the $100 call and the $100 put expiring that week (a straddle) costs $8 in total. How big a move is the market expecting? Drag to your answer.',
  display: zh ? '隐含波动 ≈ 跨式组合价格 ÷ 股价' : 'implied move ≈ straddle price ÷ share price',
  inputs: [{ key: 'move', label: zh ? '你的答案（上下各多少）' : 'Your answer (up or down)', min: 1, max: 20, step: 1, start: 3, format: (v) => `±${v}%` }],
  outputs: [
    { label: zh ? '市场预期的波动' : 'Move the market expects', value: () => 0.08, format: (n) => `±${(n * 100).toFixed(0)}%`, main: true },
    { label: zh ? '股价区间' : 'Price range', value: () => 8, format: (n) => `$${100 - n} – $${100 + n}` },
  ],
  target: { key: 'move', answer: 8, tolerance: 0.5, hideOutputs: true },
  explain: zh
    ? '跨式组合只有在股价上下动超过 $8 时才赚钱，所以它的价格就是市场为这次财报标出的波动：约 ±8%。实际只动 3%，卖波动的人赢；动了 15%，买波动的人赢。期权篇的隐含波动率在这里和预期合流。'
    : 'A straddle only profits if the stock moves more than $8 either way, so its price is the move the market has put on this report: about ±8%. If it moves only 3%, volatility sellers win; if it moves 15%, buyers win. This is where the options track’s implied volatility meets expectations.',
});

export const i9l3StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '换个问题',
    title: '不问「会涨吗」，问「价格在假设什么」',
    body: '一只股票 60 倍 P/E，市场平均 20 倍。有人说太贵，有人说值得。\n\n与其猜它会不会涨，不如先把价格里的假设算出来，再判断你同不同意。',
  },
  {
    type: 'choice',
    question: '面对 60 倍 P/E，「反推」思维的第一步是？',
    options: ['直接判断太贵，卖出', '算出价格隐含的假设（未来几年利润要涨多快），再去找证据检验它', '等它跌到 20 倍', '看别人怎么说'],
    correct: 1,
    explain: '60 倍本身无罪：如果利润三年涨三倍，它就变回 20 倍。判断的对象是「隐含假设 vs 你的证据」。',
  },
  reversePe(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '反推隐含预期',
    body: '价格是一组假设的打包报价：',
    bullets: [
      '高 P/E 隐含的是高增长假设',
      '期权价格隐含的是波动幅度假设',
      '你的工作是判断这些假设靠不靠谱',
    ],
  },
  impliedMove(true),
  {
    type: 'fill',
    before: '期权市场的隐含波动率（IV），本质是市场为未来的',
    after: '开出的报价。',
    options: ['波动幅度', '分红金额', '交易量', '上市天数'],
    correct: 0,
    explain: '财报前 IV 升高 = 市场预期大动作；财报后 IV 骤降 = 不确定性落地。这就是期权篇讲的 IV crush。',
  },
  {
    type: 'choice',
    question: '「它会涨吗？」和「价格假设了什么，我同意吗？」——第二个问题为什么更好？',
    options: ['听起来更专业', '它把判断拆成可以检验的假设和证据，错了也知道错在哪', '因为更复杂', '两个没有区别'],
    correct: 1,
    explain: '能被检验、能复盘的判断才能一次次改进。这一问直接通向 L4：写下投资逻辑、设好证伪条件。',
  },
  {
    type: 'concept',
    kicker: '这一单元你学会了',
    title: '价格里装着预期',
    body: '三课合起来：',
    display: '预期已计价 → 预期差 → 反推假设',
    bullets: [
      '涨跌取决于实际和预期的差',
      '最大的预期差常在指引里',
      '把价格隐含的假设算出来，再判断同不同意',
    ],
    footer: '下一单元：同一份利润，为什么有时值 10 倍、有时值 35 倍？',
  },
];

export const i9l3StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A different question',
    title: 'Not “will it rise?” but “what is the price assuming?”',
    body: 'A stock trades at 60× earnings; the market average is 20×. Some say it’s too expensive, others say it’s worth it.\n\nRather than guess whether it rises, work out the assumption inside the price, then decide whether you agree.',
  },
  {
    type: 'choice',
    question: 'Facing a 60× P/E, the first step of “reverse” thinking is?',
    options: ['Decide it’s too expensive and sell', 'Work out the assumption in the price (how fast profit must grow for years) and look for evidence to test it', 'Wait for it to fall to 20×', 'See what others say'],
    correct: 1,
    explain: '60× isn’t guilty by itself: if profit triples in three years, it’s back to 20×. What you judge is the implied assumption against your evidence.',
  },
  reversePe(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Reverse-engineering implied expectations',
    body: 'A price is a bundle of assumptions with a quote on it:',
    bullets: [
      'A high P/E implies a high-growth assumption',
      'Option prices imply an assumption about the size of moves',
      'Your job is to judge whether those assumptions hold up',
    ],
  },
  impliedMove(false),
  {
    type: 'fill',
    before: 'Implied volatility (IV) in the options market is essentially the market’s quote for the future',
    after: '.',
    options: ['size of moves', 'dividend amount', 'trading volume', 'days since listing'],
    correct: 0,
    explain: 'IV rising before earnings = the market expects a big move; IV collapsing afterwards = the uncertainty is resolved. That’s the IV crush from the options track.',
  },
  {
    type: 'choice',
    question: '“Will it rise?” versus “What does the price assume, and do I agree?” — why is the second better?',
    options: ['It sounds more professional', 'It breaks the judgment into testable assumptions and evidence, so if you’re wrong you know where', 'It’s more complicated', 'There’s no difference'],
    correct: 1,
    explain: 'Only judgments you can test and review can improve over time. This question leads straight into L4: writing down your thesis and setting conditions that would prove it wrong.',
  },
  {
    type: 'concept',
    kicker: 'What you learned this unit',
    title: 'Prices hold expectations',
    body: 'The three lessons together:',
    display: 'priced in → expectation gap → reverse-engineer assumptions',
    bullets: [
      'Moves depend on the gap between actual and expected',
      'The biggest gaps are often in guidance',
      'Work out the assumption in the price, then decide whether you agree',
    ],
    footer: 'Next unit: why is the same profit worth 10× one time and 35× another?',
  },
];
