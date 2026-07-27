import type { Metadata } from 'next';
import { Providers } from '@/components/providers/Providers';
import { Layout } from '@/components/layout/Layout';
import { SkipToContent } from '@/components/ui/SkipToContent';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://nicoles.garden'),
  title: {
    default: 'Nicole Chen — Digital Garden',
    template: '%s | Nicole Chen',
  },
  description:
    "Nicole Chen's digital garden — product manager, builder, and AI explorer. Sharing lessons from product development, reflections on the AI revolution, and Claude Skills.",
  authors: [{ name: 'Nicole Chen' }],
  robots: 'index, follow',
  openGraph: {
    siteName: 'Nicole Chen',
    type: 'website',
    images: ['/wechat-qr.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <SkipToContent />
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
