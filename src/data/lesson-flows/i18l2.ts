import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 18 单元第 2 课「链条地图：从芯片到电力」。
 * 英伟达 FY2025 数据中心收入约 $1,150 亿，毛利率约 75%（用公司整体毛利率估算）；
 * SMCI FY2024 收入约 $150 亿，毛利率约 14%。
 */

const NV_REV = 1150;
const NV_GM = 0.75;
const SM_REV = 150;
const SM_GM = 0.14;

const pool = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'target',
  prompt: zh
    ? '英伟达数据中心收入约 $1,150 亿、毛利率约 75%；服务器整机厂 SMCI 收入约 $150 亿、毛利率约 14%。收入差约 8 倍。毛利差大约多少倍？先心算，再拖到你的答案。'
    : 'Nvidia’s data center revenue is about $115B at roughly a 75% gross margin; server maker SMCI’s revenue is about $15B at roughly 14%. Revenue differs about 8×. Roughly how many times larger is Nvidia’s gross profit? Work it out, then drag to your answer.',
  display: zh ? '1,150 × 75%　vs　150 × 14%' : '$115B × 75%   vs   $15B × 14%',
  inputs: [{ key: 'x', label: zh ? '你的答案' : 'Your answer', min: 5, max: 80, step: 1, start: 8, format: (v) => `${v}×` }],
  outputs: [{ label: zh ? '实际毛利倍数' : 'Actual gross profit multiple', value: () => (NV_REV * NV_GM) / (SM_REV * SM_GM), format: (n) => `${Math.round(n)}×`, main: true }],
  target: { key: 'x', answer: 41, tolerance: 5, hideOutputs: true },
  explain: zh
    ? '约 $860 亿 vs 约 $21 亿，相差约 40 倍——收入只差 8 倍。同一条链，格局越集中，利润越厚。这也解释了为什么同样贴着「AI」标签，SMCI 永远拿不到英伟达的估值倍数。'
    : 'About $86B versus about $2.1B — roughly 40× apart, while revenue differs only 8×. On the same chain, the more concentrated the link, the thicker the profit. It also explains why SMCI, wearing the same “AI” label, never gets Nvidia’s multiple.',
});

export const i18l2StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一张地图',
    title: '从芯片到电力',
    body: '一块 AI 芯片从设计到在数据中心里通电，要经过这些环节：',
    display: '芯片设计 → 制造 → HBM 内存 → 封装 → 服务器整机 → 数据中心与电力',
  },
  {
    type: 'match',
    prompt: '把环节和它的竞争格局对上',
    pairs: [
      ['芯片设计（近乎独家）', '英伟达 + CUDA 生态'],
      ['先进制造（实质独家）', '台积电'],
      ['HBM 内存（三家竞争）', 'SK 海力士领先'],
      ['服务器整机（高度竞争）', '鸿海、广达、SMCI'],
    ],
  },
  pool(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '黄金节点',
    body: '给链条地图上的每个环节标两个属性：',
    bullets: [
      '格局：几家能做',
      '状态：现在是不是瓶颈',
      '集中 + 瓶颈：配得上高倍数',
      '只占其一：利润平庸，或者很快消失',
    ],
  },
  {
    type: 'tf',
    statement: '一个环节要配得上高估值倍数，最好同时满足「格局集中」和「当前是瓶颈」。',
    answer: true,
    explain: '正确。只集中不瓶颈（成熟的存储芯片）赚平庸的钱；只瓶颈不集中（2021 年的集装箱运价）超额利润随扩产很快消失。',
  },
  {
    type: 'choice',
    question: '博通靠给谷歌等云巨头做定制 AI 芯片快速崛起。这对「看多英伟达」的 thesis 意味着什么？',
    options: ['毫无影响', '格局的边际变化：最大的客户在扶持替代方案，要把定制芯片的份额写进监控清单', '英伟达马上会被取代', '应该立刻清仓'],
    correct: 1,
    explain: '云巨头既是英伟达最大的客户，又在培养替代方案。用 L4 的监控模板处理：不恐慌，也不装看不见。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '地图上标两个属性',
    body: '三句话带走：',
    display: '格局（几家能做）× 状态（是不是瓶颈）',
    bullets: [
      '同链不同命，收入差 8 倍、利润差 40 倍',
      '黄金节点 = 集中 + 瓶颈',
      '客户自研是格局的边际变化',
    ],
    footer: '下一课：一轮技术浪潮，利润按什么顺序换手？',
  },
];

export const i18l2StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A map',
    title: 'From chips to power',
    body: 'Between design and switching on in a data center, an AI chip passes through these links:',
    display: 'chip design → fab → HBM memory → packaging → servers → data centers & power',
  },
  {
    type: 'match',
    prompt: 'Match each link to its competitive structure',
    pairs: [
      ['Chip design (near-monopoly)', 'Nvidia + CUDA ecosystem'],
      ['Leading-edge fab (effectively sole)', 'TSMC'],
      ['HBM memory (three players)', 'SK Hynix in front'],
      ['Servers (highly competitive)', 'Foxconn, Quanta, SMCI'],
    ],
  },
  pool(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Golden nodes',
    body: 'Tag every link on the chain map with two attributes:',
    bullets: [
      'Structure: how many firms can do it',
      'State: is it a bottleneck right now',
      'Concentrated + bottleneck: deserves a high multiple',
      'Only one of the two: ordinary profits, or profits that vanish fast',
    ],
  },
  {
    type: 'tf',
    statement: 'For a link to deserve a high valuation multiple, it should ideally be both concentrated and a current bottleneck.',
    answer: true,
    explain: 'True. Concentrated but not a bottleneck (mature memory) earns ordinary money; a bottleneck but not concentrated (2021 container shipping rates) sees its excess profit vanish as capacity arrives.',
  },
  {
    type: 'choice',
    question: 'Broadcom has risen fast designing custom AI chips for cloud giants like Google. What does that mean for a bullish Nvidia thesis?',
    options: ['Nothing', 'A change at the margin in market structure: the biggest customers are backing alternatives, so custom-chip share goes on the watch list', 'Nvidia is about to be replaced', 'Sell everything now'],
    correct: 1,
    explain: 'The cloud giants are both Nvidia’s biggest customers and the backers of its alternatives. Handle it with the L4 monitoring template: no panic, no looking away.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Two tags on every link',
    body: 'Three lines to take with you:',
    display: 'structure (how many) × state (bottleneck?)',
    bullets: [
      'Same chain, different fates: 8× the revenue, 40× the profit',
      'Golden node = concentrated + bottleneck',
      'Customers building their own chips is a structural shift',
    ],
    footer: 'Next lesson: in a technology wave, in what order does profit change hands?',
  },
];
