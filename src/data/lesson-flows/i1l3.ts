import type { LessonStep } from '../optionsCourse';
import { pctChange, px, sharesEn, sharesZh, usdEn, usdZh } from './fmt';

/**
 * 投资主线 第 1 单元第 3 课「股数会变：回购与稀释」。
 * 利润没变、EPS 却涨了 68% 的谜题 → 回购与稀释 → 拖苹果股数看 EPS（约 260 亿股 → 155 亿股）→
 * 心算「股数涨多少会把 20% 的利润增长全部稀释掉」→ SBC 的真实成本。
 */

const PROFIT = 100e9;

export const i1l3StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个谜题',
    title: '利润十年没变，每股却多赚了 68%',
    body: '假设一家公司每年净利润都是 $1,000 亿，十年不变。\n\n可它的每股收益（EPS）却涨了 68%。利润没变，每一股凭什么多赚了？',
  },
  {
    type: 'choice',
    question: '最可能的原因是？',
    options: ['产品涨价了', '公司把股数变少了', '公司发行了更多股票', '换了一种会计方法'],
    correct: 1,
    explain: '每一股分到的利润 = 总利润 ÷ 总股数。分子不变，分母变小，每股自然分得更多。',
  },
  {
    type: 'concept',
    kicker: '起个名字',
    title: '回购让股数变少，稀释让股数变多',
    body: '总股数不是固定的：',
    display: 'EPS（每股收益）= 净利润 ÷ 总股数',
    bullets: [
      '回购：公司花钱买回自家股票并注销，股数变少',
      '稀释：增发新股，或用股票给员工发薪酬（SBC），股数变多',
      '同样的利润，股数越少，每股分得越多',
    ],
  },
  {
    type: 'calc',
    mode: 'explore',
    prompt: '假设苹果每年净利润都是 $1,000 亿。2013 年它约有 260 亿股（按拆股调整后）。把股数拖到 2024 年的约 155 亿股，看 EPS 怎么变。',
    inputs: [
      { key: 'profit', label: '净利润', min: PROFIT, max: PROFIT, step: 1, start: PROFIT, fixed: true, format: (v) => usdZh(v) },
      { key: 'shares', label: '总股数', min: 15e9, max: 27e9, step: 0.1e9, start: 26e9, format: sharesZh },
    ],
    outputs: [
      { label: 'EPS（每股收益）', value: (v) => v.profit / v.shares, format: px, main: true },
      { label: '相比 260 亿股时', value: (v) => 26e9 / v.shares - 1, format: pctChange },
    ],
    visit: { shares: [15.5e9, 26e9] },
    explain: '从 260 亿股缩到 155 亿股，EPS 从 $3.85 涨到 $6.45，约 +68%。苹果十年花了超过 $6,000 亿回购，留下来的每一股都更「值钱」了。',
  },
  {
    type: 'calc',
    mode: 'target',
    prompt: '另一家公司：利润从 $10 亿增长 20% 到 $12 亿，原本有 1 亿股，可它不断发股票给员工。股数增加到多少时，EPS 会一点都没涨？先心算，再拖到你的答案。',
    inputs: [
      { key: 'profit', label: '今年净利润', min: 1.2e9, max: 1.2e9, step: 1, start: 1.2e9, fixed: true, format: (v) => usdZh(v) },
      { key: 'shares', label: '今年总股数', min: 1e8, max: 1.4e8, step: 0.01e8, start: 1e8, format: sharesZh },
    ],
    outputs: [
      { label: '今年 EPS', value: (v) => v.profit / v.shares, format: px, main: true },
      { label: '去年 EPS', value: () => 10, format: px },
    ],
    target: { key: 'shares', answer: 1.2e8, tolerance: 0.02e8, hideOutputs: true },
    explain: '股数增加 20%（到 1.2 亿股），利润 20% 的增长就被稀释得一干二净：$12 亿 ÷ 1.2 亿股 = $10，和去年一样。看利润增长，一定要同时看股数。',
  },
  {
    type: 'tf',
    statement: '公司用股票给员工发薪酬（SBC），对老股东没有成本，因为没花现金。',
    answer: false,
    explain: '错误。SBC 不花现金，但花股份：股数变多，老股东的占比被稀释。这是真实成本，只是藏在股数里。',
  },
  {
    type: 'choice',
    question: '两家公司利润都增长 20%：A 公司每年回购让股数减少 3%，B 公司因为 SBC 股数每年增加 8%。哪家的每股利润增长更快？',
    options: ['A：利润增长全归老股东，还有缩股加成', 'B：发股票说明公司大方', '一样快', '取决于股价'],
    correct: 0,
    explain: '每股利润 = 利润 ÷ 股数。分子一样时，分母缩小的 A 增长更快；B 的一部分增长被新股份「吃掉」了。',
  },
  {
    type: 'concept',
    kicker: '第 1 单元完成',
    title: '看一家公司，先看它的「切法」',
    body: '把这个单元压缩成四句话：',
    bullets: [
      '股价高低只取决于切成多少份，拆股不改变价值',
      '市值 = 股价 × 总股数，是整家公司的标价',
      '回购让股数变少，稀释让股数变多',
      '看利润增长时，一定要同时看每股利润和股数的变化',
    ],
    footer: '下一单元：利润的语言——收入、毛利、净利各说明了什么？',
  },
];

export const i1l3StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A puzzle',
    title: 'Profit flat for ten years, yet each share earns 68% more',
    body: 'Suppose a company earns $100 billion of net profit every year for ten years.\n\nYet its earnings per share (EPS) rose 68%. If profit didn’t change, how does each share earn more?',
  },
  {
    type: 'choice',
    question: 'What’s the most likely reason?',
    options: ['It raised prices', 'It reduced its share count', 'It issued more shares', 'It changed its accounting'],
    correct: 1,
    explain: 'Profit per share = total profit ÷ shares outstanding. Same numerator, smaller denominator — each share gets more.',
  },
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Buybacks shrink the share count; dilution grows it',
    body: 'The share count isn’t fixed:',
    display: 'EPS = net profit ÷ shares outstanding',
    bullets: [
      'Buybacks: the company buys back and cancels its own shares, so the count falls',
      'Dilution: new share issuance or paying staff in stock (SBC), so the count rises',
      'Same profit, fewer shares: each share gets more',
    ],
  },
  {
    type: 'calc',
    mode: 'explore',
    prompt: 'Suppose Apple earns $100 billion every year. In 2013 it had about 26 billion shares (split-adjusted). Drag the count down to 2024’s roughly 15.5 billion and watch EPS.',
    inputs: [
      { key: 'profit', label: 'Net profit', min: PROFIT, max: PROFIT, step: 1, start: PROFIT, fixed: true, format: (v) => usdEn(v) },
      { key: 'shares', label: 'Shares outstanding', min: 15e9, max: 27e9, step: 0.1e9, start: 26e9, format: sharesEn },
    ],
    outputs: [
      { label: 'EPS', value: (v) => v.profit / v.shares, format: px, main: true },
      { label: 'vs. at 26B shares', value: (v) => 26e9 / v.shares - 1, format: pctChange },
    ],
    visit: { shares: [15.5e9, 26e9] },
    explain: 'Shrinking from 26 billion to 15.5 billion shares lifts EPS from $3.85 to $6.45, about +68%. Apple spent over $600 billion on buybacks in a decade, and every remaining share became more “valuable”.',
  },
  {
    type: 'calc',
    mode: 'target',
    prompt: 'Another company: profit grows 20%, from $1 billion to $1.2 billion. It had 100 million shares but keeps paying staff in stock. At what share count does EPS not grow at all? Work it out, then drag to your answer.',
    inputs: [
      { key: 'profit', label: 'This year’s net profit', min: 1.2e9, max: 1.2e9, step: 1, start: 1.2e9, fixed: true, format: (v) => usdEn(v) },
      { key: 'shares', label: 'This year’s shares', min: 1e8, max: 1.4e8, step: 0.01e8, start: 1e8, format: (v) => `${(v / 1e6).toFixed(0)}M shares` },
    ],
    outputs: [
      { label: 'This year’s EPS', value: (v) => v.profit / v.shares, format: px, main: true },
      { label: 'Last year’s EPS', value: () => 10, format: px },
    ],
    target: { key: 'shares', answer: 1.2e8, tolerance: 0.02e8, hideOutputs: true },
    explain: 'A 20% rise in shares (to 120 million) dilutes away the entire 20% profit growth: $1.2B ÷ 120M shares = $10, same as last year. When you look at profit growth, always check the share count too.',
  },
  {
    type: 'tf',
    statement: 'Paying employees in stock (SBC) costs existing shareholders nothing, because no cash is spent.',
    answer: false,
    explain: 'False. SBC spends shares instead of cash: the count rises and existing holders own a smaller slice. It’s a real cost, just hidden in the share count.',
  },
  {
    type: 'choice',
    question: 'Both companies grow profit 20%. A’s buybacks cut its share count 3% a year; B’s SBC grows its count 8% a year. Whose profit per share grows faster?',
    options: ['A: all the growth goes to existing holders, plus a buyback boost', 'B: issuing stock shows generosity', 'The same', 'Depends on the share price'],
    correct: 0,
    explain: 'Profit per share = profit ÷ shares. Same numerator: A’s shrinking denominator grows faster, while part of B’s growth is eaten by new shares.',
  },
  {
    type: 'concept',
    kicker: 'Unit 1 complete',
    title: 'To read a company, first check how it’s sliced',
    body: 'The whole unit in four lines:',
    bullets: [
      'A share price only reflects how many slices there are; splits don’t change value',
      'Market cap = share price × shares outstanding: the price of the whole company',
      'Buybacks shrink the share count; dilution grows it',
      'When profit grows, always check per-share profit and the share count too',
    ],
    footer: 'Next unit: the language of profit — what do revenue, gross profit and net profit each tell you?',
  },
];
