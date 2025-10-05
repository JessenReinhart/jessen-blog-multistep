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

export const SummaryStep: React.FC<SummaryStepProps> = ({ form }) => {
  const { formState: { errors }, watch } = form;
  const data = watch();

  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h2" className="mb-2">
          Blog Summary & Category
        </Typography>
        <Typography variant="caption">
          Provide a summary and categorize your blog post to help readers understand what it&apos;s about.
        </Typography>
      </div>
      
      <div className="space-y-4">
        <Input
          label="Blog Summary"
          value={data.summary || ''}
          onChange={(value) => form.setValue('summary', value)}
          onBlur={() => form.trigger('summary')}
          error={errors.summary?.message}
          required
          placeholder="Write a brief summary of your blog post"
          id="blog-summary"
        />
        
        <Select
          label="Blog Category"
          value={data.category || ''}
          onChange={(value) => form.setValue('category', value as BlogCategory)}
          onBlur={() => form.trigger('category')}
          options={categoryOptions}
          error={errors.category?.message}
          required
          id="blog-category"
        />
      </div>
    </div>
  );
};