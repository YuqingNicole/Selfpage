import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 15 单元第 3 课「认知偏误防身术」。
 * 计算器：现价 $60，你估计公司值 $50。拖动「你的买入价」，账面盈亏会变，持有的预期回报和该做的决定不变。
 * 处置效应：Odean（1998）发现散户卖出的盈利股，之后一年比留下的亏损股多涨约 3.4 个百分点。
 */

const PRICE = 60;
const VALUE = 50;

const costBasis = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '一只股票现价 $60。按你最新的研究，它只值约 $50。拖动「你当初的买入价」，看哪些数字变了、哪些没变。'
    : 'A stock trades at $60. Your latest research says it’s worth about $50. Drag “what you paid” and see which numbers change and which don’t.',
  inputs: [
    { key: 'c', label: zh ? '你当初的买入价' : 'What you paid', min: 30, max: 120, step: 5, start: 60, format: (v) => `$${v}` },
  ],
  outputs: [
    {
      label: zh ? '账面盈亏' : 'Paper gain or loss',
      value: (v) => PRICE / v.c - 1,
      format: (n) => `${n > 0.0005 ? '+' : n < -0.0005 ? '−' : ''}${Math.abs(n * 100).toFixed(0)}%`,
    },
    { label: zh ? '从今天起持有的预期回报' : 'Expected return from holding, from today', value: () => VALUE / PRICE - 1, format: (n) => `−${Math.abs(n * 100).toFixed(0)}%`, main: true },
    { label: zh ? '今天空仓，你会买吗' : 'If you held none today, would you buy', value: () => 0, format: () => (zh ? '不会 → 该卖' : 'No → sell') },
  ],
  visit: { c: [40, 100] },
  explain: zh
    ? '买入价从 $40 拖到 $100，账面从赚 50% 变成亏 40%，可是从今天起持有的预期回报始终是 −17%，该做的决定也始终是卖。成本价是你的私事，市场不知道，也不关心。'
    : 'Drag what you paid from $40 to $100 and the paper result swings from +50% to −40% — but the expected return from holding, starting today, stays at −17%, and the right decision stays “sell”. Your cost basis is your private business; the market doesn’t know or care.',
});

export const i15l3StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个场景',
    title: '「都亏这么多了，现在卖太亏了」',
    body: '自助餐已经吃饱，还硬塞一盘「不然就亏了」——付掉的钱不会因此回来，只会再搭上胃。\n\n这在餐厅里人人都懂。换到股票账户，很多人就看不见了。',
  },
  costBasis(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '四个最贵的偏误',
    body: '它们让人做出同一个错误动作：盯着过去，而不是未来。',
    bullets: [
      '沉没成本：「都亏这么多了，不能卖」',
      '锚定：盯着自己的成本价，而不是公司价值',
      '处置效应：急着卖赚钱的，死扛亏钱的',
      '叙事强化：越持有，越只看得见利好',
    ],
  },
  {
    type: 'match',
    prompt: '把这句话和它背后的偏误对上',
    pairs: [
      ['「等回本我就走」', '锚定'],
      ['「已经投了这么多钱了」', '沉没成本'],
      ['「赚了先落袋，亏的再等等」', '处置效应'],
      ['「利空都是噪音，利好才是信号」', '叙事强化'],
    ],
  },
  {
    type: 'tf',
    statement: '处置效应（急卖盈利、死扛亏损）长期会让组合越来越差。',
    answer: true,
    explain: '正确。研究发现，散户卖掉的盈利股，之后一年比他们留下的亏损股多涨约 3.4 个百分点。彼得·林奇管这叫「拔掉鲜花，浇灌杂草」。',
  },
  {
    type: 'choice',
    question: '偏误该怎么对付？',
    options: ['靠意志力，下次注意', '靠流程绕过去：事先写证伪条件、用机械的检查清单、每月假装空仓重审一次', '少看行情就好', '找人帮你下单'],
    correct: 1,
    explain: '飞行员不靠意志力记住起飞步骤，靠检查单。L4 的内容，本质上就是给投资判断装上检查单。',
  },
  {
    type: 'concept',
    kicker: '第 15 单元 · 完成',
    title: '给自己装上护栏',
    body: '每月对每个持仓问一次：',
    display: '假如今天空仓，按现在的信息，我会买它吗？',
    bullets: [
      '证伪条件：起跳前打包',
      '两种止损：论点和价格各管一边',
      '偏误靠流程绕过，不靠意志力',
    ],
    footer: '下一单元：复盘——把一次次结果变成判断力。',
  },
];

export const i15l3StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A scene',
    title: '“I’m down so much, selling now would be a waste”',
    body: 'You’re full at a buffet, but force down one more plate “or I’m wasting money”. The money doesn’t come back; you just add a stomachache.\n\nEveryone sees this in a restaurant. In a brokerage account, many people stop seeing it.',
  },
  costBasis(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'The four most expensive biases',
    body: 'They all lead to the same mistake: looking at the past instead of the future.',
    bullets: [
      'Sunk cost: “I’ve lost so much, I can’t sell”',
      'Anchoring: fixating on your cost, not the company’s value',
      'Disposition effect: selling winners fast, holding losers',
      'Narrative lock-in: the longer you hold, the more you see only good news',
    ],
  },
  {
    type: 'match',
    prompt: 'Match each line to the bias behind it',
    pairs: [
      ['“I’ll sell once I’m back to even”', 'Anchoring'],
      ['“I’ve already put so much in”', 'Sunk cost'],
      ['“Bank the gains, wait out the losses”', 'Disposition effect'],
      ['“Bad news is noise, good news is signal”', 'Narrative lock-in'],
    ],
  },
  {
    type: 'tf',
    statement: 'Over time, the disposition effect (selling winners fast, holding losers) makes a portfolio steadily worse.',
    answer: true,
    explain: 'True. One study found the winners individual investors sold went on to beat the losers they kept by about 3.4 percentage points over the next year. Peter Lynch called it “pulling the flowers and watering the weeds”.',
  },
  {
    type: 'choice',
    question: 'How do you deal with biases?',
    options: ['Willpower — be careful next time', 'Route around them with process: write disproving conditions in advance, use mechanical checklists, re-decide monthly as if you held nothing', 'Just check prices less', 'Have someone else place trades'],
    correct: 1,
    explain: 'Pilots don’t rely on willpower to remember takeoff steps; they use checklists. L4 is, at heart, a set of checklists for investment judgment.',
  },
  {
    type: 'concept',
    kicker: 'Unit 15 · complete',
    title: 'Guardrails for yourself',
    body: 'Once a month, ask of every holding:',
    display: 'If I held none today, knowing what I know now, would I buy it?',
    bullets: [
      'Disproving conditions: packed before the jump',
      'Two stops: thesis and price, each guarding its side',
      'Beat biases with process, not willpower',
    ],
    footer: 'Next unit: reviews — turning outcomes into judgment.',
  },
];
