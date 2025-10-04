import React from 'react';
import { Input } from '@/components/ui/Input';
import { MetadataStepProps } from '@/types/blog';

export const MetadataStep: React.FC<MetadataStepProps> = ({
  data,
  onChange,
  errors
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog Metadata</h2>
        <p className="text-gray-600">
          Let's start with the basic information about your blog post.
        </p>
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