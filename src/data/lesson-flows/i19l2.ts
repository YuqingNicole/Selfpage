import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 19 单元第 2 课「电动车链：电池、锂价与价格战」。
 * 中国碳酸锂现货（近似）：2020 年约 ¥4 万/吨 → 2022 年 11 月近 ¥60 万 → 2024 年跌到 ¥10 万以下。
 * 计算器（简化）：一辆 60 kWh 电池的车约用 36 kg 碳酸锂当量（约 0.6 kg/kWh），车价按 ¥15 万算。
 */

const KG = 36;
const CAR = 150000;

const lithium = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '一辆电动车的电池大约要用 36 kg 碳酸锂。拖动碳酸锂价格，看每辆车要为锂付多少钱，占 ¥15 万车价的多少。'
    : 'An EV’s battery uses about 36 kg of lithium carbonate. Drag the lithium price and see how much each car pays for lithium, and what share of a ¥150,000 car that is.',
  display: zh ? '每辆车的锂成本 = 36 kg × 碳酸锂价格' : 'lithium cost per car = 36 kg × lithium carbonate price',
  inputs: [{ key: 'p', label: zh ? '碳酸锂价格（万元 / 吨）' : 'Lithium carbonate (¥ / tonne)', min: 4, max: 60, step: 1, start: 4, format: (v) => (zh ? `¥${v} 万` : `¥${v * 10}K`) }],
  outputs: [
    { label: zh ? '每辆车的锂成本' : 'Lithium cost per car', value: (v) => KG * v.p * 10, format: (n) => `¥${Math.round(n).toLocaleString('en-US')}`, main: true },
    { label: zh ? '占车价' : 'Share of car price', value: (v) => (KG * v.p * 10) / CAR, format: (n) => `${(n * 100).toFixed(1)}%` },
  ],
  visit: { p: [10, 55] },
  explain: zh
    ? '锂价 ¥4 万时每辆车的锂约 ¥1,400；涨到近 ¥60 万时超过 ¥2 万，吃掉车价的 14%。那两年，链条的利润几乎都被上游锂矿拿走；锂价跌回 ¥10 万以下后，利润又流回中下游。需求一直在涨，崩的是价格——周期商品的死法，是供给追了上来。'
    : 'At ¥40K a tonne, each car’s lithium cost about ¥1,400; near ¥600K it topped ¥20,000 — 14% of the car’s price. In those two years nearly all the chain’s profit went to the lithium miners; once prices fell below ¥100K, profit flowed back downstream. Demand kept rising the whole time; it was the price that collapsed. Commodities don’t die from demand vanishing, but from supply catching up.',
});

export const i19l2StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一条过山车',
    title: '¥4 万 → ¥60 万 → ¥10 万',
    body: '中国碳酸锂价格：2020 年每吨约 ¥4 万，2022 年底涨到近 ¥60 万，接下来两年又跌回 ¥10 万以下。\n\n这期间，电动车销量一直在增长。',
  },
  lithium(true),
  {
    type: 'choice',
    question: '需求一直在增长，锂价为什么还会暴跌？',
    options: ['电动车卖不动了', '高价刺激矿山集中扩产，两年后新产能一起释放，供给追上并超过了需求', '政府压价', '锂被替代了'],
    correct: 1,
    explain: '和第 17 单元的瓶颈迁移是同一个道理：超额利润引来扩产，扩产消灭超额利润。',
  },
  {
    type: 'concept',
    kicker: '起个名字',
    title: '电动车链的权力结构',
    body: '电池占整车成本的 30–40%，所以利润争夺围绕三方：',
    display: '锂矿 → 电池 → 整车',
    bullets: [
      '锂价高时，上游拿走利润',
      '电池厂两头受气，靠技术代差和规模维持',
      '整车进入价格战，先比成本',
    ],
  },
  {
    type: 'tf',
    statement: '2023–24 年中国电动车价格战（特斯拉带头降价、全行业跟进），符合渗透率过半后「份额优先于利润」的 S 曲线中后段剧情。',
    answer: true,
    explain: '正确。这一阶段，整车的估值尺从「增长」换成了「谁能活下来 + 单车利润」（第 6 单元 S 曲线、第 10 单元换尺）。',
  },
  {
    type: 'choice',
    question: '价格战阶段，判断哪家车企最可能活到最后，最核心的数字是？',
    options: ['发布会热度', '单车成本和毛利：谁在降价后仍有正毛利、账上现金能撑多久', '车型数量', '广告投放'],
    correct: 1,
    explain: '价格战是资产负债表的消耗战。2024 年多数新势力单车亏损扩大，比亚迪和特斯拉靠成本优势保住了正毛利。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '热闹是需求的，利润是格局的',
    body: '三句话带走：',
    display: '锂矿 → 电池 → 整车',
    bullets: [
      '链条利润跟着瓶颈流动',
      '周期商品死于供给追上来，不是需求消失',
      '价格战里先看成本曲线',
    ],
    footer: '下一课：政策和资本，怎么改变这条链？',
  },
];

export const i19l2StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A roller coaster',
    title: '¥40K → ¥600K → ¥100K',
    body: 'Lithium carbonate in China: about ¥40K a tonne in 2020, nearly ¥600K by late 2022, and back below ¥100K over the next two years.\n\nThroughout, EV sales kept growing.',
  },
  lithium(false),
  {
    type: 'choice',
    question: 'If demand kept growing, why did lithium prices crash?',
    options: ['EVs stopped selling', 'High prices set off a wave of mine expansions; two years later the new capacity arrived all at once and supply caught up with and overtook demand', 'Government price controls', 'Lithium was replaced'],
    correct: 1,
    explain: 'Same idea as Unit 17’s moving bottlenecks: excess profit attracts capacity, and capacity kills the excess profit.',
  },
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Power on the EV chain',
    body: 'Batteries are 30–40% of a car’s cost, so the fight for profit has three parties:',
    display: 'lithium miners → batteries → carmakers',
    bullets: [
      'When lithium is expensive, upstream takes the profit',
      'Battery makers are squeezed both ways, holding on through tech lead and scale',
      'Carmakers in a price war compete on cost first',
    ],
  },
  {
    type: 'tf',
    statement: 'China’s 2023–24 EV price war (Tesla cutting first, everyone following) fits the late-S-curve script of “share over profit” once penetration passes half.',
    answer: true,
    explain: 'True. At this stage the yardstick for carmakers switches from “growth” to “who survives + profit per car” (Unit 6’s S-curve, Unit 10’s yardsticks).',
  },
  {
    type: 'choice',
    question: 'In a price war, what’s the key number for judging which carmaker survives?',
    options: ['Launch-event buzz', 'Cost and gross margin per car: who stays gross-profitable after cutting prices, and how long their cash lasts', 'Number of models', 'Ad spending'],
    correct: 1,
    explain: 'A price war is a war of balance sheets. In 2024 most newer Chinese EV makers lost more per car, while BYD and Tesla kept positive gross margins thanks to lower costs.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Buzz comes from demand; profit from structure',
    body: 'Three lines to take with you:',
    display: 'lithium → batteries → carmakers',
    bullets: [
      'Chain profit flows with the bottleneck',
      'Commodities die from supply catching up, not demand vanishing',
      'In a price war, look at the cost curve first',
    ],
    footer: 'Next lesson: how do policy and capital reshape this chain?',
  },
];
