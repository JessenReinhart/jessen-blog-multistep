import React from 'react';
import { Input } from '@/components/ui/Input';
import { Typography } from '@/components/ui/Typography';
import { MetadataStepProps } from '@/types/blog';

export const MetadataStep: React.FC<MetadataStepProps> = ({ form }) => {
  const { formState: { errors }, watch } = form;
  const data = watch();

  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h2" className="mb-2">
          Blog Metadata
        </Typography>
        <Typography variant="caption">
          Let&apos;s start with the basic information about your blog post.
        </Typography>
      </div>
      
      <div className="space-y-4">
        <Input
          label="Blog Title"
          value={data.title || ''}
          onChange={(value) => form.setValue('title', value)}
          onBlur={() => form.trigger('title')}
          error={errors.title?.message}
          required
          placeholder="Enter your blog post title"
          id="blog-title"
        />
        
        <Input
          label="Author Name"
          value={data.author || ''}
          onChange={(value) => form.setValue('author', value)}
          onBlur={() => form.trigger('author')}
          error={errors.author?.message}
          required
          placeholder="Enter the author's name"
          id="author-name"
        />
      </div>
    </div>
  );
};