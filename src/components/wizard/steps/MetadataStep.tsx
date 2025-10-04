import React from 'react';
import { Input } from '@/components/ui/Input';
import { Typography } from '@/components/ui/Typography';
import { MetadataStepProps } from '@/types/blog';

export const MetadataStep: React.FC<MetadataStepProps> = ({
  data,
  onChange,
  errors
}) => {
  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h2" className="mb-2">
          Blog Metadata
        </Typography>
        <Typography variant="caption">
          Let's start with the basic information about your blog post.
        </Typography>
      </div>
      
      <div className="space-y-4">
        <Input
          label="Blog Title"
          value={data.title}
          onChange={(value) => onChange('title', value)}
          error={errors.title}
          required
          placeholder="Enter your blog post title"
          id="blog-title"
        />
        
        <Input
          label="Author Name"
          value={data.author}
          onChange={(value) => onChange('author', value)}
          error={errors.author}
          required
          placeholder="Enter the author's name"
          id="author-name"
        />
      </div>
    </div>
  );
};