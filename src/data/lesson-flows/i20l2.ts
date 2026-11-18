import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 20 单元第 2 课「医药的特殊时钟」。
 * 默沙东 2023 年（近似）：总收入约 $600 亿，其中 Keytruda（K 药）约 $250 亿；核心专利约 2028 年到期。
 * 计算器：拖动专利到期后 K 药收入的流失比例，看默沙东总收入变化。
 */

const KEY = 250;
const TOTAL = 600;

const cliff = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '默沙东一年收入约 $600 亿，其中「药王」K 药约 $250 亿，核心专利约 2028 年到期。拖动专利到期后 K 药收入的流失比例，看默沙东的总收入会怎样。'
    : 'Merck’s revenue is about $60B a year, of which its blockbuster Keytruda brings in about $25B; key patents expire around 2028. Drag how much of Keytruda’s revenue is lost after expiry and see what happens to Merck’s total.',
  display: zh ? 'K 药 $250 亿 ÷ 总收入 $600 亿 ≈ 42%' : 'Keytruda $25B ÷ total $60B ≈ 42%',
  inputs: [{ key: 'e', label: zh ? 'K 药收入流失' : 'Keytruda revenue lost', min: 0, max: 90, step: 5, start: 0, format: (v) => `−${v}%` }],
  outputs: [
    { label: zh ? '默沙东总收入变化' : 'Change in Merck’s total revenue', value: (v) => (-KEY * v.e) / 100 / TOTAL, format: (n) => `${n < -0.0005 ? '−' : ''}${Math.abs(n * 100).toFixed(0)}%`, main: true },
    { label: zh ? '需要填的坑' : 'Hole to fill', value: (v) => (KEY * v.e) / 100, format: (n) => (zh ? `$${Math.round(n)} 亿` : `$${(n / 10).toFixed(1)}B`) },
  ],
  visit: { e: [20, 70] },
  explain: zh
    ? 'K 药流失一半，默沙东总收入就少两成，要填约 $125 亿的坑。所以市场给默沙东的估值一直偏保守：股价里已经装着这道悬崖。真正的变量，是新药管线和并购能不能在 2028 年前把坑填上。'
    : 'Lose half of Keytruda and Merck’s total revenue drops a fifth — a $12.5B hole to fill. That’s why the market has valued Merck cautiously: the cliff is already in the price. The real variable is whether the pipeline and acquisitions can fill the hole before 2028.',
});

export const i20l2StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一张门票',
    title: '限时的垄断',
    body: '一款新药就像一张限时的演唱会门票：专利期内独家演出，随便定价；门票一到期，隔壁马上开出十家翻唱酒吧，票价一折。\n\n这就是医药的时钟。',
  },
  {
    type: 'concept',
    kicker: '起个名字',
    title: '专利悬崖与管线',
    body: '医药的价值按专利计时：',
    bullets: [
      '研发约 10 年，上市后剩下的专利期常只有 8–12 年',
      '专利到期（专利悬崖）后仿制药涌入，原研收入断崖下跌',
      '三期临床的成败近乎二元：成功放量，失败归零',
      '单条管线是彩票，管线组合和平台才是生意',
    ],
  },
  cliff(true),
  {
    type: 'fill',
    before: '医药研发管线像期权组合：单条三期管线的结果近乎',
    after: '，所以组合和平台能力才是生意本身。',
    options: ['二元', '线性', '确定', '无关'],
    correct: 0,
    explain: '三期失败的公告让生物科技股单日跌 50%，是常态。单管线公司是彩票，平台型公司才能用组合消化二元风险。',
  },
  {
    type: 'tf',
    statement: '诺和诺德凭 GLP-1 减肥药，两年内成为欧洲市值最高的公司：一条重磅管线可以改写一家公司，甚至一个国家的股指。',
    answer: true,
    explain: '正确。GLP-1 还外溢到了别的行业：零食、饮料股的估值一度被「减肥药会减少消费」的叙事压低。一条管线的因果图，可以画到完全不相邻的行业。',
  },
  {
    type: 'choice',
    question: '中国的药品集中带量采购（集采）对不同医药资产的影响，该怎么区分？',
    options: ['所有药企都一样受损', '仿制药和成熟药被大幅压价、估值永久下移；真正的创新药是政策鼓励的方向，两类资产要分开定价', '所有药企都受益', '没有影响'],
    correct: 1,
    explain: '2018 年第一轮集采，中标价平均降幅约 52%。政策像一把刀，把行业切成了两半。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '医药按专利计时',
    body: '三句话带走：',
    display: '专利期 → 悬崖 → 管线能否接上',
    bullets: [
      '股价里往往已经装着悬崖',
      '单条管线是彩票，组合才是生意',
      '政策会把行业切成两半',
    ],
    footer: '最后一课：拿到一个完全陌生的行业，怎么下手？',
  },
];

export const i20l2StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A ticket',
    title: 'A monopoly with an expiry date',
    body: 'A new drug is like a time-limited concert ticket: exclusive shows during the patent, priced at will. The day it expires, ten cover bars open next door at a tenth of the price.\n\nThat’s the healthcare clock.',
  },
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Patent cliffs and pipelines',
    body: 'Drug value runs on patent time:',
    bullets: [
      'About 10 years of development often leaves only 8–12 years of patent after launch',
      'After expiry (the patent cliff), generics flood in and the original’s revenue drops off a cliff',
      'Phase 3 trials are nearly binary: success means a launch, failure means zero',
      'One drug candidate is a lottery ticket; a portfolio and platform are the business',
    ],
  },
  cliff(false),
  {
    type: 'fill',
    before: 'A drug pipeline is like a portfolio of options: a single Phase 3 candidate’s outcome is nearly',
    after: ', so the portfolio and platform are the business itself.',
    options: ['binary', 'linear', 'certain', 'irrelevant'],
    correct: 0,
    explain: 'A biotech falling 50% in a day on a Phase 3 failure is routine. Single-candidate companies are lottery tickets; platform companies can absorb binary risk across a portfolio.',
  },
  {
    type: 'tf',
    statement: 'Novo Nordisk became Europe’s most valuable company within two years on its GLP-1 weight-loss drugs: one blockbuster can reshape a company, even a country’s stock index.',
    answer: true,
    explain: 'True. GLP-1 spilled into other industries too: snack and beverage stocks were marked down for a while on the story that weight-loss drugs would cut consumption. One drug’s causal map can reach industries that look completely unrelated.',
  },
  {
    type: 'choice',
    question: 'How should you distinguish the effect of China’s volume-based drug procurement on different healthcare assets?',
    options: ['All drugmakers suffer equally', 'Generics and older drugs get big price cuts and permanently lower valuations; truly innovative drugs are what policy encourages — price the two separately', 'All drugmakers benefit', 'No effect'],
    correct: 1,
    explain: 'In the first round in 2018, winning bid prices fell about 52% on average. Policy acted like a knife cutting the industry in two.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Healthcare runs on patent time',
    body: 'Three lines to take with you:',
    display: 'patent life → cliff → can the pipeline take over',
    bullets: [
      'The cliff is often already in the price',
      'One candidate is a lottery ticket; a portfolio is a business',
      'Policy can cut an industry in two',
    ],
    footer: 'Last lesson: handed an industry you know nothing about, where do you start?',
  },
];
