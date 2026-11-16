import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 6 单元第 3 课「第二曲线：新业务何时值得定价」。
 * 亚马逊 2015 年首次单独披露 AWS（近似值）：AWS 收入约 $79 亿、营业利润约 $19 亿；
 * 亚马逊全年收入约 $1,070 亿、营业利润约 $22 亿。股价 2015 年涨了一倍多。
 */

const AWS_REV = 7.9;
const AMZN_REV = 107;
const AWS_OI = 1.86;
const AMZN_OI = 2.23;

const share = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'target',
  prompt: zh
    ? 'AWS 只占亚马逊 2015 年收入的约 7%。按下面两个数字，它占全公司营业利润的百分之几？先心算，再拖到你的答案。'
    : 'AWS was only about 7% of Amazon’s 2015 revenue. Using the two numbers below, what share of the whole company’s operating profit did it make? Work it out, then drag to your answer.',
  display: zh ? 'AWS 营业利润约 $19 亿 ÷ 亚马逊营业利润约 $22 亿' : 'AWS operating profit ≈ $1.9B ÷ Amazon operating profit ≈ $2.2B',
  inputs: [{ key: 'guess', label: zh ? '你的答案' : 'Your answer', min: 0, max: 100, step: 1, start: 10, format: (v) => `${v}%` }],
  outputs: [
    { label: zh ? 'AWS 占营业利润' : 'AWS share of operating profit', value: () => AWS_OI / AMZN_OI, format: (n) => `${(n * 100).toFixed(0)}%`, main: true },
    { label: zh ? 'AWS 占收入' : 'AWS share of revenue', value: () => AWS_REV / AMZN_REV, format: (n) => `${(n * 100).toFixed(0)}%` },
  ],
  target: { key: 'guess', answer: 83, tolerance: 6, hideOutputs: true },
  explain: zh
    ? '约 83%。7% 的收入贡献了八成多的利润——零售那 93% 的收入几乎不赚钱。披露之前，这块高利润业务藏在低利润零售里，市场没法单独给它标价。'
    : 'About 83%. Seven percent of revenue produced over 80% of the profit — the other 93%, retail, barely made money. Before disclosure, this high-profit business was buried inside low-margin retail, and the market couldn’t price it on its own.',
});

export const i6l3StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一次披露',
    title: '一张新报表，股价翻倍',
    body: '2015 年 4 月，亚马逊第一次在财报里把 AWS（云计算）单独列出来：收入、增速、利润率都公开了。\n\n业务本身没有一夜之间变化，可亚马逊的股价那一年涨了一倍多。',
  },
  share(true),
  {
    type: 'choice',
    question: '业务没变，只是披露了数字，为什么能让股价重估？',
    options: ['披露改变了业务本身', '市场第一次能单独给这块高利润、高增长的业务标价，不再把它当成低利润零售的一部分', '纯属巧合', '因为发了新闻稿'],
    correct: 1,
    explain: '「藏在报表里的好业务」被拆出来的那一刻，就是重新定价的开关。要留意管理层开始单独披露什么。',
  },
  {
    type: 'concept',
    kicker: '起个名字',
    title: '第二曲线',
    body: '主业饱和之后，成熟公司的再增长几乎都来自一条新曲线：',
    bullets: [
      '亚马逊：电商 → AWS',
      '苹果：iPhone → 服务（上一课的饱和之后）',
      '英伟达：游戏显卡 → 数据中心 GPU',
      '好的第二曲线复用主业的核心资产，而不是另起炉灶',
    ],
  },
  {
    type: 'tf',
    statement: '判断第二曲线的成色，关键之一是新业务是否复用了主业的核心资产和能力。',
    answer: true,
    explain: '正确。AWS 复用的是亚马逊为电商建的机房和运维能力；英伟达把 CUDA 生态从游戏搬到 AI。复用核心资产的新业务，胜率远高于跨界下注。',
  },
  {
    type: 'choice',
    question: '一家增长放缓的公司高调宣布进军热门新赛道。最理性的第一反应是？',
    options: ['立刻按新赛道估值', '先查三件事：投入是否真实（资本开支、招聘）、是否复用核心能力、什么时候会单独披露数据', '直接忽略', '看对手跟不跟'],
    correct: 1,
    explain: 'Meta 2021 年改名、押注元宇宙，几年下来亏损数百亿美元后把重心转向 AI；微软 Azure 用十年的数据证明了自己。差别在证据。',
  },
  {
    type: 'match',
    prompt: '把公司和它的第二曲线对上',
    pairs: [
      ['亚马逊', 'AWS 云计算'],
      ['苹果', 'App Store、iCloud 等服务'],
      ['英伟达', '数据中心 GPU'],
      ['微软', 'Azure 云'],
    ],
  },
  {
    type: 'concept',
    kicker: '这一单元你学会了',
    title: '增长的来源决定增长的质量',
    body: '三课合起来：',
    display: '量 × 价 → S 曲线 → 第二曲线',
    bullets: [
      '先拆量和价，看增长靠什么',
      '再看渗透率，判断还剩多少空间',
      '主业见顶后，盯第二曲线的证据和披露',
    ],
    footer: '下一单元：每个行业盯的数字都不同——订阅看留存，零售看同店，芯片看库存。',
  },
];

export const i6l3StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A disclosure',
    title: 'One new table, and the stock doubled',
    body: 'In April 2015 Amazon broke out AWS (cloud computing) in its results for the first time: revenue, growth and margins, all public.\n\nThe business didn’t change overnight, yet Amazon’s stock more than doubled that year.',
  },
  share(false),
  {
    type: 'choice',
    question: 'The business didn’t change — only the numbers were disclosed. Why did that reprice the stock?',
    options: ['Disclosure changed the business', 'For the first time the market could price this high-profit, fast-growing business on its own instead of as part of low-margin retail', 'Pure coincidence', 'Because of the press release'],
    correct: 1,
    explain: 'The moment a great business hidden inside the financials gets broken out is the switch for repricing. Watch what management starts disclosing separately.',
  },
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'The second curve',
    body: 'Once the core business saturates, a mature company’s next growth almost always comes from a new curve:',
    bullets: [
      'Amazon: e-commerce → AWS',
      'Apple: iPhone → services (after last lesson’s saturation)',
      'Nvidia: gaming GPUs → data center GPUs',
      'A good second curve reuses the core business’s key assets instead of starting from scratch',
    ],
  },
  {
    type: 'tf',
    statement: 'One key test of a second curve is whether the new business reuses the core business’s assets and capabilities.',
    answer: true,
    explain: 'True. AWS reused the data centers and operations Amazon built for e-commerce; Nvidia carried its CUDA ecosystem from gaming to AI. New businesses that reuse core assets win far more often than leaps into unrelated fields.',
  },
  {
    type: 'choice',
    question: 'A slowing company loudly announces a move into a hot new field. The most rational first reaction?',
    options: ['Value it as a new-field company right away', 'Check three things first: is the investment real (capex, hiring), does it reuse core capabilities, and when will it disclose separate numbers', 'Ignore it', 'See whether rivals follow'],
    correct: 1,
    explain: 'Meta renamed itself in 2021 and bet on the metaverse; after tens of billions in losses it shifted focus to AI. Microsoft’s Azure proved itself with a decade of numbers. The difference is evidence.',
  },
  {
    type: 'match',
    prompt: 'Match each company to its second curve',
    pairs: [
      ['Amazon', 'AWS cloud computing'],
      ['Apple', 'App Store, iCloud and other services'],
      ['Nvidia', 'Data center GPUs'],
      ['Microsoft', 'Azure cloud'],
    ],
  },
  {
    type: 'concept',
    kicker: 'What you learned this unit',
    title: 'Where growth comes from decides its quality',
    body: 'The three lessons together:',
    display: 'volume × price → S-curve → second curve',
    bullets: [
      'First split volume and price to see what drives growth',
      'Then check penetration to judge how much room is left',
      'Once the core peaks, watch the second curve’s evidence and disclosure',
    ],
    footer: 'Next unit: every industry watches different numbers — retention for subscriptions, same-store sales for retail, inventory for chips.',
  },
];
