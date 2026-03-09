import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | DT+C",
    default: "Insights | DT+C",
  },
  description:
    "Expert perspectives on AI video generation, VFX automation, GEO optimization, AI brand identity, and the future of creative production. Monthly insights from DT+C.",
  openGraph: {
    title: "Insights | DT+C",
    description:
      "Expert perspectives on AI video generation, VFX automation, GEO optimization, AI brand identity, and the future of creative production. Monthly insights from DT+C.",
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
