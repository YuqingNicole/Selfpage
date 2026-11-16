import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 6 单元第 2 课「渗透率与天花板」。
 * 沿用苹果：智能手机渗透率 2010 年代中期见顶，iPhone 销量停在约 2.3 亿部，苹果把增长叙事切到服务。
 * 对照：电动车全球渗透率 2020 年约 5% → 2023 年约 18%（中国超 35%）。
 * 计算器：简化的 S 曲线，每年新增渗透率 = k × p × (1 − p)，k = 0.6。
 */

const K = 0.6;

const sCurve = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '一个新产品的普及速度，取决于已经用上的人（口碑）和还没用上的人（空间）。拖动当前渗透率，看今年能新增多少。'
    : 'How fast a new product spreads depends on people who already have it (word of mouth) and people who don’t yet (room to grow). Drag the current penetration and see how much it adds this year.',
  display: zh ? '今年新增 ≈ 0.6 × 已用上的比例 × 还没用上的比例' : 'added this year ≈ 0.6 × share who have it × share who don’t',
  inputs: [
    { key: 'p', label: zh ? '当前渗透率' : 'Current penetration', min: 2, max: 98, step: 1, start: 5, format: (v) => `${v}%` },
  ],
  outputs: [
    { label: zh ? '今年新增渗透率' : 'Penetration added this year', value: (v) => K * (v.p / 100) * (1 - v.p / 100), format: (n) => `+${(n * 100).toFixed(1)} pt`, main: true },
    {
      label: zh ? '用户数增速' : 'User growth rate',
      value: (v) => K * (1 - v.p / 100),
      format: (n) => `+${(n * 100).toFixed(0)}%`,
    },
    {
      label: zh ? '处在哪一段' : 'Stage',
      value: (v) => v.p,
      format: (n) => (n < 15 ? (zh ? '早期：慢' : 'Early: slow') : n <= 70 ? (zh ? '中段：爆发' : 'Middle: takeoff') : zh ? '饱和：见顶' : 'Saturated: topping out'),
    },
  ],
  visit: { p: [10, 85] },
  explain: zh
    ? '新增量在 50% 附近最大：一边有足够多的人在用、在传播，一边还有足够多的人没用。过了 80%，就算口碑再好也没多少人可拉了——智能手机在 2010 年代中期就走到了这里。'
    : 'New adoption peaks around 50%: enough people use it and spread the word, and enough still don’t have it. Past 80% there’s hardly anyone left to win, however good the word of mouth — smartphones got there in the mid-2010s.',
});

export const i6l2StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个问题',
    title: 'iPhone 的销量为什么不涨了',
    body: '2007–2015 年，iPhone 销量从几百万部涨到约 2.3 亿部。之后八年，它就停在那里了。\n\n产品没有变差，苹果也没少花营销费。问题出在别的地方。',
  },
  {
    type: 'choice',
    question: '最可能的原因是？',
    options: ['苹果不想多卖', '想买智能手机的人几乎都已经有了，剩下的只能靠换机', '工厂产能不够', '竞争对手禁止它销售'],
    correct: 1,
    explain: '在发达市场，智能手机在 2010 年代中期就几乎人手一部。没有新用户可拉，销量就只能跟着换机周期上下波动。',
  },
  sCurve(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: 'S 曲线与渗透率',
    body: '新产品的普及大多走一条 S 形曲线：',
    bullets: [
      '渗透率：已经用上的人 ÷ 所有可能用的人',
      '早期慢，中段爆发，饱和后骤停',
      '天花板 = 总潜在市场（TAM）',
      '判断公司在曲线哪一段，比判断它「好不好」更重要',
    ],
  },
  {
    type: 'choice',
    question: '2023 年全球电动车渗透率约 18%（中国超 35%），智能手机超过 80%。按 S 曲线，它们分别处在哪一段？',
    options: ['都在爆发段', '电动车在中段爆发期，智能手机在饱和段', '都饱和了', '电动车已经饱和'],
    correct: 1,
    explain: '同样是大产业，在曲线上的位置不同，增长逻辑完全不同：电动车还在抢新用户，手机只能靠换机和提价。',
  },
  {
    type: 'tf',
    statement: '公司宣称的 TAM（总潜在市场）越大，投资价值就越高。',
    answer: false,
    explain: '错误。WeWork 把「全球所有办公需求」都算进 TAM，估值一度 $470 亿，后来破产重组。TAM 要打折看：真正能服务、能赢下的部分有多大？',
  },
  {
    type: 'fill',
    before: '渗透率过了一半之后，增长要从「拉新用户」切换到',
    after: '——苹果发力服务就是这么做的。',
    options: ['提价或新品类', '更多广告', '裁员', '回购股票'],
    correct: 0,
    explain: '饱和之后，增长来自每个用户多花多少钱，而不是用户多了多少。苹果在同一批 iPhone 用户身上卖 iCloud、Apple Music 和 App Store 抽成。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '先看在曲线的哪一段',
    body: '三句话带走：',
    display: '早期慢 → 中段爆发 → 饱和骤停',
    bullets: [
      '新增量在渗透率 50% 附近最大',
      'TAM 要打折看，不是越大越好',
      '饱和之后，增长靠提价和新品类',
    ],
    footer: '下一课：长出一条新曲线——亚马逊的 AWS 是怎么被市场重新定价的。',
  },
];

export const i6l2StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A question',
    title: 'Why did iPhone volume stop growing?',
    body: 'From 2007 to 2015, iPhone sales went from a few million to about 230 million. For the next eight years they stayed there.\n\nThe product didn’t get worse, and Apple didn’t cut marketing. The problem was elsewhere.',
  },
  {
    type: 'choice',
    question: 'The most likely reason?',
    options: ['Apple didn’t want to sell more', 'Almost everyone who wanted a smartphone already had one, so sales depended on upgrades', 'Not enough factory capacity', 'Rivals blocked its sales'],
    correct: 1,
    explain: 'In developed markets, nearly everyone had a smartphone by the mid-2010s. With no new users to win, volume just follows the upgrade cycle.',
  },
  sCurve(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'The S-curve and penetration',
    body: 'Most new products spread along an S-shaped curve:',
    bullets: [
      'Penetration: people who have it ÷ everyone who could',
      'Slow early, takeoff in the middle, a sudden stop at saturation',
      'The ceiling is the total addressable market (TAM)',
      'Knowing where a company sits on the curve matters more than whether it’s “good”',
    ],
  },
  {
    type: 'choice',
    question: 'In 2023 global EV penetration was about 18% (over 35% in China); smartphones were over 80%. Where is each on the S-curve?',
    options: ['Both in takeoff', 'EVs in the middle takeoff, smartphones saturated', 'Both saturated', 'EVs are saturated'],
    correct: 1,
    explain: 'Both are huge industries, but different spots on the curve mean completely different growth logic: EVs are still winning new users; phones rely on upgrades and price.',
  },
  {
    type: 'tf',
    statement: 'The bigger the TAM a company claims, the better the investment.',
    answer: false,
    explain: 'False. WeWork counted “all office demand on Earth” as its TAM, was once valued at $47 billion, and later went bankrupt. Discount the TAM: how much can it really serve and win?',
  },
  {
    type: 'fill',
    before: 'Once penetration passes half, growth has to switch from “winning new users” to',
    after: ' — exactly what Apple did with services.',
    options: ['raising prices or new categories', 'more advertising', 'layoffs', 'buybacks'],
    correct: 0,
    explain: 'After saturation, growth comes from how much more each user spends, not how many users are added. Apple sells iCloud, Apple Music and App Store commissions to the same iPhone owners.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'First find the spot on the curve',
    body: 'Three lines to take with you:',
    display: 'slow early → takeoff → sudden stop',
    bullets: [
      'New adoption peaks near 50% penetration',
      'Discount the TAM — bigger isn’t automatically better',
      'After saturation, growth comes from price and new categories',
    ],
    footer: 'Next lesson: growing a new curve — how the market repriced Amazon’s AWS.',
  },
];
