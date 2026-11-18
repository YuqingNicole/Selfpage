import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 18 单元第 3 课「谁赚走了钱：兑现期的判断」。
 * 思科 2000 年 3 月一度是全球市值最高的公司，P/E 超过 100 倍；随后两年半跌约 89%，此后二十年都没回到当时的高点。
 * 计算器（简化）：从 120 倍 P/E 起步，十年后的总回报 = (1 + 利润增速)^10 × 期末 P/E ÷ 120 − 1。
 */

const PE0 = 120;
const YEARS = 10;

const cisco = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '假设你在 P/E 120 倍时买入一家真正优秀的基建公司。拖动它未来十年的利润增速和十年后的 P/E，看十年总回报。'
    : 'Suppose you buy a truly excellent infrastructure company at a P/E of 120×. Drag its earnings growth over the next ten years and its P/E ten years out, and see your ten-year total return.',
  display: zh ? '回报 = (1 + 增速)¹⁰ × 期末 P/E ÷ 120 − 1' : 'return = (1 + g)¹⁰ × end P/E ÷ 120 − 1',
  inputs: [
    { key: 'g', label: zh ? '每年利润增速' : 'Annual earnings growth', min: 0, max: 30, step: 1, start: 15, format: (v) => `${v}%` },
    { key: 'pe', label: zh ? '十年后的 P/E' : 'P/E in ten years', min: 10, max: 60, step: 5, start: 20, format: (v) => `${v}×` },
  ],
  outputs: [
    {
      label: zh ? '十年总回报' : 'Ten-year total return',
      value: (v) => (1 + v.g / 100) ** YEARS * (v.pe / PE0) - 1,
      format: (n) => `${n >= 0 ? '+' : '−'}${Math.abs(n * 100).toFixed(0)}%`,
      main: true,
    },
    { label: zh ? '十年后利润是现在的' : 'Earnings in ten years vs now', value: (v) => (1 + v.g / 100) ** YEARS, format: (n) => `${n.toFixed(1)}×` },
  ],
  visit: { g: [5, 25] },
  explain: zh
    ? '利润每年涨 15%、十年涨到 4 倍，如果 P/E 回落到 20 倍，十年下来还是亏约三分之一。要不亏，得每年涨 20% 以上。思科就是这样：互联网是真的，公司也是优秀的，可 2000 年的估值已经透支了要由下一阶段才兑现的利润。'
    : 'Earnings up 15% a year, 4× in ten years — and if the P/E falls back to 20×, you’re still down about a third after a decade. To break even you need over 20% a year. That was Cisco: the internet was real and the company excellent, but its 2000 valuation had spent profits that only the next phase would deliver.',
});

export const i18l3StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一段历史',
    title: '全球市值第一，然后跌 89%',
    body: '2000 年 3 月，卖路由器的思科一度是全球市值最高的公司，市盈率超过 100 倍。两年半后，股价跌了约 89%，此后二十年都没回到那个高点。\n\n可互联网并不是假的。',
  },
  cisco(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '技术浪潮的三个阶段',
    body: '利润按时间顺序换手：',
    bullets: [
      '基建期：卖铲子的（芯片、设备、电力）',
      '平台期：云和工具层',
      '应用期：用新工具赚终端用户钱的公司',
      '2023–24 年的 AI 还在基建期',
    ],
  },
  {
    type: 'match',
    prompt: '把互联网浪潮的阶段和代表公司对上',
    pairs: [
      ['基建期（卖铲子）', '思科、朗讯'],
      ['平台期（云与工具）', '微软、谷歌'],
      ['应用期（终端变现）', '亚马逊、Netflix'],
      ['泡沫的教训', '基建估值透支了应用期的利润'],
    ],
  },
  {
    type: 'fill',
    before: '判断 AI 持仓先问：我赚的是哪一期的钱？基建期是眼前的真金白银，但有',
    after: '；应用期是对远期的下注。',
    options: ['周期性', '确定性', '流动性', '故事性'],
    correct: 0,
    explain: '集群建完、算力供需平衡的那天，卖铲人的收入会像 2001 年的思科一样「突然」失速。证伪条件要设在资本开支指引上。',
  },
  {
    type: 'choice',
    question: '「应用期开始接棒」最早的信号可能是？',
    options: ['芯片股再创新高', '算力价格大幅下降、变成廉价原料，同时 AI 应用的付费用户和收入加速增长', '更多发布会', '媒体报道变多'],
    correct: 1,
    explain: '互联网对应的时刻，是 2000 年代中期带宽变得便宜，之后才有了 YouTube 和流媒体的黄金十年。',
  },
  {
    type: 'concept',
    kicker: '第 18 单元 · 完成',
    title: '用因果图读 AI',
    body: '把三课合在一起：',
    display: '谁付钱 → 谁不可替代 → 现在是哪一期',
    bullets: [
      '回本箭头是需求的证伪点',
      '黄金节点 = 集中 + 瓶颈',
      '需求真、公司好，估值依然可能透支',
    ],
    footer: '下一单元：能源与电动车，旧世界的周期和新世界的换挡。',
  },
];

export const i18l3StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A piece of history',
    title: 'World’s most valuable company, then down 89%',
    body: 'In March 2000, router maker Cisco was briefly the most valuable company in the world, at more than 100× earnings. Two and a half years later the stock was down about 89%, and it didn’t get back to that peak for the next twenty years.\n\nYet the internet wasn’t fake.',
  },
  cisco(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Three phases of a technology wave',
    body: 'Profit changes hands in sequence:',
    bullets: [
      'Build-out: the shovel sellers (chips, equipment, power)',
      'Platform: cloud and tools',
      'Applications: companies using the new tools to earn from end users',
      'AI in 2023–24 was still in the build-out phase',
    ],
  },
  {
    type: 'match',
    prompt: 'Match the internet wave’s phases to representative companies',
    pairs: [
      ['Build-out (shovels)', 'Cisco, Lucent'],
      ['Platform (cloud & tools)', 'Microsoft, Google'],
      ['Applications (end users)', 'Amazon, Netflix'],
      ['The bubble’s lesson', 'Build-out valuations spent the app phase’s profits'],
    ],
  },
  {
    type: 'fill',
    before: 'For an AI holding, first ask which phase’s money you’re earning. Build-out profit is real cash today but',
    after: '; the application phase is a bet on the future.',
    options: ['cyclical', 'certain', 'liquid', 'story-driven'],
    correct: 0,
    explain: 'The day clusters are built and compute supply meets demand, the shovel sellers’ revenue can stall “suddenly”, like Cisco in 2001. Put the disproving condition on capex guidance.',
  },
  {
    type: 'choice',
    question: 'What might be the earliest sign that the application phase is taking over?',
    options: ['Chip stocks making new highs', 'Compute prices falling sharply into a cheap input, while AI apps’ paying users and revenue accelerate', 'More launch events', 'More media coverage'],
    correct: 1,
    explain: 'The internet’s equivalent was bandwidth getting cheap in the mid-2000s; only then came the golden decade of YouTube and streaming.',
  },
  {
    type: 'concept',
    kicker: 'Unit 18 · complete',
    title: 'Reading AI with a causal map',
    body: 'Three lessons together:',
    display: 'who pays → who can’t be replaced → which phase',
    bullets: [
      'The payback arrow is where demand can be disproven',
      'Golden node = concentrated + bottleneck',
      'Real demand and a great company can still be overvalued',
    ],
    footer: 'Next unit: energy and EVs — old-world cycles, new-world shifts.',
  },
];
