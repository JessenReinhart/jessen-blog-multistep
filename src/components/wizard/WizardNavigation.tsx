import React from 'react';
import { Button } from '../ui/Button';
import { WizardNavigationProps } from '../../types/blog';

export const WizardNavigation: React.FC<WizardNavigationProps> = ({
  currentStep,
  totalSteps,
  canGoNext,
  canGoBack,
  onNext,
  onBack,
  onSubmit,
  isLastStep
}) => {
  return (
    <div className="flex justify-between items-center pt-6 border-t border-gray-200">
      <div>
        {canGoBack && (
          <Button
            variant="outline"
            onClick={onBack}
          >
            Back
          </Button>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      
      <div>
        {isLastStep ? (
          <Button
            variant="primary"
            onClick={onSubmit}
            disabled={!canGoNext}
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={onNext}
            disabled={!canGoNext}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};