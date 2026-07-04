"use client";

import Link from "@/components/TransitionLink";
import Image from "next/image";
import { motion } from "framer-motion";
import ProjectGifBand from "@/components/ProjectGifBand";
import PinnedApproach from "@/components/PinnedApproach";
import WorkFrame from "@/components/WorkFrame";

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
  client: "Biscayne Coffee",
  industry: "Product Launch / 3D + Video",
  timeline: "Campaign Launch",
  services: [
    "Launch Video Direction",
    "Cinematography (Canon C70)",
    "Editorial & Color",
    "3D Modeling & Scene Design",
    "Texture Design & Rendering",
  ],
};

const approach = [
  {
    step: "01",
    title: "Launch Video Direction",
    description:
      "Directed the Biscayne Coffee launch video as the centerpiece of the campaign for www.BiscayneCoffee.com, building a film that introduces the brand and sets the tone for everything around it.",
  },
  {
    step: "02",
    title: "Cinematography on the Canon C70",
    description:
      "Shot the launch video on the Canon C70 in Raw LT, capturing footage with the latitude and detail needed to carry the campaign across the final edit and grade.",
  },
  {
    step: "03",
    title: "Edit & Color",
    description:
      "Edited the launch video in Adobe Premiere Pro and Adobe After Effects, then handled color correction in Premiere Pro to finish the look of the brand film.",
  },
  {
    step: "04",
    title: "Texture Design in Substance",
    description:
      "Created the coffee bag textures in Adobe Substance Painter, focusing on realistic plastic textures, bag deformations, and proper layering of the approved bag designs.",
  },
  {
    step: "05",
    title: "3D Scenes & Rendering",
    description:
      "Used Cinema 4D with the Octane renderer to build the scenes and imagery for the campaign, applying the textures created in Substance to the scene for the final renders.",
  },
];

const results = [
  "A launch video built as the centerpiece of the Biscayne Coffee campaign",
  "Footage captured on the Canon C70 in Raw LT for a clean, gradable image",
  "Edit and color finished in Adobe Premiere Pro and After Effects",
  "Photoreal coffee bag textures built in Adobe Substance Painter",
  "Campaign imagery rendered in Cinema 4D with the Octane renderer",
];

const tools = [
  {
    name: "Canon C70 (Raw LT)",
    description:
      "Launch video footage shot on the Canon C70 in Raw LT for a high-latitude, fully gradable image.",
  },
  {
    name: "Adobe Premiere Pro & After Effects",
    description:
      "Editorial assembly and motion finishing for the launch video, with color correction handled in Premiere Pro.",
  },
  {
    name: "Adobe Substance Painter",
    description:
      "Realistic bag textures with believable plastic surfaces, deformations, and layered, approved bag designs.",
  },
  {
    name: "Cinema 4D + Octane",
    description:
      "Scene design, modeling, and rendering, applying the Substance textures to build the final campaign imagery.",
  },
];

/* Real stills scraped from the live source, in page order (largest renditions). */
const galleryImages = [
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/b3817e12-12dd-4953-83d5-f6c415236f05_rw_1920.png?h=4c9c5e1a47649414ff0585cb92080998",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/6f5127ac-a9a9-4fba-8783-0fceb730bedd_rw_1920.png?h=a549a244add92d277198708e8d42285b",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/68368b07-7361-4fa5-90c1-5b406f8771c4_rw_1920.png?h=2222362be19a333caa79254bed3cd96f",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/4eea0346-b49b-4a67-808a-cf2af7a3b3be_rw_1920.png?h=4832aca5cfecdde70d7a1707749e32c6",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/dc82b00d-d2b6-4343-a995-0e14debccccf_rw_1920.jpg?h=ed4981217f80d088c8e6317f65108197",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/1a74eb2f-3288-4568-936f-d5e470942363_rw_1920.jpg?h=7a4a2a87b82985c71e5804e4d20a35b8",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/5ef668ea-d161-4f7a-a0fb-02b8d6ec115c_rw_1920.jpg?h=2b23219a73157a9eb3b52db2e3e0bfcd",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/0d6e58b6-a92d-40d4-93f7-866621313ca5_rw_1920.jpg?h=5734dadf5a734d80c18aaefcf3fa59ea",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/aa7774ed-8851-4e5a-9afc-6533fd3c4831_rw_1920.png?h=6d64abe7542c0cff96af7c8cad955d54",
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BiscayneCoffeeProject() {
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
            src={galleryImages[0]}
            alt="Biscayne Coffee launch campaign still"
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
              Product Launch / 3D + Video
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-h1 font-bold mb-4"
          >
            BISCAYNE COFFEE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-2xl md:text-3xl lg:text-4xl font-medium text-white/80 tracking-tight"
          >
            Launch Campaign, Video and 3D Design
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
        heading="The Launch, Moving"
        gifs={[
          {
            src: "/motion/biscayne.mp4",
            poster: "/motion/biscayne.jpg",
            label: "Biscayne",
          },
        ]}
      />

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
            Watch the{" "}
            <span className="gradient-text">launch video</span>
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="relative"
        >
          {/* Ambient glow behind the video */}
          <div className="absolute -inset-3 md:-inset-5 bg-gradient-to-r from-electric-indigo/10 via-violet-500/5 to-electric-indigo/10 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

          <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black aspect-video shadow-2xl shadow-black/40">
            <iframe
              src="https://www-ccv.adobe.io/v1/player/ccv/HNQhk4YtxBY/embed?bgcolor=%23120D1A&lazyLoading=true&api_key=BehancePro2View"
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Biscayne Coffee"
            />
          </div>
        </motion.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

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
            <h2 className="font-headline text-h3 font-bold mb-8">
              A launch campaign built on{" "}
              <span className="text-white">film and 3D</span>
            </h2>
            <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
              <p>
                Biscayne Coffee needed a campaign launch for
                www.BiscayneCoffee.com that could introduce the brand with both a
                live action film and a set of fully rendered product imagery. The
                work spans a directed launch video and a 3D pipeline built around
                the coffee bags themselves.
              </p>
              <p>
                The challenge was to keep the live footage and the rendered scenes
                reading as one campaign. The launch video sets the tone, while the
                3D work delivers photoreal product imagery that matches the look
                and carries the brand across the rest of the launch.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Our Approach (scroll-scrubbed pinned section) ────────── */}
      <PinnedApproach
        eyebrow="The Process"
        heading="From the shoot to the render in five moves"
        steps={approach.map(({ title, description }) => ({
          title,
          body: description,
        }))}
      />

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── The Approach Narrative ───────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#120D1A" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-4xl"
        >
          <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
            The Craft
          </p>
          <h2 className="font-headline text-h3 font-bold mb-8">
            Real footage, meet{" "}
            <span className="text-white">photoreal 3D</span>
          </h2>
          <div className="font-body text-cool-gray text-base md:text-lg leading-relaxed space-y-6">
            <p>
              The launch video was shot on the Canon C70 in Raw LT, then edited in
              Adobe Premiere Pro and After Effects with color correction handled in
              Premiere Pro. That live action work anchors the campaign and
              establishes the tone the rest of the assets build on.
            </p>
            <p>
              The 3D side started in Adobe Substance Painter, where the coffee bag
              textures were built with realistic plastic surfaces, bag
              deformations, and proper layering of the approved bag designs. Those
              textures were then applied inside Cinema 4D and rendered with Octane
              to create the scenes and imagery for the campaign.
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
            Stills
          </p>
          <h2 className="font-headline text-h3 font-bold">
            Frames from{" "}
            <span className="text-white">the campaign</span>
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
            <WorkFrame
              client={overview.client}
              discipline="3D Modeling & Scene Design"
              index={1}
              className="aspect-[21/9] rounded-2xl"
            >
              <Image
                src={galleryImages[0]}
                alt="Biscayne Coffee campaign still 1"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </WorkFrame>
          </motion.div>

          {/* Row 2: Wide + tall */}
          <motion.div variants={galleryItem} className="md:col-span-7">
            <WorkFrame
              client={overview.client}
              discipline="Texture Design & Rendering"
              index={2}
              className="aspect-[16/10] rounded-2xl"
            >
              <Image
                src={galleryImages[1]}
                alt="Biscayne Coffee campaign still 2"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            </WorkFrame>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-5">
            <WorkFrame
              client={overview.client}
              discipline="3D Modeling & Scene Design"
              index={3}
              className="aspect-[3/4] rounded-2xl"
            >
              <Image
                src={galleryImages[2]}
                alt="Biscayne Coffee campaign still 3"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </WorkFrame>
          </motion.div>

          {/* Row 3: Three equal columns */}
          <motion.div variants={galleryItem} className="md:col-span-4">
            <WorkFrame
              client={overview.client}
              discipline="Texture Design & Rendering"
              index={4}
              className="aspect-[4/3] rounded-2xl"
            >
              <Image
                src={galleryImages[3]}
                alt="Biscayne Coffee campaign still 4"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </WorkFrame>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-4">
            <WorkFrame
              client={overview.client}
              discipline="Cinematography (Canon C70)"
              index={5}
              className="aspect-[4/3] rounded-2xl"
            >
              <Image
                src={galleryImages[4]}
                alt="Biscayne Coffee campaign still 5"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </WorkFrame>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-4">
            <WorkFrame
              client={overview.client}
              discipline="Cinematography (Canon C70)"
              index={6}
              className="aspect-[4/3] rounded-2xl"
            >
              <Image
                src={galleryImages[5]}
                alt="Biscayne Coffee campaign still 6"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </WorkFrame>
          </motion.div>

          {/* Row 4: Asymmetric pair */}
          <motion.div variants={galleryItem} className="md:col-span-5">
            <WorkFrame
              client={overview.client}
              discipline="Editorial & Color"
              index={7}
              className="aspect-[3/4] rounded-2xl"
            >
              <Image
                src={galleryImages[6]}
                alt="Biscayne Coffee campaign still 7"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </WorkFrame>
          </motion.div>
          <motion.div variants={galleryItem} className="md:col-span-7">
            <WorkFrame
              client={overview.client}
              discipline="Cinematography (Canon C70)"
              index={8}
              className="aspect-[16/10] rounded-2xl"
            >
              <Image
                src={galleryImages[7]}
                alt="Biscayne Coffee campaign still 8"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            </WorkFrame>
          </motion.div>

          {/* Row 5: Full-width closing */}
          <motion.div variants={galleryItem} className="md:col-span-12">
            <WorkFrame
              client={overview.client}
              discipline="3D Modeling & Scene Design"
              index={9}
              className="aspect-[21/9] rounded-2xl"
            >
              <Image
                src={galleryImages[8]}
                alt="Biscayne Coffee campaign closing still"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </WorkFrame>
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
            A launch that{" "}
            <span className="text-white">looks like the brand</span>
          </h2>
        </motion.div>

        {/* Lead result statement */}
        <motion.div
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

          <ul className="space-y-4 border-l border-electric-indigo/30 pl-6">
            {results.slice(1).map((result) => (
              <li
                key={result}
                className="font-body text-cool-gray text-base md:text-lg leading-relaxed"
              >
                {result}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Tools & Technology ────────────────────────────────────── */}
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
      <section className="section-container section-padding" style={{ backgroundColor: "#120D1A" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-headline text-h2 font-bold mb-6">
            Have a product worth{" "}
            <span className="text-white">launching</span>?
          </h2>
          <p className="font-body text-cool-gray text-base md:text-lg leading-relaxed mb-10">
            Let&rsquo;s build a launch that pairs a directed film with photoreal 3D
            so the brand looks consistent everywhere it shows up.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contact" className="btn-primary">
              Book a Call
            </Link>
            <Link
              href="/projects/unplugged-sessions"
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
