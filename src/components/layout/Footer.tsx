import { Instagram, Linkedin, Coffee, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { photographerInfo } from '@/data/photographer';
import { photographyImages } from '@/data/photography';
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
  const [showGallery, setShowGallery] = useState(false);

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
      href: 'https://www.threads.com/@yuqing6577',
      label: 'Threads',
      icon: (
        <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098c1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015c-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164c1.43 1.783 3.631 2.698 6.54 2.717c2.623-.02 4.358-.631 5.8-2.045c1.647-1.613 1.618-3.593 1.09-4.798c-.343-.783-.99-1.42-1.876-1.845c-.126 2.526-1.039 4.535-2.712 5.965c-1.423 1.216-3.228 1.835-5.198 1.785c-1.575-.04-2.924-.588-3.9-1.586c-.915-.935-1.42-2.164-1.42-3.456c0-2.61 2.063-4.543 4.674-4.543c.756 0 1.538.142 2.322.422c.858.306 1.569.757 2.113 1.34c.31-.842.46-1.888.44-3.128l2.116-.032c.035 1.828-.27 3.347-.9 4.529c.378.254.727.543 1.044.872c.915.95 1.478 2.171 1.674 3.627c.264 1.96-.166 4.063-1.578 5.455c-1.786 1.76-4.06 2.575-7.16 2.567h-.003ZM9.428 12.09c-1.702 0-2.558 1.139-2.558 2.427c0 .883.363 1.659.997 2.147c.575.443 1.358.67 2.248.694c1.399.035 2.665-.434 3.722-1.339c1.1-.94 1.754-2.24 1.898-3.774a6.7 6.7 0 0 0-1.593-1.003c-.59-.27-1.459-.533-2.281-.339c-.575.136-1.27.382-1.934.614a8 8 0 0 1-.5.173Z" />
        </svg>
      ),
    },
    {
      href: 'https://xhslink.com/m/6JVHDqLozk1',
      label: 'Xiaohongshu',
      icon: (
        <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.405 9.879c.002.016.01.02.07.019h.725a.797.797 0 0 0 .78-.972a.794.794 0 0 0-.884-.618a.795.795 0 0 0-.692.794c0 .101-.002.666.001.777m-11.509 4.808c-.203.001-1.353.004-1.685.003a2.5 2.5 0 0 1-.766-.126a.025.025 0 0 0-.03.014L7.7 16.127a.025.025 0 0 0 .01.032c.111.06.336.124.495.124c.66.01 1.32.002 1.981 0q.017 0 .023-.015l.712-1.545a.025.025 0 0 0-.024-.036zM.477 9.91c-.071 0-.076.002-.076.01l-.01.08c-.027.397-.038.495-.234 3.06c-.012.24-.034.389-.135.607c-.026.057-.033.042.003.112c.046.092.681 1.523.787 1.74c.008.015.011.02.017.02c.008 0 .033-.026.047-.044q.219-.282.371-.606c.306-.635.44-1.325.486-1.706c.014-.11.021-.22.03-.33l.204-2.616l.022-.293c.003-.029 0-.033-.03-.034zm7.203 3.757a1.4 1.4 0 0 1-.135-.607c-.004-.084-.031-.39-.235-3.06a.4.4 0 0 0-.01-.082c-.004-.011-.052-.008-.076-.008h-1.48c-.03.001-.034.005-.03.034l.021.293q.114 1.473.233 2.946c.05.4.186 1.085.487 1.706c.103.215.223.419.37.606c.015.018.037.051.048.049c.02-.003.742-1.642.804-1.765c.036-.07.03-.055.003-.112m3.861-.913h-.872a.126.126 0 0 1-.116-.178l1.178-2.625a.025.025 0 0 0-.023-.035l-1.318-.003a.148.148 0 0 1-.135-.21l.876-1.954a.025.025 0 0 0-.023-.035h-1.56q-.017 0-.024.015l-.926 2.068c-.085.169-.314.634-.399.938a.5.5 0 0 0-.02.191a.46.46 0 0 0 .23.378a1 1 0 0 0 .46.119h.59c.041 0-.688 1.482-.834 1.972a.5.5 0 0 0-.023.172a.47.47 0 0 0 .23.398c.15.092.342.12.475.12l1.66-.001q.017 0 .023-.015l.575-1.28a.025.025 0 0 0-.024-.035m-6.93-4.937H3.1a.032.032 0 0 0-.034.033c0 1.048-.01 2.795-.01 6.829c0 .288-.269.262-.28.262h-.74c-.04.001-.044.004-.04.047c.001.037.465 1.064.555 1.263c.01.02.03.033.051.033c.157.003.767.009.938-.014c.153-.02.3-.06.438-.132c.3-.156.49-.419.595-.765c.052-.172.075-.353.075-.533q.003-3.495-.007-6.991a.03.03 0 0 0-.032-.032zm11.784 6.896q-.002-.02-.024-.022h-1.465c-.048-.001-.049-.002-.05-.049v-4.66c0-.072-.005-.07.07-.07h.863c.08 0 .075.004.075-.074V8.393c0-.082.006-.076-.08-.076h-3.5c-.064 0-.075-.006-.075.073v1.445c0 .083-.006.077.08.077h.854c.075 0 .07-.004.07.07v4.624c0 .095.008.084-.085.084c-.37 0-1.11-.002-1.304 0c-.048.001-.06.03-.06.03l-.697 1.519s-.014.025-.008.036s.013.008.058.008q2.622.003 5.243.002c.03-.001.034-.006.035-.033zm4.177-3.43q0 .021-.02.024c-.346.006-.692.004-1.037.004q-.021-.003-.022-.024q-.006-.651-.01-1.303c0-.072-.006-.071.07-.07l.733-.003c.041 0 .081.002.12.015c.093.025.16.107.165.204c.006.431.002 1.153.001 1.153m2.67.244a1.95 1.95 0 0 0-.883-.222h-.18c-.04-.001-.04-.003-.042-.04V10.21q.001-.198-.025-.394a1.8 1.8 0 0 0-.153-.53a1.53 1.53 0 0 0-.677-.71a2.2 2.2 0 0 0-1-.258c-.153-.003-.567 0-.72 0c-.07 0-.068.004-.068-.065V7.76c0-.031-.01-.041-.046-.039H17.93s-.016 0-.023.007q-.008.008-.008.023v.546c-.008.036-.057.015-.082.022h-.95c-.022.002-.028.008-.03.032v1.481c0 .09-.004.082.082.082h.913c.082 0 .072.128.072.128v1.148s.003.117-.06.117h-1.482c-.068 0-.06.082-.06.082v1.445s-.01.068.064.068h1.457c.082 0 .076-.006.076.079v3.225c0 .088-.007.081.082.081h1.43c.09 0 .082.007.082-.08v-3.27c0-.029.006-.035.033-.035l2.323-.003a.7.7 0 0 1 .28.061a.46.46 0 0 1 .274.407c.008.395.003.79.003 1.185c0 .259-.107.367-.33.367h-1.218c-.023.002-.029.008-.028.033q.276.655.57 1.303a.05.05 0 0 0 .04.026c.17.005.34.002.51.003c.15-.002.517.004.666-.01a2 2 0 0 0 .408-.075c.59-.18.975-.698.976-1.313v-1.981q.001-.191-.034-.38c0 .078-.029-.641-.724-.998" />
        </svg>
      ),
    },
  ].filter(Boolean) as { href: string; label: string; icon: JSX.Element }[];

  return (
    <footer className="border-t border-border">
      {/* Photography Gallery Toggle */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-4">
        <ScrollReveal>
          <button
            onClick={() => setShowGallery(!showGallery)}
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mx-auto"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}
          >
            <Camera className="size-4" />
            <span>Photography</span>
            <motion.span
              animate={{ rotate: showGallery ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="inline-block text-xs"
            >
              ▼
            </motion.span>
          </button>
        </ScrollReveal>

        <AnimatePresence>
          {showGallery && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-6">
                {photographyImages.map((photo, i) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    className="aspect-square overflow-hidden rounded-sm"
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Original Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-muted-foreground" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.08em' }}>
              © {currentYear} {photographerInfo.name}
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
