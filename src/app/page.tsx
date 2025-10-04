"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BlogList } from "@/components/blog/BlogList";
import { Button } from "@/components/ui/Button";
import { PageLayout } from "@/components/layout/PageLayout";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { PageHeader } from "@/components/layout/PageHeader";

export default function Home() {
  const router = useRouter();

  const handlePostClick = (id: string) => {
    router.push(`/blog/${id}`);
  };

  return (
    <PageLayout>
      <ContentContainer>
        <PageHeader
          title="Blog Posts"
          actions={
            <Link href="/create">
              <Button variant="primary" size="md">
                Create New Post
              </Button>
            </Link>
          }
        />
        <BlogList onPostClick={handlePostClick} />
      </ContentContainer>
    </PageLayout>
  );
}
