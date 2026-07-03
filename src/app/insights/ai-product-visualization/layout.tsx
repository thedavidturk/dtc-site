import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "The Death of the Photo Shoot: AI Product Visualization for Modern Brands",
  description:
    "AI product visualization is replacing traditional photo shoots at a fraction of the cost. How brands are generating photorealistic product imagery with AI and 3D pipelines.",
  keywords: [
    "AI product visualization",
    "AI product photography",
    "3D product rendering",
    "AI ecommerce imagery",
    "virtual photography",
  ],
  openGraph: {
    title:
      "The Death of the Photo Shoot: AI Product Visualization for Modern Brands",
    description:
      "AI product visualization is replacing traditional photo shoots at a fraction of the cost. How brands are generating photorealistic product imagery with AI and 3D pipelines.",
    type: "article",
    images: [
      {
        url: "/og/ai-product-visualization.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
      },
    ],
    authors: ["David Turk"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/ai-product-visualization.jpg"],
    title:
      "The Death of the Photo Shoot: AI Product Visualization for Modern Brands",
    description:
      "AI product visualization is replacing traditional photo shoots at a fraction of the cost. How brands are generating photorealistic product imagery with AI and 3D pipelines.",
  },
  alternates: {
    canonical: "/insights/ai-product-visualization",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
