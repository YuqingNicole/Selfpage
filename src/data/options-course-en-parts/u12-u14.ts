export const optionsEnU12U14 = {
  u12: {
    id: 'u12',
    title: 'Unit 12 · Advanced Trade Management',
    subtitle: 'Rolling, earnings-event trading, and trading systems',
    color: '#b58900',
    colorDark: '#8f6c00',
    icon: '🎓',
    lessons: [
      {
        id: 'u12l1',
        analogy:
          'Rolling is like renegotiating a lease before it expires: renewing early gives you room to act calmly, while waiting until move-out day forces a rushed decision. But remember—renewing should help you live better, not help you pretend you never made a bad choice.',
        title: 'Rolling and Position Adjustment',
        tips: [
          'A roll means closing the current contract and simultaneously opening a new one with a later expiration and/or different strike. It extends the trade or repositions it, but at its core it is simply “close one trade + open a new trade.”',
          'For short premium traders, a common defensive rule is to roll outward for more premium when the position is being tested, and move the strike as well if necessary.',
          'Many sellers follow the “21 DTE rule”: close or roll at around 21 days to expiration to avoid the most extreme phase of Gamma risk.',
          'Every roll should be evaluated independently: if you did not already hold this position today, would you still open it? If not, close it. Rolling should not be a tool for refusing to admit you are wrong.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'What does it actually mean to “roll” an options position?',
            options: [
              'Apply to the exchange for an extension',
              'Close the current contract and simultaneously open a new contract with a later expiration date or a different strike',
              'Transfer the contract to a friend',
              'Wait for it to renew automatically',
            ],
            correct: 1,
            explain:
              'Options do not have an “extend” button. Rolling means one closing trade plus one opening trade, often executed together as a spread order.',
          },
          {
            type: 'tf',
            statement:
              'If a short Put is being tested as the stock approaches the strike, rolling it to a farther expiration can often bring in additional net premium.',
            answer: true,
            explain:
              'Correct. Farther-dated options contain more time value, so rolling outward is often done for a net credit—using time to buy space.',
          },
          {
            type: 'fill',
            before: 'Many options sellers choose to close or roll at about',
            after: 'days before expiration to avoid near-expiration Gamma risk.',
            options: ['21', '90', '2', '365'],
            correct: 0,
            explain:
              'In the final three weeks, Gamma and Charm can expand sharply around at-the-money strikes, turning P&L into a coin flip. Taking most of the profit early is often the higher-probability decision.',
          },
          {
            type: 'choice',
            question:
              'A credit spread has already captured 80% of its maximum profit with 30 days left to expiration. What is the textbook response?',
            options: [
              'Always hold to expiration to collect the full 100%',
              'Close early to lock in profits and rotate capital and risk into new opportunities',
              'Double the position size',
              'Convert it into a naked short position',
            ],
            correct: 1,
            explain:
              'You would be risking 30 more days of tail risk just to earn the last 20% of profit. That is a poor risk/reward trade-off.',
          },
          {
            type: 'tf',
            statement:
              'As long as you keep rolling a losing position to farther expirations, it never really counts as a loss.',
            answer: false,
            explain:
              'Incorrect. This is one of the most dangerous forms of self-deception: rolling can lock up buying power and expand exposure, allowing losses to snowball if the trend never reverses.',
          },
          {
            type: 'match',
            prompt: 'Match each adjustment scenario with the sensible action',
            pairs: [
              ['Short Put is being tested', 'Roll outward for additional premium'],
              ['Approaching 21 DTE', 'Proactively close or roll'],
              ['Most of the profit has already been captured', 'Lock it in early and redeploy capital'],
              ['The original thesis has been invalidated', 'Admit the mistake and close instead of rolling forever'],
            ],
          },
        ],
      },
      {
        id: 'u12l2',
        analogy:
          'Trading earnings is like guessing the size of a cash gift when the market has already written a price tag on the envelope. You do not make money by merely guessing the outcome—you make money only if your estimate is better than the market’s. If the market prices in an 8% move and you have a solid reason to believe it will move only 4%, then you may have an edge.',
        title: 'Earnings and Event Trading',
        tips: [
          'Expected Move is approximately the price of the nearest at-the-money straddle. It represents the market’s cash-priced expectation for the likely move range.',
          'Earnings trading is fundamentally a comparison: the move you expect versus the move already priced into the options. You only have an edge when your view differs meaningfully from market pricing.',
          'Buying a straddle into earnings means you must win twice: the actual move must exceed the implied move, and it must be large enough to overcome the loss from IV crush.',
          'Short premium event structures such as iron condors or wide strangles are betting that the actual move will be smaller than the move already priced in. The win rate can be decent, but one outsized move can still produce max loss.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'How can you quickly estimate the market’s expected move for an earnings event?',
            options: [
              'Read the news headlines',
              'Look at the total price of the nearest at-the-money straddle (Call + Put)',
              'Look at the stock move from the previous quarter',
              'Look at trading volume',
            ],
            correct: 1,
            explain:
              'The at-the-money straddle price is a quick approximation of the market’s expected absolute move. If the stock is at $100 and the straddle costs $8, the market is pricing roughly a ±8% move.',
          },
          {
            type: 'tf',
            statement:
              'As long as the stock moves in the correct direction after earnings, buying a straddle will definitely make money.',
            answer: false,
            explain:
              'Incorrect. A straddle does not bet on direction; it bets on magnitude. If the move is smaller than what was already priced in, IV crush can shrink both legs at the same time.',
          },
          {
            type: 'choice',
            question:
              'A stock is at $200 and the at-the-money straddle for earnings week trades at $14. What expected move is the market pricing in?',
            options: ['±1.4%', '±7%', '±14%', '±28%'],
            correct: 1,
            explain:
              '14 / 200 = 7%. If the stock has historically moved only 4% to 5% on earnings, that suggests the straddle may be rich and short-volatility structures may be more attractive.',
          },
          {
            type: 'fill',
            before: 'The core comparison in earnings trading is your expected move versus the move already',
            after: 'into the options.',
            options: ['priced', 'forbidden', 'seen last year', 'seen every day'],
            correct: 0,
            explain:
              'Without a view that differs from market pricing, any earnings trade is just a coin flip. Your edge comes only from being more accurate than the price.',
          },
          {
            type: 'choice',
            question:
              'Which short-premium structure tries to benefit from “post-earnings IV collapse plus actual movement smaller than expected”?',
            options: [
              'Buy a straddle before earnings',
              'Sell an iron condor or wide strangle before earnings and close it quickly after the event',
              'Chase the stock higher with long Calls after earnings',
              'Do not trade options at all',
            ],
            correct: 1,
            explain:
              'You collect the event premium, then buy it back after the event once implied volatility collapses—while recognizing that the payoff is negatively skewed and one explosive move can produce max loss.',
          },
          {
            type: 'tf',
            statement:
              'If a stock’s historical earnings moves are consistently larger than the implied move priced into the options, then buying a straddle has a statistical edge.',
            answer: true,
            explain:
              'Correct. That is the idea of “buying cheap volatility”: if actual movement exceeds priced movement, the expectancy can be positive—assuming the market has not already corrected for it.',
          },
        ],
      },
      {
        id: 'u12l3',
        analogy:
          'Think like a casino owner, not a gambler: the owner does not care about the result of one hand. The goal is simply to make sure every game has positive expectancy and that no single table is large enough to threaten the entire casino. Then the law of large numbers can do its work.',
        title: 'Trading Systems and Psychology',
        tips: [
          'Expectancy = win rate × average win − (1 − win rate) × average loss. Positive expectancy, enough repetitions, and staying alive are the entire secret of long-term profitability.',
          'Position sizing matters more than prediction. The Kelly criterion gives the theoretical optimal size, but in practice traders often use half-Kelly or less to protect against estimation error.',
          'A trading journal is your only real mirror: record your entry reason, planned exit, actual execution, and emotional state. Mistakes you do not review are mistakes you will repeat.',
          'The four most expensive psychological biases are the disposition effect, revenge trading, overconfidence when sizing up, and mistaking luck for skill.',
        ],
        exercises: [
          {
            type: 'choice',
            question:
              'A strategy has a 40% win rate, an average win of $300, and an average loss of $100. What is its expectancy?',
            options: ['Negative expectancy, not tradable', 'About +$60 per trade, positive expectancy', 'About -$60 per trade', 'Impossible to calculate'],
            correct: 1,
            explain:
              '0.4 × 300 − 0.6 × 100 = 120 − 60 = +$60 per trade. A low win rate can still produce a good strategy if the payoff ratio is strong enough.',
          },
          {
            type: 'tf',
            statement:
              'A strategy with an 80% win rate is automatically better than a strategy with a 40% win rate.',
            answer: false,
            explain:
              'Incorrect. A strategy that wins 80% of the time can still have negative expectancy if one loss wipes out many winners. You must always evaluate the full product of win rate and payoff ratio.',
          },
          {
            type: 'fill',
            before: 'In practice, traders often use “half-',
            after: '” or even more conservative sizing to guard against estimation error in win rates and payoffs.',
            options: ['Kelly', 'position size', 'margin', 'leverage'],
            correct: 0,
            explain:
              'The Kelly formula is extremely sensitive to parameter error. The penalty for overbetting is much larger than the penalty for underbetting. Half-Kelly gives up a little growth for a much larger safety margin.',
          },
          {
            type: 'choice',
            question:
              'What is the classic behavior of “holding losing trades too long while taking profits too quickly”?',
            options: ['Value investing', 'Disposition effect', 'Momentum strategy', 'Grid trading'],
            correct: 1,
            explain:
              'The disposition effect causes traders to systematically cut profits short and let losses run—the exact opposite of what a positive-expectancy approach requires.',
          },
          {
            type: 'choice',
            question:
              'After being stopped out twice in a row, what is the most correct next move?',
            options: [
              'Immediately double your size to win it back',
              'Execute the next planned trade or pause to review—never revenge trade',
              'Delete the trading journal',
              'Switch to an even more leveraged product',
            ],
            correct: 1,
            explain:
              'Revenge trading means emotion has taken control of the system. After a losing streak, the first priority is confirming that the system is still sound and your emotions are back in line—not recovering your pride.',
          },
          {
            type: 'match',
            prompt: 'Match each trading-system concept with its role',
            pairs: [
              ['Expectancy', 'The product of win rate and payoff ratio'],
              ['Half-Kelly', 'Position-sizing discipline that guards against estimation error'],
              ['Trading journal', 'A mirror that helps ensure mistakes happen only once'],
              ['Disposition effect', 'The bias of cutting winners and letting losers run'],
            ],
          },
        ],
      },
    ],
  },
  u13: {
    id: 'u13',
    title: 'Unit 13 · Probabilistic Thinking',
    subtitle: 'tastylive Mechanics I: POP, 16 Delta, and the time window',
    color: '#f59f00',
    colorDark: '#c47f00',
    icon: '🎲',
    lessons: [
      {
        id: 'u13l1',
        title: 'Betting with Probabilities',
        diagram: 'onesd',
        analogy:
          'It is like how a professional poker player approaches the game: not “Will this hand win?” but “What are the odds of this hand winning, and what are the pot odds?” POP is your probability table. If you do not know the opening probability of profit for each trade, you cannot manage long-term performance.',
        tips: [
          'POP (Probability of Profit) is the probability, at the moment you open the trade, that it will be profitable at expiration. A short 16-delta option has a POP of about 84%.',
          'Delta has a second identity: it is also an approximation of the probability that the option will finish in the money. A 0.16 Delta option implies about a 16% chance of finishing ITM.',
          'Probability of touch is roughly 2 × Delta: the chance that the stock touches the strike before expiration is about twice the probability that it finishes ITM. A short 16-delta option may be tested about one-third of the time, and being touched does not mean the trade will ultimately lose.',
          'High POP does not mean high expectancy. Short premium trades often win frequently but lose big occasionally. What really matters is the product of win rate, payoff ratio, and tail risk.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'If you sell a 16-delta Put, what is its approximate POP at entry?',
            options: ['16%', '50%', '84%', '100%'],
            correct: 2,
            explain:
              'A 16-delta option has about a 16% chance of finishing in the money, so the seller’s probability of profit is roughly 1 − 16% = 84%.',
          },
          {
            type: 'fill',
            before: 'Rule of thumb: the probability that the stock touches the strike before expiration is about',
            after: '× Delta.',
            options: ['2', '0.5', '10', '1'],
            correct: 0,
            explain:
              'Probability of touch is about 2 × Delta. A short 16-delta option has around a 32% chance of being tested along the way, so being tested is normal and should not trigger panic.',
          },
          {
            type: 'tf',
            statement:
              'If the stock touches your strike during the trade, that means the trade will definitely end in a loss.',
            answer: false,
            explain:
              'Incorrect. The probability of touch is about twice the probability of finishing in the money, so more than half of the positions that are touched still end up profitable.',
          },
          {
            type: 'choice',
            question: 'Why is the statement “A trade with 95% POP must be a good trade” wrong?',
            options: [
              'POP cannot be calculated',
              'It ignores payoff ratio: that 5% losing outcome may be large enough to make expectancy negative',
              'A 95% POP is impossible',
              'Brokers do not allow those trades',
            ],
            correct: 1,
            explain:
              'Deep out-of-the-money naked shorts can have very high POP, but one tail loss can wipe out dozens of winners. Expectancy depends on the full combination of win rate and payoff ratio.',
          },
          {
            type: 'tf',
            statement:
              'Delta can be read both as price sensitivity and as an approximate probability of finishing in the money.',
            answer: true,
            explain:
              'Correct. This dual identity of Delta is why tastylive-style entry selection often uses Delta directly as a probability filter.',
          },
          {
            type: 'match',
            prompt: 'Match each probability concept with its numerical intuition',
            pairs: [
              ['16-delta short seller POP', 'About 84%'],
              ['16-delta probability of touch', 'About 32%'],
              ['At-the-money option Delta', 'About 0.50'],
              ['Expectancy', 'The product of win rate and payoff ratio'],
            ],
          },
        ],
      },
      {
        id: 'u13l2',
        title: '16 Delta and One Standard Deviation',
        analogy:
          'It is like deciding how high to build a river levee: a one-standard-deviation levee—the 16-delta strike—can hold back the flood in about 68% of years. The premium you collect is the flood-control tax: the higher the levee, the less tax you collect, but the lower the chance of being flooded.',
        tips: [
          'Expected Move is approximately one standard deviation: the range the market is pricing as the most likely future move, with roughly a 68% chance that the stock finishes inside it.',
          'The classic tastylive short strangle sells the 16-delta Call and the 16-delta Put, which is approximately selling at ±1 standard deviation. If the stock finishes between the strikes, you win, with a theoretical probability around 68%.',
          'Entry timing depends on IV Rank: when IVR is above 50, premiums are richer and mean reversion potential is greater, making it a prime window for sellers. When IVR is very low, premium selling becomes less attractive.',
          'Always check liquidity before strategy. Bid-ask spreads should be tight and open interest should be deep. tastylive-style mechanics are designed for the most liquid underlyings only.',
        ],
        exercises: [
          {
            type: 'choice',
            question:
              'If you sell a 16-delta option on both sides in a short strangle, what is the theoretical probability that the stock finishes between the two strikes at expiration?',
            options: ['16%', '32%', '68%', '95%'],
            correct: 2,
            explain:
              'There is about a 16% chance of finishing outside each side, so the middle range is about 100% − 16% − 16% = 68%, which matches the ±1 standard deviation coverage rate.',
          },
          {
            type: 'fill',
            before: 'A tastylive-style premium seller usually becomes aggressive only when IV Rank is above',
            after: '.',
            options: ['50', '5', '95', '0'],
            correct: 0,
            explain:
              'IVR above 50 means current implied volatility is in the upper half of its one-year range: premiums are richer, and volatility mean reversion is more likely to help you.',
          },
          {
            type: 'tf',
            statement:
              'Expected Move is roughly equal to one standard deviation and can be quickly estimated using the at-the-money straddle price.',
            answer: true,
            explain:
              'Correct. The at-the-money straddle price is a fast way to read the market’s one-sigma expectation.',
          },
          {
            type: 'choice',
            question:
              'If IV Rank is only 8, what is the standard mechanical response for a premium seller?',
            options: [
              'Double size to make up for the thin premium',
              'Reduce short-premium exposure or switch to other underlyings/strategies while waiting for IVR to rise',
              'Use market orders to get filled faster',
              'Sell even shorter-dated options',
            ],
            correct: 1,
            explain:
              'Low IVR means thin premium and greater risk of IV expansion. Half the system is knowing when not to trade.',
          },
          {
            type: 'choice',
            question: 'Why does tastylive repeatedly emphasize trading only the most liquid underlyings?',
            options: [
              'Because liquid underlyings never go down',
              'Tight spreads and deep open interest keep entry and adjustment costs low, which is essential for frequent position management',
              'Because regulators require it',
              'Because commissions are always zero',
            ],
            correct: 1,
            explain:
              'The 50% profit target and 21 DTE management rule both require you to move in and out easily. Wide spreads can eat the profit and break the entire system.',
          },
          {
            type: 'match',
            prompt: 'Match each system element with its key number',
            pairs: [
              ['Short strikes', '16 Delta on each side'],
              ['1σ coverage', 'About 68%'],
              ['IVR entry threshold', 'Above 50'],
              ['First screen for underlyings', 'Liquidity (tight spreads + high OI)'],
            ],
          },
        ],
      },
      {
        id: 'u13l3',
        title: 'Enter at 45 DTE, Exit at 21 DTE',
        diagram: 'dteWindow',
        analogy:
          'It is like picking fruit: at 45 days the fruit—time value—is still large and easy to harvest, and the sweet spot of Theta decay is just beginning. Once you have harvested half the value, you pack it up and sell it. You do not wait until the last few days, because overripe fruit can rot in your hands at any moment—that is Gamma risk.',
        tips: [
          'Entries are often placed around 45 DTE because time value is still rich and Theta decay is about to accelerate. This is the seller’s sweet spot.',
          'Profit-taking rule: close the trade once 50% of maximum profit has been captured. Research suggests this improves return per unit of time and significantly reduces drawdowns compared with holding to expiration.',
          'Time stop: close or roll at 21 DTE regardless of profit or loss. In the final three weeks, Gamma expands sharply and P&L starts to behave like a coin toss.',
          'Loss management: if the unrealized loss reaches about 2× the premium collected, consider stopping out or rolling defensively rather than fighting the trend indefinitely.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'In the tastylive framework, what is the classic entry timing?',
            options: ['Expiration day (0DTE)', 'About 45 DTE', 'About 700 DTE', 'Timing does not matter'],
            correct: 1,
            explain:
              'Around 45 DTE balances premium richness and accelerating Theta decay. Farther out, decay is too slow; closer in, Gamma becomes too dangerous.',
          },
          {
            type: 'fill',
            before: 'The mechanical profit target is to close once you have captured',
            after: 'of maximum profit.',
            options: ['50%', '100%', '10%', '200%'],
            correct: 0,
            explain:
              'Taking 50% of the profit gives up the riskier second half of the trade, often resulting in a better return on time.',
          },
          {
            type: 'tf',
            statement:
              'The main reason for “21 DTE management” is that Gamma risk expands sharply in the final three weeks.',
            answer: true,
            explain:
              'Correct. Near expiration, at-the-money positions can swing violently and the POP advantage deteriorates. Exiting early is often the higher-probability choice.',
          },
          {
            type: 'choice',
            question:
              'You collected $2 of premium on a short strangle. At what unrealized loss level does the mechanical stop typically trigger?',
            options: ['At a $0.5 loss', 'At about a $4 loss (2× the credit collected)', 'Never stop out', 'At a $40 loss'],
            correct: 1,
            explain:
              'The 2× credit stop means admitting the trade is wrong once the loss reaches twice the income from the trade, preventing one position from wiping out a month of gains.',
          },
          {
            type: 'tf',
            statement:
              'Since you can only collect 100% of the profit at expiration, a systematic premium seller should hold positions until they expire whenever possible.',
            answer: false,
            explain:
              'Incorrect. The back half of the profit must be earned during the most dangerous Gamma period, making the risk/reward unattractive. That is exactly why the 50% / 21 DTE framework exists.',
          },
          {
            type: 'match',
            prompt: 'Match each system milestone with the action',
            pairs: [
              ['45 DTE', 'Sweet spot for entry'],
              ['50% of max profit', 'Take profits and exit'],
              ['21 DTE', 'Close or roll regardless of P&L'],
              ['Loss reaches 2× collected premium', 'Stop out or defend'],
            ],
          },
        ],
      },
    ],
  },
  u14: {
    id: 'u14',
    title: 'Unit 14 · Systematic Trading',
    subtitle: 'tastylive Mechanics II: small sizing, portfolio checkups, and defense',
    color: '#3caea3',
    colorDark: '#2f8a81',
    icon: '⚙️',
    lessons: [
      {
        id: 'u14l1',
        title: 'Trade Small, Trade Often',
        analogy:
          'Running this style is like operating slot machines in a casino: the result of a single machine on a single night is random, but a thousand machines over a year will deliver the house edge with remarkable precision. Each of your small trades is one slot machine—only enough occurrences allow the probability edge to reveal itself.',
        tips: [
          'The law of large numbers is the engine of premium selling. A single 84% POP trade means almost nothing, but after hundreds of repetitions, your actual win rate can finally converge toward your statistical edge.',
          'Trade Small means each position should use only 1% to 5% of buying power. The size should be small enough that even a full loss does not hurt emotionally, allowing probability to work.',
          'Trade Often means executing mechanically whenever the setup appears, building repetitions through many small bets instead of making one oversized wager on a trade that feels “certain.”',
          'Always keep about 50% of buying power in reserve. It is both a cushion during extreme market moves and dry powder for opportunities when IV spikes.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'Why is “trade small, trade often” a prerequisite for probability-based trading?',
            options: [
              'Because small trades have lower commissions',
              'Because a probability edge pays out only over many repetitions, while one oversized trade can be ruined by variance',
              'Because more trades automatically create more experience',
              'Because brokers reward high trading volume',
            ],
            correct: 1,
            explain:
              'An 84% POP repeated 300 times can produce a relatively stable equity curve. The same POP with your entire account on one trade still leaves a 16% chance of severe damage. Repetition is what tames variance.',
          },
          {
            type: 'fill',
            before: 'The mechanical guideline is for each trade to use',
            after: 'of buying power.',
            options: ['1%~5%', '30%~50%', '80% or more', 'Exactly 100%'],
            correct: 0,
            explain:
              'Small size makes the worst-case outcome emotionally manageable, so you can execute the next trade without hesitation.',
          },
          {
            type: 'tf',
            statement:
              'Systematic premium sellers generally recommend leaving about half of buying power unused over the long run.',
            answer: true,
            explain:
              'Correct. That 50% dry powder can absorb margin expansion and also lets you add exposure when IV spikes and opportunities are best. Fully loaded traders can only watch.',
          },
          {
            type: 'choice',
            question:
              'If your last three short-premium trades all stopped out, what is the correct systematic response?',
            options: [
              'Abandon the entire system immediately',
              'Check whether execution matched the rules; if it did, continue—three losses are just statistical noise',
              'Make the next trade 10 times larger to recover the losses',
              'Switch to buying options exclusively',
            ],
            correct: 1,
            explain:
              'Even with an 84% win rate, three straight losses can still happen. A system should be judged over hundreds of occurrences, not over a sample of three.',
          },
          {
            type: 'tf',
            statement:
              'Breaking the rules and sizing up to 30% of buying power on a “high-conviction” opportunity is still consistent with systematic trading.',
            answer: false,
            explain:
              'Incorrect. “High conviction” is prediction thinking. The entire point of systematization is to prevent any single judgment from being powerful enough to damage the account.',
          },
          {
            type: 'match',
            prompt: 'Match each system principle with its purpose',
            pairs: [
              ['Trade Small', '1%~5% of buying power per trade'],
              ['Trade Often', 'Use repetition to realize the probability edge'],
              ['50% dry powder', 'Cushion plus offensive capital'],
              ['Law of large numbers', 'Win rate converges after hundreds of occurrences'],
            ],
          },
        ],
      },
      {
        id: 'u14l2',
        title: 'Give the Portfolio a Checkup',
        analogy:
          'It is like a medical checkup that focuses on a few vital signs: blood pressure (beta-weighted Delta) tells you your overall directional exposure, basal metabolism (Theta) tells you how much time value the account earns each day, and body-fat percentage (buying power usage) tells you how much room you have left. When those metrics are healthy, you do not need to panic over small illnesses in individual positions.',
        tips: [
          'Beta-weighted Delta converts all positions into equivalent SPY share exposure, giving you a single number that shows whether the account is net long or net short the market.',
          'A portfolio Theta target is often around 0.1% to 0.5% of net liquidation value per day. Too low means the system is not harvesting enough time decay; too high means short-premium risk is overloaded.',
          'Each day, focus on three portfolio metrics: beta-weighted Delta (direction), net Theta (engine), and buying power usage (leverage). The P&L of any one stock is often the least important thing to watch.',
          'Diversification is not just about how many symbols you hold. Ten highly correlated positions can behave like one giant position. True diversification comes from spreading across sectors and asset classes.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'What is the purpose of beta-weighted Delta?',
            options: [
              'To predict tomorrow’s price move',
              'To convert different positions into equivalent SPY share exposure so you can see the portfolio’s net direction clearly',
              'To calculate commissions',
              'To determine dividend dates',
            ],
            correct: 1,
            explain:
              'Each position has its own Delta, but beta-weighting lets you understand the entire account in one common market-based unit.',
          },
          {
            type: 'fill',
            before: 'A common daily Theta target for a systematic portfolio is about',
            after: 'of net liquidation value.',
            options: ['0.1%~0.5%', '5%~10%', '50%', '0%'],
            correct: 0,
            explain:
              'For a $100,000 account, that would be about $100 to $500 of daily time decay income. Below that the system may be underutilized; above that the risk may be overloaded.',
          },
          {
            type: 'tf',
            statement:
              'Holding ten short-premium positions in highly correlated tech stocks counts as good diversification.',
            answer: false,
            explain:
              'Incorrect. On a bad down day, they can all move together. Correlation—not count—is the real measure of diversification.',
          },
          {
            type: 'choice',
            question:
              'Your account has a beta-weighted Delta of +180 equivalent SPY shares, and you want to get closer to neutral. What is the systematic move?',
            options: [
              'Liquidate the whole account',
              'Add negative-Delta exposure, such as short Call spreads or long Puts, to push the net number toward 0',
              'Add more bullish positions',
              'Change brokers',
            ],
            correct: 1,
            explain:
              'Neutralizing does not require dismantling everything. You can simply add positions with offsetting Delta, which is the advantage of thinking at the portfolio level.',
          },
          {
            type: 'tf',
            statement:
              'The first thing a systematic trader should check every day is the P&L of each individual position.',
            answer: false,
            explain:
              'Incorrect. Start with the three portfolio metrics—direction, Theta, and leverage. If the portfolio is healthy, an unrealized loss in one position is often just statistical noise.',
          },
          {
            type: 'match',
            prompt: 'Match each portfolio metric with the question it answers',
            pairs: [
              ['Beta-weighted Delta', 'Is the portfolio net long or net short?'],
              ['Net Theta', 'How much time value is the account earning per day?'],
              ['Buying power usage', 'How much leverage is being used?'],
              ['Correlation', 'Is the diversification real or fake?'],
            ],
          },
        ],
      },
      {
        id: 'u14l3',
        title: 'The Defensive Playbook',
        analogy:
          'Think of it like a soccer team’s defensive board: when the opponent attacks down the left side—your Put side is being tested—you pull the right-back inward by rolling the Call side for more premium. Every situation has a rehearsed response; nothing is invented on the spot. The goal of defense is not to avoid every goal, but to keep every goal within a tolerable range.',
        tips: [
          'When one side of a short strangle is being tested, the first textbook defense is to roll the untested side closer to the stock price to collect additional premium and reduce the loss.',
          'If conditions continue to worsen, the position can be inverted by moving the Call strike below the Put strike. The total premium from both sides can then help offset the loss on the tested side. This is an advanced move and requires a clear understanding of max loss.',
          'Assignment on a short Put is not an accident—it is part of the system. Once you take delivery of the shares, you can transition into selling covered Calls to keep collecting premium and lower your cost basis. That is the Wheel strategy.',
          'No defense changes one basic truth: the real lifeline of the system is position size at entry. If the size is right, defense is optimization. If the size is wrong, defense is just struggling.',
        ],
        exercises: [
          {
            type: 'choice',
            question:
              'If the Put side of a short strangle is being tested by a stock decline, what is the textbook first defensive adjustment?',
            options: [
              'Immediately close the whole trade at market',
              'Roll down the Call side—the untested side—to collect more premium',
              'Double down by selling more Puts',
              'Do nothing and wait for expiration',
            ],
            correct: 1,
            explain:
              'By rolling the far-away Call closer, the extra premium raises the overall breakeven of the trade, using the safer side to subsidize the threatened side.',
          },
          {
            type: 'tf',
            statement:
              'An “inverted” short strangle means the Call strike is below the Put strike.',
            answer: true,
            explain:
              'Correct. After repeated defensive rolls, inversion can occur. As long as the total premium collected exceeds the inverted width, the trade may still escape without disaster.',
          },
          {
            type: 'choice',
            question:
              'If a cash-secured short Put is assigned and you take 100 shares, what is the next step in the Wheel strategy?',
            options: [
              'Panic and sell the shares immediately',
              'Sell covered Calls against the stock to keep collecting premium and lower your cost basis',
              'Sell ten more Puts to average down',
              'Stop trading entirely',
            ],
            correct: 1,
            explain:
              'The Wheel works like this: sell a Put for income, get assigned, sell Calls for income, get called away, then return to selling Puts. Assignment is just the next turn of the wheel.',
          },
          {
            type: 'fill',
            before: 'No defensive technique can replace',
            after: '—that is the true lifeline of the system.',
            options: ['position sizing at entry', 'faster internet speed', 'inside information', 'good luck'],
            correct: 0,
            explain:
              'With small size, defense is calm optimization. With oversized positions, defense becomes a drowning struggle. No defense can rescue an overloaded account.',
          },
          {
            type: 'tf',
            statement:
              'The philosophy of systematic trading is that the ability to predict market direction determines profitability.',
            answer: false,
            explain:
              'Incorrect. The tastylive philosophy is the opposite: assume no one can predict direction consistently, and replace prediction with probability, mechanics, and position-sizing discipline.',
          },
          {
            type: 'match',
            prompt: 'Match each defensive scenario with the mechanical response',
            pairs: [
              ['Put side is being tested', 'Roll the Call side for more premium'],
              ['Conditions keep worsening', 'Invert the short strangle to offset the damage'],
              ['Short Put gets assigned', 'Transition into covered Calls (the Wheel)'],
              ['Precondition for defense', 'Keep entry size small enough'],
            ],
          },
        ],
      },
    ],
  },
};
