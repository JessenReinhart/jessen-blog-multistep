import { useBlogStore } from '@/stores/blogStore';
import { BlogPost, UseBlogStorageReturn } from '@/types/blog';

export function useBlogStorage(): UseBlogStorageReturn {
  const {
    posts,
    addPost,
    getPost,
    updatePost,
    deletePost,
    isStorageAvailable
  } = useBlogStore();

  return {
    posts,
    createPost: addPost,
    getPost,
    getAllPosts: () => posts,
    updatePost,
    deletePost,
    isStorageAvailable: isStorageAvailable()
  };
}

export function useBlogPost(id: string): BlogPost | undefined {
  return useBlogStore(state => state.getPost(id));
}

export function useBlogPosts(): BlogPost[] {
  return useBlogStore(state => state.posts);
}

export function useBlogActions() {
  const {
    addPost,
    updatePost,
    deletePost,
    clearAllPosts
  } = useBlogStore();

  return {
    createPost: addPost,
    updatePost,
    deletePost,
    clearAllPosts
  };
}