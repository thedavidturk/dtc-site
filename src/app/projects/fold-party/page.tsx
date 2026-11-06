import CaseStudy from "@/components/site/CaseStudy";
import { getWork, projectMetadata } from "@/content/work";
import { resolveMedia, showPreviewNotes } from "@/lib/media";
import { nextProject } from "@/lib/next-project";

export const metadata = projectMetadata("fold-party");

export default function FoldPartyProject() {
  const item = getWork("fold-party")!;

  return (
    <CaseStudy
      item={item}
      media={resolveMedia(item)}
      eyebrow="Original · Game for iPhone & iPad"
      lede="A party-game arcade for one phone."
      meta={[
        { label: "Made by", value: "David Turk Creative" },
        { label: "Platform", value: "iPhone & iPad" },
        { label: "Players", value: "2 to 4" },
        { label: "Built around", value: "The fold on iPhone Duo" },
      ]}
      sections={[
        {
          heading: "The idea",
          body: (
            <p>
              Pass the phone, start the party. Players pick a game from a shelf of boxes, pass one
              phone around, and share a single scoreboard. It&rsquo;s built around the fold on iPhone
              Duo and plays on other iPhones and iPads with on-screen controls.
            </p>
          ),
        },
        {
          heading: "My role",
          note: "Add your role in a sentence (concept, design, development, brand?). This section stays off the live site until it has copy.",
        },
        {
          heading: "What I made",
          body: (
            <p>
              An arcade of quick games, including Hot Potato, Quiz Show, Table Hockey, Double Agent,
              and Pinball, each with its own illustrated box on a video-store shelf under a neon sign.
            </p>
          ),
        },
        {
          heading: "What happened",
          body: <p>Fold Party is live at foldparty.com, and new games keep coming.</p>,
          note: "Add the App Store link and any verified numbers (downloads, ratings) if you want them here.",
        },
      ]}
      links={[{ label: "foldparty.com", href: "https://foldparty.com" }]}
      next={nextProject("fold-party")}
      showNotes={showPreviewNotes}
    />
  );
}
