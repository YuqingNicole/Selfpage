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
