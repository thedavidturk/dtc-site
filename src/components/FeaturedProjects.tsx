"use client";

import Link from "./TransitionLink";
import Image from "next/image";
import { m } from "framer-motion";
import WorkFrame from "./WorkFrame";
import TextReveal from "./TextReveal";
import SectionMasthead from "./SectionMasthead";
import AutoplayVideo from "./AutoplayVideo";

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
    gradient: "from-terracotta via-purple-600 to-violet-900",
    accentGlow: "group-hover:",
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
    gradient: "from-sun-gold via-amber-500 to-red-700",
    accentGlow: "group-hover:",
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

/* The occasional color-rupture moment: at most one tinted card per row. */
const accentSurface: Record<number, string> = {
  4: "bg-mint-wash",
  11: "bg-powder-blue",
};

export default function FeaturedProjects() {
  return (
    <section id="projects" className="bg-bone-white section-padding relative overflow-hidden">
      {/* Stamped masthead - edge-to-edge broadside slab */}
      <SectionMasthead text="Selected Work" className="mb-4 md:mb-6" />

      <div className="section-container relative z-10">
        {/* Statement sub-line under the stamp */}
        <m.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 md:mb-16 flex items-baseline justify-between gap-8 border-t border-warm-ink pt-4"
        >
          <h2 className="font-serif text-h3 font-normal text-ink-black">
            <TextReveal text="Work that pushes" as="span" className="inline" />{" "}
            <TextReveal
              text="boundaries"
              as="span"
              className="inline italic"
              delay={0.2}
            />
          </h2>
          <p className="hidden md:block text-caption font-normal uppercase tracking-[0.08em] text-graphite whitespace-nowrap">
            16 Projects
          </p>
        </m.div>

        {/* Project grid - sharp corners, text below the image */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16"
        >
          {projects.map((project, i) => (
            <m.div key={project.href} variants={cardVariants}>
              <Link href={project.href} className="group block">
                <WorkFrame className="aspect-[4/3] overflow-hidden">
                  {project.coverImage && project.coverImage.toLowerCase().endsWith(".mp4") ? (
                    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                      <AutoplayVideo
                        src={project.coverImage}
                        poster={project.coverPoster}
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
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                        unoptimized={project.coverImage.toLowerCase().includes(".gif")}
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-mint-wash" />
                  )}
                </WorkFrame>

                {/* Editorial caption block below the image */}
                <div
                  className={
                    accentSurface[i] ? `${accentSurface[i]} p-6 mt-0` : "pt-4"
                  }
                >
                  <p className="text-[10px] font-normal uppercase tracking-[0.14em] text-graphite mb-2">
                    {project.type}
                  </p>
                  <h3 className="text-xl font-light text-ink-black leading-tight">
                    {project.client}
                  </h3>
                  <p className="text-sm font-normal text-graphite mt-1">
                    {project.title}
                  </p>
                  <p className="text-sm font-normal text-graphite/80 mt-2 line-clamp-2 leading-relaxed">
                    {project.teaser}
                  </p>
                </div>
              </Link>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
