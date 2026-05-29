"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import TiltCard from "@/components/TiltCard";
import HolographicSheen from "@/components/HolographicSheen";
import DistortionCard from "@/components/DistortionCard";
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
  client: "Ford (Mustang Mach-E)",
  industry: "Automotive / Social Media",
  role: "Designer & Animator",
  services: [
    "Concept & Art Direction",
    "Hi-Res Key Visuals",
    "3D Design (Cinema 4D)",
    "4K Motion Animation",
    "Social Media Delivery",
  ],
};

/* Real hi-res renditions scraped from the source case study.          */
/* Each URL keeps the exact hash so the CDN serves it (wrong hash 403). */
const heroImage =
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/ce534a9b-9d7b-4edd-bce4-c281dd58da7b_rw_1920.png?h=d58ba796f9778a2423288a3ad29e8a38";

const galleryImages = [
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/e99154f1-4ec2-42c3-8161-f5d61dc7efed_rw_3840.jpg?h=12d2746f516b788b3bf32a1371d2f5da",
    alt: "Ford Mustang Mach-E hero key visual",
    aspect: "21/9",
    span: 12,
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/fcf6296b-216c-429f-b8fc-4ada80f68dfc_rw_3840.jpg?h=9d25b37ccabacab16672b34557c312a4",
    alt: "Ford Mustang Mach-E rendered three quarter view",
    aspect: "16/10",
    span: 7,
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/b9902159-050d-4e1f-a691-35165cf456ba_rw_3840.jpg?h=ea86ac1cce2b7d16732f4aea590402e7",
    alt: "Ford Mustang Mach-E detail composition",
    aspect: "3/4",
    span: 5,
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/143dcbf7-583c-47b6-92d4-bdd1bbf8173d_rw_3840.jpg?h=eb89949a5d83ab26d8665d77524d50e7",
    alt: "Ford Mustang Mach-E lighting study",
    aspect: "4/3",
    span: 4,
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/2c0d78b8-991d-46ca-8dfd-7cc0a4b0e7aa_rw_3840.jpg?h=4defce8940261e93c0bdfd9f8d010291",
    alt: "Ford Mustang Mach-E rendered profile",
    aspect: "4/3",
    span: 4,
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/bbf6a1f7-2b68-4bd1-a519-4fef713a2cbf_rw_1920.png?h=60f9bbfa8172959bd001998034ef16e2",
    alt: "Ford Mustang Mach-E social frame",
    aspect: "4/3",
    span: 4,
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/da3d77ca-1e4b-4f7e-b3cb-7b0e58cf2210_rw_1920.png?h=4f041b47252b875962082d62685b2730",
    alt: "Ford Mustang Mach-E animation still",
    aspect: "21/9",
    span: 12,
  },
];

const approach = [
  {
    step: "01",
    title: "Hi-Res Imagery as the Foundation",
    description:
      "Started from high resolution imagery of the Mustang Mach-E, treating each frame as a finished key visual rather than a screenshot. Sharp detail, clean reflections, and considered composition gave the social assets a print-quality look the moment they landed in the feed.",
  },
  {
    step: "02",
    title: "Built and Lit in Cinema 4D",
    description:
      "Designed and staged the scenes in Cinema 4D, sculpting light, materials, and camera moves around the vehicle. Working in 3D meant total control over angle, surface, and pacing, so the car could be presented exactly the way the brand needed across every cut.",
  },
  {
    step: "03",
    title: "Animated in 4K with After Effects",
    description:
      "Brought the stills to life with 4K animations finished in Adobe After Effects. Type, transitions, and motion graphics were layered over the renders to give the spots energy and rhythm while keeping the focus on the car.",
  },
  {
    step: "04",
    title: "Cut for Social, Built for the Brand",
    description:
      "Delivered the work formatted for social media feeds, where the first second has to earn the scroll. The result follows a simple equation the client signed off on. Hi-res imagery plus 4K animations equals a happy client.",
  },
];

const results = [
  "Hi-res imagery elevated into finished, feed-ready key visuals",
  "Full 3D control of angle, light, and surface in Cinema 4D",
  "Smooth 4K animations finished in Adobe After Effects",
  "Motion graphics that add energy without burying the car",
  "Social-first delivery tuned to stop the scroll",
];

const tools = [
  {
    name: "Cinema 4D",
    description:
      "3D design, scene staging, lighting, and camera work for every rendered frame of the Mustang Mach-E.",
  },
  {
    name: "Adobe After Effects",
    description:
      "4K animation, motion graphics, transitions, and type to bring the stills into motion.",
  },
  {
    name: "Hi-Res Pipeline",
    description:
      "High resolution capture and rendering so each asset reads as a finished key visual, not a frame grab.",
  },
  {
    name: "Social Delivery",
    description:
      "Output formatted and paced for social media feeds where the first second has to earn the scroll.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FordMustangMachEProject() {
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
      <section className="relative min-h-[78vh] md:min-h-[88vh] flex items-end overflow-hidden">
        {/* Real hero key visual */}
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Ford Mustang Mach-E key visual"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Tonal wash to seat the headline */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,15,25,0.55) 0%, rgba(11,15,25,0.2) 35%, rgba(11,15,25,0.75) 80%, #0B0F19 100%)",
          }}
        />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(120% 90% at 80% 10%, rgba(99,102,241,0.28) 0%, rgba(11,15,25,0) 55%)",
          }}
        />

        <div className="section-container relative z-10 pb-16 md:pb-24 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-white/80 mb-4 px-3 py-1.5 rounded-full border border-white/15 backdrop-blur-sm bg-white/10">
              Automotive / Social Media
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4"
          >
            REBUILDING
            <br />
            A CLASSIC
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-2xl md:text-3xl lg:text-4xl font-medium text-white/85 tracking-tight"
          >
            Ford Mustang Mach-E
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-electric-indigo to-warm-coral mt-8"
            style={{ backgroundImage: "linear-gradient(to right, #6366F1, #F97316)" }}
          />
        </div>
      </section>

      {/* ── In Motion GIF Band ────────────────────────────────────── */}
      <ProjectGifBand
        eyebrow="In Motion"
        heading="Rebuilt in Motion"
        gifs={[
          {
            src: "/motion/ford-mustang.mp4",
            poster: "/motion/ford-mustang.jpg",
            label: "Mustang Mach-E",
          },
        ]}
      />

      {/* ── Overview Sidebar + Intro ──────────────────────────────── */}
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
                  Role
                </p>
                <p className="font-body text-cool-gray">{overview.role}</p>
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

          {/* Intro */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-8"
          >
            <p className="font-mono text-sm text-warm-coral tracking-widest uppercase mb-4">
              The Brief
            </p>
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-8">
              A muscle-car icon,{" "}
              <span className="gradient-text">reborn for the feed</span>
            </h2>
            <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
              <p>
                The Mustang Mach-E is Ford taking the most loaded name in its
                history and putting it on something electric. For social, that
                story had to land in seconds, with imagery that felt as crafted
                and premium as the car itself.
              </p>
              <p>
                The approach was direct. Build the vehicle in 3D, light it like
                a hero, and animate it in 4K so every frame reads as a finished
                key visual rather than a screen grab. Hi-res imagery plus 4K
                animations, designed and animated in Cinema 4D and Adobe After
                Effects, with one goal at the end of it. A happy client.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── The Film / Animation ─────────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#0B0F19" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-10"
        >
          <p className="font-mono text-sm text-warm-coral tracking-widest uppercase mb-4">
            The Animation
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            Hi-res imagery, <span className="gradient-text">brought to life in 4K</span>
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Ambient glow behind the player */}
          <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-r from-electric-indigo/10 via-white/5 to-warm-coral/10 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
            {/* Corner accent brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-electric-indigo/40 rounded-tl-2xl z-10 pointer-events-none" style={{ borderColor: "rgba(99,102,241,0.4)" }} />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-2xl z-10 pointer-events-none" style={{ borderColor: "rgba(99,102,241,0.4)" }} />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 rounded-bl-2xl z-10 pointer-events-none" style={{ borderColor: "rgba(249,115,22,0.4)" }} />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-2xl z-10 pointer-events-none" style={{ borderColor: "rgba(249,115,22,0.4)" }} />

            {/* 16:9 responsive embed (Adobe CCV player from the source case study) */}
            <div className="relative w-full aspect-video">
              <iframe
                src="https://www-ccv.adobe.io/v1/player/ccv/V3B-d9Ww-Nr/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View"
                title="Rebuilding a Classic: Ford Mustang Mach-E"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </motion.div>
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
            From render to feed{" "}
            <span className="gradient-text">in four moves</span>
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
                <h3 className="font-headline text-xl md:text-2xl font-bold text-pure-white mb-3 transition-colors duration-300">
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
      <section className="section-container section-padding" style={{ backgroundColor: "#0B0F19" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-warm-coral tracking-widest uppercase mb-4">
            Key Visuals
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            Every frame, <span className="gradient-text">a finished piece</span>
          </h2>
        </motion.div>

        <motion.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6"
        >
          {galleryImages.map((img, i) => {
            const spanClass =
              img.span === 12
                ? "md:col-span-12"
                : img.span === 7
                ? "md:col-span-7"
                : img.span === 5
                ? "md:col-span-5"
                : "md:col-span-4";
            const Card = i % 2 === 0 ? TiltCard : DistortionCard;
            return (
              <motion.div key={img.src} variants={galleryItem} className={spanClass}>
                <Card className="rounded-2xl overflow-hidden relative group">
                  <HolographicSheen className="!absolute inset-0">
                    <div
                      className="relative w-full"
                      style={{ aspectRatio: img.aspect }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 1200px"
                        className="object-cover"
                      />
                    </div>
                  </HolographicSheen>
                  <div
                    className="absolute inset-0 rounded-2xl border border-white/0 transition-colors duration-500 pointer-events-none group-hover:border-white/20"
                  />
                </Card>
              </motion.div>
            );
          })}
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
            Premium imagery,{" "}
            <span className="gradient-text">built for social</span>
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
              className="flex items-start gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.02] transition-all duration-500 hover:border-white/15 hover:bg-white/[0.04]"
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
            Tools &amp; Technology
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
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={staggerItem}
              className="group p-6 rounded-xl border border-white/5 bg-white/[0.02] transition-all duration-500 hover:border-white/15 hover:bg-white/[0.04]"
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
            Have an icon{" "}
            <span className="gradient-text">to reinvent</span>?
          </h2>
          <p className="font-body text-cool-gray text-base md:text-lg leading-relaxed mb-10">
            Let&rsquo;s build imagery and motion that makes your brand impossible
            to scroll past.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact" className="btn-primary">
              Book a Call
            </Link>
            <Link
              href="/#projects"
              className="btn-secondary group inline-flex items-center gap-2"
            >
              View More Work
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
