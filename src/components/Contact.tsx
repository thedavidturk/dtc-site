"use client";

import { useState, FormEvent } from "react";
import { m, AnimatePresence } from "framer-motion";

const projectTypes = [
  "Virtual Cinematic",
  "3D Animation",
  "Content Partnership",
  "Videography & Photography",
  "Not sure",
];

const prismEase = [0.52, 0.01, 0, 1] as const;

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
      duration: 0.5,
      ease: prismEase,
    },
  },
};

const riseVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: prismEase,
    },
  },
};

const successVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: prismEase,
    },
  },
  exit: {
    opacity: 0,
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

/* Bare hairline field: no box, no background. A single 1px bottom rule
   carries the structure; it brightens to bone on focus. */
const inputClasses =
  "w-full bg-transparent border-0 border-b border-ash-border rounded-none px-0 py-3 font-body text-body-sm font-normal text-bone placeholder:text-fog-blue/60 focus:border-bone focus:outline-none focus:ring-0 transition-colors duration-500 ease-prism";

/* Uppercase fog-blue caption above each field: the metadata-label voice. */
const labelClasses =
  "block text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-1";

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
  // Formspree honeypot: humans never see or fill this; bots that auto-fill
  // every field trip it and Formspree silently drops the submission.
  const [gotcha, setGotcha] = useState("");

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
          _gotcha: gotcha,
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
    <section id="contact" className="section-padding">
      <m.div
        className="section-container"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section opener: eyebrow, sculptural statement, lead line */}
        <m.div className="mb-16 md:mb-24" variants={headingVariants}>
          <p className="font-body text-[17px] uppercase tracking-[0.02em] font-normal text-fog-blue">
            Contact
          </p>
          <h2 className="font-body text-display-sm font-semibold uppercase headline-red mt-6">
            Get In Touch
          </h2>
          <p className="font-body text-body-lg font-normal text-bone mt-10 max-w-[440px]">
            Let&apos;s build what&apos;s next.
          </p>
          <p className="font-body text-body-sm font-normal text-bone mt-4 max-w-[440px]">
            Have a project in mind? Tell us what you&apos;re building and we&apos;ll show you how we&apos;d execute it.
          </p>
        </m.div>

        {/* Two columns: the form as a narrow editorial column,
            the direct-contact details as a metadata stack. */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
          {/* Form column */}
          <m.div className="lg:col-span-3" variants={riseVariants}>
            <div className="max-w-[640px]">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <m.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-10"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
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

                    {/* Name & Company row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-8">
                      <div>
                        <label htmlFor="name" className={labelClasses}>
                          Name <span className="text-fog-blue">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className={inputClasses}
                        />
                        {errors.name && (
                          <p className="mt-2 text-caption font-body font-normal text-fog-blue">
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
                        Email <span className="text-fog-blue">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={inputClasses}
                      />
                      {errors.email && (
                        <p className="mt-2 text-caption font-body font-normal text-fog-blue">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Project Type */}
                    <div>
                      <label htmlFor="projectType" className={labelClasses}>
                        Project Type <span className="text-fog-blue">*</span>
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className={`${inputClasses} appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236f879c%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_4px_center] bg-no-repeat pr-8 ${
                          !formData.projectType ? "text-fog-blue/60" : ""
                        }`}
                      >
                        <option value="" disabled>
                          Select a project type
                        </option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.projectType && (
                        <p className="mt-2 text-caption font-body font-normal text-fog-blue">
                          {errors.projectType}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className={labelClasses}>
                        Tell us about your project <span className="text-fog-blue">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Describe your vision, timeline, and goals..."
                        className={`${inputClasses} resize-none`}
                      />
                      {errors.message && (
                        <p className="mt-2 text-caption font-body font-normal text-fog-blue">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit error */}
                    {submitError && (
                      <p className="text-caption font-body font-normal text-fog-blue">
                        {submitError}
                      </p>
                    )}

                    {/* Submit: the outlined button, the only bordered element */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {submitting ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  </m.form>
                ) : (
                  <m.div
                    key="success"
                    variants={successVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="py-16 border-t border-b border-ash-border"
                  >
                    <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-4">
                      Message Sent
                    </p>
                    <p className="font-body text-body font-normal text-bone max-w-[440px]">
                      Thank you for reaching out. We&apos;ll review your project details and
                      get back to you within 24 hours.
                    </p>

                    <button
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
                      className="mt-10 text-caption uppercase tracking-[0.02em] font-normal text-bone hover:text-fog-blue transition-colors duration-500 ease-prism"
                    >
                      Send another message
                    </button>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </m.div>

          {/* Direct-contact column: metadata labels over values,
              rows separated by 1px ash hairlines. */}
          <m.aside className="lg:col-span-2" variants={riseVariants}>
            <h3 className="font-body text-heading-sm font-normal text-bone mb-8">
              Prefer to reach out directly?
            </h3>

            <div className="border-t border-ash-border">
              {/* Email */}
              <div className="py-7 border-b border-ash-border">
                <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
                  Email
                </p>
                <div className="flex items-center gap-3">
                  <svg
                    className="w-4 h-4 flex-shrink-0 text-bone"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  <a
                    href="mailto:david@davidturkcreative.com"
                    className="font-body text-body font-normal text-bone hover:text-fog-blue transition-colors duration-500 ease-prism break-all"
                  >
                    david@davidturkcreative.com
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="py-7 border-b border-ash-border">
                <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
                  LinkedIn
                </p>
                <div className="flex items-center gap-3">
                  <svg
                    className="w-4 h-4 flex-shrink-0 text-bone"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <a
                    href="https://linkedin.com/in/davidturk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-body font-normal text-bone hover:text-fog-blue transition-colors duration-500 ease-prism inline-flex items-center gap-1.5"
                  >
                    Connect on LinkedIn
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      aria-hidden="true"
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

              {/* Response time */}
              <div className="py-7 border-b border-ash-border">
                <p className="text-caption uppercase tracking-[0.02em] font-normal text-fog-blue mb-2">
                  Response Time
                </p>
                <p className="font-body text-body font-normal text-bone">
                  We respond within 24 hours.
                </p>
              </div>
            </div>
          </m.aside>
        </div>
      </m.div>
    </section>
  );
}
