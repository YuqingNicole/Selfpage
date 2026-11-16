import type { LessonStep } from '../optionsCourse';
import { px } from './fmt';

/**
 * 投资主线 第 1 单元第 1 课「股价不等于贵贱」。
 * 第 1 单元全程用苹果：2020 年 8 月 1 拆 4（约 $500 → $125）、约 152 亿股、市值约 $3 万亿、
 * 十年回购把股数从约 260 亿股降到约 155 亿股。数字为历史近似值，仅用于教学。
 */

const splitInputs = (zh: boolean) => [
  {
    key: 'ratio',
    label: zh ? '拆股比例（1 拆 N）' : 'Split ratio (1-for-N)',
    min: 1,
    max: 10,
    step: 1,
    start: 1,
    format: (v: number) => (zh ? `1 拆 ${v}` : `${v}-for-1`),
  },
];

const splitOutputs = (zh: boolean) => [
  { label: zh ? '每股股价' : 'Price per share', value: (v: Record<string, number>) => 500 / v.ratio, format: px },
  {
    label: zh ? '你持有的股数' : 'Shares you hold',
    value: (v: Record<string, number>) => v.ratio,
    format: (n: number) => (zh ? `${n} 股` : `${n} share${n === 1 ? '' : 's'}`),
  },
  { label: zh ? '你的持仓价值' : 'Your holding is worth', value: () => 500, format: px, main: true },
];

export const i1l1StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '两张价签',
    title: '一股 $60 万，一股 $3：哪个更贵？',
    body: '伯克希尔·哈撒韦的 A 股，一股约 $60 万。另有一只股票，一股只要 $3。\n\n直觉会说 $60 万那只「贵」。这一课看看这个直觉错在哪。',
  },
  {
    type: 'choice',
    question: '2020 年 8 月，苹果「1 拆 4」：股价从约 $500 变成约 $125。拆股前持有 1 股的人，拆股后的财富变成了？',
    options: ['缩水到原来的 1/4', '不变：1 股变 4 股，每股 $125', '增加：股价便宜了，更多人买得起', '取决于当天涨跌'],
    correct: 1,
    explain: '1 × $500 = 4 × $125。拆股只是把同一块蛋糕切成更多份，蛋糕本身没变。',
  },
  {
    type: 'calc',
    mode: 'explore',
    prompt: '拆股前你持有 1 股苹果（$500）。拖动拆股比例，看看什么变了、什么没变。',
    inputs: splitInputs(true),
    outputs: splitOutputs(true),
    visit: { ratio: [1, 8] },
    explain: '每股价格和你的股数此消彼长，持仓价值始终是 $500。股价高低，只取决于公司把自己切成了多少份。',
  },
  {
    type: 'concept',
    kicker: '起个名字',
    title: '该比的是整家公司的价格',
    body: '股价只是「一份」的价格。想比较公司，要看给整家公司标的价：',
    display: '市值 = 股价 × 总股数',
    bullets: [
      '股价高低，取决于公司切成了多少份',
      '市值才是整家公司的标价',
      '贵不贵，还要看公司能赚多少钱——后面几个单元会讲',
    ],
  },
  {
    type: 'tf',
    statement: '一股 $60 万的伯克希尔 A 股，一定比一股 $3 的股票「更贵」。',
    answer: false,
    explain: '错误。每股价格只说明切了多少份。$3 的股票也可能贵得离谱，要看市值和赚钱能力的关系。',
  },
  {
    type: 'choice',
    question: 'A 公司股价 $10，有 10 亿股；B 公司股价 $200，有 2,000 万股。哪家公司「更大」？',
    options: ['B：股价高 20 倍', 'A：市值 $100 亿，B 只有 $40 亿', '一样大', '无法比较'],
    correct: 1,
    explain: 'A：$10 × 10 亿 = $100 亿；B：$200 × 2,000 万 = $40 亿。股价低的 A，个头是 B 的 2.5 倍。',
  },
  {
    type: 'choice',
    question: '一只股票从 $80 跌到 $0.9。更合理的第一反应是？',
    options: ['便宜了 99%，捡便宜的机会', '警惕：可能有退市或破产风险，先查基本面', '价格低、门槛低，适合新手', '等它回到 $80 再说'],
    correct: 1,
    explain: '跌破 $1 常伴随退市警告、持续亏损或大量增发。低价是结果，不是折扣。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '股价高不等于贵，股价低不等于便宜',
    body: '三句话带走：',
    bullets: [
      '拆股只改变切法，不改变公司价值，也不改变你的财富',
      '比较公司个头看市值：股价 × 总股数',
      '暴跌后的低价股往往是危险信号，不是折扣',
    ],
    footer: '下一课：苹果 $3 万亿的市值是怎么算出来的？「市值蒸发」又蒸发到哪去了？',
  },
];

export const i1l1StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'Two price tags',
    title: '$600,000 a share vs $3 a share: which is pricier?',
    body: 'One Berkshire Hathaway A share costs about $600,000. Another stock costs just $3.\n\nIntuition says the $600,000 one is “expensive”. This lesson shows where that intuition goes wrong.',
  },
  {
    type: 'choice',
    question: 'In August 2020, Apple did a 4-for-1 split: the price went from about $500 to about $125. What happened to the wealth of someone who held 1 share before the split?',
    options: ['It shrank to a quarter', 'Unchanged: 1 share became 4 shares at $125', 'It grew: a cheaper price means more buyers', 'It depends on that day’s move'],
    correct: 1,
    explain: '1 × $500 = 4 × $125. A split cuts the same cake into more slices; the cake itself doesn’t change.',
  },
  {
    type: 'calc',
    mode: 'explore',
    prompt: 'Before the split you hold 1 Apple share ($500). Drag the split ratio and see what changes — and what doesn’t.',
    inputs: splitInputs(false),
    outputs: splitOutputs(false),
    visit: { ratio: [1, 8] },
    explain: 'The price per share and your share count move in opposite directions; your holding stays at $500. A share price only reflects how many slices the company is cut into.',
  },
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Compare the price of the whole company',
    body: 'A share price is the price of one slice. To compare companies, look at the price tag on the whole thing:',
    display: 'market cap = share price × shares outstanding',
    bullets: [
      'A share price depends on how many slices the company is cut into',
      'Market cap is the price tag on the whole company',
      'Whether it’s expensive also depends on how much it earns — coming in later units',
    ],
  },
  {
    type: 'tf',
    statement: 'A $600,000 Berkshire A share is necessarily “more expensive” than a $3 stock.',
    answer: false,
    explain: 'False. A share price only tells you how many slices there are. A $3 stock can be wildly overpriced — it depends on market cap versus earning power.',
  },
  {
    type: 'choice',
    question: 'Company A trades at $10 with 1 billion shares; company B at $200 with 20 million shares. Which company is “bigger”?',
    options: ['B: its price is 20× higher', 'A: a $10B market cap vs B’s $4B', 'Same size', 'Can’t compare'],
    correct: 1,
    explain: 'A: $10 × 1B = $10B; B: $200 × 20M = $4B. The cheaper-looking A is 2.5 times B’s size.',
  },
  {
    type: 'choice',
    question: 'A stock falls from $80 to $0.90. What’s the more sensible first reaction?',
    options: ['99% off — a bargain', 'Caution: possible delisting or bankruptcy risk — check the fundamentals', 'Low price, low barrier — good for beginners', 'Wait for it to get back to $80'],
    correct: 1,
    explain: 'Falling below $1 often comes with delisting warnings, ongoing losses or heavy dilution. A low price is a result, not a discount.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'A high price isn’t expensive; a low price isn’t cheap',
    body: 'Three lines to take with you:',
    bullets: [
      'A split changes how the cake is cut, not the company’s value or your wealth',
      'Compare company size with market cap: price × shares outstanding',
      'A collapsed low-priced stock is usually a warning sign, not a discount',
    ],
    footer: 'Next lesson: how is Apple’s $3 trillion market cap calculated — and where does “wiped-out market value” go?',
  },
];
