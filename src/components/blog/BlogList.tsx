import React from 'react';
import { BlogCard } from './BlogCard';
import { useBlogStorage } from '../../hooks/useBlogStorage';

interface BlogListProps {
  onPostClick: (id: string) => void;
}

export const BlogList: React.FC<BlogListProps> = ({ onPostClick }) => {
  const { posts, isStorageAvailable } = useBlogStorage();

  if (!isStorageAvailable) {
    return (
      <div className="text-center py-12">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-lg font-medium text-yellow-800 mb-2">
            Storage Not Available
          </h3>
          <p className="text-yellow-700">
            Blog posts are stored in memory only and will be lost when you refresh the page.
          </p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No blog posts yet
          </h3>
          <p className="text-gray-600 mb-6">
            Get started by creating your first blog post using the wizard.
          </p>
        </div>
      </div>
    );
  }

  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Blog Posts ({posts.length})
        </h2>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedPosts.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
            onClick={onPostClick}
          />
        ))}
      </div>
    </div>
  );
};