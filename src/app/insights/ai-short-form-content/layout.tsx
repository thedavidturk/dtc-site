import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Short-Form, High Impact: How AI Is Powering the Next Wave of Social Content",
  description:
    "AI-powered short-form content is dominating social platforms. How brands are using AI to produce TikTok, Reels, and Shorts content at scale without sacrificing quality.",
  keywords: [
    "AI short-form video",
    "AI social content",
    "TikTok AI content",
    "AI Reels production",
    "AI content at scale",
  ],
  openGraph: {
    title:
      "Short-Form, High Impact: How AI Is Powering the Next Wave of Social Content",
    description:
      "AI-powered short-form content is dominating social platforms. How brands are using AI to produce TikTok, Reels, and Shorts content at scale without sacrificing quality.",
    type: "article",
    authors: ["David Turk"],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Short-Form, High Impact: How AI Is Powering the Next Wave of Social Content",
    description:
      "AI-powered short-form content is dominating social platforms. How brands are using AI to produce TikTok, Reels, and Shorts content at scale without sacrificing quality.",
  },
  alternates: {
    canonical: "/insights/ai-short-form-content",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
