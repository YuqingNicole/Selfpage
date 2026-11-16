import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 5 单元第 1 课「钱从哪来：四种原型」。
 * 第 5 单元以 Netflix 为主线（近似值）：美国标准套餐约 $15/月，毛利率约 40%，月流失率约 2%；
 * 2022 年 11 月推出广告套餐。本课用 Netflix 的「加广告」引出四种收入原型，计算器演示收入结构决定衰退时的抗跌性。
 */

const AD_SHOCK = -0.15;
const SUB_SHOCK = -0.02;

const signedPct = (n: number) => `${n >= 0 ? '+' : '−'}${Math.abs(n * 100).toFixed(1)}%`;

const mix = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '假设一场衰退里，广告收入下滑 15%、订阅收入只下滑 2%。拖动广告收入占比，看整家公司的收入会跌多少。'
    : 'Suppose in a recession ad revenue falls 15% while subscription revenue falls only 2%. Drag the share of revenue from ads and see how much the whole company drops.',
  display: zh ? '收入变化 = 广告占比 × (−15%) + 订阅占比 × (−2%)' : 'revenue change = ad share × (−15%) + subscription share × (−2%)',
  inputs: [
    {
      key: 'ad',
      label: zh ? '广告收入占比（其余是订阅）' : 'Share of revenue from ads (the rest is subscriptions)',
      min: 0,
      max: 100,
      step: 1,
      start: 0,
      format: (v) => `${v}%`,
    },
  ],
  outputs: [
    { label: zh ? '衰退中的收入变化' : 'Revenue change in the recession', value: (v) => (v.ad / 100) * AD_SHOCK + (1 - v.ad / 100) * SUB_SHOCK, format: signedPct, main: true },
    {
      label: zh ? '最像谁' : 'Looks most like',
      value: (v) => v.ad,
      format: (n) =>
        n >= 90 ? (zh ? 'Meta（约 98% 广告）' : 'Meta (about 98% ads)') : n >= 60 ? (zh ? '谷歌（约 77% 广告）' : 'Google (about 77% ads)') : n <= 10 ? (zh ? '2022 年前的 Netflix（纯订阅）' : 'Netflix before 2022 (pure subscription)') : zh ? '混合型' : 'A mix',
    },
  ],
  visit: { ad: [5, 90] },
  explain: zh
    ? '纯订阅只跌 2%，几乎全靠广告的公司跌近 15%。2022 年广告主一砍预算，Meta 全年收入出现上市以来第一次下滑；同年 Netflix 收入还在增长。'
    : 'Pure subscription drops 2%; a company living almost entirely on ads drops nearly 15%. When advertisers cut budgets in 2022, Meta’s annual revenue fell for the first time since its IPO; Netflix’s revenue still grew that year.',
});

export const i5l1StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个转身',
    title: 'Netflix 为什么开始放广告',
    body: '十几年来，Netflix 只做一件事：每月收会员费，没有广告。2022 年 11 月，它推出了更便宜的「广告套餐」。\n\n这不是换个页面那么简单——付钱的人变了。',
  },
  {
    type: 'choice',
    question: '推出广告套餐之后，Netflix 的收入多了一个新的付款人。是谁？',
    options: ['会员本人', '广告主：品牌花钱买会员的注意力', '电影制片厂', '政府补贴'],
    correct: 1,
    explain: '会员付的钱变少了，差额由广告主补上。拆一家公司，第一问永远是：谁在付钱，付的是什么钱。',
  },
  {
    type: 'concept',
    kicker: '起个名字',
    title: '四种收入原型',
    body: '大多数公司的收入，都能归到这四类里（或它们的组合）：',
    bullets: [
      '广告：用户免费，广告主买注意力（Meta、谷歌）',
      '订阅：用户按月或按年付费（Netflix、Spotify）',
      '抽成：每笔交易抽一小口（Visa、App Store 的 15–30%）',
      '硬件：一台台卖产品（iPhone 约占苹果收入一半）',
    ],
  },
  mix(true),
  {
    type: 'choice',
    question: '2022 年，Meta 和谷歌的收入增速同时骤降，Netflix、Visa 受影响小得多。最主要的原因是？',
    options: ['Meta 和谷歌的产品变差了', '广告预算是企业最容易先砍的开支，广告型公司最先感受到经济降温', '监管罚款', 'Netflix 和 Visa 涨价了'],
    correct: 1,
    explain: '企业要省钱，最先停的是广告投放；会员费和刷卡抽成跟着消费走，变化慢得多。看懂原型，就能预判宏观风向先吹倒谁。',
  },
  {
    type: 'tf',
    statement: '苹果只是一家卖硬件的公司。',
    answer: false,
    explain: '错误。服务收入（App Store 抽成、iCloud、Apple Music 等）一年约 $850 亿、毛利率约 71%（第 2 单元算过）。苹果是「硬件 + 抽成 + 订阅」的组合体。',
  },
  {
    type: 'match',
    prompt: '把公司和它最主要的收入原型对上',
    pairs: [
      ['Meta', '卖注意力给广告主'],
      ['Spotify', '按月收会员费'],
      ['Visa', '每笔刷卡抽一小口'],
      ['iPhone 业务', '一台台卖产品'],
    ],
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '先问谁在付钱',
    body: '三句话带走：',
    display: '谁在付钱？付的是什么钱？为什么会一直付？',
    bullets: [
      '四种原型：广告、订阅、抽成、硬件',
      '原型决定体质：广告最怕衰退，订阅最稳',
      '大公司常是组合体，要看分部收入',
    ],
    footer: '下一课：把生意缩小到一个会员，算算这一单到底赚不赚。',
  },
];

export const i5l1StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A turn',
    title: 'Why Netflix started showing ads',
    body: 'For more than a decade Netflix did one thing: charge a monthly membership, no ads. In November 2022 it launched a cheaper “with ads” plan.\n\nThat’s more than a new page — the person paying changed.',
  },
  {
    type: 'choice',
    question: 'With the ad plan, Netflix gained a new payer. Who?',
    options: ['The member', 'Advertisers: brands paying for members’ attention', 'Film studios', 'Government subsidies'],
    correct: 1,
    explain: 'Members pay less, and advertisers make up the difference. The first question about any company is always: who pays, and for what?',
  },
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Four revenue archetypes',
    body: 'Most companies’ revenue falls into one of these four (or a mix):',
    bullets: [
      'Advertising: users are free, advertisers buy attention (Meta, Google)',
      'Subscription: users pay monthly or yearly (Netflix, Spotify)',
      'Take rate: a small cut of every transaction (Visa, the App Store’s 15–30%)',
      'Hardware: selling products one by one (iPhone is about half of Apple’s revenue)',
    ],
  },
  mix(false),
  {
    type: 'choice',
    question: 'In 2022 Meta’s and Google’s growth collapsed at the same time, while Netflix and Visa were hit far less. The main reason?',
    options: ['Meta’s and Google’s products got worse', 'Ad budgets are the first thing companies cut, so ad businesses feel a slowdown first', 'Regulatory fines', 'Netflix and Visa raised prices'],
    correct: 1,
    explain: 'When companies save money, ads are the first thing to go; memberships and card fees track consumer spending and move much more slowly. Know the archetype and you can predict who the macro wind knocks over first.',
  },
  {
    type: 'tf',
    statement: 'Apple is just a hardware company.',
    answer: false,
    explain: 'False. Services (App Store commissions, iCloud, Apple Music and more) bring in about $85 billion a year at about a 71% gross margin (you calculated it in Unit 2). Apple is hardware + take rate + subscription.',
  },
  {
    type: 'match',
    prompt: 'Match each company to its main revenue archetype',
    pairs: [
      ['Meta', 'Sells attention to advertisers'],
      ['Spotify', 'Monthly membership fee'],
      ['Visa', 'A small cut of every card swipe'],
      ['iPhone business', 'Sells products one by one'],
    ],
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'First ask who pays',
    body: 'Three lines to take with you:',
    display: 'Who pays? For what? Why will they keep paying?',
    bullets: [
      'Four archetypes: advertising, subscription, take rate, hardware',
      'The archetype sets the constitution: ads fear recessions most, subscriptions are steadiest',
      'Big companies are often mixes — read the segment revenue',
    ],
    footer: 'Next lesson: shrink the business down to one member and check whether that one sale makes money.',
  },
];
