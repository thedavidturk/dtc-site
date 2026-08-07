import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Taste Is the Bottleneck: Creative Direction in the Slop Flood",
  openGraph: {
    title: "Taste Is the Bottleneck: Creative Direction in the Slop Flood",
    type: "article",
  },
};

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
