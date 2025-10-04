import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { AnimationProvider } from "../contexts/AnimationContext";
import { AnimationErrorBoundary } from "../components/AnimationErrorBoundary";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog Wizard",
  description: "Create and manage blog posts with our multi-step wizard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <AnimationErrorBoundary>
          <AnimationProvider>
            <header className="bg-white shadow-sm border-b border-gray-200">
              <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <Link
                    href="/"
                    className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    Blog Wizard
                  </Link>
                </div>
              </nav>
            </header>
            {children}
          </AnimationProvider>
        </AnimationErrorBoundary>
      </body>
    </html>
  );
}
