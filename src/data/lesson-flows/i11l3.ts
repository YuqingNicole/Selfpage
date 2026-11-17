import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 11 单元第 3 课「边际定价：谁在此刻买卖」。
 * Archegos 2021 年 3 月爆仓：银行被迫大宗抛售其重仓股，ViacomCBS 一周约 −50%，公司本身没有重大新闻。
 * 计算器：被迫卖出的股数（占流通股 %）÷ 日均成交量（流通股的 0.5%）= 要几个交易日才能卖完。
 */

const ADV = 0.5;

const forced = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '一只股票平时每天成交流通股的 0.5%。现在有人必须卖掉一大块，而且不在乎价格。拖动被迫卖出的数量，看要几天才能卖完。'
    : 'A stock normally trades 0.5% of its float a day. Now someone must sell a big block, whatever the price. Drag the amount of forced selling and see how many days it takes to clear.',
  display: zh ? '要卖几天 = 被迫卖出量 ÷ 日均成交量' : 'days to clear = forced selling ÷ average daily volume',
  inputs: [
    { key: 'f', label: zh ? '被迫卖出（占流通股）' : 'Forced selling (share of float)', min: 0.5, max: 15, step: 0.5, start: 1, format: (v) => `${v}%` },
  ],
  outputs: [
    { label: zh ? '按平时的成交量，要卖' : 'At normal volume, takes', value: (v) => v.f / ADV, format: (n) => (zh ? `${n.toFixed(0)} 个交易日` : `${n.toFixed(0)} trading days`), main: true },
    { label: zh ? '相当于平时几天的成交' : 'Equal to normal days of trading', value: (v) => v.f / ADV, format: (n) => `${n.toFixed(0)}×` },
  ],
  visit: { f: [1, 10] },
  explain: zh
    ? '被迫卖出流通股的 10%，等于平时 20 天的全部成交量。要在几天内卖完，只能一路压价找买家。价格跌多少，取决于卖压，而不取决于公司值多少钱——卖完，压力就消失了。'
    : 'Forced selling of 10% of the float equals 20 days of all normal trading. To clear it in a few days, the seller must keep cutting the price to find buyers. How far the price falls depends on the selling pressure, not on what the company is worth — and once the selling is done, the pressure is gone.',
});

export const i11l3StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '没有新闻的暴跌',
    title: '一周跌一半，公司什么都没做',
    body: '2021 年 3 月下旬，传媒公司 ViacomCBS 的股价一周之内跌了约一半。公司没有发布坏消息，业务也没有突变。\n\n后来人们才知道：一家叫 Archegos 的私人投资公司加了极高杠杆重仓它，爆仓了。',
  },
  {
    type: 'choice',
    question: '借钱给 Archegos 的银行接下来会做什么？',
    options: ['耐心等股价回升', '为了收回借款，不计价格地大批卖出它抵押的股票', '买入更多', '要求公司回购'],
    correct: 1,
    explain: '银行不关心这只股票值多少钱，只关心尽快把钱收回来。几百亿美元的仓位被集中抛售，价格只能一路往下找买家。',
  },
  forced(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '边际交易者',
    body: '价格不是所有持有人投票决定的，而是此刻愿意买或被迫卖的那一小撮人：',
    bullets: [
      '拥挤交易：该买的人都买满了，利好也没人接',
      '被迫交易者不看估值：爆仓的杠杆盘、被赎回的基金、被轧空的空头',
      '被迫卖压卖完即止，常常留下错价',
    ],
  },
  {
    type: 'choice',
    question: '「利好出尽」从仓位结构上怎么解释？',
    options: ['利好是假的', '看好的人早已买满，利好落地时找不到新的买家，只剩获利了结的卖家', '主力出货阴谋', '交易系统故障'],
    correct: 1,
    explain: '价格需要新增的买家推动。仓位越拥挤，同一条好消息能推动的涨幅越小——这是第 9 单元「已计价」的微观版本。',
  },
  {
    type: 'fill',
    before: '极端行情时，第一个问题不是「基本面变了什么」，而是「现在谁在',
    after: '」。',
    options: ['被迫交易', '看新闻', '发朋友圈', '开电话会'],
    correct: 0,
    explain: 'Archegos 的抵押股、2022 年英国养老金的被迫抛售、2021 年 GameStop 被轧空的空头——被迫者的行为能解释估值解释不了的价格。',
  },
  {
    type: 'tf',
    statement: '一只没有坏消息的股票被被迫抛售砸下去之后，值得启动基本面研究，看看是不是错价的机会。',
    answer: true,
    explain: '正确。先分清「有人必须卖」和「东西不值钱」。被迫抛售造成的错价，是主动投资者最经典的机会来源之一。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '先问谁在被迫交易',
    body: '三句话带走：',
    display: '价格由此刻的边际买卖决定',
    bullets: [
      '仓位拥挤时，利好也推不动',
      '被迫卖家不看估值，卖完即止',
      '分清「必须卖」和「不值钱」',
    ],
    footer: '下一单元：故事驱动价格，价格又反过来改写故事。',
  },
];

export const i11l3StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A crash with no news',
    title: 'Down by half in a week — and the company did nothing',
    body: 'In late March 2021 media company ViacomCBS lost about half its value in a week. It hadn’t released bad news, and its business hadn’t suddenly changed.\n\nIt later emerged that a private investment firm called Archegos had a huge, highly leveraged position in it — and had blown up.',
  },
  {
    type: 'choice',
    question: 'What would the banks that lent to Archegos do next?',
    options: ['Wait patiently for the price to recover', 'Dump the pledged shares in bulk, whatever the price, to get their loans back', 'Buy more', 'Ask the company to buy back shares'],
    correct: 1,
    explain: 'The banks didn’t care what the stock was worth; they cared about getting their money back fast. With tens of billions of dollars of positions dumped at once, the price had to keep falling to find buyers.',
  },
  forced(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'The marginal trader',
    body: 'Prices aren’t set by a vote of every holder, but by the few willing to buy or forced to sell right now:',
    bullets: [
      'Crowded trades: everyone who wanted in is in, so even good news finds no buyers',
      'Forced traders ignore valuation: margin-called leverage, funds facing redemptions, squeezed short sellers',
      'Forced selling stops once it’s done, often leaving mispricing behind',
    ],
  },
  {
    type: 'choice',
    question: 'How does positioning explain “sell the news”?',
    options: ['The good news was fake', 'Everyone bullish already bought; when the news lands there are no new buyers, only profit-takers', 'A conspiracy by big players', 'A trading system glitch'],
    correct: 1,
    explain: 'Prices need new buyers to push them up. The more crowded the positioning, the less the same good news can lift the price — the micro version of Unit 9’s “priced in”.',
  },
  {
    type: 'fill',
    before: 'In extreme markets, the first question isn’t “what changed in the fundamentals” but “who is',
    after: ' right now?”',
    options: ['being forced to trade', 'reading the news', 'posting online', 'on an earnings call'],
    correct: 0,
    explain: 'Archegos’s pledged shares, the UK pension funds’ forced selling in 2022, the short sellers squeezed in GameStop in 2021 — forced traders explain prices that valuation can’t.',
  },
  {
    type: 'tf',
    statement: 'When a stock with no bad news gets knocked down by forced selling, it’s worth starting fundamental research to see whether it’s a mispricing opportunity.',
    answer: true,
    explain: 'True. First separate “someone has to sell” from “the thing is worthless”. Mispricing from forced selling is one of active investors’ classic sources of opportunity.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'First ask who’s being forced to trade',
    body: 'Three lines to take with you:',
    display: 'prices are set by the marginal buyer and seller right now',
    bullets: [
      'When positioning is crowded, even good news can’t lift the price',
      'Forced sellers ignore valuation, and stop once they’re done',
      'Separate “has to sell” from “not worth anything”',
    ],
    footer: 'Next unit: stories drive prices, and prices rewrite the stories.',
  },
];
