/**
 * 期权学园 — Duolingo 风格期权交易课程内容
 * 8 个单元，每单元 3 课，每课含知识卡片 + 混合题型练习
 */

export type ChoiceExercise = {
  type: 'choice';
  question: string;
  options: string[];
  correct: number;
  explain: string;
};

export type TrueFalseExercise = {
  type: 'tf';
  statement: string;
  answer: boolean;
  explain: string;
};

export type FillExercise = {
  type: 'fill';
  before: string;
  after: string;
  options: string[];
  correct: number;
  explain: string;
};

export type MatchExercise = {
  type: 'match';
  prompt: string;
  pairs: [string, string][];
};

export type Exercise = ChoiceExercise | TrueFalseExercise | FillExercise | MatchExercise;

export interface Lesson {
  id: string;
  title: string;
  tips: string[];
  exercises: Exercise[];
}

export interface Unit {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  colorDark: string;
  icon: string;
  lessons: Lesson[];
}

export const XP_PER_LESSON = 10;
export const XP_PERFECT_BONUS = 5;
export const XP_REVIEW = 5;
export const MAX_HEARTS = 5;

export const optionsCourse: Unit[] = [
  {
    id: 'u1',
    title: '第 1 单元 · 期权是什么',
    subtitle: '认识期权的本质：权利、义务与合约要素',
    color: '#58cc02',
    colorDark: '#46a302',
    icon: '🌱',
    lessons: [
      {
        id: 'u1l1',
        title: '权利与义务',
        tips: [
          '期权（Option）是一种合约：买方付出权利金，获得在未来以约定价格买入或卖出标的资产的「权利」，而非义务。',
          '看涨期权（Call）赋予买方「买入」标的的权利；看跌期权（Put）赋予买方「卖出」标的的权利。',
          '期权卖方收取权利金，但承担义务：一旦买方行权，卖方必须履约。',
          '买方最大亏损是已付出的权利金；卖方的收益上限是权利金，风险可能远大于收益。',
        ],
        exercises: [
          {
            type: 'choice',
            question: '期权买方获得的是什么？',
            options: ['必须履行的义务', '未来买卖标的的权利', '标的资产的所有权', '固定的利息收益'],
            correct: 1,
            explain: '期权买方付出权利金，换取的是「权利」而不是义务——可以选择行权，也可以放弃。',
          },
          {
            type: 'tf',
            statement: '看涨期权（Call）的买方有权在到期日前以行权价买入标的资产。',
            answer: true,
            explain: '正确。Call 赋予买方以行权价「买入」标的的权利（美式期权可在到期前任意交易日行权）。',
          },
          {
            type: 'fill',
            before: '看跌期权（Put）赋予买方以行权价',
            after: '标的资产的权利。',
            options: ['卖出', '买入', '持有', '借入'],
            correct: 0,
            explain: 'Put = 卖出的权利。担心股价下跌时，买入 Put 可以锁定卖出价格。',
          },
          {
            type: 'choice',
            question: '期权买方的最大亏损是多少？',
            options: ['无限', '行权价 × 合约数量', '已支付的权利金', '标的资产的全部价值'],
            correct: 2,
            explain: '买方最坏的情况是放弃行权，损失全部权利金——亏损有限、收益潜力大是买方的特点。',
          },
          {
            type: 'match',
            prompt: '把角色和它的特征配对',
            pairs: [
              ['期权买方', '付出权利金，获得权利'],
              ['期权卖方', '收取权利金，承担义务'],
              ['Call', '买入标的的权利'],
              ['Put', '卖出标的的权利'],
            ],
          },
          {
            type: 'tf',
            statement: '期权卖方可以在买方行权时选择拒绝履约。',
            answer: false,
            explain: '错误。卖方收了权利金就承担了义务：买方行权时，卖方必须按合约履约，没有拒绝的权利。',
          },
        ],
      },
      {
        id: 'u1l2',
        title: '合约四要素',
        tips: [
          '一张期权合约由四个核心要素定义：标的资产、行权价（Strike）、到期日（Expiration）、权利金（Premium）。',
          '行权价是合约约定的买卖价格；到期日之后合约作废。',
          '权利金是期权的市场价格，由买方支付给卖方，每天随行情波动。',
          '美股股票期权 1 张合约通常对应 100 股标的股票，报价 $2.50 意味着一张合约花费 $250。',
        ],
        exercises: [
          {
            type: 'choice',
            question: '下列哪一项不是期权合约的核心要素？',
            options: ['行权价', '到期日', '标的资产', '公司分红率'],
            correct: 3,
            explain: '合约四要素是标的、行权价、到期日、权利金。分红会影响定价，但不是合约条款本身。',
          },
          {
            type: 'fill',
            before: '合约中约定的未来买卖价格叫做',
            after: '。',
            options: ['行权价', '权利金', '市价', '面值'],
            correct: 0,
            explain: '行权价（Strike Price）是期权合约锁定的交易价格，行权时按它成交。',
          },
          {
            type: 'choice',
            question: '一张报价 $3.20 的美股股票期权，买入需要支付多少权利金？',
            options: ['$3.20', '$32', '$320', '$3,200'],
            correct: 2,
            explain: '美股股票期权 1 张 = 100 股，所以实际成本 = 报价 × 100 = $320。',
          },
          {
            type: 'tf',
            statement: '期权到期后如果没有行权，合约自动作废，买方损失权利金。',
            answer: true,
            explain: '正确。到期即终点：虚值期权到期归零，买方损失全部权利金。',
          },
          {
            type: 'match',
            prompt: '把术语和定义配对',
            pairs: [
              ['行权价', '合约约定的买卖价格'],
              ['到期日', '合约失效的日期'],
              ['权利金', '期权的市场价格'],
              ['标的资产', '合约对应的股票或指数'],
            ],
          },
          {
            type: 'choice',
            question: '「AAPL 2026-09-18 到期、行权价 $200 的 Call」中，$200 是什么？',
            options: ['权利金', '行权价', '苹果的股价', '合约乘数'],
            correct: 1,
            explain: '$200 是行权价：买方有权在到期前以每股 $200 买入 100 股 AAPL。',
          },
        ],
      },
      {
        id: 'u1l3',
        title: '期权 vs 股票 vs 期货',
        tips: [
          '买股票 = 直接持有资产，没有到期日；买期权 = 持有一份会过期的权利。',
          '期货双方都承担义务；期权只有卖方承担义务，买方只有权利。',
          '期权自带杠杆：用较少的权利金控制 100 股的敞口，收益和亏损比例都会放大。',
          '期权是「损耗性资产」：即使股价不动，时间流逝也会让期权贬值。',
        ],
        exercises: [
          {
            type: 'choice',
            question: '期权与期货最本质的区别是什么？',
            options: [
              '期货没有杠杆',
              '期权买方只有权利没有义务，期货双方都有义务',
              '期权不能交易指数',
              '期货没有到期日',
            ],
            correct: 1,
            explain: '期货合约双方到期都必须履约；期权买方可以选择放弃，这是两者的核心差异。',
          },
          {
            type: 'tf',
            statement: '持有股票没有到期日，而期权合约一定会到期。',
            answer: true,
            explain: '正确。股票可以无限期持有，期权则是「会融化的冰块」，时间是它的敌人。',
          },
          {
            type: 'fill',
            before: '即使股价原地不动，期权也会因为',
            after: '而逐渐贬值。',
            options: ['时间流逝', '成交量下降', '分红增加', '利率归零'],
            correct: 0,
            explain: '这就是时间衰减（Time Decay）。期权价值中包含时间价值，它每天都在消耗。',
          },
          {
            type: 'choice',
            question: '为什么说期权自带杠杆？',
            options: [
              '因为券商强制融资',
              '因为用较少权利金就能控制 100 股的价格敞口',
              '因为期权手续费更低',
              '因为期权波动比股票小',
            ],
            correct: 1,
            explain: '花几百美元的权利金即可控制价值数万美元的股票敞口，涨跌被同比例放大——这是杠杆的双刃剑。',
          },
          {
            type: 'tf',
            statement: '买入期权亏损可能超过投入的权利金。',
            answer: false,
            explain: '错误。单纯买入期权（long option）的最大亏损就是权利金；亏损可能超过本金的是「卖出」期权。',
          },
          {
            type: 'match',
            prompt: '把工具和特征配对',
            pairs: [
              ['股票', '直接持有资产，无到期日'],
              ['期权买方', '有权利无义务，会到期'],
              ['期货', '双方均有履约义务'],
              ['期权卖方', '收权利金，承担履约义务'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'u2',
    title: '第 2 单元 · 四大基本仓位',
    subtitle: '买卖 Call 与 Put 的损益结构',
    color: '#1cb0f6',
    colorDark: '#1899d6',
    icon: '📈',
    lessons: [
      {
        id: 'u2l1',
        title: '买入看涨（Long Call）',
        tips: [
          'Long Call：看涨后市时买入 Call，股价涨得越多赚得越多。',
          '盈亏平衡点 = 行权价 + 权利金。股价必须涨过这个点，到期才真正开始盈利。',
          '最大亏损 = 权利金（股价不涨甚至下跌时）；理论最大收益无限。',
          '例：股价 $100，买入行权价 $105 的 Call 花 $2，则到期盈亏平衡点是 $107。',
        ],
        exercises: [
          {
            type: 'choice',
            question: '什么时候适合建立 Long Call 仓位？',
            options: ['预期股价大跌', '预期股价横盘', '预期股价上涨', '预期波动率下降'],
            correct: 2,
            explain: 'Long Call 是最直接的看涨工具：方向判断对且涨幅足够，收益可远超本金。',
          },
          {
            type: 'fill',
            before: 'Long Call 的到期盈亏平衡点 = 行权价 +',
            after: '。',
            options: ['权利金', '股价', '保证金', '手续费率'],
            correct: 0,
            explain: '你先付出了权利金，所以股价要涨过「行权价 + 权利金」才开始净赚。',
          },
          {
            type: 'choice',
            question: '股价 $50，你花 $3 买入行权价 $55 的 Call。到期时股价 $60，每股盈亏是多少？',
            options: ['+$10', '+$5', '+$2', '-$3'],
            correct: 2,
            explain: '到期内在价值 = 60 - 55 = $5，减去 $3 成本，净赚 $2/股（一张合约 $200）。',
          },
          {
            type: 'tf',
            statement: 'Long Call 的理论最大收益是无限的。',
            answer: true,
            explain: '正确。股价上不封顶，Call 的内在价值随股价同步上涨。',
          },
          {
            type: 'choice',
            question: '到期时股价低于行权价，Long Call 的结果是？',
            options: ['自动展期到下月', '亏损全部权利金', '必须补缴保证金', '转换为股票'],
            correct: 1,
            explain: '虚值到期的 Call 一文不值，买方损失全部权利金——这也是买方的最大亏损。',
          },
          {
            type: 'tf',
            statement: '只要到期股价高于行权价，Long Call 就一定整体盈利。',
            answer: false,
            explain: '错误。股价在行权价和盈亏平衡点之间时，行权只能收回部分权利金，整体仍是亏的。',
          },
        ],
      },
      {
        id: 'u2l2',
        title: '买入看跌（Long Put）',
        tips: [
          'Long Put：看跌后市时买入 Put，股价跌得越多赚得越多。',
          '盈亏平衡点 = 行权价 - 权利金。',
          '最大亏损 = 权利金；最大收益 = 行权价 - 权利金（股价跌到 0 时）。',
          'Long Put 也常被用作持仓的「保险」：股票 + Put = 给持股买了保底价。',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'Long Put 在什么行情下盈利最大？',
            options: ['股价暴涨', '股价横盘', '股价大跌', '波动率下降'],
            correct: 2,
            explain: 'Put 是看跌工具：股价跌破盈亏平衡点后，跌得越深赚得越多。',
          },
          {
            type: 'fill',
            before: 'Long Put 的到期盈亏平衡点 = 行权价 -',
            after: '。',
            options: ['权利金', '股价', '内在价值', '保证金'],
            correct: 0,
            explain: '股价必须跌破「行权价 - 权利金」，Long Put 到期才开始净赚。',
          },
          {
            type: 'choice',
            question: '股价 $80，你花 $4 买入行权价 $75 的 Put。到期股价 $65，每股盈亏是？',
            options: ['+$10', '+$6', '+$4', '-$4'],
            correct: 1,
            explain: '内在价值 = 75 - 65 = $10，减去 $4 成本，净赚 $6/股。',
          },
          {
            type: 'tf',
            statement: 'Long Put 的最大收益是无限的。',
            answer: false,
            explain: '错误。股价最低跌到 0，所以最大收益 = 行权价 - 权利金，是有限的（但可能很大）。',
          },
          {
            type: 'match',
            prompt: '把仓位和到期盈亏平衡点配对',
            pairs: [
              ['Long Call', '行权价 + 权利金'],
              ['Long Put', '行权价 - 权利金'],
              ['买方最大亏损', '权利金'],
              ['Put 最大收益', '行权价 - 权利金'],
            ],
          },
          {
            type: 'choice',
            question: '持有 100 股股票同时买入 1 张 Put，这个组合的作用类似？',
            options: ['加杠杆做多', '给持股买保险设置保底价', '做空股票', '收租金'],
            correct: 1,
            explain: '这是保护性看跌（Protective Put）：无论股价跌多深，都能以行权价卖出，锁定最大回撤。',
          },
        ],
      },
      {
        id: 'u2l3',
        title: '卖出期权（Short）',
        tips: [
          '卖出（Short/Write）期权：收取权利金，赌期权到期时不值钱。',
          '裸卖 Call（Naked Call）理论亏损无限——股价可以无限上涨，是最危险的单腿仓位。',
          '卖 Put 的最大亏损 = 行权价 - 权利金（股价跌到 0），风险大但有限。',
          '卖方盈利概率通常较高，但盈亏比差：赚小钱的次数多，偶尔一次大亏可能吞掉多次盈利。',
        ],
        exercises: [
          {
            type: 'choice',
            question: '哪种单腿仓位的理论最大亏损是无限的？',
            options: ['Long Call', 'Long Put', '裸卖 Call', '卖 Put'],
            correct: 2,
            explain: '裸卖 Call 时股价无限上涨会带来无限亏损，必须极度谨慎或配合持股（备兑）。',
          },
          {
            type: 'tf',
            statement: '期权卖方的最大收益是收到的权利金。',
            answer: true,
            explain: '正确。卖方最好的结果就是期权作废归零，把权利金全部装进口袋——收益封顶。',
          },
          {
            type: 'fill',
            before: '卖出 Put 的最大亏损 = 行权价 -',
            after: '（发生在股价跌到 0 时）。',
            options: ['权利金', '股价', '保证金', '时间价值'],
            correct: 0,
            explain: '股价跌到 0 时卖方仍须按行权价接货，亏损 = 行权价 - 已收的权利金。',
          },
          {
            type: 'choice',
            question: '为什么说期权卖方「胜率高但盈亏比差」？',
            options: [
              '因为卖方手续费更高',
              '因为多数期权虚值到期让卖方赚权利金，但单次大亏可能吞掉多次小赚',
              '因为卖方无法平仓',
              '因为卖方不用交保证金',
            ],
            correct: 1,
            explain: '大部分期权到期归零，卖方常常赚钱；但收益封顶、风险敞口大，一次极端行情可能损失惨重。',
          },
          {
            type: 'tf',
            statement: '卖出期权后不能提前平仓，必须持有到期。',
            answer: false,
            explain: '错误。卖方随时可以买回同一合约平仓（Buy to Close），锁定盈亏、解除义务。',
          },
          {
            type: 'match',
            prompt: '把四大基本仓位和方向观点配对',
            pairs: [
              ['Long Call', '强烈看涨'],
              ['Long Put', '强烈看跌'],
              ['Short Call', '看不涨（横盘或下跌）'],
              ['Short Put', '看不跌（横盘或上涨）'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'u3',
    title: '第 3 单元 · 价值的构成',
    subtitle: '实值/虚值、内在价值与时间价值',
    color: '#ce82ff',
    colorDark: '#a568cc',
    icon: '💎',
    lessons: [
      {
        id: 'u3l1',
        title: '实值、平值、虚值',
        tips: [
          'Moneyness 描述行权价与股价的关系：实值（ITM）、平值（ATM）、虚值（OTM）。',
          'Call：股价 > 行权价 为实值；Put 相反：股价 < 行权价 为实值。',
          '平值（ATM）= 行权价 ≈ 当前股价，时间价值最大。',
          '虚值期权更便宜、杠杆更高，但到期归零的概率也更大。',
        ],
        exercises: [
          {
            type: 'choice',
            question: '股价 $120，行权价 $100 的 Call 属于？',
            options: ['虚值（OTM）', '平值（ATM）', '实值（ITM）', '无法判断'],
            correct: 2,
            explain: 'Call 的行权价低于股价即为实值：现在行权就能以 $100 买入市价 $120 的股票。',
          },
          {
            type: 'choice',
            question: '股价 $120，行权价 $100 的 Put 属于？',
            options: ['实值（ITM）', '虚值（OTM）', '平值（ATM）', '深度实值'],
            correct: 1,
            explain: 'Put 的实值条件是股价低于行权价。现在以 $100 卖出市价 $120 的股票没有意义，所以是虚值。',
          },
          {
            type: 'fill',
            before: '行权价与当前股价几乎相等的期权称为',
            after: '期权。',
            options: ['平值（ATM）', '实值（ITM）', '虚值（OTM）', '欧式'],
            correct: 0,
            explain: 'At-The-Money：行权价 ≈ 股价，这里的时间价值和 Gamma 都最大。',
          },
          {
            type: 'tf',
            statement: '虚值期权到期时一定一文不值。',
            answer: true,
            explain: '正确。到期仍是虚值就没有行权意义，价值归零——这就是买虚值期权的风险。',
          },
          {
            type: 'match',
            prompt: '股价 $50 时，把合约和状态配对',
            pairs: [
              ['$45 Call', '实值 ITM'],
              ['$55 Call', '虚值 OTM'],
              ['$55 Put', '实值 ITM'],
              ['$50 Put', '平值 ATM'],
            ],
          },
          {
            type: 'choice',
            question: '为什么有人偏爱买虚值期权？',
            options: [
              '虚值期权没有风险',
              '价格便宜、杠杆更高，方向对了收益率惊人',
              '虚值期权不会时间衰减',
              '虚值期权到期必然行权',
            ],
            correct: 1,
            explain: '虚值便宜、以小博大；代价是胜率低——大部分虚值期权到期归零。',
          },
        ],
      },
      {
        id: 'u3l2',
        title: '内在价值与时间价值',
        tips: [
          '期权价格 = 内在价值 + 时间价值。',
          '内在价值 = 立即行权能拿到的收益：Call 为 max(股价 - 行权价, 0)，Put 为 max(行权价 - 股价, 0)。',
          '时间价值 = 权利金 - 内在价值，反映「未来还有机会变得更值钱」的期望。',
          '虚值和平值期权的价格 100% 是时间价值；到期时时间价值归零。',
        ],
        exercises: [
          {
            type: 'fill',
            before: '期权价格 = 内在价值 +',
            after: '。',
            options: ['时间价值', '行权价', '保证金', '折现率'],
            correct: 0,
            explain: '这是期权定价最基本的分解式，两部分此消彼长地构成权利金。',
          },
          {
            type: 'choice',
            question: '股价 $108，行权价 $100 的 Call 报价 $11。它的内在价值和时间价值分别是？',
            options: ['$11 和 $0', '$8 和 $3', '$3 和 $8', '$0 和 $11'],
            correct: 1,
            explain: '内在价值 = 108 - 100 = $8，时间价值 = 11 - 8 = $3。',
          },
          {
            type: 'choice',
            question: '虚值期权的内在价值是多少？',
            options: ['等于权利金', '为负数', '为零', '等于行权价'],
            correct: 2,
            explain: '内在价值不可能为负——虚值期权内在价值为 0，价格全部是时间价值。',
          },
          {
            type: 'tf',
            statement: '到期那一刻，期权的时间价值归零，只剩内在价值。',
            answer: true,
            explain: '正确。没有未来就没有时间价值：到期价值 = 内在价值（可能为 0）。',
          },
          {
            type: 'choice',
            question: '股价 $95，行权价 $100 的 Put 报价 $7。它的时间价值是？',
            options: ['$7', '$5', '$2', '$0'],
            correct: 2,
            explain: 'Put 内在价值 = 100 - 95 = $5，时间价值 = 7 - 5 = $2。',
          },
          {
            type: 'tf',
            statement: '深度实值期权的价格几乎全部是时间价值。',
            answer: false,
            explain: '错误。深度实值期权的价格以内在价值为主，时间价值反而很小；时间价值在平值处最大。',
          },
        ],
      },
      {
        id: 'u3l3',
        title: '时间衰减',
        tips: [
          '时间衰减（Time Decay）：随着到期日临近，时间价值不断蒸发。',
          '衰减不是匀速的：平值期权在最后 30~45 天衰减明显加速。',
          '时间是买方的敌人、卖方的朋友——卖方靠时间衰减赚钱。',
          '买期权要给方向判断留足时间；「方向对了但时间不够」是买方最常见的亏法。',
        ],
        exercises: [
          {
            type: 'choice',
            question: '时间衰减对谁有利？',
            options: ['期权买方', '期权卖方', '交易所', '所有人'],
            correct: 1,
            explain: '每过一天，期权的时间价值就少一分，卖方的负债就轻一分——时间站在卖方一边。',
          },
          {
            type: 'tf',
            statement: '期权的时间价值是匀速衰减的，每天减少相同金额。',
            answer: false,
            explain: '错误。平值期权的时间衰减在临近到期时显著加速，最后几周最猛烈。',
          },
          {
            type: 'fill',
            before: '平值期权的时间衰减在临近到期的最后',
            after: '明显加速。',
            options: ['30~45 天', '一年', '三年', '一小时'],
            correct: 0,
            explain: '经验上最后 30~45 天是 Theta 燃烧最快的阶段，短期期权对时间极其敏感。',
          },
          {
            type: 'choice',
            question: '「方向看对了却还是亏钱」，对期权买方最常见的原因是？',
            options: [
              '交易所故障',
              '涨幅不够或太慢，时间价值损耗超过了内在价值的增长',
              '权利金被没收',
              '卖方违约',
            ],
            correct: 1,
            explain: '买方需要股价在有限时间内足够大地波动；磨磨蹭蹭的小涨会被时间衰减吃掉。',
          },
          {
            type: 'tf',
            statement: '周末虽然不开盘，期权的时间价值同样在流逝。',
            answer: true,
            explain: '正确。日历时间照走不误，做市商通常会在周五提前折算部分周末衰减。',
          },
          {
            type: 'match',
            prompt: '把概念和描述配对',
            pairs: [
              ['时间衰减', '时间价值随到期日临近而蒸发'],
              ['买方视角', '时间是敌人'],
              ['卖方视角', '时间是朋友'],
              ['衰减速度', '平值期权临近到期时加速'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'u4',
    title: '第 4 单元 · 期权如何定价',
    subtitle: '定价因素、隐含波动率与平价关系',
    color: '#ff9600',
    colorDark: '#e08600',
    icon: '⚖️',
    lessons: [
      {
        id: 'u4l1',
        title: '定价六因素',
        tips: [
          '影响期权价格的六大因素：股价、行权价、剩余时间、波动率、无风险利率、分红。',
          '股价上涨 → Call 更贵、Put 更便宜；剩余时间越长 → Call 和 Put 都更贵。',
          '波动率上升 → Call 和 Put 都更贵：波动越大，期权「赌对」的机会越多。',
          '利率和分红影响较小：利率升高利好 Call，分红增加利好 Put。',
        ],
        exercises: [
          {
            type: 'choice',
            question: '下列哪个因素上升会让 Call 和 Put 同时变贵？',
            options: ['股价', '波动率', '分红', '行权价'],
            correct: 1,
            explain: '波动率是双向的：波动越大，无论涨跌方向的期权都更有机会变实值，所以都涨价。',
          },
          {
            type: 'tf',
            statement: '其他条件不变，剩余时间越长的期权越贵。',
            answer: true,
            explain: '正确。时间越多，机会越多，时间价值越高——所以远月期权比近月贵。',
          },
          {
            type: 'fill',
            before: '股价上涨时，Call 变贵、Put 变',
            after: '。',
            options: ['便宜', '更贵', '不变', '归零'],
            correct: 0,
            explain: '股价与 Call 价格正相关、与 Put 价格负相关——这正是 Delta 的正负号。',
          },
          {
            type: 'choice',
            question: '六大定价因素中，日常交易里影响最小的通常是？',
            options: ['股价变动', '波动率变化', '无风险利率的微小变动', '剩余时间'],
            correct: 2,
            explain: '利率（Rho）对短期期权影响甚微，日内交易几乎可以忽略；股价、波动率、时间才是主角。',
          },
          {
            type: 'match',
            prompt: '把因素变化和对期权价格的影响配对',
            pairs: [
              ['股价上涨', 'Call 涨价'],
              ['波动率上升', 'Call 和 Put 都涨价'],
              ['时间流逝', 'Call 和 Put 都跌价'],
              ['分红增加', 'Put 涨价'],
            ],
          },
          {
            type: 'tf',
            statement: '行权价越高的 Call 越贵。',
            answer: false,
            explain: '错误。行权价越高，Call 变实值越难，价格越便宜；Put 才是行权价越高越贵。',
          },
        ],
      },
      {
        id: 'u4l2',
        title: '隐含波动率',
        tips: [
          '隐含波动率（IV）是市场价格「反推」出的对未来波动的预期，是期权贵贱的核心标尺。',
          'IV 高 = 期权贵（利好卖方策略）；IV 低 = 期权便宜（利好买方策略）。',
          '财报、新品发布等事件前 IV 通常抬升；事件落地后 IV 骤降，称为「IV 挤压」（IV Crush）。',
          'IV Rank / IV Percentile 把当前 IV 放在过去一年的区间里比较，比看绝对值更有意义。',
        ],
        exercises: [
          {
            type: 'choice',
            question: '隐含波动率（IV）反映的是什么？',
            options: [
              '过去一年的实际波动',
              '市场对未来波动的预期',
              '股票的分红率',
              '交易所的手续费',
            ],
            correct: 1,
            explain: 'IV 是从期权市价反推出的预期波动——历史波动率看过去，IV 看未来。',
          },
          {
            type: 'tf',
            statement: '财报公布前，该股期权的 IV 通常会升高。',
            answer: true,
            explain: '正确。市场预期财报会带来大幅波动，不确定性推高期权需求和 IV。',
          },
          {
            type: 'fill',
            before: '财报落地后 IV 骤降导致期权价格大跌的现象叫',
            after: '。',
            options: ['IV 挤压（IV Crush）', '时间衰减', '逼空', '除权'],
            correct: 0,
            explain: 'IV Crush：不确定性消失，IV 瞬间回落。即使方向猜对，买方也可能因 IV 崩塌而亏钱。',
          },
          {
            type: 'choice',
            question: '财报前买入平值 Call，财报后股价小涨 1%，期权却亏了 30%。最可能的原因是？',
            options: ['交易系统出错', 'IV Crush：隐含波动率暴跌', '分红除权', '被强制平仓'],
            correct: 1,
            explain: '事件前 IV 溢价很高，事件后 IV 崩塌，小幅上涨补不回波动率坍缩造成的损失。',
          },
          {
            type: 'choice',
            question: 'IV Rank 为 90% 意味着什么？',
            options: [
              '当前 IV 处于过去一年区间的高位',
              '股价过去一年涨了 90%',
              '期权成交量排名前 10%',
              '有 90% 概率会行权',
            ],
            correct: 0,
            explain: 'IV Rank 90 表示当前 IV 高于过去一年绝大多数时间——期权偏贵，卖方策略更占优。',
          },
          {
            type: 'tf',
            statement: 'IV 低位时买期权、IV 高位时卖期权，是顺应波动率的一般原则。',
            answer: true,
            explain: '正确。像买东西一样：便宜时买入（Long），昂贵时卖出（Short），当然还要结合方向判断。',
          },
        ],
      },
      {
        id: 'u4l3',
        title: '定价模型与平价关系',
        tips: [
          'Black-Scholes 模型给出期权理论价：输入股价、行权价、时间、波动率、利率，输出理论价格。',
          '模型最重要的用途不是算价格，而是从市价反推隐含波动率。',
          'Put-Call 平价：同行权价同到期的 Call - Put = 股价 - 行权价现值，把四种资产锁在一起。',
          '平价关系被打破时会出现套利机会，所以它在流动性好的市场几乎总是成立。',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'Black-Scholes 模型在实战中最常见的用途是？',
            options: [
              '预测明天的股价',
              '从期权市价反推隐含波动率',
              '计算公司市值',
              '决定分红日期',
            ],
            correct: 1,
            explain: '市场用 BSM 作为「翻译器」：把市价翻译成 IV，用同一把尺子比较不同期权的贵贱。',
          },
          {
            type: 'tf',
            statement: 'Black-Scholes 模型的输入包括股价、行权价、剩余时间、波动率和利率。',
            answer: true,
            explain: '正确。这五个输入（加上分红）决定理论价，其中唯一无法直接观测的就是波动率。',
          },
          {
            type: 'fill',
            before: '同行权价、同到期日的 Call 与 Put 价格之间的约束关系叫做',
            after: '。',
            options: ['Put-Call 平价', '资本资产定价', '有效市场假说', '凯利公式'],
            correct: 0,
            explain: 'Put-Call Parity：C - P = S - K 的现值。违背它就有无风险套利，市场会迅速纠正。',
          },
          {
            type: 'choice',
            question: '根据 Put-Call 平价，「持有股票 + 买入 Put」的损益结构等价于？',
            options: ['卖出 Call', '买入 Call + 持有现金', '卖出 Put', '做空股票'],
            correct: 1,
            explain: '股票 + 保护性 Put ≈ Call + 现金：两者都是「下跌保底、上涨跟随」的合成结构。',
          },
          {
            type: 'tf',
            statement: '模型算出的理论价和市场价不一致时，市场价一定是错的。',
            answer: false,
            explain: '错误。市价包含了模型没有的信息（事件预期、供需、偏度）。实践中通常认为市价对，让 IV 去解释差异。',
          },
          {
            type: 'match',
            prompt: '把工具和作用配对',
            pairs: [
              ['Black-Scholes', '期权理论定价模型'],
              ['隐含波动率', '市价反推的预期波动'],
              ['Put-Call 平价', 'Call 与 Put 的价格约束'],
              ['套利者', '让平价关系保持成立'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'u5',
    title: '第 5 单元 · 希腊字母',
    subtitle: '用 Delta、Gamma、Theta、Vega 量化风险',
    color: '#ff4b4b',
    colorDark: '#d33131',
    icon: '🏛️',
    lessons: [
      {
        id: 'u5l1',
        title: 'Delta 与 Gamma',
        tips: [
          'Delta：股价每涨 $1，期权价格变动多少。Call 的 Delta 在 0~1，Put 在 -1~0。',
          'Delta 也可粗略理解为「到期变实值的概率」：平值 ≈ 0.50，深度实值 ≈ 1。',
          'Gamma：股价每涨 $1，Delta 本身变动多少——它是 Delta 的加速度。',
          '平值、临近到期的期权 Gamma 最大，价格行为最「敏感易变」。',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'Delta = 0.60 的 Call，股价上涨 $1 时期权价格大约？',
            options: ['上涨 $0.60', '下跌 $0.60', '上涨 $1', '不变'],
            correct: 0,
            explain: 'Delta 就是价格敏感度：股价 +$1 → 期权约 +$0.60（一张合约约 +$60）。',
          },
          {
            type: 'tf',
            statement: 'Put 期权的 Delta 是负数。',
            answer: true,
            explain: '正确。股价上涨时 Put 贬值，所以 Put 的 Delta 在 -1 到 0 之间。',
          },
          {
            type: 'fill',
            before: '平值期权的 Delta 大约是',
            after: '。',
            options: ['0.50', '1.00', '0.05', '0'],
            correct: 0,
            explain: '平值 Call ≈ +0.50、平值 Put ≈ -0.50——大致对应五五开的实值概率。',
          },
          {
            type: 'choice',
            question: 'Gamma 衡量的是什么？',
            options: [
              '时间流逝对期权价的影响',
              '股价变动引起的 Delta 变化速度',
              '波动率对期权价的影响',
              '利率对期权价的影响',
            ],
            correct: 1,
            explain: 'Gamma 是 Delta 的变化率：Gamma 大意味着 Delta 会随股价快速改变，仓位性质不稳定。',
          },
          {
            type: 'choice',
            question: '哪类期权的 Gamma 最大？',
            options: ['深度实值、远月', '深度虚值、远月', '平值、临近到期', '任何 Put'],
            correct: 2,
            explain: '临期平值期权在「实值/虚值」的悬崖边上，Delta 摇摆最剧烈，Gamma 最大。',
          },
          {
            type: 'tf',
            statement: 'Delta 可以粗略地当作期权到期变实值的概率来读。',
            answer: true,
            explain: '正确（近似而非严格）。0.30 Delta ≈ 三成概率到期实值，交易员常用这个直觉选行权价。',
          },
        ],
      },
      {
        id: 'u5l2',
        title: 'Theta 与 Vega',
        tips: [
          'Theta：每过一天，期权价格损失多少。买方 Theta 为负（每天亏时间价值），卖方为正。',
          'Vega：IV 每变动 1 个百分点，期权价格变动多少。买方 Vega 为正，卖方为负。',
          'Theta = -0.05 表示每天损耗 $0.05/股，即一张合约每天约 $5。',
          '买期权 = 做多波动率 + 做空时间；卖期权 = 做空波动率 + 做多时间。',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'Theta = -0.08 的期权，其他条件不变时过一天价格大约？',
            options: ['上涨 $0.08', '下跌 $0.08', '下跌 $8', '不变'],
            correct: 1,
            explain: 'Theta 是每日时间损耗：每股每天约损失 $0.08，一张合约约 $8。',
          },
          {
            type: 'tf',
            statement: '期权买方的 Theta 是正的，每天躺赚时间价值。',
            answer: false,
            explain: '错误。买方持有的是会融化的资产，Theta 为负；收时间价值的是卖方。',
          },
          {
            type: 'fill',
            before: 'Vega 衡量的是',
            after: '每变动 1 个百分点时期权价格的变化。',
            options: ['隐含波动率', '股价', '利率', '时间'],
            correct: 0,
            explain: 'Vega 是波动率敏感度。财报前后 IV 的暴涨暴跌，通过 Vega 直接冲击期权价格。',
          },
          {
            type: 'choice',
            question: '「买入期权」在希腊字母上等于什么立场？',
            options: [
              '做多时间、做空波动率',
              '做多波动率、做空时间',
              '对时间和波动率都中性',
              '只对股价方向有敞口',
            ],
            correct: 1,
            explain: '买方 Vega 为正（盼波动放大）、Theta 为负（怕时间流逝）——正好和卖方相反。',
          },
          {
            type: 'match',
            prompt: '把希腊字母和它衡量的敏感度配对',
            pairs: [
              ['Delta', '股价变动 $1 的影响'],
              ['Gamma', 'Delta 的变化速度'],
              ['Theta', '每天时间损耗'],
              ['Vega', 'IV 变动 1% 的影响'],
            ],
          },
          {
            type: 'choice',
            question: '临近到期时，哪个希腊字母对平值期权买方的伤害最明显？',
            options: ['Rho', 'Theta', 'Vega', 'Delta'],
            correct: 1,
            explain: '临期平值期权的时间衰减最猛，Theta 负担最重——这就是「末日期权」高风险的来源之一。',
          },
        ],
      },
      {
        id: 'u5l3',
        title: '希腊字母实战',
        tips: [
          '组合的希腊字母 = 各腿希腊字母之和，可以把整个账户折算成一组净敞口。',
          '净 Delta 告诉你账户等效持有多少股：净 Delta +80 ≈ 持有 80 股的方向敞口。',
          'Delta 对冲：用股票或期权把净 Delta 调到 0，赚波动率/时间的钱而不赌方向。',
          '希腊字母是动态的：股价、时间、IV 一变它们全变，需要持续监控而非一劳永逸。',
        ],
        exercises: [
          {
            type: 'choice',
            question: '你持有 2 张 Delta 0.50 的 Call（每张对应 100 股），账户净 Delta 约等于？',
            options: ['+1', '+50', '+100', '+200'],
            correct: 2,
            explain: '2 张 × 0.50 × 100 股 = +100：方向敞口约等于持有 100 股正股。',
          },
          {
            type: 'tf',
            statement: '组合的净希腊字母等于各条腿希腊字母的加总。',
            answer: true,
            explain: '正确。希腊字母是线性可加的，这让多腿策略的风险可以汇总成一张风险表。',
          },
          {
            type: 'fill',
            before: '把组合净 Delta 调整到接近 0 的操作叫做',
            after: '。',
            options: ['Delta 对冲', '追加保证金', '展期', '行权'],
            correct: 0,
            explain: 'Delta 对冲后组合对小幅涨跌不敏感，盈亏主要来自 Gamma、Theta、Vega——职业做市商的日常。',
          },
          {
            type: 'choice',
            question: 'Delta 中性组合的盈亏主要来源于哪些维度？',
            options: [
              '只有股价方向',
              '波动率变化、时间衰减和 Gamma 效应',
              '分红和配股',
              '汇率变动',
            ],
            correct: 1,
            explain: '方向被对冲掉后，剩下的就是波动率（Vega）、时间（Theta）和曲率（Gamma）的博弈。',
          },
          {
            type: 'tf',
            statement: '希腊字母设置好一次就不会再变，无需盯盘。',
            answer: false,
            explain: '错误。希腊字母随股价、时间、IV 实时变化，Delta 中性的组合明天可能就不中性了。',
          },
          {
            type: 'choice',
            question: '交易员说「我卖的是 30 Delta 的 Put」，意思最接近？',
            options: [
              '行权价是 $30',
              '权利金是 $30',
              '选了 Delta 约 -0.30、到期约三成概率实值的行权价',
              '合约乘数是 30',
            ],
            correct: 2,
            explain: '按 Delta 选行权价是专业习惯：30 Delta ≈ 约 30% 概率被行权，风格比直接报行权价更通用。',
          },
        ],
      },
    ],
  },
  {
    id: 'u6',
    title: '第 6 单元 · 三大入门策略',
    subtitle: '备兑开仓、保护性看跌、现金担保卖出',
    color: '#00cd9c',
    colorDark: '#00a87f',
    icon: '🛡️',
    lessons: [
      {
        id: 'u6l1',
        title: '备兑开仓（Covered Call）',
        tips: [
          '备兑开仓 = 持有 100 股正股 + 卖出 1 张 Call：用持股「背书」卖出义务。',
          '收益来源是权利金，代价是放弃行权价以上的上涨空间。',
          '适合「长期看好但预期短期横盘或小涨」的持仓，相当于给股票收租。',
          '若到期股价高于行权价，股票会被以行权价「叫走」（Called Away）。',
        ],
        exercises: [
          {
            type: 'choice',
            question: '备兑开仓的构成是？',
            options: [
              '持有 100 股 + 买入 1 张 Call',
              '持有 100 股 + 卖出 1 张 Call',
              '裸卖 1 张 Call',
              '持有现金 + 卖出 1 张 Put',
            ],
            correct: 1,
            explain: 'Covered Call = 正股 + 卖 Call。持股覆盖了卖 Call 的履约义务，故称「备兑」。',
          },
          {
            type: 'tf',
            statement: '备兑开仓的代价是放弃行权价以上的上涨收益。',
            answer: true,
            explain: '正确。股价涨破行权价后，多出来的涨幅归 Call 买方——你用上行空间换了确定的权利金。',
          },
          {
            type: 'fill',
            before: '备兑开仓适合的预期是：长期看好但短期',
            after: '。',
            options: ['横盘或小涨', '暴涨', '暴跌', '退市'],
            correct: 0,
            explain: '横盘时 Call 作废、白收租金；暴涨会踏空，暴跌时权利金也只能提供一点缓冲。',
          },
          {
            type: 'choice',
            question: '成本 $90 持股，以 $2 卖出行权价 $100 的 Call。到期股价 $110，每股总收益是？',
            options: ['$22', '$20', '$12', '$10'],
            correct: 2,
            explain: '股票以 $100 被叫走赚 $10，加上 $2 权利金 = $12/股；$100 以上的 $10 涨幅与你无关。',
          },
          {
            type: 'tf',
            statement: '备兑开仓能完全保护股票的下跌风险。',
            answer: false,
            explain: '错误。下跌时权利金只能抵消一小部分亏损，正股跌多少你几乎照亏——它是增强收益工具，不是保险。',
          },
          {
            type: 'match',
            prompt: '把备兑开仓的情景和结果配对',
            pairs: [
              ['到期股价 < 行权价', 'Call 作废，白赚权利金'],
              ['到期股价 > 行权价', '股票按行权价被叫走'],
              ['股价暴跌', '权利金只提供有限缓冲'],
              ['策略本质', '用上行空间换现金流'],
            ],
          },
        ],
      },
      {
        id: 'u6l2',
        title: '保护性看跌（Protective Put）',
        tips: [
          '保护性看跌 = 持有 100 股正股 + 买入 1 张 Put：给股票买保险。',
          '无论股价跌多深，都可以按行权价卖出，最大亏损被锁定。',
          '成本是持续支付的权利金——保险费会侵蚀长期收益。',
          '最大亏损 ≈ 股价 - 行权价 + 权利金；上涨时收益 = 股票涨幅 - 权利金。',
        ],
        exercises: [
          {
            type: 'choice',
            question: '保护性看跌策略最贴切的类比是？',
            options: ['给股票加杠杆', '给股票买保险', '给股票收租', '做空股票'],
            correct: 1,
            explain: 'Put 就是保单：付保费（权利金）换来保底价（行权价），跌破保底价的损失由「保险公司」（Put 卖方）承担。',
          },
          {
            type: 'fill',
            before: '保护性看跌 = 持有正股 + 买入',
            after: '。',
            options: ['Put', 'Call', '国债', '期货'],
            correct: 0,
            explain: '正股承担上涨收益，Put 兜住下跌风险——两者合成「有保底的多头」。',
          },
          {
            type: 'choice',
            question: '$100 买入股票，同时花 $3 买入行权价 $95 的 Put。这个组合每股最大亏损是？',
            options: ['$3', '$5', '$8', '$100'],
            correct: 2,
            explain: '最坏情况按 $95 卖出，亏 $5 股价差 + $3 保费 = $8/股。跌到 0 也不会亏更多。',
          },
          {
            type: 'tf',
            statement: '保护性看跌锁定了最大亏损，也保留了上涨空间。',
            answer: true,
            explain: '正确。上涨不封顶（只减去权利金成本），下跌有保底——代价就是持续的保险费。',
          },
          {
            type: 'choice',
            question: '长期反复购买保护性 Put 的主要缺点是？',
            options: [
              '会被强制平仓',
              '保险费持续侵蚀收益，横盘时纯亏权利金',
              '会失去投票权',
              '增加分红税',
            ],
            correct: 1,
            explain: '保险不是免费的：行情平静时 Put 一次次作废，长期拖累组合收益，需要权衡投保时机。',
          },
          {
            type: 'tf',
            statement: '股价上涨时，保护性 Put 组合的收益等于股票涨幅加上权利金。',
            answer: false,
            explain: '错误。上涨时 Put 作废，组合收益 = 股票涨幅「减去」权利金——保费是纯成本。',
          },
        ],
      },
      {
        id: 'u6l3',
        title: '现金担保卖出看跌（CSP）',
        tips: [
          '现金担保卖 Put（Cash-Secured Put）：卖出 Put 的同时预留足额现金，准备按行权价接货。',
          '两种结局都不坏：股价不跌破行权价 → 白赚权利金；跌破被指派 → 以自己本来就愿意的价格折价买入。',
          '实际买入成本 = 行权价 - 权利金，比直接挂限价单买入更便宜。',
          '风险：股价暴跌远低于行权价时，你仍须按行权价接货，浮亏可能很大。',
        ],
        exercises: [
          {
            type: 'choice',
            question: '现金担保卖 Put 中「现金担保」指的是什么？',
            options: [
              '券商赠送的保证金',
              '预留足额现金以备按行权价买入股票',
              '把现金锁定买国债',
              '现金分红再投资',
            ],
            correct: 1,
            explain: '预留「行权价 × 100」的现金，被指派时能全款接货——没有杠杆风险的卖 Put 方式。',
          },
          {
            type: 'tf',
            statement: '卖出 Put 被指派时，你必须以行权价买入 100 股标的。',
            answer: true,
            explain: '正确。Put 卖方的义务就是「按行权价接货」。所以只对真心愿意持有的股票卖 Put。',
          },
          {
            type: 'fill',
            before: '卖 Put 被指派后的实际买入成本 = 行权价 -',
            after: '。',
            options: ['权利金', '股价', '保证金', '手续费'],
            correct: 0,
            explain: '收到的权利金抵扣了成本：$95 行权价收 $2 权利金，接货成本实为 $93/股。',
          },
          {
            type: 'choice',
            question: '「我愿意 $90 买入这只 $100 的股票」，用哪种操作还能顺便赚权利金？',
            options: [
              '挂 $90 限价买单',
              '卖出行权价 $90 的现金担保 Put',
              '买入行权价 $90 的 Call',
              '直接市价买入',
            ],
            correct: 1,
            explain: '卖 $90 Put：跌到 $90 以下被指派 = 如愿低价接货，还白收权利金；不跌 = 权利金照赚。',
          },
          {
            type: 'choice',
            question: '现金担保卖 Put 的主要风险是？',
            options: [
              '股价暴涨导致无限亏损',
              '股价暴跌远低于行权价，仍须按行权价接货形成大幅浮亏',
              '权利金被交易所没收',
              '不能提前平仓',
            ],
            correct: 1,
            explain: '股价跌到 $60 你仍要按 $90 接货。行权价的选择必须是你真正愿意长期持有的价格。',
          },
          {
            type: 'match',
            prompt: '把三大入门策略和一句话总结配对',
            pairs: [
              ['备兑开仓', '持股收租，让渡上行'],
              ['保护性看跌', '花保费锁定最大回撤'],
              ['现金担保卖 Put', '折价接货，不跌白赚'],
              ['共同点', '有正股或现金背书，风险可控'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'u7',
    title: '第 7 单元 · 价差与组合',
    subtitle: '垂直价差、跨式、铁鹰与蝶式',
    color: '#ff86d0',
    colorDark: '#e066ae',
    icon: '🦅',
    lessons: [
      {
        id: 'u7l1',
        title: '垂直价差',
        tips: [
          '垂直价差（Vertical Spread）：同时买卖同标的、同到期、不同行权价的两条腿。',
          '牛市看涨价差（Bull Call Spread）：买低行权价 Call + 卖高行权价 Call，净付权利金，温和看涨。',
          '熊市看跌价差（Bear Put Spread）：买高行权价 Put + 卖低行权价 Put，温和看跌。',
          '价差的最大盈亏都被锁定：最大收益 = 行权价差 - 净成本，最大亏损 = 净成本。',
        ],
        exercises: [
          {
            type: 'choice',
            question: '牛市看涨价差（Bull Call Spread）如何构建？',
            options: [
              '买高行权价 Call + 卖低行权价 Call',
              '买低行权价 Call + 卖高行权价 Call',
              '买 Call + 买 Put',
              '卖两张不同月份的 Call',
            ],
            correct: 1,
            explain: '买入更「贵」的低行权价 Call，卖出高行权价 Call 收回部分成本——降低成本、封顶收益。',
          },
          {
            type: 'tf',
            statement: '垂直价差的最大亏损和最大收益都在开仓时就已锁定。',
            answer: true,
            explain: '正确。两条腿互相对冲，盈亏被夹在两个行权价之间——风险明确是价差策略的最大优点。',
          },
          {
            type: 'choice',
            question: '花 $3 净成本建立 $100/$110 的 Bull Call Spread，最大收益是多少？',
            options: ['$3', '$7', '$10', '无限'],
            correct: 1,
            explain: '最大收益 = 行权价差 $10 - 净成本 $3 = $7/股（股价到期 ≥ $110 时实现）。',
          },
          {
            type: 'fill',
            before: '相比单腿买 Call，Bull Call Spread 用放弃部分上涨空间换来了更低的',
            after: '。',
            options: ['成本', '胜率', '流动性', '保证金利率'],
            correct: 0,
            explain: '卖出的高行权价 Call 抵扣了成本，盈亏平衡点更低、时间衰减压力更小，代价是收益封顶。',
          },
          {
            type: 'choice',
            question: '温和看跌某股票，想控制风险，最合适的是？',
            options: ['裸卖 Call', 'Bear Put Spread', '满仓买入虚值 Put', '买入正股'],
            correct: 1,
            explain: '熊市看跌价差成本低、风险锁定，适合「跌一点但不会崩盘」的温和看跌观点。',
          },
          {
            type: 'tf',
            statement: '收权利金开仓的垂直价差（Credit Spread）最大收益就是收到的净权利金。',
            answer: true,
            explain: '正确。Credit Spread 开仓即收钱，期权作废则全留下；最大亏损 = 行权价差 - 净权利金。',
          },
        ],
      },
      {
        id: 'u7l2',
        title: '跨式与宽跨式',
        tips: [
          '买入跨式（Long Straddle）：同时买入同行权价的 Call 和 Put——赌大波动，不赌方向。',
          '买入宽跨式（Long Strangle）：买虚值 Call + 买虚值 Put，更便宜但需要更大的波动才盈利。',
          '跨式盈利条件：涨或跌的幅度超过两份权利金之和。',
          '卖出跨式则是赌横盘：收双份权利金，但两边都暴露风险，属于高危策略。',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'Long Straddle（买入跨式）的构成是？',
            options: [
              '买 Call + 卖 Put（同行权价）',
              '买 Call + 买 Put（同行权价同到期）',
              '卖 Call + 卖 Put',
              '买两张不同月份的 Call',
            ],
            correct: 1,
            explain: '同行权价同时持有 Call 和 Put：无论暴涨还是暴跌，总有一边大赚。',
          },
          {
            type: 'choice',
            question: '什么观点适合买入跨式？',
            options: [
              '确定会横盘',
              '确定会涨',
              '会有大波动，但方向不确定',
              '波动率会下降',
            ],
            correct: 2,
            explain: '典型场景：重大裁决、财报、药物审批——知道有大事，猜不到方向。',
          },
          {
            type: 'fill',
            before: '跨式要盈利，股价波动幅度必须超过',
            after: '。',
            options: ['两份权利金之和', '行权价', '一份权利金', '保证金'],
            correct: 0,
            explain: '你付了双份保费，只有波动大到覆盖 Call + Put 的总成本才开始净赚。',
          },
          {
            type: 'tf',
            statement: '宽跨式（Strangle）比跨式便宜，但需要更大的波动才能盈利。',
            answer: true,
            explain: '正确。两条腿都是虚值所以更便宜，但股价要走更远才能让某一边变实值。',
          },
          {
            type: 'choice',
            question: '财报前买入跨式，最大的隐形敌人是什么？',
            options: ['分红除权', 'IV Crush：财报后波动率坍塌', '交易时差', '合约乘数变化'],
            correct: 1,
            explain: '财报前跨式已被高 IV 抬价；若实际波动不及预期，IV 崩塌会让两条腿同时缩水。',
          },
          {
            type: 'tf',
            statement: '卖出跨式的风险有限，因为收了两份权利金。',
            answer: false,
            explain: '错误。卖跨式两个方向都裸露：暴涨时 Call 端亏损无限，暴跌时 Put 端巨亏——双份权利金对应双向风险。',
          },
        ],
      },
      {
        id: 'u7l3',
        title: '铁鹰与蝶式',
        tips: [
          '铁鹰（Iron Condor）= 卖虚值 Put 价差 + 卖虚值 Call 价差：赌股价停留在中间区间，吃时间价值。',
          '铁鹰四条腿盈亏都锁定：最大收益 = 净权利金，最大亏损 = 翼宽 - 净权利金。',
          '蝶式（Butterfly）：买 1 低 + 卖 2 中 + 买 1 高（行权价等距），赌到期股价精确停在中间行权价附近。',
          '这类中性策略的共同点：高胜率、小收益、靠时间衰减赚钱，怕单边大行情。',
        ],
        exercises: [
          {
            type: 'choice',
            question: '铁鹰策略（Iron Condor）适合什么预期？',
            options: [
              '股价暴涨',
              '股价暴跌',
              '股价在一个区间内横盘',
              '波动率大幅上升',
            ],
            correct: 2,
            explain: '铁鹰在两侧各卖一个虚值价差：只要到期股价留在两个卖出行权价之间，就能拿满权利金。',
          },
          {
            type: 'tf',
            statement: '铁鹰由四条期权腿构成，最大盈亏都是锁定的。',
            answer: true,
            explain: '正确。两侧各有买入的「翅膀」保护，最大亏损 = 翼宽 - 净权利金，不会失控。',
          },
          {
            type: 'fill',
            before: '蝶式价差的经典结构是：买 1 张低行权价 + 卖',
            after: '张中间行权价 + 买 1 张高行权价。',
            options: ['2', '1', '3', '4'],
            correct: 0,
            explain: '1-2-1 结构，行权价等距。到期股价恰好停在中间行权价时收益最大。',
          },
          {
            type: 'choice',
            question: '中性收权利金策略（铁鹰、蝶式）最怕什么？',
            options: [
              '时间流逝',
              '单边大行情突破区间',
              '波动率下降',
              '成交量太大',
            ],
            correct: 1,
            explain: '它们赚的是「什么都不发生」的钱：一旦股价大幅突破卖出的行权价，就会触及最大亏损。',
          },
          {
            type: 'choice',
            question: '铁鹰收到净权利金 $2，两侧翼宽都是 $5，最大亏损是？',
            options: ['$2', '$3', '$5', '$7'],
            correct: 1,
            explain: '最大亏损 = 翼宽 $5 - 净权利金 $2 = $3/股。风险收益比约 3:2，靠胜率取胜。',
          },
          {
            type: 'match',
            prompt: '把策略和市场观点配对',
            pairs: [
              ['Bull Call Spread', '温和看涨'],
              ['Long Straddle', '大波动、方向不明'],
              ['Iron Condor', '区间横盘'],
              ['Butterfly', '精确停在目标价'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'u8',
    title: '第 8 单元 · 实战与风控',
    subtitle: '行权指派、流动性与仓位管理',
    color: '#2b70c9',
    colorDark: '#1f57a0',
    icon: '🎯',
    lessons: [
      {
        id: 'u8l1',
        title: '行权、指派与结算',
        tips: [
          '美式期权可在到期前任意交易日行权；欧式期权只能在到期日行权。美股个股期权是美式，指数期权（如 SPX）多为欧式。',
          '行权（Exercise）是买方的动作；指派（Assignment）是卖方被抽中履约。',
          '实物交割：真实买卖 100 股股票；现金结算：只按差价划转现金（多见于指数期权）。',
          '实值 $0.01 以上的期权到期会被自动行权；不想要股票就要在到期前平仓。',
        ],
        exercises: [
          {
            type: 'choice',
            question: '美式期权和欧式期权的核心区别是？',
            options: [
              '交易所所在地不同',
              '美式可在到期前任意交易日行权，欧式只能到期日行权',
              '美式只能交易美股',
              '欧式没有卖方',
            ],
            correct: 1,
            explain: '名字与地理无关，只关乎行权时点。美股个股期权是美式，SPX 等指数期权多为欧式。',
          },
          {
            type: 'fill',
            before: '期权卖方被要求履约的过程叫做',
            after: '。',
            options: ['指派（Assignment）', '行权（Exercise）', '展期（Roll）', '除权'],
            correct: 0,
            explain: '买方行权后，清算机构随机抽取卖方履约——被抽中就是「被指派」。',
          },
          {
            type: 'tf',
            statement: '到期时实值 $0.01 以上的股票期权通常会被自动行权。',
            answer: true,
            explain: '正确。这是清算机构的默认规则。忘了平仓的实值 Call 会让你周一账户里多出 100 股（和一大笔扣款）。',
          },
          {
            type: 'choice',
            question: 'SPX 指数期权的结算方式是？',
            options: ['交割 100 股 SPX 股票', '现金结算差价', '交割黄金', '自动展期'],
            correct: 1,
            explain: '指数没有「股票」可交割，SPX 期权按结算价与行权价的差额现金划转。',
          },
          {
            type: 'tf',
            statement: '卖方只有到期日才可能被指派。',
            answer: false,
            explain: '错误。美式期权的卖方随时可能被提前指派，尤其是深度实值、临近除息日的 Call。',
          },
          {
            type: 'match',
            prompt: '把术语和含义配对',
            pairs: [
              ['行权', '买方行使权利'],
              ['指派', '卖方被抽中履约'],
              ['实物交割', '真实买卖 100 股'],
              ['现金结算', '只划转差价现金'],
            ],
          },
        ],
      },
      {
        id: 'u8l2',
        title: '流动性与下单',
        tips: [
          '买卖价差（Bid-Ask Spread）是隐形成本：价差 $0.50 意味着一进一出就亏 $50/张。',
          '成交量（Volume）看当天活跃度，未平仓合约数（Open Interest）看存量筹码——两者都高才算流动性好。',
          '期权下单永远用限价单（Limit Order），从中间价开始报价；市价单可能被极差的价格成交。',
          '优先选择标的成交活跃、行权价靠近平值、到期日常规的合约，流动性最好。',
        ],
        exercises: [
          {
            type: 'choice',
            question: '衡量期权流动性时，Open Interest（未平仓合约数）表示什么？',
            options: [
              '当天的成交笔数',
              '市场上尚未平仓的合约总量',
              '做市商的库存',
              '交易所的持仓上限',
            ],
            correct: 1,
            explain: 'OI 是存量概念：所有未了结的合约数。OI 高说明这个行权价上有活跃的市场。',
          },
          {
            type: 'tf',
            statement: '交易期权时应该默认使用限价单而不是市价单。',
            answer: true,
            explain: '正确。期权盘口可能很宽，市价单可能在离谱的价格成交。从中间价附近报限价、逐步调整。',
          },
          {
            type: 'fill',
            before: '买价 $2.00、卖价 $2.50 的期权，一买一卖立即损失的隐形成本约为每股',
            after: '。',
            options: ['$0.50', '$2.00', '$4.50', '$0.05'],
            correct: 0,
            explain: '按卖价买入、按买价卖出，一个来回损失整个价差 $0.50（每张合约 $50）——流动性差的合约成本惊人。',
          },
          {
            type: 'choice',
            question: '以下哪个合约的流动性大概率最好？',
            options: [
              '冷门小盘股的深度虚值远月期权',
              '大盘明星股的平值近月期权',
              '刚上市公司的长期期权',
              '任意行权价的期权都一样',
            ],
            correct: 1,
            explain: '活跃标的 + 平值附近 + 常规到期日 = 盘口最窄、进出最容易。',
          },
          {
            type: 'tf',
            statement: '成交量高的合约，未平仓合约数一定也高。',
            answer: false,
            explain: '错误。Volume 是当天流量，OI 是存量。某天突发消息可能带来巨量成交，但 OI 未必大——两者要分开看。',
          },
          {
            type: 'choice',
            question: '限价单应该从哪里开始报价比较合理？',
            options: ['直接按卖价追', '从买卖价差的中间价附近开始', '报 $0.01 碰运气', '比卖价高 10%'],
            correct: 1,
            explain: '中间价是公允起点，成交不了再小步让价——比无脑吃单省下可观的价差成本。',
          },
        ],
      },
      {
        id: 'u8l3',
        title: '仓位管理与常见错误',
        tips: [
          '单笔期权仓位建议控制在账户的 1%~5%：期权可以归零，仓位就是生命线。',
          '买期权给自己留时间：到期日选得比预期兑现时间更远，避免「方向对了时间不够」。',
          '新手四大坑：满仓末日期权、财报前追高 IV、裸卖期权、流动性差的合约。',
          '每笔交易前写下：观点、策略、最大亏损、退出计划——没有退出计划就没有交易。',
        ],
        exercises: [
          {
            type: 'choice',
            question: '对多数交易者，单笔期权买入仓位占账户的合理比例是？',
            options: ['50% 以上', '20%~40%', '1%~5%', '必须满仓'],
            correct: 2,
            explain: '买入的期权可能 100% 归零。小仓位让你在判断错误时还能活着参加下一局。',
          },
          {
            type: 'tf',
            statement: '因为末日期权（0DTE）便宜、杠杆大，适合作为新手的主要工具。',
            answer: false,
            explain: '错误。0DTE 的 Gamma 和 Theta 都极端，几小时内可以归零，是最接近抛硬币的期权玩法。',
          },
          {
            type: 'choice',
            question: '预期利好一个月后兑现，买期权时到期日怎么选更稳妥？',
            options: [
              '选本周到期，最便宜',
              '选两三个月后到期，给判断留出缓冲时间',
              '随便选，到期日不重要',
              '选五年后的长期期权',
            ],
            correct: 1,
            explain: '事件可能推迟、发酵需要时间。到期日留出缓冲，才不会「方向对了却死在黎明前」。',
          },
          {
            type: 'fill',
            before: '每笔交易前应写下观点、策略、最大亏损和',
            after: '。',
            options: ['退出计划', '幸运数字', '目标涨停板', '别人的持仓'],
            correct: 0,
            explain: '进场前就定好止盈止损和时间止损。情绪来临时，纪律是唯一的护栏。',
          },
          {
            type: 'choice',
            question: '下列哪种行为的风险最高？',
            options: [
              '用 2% 仓位买入三个月后到期的平值 Call',
              '持股卖出备兑 Call',
              '在没有对冲的情况下裸卖虚值 Call',
              '预留现金卖出 Put',
            ],
            correct: 2,
            explain: '裸卖 Call 的理论亏损无限，一次极端逼空就可能击穿账户——其余三种的风险都有边界。',
          },
          {
            type: 'match',
            prompt: '把常见错误和后果配对',
            pairs: [
              ['满仓末日期权', '几小时内可能全部归零'],
              ['财报前追高 IV', '被 IV Crush 双杀'],
              ['裸卖 Call', '暴涨时亏损无限'],
              ['交易冷门合约', '被宽价差吃掉利润'],
            ],
          },
        ],
      },
    ],
  },
];

export const totalLessons = optionsCourse.reduce((n, u) => n + u.lessons.length, 0);

export function findLesson(lessonId: string): { unit: Unit; lesson: Lesson; index: number } | null {
  for (const unit of optionsCourse) {
    const index = unit.lessons.findIndex((l) => l.id === lessonId);
    if (index !== -1) return { unit, lesson: unit.lessons[index], index };
  }
  return null;
}

/** 课程内所有课的线性顺序，用于解锁判断 */
export const lessonOrder: string[] = optionsCourse.flatMap((u) => u.lessons.map((l) => l.id));
