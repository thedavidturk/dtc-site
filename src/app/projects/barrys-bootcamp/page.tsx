"use client";

import Link from "@/components/TransitionLink";
import dynamic from "next/dynamic";
import { m } from "framer-motion";
import ProjectGifBand from "@/components/ProjectGifBand";
import Lazy3D from "@/components/Lazy3D";
import PinnedApproach from "@/components/PinnedApproach";
import WorkFrame from "@/components/WorkFrame";
import AutoplayVideo from "@/components/AutoplayVideo";

// Three.js needs the DOM — load client-side only
const ProjectScene = dynamic(() => import("@/components/ProjectScene"), {
  ssr: false,
});

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const galleryContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14 },
  },
};

const galleryItem = {
  hidden: { opacity: 0, y: 50, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
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

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BarrysBootcampProject() {
  return (
    <article className="bg-deep-space min-h-screen">
      {/* ── Back Link ─────────────────────────────────────────────── */}
      <m.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="fixed top-24 left-6 md:left-8 lg:left-12 z-40"
      >
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-cool-gray hover:text-pure-white transition-colors duration-300"
        >
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
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

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
        {/* Cover clip */}
        <div className="absolute inset-0">
          <AutoplayVideo
            src="/motion/barrys.mp4"
            poster="/motion/barrys.jpg"
            aria-label="Barry's Bootcamp content"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />

        {/* Themed 3D atmosphere — desktop only, unmounts off-screen */}
        <Lazy3D className="pointer-events-none absolute inset-0 z-[1] hidden lg:block opacity-25">
          <ProjectScene theme="energy" className="h-full w-full" />
        </Lazy3D>

        {/* Radial fade at bottom */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-deep-space via-deep-space/40 to-transparent" />

        <div className="section-container relative z-10 pb-16 md:pb-24 pt-32">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-white/70 mb-4 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm bg-white/5">
              Fitness + Content
            </span>
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-h1 font-bold mb-4"
          >
            BARRY&rsquo;S BOOTCAMP
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-2xl md:text-3xl lg:text-4xl font-medium text-white/80 tracking-tight"
          >
            Studio Energy, Built for the Feed
          </m.p>

          {/* Animated line */}
          <m.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-amber-500 to-red-500 mt-8"
          />
        </div>
      </section>

      {/* ── In Motion GIF Band ────────────────────────────────────── */}
      <ProjectGifBand
        eyebrow="In Motion"
        heading="The Energy, Moving"
        gifs={[
          {
            src: "/motion/barrys.mp4",
            poster: "/motion/barrys.jpg",
            label: "Barry's",
          },
        ]}
      />

      {/* ── Overview Sidebar + Challenge ──────────────────────────── */}
      <section className="section-container section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Sidebar */}
          <m.aside
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-4"
          >
            <div className="lg:sticky lg:top-28 space-y-8">
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-amber-400 mb-2">
                  Client
                </p>
                <p className="font-headline text-lg font-semibold text-pure-white">
                  {overview.client}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-amber-400 mb-2">
                  Industry
                </p>
                <p className="font-body text-cool-gray">
                  {overview.industry}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-amber-400 mb-2">
                  Timeline
                </p>
                <p className="font-body text-cool-gray">
                  {overview.timeline}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-amber-400 mb-2">
                  Services
                </p>
                <ul className="space-y-2">
                  {overview.services.map((service) => (
                    <li
                      key={service}
                      className="flex items-center gap-3 font-body text-sm text-cool-gray"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </m.aside>

          {/* Challenge */}
          <m.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-8"
          >
            <p className="font-mono text-sm text-amber-400 tracking-widest uppercase mb-4">
              The Challenge
            </p>
            <h2 className="font-headline text-h3 font-bold mb-8">
              Studio intensity,{" "}
              <span className="gradient-text">on a small screen</span>
            </h2>
            <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
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
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Our Approach (scroll-scrubbed pinned section) ────────── */}
      <PinnedApproach
        eyebrow="Our Approach"
        heading="From studio floor to feed"
        steps={approach.map(({ title, description }) => ({
          title,
          body: description,
        }))}
      />

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── The Solution ─────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-4xl"
        >
          <p className="font-mono text-sm text-amber-400 tracking-widest uppercase mb-4">
            The Solution
          </p>
          <h2 className="font-headline text-h3 font-bold mb-8">
            A motion system{" "}
            <span className="text-white">that moves like the brand</span>
          </h2>
          <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
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

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Campaign Gallery ────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-amber-400 tracking-widest uppercase mb-4">
            Content Gallery
          </p>
          <h2 className="font-headline text-h3 font-bold">
            Animated graphics &{" "}
            <span className="text-white">social motion</span>
          </h2>
        </m.div>

        <m.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6"
        >
          {/* Row 1 - wide + tall */}
          <m.div variants={galleryItem} className="md:col-span-7">
            <WorkFrame
              client={overview.client}
              discipline="Animated Graphics"
              index={1}
              className="aspect-[16/10] rounded-2xl shadow-2xl shadow-black/20"
            >
              <div className="relative w-full h-full">
                <AutoplayVideo
                  src="/motion/barrys-1.mp4"
                  poster="/motion/barrys-1.jpg"
                  aria-label="Barry's Bootcamp animated social graphic"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </WorkFrame>
          </m.div>

          <m.div variants={galleryItem} className="md:col-span-5">
            <WorkFrame
              client={overview.client}
              discipline="Motion Design"
              index={2}
              className="aspect-[16/10] rounded-2xl shadow-2xl shadow-black/20"
            >
              <div className="relative w-full h-full">
                <AutoplayVideo
                  src="/motion/barrys-2.mp4"
                  poster="/motion/barrys-2.jpg"
                  aria-label="Barry's Bootcamp motion piece"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </WorkFrame>
          </m.div>

          {/* Row 2 - asymmetric pair */}
          <m.div variants={galleryItem} className="md:col-span-6">
            <WorkFrame
              client={overview.client}
              discipline="Animated Graphics"
              index={3}
              className="aspect-[16/9] rounded-2xl shadow-2xl shadow-black/20"
            >
              <div className="relative w-full h-full">
                <AutoplayVideo
                  src="/motion/barrys-3.mp4"
                  poster="/motion/barrys-3.jpg"
                  aria-label="Barry's Bootcamp animated graphic"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </WorkFrame>
          </m.div>

          <m.div variants={galleryItem} className="md:col-span-6">
            <WorkFrame
              client={overview.client}
              discipline="Social Content"
              index={4}
              className="aspect-[16/9] rounded-2xl shadow-2xl shadow-black/20"
            >
              <div className="relative w-full h-full">
                <AutoplayVideo
                  src="/motion/barrys-4.mp4"
                  poster="/motion/barrys-4.jpg"
                  aria-label="Barry's Bootcamp social loop"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </WorkFrame>
          </m.div>

          {/* Row 3 - full-width hero loop */}
          <m.div variants={galleryItem} className="md:col-span-12">
            <WorkFrame
              client={overview.client}
              discipline="Motion Design"
              index={5}
              className="aspect-[21/9] rounded-2xl shadow-2xl shadow-black/20"
            >
              <div className="relative w-full h-full">
                <AutoplayVideo
                  src="/motion/barrys-5.mp4"
                  poster="/motion/barrys-5.jpg"
                  aria-label="Barry's Bootcamp social motion piece"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </WorkFrame>
          </m.div>
        </m.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── The Result ───────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-amber-400 tracking-widest uppercase mb-4">
            The Result
          </p>
          <h2 className="font-headline text-h3 font-bold">
            Studio energy, <span className="text-white">built for the feed</span>
          </h2>
        </m.div>

        {/* Lead result statement */}
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-4xl"
        >
          <p className="font-display text-h2 font-bold text-pure-white mb-10">
            {results.lead}
          </p>

          {/* TODO(David): add quantified result or client quote here */}

          <ul className="space-y-4 border-l border-amber-400/30 pl-6">
            {results.supporting.map((result) => (
              <li
                key={result}
                className="font-body text-cool-gray text-base md:text-lg leading-relaxed"
              >
                {result}
              </li>
            ))}
          </ul>
        </m.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Capabilities ──────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-amber-400 tracking-widest uppercase mb-4">
            Capabilities
          </p>
          <h2 className="font-headline text-h3 font-bold">
            The <span className="text-white">content toolkit</span>
          </h2>
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {tools.map((tool) => (
            <m.div
              key={tool.name}
              variants={staggerItem}
              className="group p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:border-amber-400/20 hover:bg-amber-400/[0.03] transition-all duration-500"
            >
              <h3 className="font-headline text-lg font-bold text-pure-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
                {tool.name}
              </h3>
              <p className="font-body text-sm text-cool-gray leading-relaxed">
                {tool.description}
              </p>
            </m.div>
          ))}
        </m.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-headline text-h2 font-bold mb-6">
            Need content that{" "}
            <span className="text-white">moves</span>?
          </h2>
          <p className="font-body text-cool-gray text-base md:text-lg leading-relaxed mb-10">
            Let&rsquo;s build a motion system that carries your brand&rsquo;s
            energy into every feed, sized for the platforms where your audience
            lives.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact" className="btn-primary">
              Book a Call
            </Link>
            <Link
              href="/projects/todes-vejigante"
              className="btn-secondary group inline-flex items-center gap-2"
            >
              View Next Project
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
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
