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
        { label: "Launched", value: "October 23, 2026" },
      ]}
      sections={[
        {
          heading: "The idea",
          body: (
            <p>
              Pass the phone, start the party. Pick a game&rsquo;s box off a lit video-store shelf,
              pass the phone around, and a game-show host calls the action while one scoreboard
              keeps score for the whole room. It&rsquo;s built around the fold on iPhone Duo and plays
              on any iPhone or iPad.
            </p>
          ),
        },
        {
          heading: "My role",
          body: (
            <p>
              I created Fold Party through David Turk Creative: the concept, the games, the look, and
              the app.
            </p>
          ),
          note: "Check this line says exactly what you did.",
        },
        {
          heading: "What I made",
          body: (
            <p>
              Sixteen games at launch on four aisles, from Hot Potato and Quiz Show to a 1983
              roller-rink pinball table and a heist through a hall of lasers. On iPhone Duo every fold
              has its own games: close it for Hot Potato, open it like a laptop for Quiz Show, lay it
              flat for Table Hockey.
            </p>
          ),
        },
        {
          heading: "What happened",
          body: (
            <p>
              Fold Party launched on the App Store on October 23, 2026. New packs of four games
              arrive in app updates.
            </p>
          ),
          note: "Add downloads or ratings here only if you want them public (verified numbers only).",
        },
      ]}
      links={[
        { label: "App Store", href: "https://apps.apple.com/app/id6820737260" },
        { label: "foldparty.com", href: "https://foldparty.com" },
      ]}
      next={nextProject("fold-party")}
      showNotes={showPreviewNotes}
    />
  );
}
