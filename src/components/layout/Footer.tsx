import { Instagram, Linkedin, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import { photographerInfo } from '@/data/photographer';
import { Button } from '@/components/ui/button';
import { useBuyCoffee } from '@/hooks/useBuyCoffee';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const socialIconVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, type: 'spring' as const, stiffness: 200, damping: 15 },
  }),
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { loading, handleBuyCoffee } = useBuyCoffee();

  const socialLinks = [
    photographerInfo.socialLinks.instagram && {
      href: photographerInfo.socialLinks.instagram,
      label: 'Instagram',
      icon: <Instagram className="size-5" />,
    },
    photographerInfo.socialLinks.linkedin && {
      href: photographerInfo.socialLinks.linkedin,
      label: 'LinkedIn',
      icon: <Linkedin className="size-5" />,
    },
    {
      href: 'https://discord.gg/tqE5Tbcz',
      label: 'Discord',
      icon: (
        <svg className="size-5" viewBox="0 0 16 16" fill="currentColor">
          <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059.05.05 0 0 0-.018-.011 8.8 8.8 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.05.05 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007c.08.066.164.132.248.195a.05.05 0 0 1-.004.085 8.3 8.3 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
        </svg>
      ),
    },
    {
      href: 'https://xhslink.com/m/6JVHDqLozk1',
      label: '小红书',
      icon: (
        <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.53 2.13a1.09 1.09 0 0 0-.31-.1H9.82a.69.69 0 0 0-.24.07c-.15.07-.26.19-.35.37L7.68 5.81H6.19a1.19 1.19 0 0 0-1.17 1.2v1.47a.47.47 0 0 0 .47.47h1.35l-.78 7.36a1.2 1.2 0 0 0 .3.93 1.18 1.18 0 0 0 .88.39h1.34a1.19 1.19 0 0 0 1.17-1l.49-4.64h1.64l.49 4.64a1.19 1.19 0 0 0 1.17 1h1.34a1.18 1.18 0 0 0 .88-.39 1.2 1.2 0 0 0 .3-.93l-.78-7.36h1.35a.47.47 0 0 0 .47-.47V7.01a1.19 1.19 0 0 0-1.17-1.2h-1.49l-1.55-3.34a.78.78 0 0 0-.35-.37z" />
          <path d="M19.54 14.98a2.47 2.47 0 0 0-1.65-.63 2.52 2.52 0 0 0-2.49 2.52 2.52 2.52 0 0 0 2.49 2.52c.62 0 1.19-.23 1.65-.63a2.52 2.52 0 0 0 .84-1.89 2.52 2.52 0 0 0-.84-1.89zM6.11 14.98a2.47 2.47 0 0 0-1.65-.63 2.52 2.52 0 0 0-2.49 2.52A2.52 2.52 0 0 0 4.46 19.4c.62 0 1.19-.23 1.65-.63a2.52 2.52 0 0 0 .84-1.89 2.52 2.52 0 0 0-.84-1.89z" />
        </svg>
      ),
    },
  ].filter(Boolean) as { href: string; label: string; icon: JSX.Element }[];

  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-muted-foreground font-light tracking-wide">
              © {currentYear} {photographerInfo.name}. All rights reserved.
            </p>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBuyCoffee}
                disabled={loading}
                className="gap-2 font-light tracking-wide"
              >
                <Coffee className="size-4" />
                {loading ? 'Loading...' : 'Buy Me a Coffee'}
              </Button>
            </motion.div>

            <div className="flex items-center gap-6">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={link.label}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={socialIconVariants}
                  whileHover={{ y: -3, scale: 1.15 }}
                  transition={{ type: 'spring' as const, stiffness: 300, damping: 15 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
