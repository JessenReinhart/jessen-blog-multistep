'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AnimationSpeed } from '../lib/animations';

interface AnimationContextType {
  prefersReducedMotion: boolean;
  animationSpeed: AnimationSpeed;
  enableAnimations: boolean;
  setAnimationSpeed: (speed: AnimationSpeed) => void;
  setEnableAnimations: (enabled: boolean) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

interface AnimationProviderProps {
  children: React.ReactNode;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState<AnimationSpeed>('normal');
  const [enableAnimations, setEnableAnimations] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const checkPerformance = () => {
      const connection = (navigator as { connection?: { effectiveType?: string } }).connection;
      if (connection?.effectiveType !== '2g') {
        setAnimationSpeed('fast');
      }
    };

    checkPerformance();
  }, []);

  const value: AnimationContextType = {
    prefersReducedMotion,
    animationSpeed,
    enableAnimations: enableAnimations && !prefersReducedMotion,
    setAnimationSpeed,
    setEnableAnimations,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = (): AnimationContextType => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};