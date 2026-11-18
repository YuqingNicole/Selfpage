import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 20 单元第 3 课「毕业演练：拿到陌生行业怎么下手」。
 * 全课程最后一课：把 L1–L5 的工具合成五步动作，用一张案例卡做演练，不用计算器。
 */

export const i20l3StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '最后一课',
    title: '朋友说：「这个行业要起飞了」',
    body: '朋友推荐了一个你完全陌生的热门行业，说它「要起飞了」，相关股票已经涨了一倍。\n\n你不需要懂每一个行业。你需要的是一套拿到任何行业都能用的动作。',
  },
  {
    type: 'choice',
    question: '按这门课的纪律，正确的第一步是？',
    options: ['先买一点，边持有边研究', '先画因果图：需求谁付钱、链条有哪些环节、瓶颈在哪。画不出来，就说明它在能力圈外', '看谁推荐得多', '等它回调再买'],
    correct: 1,
    explain: '「先图后价」是 L5 的第一条纪律。画不出图时，「不做」也是一个判断。',
  },
  {
    type: 'concept',
    kicker: '毕业清单',
    title: '陌生行业五步',
    body: '前四步看行业，第五步回到 L4 流程（thesis → 证据 → 证伪 → 仓位）。没有新知识，是全部工具的一次总装：',
    bullets: [
      '① 画因果图，找瓶颈（第 17 单元）',
      '② 找到这一行要看的关键数字（第 7 单元）',
      '③ 判断现在是周期还是结构，处在哪个位置（第 7、11 单元）',
      '④ 看格局和可替代性，利润流向谁（第 17、18 单元）',
    ],
  },
  {
    type: 'match',
    prompt: '把每一步和它来自的课程对上',
    pairs: [
      ['画因果图找瓶颈', '第 17 单元 · 产业方法'],
      ['定位关键指标', '第 7 单元 · 行业指标'],
      ['判断周期还是结构', '第 11 单元 · 边际变化'],
      ['写 thesis、设证伪', 'L4 · 研究习惯'],
    ],
  },
  {
    type: 'choice',
    question: '读这张案例卡。按五步走完，最合理的结论是？',
    display: '行业：某新材料\n需求：下游装机三年翻倍，预计继续增长\n格局：两年内新进入者从 5 家增加到 40 家\n价格：产品单价一年下降 35%\n股价：板块一年上涨 120%',
    options: ['需求翻倍，闭眼买入', '需求是真的，但门槛低、产能涌入、价格在跌：利润很可能被挤走，而股价已经按「需求」定价了。不碰，或者只盯少数有成本优势的公司', '应该做空所有公司', '信息不够，随便买一点'],
    correct: 1,
    explain: '这正是光伏、锂电走过的路：需求和利润背离。需求的方向对，不代表股价的位置对。',
  },
  {
    type: 'tf',
    statement: '「这个行业我看不懂」是一个合法且有价值的研究结论。',
    answer: true,
    explain: '正确。巴菲特错过了互联网早期，照样复利了几十年。能力圈外的行业，最好的仓位是零——这是纪律，不是胆小。',
  },
  {
    type: 'concept',
    kicker: '投资主线 · 全部完成',
    title: '剩下的路，你自己开',
    body: '这门课的承诺从来不是让你赚钱，而是：',
    display: '不再只靠消息、KOL 和情绪做决定',
    bullets: [
      'L1–L2：看懂市场语言和公司',
      'L3：看懂市场在交易什么',
      'L4–L5：用流程做判断，再迁移到任何行业',
    ],
    footer: '判断力的复利，从你写下的第一份投资逻辑开始。🎓',
  },
];

export const i20l3StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'The last lesson',
    title: 'A friend says: “This industry is about to take off”',
    body: 'A friend recommends a hot industry you know nothing about. They say it’s “about to take off”, and the related stocks have already doubled.\n\nYou don’t need to understand every industry. You need a set of moves that works on any of them.',
  },
  {
    type: 'choice',
    question: 'By this course’s discipline, what’s the right first step?',
    options: ['Buy a little and research while holding', 'Draw the causal map first: who pays, what links the chain has, where the bottleneck is. If you can’t draw it, it’s outside your circle of competence', 'See who recommends it most', 'Wait for a pullback, then buy'],
    correct: 1,
    explain: '“Map first, price later” is L5’s first rule. When you can’t draw the map, “do nothing” is also a judgment.',
  },
  {
    type: 'concept',
    kicker: 'Graduation checklist',
    title: 'Five steps for an unfamiliar industry',
    body: 'The first four read the industry; the fifth returns to the L4 process (thesis → evidence → disproving conditions → size). Nothing new — every tool assembled at once:',
    bullets: [
      '① Draw the causal map, find the bottleneck (Unit 17)',
      '② Find the key numbers for this industry (Unit 7)',
      '③ Decide whether it’s cyclical or structural, and where it stands (Units 7 and 11)',
      '④ Check structure and replaceability — who gets the profit (Units 17–18)',
    ],
  },
  {
    type: 'match',
    prompt: 'Match each step to the lessons it comes from',
    pairs: [
      ['Map the chain, find the bottleneck', 'Unit 17 · Industry method'],
      ['Find the key metrics', 'Unit 7 · Industry metrics'],
      ['Cyclical or structural', 'Unit 11 · Change at the margin'],
      ['Write a thesis, set disproving conditions', 'L4 · Research habits'],
    ],
  },
  {
    type: 'choice',
    question: 'Read this case card. After the five steps, what’s the most reasonable conclusion?',
    display: 'Industry: a new material\nDemand: downstream installs doubled in 3 years, still growing\nStructure: entrants went from 5 to 40 in two years\nPrice: unit price down 35% in a year\nStocks: sector up 120% in a year',
    options: ['Demand doubled — buy blindly', 'Demand is real, but low barriers, flooding capacity and falling prices mean profit will likely be squeezed out, while stocks are already priced on “demand”. Stay out, or watch only the few with a cost advantage', 'Short every company', 'Not enough info, buy a little anyway'],
    correct: 1,
    explain: 'This is the road solar and lithium batteries traveled: demand and profit diverging. Being right about demand’s direction doesn’t make the stock price right.',
  },
  {
    type: 'tf',
    statement: '“I don’t understand this industry” is a legitimate and valuable research conclusion.',
    answer: true,
    explain: 'True. Buffett missed the early internet and still compounded for decades. For industries outside your circle, the best position size is zero — that’s discipline, not timidity.',
  },
  {
    type: 'concept',
    kicker: 'Investing track · complete',
    title: 'The rest of the road is yours to drive',
    body: 'This course never promised to make you money. It promised this:',
    display: 'no longer deciding on news, influencers and mood alone',
    bullets: [
      'L1–L2: the market’s language, and companies',
      'L3: what the market is actually trading',
      'L4–L5: judge by process, then carry it to any industry',
    ],
    footer: 'Compounding judgment starts with the first thesis you write down. 🎓',
  },
];
