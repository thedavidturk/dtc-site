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

const HERO_IMAGE =
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/11572f8d-b70b-47ba-857e-2dd19d334b74_rw_3840.jpg?h=84b8fa267a6fdcd69f46f4e02e2158db";

const overview = {
  client: "The Hospitality Mentor",
  industry: "TV / Hospitality",
  timeline: "Documentary Episode",
  services: [
    "Cinematic Video Production",
    "Documentary-Style Direction",
    "Shot on Canon C70 in 4K",
    "Editorial in Premiere Pro",
    "Motion Graphics & VFX",
  ],
};

const approach = [
  {
    step: "01",
    title: "Shot on the Canon C70 in 4K",
    description:
      "We captured the entire episode on the Canon C70 in 4K, giving the Fontainebleau the dynamic range and detail it deserves. Every space, from the grand lobby to the quiet corners, was framed to honor a hotel that has been creating memories since 1954.",
  },
  {
    step: "02",
    title: "Documentary Direction",
    description:
      "We wanted to shine a light on the hard-working people and beautiful places that make hospitality such a magical industry. The episode follows The Hospitality Mentor on a journey through the property, letting the characters and the location tell the story.",
  },
  {
    step: "03",
    title: "Edited in Premiere Pro and After Effects",
    description:
      "The episode was edited in Adobe Premiere Pro and finished with motion graphics and visual effects in Adobe After Effects, shaping the lead character frames and location frames into a cohesive, broadcast-ready narrative.",
  },
  {
    step: "04",
    title: "Audio Mixed in Adobe Audition",
    description:
      "Audio was mixed in Adobe Audition to bring clarity to the interviews and warmth to the ambient sound of the hotel, so the atmosphere of the Fontainebleau comes through as vividly as the picture.",
  },
];

const results = [
  "An episode that celebrates the people and places behind great hospitality",
  "A look inside the Fontainebleau Miami Beach, a hotel creating memories since 1954",
  "Lead character frames and location frames woven into one cohesive story",
  "4K capture on the Canon C70 finished with motion graphics and VFX",
  "Documentary authenticity paired with cinematic, broadcast-ready polish",
];

const tools = [
  {
    name: "Canon C70",
    description:
      "Cinema camera used to capture the entire episode in 4K, delivering high dynamic range across the hotel's varied lighting.",
  },
  {
    name: "Adobe Premiere Pro",
    description:
      "Editorial assembly, narrative structuring, and pacing for the lead character and location frames.",
  },
  {
    name: "Adobe After Effects",
    description:
      "Motion graphics, visual effects, and titling that reinforce the premium, documentary feel.",
  },
  {
    name: "Adobe Audition",
    description:
      "Audio mixing for interviews and ambient sound, bringing warmth and clarity to the final cut.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function HospitalityMentorProject() {
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
        {/* Hero image */}
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Inside the Fontainebleau Miami Beach"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Tonal wash for legibility */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-br from-deep-space/50 via-deep-space/20 to-warm-coral/10" />

        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')]" />

        {/* Radial fade at bottom */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-deep-space via-deep-space/40 to-transparent" />

        <div className="section-container relative z-10 pb-16 md:pb-24 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-white/70 mb-4 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm bg-white/5">
              The Hospitality Mentor / TV Episode
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4"
          >
            THE FONTAINEBLEAU
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-2xl md:text-3xl lg:text-4xl font-medium text-white/80 tracking-tight"
          >
            A Look Inside the Iconic Hotel
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

      {/* ── GIF Band ──────────────────────────────────────────────── */}
      <ProjectGifBand
        eyebrow="In Motion"
        heading="The Fontainebleau in Motion"
        gifs={[
          {
            src: "/motion/hospitality.mp4",
            poster: "/motion/hospitality.jpg",
            label: "Fontainebleau",
          },
        ]}
      />

      {/* ── The Episode (Video) ───────────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#0B0F19" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-10"
        >
          <p className="font-mono text-sm text-warm-coral tracking-widest uppercase mb-4">
            The Episode
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            A Look Inside the{" "}
            <span className="gradient-text">Iconic Fontainebleau</span>
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black aspect-video shadow-2xl shadow-black/40"
        >
          <iframe
            src="https://www.youtube-nocookie.com/embed/7x0nV-e70Wc?rel=0&modestbranding=1"
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="The Hospitality Mentor"
          />
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
                <p className="font-mono text-xs tracking-widest uppercase text-warm-coral mb-2">
                  Client
                </p>
                <p className="font-headline text-lg font-semibold text-pure-white">
                  {overview.client}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-warm-coral mb-2">
                  Category
                </p>
                <p className="font-body text-cool-gray">
                  {overview.industry}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-warm-coral mb-2">
                  Format
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
              The Story
            </p>
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-8">
              The people and places{" "}
              <span className="text-white">behind the magic</span>
            </h2>
            <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
              <p>
                We wanted to shine a light on the hard-working people and
                beautiful places that make hospitality such a magical industry.
                In this episode of The Hospitality Mentor, we feature the
                Fontainebleau Miami Beach Hotel.
              </p>
              <p>
                This hotel is a special place. It has been creating lifelong
                memories for guests since it opened in 1954. Come on a journey
                with The Hospitality Mentor as we learn about what makes this
                hotel so magical.
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
            From the lobby to{" "}
            <span className="text-white">the final cut</span>
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
            Frames
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            Character & <span className="text-white">Location Frames</span>
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
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/36260dbf-5542-4beb-8e58-8c29508d31f1_rw_3840.jpg?h=e4c0a60847058ccefbf7b4d46fd543e2"
                alt="Fontainebleau Miami Beach cinematic still 1"
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
            </div>
          </motion.div>

          {/* Row 2: Wide + tall */}
          <motion.div variants={galleryItem} className="md:col-span-7">
            <div className="aspect-[16/10] rounded-2xl overflow-hidden relative group">
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/5c769b0c-465e-4b2f-85c6-cc7b98778c49_rw_3840.jpg?h=cdb8228ade21e66f1affc343d0ef322d"
                alt="Fontainebleau Miami Beach cinematic still 2"
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
            </div>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-5">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden relative group">
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/691f76f8-a588-432b-ab11-065ec59b0a0b_rw_3840.jpg?h=ae9e2554c37a6c9afe2f55d02d2792cc"
                alt="Fontainebleau Miami Beach cinematic still 3"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
            </div>
          </motion.div>

          {/* Row 3: Three equal columns */}
          <motion.div variants={galleryItem} className="md:col-span-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/8c7398dd-4282-4ddc-873d-521dcee46d76_rw_3840.jpg?h=19fe9f7b33bc81864b8810735dc77586"
                alt="Fontainebleau Miami Beach cinematic still 4"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
            </div>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/a320897b-6515-41fc-b406-6c19c703b083_rw_3840.jpg?h=822959a337e879c542ed3a40a347e19c"
                alt="Fontainebleau Miami Beach cinematic still 5"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
            </div>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/8564b4c1-291a-41ae-9a83-59135b9956ab_rw_3840.jpg?h=c2fccdb5a76147d85f2609b266b1fd82"
                alt="Fontainebleau Miami Beach cinematic still 6"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
            </div>
          </motion.div>

          {/* Row 4: Asymmetric pair */}
          <motion.div variants={galleryItem} className="md:col-span-5">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden relative group">
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/7c7fb05d-78bb-43a8-82c3-4a1a5cc7f5fb_rw_3840.jpg?h=a392d944f5e60d6642c9185cae426438"
                alt="Fontainebleau Miami Beach cinematic still 7"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
            </div>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-7">
            <div className="aspect-[16/10] rounded-2xl overflow-hidden relative group">
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/e9c164e4-0e05-4ab3-a9f1-8b183a0b9677_rw_3840.jpg?h=3a6711cbe9f04febe3b9d25c311e64e4"
                alt="Fontainebleau Miami Beach cinematic still 8"
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
            </div>
          </motion.div>

          {/* Row 5: Full-width closing */}
          <motion.div variants={galleryItem} className="md:col-span-12">
            <div className="aspect-[21/9] rounded-2xl overflow-hidden relative group">
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/026b1245-42eb-4ad3-a850-f245624bcd44_rw_3840.jpg?h=a300b5c31fec6bae40aa6a3d7874c3b9"
                alt="Fontainebleau Miami Beach cinematic closing still"
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-warm-coral/20 transition-colors duration-500 pointer-events-none" />
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
          <p className="font-mono text-sm text-warm-coral tracking-widest uppercase mb-4">
            The Result
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            A magical hotel,{" "}
            <span className="text-white">captured in 4K</span>
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
            The <span className="text-white">production stack</span>
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
            <span className="text-white">your story cinematically</span>?
          </h2>
          <p className="font-body text-cool-gray text-base md:text-lg leading-relaxed mb-10">
            Let&rsquo;s create premium video content that captures the soul of
            your brand and commands attention.
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
