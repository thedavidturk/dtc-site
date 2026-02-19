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
  client: "The Hospitality Mentor",
  industry: "Hospitality / Culinary",
  timeline: "3 Weeks",
  services: [
    "Cinematic Video Production",
    "Documentary-Style Direction",
    "Food Cinematography",
    "Post-Production & VFX",
    "4K Delivery",
  ],
};

const approach = [
  {
    step: "01",
    title: "Cinematic Food Cinematography",
    description:
      "Leveraged the Canon C70 cinema camera's high dynamic range to capture every texture, color, and detail of the omakase dishes. Each plate was treated as its own visual composition — lit and framed to evoke the artistry behind the cuisine.",
  },
  {
    step: "02",
    title: "Documentary-Style Handheld Filming",
    description:
      "Moved through the live kitchen environment with handheld cinematography, using the C70's Dual Gain Output sensor to maintain broadcast-quality imagery in challenging, low-light conditions. The result is raw authenticity paired with cinematic polish.",
  },
  {
    step: "03",
    title: "Narrative Structure & Editorial",
    description:
      "Structured the episode's narrative flow in Adobe Premiere Pro, weaving together the chef's craft, the guest experience, and the atmosphere of Faena Miami Beach into a cohesive story that unfolds like a short film.",
  },
  {
    step: "04",
    title: "Motion Graphics & Visual Effects",
    description:
      "Added elegant motion graphics and subtle visual effects in Adobe After Effects to enhance transitions, introduce segments, and reinforce the premium aesthetic without overshadowing the organic storytelling.",
  },
  {
    step: "05",
    title: "4K Mastering & Delivery",
    description:
      "Mastered the final cut in full 4K resolution to preserve every sensory detail — from the glistening surface of fresh sashimi to the ambient glow of the dining room. Delivered optimized assets for digital distribution.",
  },
];

const results = [
  "Sensory-driven episode placing viewers inside an upscale omakase experience",
  "Cinematic quality achieved in a live, uncontrolled environment",
  "Blended Faena Miami Beach's luxury aesthetic with culinary craftsmanship",
  "Documentary authenticity paired with feature-film visual storytelling",
  "Full 4K delivery for immersive detail across digital platforms",
];

const tools = [
  {
    name: "Canon C70",
    description:
      "Cinema camera with Dual Gain Output sensor for high dynamic range capture in challenging lighting conditions.",
  },
  {
    name: "Adobe Premiere Pro",
    description:
      "Editorial assembly, narrative structuring, pacing, and color grading for the final episode.",
  },
  {
    name: "Adobe After Effects",
    description:
      "Motion graphics, visual effects, transitions, and title design for premium presentation.",
  },
  {
    name: "4K Pipeline",
    description:
      "End-to-end 4K production workflow from capture through final delivery for maximum visual fidelity.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ElSecretoProject() {
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
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-warm-coral via-amber-500 to-red-700" />

        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />

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
              Cinematic Video Production
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4"
          >
            EL SECRETO
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-2xl md:text-3xl lg:text-4xl font-medium text-white/80 tracking-tight"
          >
            Savoring the Unseen
          </motion.p>

          {/* Animated line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-warm-coral to-amber-400 mt-8"
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
                <p className="font-mono text-xs tracking-widest uppercase text-warm-coral mb-2">
                  Client
                </p>
                <p className="font-headline text-lg font-semibold text-pure-white">
                  {overview.client}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-warm-coral mb-2">
                  Industry
                </p>
                <p className="font-body text-cool-gray">
                  {overview.industry}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-warm-coral mb-2">
                  Timeline
                </p>
                <p className="font-body text-cool-gray">
                  {overview.timeline}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-warm-coral mb-2">
                  Services
                </p>
                <ul className="space-y-2">
                  {overview.services.map((service) => (
                    <li
                      key={service}
                      className="flex items-center gap-3 font-body text-sm text-cool-gray"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-warm-coral flex-shrink-0" />
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
            <p className="font-mono text-sm text-warm-coral tracking-widest uppercase mb-4">
              The Challenge
            </p>
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-8">
              Capturing culinary artistry{" "}
              <span className="gradient-text">in a live environment</span>
            </h2>
            <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
              <p>
                The Hospitality Mentor needed a cinematic episode documenting an
                exclusive omakase dining experience at Faena Miami Beach — one of
                the most prestigious hotel properties in the world. The content
                had to convey the intimacy, craftsmanship, and sensory richness
                of the experience while maintaining the luxury aesthetic of the
                venue.
              </p>
              <p>
                The challenge: capture broadcast-quality footage in a live,
                uncontrolled kitchen and dining environment. Low light, tight
                spaces, constant movement, and no ability to reset or reshoot.
                Every moment was one take — the cinematography had to be both
                documentary-authentic and cinematic-premium simultaneously.
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
          <p className="font-mono text-sm text-warm-coral tracking-widest uppercase mb-4">
            Our Approach
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            From kitchen to screen{" "}
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
                <span className="font-mono text-3xl md:text-4xl font-bold text-warm-coral/30 group-hover:text-warm-coral transition-colors duration-500">
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
          <p className="font-mono text-sm text-warm-coral tracking-widest uppercase mb-4">
            The Solution
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Documentary soul,{" "}
            <span className="gradient-text">cinematic craft</span>
          </h2>
          <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
            <p>
              Using the Canon C70 cinema camera, we captured every moment of the
              omakase experience with documentary intimacy and cinematic
              precision. The camera&rsquo;s Dual Gain Output sensor allowed us to
              work in the ambient light of the kitchen and dining room — no
              additional lighting rigs, no disruption to the experience — while
              maintaining the dynamic range and color depth of a controlled studio
              shoot.
            </p>
            <p>
              The result is an episode that feels like you&rsquo;re sitting at the
              counter yourself. Every slice, every sear, every plating gesture is
              captured in 4K detail. The editorial narrative weaves together the
              chef&rsquo;s artistry, the guest experience, and the luxury atmosphere
              of Faena Miami Beach into a sensory-driven story that transcends
              typical food content.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Video ───────────────────────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#0B0F19" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-10"
        >
          <p className="font-mono text-sm text-warm-coral tracking-widest uppercase mb-4">
            The Film
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            Savoring the Unseen — <span className="gradient-text">Full Episode</span>
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Ambient glow behind the video */}
          <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-r from-warm-coral/10 via-amber-500/5 to-red-700/10 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

          {/* Video container */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
            {/* Corner accent brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-warm-coral/40 rounded-tl-2xl z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-warm-coral/40 rounded-tr-2xl z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-warm-coral/40 rounded-bl-2xl z-10 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-warm-coral/40 rounded-br-2xl z-10 pointer-events-none" />

            {/* 16:9 aspect ratio wrapper */}
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src="https://www.youtube-nocookie.com/embed/l5h79VGqVSg?rel=0&modestbranding=1&color=white"
                title="El Secreto — Savoring the Unseen"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* Scan line overlay for cinematic feel */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03] z-10"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
              }}
            />
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
          <p className="font-mono text-sm text-warm-coral tracking-widest uppercase mb-4">
            Campaign Gallery
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            Savoring <span className="gradient-text">Every Detail</span>
          </h2>
        </motion.div>

        <motion.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6"
        >
          {/* Row 1: Full-width hero */}
          <motion.div variants={galleryItem} className="md:col-span-12">
            <TiltCard className="aspect-[21/9] rounded-2xl overflow-hidden relative group">
              <HolographicSheen className="!absolute inset-0">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/2b30b8bf-b3fd-43fd-b242-1fc4736e6946_rw_3840.png?h=de0ce295ccfda4a8762ce19708703262"
                  alt="El Secreto omakase cinematic still 1"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </HolographicSheen>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
            </TiltCard>
          </motion.div>

          {/* Row 2: Wide + tall */}
          <motion.div variants={galleryItem} className="md:col-span-7">
            <DistortionCard>
              <div className="aspect-[16/10] rounded-2xl overflow-hidden relative group">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/24b244e3-b83b-4b7a-baf5-c6b8b65e4475_rw_3840.png?h=99f746c5ced60dde7de6ce105d8562a5"
                  alt="El Secreto omakase cinematic still 2"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </DistortionCard>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-5">
            <TiltCard className="aspect-[3/4] rounded-2xl overflow-hidden relative group">
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/30be6f9c-e1f9-47e2-86a9-6e7c05d3461d_rw_3840.png?h=202bc393101a46898c0ebd5c84062caa"
                alt="El Secreto omakase cinematic still 3"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
            </TiltCard>
          </motion.div>

          {/* Row 3: Three equal columns */}
          <motion.div variants={galleryItem} className="md:col-span-4">
            <HolographicSheen>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/bdd74e73-998e-4882-8a91-8c3ce1487e32_rw_3840.png?h=4a6b1eb3c72cd77ed660dd55224c5899"
                  alt="El Secreto omakase cinematic still 4"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </HolographicSheen>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-4">
            <TiltCard className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/6b90fc91-2a17-4373-a58a-4dc68aacbfff_rw_3840.png?h=eb8e89cc54173ba379375ea0788697b0"
                alt="El Secreto omakase cinematic still 5"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
            </TiltCard>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-4">
            <DistortionCard>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/72f388ff-6ed0-4b8e-8088-1d696ef1bf15_rw_3840.png?h=56fde8ff61d535628929d86d9c1c353e"
                  alt="El Secreto omakase cinematic still 6"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </DistortionCard>
          </motion.div>

          {/* Row 4: Asymmetric pair */}
          <motion.div variants={galleryItem} className="md:col-span-5">
            <TiltCard className="aspect-[3/4] rounded-2xl overflow-hidden relative group">
              <HolographicSheen className="!absolute inset-0">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/fb88a0b8-75ef-49b6-90b8-2c12f7dc6318_rw_3840.png?h=7368e43c6bb7ee0e6895275a50d7f0bf"
                  alt="El Secreto omakase cinematic still 7"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </HolographicSheen>
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
            </TiltCard>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-7">
            <DistortionCard>
              <div className="aspect-[16/10] rounded-2xl overflow-hidden relative group">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/afb6b9e1-83e4-454f-9101-4d6dfc55a1ed_rw_3840.png?h=3d167587d6ac1952d9ad386620d9459c"
                  alt="El Secreto omakase cinematic still 8"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </DistortionCard>
          </motion.div>

          {/* Row 5: Three equal columns */}
          <motion.div variants={galleryItem} className="md:col-span-4">
            <DistortionCard>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/f05ee96a-032f-4dff-9495-61defe3508c4_rw_3840.png?h=c9b6cc64c72f7eb987304990567a9d2b"
                  alt="El Secreto omakase cinematic still 9"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </DistortionCard>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-4">
            <HolographicSheen>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/684bd88c-a12a-43f0-8c86-42513107abef_rw_3840.png?h=6cc869a96a4b5566dde315e9d9d0cc25"
                  alt="El Secreto omakase cinematic still 10"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </HolographicSheen>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-4">
            <TiltCard className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/6e5a427f-3801-426f-838a-f97c0467e240_rw_3840.png?h=2a531adc8de1e7c1047d3fac08665657"
                alt="El Secreto omakase cinematic still 11"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
            </TiltCard>
          </motion.div>

          {/* Row 6: Wide cinematic + narrow */}
          <motion.div variants={galleryItem} className="md:col-span-8">
            <TiltCard className="aspect-[16/9] rounded-2xl overflow-hidden relative group">
              <HolographicSheen className="!absolute inset-0">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/b07529cf-7338-4033-b7f3-ed2338735f32_rw_3840.png?h=d7969ee36bbfa2b38d252720de936370"
                  alt="El Secreto omakase cinematic still 12"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </HolographicSheen>
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
            </TiltCard>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-4">
            <DistortionCard>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden relative group">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/10da8fa1-c7ba-479a-94d7-ffe48c5a98b1_rw_3840.png?h=0ab7636ad107a1b53fd3cda3df1b19d9"
                  alt="El Secreto omakase cinematic still 13"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </DistortionCard>
          </motion.div>

          {/* Row 7: Three equal columns */}
          <motion.div variants={galleryItem} className="md:col-span-4">
            <HolographicSheen>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/5250cabf-bb36-4d03-8c07-0392c092b569_rw_3840.png?h=e383294d59703110b6434dc6a2fadef7"
                  alt="El Secreto omakase cinematic still 14"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </HolographicSheen>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-4">
            <TiltCard className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/2aa570be-ae99-42bd-940b-e71d8e921690_rw_3840.png?h=83ea0ac28d55d1476ef4923c6e0caa70"
                alt="El Secreto omakase cinematic still 15"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
            </TiltCard>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-4">
            <DistortionCard>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/f97d5232-2ffd-435a-a5b9-aff188149226_rw_3840.png?h=db99a24a6e8d32a253917d9b386fe2d3"
                  alt="El Secreto omakase cinematic still 16"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </DistortionCard>
          </motion.div>

          {/* Row 8: Asymmetric pair */}
          <motion.div variants={galleryItem} className="md:col-span-6">
            <TiltCard className="aspect-[16/10] rounded-2xl overflow-hidden relative group">
              <HolographicSheen className="!absolute inset-0">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/413be7b5-9592-43c1-8aa5-ccd1b202a4e7_rw_3840.png?h=09567a03c34e0ddb4f946ab2437980c5"
                  alt="El Secreto omakase cinematic still 17"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </HolographicSheen>
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
            </TiltCard>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-6">
            <DistortionCard>
              <div className="aspect-[16/10] rounded-2xl overflow-hidden relative group">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/a803fc78-3105-40fe-9681-ac2082b581bd_rw_3840.png?h=46f1734c03714d3e082846c2daf6c057"
                  alt="El Secreto omakase cinematic still 18"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </DistortionCard>
          </motion.div>

          {/* Row 9: Full-width closing */}
          <motion.div variants={galleryItem} className="md:col-span-12">
            <TiltCard className="aspect-[21/9] rounded-2xl overflow-hidden relative group">
              <HolographicSheen className="!absolute inset-0">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/8476057e-bafc-4c8d-9ce2-c66a58a59c00_rw_3840.png?h=50d3ee6ea0b7a45dbd5e35bcfb45ee14"
                  alt="El Secreto omakase cinematic closing still"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </HolographicSheen>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
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
          <p className="font-mono text-sm text-warm-coral tracking-widest uppercase mb-4">
            The Result
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            An immersive experience,{" "}
            <span className="gradient-text">captured in 4K</span>
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
              className="flex items-start gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-warm-coral/20 hover:bg-warm-coral/[0.03] transition-all duration-500"
            >
              <svg
                className="w-5 h-5 text-warm-coral flex-shrink-0 mt-0.5"
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
          <p className="font-mono text-sm text-warm-coral tracking-widest uppercase mb-4">
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
              className="group p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:border-warm-coral/20 hover:bg-warm-coral/[0.03] transition-all duration-500"
            >
              <h3 className="font-headline text-lg font-bold text-pure-white mb-2 group-hover:text-warm-coral transition-colors duration-300">
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
            Ready to tell{" "}
            <span className="gradient-text">your story cinematically</span>?
          </h2>
          <p className="font-body text-cool-gray text-base md:text-lg leading-relaxed mb-10">
            Let&rsquo;s create premium video content that captures the soul of
            your brand and commands attention.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact" className="btn-primary">
              Start Your Project
            </Link>
            <Link
              href="/projects/betterfly"
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
