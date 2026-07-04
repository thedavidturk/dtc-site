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
  hidden: { opacity: 0, y: 50, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Media (scraped from live portfolio, exact size + hash pairings)    */
/* ------------------------------------------------------------------ */

const img = {
  hero: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/423a265d-ea56-49bc-8bb9-0b43f67218df_rw_1920.png?h=36ae7127653cc2259f7e19a1241ae691",
  g1: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/00bc8cf7-4b26-4999-a53d-d3f4b5b10892_rw_600.png?h=9d54251d4010db31aad6541626268807",
  g2: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/37b87f49-b443-42e7-be36-3a45b331995c_rw_600.png?h=84edb0a697233ea06a5e0580ef2945bc",
  g3: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/a5eb1d67-0ee9-415a-b0d6-72d11f8a6058_rw_600.png?h=ab5d7351f1c8b67de05c2e94dc3c0619",
  g4: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/ade88f39-e9e0-4f99-b72f-e352f3a2596c_rw_600.png?h=530c73b26a6acf50a0b26d1aaf7d487a",
  g5: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/b696d37d-504e-47cc-a2c4-70636a6df542_rw_600.png?h=69f3727fbb6766df3ca7750abc1ad6b1",
};

/* Adobe CCV experience film embed scraped from the live source. */
const videoId = "8H9NzhRvvtx";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const overview = {
  client: "Miami Dolphins / Ford",
  industry: "Experiential / Sports Hospitality",
  role: "Creative Director",
  services: [
    "Experiential Creative Direction",
    "Premium Hospitality Concept",
    "Spatial & Environmental Design",
    "Brand Integration",
    "On-Site Activation",
  ],
};

const approach = [
  {
    step: "01",
    title: "Reading the Room, and the Stadium",
    description:
      "I started where the fan starts, at the threshold. The Ford Field Club lives at the edge of the field at Hard Rock Stadium, so the brief was never about decorating a lounge. It was about choreographing the moment a guest steps out of the concourse and into the most exclusive vantage point in the building. Every decision flowed from that arrival.",
  },
  {
    step: "02",
    title: "A Club That Feels Like Miami",
    description:
      "Directing the creative, I pushed the space to feel unmistakably Miami, warm, confident, a little electric, without leaning on cliche. The palette, the materials, and the light were tuned so the club reads as premium and local at once, a place that belongs to the Dolphins and to the city around them.",
  },
  {
    step: "03",
    title: "Ford as Host, Not Sponsor",
    description:
      "The challenge with any brand partner inside a sports venue is presence without intrusion. I directed the Ford integration so the brand behaves like a host rather than a logo, woven into the experience through the design language and the touchpoints guests actually use, so it earns attention instead of demanding it.",
  },
  {
    step: "04",
    title: "Designing the Field-Level Moment",
    description:
      "The payoff of the Ford Field Club is proximity. I shaped the sightlines, the flow, and the pacing so the field-level access feels like a reward that builds across the visit, from the welcome to the rail, where the game is close enough to feel in your chest.",
  },
  {
    step: "05",
    title: "Holding the Standard On-Site",
    description:
      "Premium hospitality is won or lost in execution, so I stayed close through activation, making sure the environment, the brand moments, and the service touchpoints all landed at the level the concept promised. The goal was a club that feels effortless to the guest because every detail behind it was deliberate.",
  },
];

const results = [
  "A field-level club experience designed as the most exclusive vantage point at Hard Rock Stadium",
  "A premium hospitality environment tuned to feel distinctly Miami and distinctly Dolphins",
  "Ford integrated as a host within the experience rather than as overlaid sponsorship",
  "Arrival, flow, and field access choreographed into a single rising moment",
  "A repeatable standard for environment, brand, and service held through live game-day activation",
];

const capabilities = [
  {
    name: "Experiential Direction",
    description:
      "End-to-end creative direction of the guest journey, from concourse arrival to field-level access, treated as one continuous experience.",
  },
  {
    name: "Environmental Design",
    description:
      "Spatial, material, and lighting direction that gives the club a premium, local point of view inside a large-scale venue.",
  },
  {
    name: "Brand Integration",
    description:
      "Direction of the Ford presence so the partnership reads as hospitality, woven into the touchpoints guests use rather than bolted on.",
  },
  {
    name: "On-Site Activation",
    description:
      "Hands-on oversight through game day to hold the environment, brand, and service to the standard the concept set.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FordFieldClubProject() {
  return (
    <article className="bg-deep-space min-h-screen" style={{ backgroundColor: "#120D1A" }}>
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
            src={img.hero}
            alt="Ford Field Club at Hard Rock Stadium"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/45" />

        {/* Radial fade at bottom */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-deep-space via-deep-space/40 to-transparent" />

        <div className="section-container relative z-10 pb-16 md:pb-24 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-white/70 mb-4 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm bg-white/5">
              Experiential Creative Direction
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-h1 font-bold mb-4"
          >
            FORD FIELD CLUB
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-2xl md:text-3xl lg:text-4xl font-medium text-white/80 tracking-tight"
          >
            Field-Level Hospitality at Hard Rock Stadium
          </motion.p>

          {/* Animated line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-electric-indigo to-warm-coral mt-8"
          />
        </div>
      </section>

      {/* ── GIF Band ──────────────────────────────────────────────── */}
      <ProjectGifBand
        eyebrow="In Motion"
        heading="Gameday in Motion"
        gifs={[
          {
            src: "/motion/ford-field-club.mp4",
            poster: "/motion/ford-field-club.jpg",
            label: "Ford Field Club",
          },
        ]}
      />

      {/* ── Overview Sidebar + Challenge ──────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#120D1A" }}>
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
                  Role
                </p>
                <p className="font-body text-cool-gray">{overview.role}</p>
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
              The Challenge
            </p>
            <h2 className="font-headline text-h3 font-bold mb-8">
              A premium club{" "}
              <span className="gradient-text">at the edge of the field</span>
            </h2>
            <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
              <p>
                The Ford Field Club sits in one of the most coveted positions in
                all of sports, field level at Hard Rock Stadium, home of the
                Miami Dolphins. A vantage point that exclusive carries its own
                expectation. The space could not feel like a hospitality area
                that happened to be near the action. It had to feel like the
                reason you came.
              </p>
              <p>
                As the creative director on the experience, my job was to take a
                premium club concept and a brand partnership with Ford and turn
                them into a single, coherent moment, one that felt genuinely
                Miami, genuinely Dolphins, and genuinely worth the access. The
                brand had to live inside the experience without ever talking over
                it, and every part of the journey had to build toward the field.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── The Film (Video) ─────────────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#120D1A" }}>
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
          <h2 className="font-headline text-h3 font-bold">
            Step inside{" "}
            <span className="text-white">the Ford Field Club</span>
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

            {/* 16:9 responsive embed (Adobe CCV player from the source case study) */}
            <div className="relative w-full aspect-video">
              <iframe
                src={`https://www-ccv.adobe.io/v1/player/ccv/${videoId}/embed?bgcolor=%23120D1A&lazyLoading=true&api_key=BehancePro2View`}
                title="Ford Field Club at Hard Rock Stadium"
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
      <section className="section-container section-padding" style={{ backgroundColor: "#120D1A" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
            The Approach
          </p>
          <h2 className="font-headline text-h3 font-bold">
            Directing the experience{" "}
            <span className="text-white">end to end</span>
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
      <section className="section-container section-padding" style={{ backgroundColor: "#120D1A" }}>
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
          <h2 className="font-headline text-h3 font-bold mb-8">
            Access as the story,{" "}
            <span className="text-white">Ford as the host</span>
          </h2>
          <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
            <p>
              I directed the Ford Field Club as one continuous arc rather than a
              collection of features. The arrival sets the tone, the club holds
              the guest in a space that feels warm, premium, and unmistakably
              Miami, and the field-level access pays it all off. The further a
              guest moves through the experience, the closer the game gets, until
              the rail puts them right on top of the action.
            </p>
            <p>
              Ford runs through the whole thing as a host, not a billboard. I
              directed the integration so the brand shows up in the design
              language and the touchpoints guests actually use, present and
              confident without ever interrupting the moment. The result is a
              club where the partnership feels like part of the hospitality, and
              the field feels like the reward you were always headed toward.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Gallery ──────────────────────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#120D1A" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
            The Club
          </p>
          <h2 className="font-headline text-h3 font-bold">
            Inside the{" "}
            <span className="text-white">Ford Field Club</span>
          </h2>
        </motion.div>

        <motion.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6"
        >
          {/* Row 1 - wide + tall */}
          <motion.div variants={galleryItem} className="md:col-span-7">
            <div className="aspect-[16/10] rounded-2xl overflow-hidden relative group">
              <Image
                src={img.g1}
                alt="Ford Field Club premium hospitality detail"
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-electric-indigo/20 transition-colors duration-500 pointer-events-none" />
            </div>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-5">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden relative group">
              <Image
                src={img.g2}
                alt="Ford brand integration within the club"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-electric-indigo/20 transition-colors duration-500 pointer-events-none" />
            </div>
          </motion.div>

          {/* Row 2 - three equal columns */}
          <motion.div variants={galleryItem} className="md:col-span-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
              <Image
                src={img.g3}
                alt="Field-level vantage point at Hard Rock Stadium"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-electric-indigo/20 transition-colors duration-500 pointer-events-none" />
            </div>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
              <Image
                src={img.g4}
                alt="Spatial and environmental design of the club"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-electric-indigo/20 transition-colors duration-500 pointer-events-none" />
            </div>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
              <Image
                src={img.g5}
                alt="Guest hospitality touchpoint at the Ford Field Club"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
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
      <section className="section-container section-padding" style={{ backgroundColor: "#120D1A" }}>
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
          <h2 className="font-headline text-h3 font-bold">
            A club that{" "}
            <span className="text-white">earns the access</span>
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

      {/* ── Capabilities ─────────────────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#120D1A" }}>
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
          <h2 className="font-headline text-h3 font-bold">
            The <span className="text-white">direction toolkit</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {capabilities.map((cap) => (
            <motion.div
              key={cap.name}
              variants={staggerItem}
              className="group p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:border-electric-indigo/20 hover:bg-electric-indigo/[0.03] transition-all duration-500"
            >
              <h3 className="font-headline text-lg font-bold text-pure-white mb-2 group-hover:text-electric-indigo transition-colors duration-300">
                {cap.name}
              </h3>
              <p className="font-body text-sm text-cool-gray leading-relaxed">
                {cap.description}
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
      <section className="section-container section-padding" style={{ backgroundColor: "#120D1A" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-headline text-h2 font-bold mb-6">
            Building an experience{" "}
            <span className="text-white">worth showing up for</span>?
          </h2>
          <p className="font-body text-cool-gray text-base md:text-lg leading-relaxed mb-10">
            Let&rsquo;s direct a premium environment that turns access into a
            moment people remember, from the threshold to the main event.
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
