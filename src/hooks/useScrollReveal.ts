import { useRef, useCallback } from "react";
import { useInView } from "framer-motion";

interface ScrollRevealConfig {
  once?: boolean;
  margin?: string;
  amount?: number | "some" | "all";
}

export function useScrollReveal(config: ScrollRevealConfig = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: config.once ?? true,
    margin: (config.margin ?? "-80px") as `${number}px` | `${number}%` | `${number}vw` | `${number}vh`,
    amount: config.amount ?? 0.1,
  });

  return { ref, isInView };
}

// Shared animation variants for consistency
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const fadeUpStagger = (delay: number = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  },
});

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const containerStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};
