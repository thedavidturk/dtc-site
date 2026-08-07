"use client";

import Link from "@/components/TransitionLink";
import Image from "next/image";
import { m } from "framer-motion";
import LineReveal from "@/components/LineReveal";
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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: prismEase },
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
/*  Local pieces                                                       */
/* ------------------------------------------------------------------ */

/** Full-width hairline rule between bands. */
function Rule() {
  return (
    <div className="section-container">
      <div className="border-t border-ash-border" />
    </div>
  );
}

/** Uppercase fog-blue metadata label. */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue">
      {children}
    </p>
  );
}

/** Caption below a media card: fog-blue label + bone value. */
function PlateCaption({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-4 flex flex-col gap-1">
      <Label>{label}</Label>
      <p className="font-body text-caption font-normal text-bone">{value}</p>
    </div>
  );
}

/** Gallery still as a rounded media card with caption below. */
function StillPlate({
  src,
  alt,
  aspect,
  discipline,
  sizes,
}: {
  src: string;
  alt: string;
  aspect: string;
  discipline: string;
  sizes: string;
}) {
  return (
    <m.figure
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      <div
        className={`relative ${aspect} rounded-[15px] overflow-hidden border border-ash-border`}
      >
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
      </div>
      <figcaption>
        <PlateCaption label={discipline} value={overview.client} />
      </figcaption>
    </m.figure>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FloridaPanthersProject() {
  return (
    <article className="bg-obsidian min-h-screen">
      {/* ── Opener ────────────────────────────────────────────────── */}
      <header className="section-container pt-32 md:pt-40 pb-16 md:pb-24">
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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

        <div className="mt-16 md:mt-24">
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: prismEase }}
            className="text-[17px] uppercase tracking-[0.02em] font-normal text-fog-blue mb-8"
          >
            Brand Film / Cause
          </m.p>

          <h1 className="font-headline font-normal text-bone text-display-sm">
            <LineReveal delay={0.25}>FORD:</LineReveal>
            <LineReveal delay={0.35}>GO FURTHER</LineReveal>
          </h1>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: prismEase }}
            className="mt-8 font-body text-body-lg font-normal text-bone"
          >
            Florida Panthers, Keys Hurricane Relief Drive
          </m.p>
        </div>

        {/* Metadata row */}
        <m.dl
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.65 }}
          className="mt-16 md:mt-24 border-t border-ash-border pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <div>
            <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
              Project
            </dt>
            <dd className="font-body font-normal text-bone">
              {overview.client}
            </dd>
          </div>
          <div>
            <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
              Discipline
            </dt>
            <dd className="font-body font-normal text-bone">
              {overview.industry}
            </dd>
          </div>
          <div>
            <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
              Format
            </dt>
            <dd className="font-body font-normal text-bone">
              {overview.timeline}
            </dd>
          </div>
          <div>
            <dt className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
              Services
            </dt>
            <dd>
              <ul className="space-y-1.5">
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
        </m.dl>

        {/* Hero media card */}
        <m.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 md:mt-24"
        >
          <div className="relative aspect-[16/9] rounded-[15px] overflow-hidden border border-ash-border">
            <Image
              src={galleryImages[0]}
              alt="Ford Go Further Florida Panthers Keys hurricane relief drive still"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <figcaption>
            <PlateCaption
              label="Campaign Direction"
              value={overview.client}
            />
          </figcaption>
        </m.figure>
      </header>

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
          <Label>In Motion</Label>
          <h2 className="mt-4 font-headline text-heading-lg font-normal text-bone">
            The Drive, Moving
          </h2>
        </m.div>

        <m.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="rounded-[15px] overflow-hidden border border-ash-border">
            <AutoplayVideo
              src="/motion/panthers.mp4"
              poster="/motion/panthers.jpg"
              aria-label="Go Further"
              className="w-full aspect-video object-cover"
            />
          </div>
          <figcaption>
            <PlateCaption label="In Motion" value="Go Further" />
          </figcaption>
        </m.figure>
      </section>

      <Rule />

      {/* ── The Film ─────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <Label>The Film</Label>
          <h2 className="mt-4 font-headline text-heading-lg font-normal text-bone">
            Press play on the relief drive
          </h2>
        </m.div>

        <m.figure
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="relative w-full aspect-video rounded-[15px] overflow-hidden border border-ash-border">
            <iframe
              src="https://www-ccv.adobe.io/v1/player/ccv/7bxcHMYo5Xg/embed?bgcolor=%23120D1A&lazyLoading=true&api_key=BehancePro2View"
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Ford Go Further"
            />
          </div>
          <figcaption>
            <PlateCaption label="Brand Film" value="Ford Go Further" />
          </figcaption>
        </m.figure>
      </section>

      <Rule />

      {/* ── The Idea ─────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[640px]"
        >
          <Label>The Idea</Label>
          <h2 className="mt-4 font-headline text-heading-lg font-normal text-bone mb-10">
            A partnership built to go further for the Keys
          </h2>
          <div className="font-body text-body-sm font-normal text-bone space-y-7">
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
      </section>

      <Rule />

      {/* ── The Direction ─────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 md:mb-24"
        >
          <Label>The Direction</Label>
          <h2 className="mt-4 font-headline text-heading-lg font-normal text-bone">
            From the call to the convoy in five moves
          </h2>
        </m.div>

        <ol className="max-w-[720px]">
          {approach.map((item, i) => (
            <m.li
              key={item.step}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className={`py-12 md:py-16 ${
                i > 0 ? "border-t border-ash-border" : ""
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                <span
                  aria-hidden="true"
                  className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue shrink-0 pt-2"
                >
                  {item.step}
                </span>
                <div className="max-w-[640px]">
                  <h3 className="font-headline text-heading-sm font-normal text-bone mb-4">
                    {item.title}
                  </h3>
                  <p className="font-body text-body-sm font-normal text-fog-blue">
                    {item.description}
                  </p>
                </div>
              </div>
            </m.li>
          ))}
        </ol>
      </section>

      <Rule />

      {/* ── The Feel ─────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[640px]"
        >
          <Label>The Feel</Label>
          <h2 className="mt-4 font-headline text-heading-lg font-normal text-bone mb-10">
            Big brands, but a human mission
          </h2>
          <div className="font-body text-body-sm font-normal text-bone space-y-7">
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

      <Rule />

      {/* ── Stills ───────────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 md:mb-24"
        >
          <Label>Stills</Label>
          <h2 className="mt-4 font-headline text-heading-lg font-normal text-bone">
            Frames from the campaign
          </h2>
        </m.div>

        <div className="space-y-16 md:space-y-24">
          {/* Full-width opener */}
          <StillPlate
            src={galleryImages[0]}
            alt="Ford Go Further Florida Panthers campaign still 1"
            aspect="aspect-[21/9]"
            discipline="Campaign Direction"
            sizes="100vw"
          />

          {/* Wide + tall pair */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            <StillPlate
              src={galleryImages[1]}
              alt="Ford Go Further Florida Panthers campaign still 2"
              aspect="aspect-[16/10]"
              discipline="Brand Film"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <StillPlate
              src={galleryImages[2]}
              alt="Ford Go Further Florida Panthers campaign still 3"
              aspect="aspect-[3/4]"
              discipline="On-Site Production"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Production pair */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            <StillPlate
              src={galleryImages[3]}
              alt="Ford Go Further Florida Panthers campaign still 4"
              aspect="aspect-[4/3]"
              discipline="On-Site Production"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <StillPlate
              src={galleryImages[4]}
              alt="Ford Go Further Florida Panthers campaign still 5"
              aspect="aspect-[4/3]"
              discipline="Partnership Activation"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Narrow single */}
          <div className="max-w-[720px]">
            <StillPlate
              src={galleryImages[5]}
              alt="Ford Go Further Florida Panthers campaign still 6"
              aspect="aspect-[4/3]"
              discipline="On-Site Production"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>

          {/* Asymmetric pair */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            <StillPlate
              src={galleryImages[6]}
              alt="Ford Go Further Florida Panthers campaign still 7"
              aspect="aspect-[3/4]"
              discipline="Brand Film"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <StillPlate
              src={galleryImages[7]}
              alt="Ford Go Further Florida Panthers campaign still 8"
              aspect="aspect-[16/10]"
              discipline="Partnership Activation"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Closing pair */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            <StillPlate
              src={galleryImages[8]}
              alt="Ford Go Further Florida Panthers campaign still 9"
              aspect="aspect-[16/10]"
              discipline="Brand Film"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <StillPlate
              src={galleryImages[9]}
              alt="Ford Go Further Florida Panthers campaign closing still"
              aspect="aspect-[3/4]"
              discipline="Social Delivery"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <Rule />

      {/* ── The Result ───────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 md:mb-24"
        >
          <Label>The Result</Label>
          <h2 className="mt-4 font-headline text-heading-lg font-normal text-bone">
            A campaign that put reach behind relief
          </h2>
        </m.div>

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[720px]"
        >
          {/* Lead result statement */}
          <p className="font-headline text-heading-sm font-normal text-bone mb-14">
            {results[0]}
          </p>

          {/* TODO(David): add quantified result or client quote here */}

          <ul className="max-w-[640px]">
            {results.slice(1).map((result, i) => (
              <li
                key={result}
                className={`py-6 font-body text-body-sm font-normal text-fog-blue ${
                  i > 0 ? "border-t border-ash-border" : ""
                }`}
              >
                {result}
              </li>
            ))}
          </ul>
        </m.div>
      </section>

      <Rule />

      {/* ── Capabilities ─────────────────────────────────────────── */}
      <section className="section-container section-padding">
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 md:mb-24"
        >
          <Label>Capabilities</Label>
          <h2 className="mt-4 font-headline text-heading-lg font-normal text-bone">
            The production toolkit
          </h2>
        </m.div>

        <div className="max-w-[720px]">
          {tools.map((tool, i) => (
            <m.div
              key={tool.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className={`py-10 md:py-12 ${
                i > 0 ? "border-t border-ash-border" : ""
              }`}
            >
              <h3 className="font-headline text-heading-sm font-normal text-bone mb-3">
                {tool.name}
              </h3>
              <p className="font-body text-body-sm font-normal text-fog-blue max-w-[640px]">
                {tool.description}
              </p>
            </m.div>
          ))}
        </div>
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
          <h2 className="font-headline text-heading-lg font-normal text-bone mb-6">
            Have a cause worth rallying behind?
          </h2>
          <p className="font-body text-body-sm font-normal text-fog-blue mb-12">
            Let&rsquo;s build a campaign that turns a brand partnership into real
            momentum for the people it serves.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link href="/#contact" className="btn-primary">
              Book a Call
            </Link>
            <Link
              href="/projects/unplugged-sessions"
              className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.02em] font-normal text-bone hover:text-fog-blue transition-colors duration-500 ease-prism"
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
