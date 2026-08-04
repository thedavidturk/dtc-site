"use client";

import { useState, FormEvent } from "react";
import { m, AnimatePresence } from "framer-motion";

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
  // Formspree honeypot: humans never see or fill this; bots that auto-fill
  // every field trip it and Formspree silently drops the submission.
  const [gotcha, setGotcha] = useState("");

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
          _gotcha: gotcha,
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
    <section className="bg-espresso section-padding relative overflow-hidden" style={{ backgroundColor: "#fffef7" }}>
      {/* Subtle top/bottom border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />

      {/* Background glow */}
      <div className="absolute inset-0 hidden bg-[radial-gradient(ellipse_at_center,rgba(138,4,103,0.04)_0%,transparent_60%)]" />

      <m.div
        className="section-container relative z-10 max-w-3xl mx-auto"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Headline */}
        <m.div className="text-center mb-8" variants={childVariants}>
          <span className="text-caption tracking-[0.08em] text-graphite uppercase mb-4 block">
            Stay in the Loop
          </span>
          <h2 className="font-display text-h3 font-light text-pure-white">
            Get Monthly AI Creative{" "}
            <span className="text-pure-white">Insights</span>
          </h2>
          <p className="font-body text-clay-gray text-sm md:text-base mt-3 leading-relaxed">
            One email per month. No spam. Unsubscribe anytime.
          </p>
        </m.div>

        {/* Form / Success */}
        <m.div variants={childVariants}>
          <AnimatePresence mode="wait">
            {!submitted ? (
              <m.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 max-w-xl mx-auto"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              >
                {/* Honeypot field for Formspree spam filtering (invisible to humans) */}
                <input
                  type="text"
                  name="_gotcha"
                  value={gotcha}
                  onChange={(e) => setGotcha(e.target.value)}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

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
                    className={`w-full bg-transparent border rounded-none px-4 py-3.5 text-pure-white font-body text-sm placeholder:text-clay-gray/50 focus:ring-1 outline-none transition-all duration-300 ${
                      error
                        ? "border-sun-gold/60 focus:border-sun-gold focus:ring-sun-gold/50"
                        : "border-black/10 focus:border-terracotta focus:ring-terracotta/50"
                    }`}
                  />
                  {error && (
                    <p className="mt-1.5 text-xs text-sun-gold font-body">
                      {error}
                    </p>
                  )}
                </div>

                <m.button
                  type="submit"
                  disabled={submitting}
                  className="flex-shrink-0 bg-ink-black hover:opacity-75 text-bone-white font-body font-normal text-sm px-6 py-3.5 rounded-pill transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  whileHover={submitting ? {} : { scale: 1.02 }}
                  whileTap={submitting ? {} : { scale: 0.98 }}
                >
                  {submitting ? "Subscribing..." : "Subscribe"}
                </m.button>
              </m.form>
            ) : (
              <m.div
                key="success"
                variants={successVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center py-6"
              >
                <div className="inline-flex items-center gap-2.5 bg-black/[0.04] border border-black/[0.08] rounded-full px-6 py-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-terracotta to-sun-gold flex items-center justify-center flex-shrink-0">
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
              </m.div>
            )}
          </AnimatePresence>
        </m.div>
      </m.div>
    </section>
  );
}
