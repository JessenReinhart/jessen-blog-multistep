import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { WizardFormData, BlogCategory, UseWizardFormReturn } from '@/types/blog';
import { wizardFormSchema, WizardFormSchemaType } from '@/utils/wizardFormSchema';
import { useStepNavigation } from './useStepNavigation';
import { useBlogStorage } from './useBlogStorage';
import { validateStepsUpTo } from '@/utils/stepValidation';

const INITIAL_FORM_DATA: WizardFormData = {
    title: '',
    author: '',
    summary: '',
    category: '' as BlogCategory,
    content: ''
};

export function useWizardForm(initialData?: Partial<WizardFormData>, postId?: string): UseWizardFormReturn {
    const form = useForm<WizardFormSchemaType>({
        resolver: zodResolver(wizardFormSchema),
        defaultValues: {
            ...INITIAL_FORM_DATA,
            ...initialData
        },
        mode: 'onBlur'
    });

    const stepNavigation = useStepNavigation({ form });

    const { createPost, updatePost } = useBlogStorage();

    const submit = useCallback(async (): Promise<string> => {
        const isFormValid = await form.trigger();
        const allStepsValid = validateStepsUpTo(4, form);

        if (!isFormValid || !allStepsValid) {
            throw new Error('Form validation failed');
        }

        try {
            const formData = form.getValues();
            const result = postId ? updatePost(postId, formData) : createPost(formData);

            if (!result) {
                throw new Error('Failed to save post');
            }

            return typeof result === 'string' ? result : postId!;
        } catch (error) {
            console.error('Error submitting form:', error);
            throw error;
        }
    }, [form, createPost, updatePost, postId]);

    return {
        form,
        step: {
            current: stepNavigation.currentStep,
            steps: stepNavigation.steps,
            next: stepNavigation.next,
            previous: stepNavigation.previous,
            goTo: stepNavigation.goTo,
            canGoNext: stepNavigation.canGoNext,
            canGoBack: stepNavigation.canGoBack,
            isLastStep: stepNavigation.isLastStep
        },
        submit
    };
}