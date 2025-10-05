import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  maxWidth = 'xl',
  padding = 'md',
  className = ''
}) => {
  const maxWidthClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  };

  const paddingClasses = {
    sm: 'px-4 py-4',
    md: 'px-4 sm:px-6 lg:px-8 py-8',
    lg: 'px-4 sm:px-6 lg:px-8 py-12'
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className={`${maxWidthClasses[maxWidth]} mx-auto ${paddingClasses[padding]}`}>
        {children}
      </div>
    </div>
  );
};