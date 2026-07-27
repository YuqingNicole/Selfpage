'use client';

import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';

export default function LeaderboardPage() {
  useEffect(() => {
    window.location.href = 'https://irab.rabyte.cn';
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-3xl mx-auto px-6 pt-12 w-full">
        <Link
          href="/work/arti-benchmark"
          className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
          style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}
        >
          <ArrowLeft size={14} />
          Back to ARTi Benchmark
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-xs tracking-[0.12em] uppercase mb-6" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>
          ARTi Benchmark · 排行榜
        </p>
        <h1 className="text-5xl font-normal leading-[1.08] mb-5" style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
          Leaderboard
        </h1>
        <p className="text-lg font-light mb-10 max-w-sm" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}>
          正在跳转到 irab.rabyte.cn…
        </p>
        <a
          href="https://irab.rabyte.cn"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
          style={{ color: 'var(--accent-warm)', fontFamily: 'var(--font-sans)' }}
        >
          如未自动跳转，点击这里
          <ExternalLink size={13} />
        </a>
      </div>
      <div className="h-24" />
    </div>
  );
}
