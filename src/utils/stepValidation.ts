import { UseFormReturn } from 'react-hook-form';
import { WizardFormSchemaType, getStepFields, validateStepFields } from './wizardFormSchema';

export function canNavigateToStep(
  targetStep: number, 
  currentStep: number,
  form: UseFormReturn<WizardFormSchemaType>,
  totalSteps: number = 4
): boolean {
  if (targetStep < 1 || targetStep > totalSteps) {
    return false;
  }
  
  if (targetStep <= currentStep) {
    return true;
  }
  
  const formData = form.getValues();
  for (let i = 1; i < targetStep; i++) {
    if (!validateStepFields(i, formData)) {
      return false;
    }
  }
  
  return true;
}

export function getStepErrors(
  step: number,
  form: UseFormReturn<WizardFormSchemaType>
): Record<string, string> {
  const stepFields = getStepFields(step);
  const formErrors = form.formState.errors;
  const stepErrors: Record<string, string> = {};
  
  stepFields.forEach(field => {
    if (formErrors[field]?.message) {
      stepErrors[field] = formErrors[field]!.message!;
    }
  });
  
  return stepErrors;
}

export function stepHasErrors(
  step: number,
  form: UseFormReturn<WizardFormSchemaType>
): boolean {
  const stepErrors = getStepErrors(step, form);
  return Object.keys(stepErrors).length > 0;
}

export function getStepTouchedFields(
  step: number,
  form: UseFormReturn<WizardFormSchemaType>
): string[] {
  const stepFields = getStepFields(step);
  const touchedFields = form.formState.touchedFields;
  
  return stepFields.filter(field => touchedFields[field]);
}

export function isStepTouched(
  step: number,
  form: UseFormReturn<WizardFormSchemaType>
): boolean {
  const stepFields = getStepFields(step);
  const touchedFields = form.formState.touchedFields;
  
  return stepFields.every(field => touchedFields[field]);
}

export function validateStepsUpTo(
  targetStep: number,
  form: UseFormReturn<WizardFormSchemaType>
): boolean {
  const formData = form.getValues();
  
  for (let i = 1; i <= targetStep; i++) {
    if (!validateStepFields(i, formData)) {
      return false;
    }
  }
  
  return true;
}

export function getStepValidationSummary(
  form: UseFormReturn<WizardFormSchemaType>,
  totalSteps: number = 4
): Array<{ step: number; isValid: boolean; hasErrors: boolean; isTouched: boolean }> {
  const summary = [];
  
  for (let i = 1; i <= totalSteps; i++) {
    summary.push({
      step: i,
      isValid: validateStepFields(i, form.getValues()),
      hasErrors: stepHasErrors(i, form),
      isTouched: isStepTouched(i, form)
    });
  }
  
  return summary;
}

export async function validateStep(
  step: number,
  form: UseFormReturn<WizardFormSchemaType>
): Promise<boolean> {
  const stepFields = getStepFields(step);
  
  const results = await Promise.all(
    stepFields.map(field => form.trigger(field))
  );
  
  return results.every(result => result);
}