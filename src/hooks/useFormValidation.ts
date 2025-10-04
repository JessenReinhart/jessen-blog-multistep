import { useState, useCallback } from 'react';
import { WizardFormData, UseFormValidationReturn } from '@/types/blog';
import { validateField, validateStep, getStepErrors } from '@/utils/validation';

export function useFormValidation(): UseFormValidationReturn {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateSingleField = useCallback((field: keyof WizardFormData, value: string): string => {
        const error = validateField(field, value);

        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            if (error) {
                newErrors[field] = error;
            } else {
                delete newErrors[field];
            }
            return newErrors;
        });

        return error;
    }, []);

    const validateStepData = useCallback((step: number, data: WizardFormData): boolean => {
        const isValid = validateStep(step, data);
        const stepErrors = getStepErrors(step, data);

        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };

            const stepFields = getStepFields(step);
            stepFields.forEach(field => {
                delete newErrors[field];
            });

            Object.entries(stepErrors).forEach(([field, error]) => {
                if (error) {
                    newErrors[field] = error;
                }
            });

            return newErrors;
        });

        return isValid;
    }, []);
    const clearErrors = useCallback(() => {
        setErrors({});
    }, []);

    return {
        errors,
        validateField: validateSingleField,
        validateStep: validateStepData,
        clearErrors
    };
}


function getStepFields(step: number): (keyof WizardFormData)[] {
    switch (step) {
        case 1:
            return ['title', 'author'];
        case 2:
            return ['summary', 'category'];
        case 3:
            return ['content'];
        case 4:
            return ['title', 'author', 'summary', 'category', 'content'];
        default:
            return [];
    }
}