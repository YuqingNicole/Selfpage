import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 17 单元第 3 课「瓶颈会迁移：跟着定价权走」。
 * 英伟达 H100 交付周期：2023 年约 8–11 个月，2024 年初缩短到约 3–4 个月（媒体报道的近似值）。
 * 计算器（假设数字）：积压订单 120 万张卡，交付周期 = 积压 ÷ 每月产能。
 */

const BACKLOG = 120;

const leadTime = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '假设市场上积压着 120 万张 GPU 的订单。拖动每月产能，看交付周期怎么变——它是瓶颈松紧最直接的信号。'
    : 'Suppose 1.2 million GPUs are on back order. Drag monthly capacity and watch the delivery wait — the most direct signal of how tight a bottleneck is.',
  display: zh ? '交付周期 = 积压订单 ÷ 每月产能' : 'lead time = backlog ÷ monthly capacity',
  inputs: [{ key: 'm', label: zh ? '每月产能（万张）' : 'Monthly capacity (thousand)', min: 5, max: 40, step: 1, start: 10, format: (v) => (zh ? `${v} 万` : `${v * 10}K`) }],
  outputs: [
    { label: zh ? '交付周期' : 'Lead time', value: (v) => BACKLOG / v.m, format: (n) => (zh ? `${n.toFixed(1)} 个月` : `${n.toFixed(1)} months`), main: true },
    {
      label: zh ? '瓶颈状态' : 'Bottleneck',
      value: (v) => BACKLOG / v.m,
      format: (n) => (n >= 8 ? (zh ? '紧：卖方定价' : 'Tight: seller sets the price') : n >= 4 ? (zh ? '松动：开始谈价' : 'Loosening: haggling starts') : zh ? '消失：利润回归正常' : 'Gone: profits normalize'),
    },
  ],
  visit: { m: [10, 30] },
  explain: zh
    ? '产能从每月 10 万扩到 30 万，交付周期从一年缩到 4 个月。2023 年 H100 要等 8–11 个月，2024 年初就只要 3–4 个月了。瓶颈松动，讨论的焦点也随之移到 HBM 内存、先进封装，再到数据中心的电力。'
    : 'Expand capacity from 100K to 300K a month and the wait shrinks from a year to 4 months. In 2023 an H100 took 8–11 months to arrive; by early 2024 it was 3–4. As the bottleneck loosened, attention moved to HBM memory, advanced packaging, and then data center power.',
});

export const i17l3StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个场景',
    title: '黄牛去哪了',
    body: '演唱会开票的瞬间，门票是瓶颈，黄牛加价三倍。主办方一加场，门票管够，瓶颈移到了场馆旁的停车位和酒店。\n\n聪明的黄牛，已经去倒卖停车券了。',
  },
  leadTime(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '瓶颈会迁移',
    body: '超额利润会吸引扩产，扩产会消灭瓶颈：',
    bullets: [
      '一个瓶颈被扩产填平，超额利润随之消失',
      '新的瓶颈出现在链条上扩产最慢的地方',
      '松动信号：交付周期缩短、渠道不缺货、卖方主动锁长单',
      'AI 链：GPU → HBM 和先进封装 → 电力',
    ],
  },
  {
    type: 'tf',
    statement: '瓶颈环节的超额利润会吸引大规模扩产，而扩产本身就是消灭这个瓶颈的力量。',
    answer: true,
    explain: '正确。2021 年缺芯，全球疯狂建厂，到 2023 年成熟制程已经过剩。超额利润自带倒计时，和第 7 单元的周期课是同一个道理。',
  },
  {
    type: 'fill',
    before: '持有瓶颈环节的股票，本质上是持有「瓶颈',
    after: '」这个假设，要给它设证伪条件。',
    options: ['持续', '消失', '转移', '无关'],
    correct: 0,
    explain: '交付周期、合约价、扩产进度，都是可观察的证伪指标，正好套用 L4 的模板。',
  },
  {
    type: 'choice',
    question: '判断下一个瓶颈在哪，最有用的线索是？',
    options: ['哪只股票涨得最多', '链条上建设周期最长、扩产最慢的环节：电力和先进封装要以年计', '新闻热度', '公司发布会的次数'],
    correct: 1,
    explain: '瓶颈 = 需求撞上扩产最慢的环节。电力被提前盯上，正是因为电厂和电网的建设周期以年计。',
  },
  {
    type: 'concept',
    kicker: '第 17 单元 · 完成',
    title: '产业分析三件套',
    body: '把三课合在一起：',
    display: '画因果图 → 看谁不可替代 → 盯瓶颈往哪走',
    bullets: [
      '先图后价',
      '利润跟着可替代性走',
      '瓶颈会迁移，超额利润有倒计时',
    ],
    footer: '下一单元：用这套方法拆一遍 AI 产业链。',
  },
];

export const i17l3StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A scene',
    title: 'Where did the scalpers go?',
    body: 'The moment concert tickets go on sale, tickets are the bottleneck and scalpers charge triple. The promoter adds shows, tickets become plentiful, and the bottleneck moves to parking and hotels near the venue.\n\nThe smart scalpers are already reselling parking passes.',
  },
  leadTime(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Bottlenecks move',
    body: 'Excess profit attracts new capacity, and new capacity kills the bottleneck:',
    bullets: [
      'Once a bottleneck fills in, its excess profit disappears',
      'The new bottleneck forms where the chain expands slowest',
      'Loosening signs: shorter lead times, ample channel stock, sellers pushing long contracts',
      'AI chain: GPUs → HBM and advanced packaging → power',
    ],
  },
  {
    type: 'tf',
    statement: 'Excess profit at a bottleneck attracts massive new capacity, and that capacity is exactly what eliminates the bottleneck.',
    answer: true,
    explain: 'True. The 2021 chip shortage set off a global fab-building spree, and by 2023 mature-node capacity was in surplus. Excess profit comes with a countdown — the same idea as Unit 7’s cycles.',
  },
  {
    type: 'fill',
    before: 'Owning a bottleneck stock really means owning the hypothesis “the bottleneck',
    after: '” — so give it disproving conditions.',
    options: ['persists', 'disappears', 'moves', 'is irrelevant'],
    correct: 0,
    explain: 'Lead times, contract prices and capacity build-outs are all observable disproving signals — a direct fit for the L4 template.',
  },
  {
    type: 'choice',
    question: 'What’s the most useful clue to where the next bottleneck will be?',
    options: ['Whichever stock rose most', 'The link with the longest build time and slowest expansion: power and advanced packaging take years', 'News buzz', 'How many launch events a company holds'],
    correct: 1,
    explain: 'Bottleneck = demand hitting the slowest-expanding link. Power got attention early precisely because power plants and grids take years to build.',
  },
  {
    type: 'concept',
    kicker: 'Unit 17 · complete',
    title: 'Three tools for an industry',
    body: 'Three lessons together:',
    display: 'causal map → who can’t be replaced → where the bottleneck moves',
    bullets: [
      'Map first, price later',
      'Profit follows replaceability',
      'Bottlenecks move; excess profit has a countdown',
    ],
    footer: 'Next unit: take the AI supply chain apart with this method.',
  },
];
