import type { LessonStep } from '../optionsCourse';
import { usdEn, usdZh } from './fmt';

/**
 * 投资主线 第 1 单元第 2 课「市值：给整家公司标价」。
 * 苹果约 152 亿股：先心算 $3 万亿对应的股价 → 「市值蒸发」去哪了 → 拖股价看每 $1 对应的市值变化 → 体量决定难度。
 */

const APPLE_SHARES = 15.2e9;

const capInputs = (zh: boolean, start: number, min: number, max: number) => [
  { key: 'price', label: zh ? '苹果股价' : 'Apple share price', min, max, step: 1, start, format: (v: number) => `$${v}` },
  {
    key: 'shares',
    label: zh ? '总股数' : 'Shares outstanding',
    min: APPLE_SHARES,
    max: APPLE_SHARES,
    step: 1,
    start: APPLE_SHARES,
    fixed: true,
    format: (v: number) => (zh ? `约 ${(v / 1e8).toFixed(0)} 亿股` : `about ${(v / 1e9).toFixed(1)}B shares`),
  },
];

export const i1l2StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个吓人的标题',
    title: '「苹果市值一天蒸发 $900 亿」',
    body: '某天苹果股价跌了 3%，新闻标题写着：市值蒸发约 $900 亿。\n\n这 $900 亿去哪了？先弄清楚市值是怎么算出来的。',
  },
  {
    type: 'calc',
    mode: 'target',
    prompt: '苹果约有 152 亿股。股价大约多少时，市值正好是 $3 万亿？先心算，再拖到你的答案。',
    display: '市值 = 股价 × 总股数',
    inputs: capInputs(true, 120, 100, 300),
    outputs: [{ label: '市值', value: (v) => v.price * v.shares, format: (n) => usdZh(n), main: true }],
    target: { key: 'price', answer: 197, tolerance: 4, hideOutputs: true },
    explain: '$3 万亿 ÷ 152 亿股 ≈ $197。用总股数乘上股价，就是「整家公司」的标价。',
  },
  {
    type: 'choice',
    question: '回到那个标题：苹果跌 3%，「市值蒸发约 $900 亿」。这 $900 亿去哪了？',
    options: ['被做空的人赚走了', '被管理层亏掉了', '哪也没去：所有股份按更低的最新成交价重新标价', '流进了债券市场'],
    correct: 2,
    explain: '当天真正换手的只是一小部分股份。市值是「最后成交价 × 全部股数」，价格一变，所有股份跟着重新标价——没有现金被谁拿走。',
  },
  {
    type: 'calc',
    mode: 'explore',
    prompt: '拖动苹果股价，看市值跟着怎么变。',
    inputs: capInputs(true, 200, 180, 220),
    outputs: [
      { label: '市值', value: (v) => v.price * v.shares, format: (n) => usdZh(n), main: true },
      { label: '相比股价 $200 时', value: (v) => (v.price - 200) * v.shares, format: (n) => (n === 0 ? '$0' : `${n > 0 ? '+' : ''}${usdZh(n)}`) },
    ],
    visit: { price: [194, 206] },
    explain: '股价每动 $1，苹果的市值就变动约 $152 亿。跌 3%（约 $6）就是约 $900 亿——标题里的「蒸发」就是这么算出来的。',
  },
  {
    type: 'concept',
    kicker: '体量',
    title: '越大，越难再翻倍',
    body: '苹果再涨 10%，需要多出约 $3,000 亿市值——比一整个麦当劳（约 $2,000 亿）还多。\n\n一家 $30 亿市值的小公司涨 10%，只需要多出 $3 亿。同样的涨幅，需要的「新增价值」完全不在一个量级。',
  },
  {
    type: 'tf',
    statement: '苹果市值 $3 万亿再涨 10%，比一家 $30 亿市值的公司涨 10% 难得多。',
    answer: true,
    explain: '正确。大公司每 1% 的涨幅对应巨大的市值增量，需要盈利或预期同步跟上。这叫「基数效应」。',
  },
  {
    type: 'match',
    prompt: '把公司和它的量级对上（2024 年前后近似值）',
    pairs: [
      ['苹果 / 微软', '约 $3 万亿'],
      ['麦当劳', '约 $2,000 亿'],
      ['一家标普 500 边缘公司', '约 $200 亿'],
      ['典型「仙股」', '不足 $1 亿'],
    ],
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '市值是标价，不是现金',
    body: '三句话带走：',
    display: '市值 = 股价 × 总股数',
    bullets: [
      '市值是整家公司按最新成交价的标价',
      '「市值蒸发」是重新标价，不是有人拿走了钱',
      '体量越大，同样的涨幅需要越多的新增价值',
    ],
    footer: '下一课：总股数不是固定的——回购让它变少，增发让它变多。',
  },
];

export const i1l2StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A scary headline',
    title: '“Apple loses $90 billion in market value in a day”',
    body: 'One day Apple’s stock falls 3%, and the headline reads: about $90 billion in market value wiped out.\n\nWhere did that $90 billion go? First, work out how market cap is calculated.',
  },
  {
    type: 'calc',
    mode: 'target',
    prompt: 'Apple has about 15.2 billion shares. At roughly what share price is its market cap exactly $3 trillion? Do it in your head, then drag to your answer.',
    display: 'market cap = share price × shares outstanding',
    inputs: capInputs(false, 120, 100, 300),
    outputs: [{ label: 'Market cap', value: (v) => v.price * v.shares, format: (n) => usdEn(n), main: true }],
    target: { key: 'price', answer: 197, tolerance: 4, hideOutputs: true },
    explain: '$3 trillion ÷ 15.2 billion shares ≈ $197. Share count times share price is the price tag on the whole company.',
  },
  {
    type: 'choice',
    question: 'Back to the headline: Apple falls 3% and “about $90 billion is wiped out”. Where did it go?',
    options: ['Short sellers took it', 'Management lost it', 'Nowhere: every share was re-marked at the lower last trade price', 'It flowed into bonds'],
    correct: 2,
    explain: 'Only a small fraction of shares actually changed hands that day. Market cap is last price × all shares, so when the price moves, every share is re-marked — no cash was taken by anyone.',
  },
  {
    type: 'calc',
    mode: 'explore',
    prompt: 'Drag Apple’s share price and watch the market cap move with it.',
    inputs: capInputs(false, 200, 180, 220),
    outputs: [
      { label: 'Market cap', value: (v) => v.price * v.shares, format: (n) => usdEn(n), main: true },
      { label: 'vs. at $200', value: (v) => (v.price - 200) * v.shares, format: (n) => (n === 0 ? '$0' : `${n > 0 ? '+' : ''}${usdEn(n)}`) },
    ],
    visit: { price: [194, 206] },
    explain: 'Every $1 move in the share price shifts Apple’s market cap by about $15 billion. A 3% drop (about $6) is roughly $90 billion — that’s exactly how the headline’s “wiped out” number is calculated.',
  },
  {
    type: 'concept',
    kicker: 'Size',
    title: 'The bigger it is, the harder it is to double',
    body: 'For Apple to rise another 10%, it needs about $300 billion of extra market value — more than an entire McDonald’s (about $200 billion).\n\nA $3 billion company rising 10% needs just $300 million more. Same percentage, completely different amounts of new value.',
  },
  {
    type: 'tf',
    statement: 'Apple rising another 10% from $3 trillion is much harder than a $3 billion company rising 10%.',
    answer: true,
    explain: 'True. Each 1% for a giant means a huge amount of new market value, which earnings or expectations must keep up with. That’s the base effect.',
  },
  {
    type: 'match',
    prompt: 'Match each company to its size (approximate, around 2024)',
    pairs: [
      ['Apple / Microsoft', 'About $3 trillion'],
      ['McDonald’s', 'About $200 billion'],
      ['A company at the edge of the S&P 500', 'About $20 billion'],
      ['A typical penny stock', 'Under $100 million'],
    ],
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Market cap is a price tag, not cash',
    body: 'Three lines to take with you:',
    display: 'market cap = share price × shares outstanding',
    bullets: [
      'Market cap is the whole company priced at the latest trade',
      '“Wiped-out market value” is a re-marking, not money taken by someone',
      'The bigger the company, the more new value the same percentage gain requires',
    ],
    footer: 'Next lesson: the share count isn’t fixed — buybacks shrink it, new issuance grows it.',
  },
];
