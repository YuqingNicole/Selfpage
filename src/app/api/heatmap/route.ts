export const runtime = 'edge';

import { NextResponse } from 'next/server';

const SECTORS: Record<string, string[]> = {
  Technology: ['AAPL', 'MSFT', 'NVDA', 'AVGO', 'META', 'ORCL', 'AMD', 'QCOM', 'TXN', 'AMAT'],
  'Communication Services': ['GOOGL', 'NFLX', 'TMUS', 'DIS', 'CMCSA', 'T', 'VZ'],
  'Consumer Discretionary': ['AMZN', 'TSLA', 'HD', 'MCD', 'NKE', 'SBUX', 'TJX', 'BKNG'],
  Financials: ['BRK-B', 'JPM', 'V', 'MA', 'BAC', 'WFC', 'GS', 'MS', 'BLK', 'C'],
  Healthcare: ['LLY', 'UNH', 'JNJ', 'ABBV', 'MRK', 'TMO', 'ABT', 'DHR', 'PFE', 'AMGN'],
  Industrials: ['GE', 'CAT', 'RTX', 'HON', 'UPS', 'BA', 'DE', 'LMT', 'MMM', 'FDX'],
  Energy: ['XOM', 'CVX', 'COP', 'EOG', 'SLB', 'MPC', 'PSX', 'VLO', 'OXY'],
  'Consumer Staples': ['WMT', 'PG', 'KO', 'PEP', 'COST', 'PM', 'MO', 'CL'],
  Utilities: ['NEE', 'DUK', 'SO', 'D', 'AEP', 'EXC', 'XEL'],
  Materials: ['LIN', 'APD', 'SHW', 'FCX', 'NEM', 'NUE', 'DOW', 'ECL'],
  'Real Estate': ['PLD', 'AMT', 'EQIX', 'CCI', 'PSA', 'SPG', 'O', 'DLR'],
};

const ALL_SYMBOLS = Object.values(SECTORS).flat();

export async function GET() {
  try {
    const chunks: string[][] = [];
    for (let i = 0; i < ALL_SYMBOLS.length; i += 20) {
      chunks.push(ALL_SYMBOLS.slice(i, i + 20));
    }

    const results = await Promise.all(
      chunks.map((chunk) =>
        fetch(
          `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${chunk.join(',')}&fields=symbol,regularMarketPrice,regularMarketChangePercent,marketCap,shortName`,
          {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              Accept: 'application/json',
              'Accept-Language': 'en-US,en;q=0.9',
            },
          }
        ).then((r) => r.json())
      )
    );

    const quoteMap: Record<string, { symbol: string; name: string; price: number; changePercent: number; marketCap: number }> = {};

    for (const result of results) {
      const quotes = (result as { quoteResponse?: { result?: Array<{ symbol: string; shortName?: string; regularMarketPrice?: number; regularMarketChangePercent?: number; marketCap?: number }> } })?.quoteResponse?.result ?? [];
      for (const q of quotes) {
        quoteMap[q.symbol] = {
          symbol: q.symbol,
          name: q.shortName ?? q.symbol,
          price: q.regularMarketPrice ?? 0,
          changePercent: q.regularMarketChangePercent ?? 0,
          marketCap: q.marketCap ?? 1e9,
        };
      }
    }

    const sectors = Object.entries(SECTORS).map(([sector, symbols]) => ({
      sector,
      stocks: symbols
        .filter((s) => quoteMap[s])
        .map((s) => quoteMap[s])
        .sort((a, b) => b.marketCap - a.marketCap),
    }));

    return NextResponse.json({ sectors, updatedAt: new Date().toISOString() });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch market data', detail: String(e) }, { status: 500 });
  }
}
