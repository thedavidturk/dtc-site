import { notFound } from "next/navigation";
import CaseStudy from "@/components/site/CaseStudy";
import { getWork, projectMetadata } from "@/content/work";
import { includeDrafts, resolveMedia, showPreviewNotes } from "@/lib/media";
import { nextProject } from "@/lib/next-project";

export const metadata = {
  ...projectMetadata("weinstein-legal-team"),
  // Never index the draft, even on a preview URL.
  robots: { index: false, follow: false },
};

export default function WeinsteinProject() {
  const item = getWork("weinstein-legal-team")!;
  if (item.draft && !includeDrafts) notFound();

  return (
    <CaseStudy
      item={item}
      media={resolveMedia(item)}
      banner="Draft. This page and its homepage card are hidden on the live site until Weinstein Legal Team approves what's shown."
      eyebrow="Client · Creative direction"
      lede="Creative direction across everything a law firm puts in front of people."
      meta={[
        { label: "Client", value: "Weinstein Legal Team" },
        { label: "Role", value: "Creative direction & production" },
        { label: "Engagement", value: "Ongoing retainer" },
        { label: "Industry", value: "Legal" },
      ]}
      sections={[
        {
          heading: "The idea",
          body: (
            <p>
              Treat a law firm like a brand: one voice and one visual thread across every place
              people meet it, from a billboard to a client&rsquo;s phone.
            </p>
          ),
          note: "Draft framing. Rewrite in your words.",
        },
        {
          heading: "My role",
          body: <p>Creative direction and production across film, design, out-of-home, social, and web.</p>,
        },
        {
          heading: "What I made",
          body: (
            <ul className="space-y-3">
              <li>Straight Talk, a criminal-defense video series</li>
              <li>A billboard campaign in Orlando with Clear Channel</li>
              <li>Paid video ads in English and Portuguese</li>
              <li>A weekly social content system</li>
              <li>RoadToSettlement.com, a nine-step guide to the client journey</li>
              <li>Branded merch</li>
            </ul>
          ),
          note: "Pick the strongest approved pieces for the stills below; this should read as one thread, not an archive.",
        },
        {
          heading: "What happened",
          note: "Add outcomes only if they're verified and the firm is happy to share them.",
        },
      ]}
      next={nextProject("weinstein-legal-team")}
      showNotes={showPreviewNotes}
    />
  );
}
