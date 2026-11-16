import type { LessonStep } from '../optionsCourse';
import { pxSigned } from './fmt';

/**
 * 投资主线 第 5 单元第 2 课「单位经济学：一单到底赚不赚」。
 * 先用一家外卖平台算一单账（订单密度决定规模能不能救亏损），再回到 Netflix：
 * 会员费约 $15/月 × 毛利率约 40% ÷ 月流失率约 2% ≈ LTV $300。
 */

const FEE = 15;
const MARGIN = 0.4;
const usd0 = (n: number) => `${n < 0 ? '−' : ''}$${Math.round(Math.abs(n)).toLocaleString('en-US')}`;

const perOrder = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '一家外卖平台每单收入 $5，骑手时薪 $12，每单还有 $1 其他成本。拖动「骑手每小时送几单」，看一单赚不赚。'
    : 'A delivery app earns $5 per order, pays riders $12 an hour, and has $1 of other costs per order. Drag “orders per rider-hour” and see whether one order makes money.',
  display: zh ? '每单利润 = $5 − 时薪 ÷ 每小时单数 − $1' : 'profit per order = $5 − hourly pay ÷ orders per hour − $1',
  inputs: [
    {
      key: 'oph',
      label: zh ? '骑手每小时送几单（订单密度）' : 'Orders per rider-hour (order density)',
      min: 1.5,
      max: 4.5,
      step: 0.1,
      start: 2,
      format: (v) => (zh ? `${v.toFixed(1)} 单` : `${v.toFixed(1)} orders`),
    },
  ],
  outputs: [
    { label: zh ? '每单利润' : 'Profit per order', value: (v) => 5 - 12 / v.oph - 1, format: pxSigned, main: true },
    { label: zh ? '每天 100 万单' : 'At 1 million orders a day', value: (v) => (5 - 12 / v.oph - 1) * 1e6, format: (n) => (zh ? `${usd0(n)} / 天` : `${usd0(n)} / day`) },
  ],
  visit: { oph: [2, 4] },
  explain: zh
    ? '每小时 2 单时每单亏 $2，单量越大亏得越多；密度提到每小时 4 单，同一个骑手摊薄了成本，每单转为赚 $1。规模只有改变了某个单位数字（这里是密度），才能救亏损。'
    : 'At 2 orders an hour each order loses $2, and more volume just means bigger losses; at 4 an hour the same rider spreads the cost and each order earns $1. Scale only rescues losses when it changes a per-unit number — here, density.',
});

const ltv = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'target',
  prompt: zh
    ? '一个会员每月付 $15，毛利率 40%，获客成本（CAC）$100。月流失率要低到多少，LTV 才能达到 CAC 的 3 倍？先心算，再拖到你的答案。'
    : 'A member pays $15 a month at a 40% gross margin, and costs $100 to acquire (CAC). How low must monthly churn be for LTV to reach 3× CAC? Work it out, then drag to your answer.',
  display: zh ? 'LTV = 月费 × 毛利率 ÷ 月流失率' : 'LTV = monthly fee × gross margin ÷ monthly churn',
  inputs: [
    { key: 'churn', label: zh ? '月流失率' : 'Monthly churn', min: 0.5, max: 8, step: 0.25, start: 6, format: (v) => `${v.toFixed(2)}%` },
  ],
  outputs: [
    { label: 'LTV', value: (v) => (FEE * MARGIN) / (v.churn / 100), format: usd0, main: true },
    { label: 'LTV ÷ CAC', value: (v) => (FEE * MARGIN) / (v.churn / 100) / 100, format: (n) => `${n.toFixed(1)}×` },
  ],
  target: { key: 'churn', answer: 2, tolerance: 0.25, hideOutputs: true },
  explain: zh
    ? '每月毛利 $15 × 40% = $6；要 LTV = $300，流失率就得是 $6 ÷ $300 = 2%。这正是 Netflix 的水平——流失率从 2% 涨到 6%，LTV 就从 $300 掉到 $100，和获客成本打平。'
    : 'Monthly gross profit is $15 × 40% = $6; for LTV of $300, churn must be $6 ÷ $300 = 2%. That’s Netflix’s level — let churn rise from 2% to 6% and LTV falls from $300 to $100, no more than it cost to acquire.',
});

export const i5l2StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一句常见的承诺',
    title: '「规模大了就赚钱」',
    body: '一家外卖平台每单亏 $2，管理层说：等单量上来，自然就赚钱了。\n\n这句话有时是真的，有时是在给亏损加杠杆。区别藏在「一单」里。',
  },
  {
    type: 'choice',
    question: '每单亏 $2 的生意，单量翻 10 倍，什么情况下才会转为盈利？',
    options: ['一定会，互联网就是先烧钱', '只有规模真的改变了一单的收入或成本时（比如一个骑手一趟能送更多单）', '只要融资够多', '规模和盈利无关'],
    correct: 1,
    explain: '如果每单的收入和成本都不变，10 倍单量就是 10 倍亏损。要追问：规模到底改变了哪个数字？',
  },
  perOrder(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '单位经济学',
    body: '把生意缩小到一单、一个用户来算账：',
    display: 'LTV（终身毛利）vs CAC（获客成本）',
    bullets: [
      '一单的收入、成本、利润各是多少',
      'CAC：拉来一个用户花多少钱',
      'LTV：这个用户一辈子贡献多少毛利',
      '常用粗标准：LTV ÷ CAC > 3，烧钱获客才划算',
    ],
  },
  ltv(true),
  {
    type: 'tf',
    statement: '单位经济为负的生意，只要用户增长够快，就值得投资。',
    answer: false,
    explain: '错误。每单亏损 × 更多单 = 更大的亏损。除非说得清规模怎么改变单位账（密度、议价权、复购），否则增长是在放大失血。',
  },
  {
    type: 'choice',
    question: '瑞幸 2020 年财务造假退市，2023 年单季收入却超过了星巴克中国。中间最关键的变化是？',
    options: ['换了 logo', '砍掉巨额补贴，单杯先转为赚钱，再用上万家门店放大这份利润', '咖啡豆涨价', '星巴克退出中国'],
    correct: 1,
    explain: '同样的门店网络，单杯亏钱时是失血泵，单杯赚钱后是印钞机。先修单位经济，再谈规模。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '先算一单账',
    body: '三句话带走：',
    display: 'LTV = 月费 × 毛利率 ÷ 月流失率',
    bullets: [
      '规模只能放大单位经济，不能扭转它',
      '追问规模改变了哪个单位数字',
      '流失率决定 LTV：Netflix 的 2% 撑起 $300',
    ],
    footer: '下一课：既然 Netflix 这么赚钱，为什么对手抢不走它的会员？',
  },
];

export const i5l2StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A common promise',
    title: '“We’ll be profitable at scale”',
    body: 'A delivery app loses $2 on every order. Management says: once volume picks up, profits will follow.\n\nSometimes that’s true; sometimes it’s leverage on a loss. The difference hides inside a single order.',
  },
  {
    type: 'choice',
    question: 'A business loses $2 per order. Volume grows 10×. When does it turn profitable?',
    options: ['Always — tech burns cash first', 'Only if scale actually changes the revenue or cost of one order (say, a rider delivering more orders per trip)', 'As long as it raises enough money', 'Scale has nothing to do with profit'],
    correct: 1,
    explain: 'If revenue and cost per order stay the same, 10× the orders is 10× the loss. Ask: which number does scale actually change?',
  },
  perOrder(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Unit economics',
    body: 'Shrink the business down to one order or one customer and do the math:',
    display: 'LTV (lifetime gross profit) vs CAC (acquisition cost)',
    bullets: [
      'Revenue, cost and profit of one order',
      'CAC: what it costs to win one customer',
      'LTV: the gross profit that customer contributes over their lifetime',
      'Rough rule: LTV ÷ CAC > 3 before spending to grow makes sense',
    ],
  },
  ltv(false),
  {
    type: 'tf',
    statement: 'A business with negative unit economics is worth investing in as long as users grow fast enough.',
    answer: false,
    explain: 'False. Loss per order × more orders = a bigger loss. Unless you can explain how scale changes the unit math (density, bargaining power, repeat purchases), growth just amplifies the bleeding.',
  },
  {
    type: 'choice',
    question: 'Luckin Coffee was delisted for fraud in 2020, yet by 2023 its quarterly revenue topped Starbucks China. The key change in between?',
    options: ['A new logo', 'It cut the huge subsidies so each cup made money first, then used 10,000+ stores to multiply that profit', 'Coffee bean prices rose', 'Starbucks left China'],
    correct: 1,
    explain: 'The same store network is a cash drain when each cup loses money and a cash machine once each cup earns. Fix the unit economics first, then talk about scale.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Do the math on one sale first',
    body: 'Three lines to take with you:',
    display: 'LTV = monthly fee × gross margin ÷ monthly churn',
    bullets: [
      'Scale amplifies unit economics; it can’t reverse them',
      'Ask which per-unit number scale changes',
      'Churn sets LTV: Netflix’s 2% supports $300',
    ],
    footer: 'Next lesson: if Netflix is this profitable, why can’t rivals take its members?',
  },
];
