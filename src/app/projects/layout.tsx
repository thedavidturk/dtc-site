import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | DT+C",
    default: "Projects | DT+C",
  },
  description:
    "Explore our portfolio of 3D animation, virtual world cinematics, and motion design work for forward-thinking brands.",
  openGraph: {
    title: "Projects | DT+C",
    description:
      "Explore our portfolio of 3D animation, virtual world cinematics, and motion design work for forward-thinking brands.",
    type: "website",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
