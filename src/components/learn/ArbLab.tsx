'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { awardBadge } from './badges';
import { markDaily } from './daily';
import { sfx } from './sounds';

/**
 * 套利工坊：资金费套利模拟器 + 真实案例剧场
 * 模拟器用教学近似公式（标注清楚），案例配实战操作清单。
 */

const ARB_CASES_KEY = 'options-arb-cases-v1';

type Tone = 'pos' | 'neg' | undefined;

interface ArbStat {
  zh: string;
  en: string;
  value: string;
  tone?: Tone;
}

interface ArbStep {
  zh: string;
  en: string;
  stats: ArbStat[];
}

interface ArbCase {
  id: string;
  emoji: string;
  zh: string;
  en: string;
  steps: ArbStep[];
  lessonZh: string;
  lessonEn: string;
  checklistZh: string[];
  checklistEn: string[];
}

const CASES: ArbCase[] = [
  {
    id: 'trap300', emoji: '🧲', zh: '300% 年化的诱饵', en: 'The 300% APY Bait',
    steps: [
      {
        zh: '某山寨币永续的资金费年化高达 300%！你做空永续 + 买入等量现货，市场每天白给钱——看起来是教科书级的中性套利。',
        en: 'An altcoin perp pays 300% annualized funding! You short the perp, buy spot — free money daily. Textbook neutral carry, right?',
        stats: [
          { zh: '年化费率', en: 'Funding APY', value: '+300%', tone: 'pos' },
          { zh: '组合敞口', en: 'Net exposure', value: '≈0' },
          { zh: 'OI', en: 'Open interest', value: '$40M' },
        ],
      },
      {
        zh: '开仓一周确实每天进账。但有个细节：价格几乎没动，OI 却翻倍了——有人在悄悄对开仓位，舞台正在搭建。',
        en: 'A week in, funding lands daily. One detail: price is flat but OI has doubled — someone is quietly opening offsetting positions. A stage is being built.',
        stats: [
          { zh: '累计资金费', en: 'Funding earned', value: '+5.7%', tone: 'pos' },
          { zh: 'OI（价格未动）', en: 'OI (price flat)', value: '$80M', tone: 'neg' },
          { zh: '你的杠杆', en: 'Your leverage', value: '3x' },
        ],
      },
      {
        zh: '凌晨一根 +40% 插针：空单直接爆仓（或被 ADL 强制平掉）。现货腿还没来得及卖，价格随即瀑布 −60%。两头挨打，净损失远超之前赚的全部资金费。',
        en: 'A 3am wick spikes +40%: your short is liquidated (or force-closed by ADL). Before you can dump the spot leg, price cascades −60%. Hit on both sides — losses dwarf every funding payment collected.',
        stats: [
          { zh: '空头腿', en: 'Short leg', value: '爆仓/ADL', tone: 'neg' },
          { zh: '现货腿', en: 'Spot leg', value: '−60%', tone: 'neg' },
          { zh: '净结果', en: 'Net result', value: '深度亏损', tone: 'neg' },
        ],
      },
    ],
    lessonZh: '教训：极端高费率不是白送的钱，是庄家为你定制的门票。价格不动、OI 暴增 = 舞台已搭好。「中性」组合的生死不在费率，在杠杆和插针承受力。',
    lessonEn: 'Lesson: extreme funding is not free money — it is a ticket priced for you. Flat price + exploding OI means the stage is set. A "neutral" carry lives or dies not on funding but on leverage and wick tolerance.',
    checklistZh: [
      '年化 >100% 先问：为什么这钱轮到我？',
      '开仓前查 OI 与价格的背离，翻倍必警惕',
      '永续腿杠杆 ≤2x，确保能扛 ±50% 插针',
      '小仓位试水一个结算周期再谈加仓',
      '预先写好现货腿的撤退计划（跌破什么价无条件走）',
    ],
    checklistEn: [
      'APY over 100%? First ask: why is this left for me?',
      'Check OI-vs-price divergence before entry; doubling is a red flag',
      'Perp leg leverage ≤2x — survive a ±50% wick',
      'Trial-size one funding cycle before scaling',
      'Pre-write the spot-leg exit plan (the price where you leave, no questions)',
    ],
  },
  {
    id: 'usdc', emoji: '🏦', zh: 'USDC 脱锚的周末', en: "USDC's Depeg Weekend",
    steps: [
      {
        zh: '2023 年 3 月 10 日周五：硅谷银行倒闭，USDC 有 33 亿美元储备困在里面。消息传开，USDC 跌到 $0.94。',
        en: 'Friday, March 10, 2023: Silicon Valley Bank fails with $3.3B of USDC reserves inside. USDC slides to $0.94.',
        stats: [
          { zh: 'USDC', en: 'USDC', value: '$0.94', tone: 'neg' },
          { zh: '受困储备', en: 'Trapped reserves', value: '$3.3B' },
          { zh: '银行', en: 'Banks', value: '周末关门' },
        ],
      },
      {
        zh: '周六恐慌最深处：$0.88。此刻真正的问题不是「会不会回锚」，而是「储备到底还在不在」——银行关门、监管沉默，信息真空里没人知道答案。',
        en: 'Saturday, peak panic: $0.88. The real question is not "will it repeg" but "do the reserves still exist" — banks closed, regulators silent, nobody knows.',
        stats: [
          { zh: 'USDC', en: 'USDC', value: '$0.88', tone: 'neg' },
          { zh: '上行空间', en: 'Upside', value: '+13.6%', tone: 'pos' },
          { zh: '下行空间', en: 'Downside', value: '接近归零?', tone: 'neg' },
        ],
      },
      {
        zh: '周日晚：监管宣布储户全额保障。周一 USDC 回到 $1。在 $0.88 买入的人赚了 13.6%——但要清楚：他们承担的归零风险是真实的，只是这次没有发生。',
        en: 'Sunday night: regulators guarantee all deposits. Monday, USDC is back at $1. The $0.88 buyers made 13.6% — but the zero-risk they carried was real; it just did not happen this time.',
        stats: [
          { zh: 'USDC', en: 'USDC', value: '$1.00', tone: 'pos' },
          { zh: '0.88 买入收益', en: 'Return from $0.88', value: '+13.6%', tone: 'pos' },
          { zh: '事后才知道', en: 'Known only after', value: '储备安全' },
        ],
      },
    ],
    lessonZh: '教训：折价套利的收益 = 你替市场扛下的不确定性。这次是储备真实 + 监管兜底；同样的动作放在 UST 上就是归零。同样的折价，不同的锚，天壤之别。',
    lessonEn: 'Lesson: discount-arbitrage returns are payment for the uncertainty you absorb. This time reserves were real and regulators stepped in; the same move on UST went to zero. Same discount, different anchor, opposite fates.',
    checklistZh: [
      '先查锚定资产：是什么、存在哪、能否赎回',
      '分批建仓，永不一把梭——折价可以更深',
      '预设「锚没了」的剧本：跌到哪认赔离场',
      '周末 / 信息真空时段风险加倍计算',
    ],
    checklistEn: [
      'Check the backing first: what is it, where is it, can it be redeemed',
      'Scale in tranches, never all at once — discounts can deepen',
      'Pre-write the "anchor is gone" script: the level where you take the loss',
      'Double-weight risk during weekends and information vacuums',
    ],
  },
  {
    id: 'ust', emoji: '🕳️', zh: 'UST 死亡螺旋', en: 'The UST Death Spiral',
    steps: [
      {
        zh: 'UST 是算法稳定币：不靠美元储备，靠「1 UST 永远可以换 $1 的 LUNA」这个套利机制维持锚定，另配 Anchor 协议 20% 年化揽储。',
        en: 'UST was an algorithmic stablecoin: no dollar reserves, pegged by an arbitrage loop ("1 UST always redeems $1 of LUNA"), plus Anchor paying 20% APY on deposits.',
        stats: [
          { zh: 'UST', en: 'UST', value: '$1.00' },
          { zh: '锚定方式', en: 'Peg type', value: '算法', tone: 'neg' },
          { zh: '存款年化', en: 'Deposit APY', value: '20%?' },
        ],
      },
      {
        zh: '2022 年 5 月 8 日：UST 脱锚到 $0.985，「套利机会」出现，抄底盘涌入。但注意机制：赎回 UST 会增发 LUNA——卖压被转移给 LUNA，LUNA 下跌，信心崩塌，引发更多赎回。螺旋启动。',
        en: 'May 8, 2022: UST slips to $0.985 — an "arbitrage opportunity". Dip buyers pour in. But redeeming UST mints new LUNA: sell pressure shifts to LUNA, LUNA falls, confidence cracks, more redemptions follow. The spiral is on.',
        stats: [
          { zh: 'UST', en: 'UST', value: '$0.985 → $0.60', tone: 'neg' },
          { zh: 'LUNA 增发', en: 'LUNA minted', value: '天量', tone: 'neg' },
          { zh: '螺旋', en: 'Spiral', value: '已启动', tone: 'neg' },
        ],
      },
      {
        zh: '一周内 UST 归零，LUNA 从 $80 跌到 $0.0001。每一层「折价抄底」的人，都成了下一层抄底者的出口流动性。400 亿美元蒸发。',
        en: 'Within a week UST hit zero and LUNA fell from $80 to $0.0001. Every layer of dip buyers became exit liquidity for the layer above. $40B evaporated.',
        stats: [
          { zh: 'UST', en: 'UST', value: '≈$0', tone: 'neg' },
          { zh: 'LUNA', en: 'LUNA', value: '−99.99%', tone: 'neg' },
          { zh: '抄底者', en: 'Dip buyers', value: '全灭', tone: 'neg' },
        ],
      },
    ],
    lessonZh: '教训：算法稳定币的套利机制本身就是死亡螺旋的引擎——你以为在做套利，其实在给螺旋供血。「迟早回锚」的前提是锚是真实资产。20% 无风险年化说不清来源时，你就是来源。',
    lessonEn: 'Lesson: an algorithmic peg\'s own arbitrage loop is the death-spiral engine — what feels like arbitrage is feeding the spiral. "It always repegs" assumes the anchor is a real asset. When 20% risk-free APY has no explainable source, you are the source.',
    checklistZh: [
      '锚定 = 足额储备还是算法？算法锚不做折价抄底',
      '收益来源三问：谁付钱、为什么付、能付多久',
      '脱锚时先看赎回机制是灭火还是浇油',
      '没有底的东西不抄底',
    ],
    checklistEn: [
      'Peg = full reserves or algorithm? Never buy the dip on an algorithmic peg',
      'Three yield questions: who pays, why, and for how long',
      'On a depeg, check whether redemption douses the fire or feeds it',
      'Never buy the dip on something with no floor',
    ],
  },
  {
    id: 'steth', emoji: '⚓', zh: 'stETH 折价：赚价签的钱', en: 'stETH: Earning the Price Tag',
    steps: [
      {
        zh: '2022 年 6 月：三箭资本等爆仓机构被迫抛售 stETH，折价扩大到 7%。stETH 的本质是「锁在信标链上的 ETH + 质押收益」，当时提款尚未开放。',
        en: 'June 2022: liquidated funds like 3AC dump stETH, and the discount widens to 7%. stETH is ETH locked on the beacon chain plus staking yield — withdrawals not yet enabled.',
        stats: [
          { zh: '折价', en: 'Discount', value: '7%', tone: 'neg' },
          { zh: '赎回', en: 'Withdrawals', value: '未开放' },
          { zh: '卖方', en: 'Sellers', value: '被爆仓的机构' },
        ],
      },
      {
        zh: '关键判断：这不是锚坏了——底层 ETH 真实存在、链上可验证。这是流动性挤兑在给「等待」标价。买入 = 接住别人等不起的仓位，赚取时间的报酬。',
        en: 'The key read: the anchor is not broken — the underlying ETH exists and is verifiable on-chain. This is a liquidity crunch pricing the wait. Buying means catching positions others cannot afford to hold, and getting paid for time.',
        stats: [
          { zh: '底层资产', en: 'Underlying', value: '真实可验证', tone: 'pos' },
          { zh: '需要等待', en: 'Wait required', value: '数月~未知' },
          { zh: '补偿', en: 'Compensation', value: '7% + 质押收益', tone: 'pos' },
        ],
      },
      {
        zh: '2023 年 4 月上海升级开放提款，折价收敛到 0.3% 以内。等得起的人赚到了折价 + 一路的质押收益；用杠杆或短钱进场的人，在中途的波动里被震了出去。',
        en: "April 2023: the Shanghai upgrade enables withdrawals and the discount converges below 0.3%. Patient capital earned the discount plus staking yield along the way; leveraged or short-term money got shaken out in between.",
        stats: [
          { zh: '折价', en: 'Discount', value: '<0.3%', tone: 'pos' },
          { zh: '耐心资金回报', en: 'Patient return', value: '7% + 质押', tone: 'pos' },
          { zh: '杠杆玩家', en: 'Levered players', value: '中途出局', tone: 'neg' },
        ],
      },
    ],
    lessonZh: '教训：stETH 和 UST 的区别在于折价的性质——一个是「流动性的价格」，一个是「死亡的倒计时」。分清这两种折价是链上套利的第一课。赚等待的钱，就必须用等得起的钱（期限匹配、不加杠杆）。',
    lessonEn: 'Lesson: stETH vs UST is the nature of the discount — one prices liquidity, the other counts down to death. Telling them apart is lesson one of on-chain arbitrage. To earn the wait, use money that can wait: match horizons, skip leverage.',
    checklistZh: [
      '折价来源三选一：流动性 / 信用 / 机制坏死——只有第一种适合接',
      '底层资产链上可验证吗？',
      '你的资金等得起吗？等待的钱不能加杠杆',
      '看清谁在卖：被迫的卖家 = 你的利润来源',
    ],
    checklistEn: [
      'Discount source, pick one: liquidity / credit / broken mechanism — only the first is catchable',
      'Is the underlying verifiable on-chain?',
      'Can your money wait? Waiting money must be unlevered',
      'Know who is selling: forced sellers are your profit source',
    ],
  },
  {
    id: 'negfund', emoji: '📉', zh: '费率转负的拖延症', en: 'Funding Flip Procrastination',
    steps: [
      {
        zh: '牛市顶部，你建好了资金费 carry：现货多 + 永续空，年化 45%，每 8 小时进一次账。日子舒服得像收租。',
        en: 'At the bull-market top you build the carry: spot long + perp short at 45% annualized, funding landing every 8 hours. Life feels like collecting rent.',
        stats: [
          { zh: '年化费率', en: 'Funding APY', value: '+45%', tone: 'pos' },
          { zh: '敞口', en: 'Exposure', value: '中性' },
          { zh: '心情', en: 'Mood', value: '极好', tone: 'pos' },
        ],
      },
      {
        zh: '市场转熊：费率先降到 5%，再转 −10%——现在是你每天付钱给别人。但你想着「等它转正」，一拖就是三周。',
        en: 'The market turns: funding fades to 5%, then flips to −10% — now you pay, every day. But you wait for it to "come back". Three weeks pass.',
        stats: [
          { zh: '费率', en: 'Funding', value: '−10%', tone: 'neg' },
          { zh: '每日现金流', en: 'Daily flow', value: '净支出', tone: 'neg' },
          { zh: '已回吐利润', en: 'Profit given back', value: '一半', tone: 'neg' },
        ],
      },
      {
        zh: '终于清仓复盘：后半段的负费率加上四次手续费，吃掉了前半段 60% 的利润。策略没错，错的是没有退出纪律——「等它回来」悄悄变成了一笔方向性赌注。',
        en: 'You finally close and review: the negative-funding stretch plus four rounds of fees ate 60% of the earlier profit. The strategy was fine; the missing exit rule was not — "waiting for it to come back" had quietly become a directional bet.',
        stats: [
          { zh: '最终收益', en: 'Final return', value: '大幅缩水', tone: 'neg' },
          { zh: '病因', en: 'Diagnosis', value: '没有退出规则' },
          { zh: '处方', en: 'Prescription', value: '机械退出线', tone: 'pos' },
        ],
      },
    ],
    lessonZh: '教训：资金费是流动的——入场条件消失时，仓位就该消失。给 carry 设机械退出线（例如：费率连续 3 天低于年化 8% 即撤），否则「等它回来」会变成你从未打算下的方向注。',
    lessonEn: 'Lesson: funding flows — when the entry condition disappears, so should the position. Give the carry a mechanical exit (e.g. leave after 3 straight days under 8% annualized), or "waiting for it back" becomes a directional bet you never meant to place.',
    checklistZh: [
      '入场当天就写好退出阈值（费率线 + 时间线）',
      '每天核对实际到账费率 vs 预期',
      '手续费计入回本天数：4 次进出 ≈ 0.2%',
      '费率转负后 48 小时内必须做出决策',
    ],
    checklistEn: [
      'Write the exit threshold on entry day (funding line + time line)',
      'Reconcile actual vs expected funding daily',
      'Count fees in breakeven days: 4 legs ≈ 0.2%',
      'Funding flips negative? Decide within 48 hours',
    ],
  },
  {
    id: 'weekendGap', emoji: '📆', zh: '周末跳空：冻结的对冲腿', en: 'Weekend Gap: The Frozen Hedge',
    steps: [
      {
        zh: '周五收盘前，你持有「TSLA 永续空 + 代币化 TSLA 现货多」的费率 carry：年化 35%，敞口中性，一切完美。永续 24/7 交易，股票周末休市——你觉得没关系。',
        en: 'Friday close: you hold a TSLA perp-short + tokenized-TSLA-long carry at 35% annualized, delta neutral, all perfect. The perp trades 24/7, the stock market closes — you figure it does not matter.',
        stats: [
          { zh: '年化费率', en: 'Funding APY', value: '+35%', tone: 'pos' },
          { zh: '敞口', en: 'Exposure', value: '≈0' },
          { zh: '时间', en: 'Time', value: '周五 16:00' },
        ],
      },
      {
        zh: '周日凌晨突发利空，永续先跌为敬 −9%。空单在赚钱？别高兴：现货腿也终将补跌，而且现在根本卖不掉——你的「中性」实际上已经裸奔了 40 个小时。',
        en: 'Sunday 3am, bad news drops. The perp falls −9% first. Short leg winning? Hold the cheer: the spot leg will catch down too, and right now it cannot be sold — your "neutral" book has been naked for 40 hours.',
        stats: [
          { zh: '永续', en: 'Perp', value: '−9%', tone: 'neg' },
          { zh: '现货腿', en: 'Spot leg', value: '冻结', tone: 'neg' },
          { zh: '组合', en: 'Book', value: '名义中性，实际悬空' },
        ],
      },
      {
        zh: '周一开盘现货补跌 −8.5%，两腿重新对齐，这次净变化约为零——你白担了两天的裸奔风险。想想反过来：若是暴涨利好，先被打爆的就是你的空腿。',
        en: 'Monday open: spot gaps down −8.5%, the legs realign, net change roughly zero — you carried two days of naked risk for nothing. Now flip it: on a violent rally, your short leg is the one that gets liquidated first.',
        stats: [
          { zh: '现货补跌', en: 'Spot catch-down', value: '−8.5%' },
          { zh: '本次净变化', en: 'Net this time', value: '≈0（走运）' },
          { zh: '真正的教训', en: 'Real lesson', value: '时段错配', tone: 'neg' },
        ],
      },
    ],
    lessonZh: '教训：股票永续 24/7、股票每天只开 6.5 小时——时段错配让「中性」组合每个周末裸奔。这是美股永续套利与币圈套利最大的结构差异，费率再高也要先算这笔账。',
    lessonEn: 'Lesson: stock perps run 24/7 while the stock trades 6.5 hours a day — the session mismatch strips a "neutral" book naked every weekend. It is the biggest structural difference from crypto carry, and no funding rate is rich enough to skip this math.',
    checklistZh: [
      '周五收盘前把仓位降到「裸奔两天也能承受」的水平',
      '算清空腿在周末跳空下的爆仓价，杠杆按最坏情形倒推',
      '盯住盘后与周末的重大事件日历（财报、监管、宏观）',
      '优先选流动性最好、映射关系最清晰的合约',
    ],
    checklistEn: [
      'Cut the position by Friday close to a size that survives two naked days',
      'Compute the short leg\'s liquidation price under a weekend gap; back out leverage from the worst case',
      'Track the after-hours and weekend event calendar (earnings, regulators, macro)',
      'Prefer the most liquid contracts with the cleanest stock mapping',
    ],
  },
  {
    id: 'twtr', emoji: '🐦', zh: '推特并购案：spread 过山车', en: 'Twitter Deal: The Spread Coaster',
    steps: [
      {
        zh: '2022 年 4 月：马斯克以 $54.20 全现金收购推特，协议已签，股价却停在 $50——8.4% 的 spread，预计几个月交割，年化收益很诱人。这就是并购套利：买入、等待、收下确定性的钱。',
        en: 'April 2022: Musk signs a $54.20 all-cash deal for Twitter, yet the stock sits at $50 — an 8.4% spread over a few months to close. That is merger arb: buy, wait, collect the price of certainty.',
        stats: [
          { zh: '收购价', en: 'Offer', value: '$54.20' },
          { zh: '市价', en: 'Market', value: '$50.00' },
          { zh: 'Spread', en: 'Spread', value: '8.4%', tone: 'pos' },
        ],
      },
      {
        zh: '7 月：马斯克发函毁约，股价砸到 $33。持仓浮亏 34%——spread 看起来变成了 64%，但此刻市场定价的是「交易已死」。有人割肉离场，有人重读并购协议后加仓：分手费、特拉华法院、具体履约条款。',
        en: 'July: Musk files to walk away. The stock craters to $33 — a 34% drawdown. The spread "looks like" 64%, but the market is pricing a dead deal. Some cut losses; others reread the agreement — break fee, Delaware court, specific performance — and add.',
        stats: [
          { zh: '市价', en: 'Market', value: '$33', tone: 'neg' },
          { zh: '浮亏', en: 'Drawdown', value: '−34%', tone: 'neg' },
          { zh: '市场判断', en: 'Market read', value: '交易将破裂' },
        ],
      },
      {
        zh: '10 月：开庭前夕马斯克认怂，按原价 $54.20 交割。从 $33 拿到 $54.20 的人收益 +64%；但用杠杆的人早在半路被强平，用短钱的人在 $33 的恐慌里割在了地板上。',
        en: 'October: on the courthouse steps, Musk folds and closes at the original $54.20. From $33 that is +64% — but levered players were liquidated mid-ride, and short-term money puked at the $33 bottom.',
        stats: [
          { zh: '交割价', en: 'Close', value: '$54.20', tone: 'pos' },
          { zh: '从 $33 起', en: 'From $33', value: '+64%', tone: 'pos' },
          { zh: '杠杆玩家', en: 'Levered players', value: '半路出局', tone: 'neg' },
        ],
      },
    ],
    lessonZh: '教训：并购套利赚的是法律与融资确定性的钱，但 spread 中途的波动比最终结果更折磨人。负偏收益 + 剧烈中途波动 = 小仓位、零杠杆、分散多个案子、拿得到终点才有确定性。',
    lessonEn: 'Lesson: merger arb monetizes legal and financing certainty, but the mid-deal spread swings hurt more than the outcome. Negative skew + violent interim moves = small size, zero leverage, many deals — certainty belongs only to those who reach the finish line.',
    checklistZh: [
      '只做已签协议的现金要约，读懂分手费与履约条款',
      '仓位按「破裂回撤 30%+」倒推，而不是按年化收益正推',
      '分散 5–10 个案子，任何单一案子破裂都不致命',
      '不加杠杆：中途波动会让确定性死在黎明前',
    ],
    checklistEn: [
      'Signed cash offers only; read the break fee and specific-performance clauses',
      'Size from the 30%+ break drawdown, not from the annualized return',
      'Spread across 5–10 deals so no single break is fatal',
      'No leverage: interim swings kill certainty before dawn',
    ],
  },
];

/** 记录看完的套利案例；集齐颁发徽章 */
function markArbCaseFinished(id: string) {
  markDaily('lab');
  try {
    const seen: string[] = JSON.parse(localStorage.getItem(ARB_CASES_KEY) ?? '[]');
    if (!seen.includes(id)) {
      seen.push(id);
      localStorage.setItem(ARB_CASES_KEY, JSON.stringify(seen));
    }
    if (seen.length >= CASES.length) awardBadge('arb_apprentice');
  } catch {
    /* ignore */
  }
}

/* ---------- 模拟器教学近似 ---------- */

const NOTIONAL = 10000;
const FEE_ROUND_TRIP = 0.002; // 4 条腿 taker ≈ 0.2%
const MAINT_MARGIN = 0.005;

export function ArbLab({ onExit }: { onExit: () => void }) {
  const { lang } = useLanguage();
  const t = (zh: string, en: string) => (lang === 'en' ? en : zh);

  const [tab, setTab] = useState<'sim' | 'cases'>('sim');
  const [apy, setApy] = useState(30);
  const [leverage, setLeverage] = useState(2);
  const [days, setDays] = useState(30);
  const [caseId, setCaseId] = useState<string | null>(null);
  const [caseStep, setCaseStep] = useState(0);

  const activeCase = caseId ? CASES.find((c) => c.id === caseId)! : null;

  /* 模拟器读数（教学近似） */
  const dailyIncome = (NOTIONAL * apy) / 100 / 365;
  const totalIncome = dailyIncome * days;
  const feeCost = NOTIONAL * FEE_ROUND_TRIP;
  const breakevenDays = apy > 0 ? Math.ceil(feeCost / dailyIncome) : Infinity;
  const liqDistance = Math.max(0, (1 / leverage - MAINT_MARGIN) * 100);
  const net = totalIncome - feeCost;
  const wickSurvives25 = liqDistance > 25;

  function selectCase(c: ArbCase) {
    setCaseId(c.id);
    setCaseStep(0);
    sfx.correct(0);
  }

  function gotoStep(i: number) {
    if (!activeCase) return;
    const idx = Math.max(0, Math.min(i, activeCase.steps.length - 1));
    setCaseStep(idx);
    if (idx === activeCase.steps.length - 1) markArbCaseFinished(activeCase.id);
  }

  const fmt = (v: number) => `$${v.toFixed(0)}`;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto w-full max-w-2xl px-4 pb-16 pt-5">
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={onExit}
            aria-label={t('退出套利工坊', 'Exit arb workshop')}
            className="text-2xl leading-none text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
          >
            ✕
          </button>
          <h1 className="text-xl font-extrabold sm:text-2xl">⚡ {t('套利工坊', 'Arb Workshop')}</h1>
        </div>

        {/* Tab 切换 */}
        <div className="mb-5 grid grid-cols-2 gap-2">
          <button
            onClick={() => setTab('sim')}
            className={`rounded-2xl border-2 py-2.5 text-sm font-extrabold transition ${
              tab === 'sim'
                ? 'border-[#627eea] bg-[#e8ecfd] text-[#4c63bb] dark:bg-[#1e2547]'
                : 'border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)]'
            }`}
          >
            🎛️ {t('资金费模拟器', 'Funding Simulator')}
          </button>
          <button
            onClick={() => setTab('cases')}
            className={`rounded-2xl border-2 py-2.5 text-sm font-extrabold transition ${
              tab === 'cases'
                ? 'border-[#f59f00] bg-[#fff7e0] text-[#b58900] dark:bg-[#3a3000]'
                : 'border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)]'
            }`}
          >
            🎬 {t('实战案例', 'Real Cases')}
          </button>
        </div>

        {tab === 'sim' && (
          <>
            <p className="mb-4 text-xs leading-relaxed text-[var(--muted-foreground)]">
              {t(
                `以 $${NOTIONAL.toLocaleString()} 名义本金搭一个「现货多 + 永续空」的中性 carry。拖动参数，看收益和风险怎么互相顶牛。（教学近似模型：手续费按 4 条腿 taker 共 0.2% 计，爆仓距离 ≈ 1/杠杆 − 维持保证金。）`,
                `Build a $${NOTIONAL.toLocaleString()} spot-long + perp-short neutral carry. Drag the knobs and watch return fight risk. (Teaching approximations: fees = 4 taker legs ≈ 0.2%; liquidation distance ≈ 1/leverage − maintenance margin.)`,
              )}
            </p>

            {/* 参数 */}
            <div className="mb-5 space-y-4 rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-4">
              <LabSlider
                label={t('资金费年化', 'Funding APY')}
                value={apy} min={-30} max={120}
                display={`${apy > 0 ? '+' : ''}${apy}%`}
                accent={apy >= 0 ? '#58cc02' : '#ff4b4b'}
                onChange={setApy}
              />
              <LabSlider
                label={t('永续腿杠杆', 'Perp leg leverage')}
                value={leverage} min={1} max={5}
                display={`${leverage}x`}
                accent={leverage >= 4 ? '#ff4b4b' : '#1cb0f6'}
                onChange={setLeverage}
              />
              <LabSlider
                label={t('持有天数', 'Days held')}
                value={days} min={1} max={90}
                display={t(`${days} 天`, `${days}d`)}
                accent="#ff9600"
                onChange={setDays}
              />
              <div className="flex flex-wrap gap-2 pt-1">
                <LabChip label={t('📉 费率转负', '📉 Funding flips')} onClick={() => setApy(-10)} />
                <LabChip label={t('🚀 牛市狂热', '🚀 Bull mania')} onClick={() => setApy(90)} />
                <LabChip label={t('🔄 重置', '🔄 Reset')} onClick={() => { setApy(30); setLeverage(2); setDays(30); }} />
              </div>
            </div>

            {/* 读数 */}
            <div className="mb-4 grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
              <ArbTile label={t('每日资金费', 'Daily funding')} value={`${dailyIncome >= 0 ? '+' : ''}${fmt(dailyIncome)}`} tone={dailyIncome >= 0 ? 'pos' : 'neg'} />
              <ArbTile label={t(`${days} 天净收益`, `${days}d net`)} value={`${net >= 0 ? '+' : ''}${fmt(net)}`} tone={net >= 0 ? 'pos' : 'neg'} />
              <ArbTile
                label={t('手续费回本', 'Fee breakeven')}
                value={breakevenDays === Infinity ? '∞' : t(`${breakevenDays} 天`, `${breakevenDays}d`)}
                tone={breakevenDays !== Infinity && breakevenDays <= 7 ? 'pos' : undefined}
              />
              <ArbTile label={t('爆仓距离', 'Liq. distance')} value={`±${liqDistance.toFixed(0)}%`} tone={liqDistance > 25 ? 'pos' : 'neg'} />
            </div>

            {/* 插针体检 */}
            <div
              className={`mb-4 rounded-2xl border-2 p-4 text-sm leading-relaxed ${
                wickSurvives25
                  ? 'border-[#a5ed6e] bg-[#f2ffe5] text-[#4a8a00] dark:bg-[#1d2e0d] dark:text-[#a5ed6e]'
                  : 'border-[#ffb2b2] bg-[#fff0f0] text-[#c22525] dark:bg-[#3a1414] dark:text-[#ffb2b2]'
              }`}
            >
              {wickSurvives25
                ? t(
                    `🛡️ 插针体检：一根 ±25% 的插针打不穿你（爆仓距离 ±${liqDistance.toFixed(0)}%）。低杠杆是 carry 策略的第一生命线。`,
                    `🛡️ Wick check: a ±25% wick cannot break you (liq. distance ±${liqDistance.toFixed(0)}%). Low leverage is the carry trade's first lifeline.`,
                  )
                : t(
                    `💥 插针体检：一根 ±25% 的插针就能打爆你的永续腿（爆仓距离仅 ±${liqDistance.toFixed(0)}%）——对冲瞬间变裸单，之前赚的资金费一夜清零。把杠杆降下来。`,
                    `💥 Wick check: a single ±25% wick liquidates your perp leg (liq. distance only ±${liqDistance.toFixed(0)}%) — the hedge turns naked and every funding payment vanishes overnight. Cut the leverage.`,
                  )}
            </div>

            <p className="text-center text-xs leading-relaxed text-[var(--muted-foreground)]">
              {t(
                '未计入：费率波动、ADL、交易所对手方风险、现货腿滑点——这些正是右边案例里的死法。',
                'Not modeled: funding drift, ADL, exchange counterparty risk, spot-leg slippage — exactly the deaths in the Cases tab.',
              )}
            </p>
          </>
        )}

        {tab === 'cases' && (
          <>
            <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
              {CASES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => selectCase(c)}
                  className={`shrink-0 rounded-full border-2 px-4 py-1.5 text-xs font-extrabold transition ${
                    c.id === caseId
                      ? 'border-[#f59f00] bg-[#fff7e0] text-[#b58900] dark:bg-[#3a3000]'
                      : 'border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]'
                  }`}
                >
                  {c.emoji} {lang === 'en' ? c.en : c.zh}
                </button>
              ))}
            </div>

            {!activeCase && (
              <p className="py-10 text-center text-sm text-[var(--muted-foreground)]">
                {t('选一个案例，亲历一遍别人交过的学费。', "Pick a case and live through someone else's tuition.")}
              </p>
            )}

            {activeCase && (
              <div className="rounded-2xl border-2 border-[#f59f00] bg-[var(--card)] p-4">
                <p className="mb-2 text-sm font-extrabold text-[#b58900]">
                  {activeCase.emoji} {lang === 'en' ? activeCase.en : activeCase.zh}
                  <span className="ml-2 font-bold text-[#b58900]/70">
                    {caseStep + 1}/{activeCase.steps.length}
                  </span>
                </p>
                <p className="mb-3 text-sm leading-relaxed">
                  {lang === 'en' ? activeCase.steps[caseStep].en : activeCase.steps[caseStep].zh}
                </p>

                {/* 关键数字 */}
                <div className="mb-3 grid grid-cols-3 gap-2">
                  {activeCase.steps[caseStep].stats.map((s, i) => (
                    <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-2 text-center">
                      <p className="text-[10px] font-bold text-[var(--muted-foreground)]">
                        {lang === 'en' ? s.en : s.zh}
                      </p>
                      <p
                        className={`text-sm font-extrabold ${
                          s.tone === 'pos' ? 'text-[#58a700]' : s.tone === 'neg' ? 'text-[#ea2b2b]' : ''
                        }`}
                      >
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* 最后一幕：教训 + 实战清单 */}
                {caseStep === activeCase.steps.length - 1 && (
                  <>
                    <p className="mb-3 rounded-xl bg-[#ffc800]/25 p-3 text-sm font-semibold leading-relaxed">
                      {lang === 'en' ? activeCase.lessonEn : activeCase.lessonZh}
                    </p>
                    <div className="mb-3 rounded-xl border-2 border-dashed border-[#58cc02] p-3">
                      <p className="mb-1.5 text-xs font-extrabold uppercase tracking-wide text-[#4a8a00]">
                        ✅ {t('实战操作清单', 'Field Checklist')}
                      </p>
                      <ul className="space-y-1">
                        {(lang === 'en' ? activeCase.checklistEn : activeCase.checklistZh).map((item, i) => (
                          <li key={i} className="flex gap-2 text-xs leading-relaxed">
                            <span className="shrink-0 font-extrabold text-[#58cc02]">{i + 1}.</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {/* 步进 */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => gotoStep(caseStep - 1)}
                    disabled={caseStep === 0}
                    className="rounded-xl border-2 border-[#f59f00] px-4 py-1.5 text-xs font-extrabold text-[#b58900] transition disabled:opacity-40"
                  >
                    ← {t('上一幕', 'Back')}
                  </button>
                  <div className="flex gap-1.5">
                    {activeCase.steps.map((_, i) => (
                      <span
                        key={i}
                        className={`h-2 w-2 rounded-full ${i === caseStep ? 'bg-[#f59f00]' : 'bg-[#f59f00]/30'}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => gotoStep(caseStep + 1)}
                    disabled={caseStep === activeCase.steps.length - 1}
                    className="rounded-xl border-b-4 border-[#c47f00] bg-[#f59f00] px-4 py-1.5 text-xs font-extrabold text-white transition active:translate-y-0.5 active:border-b-2 disabled:opacity-40"
                  >
                    {t('下一幕', 'Next')} →
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        <p className="mt-6 text-center text-xs leading-relaxed text-[var(--muted-foreground)]">
          {t(
            '仅供教育用途，不构成投资建议。链上与衍生品交易风险极高，可能损失全部本金。',
            'Educational only, not investment advice. On-chain and derivatives trading carry extreme risk of total loss.',
          )}
        </p>
      </div>
    </div>
  );
}

function ArbTile({ label, value, tone }: { label: string; value: string; tone?: Tone }) {
  return (
    <div className="rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] p-3">
      <p className="text-[10px] font-extrabold uppercase tracking-wide text-[var(--muted-foreground)]">{label}</p>
      <p className={`mt-1 text-lg font-extrabold ${tone === 'pos' ? 'text-[#58a700]' : tone === 'neg' ? 'text-[#ea2b2b]' : ''}`}>
        {value}
      </p>
    </div>
  );
}

function LabSlider({
  label, value, min, max, display, accent, onChange,
}: {
  label: string; value: number; min: number; max: number; display: string; accent: string; onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm font-bold">
        <span>{label}</span>
        <span style={{ color: accent }}>{display}</span>
      </div>
      <input
        type="range" min={min} max={max} step={1} value={value} aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[var(--muted)]"
        style={{ accentColor: accent }}
      />
    </div>
  );
}

function LabChip({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border-2 border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs font-extrabold text-[var(--muted-foreground)] transition hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
    >
      {label}
    </button>
  );
}
