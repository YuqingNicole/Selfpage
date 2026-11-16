import type { LessonStep } from '../optionsCourse';
import { usdEn, usdZh } from './fmt';

/**
 * 投资主线 第 3 单元第 3 课「Capex 周期：今天的开支，明天的折旧」。
 * 2024 年微软、Meta、谷歌、亚马逊资本开支合计超 $2,000 亿（亚马逊约 $830 亿），大部分投向 AI 数据中心。
 * 计算器：$1,000 亿投资，拖动折旧年限，看每年压在利润上的折旧。
 */

const depreciation = (zh: boolean): LessonStep => {
  const f = zh ? usdZh : usdEn;
  return {
    type: 'calc',
    mode: 'explore',
    prompt: zh
      ? '一家云厂商花 $1,000 亿建 AI 数据中心。拖动会计上假设的使用年限，看每年要扣多少折旧。'
      : 'A cloud company spends $100 billion building AI data centers. Drag the useful life assumed in its accounts and see the depreciation charged each year.',
    display: zh ? '每年折旧 = 投资额 ÷ 使用年限' : 'annual depreciation = investment ÷ useful life',
    inputs: [
      { key: 'capex', label: zh ? '投资额' : 'Investment', min: 100e9, max: 100e9, step: 1, start: 100e9, fixed: true, format: (v) => f(v) },
      {
        key: 'years',
        label: zh ? '假设的使用年限' : 'Assumed useful life',
        min: 3,
        max: 10,
        step: 1,
        start: 6,
        format: (v) => (zh ? `${v} 年` : `${v} years`),
      },
    ],
    outputs: [{ label: zh ? '每年折旧（压在利润上）' : 'Depreciation per year (hits profit)', value: (v) => v.capex / v.years, format: (n) => f(n), main: true }],
    visit: { years: [3, 9] },
    explain: zh
      ? '同一笔投资，使用年限从 6 年改成 3 年，每年折旧就翻倍。服务器和芯片更新很快，会计上假设能用几年，直接决定利润好不好看——近几年几家云厂商都调整过服务器的折旧年限。'
      : 'Same investment, but cut the useful life from 6 years to 3 and annual depreciation doubles. Servers and chips age fast, so the assumed life directly shapes reported profit — several cloud giants have changed their server depreciation lives in recent years.',
  };
};

export const i3l3StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一场 $2,000 亿的豪赌',
    title: '四家巨头，一年砸 $2,000 亿建 AI 数据中心',
    body: '2024 年，微软、Meta、谷歌、亚马逊四家的资本开支合计超过 $2,000 亿，大部分投向 AI 数据中心。亚马逊一家就约 $830 亿。',
  },
  {
    type: 'choice',
    question: '想找这笔钱的「确定受益者」，顺着钱流，最先想到谁？',
    options: ['短视频平台', '收订单的一方：英伟达、台积电等芯片和算力供应链', '航空公司', '快消品牌'],
    correct: 1,
    explain: '一家公司的 Capex，就是另一家公司的收入。云厂商承担投资风险，供应链先收到真金白银——这就是「卖铲人」逻辑。',
  },
  {
    type: 'tf',
    statement: '公司花 $100 亿建数据中心，当季利润表会立刻多出 $100 亿成本。',
    answer: false,
    explain: '错误。Capex 先变成资产负债表上的资产，再按使用年限逐年折旧进利润表。所以大扩张期，利润率往往「暂时好看」。',
  },
  {
    type: 'concept',
    kicker: '起个名字',
    title: 'Capex 先变成资产，再逐年变成成本',
    body: '这一大笔钱，会分两次出现在报表上：',
    display: '每年折旧 = 投资额 ÷ 使用年限',
    bullets: [
      '签合同付款那天：现金流出，记作资本开支（Capex）',
      '之后每一年：按使用年限扣一部分，记作折旧，压在利润上',
      '今天的豪赌，就是未来很多年的固定成本',
    ],
  },
  depreciation(true),
  {
    type: 'fill',
    before: 'AI 数据中心大投入的最大风险：如果最终需求不及预期，巨额',
    after: '会在未来几年持续压制利润率。',
    options: ['折旧', '分红', '回购', '税收'],
    correct: 0,
    explain: '资产建成后，折旧是刚性的。2000 年电信泡沫破裂后，过剩光纤的折旧压了整个行业很多年。',
  },
  {
    type: 'choice',
    question: '重资产公司（芯片制造、航空）和轻资产公司（软件、平台）相比，哪个说法正确？',
    options: ['重资产公司一定不值得投资', '轻资产公司扩张几乎不需要额外 Capex，收入增长更容易变成自由现金流', '重资产公司利润率一定更高', '两者没有区别'],
    correct: 1,
    explain: '软件多卖一份的成本接近零；晶圆厂每一代产能都要上百亿美元的投入。这决定了两类公司自由现金流的「天生体质」。',
  },
  {
    type: 'concept',
    kicker: '第 3 单元完成',
    title: '跟着现金走，比跟着利润走更诚实',
    body: '把这个单元压缩成四句话：',
    bullets: [
      '利润按记账算，现金按到账算；两者长期背离要警惕',
      '自由现金流 = 经营现金流 − 资本开支，是回购和分红的来源',
      'Capex 先变成资产，再逐年以折旧的形式压在利润上',
      '一家公司的 Capex 是另一家的收入；轻资产生意更容易把增长变成现金',
    ],
    footer: '下一单元：利率——为什么美联储一开口，股市就抖。',
  },
];

export const i3l3StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A $200 billion bet',
    title: 'Four giants, $200 billion a year on AI data centers',
    body: 'In 2024, Microsoft, Meta, Google and Amazon spent more than $200 billion combined on capex, mostly on AI data centers. Amazon alone spent about $83 billion.',
  },
  {
    type: 'choice',
    question: 'Looking for the sure beneficiaries of that money, who do you think of first if you follow the cash?',
    options: ['Short-video apps', 'Whoever takes the orders: Nvidia, TSMC and the chip and compute supply chain', 'Airlines', 'Consumer brands'],
    correct: 1,
    explain: 'One company’s capex is another company’s revenue. The cloud giants carry the investment risk; the supply chain gets paid first — the “sell the shovels” logic.',
  },
  {
    type: 'tf',
    statement: 'If a company spends $10 billion building a data center, that quarter’s income statement immediately shows $10 billion more in costs.',
    answer: false,
    explain: 'False. Capex first becomes an asset on the balance sheet, then flows into the income statement as depreciation over its useful life. That’s why margins often look “temporarily good” during a build-out.',
  },
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Capex becomes an asset first, then a cost year by year',
    body: 'That big outlay shows up in the accounts twice:',
    display: 'annual depreciation = investment ÷ useful life',
    bullets: [
      'On the day it’s paid: cash goes out, recorded as capex',
      'Every year after: a slice is charged as depreciation, weighing on profit',
      'Today’s big bet is a fixed cost for years to come',
    ],
  },
  depreciation(false),
  {
    type: 'fill',
    before: 'The biggest risk of the AI data center splurge: if demand disappoints, huge',
    after: 'charges will weigh on margins for years.',
    options: ['depreciation', 'dividend', 'buyback', 'tax'],
    correct: 0,
    explain: 'Once the assets are built, depreciation is fixed. After the 2000 telecom bubble burst, depreciation on surplus fiber weighed on the industry for years.',
  },
  {
    type: 'choice',
    question: 'Comparing asset-heavy companies (chipmaking, airlines) with asset-light ones (software, platforms), which is true?',
    options: ['Asset-heavy companies are never worth owning', 'Asset-light companies need little extra capex to grow, so revenue growth turns into free cash flow more easily', 'Asset-heavy companies always have higher margins', 'There’s no difference'],
    correct: 1,
    explain: 'Selling one more copy of software costs almost nothing; every new generation of chip fab capacity costs tens of billions. That sets the two types’ built-in free cash flow profile.',
  },
  {
    type: 'concept',
    kicker: 'Unit 3 complete',
    title: 'Following the cash is more honest than following profit',
    body: 'The whole unit in four lines:',
    bullets: [
      'Profit counts what’s booked; cash counts what’s received — watch out when they diverge for years',
      'Free cash flow = operating cash flow − capex: the source of buybacks and dividends',
      'Capex becomes an asset first, then weighs on profit as depreciation year by year',
      'One company’s capex is another’s revenue; asset-light businesses turn growth into cash more easily',
    ],
    footer: 'Next unit: interest rates — why the stock market shakes whenever the Fed speaks.',
  },
];
