"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

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

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const overview = {
  client: "SeaWorld Orlando / United Parks",
  industry: "Entertainment / Theme Parks",
  timeline: "30 Days",
  services: [
    "Virtual World Cinematic",
    "3D Animation",
    "Cinematic Trailer Production",
    "Hero Visual Development",
    "Multi-Platform Delivery",
  ],
};

const approach = [
  {
    step: "01",
    title: "Worldbuilding in Unreal Engine 5",
    description:
      "Built immersive deep-sea environments from the ground up: coral reefs, ancient shipwrecks, bioluminescent zones, and mysterious underwater landscapes — all designed to evoke wonder and exploration.",
  },
  {
    step: "02",
    title: "Cinematic Trailer Production",
    description:
      "Produced a 30-second teaser trailer using in-engine cameras and custom Sequencer setups. Every shot was choreographed to mirror the pacing and impact of theatrical movie previews.",
  },
  {
    step: "03",
    title: "Hero Visual Development",
    description:
      "Created standalone hero key-visuals blending rendered UE5 environments with composited elements. Designed specifically for digital advertising and social media hero placements.",
  },
  {
    step: "04",
    title: "Platform-Ready Delivery",
    description:
      "All assets were resized and optimized for widescreen (16:9), square (4:5), and vertical (9:16) formats, ensuring seamless deployment across every digital platform.",
  },
  {
    step: "05",
    title: "Fast-Track Production",
    description:
      "The entire campaign — from worldbuilding to final delivery — was produced in just 30 days. Speed without compromise: every deadline met, every frame polished.",
  },
];

const results = [
  "30-second cinematic teaser trailer delivered in 30 days",
  "Hero visuals for digital ads and social campaigns",
  "Multi-format assets for seamless platform deployment",
  "Campaign that generated excitement across all channels",
  "Fast-turn production without compromising quality",
];

const tools = [
  {
    name: "Unreal Engine 5",
    description:
      "Virtual deep-sea worldbuilding, real-time rendering, and cinematic camera sequencing.",
  },
  {
    name: "Adobe After Effects",
    description:
      "VFX compositing, hero visual development, motion graphics, and color grading.",
  },
  {
    name: "Adobe Premiere Pro",
    description:
      "Trailer editorial, pacing, and multi-format delivery exports.",
  },
  {
    name: "Adobe Audition",
    description:
      "Sound design, audio mixing, and trailer soundtrack integration.",
  },
  {
    name: "Adobe Photoshop",
    description:
      "Hero key-visual compositing, texture work, and digital ad asset creation.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function SeaWorldProject() {
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
        {/* Cover GIF background */}
        <div className="absolute inset-0">
          <Image
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2FiY2c0M2o5aDlmbHBreWF0OXhteWt0bzBrcnk0dTB3ZGpsOXVlbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FEKtnv79Ys8a75Q8gG/giphy.gif"
            alt="SeaWorld SEAQuest underwater scene"
            fill
            className="object-cover"
            unoptimized
            priority
          />
        </div>

        {/* Subtle dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Radial fade at bottom */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-deep-space via-deep-space/40 to-transparent" />

        {/* Floating geometric accents */}
        <div className="absolute top-1/4 right-1/4 w-40 h-40 border border-white/[0.06] rounded-full animate-pulse z-[2]" />
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-white/10 rounded-xl -rotate-12 z-[2]" />
        <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-white/20 rounded-full z-[2]" />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white/10 rounded-full z-[2]" />

        <div className="section-container relative z-10 pb-16 md:pb-24 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-white/70 mb-4 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm bg-white/5">
              Virtual World Cinematic + 3D Animation
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4"
          >
            SEAWORLD
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-2xl md:text-3xl lg:text-4xl font-medium text-white/80 tracking-tight"
          >
            SEAQuest Announcement Campaign
          </motion.p>

          {/* Animated line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-cyan-400 to-teal-400 mt-8"
          />
        </div>
      </section>

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
                <p className="font-mono text-xs tracking-widest uppercase text-cyan-400 mb-2">
                  Client
                </p>
                <p className="font-headline text-lg font-semibold text-pure-white">
                  {overview.client}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-cyan-400 mb-2">
                  Industry
                </p>
                <p className="font-body text-cool-gray">
                  {overview.industry}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-cyan-400 mb-2">
                  Timeline
                </p>
                <p className="font-body text-cool-gray">
                  {overview.timeline}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-cyan-400 mb-2">
                  Services
                </p>
                <ul className="space-y-2">
                  {overview.services.map((service) => (
                    <li
                      key={service}
                      className="flex items-center gap-3 font-body text-sm text-cool-gray"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
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
            <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-4">
              The Challenge
            </p>
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-8">
              Generating massive excitement{" "}
              <span className="gradient-text">in 30 days flat</span>
            </h2>
            <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
              <p>
                United Parks needed a cinematic teaser trailer and hero visuals
                for their new dark ride attraction, SEAQuest. The goal: generate
                excitement online, on social, and across digital platforms with
                a bold, high-impact campaign capturing the mystery and wonder of
                an underwater adventure.
              </p>
              <p>
                The constraint that made it even more challenging? The entire
                production — from initial concept to final delivery — had to be
                completed within a tight 30-day window. No room for delays, no
                margin for error. Just pure creative execution at speed.
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
          <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-4">
            Our Approach
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            Deep-sea storytelling{" "}
            <span className="gradient-text">at breakneck speed</span>
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
                <span className="font-mono text-3xl md:text-4xl font-bold text-cyan-400/30 group-hover:text-cyan-400 transition-colors duration-500">
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
          <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-4">
            The Solution
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-8">
            An immersive underwater world{" "}
            <span className="gradient-text">ready for every screen</span>
          </h2>
          <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
            <p>
              We created a full UE5 virtual environment — coral reefs, ancient
              shipwrecks, bioluminescent deep-sea zones — and used it as the
              foundation for cinematic sequences forming a 30-second teaser
              trailer. Every shot was choreographed to build mystery and
              excitement, mirroring the pacing of a theatrical movie preview.
            </p>
            <p>
              Hero visuals were developed using UE5 renders and advanced
              compositing techniques, while all assets were adapted for multiple
              aspect ratios (16:9, 4:5, 9:16) for optimized impact across every
              digital platform — from widescreen displays to vertical social
              stories.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── The Result ───────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-4">
            The Result
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            Speed, scale, and{" "}
            <span className="gradient-text">cinematic quality</span>
          </h2>
        </motion.div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {results.map((result) => (
            <motion.li
              key={result}
              variants={staggerItem}
              className="flex items-start gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-cyan-400/20 hover:bg-cyan-400/[0.03] transition-all duration-500"
            >
              <svg
                className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-body text-soft-white text-sm md:text-base leading-relaxed">
                {result}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Tools & Technology ────────────────────────────────────── */}
      <section className="section-container section-padding">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-4">
            Tools & Technology
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            The <span className="gradient-text">production stack</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={staggerItem}
              className="group p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:border-cyan-400/20 hover:bg-cyan-400/[0.03] transition-all duration-500"
            >
              <h3 className="font-headline text-lg font-bold text-pure-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
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
            Ready to make a{" "}
            <span className="gradient-text">splash</span>?
          </h2>
          <p className="font-body text-cool-gray text-base md:text-lg leading-relaxed mb-10">
            Let&rsquo;s build your next campaign with speed, scale, and
            cinematic impact that stops the scroll.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact" className="btn-primary">
              Start Your Project
            </Link>
            <Link
              href="/projects/el-secreto"
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
