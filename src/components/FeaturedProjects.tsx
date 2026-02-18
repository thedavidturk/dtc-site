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
}

const projects: Project[] = [
  {
    client: "NEW ERA CAP",
    title: "Out of This World",
    type: "3D Animation + Virtual World Cinematic",
    teaser:
      "Creating cosmic environments in Unreal Engine 5 for a space-themed product launch",
    href: "/projects/new-era-cap",
    gradient: "from-electric-indigo via-purple-600 to-violet-900",
    accentGlow: "group-hover:shadow-electric-indigo/30",
    coverImage: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDBnMzY2M2JzNDFzNms4ejJvZmRyNGo1YmsyYjdlaHZlMXphZG14dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2UeBIRTL9ZA2BvmZD5/giphy.gif",
  },
  {
    client: "SEAWORLD",
    title: "SEAQuest Campaign",
    type: "Virtual World Cinematic + 3D Animation",
    teaser:
      "Building immersive deep-sea worlds for a theme park attraction launch",
    href: "/projects/seaworld",
    gradient: "from-blue-600 via-cyan-500 to-teal-700",
    accentGlow: "group-hover:shadow-cyan-500/30",
    coverImage: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExenYxcmUybjVyanNlZjF1b3FxMGZvaDZhZDE0ZTVpYTI0dGdtamFkcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/V9e6dWr3gEjPCoNJ7c/giphy.gif",
  },
  {
    client: "EL SECRETO",
    title: "Savoring the Unseen",
    type: "Cinematic Video Production",
    teaser:
      "An intimate omakase experience captured with cinematic storytelling at Faena Miami Beach",
    href: "/projects/el-secreto",
    gradient: "from-warm-coral via-amber-500 to-red-700",
    accentGlow: "group-hover:shadow-warm-coral/30",
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
    coverImage: "https://media.giphy.com/media/OWRTtgINto81tGKtJi/giphy.gif",
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
                  {/* Background — cover image or gradient */}
                  {project.coverImage ? (
                    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                      <Image
                        src={project.coverImage}
                        alt={`${project.client} project`}
                        fill
                        className="object-cover"
                        unoptimized
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

                  {/* Dark overlay — intensifies on hover */}
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

                  {/* Content overlay — depth layers via translateZ */}
                  <div
                    className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Type badge — floats highest */}
                    <span
                      className="inline-block font-mono text-xs text-white/70 tracking-wider uppercase mb-3 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm bg-white/5"
                      style={{ transform: "translateZ(30px)" }}
                    >
                      {project.type}
                    </span>

                    {/* Client name — prominent depth */}
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

                    {/* Teaser — revealed on hover */}
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

        {/* CTA below grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
          className="mt-16 text-center"
        >
          <Link
            href="#contact"
            className="btn-secondary text-sm group inline-flex items-center gap-2"
          >
            View All Projects
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
        </motion.div>
      </div>
    </section>
  );
}
