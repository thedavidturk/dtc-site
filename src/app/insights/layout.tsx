import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | TURKS",
    default: "Insights | TURKS",
  },
  description:
    "Thoughts on virtual production, real-time rendering, and the future of creative content.",
  openGraph: {
    title: "Insights | TURKS",
    description:
      "Thoughts on virtual production, real-time rendering, and the future of creative content.",
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
