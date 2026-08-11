/**
 * 每日一案 — 真实历史案例库（先判断，后解释）
 * 规则：全部为已发生的历史事件，数字为公开报道的近似值；教育用途，非投资建议。
 * 案例按日期轮换：每天全站同一案例。
 */

export interface BiText {
  zh: string;
  en: string;
}

export interface CaseDecision {
  q: BiText;
  options: BiText[];
  correct: number;
  explain: BiText;
}

export interface InvestCase {
  id: string;
  /** 事件时间，如 '2022-10' */
  date: string;
  tag: 'earnings' | 'macro' | 'industry' | 'narrative';
  title: BiText;
  /** 背景卡：当时已知的数据与叙事（判断前展示，不含结果） */
  background: BiText[];
  decisions: CaseDecision[];
  outcome: BiText;
  lesson: BiText;
}

export const TAG_LABEL: Record<InvestCase['tag'], BiText> = {
  earnings: { zh: '财报反应', en: 'Earnings reaction' },
  macro: { zh: '宏观事件', en: 'Macro event' },
  industry: { zh: '行业拐点', en: 'Industry turn' },
  narrative: { zh: '叙事与情绪', en: 'Narrative & sentiment' },
};

export const INVEST_CASES: InvestCase[] = [
  {
    id: 'meta-2022q3',
    date: '2022-10',
    tag: 'earnings',
    title: { zh: 'Meta 2022Q3：收入只降 4%，股价为何暴跌 25%？', en: 'Meta Q3 2022: revenue -4%, so why -25%?' },
    background: [
      { zh: '2022 年 10 月，Meta 发布三季报：收入 $277 亿，同比 -4%，只是轻微下滑。', en: 'Oct 2022: Meta reports Q3 revenue of $27.7B, down just 4% YoY.' },
      { zh: '元宇宙部门 Reality Labs 单季亏损 $37 亿，且管理层表示投入还会加大。', en: 'Reality Labs loses $3.7B in the quarter; management says spending will rise further.' },
      { zh: '资本开支指引上调至每年 $340-390 亿；同时 TikTok 正抢走年轻用户时长。', en: 'Capex guidance is raised to $34–39B a year while TikTok keeps taking younger users’ time.' },
      { zh: '财报前股价已从高点跌去约 60%。', en: 'The stock had already fallen ~60% from its high before the print.' },
    ],
    decisions: [
      {
        q: { zh: '收入只降了 4%，你判断市场第二天的主要情绪是什么？', en: 'Revenue only fell 4%. What do you judge the market’s dominant reaction will be?' },
        options: [
          { zh: '松一口气：广告只是轻微下滑，利空出尽', en: 'Relief: ads barely fell, bad news priced in' },
          { zh: '恐慌：收入不是重点，市场怕的是「管理层不顾股东反对继续烧钱」', en: 'Fear: revenue isn’t the point — the market dreads management burning cash over shareholder objections' },
          { zh: '无反应：数据符合预期', en: 'No reaction: numbers in line' },
        ],
        correct: 1,
        explain: {
          zh: '次日 Meta 大跌约 25%。市场定价的不是本季收入，而是「支出失控 + 看不到尽头」：Reality Labs 亏损扩大、Capex 上调，等于宣告未来几年利润被烧钱计划吃掉。',
          en: 'Meta fell ~25% the next day. The market priced spending, not revenue: bigger Reality Labs losses plus raised capex meant years of profit fed to the burn.',
        },
      },
      {
        q: { zh: '一年后回看，什么信号最可能扭转这类「烧钱恐慌」定价？', en: 'Looking one year ahead, what signal would most likely reverse this "burn panic" pricing?' },
        options: [
          { zh: '收入恢复两位数增长', en: 'Revenue back to double-digit growth' },
          { zh: '管理层明确转向控制成本、裁员、缩减开支——「效率」本身就是催化剂', en: 'Management pivots to cost control, layoffs and lower spend — "efficiency" itself is the catalyst' },
          { zh: '元宇宙用户数达标', en: 'Metaverse user targets are hit' },
        ],
        correct: 1,
        explain: {
          zh: '2023 年扎克伯格宣布「效率之年」：两轮裁员 2 万+人、砍开支，全年股价 +194%。跌是「支出失控」定价，涨也是「支出转向」定价——收入两年里其实变化不大。',
          en: '2023 became Zuckerberg’s "Year of Efficiency": 20k+ layoffs, budget cuts — the stock rose 194% that year. Both the crash and the rally priced spending, not revenue.',
        },
      },
    ],
    outcome: {
      zh: '财报次日 -25%，股价最低见 $88；2023 年宣布效率之年后全年 +194%，2024 年创历史新高。',
      en: 'Down 25% the next day, bottoming near $88; +194% in 2023 after the efficiency pivot, new all-time highs by 2024.',
    },
    lesson: {
      zh: '框架：股价 = 业绩 × 市场对资本配置的信任。收入平稳但管理层烧钱失控时，杀的是信任；信任修复（哪怕收入没变）就是最大的反转催化剂。',
      en: 'Framework: price = results × trust in capital allocation. When spending runs wild, trust is what dies — and restoring it (even with flat revenue) is the biggest catalyst.',
    },
  },
  {
    id: 'nvda-2023q1',
    date: '2023-05',
    tag: 'earnings',
    title: { zh: '英伟达 2023 年 5 月：一份指引一夜加了 $2000 亿市值', en: 'Nvidia, May 2023: one guidance line adds $200B overnight' },
    background: [
      { zh: '2023 年 5 月 24 日盘后，英伟达发布财报：当季收入 $71.9 亿，符合预期。', en: 'After hours May 24, 2023: Nvidia reports $7.19B revenue, roughly in line.' },
      { zh: '但下季度收入指引给到 $110 亿 ±2%——而华尔街预期只有约 $72 亿。', en: 'But next-quarter guidance comes in at $11B ±2% versus a Street estimate of ~$7.2B.' },
      { zh: '差距高达 53%，历史罕见。管理层解释：数据中心 GPU 需求「远超供给」。', en: 'A 53% beat on guidance — nearly unheard of. Management: data-center GPU demand "far exceeds supply".' },
    ],
    decisions: [
      {
        q: { zh: '当季收入只是符合预期。你判断股价盘后反应是？', en: 'The quarter itself was merely in line. Your call on the after-hours move?' },
        options: [
          { zh: '小涨：财报中规中矩', en: 'Slightly up: an okay print' },
          { zh: '暴涨：市场交易的是未来——指引超预期 53% 意味着 AI 需求是真实爆发', en: 'Surge: markets trade the future — a 53% guidance beat means AI demand is genuinely exploding' },
          { zh: '下跌：估值已高，利好兑现', en: 'Down: valuation too rich, sell the news' },
        ],
        correct: 1,
        explain: {
          zh: '盘后 +24%+，次日市值逼近 $1 万亿。财报是后视镜，指引是挡风玻璃：当挡风玻璃里的画面和所有人的预期差 53%，重定价瞬间发生。',
          en: 'Up 24%+ after hours; market cap neared $1T next day. Reports are the rearview mirror, guidance the windshield — a 53% gap repriced everything instantly.',
        },
      },
      {
        q: { zh: '看到这种「需求远超供给」的信号，顺着产业链找确定性，下一个查证对象是谁？', en: 'Given "demand far exceeds supply", where do you verify next along the chain?' },
        options: [
          { zh: '其他芯片设计公司会不会也涨', en: 'Whether other chip designers rally too' },
          { zh: '上游产能瓶颈方：台积电先进封装（CoWoS）、HBM 内存（SK 海力士）——订单和扩产是需求的实证', en: 'Upstream bottlenecks: TSMC advanced packaging (CoWoS), HBM memory (SK Hynix) — their orders and expansion prove the demand' },
          { zh: '英伟达的竞争对手 AMD', en: 'Nvidia’s competitor AMD' },
        ],
        correct: 1,
        explain: {
          zh: '需求是否真实，问收钱的上游最准。此后两年台积电 CoWoS 产能翻数倍、HBM 长期售罄——产业链交叉验证了叙事，这正是 L5「产业专题」要练的因果图。',
          en: 'Verify demand where the money lands. CoWoS capacity multiplied and HBM sold out for years — the supply chain corroborated the story. That cross-check is the causal-map skill.',
        },
      },
    ],
    outcome: {
      zh: '盘后 +24%，一周内市值突破 $1 万亿；此后八个季度数据中心收入从 $43 亿/季涨至 $300 亿+/季。',
      en: '+24% after hours, $1T market cap within a week; data-center revenue went from $4.3B to $30B+ per quarter over the next eight quarters.',
    },
    lesson: {
      zh: '框架：市场交易预期差，而指引是预期差最浓缩的载体。「符合预期的现在 + 颠覆预期的未来」= 暴力重定价。',
      en: 'Framework: markets trade the expectations gap, and guidance is its most concentrated carrier. In-line present + shattered future = violent repricing.',
    },
  },
  {
    id: 'nflx-2022q1',
    date: '2022-04',
    tag: 'earnings',
    title: { zh: 'Netflix 2022Q1：20 万订户，杀掉 35% 市值', en: 'Netflix Q1 2022: 200k subscribers erase 35% of the company' },
    background: [
      { zh: '2022 年 4 月，Netflix 财报：单季订户净减少 20 万——十年来首次负增长。', en: 'April 2022: Netflix reports a net loss of 200k subscribers — first decline in a decade.' },
      { zh: '而且指引下季度还要再减 200 万。收入和利润本身并不差。', en: 'Worse: guidance calls for another 2M loss next quarter. Revenue and profit themselves were fine.' },
      { zh: '此前 Netflix 的估值一直按「高成长股」给：市场为持续的订户增长付高倍数。', en: 'Netflix had long been valued as a growth stock — the multiple paid for endless subscriber growth.' },
    ],
    decisions: [
      {
        q: { zh: '总订户 2.2 亿，只少了 20 万（不到 0.1%）。为什么你判断这可能是重大利空？', en: 'Out of 220M subscribers, only 200k gone (<0.1%). Why might this still be devastating?' },
        options: [
          { zh: '不是利空，比例太小', en: 'It isn’t — the percentage is trivial' },
          { zh: '因为它打断的是「故事」：增长股的估值建立在增长不停上，方向从 + 变 − 意味着整套估值逻辑要换', en: 'Because it breaks the story: a growth multiple rests on growth continuing — a sign flip from + to − forces a whole new valuation regime' },
          { zh: '因为财务造假嫌疑', en: 'Because it hints at fraud' },
        ],
        correct: 1,
        explain: {
          zh: '次日 -35%，两日市值蒸发超 $500 亿。增长股最贵的资产是「增长叙事」本身；数字很小，但它证伪了故事——估值从成长股倍数切换到成熟公司倍数，一天完成。',
          en: '-35% the next day, $50B+ gone in two sessions. A growth stock’s dearest asset is the growth narrative; the number was tiny but it falsified the story — the multiple switched regimes in a day.',
        },
      },
      {
        q: { zh: '之后 18 个月，Netflix 股价涨回了大部分跌幅。哪个动作最可能是反转主因？', en: 'Within 18 months Netflix recovered most of the fall. Which move most likely drove it?' },
        options: [
          { zh: '订户自然回升', en: 'Subscribers naturally came back' },
          { zh: '打击共享账号 + 推出广告套餐：把「白嫖用户」变成了新的付费与广告收入池', en: 'Password-sharing crackdown + ad tier: converting freeloaders into new paid and ad revenue' },
          { zh: '大幅裁员', en: 'Mass layoffs' },
        ],
        correct: 1,
        explain: {
          zh: '2023 年打击共享账号后订户重新大增（单季 +800 万级），广告层打开第二收入曲线。反转来自商业模式动作，不是等待。',
          en: 'The 2023 crackdown reignited adds (8M+ per quarter) and the ad tier opened a second revenue curve. The reversal came from business-model action, not waiting.',
        },
      },
    ],
    outcome: {
      zh: '财报次日 -35%，最低跌至 $162；打击共享账号 + 广告层后，2023-2024 涨回并创新高。',
      en: '-35% next day, bottoming near $162; after the crackdown and ad tier, the stock recovered and made new highs through 2023–24.',
    },
    lesson: {
      zh: '框架：对成长股，边际变化 > 绝对数字。第一个负号杀的是叙事而不是收入；而能重启叙事的，是商业模式的主动进化。',
      en: 'Framework: for growth stocks, marginal change beats absolute numbers. The first minus sign kills the narrative, not the revenue — and only model evolution restarts it.',
    },
  },
  {
    id: 'fed-2022-june',
    date: '2022-06',
    tag: 'macro',
    title: { zh: '2022 年 6 月：CPI 8.6%，联储怎么办？', en: 'June 2022: CPI at 8.6% — what does the Fed do?' },
    background: [
      { zh: '2022 年 6 月 10 日，美国 5 月 CPI 公布：同比 8.6%，不降反升，创 40 年新高。', en: 'June 10, 2022: May CPI prints 8.6% YoY — re-accelerating, a 40-year high.' },
      { zh: '此前市场普遍预期「通胀已见顶」，联储已按 50bp 节奏加息。', en: 'The consensus had been "inflation has peaked", with the Fed hiking in 50bp steps.' },
      { zh: '下周就是联储议息会议。', en: 'The FOMC meets the following week.' },
    ],
    decisions: [
      {
        q: { zh: '通胀证伪了「见顶」预期。你判断联储下周的动作和市场反应？', en: 'Inflation just falsified the "peak" thesis. Your call on the Fed’s move and the market’s reaction?' },
        options: [
          { zh: '维持 50bp：按既定路线走，市场平静', en: 'Stick to 50bp: stay the course, markets calm' },
          { zh: '升级到 75bp：数据逼联储加速，加息预期全线上修，股债齐跌', en: 'Escalate to 75bp: the data forces acceleration; the whole hike path reprices up, stocks and bonds fall together' },
          { zh: '暂停加息观察', en: 'Pause and observe' },
        ],
        correct: 1,
        explain: {
          zh: '联储加了 75bp——1994 年以来首次，且随后连续四次 75bp。CPI 公布当天标普 -2.9%，随后一周再跌 6%。宏观交易的核心：数据改变的是「未来路径」的定价。',
          en: 'The Fed hiked 75bp — first since 1994, then four in a row. The S&P fell 2.9% on CPI day and ~6% more that week. Macro trading is the repricing of the future path.',
        },
      },
      {
        q: { zh: '在「加息路径上修」的一周里，哪类资产跌得最狠？', en: 'In a week when the hike path reprices upward, which assets fall hardest?' },
        options: [
          { zh: '短期国债', en: 'Short-term Treasuries' },
          { zh: '当下就有大量现金流的能源股', en: 'Energy stocks gushing current cash flow' },
          { zh: '利润在遥远未来的亏损成长股与加密资产——久期最长，利率最敏感', en: 'Profitless growth stocks and crypto — the longest duration, most rate-sensitive assets' },
        ],
        correct: 2,
        explain: {
          zh: '那一周 ARKK 类资产与比特币领跌（比特币当月 -37%）。加息周期里先分层：现金流的「远近」决定挨打的顺序。',
          en: 'ARKK-style names and Bitcoin led the declines (BTC -37% that month). In hiking cycles, sort by cash-flow distance — it sets the order of pain.',
        },
      },
    ],
    outcome: {
      zh: '6 月 15 日联储加息 75bp；标普 500 于 6 月中旬跌入技术性熊市（较高点 -23.6%）。年末利率升至 4.25-4.5%。',
      en: 'The Fed hiked 75bp on June 15; the S&P entered a bear market mid-June (-23.6% from the high). Rates ended the year at 4.25–4.5%.',
    },
    lesson: {
      zh: '框架：单个宏观数据的意义 = 它对政策路径的修正量。读宏观新闻永远问：这个数字让央行「下一步」变成了什么？',
      en: 'Framework: a macro print matters exactly as much as it revises the policy path. Always ask: what does this number make the central bank do next?',
    },
  },
  {
    id: 'svb-2023',
    date: '2023-03',
    tag: 'macro',
    title: { zh: '硅谷银行 48 小时：利率如何杀死一家银行', en: 'SVB’s 48 hours: how interest rates kill a bank' },
    background: [
      { zh: '2023 年 3 月 8 日，硅谷银行（SVB）宣布：亏本抛售 $210 亿债券组合，并寻求增发补血。', en: 'March 8, 2023: SVB announces a $21B bond sale at a loss plus an equity raise to plug the hole.' },
      { zh: '背景：SVB 在零利率时代把存款大量买入长期国债和 MBS；2022 年利率暴涨后，这些债券市值巨亏（未实现亏损一度超 $150 亿）。', en: 'Context: SVB parked deposits in long-dated Treasuries and MBS during zero rates; the 2022 rate shock left $15B+ of unrealized losses.' },
      { zh: '储户高度集中：几乎全是硅谷创投圈的公司账户，消息在创投群里光速传播。', en: 'Depositors were concentrated: startup accounts wired into the same VC group chats, where news travels at light speed.' },
    ],
    decisions: [
      {
        q: { zh: '「亏本卖债 + 急着增发」这组信号，你的第一反应判断是？', en: 'Selling bonds at a loss while scrambling to raise equity — your first-order read?' },
        options: [
          { zh: '正常的资产负债管理，无需担心', en: 'Routine balance-sheet management, nothing to see' },
          { zh: '银行在承认「浮亏已经兜不住」——对依赖信心的银行，自曝缺钱本身就可能引发挤兑', en: 'The bank is admitting the paper losses are now real — and for a confidence business, announcing a hole can itself start the run' },
          { zh: '利好：卖债回笼了流动性', en: 'Bullish: the sale raises liquidity' },
        ],
        correct: 1,
        explain: {
          zh: '次日储户试图提取 $420 亿，3 月 10 日监管接管——从公告到倒闭不足 48 小时。银行的资产是别人的信心；承认窟窿的那一刻，挤兑就有了自我实现的引信。',
          en: 'Depositors tried to pull $42B the next day; regulators seized SVB on March 10 — under 48 hours from press release to failure. A bank’s asset is confidence; admitting the hole lights the self-fulfilling fuse.',
        },
      },
      {
        q: { zh: '把这个案例装进框架：SVB 的根因和 2022 年成长股暴跌的根因，是同一个吗？', en: 'Framework check: is SVB’s root cause the same as the 2022 growth-stock crash?' },
        options: [
          { zh: '不同：一个是银行经营问题，一个是股票估值问题', en: 'Different: one is bank management, the other equity valuation' },
          { zh: '相同：都是「长久期资产 × 利率急升」——远期现金流（债券/未来利润）在加息中重挫，只是表现形式不同', en: 'Same: long-duration assets × surging rates — distant cash flows (bonds / future profits) got crushed, just in different costumes' },
          { zh: '完全无关', en: 'Unrelated' },
        ],
        correct: 1,
        explain: {
          zh: '这就是框架的价值：SVB 的长债、ARKK 的远期利润，本质都是「很久以后的钱」。利率是同一只手，按倒了两个看似无关的领域。',
          en: 'This is why frameworks pay: SVB’s long bonds and ARKK’s distant profits are both "money far in the future". One rate shock, two seemingly unrelated victims.',
        },
      },
    ],
    outcome: {
      zh: '3 月 10 日 SVB 被 FDIC 接管，为 2008 年后美国第二大银行倒闭；随后签名银行倒闭、瑞信被瑞银收购，监管紧急推出 BTFP 工具止血。',
      en: 'SVB was seized March 10 — the second-largest US bank failure since 2008. Signature Bank followed, Credit Suisse was absorbed by UBS, and the Fed rushed out the BTFP backstop.',
    },
    lesson: {
      zh: '框架：利率风险藏在所有「久期长」的地方——债券、成长股、银行资产负债表。识别同一根因的不同马甲，是宏观判断力的核心。',
      en: 'Framework: rate risk hides wherever duration is long — bonds, growth stocks, bank balance sheets. Spotting one root cause in different costumes is the heart of macro judgment.',
    },
  },
  {
    id: 'gme-2021',
    date: '2021-01',
    tag: 'narrative',
    title: { zh: 'GameStop 2021：当仓位结构压过基本面', en: 'GameStop 2021: when positioning beats fundamentals' },
    background: [
      { zh: '2021 年 1 月，游戏零售商 GameStop 基本面平平：线下门店萎缩、连年亏损。', en: 'January 2021: GameStop’s fundamentals are grim — shrinking stores, recurring losses.' },
      { zh: '但空头仓位极端：做空股数一度超过流通股的 100%。', en: 'But the short position is extreme: short interest exceeds 100% of the float.' },
      { zh: 'Reddit 散户开始协同买入股票和看涨期权，1 月中股价从 $20 拉到 $40+。', en: 'Reddit retail coordinates buying of shares and calls; by mid-January the stock doubles from $20 to $40+.' },
    ],
    decisions: [
      {
        q: { zh: '基本面很差 + 做空超过 100% 流通股 + 散户协同买入。这个组合接下来最可能发生什么？', en: 'Bad fundamentals + >100% short interest + coordinated retail buying. What happens next?' },
        options: [
          { zh: '股价回归基本面，缓慢阴跌', en: 'Price drifts back down to fundamentals' },
          { zh: '轧空正反馈：股价越涨，空头越被迫买入平仓，买入又推高股价——短期内价格可以完全脱离基本面', en: 'A short-squeeze feedback loop: rising prices force shorts to buy back, pushing prices higher still — decoupling from fundamentals entirely in the short run' },
          { zh: '监管立刻停牌', en: 'Immediate trading halt by regulators' },
        ],
        correct: 1,
        explain: {
          zh: '1 月末 GME 一度冲到 $483（两周 +2300%），做空机构 Melvin Capital 巨亏关停。当仓位结构极端时，价格的短期驱动力是「谁被迫交易」，不是「公司值多少」。',
          en: 'GME touched $483 (+2300% in two weeks); Melvin Capital blew up. With extreme positioning, short-term price is driven by who is forced to trade, not what the firm is worth.',
        },
      },
      {
        q: { zh: '这个案例对「基本面研究者」的正确启示是？', en: 'The right takeaway for a fundamentals-driven investor?' },
        options: [
          { zh: '基本面分析没用了', en: 'Fundamental analysis is dead' },
          { zh: '区分时间尺度：短期价格可被仓位与情绪主宰，长期仍回归现金流——两年后 GME 跌回 $20 以下（拆股调整后）', en: 'Separate time horizons: positioning and emotion can rule the short run, cash flow rules the long run — GME fell back below $20 (split-adjusted) within two years' },
          { zh: '以后只跟着散户情绪买', en: 'Just follow retail sentiment from now on' },
        ],
        correct: 1,
        explain: {
          zh: '暴涨没有改变公司赚钱能力，狂欢后股价长期回落。框架里要给「仓位与情绪」留一个短期解释槽，但别把它当成长期定价。',
          en: 'The squeeze never changed the earning power, and the price bled back for years after. Give positioning a short-term slot in your framework — never long-term pricing power.',
        },
      },
    ],
    outcome: {
      zh: '1 月 28 日盘中 $483 见顶；多家券商限制买入引发争议；此后两年股价（拆股调整）跌回 $20 下方。',
      en: 'Peaked intraday at $483 on Jan 28; broker buying restrictions sparked controversy; within two years the (split-adjusted) price was back under $20.',
    },
    lesson: {
      zh: '框架：价格 = 基本面 × 仓位结构 × 情绪，三者的权重随时间尺度变化。极端仓位是短期最强变量，现金流是长期唯一变量。',
      en: 'Framework: price = fundamentals × positioning × sentiment, with weights that shift by horizon. Extreme positioning dominates the short run; cash flow is all that survives the long run.',
    },
  },
  {
    id: 'tsla-sp500-2020',
    date: '2020-11',
    tag: 'narrative',
    title: { zh: '特斯拉入指 2020：一条"技术性"新闻值多少钱？', en: 'Tesla joins the S&P, 2020: what is a "technical" headline worth?' },
    background: [
      { zh: '2020 年 11 月 16 日盘后，标普宣布特斯拉将于 12 月 21 日纳入标普 500 指数。', en: 'After the close on Nov 16, 2020, S&P announces Tesla will join the S&P 500 on Dec 21.' },
      { zh: '这不改变特斯拉的任何基本面：还是同样的工厂、同样的车、同样的利润。', en: 'Nothing about Tesla’s fundamentals changes: same factories, same cars, same profits.' },
      { zh: '但所有跟踪标普 500 的指数基金（管理资产数万亿美元）将被迫在纳入日前后买入特斯拉。', en: 'But every S&P 500 index fund — trillions under management — must buy Tesla around the inclusion date.' },
    ],
    decisions: [
      {
        q: { zh: '基本面没有任何变化。你判断这条新闻对股价的影响是？', en: 'Fundamentals are untouched. Your judgment on the price impact?' },
        options: [
          { zh: '几乎没有：指数调整是技术性事件', en: 'Minimal: index changes are technical noise' },
          { zh: '显著上涨：数万亿被动资金的强制买盘是真实的需求冲击，市场还会提前抢跑', en: 'A big rally: trillions of forced passive buying is a real demand shock — and traders will front-run it' },
          { zh: '下跌：利好兑现', en: 'Down: sell the news' },
        ],
        correct: 1,
        explain: {
          zh: '公告日到纳入日，特斯拉涨约 70%，纳入当周成交创纪录。当买入是「被迫的、可预期的」，聪明钱会提前定价——供需本身就是基本面的一种。',
          en: 'Tesla rose ~70% between announcement and inclusion, with record volume that week. When buying is forced and foreseeable, it gets priced early — flows are fundamentals too.',
        },
      },
      {
        q: { zh: '这个机制反过来用：一家公司被剔除出大指数时，短期最可能发生什么？', en: 'Run the mechanism in reverse: a company gets deleted from a major index. Short-term effect?' },
        options: [
          { zh: '无影响', en: 'Nothing' },
          { zh: '被动资金强制卖出造成短期超跌——有时反而给主动投资者制造错价机会', en: 'Forced passive selling causes short-term overshoot down — sometimes creating mispricing for active buyers' },
          { zh: '公司会退市', en: 'The company gets delisted' },
        ],
        correct: 1,
        explain: {
          zh: '剔除日的抛压与公司价值无关，纯粹是规则驱动。研究表明剔除后的超跌常在数月内部分修复——理解「谁在被迫交易」能把噪音变成机会。',
          en: 'Deletion-day selling is rule-driven, not value-driven. Studies show the overshoot often partially mean-reverts within months — knowing who is forced to trade turns noise into opportunity.',
        },
      },
    ],
    outcome: {
      zh: '公告到纳入日股价 +70%，纳入交易日（12/21）成交额创当时个股纪录；特斯拉以约 1.7% 权重入指，为史上最大新增成分股。',
      en: '+70% from announcement to inclusion; Dec 21 set a single-stock volume record. Tesla entered at ~1.7% weight — the largest addition ever at the time.',
    },
    lesson: {
      zh: '框架：资金流动本身可以是短期定价的主导变量。问「谁必须买、谁必须卖、什么时候」，常比问「公司好不好」更能解释接下来两周的价格。',
      en: 'Framework: flows can dominate short-term pricing. "Who must buy, who must sell, and when" often explains the next two weeks better than "is the company good".',
    },
  },
  {
    id: 'covid-2020',
    date: '2020-03',
    tag: 'macro',
    title: { zh: '2020 年 3 月：34% 的暴跌和史上最快的反转', en: 'March 2020: a 34% crash and the fastest reversal ever' },
    background: [
      { zh: '2020 年 2-3 月，新冠疫情全球蔓延，美股 23 个交易日暴跌 34%，四次熔断。', en: 'Feb–Mar 2020: COVID goes global; the S&P falls 34% in 23 sessions with four circuit breakers.' },
      { zh: '3 月 23 日，美联储宣布「无限量 QE」：不设上限购买国债和 MBS，并首次直接购买公司债。', en: 'On March 23 the Fed announces unlimited QE — uncapped Treasury/MBS purchases and, for the first time, corporate bond buying.' },
      { zh: '同时国会通过 $2.2 万亿財政刺激。但疫情本身仍在恶化，封锁范围还在扩大。', en: 'Congress passes $2.2T of fiscal stimulus. Meanwhile the pandemic itself keeps worsening and lockdowns spread.' },
    ],
    decisions: [
      {
        q: { zh: '疫情在恶化，但央行开了无限火力。你判断市场接下来怎么走？', en: 'The pandemic is worsening, but the central bank just went unlimited. Your call on what markets do next?' },
        options: [
          { zh: '继续暴跌：经济数据会越来越差', en: 'Keep crashing: economic data will only get worse' },
          { zh: '见底反转：股市定价的是流动性和预期变化，不是当下的坏消息——「不设上限」改变了整个博弈', en: 'Bottom and reverse: markets price liquidity and expectation change, not today’s bad news — "unlimited" changes the whole game' },
          { zh: '横盘等疫情结束', en: 'Go sideways until the pandemic ends' },
        ],
        correct: 1,
        explain: {
          zh: '3 月 23 日就是本轮最低点。随后失业率冲上 14.7%、GDP 暴跌，股市却一路上涨，全年标普 +16%。市场买的不是今天的经济，是流动性 + 未来的修复路径。',
          en: 'March 23 was the exact bottom. Unemployment then hit 14.7% and GDP cratered — while stocks rallied all year (+16%). Markets bought liquidity and the recovery path, not the present.',
        },
      },
      {
        q: { zh: '「经济最差的时候股市大涨」，这背后的通用机制是？', en: 'Stocks soaring while the economy is at its worst — the general mechanism?' },
        options: [
          { zh: '市场失灵了', en: 'Markets malfunctioned' },
          { zh: '股价 = 预期的贴现：只要「变化率」由更差转向没那么差，加上贴现率被央行压到地板，价格就能领先现实反转', en: 'Prices discount expectations: once the rate of change turns from worse to less-bad — with discount rates floored by the Fed — prices can turn long before reality does' },
          { zh: '散户不理性推动', en: 'Irrational retail flows' },
        ],
        correct: 1,
        explain: {
          zh: '「第二导数」思维：市场对「恶化在减速」的反应如同利好。等经济数据确认好转再入场的人，错过的正是涨幅最大的一段。',
          en: 'Second-derivative thinking: deceleration of the bad news trades like good news. Waiting for data confirmation means missing the steepest leg.',
        },
      },
    ],
    outcome: {
      zh: '3 月 23 日成为最低点，标普此后 12 个月 +75%；2020 全年 +16%，纳指 +43%。',
      en: 'March 23 marked the low; the S&P gained 75% over the next 12 months, finishing 2020 +16% (Nasdaq +43%).',
    },
    lesson: {
      zh: '框架：股市交易的是预期的变化率和流动性，不是新闻的绝对好坏。历史级政策转向出现时，问「博弈结构变了吗」，而不是「新闻吓不吓人」。',
      en: 'Framework: markets trade the rate of change of expectations plus liquidity, not headline severity. At historic policy pivots ask "did the game change?", not "is the news scary?".',
    },
  },
  {
    id: 'amd-intel-2020',
    date: '2020-07',
    tag: 'industry',
    title: { zh: 'AMD vs Intel：一次制程延期改写十年格局', en: 'AMD vs Intel: one process delay rewrites a decade' },
    background: [
      { zh: '2020 年 7 月 23 日，Intel 财报电话会承认：7nm 制程再度延期 6-12 个月，甚至考虑外包生产。', en: 'July 23, 2020: on its earnings call Intel admits 7nm slips another 6–12 months and floats outsourcing production.' },
      { zh: '同期 AMD 已在台积电 7nm 上量产 Ryzen/EPYC 两年，性能反超；台积电 5nm 也已就绪。', en: 'AMD has been shipping 7nm Ryzen/EPYC at TSMC for two years with a performance lead; TSMC’s 5nm is ready.' },
      { zh: 'Intel 当时仍占数据中心 CPU 90%+ 份额，市值约为 AMD 的 4 倍。', en: 'Intel still holds 90%+ of data-center CPU share and is worth ~4× AMD.' },
    ],
    decisions: [
      {
        q: { zh: '份额 90% vs 10%，但技术路线一个掉队一个领先。你更看重哪个变量？', en: '90% vs 10% share, but one roadmap is slipping while the other leads. Which variable matters more?' },
        options: [
          { zh: '现有份额：90% 的江山不可能快速丢', en: 'Current share: 90% dominance cannot erode quickly' },
          { zh: '边际变化：制程决定未来几代产品力，掉队 = 未来份额的持续流失已成定局，市场会立刻开始定价', en: 'The margin: process nodes decide the next generations of product; falling behind locks in future share loss — and markets price it immediately' },
          { zh: '品牌知名度', en: 'Brand recognition' },
        ],
        correct: 1,
        explain: {
          zh: '公告当日 Intel -16%、AMD +17%，一天完成方向定价。此后三年 AMD 服务器份额从个位数升至 25%+，股价数倍于 Intel。存量是过去，边际是未来。',
          en: 'Intel fell 16% and AMD rose 17% that very day. Over three years AMD’s server share went from single digits to 25%+ and the stocks diverged severalfold. Stock is the past; the margin is the future.',
        },
      },
      {
        q: { zh: '同一事件里还有一个隐藏赢家，是谁？', en: 'The same event had a hidden winner. Who?' },
        options: [
          { zh: '英伟达', en: 'Nvidia' },
          { zh: '台积电：Intel 制程失守 = 全行业最先进产能进一步向台积电集中，连 Intel 自己都可能成为客户', en: 'TSMC: Intel’s stumble concentrates leading-edge capacity further at TSMC — even Intel may become a customer' },
          { zh: '高通', en: 'Qualcomm' },
        ],
        correct: 1,
        explain: {
          zh: '台积电当周创历史新高。产业链思维：一个玩家的技术失败，会沿着「谁替它生产、谁抢它客户」两条线重新分配利润。',
          en: 'TSMC hit all-time highs that week. Supply-chain thinking: one player’s failure redistributes profit along two lines — who builds instead, and who takes the customers.',
        },
      },
    ],
    outcome: {
      zh: '公告日 Intel -16%、AMD +17%、台积电创新高；2020-2023 年 AMD 服务器份额升至 25%+，Intel 被迫走上代工转型长路。',
      en: 'On the day: Intel -16%, AMD +17%, TSMC at record highs. By 2023 AMD’s server share topped 25% while Intel began its long foundry pivot.',
    },
    lesson: {
      zh: '框架：产业格局看「技术代差的方向」，不是当前份额。制程/技术路线图的边际变化，是半导体行业最领先的领先指标。',
      en: 'Framework: industry structure follows the direction of the technology gap, not current share. Roadmap slips are semis’ most leading of leading indicators.',
    },
  },
  {
    id: 'saas-derating-2022',
    date: '2022-06',
    tag: 'industry',
    title: { zh: 'SaaS 2022：从 40 倍 P/S 到 6 倍，杀的是什么？', en: 'SaaS 2022: from 40× P/S to 6× — what exactly got killed?' },
    background: [
      { zh: '2021 年顶峰，明星 SaaS 公司普遍按 30-40 倍市销率（P/S）交易，逻辑是「高增长 + 高留存 + 终局垄断」。', en: 'At the 2021 peak, star SaaS names traded at 30–40× sales on the "high growth + retention + endgame monopoly" thesis.' },
      { zh: '2022 年两件事同时发生：利率从 0 升到 4%+；企业缩减 IT 预算，SaaS 收入增速普遍从 60%+ 降到 30% 左右。', en: 'In 2022 two things hit at once: rates went 0→4%+, and IT budgets tightened, slowing typical revenue growth from 60%+ to ~30%.' },
      { zh: 'BVP 云计算指数的平均 P/S 从约 25 倍跌到约 6 倍。', en: 'The BVP cloud index’s average P/S fell from ~25× to ~6×.' },
    ],
    decisions: [
      {
        q: { zh: '一家 SaaS 收入还在增长 30%，股价却跌了 75%。怎么拆解这笔账？', en: 'A SaaS firm still grows revenue 30%, yet the stock is down 75%. Decompose that.' },
        options: [
          { zh: '市场错了，30% 增长值得原来的估值', en: 'The market is wrong; 30% growth deserves the old multiple' },
          { zh: '双杀：估值倍数跌 70%（利率+增速降档）× 增长预期下修——跌幅 ≈ 倍数收缩为主，业绩恶化为辅', en: 'A double derating: the multiple fell ~70% (rates + slower growth) times trimmed forecasts — most of the loss is multiple, not business' },
          { zh: '公司业务崩了', en: 'The business collapsed' },
        ],
        correct: 1,
        explain: {
          zh: '股价 = 倍数 × 业绩。Shopify 2022 年跌 75%，收入其实还在增长——先分清跌的是分子还是倍数，才能判断是机会还是陷阱。',
          en: 'Price = multiple × results. Shopify fell 75% in 2022 with revenue still growing — knowing whether the multiple or the business broke tells you trap or opportunity.',
        },
      },
      {
        q: { zh: '倍数杀完之后，判断哪类 SaaS 会先走出来，最该看哪个指标？', en: 'After the derating, which metric best identifies the SaaS names that recover first?' },
        options: [
          { zh: '员工人数', en: 'Headcount' },
          { zh: '净收入留存率（NRR）+ 自由现金流转正：老客户续费扩容说明产品不可或缺，FCF 证明增长不再靠烧钱', en: 'Net revenue retention (NRR) plus FCF turning positive: expansion from existing customers proves necessity; FCF proves growth without burn' },
          { zh: '广告投放量', en: 'Ad spend' },
        ],
        correct: 1,
        explain: {
          zh: '2023-24 年率先创新高的 SaaS（如 CrowdStrike）共同点正是 NRR 120%+ 且 FCF 转正。行业杀估值后，「谁在赚真钱」成为新的定价标准。',
          en: 'The SaaS names that made new highs first in 2023–24 (e.g. CrowdStrike) shared 120%+ NRR and positive FCF. After a derating, real cash becomes the new pricing standard.',
        },
      },
    ],
    outcome: {
      zh: '2022 年云指数平均 P/S 从 25 倍跌至 6 倍，Shopify/Zoom 等跌 70-85%；2023 年起 FCF 为正、NRR 高的公司率先修复。',
      en: 'Cloud-index P/S fell from ~25× to ~6× in 2022; Shopify/Zoom lost 70–85%. From 2023, cash-generative high-NRR names recovered first.',
    },
    lesson: {
      zh: '框架：任何暴跌先做「倍数 vs 业绩」的归因拆解。倍数杀完后的世界里，定价权交还给自由现金流。',
      en: 'Framework: attribute every crash into multiple vs results first. After the multiple resets, pricing power returns to free cash flow.',
    },
  },
  {
    id: 'costco-premium',
    date: '2023-12',
    tag: 'narrative',
    title: { zh: 'Costco 的 40 倍 P/E：贵，还是值？', en: 'Costco at 40× earnings: expensive, or worth it?' },
    background: [
      { zh: 'Costco 常年以约 40 倍 P/E 交易——几乎两倍于标普 500 平均，也远高于沃尔玛。', en: 'Costco persistently trades near 40× earnings — about twice the S&P average and far above Walmart.' },
      { zh: '它的收入增速其实不高（高个位数），毛利率只有 12%。', en: 'Yet revenue growth is only high-single-digit and gross margin a mere 12%.' },
      { zh: '但会员续费率常年 90%+（北美 92%+），会员费贡献利润大头；同店销售连续多年正增长；2023 年 12 月它宣布派发 $15/股特别股息。', en: 'But renewal rates run 90%+ (92%+ in North America), membership fees drive most of the profit, comps grow year after year — and in Dec 2023 it paid a $15 special dividend.' },
    ],
    decisions: [
      {
        q: { zh: '增长平平、毛利极低，市场却长期给 40 倍。这个溢价最合理的解释是？', en: 'Modest growth, razor-thin margins, yet a durable 40× multiple. Best explanation for the premium?' },
        options: [
          { zh: '市场不理性，早晚会跌回 20 倍', en: 'Irrational — it will revert to 20×' },
          { zh: '确定性溢价：92% 续费率意味着利润像「订阅费」一样可预测，市场为「几乎不会出错的未来」支付高倍数', en: 'A certainty premium: 92% renewals make profit as predictable as a subscription — the market pays up for a future that almost cannot go wrong' },
          { zh: '被动指数基金推的', en: 'Passive index flows' },
        ],
        correct: 1,
        explain: {
          zh: 'P/E 里除了增长，还定价「利润的可靠性」。同样 10% 的增长，可预测性越高，折现风险越低，合理倍数就越高。Costco 是「确定性也是资产」的教科书案例。',
          en: 'P/E prices reliability as well as growth. The same 10% growth deserves a higher multiple when it is nearly certain. Costco is the textbook case that certainty itself is an asset.',
        },
      },
      {
        q: { zh: '如果要给「Costco 溢价崩塌」设一个证伪条件，哪一个最致命？', en: 'If you set one falsification condition for the Costco premium, which is most lethal?' },
        options: [
          { zh: '某个季度收入增速放缓', en: 'A quarter of slower revenue growth' },
          { zh: '会员续费率持续跌破 90%——那说明「订阅式利润」的根基松动了', en: 'Renewal rates persistently breaking below 90% — the foundation of subscription-like profit cracking' },
          { zh: '高管更换', en: 'An executive change' },
        ],
        correct: 1,
        explain: {
          zh: '溢价建立在什么之上，证伪条件就设在什么之上。收入波动是噪音；续费率才是这台机器的主轴。给每个持仓写一句「什么发生我就错了」，是 L4 研究习惯的核心动作。',
          en: 'Set the falsifier on whatever the premium rests on. Revenue wobbles are noise; renewal is the machine’s axle. Writing "if X happens, I am wrong" per holding is the core L4 habit.',
        },
      },
    ],
    outcome: {
      zh: 'Costco 会员续费率维持 92%+，股价 2023 年 +45%、2024 年续创新高——溢价没有回落，反而扩大。',
      en: 'Renewals held above 92%; the stock gained 45% in 2023 and kept making highs in 2024 — the premium widened rather than reverting.',
    },
    lesson: {
      zh: '框架：估值倍数 = 增长 × 确定性。识别「利润的可预测性」并为它定价，是从「看 P/E 高低」到「懂 P/E 为什么」的关键一跃。',
      en: 'Framework: the multiple = growth × certainty. Pricing predictability — not just spotting a high P/E — is the leap from reading multiples to understanding them.',
    },
  },
  {
    id: 'smci-2024',
    date: '2024-08',
    tag: 'narrative',
    title: { zh: 'Super Micro：AI 叙事 14 倍涨幅后的证伪时刻', en: 'Super Micro: the falsification moment after a 14× AI run' },
    background: [
      { zh: '服务器厂商 Super Micro（SMCI）搭上 AI 快车：股价从 2023 年初约 $80 涨到 2024 年 3 月的 $1200，一年多 14 倍，并被纳入标普 500。', en: 'Server maker Super Micro rode the AI wave from ~$80 in early 2023 to $1,200 by March 2024 — 14× in about a year, earning S&P 500 inclusion.' },
      { zh: '2024 年 8 月，做空机构兴登堡发布报告，指控其会计违规；次日 SMCI 宣布推迟提交年报。', en: 'In August 2024 Hindenburg publishes accounting allegations; the next day SMCI delays its annual report filing.' },
      { zh: '此前 SMCI 曾因会计问题在 2020 年被 SEC 处罚过。收入本身仍在高速增长。', en: 'SMCI had been fined by the SEC for accounting issues back in 2020. Revenue, meanwhile, is still growing fast.' },
    ],
    decisions: [
      {
        q: { zh: '收入还在暴增，但「推迟年报 + 有会计前科」。你的风险判断是？', en: 'Revenue is still booming, but the annual report is delayed and there is an accounting rap sheet. Your risk call?' },
        options: [
          { zh: '做空报告都是抹黑，趁跌加仓', en: 'Short reports are smears — buy the dip' },
          { zh: '危险信号叠加：推迟年报意味着审计层面出了问题，叙事股一旦数字可信度崩塌，估值没有锚', en: 'Stacked red flags: a delayed 10-K means audit-level trouble — and when a story stock loses number credibility, the valuation has no anchor' },
          { zh: '等公司澄清再说，期间持仓不动', en: 'Hold and wait for clarification' },
        ],
        correct: 1,
        explain: {
          zh: '10 月，审计机构安永辞任并明确表示「无法信赖管理层陈述」——股价较峰值跌超 80%。审计师辞任是财报可信度的最强负面信号，几乎没有之一。',
          en: 'In October auditor EY resigned, saying it could no longer rely on management’s representations — the stock fell 80%+ from its peak. An auditor walking out is about the strongest credibility red flag that exists.',
        },
      },
      {
        q: { zh: '同期英伟达也是 AI 叙事、涨幅巨大，却没有类似崩塌。区分「真叙事」与「危叙事」的核心检查点是？', en: 'Nvidia rode the same AI narrative with huge gains but no collapse. The core check separating a real story from a fragile one?' },
        options: [
          { zh: '涨幅大小', en: 'Size of the rally' },
          { zh: '利润质量与治理记录：毛利率、现金流是否同步兑现，审计与披露是否干净——叙事要能通过财务体检', en: 'Profit quality and governance: do margins and cash flow confirm the story, and are audit and disclosure clean? A narrative must pass the financial physical' },
          { zh: '媒体报道数量', en: 'Volume of media coverage' },
        ],
        correct: 1,
        explain: {
          zh: '英伟达的叙事有 75% 毛利率和巨额 FCF 背书；SMCI 毛利率只有个位数-低双位数且现金流紧张。同一叙事下，先查谁的数字在自证、谁的数字在打架。',
          en: 'Nvidia’s story was backed by 75% margins and massive FCF; SMCI ran thin margins and tight cash flow. Under one narrative, check whose numbers self-confirm and whose contradict.',
        },
      },
    ],
    outcome: {
      zh: '安永 10 月辞任后股价一度跌破 $20（较 $120 拆股调整峰值 -80%+），被移出纳斯达克 100；后虽补交年报避免退市，信任折价长期存在。',
      en: 'After EY resigned the stock broke below $20 (80%+ off its split-adjusted peak) and left the Nasdaq-100; filings were eventually cured, but the trust discount lingered.',
    },
    lesson: {
      zh: '框架：叙事股的生死线是「数字可信度」。审计异常、推迟披露、前科累累——任何一条出现，先降仓位再研究，因为证伪发生时不会给你从容退出的时间。',
      en: 'Framework: a story stock lives or dies on number credibility. Audit anomalies, delayed filings, prior offenses — any one appears, de-risk first and research after; falsification never leaves polite exit time.',
    },
  },
  {
    id: 'nvda-2018-crypto',
    date: '2018-11',
    tag: 'industry',
    title: { zh: '英伟达 2018：一场「需求错觉」的教训', en: 'Nvidia 2018: a lesson in phantom demand' },
    background: [
      { zh: '2017-2018 年初，加密货币挖矿热潮让英伟达显卡长期断货，收入连续高增长，股价两年涨 10 倍后处于高位。', en: 'Through 2017–early 2018, crypto mining kept Nvidia GPUs sold out; revenue boomed and the stock sat near highs after a 10× two-year run.' },
      { zh: '2018 年下半年加密货币价格崩盘，挖矿需求消失；渠道里积压了大量为矿工准备的显卡库存。', en: 'In late 2018 crypto crashed and mining demand vanished — leaving channels stuffed with GPUs built for miners.' },
      { zh: '11 月财报：英伟达下调指引，承认「挖矿库存需要几个季度消化」。', en: 'November earnings: Nvidia guides down, admitting the crypto inventory "will take a few quarters to digest".' },
    ],
    decisions: [
      {
        q: { zh: '复盘：挖矿热潮期的收入高增长，问题出在哪？', en: 'Post-mortem: what was wrong with the boom-era revenue growth?' },
        options: [
          { zh: '没问题，增长就是增长', en: 'Nothing — growth is growth' },
          { zh: '需求的「质量」不同：投机性挖矿需求随币价开关，不是游戏玩家那种可持续需求——市场却按可持续增长给了估值', en: 'Demand quality differed: speculative mining demand switches off with coin prices, unlike durable gamer demand — yet the market priced it as sustainable growth' },
          { zh: '收入是假的', en: 'The revenue was fake' },
        ],
        correct: 1,
        explain: {
          zh: '指引下调后股价两个月腰斩（$290→$130 区间）。同样一美元收入，来源不同，该给的倍数完全不同。「这增长会不会自己消失」是收入分析的必问题。',
          en: 'The stock halved in two months (~$290→$130) after the guide-down. A dollar of revenue deserves very different multiples depending on its source. "Can this growth switch itself off?" is a mandatory question.',
        },
      },
      {
        q: { zh: '2023 年 AI 需求爆发时，有人担心「这是又一次挖矿式错觉」。哪个证据最能区分两者？', en: 'When AI demand exploded in 2023, some feared "another mining mirage". Which evidence best separates the two?' },
        options: [
          { zh: '股价涨幅更大，所以更危险', en: 'The rally is bigger, so it is more dangerous' },
          { zh: '买家性质：AI 芯片买家是微软/谷歌等现金流巨头，签多年采购合同用于自身核心业务——需求方的资质和用途决定了持续性', en: 'Buyer quality: AI chips are bought by cash-rich giants under multi-year contracts for their core business — the buyer’s balance sheet and use case determine durability' },
          { zh: '没有区别，历史必然重演', en: 'No difference; history must repeat' },
        ],
        correct: 1,
        explain: {
          zh: '矿工是币价的杠杆玩家，云巨头是 $2000 亿 Capex 的信用买家。分析需求可持续性，先看「谁在花钱、花的是谁的钱、用来干什么」。',
          en: 'Miners were leveraged coin-price bets; hyperscalers are creditworthy buyers deploying $200B of capex into core operations. To judge demand durability: who pays, with whose money, for what use.',
        },
      },
    ],
    outcome: {
      zh: '2018 年 10 月-12 月英伟达跌约 54%，用了近两年消化库存并收复失地；这段历史也成为 2023 年 AI 行情中多空双方共同引用的镜子。',
      en: 'Nvidia fell ~54% from Oct to Dec 2018 and took nearly two years to digest inventory and recover — a mirror both bulls and bears cited during the 2023 AI boom.',
    },
    lesson: {
      zh: '框架：给收入「验源」——区分可持续需求与投机性需求。买家是谁、动机是否随价格开关，决定这份增长值多少倍数。',
      en: 'Framework: audit the source of revenue — durable versus speculative demand. Who the buyer is, and whether their motive switches with prices, decides the multiple the growth deserves.',
    },
  },
];

/** 今日案例：按天全站轮换 */
export function todayCaseIndex(): number {
  const dayNumber = Math.floor(Date.now() / 86_400_000);
  return dayNumber % INVEST_CASES.length;
}
