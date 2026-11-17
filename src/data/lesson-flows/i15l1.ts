import type { LessonStep } from '../optionsCourse';
import { usdEn, usdZh } from './fmt';

/**
 * 投资主线 第 15 单元第 1 课「预先写下证伪条件」。
 * 接第 14 单元的 Costco：会员费约 $46 亿、营业利润约 $81 亿、全球续费率约 90%；
 * 2024 年 9 月美加基础会员费 $60 → $65（约 +8%）。
 * 计算器（简化）：会员费收入 ≈ 46 亿 × (1 + 提价) × (续费率 ÷ 90%)。
 */

const FEES = 46e8;
const EBIT = 81e8;
const BASE_RENEW = 90;
const fee = (v: Record<string, number>) => FEES * (1 + v.h / 100) * (v.r / BASE_RENEW);

const renewal = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '你的 thesis：「Costco 能持续提高会员费」。2024 年它提价约 8%。拖动续费率，看提价之后，会员费和营业利润还剩多少增长。'
    : 'Your thesis: “Costco can keep raising membership fees.” In 2024 it raised them about 8%. Drag the renewal rate and see how much growth in fees and operating profit is left after the increase.',
  display: zh ? '会员费 ≈ 46 亿 × (1 + 提价) × 续费率 ÷ 90%' : 'fees ≈ $4.6B × (1 + increase) × renewal ÷ 90%',
  inputs: [
    { key: 'h', label: zh ? '会员费提价' : 'Fee increase', min: 0, max: 15, step: 1, start: 8, fixed: true, format: (v) => `+${v}%` },
    { key: 'r', label: zh ? '续费率' : 'Renewal rate', min: 80, max: 94, step: 1, start: 90, format: (v) => `${v}%` },
  ],
  outputs: [
    {
      label: zh ? '营业利润变化' : 'Change in operating profit',
      value: (v) => (fee(v) - FEES) / EBIT,
      format: (n) => `${n > 0.0005 ? '+' : n < -0.0005 ? '−' : ''}${Math.abs(n * 100).toFixed(1)}%`,
      main: true,
    },
    { label: zh ? '会员费收入' : 'Membership fee revenue', value: (v) => fee(v), format: (n) => (zh ? usdZh(n) : usdEn(n)) },
  ],
  visit: { r: [84, 92] },
  explain: zh
    ? '续费率保持 90%，提价直接让营业利润多出约 4.5%；续费率跌到 84%，提价的好处几乎被抵消。论点的地基是续费率，所以警报器也该装在续费率上，而不是装在股价上。'
    : 'Hold renewals at 90% and the increase adds about 4.5% to operating profit; let renewals slip to 84% and the benefit is almost wiped out. The thesis stands on the renewal rate, so the alarm belongs on the renewal rate — not on the stock price.',
});

export const i15l1StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个约定',
    title: '「三年不盈利，我就回去上班」',
    body: '一个朋友辞职创业前，和你约好这句话，写在纸上签了字。\n\n三年后他还在亏钱，却有一百个「再给我一年」的理由。那张纸，就是写给此刻的他看的。',
  },
  {
    type: 'choice',
    question: '为什么这张纸必须在创业前写，而不是三年后再决定？',
    options: ['三年后会忘记', '三年后的他已经投入太多、情绪太重，判断会被侥幸改写；冷静时定的规则才可信', '法律要求', '没有区别'],
    correct: 1,
    explain: '裁判和运动员不能是同一个人。冷静时写下的规则，是给情绪中的自己下的命令。',
  },
  renewal(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '证伪条件',
    body: '买入前写下：「如果 ___ 发生，我的 thesis 就错了，我会 ___。」合格的条件有三个要素：',
    bullets: [
      '具体：指标 + 阈值',
      '可观察：公开数据能查到',
      '有期限：在什么时间内',
      '装在 thesis 最弱的一环上',
    ],
  },
  {
    type: 'choice',
    question: '以 Costco 为例，哪个是合格的证伪条件？',
    options: [
      '「基本面恶化就卖」',
      '「全球续费率连续两季低于 88%，一周内清仓」',
      '「感觉不对就走」',
      '「股价跌 10% 再说」',
    ],
    correct: 1,
    explain: '指标（续费率）+ 阈值（88%）+ 次数（连续两季）+ 动作（一周内清仓）。到时不需要再做决定，只需要执行。',
  },
  {
    type: 'tf',
    statement: '证伪条件可以等持仓出现浮亏之后再补写。',
    answer: false,
    explain: '浮亏时写的条件，会被侥幸心理系统性放宽。降落伞必须在起跳前打包好。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '先写好「我错在哪」',
    body: '三句话带走：',
    display: '如果 ___ 发生，我就错了，我会 ___',
    bullets: [
      '指标 + 阈值 + 期限 + 动作',
      '装在论点的地基上，不装在股价上',
      '起跳前打包降落伞',
    ],
    footer: '下一课：证伪条件和止损线，是一回事吗？',
  },
];

export const i15l1StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A pact',
    title: '“No profit in three years, and I go back to a job”',
    body: 'Before quitting to start a company, a friend makes this pact with you, writes it down and signs it.\n\nThree years later they’re still losing money — and have a hundred reasons for “just one more year”. That piece of paper was written for exactly this moment.',
  },
  {
    type: 'choice',
    question: 'Why must the paper be written before starting, not decided three years later?',
    options: ['They’d forget', 'Three years in, they’ve invested too much and feel too strongly; hope rewrites the judgment. Only rules set while calm can be trusted', 'The law requires it', 'No difference'],
    correct: 1,
    explain: 'The referee and the player can’t be the same person. Rules written while calm are orders to your emotional future self.',
  },
  renewal(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Conditions that prove you wrong',
    body: 'Before buying, write: “If ___ happens, my thesis is wrong and I will ___.” A good condition has three parts:',
    bullets: [
      'Specific: a metric + a threshold',
      'Observable: checkable in public data',
      'Time-bound: within what period',
      'Placed on the thesis’s weakest link',
    ],
  },
  {
    type: 'choice',
    question: 'Taking Costco, which is a proper condition?',
    options: [
      '“Sell if fundamentals deteriorate”',
      '“If the global renewal rate is below 88% for two straight quarters, sell everything within a week”',
      '“Leave if it feels wrong”',
      '“Revisit if the stock falls 10%”',
    ],
    correct: 1,
    explain: 'Metric (renewal rate) + threshold (88%) + count (two straight quarters) + action (sell within a week). When it triggers, there’s nothing left to decide — only to do.',
  },
  {
    type: 'tf',
    statement: 'You can write your disproving conditions after the position is already showing a loss.',
    answer: false,
    explain: 'Conditions written while losing get loosened by hope, every time. Pack the parachute before you jump.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Write down how you could be wrong first',
    body: 'Three lines to take with you:',
    display: 'if ___ happens, I’m wrong, and I will ___',
    bullets: [
      'Metric + threshold + deadline + action',
      'Put it on the thesis’s foundation, not on the price',
      'Pack the parachute before jumping',
    ],
    footer: 'Next lesson: is a disproving condition the same thing as a stop-loss?',
  },
];
