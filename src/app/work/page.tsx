import type { Metadata } from "next";
import WorkGrid from "@/components/site/WorkGrid";
import ContactCta from "@/components/site/ContactCta";
import { DISCIPLINE_FILTERS } from "@/content/work";
import { resolveMedia, showPreviewNotes, visibleWork } from "@/lib/media";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Every project from David Turk Creative: brand campaigns, film, 3D, VFX, and original work.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const entries = visibleWork().map((item) => ({ item, media: resolveMedia(item) }));

  return (
    <>
      <section className="section-container pb-20 pt-36 md:pb-28 md:pt-44">
        <p className="text-[17px] font-normal uppercase tracking-[0.02em] text-fog-blue">Work</p>
        <h1 className="mt-6 max-w-[16ch] font-anton text-display-sm uppercase tracking-normal text-bone h1-paint-in">
          Client work and original stories
        </h1>
        <div className="mt-16">
          <WorkGrid entries={entries} filters={DISCIPLINE_FILTERS} showNotes={showPreviewNotes} />
        </div>
      </section>
      <ContactCta />
    </>
  );
}
