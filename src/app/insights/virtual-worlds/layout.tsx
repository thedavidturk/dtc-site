import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Video Generation Is Replacing Traditional Production Pipelines",
  description:
    "How AI video generation tools are reshaping content production, cutting costs by 60-80%, and why creative studios are rebuilding their pipelines around machine-speed workflows.",
  keywords: [
    "AI video generation",
    "AI production pipeline",
    "video content automation",
    "AI filmmaking",
    "generative video",
  ],
  openGraph: {
    title: "AI Video Generation Is Replacing Traditional Production Pipelines",
    description:
      "How AI video generation tools are reshaping content production, cutting costs by 60-80%, and why creative studios are rebuilding their pipelines around machine-speed workflows.",
    type: "article",
    images: [
      {
        url: "/og/virtual-worlds.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
      },
    ],
    authors: ["David Turk"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/virtual-worlds.jpg"],
    title: "AI Video Generation Is Replacing Traditional Production Pipelines",
    description:
      "How AI video generation tools are reshaping content production, cutting costs by 60-80%, and why creative studios are rebuilding their pipelines around machine-speed workflows.",
  },
  alternates: {
    canonical: "/insights/virtual-worlds",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
