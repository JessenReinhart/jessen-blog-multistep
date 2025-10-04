import React from 'react';
import { TextArea } from '@/components/ui/TextArea';
import { ContentStepProps } from '@/types/blog';

export const ContentStep: React.FC<ContentStepProps> = ({
  data,
  onChange,
  errors
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog Content</h2>
        <p className="text-gray-600">
          Write the main content of your blog post. This is where you can share your thoughts, ideas, and insights.
        </p>
      </div>
      
      <div className="space-y-4">
        <TextArea
          label="Blog Content"
          value={data.content}
          onChange={(value) => onChange('content', value)}
          error={errors.content}
          required
          placeholder="Write your blog post content here..."
          rows={12}
          resize="vertical"
          id="blog-content"
        />
      </div>
    </div>
  );
};