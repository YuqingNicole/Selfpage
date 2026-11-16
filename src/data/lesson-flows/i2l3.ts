import type { LessonStep } from '../optionsCourse';
import { pxSigned, usdEn, usdZh } from './fmt';

/**
 * 投资主线 第 2 单元第 3 课「EPS 与『调整后』的猫腻」。
 * 一家软件公司（教学用的虚构数字）：2 亿股，GAAP 净亏损 $4,000 万（EPS −$0.20），SBC $2.1 亿，
 * 「调整后」EPS +$0.85。拖 SBC 看：发的股票越多，调整后反而越好看。
 */

const SHARES = 200e6;
const GAAP_NI = -40e6;

export const i2l3StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '两个 EPS',
    title: '同一个季度，一个亏一个赚',
    body: '一家软件公司发布季报：\n\n· GAAP EPS：−$0.20\n· 「调整后」EPS：+$0.85\n\n同一家公司、同一个季度，两个数字一正一负。',
  },
  {
    type: 'choice',
    question: '两个数字差这么多，最可能的原因是？',
    options: ['会计算错了', '「调整后」把股票薪酬（SBC）等费用加回去了', '汇率变化', '公司发了分红'],
    correct: 1,
    explain: '「调整后」通常会把股票薪酬、重组费用之类加回去。加回哪些、为什么加，是管理层自己选的。',
  },
  {
    type: 'concept',
    kicker: '起个名字',
    title: 'GAAP 与 Non-GAAP',
    body: '很多公司同时报两套数字：',
    display: 'EPS = 净利润 ÷ 总股数',
    bullets: [
      'GAAP：按标准会计准则算出的利润',
      'Non-GAAP（调整后）：管理层把某些费用加回后的利润，通常更好看',
      '财报「超预期 / 不及预期」，比的多半是 EPS 和收入',
    ],
  },
  {
    type: 'calc',
    mode: 'explore',
    prompt: '这家公司有 2 亿股，GAAP 净亏损 $4,000 万。拖动它这个季度发出去的股票薪酬（SBC），看两个 EPS 怎么变。',
    inputs: [
      { key: 'sbc', label: '股票薪酬（SBC）', min: 0, max: 300e6, step: 10e6, start: 210e6, format: (v) => usdZh(v) },
    ],
    outputs: [
      { label: 'GAAP EPS', value: () => GAAP_NI / SHARES, format: pxSigned },
      { label: '「调整后」EPS（把 SBC 加回）', value: (v) => (GAAP_NI + v.sbc) / SHARES, format: pxSigned, main: true },
    ],
    visit: { sbc: [50e6, 280e6] },
    explain: '发的股票越多，「调整后」EPS 反而越好看——因为 SBC 被当成不存在。可这些股票真实地稀释了老股东（第 1 单元学过），GAAP 那个 −$0.20 才更接近真相。',
  },
  {
    type: 'choice',
    question: '如果这家公司每年都发大量 SBC，并且每年都把它加回去，你怎么看它的「调整后盈利」？',
    options: ['调整后更真实，SBC 不花现金', 'SBC 年年发生、真实稀释股东，把它加回是美化盈利，GAAP 更接近真相', '两套数字都不可信', '哪个数字高就用哪个'],
    correct: 1,
    explain: '判断标准是：这项成本是不是反复发生。一次性的重组费加回去合理；年年都发的 SBC 是经常性成本，加回去就是粉饰。',
  },
  {
    type: 'tf',
    statement: '同一家公司，Non-GAAP EPS 几乎总是高于 GAAP EPS。',
    answer: true,
    explain: '正确。「调整」的方向几乎总是往好看调——这本身就提醒你：调整后的数字，是管理层选择讲述的版本。',
  },
  {
    type: 'choice',
    question: '十年里，A 公司利润翻倍、股数减少 25%；B 公司利润也翻倍、股数因 SBC 增加 40%。哪家老股东的每股利润涨得多？',
    options: ['A：每股利润约涨 167%，B 只涨约 43%', 'B：发股票激励说明团队有干劲', '一样', '无法比较'],
    correct: 0,
    explain: 'A 的每股利润 = 2 ÷ 0.75 ≈ 2.67 倍；B = 2 ÷ 1.4 ≈ 1.43 倍。股数是 EPS 的隐形分母，别只看利润总额。',
  },
  {
    type: 'concept',
    kicker: '第 2 单元完成',
    title: '读利润，要读到每一层、每一股',
    body: '把这个单元压缩成四句话：',
    bullets: [
      '利润表四层：收入 → 毛利 → 营业利润 → 净利润，每层回答一个问题',
      '毛利率是商业模式的指纹，方向比高低更重要',
      'EPS = 净利润 ÷ 总股数，利润增长要和股数一起看',
      '「调整后」数字几乎总是更好看：加回的若是经常性成本，就是粉饰',
    ],
    footer: '下一单元：利润是会计上的数字，现金才是真金白银——现金流与 Capex。',
  },
];

export const i2l3StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'Two EPS figures',
    title: 'Same quarter: one a loss, one a profit',
    body: 'A software company reports its quarter:\n\n· GAAP EPS: −$0.20\n· “Adjusted” EPS: +$0.85\n\nSame company, same quarter — one number negative, one positive.',
  },
  {
    type: 'choice',
    question: 'What most likely explains the gap?',
    options: ['An accounting error', '“Adjusted” adds back stock-based compensation (SBC) and similar costs', 'Currency moves', 'A dividend payment'],
    correct: 1,
    explain: '“Adjusted” figures usually add back stock compensation, restructuring charges and the like. Management chooses what to add back, and why.',
  },
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'GAAP vs non-GAAP',
    body: 'Many companies report two sets of numbers:',
    display: 'EPS = net profit ÷ shares outstanding',
    bullets: [
      'GAAP: profit under standard accounting rules',
      'Non-GAAP (adjusted): profit after management adds back certain costs — usually prettier',
      'A “beat” or “miss” on earnings mostly compares EPS and revenue',
    ],
  },
  {
    type: 'calc',
    mode: 'explore',
    prompt: 'The company has 200 million shares and a GAAP net loss of $40 million. Drag the stock compensation (SBC) it handed out this quarter and watch both EPS figures.',
    inputs: [
      { key: 'sbc', label: 'Stock-based compensation (SBC)', min: 0, max: 300e6, step: 10e6, start: 210e6, format: (v) => usdEn(v) },
    ],
    outputs: [
      { label: 'GAAP EPS', value: () => GAAP_NI / SHARES, format: pxSigned },
      { label: '“Adjusted” EPS (SBC added back)', value: (v) => (GAAP_NI + v.sbc) / SHARES, format: pxSigned, main: true },
    ],
    visit: { sbc: [50e6, 280e6] },
    explain: 'The more stock it hands out, the better “adjusted” EPS looks — because SBC is treated as if it didn’t exist. But those shares really do dilute existing holders (Unit 1), so the GAAP −$0.20 is closer to the truth.',
  },
  {
    type: 'choice',
    question: 'If this company issues heavy SBC every year and adds it back every year, how should you read its “adjusted profit”?',
    options: ['Adjusted is more accurate — SBC isn’t cash', 'SBC recurs and really dilutes holders; adding it back flatters profit, so GAAP is closer to the truth', 'Neither figure can be trusted', 'Use whichever is higher'],
    correct: 1,
    explain: 'The test is whether the cost recurs. Adding back a one-off restructuring charge is reasonable; SBC that happens every year is a recurring cost, and adding it back is window dressing.',
  },
  {
    type: 'tf',
    statement: 'For the same company, non-GAAP EPS is almost always higher than GAAP EPS.',
    answer: true,
    explain: 'True. Adjustments almost always go in the flattering direction — a reminder that adjusted numbers are the version management chooses to tell.',
  },
  {
    type: 'choice',
    question: 'Over ten years, company A doubles profit and cuts its share count 25%; company B also doubles profit but grows its share count 40% through SBC. Whose per-share profit grew more?',
    options: ['A: per-share profit up about 167%, B only about 43%', 'B: stock incentives show a motivated team', 'The same', 'Can’t compare'],
    correct: 0,
    explain: 'A’s per-share profit = 2 ÷ 0.75 ≈ 2.67×; B’s = 2 ÷ 1.4 ≈ 1.43×. The share count is EPS’s hidden denominator — don’t look at total profit alone.',
  },
  {
    type: 'concept',
    kicker: 'Unit 2 complete',
    title: 'Read profit floor by floor, share by share',
    body: 'The whole unit in four lines:',
    bullets: [
      'Four floors: revenue → gross profit → operating profit → net profit, each answering one question',
      'Gross margin is a business model’s fingerprint; its direction matters more than its level',
      'EPS = net profit ÷ shares; read profit growth together with the share count',
      '“Adjusted” numbers almost always look better; adding back recurring costs is window dressing',
    ],
    footer: 'Next unit: profit is an accounting number; cash is the real thing — cash flow and capex.',
  },
];
