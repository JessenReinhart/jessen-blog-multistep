"use client";

import { WizardContainer } from "@/components/wizard/WizardContainer";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { useNavigationLoader } from "@/hooks/useNavigationLoader";

export default function CreateBlogPage() {
  const { navigateWithLoader } = useNavigationLoader();

  const handleWizardComplete = () => {
    navigateWithLoader("/", "Returning to blog list...");
  };

  return (
    <PageLayout>
      <PageHeader
        title="Create New Blog Post"
        subtitle="Follow the steps below to create your blog post"
      />
      <WizardContainer onComplete={handleWizardComplete} />
    </PageLayout>
  );
}