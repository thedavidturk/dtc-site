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
  hidden: { opacity: 0, y: 50, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Image Assets (scraped from source portfolio)                       */
/* ------------------------------------------------------------------ */

const IMG = {
  hero:
    "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/064ef118-8ff6-403b-a0e4-51566918af93_rw_1920.png?h=bd78343154890b27219b81afe8e77b41",
  g1:
    "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/19d48a10-2986-4a15-a476-1c99707a61a9_rw_1920.png?h=8ff8ca268821df7e4d543d96b2f869f3",
  g2:
    "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/2a888a75-4520-498b-979c-aa2055dd9c69_rw_1920.png?h=3c9a6184704774149efc57a4ca36e171",
  g3:
    "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/2ef75978-54b0-48e3-8987-e06007432d5f_rw_1920.png?h=87a00194fd493a4dc4c31b64e264972a",
  g4:
    "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/3c8e3a05-a6ab-402c-8442-9a7ca628c16c_rw_1920.png?h=8c02bd4fc8375f3307dfd5eb7d6723d4",
  g5:
    "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/6bb93e9b-31d6-477a-868f-c599c8c6a32e_rw_1920.png?h=643d87e4412545ff4718c9db97fff932",
  g6:
    "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/91a8b41a-586c-4e28-bb43-c09a5ea9d45b_rw_1920.png?h=9cde059b21dc897b236f98f67d47cf63",
  g7:
    "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/97acbd50-569b-460b-8ece-e3e52a75b24b_rw_1920.png?h=6e68f6606a12c2d5470991488100ab08",
  g8:
    "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/cda7ce6b-d551-4675-9adc-aef14c296e9c_rw_1920.png?h=cd9cd1acd1e97e3551619bda8cb0a8a1",
  g9:
    "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/d2ad4c33-60ee-4d48-ae00-d1fdf08cab24_rw_1920.png?h=fa7a126a369172d8a44570287d37038a",
  g10:
    "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/fcd6b7ac-0ef9-4962-8003-0ef967e0cfd2_rw_1920.png?h=ec383158ba0eef0c8643567574c1cbdd",
  g11:
    "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/12fc8df4-1822-4164-8788-0c7fce2e1087_rw_1920.png?h=151b707f3768b2a8fe2b408fc4526d52",
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const overview = {
  client: "Brugal 1888 Rum",
  industry: "Spirits / Event Content",
  timeline: "Miami Concours 2023",
  services: [
    "Cinematic Videography",
    "Event Coverage",
    "4K Capture",
    "Editorial & Post-Production",
    "Brand Storytelling",
  ],
};

const approach = [
  {
    step: "01",
    title: "Understanding the Brief",
    description:
      "Brugal 1888 wanted its presence at the Miami Concours 2023 car show captured in a way that honored the brand. The goal was to fuse Brugal 1888's rich Dominican heritage with the high-end energy of the show floor, telling that story through moving image.",
  },
  {
    step: "02",
    title: "Shooting on the Canon C70",
    description:
      "Equipped with the Canon C70 Cinema Camera, I moved through the crowd to capture the event from the inside. The camera's wide dynamic range and robust color options made it possible to encapsulate the high-spirited nature of the room in a uniquely creative way.",
  },
  {
    step: "03",
    title: "Capturing in 4K",
    description:
      "The entire shoot was recorded in 4K high-resolution to realize the full potential of the C70. That attention to detail brought out the custom rum bottles and art installations, ensuring every delicate element was captured with the utmost clarity.",
  },
  {
    step: "04",
    title: "Editing the Story",
    description:
      "Post-production happened in Adobe Premiere Pro, where raw footage was cut, arranged, and refined frame by frame. The real magic of the edit was transforming live coverage into a cohesive cinematic story of the night Brugal 1888 hosted at the Concours.",
  },
  {
    step: "05",
    title: "Delivering the Narrative",
    description:
      "The finished piece is a visually compelling narrative of the Brugal 1888 event, blending storytelling with the power of visual aesthetics and giving the brand a vibrant, engaging asset to carry forward.",
  },
];

const results = [
  "A cinematic narrative of Brugal 1888 at Miami Concours 2023",
  "4K high-resolution footage that accentuated the custom rum bottles and art installations",
  "Dominican heritage fused with the vibrant energy of the Miami show floor",
  "Wide dynamic range and rich color grading captured on the Canon C70",
  "A polished, engaging brand film delivered through meticulous editing",
];

const capabilities = [
  {
    name: "Canon C70 Cinema Camera",
    description:
      "Wide dynamic range and robust color grading captured the high-spirited nature of the event in a uniquely creative manner.",
  },
  {
    name: "4K Capture",
    description:
      "The full shoot recorded in 4K high-resolution, bringing breathtaking clarity to the custom bottles and art installations.",
  },
  {
    name: "Adobe Premiere Pro",
    description:
      "Cutting, arranging, and refining footage frame by frame to transform raw coverage into a cohesive cinematic story.",
  },
  {
    name: "Brand Storytelling",
    description:
      "Blending the Dominican heritage of Brugal 1888 with the energy of Miami into an engaging, on-brand narrative.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BrugalRumProject() {
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
        {/* Cover image */}
        <div className="absolute inset-0">
          <Image
            src={IMG.hero}
            alt="Brugal Rum activation at Miami Concours 2023"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/45" />

        {/* Radial fade at bottom */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-deep-space via-deep-space/40 to-transparent" />

        {/* Floating geometric accents */}
        <div className="absolute top-1/4 left-1/5 w-36 h-36 border border-white/[0.06] rounded-full animate-pulse z-[2]" />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 border border-white/10 rounded-xl rotate-12 z-[2]" />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-warm-coral/40 rounded-full z-[2]" />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-white/10 rounded-full z-[2]" />

        <div className="section-container relative z-10 pb-16 md:pb-24 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-white/70 mb-4 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm bg-white/5">
              Event Videography
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4"
          >
            BRUGAL RUM
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-2xl md:text-3xl lg:text-4xl font-medium text-white/80 tracking-tight"
          >
            Miami Concours 2023
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
                <p className="font-body text-cool-gray">{overview.industry}</p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-warm-coral mb-2">
                  Event
                </p>
                <p className="font-body text-cool-gray">{overview.timeline}</p>
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
              Capturing a Caribbean spirit{" "}
              <span className="gradient-text">on a luxury show floor</span>
            </h2>
            <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
              <p>
                Brugal 1888 Rum approached us with a unique opportunity: capture
                their event held during the Miami Concours 2023 car show, an
                exhibition known for displaying high-end luxury vehicles and the
                fervor of automotive enthusiasts. The objective was to highlight
                the brand's presence and showcase the fusion of Brugal 1888's
                rich Dominican heritage with the vibrant energy of Miami.
              </p>
              <p>
                The challenge was to bring the dynamic essence of a live, fast
                moving event to life on screen. We needed to move through the
                crowd, work in changing light, and emphasize the custom rum
                bottles and art installations, all while producing footage
                polished enough to match the premium world the brand was standing
                inside.
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
            From show floor to{" "}
            <span className="gradient-text">cinematic cut</span>
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
            Storytelling through{" "}
            <span className="gradient-text">the lens</span>
          </h2>
          <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
            <p>
              We leaned on cinematography and editing to bring the dynamic essence
              of the event to life. Shooting on the Canon C70 Cinema Camera, a
              device renowned for its wide dynamic range and robust color grading,
              we delved into the crowd and captured the high-spirited nature of
              the night entirely in 4K high-resolution. That attention to detail
              emphasized the custom rum bottles and art installations, presenting
              every element with the utmost clarity.
            </p>
            <p>
              The real magic happened in post. Inside Adobe Premiere Pro, raw
              footage was cut, arranged, and refined frame by frame into a
              cohesive cinematic story. The finished project is a visually
              compelling narrative of Brugal 1888 at Miami Concours 2023, blending
              storytelling with the power of visual aesthetics to showcase the
              brand in a vibrant, engaging way.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Activation Gallery ──────────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#0B0F19" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-warm-coral tracking-widest uppercase mb-4">
            Activation Gallery
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            The bottles, the art &{" "}
            <span className="gradient-text">the energy</span>
          </h2>
        </motion.div>

        <motion.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6"
        >
          {/* Row 1 - full-width hero */}
          <motion.div variants={galleryItem} className="md:col-span-12">
            <TiltCard maxTilt={6} className="aspect-[21/9] rounded-2xl overflow-hidden relative group">
              <HolographicSheen className="!absolute inset-0">
                <Image
                  src={IMG.g1}
                  alt="Brugal Rum branded lounge at Miami Concours"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </HolographicSheen>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
            </TiltCard>
          </motion.div>

          {/* Row 2 - wide + tall */}
          <motion.div variants={galleryItem} className="md:col-span-7">
            <DistortionCard>
              <div className="aspect-[16/10] rounded-2xl overflow-hidden relative group">
                <Image
                  src={IMG.g2}
                  alt="Brugal activation footprint and signage"
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </DistortionCard>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-5">
            <TiltCard className="aspect-[3/4] rounded-2xl overflow-hidden relative group">
              <Image
                src={IMG.g3}
                alt="Brugal signature cocktail serve"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
            </TiltCard>
          </motion.div>

          {/* Row 3 - three equal columns */}
          <motion.div variants={galleryItem} className="md:col-span-4">
            <HolographicSheen>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
                <Image
                  src={IMG.g4}
                  alt="Brugal bar program detail"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </HolographicSheen>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-4">
            <TiltCard className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
              <Image
                src={IMG.g5}
                alt="Guests at the Brugal lounge"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
            </TiltCard>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-4">
            <DistortionCard>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
                <Image
                  src={IMG.g6}
                  alt="Brugal brand ambassadors hosting guests"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </DistortionCard>
          </motion.div>

          {/* Row 4 - asymmetric pair */}
          <motion.div variants={galleryItem} className="md:col-span-5">
            <TiltCard className="aspect-[3/4] rounded-2xl overflow-hidden relative group">
              <HolographicSheen className="!absolute inset-0">
                <Image
                  src={IMG.g7}
                  alt="Brugal Rum bottle presentation"
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover"
                />
              </HolographicSheen>
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
            </TiltCard>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-7">
            <DistortionCard>
              <div className="aspect-[16/10] rounded-2xl overflow-hidden relative group">
                <Image
                  src={IMG.g8}
                  alt="Brugal activation at golden hour"
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </DistortionCard>
          </motion.div>

          {/* Row 5 - three equal columns */}
          <motion.div variants={galleryItem} className="md:col-span-4">
            <DistortionCard>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
                <Image
                  src={IMG.g9}
                  alt="Brugal cocktail detail"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </DistortionCard>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-4">
            <HolographicSheen>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
                <Image
                  src={IMG.g10}
                  alt="Brugal lounge atmosphere"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
              </div>
            </HolographicSheen>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-4">
            <TiltCard className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
              <Image
                src={IMG.g11}
                alt="Brugal branding across the show floor"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
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
            A story told{" "}
            <span className="gradient-text">in vivid 4K</span>
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

      {/* ── Capabilities ──────────────────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#0B0F19" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-warm-coral tracking-widest uppercase mb-4">
            Capabilities
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
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {capabilities.map((tool) => (
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
            Ready to capture{" "}
            <span className="gradient-text">your next event</span>?
          </h2>
          <p className="font-body text-cool-gray text-base md:text-lg leading-relaxed mb-10">
            Let&rsquo;s turn your event into a cinematic story that captures the
            energy of the room and keeps working long after the night ends.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact" className="btn-primary">
              Book a Call
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
