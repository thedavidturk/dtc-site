import type { Metadata } from "next";
import Link from "@/components/TransitionLink";
import FAQ from "@/components/FAQ";
import ClientRow from "@/components/site/ClientRow";
import ContactCta from "@/components/site/ContactCta";
import PreviewNote from "@/components/site/PreviewNote";
import Reveal from "@/components/site/Reveal";
import { capabilities, site } from "@/content/work";
import { showPreviewNotes } from "@/lib/media";

export const metadata: Metadata = {
  title: "About",
  description:
    "David Turk is a Miami creative director. Through David Turk Creative, he develops ideas and brings them to life through film, 3D, AI, and visual storytelling.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="section-container pb-20 pt-36 md:pb-28 md:pt-44">
        <p className="text-[17px] font-normal uppercase tracking-[0.02em] text-fog-blue">About</p>
        <h1 className="mt-6 font-anton text-display-sm uppercase tracking-normal text-bone h1-paint-in">
          I&rsquo;m {site.person}.
        </h1>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="space-y-7 lg:col-span-7">
            <p className="font-body text-body-lg font-normal text-bone">
              Through {site.studio}, I develop ideas and bring them to life through film,
              3D, and visual storytelling, for brands and for stories of my own.
            </p>
            <p className="font-body text-body-sm font-normal text-fog-blue">
              I&rsquo;m based in Miami and started the studio in 2022. Before that I worked in
              advertising, including at Crispin Porter. Today I make campaigns for brands
              like New Era Cap and SeaWorld, and make original work like 2062, a sci-fi series
              made with AI.
            </p>
            <p className="font-body text-body-sm font-normal text-fog-blue">
              I use AI where it makes the work better, not just faster or cheaper, and I say so
              when it&rsquo;s in the frame.
            </p>
            <PreviewNote show={showPreviewNotes}>
              Check the bio line about Crispin Porter (title and years would make it stronger).
            </PreviewNote>
          </div>
        </div>
      </section>

      {/* Capabilities: one line each */}
      <section className="border-t border-ash-border section-padding">
        <div className="section-container grid grid-cols-1 gap-10 lg:grid-cols-12">
          <p className="text-[17px] font-normal uppercase tracking-[0.02em] text-fog-blue lg:col-span-3">
            What I do
          </p>
          <Reveal className="lg:col-span-9">
            <ul className="border-t border-ash-border">
              {capabilities.map((capability) => (
                <li
                  key={capability.name}
                  className="grid grid-cols-1 gap-2 border-b border-ash-border py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-10"
                >
                  <h2 className="font-body text-heading-sm font-normal text-bone">{capability.name}</h2>
                  <p className="font-body text-body-sm font-normal text-fog-blue">{capability.line}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <ClientRow />

      {/* Writing */}
      <section className="border-t border-ash-border section-padding">
        <div className="section-container grid grid-cols-1 gap-10 lg:grid-cols-12">
          <p className="text-[17px] font-normal uppercase tracking-[0.02em] text-fog-blue lg:col-span-3">
            Writing
          </p>
          <div className="lg:col-span-9">
            <p className="max-w-[30ch] font-body text-heading-sm font-normal text-bone">
              Notes on AI-driven production, creative technology, and where brand content is
              going.
            </p>
            <Link
              href="/insights"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-normal uppercase tracking-[0.02em] text-bone transition-colors duration-500 ease-prism hover:text-fog-blue"
            >
              Read Perspectives
              <span aria-hidden="true" className="transition-transform duration-500 ease-prism group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      <div className="border-t border-ash-border">
        <FAQ />
      </div>

      <ContactCta />
    </>
  );
}
