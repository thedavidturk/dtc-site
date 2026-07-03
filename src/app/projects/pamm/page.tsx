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
  hidden: { opacity: 0, y: 50, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Media (scraped, verified 200)                                      */
/* ------------------------------------------------------------------ */

const CDN =
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104";

const img = {
  hero: `${CDN}/6c60eb32-ab3d-4440-9760-a51d8972b648_rw_1920.png?h=d4d4979677cb67b029b6a7d91ecdf14d`,
  identity: `${CDN}/122121c7-f690-4fa8-979b-0b63b9f89aa4_rw_1920.png?h=bb76a662ee67a634a00b4cc1238909d2`,
  g1: `${CDN}/271b41c8-becd-45ec-85db-c6e687fba714_rw_1200.png?h=412067a06fddc410320e5ae36b11238e`,
  g2: `${CDN}/6b478864-2a60-4fec-b428-b487585824a3_rw_1200.png?h=4e56c9368f031bda4394aeffec973600`,
  g3: `${CDN}/798d9196-e64c-4bfe-bf6f-a93d1bd54c58_rw_1200.png?h=c1ce51d3a348e8cdc74cdde0e2a4e9af`,
  g4: `${CDN}/c175f207-3a1d-4c6f-ac18-764323462cd7_rw_1200.png?h=63dd73019374d89ac73c4c0efd32abad`,
  g5: `${CDN}/f626950b-3460-4266-b352-7d2f75e97975_rw_1200.png?h=9ecd756c844dcfb0437757579aedc674`,
  g6: `${CDN}/1645b182-4852-4138-9438-dc377400b56a_rw_600.png?h=22c3b73b893e1fe5770d333e52b89053`,
  g7: `${CDN}/7a723c2b-f1a3-4425-83b6-3e85e6b448f6_rw_600.png?h=9373069e9cd8dfe5d5d10c218ffd1bdd`,
  g8: `${CDN}/85ff7fb9-1893-455d-91f4-be10a0db3e3b_rw_600.png?h=bfe1afaff952f2699c981f22dbff117a`,
  g9: `${CDN}/a64f7059-1bc3-4209-93f5-e491a53a1d49_rw_600.png?h=2f822fc6c4e222e2738f83ad81413e2d`,
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const overview = {
  client: "Pérez Art Museum Miami",
  industry: "Cultural Institution / Contemporary Art",
  timeline: "Multi-Phase Engagement",
  services: [
    "Brand & Campaign Creative",
    "Art Direction",
    "Content & Social",
    "Experiential Activation",
    "Member & Audience Growth",
  ],
};

const approach = [
  {
    step: "01",
    title: "Reading the Room",
    description:
      "PAMM sits where Biscayne Bay meets downtown Miami, a building designed to dissolve the line between inside and outside. We started by studying how visitors actually move through it, from the hanging gardens to the galleries, so the creative could feel like the museum rather than sit on top of it.",
  },
  {
    step: "02",
    title: "A Visual System Built to Flex",
    description:
      "Contemporary art changes every season, so the identity had to hold a rotating roster of artists without flattening any of them. We built a flexible system of type, color, and layout that frames the work, gives each exhibition room to breathe, and still reads unmistakably as PAMM.",
  },
  {
    step: "03",
    title: "Campaigns Around the Work",
    description:
      "Each exhibition got its own campaign, designed to translate from a banner on the bay to a phone screen on the train. Art direction stayed in service of the artists, letting the pieces lead while the system carried the museum voice across every placement.",
  },
  {
    step: "04",
    title: "Content That Lives Online",
    description:
      "Beyond the walls, we produced social-first content that brought openings, talks, and behind-the-scenes moments to a Miami audience that lives on its phone. The goal was simple: make people who had never thought of themselves as museum people feel like PAMM was theirs.",
  },
  {
    step: "05",
    title: "Showing Up in the City",
    description:
      "We extended the brand into the physical city through experiential touchpoints and activations timed to Miami's cultural calendar, turning the museum into a participant in the scene rather than a destination people visited once.",
  },
];

const tools = [
  {
    name: "Brand Systems",
    description:
      "A flexible identity system designed to frame a constantly rotating program of contemporary artists without losing the museum's own voice.",
  },
  {
    name: "Art Direction",
    description:
      "Exhibition-led art direction that keeps the artwork in the lead role while carrying a consistent institutional look across every channel.",
  },
  {
    name: "Social & Content",
    description:
      "Social-first content built for a young, mobile Miami audience, turning openings and programming into shareable cultural moments.",
  },
  {
    name: "Experiential",
    description:
      "Activations and physical touchpoints that bring the brand off the bay and into the streets, events, and conversations of the city.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PammProject() {
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
        <div className="absolute inset-0">
          <Image
            src={img.hero}
            alt="Pérez Art Museum Miami creative campaign"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-deep-space via-deep-space/40 to-transparent" />

        <div className="section-container relative z-10 pb-16 md:pb-24 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-white/70 mb-4 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm bg-white/5">
              Cultural Branding + Content
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4"
          >
            PÉREZ ART MUSEUM MIAMI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-2xl md:text-3xl lg:text-4xl font-medium text-white/80 tracking-tight"
          >
            A Museum That Feels Like Miami
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-electric-indigo to-warm-coral mt-8"
          />
        </div>
      </section>

      {/* ── In Motion (GIF Band) ─────────────────────────────────── */}
      <ProjectGifBand
        eyebrow="In Motion"
        heading="The Identity, Moving"
        gifs={[
          {
            src: "/motion/pamm.mp4",
            poster: "/motion/pamm.jpg",
            label: "PAMM",
          },
        ]}
      />

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
                <p className="font-mono text-xs tracking-widest uppercase text-electric-indigo mb-2">
                  Client
                </p>
                <p className="font-headline text-lg font-semibold text-pure-white">
                  {overview.client}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-electric-indigo mb-2">
                  Industry
                </p>
                <p className="font-body text-cool-gray">{overview.industry}</p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-electric-indigo mb-2">
                  Engagement
                </p>
                <p className="font-body text-cool-gray">{overview.timeline}</p>
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
            <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
              The Challenge
            </p>
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-8">
              Make a world-class museum feel{" "}
              <span className="gradient-text">like it belongs to Miami</span>
            </h2>
            <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
              <p>
                Pérez Art Museum Miami is one of the most architecturally
                striking contemporary art institutions in the country, perched on
                Biscayne Bay with hanging gardens and open-air galleries that
                blur the boundary between the building and the bay. The challenge
                was never the art or the architecture. It was perception.
              </p>
              <p>
                Plenty of Miamians still saw a museum as something formal,
                expensive, and a little intimidating, a place for tourists and
                collectors rather than locals. The brief was to keep PAMM
                unmistakably world-class while making it feel open, current, and
                genuinely of the city, so a young, diverse, mobile audience would
                see it as their museum.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Identity Feature ──────────────────────────────────────── */}
      <section className="section-container section-padding">
        <motion.div
          variants={galleryItem}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl shadow-black/30 relative group">
            <div className="relative w-full h-full">
              <Image
                src={img.identity}
                alt="PAMM brand identity system"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 80vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Our Approach ─────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
            Our Approach
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            From the bay to the{" "}
            <span className="text-white">feed</span>
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

      {/* ── The Solution ─────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-4xl"
        >
          <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
            The Solution
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Let the art lead,{" "}
            <span className="text-white">let the city in</span>
          </h2>
          <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
            <p>
              We built a brand system flexible enough to frame a constantly
              changing program of contemporary artists without ever competing
              with the work. Type, color, and layout were designed to step back
              and let each exhibition speak, while a consistent institutional
              voice held everything together from a bayfront banner to a
              fifteen-second story.
            </p>
            <p>
              Around that system we produced campaigns and social-first content
              tuned to how Miami actually lives, fast, visual, and mobile. The
              point was to take the energy already inside the museum, the
              openings, the talks, the architecture at golden hour, and push it
              out into the city so that people who never pictured themselves at a
              museum started to feel like PAMM was made for them too.
            </p>
          </div>
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
          <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
            Selected Work
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            Identity, campaigns &{" "}
            <span className="text-white">content</span>
          </h2>
        </motion.div>

        <motion.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6"
        >
          {/* Row 1: wide + portrait */}
          <motion.div variants={galleryItem} className="md:col-span-7">
            <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl shadow-black/20 relative group">
              <div className="relative w-full h-full">
                <Image
                  src={img.g1}
                  alt="PAMM exhibition campaign"
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={galleryItem} className="md:col-span-5">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/20 relative group">
              <div className="relative w-full h-full">
                <Image
                  src={img.g6}
                  alt="PAMM campaign key art"
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Row 2: offset editorial */}
          <motion.div
            variants={galleryItem}
            className="md:col-span-5 md:col-start-2"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/20 relative group">
              <div className="relative w-full h-full">
                <Image
                  src={img.g2}
                  alt="PAMM brand application"
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={galleryItem} className="md:col-span-6">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl shadow-black/20 relative group">
              <div className="relative w-full h-full">
                <Image
                  src={img.g3}
                  alt="PAMM social content"
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Row 3: three equal columns */}
          <motion.div variants={galleryItem} className="md:col-span-4">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-black/20 relative group">
              <div className="relative w-full h-full">
                <Image
                  src={img.g7}
                  alt="PAMM content detail"
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={galleryItem} className="md:col-span-4">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-black/20 relative group">
              <div className="relative w-full h-full">
                <Image
                  src={img.g8}
                  alt="PAMM content detail"
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={galleryItem} className="md:col-span-4">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-black/20 relative group">
              <div className="relative w-full h-full">
                <Image
                  src={img.g9}
                  alt="PAMM content detail"
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Row 4: asymmetric pair */}
          <motion.div variants={galleryItem} className="md:col-span-6">
            <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl shadow-black/20 relative group">
              <div className="relative w-full h-full">
                <Image
                  src={img.g4}
                  alt="PAMM campaign system"
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={galleryItem} className="md:col-span-6">
            <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl shadow-black/20 relative group">
              <div className="relative w-full h-full">
                <Image
                  src={img.g5}
                  alt="PAMM campaign system"
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Capabilities ─────────────────────────────────────────── */}
      <section className="section-container section-padding">
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
            The <span className="text-white">creative toolkit</span>
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
      <section className="section-container section-padding">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Have a brand worth{" "}
            <span className="text-white">showing off</span>?
          </h2>
          <p className="font-body text-cool-gray text-base md:text-lg leading-relaxed mb-10">
            Let&rsquo;s build a creative system that frames your work, reaches
            your city, and still feels like you across every screen and street.
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
