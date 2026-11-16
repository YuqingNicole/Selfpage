import type { Unit } from '../optionsCourse';

export const optionsEnU22U24 = {
  u22: {
    id: 'u22',
    title: 'Unit 22 · Stock Technicals 101',
    subtitle: 'Read trend, location and rhythm first — then decide how to use options',
    color: '#3b82f6',
    colorDark: '#1d4ed8',
    icon: '📈',
    lessons: [
      {
        id: 'u22l1',
        analogy:
          'Reading a chart is like reading a mountain road: first work out whether you are climbing, descending, or zig-zagging along the slope. If you misread the direction, flooring the pedal just gets you lost faster.',
        title: 'Trend: Up, Down, or Range',
        tips: [
          'Step one in technical analysis is not hunting for a magic indicator — it is identifying the market state: uptrend, downtrend, or range.',
          'Higher highs and higher lows usually mean the uptrend is intact; lower highs and lower lows lean bearish.',
          'For options, the trend picks the strategy family: with the trend, long calls / bull put spreads / covered calls fit better; bottom-fishing against the trend usually lets time decay grind you down first.',
          'When the trend is unclear, the safest conclusion is not “keep guessing” — it is “wait”.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'A stock keeps printing higher highs and higher lows. What is the most common read?',
            options: ['Uptrend', 'Downtrend', 'Random noise', 'You must short it'],
            correct: 0,
            explain: 'Rising highs and rising lows are the most basic bullish trend structure.',
          },
          {
            type: 'tf',
            statement: 'When a stock is stuck in an obvious range, blindly chasing short-dated calls is usually not a high-probability play.',
            answer: true,
            explain: 'True. Ranges lack follow-through, so short-dated calls get eaten by sideways chop plus theta.',
          },
          {
            type: 'fill',
            before: 'Step one in technical analysis is not picking an indicator — it is identifying the market’s',
            after: '.',
            options: ['state', 'broker', 'fee tier', 'headlines'],
            correct: 0,
            explain: 'State first, tools second. The trend framework matters far more than any single indicator.',
          },
          {
            type: 'choice',
            question: 'The trend is unclear and candles keep whipsawing. What is the steadier move for an options trader?',
            options: ['Size up to gain certainty', 'Wait for a clearer structure', 'Only buy further OTM contracts', 'Fix it with a shorter expiry'],
            correct: 1,
            explain: 'Not trading when you cannot read the chart is an edge in itself. You never have to buy an option.',
          },
          {
            type: 'match',
            prompt: 'Match the market state to the usual trading bias',
            pairs: [
              ['Uptrend', 'Favor with-trend bullish strategies'],
              ['Downtrend', 'Avoid force-buying short-dated calls'],
              ['Range', 'Lean on support/resistance and seller setups'],
              ['State unclear', 'Wait — no rush to open'],
            ],
          },
        ],
      },
      {
        id: 'u22l2',
        analogy:
          'Support and resistance are a floor and a ceiling: a ball bounces the first time it hits the floor and drops the first time it hits the ceiling — but pound the same spot hard enough, often enough, and it can break through.',
        title: 'Support, Resistance and Key Levels',
        tips: [
          'Support is where buyers tend to show up; resistance is where sellers tend to show up. Think of them as zones, not pixel-perfect lines.',
          'A price tested again and again is usually important — but the more it gets tested, the closer it may be to giving way.',
          'In options, key levels set your risk/reward: going long near support beats chasing right under resistance.',
          'A real breakout usually needs a close above the level with volume behind it — not a brief intraday poke.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'Why are support and resistance better thought of as zones rather than single lines?',
            options: ['Charting software can’t draw straight', 'Trading is noisy, so price tugs back and forth around key areas', 'Only options have support and resistance', 'Closing prices don’t matter'],
            correct: 1,
            explain: 'Markets are not a ruler. Price probing back and forth around a key zone is the norm.',
          },
          {
            type: 'tf',
            statement: 'When a stock has just reached the area right below resistance, it is usually not an ideal spot to chase short-dated calls.',
            answer: true,
            explain: 'True. You are buying exactly where price is most likely to get pushed back — both direction and timing work against you.',
          },
          {
            type: 'fill',
            before: 'To judge whether a breakout is reliable, besides price clearing the level, check whether',
            after: 'confirms it.',
            options: ['volume', 'influencer comment counts', 'fees', 'dividend frequency'],
            correct: 0,
            explain: 'A high-volume breakout is more credible than a quiet one — it shows real money is pushing.',
          },
          {
            type: 'choice',
            question: 'If you want to get long, where is the risk/reward usually friendlier?',
            options: ['Chasing just under resistance', 'Near support, with a clear invalidation point', 'At the top of a long upper wick after a failed breakout', 'Anywhere — it’s all the same'],
            correct: 1,
            explain: 'Buying near support gives a clear stop: if you are wrong, you lose small. The payoff shape is healthier.',
          },
          {
            type: 'match',
            prompt: 'Match each scenario to the more reasonable read',
            pairs: [
              ['Stabilizing near support', 'Watch for a low-risk long setup'],
              ['Stalling near resistance', 'Chasing longs gets worse value'],
              ['Clearing resistance on volume', 'Breakout credibility rises'],
              ['Intraday fake-out, then fading', 'Don’t call a trend reversal yet'],
            ],
          },
        ],
      },
      {
        id: 'u22l3',
        analogy:
          'Moving averages are lane markings and price is the car. If the car keeps running above the road, traffic is flowing forward; once it drops below a key lane and can’t climb back after braking, the picture has changed.',
        title: 'Moving Averages as a Rhythm Filter',
        tips: [
          'Common moving averages are the 5, 10, 20, 50 and 200-day. Short ones show rhythm; long ones show the big direction.',
          'Price above rising 20- and 50-day averages usually signals a healthy trend; breaking below them while they flatten or roll over means momentum is fading.',
          'Moving averages are not buy/sell buttons — they are filters that keep you from forcing longs in weak stocks.',
          'This matters even more for options: you need the move to be right and to happen soon. Moving averages screen out a lot of “right but going nowhere” names.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'The 20- and 50-day moving averages are both rising and price trades above them. What does that usually suggest?',
            options: ['A relatively healthy trend structure', 'A guaranteed rally right now', 'You must short volatility', 'The fundamentals are deteriorating'],
            correct: 0,
            explain: 'This is a classic with-trend setup — but it is not a promise of an immediate rally.',
          },
          {
            type: 'tf',
            statement: 'Moving averages work better as a trade filter than as mechanical entry signals on every golden cross or death cross.',
            answer: true,
            explain: 'True. Moving averages lag by design; using them as a filter is more reliable than using them as a button.',
          },
          {
            type: 'fill',
            before: 'For option buyers, one value of moving averages is avoiding stocks where the direction looks right but price just keeps going',
            after: '.',
            options: ['nowhere', 'parabolic', 'ex-dividend', 'halted'],
            correct: 0,
            explain: 'Right direction but no movement still lets theta wear the position down.',
          },
          {
            type: 'choice',
            question: 'Why do options traders need a rhythm filter even more than stock traders?',
            options: ['Options carry no directional risk', 'Options expire — being right but too slow still loses money', 'Moving averages only work on options', 'Brokers require it'],
            correct: 1,
            explain: 'Options add a time dimension: slow is also wrong.',
          },
          {
            type: 'match',
            prompt: 'Match the moving-average role to its use',
            pairs: [
              ['Short-term MAs', 'Read rhythm and pullback strength'],
              ['Long-term MAs', 'Judge the big direction'],
              ['Price holding above the MA stack', 'Easier environment for longs'],
              ['Price breaks key MAs as they weaken', 'Be more careful going long'],
            ],
          },
        ],
      },
    ],
  },
  u23: {
    id: 'u23',
    title: 'Unit 23 · Advanced Technicals: Volume and Entries',
    subtitle: 'Go beyond chart shapes — read volume, momentum and options timing',
    color: '#f97316',
    colorDark: '#c2410c',
    icon: '🎯',
    lessons: [
      {
        id: 'u23l1',
        analogy:
          'Price is the actor on stage; volume is the audience. However loudly the actor shouts, if nobody in the seats responds, the show rarely runs long.',
        title: 'Price, Volume and Real vs. Fake Breakouts',
        tips: [
          'Volume confirms price action. Rising on heavy volume means more money is participating; rising on thin volume is more likely to run out of steam.',
          'What matters is not whether volume is big today, but whether it is unusually high relative to its recent history.',
          'For option buyers, a high-volume breakout raises the odds that the move happens now — exactly what fights time decay.',
          'Breakouts on no volume, fading into the close, and no follow-through the next day are classic fake-out signs.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'Why do option buyers especially prefer high-volume breakouts over slow, quiet grinds higher?',
            options: ['High volume means it can’t fall', 'The move is more likely to unfold quickly, beating theta', 'Volume lowers the premium', 'IV always drops on volume'],
            correct: 1,
            explain: 'What option buyers fear most is delay. A high-volume breakout is more likely to get moving fast.',
          },
          {
            type: 'tf',
            statement: 'If a stock pokes above its prior high intraday but closes back below on ordinary volume, the breakout usually has limited credibility.',
            answer: true,
            explain: 'True. Many fake breakouts look exactly like this: lots of action intraday, no hold at the close.',
          },
          {
            type: 'fill',
            before: 'In price-volume analysis, volume acts as the',
            after: 'of price action.',
            options: ['confirmation', 'disguise', 'hedge', 'eraser'],
            correct: 0,
            explain: 'Price tells the story; volume proves whether real money is paying for it.',
          },
          {
            type: 'choice',
            question: 'Which looks more like a fake-breakout warning?',
            options: ['Clears the base on volume and keeps rising the next day', 'Holds above the breakout on lighter volume', 'Spikes above the prior high intraday, then fades back into the base by the close', 'Retests the base, then pushes higher on volume again'],
            correct: 2,
            explain: 'A spike that fades and can’t hold means overhead supply hasn’t been absorbed yet.',
          },
          {
            type: 'match',
            prompt: 'Match the price-volume pattern to the usual read',
            pairs: [
              ['High-volume breakout', 'Trend continuation more likely'],
              ['No-volume breakout', 'Durability in doubt'],
              ['Spike and fade', 'Higher fake-out risk'],
              ['Holds the retest, then volume returns', 'Healthier second confirmation'],
            ],
          },
        ],
      },
      {
        id: 'u23l2',
        analogy:
          'RSI and MACD are a thermometer and an ECG: they tell you how hot or how strong things are, but they cannot decide for you whether you will get sick tomorrow.',
        title: 'Momentum Indicators: Reading RSI and MACD',
        tips: [
          'RSI measures the speed of moves. The usual reading is RSI > 70 runs hot and RSI < 30 runs cold — but “hot” does not mean it should fall right away.',
          'MACD is better for reading changes in momentum. Crosses are not magic on their own; what matters is where they happen and whether they line up with price structure.',
          'In strong trends RSI can stay elevated for a long time; in weak markets indicator signals whipsaw constantly.',
          'Use indicators as supporting confirmation — never on their own, detached from trend and key levels.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'RSI climbs to 75. What is the most reasonable interpretation?',
            options: ['The stock will crash tomorrow', 'Momentum is running hot — weigh it against trend and location', 'Buy puts immediately', 'The company is overvalued'],
            correct: 1,
            explain: 'RSI only says “hot”. It does not hand you an automatic contrarian trade.',
          },
          {
            type: 'tf',
            statement: 'In a strong uptrend, RSI can stay at high levels for an extended period.',
            answer: true,
            explain: 'True. Strong trends are where “overbought” most often gets misread as “about to drop” — and you miss the whole move.',
          },
          {
            type: 'fill',
            before: 'MACD is better suited to tracking',
            after: 'in momentum than to predicting absolute price moves on its own.',
            options: ['changes', 'valuation', 'dividends', 'position limits'],
            correct: 0,
            explain: 'MACD reads momentum-level clues: acceleration, deceleration and divergence.',
          },
          {
            type: 'choice',
            question: 'Why shouldn’t RSI or MACD be used apart from price structure?',
            options: ['Indicators only work during the day', 'They are supporting tools that throw off frequent noise in ranges', 'Broker software makes mistakes', 'You can’t draw lines with them'],
            correct: 1,
            explain: 'Without trend and location context, many indicator signals are just jitter.',
          },
          {
            type: 'match',
            prompt: 'Match each indicator to its usual role',
            pairs: [
              ['RSI', 'Speed of moves, hot vs. cold'],
              ['MACD', 'Momentum shifts and divergence'],
              ['High RSI in a strong trend', 'Not an instant reversal'],
              ['Indicators without structure', 'Easily misled by noise'],
            ],
          },
        ],
      },
      {
        id: 'u23l3',
        analogy:
          'Entering an options trade is like surfing: seeing the wave is not enough — you need the right break, the right board, and the right moment to stand up. Too late and you wipe out; too early and you wipe out too.',
        title: 'Turning Technicals into Options Trades',
        tips: [
          'Technicals are not the destination. The real question is: given this chart, should you buy a call, sell a put, trade a spread — or skip it?',
          'A strong-trend breakout with reasonable IV favors directional long options or debit spreads; a slow, choppy grind higher often suits selling puts or covered calls better.',
          '“Bullish” is not enough. Do you expect a fast rally, a slow climb, sideways-then-up, or just “not down”? Each expectation maps to a different strategy.',
          'However pretty the chart, if IV is too rich, liquidity too thin, or expiry too close, the trade is still poor quality.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'A stock just broke out of a base on heavy volume and you expect it to keep ripping in the near term. Which approach usually fits?',
            options: ['A directional call or bull call spread', 'Naked short calls', 'Selling puts just because you’re bullish, ignoring IV', 'Always buying the 0DTE contract'],
            correct: 0,
            explain: 'You’re betting on a fast move, so you want positive delta in a structure that captures near-term follow-through.',
          },
          {
            type: 'tf',
            statement: 'Even when bullish, if you only expect the stock “not to fall” rather than to rally hard, selling a put may fit better than buying a call.',
            answer: true,
            explain: 'True. Different expectations call for different strategies — not every bullish view means buying calls.',
          },
          {
            type: 'fill',
            before: 'Technicals only screen direction. When you turn that into an options trade, you also have to check IV, liquidity and',
            after: '.',
            options: ['expiry', 'logo color', 'headline length', 'the CEO’s star sign'],
            correct: 0,
            explain: 'A great chart paired with a bad contract is still a bad trade.',
          },
          {
            type: 'choice',
            question: 'Which statement best captures “translating technicals into options trades”?',
            options: [
              'Bullish always means buying calls',
              'Read the chart and the expected pace first, then match the payoff and time structure',
              'A good chart means you can ignore IV',
              'Options strategy has nothing to do with a stock’s rhythm',
            ],
            correct: 1,
            explain: 'The mature approach is not a binary bet on direction — it turns the expected price script into the right position structure.',
          },
          {
            type: 'match',
            prompt: 'Match the technical setup to the options approach it most likely fits',
            pairs: [
              ['High-volume breakout, expecting a fast move', 'Long call / bull debit spread'],
              ['Mildly bullish, happy to buy the dip', 'Cash-secured put'],
              ['Own the stock, expect flat-to-slightly-up', 'Covered call'],
              ['Messy chart + very expensive IV', 'Better to sit out'],
            ],
          },
        ],
      },
    ],
  },
  u24: {
    id: 'u24',
    title: 'Unit 24 · Earnings and Event-Driven Trades',
    subtitle: 'When technicals meet earnings week, it’s about size and pricing — not just direction',
    color: '#8b5cf6',
    colorDark: '#6d28d9',
    icon: '⚡',
    lessons: [
      {
        id: 'u24l1',
        analogy:
          'A stock before earnings is like the sea before a storm: the surface hasn’t broken yet, but the air has changed. The hard part isn’t guessing whether waves will come — it’s how big they’ll be, and what price the market has already put on them.',
        title: 'Before Earnings: Don’t Just Guess Up or Down',
        tips: [
          'The most common earnings mistake is guessing direction while ignoring how big a move the options market has already priced in.',
          'Technicals still help before earnings, but their job shifts from predicting direction to reading positioning: crowded long at highs, oversold at lows, or basing while it waits to pick a side.',
          'If the chart has already run hard and pre-earnings IV is high on top of that, simply chasing calls usually offers poor odds.',
          'An event trade has to answer three questions at once: direction, magnitude and timing. Getting just one right is usually not enough.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'Why is guessing direction alone usually not enough for options traders before earnings?',
            options: ['Earnings don’t affect the stock price', 'Options are also priced on expected move size and time', 'You can’t trade options before earnings', 'Technicals stop working entirely'],
            correct: 1,
            explain: 'Earnings options are a three-dimensional problem: direction, magnitude and time are all in the price.',
          },
          {
            type: 'tf',
            statement: 'If a stock’s chart looks strong into earnings, chasing short-dated calls is automatically a good deal.',
            answer: false,
            explain: 'False. A strong chart doesn’t mean good odds — when IV is too rich, even being right on direction can pay poorly.',
          },
          {
            type: 'fill',
            before: 'An earnings trade needs to weigh direction, magnitude and',
            after: 'at the same time.',
            options: ['timing', 'influencer views', 'board size', 'headlines'],
            correct: 0,
            explain: 'Timing decides whether the option you bought survives long enough for your script to play out.',
          },
          {
            type: 'choice',
            question: 'What is the more realistic role of technicals before earnings?',
            options: ['Guaranteeing the earnings outcome', 'Gauging positioning and whether expectations are stretched', 'Replacing IV analysis', 'Determining the reported numbers'],
            correct: 1,
            explain: 'Technicals work as a positioning radar, not an earnings-result decoder.',
          },
          {
            type: 'match',
            prompt: 'Match the pre-earnings observation to what it more likely means',
            pairs: [
              ['Strong sideways consolidation at highs', 'Expectations may already lean optimistic'],
              ['Oversold bounce from lows', 'Bad news may be partly priced in'],
              ['Very high IV', 'Buying options gets expensive'],
              ['Event trade', 'Direction alone is not enough'],
            ],
          },
        ],
      },
      {
        id: 'u24l2',
        analogy:
          'The post-earnings move is like opening a mystery box: pulling out something good doesn’t mean you win. What matters is whether it beats the version everyone had already imagined.',
        title: 'After Earnings: The Reaction Matters More Than the Result',
        tips: [
          '“Good” earnings with a falling stock, or “bad” earnings with a rising one, happen because the market trades the gap between result and expectation — not the result itself.',
          'On the first day after earnings, watch the gap size, volume, whether it opens high and fades or opens low and recovers, and whether key levels hold.',
          'For options, the classic post-earnings effect is IV crush: even if the stock moves, the option may make far less than you expected because IV collapses.',
          'If the stock holds a new base on volume after earnings, riding that second leg is often better than gambling before the report.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'Why can a stock fall after great earnings?',
            options: ['Earnings numbers are meaningless', 'The market cares whether results beat expectations by enough', 'All good earnings lead to drops', 'Technicals forbid it from rising'],
            correct: 1,
            explain: 'The market trades the expectation gap, not the absolute score.',
          },
          {
            type: 'tf',
            statement: 'If the stock only moves a little after earnings, options bought at high pre-earnings IV can lose a lot.',
            answer: true,
            explain: 'True. IV crush directly compresses the option’s price.',
          },
          {
            type: 'fill',
            before: 'The common post-earnings collapse in option volatility is called',
            after: '.',
            options: ['IV crush', 'a gamma squeeze', 'pin risk', 'theta freeze'],
            correct: 0,
            explain: 'Once earnings are out, the uncertainty is gone and IV usually drops fast.',
          },
          {
            type: 'choice',
            question: 'After earnings, which looks more like a second-leg trend opportunity than a one-off spike?',
            options: ['Gaps up, then fades all day back into the gap', 'Breaks out on volume and holds a new base', 'Swings wildly intraday but closes back where it started', 'Gaps on very thin volume'],
            correct: 1,
            explain: 'The gap itself isn’t the point — what matters is whether it holds and forms a new structure.',
          },
          {
            type: 'match',
            prompt: 'Match the post-earnings behavior to the usual read',
            pairs: [
              ['Good earnings, stock falls', 'Results may have missed the most optimistic hopes'],
              ['IV drops fast', 'A second drain on buyers besides time'],
              ['Holds above the gap on volume', 'Trend continuation more likely'],
              ['Opens high, closes low', 'Short-term euphoria cashed out, weak follow-through'],
            ],
          },
        ],
      },
      {
        id: 'u24l3',
        analogy:
          'Trading an event stock is like betting on a boxing match: it’s not enough to know who’s stronger — you have to check the odds. If the odds already bake in the champion’s legend, even a win may not pay.',
        title: 'Matching Options Strategies to Events',
        tips: [
          'If you expect the actual move to exceed what the market has priced, lean toward buying; if you think the market has overpriced the move, lean toward selling.',
          'A strong chart plus a confirmed post-earnings breakout suits riding the trend directionally; in a high-IV pre-earnings setup, compare the odds of straddles, spreads and short-premium structures more carefully.',
          'The most common beginner mistake with event stocks is not picking the wrong direction — it’s buying contracts that are too short-dated, too expensive and too far out of the money.',
          'When you can’t read the expectation gap, the mature move is not to force it, but to wait for earnings and let price speak first.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'You believe the real post-earnings move will be clearly bigger than the implied move already priced in. Which approach fits?',
            options: ['Lean toward buying', 'Lean toward selling', 'Only covered calls', 'Always stay flat'],
            correct: 0,
            explain: 'Buying volatility only makes sense when you think reality will be more explosive than the market expects.',
          },
          {
            type: 'tf',
            statement: 'For beginners trading earnings, buying the shortest-dated, furthest-OTM contracts is one of the easiest ways to get burned.',
            answer: true,
            explain: 'True. Cheap is only skin-deep — direction, timing and magnitude all have to go much further your way.',
          },
          {
            type: 'fill',
            before: 'When you can’t read the earnings expectation gap, the more mature move is often to wait until after the report and let',
            after: 'speak.',
            options: ['price', 'the group chat', 'analyst titles', 'push-notification speed'],
            correct: 0,
            explain: 'Once the event passes, price structure is more honest than subjective guesses.',
          },
          {
            type: 'choice',
            question: 'Which approach best matches strategy to script?',
            options: [
              'If bullish, always buy 0DTE options',
              'Wait for a confirmed post-earnings breakout, then join with a with-trend directional structure',
              'High IV only makes things safer',
              'Ignore liquidity — get the position on first',
            ],
            correct: 1,
            explain: 'Letting the event land and then joining the second leg is a steadier play for many traders.',
          },
          {
            type: 'match',
            prompt: 'Match the event view to the closer strategy approach',
            pairs: [
              ['Expect real move > priced move', 'Buy volatility / long-premium structures'],
              ['Think the market overpriced the move', 'Sell volatility / collect premium'],
              ['Breakout confirmed after earnings', 'Ride the second leg with the trend'],
              ['Can’t read the expectation gap', 'Wait — don’t force the bet'],
            ],
          },
        ],
      },
    ],
  },
} satisfies Record<string, Unit>;
