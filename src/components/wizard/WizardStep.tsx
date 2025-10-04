'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAnimationConfig } from '../../hooks/useAnimationConfig';
import { WizardStepProps } from '../../types/blog';
import { progressBarVariants, staggerContainer, fadeInOut } from '../../lib/animations';

export const WizardStep: React.FC<WizardStepProps> = ({
  children,
  isValid
}) => {
  const { getVariants } = useAnimationConfig();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className={`h-1 w-full rounded-full ${isValid ? 'bg-green-200' : 'bg-gray-200'}`}>
          <motion.div 
            className={`h-full rounded-full origin-left ${
              isValid ? 'bg-green-500' : 'bg-blue-500'
            }`}
            variants={getVariants(progressBarVariants)}
            initial="initial"
            animate={isValid ? "animate" : "initial"}
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {children}
      </div>
    </div>
  );
};