"use client";

import Link from "@/components/TransitionLink";
import Image from "next/image";
import { m } from "framer-motion";
import AutoplayVideo from "@/components/AutoplayVideo";

/* ------------------------------------------------------------------ */
/*  Animation Variants (prism ease: slow start, decisive stop)         */
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
    transition: { duration: 0.5, ease: prismEase },
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

/* Discipline labels carried over from the original gallery frames. */
const galleryDisciplines = [
  "Live Music Direction",
  "Performance Cinematography",
  "Multi-Camera Capture",
  "Performance Cinematography",
  "Multi-Camera Capture",
  "Performance Cinematography",
  "Performance Cinematography",
  "Editorial & Color",
  "Live Music Direction",
];

/* Adobe CCV performance video embeds scraped from the live source. */
const videos = [
  { id: "Pexs9H2brcJ", label: "Session One" },
  { id: "6enmnpI-WUx", label: "Session Two" },
  { id: "RgDvHPPd6Bd", label: "Session Three" },
];

/* ------------------------------------------------------------------ */
/*  Local helpers                                                      */
/* ------------------------------------------------------------------ */

/* Hairline band divider */
function Rule() {
  return (
    <div className="section-container">
      <div className="border-t border-ash-border" />
    </div>
  );
}

/* Caption below a media card: fog-blue uppercase label + bone value */
function PlateCaption({ label, value }: { label: string; value: string }) {
  return (
    <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <span className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue">
        {label}
      </span>
      <span className="text-caption font-normal text-bone">{value}</span>
    </figcaption>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function UnpluggedSessionsProject() {
  return (
    <article className="bg-obsidian min-h-screen text-bone">
      {/* ── Opener ────────────────────────────────────────────────── */}
      <section className="section-container section-padding pt-36 md:pt-44">
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
          className="text-[17px] uppercase tracking-[0.02em] font-normal text-fog-blue mb-8"
        >
          Live Music Direction
        </m.p>

        <m.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: prismEase }}
          className="font-body font-normal text-bone text-display-sm leading-[1.01] tracking-[-0.02em] mb-8"
        >
          Unplugged
          <br />
          Sessions
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: prismEase }}
          className="font-body text-body-lg font-normal text-bone max-w-[640px]"
        >
          Live Music, Captured in the Room
        </m.p>

        {/* Metadata rule row */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: prismEase }}
          className="mt-16 border-t border-ash-border pt-10"
        >
          <dl className="flex flex-wrap gap-x-14 gap-y-10">
            <div>
              <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
                Project
              </dt>
              <dd className="font-body text-body-sm font-normal text-bone">
                {overview.client}
              </dd>
            </div>
            <div>
              <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
                Discipline
              </dt>
              <dd className="font-body text-body-sm font-normal text-bone">
                {overview.industry}
              </dd>
            </div>
            <div>
              <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
                Format
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
                <ul className="space-y-1.5">
                  {overview.services.map((service) => (
                    <li
                      key={service}
                      className="font-body text-caption font-normal text-fog-blue"
                    >
                      {service}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </m.div>

        {/* Hero media card */}
        <m.figure
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75, ease: prismEase }}
          className="mt-20"
        >
          <div className="relative w-full aspect-[16/9] rounded-[15px] overflow-hidden border border-ash-border">
            <Image
              src={galleryImages[0]}
              alt="Unplugged Music Sessions live performance still"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <PlateCaption
            label="Live Music Direction"
            value={overview.client}
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
          className="mb-14"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            In Motion
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone">
            The Sessions, Moving
          </h2>
        </m.div>

        <m.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[1200px]"
        >
          <div className="rounded-[15px] overflow-hidden border border-ash-border">
            <AutoplayVideo
              src="/motion/unplugged.mp4"
              poster="/motion/unplugged.jpg"
              className="w-full h-auto block"
            />
          </div>
          <PlateCaption label="In Motion" value="Unplugged" />
        </m.figure>
      </section>

      <Rule />

      {/* ── The Idea ──────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            The Idea
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone max-w-[900px]">
            A live series built around the song itself
          </h2>
        </m.div>

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[640px] font-body text-body-sm font-normal text-bone space-y-7"
        >
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
        </m.div>
      </section>

      <Rule />

      {/* ── The Sessions (videos, stacked cards) ──────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            The Sessions
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone max-w-[900px]">
            Press play on the performances
          </h2>
        </m.div>

        <m.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[1200px] space-y-16"
        >
          {videos.map((video) => (
            <m.figure key={video.id} variants={galleryItem}>
              <div className="relative w-full aspect-video rounded-[15px] overflow-hidden border border-ash-border">
                <iframe
                  src={`https://www-ccv.adobe.io/v1/player/ccv/${video.id}/embed?bgcolor=%23120D1A&lazyLoading=true&api_key=BehancePro2View`}
                  title={`Unplugged Sessions: ${video.label}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <PlateCaption label="Performance Film" value={video.label} />
            </m.figure>
          ))}
        </m.div>
      </section>

      <Rule />

      {/* ── The Direction ─────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            The Direction
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone max-w-[900px]">
            From the room to the cut in five moves
          </h2>
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[720px]"
        >
          {approach.map((step, index) => (
            <m.div
              key={step.step}
              variants={staggerItem}
              className={`py-14 ${
                index > 0 ? "border-t border-ash-border" : ""
              }`}
            >
              <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-6">
                {step.step}
              </p>
              <h3 className="font-body text-heading-sm font-normal text-bone mb-4">
                {step.title}
              </h3>
              <p className="font-body text-body-sm font-normal text-fog-blue max-w-[640px]">
                {step.description}
              </p>
            </m.div>
          ))}
        </m.div>
      </section>

      <Rule />

      {/* ── The Feel ──────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            The Feel
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone max-w-[900px]">
            Cinematic, but never overproduced
          </h2>
        </m.div>

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[640px] font-body text-body-sm font-normal text-bone space-y-7"
        >
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
        </m.div>
      </section>

      <Rule />

      {/* ── Stills (gallery of media cards) ───────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            Stills
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone max-w-[900px]">
            Moments from the sessions
          </h2>
        </m.div>

        <m.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-16"
        >
          {/* Full-width opening still */}
          <m.figure variants={galleryItem}>
            <div className="relative w-full aspect-[21/9] rounded-[15px] overflow-hidden border border-ash-border">
              <Image
                src={galleryImages[0]}
                alt="Unplugged Sessions performance still 1"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <PlateCaption
              label={galleryDisciplines[0]}
              value={overview.client}
            />
          </m.figure>

          {/* Pair */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start max-w-[1200px]">
            {[1, 2].map((i) => (
              <m.figure key={galleryImages[i]} variants={galleryItem}>
                <div className="relative aspect-[4/3] rounded-[15px] overflow-hidden border border-ash-border">
                  <Image
                    src={galleryImages[i]}
                    alt={`Unplugged Sessions performance still ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <PlateCaption
                  label={galleryDisciplines[i]}
                  value={overview.client}
                />
              </m.figure>
            ))}
          </div>

          {/* Pair */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start max-w-[1200px]">
            {[3, 4].map((i) => (
              <m.figure key={galleryImages[i]} variants={galleryItem}>
                <div className="relative aspect-[4/3] rounded-[15px] overflow-hidden border border-ash-border">
                  <Image
                    src={galleryImages[i]}
                    alt={`Unplugged Sessions performance still ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <PlateCaption
                  label={galleryDisciplines[i]}
                  value={overview.client}
                />
              </m.figure>
            ))}
          </div>

          {/* Pair */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start max-w-[1200px]">
            {[5, 6].map((i) => (
              <m.figure key={galleryImages[i]} variants={galleryItem}>
                <div className="relative aspect-[4/3] rounded-[15px] overflow-hidden border border-ash-border">
                  <Image
                    src={galleryImages[i]}
                    alt={`Unplugged Sessions performance still ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <PlateCaption
                  label={galleryDisciplines[i]}
                  value={overview.client}
                />
              </m.figure>
            ))}
          </div>

          {/* Single editorial card */}
          <m.figure variants={galleryItem} className="max-w-[900px]">
            <div className="relative aspect-[16/10] rounded-[15px] overflow-hidden border border-ash-border">
              <Image
                src={galleryImages[7]}
                alt="Unplugged Sessions performance still 8"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 900px"
              />
            </div>
            <PlateCaption
              label={galleryDisciplines[7]}
              value={overview.client}
            />
          </m.figure>

          {/* Full-width closing still */}
          <m.figure variants={galleryItem}>
            <div className="relative w-full aspect-[21/9] rounded-[15px] overflow-hidden border border-ash-border">
              <Image
                src={galleryImages[8]}
                alt="Unplugged Sessions performance closing still"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <PlateCaption
              label={galleryDisciplines[8]}
              value={overview.client}
            />
          </m.figure>
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
          className="mb-12"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            The Result
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone max-w-[900px]">
            A series that feels like the room
          </h2>
        </m.div>

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[720px]"
        >
          <p className="font-body text-heading-sm font-normal text-bone mb-10">
            {results[0]}
          </p>

          {/* TODO(David): add quantified result or client quote here */}

          <ul className="max-w-[640px]">
            {results.slice(1).map((result, index) => (
              <li
                key={result}
                className={`py-4 font-body text-body-sm font-normal text-fog-blue ${
                  index > 0 ? "border-t border-ash-border" : ""
                }`}
              >
                {result}
              </li>
            ))}
          </ul>
        </m.div>
      </section>

      <Rule />

      {/* ── Capabilities ─────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            Capabilities
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone max-w-[900px]">
            The production toolkit
          </h2>
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[720px]"
        >
          {tools.map((tool, index) => (
            <m.div
              key={tool.name}
              variants={staggerItem}
              className={`py-9 ${
                index > 0 ? "border-t border-ash-border" : ""
              }`}
            >
              <h3 className="font-body text-heading-sm font-normal text-bone mb-3">
                {tool.name}
              </h3>
              <p className="font-body text-body-sm font-normal text-fog-blue max-w-[640px]">
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
          className="max-w-[720px]"
        >
          <h2 className="font-body text-heading-lg font-normal text-bone mb-6">
            Have a performance worth capturing?
          </h2>
          <p className="font-body text-body-sm font-normal text-fog-blue mb-10 max-w-[640px]">
            Let&rsquo;s direct a live music series that feels intimate, looks
            cinematic, and travels well across every platform.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link href="/#contact" className="btn-primary">
              Book a Call
            </Link>
            <Link
              href="/projects/el-secreto"
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
