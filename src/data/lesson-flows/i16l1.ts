import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 16 单元第 1 课「复盘决策，不是复盘结果」。
 * 计算器：一次财报豪赌，35% 概率 +40%，65% 概率 −30%，期望 = 0.35×40 − 0.65×30 = −5.5%。
 * 「Resulting（唯结果论）」一词来自扑克选手 Annie Duke 的《对赌》（Thinking in Bets）。
 */

const P_WIN = 0.35;
const WIN = 40;
const LOSS = 30;
const EV = P_WIN * WIN - (1 - P_WIN) * LOSS;

const ev = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'target',
  prompt: zh
    ? '你在财报前重仓赌了一把，结果大赚 40%。冷静回看：按当时的信息，赢（+40%）的概率约 35%，输（−30%）的概率约 65%。这一把的期望收益是多少？先心算，再拖到你的答案。'
    : 'You bet big on a stock before earnings and made 40%. Looking back calmly: with what you knew then, a win (+40%) was about 35% likely and a loss (−30%) about 65%. What was the expected return of this bet? Work it out, then drag to your answer.',
  display: zh ? '期望 = 35% × 40% − 65% × 30%' : 'expected = 35% × 40% − 65% × 30%',
  inputs: [{ key: 'x', label: zh ? '你的答案' : 'Your answer', min: -20, max: 20, step: 0.5, start: 10, format: (v) => `${v > 0 ? '+' : v < 0 ? '−' : ''}${Math.abs(v)}%` }],
  outputs: [{ label: zh ? '实际期望收益' : 'Actual expected return', value: () => EV, format: (n) => `−${Math.abs(n).toFixed(1)}%`, main: true }],
  target: { key: 'x', answer: EV, tolerance: 1.5, hideOutputs: true },
  explain: zh
    ? '14% − 19.5% = −5.5%。这次赚了 40%，是运气站在了你这边；同样的决策重复十次，平均每次亏 5.5%。如果你把这次存档成「我很会赌财报」，它就是下一次亏损的种子。'
    : '14% − 19.5% = −5.5%. Making 40% this time was luck on your side; repeat the same decision ten times and you lose 5.5% on average each time. File this one away as “I’m good at earnings bets” and it becomes the seed of the next loss.',
});

export const i16l1StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个问题',
    title: '赚了钱，就是做对了吗？',
    body: '闯红灯准时到了公司，不该被记成通勤技巧；系着安全带遇上追尾受了伤，也不该从此不系安全带。\n\n投资里，很多人只用赚亏给自己打分。先算一笔账。',
  },
  ev(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '决策 × 运气 = 结果',
    body: '把决策质量和结果分开，得到四个格子：',
    bullets: [
      '好决策 · 好结果：实至名归',
      '好决策 · 坏结果：运气不好，下次照做',
      '坏决策 · 好结果：最危险，侥幸会被当成经验',
      '坏决策 · 坏结果：教训清楚',
    ],
  },
  {
    type: 'choice',
    question: '刚才那次财报豪赌赚了 40%，属于哪一格？',
    options: ['好决策 · 好结果', '坏决策 · 好结果：期望为负，赚钱靠运气，复盘结论应该是「这次不算数」', '好决策 · 坏结果', '坏决策 · 坏结果'],
    correct: 1,
    explain: '复盘最难的一刻，就是在赚钱时对自己说「这次不算数」。',
  },
  {
    type: 'tf',
    statement: '「好决策 · 坏结果」的操作，下次遇到同样的局面应该照做。',
    answer: true,
    explain: '正确。有概率优势、只是运气不好的决策，就该重复。职业扑克手输掉一手打法正确的牌，会对打法本身满意——长期赢的是打法，不是某一手。',
  },
  {
    type: 'fill',
    before: '复盘时要问的永远是：按',
    after: '的信息，这个决策合理吗？而不是：最后赚了吗？',
    options: ['当时已知', '事后得知', '最新新闻', '别人告诉我'],
    correct: 0,
    explain: '用事后才知道的信息去评判当时的决策，是后视偏差的另一种形态。',
  },
  {
    type: 'choice',
    question: '扑克选手 Annie Duke 说的「resulting（唯结果论）」是指？',
    options: ['重视结果是对的', '用结果的好坏来评判决策的好坏，把运气当成了成绩单', '只做有结果的事', '记录每笔交易的结果'],
    correct: 1,
    explain: '市场短期噪音很大，唯结果论在投资里的毒性比在扑克里还强。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '给决策打分，不给结果打分',
    body: '三句话带走：',
    display: '结果 = 决策 × 运气',
    bullets: [
      '赚钱的坏决策最危险',
      '亏钱的好决策该重复',
      '只用当时已知的信息评判',
    ],
    footer: '下一课：复盘时，怎么定位到底是哪一环出了问题？',
  },
];

export const i16l1StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A question',
    title: 'If you made money, were you right?',
    body: 'Running a red light and getting to work on time isn’t a commuting skill. Wearing a seatbelt and still getting hurt in a crash isn’t a reason to stop wearing one.\n\nIn investing, many people grade themselves only on profit and loss. First, run the numbers.',
  },
  ev(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Decision × luck = outcome',
    body: 'Separate decision quality from outcome and you get four boxes:',
    bullets: [
      'Good decision · good outcome: deserved',
      'Good decision · bad outcome: bad luck — do it again',
      'Bad decision · good outcome: the most dangerous; luck gets stored as skill',
      'Bad decision · bad outcome: a clear lesson',
    ],
  },
  {
    type: 'choice',
    question: 'The earnings bet that made 40% — which box is it?',
    options: ['Good decision · good outcome', 'Bad decision · good outcome: negative expectation, the profit was luck, and the review should say “this one doesn’t count”', 'Good decision · bad outcome', 'Bad decision · bad outcome'],
    correct: 1,
    explain: 'The hardest moment in a review is telling yourself “this one doesn’t count” when you made money.',
  },
  {
    type: 'tf',
    statement: 'A “good decision, bad outcome” move should be repeated the next time the same situation comes up.',
    answer: true,
    explain: 'True. A decision with a probability edge that just got unlucky should be repeated. A professional poker player who loses a hand played correctly is satisfied with the play — the play wins over time, not any single hand.',
  },
  {
    type: 'fill',
    before: 'The review question is always: given what was',
    after: ', was the decision reasonable? Not: did it make money?',
    options: ['known at the time', 'learned afterward', 'in the latest news', 'told by others'],
    correct: 0,
    explain: 'Judging a past decision with information you only got later is another form of hindsight bias.',
  },
  {
    type: 'choice',
    question: 'What does poker player Annie Duke mean by “resulting”?',
    options: ['Caring about results is right', 'Judging a decision’s quality by its outcome, treating luck as a report card', 'Only doing things with results', 'Logging every trade’s result'],
    correct: 1,
    explain: 'Markets are very noisy in the short run, so resulting is even more toxic in investing than in poker.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Grade decisions, not outcomes',
    body: 'Three lines to take with you:',
    display: 'outcome = decision × luck',
    bullets: [
      'Bad decisions that made money are the most dangerous',
      'Good decisions that lost money should be repeated',
      'Judge only with what was known at the time',
    ],
    footer: 'Next lesson: in a review, how do you pin down which link failed?',
  },
];
