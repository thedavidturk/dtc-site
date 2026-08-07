import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Campaign You Can Walk Through: World Models Turn Brand Films Into Places",
  openGraph: {
    title: "The Campaign You Can Walk Through: World Models Turn Brand Films Into Places",
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
