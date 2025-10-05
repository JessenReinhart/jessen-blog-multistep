"use client";


import { BlogList } from "@/components/blog/BlogList";
import { Button } from "@/components/ui/Button";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { useNavigationLoader } from "@/hooks/useNavigationLoader";

export default function Home() {
  const { navigateWithLoader } = useNavigationLoader();

  const handlePostClick = (id: string) => {
    navigateWithLoader(`/blog/${id}`, "Loading blog post...");
  };

  const handlePostEdit = (id: string) => {
    navigateWithLoader(`/blog/${id}/edit`, "Loading editor...");
  };

  const handleCreatePost = () => {
    navigateWithLoader("/create", "Setting up blog wizard...");
  };

  return (
    <PageLayout>
      <PageHeader
        title="Blog Posts"
        actions={
          <Button variant="primary" size="md" onClick={handleCreatePost}>
            Create New Post
          </Button>
        }
      />
      <BlogList onPostClick={handlePostClick} onPostEdit={handlePostEdit} />
    </PageLayout>
  );
}
