'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWizardForm } from '../../hooks/useWizardForm';
import { useAnimationConfig } from '../../hooks/useAnimationConfig';
import { WizardStep } from './WizardStep';
import { WizardNavigation } from './WizardNavigation';
import { MetadataStep } from './steps/MetadataStep';
import { SummaryStep } from './steps/SummaryStep';
import { ContentStep } from './steps/ContentStep';
import { ReviewStep } from './steps/ReviewStep';
import { WizardContainerProps } from '../../types/blog';
import { stepTransitions, successVariants } from '../../lib/animations';

export const WizardContainer = ({
  onComplete,
  initialData,
  postId
}: WizardContainerProps) => {
  const {
    form,
    step,
    submit
  } = useWizardForm(initialData, postId);

  const data = form.watch();

  const { getVariants } = useAnimationConfig();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [direction, setDirection] = useState(0);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submit();
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Failed to submit form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    setDirection(1);
    step.next();
  };

  const handlePrev = () => {
    setDirection(-1);
    step.previous();
  };

  const _handleGoToStep = (stepNumber: number) => {
    setDirection(stepNumber > step.current ? 1 : -1);
    step.goTo(stepNumber);
  };

  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        onComplete(data);
        if (!postId) {
          form.reset();
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [submitSuccess, onComplete, data, postId, form]);

  const currentStepData = useMemo(() => {
    const currentStepInfo = step.steps.find(s => s.id === step.current);
    return {
      title: currentStepInfo?.title || '',
      isValid: currentStepInfo?.isValid || false
    };
  }, [step]);

  const renderCurrentStep = () => {
    switch (step.current) {
      case 1:
        return <MetadataStep form={form} />;
      case 2:
        return <SummaryStep form={form} />;
      case 3:
        return <ContentStep form={form} />;
      case 4:
        return (
          <ReviewStep
            data={data}
            onEdit={step.goTo}
          />
        );
      default:
        return null;
    }
  };

  if (submitSuccess) {
    const isEditing = !!initialData;
    return (
      <motion.div 
        className="max-w-2xl mx-auto text-center py-12"
        variants={getVariants(successVariants)}
        initial="initial"
        animate="animate"
      >
        <div className="bg-green-50 border border-green-200 rounded-lg p-8">
          <motion.div 
            className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4"
            variants={getVariants(successVariants)}
            initial="initial"
            animate="animate"
          >
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h2 className="text-2xl font-bold text-green-900 mb-2">
            Blog Post {isEditing ? 'Updated' : 'Created'} Successfully!
          </h2>
          <p className="text-green-700 mb-6">
            Your blog post has been saved and is now available in your blog list.
          </p>
          <p className="text-green-600 text-sm">
            Redirecting in a moment...
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step.current}
          custom={direction}
          variants={getVariants(stepTransitions)}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <WizardStep
            title={currentStepData.title}
            isValid={currentStepData.isValid}
          >
            {renderCurrentStep()}
          </WizardStep>
        </motion.div>
      </AnimatePresence>

      <WizardNavigation
        currentStep={step.current}
        totalSteps={step.steps.length}
        canGoNext={step.canGoNext && !isSubmitting}
        canGoBack={step.canGoBack && !isSubmitting}
        onNext={handleNext}
        onBack={handlePrev}
        onSubmit={handleSubmit}
        isLastStep={step.isLastStep}
      />
    </div>
  );
};