import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have something in mind? Tell David Turk about your project. Replies within 24 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <Contact />;
}
