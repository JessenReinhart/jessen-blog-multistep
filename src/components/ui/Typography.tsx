import React, { JSX } from 'react';

interface TypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'small';
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  className = '',
  as
}) => {
  const variantClasses = {
    h1: 'text-3xl font-bold text-gray-900',
    h2: 'text-2xl font-semibold text-gray-900',
    h3: 'text-xl font-medium text-gray-900',
    body: 'text-base text-gray-700',
    caption: 'text-sm text-gray-600',
    small: 'text-xs text-gray-500'
  };

  const defaultElements = {
    h1: 'h1',
    h2: 'h2', 
    h3: 'h3',
    body: 'p',
    caption: 'p',
    small: 'span'
  };

  const Component = as || defaultElements[variant];
  const classes = `${variantClasses[variant]} ${className}`;

  return React.createElement(Component, { className: classes }, children);
};