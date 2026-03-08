import type { Metadata } from 'next';
import Contact from '@/views/Contact';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Nicole Chen.',
};

export default function Page() {
  return <Contact />;
}
