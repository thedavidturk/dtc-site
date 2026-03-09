"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

// TODO: Create a separate Formspree form for newsletter signups and replace this endpoint.
// Using the contact form endpoint as a placeholder.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/meezzwjl";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const successVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          _subject: "New Newsletter Signup",
          source: "newsletter",
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-deep-space section-padding relative overflow-hidden" style={{ backgroundColor: "#0B0F19" }}>
      {/* Subtle top/bottom border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.04)_0%,transparent_60%)]" />

      <motion.div
        className="section-container relative z-10 max-w-3xl mx-auto"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Headline */}
        <motion.div className="text-center mb-8" variants={childVariants}>
          <span className="font-mono text-xs tracking-[0.3em] text-electric-indigo uppercase mb-4 block">
            Stay in the Loop
          </span>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-pure-white tracking-tight">
            Get Monthly AI Creative{" "}
            <span className="gradient-text">Insights</span>
          </h2>
          <p className="font-body text-cool-gray text-sm md:text-base mt-3 leading-relaxed">
            One email per month. No spam. Unsubscribe anytime.
          </p>
        </motion.div>

        {/* Form / Success */}
        <motion.div variants={childVariants}>
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 max-w-xl mx-auto"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              >
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="your@email.com"
                    aria-label="Email address"
                    className={`w-full bg-white/[0.05] border rounded-lg px-4 py-3.5 text-pure-white font-body text-sm placeholder:text-cool-gray/50 focus:ring-1 outline-none transition-all duration-300 ${
                      error
                        ? "border-warm-coral/60 focus:border-warm-coral focus:ring-warm-coral/50"
                        : "border-white/10 focus:border-electric-indigo focus:ring-electric-indigo/50"
                    }`}
                  />
                  {error && (
                    <p className="mt-1.5 text-xs text-warm-coral font-body">
                      {error}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={submitting}
                  className="flex-shrink-0 bg-electric-indigo hover:bg-electric-indigo/90 text-pure-white font-body font-medium text-sm px-6 py-3.5 rounded-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  whileHover={submitting ? {} : { scale: 1.02 }}
                  whileTap={submitting ? {} : { scale: 0.98 }}
                >
                  {submitting ? "Subscribing..." : "Subscribe"}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                variants={successVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center py-6"
              >
                <div className="inline-flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.08] rounded-full px-6 py-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-electric-indigo to-warm-coral flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-pure-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <span className="font-body text-sm text-pure-white">
                    You&apos;re in. Watch your inbox.
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
