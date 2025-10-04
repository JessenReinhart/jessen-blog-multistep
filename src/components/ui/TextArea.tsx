'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimationConfig } from '../../hooks/useAnimationConfig';
import { formInputVariants, fadeInOut } from '../../lib/animations';

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  showCharCount?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  id?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  placeholder,
  rows = 4,
  maxLength,
  showCharCount = false,
  resize = 'vertical',
  id
}) => {
  const { getVariants } = useAnimationConfig();
  const [isFocused, setIsFocused] = useState(false);
  const textAreaId = id || `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`;
  
  const textAreaClasses = `
    w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2
    ${error 
      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
    }
    ${resize === 'none' ? 'resize-none' : 
      resize === 'vertical' ? 'resize-y' : 
      resize === 'horizontal' ? 'resize-x' : 'resize'}
  `.trim();
  
  return (
    <motion.div 
      className="space-y-1"
      variants={getVariants(formInputVariants)}
      animate={error ? "error" : isFocused ? "focus" : "initial"}
    >
      <label 
        htmlFor={textAreaId}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <textarea
        id={textAreaId}
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
        rows={rows}
        maxLength={maxLength}
        className={textAreaClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${textAreaId}-error` : undefined}
      />
      
      {showCharCount && maxLength && (
        <div className="text-sm text-gray-500 text-right">
          {value.length}/{maxLength}
        </div>
      )}
      
      <AnimatePresence>
        {error && (
          <motion.p 
            id={`${textAreaId}-error`}
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