import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(
      'https://query1.finance.yahoo.com/v7/finance/quote?symbols=AAPL,MSFT,NVDA',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          Accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        // no cache directive that might cause issues
        cache: 'no-store',
      }
    );

    const text = await res.text();

    if (!res.ok) {
      return NextResponse.json({
        error: `Yahoo Finance returned ${res.status}`,
        body: text.slice(0, 300),
      }, { status: 500 });
    }

    let json: unknown;
    try {
      json = JSON.parse(text);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON from Yahoo', body: text.slice(0, 300) }, { status: 500 });
    }

    const quotes = (json as { quoteResponse?: { result?: unknown[] } })?.quoteResponse?.result ?? [];
    return NextResponse.json({ ok: true, count: quotes.length, sample: quotes[0] });
  } catch (e) {
    return NextResponse.json({ error: 'Fetch failed', detail: String(e) }, { status: 500 });
  }
}
