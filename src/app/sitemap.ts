import type { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blog';
import { projects } from '@/data/projects';
import { workProjects } from '@/data/workProjects';
import { claudeSkills } from '@/data/claude-skills';
import { chainDefs, symbolToChains } from '@/app/ai-supply-chain-us/shared';
import { getAllBookChapters } from '@/lib/book';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  // Public, canonical pages only. Private reading-room files, API endpoints,
  // iframe implementation documents and the duplicate /thinking alias stay out.
  const paths = [
    '', '/blog', '/book', '/portfolio', '/work', '/readings', '/readings/bookmarks',
    '/contact', '/partner-links', '/learn', '/learn/investing', '/learn/options',
    '/learn/options/en', '/learn/arbitrage', '/research/dui-dashboard',
    '/work/arti-benchmark', '/work/arti-benchmark/architecture', '/work/arti-benchmark/dataset',
    '/work/arti-benchmark/leaderboard', '/work/arti-benchmark/scoring',
    '/work/sector-rotation', '/work/sector-rotation/screener', '/ai-supply-chain-us',
    ...getAllBookChapters().map(({ slug }) => `/book/${slug}`),
    ...blogPosts.map(({ slug }) => `/blog/${slug}`),
    ...projects.map(({ slug }) => `/project/${slug}`),
    ...workProjects.map(({ slug }) => `/work/${slug}`),
    ...claudeSkills.map(({ name }) => `/skills/${name}`),
    ...chainDefs.map(({ slug }) => `/ai-supply-chain-us/${slug}`),
    ...[...new Set(['XLK', 'XLC', 'XLY', 'XLF', 'XLI', 'XLB', 'XLE', 'XLV', 'XLP', 'XLU', 'XLRE',
      ...Object.keys(symbolToChains)])].map((symbol) => `/work/sector-rotation/${symbol}`),
  ];
  // Do not manufacture last-modified dates on every build.
  return [...new Set(paths)].map((path) => ({ url: `${SITE_URL}${path}` }));
}
