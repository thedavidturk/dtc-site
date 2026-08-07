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
  client: "The Hospitality Mentor",
  industry: "Hospitality / Culinary",
  timeline: "3 Weeks",
  services: [
    "Cinematic Video Production",
    "Documentary-Style Direction",
    "Food Cinematography",
    "Post-Production & VFX",
    "4K Delivery",
  ],
};

const approach = [
  {
    step: "01",
    title: "Cinematic Food Cinematography",
    description:
      "Leveraged the Canon C70 cinema camera's high dynamic range to capture every texture, color, and detail of the omakase dishes. Each plate was treated as its own visual composition, lit and framed to evoke the artistry behind the cuisine.",
  },
  {
    step: "02",
    title: "Documentary-Style Handheld Filming",
    description:
      "Moved through the live kitchen environment with handheld cinematography, using the C70's Dual Gain Output sensor to maintain broadcast-quality imagery in challenging, low-light conditions. The result is raw authenticity paired with cinematic polish.",
  },
  {
    step: "03",
    title: "Narrative Structure & Editorial",
    description:
      "Structured the episode's narrative flow in Adobe Premiere Pro, weaving together the chef's craft, the guest experience, and the atmosphere of Faena Miami Beach into a cohesive story that unfolds like a short film.",
  },
  {
    step: "04",
    title: "Motion Graphics & Visual Effects",
    description:
      "Added elegant motion graphics and subtle visual effects in Adobe After Effects to enhance transitions, introduce segments, and reinforce the premium aesthetic without overshadowing the organic storytelling.",
  },
  {
    step: "05",
    title: "4K Mastering & Delivery",
    description:
      "Mastered the final cut in full 4K resolution to preserve every sensory detail, from the glistening surface of fresh sashimi to the ambient glow of the dining room. Delivered optimized assets for digital distribution.",
  },
];

const results = [
  "Sensory-driven episode placing viewers inside an upscale omakase experience",
  "Cinematic quality achieved in a live, uncontrolled environment",
  "Blended Faena Miami Beach's luxury aesthetic with culinary craftsmanship",
  "Documentary authenticity paired with feature-film visual storytelling",
  "Full 4K delivery for immersive detail across digital platforms",
];

const tools = [
  {
    name: "Canon C70",
    description:
      "Cinema camera with Dual Gain Output sensor for high dynamic range capture in challenging lighting conditions.",
  },
  {
    name: "Adobe Premiere Pro",
    description:
      "Editorial assembly, narrative structuring, pacing, and color grading for the final episode.",
  },
  {
    name: "Adobe After Effects",
    description:
      "Motion graphics, visual effects, transitions, and title design for premium presentation.",
  },
  {
    name: "4K Pipeline",
    description:
      "End-to-end 4K production workflow from capture through final delivery for maximum visual fidelity.",
  },
];

const gallery = [
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/2b30b8bf-b3fd-43fd-b242-1fc4736e6946_rw_3840.png?h=de0ce295ccfda4a8762ce19708703262", alt: "El Secreto omakase cinematic still 1", aspect: "aspect-[21/9]", span: "md:col-span-12", discipline: "Cinematic Video Production" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/24b244e3-b83b-4b7a-baf5-c6b8b65e4475_rw_3840.png?h=99f746c5ced60dde7de6ce105d8562a5", alt: "El Secreto omakase cinematic still 2", aspect: "aspect-[16/10]", span: "md:col-span-7", discipline: "Food Cinematography" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/30be6f9c-e1f9-47e2-86a9-6e7c05d3461d_rw_3840.png?h=202bc393101a46898c0ebd5c84062caa", alt: "El Secreto omakase cinematic still 3", aspect: "aspect-[3/4]", span: "md:col-span-5", discipline: "Documentary-Style Direction" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/bdd74e73-998e-4882-8a91-8c3ce1487e32_rw_3840.png?h=4a6b1eb3c72cd77ed660dd55224c5899", alt: "El Secreto omakase cinematic still 4", aspect: "aspect-[4/3]", span: "md:col-span-4", discipline: "Food Cinematography" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/6b90fc91-2a17-4373-a58a-4dc68aacbfff_rw_3840.png?h=eb8e89cc54173ba379375ea0788697b0", alt: "El Secreto omakase cinematic still 5", aspect: "aspect-[4/3]", span: "md:col-span-4", discipline: "Food Cinematography" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/72f388ff-6ed0-4b8e-8088-1d696ef1bf15_rw_3840.png?h=56fde8ff61d535628929d86d9c1c353e", alt: "El Secreto omakase cinematic still 6", aspect: "aspect-[4/3]", span: "md:col-span-4", discipline: "Documentary-Style Direction" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/fb88a0b8-75ef-49b6-90b8-2c12f7dc6318_rw_3840.png?h=7368e43c6bb7ee0e6895275a50d7f0bf", alt: "El Secreto omakase cinematic still 7", aspect: "aspect-[3/4]", span: "md:col-span-5", discipline: "Documentary-Style Direction" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/afb6b9e1-83e4-454f-9101-4d6dfc55a1ed_rw_3840.png?h=3d167587d6ac1952d9ad386620d9459c", alt: "El Secreto omakase cinematic still 8", aspect: "aspect-[16/10]", span: "md:col-span-7", discipline: "Cinematic Video Production" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/f05ee96a-032f-4dff-9495-61defe3508c4_rw_3840.png?h=c9b6cc64c72f7eb987304990567a9d2b", alt: "El Secreto omakase cinematic still 9", aspect: "aspect-[4/3]", span: "md:col-span-4", discipline: "Food Cinematography" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/684bd88c-a12a-43f0-8c86-42513107abef_rw_3840.png?h=6cc869a96a4b5566dde315e9d9d0cc25", alt: "El Secreto omakase cinematic still 10", aspect: "aspect-[4/3]", span: "md:col-span-4", discipline: "Food Cinematography" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/6e5a427f-3801-426f-838a-f97c0467e240_rw_3840.png?h=2a531adc8de1e7c1047d3fac08665657", alt: "El Secreto omakase cinematic still 11", aspect: "aspect-[4/3]", span: "md:col-span-4", discipline: "Documentary-Style Direction" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/b07529cf-7338-4033-b7f3-ed2338735f32_rw_3840.png?h=d7969ee36bbfa2b38d252720de936370", alt: "El Secreto omakase cinematic still 12", aspect: "aspect-[16/9]", span: "md:col-span-8", discipline: "Cinematic Video Production" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/10da8fa1-c7ba-479a-94d7-ffe48c5a98b1_rw_3840.png?h=0ab7636ad107a1b53fd3cda3df1b19d9", alt: "El Secreto omakase cinematic still 13", aspect: "aspect-[3/4]", span: "md:col-span-4", discipline: "Documentary-Style Direction" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/5250cabf-bb36-4d03-8c07-0392c092b569_rw_3840.png?h=e383294d59703110b6434dc6a2fadef7", alt: "El Secreto omakase cinematic still 14", aspect: "aspect-[4/3]", span: "md:col-span-4", discipline: "Food Cinematography" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/2aa570be-ae99-42bd-940b-e71d8e921690_rw_3840.png?h=83ea0ac28d55d1476ef4923c6e0caa70", alt: "El Secreto omakase cinematic still 15", aspect: "aspect-[4/3]", span: "md:col-span-4", discipline: "Food Cinematography" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/f97d5232-2ffd-435a-a5b9-aff188149226_rw_3840.png?h=db99a24a6e8d32a253917d9b386fe2d3", alt: "El Secreto omakase cinematic still 16", aspect: "aspect-[4/3]", span: "md:col-span-4", discipline: "Documentary-Style Direction" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/413be7b5-9592-43c1-8aa5-ccd1b202a4e7_rw_3840.png?h=09567a03c34e0ddb4f946ab2437980c5", alt: "El Secreto omakase cinematic still 17", aspect: "aspect-[16/10]", span: "md:col-span-6", discipline: "Cinematic Video Production" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/a803fc78-3105-40fe-9681-ac2082b581bd_rw_3840.png?h=46f1734c03714d3e082846c2daf6c057", alt: "El Secreto omakase cinematic still 18", aspect: "aspect-[16/10]", span: "md:col-span-6", discipline: "Post-Production & VFX" },
  { src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/8476057e-bafc-4c8d-9ce2-c66a58a59c00_rw_3840.png?h=50d3ee6ea0b7a45dbd5e35bcfb45ee14", alt: "El Secreto omakase cinematic closing still", aspect: "aspect-[21/9]", span: "md:col-span-12", discipline: "4K Delivery" },
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

export default function ElSecretoProject() {
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
          Cinematic Video Production
        </m.p>

        <m.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: prismEase }}
          className="font-body font-normal text-bone text-display-sm leading-[1.01] tracking-[-0.02em] mb-6"
        >
          El Secreto
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: prismEase }}
          className="font-body text-body-lg font-normal text-bone"
        >
          Savoring the Unseen
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

      {/* ── Hero media plate: A Taste in Motion ───────────────────── */}
      <section className="section-container pb-24 md:pb-32">
        <m.figure
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75, ease: prismEase }}
        >
          <div className="relative aspect-video overflow-hidden rounded-[15px] border border-ash-border">
            <AutoplayVideo
              src="/motion/faena.mp4"
              poster="/motion/faena.jpg"
              aria-label="El Secreto"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <PlateCaption label="A Taste in Motion" value="El Secreto" />
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
            Capturing culinary artistry in a live environment
          </h2>
          <div className="font-body text-body-sm font-normal text-bone space-y-7">
            <p>
              The Hospitality Mentor needed a cinematic episode documenting an
              exclusive omakase dining experience at Faena Miami Beach, one of
              the most prestigious hotel properties in the world. The content
              had to convey the intimacy, craftsmanship, and sensory richness
              of the experience while maintaining the luxury aesthetic of the
              venue.
            </p>
            <p>
              The challenge: capture broadcast-quality footage in a live,
              uncontrolled kitchen and dining environment. Low light, tight
              spaces, constant movement, and no ability to reset or reshoot.
              Every moment was one take, and the cinematography had to be both
              documentary-authentic and cinematic-premium simultaneously.
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
            From kitchen to screen in five steps
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
            Documentary soul, cinematic craft
          </h2>
          <div className="font-body text-body-sm font-normal text-bone space-y-7">
            <p>
              Using the Canon C70 cinema camera, we captured every moment of the
              omakase experience with documentary intimacy and cinematic
              precision. The camera&rsquo;s Dual Gain Output sensor allowed us to
              work in the ambient light of the kitchen and dining room with no
              additional lighting rigs, no disruption to the experience, while
              maintaining the dynamic range and color depth of a controlled studio
              shoot.
            </p>
            <p>
              The result is an episode that feels like you&rsquo;re sitting at the
              counter yourself. Every slice, every sear, every plating gesture is
              captured in 4K detail. The editorial narrative weaves together the
              chef&rsquo;s artistry, the guest experience, and the luxury atmosphere
              of Faena Miami Beach into a sensory-driven story that transcends
              typical food content.
            </p>
          </div>
        </m.div>
      </section>

      <Rule />

      {/* ── The Film ─────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14 max-w-[640px]"
        >
          <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
            The Film
          </p>
          <h2 className="font-body text-heading-lg font-normal text-bone">
            Savoring the Unseen: Full Episode
          </h2>
        </m.div>

        <m.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="relative overflow-hidden rounded-[15px] border border-ash-border">
            {/* 16:9 aspect ratio wrapper */}
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src="https://www.youtube-nocookie.com/embed/l5h79VGqVSg?rel=0&modestbranding=1&color=white"
                title="El Secreto: Savoring the Unseen"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
          <PlateCaption
            label="The Film"
            value="El Secreto: Savoring the Unseen"
          />
        </m.figure>
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
            Savoring Every Detail
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
            An immersive experience, captured in 4K
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
            Ready to tell your story cinematically?
          </h2>
          <p className="font-body text-body-sm font-normal text-fog-blue mb-10">
            Let&rsquo;s create premium video content that captures the soul of
            your brand and commands attention.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link href="/#contact" className="btn-primary">
              Book a Call
            </Link>
            <Link
              href="/projects/betterfly"
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
