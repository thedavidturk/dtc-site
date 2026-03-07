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
    authors: ["David Turk"],
  },
  twitter: {
    card: "summary_large_image",
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
