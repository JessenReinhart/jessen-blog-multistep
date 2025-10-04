import { useState, useEffect, useCallback } from 'react';
import { BlogPost, WizardFormData, UseBlogStorageReturn } from '@/types/blog';
import {
    getAllBlogPosts,
    createBlogPost,
    getBlogPost,
    updateBlogPost,
    deleteBlogPost,
    isLocalStorageWorking
} from '@/utils/storage';

export function useBlogStorage(): UseBlogStorageReturn {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isStorageAvailable, setIsStorageAvailable] = useState(true);

    useEffect(() => {
        try {
            const loadedPosts = getAllBlogPosts();
            setPosts(loadedPosts);
            setIsStorageAvailable(isLocalStorageWorking());
        } catch (error) {
            console.error('Error loading blog posts:', error);
            setPosts([]);
            setIsStorageAvailable(false);
        }
    }, []);

    const createPost = useCallback((data: WizardFormData): string => {
        try {
            const postId = createBlogPost(data);
            
            const updatedPosts = getAllBlogPosts();
            setPosts(updatedPosts);
            
            return postId;
        } catch (error) {
            console.error('Error creating blog post:', error);
            throw error;
        }
    }, []);

    const getPost = useCallback((id: string): BlogPost | undefined => {
        try {
            return getBlogPost(id);
        } catch (error) {
            console.error('Error retrieving blog post:', error);
            return undefined;
        }
    }, []);
    const getAllPosts = useCallback((): BlogPost[] => {
        return posts;
    }, [posts]);

    const updatePost = useCallback((id: string, data: Partial<WizardFormData>): boolean => {
        try {
            const success = updateBlogPost(id, data);
            if (success) {
                const updatedPosts = getAllBlogPosts();
                setPosts(updatedPosts);
            }
            return success;
        } catch (error) {
            console.error('Error updating blog post:', error);
            return false;
        }
    }, []);

    const deletePost = useCallback((id: string): boolean => {
        try {
            const success = deleteBlogPost(id);
            if (success) {
                const updatedPosts = getAllBlogPosts();
                setPosts(updatedPosts);
            }
            return success;
        } catch (error) {
            console.error('Error deleting blog post:', error);
            return false;
        }
    }, []);

    return {
        posts,
        createPost,
        getPost,
        getAllPosts,
        updatePost,
        deletePost,
        isStorageAvailable
    };
}