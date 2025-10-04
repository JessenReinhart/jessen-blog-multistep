import React from 'react';

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  showCharCount?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  id?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  onChange,
  error,
  required = false,
  placeholder,
  rows = 4,
  maxLength,
  showCharCount = false,
  resize = 'vertical',
  id
}) => {
  const textAreaId = id || `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`;
  
  const textAreaClasses = `
    w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2
    ${error 
      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
    }
    ${resize === 'none' ? 'resize-none' : 
      resize === 'vertical' ? 'resize-y' : 
      resize === 'horizontal' ? 'resize-x' : 'resize'}
  `.trim();
  
  return (
    <div className="space-y-1">
      <label 
        htmlFor={textAreaId}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <textarea
        id={textAreaId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className={textAreaClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${textAreaId}-error` : undefined}
      />
      
      {showCharCount && maxLength && (
        <div className="text-sm text-gray-500 text-right">
          {value.length}/{maxLength}
        </div>
      )}
      
      {error && (
        <p 
          id={`${textAreaId}-error`}
          className="text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};