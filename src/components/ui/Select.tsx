'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimationConfig } from '../../hooks/useAnimationConfig';
import { formInputVariants, fadeInOut } from '../../lib/animations';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  options: SelectOption[];
  error?: string;
  required?: boolean;
  placeholder?: string;
  id?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  onBlur,
  options,
  error,
  required = false,
  placeholder = 'Select an option...',
  id
}) => {
  const { getVariants } = useAnimationConfig();
  const [isFocused, setIsFocused] = useState(false);
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;
  
  const selectClasses = `
    w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white
    ${error 
      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
    }
  `.trim();
  
  return (
    <motion.div 
      className="space-y-1"
      variants={getVariants(formInputVariants)}
      animate={error ? "error" : isFocused ? "focus" : "initial"}
    >
      <label 
        htmlFor={selectId}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          if (onBlur) {
            onBlur(value);
          }
        }}
        className={selectClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${selectId}-error` : undefined}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      <AnimatePresence>
        {error && (
          <motion.p 
            id={`${selectId}-error`}
            className="text-sm text-red-600"
            role="alert"
            variants={getVariants(fadeInOut)}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};