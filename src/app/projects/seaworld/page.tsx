"use client";

import Link from "@/components/TransitionLink";
import Image from "next/image";
import { m } from "framer-motion";
import AutoplayVideo from "@/components/AutoplayVideo";

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
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
    transition: { staggerChildren: 0.12 },
  },
};

const galleryItem = {
  hidden: { opacity: 0, y: 30 },
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

const gallery = [
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/f42a6c83-e2bc-4d2f-afde-e3505ae3a0a9_rw_1920.png?h=170768e389c41ddce65e3137271f173b", alt: "SEAQuest underwater world hero", aspect: "aspect-[21/9]", span: "md:col-span-12", discipline: "Virtual World Cinematic" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/3c7bc293-4736-41b8-8521-17c11820918f_rw_3840.png?h=f85762d23e378abf6d005270cc55be51", alt: "Coral reef environment", aspect: "aspect-[16/10]", span: "md:col-span-7", discipline: "Virtual World Cinematic" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/e2ae76f5-6ff8-4000-b921-9efcda85561b_rw_1920.png?h=47ba580be2e46e8961a7055179cca782", alt: "Deep-sea bioluminescent zone", aspect: "aspect-[3/4]", span: "md:col-span-5", discipline: "3D Animation" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/a0c5a09c-5ae1-4809-8418-d072f7ff38e7_rw_1920.png?h=d1837ce3e9abe99f02954cd7d6f5caa8", alt: "Underwater shipwreck scene", aspect: "aspect-square", span: "md:col-span-4", discipline: "Virtual World Cinematic" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/99c61769-cc68-4fc9-8ef4-365536e3c58e_rw_3840.png?h=c28e4e9259afbb5e932ec23bb4710f6d", alt: "SEAQuest cinematic frame", aspect: "aspect-square", span: "md:col-span-4", discipline: "Cinematic Trailer Production" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/01dd4666-1311-43dd-823f-87f48aa1b850_rw_3840.png?h=ef9af32f06f1941f72f3c2c1ea3871da", alt: "Deep-sea landscape", aspect: "aspect-square", span: "md:col-span-4", discipline: "3D Animation" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/ee311317-b52f-486c-b7b8-a7ff822d4072_rw_1920.PNG?h=4a424422f10bb668b900397248ed4aa9", alt: "Trailer frame - underwater cave", aspect: "aspect-[4/3]", span: "md:col-span-5", discipline: "Cinematic Trailer Production" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/1cff982c-74b9-4f55-9170-55356266000e_rw_1920.PNG?h=8dfd2224c89e37b93770cb529d694246", alt: "Cinematic ocean depth shot", aspect: "aspect-[16/9]", span: "md:col-span-7", discipline: "Cinematic Trailer Production" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/90b4e2ae-8a49-43e4-bf1c-ab699d4be4bd_rw_1920.png?h=5170336821b0fa88310d44d96d9c81f0", alt: "Hero visual - SEAQuest key art", aspect: "aspect-[16/10]", span: "md:col-span-6", discipline: "Hero Visual Development" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/85375b3b-ee17-49bc-a6bd-b0f9c1e8af76_rw_1920.png?h=f33cddbaee960edf0a99219140614530", alt: "Digital ad hero placement", aspect: "aspect-[16/10]", span: "md:col-span-6", discipline: "Hero Visual Development" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/22f7b6a7-fa2a-423e-9131-21aa2ca30d30_rw_1200.png?h=951bc97f963a396b893b96b579241f48", alt: "Social media format - square", aspect: "aspect-[4/3]", span: "md:col-span-4", discipline: "Multi-Platform Delivery" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/6e8eaa44-8e9a-4a35-ae02-8d2ad72906a7_rw_1200.png?h=0b699e851567f945902885e75a975a5f", alt: "Social media format - vertical", aspect: "aspect-[4/3]", span: "md:col-span-4", discipline: "Multi-Platform Delivery" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/0f64c0a7-a38b-4361-8ebf-024f4ba6f35d_rw_1200.png?h=952e6d7648e23f1064600919f94c2061", alt: "Widescreen display format", aspect: "aspect-[4/3]", span: "md:col-span-4", discipline: "Multi-Platform Delivery" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/bf9e63f9-1332-4a61-8b37-9e9ff18599d0_rw_1200.png?h=2f6fc056141cc8e5c3d2ea749a0cc8ec", alt: "Production environment - UE5 viewport", aspect: "aspect-[16/10]", span: "md:col-span-6", discipline: "3D Animation" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/918196cb-2b18-470c-8d58-b4c08ab8f0fd_rw_1920.png?h=cdefda8462349a291b43dc3052b341a7", alt: "SEAQuest campaign final composite", aspect: "aspect-[16/10]", span: "md:col-span-6", discipline: "Hero Visual Development" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/00ff6d1a-7447-4034-951e-33fec9cde331_rw_1920.png?h=ef9ae3b1eab3157492a06878707463e7", alt: "Underwater world panoramic", aspect: "aspect-[16/9]", span: "md:col-span-7", discipline: "Virtual World Cinematic" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/3b4756c3-fd33-4064-96bb-03dff37bf48d_rw_1920.png?h=143c12ac7b0c1b9fb60eaca4ee74bcb2", alt: "Campaign key visual close-up", aspect: "aspect-[4/3]", span: "md:col-span-5", discipline: "Hero Visual Development" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/7fa1d7c1-4fc0-4460-b5df-1fbd816fd1df_rw_1920.png?h=5e09de0e5d2ebd0a9ca418b01ea12a9b", alt: "SEAQuest final campaign shot", aspect: "aspect-[21/9]", span: "md:col-span-12", discipline: "Cinematic Trailer Production" },
];

/* ------------------------------------------------------------------ */
/*  Shared pieces                                                      */
/* ------------------------------------------------------------------ */

function PlateCaption({ label, value }: { label: string; value: string }) {
  return (
    <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
      <span className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue">
        {label}
      </span>
      <span className="text-caption font-normal text-bone">{value}</span>
    </figcaption>
  );
}

function Rule() {
  return (
    <div className="section-container">
      <div className="border-t border-ash-border" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function SeaWorldProject() {
  return (
    <article className="bg-obsidian min-h-screen">
      {/* ── Opener ────────────────────────────────────────────────── */}
      <header className="section-container pt-32 md:pt-40 pb-16 md:pb-20">
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
          className="text-[17px] uppercase tracking-[0.02em] font-normal text-fog-blue mb-6"
        >
          Virtual World Cinematic + 3D Animation
        </m.p>

        <m.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: prismEase }}
          className="font-body font-normal text-bone text-display-sm leading-[1.01] tracking-[-0.02em] mb-6"
        >
          SeaWorld
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: prismEase }}
          className="font-body text-body-lg font-normal text-bone"
        >
          SEAQuest Announcement Campaign
        </m.p>

        {/* Metadata row */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: prismEase }}
          className="mt-16 border-t border-b border-ash-border py-8"
        >
          <dl className="flex flex-wrap gap-x-16 gap-y-8">
            <div>
              <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
                Client
              </dt>
              <dd className="font-body text-body-sm font-normal text-bone">
                {overview.client}
              </dd>
            </div>
            <div>
              <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
                Industry
              </dt>
              <dd className="font-body text-body-sm font-normal text-bone">
                {overview.industry}
              </dd>
            </div>
            <div>
              <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
                Timeline
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
                <ul className="space-y-1">
                  {overview.services.map((service) => (
                    <li
                      key={service}
                      className="font-body text-caption font-normal text-bone"
                    >
                      {service}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </m.div>
      </header>

      {/* ── Hero media plate ──────────────────────────────────────── */}
      <section className="section-container pb-24 md:pb-32">
        <m.figure
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75, ease: prismEase }}
        >
          <div className="relative aspect-video overflow-hidden rounded-[15px] border border-ash-border">
            <AutoplayVideo
              src="/motion/seaworld-hero.mp4"
              poster="/motion/seaworld-hero.jpg"
              aria-label="SeaWorld SEAQuest underwater scene"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <PlateCaption
            label="Campaign Film"
            value="SeaWorld SEAQuest underwater scene"
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
          className="mb-14 max-w-[640px]"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            In Motion
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone">
            The Campaign, Moving
          </h2>
        </m.div>

        <m.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="relative aspect-video overflow-hidden rounded-[15px] border border-ash-border">
            <AutoplayVideo
              src="/motion/seaworld.mp4"
              poster="/motion/seaworld.jpg"
              aria-label="SeaQuest"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <PlateCaption label="In Motion" value="SeaQuest" />
        </m.figure>
      </section>

      <Rule />

      {/* ── The Challenge ─────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[640px]"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            The Challenge
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone mb-8">
            Generating massive excitement in 30 days flat
          </h2>
          <div className="font-body text-body-sm font-normal text-bone space-y-7">
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
      </section>

      <Rule />

      {/* ── Our Approach ──────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 max-w-[640px]"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            Our Approach
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone">
            Deep-sea storytelling at breakneck speed
          </h2>
        </m.div>

        <m.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[760px] border-t border-ash-border"
        >
          {approach.map((step) => (
            <m.li
              key={step.step}
              variants={staggerItem}
              className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 border-b border-ash-border py-12"
            >
              <span
                aria-hidden="true"
                className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue md:w-28 flex-shrink-0"
              >
                {step.step}
              </span>
              <div className="max-w-[640px]">
                <h3 className="font-body text-heading-sm font-normal text-bone mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-body-sm font-normal text-fog-blue">
                  {step.description}
                </p>
              </div>
            </m.li>
          ))}
        </m.ol>
      </section>

      <Rule />

      {/* ── The Solution ─────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[640px]"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            The Solution
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone mb-8">
            An immersive underwater world ready for every screen
          </h2>
          <div className="font-body text-body-sm font-normal text-bone space-y-7">
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

      <Rule />

      {/* ── Campaign Gallery ────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 max-w-[640px]"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            Campaign Gallery
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone">
            Deep-sea worlds & hero visuals
          </h2>
        </m.div>

        <m.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-12"
        >
          {gallery.map((img) => (
            <m.div key={img.src} variants={galleryItem} className={img.span}>
              <figure>
                <div
                  className={`relative ${img.aspect} overflow-hidden rounded-[15px] border border-ash-border`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <PlateCaption label={img.discipline} value={img.alt} />
              </figure>
            </m.div>
          ))}
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
          className="max-w-[640px] mb-12"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            The Result
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone">
            Speed, scale, and cinematic quality
          </h2>
        </m.div>

        {/* Lead result statement */}
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[640px]"
        >
          <p className="font-body text-heading-sm font-normal text-bone mb-10">
            {results[0]}
          </p>

          {/* TODO(David): add quantified result or client quote here */}

          <ul className="space-y-4 border-l border-ash-border pl-6">
            {results.slice(1).map((result) => (
              <li
                key={result}
                className="font-body text-body-sm font-normal text-fog-blue"
              >
                {result}
              </li>
            ))}
          </ul>
        </m.div>
      </section>

      <Rule />

      {/* ── Tools & Technology ────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[640px] mb-12"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            Tools & Technology
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone">
            The production stack
          </h2>
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[640px] border-t border-ash-border"
        >
          {tools.map((tool) => (
            <m.div
              key={tool.name}
              variants={staggerItem}
              className="border-b border-ash-border py-6"
            >
              <h3 className="font-body text-body font-normal text-bone mb-2">
                {tool.name}
              </h3>
              <p className="font-body text-body-sm font-normal text-fog-blue">
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
          className="max-w-[640px]"
        >
          <h2 className="font-body text-heading-lg font-normal text-bone mb-6">
            Ready to make a splash?
          </h2>
          <p className="font-body text-body-sm font-normal text-fog-blue mb-10">
            Let&rsquo;s build your next campaign with speed, scale, and
            cinematic impact that stops the scroll.
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
