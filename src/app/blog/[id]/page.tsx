"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useBlogStorage } from "@/hooks/useBlogStorage";
import { BlogPost } from "@/types/blog";
import { Button } from "@/components/ui/Button";
import { BlogDetail } from "@/components/blog/BlogDetail";
import { PageLayout } from "@/components/layout/PageLayout";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { PageHeader } from "@/components/layout/PageHeader";

export default function BlogDetailPage() {
    const params = useParams();
    const router = useRouter();
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
            } catch (err) {
                setError("Failed to load blog post");
            } finally {
                setLoading(false);
            }
        };

        loadBlogPost();
    }, [params.id, getPost]);

    const handleBackToList = () => {
        router.push("/");
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
                            The blog post you're looking for doesn't exist or has been removed.
                        </p>
                        <Button variant="primary" size="md" onClick={handleBackToList}>
                            Back to Blog List
                        </Button>
                    </div>
                </ContentContainer>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <ContentContainer>
                <PageHeader
                    title={blogPost.title}
                    backButton={{
                        label: "Back to Blog List",
                        onClick: handleBackToList
                    }}
                />
                <BlogDetail post={blogPost} />
            </ContentContainer>
        </PageLayout>
    );
}