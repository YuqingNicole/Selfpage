export const optionsEnU1U4 = {
  u1: {
    id: 'u1',
    title: 'Unit 1 · What Are Options?',
    subtitle: 'Understand the essence of options: rights, obligations, and contract terms',
    color: '#58cc02',
    colorDark: '#46a302',
    icon: '🌱',
    lessons: [
      {
        id: 'u1l1',
        analogy:
          'An option is like putting down a deposit on a home purchase agreement: you pay a small deposit to lock in the house price. If prices surge later, you can still buy at the original price (exercise). If prices fall, you can simply walk away and only lose the deposit (the premium). But the developer or seller, after taking your deposit, must sell to you if you choose to buy.',
        diagram: 'buyerSeller',
        title: 'Rights and Obligations',
        tips: [
          'An option is a contract: the buyer pays a premium in exchange for the right, not the obligation, to buy or sell the underlying asset at an agreed price in the future.',
          'A call option gives the buyer the right to buy the underlying asset; a put option gives the buyer the right to sell the underlying asset.',
          'The option seller collects the premium but takes on an obligation: if the buyer exercises, the seller must fulfill the contract.',
          'The buyer’s maximum loss is the premium paid; the seller’s maximum profit is the premium received, while the seller’s risk can be much larger than the reward.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'What does an option buyer receive?',
            options: [
              'An obligation that must be fulfilled',
              'The right to buy or sell the underlying in the future',
              'Ownership of the underlying asset',
              'A fixed interest return',
            ],
            correct: 1,
            explain:
              'The option buyer pays a premium in exchange for a right, not an obligation—they can choose to exercise or let it expire.',
          },
          {
            type: 'tf',
            statement:
              'A call option buyer has the right to buy the underlying asset at the strike price before expiration.',
            answer: true,
            explain:
              'Correct. A call gives the buyer the right to buy the underlying at the strike price. With American-style options, this can be exercised on any trading day before expiration.',
          },
          {
            type: 'fill',
            before: 'A put option gives the buyer the right to',
            after: 'the underlying asset at the strike price.',
            options: ['sell', 'buy', 'hold', 'borrow'],
            correct: 0,
            explain:
              'Put = the right to sell. If you are worried about a stock price falling, buying a put can lock in a selling price.',
          },
          {
            type: 'choice',
            question: 'What is the maximum loss for an option buyer?',
            options: [
              'Unlimited',
              'Strike price × contract size',
              'The premium paid',
              'The full value of the underlying asset',
            ],
            correct: 2,
            explain:
              'The worst-case outcome for the buyer is to let the option expire and lose the entire premium. Limited loss with high upside potential is a key trait of option buying.',
          },
          {
            type: 'match',
            prompt: 'Match each role with its characteristic',
            pairs: [
              ['Option buyer', 'Pays premium and receives rights'],
              ['Option seller', 'Collects premium and takes on obligation'],
              ['Call', 'The right to buy the underlying'],
              ['Put', 'The right to sell the underlying'],
            ],
          },
          {
            type: 'tf',
            statement:
              'An option seller can choose to refuse performance when the buyer exercises.',
            answer: false,
            explain:
              'Incorrect. Once the seller accepts the premium, they have the obligation to perform if the buyer exercises. They do not have the right to refuse.',
          },
        ],
      },
      {
        id: 'u1l2',
        analogy:
          'An option contract is like a movie ticket: it tells you which theater it is for (the underlying asset), which showtime (expiration date), and what the seat price is (strike price), while the ticket price itself is the premium. Once the showtime has passed, the ticket is worthless.',
        title: 'The Four Core Contract Terms',
        tips: [
          'An option contract is defined by four core elements: the underlying asset, strike price, expiration date, and premium.',
          'The strike price is the agreed buy or sell price in the contract; after the expiration date, the contract becomes worthless.',
          'The premium is the market price of the option, paid by the buyer to the seller, and it fluctuates daily with the market.',
          'For U.S. stock options, one contract usually represents 100 shares of the underlying stock, so a quote of $2.50 means one contract costs $250.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'Which of the following is not a core term of an option contract?',
            options: ['Strike price', 'Expiration date', 'Underlying asset', 'Company dividend rate'],
            correct: 3,
            explain:
              'The four core terms are the underlying, strike price, expiration date, and premium. Dividends affect pricing, but they are not part of the contract terms themselves.',
          },
          {
            type: 'fill',
            before: 'The agreed future transaction price in an option contract is called the',
            after: '.',
            options: ['strike price', 'premium', 'market price', 'face value'],
            correct: 0,
            explain:
              'The strike price is the fixed transaction price written into the option contract and used if the option is exercised.',
          },
          {
            type: 'choice',
            question: 'A U.S. stock option is quoted at $3.20. How much premium must you pay to buy one contract?',
            options: ['$3.20', '$32', '$320', '$3,200'],
            correct: 2,
            explain:
              'One U.S. stock option contract usually equals 100 shares, so the actual cost is quote × 100 = $320.',
          },
          {
            type: 'tf',
            statement:
              'If an option is not exercised by expiration, it automatically expires worthless and the buyer loses the premium.',
            answer: true,
            explain:
              'Correct. Expiration is the end point: an out-of-the-money option expires at zero, and the buyer loses the full premium.',
          },
          {
            type: 'match',
            prompt: 'Match each term with its definition',
            pairs: [
              ['Strike price', 'The agreed buy or sell price in the contract'],
              ['Expiration date', 'The date the contract becomes invalid'],
              ['Premium', 'The market price of the option'],
              ['Underlying asset', 'The stock or index the contract refers to'],
            ],
          },
          {
            type: 'choice',
            question: 'In “AAPL Call expiring 2026-09-18 with a $200 strike,” what does $200 refer to?',
            options: ['Premium', 'Strike price', 'Apple’s stock price', 'Contract multiplier'],
            correct: 1,
            explain:
              '$200 is the strike price: the buyer has the right to buy 100 shares of AAPL at $200 per share before expiration.',
          },
        ],
      },
      {
        id: 'u1l3',
        analogy:
          'Buying stock is like buying the whole house outright—the house is yours indefinitely. Buying an option is like paying a small amount for the right to buy the house later at a fixed price. If house prices rise, that right becomes more valuable. If prices fall, you can simply walk away and only lose the deposit. But the right has an expiration date; the house does not.',
        diagram: 'stockVsCall',
        title: 'Options vs. Stocks vs. Futures',
        tips: [
          'Buying stock means directly owning the asset with no expiration date; buying an option means holding a right that eventually expires.',
          'In futures, both sides have obligations; in options, only the seller has an obligation, while the buyer only has a right.',
          'Options come with built-in leverage: you can control exposure to 100 shares with a relatively small premium, which magnifies both gains and losses.',
          'Options are wasting assets: even if the stock price does not move, time passing will reduce the option’s value.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'What is the most fundamental difference between options and futures?',
            options: [
              'Futures have no leverage',
              'An option buyer has rights but no obligation, while both sides of a futures contract have obligations',
              'Options cannot be traded on indexes',
              'Futures do not expire',
            ],
            correct: 1,
            explain:
              'Both sides of a futures contract must perform at expiration. An option buyer can choose to walk away. That is the core difference.',
          },
          {
            type: 'tf',
            statement: 'A stock position has no expiration date, while an option contract always expires.',
            answer: true,
            explain:
              'Correct. Stocks can be held indefinitely, while options are like melting ice cubes—time is their enemy.',
          },
          {
            type: 'fill',
            before: 'Even if the stock price does not move at all, an option can still lose value because of',
            after: '.',
            options: ['the passage of time', 'lower trading volume', 'higher dividends', 'zero interest rates'],
            correct: 0,
            explain:
              'This is called time decay. Part of an option’s value is time value, and that time value is consumed every day.',
          },
          {
            type: 'choice',
            question: 'Why do we say options come with built-in leverage?',
            options: [
              'Because the broker forces you to borrow',
              'Because a small premium can control the price exposure of 100 shares',
              'Because option fees are lower',
              'Because options are less volatile than stocks',
            ],
            correct: 1,
            explain:
              'By paying a few hundred dollars in premium, you can control stock exposure worth many thousands of dollars. Gains and losses are magnified proportionally—this is the double-edged nature of leverage.',
          },
          {
            type: 'tf',
            statement: 'Buying options can lose more than the premium you paid.',
            answer: false,
            explain:
              'Incorrect. The maximum loss for a simple long option is the premium paid. Losses beyond the initial amount are a risk of selling options, not buying them.',
          },
          {
            type: 'match',
            prompt: 'Match each instrument with its feature',
            pairs: [
              ['Stock', 'Direct ownership of the asset, no expiration'],
              ['Option buyer', 'Has rights but no obligation, and the contract expires'],
              ['Futures', 'Both sides have performance obligations'],
              ['Option seller', 'Collects premium and takes on performance obligation'],
            ],
          },
        ],
      },
    ],
  },
  u2: {
    id: 'u2',
    title: 'Unit 2 · The Four Basic Positions',
    subtitle: 'Profit and loss structures of buying and selling calls and puts',
    color: '#1cb0f6',
    colorDark: '#1899d6',
    icon: '📈',
    lessons: [
      {
        id: 'u2l1',
        analogy:
          'Imagine paying $5 for the right to buy a limited-edition pair of sneakers for $100. If the resale price jumps to $130, your right is worth $30. If the sneakers never become popular, the right expires worthless and you only lose $5. Paying a little for a chance at a big upside—that is a Long Call.',
        diagram: 'longCall',
        title: 'Long Call',
        tips: [
          'A Long Call means buying a call when you expect the stock to rise. The more the stock price rises, the more you can profit.',
          'Break-even at expiration = strike price + premium. The stock must rise above this level before the trade is truly profitable at expiration.',
          'Maximum loss = premium paid if the stock does not rise or falls; theoretical maximum profit is unlimited.',
          'Example: if the stock is $100 and you buy a $105 strike call for $2, the break-even at expiration is $107.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'When is it appropriate to open a Long Call position?',
            options: [
              'When you expect the stock price to fall sharply',
              'When you expect the stock to stay flat',
              'When you expect the stock price to rise',
              'When you expect volatility to fall',
            ],
            correct: 2,
            explain:
              'A Long Call is the most direct bullish tool: if your directional view is right and the move is large enough, the return can far exceed your initial cost.',
          },
          {
            type: 'fill',
            before: 'The break-even point at expiration for a Long Call = strike price +',
            after: '.',
            options: ['premium', 'stock price', 'margin', 'fee rate'],
            correct: 0,
            explain:
              'You pay the premium up front, so the stock has to rise above strike price + premium before you begin to make a net profit.',
          },
          {
            type: 'choice',
            question:
              'The stock is $50. You pay $3 for a $55 strike call. If the stock is $60 at expiration, what is the profit or loss per share?',
            options: ['+$10', '+$5', '+$2', '-$3'],
            correct: 2,
            explain:
              'Intrinsic value at expiration = 60 - 55 = $5. Subtract the $3 cost and the net profit is $2 per share, or $200 per contract.',
          },
          {
            type: 'tf',
            statement: 'The theoretical maximum profit of a Long Call is unlimited.',
            answer: true,
            explain:
              'Correct. A stock price has no upside cap, so the intrinsic value of a call can keep increasing as the stock rises.',
          },
          {
            type: 'choice',
            question: 'If the stock price is below the strike price at expiration, what happens to a Long Call?',
            options: ['It is automatically rolled to next month', 'You lose the entire premium', 'You must post additional margin', 'It converts into stock'],
            correct: 1,
            explain:
              'An out-of-the-money call expires worthless, and the buyer loses the full premium. That is also the buyer’s maximum possible loss.',
          },
          {
            type: 'tf',
            statement:
              'As long as the stock price is above the strike price at expiration, a Long Call is always profitable overall.',
            answer: false,
            explain:
              'Incorrect. If the stock is between the strike price and the break-even point, exercising only recovers part of the premium, so the overall trade still loses money.',
          },
        ],
      },
      {
        id: 'u2l2',
        analogy:
          'It is like buying a guaranteed buyback agreement for a used car: you lock in the right to sell it back to the dealer for $100,000 at any time. If the car’s market value crashes to $60,000, that agreement is worth $40,000. The harder the price falls, the more valuable the agreement becomes.',
        diagram: 'longPut',
        title: 'Long Put',
        tips: [
          'A Long Put means buying a put when you expect the stock to fall. The more the stock price falls, the more you can profit.',
          'Break-even at expiration = strike price - premium.',
          'Maximum loss = premium paid; maximum profit = strike price - premium if the stock falls to zero.',
          'A Long Put is also often used as insurance for an existing stock position: stock + put = a guaranteed floor price for your shares.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'Under what market condition does a Long Put profit the most?',
            options: ['A sharp stock rally', 'A flat stock price', 'A large stock decline', 'A drop in volatility'],
            correct: 2,
            explain:
              'A put is a bearish instrument: once the stock falls below the break-even point, the deeper it falls, the more you profit.',
          },
          {
            type: 'fill',
            before: 'The break-even point at expiration for a Long Put = strike price -',
            after: '.',
            options: ['premium', 'stock price', 'intrinsic value', 'margin'],
            correct: 0,
            explain:
              'The stock must fall below strike price - premium before a Long Put begins to make a net profit at expiration.',
          },
          {
            type: 'choice',
            question:
              'The stock is $80. You pay $4 for a $75 strike put. If the stock is $65 at expiration, what is the profit or loss per share?',
            options: ['+$10', '+$6', '+$4', '-$4'],
            correct: 1,
            explain:
              'Intrinsic value = 75 - 65 = $10. Subtract the $4 cost and the net profit is $6 per share.',
          },
          {
            type: 'tf',
            statement: 'The maximum profit of a Long Put is unlimited.',
            answer: false,
            explain:
              'Incorrect. A stock can only fall to zero, so the maximum profit is limited to strike price - premium, though it can still be very large.',
          },
          {
            type: 'match',
            prompt: 'Match each position with its break-even point at expiration',
            pairs: [
              ['Long Call', 'Strike price + premium'],
              ['Long Put', 'Strike price - premium'],
              ['Maximum loss for a buyer', 'Premium'],
              ['Maximum profit for a put', 'Strike price - premium'],
            ],
          },
          {
            type: 'choice',
            question:
              'If you hold 100 shares of stock and also buy 1 put, what is this combination most similar to?',
            options: ['Leveraged long exposure', 'Buying insurance and setting a floor price on the stock', 'Shorting the stock', 'Collecting rent'],
            correct: 1,
            explain:
              'This is a Protective Put: no matter how far the stock falls, you can still sell it at the strike price, which locks in your maximum drawdown.',
          },
        ],
      },
      {
        id: 'u2l3',
        analogy:
          'Selling options is like running an insurance company: collecting premiums feels great most of the time, but one big storm can wipe out many small gains at once. Naked call selling is like insuring something whose price has no upper limit—the most dangerous kind of policy.',
        diagram: 'shortCallPut',
        title: 'Selling Options (Short)',
        tips: [
          'Selling or writing an option means collecting premium and betting that the option will expire worthless.',
          'A naked call has theoretically unlimited loss because the stock price can rise without limit. It is the most dangerous single-leg position.',
          'The maximum loss of a short put = strike price - premium if the stock falls to zero. The risk is large but finite.',
          'Option sellers usually have a higher win rate, but a poor reward-to-risk ratio: many small gains can be wiped out by one occasional large loss.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'Which single-leg position has theoretically unlimited maximum loss?',
            options: ['Long Call', 'Long Put', 'Naked Call', 'Short Put'],
            correct: 2,
            explain:
              'With a naked call, an unlimited stock price rise creates unlimited losses, so it must be handled with extreme caution or covered with stock.',
          },
          {
            type: 'tf',
            statement: 'The maximum profit for an option seller is the premium received.',
            answer: true,
            explain:
              'Correct. The best-case scenario for the seller is that the option expires worthless and they keep the full premium. Profit is capped.',
          },
          {
            type: 'fill',
            before: 'The maximum loss of selling a put = strike price -',
            after: ' (if the stock falls to zero).',
            options: ['premium', 'stock price', 'margin', 'time value'],
            correct: 0,
            explain:
              'If the stock falls to zero, the seller still has to buy it at the strike price, so the loss equals strike price minus the premium already received.',
          },
          {
            type: 'choice',
            question: 'Why do we say option sellers have a “high win rate but poor payoff ratio”?',
            options: [
              'Because sellers pay higher fees',
              'Because most options expire worthless and let sellers keep the premium, but a single large loss can erase many small gains',
              'Because sellers cannot close positions early',
              'Because sellers do not need margin',
            ],
            correct: 1,
            explain:
              'Most options do expire worthless, so sellers often make money. But profits are capped while risk exposure is large, so one extreme market move can be very painful.',
          },
          {
            type: 'tf',
            statement: 'After selling an option, you cannot close the position early and must hold it until expiration.',
            answer: false,
            explain:
              'Incorrect. A seller can buy back the same contract at any time to close the position, lock in profit or loss, and remove the obligation.',
          },
          {
            type: 'match',
            prompt: 'Match the four basic positions with their directional outlooks',
            pairs: [
              ['Long Call', 'Strongly bullish'],
              ['Long Put', 'Strongly bearish'],
              ['Short Call', 'Not bullish (flat or down)'],
              ['Short Put', 'Not bearish (flat or up)'],
            ],
          },
        ],
      },
    ],
  },
  u3: {
    id: 'u3',
    title: 'Unit 3 · What Value Is Made Of',
    subtitle: 'In the money / out of the money, intrinsic value, and time value',
    color: '#ce82ff',
    colorDark: '#a568cc',
    icon: '💎',
    lessons: [
      {
        id: 'u3l1',
        analogy:
          'Imagine a coupon that lets you buy an iPhone for $100. If the market price is $120, the coupon clearly has $20 of real value—it is in the money. If the market price is $99, it is about at the money. If the market price is $80, it is currently useless—out of the money. But if expiration is still far away, who knows whether the price may rise again?',
        diagram: 'moneyness',
        title: 'In the Money, At the Money, Out of the Money',
        tips: [
          'Moneyness describes the relationship between strike price and stock price: in the money (ITM), at the money (ATM), and out of the money (OTM).',
          'For calls, stock price > strike price means ITM; for puts, the opposite is true: stock price < strike price means ITM.',
          'At the money means the strike price is approximately equal to the current stock price, and time value is greatest there.',
          'Out-of-the-money options are cheaper and offer more leverage, but they also have a much higher chance of expiring worthless.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'If the stock is $120 and the call strike is $100, the call is:',
            options: ['Out of the money (OTM)', 'At the money (ATM)', 'In the money (ITM)', 'Impossible to tell'],
            correct: 2,
            explain:
              'A call is in the money when the strike price is below the stock price, because you could immediately buy the stock at $100 while it is worth $120 in the market.',
          },
          {
            type: 'choice',
            question: 'If the stock is $120 and the put strike is $100, the put is:',
            options: ['In the money (ITM)', 'Out of the money (OTM)', 'At the money (ATM)', 'Deep in the money'],
            correct: 1,
            explain:
              'A put is in the money only when the stock price is below the strike price. Selling at $100 when the market price is $120 has no value, so the put is out of the money.',
          },
          {
            type: 'fill',
            before: 'An option whose strike price is almost equal to the current stock price is called an',
            after: ' option.',
            options: ['at the money (ATM)', 'in the money (ITM)', 'out of the money (OTM)', 'European'],
            correct: 0,
            explain:
              'At the money means strike price is approximately equal to stock price. This is where time value and gamma are usually largest.',
          },
          {
            type: 'tf',
            statement: 'An out-of-the-money option will definitely be worthless at expiration.',
            answer: true,
            explain:
              'Correct. If it is still out of the money at expiration, there is no reason to exercise it, so its value goes to zero. That is the key risk of buying OTM options.',
          },
          {
            type: 'match',
            prompt: 'When the stock price is $50, match each contract with its status',
            pairs: [
              ['$45 Call', 'In the money (ITM)'],
              ['$55 Call', 'Out of the money (OTM)'],
              ['$55 Put', 'In the money (ITM)'],
              ['$50 Put', 'At the money (ATM)'],
            ],
          },
          {
            type: 'choice',
            question: 'Why do some traders prefer to buy out-of-the-money options?',
            options: [
              'Out-of-the-money options have no risk',
              'They are cheap and offer higher leverage, so returns can be huge if the direction is right',
              'Out-of-the-money options do not suffer time decay',
              'Out-of-the-money options must always be exercised at expiration',
            ],
            correct: 1,
            explain:
              'OTM options are cheap and offer large upside on a small investment. The trade-off is a low win rate—most OTM options expire worthless.',
          },
        ],
      },
      {
        id: 'u3l2',
        analogy:
          'Think of a concert ticket: the amount a scalper charges above face value is like intrinsic value, while the extra imagination of “the show is still three months away and could become even more popular” is like time value. The moment the concert starts, that imagination value drops to zero.',
        diagram: 'valueComposition',
        title: 'Intrinsic Value and Time Value',
        tips: [
          'Option price = intrinsic value + time value.',
          'Intrinsic value is the profit you could get by exercising immediately: for a call, max(stock price - strike price, 0); for a put, max(strike price - stock price, 0).',
          'Time value = premium - intrinsic value, reflecting the possibility that the option could become more valuable in the future.',
          'The price of out-of-the-money and at-the-money options is 100% time value; at expiration, time value goes to zero.',
        ],
        exercises: [
          {
            type: 'fill',
            before: 'Option price = intrinsic value +',
            after: '.',
            options: ['time value', 'strike price', 'margin', 'discount rate'],
            correct: 0,
            explain:
              'This is the most basic breakdown of option pricing. These two parts together make up the premium.',
          },
          {
            type: 'choice',
            question:
              'The stock is $108. A $100 strike call is priced at $11. What are its intrinsic value and time value?',
            options: ['$11 and $0', '$8 and $3', '$3 and $8', '$0 and $11'],
            correct: 1,
            explain:
              'Intrinsic value = 108 - 100 = $8, and time value = 11 - 8 = $3.',
          },
          {
            type: 'choice',
            question: 'What is the intrinsic value of an out-of-the-money option?',
            options: ['Equal to the premium', 'Negative', 'Zero', 'Equal to the strike price'],
            correct: 2,
            explain:
              'Intrinsic value can never be negative. If an option is out of the money, its intrinsic value is zero, and its entire price is time value.',
          },
          {
            type: 'tf',
            statement:
              'At the exact moment of expiration, an option’s time value goes to zero and only intrinsic value remains.',
            answer: true,
            explain:
              'Correct. No future means no time value. Value at expiration equals intrinsic value, which may be zero.',
          },
          {
            type: 'choice',
            question: 'The stock is $95. A $100 strike put is priced at $7. What is its time value?',
            options: ['$7', '$5', '$2', '$0'],
            correct: 2,
            explain:
              'Put intrinsic value = 100 - 95 = $5, so time value = 7 - 5 = $2.',
          },
          {
            type: 'tf',
            statement: 'The price of a deep in-the-money option is made up almost entirely of time value.',
            answer: false,
            explain:
              'Incorrect. Deep in-the-money options are made up mostly of intrinsic value, while their time value is relatively small. Time value is largest near at the money.',
          },
        ],
      },
      {
        id: 'u3l3',
        analogy:
          'An option is like an ice cream cone in your hand: no matter how nice the weather is, it is melting, and it melts faster as the end approaches. The buyer is running while holding the melting ice cream, and the seller stands at the finish line collecting the “melting fee.”',
        diagram: 'timeDecay',
        title: 'Time Decay',
        tips: [
          'Time decay means that as expiration approaches, time value keeps evaporating.',
          'Decay is not linear: at-the-money options usually see a much faster rate of decay during the final 30 to 45 days.',
          'Time is the enemy of buyers and the friend of sellers—sellers profit from time decay.',
          'When buying options, you need to give your directional view enough time to play out. “Right direction, wrong timing” is one of the most common ways buyers lose money.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'Who benefits from time decay?',
            options: ['Option buyers', 'Option sellers', 'The exchange', 'Everyone'],
            correct: 1,
            explain:
              'Each day that passes reduces the option’s time value and lightens the seller’s liability. Time is on the seller’s side.',
          },
          {
            type: 'tf',
            statement: 'An option’s time value decays at a constant rate, losing the same amount every day.',
            answer: false,
            explain:
              'Incorrect. Time decay accelerates significantly as at-the-money options approach expiration, especially in the last few weeks.',
          },
          {
            type: 'fill',
            before: 'Time decay for at-the-money options usually accelerates noticeably during the final',
            after: ' before expiration.',
            options: ['30–45 days', 'year', 'three years', 'hour'],
            correct: 0,
            explain:
              'In practice, the final 30 to 45 days are often the fastest Theta-burning stage, and short-dated options become extremely sensitive to time.',
          },
          {
            type: 'choice',
            question: 'For an option buyer, what is the most common reason for “being right on direction but still losing money”?',
            options: [
              'An exchange outage',
              'The move was too small or too slow, so time decay outweighed the growth in intrinsic value',
              'The premium was confiscated',
              'The seller defaulted',
            ],
            correct: 1,
            explain:
              'Buyers need the stock to move enough within a limited time. A slow, hesitant rise can be completely eaten up by time decay.',
          },
          {
            type: 'tf',
            statement: 'Even when the market is closed over the weekend, an option’s time value is still passing away.',
            answer: true,
            explain:
              'Correct. Calendar time keeps moving. Market makers often price in part of the weekend decay before the close on Friday.',
          },
          {
            type: 'match',
            prompt: 'Match each concept with its description',
            pairs: [
              ['Time decay', 'Time value evaporates as expiration approaches'],
              ['Buyer’s perspective', 'Time is the enemy'],
              ['Seller’s perspective', 'Time is the friend'],
              ['Decay speed', 'Accelerates for at-the-money options near expiration'],
            ],
          },
        ],
      },
    ],
  },
  u4: {
    id: 'u4',
    title: 'Unit 4 · How Options Are Priced',
    subtitle: 'Pricing factors, implied volatility, and put-call parity',
    color: '#ff9600',
    colorDark: '#e08600',
    icon: '⚖️',
    lessons: [
      {
        id: 'u4l1',
        analogy:
          'Option pricing is like car insurance pricing: the more expensive the car is (stock price), the lower the deductible or payout threshold is (strike price), the longer the coverage period is (time), and the more aggressively the driver behaves (volatility), the more expensive the premium becomes. Interest rates and dividends are like smaller service charges—less important, but still part of the calculation.',
        title: 'The Six Pricing Factors',
        tips: [
          'The six major factors that affect option prices are stock price, strike price, time remaining, volatility, risk-free interest rate, and dividends.',
          'When stock price rises, calls become more expensive and puts become cheaper; when more time remains, both calls and puts become more expensive.',
          'When volatility rises, both calls and puts become more expensive: bigger swings mean a greater chance for either type of option to end up in the money.',
          'Interest rates and dividends usually matter less: higher rates slightly help calls, while higher dividends slightly help puts.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'Which factor, when rising, makes both calls and puts more expensive at the same time?',
            options: ['Stock price', 'Volatility', 'Dividends', 'Strike price'],
            correct: 1,
            explain:
              'Volatility works in both directions. Bigger possible moves make both upside and downside options more likely to become valuable, so both get more expensive.',
          },
          {
            type: 'tf',
            statement: 'All else equal, an option with more time remaining is more expensive.',
            answer: true,
            explain:
              'Correct. More time means more opportunity, so time value is higher. That is why longer-dated options cost more than shorter-dated ones.',
          },
          {
            type: 'fill',
            before: 'When the stock price rises, calls become more expensive and puts become',
            after: '.',
            options: ['cheaper', 'more expensive', 'unchanged', 'worthless'],
            correct: 0,
            explain:
              'Call prices move positively with stock price, while put prices move negatively with stock price. That is exactly what the sign of Delta reflects.',
          },
          {
            type: 'choice',
            question: 'Among the six pricing factors, which usually has the smallest day-to-day impact in normal trading?',
            options: ['Stock price changes', 'Volatility changes', 'Small changes in the risk-free interest rate', 'Time remaining'],
            correct: 2,
            explain:
              'Rho, the sensitivity to interest rates, has very little impact on short-dated options and is often nearly irrelevant for day-to-day trading. Stock price, volatility, and time matter much more.',
          },
          {
            type: 'match',
            prompt: 'Match each factor change with its effect on option prices',
            pairs: [
              ['Stock price rises', 'Call prices rise'],
              ['Volatility rises', 'Both call and put prices rise'],
              ['Time passes', 'Both call and put prices fall'],
              ['Dividends increase', 'Put prices rise'],
            ],
          },
          {
            type: 'tf',
            statement: 'A call with a higher strike price is more expensive.',
            answer: false,
            explain:
              'Incorrect. The higher the strike price, the harder it is for a call to end up in the money, so the cheaper the call tends to be. For puts, higher strikes tend to be more expensive.',
          },
        ],
      },
      {
        id: 'u4l2',
        analogy:
          'When a typhoon warning is announced, umbrellas and insurance both become more expensive—just like implied volatility rising before earnings. Once the storm passes without much damage, prices collapse back to normal overnight. Buying the umbrella when the warning is loudest often means buying at the most expensive moment.',
        diagram: 'ivCrush',
        title: 'Implied Volatility',
        tips: [
          'Implied volatility (IV) is the market’s expectation of future volatility, backed out from current option prices. It is one of the most important yardsticks for how expensive or cheap an option is.',
          'High IV means options are expensive, which tends to favor selling strategies; low IV means options are cheap, which tends to favor buying strategies.',
          'Before events like earnings reports or product launches, IV usually rises. After the event passes, IV often drops sharply—this is called an IV crush.',
          'IV Rank and IV Percentile compare current IV to its range over the past year, which is often more meaningful than just looking at the absolute IV number.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'What does implied volatility (IV) reflect?',
            options: [
              'The actual volatility over the past year',
              'The market’s expectation of future volatility',
              'A stock’s dividend rate',
              'Exchange fees',
            ],
            correct: 1,
            explain:
              'IV is the expected future volatility implied by current option prices. Historical volatility looks backward; IV looks forward.',
          },
          {
            type: 'tf',
            statement: 'Before an earnings announcement, the IV of that stock’s options usually rises.',
            answer: true,
            explain:
              'Correct. The market expects earnings to create a large move, and that uncertainty increases option demand and pushes IV higher.',
          },
          {
            type: 'fill',
            before: 'The sharp drop in option prices caused by IV collapsing after earnings is called',
            after: '.',
            options: ['IV crush', 'time decay', 'a short squeeze', 'an ex-rights adjustment'],
            correct: 0,
            explain:
              'IV crush happens when uncertainty disappears and IV drops instantly. Even if the buyer guessed the direction correctly, they can still lose money if IV collapses.',
          },
          {
            type: 'choice',
            question:
              'You buy an at-the-money call before earnings. After earnings, the stock rises only 1%, but the option loses 30%. What is the most likely reason?',
            options: ['The trading system failed', 'IV crush: implied volatility collapsed', 'A dividend adjustment', 'A forced liquidation'],
            correct: 1,
            explain:
              'Before the event, IV premium was very high. After the event, IV collapsed, and a small stock gain was not enough to offset the loss caused by falling volatility.',
          },
          {
            type: 'choice',
            question: 'What does an IV Rank of 90% mean?',
            options: [
              'Current IV is near the high end of its one-year range',
              'The stock has risen 90% over the past year',
              'The option ranks in the top 10% by trading volume',
              'There is a 90% chance the option will be exercised',
            ],
            correct: 0,
            explain:
              'An IV Rank of 90 means current IV is higher than it has been during most of the past year. Options are relatively expensive, so seller strategies may have more edge.',
          },
          {
            type: 'tf',
            statement:
              'A general rule is to buy options when IV is low and sell options when IV is high.',
            answer: true,
            explain:
              'Correct. Just like shopping, you generally want to buy when something is cheap and sell when it is expensive—though you still need to combine that with a directional view.',
          },
        ],
      },
      {
        id: 'u4l3',
        analogy:
          'The Black-Scholes model is like a translation machine: it translates an option’s price into volatility so different contracts can all be compared using the same ruler. Put-call parity is like a balance scale—if the two sides get out of line, arbitrage traders immediately step in and bring it back into balance.',
        title: 'Pricing Models and Put-Call Parity',
        tips: [
          'The Black-Scholes model gives a theoretical option price by taking stock price, strike price, time, volatility, and interest rates as inputs.',
          'Its most important practical use is not calculating price itself, but backing implied volatility out of the market price.',
          'Put-call parity says that for options with the same strike and expiration, Call - Put = Stock price - present value of strike price, linking four assets together.',
          'If parity breaks, arbitrage opportunities appear, so in liquid markets the relationship is almost always maintained.',
        ],
        exercises: [
          {
            type: 'choice',
            question: 'What is the most common practical use of the Black-Scholes model?',
            options: [
              'Predicting tomorrow’s stock price',
              'Backing implied volatility out of the market price of options',
              'Calculating a company’s market capitalization',
              'Choosing a dividend date',
            ],
            correct: 1,
            explain:
              'In the market, Black-Scholes is used as a translator: it converts option prices into implied volatility so traders can compare richness or cheapness across different contracts.',
          },
          {
            type: 'tf',
            statement:
              'The Black-Scholes model takes stock price, strike price, time to expiration, volatility, and interest rates as inputs.',
            answer: true,
            explain:
              'Correct. These five inputs, plus dividends when relevant, determine the theoretical price. The only major input that cannot be directly observed is volatility.',
          },
          {
            type: 'fill',
            before: 'The pricing relationship that links calls and puts with the same strike and expiration is called',
            after: '.',
            options: ['put-call parity', 'capital asset pricing', 'the efficient market hypothesis', 'the Kelly criterion'],
            correct: 0,
            explain:
              'Put-call parity says C - P = the present value of S - K. If it is violated, risk-free arbitrage exists, so the market usually corrects it quickly.',
          },
          {
            type: 'choice',
            question:
              'According to put-call parity, the payoff structure of “long stock + long put” is equivalent to:',
            options: ['Short call', 'Long call + cash', 'Short put', 'Short stock'],
            correct: 1,
            explain:
              'Stock + protective put is approximately equivalent to a call plus cash. Both create a synthetic structure with downside protection and upside participation.',
          },
          {
            type: 'tf',
            statement:
              'If the model’s theoretical price and the market price differ, the market price must be wrong.',
            answer: false,
            explain:
              'Incorrect. Market prices may include information the model does not capture, such as event expectations, supply and demand, or skew. In practice, traders usually treat the market price as given and let IV explain the difference.',
          },
          {
            type: 'match',
            prompt: 'Match each tool with its function',
            pairs: [
              ['Black-Scholes', 'A theoretical option pricing model'],
              ['Implied volatility', 'Expected volatility implied by market prices'],
              ['Put-call parity', 'The pricing constraint linking calls and puts'],
              ['Arbitrage traders', 'The force that keeps parity relationships in line'],
            ],
          },
        ],
      },
    ],
  },
} as const;
