import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | David Turk Creative",
    default: "Work | David Turk Creative",
  },
  description:
    "Case studies from David Turk Creative: creative direction, film, 3D, VFX, and AI for brands and original stories.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
