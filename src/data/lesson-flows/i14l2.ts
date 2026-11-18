import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 14 单元第 2 课「证据分级：不是所有信息都平等」。
 * 计算器：几条各自 70% 靠谱的证据。独立时同时出错的概率按乘法下降；
 * 同源（互相转述）时，再多条也只等于一条。
 */

const WRONG = 0.3;

const evidence = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '假设每条证据各有 70% 的把握是对的。拖动证据条数，再切换它们是「独立来源」还是「同一来源的转述」，看全部出错的概率。'
    : 'Suppose each piece of evidence is 70% likely to be right. Drag the number of pieces, then switch between “independent sources” and “retellings of one source”, and watch the chance that all of them are wrong.',
  display: zh ? '独立：0.3 × 0.3 × …　同源：始终 0.3' : 'independent: 0.3 × 0.3 × …  same source: always 0.3',
  inputs: [
    { key: 'n', label: zh ? '证据条数' : 'Pieces of evidence', min: 1, max: 5, step: 1, start: 1, format: (v) => `${v}` },
    { key: 'ind', label: zh ? '来源' : 'Sources', min: 0, max: 1, step: 1, start: 1, format: (v) => (v ? (zh ? '互相独立' : 'Independent') : zh ? '同一来源转述' : 'One source, retold') },
  ],
  outputs: [
    { label: zh ? '全部出错的概率' : 'Chance all are wrong', value: (v) => (v.ind ? WRONG ** v.n : WRONG), format: (n) => `${(n * 100).toFixed(n < 0.1 ? 1 : 0)}%`, main: true },
    { label: zh ? '实际相当于几条证据' : 'Worth how many pieces', value: (v) => (v.ind ? v.n : 1), format: (n) => (zh ? `${n} 条` : `${n}`) },
  ],
  visit: { n: [1, 3], ind: [0, 1] },
  explain: zh
    ? '三条独立证据同时出错的概率只有 2.7%；三条同源的转述，出错概率还是 30%。「五个大 V 都看多」如果都在转述同一份研报，就只是一条证据——甚至是一条情绪数据。'
    : 'Three independent pieces are all wrong only 2.7% of the time; three retellings of one source are still wrong 30% of the time. If “five influencers are all bullish” are all repeating the same research note, that’s one piece of evidence — or really just a sentiment reading.',
});

export const i14l2StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个场景',
    title: '五个大 V，一周内都说看多',
    body: '你在研究一只股票。这周有五个财经大 V 都发帖看多，理由听上去都很充分。\n\n这算五条证据吗？',
  },
  evidence(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '证据的等级',
    body: '证据不平等，从高到低：',
    bullets: [
      '一手数据：财报、订单、渠道调研、你自己算的数',
      '管理层说法：有立场，要打折',
      '卖方研报：和公司有业务关系，参考为主',
      'KOL 和热搜：是情绪指标，不是证据',
    ],
  },
  {
    type: 'match',
    prompt: '把信息和它的等级对上',
    pairs: [
      ['Costco 年报里的续费率', '一手数据'],
      ['CFO 说「需求依然健康」', '有立场的说法'],
      ['券商上调目标价', '有业务关系的观点'],
      ['热搜上人人都在聊', '情绪指标'],
    ],
  },
  {
    type: 'tf',
    statement: '写完看多的 thesis 之后，主动找一份最有力的空头报告来读，是对抗确认偏误的有效做法。',
    answer: true,
    explain: '正确。确认偏误靠意志力克服不了，只能靠流程：把「找反方」变成写 thesis 的固定一步。',
  },
  {
    type: 'fill',
    before: '一条证据链的质量取决于',
    after: '的那一环。整条逻辑建立在传闻上，它就只有传闻的分量。',
    options: ['最弱', '最强', '最长', '最新'],
    correct: 0,
    explain: '检查自己的 thesis 时，先找出最弱的一环，问：它断了，整个论点还成立吗？',
  },
  {
    type: 'choice',
    question: '一致看多的声音越来越多，除了「不独立」，还可能意味着什么？',
    options: ['上涨更确定了', '预期可能已经很满：人人看多时，能买的人大多已经买了（第 9 单元「已计价」）', '没有任何含义', '马上会暴涨'],
    correct: 1,
    explain: '情绪高度一致本身是一条信息，但它常常是反向的。证据和情绪要分开记账。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '数证据，先数来源',
    body: '三句话带走：',
    display: '一手数据 > 管理层 > 卖方 > 情绪',
    bullets: [
      '至少三条互相独立的证据',
      '回声不算证据，转述十遍还是一条',
      '主动去读最强的反方',
    ],
    footer: '下一课：多确定，就该下多大的注？',
  },
];

export const i14l2StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A scene',
    title: 'Five influencers, all bullish in one week',
    body: 'You’re researching a stock. This week five finance influencers all posted bullish takes, each with reasons that sound solid.\n\nIs that five pieces of evidence?',
  },
  evidence(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Grades of evidence',
    body: 'Evidence isn’t equal. From highest to lowest:',
    bullets: [
      'Primary data: filings, orders, channel checks, numbers you computed',
      'Management statements: they have a stake, so discount them',
      'Sell-side research: business ties to the company, use as reference',
      'Influencers and trending topics: sentiment, not evidence',
    ],
  },
  {
    type: 'match',
    prompt: 'Match each piece of information to its grade',
    pairs: [
      ['Renewal rate in Costco’s annual report', 'Primary data'],
      ['CFO says “demand remains healthy”', 'A statement with a stake'],
      ['A broker raises its price target', 'An opinion with business ties'],
      ['Everyone is talking about it online', 'A sentiment indicator'],
    ],
  },
  {
    type: 'tf',
    statement: 'After writing a bullish thesis, deliberately reading the strongest bear report you can find is an effective way to fight confirmation bias.',
    answer: true,
    explain: 'True. Willpower can’t beat confirmation bias; only process can. Make “find the other side” a fixed step in writing a thesis.',
  },
  {
    type: 'fill',
    before: 'A chain of evidence is only as good as its',
    after: 'link. Build the whole case on a rumor and it carries the weight of a rumor.',
    options: ['weakest', 'strongest', 'longest', 'newest'],
    correct: 0,
    explain: 'When checking your thesis, find the weakest link first and ask: if it breaks, does the case still stand?',
  },
  {
    type: 'choice',
    question: 'Besides “not independent”, what else might a growing chorus of bulls signal?',
    options: ['The rise is more certain', 'Expectations may already be full: when everyone is bullish, most buyers have already bought (Unit 9, “priced in”)', 'Nothing at all', 'A surge is imminent'],
    correct: 1,
    explain: 'Unanimous sentiment is information, but it often points the other way. Keep separate books for evidence and sentiment.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Count sources before counting evidence',
    body: 'Three lines to take with you:',
    display: 'primary data > management > sell-side > sentiment',
    bullets: [
      'At least three independent pieces of evidence',
      'Echoes aren’t evidence; ten retellings are still one',
      'Go read the strongest opposing case',
    ],
    footer: 'Next lesson: how sure are you, and how big should the bet be?',
  },
];
