"use client";

import Link from "@/components/TransitionLink";
import Image from "next/image";
import dynamic from "next/dynamic";
import { m } from "framer-motion";
import ProjectGifBand from "@/components/ProjectGifBand";
import Lazy3D from "@/components/Lazy3D";
import PinnedApproach from "@/components/PinnedApproach";
import WorkFrame from "@/components/WorkFrame";
import AutoplayVideo from "@/components/AutoplayVideo";

// Three.js needs the DOM — load client-side only
const ProjectScene = dynamic(() => import("@/components/ProjectScene"), {
  ssr: false,
});

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
  client: "SeaWorld Orlando / United Parks",
  industry: "Entertainment / Theme Parks",
  timeline: "30 Days",
  services: [
    "Virtual World Cinematic",
    "3D Animation",
    "Cinematic Trailer Production",
    "Hero Visual Development",
    "Multi-Platform Delivery",
  ],
};

const approach = [
  {
    step: "01",
    title: "Worldbuilding in Unreal Engine 5",
    description:
      "Built immersive deep-sea environments from the ground up: coral reefs, ancient shipwrecks, bioluminescent zones, and mysterious underwater landscapes, all designed to evoke wonder and exploration.",
  },
  {
    step: "02",
    title: "Cinematic Trailer Production",
    description:
      "Produced a 30-second teaser trailer using in-engine cameras and custom Sequencer setups. Every shot was choreographed to mirror the pacing and impact of theatrical movie previews.",
  },
  {
    step: "03",
    title: "Hero Visual Development",
    description:
      "Created standalone hero key-visuals blending rendered UE5 environments with composited elements. Designed specifically for digital advertising and social media hero placements.",
  },
  {
    step: "04",
    title: "Platform-Ready Delivery",
    description:
      "All assets were resized and optimized for widescreen (16:9), square (4:5), and vertical (9:16) formats, ensuring seamless deployment across every digital platform.",
  },
  {
    step: "05",
    title: "Fast-Track Production",
    description:
      "The entire campaign, from worldbuilding to final delivery, was produced in just 30 days. Speed without compromise: every deadline met, every frame polished.",
  },
];

const results = [
  "30-second cinematic teaser trailer delivered in 30 days",
  "Hero visuals for digital ads and social campaigns",
  "Multi-format assets for seamless platform deployment",
  "Campaign that generated excitement across all channels",
  "Fast-turn production without compromising quality",
];

const tools = [
  {
    name: "Unreal Engine 5",
    description:
      "Virtual deep-sea worldbuilding, real-time rendering, and cinematic camera sequencing.",
  },
  {
    name: "Adobe After Effects",
    description:
      "VFX compositing, hero visual development, motion graphics, and color grading.",
  },
  {
    name: "Adobe Premiere Pro",
    description:
      "Trailer editorial, pacing, and multi-format delivery exports.",
  },
  {
    name: "Adobe Audition",
    description:
      "Sound design, audio mixing, and trailer soundtrack integration.",
  },
  {
    name: "Adobe Photoshop",
    description:
      "Hero key-visual compositing, texture work, and digital ad asset creation.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function SeaWorldProject() {
  return (
    <article className="bg-deep-space min-h-screen">
      {/* ── Back Link ─────────────────────────────────────────────── */}
      <m.div
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
      </m.div>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
        {/* Cover GIF background */}
        <div className="absolute inset-0">
          <AutoplayVideo
            src="/motion/seaworld-hero.mp4"
            poster="/motion/seaworld-hero.jpg"
            aria-label="SeaWorld SEAQuest underwater scene"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Subtle dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Themed 3D atmosphere — desktop only, unmounts off-screen */}
        <Lazy3D className="pointer-events-none absolute inset-0 z-[1] hidden lg:block opacity-[0.35]">
          <ProjectScene theme="ocean" className="h-full w-full" />
        </Lazy3D>

        {/* Radial fade at bottom */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-deep-space via-deep-space/40 to-transparent" />

        <div className="section-container relative z-10 pb-16 md:pb-24 pt-32">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-white/70 mb-4 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm bg-white/5">
              Virtual World Cinematic + 3D Animation
            </span>
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-h1 font-bold mb-4"
          >
            SEAWORLD
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-2xl md:text-3xl lg:text-4xl font-medium text-white/80 tracking-tight"
          >
            SEAQuest Announcement Campaign
          </m.p>

          {/* Animated line */}
          <m.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-cyan-400 to-teal-400 mt-8"
          />
        </div>
      </section>

      {/* ── In Motion ─────────────────────────────────────────────── */}
      <ProjectGifBand
        eyebrow="In Motion"
        heading="The Campaign, Moving"
        gifs={[
          {
            src: "/motion/seaworld.mp4",
            poster: "/motion/seaworld.jpg",
            label: "SeaQuest",
          },
        ]}
      />

      {/* ── Overview Sidebar + Challenge ──────────────────────────── */}
      <section className="section-container section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Sidebar */}
          <m.aside
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-4"
          >
            <div className="lg:sticky lg:top-28 space-y-8">
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-cyan-400 mb-2">
                  Client
                </p>
                <p className="font-headline text-lg font-semibold text-pure-white">
                  {overview.client}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-cyan-400 mb-2">
                  Industry
                </p>
                <p className="font-body text-cool-gray">
                  {overview.industry}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-cyan-400 mb-2">
                  Timeline
                </p>
                <p className="font-body text-cool-gray">
                  {overview.timeline}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-cyan-400 mb-2">
                  Services
                </p>
                <ul className="space-y-2">
                  {overview.services.map((service) => (
                    <li
                      key={service}
                      className="flex items-center gap-3 font-body text-sm text-cool-gray"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </m.aside>

          {/* Challenge */}
          <m.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-8"
          >
            <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-4">
              The Challenge
            </p>
            <h2 className="font-headline text-h3 font-bold mb-8">
              Generating massive excitement{" "}
              <span className="gradient-text">in 30 days flat</span>
            </h2>
            <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
              <p>
                United Parks needed a cinematic teaser trailer and hero visuals
                for their new dark ride attraction, SEAQuest. The goal: generate
                excitement online, on social, and across digital platforms with
                a bold, high-impact campaign capturing the mystery and wonder of
                an underwater adventure.
              </p>
              <p>
                The constraint that made it even more challenging? The entire
                production, from initial concept to final delivery, had to be
                completed within a tight 30-day window. No room for delays, no
                margin for error. Just pure creative execution at speed.
              </p>
            </div>
          </m.div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Our Approach (scroll-scrubbed pinned section) ────────── */}
      <PinnedApproach
        eyebrow="Our Approach"
        heading="Deep-sea storytelling at breakneck speed"
        steps={approach.map(({ title, description }) => ({
          title,
          body: description,
        }))}
      />

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── The Solution ─────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-4xl"
        >
          <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-4">
            The Solution
          </p>
          <h2 className="font-headline text-h3 font-bold mb-8">
            An immersive underwater world{" "}
            <span className="text-white">ready for every screen</span>
          </h2>
          <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
            <p>
              We created a full UE5 virtual environment (coral reefs, ancient
              shipwrecks, bioluminescent deep-sea zones) and used it as the
              foundation for cinematic sequences forming a 30-second teaser
              trailer. Every shot was choreographed to build mystery and
              excitement, mirroring the pacing of a theatrical movie preview.
            </p>
            <p>
              Hero visuals were developed using UE5 renders and advanced
              compositing techniques, while all assets were adapted for multiple
              aspect ratios (16:9, 4:5, 9:16) for optimized impact across every
              digital platform, from widescreen displays to vertical social
              stories.
            </p>
          </div>
        </m.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Campaign Gallery ────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-4">
            Campaign Gallery
          </p>
          <h2 className="font-headline text-h3 font-bold">
            Deep-sea worlds &{" "}
            <span className="text-white">hero visuals</span>
          </h2>
        </m.div>

        <m.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6"
        >
          {/* Row 1 - full-width cinematic hero */}
          <m.div variants={galleryItem} className="md:col-span-12">
            <WorkFrame
              client={overview.client}
              discipline="Virtual World Cinematic"
              index={1}
              className="aspect-[21/9] rounded-2xl shadow-2xl shadow-black/20"
            >
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/f42a6c83-e2bc-4d2f-afde-e3505ae3a0a9_rw_1920.png?h=170768e389c41ddce65e3137271f173b"
                alt="SEAQuest underwater world hero"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </WorkFrame>
          </m.div>

          {/* Row 2 - wide + tall */}
          <m.div variants={galleryItem} className="md:col-span-7">
            <WorkFrame
              client={overview.client}
              discipline="Virtual World Cinematic"
              index={2}
              className="aspect-[16/10] rounded-2xl shadow-2xl shadow-black/20"
            >
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/3c7bc293-4736-41b8-8521-17c11820918f_rw_3840.png?h=f85762d23e378abf6d005270cc55be51"
                alt="Coral reef environment"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </WorkFrame>
          </m.div>

          <m.div variants={galleryItem} className="md:col-span-5">
            <WorkFrame
              client={overview.client}
              discipline="3D Animation"
              index={3}
              className="aspect-[3/4] rounded-2xl shadow-2xl shadow-black/20"
            >
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/e2ae76f5-6ff8-4000-b921-9efcda85561b_rw_1920.png?h=47ba580be2e46e8961a7055179cca782"
                alt="Deep-sea bioluminescent zone"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </WorkFrame>
          </m.div>

          {/* Row 3 - three equal */}
          <m.div variants={galleryItem} className="md:col-span-4">
            <WorkFrame
              client={overview.client}
              discipline="Virtual World Cinematic"
              index={4}
              className="aspect-square rounded-2xl shadow-2xl shadow-black/20"
            >
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/a0c5a09c-5ae1-4809-8418-d072f7ff38e7_rw_1920.png?h=d1837ce3e9abe99f02954cd7d6f5caa8"
                alt="Underwater shipwreck scene"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </WorkFrame>
          </m.div>

          <m.div variants={galleryItem} className="md:col-span-4">
            <WorkFrame
              client={overview.client}
              discipline="Cinematic Trailer Production"
              index={5}
              className="aspect-square rounded-2xl shadow-2xl shadow-black/20"
            >
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/99c61769-cc68-4fc9-8ef4-365536e3c58e_rw_3840.png?h=c28e4e9259afbb5e932ec23bb4710f6d"
                alt="SEAQuest cinematic frame"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </WorkFrame>
          </m.div>

          <m.div variants={galleryItem} className="md:col-span-4">
            <WorkFrame
              client={overview.client}
              discipline="3D Animation"
              index={6}
              className="aspect-square rounded-2xl shadow-2xl shadow-black/20"
            >
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/01dd4666-1311-43dd-823f-87f48aa1b850_rw_3840.png?h=ef9af32f06f1941f72f3c2c1ea3871da"
                alt="Deep-sea landscape"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </WorkFrame>
          </m.div>

          {/* Row 4 - asymmetric pair */}
          <m.div variants={galleryItem} className="md:col-span-5">
            <WorkFrame
              client={overview.client}
              discipline="Cinematic Trailer Production"
              index={7}
              className="aspect-[4/3] rounded-2xl shadow-2xl shadow-black/20"
            >
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/ee311317-b52f-486c-b7b8-a7ff822d4072_rw_1920.PNG?h=4a424422f10bb668b900397248ed4aa9"
                alt="Trailer frame - underwater cave"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </WorkFrame>
          </m.div>

          <m.div variants={galleryItem} className="md:col-span-7">
            <WorkFrame
              client={overview.client}
              discipline="Cinematic Trailer Production"
              index={8}
              className="aspect-[16/9] rounded-2xl shadow-2xl shadow-black/20"
            >
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/1cff982c-74b9-4f55-9170-55356266000e_rw_1920.PNG?h=8dfd2224c89e37b93770cb529d694246"
                alt="Cinematic ocean depth shot"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </WorkFrame>
          </m.div>

          {/* Row 5 - hero visuals & ad formats */}
          <m.div variants={galleryItem} className="md:col-span-6">
            <WorkFrame
              client={overview.client}
              discipline="Hero Visual Development"
              index={9}
              className="aspect-[16/10] rounded-2xl shadow-2xl shadow-black/20"
            >
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/90b4e2ae-8a49-43e4-bf1c-ab699d4be4bd_rw_1920.png?h=5170336821b0fa88310d44d96d9c81f0"
                alt="Hero visual - SEAQuest key art"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </WorkFrame>
          </m.div>

          <m.div variants={galleryItem} className="md:col-span-6">
            <WorkFrame
              client={overview.client}
              discipline="Hero Visual Development"
              index={10}
              className="aspect-[16/10] rounded-2xl shadow-2xl shadow-black/20"
            >
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/85375b3b-ee17-49bc-a6bd-b0f9c1e8af76_rw_1920.png?h=f33cddbaee960edf0a99219140614530"
                alt="Digital ad hero placement"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </WorkFrame>
          </m.div>

          {/* Row 6 - three format variations */}
          <m.div variants={galleryItem} className="md:col-span-4">
            <WorkFrame
              client={overview.client}
              discipline="Multi-Platform Delivery"
              index={11}
              className="aspect-[4/3] rounded-2xl shadow-2xl shadow-black/20"
            >
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/22f7b6a7-fa2a-423e-9131-21aa2ca30d30_rw_1200.png?h=951bc97f963a396b893b96b579241f48"
                alt="Social media format - square"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </WorkFrame>
          </m.div>

          <m.div variants={galleryItem} className="md:col-span-4">
            <WorkFrame
              client={overview.client}
              discipline="Multi-Platform Delivery"
              index={12}
              className="aspect-[4/3] rounded-2xl shadow-2xl shadow-black/20"
            >
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/6e8eaa44-8e9a-4a35-ae02-8d2ad72906a7_rw_1200.png?h=0b699e851567f945902885e75a975a5f"
                alt="Social media format - vertical"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </WorkFrame>
          </m.div>

          <m.div variants={galleryItem} className="md:col-span-4">
            <WorkFrame
              client={overview.client}
              discipline="Multi-Platform Delivery"
              index={13}
              className="aspect-[4/3] rounded-2xl shadow-2xl shadow-black/20"
            >
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/0f64c0a7-a38b-4361-8ebf-024f4ba6f35d_rw_1200.png?h=952e6d7648e23f1064600919f94c2061"
                alt="Widescreen display format"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </WorkFrame>
          </m.div>

          {/* Row 7 - behind the scenes / production */}
          <m.div variants={galleryItem} className="md:col-span-6">
            <WorkFrame
              client={overview.client}
              discipline="3D Animation"
              index={14}
              className="aspect-[16/10] rounded-2xl shadow-2xl shadow-black/20"
            >
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/bf9e63f9-1332-4a61-8b37-9e9ff18599d0_rw_1200.png?h=2f6fc056141cc8e5c3d2ea749a0cc8ec"
                alt="Production environment - UE5 viewport"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </WorkFrame>
          </m.div>

          <m.div variants={galleryItem} className="md:col-span-6">
            <WorkFrame
              client={overview.client}
              discipline="Hero Visual Development"
              index={15}
              className="aspect-[16/10] rounded-2xl shadow-2xl shadow-black/20"
            >
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/918196cb-2b18-470c-8d58-b4c08ab8f0fd_rw_1920.png?h=cdefda8462349a291b43dc3052b341a7"
                alt="SEAQuest campaign final composite"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </WorkFrame>
          </m.div>

          {/* Row 8 - final two wide shots */}
          <m.div variants={galleryItem} className="md:col-span-7">
            <WorkFrame
              client={overview.client}
              discipline="Virtual World Cinematic"
              index={16}
              className="aspect-[16/9] rounded-2xl shadow-2xl shadow-black/20"
            >
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/00ff6d1a-7447-4034-951e-33fec9cde331_rw_1920.png?h=ef9ae3b1eab3157492a06878707463e7"
                alt="Underwater world panoramic"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </WorkFrame>
          </m.div>

          <m.div variants={galleryItem} className="md:col-span-5">
            <WorkFrame
              client={overview.client}
              discipline="Hero Visual Development"
              index={17}
              className="aspect-[4/3] rounded-2xl shadow-2xl shadow-black/20"
            >
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/3b4756c3-fd33-4064-96bb-03dff37bf48d_rw_1920.png?h=143c12ac7b0c1b9fb60eaca4ee74bcb2"
                alt="Campaign key visual close-up"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </WorkFrame>
          </m.div>

          {/* Row 9 - closing full-width shot */}
          <m.div variants={galleryItem} className="md:col-span-12">
            <WorkFrame
              client={overview.client}
              discipline="Cinematic Trailer Production"
              index={18}
              className="aspect-[21/9] rounded-2xl shadow-2xl shadow-black/20"
            >
              <Image
                src="https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/7fa1d7c1-4fc0-4460-b5df-1fbd816fd1df_rw_1920.png?h=5e09de0e5d2ebd0a9ca418b01ea12a9b"
                alt="SEAQuest final campaign shot"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </WorkFrame>
          </m.div>
        </m.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── The Result ───────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-4">
            The Result
          </p>
          <h2 className="font-headline text-h3 font-bold">
            Speed, scale, and{" "}
            <span className="text-white">cinematic quality</span>
          </h2>
        </m.div>

        {/* Lead result statement */}
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-4xl"
        >
          <p className="font-display text-h2 font-bold text-pure-white mb-10">
            {results[0]}
          </p>

          {/* TODO(David): add quantified result or client quote here */}

          <ul className="space-y-4 border-l border-cyan-400/30 pl-6">
            {results.slice(1).map((result) => (
              <li
                key={result}
                className="font-body text-cool-gray text-base md:text-lg leading-relaxed"
              >
                {result}
              </li>
            ))}
          </ul>
        </m.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Tools & Technology ────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-4">
            Tools & Technology
          </p>
          <h2 className="font-headline text-h3 font-bold">
            The <span className="text-white">production stack</span>
          </h2>
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {tools.map((tool) => (
            <m.div
              key={tool.name}
              variants={staggerItem}
              className="group p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:border-cyan-400/20 hover:bg-cyan-400/[0.03] transition-all duration-500"
            >
              <h3 className="font-headline text-lg font-bold text-pure-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                {tool.name}
              </h3>
              <p className="font-body text-sm text-cool-gray leading-relaxed">
                {tool.description}
              </p>
            </m.div>
          ))}
        </m.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-headline text-h2 font-bold mb-6">
            Ready to make a{" "}
            <span className="text-white">splash</span>?
          </h2>
          <p className="font-body text-cool-gray text-base md:text-lg leading-relaxed mb-10">
            Let&rsquo;s build your next campaign with speed, scale, and
            cinematic impact that stops the scroll.
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
        </m.div>
      </section>
    </article>
  );
}
