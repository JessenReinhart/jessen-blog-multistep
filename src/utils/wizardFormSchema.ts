import { z } from 'zod';
export const wizardFormSchema = z.object({
  title: z.string()
    .min(1, 'This field is required')
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title must be less than 100 characters long')
    .transform(val => val.trim()),
    
  author: z.string()
    .min(1, 'This field is required')
    .min(2, 'Author name must be at least 2 characters long')
    .max(50, 'Author name must be less than 50 characters long')
    .transform(val => val.trim()),
    
  summary: z.string()
    .min(1, 'This field is required')
    .min(10, 'Summary must be at least 10 characters long')
    .max(300, 'Summary must be less than 300 characters long')
    .transform(val => val.trim()),
    
  category: z.enum(['Tech', 'Lifestyle', 'Business'], {
    message: 'Please select a valid category'
  }),
  
  content: z.string()
    .min(1, 'This field is required')
    .min(50, 'Content must be at least 50 characters long')
    .transform(val => val.trim())
});

export type WizardFormSchemaType = z.infer<typeof wizardFormSchema>;

export const STEP_FIELDS = {
  1: ['title', 'author'] as const,
  2: ['summary', 'category'] as const,
  3: ['content'] as const,
  4: [] as const
} as const;

export function getStepFields(step: number): readonly (keyof WizardFormSchemaType)[] {
  return STEP_FIELDS[step as keyof typeof STEP_FIELDS] || [];
}

export function validateStepFields(step: number, data: Partial<WizardFormSchemaType>): boolean {
  const stepFields = getStepFields(step);
  
  if (stepFields.length === 0) {
    return validateStepFields(1, data) && 
           validateStepFields(2, data) && 
           validateStepFields(3, data);
  }
  
  try {
    const stepSchema = wizardFormSchema.pick(
      Object.fromEntries(stepFields.map(field => [field, true])) as Record<string, true>
    );
    
    stepSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}