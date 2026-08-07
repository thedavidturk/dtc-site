import type { Metadata } from "next";

// No OG asset exists for this slug yet; images are intentionally omitted.
// Run scripts/write-og-layouts.mjs after adding it to scripts/og-articles.mjs.
export const metadata: Metadata = {
  title: "One Brief, a Thousand Variants: Creative Ops in the Agent Era",
  openGraph: {
    title: "One Brief, a Thousand Variants: Creative Ops in the Agent Era",
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
