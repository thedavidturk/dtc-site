import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | DT+C",
    default: "Insights | DT+C",
  },
  description:
    "Thoughts on AI-driven production, creative technology, and the future of brand content.",
  openGraph: {
    title: "Insights | DT+C",
    description:
      "Thoughts on AI-driven production, creative technology, and the future of brand content.",
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
