import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | David Turk Creative",
    default: "Perspectives | David Turk Creative",
  },
  description:
    "Expert perspectives on AI video generation, VFX automation, GEO optimization, AI brand identity, and the future of creative production. Writing by David Turk.",
  openGraph: {
    title: "Perspectives | David Turk Creative",
    description:
      "Expert perspectives on AI video generation, VFX automation, GEO optimization, AI brand identity, and the future of creative production. Writing by David Turk.",
    type: "website",
  },
};

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
