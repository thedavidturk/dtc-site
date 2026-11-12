"use client";

import Image from "next/image";
import { m } from "framer-motion";
import WorkMarquee from "./WorkMarquee";
import LineReveal from "./LineReveal";
import Magnetic from "./Magnetic";
import useAutoplayInView from "./useAutoplayInView";
import { STUDIO_ENTER_URL, enterStudio } from "./enterStudio";

/* ------------------------------------------------------------------ */
/*  Real work - pulled from the featured projects                      */
/* ------------------------------------------------------------------ */

interface WorkTile {
  src: string;
  /** Poster still for MP4 tiles, shown instantly while the clip loads. */
  poster?: string;
  client: string;
  tag: string;
}

const work: WorkTile[] = [
  {
    src: "/motion/new-era-3d.mp4",
    poster: "/motion/new-era-3d.jpg",
    client: "New Era Cap",
    tag: "3D / VFX",
  },
  {
    src: "/motion/brugal.mp4",
    poster: "/motion/brugal.jpg",
    client: "Brugal Rum",
    tag: "Activation",
  },
  {
    src: "/motion/faena.mp4",
    poster: "/motion/faena.jpg",
    client: "Faena",
    tag: "Film",
  },
  {
    src: "/motion/ford-mustang.mp4",
    poster: "/motion/ford-mustang.jpg",
    client: "Ford",
    tag: "Commercial",
  },
  {
    src: "/motion/seaworld-reel.mp4",
    poster: "/motion/seaworld-reel.jpg",
    client: "SeaWorld",
    tag: "Cinematics",
  },
  {
    src: "/motion/ford-field-club.mp4",
    poster: "/motion/ford-field-club.jpg",
    client: "Miami Dolphins",
    tag: "Experiential",
  },
  {
    src: "/motion/new-era-elements.mp4",
    poster: "/motion/new-era-elements.jpg",
    client: "New Era Cap",
    tag: "Elements",
  },
  {
    src: "/motion/betterfly-fooh.mp4",
    poster: "/motion/betterfly-fooh.jpg",
    client: "Betterfly",
    tag: "FOOH",
  },
  {
    src: "/motion/unplugged.mp4",
    poster: "/motion/unplugged.jpg",
    client: "Unplugged Sessions",
    tag: "Live Music",
  },
  {
    src: "/motion/new-era-cosmic.mp4",
    poster: "/motion/new-era-cosmic.jpg",
    client: "New Era Cap",
    tag: "Cosmic",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/66ead1cf-6a1a-4284-908a-a56b5e058937_rw_1200.png?h=3d9f7b1732640485b0971f4afe66b1dd",
    client: "Runway Health",
    tag: "Product",
  },
  {
    src: "/motion/todes.mp4",
    poster: "/motion/todes.jpg",
    client: "Todes Vejigante",
    tag: "Story",
  },
  {
    src: "/motion/pamm.mp4",
    poster: "/motion/pamm.jpg",
    client: "Perez Art Museum Miami",
    tag: "Cultural",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/24b244e3-b83b-4b7a-baf5-c6b8b65e4475_rw_3840.png?h=99f746c5ced60dde7de6ce105d8562a5",
    client: "Faena",
    tag: "Cinematic",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/9093a3b0-956b-49e3-a039-06897868e553_rw_1200.png?h=bf736fd7c3636fa8eedc8a44dd910bcd",
    client: "New Era Cap",
    tag: "Sprouted",
  },
  {
    src: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/700cdcee-cf9b-4414-b54c-82e507d0ed53_rw_3840.jpg?h=ad51ee0c19861e16fffbd807aa14d780",
    client: "Betterfly",
    tag: "OOH",
  },
  {
    src: "/motion/crespo.mp4",
    poster: "/motion/crespo.jpg",
    client: "Jaden Smith x CRESPO",
    tag: "Documentary",
  },
  {
    src: "/motion/biscayne.mp4",
    poster: "/motion/biscayne.jpg",
    client: "Biscayne Coffee",
    tag: "Launch",
  },
  {
    src: "/motion/panthers.mp4",
    poster: "/motion/panthers.jpg",
    client: "Ford x Panthers",
    tag: "Brand Film",
  },
  {
    src: "/motion/barrys.mp4",
    poster: "/motion/barrys.jpg",
    client: "Barry's",
    tag: "Fitness",
  },
  {
    src: "/motion/hospitality.mp4",
    poster: "/motion/hospitality.jpg",
    client: "Fontainebleau",
    tag: "TV",
  },
];

/* Quiet client roll: one fog-blue caption line below the fold. */
const clients = [
  "New Era Cap",
  "Ford",
  "SeaWorld",
  "Miami Dolphins",
  "Betterfly",
  "Brugal Rum",
  "Faena",
  "Barry's",
  "United Parks",
  "Perez Art Museum Miami",
];

/* ------------------------------------------------------------------ */
/*  A single work tile - rounded media card on the void, caption below */
/* ------------------------------------------------------------------ */

function Tile({ tile }: { tile: WorkTile }) {
  // Self-hosted MP4 clips render as looping video; remote GIFs stay
  // unoptimized; static stills go through Next's image optimizer.
  const isVideo = tile.src.toLowerCase().endsWith(".mp4");
  const isGif = tile.src.toLowerCase().includes(".gif");
  const videoRef = useAutoplayInView<HTMLVideoElement>();
  return (
    <a
      href="#projects"
      aria-label={`${tile.client} - ${tile.tag}. View our work.`}
      className="group block"
      draggable={false}
    >
      {/* The card: 15px radius on the void, nothing overlaid */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[15px]">
        {isVideo ? (
          <video
            ref={videoRef}
            src={tile.src}
            poster={tile.poster}
            loop
            muted
            playsInline
            preload="none"
            aria-label={`${tile.client} - ${tile.tag}`}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <Image
            src={tile.src}
            alt={`${tile.client} - ${tile.tag}`}
            fill
            sizes="(max-width: 1024px) 45vw, 22vw"
            className="pointer-events-none object-cover"
            unoptimized={isGif}
            draggable={false}
          />
        )}
      </div>
      {/* Caption below the card: client in bone, tag in fog-blue */}
      <div className="flex items-baseline justify-between gap-3 pt-3">
        <span className="text-sm font-normal text-bone transition-colors duration-500 ease-prism group-hover:text-fog-blue">
          {tile.client}
        </span>
        <span className="text-[11px] font-normal uppercase tracking-[0.02em] text-fog-blue">
          {tile.tag}
        </span>
      </div>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Full-bleed horizontal work band                                    */
/* ------------------------------------------------------------------ */

function WorkBand({ tiles }: { tiles: WorkTile[] }) {
  const loop = [...tiles, ...tiles];
  return (
    <WorkMarquee
      orientation="horizontal"
      reverse={false}
      speed={45}
      trackClassName="flex w-max"
    >
      {loop.map((tile, i) => (
        <div
          key={`${tile.client}-${i}`}
          className="w-56 shrink-0 px-2 sm:w-72 sm:px-2.5 lg:w-[21.5rem] lg:px-3"
        >
          <Tile tile={tile} />
        </div>
      ))}
    </WorkMarquee>
  );
}

/* ------------------------------------------------------------------ */
/*  Motion presets - focus-pull curve, transform + opacity only        */
/* ------------------------------------------------------------------ */

const easePrism = [0.52, 0.01, 0, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.5 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easePrism } },
};

/* ------------------------------------------------------------------ */
/*  Hero - room first. The studio is the opening frame, the display    */
/*  type crosses its lower edge, and there are two ways in: the 3D     */
/*  studio, or the site that continues below.                          */
/* ------------------------------------------------------------------ */

const STUDIO_STILL = "/studio/studio-hero.jpg";
const STUDIO_ALT =
  "The DT+C studio at dusk: a shelf of client work, two monitors on the desk and the Miami skyline through the window";

const ghostLink =
  "group inline-flex items-center gap-2 text-sm font-normal uppercase tracking-[0.02em] text-bone transition-colors duration-500 ease-prism hover:text-fog-blue";

function ArrowDown() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v12m0 0l-5-5m5 5l5-5"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Desktop: the room, full width under the fixed header. The fade
          at its foot is what lets the headline cross the image. */}
      <div className="relative hidden pt-20 md:block">
        <a
          href={STUDIO_ENTER_URL}
          onClick={enterStudio}
          aria-label="Enter the studio"
          className="group relative block h-[66vh] max-h-[680px] min-h-[420px] overflow-hidden"
        >
          <Image
            src={STUDIO_STILL}
            data-studio-still=""
            alt={STUDIO_ALT}
            fill
            priority
            sizes="100vw"
            className="object-cover object-top transition-transform duration-[1400ms] ease-prism group-hover:scale-[1.03]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(16,16,16,0)_62%,rgba(16,16,16,0.7)_86%,#101010_100%)]"
          />
        </a>
      </div>

      {/* Headline left, the two ways in on the right */}
      <div className="section-container relative z-10 flex flex-wrap items-end justify-between gap-x-12 gap-y-7 pb-10 pt-28 md:-mt-[min(7.2vw,104px)] md:pb-14 md:pt-0">
        <h1 className="min-w-0 flex-[999_1_560px] font-anton font-normal uppercase leading-none tracking-normal text-bone chroma-text">
          {/* Phone: three lines */}
          <span className="block text-[clamp(36px,12.8vw,56px)] md:hidden">
            <LineReveal delay={0.15}>Content that</LineReveal>
            <LineReveal delay={0.27}>moves at the</LineReveal>
            <LineReveal delay={0.39}>speed of culture</LineReveal>
          </span>
          {/* Desktop: two lines */}
          <span className="hidden text-[clamp(44px,6.1vw,88px)] md:block">
            <LineReveal delay={0.15}>Content that moves</LineReveal>
            <LineReveal delay={0.27}>at the speed of culture</LineReveal>
          </span>
        </h1>

        <m.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-[0_1_400px] flex-col gap-5"
        >
          <m.p
            variants={item}
            className="text-left text-body-sm font-normal text-bone"
          >
            Strategy, content, VFX, and web, under one roof and built to
            launch in weeks, not months.
          </m.p>

          {/* Desktop: the studio is the primary way in */}
          <m.div
            variants={item}
            className="hidden flex-wrap items-center gap-x-7 gap-y-3 md:flex"
          >
            <Magnetic>
              <a
                href={STUDIO_ENTER_URL}
                onClick={enterStudio}
                className="studio-cta"
              >
                <span aria-hidden="true" className="studio-cta-dot" />
                Enter the Studio
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#projects" className={ghostLink}>
                Browse the Work
                <ArrowDown />
              </a>
            </Magnetic>
          </m.div>
          <m.p
            variants={item}
            className="-mt-2 hidden text-[13px] leading-[1.4] text-fog-blue md:block"
          >
            An interactive 3D room. Prefer a regular site? Keep scrolling.
          </m.p>

          {/* Phone: the regular site leads; the studio is the card below */}
          <m.div
            variants={item}
            className="flex flex-wrap items-center gap-x-6 gap-y-3 md:hidden"
          >
            <Magnetic>
              <a href="/#contact" className="btn-primary">
                Book a Call
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#projects" className={ghostLink}>
                See Our Work
                <ArrowDown />
              </a>
            </Magnetic>
          </m.div>
        </m.div>
      </div>

      {/* Phone: the studio as an optional step, framed like a work tile */}
      <m.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easePrism, delay: 0.6 }}
        className="section-container pb-10 md:hidden"
      >
        <a href={STUDIO_ENTER_URL} onClick={enterStudio} className="studio-card">
          {/* Image and button are one piece: the picture is the top of the button */}
          <span className="block overflow-hidden rounded-[15px]">
            <span className="relative block aspect-[3/2] w-full">
              <Image
                src={STUDIO_STILL}
                data-studio-still=""
                alt={STUDIO_ALT}
                fill
                sizes="100vw"
                className="object-cover object-[30%_50%]"
              />
            </span>
            <span className="flex min-h-[58px] items-center justify-between gap-3 bg-bone px-5 text-obsidian">
              <span className="flex items-center gap-2.5 text-[15px] font-normal uppercase tracking-[0.02em]">
                <span aria-hidden="true" className="studio-cta-dot" />
                Enter the Studio
              </span>
              <span className="flex items-center gap-2 text-[11px] font-normal uppercase tracking-[0.02em]">
                Interactive 3D
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </span>
          </span>
        </a>
        <p className="mt-3 text-[13px] leading-[1.4] text-fog-blue">
          A 3D room you can look around. Tap to step inside.
        </p>
      </m.div>

      {/* Quiet client roll: fog-blue caption line below the fold */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: easePrism, delay: 0.8 }}
        className="section-container pb-10"
      >
        <p className="text-caption font-normal text-fog-blue">
          {clients.join(" · ")}
        </p>
      </m.div>

      {/* ------------- Full-bleed work band: the work, in motion ------------- */}
      <m.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easePrism, delay: 0.35 }}
        className="pb-16 md:pb-24"
      >
        <WorkBand tiles={work} />
      </m.div>
    </section>
  );
}
