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
