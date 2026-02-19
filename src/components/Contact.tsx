"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const OrganicBlob = dynamic(() => import("./OrganicBlob"), { ssr: false });

const projectTypes = [
  "Virtual Cinematic",
  "3D Animation",
  "Content Partnership",
  "Videography & Photography",
  "Not sure",
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const headingVariants = {
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

const leftColVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const rightColVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const successVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3 },
  },
};

interface FormData {
  name: string;
  company: string;
  email: string;
  projectType: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
}

const inputClasses =
  "w-full bg-white/[0.05] border border-white/10 rounded-lg p-4 text-pure-white font-body text-sm placeholder:text-cool-gray/50 focus:border-electric-indigo focus:ring-1 focus:ring-electric-indigo/50 outline-none transition-all duration-300";

const labelClasses = "block text-sm font-body text-cool-gray mb-2";

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    projectType: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function validate(): FormErrors {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.projectType) {
      newErrors.projectType = "Please select a project type.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please tell us about your project.";
    }

    return newErrors;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("https://formspree.io/f/meezzwjl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          projectType: formData.projectType,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitError("Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="bg-deep-space section-padding relative overflow-hidden" style={{ backgroundColor: "#0B0F19" }}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06)_0%,transparent_50%)]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-[0.03] bg-[radial-gradient(circle,#F97316,transparent_60%)]" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-[0.03] bg-[radial-gradient(circle,#6366F1,transparent_60%)]" />

      <motion.div
        className="section-container relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section header */}
        <motion.div className="text-center mb-16 md:mb-20" variants={headingVariants}>
          <span className="font-mono text-xs tracking-[0.3em] text-electric-indigo uppercase mb-4 block">
            Get In Touch
          </span>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-pure-white tracking-tight">
            LET&apos;S BUILD
            <br />
            <span className="gradient-text">WHAT&apos;S NEXT</span>
          </h2>
          <p className="font-body text-cool-gray text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? Let&apos;s talk about how we can bring your vision to life
            with cutting-edge virtual production.
          </p>
        </motion.div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left side: Form */}
          <motion.div className="lg:col-span-3" variants={leftColVariants}>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-6"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                >
                  {/* Name & Company row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className={labelClasses}>
                        Name <span className="text-warm-coral">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={`${inputClasses} ${
                          errors.name ? "border-warm-coral/60 focus:border-warm-coral focus:ring-warm-coral/50" : ""
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-warm-coral font-body">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="company" className={labelClasses}>
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company"
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={labelClasses}>
                      Email <span className="text-warm-coral">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={`${inputClasses} ${
                        errors.email ? "border-warm-coral/60 focus:border-warm-coral focus:ring-warm-coral/50" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-warm-coral font-body">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Project Type */}
                  <div>
                    <label htmlFor="projectType" className={labelClasses}>
                      Project Type <span className="text-warm-coral">*</span>
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className={`${inputClasses} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394A3B8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_16px_center] bg-no-repeat ${
                        errors.projectType
                          ? "border-warm-coral/60 focus:border-warm-coral focus:ring-warm-coral/50"
                          : ""
                      } ${!formData.projectType ? "text-cool-gray/50" : ""}`}
                    >
                      <option value="" disabled>
                        Select a project type
                      </option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type} className="bg-deep-space text-pure-white">
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.projectType && (
                      <p className="mt-1.5 text-xs text-warm-coral font-body">
                        {errors.projectType}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className={labelClasses}>
                      Tell us about your project <span className="text-warm-coral">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe your vision, timeline, and goals..."
                      className={`${inputClasses} resize-none ${
                        errors.message
                          ? "border-warm-coral/60 focus:border-warm-coral focus:ring-warm-coral/50"
                          : ""
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-warm-coral font-body">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit error */}
                  {submitError && (
                    <p className="text-sm text-warm-coral font-body text-center">
                      {submitError}
                    </p>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full text-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    whileHover={submitting ? {} : { scale: 1.02 }}
                    whileTap={submitting ? {} : { scale: 0.98 }}
                  >
                    {submitting ? "Sending..." : "Send Message"}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col items-center justify-center text-center py-16 px-8 bg-white/[0.03] border border-white/5 rounded-2xl"
                >
                  {/* Success checkmark */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-electric-indigo to-warm-coral flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-pure-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </div>
                    {/* Glow ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-electric-indigo to-warm-coral opacity-20 blur-xl" />
                  </div>

                  <h3 className="font-headline text-2xl font-bold text-pure-white mb-3">
                    Message Sent
                  </h3>
                  <p className="font-body text-cool-gray text-sm max-w-sm leading-relaxed">
                    Thank you for reaching out. We&apos;ll review your project details and
                    get back to you within 24 hours.
                  </p>

                  <motion.button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        company: "",
                        email: "",
                        projectType: "",
                        message: "",
                      });
                      setErrors({});
                    }}
                    className="mt-8 font-mono text-xs text-electric-indigo tracking-wider uppercase hover:text-warm-coral transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right side: Contact info */}
          <motion.div className="lg:col-span-2 relative" variants={rightColVariants}>
            {/* Organic Blob — decorative 3D element behind the card */}
            <div className="absolute -top-20 -right-20 w-[400px] h-[400px] z-0 opacity-70 pointer-events-auto hidden lg:block">
              <OrganicBlob className="w-full h-full" />
            </div>

            <div className="relative h-full z-10">
              {/* Decorative gradient border element */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-electric-indigo/20 via-transparent to-warm-coral/20 opacity-60" />
              <div className="relative bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-2xl p-8 lg:p-10 h-full">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_70%)] rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-[radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.06),transparent_70%)] rounded-bl-2xl" />

                <div className="relative z-10">
                  <h3 className="font-headline text-xl font-bold text-pure-white mb-8">
                    Prefer to reach out directly?
                  </h3>

                  {/* Email */}
                  <div className="mb-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-warm-coral"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-mono text-cool-gray/60 uppercase tracking-wider mb-1">
                          Email
                        </p>
                        <a
                          href="mailto:david@davidturkcreative.com"
                          className="text-warm-coral font-body text-sm hover:text-warm-coral/80 transition-colors duration-300 break-all"
                        >
                          david@davidturkcreative.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div className="mb-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-cool-gray"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-mono text-cool-gray/60 uppercase tracking-wider mb-1">
                          LinkedIn
                        </p>
                        <a
                          href="https://linkedin.com/in/davidturk"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cool-gray font-body text-sm hover:text-pure-white transition-colors duration-300 inline-flex items-center gap-1.5"
                        >
                          Connect on LinkedIn
                          <svg
                            className="w-3 h-3"
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
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

                  {/* Response time */}
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-40" />
                    </div>
                    <p className="font-mono text-sm text-cool-gray">
                      We respond within 24 hours.
                    </p>
                  </div>

                  {/* Bottom decorative gradient line */}
                  <div className="mt-10 h-px w-full bg-gradient-to-r from-electric-indigo via-warm-coral to-electric-indigo opacity-20" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
