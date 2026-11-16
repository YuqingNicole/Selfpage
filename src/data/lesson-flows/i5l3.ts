import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 5 单元第 3 课「护城河：为什么别人抢不走」。
 * 沿用 Netflix：多次提价后收入继续增长（定价权是护城河最直接的财务证据）；
 * 计算器：提价幅度 × 「每涨 1% 流失多少会员」→ 收入变化。
 */

const signedPct = (n: number) => `${n >= 0 ? '+' : '−'}${Math.abs(n * 100).toFixed(1)}%`;

const hike = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '一家订阅公司打算提价。拖动提价幅度和「每提价 1% 流失多少会员」，看收入怎么变。'
    : 'A subscription company plans a price increase. Drag the size of the hike and “members lost per 1% of price increase”, and watch revenue.',
  display: zh ? '新收入 = (1 + 提价) × (1 − 流失)' : 'new revenue = (1 + price hike) × (1 − members lost)',
  inputs: [
    { key: 'h', label: zh ? '提价幅度' : 'Price increase', min: 0, max: 30, step: 1, start: 10, format: (v) => `+${v}%` },
    {
      key: 'e',
      label: zh ? '每提价 1%，流失多少会员' : 'Members lost per 1% price increase',
      min: 0.1,
      max: 1.5,
      step: 0.05,
      start: 0.2,
      format: (v) => `${v.toFixed(2)}%`,
    },
  ],
  outputs: [
    {
      label: zh ? '收入变化' : 'Revenue change',
      value: (v) => (1 + v.h / 100) * (1 - Math.min(1, (v.h * v.e) / 100)) - 1,
      format: signedPct,
      main: true,
    },
    { label: zh ? '流失的会员' : 'Members lost', value: (v) => Math.min(1, (v.h * v.e) / 100), format: (n) => `${(n * 100).toFixed(1)}%` },
  ],
  visit: { e: [0.3, 1.2] },
  explain: zh
    ? '会员不在乎涨价（每 1% 只流失 0.2%）时，提价 10% 收入涨约 8%；会员一涨就跑（每 1% 流失 1.2%）时，同样提价反而让收入下滑。能不能提价而不丢客，就是护城河在报表上的样子。'
    : 'When members barely react (0.2% lost per 1%), a 10% hike lifts revenue about 8%; when they bolt (1.2% lost per 1%), the same hike shrinks revenue. Raising prices without losing customers is what a moat looks like on the income statement.',
});

export const i5l3StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个现象',
    title: '涨了好几次价，会员还在',
    body: 'Netflix 美国标准套餐从 2014 年的约 $9 一路涨到约 $15，同期迪士尼、HBO、亚马逊都杀进了流媒体。\n\n按理说竞争越激烈越不敢涨价，可它的收入还在增长。',
  },
  {
    type: 'choice',
    question: '对手越来越多，Netflix 却还能反复涨价。这最能说明什么？',
    options: ['会员不会算账', '会员换掉它的代价比多付几美元更高：片库、推荐、全家人的使用习惯', '对手的价格更贵', '监管限制了竞争'],
    correct: 1,
    explain: '高利润会招来竞争。竞争来了还能守住价格和用户，说明有某种东西挡住了对手——这就是护城河。',
  },
  hike(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '四种护城河',
    body: '「凭什么守得住」，常见的答案有四种：',
    bullets: [
      '切换成本：换掉它太麻烦（企业软件、苹果生态）',
      '网络效应：用的人越多越好用（微信、Visa）',
      '品牌：愿意为名字多付钱（茅台、爱马仕）',
      '成本优势：规模大到对手做不到这么便宜（Costco、台积电）',
    ],
  },
  {
    type: 'match',
    prompt: '把公司和它最主要的护城河对上',
    pairs: [
      ['微信', '朋友都在上面'],
      ['企业 ERP 系统', '换掉要全公司停摆重训'],
      ['爱马仕', '愿意为名字多付钱'],
      ['Costco', '规模大到对手卖不了这么便宜'],
    ],
  },
  {
    type: 'choice',
    question: '一家公司自称有很强的护城河。最能验证这句话的财务证据是？',
    options: ['CEO 访谈里的金句', '连续多年的高毛利率，加上稳定或上升的市场份额', '总部大楼的位置', '广告投放量'],
    correct: 1,
    explain: '护城河的定义就是「高回报不被竞争侵蚀」。毛利率年年被压缩、份额被抢，故事再好听也是失守。',
  },
  {
    type: 'tf',
    statement: '一旦建立了护城河，就能永远安全。',
    answer: false,
    explain: '错误。诺基亚 2007 年拿走全球手机行业一半以上的利润，五年后几乎归零——触屏智能机这种范式转移会直接抽干旧护城河。护城河要定期重新验证。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '护城河要在报表上找',
    body: '三句话带走：',
    display: '能涨价而不丢客，就是护城河',
    bullets: [
      '四种护城河：切换成本、网络效应、品牌、成本优势',
      '证据是多年的高毛利率和稳定份额',
      '范式转移能抽干护城河，要定期复查',
    ],
    footer: '下一单元：增长从哪来——卖得更多，还是卖得更贵？',
  },
];

export const i5l3StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A puzzle',
    title: 'Several price hikes, and the members stayed',
    body: 'Netflix’s US standard plan went from about $9 in 2014 to about $15, while Disney, HBO and Amazon all piled into streaming.\n\nMore competition should make raising prices harder — yet its revenue kept growing.',
  },
  {
    type: 'choice',
    question: 'Rivals keep multiplying, yet Netflix keeps raising prices. What does that show best?',
    options: ['Members can’t do math', 'Leaving costs members more than a few extra dollars: the library, the recommendations, the whole family’s habits', 'Rivals charge more', 'Regulators limit competition'],
    correct: 1,
    explain: 'High profits attract competition. Holding prices and users when competition arrives means something is keeping rivals out — that’s a moat.',
  },
  hike(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Four kinds of moat',
    body: '“Why can they hold on?” usually has one of four answers:',
    bullets: [
      'Switching costs: replacing it is too painful (enterprise software, Apple’s ecosystem)',
      'Network effects: more users make it better (WeChat, Visa)',
      'Brand: people pay extra for the name (Moutai, Hermès)',
      'Cost advantage: so big rivals can’t match the price (Costco, TSMC)',
    ],
  },
  {
    type: 'match',
    prompt: 'Match each company to its main moat',
    pairs: [
      ['WeChat', 'All your friends are on it'],
      ['Enterprise ERP system', 'Replacing it means retraining the whole company'],
      ['Hermès', 'People pay extra for the name'],
      ['Costco', 'So big rivals can’t sell this cheaply'],
    ],
  },
  {
    type: 'choice',
    question: 'A company claims a strong moat. What financial evidence tests that best?',
    options: ['A great quote from the CEO', 'Years of high gross margins plus steady or rising market share', 'Where headquarters is', 'How much it spends on ads'],
    correct: 1,
    explain: 'A moat means high returns that competition doesn’t erode. If margins get squeezed year after year and share slips away, the moat has been breached, however good the story.',
  },
  {
    type: 'tf',
    statement: 'Once a company builds a moat, it’s safe forever.',
    answer: false,
    explain: 'False. In 2007 Nokia took more than half of the whole phone industry’s profits; five years later it was close to zero. A paradigm shift like touchscreen smartphones can drain an old moat. Moats need rechecking.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Find the moat in the numbers',
    body: 'Three lines to take with you:',
    display: 'raising prices without losing customers = a moat',
    bullets: [
      'Four moats: switching costs, network effects, brand, cost advantage',
      'The evidence is years of high margins and steady share',
      'Paradigm shifts can drain a moat — recheck it',
    ],
    footer: 'Next unit: where growth comes from — selling more, or charging more?',
  },
];
