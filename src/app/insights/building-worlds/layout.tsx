import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Brand in the Age of AI Search: Why GEO Is the New SEO",
  description:
    "Generative Engine Optimization is replacing traditional SEO. Learn why optimizing for AI search engines like ChatGPT and Perplexity is essential for brand visibility in 2026.",
  keywords: [
    "GEO",
    "generative engine optimization",
    "AI search optimization",
    "AI SEO",
    "brand visibility AI",
  ],
  openGraph: {
    title: "Your Brand in the Age of AI Search: Why GEO Is the New SEO",
    description:
      "Generative Engine Optimization is replacing traditional SEO. Learn why optimizing for AI search engines like ChatGPT and Perplexity is essential for brand visibility in 2026.",
    type: "article",
    images: [
      {
        url: "/og/building-worlds.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
      },
    ],
    authors: ["David Turk"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/building-worlds.jpg"],
    title: "Your Brand in the Age of AI Search: Why GEO Is the New SEO",
    description:
      "Generative Engine Optimization is replacing traditional SEO. Learn why optimizing for AI search engines like ChatGPT and Perplexity is essential for brand visibility in 2026.",
  },
  alternates: {
    canonical: "/insights/building-worlds",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
