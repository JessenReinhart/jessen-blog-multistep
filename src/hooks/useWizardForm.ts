import { useState, useCallback, useMemo } from 'react';
import { WizardFormData, WizardStep, UseWizardFormReturn, BlogCategory } from '@/types/blog';
import { useFormValidation } from './useFormValidation';
import { useBlogStorage } from './useBlogStorage';

const INITIAL_FORM_DATA: WizardFormData = {
    title: '',
    author: '',
    summary: '',
    category: '' as BlogCategory,
    content: ''
};

const WIZARD_STEPS: WizardStep[] = [
    { id: 1, title: 'Blog Metadata', isValid: false, isCompleted: false },
    { id: 2, title: 'Blog Summary & Category', isValid: false, isCompleted: false },
    { id: 3, title: 'Blog Content', isValid: false, isCompleted: false },
    { id: 4, title: 'Review & Submit', isValid: false, isCompleted: false }
];

export function useWizardForm(initialData?: Partial<WizardFormData>, postId?: string): UseWizardFormReturn {
    const [data, setData] = useState<WizardFormData>(() => ({
        ...INITIAL_FORM_DATA,
        ...initialData
    }));
    const [currentStep, setCurrentStep] = useState(1);
    const [steps, setSteps] = useState(WIZARD_STEPS);

    const { errors, validateField, validateStep, clearErrors } = useFormValidation();
    const { createPost, updatePost } = useBlogStorage();

    const updateField = useCallback((field: keyof WizardFormData, value: string) => {
        setData(prevData => {
            const newData = { ...prevData, [field]: value };
            validateField(field, value);
            return newData;
        });
    }, [validateField]);

    const updateStepCompletion = useCallback((stepNumber: number, formData: WizardFormData) => {
        const isStepValid = validateStep(stepNumber, formData);

        setSteps(prevSteps =>
            prevSteps.map(step =>
                step.id === stepNumber
                    ? { ...step, isValid: isStepValid, isCompleted: isStepValid }
                    : step
            )
        );

        return isStepValid;
    }, [validateStep]);

    const nextStep = useCallback(() => {
        const isCurrentStepValid = updateStepCompletion(currentStep, data);

        if (isCurrentStepValid && currentStep < WIZARD_STEPS.length) {
            setCurrentStep(prev => prev + 1);
        }
    }, [currentStep, data, updateStepCompletion]);

    const prevStep = useCallback(() => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    }, [currentStep]);

    const goToStep = useCallback((step: number) => {
        if (step >= 1 && step <= WIZARD_STEPS.length) {
            let canNavigate = true;
            for (let i = 1; i < step; i++) {
                if (!updateStepCompletion(i, data)) {
                    canNavigate = false;
                    break;
                }
            }

            if (canNavigate) {
                setCurrentStep(step);
            }
        }
    }, [data, updateStepCompletion]);

    const submitForm = useCallback(() => {
        const allStepsValid = WIZARD_STEPS.every((_, index) =>
            updateStepCompletion(index + 1, data)
        );

        if (!allStepsValid) {
            throw new Error('Form validation failed');
        }

        try {
            const result = postId ? updatePost(postId, data) : createPost(data);
            
            if (!result) {
                throw new Error('Failed to save post');
            }

            clearErrors();
            return typeof result === 'string' ? result : postId;
        } catch (error) {
            console.error('Error submitting form:', error);
            throw error;
        }
    }, [data, createPost, updatePost, postId, clearErrors, updateStepCompletion]);
    const canGoNext = useMemo(() => 
        updateStepCompletion(currentStep, data), 
        [currentStep, data, updateStepCompletion]
    );

    const canGoBack = useMemo(() => 
        currentStep > 1, 
        [currentStep]
    );

    const isLastStep = useMemo(() => 
        currentStep === WIZARD_STEPS.length, 
        [currentStep]
    );

    const resetForm = useCallback(() => {
        setData(INITIAL_FORM_DATA);
        setCurrentStep(1);
        setSteps(WIZARD_STEPS);
        clearErrors();
    }, [clearErrors]);

    return {
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
        submitForm,
        resetForm
    };
}