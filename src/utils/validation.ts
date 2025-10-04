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

export function validateStep(stepNumber: number, data: WizardFormData): boolean {
  switch (stepNumber) {
    case 1:
      return !validateTitle(data.title) && !validateAuthor(data.author);
    case 2:
      return !validateSummary(data.summary) && !validateCategory(data.category);
    case 3:
      return !validateContent(data.content);
    case 4:
      return validateStep(1, data) && validateStep(2, data) && validateStep(3, data);
    default:
      return false;
  }
}