export interface BlogPost {
    id: string;
    title: string;
    author: string;
    summary: string;
    category: BlogCategory;
    content: string;
    createdAt: Date;
}

export type BlogCategory = 'Tech' | 'Lifestyle' | 'Business';

export interface WizardFormData {
    title: string;
    author: string;
    summary: string;
    category: BlogCategory;
    content: string;
}

export interface WizardStep {
    id: number;
    title: string;
    isValid: boolean;
    isCompleted: boolean;
}

export interface ButtonProps {
    variant: 'primary' | 'secondary' | 'outline';
    size: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

export interface InputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    onBlur?: (value: string) => void;
    error?: string;
    required?: boolean;
    placeholder?: string;
}

export interface TextAreaProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    onBlur?: (value: string) => void;
    error?: string;
    required?: boolean;
    placeholder?: string;
    rows?: number;
}

export interface SelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    onBlur?: (value: string) => void;
    options: Array<{ value: string; label: string }>;
    error?: string;
    required?: boolean;
}

export interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'outlined' | 'elevated';
}

export interface WizardContainerProps {
    onComplete: (data: WizardFormData) => void;
    initialData?: Partial<WizardFormData>;
    postId?: string;
}

export interface WizardStepProps {
    title: string;
    children: React.ReactNode;
    isValid: boolean;
}

export interface WizardNavigationProps {
    currentStep: number;
    totalSteps: number;
    canGoNext: boolean;
    canGoBack: boolean;
    onNext: () => void;
    onBack: () => void;
    onSubmit: () => void;
    isLastStep: boolean;
}

export interface MetadataStepProps {
    data: Pick<WizardFormData, 'title' | 'author'>;
    onChange: (field: keyof WizardFormData, value: string) => void;
    onBlur: (field: keyof WizardFormData, value: string) => string;
    errors: Record<string, string>;
}

export interface SummaryStepProps {
    data: Pick<WizardFormData, 'summary' | 'category'>;
    onChange: (field: keyof WizardFormData, value: string) => void;
    onBlur: (field: keyof WizardFormData, value: string) => string;
    errors: Record<string, string>;
}

export interface ContentStepProps {
    data: Pick<WizardFormData, 'content'>;
    onChange: (field: keyof WizardFormData, value: string) => void;
    onBlur: (field: keyof WizardFormData, value: string) => string;
    errors: Record<string, string>;
}

export interface ReviewStepProps {
    data: WizardFormData;
    onEdit: (step: number) => void;
}

export interface BlogCardProps {
    post: BlogPost;
    onClick: (id: string) => void;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export interface BlogListProps {
    posts: BlogPost[];
    onPostClick: (id: string) => void;
    onPostEdit?: (id: string) => void;
}

export interface BlogDetailProps {
    post: BlogPost;
    onBack: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

export interface UseBlogStorageReturn {
    posts: BlogPost[];
    createPost: (data: WizardFormData) => string;
    getPost: (id: string) => BlogPost | undefined;
    getAllPosts: () => BlogPost[];
    updatePost: (id: string, data: Partial<WizardFormData>) => boolean;
    deletePost: (id: string) => boolean;
    isStorageAvailable: boolean;
}



export interface UseWizardFormReturn {
    data: WizardFormData;
    currentStep: number;
    steps: WizardStep[];
    errors: Record<string, string>;
    updateField: (field: keyof WizardFormData, value: string) => void;
    validateFieldOnBlur: (field: keyof WizardFormData, value: string) => string;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: number) => void;
    canGoNext: boolean;
    canGoBack: boolean;
    isLastStep: boolean;
    submitForm: () => void;
    resetForm: () => void;
}

export interface WizardFormState {
    data: WizardFormData;
    currentStep: number;
    steps: WizardStep[];
    errors: Record<string, string>;
}