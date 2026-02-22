"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import TiltCard from "@/components/TiltCard";
import HolographicSheen from "@/components/HolographicSheen";
import DistortionCard from "@/components/DistortionCard";

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
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
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
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BetterflyProject() {
  return (
    <article className="bg-deep-space min-h-screen" style={{ backgroundColor: "#0B0F19" }}>
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
        {/* GIF cover image */}
        <div className="absolute inset-0">
          <Image
            src="https://media.giphy.com/media/OWRTtgINto81tGKtJi/giphy.gif"
            alt="Betterfly FOOH campaign VFX scene"
            fill
            className="object-cover"
            unoptimized
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/30" />

        {/* Radial fade at bottom */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-deep-space via-deep-space/40 to-transparent" />

        {/* Floating geometric accents */}
        <div className="absolute top-1/4 left-1/3 w-44 h-44 border border-white/[0.06] rounded-full animate-pulse z-[2]" />
        <div className="absolute bottom-1/3 right-1/4 w-20 h-20 border border-white/10 rounded-xl rotate-[18deg] z-[2]" />
        <div className="absolute top-1/3 left-1/5 w-3 h-3 bg-white/20 rounded-full z-[2]" />
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-white/10 rounded-full z-[2]" />

        <div className="section-container relative z-10 pb-16 md:pb-24 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-white/70 mb-4 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm bg-white/5">
              VFX + FOOH Campaign
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4"
          >
            BETTERFLY
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-2xl md:text-3xl lg:text-4xl font-medium text-white/80 tracking-tight"
          >
            #RecursosMasHumanos FOOH Campaign
          </motion.p>

          {/* Animated line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-emerald-400 to-teal-400 mt-8"
          />
        </div>
      </section>

      {/* ── Overview Sidebar + Challenge ──────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#0B0F19" }}>
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
                <p className="font-mono text-xs tracking-widest uppercase text-emerald-400 mb-2">
                  Client
                </p>
                <p className="font-headline text-lg font-semibold text-pure-white">
                  {overview.client}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-emerald-400 mb-2">
                  Industry
                </p>
                <p className="font-body text-cool-gray">
                  {overview.industry}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-emerald-400 mb-2">
                  Timeline
                </p>
                <p className="font-body text-cool-gray">
                  {overview.timeline}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-emerald-400 mb-2">
                  Services
                </p>
                <ul className="space-y-2">
                  {overview.services.map((service) => (
                    <li
                      key={service}
                      className="flex items-center gap-3 font-body text-sm text-cool-gray"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
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
            <p className="font-mono text-sm text-emerald-400 tracking-widest uppercase mb-4">
              The Challenge
            </p>
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-8">
              Global out-of-home impact{" "}
              <span className="gradient-text">without the logistics</span>
            </h2>
            <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
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
          </motion.div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Our Approach ─────────────────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#0B0F19" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-emerald-400 tracking-widest uppercase mb-4">
            Our Approach
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            From monuments to feeds{" "}
            <span className="gradient-text">in five steps</span>
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
                <span className="font-mono text-3xl md:text-4xl font-bold text-emerald-400/30 group-hover:text-emerald-400 transition-colors duration-500">
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
      <section className="section-container section-padding" style={{ backgroundColor: "#0B0F19" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-4xl"
        >
          <p className="font-mono text-sm text-emerald-400 tracking-widest uppercase mb-4">
            The Solution
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Fake out-of-home,{" "}
            <span className="gradient-text">real impact</span>
          </h2>
          <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
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
        </motion.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Campaign Gallery ────────────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#0B0F19" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-emerald-400 tracking-widest uppercase mb-4">
            Campaign Gallery
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            Monument <span className="gradient-text">Executions</span>
          </h2>
        </motion.div>

        <motion.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6"
        >
          {/* Row 1: Wide hero + tall side */}
          <motion.div variants={galleryItem} className="md:col-span-7">
            <TiltCard className="aspect-[16/10] rounded-2xl overflow-hidden relative group">
              <HolographicSheen className="!absolute inset-0">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/afa1b619-7f85-4631-b906-65725f2afb1d_rw_3840.jpg?h=c011327012d82e389e6536546dad732a"
                  alt="Betterfly FOOH monument execution 1"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </HolographicSheen>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-emerald-400/20 transition-colors duration-500 pointer-events-none" />
            </TiltCard>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-5">
            <DistortionCard>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden relative group">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/0c4aae34-962c-4708-9e09-10d7c2270b0d_rw_3840.jpg?h=9486e194d38c38c0b70c1ffc7e317fcd"
                  alt="Betterfly FOOH monument execution 2"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-emerald-400/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </DistortionCard>
          </motion.div>

          {/* Row 2: Three equal columns */}
          <motion.div variants={galleryItem} className="md:col-span-4">
            <TiltCard className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/86e3da3a-6b51-4572-94f5-260d6a761c0f_rw_3840.jpg?h=9b9f844be5ce86bd5089282e90bddbea"
                alt="Betterfly FOOH monument execution 3"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-emerald-400/20 transition-colors duration-500 pointer-events-none" />
            </TiltCard>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-4">
            <HolographicSheen>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/700cdcee-cf9b-4414-b54c-82e507d0ed53_rw_3840.jpg?h=ad51ee0c19861e16fffbd807aa14d780"
                  alt="Betterfly FOOH monument execution 4"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-emerald-400/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </HolographicSheen>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-4">
            <DistortionCard>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/158c693d-d708-434a-8451-47c529b3cc20_rw_3840.jpg?h=a7b17b9dff25de2b80d8d8cdfeb196cc"
                  alt="Betterfly FOOH monument execution 5"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-emerald-400/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </DistortionCard>
          </motion.div>

          {/* Row 3: Full-width VFX breakdown */}
          <motion.div variants={galleryItem} className="md:col-span-12">
            <TiltCard className="aspect-[21/9] rounded-2xl overflow-hidden relative group">
              <HolographicSheen className="!absolute inset-0">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/e9307a9f-c204-4722-9a9f-4d5b3113db28_rw_3840.jpg?h=72945d2944442b86cf4ba4dc3f52f58b"
                  alt="Betterfly FOOH VFX breakdown"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </HolographicSheen>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-emerald-400/20 transition-colors duration-500 pointer-events-none" />
            </TiltCard>
          </motion.div>

          {/* Row 4: Social media assets — 2x2 grid */}
          <motion.div variants={galleryItem} className="md:col-span-3">
            <TiltCard className="aspect-square rounded-2xl overflow-hidden relative group">
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/d06fd2d0-9618-4b28-a9ca-e2a56de0f9cc_rw_600.png?h=840f98de7ce65d2053f15fc1a332bb28"
                alt="Betterfly social media asset 1"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-emerald-400/20 transition-colors duration-500 pointer-events-none" />
            </TiltCard>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-3">
            <DistortionCard>
              <div className="aspect-square rounded-2xl overflow-hidden relative group">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/cccf2a57-e137-49db-b68b-570f7e4fe7bb_rw_600.png?h=c478a37e18d4ff133ffe947f26345c64"
                  alt="Betterfly social media asset 2"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-emerald-400/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </DistortionCard>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-3">
            <HolographicSheen>
              <div className="aspect-square rounded-2xl overflow-hidden relative group">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/e854902b-d6b9-4da5-af46-a70b99f340c9_rw_1200.png?h=e07b0dc8c60685b5d414767e27915bfe"
                  alt="Betterfly social media asset 3"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-emerald-400/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </HolographicSheen>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-3">
            <TiltCard className="aspect-square rounded-2xl overflow-hidden relative group">
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/bc6dcbf4-5941-4a5b-9eaf-ec3f35d31163_rw_1200.png?h=60a8aa2806584e03b80f08b765317b22"
                alt="Betterfly social media asset 4"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-emerald-400/20 transition-colors duration-500 pointer-events-none" />
            </TiltCard>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── The Result ───────────────────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#0B0F19" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-emerald-400 tracking-widest uppercase mb-4">
            The Result
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            Global presence,{" "}
            <span className="gradient-text">zero logistics</span>
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
              className="flex items-start gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-emerald-400/20 hover:bg-emerald-400/[0.03] transition-all duration-500"
            >
              <svg
                className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5"
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
      <section className="section-container section-padding" style={{ backgroundColor: "#0B0F19" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-emerald-400 tracking-widest uppercase mb-4">
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={staggerItem}
              className="group p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:border-emerald-400/20 hover:bg-emerald-400/[0.03] transition-all duration-500"
            >
              <h3 className="font-headline text-lg font-bold text-pure-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
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
      <section className="section-container section-padding" style={{ backgroundColor: "#0B0F19" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Ready to make{" "}
            <span className="gradient-text">a global statement</span>?
          </h2>
          <p className="font-body text-cool-gray text-base md:text-lg leading-relaxed mb-10">
            Let&rsquo;s create campaign content that commands attention and
            breaks through the noise, no logistics required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact" className="btn-primary">
              Start Your Project
            </Link>
            <Link
              href="/projects/new-era-cap"
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
