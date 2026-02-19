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
  client: "El Ancon de Loiza & Proyecto Todes",
  industry: "Nonprofit / Cultural Preservation",
  timeline: "8 Weeks",
  services: [
    "Research & Discovery",
    "Campaign Strategy",
    "Documentary Production",
    "Photography & Exhibition",
    "Immersive Event Production",
  ],
};

const approach = [
  {
    step: "01",
    title: "Research & Cultural Immersion",
    description:
      "Embedded with the community in Loiza, Puerto Rico to understand the post-Hurricane Maria landscape — the economic pressures, the cultural erasure, and the role of vejigante mask traditions as symbols of resistance. This research became the foundation for every creative decision.",
  },
  {
    step: "02",
    title: "Campaign Strategy",
    description:
      "Developed a two-phase strategy: a documentary released through Puerto Rican artist networks and Latinx influencers to build awareness, followed by Proyecto Todes — a Miami activation amplifying LGBTQ voices within the Afro-Caribbean community. Each phase built on the last.",
  },
  {
    step: "03",
    title: "Documentary Production",
    description:
      "Produced and directed a documentary capturing the intersection of tradition, identity, and resilience in Loiza. The film centered the community's own voices and stories, distributed through social media to reach diaspora audiences.",
  },
  {
    step: "04",
    title: "Photography & Exhibition",
    description:
      "Created a portrait photography exhibition featuring 12 Afro-Caribbean subjects across diverse genders, ages, and beliefs. Subjects held machetes and labor tools; displayed against indigenous plants and Hurricane Maria debris in Miami's Wynwood arts district.",
  },
  {
    step: "05",
    title: "Immersive Event Production",
    description:
      "Produced a multi-sensory event combining video mapping installations, live bomba drumming and dance, limited edition merchandise, and mobile payment fundraising. Every element was designed to turn attendance into action.",
  },
];

const results = [
  "Spike Lee purchased original vejigante masks from the exhibition",
  "Knight Foundation provided recurring grants for continued programming",
  "El Estuario partnered to build an onsite water purification system",
  "Documentary reached diaspora audiences through artist and influencer networks",
  "Campaign established El Ancon as a cultural center for job training and preservation",
];

const tools = [
  {
    name: "Documentary Production",
    description:
      "Full production pipeline from story development and filming to editorial and distribution across social platforms.",
  },
  {
    name: "Portrait Photography",
    description:
      "Studio-quality portraiture shot on location, printed and exhibited at gallery scale in Wynwood.",
  },
  {
    name: "Video Mapping",
    description:
      "Projection mapping installations that transformed the event space into an immersive cultural experience.",
  },
  {
    name: "Social & Digital Strategy",
    description:
      "Influencer outreach, ambassador programs, and social media distribution targeting Puerto Rican and Latinx audiences.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TodesVejiganteProject() {
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
            src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/736208c5-f9f4-49ab-9e48-3c862261dc42_rw_1920.jpg?h=0d55bd3b23e10a0b7b506f672a98d2f1"
            alt="Todes Vejigante exhibition portrait"
            fill
            className="object-cover"
            unoptimized
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
              Strategy + Campaign Production
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4"
          >
            TODES VEJIGANTE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-2xl md:text-3xl lg:text-4xl font-medium text-white/80 tracking-tight"
          >
            Preserving Heritage Through Story
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
                  Timeline
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
              The Challenge
            </p>
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-8">
              Cultural preservation{" "}
              <span className="gradient-text">against erasure</span>
            </h2>
            <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
              <p>
                In the wake of Hurricane Maria, the community of Loiza, Puerto
                Rico faced a dual threat: the physical devastation of the storm
                and the economic forces of gentrification pushing out
                generations of Afro-Caribbean cultural heritage. El Ancon de
                Loiza needed to establish itself as a community center for job
                training and cultural preservation — but first, people needed to
                care.
              </p>
              <p>
                The challenge: build a campaign that would generate awareness,
                funding, and sustained support for cultural preservation — not
                through charity messaging, but through the power and dignity of
                the culture itself. The traditional vejigante coconut masks of
                Loiza, symbols of resistance against oppression for centuries,
                became our strategic anchor.
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
      <section className="section-container section-padding">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-amber-400 tracking-widest uppercase mb-4">
            Our Approach
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            From research to resistance{" "}
            <span className="gradient-text">in five phases</span>
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

      {/* ── The Solution ─────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-4xl"
        >
          <p className="font-mono text-sm text-amber-400 tracking-widest uppercase mb-4">
            The Solution
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Culture as the campaign{" "}
            <span className="gradient-text">itself</span>
          </h2>
          <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
            <p>
              Rather than producing traditional fundraising content, we made the
              culture the centerpiece. The documentary gave voice to the
              community&rsquo;s own story of resilience. The portrait exhibition
              confronted audiences with the faces and tools of people fighting
              to preserve their heritage. And the immersive event — with live
              bomba drumming, video mapping, and vejigante masks on display —
              turned passive sympathy into active participation.
            </p>
            <p>
              Proyecto Todes extended the campaign into Miami, amplifying LGBTQ
              voices within the Afro-Caribbean community and broadening the
              conversation beyond disaster relief into intersectional cultural
              preservation. Every touchpoint was designed to convert attention
              into lasting support — through merchandise sales, mobile payment
              donations, and social sharing by message ambassadors.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Campaign Gallery ────────────────────────────────────── */}
      <section className="section-container section-padding">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-amber-400 tracking-widest uppercase mb-4">
            Campaign Gallery
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            Portraits, exhibition &{" "}
            <span className="gradient-text">community</span>
          </h2>
        </motion.div>

        <motion.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6"
        >
          {/* Row 1 — wide + tall portrait */}
          <motion.div variants={galleryItem} className="md:col-span-7">
            <DistortionCard>
              <TiltCard className="aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                <div className="relative w-full h-full">
                  <Image
                    src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/5c702b8d-e939-46c9-9a51-21f7465d6b67_rw_1920.jpg?h=0d55bd3b23e10a0b7b506f672a98d2f1"
                    alt="Todes Vejigante community portrait"
                    fill
                    className="object-cover"
                    unoptimized
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
                    src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/a0c12513-c551-46dc-834c-7cc8b86565cf_rw_1920.jpg?h=0d55bd3b23e10a0b7b506f672a98d2f1"
                    alt="Vejigante mask portrait"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </TiltCard>
            </HolographicSheen>
          </motion.div>

          {/* Row 2 — offset editorial */}
          <motion.div variants={galleryItem} className="md:col-span-5 md:col-start-2">
            <TiltCard maxTilt={10} className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
              <div className="relative w-full h-full">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/2366b306-628e-40ef-b957-49ea27e2ca94_rw_1920.png?h=0d55bd3b23e10a0b7b506f672a98d2f1"
                  alt="Campaign identity"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </TiltCard>
          </motion.div>

          <motion.div variants={galleryItem} className="md:col-span-6">
            <DistortionCard>
              <TiltCard className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                <div className="relative w-full h-full">
                  <Image
                    src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/6f6775eb-a524-4ee6-921e-55d7dd255f6c_rw_1920.jpg?h=0d55bd3b23e10a0b7b506f672a98d2f1"
                    alt="Exhibition display"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </TiltCard>
            </DistortionCard>
          </motion.div>

          {/* Row 3 — three equal columns */}
          <motion.div variants={galleryItem} className="md:col-span-4">
            <HolographicSheen>
              <TiltCard className="aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                <div className="relative w-full h-full">
                  <Image
                    src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/bbc241fe-1029-4a0e-9f4d-d44d4eed7c48_rw_1920.jpg?h=0d55bd3b23e10a0b7b506f672a98d2f1"
                    alt="Portrait with machete and plants"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </TiltCard>
            </HolographicSheen>
          </motion.div>

          <motion.div variants={galleryItem} className="md:col-span-4">
            <TiltCard className="aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
              <div className="relative w-full h-full">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/a7c6289a-1050-405d-a340-a793d92b29cd_rw_1920.png?h=0d55bd3b23e10a0b7b506f672a98d2f1"
                  alt="Event production"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </TiltCard>
          </motion.div>

          <motion.div variants={galleryItem} className="md:col-span-4">
            <DistortionCard>
              <TiltCard className="aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                <div className="relative w-full h-full">
                  <Image
                    src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/ec3965ca-86b5-46e9-a8dd-947479c91eeb_rw_1920.png?h=0d55bd3b23e10a0b7b506f672a98d2f1"
                    alt="Bomba drumming performance"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </TiltCard>
            </DistortionCard>
          </motion.div>

          {/* Row 4 — asymmetric pair */}
          <motion.div variants={galleryItem} className="md:col-span-6">
            <HolographicSheen>
              <TiltCard className="aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                <div className="relative w-full h-full">
                  <Image
                    src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/34c014e3-651c-47cb-ae49-3572fc351b0f_rw_1200.png?h=0d55bd3b23e10a0b7b506f672a98d2f1"
                    alt="Video mapping installation"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </TiltCard>
            </HolographicSheen>
          </motion.div>

          <motion.div variants={galleryItem} className="md:col-span-6">
            <TiltCard maxTilt={10} className="aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
              <div className="relative w-full h-full">
                <Image
                  src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/95bd6c52-fbb1-4b5c-b8f4-f13e8bb8ad05_rw_1920.png?h=0d55bd3b23e10a0b7b506f672a98d2f1"
                  alt="Merchandise and fundraising"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </TiltCard>
          </motion.div>

          {/* Row 5 — full-width hero shot */}
          <motion.div variants={galleryItem} className="md:col-span-12">
            <DistortionCard>
              <TiltCard maxTilt={6} className="aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                <div className="relative w-full h-full">
                  <Image
                    src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/7cf1295f-7c6f-4057-a833-094f979df0d3_rw_1200.png?h=0d55bd3b23e10a0b7b506f672a98d2f1"
                    alt="Todes Vejigante community gathering"
                    fill
                    className="object-cover"
                    unoptimized
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

      {/* ── The Result ───────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-amber-400 tracking-widest uppercase mb-4">
            The Result
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            Real impact,{" "}
            <span className="gradient-text">lasting support</span>
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
              className="flex items-start gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-amber-400/20 hover:bg-amber-400/[0.03] transition-all duration-500"
            >
              <svg
                className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5"
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
      <section className="section-container section-padding">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-amber-400 tracking-widest uppercase mb-4">
            Capabilities
          </p>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            The <span className="gradient-text">production toolkit</span>
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
            Have a story{" "}
            <span className="gradient-text">worth telling</span>?
          </h2>
          <p className="font-body text-cool-gray text-base md:text-lg leading-relaxed mb-10">
            Let&rsquo;s build a campaign that turns your mission into
            movement — through research, strategy, and powerful content.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact" className="btn-primary">
              Start Your Project
            </Link>
            <Link
              href="/projects/new-era-cap"
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
