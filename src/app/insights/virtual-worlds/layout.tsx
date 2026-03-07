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
    authors: ["David Turk"],
  },
  twitter: {
    card: "summary_large_image",
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
