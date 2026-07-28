import type { Metadata } from 'next';
import XBookmarks from '@/views/XBookmarks';

export const metadata: Metadata = {
  title: 'X Bookmark Library',
  description:
    'A working index of AI skills, agent products, product thinking, and ideas worth returning to.',
  openGraph: {
    title: 'X Bookmark Library',
    description:
      'A working index of AI skills, agent products, product thinking, and ideas worth returning to.',
    url: 'https://www.nicoles.garden/readings/bookmarks',
    type: 'website',
    images: [
      {
        url: 'https://www.nicoles.garden/x-bookmark-library-og.png',
        width: 1200,
        height: 630,
        alt: 'X Bookmark Library — Saved for a reason.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'X Bookmark Library',
    description:
      'A working index of AI skills, agent products, product thinking, and ideas worth returning to.',
    images: ['https://www.nicoles.garden/x-bookmark-library-og.png'],
  },
};

export default function Page() {
  return <XBookmarks />;
}
