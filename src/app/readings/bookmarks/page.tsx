import type { Metadata } from 'next';
import XBookmarks from '@/views/XBookmarks';

export const metadata: Metadata = {
  title: 'X Bookmark Library',
  description:
    'A working index of AI skills, agent products, product thinking, and ideas worth returning to.',
};

export default function Page() {
  return <XBookmarks />;
}
