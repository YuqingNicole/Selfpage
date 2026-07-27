import { useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

/**
 * Simple parallax hook - returns a ref and a y motion value
 * that moves at a slower rate than scroll, creating depth.
 */
export function useParallax(speed = 0.3) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);
  return { ref, y };
}

/**
 * Floating animation config for framer-motion animate prop
 */
export const floatingAnimation = {
  y: [0, -12, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
};
