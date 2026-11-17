import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 14 单元第 3 课「信念与仓位：确定性要标价」。
 * 凯利公式：f = p − (1 − p) / b，p 为胜率，b 为赚赔比（赢时赚的 ÷ 输时亏的）。
 */

const kelly = (p: number, b: number) => p - (1 - p) / b;

const sizing = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '拖动胜率和赚赔比，看凯利公式建议押上多少本金，以及职业玩家常用的「半凯利」。'
    : 'Drag the win rate and the payoff ratio, and see how much of your capital the Kelly formula suggests — and the “half Kelly” professionals often use.',
  display: zh ? '凯利仓位 = 胜率 − 输率 ÷ 赚赔比' : 'Kelly size = win rate − loss rate ÷ payoff ratio',
  inputs: [
    { key: 'p', label: zh ? '胜率' : 'Win rate', min: 30, max: 80, step: 5, start: 55, format: (v) => `${v}%` },
    { key: 'b', label: zh ? '赚赔比（赢时赚 ÷ 输时亏）' : 'Payoff ratio (win ÷ loss)', min: 0.5, max: 3, step: 0.25, start: 1, format: (v) => `${v} : 1` },
  ],
  outputs: [
    {
      label: zh ? '凯利仓位' : 'Kelly size',
      value: (v) => kelly(v.p / 100, v.b),
      format: (n) => (n <= 0 ? (zh ? '0%：不该下注' : '0%: don’t bet') : `${(n * 100).toFixed(0)}%`),
      main: true,
    },
    { label: zh ? '半凯利（实战常用）' : 'Half Kelly (common in practice)', value: (v) => Math.max(0, kelly(v.p / 100, v.b) / 2), format: (n) => `${(n * 100).toFixed(0)}%` },
  ],
  visit: { p: [40, 70] },
  explain: zh
    ? '胜率 55%、赚赔 1:1，凯利只建议押 10%；胜率 40% 时，除非赚赔比够高，凯利直接说别下注。哪怕胜率 70%，它也从不建议押上全部——一次坏运气就会出局。实战再打对折，是因为你对胜率的估计本身也会错。'
    : 'At a 55% win rate and 1:1 payoff, Kelly suggests just 10%; at 40%, unless the payoff is high enough, it says don’t bet. Even at 70% it never says bet everything — one bad break and you’re out. Practitioners halve it again because their estimate of the win rate can itself be wrong.',
});

export const i14l3StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个场景',
    title: '拿到一手好牌，押多少？',
    body: '德州扑克的职业玩家拿到好牌会加注，拿到很好的牌会重注，但几乎从不把全部筹码押在一手牌上。\n\n投资也一样：有了 thesis，下一个问题是买多少。',
  },
  sizing(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '仓位是信念的价格',
    body: '决定仓位要分开回答两个问题：',
    bullets: [
      '我有多确定？（胜率）',
      '对了赚多少、错了亏多少？（赚赔比）',
      '凯利公式把两者合成一个比例',
      '实战用半凯利，给「估错」留余量',
    ],
  },
  {
    type: 'choice',
    question: '一笔交易胜率 90%，但输了会亏光。为什么依然不该重仓？',
    options: ['胜率太低', '仓位由胜率和亏损幅度共同决定：10% 的概率归零，重复几次几乎注定出局', '因为听起来不专业', '监管不允许'],
    correct: 1,
    explain: '期权篇里裸卖期权的教训在这里合流：高胜率小赚 + 小概率巨亏，长期期望可能为负。',
  },
  {
    type: 'fill',
    before: '写 thesis 时顺手写下「信念分（1–10）」和仓位。信念只有 5 分却重仓，说明',
    after: '在替你说谎。',
    options: ['仓位', '市场', '财报', '新闻'],
    correct: 0,
    explain: '要么补研究把信念提上去，要么把仓位降下来，让两者对齐。',
  },
  {
    type: 'choice',
    question: '研究很充分，信念 9 分，却只买了 1%「意思一下」。问题在哪？',
    options: ['很稳健，没问题', '研究没有变成回报：高信念低仓位和低信念高仓位一样是错配', '应该等回调', '仓位越小越好'],
    correct: 1,
    explain: '纪律不只是少亏，也是该赚时赚够。两个方向的错配都要在复盘时记下来。',
  },
  {
    type: 'concept',
    kicker: '第 14 单元 · 完成',
    title: '一份完整的 thesis',
    body: '把三课合在一起：',
    display: '一句话逻辑 + 三条独立证据 + 信念分 → 仓位',
    bullets: [
      '能被推翻的判断',
      '数来源，不数声音',
      '仓位和信念对齐',
    ],
    footer: '下一单元：先写好「什么情况发生，我就错了」。',
  },
];

export const i14l3StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A scene',
    title: 'A strong hand — how much do you bet?',
    body: 'Professional poker players raise with good hands and bet big with great ones, but almost never push all their chips on a single hand.\n\nInvesting is the same: once you have a thesis, the next question is how much to buy.',
  },
  sizing(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Position size is the price of conviction',
    body: 'Sizing means answering two questions separately:',
    bullets: [
      'How sure am I? (win rate)',
      'How much if right, how much if wrong? (payoff ratio)',
      'The Kelly formula combines them into one fraction',
      'In practice use half Kelly, leaving room for misjudging',
    ],
  },
  {
    type: 'choice',
    question: 'A trade wins 90% of the time, but losing wipes you out. Why still not size it big?',
    options: ['The win rate is too low', 'Size depends on both win rate and the size of the loss: a 10% chance of zero, repeated a few times, almost guarantees you’re out', 'It sounds unprofessional', 'Regulators forbid it'],
    correct: 1,
    explain: 'The lesson from selling naked options in the options track shows up here: frequent small wins + rare huge losses can have a negative long-run expectation.',
  },
  {
    type: 'fill',
    before: 'When writing a thesis, also note a conviction score (1–10) and position size. Conviction of 5 with a huge position means your',
    after: 'is lying for you.',
    options: ['position', 'market', 'report', 'news'],
    correct: 0,
    explain: 'Either research more to raise conviction, or cut the position — bring the two into line.',
  },
  {
    type: 'choice',
    question: 'Thorough research, conviction 9, yet you bought a 1% position “just a little”. What’s the problem?',
    options: ['Very prudent, no problem', 'The research never turned into returns: high conviction with a tiny position is as mismatched as low conviction with a big one', 'Should wait for a pullback', 'The smaller the better'],
    correct: 1,
    explain: 'Discipline isn’t only losing less; it’s also earning enough when you’re right. Log mismatches in both directions when you review.',
  },
  {
    type: 'concept',
    kicker: 'Unit 14 · complete',
    title: 'A complete thesis',
    body: 'Three lessons together:',
    display: 'one-line logic + 3 independent proofs + conviction → size',
    bullets: [
      'A judgment that can be disproven',
      'Count sources, not voices',
      'Size matches conviction',
    ],
    footer: 'Next unit: write down in advance “if this happens, I’m wrong”.',
  },
];
