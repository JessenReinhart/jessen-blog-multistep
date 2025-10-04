import React from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { SummaryStepProps, BlogCategory } from '@/types/blog';

const categoryOptions = [
  { value: 'Tech', label: 'Tech' },
  { value: 'Lifestyle', label: 'Lifestyle' },
  { value: 'Business', label: 'Business' }
];

export const SummaryStep: React.FC<SummaryStepProps> = ({
  data,
  onChange,
  errors
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog Summary & Category</h2>
        <p className="text-gray-600">
          Provide a summary and categorize your blog post to help readers understand what it's about.
        </p>
      </div>
      
      <div className="space-y-4">
        <Input
          label="Blog Summary"
          value={data.summary}
          onChange={(value) => onChange('summary', value)}
          error={errors.summary}
          required
          placeholder="Write a brief summary of your blog post"
          id="blog-summary"
        />
        
        <Select
          label="Blog Category"
          value={data.category}
          onChange={(value) => onChange('category', value as BlogCategory)}
          options={categoryOptions}
          error={errors.category}
          required
          placeholder="Select a category for your blog post"
          id="blog-category"
        />
      </div>
    </div>
  );
};