import type { LessonStep } from '../optionsCourse';
import { usdEn, usdZh } from './fmt';

/**
 * 投资主线 第 12 单元第 1 课「叙事的生命周期与反身性」。
 * 特斯拉 2020 年股价大涨后三次增发，共融资约 $120 亿，还清了大部分债务（近似值）；
 * 2019 年中它的市值只有约 $400 亿，2020 年底约 $6,000 亿。
 * 计算器：同样融 $50 亿，市值越高，要增发的股份占比越小。
 */

const RAISE = 5e9;

const raise = (zh: boolean): LessonStep => {
  const f = zh ? usdZh : usdEn;
  return {
    type: 'calc',
    mode: 'explore',
    prompt: zh
      ? '一家公司要增发新股融资 $50 亿。拖动公司的市值，看要卖掉多少比例的公司，老股东被稀释多少。'
      : 'A company wants to raise $5 billion by issuing new shares. Drag the company’s market cap and see what fraction of the company it must sell — how much existing shareholders get diluted.',
    display: zh ? '稀释 ≈ 融资额 ÷ (市值 + 融资额)' : 'dilution ≈ amount raised ÷ (market cap + amount raised)',
    inputs: [
      { key: 'raise', label: zh ? '融资额' : 'Amount raised', min: RAISE, max: RAISE, step: 1, start: RAISE, fixed: true, format: (v) => f(v) },
      { key: 'cap', label: zh ? '公司市值' : 'Market cap', min: 2e10, max: 6e11, step: 1e10, start: 4e10, format: (v) => f(v) },
    ],
    outputs: [
      { label: zh ? '老股东被稀释' : 'Existing shareholders diluted by', value: (v) => v.raise / (v.cap + v.raise), format: (n) => `${(n * 100).toFixed(1)}%`, main: true },
    ],
    visit: { cap: [4e10, 5e11] },
    explain: zh
      ? '市值 $400 亿时融 $50 亿，要稀释约 11%；市值涨到 $5,000 亿，同样的钱只稀释约 1%。股价越高，融资越便宜，公司越容易还债、扩产、招人——价格反过来改善了基本面。'
      : 'At a $40 billion market cap, raising $5 billion dilutes about 11%; at $500 billion, the same money dilutes only about 1%. The higher the stock, the cheaper the funding, and the easier it is to pay down debt, build capacity and hire — the price feeds back into the fundamentals.',
  };
};

export const i12l1StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个循环',
    title: '股价涨了，公司真的变好了',
    body: '2019 年中，特斯拉市值约 $400 亿，背着大量债务，常被质疑会不会破产。2020 年它的股价涨了好几倍。\n\n它趁机三次增发，融资约 $120 亿，还清了大部分债务。',
  },
  {
    type: 'choice',
    question: '在这个故事里，股价上涨和公司基本面是什么关系？',
    options: ['股价只是反映了基本面', '互相塑造：股价上涨让公司能便宜地融资，融到的钱又真的改善了基本面', '两者无关', '股价总是错的'],
    correct: 1,
    explain: '通常我们说「基本面决定股价」。特斯拉 2020 年是反过来的：高股价消灭了它的破产风险。',
  },
  raise(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '反身性与叙事周期',
    body: '大行情几乎都伴随一个主导叙事：',
    display: '萌芽 → 扩散 → 共识 → 狂热 → 证伪或兑现',
    bullets: [
      '反身性（索罗斯）：价格不只反映基本面，还能改写基本面',
      '股价上涨 → 便宜融资、股票激励招人、信用改善',
      '判断叙事在周期的哪一段，比争论它最终真假更实用',
    ],
  },
  {
    type: 'match',
    prompt: '把叙事周期的阶段和它的典型特征对上',
    pairs: [
      ['萌芽', '少数人在研究，没人讨论'],
      ['共识', '上了头条，人人都能说两句'],
      ['狂热', '贴上概念就涨'],
      ['证伪或兑现', '财报数字开始接管定价'],
    ],
  },
  {
    type: 'tf',
    statement: '判断叙事处在周期哪一段，比争论叙事最终是真是假，对投资决策更实用。',
    answer: true,
    explain: '正确。互联网叙事最终是真的，但 2000 年买在狂热期照样亏 80%。真假决定终点，阶段决定你的买入价。',
  },
  {
    type: 'choice',
    question: '一个叙事进入「贴上概念就涨」的阶段，意味着什么？',
    options: ['叙事更可信了', '狂热期：资金开始无差别定价，离证伪筛选不远了——该把持仓从蹭概念的集中到有真实订单的', '所有相关股都值得买', '没有意义'],
    correct: 1,
    explain: '2023–24 年 AI 概念最热之后，退潮把有真实订单的公司和只沾概念的公司彻底分开。狂热期的正确动作不是离场，是提纯。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '价格也在改写故事',
    body: '三句话带走：',
    display: '萌芽 → 扩散 → 共识 → 狂热 → 证伪或兑现',
    bullets: [
      '股价上涨能让融资更便宜，反过来改善基本面',
      '先判断叙事在哪一段',
      '狂热期要提纯持仓',
    ],
    footer: '下一课：怎么知道一个叙事是真是假？拿数字给它对账。',
  },
];

export const i12l1StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A loop',
    title: 'The stock rose, and the company really got better',
    body: 'In mid-2019 Tesla was worth about $40 billion, carried heavy debt, and was often doubted to survive. In 2020 its stock rose several times over.\n\nIt seized the moment with three share sales, raising about $12 billion and paying off most of its debt.',
  },
  {
    type: 'choice',
    question: 'In this story, how do the stock price and the fundamentals relate?',
    options: ['The price just reflected the fundamentals', 'They shaped each other: the rising price let the company raise money cheaply, and that money really improved the fundamentals', 'They’re unrelated', 'The price is always wrong'],
    correct: 1,
    explain: 'We usually say fundamentals drive the price. Tesla in 2020 ran the other way: the high stock price eliminated its bankruptcy risk.',
  },
  raise(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Reflexivity and the narrative cycle',
    body: 'Almost every big market move comes with a dominant narrative:',
    display: 'emerging → spreading → consensus → mania → disproved or delivered',
    bullets: [
      'Reflexivity (Soros): prices don’t just reflect fundamentals; they can rewrite them',
      'A rising stock → cheap funding, stock-based hiring, better credit',
      'Knowing where a narrative is in its cycle is more useful than arguing whether it’s ultimately true',
    ],
  },
  {
    type: 'match',
    prompt: 'Match each stage of the narrative cycle to its typical sign',
    pairs: [
      ['Emerging', 'A few people researching, nobody talking'],
      ['Consensus', 'In the headlines; everyone has an opinion'],
      ['Mania', 'Anything with the label goes up'],
      ['Disproved or delivered', 'Reported numbers take over the pricing'],
    ],
  },
  {
    type: 'tf',
    statement: 'Judging where a narrative is in its cycle is more useful for investing decisions than arguing whether it’s ultimately true.',
    answer: true,
    explain: 'True. The internet narrative turned out true, yet buying in the 2000 mania still lost 80%. Truth decides the endpoint; the stage decides your entry price.',
  },
  {
    type: 'choice',
    question: 'A narrative reaches the stage where anything with the label goes up. What does that mean?',
    options: ['The narrative is more credible', 'Mania: money is pricing everything alike, and the sorting is near — time to concentrate holdings from label-riders into companies with real orders', 'Every related stock is worth buying', 'Nothing'],
    correct: 1,
    explain: 'After the AI label peaked in 2023–24, the ebb cleanly separated companies with real orders from those with only the label. The right move in a mania isn’t leaving; it’s purifying.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Prices rewrite stories too',
    body: 'Three lines to take with you:',
    display: 'emerging → spreading → consensus → mania → disproved or delivered',
    bullets: [
      'A rising stock makes funding cheaper and can improve the fundamentals',
      'First judge which stage the narrative is in',
      'In a mania, purify your holdings',
    ],
    footer: 'Next lesson: how do you know whether a narrative is true? Audit it against the numbers.',
  },
];
