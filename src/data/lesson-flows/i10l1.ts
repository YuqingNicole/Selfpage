import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 10 单元第 1 课「戴维斯双击：利润与倍数的共振」。
 * 第 10 单元：估值倍数。微软（近似值）：FY2013 EPS 约 $2.6、股价约 $30（P/E 约 11 倍）；
 * FY2021 EPS 约 $8.05、P/E 约 35 倍；股价约涨了 10 倍。
 * 2021 → 2022 年不少热门 SaaS：收入 +30%，市销率（P/S）从约 40 倍跌到约 6 倍，股价约 −80%。
 */

const msft = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'target',
  prompt: zh
    ? '微软 2013–2021 年：每股利润涨到约 3.1 倍，P/E 从约 11 倍升到约 35 倍。股价涨到了几倍？先心算，再拖到你的答案。'
    : 'Microsoft, 2013–2021: earnings per share grew about 3.1×, and its P/E rose from about 11× to about 35×. How many times did the share price multiply? Work it out, then drag to your answer.',
  display: zh ? '股价 = 每股利润 × P/E' : 'share price = earnings per share × P/E',
  inputs: [
    { key: 'eps', label: zh ? '每股利润变成' : 'EPS multiplied by', min: 3.1, max: 3.1, step: 0.1, start: 3.1, fixed: true, format: (v) => `${v.toFixed(1)}×` },
    { key: 'pe', label: 'P/E', min: 35, max: 35, step: 1, start: 35, fixed: true, format: (v) => (zh ? `11 倍 → ${v} 倍` : `11× → ${v}×`) },
    { key: 'guess', label: zh ? '你的答案：股价涨到' : 'Your answer: price multiplied by', min: 1, max: 20, step: 0.5, start: 3, format: (v) => `${v}×` },
  ],
  outputs: [
    { label: zh ? '股价变成' : 'Share price multiplied by', value: (v) => (v.eps * v.pe) / 11, format: (n) => `${n.toFixed(1)}×`, main: true },
    { label: zh ? '其中倍数贡献' : 'Of which from the multiple', value: (v) => v.pe / 11, format: (n) => `${n.toFixed(1)}×` },
  ],
  target: { key: 'guess', answer: 10, tolerance: 1, hideOutputs: true },
  explain: zh
    ? '3.1 × (35 ÷ 11) ≈ 3.1 × 3.2 ≈ 10 倍。利润贡献了 3 倍，另外 3 倍多来自市场换了眼光：从「过气的 Windows 公司」变成「云计算领袖」。'
    : '3.1 × (35 ÷ 11) ≈ 3.1 × 3.2 ≈ 10×. Profit contributed 3×; the other 3× and more came from the market changing its mind — from “faded Windows company” to “cloud leader”.',
});

const doubleKill = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '一家热门 SaaS 公司 2021 年按 40 倍市销率（P/S）定价。到 2022 年收入还在增长，但市场愿付的倍数变了。拖动两个滑块，看股价。'
    : 'In 2021 a hot SaaS company was priced at 40× sales (P/S). By 2022 revenue was still growing, but the multiple the market would pay changed. Drag both sliders and watch the price.',
  display: zh ? '股价变化 = (1 + 收入增长) × 新 P/S ÷ 40 − 1' : 'price change = (1 + revenue growth) × new P/S ÷ 40 − 1',
  inputs: [
    { key: 'g', label: zh ? '收入增长' : 'Revenue growth', min: -20, max: 60, step: 5, start: 30, format: (v) => `${v >= 0 ? '+' : '−'}${Math.abs(v)}%` },
    { key: 'ps', label: zh ? '市场愿付的 P/S' : 'P/S the market will pay', min: 4, max: 60, step: 1, start: 40, format: (v) => `${v}×` },
  ],
  outputs: [
    {
      label: zh ? '股价变化' : 'Share price change',
      value: (v) => ((1 + v.g / 100) * v.ps) / 40 - 1,
      format: (n) => `${n >= 0 ? '+' : '−'}${Math.abs(n * 100).toFixed(0)}%`,
      main: true,
    },
  ],
  visit: { ps: [6, 50] },
  explain: zh
    ? '收入 +30%，P/S 从 40 倍跌到 6 倍：股价约 −80%。公司没变差，是市场不再愿意为它付那么贵。倍数是借来的，利润是自己的。'
    : 'Revenue +30% while P/S falls from 40× to 6×: the price drops about 80%. The company didn’t get worse; the market stopped paying that much for it. The multiple is borrowed; the profit is your own.',
});

export const i10l1StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个谜题',
    title: '利润涨 3 倍，股价涨 10 倍',
    body: '2013 年，微软被看作一家过气的 Windows 公司。到 2021 年，它的每股利润涨到了约 3 倍。\n\n同一时期，股价涨了约 10 倍。多出来的部分是从哪来的？',
  },
  {
    type: 'fill',
    before: '股价可以拆成两个引擎：每股利润 ×',
    after: '。',
    options: ['估值倍数（P/E）', '员工人数', '交易量', '分红率'],
    correct: 0,
    explain: '所有涨跌都能归到这两项。先分清哪个引擎在响，是复盘的第一刀。',
  },
  msft(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '戴维斯双击与双杀',
    body: '两个引擎可以一起点火，也可以一起熄火：',
    display: '股价 = 每股利润 × P/E',
    bullets: [
      '双击：利润增长 + 倍数抬升，股价涨幅远超利润',
      '双杀：利润下滑 + 倍数收缩，股价跌幅远超利润',
      '倍数贡献的那部分，要靠市场情绪维持',
    ],
  },
  doubleKill(true),
  {
    type: 'choice',
    question: '一只股票两年涨了 4 倍，拆开发现利润只涨了 30%，其余全是倍数扩张。这告诉你什么？',
    options: ['基本面驱动，很安全', '大部分涨幅靠市场「愿意付更贵」撑着，倍数回落时，回撤会又深又快', '还能再涨 4 倍', '拆解没有意义'],
    correct: 1,
    explain: '持有靠倍数撑起的仓位，要清楚自己赚的是「别人愿意付更贵」的钱——这部分随时可能被收回。',
  },
  {
    type: 'tf',
    statement: '复盘一段大涨，只要知道股价涨了多少就够了，不必区分利润和倍数各贡献多少。',
    answer: false,
    explain: '错误。利润贡献的涨幅有业绩托底，倍数贡献的涨幅只有情绪托底。两者的风险完全不同，必须分开算。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '两个引擎，分开看',
    body: '三句话带走：',
    display: '股价 = 每股利润 × P/E',
    bullets: [
      '最大的涨幅常来自市场换了眼光',
      '收入还在涨，倍数收缩也能让股价跌 80%',
      '倍数是借来的，利润是自己的',
    ],
    footer: '下一课：市场凭什么给你 35 倍？看它拿哪把尺子量你。',
  },
];

export const i10l1StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A puzzle',
    title: 'Profit up 3×, stock up 10×',
    body: 'In 2013 Microsoft was seen as a faded Windows company. By 2021 its earnings per share had roughly tripled.\n\nOver the same period the stock rose about tenfold. Where did the extra come from?',
  },
  {
    type: 'fill',
    before: 'A share price splits into two engines: earnings per share ×',
    after: '.',
    options: ['the valuation multiple (P/E)', 'headcount', 'trading volume', 'payout ratio'],
    correct: 0,
    explain: 'Every rise and fall can be attributed to these two. Figuring out which engine is running is the first cut of any review.',
  },
  msft(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'The Davis double play — and double kill',
    body: 'The two engines can fire together, or stall together:',
    display: 'share price = earnings per share × P/E',
    bullets: [
      'Double play: profit growth + a rising multiple; the price rises far more than profit',
      'Double kill: falling profit + a shrinking multiple; the price falls far more than profit',
      'The part from the multiple is held up only by market sentiment',
    ],
  },
  doubleKill(false),
  {
    type: 'choice',
    question: 'A stock rose 4× in two years; broken down, profit grew only 30% and the rest was multiple expansion. What does that tell you?',
    options: ['Fundamentals drove it — very safe', 'Most of the gain rests on the market “being willing to pay more”; when the multiple falls back, the drop will be deep and fast', 'It can rise another 4×', 'The breakdown is meaningless'],
    correct: 1,
    explain: 'Holding a position propped up by its multiple, you should know you’re earning money from others paying more — and that part can be taken back at any time.',
  },
  {
    type: 'tf',
    statement: 'To review a big rally, it’s enough to know how much the price rose; no need to split profit from multiple.',
    answer: false,
    explain: 'False. The gain from profit has results underneath it; the gain from the multiple has only sentiment. Their risks are completely different, so measure them separately.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Two engines, measured separately',
    body: 'Three lines to take with you:',
    display: 'share price = earnings per share × P/E',
    bullets: [
      'The biggest gains often come from the market changing its mind',
      'Even with revenue growing, a shrinking multiple can cut a stock 80%',
      'The multiple is borrowed; the profit is your own',
    ],
    footer: 'Next lesson: why would the market pay 35×? See which yardstick it measures you with.',
  },
];
