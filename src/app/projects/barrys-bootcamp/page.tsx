"use client";

import Link from "@/components/TransitionLink";
import { m } from "framer-motion";
import LineReveal from "@/components/LineReveal";
import AutoplayVideo from "@/components/AutoplayVideo";

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

const prismEase = [0.52, 0.01, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: prismEase },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: prismEase },
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const overview = {
  client: "Barry's",
  industry: "Fitness / Content",
  timeline: "Ongoing",
  services: [
    "Social Content",
    "Motion Design",
    "Art Direction",
    "Animated Graphics",
    "Brand Storytelling",
  ],
};

const approach = [
  {
    step: "01",
    title: "Brand Immersion",
    description:
      "Got inside the Barry's experience: the Red Room, the intervals, the soundtrack, the community. The work had to carry the same intensity in a feed that it does on the treadmill and the floor.",
  },
  {
    step: "02",
    title: "Content System",
    description:
      "Built a repeatable system of animated graphics and motion templates that could flex across promotions, class formats, and seasonal moments while staying unmistakably Barry's.",
  },
  {
    step: "03",
    title: "Motion & Animation",
    description:
      "Designed looping animated pieces tuned for social feeds, where the first frame stops the scroll and the loop keeps the energy moving. Type, color, and pace all built to match the brand's tempo.",
  },
  {
    step: "04",
    title: "Art Direction",
    description:
      "Set the look across the campaign so every asset felt like part of one voice: bold, high-contrast, and built for the screen it lives on.",
  },
  {
    step: "05",
    title: "Delivery & Rollout",
    description:
      "Packaged the assets for fast rollout across the brand's social channels, sized and formatted for the platforms where the audience actually shows up.",
  },
];

/* Result statement assembled verbatim from the Solution copy above --
   no new claims. Lead line reads large; supporting lines back it up. */
const results = {
  lead: "The content carried the studio feeling into the places where the audience lives.",
  supporting: [
    "A system of animated graphics and motion templates, built to flex across promotions, class formats, and seasonal moments while staying unmistakably Barry's",
    "A first frame that stops the scroll, and motion that keeps the energy going",
    "Packaged for fast rollout and sized for every platform",
  ],
};

const tools = [
  {
    name: "Motion Design",
    description:
      "Animated graphics and looping pieces built for social feeds, designed to stop the scroll and hold attention.",
  },
  {
    name: "Art Direction",
    description:
      "A consistent visual voice across the campaign: bold type, high contrast, and a tempo that matches the brand.",
  },
  {
    name: "Social Content",
    description:
      "A flexible content system sized and formatted for the platforms where the audience lives.",
  },
  {
    name: "Brand Storytelling",
    description:
      "Translating the in-studio energy of Barry's into content that carries the same intensity online.",
  },
];

/* Gallery loops: self-hosted MP4s with poster stills. */
const galleryClips = [
  {
    src: "/motion/barrys-1.mp4",
    poster: "/motion/barrys-1.jpg",
    ariaLabel: "Barry's Bootcamp animated social graphic",
    discipline: "Animated Graphics",
    aspect: "aspect-[16/10]",
  },
  {
    src: "/motion/barrys-2.mp4",
    poster: "/motion/barrys-2.jpg",
    ariaLabel: "Barry's Bootcamp motion piece",
    discipline: "Motion Design",
    aspect: "aspect-[16/10]",
  },
  {
    src: "/motion/barrys-3.mp4",
    poster: "/motion/barrys-3.jpg",
    ariaLabel: "Barry's Bootcamp animated graphic",
    discipline: "Animated Graphics",
    aspect: "aspect-[16/9]",
  },
  {
    src: "/motion/barrys-4.mp4",
    poster: "/motion/barrys-4.jpg",
    ariaLabel: "Barry's Bootcamp social loop",
    discipline: "Social Content",
    aspect: "aspect-[16/9]",
  },
];

/* ------------------------------------------------------------------ */
/*  Local pieces                                                       */
/* ------------------------------------------------------------------ */

/** Full-width hairline rule between bands. */
function Rule() {
  return (
    <div className="section-container">
      <div className="border-t border-ash-border" />
    </div>
  );
}

/** Uppercase fog-blue metadata label. */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue">
      {children}
    </p>
  );
}

/** Caption below a media card: fog-blue label + bone value. */
function PlateCaption({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-4 flex flex-col gap-1">
      <Label>{label}</Label>
      <p className="font-body text-caption font-normal text-bone">{value}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BarrysBootcampProject() {
  return (
    <article className="bg-obsidian min-h-screen">
      {/* ── Opener ────────────────────────────────────────────────── */}
      <header className="section-container pt-32 md:pt-40 pb-16 md:pb-24">
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: prismEase }}
        >
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-caption uppercase tracking-[0.02em] font-normal text-bone hover:text-fog-blue transition-colors duration-500 ease-prism"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            Back to Work
          </Link>
        </m.div>

        <div className="mt-16 md:mt-24">
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: prismEase }}
            className="text-[17px] uppercase tracking-[0.02em] font-normal text-fog-blue mb-8"
          >
            Fitness + Content
          </m.p>

          <h1 className="font-headline font-normal text-bone text-display-sm">
            <LineReveal delay={0.25}>BARRY&rsquo;S</LineReveal>
            <LineReveal delay={0.35}>BOOTCAMP</LineReveal>
          </h1>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: prismEase }}
            className="mt-8 font-body text-body-lg font-normal text-bone"
          >
            Studio Energy, Built for the Feed
          </m.p>
        </div>

        {/* Metadata row */}
        <m.dl
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.65 }}
          className="mt-16 md:mt-24 border-t border-ash-border pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <div>
            <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
              Client
            </dt>
            <dd className="font-body font-normal text-bone">
              {overview.client}
            </dd>
          </div>
          <div>
            <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
              Industry
            </dt>
            <dd className="font-body font-normal text-bone">
              {overview.industry}
            </dd>
          </div>
          <div>
            <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
              Timeline
            </dt>
            <dd className="font-body font-normal text-bone">
              {overview.timeline}
            </dd>
          </div>
          <div>
            <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
              Services
            </dt>
            <dd>
              <ul className="space-y-1.5">
                {overview.services.map((service) => (
                  <li
                    key={service}
                    className="font-body text-caption font-normal text-bone"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </m.dl>

        {/* Hero media card */}
        <m.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 md:mt-24"
        >
          <div className="rounded-[15px] overflow-hidden border border-ash-border">
            <AutoplayVideo
              src="/motion/barrys.mp4"
              poster="/motion/barrys.jpg"
              aria-label="Barry's Bootcamp content"
              className="w-full aspect-video object-cover"
            />
          </div>
          <figcaption>
            <PlateCaption label="In Motion" value="The Energy, Moving" />
          </figcaption>
        </m.figure>
      </header>

      <Rule />

      {/* ── The Challenge ─────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[640px]"
        >
          <Label>The Challenge</Label>
          <h2 className="mt-4 font-headline text-heading-lg font-normal text-bone mb-10">
            Studio intensity, on a small screen
          </h2>
          <div className="font-body text-body-sm font-normal text-bone space-y-7">
            <p>
              Barry&rsquo;s built its name on a feeling: the Red Room, the
              intervals, the music, and a community that keeps coming back. The
              challenge was carrying that same intensity into a social feed,
              where attention is short and the first frame decides whether
              anyone keeps watching.
            </p>
            <p>
              The work needed to feel like Barry&rsquo;s at a glance, scroll
              after scroll. That meant a content approach that could move fast,
              stay consistent, and translate in-studio energy into motion built
              for the platforms where the audience actually spends time.
            </p>
          </div>
        </m.div>
      </section>

      <Rule />

      {/* ── Our Approach ──────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 md:mb-24"
        >
          <Label>Our Approach</Label>
          <h2 className="mt-4 font-headline text-heading-lg font-normal text-bone">
            From studio floor to feed
          </h2>
        </m.div>

        <ol className="max-w-[720px]">
          {approach.map((item, i) => (
            <m.li
              key={item.step}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className={`py-12 md:py-16 ${
                i > 0 ? "border-t border-ash-border" : ""
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                <span
                  aria-hidden="true"
                  className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue shrink-0 pt-2"
                >
                  {item.step}
                </span>
                <div className="max-w-[640px]">
                  <h3 className="font-headline text-heading-sm font-normal text-bone mb-4">
                    {item.title}
                  </h3>
                  <p className="font-body text-body-sm font-normal text-fog-blue">
                    {item.description}
                  </p>
                </div>
              </div>
            </m.li>
          ))}
        </ol>
      </section>

      <Rule />

      {/* ── The Solution ─────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[640px]"
        >
          <Label>The Solution</Label>
          <h2 className="mt-4 font-headline text-heading-lg font-normal text-bone mb-10">
            A motion system that moves like the brand
          </h2>
          <div className="font-body text-body-sm font-normal text-bone space-y-7">
            <p>
              The answer was a system of animated graphics and motion templates,
              built to flex across promotions, class formats, and seasonal
              moments while staying unmistakably Barry&rsquo;s. Bold type, high
              contrast, and a pace tuned to the brand&rsquo;s tempo gave every
              piece the same charge.
            </p>
            <p>
              Each loop was designed for the feed first: a first frame that stops
              the scroll, and motion that keeps the energy going. Packaged for
              fast rollout and sized for every platform, the content carried the
              studio feeling into the places where the audience lives.
            </p>
          </div>
        </m.div>
      </section>

      <Rule />

      {/* ── Content Gallery ──────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 md:mb-24"
        >
          <Label>Content Gallery</Label>
          <h2 className="mt-4 font-headline text-heading-lg font-normal text-bone">
            Animated graphics & social motion
          </h2>
        </m.div>

        <div className="space-y-16 md:space-y-24">
          {/* Two genuine pairs of loops */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {galleryClips.slice(0, 2).map((clip) => (
              <m.figure
                key={clip.src}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                <div className="rounded-[15px] overflow-hidden border border-ash-border">
                  <AutoplayVideo
                    src={clip.src}
                    poster={clip.poster}
                    aria-label={clip.ariaLabel}
                    className={`w-full ${clip.aspect} object-cover`}
                  />
                </div>
                <figcaption>
                  <PlateCaption label={clip.discipline} value={overview.client} />
                </figcaption>
              </m.figure>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {galleryClips.slice(2, 4).map((clip) => (
              <m.figure
                key={clip.src}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                <div className="rounded-[15px] overflow-hidden border border-ash-border">
                  <AutoplayVideo
                    src={clip.src}
                    poster={clip.poster}
                    aria-label={clip.ariaLabel}
                    className={`w-full ${clip.aspect} object-cover`}
                  />
                </div>
                <figcaption>
                  <PlateCaption label={clip.discipline} value={overview.client} />
                </figcaption>
              </m.figure>
            ))}
          </div>

          {/* Full-width hero loop */}
          <m.figure
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="rounded-[15px] overflow-hidden border border-ash-border">
              <AutoplayVideo
                src="/motion/barrys-5.mp4"
                poster="/motion/barrys-5.jpg"
                aria-label="Barry's Bootcamp social motion piece"
                className="w-full aspect-[21/9] object-cover"
              />
            </div>
            <figcaption>
              <PlateCaption label="Motion Design" value={overview.client} />
            </figcaption>
          </m.figure>
        </div>
      </section>

      <Rule />

      {/* ── The Result ───────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 md:mb-24"
        >
          <Label>The Result</Label>
          <h2 className="mt-4 font-headline text-heading-lg font-normal text-bone">
            Studio energy, built for the feed
          </h2>
        </m.div>

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[720px]"
        >
          {/* Lead result statement */}
          <p className="font-headline text-heading-sm font-normal text-bone mb-14">
            {results.lead}
          </p>

          {/* TODO(David): add quantified result or client quote here */}

          <ul className="max-w-[640px]">
            {results.supporting.map((result, i) => (
              <li
                key={result}
                className={`py-6 font-body text-body-sm font-normal text-fog-blue ${
                  i > 0 ? "border-t border-ash-border" : ""
                }`}
              >
                {result}
              </li>
            ))}
          </ul>
        </m.div>
      </section>

      <Rule />

      {/* ── Capabilities ──────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 md:mb-24"
        >
          <Label>Capabilities</Label>
          <h2 className="mt-4 font-headline text-heading-lg font-normal text-bone">
            The content toolkit
          </h2>
        </m.div>

        <div className="max-w-[720px]">
          {tools.map((tool, i) => (
            <m.div
              key={tool.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className={`py-10 md:py-12 ${
                i > 0 ? "border-t border-ash-border" : ""
              }`}
            >
              <h3 className="font-headline text-heading-sm font-normal text-bone mb-3">
                {tool.name}
              </h3>
              <p className="font-body text-body-sm font-normal text-fog-blue max-w-[640px]">
                {tool.description}
              </p>
            </m.div>
          ))}
        </div>
      </section>

      <Rule />

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[640px]"
        >
          <h2 className="font-headline text-heading-lg font-normal text-bone mb-6">
            Need content that moves?
          </h2>
          <p className="font-body text-body-sm font-normal text-fog-blue mb-12">
            Let&rsquo;s build a motion system that carries your brand&rsquo;s
            energy into every feed, sized for the platforms where your audience
            lives.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link href="/#contact" className="btn-primary">
              Book a Call
            </Link>
            <Link
              href="/projects/todes-vejigante"
              className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.02em] font-normal text-bone hover:text-fog-blue transition-colors duration-500 ease-prism"
            >
              View Next Project
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </m.div>
      </section>
    </article>
  );
}
