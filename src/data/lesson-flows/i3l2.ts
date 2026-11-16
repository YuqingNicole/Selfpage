import type { LessonStep } from '../optionsCourse';
import { usdEn, usdZh } from './fmt';

/**
 * 投资主线 第 3 单元第 2 课「自由现金流：股东真正能拿的钱」。
 * 亚马逊 2023（近似值）：经营现金流约 $850 亿，资本开支约 $480 亿 → FCF 约 $370 亿。
 * 对照苹果 FY2023：FCF 约 $996 亿，回购约 $776 亿 + 分红约 $150 亿。
 */

const OCF = 85e9;

const guessFcf = (zh: boolean): LessonStep => {
  const f = zh ? usdZh : usdEn;
  return {
    type: 'calc',
    mode: 'target',
    prompt: zh
      ? '2023 年亚马逊经营现金流约 $850 亿，资本开支约 $480 亿。它的自由现金流大约是多少？拖到你算出的数。'
      : 'In 2023 Amazon had about $85 billion of operating cash flow and about $48 billion of capex. Roughly what was its free cash flow? Drag to your answer.',
    display: zh ? '自由现金流 = 经营现金流 − 资本开支' : 'free cash flow = operating cash flow − capex',
    inputs: [
      {
        key: 'guess',
        label: zh ? '你的答案' : 'Your answer',
        min: 0,
        max: 100e9,
        step: 1e9,
        start: 85e9,
        format: (v) => f(v),
      },
    ],
    outputs: [{ label: zh ? '实际自由现金流' : 'Actual free cash flow', value: () => OCF - 48e9, format: (n) => f(n), main: true }],
    target: { key: 'guess', answer: 37e9, tolerance: 2e9, hideOutputs: true },
    explain: zh
      ? '$850 亿 − $480 亿 ≈ $370 亿。经营赚来的钱，先要拿出一大块去建仓库、数据中心，剩下的才是「自由」的。'
      : '$85B − $48B ≈ $37B. A big chunk of the cash the business brings in has to go into warehouses and data centers first; only what’s left is “free”.',
  };
};

const capexPlay = (zh: boolean): LessonStep => {
  const f = zh ? usdZh : usdEn;
  return {
    type: 'calc',
    mode: 'explore',
    prompt: zh
      ? '经营现金流固定在 $850 亿。拖动资本开支，看自由现金流怎么变。'
      : 'Operating cash flow is fixed at $85 billion. Drag capex and watch free cash flow.',
    inputs: [
      { key: 'ocf', label: zh ? '经营现金流' : 'Operating cash flow', min: OCF, max: OCF, step: 1, start: OCF, fixed: true, format: (v) => f(v) },
      { key: 'capex', label: zh ? '资本开支（Capex）' : 'Capex', min: 20e9, max: 100e9, step: 1e9, start: 48e9, format: (v) => f(v) },
    ],
    outputs: [{ label: zh ? '自由现金流' : 'Free cash flow', value: (v) => v.ocf - v.capex, format: (n) => f(n), main: true }],
    visit: { capex: [30e9, 90e9] },
    explain: zh
      ? '资本开支一旦超过经营现金流，FCF 就变成负数。2021 年亚马逊大建仓库，FCF 约 −$90 亿；2024 年又为 AI 数据中心把资本开支推到约 $830 亿。FCF 是正是负，很大程度上是管理层的选择——关键看钱花在了哪里。'
      : 'Once capex exceeds operating cash flow, FCF turns negative. In 2021 Amazon’s warehouse build-out pushed FCF to about −$9 billion; in 2024 it lifted capex to about $83 billion for AI data centers. Whether FCF is positive is largely management’s choice — what matters is where the money goes.',
  };
};

export const i3l2StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '工资高不等于有钱',
    title: '经营现金流 $850 亿，能自由花的有多少？',
    body: '2023 年亚马逊经营现金流约 $850 亿。可同一年，它在仓库、数据中心这些设施上花了约 $480 亿。\n\n就像工资到手，还得先交房租、付进修班的学费，剩下的才是能自由支配的钱。',
  },
  guessFcf(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '自由现金流（FCF）',
    body: '维持并发展业务之后，真正「自由」的钱：',
    display: '自由现金流 = 经营现金流 − 资本开支（Capex）',
    bullets: [
      'FCF 的去向：回购、分红、还债、并购，或者存起来',
      '它是回购和分红的弹药库',
      '成长期 FCF 为负不一定是坏事，关键看钱是不是花在能长出更多现金的地方',
    ],
  },
  capexPlay(true),
  {
    type: 'choice',
    question: '对照苹果：FY2023 它的自由现金流约 $996 亿，其中约 $776 亿用于回购、约 $150 亿用于分红。这对长期股东意味着什么？',
    options: [
      '公司没有增长点了，只能发钱',
      '股东每年实实在在分享经营成果：股数变少加上现金分红，即使利润不涨，每股价值也在提升',
      '这是财务造假的信号',
      '回购只是为了拉抬股价',
    ],
    correct: 1,
    explain: '还记得第 1 单元苹果的股数从 260 亿降到 155 亿吗？钱就来自这里。强劲的 FCF 加上股东友好的分配，是巴菲特重仓苹果的理由之一。',
  },
  {
    type: 'tf',
    statement: '一家高速扩张的公司自由现金流为负，一定说明它是坏投资。',
    answer: false,
    explain: '错误。亚马逊、特斯拉都经历过多年负 FCF 的扩张期。要问的是：投下去的钱回报率如何，未来能不能长出更大的现金流。',
  },
  {
    type: 'match',
    prompt: '把 FCF 的去向和它对股东的含义对上',
    pairs: [
      ['回购注销', '每股含金量提升'],
      ['分红', '直接落袋的现金'],
      ['高回报的扩张', '未来现金流的种子'],
      ['盲目多元化收购', '价值毁灭的高发区'],
    ],
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '股东真正能分的，是自由现金流',
    body: '三句话带走：',
    display: '自由现金流 = 经营现金流 − 资本开支（Capex）',
    bullets: [
      'FCF 是维持和发展业务之后剩下的钱',
      '它是回购和分红的来源',
      'FCF 为负不一定是坏事，关键看钱花在哪里、能不能长出更多现金',
    ],
    footer: '下一课：今天砸下去的 Capex，就是明天利润表上的折旧。',
  },
];

export const i3l2StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A big salary isn’t wealth',
    title: '$85 billion of operating cash flow — how much is free to spend?',
    body: 'In 2023 Amazon generated about $85 billion of operating cash flow. But the same year it spent about $48 billion on facilities like warehouses and data centers.\n\nLike a paycheck: rent and course fees come out first, and only what’s left is yours to spend freely.',
  },
  guessFcf(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Free cash flow (FCF)',
    body: 'The money that’s truly “free” after maintaining and growing the business:',
    display: 'free cash flow = operating cash flow − capex',
    bullets: [
      'Where FCF goes: buybacks, dividends, paying down debt, acquisitions, or the bank',
      'It’s the ammunition for buybacks and dividends',
      'Negative FCF in a growth phase isn’t necessarily bad — what matters is whether the money is spent where it will grow more cash',
    ],
  },
  capexPlay(false),
  {
    type: 'choice',
    question: 'Compare Apple: in FY2023 its free cash flow was about $99.6 billion, with about $77.6 billion spent on buybacks and about $15 billion on dividends. What does that mean for long-term shareholders?',
    options: [
      'The company has run out of growth and can only hand out cash',
      'Shareholders really share in the results each year: fewer shares plus cash dividends lift per-share value even if profit is flat',
      'It’s a sign of fraud',
      'Buybacks are only to prop up the price',
    ],
    correct: 1,
    explain: 'Remember Apple’s share count falling from 26 billion to 15.5 billion in Unit 1? That money came from here. Strong FCF plus shareholder-friendly payouts is one reason Buffett bet so heavily on Apple.',
  },
  {
    type: 'tf',
    statement: 'A fast-growing company with negative free cash flow must be a bad investment.',
    answer: false,
    explain: 'False. Amazon and Tesla both went through years of negative FCF while expanding. The questions are what return the spending earns, and whether it grows bigger cash flows later.',
  },
  {
    type: 'match',
    prompt: 'Match each use of FCF to what it means for shareholders',
    pairs: [
      ['Buybacks', 'More value per share'],
      ['Dividends', 'Cash in your pocket'],
      ['High-return expansion', 'Seeds of future cash flow'],
      ['Undisciplined diversifying acquisitions', 'A common way to destroy value'],
    ],
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'What shareholders can really share is free cash flow',
    body: 'Three lines to take with you:',
    display: 'free cash flow = operating cash flow − capex',
    bullets: [
      'FCF is what’s left after maintaining and growing the business',
      'It funds buybacks and dividends',
      'Negative FCF isn’t necessarily bad — ask where the money goes and whether it grows more cash',
    ],
    footer: 'Next lesson: the capex spent today is tomorrow’s depreciation on the income statement.',
  },
];
