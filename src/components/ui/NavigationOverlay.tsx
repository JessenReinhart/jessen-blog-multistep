"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useNavigation } from "@/contexts/NavigationContext";
import { useAnimationConfig } from "@/hooks/useAnimationConfig";
import { fadeInOut } from "@/lib/animations/variants";
import { LoadingSpinner } from "./LoadingSpinner";

export function NavigationOverlay() {
  const { isNavigating, navigationMessage } = useNavigation();
  const { getVariants } = useAnimationConfig();

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          variants={getVariants(fadeInOut)}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            variants={getVariants(fadeInOut)}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center space-y-4"
          >
            <LoadingSpinner size="lg" />
            <p className="text-gray-700 text-lg font-medium">{navigationMessage}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}