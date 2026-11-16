import type { LessonStep } from '../optionsCourse';
import { pct, usdEn, usdZh } from './fmt';

/**
 * 投资主线 第 2 单元第 2 课「毛利率讲故事」。
 * 苹果 FY2023 两门生意：硬件收入约 $2,981 亿、毛利约 $1,088 亿（36.5%）；服务收入约 $852 亿、毛利约 $603 亿（70.8%）。
 * 先心算服务毛利率 → 命名 → 拖「服务占比」看整体毛利率被拉高 → Costco 反例 → 方向比高低重要。
 */

const SERVICES_REV = 85.2e9;
const HW_GM = 0.365;
const SV_GM = 0.708;

export const i2l2StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '同一家公司，两门生意',
    title: '卖 iPhone 和卖 App Store，哪个更赚？',
    body: 'FY2023 苹果：\n\n· 硬件（iPhone、Mac…）：收入约 $2,981 亿，毛利约 $1,088 亿\n· 服务（App Store、iCloud…）：收入约 $852 亿，毛利约 $603 亿',
  },
  {
    type: 'calc',
    mode: 'target',
    prompt: '服务业务每卖 $100，产品本身能留下多少？把滑块拖到你算出的比例。',
    inputs: [
      {
        key: 'guess',
        label: '你估算的服务毛利率',
        min: 0,
        max: 100,
        step: 1,
        start: 30,
        format: (v) => `${v}%`,
      },
    ],
    outputs: [{ label: '对应的毛利', value: (v) => (SERVICES_REV * v.guess) / 100, format: (n) => usdZh(n), main: true }],
    target: { key: 'guess', answer: 71, tolerance: 3, hideOutputs: true },
    explain: '$603 亿 ÷ $852 亿 ≈ 71%。而硬件只有 $1,088 亿 ÷ $2,981 亿 ≈ 36.5%。同样卖 $100，服务留下的毛利是硬件的两倍。',
  },
  {
    type: 'concept',
    kicker: '起个名字',
    title: '毛利率：商业模式的指纹',
    body: '把毛利除以收入，就得到毛利率：',
    display: '毛利率 = 毛利 ÷ 收入',
    bullets: [
      '它回答：每卖 $100，产品本身能留下多少',
      '高毛利通常意味着定价权：客户没得选，或者换起来很麻烦',
      '方向比高低更重要：持续下滑往往是竞争加剧的信号',
    ],
  },
  {
    type: 'calc',
    mode: 'explore',
    prompt: '苹果整体毛利率取决于两门生意各占多少。拖动服务收入的占比，看整体毛利率怎么变。',
    inputs: [
      { key: 'share', label: '服务收入占比', min: 10, max: 50, step: 1, start: 22, format: (v) => `${v}%` },
    ],
    outputs: [
      { label: '硬件毛利率（固定）', value: () => HW_GM, format: pct },
      { label: '服务毛利率（固定）', value: () => SV_GM, format: pct },
      { label: '苹果整体毛利率', value: (v) => HW_GM + (v.share / 100) * (SV_GM - HW_GM), format: pct, main: true },
    ],
    visit: { share: [12, 40] },
    explain: '服务占比每提高 10 个百分点，整体毛利率就涨约 3.4 个点。FY2023 服务占约 22%，整体约 44%。这就是市场那么在意苹果服务占比的原因：它在悄悄改变整家公司的赚钱效率。',
  },
  {
    type: 'choice',
    question: 'Costco 的毛利率只有约 12%（沃尔玛约 24%）。为什么它依然被公认为好生意？',
    options: [
      '因为规模大',
      '它故意把商品价格压到接近成本，用低价锁住会员，利润主要来自会员费（续费率超过 90%）',
      '因为毛利率低说明成本控制差',
      '因为它没有竞争对手',
    ],
    correct: 1,
    explain: '2023 财年 Costco 会员费收入约 $46 亿，净利润约 $63 亿，会员费贡献了利润的大头。低毛利是它的战略，不是弱点。毛利率要放在商业模式里读。',
  },
  {
    type: 'match',
    prompt: '把业务和它的毛利率量级对上（近年近似值）',
    pairs: [
      ['英伟达数据中心（AI 芯片）', '约 75%'],
      ['苹果服务', '约 71%'],
      ['苹果硬件', '约 37%'],
      ['Costco 商品零售', '约 12%'],
    ],
  },
  {
    type: 'tf',
    statement: '一家公司毛利率连续 8 个季度下滑，即使收入还在增长，也值得警惕。',
    answer: true,
    explain: '正确。毛利率持续下滑常见于竞争加剧、被迫降价或成本失控，收入增长可能是「以价换量」换来的。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '毛利率告诉你，这门生意怎么赚钱',
    body: '三句话带走：',
    display: '毛利率 = 毛利 ÷ 收入',
    bullets: [
      '同一家公司的不同业务，毛利率可以差一倍',
      '业务结构一变，整体毛利率跟着变',
      '高低要放在商业模式里看，方向比高低更重要',
    ],
    footer: '下一课：每股收益，以及「调整后」的数字为什么几乎总是更好看。',
  },
];

export const i2l2StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'One company, two businesses',
    title: 'Selling iPhones vs selling App Store: which earns more?',
    body: 'Apple in FY2023:\n\n· Hardware (iPhone, Mac…): about $298B of revenue, about $109B of gross profit\n· Services (App Store, iCloud…): about $85B of revenue, about $60B of gross profit',
  },
  {
    type: 'calc',
    mode: 'target',
    prompt: 'For every $100 of services sold, how much does the product itself keep? Drag the slider to your answer.',
    inputs: [
      {
        key: 'guess',
        label: 'Your estimate of services gross margin',
        min: 0,
        max: 100,
        step: 1,
        start: 30,
        format: (v) => `${v}%`,
      },
    ],
    outputs: [{ label: 'Implied gross profit', value: (v) => (SERVICES_REV * v.guess) / 100, format: (n) => usdEn(n), main: true }],
    target: { key: 'guess', answer: 71, tolerance: 3, hideOutputs: true },
    explain: '$60.3B ÷ $85.2B ≈ 71%. Hardware is only $108.8B ÷ $298.1B ≈ 36.5%. For the same $100 of sales, services keep twice the gross profit.',
  },
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Gross margin: a business model’s fingerprint',
    body: 'Divide gross profit by revenue to get gross margin:',
    display: 'gross margin = gross profit ÷ revenue',
    bullets: [
      'It answers: for every $100 sold, how much does the product itself keep',
      'High gross margin usually means pricing power: customers have no alternative, or switching is painful',
      'Direction matters more than level: a steady decline often signals rising competition',
    ],
  },
  {
    type: 'calc',
    mode: 'explore',
    prompt: 'Apple’s overall gross margin depends on the mix of its two businesses. Drag the services share of revenue and watch the overall margin.',
    inputs: [
      { key: 'share', label: 'Services share of revenue', min: 10, max: 50, step: 1, start: 22, format: (v) => `${v}%` },
    ],
    outputs: [
      { label: 'Hardware gross margin (fixed)', value: () => HW_GM, format: pct },
      { label: 'Services gross margin (fixed)', value: () => SV_GM, format: pct },
      { label: 'Apple overall gross margin', value: (v) => HW_GM + (v.share / 100) * (SV_GM - HW_GM), format: pct, main: true },
    ],
    visit: { share: [12, 40] },
    explain: 'Every 10 points of services share adds about 3.4 points to the overall margin. In FY2023 services were about 22% of revenue and the overall margin about 44%. That’s why the market watches Apple’s services share so closely: it’s quietly changing how efficiently the whole company earns.',
  },
  {
    type: 'choice',
    question: 'Costco’s gross margin is only about 12% (Walmart’s is about 24%). Why is it still widely seen as a great business?',
    options: [
      'Because it’s big',
      'It deliberately prices goods near cost to lock in members; most profit comes from membership fees (renewal above 90%)',
      'Because a low margin shows poor cost control',
      'Because it has no competitors',
    ],
    correct: 1,
    explain: 'In fiscal 2023 Costco earned about $4.6B in membership fees against about $6.3B of net profit — fees are most of the profit. The low margin is strategy, not weakness. Read gross margin within the business model.',
  },
  {
    type: 'match',
    prompt: 'Match each business to its gross margin (recent approximations)',
    pairs: [
      ['Nvidia data center (AI chips)', 'About 75%'],
      ['Apple services', 'About 71%'],
      ['Apple hardware', 'About 37%'],
      ['Costco merchandise', 'About 12%'],
    ],
  },
  {
    type: 'tf',
    statement: 'If a company’s gross margin falls for 8 straight quarters, it’s worth worrying about even if revenue keeps growing.',
    answer: true,
    explain: 'True. A steady decline often comes from rising competition, forced price cuts or runaway costs; revenue growth may have been bought with lower prices.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Gross margin tells you how a business makes money',
    body: 'Three lines to take with you:',
    display: 'gross margin = gross profit ÷ revenue',
    bullets: [
      'Different businesses inside one company can differ twofold in margin',
      'When the business mix shifts, the overall margin shifts with it',
      'Judge the level within the business model; the direction matters more',
    ],
    footer: 'Next lesson: earnings per share, and why “adjusted” numbers almost always look better.',
  },
];
