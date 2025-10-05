import { useState, useCallback, useMemo, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { WizardStep } from '@/types/blog';
import { WizardFormSchemaType, validateStepFields } from '@/utils/wizardFormSchema';

const INITIAL_STEPS: WizardStep[] = [
  { id: 1, title: 'Blog Metadata', isValid: false, isCompleted: false },
  { id: 2, title: 'Blog Summary & Category', isValid: false, isCompleted: false },
  { id: 3, title: 'Blog Content', isValid: false, isCompleted: false },
  { id: 4, title: 'Review & Submit', isValid: false, isCompleted: false }
];

interface UseStepNavigationProps {
  form: UseFormReturn<WizardFormSchemaType>;
  totalSteps?: number;
}

interface UseStepNavigationReturn {
  currentStep: number;
  steps: WizardStep[];
  next: () => void;
  previous: () => void;
  goTo: (step: number) => void;
  canGoNext: boolean;
  canGoBack: boolean;
  isLastStep: boolean;
}

export function useStepNavigation({ 
  form, 
  totalSteps = 4 
}: UseStepNavigationProps): UseStepNavigationReturn {
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState(INITIAL_STEPS);


  const title = form.watch('title');
  const author = form.watch('author');
  const summary = form.watch('summary');
  const category = form.watch('category');
  const content = form.watch('content');

  const stepValidationStatus = useMemo(() => {
    const formData = { title, author, summary, category, content };
    const status: Record<number, boolean> = {};
    for (let i = 1; i <= totalSteps; i++) {
      status[i] = validateStepFields(i, formData);
    }
    return status;
  }, [title, author, summary, category, content, totalSteps]);

  useEffect(() => {
    setSteps(prevSteps =>
      prevSteps.map(step => ({
        ...step,
        isValid: stepValidationStatus[step.id] || false,
        isCompleted: stepValidationStatus[step.id] || false
      }))
    );
  }, [stepValidationStatus]);

  const canNavigateToStep = useCallback((targetStep: number): boolean => {
    if (targetStep < 1 || targetStep > totalSteps) {
      return false;
    }
    
    if (targetStep <= currentStep) {
      return true;
    }
    
    for (let i = 1; i < targetStep; i++) {
      if (!stepValidationStatus[i]) {
        return false;
      }
    }
    
    return true;
  }, [currentStep, totalSteps, stepValidationStatus]);

  const next = useCallback(() => {
    const isCurrentStepValid = stepValidationStatus[currentStep];
    
    if (isCurrentStepValid && currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, totalSteps, stepValidationStatus]);

  const previous = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const goTo = useCallback((step: number) => {
    if (canNavigateToStep(step)) {
      setCurrentStep(step);
    }
  }, [canNavigateToStep]);

  const canGoNext = useMemo(() => {
    return stepValidationStatus[currentStep];
  }, [currentStep, stepValidationStatus]);

  const canGoBack = useMemo(() => {
    return currentStep > 1;
  }, [currentStep]);

  const isLastStep = useMemo(() => {
    return currentStep === totalSteps;
  }, [currentStep, totalSteps]);

  return {
    currentStep,
    steps,
    next,
    previous,
    goTo,
    canGoNext,
    canGoBack,
    isLastStep
  };
}