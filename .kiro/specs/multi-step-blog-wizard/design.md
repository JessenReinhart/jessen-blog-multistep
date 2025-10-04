# Design Document

## Overview

The multi-step blog creation wizard will be implemented as a Next.js application using the App Router architecture. The system will consist of reusable React components organized in a clear hierarchy, with local state management for form data and localStorage for persistence. The design emphasizes component reusability, clear separation of concerns, and maintainable code structure.

## Architecture

### Application Structure
```
src/
├── app/
│   ├── layout.tsx (existing)
│   ├── page.tsx (blog list page)
│   ├── create/
│   │   └── page.tsx (wizard container)
│   └── blog/
│       └── [id]/
│           └── page.tsx (blog detail page)
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── TextArea.tsx
│   │   ├── Select.tsx
│   │   └── Card.tsx
│   ├── wizard/
│   │   ├── WizardContainer.tsx
│   │   ├── WizardStep.tsx
│   │   ├── WizardNavigation.tsx
│   │   └── steps/
│   │       ├── MetadataStep.tsx
│   │       ├── SummaryStep.tsx
│   │       ├── ContentStep.tsx
│   │       └── ReviewStep.tsx
│   └── blog/
│       ├── BlogCard.tsx
│       ├── BlogList.tsx
│       └── BlogDetail.tsx
├── hooks/
│   ├── useBlogStorage.ts
│   ├── useWizardForm.ts
│   └── useFormValidation.ts
├── types/
│   └── blog.ts
└── utils/
    ├── validation.ts
    └── storage.ts
```

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **State Management**: React hooks (useState, useReducer, useContext)
- **Storage**: localStorage with fallback to memory storage

## Components and Interfaces

### Core Data Types

```typescript
// types/blog.ts
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
  category: BlogCategory | '';
  content: string;
}

export interface WizardStep {
  id: number;
  title: string;
  isValid: boolean;
  isCompleted: boolean;
}
```

### Reusable UI Components

#### Button Component
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}
```

#### Input Component
```typescript
interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}
```

#### Select Component
```typescript
interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  error?: string;
  required?: boolean;
}
```

### Wizard Components

#### WizardContainer
- Manages overall wizard state and navigation
- Handles form data persistence across steps
- Coordinates validation and submission
- Provides context to child components

#### WizardStep
- Generic wrapper for individual step content
- Handles step-specific validation
- Manages step completion state
- Provides consistent layout and styling

#### WizardNavigation
- Reusable navigation component for all steps
- Handles "Next", "Back", and "Submit" button states
- Manages button visibility based on current step
- Integrates with validation system

### Step Components

Each step component will be self-contained and focused on a specific part of the form:

#### MetadataStep
- Handles title and author input
- Validates required fields
- Uses Input components for consistency

#### SummaryStep
- Handles summary text and category selection
- Uses Input and Select components
- Validates required fields

#### ContentStep
- Handles blog content input
- Uses TextArea component
- Validates content presence

#### ReviewStep
- Displays all form data in formatted layout
- Uses Card component for organized presentation
- Provides edit navigation links

### Blog Display Components

#### BlogCard
- Reusable component for displaying blog post summaries
- Used in both list and grid layouts
- Handles click navigation to detail view

#### BlogList
- Container component for blog post collection
- Manages loading and empty states
- Integrates with storage system

#### BlogDetail
- Full blog post display component
- Handles navigation back to list
- Responsive layout for content

## Data Models

### Form State Management

The wizard will use a custom hook `useWizardForm` that manages:
- Form data state across all steps
- Validation state for each field
- Step completion tracking
- Navigation logic

```typescript
interface WizardFormState {
  data: WizardFormData;
  currentStep: number;
  steps: WizardStep[];
  errors: Record<string, string>;
}
```

### Storage Model

The `useBlogStorage` hook will handle:
- localStorage operations with error handling
- Data serialization/deserialization
- Fallback to memory storage
- Blog post CRUD operations

### Validation Model

The `useFormValidation` hook will provide:
- Field-level validation rules
- Real-time validation feedback
- Step completion validation
- Consistent error messaging

## Error Handling

### Validation Errors
- Field-level validation with immediate feedback
- Step-level validation preventing navigation
- Clear, user-friendly error messages
- Visual indicators for invalid fields

### Storage Errors
- Graceful fallback when localStorage unavailable
- User notification of storage limitations
- Data recovery mechanisms where possible
- Error boundaries for component failures

### Navigation Errors
- Prevention of invalid step transitions
- Data preservation during navigation errors
- Clear feedback for blocked actions
- Recovery options for users

## Testing Strategy

### Component Testing
- Unit tests for all reusable UI components
- Integration tests for wizard flow
- Validation logic testing
- Storage functionality testing

### User Flow Testing
- End-to-end wizard completion
- Navigation between steps
- Data persistence verification
- Error handling scenarios

### Accessibility Testing
- Keyboard navigation support
- Screen reader compatibility
- Focus management in wizard
- Color contrast compliance

### Performance Testing
- Component render optimization
- Large content handling
- Storage operation efficiency
- Memory usage monitoring

## Implementation Approach

### Phase 1: Foundation
- Set up basic UI components
- Implement core data types
- Create storage utilities
- Establish validation framework

### Phase 2: Wizard Core
- Build wizard container and navigation
- Implement step components
- Add form state management
- Integrate validation system

### Phase 3: Blog Features
- Create blog list and detail views
- Implement blog storage operations
- Add navigation between pages
- Integrate with wizard completion

### Phase 4: Polish
- Add responsive design
- Implement error boundaries
- Optimize performance
- Add accessibility features

## Design Decisions and Rationales

### Component Architecture
- **Decision**: Separate UI components from business logic
- **Rationale**: Enables reusability and easier testing

### State Management
- **Decision**: Use React hooks instead of external state library
- **Rationale**: Reduces complexity for this scope, leverages built-in React features

### Storage Strategy
- **Decision**: localStorage with memory fallback
- **Rationale**: Meets requirements without backend, provides persistence

### Validation Approach
- **Decision**: Real-time validation with step-level blocking
- **Rationale**: Improves user experience and data quality

### File Organization
- **Decision**: Feature-based component organization
- **Rationale**: Improves maintainability and code discoverability

### TypeScript Usage
- **Decision**: Comprehensive type definitions
- **Rationale**: Enhances code reliability and developer experience