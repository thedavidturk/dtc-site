"use client";

import Link from "@/components/TransitionLink";
import Image from "next/image";
import { m } from "framer-motion";
import AutoplayVideo from "@/components/AutoplayVideo";

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

const PRISM_EASE = [0.52, 0.01, 0, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: PRISM_EASE },
  },
};

const galleryContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14 },
  },
};

const galleryItem = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: PRISM_EASE },
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const overview = {
  client: "Betterfly",
  industry: "HR Technology / Benefits",
  timeline: "4 Weeks",
  services: [
    "VFX Compositing",
    "FOOH (Fake Out-of-Home)",
    "Campaign Video Production",
    "VFX Breakdown Reels",
    "Social Media Content",
  ],
};

const approach = [
  {
    step: "01",
    title: "Concept & Monument Selection",
    description:
      "Identified iconic global monuments that would maximize visual impact and cultural resonance. Each location was chosen for its recognizability and the dramatic potential of draping massive branded banners across its architecture.",
  },
  {
    step: "02",
    title: "Footage Acquisition & Camera Matching",
    description:
      "Sourced high-quality footage of each monument and meticulously matched camera angles, lighting conditions, and perspective to ensure seamless VFX integration. Every frame needed to feel authentically captured.",
  },
  {
    step: "03",
    title: "VFX Banner Simulation & Compositing",
    description:
      "Digitally created and animated massive Betterfly banners draped over each monument using advanced cloth simulation and compositing. Shadows, reflections, and environmental interactions were crafted to make each placement indistinguishable from reality.",
  },
  {
    step: "04",
    title: "Campaign Video Assembly",
    description:
      "Assembled the individual monument executions into a cohesive campaign video with dynamic pacing, branded messaging, and a narrative arc targeting HR administrators worldwide.",
  },
  {
    step: "05",
    title: "VFX Breakdowns & Social Distribution",
    description:
      "Produced detailed VFX breakdown reels showing each monument's transformation stages, from raw footage to final composite. These behind-the-scenes assets amplified engagement and showcased production expertise.",
  },
];

const results = [
  "Six iconic monument executions delivered across social platforms",
  "Campaign generated measurable social media buzz and engagement",
  "VFX breakdowns drove additional content virality",
  "Achieved global out-of-home impact without physical production costs",
  "Positioned Betterfly as a bold, innovative brand in the HR tech space",
];

const tools = [
  {
    name: "Adobe After Effects",
    description:
      "VFX compositing, banner simulation, camera tracking, and final visual effects polish for each monument execution.",
  },
  {
    name: "Cinema 4D",
    description:
      "3D cloth simulation for realistic banner draping, lighting matching, and environmental integration.",
  },
  {
    name: "Adobe Premiere Pro",
    description:
      "Campaign video assembly, pacing, and multi-format social media delivery across platforms.",
  },
  {
    name: "Adobe Photoshop",
    description:
      "Texture creation, matte painting, and detailed compositing work for seamless monument integration.",
  },
];

/* ------------------------------------------------------------------ */
/*  Local pieces                                                       */
/* ------------------------------------------------------------------ */

/** Full-width hairline rule separating bands. */
function Rule() {
  return (
    <div className="section-container">
      <div className="border-t border-ash-border" />
    </div>
  );
}

/** Media card on the void: 15px radius, caption below in bone + fog-blue. */
function Plate({
  label,
  value,
  aspect,
  children,
}: {
  label: string;
  value: string;
  aspect?: string;
  children: React.ReactNode;
}) {
  return (
    <figure>
      <div
        className={`relative overflow-hidden rounded-[15px] border border-ash-border ${
          aspect ?? ""
        }`}
      >
        {children}
      </div>
      <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue">
          {label}
        </span>
        <span className="font-body text-caption font-normal text-bone">
          {value}
        </span>
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BetterflyProject() {
  return (
    <article className="bg-obsidian min-h-screen">
      {/* ── Opener ────────────────────────────────────────────────── */}
      <header className="section-container pt-28 md:pt-36 pb-16 md:pb-20">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: PRISM_EASE }}
        >
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-caption font-normal uppercase tracking-[0.02em] text-bone transition-colors duration-500 ease-prism hover:text-fog-blue"
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: PRISM_EASE }}
          className="mt-14 text-[17px] font-normal uppercase tracking-[0.02em] text-fog-blue"
        >
          VFX + FOOH Campaign
        </m.p>

        <m.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: PRISM_EASE }}
          className="mt-6 font-headline text-display-sm font-normal text-bone"
        >
          Betterfly
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: PRISM_EASE }}
          className="mt-6 font-body text-body-lg font-normal text-bone max-w-[640px]"
        >
          #RecursosMasHumanos FOOH Campaign
        </m.p>

        {/* Metadata row */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: PRISM_EASE }}
          className="mt-16 border-t border-ash-border pt-10"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-16 lg:gap-24">
            <div>
              <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue mb-2">
                Client
              </p>
              <p className="font-body text-body-sm font-normal text-bone">
                {overview.client}
              </p>
            </div>
            <div>
              <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue mb-2">
                Industry
              </p>
              <p className="font-body text-body-sm font-normal text-bone">
                {overview.industry}
              </p>
            </div>
            <div>
              <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue mb-2">
                Timeline
              </p>
              <p className="font-body text-body-sm font-normal text-bone">
                {overview.timeline}
              </p>
            </div>
            <div>
              <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue mb-2">
                Services
              </p>
              <ul className="space-y-1">
                {overview.services.map((service) => (
                  <li
                    key={service}
                    className="font-body text-body-sm font-normal text-bone"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </m.div>
      </header>

      {/* ── Hero Media ────────────────────────────────────────────── */}
      <section className="section-container pb-20 md:pb-28">
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: PRISM_EASE }}
          className="mx-auto max-w-[1200px]"
        >
          <Plate
            label="FOOH (Fake Out-of-Home)"
            value="Betterfly FOOH campaign VFX scene"
            aspect="aspect-[16/9]"
          >
            <AutoplayVideo
              src="/motion/betterfly-fooh.mp4"
              poster="/motion/betterfly-fooh.jpg"
              aria-label="Betterfly FOOH campaign VFX scene"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </Plate>
        </m.div>
      </section>

      <Rule />

      {/* ── In Motion ─────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 md:mb-16"
        >
          <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue mb-4">
            In Motion
          </p>
          <h2 className="font-headline text-heading-lg font-normal text-bone">
            The Campaign, Moving
          </h2>
        </m.div>

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto max-w-[1200px]"
        >
          <Plate label="In Motion" value="#RecursosMasHumanos">
            <AutoplayVideo
              src="/motion/betterfly.mp4"
              poster="/motion/betterfly.jpg"
              aria-label="#RecursosMasHumanos"
              className="block w-full h-auto"
            />
          </Plate>
        </m.div>
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
          <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue mb-4">
            The Challenge
          </p>
          <h2 className="font-headline text-heading-lg font-normal text-bone mb-12">
            Global out-of-home impact without the logistics
          </h2>
          <div className="font-body text-body-sm font-normal text-bone space-y-7">
            <p>
              Betterfly needed a visually striking campaign to announce
              &ldquo;a new era of benefits&rdquo; and position their platform
              in front of HR administrators worldwide. They wanted the impact
              of a massive global out-of-home campaign (branded banners
              draped over iconic monuments) without the impossible logistics
              and budget of physically wrapping world landmarks.
            </p>
            <p>
              The challenge: make it look completely real. Every banner needed
              to interact convincingly with the architecture (matching
              lighting, casting shadows, responding to wind) so viewers
              would do a double-take before realizing it was VFX. The campaign
              had to generate social media buzz and position Betterfly as a
              bold, forward-thinking brand.
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
          <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue mb-4">
            Our Approach
          </p>
          <h2 className="font-headline text-heading-lg font-normal text-bone">
            From monuments to feeds in five steps
          </h2>
        </m.div>

        <div className="max-w-[640px]">
          {approach.map((step, i) => (
            <m.div
              key={step.step}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className={
                i === 0 ? "" : "border-t border-ash-border mt-14 pt-14"
              }
            >
              <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue">
                {step.step}
              </p>
              <h3 className="mt-4 font-headline text-heading-sm font-normal text-bone">
                {step.title}
              </h3>
              <p className="mt-5 font-body text-body-sm font-normal text-bone">
                {step.description}
              </p>
            </m.div>
          ))}
        </div>
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
          <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue mb-4">
            The Solution
          </p>
          <h2 className="font-headline text-heading-lg font-normal text-bone mb-12">
            Fake out-of-home, real impact
          </h2>
          <div className="font-body text-body-sm font-normal text-bone space-y-7">
            <p>
              We used VFX to digitally drape massive Betterfly branded banners
              over six iconic global monuments. Advanced cloth simulation,
              precise camera tracking, and meticulous compositing made each
              execution indistinguishable from a real installation, the kind of
              spectacle that makes people stop scrolling and share.
            </p>
            <p>
              Beyond the hero campaign video, we produced detailed VFX breakdown
              reels for each monument, showing the transformation from raw
              footage to final composite. These behind-the-scenes assets became
              content multipliers, driving additional engagement and showcasing
              the craft behind the campaign.
            </p>
          </div>
        </m.div>
      </section>

      <Rule />

      {/* ── Campaign Gallery ────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue mb-4">
            Campaign Gallery
          </p>
          <h2 className="font-headline text-heading-lg font-normal text-bone">
            Monument Executions
          </h2>
        </m.div>

        <m.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto max-w-[1200px] space-y-14 md:space-y-20"
        >
          {/* Pair: wide hero + tall side */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
            <m.div variants={galleryItem} className="md:col-span-7">
              <Plate
                label="FOOH (Fake Out-of-Home)"
                value="Betterfly FOOH monument execution 1"
                aspect="aspect-[16/10]"
              >
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/afa1b619-7f85-4631-b906-65725f2afb1d_rw_3840.jpg?h=c011327012d82e389e6536546dad732a"
                  alt="Betterfly FOOH monument execution 1"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </Plate>
            </m.div>
            <m.div variants={galleryItem} className="md:col-span-5">
              <Plate
                label="VFX Compositing"
                value="Betterfly FOOH monument execution 2"
                aspect="aspect-[3/4]"
              >
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/0c4aae34-962c-4708-9e09-10d7c2270b0d_rw_3840.jpg?h=9486e194d38c38c0b70c1ffc7e317fcd"
                  alt="Betterfly FOOH monument execution 2"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </Plate>
            </m.div>
          </div>

          {/* Pair: monument executions 3 + 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            <m.div variants={galleryItem}>
              <Plate
                label="FOOH (Fake Out-of-Home)"
                value="Betterfly FOOH monument execution 3"
                aspect="aspect-[4/3]"
              >
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/86e3da3a-6b51-4572-94f5-260d6a761c0f_rw_3840.jpg?h=9b9f844be5ce86bd5089282e90bddbea"
                  alt="Betterfly FOOH monument execution 3"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </Plate>
            </m.div>
            <m.div variants={galleryItem}>
              <Plate
                label="VFX Compositing"
                value="Betterfly FOOH monument execution 4"
                aspect="aspect-[4/3]"
              >
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/700cdcee-cf9b-4414-b54c-82e507d0ed53_rw_3840.jpg?h=ad51ee0c19861e16fffbd807aa14d780"
                  alt="Betterfly FOOH monument execution 4"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </Plate>
            </m.div>
          </div>

          {/* Single: monument execution 5 */}
          <m.div variants={galleryItem} className="mx-auto max-w-[900px]">
            <Plate
              label="FOOH (Fake Out-of-Home)"
              value="Betterfly FOOH monument execution 5"
              aspect="aspect-[4/3]"
            >
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/158c693d-d708-434a-8451-47c529b3cc20_rw_3840.jpg?h=a7b17b9dff25de2b80d8d8cdfeb196cc"
                alt="Betterfly FOOH monument execution 5"
                fill
                className="object-cover"
                unoptimized
              />
            </Plate>
          </m.div>

          {/* Single: full-width VFX breakdown */}
          <m.div variants={galleryItem}>
            <Plate
              label="VFX Breakdown Reels"
              value="Betterfly FOOH VFX breakdown"
              aspect="aspect-[21/9]"
            >
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/e9307a9f-c204-4722-9a9f-4d5b3113db28_rw_3840.jpg?h=72945d2944442b86cf4ba4dc3f52f58b"
                alt="Betterfly FOOH VFX breakdown"
                fill
                className="object-cover"
                unoptimized
              />
            </Plate>
          </m.div>

          {/* Pair: social media assets 1 + 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            <m.div variants={galleryItem}>
              <Plate
                label="Social Media Content"
                value="Betterfly social media asset 1"
                aspect="aspect-square"
              >
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/d06fd2d0-9618-4b28-a9ca-e2a56de0f9cc_rw_600.png?h=840f98de7ce65d2053f15fc1a332bb28"
                  alt="Betterfly social media asset 1"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </Plate>
            </m.div>
            <m.div variants={galleryItem}>
              <Plate
                label="Social Media Content"
                value="Betterfly social media asset 2"
                aspect="aspect-square"
              >
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/cccf2a57-e137-49db-b68b-570f7e4fe7bb_rw_600.png?h=c478a37e18d4ff133ffe947f26345c64"
                  alt="Betterfly social media asset 2"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </Plate>
            </m.div>
          </div>

          {/* Pair: social media assets 3 + 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            <m.div variants={galleryItem}>
              <Plate
                label="Social Media Content"
                value="Betterfly social media asset 3"
                aspect="aspect-square"
              >
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/e854902b-d6b9-4da5-af46-a70b99f340c9_rw_1200.png?h=e07b0dc8c60685b5d414767e27915bfe"
                  alt="Betterfly social media asset 3"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </Plate>
            </m.div>
            <m.div variants={galleryItem}>
              <Plate
                label="Social Media Content"
                value="Betterfly social media asset 4"
                aspect="aspect-square"
              >
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/bc6dcbf4-5941-4a5b-9eaf-ec3f35d31163_rw_1200.png?h=60a8aa2806584e03b80f08b765317b22"
                  alt="Betterfly social media asset 4"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </Plate>
            </m.div>
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
          className="mb-14"
        >
          <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue mb-4">
            The Result
          </p>
          <h2 className="font-headline text-heading-lg font-normal text-bone">
            Global presence, zero logistics
          </h2>
        </m.div>

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[820px]"
        >
          <p className="font-headline text-heading-sm font-normal text-bone">
            {results[0]}
          </p>

          {/* TODO(David): add quantified result or client quote here */}

          <ul className="mt-16 max-w-[640px] border-t border-ash-border">
            {results.slice(1).map((result) => (
              <li
                key={result}
                className="border-b border-ash-border py-6 font-body text-body-sm font-normal text-bone"
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
          className="mb-14"
        >
          <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue mb-4">
            Tools & Technology
          </p>
          <h2 className="font-headline text-heading-lg font-normal text-bone">
            The production stack
          </h2>
        </m.div>

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[640px] border-t border-ash-border"
        >
          {tools.map((tool) => (
            <div key={tool.name} className="border-b border-ash-border py-8">
              <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue">
                {tool.name}
              </p>
              <p className="mt-3 font-body text-body-sm font-normal text-bone">
                {tool.description}
              </p>
            </div>
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
          <h2 className="font-headline text-heading-lg font-normal text-bone mb-6">
            Ready to make a global statement?
          </h2>
          <p className="font-body text-body-sm font-normal text-fog-blue mb-10">
            Let&rsquo;s create campaign content that commands attention and
            breaks through the noise, no logistics required.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link href="/#contact" className="btn-primary">
              Book a Call
            </Link>
            <Link
              href="/projects/new-era-cap"
              className="btn-secondary group gap-2"
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
