"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useBlogStorage } from "@/hooks/useBlogStorage";
import { BlogPost, WizardFormData } from "@/types/blog";
import { WizardContainer } from "@/components/wizard/WizardContainer";
import { PageLayout } from "@/components/layout/PageLayout";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { PageHeader } from "@/components/layout/PageHeader";

export default function EditBlogPage() {
    const params = useParams();
    const router = useRouter();
    const { getPost, updatePost } = useBlogStorage();
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
            } catch (err) {
                setError("Failed to load blog post");
            } finally {
                setLoading(false);
            }
        };

        loadBlogPost();
    }, [params.id, getPost]);

    const handleComplete = (data: WizardFormData) => {
        const id = params.id as string;
        // The update is already handled by the wizard's submitForm
        // Just navigate back to the post
        router.push(`/blog/${id}`);
    };

    const handleBackToPost = () => {
        const id = params.id as string;
        router.push(`/blog/${id}`);
    };

    if (loading) {
        return (
            <PageLayout>
                <ContentContainer>
                    <div className="flex justify-center items-center h-64">
                        <div className="text-lg text-gray-600">
                            Loading...
                        </div>
                    </div>
                </ContentContainer>
            </PageLayout>
        );
    }

    if (error || !blogPost) {
        return (
            <PageLayout>
                <ContentContainer>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            {error || "Blog post not found"}
                        </h1>
                        <p className="text-gray-600 mb-6">
                            The blog post you're trying to edit doesn't exist or has been removed.
                        </p>
                        <button
                            onClick={() => router.push("/")}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Back to Blog List
                        </button>
                    </div>
                </ContentContainer>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <ContentContainer>
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
            </ContentContainer>
        </PageLayout>
    );
}