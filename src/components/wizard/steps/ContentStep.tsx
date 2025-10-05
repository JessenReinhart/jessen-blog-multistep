import React from 'react';
import { TextArea } from '@/components/ui/TextArea';
import { Typography } from '@/components/ui/Typography';
import { ContentStepProps } from '@/types/blog';

export const ContentStep: React.FC<ContentStepProps> = ({ form }) => {
  const { formState: { errors }, watch } = form;
  const data = watch();

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
          value={data.content || ''}
          onChange={(value) => form.setValue('content', value)}
          onBlur={() => form.trigger('content')}
          error={errors.content?.message}
          required
          placeholder="Write your blog post content here..."
          rows={12}
          id="blog-content"
        />
      </div>
    </div>
  );
};