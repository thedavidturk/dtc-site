"use client";

import { Fragment, useRef, useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";

const ParticleNebula = dynamic(() => import("@/components/ParticleNebula"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 bg-deep-space" />,
});

const scrollIndicatorVariants = {
  animate: {
    y: [0, 12, 0],
    opacity: [0.4, 1, 0.4],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Kinetic Typography Helpers                                        */
/* ------------------------------------------------------------------ */

const wordEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

function AnimatedWord({
  word,
  delay,
  animate,
  finalLetterSpacing,
}: {
  word: string;
  delay: number;
  animate: boolean;
  finalLetterSpacing?: string;
}) {
  const startSpacing = finalLetterSpacing
    ? `${parseFloat(finalLetterSpacing) - 0.08}em`
    : undefined;

  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        initial={{
          y: "100%",
          rotateX: 40,
          opacity: 0,
          ...(startSpacing && { letterSpacing: startSpacing }),
        }}
        animate={
          animate
            ? {
                y: 0,
                rotateX: 0,
                opacity: 1,
                ...(finalLetterSpacing && { letterSpacing: finalLetterSpacing }),
              }
            : {
                y: "100%",
                rotateX: 40,
                opacity: 0,
                ...(startSpacing && { letterSpacing: startSpacing }),
              }
        }
        transition={{
          duration: 0.7,
          delay: animate ? delay : 0,
          ease: wordEase,
          ...(finalLetterSpacing && {
            letterSpacing: {
              duration: 1.2,
              delay: animate ? delay + 0.3 : 0,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            },
          }),
        }}
        style={{ transformOrigin: "bottom" }}
      >
        {word}
      </motion.span>
    </span>
  );
}

function AnimatedLine({
  text,
  baseDelay,
  className,
  animate,
  letterSpacing,
}: {
  text: string;
  baseDelay: number;
  className?: string;
  animate: boolean;
  letterSpacing?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={`block ${className || ""}`}>
      {words.map((word, i) => (
        <Fragment key={i}>
          {i > 0 && <span className="inline-block">&nbsp;</span>}
          <AnimatedWord
            word={word}
            delay={baseDelay + i * 0.12}
            animate={animate}
            finalLetterSpacing={letterSpacing}
          />
        </Fragment>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated Accent Line                                              */
/* ------------------------------------------------------------------ */

function AccentLine({ animate }: { animate: boolean }) {
  return (
    <motion.div
      className="relative mx-auto my-8 md:my-10"
      initial={{ opacity: 0 }}
      animate={animate ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, delay: animate ? REVEAL_OFFSET + 1.2 : 0 }}
    >
      {/* The drawn line */}
      <motion.div
        className="h-px mx-auto overflow-hidden"
        initial={{ width: 0 }}
        animate={animate ? { width: "min(320px, 60%)" } : { width: 0 }}
        transition={{
          duration: 1.2,
          delay: animate ? REVEAL_OFFSET + 1.2 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="h-full w-full bg-gradient-to-r from-transparent via-electric-indigo to-transparent" />
      </motion.div>

      {/* Glow behind the line */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 pointer-events-none"
        initial={{ width: 0, opacity: 0 }}
        animate={
          animate
            ? { width: "min(240px, 50%)", opacity: 1 }
            : { width: 0, opacity: 0 }
        }
        transition={{
          duration: 1.4,
          delay: animate ? REVEAL_OFFSET + 1.3 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="h-full w-full bg-gradient-to-r from-transparent via-electric-indigo/20 to-transparent blur-md hero-accent-pulse" />
      </motion.div>

      {/* Center dot */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-electric-indigo hero-accent-pulse"
        initial={{ scale: 0, opacity: 0 }}
        animate={animate ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{
          duration: 0.4,
          delay: animate ? REVEAL_OFFSET + 1.6 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Gradient Border Button                                            */
/* ------------------------------------------------------------------ */

function GradientBorderButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const isPrimary = variant === "primary";

  return (
    <MagneticButton>
      <motion.a
        href={href}
        className="relative group/btn inline-flex"
        whileTap={{ scale: 0.98 }}
      >
        {/* Rotating gradient border */}
        <span className="absolute -inset-[1px] rounded-lg hero-border-gradient opacity-60 group-hover/btn:opacity-100 transition-opacity duration-500" />

        {/* Hover glow */}
        <span className="absolute -inset-[1px] rounded-lg hero-border-gradient opacity-0 group-hover/btn:opacity-40 blur-md transition-opacity duration-500" />

        {/* Inner button */}
        <span
          className={`relative inline-flex items-center justify-center px-8 py-4 rounded-lg font-headline font-bold transition-all duration-300 ${
            isPrimary
              ? "bg-gradient-cta text-white hover:opacity-90"
              : "bg-deep-space text-pure-white hover:bg-electric-indigo/10"
          }`}
        >
          {children}
        </span>
      </motion.a>
    </MagneticButton>
  );
}

/* ------------------------------------------------------------------ */
/*  Interactive Grid Ripple                                           */
/* ------------------------------------------------------------------ */

const GRID_SIZE = 80;
const RIPPLE_MAX_RADIUS = 300;
const RIPPLE_SPEED = 4; // px per frame
const RIPPLE_LIFETIME = 80; // frames

interface Ripple {
  x: number;
  y: number;
  radius: number;
  age: number;
}

function GridRipple({ mousePos }: { mousePos: { x: number; y: number } }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const lastSpawnRef = useRef(0);
  const mousePxRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  // Track mouse in pixel coords
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    mousePxRef.current = {
      x: (mousePos.x / 100) * canvas.width,
      y: (mousePos.y / 100) * canvas.height,
    };
  }, [mousePos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = performance.now();
      const mx = mousePxRef.current.x;
      const my = mousePxRef.current.y;

      // Spawn new ripple every ~600ms if mouse is inside
      if (mx > 0 && my > 0 && now - lastSpawnRef.current > 600) {
        ripplesRef.current.push({ x: mx, y: my, radius: 0, age: 0 });
        lastSpawnRef.current = now;
        // Limit active ripples
        if (ripplesRef.current.length > 5) ripplesRef.current.shift();
      }

      // Draw grid with ripple distortion
      const cols = Math.ceil(canvas.width / GRID_SIZE) + 1;
      const rows = Math.ceil(canvas.height / GRID_SIZE) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const baseX = col * GRID_SIZE;
          const baseY = row * GRID_SIZE;

          let brightness = 0.03; // base grid brightness

          // Check all active ripples
          for (const ripple of ripplesRef.current) {
            const dx = baseX - ripple.x;
            const dy = baseY - ripple.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Ring width
            const ringWidth = 40;
            const ringDist = Math.abs(dist - ripple.radius);

            if (ringDist < ringWidth) {
              const intensity = (1 - ringDist / ringWidth) * (1 - ripple.age / RIPPLE_LIFETIME);
              brightness += intensity * 0.12;
            }
          }

          // Mouse proximity glow
          const mouseDx = baseX - mx;
          const mouseDy = baseY - my;
          const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
          if (mouseDist < 200) {
            brightness += (1 - mouseDist / 200) * 0.06;
          }

          if (brightness > 0.03) {
            // Draw intersection dot
            ctx.beginPath();
            ctx.arc(baseX, baseY, 1, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 102, 241, ${Math.min(brightness, 0.3)})`;
            ctx.fill();

            // Draw faint grid lines from this point
            if (col < cols - 1) {
              ctx.beginPath();
              ctx.moveTo(baseX, baseY);
              ctx.lineTo(baseX + GRID_SIZE, baseY);
              ctx.strokeStyle = `rgba(99, 102, 241, ${Math.min(brightness * 0.5, 0.12)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
            if (row < rows - 1) {
              ctx.beginPath();
              ctx.moveTo(baseX, baseY);
              ctx.lineTo(baseX, baseY + GRID_SIZE);
              ctx.strokeStyle = `rgba(99, 102, 241, ${Math.min(brightness * 0.5, 0.12)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      // Update ripples
      ripplesRef.current = ripplesRef.current.filter((r) => {
        r.radius += RIPPLE_SPEED;
        r.age += 1;
        return r.age < RIPPLE_LIFETIME && r.radius < RIPPLE_MAX_RADIUS;
      });

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Component                                                    */
/* ------------------------------------------------------------------ */

interface HeroProps {
  introComplete?: boolean;
}

/** Extra delay added to all hero animations so content fades in
 *  after the cinematic intro overlay has fully dissolved. */
const REVEAL_OFFSET = 0.4;

export default function Hero({ introComplete = true }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax depth layers — headline moves fastest, lower elements slower
  const line1Y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const line2Y = useTransform(scrollYProgress, [0, 1], [0, -75]);
  const line3Y = useTransform(scrollYProgress, [0, 1], [0, -55]);
  const line4Y = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, -25]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, -10]);

  // Scroll zoom-out — content gently recedes as you scroll past
  const contentScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 1, 0]);

  // Mouse-reactive gradient spotlight
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-deep-space pt-20"
      style={{ backgroundColor: "#0B0F19" }}
      onMouseMove={handleMouseMove}
    >
      {/* 3D Particle Nebula background — fades in after intro */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      >
        <ParticleNebula />
      </motion.div>

      {/* Mouse-reactive gradient spotlight */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none transition-opacity duration-1000"
        style={{
          opacity: introComplete ? 0.07 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(99,102,241,0.4) 0%, rgba(249,115,22,0.1) 40%, transparent 70%)`,
        }}
      />

      {/* Interactive grid ripple overlay */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        <GridRipple mousePos={mousePos} />

        {/* Top edge gradient fade */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-deep-space to-transparent" />

        {/* Bottom edge gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-deep-space to-transparent" />
      </div>

      {/* Cinematic vignette — dark edges like looking through a lens */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 85%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Edge light leaks — anamorphic lens flares */}
      <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
        {/* Top-left indigo leak */}
        <div
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full hero-light-leak"
          style={{
            background: "radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, rgba(99,102,241,0.04) 40%, transparent 70%)",
          }}
        />
        {/* Bottom-right coral leak */}
        <div
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full hero-light-leak"
          style={{
            background: "radial-gradient(ellipse at center, rgba(249,115,22,0.1) 0%, rgba(249,115,22,0.03) 40%, transparent 70%)",
            animationDelay: "-3s",
          }}
        />
        {/* Top-right subtle warm leak */}
        <div
          className="absolute -top-10 -right-32 w-72 h-72 rounded-full hero-light-leak"
          style={{
            background: "radial-gradient(ellipse at center, rgba(251,191,36,0.06) 0%, transparent 60%)",
            animationDelay: "-5s",
          }}
        />
        {/* Bottom-left cool leak */}
        <div
          className="absolute -bottom-10 -left-24 w-64 h-64 rounded-full hero-light-leak"
          style={{
            background: "radial-gradient(ellipse at center, rgba(129,140,248,0.08) 0%, transparent 60%)",
            animationDelay: "-7s",
          }}
        />
      </div>

      {/* Main content — zoom-out on scroll */}
      <motion.div
        className="relative z-10 section-container section-padding text-center max-w-6xl mx-auto"
        style={{ scale: contentScale, opacity: contentOpacity }}
      >
        {/* Headline — editorial asymmetric layout with typographic contrast */}
        <h1
          className="font-headline leading-none"
          style={{ perspective: 400 }}
        >
          {/* Line 1: FUTURE-PROOF — left, light, wide tracking, small label */}
          <motion.span style={{ y: line1Y, display: "block" }} className="hero-glow-line text-left">
            <AnimatedLine
              text="FUTURE-PROOF"
              baseDelay={REVEAL_OFFSET}
              className="hero-shimmer-white text-base md:text-xl lg:text-2xl font-light"
              letterSpacing="0.2em"
              animate={introComplete}
            />
          </motion.span>

          {/* Line 2: CREATIVE — left, bold, big, gradient */}
          <motion.span style={{ y: line2Y, display: "block" }} className="hero-glow-line text-left mt-2 md:mt-3">
            <AnimatedLine
              text="CREATIVE"
              baseDelay={REVEAL_OFFSET + 0.2}
              className="hero-shimmer-gradient text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9]"
              letterSpacing="-0.02em"
              animate={introComplete}
            />
          </motion.span>

          {/* Line 3: FOR FORWARD-THINKING — right, light, wide tracking, small label */}
          <motion.span style={{ y: line3Y, display: "block" }} className="hero-glow-line text-right mt-6 md:mt-8">
            <AnimatedLine
              text="FOR FORWARD-THINKING"
              baseDelay={REVEAL_OFFSET + 0.5}
              className="hero-shimmer-white text-base md:text-xl lg:text-2xl font-light"
              letterSpacing="0.15em"
              animate={introComplete}
            />
          </motion.span>

          {/* Line 4: BRANDS — right, bold, big, gradient */}
          <motion.span style={{ y: line4Y, display: "block" }} className="hero-glow-line text-right mt-2 md:mt-3">
            <AnimatedLine
              text="BRANDS"
              baseDelay={REVEAL_OFFSET + 0.7}
              className="hero-shimmer-gradient text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9]"
              letterSpacing="-0.02em"
              animate={introComplete}
            />
          </motion.span>
        </h1>

        {/* Animated accent line divider */}
        <AccentLine animate={introComplete} />

        {/* Subheadline — blur-in entrance + parallax */}
        <motion.div style={{ y: subY }}>
          <motion.p
            className="font-body text-cool-gray text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            animate={
              introComplete
                ? { opacity: 1, filter: "blur(0px)", y: 0 }
                : { opacity: 0, filter: "blur(10px)", y: 20 }
            }
            transition={{ duration: 0.8, delay: introComplete ? REVEAL_OFFSET + 1.5 : 0, ease: wordEase }}
          >
            Strategy-led content development with fast production pipelines.
            We research your audience, develop the creative, and deliver
            results at the speed your brand needs to stay ahead.
          </motion.p>
        </motion.div>

        {/* CTA Buttons + parallax + gradient borders */}
        <motion.div style={{ y: ctaY }}>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={
              introComplete
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{
              duration: 0.6,
              delay: introComplete ? REVEAL_OFFSET + 1.8 : 0,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <GradientBorderButton href="#projects" variant="primary">
              Explore Our Work
            </GradientBorderButton>
            <GradientBorderButton href="#contact" variant="secondary">
              Start a Project
            </GradientBorderButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ delay: REVEAL_OFFSET + 2.2, duration: 1 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cool-gray/50">
          Scroll
        </span>
        <motion.div variants={scrollIndicatorVariants} animate="animate">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-cool-gray/50"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
