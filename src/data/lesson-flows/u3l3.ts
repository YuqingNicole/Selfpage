import type { LessonStep } from '../optionsCourse';
import { U3_IV } from './u3l1';

/**
 * 第 3 单元第 3 课「时间衰减」。
 * 股价一整月不动，$3 的平值 Call 跌到 0 → 先猜衰减的节奏 → 拖动时间看加速 →
 * 落点猜「价格跌到一半时还剩几天」→ 时间站在谁那边 → 买方怎么应对。
 * 数字（Black-Scholes，IV 25%）：60 天 $4.36 · 30 天 $3.02 · 8 天 $1.52 · 7 天 $1.42 · 到期 $0。
 */

export const u3l3StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一张会融化的合约',
    title: '股价一动不动，期权照样在亏',
    body: '假设 XYZ 接下来整整一个月都停在 $100。\n\n你那张 30 天后到期的 $100 Call，会从 $3 一路跌到 $0——股价一分没动。上一课说过，平值 Call 的价格全是时间价值。现在的问题是：它是怎么消失的？',
  },
  {
    type: 'choice',
    question: '先猜：30 天里，这 $3 的时间价值是怎么消失的？',
    options: ['每天均匀少 $0.10', '前期跌得快，后期慢', '前期跌得慢，越接近到期越快', '最后一天一次性归零'],
    correct: 2,
    explain: '越接近到期，跌得越快。下一步拖一下就能亲眼看到。',
  },
  {
    type: 'value',
    mode: 'explore',
    prompt: '股价固定在 $100。往右拖动时间，看这张平值 Call 的价格怎么跌。',
    option: 'call',
    strike: 100,
    iv: U3_IV,
    spot: { range: [100, 100], start: 100, fixed: true },
    days: { range: [0, 60], start: 60 },
    xAxis: 'days',
    visit: { days: [3, 60] },
    explain: '从剩 60 天到剩 30 天，只跌了约 $1.34（$4.36 → $3.02）；最后 30 天却跌掉整整 $3.02，光最后一周就跌了约 $1.42。这就是时间衰减，而且它会加速。',
  },
  {
    type: 'value',
    mode: 'target',
    prompt: '剩 30 天时它值 $3.02。剩多少天时，价格会跌到大约一半（$1.51）？把时间拖到你认为的位置。',
    option: 'call',
    strike: 100,
    iv: U3_IV,
    spot: { range: [100, 100], start: 100, fixed: true },
    days: { range: [0, 30], start: 30 },
    xAxis: 'days',
    target: { control: 'days', answer: 8, tolerance: 1 },
    explain: '大约还剩 8 天（约 $1.52）。前 22 天只跌掉一半，剩下的一半在最后 8 天里消失。平值期权的时间价值大致和「剩余天数的平方根」成正比，所以越到最后掉得越快。',
  },
  {
    type: 'choice',
    question: '时间衰减对谁有利？',
    options: ['期权买方', '期权卖方', '交易所', '对谁都没影响'],
    correct: 1,
    explain: '每过一天，期权的时间价值就少一点，卖方要「赔」的就少一点。回想第 2 单元：卖方赚的是「平静」，时间正是卖方的朋友。',
  },
  {
    type: 'choice',
    question: '「方向看对了，却还是亏钱」，对期权买方来说最常见的原因是？',
    options: ['交易所故障', '涨得太少或太慢，时间价值的损耗超过了内在价值的增长', '权利金被没收', '卖方违约'],
    correct: 1,
    explain: '买方需要股价在有限时间内涨得够多。磨磨蹭蹭的小涨，会被时间衰减吃掉。',
  },
  {
    type: 'concept',
    kicker: '买方怎么办',
    title: '给你的判断留够时间',
    body: '同样看涨，你可以买 7 天后到期的，也可以买 60 天后到期的。\n\n7 天的便宜（约 $1.42），但股价得在一周内到位，而且正处在衰减最猛的阶段；60 天的贵一些（约 $4.36），却给了判断兑现的时间，前几周衰减也慢得多。买方最常见的亏法，就是方向对了、时间不够。',
  },
  {
    type: 'tf',
    statement: '周末虽然不开盘，期权的时间价值同样在流逝。',
    answer: true,
    explain: '正确。日历时间照走不误，做市商通常会在周五就提前把周末的衰减算进价格。',
  },
  {
    type: 'match',
    prompt: '把概念和描述配对',
    pairs: [
      ['时间衰减', '时间价值随到期临近而蒸发'],
      ['买方视角', '时间是敌人'],
      ['卖方视角', '时间是朋友'],
      ['衰减速度', '平值期权越接近到期越快'],
    ],
  },
  {
    type: 'concept',
    kicker: '第 3 单元完成',
    title: '期权的价格，是现在加上可能性',
    body: '把这个单元压缩成四句话：',
    bullets: [
      '实值、平值、虚值，看的是现在行权有没有钱赚',
      '期权价格 = 内在价值 + 时间价值，时间价值在平值处最大',
      '时间价值会随到期临近而消失，而且越到最后越快',
      '时间是买方的敌人、卖方的朋友：买期权要给判断留够时间',
    ],
    footer: '下一单元：除了股价和时间，还有什么在影响期权价格？',
  },
];

export const u3l3StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A contract that melts',
    title: 'The stock doesn’t move, and the option still loses',
    body: 'Suppose XYZ sits at exactly $100 for the whole next month.\n\nYour $100 call expiring in 30 days slides from $3 all the way to $0 — without the stock moving a cent. Last lesson showed that an ATM call’s price is all time value. The question now: how does it disappear?',
  },
  {
    type: 'choice',
    question: 'Guess first: how does that $3 of time value disappear over 30 days?',
    options: ['Evenly, $0.10 a day', 'Fast early, slow later', 'Slow early, faster and faster near expiry', 'All at once on the last day'],
    correct: 2,
    explain: 'The closer to expiry, the faster it falls. Drag it in the next step and see for yourself.',
  },
  {
    type: 'value',
    mode: 'explore',
    prompt: 'The stock is fixed at $100. Drag time to the right and watch this ATM call’s price fall.',
    option: 'call',
    strike: 100,
    iv: U3_IV,
    spot: { range: [100, 100], start: 100, fixed: true },
    days: { range: [0, 60], start: 60 },
    xAxis: 'days',
    visit: { days: [3, 60] },
    explain: 'From 60 days to 30 days left it only lost about $1.34 ($4.36 → $3.02); the last 30 days wipe out the full $3.02, about $1.42 of it in the final week alone. That’s time decay — and it accelerates.',
  },
  {
    type: 'value',
    mode: 'target',
    prompt: 'With 30 days left it’s worth $3.02. With how many days left will it be worth about half ($1.51)? Drag time to your answer.',
    option: 'call',
    strike: 100,
    iv: U3_IV,
    spot: { range: [100, 100], start: 100, fixed: true },
    days: { range: [0, 30], start: 30 },
    xAxis: 'days',
    target: { control: 'days', answer: 8, tolerance: 1 },
    explain: 'About 8 days left (around $1.52). The first 22 days take away only half; the other half vanishes in the last 8. An ATM option’s time value is roughly proportional to the square root of the days left, so it falls faster and faster at the end.',
  },
  {
    type: 'choice',
    question: 'Who does time decay favor?',
    options: ['Option buyers', 'Option sellers', 'The exchange', 'Nobody'],
    correct: 1,
    explain: 'Every day the option loses a little time value, so the seller owes a little less. Recall Unit 2: sellers get paid for calm, and time is their friend.',
  },
  {
    type: 'choice',
    question: 'For option buyers, what’s the most common reason for “right on direction, still lost money”?',
    options: ['An exchange outage', 'The move was too small or too slow, so time decay outpaced the gain in intrinsic value', 'The premium was confiscated', 'The seller defaulted'],
    correct: 1,
    explain: 'Buyers need a big enough move within a limited time. A slow, small rise gets eaten by time decay.',
  },
  {
    type: 'concept',
    kicker: 'What buyers can do',
    title: 'Give your view enough time',
    body: 'Same bullish view: you could buy the call expiring in 7 days, or the one expiring in 60.\n\nThe 7-day call is cheap (about $1.42), but the stock has to get there within a week — right in the steepest part of the decay. The 60-day call costs more (about $4.36) but gives your view time to play out, and it decays far more slowly in the early weeks. Buyers most often lose by being right on direction with too little time.',
  },
  {
    type: 'tf',
    statement: 'Even though markets are closed on weekends, an option’s time value keeps draining.',
    answer: true,
    explain: 'True. The calendar keeps running; market makers usually price in weekend decay as early as Friday.',
  },
  {
    type: 'match',
    prompt: 'Match each concept to its description',
    pairs: [
      ['Time decay', 'Time value evaporating as expiry nears'],
      ['Buyer’s view', 'Time is the enemy'],
      ['Seller’s view', 'Time is a friend'],
      ['Decay speed', 'Faster and faster for ATM options near expiry'],
    ],
  },
  {
    type: 'concept',
    kicker: 'Unit 3 complete',
    title: 'An option’s price is the present plus a possibility',
    body: 'The whole unit in four lines:',
    bullets: [
      'In, at, or out of the money asks whether exercising now would pay',
      'Option price = intrinsic value + time value; time value peaks at the money',
      'Time value disappears as expiry nears — faster and faster at the end',
      'Time is the buyer’s enemy and the seller’s friend: give a long option enough time',
    ],
    footer: 'Next unit: besides the stock and time, what else moves an option’s price?',
  },
];
