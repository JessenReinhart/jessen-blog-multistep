import { Variants } from 'framer-motion';
import { createTransition, createStaggerTransition } from './utils';

export const fadeInOut: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: createTransition() },
  exit: { opacity: 0, transition: createTransition('normal') },
};

export const slideInOut: Variants = {
  initial: { x: 20, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: createTransition() },
  exit: { x: -20, opacity: 0, transition: createTransition('fast') },
};

export const stepTransitions: Variants = {
  initial: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: createTransition('normal', 'easeOut'),
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    transition: createTransition('fast', 'easeIn'),
  }),
};

export const formInputVariants: Variants = {
  initial: { scale: 1 },
  focus: { scale: 1.02, transition: createTransition('fast') },
  error: {
    x: [-2, 2, -2, 2, 0],
    transition: { duration: 0.4 },
  },
};

export const buttonVariants: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: createTransition('fast') },
  tap: { scale: 0.95, transition: createTransition('fast') },
};

export const successVariants: Variants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: createStaggerTransition(0.1),
  },
};

export const staggerItem: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: createTransition(),
  },
};

export const progressBarVariants: Variants = {
  initial: { scaleX: 0, originX: 0 },
  animate: { scaleX: 1, originX: 0, transition: createTransition('slow') },
};

export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: createTransition() },
  fadeOut: { opacity: 0, transition: createTransition('fast') },
  exit: { opacity: 0, transition: createTransition('fast') },
};