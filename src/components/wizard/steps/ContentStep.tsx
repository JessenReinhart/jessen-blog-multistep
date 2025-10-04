import React from 'react';
import { TextArea } from '@/components/ui/TextArea';
import { Typography } from '@/components/ui/Typography';
import { ContentStepProps } from '@/types/blog';

export const ContentStep: React.FC<ContentStepProps> = ({
  data,
  onChange,
  onBlur,
  errors
}) => {
  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h2" className="mb-2">
          Blog Content
        </Typography>
        <Typography variant="caption">
          Write the main content of your blog post. This is where you can share your thoughts, ideas, and insights.
        </Typography>
      </div>
      
      <div className="space-y-4">
        <TextArea
          label="Blog Content"
          value={data.content}
          onChange={(value) => onChange('content', value)}
          onBlur={(value) => onBlur('content', value)}
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