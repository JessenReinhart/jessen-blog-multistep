import React, { useState } from 'react';
import { BlogCard } from './BlogCard';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { useBlogStorage } from '../../hooks/useBlogStorage';

interface BlogListProps {
  onPostClick: (id: string) => void;
  onPostEdit?: (id: string) => void;
}

export const BlogList: React.FC<BlogListProps> = ({ onPostClick, onPostEdit }) => {
  const { posts, isStorageAvailable, deletePost } = useBlogStorage();
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; postId: string; postTitle: string }>({
    isOpen: false,
    postId: '',
    postTitle: ''
  });

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

  const handleDelete = (id: string) => {
    const post = posts.find(p => p.id === id);
    if (post) {
      setDeleteDialog({
        isOpen: true,
        postId: id,
        postTitle: post.title
      });
    }
  };

  const confirmDelete = () => {
    deletePost(deleteDialog.postId);
    setDeleteDialog({ isOpen: false, postId: '', postTitle: '' });
  };

  const cancelDelete = () => {
    setDeleteDialog({ isOpen: false, postId: '', postTitle: '' });
  };

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
            onEdit={onPostEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Delete Blog Post"
        message={`Are you sure you want to delete "${deleteDialog.postTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};