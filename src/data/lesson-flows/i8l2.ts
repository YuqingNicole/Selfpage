import type { LessonStep } from '../optionsCourse';

/**
 * 投资主线 第 8 单元第 2 课「电话会问答：回避即信息」。
 * 苹果 2018 年 11 月宣布从下季度起不再披露 iPhone、iPad、Mac 销量，随后几个月股价从高点跌了三成多（也有宏观因素）。
 * 这一课没有计算器：练的是读文字，用一段虚构的电话会问答作展示卡。
 */

export const i8l2StepsZh: LessonStep[] = [
  {
    type: 'concept',
    kicker: '一个决定',
    title: '苹果不再公布 iPhone 卖了多少台',
    body: '2018 年 11 月，苹果在财报会上宣布：从下个季度起，不再披露 iPhone、iPad 和 Mac 的销量，只公布收入。\n\n理由是「销量不能代表业务的全貌」。',
  },
  {
    type: 'choice',
    question: '市场最可能怎么解读这个决定？',
    options: ['苹果嫌统计太麻烦', '不再展示的数字，多半是开始难看的数字：iPhone 销量可能已经见顶', '监管要求', '没有任何含义'],
    correct: 1,
    explain: '公司炫耀好数字、藏起坏数字。iPhone 销量确实在那之前就停止增长了（第 6 单元的 2.3 亿部）；随后几个月苹果股价从高点跌了三成多，宏观也有影响。',
  },
  {
    type: 'concept',
    kicker: '起个名字',
    title: '回避即信息',
    body: '电话会的开场白是写好的剧本，问答环节才是现场：',
    bullets: [
      '岔开话题：被问利润率，就聊增长和愿景',
      '换口径：「我们不按这个维度看业务」',
      '停止披露：这个指标以后不公布了',
      '分析师连续追问同一件事 = 市场最焦虑的那件事',
    ],
  },
  {
    type: 'choice',
    question: '读下面这段问答。CEO 的回答传递了什么信息？',
    display: '分析师：核心业务的营业利润率这季是多少？\nCEO：我们更关注长期的用户价值和生态建设。',
    options: ['格局很大', '利润率大概率不好看：数字好看的管理层会直接报数字', '真的不在乎利润', '没有信息'],
    correct: 1,
    explain: '直接被问到一个数字，却用愿景作答，是最经典的回避。把这个问题记下来，下个季度重点看。',
  },
  {
    type: 'match',
    prompt: '把回避方式和它真正的意思对上',
    pairs: [
      ['被问利润率，大谈用户增长', '利润率不好看'],
      ['「我们不按这个口径看业务」', '这个口径下的趋势在变差'],
      ['宣布某个指标不再披露', '这个数字开始难看了'],
      ['「现在谈这个还为时过早」', '还没有能拿出手的证据'],
    ],
  },
  {
    type: 'tf',
    statement: '电话会上分析师反复追问、管理层反复回避的那个问题，往往正是市场当前最关键的分歧点。',
    answer: true,
    explain: '正确。问答环节是市场焦虑的实时投影。把被回避的问题记下来，就是一份现成的下季观察清单。',
  },
  {
    type: 'fill',
    before: '读电话会记录时，开场陈述是写好的剧本，真正的信息密度在',
    after: '环节。',
    options: ['问答（Q&A）', '免责声明', '致谢', '主持人介绍'],
    correct: 0,
    explain: '剧本可以反复打磨，被追问时的现场反应打磨不了。读记录时先跳到问答。',
  },
  {
    type: 'concept',
    kicker: '这一课你学会了',
    title: '记下他们没回答的问题',
    body: '三句话带走：',
    display: '不再展示的数字，多半是开始难看的数字',
    bullets: [
      '问答比开场白值钱',
      '岔开、换口径、停止披露，都是信息',
      '被回避的问题，就是下季要盯的地方',
    ],
    footer: '下一课：红旗清单——哪些信号出现时，应该先撤退再研究。',
  },
];

export const i8l2StepsEn: LessonStep[] = [
  {
    type: 'concept',
    kicker: 'A decision',
    title: 'Apple stops reporting how many iPhones it sold',
    body: 'In November 2018 Apple announced on its earnings call that from the next quarter it would no longer disclose unit sales of iPhone, iPad and Mac — only revenue.\n\nThe reason given: units don’t reflect the full picture of the business.',
  },
  {
    type: 'choice',
    question: 'How was the market most likely to read this decision?',
    options: ['Apple found counting too much trouble', 'A number that stops being shown is usually one that started looking bad: iPhone units had probably peaked', 'Regulators required it', 'It meant nothing'],
    correct: 1,
    explain: 'Companies show off good numbers and hide bad ones. iPhone units had in fact stopped growing (Unit 6’s 230 million); over the next few months Apple’s stock fell more than 30% from its high, with macro playing a part too.',
  },
  {
    type: 'concept',
    kicker: 'Give it a name',
    title: 'Dodging is information',
    body: 'The prepared remarks on a call are a script; the Q&A is live:',
    bullets: [
      'Changing the subject: asked about margins, talk about growth and vision',
      'Changing the definition: “that’s not how we look at the business”',
      'Stopping disclosure: this metric won’t be reported anymore',
      'Analysts asking the same thing again and again = the market’s biggest worry',
    ],
  },
  {
    type: 'choice',
    question: 'Read this exchange. What does the CEO’s answer tell you?',
    display: 'Analyst: What was the core business’s operating margin this quarter?\nCEO: We’re more focused on long-term user value and building the ecosystem.',
    options: ['Big-picture thinking', 'The margin probably looks bad: management with a good number just says the number', 'They truly don’t care about profit', 'Nothing'],
    correct: 1,
    explain: 'Asked directly for a number and answering with a vision is the classic dodge. Write the question down and watch it next quarter.',
  },
  {
    type: 'match',
    prompt: 'Match each dodge to what it really means',
    pairs: [
      ['Asked about margins, talks up user growth', 'Margins look bad'],
      ['“That’s not how we look at the business”', 'The trend on that measure is worsening'],
      ['Announces a metric won’t be disclosed anymore', 'That number started looking bad'],
      ['“It’s too early to talk about that”', 'There’s no evidence worth showing yet'],
    ],
  },
  {
    type: 'tf',
    statement: 'The question analysts keep pressing and management keeps dodging is often the market’s key point of disagreement right now.',
    answer: true,
    explain: 'True. The Q&A is a live projection of the market’s anxiety. Write down the dodged questions and you have a ready-made watch list for next quarter.',
  },
  {
    type: 'fill',
    before: 'Reading a call transcript, the prepared remarks are a script; the real information is in the',
    after: '.',
    options: ['Q&A', 'disclaimer', 'thank-yous', 'operator introduction'],
    correct: 0,
    explain: 'A script can be polished endlessly; a live reaction under questioning can’t. Skip to the Q&A first.',
  },
  {
    type: 'concept',
    kicker: 'What you learned',
    title: 'Write down what they didn’t answer',
    body: 'Three lines to take with you:',
    display: 'a number that stops being shown has usually started looking bad',
    bullets: [
      'The Q&A is worth more than the prepared remarks',
      'Changing the subject, changing definitions, stopping disclosure — all information',
      'The dodged question is what to watch next quarter',
    ],
    footer: 'Next lesson: the red-flag checklist — signals that mean retreat first, research later.',
  },
];
