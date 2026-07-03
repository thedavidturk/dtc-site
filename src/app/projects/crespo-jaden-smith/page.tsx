"use client";

import Link from "next/link";
import Image from "next/image";
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
  client: "CRESPO x Jaden Smith",
  industry: "Documentary / Music",
  timeline: "24-Hour Turnaround",
  services: [
    "Documentary Direction",
    "On-Site Capture",
    "Editorial & Story",
    "Motion Graphics",
    "Color & Finishing",
  ],
};

const approach = [
  {
    step: "01",
    title: "Reading the Room Fast",
    description:
      "With a single artist and a single night to work from, the first move was to read the energy of the moment and decide what the film was really about. The story had to be found in the room, not built after the fact.",
  },
  {
    step: "02",
    title: "Capturing Behind the Stage",
    description:
      "Shot the quiet space behind the show, the prep, the waiting, and the run up to the performance, so the film lives in the moments most people never see rather than the spectacle out front.",
  },
  {
    step: "03",
    title: "Cutting Against the Clock",
    description:
      "Assembled and edited the entire piece in Adobe Premiere Pro inside a 24-hour window, shaping a tight narrative arc that holds attention from the first frame and earns its short runtime.",
  },
  {
    step: "04",
    title: "Motion & Type",
    description:
      "Built titles and motion treatments in Adobe After Effects to give the short a finished, intentional feel, framing the documentary footage without ever pulling focus from the artist.",
  },
  {
    step: "05",
    title: "Finishing the Look",
    description:
      "Graded the short toward a cinematic, low-key palette that matches the backstage mood, keeping the tone honest and the focus locked on the people and the moment.",
  },
];

const results = [
  "A documentary short directed, shot, and finished in a 24-hour window",
  "A behind the stage point of view built around the artist and the moment",
  "A tight narrative cut shaped to hold attention from the first frame",
  "Custom titles and motion treatments built in After Effects",
  "A cinematic backstage grade that keeps the focus on the people in the room",
];

const tools = [
  {
    name: "Documentary Direction",
    description:
      "On-site direction shaped around the energy of the night, finding the story in real time rather than building it after the shoot.",
  },
  {
    name: "Adobe Premiere Pro",
    description:
      "Full editorial assembly and pacing, cut inside a 24-hour turnaround into a tight, self-contained documentary short.",
  },
  {
    name: "Adobe After Effects",
    description:
      "Titles and motion treatments built to give the short a finished, intentional frame around the documentary footage.",
  },
  {
    name: "Color & Finishing",
    description:
      "A cinematic, low-key grade tuned to the backstage mood, keeping skin tones honest and the focus on the moment.",
  },
];

/* Real stills scraped from the live source, in page order. */
const galleryImages = [
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/f40af874-5bc9-4587-8f9d-db17859dc0d4_rw_1920.png?h=fe79d831e34b086f0a55b6e716993816",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/40b0b754-89a0-4254-a924-5425c9761dab_rw_1920.png?h=4a6a6e9979d986e37a5628436784e35e",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/dcdb144d-b709-4d61-a8a7-3b1695a51e31_rw_1920.png?h=8da75b4f72215dc39ce1cc5d54b0bbbc",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/b5f74cf0-0606-4c64-85ec-959dbd378a69_rw_1920.png?h=b830c4ca048f8c6095520abc4d80866b",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/aede3c9e-26cf-4f8d-8ce1-cc4750d743f4_rw_1920.png?h=579f4afe360cddfbd2446a649a036d8c",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/261fb2a6-fd39-4e88-8e32-fcf2494b767a_rw_1920.png?h=9728dcb8f19c294d959a280083e9b552",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/dcae9971-b27b-44fe-9f3b-ce2f6fe95132_rw_1920.png?h=08be0c1a4a6705b88c5b76e72e040a9c",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/da627ede-be72-4b7a-93fa-a760e576055d_rw_1920.png?h=d2c821bd5b5a5d7f70b3890aa7b06d63",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/08a96df2-8417-486d-a9fa-5dd0ca89d1a7_rw_1920.png?h=1996286d5e63c9cb0a6594969b1ce18d",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/4e4eb44c-6192-46ae-a513-225f4ccca381_rw_1920.png?h=a0068bcf308dcf78c80c95b312833879",
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CrespoJadenSmithProject() {
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
            src={galleryImages[0]}
            alt="Behind the Stage: Jaden Smith and CRESPO documentary still"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-black/50" />

        {/* Indigo wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-electric-indigo/30 via-transparent to-black/40 mix-blend-multiply" />

        {/* Radial fade at bottom */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-deep-space via-deep-space/40 to-transparent" />

        <div className="section-container relative z-10 pb-16 md:pb-24 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-white/70 mb-4 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm bg-white/5">
              Documentary / Music
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4"
          >
            BEHIND THE STAGE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-2xl md:text-3xl lg:text-4xl font-medium text-white/80 tracking-tight"
          >
            Jaden Smith + CRESPO, a 24-Hour Docu Short
          </motion.p>

          {/* Animated line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-electric-indigo to-violet-400 mt-8"
          />
        </div>
      </section>

      {/* ── Animated GIF Band ─────────────────────────────────────── */}
      <ProjectGifBand
        eyebrow="In Motion"
        heading="Behind the Stage, Moving"
        gifs={[
          {
            src: "/motion/crespo.mp4",
            poster: "/motion/crespo.jpg",
            label: "Behind the Stage",
          },
        ]}
      />

      {/* ── The Film (Video) ──────────────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#0B0F19" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-10"
        >
          <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
            The Film
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            Press play on{" "}
            <span className="gradient-text">the documentary short</span>
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="relative"
        >
          {/* Ambient glow behind the video */}
          <div className="absolute -inset-3 md:-inset-5 bg-gradient-to-r from-electric-indigo/10 via-violet-500/5 to-electric-indigo/10 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

          <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black aspect-video shadow-2xl shadow-black/40">
            <iframe
              src="https://www-ccv.adobe.io/v1/player/ccv/Tevy7Apn4ss/embed?bgcolor=%230B0F19&lazyLoading=true&api_key=BehancePro2View"
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Behind the Stage"
            />
          </div>
        </motion.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

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
                <p className="font-mono text-xs tracking-widest uppercase text-electric-indigo mb-2">
                  Project
                </p>
                <p className="font-headline text-lg font-semibold text-pure-white">
                  {overview.client}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-electric-indigo mb-2">
                  Discipline
                </p>
                <p className="font-body text-cool-gray">
                  {overview.industry}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-electric-indigo mb-2">
                  Format
                </p>
                <p className="font-body text-cool-gray">
                  {overview.timeline}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-electric-indigo mb-2">
                  Services
                </p>
                <ul className="space-y-2">
                  {overview.services.map((service) => (
                    <li
                      key={service}
                      className="flex items-center gap-3 font-body text-sm text-cool-gray"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-electric-indigo flex-shrink-0" />
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
            <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
              The Idea
            </p>
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-8">
              A documentary short shot and edited in{" "}
              <span className="text-white">24 hours</span>
            </h2>
            <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
              <p>
                Behind the Stage follows Jaden Smith and CRESPO away from the
                show, in the quiet space most people never see. The idea was to
                capture the moments before the moment, the prep and the waiting
                and the run up, and turn them into a self-contained film.
              </p>
              <p>
                The challenge was time. The entire piece was shot and edited in
                24 hours in Adobe Premiere Pro and After Effects, which meant the
                story had to be found in the room and shaped on the fly without
                losing the cinematic feel the artists deserved.
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
          <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
            The Direction
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            From the room to the cut{" "}
            <span className="text-white">in five moves</span>
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
                <span className="font-mono text-3xl md:text-4xl font-bold text-electric-indigo/30 group-hover:text-electric-indigo transition-colors duration-500">
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

      {/* ── The Approach Narrative ───────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#0B0F19" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-4xl"
        >
          <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
            The Feel
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Cinematic, but{" "}
            <span className="text-white">honest to the moment</span>
          </h2>
          <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
            <p>
              The short is built around presence. The camera stays close to the
              people in the room, catching the small, unguarded moments that a
              polished concert film would skip over. The aim was to make the
              backstage feel like the real story, not the warm up.
            </p>
            <p>
              Titles and motion treatments give the piece a finished frame, while
              the grade keeps it grounded and low-key. The result is a film that
              reads as intentional and cinematic even though it was made against
              the clock, shot and edited in a single 24-hour window.
            </p>
          </div>
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
          <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
            Stills
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            Moments from{" "}
            <span className="text-white">behind the stage</span>
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
            <div className="aspect-[21/9] rounded-2xl overflow-hidden relative group">
              <Image
                src={galleryImages[0]}
                alt="Behind the Stage documentary still 1"
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-electric-indigo/20 transition-colors duration-500 pointer-events-none" />
            </div>
          </motion.div>

          {/* Row 2: Wide + tall */}
          <motion.div variants={galleryItem} className="md:col-span-7">
            <div className="aspect-[16/10] rounded-2xl overflow-hidden relative group">
              <Image
                src={galleryImages[1]}
                alt="Behind the Stage documentary still 2"
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-electric-indigo/20 transition-colors duration-500 pointer-events-none" />
            </div>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-5">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden relative group">
              <Image
                src={galleryImages[2]}
                alt="Behind the Stage documentary still 3"
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-electric-indigo/20 transition-colors duration-500 pointer-events-none" />
            </div>
          </motion.div>

          {/* Row 3: Three equal columns */}
          <motion.div variants={galleryItem} className="md:col-span-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
              <Image
                src={galleryImages[3]}
                alt="Behind the Stage documentary still 4"
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-electric-indigo/20 transition-colors duration-500 pointer-events-none" />
            </div>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
              <Image
                src={galleryImages[4]}
                alt="Behind the Stage documentary still 5"
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-electric-indigo/20 transition-colors duration-500 pointer-events-none" />
            </div>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
              <Image
                src={galleryImages[5]}
                alt="Behind the Stage documentary still 6"
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-electric-indigo/20 transition-colors duration-500 pointer-events-none" />
            </div>
          </motion.div>

          {/* Row 4: Asymmetric pair */}
          <motion.div variants={galleryItem} className="md:col-span-5">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden relative group">
              <Image
                src={galleryImages[6]}
                alt="Behind the Stage documentary still 7"
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-electric-indigo/20 transition-colors duration-500 pointer-events-none" />
            </div>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-7">
            <div className="aspect-[16/10] rounded-2xl overflow-hidden relative group">
              <Image
                src={galleryImages[7]}
                alt="Behind the Stage documentary still 8"
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-electric-indigo/20 transition-colors duration-500 pointer-events-none" />
            </div>
          </motion.div>

          {/* Row 5: Pair */}
          <motion.div variants={galleryItem} className="md:col-span-6">
            <div className="aspect-[16/10] rounded-2xl overflow-hidden relative group">
              <Image
                src={galleryImages[8]}
                alt="Behind the Stage documentary still 9"
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-electric-indigo/20 transition-colors duration-500 pointer-events-none" />
            </div>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-6">
            <div className="aspect-[16/10] rounded-2xl overflow-hidden relative group">
              <Image
                src={galleryImages[9]}
                alt="Behind the Stage documentary closing still"
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-electric-indigo/20 transition-colors duration-500 pointer-events-none" />
            </div>
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
          <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
            The Result
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            A short that{" "}
            <span className="text-white">lives in the room</span>
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
              className="flex items-start gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-electric-indigo/20 hover:bg-electric-indigo/[0.03] transition-all duration-500"
            >
              <svg
                className="w-5 h-5 text-electric-indigo flex-shrink-0 mt-0.5"
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
          <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
            Capabilities
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            The <span className="text-white">production toolkit</span>
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
              className="group p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:border-electric-indigo/20 hover:bg-electric-indigo/[0.03] transition-all duration-500"
            >
              <h3 className="font-headline text-lg font-bold text-pure-white mb-2 group-hover:text-electric-indigo transition-colors duration-300">
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
            Have a moment{" "}
            <span className="text-white">worth documenting</span>?
          </h2>
          <p className="font-body text-cool-gray text-base md:text-lg leading-relaxed mb-10">
            Let&rsquo;s capture a documentary short that finds the real story in
            the room and finishes with a cinematic, intentional feel.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact" className="btn-primary">
              Book a Call
            </Link>
            <Link
              href="/projects/unplugged-sessions"
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
