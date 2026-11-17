import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 12 单元第 2 课「给叙事对账：数字是叙事的审计师」。
 * 英伟达数据中心收入（近似值）：FY2024 第 1 季约 $43 亿 → 第 4 季约 $184 亿。
 * SMCI 同样讲 AI 故事，2024 年推迟年报、审计师辞任（第 8 单元见过）。
 */

const Q1 = 4.28;
const Q4 = 18.4;

const audit = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'target',
  prompt: zh
    ? '叙事说「AI 需求爆发」。对账：英伟达数据中心收入从 2023 年初一季约 $43 亿，涨到一年后一季约 $184 亿。涨到了几倍？拖到你的答案。'
    : 'The narrative says “AI demand is exploding”. Audit it: Nvidia’s data center revenue went from about $4.3 billion a quarter in early 2023 to about $18.4 billion a quarter a year later. How many times over? Drag to your answer.',
  display: zh ? '一年后 ÷ 一年前' : 'a year later ÷ a year earlier',
  inputs: [{ key: 'x', label: zh ? '你的答案' : 'Your answer', min: 1, max: 8, step: 0.1, start: 2, format: (v) => `${v.toFixed(1)}×` }],
  outputs: [
    { label: zh ? '数据中心季度收入变成' : 'Quarterly data center revenue multiplied by', value: () => Q4 / Q1, format: (n) => `${n.toFixed(1)}×`, main: true },
    { label: zh ? '对账结果' : 'Audit result', value: () => 1, format: () => (zh ? '✓ 叙事被数字验证' : '✓ The numbers back the narrative') },
  ],
  target: { key: 'x', answer: 4.3, tolerance: 0.3, hideOutputs: true },
  explain: zh
    ? '$184 亿 ÷ $43 亿 ≈ 4.3 倍。叙事说需求爆发，收入真的一年涨了四倍多——这就是「对上账」。同样讲 AI 故事的 SMCI，账本连审计师都不愿签字。'
    : '$18.4B ÷ $4.3B ≈ 4.3×. The narrative said demand was exploding, and revenue really did more than quadruple in a year — that’s an audit that checks out. SMCI told the same AI story, and its books couldn’t even get its auditor to sign.',
});

export const i12l2StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '同一个故事',
    title: '一个创新高，一个跌 80%',
    body: '2023–24 年，英伟达和超微电脑（SMCI）讲的是同一个故事：AI 服务器需求爆发。两只股票一度都涨了好几倍。\n\n结局却完全不同：一个继续创新高，一个从高点跌了八成。',
  },
  {
    type: 'choice',
    question: '故事一样，结局不同。区分两者最关键的动作是？',
    options: ['看谁涨得多', '给叙事对账：一个的收入、利润、现金流逐季验证故事，另一个的账本连审计师都不背书', '看谁名气大', '掷硬币'],
    correct: 1,
    explain: '叙事是入场券，账本是续座证。每季对一次账，就不会陪一个假叙事走到最后。',
  },
  audit(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '给叙事对账',
    body: '叙事解释「为什么涨」，数字验证「该不该涨」：',
    display: '叙事负责解释，数字负责审计',
    bullets: [
      '叙事说需求爆发 → 查收入和订单增速',
      '叙事说格局变好 → 查毛利率和份额',
      '叙事说未来巨大 → 查投入是不是真金白银',
      '允许叙事领先一两个季度，连续两三季对不上就按证伪处理',
    ],
  },
  {
    type: 'match',
    prompt: '把叙事的说法和该查的数字对上',
    pairs: [
      ['「需求爆发」', '收入与订单增速'],
      ['「竞争格局优化」', '毛利率与市场份额'],
      ['「未来市场巨大」', '资本开支与研发投入'],
      ['「客户离不开我们」', '留存率与复购'],
    ],
  },
  {
    type: 'tf',
    statement: '叙事领先数字一两个季度是正常的，但连续两三个季度对不上账，就该按证伪处理，而不是「再给一次机会」。',
    answer: true,
    explain: '正确。给叙事设「宽限期 + 死线」，模糊的信念才能变成能执行的纪律。死线不能有例外，因为例外总在死线到来时最诱人。',
  },
  {
    type: 'fill',
    before: '叙事负责解释为什么涨，',
    after: '负责验证该不该涨。',
    options: ['数字', '大 V', '新闻', '感觉'],
    correct: 0,
    explain: '把这句话贴在交易软件上，胜过一百条投资金句。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '每季对一次账',
    body: '三句话带走：',
    display: '叙事是入场券，账本是续座证',
    bullets: [
      '每个叙事说法都有对应要查的数字',
      '允许领先，但要设死线',
      '同一个故事，账本决定结局',
    ],
    footer: '下一课：把 L3 合起来，完整读一次市场。',
  },
];

export const i12l2StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'Same story',
    title: 'One hits new highs, one falls 80%',
    body: 'In 2023–24 Nvidia and Super Micro (SMCI) told the same story: exploding demand for AI servers. Both stocks rose several times over.\n\nThe endings couldn’t be more different: one kept hitting new highs, the other fell 80% from its peak.',
  },
  {
    type: 'choice',
    question: 'Same story, different endings. The key move that tells them apart?',
    options: ['See which rose more', 'Audit the narrative: one company’s revenue, profit and cash flow confirmed the story quarter after quarter; the other’s books didn’t even have its auditor’s backing', 'See which is more famous', 'Flip a coin'],
    correct: 1,
    explain: 'The narrative is your ticket in; the books are what let you keep your seat. Audit once a quarter, and you won’t ride a false narrative to the end.',
  },
  audit(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Auditing the narrative',
    body: 'The narrative explains why a stock rises; the numbers check whether it should:',
    display: 'narratives explain; numbers audit',
    bullets: [
      'Narrative says demand is exploding → check revenue and order growth',
      'Narrative says competition is easing → check gross margin and share',
      'Narrative says the future is huge → check whether real money is being invested',
      'Let the narrative lead by a quarter or two; if it fails to match for two or three in a row, treat it as disproved',
    ],
  },
  {
    type: 'match',
    prompt: 'Match each narrative claim to the numbers to check',
    pairs: [
      ['“Demand is exploding”', 'Revenue and order growth'],
      ['“Competition is easing”', 'Gross margin and market share'],
      ['“The future market is huge”', 'Capex and R&D spending'],
      ['“Customers can’t leave us”', 'Retention and repeat purchases'],
    ],
  },
  {
    type: 'tf',
    statement: 'A narrative leading the numbers by a quarter or two is normal, but if it fails to match for two or three quarters running, treat it as disproved rather than “giving it one more chance”.',
    answer: true,
    explain: 'True. A grace period plus a deadline turns a vague belief into a discipline you can follow. The deadline can’t have exceptions, because exceptions are most tempting exactly when the deadline arrives.',
  },
  {
    type: 'fill',
    before: 'The narrative explains why it rises;',
    after: ' check whether it should.',
    options: ['the numbers', 'influencers', 'the news', 'gut feelings'],
    correct: 0,
    explain: 'Stick this line on your trading screen; it beats a hundred investing quotes.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Audit once a quarter',
    body: 'Three lines to take with you:',
    display: 'the narrative gets you in; the books keep you there',
    bullets: [
      'Every narrative claim has numbers to check',
      'Allow it to lead, but set a deadline',
      'Same story — the books decide the ending',
    ],
    footer: 'Next lesson: put L3 together and read the market in full.',
  },
];
