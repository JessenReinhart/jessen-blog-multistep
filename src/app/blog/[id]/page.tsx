"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useBlogStorage } from "@/hooks/useBlogStorage";
import { BlogPost } from "@/types/blog";
import { Button } from "@/components/ui/Button";
import { BlogDetail } from "@/components/blog/BlogDetail";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { PageLayout } from "@/components/layout/PageLayout";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { PageHeader } from "@/components/layout/PageHeader";

export default function BlogDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { getPost, deletePost } = useBlogStorage();
    const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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

    const handleBackToList = () => {
        router.push("/");
    };

    const handleEdit = () => {
        const id = params.id as string;
        router.push(`/blog/${id}/edit`);
    };

    const handleDelete = () => {
        setShowDeleteDialog(true);
    };

    const confirmDelete = () => {
        const id = params.id as string;
        const success = deletePost(id);

        if (success) {
            router.push("/");
        } else {
            setError("Failed to delete blog post");
        }
        setShowDeleteDialog(false);
    };

    const cancelDelete = () => {
        setShowDeleteDialog(false);
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
                            The blog post you&apos;re looking for doesn&apos;t exist or has been removed.
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
                <BlogDetail
                    post={blogPost}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
                <ConfirmDialog
                    isOpen={showDeleteDialog}
                    title="Delete Blog Post"
                    message={`Are you sure you want to delete "${blogPost.title}"? This action cannot be undone.`}
                    confirmText="Delete"
                    cancelText="Cancel"
                    variant="danger"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            </ContentContainer>
        </PageLayout>
    );
}