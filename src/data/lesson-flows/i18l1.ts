import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 18 单元第 1 课「从需求出发：钱是谁付的」。
 * 红杉资本 David Cahn 2024 年 6 月「AI 的 6,000 亿美元问题」：
 * 英伟达年化收入约 $1,500 亿 × 2（GPU 约占数据中心总成本一半）× 2（终端软件要有约 50% 毛利）≈ $6,000 亿。
 */

const NV = 1500;

const question600 = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'target',
  prompt: zh
    ? '2024 年中，英伟达的年化收入约 $1,500 亿。GPU 大约只占数据中心总成本的一半；最终卖 AI 服务的公司还要有约 50% 的毛利。终端一年要产生多少 AI 收入，这笔投入才能回本？先心算，再拖到你的答案。'
    : 'In mid-2024 Nvidia’s annualized revenue was about $150B. GPUs are only about half of a data center’s total cost, and whoever finally sells AI services needs about a 50% gross margin. How much AI revenue must end users generate a year for this spending to pay off? Work it out, then drag to your answer.',
  display: zh ? '英伟达收入 × 2（数据中心总成本）× 2（终端毛利）' : 'Nvidia revenue × 2 (total DC cost) × 2 (end margin)',
  inputs: [{ key: 'x', label: zh ? '你的答案（亿美元）' : 'Your answer ($B)', min: 1000, max: 10000, step: 250, start: 2000, format: (v) => (zh ? `$${v.toLocaleString('en-US')} 亿` : `$${v / 10}B`) }],
  outputs: [{ label: zh ? '需要的终端 AI 收入' : 'End-user AI revenue needed', value: () => NV * 4, format: (n) => (zh ? `$${n.toLocaleString('en-US')} 亿` : `$${n / 10}B`), main: true }],
  target: { key: 'x', answer: NV * 4, tolerance: 500, hideOutputs: true },
  explain: zh
    ? '1,500 × 2 × 2 = $6,000 亿。这是红杉资本 2024 年提出的「AI 的 6,000 亿美元问题」，而当时终端 AI 应用的收入远远不到这个数。需求链能不能闭环，答案不在芯片端，在应用端。'
    : '150 × 2 × 2 = $600B. This is Sequoia Capital’s 2024 “AI’s $600B question” — and end-user AI revenue at the time was nowhere near it. Whether the demand chain closes the loop is decided not at the chip end but at the application end.',
});

export const i18l1StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个对照',
    title: '2018 年的矿工，2024 年的云巨头',
    body: '英伟达经历过一次需求崩塌：2018 年加密货币暴跌，矿工不再买卡，库存堆积，股价腰斩。\n\n这一轮买卡的是另一群人。',
  },
  {
    type: 'choice',
    question: '和 2018 年的矿工相比，这一轮 AI 买家最关键的不同是？',
    options: ['买得更多', '微软、谷歌、Meta、亚马逊都是现金流巨头，用自己的利润买卡给核心业务用，不靠币价', '买得更少', '没有区别'],
    correct: 1,
    explain: '买家资质好得多。但资质好不等于没风险，风险移到了下一个箭头：这些投入能不能收回来。',
  },
  question600(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '训练、推理与回本',
    body: 'AI 需求分两层，还要再加一个回本箭头：',
    bullets: [
      '训练：建集群，是对未来的下注',
      '推理：每次调用都消耗算力，随真实使用量增长',
      '回本：应用收入要追上资本开支',
      '追不上，资本开支迟早被砍',
    ],
  },
  {
    type: 'fill',
    before: 'AI 需求链最终的证伪条件不在芯片端，而在',
    after: '端：算力投入长期收不回收入，资本开支迟早被砍。',
    options: ['应用收入', '晶圆产能', '显卡价格', '发布会'],
    correct: 0,
    explain: '2000 年，电信商砸钱铺光纤，流量收入跟不上，资本开支崩塌，拖垮了整条链。',
  },
  {
    type: 'tf',
    statement: '推理需求占比上升，说明 AI 需求正从「赌未来」转向「真实消耗」，需求质量在提高。',
    answer: true,
    explain: '正确。这也是财报电话会上分析师总追问「推理占比」的原因。',
  },
  {
    type: 'choice',
    question: '给「AI 资本开支繁荣会持续」设一个每季检查的仪表盘，最该放哪三个数？',
    options: ['英伟达股价、成交量、热搜', '云巨头资本开支指引、云 AI 服务收入增速、AI 应用的付费用户数', '发布会次数、员工人数、专利数', '只看英伟达毛利率'],
    correct: 1,
    explain: '三个数对应因果图的三个箭头：投入、平台变现、终端付费。股价不在仪表盘里，它是输出，不是输入。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '先问钱是谁付的',
    body: '三句话带走：',
    display: '资本开支 → 平台收入 → 应用收入',
    bullets: [
      '买家资质决定需求的质量',
      '回本箭头是这条链的证伪点',
      '盯应用端，不只盯芯片端',
    ],
    footer: '下一课：这条链上，每一环是谁、谁说了算？',
  },
];

export const i18l1StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A comparison',
    title: 'Miners in 2018, cloud giants in 2024',
    body: 'Nvidia has lived through a demand collapse: in 2018 crypto crashed, miners stopped buying cards, inventory piled up and the stock halved.\n\nThis time a different crowd is buying.',
  },
  {
    type: 'choice',
    question: 'Compared with 2018’s miners, what’s the key difference in this round’s AI buyers?',
    options: ['They buy more', 'Microsoft, Google, Meta and Amazon are cash-flow giants buying cards with their own profits for core businesses — not betting on a coin price', 'They buy less', 'No difference'],
    correct: 1,
    explain: 'Much better buyers. But better buyers don’t mean no risk: the risk moves to the next arrow — can the spending be earned back.',
  },
  question600(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Training, inference, and payback',
    body: 'AI demand has two layers, plus a payback arrow:',
    bullets: [
      'Training: building clusters, a bet on the future',
      'Inference: every request uses compute, growing with real usage',
      'Payback: application revenue must catch up with capex',
      'If it can’t, capex gets cut sooner or later',
    ],
  },
  {
    type: 'fill',
    before: 'The ultimate disproving condition for AI demand isn’t at the chip end but in',
    after: ': if compute spending never earns its revenue back, capex gets cut sooner or later.',
    options: ['application revenue', 'wafer capacity', 'graphics card prices', 'launch events'],
    correct: 0,
    explain: 'In 2000, telecoms poured money into fiber, traffic revenue didn’t keep up, capex collapsed and took the whole chain down.',
  },
  {
    type: 'tf',
    statement: 'A rising share of inference shows AI demand shifting from “betting on the future” to “real consumption” — demand quality is improving.',
    answer: true,
    explain: 'True. That’s why analysts keep asking about “inference share” on earnings calls.',
  },
  {
    type: 'choice',
    question: 'For a quarterly dashboard on “the AI capex boom continues”, which three numbers belong on it?',
    options: ['Nvidia’s price, volume, trending topics', 'Cloud giants’ capex guidance, cloud AI revenue growth, paying users of AI apps', 'Launch events, headcount, patents', 'Only Nvidia’s gross margin'],
    correct: 1,
    explain: 'The three numbers match the map’s three arrows: spending, platform monetization, end-user payment. The stock price isn’t on the dashboard — it’s an output, not an input.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'First ask who pays',
    body: 'Three lines to take with you:',
    display: 'capex → platform revenue → app revenue',
    bullets: [
      'Buyer quality decides demand quality',
      'The payback arrow is where this chain can be disproven',
      'Watch the application end, not just the chips',
    ],
    footer: 'Next lesson: who sits at each link of this chain, and who calls the shots?',
  },
];
