import CaseStudy from "@/components/site/CaseStudy";
import { getWork, projectMetadata } from "@/content/work";
import { resolveMedia, showPreviewNotes } from "@/lib/media";
import { nextProject } from "@/lib/next-project";

export const metadata = projectMetadata("2062");

export default function Project2062() {
  const item = getWork("2062")!;

  return (
    <CaseStudy
      item={item}
      media={resolveMedia(item)}
      eyebrow="Original · AI film series"
      lede="An original sci-fi series set in a post-apocalyptic Miami."
      meta={[
        { label: "Role", value: "Creator & director" },
        { label: "Format", value: "Short-form series" },
        { label: "Made with", value: "AI video (Seedance 2.5)" },
        { label: "Home", value: "Instagram" },
      ]}
      notice="Made with AI. Every frame of 2062 is generated with AI video tools and directed shot by shot."
      sections={[
        {
          heading: "The idea",
          body: (
            <p>
              On Day Zero, aliens take over the technology people live with. 2062 follows what&rsquo;s
              left of Miami through two characters: a domestic robot and a six-year-old girl.
            </p>
          ),
        },
        {
          heading: "My role",
          body: (
            <p>
              I created and direct the series: the story, the world, its characters, and every shot.
              Each scene is planned like a shoot, with character reference sheets and timed,
              shot-by-shot direction.
            </p>
          ),
        },
        {
          heading: "What I made",
          body: (
            <p>
              A look borrowed from combat reportage: bleach-bypass color, cold teal-grey shadows,
              handheld framing, rain, haze, and heavy grain. Flooded streets, abandoned Art Deco
              buildings, and the day the machines arrived.
            </p>
          ),
        },
        {
          heading: "What happened",
          body: <p>The series continues on Instagram.</p>,
          note: "Add the verified view count for the 2062 short (you've cited about 6M) and a link to the post.",
        },
      ]}
      next={nextProject("2062")}
      showNotes={showPreviewNotes}
    />
  );
}
