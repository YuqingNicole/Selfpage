export const optionsEnU9U11 = {
  u9: {
    id: 'u9',
    title: 'Unit 9 · Advanced Volatility',
    subtitle: 'Smile, skew, term structure, and volatility risk premium',
    color: '#9069cd',
    colorDark: '#7554a8',
    icon: '🌊',
    lessons: [
      {
        id: 'u9l1',
        analogy:
          'Earthquake insurance is always disproportionately more expensive than “peeling paint insurance” — what people truly fear is the whole house collapsing. The high IV of out-of-the-money puts is the market paying a premium for that collapse risk, and that fear is permanently written into option prices.',
        diagram: 'smile',
        title: 'Volatility Smile and Skew',
        tips: [
          'BSM assumes all strikes share one volatility, but in reality IV differs across strikes — when plotted, it looks like a “smile” or a lopsided grin, known as the volatility smile/skew.',
          'Stocks and indices commonly show “negative skew” (put skew): low strikes (OTM puts) have noticeably higher IV than high strikes, because the market is willing to pay a premium for crash protection.',
          'Why? After the 1987 crash, markets learned that big drops happen far more often than a normal distribution predicts (fat tails), and institutions also have persistent demand for put hedges.',
          'Practical meaning: selling OTM puts collects richer IV premium, but that extra premium is exactly the “insurance fee” for crash risk; a steepening skew often signals rising demand for protection.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'In index options, what does “negative skew / put skew” mean?',
            options: [
              'IV is exactly the same at every strike',
              'OTM puts (lower strikes) have significantly higher IV than OTM calls',
              'OTM calls have significantly higher IV than OTM puts',
              'Front-month IV is always higher than back-month IV',
            ],
            correct: 1,
            explain:
              'The market pays a premium for downside protection: the further OTM the put, the higher the IV. Plot the IV curve by strike and the left side clearly lifts upward.',
          },
          {
            type: 'choice',
            question: 'What is the fundamental reason index options consistently exhibit put skew?',
            options: [
              'The exchange charges higher fees for puts',
              'Crashes happen more often than a normal distribution predicts (fat tails), and institutions have persistent demand to buy puts for hedging',
              'Puts have a larger contract multiplier',
              'Market makers do not want to sell calls',
            ],
            correct: 1,
            explain:
              'After 1987, the market learned to price “crash insurance”: fat tails plus structural put-buying demand make downside protection consistently expensive.',
          },
          {
            type: 'tf',
            statement:
              'Under the assumptions of the BSM model, all strikes with the same expiration should have a single volatility.',
            answer: true,
            explain:
              'Correct. The existence of smiles and skew is itself evidence against BSM’s constant-volatility assumption — the market is pricing risks outside the model.',
          },
          {
            type: 'fill',
            before:
              'If you plot IV across strikes for the same expiration, the left side (lower strikes) in index options is usually',
            after: '.',
            options: ['higher', 'lower', 'zero', 'symmetric with the right side'],
            correct: 0,
            explain:
              'A lifted left side = OTM puts are more expensive = negative skew. Single-stock skew can look more symmetric (more like a smile), because individual stocks also carry upside explosion risk.',
          },
          {
            type: 'choice',
            question:
              'If skew suddenly steepens sharply (OTM put IV rises a lot relative to ATM IV), what does that usually imply?',
            options: [
              'The market is extremely optimistic',
              'Demand for hedging is rising, and the market is scrambling to buy protection against downside risk',
              'Dividends are about to increase',
              'Liquidity is improving',
            ],
            correct: 1,
            explain:
              'Skew is one of the market’s fear gauges: when hedgers rush into OTM puts, skew can “change its face” before price does.',
          },
          {
            type: 'match',
            prompt: 'Match each skew-related concept with its meaning',
            pairs: [
              ['Volatility smile', 'A curve showing different IVs across strikes'],
              ['Put skew', 'OTM puts have higher IV'],
              ['Fat tails', 'Extreme moves happen more often than a normal distribution predicts'],
              ['Steepening skew', 'A sign that hedging demand is heating up'],
            ],
          },
        ],
      },
      {
        id: 'u9l2',
        analogy:
          'In normal times, tomorrow’s weather is fairly predictable while next year’s is not (so longer-dated IV is higher). But when a typhoon warning hits, “tomorrow” suddenly feels scarier than “next year” — front-month IV jumps above back-month IV, and that inversion is fear itself.',
        diagram: 'termStructure',
        title: 'IV Term Structure',
        tips: [
          'Term structure is the IV curve across different expirations for the same underlying. In normal times it is usually “front low, back high” (contango); in panic it flips to “front high, back low” (backwardation).',
          'Event-driven bumps: the expiration covering earnings week will often show a standalone IV hump, which collapses after the event — event volatility is priced precisely into the contracts that actually include it.',
          'Longer-dated options have larger Vega and smaller Theta; front-month options are the opposite. Choosing an expiration is essentially choosing which segment of volatility you want to buy or sell.',
          'Calendar spreads are the tool for trading term structure directly: sell the faster-decaying front month, buy the slower-decaying back month, and bet on front-month IV easing or on the time-spread edge.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'In normal market conditions, what shape does IV term structure usually take?',
            options: [
              'Front month higher, back month lower (backwardation)',
              'Front month lower, back month higher (contango)',
              'All expirations are exactly the same',
              'Completely random, with no pattern',
            ],
            correct: 1,
            explain:
              'In calm markets, short-term uncertainty is smaller and long-term uncertainty is bigger, so the curve slopes upward; when panic arrives, front-month IV spikes and the curve inverts.',
          },
          {
            type: 'tf',
            statement:
              'During market panic, IV term structure often flips from contango into backwardation.',
            answer: true,
            explain:
              'Correct. A crisis is a “right now” problem: front-month IV jumps above back-month IV, inverting the curve — one of the classic ways to gauge panic.',
          },
          {
            type: 'choice',
            question:
              'If earnings are two weeks away, which expiration will usually show the clearest IV “bump”?',
            options: [
              'This week’s expiration (which expires before earnings)',
              'The nearest expiration that actually covers the earnings date',
              'LEAPS expiring a year later',
              'All expirations rise equally',
            ],
            correct: 1,
            explain:
              'Event volatility belongs only to contracts that actually include the event: options expiring before earnings do not “catch” that move, so they do not contain the earnings premium.',
          },
          {
            type: 'fill',
            before:
              'Longer-dated options are more sensitive to changes in volatility (larger Vega), while front-month options have more intense',
            after: '.',
            options: ['time decay (Theta)', 'contract multiplier', 'strike price', 'dividend adjustment'],
            correct: 0,
            explain:
              'Vega grows with time to expiration, while Theta grows as expiration approaches. Picking an expiration means balancing Vega exposure against Theta burden.',
          },
          {
            type: 'choice',
            question:
              'A “sell front month + buy back month at the same strike” calendar spread is most directly trading what?',
            options: [
              'Direction of the stock price',
              'The IV and time-decay difference between two expirations',
              'The size of dividends',
              'FX moves',
            ],
            correct: 1,
            explain:
              'A calendar spread profits from the faster Theta of the front month and from front-month IV easing relative to the back month — it is the most direct way to express a view on term structure.',
          },
          {
            type: 'tf',
            statement:
              'After an event such as earnings, the IV bump in the expiration covering that event usually collapses quickly.',
            answer: true,
            explain:
              'Correct. Once the event is over, the uncertainty disappears, and the IV premium in that expiration evaporates instantly — a localized IV crush.',
          },
        ],
      },
      {
        id: 'u9l3',
        analogy:
          'The insurance company’s secret is that premiums collected are, over time, slightly higher than claims paid out (that is VRP). But you only get to earn that spread if your reserves are still intact on the day the once-in-a-century hurricane arrives. Insurance companies that cannot preserve reserves never make it to the long run.',
        title: 'Volatility Risk Premium',
        tips: [
          'Realized volatility (RV) is the volatility that actually happens afterward; implied volatility (IV) is the market’s pricing beforehand. Over long periods, IV tends to average above the subsequent RV.',
          'That difference is called the volatility risk premium (VRP): options are like insurance, where buyers systematically overpay a little premium and sellers collect that excess over time.',
          'VRP is the theoretical basis for the positive long-run expectancy of selling strategies such as covered calls, short puts, and iron condors — but that premium is compensation for occasional severe losses, not a free lunch.',
          'Selling volatility is like picking up nickels in front of a steamroller: small gains most of the time, and then one day you get run over. Position sizing determines whether you live long enough to harvest the long-run premium.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'What does volatility risk premium (VRP) refer to?',
            options: [
              'The difference between option commissions and fees',
              'The portion by which implied volatility is, on average, higher than the realized volatility that follows',
              'The difference between front-month and back-month IV',
              'The spread between calls and puts',
            ],
            correct: 1,
            explain:
              'The systematically “too expensive” part of IV is VRP — the extra premium insurance buyers pay on average, and the long-run source of seller profits.',
          },
          {
            type: 'tf',
            statement:
              'Over long-term statistics, the implied volatility of index options tends to average above the volatility that is later realized.',
            answer: true,
            explain:
              'Correct. This is a widely documented empirical pattern, which is why VRP underpins systematic premium-selling strategies.',
          },
          {
            type: 'fill',
            before: 'Volatility calculated afterward from actual price data is called',
            after: ' volatility.',
            options: ['realized', 'implied', 'historical average', 'risk-free'],
            correct: 0,
            explain:
              'Realized volatility is fact; implied volatility is expectation. Comparing the two is the starting point for volatility trading.',
          },
          {
            type: 'choice',
            question:
              'If VRP is positive in the long run, why is it still dangerous to “mindlessly sell options”?',
            options: [
              'Because VRP is actually negative',
              'Because the premium is compensation for occasional huge losses: one tail event can wipe out years of small gains',
              'Because sellers pay more tax',
              'Because exchanges restrict sellers from opening positions',
            ],
            correct: 1,
            explain:
              'Sellers have a negatively skewed payoff distribution: small gains for long stretches, then the occasional huge loss. Without position control, a positive expectancy can still end in ruin.',
          },
          {
            type: 'choice',
            question:
              'What is a relatively effective way to judge whether conditions are favorable for premium-selling strategies right now?',
            options: [
              'Only look at whether the stock is up or down',
              'Compare current IV to recent realized volatility, and also look at IV Rank',
              'Trade whichever contract has the highest volume',
              'Follow the latest news headline',
            ],
            correct: 1,
            explain:
              'When IV is clearly above RV and IV Rank is elevated, the premium you are selling is relatively richer; if not, the edge for sellers is thinner.',
          },
          {
            type: 'match',
            prompt: 'Match each volatility concept with its role',
            pairs: [
              ['Implied volatility', 'Expected volatility priced in beforehand'],
              ['Realized volatility', 'Actual volatility measured afterward'],
              ['VRP', 'The long-run gap where IV exceeds RV'],
              ['Seller risk', 'Negatively skewed returns with occasional large losses'],
            ],
          },
        ],
      },
    ],
  },
  u10: {
    id: 'u10',
    title: 'Unit 10 · Advanced Greeks and the Market-Maker View',
    subtitle: 'Second-order Greeks, gamma hedging flows, and margin',
    color: '#e5484d',
    colorDark: '#bd3a3e',
    icon: '🔬',
    lessons: [
      {
        id: 'u10l1',
        analogy:
          'First-order Greeks are the dashboard readings; second-order Greeks are the manual explaining how the dashboard itself drifts. The speedometer (Delta) shifts on its own with time (Charm), and becomes more sensitive when the weather changes (Vanna). As expiration approaches, every needle starts shaking wildly.',
        title: 'Second-Order Greeks',
        tips: [
          'Vanna measures how Delta changes when IV changes (and equivalently how Vega changes when the stock price changes). OTM options are especially affected by Vanna.',
          'Charm (Delta decay) measures how Delta changes as time passes. Near expiration, the Delta of OTM options accelerates toward 0, while ITM options accelerate toward ±1.',
          'Vomma measures how Vega itself changes when IV changes — deep OTM options have large Vomma, so when IV spikes they “accelerate upward” in price.',
          'Retail traders do not need to calculate these precisely, but they should have the intuition: near expiration and during large IV shocks, a position’s directional exposure can “drift on its own.”',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'What does Vanna measure?',
            options: [
              'The effect of stock-price changes on Gamma',
              'The effect of IV changes on Delta (equivalently, the effect of stock-price changes on Vega)',
              'The effect of interest-rate changes on price',
              'The effect of time passing on Theta',
            ],
            correct: 1,
            explain:
              'Vanna is Delta’s sensitivity to IV. When IV moves sharply, your directional exposure can change even if the stock price does not.',
          },
          {
            type: 'fill',
            before: 'The Greek that measures how Delta changes as time passes is called',
            after: '.',
            options: ['Charm', 'Vomma', 'Rho', 'Lambda'],
            correct: 0,
            explain:
              'Charm is also called Delta decay: even if you do nothing, Delta drifts every day — especially in the final days before expiration.',
          },
          {
            type: 'tf',
            statement:
              'As expiration approaches, the Delta of OTM options accelerates toward 0, while the Delta of ITM options accelerates toward ±1.',
            answer: true,
            explain:
              'Correct. At expiration, everything becomes binary: either it gets exercised (|Delta| → 1) or it expires worthless (Delta → 0). Charm is strongest right near expiry.',
          },
          {
            type: 'choice',
            question:
              'When IV surges, which type of option can become expensive faster because of the Vomma effect?',
            options: ['Deep ITM options', 'ATM options', 'Deep OTM options', 'Expired options'],
            correct: 2,
            explain:
              'Deep OTM options have large Vomma: rising IV not only increases their price through Vega, but also increases Vega itself — which is why “lottery-ticket” puts can explode during panic.',
          },
          {
            type: 'tf',
            statement:
              'Once you know Delta and Vega, second-order Greeks are meaningless for understanding position behavior.',
            answer: false,
            explain:
              'Wrong. First-order Greeks are only a snapshot of the current moment; second-order Greeks explain why that snapshot drifts, especially near expiration and during large IV shocks.',
          },
          {
            type: 'match',
            prompt: 'Match each second-order Greek with what it measures',
            pairs: [
              ['Vanna', 'IV change → Delta change'],
              ['Charm', 'Time passing → Delta change'],
              ['Vomma', 'IV change → Vega change'],
              ['Gamma', 'Stock-price change → Delta change'],
            ],
          },
        ],
      },
      {
        id: 'u10l2',
        analogy:
          'When market makers are long gamma, they are like a trampoline: wherever the market jumps, part of the force gets absorbed (they sell into rallies and buy into dips), making price action sticky. When they are short gamma, it is more like a seesaw — the more it swings, the more they have to swing with it, amplifying volatility.',
        title: 'Gamma Hedging and Market Flows',
        tips: [
          'After taking your option order, market makers typically hedge the Delta immediately using the underlying stock, leaving themselves with Gamma/Theta/Vega exposure — they earn the spread, not a directional bet.',
          'When market makers are net long gamma, they sell when the stock rises and buy when it falls — their hedging behavior suppresses volatility, and price can get pinned near strikes with large open interest.',
          'When market makers are net short gamma, they must chase the move — buying into rallies and selling into drops — so their hedging amplifies volatility and can push the market to extremes.',
          'A long-gamma strategy such as a long straddle can, with active Delta hedging, “sell high and buy low” to monetize realized volatility; this is gamma scalping, and the hedging profits must exceed the Theta you pay.',
        ],
        exercises: [
          {
            type: 'choice',
            question:
              'After filling your option order, what do market makers usually do first?',
            options: [
              'Bet on the same direction as you',
              'Hedge out Delta with the underlying stock and keep only volatility-related exposure',
              'Immediately file for exercise',
              'Resell the contract to the exchange',
            ],
            correct: 1,
            explain:
              'A market maker’s business model is to earn bid-ask spread and price volatility, not to take a directional view — Delta hedging is instinctive.',
          },
          {
            type: 'choice',
            question:
              'When market makers as a group are in a long-gamma position, what does their hedging tend to do?',
            options: [
              'Amplify market volatility',
              'Suppress market volatility (sell into rallies, buy into dips)',
              'Have no connection to volatility',
              'Cause trading halts',
            ],
            correct: 1,
            explain:
              'Long-gamma hedging is counter-trend: selling high and buying low acts like a shock absorber, often making price action sticky and causing pinning near heavily traded strikes.',
          },
          {
            type: 'tf',
            statement:
              'When market makers as a group are short gamma, their hedging can chase the move and amplify market volatility.',
            answer: true,
            explain:
              'Correct. Short-gamma hedging is pro-trend: the more the market rises, the more they have to buy; the more it falls, the more they have to sell. Extreme moves often resonate with this dynamic.',
          },
          {
            type: 'fill',
            before:
              'The phenomenon where the stock price gets “pulled” toward the strike with the largest open interest on expiration day is called',
            after: '.',
            options: ['Pinning', 'IV Crush', 'Short squeeze', 'Ex-dividend'],
            correct: 0,
            explain:
              'A strike with a large concentration of Gamma acts like a magnet: market makers’ counter-trend hedging keeps pushing price back toward it, so many expirations settle nearby.',
          },
          {
            type: 'choice',
            question:
              'What condition must be met for gamma scalping (holding a straddle and repeatedly Delta hedging) to make money?',
            options: [
              'The stock must trend sharply upward',
              'The hedging profits from realized volatility must exceed the Theta paid each day',
              'IV must be zero',
              'It is always profitable if held to expiration',
            ],
            correct: 1,
            explain:
              'It is a race between realized volatility and time cost: only if the stock swings enough can the buy-low/sell-high hedging profits cover the time decay.',
          },
          {
            type: 'tf',
            statement:
              'Market-maker hedging flows that retail traders cannot directly see are sometimes the true driver of short-term price action.',
            answer: true,
            explain:
              'Correct. The options market is huge, and hedging flows can materially influence the underlying, especially near expiration and around strikes with concentrated open interest.',
          },
        ],
      },
      {
        id: 'u10l3',
        analogy:
          'Margin is like a bank’s umbrella: on sunny days they force it into your hands, but when it starts raining they immediately take it back. The moment markets are most fearful — when you most need capital — is exactly when margin requirements explode. That is why you must keep your buffer on sunny days.',
        title: 'Margin and Forced Liquidation',
        tips: [
          'Reg-T margin is calculated position by position using fixed formulas; Portfolio Margin stress-tests the entire portfolio as a whole, so well-hedged combinations can require dramatically less capital.',
          'Margin on naked short options expands when the market moves against you: the double squeeze of mark-to-market losses plus rising margin requirements often forces sellers to close at the worst possible prices.',
          'For spread strategies, margin is usually the maximum loss (locked in). That is the practical reason beginners should start with spreads rather than naked premium selling.',
          'Always leave a margin buffer: an account that runs margin at full capacity has effectively handed liquidation control over to the broker’s risk system.',
        ],
        exercises: [
          {
            type: 'choice',
            question:
              'What is the core difference between Portfolio Margin and Reg-T?',
            options: [
              'Portfolio Margin requires no capital at all',
              'It measures risk by stress-testing the entire portfolio, so hedged positions use far less capital than position-by-position formulas',
              'It only applies to stocks',
              'Its rates are higher',
            ],
            correct: 1,
            explain:
              'Portfolio Margin simulates scenarios like the market moving ±X% and uses the worst-case loss as margin. It reflects net risk much more realistically, so hedged portfolios benefit enormously.',
          },
          {
            type: 'tf',
            statement:
              'After selling naked options, if the market moves against you, margin requirements may rise along with the losses.',
            answer: true,
            explain:
              'Correct. Larger losses plus expanding margin is the classic path to a seller blow-up: being forced to buy back the position at peak panic prices.',
          },
          {
            type: 'fill',
            before:
              'For vertical spread strategies, margin usage is usually equal to the spread’s',
            after: '.',
            options: ['maximum loss', 'maximum profit', 'twice the premium', 'notional value'],
            correct: 0,
            explain:
              'Locked-in risk means locked-in margin — which makes spreads a sensible starting point for smaller accounts that want defined-risk premium selling.',
          },
          {
            type: 'choice',
            question:
              'What is the main danger of running an account above 95% margin usage for long periods?',
            options: [
              'Interest costs are slightly higher',
              'An ordinary market move can trigger a margin call or force the broker to liquidate you at market prices',
              'You cannot participate in IPOs',
              'It hurts your credit score',
            ],
            correct: 1,
            explain:
              'An account with no buffer hands life and death to the broker’s risk algorithm. Forced liquidation never picks a good price and often sells near the lows.',
          },
          {
            type: 'choice',
            question:
              'During a volatility spike, what is the most common way naked premium sellers blow up?',
            options: [
              'They make too much money and get restricted',
              'Losses and expanding margin squeeze them at the same time, forcing liquidation at the worst prices',
              'The contracts get canceled',
              'The exchange goes bankrupt',
            ],
            correct: 1,
            explain:
              'When IV surges, both paper losses and margin requirements swell; the forced-liquidation wave can then push IV even higher, reinforcing the cycle.',
          },
          {
            type: 'match',
            prompt: 'Match each margin concept with its characteristic',
            pairs: [
              ['Reg-T', 'Fixed formula by individual position'],
              ['Portfolio Margin', 'Whole-portfolio stress testing determines risk'],
              ['Spread margin', 'Equal to the defined maximum loss'],
              ['Margin buffer', 'A moat against forced liquidation'],
            ],
          },
        ],
      },
    ],
  },
  u11: {
    id: 'u11',
    title: 'Unit 11 · Time-Spreads and Advanced Strategies',
    subtitle: 'Calendars, diagonals, ratio spreads, and synthetic positions',
    color: '#00a8a8',
    colorDark: '#008787',
    icon: '🧩',
    lessons: [
      {
        id: 'u11l1',
        analogy:
          'A calendar spread is like becoming a sublandlord: you lease a place for a year (buy the back month), then rent it out week by week (sell the front month). Weekly rent is more expensive on a per-day basis, so the profit comes from the difference in rental periods; if no one wants the place anymore (the stock moves too far away), both leases can become a problem.',
        diagram: 'calendar',
        title: 'Calendar and Diagonal Spreads',
        tips: [
          'A calendar spread means selling the front month and buying the back month at the same strike. Front-month Theta decays faster than back-month Theta, and that time spread is the source of profit.',
          'A calendar spread fears two things most: the stock moving far away from the strike, and back-month IV falling (because the position is net long Vega).',
          'A diagonal spread uses different expirations and different strikes, combining a directional view with time-spread income.',
          'The poor man’s covered call (PMCC) buys a deep ITM long-dated LEAPS call instead of stock, then sells near-term OTM calls against it — recreating a covered-call structure with much less capital.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'What is the structure of a classic calendar spread?',
            options: [
              'Buy and sell different strikes in the same expiration',
              'Sell the front month and buy the back month at the same strike',
              'Buy the front month and sell the back month at the same strike',
              'Buy a call and a put at the same time',
            ],
            correct: 1,
            explain:
              'You sell the faster-decaying front month and hold the slower-decaying back month, earning the difference in Theta. Profit is highest when the stock stays near the strike.',
          },
          {
            type: 'tf',
            statement:
              'A calendar spread is net long Vega overall: rising back-month IV helps the position.',
            answer: true,
            explain:
              'Correct. The back-month leg has much more Vega than the front-month leg, so the net volatility exposure is positive. If IV rises broadly, the calendar spread gains value.',
          },
          {
            type: 'choice',
            question: 'What is the ideal expiration scenario for a calendar spread?',
            options: [
              'The stock surges far above the strike',
              'The stock crashes far below the strike',
              'At front-month expiration, the stock sits right near the strike',
              'The underlying gets delisted',
            ],
            correct: 2,
            explain:
              'The front-month option expires worthless so the short leg wins fully, while the back-month option retains maximum time value. Large moves away from the strike hurt both sides.',
          },
          {
            type: 'fill',
            before:
              'The structure that replaces stock with a deep ITM LEAPS call and then sells a near-term OTM call against it is commonly called',
            after: '.',
            options: ['poor man’s covered call (PMCC)', 'iron condor', 'reverse straddle', 'box arbitrage'],
            correct: 0,
            explain:
              "Poor man’s covered call: a LEAPS option with Delta near 1 can mimic stock with a fraction of the capital while still generating covered-call style income.",
          },
          {
            type: 'choice',
            question: 'When selecting the LEAPS leg for a PMCC, what is typically recommended?',
            options: [
              'Buy the cheapest deep OTM option',
              'Buy a deep ITM option (around 0.8 Delta) with roughly a year to expiration',
              'Buy a weekly option expiring this week',
              'Pick randomly',
            ],
            correct: 1,
            explain:
              'Deep ITM means high Delta and a smaller share of pure time value, so it behaves more like stock; longer duration keeps Theta manageable and lets you repeatedly sell near-term calls against it.',
          },
          {
            type: 'match',
            prompt: 'Match each time-spread strategy with its feature',
            pairs: [
              ['Calendar spread', 'Same strike, profits from the time spread'],
              ['Diagonal spread', 'Different expirations + different strikes'],
              ['PMCC', 'A covered-call substitute using LEAPS instead of stock'],
              ['Calendar spread enemies', 'Large price drift + falling back-month IV'],
            ],
          },
        ],
      },
      {
        id: 'u11l2',
        analogy:
          'A ratio spread is like tailoring a suit: you sculpt the payoff curve into the shape that best fits your market script — tighter here, looser there. But the extra piece of fabric you cut away (the naked short leg) leaves one zone completely exposed, and on windy days you will feel it.',
        title: 'Ratio and Backspreads',
        tips: [
          'A ratio spread uses a structure such as buy 1, sell 2. The extra naked short leg can make profits rich in a moderate move, but a runaway move can create severe losses.',
          'A backspread reverses that ratio, such as sell 1, buy 2. It bets on an accelerating breakout or collapse: small moves lose money, but if the move is big enough, upside is uncapped.',
          'At their core, both structures “sculpt” a payoff curve for a specific price zone: you accept losses in one range in exchange for outsized returns in another.',
          'Any ratio structure with a net naked short leg still inherits naked-option risk and must be sized by naked-option standards.',
        ],
        exercises: [
          {
            type: 'choice',
            question:
              'In a 1×2 call ratio spread (buy 1 ATM call and sell 2 OTM calls), what scenario is most dangerous?',
            options: [
              'A small drop',
              'A sideways market',
              'A moderate rally toward the short strike',
              'A violent rally far beyond the short strike',
            ],
            correct: 3,
            explain:
              'The extra naked short call has unlimited risk in a runaway rally. A moderate rise is the sweet spot; an explosive rally is the disaster zone.',
          },
          {
            type: 'tf',
            statement:
              'A backspread can have uncapped profits if the directional move becomes large enough.',
            answer: true,
            explain:
              'Correct. The extra long option provides unlimited upside if the move accelerates enough; the tradeoff is that mild price action usually loses money.',
          },
          {
            type: 'choice',
            question:
              'What kind of outlook fits a call backspread (sell 1 ATM call and buy 2 OTM calls)?',
            options: [
              'A slow drift downward',
              'A market that either goes nowhere or explodes higher — an acceleration scenario',
              'A perfectly flat market',
              'IV must definitely fall',
            ],
            correct: 1,
            explain:
              'In a major rally the extra long calls take off; the worst case is when price climbs just enough to approach the long strikes and then stalls — the payoff trough lives right there.',
          },
          {
            type: 'fill',
            before:
              'The unhedged extra short leg in a ratio spread is, in essence, a',
            after: ', so position size must be controlled by that standard.',
            options: ['naked option sale', 'covered position', 'cash equivalent', 'risk-free arbitrage'],
            correct: 0,
            explain:
              'No matter how fancy the structure looks, a naked leg is still a naked leg. A naked call has unlimited risk, and a naked put has very large risk — do not let the word “spread” lull you into complacency.',
          },
          {
            type: 'choice',
            question:
              'What is the core reason traders use ratio spreads and backspreads?',
            options: [
              'To eliminate all risk',
              'To sculpt payoffs across different price zones according to their market script, sacrificing one zone to overweight another',
              'To reduce commissions',
              'To extend expiration',
            ],
            correct: 1,
            explain:
              'The essence of advanced strategy is payoff design: concentrate a limited risk budget on the scenario you believe in most strongly.',
          },
          {
            type: 'tf',
            statement:
              'A 1×2 ratio spread can sometimes be opened for zero cost or even a net credit.',
            answer: true,
            explain:
              'Correct. The premium from selling two options can often cover the cost of buying one — the “free” entry is paid for by the tail risk of the naked short leg.',
          },
        ],
      },
      {
        id: 'u11l3',
        analogy:
          'A collar is like putting a leash on a dog: it cannot run away (the put sets a floor), but it also cannot run too far (the call caps the upside). You give up the freedom of a huge run in exchange for insurance against losing the dog, which makes the walk much calmer.',
        diagram: 'collar',
        title: 'Collars and Synthetic Positions',
        tips: [
          'A collar means long stock + long OTM put + short OTM call. The income from the short call offsets the cost of the put, often making it possible to create low-cost or zero-cost protection.',
          'The tradeoff is that gains are capped at the call strike — a collar puts the stock’s P/L “inside a pipe,” with both upper and lower bounds.',
          'Synthetic positions come from put-call parity: long call + short put at the same strike is approximately equivalent to long stock; the reverse is approximately short stock.',
          'A box spread locks in a fixed expiration value by combining a bull spread and a bear spread; in substance it is an options-based lending or borrowing trade, with returns approximately tied to the risk-free rate.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'What is the full structure of a collar strategy?',
            options: [
              'Long stock + long call + short put',
              'Long stock + long OTM put + short OTM call',
              'Only buy a straddle',
              'Sell all the stock',
            ],
            correct: 1,
            explain:
              'The put provides downside protection, while the short call helps pay for that protection — a classic structure for institutions and large shareholders managing existing positions.',
          },
          {
            type: 'tf',
            statement:
              'A “zero-cost collar” means the protection has no cost at all.',
            answer: false,
            explain:
              'Wrong. The cash cost may be zero, but the opportunity cost is real: once the stock rises above the call strike, all additional upside has been given away.',
          },
          {
            type: 'choice',
            question:
              'By put-call parity, “long a call + short a put” at the same strike and expiration is equivalent to what?',
            options: [
              'Short stock',
              'Approximately long stock (a synthetic long)',
              'Holding cash',
              'Buying a straddle',
            ],
            correct: 1,
            explain:
              'That is a synthetic long: Delta is roughly +1, and the payoff line is very close to owning stock. It is often used for capital efficiency or to work around stock-holding constraints.',
          },
          {
            type: 'fill',
            before:
              'The arbitrage structure made from a bull spread plus a bear spread, with a fixed value at expiration, is called a',
            after: '.',
            options: ['box spread', 'iron butterfly', 'kite spread', 'Christmas tree'],
            correct: 0,
            explain:
              'A box spread always expires to the strike difference. Buying a box is like lending, selling a box is like borrowing, and implied interest rates drive its pricing.',
          },
          {
            type: 'choice',
            question:
              'If a large shareholder wants to protect unrealized gains but cannot sell the stock yet, what structure is most commonly used?',
            options: ['Max out leverage and buy more', 'A collar', 'Sell naked puts', 'Buy more stock'],
            correct: 1,
            explain:
              'A collar can lock the stock into a price range without actually selling it, making it a standard risk-management tool when there are lockup or tax constraints.',
          },
          {
            type: 'match',
            prompt: 'Match each structure with its equivalent or defining feature',
            pairs: [
              ['Long call + short put (same strike)', 'Synthetic long stock'],
              ['Long stock + long put + short call', 'Collar: bounded on both sides'],
              ['Box spread', 'Lending/borrowing trade with fixed expiration value'],
              ['Synthetic short', 'Short call + long put (same strike)'],
            ],
          },
        ],
      },
    ],
  },
} as const;
