"use client";

import Link from "@/components/TransitionLink";
import Image from "next/image";
import { m } from "framer-motion";
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
  client: "Ford / Florida Panthers",
  industry: "Brand Film / Cause",
  timeline: "Keys Hurricane Relief Drive",
  services: [
    "Campaign Direction",
    "Brand Film",
    "Partnership Activation",
    "On-Site Production",
    "Social Delivery",
  ],
};

const approach = [
  {
    step: "01",
    title: "Two Icons, One Cause",
    description:
      "Brought Ford and the Florida Panthers together behind a single purpose, turning the Go Further platform into a rallying point for the Florida Keys after the storm. The work leans on what each brand already stands for, then points all of that energy at the relief effort.",
  },
  {
    step: "02",
    title: "Built Around the Drive",
    description:
      "Anchored the campaign in the relief drive itself, the trucks, the supplies, and the people moving them south toward the Keys. The story stays close to the ground so the cause never feels like a backdrop to the branding.",
  },
  {
    step: "03",
    title: "Capturing the Effort",
    description:
      "Directed on-site capture of the collection and the convoy so the film carries real texture instead of stock gloss. The goal was to show the work of getting help where it was needed, framed with the scale and motion the moment deserved.",
  },
  {
    step: "04",
    title: "A Film With a Pulse",
    description:
      "Cut the film to move with the urgency of the drive, building from the call to action into the push toward the Keys. The pacing keeps the hockey energy and the relief mission in the same frame without letting one drown out the other.",
  },
  {
    step: "05",
    title: "Made to Travel",
    description:
      "Delivered the campaign for the platforms where fans and supporters actually live, framed and paced to hold attention and pull people into the cause from the first second.",
  },
];

const results = [
  "A Ford and Florida Panthers partnership pointed squarely at Keys hurricane relief",
  "A brand film that keeps the Go Further platform tied to a real cause",
  "On-the-ground capture of the relief drive from collection to convoy",
  "Editorial pacing that carries both the team energy and the urgency of the mission",
  "Campaign content shaped for social reach and fan participation",
];

const tools = [
  {
    name: "Campaign Direction",
    description:
      "Creative direction across the partnership, shaping how Ford and the Florida Panthers showed up together behind the relief drive.",
  },
  {
    name: "Brand Film Production",
    description:
      "On-site capture of the drive built into a film that reads as cause-first while staying true to both brands.",
  },
  {
    name: "Adobe Premiere Pro",
    description:
      "Editorial assembly, pacing, and finishing to build the film around the urgency of the relief effort.",
  },
  {
    name: "Social Delivery",
    description:
      "Finished and formatted for social platforms so fans and supporters could find the drive and act on it.",
  },
];

/* Real campaign stills scraped from the live source, in page order. */
const galleryImages = [
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/9caa0d76-d81f-46d4-9b7d-b1a4d23c8eb4_rw_1920.png?h=50305642df925c79008b41c356e376be",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/d5df28c1-8a64-4397-8f02-f9a895dbc9ab_rw_1920.png?h=20006fb5b10a0042c523dad3b2a28917",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/31da16d6-c3c7-4036-bb55-be49d69cf909_rw_1920.png?h=67ec8ca318c06c7c730e4094f5cddd5d",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/0a53fa6d-435d-4405-a21e-5e3ffa1861b0_rw_1920.png?h=ae1eb4d0ba930c4e5ba67fcd79f6cd30",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/65964a75-7f70-43f9-b3a4-3ba8220f5d79_rw_1920.png?h=c6868699d5b2ecc4b353cfc0f5069ed6",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/1f08d1a1-db6b-492c-ba20-516f48c98df5_rw_1920.png?h=e25f1f350702e0f5f6c41604010ed662",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/fc8a5082-cf21-4461-bc29-820570baa5c2_rw_1920.png?h=132c273e075d1813dd7e667d25b00e4a",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/a876b2b3-f188-4d13-b47d-d72069ea5e94_rw_1920.png?h=c9a5ae326ee4f01af6199f878f732040",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/558019cd-bcbd-48de-a804-94bd519bc8fc_rw_1920.png?h=a8d8240dc7bd2b51d4fbf67a5a3322e2",
  "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/9cfbfb04-2c42-4b1d-b1dc-77274e9ff1ac_rw_1920.png?h=ee8fc676e1dd909f4463e96f495d2dda",
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FloridaPanthersProject() {
  return (
    <article className="bg-espresso min-h-screen" style={{ backgroundColor: "#fffef7" }}>
      {/* ── Back Link ─────────────────────────────────────────────── */}
      <m.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="fixed top-24 left-6 md:left-8 lg:left-12 z-40"
      >
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-clay-gray hover:text-pure-white transition-colors duration-300"
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
        {/* Cover image */}
        <div className="absolute inset-0">
          <Image
            src={galleryImages[0]}
            alt="Ford Go Further Florida Panthers Keys hurricane relief drive still"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-black/50" />

        {/* Indigo wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta/30 via-transparent to-black/40 mix-blend-multiply" />

        {/* Radial fade at bottom */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-espresso via-espresso/40 to-transparent" />

        <div className="section-container relative z-10 pb-16 md:pb-24 pt-32">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block font-mono text-xs tracking-widest uppercase text-bone-white/70 mb-4 px-3 py-1.5 rounded-full border border-black/10 backdrop-blur-sm bg-black/5">
              Brand Film / Cause
            </span>
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-h1 font-light mb-4"
          >
            FORD: GO FURTHER
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-2xl md:text-3xl lg:text-4xl font-normal text-bone-white/80 tracking-tight"
          >
            Florida Panthers, Keys Hurricane Relief Drive
          </m.p>

          {/* Animated line */}
          <m.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-terracotta to-violet-400 mt-8"
          />
        </div>
      </section>

      {/* ── Animated GIF Band ─────────────────────────────────────── */}
      <ProjectGifBand
        eyebrow="In Motion"
        heading="The Drive, Moving"
        gifs={[
          {
            src: "/motion/panthers.mp4",
            poster: "/motion/panthers.jpg",
            label: "Go Further",
          },
        ]}
      />

      {/* ── The Film (Video) ─────────────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#fffef7" }}>
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-10"
        >
          <p className="text-caption uppercase tracking-[0.08em] text-graphite mb-4">
            The Film
          </p>
          <h2 className="font-headline text-h3 font-light">
            Press play on{" "}
            <span className="gradient-text">the relief drive</span>
          </h2>
        </m.div>

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="relative"
        >
          {/* Ambient glow behind the video */}
          <div className="absolute -inset-3 md:-inset-5 bg-gradient-to-r from-terracotta/10 via-violet-500/5 to-terracotta/10 rounded-none blur-2xl opacity-60 pointer-events-none" />

          <div className="relative w-full overflow-hidden rounded-none border border-black/10 bg-black aspect-video  ">
            <iframe
              src="https://www-ccv.adobe.io/v1/player/ccv/7bxcHMYo5Xg/embed?bgcolor=%23120D1A&lazyLoading=true&api_key=BehancePro2View"
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Ford Go Further"
            />
          </div>
        </m.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      </div>

      {/* ── Overview Sidebar + Challenge ──────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#fffef7" }}>
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
                <p className="font-mono text-xs tracking-widest uppercase text-terracotta mb-2">
                  Project
                </p>
                <p className="font-headline text-lg font-light text-pure-white">
                  {overview.client}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-terracotta mb-2">
                  Discipline
                </p>
                <p className="font-body text-clay-gray">
                  {overview.industry}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-terracotta mb-2">
                  Format
                </p>
                <p className="font-body text-clay-gray">
                  {overview.timeline}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-terracotta mb-2">
                  Services
                </p>
                <ul className="space-y-2">
                  {overview.services.map((service) => (
                    <li
                      key={service}
                      className="flex items-center gap-3 font-body text-sm text-clay-gray"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta flex-shrink-0" />
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
            <p className="text-caption uppercase tracking-[0.08em] text-graphite mb-4">
              The Idea
            </p>
            <h2 className="font-headline text-h3 font-light mb-8">
              A partnership built to{" "}
              <span className="text-bone-white">go further for the Keys</span>
            </h2>
            <div className="font-body text-clay-gray text-base md:text-lg leading-relaxed space-y-6">
              <p>
                When the Florida Keys were hit hard, Ford and the Florida
                Panthers came together to turn the Go Further platform into a
                relief drive, rallying fans and the community to help the people
                who needed it most.
              </p>
              <p>
                The direction challenge was to keep the cause at the center.
                Two big names, one shared purpose, and a film that had to read
                as genuine help rather than a logo exercise. Every choice was
                made to keep the focus on the drive and the people it served.
              </p>
            </div>
          </m.div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      </div>

      {/* ── Our Approach (scroll-scrubbed pinned section) ────────── */}
      <PinnedApproach
        eyebrow="The Direction"
        heading="From the call to the convoy in five moves"
        steps={approach.map(({ title, description }) => ({
          title,
          body: description,
        }))}
      />

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      </div>

      {/* ── The Approach Narrative ───────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#fffef7" }}>
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-4xl"
        >
          <p className="text-caption uppercase tracking-[0.08em] text-graphite mb-4">
            The Feel
          </p>
          <h2 className="font-headline text-h3 font-light mb-8">
            Big brands, but{" "}
            <span className="text-bone-white">a human mission</span>
          </h2>
          <div className="font-body text-clay-gray text-base md:text-lg leading-relaxed space-y-6">
            <p>
              The film treats the relief drive as the hero. The camera stays
              with the work of collecting and moving supplies, and the cut
              carries the urgency of getting help south to the Keys. Ford and
              the Florida Panthers are present throughout, but the cause is what
              the audience walks away remembering.
            </p>
            <p>
              By keeping the tone grounded, the campaign turns a partnership
              into a reason to act. The result is a piece that fits the Go
              Further platform while pointing all of that reach at a real moment
              when the community needed it.
            </p>
          </div>
        </m.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      </div>

      {/* ── Gallery ──────────────────────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#fffef7" }}>
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <p className="text-caption uppercase tracking-[0.08em] text-graphite mb-4">
            Stills
          </p>
          <h2 className="font-headline text-h3 font-light">
            Frames from{" "}
            <span className="text-bone-white">the campaign</span>
          </h2>
        </m.div>

        <m.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6"
        >
          {/* Row 1: Full-width hero */}
          <m.div variants={galleryItem} className="md:col-span-12">
            <WorkFrame
              client={overview.client}
              discipline="Campaign Direction"
              index={1}
              className="aspect-[21/9] rounded-none"
            >
              <Image
                src={galleryImages[0]}
                alt="Ford Go Further Florida Panthers campaign still 1"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </WorkFrame>
          </m.div>

          {/* Row 2: Wide + tall */}
          <m.div variants={galleryItem} className="md:col-span-7">
            <WorkFrame
              client={overview.client}
              discipline="Brand Film"
              index={2}
              className="aspect-[16/10] rounded-none"
            >
              <Image
                src={galleryImages[1]}
                alt="Ford Go Further Florida Panthers campaign still 2"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            </WorkFrame>
          </m.div>
          <m.div variants={galleryItem} className="md:col-span-5">
            <WorkFrame
              client={overview.client}
              discipline="On-Site Production"
              index={3}
              className="aspect-[3/4] rounded-none"
            >
              <Image
                src={galleryImages[2]}
                alt="Ford Go Further Florida Panthers campaign still 3"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </WorkFrame>
          </m.div>

          {/* Row 3: Three equal columns */}
          <m.div variants={galleryItem} className="md:col-span-4">
            <WorkFrame
              client={overview.client}
              discipline="On-Site Production"
              index={4}
              className="aspect-[4/3] rounded-none"
            >
              <Image
                src={galleryImages[3]}
                alt="Ford Go Further Florida Panthers campaign still 4"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </WorkFrame>
          </m.div>
          <m.div variants={galleryItem} className="md:col-span-4">
            <WorkFrame
              client={overview.client}
              discipline="Partnership Activation"
              index={5}
              className="aspect-[4/3] rounded-none"
            >
              <Image
                src={galleryImages[4]}
                alt="Ford Go Further Florida Panthers campaign still 5"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </WorkFrame>
          </m.div>
          <m.div variants={galleryItem} className="md:col-span-4">
            <WorkFrame
              client={overview.client}
              discipline="On-Site Production"
              index={6}
              className="aspect-[4/3] rounded-none"
            >
              <Image
                src={galleryImages[5]}
                alt="Ford Go Further Florida Panthers campaign still 6"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </WorkFrame>
          </m.div>

          {/* Row 4: Asymmetric pair */}
          <m.div variants={galleryItem} className="md:col-span-5">
            <WorkFrame
              client={overview.client}
              discipline="Brand Film"
              index={7}
              className="aspect-[3/4] rounded-none"
            >
              <Image
                src={galleryImages[6]}
                alt="Ford Go Further Florida Panthers campaign still 7"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </WorkFrame>
          </m.div>
          <m.div variants={galleryItem} className="md:col-span-7">
            <WorkFrame
              client={overview.client}
              discipline="Partnership Activation"
              index={8}
              className="aspect-[16/10] rounded-none"
            >
              <Image
                src={galleryImages[7]}
                alt="Ford Go Further Florida Panthers campaign still 8"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            </WorkFrame>
          </m.div>

          {/* Row 5: Asymmetric closing pair */}
          <m.div variants={galleryItem} className="md:col-span-7">
            <WorkFrame
              client={overview.client}
              discipline="Brand Film"
              index={9}
              className="aspect-[16/10] rounded-none"
            >
              <Image
                src={galleryImages[8]}
                alt="Ford Go Further Florida Panthers campaign still 9"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            </WorkFrame>
          </m.div>
          <m.div variants={galleryItem} className="md:col-span-5">
            <WorkFrame
              client={overview.client}
              discipline="Social Delivery"
              index={10}
              className="aspect-[3/4] rounded-none"
            >
              <Image
                src={galleryImages[9]}
                alt="Ford Go Further Florida Panthers campaign closing still"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </WorkFrame>
          </m.div>
        </m.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      </div>

      {/* ── The Result ───────────────────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#fffef7" }}>
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="text-caption uppercase tracking-[0.08em] text-graphite mb-4">
            The Result
          </p>
          <h2 className="font-headline text-h3 font-light">
            A campaign that{" "}
            <span className="text-bone-white">put reach behind relief</span>
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
          <p className="font-display text-h2 font-light text-pure-white mb-10">
            {results[0]}
          </p>

          {/* TODO(David): add quantified result or client quote here */}

          <ul className="space-y-4 border-l border-terracotta/30 pl-6">
            {results.slice(1).map((result) => (
              <li
                key={result}
                className="font-body text-clay-gray text-base md:text-lg leading-relaxed"
              >
                {result}
              </li>
            ))}
          </ul>
        </m.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      </div>

      {/* ── Tools & Technology ────────────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#fffef7" }}>
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="text-caption uppercase tracking-[0.08em] text-graphite mb-4">
            Capabilities
          </p>
          <h2 className="font-headline text-h3 font-light">
            The <span className="text-bone-white">production toolkit</span>
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
              className="group p-6 rounded-none border border-black/5 bg-black/[0.02] hover:border-terracotta/20 hover:bg-terracotta/[0.03] transition-all duration-500"
            >
              <h3 className="font-headline text-lg font-light text-pure-white mb-2 group-hover:text-terracotta transition-colors duration-300">
                {tool.name}
              </h3>
              <p className="font-body text-sm text-clay-gray leading-relaxed">
                {tool.description}
              </p>
            </m.div>
          ))}
        </m.div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="section-container">
        <div className="h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      </div>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="section-container section-padding" style={{ backgroundColor: "#fffef7" }}>
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-headline text-h2 font-light mb-6">
            Have a cause{" "}
            <span className="text-bone-white">worth rallying behind</span>?
          </h2>
          <p className="font-body text-clay-gray text-base md:text-lg leading-relaxed mb-10">
            Let&rsquo;s build a campaign that turns a brand partnership into real
            momentum for the people it serves.
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
        </m.div>
      </section>
    </article>
  );
}
