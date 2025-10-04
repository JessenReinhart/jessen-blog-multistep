import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { BlogPost } from '../../types/blog';

interface BlogDetailProps {
  post: BlogPost;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const BlogDetail: React.FC<BlogDetailProps> = ({ post, onEdit, onDelete }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Tech: 'bg-blue-100 text-blue-800',
      Lifestyle: 'bg-green-100 text-green-800',
      Business: 'bg-purple-100 text-purple-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card variant="default" padding="lg">
        <CardHeader>
          <div className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <CardTitle className="text-3xl font-bold flex-1">
                {post.title}
              </CardTitle>
              <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${getCategoryColor(post.category)}`}>
                {post.category}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <span className="font-medium">
                by {post.author}
              </span>
              <span className="text-gray-400">•</span>
              <span>
                {formatDate(post.createdAt)}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {(onEdit || onDelete) && (
            <div className="flex gap-3 justify-end border-b border-gray-200 pb-4">
              {onEdit && (
                <Button
                  variant="outline"
                  size="md"
                  onClick={onEdit}
                >
                  Edit Post
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="outline"
                  size="md"
                  onClick={onDelete}
                >
                  Delete Post
                </Button>
              )}
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Summary</h3>
            <p className="text-gray-700 leading-relaxed">
              {post.summary}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Content</h3>
            <div className="prose prose-gray max-w-none">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};