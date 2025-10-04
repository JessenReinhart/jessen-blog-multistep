import React from 'react';
import { WizardStepProps } from '../../types/blog';

export const WizardStep: React.FC<WizardStepProps> = ({
  title,
  children,
  isValid
}) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className={`h-1 w-full rounded-full ${isValid ? 'bg-green-200' : 'bg-gray-200'}`}>
          <div 
            className={`h-full rounded-full transition-colors duration-300 ${
              isValid ? 'bg-green-500 w-full' : 'bg-blue-500 w-0'
            }`}
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {children}
      </div>
    </div>
  );
};