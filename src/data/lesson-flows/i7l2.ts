import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 7 单元第 2 课「零售与平台：同店、GMV 与口径陷阱」。
 * 计算器：一家连锁店从 100 家开到 150 家（新店按老店 80% 的生意算），总收入 +35%，反推同店增长 = −5%。
 * 口径：2023 年京东收入约为拼多多的 4 倍——京东自营记全额货款，拼多多只记佣金和广告。
 */

const stores = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'target',
  prompt: zh
    ? '一家连锁餐厅一年里从 100 家店开到 150 家，新店的生意平均是老店的 80%。财报说总收入 +35%。老店的同店销售是涨了还是跌了？拖到你的答案。'
    : 'A restaurant chain grew from 100 to 150 stores in a year; new stores do 80% of an old store’s business on average. It reports total revenue +35%. Did same-store sales at the old stores rise or fall? Drag to your answer.',
  display: zh ? '总收入 = 100 家老店 × (1 + 同店增长) + 50 家新店 × 80%' : 'total revenue = 100 old stores × (1 + same-store growth) + 50 new stores × 80%',
  inputs: [
    { key: 'sss', label: zh ? '同店销售增长' : 'Same-store sales growth', min: -15, max: 15, step: 1, start: 5, format: (v) => `${v > 0 ? '+' : v < 0 ? '−' : ''}${Math.abs(v)}%` },
  ],
  outputs: [
    {
      label: zh ? '总收入增长' : 'Total revenue growth',
      value: (v) => (100 * (1 + v.sss / 100) + 50 * 0.8) / 100 - 1,
      format: (n) => `${n >= 0 ? '+' : '−'}${Math.abs(n * 100).toFixed(0)}%`,
      main: true,
    },
    { label: zh ? '其中新店贡献' : 'Of which from new stores', value: () => 0.4, format: (n) => `+${(n * 100).toFixed(0)}%` },
  ],
  target: { key: 'sss', answer: -5, tolerance: 0.5, hideOutputs: true },
  explain: zh
    ? '50 家新店 × 80% 就贡献了 +40%。总收入只涨 35%，说明老店的生意跌了 5%。漂亮的总数下面，每一家店都在变差。'
    : '50 new stores × 80% alone add +40%. Total revenue rose only 35%, so the old stores’ business fell 5%. Under a pretty total, every store is getting worse.',
});

export const i7l2StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个标题',
    title: '「营收大涨 35%」',
    body: '一家网红连锁餐厅发布年报：营收大涨 35%，门店扩张到 150 家。\n\n听起来很好。但开店本身就会带来收入——要知道生意是不是真的变好，得把新店剥掉。',
  },
  stores(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '同店销售',
    body: '零售和餐饮最重要的一个数字：',
    display: '同店销售 = 开业满一年的老店，收入比去年变了多少',
    bullets: [
      '剔除新开的店，只看老店',
      '开店冲总收入谁都会，同店增长才是真功夫',
      '总收入增长 + 同店下滑 = 用开店掩盖单店衰退',
    ],
  },
  {
    type: 'choice',
    question: '新店红利吃完之后，这家公司的总收入最可能怎样？',
    options: ['继续涨 35%', '增速大幅下滑：开店总有尽头，而老店在衰退', '不受影响', '自动转好'],
    correct: 1,
    explain: '开店能一直放大收入，前提是每家店都在赚钱。老店在变差，新店越开越多，最后放大的是衰退。',
  },
  {
    type: 'fill',
    before: '电商平台的收入 ≈ 平台成交额（GMV）×',
    after: '。',
    options: ['抽成率（take rate）', '员工人数', '广告曝光', '物流成本'],
    correct: 0,
    explain: '平台有两个抓手：做大成交额，或者提高抽成。抽成率的变化还反映平台对商家的议价权。',
  },
  {
    type: 'tf',
    statement: '2023 年京东的收入约为拼多多的 4 倍，说明京东的生意规模是拼多多的 4 倍。',
    answer: false,
    explain: '错误。口径不同：京东自营把整件商品的货款记为收入，拼多多只记佣金和广告。比规模要看 GMV，比赚钱能力要看利润——先对齐口径再比较。',
  },
  {
    type: 'choice',
    question: '零售公司的财报里，最早暴露「货卖不动」的信号通常是？',
    options: ['净利润下滑', '库存周转变慢、库存天数拉长', 'CEO 换人', '股价下跌'],
    correct: 1,
    explain: '货压在仓库里，会比利润表早一两个季度报警。2022 年耐克、Target 都是库存先爆表，随后被迫打折清货、压垮毛利率。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '把新店剥掉再看',
    body: '三句话带走：',
    display: '同店销售是零售的防伪码',
    bullets: [
      '总收入可以靠开店撑，同店不行',
      '平台收入 = GMV × 抽成率，比较前先对齐口径',
      '库存比利润更早报警',
    ],
    footer: '下一课：芯片这样的周期行业——为什么 P/E 最低的时候最危险？',
  },
];

export const i7l2StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A headline',
    title: '“Revenue jumps 35%”',
    body: 'A hot restaurant chain reports its year: revenue up 35%, now 150 stores.\n\nSounds great. But opening stores brings in revenue by itself — to know whether business actually got better, strip the new stores out.',
  },
  stores(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Same-store sales',
    body: 'The single most important number in retail and restaurants:',
    display: 'same-store sales = how much stores open at least a year changed vs last year',
    bullets: [
      'Exclude new stores; look only at existing ones',
      'Anyone can boost total revenue by opening stores; same-store growth is the real skill',
      'Total growth + falling same-store sales = new stores hiding decline',
    ],
  },
  {
    type: 'choice',
    question: 'Once the boost from new stores runs out, what is this company’s total revenue most likely to do?',
    options: ['Keep growing 35%', 'Slow sharply: store openings run out eventually, and the existing stores are declining', 'Nothing changes', 'Improve on its own'],
    correct: 1,
    explain: 'Opening stores keeps multiplying revenue only if each store makes money. With existing stores getting worse, more stores just multiply the decline.',
  },
  {
    type: 'fill',
    before: 'An e-commerce platform’s revenue ≈ gross merchandise value (GMV) ×',
    after: '.',
    options: ['take rate', 'headcount', 'ad impressions', 'shipping costs'],
    correct: 0,
    explain: 'A platform has two levers: grow GMV, or raise its cut. Changes in take rate also show the platform’s bargaining power over merchants.',
  },
  {
    type: 'tf',
    statement: 'In 2023 JD.com’s revenue was about 4× PDD’s, so JD’s business was 4× as big.',
    answer: false,
    explain: 'False. Different accounting: JD’s own retail books the full price of goods as revenue, while PDD books only commissions and ads. Compare size with GMV and earning power with profit — align definitions first.',
  },
  {
    type: 'choice',
    question: 'In a retailer’s financials, what usually reveals “goods aren’t selling” first?',
    options: ['Falling net profit', 'Slower inventory turnover and more days of inventory', 'A new CEO', 'A falling share price'],
    correct: 1,
    explain: 'Goods piling up in the warehouse raise the alarm a quarter or two before the income statement. In 2022 both Nike and Target saw inventory balloon first, then had to discount it away and crush their margins.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Strip out the new stores first',
    body: 'Three lines to take with you:',
    display: 'same-store sales are retail’s anti-counterfeit mark',
    bullets: [
      'Total revenue can lean on new stores; same-store sales can’t',
      'Platform revenue = GMV × take rate — align definitions before comparing',
      'Inventory raises the alarm before profit does',
    ],
    footer: 'Next lesson: cyclical industries like chips — why is the lowest P/E the most dangerous?',
  },
];
