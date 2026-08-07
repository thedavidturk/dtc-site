"use client";

import { useEffect, useRef, useState } from "react";
import Link from "./TransitionLink";
import Image from "next/image";
import { m } from "framer-motion";

interface Project {
  client: string;
  title: string;
  type: string;
  href: string;
  coverImage?: string;
  /** Poster still for MP4 covers, shown instantly while the clip loads. */
  coverPoster?: string;
}

const projects: Project[] = [
  {
    client: "NEW ERA CAP",
    title: "4 Campaigns. One Vision.",
    type: "Strategy + 3D Animation + VFX",
    href: "/projects/new-era-cap",
    coverImage: "/motion/new-era-3d.mp4",
    coverPoster: "/motion/new-era-3d.jpg",
  },
  {
    client: "SEAWORLD",
    title: "SEAQuest Campaign",
    type: "Strategy + Content Development",
    href: "/projects/seaworld",
    coverImage: "/motion/seaworld-reel.mp4",
    coverPoster: "/motion/seaworld-reel.jpg",
  },
  {
    client: "FAENA",
    title: "El Secreto: Savoring the Unseen",
    type: "Cinematic Video Production",
    href: "/projects/el-secreto",
    coverImage: "/motion/faena.mp4",
    coverPoster: "/motion/faena.jpg",
  },
  {
    client: "BETTERFLY",
    title: "#RecursosMasHumanos",
    type: "VFX + FOOH Campaign",
    href: "/projects/betterfly",
    coverImage: "/motion/betterfly-fooh.mp4",
    coverPoster: "/motion/betterfly-fooh.jpg",
  },
  {
    client: "BRUGAL RUM",
    title: "Tasting the Island",
    type: "Brand Activation + Event Production",
    href: "/projects/brugal-rum",
    coverImage: "/motion/brugal.mp4",
    coverPoster: "/motion/brugal.jpg",
  },
  {
    client: "FORD",
    title: "Mustang Mach-E",
    type: "Automotive CGI + Commercial",
    href: "/projects/ford-mustang-mach-e",
    coverImage: "/motion/ford-mustang.mp4",
    coverPoster: "/motion/ford-mustang.jpg",
  },
  {
    client: "MIAMI DOLPHINS",
    title: "Ford Field Club",
    type: "Experiential Creative Direction",
    href: "/projects/ford-field-club",
    coverImage: "/motion/ford-field-club.mp4",
    coverPoster: "/motion/ford-field-club.jpg",
  },
  {
    client: "UNPLUGGED SESSIONS",
    title: "Live, In One Take",
    type: "Live Music + Multi-Camera Direction",
    href: "/projects/unplugged-sessions",
    coverImage: "/motion/unplugged.mp4",
    coverPoster: "/motion/unplugged.jpg",
  },
  {
    client: "RUNWAY HEALTH",
    title: "Built From the Ground Up",
    type: "3D Product Design + CGI Rendering",
    href: "/projects/runway-health",
    coverImage: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/66ead1cf-6a1a-4284-908a-a56b5e058937_rw_1200.png?h=3d9f7b1732640485b0971f4afe66b1dd",
  },
  {
    client: "PEREZ ART MUSEUM MIAMI",
    title: "A Cultural Identity",
    type: "Cultural Branding + Art Direction",
    href: "/projects/pamm",
    coverImage: "/motion/pamm.mp4",
    coverPoster: "/motion/pamm.jpg",
  },
  {
    client: "TODES VEJIGANTE",
    title: "A Story of Resistance",
    type: "Documentary + Cultural Preservation",
    href: "/projects/todes-vejigante",
    coverImage: "/motion/todes.mp4",
    coverPoster: "/motion/todes.jpg",
  },
  {
    client: "JADEN SMITH x CRESPO",
    title: "Behind the Stage",
    type: "Documentary Short + Direction",
    href: "/projects/crespo-jaden-smith",
    coverImage: "/motion/crespo.mp4",
    coverPoster: "/motion/crespo.jpg",
  },
  {
    client: "BISCAYNE COFFEE",
    title: "Launch Campaign",
    type: "Video + 3D Product Design",
    href: "/projects/biscayne-coffee",
    coverImage: "/motion/biscayne.mp4",
    coverPoster: "/motion/biscayne.jpg",
  },
  {
    client: "FORD x FLORIDA PANTHERS",
    title: "Go Further",
    type: "Brand Film + Cause Campaign",
    href: "/projects/florida-panthers",
    coverImage: "/motion/panthers.mp4",
    coverPoster: "/motion/panthers.jpg",
  },
  {
    client: "BARRY'S",
    title: "In Motion",
    type: "Social Content + Motion Design",
    href: "/projects/barrys-bootcamp",
    coverImage: "/motion/barrys.mp4",
    coverPoster: "/motion/barrys.jpg",
  },
  {
    client: "THE HOSPITALITY MENTOR",
    title: "Inside the Fontainebleau",
    type: "TV Episode + Cinematography",
    href: "/projects/hospitality-mentor",
    coverImage: "/motion/hospitality.mp4",
    coverPoster: "/motion/hospitality.jpg",
  },
];

const prismEase = [0.52, 0.01, 0, 1] as const;

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: prismEase },
  },
};

/* The chromatic hover echo: the tile's outline drawn three times in the
   artifact's channels with tiny opposing offsets. The prism language,
   borrowed for one hover state. */
const TILE_CHANNELS: { color: string; x: number; y: number }[] = [
  { color: "#ff2a2a", x: -2, y: -1 },
  { color: "#2a7fff", x: 2, y: 1 },
  { color: "#2aff2a", x: 0, y: 2 },
];

/**
 * One mosaic tile. Poster-first: the still renders immediately, then the
 * clip loads and plays while the tile is in the viewport (paused when
 * scrolled away), so sixteen tiles stay cheap. Reduced-motion users
 * keep the stills.
 */
function Tile({ project, index }: { project: Project; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const isVideo = project.coverImage?.toLowerCase().endsWith(".mp4") ?? false;
  const still = isVideo ? project.coverPoster : project.coverImage;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "100px" },
    );
    observer.observe(v);
    return () => observer.disconnect();
  }, []);

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: prismEase, delay: (index % 4) * 0.06 }}
    >
      <Link
        href={project.href}
        aria-label={`${project.client}: ${project.title}. ${project.type}. View project.`}
        className="group relative block"
      >
        <div className="relative aspect-square overflow-hidden rounded-[15px]">
          {still && (
            <Image
              src={still}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
              unoptimized={still.toLowerCase().includes(".gif")}
            />
          )}
          {isVideo && project.coverImage && (
            <video
              ref={videoRef}
              src={project.coverImage}
              loop
              muted
              playsInline
              preload="none"
              aria-hidden="true"
              onPlaying={() => setPlaying(true)}
              className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-prism ${playing ? "opacity-100" : "opacity-0"}`}
            />
          )}

          {/* Caption: solid obsidian strip. Rises on hover at desktop,
              always present on touch screens. */}
          <div className="absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-2 bg-obsidian/90 px-4 py-3 transition-[transform,opacity] duration-500 ease-prism lg:translate-y-full lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100">
            <span className="truncate text-sm font-normal text-bone">
              {project.client}
            </span>
            <span className="hidden truncate text-[11px] font-normal uppercase tracking-[0.02em] text-fog-blue sm:block">
              {project.type}
            </span>
          </div>
        </div>

        {/* RGB-split outline on hover: the artifact's channel offsets */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-prism lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100"
        >
          {TILE_CHANNELS.map((channel) => (
            <div
              key={channel.color}
              className="absolute inset-0 rounded-[15px] border"
              style={{
                borderColor: channel.color,
                transform: `translate(${channel.x}px, ${channel.y}px)`,
                opacity: 0.7,
              }}
            />
          ))}
        </div>
      </Link>
    </m.div>
  );
}

export default function FeaturedProjects() {
  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        {/* Section opener: eyebrow and statement, hierarchy from size alone */}
        <m.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14 md:mb-20"
        >
          <p className="text-[17px] font-normal uppercase tracking-[0.02em] text-fog-blue">
            Selected Work
          </p>
          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between md:gap-8">
            <h2 className="font-headline text-heading-lg font-semibold uppercase headline-lime">
              Work that pushes boundaries
            </h2>
            <p className="text-caption font-normal uppercase tracking-[0.02em] text-fog-blue whitespace-nowrap">
              16 Projects
            </p>
          </div>
        </m.div>

        {/* The mosaic: every project at once, one tight grid of squares.
            7px gaps (the system's element gap); clips play while in view. */}
        <div className="grid grid-cols-2 gap-[7px] sm:grid-cols-3 lg:grid-cols-4">
          {projects.map((project, i) => (
            <Tile key={project.href} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
