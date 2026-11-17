import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 12 单元第 3 课「合体演练：完整读一次市场」。
 * 把 L3 四个单元合成一张四问检查单：预期 → 尺子 → 边际 → 叙事。
 * 这一课用两个案例卡（choice.display）做诊断练习，不用计算器。
 */

export const i12l3StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '最后一课',
    title: '「业绩很好，股价却跌」',
    body: '这是新手最常问的问题。L3 的四个单元，其实给出了四个不同的答案。\n\n这一课把它们合成一张检查单，再拿两个案例练一遍。',
  },
  {
    type: 'match',
    prompt: '把「业绩好但股价跌」的四种原因和对应的单元对上',
    pairs: [
      ['乐观预期早已计价', '第 9 单元 · 预期'],
      ['市场换了一把估值尺', '第 10 单元 · 倍数'],
      ['增速还高但在减速', '第 11 单元 · 边际'],
      ['市场的主线故事换了', '第 12 单元 · 叙事'],
    ],
  },
  {
    type: 'concept',
    kicker: '检查单',
    title: '读行情的四问',
    body: '按这个顺序问：',
    display: '预期 → 尺子 → 边际 → 叙事',
    bullets: [
      '预期：价格里已经装了什么？',
      '尺子：市场用什么倍数量它，会不会换？',
      '边际：最新变化的方向和速度？',
      '叙事：主线故事在周期的哪一段？',
    ],
  },
  {
    type: 'choice',
    question: '读这个案例。用四问检查，最不可能的解释是哪一个？',
    display: '财报：收入 +35%，超预期；指引稳健\n财报前一个月：股价已涨 25%\n财报后两周：股价阴跌 15%',
    options: ['财报前已大涨，乐观预期计价充分', '利率上行，板块倍数整体收缩', '增速虽高但比上季慢，市场提前定价减速', '公司基本面一定出了重大问题'],
    correct: 3,
    explain: '前三个都是「业绩好、股价跌」的标准机制；「基本面一定出了问题」反而和案例里的好财报矛盾。这套框架的价值，就是不把每一次下跌都归因于基本面。',
  },
  {
    type: 'choice',
    question: '再读一个案例。四问框架怎么解释？',
    display: '时间：熊市已持续一年\n财报：利润同比 −20%，仍在下滑，但比上季降得少\n股价：财报当天 +6%，此后不再创新低',
    options: ['市场失灵', '恐慌已经计价 + 恶化在减速：坏消息不再能砸出新低，是底部最可靠的形态之一', '业绩差是利好', '纯属反弹，很快会跌回去'],
    correct: 1,
    explain: '2009 年 3 月、2020 年 3 月、2022 年 10 月的底部都长这样：数据仍难看，但「利空钝化」说明卖方的弹药打完了。',
  },
  {
    type: 'tf',
    statement: '「业绩很差但股价涨」也能用同一套四问解释：恐慌已计价、换上了更宽容的尺、恶化在减速、新叙事萌芽。',
    answer: true,
    explain: '正确。买卖双方用的是同一套框架的两面。会解释上涨，也就会解释下跌。',
  },
  {
    type: 'concept',
    kicker: 'L3 看懂市场在交易什么 · 完成',
    title: '从看行情到做判断',
    body: '解释不是目的，纪律才是：',
    display: '预期 → 尺子 → 边际 → 叙事',
    bullets: [
      '四问各写一行，就是一份投资逻辑的骨架',
      '每季对一次账，验证或证伪',
      '这是 L4 的地基',
    ],
    footer: '下一阶段 L4：形成自己的研究习惯——写投资逻辑、设证伪条件、做复盘。',
  },
];

export const i12l3StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'The last lesson',
    title: '“Great results, so why did the stock fall?”',
    body: 'It’s the question beginners ask most. L3’s four units actually give four different answers.\n\nThis lesson combines them into one checklist, then practices it on two cases.',
  },
  {
    type: 'match',
    prompt: 'Match the four reasons for “great results, falling stock” to their units',
    pairs: [
      ['Optimism was already priced in', 'Unit 9 · Expectations'],
      ['The market switched valuation yardsticks', 'Unit 10 · Multiples'],
      ['Growth still high but slowing', 'Unit 11 · Change at the margin'],
      ['The market’s main story changed', 'Unit 12 · Narrative'],
    ],
  },
  {
    type: 'concept',
    kicker: 'Checklist',
    title: 'Four questions for reading the market',
    body: 'Ask them in this order:',
    display: 'expectations → yardstick → margin → narrative',
    bullets: [
      'Expectations: what’s already in the price?',
      'Yardstick: what multiple is the market using, and will it change?',
      'Margin: what’s the direction and speed of the latest change?',
      'Narrative: where is the main story in its cycle?',
    ],
  },
  {
    type: 'choice',
    question: 'Read this case. Using the four questions, which explanation is least likely?',
    display: 'Results: revenue +35%, a beat; steady guidance\nMonth before results: stock already up 25%\nTwo weeks after: stock drifts down 15%',
    options: ['It ran up before results, so optimism was fully priced', 'Rising rates shrank the whole sector’s multiples', 'Growth is high but slower than last quarter, and the market priced in the slowdown', 'The company’s fundamentals must have seriously deteriorated'],
    correct: 3,
    explain: 'The first three are standard mechanisms for “good results, falling stock”; “fundamentals must have deteriorated” actually contradicts the strong report in the case. The value of this frame is not blaming every drop on fundamentals.',
  },
  {
    type: 'choice',
    question: 'Another case. How does the four-question frame explain it?',
    display: 'Context: a bear market for a year\nResults: profit −20% year over year, still falling, but less than last quarter\nStock: +6% on the day, no new lows since',
    options: ['The market is broken', 'Fear already priced + deterioration slowing: bad news can no longer push to new lows — one of the most reliable bottom patterns', 'Bad results are good news', 'Just a bounce that will fade'],
    correct: 1,
    explain: 'The bottoms of March 2009, March 2020 and October 2022 all looked like this: the data was still ugly, but bad news losing its bite showed sellers had run out of ammunition.',
  },
  {
    type: 'tf',
    statement: '“Bad results, rising stock” can be explained with the same four questions: fear priced in, a more forgiving yardstick, deterioration slowing, a new narrative emerging.',
    answer: true,
    explain: 'True. Buyers and sellers use two sides of the same frame. If you can explain the rise, you can explain the fall.',
  },
  {
    type: 'concept',
    kicker: 'L3 What the market is trading · complete',
    title: 'From watching markets to making judgments',
    body: 'Explaining isn’t the goal; discipline is:',
    display: 'expectations → yardstick → margin → narrative',
    bullets: [
      'One line per question is the skeleton of an investment thesis',
      'Audit it each quarter to confirm or disprove it',
      'This is the foundation of L4',
    ],
    footer: 'Next stage, L4: building your own research habits — writing a thesis, setting conditions that would prove it wrong, and reviewing.',
  },
];
