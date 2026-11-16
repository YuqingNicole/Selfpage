import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 8 单元第 3 课「红旗清单：撤退的信号」。
 * SMCI（超微电脑）2024 年：8 月推迟提交年报，10 月审计师安永辞任，当天股价约 −33%，从当年高点累计跌超 80%。
 * 瑞幸 2020 年自曝虚构约 22 亿元交易，股价单日约 −75%，随后退市。
 * 计算器：应收账款周转天数（DSO），起点 60 天；DSO = 60 × (1 + 应收增长) ÷ (1 + 收入增长)。
 */

const BASE_DSO = 60;

const dso = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '一家公司去年的应收账款相当于 60 天的收入（客户平均 60 天付款）。拖动今年的收入增长和应收账款增长，看客户要多久才付钱。'
    : 'Last year a company’s receivables equaled 60 days of revenue (customers paid in 60 days on average). Drag this year’s revenue growth and receivables growth, and see how long customers now take to pay.',
  display: zh ? '收款天数（DSO）= 60 天 × (1 + 应收增长) ÷ (1 + 收入增长)' : 'days to collect (DSO) = 60 days × (1 + receivables growth) ÷ (1 + revenue growth)',
  inputs: [
    { key: 'rev', label: zh ? '收入增长' : 'Revenue growth', min: 0, max: 50, step: 5, start: 20, format: (v) => `+${v}%` },
    { key: 'ar', label: zh ? '应收账款增长' : 'Receivables growth', min: 0, max: 120, step: 5, start: 20, format: (v) => `+${v}%` },
  ],
  outputs: [
    { label: zh ? '收款天数' : 'Days to collect', value: (v) => (BASE_DSO * (1 + v.ar / 100)) / (1 + v.rev / 100), format: (n) => (zh ? `${Math.round(n)} 天` : `${Math.round(n)} days`), main: true },
    {
      label: zh ? '判断' : 'Reading',
      value: (v) => (1 + v.ar / 100) / (1 + v.rev / 100),
      format: (n) => (n > 1.25 ? (zh ? '🚩 红旗：钱越来越收不回来' : '🚩 Red flag: cash is getting harder to collect') : n > 1.05 ? (zh ? '留意' : 'Watch it') : zh ? '正常' : 'Normal'),
    },
  ],
  visit: { ar: [20, 80] },
  explain: zh
    ? '收入涨 20%、应收也涨 20%，收款天数不变；应收涨 80%，客户要 90 天才付钱。收入增长越来越多停在「记账」而不是「到账」——第 3 单元「利润不是现金」的那面红旗。'
    : 'Revenue +20% with receivables +20% leaves collection days unchanged; receivables +80% means customers now take 90 days to pay. More and more of the growth is “booked” rather than “received” — the red flag from Unit 3’s “profit isn’t cash”.',
});

export const i8l3StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一串事件',
    title: '先推迟，再辞任',
    body: '2024 年 8 月，AI 服务器公司超微电脑（SMCI）宣布推迟提交年报。10 月，它的审计师安永辞任，理由是对管理层的陈述失去信任。\n\n辞任消息公布当天，股价跌了约三分之一；从当年高点算，累计跌超 80%。',
  },
  {
    type: 'choice',
    question: '这两件事里，哪一件的警报级别更高？',
    options: ['推迟年报更严重', '审计师辞任更严重：给数字把关的人自己不愿再签字了', '两件都不重要', '只看股价就够了'],
    correct: 1,
    explain: '推迟年报可能只是流程问题；审计师主动辞任、还公开说信不过管理层，等于数字的看门人离开了岗位。两件同时出现，几乎没有无辜的解释。',
  },
  {
    type: 'concept',
    kicker: '起个名字',
    title: '红旗清单',
    body: '单个红旗可能是巧合，几面同时出现就是模式：',
    bullets: [
      '最高级：审计师辞任、推迟年报、被曝关联交易',
      '财务类：应收增速远超收入、频繁修改口径',
      '人事类：CFO 突然离职、内部人持续减持',
      '纪律：红旗出现时先降仓位，再慢慢求证',
    ],
  },
  dso(true),
  {
    type: 'match',
    prompt: '把红旗和它指向的问题对上',
    pairs: [
      ['审计师辞任', '财报可信度崩塌'],
      ['应收账款暴增', '收入质量存疑'],
      ['内部人持续减持', '最了解公司的人在卖'],
      ['频繁修改业务口径', '掩盖真实趋势'],
    ],
  },
  {
    type: 'tf',
    statement: '瑞幸 2020 年自曝虚构约 22 亿元交易时，投资者有足够的时间从容卖出。',
    answer: false,
    explain: '错误。自曝当天股价跌了约 75%，随后退市，几乎没有从容退出的窗口。在那之前，做空报告已经指出门店客流和公布的数据对不上——造假最初的裂缝，往往是数据之间对不上。',
  },
  {
    type: 'fill',
    before: '红旗出现时，正确的顺序是先',
    after: '，再慢慢求证——等真相大白时，股价通常已经跌完了。',
    options: ['降低仓位', '加仓摊平', '发帖争论', '等下季财报'],
    correct: 0,
    explain: '先保护自己，再研究对错。错卖的代价是少赚一点，错拿的代价可能是本金的大半。',
  },
  {
    type: 'concept',
    kicker: 'L2 看懂公司 · 完成',
    title: '从商业模式到管理层',
    body: '这四个单元，合起来是一套看公司的顺序：',
    display: '谁付钱 → 增长从哪来 → 盯哪个数字 → 管理层可信吗',
    bullets: [
      '商业模式：收入原型、单位经济、护城河',
      '增长：量价、渗透率、第二曲线',
      '关键指标：留存、同店、库存',
      '管理层：指引、回避、红旗',
    ],
    footer: '下一阶段 L3：看懂市场在交易什么——为什么业绩很好，股价却跌。',
  },
];

export const i8l3StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A chain of events',
    title: 'First a delay, then a resignation',
    body: 'In August 2024 AI server maker Super Micro (SMCI) delayed filing its annual report. In October its auditor, EY, resigned, saying it could no longer rely on management’s representations.\n\nThe day the resignation was announced the stock fell about a third; from that year’s high it was down more than 80%.',
  },
  {
    type: 'choice',
    question: 'Of those two events, which is the louder alarm?',
    options: ['The delayed annual report', 'The auditor resigning: the person who vouches for the numbers no longer wants to sign', 'Neither matters', 'Just watch the share price'],
    correct: 1,
    explain: 'A delayed filing might be a process problem; an auditor resigning and publicly saying it can’t trust management means the numbers’ gatekeeper has left the post. Both together leave almost no innocent explanation.',
  },
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'The red-flag checklist',
    body: 'One red flag can be a coincidence; several together are a pattern:',
    bullets: [
      'Highest level: auditor resigns, annual report delayed, related-party deals exposed',
      'Financial: receivables growing far faster than revenue, frequent definition changes',
      'People: the CFO leaves suddenly, insiders keep selling',
      'Discipline: when red flags appear, cut the position first, investigate after',
    ],
  },
  dso(false),
  {
    type: 'match',
    prompt: 'Match each red flag to the problem it points to',
    pairs: [
      ['Auditor resigns', 'The financials can’t be trusted'],
      ['Receivables balloon', 'Revenue quality is in doubt'],
      ['Insiders keep selling', 'The people who know it best are selling'],
      ['Business definitions keep changing', 'Hiding the real trend'],
    ],
  },
  {
    type: 'tf',
    statement: 'When Luckin admitted to about RMB 2.2 billion of fabricated sales in 2020, investors had plenty of time to sell calmly.',
    answer: false,
    explain: 'False. The stock fell about 75% that day and was later delisted — almost no calm exit. Before that, a short-seller report had pointed out that store traffic didn’t match the reported numbers. The first crack in a fraud is often numbers that don’t match each other.',
  },
  {
    type: 'fill',
    before: 'When red flags appear, the right order is to',
    after: ' first, then investigate — by the time the truth is out, the stock has usually already fallen.',
    options: ['reduce the position', 'buy more to average down', 'argue online', 'wait for next quarter'],
    correct: 0,
    explain: 'Protect yourself first, work out who was right later. Selling wrongly costs a little upside; holding wrongly can cost most of your capital.',
  },
  {
    type: 'concept',
    kicker: 'L2 Reading a company · complete',
    title: 'From business model to management',
    body: 'Together, these four units are an order for reading a company:',
    display: 'who pays → where growth comes from → which number to watch → can management be trusted',
    bullets: [
      'Business model: revenue archetypes, unit economics, moats',
      'Growth: volume and price, penetration, second curves',
      'Key metrics: retention, same-store sales, inventory',
      'Management: guidance, dodging, red flags',
    ],
    footer: 'Next stage, L3: what the market is really trading — why great results can still sink a stock.',
  },
];
