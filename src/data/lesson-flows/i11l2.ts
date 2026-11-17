import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 11 单元第 2 课「拐点识别：环比、库存与指引」。
 * 沿用第 7 单元的美光（近似值）：2023 年初季度收入跌到约 $37 亿的谷底，此后环比连续改善；
 * 2023 年 8 月那一季收入同比仍约 −40%，股价却已从 2022 年 10 月低点涨了四成多。
 * 计算器：去年同季收入 100，谷底 60，此后每季环比增长 q，两季后看同比和环比。
 */

const LAST_YEAR = 100;
const TROUGH = 60;
const signed = (n: number) => `${n >= 0 ? '+' : '−'}${Math.abs(n * 100).toFixed(0)}%`;

const turn = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'explore',
  prompt: zh
    ? '一家芯片公司去年同季收入是 100，跌到谷底时只有 60。之后每个季度都比上一季增长一点。拖动环比增速，看两个季度之后的同比和环比。'
    : 'A chip company’s revenue was 100 in the same quarter last year and fell to 60 at the trough. Since then each quarter has grown a little over the last. Drag the quarter-over-quarter growth and see year-over-year and quarter-over-quarter two quarters later.',
  display: zh ? '同比：和去年同一季比 ｜ 环比：和上一季比' : 'year over year: vs the same quarter last year | quarter over quarter: vs last quarter',
  inputs: [{ key: 'q', label: zh ? '每季环比增长' : 'Quarter-over-quarter growth', min: 0, max: 25, step: 1, start: 0, format: (v) => `+${v}%` }],
  outputs: [
    { label: zh ? '同比（两季后）' : 'Year over year (two quarters on)', value: (v) => (TROUGH * Math.pow(1 + v.q / 100, 2)) / LAST_YEAR - 1, format: signed, main: true },
    { label: zh ? '环比' : 'Quarter over quarter', value: (v) => v.q / 100, format: signed },
    { label: zh ? '季度收入' : 'Quarterly revenue', value: (v) => TROUGH * Math.pow(1 + v.q / 100, 2), format: (n) => n.toFixed(0) },
  ],
  visit: { q: [0, 12] },
  explain: zh
    ? '每季环比 +12%，两季后收入从 60 回到约 75，同比却还是 −25%。只看同比的人看到的是「还在大跌」，看环比的人已经看到了拐点。同比是后视镜，环比是前挡风玻璃。'
    : 'At +12% a quarter, revenue climbs from 60 to about 75 in two quarters, yet year over year it’s still −25%. Anyone watching year-over-year sees “still falling hard”; anyone watching quarter-over-quarter already sees the turn. Year-over-year is the rear-view mirror; quarter-over-quarter is the windshield.',
});

export const i11l2StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个错位',
    title: '收入同比 −40%，股价涨了四成',
    body: '还记得第 7 单元的美光吗？2023 年 8 月那一季，它的收入同比还在下滑约 40%。\n\n可那时它的股价，已经从 2022 年 10 月的低点涨了四成多。',
  },
  {
    type: 'choice',
    question: '收入同比还在大跌，股价为什么已经涨了？',
    options: ['市场疯了', '收入已经连续几个季度比上一季好，市场盯的是这个转向，而不是和去年的差距', '公司在回购', '分析师推荐'],
    correct: 1,
    explain: '同比背着去年的高点，转身很慢；和上一季比，变化立刻就能看到。市场跟的是后者。',
  },
  turn(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '拐点的三个信号',
    body: '周期拐点很少一次性确认，要凑证据链：',
    bullets: [
      '环比：同比还是负数时，环比已经连续改善',
      '库存：渠道库存见顶回落，厂商减产到位',
      '指引：管理层从「下修」转为「重申」，再转为「上修」',
      '三个信号凑齐两个，再行动',
    ],
  },
  {
    type: 'fill',
    before: '周期拐点最早的财报证据，通常是同比还是负数时，',
    after: '已经连续改善。',
    options: ['环比', '市值', '股东人数', '广告费'],
    correct: 0,
    explain: '同比背着 12 个月的包袱，环比只背 3 个月，转身自然更快。',
  },
  {
    type: 'tf',
    statement: '管理层指引从「下修」变成「重申」，虽然数字没变好，也是值得记下的拐点信号。',
    answer: true,
    explain: '正确。不再变差就是边际改善。第 8 单元讲过，措辞的拐点常常比数字的拐点早一个季度。',
  },
  {
    type: 'choice',
    question: '抓拐点的行动纪律，哪个说法最接近本课的框架？',
    options: ['一个信号出现就满仓', '三个信号凑齐两个再行动，用证据链换精确度，接受买不到最低点', '等所有数据确认后再行动', '拐点无法判断，放弃'],
    correct: 1,
    explain: '目标不是抄到最低点，而是在证据占优时上车。全部确认会错过主升段，单个信号就行动会被假拐点反复骗。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '看前挡风玻璃，不看后视镜',
    body: '三句话带走：',
    display: '环比改善 + 库存出清 + 指引转向',
    bullets: [
      '同比是后视镜，环比是前挡风玻璃',
      '拐点要凑证据链，三个里有两个再行动',
      '不追求最低点，追求证据占优',
    ],
    footer: '下一课：没有任何新闻，股价一周跌一半——是谁在卖？',
  },
];

export const i11l2StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A mismatch',
    title: 'Revenue −40% year over year, stock up 40%',
    body: 'Remember Micron from Unit 7? In the quarter ending August 2023, its revenue was still down about 40% from a year earlier.\n\nYet by then its stock was already up more than 40% from its October 2022 low.',
  },
  {
    type: 'choice',
    question: 'Revenue was still falling hard year over year. Why had the stock already risen?',
    options: ['The market went mad', 'Revenue had improved over the previous quarter several times in a row; the market was watching that turn, not the gap to last year', 'Buybacks', 'Analyst recommendations'],
    correct: 1,
    explain: 'Year-over-year carries last year’s peak and turns slowly; compared with last quarter, change shows up immediately. The market follows the latter.',
  },
  turn(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Three turning-point signals',
    body: 'Cycle turns are rarely confirmed at once; you assemble a chain of evidence:',
    bullets: [
      'Sequential: quarter-over-quarter improving while year-over-year is still negative',
      'Inventory: channel inventory peaking and falling, production cuts in place',
      'Guidance: management moving from “cut” to “reaffirm”, then to “raise”',
      'Act when two of the three line up',
    ],
  },
  {
    type: 'fill',
    before: 'The earliest evidence of a cycle turn in the financials is usually',
    after: ' improving for several quarters while year-over-year is still negative.',
    options: ['quarter-over-quarter revenue', 'market cap', 'the number of shareholders', 'ad spending'],
    correct: 0,
    explain: 'Year-over-year carries 12 months of baggage; quarter-over-quarter carries only 3, so it turns faster.',
  },
  {
    type: 'tf',
    statement: 'Management guidance moving from “cut” to “reaffirm” is a turning-point signal worth noting, even though the numbers didn’t improve.',
    answer: true,
    explain: 'True. No longer getting worse is a marginal improvement. As Unit 8 showed, turns in wording often come a quarter before turns in the numbers.',
  },
  {
    type: 'choice',
    question: 'Which statement best matches this lesson’s discipline for acting on turning points?',
    options: ['Go all in on the first signal', 'Act when two of the three signals line up — trade precision for a chain of evidence, and accept missing the very bottom', 'Wait until all the data confirms', 'Turning points can’t be judged, so give up'],
    correct: 1,
    explain: 'The goal isn’t catching the bottom; it’s getting on board when the evidence tilts your way. Waiting for full confirmation misses the main rally; acting on one signal gets you fooled by false turns again and again.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Look through the windshield, not the mirror',
    body: 'Three lines to take with you:',
    display: 'sequential improvement + inventory cleared + guidance turning',
    bullets: [
      'Year-over-year is the rear-view mirror; quarter-over-quarter is the windshield',
      'Assemble the evidence — act when two of three line up',
      'Don’t chase the bottom; wait for the evidence to tilt your way',
    ],
    footer: 'Next lesson: no news at all, and a stock halves in a week — who’s selling?',
  },
];
