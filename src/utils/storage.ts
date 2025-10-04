import { BlogPost, WizardFormData, BlogCategory } from '@/types/blog';

const BLOG_POSTS_KEY = 'blog_posts';

let memoryStorage: BlogPost[] = [];
let isLocalStorageAvailable = true;

function checkLocalStorageAvailability(): boolean {
    try {
        const testKey = '__localStorage_test__';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
        return true;
    } catch (error) {
        console.warn('localStorage is not available, falling back to memory storage');
        return false;
    }
}

function initializeStorage(): void {
    isLocalStorageAvailable = checkLocalStorageAvailability();
}

function getFromLocalStorage(key: string): string | null {
    if (!isLocalStorageAvailable) {
        return null;
    }

    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        isLocalStorageAvailable = false;
        return null;
    }
}

function setToLocalStorage(key: string, value: string): boolean {
    if (!isLocalStorageAvailable) {
        return false;
    }

    try {
        localStorage.setItem(key, value);
        return true;
    } catch (error) {
        console.error('Error writing to localStorage:', error);
        isLocalStorageAvailable = false;
        return false;
    }
}

function generateId(): string {
    return `blog_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

function serializePosts(posts: BlogPost[]): string {
    return JSON.stringify(posts.map(post => ({
        ...post,
        createdAt: post.createdAt.toISOString()
    })));
}

function deserializePosts(data: string): BlogPost[] {
    try {
        const parsed = JSON.parse(data);
        return parsed.map((post: any) => ({
            ...post,
            createdAt: new Date(post.createdAt)
        }));
    } catch (error) {
        console.error('Error deserializing blog posts:', error);
        return [];
    }
}

export function getAllBlogPosts(): BlogPost[] {
    if (isLocalStorageAvailable === undefined) {
        initializeStorage();
    }

    if (isLocalStorageAvailable) {
        const data = getFromLocalStorage(BLOG_POSTS_KEY);
        if (data) {
            const posts = deserializePosts(data);
            memoryStorage = posts;
            return posts;
        }
    }

    return memoryStorage;
}

function saveBlogPosts(posts: BlogPost[]): boolean {
    memoryStorage = posts;

    if (isLocalStorageAvailable) {
        const serialized = serializePosts(posts);
        return setToLocalStorage(BLOG_POSTS_KEY, serialized);
    }

    return false;
}

export function createBlogPost(data: WizardFormData): string {
    if (!data.category) {
        throw new Error('Category is required');
    }

    const validCategories: BlogCategory[] = ['Tech', 'Lifestyle', 'Business'];
    if (!validCategories.includes(data.category as BlogCategory)) {
        throw new Error('Invalid category');
    }

    const id = generateId();
    const newPost: BlogPost = {
        id,
        title: data.title,
        author: data.author,
        summary: data.summary,
        category: data.category as BlogCategory,
        content: data.content,
        createdAt: new Date()
    };

    const existingPosts = getAllBlogPosts();
    const updatedPosts = [...existingPosts, newPost];

    saveBlogPosts(updatedPosts);

    return id;
}

export function getBlogPost(id: string): BlogPost | undefined {
    const posts = getAllBlogPosts();
    return posts.find(post => post.id === id);
}

export function updateBlogPost(id: string, data: Partial<WizardFormData>): boolean {
    const posts = getAllBlogPosts();
    const postIndex = posts.findIndex(post => post.id === id);

    if (postIndex === -1) {
        return false;
    }

    const updateData: Partial<BlogPost> = { ...data };
    
    if (data.category) {
        const validCategories: BlogCategory[] = ['Tech', 'Lifestyle', 'Business'];
        if (validCategories.includes(data.category as BlogCategory)) {
            updateData.category = data.category as BlogCategory;
        }
    }

    const updatedPost: BlogPost = {
        ...posts[postIndex],
        ...updateData
    };

    const updatedPosts = [...posts];
    updatedPosts[postIndex] = updatedPost;

    saveBlogPosts(updatedPosts);

    return true;
}

export function deleteBlogPost(id: string): boolean {
    const posts = getAllBlogPosts();
    const filteredPosts = posts.filter(post => post.id !== id);

    if (filteredPosts.length === posts.length) {
        return false;
    }

    saveBlogPosts(filteredPosts);

    return true;
}

export function isStorageAvailable(): boolean {
    return true;
}

export function isLocalStorageWorking(): boolean {
    if (isLocalStorageAvailable === undefined) {
        initializeStorage();
    }
    return isLocalStorageAvailable;
}

export function clearAllBlogPosts(): void {
    memoryStorage = [];

    if (isLocalStorageAvailable) {
        try {
            localStorage.removeItem(BLOG_POSTS_KEY);
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    }
}

initializeStorage();