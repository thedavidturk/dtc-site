"use client";

import { useState, FormEvent } from "react";
import { m, AnimatePresence } from "framer-motion";

/**
 * EmailCapture -- the reply card.
 *
 * A centered max-w-[600px] column on the obsidian void: fog-blue
 * eyebrow, bone heading at heading-sm, one fog-blue supporting line,
 * then a bare underlined field beside the outlined Subscribe button.
 * States stay in bone and fog-blue; no boxes, no glow.
 */

// TODO: Create a separate Formspree form for newsletter signups and replace this endpoint.
// Using the contact form endpoint as a placeholder.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/meezzwjl";

const PRISM_EASE = [0.52, 0.01, 0, 1] as const;

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: PRISM_EASE,
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: PRISM_EASE,
    },
  },
};

const successVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: PRISM_EASE,
    },
  },
  exit: {
    opacity: 0,
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
    <section className="relative section-padding">
      {/* Hairline rule closing the band (FAQ's list opens the seam above) */}
      <div
        className="absolute bottom-0 left-0 right-0 border-t border-ash-border"
        aria-hidden="true"
      />

      <m.div
        className="section-container"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="mx-auto max-w-[600px]">
          {/* Headline */}
          <m.div className="text-center mb-12 md:mb-14" variants={childVariants}>
            <span className="block text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-5">
              Stay in the Loop
            </span>
            <h2 className="font-anton font-normal uppercase tracking-normal text-heading-sm headline-yellow">
              Get Monthly AI Creative Insights
            </h2>
            <p className="font-body font-normal text-body-sm text-fog-blue mt-4">
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
                  className="flex flex-col sm:flex-row items-stretch sm:items-start gap-5"
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
                      className="w-full bg-transparent border-0 border-b border-ash-border rounded-none px-0 py-3 font-body text-sm font-normal text-bone placeholder:text-fog-blue/60 outline-none transition-colors duration-500 ease-prism focus:border-bone"
                    />
                    {error && (
                      <p className="mt-2 text-caption font-body font-normal text-fog-blue">
                        {error}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary flex-shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Subscribing..." : "Subscribe"}
                  </button>
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
                  <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
                    Subscribed
                  </p>
                  <p className="font-body font-normal text-body-sm text-bone">
                    You&apos;re in. Watch your inbox.
                  </p>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>
        </div>
      </m.div>
    </section>
  );
}
