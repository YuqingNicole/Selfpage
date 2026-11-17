import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 9 单元第 1 课「Priced in：利好出尽是利空」。
 * 第 9 单元以英伟达为主线（近似值）：2024 年 8 月财报，季度收入约 $300 亿、高于分析师预期约 $287 亿，
 * 下季指引也高于预期，次日股价约 −6%；财报前股价当年已涨约 150%。
 * 计算器是简化模型：股价反应 ≈ 1.5 × (实际超出 − 市场私下期待的超出)。
 */

const ACTUAL = 5;
const signed = (n: number) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n).toFixed(1)}%`;

const whisper = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '一家热门公司的收入比分析师预期高 5%。但市场私下期待的可能更多。拖动「市场私下期待超出多少」，看股价的反应。'
    : 'A hot company’s revenue beats analyst estimates by 5%. But the market may privately expect more. Drag “how much the market privately expects it to beat” and watch the stock’s reaction.',
  display: zh ? '股价反应 ≈ 1.5 × (实际超出 − 私下期待的超出)' : 'stock reaction ≈ 1.5 × (actual beat − privately expected beat)',
  inputs: [
    { key: 'actual', label: zh ? '实际比分析师预期高' : 'Actual beat vs analysts', min: ACTUAL, max: ACTUAL, step: 1, start: ACTUAL, fixed: true, format: (v) => `+${v}%` },
    { key: 'w', label: zh ? '市场私下期待超出' : 'Market privately expects a beat of', min: 0, max: 12, step: 0.5, start: 2, format: (v) => `+${v}%` },
  ],
  outputs: [
    { label: zh ? '股价反应' : 'Stock reaction', value: (v) => 1.5 * (v.actual - v.w), format: signed, main: true },
    {
      label: zh ? '市场怎么读' : 'How the market reads it',
      value: (v) => v.actual - v.w,
      format: (n) => (n > 0 ? (zh ? '超出了心里的数' : 'Beat the number in their heads') : n === 0 ? (zh ? '刚好符合' : 'Exactly as hoped') : zh ? '「不够好」' : '“Not good enough”'),
    },
  ],
  visit: { w: [2, 9] },
  explain: zh
    ? '同样超出分析师预期 5%：如果大家私下只期待 2%，这是惊喜；如果股价已经涨了一大截、大家期待 9%，这就是失望。决定涨跌的，是实际结果和「心里那个数」的差。'
    : 'The same 5% beat over analysts: if people privately expected 2%, it’s a surprise; if the stock had already run up and people expected 9%, it’s a letdown. What moves the price is the gap between the result and the number in people’s heads.',
});

export const i9l1StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个反常',
    title: '超出预期，股价下跌',
    body: '2024 年 8 月，英伟达公布财报：季度收入约 $300 亿，高于分析师预期的约 $287 亿，下季指引也高于预期。\n\n第二天，股价跌了约 6%。',
  },
  {
    type: 'choice',
    question: '业绩和指引都超出预期，股价却跌了。最可能的原因是？',
    options: ['市场不理性', '股价那一年已经涨了约 150%，大家心里期待的远不止「超出一点」', '财报造假', '大股东在卖'],
    correct: 1,
    explain: '分析师预期是公开的数字，而涨了 150% 的股价里，装着更高的期待。只超过公开数字，不够。',
  },
  whisper(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: 'Priced in（已计价）',
    body: '股价不是给现实打分，而是给「大家预期的未来」报价：',
    bullets: [
      '人人都预期到的好消息，早就装进了价格',
      '耳语数字（whisper number）：市场私下比分析师更高的期待',
      '先涨传闻，后卖消息（buy the rumor, sell the news）',
      '看到重磅消息先问：股价此前已经为它涨了多少？',
    ],
  },
  {
    type: 'fill',
    before: '「buy the rumor, sell the news」：股价在',
    after: '阶段涨完，消息正式落地时反而见顶。',
    options: ['传闻和预期', '财报发布', '分红', '停牌'],
    correct: 0,
    explain: '2024 年 1 月比特币 ETF 获批，比特币当天就阶段见顶，随后两周跌了约 20%——涨幅在获批之前的预期阶段已经走完了。',
  },
  {
    type: 'tf',
    statement: '一个所有人都知道的好消息，通常已经反映在股价里，落地时不再有新的推动力。',
    answer: true,
    explain: '正确。价格由新信息推动。人人皆知的消息没有新信息，除非落地的细节比预期更好或更差。',
  },
  {
    type: 'choice',
    question: '两只股票迎来同样的利好：A 事前已涨 50%，B 事前纹丝不动。落地后谁更可能下跌？',
    options: ['B', 'A：50% 的涨幅说明期待已经被充分计价', '一样', '无法判断'],
    correct: 1,
    explain: '事前涨幅是「已计价预期」的体温计。同样的消息，体温高的那只更容易「利好出尽」。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '和心里那个数比',
    body: '三句话带走：',
    display: '涨跌 = 实际 − 预期，而不是好 − 坏',
    bullets: [
      '价格里已经装着大家预期的未来',
      '热门股的真实标尺是耳语数字，不是分析师共识',
      '事前涨得越多，「利好出尽」的风险越大',
    ],
    footer: '下一课：同样的道理反过来——坏业绩也能让股价大涨。',
  },
];

export const i9l1StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'An anomaly',
    title: 'Beat expectations, stock falls',
    body: 'In August 2024 Nvidia reported quarterly revenue of about $30 billion, above the roughly $28.7 billion analysts expected, with next-quarter guidance above expectations too.\n\nThe next day the stock fell about 6%.',
  },
  {
    type: 'choice',
    question: 'Results and guidance both beat, yet the stock fell. The most likely reason?',
    options: ['The market is irrational', 'The stock had risen about 150% that year, and people expected far more than “a small beat”', 'Accounting fraud', 'Big shareholders were selling'],
    correct: 1,
    explain: 'Analyst estimates are a public number; a stock up 150% carries much higher hopes. Beating only the public number wasn’t enough.',
  },
  whisper(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Priced in',
    body: 'A stock price doesn’t grade reality; it quotes the future people expect:',
    bullets: [
      'Good news everyone expected is already in the price',
      'Whisper number: the market’s private expectation, higher than analysts’',
      'Buy the rumor, sell the news',
      'Seeing big news, first ask: how much has the stock already risen for it?',
    ],
  },
  {
    type: 'fill',
    before: '“Buy the rumor, sell the news”: the stock finishes rising during the',
    after: ' phase and tops out when the news lands.',
    options: ['rumor and anticipation', 'earnings release', 'dividend', 'trading halt'],
    correct: 0,
    explain: 'When bitcoin ETFs were approved in January 2024, bitcoin topped out that day and fell about 20% over the next two weeks — the rise had already happened while people anticipated approval.',
  },
  {
    type: 'tf',
    statement: 'Good news that everyone knows is usually already in the price and gives no new push when it lands.',
    answer: true,
    explain: 'True. Prices move on new information. News everyone knows has none — unless the details turn out better or worse than expected.',
  },
  {
    type: 'choice',
    question: 'Two stocks get the same good news: A had risen 50% beforehand, B hadn’t moved. Which is more likely to fall afterwards?',
    options: ['B', 'A: a 50% run-up means the hopes were already fully priced', 'The same', 'Can’t tell'],
    correct: 1,
    explain: 'The run-up beforehand is a thermometer for how much is priced in. With the same news, the hotter stock is more likely to “sell the news”.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Compare with the number in their heads',
    body: 'Three lines to take with you:',
    display: 'move = actual − expected, not good − bad',
    bullets: [
      'The price already holds the future people expect',
      'For hot stocks the real bar is the whisper number, not analyst consensus',
      'The more it ran up beforehand, the bigger the “sell the news” risk',
    ],
    footer: 'Next lesson: the same logic in reverse — bad results can send a stock soaring.',
  },
];
