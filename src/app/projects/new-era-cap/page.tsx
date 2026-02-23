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
    transition: { staggerChildren: 0.12 },
  },
};

const galleryItem = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const overview = {
  client: "New Era Cap",
  industry: "Fashion / Headwear",
  scope: "4 Campaigns",
  services: [
    "Research & Discovery",
    "Creative Strategy",
    "3D Animation & Sequencing",
    "Post-Production & VFX",
    "Multi-Platform Delivery",
  ],
};

const campaigns = [
  {
    id: "out-of-this-world",
    title: "Out of This World",
    subtitle: "Space-themed collection campaign",
    description:
      "A cinematic campaign that placed New Era's space-themed caps inside immersive cosmic environments. We built entire planets, star fields, and galaxies in 3D, then wove the product into each world so the audience could feel the wonder of space exploration, not just see a hat in front of it.",
    accent: "electric-indigo",
    images: [
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/6a9909de-e004-4637-b305-03c7c3afc105_rw_1920.png?h=0d2513de6a3d5442c9276b98ca32ddb3", alt: "Cosmic hero shot", aspect: "aspect-[16/10]", span: "md:col-span-7" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/9ec30c8f-1df0-44b6-beb6-4574f6a913b4_rw_1920.png?h=eeb922659707c7884cabc10a61293320", alt: "Planet environment", aspect: "aspect-[3/4]", span: "md:col-span-5" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/cc3a4fbe-4ca6-4d60-bca6-51799a85db47_rw_1920.png?h=441fe9462b246273ed82dd6f83b66778", alt: "Star field product shot", aspect: "aspect-[4/3]", span: "md:col-span-6" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/cb41ea3b-ac5a-4a74-8885-3a71b4a98a0c_rw_1920.png?h=18dd0e4e6a38f61470aa5c22c2946a1a", alt: "Galaxy campaign visual", aspect: "aspect-[4/3]", span: "md:col-span-6" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/640046cb-6deb-42c6-8f45-85daed849b04_rw_1920.png?h=9d2436cf80cf1291ef946d98bf298c79", alt: "Cosmic cap close-up", aspect: "aspect-[16/9]", span: "md:col-span-7" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/f2556d88-e571-40ba-a976-5a4d51c6a6eb_rw_1920.png?h=12bfdb634517cd415cb4f17ec9361e37", alt: "Space environment detail", aspect: "aspect-square", span: "md:col-span-5" },
    ],
  },
  {
    id: "sprouted",
    title: "Sprouted Collection",
    subtitle: "Nature-inspired foliage campaign",
    description:
      "A nature-inspired campaign bringing New Era's foliage-themed hat collection to life through immersive 3D environments. We built lush forests, mushroom hilltops, and overgrown cityscapes, grounding each cap in a world that felt as organic and alive as the designs themselves.",
    accent: "emerald-400",
    images: [
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/9093a3b0-956b-49e3-a039-06897868e553_rw_1200.png?h=bf736fd7c3636fa8eedc8a44dd910bcd", alt: "Forest environment hero", aspect: "aspect-[16/10]", span: "md:col-span-6" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/81c15846-3edc-43b1-bd8c-21a7cae08637_rw_1200.png?h=c8ff17d05d3e9612c76960bd7b9a7f4c", alt: "Mushroom hilltop scene", aspect: "aspect-[16/10]", span: "md:col-span-6" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/4cbd526d-9906-447f-91d0-5c6e59f609e8_rw_1200.png?h=0cc9df9997bca5886ff834d500818b09", alt: "Overgrown cityscape", aspect: "aspect-[4/3]", span: "md:col-span-5" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/4d442495-867e-4cb8-893d-324b0d8b7891_rw_1200.png?h=c7e466457f34bb51662ca58b05450614", alt: "Product in nature", aspect: "aspect-[4/3]", span: "md:col-span-7" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/2e0e99b6-fca3-46e9-ac63-c8c03e8b1293_rw_1920.png?h=1dfc1086152293dc45601cb3ab9b8dc3", alt: "Foliage cap detail", aspect: "aspect-[16/9]", span: "md:col-span-12" },
    ],
  },
  {
    id: "elements",
    title: "Elements",
    subtitle: "Earth, Fire, Air & Water 3D animation",
    description:
      "Immersive elemental environments built to showcase New Era's Elements collection. Each hat was reconstructed through photogrammetry and placed inside its own world: volcanic landscapes for Fire, underwater caverns for Water, windswept peaks for Air, and ancient forests for Earth.",
    accent: "amber-400",
    images: [
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/bc84ed39-2bc9-411a-8290-6f0cc5b43df2_rw_3840.png?h=ccf4884ee6b1129fa7a3eecd9ddb11f9", alt: "Elements hero shot", aspect: "aspect-[21/9]", span: "md:col-span-12" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/5320bf72-8ee0-4db5-baec-efa352e93988_rw_3840.png?h=0a6bf09111cac68772eec801db975fd5", alt: "Fire element world", aspect: "aspect-[4/3]", span: "md:col-span-6" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/6f3db669-3a2f-4529-b2bb-8ab286f37bfe_rw_3840.png?h=a1e1e912dc0671a55cc143d02cf4888b", alt: "Water element world", aspect: "aspect-[4/3]", span: "md:col-span-6" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/ab23358c-183c-40a9-a20d-47805b1c8a1b_rw_3840.png?h=0d3ff6176f94da406a941bf52c2e10e2", alt: "Air element world", aspect: "aspect-[4/3]", span: "md:col-span-4" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/25bbc284-4291-46d4-8d96-e04f76ddcace_rw_1200.png?h=6064da262bda1da39f13bc149324cc1f", alt: "Earth element world", aspect: "aspect-[4/3]", span: "md:col-span-4" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/70ac1f4f-322c-46ab-a6c9-d88e19efbef6_rw_1200.png?h=d6b030c01cd6de104c8e502386b61df8", alt: "Elements product detail", aspect: "aspect-[4/3]", span: "md:col-span-4" },
    ],
  },
  {
    id: "holiday-2023",
    title: "Holiday 2023",
    subtitle: "Festive VFX campaign",
    description:
      "A festive opening sequence featuring a single brownstone on a snowy city block, built entirely in 3D. We captured the essence of a cozy holiday night with warm glowing windows, falling snow, and dynamic camera movement, delivering high-end production value without a single location shoot.",
    accent: "red-400",
    images: [
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/f5254e37-7c30-48ac-9a2c-cf4191fa8719_rw_3840.png?h=6bcd777da7c646bb14244acd5c429f4d", alt: "Holiday brownstone hero", aspect: "aspect-[16/10]", span: "md:col-span-7" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/bc9ba708-0c5a-4b56-ae4a-269322f2a34b_rw_3840.png?h=3cc752b80414e61c042eed64e1b8eeaa", alt: "Snowy street scene", aspect: "aspect-[3/4]", span: "md:col-span-5" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/1efa6945-881d-43fb-b59f-4c7456626f82_rw_3840.png?h=12069a14eac4b52fa136db33c2878e2e", alt: "Holiday environment detail", aspect: "aspect-[4/3]", span: "md:col-span-6" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/720cfec1-6be7-4eca-9c29-f4e355526930_rw_1920.png?h=f4b28d19628f8f76bf9222a33fe68d45", alt: "Warm window glow close-up", aspect: "aspect-[4/3]", span: "md:col-span-6" },
      { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/891f4e22-59c4-42e2-bcca-c6f989850a28_rw_1920.png?h=9cf6e144f3e3478c09c3eaba75bcd88f", alt: "Holiday product shot", aspect: "aspect-[16/9]", span: "md:col-span-12" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Campaign Section Component                                         */
/* ------------------------------------------------------------------ */

function CampaignSection({
  campaign,
  index,
}: {
  campaign: (typeof campaigns)[0];
  index: number;
}) {
  // Alternate interactive component per campaign
  const wrappers = [
    // Campaign 0: TiltCard + HolographicSheen
    (children: React.ReactNode, i: number) =>
      i % 2 === 0 ? (
        <TiltCard className="rounded-2xl overflow-hidden">
          <HolographicSheen className="rounded-2xl">{children}</HolographicSheen>
        </TiltCard>
      ) : (
        <DistortionCard className="rounded-2xl overflow-hidden">{children}</DistortionCard>
      ),
    // Campaign 1: DistortionCard + TiltCard
    (children: React.ReactNode, i: number) =>
      i % 2 === 0 ? (
        <DistortionCard className="rounded-2xl overflow-hidden">{children}</DistortionCard>
      ) : (
        <TiltCard maxTilt={10} className="rounded-2xl overflow-hidden">
          <HolographicSheen className="rounded-2xl">{children}</HolographicSheen>
        </TiltCard>
      ),
    // Campaign 2: HolographicSheen + TiltCard
    (children: React.ReactNode, i: number) =>
      i % 3 === 0 ? (
        <HolographicSheen className="rounded-2xl">
          <TiltCard className="rounded-2xl overflow-hidden">{children}</TiltCard>
        </HolographicSheen>
      ) : (
        <TiltCard maxTilt={12} className="rounded-2xl overflow-hidden">{children}</TiltCard>
      ),
    // Campaign 3: Mixed
    (children: React.ReactNode, i: number) =>
      i === 0 ? (
        <TiltCard className="rounded-2xl overflow-hidden">
          <HolographicSheen className="rounded-2xl">{children}</HolographicSheen>
        </TiltCard>
      ) : (
        <DistortionCard className="rounded-2xl overflow-hidden">{children}</DistortionCard>
      ),
  ];

  const wrap = wrappers[index % wrappers.length];

  return (
    <section id={campaign.id} className="section-container section-padding">
      {/* Campaign header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-4xl md:text-5xl font-bold text-white/10">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-electric-indigo mb-1">
              {campaign.subtitle}
            </p>
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-pure-white">
              {campaign.title}
            </h2>
          </div>
        </div>
        <p className="font-body text-cool-gray text-base md:text-lg leading-relaxed max-w-4xl">
          {campaign.description}
        </p>
      </motion.div>

      {/* Image gallery */}
      <motion.div
        variants={galleryContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5"
      >
        {campaign.images.map((img, i) => (
          <motion.div key={img.src} variants={galleryItem} className={img.span}>
            {wrap(
              <div
                className={`relative ${img.aspect} overflow-hidden rounded-2xl border border-white/5 hover:border-electric-indigo/20 transition-colors duration-500`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>,
              i
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function NewEraCapProject() {
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
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDBnMzY2M2JzNDFzNms4ejJvZmRyNGo1YmsyYjdlaHZlMXphZG14dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2UeBIRTL9ZA2BvmZD5/giphy.gif"
            alt="New Era Cap campaign visual"
            fill
            className="object-cover"
            unoptimized
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-deep-space via-deep-space/40 to-transparent" />

        {/* Geometric accents */}
        <div className="absolute top-1/4 left-1/5 w-32 h-32 border border-white/[0.06] rounded-full animate-pulse z-[2]" />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 border border-white/10 rounded-xl rotate-12 z-[2]" />

        <div className="section-container relative z-10 pb-16 md:pb-24 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-white/70 mb-4 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm bg-white/5">
              Strategy + 3D Animation + VFX
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4"
          >
            NEW ERA CAP
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-2xl md:text-3xl lg:text-4xl font-medium text-white/80 tracking-tight"
          >
            4 Campaigns. One Vision.
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-electric-indigo to-warm-coral mt-8"
          />
        </div>
      </section>

      {/* ── Overview + Partnership Story ────────────────────────────── */}
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
                  Scope
                </p>
                <p className="font-body text-cool-gray">{overview.scope}</p>
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

          {/* Partnership overview */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-8"
          >
            <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
              The Partnership
            </p>
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-8">
              Building worlds for{" "}
              <span className="gradient-text">an iconic brand</span>
            </h2>
            <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
              <p>
                New Era Cap is one of the most recognized headwear brands in the
                world. Over the course of four campaigns, DT+C became their go-to
                partner for immersive 3D content, transforming each seasonal
                collection into a fully realized visual world.
              </p>
              <p>
                From cosmic galaxies to lush forests, elemental landscapes to snowy
                city blocks, every campaign started with research and creative
                strategy, then came to life through 3D animation, VFX, and
                cinematic sequencing. No location shoots. No physical sets. Just
                ambitious creative delivered at the speed their release calendar
                demanded.
              </p>
            </div>

            {/* Campaign quick nav */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-10 grid grid-cols-2 gap-3"
            >
              {campaigns.map((c, i) => (
                <motion.a
                  key={c.id}
                  href={`#${c.id}`}
                  variants={staggerItem}
                  className="group p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-electric-indigo/20 hover:bg-electric-indigo/[0.03] transition-all duration-500"
                >
                  <span className="font-mono text-xs text-electric-indigo/50 group-hover:text-electric-indigo transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-headline text-sm font-bold text-pure-white mt-1">
                    {c.title}
                  </p>
                  <p className="font-body text-xs text-cool-gray mt-0.5">
                    {c.subtitle}
                  </p>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Campaign Sections ───────────────────────────────────────── */}
      {campaigns.map((campaign, index) => (
        <div key={campaign.id}>
          <div className="section-container">
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          <CampaignSection campaign={campaign} index={index} />
        </div>
      ))}

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
            Ready to build your{" "}
            <span className="gradient-text">next world</span>?
          </h2>
          <p className="font-body text-cool-gray text-base md:text-lg leading-relaxed mb-10">
            Let&rsquo;s create a campaign with the same cinematic ambition and
            creative strategy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact" className="btn-primary">
              Book a Call
            </Link>
            <Link
              href="/projects/seaworld"
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
