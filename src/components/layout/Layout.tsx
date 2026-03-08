'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { NewsletterBar } from './NewsletterBar';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Main layout wrapper component
 * Provides consistent header and footer across all pages
 * Homepage removes top padding to allow header overlay on hero
 */
export function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main 
        id="main-content" 
        className={`flex-1 ${isHomepage ? '' : 'pt-16'}`}
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
      <NewsletterBar />
    </div>
  );
}
