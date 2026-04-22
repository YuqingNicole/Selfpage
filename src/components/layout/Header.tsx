'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Coffee } from 'lucide-react';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { photographerInfo } from '@/data/photographer';
import { useBuyCoffee } from '@/hooks/useBuyCoffee';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/data/translations';

/**
 * Main header component with scroll-aware styling
 * Transparent on hero section, solid when scrolled
 * Mobile responsive with hamburger menu
 */
export function Header() {
  const pathname = usePathname();
  const { isScrolled } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const qrTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { loading: coffeeLoading, handleBuyCoffee } = useBuyCoffee();
  const { lang, setLang } = useLanguage();
  const tr = t[lang];

  const navLinks = [
    { name: tr.nav.home, path: '/' },
    { name: tr.nav.journal, path: '/blog' },
    { name: tr.nav.skills, path: '/portfolio' },
    { name: tr.nav.readings, path: '/readings' },
    { name: tr.nav.contact, path: '/contact' },
    { name: tr.nav.partnerLinks, path: '/partner-links' },
  ];

  const handleCoffeeMouseEnter = () => {
    if (qrTimeout.current) clearTimeout(qrTimeout.current);
    setShowQR(true);
  };

  const handleCoffeeMouseLeave = () => {
    qrTimeout.current = setTimeout(() => setShowQR(false), 200);
  };
  
  // Header is transparent only on homepage hero when not scrolled
  const isTransparent = pathname === '/' && !isScrolled;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isTransparent
          ? 'bg-transparent'
          : 'bg-background/90 backdrop-blur-lg border-b border-border shadow-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              'transition-all duration-300',
              isTransparent
                ? 'text-foreground hover:text-foreground/80'
                : 'text-foreground hover:text-foreground/80'
            )}
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: '1.25rem',
              letterSpacing: '0.08em',
            }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {photographerInfo.name}
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <Link
                    href={link.path}
                    className={cn(
                      "relative text-sm leading-7 font-light tracking-[0.08em] transition-colors duration-300",
                      isTransparent
                        ? 'text-foreground hover:text-foreground/70'
                        : 'text-foreground hover:text-foreground/70'
                    )}
                  >
                    {link.name}
                    {pathname === link.path && (
                      <motion.div
                        layoutId="activeNav"
                        className={cn(
                          "absolute -bottom-1 left-0 right-0 h-px",
                          isTransparent ? 'bg-foreground' : 'bg-foreground'
                        )}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex items-center gap-2"
            >
              <div
                className="relative"
                onMouseEnter={handleCoffeeMouseEnter}
                onMouseLeave={handleCoffeeMouseLeave}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBuyCoffee}
                  disabled={coffeeLoading}
                  className={cn(
                    'gap-1.5 font-light tracking-wide text-sm',
                    isTransparent
                      ? 'text-foreground hover:text-foreground/80'
                      : 'text-foreground hover:text-foreground/80'
                  )}
                >
                  <Coffee className="size-4" />
                  {coffeeLoading ? '...' : tr.nav.buyCoffee}
                </Button>

                <AnimatePresence>
                  {showQR && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      onMouseEnter={handleCoffeeMouseEnter}
                      onMouseLeave={handleCoffeeMouseLeave}
                      className="absolute top-full right-0 mt-2 p-2 rounded-xl border border-border bg-background shadow-lg z-50"
                    >
                      <img
                        src="/wechat-qr.jpg"
                        alt="WeChat QR code"
                        className="w-48 h-48 rounded-lg object-cover"
                      />
                      <p className="text-xs text-center text-muted-foreground mt-2 font-light">
                        {tr.nav.scanToTip}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
                className={cn(
                  'text-xs font-mono tracking-wide px-2 py-1 rounded border border-border transition-colors hover:border-foreground/40',
                  isTransparent ? 'text-foreground/70' : 'text-muted-foreground'
                )}
                aria-label="Toggle language"
              >
                {lang === 'en' ? '中文' : 'EN'}
              </button>
              <ThemeToggle />
            </motion.div>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'size-9',
                    isTransparent && 'text-foreground'
                  )}
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80">
                <nav className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg leading-7 font-light tracking-wide text-foreground hover:text-foreground/80"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBuyCoffee}
                    disabled={coffeeLoading}
                    className="gap-2 font-light tracking-wide w-fit"
                  >
                    <Coffee className="size-4" />
                    {coffeeLoading ? '...' : tr.nav.buyCoffee}
                  </Button>
                  <button
                    onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
                    className="text-xs font-mono tracking-wide px-2 py-1 rounded border border-border text-muted-foreground hover:border-foreground/40 transition-colors w-fit"
                  >
                    {lang === 'en' ? '切换中文' : 'Switch to EN'}
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
