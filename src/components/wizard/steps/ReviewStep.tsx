import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { ReviewStepProps } from '@/types/blog';

export const ReviewStep: React.FC<ReviewStepProps> = ({
  data,
  onEdit
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h2" className="mb-2">
          Review & Submit
        </Typography>
        <Typography variant="caption">
          Please review your blog post details below. You can edit any section by clicking the &quot;Edit&quot; button.
        </Typography>
      </div>

      <div className="space-y-4">

        <Card variant="outlined">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Blog Metadata</CardTitle>
              <button
                type="button"
                onClick={() => onEdit(1)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Edit
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="font-medium text-gray-700">Title:</span>
                <p className="text-gray-900">{data.title || 'Not provided'}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Author:</span>
                <p className="text-gray-900">{data.author || 'Not provided'}</p>
              </div>
            </div>
          </CardContent>
        </Card>


        <Card variant="outlined">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Summary & Category</CardTitle>
              <button
                type="button"
                onClick={() => onEdit(2)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Edit
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="font-medium text-gray-700">Summary:</span>
                <p className="text-gray-900">{data.summary || 'Not provided'}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Category:</span>
                <p className="text-gray-900">{data.category || 'Not selected'}</p>
              </div>
            </div>
          </CardContent>
        </Card>


        <Card variant="outlined">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Blog Content</CardTitle>
              <button
                type="button"
                onClick={() => onEdit(3)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Edit
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="max-h-64 overflow-y-auto">
              <span className="font-medium text-gray-700">Content:</span>
              <div className="mt-1 p-3 bg-gray-50 rounded border">
                <pre className="whitespace-pre-wrap text-gray-900 text-sm">
                  {data.content || 'No content provided'}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>


        <Card variant="elevated">
          <CardContent>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                This blog post will be published on {formatDate(new Date())}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};