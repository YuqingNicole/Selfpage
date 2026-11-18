import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 16 单元第 2 课「复盘模板：五问定位失灵环节」。
 * 计算器：一年股价 +50%，每股收益只涨 10%，期初 P/E 20 倍。
 * 期末 P/E = 20 × 1.5 ÷ 1.1 ≈ 27 倍——大部分涨幅来自估值，而不是 thesis 里写的利润。
 */

const PE0 = 20;
const EPS_G = 0.1;

const attribution = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'target',
  prompt: zh
    ? '你的 thesis 是「利润会超预期增长」。一年后股价涨了 50%，可每股收益只涨了 10%。期初 P/E 是 20 倍，期末是多少倍？先心算，再拖到你的答案。'
    : 'Your thesis was “earnings will grow faster than expected.” A year later the stock is up 50%, but earnings per share rose only 10%. The P/E started at 20×. What is it now? Work it out, then drag to your answer.',
  display: zh ? '股价涨幅 = (1 + 利润增长) × 期末 P/E ÷ 期初 P/E − 1' : 'price change = (1 + EPS growth) × end P/E ÷ start P/E − 1',
  inputs: [{ key: 'pe', label: zh ? '期末 P/E（你的答案）' : 'Ending P/E (your answer)', min: 15, max: 40, step: 0.5, start: 22, format: (v) => `${v}×` }],
  outputs: [
    { label: zh ? '这个 P/E 下的股价涨幅' : 'Price change at this P/E', value: (v) => (1 + EPS_G) * (v.pe / PE0) - 1, format: (n) => `${n >= 0 ? '+' : '−'}${Math.abs(n * 100).toFixed(0)}%`, main: true },
  ],
  target: { key: 'pe', answer: 27.5, tolerance: 1.5, hideOutputs: true },
  explain: zh
    ? '1.5 ÷ 1.1 × 20 ≈ 27 倍。50% 的涨幅里，利润只贡献了 10%，其余来自市场愿意付更高的倍数——比如整个板块被一个新叙事抬了起来。你写的 thesis 是利润，赚到的却主要是估值的钱。这笔钱该拿，但不该存档成「我的逻辑被验证了」。'
    : '1.5 ÷ 1.1 × 20 ≈ 27×. Of the 50% gain, earnings contributed only 10%; the rest came from the market paying a higher multiple — say, the whole sector lifted by a new narrative. Your thesis was about earnings, but the money mostly came from valuation. Keep the money, but don’t file it as “my logic was proven right”.',
});

export const i16l2StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个场景',
    title: '「这次是运气不好」',
    body: '球队输了球，教练如果只说「运气差、下次努力」，下周的训练就不知道该练什么。\n\n是防守站位错了？体能崩了？还是战术被对手针对了？投资复盘也要定位到具体的一环——赚钱的时候也一样。',
  },
  attribution(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '复盘五问',
    body: '每次平仓后，按顺序回答：',
    bullets: [
      '① 当时的 thesis 是什么（抄原文，不要转述）',
      '② 实际发生了什么，预期差出在哪',
      '③ 哪一环失灵：预期、尺子、边际、叙事，还是证据、仓位、执行',
      '④ 下次具体怎么改',
    ],
  },
  {
    type: 'choice',
    question: '刚才那笔赚了 50% 的持仓，第 ③ 问应该怎么答？',
    options: ['逻辑完全正确，下次照做', '利润逻辑只兑现了一小部分，大部分是「尺子」变了带来的：赚到的不是 thesis 里写的钱', '运气不好', '不需要复盘赚钱的持仓'],
    correct: 1,
    explain: '分清「赚对了逻辑」和「碰上了行情」。前者值得复制，后者被当成经验，就是下一次亏损的配方。',
  },
  {
    type: 'choice',
    question: '一笔亏损的复盘结论写成「市场情绪不好，运气欠佳」。问题在哪？',
    options: ['写得很好', '没有定位到环节：运气只能是排除完所有框架环节之后的最后剩余项，不能是第一站', '应该写得更长', '应该怪券商'],
    correct: 1,
    explain: '先查证据分级、证伪执行、仓位和信念是否错配，剩下解释不了的，才允许归给运气。',
  },
  {
    type: 'tf',
    statement: '第 ① 问要求抄写当时写下的 thesis 原文，因为凭记忆转述会被后视偏差改写。',
    answer: true,
    explain: '正确。这就是第 14 单元要求把 thesis 写下来的原因：写下的原文，是唯一不会自我美化的证据。',
  },
  {
    type: 'fill',
    before: '平仓后的复盘最好在',
    after: '内完成，拖过一周，记忆就开始自我美化。',
    options: ['48 小时', '一年', '下次牛市', '退休前'],
    correct: 0,
    explain: '后视偏差会随时间变强。趁记忆新鲜、情绪还在的时候写下来，痛感本身就是最好的墨水。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '定位到环节，才有训练菜单',
    body: '三句话带走：',
    display: '原文 → 预期差 → 失灵环节 → 改法',
    bullets: [
      '赚钱的持仓也要复盘',
      '拆开利润和估值，看钱从哪来',
      '运气是最后的剩余项',
    ],
    footer: '下一课：把几十次复盘汇总起来，会看到什么？',
  },
];

export const i16l2StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A scene',
    title: '“We were just unlucky”',
    body: 'If a coach says only “bad luck, try harder” after a loss, next week’s training has no plan.\n\nWas it defensive positioning? Fitness? An opponent targeting the tactics? Investment reviews must pin down the specific link too — including when you make money.',
  },
  attribution(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'The review questions',
    body: 'After closing a position, answer in order:',
    bullets: [
      '① What was the thesis (copy it word for word, don’t paraphrase)',
      '② What actually happened, and where was the gap',
      '③ Which link failed: expectations, yardstick, margin, narrative — or evidence, sizing, execution',
      '④ Exactly what to change next time',
    ],
  },
  {
    type: 'choice',
    question: 'For the position that made 50%, how should question ③ be answered?',
    options: ['The logic was fully right — repeat it', 'The earnings logic delivered only a small part; most came from the yardstick changing. The money made wasn’t what the thesis was about', 'Bad luck', 'No need to review winners'],
    correct: 1,
    explain: 'Separate “right for the right reason” from “caught a rally”. The first is worth repeating; storing the second as skill is a recipe for the next loss.',
  },
  {
    type: 'choice',
    question: 'A losing trade’s review concludes: “Market sentiment was bad, unlucky.” What’s wrong?',
    options: ['It’s well written', 'It doesn’t pin down a link: luck can only be what’s left after ruling out every part of the framework, not the first stop', 'It should be longer', 'Blame the broker'],
    correct: 1,
    explain: 'First check evidence grading, whether conditions were acted on, and whether size matched conviction. Only what remains unexplained can be put down to luck.',
  },
  {
    type: 'tf',
    statement: 'Question ① asks you to copy the thesis exactly as written, because paraphrasing from memory gets rewritten by hindsight bias.',
    answer: true,
    explain: 'True. That’s why Unit 14 asked you to write the thesis down: the original text is the only evidence that doesn’t flatter itself.',
  },
  {
    type: 'fill',
    before: 'Review a closed position within',
    after: '. Wait a week and memory starts flattering itself.',
    options: ['48 hours', 'a year', 'the next bull market', 'retirement'],
    correct: 0,
    explain: 'Hindsight bias grows with time. Write while the memory is fresh and the feeling is still there; the sting is the best ink.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Pin down the link, then you have a training plan',
    body: 'Three lines to take with you:',
    display: 'original text → gap → failed link → fix',
    bullets: [
      'Review winners too',
      'Split earnings from valuation to see where the money came from',
      'Luck is what’s left over, last',
    ],
    footer: 'Next lesson: what do you see when you add up dozens of reviews?',
  },
];
