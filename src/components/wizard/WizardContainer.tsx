import React, { useState, useEffect } from 'react';
import { useWizardForm } from '../../hooks/useWizardForm';
import { WizardStep } from './WizardStep';
import { WizardNavigation } from './WizardNavigation';
import { MetadataStep } from './steps/MetadataStep';
import { SummaryStep } from './steps/SummaryStep';
import { ContentStep } from './steps/ContentStep';
import { ReviewStep } from './steps/ReviewStep';
import { WizardContainerProps } from '../../types/blog';

export const WizardContainer: React.FC<WizardContainerProps> = ({
  onComplete
}) => {
  const {
    data,
    currentStep,
    steps,
    errors,
    updateField,
    nextStep,
    prevStep,
    goToStep,
    canGoNext,
    canGoBack,
    isLastStep,
    submitForm
  } = useWizardForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const postId = submitForm();
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Failed to submit form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        onComplete(data);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [submitSuccess, onComplete, data]);

  const handleEditFromReview = (stepNumber: number) => {
    goToStep(stepNumber);
  };

  const getCurrentStepTitle = () => {
    const step = steps.find(s => s.id === currentStep);
    return step?.title || '';
  };

  const getCurrentStepValidation = () => {
    const step = steps.find(s => s.id === currentStep);
    return step?.isValid || false;
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <MetadataStep
            data={{ title: data.title, author: data.author }}
            onChange={updateField}
            errors={errors}
          />
        );
      case 2:
        return (
          <SummaryStep
            data={{ summary: data.summary, category: data.category }}
            onChange={updateField}
            errors={errors}
          />
        );
      case 3:
        return (
          <ContentStep
            data={{ content: data.content }}
            onChange={updateField}
            errors={errors}
          />
        );
      case 4:
        return (
          <ReviewStep
            data={data}
            onEdit={handleEditFromReview}
          />
        );
      default:
        return null;
    }
  };

  if (submitSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8">
          <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-900 mb-2">
            Blog Post Created Successfully!
          </h2>
          <p className="text-green-700 mb-6">
            Your blog post has been saved and is now available in your blog list.
          </p>
          <p className="text-green-600 text-sm">
            Redirecting to blog list in a moment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <WizardStep
        title={getCurrentStepTitle()}
        isValid={getCurrentStepValidation()}
      >
        {renderCurrentStep()}
      </WizardStep>
      
      <WizardNavigation
        currentStep={currentStep}
        totalSteps={steps.length}
        canGoNext={canGoNext && !isSubmitting}
        canGoBack={canGoBack && !isSubmitting}
        onNext={nextStep}
        onBack={prevStep}
        onSubmit={handleSubmit}
        isLastStep={isLastStep}
      />
    </div>
  );
};