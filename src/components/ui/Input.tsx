'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimationConfig } from '../../hooks/useAnimationConfig';
import { formInputVariants, fadeInOut } from '../../lib/animations';

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  id?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  placeholder,
  type = 'text',
  id
}) => {
  const { getVariants } = useAnimationConfig();
  const [isFocused, setIsFocused] = useState(false);
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  
  const inputClasses = `
    w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2
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
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          if (onBlur) {
            onBlur(value);
          }
        }}
        placeholder={placeholder}
        className={inputClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />
      
      <AnimatePresence>
        {error && (
          <motion.p 
            id={`${inputId}-error`}
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