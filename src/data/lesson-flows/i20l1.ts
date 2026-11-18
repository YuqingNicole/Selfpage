import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 20 单元第 1 课「消费分层：谁在降级，谁在升级」。
 * 可口可乐 2022 年（近似）：价格与产品组合 +11%，浓缩液销量 +5%，内生收入增长约 16%。
 */

const PRICE = 11;
const VOL = 5;

const coke = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'target',
  prompt: zh
    ? '2022 年通胀高企，可口可乐提价约 11%，销量不降反升约 5%。收入大约增长多少？先心算，再拖到你的答案。'
    : 'In 2022, with inflation high, Coca-Cola raised prices about 11% and volume still rose about 5%. Roughly how much did revenue grow? Work it out, then drag to your answer.',
  display: zh ? '收入增长 = (1 + 提价) × (1 + 销量变化) − 1' : 'revenue growth = (1 + price) × (1 + volume) − 1',
  inputs: [{ key: 'x', label: zh ? '你的答案' : 'Your answer', min: 0, max: 30, step: 0.5, start: 6, format: (v) => `+${v}%` }],
  outputs: [{ label: zh ? '实际增长' : 'Actual growth', value: () => ((1 + PRICE / 100) * (1 + VOL / 100) - 1) * 100, format: (n) => `+${n.toFixed(1)}%`, main: true }],
  target: { key: 'x', answer: 16.5, tolerance: 1.5, hideOutputs: true },
  explain: zh
    ? '1.11 × 1.05 ≈ 1.166，收入约 +16%，和可口可乐当年报告的内生增长对得上。涨价之后销量还在涨，这就是提价权：品牌护城河在财报上的显影。提价就掉量的「品牌」，只是一个商标。'
    : '1.11 × 1.05 ≈ 1.166, so revenue up about 16% — matching the organic growth Coca-Cola reported that year. Volume still rising after a price increase is pricing power: a brand’s moat showing up in the financials. A “brand” that loses volume every time it raises prices is just a trademark.',
});

export const i20l1StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一张餐桌',
    title: '同一顿饭里的三种消费',
    body: '经济降温时，一个家庭的外卖从 30 元降到 15 元，厨房里的酱油还是买那个牌子，过节时长辈的茅台照喝。\n\n同一张餐桌上，三种消费逻辑同时存在。',
  },
  {
    type: 'concept',
    kicker: '起个名字',
    title: '消费分层',
    body: '消费股先切一刀：',
    bullets: [
      '必需消费：食品、日用，需求刚性，对周期迟钝',
      '可选消费：奢侈品、旅游，跟着收入预期和财富效应走',
      '哑铃形：性价比和顶级品牌两头通吃，中间最受挤压',
      '人口结构：最慢、也最强的变量，决定十年方向',
    ],
  },
  {
    type: 'choice',
    question: '2020–23 年，拼多多用户和市值暴涨，爱马仕屡创新高，大量中端品牌陷入困境。这说明？',
    options: ['消费全面复苏', '哑铃化：极致性价比和顶级奢侈两端都在赢，不上不下的中间被挤压', '奢侈品要崩了', '纯属巧合'],
    correct: 1,
    explain: '分析消费股先问：它站在哑铃的哪一端，还是危险的中间？',
  },
  coke(true),
  {
    type: 'fill',
    before: '消费公司品牌力最硬的证据：通胀时敢',
    after: '，而且销量不掉。',
    options: ['提价', '打折', '换包装', '加广告'],
    correct: 0,
    explain: '提价权是第 2 单元毛利率、第 6 单元量价拆解在消费行业的落点。',
  },
  {
    type: 'tf',
    statement: '人口结构（老龄化、少子化）不会制造季度行情，但决定消费赛道的十年方向。',
    answer: true,
    explain: '正确。日本三十年里，便利店、药妆、宠物起飞，婚庆、母婴萎缩，剧本几乎都由人口结构提前写好。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '看懂一张餐桌',
    body: '三句话带走：',
    display: '必需 vs 可选 · 哑铃两端 · 提价权',
    bullets: [
      '先分清必需和可选',
      '站在哑铃两端，别站中间',
      '提价不掉量，才是真品牌',
    ],
    footer: '下一课：医药行业的时钟，为什么和别的行业不一样？',
  },
];

export const i20l1StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A dinner table',
    title: 'Three kinds of spending at one meal',
    body: 'As the economy cools, a family trades down from ¥30 takeout to ¥15, keeps buying the same soy sauce, and the grandparents still open the good baijiu on holidays.\n\nOne table, three spending logics at once.',
  },
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Consumer tiers',
    body: 'The first cut for consumer stocks:',
    bullets: [
      'Staples: food and household goods — steady demand, slow to feel cycles',
      'Discretionary: luxury, travel — tied to income expectations and wealth effects',
      'The barbell: value and top luxury both win; the middle gets squeezed',
      'Demographics: the slowest and strongest variable, setting the ten-year direction',
    ],
  },
  {
    type: 'choice',
    question: 'In 2020–23, Pinduoduo’s users and market cap soared, Hermès kept hitting highs, and many mid-market brands struggled. What does that show?',
    options: ['A broad consumer recovery', 'A barbell: rock-bottom value and top luxury both winning, with the in-between squeezed', 'Luxury is about to collapse', 'Pure coincidence'],
    correct: 1,
    explain: 'With any consumer stock, first ask: which end of the barbell is it on — or is it in the dangerous middle?',
  },
  coke(false),
  {
    type: 'fill',
    before: 'The hardest evidence of a consumer brand’s strength: daring to',
    after: 'during inflation without losing volume.',
    options: ['raise prices', 'discount', 'repackage', 'advertise more'],
    correct: 0,
    explain: 'Pricing power is where Unit 2’s gross margins and Unit 6’s price-times-volume land in consumer businesses.',
  },
  {
    type: 'tf',
    statement: 'Demographics (aging, fewer births) don’t move stocks quarter to quarter, but they set the ten-year direction of consumer categories.',
    answer: true,
    explain: 'True. Over thirty years in Japan, convenience stores, drugstores and pets took off while weddings and baby products shrank — a script written in advance by demographics.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Read the dinner table',
    body: 'Three lines to take with you:',
    display: 'staples vs discretionary · barbell ends · pricing power',
    bullets: [
      'Separate staples from discretionary first',
      'Stand at an end of the barbell, not the middle',
      'A real brand raises prices without losing volume',
    ],
    footer: 'Next lesson: why does healthcare run on a different clock?',
  },
];
