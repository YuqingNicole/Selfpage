import type { LessonStep } from '../optionsCourse';
import { usdEn, usdZh } from './fmt';

/**
 * 投资主线 第 6 单元第 1 课「量价拆解」。
 * 第 6 单元以苹果为主线（近似值）：FY2015 iPhone 销量约 2.31 亿部、收入约 $1,550 亿（均价约 $670）；
 * FY2023 iPhone 收入约 $2,000 亿，销量不再披露，第三方估计约 2.3 亿部（均价约 $870）。
 */

const UNITS = 2.3e8;

const volPrice = (zh: boolean): LessonStep => {
  const f = zh ? usdZh : usdEn;
  return {
    type: 'calc',
    mode: 'target',
    prompt: zh
      ? 'FY2023 iPhone 收入约 $2,000 亿，销量约 2.3 亿部。平均每部卖多少钱？先心算，再拖到你的答案。'
      : 'In FY2023 iPhone revenue was about $200 billion on about 230 million units. What was the average selling price? Work it out, then drag to your answer.',
    display: zh ? '收入 = 销量 × 平均售价（ASP）' : 'revenue = units × average selling price (ASP)',
    inputs: [
      {
        key: 'units',
        label: zh ? '销量' : 'Units sold',
        min: UNITS,
        max: UNITS,
        step: 1,
        start: UNITS,
        fixed: true,
        format: (v) => (zh ? `约 ${(v / 1e8).toFixed(1)} 亿部` : `about ${(v / 1e6).toFixed(0)} million`),
      },
      { key: 'asp', label: zh ? '平均售价' : 'Average selling price', min: 500, max: 1200, step: 10, start: 600, format: (v) => `$${v}` },
    ],
    outputs: [
      { label: zh ? 'iPhone 收入' : 'iPhone revenue', value: (v) => v.units * v.asp, format: (n) => f(n), main: true },
      { label: zh ? '对比 FY2015（均价约 $670）' : 'vs FY2015 (ASP about $670)', value: (v) => v.asp / 670 - 1, format: (n) => `${n >= 0 ? '+' : '−'}${Math.abs(n * 100).toFixed(0)}%` },
    ],
    target: { key: 'asp', answer: 870, tolerance: 30, hideOutputs: true },
    explain: zh
      ? '$2,000 亿 ÷ 2.3 亿部 ≈ $870。销量和 2015 年几乎一样（约 2.3 亿部），均价却涨了约 30%——八年的 iPhone 增长，几乎全部来自「价」。'
      : '$200 billion ÷ 230 million ≈ $870. Units were about the same as 2015 (about 230 million), but the average price rose about 30% — eight years of iPhone growth came almost entirely from price.',
  };
};

export const i6l1StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个奇怪的组合',
    title: '销量没涨，收入涨了 30%',
    body: '2015 年，苹果卖出约 2.3 亿部 iPhone，收入约 $1,550 亿。2023 年，销量大概还是 2.3 亿部，收入却到了约 $2,000 亿。\n\n多出来的 $450 亿是从哪来的？',
  },
  volPrice(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '量 × 价',
    body: '任何收入增长都能切成两块：',
    display: '收入 = 量 × 价',
    bullets: [
      '量：卖出更多（更多用户、更多门店、更多订单）',
      '价：每份卖得更贵（涨价、卖更高端的型号）',
      '靠量的增长，要问天花板还有多远',
      '靠价的增长，要问定价权还能用几次',
    ],
  },
  {
    type: 'choice',
    question: 'iPhone 的均价从约 $670 涨到约 $870，最主要靠什么？',
    options: ['汇率', '更多人买 Pro、大存储和更贵的新机型，加上逐代涨价', '会计调整', '卖给了更多国家'],
    correct: 1,
    explain: '苹果把产品线往上推（Pro / Pro Max、更大存储），让同一批用户每次换机花更多钱。看到「销量平、收入涨」，第一反应就是查均价。',
  },
  {
    type: 'tf',
    statement: '靠涨价驱动的增长可以无限持续。',
    answer: false,
    explain: '错误。涨价消耗的是定价权和用户的耐心。上一单元的计算器里，会员一旦开始「一涨就跑」，提价反而让收入下滑——价的增长要数着次数用。',
  },
  {
    type: 'choice',
    question: '一家快餐连锁「同店销售 +8%」，但拆开后客流 −3%、客单价 +11%。最合理的解读是？',
    options: ['生意越来越好', '增长全靠涨价，来的人反而变少了——涨价还能撑多久要打个问号', '客流不重要', '数字算错了'],
    correct: 1,
    explain: '2022–2023 年很多餐饮的同店增长几乎全是涨价贡献、客流在下滑。只看总数会错过这个信号，拆开量和价才能看见。',
  },
  {
    type: 'fill',
    before: '两家奶茶店营收都增长 20%：A 店客人多了 20%，B 店客人没变、全线涨价 20%。下一年更可能继续增长的是',
    after: '。',
    options: ['A 店', 'B 店', '两家一样', '无法判断'],
    correct: 0,
    explain: 'A 店的增长来自更多人愿意来，还可以继续拉新；B 店再涨一次价，客人就可能开始跑。同样的增速，来源不同，未来不同。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '先切一刀：量还是价',
    body: '三句话带走：',
    display: '收入 = 量 × 价',
    bullets: [
      '任何增长都能拆成量和价',
      'iPhone 八年的增长几乎全靠价',
      '价的增长有次数限制，量的增长有天花板',
    ],
    footer: '下一课：iPhone 的量为什么不涨了？看看天花板在哪。',
  },
];

export const i6l1StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'An odd combination',
    title: 'Flat units, revenue up 30%',
    body: 'In 2015 Apple sold about 230 million iPhones for about $155 billion. In 2023 it sold roughly the same 230 million — for about $200 billion.\n\nWhere did the extra $45 billion come from?',
  },
  volPrice(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Volume × price',
    body: 'Any revenue growth can be cut into two pieces:',
    display: 'revenue = volume × price',
    bullets: [
      'Volume: selling more (more users, more stores, more orders)',
      'Price: charging more for each (price increases, pricier models)',
      'Volume-led growth: how far is the ceiling?',
      'Price-led growth: how many more times can pricing power be used?',
    ],
  },
  {
    type: 'choice',
    question: 'The iPhone’s average price rose from about $670 to about $870. What drove it most?',
    options: ['Exchange rates', 'More people buying Pro models, bigger storage and pricier new models, plus price increases each generation', 'Accounting changes', 'Selling in more countries'],
    correct: 1,
    explain: 'Apple pushed the lineup upmarket (Pro / Pro Max, more storage), so the same users spend more each upgrade. When you see flat units and rising revenue, check the average price first.',
  },
  {
    type: 'tf',
    statement: 'Growth driven by price increases can go on forever.',
    answer: false,
    explain: 'False. Price increases use up pricing power and customer patience. In the last unit’s calculator, once members started leaving at every increase, a price hike shrank revenue — price-led growth has a limited number of uses.',
  },
  {
    type: 'choice',
    question: 'A fast-food chain reports same-store sales +8%; broken down, traffic is −3% and average check +11%. The most sensible reading?',
    options: ['Business keeps getting better', 'All the growth is price, and fewer people are coming — how long the price increases can last is a question mark', 'Traffic doesn’t matter', 'The numbers are wrong'],
    correct: 1,
    explain: 'In 2022–2023 many restaurants’ same-store growth was almost entirely price while traffic fell. The total hides that signal; splitting volume and price reveals it.',
  },
  {
    type: 'fill',
    before: 'Two bubble-tea shops both grow revenue 20%: shop A has 20% more customers; shop B has the same customers and raised every price 20%. More likely to keep growing next year:',
    after: '.',
    options: ['shop A', 'shop B', 'both equally', 'can’t tell'],
    correct: 0,
    explain: 'Shop A’s growth comes from more people choosing to come, and it can keep winning new ones; if shop B raises prices again, customers may start leaving. Same growth rate, different source, different future.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Make the first cut: volume or price',
    body: 'Three lines to take with you:',
    display: 'revenue = volume × price',
    bullets: [
      'Any growth splits into volume and price',
      'Eight years of iPhone growth was almost all price',
      'Price growth has limited uses; volume growth has a ceiling',
    ],
    footer: 'Next lesson: why did iPhone volume stop growing? Find the ceiling.',
  },
];
