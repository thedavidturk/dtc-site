"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import TextReveal from "./TextReveal";
import DistortionCard from "./DistortionCard";

interface Project {
  client: string;
  title: string;
  type: string;
  teaser: string;
  href: string;
  gradient: string;
  accentGlow: string;
  coverImage?: string;
  /** Poster still for MP4 covers, shown instantly while the clip loads. */
  coverPoster?: string;
}

const projects: Project[] = [
  {
    client: "NEW ERA CAP",
    title: "4 Campaigns. One Vision.",
    type: "Strategy + 3D Animation + VFX",
    teaser:
      "An ongoing partnership delivering immersive 3D campaigns, from cosmic worlds to elemental landscapes to holiday storytelling",
    href: "/projects/new-era-cap",
    gradient: "from-electric-indigo via-purple-600 to-violet-900",
    accentGlow: "group-hover:shadow-electric-indigo/30",
    coverImage: "/motion/new-era-3d.mp4",
    coverPoster: "/motion/new-era-3d.jpg",
  },
  {
    client: "SEAWORLD",
    title: "SEAQuest Campaign",
    type: "Strategy + Content Development",
    teaser:
      "Immersive deep-sea cinematics for a theme park attraction launch campaign",
    href: "/projects/seaworld",
    gradient: "from-blue-600 via-cyan-500 to-teal-700",
    accentGlow: "group-hover:shadow-cyan-500/30",
    coverImage: "/motion/seaworld-reel.mp4",
    coverPoster: "/motion/seaworld-reel.jpg",
  },
  {
    client: "FAENA",
    title: "El Secreto: Savoring the Unseen",
    type: "Cinematic Video Production",
    teaser:
      "An intimate omakase experience captured with cinematic storytelling at Faena Miami Beach",
    href: "/projects/el-secreto",
    gradient: "from-warm-coral via-amber-500 to-red-700",
    accentGlow: "group-hover:shadow-warm-coral/30",
    coverImage: "/motion/faena.mp4",
    coverPoster: "/motion/faena.jpg",
  },
  {
    client: "BETTERFLY",
    title: "#RecursosMasHumanos",
    type: "VFX + FOOH Campaign",
    teaser:
      "Digitally draping branded banners over iconic global monuments for a bold fake out-of-home campaign",
    href: "/projects/betterfly",
    gradient: "from-emerald-500 via-teal-500 to-cyan-800",
    accentGlow: "group-hover:shadow-emerald-500/30",
    coverImage: "/motion/betterfly-fooh.mp4",
    coverPoster: "/motion/betterfly-fooh.jpg",
  },
  {
    client: "BRUGAL RUM",
    title: "Tasting the Island",
    type: "Brand Activation + Event Production",
    teaser:
      "A sensory rum activation that brought the warmth and ritual of the Dominican Republic into a live branded experience",
    href: "/projects/brugal-rum",
    gradient: "from-amber-600 via-orange-500 to-yellow-700",
    accentGlow: "group-hover:shadow-amber-500/30",
    coverImage: "/motion/brugal.mp4",
    coverPoster: "/motion/brugal.jpg",
  },
  {
    client: "FORD",
    title: "Mustang Mach-E",
    type: "Automotive CGI + Commercial",
    teaser:
      "Cinematic CGI and commercial production putting Ford's all-electric Mustang Mach-E in motion across charged, dynamic worlds",
    href: "/projects/ford-mustang-mach-e",
    gradient: "from-blue-700 via-sky-600 to-indigo-900",
    accentGlow: "group-hover:shadow-sky-500/30",
    coverImage: "/motion/ford-mustang.mp4",
    coverPoster: "/motion/ford-mustang.jpg",
  },
  {
    client: "MIAMI DOLPHINS",
    title: "Ford Field Club",
    type: "Experiential Creative Direction",
    teaser:
      "Field-level hospitality at Hard Rock Stadium, directed as one rising moment from arrival to the rail with Ford as the host",
    href: "/projects/ford-field-club",
    gradient: "from-cyan-500 via-teal-500 to-emerald-800",
    accentGlow: "group-hover:shadow-teal-500/30",
    coverImage: "/motion/ford-field-club.mp4",
    coverPoster: "/motion/ford-field-club.jpg",
  },
  {
    client: "UNPLUGGED SESSIONS",
    title: "Live, In One Take",
    type: "Live Music + Multi-Camera Direction",
    teaser:
      "Multi-camera live performance coverage directed to let each cut breathe with the music instead of fighting it",
    href: "/projects/unplugged-sessions",
    gradient: "from-rose-600 via-pink-500 to-fuchsia-800",
    accentGlow: "group-hover:shadow-rose-500/30",
    coverImage: "/motion/unplugged.mp4",
    coverPoster: "/motion/unplugged.jpg",
  },
  {
    client: "RUNWAY HEALTH",
    title: "Built From the Ground Up",
    type: "3D Product Design + CGI Rendering",
    teaser:
      "Full 3D product builds and hero rendering crafted to hold up under close inspection across the runwayhealth.com brand",
    href: "/projects/runway-health",
    gradient: "from-violet-600 via-purple-500 to-indigo-900",
    accentGlow: "group-hover:shadow-violet-500/30",
    coverImage: "https://cdn.myportfolio.com/3d73d869-ccec-484c-ad9c-307e1175f104/66ead1cf-6a1a-4284-908a-a56b5e058937_rw_1200.png?h=3d9f7b1732640485b0971f4afe66b1dd",
  },
  {
    client: "PEREZ ART MUSEUM MIAMI",
    title: "A Cultural Identity",
    type: "Cultural Branding + Art Direction",
    teaser:
      "Art direction and visual identity work shaped for one of Miami's defining cultural institutions",
    href: "/projects/pamm",
    gradient: "from-slate-500 via-gray-600 to-zinc-900",
    accentGlow: "group-hover:shadow-slate-400/30",
    coverImage: "/motion/pamm.mp4",
    coverPoster: "/motion/pamm.jpg",
  },
  {
    client: "TODES VEJIGANTE",
    title: "A Story of Resistance",
    type: "Documentary + Cultural Preservation",
    teaser:
      "A documentary and immersive activation centering Afro-Caribbean vejigante tradition and the voices keeping it alive",
    href: "/projects/todes-vejigante",
    gradient: "from-amber-600 via-red-500 to-rose-900",
    accentGlow: "group-hover:shadow-amber-500/30",
    coverImage: "/motion/todes.mp4",
    coverPoster: "/motion/todes.jpg",
  },
  {
    client: "JADEN SMITH x CRESPO",
    title: "Behind the Stage",
    type: "Documentary Short + Direction",
    teaser:
      "A documentary short shot and cut in 24 hours, capturing Jaden Smith and CRESPO behind the show",
    href: "/projects/crespo-jaden-smith",
    gradient: "from-fuchsia-600 via-purple-500 to-indigo-900",
    accentGlow: "group-hover:shadow-fuchsia-500/30",
    coverImage: "/motion/crespo.mp4",
    coverPoster: "/motion/crespo.jpg",
  },
  {
    client: "BISCAYNE COFFEE",
    title: "Launch Campaign",
    type: "Video + 3D Product Design",
    teaser:
      "A brand launch pairing a cinematic film cut with photoreal 3D packaging built in Cinema 4D and Octane",
    href: "/projects/biscayne-coffee",
    gradient: "from-amber-700 via-orange-600 to-yellow-800",
    accentGlow: "group-hover:shadow-amber-600/30",
    coverImage: "/motion/biscayne.mp4",
    coverPoster: "/motion/biscayne.jpg",
  },
  {
    client: "FORD x FLORIDA PANTHERS",
    title: "Go Further",
    type: "Brand Film + Cause Campaign",
    teaser:
      "Turning Ford's Go Further platform into a hurricane relief drive for the Florida Keys with the Florida Panthers",
    href: "/projects/florida-panthers",
    gradient: "from-red-600 via-rose-500 to-slate-900",
    accentGlow: "group-hover:shadow-red-500/30",
    coverImage: "/motion/panthers.mp4",
    coverPoster: "/motion/panthers.jpg",
  },
  {
    client: "BARRY'S",
    title: "In Motion",
    type: "Social Content + Motion Design",
    teaser:
      "A motion system that carries Barry's in-studio energy into the social feed, built to stop the scroll",
    href: "/projects/barrys-bootcamp",
    gradient: "from-red-700 via-neutral-700 to-zinc-900",
    accentGlow: "group-hover:shadow-red-600/30",
    coverImage: "/motion/barrys.mp4",
    coverPoster: "/motion/barrys.jpg",
  },
  {
    client: "THE HOSPITALITY MENTOR",
    title: "Inside the Fontainebleau",
    type: "TV Episode + Cinematography",
    teaser:
      "A TV episode going inside the iconic Fontainebleau Miami Beach, shot in 4K on the Canon C70",
    href: "/projects/hospitality-mentor",
    gradient: "from-yellow-600 via-amber-500 to-orange-900",
    accentGlow: "group-hover:shadow-amber-400/30",
    coverImage: "/motion/hospitality.mp4",
    coverPoster: "/motion/hospitality.jpg",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function FeaturedProjects() {
  return (
    <section id="projects" className="bg-deep-space section-padding relative overflow-hidden" style={{ backgroundColor: "#0B0F19" }}>
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.05)_0%,transparent_60%)]" />

      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 md:mb-20"
        >
          <p className="font-mono text-sm text-electric-indigo tracking-widest uppercase mb-4">
            Selected Work
          </p>
          <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-pure-white tracking-tight">
            <TextReveal text="WORK THAT PUSHES" as="span" className="block" />
            <TextReveal text="BOUNDARIES" as="span" className="block gradient-text" delay={0.2} />
          </h2>
        </motion.div>

        {/* Project grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {projects.map((project) => (
            <motion.div key={project.href} variants={cardVariants}>
              <DistortionCard>
              <Link
                href={project.href}
                className={`group relative block ${project.accentGlow}`}
              >
                <TiltCard className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/20 hover:shadow-2xl">
                  {/* Background - cover video, image, or gradient */}
                  {project.coverImage && project.coverImage.toLowerCase().endsWith(".mp4") ? (
                    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                      <video
                        src={project.coverImage}
                        poster={project.coverPoster}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        aria-label={`${project.client} project`}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                  ) : project.coverImage ? (
                    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                      <Image
                        src={project.coverImage}
                        alt={`${project.client} project`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        unoptimized={project.coverImage.toLowerCase().includes(".gif")}
                      />
                    </div>
                  ) : (
                    <>
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-700 ease-out group-hover:scale-105`}
                      />
                      {/* Noise / grain overlay for cinematic feel */}
                      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')]" />
                      {/* Subtle grid pattern */}
                      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
                    </>
                  )}

                  {/* Dark overlay - intensifies on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/90 group-hover:via-black/40" />

                  {/* Top-right arrow indicator */}
                  <div
                    className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center opacity-0 translate-x-2 -translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500"
                    style={{ transform: "translateZ(40px)" }}
                  >
                    <svg
                      className="w-4 h-4 text-pure-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </div>

                  {/* Content overlay - depth layers via translateZ */}
                  <div
                    className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Type badge - floats highest */}
                    <span
                      className="inline-block font-mono text-xs text-white/70 tracking-wider uppercase mb-3 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm bg-white/5"
                      style={{ transform: "translateZ(30px)" }}
                    >
                      {project.type}
                    </span>

                    {/* Client name - prominent depth */}
                    <h3
                      className="font-headline text-2xl md:text-3xl font-bold text-pure-white tracking-tight mb-1"
                      style={{ transform: "translateZ(20px)" }}
                    >
                      {project.client}
                    </h3>

                    {/* Project name */}
                    <p
                      className="font-body text-base md:text-lg text-white/80 mb-3"
                      style={{ transform: "translateZ(15px)" }}
                    >
                      {project.title}
                    </p>

                    {/* Teaser - revealed on hover */}
                    <p
                      className="font-body text-sm text-white/50 max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 ease-out leading-relaxed"
                      style={{ transform: "translateZ(10px)" }}
                    >
                      {project.teaser}
                    </p>

                    {/* Underline accent */}
                    <div
                      className="mt-4 h-px w-0 group-hover:w-full bg-gradient-to-r from-electric-indigo to-warm-coral transition-all duration-700 ease-out"
                      style={{ transform: "translateZ(5px)" }}
                    />
                  </div>

                  {/* Border glow on hover */}
                  <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/10 transition-colors duration-500 pointer-events-none" />
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_60px_rgba(99,102,241,0.08)]" />
                </TiltCard>
              </Link>
              </DistortionCard>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
