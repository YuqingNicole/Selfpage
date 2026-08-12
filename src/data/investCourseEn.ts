import type { Unit } from './optionsCourse';

/** Investing Academy — Judgment track L1 (Market Language), English mirror of investCourse.ts */

export const investCourseEn: Unit[] = [
  {
    id: 'i1',
    title: 'Unit 1 · Market Cap vs Share Price',
    subtitle: 'A high price isn’t expensive; a low price isn’t cheap',
    color: '#58cc02',
    colorDark: '#46a302',
    icon: '💰',
    lessons: [
      {
        id: 'i1l1',
        title: 'Share price says nothing about value',
        tips: [
          'One Berkshire A share costs ~$600k; plenty of penny stocks trade under $1 — neither number tells you which is expensive.',
          'Expensive or cheap depends on what you pay for the whole company (market cap) versus what it earns.',
          'A split just cuts the pie into more slices: Nvidia’s 10-for-1 in June 2024 took the price from ~$1,200 to ~$120 and changed nothing about the company.',
          'Low prices are often a warning, not a discount: stocks under $1 face delisting risk.',
        ],
        analogy:
          'Think of a company as one whole pizza. Shop A cuts it into 4 slices at $10 each; shop B cuts it into 16 at $3. B looks "cheaper per slice", but the whole pizza costs $40 at A and $48 at B. You are buying part of the pizza — compare whole-pizza prices, not slice tags.',
        exercises: [
          {
            type: 'choice',
            question: 'After Nvidia’s 2024 10-for-1 split the price went from ~$1,200 to ~$120. What happened to the wealth of someone holding 1 share?',
            options: ['It shrank to 1/10', 'Unchanged: 1 share became 10, each worth 1/10', 'It grew — more people can afford it now', 'Depends on that day’s move'],
            correct: 1,
            explain: 'A split changes the slicing, not the value: 1×$1,200 = 10×$120. Splits create zero wealth by themselves.',
          },
          {
            type: 'tf',
            statement: 'A $600,000 Berkshire A share is necessarily "more expensive" than a $3 stock.',
            answer: false,
            explain: 'Per-share price only reflects how many slices exist. Valuation is about market cap versus earning power — the $3 stock may be wildly overpriced.',
          },
          {
            type: 'fill',
            before: 'To compare the size of two companies, compare',
            after: ', not the per-share price.',
            options: ['market cap', 'share price', 'trading volume', 'number of shareholders'],
            correct: 0,
            explain: 'Market cap = price × share count — the sticker price of the whole company.',
          },
          {
            type: 'choice',
            question: 'A stock fell from $80 to $0.90. The more sensible first reaction is?',
            options: ['A 99% discount — bargain time', 'Caution: possible delisting or bankruptcy risk — check the fundamentals first', 'Low price, low entry barrier — great for beginners', 'Wait for it to return to $80'],
            correct: 1,
            explain: 'Sub-$1 stocks usually carry delisting warnings, persistent losses or dilution. The low price is a consequence, not a coupon.',
          },
        ],
      },
      {
        id: 'i1l2',
        title: 'Market cap: pricing the whole company',
        tips: [
          'Market cap = price × total shares. Apple at ~$3 trillion means buying all of Apple is priced at $3T.',
          '"$100B wiped off the market cap" doesn’t mean anyone took the money — the last trade repriced every share.',
          'Big cap ≠ can’t grow (Apple still doubled 2019–2024). Small cap ≠ easy money (most small caps underperform).',
          'A 10% move on $3T Apple means creating $300B of value — roughly one whole McDonald’s. Size sets the difficulty.',
        ],
        analogy:
          'Housing prices in a complex: one unit sells 20% below the last print and every neighbor’s "paper wealth" drops — yet nobody reached into their pockets, and the homes are unchanged. Market cap moves are exactly this repricing at the latest trade.',
        exercises: [
          {
            type: 'choice',
            question: 'Apple drops 3% one day; headlines say "~$90B wiped out". Where did the $90B go?',
            options: ['Short sellers took it', 'Management lost it', 'Nowhere: every share got re-marked at the lower last price', 'It flowed into bonds'],
            correct: 2,
            explain: 'Only the shares that actually traded changed hands. Market cap is a price tag, not a pile of cash.',
          },
          {
            type: 'fill',
            before: 'Market cap =',
            after: '× total share count.',
            options: ['share price', 'net income', 'revenue', 'EPS'],
            correct: 0,
            explain: 'The first formula for judging a company’s size.',
          },
          {
            type: 'tf',
            statement: 'For $3T Apple, another 10% is far harder than for a $3B company — the required increments differ by orders of magnitude.',
            answer: true,
            explain: 'Each 1% of a mega cap represents enormous value that earnings and expectations must back up. That’s base effect.',
          },
          {
            type: 'match',
            prompt: 'Match the company to its scale (approx., mid-2020s)',
            pairs: [
              ['Apple / Microsoft', '~$3 trillion'],
              ['McDonald’s', '~$200 billion'],
              ['An S&P 500 borderline member', '~$20 billion'],
              ['A typical penny stock', 'under $100 million'],
            ],
          },
        ],
      },
      {
        id: 'i1l3',
        title: 'Share counts change: buybacks vs dilution',
        tips: [
          'The share count is not fixed. Buybacks retire shares; issuance and stock-based compensation (SBC) add them.',
          'Apple has spent $600B+ on buybacks since 2013, shrinking shares outstanding from ~26B to ~15.5B — the same profit split among fewer shares.',
          'The flip side: some companies pay salaries in stock (SBC) and quietly slice shareholders thinner every year. Watch diluted share count over time.',
          'Rule of thumb: shrinking share count = management works for owners; ballooning share count = owners pay for employees and new investors.',
        ],
        analogy:
          'Splitting rent in a shared flat: when a roommate moves out (buyback), everyone left enjoys more living room. When the landlord keeps squeezing in new roommates (issuance/SBC), your share shrinks. Same flat — what changes is the size of each slice.',
        exercises: [
          {
            type: 'choice',
            question: 'Apple’s share count fell from ~26B to ~15.5B over a decade. With profit unchanged, what happens to EPS?',
            options: ['Falls ~40%', 'Unchanged', 'Rises ~68% (profit ÷ fewer shares)', 'Cannot tell'],
            correct: 2,
            explain: '26/15.5 ≈ 1.68. The same earnings across fewer shares — the compounding magic of buybacks.',
          },
          {
            type: 'tf',
            statement: 'Paying employees with newly issued stock (SBC) costs existing shareholders nothing because "no cash leaves".',
            answer: false,
            explain: 'SBC spends shares instead of cash: the count rises and existing owners are diluted. A real cost, hidden in the denominator.',
          },
          {
            type: 'fill',
            before: 'To see whether a company treats owners well, track its',
            after: 'year after year.',
            options: ['diluted share count', 'office count', 'stock price', 'press coverage'],
            correct: 0,
            explain: 'Share-count trend is one of the hardest shareholder metrics to window-dress.',
          },
          {
            type: 'choice',
            question: 'Both companies grow profit 20%/yr: A shrinks shares 3%/yr, B dilutes 8%/yr via SBC. After 3 years, whose per-share profit grew faster?',
            options: ['A: all growth accrues to owners, plus the buyback boost', 'B: generous stock grants show team spirit', 'Same', 'Depends on the stock price'],
            correct: 0,
            explain: 'EPS = profit ÷ shares. Same numerator, shrinking denominator wins; part of B’s growth is eaten by new shares.',
          },
        ],
      },
    ],
  },
  {
    id: 'i2',
    title: 'Unit 2 · The Language of Profit',
    subtitle: 'Every line from revenue to net income tells a story',
    color: '#1cb0f6',
    colorDark: '#1899d6',
    icon: '🧾',
    lessons: [
      {
        id: 'i2l1',
        title: 'Four floors of the income statement',
        tips: [
          'Revenue (what you sold) → gross profit (minus direct costs) → operating profit (minus R&D/sales/admin) → net income (minus interest and tax).',
          'Each floor answers a different question: gross margin = is the product strong; operating margin = is the business efficient; net income = what owners keep.',
          'Big revenue ≠ profit: Amazon’s 2022 revenue was $514B (2nd globally) with a net loss of ~$2.7B (dragged by the Rivian write-down).',
          'Read the "rates" first (gross/operating/net margin), then their direction over time.',
        ],
        analogy:
          'Running a bubble-tea shop: $1M sales is revenue; minus $400k for milk and tea leaves gross profit of $600k; minus rent, staff, delivery fees of $450k leaves $150k operating profit; after tax, what lands in your pocket is net income. Any floor can turn "looks lucrative" into "worked for nothing".',
        exercises: [
          {
            type: 'match',
            prompt: 'Match each line to the question it answers',
            pairs: [
              ['Revenue', 'How much was sold'],
              ['Gross profit', 'Does the product itself make money'],
              ['Operating profit', 'Is the whole operation run well'],
              ['Net income', 'What owners finally keep'],
            ],
          },
          {
            type: 'choice',
            question: 'In 2022 Amazon booked ~$514B revenue yet a ~$2.7B net loss. What does that show?',
            options: ['Amazon’s business broke down', 'Costs, expenses and one-offs sit between revenue and net income — big sales ≠ profit', 'Accounting fraud', 'E-commerce loses money industry-wide'],
            correct: 1,
            explain: 'The main drag was marking down its Rivian stake. Always ask whether a loss is operational or one-off.',
          },
          {
            type: 'fill',
            before: 'Revenue minus direct costs (materials, manufacturing) equals',
            after: '.',
            options: ['gross profit', 'net income', 'cash flow', 'EBITDA'],
            correct: 0,
            explain: 'Gross profit is the first gate: the product’s own earning power.',
          },
          {
            type: 'tf',
            statement: 'R&D engineers’ salaries are usually not in cost of goods — they are operating expenses one floor down.',
            answer: true,
            explain: 'Gross profit only nets production-related costs; R&D, sales and admin come later. Hence software’s high gross margins alongside heavy R&D.',
          },
        ],
      },
      {
        id: 'i2l2',
        title: 'Gross margin tells the story',
        tips: [
          'Gross margin = gross profit ÷ revenue — the fingerprint of a business model: Apple hardware ~37%, Apple services ~74%, Nvidia data center peaked above 75%.',
          'High gross margin usually means pricing power: customers have no alternative, or switching is painful.',
          'Low margin isn’t automatically bad: Costco runs ~12% on purpose, selling goods near cost to lock in members — the profit engine is billions in membership fees.',
          'The real alarm is the direction: a steadily sliding gross margin means rising competition or fading pricing power.',
        ],
        analogy:
          'Gross margin is like how exam points are earned: some students score on talent questions (exclusive tech), others grind through volume questions (thin-margin scale). Same score, opposite methods — Costco and Hermès are both great businesses that make money in opposite postures.',
        exercises: [
          {
            type: 'choice',
            question: 'Costco’s gross margin is only ~12% (Walmart ~24%). Why does Wall Street still consider it a great business?',
            options: ['Because it is big', 'It deliberately prices goods near cost to lock in members — profit comes mostly from membership fees with 90%+ renewal', 'Low margin means poor cost control', 'It has no competitors'],
            correct: 1,
            explain: 'FY2023: membership fees ~$4.6B versus net income ~$6.3B. The low margin is strategy, not weakness.',
          },
          {
            type: 'match',
            prompt: 'Match the business to its gross-margin ballpark (recent years)',
            pairs: [
              ['Nvidia data center (AI chips)', '~75%'],
              ['Apple services (App Store etc.)', '~74%'],
              ['Apple hardware (iPhone etc.)', '~37%'],
              ['Costco merchandise retail', '~12%'],
            ],
          },
          {
            type: 'tf',
            statement: 'A gross margin sliding for 8 straight quarters deserves caution even if revenue is still growing.',
            answer: true,
            explain: 'Direction beats level: persistent slippage signals price cuts, competition or cost problems — growth may be bought with margin.',
          },
          {
            type: 'fill',
            before: 'A durably high gross margin usually signals',
            after: '.',
            options: ['pricing power', 'more employees', 'bigger offices', 'a higher stock price'],
            correct: 0,
            explain: 'Only brands, technology moats or switching costs let a company keep charging a premium.',
          },
        ],
      },
      {
        id: 'i2l3',
        title: 'EPS and the "adjusted" games',
        tips: [
          'EPS = net income ÷ shares. Street expectations and beats/misses usually refer to EPS.',
          'Many companies report two sets: GAAP (standard) and non-GAAP ("adjusted"), which typically adds back SBC, restructuring, etc. — flattering the number.',
          'Beware chronic adjusters: if SBC happens every single year, calling it "non-recurring" is self-deception.',
          'Heuristic: the wider and more persistent the GAAP vs non-GAAP gap, the harder you should ask what real cost is being adjusted away.',
        ],
        analogy:
          'Someone brags about a $50k monthly salary — but it’s "adjusted": mortgage not deducted, tuition not deducted, annual bonus spread in. What actually hits the bank account is the standard number. Non-GAAP is that retouched payslip.',
        exercises: [
          {
            type: 'choice',
            question: 'A software firm is GAAP-negative but non-GAAP profitable, mostly by adding back stock comp that recurs every year. Your read?',
            options: ['Adjusted is truer — SBC isn’t cash', 'SBC recurs and genuinely dilutes owners; adding it back flatters earnings — GAAP is closer to the truth', 'Neither number can be trusted', 'Use whichever is higher'],
            correct: 1,
            explain: 'The test is recurrence. A one-off restructuring add-back is fair; annual SBC is a recurring cost.',
          },
          {
            type: 'fill',
            before: 'A "beat" or "miss" compares actual',
            after: 'against analyst expectations.',
            options: ['EPS and revenue', 'stock price', 'headcount', 'market cap'],
            correct: 0,
            explain: 'Each quarter, the market watches revenue, EPS — and often more importantly, next quarter’s guidance.',
          },
          {
            type: 'tf',
            statement: 'For the same company, non-GAAP EPS is almost always higher than GAAP EPS.',
            answer: true,
            explain: 'Adjustments almost always flatter — a reminder that they are the version management prefers to tell.',
          },
          {
            type: 'choice',
            question: 'Over 10 years, company A doubles profit and shrinks shares 25%; company B doubles profit but dilutes 40% via SBC. Whose owners did better?',
            options: ['A: EPS grew ≈167% vs ≈43% for B', 'B: generous grants mean motivation', 'Same', 'Impossible to compare'],
            correct: 0,
            explain: 'A: 2÷0.75 ≈ 2.67×; B: 2÷1.4 ≈ 1.43×. Share count is EPS’s hidden denominator.',
          },
        ],
      },
    ],
  },
  {
    id: 'i3',
    title: 'Unit 3 · Cash Flow & Capex',
    subtitle: 'Profit is an opinion; cash is a fact',
    color: '#ce82ff',
    colorDark: '#a568cc',
    icon: '💵',
    lessons: [
      {
        id: 'i3l1',
        title: 'Profit is not cash',
        tips: [
          'Profit is an accounting result; cash is money in the bank — the two can diverge widely.',
          'Classic gaps: selling on credit (revenue booked, cash not collected, receivables balloon), inventory build-ups, aggressive revenue recognition.',
          'Amazon ran 1–3% net margins through the 2010s with strong operating cash flow — reinvesting everything was a choice, not weakness.',
          'Reverse alarm: pretty profits with operating cash flow persistently below net income — question the revenue quality.',
        ],
        analogy:
          'A reseller posts "signed $1M in orders this month!" — but customers pay in six months. The signing is "profit"; the collection is "cash flow". To know how they are really doing, look at the bank balance, not the feed.',
        exercises: [
          {
            type: 'choice',
            question: 'Net income grows three years straight, but operating cash flow stays at half of it and receivables keep swelling. Best read?',
            options: ['Business is booming', 'Revenue quality is suspect: sales may be booked but not collected', 'Tax optimization', 'Cash flow doesn’t matter, profit is enough'],
            correct: 1,
            explain: 'Profit/cash divergence plus swelling receivables is the classic prelude seen before many accounting blow-ups.',
          },
          {
            type: 'tf',
            statement: 'Amazon’s 1–3% net margins through the 2010s prove it was a bad business back then.',
            answer: false,
            explain: 'Operating cash flow stayed strong; thin margins reflected reinvestment (logistics, AWS). The cash flow statement is often more honest than the income statement.',
          },
          {
            type: 'fill',
            before: '"Profit is an opinion,',
            after: 'is a fact."',
            options: ['cash', 'revenue', 'market cap', 'the stock price'],
            correct: 0,
            explain: 'Accounting profit involves estimates and choices; money entering the bank does not.',
          },
          {
            type: 'choice',
            question: 'Which situation makes profit look good while cash runs tight?',
            options: ['All customers pay cash on delivery', 'Heavy credit sales to distributors plus six months of inventory piled up', 'Collecting a full year of subscriptions upfront', 'A completed share offering'],
            correct: 1,
            explain: 'Credit sales put revenue ahead of cash; inventory turns cash into boxes. Neither shows up as a problem on the income statement.',
          },
        ],
      },
      {
        id: 'i3l2',
        title: 'Free cash flow: what owners can actually take',
        tips: [
          'FCF = operating cash flow − capital expenditure. What is truly "free" after sustaining and growing the business.',
          'FCF has few destinations: buybacks, dividends, debt paydown, M&A, or the balance sheet. It is the ammunition for shareholder returns.',
          'A core reason Buffett bought Apple: ~$100B of FCF a year, nearly all returned via buybacks and dividends.',
          'Negative FCF in a growth phase isn’t automatically bad — ask whether the spending grows future cash flows.',
        ],
        analogy:
          'After salary lands (operating cash flow), subtract rent and food (maintenance) and the course you enrolled in (growth investment). What is left to save, invest or send to your parents is your free cash flow. A big salary with zero savings means zero FCF.',
        exercises: [
          {
            type: 'fill',
            before: 'Free cash flow = operating cash flow −',
            after: '.',
            options: ['capital expenditure (capex)', 'marketing spend', 'salaries', 'income tax'],
            correct: 0,
            explain: 'Net of the equipment, plants and servers needed to sustain and expand, the rest is discretionary.',
          },
          {
            type: 'choice',
            question: 'Apple generates ~$100B FCF a year and returns almost all of it via buybacks and dividends. For long-term holders that means?',
            options: ['Growth is over, they can only hand out cash', 'Owners genuinely share the results yearly: fewer shares plus cash dividends lift per-share value even with flat profit', 'A sign of fraud', 'Buybacks only prop up the price'],
            correct: 1,
            explain: 'Strong FCF plus owner-friendly allocation is the core of "cash cow" investing — and a pillar of Buffett’s Apple thesis.',
          },
          {
            type: 'tf',
            statement: 'A fast-expanding company with negative FCF is necessarily a bad investment.',
            answer: false,
            explain: 'Amazon and Tesla ran years of negative FCF while scaling. The question is the return on the invested dollars.',
          },
          {
            type: 'match',
            prompt: 'Match each use of FCF to what it means for owners',
            pairs: [
              ['Buybacks that retire shares', 'Each share holds more value'],
              ['Dividends', 'Cash straight into pockets'],
              ['High-return expansion/M&A', 'Seeds of future cash flow'],
              ['Aimless diversification deals', 'Where value goes to die'],
            ],
          },
        ],
      },
      {
        id: 'i3l3',
        title: 'The capex cycle: today’s spend, tomorrow’s depreciation',
        tips: [
          'Around 2024–2025, Microsoft, Meta, Google and Amazon together spent $200B+ a year on AI data centers — the money artery of this AI cycle.',
          'One company’s capex is another’s revenue: cloud giants’ spending becomes orders for Nvidia, Broadcom, TSMC.',
          'Capex skips the income statement at first — it becomes assets, then bleeds into profit as depreciation for years. Today’s bet is tomorrow’s fixed cost.',
          'When capex booms, ask two things: is the demand real, and if it disappoints, whose margins get crushed by the depreciation?',
        ],
        analogy:
          'Spending $3M renovating a restaurant: the cash leaves on signing day (capex), but the P&L barely notices — then $300k of depreciation hits every year for 10 years. Nobody cares while tables are full; when traffic disappoints, that $300k/year becomes the barbell crushing profit.',
        exercises: [
          {
            type: 'choice',
            question: 'With Microsoft/Meta/Google/Amazon spending $200B+ a year on AI data centers, who is the most direct "certain beneficiary"?',
            options: ['Short-video platforms', 'Whoever takes the orders: Nvidia, TSMC and the compute supply chain', 'Airlines', 'Consumer brands'],
            correct: 1,
            explain: 'One firm’s capex is another’s revenue. The cloud giants carry the capital risk; suppliers collect cash first — the shovel-seller logic.',
          },
          {
            type: 'tf',
            statement: 'Spending $10B on a data center adds $10B of cost to that quarter’s income statement.',
            answer: false,
            explain: 'Capex becomes a balance-sheet asset first, then depreciates over its life. That’s why margins can look deceptively fine during a build-out.',
          },
          {
            type: 'fill',
            before: 'The biggest risk of the AI build-out: if demand disappoints, massive',
            after: 'will suppress margins for years.',
            options: ['depreciation', 'dividends', 'buybacks', 'taxes'],
            correct: 0,
            explain: 'Depreciation is rigid once assets exist. After the 2000 telecom bust, surplus fiber depreciation weighed on the sector for years.',
          },
          {
            type: 'choice',
            question: 'Asset-heavy (chip fabs, airlines) versus asset-light (software, platforms) — which statement is right?',
            options: ['Asset-heavy is never investable', 'Asset-light expansion needs little extra capex, so revenue growth converts to FCF more easily', 'Asset-heavy always earns higher margins', 'No difference'],
            correct: 1,
            explain: 'Another software copy costs ~nothing; each fab generation costs tens of billions. That is a congenital difference in FCF constitution.',
          },
        ],
      },
    ],
  },
  {
    id: 'i4',
    title: 'Unit 4 · Interest Rates: Gravity of Valuation',
    subtitle: 'Why markets shake when the Fed speaks',
    color: '#ff9600',
    colorDark: '#cc7800',
    icon: '🏦',
    lessons: [
      {
        id: 'i4l1',
        title: 'The risk-free rate is the yardstick',
        tips: [
          'US Treasury yields are treated as the "risk-free rate": the return for doing nothing and taking (almost) no risk.',
          'It benchmarks everything: with Treasuries at 5%, why accept a 4% expected return on stocks? Prices must fall until returns compete.',
          '2022 was the live demo: the fed funds rate went from 0 to 4%+ and the Nasdaq fell 33%.',
          'Anchor: interest rates act on asset prices like gravity (Buffett). The higher the rate, the harder it is for valuations to float.',
        ],
        analogy:
          'When bank deposits pay 0.5%, a rental flat yielding 4% is hot property. When deposits pay 5%, the same flat must get cheaper — who would buy otherwise? The flat didn’t change; the effortless alternative did. Equity valuations work the same way.',
        exercises: [
          {
            type: 'choice',
            question: 'The 10-year Treasury yield rises from 1% to 5%. Directional effect on equity valuations overall?',
            options: ['None: bonds are bonds, stocks are stocks', 'Compresses them: with risk-free returns higher, stocks must offer better returns to be held', 'Raises them: it means the economy is strong', 'Only affects bank stocks'],
            correct: 1,
            explain: 'All assets compete for capital against the risk-free rate — the core mechanism of 2022’s multiple compression.',
          },
          {
            type: 'fill',
            before: 'Buffett: interest rates are to asset prices what',
            after: 'is to matter.',
            options: ['gravity', 'wind', 'temperature', 'light'],
            correct: 0,
            explain: 'Higher rates pull valuations back to earth — first principle for macro-to-market transmission.',
          },
          {
            type: 'tf',
            statement: 'The "risk-free rate" usually refers to US Treasury yields, since US default risk is considered minimal.',
            answer: true,
            explain: 'It anchors global pricing. First question of any investment: does the excess over Treasuries pay for the extra risk?',
          },
          {
            type: 'choice',
            question: 'In 2022 the Fed hiked from 0 to above 4% and the Nasdaq lost ~33%. The main transmission channel was?',
            options: ['Mass corporate bankruptcies', 'Higher discount rates compressed multiples — hitting hardest the companies whose profits sit far in the future', 'Bad investor mood', 'War'],
            correct: 1,
            explain: 'Most Nasdaq constituents didn’t earn 33% less in 2022 — the price paid per dollar of earnings shrank.',
          },
        ],
      },
      {
        id: 'i4l2',
        title: 'P/E intuition: flip it into a yield',
        tips: [
          'P/E = market cap ÷ annual net income = the price paid per $1 of profit. 25× ≈ 25 years to earn back statically.',
          'Flipping is more intuitive: 1/P.E is the earnings yield. 25× → 4%, 10× → 10%. Compare that directly with Treasury yields.',
          'Neither high nor low is inherently good: high P/E prepays for expected profit growth; low P/E may be cheap — or the market correctly pricing decline (value trap).',
          'Usage: always pair P/E with growth. 25× for 30%/yr growth can be cheap; 10× for profits shrinking 20%/yr can be dear.',
        ],
        analogy:
          'A shop unit collects $40k net rent a year. Paying $1M = "25× P/E", a 4% rental yield. The bank next door offers 5% — still paying $1M? Only if you believe the metro line is coming and rents will jump. A high P/E never buys the present; it buys a belief about the future.',
        exercises: [
          {
            type: 'choice',
            question: 'Market cap $50B, annual net income $2B. P/E and earnings yield?',
            options: ['P/E 25×, earnings yield 4%', 'P/E 4×, yield 25%', 'P/E 10×, yield 10%', 'P/E 20×, yield 5%'],
            correct: 0,
            explain: '50÷2 = 25×; 2÷50 = 4% — now directly comparable to Treasury yields.',
          },
          {
            type: 'tf',
            statement: 'Low P/E stocks are always better buys than high P/E stocks.',
            answer: false,
            explain: 'Low P/E can price imminent decline: in 2021 many shippers traded at 2–3× because the market correctly foresaw freight-rate collapse.',
          },
          {
            type: 'fill',
            before: 'The inverse of P/E is the earnings yield: 20× corresponds to about',
            after: ', directly comparable with Treasuries.',
            options: ['5%', '20%', '2%', '10%'],
            correct: 0,
            explain: '1÷20 = 5% — the conversion that translates valuation into the language of returns.',
          },
          {
            type: 'choice',
            question: 'In 2023 Nvidia briefly "looked" 200×+ P/E, then data-center profits exploded and it was suddenly 30-something× on new earnings. Lesson?',
            options: ['P/E is a static snapshot — when the denominator moves violently it misleads; the market buys next year’s E, not last year’s', '200× is always a bubble', 'Nvidia faked numbers', 'Valuation is meaningless'],
            correct: 0,
            explain: 'Always ask which year’s E and whether it is sustainable: trailing E misprices explosive growers, peak E buries you in cyclicals.',
          },
        ],
      },
      {
        id: 'i4l3',
        title: 'Live replay: 2022, rates kill multiples',
        tips: [
          '2022: inflation peaked at 9.1% CPI; the Fed hiked 425bp in one year — from zero to 4.25%+, the steepest in four decades.',
          'The damage was layered: Nasdaq -33%; long-duration profitless growth (ARKK -67%) hit hardest; energy and cash-rich value held up best.',
          'Mechanism: the further out the profits, the more rate-sensitive the asset (longer "duration"). Hikes make future money worth less today.',
          'Takeaway framework: when the rate regime shifts, first sort holdings — which earn money now, and which are stories a decade out.',
        ],
        analogy:
          'Two IOUs: A repays $100 tomorrow, B repays $100 in ten years. Rates jump to 5%: A barely notices, B devalues sharply — ten-years-away money discounts much harder. Profitless growth stocks are that ten-year IOU.',
        exercises: [
          {
            type: 'choice',
            question: 'Why did profitless high-growth tech (ARKK -67%) fall so much harder than profitable value in 2022?',
            options: ['Their operations collapsed across the board', 'Nearly all their value sat in far-future profits — the part that discounts hardest when rates rise', 'Fund managers all blundered', 'Pure coincidence'],
            correct: 1,
            explain: 'Duration intuition: the further the cash flows, the greater the rate sensitivity. Companies with profits today lost far less.',
          },
          {
            type: 'tf',
            statement: 'The Nasdaq fell 33% in 2022 mainly because constituents’ profits collectively fell by a third.',
            answer: false,
            explain: 'Most megacap profits were roughly stable; what fell was the multiple. Separating multiple compression from earnings damage is basic post-mortem skill.',
          },
          {
            type: 'match',
            prompt: 'Match 2022 performance to the logic behind it',
            pairs: [
              ['Profitless growth -60%+', 'All cash flows far out; max rate sensitivity'],
              ['Nasdaq -33%', 'Broad multiple compression'],
              ['Energy rallied', 'Inflation itself was its revenue'],
              ['Short-term Treasuries', 'The hiking cycle’s shelter'],
            ],
          },
          {
            type: 'choice',
            question: 'Turning 2022 into a forward framework: when markets start pricing "higher for longer", what do you check first in a portfolio?',
            options: ['Whether the logos look good', 'Which holdings depend on far-future profits with no earnings today — the most rate-sensitive layer', 'Employee counts', 'How long the companies have been listed'],
            correct: 1,
            explain: 'Sort first, decide second: the rate regime is the exchange rate for future stories. That checking habit is where a framework begins.',
          },
        ],
      },
    ],
  },
];

/* ================= L2 Understanding Companies ================= */

investCourseEn.push(
  {
    id: 'i5',
    title: 'Unit 5 · Business Models',
    subtitle: 'How does this company actually make money',
    color: '#ff4b4b',
    colorDark: '#d33131',
    icon: '🏪',
    lessons: [
      {
        id: 'i5l1',
        title: 'Where the money comes from: four archetypes',
        tips: [
          'The first question when dissecting any company: who pays, what are they paying for, and why will they keep paying.',
          'Four common archetypes: selling ads (~76% of Google’s and ~98% of Meta’s revenue), subscriptions (Netflix, Spotify), taking a cut (App Store’s 15–30%, Visa’s sliver of every swipe), selling hardware (iPhone ≈ half of Apple’s revenue).',
          'Most companies are combinations: Apple = hardware + tolls + subscriptions; Amazon = retail + cloud + ads. Segment disclosures are more honest than total revenue.',
          'Archetype sets constitution: ads swing with the economy, subscriptions are steady but fight for attention, tolls have near-zero marginal cost, hardware lives product cycle to product cycle.',
        ],
        analogy:
          'Four shops on one street: the flyer printer lives off merchant budgets (ads), the gym off annual memberships (subscriptions), the broker takes 2% per deal (tolls), the phone shop sells devices one by one (hardware). When the economy cools, the flyer printer gets hurt first; the unexpired memberships hold up best.',
        exercises: [
          {
            type: 'match',
            prompt: 'Match the company to its main money archetype',
            pairs: [
              ['Meta (~98% of revenue)', 'Advertising'],
              ['Netflix', 'Subscriptions'],
              ['Visa / App Store', 'Taking a cut'],
              ['The iPhone business', 'Hardware'],
            ],
          },
          {
            type: 'choice',
            question: 'When recession expectations rise, which archetype’s revenue usually gets cut first?',
            options: ['Subscription fees', 'Ad budgets — the easiest corporate expense to slash; the 2022 Meta/Google slowdown was the live demo', 'Card-swipe tolls', 'Hardware sales'],
            correct: 1,
            explain: 'Advertising is the most flexible line in corporate budgets. Knowing the revenue archetype tells you who the macro wind knocks over first.',
          },
          {
            type: 'tf',
            statement: 'Apple is just a hardware company.',
            answer: false,
            explain: 'Services (App Store tolls, iCloud, Music…) bring ~$100B a year at ~74% gross margin — by profit, Apple is a hardware-plus-toll-booth hybrid.',
          },
          {
            type: 'fill',
            before: 'The first question about any company:',
            after: 'pays, and why they will keep paying.',
            options: ['who', 'which department', 'which bank', 'whether the government'],
            correct: 0,
            explain: 'Find the real payer (users? advertisers? merchants?) and every later step of the analysis has a foundation.',
          },
        ],
      },
      {
        id: 'i5l2',
        title: 'Unit economics: does one order make money',
        tips: [
          'Shrink the business to a single order or user: what are the revenue, cost and gross profit of that one unit? That is unit economics.',
          'Two key quantities: what it costs to acquire a user (CAC) and the gross profit that user contributes over a lifetime (LTV). Burning cash to grow only makes sense when LTV clearly exceeds CAC.',
          'Cautionary classic: bike-sharing — ~1 yuan per ride against higher per-ride damage, rebalancing and maintenance costs; scale only multiplied the losses. Scale cannot fix negative unit economics.',
          'Positive case: after its 2020 fraud scandal, Luckin cut subsidies until each cup earned positive gross profit, then scaled to out-earn Starbucks China by 2023. Same business, different company before and after unit economics turned.',
        ],
        analogy:
          'A lemonade stand: sell at $10, lemons and cups cost $4, the pitch fee spreads to $3 a cup — $3 profit per cup, more sales more profit. The rival sells at $5 with free stickers: losing $2 a cup, the longer the queue the bigger the loss. Foot traffic (growth) can’t fix the recipe (unit economics).',
        exercises: [
          {
            type: 'choice',
            question: 'A delivery platform earns $5 per order against $6 of courier and subsidy costs. Management says "we’ll be profitable at scale". When is that actually true?',
            options: [
              'Always — burning cash is how the internet works',
              'Only if scale genuinely lowers per-order cost (order density → multi-drop routes) or raises per-order revenue; otherwise scale just multiplies the loss',
              'As long as funding lasts',
              'Scale and profit are unrelated',
            ],
            correct: 1,
            explain: 'DoorDash fixed its unit economics through density and ads; bike-sharing never did. "Which number does scale actually change?" is the scalpel for burn stories.',
          },
          {
            type: 'fill',
            before: 'For paid growth to make sense, lifetime gross profit (LTV) must clearly exceed',
            after: '.',
            options: ['customer acquisition cost (CAC)', 'the ad budget', 'salaries', 'office rent'],
            correct: 0,
            explain: 'A common rough bar is LTV/CAC > 3. Below 1, growth is literally bleeding.',
          },
          {
            type: 'tf',
            statement: 'A business with negative unit economics is still investable as long as users grow fast enough.',
            answer: false,
            explain: 'Loss per order × more orders = bigger loss. Unless scale demonstrably fixes the per-unit math, growth is leverage on the bleeding.',
          },
          {
            type: 'choice',
            question: 'Luckin was delisted for fraud in 2020, yet by 2023 out-earned Starbucks China in quarterly revenue. The pivotal change was?',
            options: ['A new logo', 'Cutting subsidies until each cup earned positive gross margin — then letting 10,000+ stores multiply that positive margin. Fix the unit first, then scale', 'Coffee bean prices', 'Starbucks leaving China'],
            correct: 1,
            explain: 'The same store network is a bleeding pump with negative unit economics and a printing press with positive ones. For consumer names, always do the one-order math first.',
          },
        ],
      },
      {
        id: 'i5l3',
        title: 'Moats: why can’t rivals take it',
        tips: [
          'High profits invite competition; the moat answers "what keeps them out". Four classics: switching costs (enterprise software, the Apple ecosystem), network effects (WeChat, Visa), brand (Moutai, Hermès), cost advantage (Costco, TSMC scale).',
          'Financial evidence of a moat: years of sustained high gross margin plus stable-or-rising market share. Moats claimed in speeches don’t count; moats visible in statements do.',
          'Switching costs are the most underrated: once a firm builds its workflow on a piece of software, replacing it costs far more than the license — the root of SaaS valuations.',
          'Technology shifts drain moats: Nokia’s scale and Kodak’s brand both failed against paradigm changes. A moat is a stock, not a birthright — re-verify it periodically.',
        ],
        analogy:
          'Two breakfast stalls: A has a unique taste the neighborhood has eaten for a decade (brand + habit); B competes on price. A new stall opens — B’s customers defect to cheaper instantly, A’s regulars can’t be bothered to switch. "Can’t be bothered" is a moat in its plainest form.',
        exercises: [
          {
            type: 'match',
            prompt: 'Match the company to its primary moat type',
            pairs: [
              ['WeChat / Visa', 'Network effects'],
              ['Enterprise ERP / Apple ecosystem', 'Switching costs'],
              ['Moutai / Hermès', 'Brand premium'],
              ['TSMC / Costco', 'Scale cost advantage'],
            ],
          },
          {
            type: 'choice',
            question: 'A company claims a strong moat. The best financial evidence for the claim is?',
            options: ['CEO interview soundbites', 'Years of high gross margin with stable-or-rising share — competition failing to get in leaves marks on the statements', 'Office location', 'Ad spend'],
            correct: 1,
            explain: 'A moat is by definition "high returns that competition fails to erode". If gross margin compresses year after year, the story is a moat being breached.',
          },
          {
            type: 'tf',
            statement: 'Once built, a moat is safe forever.',
            answer: false,
            explain: 'Nokia earned over half of global handset profits in 2007 and nearly zero five years later — a paradigm shift (touchscreen smartphones) drained the old moat outright.',
          },
          {
            type: 'fill',
            before: 'The core reason SaaS earns premium multiples: once customers build workflows on the product, the',
            after: 'is enormous, making revenue annuity-like.',
            options: ['switching cost', 'ad fee', 'hardware cost', 'tax rate'],
            correct: 0,
            explain: 'Replacing a five-year-old ERP means halting and retraining the whole company — the power of the switching-cost moat.',
          },
        ],
      },
    ],
  },
  {
    id: 'i6',
    title: 'Unit 6 · Where Growth Comes From',
    subtitle: 'The source of growth decides its quality',
    color: '#10b981',
    colorDark: '#0d9668',
    icon: '🌱',
    lessons: [
      {
        id: 'i6l1',
        title: 'Volume × price: the first cut',
        tips: [
          'All revenue growth decomposes into volume × price: sell more units, or sell each unit dearer. The two differ completely in sustainability.',
          'Apple’s textbook move: iPhone units have hovered around 200M a year since the mid-2010s while average selling price climbed from ~$650 to $900+ — growth almost entirely from price.',
          'Netflix likewise: once North America saturated, growth came from price hikes, the ad tier and the sharing crackdown.',
          'Rule: volume-led growth → ask how far the ceiling is; price-led growth → ask how many hikes remain. Raising prices is a spell with limited charges.',
        ],
        analogy:
          'Two tea shops both grow revenue 20%: shop A served 20% more customers; shop B kept the same crowd and raised every price 20%. Next year A may find more customers; if B hikes again, its crowd walks. Same growth rate, different source, different future.',
        exercises: [
          {
            type: 'fill',
            before: 'Step one of dissecting revenue growth: decompose it into',
            after: '.',
            options: ['volume × price', 'domestic × overseas', 'online × offline', 'new × returning'],
            correct: 0,
            explain: 'Selling more, or selling dearer? One cut and the quality of growth shows itself.',
          },
          {
            type: 'choice',
            question: 'iPhone units have been flat around 200M a year, yet iPhone revenue keeps growing. Where does the growth come from?',
            options: ['A volume explosion', 'Average selling price marching up — Pro mix, bigger storage, price hikes: classic price-driven growth', 'Accounting changes', 'Currency'],
            correct: 1,
            explain: 'ASP went from ~$650 to $900+. "Flat units, rising revenue" should instantly make you check ASP.',
          },
          {
            type: 'tf',
            statement: 'Price-hike-driven growth can continue indefinitely.',
            answer: false,
            explain: 'Hikes spend pricing power and customer patience. Every Netflix hike bumps churn — the price lever has counted charges.',
          },
          {
            type: 'choice',
            question: 'McDonald’s reports "+8% same-store sales". The standard further decomposition is?',
            options: ['Breakfast × dinner', 'Traffic (how many came) × ticket (how much each spent) — the store-level version of volume × price', 'Beef × chicken', 'Owned × franchised'],
            correct: 1,
            explain: 'In 2022–23 much restaurant comp growth was pure price with traffic actually falling — a danger signal only visible after the split.',
          },
        ],
      },
      {
        id: 'i6l2',
        title: 'Penetration and the ceiling',
        tips: [
          'Penetration growth follows an S-curve: slow start, explosive middle, abrupt stall at saturation. Locating a company on the curve matters more than judging whether it is "good".',
          'Live examples: smartphone penetration topped out mid-2010s and handset growth died — Apple pivoted the story to services. EV penetration went from ~5% globally in 2020 to ~18% in 2023 (35%+ in China): mid-curve explosion.',
          'The ceiling is TAM — but beware TAM stories: WeWork claimed a multi-trillion-dollar TAM by counting every office on earth as its market.',
          'Rule: past ~50% penetration, growth logic must switch from acquisition to pricing/new categories — and the valuation regime switches with it.',
        ],
        analogy:
          'Selling thermos cups to a class of 50: the first 10 are easy (early adopters); after 40, every sale is a grind (saturation). The smart move isn’t squeezing the last 10 — it’s selling brushes and replacement lids to existing owners. Apple selling services is selling brushes to a saturated classroom.',
        exercises: [
          {
            type: 'choice',
            question: 'EVs were ~18% penetrated globally in 2023 (35%+ in China); smartphones are 80%+. Where does each sit on the S-curve?',
            options: [
              'Both exploding',
              'EVs mid-curve (fast growth, competition flooding in); smartphones saturated (growth via replacement and pricing)',
              'Both saturated',
              'EVs saturated',
            ],
            correct: 1,
            explain: 'Two "big industries" at different curve positions deserve different growth logic and different multiples.',
          },
          {
            type: 'tf',
            statement: 'The bigger the claimed TAM, the higher the investment value.',
            answer: false,
            explain: 'WeWork counted "all global office demand" into TAM and touched a $47B valuation, then lost 99% after the failed IPO. Discount TAM to what is truly serviceable and winnable.',
          },
          {
            type: 'fill',
            before: 'Past half penetration, growth must switch from acquiring new users to',
            after: '— Apple pushing services is the textbook demo.',
            options: ['pricing or new categories', 'more ads', 'layoffs', 'buybacks'],
            correct: 0,
            explain: 'In saturated markets growth comes from wallet share, not user count. Curve position predicts the company’s next story.',
          },
          {
            type: 'choice',
            question: 'The single most useful number for judging how much longer a "hot industry" can boom?',
            options: ['Volume of industry headlines', 'Current penetration and its S-curve position', 'The leader’s stock gain', 'Industry headcount'],
            correct: 1,
            explain: '30% growth at 10% penetration is early innings; the same 30% at 60% penetration is borrowing from the end.',
          },
        ],
      },
      {
        id: 'i6l3',
        title: 'Second curves: when a new business earns a price',
        tips: [
          'Mature companies regrow almost exclusively through second curves: Amazon grew AWS, Microsoft grew Azure, Apple grew services, Nvidia grew from gaming into data center.',
          'Value crystallizes at a signature moment — first standalone disclosure. In 2015 Amazon first broke out AWS: margins far above retail, and the stock nearly doubled that year.',
          'Before disclosure, read the tells: management mentions, capex direction, hiring. After disclosure, watch three things: growth rate, margin, share of profit.',
          'Trap: not every new story is a second curve. The test is whether it reuses the core assets of the main business (Amazon’s data centers → AWS) or is a fresh gamble in a new arena.',
        ],
        analogy:
          'A noodle-shop owner starts selling her homemade chili sauce: same kitchen, same customers (core assets reused), higher margin — that’s a second curve. The rival owner day-trading crypto is not on a second curve; he switched casinos.',
        exercises: [
          {
            type: 'choice',
            question: 'In 2015 Amazon first disclosed AWS as a segment (high growth, high margin) and the stock nearly doubled that year. Why can disclosure itself trigger repricing?',
            options: [
              'Disclosure changed the business',
              'AWS’s value had been invisible inside low-margin retail; standalone numbers let the market price the high-margin asset separately for the first time',
              'Pure coincidence',
              'Because of the press release',
            ],
            correct: 1,
            explain: 'The moment a good business hidden in the statements gets broken out is a revaluation switch. Watch what management starts disclosing separately.',
          },
          {
            type: 'match',
            prompt: 'Match the company to its second curve',
            pairs: [
              ['Amazon', 'AWS cloud'],
              ['Apple', 'Services (App Store etc.)'],
              ['Nvidia', 'Data-center GPUs'],
              ['Microsoft', 'Azure cloud'],
            ],
          },
          {
            type: 'tf',
            statement: 'A key test of a second curve: does the new business reuse the core assets and capabilities of the main one?',
            answer: true,
            explain: 'Nvidia’s CUDA moved from gaming to AI; Amazon’s data centers moved from e-commerce to cloud. Asset-reusing curves win far more often than cross-domain gambles.',
          },
          {
            type: 'choice',
            question: 'A slowing company loudly announces a pivot into a hot arena (metaverse/AI). The rational first response is?',
            options: [
              'Revalue it on the new arena immediately',
              'Check three things: is the investment real (capex/hiring), does it reuse core capabilities, and when will standalone numbers appear — without these it is only narrative',
              'Ignore it entirely',
              'See if competitors follow',
            ],
            correct: 1,
            explain: 'Second curves need an evidence chain. Meta renamed itself for the metaverse, burned tens of billions and retreated; Azure proved itself with a decade of numbers. The difference is evidence.',
          },
        ],
      },
    ],
  },
  {
    id: 'i7',
    title: 'Unit 7 · The Metrics That Matter',
    subtitle: 'Every industry watches a different number',
    color: '#6366f1',
    colorDark: '#4c4fd6',
    icon: '📐',
    lessons: [
      {
        id: 'i7l1',
        title: 'Subscriptions: retention is everything',
        tips: [
          'The lifeline of subscription/SaaS is not acquisition but retention. The core metric is NRR (net revenue retention): from existing customers only, this year’s revenue as a share of last year’s.',
          'NRR above 100% means revenue grows without a single new customer. Elite SaaS like early Snowflake ran 170%+; 120%+ counts as excellent.',
          'Consumer subscriptions watch churn: Netflix’s monthly churn has long sat near 2%, the industry’s lowest — the backbone of its repeated price hikes.',
          'Rule: high growth + low NRR = leaky bucket (acquisition masking churn); modest growth + high NRR = compounding machine.',
        ],
        analogy:
          'Two reservoirs both taking in water (new customers): pool A leaks at the bottom (poor retention) — close the tap and the level drops; pool B doesn’t leak, and the water inside multiplies by itself (expansion, NRR>100%). Check the bottom before admiring the inlet pipe.',
        exercises: [
          {
            type: 'fill',
            before: 'A SaaS company with NRR above 100% grows',
            after: 'even without adding a single new customer.',
            options: ['revenue', 'headcount', 'its stock price', 'office space'],
            correct: 0,
            explain: 'Renewals plus expansion minus churn still nets positive. NRR is subscription quality in one number.',
          },
          {
            type: 'choice',
            question: 'SaaS A grows 60% with NRR of 95%; SaaS B grows 30% with NRR of 125%. Healthier long term?',
            options: ['A: growth is everything', 'B: 125% NRR means existing customers keep spending more — a compounding base. A is masking leaks with acquisition', 'Same', 'Cannot judge'],
            correct: 1,
            explain: 'Acquisition eventually gets expensive; then A’s growth collapses while B compounds. The 2022 SaaS derating repriced exactly this difference.',
          },
          {
            type: 'tf',
            statement: 'Netflix’s ~2% monthly churn is the backbone of its repeated price increases.',
            answer: true,
            explain: 'Stronger retention means stronger pricing power — they are two faces of one coin.',
          },
          {
            type: 'choice',
            question: 'A subscription company reports dazzling growth but refuses to disclose retention or churn. Reasonable read?',
            options: ['The metric doesn’t matter', 'Caution: companies flaunt pretty numbers and hide ugly ones — undisclosed retention usually means unflattering retention', 'The company is modest', 'It has no competition'],
            correct: 1,
            explain: 'Disclosure choices are information. When NRR/churn is missing, back it out from revenue growth minus new bookings.',
          },
        ],
      },
      {
        id: 'i7l2',
        title: 'Retail and platforms: comps, GMV and measurement traps',
        tips: [
          'Physical retail’s core is same-store sales (SSS): with new openings stripped out, are the old stores still growing? Anyone can grow total revenue by opening stores; comp growth is the real skill.',
          'E-commerce platforms: GMV (flow through the platform) × take rate = platform revenue. Mind the measurement: PDD/Taobao book the cut as revenue, JD books the whole item — their "revenues" cannot be compared directly.',
          'Inventory turns are retail’s thermometer: Zara turns ~6× a year versus 2–3× for legacy apparel. A sudden slowdown in turns is the earliest "goods not moving" alarm — one quarter ahead of the P&L.',
          'Rule: total revenue up + comps down = store-opening masking per-store decay, retail’s most classic red flag.',
        ],
        analogy:
          'A bubble-tea chain brags "revenue doubled": look closer and stores went from 100 to 250 while each store’s business worsened. Like gaming "top-10 at a new school" by transferring schools — aggregate growth can hide unit decay; comp data is the anti-counterfeit stamp.',
        exercises: [
          {
            type: 'choice',
            question: 'A restaurant chain grows total revenue 40% while same-store sales fall 5%. Best read?',
            options: ['Excellent operations', 'Frantic store-opening props up the total while each store decays — the total collapses once the opening dividend runs out', 'Comps don’t matter', 'An accounting error'],
            correct: 1,
            explain: 'This pattern preceded Luckin’s blow-up and many viral-restaurant collapses. Comps come first in retail analysis.',
          },
          {
            type: 'fill',
            before: 'Platform revenue ≈ GMV ×',
            after: '.',
            options: ['take rate', 'headcount', 'ad impressions', 'logistics cost'],
            correct: 0,
            explain: 'Two levers: grow the flow, or raise the cut. Take-rate changes also reveal bargaining power over merchants.',
          },
          {
            type: 'tf',
            statement: 'JD’s revenue was ~4× PDD’s (2023), so JD’s business is 4× the size.',
            answer: false,
            explain: 'Different measurement: JD books the full merchandise value (first-party), PDD books only its cut and ads. Compare platform scale with GMV, earning power with profit — align the ruler before comparing.',
          },
          {
            type: 'choice',
            question: 'The earliest signal in retail filings that goods have stopped selling is usually?',
            options: ['Falling net profit', 'Slowing inventory turns and stretching inventory days — goods piling in warehouses, ahead of the income statement', 'A CEO change', 'A falling stock'],
            correct: 1,
            explain: 'Nike and Target in 2022: inventory blew out first, then forced markdowns crushed gross margin. Inventory leads.',
          },
        ],
      },
      {
        id: 'i7l3',
        title: 'Hardware and cycles: the inventory pendulum',
        tips: [
          'Chips, panels, shipping — cyclical industries swing between feast and famine with supply and demand; steady-state frameworks do not apply.',
          'Semis’ leading indicator is inventory: downstream stockpiles → order cuts → revenue cliff. Micron (memory) swung from record profit to deep loss inside a year into FY2023.',
          'Cyclical P/E lies: P/E is lowest at peak profit (looks cheapest) — often exactly the top; in losses P/E breaks entirely, often near the bottom. Use capacity, inventory and pricing for cyclicals, not P/E.',
          'Rule: distinguish cyclical decline (mean-reverts — memory chips) from structural decline (never returns — feature phones). Confusing them turns bottom-fishing into knife-catching.',
        ],
        analogy:
          'Beach umbrella rentals: a hot summer and everyone doubles their stock (capacity); the season turns and the whole town dumps unsold umbrellas at a discount (destocking). The umbrella man’s most profitable summer — peak earnings, lowest P/E — is exactly when not to buy his business.',
        exercises: [
          {
            type: 'choice',
            question: 'Memory maker Micron trades at 5× P/E in a record-profit year — temptingly "cheap". The cyclical-framework read?',
            options: [
              'A rare bargain',
              'Caution: cyclicals show their lowest P/E at peak profit — the denominator is topping, mean reversion likely follows. Low P/E is a common top signal',
              '5× is always a buy',
              'The market is wrong',
            ],
            correct: 1,
            explain: 'After looking "cheap" in 2022, Micron swung to heavy losses in FY2023. Invert P/E for cyclicals: low multiple on peak earnings, braver multiples at the trough.',
          },
          {
            type: 'fill',
            before: 'The earliest alarm of a semis downcycle is usually downstream',
            after: 'piling up, followed by order cuts and a revenue cliff.',
            options: ['inventory', 'stock prices', 'dividends', 'hiring'],
            correct: 0,
            explain: 'Inventory is the cycle’s thermometer: once the channel is stuffed, the coming revenue decline is already locked in.',
          },
          {
            type: 'tf',
            statement: 'The key judgment on cyclicals is separating cyclical decline (comes back) from structural decline (never does).',
            answer: true,
            explain: 'Memory prices return (demand persists); feature phones never did (replaced outright). Nvidia’s 2018 mining glut was cyclical; Kodak film was structural.',
          },
          {
            type: 'match',
            prompt: 'Match the industry to its core metric',
            pairs: [
              ['SaaS subscriptions', 'Net revenue retention'],
              ['Chain retail', 'Same-store sales growth'],
              ['E-commerce platforms', 'GMV × take rate'],
              ['Memory chips', 'Inventory & contract prices'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'i8',
    title: 'Unit 8 · Reading Management',
    subtitle: 'What they say on the call — and what they don’t',
    color: '#ec4899',
    colorDark: '#c2337a',
    icon: '🎙️',
    lessons: [
      {
        id: 'i8l1',
        title: 'The language of guidance',
        tips: [
          'Guidance is management’s official forecast for next quarter/year — more than half of the market’s earnings reaction is driven by guidance, not the reported quarter.',
          'The unwritten rule: managements guide conservatively and then beat ("beat-and-raise"). Apple beats its own guidance almost ritually — so merely meeting guidance can itself signal weakening.',
          'Withdrawn guidance is a big event: in March 2020 hundreds of companies pulled full-year guidance — an admission that visibility had gone to zero.',
          'Listen for marginal wording shifts: "strong demand" downgraded to "macro uncertainty" usually precedes the numbers downgrading.',
        ],
        analogy:
          'The straight-A student says "I didn’t prepare well" before every exam (conservative guidance), then scores 95 (beat). One day he says "it went okay" — and scores 85. Once you know someone’s language baseline, the same sentence means different things from different mouths. Management teams have baselines too.',
        exercises: [
          {
            type: 'choice',
            question: 'A company that habitually guides low and beats big merely "meets" its guidance this quarter. The seasoned read?',
            options: ['Target hit, no problem', 'Against its own baseline of chronic beats, a mere "meet" is a deceleration signal', 'Time to celebrate', 'Guidance is meaningless'],
            correct: 1,
            explain: 'Read guidance against that company’s own historical habit. When the baseline is "always beats", scraping the bar means slowing.',
          },
          {
            type: 'tf',
            statement: 'The market’s reaction to earnings is driven mainly by the quarter that already happened.',
            answer: false,
            explain: 'Nvidia in May 2023: the quarter was merely in line, guidance beat by 53%, and the stock rose 24% after hours. Markets buy the future; guidance is the future’s official carrier.',
          },
          {
            type: 'fill',
            before: 'A company suddenly',
            after: 'its full-year guidance — an admission that visibility is near zero, and usually a major risk signal.',
            options: ['withdraws', 'raises', 'reaffirms', 'refines'],
            correct: 0,
            explain: 'Guidance-withdrawal waves hit in March 2020 and in 2008. When management won’t even give a number, they can’t see either.',
          },
          {
            type: 'choice',
            question: 'Across consecutive calls, management’s demand language shifts from "strong demand" to "macro uncertainty". This is?',
            options: ['Meaningless phrasing drift', 'A marginal language downgrade — wording softens before numbers do, one of the cheapest leading indicators', 'Lawyer-mandated boilerplate', 'A translation issue'],
            correct: 1,
            explain: 'Management never capitulates suddenly, but the wording loosens first. Diffing the language quarter over quarter is core call-reading technique.',
          },
        ],
      },
      {
        id: 'i8l2',
        title: 'The Q&A: evasion is information',
        tips: [
          'The Q&A beats the prepared remarks: the script is rehearsed; what management doesn’t want to say hides in the answers.',
          'Classic evasions: deflecting a margin question into growth talk, "we don’t look at the business that way", reciting vision instead of numbers. Whatever analysts keep re-asking is the market’s biggest anxiety.',
          '"Discontinuing a disclosure" is a strong signal: Apple stopped reporting iPhone unit sales in 2018 and the stock slid hard within the quarter — the market assumes a number no longer shown is a number turning ugly.',
          'Rule: write down the questions management dodged; that list is what to watch next quarter.',
        ],
        analogy:
          'Ask a kid how the exam went: he excitedly talks about PE class (deflection), says "the whole class did poorly" (changed measure), and finally "stop asking about scores, holistic quality matters" (discontinued disclosure) — every evasion tells you the math test went badly. Management evasions work identically.',
        exercises: [
          {
            type: 'choice',
            question: 'Apple announced in 2018 it would stop disclosing iPhone unit sales. What did the market’s reaction reveal?',
            options: [
              'Disclosure was too much hassle',
              '"Stopped disclosing" was read as "turning ugly" — units had peaked and Apple wanted the narrative on services; the stock fell hard within the quarter',
              'A regulatory requirement',
              'Nothing at all',
            ],
            correct: 1,
            explain: 'Companies flaunt good numbers and bury bad ones — the first law of disclosure behavior. The day a metric disappears is usually the day it turned.',
          },
          {
            type: 'tf',
            statement: 'The question analysts keep pressing and management keeps dodging is usually the market’s key controversy.',
            answer: true,
            explain: 'The Q&A is a live projection of market anxiety. Recording the dodged questions as next quarter’s watchlist is smart laziness.',
          },
          {
            type: 'fill',
            before: 'On an earnings call, the prepared remarks are a script; the information density lives in the',
            after: 'section.',
            options: ['Q&A', 'disclaimers', 'acknowledgements', 'advertising'],
            correct: 0,
            explain: 'Scripts get polished; live responses under pressure cannot be. Jump to the Q&A first when reading transcripts.',
          },
          {
            type: 'choice',
            question: 'Pressed on core-business margins, the CEO replies: "We focus on long-term vision and user value." The information content of that answer?',
            options: ['Great vision', 'The margin number is probably ugly — deflecting a numeric question with vision is the most classic evasion', 'They truly don’t care about profit', 'None'],
            correct: 1,
            explain: 'Management with good numbers states them instantly. Vision is the smoke machine of choice when numbers disappoint.',
          },
        ],
      },
      {
        id: 'i8l3',
        title: 'The red-flag checklist',
        tips: [
          'One red flag may be coincidence; several at once are a behavior pattern. The list: sudden CFO exit, auditor change, delayed filings, receivables growing far faster than revenue, shifting business definitions, exploding SBC, sustained insider selling.',
          'The three highest-severity flags: auditor resignation (SMCI 2024 — EY quit, stock -80% from peak), delayed annual reports, exposed related-party dealings.',
          'Live textbook: Luckin 2020 — a short report showed store traffic didn’t match claims; the company then admitted ¥2.2B of fabricated sales; -75% in a day, delisted. Fraud first cracks where numbers fail to reconcile.',
          'Rule: when red flags appear, de-risk first and investigate second. The order is always "survive, then verify" — by the time truth arrives, the price has already finished falling.',
        ],
        analogy:
          'A blind date who keeps the phone face-down (non-disclosure), has changed "financial advisors" three times (auditor churn), and whose friends are quietly drifting away (insider selling) — each item has an excuse; together they are a pattern. The checklist isn’t a verdict; it just gets your hand out of your pocket.',
        exercises: [
          {
            type: 'choice',
            question: 'Which combination carries the highest danger level?',
            options: [
              'Falling stock + analyst downgrades',
              'Auditor change + delayed annual report + CFO exit — three links of the financial-credibility chain breaking at once',
              'Executive stock-sale plans + steady results',
              'One negative news article',
            ],
            correct: 1,
            explain: 'All three point at the same thing: the gatekeepers of the numbers have a problem. SMCI collected the first two in 2024 and fell 80%+ from its peak.',
          },
          {
            type: 'tf',
            statement: 'Receivables growing far faster than revenue for consecutive quarters is a classic red flag for revenue quality.',
            answer: true,
            explain: 'Money booked but never collected — the pattern preceded Luckin and other frauds. This flag was foreshadowed in the L1 cash-flow lesson.',
          },
          {
            type: 'fill',
            before: 'The correct order when red flags appear: first',
            after: ', then verify at leisure — the price finishes falling before the truth arrives.',
            options: ['reduce the position', 'average down', 'argue online', 'wait for next quarter'],
            correct: 0,
            explain: 'Luckin fell 75% on the day it confessed — no graceful exit window existed. Disciplined reaction to red flags is part of the L4 research habit.',
          },
          {
            type: 'match',
            prompt: 'Match the red flag to what it points at',
            pairs: [
              ['Auditor resignation', 'Financial credibility collapsing'],
              ['Exploding receivables', 'Dubious revenue quality'],
              ['Sustained insider selling', 'Insiders voting with their feet'],
              ['Shifting business definitions', 'Obscuring the real trend'],
            ],
          },
        ],
      },
    ],
  },
);

/* ================= L3 What the Market Is Trading ================= */

investCourseEn.push(
  {
    id: 'i9',
    title: 'Unit 9 · Expectations: What Is in the Price',
    subtitle: 'Why great results can mean a falling stock',
    color: '#f59f00',
    colorDark: '#c47f00',
    icon: '🎭',
    lessons: [
      {
        id: 'i9l1',
        title: 'Priced in: good news that sells off',
        tips: [
          'A stock price is not a grade on reality — it is a quote on the expected future. Good news everyone anticipated is already in the price.',
          'Hence "beat and fall": the report beat the official estimate but missed the market’s private, higher bar (the whisper number).',
          'The classic shape — buy the rumor, sell the news: the rally happens during the anticipation phase; the announcement itself fires the profit-taking gun.',
          'Rule: on any big headline, ask two questions first — how many people saw this coming, and how much has the price already moved for it?',
        ],
        analogy:
          'A student brings home a 95 and gets scolded — because the parents had heard he could score 98. The score doesn’t matter; beating or missing the number in their heads does. The market’s parents are the whisper expectations.',
        exercises: [
          {
            type: 'choice',
            question: 'A star company beats EPS estimates by 5% and falls 8% that day. The most common explanation?',
            options: [
              'The market is irrational',
              'The stock had run up and whisper numbers sat far above official estimates — a 5% beat was actually "not good enough"',
              'Accounting fraud',
              'Insider selling',
            ],
            correct: 1,
            explain: 'For crowded names the real bar is the expectation embedded in the run-up, not the analyst consensus. Check how much optimism is already priced before predicting the reaction.',
          },
          {
            type: 'fill',
            before: '"Buy the rumor, sell the news": the rally completes during the',
            after: 'phase; the official announcement often marks the top.',
            options: ['rumor/anticipation', 'earnings release', 'dividend', 'trading halt'],
            correct: 0,
            explain: 'Bitcoin topped and corrected ~20% right after the January 2024 ETF approval — the gains had been made in the anticipation phase.',
          },
          {
            type: 'tf',
            statement: 'A positive catalyst that everyone already knows about is usually in the price, with no new fuel left on arrival.',
            answer: true,
            explain: 'Prices move on incremental information. Universally known news has no increment — unless the details beat or miss.',
          },
          {
            type: 'choice',
            question: 'Before a big announcement lands, the first thing to check to predict the reaction is?',
            options: ['The company website', 'How much the price has already moved for this expectation — the run-up is the thermometer of priced-in hope', 'The CEO’s horoscope', 'Candle colors'],
            correct: 1,
            explain: 'The same news lands oppositely on a stock up 50% into the event versus one that never moved.',
          },
        ],
      },
      {
        id: 'i9l2',
        title: 'The expectations gap: the market’s only fuel',
        tips: [
          'Prices are never moved by "good or bad" — only by the gap versus expectations. Terrible results above panic expectations rally; great results below euphoric expectations fall.',
          'Live case A: in mid-2022 many companies posted ugly quarters, but with recession already priced, "less bad than feared" itself became the bullish catalyst.',
          'Live case B: Nvidia in May 2023 — the quarter merely in line, but guidance 53% above the Street: +24% overnight. The gap lived entirely in the future.',
          'Rule: for any report, line up three columns — the actual number, the official estimate, and the expectation implied by sentiment. Only the gap to the third column trades.',
        ],
        analogy:
          'Two students: the slacker scores 60 and the family celebrates (they expected 40); the ace scores 92 and gets a lecture (they expected 98). Scores are absolute; emotional reactions only recognize the gap. The market grades that emotional exam daily.',
        exercises: [
          {
            type: 'choice',
            question: 'Mid-2022: a retailer reports profit down 30% YoY and rallies 12% that day. Best explanation?',
            options: [
              'The market misread',
              'The price had already discounted a profit halving; -30% beat the panic bar — "less bad" is bullish',
              'Manipulation',
              'Falling profit is good',
            ],
            correct: 1,
            explain: 'The fuel is the gap. Before predicting a reaction, measure how much panic or euphoria is already in the price.',
          },
          {
            type: 'tf',
            statement: 'Nvidia soared 24% after hours in May 2023 mainly because quarterly revenue crushed estimates.',
            answer: false,
            explain: 'The quarter was in line; the detonator was $11B guidance versus $7.2B expected — the 53% gap sat entirely in the future. (The full replay lives in the Daily Case.)',
          },
          {
            type: 'fill',
            before: 'The right way to read a report: three columns — actual, official estimate, and',
            after: '; only the last column’s gap drives the tape.',
            options: ['the sentiment-implied expectation', 'last year’s number', 'executive pay', 'headcount'],
            correct: 0,
            explain: 'Official estimates are public; the sentiment-implied bar hides in recent price action, options pricing and positioning — that is the real counterparty price.',
          },
          {
            type: 'choice',
            question: 'Turning gap-thinking into action: the single best pre-earnings habit for a holding?',
            options: [
              'Close the trading app',
              'Write down what expectation you think is priced (euphoric/neutral/panicked), then judge the print against that — not against analyst consensus',
              'Sell everything',
              'Double the position',
            ],
            correct: 1,
            explain: 'Writing the expectation down beforehand is the best defense against hindsight stories — and a rehearsal for the L4 habit.',
          },
        ],
      },
      {
        id: 'i9l3',
        title: 'Reverse engineering: what does the price assume',
        tips: [
          'The advanced move is not predicting the future but reverse-engineering the assumptions in today’s price — then judging those assumptions.',
          'Rough demo: a stock at 50× earnings against a 20× market implies far-above-average profit growth for years. If your evidence says growth can’t carry that, you finally have grounds for a judgment.',
          'Options price the expectations explicitly: implied volatility is the market’s quote on future movement, and the pre-earnings implied move tells you exactly how much the market expects the print to move the stock. (The options track converges here.)',
          'Rule: instead of "will it go up?", ask "what does the price assume, and do I agree?" — the watershed between betting on direction and making judgments.',
        ],
        analogy:
          'A family asking a 1M bride price implicitly assumes "our child is far above average". You don’t need to predict the child’s future — just audit whether the assumption behind the asking price holds. Valuation analysis is due diligence on the assumptions inside a quote.',
        exercises: [
          {
            type: 'choice',
            question: 'A stock trades at 60× earnings (market at 20×). Step one of reverse-engineering?',
            options: [
              'Sell — too expensive',
              'Back out the implied assumption: the market is betting on years of rapid profit growth — then test that assumption against evidence',
              'Wait for 20×',
              'Ask around',
            ],
            correct: 1,
            explain: '60× is innocent by itself: if profit triples in three years it becomes 20×. The judgment target is always "implied assumption versus evidence", never the multiple alone.',
          },
          {
            type: 'fill',
            before: 'Implied volatility is, at heart, the market’s quote on future',
            after: '.',
            options: ['movement', 'dividends', 'volume', 'listing age'],
            correct: 0,
            explain: 'IV pumping before earnings = big move expected; IV crushing after = uncertainty resolved. The options track’s IV crush, retold in the language of expectations.',
          },
          {
            type: 'tf',
            statement: 'The pre-earnings implied move computed from option prices tells you how much the market expects the print to move the stock.',
            answer: true,
            explain: 'Implied move ±8%: a 3% move pays the volatility sellers, a 15% move pays the buyers. The market’s expectations are always quoted — hanging on the options chain.',
          },
          {
            type: 'choice',
            question: 'Why is "what does the price assume, and do I agree?" superior to "will it go up?"',
            options: [
              'It sounds smarter',
              'The first is an unverifiable bet; the second decomposes into testable assumptions and evidence — wrong answers teach you where you erred. That compounds into judgment',
              'Because it is more complex',
              'No difference',
            ],
            correct: 1,
            explain: 'Only falsifiable, reviewable judgments improve with reps. This question leads straight into L4: thesis, falsifier, post-mortem.',
          },
        ],
      },
    ],
  },
  {
    id: 'i10',
    title: 'Unit 10 · The Psychology of Multiples',
    subtitle: 'Same profit, sometimes 10×, sometimes 30×',
    color: '#0ea5e9',
    colorDark: '#0284c7',
    icon: '⚖️',
    lessons: [
      {
        id: 'i10l1',
        title: 'The Davis double play',
        tips: [
          'Price = earnings (EPS) × multiple (P/E). Two engines that can fire — or stall — together.',
          'Davis double play: profits grow while the multiple the market will pay expands → the stock far outruns the profits. Microsoft 2013–2021: profit roughly 2×, P/E from ~10× to ~35×, stock ~10×.',
          'The double kill is the mirror: shrinking profits × compressing multiple. 2022 SaaS: revenue still growing, multiples cut from 40× sales to 6×, stocks -80%.',
          'Rule: attribute every big move into "how much came from earnings, how much from the multiple" — the multiple’s share is rented from sentiment and must be maintained by it.',
        ],
        analogy:
          'A flat’s rent doubles from 40k to 80k (earnings), while the street becomes a school district and buyers pay 30 years of rent instead of 15 (multiple) — the flat quadruples. Both reverse together on the way down. That is the double play and the double kill.',
        exercises: [
          {
            type: 'fill',
            before: 'A stock price decomposes into two engines: EPS ×',
            after: '.',
            options: ['the valuation multiple', 'headcount', 'volume', 'payout ratio'],
            correct: 0,
            explain: 'Every rally and crash attributes to these two. Identifying which engine is firing is the first cut of any post-mortem.',
          },
          {
            type: 'choice',
            question: 'Microsoft’s profit roughly doubled from 2013–2021 while the stock rose ~10×. The extra came mostly from?',
            options: [
              'Accounting magic',
              'Multiple expansion: the market switched its pricing of Microsoft from "faded giant" at 10× to "cloud leader" at 35× — the textbook double play',
              'Stock splits',
              'Advertising',
            ],
            correct: 1,
            explain: 'Nadella’s cloud pivot re-narrated the same company. The biggest gains often come from the market changing its lens, not the profits alone.',
          },
          {
            type: 'tf',
            statement: 'In 2022 many SaaS names kept growing revenue yet fell 70–80%, purely because multiples compressed.',
            answer: false,
            explain: 'Mostly the multiple (40× → 6× sales), but growth estimates were also cut — both ends compressed, with the multiple as lead surgeon. Attribute each engine separately instead of saying "it fell".',
          },
          {
            type: 'choice',
            question: 'A stock quadrupled in two years; decomposition shows profit grew 30% and the rest was multiple expansion. What does this structure tell you?',
            options: [
              'Fundamentals-driven and safe',
              'Most of the gain rides on sentiment paying up — without earnings taking the baton, the drawdown can be violent',
              'Another 4× is coming',
              'Decomposition is pointless',
            ],
            correct: 1,
            explain: 'Multiples are borrowed; earnings are owned. Holding a multiple-driven position means knowing you are earning "someone paying dearer" money.',
          },
        ],
      },
      {
        id: 'i10l2',
        title: 'Ruler-switch moments',
        tips: [
          'Different life stages get different rulers: unprofitable growth → P/S; stable earners → P/E; heavy-asset cyclicals → P/B; mature cash cows → FCF yield and dividends.',
          'The switch itself is the trade: 2020–21 priced growth on P/S and stories; after rates rose in 2022 the market switched back to FCF and earnings — same company, new ruler, -70%.',
          'Companies fight for flattering rulers: early Tesla campaigned to be measured as tech (high multiple) rather than autos (10× P/E); the market eventually voted with deliveries and margins.',
          'Rule: before judging "cheap or dear", ask which ruler the market currently uses and what would make it switch. Ruler risk is stealthier and deadlier than earnings risk.',
        ],
        analogy:
          'The same person on a blind date: measured as a "growth stock" (elite school, bright future) he scores high; measured on "current state" (5k monthly salary) he scores low. Reversals often come not from the person changing, but from the future in-laws changing rulers.',
        exercises: [
          {
            type: 'match',
            prompt: 'Match the company stage to the market’s usual ruler',
            pairs: [
              ['Unprofitable high growth (early SaaS)', 'P/S price-to-sales'],
              ['Stable profitable growth', 'P/E price-to-earnings'],
              ['Heavy-asset cyclical (banks/shipping)', 'P/B price-to-book'],
              ['Mature cash cow', 'FCF yield / dividends'],
            ],
          },
          {
            type: 'choice',
            question: 'Rates rose in 2022 and the growth-stock ruler switched from "P/S + story" to "FCF + earnings". For companies without profits, that meant?',
            options: [
              'No effect',
              'Disaster: on the new ruler their reading was near zero — the deepest falls hit exactly those scoring highest on the old ruler and lowest on the new',
              'Bullish: no more profit comparisons',
              'Instant profitability',
            ],
            correct: 1,
            explain: 'At ruler switches, the worst casualties are not the worst businesses but the most old-ruler-dependent ones. Ask of every holding: does it survive a ruler change?',
          },
          {
            type: 'tf',
            statement: 'Tesla long campaigned to be valued with the tech-company ruler rather than the automaker ruler, because the multiples differ enormously.',
            answer: true,
            explain: 'Automakers live at 5–10× earnings; tech platforms can carry 30×+. Which category you are filed under is itself worth multiples — the core battlefield of corporate narrative management.',
          },
          {
            type: 'choice',
            question: 'The most important macro trigger of ruler-switch risk?',
            options: ['Weather', 'Turns in the rate regime — easy money measures with far-future story rulers; tightening switches back to present-cash rulers', 'Holidays', 'Pundit counts'],
            correct: 1,
            explain: 'The confluence of the L1 rates lesson and the L3 multiples lesson: rates pick the ruler, and the ruler picks whose valuation gets rewritten.',
          },
        ],
      },
      {
        id: 'i10l3',
        title: 'Anchors and contagion',
        tips: [
          'Markets price individual stocks against anchors: peer multiples, sector averages, the leader’s valuation. Move the anchor and the whole sector reprices.',
          'Contagion, live: the night of Nvidia’s 2023 guidance, AMD, Broadcom, TSMC and even Micron jumped without news of their own — the leader’s repricing lifted every anchor in the sector.',
          'Sympathy moves come in grades: names with real order flow down the chain (TSMC) rally with cause; names that merely "have AI in the deck" rally on borrowed courage and give it back first when the tide turns.',
          'Rule: when a holding jumps because the sector anchor moved, ask whether it actually received orders or merely stood near the anchor — the answer decides hold versus harvest.',
        ],
        analogy:
          'One flat sells at a record price and every listing in the compound is raised overnight (the anchor moved). But at actual sales, identical layouts fetch the new price (real transmission) while the dark north-facing units still can’t sell (fake contagion). Sector rallies contain both kinds of stocks.',
        exercises: [
          {
            type: 'choice',
            question: 'The night Nvidia’s guidance exploded in May 2023, TSMC, AMD and Micron all jumped without reporting anything. The mechanism?',
            options: [
              'Coincidence',
              'Anchor movement: the leader’s repricing reset the sector’s valuation baseline — and AI demand would transmit down the chain as real orders for them',
              'They all released good news simultaneously',
              'An exchange glitch',
            ],
            correct: 1,
            explain: 'Half relative-valuation anchor lift, half fundamental transmission. Diagnosing which half a sympathy rally rests on decides whether it is holdable.',
          },
          {
            type: 'tf',
            statement: 'In a sector rally, concept-adjacent names and real-order names can rise together short term, but their fates diverge when the tide goes out.',
            answer: true,
            explain: 'Through 2023–24, HBM-order-rich SK Hynix kept climbing while many "AI concept" names round-tripped. Tides exist to separate the two.',
          },
          {
            type: 'fill',
            before: 'The trap of peer comparison: if sentiment has lifted the whole sector’s anchor, "cheaper than peers" may only mean',
            after: '.',
            options: ['less outrageously expensive', 'absolutely cheap', 'fraudulent', 'risk-free'],
            correct: 0,
            explain: 'In 2000, dot-coms "30% cheaper than peers" still fell 90%. Cross-check relative valuation with an absolute ruler — cash flow.',
          },
          {
            type: 'choice',
            question: 'Your holding is up 40% purely from a sector anchor lift, with no new orders or data of its own. The framework response?',
            options: [
              'Stay fully invested for the next wave',
              'Recognize anchor-adjacent gains: set harvesting discipline on the sentiment-paid portion, and wait for real orders before deciding to hold long term',
              'Dump everything now',
              'Add leverage',
            ],
            correct: 1,
            explain: 'Anchor gains lack fundamental collateral — quick to come, quick to go. Money earned from anchors and money earned from results deserve different position discipline.',
          },
        ],
      },
    ],
  },
  {
    id: 'i11',
    title: 'Unit 11 · Marginal Change & the Second Derivative',
    subtitle: 'Markets trade change, not levels',
    color: '#8b5cf6',
    colorDark: '#7040d6',
    icon: '📈',
    lessons: [
      {
        id: 'i11l1',
        title: 'Second-derivative thinking',
        tips: [
          'Markets care far more about the direction of change than the level: 8% inflation falling beats 4% inflation accelerating.',
          'Live: November 2022, CPI came off the 9.1% peak to 7.7% — still dreadful, but the turn itself sent the Nasdaq up 7.4% in a day, its biggest session in two years.',
          'Same in March 2020: the pandemic still worsening, but worsening more slowly plus unlimited QE — the market bottomed far ahead of reality. (Replayed in the Daily Case.)',
          'Rule: for any data point ask three layers — what is the level? Is it improving or deteriorating (first derivative)? Is that change speeding up or slowing (second derivative)? The tape mostly lives on the third layer.',
        ],
        analogy:
          'The patient still runs a 39° fever (awful level), but is down from 40.5° (direction) and cooling faster (second derivative) — and the family is already booking the celebration dinner. The market is that family, always booking early.',
        exercises: [
          {
            type: 'choice',
            question: 'November 2022: CPI prints 7.7% — still a multi-decade high — and the Nasdaq jumps 7.4% in a day. Why can a "still terrible" number detonate a rally?',
            options: [
              'The market miscalculated',
              'It turned down from 9.1% — "the worsening has ended" repriced the whole hiking path. Markets trade the second derivative, not the level',
              '7.7% is a good number',
              'A short-squeeze accident',
            ],
            correct: 1,
            explain: 'Inflation turns → peak-rates expectations → discount rates ease → multiples recover: the whole chain priced in one session. Levels belong to economists; turns belong to markets.',
          },
          {
            type: 'fill',
            before: 'The three-layer reading: level → direction (first derivative) →',
            after: '(second derivative); the tape mostly trades the third layer.',
            options: ['speed of change', 'data source', 'release time', 'historical average'],
            correct: 0,
            explain: '"Worsening, but decelerating" and "improving, but decelerating" are where the most money is made and lost.',
          },
          {
            type: 'tf',
            statement: 'Waiting for data to fully confirm the recovery usually means missing the steepest leg of the rally.',
            answer: true,
            explain: 'At the March 23, 2020 bottom, unemployment hadn’t even spiked yet; by confirmation six months later the index was 40% higher. Markets front-run reality by a quarter or two.',
          },
          {
            type: 'choice',
            question: 'A company’s revenue growth prints +60% → +45% → +32% → +24% across four quarters. Still fast — but how will the market likely treat it?',
            options: [
              'Value it on 60% growth',
              'Price the deceleration curve: the second derivative is persistently negative, so the market discounts the slide toward mediocrity in advance — the multiple lands before the growth does',
              'Ignore the change, keep the absolute',
              'React only at negative growth',
            ],
            correct: 1,
            explain: 'Zoom and Shopify fell hardest in 2021–22 while still growing. Deceleration itself is the bad news.',
          },
        ],
      },
      {
        id: 'i11l2',
        title: 'Spotting turns: QoQ, inventory, guidance',
        tips: [
          'Turns hide in the sequential (QoQ) numbers: YoY still falling while QoQ improves for two straight quarters is often the earliest filed evidence of a cycle turn.',
          'Inventory-cycle turn signal (callback to L2): channel inventory peaking and rolling over + producer cuts done = the start of the next price upcycle. Memory chips ran exactly this script in late 2023.',
          'Guidance turns: management shifting from cutting to reaffirming, then to raising — the language turn leads the numbers turn by about a quarter.',
          'Rule: don’t chase month-level precision; act when the evidence chain assembles: QoQ improving + inventory cleared + guidance turning. Two of three, then move.',
        ],
        analogy:
          'Judging winter’s end: not by today’s cold (level), but by lengthening days (sequential direction), clearance sales on down jackets (inventory cleared), and forecasts turning milder in wording (guidance). Two of the three and you pack away the thick duvet.',
        exercises: [
          {
            type: 'choice',
            question: 'A chip company’s revenue is still -20% YoY, but QoQ has improved two straight quarters and announced capacity cuts are taking effect. The cyclical read?',
            options: [
              'YoY negative — keep avoiding',
              'A turn’s evidence chain is assembling: QoQ leads YoY in every cycle turn — markets typically finish bottoming while YoY is still negative',
              'Contradictory data, no call possible',
              'Wait for YoY to turn positive',
            ],
            correct: 1,
            explain: 'Memory in late 2023 ran this script: Micron was up 60%+ from the lows while YoY was still deeply negative. YoY is the rearview mirror; QoQ is the windshield.',
          },
          {
            type: 'fill',
            before: 'The earliest filed evidence of a cycle turn is usually',
            after: 'improving while YoY is still negative.',
            options: ['QoQ (sequential)', 'market cap', 'shareholder count', 'ad spend'],
            correct: 0,
            explain: 'YoY carries twelve months of baggage; QoQ carries three — it turns first.',
          },
          {
            type: 'tf',
            statement: 'Management shifting guidance from "cutting" to "reaffirming" is a turn signal worth recording even though the numbers haven’t improved.',
            answer: true,
            explain: 'No-longer-worse is marginal improvement — the language turn (L2’s reading-management lesson) leads the results turn by about a quarter.',
          },
          {
            type: 'choice',
            question: 'Which statement best captures this lesson’s action discipline for turns?',
            options: [
              'Go all-in on the first signal',
              'Act when two of three assemble — QoQ improving, inventory cleared, guidance turning; trade precision for an evidence chain and accept missing the exact low',
              'Act only after full confirmation',
              'Turns are unknowable; give up',
            ],
            correct: 1,
            explain: 'The goal is boarding when evidence favors you, not catching the tick low. Full confirmation (option 3) misses the move; single signals (option 1) get faked out repeatedly.',
          },
        ],
      },
      {
        id: 'i11l3',
        title: 'Marginal pricing: who is trading right now',
        tips: [
          'Price is set by the marginal trader: not a vote of all holders, but the handful willing to buy or forced to sell right now.',
          'So positioning is the hidden short-term variable: when everyone bullish is already fully invested (a crowded trade), good news finds no incremental buyer; when every seller has sold, bad news stops working — the microstructure behind "priced in".',
          'Forced traders are the strongest marginal force: shorts buying back in a squeeze (GME), funds selling into redemptions (the 2022 UK pension crisis), passive money at index changes (Tesla’s inclusion) — none of them look at valuation.',
          'Rule: in extreme tape, ask "who is being forced to trade?" before "what changed in the fundamentals?" — it usually explains what valuation cannot.',
        ],
        analogy:
          'The compound’s price is set by the three flats listed right now, not the thousand contented owners. If those three sellers are desperate, prints can land far below everyone’s private value — until the desperate supply clears and price snaps back.',
        exercises: [
          {
            type: 'choice',
            question: 'The microstructure explanation of "good news exhausted"?',
            options: [
              'The news was fake',
              'Everyone bullish is already fully positioned (crowded); when the news lands there is no incremental buyer left — only profit-takers at the margin',
              'A manipulation scheme',
              'System failure',
            ],
            correct: 1,
            explain: 'Prices need incremental marginal buyers. Crowdedness sets the tape’s elasticity to the same headline — the microstructure version of i9’s priced-in.',
          },
          {
            type: 'tf',
            statement: 'In extremes, price can detach violently from fundamentals because pricing power temporarily belongs to forced traders, who do not look at valuation.',
            answer: true,
            explain: 'Squeezed shorts, redeemed funds, liquidated leverage — forced traders need fills, not fair value. Spotting when they are done matters more than debating valuation near bottoms.',
          },
          {
            type: 'fill',
            before: 'In extreme tape, the first question is not "what changed in fundamentals" but "who is being',
            after: 'right now".',
            options: ['forced to trade', 'interviewed', 'posting online', 'hosting calls'],
            correct: 0,
            explain: 'GME’s shorts, the UK pensions’ LDI selling, index funds on inclusion day — the forced explain what valuation cannot.',
          },
          {
            type: 'choice',
            question: 'A stock with no news falls 30% on heavy volume; you learn a fund that owns it heavily is facing large redemptions. The framework read?',
            options: [
              'Fundamentals must have collapsed',
              'Likely a forced-seller technical mispricing: the selling is value-blind and ends when the seller is done — a cue to start fundamental work on a potential opportunity',
              'Sell along',
              'There must be inside information',
            ],
            correct: 1,
            explain: 'Distinguish "someone must sell" from "the asset is worthless". Forced-liquidation mispricings are among the most classic sources of active opportunity.',
          },
        ],
      },
    ],
  },
  {
    id: 'i12',
    title: 'Unit 12 · Narrative and Price',
    subtitle: 'Stories drive prices; prices rewrite stories',
    color: '#f43f5e',
    colorDark: '#d1284a',
    icon: '📖',
    lessons: [
      {
        id: 'i12l1',
        title: 'Narrative lifecycles and reflexivity',
        tips: [
          'Every big move rides a dominant narrative, and narratives have lifecycles: germination (a few researchers) → diffusion (media relay) → consensus (everyone knows) → mania (everything gets the label) → falsification or fulfillment.',
          'The AI narrative germinated late 2022 (ChatGPT), reached consensus in May 2023 (Nvidia night), then entered "everything is AI" diffusion. Locating your position on the curve beats debating whether the narrative is true.',
          'Reflexivity (Soros): price doesn’t just reflect fundamentals — it rewrites them. A soaring stock enables cheap equity raises, option-fueled hiring, better credit: the fundamentals genuinely improve. Tesla raising ~$12B off its 2020 surge to fix its balance sheet is the textbook case.',
          'Rule: for narrative stocks ask two things — where on the lifecycle is the story, and can the rising price itself self-fulfillingly improve the fundamentals?',
        ],
        analogy:
          'A viral restaurant: a food blogger discovers it (germination), queue photos flood feeds (consensus), scalpers resell queue numbers (mania). Meanwhile the queues fund new branches and better chefs — being popular genuinely made it a bit better. That is reflexivity. But queues disperse faster than they gather.',
        exercises: [
          {
            type: 'choice',
            question: 'The precise meaning of "reflexivity"?',
            options: [
              'Prices are always wrong',
              'Price and fundamentals shape each other: a soaring stock enables cheap capital, talent and credit — expectations participate in creating the reality they expect',
              'Prices are always right',
              'Prices and fundamentals are unrelated',
            ],
            correct: 1,
            explain: 'Tesla’s 2020 surge financed ~$12B of equity that erased bankruptcy risk — the squeeze itself repaired the fundamentals. The most dangerous and fascinating property of bubbles.',
          },
          {
            type: 'match',
            prompt: 'Match the lifecycle stage to its telltale',
            pairs: [
              ['Germination', 'A few researchers, no coverage'],
              ['Consensus', 'Front pages; everyone can recite it'],
              ['Mania', 'Everything gets the label'],
              ['Falsification/fulfillment', 'Numbers take over the pricing'],
            ],
          },
          {
            type: 'tf',
            statement: 'Locating a narrative’s lifecycle stage is more actionable than debating whether the narrative is ultimately true.',
            answer: true,
            explain: 'The internet narrative proved true, yet buying the 2000 mania still lost 80%. Truth decides the endpoint; stage decides your entry price. Both matter — the second one pays.',
          },
          {
            type: 'choice',
            question: 'A narrative enters the "everything gets the label" stage (any name with the concept rallies). The signal value?',
            options: [
              'The narrative is now more credible',
              'Mania stage: capital is pricing indiscriminately, and the falsification filter is usually near — time to concentrate holdings from label-wearers into real-order-holders',
              'Every related stock is a buy',
              'No meaning',
            ],
            correct: 1,
            explain: 'After the 2023–24 "AI concept" stage, the tide separated the SMCIs from the TSMCs. The right move in mania is not exit — it is purification.',
          },
        ],
      },
      {
        id: 'i12l2',
        title: 'Auditing the narrative with numbers',
        tips: [
          'Narratives explain why it rose; numbers verify whether it should have. Periodically reconciling story against filings is the only defense against being imprisoned by a story.',
          'The audit kit: story says demand explosion → check revenue and order growth; story says improving competitive structure → check gross margin and share; story says giant future → check whether capex/R&D money is real.',
          'Paired textbook (both replayed in the Daily Case): Nvidia’s AI story re-verified every quarter by doubling data-center revenue; SMCI’s story falsified by delayed filings and a resigning auditor. Same narrative, opposite ledgers.',
          'Rule: allow the story a one-to-two-quarter lead over numbers (markets front-run), but two or three quarters of failed reconciliation = treat as falsified, not "one more chance".',
        ],
        analogy:
          'The boyfriend says "I’m working on myself" (narrative); you check his transcripts and savings quarterly (the audit). One flat quarter is understandable; three ugly report cards with the same speech — treat it as falsified. In relationships it’s called cutting losses. In investing too.',
        exercises: [
          {
            type: 'match',
            prompt: 'Match the story to its audit line-item',
            pairs: [
              ['"Demand is exploding"', 'Revenue and order growth'],
              ['"Competition is rationalizing"', 'Gross margin and share'],
              ['"The future market is huge"', 'Capex and R&D spend'],
              ['"Customers can’t leave us"', 'Retention / repeat rates'],
            ],
          },
          {
            type: 'choice',
            question: 'Nvidia and SMCI shared the same AI narrative through 2023–24, yet ended at new highs versus -80%. The core action separating them?',
            options: [
              'Watch which rose more',
              'Audit the story: Nvidia’s revenue, margins and cash verified it quarterly; SMCI’s books lost even their auditor’s signature — same narrative, different ledgers',
              'Watch which was more famous',
              'Flip a coin',
            ],
            correct: 1,
            explain: 'The narrative is the entry ticket; the ledger is the right to stay seated. Audit quarterly and you never ride a false narrative to the terminus.',
          },
          {
            type: 'tf',
            statement: 'A story may lead the numbers by a quarter or two (markets front-run), but two-three quarters of failed reconciliation should be treated as falsification.',
            answer: true,
            explain: 'Grace period plus deadline turns vague conviction into executable discipline — and the deadline admits no exceptions precisely because exceptions are most tempting when deadlines arrive.',
          },
          {
            type: 'fill',
            before: 'Narratives explain why it rose;',
            after: 'verify whether it should have.',
            options: ['numbers', 'influencers', 'headlines', 'feelings'],
            correct: 0,
            explain: 'Tape this sentence to your trading screen. It outperforms a hundred aphorisms.',
          },
        ],
      },
      {
        id: 'i12l3',
        title: 'Full integration: reading the market once, properly',
        tips: [
          'Assemble L3 into one checklist. The four-part diagnosis of "great results, falling stock": ① expectations already full (priced in) ② multiple compressing (ruler/rates) ③ margin weakening (growth’s second derivative negative) ④ narrative rotating (the market changed its main story).',
          'The mirror — "terrible results, rising stock": ① panic expectations cleared ② a kinder ruler adopted ③ deterioration decelerating ④ a new narrative germinating. Both sides run the same framework.',
          'Field order: expectations first (what’s in the price) → then the ruler (which multiple, and would it switch) → then the margin (direction and speed of the latest change) → finally the narrative (which stage). Four questions in, most "inexplicable" tape finds its home.',
          'This checklist is L4’s foundation: one line per question in every thesis; one reconciliation per question in every review.',
        ],
        analogy:
          'The old physician insists on all four diagnostics — inspection, listening, inquiry, palpation — because any single one misdiagnoses. Reading markets is the same: results without expectations, valuation without rulers, levels without margins, stories without audits — all are one-test quackery.',
        exercises: [
          {
            type: 'choice',
            question: 'A company posts excellent results and steady guidance yet drifts down 15% over two weeks. Using the four-part diagnosis, the LEAST likely explanation is?',
            options: [
              'A big run-up had fully priced the optimism',
              'Rising rates triggered a sector ruler-switch, compressing multiples',
              'Growth remains high but its second derivative turned negative',
              'The fundamentals must have severely deteriorated',
            ],
            correct: 3,
            explain: 'The first three are standard "good results, falling stock" mechanisms; "deteriorated fundamentals" contradicts the premise. A good framework’s value is precisely not blaming every fall on fundamentals.',
          },
          {
            type: 'choice',
            question: 'Late in bear markets, "terrible results but rising stocks" appears. The four-part explanation?',
            options: [
              'Market failure',
              'Panic already cleared + deterioration decelerating + a new narrative germinating — when bad news loses the power to make new lows, that is one of the most reliable bottom formations',
              'Bad results are good',
              'Just a bounce',
            ],
            correct: 1,
            explain: 'March 2009, March 2020, October 2022 — all bottomed on this shape: ugly data, but negativity fully desensitized. The sellers were out of ammunition.',
          },
          {
            type: 'match',
            prompt: 'Match each diagnosis of "good results, falling stock" to its unit',
            pairs: [
              ['Optimism already priced', 'i9 Expectations'],
              ['The valuation ruler switched', 'i10 Multiples'],
              ['Growth’s second derivative negative', 'i11 The margin'],
              ['The market’s main story rotated', 'i12 Narrative'],
            ],
          },
          {
            type: 'tf',
            statement: 'After running the four questions (expectations → ruler → margin → narrative), most "inexplicable" price action finds an explanatory home.',
            answer: true,
            explain: 'Explanation is not the goal — discipline is: the four questions go into every thesis and every quarterly reconciliation. From watching markets to making judgments: welcome to L4.',
          },
        ],
      },
    ],
  },
);

/* ================= L4 Building Research Habits ================= */

investCourseEn.push(
  {
    id: 'i13',
    title: 'Unit 13 · How to Read Filings',
    subtitle: 'A 20-minute route through a 10-K',
    color: '#0d9488',
    colorDark: '#0a7568',
    icon: '📚',
    lessons: [
      {
        id: 'i13l1',
        title: 'The filing map: what to read first',
        tips: [
          'Three documents, three jobs: the 10-K (annual, most complete), the 10-Q (quarterly, for marginal change), the 8-K (immediate disclosure — executive exits, M&A, guidance changes land here first).',
          'The 20-minute route: ① segment data (which business grows, which rots) → ② MD&A (diffed against last quarter) → ③ cash flow statement (reconciled against profit) → ④ footnotes (at minimum scan revenue recognition and debt).',
          'Never read cover to cover: the opening dozens of pages of business description and risk factors are mostly lawyer boilerplate. The incremental information density lives in the numbers and the MD&A.',
          'Rule: the goal is not "finish the document" but answer three questions — is the business getting better or worse? Is the money real? What changed in management’s story since last quarter?',
        ],
        analogy:
          'Nobody reads a medical report page one to the end: check the flagged abnormals first (segment data), then the doctor’s summary (MD&A), then verify the key vitals (cash flow). Healthy sections get skimmed; anomalies get read line by line. Filings work the same — use the map to find the lesion, don’t transcribe the book.',
        exercises: [
          {
            type: 'match',
            prompt: 'Match the document to its job',
            pairs: [
              ['10-K annual report', 'The complete base document'],
              ['10-Q quarterly', 'Tracking marginal change'],
              ['8-K current report', 'Big events, immediately'],
              ['Earnings call transcript', 'Management under live fire'],
            ],
          },
          {
            type: 'choice',
            question: 'With only 20 minutes for a 10-K, this lesson’s recommended first stop is?',
            options: ['Cover and contents', 'Segment data — which business is growing and which deteriorating; one table shows the changing anatomy of the company', 'Director bios', 'Legal disclaimers'],
            correct: 1,
            explain: 'Segments are the organ-level checkup: flat total revenue can hide one organ dying while another booms (recall the AWS-disclosure repricing).',
          },
          {
            type: 'tf',
            statement: 'The "Risk Factors" section has the highest information density and deserves a line-by-line read.',
            answer: false,
            explain: 'Most risk factors are lawyer boilerplate ("macro conditions may fluctuate"). What deserves reading is the one or two newly added items — find them by diffing against last year.',
          },
          {
            type: 'fill',
            before: 'The goal of reading filings is answering three questions: better or worse,',
            after: ', and what changed in management’s story.',
            options: ['is the money real', 'is the stock high', 'are employees happy', 'where is the office'],
            correct: 0,
            explain: '"Is the money real" is answered by cash flow and receivables — the L1 cash lesson and L2 red flags landing as a reading action.',
          },
        ],
      },
      {
        id: 'i13l2',
        title: 'MD&A and footnotes: where bodies are buried',
        tips: [
          'The MD&A is where management is legally required to explain the numbers — the move is not to read it once but to diff it against last quarter: which excuses appeared, which boasts vanished.',
          'Footnotes are the crime scene: revenue-recognition changes, off-balance-sheet liabilities, contingencies and related-party deals live here. Enron’s SPEs hid in the footnotes.',
          'Two footnotes always worth scanning: revenue recognition (any measurement change pulling revenue forward?) and debt detail (rates and the maturity schedule — does a maturity wall hit high rates?).',
          'Rule: what a company most wants ignored, it writes most boringly. A new term suddenly appearing in footnotes — a new entity, a new accounting policy — is the highest-value thing to chase.',
        ],
        analogy:
          'A rental contract: the agent’s pitch is charming (the press release), the main clauses look standard (the statements), and the deposit-forfeiture rules that actually bite are in size-5 font in Appendix Three (the footnotes). Veteran tenants read the appendix first. So do veteran filing readers.',
        exercises: [
          {
            type: 'choice',
            question: 'The most efficient way to read an MD&A?',
            options: [
              'Read it thoroughly top to bottom',
              'Diff it against last quarter’s: new excuses, vanished highlights and softened wording are the incremental information',
              'First paragraph only',
              'Skip it',
            ],
            correct: 1,
            explain: 'One MD&A alone is all boilerplate; two side by side make the changes jump out — the text version of L2’s marginal-wording lesson.',
          },
          {
            type: 'tf',
            statement: 'Enron’s off-balance-sheet vehicles (SPEs) were largely disclosed in footnotes, and analysts who read them closely had a chance to smell trouble early.',
            answer: true,
            explain: 'In 2001 some analysts did flag the related-party footnotes publicly. Footnotes are where companies must speak but hope nobody listens.',
          },
          {
            type: 'fill',
            before: 'Two must-scan footnotes: revenue recognition, and debt’s interest rates plus its',
            after: '— checking whether a maturity wall collides with a high-rate regime.',
            options: ['maturity schedule', 'guarantor names', 'bank branches', 'currency units'],
            correct: 0,
            explain: 'In 2023–24 plenty of zero-era debt matured into doubled refinancing costs — the maturity wall is the rates lesson landing on single names.',
          },
          {
            type: 'choice',
            question: 'A footnote reveals a newly formed joint venture with large dealings with the company, but unconsolidated. First reaction?',
            options: ['Ignore — too complex', 'Alert and investigate: new entity + related-party flows + off the balance sheet is the classic channel for shifting revenue or hiding debt (the Enron script)', 'Expansion — bullish', 'Wait for the press'],
            correct: 1,
            explain: 'Not every new entity is dirty, but the priority of checking is extreme — the L2 red-flag list landing as a reading action.',
          },
        ],
      },
      {
        id: 'i13l3',
        title: 'Cross-examining the three statements',
        tips: [
          'Three statements describe one company and must tell one story: the income statement claims profit → the cash flow statement should show collection → the balance sheet’s retained earnings should thicken. Mismatches are the finding.',
          'Classic lie-detector pair ①: net income rising for years while operating cash flow treads water → interrogate receivables and inventory (the reconciliation version of L1 cash + L2 red flags).',
          'Classic pair ②: huge cash balances alongside heavy high-interest borrowing — "high cash, high debt". The cash may be fake, pledged, or occupied. Kangmei Pharma ran exactly this shape before ¥30B of cash "evaporated".',
          'Rule: one statement can wear makeup; keeping three statements consistently lying together is far harder. Make your reconciliation checklist mechanical — mechanical lists are immune to stories.',
        ],
        analogy:
          'Interrogating three suspects (the three statements): questioned separately, each story is smooth; cross-examined, the contradictions surface — "you said you were home at eight (profit), he says you were both at the bar (cash flow)". Audit statements like suspects: truth comes from cross-examination.',
        exercises: [
          {
            type: 'choice',
            question: 'Why is "high cash + high debt" (huge idle cash alongside heavy high-interest borrowing) a top-severity red flag?',
            options: [
              'It shows the company is rich',
              'Genuinely idle cash makes expensive borrowing unnecessary — the reasonable suspicion is the cash is fake, pledged, or occupied by insiders. Kangmei ran this shape before ¥30B vanished',
              'Normal treasury management',
              'It shows banks trust them',
            ],
            correct: 1,
            explain: 'Kangmei wrote off ¥30B of "cash" as an accounting error in 2019. High-cash-high-debt is among the most famous shapes a mechanical cross-check catches.',
          },
          {
            type: 'fill',
            before: 'The first reconciliation: the income statement’s net profit against the cash flow statement’s',
            after: '.',
            options: ['operating cash flow', 'financing cash flow', 'currency effects', 'investment gains'],
            correct: 0,
            explain: 'Persistent divergence plus swelling receivables = revenue-quality alarm. This one line threads L1 and L2 into a reading action.',
          },
          {
            type: 'tf',
            statement: 'A single statement can be dressed up, but keeping all three telling the same false story for years is far harder.',
            answer: true,
            explain: 'Each extra statement is another constraint on the fabricator. Cross-examination is the retail investor’s best value-for-effort fraud shield.',
          },
          {
            type: 'choice',
            question: 'Assembling this unit into one 20-minute checklist, the right order is?',
            options: [
              'Page one to the end',
              'Segments → MD&A diff → profit-vs-cash reconciliation → scan revenue-recognition and debt footnotes: map, lie detector, crime scene, in that order',
              'Just the EPS number',
              'Read a broker summary instead',
            ],
            correct: 1,
            explain: 'This sequence is L4’s first executable habit. Run the same list quarterly and after ten companies both speed and smell improve exponentially.',
          },
        ],
      },
    ],
  },
  {
    id: 'i14',
    title: 'Unit 14 · Write the Thesis Down',
    subtitle: 'If you can’t write it clearly, you haven’t thought it clearly',
    color: '#ea580c',
    colorDark: '#c2410c',
    icon: '✍️',
    lessons: [
      {
        id: 'i14l1',
        title: 'Anatomy of a one-sentence thesis',
        tips: [
          'A qualified thesis has four parts in one sentence: target + direction + core logic + time horizon. Example: "Over 2–3 years the market underprices Costco’s fee-hike headroom and renewal stickiness; it deserves an above-market multiple (long)."',
          '"Buy it because it will go up" is not a thesis — it is a tautology. "AI is the future" is not a thesis — it is a slogan: it cannot be refuted, so it cannot be verified.',
          'The qualification test: could a smart opponent specifically refute you? A judgment that can be refuted is a judgment; one that cannot is a belief.',
          'Why write it down: the brain edits memories after the fact ("I knew it would fall"). Paper does not. The thesis is your evidence for the confrontation with your future self.',
        ],
        analogy:
          'Science-class hypothesis versus horoscope: "salt lowers this water’s freezing point below -3°C" can be tested; "you may meet a helpful stranger this week" is true no matter what. Writing a thesis upgrades your idea from horoscope to hypothesis.',
        exercises: [
          {
            type: 'choice',
            question: 'Which of these is a qualified thesis?',
            options: [
              '"Nvidia is a great company, bullish long term"',
              '"Over the next 4 quarters, cloud capex growth holds above 30%, and the data-center growth implied in Nvidia’s current price is too conservative (long)"',
              '"AI is humanity’s future"',
              '"Feels like it’s going up"',
            ],
            correct: 1,
            explain: 'Only it has all four parts and can be refuted: capex growth below 30% or guidance under the implied bar falsifies it. The other three are "right" whatever happens — hence useless.',
          },
          {
            type: 'fill',
            before: 'The test of a thesis: could a smart opponent specifically',
            after: 'you — what cannot be refuted is belief, not judgment.',
            options: ['refute', 'praise', 'imitate', 'follow'],
            correct: 0,
            explain: 'Falsifiability divides science from astrology, and judgments from slogans (recall i9’s reverse-engineering).',
          },
          {
            type: 'tf',
            statement: 'One core value of writing the thesis down is preventing your brain from editing the memory into "I knew it all along".',
            answer: true,
            explain: 'Hindsight bias is the post-mortem’s worst enemy. The written page is the only witness that never flatters — the same reason the Daily Case makes you judge before revealing.',
          },
          {
            type: 'choice',
            question: 'Why must a thesis include a time horizon?',
            options: [
              'To sound professional',
              'A judgment without a deadline is never wrong yet — the horizon makes falsification possible and determines which evidence matters (quarterly data versus industry cycles)',
              'Regulation',
              'For social media',
            ],
            correct: 1,
            explain: 'If "long term" can stretch forever, the judgment can never be tested. The deadline is part of the judgment, not a decoration.',
          },
        ],
      },
      {
        id: 'i14l2',
        title: 'Grading evidence: not all information is equal',
        tips: [
          'Evidence has ranks: primary data (filings, orders, channel checks, your own math) > management statements (interested party) > sell-side research (business relationships) > media/KOL sentiment (a sentiment gauge, not evidence).',
          'The three-independent-pieces rule: a thesis needs at least three mutually independent supports — "three KOLs are all bullish" is not three pieces, it is one sentiment echoed thrice.',
          'Hunt the other side: after writing a long thesis, read the strongest short report you can find. Confirmation bias cannot be willed away — make "find the refutation" a mandatory pipeline step.',
          'Rule: an evidence chain is as strong as its weakest link. A thesis resting on "a big account said so" is a big-account-grade thesis.',
        ],
        analogy:
          'A court doesn’t convict on testimony from the plaintiff’s friends (interested parties): it wants physical evidence (filings), independent witnesses (channel data), and it must hear the defense (the short case). A judge who admits only one side eventually rules wrongly — it is only a matter of when.',
        exercises: [
          {
            type: 'match',
            prompt: 'Match the evidence type to its rank',
            pairs: [
              ['Filed numbers, order data', 'Primary — highest rank'],
              ['Management’s call statements', 'Interested party — discount it'],
              ['Sell-side research', 'Business ties — reference only'],
              ['KOL / trending sentiment', 'A gauge of mood, not evidence'],
            ],
          },
          {
            type: 'choice',
            question: '"Five finance influencers all posted bullish takes on this stock this week." In the evidence framework this counts as?',
            options: [
              'Five independent pieces',
              'One sentiment datum echoed five times — possibly even a contrarian signal: unanimous mood often means expectations are full (recall i11 crowding)',
              'A decisive positive',
              'Inside information',
            ],
            correct: 1,
            explain: 'Independence is the precondition for counting. Same-source information repeated a hundred times is one piece — and unanimity itself signals crowded positioning.',
          },
          {
            type: 'tf',
            statement: 'After writing a bullish thesis, deliberately reading the strongest bear case is an effective anti-confirmation-bias procedure.',
            answer: true,
            explain: 'Bias yields to process, not willpower: Dalio’s believability-weighted dissent and Buffett inviting bears to shareholder meetings institutionalize the same move.',
          },
          {
            type: 'fill',
            before: 'An evidence chain is only as strong as its',
            after: 'link — a thesis built on rumor is rumor-grade.',
            options: ['weakest', 'strongest', 'longest', 'newest'],
            correct: 0,
            explain: 'Like any chain. Reviewing your thesis, find the weakest link first and ask: does the argument survive without it?',
          },
        ],
      },
      {
        id: 'i14l3',
        title: 'Conviction and position size',
        tips: [
          'Position size is the price tag on conviction: stronger chains and better odds justify larger size; "just a small punt" usually means no thesis was written at all.',
          'Kelly intuition: bet bigger with bigger edges, but never bet everything — your estimate of the edge is itself uncertain. Professionals often run half-Kelly, then halve again.',
          'Two questions that must stay separate: "how sure am I?" (win rate) and "what does being wrong cost?" (payoff structure). High conviction with catastrophic downside still forbids concentration.',
          'Rule: when writing the thesis, note a conviction score (1–10) and its matching size. Conviction 5 with a huge position = the position is lying for you; conviction 9 with 1% = the research produced nothing.',
        ],
        analogy:
          'Poker: raise good hands, bet big on monsters — but professionals never stack off on one hand, because the villain’s cards always hold possibilities you didn’t price. Sizing isn’t courage; it is writing "I might be wrong" into the bet itself.',
        exercises: [
          {
            type: 'choice',
            question: 'Why must "how sure am I" and "what does being wrong cost" be answered separately?',
            options: [
              'They needn’t be',
              'High win rate does not mean survivable downside: a 90%-win bet that zeroes you on a loss (a single-event earnings gamble) still forbids size — both jointly set the position',
              'It sounds more professional',
              'Regulation',
            ],
            correct: 1,
            explain: 'The naked-option lesson from the options track converges here: high-probability small wins plus low-probability ruin can carry negative long-run expectancy. Size must price the cost of being wrong.',
          },
          {
            type: 'tf',
            statement: 'Kelly’s practical lesson: even with a clear edge, never bet everything, because your estimate of the edge may itself be wrong.',
            answer: false,
            explain: 'True but incomplete as stated: beyond estimation error, betting everything means one bad draw ends the game and forfeits all future compounding. Kelly maximizes long-run growth, which inherently forbids ruin — half-Kelly leaves margin for both layers of error.',
          },
          {
            type: 'fill',
            before: 'Note a conviction score with every thesis: conviction 5 with a heavy position means the',
            after: 'is lying on your behalf.',
            options: ['position', 'market', 'filing', 'news'],
            correct: 0,
            explain: 'Size-conviction mismatch is the most honest self-diagnostic: either research your way to higher conviction, or cut the size to match.',
          },
          {
            type: 'choice',
            question: 'After deep work: conviction 9, complete evidence chain — but you buy a token 1% "just in case". The framework’s issue with this?',
            options: [
              'Prudent, no issue',
              'The research never converted into returns: high conviction with token size is as much a mismatch as low conviction with heavy size — judgment compounds only when you cash in the times you are right',
              'Wait for a dip instead',
              'Smaller is always better',
            ],
            correct: 1,
            explain: 'Buffett: when it rains gold, reach for a bucket, not a thimble. Discipline includes earning enough when right — both directions of mismatch belong in the post-mortem.',
          },
        ],
      },
    ],
  },
  {
    id: 'i15',
    title: 'Unit 15 · Falsifiers and Stops',
    subtitle: 'Write "what proves me wrong" before you buy',
    color: '#dc2626',
    colorDark: '#b02020',
    icon: '🛡️',
    lessons: [
      {
        id: 'i15l1',
        title: 'Pre-commit the falsifier',
        tips: [
          'Before buying, write: "If ___ happens, my thesis is wrong, and I will ___." The more concrete the blanks, the less your future self gets hijacked by emotion.',
          'A qualified falsifier has three parts: specific (metric + threshold), observable (public data), deadlined. "Sell if fundamentals deteriorate" fails; "renewal rate below 90% for two straight quarters" qualifies (the Costco case).',
          'Aim the falsifier at the weakest link: whatever your thesis rests on is where the alarm gets installed.',
          'Rule: a position without a written falsifier is a jump without a packed parachute. Parachutes are packed before takeoff — decide "what counts as wrong" after a 30% drawdown and fear or hope will write the answer for you.',
        ],
        analogy:
          'Two friends agree in writing: "if the startup isn’t profitable in three years, I go back to a job." Three years later, the loss-making founder has a hundred reasons for one more year — that signed page exists precisely to outvote him. A falsifier is a letter to the future, trapped version of you.',
        exercises: [
          {
            type: 'choice',
            question: 'Which is a qualified falsifier?',
            options: [
              '"Sell if fundamentals deteriorate"',
              '"If data-center revenue grows below 5% QoQ for two consecutive quarters, the AI-demand thesis is falsified; exit within a week"',
              '"Run if it feels wrong"',
              '"Long-term investors need no falsifiers"',
            ],
            correct: 1,
            explain: 'Metric + threshold + count + action: the future execution requires no fresh decision, only compliance.',
          },
          {
            type: 'fill',
            before: 'Install the falsifier on the thesis’s',
            after: 'link — whatever the argument rests on is where the alarm belongs.',
            options: ['weakest', 'strongest', 'newest', 'priciest'],
            correct: 0,
            explain: 'The Costco premium’s alarm sits on renewals, not revenue (the original Daily Case) — because renewals are the premium’s foundation.',
          },
          {
            type: 'tf',
            statement: 'It is fine to write the falsifier after the position is already underwater.',
            answer: false,
            explain: 'Falsifiers written in drawdown get systematically loosened by hope. Parachutes are packed before the jump — that is the entire meaning of pre-commitment.',
          },
          {
            type: 'choice',
            question: 'Why does "decide what counts as falsified after it drops 30%" almost always fail?',
            options: [
              'Because 30% is too much',
              'Because you are no longer a neutral judge: sunk cost and hope loosen the standard repeatedly, and "one more earnings report" repeats until zero',
              'Not enough time',
              'It doesn’t fail',
            ],
            correct: 1,
            explain: 'Rules are orders written by your calm self to your emotional self. Referee and player cannot be the same person at the same time.',
          },
        ],
      },
      {
        id: 'i15l2',
        title: 'Two kinds of stops',
        tips: [
          'The thesis stop: exit when the falsifier triggers, regardless of price — even in profit. It protects the integrity of your judgment system.',
          'The price stop: cut when losses hit a preset level, regardless of thesis — even if the story still looks fine. It protects survival (capital and psyche).',
          'Their relationship: the thesis stop is the primary judgment; the price stop is the fuse. "It fell but nothing falsified" can justify adding — only if the falsifier was written before the fall and sizing discipline allows.',
          'Rule: the most dangerous sentence is "it’s cheaper now" without distinguishing: is the price wrong (opportunity) or is my thesis wrong (trap)? The answer lives on the falsifier list, never on your cost basis.',
        ],
        analogy:
          'A road trip: the navigator shows the road closed (thesis falsified) — change routes even halfway there; the fuel gauge hits empty (loss at survival line) — pull into the station even on the perfect route. Two instruments watch different things; blending them drives you into a ditch.',
        exercises: [
          {
            type: 'choice',
            question: 'A holding is down 25%, but checking line by line: no falsifier triggered, and the evidence chain actually strengthened. The framework permits?',
            options: [
              'Mindless capitulation — down means wrong',
              'Considering an add within sizing discipline: a fall without falsification may mean the price is wrong — provided the falsifier list predates the fall',
              'Stop looking at the account',
              'Loosen the falsifier',
            ],
            correct: 1,
            explain: 'The executable version of "greedy when others are fearful" is not courage — it is a pre-written falsifier list plus pre-reserved adding capacity. Without both, adding is a gambler averaging down.',
          },
          {
            type: 'tf',
            statement: 'Thesis stops protect the judgment system, price stops protect survival — both can coexist, and triggering either means executing.',
            answer: true,
            explain: 'A correct thesis oversized still forces an exit at the worst price (the options track’s margin lesson). Survival outranks being right.',
          },
          {
            type: 'fill',
            before: '"It’s cheaper now" is dangerous because it skips the key question: is the price wrong, or is',
            after: 'wrong?',
            options: ['my thesis', 'the market', 'everyone else', 'the timing'],
            correct: 0,
            explain: 'Price wrong → opportunity; thesis wrong → trap. The tool for telling them apart is the falsifier list from the previous lesson.',
          },
          {
            type: 'choice',
            question: 'The falsifier triggered, but the stock rose 5% that day. The disciplined action?',
            options: [
              'Rising proves the thesis fine — hold',
              'Execute the exit as planned: falsification judges the thesis’s foundation, not the day’s price — let short-term price veto the falsifier once and the list is dead forever',
              'Loosen the falsifier',
              'Add to celebrate',
            ],
            correct: 1,
            explain: 'In 2021 many stayed after fundamental falsification because "it’s still going up", and round-tripped below cost. Price lagging fact is the norm, not an exemption.',
          },
        ],
      },
      {
        id: 'i15l3',
        title: 'Self-defense against cognitive biases',
        tips: [
          'The four most expensive biases: sunk cost ("down too much to sell now"), anchoring (staring at your cost basis instead of the company’s value), the disposition effect (rushing to sell winners, entombing losers), and narrative self-reinforcement (the longer held, the more only positives register).',
          'Your cost basis is your private business — the market neither knows nor cares. The only correct question: "If I held cash today, would I buy this at this price with this information?" If not, sell.',
          'The disposition effect auto-degrades portfolios: what remains is everything underwater (can’t bear to sell), what left is everything profitable (rushed to bank) — systematically cutting flowers to water weeds.',
          'Rule: biases cannot be willed away, only routed around by process — pre-commitment (falsifiers), mechanical checklists (reconciliation), periodic zero-basing ("pretend I hold cash").',
        ],
        analogy:
          'Stuffed at the buffet but forcing more down "to get your money’s worth" — the fee is spent either way; the extra plate only costs your stomach too. Everyone sees the sunk-cost fallacy at a buffet; swap in a brokerage account and the whole room goes blind.',
        exercises: [
          {
            type: 'match',
            prompt: 'Match the bias to its catchphrase',
            pairs: [
              ['Sunk cost', '"Down 40% — selling makes it real"'],
              ['Anchoring', '"I’ll sell when it gets back to my cost"'],
              ['Disposition effect', '"Bank the winners, give losers time"'],
              ['Narrative self-reinforcement', '"The more I read, the more bullish I get"'],
            ],
          },
          {
            type: 'choice',
            question: 'The power of "If I held cash today, would I buy this?" lies in?',
            options: [
              'Encouraging overtrading',
              'Unhooking the decision from your cost-basis anchor and returning it to the correct coordinates: current information versus current price',
              'Building confidence',
              'Nothing practical',
            ],
            correct: 1,
            explain: 'The market doesn’t know your cost. This one question is the single-sentence antidote to anchoring and sunk cost — worth running monthly on every holding.',
          },
          {
            type: 'tf',
            statement: 'The disposition effect (selling winners fast, holding losers long) systematically degrades portfolios over time.',
            answer: true,
            explain: 'Peter Lynch called it cutting the flowers and watering the weeds. Studies show retail investors’ sold positions outperform what they keep — they keep the wrong side.',
          },
          {
            type: 'fill',
            before: 'Biases cannot be removed by willpower, only routed around by',
            after: ': pre-commitment, mechanical checklists, periodic zero-basing.',
            options: ['process', 'talent', 'luck', 'tips'],
            correct: 0,
            explain: 'Pilots don’t will themselves through takeoff — they run checklists. All of L4 is, at heart, installing checklists onto investment judgment.',
          },
        ],
      },
    ],
  },
  {
    id: 'i16',
    title: 'Unit 16 · The Post-Mortem',
    subtitle: 'Without reviews, ten years of experience is one year repeated ten times',
    color: '#7c3aed',
    colorDark: '#6529c7',
    icon: '🔄',
    lessons: [
      {
        id: 'i16l1',
        title: 'Review the decision, not the outcome',
        tips: [
          'Outcome = decision quality × luck. Grading yourself by P&L alone makes luck your report card — poker players call it "resulting", the post-mortem’s enemy number one.',
          'The four quadrants: good decision/good outcome (deserved), good decision/bad outcome (bad luck — repeat the decision), bad decision/good outcome (the most dangerous — a fluke gets archived as skill), bad decision/bad outcome (deserved, but at least the lesson is clean).',
          'The danger sits top-right: one lucky earnings gamble teaches the brain that gambling works — the next identical decision is a loss already seeded.',
          'Rule: the review question is always "given what was knowable then, was the decision sound?" — never "did it make money?".',
        ],
        analogy:
          'Running a red light and arriving on time (bad decision, good outcome) should not be filed as a commuting technique; wearing a seatbelt and getting hurt in a rear-ending (good decision, bad outcome) should not end seatbelts. Grade decisions by outcomes and both your life and your account thin out.',
        exercises: [
          {
            type: 'choice',
            question: 'You gambled heavily into earnings — no evidence chain, no falsifier — and luckily made 40%. The correct review conclusion?',
            options: [
              'Success — repeat it',
              'Bad decision + good luck: the profit does not change the naked-gamble nature — this quadrant is the most dangerous because the fluke is being archived as experience',
              'Research is useless, nerve is everything',
              'It made money; skip the review',
            ],
            correct: 1,
            explain: 'Repeat the same decision ten times and the expectancy is negative. The review’s value is precisely daring to say "this one doesn’t count" while the money is still warm.',
          },
          {
            type: 'fill',
            before: 'The review question is always "given what was knowable then, was the decision',
            after: '" — never "did it end up profitable".',
            options: ['sound', 'profitable', 'lucky', 'bold'],
            correct: 0,
            explain: 'Decisions happen under incomplete information; outcomes carry luck. Grading decisions improves decisions; grading outcomes improves superstition.',
          },
          {
            type: 'tf',
            statement: 'A "good decision, bad outcome" play should be repeated the next time the same spot appears.',
            answer: true,
            explain: 'Edge plus bad luck = a decision worth repeating. A pro who loses a correctly played hand is satisfied with the play — the long run pays the play, not the hand.',
          },
          {
            type: 'choice',
            question: 'The precise definition of "resulting"?',
            options: [
              'A pragmatic focus on results',
              'The bias of inferring decision quality purely from outcomes — it turns flukes into experience and correct losses into trauma, systematically corroding judgment',
              'A review methodology',
              'Another name for stop-loss discipline',
            ],
            correct: 1,
            explain: 'Annie Duke ranks it the decision-maker’s enemy number one in "Thinking in Bets". Markets are noisier than poker short-term, so resulting is even more toxic here.',
          },
        ],
      },
      {
        id: 'i16l2',
        title: 'The five-question template',
        tips: [
          'The five questions: ① what was the thesis (copy the original text — no paraphrasing) ② what actually happened ③ where was the expectations gap ④ which framework link failed (L3’s four-part diagnosis: expectations/ruler/margin/narrative — or L4’s: evidence/sizing/falsifier execution) ⑤ the specific fix for next time.',
          'Question ④ is the heart: a loss must be located to a specific link — misgraded evidence (KOL counted as primary)? Falsifier not executed? Size-conviction mismatch? "Bad luck" is not a qualified answer.',
          'Winners get the five questions too: did you earn the thesis’s money, or bump into money (sector anchor lift / pure beta)? Only logic-earned profit deserves replication.',
          'Rule: review all holdings quarterly, and review every closed position within 48 hours — past a week, memory has begun flattering itself.',
        ],
        analogy:
          'After a loss the coach never just says "unlucky": was the defensive shape wrong (framework link), did fitness collapse (execution), did the opponent adapt (conditions)? Only locating the link produces next week’s training menu. "Try harder next time" is not a training menu.',
        exercises: [
          {
            type: 'choice',
            question: 'A loss review concludes: "market sentiment was poor, luck was bad." Under the template, the problem with this review?',
            options: [
              'None — markets do get emotional',
              'Question ④ unanswered: no specific failed link located (expectations misread? falsifier ignored? size mismatch?) — without a link there is no fix',
              'Too short',
              'Should blame others',
            ],
            correct: 1,
            explain: '"Luck" must be the residual after elimination, never the first stop. Exhaust the framework links; only the remainder may be assigned to luck.',
          },
          {
            type: 'tf',
            statement: 'Profitable positions don’t need reviews.',
            answer: false,
            explain: 'Without the review you cannot separate "earned by logic" from "bumped into a rally" — and the latter, archived as experience, is the recipe for the next loss (last lesson’s dangerous quadrant).',
          },
          {
            type: 'fill',
            before: 'Question ① must copy the thesis',
            after: '— memory paraphrases "a punt" into "careful analysis".',
            options: ['verbatim', 'roughly', 'from feel', 'conclusion only'],
            correct: 0,
            explain: 'This is why the memo workbench exists: the written original is the only exhibit hindsight cannot contaminate.',
          },
          {
            type: 'choice',
            question: 'Why must the closed-position review happen within 48 hours?',
            options: [
              'To rush the next trade',
              'Memory’s self-flattering starts the moment you close — after a week, "why I bought" has been recolored by the outcome',
              'Regulation',
              'No reason',
            ],
            correct: 1,
            explain: 'Hindsight bias is an enemy with a half-life; the review is a race against it. Record while the sting is fresh — pain is the best ink.',
          },
        ],
      },
      {
        id: 'i16l3',
        title: 'The cognition profile: graduation and beyond',
        tips: [
          'Single reviews see trees; the cognition profile sees the forest: aggregate your Daily Case accuracy, memo hit rate and reviews into data, and your judgment style emerges — where are you accurate? Systematically optimistic, or a consensus-hugger?',
          'Style bias is the most valuable self-knowledge: 80% accuracy on earnings cases but 40% on macro means macro judgments deserve systematically lower weight — concentrate ammunition in your hitting zone.',
          'The full L1–L4 loop: read the language (L1) → read the company (L2) → read the pricing (L3) → judge by process and iterate through reviews (L4). You now own an operating system that upgrades for life.',
          'Next, L5 industry deep-dives: apply the framework to AI, energy, healthcare — building the demand → supply chain → bottleneck → profit → price causal maps. The north star never moves: no longer deciding by tips, influencers and emotions.',
        ],
        analogy:
          'A chess player grows not by memorizing every game but by discovering, across hundreds of reviews, "I get impatient in the middlegame" — one sentence of self-knowledge worth more than a hundred openings. The cognition profile exists to distill your hundreds of judgments into that sentence.',
        exercises: [
          {
            type: 'choice',
            question: 'Your profile shows 80% accuracy on earnings cases and 45% on macro. The framework response?',
            options: [
              'Quit investing',
              'Recognize your hitting zone: earnings judgments can carry higher conviction and size; macro judgments get systematically down-weighted or defensive-only — concentrate where you have edge',
              'Grind macro to 80% before acting',
              'Too little data, ignore it',
            ],
            correct: 1,
            explain: 'The quantified version of Buffett’s circle of competence: knowing where you are accurate beats knowing everything. (Small samples deserve caution, but the direction already guides sizing.)',
          },
          {
            type: 'match',
            prompt: 'Match each layer to the question it answers',
            pairs: [
              ['L1 Market language', 'What do these numbers mean'],
              ['L2 The company', 'Why is this a good business'],
              ['L3 Market pricing', 'What expectations are in the price'],
              ['L4 Research habits', 'How to make and iterate judgments'],
            ],
          },
          {
            type: 'tf',
            statement: 'The cognition profile’s value is replacing "I feel like I’m decent at this" with "the data shows where my judgments have edge".',
            answer: true,
            explain: 'Every Daily Case call and memo hit-rate feeds this profile — every judgment you make is training data for the model that is you.',
          },
          {
            type: 'choice',
            question: 'L4 graduation check: the correct sequence for one complete investment?',
            options: [
              'Read news → buy → add if up → play dead if down',
              'Read filings with cross-checks → write the four-part thesis with graded evidence → set falsifiers and size to conviction → execute triggers without debate → review within 48 hours and archive',
              'Ask a KOL → copy the trade → screenshot the gains',
              'Technicals → all-in → pray',
            ],
            correct: 1,
            explain: 'That pipeline is the four units of L4 assembled — and the user manual for the memo workbench. Congratulations, graduate: Mr. Market is waiting downstairs for your final exam.',
          },
        ],
      },
    ],
  },
);
