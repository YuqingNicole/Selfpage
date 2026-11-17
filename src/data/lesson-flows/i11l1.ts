import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 11 单元第 1 课「二阶导思维：恶化减速就是利好」。
 * 2022 年美国 CPI 同比：6 月 9.1% → 7 月 8.5% → 8 月 8.3% → 9 月 8.2% → 10 月 7.7%（11 月 10 日公布，纳指单日 +7.4%）。
 * 计算器：一家公司收入增速 +60% → +45% → +32% → +24%，拖动下季增速，看一阶导和二阶导。
 */

const LAST = 24;
const PREV_DROP = -8; // 32 → 24

const decel = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '一家公司过去四个季度的收入增速：+60% → +45% → +32% → +24%。拖动下一季的增速，看市场会怎么读。'
    : 'A company’s revenue growth over four quarters: +60% → +45% → +32% → +24%. Drag next quarter’s growth and see how the market reads it.',
  display: zh ? '水平：增速多少 ｜ 一阶导：比上季快还是慢 ｜ 二阶导：减速在加快还是放缓' : 'level → faster or slower? → is the slowdown speeding up or easing?',
  inputs: [{ key: 'g', label: zh ? '下一季收入增速' : 'Next quarter’s revenue growth', min: 5, max: 35, step: 1, start: 12, format: (v) => `+${v}%` }],
  outputs: [
    { label: zh ? '比上季（+24%）' : 'vs last quarter (+24%)', value: (v) => v.g - LAST, format: (n) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n)} pt`, main: true },
    {
      label: zh ? '市场怎么读' : 'How the market reads it',
      value: (v) => v.g - LAST,
      format: (n) =>
        n >= 0
          ? zh ? '重新加速：大利好' : 'Re-accelerating: very bullish'
          : n > PREV_DROP
            ? zh ? '还在减速，但减速在放缓：可能见底' : 'Still slowing, but the slowdown is easing: may be bottoming'
            : zh ? '减速没有放缓：继续下调估值' : 'Slowdown not easing: keep marking it down',
    },
  ],
  visit: { g: [12, 26] },
  explain: zh
    ? '同样是「还在增长」，+12% 意味着减速在加快，+20% 意味着减速在放缓，+26% 则是重新加速。三种情况的增速水平都不低，市场的反应却完全不同——行情住在二阶导里。'
    : 'All of these are “still growing”, but +12% means the slowdown is speeding up, +20% means it’s easing, and +26% is re-acceleration. None of the growth levels is low, yet the market reacts completely differently — price action lives in the second derivative.',
});

export const i11l1StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个数字',
    title: '通胀 7.7%，纳指一天 +7.4%',
    body: '2022 年 11 月 10 日，美国公布 10 月 CPI：同比 7.7%，仍是四十年来的高位。\n\n当天，纳斯达克指数大涨 7.4%，创两年来最大单日涨幅。',
  },
  {
    type: 'choice',
    question: '一个「还很糟」的通胀数字，为什么能引发暴涨？',
    options: ['市场算错了', '通胀从 6 月的 9.1% 一路回落，这次降得比预期多——「恶化结束」改写了整条加息路径', '7.7% 是个好数字', '空头的偶然爆仓'],
    correct: 1,
    explain: '通胀拐头 → 加息快到头了 → 贴现率下移 → 估值修复，这条链在一天之内完成定价。水平留给经济学家，拐点属于市场。',
  },
  {
    type: 'concept',
    kicker: '起个名字',
    title: '水平、方向、速度',
    body: '拿到任何数据，问三层：',
    display: '水平 → 方向（一阶导）→ 变化的速度（二阶导）',
    bullets: [
      '水平：数字本身高还是低',
      '一阶导：在变好还是变坏',
      '二阶导：变好或变坏的速度在加快还是放缓',
      '行情大多住在第三层',
    ],
  },
  decel(true),
  {
    type: 'tf',
    statement: '等经济数据全面确认好转再买入，通常已经错过了涨幅最大的一段。',
    answer: true,
    explain: '正确。2020 年 3 月 23 日股市见底时，失业率还没开始飙升；等数据确认好转，已经是几个月后、指数高了四成。市场用预期抢跑现实。',
  },
  {
    type: 'fill',
    before: '读数据的三层框架：水平 → 方向 →',
    after: '，行情大多由最后一层驱动。',
    options: ['变化的速度', '数据来源', '发布时间', '历史均值'],
    correct: 0,
    explain: '「在恶化，但恶化在减速」与「在改善，但改善在减速」，是最容易赚到或亏掉大钱的两种时刻。',
  },
  {
    type: 'choice',
    question: '2021–22 年，Zoom、Shopify 这类公司收入还在增长，股价却跌得最狠。按本课框架，为什么？',
    options: ['市场不看增长', '增速一季比一季慢，市场提前把它滑向平庸的终点折算进了价格', '它们都亏损了', '纯属巧合'],
    correct: 1,
    explain: '估值比增速先着陆。减速本身就是市场眼里的坏消息，哪怕增速的水平还很高。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '市场炒的是变化',
    body: '三句话带走：',
    display: '水平 → 方向 → 速度',
    bullets: [
      '恶化在减速，常常就是利好',
      '高增长但持续减速，估值会先跌',
      '等数据全面确认，通常已经晚了',
    ],
    footer: '下一课：拐点最早会出现在财报的哪个角落？',
  },
];

export const i11l1StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'One number',
    title: 'Inflation 7.7%, Nasdaq +7.4% in a day',
    body: 'On November 10, 2022, the US reported October CPI: 7.7% year over year, still near a 40-year high.\n\nThat day the Nasdaq jumped 7.4%, its biggest one-day gain in two years.',
  },
  {
    type: 'choice',
    question: 'Why could a still-terrible inflation number spark a huge rally?',
    options: ['The market miscalculated', 'Inflation had fallen steadily from 9.1% in June, and this time by more than expected — “the worst is over” rewrote the whole path of rate hikes', '7.7% is a good number', 'A random short squeeze'],
    correct: 1,
    explain: 'Inflation turning → rate hikes nearly done → lower discount rates → valuations recover: the whole chain was priced in a single day. Levels are for economists; turning points belong to the market.',
  },
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Level, direction, speed',
    body: 'With any piece of data, ask three layers:',
    display: 'level → direction (1st derivative) → speed of change (2nd derivative)',
    bullets: [
      'Level: is the number high or low',
      '1st derivative: is it getting better or worse',
      '2nd derivative: is the improvement or deterioration speeding up or slowing down',
      'Most price action lives in the third layer',
    ],
  },
  decel(false),
  {
    type: 'tf',
    statement: 'Waiting for economic data to fully confirm a recovery before buying usually misses the biggest part of the rally.',
    answer: true,
    explain: 'True. When stocks bottomed on March 23, 2020, unemployment hadn’t even started to spike; by the time data confirmed a recovery, months had passed and the index was 40% higher. Markets front-run reality with expectations.',
  },
  {
    type: 'fill',
    before: 'The three-layer frame for data: level → direction →',
    after: ', and the last layer drives most price action.',
    options: ['speed of change', 'data source', 'release time', 'historical average'],
    correct: 0,
    explain: '“Getting worse, but more slowly” and “getting better, but more slowly” are the two moments when the most money is made or lost.',
  },
  {
    type: 'choice',
    question: 'In 2021–22, companies like Zoom and Shopify were still growing revenue, yet their stocks fell hardest. By this lesson’s frame, why?',
    options: ['The market ignores growth', 'Growth slowed quarter after quarter, and the market priced in its slide toward an ordinary endpoint ahead of time', 'They were all losing money', 'Pure coincidence'],
    correct: 1,
    explain: 'Valuations land before growth does. A slowdown is bad news to the market in itself, even while the level of growth is still high.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Markets trade change',
    body: 'Three lines to take with you:',
    display: 'level → direction → speed',
    bullets: [
      'Deterioration that’s slowing is often good news',
      'High but steadily slowing growth: valuations fall first',
      'By the time data fully confirms, it’s usually late',
    ],
    footer: 'Next lesson: which corner of the financials shows a turning point first?',
  },
];
