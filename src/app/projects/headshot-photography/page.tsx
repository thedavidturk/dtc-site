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
  client: "Weinstein Legal",
  industry: "Legal / Professional Services",
  timeline: "On Location",
  services: [
    "Professional Headshots",
    "Lifestyle Photography",
    "Brand-Aligned Color Grading",
    "Retouching & Post-Production",
    "On-Location Direction",
  ],
};

const approach = [
  {
    step: "01",
    title: "Reading the Brand",
    description:
      "Weinstein Legal needed fresh, professional, and engaging media for their digital platform. The goal was to capture the essence of their brand identity and reflect it in headshots and lifestyle images that embody the firm's ethos and commitment to their clients.",
  },
  {
    step: "02",
    title: "Scouting the Spaces",
    description:
      "The shoot took place across various locations within Weinstein Legal's offices, chosen specifically for their aesthetic alignment with the firm's branding and the natural lighting conditions they provided. Each room shaped how the team and the light could work together.",
  },
  {
    step: "03",
    title: "Power and Warmth",
    description:
      "For the headshots, we sought to capture both the power and the warmth in each subject, taking time to ensure everyone felt comfortable and confident in front of the lens. The aim throughout was to balance professionalism with a personable, approachable vibe.",
  },
  {
    step: "04",
    title: "An Authentic Workday",
    description:
      "The lifestyle photoshoot captured candid and staged shots of the team in their natural work environment, presenting an authentic image of the firm's day-to-day operations. These images offer potential clients an insider's view, creating a sense of trust and transparency.",
  },
  {
    step: "05",
    title: "Polished in Post",
    description:
      "Adobe Lightroom handled initial processing and global edits, with color grading tuned to align the palette with Weinstein Legal's brand identity. Adobe Photoshop carried the detailed retouching: skin, stray hair, and background distractions managed so each photo stayed natural yet polished.",
  },
];

const tools = [
  {
    name: "Canon 5D Mark IV",
    description:
      "A full-frame professional DSLR renowned for its versatility and high-quality output. Its excellent low-light performance was crucial indoors, letting natural light carry the organic ambience of the workplace.",
  },
  {
    name: "Adobe Lightroom",
    description:
      "Used for initial processing and global edits. Advanced color grading tools enhanced the mood of the images and aligned the color palette with the firm's brand identity.",
  },
  {
    name: "Adobe Photoshop",
    description:
      "The go-to for detailed retouching: precise edits and clean-up, skin retouching, stray hair cleanup, and background distraction removal, all while preserving the integrity of each image.",
  },
  {
    name: "Natural Light Direction",
    description:
      "Window light and office interiors were read and shaped on location, keeping subjects comfortable and confident while holding the authentic feel of their everyday environment.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function HeadshotPhotographyProject() {
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
        {/* Cover image */}
        <div className="absolute inset-0">
          <Image
            src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/1c247dfc-4517-4ffa-8a5d-07480a76ae38_rw_1920.jpg?h=1a066f35508b4b65d958711c6163af65"
            alt="Weinstein Legal team lifestyle photography"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />

        {/* Radial fade at bottom */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-deep-space via-deep-space/40 to-transparent" />

        {/* Floating geometric accents */}
        <div className="absolute top-1/4 left-1/5 w-32 h-32 border border-white/[0.06] rounded-full animate-pulse z-[2]" />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 border border-white/10 rounded-xl rotate-12 z-[2]" />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-white/20 rounded-full z-[2]" />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-white/10 rounded-full z-[2]" />

        <div className="section-container relative z-10 pb-16 md:pb-24 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-white/70 mb-4 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm bg-white/5">
              Headshot + Lifestyle Photography
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4"
          >
            HEADSHOT &amp; LIFESTYLE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-2xl md:text-3xl lg:text-4xl font-medium text-white/80 tracking-tight"
          >
            Power and Warmth for Weinstein Legal
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
                  Format
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
              The Brief
            </p>
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-8">
              Capturing a firm&rsquo;s{" "}
              <span className="gradient-text">identity in a frame</span>
            </h2>
            <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
              <p>
                For this project, I had the pleasure of collaborating with
                Weinstein Legal, a distinguished legal firm requiring fresh,
                professional, and engaging media for their digital platform. The
                task was to capture the essence of their brand identity and
                reflect it in professional headshots and lifestyle images.
              </p>
              <p>
                Every frame had to embody the firm&rsquo;s ethos and commitment to
                their clients. We approached each shoot with the aim of balancing
                professionalism with a personable, approachable vibe, presenting
                the team as both capable and human.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── The Process ──────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-amber-400 tracking-widest uppercase mb-4">
            The Process
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            From scouting to{" "}
            <span className="gradient-text">final frame</span>
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

      {/* ── Gallery ──────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-amber-400 tracking-widest uppercase mb-4">
            The Gallery
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            Headshots, lifestyle &{" "}
            <span className="gradient-text">the workday</span>
          </h2>
        </motion.div>

        <motion.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6"
        >
          {/* Row 1 - wide + tall portrait */}
          <motion.div variants={galleryItem} className="md:col-span-7">
            <DistortionCard>
              <TiltCard className="aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                <div className="relative w-full h-full">
                  <Image
                    src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/1e2b3b12-2487-42f1-aa7c-96692f51fd05_rw_1920.jpg?h=e954cd290e7b9df98e9a233108a204ff"
                    alt="Weinstein Legal team in their office environment"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 58vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </TiltCard>
            </DistortionCard>
          </motion.div>

          <motion.div variants={galleryItem} className="md:col-span-5">
            <HolographicSheen>
              <TiltCard className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                <div className="relative w-full h-full">
                  <Image
                    src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/2d84270c-36e9-4adb-8b6f-0d0908968d51_rw_1920.jpg?h=f22aa960a88d7a4110973ede97c764eb"
                    alt="Professional headshot portrait"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 42vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </TiltCard>
            </HolographicSheen>
          </motion.div>

          {/* Row 2 - three equal columns */}
          <motion.div variants={galleryItem} className="md:col-span-4">
            <HolographicSheen>
              <TiltCard className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                <div className="relative w-full h-full">
                  <Image
                    src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/2f5c43d5-75c5-4162-a67e-3ce1882c22be_rw_1920.jpg?h=0a0ffe1441c8ea628cd07eb0f8651c05"
                    alt="Headshot with natural office light"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 32vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </TiltCard>
            </HolographicSheen>
          </motion.div>

          <motion.div variants={galleryItem} className="md:col-span-4">
            <TiltCard className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
              <div className="relative w-full h-full">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/407fc56a-106d-4bc5-9ce5-10ff52c56ae9_rw_1920.jpg?h=9f18ebe51d43cadcd14cca88d9871e9a"
                  alt="Professional portrait of a team member"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 32vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </TiltCard>
          </motion.div>

          <motion.div variants={galleryItem} className="md:col-span-4">
            <DistortionCard>
              <TiltCard className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                <div className="relative w-full h-full">
                  <Image
                    src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/41c37481-2971-4086-9e40-730063f6564f_rw_1920.jpg?h=f2ef8edfa46c4f9784e6f20a465a4986"
                    alt="Confident headshot portrait"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 32vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </TiltCard>
            </DistortionCard>
          </motion.div>

          {/* Row 3 - offset editorial pair */}
          <motion.div variants={galleryItem} className="md:col-span-6">
            <TiltCard maxTilt={10} className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
              <div className="relative w-full h-full">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/472f517a-4832-4d80-9968-0e41513e9e2a_rw_1920.jpg?h=0318f08e7d964bc475b0bd09e18329cd"
                  alt="Lifestyle shot of the team at work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 49vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </TiltCard>
          </motion.div>

          <motion.div variants={galleryItem} className="md:col-span-6">
            <DistortionCard>
              <TiltCard className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                <div className="relative w-full h-full">
                  <Image
                    src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/51535f4a-142f-4e42-80b6-f4b32f09afc9_rw_1920.jpg?h=298381626fe5ee7c7a706c2b0bd0e127"
                    alt="Candid moment in the office"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 49vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </TiltCard>
            </DistortionCard>
          </motion.div>

          {/* Row 4 - three portraits */}
          <motion.div variants={galleryItem} className="md:col-span-4">
            <DistortionCard>
              <TiltCard className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                <div className="relative w-full h-full">
                  <Image
                    src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/5efc40ee-d234-416a-bb8a-2b949fca89f0_rw_1920.jpg?h=01991aecd660f4748cc54b8fc0b6544e"
                    alt="Professional headshot of a team member"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 32vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </TiltCard>
            </DistortionCard>
          </motion.div>

          <motion.div variants={galleryItem} className="md:col-span-4">
            <HolographicSheen>
              <TiltCard className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                <div className="relative w-full h-full">
                  <Image
                    src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/71ba8465-d771-475e-8db0-419dfbc523e3_rw_1920.jpg?h=414b7870e28375c9b5b053e4c0707b1b"
                    alt="Approachable portrait with warm tone"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 32vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </TiltCard>
            </HolographicSheen>
          </motion.div>

          <motion.div variants={galleryItem} className="md:col-span-4">
            <TiltCard className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
              <div className="relative w-full h-full">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/7399ecfc-d9fb-4210-a7fb-46ea7dd4dafa_rw_1920.jpg?h=e9850bf5448c9bc399dbfb0548507d43"
                  alt="Studio-quality portrait on location"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 32vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </TiltCard>
          </motion.div>

          {/* Row 5 - wide lifestyle + portrait */}
          <motion.div variants={galleryItem} className="md:col-span-7">
            <DistortionCard>
              <TiltCard className="aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                <div className="relative w-full h-full">
                  <Image
                    src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/7c514a1b-8b3c-4fdb-974c-3cfa075e4eff_rw_1920.jpg?h=af838a327a44ea45a04cd4ec025ccf3a"
                    alt="The team in their natural work environment"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 58vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </TiltCard>
            </DistortionCard>
          </motion.div>

          <motion.div variants={galleryItem} className="md:col-span-5">
            <HolographicSheen>
              <TiltCard className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                <div className="relative w-full h-full">
                  <Image
                    src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/8890784c-e2ca-442d-9f83-9191f8a1884a_rw_1920.jpg?h=d896550f4e9eafb017f555f04de0c7a8"
                    alt="Headshot with brand-aligned color grade"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 42vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </TiltCard>
            </HolographicSheen>
          </motion.div>

          {/* Row 6 - three portraits */}
          <motion.div variants={galleryItem} className="md:col-span-4">
            <HolographicSheen>
              <TiltCard className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                <div className="relative w-full h-full">
                  <Image
                    src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/94fe0e0b-f765-41d6-b9c2-a7a430d2cb57_rw_1920.jpg?h=93a0128458df15a1b2c3fdaed668e5d9"
                    alt="Polished professional portrait"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 32vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </TiltCard>
            </HolographicSheen>
          </motion.div>

          <motion.div variants={galleryItem} className="md:col-span-4">
            <DistortionCard>
              <TiltCard className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                <div className="relative w-full h-full">
                  <Image
                    src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/95da03ad-5ec1-4619-9ddb-289642b1a2e7_rw_1920.jpg?h=bd0438300075b910e9f90dfe9cdf13df"
                    alt="Confident headshot of a team member"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 32vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </TiltCard>
            </DistortionCard>
          </motion.div>

          <motion.div variants={galleryItem} className="md:col-span-4">
            <TiltCard className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
              <div className="relative w-full h-full">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/963af75d-7222-474c-abf0-d0cc4e14677e_rw_1920.jpg?h=ab3a0b3bd3946d8e0662fa693d07440a"
                  alt="Natural, brand-aligned headshot"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 32vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </TiltCard>
          </motion.div>

          {/* Row 7 - editorial pair */}
          <motion.div variants={galleryItem} className="md:col-span-6">
            <DistortionCard>
              <TiltCard className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                <div className="relative w-full h-full">
                  <Image
                    src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/b6f30d97-6ee0-4dd7-acb7-5cd5cec9c0eb_rw_1920.jpg?h=e54dcd96d7419c2786a5fe5e250968be"
                    alt="Lifestyle photography of the firm at work"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 49vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </TiltCard>
            </DistortionCard>
          </motion.div>

          <motion.div variants={galleryItem} className="md:col-span-6">
            <HolographicSheen>
              <TiltCard maxTilt={10} className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                <div className="relative w-full h-full">
                  <Image
                    src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/e2eb8e59-810a-4e33-9d31-b9e778b5165a_rw_1920.jpg?h=3f2090676cc052039991eeb6842b5f2f"
                    alt="Candid lifestyle moment in the office"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 49vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </TiltCard>
            </HolographicSheen>
          </motion.div>

          {/* Row 8 - full-width closer */}
          <motion.div variants={galleryItem} className="md:col-span-12">
            <DistortionCard>
              <TiltCard maxTilt={6} className="aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                <div className="relative w-full h-full">
                  <Image
                    src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/f5e1aa32-b960-4907-b7f3-2c7774e21ed7_rw_1920.jpg?h=ee933b6310e5bc7abbe852ffaae94a80"
                    alt="Wide lifestyle photograph of the Weinstein Legal team"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              </TiltCard>
            </DistortionCard>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Tools & Technique ─────────────────────────────────────── */}
      <section className="section-container section-padding">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-amber-400 tracking-widest uppercase mb-4">
            Tools &amp; Technique
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            Natural yet <span className="gradient-text">polished</span>
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
            Need photography that{" "}
            <span className="gradient-text">reflects your brand</span>?
          </h2>
          <p className="font-body text-cool-gray text-base md:text-lg leading-relaxed mb-10">
            Let&rsquo;s capture your team in a light that feels authentic,
            professional, and unmistakably yours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact" className="btn-primary">
              Book a Shoot
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
