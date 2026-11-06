import Link from "@/components/TransitionLink";
import HomeHero from "@/components/site/HomeHero";
import WorkCard from "@/components/site/WorkCard";
import Reveal from "@/components/site/Reveal";
import ClientRow from "@/components/site/ClientRow";
import ContactCta from "@/components/site/ContactCta";
import {
  FLAGSHIP_SLUG,
  HERO_SLUG,
  SELECTED_SLUGS,
  capabilities,
  getWork,
  site,
} from "@/content/work";
import { resolveMedia, showPreviewNotes, visibleBySlug } from "@/lib/media";

/* Two-up rows alternate wide/narrow so the grid has a rhythm; widths
   and aspect ratios are paired so both cards in a row share a height.
   A leftover single closes the section full width. */
type Slot = { span: string; aspect: string; sizes: string; size: "lg" | "md" };
const WIDE: Slot = {
  span: "lg:col-span-7",
  aspect: "aspect-[4/3] lg:aspect-[16/10]",
  sizes: "(max-width: 1024px) 100vw, 58vw",
  size: "md",
};
const NARROW: Slot = {
  span: "lg:col-span-5",
  aspect: "aspect-[4/3] lg:aspect-[9/8]",
  sizes: "(max-width: 1024px) 100vw, 42vw",
  size: "md",
};
const FULL: Slot = {
  span: "lg:col-span-12",
  aspect: "aspect-[4/3] md:aspect-[21/9]",
  sizes: "100vw",
  size: "md",
};

function slotsFor(count: number): Slot[] {
  const slots: Slot[] = [];
  for (let i = 0; i < count; i += 2) {
    const remaining = count - i;
    if (remaining === 1) {
      slots.push(FULL);
    } else {
      const row = (i / 2) % 2 === 0 ? [WIDE, NARROW] : [NARROW, WIDE];
      slots.push(...row);
    }
  }
  return slots;
}

export default function Home() {
  const heroItem = getWork(HERO_SLUG)!;
  const heroMedia = resolveMedia(heroItem);
  const flagship = getWork(FLAGSHIP_SLUG)!;
  const selected = visibleBySlug(SELECTED_SLUGS);
  const slots = slotsFor(selected.length);

  return (
    <>
      <HomeHero
        still={heroMedia.heroStill}
        loop={heroMedia.heroLoop}
        projectHref={heroItem.href}
        projectLabel={`${heroItem.client} · ${heroItem.kind === "original" ? "Original " : ""}${heroItem.label}`}
        showNotes={showPreviewNotes}
      />

      {/* Selected work: the flagship, then five more */}
      <section id="work" className="scroll-mt-20 section-padding">
        {/* Old links to /#projects still land here */}
        <span id="projects" aria-hidden="true" className="block scroll-mt-24" />
        <div className="section-container">
          <div className="mb-10 flex items-baseline justify-between gap-6 md:mb-14">
            <p className="text-[17px] font-normal uppercase tracking-[0.02em] text-fog-blue">
              Selected work
            </p>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-sm font-normal uppercase tracking-[0.02em] text-bone transition-colors duration-500 ease-prism hover:text-fog-blue"
            >
              All work
              <span aria-hidden="true" className="transition-transform duration-500 ease-prism group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>

          <Reveal>
            <WorkCard
              item={flagship}
              media={resolveMedia(flagship)}
              aspect="aspect-[4/3] md:aspect-[21/9]"
              sizes="100vw"
              size="lg"
              priority={false}
              showNotes={showPreviewNotes}
            />
          </Reveal>

          <div className="mt-20 grid grid-cols-1 gap-x-6 gap-y-16 md:mt-28 lg:grid-cols-12 lg:gap-y-24">
            {selected.map((item, i) => {
              const slot = slots[i];
              return (
                <Reveal key={item.slug} className={slot.span} delay={i % 2 === 1 ? 0.08 : 0}>
                  <WorkCard
                    item={item}
                    media={resolveMedia(item)}
                    aspect={slot.aspect}
                    sizes={slot.sizes}
                    size={slot.size}
                    showNotes={showPreviewNotes}
                  />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <ClientRow />

      {/* Brief intro + one line of capabilities */}
      <section className="border-t border-ash-border section-padding">
        <div className="section-container grid grid-cols-1 gap-10 lg:grid-cols-12">
          <p className="text-[17px] font-normal uppercase tracking-[0.02em] text-fog-blue lg:col-span-3">
            About
          </p>
          <Reveal className="lg:col-span-9">
            <p className="max-w-[24ch] font-body text-heading-lg font-normal text-bone">
              {site.intro}
            </p>
            <ul className="mt-10 flex flex-wrap gap-x-3 gap-y-1 font-body text-sm font-normal uppercase leading-[1.8] tracking-[0.02em] text-fog-blue">
              {capabilities.map((capability, i) => (
                <li key={capability.name} className="whitespace-nowrap">
                  {capability.name}
                  {i < capabilities.length - 1 && (
                    <span aria-hidden="true" className="pl-3">
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="group mt-10 inline-flex items-center gap-2 text-sm font-normal uppercase tracking-[0.02em] text-bone transition-colors duration-500 ease-prism hover:text-fog-blue"
            >
              More about me
              <span aria-hidden="true" className="transition-transform duration-500 ease-prism group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
