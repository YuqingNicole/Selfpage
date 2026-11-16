import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 4 单元第 1 课「无风险利率是所有资产的标尺」。
 * 第 4 单元围绕 2020–2023 年的利率变化：十年期美债收益率从不到 1% 升到接近 5%，2022 年联储一年加息 4.25 个百分点。
 * 计算器：一份每年 $4 的永续现金流，要求回报 = 无风险利率 + 3% 风险溢价，拖利率看价格。
 */

const PREMIUM = 3;

const anchor = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '一份资产每年稳定给你 $4，永远不变。你要求的回报 = 国债收益率 + 3% 的风险补偿。拖动国债收益率，看你愿意为它出多少钱。'
    : 'An asset pays you a steady $4 a year, forever. The return you require = the Treasury yield + a 3% risk premium. Drag the Treasury yield and see what you’d pay for it.',
  display: zh ? '价格 = 每年现金流 ÷ 要求回报' : 'price = annual cash flow ÷ required return',
  inputs: [
    {
      key: 'rf',
      label: zh ? '国债收益率（无风险利率）' : 'Treasury yield (risk-free rate)',
      min: 0.5,
      max: 6,
      step: 0.1,
      start: 1,
      format: (v) => `${v.toFixed(1)}%`,
    },
  ],
  outputs: [
    { label: zh ? '你要求的回报' : 'Your required return', value: (v) => v.rf + PREMIUM, format: (n) => `${n.toFixed(1)}%` },
    { label: zh ? '你愿意出的价格' : 'What you’d pay', value: (v) => 4 / ((v.rf + PREMIUM) / 100), format: (n) => `$${n.toFixed(0)}`, main: true },
  ],
  visit: { rf: [1, 5] },
  explain: zh
    ? '国债收益率从 1% 涨到 5%，同样每年 $4 的现金流，你愿意出的价格从 $100 掉到 $50。资产本身没变，变的是「躺着就能拿到的回报」。'
    : 'As the Treasury yield rises from 1% to 5%, what you’d pay for the same $4 a year falls from $100 to $50. The asset didn’t change — the return you can get for doing nothing did.',
});

export const i4l1StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '躺着就能拿的回报',
    title: '国债给 5% 时，股票凭什么只给 4%？',
    body: '2020 年，美国十年期国债收益率不到 1%；到 2023 年，一度接近 5%。\n\n同一只股票、同样的利润，在这两个年份里，你愿意出的价格一样吗？',
  },
  {
    type: 'choice',
    question: '十年期美债收益率从 1% 升到 5%。对股票整体估值，方向上会有什么影响？',
    options: ['没有影响：债是债，股是股', '压低估值：无风险回报变高，股票必须便宜到回报更有吸引力才有人买', '推高估值：说明经济好', '只影响银行股'],
    correct: 1,
    explain: '所有资产都在和无风险利率争夺资金。国债给得越多，股票就得越便宜才有人要。',
  },
  {
    type: 'concept',
    kicker: '起个名字',
    title: '无风险利率：所有资产的标尺',
    body: '分析任何投资的第一个问题：比国债多赚的部分，够不够补偿多承担的风险？',
    bullets: [
      '美国国债收益率被视为「无风险利率」：几乎不承担风险就能拿到的回报',
      '所有投资都在和它比较',
      '巴菲特：利率之于资产价格，就像地心引力之于物体',
    ],
  },
  anchor(true),
  {
    type: 'tf',
    statement: '「无风险利率」通常指美国国债收益率，因为美国政府的违约风险被认为极低。',
    answer: true,
    explain: '正确。它是全球资产定价的锚。',
  },
  {
    type: 'choice',
    question: '2022 年美联储把利率从接近 0 加到 4% 以上，纳斯达克跌了约 33%。最主要的传导机制是？',
    options: ['公司集体倒闭', '要求回报上升，市场愿意为每 $1 利润付的价格下降；利润越在遥远未来的公司伤得越重', '投资者情绪不好', '战争'],
    correct: 1,
    explain: '多数公司 2022 年的利润并没有跌 33%，跌的是「愿意为每 $1 利润付出的倍数」——和刚才计算器里的价格下跌是同一个道理。',
  },
  {
    type: 'fill',
    before: '巴菲特：利率之于资产价格，就像',
    after: '之于物体。',
    options: ['地心引力', '风', '温度', '光'],
    correct: 0,
    explain: '利率越高，把估值拉回地面的力量越大。这是理解宏观如何影响股市的第一原理。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '利率是估值的地心引力',
    body: '三句话带走：',
    display: '价格 = 每年现金流 ÷ 要求回报',
    bullets: [
      '国债收益率是所有资产的比较基准',
      '无风险利率越高，要求回报越高，同样的现金流越不值钱',
      '2022 年的大跌，主要跌的是估值倍数，不是利润',
    ],
    footer: '下一课：市盈率（P/E）倒过来看，其实就是一个收益率。',
  },
];

export const i4l1StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'Return for doing nothing',
    title: 'If Treasuries pay 5%, why accept 4% from stocks?',
    body: 'In 2020 the 10-year US Treasury yield was under 1%; by 2023 it briefly neared 5%.\n\nSame stock, same profits — would you pay the same price in both years?',
  },
  {
    type: 'choice',
    question: 'The 10-year Treasury yield rises from 1% to 5%. What’s the directional effect on stock valuations overall?',
    options: ['None: bonds are bonds, stocks are stocks', 'Lower valuations: risk-free returns are higher, so stocks must get cheap enough to offer a more attractive return', 'Higher valuations: it signals a strong economy', 'It only affects bank stocks'],
    correct: 1,
    explain: 'Every asset competes with the risk-free rate for money. The more Treasuries pay, the cheaper stocks must be to attract buyers.',
  },
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'The risk-free rate: the yardstick for every asset',
    body: 'The first question for any investment: is the extra return over Treasuries enough to compensate for the extra risk?',
    bullets: [
      'The US Treasury yield is treated as the “risk-free rate”: the return available for taking almost no risk',
      'Every investment is measured against it',
      'Buffett: interest rates are to asset prices what gravity is to objects',
    ],
  },
  anchor(false),
  {
    type: 'tf',
    statement: 'The “risk-free rate” usually means the US Treasury yield, because the US government’s default risk is considered extremely low.',
    answer: true,
    explain: 'True. It anchors asset pricing worldwide.',
  },
  {
    type: 'choice',
    question: 'In 2022 the Fed raised rates from near zero to above 4%, and the Nasdaq fell about 33%. What was the main transmission mechanism?',
    options: ['Companies went bust en masse', 'Required returns rose, so the price paid per $1 of profit fell — hitting hardest the companies whose profits lie far in the future', 'Bad investor mood', 'War'],
    correct: 1,
    explain: 'Most companies’ 2022 profits didn’t fall 33%; the multiple people would pay per $1 of profit did — the same thing you just saw in the calculator.',
  },
  {
    type: 'fill',
    before: 'Buffett: interest rates are to asset prices what',
    after: 'is to objects.',
    options: ['gravity', 'wind', 'temperature', 'light'],
    correct: 0,
    explain: 'The higher rates go, the harder valuations get pulled back to earth. It’s the first principle for how macro moves the stock market.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Interest rates are valuation’s gravity',
    body: 'Three lines to take with you:',
    display: 'price = annual cash flow ÷ required return',
    bullets: [
      'The Treasury yield is the benchmark for every asset',
      'A higher risk-free rate means a higher required return, so the same cash flow is worth less',
      'The 2022 crash was mostly a fall in valuation multiples, not in profits',
    ],
    footer: 'Next lesson: flip the P/E ratio upside down and it’s a yield.',
  },
];
