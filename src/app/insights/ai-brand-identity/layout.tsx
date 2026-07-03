import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "AI-Native Brand Identity: Building Visual Systems That Adapt in Real Time",
  description:
    "Static brand guidelines are dead. How AI-native identity systems let brands scale visual consistency across every touchpoint while adapting in real time.",
  keywords: [
    "AI brand identity",
    "dynamic brand guidelines",
    "AI visual identity",
    "adaptive brand system",
    "AI brand consistency",
  ],
  openGraph: {
    title:
      "AI-Native Brand Identity: Building Visual Systems That Adapt in Real Time",
    description:
      "Static brand guidelines are dead. How AI-native identity systems let brands scale visual consistency across every touchpoint while adapting in real time.",
    type: "article",
    images: [
      {
        url: "/og/ai-brand-identity.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
      },
    ],
    authors: ["David Turk"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/ai-brand-identity.jpg"],
    title:
      "AI-Native Brand Identity: Building Visual Systems That Adapt in Real Time",
    description:
      "Static brand guidelines are dead. How AI-native identity systems let brands scale visual consistency across every touchpoint while adapting in real time.",
  },
  alternates: {
    canonical: "/insights/ai-brand-identity",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
