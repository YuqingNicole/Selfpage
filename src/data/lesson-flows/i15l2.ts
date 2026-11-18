import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 15 单元第 2 课「两种止损：论点止损与价格止损」。
 * 计算器：亏损 d 后回本需要涨 1 / (1 − d) − 1；按每年 10% 计算需要的年数。
 */

const need = (d: number) => 1 / (1 - d / 100) - 1;

const recovery = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '拖动亏损幅度，看要涨多少才能回本，以及按每年 10% 的回报要多少年。'
    : 'Drag the size of the loss and see how much you need to gain to get back to even — and how many years that takes at 10% a year.',
  display: zh ? '回本涨幅 = 1 ÷ (1 − 亏损) − 1' : 'gain to break even = 1 ÷ (1 − loss) − 1',
  inputs: [{ key: 'd', label: zh ? '亏损幅度' : 'Loss', min: 5, max: 80, step: 5, start: 10, format: (v) => `−${v}%` }],
  outputs: [
    { label: zh ? '回本需要涨' : 'Gain needed to break even', value: (v) => need(v.d), format: (n) => `+${(n * 100).toFixed(0)}%`, main: true },
    { label: zh ? '按每年 10%，需要' : 'At 10% a year, it takes', value: (v) => Math.log(1 + need(v.d)) / Math.log(1.1), format: (n) => (zh ? `${n.toFixed(1)} 年` : `${n.toFixed(1)} years`) },
  ],
  visit: { d: [10, 50] },
  explain: zh
    ? '亏 10% 只要涨 11%，亏 50% 要涨 100%，亏 80% 要涨 400%——按每年 10% 要十几年。亏损越深，回本越难，而且难度是加速上升的。价格止损存在的理由就在这里：它保护的不是判断对错，而是你还能留在牌桌上。'
    : 'A 10% loss needs an 11% gain, a 50% loss needs 100%, an 80% loss needs 400% — over a decade and a half at 10% a year. The deeper the hole, the harder the climb, and it gets harder faster. That’s why price stops exist: they don’t protect whether you’re right, they protect your seat at the table.',
});

export const i15l2StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个场景',
    title: '两块仪表盘',
    body: '开车去外地。导航提示前方封路，你该换路，哪怕已经开了一半；油表快见底，你该去加油，哪怕路线完全正确。\n\n两块仪表盘看的是不同的东西。投资里也有两种「该停下」的信号。',
  },
  recovery(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '论点止损与价格止损',
    body: '两种止损，保护两样东西：',
    bullets: [
      '论点止损：证伪条件触发就走，和股价无关',
      '价格止损：亏到预设幅度就减仓，和论点无关',
      '前者保护判断体系，后者保护本金和心态',
      '触发任何一个，都要执行',
    ],
  },
  {
    type: 'choice',
    question: '持仓下跌 25%。你逐条核对：证伪条件一条都没触发，证据反而更强了。框架允许你做什么？',
    options: ['恐慌清仓', '在事先留好的额度内考虑加仓：证伪清单白纸黑字，价格下跌可能只是机会', '无限加仓摊低成本', '删掉软件不看'],
    correct: 1,
    explain: '「别人恐惧我贪婪」能执行的版本，不靠勇气，靠两样东西：写好的证伪清单，和事先留好的加仓额度。',
  },
  {
    type: 'choice',
    question: '证伪条件触发了，但股价当天反而涨了 5%。纪律上应该？',
    options: ['等它涨回成本再说', '按计划离场：价格常常晚于事实反应，涨了不是豁免', '加仓', '修改证伪条件'],
    correct: 1,
    explain: '2021 年不少人在基本面已经变坏后，因为「还在涨」选择留下，最后跌回起点以下。',
  },
  {
    type: 'fill',
    before: '下跌之后先问：是价格错了，还是我的',
    after: '错了？答案在证伪清单上，不在成本价上。',
    options: ['论点', '券商', '运气', '软件'],
    correct: 0,
    explain: '价格错了是机会，论点错了是陷阱。区分两者的工具，就是上一课写好的清单。',
  },
  {
    type: 'tf',
    statement: '只要论点是对的，仓位再重也可以扛过任何下跌。',
    answer: false,
    explain: '论点对，仓位过重扛不住波动，一样会被迫在最低点离场。期权篇的保证金一课讲的就是这个：先活下来，才有机会被证明是对的。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '两块仪表盘都要看',
    body: '三句话带走：',
    display: '论点止损 · 价格止损',
    bullets: [
      '论点错了就走，哪怕还在赚钱',
      '亏损越深，回本越难',
      '「跌了更便宜」之前，先查证伪清单',
    ],
    footer: '下一课：让人死扛和卖飞的，是哪几种心理偏误？',
  },
];

export const i15l2StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A scene',
    title: 'Two gauges',
    body: 'You’re on a long drive. The GPS says the road ahead is closed: change route, even halfway there. The fuel gauge is near empty: stop for gas, even if the route is perfect.\n\nThe two gauges measure different things. Investing has two kinds of “time to stop” signal too.',
  },
  recovery(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Thesis stops and price stops',
    body: 'Two kinds of stop, protecting two things:',
    bullets: [
      'Thesis stop: a disproving condition triggers, you exit — price is irrelevant',
      'Price stop: losses hit a preset level, you cut — thesis is irrelevant',
      'The first protects your judgment; the second, your capital and nerve',
      'If either triggers, act on it',
    ],
  },
  {
    type: 'choice',
    question: 'Your position is down 25%. You check every condition: none has triggered, and the evidence is actually stronger. What does the framework allow?',
    options: ['Panic-sell everything', 'Consider adding within the amount you set aside in advance: the conditions are in writing, and the drop may just be an opportunity', 'Keep averaging down without limit', 'Delete the app'],
    correct: 1,
    explain: 'The workable version of “be greedy when others are fearful” doesn’t rely on courage. It relies on two things: written disproving conditions, and room to add that you reserved in advance.',
  },
  {
    type: 'choice',
    question: 'A disproving condition triggers, but the stock rises 5% that day. What does discipline say?',
    options: ['Wait for it to get back to cost', 'Exit as planned: prices often react after the facts, and a rise is no exemption', 'Add more', 'Edit the condition'],
    correct: 1,
    explain: 'In 2021 plenty of people stayed after the fundamentals had turned because “it’s still going up”, and ended up below where they started.',
  },
  {
    type: 'fill',
    before: 'After a drop, first ask: is the price wrong, or is my',
    after: 'wrong? The answer is on your list of conditions, not in your cost basis.',
    options: ['thesis', 'broker', 'luck', 'app'],
    correct: 0,
    explain: 'A wrong price is an opportunity; a wrong thesis is a trap. The list you wrote last lesson is how you tell them apart.',
  },
  {
    type: 'tf',
    statement: 'As long as your thesis is right, any position size can ride out any drop.',
    answer: false,
    explain: 'A right thesis with too big a position still gets forced out at the bottom. That’s the margin lesson from the options track: survive first, then you get the chance to be proven right.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Watch both gauges',
    body: 'Three lines to take with you:',
    display: 'thesis stop · price stop',
    bullets: [
      'Thesis wrong? Leave, even if you’re up',
      'The deeper the loss, the harder the climb back',
      'Before “it’s cheaper now”, check your conditions',
    ],
    footer: 'Next lesson: which mental biases make people hold losers and sell winners too early?',
  },
];
