import { useBlogStore } from '@/stores/blogStore';
import { WizardFormData } from '@/types/blog';

export function checkLocalStorageAvailability(): boolean {
    try {
        const testKey = '__localStorage_test__';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
        return true;
    } catch {
        console.warn('localStorage is not available');
        return false;
    }
}

export function generateId(): string {
    return `blog_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

export function getFromLocalStorage(key: string): string | null {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

export function setToLocalStorage(key: string, value: string): boolean {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (error) {
        console.error('Error writing to localStorage:', error);
        return false;
    }
}

export function removeFromLocalStorage(key: string): boolean {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
    }
}

export function getAllBlogPosts() {
    return useBlogStore.getState().posts;
}

export function createBlogPost(data: WizardFormData) {
    return useBlogStore.getState().addPost(data);
}

export function getBlogPost(id: string) {
    return useBlogStore.getState().getPost(id);
}

export function updateBlogPost(id: string, data: Partial<WizardFormData>) {
    return useBlogStore.getState().updatePost(id, data);
}

export function deleteBlogPost(id: string) {
    return useBlogStore.getState().deletePost(id);
}

export function clearAllBlogPosts() {
    return useBlogStore.getState().clearAllPosts();
}

export function isStorageAvailable() {
    return useBlogStore.getState().isStorageAvailable();
}

export function isLocalStorageWorking() {
    return checkLocalStorageAvailability();
}