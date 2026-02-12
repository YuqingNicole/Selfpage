import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: Direction;
  distance?: number;
  /** Use spring physics for a bouncy feel */
  spring?: boolean;
}

const getInitial = (direction: Direction, distance: number) => {
  const map: Record<Direction, Record<string, number>> = {
    up: { opacity: 0, y: distance },
    down: { opacity: 0, y: -distance },
    left: { opacity: 0, x: distance },
    right: { opacity: 0, x: -distance },
  };
  return map[direction];
};

const getAnimate = (direction: Direction) => {
  if (direction === 'left' || direction === 'right') return { opacity: 1, x: 0 };
  return { opacity: 1, y: 0 };
};

/**
 * Enhanced scroll-triggered animation with directional support,
 * spring physics, and configurable distance.
 */
export function ScrollReveal({
  children,
  delay = 0,
  className,
  direction = 'up',
  distance = 40,
  spring = false,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const initial = getInitial(direction, distance);
  const animate = getAnimate(direction);

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={
        spring
          ? { type: 'spring', stiffness: 100, damping: 15, delay }
          : { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered children reveal — wraps children and staggers them in
 */
interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

export function StaggerReveal({ children, className, stagger = 0.08 }: StaggerRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerChildVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      damping: 18,
    },
  },
};
