import React from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Typography } from '@/components/ui/Typography';
import { SummaryStepProps, BlogCategory } from '@/types/blog';

const categoryOptions = [
  { value: 'Tech', label: 'Tech' },
  { value: 'Lifestyle', label: 'Lifestyle' },
  { value: 'Business', label: 'Business' }
];

export const SummaryStep: React.FC<SummaryStepProps> = ({
  data,
  onChange,
  onBlur,
  errors
}) => {
  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h2" className="mb-2">
          Blog Summary & Category
        </Typography>
        <Typography variant="caption">
          Provide a summary and categorize your blog post to help readers understand what it's about.
        </Typography>
      </div>
      
      <div className="space-y-4">
        <Input
          label="Blog Summary"
          value={data.summary}
          onChange={(value) => onChange('summary', value)}
          onBlur={(value) => onBlur('summary', value)}
          error={errors.summary}
          required
          placeholder="Write a brief summary of your blog post"
          id="blog-summary"
        />
        
        <Select
          label="Blog Category"
          value={data.category}
          onChange={(value) => onChange('category', value as BlogCategory)}
          onBlur={(value) => onBlur('category', value as BlogCategory)}
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