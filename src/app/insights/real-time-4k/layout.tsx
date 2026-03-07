import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "The AI-Powered Creative Pipeline: VFX, Sound Design, and Content at Machine Speed",
  description:
    "Inside the AI-powered creative pipeline combining VFX, sound design, and content production. How studios are cutting production costs 30-40% while delivering faster than ever.",
  keywords: [
    "AI VFX",
    "AI sound design",
    "creative pipeline automation",
    "AI content production",
    "machine-speed production",
  ],
  openGraph: {
    title:
      "The AI-Powered Creative Pipeline: VFX, Sound Design, and Content at Machine Speed",
    description:
      "Inside the AI-powered creative pipeline combining VFX, sound design, and content production. How studios are cutting production costs 30-40% while delivering faster than ever.",
    type: "article",
    authors: ["David Turk"],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "The AI-Powered Creative Pipeline: VFX, Sound Design, and Content at Machine Speed",
    description:
      "Inside the AI-powered creative pipeline combining VFX, sound design, and content production. How studios are cutting production costs 30-40% while delivering faster than ever.",
  },
  alternates: {
    canonical: "/insights/real-time-4k",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
