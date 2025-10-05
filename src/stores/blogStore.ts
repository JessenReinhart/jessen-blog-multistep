import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BlogPost, WizardFormData, BlogCategory } from '@/types/blog';

const blogStorage = {
  getItem: (name: string) => {
    try {
      const item = localStorage.getItem(name);
      return item ? JSON.parse(item) : null;
    } catch {
      console.warn('localStorage is not available');
      return null;
    }
  },
  
  setItem: (name: string, value: unknown) => {
    try {
      localStorage.setItem(name, JSON.stringify(value));
    } catch {
      console.warn('Failed to save to localStorage');
    }
  },
  
  removeItem: (name: string) => {
    try {
      localStorage.removeItem(name);
    } catch {
      console.warn('Failed to remove from localStorage');
    }
  }
};

const generateId = (): string => {
  return `blog_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
};

interface BlogStore {
  posts: BlogPost[];
  addPost: (data: WizardFormData) => string;
  getPost: (id: string) => BlogPost | undefined;
  updatePost: (id: string, data: Partial<WizardFormData>) => boolean;
  deletePost: (id: string) => boolean;
  clearAllPosts: () => void;
  isStorageAvailable: () => boolean;
}

export const useBlogStore = create<BlogStore>()(
  persist(
    (set, get) => ({
      posts: [],
      
      addPost: (data: WizardFormData): string => {
        if (!data.category) {
          throw new Error('Category is required');
        }

        const validCategories: BlogCategory[] = ['Tech', 'Lifestyle', 'Business'];
        if (!validCategories.includes(data.category)) {
          throw new Error('Invalid category');
        }

        const id = generateId();
        const newPost: BlogPost = {
          id,
          title: data.title,
          author: data.author,
          summary: data.summary,
          category: data.category,
          content: data.content,
          createdAt: new Date()
        };

        set(state => ({ 
          posts: [...state.posts, newPost] 
        }));

        return id;
      },
      
      getPost: (id: string): BlogPost | undefined => {
        const { posts } = get();
        return posts.find(post => post.id === id);
      },
      
      updatePost: (id: string, data: Partial<WizardFormData>): boolean => {
        const { posts } = get();
        const postIndex = posts.findIndex(post => post.id === id);

        if (postIndex === -1) {
          return false;
        }

        const updateData: Partial<BlogPost> = { ...data };
        
        if (data.category) {
          const validCategories: BlogCategory[] = ['Tech', 'Lifestyle', 'Business'];
          if (validCategories.includes(data.category)) {
            updateData.category = data.category;
          }
        }

        const updatedPosts = [...posts];
        updatedPosts[postIndex] = {
          ...updatedPosts[postIndex],
          ...updateData
        };

        set({ posts: updatedPosts });
        return true;
      },
      
      deletePost: (id: string): boolean => {
        const { posts } = get();
        const filteredPosts = posts.filter(post => post.id !== id);

        if (filteredPosts.length === posts.length) {
          return false;
        }

        set({ posts: filteredPosts });
        return true;
      },
      
      clearAllPosts: (): void => {
        set({ posts: [] });
      },
      
      isStorageAvailable: (): boolean => {
        return true;
      }
    }),
    {
      name: 'blog-posts',
      storage: blogStorage,
      onRehydrateStorage: () => (state) => {
        if (state?.posts) {
          state.posts = state.posts.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt)
          }));
        }
      }
    }
  )
);