"use client";

import Link from "@/components/TransitionLink";
import Image from "next/image";
import { m } from "framer-motion";
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
    transition: { duration: 0.5, ease: prismEase },
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const overview = {
  client: "New Era Cap",
  industry: "Fashion / Headwear",
  timeline: "5 Weeks",
  services: [
    "Research & Discovery",
    "Creative Strategy",
    "Content Development",
    "Post-Production & VFX",
    "Multi-Platform Delivery",
  ],
};

const approach = [
  {
    step: "01",
    title: "Research & Discovery",
    description:
      "Studied the collection's design language (organic textures, earthy tones, and botanical motifs) alongside the target audience's connection to nature-inspired streetwear. Identified the creative gap between typical product photography and the immersive experience the collection deserved.",
  },
  {
    step: "02",
    title: "Creative Strategy",
    description:
      "Developed a campaign concept that placed each cap inside its own living ecosystem. Rather than showing hats on shelves, we built a narrative where the product grows from the world around it: forests, mushroom hilltops, overgrown cityscapes.",
  },
  {
    step: "03",
    title: "Content Development",
    description:
      "Created rich 3D environments filled with foliage, natural textures, and atmospheric lighting. Photorealistic product models were integrated into each scene with cinematic camera work and real-time rendering for rapid creative iteration.",
  },
  {
    step: "04",
    title: "Post-Production & Polish",
    description:
      "Layered VFX, color grading, and motion graphics to enhance the organic atmosphere. Every frame was refined to balance the lush, natural aesthetic with premium product visibility.",
  },
  {
    step: "05",
    title: "Multi-Platform Delivery",
    description:
      "Delivered optimized assets across web, social media, and digital retail channels. Each format was tailored to maximize engagement while maintaining visual consistency.",
  },
];

const results = [
  "Research-driven creative that connected product design to audience culture",
  "Immersive nature-themed content across digital and social channels",
  "Premium product visualization within cinematic 3D environments",
  "Fast production pipeline from concept to delivery in 5 weeks",
  "Campaign assets that elevated the collection's brand perception",
];

const tools = [
  {
    name: "Unreal Engine 5",
    description:
      "Environment creation, real-time rendering, and cinematic sequencing for the nature-themed worlds.",
  },
  {
    name: "Cinema 4D",
    description:
      "3D product modeling and photorealistic material development for each cap.",
  },
  {
    name: "Adobe After Effects",
    description:
      "VFX compositing, motion graphics, and color grading for final polish.",
  },
  {
    name: "Adobe Premiere Pro",
    description:
      "Editorial assembly, pacing, and delivery-format exports across all platforms.",
  },
  {
    name: "Adobe Photoshop",
    description:
      "Texture creation, matte painting, and hero key-visual compositing.",
  },
];

/* ------------------------------------------------------------------ */
/*  Shared pieces                                                      */
/* ------------------------------------------------------------------ */

function PlateCaption({ label, value }: { label: string; value: string }) {
  return (
    <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
      <span className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue">
        {label}
      </span>
      <span className="text-caption font-normal text-bone">{value}</span>
    </figcaption>
  );
}

function Rule() {
  return (
    <div className="section-container">
      <div className="border-t border-ash-border" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function SproutedProject() {
  return (
    <article className="bg-obsidian min-h-screen">
      {/* ── Opener ────────────────────────────────────────────────── */}
      <header className="section-container pt-32 md:pt-40 pb-16 md:pb-20">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: prismEase }}
          className="mb-14"
        >
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-caption uppercase tracking-[0.02em] font-normal text-bone hover:text-fog-blue transition-colors duration-500 ease-prism"
          >
            <svg
              className="w-4 h-4 transition-transform duration-500 ease-prism group-hover:-translate-x-1"
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

        <m.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: prismEase }}
          className="text-[17px] uppercase tracking-[0.02em] font-normal text-fog-blue mb-6"
        >
          Strategy + Content Development
        </m.p>

        <m.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: prismEase }}
          className="font-body font-normal text-bone text-display-sm leading-[1.01] tracking-[-0.02em] mb-6"
        >
          New Era Cap
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: prismEase }}
          className="font-body text-body-lg font-normal text-bone"
        >
          &ldquo;Sprouted&rdquo; Collection
        </m.p>

        {/* Metadata row */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: prismEase }}
          className="mt-16 border-t border-b border-ash-border py-8"
        >
          <dl className="flex flex-wrap gap-x-16 gap-y-8">
            <div>
              <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
                Client
              </dt>
              <dd className="font-body text-body-sm font-normal text-bone">
                {overview.client}
              </dd>
            </div>
            <div>
              <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
                Industry
              </dt>
              <dd className="font-body text-body-sm font-normal text-bone">
                {overview.industry}
              </dd>
            </div>
            <div>
              <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
                Timeline
              </dt>
              <dd className="font-body text-body-sm font-normal text-bone">
                {overview.timeline}
              </dd>
            </div>
            <div>
              <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
                Services
              </dt>
              <dd>
                <ul className="space-y-1">
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
          </dl>
        </m.div>
      </header>

      {/* ── Hero media plate ──────────────────────────────────────── */}
      <section className="section-container pb-24 md:pb-32">
        <m.figure
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75, ease: prismEase }}
        >
          <div className="relative aspect-[16/9] overflow-hidden rounded-[15px] border border-ash-border">
            <Image
              src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/9093a3b0-956b-49e3-a039-06897868e553_rw_1200.png?h=bf736fd7c3636fa8eedc8a44dd910bcd"
              alt="New Era Cap Sprouted Collection nature scene"
              fill
              className="object-cover"
              unoptimized
              priority
            />
          </div>
          <PlateCaption
            label="Key Visual"
            value="New Era Cap Sprouted Collection nature scene"
          />
        </m.figure>
      </section>

      <Rule />

      {/* ── In Motion ─────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14 max-w-[640px]"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            In Motion
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone">
            The Collection, Growing
          </h2>
        </m.div>

        <m.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="relative aspect-video overflow-hidden rounded-[15px] border border-ash-border">
            <AutoplayVideo
              src="/motion/new-era-sprouted.mp4"
              poster="/motion/new-era-sprouted.jpg"
              aria-label="Sprouted"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <PlateCaption label="In Motion" value="Sprouted" />
        </m.figure>
      </section>

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
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            The Challenge
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone mb-8">
            Bringing a nature-inspired collection to life digitally
          </h2>
          <div className="font-body text-body-sm font-normal text-bone space-y-7">
            <p>
              New Era Cap launched the &ldquo;Sprouted&rdquo; collection, a
              line of hats built around botanical motifs, earthy textures, and
              organic design elements. They needed a campaign that went beyond
              standard product photography and immersed the audience in the
              world the collection was inspired by.
            </p>
            <p>
              The challenge: create visuals of a foliage-filled world that
              would spotlight the product&rsquo;s distinctive features while
              generating excitement across digital and social channels, all
              without physical sets or location shoots.
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
          className="mb-16 max-w-[640px]"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            Our Approach
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone">
            From seed to screen in five steps
          </h2>
        </m.div>

        <m.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[760px] border-t border-ash-border"
        >
          {approach.map((step) => (
            <m.li
              key={step.step}
              variants={staggerItem}
              className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 border-b border-ash-border py-12"
            >
              <span
                aria-hidden="true"
                className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue md:w-28 flex-shrink-0"
              >
                {step.step}
              </span>
              <div className="max-w-[640px]">
                <h3 className="font-body text-heading-sm font-normal text-bone mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-body-sm font-normal text-fog-blue">
                  {step.description}
                </p>
              </div>
            </m.li>
          ))}
        </m.ol>
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
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            The Solution
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone mb-8">
            Strategy-driven content rooted in nature
          </h2>
          <div className="font-body text-body-sm font-normal text-bone space-y-7">
            <p>
              Our research revealed that the audience didn&rsquo;t just want to
              see hats; they wanted to feel the world behind the collection.
              That insight drove every creative decision: forests that feel alive,
              mushroom hilltops that glow with atmosphere, and overgrown cityscapes
              where nature reclaims the urban landscape.
            </p>
            <p>
              Each environment was built to tell a story about growth and
              transformation. Photorealistic product models sat naturally within
              these worlds, lit by the same dappled sunlight and ambient glow as
              their surroundings. The result: content that made the audience feel
              something first and notice the product second.
            </p>
          </div>
        </m.div>
      </section>

      <Rule />

      {/* ── The Result ───────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[640px] mb-12"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            The Result
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone">
            Organic impact, cultivated content
          </h2>
        </m.div>

        {/* Lead result statement */}
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[640px]"
        >
          <p className="font-body text-heading-sm font-normal text-bone mb-10">
            {results[0]}
          </p>

          {/* TODO(David): add quantified result or client quote here */}

          <ul className="space-y-4 border-l border-ash-border pl-6">
            {results.slice(1).map((result) => (
              <li
                key={result}
                className="font-body text-body-sm font-normal text-fog-blue"
              >
                {result}
              </li>
            ))}
          </ul>
        </m.div>
      </section>

      <Rule />

      {/* ── Tools & Technology ────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[640px] mb-12"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            Tools & Technology
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone">
            The production stack
          </h2>
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[640px] border-t border-ash-border"
        >
          {tools.map((tool) => (
            <m.div
              key={tool.name}
              variants={staggerItem}
              className="border-b border-ash-border py-6"
            >
              <h3 className="font-body text-body font-normal text-bone mb-2">
                {tool.name}
              </h3>
              <p className="font-body text-body-sm font-normal text-fog-blue">
                {tool.description}
              </p>
            </m.div>
          ))}
        </m.div>
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
          <h2 className="font-body text-heading-lg font-normal text-bone mb-6">
            Ready to grow your next campaign?
          </h2>
          <p className="font-body text-body-sm font-normal text-fog-blue mb-10">
            Let&rsquo;s develop strategy-driven content that connects your
            product to the world your audience lives in.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link href="/#contact" className="btn-primary">
              Book a Call
            </Link>
            <Link
              href="/projects/todes-vejigante"
              className="group inline-flex items-center gap-2 uppercase text-sm font-normal text-bone hover:text-fog-blue transition-colors duration-500 ease-prism"
            >
              View Next Project
              <svg
                className="w-4 h-4 transition-transform duration-500 ease-prism group-hover:translate-x-1"
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
