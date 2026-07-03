"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ProjectGifBand from "@/components/ProjectGifBand";

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
      <motion.div
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
      </motion.div>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
        {/* Cover clip */}
        <div className="absolute inset-0">
          <video
            src="/motion/barrys.mp4"
            poster="/motion/barrys.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Barry's Bootcamp content"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />

        {/* Radial fade at bottom */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-deep-space via-deep-space/40 to-transparent" />

        <div className="section-container relative z-10 pb-16 md:pb-24 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-white/70 mb-4 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm bg-white/5">
              Fitness + Content
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4"
          >
            BARRY&rsquo;S BOOTCAMP
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-2xl md:text-3xl lg:text-4xl font-medium text-white/80 tracking-tight"
          >
            Studio Energy, Built for the Feed
          </motion.p>

          {/* Animated line */}
          <motion.div
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
          <motion.aside
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
          </motion.aside>

          {/* Challenge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-8"
          >
            <p className="font-mono text-sm text-amber-400 tracking-widest uppercase mb-4">
              The Challenge
            </p>
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-8">
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
          </motion.div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Our Approach ─────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-amber-400 tracking-widest uppercase mb-4">
            Our Approach
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            From studio floor to{" "}
            <span className="text-white">feed</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-12"
        >
          {approach.map((item) => (
            <motion.div
              key={item.step}
              variants={staggerItem}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 group"
            >
              <div className="md:col-span-1">
                <span className="font-mono text-3xl md:text-4xl font-bold text-amber-400/30 group-hover:text-amber-400 transition-colors duration-500">
                  {item.step}
                </span>
              </div>
              <div className="md:col-span-11">
                <h3 className="font-headline text-xl md:text-2xl font-bold text-pure-white mb-3 group-hover:text-soft-white transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="font-body text-cool-gray leading-relaxed max-w-3xl">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── The Solution ─────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-4xl"
        >
          <p className="font-mono text-sm text-amber-400 tracking-widest uppercase mb-4">
            The Solution
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-8">
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
        </motion.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Campaign Gallery ────────────────────────────────────── */}
      <section className="section-container section-padding">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-amber-400 tracking-widest uppercase mb-4">
            Content Gallery
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            Animated graphics &{" "}
            <span className="text-white">social motion</span>
          </h2>
        </motion.div>

        <motion.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6"
        >
          {/* Row 1 - wide + tall */}
          <motion.div variants={galleryItem} className="md:col-span-7">
            <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl shadow-black/20 relative group">
              <div className="relative w-full h-full">
                <video
                  src="/motion/barrys-1.mp4"
                  poster="/motion/barrys-1.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="Barry's Bootcamp animated social graphic"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={galleryItem} className="md:col-span-5">
            <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl shadow-black/20 relative group">
              <div className="relative w-full h-full">
                <video
                  src="/motion/barrys-2.mp4"
                  poster="/motion/barrys-2.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="Barry's Bootcamp motion piece"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Row 2 - asymmetric pair */}
          <motion.div variants={galleryItem} className="md:col-span-6">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl shadow-black/20 relative group">
              <div className="relative w-full h-full">
                <video
                  src="/motion/barrys-3.mp4"
                  poster="/motion/barrys-3.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="Barry's Bootcamp animated graphic"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={galleryItem} className="md:col-span-6">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl shadow-black/20 relative group">
              <div className="relative w-full h-full">
                <video
                  src="/motion/barrys-4.mp4"
                  poster="/motion/barrys-4.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="Barry's Bootcamp social loop"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Row 3 - full-width hero loop */}
          <motion.div variants={galleryItem} className="md:col-span-12">
            <div className="aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl shadow-black/20 relative group">
              <div className="relative w-full h-full">
                <video
                  src="/motion/barrys-5.mp4"
                  poster="/motion/barrys-5.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="Barry's Bootcamp social motion piece"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Capabilities ──────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-amber-400 tracking-widest uppercase mb-4">
            Capabilities
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            The <span className="text-white">content toolkit</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {tools.map((tool) => (
            <motion.div
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
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
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
        </motion.div>
      </section>
    </article>
  );
}
