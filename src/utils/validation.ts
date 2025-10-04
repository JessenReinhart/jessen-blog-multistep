import { WizardFormData, BlogCategory } from '@/types/blog';

export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  TITLE_TOO_SHORT: 'Title must be at least 3 characters long',
  TITLE_TOO_LONG: 'Title must be less than 100 characters long',
  AUTHOR_TOO_SHORT: 'Author name must be at least 2 characters long',
  AUTHOR_TOO_LONG: 'Author name must be less than 50 characters long',
  SUMMARY_TOO_SHORT: 'Summary must be at least 10 characters long',
  SUMMARY_TOO_LONG: 'Summary must be less than 300 characters long',
  CONTENT_TOO_SHORT: 'Content must be at least 50 characters long',
  INVALID_CATEGORY: 'Please select a valid category',
} as const;

const VALID_CATEGORIES: BlogCategory[] = ['Tech', 'Lifestyle', 'Business'];

export function validateTitle(title: string): string {
  const trimmedTitle = title.trim();
  
  if (!trimmedTitle) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
  
  if (trimmedTitle.length < 3) {
    return ERROR_MESSAGES.TITLE_TOO_SHORT;
  }
  
  if (trimmedTitle.length > 100) {
    return ERROR_MESSAGES.TITLE_TOO_LONG;
  }
  
  return '';
}

export function validateAuthor(author: string): string {
  const trimmedAuthor = author.trim();
  
  if (!trimmedAuthor) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
  
  if (trimmedAuthor.length < 2) {
    return ERROR_MESSAGES.AUTHOR_TOO_SHORT;
  }
  
  if (trimmedAuthor.length > 50) {
    return ERROR_MESSAGES.AUTHOR_TOO_LONG;
  }
  
  return '';
}

export function validateSummary(summary: string): string {
  const trimmedSummary = summary.trim();
  
  if (!trimmedSummary) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
  
  if (trimmedSummary.length < 10) {
    return ERROR_MESSAGES.SUMMARY_TOO_SHORT;
  }
  
  if (trimmedSummary.length > 300) {
    return ERROR_MESSAGES.SUMMARY_TOO_LONG;
  }
  
  return '';
}

export function validateCategory(category: string): string {
  if (!category) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
  
  if (!VALID_CATEGORIES.includes(category as BlogCategory)) {
    return ERROR_MESSAGES.INVALID_CATEGORY;
  }
  
  return '';
}

export function validateContent(content: string): string {
  const trimmedContent = content.trim();
  
  if (!trimmedContent) {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }
  
  if (trimmedContent.length < 50) {
    return ERROR_MESSAGES.CONTENT_TOO_SHORT;
  }
  
  return '';
}

export function validateField(field: keyof WizardFormData, value: string): string {
  switch (field) {
    case 'title':
      return validateTitle(value);
    case 'author':
      return validateAuthor(value);
    case 'summary':
      return validateSummary(value);
    case 'category':
      return validateCategory(value);
    case 'content':
      return validateContent(value);
    default:
      return '';
  }
}

export function validateAllFields(data: WizardFormData): Record<string, string> {
  const errors: Record<string, string> = {};
  
  const titleError = validateTitle(data.title);
  if (titleError) errors.title = titleError;
  
  const authorError = validateAuthor(data.author);
  if (authorError) errors.author = authorError;
  
  const summaryError = validateSummary(data.summary);
  if (summaryError) errors.summary = summaryError;
  
  const categoryError = validateCategory(data.category);
  if (categoryError) errors.category = categoryError;
  
  const contentError = validateContent(data.content);
  if (contentError) errors.content = contentError;
  
  return errors;
}

export function validateStep1(data: WizardFormData): boolean {
  const titleError = validateTitle(data.title);
  const authorError = validateAuthor(data.author);
  
  return !titleError && !authorError;
}

export function validateStep2(data: WizardFormData): boolean {
  const summaryError = validateSummary(data.summary);
  const categoryError = validateCategory(data.category);
  
  return !summaryError && !categoryError;
}

export function validateStep3(data: WizardFormData): boolean {
  const contentError = validateContent(data.content);
  
  return !contentError;
}

export function validateStep4(data: WizardFormData): boolean {
  return validateStep1(data) && validateStep2(data) && validateStep3(data);
}

export function validateStep(stepNumber: number, data: WizardFormData): boolean {
  switch (stepNumber) {
    case 1:
      return validateStep1(data);
    case 2:
      return validateStep2(data);
    case 3:
      return validateStep3(data);
    case 4:
      return validateStep4(data);
    default:
      return false;
  }
}

export function getStepErrors(stepNumber: number, data: WizardFormData): Record<string, string> {
  const errors: Record<string, string> = {};
  
  switch (stepNumber) {
    case 1:
      const titleError = validateTitle(data.title);
      if (titleError) errors.title = titleError;
      
      const authorError = validateAuthor(data.author);
      if (authorError) errors.author = authorError;
      break;
      
    case 2:
      const summaryError = validateSummary(data.summary);
      if (summaryError) errors.summary = summaryError;
      
      const categoryError = validateCategory(data.category);
      if (categoryError) errors.category = categoryError;
      break;
      
    case 3:
      const contentError = validateContent(data.content);
      if (contentError) errors.content = contentError;
      break;
      
    case 4:
      return validateAllFields(data);
      
    default:
      break;
  }
  
  return errors;
}

export function isFormValid(data: WizardFormData): boolean {
  const errors = validateAllFields(data);
  return Object.keys(errors).length === 0;
}

export function getFieldDisplayName(field: keyof WizardFormData): string {
  switch (field) {
    case 'title':
      return 'Blog Title';
    case 'author':
      return 'Author Name';
    case 'summary':
      return 'Blog Summary';
    case 'category':
      return 'Blog Category';
    case 'content':
      return 'Blog Content';
    default:
      return field;
  }
}

export function formatErrorMessage(field: keyof WizardFormData, error: string): string {
  const fieldName = getFieldDisplayName(field);
  return `${fieldName}: ${error}`;
}