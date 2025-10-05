"use client";

import { useRouter } from "next/navigation";
import { useNavigation } from "@/contexts/NavigationContext";

export function useNavigationLoader() {
  const router = useRouter();
  const { setIsNavigating, setNavigationMessage } = useNavigation();

  const navigateWithLoader = (path: string, message?: string) => {
    setNavigationMessage(message || "Loading...");
    setIsNavigating(true);

    setTimeout(() => {
      router.push(path);
    }, 150);
  };

  return { navigateWithLoader };
}