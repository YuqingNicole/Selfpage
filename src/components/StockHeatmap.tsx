'use client';

import { useEffect, useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  marketCap: number;
}

interface SectorData {
  sector: string;
  stocks: Stock[];
}

interface HeatmapData {
  sectors: SectorData[];
  updatedAt: string;
}

function getColor(changePercent: number): string {
  const pct = changePercent;
  if (pct >= 5) return '#1a6b3a';
  if (pct >= 3) return '#1e8449';
  if (pct >= 1.5) return '#27ae60';
  if (pct >= 0.5) return '#2ecc71';
  if (pct >= 0) return '#a9dfbf';
  if (pct >= -0.5) return '#f5b7b1';
  if (pct >= -1.5) return '#e74c3c';
  if (pct >= -3) return '#c0392b';
  if (pct >= -5) return '#a93226';
  return '#7b241c';
}

function getTextColor(changePercent: number): string {
  const abs = Math.abs(changePercent);
  return abs < 0.5 ? '#1a1a1a' : '#ffffff';
}

function StockCell({ stock }: { stock: Stock }) {
  const bg = getColor(stock.changePercent);
  const fg = getTextColor(stock.changePercent);
  const pct = stock.changePercent;
  const sign = pct >= 0 ? '+' : '';

  return (
    <div
      className="flex flex-col items-center justify-center p-1 rounded cursor-default transition-transform hover:scale-105 hover:z-10 relative"
      style={{ background: bg, minHeight: 56, minWidth: 64 }}
      title={`${stock.name}\n$${stock.price.toFixed(2)} | ${sign}${pct.toFixed(2)}%`}
    >
      <span className="text-xs font-semibold leading-tight" style={{ color: fg, fontFamily: 'var(--font-sans)' }}>
        {stock.symbol}
      </span>
      <span className="text-xs font-light leading-tight" style={{ color: fg, opacity: 0.85, fontFamily: 'var(--font-sans)' }}>
        {sign}{pct.toFixed(2)}%
      </span>
    </div>
  );
}

export default function StockHeatmap() {
  const [data, setData] = useState<HeatmapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/heatmap', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setData(json);
      setLastRefresh(new Date());
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000); // refresh every 5 min
    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs tracking-[0.1em] uppercase" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>
            S&P 500 · 板块热力图
          </p>
          {lastRefresh && (
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)', opacity: 0.6 }}>
              更新于 {lastRefresh.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
            </p>
          )}
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded transition-opacity hover:opacity-70 disabled:opacity-40"
          style={{ border: '1px solid var(--border)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}
        >
          <RefreshCw size={11} className={loading ? 'animate-spin' : ''} />
          刷新
        </button>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mb-5">
        <span className="text-xs" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>跌</span>
        {['#7b241c', '#a93226', '#c0392b', '#e74c3c', '#f5b7b1', '#a9dfbf', '#2ecc71', '#27ae60', '#1e8449', '#1a6b3a'].map((c) => (
          <div key={c} className="h-3 w-5 rounded-sm" style={{ background: c }} />
        ))}
        <span className="text-xs" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>涨</span>
      </div>

      {/* Error */}
      {error && (
        <div className="text-sm py-4 text-center" style={{ color: 'var(--muted-foreground)' }}>
          数据加载失败，请重试
        </div>
      )}

      {/* Loading skeleton */}
      {loading && !data && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-3 w-24 rounded mb-2" style={{ background: 'var(--muted)' }} />
              <div className="flex gap-1 flex-wrap">
                {Array.from({ length: 8 }).map((_, j) => (
                  <div key={j} className="h-14 w-16 rounded" style={{ background: 'var(--muted)' }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Heatmap */}
      {data && (
        <div className="space-y-5">
          {data.sectors.map((sector) => (
            <div key={sector.sector}>
              <p className="text-xs font-medium mb-2" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-sans)' }}>
                {sector.sector}
              </p>
              <div className="flex gap-1 flex-wrap">
                {sector.stocks.map((stock) => (
                  <StockCell key={stock.symbol} stock={stock} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
