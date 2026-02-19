import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | DT+C",
    default: "Insights | DT+C",
  },
  description:
    "Thoughts on virtual production, real-time rendering, and the future of creative content.",
  openGraph: {
    title: "Insights | DT+C",
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
