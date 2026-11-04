import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { OptionsCourseApp } from '@/components/learn/OptionsCourseApp';

export const metadata: Metadata = pageMetadata('/learn/options/en', {
  title: 'Options Academy — Learn Options Like Duolingo',
  description:
    'A gamified options trading course. Learn options basics, pricing, Greeks, volatility skew, dealer hedging flows, advanced spreads, and tastylive-style probability-based trading one level at a time.',
});

export default function OptionsCourseEnglishPage() {
  return <div lang="en"><OptionsCourseApp forceLang="en" /></div>;
}
