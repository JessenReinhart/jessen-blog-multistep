"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useNavigation } from "@/contexts/NavigationContext";
import { useAnimationConfig } from "@/hooks/useAnimationConfig";
import { fadeInOut } from "@/lib/animations/variants";
import { useEffect } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const { isNavigating, setIsNavigating } = useNavigation();
  const { getVariants } = useAnimationConfig();

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname, setIsNavigating]);

  return (
    <AnimatePresence mode="wait">
      {!isNavigating && <motion.div
        key={pathname}
        variants={getVariants(fadeInOut)}
        initial={isNavigating ? "exit" : "initial"}
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>}
    </AnimatePresence>
  );
}