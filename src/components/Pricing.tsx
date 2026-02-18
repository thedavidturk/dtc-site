"use client";

import { motion } from "framer-motion";
import WireframeTerrain from "./WireframeTerrain";
import MagneticButton from "./MagneticButton";

const packages = [
  {
    name: "VIRTUAL CINEMATIC",
    price: "$15,000–$25,000",
    priceSuffix: "/project",
    features: [
      "Unreal Engine 5 world creation",
      "4K cinematic sequence (30-60 seconds)",
      "Multi-format delivery",
      "2 rounds of revision",
    ],
    bestFor: "Product launches, brand films, campaign hero content",
    popular: false,
  },
  {
    name: "3D ANIMATION SYSTEM",
    price: "$25,000–$40,000",
    priceSuffix: "/project",
    features: [
      "3D product visualization",
      "Multiple animated sequences",
      "Motion graphics package",
      "Platform-optimized deliverables",
    ],
    bestFor: "Product lines, feature showcases, explainer content",
    popular: true,
  },
  {
    name: "CONTENT PARTNERSHIP",
    price: "$20,000",
    priceSuffix: "/month",
    features: [
      "Monthly virtual production",
      "4K content library development",
      "Ongoing animation and post",
      "Priority turnaround",
    ],
    bestFor: "Brands with consistent content needs",
    popular: false,
  },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const noteVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      delay: 0.2,
    },
  },
};

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-electric-indigo flex-shrink-0 mt-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative bg-deep-space overflow-hidden">
      {/* Wireframe terrain background */}
      <WireframeTerrain
        className="absolute inset-0 z-0"
        color="#F97316"
        opacity={0.05}
        speed={1}
      />

      {/* Background accents */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-[0.03]"
        style={{
          background:
            "radial-gradient(circle, #6366F1 0%, transparent 60%)",
        }}
      />

      <motion.div
        className="relative z-10 section-container section-padding"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-16 md:mb-20" variants={headerVariants}>
          <span className="font-mono text-xs tracking-[0.3em] text-electric-indigo uppercase mb-4 block">
            Pricing
          </span>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-pure-white tracking-tight">
            INVESTMENT
          </h2>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-stretch max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <motion.div
              key={pkg.name}
              className={`relative flex flex-col rounded-2xl p-8 transition-colors duration-300 ${
                pkg.popular
                  ? "bg-white/[0.06] backdrop-blur-xl backdrop-saturate-150 border-2 border-electric-indigo/30 lg:scale-105 lg:-my-2 shadow-[0_0_60px_-15px_rgba(99,102,241,0.2),inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:bg-white/[0.09] hover:border-electric-indigo/50"
                  : "bg-white/[0.04] backdrop-blur-xl backdrop-saturate-150 border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:bg-white/[0.07] hover:border-white/[0.12]"
              }`}
              variants={cardVariants}
              whileHover={{
                y: -4,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              {/* Most Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-block bg-electric-indigo/20 backdrop-blur-sm border border-electric-indigo/30 text-white font-mono text-xs font-bold tracking-wider uppercase px-5 py-1.5 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Package Name */}
              <h3 className="font-headline font-bold text-lg text-pure-white mb-4 mt-2">
                {pkg.name}
              </h3>

              {/* Price */}
              <div className="mb-6">
                <span className="gradient-text text-3xl font-headline font-bold">
                  {pkg.price}
                </span>
                <span className="text-cool-gray text-sm ml-1">
                  {pkg.priceSuffix}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

              {/* Features */}
              <ul className="space-y-4 mb-8 flex-1">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="font-body text-sm text-cool-gray leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Best For */}
              <p className="font-mono text-sm text-cool-gray/70 italic mb-8">
                Best for: {pkg.bestFor}
              </p>

              {/* CTA */}
              <MagneticButton strength={0.2}>
                <motion.a
                  href="#contact"
                  className={pkg.popular ? "btn-primary w-full text-center" : "btn-secondary w-full text-center"}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.a>
              </MagneticButton>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.p
          className="text-cool-gray text-sm text-center mt-14 max-w-2xl mx-auto leading-relaxed"
          variants={noteVariants}
        >
          All engagements include Unreal Engine 5 virtual production
          capabilities and 4K delivery.
        </motion.p>
      </motion.div>
    </section>
  );
}
