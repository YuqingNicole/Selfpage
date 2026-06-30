# polymarket-multi-agent — Test Results

**Repo:** https://github.com/YuqingNicole/polymarket-multi-agent  
**Run date:** 2026-06-30  
**Environment:** Node.js v24, no OPENROUTER_API_KEY set

---

## Test 1: AgentInput shape ✅

```
✓ All required fields present
✓ poly=0.34 ✓
✓ kalshi=0.28 ✓
✓ Cross-platform spread = 6c (poly 34% vs kalshi 28%)
```

All 4 checks passed. AgentInput correctly models a market with a 6-cent
cross-platform spread between Polymarket (34%) and Kalshi (28%).

---

## Test 2: Live scanner (Polymarket + Kalshi APIs) ✅

```
✓ Scan completed in ~8000ms
✓ Markets fetched: 100
✓ Opportunities found: 4
✓ Top opportunity score in valid range
✓ Type "probability_drift" is valid
```

**Top 3 opportunities found:**

| # | Score | Question | Type |
|---|-------|----------|------|
| 1 | 62 | Will there be a US recession in 2025? | probability_drift |
| 2 | 58 | Will Trump sign the Big Beautiful Bill before August? | probability_drift |
| 3 | 41 | Will the Fed cut rates in July 2026? | probability_drift |

Successfully fetched 100 live markets from Polymarket Gamma API.
Kalshi API polled in parallel (connection attempted, graceful fallback on no match).

---

## Test 3: Multi-agent LLM pipeline ⚠️ skipped

```
⚠ OPENROUTER_API_KEY not set — skipping
```

Set `OPENROUTER_API_KEY` in `.env` to run the full 4-agent pipeline
(MacroAgent + TechAgent + ArbAgent → JudgeAgent).

---

## Summary

| Test | Result | Notes |
|------|--------|-------|
| AgentInput shape | ✅ 4/4 passed | No API required |
| Live scanner | ✅ 5/5 passed | 100 markets, 4 opportunities |
| Multi-agent LLM | ⚠️ skipped | Needs OPENROUTER_API_KEY |

**2 tests passed, 0 failed, 1 skipped**

---

## How to run

```bash
git clone https://github.com/YuqingNicole/polymarket-multi-agent
cd polymarket-multi-agent
npm install
cp .env.example .env
# optionally add OPENROUTER_API_KEY to .env

npm run test:pipeline   # run all tests
npm run scan            # single scan run
npm run scan:loop       # continuous scanning every 2 minutes
```
