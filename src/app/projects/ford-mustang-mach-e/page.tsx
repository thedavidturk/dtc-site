"use client";

import Link from "@/components/TransitionLink";
import Image from "next/image";
import dynamic from "next/dynamic";
import { m } from "framer-motion";
import ProjectGifBand from "@/components/ProjectGifBand";
import Lazy3D from "@/components/Lazy3D";
import PinnedApproach from "@/components/PinnedApproach";
import WorkFrame from "@/components/WorkFrame";

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
  client: "Ford (Mustang Mach-E)",
  industry: "Automotive / Social Media",
  role: "Designer & Animator",
  services: [
    "Concept & Art Direction",
    "Hi-Res Key Visuals",
    "3D Design (Cinema 4D)",
    "4K Motion Animation",
    "Social Media Delivery",
  ],
};

/* Real hi-res renditions scraped from the source case study.          */
/* Each URL keeps the exact hash so the CDN serves it (wrong hash 403). */
const heroImage =
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/ce534a9b-9d7b-4edd-bce4-c281dd58da7b_rw_1920.png?h=d58ba796f9778a2423288a3ad29e8a38";

const galleryImages = [
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/e99154f1-4ec2-42c3-8161-f5d61dc7efed_rw_3840.jpg?h=12d2746f516b788b3bf32a1371d2f5da",
    alt: "Ford Mustang Mach-E hero key visual",
    aspect: "21/9",
    span: 12,
    discipline: "Hi-Res Key Visuals",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/fcf6296b-216c-429f-b8fc-4ada80f68dfc_rw_3840.jpg?h=9d25b37ccabacab16672b34557c312a4",
    alt: "Ford Mustang Mach-E rendered three quarter view",
    aspect: "16/10",
    span: 7,
    discipline: "3D Design (Cinema 4D)",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/b9902159-050d-4e1f-a691-35165cf456ba_rw_3840.jpg?h=ea86ac1cce2b7d16732f4aea590402e7",
    alt: "Ford Mustang Mach-E detail composition",
    aspect: "3/4",
    span: 5,
    discipline: "Concept & Art Direction",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/143dcbf7-583c-47b6-92d4-bdd1bbf8173d_rw_3840.jpg?h=eb89949a5d83ab26d8665d77524d50e7",
    alt: "Ford Mustang Mach-E lighting study",
    aspect: "4/3",
    span: 4,
    discipline: "3D Design (Cinema 4D)",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/2c0d78b8-991d-46ca-8dfd-7cc0a4b0e7aa_rw_3840.jpg?h=4defce8940261e93c0bdfd9f8d010291",
    alt: "Ford Mustang Mach-E rendered profile",
    aspect: "4/3",
    span: 4,
    discipline: "Hi-Res Key Visuals",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/bbf6a1f7-2b68-4bd1-a519-4fef713a2cbf_rw_1920.png?h=60f9bbfa8172959bd001998034ef16e2",
    alt: "Ford Mustang Mach-E social frame",
    aspect: "4/3",
    span: 4,
    discipline: "Social Media Delivery",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/da3d77ca-1e4b-4f7e-b3cb-7b0e58cf2210_rw_1920.png?h=4f041b47252b875962082d62685b2730",
    alt: "Ford Mustang Mach-E animation still",
    aspect: "21/9",
    span: 12,
    discipline: "4K Motion Animation",
  },
];

/* Static class lookup so Tailwind sees the literal aspect utilities.  */
const aspectClass: Record<string, string> = {
  "21/9": "aspect-[21/9]",
  "16/10": "aspect-[16/10]",
  "3/4": "aspect-[3/4]",
  "4/3": "aspect-[4/3]",
};

const approach = [
  {
    step: "01",
    title: "Hi-Res Imagery as the Foundation",
    description:
      "Started from high resolution imagery of the Mustang Mach-E, treating each frame as a finished key visual rather than a screenshot. Sharp detail, clean reflections, and considered composition gave the social assets a print-quality look the moment they landed in the feed.",
  },
  {
    step: "02",
    title: "Built and Lit in Cinema 4D",
    description:
      "Designed and staged the scenes in Cinema 4D, sculpting light, materials, and camera moves around the vehicle. Working in 3D meant total control over angle, surface, and pacing, so the car could be presented exactly the way the brand needed across every cut.",
  },
  {
    step: "03",
    title: "Animated in 4K with After Effects",
    description:
      "Brought the stills to life with 4K animations finished in Adobe After Effects. Type, transitions, and motion graphics were layered over the renders to give the spots energy and rhythm while keeping the focus on the car.",
  },
  {
    step: "04",
    title: "Cut for Social, Built for the Brand",
    description:
      "Delivered the work formatted for social media feeds, where the first second has to earn the scroll. The result follows a simple equation the client signed off on. Hi-res imagery plus 4K animations equals a happy client.",
  },
];

const results = [
  "Hi-res imagery elevated into finished, feed-ready key visuals",
  "Full 3D control of angle, light, and surface in Cinema 4D",
  "Smooth 4K animations finished in Adobe After Effects",
  "Motion graphics that add energy without burying the car",
  "Social-first delivery tuned to stop the scroll",
];

const tools = [
  {
    name: "Cinema 4D",
    description:
      "3D design, scene staging, lighting, and camera work for every rendered frame of the Mustang Mach-E.",
  },
  {
    name: "Adobe After Effects",
    description:
      "4K animation, motion graphics, transitions, and type to bring the stills into motion.",
  },
  {
    name: "Hi-Res Pipeline",
    description:
      "High resolution capture and rendering so each asset reads as a finished key visual, not a frame grab.",
  },
  {
    name: "Social Delivery",
    description:
      "Output formatted and paced for social media feeds where the first second has to earn the scroll.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FordMustangMachEProject() {
  return (
    <article className="bg-deep-space min-h-screen" style={{ backgroundColor: "#120D1A" }}>
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
      <section className="relative min-h-[78vh] md:min-h-[88vh] flex items-end overflow-hidden">
        {/* Real hero key visual */}
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Ford Mustang Mach-E key visual"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Themed 3D atmosphere — desktop only, unmounts off-screen */}
        <Lazy3D className="pointer-events-none absolute inset-0 z-[1] hidden lg:block opacity-[0.35]">
          <ProjectScene theme="automotive" className="h-full w-full" />
        </Lazy3D>

        {/* Tonal wash to seat the headline */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(180deg, rgba(18,13,26,0.55) 0%, rgba(18,13,26,0.2) 35%, rgba(18,13,26,0.75) 80%, #120D1A 100%)",
          }}
        />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(120% 90% at 80% 10%, rgba(124,92,255,0.28) 0%, rgba(18,13,26,0) 55%)",
          }}
        />

        <div className="section-container relative z-10 pb-16 md:pb-24 pt-32">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-white/80 mb-4 px-3 py-1.5 rounded-full border border-white/15 backdrop-blur-sm bg-white/10">
              Automotive / Social Media
            </span>
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-h1 font-bold mb-4"
          >
            REBUILDING
            <br />
            A CLASSIC
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-2xl md:text-3xl lg:text-4xl font-medium text-white/85 tracking-tight"
          >
            Ford Mustang Mach-E
          </m.p>

          <m.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-electric-indigo to-warm-coral mt-8"
            style={{ backgroundImage: "linear-gradient(to right, #7C5CFF, #FF8A5C)" }}
          />
        </div>
      </section>

      {/* ── In Motion GIF Band ────────────────────────────────────── */}
      <ProjectGifBand
        eyebrow="In Motion"
        heading="Rebuilt in Motion"
        gifs={[
          {
            src: "/motion/ford-mustang.mp4",
            poster: "/motion/ford-mustang.jpg",
            label: "Mustang Mach-E",
          },
        ]}
      />

      {/* ── Overview Sidebar + Intro ──────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#120D1A" }}>
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
                <p className="font-mono text-xs tracking-widest uppercase text-warm-coral mb-2">
                  Client
                </p>
                <p className="font-headline text-lg font-semibold text-pure-white">
                  {overview.client}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-warm-coral mb-2">
                  Industry
                </p>
                <p className="font-body text-cool-gray">{overview.industry}</p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-warm-coral mb-2">
                  Role
                </p>
                <p className="font-body text-cool-gray">{overview.role}</p>
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
          </m.aside>

          {/* Intro */}
          <m.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-8"
          >
            <p className="font-mono text-sm text-warm-coral tracking-widest uppercase mb-4">
              The Brief
            </p>
            <h2 className="font-headline text-h3 font-bold mb-8">
              A muscle-car icon,{" "}
              <span className="gradient-text">reborn for the feed</span>
            </h2>
            <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
              <p>
                The Mustang Mach-E is Ford taking the most loaded name in its
                history and putting it on something electric. For social, that
                story had to land in seconds, with imagery that felt as crafted
                and premium as the car itself.
              </p>
              <p>
                The approach was direct. Build the vehicle in 3D, light it like
                a hero, and animate it in 4K so every frame reads as a finished
                key visual rather than a screen grab. Hi-res imagery plus 4K
                animations, designed and animated in Cinema 4D and Adobe After
                Effects, with one goal at the end of it. A happy client.
              </p>
            </div>
          </m.div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── The Film / Animation ─────────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#120D1A" }}>
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-10"
        >
          <p className="font-mono text-sm text-warm-coral tracking-widest uppercase mb-4">
            The Animation
          </p>
          <h2 className="font-headline text-h3 font-bold">
            Hi-res imagery, <span className="text-white">brought to life in 4K</span>
          </h2>
        </m.div>

        <m.div
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
                src="https://www-ccv.adobe.io/v1/player/ccv/V3B-d9Ww-Nr/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View"
                title="Rebuilding a Classic: Ford Mustang Mach-E"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </m.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Our Approach (scroll-scrubbed pinned section) ────────── */}
      <PinnedApproach
        eyebrow="Our Approach"
        heading="From render to feed in four moves"
        steps={approach.map(({ title, description }) => ({
          title,
          body: description,
        }))}
      />

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Gallery ──────────────────────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#120D1A" }}>
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-warm-coral tracking-widest uppercase mb-4">
            Key Visuals
          </p>
          <h2 className="font-headline text-h3 font-bold">
            Every frame, <span className="text-white">a finished piece</span>
          </h2>
        </m.div>

        <m.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6"
        >
          {galleryImages.map((img, i) => {
            const spanClass =
              img.span === 12
                ? "md:col-span-12"
                : img.span === 7
                ? "md:col-span-7"
                : img.span === 5
                ? "md:col-span-5"
                : "md:col-span-4";
            return (
              <m.div key={img.src} variants={galleryItem} className={spanClass}>
                <WorkFrame
                  client={overview.client}
                  discipline={img.discipline}
                  index={i + 1}
                  className={`${aspectClass[img.aspect]} rounded-2xl`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 1200px"
                    className="object-cover"
                  />
                </WorkFrame>
              </m.div>
            );
          })}
        </m.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── The Result ───────────────────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#120D1A" }}>
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-warm-coral tracking-widest uppercase mb-4">
            The Result
          </p>
          <h2 className="font-headline text-h3 font-bold">
            Premium imagery,{" "}
            <span className="text-white">built for social</span>
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

          <ul className="space-y-4 border-l border-warm-coral/30 pl-6">
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
      <section className="section-container section-padding" style={{ backgroundColor: "#120D1A" }}>
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-warm-coral tracking-widest uppercase mb-4">
            Tools &amp; Technology
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
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {tools.map((tool) => (
            <m.div
              key={tool.name}
              variants={staggerItem}
              className="group p-6 rounded-xl border border-white/5 bg-white/[0.02] transition-all duration-500 hover:border-white/15 hover:bg-white/[0.04]"
            >
              <h3 className="font-headline text-lg font-bold text-pure-white mb-2 group-hover:text-warm-coral transition-colors duration-300">
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
      <section className="section-container section-padding" style={{ backgroundColor: "#120D1A" }}>
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-headline text-h2 font-bold mb-6">
            Have an icon{" "}
            <span className="text-white">to reinvent</span>?
          </h2>
          <p className="font-body text-cool-gray text-base md:text-lg leading-relaxed mb-10">
            Let&rsquo;s build imagery and motion that makes your brand impossible
            to scroll past.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact" className="btn-primary">
              Book a Call
            </Link>
            <Link
              href="/#projects"
              className="btn-secondary group inline-flex items-center gap-2"
            >
              View More Work
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
