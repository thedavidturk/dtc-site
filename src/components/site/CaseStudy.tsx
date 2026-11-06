import Image from "next/image";
import Link from "@/components/TransitionLink";
import AutoplayVideo from "@/components/AutoplayVideo";
import type { WorkItem } from "@/content/work";
import type { ResolvedMedia } from "@/lib/media";
import ContactCta from "./ContactCta";
import MediaPlaceholder from "./MediaPlaceholder";
import PreviewNote from "./PreviewNote";
import Reveal from "./Reveal";

export interface CaseSection {
  heading: string;
  body?: React.ReactNode;
  /** Shown on previews when the section still needs input. */
  note?: string;
}

/**
 * The lean case-study template: what was the idea, what was my role,
 * what did I make, what happened. Sections without verified content are
 * left off the live site; previews show what's missing.
 */
export default function CaseStudy({
  item,
  media,
  eyebrow,
  lede,
  meta,
  notice,
  sections,
  links = [],
  next,
  showNotes,
  banner,
}: {
  item: WorkItem;
  media: ResolvedMedia;
  eyebrow: string;
  lede: string;
  meta: { label: string; value: string }[];
  notice?: React.ReactNode;
  sections: CaseSection[];
  links?: { label: string; href: string }[];
  next: WorkItem;
  showNotes: boolean;
  banner?: string;
}) {
  const heroStill = media.heroStill ?? media.still;
  const heroLoop = media.heroLoop ?? media.loop;
  const dir = item.mediaDir ?? item.slug;

  return (
    <article>
      {/* Opener */}
      <header className="section-container pb-14 pt-36 md:pb-20 md:pt-44">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-caption font-normal uppercase tracking-[0.02em] text-bone transition-colors duration-500 ease-prism hover:text-fog-blue"
        >
          <span aria-hidden="true" className="transition-transform duration-500 ease-prism group-hover:-translate-x-1">
            &larr;
          </span>
          All work
        </Link>

        {banner && (
          <div className="mt-8">
            <PreviewNote show={showNotes}>{banner}</PreviewNote>
          </div>
        )}

        <p className="mt-14 text-[17px] font-normal uppercase tracking-[0.02em] text-fog-blue">
          {eyebrow}
        </p>
        <h1 className="mt-6 font-anton text-display-sm uppercase tracking-normal text-bone h1-paint-in">
          {item.title}
        </h1>
        <p className="mt-6 max-w-[40ch] font-body text-body-lg font-normal text-bone">{lede}</p>

        <dl className="mt-14 grid grid-cols-2 gap-x-10 gap-y-8 border-b border-ash-border pb-8 md:grid-cols-4">
          {meta.map((entry) => (
            <div key={entry.label}>
              <dt className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue">
                {entry.label}
              </dt>
              <dd className="mt-1 font-body text-body font-normal text-bone">{entry.value}</dd>
            </div>
          ))}
        </dl>

        {notice && (
          <p className="mt-6 flex max-w-[640px] items-start gap-3 font-body text-body-sm font-normal text-fog-blue">
            <span aria-hidden="true" className="mt-[0.55em] block h-1.5 w-1.5 shrink-0 bg-bone" />
            <span>{notice}</span>
          </p>
        )}
      </header>

      {/* Lead media */}
      <section className="section-container pb-20 md:pb-28">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-[#161616] md:aspect-video">
          {heroLoop ? (
            <AutoplayVideo
              src={heroLoop}
              poster={heroStill}
              aria-label={`${item.client} in motion`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : heroStill ? (
            <Image
              src={heroStill}
              alt={`${item.client}: lead image`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <MediaPlaceholder
              title={item.client}
              showNote={showNotes}
              large
              note={`Add public/work/${dir}/hero.jpg (and hero.mp4 for motion).`}
            />
          )}
        </div>
      </section>

      {/* The four questions */}
      {sections.map((section) => {
        if (!section.body && !(showNotes && section.note)) return null;
        return (
          <section key={section.heading} className="border-t border-ash-border py-14 md:py-20">
            <div className="section-container grid grid-cols-1 gap-8 lg:grid-cols-12">
              <h2 className="text-[17px] font-normal uppercase tracking-[0.02em] text-fog-blue lg:col-span-3">
                {section.heading}
              </h2>
              <Reveal className="max-w-[680px] space-y-6 font-body text-body-lg font-normal text-bone lg:col-span-9">
                {section.body}
                {section.note && <PreviewNote show={showNotes}>{section.note}</PreviewNote>}
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* The film itself, at its native shape, with controls */}
      {media.film && (
        <section className="border-t border-ash-border section-padding">
          <div className="section-container grid grid-cols-1 gap-8 lg:grid-cols-12">
            <h2 className="text-[17px] font-normal uppercase tracking-[0.02em] text-fog-blue lg:col-span-3">
              Watch
            </h2>
            <div className="lg:col-span-9">
              <div
                className={`relative mx-auto overflow-hidden rounded-card bg-[#161616] lg:mx-0 ${
                  item.galleryAspect === "aspect-[4/5]" ? "aspect-[4/5] max-w-[560px]" : "aspect-video"
                }`}
              >
                <video
                  src={media.film}
                  poster={media.filmPoster}
                  controls
                  playsInline
                  preload="none"
                  className="absolute inset-0 h-full w-full object-cover"
                  aria-label={`${item.client}, full film`}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stills */}
      {(media.gallery.length > 0 || showNotes) && (
        <section className="border-t border-ash-border section-padding">
          <div className="section-container">
            <p className="mb-10 text-[17px] font-normal uppercase tracking-[0.02em] text-fog-blue">
              Stills
            </p>
            {media.gallery.length > 0 && item.galleryAspect ? (
              <div
                className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${
                  item.galleryAspect === "aspect-[4/5]" ? "lg:grid-cols-3" : ""
                }`}
              >
                {media.gallery.map((src, i) => (
                  <div
                    key={src}
                    className={`relative overflow-hidden rounded-card bg-[#161616] ${item.galleryAspect}`}
                  >
                    <Image
                      src={src}
                      alt={`${item.client}: still ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : media.gallery.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {media.gallery.map((src, i) => (
                  <div
                    key={src}
                    className={`relative overflow-hidden rounded-card bg-[#161616] ${
                      i % 3 === 0 ? "aspect-video md:col-span-2" : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${item.client}: still ${i + 1}`}
                      fill
                      sizes={i % 3 === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <PreviewNote show={showNotes}>
                Drop stills into public/work/{dir}/gallery/ (01.jpg, 02.jpg, &hellip;) and they
                appear here in order.
              </PreviewNote>
            )}
          </div>
        </section>
      )}

      {/* Links */}
      {links.length > 0 && (
        <section className="border-t border-ash-border">
          <div className="section-container flex flex-wrap gap-x-10 gap-y-4 py-10">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-normal uppercase tracking-[0.02em] text-bone transition-colors duration-500 ease-prism hover:text-fog-blue"
              >
                {link.label} &#8599;
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Next project */}
      <section className="border-t border-ash-border">
        <div className="section-container py-14 md:py-20">
          <Link href={next.href} className="group block">
            <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue">
              Next project
            </p>
            <p className="mt-3 flex items-center gap-4 font-body text-heading-lg font-normal text-bone transition-colors duration-500 ease-prism group-hover:text-fog-blue">
              {next.client}
              <span aria-hidden="true" className="transition-transform duration-500 ease-prism group-hover:translate-x-2">
                &rarr;
              </span>
            </p>
          </Link>
        </div>
      </section>

      <ContactCta />
    </article>
  );
}
