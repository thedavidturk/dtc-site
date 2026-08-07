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

/* Editorial gallery plan: aspect + column width per still, captions below. */
const galleryPlan = [
  {
    src: galleryImages[0],
    alt: "Biscayne Coffee campaign still 1",
    discipline: "3D Modeling & Scene Design",
    aspect: "aspect-[21/9]",
    width: "max-w-none",
    sizes: "100vw",
  },
  {
    src: galleryImages[1],
    alt: "Biscayne Coffee campaign still 2",
    discipline: "Texture Design & Rendering",
    aspect: "aspect-[16/10]",
    width: "max-w-[980px]",
    sizes: "(max-width: 768px) 100vw, 980px",
  },
  {
    src: galleryImages[2],
    alt: "Biscayne Coffee campaign still 3",
    discipline: "3D Modeling & Scene Design",
    aspect: "aspect-[3/4]",
    width: "max-w-[560px]",
    sizes: "(max-width: 768px) 100vw, 560px",
  },
  {
    src: galleryImages[3],
    alt: "Biscayne Coffee campaign still 4",
    discipline: "Texture Design & Rendering",
    aspect: "aspect-[4/3]",
    width: "max-w-[820px]",
    sizes: "(max-width: 768px) 100vw, 820px",
  },
  {
    src: galleryImages[4],
    alt: "Biscayne Coffee campaign still 5",
    discipline: "Cinematography (Canon C70)",
    aspect: "aspect-[4/3]",
    width: "max-w-[820px]",
    sizes: "(max-width: 768px) 100vw, 820px",
  },
  {
    src: galleryImages[5],
    alt: "Biscayne Coffee campaign still 6",
    discipline: "Cinematography (Canon C70)",
    aspect: "aspect-[4/3]",
    width: "max-w-[820px]",
    sizes: "(max-width: 768px) 100vw, 820px",
  },
  {
    src: galleryImages[6],
    alt: "Biscayne Coffee campaign still 7",
    discipline: "Editorial & Color",
    aspect: "aspect-[3/4]",
    width: "max-w-[560px]",
    sizes: "(max-width: 768px) 100vw, 560px",
  },
  {
    src: galleryImages[7],
    alt: "Biscayne Coffee campaign still 8",
    discipline: "Cinematography (Canon C70)",
    aspect: "aspect-[16/10]",
    width: "max-w-[980px]",
    sizes: "(max-width: 768px) 100vw, 980px",
  },
  {
    src: galleryImages[8],
    alt: "Biscayne Coffee campaign closing still",
    discipline: "3D Modeling & Scene Design",
    aspect: "aspect-[21/9]",
    width: "max-w-none",
    sizes: "100vw",
  },
];

/* ------------------------------------------------------------------ */
/*  Local Prism Pieces                                                 */
/* ------------------------------------------------------------------ */

function PlateCaption({ label, value }: { label: string; value: string }) {
  return (
    <figcaption className="mt-4">
      <span className="block text-caption uppercase tracking-[0.02em] font-normal text-fog-blue">
        {label}
      </span>
      <span className="mt-1 block font-body text-body-sm font-normal text-bone">
        {value}
      </span>
    </figcaption>
  );
}

function Rule() {
  return <div aria-hidden="true" className="border-t border-ash-border" />;
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <m.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mb-14"
    >
      <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
        {eyebrow}
      </p>
      <h2 className="font-body text-heading-lg font-normal text-bone max-w-[900px]">
        {title}
      </h2>
    </m.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BiscayneCoffeeProject() {
  return (
    <article className="bg-obsidian min-h-screen">
      {/* ── Opener ────────────────────────────────────────────────── */}
      <header className="section-container pt-36 pb-16 md:pt-44 md:pb-24">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: prismEase }}
        >
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-caption uppercase tracking-[0.02em] font-normal text-bone hover:text-fog-blue transition-colors duration-500 ease-prism"
          >
            <svg
              className="w-4 h-4"
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: prismEase }}
          className="mt-14 text-[17px] uppercase tracking-[0.02em] font-normal text-fog-blue"
        >
          Product Launch / 3D + Video
        </m.p>

        <div className="mt-6 overflow-hidden">
          <m.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: prismEase }}
            className="font-body font-normal text-bone text-display-sm"
          >
            Biscayne Coffee
          </m.h1>
        </div>

        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: prismEase }}
          className="mt-6 font-body text-body-lg font-normal text-bone"
        >
          Launch Campaign, Video and 3D Design
        </m.p>

        {/* Metadata row */}
        <m.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65, ease: prismEase }}
          className="mt-16 grid grid-cols-1 gap-y-8 sm:grid-cols-3 sm:gap-x-10 border-b border-ash-border pb-8"
        >
          <div>
            <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue">
              Project
            </dt>
            <dd className="mt-1 font-body text-body-lg font-normal text-bone">
              {overview.client}
            </dd>
          </div>
          <div>
            <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue">
              Discipline
            </dt>
            <dd className="mt-1 font-body text-body-lg font-normal text-bone">
              {overview.industry}
            </dd>
          </div>
          <div>
            <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue">
              Format
            </dt>
            <dd className="mt-1 font-body text-body-lg font-normal text-bone">
              {overview.timeline}
            </dd>
          </div>
        </m.dl>
      </header>

      {/* ── Hero Media Card ───────────────────────────────────────── */}
      <section className="section-container pb-24 md:pb-36">
        <m.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="w-full"
        >
          <div className="relative aspect-[21/9] overflow-hidden rounded-[15px] border border-ash-border">
            <Image
              src={galleryImages[0]}
              alt="Biscayne Coffee launch campaign still"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <PlateCaption label="Biscayne Coffee" value="Launch campaign still" />
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
          className="mb-12"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            In Motion
          </p>
          <h2 className="font-body text-heading-sm font-normal text-bone">
            The Launch, Moving
          </h2>
        </m.div>

        <m.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="w-full max-w-[980px]"
        >
          <div className="relative aspect-video overflow-hidden rounded-[15px] border border-ash-border">
            <AutoplayVideo
              src="/motion/biscayne.mp4"
              poster="/motion/biscayne.jpg"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <PlateCaption label="In Motion" value="Biscayne" />
        </m.figure>
      </section>

      <Rule />

      {/* ── The Film ──────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            The Film
          </p>
          <h2 className="font-body text-heading-sm font-normal text-bone">
            Watch the launch video
          </h2>
        </m.div>

        <m.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="w-full"
        >
          <div className="relative w-full overflow-hidden rounded-[15px] border border-ash-border aspect-video">
            <iframe
              src="https://www-ccv.adobe.io/v1/player/ccv/HNQhk4YtxBY/embed?bgcolor=%23120D1A&lazyLoading=true&api_key=BehancePro2View"
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Biscayne Coffee"
            />
          </div>
          <PlateCaption label="The Film" value="Biscayne Coffee launch video" />
        </m.figure>
      </section>

      <Rule />

      {/* ── The Idea ──────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <SectionHeader
          eyebrow="The Idea"
          title="A launch campaign built on film and 3D"
        />

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[640px]"
        >
          <div className="text-body-sm font-normal space-y-7">
            <p className="text-bone">
              Biscayne Coffee needed a campaign launch for
              www.BiscayneCoffee.com that could introduce the brand with both a
              live action film and a set of fully rendered product imagery. The
              work spans a directed launch video and a 3D pipeline built around
              the coffee bags themselves.
            </p>
            <p className="text-fog-blue">
              The challenge was to keep the live footage and the rendered scenes
              reading as one campaign. The launch video sets the tone, while the
              3D work delivers photoreal product imagery that matches the look
              and carries the brand across the rest of the launch.
            </p>
          </div>
        </m.div>

        {/* Services */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[640px] mt-20"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
            Services
          </p>
          <ul>
            {overview.services.map((service) => (
              <m.li
                key={service}
                variants={staggerItem}
                className="border-b border-ash-border py-4 font-body text-body-lg font-normal text-bone"
              >
                {service}
              </m.li>
            ))}
          </ul>
        </m.div>
      </section>

      <Rule />

      {/* ── The Process ───────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <SectionHeader
          eyebrow="The Process"
          title="From the shoot to the render in five moves"
        />

        <div className="max-w-[900px]">
          {approach.map((item) => (
            <m.div
              key={item.step}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 md:gap-10 border-t border-ash-border py-12"
            >
              <span
                aria-hidden="true"
                className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue"
              >
                Step {item.step}
              </span>
              <div>
                <h3 className="font-body text-heading-sm font-normal text-bone mb-4">
                  {item.title}
                </h3>
                <p className="max-w-[640px] text-body-sm font-normal text-bone">
                  {item.description}
                </p>
              </div>
            </m.div>
          ))}
        </div>
      </section>

      <Rule />

      {/* ── The Craft ─────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <SectionHeader
          eyebrow="The Craft"
          title="Real footage, meet photoreal 3D"
        />

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[640px]"
        >
          <div className="text-body-sm font-normal space-y-7">
            <p className="text-bone">
              The launch video was shot on the Canon C70 in Raw LT, then edited in
              Adobe Premiere Pro and After Effects with color correction handled in
              Premiere Pro. That live action work anchors the campaign and
              establishes the tone the rest of the assets build on.
            </p>
            <p className="text-fog-blue">
              The 3D side started in Adobe Substance Painter, where the coffee bag
              textures were built with realistic plastic surfaces, bag
              deformations, and proper layering of the approved bag designs. Those
              textures were then applied inside Cinema 4D and rendered with Octane
              to create the scenes and imagery for the campaign.
            </p>
          </div>
        </m.div>
      </section>

      <Rule />

      {/* ── Gallery ───────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <SectionHeader eyebrow="Stills" title="Frames from the campaign" />

        <div className="space-y-20 md:space-y-28">
          {galleryPlan.map((plate, i) => (
            <m.figure
              key={plate.src + i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className={`w-full ${plate.width}`}
            >
              <div
                className={`relative ${plate.aspect} overflow-hidden rounded-[15px] border border-ash-border`}
              >
                <Image
                  src={plate.src}
                  alt={plate.alt}
                  fill
                  className="object-cover"
                  sizes={plate.sizes}
                />
              </div>
              <PlateCaption
                label={`${overview.client} / ${String(i + 1).padStart(2, "0")}`}
                value={plate.discipline}
              />
            </m.figure>
          ))}
        </div>
      </section>

      <Rule />

      {/* ── The Result ────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <SectionHeader
          eyebrow="The Result"
          title="A launch that looks like the brand"
        />

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[720px]"
        >
          <p className="font-body text-heading-sm font-normal text-bone mb-12">
            {results[0]}
          </p>

          {/* TODO(David): add quantified result or client quote here */}

          <ul className="max-w-[640px]">
            {results.slice(1).map((result) => (
              <li
                key={result}
                className="border-t border-ash-border py-5 text-body-sm font-normal text-bone"
              >
                {result}
              </li>
            ))}
          </ul>
        </m.div>
      </section>

      <Rule />

      {/* ── Capabilities ──────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <SectionHeader eyebrow="Capabilities" title="The production toolkit" />

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[720px]"
        >
          {tools.map((tool) => (
            <m.div
              key={tool.name}
              variants={staggerItem}
              className="border-t border-ash-border py-8"
            >
              <h3 className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
                {tool.name}
              </h3>
              <p className="max-w-[640px] text-body-sm font-normal text-bone">
                {tool.description}
              </p>
            </m.div>
          ))}
        </m.div>
      </section>

      <Rule />

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[720px]"
        >
          <h2 className="font-body text-heading-lg font-normal text-bone mb-6">
            Have a product worth launching?
          </h2>
          <p className="text-body-sm font-normal text-fog-blue mb-10 max-w-[640px]">
            Let&rsquo;s build a launch that pairs a directed film with photoreal 3D
            so the brand looks consistent everywhere it shows up.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link href="/#contact" className="btn-primary">
              Book a Call
            </Link>
            <Link
              href="/projects/unplugged-sessions"
              className="btn-secondary group inline-flex items-center gap-2"
            >
              View Next Project
              <svg
                className="w-4 h-4"
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
