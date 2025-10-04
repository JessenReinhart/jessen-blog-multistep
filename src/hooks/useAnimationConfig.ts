'use client';

import { Variants } from 'framer-motion';
import { useAnimation } from '../contexts/AnimationContext';

export const useAnimationConfig = () => {
  const { enableAnimations, prefersReducedMotion } = useAnimation();

  const getVariants = (variants: Variants): Variants => {
    if (!enableAnimations || prefersReducedMotion) {
      return {
        initial: variants.animate || {},
        animate: variants.animate || {},
        exit: variants.animate || {},
      };
    }
    return variants;
  };

  return { getVariants };
};