import { Transition } from 'framer-motion';
import { ANIMATION_DURATION, ANIMATION_EASING, AnimationSpeed, AnimationEasing } from './config';

export const createTransition = (
  duration: AnimationSpeed = 'normal',
  easing: AnimationEasing = 'easeOut'
): Transition => ({
  duration: ANIMATION_DURATION[duration],
  ease: ANIMATION_EASING[easing],
});

export const createStaggerTransition = (
  staggerDelay: number = 0.1,
  duration: AnimationSpeed = 'normal'
): Transition => ({
  duration: ANIMATION_DURATION[duration],
  staggerChildren: staggerDelay,
});

export const getReducedMotionTransition = (): Transition => ({
  duration: 0,
  ease: 'linear',
});