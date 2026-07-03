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
  client: "Unplugged Music Sessions",
  industry: "Live Music / Direction",
  timeline: "Recurring Series",
  services: [
    "Live Music Direction",
    "Multi-Camera Capture",
    "Performance Cinematography",
    "Editorial & Color",
    "Social Delivery",
  ],
};

const approach = [
  {
    step: "01",
    title: "Building the Room",
    description:
      "Designed each session as a stripped back live set, an intimate space where the artist, the band, and the song are the entire event. The room itself becomes part of the direction, with lighting and framing shaped around the mood of every performance.",
  },
  {
    step: "02",
    title: "Multi-Camera Performance Capture",
    description:
      "Directed a multi-camera setup to cover the full performance in real time, moving between wide stage frames and tight detail on hands, faces, and instruments. Every angle was planned to let the cut breathe with the music rather than fight it.",
  },
  {
    step: "03",
    title: "Cutting to the Music",
    description:
      "Edited each session to the rhythm and dynamics of the song, holding on emotional beats and cutting on transitions so the visual pacing tracks the music. The goal was a film that feels like being in the room, not a montage laid over a track.",
  },
  {
    step: "04",
    title: "Color & Tone",
    description:
      "Graded each session toward a warm, lived in look that matches the unplugged spirit. The color work keeps skin tones honest and the atmosphere intimate, so the focus stays on the artist and the moment.",
  },
  {
    step: "05",
    title: "Built for Sharing",
    description:
      "Delivered finished sessions optimized for social and streaming, framed and paced to hold attention from the first second. Each piece doubles as a standalone performance film and a calling card for the series itself.",
  },
];

const results = [
  "An intimate live music series with a consistent visual identity",
  "Multiple performance films directed, shot, and finished end to end",
  "Editorial pacing built around the music rather than imposed on it",
  "A warm, cinematic look that fits the unplugged spirit of the room",
  "Performance content shaped for social and streaming distribution",
];

const tools = [
  {
    name: "Multi-Camera Direction",
    description:
      "Live performance coverage planned and directed across multiple angles for full, real time capture of each session.",
  },
  {
    name: "Performance Cinematography",
    description:
      "Lighting and framing built around the artist and the song to create an intimate, room-level point of view.",
  },
  {
    name: "Adobe Premiere Pro",
    description:
      "Editorial assembly, music-led pacing, and color grading to finish each session as a standalone performance film.",
  },
  {
    name: "Social Delivery",
    description:
      "Sessions finished and formatted for social and streaming platforms with a consistent look across the series.",
  },
];

/* Real performance stills scraped from the live source, in page order. */
const galleryImages = [
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/6e2f254b-92f1-4a9f-b3b8-e685f99b17e2_rw_1920.jpg?h=db4a60a79d74fd97ad1f94cc94151a03",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/6a6b4df0-4af8-40f7-b94b-a390f7622ca7_rw_1920.jpg?h=aba0d5b72f1af534c52c4daf7db18083",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/86730945-cd89-4ba8-ba51-b4afa20868e9_rw_1920.jpg?h=ffe9eb8f513c1f10f1515a8b8a950731",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/9cbe3d77-4764-4780-875e-980de56689cb_rw_1920.jpg?h=eeae0bfcfc0ef5712094bdaf760b8b64",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/15aebb8c-cddc-4fbf-8f4d-1e50f4b9065a_rw_1920.jpg?h=df9786b428b1b61475ff725375333372",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/1aebc538-81eb-4974-8b28-78aafc1a54f5_rw_1920.jpg?h=bfda9ef88f92c8700b0f3e19cea45177",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/3c2d3c5d-460f-4425-be54-6ecd086044a5_rw_1920.jpg?h=d6cbe376dea7a1257930df5f05dfeb66",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/f9923bd1-dbc3-46ee-bf14-10ab9b5362fb_rw_1920.jpg?h=fa7bff7c268c096ca2b1e75eec67514e",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/fe679578-f5cf-4a09-b48c-bc5490fbd9ba_rw_1920.jpg?h=eab8951d0daddbdf5ed6db72005d6551",
];

/* Adobe CCV performance video embeds scraped from the live source. */
const videos = [
  { id: "Pexs9H2brcJ", label: "Session One" },
  { id: "6enmnpI-WUx", label: "Session Two" },
  { id: "RgDvHPPd6Bd", label: "Session Three" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function UnpluggedSessionsProject() {
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
            alt="Unplugged Music Sessions live performance still"
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
              Live Music Direction
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4"
          >
            UNPLUGGED SESSIONS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-2xl md:text-3xl lg:text-4xl font-medium text-white/80 tracking-tight"
          >
            Live Music, Captured in the Room
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
        heading="The Sessions, Moving"
        gifs={[
          {
            src: "/motion/unplugged.mp4",
            poster: "/motion/unplugged.jpg",
            label: "Unplugged",
          },
        ]}
      />

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
              A live series built around{" "}
              <span className="gradient-text">the song itself</span>
            </h2>
            <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
              <p>
                Unplugged Sessions is a live music series built to strip a
                performance down to its core. No heavy production gloss, no
                distractions, just an artist, a room, and a song captured the way
                it actually sounds and feels in the moment.
              </p>
              <p>
                The direction challenge was to make something intimate feel
                cinematic without losing the rawness that makes an unplugged
                performance special. Every session had to hold the energy of a
                live take while still reading as a finished, shareable film.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── The Sessions (Video) ─────────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#0B0F19" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-10"
        >
          <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
            The Sessions
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            Press play on{" "}
            <span className="text-white">the performances</span>
          </h2>
        </motion.div>

        <motion.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
        >
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              variants={galleryItem}
              className={`relative ${
                index === 0 ? "lg:col-span-2" : "lg:col-span-1"
              }`}
            >
              {/* Ambient glow behind the video */}
              <div className="absolute -inset-3 md:-inset-5 bg-gradient-to-r from-electric-indigo/10 via-violet-500/5 to-electric-indigo/10 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

              {/* Video container */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">

                {/* 16:9 aspect ratio wrapper */}
                <div className="relative w-full aspect-video">
                  <iframe
                    src={`https://www-ccv.adobe.io/v1/player/ccv/${video.id}/embed?bgcolor=%230B0F19&lazyLoading=true&api_key=BehancePro2View`}
                    title={`Unplugged Sessions: ${video.label}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>

              <p className="mt-3 font-mono text-xs tracking-widest uppercase text-cool-gray">
                {video.label}
              </p>
            </motion.div>
          ))}
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
            <span className="text-white">never overproduced</span>
          </h2>
          <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
            <p>
              Each session is treated as its own short film. The camera moves
              with intent, the lighting sets a mood, and the edit follows the
              music instead of cutting against it. The aim is to put the viewer
              in the room with the artist, close enough to catch the small
              moments that make a live take feel alive.
            </p>
            <p>
              By keeping the visual language consistent across the series, every
              session reads as part of the same world. The result is a body of
              performance films that work individually and stack into a
              recognizable identity for Unplugged Sessions as a whole.
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
            <span className="text-white">the sessions</span>
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
                alt="Unplugged Sessions performance still 1"
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
                alt="Unplugged Sessions performance still 2"
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
                alt="Unplugged Sessions performance still 3"
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
                alt="Unplugged Sessions performance still 4"
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
                alt="Unplugged Sessions performance still 5"
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
                alt="Unplugged Sessions performance still 6"
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
                alt="Unplugged Sessions performance still 7"
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
                alt="Unplugged Sessions performance still 8"
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-electric-indigo/20 transition-colors duration-500 pointer-events-none" />
            </div>
          </motion.div>

          {/* Row 5: Full-width closing */}
          <motion.div variants={galleryItem} className="md:col-span-12">
            <div className="aspect-[21/9] rounded-2xl overflow-hidden relative group">
              <Image
                src={galleryImages[8]}
                alt="Unplugged Sessions performance closing still"
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                sizes="100vw"
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
            A series that{" "}
            <span className="text-white">feels like the room</span>
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
            Have a performance{" "}
            <span className="text-white">worth capturing</span>?
          </h2>
          <p className="font-body text-cool-gray text-base md:text-lg leading-relaxed mb-10">
            Let&rsquo;s direct a live music series that feels intimate, looks
            cinematic, and travels well across every platform.
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
