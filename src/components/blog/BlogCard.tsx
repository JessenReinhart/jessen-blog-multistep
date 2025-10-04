'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { BlogPost } from '../../types/blog';
import { useAnimationConfig } from '../../hooks/useAnimationConfig';
import { staggerItem } from '../../lib/animations';

interface BlogCardProps {
  post: BlogPost;
  onClick: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onClick, onEdit, onDelete }) => {
  const formatDate = (date: Date) => {
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

  const hasInteractiveElements = onEdit || onDelete;

  const { getVariants } = useAnimationConfig();

  return (
    <motion.div
      variants={getVariants(staggerItem)}
      initial="initial"
      animate="animate"
      className="h-full"
    >
      <Card
        variant="outlined"
        hover={!hasInteractiveElements}
        onClick={!hasInteractiveElements ? () => onClick(post.id) : undefined}
        className="h-full"
      >
      <CardHeader>
        <div 
          className={`relative mb-2 ${hasInteractiveElements ? 'cursor-pointer' : ''}`}
          onClick={hasInteractiveElements ? () => onClick(post.id) : undefined}
        >
          <div className="text-center pr-16">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 text-center">
              {post.title}
            </h3>
          </div>
          <span className={`absolute top-0 right-0 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getCategoryColor(post.category)}`}>
            {post.category}
          </span>
        </div>
        <p 
          className={`text-sm text-gray-600 text-center ${hasInteractiveElements ? 'cursor-pointer' : ''}`}
          onClick={hasInteractiveElements ? () => onClick(post.id) : undefined}
        >
          by {post.author}
        </p>
      </CardHeader>

      <CardContent>
        <p 
          className={`text-gray-700 line-clamp-3 mb-3 ${hasInteractiveElements ? 'cursor-pointer' : ''}`}
          onClick={hasInteractiveElements ? () => onClick(post.id) : undefined}
        >
          {post.summary}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">
            {formatDate(post.createdAt)}
          </p>
          {(onEdit || onDelete) && (
            <div className="flex gap-2">
              {onEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(post.id);
                  }}
                >
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(post.id);
                  }}
                >
                  Delete
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
    </motion.div>
  );
};