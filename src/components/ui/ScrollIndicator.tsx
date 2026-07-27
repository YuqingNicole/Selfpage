import { motion } from 'framer-motion';

/**
 * Animated scroll indicator with morphing line + arrow
 */
export function ScrollIndicator() {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <motion.button
      onClick={handleScroll}
      className="flex flex-col items-center gap-3 text-white/80 hover:text-white transition-colors cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      aria-label="Scroll to content"
      whileHover={{ scale: 1.1 }}
    >
      <motion.span
        className="text-[10px] font-light tracking-[0.3em] uppercase"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        Scroll
      </motion.span>
      <div className="relative w-px h-12 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-white/60"
          animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.button>
  );
}
