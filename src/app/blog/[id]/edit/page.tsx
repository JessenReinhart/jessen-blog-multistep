"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useBlogStorage } from "@/hooks/useBlogStorage";
import { BlogPost, WizardFormData } from "@/types/blog";
import { WizardContainer } from "@/components/wizard/WizardContainer";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { useNavigationLoader } from "@/hooks/useNavigationLoader";
import { PageLoader } from "@/components/ui/PageLoader";

export default function EditBlogPage() {
    const params = useParams();
    const { navigateWithLoader } = useNavigationLoader();
    const { getPost } = useBlogStorage();
    const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBlogPost = async () => {
            try {
                const id = params.id as string;
                const post = getPost(id);

                if (!post) {
                    setError("Blog post not found");
                } else {
                    setBlogPost(post);
                }
            } catch {
                setError("Failed to load blog post");
            } finally {
                setLoading(false);
            }
        };

        loadBlogPost();
    }, [params.id, getPost]);

    const handleComplete = (_data: WizardFormData) => {
        const id = params.id as string;
        navigateWithLoader(`/blog/${id}`, "Saving changes...");
    };

    const handleBackToPost = () => {
        const id = params.id as string;
        navigateWithLoader(`/blog/${id}`, "Returning to post...");
    };

    if (loading) {
        return (
            <PageLayout>
                <PageLoader message="Loading blog post for editing..." />
            </PageLayout>
        );
    }

    if (error || !blogPost) {
        return (
            <PageLayout>
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        {error || "Blog post not found"}
                    </h1>
                    <p className="text-gray-600 mb-6">
                        The blog post you&apos;re trying to edit doesn&apos;t exist or has been removed.
                    </p>
                    <button
                        onClick={() => navigateWithLoader("/", "Returning to blog list...")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Back to Blog List
                    </button>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <PageHeader
                title="Edit Blog Post"
                backButton={{
                    label: "Back to Post",
                    onClick: handleBackToPost
                }}
            />
            <WizardContainer
                onComplete={handleComplete}
                postId={params.id as string}
                initialData={{
                    title: blogPost.title,
                    author: blogPost.author,
                    summary: blogPost.summary,
                    category: blogPost.category,
                    content: blogPost.content
                }}
            />
        </PageLayout>
    );
}