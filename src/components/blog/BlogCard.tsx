import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { BlogPost } from '../../types/blog';

interface BlogCardProps {
  post: BlogPost;
  onClick: (id: string) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onClick }) => {
  const formatDate = (date: Date) => {
    // Use a consistent format that works the same on server and client
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
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
    <Card
      variant="outlined"
      hover={true}
      onClick={() => onClick(post.id)}
      className="h-full"
    >
      <CardHeader>
        <div className="relative mb-2">
          <div className="text-center pr-16">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 text-center">
              {post.title}
            </h3>
          </div>
          <span className={`absolute top-0 right-0 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getCategoryColor(post.category)}`}>
            {post.category}
          </span>
        </div>
        <p className="text-sm text-gray-600 text-center">
          by {post.author}
        </p>
      </CardHeader>

      <CardContent>
        <p className="text-gray-700 line-clamp-3 mb-3">
          {post.summary}
        </p>
        <p className="text-xs text-gray-500">
          {formatDate(post.createdAt)}
        </p>
      </CardContent>
    </Card>
  );
};