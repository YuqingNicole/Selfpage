import type { LessonStep } from '../optionsCourse';
import { usdEn, usdZh } from './fmt';

/**
 * 投资主线 第 17 单元第 1 课「五步因果图」。
 * 2024 年微软、谷歌、亚马逊、Meta 资本开支合计约 $2,300 亿；英伟达 FY2025 数据中心收入约 $1,150 亿，
 * 大客户约占一半。计算器沿着因果图的两个箭头往下推：资本开支 × 花在 AI 芯片上的比例 × 英伟达份额。
 */

const NV_SHARE = 0.8;

const chain = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '沿着因果图往下推：四家云巨头的资本开支，有多少花在 AI 芯片上，其中多少流向英伟达？拖动两个假设，看英伟达能从这四家拿到多少收入。'
    : 'Follow the causal chain down: of the four cloud giants’ capex, how much goes to AI chips, and how much of that to Nvidia? Drag the two assumptions and see how much revenue Nvidia gets from these four.',
  display: zh ? '资本开支 × 芯片占比 × 英伟达份额（约 80%）' : 'capex × chip share × Nvidia share (~80%)',
  inputs: [
    { key: 'c', label: zh ? '四家云巨头资本开支' : 'Big-four cloud capex', min: 1000e8, max: 4000e8, step: 100e8, start: 2300e8, format: (v) => (zh ? usdZh(v) : usdEn(v)) },
    { key: 's', label: zh ? '其中花在 AI 芯片上' : 'Share spent on AI chips', min: 10, max: 50, step: 5, start: 30, format: (v) => `${v}%` },
  ],
  outputs: [
    { label: zh ? '英伟达从这四家拿到的收入' : 'Nvidia revenue from these four', value: (v) => (v.c * v.s * NV_SHARE) / 100, format: (n) => (zh ? usdZh(n) : usdEn(n)), main: true },
  ],
  visit: { c: [1500e8, 3500e8] },
  explain: zh
    ? '按 $2,300 亿 × 30% × 80% ≈ $550 亿，大约是英伟达数据中心收入（约 $1,150 亿）的一半，和它披露的大客户占比对得上。每个箭头都是一个能逐季核对的假设：云巨头的资本开支指引一变，下游所有数字都要跟着重算。'
    : '$230B × 30% × 80% ≈ $55B — about half of Nvidia’s data center revenue (around $115B), which matches its disclosed big-customer share. Every arrow is a hypothesis you can check each quarter: when the cloud giants change capex guidance, every number downstream has to be redone.',
});

export const i17l1StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个场景',
    title: '一条街上的奶茶店火了',
    body: '奶茶店排起长队。供货的珍珠厂、封口膜厂、外卖平台都跟着忙起来。全城只有一家珍珠厂，订单排到三个月后，于是它坐地起价。\n\n想分这条街的钱，该投哪一家？',
  },
  {
    type: 'choice',
    question: '按这个故事，利润最厚的最可能是谁？',
    options: ['排队最长的奶茶店', '全城唯一、订单排满的珍珠厂：供不应求的环节说了算', '外卖平台', '封口膜厂'],
    correct: 1,
    explain: '热闹在需求端，利润却流向卡脖子的环节。产业分析要找的就是这个环节。',
  },
  {
    type: 'concept',
    kicker: '起个名字',
    title: '五步因果图',
    body: '产业分析的骨架是一条单向的链：',
    display: '需求 → 产业链 → 瓶颈 → 盈利 → 股价',
    bullets: [
      '需求：谁在花钱，花得多快',
      '产业链和瓶颈：钱流经哪些环节，哪个供不应求',
      '盈利：瓶颈环节拿走超额利润',
      '股价：最后一环，不是证据',
    ],
  },
  chain(true),
  {
    type: 'match',
    prompt: '把 AI 行情的五步和对应的事实对上',
    pairs: [
      ['需求', '云巨头一年约 $2,300 亿资本开支'],
      ['瓶颈', '先进芯片产能供不应求'],
      ['盈利', '英伟达毛利率约 75%'],
      ['股价', '市值突破 $3 万亿'],
    ],
  },
  {
    type: 'choice',
    question: '「这个板块最近涨得很好，说明行业需求一定爆发了。」问题在哪？',
    options: ['没问题', '倒果为因：股价是链条的最后一环，从涨跌反推需求只会追涨杀跌', '应该看成交量', '涨幅还不够大'],
    correct: 1,
    explain: '从需求推到股价可以下判断；从股价反推需求，只是给行情找理由。',
  },
  {
    type: 'fill',
    before: '因果图上每个箭头都是一个可以验证的',
    after: '：分析的深度不在图画多大，而在每个箭头有没有数据支撑。',
    options: ['假设', '结论', '情绪', '秘密'],
    correct: 0,
    explain: '「云巨头资本开支 → 芯片订单」可以用台积电月度收入、内存合约价逐季核对。这就是把 L4 的证据分级用在产业上。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '先画图，后看价',
    body: '三句话带走：',
    display: '需求 → 产业链 → 瓶颈 → 盈利 → 股价',
    bullets: [
      '箭头方向不能反',
      '每个箭头都要能被数据核对',
      '链条人人画得出，瓶颈才分高下',
    ],
    footer: '下一课：同一条链上，利润怎么分？',
  },
];

export const i17l1StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A scene',
    title: 'A bubble tea shop takes off',
    body: 'Lines form outside a bubble tea shop. The tapioca supplier, the lid-film maker and the delivery app all get busy. There’s only one tapioca factory in town, booked three months out, so it raises prices at will.\n\nIf you want a share of this street’s money, which business do you back?',
  },
  {
    type: 'choice',
    question: 'In this story, who most likely earns the fattest profit?',
    options: ['The shop with the longest line', 'The town’s only tapioca factory, fully booked: the link in short supply calls the shots', 'The delivery app', 'The lid-film maker'],
    correct: 1,
    explain: 'The buzz is on the demand side, but profit flows to the choke point. Industry analysis is about finding that link.',
  },
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'A five-step causal map',
    body: 'The backbone of industry analysis is a one-way chain:',
    display: 'demand → supply chain → bottleneck → profit → stock price',
    bullets: [
      'Demand: who is spending, and how fast',
      'Chain and bottleneck: which links the money flows through, which is short',
      'Profit: the bottleneck link takes the excess profit',
      'Stock price: the last link, not evidence',
    ],
  },
  chain(false),
  {
    type: 'match',
    prompt: 'Match the five steps of the AI boom to the facts',
    pairs: [
      ['Demand', 'Cloud giants’ ~$230B a year of capex'],
      ['Bottleneck', 'Advanced chip capacity sold out'],
      ['Profit', 'Nvidia gross margin around 75%'],
      ['Stock price', 'Market cap above $3 trillion'],
    ],
  },
  {
    type: 'choice',
    question: '“This sector has rallied hard lately, so industry demand must be booming.” What’s wrong?',
    options: ['Nothing', 'Cause and effect reversed: price is the last link, and inferring demand from price moves just chases rallies', 'Should look at volume', 'The rally isn’t big enough yet'],
    correct: 1,
    explain: 'Reasoning from demand to price lets you make a judgment; reasoning from price back to demand just finds excuses for the move.',
  },
  {
    type: 'fill',
    before: 'Every arrow on a causal map is a testable',
    after: ': depth isn’t about the size of the map, but whether each arrow has data behind it.',
    options: ['hypothesis', 'conclusion', 'feeling', 'secret'],
    correct: 0,
    explain: '“Cloud capex → chip orders” can be checked every quarter against TSMC’s monthly revenue and memory contract prices. That’s L4’s evidence grading applied to an industry.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Map first, price later',
    body: 'Three lines to take with you:',
    display: 'demand → chain → bottleneck → profit → price',
    bullets: [
      'The arrows only point one way',
      'Every arrow must be checkable with data',
      'Anyone can draw the chain; the bottleneck is what separates analysts',
    ],
    footer: 'Next lesson: on the same chain, how is the profit split?',
  },
];
