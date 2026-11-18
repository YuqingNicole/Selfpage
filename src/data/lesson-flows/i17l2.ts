import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 17 单元第 2 课「价值链切蛋糕：利润流向哪个环节」。
 * 计算器用一台 AI 服务器（近似、简化）：售价约 $30 万，其中 GPU 约 $20 万；
 * 英伟达毛利率约 75%，服务器组装厂毛利率约 10%（按整机售价算）。
 */

const GPU = 20;
const SERVER = 30;

const split = (zh: boolean): LessonStep => ({
  type: 'calc',
  mode: 'target',
  prompt: zh
    ? '一台 AI 服务器售价约 $30 万，里面的 GPU 约 $20 万。英伟达的毛利率约 75%，组装厂按整机售价算的毛利率约 10%。英伟达从这台机器拿到的毛利，大约是组装厂的几倍？先心算，再拖到你的答案。'
    : 'An AI server sells for about $300K, with about $200K of GPUs inside. Nvidia’s gross margin is about 75%; the assembler’s, on the full server price, about 10%. Roughly how many times the assembler’s gross profit does Nvidia make on this machine? Work it out, then drag to your answer.',
  display: zh ? '英伟达：20 万 × 75%　组装厂：30 万 × 10%' : 'Nvidia: $200K × 75%   assembler: $300K × 10%',
  inputs: [{ key: 'x', label: zh ? '你的答案' : 'Your answer', min: 1, max: 15, step: 0.5, start: 2, format: (v) => `${v}×` }],
  outputs: [{ label: zh ? '实际倍数' : 'Actual multiple', value: () => (GPU * 0.75) / (SERVER * 0.1), format: (n) => `${n}×`, main: true }],
  target: { key: 'x', answer: 5, tolerance: 0.5, hideOutputs: true },
  explain: zh
    ? '英伟达约 $15 万，组装厂约 $3 万，差 5 倍——而组装厂经手的收入反而更大。组装可以找别家做，CUDA 生态里的 GPU 很难替换。决定切多大块蛋糕的，是可替代性。'
    : 'Nvidia gets about $150K, the assembler about $30K — five times less, even though more revenue passes through the assembler’s hands. Assembly can go to someone else; GPUs inside the CUDA ecosystem are hard to replace. What decides the size of the slice is how replaceable you are.',
});

export const i17l2StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个问题',
    title: '同一台机器，两种命运',
    body: '2023–24 年，AI 服务器卖到断货。英伟达和服务器组装厂的收入都在暴涨。\n\n可两家的利润完全不在一个量级。先算一台机器。',
  },
  split(true),
  {
    type: 'concept',
    kicker: '起个名字',
    title: '谁切走蛋糕',
    body: '同一条产业链，利润分配由三件事决定：',
    bullets: [
      '可替代性：你能不能被换掉',
      '议价权：客户和供应商谁更求谁',
      '资本强度：赚的钱要再投回去多少',
      '微笑曲线：设计和品牌两头厚，标准化制造中间薄',
    ],
  },
  {
    type: 'choice',
    question: '同在苹果产业链上，苹果的毛利率约 37%，组装厂只有个位数。根本原因是？',
    options: ['组装厂管理差', '苹果的品牌和生态不可替代，组装环节可以在几家代工厂之间切换', '苹果卖得更贵', '运气'],
    correct: 1,
    explain: '苹果多次在供应商之间转移订单来压价。可替代性是理解利润分布的第一个变量。',
  },
  {
    type: 'fill',
    before: '微笑曲线中间的标准化',
    after: '利润薄，除非它难到全球只有一两家能做，比如台积电的先进制程。',
    options: ['制造', '营销', '物流', '客服'],
    correct: 0,
    explain: '台积电证明了曲线可以被改写：把制造做成瓶颈，中间环节也能拿走超额利润。',
  },
  {
    type: 'tf',
    statement: '判断产业链公司值不值得买，「它在链条上能不能被替代」比「整个行业景气不景气」更关键。',
    answer: true,
    explain: '正确。行业再景气，可替代环节的利润也会被挤走。2021 年光伏火爆，组件厂的利润却被上游硅料吃掉了。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '先看你买的是哪一环',
    body: '三句话带走：',
    display: '可替代性 · 议价权 · 资本强度',
    bullets: [
      '「整条链都受益」通常不成立',
      '经手的收入大，不等于留下的利润多',
      '问自己：这是螺丝，还是轴承？',
    ],
    footer: '下一课：瓶颈会一直在原地吗？',
  },
];

export const i17l2StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A question',
    title: 'One machine, two fates',
    body: 'In 2023–24, AI servers sold out. Revenue soared at both Nvidia and the server assemblers.\n\nBut their profits weren’t even in the same league. Start with one machine.',
  },
  split(false),
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Who gets the slice',
    body: 'On the same chain, the profit split comes down to three things:',
    bullets: [
      'Replaceability: can you be swapped out',
      'Bargaining power: who needs whom more, customer or supplier',
      'Capital intensity: how much of the profit must be reinvested',
      'The smile curve: design and brand are thick, standard manufacturing thin',
    ],
  },
  {
    type: 'choice',
    question: 'On Apple’s supply chain, Apple’s gross margin is about 37% while the assemblers make single digits. The root cause?',
    options: ['Assemblers are badly run', 'Apple’s brand and ecosystem can’t be replaced; assembly can be moved between several contract manufacturers', 'Apple charges more', 'Luck'],
    correct: 1,
    explain: 'Apple has repeatedly shifted orders between suppliers to push prices down. Replaceability is the first variable for understanding where profit lands.',
  },
  {
    type: 'fill',
    before: 'Standard',
    after: 'in the middle of the smile curve earns thin profits — unless it’s so hard that only one or two firms on earth can do it, like TSMC’s leading-edge nodes.',
    options: ['manufacturing', 'marketing', 'logistics', 'customer service'],
    correct: 0,
    explain: 'TSMC showed the curve can be rewritten: make manufacturing the bottleneck and even the middle link can take excess profit.',
  },
  {
    type: 'tf',
    statement: 'When judging a supply-chain company, “can it be replaced on the chain” matters more than “is the whole industry booming”.',
    answer: true,
    explain: 'True. However hot the industry, replaceable links get squeezed. In 2021 solar was booming, yet module makers’ profits were eaten by upstream polysilicon.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'First check which link you’re buying',
    body: 'Three lines to take with you:',
    display: 'replaceability · bargaining power · capital intensity',
    bullets: [
      '“The whole chain benefits” is usually false',
      'More revenue passing through isn’t more profit kept',
      'Ask: is it a screw, or a bearing?',
    ],
    footer: 'Next lesson: does the bottleneck stay put?',
  },
];
