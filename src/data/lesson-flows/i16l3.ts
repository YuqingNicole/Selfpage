import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 16 单元第 3 课「认知档案：毕业与下一步」。
 * 计算器：判断正确率的 95% 区间 ≈ 正确率 ± 1.96 × √(p(1−p)/n)，看样本数怎么影响结论。
 */

const margin = (p: number, n: number) => 1.96 * Math.sqrt((p * (1 - p)) / n);

const sample = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '你的记录显示：宏观类判断正确率 45%。拖动样本数和正确率，看这个数字有多可信。'
    : 'Your record says: macro calls right 45% of the time. Drag the sample size and the hit rate to see how much that number can be trusted.',
  display: zh ? '误差范围 ≈ ±1.96 × √(正确率 × 错误率 ÷ 样本数)' : 'margin ≈ ±1.96 × √(hit × miss ÷ sample)',
  inputs: [
    { key: 'n', label: zh ? '判断次数' : 'Number of calls', min: 10, max: 200, step: 10, start: 20, format: (v) => `${v}` },
    { key: 'p', label: zh ? '正确率' : 'Hit rate', min: 30, max: 80, step: 5, start: 45, format: (v) => `${v}%` },
  ],
  outputs: [
    { label: zh ? '误差范围（95%）' : 'Margin of error (95%)', value: (v) => margin(v.p / 100, v.n) * 100, format: (m) => `±${Math.round(m)} pt`, main: true },
    {
      label: zh ? '能下结论吗' : 'Can you conclude anything',
      value: (v) => margin(v.p / 100, v.n) * 100,
      format: (m) => (m > 15 ? (zh ? '样本太少，只能当线索' : 'Too few — treat as a hint') : m > 8 ? (zh ? '有方向，仓位上可以参考' : 'A direction — useful for sizing') : zh ? '比较可信' : 'Fairly reliable'),
    },
  ],
  visit: { n: [20, 100] },
  explain: zh
    ? '20 次判断、45% 正确率，真实水平可能在 23% 到 67% 之间，什么都说明不了；攒到 100 次，范围缩到 35%–55%，才开始有方向。认知档案的价值需要时间来积累。'
    : '20 calls at 45% means your true level could be anywhere from 23% to 67% — it tells you nothing. At 100 calls the range narrows to 35%–55%, and a direction starts to appear. A judgment record earns its value over time.',
});

export const i16l3StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '最后一课',
    title: '「我总在中盘急躁」',
    body: '棋手的成长不靠记住每一盘棋，而是从几百盘复盘里发现一句话，比如「我总在中盘急躁」。\n\n这一句自我认知，比一百个定式值钱。投资里，这句话来自你的判断记录。',
  },
  {
    type: 'choice',
    question: '你的判断记录显示：财报类正确率 80%，宏观类只有 45%。合理的应对是？',
    options: ['加倍研究宏观，直到追平', '宏观判断上降低仓位权重，把弹药集中在财报这类自己更准的判断上', '两类一视同仁', '停止记录'],
    correct: 1,
    explain: '这是巴菲特「能力圈」的量化版：知道自己在哪里准，比处处都懂更接近可持续的优势。不过，这个结论有多可信？',
  },
  sample(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '认知档案',
    body: '单笔复盘看树，认知档案看林：',
    bullets: [
      '把每次判断、thesis 命中、复盘记录汇总',
      '找出自己最准和最不准的判断类型',
      '偏乐观还是偏共识，数据会告诉你',
      '样本少时只当线索，攒够了再调仓位',
    ],
  },
  {
    type: 'tf',
    statement: '认知档案的价值，是把「感觉自己还行」替换成「数据显示我在哪类判断上有优势」。',
    answer: true,
    explain: '正确。你做的每一次判断，都在训练你自己这个模型。',
  },
  {
    type: 'choice',
    question: 'L4 毕业自检：一笔完整的投资流程，正确的顺序是？',
    options: [
      '看到消息 → 买入 → 等结果',
      '读财报 → 写 thesis 和证据 → 定信念和仓位 → 写证伪条件 → 执行 → 复盘 → 更新认知档案',
      '先买入，再找理由',
      '跟着大 V 操作',
    ],
    correct: 1,
    explain: '这条流程就是 L4 四个单元的合体：第 13 单元读财报，第 14 单元写 thesis，第 15 单元设护栏，第 16 单元复盘。',
  },
  {
    type: 'concept',
    kicker: 'L4 形成自己的研究习惯 · 完成',
    title: '一套可以终身升级的流程',
    body: 'L1–L4 走完了一个闭环：',
    display: '看懂语言 → 看懂公司 → 看懂定价 → 用流程判断并复盘',
    bullets: [
      '不再只靠消息、KOL 和情绪做决定',
      '每次判断都在积累你的认知档案',
      '流程比天赋更可靠',
    ],
    footer: '下一阶段 L5：产业专题——用因果图拆解 AI、能源、消费和医药。',
  },
];

export const i16l3StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'The last lesson',
    title: '“I always get impatient in the middlegame”',
    body: 'Chess players don’t improve by memorizing every game. They improve by finding one sentence across hundreds of reviews, like “I always get impatient in the middlegame”.\n\nThat one piece of self-knowledge is worth more than a hundred openings. In investing, the sentence comes from your record of calls.',
  },
  {
    type: 'choice',
    question: 'Your record shows: earnings calls right 80% of the time, macro calls only 45%. A sensible response?',
    options: ['Study macro twice as hard until it catches up', 'Size macro calls smaller and concentrate your firepower on earnings-type calls, where you’re more accurate', 'Treat both the same', 'Stop keeping records'],
    correct: 1,
    explain: 'It’s a quantified version of Buffett’s “circle of competence”: knowing where you’re accurate is closer to a lasting edge than knowing a bit about everything. But how reliable is that conclusion?',
  },
  sample(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'A judgment record',
    body: 'Single reviews show the trees; the record shows the forest:',
    bullets: [
      'Collect every call, thesis hit and review',
      'Find which kinds of calls you get most and least right',
      'Whether you lean optimistic or follow consensus — the data will say',
      'With few samples it’s just a hint; adjust sizing once you have enough',
    ],
  },
  {
    type: 'tf',
    statement: 'The value of a judgment record is replacing “I feel like I’m doing fine” with “the data shows which kinds of calls I have an edge in”.',
    answer: true,
    explain: 'True. Every call you make is training data for the model that is you.',
  },
  {
    type: 'choice',
    question: 'L4 graduation check: what’s the right order for a complete investment process?',
    options: [
      'See news → buy → wait for the outcome',
      'Read the filings → write the thesis and evidence → set conviction and size → write disproving conditions → execute → review → update your record',
      'Buy first, find reasons later',
      'Copy influencers',
    ],
    correct: 1,
    explain: 'This process is L4’s four units combined: Unit 13 reads the filings, Unit 14 writes the thesis, Unit 15 sets guardrails, Unit 16 reviews.',
  },
  {
    type: 'concept',
    kicker: 'L4 Building research habits · complete',
    title: 'A process you can keep upgrading for life',
    body: 'L1–L4 closes a loop:',
    display: 'language → companies → pricing → judge by process, review',
    bullets: [
      'No longer deciding on news, influencers and mood alone',
      'Every call adds to your judgment record',
      'Process is more reliable than talent',
    ],
    footer: 'Next stage, L5: industry deep dives — using cause-and-effect maps on AI, energy, consumer and healthcare.',
  },
];
