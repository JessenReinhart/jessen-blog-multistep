"use client";

import { useRouter } from "next/navigation";
import { WizardContainer } from "@/components/wizard/WizardContainer";
import { PageLayout } from "@/components/layout/PageLayout";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { PageHeader } from "@/components/layout/PageHeader";

export default function CreateBlogPage() {
  const router = useRouter();

  const handleWizardComplete = () => {
    router.push("/");
  };

  return (
    <PageLayout>
      <ContentContainer>
        <PageHeader
          title="Create New Blog Post"
          subtitle="Follow the steps below to create your blog post"
        />
        <WizardContainer onComplete={handleWizardComplete} />
      </ContentContainer>
    </PageLayout>
  );
}